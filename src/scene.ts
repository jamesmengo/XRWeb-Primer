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
  let deskModel: Object3D;

  const gltfLoader = new GLTFLoader();
  gltfLoader.load('../assets/models/scene.gltf', (gltf: GLTF) => {
    deskModel = gltf.scene.children[0];
  })


  const scene = new Scene();
  const controller = renderer.xr.getController(0);
  controller.addEventListener("select", () => {
    if (planeMarker.visible) {
      const model = deskModel.clone();
      model.position.setFromMatrixPosition(planeMarker.matrix);
      model.visible = true
      scene.add(model);
    }
  }

  )
  scene.add(controller);

  const camera = new PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100,
  )


  const planeMarker = createPlaneMarker();

  scene.add(planeMarker);

  const renderLoop = (timestamp: number, frame?: XRFrame) => {
    if (renderer.xr.isPresenting) {

      if (frame) {
        handleXRHitTest(renderer, frame, (hitPoseTransformed: Float32Array) => {
          if (hitPoseTransformed) {
            planeMarker.visible = true;
            planeMarker.matrix.fromArray(hitPoseTransformed);
          }
        }, () => {
          planeMarker.visible = false;
        })
      }
      renderer.render(scene, camera);
    }
  }

  renderer.setAnimationLoop(renderLoop);
}
