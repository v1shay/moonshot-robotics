import * as CANNON from "cannon-es";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { RobotModel } from "./libraryAssets";

export type SpawnKind = "box" | "sphere" | "cylinder" | "robot";

export type AssetPreviewRequest = {
  id: string;
  model: RobotModel;
  file: string;
  label: string;
};

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
  assetPreviewRequest: AssetPreviewRequest | null;
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
  assetPreviewRequest,
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
	    previewAsset: (request: AssetPreviewRequest) => void;
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
    let libraryPreview: THREE.Object3D | null = null;
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
      clearLibraryPreview();
      robot.group.visible = false;
      onWorkflowStatus("Idle");
    }

    function clearLibraryPreview() {
      if (!libraryPreview) return;
      scene.remove(libraryPreview);
      libraryPreview.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.dispose();
          const material = child.material;
          if (Array.isArray(material)) material.forEach((entry) => entry.dispose());
          else material.dispose();
        }
      });
      libraryPreview = null;
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
      clearLibraryPreview();
      dynamic.splice(0).forEach(({ body, mesh }) => {
        world.removeBody(body);
        scene.remove(mesh);
      });
      robot.group.visible = false;
      onWorkflowStatus(`Luna reading ${model === "humanoid" ? "humanoid worker" : model === "nova" ? "Luna Rover" : "desktop sorting arm"} asset tree`);
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
        onWorkflowStatus(training ? "Desktop sorting arm training scene running" : "Desktop sorting arm assembled and ready");
        return;
      }

      await createUnitreeG1Assembly(scene, assemblyMeshes, startedAt, training);
      if (training) await createTrainingDemoScene(scene, assemblyMeshes, startedAt + 1.2, model);

      floorAlignAssembly(assemblyMeshes);
      frameAssembly(assemblyMeshes, model);
      prepareReveal(assemblyMeshes);
      onWorkflowStatus(training ? "Humanoid warehouse loading training scene running" : "Humanoid worker assembled and ready for training");
    }

    async function previewAsset(request: AssetPreviewRequest) {
      clearLibraryPreview();
      const url = resolveLibraryAssetUrl(request);
      if (!url) {
        onWorkflowStatus(`${request.label} has no viewport mesh attached`);
        return;
      }
      try {
        const object = await loadPreviewAsset(url);
        normalizeObjectSize(object, 0.9);
        object.position.set(-1.35, 0.02, -0.95);
        setObjectOnGround(object, 0.02);
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (!child.material) child.material = jointMaterial.clone();
          }
        });
        scene.add(object);
        libraryPreview = object;
        controls.target.set(-1.35, 0.38, -0.95);
        camera.position.set(0.25, 1.1, 0.55);
        controls.update();
        onWorkflowStatus(`Previewing ${request.label}`);
      } catch {
        onWorkflowStatus(`Unable to preview ${request.label}`);
      }
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

    apiRef.current = { spawn, reset, runAssembly, previewAsset, setStageLights, setCameraMode };
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
    if (assetPreviewRequest) {
      apiRef.current?.previewAsset(assetPreviewRequest);
    }
  }, [assetPreviewRequest]);

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
  task?: { from: THREE.Vector3; to: THREE.Vector3; start: number; cycle: number; lift: number; hold?: THREE.Vector3 },
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
    object.position.lerpVectors(task.from, task.hold ?? task.from, smoothStep(t));
    object.position.y += smoothStep(t) * task.lift;
    return;
  }
  if (local < carryEnd) {
    const t = smoothStep((local - liftEnd) / (carryEnd - liftEnd));
    object.position.lerpVectors(task.hold ?? task.from, task.to, t);
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

const roverRoutePoints = [
  new THREE.Vector3(-2.12, 0, 1.26),
  new THREE.Vector3(-1.42, 0, 0.44),
  new THREE.Vector3(-0.62, 0, -1.06),
  new THREE.Vector3(0.32, 0, -0.28),
  new THREE.Vector3(1.22, 0, -1.08),
  new THREE.Vector3(2.05, 0, -0.08),
  new THREE.Vector3(1.1, 0, 1.05),
  new THREE.Vector3(0.18, 0, 0.34),
  new THREE.Vector3(-0.84, 0, 1.14),
];

function getRoverPose(time: number, startedAt: number, baseY: number) {
  const curve = new THREE.CatmullRomCurve3(
    roverRoutePoints.map((point) => new THREE.Vector3(point.x, baseY, point.z)),
    true,
    "catmullrom",
    0.42,
  );
  const phase = positiveModulo(time - startedAt, 20) / 20;
  const position = curve.getPointAt(phase);
  const tangent = curve.getTangentAt(phase);
  return {
    position,
    heading: Math.atan2(tangent.z, tangent.x),
    speed: tangent.length(),
    phase,
  };
}

function animateRoverStar(object: THREE.Object3D, time: number, startedAt: number, baseY: number, pickupPhase: number) {
  const phase = positiveModulo(time - startedAt, 20) / 20;
  const rescued = phase >= pickupPhase;
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: rescued ? "#2cff75" : "#d0a139",
        roughness: 0.48,
        metalness: rescued ? 0.16 : 0.08,
        emissive: rescued ? new THREE.Color("#0a8f35") : new THREE.Color("#000000"),
        emissiveIntensity: rescued ? 0.45 : 0,
      });
    }
  });
  object.position.y = baseY + (rescued ? Math.sin(time * 5) * 0.012 : 0);
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
      const pose = getRoverPose(time, startedAt, baseY);
      const previous = root.userData.previousPathPosition as THREE.Vector3 | undefined;
      root.position.copy(pose.position);
      root.rotation.set(-Math.PI / 2, 0, pose.heading - Math.PI / 2);
      const distance = previous ? pose.position.distanceTo(previous) : 0.015;
      leftWheel.rotation.z -= distance * 13;
      rightWheel.rotation.z -= distance * 13;
      root.userData.previousPathPosition = pose.position.clone();
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
  if (training) {
    model.group.position.set(-0.36, 0, 0.64);
    model.group.userData.trainingBasePosition = model.group.position.clone();
  }
  model.group.userData.animate = (time: number) => {
    animateUnitreeG1(model.namedBodies, time, training, startedAt, model.group);
  };
  scene.add(model.group);
  scheduleMujocoReveal(model, assemblyMeshes, startedAt, training ? 0.065 : 0.052);
}

