import * as CANNON from "cannon-es";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { RobotModel } from "./libraryAssets";

export type SpawnKind = "box" | "sphere" | "cylinder" | "robot";

type SpawnRequest = {
  kind: SpawnKind;
  id: number;
};

type BodyMesh = {
  body: CANNON.Body;
  mesh: THREE.Object3D;
};

type SandboxViewportProps = {
  isPlaying: boolean;
  spawnRequest: SpawnRequest | null;
  resetSignal: number;
  workflowRequest: { id: number; model: RobotModel; training: boolean } | null;
  onWorkflowStatus: (status: string) => void;
  stageLights: boolean;
  cameraMode: string;
};

type AssemblyMesh = {
  mesh: THREE.Object3D;
  startTime: number;
  duration: number;
  revealOnly?: boolean;
  noReveal?: boolean;
};

const darkMetal = new THREE.MeshStandardMaterial({
  color: "#2f383b",
  roughness: 0.52,
  metalness: 0.45,
});

const jointMaterial = new THREE.MeshStandardMaterial({
  color: "#a7b0b3",
  roughness: 0.35,
  metalness: 0.7,
});

const accentMaterial = new THREE.MeshStandardMaterial({
  color: "#d49f36",
  roughness: 0.38,
  metalness: 0.5,
});

const bodyMaterial = new THREE.MeshStandardMaterial({
  color: "#59666a",
  roughness: 0.58,
  metalness: 0.35,
});

