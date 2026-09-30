const glbWireframeSolidToggle = {
  id: 'glb-wireframe-solid-toggle',
  title: 'GLB Wireframe / Solid Toggle Viewer',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gwf-wrap">
  <canvas id="gwfCanvas"></canvas>
  <div class="gwf-hint">Drag to orbit · Ctrl/Cmd + scroll to zoom</div>
  <div class="gwf-zoom">
    <span class="gwf-zoom-label">+</span>
    <input type="range" id="gwfZoom" class="gwf-zoom-slider" min="0" max="100" step="1" />
    <span class="gwf-zoom-label">&minus;</span>
  </div>
  <div class="gwf-panel">
    <div class="gwf-panel-title">Render mode</div>
    <input type="range" id="gwfMix" class="gwf-mix-slider" min="0" max="100" step="1" value="0" />
    <div class="gwf-panel-row"><span>Solid</span><span id="gwfMixLabel">Solid</span><span>Wireframe</span></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gwf-wrap{position:relative;width:min(720px,94vw);height:min(520px,80vh);border-radius:20px;overflow:hidden;background:radial-gradient(60% 60% at 50% 42%,#161a24,#08090d);border:1px solid rgba(255,255,255,.08)}
#gwfCanvas{display:block;width:100%;height:100%;cursor:grab}
#gwfCanvas:active{cursor:grabbing}
.gwf-hint{position:absolute;top:18px;left:18px;font-size:11.5px;font-weight:600;color:#b7c0da;background:rgba(10,12,20,.55);padding:7px 14px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08)}
.gwf-zoom{position:absolute;right:18px;top:18px;bottom:96px;width:32px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gwf-zoom-label{font-size:12px;font-weight:700;color:#b7c0da;line-height:1;user-select:none}
.gwf-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#22d3ee;cursor:pointer}
.gwf-panel{position:absolute;left:18px;right:18px;bottom:18px;background:rgba(10,12,20,.65);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:14px 16px;backdrop-filter:blur(10px)}
.gwf-panel-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b93ad;margin-bottom:8px}
.gwf-mix-slider{width:100%;accent-color:#22d3ee;cursor:pointer}
.gwf-panel-row{display:flex;justify-content:space-between;font-size:11.5px;color:#9aa0b8;margin-top:6px}
#gwfMixLabel{font-weight:700;color:#67e8f9}`,

  js: `const canvas = document.getElementById('gwfCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
camera.position.set(1.7, 1.0, 3.1);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.2, 0);
controls.minDistance = 1.5;
controls.maxDistance = 8;

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas, which would block
// normal page scrolling around this card. Zoom is reimplemented below as an
// explicit, opt-in gesture (a slider, and Ctrl/Cmd + scroll) instead.
controls.enableZoom = false;

const zoomSlider = document.getElementById('gwfZoom');

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

const ground = new THREE.Mesh(
  new THREE.CircleGeometry(3, 44),
  new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.85;
scene.add(ground);

// Two independent copies of every mesh: a solid-shaded clone and a
// wireframe clone sharing the same underlying geometry, layered exactly
// on top of each other. Cross-fading their opacity — rather than flipping
// a single material's .wireframe boolean on and off — is what makes a
// smooth, continuous 0-100 blend possible instead of a hard binary snap.
const solidGroup = new THREE.Group();
const wireGroup = new THREE.Group();
scene.add(solidGroup, wireGroup);

function buildDualMaterialModel(sourceRoot) {
  sourceRoot.traverse((node) => {
    if (!node.isMesh) return;
    const solidMesh = new THREE.Mesh(node.geometry, new THREE.MeshStandardMaterial({ color: 0x67e8f9, roughness: 0.45, metalness: 0.2, transparent: true, opacity: 1 }));
    const wireMesh = new THREE.Mesh(node.geometry, new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0 }));
    solidMesh.matrix.copy(node.matrixWorld);
    wireMesh.matrix.copy(node.matrixWorld);
    solidMesh.matrixAutoUpdate = false;
    wireMesh.matrixAutoUpdate = false;
    solidGroup.add(solidMesh);
    wireGroup.add(wireMesh);
  });
}

// Khronos' official sample-asset "Antique Camera" — a real, freely-licensed
// .glb with clean, readable edges that make a wireframe overlay genuinely
// legible rather than an illegible tangle.
const MODEL_URL = 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb';

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
    model.scale.setScalar(1.7 / maxDim);
    model.updateMatrixWorld(true);
    const fitted = new THREE.Box3().setFromObject(model);
    const liftY = -0.85 - fitted.min.y;
    model.position.y += liftY;
    model.updateMatrixWorld(true);
    buildDualMaterialModel(model);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load, build a simple
    // placeholder that still supports the same solid/wireframe blend.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholder = new THREE.Group();
    const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 1));
    mesh.position.y = 0.1;
    placeholder.add(mesh);
    buildDualMaterialModel(placeholder);
  }
);

function applyMix(t01) {
  solidGroup.children.forEach((m) => { m.material.opacity = 1 - t01; });
  wireGroup.children.forEach((m) => { m.material.opacity = t01; });
}

const mixSlider = document.getElementById('gwfMix');
const mixLabel = document.getElementById('gwfMixLabel');
mixSlider.addEventListener('input', () => {
  const t = Number(mixSlider.value) / 100;
  applyMix(t);
  mixLabel.textContent = t < 0.02 ? 'Solid' : t > 0.98 ? 'Wireframe' : Math.round(t * 100) + '% wire';
});
applyMix(0);

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
    title: 'GLB Wireframe / Solid Toggle Viewer — Free Three.js glTF Cross-Fade Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader and continuously cross-faded between a solid shaded render and a wireframe overlay via a slider — two layered mesh clones sharing the same geometry make a smooth 0-100% blend possible, not just a binary on/off toggle.`,
    about: {
      title: 'GLB Wireframe / Solid Toggle Viewer — A Continuous Blend, Not a Binary Flip',
      description: `The obvious way to toggle wireframe mode on a Three.js model is flipping \`material.wireframe = true\`. That gives a hard, instant snap between two looks. This snippet does something more useful for actually studying a model's geometry: it builds two full mesh clones of every part — one solid-shaded, one wireframe — layered exactly on top of each other, and cross-fades their opacity continuously from a single slider, so a visitor can rest anywhere between "fully solid" and "fully wireframe," not just at the two extremes.

**Two meshes per part, sharing one geometry**

For every mesh found by traversing the loaded model, \`buildDualMaterialModel()\` creates two new \`THREE.Mesh\` instances that both reference the *same* \`node.geometry\` object — no geometry is duplicated in memory, only the materials differ. One gets a \`MeshStandardMaterial\` for solid shading, the other a \`MeshBasicMaterial\` with \`wireframe: true\`. Both start \`transparent: true\` so their \`opacity\` can be driven independently.

**Baking world transforms instead of reparenting**

Rather than trying to preserve and reparent the original model's node hierarchy (position, rotation, and scale at every level), each cloned mesh has \`matrixAutoUpdate\` turned off and its \`.matrix\` set directly from the source node's already-computed \`matrixWorld\` — after the auto-fit scale and ground-alignment shift have both already been applied and the world matrices recomputed with \`updateMatrixWorld(true)\`. That one \`.matrix\` copy is all that's needed to place each flattened clone exactly where its original part was, with no hierarchy to maintain afterward.

**The slider drives one function, both groups**

\`applyMix(t01)\` sets every solid clone's opacity to \`1 - t01\` and every wireframe clone's opacity to \`t01\` in the same call, so the two groups are always perfectly complementary — there's no moment where both are fully opaque or both are fully transparent, and the model never visually disappears at any point along the slider's range.

**Auto-fit before flattening, not after**

The bounding-box measurement, scale, and ground-position shift all happen on the *original* loaded model, with \`model.updateMatrixWorld(true)\` called before flattening into the dual-material clones — so every clone's baked world matrix already reflects the correctly-sized, correctly-grounded final position.

**A named, honest fallback if the model fails**

If the \`.glb\` can't load, a simple icosahedron is run through the exact same \`buildDualMaterialModel()\` function, so the solid/wireframe slider keeps working correctly even without the real model.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is turned off, with zoom reimplemented as a slider plus Ctrl/Cmd + scroll, so a plain scroll over the card always scrolls the page.

**Customizing it**

Swap \`MODEL_URL\` for any other \`.glb\` with clean, readable edges, or pair this with [GLB lighting studio viewer](/ui-snippets/glb-lighting-studio-viewer/) to study how lighting and geometry inspection combine.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `The camera model loads fully solid-shaded.` },
      { title: 'Drag the render-mode slider', text: `The model continuously cross-fades from solid toward pure wireframe.` },
      { title: 'Drag on the canvas', text: `Orbit freely at any blend amount to inspect edges from any angle.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always scrolls the page; zoom is a separate, opt-in gesture.` },
      { title: 'Swap the model URL', text: `Point MODEL_URL at any other .glb to inspect a different model's geometry.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb file, not a primitive shape.` },
      { title: 'Continuous solid-to-wireframe blend', text: `A single slider cross-fades opacity across the full 0-100% range, not a binary toggle.` },
      { title: 'Shared geometry, dual materials', text: `Solid and wireframe clones reference the same geometry object, doubling no memory.` },
      { title: 'Baked world-matrix flattening', text: `Each clone's transform is copied directly from the source, no hierarchy to maintain.` },
      { title: 'Auto-fit before flattening', text: `Scale and ground alignment happen on the source model before it's cloned.` },
      { title: 'Always-complementary opacity', text: `Solid and wireframe opacity always sum to 1, so the model never disappears mid-slide.` },
      { title: 'Honest load-failure fallback', text: `A logged error swaps in a placeholder run through the same dual-material pipeline.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
    ],
    useCases: [
      { title: '3D modeling and topology review', text: `Inspect a real model's edge flow and geometry density at any blend level.` },
      { title: 'Engineering and CAD-adjacent portfolios', text: `Demonstrate a technical wireframe/solid inspection tool built from a real asset.` },
      { title: 'Game asset QA and reviews', text: `Check a character or prop's silhouette and wire density before shipping.` },
      { title: 'glTF/material teaching demos', text: `A complete, real example of layered dual-material geometry inspection.` },
      { title: 'Architecture and product design previews', text: `Blend between a technical wireframe view and a rendered look for presentations.` },
      { title: 'Alongside other GLB viewers', text: `Pair with [GLB lighting studio viewer](/ui-snippets/glb-lighting-studio-viewer/) for a combined inspection tool.` },
      { icon: 'CODE', title: 'Related: ResizeObserver Live Card', desc: 'See the [ResizeObserver Live Card](/ui-snippets/resize-observer-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why build two full mesh clones instead of just toggling material.wireframe on one mesh?', a: `Flipping a single material's wireframe boolean only produces a hard, instant snap between two looks. Building a solid-shaded clone and a wireframe clone that share the same underlying geometry, both marked transparent, lets their opacity be cross-faded continuously from a slider — so a visitor can rest anywhere between fully solid and fully wireframe, which a boolean toggle simply cannot represent.` },
      { q: 'Does cloning the mesh also duplicate the geometry data in memory?', a: `No. Both the solid and wireframe THREE.Mesh instances for a given part reference the exact same geometry object — only two new Mesh wrapper objects and two new materials are created per part, not two copies of the vertex, normal, and UV data. Geometry, which is typically the largest chunk of memory a model uses, is never duplicated.` },
      { q: `Why are the clones' transforms copied via matrix instead of reparenting them into the model's original hierarchy?`, a: `Preserving a full node hierarchy (with nested position/rotation/scale at every level) for two full clones would be significantly more bookkeeping than needed. Instead, each source node's already-computed matrixWorld — after the auto-fit scale and ground-alignment shift are both applied — is copied directly onto each flattened clone's own .matrix, with matrixAutoUpdate turned off. One matrix copy per clone places it correctly with zero hierarchy left to maintain.` },
      { q: 'What happens if the model fails to load?', a: `The loader's error callback logs the real failure and builds a simple icosahedron group, which is passed through the exact same buildDualMaterialModel() function the real model uses — so the render-mode slider keeps working correctly, cross-fading a placeholder shape instead of silently doing nothing.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, OrbitControls, and the solidGroup/wireGroup pair inside a mount effect, keeping them in refs so the slider's input handler can reach current values. Call controls.dispose() and renderer.dispose() in the cleanup function to release the WebGL context and drag listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why layering two transparent mesh clones with complementary opacity produces a smoother, more useful inspection tool than toggling a single material's wireframe boolean, and why sharing one geometry object between the two clones avoids duplicating the model's vertex data in memory. It's also useful for extending the demo — ask it to color wireframe edges by curvature or edge angle instead of a flat tint, add a numeric readout of vertex and edge count, or add a second slider that fades in the model's original textures only on the solid side. Use the conversation to build real intuition for layered-material geometry inspection before applying the same cross-fade technique to your own glTF asset review tooling.`,
      prompt: `Build a "GLB wireframe / solid toggle viewer" in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- A full-size Three.js scene with OrbitControls (damping enabled, bounded min/max zoom distance) so a visitor can drag to orbit the camera around a loaded 3D model at any time, studio-lit with key and fill lights plus a simple grounding disc.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL with clean, readable edge topology (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a primitive geometry.
- After the model loads, measure its bounding box and scale it to a fixed target height rather than a hardcoded scale number, reposition it to rest on the ground plane, and update its world matrices.
- Traverse the loaded model and, for every mesh, create two new mesh instances that both reference the exact same geometry object (do not clone or duplicate the geometry data itself) — one using a solid MeshStandardMaterial and one using a MeshBasicMaterial with wireframe set to true, both marked transparent. Copy each source node's fully-computed world matrix directly onto each new mesh's own matrix (with matrixAutoUpdate disabled) so both clones are positioned correctly without needing to reparent them into a hierarchy.
- Add a single range-input slider from 0 to 100. Its input handler must set every solid clone's opacity to (1 - value) and every wireframe clone's opacity to (value) in the same update, so the two are always complementary and the model is never fully invisible at any point along the slider — a continuous cross-fade, not a binary on/off toggle.
- Turn off OrbitControls' own wheel-zoom and instead implement zoom as an explicit opt-in gesture: a vertical range-input slider next to the canvas, plus Ctrl/Cmd + scroll wheel — a plain scroll must do nothing and pass through to the page normally.
- Handle the GLTFLoader's error callback by logging the real error and running a simple placeholder mesh through the exact same dual-material clone-building function used for the real model, so the cross-fade slider keeps working even if the model fails to load.`,
    },
  },
};

export default glbWireframeSolidToggle;