async function createFrankaPandaAssembly(
  scene: THREE.Scene,
  assemblyMeshes: AssemblyMesh[],
  startedAt: number,
  training: boolean,
) {
  const model = await loadMujocoModel("/assets/franka_emika_panda", "panda.xml", 3.35);
  model.group.position.set(training ? -0.02 : 0.2, training ? 0.31 : 0, 0.22);
  model.group.userData.animate = (time: number) => {
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
  if (model === "humanoid") {
    await createWarehouseToteLoadingScene(scene, assemblyMeshes, startedAt);
    return;
  }

  type TrainingEntry = {
    file: string;
    position: THREE.Vector3;
    size: number;
    color: string;
    rotation?: THREE.Euler;
    float?: boolean;
    taskTo?: THREE.Vector3;
    hold?: THREE.Vector3;
    taskStart?: number;
    taskCycle?: number;
	    roverPickup?: number;
	    stretchY?: number;
	    binSlot?: number;
	  };
  if (model === "desktop") addDesktopSortingTable(scene, assemblyMeshes, startedAt);
  const entries =
    model === "desktop"
      ? [
	          { file: "robotic-arm-trash-picking/blue_recycling_bin_detailed.stl", position: new THREE.Vector3(0.08, 0.265, -0.24), size: 0.39, color: "#2367a8", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.02), binSlot: 0 },
	          { file: "robotic-arm-trash-picking/green_compost_bin_detailed.stl", position: new THREE.Vector3(0.38, 0.265, -0.27), size: 0.39, color: "#3f8c50", rotation: new THREE.Euler(-Math.PI / 2, 0, 0), binSlot: 1 },
	          { file: "robotic-arm-trash-picking/black_trash_bin_detailed.stl", position: new THREE.Vector3(0.68, 0.265, -0.24), size: 0.39, color: "#15191b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.02), binSlot: 2 },
          { file: "robotic-arm-trash-picking/realistic_plastic_bottle.stl", position: new THREE.Vector3(-0.1, 0.34, 0.2), size: 0.1, color: "#9eb9d2", rotation: new THREE.Euler(0, 0.4, Math.PI / 2), hold: new THREE.Vector3(0.02, 0.58, 0.13), taskTo: new THREE.Vector3(0.08, 0.62, -0.24), taskStart: 2.4, taskCycle: 12 },
          { file: "robotic-arm-trash-picking/crinkled_chips_package.stl", position: new THREE.Vector3(0.04, 0.34, 0.24), size: 0.1, color: "#d0a139", rotation: new THREE.Euler(0, -0.2, 0.4), hold: new THREE.Vector3(0.18, 0.59, 0.12), taskTo: new THREE.Vector3(0.68, 0.62, -0.24), taskStart: 5.2, taskCycle: 12 },
          { file: "robotic-arm-trash-picking/rotten_banana_realistic.stl", position: new THREE.Vector3(0.18, 0.34, 0.18), size: 0.1, color: "#8a7a28", rotation: new THREE.Euler(0, 0.8, 0.15), hold: new THREE.Vector3(0.24, 0.58, 0.1), taskTo: new THREE.Vector3(0.38, 0.62, -0.27), taskStart: 8.0, taskCycle: 12 },
        ]
      : model === "nova"
        ? [
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(-2.55, 0, -1.28), size: 0.66, color: "#6d7478", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.35), stretchY: 1.8 },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(-2.28, 0, 0.1), size: 0.62, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.4), stretchY: 1.9 },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(-1.56, 0, -1.68), size: 0.58, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.85), stretchY: 1.7 },
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(-1.1, 0, 1.78), size: 0.58, color: "#62696d", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.65), stretchY: 1.85 },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(-0.28, 0, -1.86), size: 0.62, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.22), stretchY: 1.95 },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(-0.44, 0, 0.72), size: 0.56, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.18), stretchY: 1.75 },
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(0.58, 0, 1.42), size: 0.6, color: "#70787c", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.54), stretchY: 1.82 },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(0.84, 0, -0.62), size: 0.58, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.34), stretchY: 1.85 },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(1.62, 0, 0.48), size: 0.62, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.24), stretchY: 1.78 },
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(1.84, 0, -1.72), size: 0.6, color: "#666e72", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.1), stretchY: 1.85 },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(2.52, 0, 1.08), size: 0.62, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, 0.7), stretchY: 1.9 },
            { file: "rover-debris-training/debris_03_broken_pipe_rubble_cluster.stl", position: new THREE.Vector3(2.68, 0, -0.72), size: 0.58, color: "#4c575b", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.52), stretchY: 1.75 },
            { file: "rover-debris-training/debris_01_fractured_concrete_rebar.stl", position: new THREE.Vector3(0.02, 0, 2.05), size: 0.56, color: "#697175", rotation: new THREE.Euler(-Math.PI / 2, 0, 1.1), stretchY: 1.8 },
            { file: "rover-debris-training/debris_02_twisted_corrugated_sheet_metal.stl", position: new THREE.Vector3(-2.7, 0, 1.55), size: 0.58, color: "#59666a", rotation: new THREE.Euler(-Math.PI / 2, 0, -0.9), stretchY: 1.9 },
            { file: "person_marker", position: new THREE.Vector3(-0.62, 0, -1.06), size: 0.58, color: "#d0a139", roverPickup: 0.29 },
            { file: "person_marker", position: new THREE.Vector3(1.22, 0, -1.08), size: 0.58, color: "#d0a139", roverPickup: 0.48 },
            { file: "person_marker", position: new THREE.Vector3(1.1, 0, 1.05), size: 0.58, color: "#d0a139", roverPickup: 0.72 },
          ]
        : [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index] as TrainingEntry;
    const object = entry.file === "person_marker"
      ? createPersonMarker(entry.size, entry.color)
      : await loadTrainingAsset(`/assets/training-demo/${entry.file}`, entry.size, entry.color);
    object.position.copy(entry.position);
    if (entry.rotation) object.rotation.copy(entry.rotation);
    if (entry.stretchY) object.scale.y *= entry.stretchY;
    if (entry.float) object.userData.excludeFromFrame = true;
    if (!entry.float) setObjectOnGround(object, entry.position.y);
    if (entry.taskTo && entry.taskStart != null) {
      object.userData.taskMotion = {
        from: object.position.clone(),
        to: entry.taskTo.clone(),
        hold: entry.hold?.clone(),
        start: startedAt + entry.taskStart,
        cycle: entry.taskCycle ?? 11,
        lift: model === "desktop" ? 0.16 : 0.36,
      };
      object.userData.animate = (time: number) => {
        animateTaskObject(object, time, object.userData.taskMotion);
      };
    }
	    if (model === "nova" && entry.roverPickup != null) {
	      object.userData.animate = (time: number) => animateRoverStar(object, time, startedAt, getBaseY(object), entry.roverPickup!);
	    }
	    if (model === "desktop" && entry.binSlot != null) {
	      object.userData.animate = (time: number) => animateSortingBin(object, time, startedAt, entry.binSlot!, entry.color);
	    }
    scene.add(object);
    assemblyMeshes.push({ mesh: object, startTime: startedAt + index * 0.22, duration: 0.34 });
  }
}