export function SandboxViewport({
  isPlaying,
  spawnRequest,
  resetSignal,
  workflowRequest,
  onWorkflowStatus,
  stageLights,
  cameraMode,
}: SandboxViewportProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(isPlaying);
  const apiRef = useRef<{
    spawn: (kind: SpawnKind) => void;
    reset: () => void;
    runAssembly: (model: RobotModel, training: boolean) => void;
    setStageLights: (enabled: boolean) => void;
    setCameraMode: (mode: string) => void;
  } | null>(null);

  useEffect(() => {
    playingRef.current = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    if (!hostRef.current) return;

    const host = hostRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");
    scene.fog = new THREE.Fog("#000000", 26, 92);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 180);
    camera.position.set(11, 8, 12);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    host.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.target.set(0, 0.85, 0);

    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0),
    });
    world.broadphase = new CANNON.SAPBroadphase(world);
    world.allowSleep = true;

    const ambient = new THREE.AmbientLight("#7f8f94", 1.8);
    scene.add(ambient);

    const key = new THREE.DirectionalLight("#f2f7ff", 3.2);
    key.position.set(8, 14, 6);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    scene.add(key);

    const rim = new THREE.PointLight("#7ba9d6", 80, 45);
    rim.position.set(-9, 5, -8);
    scene.add(rim);

    const grid = createMoonshotGrid();
    scene.add(grid);

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: new CANNON.Material("ground"),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    const dynamic: BodyMesh[] = [];
    const assemblyMeshes: AssemblyMesh[] = [];
    const robot = createRobotAssembly();
    robot.group.visible = false;
    scene.add(robot.group);

    function spawn(kind: SpawnKind) {
      const offset = dynamic.length * 0.38;
      const x = Math.sin(offset) * 2.4;
      const z = Math.cos(offset) * 1.8;
      const y = 4.2 + (dynamic.length % 3) * 0.9;

      if (kind === "sphere") {
        const radius = 0.38;
        const mesh = new THREE.Mesh(new THREE.SphereGeometry(radius, 36, 18), bodyMaterial.clone());
        const body = new CANNON.Body({ mass: 1.4, shape: new CANNON.Sphere(radius) });
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        body.position.set(x, y, z);
        scene.add(mesh);
        world.addBody(body);
        dynamic.push({ body, mesh });
        return;
      }

      if (kind === "cylinder") {
        const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.8, 36), accentMaterial.clone());
        const shape = new CANNON.Cylinder(0.34, 0.34, 0.8, 24);
        const body = new CANNON.Body({ mass: 1.8, shape });
        body.position.set(x, y, z);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        scene.add(mesh);
        world.addBody(body);
        dynamic.push({ body, mesh });
        return;
      }

      if (kind === "robot") {
        const mesh = createRobotPartMesh();
        const body = new CANNON.Body({
          mass: 2.2,
          shape: new CANNON.Box(new CANNON.Vec3(0.58, 0.22, 0.34)),
        });
        body.position.set(x, y, z);
        scene.add(mesh);
        world.addBody(body);
        dynamic.push({ body, mesh });
        return;
      }

      const mesh = new THREE.Mesh(new THREE.BoxGeometry(0.78, 0.78, 0.78), darkMetal.clone());
      const body = new CANNON.Body({
        mass: 1.6,
        shape: new CANNON.Box(new CANNON.Vec3(0.39, 0.39, 0.39)),
      });
      body.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
      world.addBody(body);
      dynamic.push({ body, mesh });
    }

    function reset() {
      dynamic.splice(0).forEach(({ body, mesh }) => {
        world.removeBody(body);
        scene.remove(mesh);
      });
      clearAssembly();
      robot.group.visible = false;
      onWorkflowStatus("Idle");
    }

    function clearAssembly() {
      assemblyMeshes.splice(0).forEach(({ mesh, revealOnly }) => {
        if (revealOnly) return;
        scene.remove(mesh);
        mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            const material = child.material;
            if (Array.isArray(material)) {
              material.forEach((entry) => entry.dispose());
            } else {
              material.dispose();
            }
          }
        });
      });
    }

    async function runAssembly(model: RobotModel, training: boolean) {
      clearAssembly();
      dynamic.splice(0).forEach(({ body, mesh }) => {
        world.removeBody(body);
        scene.remove(mesh);
      });
      robot.group.visible = false;
      onWorkflowStatus(`Luna reading ${model === "humanoid" ? "Unitree G1 MuJoCo XML" : model === "nova" ? "Luna Rover xacro" : "Franka Panda MuJoCo XML"} assets`);
      frameBuildSlot(model);

      const startedAt = clock.elapsedTime;
      if (model === "nova") {
        await createNovaCarterAssembly(scene, assemblyMeshes, startedAt, training);
        if (training) await createTrainingDemoScene(scene, assemblyMeshes, startedAt + 0.8, model);
        floorAlignAssembly(assemblyMeshes);
        frameAssembly(assemblyMeshes, model);
        prepareReveal(assemblyMeshes);
        onWorkflowStatus(training ? "Luna Rover disaster recovery training scene running" : "Luna Rover assembled and ready for training");
        return;
      }

      if (model === "desktop") {
        await createFrankaPandaAssembly(scene, assemblyMeshes, startedAt, training);
        if (training) await createTrainingDemoScene(scene, assemblyMeshes, startedAt + 2.0, model);
        floorAlignAssembly(assemblyMeshes);
        frameAssembly(assemblyMeshes, model);
        prepareReveal(assemblyMeshes);
        onWorkflowStatus(training ? "Franka Panda trained on cube, sphere, and cylinder bins" : "Franka Panda assembled from XML and ready");
        return;
      }

      await createUnitreeG1Assembly(scene, assemblyMeshes, startedAt, training);
      if (training) await createTrainingDemoScene(scene, assemblyMeshes, startedAt + 1.2, model);

      floorAlignAssembly(assemblyMeshes);
      frameAssembly(assemblyMeshes, model);
      prepareReveal(assemblyMeshes);
      onWorkflowStatus(training ? "Unitree G1 rain factory repair training scene running" : "Unitree G1 assembled from XML and ready for training");
    }

    function frameAssembly(items: AssemblyMesh[], model: RobotModel) {
      const box = new THREE.Box3();
      items.forEach(({ mesh }) => {
        if (mesh.userData.revealOnly) return;
        if (mesh.userData.excludeFromFrame) return;
        mesh.updateWorldMatrix(true, true);
        box.expandByObject(mesh);
      });
      if (!Number.isFinite(box.min.y)) return;
      const center = new THREE.Vector3();
      const size = new THREE.Vector3();
      box.getCenter(center);
      box.getSize(size);
      const direction = new THREE.Vector3(1.25, 0.72, 1.18).normalize();
      const aspect = Math.max(camera.aspect, 0.1);
      const verticalFov = THREE.MathUtils.degToRad(camera.fov);
      const horizontalFov = 2 * Math.atan(Math.tan(verticalFov / 2) * aspect);
      const fitHeightDistance = size.y / (2 * Math.tan(verticalFov / 2));
      const fitWidthDistance = size.x / (2 * Math.tan(horizontalFov / 2));
      const fitDepthDistance = size.z * 0.9;
      const padding = model === "humanoid" ? 1.24 : model === "desktop" ? 1.08 : 1.28;
      const distance = Math.max(fitHeightDistance, fitWidthDistance, fitDepthDistance, 1.4) * padding;
      controls.target.copy(center);
      camera.position.copy(center).addScaledVector(direction, distance);
      camera.near = 0.01;
      camera.far = 220;
      camera.updateProjectionMatrix();
      controls.update();
    }

    function frameBuildSlot(model: RobotModel) {
      const center =
        model === "humanoid"
          ? new THREE.Vector3(0, 1.35, 0)
          : model === "desktop"
            ? new THREE.Vector3(0, 1.05, 0)
            : new THREE.Vector3(0, 0.55, 0);
      const radius = model === "humanoid" ? 2.0 : model === "desktop" ? 1.7 : 1.35;
      controls.target.copy(center);
      camera.position.set(center.x + radius * 1.12, center.y + radius * 0.72, center.z + radius * 1.18);
      camera.near = 0.01;
      camera.far = 220;
      camera.updateProjectionMatrix();
      controls.update();
    }

    function setStageLights(enabled: boolean) {
      key.visible = enabled;
      rim.visible = enabled;
      ambient.intensity = enabled ? 1.8 : 0.75;
    }

    function setCameraMode(mode: string) {
      camera.fov = mode === "Orthographic" ? 22 : 48;
      camera.updateProjectionMatrix();
    }

    apiRef.current = { spawn, reset, runAssembly, setStageLights, setCameraMode };
    setStageLights(stageLights);
    setCameraMode(cameraMode);
    reset();

    let lastWidth = 0;
    let lastHeight = 0;
    const resize = () => {
      const rect = host.getBoundingClientRect();
      if (rect.width < 2 || rect.height < 2) return;
      if (Math.abs(rect.width - lastWidth) < 1 && Math.abs(rect.height - lastHeight) < 1) return;
      lastWidth = rect.width;
      lastHeight = rect.height;
      renderer.setSize(rect.width, rect.height, false);
      camera.aspect = rect.width / Math.max(rect.height, 1);
      camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    let frame = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const delta = Math.min(clock.getDelta(), 0.033);
      const elapsed = clock.elapsedTime;

      if (playingRef.current) {
        world.step(1 / 60, delta, 3);
        animateRobot(robot, elapsed);
      }
      animateAssembly(assemblyMeshes, elapsed);

      dynamic.forEach(({ body, mesh }) => {
        mesh.position.copy(body.position as unknown as THREE.Vector3);
        mesh.quaternion.copy(body.quaternion as unknown as THREE.Quaternion);
      });

      resize();
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      host.removeChild(renderer.domElement);
      apiRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (spawnRequest) {
      apiRef.current?.spawn(spawnRequest.kind);
    }
  }, [spawnRequest]);

  useEffect(() => {
    if (resetSignal > 0) {
      apiRef.current?.reset();
    }
  }, [resetSignal]);

  useEffect(() => {
    if (workflowRequest) {
      apiRef.current?.runAssembly(workflowRequest.model, workflowRequest.training);
    }
  }, [workflowRequest]);

  useEffect(() => {
    apiRef.current?.setStageLights(stageLights);
  }, [stageLights]);

  useEffect(() => {
    apiRef.current?.setCameraMode(cameraMode);
  }, [cameraMode]);

  return <div className="sandbox-host" ref={hostRef} />;
}

function animateAssembly(assemblyMeshes: AssemblyMesh[], elapsed: number) {
  assemblyMeshes.forEach(({ mesh, startTime, duration }) => {
    const progress = THREE.MathUtils.clamp((elapsed - startTime) / duration, 0, 1);
    if (progress <= 0) return;
    mesh.visible = true;
    const eased = 1 - Math.pow(1 - progress, 3);
    const targetScale = mesh.userData.targetScale as THREE.Vector3 | undefined;
    if (targetScale) {
      mesh.scale.set(targetScale.x * Math.max(0.001, eased), targetScale.y * Math.max(0.001, eased), targetScale.z * Math.max(0.001, eased));
    } else {
      mesh.scale.setScalar(Math.max(0.001, eased));
    }
    const motion = mesh.userData.motion as { from: THREE.Vector3; to: THREE.Vector3; start: number; duration: number } | undefined;
    const animate = mesh.userData.animate as ((time: number) => void) | undefined;
    animate?.(elapsed);
    if (motion && elapsed > motion.start) {
      const t = THREE.MathUtils.clamp((elapsed - motion.start) / motion.duration, 0, 1);
      const arc = Math.sin(t * Math.PI) * 0.35;
      mesh.position.lerpVectors(motion.from, motion.to, t);
      mesh.position.y += arc;
    }
  });
}

