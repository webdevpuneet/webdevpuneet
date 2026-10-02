const scrollGlbDuckTurntableScrub = {
  id: 'scroll-glb-duck-turntable-scrub',
  title: 'Scroll-Scrubbed GLB Turntable',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="gts-intro"><h1>Scroll to spin a real glTF model</h1><p>The duck's rotation is scrubbed directly by scroll position — and you can grab it and orbit the camera yourself at any moment.</p></section>
<section class="gts-pin" id="gtsPin">
  <canvas id="gtsCanvas"></canvas>
  <div class="gts-hint" id="gtsHint">Drag to orbit · plain scroll always scrolls the page · Ctrl/Cmd + scroll to zoom</div>
  <div class="gts-turns" id="gtsTurns">0.0 turns</div>
  <div class="gts-zoom">
    <span class="gts-zoom-label">+</span>
    <input type="range" id="gtsZoom" class="gts-zoom-slider" min="0" max="100" step="1" />
    <span class="gts-zoom-label">&minus;</span>
  </div>
</section>
<section class="gts-outro"><p>Two full turns, entirely driven by scroll — try scrolling back up.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;color:#fff;background:#0a0b12}
.gts-intro,.gts-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.gts-intro h1{font-size:clamp(28px,6vw,50px);letter-spacing:-.02em}
.gts-intro p,.gts-outro p{color:#9aa0b8;font-size:15px;max-width:440px}
.gts-pin{position:relative;height:100vh;overflow:hidden;background:radial-gradient(60% 60% at 50% 40%,#182034,#0a0b12)}
#gtsCanvas{display:block;width:100%;height:100%;cursor:grab}
#gtsCanvas:active{cursor:grabbing}
.gts-hint{position:absolute;left:50%;bottom:26px;transform:translateX(-50%);font-size:12px;font-weight:600;color:#b7c0da;background:rgba(10,12,20,.55);padding:8px 16px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08)}
.gts-turns{position:absolute;top:22px;right:22px;font-size:12.5px;font-weight:700;color:#facc15;background:rgba(10,12,20,.55);padding:6px 14px;border-radius:999px;border:1px solid rgba(250,204,21,.3);font-variant-numeric:tabular-nums}
.gts-zoom{position:absolute;right:22px;top:74px;bottom:74px;width:34px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gts-zoom-label{font-size:13px;font-weight:700;color:#b7c0da;line-height:1;user-select:none}
.gts-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#facc15;cursor:pointer}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById('gtsCanvas');
const turnsLabel = document.getElementById('gtsTurns');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
camera.position.set(0, 0.4, 4.4);

// OrbitControls moves the CAMERA around the scene; scroll below will spin
// the MODEL itself. Those are two independent transforms — a camera-space
// rotation and an object-space rotation — so dragging to orbit and
// scrolling to spin never have to fight over who owns "rotation." Both
// happen at once with zero conflict-resolution code required.
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.minDistance = 2.2;
controls.maxDistance = 9;
controls.target.set(0, 0, 0);

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas — including a plain
// scroll — which would silently swallow the page scroll this whole demo
// depends on. Zoom is reimplemented below as an explicit, opt-in gesture
// (a slider, and Ctrl/Cmd + scroll) instead of hijacking the default wheel.
controls.enableZoom = false;

const zoomSlider = document.getElementById('gtsZoom');

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
const key = new THREE.DirectionalLight(0xffffff, 1.5);
key.position.set(4, 6, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0x93c5fd, 0.5);
fill.position.set(-5, 2, 3);
scene.add(fill);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(4, 48),
  new THREE.MeshStandardMaterial({ color: 0x11141f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.75;
scene.add(ground);

// The model that scroll will spin. Loaded once; everything below reacts
// to it existing (or not) via this mutable reference.
let duck = null;

// A real, freely-licensed sample .glb from Khronos' official glTF sample
// asset repository, served from its GitHub repo via the jsdelivr CDN — no
// hosting of a binary asset required, and it's the same file used across
// countless real Three.js GLTFLoader tutorials and demos.
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/Duck/glTF-Binary/Duck.glb';

const loader = new THREE.GLTFLoader();
loader.load(
  MODEL_URL,
  (gltf) => {
    duck = gltf.scene;
    // Auto-fit rather than a hardcoded scale factor: different .glb exports
    // (and loader versions) can decode the same source asset at wildly
    // different raw sizes, so measuring the loaded geometry and scaling it
    // to a known target height is far more reliable than guessing a magic
    // number ahead of time.
    const box = new THREE.Box3().setFromObject(duck);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    duck.scale.setScalar(1.8 / maxDim);
    const fitted = new THREE.Box3().setFromObject(duck);
    duck.position.y += -0.75 - fitted.min.y; // rest its base on the ground disc
    scene.add(duck);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load (offline preview,
    // network block), swap in a simple placeholder so the scene is never
    // just an empty void with silent console noise.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholder = new THREE.Mesh(
      new THREE.SphereGeometry(0.9, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
    );
    placeholder.position.y = -0.1;
    duck = placeholder;
    scene.add(placeholder);
  }
);

// Scroll drives the model's own Y rotation directly from scroll progress —
// TWO full turns (4*PI radians) across the pinned scroll distance, scrubbed
// (not animated on a timer), so scrolling back up spins it back exactly.
const TOTAL_TURNS = 2;

ScrollTrigger.create({
  trigger: '#gtsPin',
  start: 'top top',
  end: '+=2600',
  pin: true,
  scrub: 0.4,
  onUpdate(self) {
    if (!duck) return;
    duck.rotation.y = self.progress * Math.PI * 2 * TOTAL_TURNS;
    turnsLabel.textContent = (self.progress * TOTAL_TURNS).toFixed(1) + ' turns';
  },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Scroll-Scrubbed GLB Turntable — Free GSAP ScrollTrigger + Three.js glTF Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader, spun by scroll position via GSAP ScrollTrigger scrub — while OrbitControls lets visitors drag to orbit the camera manually at the same time, with zero conflict between the two.`,
    about: {
      title: 'Scroll-Scrubbed GLB Turntable — A Real glTF Model, Spun by Scroll, Orbitable by Hand',
      description: `Most "3D on scroll" demos either fake the model with a primitive shape or lock the camera so tightly to the scroll animation that a visitor can't actually look at the thing from their own angle. This snippet does neither: it loads a genuine \`.glb\` file with Three.js's \`GLTFLoader\`, spins that model's own rotation directly from scroll position via GSAP ScrollTrigger's \`scrub\`, and keeps full \`OrbitControls\` dragging active the entire time — so scrolling and manually orbiting the camera both work, simultaneously, without a single line of conflict-resolution code.

**Two independent transforms, not one shared one**

The trick that makes drag-to-orbit and scroll-to-spin coexist for free is that they never touch the same property. \`OrbitControls\` moves the **camera** around a fixed target point — that's camera-space. The scroll handler sets \`duck.rotation.y\` directly on the **model** — that's object-space. A visitor dragging the canvas is orbiting the camera around the duck; scrolling is spinning the duck itself. Both are true simultaneously, and because they're different transforms on different objects, there's nothing to arbitrate — no "pause auto-rotate while dragging" logic needed at all, unlike patterns where scroll and drag would fight over the same camera position.

**A real glTF binary, not a placeholder mesh**

\`new THREE.GLTFLoader().load(MODEL_URL, ...)\` fetches Khronos' own official sample-asset Duck model — a real \`.glb\` binary containing mesh geometry, UVs, and a baked texture — from its GitHub repository via the jsdelivr CDN, no asset hosting of your own required. The load is async: the \`duck\` variable starts \`null\`, and the ScrollTrigger's \`onUpdate\` callback checks for that before touching \`.rotation\`, so scrolling before the model finishes loading never throws.

**Scrubbed, not animated on a timer**

\`ScrollTrigger\`'s \`onUpdate\` receives a \`progress\` value from 0 to 1 representing exactly how far through the pinned scroll range the user currently is, and \`duck.rotation.y\` is set to \`progress * Math.PI * 2 * TOTAL_TURNS\` — a direct, reversible function of scroll position. There's no \`requestAnimationFrame\` tween running on its own clock; scroll back up by one pixel and the model rotates back by the exact corresponding fraction of a turn.

**A named, honest fallback if the CDN model fails**

The loader's third argument is an error callback. If the \`.glb\` genuinely fails to fetch (a blocked network, an offline preview), the snippet logs the real error and swaps in a plain sphere so the scene is never a silent empty void — the same shape-matched-fallback discipline used throughout this library for anything that depends on an external resource.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is deliberately turned off (\`controls.enableZoom = false\`) — left on, it calls \`preventDefault()\` on every wheel event over the canvas, silently swallowing the page scroll this whole demo depends on. Zoom is reimplemented as two explicit, opt-in gestures instead: a vertical slider next to the canvas, and Ctrl/Cmd + scroll wheel (the same convention embedded Google Maps and most map widgets use). Both call the same \`setZoomDistance()\` helper, which clamps to \`controls.minDistance\`/\`maxDistance\` and keeps the slider's position in sync no matter which input triggered the change.

**Customizing it**

Swap \`MODEL_URL\` for [any other Khronos sample-asset \`.glb\`](/ui-snippets/scroll-glb-fox-walk-cycle-scrub/) or your own hosted model, change \`TOTAL_TURNS\` for a faster or slower spin, or combine this pattern with [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for a longer scroll narrative. Pair it conceptually with [three product viewer](/ui-snippets/three-product-viewer/), which uses the same OrbitControls setup on a procedural (non-glTF) shape.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all five CDN scripts', text: `three.min.js, GLTFLoader.js, OrbitControls.js, gsap, and ScrollTrigger — in that order.` },
      { title: 'Paste HTML, CSS, and JS', text: `The duck model loads and appears facing forward, unrotated.` },
      { title: 'Scroll into the pinned section', text: `The duck spins on its own Y axis in direct proportion to scroll position.` },
      { title: 'Drag on the canvas at any point', text: `The camera orbits freely — scroll-driven spin keeps working underneath.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always advances the page; zoom is a separate, opt-in gesture.` },
      { title: 'Scroll back up', text: `The duck's rotation reverses exactly, since it's a pure function of progress.` },
      { title: 'Swap the model URL', text: `Point MODEL_URL at any other .glb to spin a different object.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb file, not a primitive shape.` },
      { title: 'Scroll-scrubbed object rotation', text: `duck.rotation.y is a direct, reversible function of scroll progress.` },
      { title: 'Simultaneous manual orbit', text: `OrbitControls dragging works at all times, with zero conflict handling.` },
      { title: 'Two independent transforms', text: `Camera-space orbit and object-space spin never touch the same property.` },
      { title: 'Async-safe scroll handling', text: `onUpdate checks the model exists before touching it, so early scroll is safe.` },
      { title: 'Honest load-failure fallback', text: `A logged error swaps in a placeholder sphere instead of a silent void.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
      { title: 'Studio-lit scene', text: `Key/fill lighting and a grounding disc, matching this library's 3D conventions.` },
    ],
    useCases: [
      { title: 'Product and portfolio scroll stories', text: 'Use a genuinely three-dimensional centrepiece that spins by scroll while visitors can still drag to orbit the camera at the same time.' },
      { title: 'glTF loader teaching', text: 'Learn a minimal, complete `GLTFLoader` example, with object rotation and camera orbit stored as two independent transforms that never conflict.' },
      { title: 'Brand and agency showpieces', text: 'Demonstrate combined GSAP ScrollTrigger and Three.js skills, with `duck.rotation.y` a direct, reversible function of scroll position.' },
      { title: 'Museum and collectible exhibits', text: 'Spin an artefact model as the reader scrolls, with a zoom slider letting them get closer to details.' },
      { title: 'Neighbouring 3D snippets', text: 'Compare against the [three product viewer](/ui-snippets/three-product-viewer/), or follow with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) in a longer scroll narrative.' },
      { icon: 'CODE', title: 'Related: Scroll Direction Theme Shift', desc: 'See the [Scroll Direction Theme Shift](/ui-snippets/scroll-direction-theme-shift/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do scroll-driven spin and manual drag-orbit work at the same time without conflicting?', a: `They act on two completely different transforms. OrbitControls repositions the camera around a fixed target — camera-space. The scroll handler sets the model's own rotation.y directly — object-space. Since a visitor's drag and the scroll handler never write to the same property, there is nothing to arbitrate: both simply happen, simultaneously, all the time. Zoom follows the same discipline: OrbitControls' own wheel-zoom is turned off so a plain scroll always advances the page, and zooming is reimplemented as an explicit slider plus Ctrl/Cmd + scroll.` },
      { q: 'Is this a real 3D model file, or a Three.js primitive shape?', a: `A real one — THREE.GLTFLoader fetches and parses an actual .glb binary (Khronos' official sample-asset Duck model) containing real mesh geometry, UV coordinates, and a baked texture, the same file widely used across Three.js GLTFLoader tutorials and demos.` },
      { q: 'What happens if the model fails to load?', a: `The loader's error callback logs the real failure to the console and swaps in a plain sphere mesh, so the scene never renders as a silent empty void. This mirrors the honest-fallback pattern used throughout this snippet library for anything depending on an external resource.` },
      { q: 'Why use rotation.y = progress * ... instead of animating with a timer?', a: `Setting rotation directly from ScrollTrigger's progress value (0 to 1) makes the spin a pure, reversible function of scroll position — scrolling back up by any amount rotates the model back by the exact corresponding fraction of a turn. A timer-based animation would only ever play forward and couldn't scrub.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, and ScrollTrigger inside a mount effect, storing the loaded model and controls in refs so the onUpdate callback can reach them. Call controls.dispose(), renderer.dispose(), and the ScrollTrigger instance's .kill() in the cleanup function to release the WebGL context and remove the pin/scroll listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting the model's rotation.y directly from ScrollTrigger's progress value produces motion that scrubs correctly in both directions, and why OrbitControls dragging and the scroll-driven spin never need explicit conflict-resolution code (hint: they act on different transforms — camera-space versus object-space). It's also useful for extending the demo — ask it to drive a second property (like scale or a material's emissive intensity) from the same scroll progress, add scroll-triggered checkpoints that pause the spin at specific named angles, or swap in a model with its own baked animation clip and scrub that instead of a simple Y rotation. Use the conversation to build real intuition for scroll-scrubbed 3D before adapting the technique to your own glTF model.`,
      prompt: `Build a "scroll-scrubbed GLB turntable" in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler) plus GSAP with its ScrollTrigger plugin.

Requirements:
- A pinned full-viewport Three.js scene (GSAP ScrollTrigger pin: true) with an intro section before it and an outro section after, studio-lit with at least a key and fill directional light plus a simple ground/grounding element.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a Three.js primitive geometry standing in for "a model."
- Set up OrbitControls on the camera with damping enabled, so the user can click-and-drag the canvas at any time to orbit the camera and inspect the model from any angle — this must work continuously, not be disabled during the scroll-driven animation.
- Use ScrollTrigger's scrub option (not a plain trigger/timer) so that a progress value from 0 to 1 is available every frame the pinned section is being scrolled through, and set the loaded model's own rotation.y directly from that progress value multiplied by 2*PI times some number of full turns — the rotation must be a pure, reversible function of scroll position, not a one-shot animation.
- Ensure the scroll-driven model rotation and the OrbitControls camera-drag orbiting can both be used at the same time with zero explicit conflict-resolution code, by making sure they modify different transforms (the model's own rotation versus the camera's position/orbit) rather than fighting over the same property.
- Handle the model still being asynchronously in-flight when scroll events first fire (don't throw if the mesh hasn't loaded yet), and handle the GLTFLoader's error callback by logging the real error and substituting a simple placeholder mesh so the scene is never blank if the model fails to load.
- Display a small live label showing the current rotation progress (e.g. "1.3 turns") derived from the same scroll progress value.`,
    },
  },
};

export default scrollGlbDuckTurntableScrub;