function addDesktopSortingTable(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number) {
  const table = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color: "#343d40", roughness: 0.72, metalness: 0.18 });
  const top = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.08, 1.05), material);
  top.position.set(0.25, 0.22, -0.05);
  table.add(top);
  for (const x of [-0.38, 0.88]) {
    for (const z of [-0.48, 0.36]) {
      const leg = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.2, 0.055), material.clone());
      leg.position.set(x, 0.1, z);
      table.add(leg);
    }
  }
  table.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(table);
  assemblyMeshes.push({ mesh: table, startTime: startedAt + 0.12, duration: 0.28 });
}

function createPersonMarker(height: number, color: string) {
  const group = new THREE.Group();
  const material = new THREE.MeshStandardMaterial({ color, roughness: 0.52, metalness: 0.08 });
  const head = new THREE.Mesh(new THREE.SphereGeometry(height * 0.11, 18, 12), material);
  head.position.y = height * 0.88;
  const torso = new THREE.Mesh(new THREE.CapsuleGeometry(height * 0.1, height * 0.34, 6, 12), material.clone());
  torso.position.y = height * 0.58;
  const leftLeg = new THREE.Mesh(new THREE.CapsuleGeometry(height * 0.035, height * 0.28, 4, 8), material.clone());
  leftLeg.position.set(-height * 0.055, height * 0.2, 0);
  const rightLeg = leftLeg.clone();
  rightLeg.position.x = height * 0.055;
  const leftArm = new THREE.Mesh(new THREE.CapsuleGeometry(height * 0.03, height * 0.24, 4, 8), material.clone());
  leftArm.position.set(-height * 0.16, height * 0.57, 0);
  leftArm.rotation.z = -0.32;
  const rightArm = leftArm.clone();
  rightArm.position.x = height * 0.16;
  rightArm.rotation.z = 0.32;
  group.add(head, torso, leftLeg, rightLeg, leftArm, rightArm);
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  return group;
}