function prepareReveal(assemblyMeshes: AssemblyMesh[]) {
  assemblyMeshes.forEach(({ mesh, noReveal }) => {
    if (noReveal) return;
    mesh.visible = false;
    mesh.userData.targetScale = mesh.scale.clone();
    mesh.scale.setScalar(0.001);
  });
}

function floorAlignAssembly(assemblyMeshes: AssemblyMesh[]) {
  const box = new THREE.Box3();
  assemblyMeshes.forEach(({ mesh }) => {
    if (mesh.userData.revealOnly) return;
    mesh.updateWorldMatrix(true, true);
    box.expandByObject(mesh);
  });
  if (!Number.isFinite(box.min.y)) return;
  const lift = -box.min.y + 0.015;
  assemblyMeshes.forEach(({ mesh }) => {
    if (mesh.userData.revealOnly) return;
    mesh.position.y += lift;
    const motion = mesh.userData.motion as { from: THREE.Vector3; to: THREE.Vector3 } | undefined;
    if (motion) {
      motion.from.y += lift;
      motion.to.y += lift;
    }
    const taskMotion = mesh.userData.taskMotion as { from: THREE.Vector3; to: THREE.Vector3 } | undefined;
    if (taskMotion) {
      taskMotion.from.y += lift;
      taskMotion.to.y += lift;
    }
  });
}

function positiveModulo(value: number, mod: number) {
  return ((value % mod) + mod) % mod;
}

function getBaseY(object: THREE.Object3D) {
  if (object.userData.baseY == null) object.userData.baseY = object.position.y;
  return object.userData.baseY as number;
}

function animateTaskObject(
  object: THREE.Object3D,
  time: number,
  task?: { from: THREE.Vector3; to: THREE.Vector3; start: number; cycle: number; lift: number },
) {
  if (!task) return;
  const local = positiveModulo(time - task.start, task.cycle) / task.cycle;
  const pick = 0.15;
  const liftEnd = 0.28;
  const carryEnd = 0.54;
  const dropEnd = 0.68;
  if (local < pick) {
    object.position.copy(task.from);
    return;
  }
  if (local < liftEnd) {
    const t = (local - pick) / (liftEnd - pick);
    object.position.copy(task.from);
    object.position.y += smoothStep(t) * task.lift;
    return;
  }
  if (local < carryEnd) {
    const t = smoothStep((local - liftEnd) / (carryEnd - liftEnd));
    object.position.lerpVectors(task.from, task.to, t);
    object.position.y += Math.sin(t * Math.PI) * task.lift;
    return;
  }
  if (local < dropEnd) {
    const t = smoothStep((local - carryEnd) / (dropEnd - carryEnd));
    object.position.copy(task.to);
    object.position.y += (1 - t) * task.lift * 0.42;
    return;
  }
  object.position.copy(task.to);
}

function smoothStep(t: number) {
  const clamped = THREE.MathUtils.clamp(t, 0, 1);
  return clamped * clamped * (3 - 2 * clamped);
}

async function createNovaCarterAssembly(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number, training = false) {
  const root = new THREE.Group();
  root.rotation.x = -Math.PI / 2;
  root.scale.setScalar(2.6);
  scene.add(root);
  assemblyMeshes.push({ mesh: root, startTime: startedAt, duration: 0.45 });

  const chassis = await loadObjWithMaterials("chassis_link.obj", "chassis_link.mtl");
  root.add(chassis);

  const driveAxleZ = 0.14;
  const driveY = 0.1726;
  const rearX = -0.49;
  const rearY = 0.185;
  const rearWheelZ = driveAxleZ;
  const suspensionMaterial = new THREE.MeshStandardMaterial({ color: "#4c575b", roughness: 0.48, metalness: 0.58 });
  root.add(createLinkCylinder(new THREE.Vector3(0, -driveY, driveAxleZ), new THREE.Vector3(0, driveY, driveAxleZ), 0.018, suspensionMaterial.clone()));

  const leftWheel = await loadObjWithMaterials("nova_carter_wheel_left.obj", "nova_carter_wheel_right.mtl");
  leftWheel.position.set(0, driveY, driveAxleZ);
  leftWheel.rotation.x = -Math.PI / 2;
  root.add(leftWheel);

  const rightWheel = await loadObjWithMaterials("nova_carter_wheel_right.obj", "nova_carter_wheel_right.mtl");
  rightWheel.position.set(0, -driveY, driveAxleZ);
  rightWheel.rotation.x = -Math.PI / 2;
  root.add(rightWheel);

  const casterFrame = await loadObjWithMaterials("caster_frame_base.obj", "caster_frame_base.mtl");
  casterFrame.position.set(rearX, 0, 0.22289);
  casterFrame.rotation.set(-Math.PI / 2, 0, Math.PI / 2);
  root.add(casterFrame);
  root.add(createLinkCylinder(new THREE.Vector3(rearX, -rearY, rearWheelZ), new THREE.Vector3(rearX, rearY, rearWheelZ), 0.014, suspensionMaterial.clone()));

  for (const side of [-1, 1]) {
    const swivel = await loadObjWithMaterials("caster_swivel.obj", "caster_swivel.mtl");
    const hub = new THREE.Vector3(rearX, side * rearY, rearWheelZ);
    const socket = new THREE.Vector3(-0.24, side * 0.11, 0.245);
    swivel.position.set(hub.x, hub.y, 0.215);
    root.add(swivel);

    const casterWheel = await loadObjWithMaterials("caster_wheel.obj", "caster_wheel.mtl");
    casterWheel.position.copy(hub);
    casterWheel.rotation.set(Math.PI / 2, -Math.PI / 2, 0);
    root.add(casterWheel);

    root.add(createLinkCylinder(socket, hub, 0.014, suspensionMaterial.clone()));
  }

  if (training) {
    root.userData.animate = (time: number) => {
      const baseY = getBaseY(root);
      const cycle = 13;
      const local = positiveModulo(time - startedAt, cycle) / cycle;
      const path = [
        new THREE.Vector3(-1.55, baseY, 1.15),
        new THREE.Vector3(-0.95, baseY, 0.42),
        new THREE.Vector3(-0.42, baseY, -0.88),
        new THREE.Vector3(0.28, baseY, -0.34),
        new THREE.Vector3(1.1, baseY, -1.06),
        new THREE.Vector3(1.42, baseY, 0.36),
        new THREE.Vector3(-1.55, baseY, 1.15),
      ];
      const scaled = local * (path.length - 1);
      const index = Math.min(path.length - 2, Math.floor(scaled));
      const segmentT = scaled - index;
      const eased = segmentT * segmentT * (3 - 2 * segmentT);
      const current = path[index].clone().lerp(path[index + 1], eased);
      const previousX = root.userData.previousPathX as number | undefined;
      root.position.copy(current);
      const direction = path[index + 1].clone().sub(path[index]);
      root.rotation.z = Math.atan2(direction.z, direction.x) * 0.18;
      const distance = previousX == null ? 0.015 : current.x - previousX;
      leftWheel.rotation.z += distance * 9;
      rightWheel.rotation.z += distance * 9;
      root.userData.previousPathX = current.x;
    };
  }

  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}

