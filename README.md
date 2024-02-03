# TL;DR

This repo was built with the intention of exploring WebXR, a web standard currently in development that enables in-browser AR and VR experiences.

https://github.com/jamesmengo/XRWeb-Primer/assets/35415298/bb092891-f510-47ac-927f-555e75c741a4

# Technologies
| Name | Description |
| ---- | ---- |
| [WebXR](https://immersiveweb.dev/) | Web standard enabling VR and AR experiences on the web <br>*⚠️ WIP - This is a WIP and is still subject to change* |
| [Three.js](https://threejs.org/) | Rendering library used to build immersive experiences in the web |
| [Localtunnel](https://theboroer.github.io/localtunnel-www/) | Used to expose my development server to the web to demo + test |
# Limitations
- WebXR is currently not fully supported on iOS
	- This adds friction to development and debugging, as current WebXR experiences require a third-party app to launch in iOS
	- *Apple has committed to supporting the API on safari for the AVP - more widespread adoption potentially coming in the future?*
- Performance improvements around model rendering as well as model size would be beneficial for adoption
## Nice to have features / improvements to this repo
- Loading models from a Shopify store
- **Building a living room from a 'cart' of AR-viewable products from multiple Shopify stores**
- Building a AI / Dom Overlay using [webxr-dom-overlay](https://www.w3.org/TR/webxr-dom-overlays-1/)
- Changing orientation of placed items
- Setting up better testing / top-hatting

# Future Areas for Exploration
- I would love to try building with [A-Frame](https://aframe.io/), a web framework based on [[Three.js]]
- Gaining a better understanding of the landscape re: WebXR, OpenXR, WebGL

# Notes
- [Three.js](Three.js.md)
- [WebXr](WebXr.md)

# Resources