function animateSortingBin(object: THREE.Object3D, time: number, startedAt: number, slot: number, baseColor: string) {
  const episode = Math.floor(Math.max(0, time - startedAt) / 10);
  const local = positiveModulo(time - startedAt, 10) / 10;
  const activeWindow =
    slot === 0 ? local > 0.25 && local < 0.38
    : slot === 2 ? local > 0.5 && local < 0.63
    : local > 0.74 && local < 0.9;
  const trained = episode >= 5;
  const wrongFlash = !trained && activeWindow && (episode + slot) % 3 === 1;
  const rightFlash = activeWindow && !wrongFlash;
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = child.material instanceof THREE.MeshStandardMaterial
      ? child.material
      : new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.5, metalness: 0.1 });
    child.material = material;
    material.color.set(wrongFlash ? "#ff3b3b" : rightFlash ? "#20ff72" : baseColor);
    material.emissive.set(wrongFlash ? "#7a0505" : rightFlash ? "#087f31" : "#000000");
    material.emissiveIntensity = wrongFlash || rightFlash ? 0.75 : 0;
  });
}

async function createWarehouseToteLoadingScene(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number) {
  const base = "/assets/training-demo/humanoid-warehouse/";
  const staticEntries = [
    { file: "loading_zone_marker.stl", position: new THREE.Vector3(0.25, 0, 0), size: 0.85, color: "#2d6f8f" },
    { file: "conveyor_simple.stl", position: new THREE.Vector3(-0.95, 0, 0), size: 1.5, color: "#59666a" },
    { file: "tote_open_bin.stl", position: new THREE.Vector3(0.25, 0.012, 0), size: 0.7, color: "#7a5b36" },
    { file: "shelf_unit.stl", position: new THREE.Vector3(0.35, 0, -1), size: 1.2, color: "#4c575b" },
    { file: "pallet_simple.stl", position: new THREE.Vector3(1.05, 0, 0.65), size: 0.8, color: "#7a5b36" },
  ];
  for (let index = 0; index < staticEntries.length; index += 1) {
    const entry = staticEntries[index];
	    const object = await loadWarehouseStl(`${base}${entry.file}`, entry.size, entry.color);
	    object.position.copy(entry.position);
	    setObjectOnGround(object, entry.position.y);
	    if (entry.file === "tote_open_bin.stl") {
	      object.userData.animate = (time: number) => animateWarehouseTote(object, time, startedAt + 1.5, entry.color);
	    }
	    scene.add(object);
    assemblyMeshes.push({ mesh: object, startTime: startedAt + index * 0.14, duration: 0.28 });
  }

  const packages = [
    {
      file: "package_cube.stl",
      start: new THREE.Vector3(-1.1, 0.5275, -0.1),
      pickup: new THREE.Vector3(-0.62, 0.57, -0.04),
      hold: new THREE.Vector3(-0.28, 0.88, 0.26),
      drop: new THREE.Vector3(0.12, 0.19, -0.1),
      size: 0.3,
      color: "#9c6b35",
      offset: 0,
    },
    {
      file: "package_rect.stl",
      start: new THREE.Vector3(-0.82, 0.4775, 0.11),
      pickup: new THREE.Vector3(-0.58, 0.54, 0.04),
      hold: new THREE.Vector3(-0.22, 0.84, 0.22),
      drop: new THREE.Vector3(0.3, 0.17, 0.02),
      size: 0.42,
      color: "#b98545",
      offset: 3.7,
    },
    {
      file: "package_flat.stl",
      start: new THREE.Vector3(-1.36, 0.4375, 0.08),
      pickup: new THREE.Vector3(-0.66, 0.5, 0.1),
      hold: new THREE.Vector3(-0.2, 0.78, 0.2),
      drop: new THREE.Vector3(0.38, 0.15, -0.08),
      size: 0.36,
      color: "#c89452",
      offset: 7.4,
    },
  ];
  for (let index = 0; index < packages.length; index += 1) {
    const item = packages[index];
    const object = await loadWarehouseStl(`${base}${item.file}`, item.size, item.color);
    object.position.copy(item.start);
    object.userData.animate = (time: number) => animateWarehousePackage(object, time, startedAt + 1.5 + item.offset, item);
    scene.add(object);
    assemblyMeshes.push({ mesh: object, startTime: startedAt + 0.8 + index * 0.18, duration: 0.24 });
  }
  addWarehouseCriteria(scene, assemblyMeshes, startedAt + 1.5);
}

