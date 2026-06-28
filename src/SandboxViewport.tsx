import * as CANNON from "cannon-es";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

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

export function SandboxViewport({ isPlaying, spawnRequest, resetSignal }: SandboxViewportProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const playingRef = useRef(isPlaying);
  const apiRef = useRef<{
    spawn: (kind: SpawnKind) => void;
    reset: () => void;
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

    const grid = createIsaacGrid();
    scene.add(grid);

    const groundBody = new CANNON.Body({
      mass: 0,
      shape: new CANNON.Plane(),
      material: new CANNON.Material("ground"),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    world.addBody(groundBody);

    const dynamic: BodyMesh[] = [];
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
      spawn("box");
      spawn("sphere");
      spawn("cylinder");
    }

    apiRef.current = { spawn, reset };
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

  return <div className="sandbox-host" ref={hostRef} />;
}

function createIsaacGrid() {
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

function animateRobot(
  robot: ReturnType<typeof createRobotAssembly>,
  elapsed: number,
) {
  robot.group.rotation.y = Math.sin(elapsed * 0.35) * 0.45;
  robot.shoulder.rotation.z = 0.28 + Math.sin(elapsed * 0.8) * 0.24;
  robot.elbow.rotation.z = -0.52 + Math.cos(elapsed * 0.95) * 0.36;
  robot.wrist.rotation.z = Math.sin(elapsed * 1.4) * 0.5;
}
