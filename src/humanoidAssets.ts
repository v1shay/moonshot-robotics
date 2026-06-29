export type HumanoidAsset = {
  file: string;
  label: string;
  group: "Core" | "Head" | "Left Arm" | "Right Arm" | "Left Leg" | "Right Leg" | "Left Hand" | "Right Hand";
};

const files = [
  "pelvis.STL",
  "pelvis_contour_link.STL",
  "waist_yaw_link_rev_1_0.STL",
  "waist_roll_link_rev_1_0.STL",
  "torso_link_rev_1_0.STL",
  "logo_link.STL",
  "head_link.STL",
  "left_hip_yaw_link.STL",
  "left_hip_roll_link.STL",
  "left_hip_pitch_link.STL",
  "left_knee_link.STL",
  "left_ankle_pitch_link.STL",
  "left_ankle_roll_link.STL",
  "right_hip_yaw_link.STL",
  "right_hip_roll_link.STL",
  "right_hip_pitch_link.STL",
  "right_knee_link.STL",
  "right_ankle_pitch_link.STL",
  "right_ankle_roll_link.STL",
  "left_shoulder_pitch_link.STL",
  "left_shoulder_roll_link.STL",
  "left_shoulder_yaw_link.STL",
  "left_elbow_link.STL",
  "left_wrist_yaw_link.STL",
  "left_wrist_pitch_link.STL",
  "left_wrist_roll_link.STL",
  "right_shoulder_pitch_link.STL",
  "right_shoulder_roll_link.STL",
  "right_shoulder_yaw_link.STL",
  "right_elbow_link.STL",
  "right_wrist_yaw_link.STL",
  "right_wrist_pitch_link.STL",
  "right_wrist_roll_link.STL",
  "left_hand_palm_link.STL",
  "left_rubber_hand.STL",
  "left_hand_thumb_0_link.STL",
  "left_hand_thumb_1_link.STL",
  "left_hand_thumb_2_link.STL",
  "left_hand_index_0_link.STL",
  "left_hand_index_1_link.STL",
  "left_hand_middle_0_link.STL",
  "left_hand_middle_1_link.STL",
  "right_hand_palm_link.STL",
  "right_rubber_hand.STL",
  "right_hand_thumb_0_link.STL",
  "right_hand_thumb_1_link.STL",
  "right_hand_thumb_2_link.STL",
  "right_hand_index_0_link.STL",
  "right_hand_index_1_link.STL",
  "right_hand_middle_0_link.STL",
  "right_hand_middle_1_link.STL",
] as const;

export const humanoidAssets: HumanoidAsset[] = files.map((file) => ({
  file,
  label: file
    .replace(".STL", "")
    .replace(/_rev_1_0/g, "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase()),
  group: getGroup(file),
}));

function getGroup(file: string): HumanoidAsset["group"] {
  if (file.includes("head")) return "Head";
  if (file.startsWith("left_hand") || file.includes("left_rubber_hand")) return "Left Hand";
  if (file.startsWith("right_hand") || file.includes("right_rubber_hand")) return "Right Hand";
  if (file.startsWith("left_shoulder") || file.startsWith("left_elbow") || file.startsWith("left_wrist")) return "Left Arm";
  if (file.startsWith("right_shoulder") || file.startsWith("right_elbow") || file.startsWith("right_wrist")) return "Right Arm";
  if (file.startsWith("left_hip") || file.startsWith("left_knee") || file.startsWith("left_ankle")) return "Left Leg";
  if (file.startsWith("right_hip") || file.startsWith("right_knee") || file.startsWith("right_ankle")) return "Right Leg";
  return "Core";
}