async function loadObjWithMaterials(objFile: string, mtlFile: string) {
  const basePath = "/assets/nova-carter/meshes/";
  const materials = await new MTLLoader().setPath(basePath).loadAsync(mtlFile);
  materials.preload();
  const object = await new OBJLoader().setMaterials(materials).setPath(basePath).loadAsync(objFile);
  return object;
}

type MujocoModel = {
  group: THREE.Group;
  namedBodies: Map<string, THREE.Group>;
  bodyOrder: THREE.Group[];
};

async function createUnitreeG1Assembly(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number, training = false) {
  const model = await loadMujocoModel("/assets/unitree_g1", "g1_with_hands.xml", training ? 2.7 : 2.35);
  model.group.userData.animate = (time: number) => {
    if (training) {
      const baseY = getBaseY(model.group);
      const phase = positiveModulo(time - startedAt, 10.5) / 10.5;
      const stride = Math.sin(phase * Math.PI * 2);
      model.group.position.x = 0.05 + stride * 0.42;
      model.group.position.y = baseY + Math.abs(stride) * 0.055;
      model.group.position.z = 0.05 + Math.cos(phase * Math.PI * 2) * 0.22;
      model.group.rotation.z = stride * 0.18;
    }
    animateUnitreeG1(model.namedBodies, time, training);
  };
  scene.add(model.group);
  scheduleMujocoReveal(model, assemblyMeshes, startedAt, 0.035);
}

async function createFrankaPandaAssembly(
  scene: THREE.Scene,
  assemblyMeshes: AssemblyMesh[],
  startedAt: number,
  training: boolean,
) {
  const model = await loadMujocoModel("/assets/franka_emika_panda", "panda.xml", 3.35);
  model.group.position.set(-0.22, 0, 0.28);
  model.group.userData.animate = (time: number) => {
    if (training) {
      const baseY = getBaseY(model.group);
      const phase = positiveModulo(time - startedAt, 12) / 12;
      const sweep = Math.sin(phase * Math.PI * 3);
      model.group.position.set(-0.22 + sweep * 0.08, baseY, 0.28 + Math.sin(phase * Math.PI * 2) * 0.1);
      model.group.rotation.x = -Math.PI / 2;
      model.group.rotation.y = sweep * 0.42;
      model.group.rotation.z = Math.sin(phase * Math.PI * 2) * 0.28;
    }
    animateFrankaPanda(model.namedBodies, time, training);
  };
  scene.add(model.group);
  scheduleMujocoReveal(model, assemblyMeshes, startedAt, 0.12);
}

function scheduleMujocoReveal(
  model: MujocoModel,
  assemblyMeshes: AssemblyMesh[],
  startedAt: number,
  cadence: number,
) {
  assemblyMeshes.push({ mesh: model.group, startTime: startedAt, duration: 0.01, noReveal: true });
  model.bodyOrder.forEach((body, index) => {
    body.userData.revealOnly = true;
    assemblyMeshes.push({
      mesh: body,
      startTime: startedAt + index * cadence,
      duration: Math.min(0.48, cadence * 4.2),
      revealOnly: true,
    });
  });
  return model.bodyOrder.length * cadence;
}

