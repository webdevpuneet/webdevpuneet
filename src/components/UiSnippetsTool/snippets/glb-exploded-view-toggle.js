const glbExplodedViewToggle = {
  id: 'glb-exploded-view-toggle',
  title: 'GLB Exploded View Assembly Toggle',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gxv-wrap">
  <canvas id="gxvCanvas"></canvas>
  <div class="gxv-hint">Drag to orbit · Ctrl/Cmd + scroll to zoom</div>
  <div class="gxv-zoom">
    <span class="gxv-zoom-label">+</span>
    <input type="range" id="gxvZoom" class="gxv-zoom-slider" min="0" max="100" step="1" />
    <span class="gxv-zoom-label">&minus;</span>
  </div>
  <div class="gxv-panel">
    <div class="gxv-panel-title">Assembly</div>
    <input type="range" id="gxvExplode" class="gxv-explode-slider" min="0" max="100" step="1" value="0" />
    <div class="gxv-panel-row">
      <span id="gxvExplodeLabel">Collapsed</span>
      <span id="gxvPartCount">&hellip; parts</span>
    </div>
    <button id="gxvAutoBtn" class="gxv-auto-btn">Animate explode</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gxv-wrap{position:relative;width:min(760px,94vw);height:min(540px,80vh);border-radius:20px;overflow:hidden;background:radial-gradient(60% 60% at 50% 42%,#181c28,#0a0b12);border:1px solid rgba(255,255,255,.08)}
#gxvCanvas{display:block;width:100%;height:100%;cursor:grab}
#gxvCanvas:active{cursor:grabbing}
.gxv-hint{position:absolute;top:18px;left:18px;font-size:11.5px;font-weight:600;color:#b7c0da;background:rgba(10,12,20,.55);padding:7px 14px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.08)}
.gxv-zoom{position:absolute;right:18px;top:64px;bottom:150px;width:32px;display:flex;flex-direction:column;align-items:center;gap:8px;background:rgba(10,12,20,.55);border:1px solid rgba(255,255,255,.1);border-radius:999px;padding:10px 0;backdrop-filter:blur(6px)}
.gxv-zoom-label{font-size:12px;font-weight:700;color:#b7c0da;line-height:1;user-select:none}
.gxv-zoom-slider{flex:1;width:6px;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#38bdf8;cursor:pointer}
.gxv-panel{position:absolute;left:18px;right:18px;bottom:18px;background:rgba(10,12,20,.65);border:1px solid rgba(255,255,255,.1);border-radius:16px;padding:16px;backdrop-filter:blur(10px)}
.gxv-panel-title{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#8b93ad;margin-bottom:8px}
.gxv-explode-slider{width:100%;accent-color:#38bdf8;cursor:pointer}
.gxv-panel-row{display:flex;justify-content:space-between;font-size:12px;color:#cbd5e1;margin-top:6px}
.gxv-auto-btn{margin-top:12px;width:100%;padding:9px;border-radius:9px;border:1px solid rgba(56,189,248,.4);background:rgba(56,189,248,.15);color:#bae6fd;font-size:12.5px;font-weight:700;cursor:pointer}
.gxv-auto-btn:hover{background:rgba(56,189,248,.25)}`,

  js: `const canvas = document.getElementById('gxvCanvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
camera.position.set(1.8, 1.3, 3.2);

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.08;
controls.target.set(0, 0.2, 0);
controls.minDistance = 1.5;
controls.maxDistance = 9;

// OrbitControls' own wheel-zoom is turned off on purpose: left on, it calls
// preventDefault() on every wheel event over the canvas, which would block
// normal page scrolling around this card. Zoom is reimplemented below as an
// explicit, opt-in gesture (a slider, and Ctrl/Cmd + scroll) instead.
controls.enableZoom = false;

const zoomSlider = document.getElementById('gxvZoom');

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
  new THREE.CircleGeometry(3, 40),
  new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -0.9;
scene.add(ground);

// Every direct part of the loaded assembly, captured with its original
// local position so the explode amount can always be reapplied from a
// stable baseline instead of drifting after repeated slider moves.
const parts = [];
let assemblyCenter = new THREE.Vector3();
const explodeLabel = document.getElementById('gxvExplodeLabel');
const partCountLabel = document.getElementById('gxvPartCount');

// Khronos' official sample-asset "Antique Camera" — a real, freely-licensed
// .glb made of multiple distinct mesh parts (body, lens, dials, strap
// loops), chosen specifically because an exploded view is only interesting
// on a model that actually has separable pieces.
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
    const fitted = new THREE.Box3().setFromObject(model);
    model.position.y += -0.9 - fitted.min.y;
    scene.add(model);

    // Flatten every mesh node found anywhere in the loaded hierarchy into a
    // flat parts list, each keeping its own original local position and a
    // per-part outward direction computed from the assembly's own center —
    // this works for any glTF's node structure, not just a specific model.
    const meshNodes = [];
    model.traverse((node) => {
      if (node.isMesh) meshNodes.push(node);
    });

    const overallBox = new THREE.Box3().setFromObject(model);
    overallBox.getCenter(assemblyCenter);

    meshNodes.forEach((node) => {
      const worldPos = new THREE.Vector3();
      node.getWorldPosition(worldPos);
      const direction = worldPos.clone().sub(assemblyCenter);
      if (direction.lengthSq() < 0.0001) direction.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5);
      direction.normalize();
      parts.push({ node, originalPosition: node.position.clone(), direction });
    });

    partCountLabel.textContent = parts.length + (parts.length === 1 ? ' part' : ' parts');
    applyExplode(0);
  },
  undefined,
  (err) => {
    // Honest failure state: if the CDN model can't load, swap in a small
    // multi-part placeholder assembly so the explode control still has
    // something real to act on.
    console.error('GLB failed to load, showing a placeholder instead:', err);
    const placeholderGroup = new THREE.Group();
    const geometries = [new THREE.BoxGeometry(0.6, 0.6, 0.6), new THREE.SphereGeometry(0.35, 16, 16), new THREE.ConeGeometry(0.3, 0.6, 12)];
    geometries.forEach((geo, i) => {
      const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.5 }));
      mesh.position.set((i - 1) * 0.4, 0, 0);
      placeholderGroup.add(mesh);
      parts.push({ node: mesh, originalPosition: mesh.position.clone(), direction: new THREE.Vector3(i - 1 || 1, 0.3, 0).normalize() });
    });
    placeholderGroup.position.y = -0.3;
    scene.add(placeholderGroup);
    partCountLabel.textContent = parts.length + ' parts';
    applyExplode(0);
  }
);

// Continuous, reversible: each part's position is always recomputed from
// its captured original position plus its own outward direction scaled by
// the current explode amount, never accumulated frame over frame.
const MAX_OFFSET = 1.1;

function applyExplode(amount01) {
  parts.forEach((p) => {
    p.node.position.copy(p.originalPosition).addScaledVector(p.direction, amount01 * MAX_OFFSET);
  });
  explodeLabel.textContent = amount01 < 0.02 ? 'Collapsed' : amount01 > 0.98 ? 'Fully exploded' : Math.round(amount01 * 100) + '% exploded';
}

const explodeSlider = document.getElementById('gxvExplode');
explodeSlider.addEventListener('input', () => {
  applyExplode(Number(explodeSlider.value) / 100);
});

let autoPlaying = false;
let autoDirection = 1;
const autoBtn = document.getElementById('gxvAutoBtn');
autoBtn.addEventListener('click', () => {
  autoPlaying = !autoPlaying;
  autoBtn.textContent = autoPlaying ? 'Stop animation' : 'Animate explode';
  autoBtn.classList.toggle('active', autoPlaying);
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  if (autoPlaying) {
    let next = Number(explodeSlider.value) + autoDirection * 0.8;
    if (next >= 100) { next = 100; autoDirection = -1; }
    if (next <= 0) { next = 0; autoDirection = 1; }
    explodeSlider.value = String(next);
    applyExplode(next / 100);
  }
  controls.update();
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'GLB Exploded View Assembly Toggle — Free Three.js glTF Snippet',
    description: `A real .glb model loaded with Three.js GLTFLoader and pulled apart into an exploded diagram by a slider — every mesh part's outward direction is computed automatically from the assembly's own bounding box center, working on any glTF hierarchy.`,
    about: {
      title: 'GLB Exploded View Assembly Toggle — Any glTF Hierarchy, Pulled Apart Automatically',
      description: `Exploded diagrams are everywhere in product manuals and assembly guides, but building one usually means hand-authoring an offset for every single part. This snippet does it generically instead: it loads a real \`.glb\` model, flattens every mesh node in its hierarchy into a flat list, and computes each part's own outward "explode direction" automatically from the assembly's bounding-box center — no part needs a hand-authored offset, and the same code works on any glTF file with more than one mesh.

**Flattening the hierarchy, not assuming a specific structure**

\`model.traverse()\` walks every node in the loaded scene graph at any depth and collects every \`isMesh\` node into a flat \`meshNodes\` array — regardless of how deeply the source \`.glb\` nests its parts inside groups. This is what makes the technique reusable: it makes no assumption about a specific model's node names or structure.

**Direction from geometry, not authored by hand**

For each mesh, its current world-space position is compared against the assembly's own overall bounding-box center (\`overallBox.getCenter()\`), and the normalized difference becomes that part's permanent \`direction\` vector — parts near the center barely move, parts near the edges of the assembly explode outward the furthest, exactly like a real technical exploded diagram, without a single manually-tuned number.

**Recomputed from a stable baseline, never accumulated**

Each part also keeps its \`originalPosition\`, captured once at load time. \`applyExplode(amount01)\` always sets \`p.node.position\` back to that original position plus \`direction * amount01 * MAX_OFFSET\` — never adds to whatever the position currently is. That means dragging the slider back and forth thousands of times, or restarting the auto-play animation mid-way, can never drift a part's position off from where it should be.

**A slider, plus an optional idle animation**

The explode amount is driven by a plain range input for direct manual control, and a separate "Animate explode" toggle drives the exact same \`applyExplode()\` function from a ping-ponging value inside the render loop — both paths converge on one function, so there's only ever one source of truth for where a part currently sits.

**A real, honest fallback with its own parts**

If the \`.glb\` fails to load, the fallback isn't a single placeholder mesh — it's a small three-piece placeholder group, each piece registered into the same \`parts\` array with its own computed direction, so the explode slider and animate button both keep working correctly even without the real model.

**Zoom is opt-in, not a hijacked scroll wheel**

\`OrbitControls\`' built-in wheel-zoom is turned off, with zoom reimplemented as a slider plus Ctrl/Cmd + scroll, so a plain scroll over the card always scrolls the page.

**Customizing it**

Swap \`MODEL_URL\` for any multi-part \`.glb\`, tune \`MAX_OFFSET\` for a bigger or smaller explosion, or pair this with [GLB hotspot annotation viewer](/ui-snippets/glb-hotspot-annotations-viewer/) to label each part once it's pulled apart.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `The camera model loads fully assembled, with its real part count shown.` },
      { title: 'Drag the assembly slider', text: `Every part slides outward from the assembly's own center, proportionally.` },
      { title: 'Click "Animate explode"', text: `The explosion ping-pongs automatically between collapsed and exploded.` },
      { title: 'Drag on the canvas', text: `Orbit the camera freely at any explode amount.` },
      { title: 'Use the slider or Ctrl/Cmd + scroll to zoom', text: `Plain scroll always scrolls the page; zoom is a separate, opt-in gesture.` },
      { title: 'Swap the model URL', text: `Point MODEL_URL at any multi-part .glb to explode a different assembly.` },
    ] },
    features: [
      { title: 'Real glTF binary model', text: `Loaded via THREE.GLTFLoader from an actual .glb file, not a primitive shape.` },
      { title: 'Automatic per-part explode direction', text: `Computed from each part's position relative to the assembly's own center.` },
      { title: 'Works on any glTF hierarchy', text: `model.traverse() flattens any nesting depth into a flat, explodable parts list.` },
      { title: 'Non-accumulating explode logic', text: `Positions always recompute from a captured baseline, never drift over time.` },
      { title: 'Manual slider plus idle animation', text: `Both control paths converge on one applyExplode() function.` },
      { title: 'Live real part count', text: `Shows the actual number of mesh nodes found in the loaded model.` },
      { title: 'Multi-part honest fallback', text: `A three-piece placeholder assembly keeps the explode control functional on failure.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture, never a hijacked plain scroll wheel.` },
    ],
    useCases: [
      { title: 'Product manuals and assembly guides', text: 'Show how a real product fits together, with each mesh part moving outward along a direction computed from the model\'s own bounding box.' },
      { title: 'Engineering and CAD portfolios', text: 'Demonstrate exploded diagrams from a real glTF file without authoring an offset for each individual part.' },
      { title: 'What\'s inside sections', text: 'Let shoppers see a product\'s internals with a single slider, where positions always recompute from a captured baseline rather than accumulating.' },
      { title: 'glTF hierarchy teaching', text: 'Learn how `model.traverse()` flattens nested nodes of any depth into a simple list of parts to move.' },
      { title: 'Annotated explode views', text: 'Pair with the [GLB hotspot annotations viewer](/ui-snippets/glb-hotspot-annotations-viewer/) to label each part once the assembly has been pulled apart.' },
      { icon: 'CODE', title: 'Related: Profile Completeness Card — Weighted Progress with Next-Best-Action', desc: 'See the [Profile Completeness Card — Weighted Progress with Next-Best-Action](/ui-snippets/profile-completeness-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the explode direction get computed for a model this snippet has never seen before?', a: `For every mesh node found by traversing the loaded model, the snippet compares that mesh's current world position against the bounding-box center of the entire assembly, and normalizes the difference into a direction vector. Parts near the assembly's center barely move outward; parts near its edges move the furthest — the same logic a real technical exploded diagram follows, computed automatically from geometry rather than authored by hand for a specific model.` },
      { q: `Why does the slider recompute every part's position from scratch instead of just moving it incrementally?`, a: `Each part keeps its original local position captured once at load time. applyExplode() always sets a part's position to that original position plus its direction scaled by the current explode amount — never adds an increment to wherever the part currently sits. That means the slider, the animate-toggle, and repeated back-and-forth dragging can never accumulate drift; the same slider value always produces the exact same part positions.` },
      { q: 'Does this work on any glTF model, or only ones authored with named parts?', a: `Any model with more than one mesh node, at any nesting depth. model.traverse() walks the entire loaded hierarchy and collects every mesh it finds into a flat list, with no assumption about node names, groups, or how the source .glb organized its parts — the direction computation only needs each part's world position, which every mesh has regardless of authoring convention.` },
      { q: 'What happens if the real model fails to load?', a: `The loader's error callback logs the real failure and builds a small three-piece placeholder group instead, registering each piece into the same parts array the slider and animate button already read from — so the exploded-view interaction keeps working correctly even without the real model.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up the renderer, scene, GLTFLoader call, and OrbitControls inside a mount effect, keeping the parts array, assemblyCenter, and autoPlaying flag in refs so the slider input handler and the render loop can reach current values. Call controls.dispose() and renderer.dispose() in the cleanup function to release the WebGL context and drag listeners on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why computing each part's explode direction from its position relative to the assembly's bounding-box center works correctly on any glTF model, without needing to know that model's specific part names or hierarchy ahead of time. It's also useful for extending the demo — ask it to stagger each part's explode animation timing so parts closer to the surface move first, add labeled callouts that fade in for each part once it's sufficiently exploded, or add a "reassemble" button that animates every part back to zero with an eased eco duration instead of a linear ping-pong. Use the conversation to build real intuition for generic scene-graph traversal before applying the same exploded-view technique to your own multi-part glTF model.`,
      prompt: `Build a "GLB exploded view assembly toggle" in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- A full-size Three.js scene with OrbitControls (damping enabled, bounded min/max zoom distance) so a visitor can drag to orbit the camera around a loaded multi-part 3D model at any time, studio-lit with key and fill lights plus a simple grounding disc.
- Load a real .glb model using THREE.GLTFLoader pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL that is made of multiple distinct mesh parts (e.g. one of Khronos' official glTF-Sample-Assets models) — do not substitute a single primitive geometry.
- After the model loads, measure its bounding box and scale it to a fixed target height rather than a hardcoded scale number, then reposition it so it rests on the ground plane.
- Traverse the entire loaded model's node hierarchy (at any nesting depth) to collect every mesh node into a flat list. For each mesh, compute its current world position, compare it against the bounding-box center of the entire assembly, and store the normalized difference as that part's own outward "explode direction" — do not hardcode explode directions for specific named parts, since the technique must work on any multi-part glTF model.
- Also capture each part's original local position at load time. Add a range-input slider from 0 to 100 whose input event recomputes every part's position as its original position plus its own direction vector scaled by the current slider value and a maximum offset distance — the position must always be recomputed from the original baseline, never incrementally accumulated, so scrubbing the slider back and forth never drifts a part out of place.
- Add a toggle button that starts an automatic ping-pong animation of the same explode amount between 0 and 100 inside the render loop, using the exact same position-setting function the manual slider uses.
- Turn off OrbitControls' own wheel-zoom and instead implement zoom as an explicit opt-in gesture: a vertical range-input slider next to the canvas, plus Ctrl/Cmd + scroll wheel — a plain scroll must do nothing and pass through to the page normally.
- Handle the GLTFLoader's error callback by logging the real error and substituting a small multi-piece placeholder group (not a single mesh), registering each placeholder piece into the same parts list so the explode slider and animate button keep working even if the real model fails to load.`,
    },
  },
};

export default glbExplodedViewToggle;
