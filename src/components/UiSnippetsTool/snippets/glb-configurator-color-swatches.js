const glbConfiguratorColorSwatches = {
  id: 'glb-configurator-color-swatches',
  title: 'GLB Product Color Configurator',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gcc-wrap">
  <canvas id="gccCanvas"></canvas>
  <div class="gcc-hint">Drag to orbit · Ctrl/Cmd + scroll to zoom</div>
  <div class="gcc-zoom">
    <span class="gcc-zoom-label">+</span>
    <input type="range" id="gccZoom" class="gcc-zoom-slider" min="0" max="100" step="1" />
    <span class="gcc-zoom-label">&minus;</span>
  </div>
  <div class="gcc-panel">
    <div class="gcc-panel-title">Paint finish</div>
    <div class="gcc-swatches" id="gccSwatches">
      <button class="gcc-swatch active" style="--c:#e2412c" data-color="#e2412c" title="Racing Red"></button>
      <button class="gcc-swatch" style="--c:#2563eb" data-color="#2563eb" title="Cobalt Blue"></button>
      <button class="gcc-swatch" style="--c:#16a34a" data-color="#16a34a" title="Racetrack Green"></button>
      <button class="gcc-swatch" style="--c:#f5b400" data-color="#f5b400" title="Taxi Yellow"></button>
      <button class="gcc-swatch" style="--c:#eef2f6" data-color="#eef2f6" title="Pearl White"></button>
      <button class="gcc-swatch" style="--c:#111318" data-color="#111318" title="Matte Black"></button>
    </div>
    <div class="gcc-panel-title">Surface</div>
    <div class="gcc-finish-row">
      <button class="gcc-finish-btn active" data-metal="0.1" data-rough="0.75">Matte</button>
      <button class="gcc-finish-btn" data-metal="0.85" data-rough="0.2">Metallic</button>
      <button class="gcc-finish-btn" data-metal="0.05" data-rough="0.05">Gloss</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gcc-wrap{position:relative;width:min(880px,94vw);height:min(560px,80vh);border-radius:20px;overflow:hidden;background:radial-gradient(60% 60% at 50% 42%,#181c28,#0a0b12);border:1px solid rgba(255,255,255,.08)}
#gccCanvas{display:block;width:100%;height:100%;cursor:grab}
#gccCanvas:active{cursor:grabbing}
.gcc-hint{position:absolute;top:18px;left:18px;font-size:11.5px;font-weight:600;color:#b7c0da;background:rgba(10,12,20,.55);padding:7px 14px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08)}
.gcc-zoom{position:absolute;left:18px;top:64px;bottom:18px;width:32px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gcc-zoom-label{font-size:12px;font-weight:700;color:#b7c0da;line-height:1;user-select:none}
.gcc-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#e2412c;cursor:pointer}
.gcc-panel{position:absolute;right:18px;top:18px;bottom:18px;width:200px;background:rgba(10,12,20,.65);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px;backdrop-filter:blur(10px);display:flex;flex-direction:column;gap:10px}
.gcc-panel-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b93ad;margin-top:4px}
.gcc-panel-title:first-child{margin-top:0}
.gcc-swatches{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.gcc-swatch{width:100%;aspect-ratio:1;border-radius:50%;border:2px solid rgba(255,255,255,.25);background:var(--c);cursor:pointer;transition:transform .15s,border-color .15s}
.gcc-swatch:hover{transform:scale(1.08)}
.gcc-swatch.active{border-color:#fff;box-shadow:0 0 0 2px rgba(255,255,255,.15)}
.gcc-finish-row{display:flex;flex-direction:column;gap:6px}
.gcc-finish-btn{padding:8px 10px;border-radius:9px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.04);color:#cbd5e1;font-size:12.5px;font-weight:600;cursor:pointer;text-align:left}
.gcc-finish-btn.active{background:rgba(226,65,44,.2);border-color:rgba(226,65,44,.5);color:#fecaca}
@media (max-width:640px){.gcc-panel{position:static;width:100%;margin-top:10px;flex-direction:row;flex-wrap:wrap;align-items:center}.gcc-wrap{height:auto;display:flex;flex-direction:column}#gccCanvas{height:60vh}}`,

  js: `const canvas = document.getElementById('gccCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
camera.position.set(1.6, 1.1, 3.4);

// Manual camera orbit only — nothing in this snippet drives the camera on
// its own, so OrbitControls is the sole thing that ever moves it.
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.3, 0);
controls.minDistance = 1.8;
controls.maxDistance = 8;

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas, which would block
// normal page scrolling around this card. Zoom is reimplemented below as an
// explicit, opt-in gesture (a slider, and Ctrl/Cmd + scroll) instead.
controls.enableZoom = false;

const zoomSlider = document.getElementById('gccZoom');

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
const key = new THREE.DirectionalLight(0xffffff, 1.8);
key.position.set(4, 6, 5);
scene.add(key);
const fill = new THREE.DirectionalLight(0x93c5fd, 0.5);
fill.position.set(-5, 2, 3);
scene.add(fill);
const rim = new THREE.PointLight(0xffffff, 1.1, 20);
rim.position.set(-2, 2, -4);
scene.add(rim);

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(3, 48),
  new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.9;
scene.add(ground);

// Every paintable material found on the loaded model, collected once it
// loads so the swatch/finish buttons below can restyle the real product
// instead of a stand-in shape.
let paintMaterials = [];

// Khronos' official sample-asset "Toy Car" — a real, freely-licensed .glb
// with a plain body shell that reads clearly as "painted" when its
// material's color and metalness/roughness are changed live.
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/ToyCar/glTF-Binary/ToyCar.glb';

const loader = new THREE.GLTFLoader();
loader.load(
  MODEL_URL,
  (gltf) => {
    const car = gltf.scene;

    // Auto-fit rather than a hardcoded scale factor: different .glb exports
    // (and loader versions) can decode the same source asset at wildly
    // different raw sizes, so measuring the loaded geometry and scaling it
    // to a known target height is far more reliable than guessing a number.
    const box = new THREE.Box3().setFromObject(car);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    car.scale.setScalar(1.7 / maxDim);
    const fitted = new THREE.Box3().setFromObject(car);
    car.position.y += -0.9 - fitted.min.y; // rest its base on the ground disc
    scene.add(car);

    // Clone each mesh's material so recoloring this instance never mutates
    // a material shared by other geometry inside the same glTF scene graph.
    car.traverse((node) => {
      if (node.isMesh && node.material) {
        node.material = node.material.clone();
        paintMaterials.push(node.material);
      }
    });
    applyColor('#e2412c');
    applyFinish(0.1, 0.75);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load, swap in a simple
    // placeholder so the scene is never just an empty void.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholder = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.6, 0.9),
      new THREE.MeshStandardMaterial({ color: 0xe2412c, roughness: 0.75 })
    );
    placeholder.position.y = -0.4;
    scene.add(placeholder);
    paintMaterials = [placeholder.material];
  }
);

function applyColor(hex) {
  paintMaterials.forEach((m) => m.color.set(hex));
}

function applyFinish(metalness, roughness) {
  paintMaterials.forEach((m) => {
    m.metalness = metalness;
    m.roughness = roughness;
  });
}

document.querySelectorAll('.gcc-swatch').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gcc-swatch').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyColor(btn.dataset.color);
  });
});

document.querySelectorAll('.gcc-finish-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.gcc-finish-btn').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    applyFinish(Number(btn.dataset.metal), Number(btn.dataset.rough));
  });
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
    title: 'GLB Product Color Configurator — Free Three.js glTF Paint Swatch Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader and recolored live by clicking paint swatches and finish presets — every mesh material is cloned so the configurator never mutates shared glTF materials, with drag-to-orbit and a Ctrl/Cmd-scroll zoom that never hijacks the page.`,
    about: {
      title: 'GLB Product Color Configurator — Real glTF Geometry, Live Paint and Finish Swatches',
      description: `Most "3D color picker" demos recolor a primitive sphere or cube. This snippet does the real thing: it loads a genuine \`.glb\` model with Three.js's \`GLTFLoader\`, then lets a visitor click through paint swatches and surface-finish presets that change the model's *actual* materials in real time, on the actual loaded geometry.

**Cloning materials before touching them**

A glTF scene graph frequently reuses one material instance across several mesh nodes. Setting \`.color\` on a shared material would recolor every mesh using it, which is rarely what a single-product configurator wants. The moment the model loads, this snippet walks its full node tree with \`car.traverse()\`, and for every mesh clones its material with \`node.material.clone()\` before collecting it into a \`paintMaterials\` array. Every swatch and finish button afterward only ever touches that per-instance clone.

**Auto-fit rather than a guessed scale**

Different \`.glb\` exports — and even different loader versions — can decode the same source asset's geometry at wildly different raw sizes. Rather than hardcoding a scale factor, the snippet measures the loaded model's bounding box with \`THREE.Box3\`, finds its largest dimension, and scales it to a known target height. The model is then repositioned so its lowest point rests exactly on the ground disc, regardless of how the source file was authored.

**Color and finish are two independent controls**

Clicking a paint swatch calls \`applyColor()\`, which sets \`.color\` on every cloned material. Clicking a finish preset (Matte, Metallic, Gloss) calls \`applyFinish()\`, which sets \`.metalness\` and \`.roughness\` instead — completely separate PBR properties. Because both act on the same live \`MeshStandardMaterial\` instances, any combination of the six colors and three finishes renders correctly with zero extra state to track.

**A named, honest fallback if the model fails**

If \`GLTFLoader\` can't fetch the \`.glb\`, the real error is logged and a simple box mesh takes its place — reusing the exact same \`paintMaterials\` array, so the swatches and finish buttons keep working on the placeholder instead of silently doing nothing.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is deliberately turned off (\`controls.enableZoom = false\`) so a plain scroll over the card always scrolls the page. Zoom is reimplemented as two explicit, opt-in gestures instead: a vertical slider next to the canvas, and Ctrl/Cmd + scroll wheel, both driving the same \`setZoomDistance()\` helper.

**Customizing it**

Swap \`MODEL_URL\` for any other Khronos sample-asset \`.glb\`, add more swatch colors, or extend \`applyFinish()\` with an \`emissive\` property for a glow-in-the-dark colorway. Pair it with [three product viewer](/ui-snippets/three-product-viewer/) for the non-glTF version of the same recoloring idea, or [GLB exploded view assembly toggle](/ui-snippets/glb-exploded-view-toggle/) for a different way to interact with a loaded model.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js — in that order.` },
      { title: 'Paste HTML, CSS, and JS', text: `The toy car loads in racing red on a matte finish.` },
      { title: 'Drag on the canvas', text: `Orbit the camera freely to inspect the model from any angle.` },
      { title: 'Click a paint swatch', text: `Every mesh's cloned material recolors instantly, live.` },
      { title: 'Click a finish preset', text: `Matte, Metallic, or Gloss changes metalness and roughness together.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always scrolls the page; zoom is a separate, opt-in gesture.` },
      { title: 'Swap the model URL', text: `Point MODEL_URL at any other .glb to configure a different product.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb file, not a primitive shape.` },
      { title: 'Live paint swatches', text: `Six colors set .color on every cloned mesh material instantly.` },
      { title: 'Independent finish presets', text: `Matte, Metallic, and Gloss change metalness/roughness as a separate axis.` },
      { title: 'Per-instance material cloning', text: `Materials are cloned on load so recoloring never mutates shared glTF materials.` },
      { title: 'Auto-fit model scale', text: `A bounding-box measurement scales the model to a known height, never a guess.` },
      { title: 'Honest load-failure fallback', text: `A logged error swaps in a placeholder box that stays fully paintable.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
      { title: 'Studio-lit scene', text: `Key/fill/rim lighting and a grounding disc for a real product-shot feel.` },
    ],
    useCases: [
      { title: 'E-commerce product configurators', text: `The exact interaction pattern used by real color/finish product customizers.` },
      { title: 'Automotive and vehicle showcases', text: `Preview a real vehicle model in multiple paint jobs before committing.` },
      { title: 'Furniture and product design previews', text: `Swap the toy car for any product .glb to preview colorways and finishes.` },
      { title: 'glTF material teaching demos', text: `A minimal, complete example of cloning and live-editing PBR materials.` },
      { title: 'Print-on-demand and merch previews', text: `Preview a physical product in every available colorway.` },
      { title: 'Alongside other GLB viewers', text: `Compare against [GLB exploded view assembly toggle](/ui-snippets/glb-exploded-view-toggle/)'s part-based interaction.` },
      { icon: 'CODE', title: 'Related: Profile Completeness Card — Weighted Progress with Next-Best-Action', desc: 'See the [Profile Completeness Card — Weighted Progress with Next-Best-Action](/ui-snippets/profile-completeness-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why clone every material instead of just setting .color directly on the loaded materials?', a: `A glTF file frequently reuses one material instance across multiple mesh nodes to keep the file small. Setting .color directly on that shared material would recolor every mesh using it, which usually isn't the intent of a single-product color configurator. Cloning each mesh's material once, right after load, guarantees every swatch click only ever affects this specific model instance.` },
      { q: 'Why are color and finish two separate button rows instead of one?', a: `They control different PBR properties. Paint swatches set .color, the base tint of the surface. Finish presets set .metalness and .roughness together, which controls how that color reflects light — matte, brushed metal, or high gloss. Keeping them independent means any of the six colors can be combined with any of the three finishes without extra state tracking.` },
      { q: 'How does the model always end up correctly sized and grounded regardless of the source .glb?', a: `After loading, the snippet measures the model's actual bounding box with THREE.Box3, finds its largest dimension, and scales the whole model so that dimension matches a fixed target height. It then re-measures the scaled bounding box and shifts the model vertically so its lowest point sits exactly on the ground disc — a hardcoded scale number would break the moment a differently-exported .glb was swapped in.` },
      { q: 'What happens if the model fails to load?', a: `The loader's error callback logs the real failure and creates a simple box mesh in its place, adding that placeholder's material to the same paintMaterials array the swatches and finish buttons already read from — so the configurator UI keeps working correctly even without the real model.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, and OrbitControls inside a mount effect, storing paintMaterials and the loaded model in refs so the swatch and finish click handlers can reach current values. Call controls.dispose() and renderer.dispose() in the cleanup function to release the WebGL context and drag listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why cloning each mesh's material on load prevents one swatch click from accidentally recoloring unrelated geometry that shares a material in the source glTF file, and how the auto-fit bounding-box scale keeps the model correctly sized regardless of which .glb is loaded. It's also useful for extending the demo — ask it to persist the chosen color and finish in localStorage, add a "randomize" button that picks a random swatch and finish combination, or extend applyFinish() with an emissive color for glow-in-the-dark or neon colorways. Use the conversation to build real intuition for live PBR material editing before adapting the technique to your own glTF product model.`,
      prompt: `Build a "GLB product color configurator" in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- A full-size Three.js scene with OrbitControls (damping enabled, bounded min/max zoom distance) so a visitor can drag to orbit the camera around a loaded 3D product at any time, studio-lit with at least key, fill, and rim lights plus a simple grounding disc.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a Three.js primitive geometry standing in for "a product."
- After the model loads, measure its bounding box and scale it to a fixed target height rather than using a hardcoded scale number, then reposition it so its lowest point rests on the ground plane.
- Walk every mesh in the loaded model's scene graph and clone each one's material before storing references to the clones in an array, specifically to avoid mutating a material that might be shared by multiple mesh nodes in the source glTF file.
- Render a row of at least six color swatch buttons; clicking one must set the .color property on every cloned material live, with no mesh rebuild.
- Render a separate row of at least three surface-finish preset buttons (e.g. Matte, Metallic, Gloss); clicking one must set both metalness and roughness together on every cloned material, independently of the currently selected color.
- Turn off OrbitControls' own wheel-zoom (it calls preventDefault() on every wheel event, which would block normal page scrolling) and instead implement zoom as an explicit opt-in gesture: a vertical range-input slider next to the canvas, plus Ctrl/Cmd + scroll wheel — a plain scroll with no modifier key must do nothing and pass through to the page normally.
- Handle the GLTFLoader's error callback by logging the real error and substituting a simple placeholder mesh, adding its material to the same array the swatch and finish buttons already read from, so the configurator keeps working even if the real model fails to load.`,
    },
  },
};

export default glbConfiguratorColorSwatches;