async function createTrainingDemoScene(
  scene: THREE.Scene,
  assemblyMeshes: AssemblyMesh[],
  startedAt: number,
  model: RobotModel,
) {
  type TrainingEntry = {
    file: string;
    position: THREE.Vector3;
    size: number;
    color: string;
    rotation?: THREE.Euler;
    float?: boolean;
    taskTo?: THREE.Vector3;
    taskStart?: number;
    taskCycle?: number;
  };
  const entries =
    model === "desktop"
      ? [
          { file: "robotic-arm-trash-picking/blue_recycling_bin_detailed.stl", position: new THREE.Vector3(-0.84, 0, -1.08), size: 0.34, color: "#2367a8", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.08) },
          { file: "robotic-arm-trash-picking/green_compost_bin_detailed.stl", position: new THREE.Vector3(0, 0, -1.08), size: 0.34, color: "#3f8c50", rotation: new THREE.Euler(-Math.PI / 2, 0, 0) },
          { file: "robotic-arm-trash-picking/black_trash_bin_detailed.stl", position: new THREE.Vector3(0.84, 0, -1.08), size: 0.34, color: "#15191b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.08) },
          { file: "robotic-arm-trash-picking/realistic_plastic_bottle.stl", position: new THREE.Vector3(-0.52, 0, 0.66), size: 0.16, color: "#9eb9d2", rotation: new THREE.Euler(0, 0.4, Math.PI / 2), taskTo: new THREE.Vector3(-0.84, 0.34, -1.08), taskStart: 2.4, taskCycle: 12 },
          { file: "robotic-arm-trash-picking/crinkled_chips_package.stl", position: new THREE.Vector3(0.02, 0, 0.72), size: 0.16, color: "#d0a139", rotation: new THREE.Euler(0, -0.2, 0.4), taskTo: new THREE.Vector3(0.84, 0.34, -1.08), taskStart: 5.2, taskCycle: 12 },
          { file: "robotic-arm-trash-picking/rotten_banana_realistic.stl", position: new THREE.Vector3(0.56, 0, 0.66), size: 0.16, color: "#8a7a28", rotation: new THREE.Euler(0, 0.8, 0.15), taskTo: new THREE.Vector3(0, 0.34, -1.08), taskStart: 8.0, taskCycle: 12 },
        ]
      : model === "nova"
        ? [
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(-1.28, 0, 0.62), size: 0.44, color: "#6d7478", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.35) },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(-0.62, 0, 0.08), size: 0.42, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.4) },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(-0.05, 0, 0.72), size: 0.42, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.85) },
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(0.5, 0, -0.82), size: 0.4, color: "#62696d", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.65) },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(1.08, 0, -0.24), size: 0.4, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.22) },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(1.42, 0, 0.58), size: 0.4, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.18) },
            { file: "rover-debris-training/rescue_star_people_marker.stl", position: new THREE.Vector3(-0.42, 0, -0.88), size: 0.18, color: "#d0a139", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.2) },
            { file: "rover-debris-training/rescue_star_people_marker.stl", position: new THREE.Vector3(1.1, 0, -1.06), size: 0.17, color: "#ffd15b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.3) },
          ]
        : [
            { file: "humanoid-factory-work/01_conveyor_support_frame_damaged.stl", position: new THREE.Vector3(-1.2, 0, -0.85), size: 0.55, color: "#59666a", rotation: new THREE.Euler(0, 0.12, 0) },
            { file: "humanoid-factory-work/02_conveyor_belt_torn_with_ribs.stl", position: new THREE.Vector3(-1.2, 0.2, -0.85), size: 0.55, color: "#202426", rotation: new THREE.Euler(0, 0.12, 0) },
            { file: "humanoid-factory-work/07_sparking_control_panel_body_damaged.stl", position: new THREE.Vector3(1.15, 0, -0.8), size: 0.42, color: "#4c575b", rotation: new THREE.Euler(0, -0.35, 0) },
            { file: "humanoid-factory-work/09_spark_rays_and_burst_cluster.stl", position: new THREE.Vector3(0.92, 0.82, -0.78), size: 0.28, color: "#d0a139", rotation: new THREE.Euler(0.1, 0, -0.2), float: true },
            { file: "humanoid-factory-work/21_rain_streaks_mesh_cluster.stl", position: new THREE.Vector3(0, 2.25, -0.15), size: 0.85, color: "#7ba9d6", rotation: new THREE.Euler(0.18, 0, -0.24), float: true },
            { file: "humanoid-factory-work/14_damaged_parts_crate_with_contents.stl", position: new THREE.Vector3(0.9, 0, 0.72), size: 0.4, color: "#7a5b36", rotation: new THREE.Euler(0, 0.25, 0) },
            { file: "humanoid-factory-work/12_scattered_gears_and_sprockets.stl", position: new THREE.Vector3(0.62, 0, 0.36), size: 0.34, color: "#d0a139", rotation: new THREE.Euler(0, -0.35, 0.2), taskTo: new THREE.Vector3(-1.08, 0.62, -0.84), taskStart: 2.7, taskCycle: 10.5 },
          ] satisfies TrainingEntry[];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index] as TrainingEntry;
    const object = await loadTrainingStl(`/assets/training-demo/${entry.file}`, entry.size, entry.color);
    object.position.copy(entry.position);
    if (entry.rotation) object.rotation.copy(entry.rotation);
    if (entry.float) object.userData.excludeFromFrame = true;
    if (!entry.float) setObjectOnGround(object, entry.position.y);
    if (entry.taskTo && entry.taskStart != null) {
      object.userData.taskMotion = {
        from: object.position.clone(),
        to: entry.taskTo.clone(),
        start: startedAt + entry.taskStart,
        cycle: entry.taskCycle ?? 11,
        lift: model === "desktop" ? 0.52 : 0.42,
      };
      object.userData.animate = (time: number) => {
        animateTaskObject(object, time, object.userData.taskMotion);
      };
    }
    scene.add(object);
    assemblyMeshes.push({ mesh: object, startTime: startedAt + index * 0.22, duration: 0.34 });
  }
}

async function loadTrainingStl(file: string, targetSize: number, color: string) {
  const geometry = await new STLLoader().loadAsync(file);
  geometry.computeVertexNormals();
  geometry.center();
  geometry.computeBoundingBox();
  const size = new THREE.Vector3();
  geometry.boundingBox?.getSize(size);
  const largest = Math.max(size.x, size.y, size.z, 0.001);
  geometry.scale(targetSize / largest, targetSize / largest, targetSize / largest);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.56, metalness: 0.18 }),
  );
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function setObjectOnGround(object: THREE.Object3D, groundY = 0) {
  object.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(object);
  if (Number.isFinite(box.min.y)) object.position.y += groundY - box.min.y;
}

async function loadMujocoModel(baseUrl: string, xmlFile: string, displayScale: number): Promise<MujocoModel> {
  const xmlText = await fetch(`${baseUrl}/${xmlFile}`).then((response) => {
    if (!response.ok) throw new Error(`Unable to load ${xmlFile}`);
    return response.text();
  });
  const xml = new DOMParser().parseFromString(xmlText, "application/xml");
  const compiler = xml.querySelector("compiler");
  const meshDir = compiler?.getAttribute("meshdir") ?? "assets";
  const materials = parseMujocoMaterials(xml);
  const meshes = parseMujocoMeshes(xml);
  const cache = new Map<string, Promise<THREE.Object3D>>();
  const namedBodies = new Map<string, THREE.Group>();
  const bodyOrder: THREE.Group[] = [];
  const root = new THREE.Group();
  root.rotation.x = -Math.PI / 2;
  root.scale.setScalar(displayScale);

  const worldBodies = Array.from(xml.querySelectorAll("worldbody > body"));
  for (const body of worldBodies) {
    root.add(await buildMujocoBody(body, { baseUrl, meshDir, meshes, materials, cache, namedBodies, bodyOrder }));
  }

  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  return { group: root, namedBodies, bodyOrder };
}

async function buildMujocoBody(
  bodyNode: Element,
  context: {
    baseUrl: string;
    meshDir: string;
    meshes: Map<string, string>;
    materials: Map<string, THREE.Material>;
    cache: Map<string, Promise<THREE.Object3D>>;
    namedBodies: Map<string, THREE.Group>;
    bodyOrder: THREE.Group[];
  },
) {
  const group = new THREE.Group();
  const name = bodyNode.getAttribute("name");
  if (name) {
    group.name = name;
    context.namedBodies.set(name, group);
  }
  context.bodyOrder.push(group);
  applyMujocoTransform(group, bodyNode);

  for (const geom of Array.from(bodyNode.children).filter((child) => child.tagName === "geom")) {
    const rendered = await buildMujocoGeom(geom, context);
    if (rendered) group.add(rendered);
  }

  for (const childBody of Array.from(bodyNode.children).filter((child) => child.tagName === "body")) {
    group.add(await buildMujocoBody(childBody, context));
  }

  return group;
}

async function buildMujocoGeom(
  geomNode: Element,
  context: {
    baseUrl: string;
    meshDir: string;
    meshes: Map<string, string>;
    materials: Map<string, THREE.Material>;
    cache: Map<string, Promise<THREE.Object3D>>;
  },
) {
  if ((geomNode.getAttribute("class") ?? "").includes("collision")) return null;
  const meshName = geomNode.getAttribute("mesh");
  let object: THREE.Object3D | null = null;

  if (meshName) {
    const file = context.meshes.get(meshName) ?? context.meshes.get(`${meshName}.obj`) ?? context.meshes.get(`${meshName}.stl`) ?? meshName;
    object = (await loadMujocoMesh(`${context.baseUrl}/${context.meshDir}/${file}`, context.cache)).clone(true);
    const material = meshName.includes("logo") ? accentMaterial : context.materials.get(geomNode.getAttribute("material") ?? "");
    if (material) {
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material = material.clone();
      });
    }
  } else {
    object = createMujocoPrimitive(geomNode, context.materials.get(geomNode.getAttribute("material") ?? ""));
  }

  if (!object) return null;
  applyMujocoTransform(object, geomNode);
  return object;
}

