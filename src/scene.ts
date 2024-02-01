import { createPlaneMarker } from './objects/PlaneMarker';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { handleXRHitTest } from './utils/hitTest';

import {
    AmbientLight,
    Mesh,
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    XRFrame,
} from 'three';

export function createScene(renderer: WebGLRenderer) {
    let deskModel: Object3D;
    let chairModel: Object3D;

    const scene = new Scene();
    const camera = new PerspectiveCamera();

    // Load object model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('../assets/models/desk.glb', (gltf: GLTF) => {
        deskModel = gltf.scene.children[0];
        deskModel.name = 'desk';
    });
    gltfLoader.load('../assets/models/chair.glb', (gltf: GLTF) => {
        chairModel = gltf.scene.children[0];
        chairModel.name = 'chair';
    });

    // Initialize a planeMarker
    const planeMarker = createPlaneMarker();
    scene.add(planeMarker);

    // Create controller
    const controller = renderer.xr.getController(0);
    // call handleSelect on event listener select
    controller.addEventListener('select', () => handleSelect(planeMarker, deskModel, scene));
    scene.add(controller);

    const ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight);

    const renderLoop = (time: number, frame?: XRFrame) => {
        if (renderer.xr.isPresenting) {
          handleFrame(frame, renderer, planeMarker);
            if (frame) {
              handleFrame(frame, renderer, planeMarker);
            }
            renderer.render(scene, camera);
        }
    };

    renderer.setAnimationLoop(renderLoop);
}

function handleFrame(frame: XRFrame | undefined, renderer: WebGLRenderer, planeMarker: Mesh) {
  if (frame) {
      handleXRHitTest(
          renderer,
          frame,
          (hitPoseTransformed: Float32Array) => {
              if (hitPoseTransformed) {
                  planeMarker.visible = true;
                  planeMarker.matrix.fromArray(hitPoseTransformed);
              }
          },
          () => {
              planeMarker.visible = false;
          }
      );
  }
}

function handleSelect(planeMarker: Object3D, deskModel: Object3D, scene: Scene) {
  if (planeMarker.visible) {
    const renderedDesk = scene.getObjectByName('desk');
    if (renderedDesk) {
      scene.remove(renderedDesk);
    }
    deskModel.position.setFromMatrixPosition(planeMarker.matrix);
    deskModel.visible = true;
    scene.add(deskModel);
  }
}