function animateWarehousePackage(
  object: THREE.Object3D,
  time: number,
  startTime: number,
  task: { start: THREE.Vector3; pickup: THREE.Vector3; hold: THREE.Vector3; drop: THREE.Vector3 },
) {
  const cycle = 12;
  const local = positiveModulo(time - startTime, cycle) / cycle;
  if (local < 0.15) {
    const t = smoothStep(local / 0.15);
    object.position.lerpVectors(task.start, task.pickup, t);
    return;
  }
  if (local < 0.3) {
    const t = smoothStep((local - 0.15) / 0.15);
    object.position.lerpVectors(task.pickup, task.hold, t);
    return;
  }
  if (local < 0.58) {
    const t = smoothStep((local - 0.3) / 0.28);
    object.position.lerpVectors(task.hold, new THREE.Vector3(task.drop.x, task.hold.y, task.drop.z), t);
    return;
  }
  if (local < 0.72) {
    const t = smoothStep((local - 0.58) / 0.14);
    object.position.lerpVectors(new THREE.Vector3(task.drop.x, task.hold.y, task.drop.z), task.drop, t);
    return;
  }
  object.position.copy(task.drop);
}

function addWarehouseCriteria(scene: THREE.Scene, assemblyMeshes: AssemblyMesh[], startedAt: number) {
  const group = new THREE.Group();
  group.position.set(0.62, 0.12, 0.26);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: "#1f2527", roughness: 0.7, metalness: 0.2 });
  const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.08, 0.12), baseMaterial);
  base.position.y = 0.04;
  group.add(base);

  const lights: THREE.Mesh[] = [];
  for (let index = 0; index < 3; index += 1) {
    const light = new THREE.Mesh(
      new THREE.SphereGeometry(0.035, 18, 10),
      new THREE.MeshStandardMaterial({ color: "#9a3030", emissive: "#3d0909", emissiveIntensity: 0.35 }),
    );
    light.position.set(-0.11 + index * 0.11, 0.11, 0);
    lights.push(light);
    group.add(light);
  }

  group.userData.animate = (time: number) => {
    const elapsed = positiveModulo(time - startedAt, 12);
    lights.forEach((light, index) => {
      const complete = elapsed > 4.1 + index * 2.3;
      const material = light.material as THREE.MeshStandardMaterial;
      material.color.set(complete ? "#2cff75" : "#9a3030");
      material.emissive.set(complete ? "#0a8f35" : "#3d0909");
      material.emissiveIntensity = complete ? 0.75 : 0.35;
    });
  };
  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
  scene.add(group);
  assemblyMeshes.push({ mesh: group, startTime: startedAt + 0.8, duration: 0.28 });
}

