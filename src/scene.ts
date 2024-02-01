import { createPlaneMarker } from './objects/PlaneMarker';
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { handleXRHitTest } from './utils/hitTest';

import {
    AmbientLight,
    Object3D,
    PerspectiveCamera,
    Scene,
    WebGLRenderer,
    XRFrame,
} from 'three';

export function createScene(renderer: WebGLRenderer) {
    let deskModel: Object3D;

    const scene = new Scene();
    const camera = new PerspectiveCamera();

    // Load object model
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('../assets/models/desk.glb', (gltf: GLTF) => {
        deskModel = gltf.scene.children[0];
    });

    // Initialize a planeMarker
    const planeMarker = createPlaneMarker();
    scene.add(planeMarker);

    // Create controller
    const controller = renderer.xr.getController(0);
    controller.addEventListener('select', () => {
        if (planeMarker.visible) {
            const model = deskModel.clone();
            model.position.setFromMatrixPosition(planeMarker.matrix);
            model.visible = true;
            scene.add(model);
        }
    });
    scene.add(controller);

    const ambientLight = new AmbientLight(0xffffff);
    scene.add(ambientLight)

    const renderLoop = (timestamp: number, frame?: XRFrame) => {
        if (renderer.xr.isPresenting) {
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
            renderer.render(scene, camera);
        }
    };

    renderer.setAnimationLoop(renderLoop);
}
