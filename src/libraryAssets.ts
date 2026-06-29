export type RobotModel = "humanoid" | "nova" | "desktop";

export type LibraryAsset = {
  id: string;
  model: RobotModel;
  label: string;
  group: string;
  file: string;
  kind: "mesh" | "texture" | "instruction";
  icon: string;
  iconTone: "gold" | "blue" | "green" | "steel";
};

const iconBase = "/assets/library-asset-svgs";

const unitreeFiles = [
  ["g1_with_hands.xml", "Assembly XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["g1.xml", "Assembly XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["scene_with_hands.xml", "Scene XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["g1_with_hands.png", "Reference", "texture", "robot36-svgrepo-com.svg"],
  ["pelvis.STL", "Core", "mesh", "robot36-svgrepo-com.svg"],
  ["pelvis_contour_link.STL", "Core", "mesh", "robot36-svgrepo-com.svg"],
  ["torso_link_rev_1_0.STL", "Core", "mesh", "robot36-svgrepo-com.svg"],
  ["waist_yaw_link_rev_1_0.STL", "Core", "mesh", "robot36-svgrepo-com.svg"],
  ["waist_roll_link_rev_1_0.STL", "Core", "mesh", "robot36-svgrepo-com.svg"],
  ["head_link.STL", "Head", "mesh", "robot-svgrepo-com.svg"],
  ["logo_link.STL", "Brand", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["left_hip_pitch_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_hip_roll_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_hip_yaw_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_knee_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_ankle_pitch_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_ankle_roll_link.STL", "Left Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_hip_pitch_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_hip_roll_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_hip_yaw_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_knee_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_ankle_pitch_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["right_ankle_roll_link.STL", "Right Leg", "mesh", "robot-leg-svgrepo-com.svg"],
  ["left_shoulder_pitch_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_shoulder_roll_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_shoulder_yaw_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_elbow_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_wrist_roll_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_wrist_pitch_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_wrist_yaw_link.STL", "Left Arm", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_palm_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_thumb_0_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_thumb_1_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_thumb_2_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_middle_0_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_middle_1_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_index_0_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["left_hand_index_1_link.STL", "Left Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_shoulder_pitch_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_shoulder_roll_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_shoulder_yaw_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_elbow_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_wrist_roll_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_wrist_pitch_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_wrist_yaw_link.STL", "Right Arm", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_palm_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_thumb_0_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_thumb_1_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_thumb_2_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_middle_0_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_middle_1_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_index_0_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
  ["right_hand_index_1_link.STL", "Right Hand", "mesh", "robot-svgrepo-com.svg"],
] as const;

const pandaFiles = [
  ["panda.xml", "Assembly XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["hand.xml", "Hand XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["scene.xml", "Scene XML", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["panda.png", "Reference", "texture", "robot-svgrepo-com.svg"],
  ["link0_0.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_1.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_2.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_3.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_4.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_5.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_7.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_8.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_9.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_10.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link0_11.obj", "Base", "mesh", "robot-svgrepo-com.svg"],
  ["link1.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link2.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link3_0.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link3_1.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link3_2.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link3_3.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link4_0.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link4_1.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link4_2.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link4_3.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link5_0.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link5_1.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link5_2.obj", "Arm Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_0.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_1.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_2.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_3.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_4.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_5.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_6.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_7.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_8.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_9.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_10.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_11.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_12.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_13.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_14.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_15.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link6_16.obj", "Wrist Link", "mesh", "robot-svgrepo-com.svg"],
  ["link7_0.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_1.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_2.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_3.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_4.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_5.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_6.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["link7_7.obj", "End Effector", "mesh", "robot-svgrepo-com.svg"],
  ["hand_0.obj", "Hand", "mesh", "robot-svgrepo-com.svg"],
  ["hand_1.obj", "Hand", "mesh", "robot-svgrepo-com.svg"],
  ["hand_2.obj", "Hand", "mesh", "robot-svgrepo-com.svg"],
  ["hand_3.obj", "Hand", "mesh", "robot-svgrepo-com.svg"],
  ["hand_4.obj", "Hand", "mesh", "robot-svgrepo-com.svg"],
  ["finger_0.obj", "Finger", "mesh", "robot-svgrepo-com.svg"],
  ["finger_1.obj", "Finger", "mesh", "robot-svgrepo-com.svg"],
  ["shape_cube", "Training Object", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["shape_sphere", "Training Object", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["shape_cylinder", "Training Object", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["cardboard_bin_cube", "Training Bin", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["cardboard_bin_sphere", "Training Bin", "mesh", "sensor-lab-svgrepo-com.svg"],
  ["cardboard_bin_cylinder", "Training Bin", "mesh", "sensor-lab-svgrepo-com.svg"],
] as const;

const novaFiles = [
  ["nova_carter.urdf.xacro", "Instructions", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["nova_carter_platform_macro.urdf.xacro", "Instructions", "instruction", "ai-mi-algorithm-svgrepo-com.svg"],
  ["chassis_link.obj", "Chassis", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["nova_carter_chassis_link.obj", "Chassis", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["nova_carter_wheel_left.obj", "Wheel", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["nova_carter_wheel_right.obj", "Wheel", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["caster_frame_base.obj", "Caster", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["nova_carter_caster_frame_base.obj", "Caster", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["caster_swivel.obj", "Caster", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["caster_wheel.obj", "Caster", "mesh", "wheel-transport-svgrepo-com.svg"],
  ["fronttire_m_basecolor.png", "Texture", "texture", "wheel-transport-svgrepo-com.svg"],
  ["backtire_m_basecolor.png", "Texture", "texture", "wheel-transport-svgrepo-com.svg"],
  ["wheelcap_m_basecolor.png", "Texture", "texture", "wheel-transport-svgrepo-com.svg"],
] as const;

const humanoidLibraryAssets = mapFiles(unitreeFiles, "humanoid", "Unitree G1", "green");
const novaLibraryAssets = mapFiles(novaFiles, "nova", "Luna Rover", "blue");
const desktopLibraryAssets = mapFiles(pandaFiles, "desktop", "Franka Panda", "gold");

export const libraryAssets = shuffleStable([...humanoidLibraryAssets, ...novaLibraryAssets, ...desktopLibraryAssets]);

function mapFiles(
  files: readonly (readonly [string, string, LibraryAsset["kind"], string])[],
  model: RobotModel,
  prefix: string,
  iconTone: LibraryAsset["iconTone"],
) {
  return files.map(([file, group, kind, icon]) => ({
    id: `${model}-${file}`,
    model,
    label: `${prefix} ${labelFromFile(file)}`,
    group,
    file,
    kind,
    icon: `${iconBase}/${icon}`,
    iconTone,
  }));
}

function labelFromFile(file: string) {
  return file
    .replace(/\.(obj|stl|STL|png|xml|xacro)$/i, "")
    .replace(/rev_1_0/g, "")
    .replace(/_/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

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
