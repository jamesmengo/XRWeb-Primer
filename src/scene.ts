import { createPlaneMarker } from "./objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./utils/hitTest";

import {
  AmbientLight,
  AxesHelper,
  DodecahedronGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  XRFrame,
} from "three";

export function createScene(renderer: WebGLRenderer) {
  // TODO: Create a scene and build a WebXR app!
  const scene = new Scene();

  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  )

  const Shape = createShape();
  scene.add(Shape);
  scene.add(new AxesHelper(3));

  renderer.setAnimationLoop((timestamp: number, frame?: XRFrame) => {
      Shape.rotation.y += 0.01;
      Shape.rotation.x += 0.01;
      Shape.rotation.z += 0.01;

    if (renderer.xr.isPresenting) {
      renderer.render(scene, camera);
    }
  });
}


function createShape() {
  const geometry = new DodecahedronGeometry(1, 0);
  const material = new MeshBasicMaterial({ color: 0x008080 });
  const shape = new Mesh(geometry, material);
  shape.position.z = -5;
  return shape
}