async function loadMujocoMesh(url: string, cache: Map<string, Promise<THREE.Object3D>>) {
  if (!cache.has(url)) {
    const promise = url.toLowerCase().endsWith(".stl")
      ? new STLLoader().loadAsync(url).then((geometry) => {
          geometry.computeVertexNormals();
          return new THREE.Mesh(geometry, jointMaterial.clone());
        })
      : new OBJLoader().loadAsync(url).then((object) => object);
    cache.set(url, promise);
  }
  return cache.get(url)!;
}

function parseMujocoMaterials(xml: Document) {
  const materials = new Map<string, THREE.Material>();
  xml.querySelectorAll("asset > material").forEach((node) => {
    const name = node.getAttribute("name");
    if (!name) return;
    const rgba = parseNumberList(node.getAttribute("rgba"), [0.72, 0.75, 0.76, 1]);
    materials.set(
      name,
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(rgba[0], rgba[1], rgba[2]),
        opacity: rgba[3] ?? 1,
        transparent: (rgba[3] ?? 1) < 1,
        roughness: name === "black" ? 0.58 : 0.34,
        metalness: name === "metal" ? 0.62 : 0.16,
      }),
    );
  });
  return materials;
}

function parseMujocoMeshes(xml: Document) {
  const meshes = new Map<string, string>();
  xml.querySelectorAll("asset > mesh").forEach((node) => {
    const file = node.getAttribute("file");
    if (!file) return;
    const implicitName = file.replace(/\.(obj|stl|STL)$/i, "");
    meshes.set(node.getAttribute("name") ?? implicitName, file);
    meshes.set(implicitName, file);
  });
  return meshes;
}

function applyMujocoTransform(object: THREE.Object3D, node: Element) {
  const pos = parseNumberList(node.getAttribute("pos"), [0, 0, 0]);
  object.position.set(pos[0] ?? 0, pos[1] ?? 0, pos[2] ?? 0);

  const quat = parseNumberList(node.getAttribute("quat"), []);
  if (quat.length === 4) {
    object.quaternion.set(quat[1], quat[2], quat[3], quat[0]).normalize();
  }

  const euler = parseNumberList(node.getAttribute("euler"), []);
  if (euler.length === 3) {
    object.rotation.set(euler[0], euler[1], euler[2]);
  }
  object.userData.baseQuaternion = object.quaternion.clone();
}

function createMujocoPrimitive(geomNode: Element, material?: THREE.Material) {
  const type = geomNode.getAttribute("type");
  const size = parseNumberList(geomNode.getAttribute("size"), []);
  const mat = material?.clone() ?? bodyMaterial.clone();
  if (type === "box" && size.length >= 3) {
    return new THREE.Mesh(new THREE.BoxGeometry(size[0] * 2, size[1] * 2, size[2] * 2), mat);
  }
  if (type === "sphere" && size.length >= 1) {
    return new THREE.Mesh(new THREE.SphereGeometry(size[0], 16, 8), mat);
  }
  if (type === "cylinder" && size.length >= 2) {
    return new THREE.Mesh(new THREE.CylinderGeometry(size[0], size[0], size[1] * 2, 24), mat);
  }
  return null;
}

function parseNumberList(value: string | null, fallback: number[]) {
  if (!value) return fallback;
  const parsed = value.trim().split(/\s+/).map(Number).filter(Number.isFinite);
  return parsed.length > 0 ? parsed : fallback;
}

function animateUnitreeG1(bodies: Map<string, THREE.Group>, time: number, training = false) {
  const gait = Math.sin(time * 1.2) * (training ? 0.18 : 0.06);
  const reach = training ? (Math.sin(time * 0.95) + 1) / 2 : 0;
  const inspect = training ? Math.sin(time * 2.1) * 0.18 : 0;
  rotateBody(bodies, "left_shoulder_pitch_link", "y", 0.08 + gait + reach * 0.52);
  rotateBody(bodies, "right_shoulder_pitch_link", "y", 0.08 - gait - reach * 0.48);
  rotateBody(bodies, "left_shoulder_roll_link", "x", training ? -0.28 - reach * 0.22 : 0);
  rotateBody(bodies, "right_shoulder_roll_link", "x", training ? 0.28 + reach * 0.22 : 0);
  rotateBody(bodies, "left_elbow_link", "y", -0.08 - reach * 0.72 + Math.sin(time * 1.5) * 0.08);
  rotateBody(bodies, "right_elbow_link", "y", -0.08 - reach * 0.68 - Math.sin(time * 1.5) * 0.08);
  rotateBody(bodies, "left_wrist_pitch_link", "y", -0.18 + inspect);
  rotateBody(bodies, "right_wrist_pitch_link", "y", -0.2 - inspect);
  rotateBody(bodies, "left_hip_pitch_link", "y", -0.015 - gait * 0.18 - (training ? 0.035 : 0));
  rotateBody(bodies, "right_hip_pitch_link", "y", -0.015 + gait * 0.18 - (training ? 0.035 : 0));
  rotateBody(bodies, "left_knee_link", "y", 0.025 + Math.max(gait, 0) * 0.18 + reach * 0.09);
  rotateBody(bodies, "right_knee_link", "y", 0.025 + Math.max(-gait, 0) * 0.18 + reach * 0.09);
  rotateBody(bodies, "torso_link", "z", Math.sin(time * 0.7) * (training ? 0.09 : 0.035));
  rotateBody(bodies, "waist_yaw_link", "z", training ? Math.sin(time * 0.85) * 0.24 : 0);
}

