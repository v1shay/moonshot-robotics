The Sandbox branch must accept RobotAsset and RobotAssembly objects and turn them into a visible, animated, programmable robot scene.

Responsibilities:
- Render robot assets
- Create the 3D scene
- Spawn assets
- Attach assets using connector points
- Support joints, motors, and simple physics
- Run scripted animation/programming
- Return replay/simulation results

Must expose:
- create_scene(name) -> Scene
- spawn_asset(asset, position) -> SceneObject
- attach_assets(parent, child, joint) -> None
- load_robot(robot_assembly) -> None
- run_controller(controller) -> SimulationResult
- animate_robot(robot_assembly, animation_name) -> SimulationResult
- reset_scene() -> None

Must interact with Asset branch by:
- accepting every valid RobotAsset returned by AssetManager
- using normalized_path when available
- using connector_points for attachment
- not requiring custom hidden asset fields

Must interact with Agent by:
- accepting complete RobotAssembly objects
- running the controller provided by Agent
- returning SimulationResult
- exposing errors clearly if something cannot load or animate

Must not:
- search/download assets
- decide user intent
- create the robot plan
- redefine RobotAsset or RobotAssembly

All three people must use the same shared types:

RobotAsset
ConnectorPoint
Joint
RobotAssembly
RobotController
Scene
SceneObject
SimulationResult
RobotProject

No branch can create private versions of these objects.