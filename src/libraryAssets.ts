import { humanoidAssets } from "./humanoidAssets";

export type RobotModel = "humanoid" | "nova";

export type LibraryAsset = {
  id: string;
  model: RobotModel;
  label: string;
  group: string;
  file: string;
  kind: "mesh" | "texture" | "instruction";
};

const novaFiles = [
  ["nova_carter.urdf.xacro", "Instructions", "instruction"],
  ["nova_carter_platform_macro.urdf.xacro", "Instructions", "instruction"],
  ["chassis_link.obj", "Chassis", "mesh"],
  ["nova_carter_chassis_link.obj", "Chassis", "mesh"],
  ["nova_carter_wheel_left.obj", "Wheel", "mesh"],
  ["nova_carter_wheel_right.obj", "Wheel", "mesh"],
  ["caster_frame_base.obj", "Caster", "mesh"],
  ["nova_carter_caster_frame_base.obj", "Caster", "mesh"],
  ["caster_swivel.obj", "Caster", "mesh"],
  ["caster_wheel.obj", "Caster", "mesh"],
  ["chassis_link.mtl", "Material", "instruction"],
  ["caster_frame_base.mtl", "Material", "instruction"],
  ["caster_swivel.mtl", "Material", "instruction"],
  ["caster_wheel.mtl", "Material", "instruction"],
  ["nova_carter_wheel_right.mtl", "Material", "instruction"],
  ["fronttire_m_basecolor.png", "Texture", "texture"],
  ["fronttire_m_normal.png", "Texture", "texture"],
  ["fronttire_m_roughness.png", "Texture", "texture"],
  ["backtire_m_basecolor.png", "Texture", "texture"],
  ["backtire_m_normal.png", "Texture", "texture"],
  ["backtire_m_roughness.png", "Texture", "texture"],
  ["wheelcap_m_basecolor.png", "Texture", "texture"],
  ["wheelcap_m_normal.png", "Texture", "texture"],
  ["wheelcap_m_roughness.png", "Texture", "texture"],
  ["aluminum_wheel_m_basecolor.png", "Texture", "texture"],
  ["aluminum_wheel_m_normal.png", "Texture", "texture"],
  ["aluminum_wheel_m_metallic.png", "Texture", "texture"],
  ["aluminum_wheel_m_roughness.png", "Texture", "texture"],
  ["backwheel_ring_m_basecolor.png", "Texture", "texture"],
  ["backwheel_ring_m_normal.png", "Texture", "texture"],
  ["backwheel_ring_m_roughness.png", "Texture", "texture"],
] as const;

const humanoidLibraryAssets: LibraryAsset[] = humanoidAssets.map((asset) => ({
  id: `humanoid-${asset.file}`,
  model: "humanoid",
  label: asset.label,
  group: asset.group,
  file: asset.file,
  kind: "mesh",
}));

const novaLibraryAssets: LibraryAsset[] = novaFiles.map(([file, group, kind]) => ({
  id: `nova-${file}`,
  model: "nova",
  label: file.replace(/\.(obj|mtl|png|xacro)$/i, "").replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
  group,
  file,
  kind,
}));

export const libraryAssets = shuffleStable([...humanoidLibraryAssets, ...novaLibraryAssets]);

function shuffleStable(items: LibraryAsset[]) {
  return [...items].sort((a, b) => hash(a.id) - hash(b.id));
}

function hash(value: string) {
  let result = 0;
  for (let index = 0; index < value.length; index += 1) {
    result = (result * 31 + value.charCodeAt(index)) % 9973;
  }
  return result;
}
