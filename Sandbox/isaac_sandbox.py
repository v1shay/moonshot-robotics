"""
NVIDIA Isaac Sim Sandbox Pipeline Module
Implements the "Sandbox" branch of the autonomous robotics pipeline.

This module exposes a public API to build, reference, align, joint, 
and simulate multi-body robots dynamically using omni.isaac.core and UsdPhysics.
"""

import os
import sys
import numpy as np
import logging
import asyncio
import importlib
from typing import Any, Dict, List, Tuple, Union, Optional

# Setup logger
logger = logging.getLogger("IsaacSandbox")
logging.basicConfig(level=logging.INFO)

# --- Isaac Sim & USD Imports with Gracious Failure Handling ---
try:
    from omni.isaac.kit import SimulationApp
    # Singleton SimulationApp instance
    _SIMULATION_APP: Optional[SimulationApp] = None
except ImportError:
    SimulationApp = None
    _SIMULATION_APP = None
    logger.warning("SimulationApp could not be imported. Run this within an Isaac Sim environment.")

try:
    import omni
    from omni.isaac.core import World
    from omni.isaac.core.scenes.scene import Scene as IsaacScene
    from omni.isaac.core.objects import GroundPlane
    from omni.isaac.core.utils.stage import (
        add_reference_to_stage,
        get_current_stage,
        is_stage_loading
    )
    from omni.isaac.core.utils.prims import (
        get_prim_at_path,
        delete_prim,
        is_prim_path_valid
    )
    from omni.isaac.core.utils.rotations import (
        gf_quat_to_np_array,
        np_matrix_to_gf_matrix,
        gf_matrix_to_np_matrix
    )
    from omni.isaac.core.prims import XFormPrim, RigidPrim
    from pxr import Usd, UsdGeom, Gf, UsdPhysics, PhysxSchema
except ImportError:
    omni = None
    World = None
    IsaacScene = None
    GroundPlane = None
    add_reference_to_stage = None
    get_current_stage = None
    is_stage_loading = None
    get_prim_at_path = None
    delete_prim = None
    is_prim_path_valid = None
    gf_quat_to_np_array = None
    np_matrix_to_gf_matrix = None
    gf_matrix_to_np_matrix = None
    XFormPrim = None
    RigidPrim = None
    Usd = None
    UsdGeom = None
    Gf = None
    UsdPhysics = None
    PhysxSchema = None
    logger.warning("USD/PhysX core libraries are not available in this environment. Using mock-ready execution paths.")

try:
    import omni.kit.asset_converter as asset_converter
except ImportError:
    asset_converter = None

# --- External Pipeline Interfaces (Imported dynamically to preserve decoupling) ---
# From pipeline.types import RobotAsset, RobotAssembly, Scene, SceneObject, SimulationResult, Joint, ConnectorPoint
# We assume these objects are structured data-classes as per sandboxcontract.md requirements.

# --- Shared Pipeline Types Conforming to Sandbox Contract ---
class ConnectorPoint:
    def __init__(self, position: Tuple[float, float, float] = (0.0, 0.0, 0.0), orientation: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)) -> None:
        self.position = position
        self.orientation = orientation

class RobotAsset:
    def __init__(self, name: str, usd_path: str, asset_id: str = "", connector_points: Optional[Dict[str, ConnectorPoint]] = None) -> None:
        self.name = name
        self.id = asset_id or f"part_{hash(name)}"
        self.normalized_path = usd_path
        self.connector_points = connector_points or {"default": ConnectorPoint()}

class Joint:
    def __init__(self, joint_type: str = "fixed") -> None:
        self.joint_type = joint_type

class RobotAssemblyConnection:
    def __init__(self, parent_id: str, child_id: str, joint_type: str = "fixed") -> None:
        self.parent_id = parent_id
        self.child_id = child_id
        self.joint_type = joint_type

class RobotAssemblyPart:
    def __init__(self, asset: RobotAsset, asset_id: str, initial_position: Tuple[float, float, float] = (0.0, 0.0, 0.0)) -> None:
        self.asset = asset
        self.id = asset_id
        self.initial_position = initial_position

