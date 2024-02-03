---
Link: https://threejs.org/
" Status": Done
---
# Basic Concepts
## Scene
- Represents the main 3d environment of the application
- This is where you arrange the entire experience 
	- models
	- lights
	- cameras
## Renderer
- Responsible for drawing the scene on our screen
- Typically rendered within a render loop configured at a given frame rate

## Camera
- Represents the user's view of the scene
- There are many types of cameras, each with their own effects / use cases

## Light
- Provides realism to the scene
- Should emulate the light in the AR scene itself

## Models & Meshes 
- Allows you to create or load 3D objects
- Three.js allows you to build objects from the ground up
- Blender can be used to create more complex object models

## Shape Position
| Symbol | Meaning |
| ---- | ---- |
| `x` | horizontal plane |
| `y` | vertical plane |
| `z` | distance plane |
## Hit Testing
- Find intersections between real-world and 3D geometry
- Checking if the cursor interaction intersects with a currently rendered element
- [getPose](https://developer.mozilla.org/en-US/docs/Web/API/XRHitTestResult/getPose): represents position and oritentation in the 3d space
- A **Plane Marker** can be used to render where our hit test result is

# Key Workflows
# Rendering a model
- [GLB Preview](https://sandbox.babylonjs.com/)
- [Furniture Model Downloads](https://ar-code.com/blog/furniture-ar-codes-and-their-3d-models-in-glb-usdz-formats)

