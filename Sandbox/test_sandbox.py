# test_sandbox.py
from isaac_sandbox import IsaacSandbox

# Create a mock asset structure like your Asset branch will return
class MockAsset:
    def __init__(self, name, path):
        self.name = name
        self.id = "test_part_01"
        self.normalized_path = path
        self.connector_points = {"default": type('Point', (object,), {"position": (0, 0, 0), "orientation": (1, 0, 0, 0)})}

# Initialize the sandbox (running headless=False so you can see the GUI window)
sandbox = IsaacSandbox(headless=False)

print("--- Step 1: Initializing Sandbox ---")
scene = sandbox.create_scene("My_AI_Robot_World")

print("\n--- Step 2: Spawning Test Asset ---")
test_asset = MockAsset("Robot_Arm_Link", "path/to/your/friend/file.usd")
# Note: If testing in mock mode, any dummy path string works!
try:
    spawned_obj = sandbox.spawn_asset(test_asset, position=(0.0, 0.0, 1.0))
    print(f"Spawned: {spawned_obj}")
except Exception as e:
    print(f"Encountered error (Expected if file doesn't exist yet): {e}")