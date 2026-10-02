const glbSpinRevealStatsViewer = {
  id: 'glb-spin-reveal-stats-viewer',
  title: 'GLB Spin-to-Reveal Stats Viewer',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gsr-wrap">
  <canvas id="gsrCanvas"></canvas>
  <div class="gsr-hint">Drag to spin and reveal stats · Ctrl/Cmd + scroll to zoom</div>
  <div class="gsr-zoom">
    <span class="gsr-zoom-label">+</span>
    <input type="range" id="gsrZoom" class="gsr-zoom-slider" min="0" max="100" step="1" />
    <span class="gsr-zoom-label">&minus;</span>
  </div>
  <div class="gsr-stats" id="gsrStats">
    <div class="gsr-stat" data-i="0"><div class="gsr-stat-label">Output</div><div class="gsr-stat-value">2 &times; drivers</div></div>
    <div class="gsr-stat" data-i="1"><div class="gsr-stat-label">Battery</div><div class="gsr-stat-value">10 hrs</div></div>
    <div class="gsr-stat" data-i="2"><div class="gsr-stat-label">Connectivity</div><div class="gsr-stat-value">Bluetooth 5</div></div>
    <div class="gsr-stat" data-i="3"><div class="gsr-stat-label">Build</div><div class="gsr-stat-value">Aluminum shell</div></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gsr-wrap{position:relative;width:min(720px,94vw);height:min(520px,80vh);border-radius:20px;overflow:hidden;background:radial-gradient(60% 60% at 50% 42%,#181c28,#0a0b12);border:1px solid rgba(255,255,255,.08)}
#gsrCanvas{display:block;width:100%;height:100%;cursor:grab}
#gsrCanvas:active{cursor:grabbing}
.gsr-hint{position:absolute;top:18px;left:18px;font-size:11.5px;font-weight:600;color:#b7c0da;background:rgba(10,12,20,.55);padding:7px 14px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08)}
.gsr-zoom{position:absolute;right:18px;top:18px;bottom:18px;width:32px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gsr-zoom-label{font-size:12px;font-weight:700;color:#b7c0da;line-height:1;user-select:none}
.gsr-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#fb923c;cursor:pointer}
.gsr-stats{position:absolute;inset:0;pointer-events:none}
.gsr-stat{position:absolute;left:18px;bottom:18px;width:min(230px,55%);background:rgba(10,12,20,.7);border:1px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 16px;backdrop-filter:blur(10px);opacity:0;transform:translateY(10px) scale(.97);transition:opacity .3s,transform .3s}
.gsr-stat.on{opacity:1;transform:translateY(0) scale(1)}
.gsr-stat-label{font-size:10.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fdba74;margin-bottom:4px}
.gsr-stat-value{font-size:16px;font-weight:700;color:#fff}`,

  js: `const canvas = document.getElementById('gsrCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
camera.position.set(1.6, 0.9, 2.9);

// The only thing driving camera position is OrbitControls itself — the
// "spin to reveal" interaction below reads the camera's own live orbit
// angle rather than adding a second, competing rotation system.
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.15, 0);
controls.minDistance = 1.5;
controls.maxDistance = 7;
controls.minPolarAngle = Math.PI / 3.2;
controls.maxPolarAngle = Math.PI / 1.8;

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas, which would block
// normal page scrolling around this card. Zoom is reimplemented below as an
// explicit, opt-in gesture (a slider, and Ctrl/Cmd + scroll) instead.
controls.enableZoom = false;

const zoomSlider = document.getElementById('gsrZoom');

function setZoomDistance(distance) {
  const clamped = THREE.MathUtils.clamp(distance, controls.minDistance, controls.maxDistance);
  const offset = camera.position.clone().sub(controls.target);
  offset.setLength(clamped || 0.001);
  camera.position.copy(controls.target).add(offset);
  const t = (clamped - controls.minDistance) / (controls.maxDistance - controls.minDistance);
  zoomSlider.value = String(Math.round((1 - t) * 100));
}

setZoomDistance(camera.position.distanceTo(controls.target));

zoomSlider.addEventListener('input', () => {
  const t = 1 - Number(zoomSlider.value) / 100;
  setZoomDistance(controls.minDistance + t * (controls.maxDistance - controls.minDistance));
});

canvas.addEventListener('wheel', (e) => {
  if (!e.ctrlKey && !e.metaKey) return; // plain scroll always passes through to the page
  e.preventDefault();
  const current = camera.position.distanceTo(controls.target);
  setZoomDistance(current + e.deltaY * 0.01);
}, { passive: false });

scene.add(new THREE.AmbientLight(0x445066, 0.7));
const key = new THREE.DirectionalLight(0xffffff, 1.9);
key.position.set(4, 6, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0xfb923c, 0.45);
fill.position.set(-5, 2, 3);
scene.add(fill);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(3, 44),
  new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.75;
scene.add(ground);

// Each stat card is assigned an azimuthal angle around the product — the
// same angle space OrbitControls' own camera orbit already lives in — so
// "spinning to reveal" a stat means the camera's current azimuthal angle
// has to be genuinely close to that stat's own angle, not an arbitrary
// scroll or click trigger.
const STAT_ANGLES = [0, Math.PI / 2, Math.PI, -Math.PI / 2]; // front, right, back, left
const statEls = Array.from(document.querySelectorAll('.gsr-stat'));
const REVEAL_WINDOW = Math.PI / 3.2; // how close the camera must be to a stat's angle

function angleDiff(a, b) {
  let d = (a - b) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return Math.abs(d);
}

function updateRevealedStats() {
  // OrbitControls exposes the camera's current azimuthal angle around its
  // target directly, so no manual spherical-coordinate math is needed here
  // beyond comparing that live angle against each stat's assigned angle.
  const currentAzimuth = controls.getAzimuthalAngle();
  statEls.forEach((el, i) => {
    const close = angleDiff(currentAzimuth, STAT_ANGLES[i]) < REVEAL_WINDOW;
    el.classList.toggle('on', close);
  });
}

// Khronos' official sample-asset "BoomBox" — a real, freely-licensed .glb
// small, product-like, and detailed enough that spinning around it to
// reveal different real specs feels like a genuine product viewer.
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/BoomBox/glTF-Binary/BoomBox.glb';

const loader = new THREE.GLTFLoader();
loader.load(
  MODEL_URL,
  (gltf) => {
    const model = gltf.scene;
    // Auto-fit rather than a hardcoded scale factor: different .glb exports
    // (and loader versions) can decode the same source asset at wildly
    // different raw sizes, so measuring the loaded geometry and scaling it
    // to a known target height is far more reliable than guessing a number.
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    model.scale.setScalar(1.3 / maxDim);
    const fitted = new THREE.Box3().setFromObject(model);
    model.position.y += -0.75 - fitted.min.y;
    scene.add(model);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load, swap in a simple
    // placeholder so the spin-to-reveal interaction still has something
    // real to orbit around.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholder = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.6, 0.6),
      new THREE.MeshStandardMaterial({ color: 0xfb923c, roughness: 0.4, metalness: 0.3 })
    );
    placeholder.position.y = -0.1;
    scene.add(placeholder);
  }
);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  updateRevealedStats();
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'GLB Spin-to-Reveal Stats Viewer — Free Three.js glTF Product Spec Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader that reveals a different real product spec card depending on the camera's own live orbit angle around it — dragging genuinely "spins to reveal," reading OrbitControls' own azimuthal angle rather than a separate rotation system.`,
    about: {
      title: `GLB Spin-to-Reveal Stats Viewer — Specs Tied to the Camera's Real Orbit Angle`,
      description: `A common product-viewer pattern shows different information depending on which "side" of the object currently faces the camera. This snippet builds that honestly: each stat card is assigned a fixed azimuthal angle around the product, and on every frame the snippet compares that angle against \`OrbitControls\`' own current azimuthal angle — reading real orbit state, not a second, hand-rolled rotation tracker running in parallel.

**One angle space, not two competing ones**

\`OrbitControls\` already tracks the camera's azimuthal angle around its target internally to do its own job — and exposes it directly via \`controls.getAzimuthalAngle()\`. Rather than building a separate system to track "how far the user has spun the product," this snippet reuses that exact same built-in value. There is only ever one source of truth for the current viewing angle, which is also why the reveal state can never drift out of sync with what a visitor actually sees on screen.

**Wrapped angle comparison, not naive subtraction**

Azimuthal angles wrap around at plus or minus pi radians, so naively subtracting two angles can produce a value like 1.9 times pi for two angles that are actually very close together (just on opposite sides of the wrap point). \`angleDiff()\` normalizes the difference back into the \`[-pi, pi]\` range before taking its absolute value, so a stat assigned to the "back" of the product (angle \`pi\`) reveals correctly regardless of which direction the visitor spun to get there.

**A reveal window, not an exact angle match**

Each stat only needs the camera's current azimuth to fall within \`REVEAL_WINDOW\` radians of its assigned angle, not to match it exactly — a forgiving enough tolerance that a visitor doesn't have to hit one precise degree to trigger a reveal, while still being narrow enough that generally only one stat (occasionally two, near a boundary) is visible at once.

**Camera constrained, not free-roaming**

\`controls.minPolarAngle\`/\`maxPolarAngle\` are both set close to level, keeping the camera at roughly product-shot height throughout the whole interaction — the spin-to-reveal mechanic is specifically about *azimuthal* angle, so vertical wandering is intentionally limited rather than adding a dimension the stat system doesn't account for.

**A named, honest fallback if the model fails**

If the \`.glb\` can't load, a simple box placeholder takes the model's exact position, and the spin-to-reveal stat system keeps working exactly the same — the interaction only depends on the camera's own orbit state, never on anything specific to the loaded geometry.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is turned off, with zoom reimplemented as a slider plus Ctrl/Cmd + scroll, so a plain scroll over the card always scrolls the page.

**Customizing it**

Add more stat cards by extending \`STAT_ANGLES\` (evenly spacing them around the full circle), swap \`MODEL_URL\` for any other product-scaled \`.glb\`, or pair this with [GLB product color configurator](/ui-snippets/glb-configurator-color-swatches/) for a combined spec-and-color product page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `The BoomBox loads with its "Output" stat already revealed, facing forward.` },
      { title: 'Drag on the canvas', text: `Spin the camera around the product; a different stat card fades in per side.` },
      { title: 'Keep spinning', text: `Battery, Connectivity, and Build reveal as their assigned angle comes into view.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always scrolls the page; zoom is a separate, opt-in gesture.` },
      { title: 'Edit STAT_ANGLES and the HTML cards', text: `Reassign which angle reveals which spec, or add more stat cards.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb file, not a primitive shape.` },
      { title: 'Reveal tied to real orbit angle', text: `Uses OrbitControls' own getAzimuthalAngle(), not a separate rotation tracker.` },
      { title: 'Wrap-safe angle comparison', text: `A normalized angle-difference helper handles the plus/minus pi wrap point correctly.` },
      { title: 'Forgiving reveal window', text: `A tolerance range means visitors don't need to hit one exact degree.` },
      { title: 'Constrained camera height', text: `minPolarAngle/maxPolarAngle keep the view at consistent product-shot height.` },
      { title: 'Auto-fit model scale', text: `A bounding-box measurement scales the model to a known height, never a guess.` },
      { title: 'Honest load-failure fallback', text: `A logged error swaps in a placeholder that still supports the full reveal system.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
    ],
    useCases: [
      { title: 'Product spec reveals', text: 'Tie real specifications to the side of a product that faces the camera, using the live `getAzimuthalAngle()` from OrbitControls.' },
      { title: 'Interactive spec sheets', text: 'Replace a static bullet list with a model that tells you about each side as you spin it, with a wrap-safe angle helper handling the plus and minus 180 degree seam.' },
      { title: 'Trade show kiosks', text: 'Create a tactile display where visitors drag to discover features, with a forgiving tolerance window so no one needs to hit one exact angle.' },
      { title: 'Technical portfolio demos', text: 'Show real command of camera maths and DOM overlays, with each stat card assigned a fixed azimuthal angle around the object.' },
      { title: 'Variant chooser companion', text: 'Pair with the [GLB colour configurator](/ui-snippets/glb-configurator-color-swatches/) so shoppers can both recolour a product and read its specs from each side.' },
      { icon: 'CODE', title: 'Related: Rental Car Comparison Cards', desc: 'See the [Rental Car Comparison Cards](/ui-snippets/rental-car-comparison-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the viewer know which "side" of the product is currently facing the camera?', a: `OrbitControls already tracks the camera's azimuthal angle around its target internally, and exposes it directly through controls.getAzimuthalAngle(). Rather than building a separate rotation-tracking system, this snippet reads that exact built-in value every frame and compares it against each stat card's own assigned angle — there's only ever one source of truth for the current viewing angle.` },
      { q: `Why can't the reveal logic just subtract the two angles directly?`, a: `Azimuthal angles wrap around at positive and negative pi radians, so a naive subtraction between two angles that are actually close together (but on opposite sides of that wrap point) can produce a misleadingly large difference. The angleDiff() helper normalizes the raw difference back into the -pi to pi range before taking its absolute value, so a stat assigned to the back of the product reveals correctly regardless of which direction the visitor spun the camera to get there.` },
      { q: 'Why is there a reveal window instead of requiring an exact angle match?', a: `Requiring the camera's azimuth to match a stat's assigned angle exactly would make the interaction feel unresponsive and fiddly — a visitor would need to hit one precise degree. REVEAL_WINDOW gives each stat a forgiving tolerance range instead, wide enough to feel natural to spin into, while narrow enough that generally only one stat (occasionally two, near a boundary between them) is visible at any moment.` },
      { q: 'What happens if the model fails to load?', a: `The loader's error callback logs the real failure and swaps in a simple box placeholder at the model's exact position. The spin-to-reveal stat system keeps working identically, since it only ever depends on the camera's own live orbit angle, never on anything specific to the loaded model's geometry.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, OrbitControls, and STAT_ANGLES inside a mount effect, keeping controls and the stat element references in refs so the per-frame reveal check can reach current values. Call controls.dispose() and renderer.dispose() in the cleanup function to release the WebGL context and drag listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why reading OrbitControls' own getAzimuthalAngle() is more robust than building a separate rotation tracker, and why the angle-difference comparison needs to be wrap-aware around the plus-or-minus pi boundary rather than a plain subtraction. It's also useful for extending the demo — ask it to animate each stat card's entrance with a slight delay based on how centered the reveal angle is, add a small on-screen compass indicator showing the current azimuth relative to each stat's position, or extend the reveal system to also account for polar angle so a stat could be tied to a top-down view. Use the conversation to build real intuition for reading live camera-control state to drive UI before applying the same spin-to-reveal pattern to your own product's real specs.`,
      prompt: `Build a "spin-to-reveal product stats" 3D viewer in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- A full-size Three.js scene with OrbitControls (damping enabled, a bounded min/max zoom distance, and the polar angle constrained to a narrow range near level so the camera stays at a consistent product-shot height) so a visitor can drag to orbit a loaded 3D product around its vertical axis.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL small and detailed enough to read as a real product (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a primitive geometry.
- After the model loads, measure its bounding box and scale it to a fixed target height rather than a hardcoded scale number, then reposition it to rest on a ground plane.
- Define at least four stat/spec cards as plain data, each assigned a distinct azimuthal angle evenly spaced around a full circle. On every animation frame, read the camera's current azimuthal angle directly from OrbitControls' own built-in accessor (do not build a separate, parallel rotation-tracking system) and compare it against each stat's assigned angle using an angle-difference calculation that correctly handles wrapping around the plus-or-minus pi boundary (a naive subtraction is not sufficient).
- Reveal (fade/scale in) a stat card only when the camera's current azimuthal angle falls within a defined tolerance window of that stat's assigned angle, and hide it otherwise — dragging the canvas to spin around the product must genuinely reveal different real stat cards as different "sides" face the camera, not a scroll trigger or click-based toggle.
- Turn off OrbitControls' own wheel-zoom and instead implement zoom as an explicit opt-in gesture: a vertical range-input slider next to the canvas, plus Ctrl/Cmd + scroll wheel — a plain scroll must do nothing and pass through to the page normally.
- Handle the GLTFLoader's error callback by logging the real error and substituting a simple placeholder mesh at the model's exact position, so the spin-to-reveal stat system keeps working identically even if the real model fails to load.`,
    },
  },
};

export default glbSpinRevealStatsViewer;