function animateFrankaPanda(bodies: Map<string, THREE.Group>, time: number, training: boolean) {
  const speed = training ? 1.7 : 0.65;
  const phase = training ? positiveModulo(time, 12) / 12 : (Math.sin(time * speed) + 1) / 2;
  const reach = training ? Math.sin(phase * Math.PI * 3) : Math.sin(time * speed);
  rotateBody(bodies, "link1", "z", reach * 0.86);
  rotateBody(bodies, "link2", "z", -0.7 + Math.sin(time * speed + 0.9) * 0.62);
  rotateBody(bodies, "link3", "z", Math.cos(time * speed + 0.4) * 0.48);
  rotateBody(bodies, "link4", "z", -1.05 + Math.sin(time * speed + 1.6) * 0.58);
  rotateBody(bodies, "link5", "z", Math.cos(time * speed * 1.2) * 0.68);
  rotateBody(bodies, "link6", "z", 0.3 + Math.sin(time * speed * 1.4) * 0.58);
  rotateBody(bodies, "link7", "z", Math.cos(time * speed * 1.6) * 0.42);
  const graspWindow = training && (phase > 0.16 && phase < 0.68);
  const grip = graspWindow ? 0.006 : 0.038;
  bodies.get("left_finger")?.position.set(0, grip, 0.0584);
  bodies.get("right_finger")?.position.set(0, -grip, 0.0584);
}

function rotateBody(bodies: Map<string, THREE.Group>, name: string, axis: "x" | "y" | "z", angle: number) {
  const body = bodies.get(name);
  if (!body) return;
  const base = (body.userData.baseQuaternion as THREE.Quaternion | undefined) ?? new THREE.Quaternion();
  const axisVector =
    axis === "x" ? new THREE.Vector3(1, 0, 0) : axis === "y" ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(0, 0, 1);
  body.quaternion.copy(base).multiply(new THREE.Quaternion().setFromAxisAngle(axisVector, angle));
}

function createOpenBin(material: THREE.Material) {
  const group = new THREE.Group();
  const floor = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.08, 0.72), material);
  floor.position.y = 0.04;
  const back = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.34, 0.06), material.clone());
  back.position.set(0, 0.21, -0.33);
  const left = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.34, 0.72), material.clone());
  left.position.set(-0.33, 0.21, 0);
  const right = left.clone();
  right.position.x = 0.33;
  group.add(floor, back, left, right);
  return group;
}

async function createDesktopSortingAssembly(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number) {
  const parts: Array<{ mesh: THREE.Object3D; delay: number }> = [];
  const arm = await createRoboticArmFromAssets();
  arm.group.position.set(0, 0, 0);
  arm.group.userData.animate = (time: number) => {
    const phase = Math.sin(time * 2.2);
    arm.shoulder.rotation.z = -0.18 + phase * 0.42;
    arm.elbow.rotation.z = -0.7 + Math.cos(time * 2.4) * 0.32;
    arm.wrist.rotation.z = Math.sin(time * 3.1) * 0.55;
  };
  parts.push({ mesh: arm.group, delay: 0 });

  const boxMaterial = new THREE.MeshStandardMaterial({ color: "#7a5b36", roughness: 0.9, metalness: 0.02 });
  [-1.2, 0, 1.2].forEach((x, index) => {
    const bin = new THREE.Mesh(new THREE.BoxGeometry(0.72, 0.42, 0.72), boxMaterial.clone());
    bin.position.set(x, 0.21, -1.3);
    parts.push({ mesh: bin, delay: 0.35 + index * 0.12 });
  });

  const cube = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.38, 0.38), darkMetal.clone());
  cube.position.set(-0.65, 0.19, 1.0);
  cube.userData.motion = { from: cube.position.clone(), to: new THREE.Vector3(-1.2, 0.54, -1.3), start: startedAt + 2.2, duration: 1.2 };
  parts.push({ mesh: cube, delay: 0.8 });

  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 16), bodyMaterial.clone());
  sphere.position.set(0, 0.22, 1.0);
  sphere.userData.motion = { from: sphere.position.clone(), to: new THREE.Vector3(0, 0.54, -1.3), start: startedAt + 3.7, duration: 1.2 };
  parts.push({ mesh: sphere, delay: 0.95 });

  const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.21, 0.21, 0.42, 32), accentMaterial.clone());
  cylinder.position.set(0.65, 0.21, 1.0);
  cylinder.userData.motion = { from: cylinder.position.clone(), to: new THREE.Vector3(1.2, 0.54, -1.3), start: startedAt + 5.2, duration: 1.2 };
  parts.push({ mesh: cylinder, delay: 1.1 });

  addMoonshotBadge(arm.group, new THREE.Vector3(0, 0.38, 0.55), 0.15);

  parts.forEach(({ mesh, delay }) => {
    mesh.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(mesh);
    assemblyMeshes.push({ mesh, startTime: startedAt + delay, duration: 0.28 });
  });
}

async function createRoboticArmFromAssets() {
  const arm = createRobotAssembly();
  arm.group.userData.assetSource = "idō/robotic-arm";
  return arm;
}

async function loadArmPart(loader: STLLoader, file: string, targetSize: number, material: THREE.Material) {
  const geometry = await loader.loadAsync(`/assets/robotic-arm/${file}`);
  geometry.computeVertexNormals();
  geometry.center();
  geometry.computeBoundingBox();
  const size = new THREE.Vector3();
  geometry.boundingBox?.getSize(size);
  const largest = Math.max(size.x, size.y, size.z, 0.001);
  geometry.scale(targetSize / largest, targetSize / largest, targetSize / largest);
  const mesh = new THREE.Mesh(geometry, material);
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function makeTireMaterial() {
  return new THREE.MeshStandardMaterial({ color: "#111517", roughness: 0.9, metalness: 0.05 });
}

function addMoonshotBadge(parent: THREE.Object3D, position: THREE.Vector3, scale: number) {
  const badge = new THREE.Mesh(new THREE.CylinderGeometry(scale, scale, 0.018, 32), accentMaterial.clone());
  badge.position.copy(position);
  badge.rotation.x = Math.PI / 2;
  parent.add(badge);
}

function createLinkCylinder(from: THREE.Vector3, to: THREE.Vector3, radius: number, material: THREE.Material) {
  const direction = new THREE.Vector3().subVectors(to, from);
  const length = Math.max(direction.length(), 0.001);
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, length, 18), material);
  mesh.position.copy(from).add(to).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createMoonshotGrid() {
  const group = new THREE.Group();
  const size = 72;
  const divisions = 36;
  const grid = new THREE.GridHelper(size, divisions, "#262a2d", "#171a1c");
  grid.material.transparent = true;
  grid.material.opacity = 0.72;
  group.add(grid);

  const red = new THREE.LineBasicMaterial({ color: "#6d3432", transparent: true, opacity: 0.72 });
  const green = new THREE.LineBasicMaterial({ color: "#4c7653", transparent: true, opacity: 0.72 });
  const xAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-size / 2, 0.012, 0),
    new THREE.Vector3(size / 2, 0.012, 0),
  ]);
  const zAxis = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0, 0.014, -size / 2),
    new THREE.Vector3(0, 0.014, size / 2),
  ]);
  group.add(new THREE.Line(xAxis, red));
  group.add(new THREE.Line(zAxis, green));
  return group;
}

