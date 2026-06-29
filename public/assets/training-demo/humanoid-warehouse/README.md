# Warehouse Tote Loading Asset Pack

Simple STL assets for a humanoid robot simulation task: pick packages from a conveyor and place them into a tote.

## Coordinate convention

- Units: meters
- Z is up
- X is left/right
- Y is front/back
- Every STL origin is bottom-center of the object bounding box
- Every asset is already upright
- In three.js, load the STL, set `mesh.position` from the XML, and keep `mesh.rotation.set(0,0,0)` unless the XML says otherwise

## Files

- `conveyor_simple.stl` — static conveyor with belt, side rails, legs, and two rollers
- `tote_open_bin.stl` — open-top target bin
- `shelf_unit.stl` — simple background shelf/rack
- `pallet_simple.stl` — simple warehouse pallet
- `loading_zone_marker.stl` — thin floor marker under the tote
- `package_cube.stl` — graspable cube package
- `package_rect.stl` — graspable rectangular package
- `package_flat.stl` — graspable flat package
- `warehouse_tote_loading_scene.xml` — placement/orientation/task manifest

## Task

Have the robot pick up `package_A`, `package_B`, and `package_C` from the conveyor and place them inside `tote_01`.

Success: all package centers end up inside the tote inner volume and package bottoms are above the tote floor.
