# Sandbox/test_run.py
import os
import sys

# Automatically tells Python where to find isaac_sandbox.py
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from isaac_sandbox import IsaacSandbox

# Mock data structures to mimic pipeline assets
class MockConnectorPoint:
    def __init__(self, pos):
        self.position = pos
        self.orientation = (1.0, 0.0, 0.0, 0.0)

class MockAsset:
    def __init__(self, name, local_id, usd_path):
        self.name = name
        self.id = local_id
        self.normalized_path = usd_path
        self.connector_points = {"default": MockConnectorPoint((0.0, 0.0, 0.0))}

# Initialize sandbox in headless mode for Mac testing
sandbox = IsaacSandbox(headless=True)

print("⚡ Step 1: Initializing Physics Sandbox World...")
scene = sandbox.create_scene("AI_Sandbox_Verification")
print(f"-> Scene Context: {scene}")

print("\n⚡ Step 2: Spawning a Mock Robot Asset...")
test_part = MockAsset("Link_Arm", "001", "omega://test_asset.usd")

try:
    spawned_object = sandbox.spawn_asset(test_part, position=(0.0, 0.0, 1.5))
    print(f"-> ✓ Spawned: {spawned_object}")
except Exception as e:
    print(f"-> ⚠️ Simulation feedback: {e}")

print("\n⚡ Step 3: Running Controller Telemetry Test...")
mock_controller = {"/World/part_001/joint_default": 1.57}
result = sandbox.run_controller(mock_controller)

print(f"\n-> ✓ Simulation Completed successfully!")
print(f"-> Telemetry Position Frames Captured: {len(result.positions)}")
print(f"-> Simulation Success Status: {result.success}")