const glbLightingStudioViewer = {
  id: 'glb-lighting-studio-viewer',
  title: 'GLB Lighting Studio Viewer',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gls-wrap">
  <canvas id="glsCanvas"></canvas>
  <div class="gls-hint">Drag to orbit · Ctrl/Cmd + scroll to zoom</div>
  <div class="gls-zoom">
    <span class="gls-zoom-label">+</span>
    <input type="range" id="glsZoom" class="gls-zoom-slider" min="0" max="100" step="1" />
    <span class="gls-zoom-label">&minus;</span>
  </div>
  <div class="gls-presets" id="glsPresets">
    <button class="gls-preset active" data-preset="studio">Studio</button>
    <button class="gls-preset" data-preset="sunset">Sunset</button>
    <button class="gls-preset" data-preset="dramatic">Dramatic</button>
    <button class="gls-preset" data-preset="noir">Noir</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gls-wrap{position:relative;width:min(760px,94vw);height:min(540px,80vh);border-radius:20px;overflow:hidden;border:1px solid rgba(255,255,255,.08);transition:background 1s}
#glsCanvas{display:block;width:100%;height:100%;cursor:grab}
#glsCanvas:active{cursor:grabbing}
.gls-hint{position:absolute;top:18px;left:18px;font-size:11.5px;font-weight:600;color:#e2e8f0;background:rgba(10,12,20,.5);padding:7px 14px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1)}
.gls-zoom{position:absolute;right:18px;top:18px;bottom:74px;width:32px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.5);border:1px solid rgba(255,255,255,.12);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gls-zoom-label{font-size:12px;font-weight:700;color:#e2e8f0;line-height:1;user-select:none}
.gls-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#fbbf24;cursor:pointer}
.gls-presets{position:absolute;left:50%;bottom:18px;transform:translateX(-50%);display:flex;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:6px;backdrop-filter:blur(8px)}
.gls-preset{padding:8px 16px;border-radius:999px;border:none;background:transparent;color:#cbd5e1;font-size:12.5px;font-weight:600;cursor:pointer;transition:background .2s,color .2s}
.gls-preset.active{background:rgba(255,255,255,.14);color:#fff}
.gls-preset:hover{color:#fff}`,

  js: `const wrap = document.querySelector('.gls-wrap');
const canvas = document.getElementById('glsCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
camera.position.set(1.9, 1.0, 3.2);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.1, 0);
controls.minDistance = 1.6;
controls.maxDistance = 8;

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas, which would block
// normal page scrolling around this card. Zoom is reimplemented below as an
// explicit, opt-in gesture (a slider, and Ctrl/Cmd + scroll) instead.
controls.enableZoom = false;

const zoomSlider = document.getElementById('glsZoom');

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

// Every light is built once and simply re-tuned by each preset, rather
// than being torn down and rebuilt — swapping intensities and colors on
// existing THREE.Light objects is cheap and keeps the transition logic
// in one place.
const ambient = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambient);
const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
keyLight.position.set(4, 6, 5);
scene.add(keyLight);
const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-5, 2, 3);
scene.add(fillLight);
const rimLight = new THREE.PointLight(0xffffff, 1.2, 20);
rimLight.position.set(-2, 2, -4);
scene.add(rimLight);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(3, 44),
  new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.85;
scene.add(ground);

// Four lighting presets, each a full recipe of ambient/key/fill/rim colors,
// intensities, and a background wash — swapping between them is a
// deliberate art-direction exercise, not just a brightness slider.
const PRESETS = {
  studio: {
    bg: 'radial-gradient(60% 60% at 50% 42%,#1c1f2b,#0a0b12)',
    ambient: [0xffffff, 0.5],
    key: [0xffffff, 1.8],
    fill: [0x93c5fd, 0.5],
    rim: [0xffffff, 1.2],
  },
  sunset: {
    bg: 'radial-gradient(70% 70% at 50% 70%,#4a2a1c,#150a08)',
    ambient: [0xff9a5c, 0.45],
    key: [0xffb066, 2.1],
    fill: [0xff6f61, 0.4],
    rim: [0xffd27a, 1.4],
  },
  dramatic: {
    bg: 'radial-gradient(45% 45% at 60% 35%,#141414,#020202)',
    ambient: [0x223344, 0.15],
    key: [0xffffff, 3.2],
    fill: [0x1e293b, 0.08],
    rim: [0xf43f5e, 1.6],
  },
  noir: {
    bg: 'radial-gradient(60% 60% at 50% 40%,#12151c,#04050a)',
    ambient: [0x334155, 0.25],
    key: [0xcbd5e1, 1.3],
    fill: [0x475569, 0.3],
    rim: [0x60a5fa, 1.1],
  },
};

function applyPreset(name) {
  const p = PRESETS[name];
  wrap.style.background = p.bg;
  ambient.color.set(p.ambient[0]); ambient.intensity = p.ambient[1];
  keyLight.color.set(p.key[0]); keyLight.intensity = p.key[1];
  fillLight.color.set(p.fill[0]); fillLight.intensity = p.fill[1];
  rimLight.color.set(p.rim[0]); rimLight.intensity = p.rim[1];
}

applyPreset('studio');

document.querySelectorAll('.gls-preset').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gls-preset').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyPreset(btn.dataset.preset);
  });
});

// Khronos' official sample-asset "Damaged Helmet" — a real, freely-licensed
// .glb with genuine PBR materials, chosen specifically because a lighting
// study is only worth doing on a model with real metal/roughness variation
// to catch and reflect each preset's light differently.
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/DamagedHelmet/glTF-Binary/DamagedHelmet.glb';

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
    model.scale.setScalar(1.8 / maxDim);
    const fitted = new THREE.Box3().setFromObject(model);
    model.position.y += -0.85 - fitted.min.y;
    scene.add(model);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load, swap in a simple
    // placeholder so the lighting presets still have something real to
    // demonstrate on.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholder = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1, 1),
      new THREE.MeshStandardMaterial({ color: 0xcbd5e1, roughness: 0.35, metalness: 0.6 })
    );
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
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'GLB Lighting Studio Viewer — Free Three.js glTF Lighting Preset Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader, lit by four full lighting-preset recipes (Studio, Sunset, Dramatic, Noir) that retune the same ambient/key/fill/rim lights and background wash live — a genuine art-direction tool for showing off a real PBR model under different moods.`,
    about: {
      title: 'GLB Lighting Studio Viewer — Four Full Lighting Recipes on a Real PBR Model',
      description: `A single fixed lighting setup only ever shows one mood. This snippet loads a real, PBR-textured \`.glb\` model and gives it four complete lighting *recipes* to switch between — Studio, Sunset, Dramatic, and Noir — each one a coordinated change to every light's color and intensity plus the surrounding background wash, so the same physical geometry and materials can read as a clean product shot, a golden-hour scene, a high-contrast hero shot, or a moody character study.

**One set of lights, retuned — not rebuilt**

Rather than destroying and recreating light objects per preset (expensive, and a common source of memory leaks in longer-lived scenes), the four \`THREE.Light\` instances — \`ambient\`, \`keyLight\`, \`fillLight\`, \`rimLight\` — are created exactly once. \`applyPreset()\` simply calls \`.color.set()\` and reassigns \`.intensity\` on each existing light. Every preset switch is just property mutation on the same four objects, which is instant and leaves nothing to garbage-collect.

**A recipe, not a slider**

Each entry in the \`PRESETS\` object is a small, self-contained object holding a \`[color, intensity]\` pair for every light plus a CSS background gradient string — real art direction, not one shared brightness knob. Sunset warms every light's hue and pushes the ambient and key warmer; Dramatic drops ambient and fill almost to zero while cranking the key light hard, producing real chiaroscuro; Noir desaturates everything toward cool grays and blues. Because every preset sets *all four* lights explicitly, switching between any two presets in either order always produces a fully correct result — there's no residual state left over from whichever preset was active before.

**A real PBR model to catch the difference**

The loaded [Damaged Helmet sample asset](https://github.com/KhronosGroup/glTF-Sample-Assets) has genuine metalness/roughness texture variation across its surface — a lighting study is only worth doing on a model whose materials actually respond differently to changing key/fill/rim balance, unlike a flat-colored placeholder.

**The background changes too, not just the lights**

Each preset also sets a CSS radial-gradient on the wrapper element behind the transparent-alpha canvas, with a 1-second CSS transition already declared on that property — so switching from Studio's cool blue-black to Sunset's warm amber backdrop reads as one coordinated scene change, not just a lighting tweak floating in an unrelated background.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is turned off, with zoom reimplemented as a slider plus Ctrl/Cmd + scroll, so a plain scroll over the card always scrolls the page.

**Customizing it**

Add a fifth preset by extending the \`PRESETS\` object with a new \`[color, intensity]\` recipe, swap \`MODEL_URL\` for any other PBR-textured \`.glb\`, or pair this with [GLB wireframe/solid toggle viewer](/ui-snippets/glb-wireframe-solid-toggle/) for a combined material-and-lighting study tool.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `The helmet loads under the neutral Studio lighting preset.` },
      { title: 'Click a preset pill', text: `All four lights and the background retune together, live.` },
      { title: 'Drag on the canvas', text: `Orbit freely under any lighting preset to inspect how it catches the surface.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always scrolls the page; zoom is a separate, opt-in gesture.` },
      { title: 'Add your own preset', text: `Extend the PRESETS object with a new named lighting recipe.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb with real PBR materials.` },
      { title: 'Four full lighting recipes', text: `Studio, Sunset, Dramatic, and Noir each retune every light and the background.` },
      { title: 'Lights retuned, never rebuilt', text: `Four persistent THREE.Light objects are simply re-colored per preset, instantly.` },
      { title: 'Coordinated background wash', text: `Each preset also transitions the scene's backdrop gradient to match the mood.` },
      { title: 'Auto-fit model scale', text: `A bounding-box measurement scales the model to a known height, never a guess.` },
      { title: 'Honest load-failure fallback', text: `A logged error swaps in a placeholder mesh that still demonstrates every preset.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
      { title: 'Fully extensible presets', text: `Add a new named lighting recipe by extending one plain JS object.` },
    ],
    useCases: [
      { title: 'Product photography direction', text: 'Preview how a real PBR asset looks under four moods, Studio, Sunset, Dramatic and Noir, before committing to a render.' },
      { title: 'Game and character lighting', text: 'Test how a character reads under different light recipes, retuning the same ambient, key, fill and rim lights instead of rebuilding them.' },
      { title: 'glTF and PBR teaching', text: 'Show how lighting affects physically based materials, with a coordinated backdrop gradient transitioning alongside each preset.' },
      { title: 'Technical portfolio showpieces', text: 'Demonstrate real lighting control rather than a single fixed setup, since every preset swaps colours and intensities in place.' },
      { title: 'Mesh structure companion', text: 'Pair with the [GLB wireframe and solid toggle](/ui-snippets/glb-wireframe-solid-toggle/) to study both the lighting and the underlying geometry of one model.' },
      { icon: 'CODE', title: 'Related: Competitive Rank Tier Badge', desc: 'See the [Competitive Rank Tier Badge](/ui-snippets/rank-tier-badge/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why are the lights created once and retuned, instead of rebuilt for each preset?', a: `Creating and destroying THREE.Light objects repeatedly is wasteful and, in a longer-lived scene, a common source of memory churn. Because each light's color and intensity are ordinary mutable properties, applyPreset() simply reassigns them on the same four persistent light objects every time a preset button is clicked — instant, and nothing needs to be garbage-collected.` },
      { q: 'Why does switching presets always look fully correct, in any order?', a: `Every entry in the PRESETS object sets an explicit color and intensity for all four lights (ambient, key, fill, rim), never just the ones that differ from the previous preset. That means there's never any residual light setting left over from whichever preset was active before — clicking Noir then Sunset then Dramatic in any sequence always produces exactly the same result as clicking Dramatic directly.` },
      { q: 'Why use the Damaged Helmet model instead of a simpler shape?', a: `A lighting study is only informative on a surface with real material variation to catch light differently across it. The Damaged Helmet's genuine PBR metalness and roughness texture maps respond visibly differently to each preset's ambient/key/fill/rim balance, unlike a flat single-color placeholder shape, which would look nearly identical under every preset.` },
      { q: 'Does the background behind the model change too, or just the lights?', a: `Both. Each preset also sets a CSS radial-gradient background on the canvas's wrapper element, with a one-second CSS transition already declared on that property, so the backdrop color shifts in sync with the lighting change — a full scene mood switch, not an isolated lighting tweak against an unrelated background.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, OrbitControls, and the four persistent light objects inside a mount effect, keeping them and the PRESETS object in refs or module scope so the preset button click handlers can reach current values. Call controls.dispose() and renderer.dispose() in the cleanup function to release the WebGL context and drag listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why retuning four persistent light objects' colors and intensities is more efficient than recreating lights per preset, and why every preset setting all four lights explicitly (rather than only the ones that differ) is what guarantees correct results regardless of switching order. It's also useful for extending the demo — ask it to animate a smooth interpolated transition between two presets' light values over half a second instead of an instant snap, add a fifth "custom" preset with manual sliders for each light's intensity, or add an environment map (HDRI) that also swaps per preset for more realistic reflections. Use the conversation to build real intuition for coordinated multi-light art direction before applying the same recipe-based preset pattern to your own Three.js lighting setup.`,
      prompt: `Build a "GLB lighting studio viewer" in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- A full-size Three.js scene with OrbitControls (damping enabled, bounded min/max zoom distance) so a visitor can drag to orbit the camera around a loaded 3D model at any time.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL with real PBR (metalness/roughness) material variation across its surface (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a flat-colored primitive geometry.
- After the model loads, measure its bounding box and scale it to a fixed target height rather than a hardcoded scale number, then reposition it to rest on a simple ground plane.
- Create exactly four persistent lights once: an ambient light, a directional key light, a directional fill light, and a point or directional rim light.
- Define at least four named lighting presets as plain data (e.g. Studio, Sunset, Dramatic, Noir), each specifying an explicit color and intensity for every one of the four lights plus a background gradient for the scene's backdrop — every preset must set all four lights explicitly, not just the ones that differ from a previous preset, so switching between any two presets in any order always produces a fully correct result.
- Render a row of preset buttons; clicking one must instantly retune the existing light objects' color and intensity properties (never recreate the lights) and transition the backdrop to that preset's background gradient.
- Turn off OrbitControls' own wheel-zoom and instead implement zoom as an explicit opt-in gesture: a vertical range-input slider next to the canvas, plus Ctrl/Cmd + scroll wheel — a plain scroll must do nothing and pass through to the page normally.
- Handle the GLTFLoader's error callback by logging the real error and substituting a simple placeholder mesh with visible metalness/roughness variation, so every lighting preset still has something real to demonstrate on if the model fails to load.`,
    },
  },
};

export default glbLightingStudioViewer;
