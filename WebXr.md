---
"0": ""
" Status": Done
---
⚠️ This is an unstable API and as such is subject to change at any time

| Resource | Link |
| ---- | ---- |
| MDN WebXR API Spec | [WebXR Device API - Web APIs \| MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebXR_Device_API) |
| WebXR Explainer | [webxr/explainer.md at master · immersive-web/webxr](https://github.com/immersive-web/webxr/blob/master/explainer.md#what-is-webxr) |
| Immersive Web Developer Home | [Immersive Web Developer Home](https://immersiveweb.dev/) |
| OpenXR | [OpenXR Overview - The Khronos Group Inc](https://www.khronos.org/openxr/) |
| Benefits of doing XR on the Web | [Immersive Web Developer Home](https://immersiveweb.dev/#benefitsofdoingxrontheweb) |
| WebXR Device API | https://www.w3.org/TR/webxr/ |
# What is WebXR?
- **Group of web standards** that are used together to support rendering 3D scenes on hardware that's compatible with VR / AR

# Key Capabilities
- Detect if XR capabilities are available
- Determine which XR capabilities the device has
- Poll the XR device state
- Render scenes on the XR device at the appropriate frame rate
# Fundamentals
- Scenes are represented in 3D by computing perspective to apply to the scene
- Creates two images, one for each eye
	- Computes the perspective to apply to the scene based off of the eye position
	- Once both perspectives have been computed and rendered, the resulting framebuffer is delivered to the WebXR device through headset or 

# Differences with WebVR
- Supports AR functionality
- WebVR was built with the first generation of VR experiences and hardware in mind
	- Certain assumptions were made which made the difficult to adjust to modern hardware such as mobile AR experiences

# Relationship to OpenXR
- OpenXR is being developed by Khronos
- OpenXR covers the same capabilities as WebXR, but for native applications
- It will likely be reasonable to implement WebXR's feature set using OpenXR once it's released
# Lifetime of a VR Web App
1) Query to see if desired XR mode is supported
2) If support is available, advertise XR functionality to user
3) Listen for a **user-activation-event**, indicating that the user wants to use XR
4) **Request an immersive session from the device**
5) Use the session to run a render loop
	1) Update sensor data (device orientation, position)
	2) Produce graphical frame (compute rendered frame)
6) Continue producing frames in render loop until user exits XR mode
7) End XR Session

# DOM Overlays
- shows interactive 2D web content during webXR session
- displays the content of a single DOM element as a transparent-background 2D rectangle
- [Explainer](https://github.com/immersive-web/dom-overlays/blob/main/explainer.md)

## XRInputSource
https://www.w3.org/TR/webxr-dom-overlays-1/#xrinputsource

Determines whether a user input was a primary action or auxiliary action

1) At the time of the input, if the input intersects the *DOM Overlay*
	1) Queue a task to fire a *beforexrselect* event
		1) This event can be cancelled, which suppresses XR input select events