function animateWarehouseTote(object: THREE.Object3D, time: number, startedAt: number, baseColor: string) {
  const episode = Math.floor(Math.max(0, time - startedAt) / 12);
  const local = positiveModulo(time - startedAt, 12) / 12;
  const success = episode >= 4 && local > 0.72;
  const fail = episode < 4 && local > 0.72 && local < 0.88;
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    const material = child.material instanceof THREE.MeshStandardMaterial
      ? child.material
      : new THREE.MeshStandardMaterial({ color: baseColor, roughness: 0.62, metalness: 0.12 });
    child.material = material;
    material.color.set(success ? "#24ff78" : fail ? "#d64434" : baseColor);
    material.emissive.set(success ? "#0b8936" : fail ? "#65160f" : "#000000");
    material.emissiveIntensity = success || fail ? 0.55 : 0;
  });
}

async function loadWarehouseStl(file: string, targetSize: number, color: string) {
  const geometry = await new STLLoader().loadAsync(file);
  geometry.computeVertexNormals();
  geometry.computeBoundingBox();
  const size = new THREE.Vector3();
  geometry.boundingBox?.getSize(size);
  const largest = Math.max(size.x, size.y, size.z, 0.001);
  geometry.scale(targetSize / largest, targetSize / largest, targetSize / largest);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshStandardMaterial({ color, roughness: 0.62, metalness: 0.12 }),
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
}

async function loadTrainingAsset(file: string, targetSize: number, color: string) {
  if (file.toLowerCase().endsWith(".obj")) {
    const object = await new OBJLoader().loadAsync(file);
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({ color, roughness: 0.5, metalness: 0.08 });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    normalizeObjectSize(object, targetSize);
    return object;
  }
  return loadTrainingStl(file, targetSize, color);
}

function resolveLibraryAssetUrl(request: AssetPreviewRequest) {
  if (!/\.(obj|stl|STL)$/i.test(request.file)) return null;
  if (request.model === "humanoid") return `/assets/unitree_g1/assets/${request.file}`;
  if (request.model === "desktop") return `/assets/franka_emika_panda/assets/${request.file}`;
  return `/assets/nova-carter/meshes/${request.file}`;
}

