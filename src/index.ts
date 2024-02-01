import { WebGLRenderer } from "three/src/renderers/WebGLRenderer";
import { ARButton } from "three/examples/jsm/webxr/ARButton";
import { createScene } from "./scene";
import {
  browserHasImmersiveArCompatibility,
  displayIntroductionMessage,
  displayUnsupportedBrowserMessage,
} from "./utils/domUtils";

import "./styles.css";

function initializeXRApp() {
  // initialize WebGL Renderer
  const renderer = new WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio)

  // enable XR on the renderer
  renderer.xr.enabled = true;

  // add the renderer to the DOM
  document.body.appendChild(renderer.domElement);

  // create the AR button element
  const xrButton = ARButton.createButton(renderer, { requiredFeatures: ["hit-test"] });

  // add AR button to the DOM
  document.body.appendChild(xrButton);

  // create the scene
  createScene(renderer);

  // Display welcome message
  displayIntroductionMessage();
};

async function start() {
  // Check for WebXR AR support, and start the app if WebXR is supported.
  if (!await browserHasImmersiveArCompatibility()) {
    return displayUnsupportedBrowserMessage();
  }

  initializeXRApp();
}

start();