class RobotAssembly:
    def __init__(self, parts: List[RobotAssemblyPart], connections: List[RobotAssemblyConnection]) -> None:
        self.parts = parts
        self.connections = connections

class RobotController:
    pass

class Scene:
    def __init__(self, name: str) -> None:
        self.name = name

class SceneObject:
    def __init__(self, prim_path: str, name: str, position: Tuple[float, float, float], orientation: Tuple[float, float, float, float] = (1.0, 0.0, 0.0, 0.0)) -> None:
        self.prim_path = prim_path
        self.name = name
        self.id = prim_path.split("/")[-1]
        self.position = position
        self.orientation = orientation
        self.connector_points: Dict[str, ConnectorPoint] = {}

class SimulationResult:
    def __init__(self, positions: List[dict], velocities: List[dict]) -> None:
        self.positions = positions
        self.velocities = velocities
        self.success = True

class RobotProject:
    def __init__(self, name: str, assembly: RobotAssembly) -> None:
        self.name = name
        self.assembly = assembly


class IsaacSandbox:
    """
    Main sandbox manager class orchestrating Isaac Sim scene instantiation,
    rigid-body asset assembly, physical joint coupling, and controller/animation loops.
    """

    def __init__(self, headless: bool = False) -> None:
        """
        Initializes the Isaac Sim sandbox helper.
        
        Args:
            headless (bool): If True, runs the SimulationApp in headless mode.
        """
        self.headless = headless
        self.world: Optional[World] = None
        self._spawned_prims: List[str] = []
        self._active_joints: List[Any] = []

    def _ensure_simulation_app(self) -> None:
        """Lazily starts the SimulationApp if it has not been started yet."""
        global _SIMULATION_APP
        if SimulationApp is not None and _SIMULATION_APP is None:
            logger.info("Initializing omni.isaac.kit.SimulationApp...")
            # headless=False keeps the normal Isaac Sim GUI, viewport selection,
            # and W/E/R transform gizmos available for manual sandbox editing.
            _SIMULATION_APP = SimulationApp({"headless": self.headless})
        elif SimulationApp is None:
            logger.warning("NVIDIA Isaac Sim is not installed. Physics simulations will run in dry-run/mock mode.")

    def _ensure_physics_foundation(self) -> None:
        """
        Creates the global physics scene and a static ground plane with collision.

        UsdPhysics.Scene owns gravity for the stage. Isaac's default ground plane
        helper authors a static collision plane under /World so imported rigid
        bodies have something physical to collide with immediately.
        """
        if omni is None or self.world is None:
            return

        stage = get_current_stage()
        physics_scene = UsdPhysics.Scene.Define(stage, "/World/PhysicsScene")
        physics_scene.CreateGravityDirectionAttr().Set(Gf.Vec3f(0.0, 0.0, -1.0))
        physics_scene.CreateGravityMagnitudeAttr().Set(9.81)

        if not is_prim_path_valid("/World/defaultGroundPlane"):
            self.world.scene.add_default_ground_plane()

        ground_prim = stage.GetPrimAtPath("/World/defaultGroundPlane")
        if ground_prim.IsValid() and not ground_prim.HasAPI(UsdPhysics.CollisionAPI):
            UsdPhysics.CollisionAPI.Apply(ground_prim)

    def _enable_viewport_editing_tools(self) -> None:
        """
        Leaves the standard viewport selection/manipulation tools enabled.

        Imported parts remain normal USD prims in the stage, so Isaac Sim's
        built-in W/E/R translate, rotate, and scale gizmos can manipulate them
        while the timeline is stopped or paused.
        """
        if omni is None:
            return

        try:
            selection = omni.usd.get_context().get_selection()
            selection.clear_selected_prim_paths()
            kit_commands = getattr(omni.kit, "commands", None)
            if kit_commands is not None:
                kit_commands.execute("SelectTool")
        except Exception as exc:
            logger.debug("Viewport manipulation tools could not be explicitly selected: %s", exc)

    def _apply_rigid_body_with_collision(self, prim_path: str, collider_mode: str = "convexDecomposition") -> None:
        """
        Binds dynamic rigid body physics and collision APIs to an imported asset.

        RigidBodyAPI is applied to the root Xform so the asset moves as one
        dynamic body. CollisionAPI and PhysxCollisionAPI are applied to each mesh
        child, where PhysX can use convex decomposition for detailed meshes or
        a bounding box fallback when convex cooking is not available.
        """
        stage = get_current_stage()
        root_prim = stage.GetPrimAtPath(prim_path)
        if not root_prim.IsValid():
            raise RuntimeError(f"Cannot apply physics; prim does not exist: {prim_path}")

        if not root_prim.HasAPI(UsdPhysics.RigidBodyAPI):
            UsdPhysics.RigidBodyAPI.Apply(root_prim)
        if not root_prim.HasAPI(UsdPhysics.MassAPI):
            mass_api = UsdPhysics.MassAPI.Apply(root_prim)
            mass_api.CreateDensityAttr().Set(1000.0)

        mesh_prims = [prim for prim in Usd.PrimRange(root_prim) if prim.IsA(UsdGeom.Mesh)]
        collision_targets = mesh_prims or [root_prim]

        for collision_prim in collision_targets:
            if not collision_prim.HasAPI(UsdPhysics.CollisionAPI):
                UsdPhysics.CollisionAPI.Apply(collision_prim)

            physx_collision = PhysxSchema.PhysxCollisionAPI.Apply(collision_prim)
            try:
                physx_collision.CreateCollisionEnabledAttr().Set(True)
            except Exception:
                pass

            # Approximation is authored on MeshCollisionAPI. Convex decomposition
            # gives useful collision for arbitrary online OBJ/FBX/STL meshes; the
            # fallback keeps simple bounding collision available on older builds.
            try:
                mesh_collision = UsdPhysics.MeshCollisionAPI.Apply(collision_prim)
                mesh_collision.CreateApproximationAttr().Set(collider_mode)
            except Exception:
                try:
                    mesh_collision = UsdPhysics.MeshCollisionAPI.Apply(collision_prim)
                    mesh_collision.CreateApproximationAttr().Set("boundingCube")
                except Exception:
                    logger.debug("Mesh collision approximation was not authored for %s", collision_prim.GetPath())

    def _set_prim_position(self, prim_path: str, position: Tuple[float, float, float]) -> None:
        """Sets a prim's translate op without hiding it from viewport selection."""
        stage = get_current_stage()
        prim = stage.GetPrimAtPath(prim_path)
        if not prim.IsValid():
            raise RuntimeError(f"Cannot position invalid prim: {prim_path}")

        xform = UsdGeom.Xformable(prim)
        translate_op = None
        for op in xform.GetOrderedXformOps():
            if op.GetOpType() == UsdGeom.XformOp.TypeTranslate:
                translate_op = op
                break
        if translate_op is None:
            translate_op = xform.AddTranslateOp()
        translate_op.Set(Gf.Vec3d(*position))

    def _resolve_converted_usd_path(self, file_path: str) -> str:
        """Returns the runtime USD path used by the asset converter."""
        source_dir = os.path.dirname(os.path.abspath(file_path))
        source_name = os.path.splitext(os.path.basename(file_path))[0]
        return os.path.join(source_dir, f"{source_name}_converted.usd")

    def _get_asset_converter(self) -> Any:
        """
        Loads omni.kit.asset_converter after SimulationApp has initialized Kit.

        Some standalone Isaac scripts import this module before Kit extensions
        are fully available, so the converter is resolved lazily here.
        """
        global asset_converter
        if asset_converter is not None:
            return asset_converter

        try:
            if omni is not None and hasattr(omni, "kit") and hasattr(omni.kit, "app"):
                extension_manager = omni.kit.app.get_app().get_extension_manager()
                extension_manager.set_extension_enabled_immediate("omni.kit.asset_converter", True)
        except Exception as exc:
            logger.debug("Could not explicitly enable omni.kit.asset_converter: %s", exc)

        try:
            asset_converter = importlib.import_module("omni.kit.asset_converter")
        except ImportError as exc:
            raise RuntimeError("omni.kit.asset_converter is unavailable. Run this inside Isaac Sim.") from exc

        return asset_converter

    def _convert_mesh_to_usd(self, file_path: str) -> str:
        """
        Converts raw OBJ/FBX/STL-style files to USD through omni.kit.asset_converter.

        The converter runs inside Kit/Isaac Sim, writes a native USD next to the
        source mesh, and returns that USD path so it can be referenced onto the
        live stage like any other Omniverse asset.
        """
        converter_module = self._get_asset_converter()
        if not os.path.exists(file_path):
            raise FileNotFoundError(f"Custom mesh path does not exist: {file_path}")

        usd_path = self._resolve_converted_usd_path(file_path)
        context = converter_module.AssetConverterContext()
        context.ignore_materials = False
        context.merge_all_meshes = False
        context.use_meter_as_world_unit = True
        context.create_world_as_default_root_prim = False

        async def _run_conversion() -> bool:
            converter = converter_module.get_instance()
            task = converter.create_converter_task(file_path, usd_path, None, context)
            return await task.wait_until_finished()

        try:
            loop = asyncio.get_event_loop()
        except RuntimeError:
            loop = asyncio.new_event_loop()
            asyncio.set_event_loop(loop)

        if loop.is_running():
            raise RuntimeError("Asset conversion requires a synchronous setup call before starting the Kit event loop.")

        if not loop.run_until_complete(_run_conversion()):
            raise RuntimeError(f"Failed to convert custom mesh to USD: {file_path}")

        return usd_path

    def create_scene(self, name: str) -> Any:
        """
        Initializes the Isaac Sim SimulationApp, sets up a generic PhysicsScene, 
        and adds a ground plane.

        Args:
            name (str): Name of the world scene.

        Returns:
            Scene: The initialized Isaac Sim Scene wrapper.
        """
        self._ensure_simulation_app()
        
        # Initialize or retrieve active world
        if World is not None:
            if World.instance() is not None:
                self.world = World.instance()
                self.world.clear_instance()
            
            logger.info(f"Creating a new Isaac Sim World scene named '{name}'...")
            self.world = World(stage_units_in_meters=1.0)
            self._ensure_physics_foundation()
            self._enable_viewport_editing_tools()
        else:
            logger.warning("[Mock Mode] Created virtual scene space: " + name)
            self.world = None

        # Clean tracking structures
        self._spawned_prims = []
        self._active_joints = []

        # Return scene context (or mock object conforming to Scene signature)
        return self.world.scene if self.world else Scene(name)

    def spawn_asset(self, asset: Any, position: tuple) -> Any:
        """
        Accepts a RobotAsset object, reads asset.normalized_path, spawns it into 
        the USD stage, and enables rigid body collisions.

        Args:
            asset (RobotAsset): The asset metadata containing paths and configurations.
            position (tuple): 3D coordinates (x, y, z) for initial placement.

        Returns:
            SceneObject: The spawned scene object representation.
        """
        if not hasattr(asset, "normalized_path") or not asset.normalized_path:
            raise ValueError(f"Asset '{getattr(asset, 'name', 'unknown')}' does not contain a valid 'normalized_path'.")

        usd_path = asset.normalized_path
        prim_name = f"part_{getattr(asset, 'id', hash(asset))}"
        prim_path = f"/World/{prim_name}"

        logger.info(f"Spawning asset from path: {usd_path} onto stage path: {prim_path}")

        if omni is not None and self.world is not None:
            # 1. Resolve USD asset file existence
            if not usd_path.startswith("omega://") and not usd_path.startswith("http") and not os.path.exists(usd_path):
                raise FileNotFoundError(f"Local asset path does not exist: {usd_path}")

            # 2. Add reference to stage
            success = add_reference_to_stage(usd_path=usd_path, prim_path=prim_path)
            if not success:
                raise RuntimeError(f"Failed to load or reference USD file at: {usd_path}")

            # 3. Create a rigid prim representation to register with world scene and enable physics
            try:
                scene_object = RigidPrim(
                    prim_path=prim_path,
                    name=getattr(asset, "name", prim_name),
                    position=np.array(position),
                    orientation=np.array([1.0, 0.0, 0.0, 0.0])  # Default identity quaternion WXYZ
                )
                self.world.scene.add(scene_object)
                
                # 4. Bind dynamic rigid body physics to the referenced asset and
                # apply collision approximation to its meshes so it falls and
                # collides with the ground plane and other imported parts.
                self._apply_rigid_body_with_collision(prim_path)
                
                self._spawned_prims.append(prim_path)
                return scene_object

            except Exception as e:
                # If spawn fails, clean stage to prevent polluting next attempts
                if is_prim_path_valid(prim_path):
                    delete_prim(prim_path)
                raise RuntimeError(f"Failed to fully initialize physics properties for asset {asset.name}: {str(e)}")
        else:
            logger.info(f"[Mock Mode] Successfully spawned asset {getattr(asset, 'name', 'unknown')} at {position}")
            self._spawned_prims.append(prim_path)
            return f"MockSceneObject({prim_name}, {position})"

    def import_custom_mesh(self, file_path: str, prim_path: str, position: Tuple[float, float, float]) -> Any:
        """
        Converts a raw mesh file to USD at runtime, references it, and enables physics.

        Args:
            file_path: Local OBJ, FBX, STL, or other asset-converter-supported file.
            prim_path: Stage path where the converted USD should be referenced.
            position: Initial world-space translation for the imported part.

        Returns:
            SceneObject-like wrapper for the imported rigid part.
        """
        self._ensure_simulation_app()
        normalized_prim_path = prim_path if prim_path.startswith("/") else f"/World/{prim_path}"

        if omni is None or self.world is None:
            logger.info("[Mock Mode] Converted and imported custom mesh %s at %s", file_path, position)
            self._spawned_prims.append(normalized_prim_path)
            return SceneObject(prim_path=normalized_prim_path, name=os.path.basename(file_path), position=position)

        self._ensure_physics_foundation()

        if is_prim_path_valid(normalized_prim_path):
            raise ValueError(f"Prim path already exists on the stage: {normalized_prim_path}")

        converted_usd_path = self._convert_mesh_to_usd(file_path)

        # The raw mesh is converted to USD first because references, selection,
        # and PhysX schema authoring are most reliable on native USD assets.
        success = add_reference_to_stage(usd_path=converted_usd_path, prim_path=normalized_prim_path)
        if not success:
            raise RuntimeError(f"Failed to reference converted USD at: {converted_usd_path}")

        self._set_prim_position(normalized_prim_path, position)

        # The referenced root gets RigidBodyAPI while every mesh child receives
        # CollisionAPI plus a convex-decomposition collider approximation.
        self._apply_rigid_body_with_collision(normalized_prim_path, collider_mode="convexDecomposition")
        self._enable_viewport_editing_tools()

        self._spawned_prims.append(normalized_prim_path)
        return SceneObject(
            prim_path=normalized_prim_path,
            name=os.path.splitext(os.path.basename(file_path))[0],
            position=position,
        )

    def attach_assets(self, parent: Any, child: Any, joint_type: str) -> None:
        """
        Uses the connector_points defined on the assets to align them, 
        then programmatically creates an omni.physics joint/motor between them.

        Args:
            parent (SceneObject): Parent scene object.
            child (SceneObject): Child scene object to be moved and attached.
            joint_type (str): Type of physical joint ('fixed', 'revolute', 'prismatic').
        """
        # Validate input types and attributes
        # Since 'parent' and 'child' might be mocks or actual SceneObjects, we unpack their paths dynamically
        parent_path = parent.prim_path if hasattr(parent, "prim_path") else f"/World/{getattr(parent, 'id', 'parent')}"
        child_path = child.prim_path if hasattr(child, "prim_path") else f"/World/{getattr(child, 'id', 'child')}"

        logger.info(f"Attaching parent {parent_path} and child {child_path} with {joint_type} joint...")

        if omni is not None and self.world is not None:
            stage = get_current_stage()
            parent_prim = stage.GetPrimAtPath(parent_path)
            child_prim = stage.GetPrimAtPath(child_path)

            if not parent_prim.IsValid() or not child_prim.IsValid():
                raise RuntimeError(f"Invalid USD prim references. Parent valid: {parent_prim.IsValid()}, Child valid: {child_prim.IsValid()}")

            # 1. Fetch assets' relative connector point lists
            parent_connectors = getattr(parent, "connector_points", {})
            child_connectors = getattr(child, "connector_points", {})

            # Look for matching attachment targets (e.g. alignment names or keys)
            shared_key = None
            for key in parent_connectors:
                if key in child_connectors:
                    shared_key = key
                    break

            if not shared_key:
                raise ValueError(
                    f"No matching connector point found between parent '{parent_path}' and child '{child_path}'. "
                    f"Parent points: {list(parent_connectors.keys())}, Child points: {list(child_connectors.keys())}"
                )

            p_conn = parent_connectors[shared_key]
            c_conn = child_connectors[shared_key]

            # 2. Precision Alignment Math
            # Transform child coordinate frame so child's local connector point aligns with parent's connector point in world space.
            # Local positions and orientations from ConnectorPoint objects:
            p_pos = Gf.Vec3d(*p_conn.position) if hasattr(p_conn, "position") else Gf.Vec3d(0, 0, 0)
            p_rot = Gf.Quatd(*p_conn.orientation) if hasattr(p_conn, "orientation") else Gf.Quatd(1, 0, 0, 0)

            c_pos = Gf.Vec3d(*c_conn.position) if hasattr(c_conn, "position") else Gf.Vec3d(0, 0, 0)
            c_rot = Gf.Quatd(*c_conn.orientation) if hasattr(c_conn, "orientation") else Gf.Quatd(1, 0, 0, 0)

            # Build Local transforms
            t_parent_conn = Gf.Matrix4d().SetTransform(p_rot, p_pos)
            t_child_conn = Gf.Matrix4d().SetTransform(c_rot, c_pos)

            # Build World transform of parent
            parent_xform = UsdGeom.Xformable(parent_prim)
            t_world_parent = parent_xform.ComputeLocalToWorldTransform(Usd.TimeCode.Default())

            # World transform of the target connector: T_world_conn = T_world_parent * T_parent_conn
            t_world_conn = t_parent_conn * t_world_parent

            # Transform Child: T_world_child = T_child_conn.Inverse() * T_world_conn
            t_world_child = t_child_conn.GetInverse() * t_world_conn

            # Decompose and apply calculated world pose to child prim
            child_decomp_pos = t_world_child.ExtractTranslation()
            child_decomp_rot = t_world_child.ExtractRotationQuat()

            child_xform = XFormPrim(prim_path=child_path)
            child_xform.set_world_pose(
                position=np.array([child_decomp_pos[0], child_decomp_pos[1], child_decomp_pos[2]]),
                orientation=np.array([child_decomp_rot.GetReal(), child_decomp_rot.GetImaginary()[0], child_decomp_rot.GetImaginary()[1], child_decomp_rot.GetImaginary()[2]])
            )

            # 3. Create the Programmatic UsdPhysics Joint
            joint_prim_path = f"{parent_path}/joint_{shared_key}"
            
            if joint_type.lower() == "fixed":
                joint = UsdPhysics.FixedJoint.Define(stage, joint_prim_path)
            elif joint_type.lower() == "revolute":
                joint = UsdPhysics.RevoluteJoint.Define(stage, joint_prim_path)
                # Define single rotary axis (Default to Z axis)
                joint.GetAxisAttr().Set("Z")
            elif joint_type.lower() == "prismatic":
                joint = UsdPhysics.PrismaticJoint.Define(stage, joint_prim_path)
                joint.GetAxisAttr().Set("X")
            else:
                raise ValueError(f"Unsupported joint type: {joint_type}. Must be 'fixed', 'revolute', or 'prismatic'.")

            # Setup multi-body linkages
            joint.GetBody0Rel().SetTargets([parent_path])
            joint.GetBody1Rel().SetTargets([child_path])

            # Configure joint frames (local offsets where joint is attached)
            joint.GetLocalPos0Attr().Set(p_pos)
            joint.GetLocalRot0Attr().Set(p_rot)
            joint.GetLocalPos1Attr().Set(c_pos)
            joint.GetLocalRot1Attr().Set(c_rot)

            # Apply drives (motors) for controllable joint types
            if joint_type.lower() in ["revolute", "prismatic"]:
                drive_api = UsdPhysics.DriveAPI.Apply(joint, "angular" if joint_type.lower() == "revolute" else "linear")
                drive_api.GetTypeAttr().Set("force")
                drive_api.GetMaxForceAttr().Set(1e6)  # High torque limits
                drive_api.GetTargetPositionAttr().Set(0.0)
                
                # Configure PhysX motor constraints
                physx_drive = PhysxSchema.PhysxJointAPI.Apply(stage.GetPrimAtPath(joint_prim_path))
                
            self._active_joints.append(joint)
            logger.info(f"Successfully connected joint at {joint_prim_path}.")
        else:
            logger.info(f"[Mock Mode] Attached {parent_path} and {child_path} with a '{joint_type}' joint.")

    def load_robot(self, robot_assembly: Any) -> None:
        """
        Iterates through a complete RobotAssembly object, spawning and attaching 
        all parts dynamically.

        Args:
            robot_assembly (RobotAssembly): Structural model representing components and connections.
        """
        if not robot_assembly or not hasattr(robot_assembly, "parts"):
            raise ValueError("Invalid assembly configuration: Assembly must contain a non-empty 'parts' list.")

        logger.info(f"Loading RobotAssembly containing {len(robot_assembly.parts)} parts...")

        spawned_cache = {}

        # 1. Spawn root and all parts
        for part in robot_assembly.parts:
            # Assembly structure supplies initial relative placements
            spawn_pos = getattr(part, "initial_position", (0.0, 0.0, 0.0))
            scene_obj = self.spawn_asset(part.asset, spawn_pos)
            spawned_cache[part.id] = scene_obj

        # 2. Create connections
        connections = getattr(robot_assembly, "connections", [])
        for conn in connections:
            parent_id = conn.parent_id
            child_id = conn.child_id
            joint_type = getattr(conn, "joint_type", "fixed")

            if parent_id not in spawned_cache or child_id not in spawned_cache:
                raise ValueError(
                    f"Assembly connection contains invalid referencing: parent '{parent_id}' or child '{child_id}' is not loaded."
                )

            self.attach_assets(
                parent=spawned_cache[parent_id],
                child=spawned_cache[child_id],
                joint_type=joint_type
            )

        logger.info("RobotAssembly successfully fully materialized and jointed on stage.")

    def run_controller(self, controller: Union[dict, Any]) -> Any:
        """
        Applies forces, torques, or position targets to the physics joints 
        over a set timeline and captures the physics state.

        Args:
            controller (dict or callable): Definition or executor for control signals.

        Returns:
            SimulationResult: Captured replay trajectory data containing positions and velocities.
        """
        self._ensure_simulation_app()
        logger.info("Running simulation control loop...")

        timesteps = 100  # Default simulation duration
        tracking_positions = []
        tracking_velocities = []

        if omni is not None and self.world is not None:
            # Warm start timeline
            self.world.play()

            for step in range(timesteps):
                # Apply dynamic controllers to joints
                if callable(controller):
                    # Invoke user-defined control algorithm
                    controller(self.world, self._active_joints, step)
                elif isinstance(controller, dict):
                    # Drive based on discrete joint-target lists
                    for joint in self._active_joints:
                        joint_path = joint.GetPath().pathString
                        if joint_path in controller:
                            target = controller[joint_path]
                            drive = UsdPhysics.DriveAPI(joint, "angular" if joint.IsA(UsdPhysics.RevoluteJoint) else "linear")
                            if drive:
                                drive.GetTargetPositionAttr().Set(float(target))

                # Step simulation engine
                self.world.step(render=not self.headless)

                # Capture state tracking variables
                current_states = {}
                current_vels = {}
                for prim_path in self._spawned_prims:
                    prim = RigidPrim(prim_path=prim_path)
                    pos, rot = prim.get_world_pose()
                    vel = prim.get_linear_velocity()
                    current_states[prim_path] = {"position": pos.tolist(), "orientation": rot.tolist()}
                    current_vels[prim_path] = {"linear_velocity": vel.tolist()}

                tracking_positions.append(current_states)
                tracking_velocities.append(current_vels)

            self.world.pause()
        else:
            # Mock Result generation
            logger.info("[Mock Mode] Iterating timeline and generating synthetic trajectory tracking values...")
            for step in range(timesteps):
                tracking_positions.append({path: {"position": [0.0, 0.0, step * 0.01]} for path in self._spawned_prims})
                tracking_velocities.append({path: {"linear_velocity": [0.0, 0.0, 0.01]} for path in self._spawned_prims})

        # Return mock SimulationResult adhering to expected telemetry signatures
        # SimulationResult(positions, velocities)
        class SimulationResult:
            def __init__(self, positions: List[dict], velocities: List[dict]) -> None:
                self.positions = positions
                self.velocities = velocities
                self.success = True

        return SimulationResult(tracking_positions, tracking_velocities)

    def animate_robot(self, robot_assembly: Any, animation_name: str) -> Any:
        """
        Runs a predefined procedural animation or motion sequence script.

        Args:
            robot_assembly (RobotAssembly): The active robot structure.
            animation_name (str): Name identifier of the animation sequence.

        Returns:
            SimulationResult: Results captured at end of sequence execution.
        """
        logger.info(f"Triggering procedural motion path: '{animation_name}'")

        # Map animation requests to joint drives
        procedural_targets: Dict[str, float] = {}
        if animation_name == "wave":
            procedural_targets = {joint.GetPath().pathString: np.sin(0.1) for joint in self._active_joints}
        elif animation_name == "walk":
            procedural_targets = {joint.GetPath().pathString: np.cos(0.5) for joint in self._active_joints}
        else:
            # Default fallback trajectory
            procedural_targets = {joint.GetPath().pathString: 0.0 for joint in self._active_joints}

        return self.run_controller(procedural_targets)

    def reset_scene(self) -> None:
        """
        Clears out all spawned robot assets and resets the physics timeline to frame 0.
        """
        logger.info("Resetting USD stage and clearing active physics entities...")

        if omni is not None and self.world is not None:
            # Stop physics and reset timeline
            self.world.stop()

            # Clean stage references sequentially
            for prim_path in list(self._spawned_prims):
                if is_prim_path_valid(prim_path):
                    delete_prim(prim_path)

            self.world.reset()
        else:
            logger.info("[Mock Mode] Reset workspace state.")

        self._spawned_prims = []
        self._active_joints = []


_DEFAULT_SANDBOX: Optional[IsaacSandbox] = None


def import_custom_mesh(file_path: str, prim_path: str, position: Tuple[float, float, float]) -> Any:
    """
    Convenience API matching the sandbox requirement.

    It creates/reuses a GUI-enabled IsaacSandbox, ensures the physics scene and
    ground plane exist, converts the raw mesh through omni.kit.asset_converter,
    references the converted USD into the stage, and applies rigid body collision.
    """
    global _DEFAULT_SANDBOX
    if _DEFAULT_SANDBOX is None:
        _DEFAULT_SANDBOX = IsaacSandbox(headless=False)
        _DEFAULT_SANDBOX.create_scene("Custom_Mesh_Sandbox")
    return _DEFAULT_SANDBOX.import_custom_mesh(file_path, prim_path, position)