function createRobotAssembly() {
  const group = new THREE.Group();
  const shoulder = new THREE.Group();
  const elbow = new THREE.Group();
  const wrist = new THREE.Group();

  const base = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.86, 0.34, 48), darkMetal);
  base.position.y = 0.17;
  base.castShadow = true;
  group.add(base);

  const column = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 1.15, 36), jointMaterial);
  column.position.y = 0.82;
  column.castShadow = true;
  group.add(column);

  shoulder.position.y = 1.42;
  const shoulderJoint = new THREE.Mesh(new THREE.SphereGeometry(0.34, 36, 18), accentMaterial);
  shoulder.add(shoulderJoint);

  const upper = createLink(2.45);
  upper.position.x = 1.18;
  shoulder.add(upper);

  elbow.position.x = 2.38;
  const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.28, 36, 18), jointMaterial);
  elbow.add(elbowJoint);

  const forearm = createLink(1.85);
  forearm.position.x = 0.92;
  elbow.add(forearm);

  wrist.position.x = 1.82;
  const wristJoint = new THREE.Mesh(new THREE.SphereGeometry(0.21, 32, 16), accentMaterial);
  wrist.add(wristJoint);
  const gripper = new THREE.Mesh(new THREE.BoxGeometry(0.54, 0.22, 0.22), jointMaterial);
  gripper.position.x = 0.42;
  wrist.add(gripper);

  elbow.add(wrist);
  shoulder.add(elbow);
  group.add(shoulder);

  return { group, shoulder, elbow, wrist };
}

function createLink(length: number) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(length, 0.24, 0.34), darkMetal);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

function createRobotPartMesh() {
  const group = new THREE.Group();
  const block = new THREE.Mesh(new THREE.BoxGeometry(1.16, 0.44, 0.68), darkMetal.clone());
  const hubA = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.18, 24), accentMaterial.clone());
  const hubB = hubA.clone();
  hubA.rotation.x = Math.PI / 2;
  hubB.rotation.x = Math.PI / 2;
  hubA.position.z = 0.43;
  hubB.position.z = -0.43;
  group.add(block, hubA, hubB);
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return group;
}

function makeAssetMaterial(file: string) {
  if (file.includes("rubber_hand")) {
    return new THREE.MeshStandardMaterial({ color: "#202426", roughness: 0.82, metalness: 0.08 });
  }
  if (file.includes("logo")) {
    return accentMaterial.clone();
  }
  if (file.includes("head") || file.includes("torso") || file.includes("pelvis")) {
    return jointMaterial.clone();
  }
  return new THREE.MeshStandardMaterial({ color: "#59666a", roughness: 0.48, metalness: 0.55 });
}

function getAssetSize(file: string) {
  if (file.includes("torso")) return 1.05;
  if (file.includes("pelvis")) return 0.82;
  if (file.includes("head")) return 0.55;
  if (file.includes("rubber_hand")) return 0.45;
  if (file.includes("hand_")) return 0.2;
  if (file.includes("knee") || file.includes("shoulder")) return 0.38;
  if (file.includes("ankle") || file.includes("wrist")) return 0.25;
  return 0.34;
}

function getAssetRotation(file: string) {
  if (file.startsWith("left_")) return 0.08;
  if (file.startsWith("right_")) return -0.08;
  return 0;
}

function getHumanoidTarget(file: string) {
  const side = file.startsWith("left_") ? -1 : file.startsWith("right_") ? 1 : 0;
  const handSpread = file.includes("thumb") ? 0.13 : file.includes("index") ? 0.03 : file.includes("middle") ? -0.08 : 0;

  if (file === "pelvis.STL") return new THREE.Vector3(0, 1.08, 0);
  if (file.includes("pelvis_contour")) return new THREE.Vector3(0, 1.18, 0);
  if (file.includes("waist_yaw")) return new THREE.Vector3(0, 1.43, 0);
  if (file.includes("waist_roll")) return new THREE.Vector3(0, 1.62, 0);
  if (file.includes("torso")) return new THREE.Vector3(0, 2.08, 0);
  if (file.includes("logo")) return new THREE.Vector3(0, 2.2, -0.31);
  if (file.includes("head")) return new THREE.Vector3(0, 2.72, 0);

  if (file.includes("hip_yaw")) return new THREE.Vector3(side * 0.28, 0.9, 0);
  if (file.includes("hip_roll")) return new THREE.Vector3(side * 0.34, 0.68, 0);
  if (file.includes("hip_pitch")) return new THREE.Vector3(side * 0.36, 0.48, 0);
  if (file.includes("knee")) return new THREE.Vector3(side * 0.37, 0.12, 0);
  if (file.includes("ankle_pitch")) return new THREE.Vector3(side * 0.38, -0.24, 0.02);
  if (file.includes("ankle_roll")) return new THREE.Vector3(side * 0.38, -0.4, -0.02);

  if (file.includes("shoulder_pitch")) return new THREE.Vector3(side * 0.55, 2.24, 0);
  if (file.includes("shoulder_roll")) return new THREE.Vector3(side * 0.73, 2.05, 0);
  if (file.includes("shoulder_yaw")) return new THREE.Vector3(side * 0.9, 1.82, 0);
  if (file.includes("elbow")) return new THREE.Vector3(side * 1.03, 1.5, 0);
  if (file.includes("wrist_yaw")) return new THREE.Vector3(side * 1.08, 1.22, 0);
  if (file.includes("wrist_pitch")) return new THREE.Vector3(side * 1.1, 1.08, 0);
  if (file.includes("wrist_roll")) return new THREE.Vector3(side * 1.12, 0.94, 0);

  if (file.includes("hand_palm") || file.includes("rubber_hand")) {
    return new THREE.Vector3(side * 1.16, 0.78, 0);
  }
  if (file.includes("hand_")) {
    const segment = file.includes("_0_") ? 0 : file.includes("_1_") ? -0.1 : -0.2;
    return new THREE.Vector3(side * (1.2 + Math.abs(segment) * 0.6), 0.69 + segment * 0.55, handSpread);
  }

  return new THREE.Vector3(0, 1.5, 0);
}

function animateRobot(
  robot: ReturnType<typeof createRobotAssembly>,
  elapsed: number,
) {
  robot.group.rotation.y = Math.sin(elapsed * 0.35) * 0.45;
  robot.shoulder.rotation.z = 0.28 + Math.sin(elapsed * 0.8) * 0.24;
  robot.elbow.rotation.z = -0.52 + Math.cos(elapsed * 0.95) * 0.36;
  robot.wrist.rotation.z = Math.sin(elapsed * 1.4) * 0.5;
}
