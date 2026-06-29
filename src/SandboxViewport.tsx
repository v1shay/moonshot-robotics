import * as CANNON from "cannon-es";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { humanoidAssets } from "./humanoidAssets";

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
  workflowRequest: { id: number } | null;
  onWorkflowStatus: (status: string) => void;
  stageLights: boolean;
  cameraMode: string;
};

type AssemblyMesh = {
  mesh: THREE.Mesh;
  target: THREE.Vector3;
  start: THREE.Vector3;
  startTime: number;
  duration: number;
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
    runAssembly: () => void;
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
      robot.group.visible = true;
      spawn("box");
      spawn("sphere");
      spawn("cylinder");
      onWorkflowStatus("Idle");
    }

    function clearAssembly() {
      assemblyMeshes.splice(0).forEach(({ mesh }) => {
        scene.remove(mesh);
        mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((entry) => entry.dispose());
        } else {
          material.dispose();
        }
      });
    }

    async function runAssembly() {
      clearAssembly();
      dynamic.splice(0).forEach(({ body, mesh }) => {
        world.removeBody(body);
        scene.remove(mesh);
      });
      robot.group.visible = false;
      onWorkflowStatus("Loading idō Library STL assets");

      const loader = new STLLoader();
      const startedAt = clock.elapsedTime;

      for (let index = 0; index < humanoidAssets.length; index += 1) {
        const asset = humanoidAssets[index];
        onWorkflowStatus(`Assembling ${asset.label}`);
        try {
          const geometry = await loader.loadAsync(`/assets/humanoid/${asset.file}`);
          geometry.computeVertexNormals();
          geometry.center();
          const targetSize = getAssetSize(asset.file);
          const size = new THREE.Vector3();
          geometry.computeBoundingBox();
          geometry.boundingBox?.getSize(size);
          const largest = Math.max(size.x, size.y, size.z, 0.001);
          geometry.scale(targetSize / largest, targetSize / largest, targetSize / largest);

          const material = makeAssetMaterial(asset.file);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.rotation.x = -Math.PI / 2;
          mesh.rotation.z = getAssetRotation(asset.file);

          const target = getHumanoidTarget(asset.file);
          const start = new THREE.Vector3(-4.8 + (index % 8) * 0.42, 3.8 + Math.floor(index / 8) * 0.18, -3.2);
          mesh.position.copy(start);
          scene.add(mesh);
          assemblyMeshes.push({
            mesh,
            target,
            start,
            startTime: startedAt + index * 0.16,
            duration: 1.1,
          });
        } catch {
          onWorkflowStatus(`Skipped unreadable asset ${asset.file}`);
        }
      }

      onWorkflowStatus("Training readiness: humanoid assembled");
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

    const resize = () => {
      const rect = host.getBoundingClientRect();
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
      apiRef.current?.runAssembly();
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
  assemblyMeshes.forEach(({ mesh, start, target, startTime, duration }) => {
    const progress = THREE.MathUtils.clamp((elapsed - startTime) / duration, 0, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    mesh.position.lerpVectors(start, target, eased);
    mesh.rotation.y += progress < 1 ? 0.018 : 0;
  });
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
  const handSpread = file.includes("thumb") ? 0.12 : file.includes("index") ? 0 : file.includes("middle") ? -0.12 : 0;

  if (file === "pelvis.STL") return new THREE.Vector3(0, 1.28, 0);
  if (file.includes("pelvis_contour")) return new THREE.Vector3(0, 1.42, 0.03);
  if (file.includes("waist_yaw")) return new THREE.Vector3(0, 1.72, 0);
  if (file.includes("waist_roll")) return new THREE.Vector3(0, 1.94, 0);
  if (file.includes("torso")) return new THREE.Vector3(0, 2.42, 0);
  if (file.includes("logo")) return new THREE.Vector3(0, 2.62, -0.42);
  if (file.includes("head")) return new THREE.Vector3(0, 3.18, 0);

  if (file.includes("hip_yaw")) return new THREE.Vector3(side * 0.34, 1.02, 0);
  if (file.includes("hip_roll")) return new THREE.Vector3(side * 0.42, 0.82, 0);
  if (file.includes("hip_pitch")) return new THREE.Vector3(side * 0.46, 0.58, 0);
  if (file.includes("knee")) return new THREE.Vector3(side * 0.48, 0.08, 0);
  if (file.includes("ankle_pitch")) return new THREE.Vector3(side * 0.48, -0.46, 0.03);
  if (file.includes("ankle_roll")) return new THREE.Vector3(side * 0.48, -0.68, -0.02);

  if (file.includes("shoulder_pitch")) return new THREE.Vector3(side * 0.72, 2.68, 0);
  if (file.includes("shoulder_roll")) return new THREE.Vector3(side * 0.95, 2.42, 0);
  if (file.includes("shoulder_yaw")) return new THREE.Vector3(side * 1.18, 2.12, 0);
  if (file.includes("elbow")) return new THREE.Vector3(side * 1.34, 1.72, 0);
  if (file.includes("wrist_yaw")) return new THREE.Vector3(side * 1.42, 1.32, 0);
  if (file.includes("wrist_pitch")) return new THREE.Vector3(side * 1.44, 1.14, 0);
  if (file.includes("wrist_roll")) return new THREE.Vector3(side * 1.46, 0.96, 0);

  if (file.includes("hand_palm") || file.includes("rubber_hand")) {
    return new THREE.Vector3(side * 1.5, 0.78, 0);
  }
  if (file.includes("hand_")) {
    const segment = file.includes("_0_") ? 0 : file.includes("_1_") ? -0.1 : -0.2;
    return new THREE.Vector3(side * (1.56 + Math.abs(segment)), 0.68 + segment, handSpread);
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