async function loadPreviewAsset(file: string) {
  if (file.toLowerCase().endsWith(".obj")) {
    const object = await new OBJLoader().loadAsync(file);
    object.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshStandardMaterial({ color: "#8d989d", roughness: 0.48, metalness: 0.42 });
      }
    });
    return object;
  }
  const geometry = await new STLLoader().loadAsync(file);
  geometry.computeVertexNormals();
  return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: "#8d989d", roughness: 0.48, metalness: 0.42 }));
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

function normalizeObjectSize(object: THREE.Object3D, targetSize: number) {
  object.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(object);
  const size = new THREE.Vector3();
  box.getSize(size);
  const largest = Math.max(size.x, size.y, size.z, 0.001);
  object.scale.multiplyScalar(targetSize / largest);
  object.updateWorldMatrix(true, true);
  const centered = new THREE.Box3().setFromObject(object);
  const center = new THREE.Vector3();
  centered.getCenter(center);
  object.position.sub(center);
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

function animateUnitreeG1(
  bodies: Map<string, THREE.Group>,
  time: number,
  training = false,
  startedAt = 0,
  root?: THREE.Group,
) {
  if (!training) {
    const gait = Math.sin(time * 1.2) * 0.06;
    rotateBody(bodies, "left_shoulder_pitch_link", "y", 0.08 + gait);
    rotateBody(bodies, "right_shoulder_pitch_link", "y", 0.08 - gait);
    rotateBody(bodies, "left_elbow_link", "y", -0.08 + Math.sin(time * 1.5) * 0.045);
    rotateBody(bodies, "right_elbow_link", "y", -0.08 - Math.sin(time * 1.5) * 0.045);
    rotateBody(bodies, "torso_link", "z", Math.sin(time * 0.7) * 0.035);
    return;
  }

  const cycle = 12;
  const local = positiveModulo(time - startedAt - 1.5, cycle) / cycle;
  const detect = pulseWindow(local, 0.03, 0.12, 0.22);
  const reach = pulseWindow(local, 0.12, 0.24, 0.34);
  const lift = pulseWindow(local, 0.24, 0.36, 0.48);
  const transfer = pulseWindow(local, 0.36, 0.5, 0.64);
  const place = pulseWindow(local, 0.56, 0.66, 0.76);
  const active = Math.max(reach, lift, transfer, place);
  const release = pulseWindow(local, 0.68, 0.75, 0.86);
  const stepForward = pulseWindow(local, 0.42, 0.56, 0.72);
  const stepBack = pulseWindow(local, 0.72, 0.84, 0.98);
  const walking = Math.max(stepForward, stepBack);
  const gait = Math.sin(local * Math.PI * 12) * walking * 0.38;

  if (root) {
    const base = (root.userData.trainingBasePosition as THREE.Vector3 | undefined) ?? root.position.clone();
    root.userData.trainingBasePosition = base;
    root.position.x = base.x + stepForward * 0.1 - stepBack * 0.04;
    root.position.z = base.z - stepForward * 0.13 + stepBack * 0.09;
    root.position.y = base.y + Math.abs(gait) * 0.006;
  }

  rotateBody(bodies, "waist_yaw_link", "z", transfer * 0.34 - place * 0.08);
  rotateBodyMulti(bodies, "torso_link", {
    x: detect * 0.04,
    y: -reach * 0.16 + lift * 0.06,
    z: transfer * 0.12,
  });
  rotateBody(bodies, "head_link", "z", detect * 0.18 - transfer * 0.08);
  rotateBody(bodies, "left_shoulder_pitch_link", "y", -0.05 + active * 0.18);
  rotateBody(bodies, "left_shoulder_roll_link", "x", -0.12 - active * 0.18);
  rotateBody(bodies, "left_elbow_link", "y", -0.18 - active * 0.25);
  rotateBody(bodies, "right_shoulder_pitch_link", "y", -0.12 - reach * 0.82 + lift * 0.35 + transfer * 0.46);
  rotateBody(bodies, "right_shoulder_roll_link", "x", 0.18 + transfer * 0.34);
  rotateBody(bodies, "right_shoulder_yaw_link", "z", transfer * 0.38);
  rotateBody(bodies, "right_elbow_link", "y", -0.2 - reach * 0.68 + lift * 0.22 + place * 0.28);
  rotateBody(bodies, "right_wrist_pitch_link", "y", -0.18 - reach * 0.34 + place * 0.3);
  rotateBody(bodies, "right_wrist_yaw_link", "z", transfer * 0.22);
  rotateBody(bodies, "left_hip_pitch_link", "y", -0.04 + gait * 0.08);
  rotateBody(bodies, "right_hip_pitch_link", "y", -0.04 - gait * 0.08);
  rotateBody(bodies, "left_knee_link", "y", 0.06 + Math.max(0, -gait) * 0.1);
  rotateBody(bodies, "right_knee_link", "y", 0.06 + Math.max(0, gait) * 0.1);
  rotateBody(bodies, "left_ankle_pitch_link", "y", -gait * 0.035);
  rotateBody(bodies, "right_ankle_pitch_link", "y", gait * 0.035);
  rotateBody(bodies, "right_hand_thumb_0_link", "y", release > 0 ? 0.08 : -0.72 * active);
  rotateBody(bodies, "right_hand_index_0_link", "z", release > 0 ? 0.04 : 0.92 * active);
  rotateBody(bodies, "right_hand_middle_0_link", "z", release > 0 ? 0.04 : 0.92 * active);
}

function smoothWindow(value: number, start: number, end: number) {
  if (value <= start) return 0;
  if (value >= end) return 1;
  return smoothStep((value - start) / (end - start));
}

function pulseWindow(value: number, start: number, peak: number, end: number) {
  if (value <= start || value >= end) return 0;
  if (value <= peak) return smoothStep((value - start) / (peak - start));
  return 1 - smoothStep((value - peak) / (end - peak));
}

function animateFrankaPanda(bodies: Map<string, THREE.Group>, time: number, training: boolean) {
  const speed = training ? 1 : 0.65;
  const phase = training ? positiveModulo(time, 12) / 12 : (Math.sin(time * speed) + 1) / 2;
  const pick = pulseWindow(phase, 0.08, 0.16, 0.28) + pulseWindow(phase, 0.32, 0.43, 0.52) + pulseWindow(phase, 0.58, 0.68, 0.78);
  const carry = pulseWindow(phase, 0.2, 0.35, 0.5) + pulseWindow(phase, 0.45, 0.6, 0.72) + pulseWindow(phase, 0.7, 0.83, 0.96);
  const reach = training ? THREE.MathUtils.clamp(pick + carry * 0.62, 0, 1) : Math.sin(time * speed);
  rotateBody(bodies, "link1", "z", training ? -0.18 + carry * 0.5 - pick * 0.12 : reach * 0.36);
  rotateBody(bodies, "link2", "z", training ? -0.44 - pick * 0.28 + carry * 0.1 : -0.45 + Math.sin(time * speed + 0.9) * 0.22);
  rotateBody(bodies, "link3", "z", training ? 0.16 + pick * 0.18 - carry * 0.1 : Math.cos(time * speed + 0.4) * 0.18);
  rotateBody(bodies, "link4", "z", training ? -0.62 + reach * 0.32 : -0.62 + Math.sin(time * speed + 1.6) * 0.2);
  rotateBody(bodies, "link5", "z", training ? 0.2 - carry * 0.3 : Math.cos(time * speed * 1.2) * 0.22);
  rotateBody(bodies, "link6", "z", training ? 0.24 + pick * 0.24 : 0.18 + Math.sin(time * speed * 1.4) * 0.2);
  rotateBody(bodies, "link7", "z", training ? -0.08 + carry * 0.2 : Math.cos(time * speed * 1.6) * 0.14);
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

function rotateBodyMulti(
  bodies: Map<string, THREE.Group>,
  name: string,
  angles: Partial<Record<"x" | "y" | "z", number>>,
) {
  const body = bodies.get(name);
  if (!body) return;
  const base = (body.userData.baseQuaternion as THREE.Quaternion | undefined) ?? new THREE.Quaternion();
  const q = base.clone();
  if (angles.x) q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angles.x));
  if (angles.y) q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), angles.y));
  if (angles.z) q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 0, 1), angles.z));
  body.quaternion.copy(q);
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
