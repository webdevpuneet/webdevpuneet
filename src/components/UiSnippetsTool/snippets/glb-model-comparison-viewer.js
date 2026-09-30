const glbModelComparisonViewer = {
  id: 'glb-model-comparison-viewer',
  title: 'GLB Side-by-Side Model Comparison',
  lastmod: '2026-08-24',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js',
    'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js',
  ],
  html: `<div class="gmc-wrap">
  <div class="gmc-toolbar">
    <label class="gmc-sync"><input type="checkbox" id="gmcSync" checked /> Sync orbit</label>
    <div class="gmc-hint">Drag either pane to orbit · Ctrl/Cmd + scroll to zoom</div>
  </div>
  <div class="gmc-panes">
    <div class="gmc-pane">
      <canvas id="gmcCanvasA"></canvas>
      <div class="gmc-label">Duck <span id="gmcTrisA">&middot; &hellip; tris</span></div>
      <div class="gmc-zoom">
        <input type="range" id="gmcZoomA" class="gmc-zoom-slider" min="0" max="100" step="1" />
      </div>
    </div>
    <div class="gmc-divider"></div>
    <div class="gmc-pane">
      <canvas id="gmcCanvasB"></canvas>
      <div class="gmc-label">Antique Camera <span id="gmcTrisB">&middot; &hellip; tris</span></div>
      <div class="gmc-zoom">
        <input type="range" id="gmcZoomB" class="gmc-zoom-slider" min="0" max="100" step="1" />
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;min-height:100vh;display:flex;align-items:center;justify-content:center;background:#0a0b12;color:#fff;padding:24px}
.gmc-wrap{width:min(940px,96vw)}
.gmc-toolbar{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;margin-bottom:10px}
.gmc-sync{display:flex;align-items:center;gap:7px;font-size:12.5px;font-weight:600;color:#cbd5e1;cursor:pointer;user-select:none}
.gmc-sync input{accent-color:#818cf8;width:15px;height:15px;cursor:pointer}
.gmc-hint{font-size:11.5px;color:#8b93ad}
.gmc-panes{display:grid;grid-template-columns:1fr auto 1fr;gap:0;border-radius:18px;overflow:hidden;border:1px solid rgba(255,255,255,.08)}
.gmc-divider{width:1px;background:rgba(255,255,255,.1)}
.gmc-pane{position:relative;height:380px;background:radial-gradient(60% 60% at 50% 42%,#181c28,#0a0b12)}
.gmc-pane canvas{display:block;width:100%;height:100%;cursor:grab}
.gmc-pane canvas:active{cursor:grabbing}
.gmc-label{position:absolute;top:14px;left:14px;font-size:12.5px;font-weight:700;color:#fff;background:rgba(10,12,20,.6);padding:6px 12px;border-radius:999px;backdrop-filter:blur(6px);border:1px solid rgba(255,255,255,.1)}
.gmc-label span{font-weight:500;color:#9aa0b8}
.gmc-zoom{position:absolute;right:12px;bottom:12px;top:12px;width:24px;display:flex;align-items:center}
.gmc-zoom-slider{width:100%;-webkit-appearance:slider-vertical;writing-mode:vertical-lr;direction:rtl;accent-color:#818cf8;cursor:pointer}
@media (max-width:700px){.gmc-panes{grid-template-columns:1fr}.gmc-divider{width:100%;height:1px}}`,

  js: `const renderer = { A: null, B: null };
const scene = { A: new THREE.Scene(), B: new THREE.Scene() };
const camera = {
  A: new THREE.PerspectiveCamera(42, 1, 0.1, 50),
  B: new THREE.PerspectiveCamera(42, 1, 0.1, 50),
};
const controls = {};
const canvasEl = {
  A: document.getElementById('gmcCanvasA'),
  B: document.getElementById('gmcCanvasB'),
};
const trisLabel = { A: document.getElementById('gmcTrisA'), B: document.getElementById('gmcTrisB') };
const zoomSlider = { A: document.getElementById('gmcZoomA'), B: document.getElementById('gmcZoomB') };
const syncBox = document.getElementById('gmcSync');

const MIN_DIST = 1.6;
const MAX_DIST = 8;

['A', 'B'].forEach((key) => {
  renderer[key] = new THREE.WebGLRenderer({ canvas: canvasEl[key], antialias: true, alpha: true });
  renderer[key].setPixelRatio(Math.min(window.devicePixelRatio, 2));
  camera[key].position.set(1.4, 1.0, 3.0);

  const c = new THREE.OrbitControls(camera[key], canvasEl[key]);
  c.enableDamping = true;
  c.dampingFactor = 0.08;
  c.target.set(0, 0.2, 0);
  c.minDistance = MIN_DIST;
  c.maxDistance = MAX_DIST;
  // OrbitControls' own wheel-zoom is turned off on purpose: left on, it
  // calls preventDefault() on every wheel event over the canvas, which
  // would block normal page scrolling around this card. Zoom is
  // reimplemented below as an explicit, opt-in gesture instead.
  c.enableZoom = false;
  controls[key] = c;

  scene[key].add(new THREE.AmbientLight(0x445066, 0.7));
  const key1 = new THREE.DirectionalLight(0xffffff, 1.7);
  key1.position.set(4, 6, 5);
  scene[key].add(key1);
  const fill = new THREE.DirectionalLight(0x93c5fd, 0.5);
  fill.position.set(-5, 2, 3);
  scene[key].add(fill);

  const ground = new THREE.Mesh(
    new THREE.CircleGeometry(3, 40),
    new THREE.MeshStandardMaterial({ color: 0x14161f, roughness: 1 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -0.85;
  scene[key].add(ground);
});

function setZoomDistance(key, distance) {
  const c = controls[key];
  const clamped = THREE.MathUtils.clamp(distance, c.minDistance, c.maxDistance);
  const offset = camera[key].position.clone().sub(c.target);
  offset.setLength(clamped || 0.001);
  camera[key].position.copy(c.target).add(offset);
  const t = (clamped - c.minDistance) / (c.maxDistance - c.minDistance);
  zoomSlider[key].value = String(Math.round((1 - t) * 100));
}

['A', 'B'].forEach((key) => {
  setZoomDistance(key, camera[key].position.distanceTo(controls[key].target));
  zoomSlider[key].addEventListener('input', () => {
    const t = 1 - Number(zoomSlider[key].value) / 100;
    setZoomDistance(key, controls[key].minDistance + t * (controls[key].maxDistance - controls[key].minDistance));
  });
  canvasEl[key].addEventListener('wheel', (e) => {
    if (!e.ctrlKey && !e.metaKey) return; // plain scroll always passes through to the page
    e.preventDefault();
    const current = camera[key].position.distanceTo(controls[key].target);
    setZoomDistance(key, current + e.deltaY * 0.01);
  }, { passive: false });
});

// When "Sync orbit" is checked, dragging either pane mirrors its azimuthal
// and polar angle onto the other pane's controls every frame, so both
// models can be inspected from the same relative viewpoint at once.
function mirrorOrbit(from, to) {
  if (!syncBox.checked) return;
  const cf = controls[from], ct = controls[to];
  const spherical = new THREE.Spherical().setFromVector3(camera[from].position.clone().sub(cf.target));
  const targetSpherical = new THREE.Spherical(
    camera[to].position.distanceTo(ct.target),
    spherical.phi,
    spherical.theta
  );
  const offset = new THREE.Vector3().setFromSpherical(targetSpherical);
  camera[to].position.copy(ct.target).add(offset);
}

controls.A.addEventListener('change', () => mirrorOrbit('A', 'B'));
controls.B.addEventListener('change', () => mirrorOrbit('B', 'A'));

function loadModel(key, url, targetHeight, placeholderGeometry, placeholderColor) {
  const loader = new THREE.GLTFLoader();
  loader.load(
    url,
    (gltf) => {
      const model = gltf.scene;
      // Auto-fit rather than a hardcoded scale factor: different .glb
      // exports (and loader versions) can decode the same source asset at
      // wildly different raw sizes, so measuring the loaded geometry and
      // scaling it to a known target height is far more reliable than
      // guessing a magic number ahead of time.
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z) || 1;
      model.scale.setScalar(targetHeight / maxDim);
      const fitted = new THREE.Box3().setFromObject(model);
      model.position.y += -0.85 - fitted.min.y;
      scene[key].add(model);

      let triCount = 0;
      model.traverse((node) => {
        if (node.isMesh && node.geometry) {
          const geo = node.geometry;
          triCount += geo.index ? geo.index.count / 3 : geo.attributes.position.count / 3;
        }
      });
      trisLabel[key].textContent = '\\u00b7 ' + Math.round(triCount).toLocaleString() + ' tris';
    },
    undefined,
    (err) => {
      // Honest failure state: if the CDN model can't load, swap in a simple
      // placeholder so the pane is never just an empty void.
      console.error('GLB failed to load for pane ' + key + ', showing a placeholder instead:', err);
      const placeholder = new THREE.Mesh(
        placeholderGeometry,
        new THREE.MeshStandardMaterial({ color: placeholderColor, roughness: 0.5 })
      );
      placeholder.position.y = -0.2;
      scene[key].add(placeholder);
      trisLabel[key].textContent = '\\u00b7 load failed';
    }
  );
}

// Two real, freely-licensed sample .glb files from Khronos' official glTF
// sample-asset repository, compared side by side in independent scenes.
loadModel('A', 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/Duck/glTF-Binary/Duck.glb', 1.6, new THREE.SphereGeometry(0.8, 24, 24), 0xfacc15);
loadModel('B', 'https://cdn.jsdelivr.net/gh/KhronosGroup/glTF-Sample-Assets@main/Models/AntiqueCamera/glTF-Binary/AntiqueCamera.glb', 1.6, new THREE.BoxGeometry(1, 1, 1), 0xa78bfa);

function resize(key) {
  const w = canvasEl[key].clientWidth, h = canvasEl[key].clientHeight;
  renderer[key].setSize(w, h, false);
  camera[key].aspect = w / h;
  camera[key].updateProjectionMatrix();
}

function animate() {
  requestAnimationFrame(animate);
  controls.A.update();
  controls.B.update();
  renderer.A.render(scene.A, camera.A);
  renderer.B.render(scene.B, camera.B);
}

function resizeAll() {
  resize('A');
  resize('B');
}

resizeAll();
window.addEventListener('resize', resizeAll);
animate();`,

  seo: {
    title: 'GLB Side-by-Side Model Comparison — Free Dual-Viewport Three.js glTF Snippet',
    description: `Two real .glb models loaded with Three.js GLTFLoader side by side in independent scenes, each with its own OrbitControls camera, plus an optional synced-orbit mode that mirrors one pane's viewing angle onto the other for direct visual comparison.`,
    about: {
      title: 'GLB Side-by-Side Model Comparison — Two Independent Viewports, One Optional Sync',
      description: `Comparing two 3D models properly means more than putting two screenshots next to each other — it means being able to inspect both from the same angle, live, while still being able to break away and look at either one independently. This snippet runs two entirely separate Three.js scenes, cameras, and \`OrbitControls\` instances side by side, and adds a "Sync orbit" toggle that mirrors one pane's camera angle onto the other whenever it's checked.

**Two full scenes, not one shared one**

Every piece of Three.js state — \`scene\`, \`camera\`, \`renderer\`, and \`OrbitControls\` — is built twice, once per key (\`'A'\` and \`'B'\`), and stored in small lookup objects rather than duplicated as separate top-level variables. Each pane's \`GLTFLoader.load()\` call, resize handler, and render call are entirely independent, so a slow or failing load in one pane never affects the other.

**Mirroring spherical coordinates, not raw camera positions**

When "Sync orbit" is checked, dragging pane A fires \`OrbitControls\`' \`'change'\` event, which calls \`mirrorOrbit('A', 'B')\`. Rather than copying A's camera position directly onto B (which would ignore that the two models sit at different distances from their own cameras), the snippet converts A's camera offset from its target into a \`THREE.Spherical\` — an azimuthal angle, polar angle, and radius — then rebuilds B's camera offset using A's *angles* but B's own existing *radius*. The result: both panes always show the same relative viewing angle, even while each keeps its own independent zoom level.

**Auto-fit scale for both models independently**

Each call to \`loadModel()\` measures its own model's bounding box with \`THREE.Box3\` and scales it to the same fixed target height, so two models of very different native sizes and origins in their source \`.glb\` files still compare fairly, side by side, at a consistent visual scale.

**A live triangle count per model**

After each model loads, the snippet walks every mesh in its scene graph and sums up triangle counts from either the geometry's index buffer or its raw vertex count, displaying the total next to that pane's label — a genuinely useful, real number for anyone comparing model complexity, not a decorative placeholder.

**Independent, honest fallbacks**

If either \`.glb\` fails to load, that pane's error callback logs which pane failed and swaps in its own distinct placeholder shape and color, so a single broken URL never blanks out the whole comparison.

**Zoom is opt-in, not a hijacked scroll wheel**

Both panes turn off \`OrbitControls\`' built-in wheel-zoom and reimplement it as an explicit slider plus Ctrl/Cmd + scroll, exactly like every other snippet in this family, so a plain scroll over either pane always scrolls the page.

**Customizing it**

Swap either \`MODEL_URL\` for any other Khronos sample-asset \`.glb\`, add a third pane by extending the \`'A'\`/\`'B'\` keys to \`'C'\`, or pair it with [GLB product color configurator](/ui-snippets/glb-configurator-color-swatches/) for a compare-then-customize flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add all three CDN scripts', text: `three.min.js, GLTFLoader.js, and OrbitControls.js.` },
      { title: 'Paste HTML, CSS, and JS', text: `Two models load side by side, each with its own triangle count.` },
      { title: 'Drag either pane', text: `With "Sync orbit" checked, the other pane mirrors the same viewing angle.` },
      { title: 'Uncheck "Sync orbit"', text: `Each pane orbits fully independently.` },
      { title: 'Use either slider or Ctrl/Cmd + scroll', text: `Zoom each pane independently at any time — plain scroll always scrolls the page.` },
      { title: 'Swap the model URLs', text: `Point either loadModel() call at a different .glb to compare other models.` },
    ] },
    features: [
      { title: 'Two real glTF binary models', text: `Loaded via THREE.GLTFLoader into fully independent scenes, side by side.` },
      { title: 'Synced-orbit toggle', text: `Mirrors one pane's spherical viewing angle onto the other, independent of zoom.` },
      { title: 'Independent zoom per pane', text: `Each pane keeps its own zoom level even while orbit angle stays synced.` },
      { title: 'Live triangle counts', text: `A real per-model tri count computed from the loaded geometry after load.` },
      { title: 'Auto-fit model scale', text: `Both models are scaled to the same target height via bounding-box measurement.` },
      { title: 'Independent honest fallbacks', text: `Each pane logs its own load failure and shows a distinct placeholder shape.` },
      { title: 'Slider + Ctrl/Cmd-scroll zoom', text: `Zoom is an explicit, opt-in gesture on both panes, never a hijacked scroll wheel.` },
      { title: 'Fully responsive layout', text: `Panes stack vertically on narrow viewports instead of squeezing side by side.` },
    ],
    useCases: [
      { title: 'Product variant comparisons', text: `Show two SKUs, materials, or design revisions side by side at the same angle.` },
      { title: '3D asset review and QA', text: `Compare a new export against a reference model, including triangle count.` },
      { title: 'Game asset and portfolio pages', text: `Demonstrate two models under identical lighting and controls for a fair look.` },
      { title: 'glTF/OrbitControls teaching demos', text: `A complete, real example of running multiple independent Three.js scenes at once.` },
      { title: 'Museum/collectible side-by-side exhibits', text: `Compare two artifacts or eras of a design from the same viewpoint.` },
      { title: 'Alongside other GLB viewers', text: `Pair with [GLB product color configurator](/ui-snippets/glb-configurator-color-swatches/) for a compare-then-customize flow.` },
      { icon: 'CODE', title: 'Related: Rental Car Comparison Cards', desc: 'See the [Rental Car Comparison Cards](/ui-snippets/rental-car-comparison-card/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the "Sync orbit" toggle mirror one pane onto the other without also forcing the same zoom level?', a: `It converts the dragged pane's camera offset from its target into spherical coordinates (an azimuthal angle, a polar angle, and a radius), then rebuilds the other pane's camera offset using the dragged pane's two angles but that other pane's own existing radius. Angle and distance are kept as separate values on purpose, so both panes always face the same direction while each still remembers its own independent zoom.` },
      { q: 'Are these two genuinely separate Three.js scenes, or one scene rendered twice?', a: `Two fully separate scenes, cameras, renderers, and OrbitControls instances, each keyed by 'A' or 'B' in small lookup objects. Nothing is shared between them except the mirroring logic that runs only when Sync orbit is checked — a slow load, a failed model, or independent dragging in one pane never touches the other.` },
      { q: 'How is the triangle count calculated?', a: `After each model loads, the snippet walks every mesh in its scene graph. For each mesh's geometry, it uses the index buffer's vertex count divided by three if the geometry is indexed, or the raw position attribute's vertex count divided by three otherwise, then sums that across every mesh in the model.` },
      { q: 'What happens if one of the two models fails to load?', a: `Each pane has its own independent GLTFLoader error callback. If pane B's model fails, its callback logs specifically which pane failed and swaps in its own placeholder shape and label text, while pane A continues to load and render completely normally, so one broken URL never blanks out the whole comparison.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Set up both renderers, scenes, GLTFLoader calls, and OrbitControls instances inside a mount effect, keeping the per-key lookup objects and the syncBox checkbox state in refs so the change-event mirroring logic can reach current values. Call both controls' .dispose() and both renderers' .dispose() in the cleanup function to release both WebGL contexts on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why mirroring spherical coordinates (angle only, not radius) is the correct way to sync two independently-zoomed camera views, and why running two fully separate Three.js scenes side by side is more robust than trying to share one scene between two viewports. It's also useful for extending the demo — ask it to add a third comparison pane, add a synced "auto-rotate both" toggle, or add a text diff panel showing each model's triangle count, file size, or material count side by side. Use the conversation to build real intuition for coordinating multiple independent Three.js instances before applying the same pattern to your own multi-model comparison tool.`,
      prompt: `Build a "side-by-side 3D model comparison" viewer in plain HTML, CSS, and JavaScript using Three.js (core, GLTFLoader, and OrbitControls, all loaded from a CDN with no bundler).

Requirements:
- Two side-by-side panes, each with its own independent WebGLRenderer, Scene, PerspectiveCamera, and OrbitControls instance (with damping enabled and a bounded min/max zoom distance) — the two panes must be fully independent Three.js instances, not one shared scene rendered twice.
- Load a different real .glb model into each pane using THREE.GLTFLoader, each pointed at a genuine, freely-licensed, CDN-hosted glTF binary URL (e.g. two different Khronos glTF-Sample-Assets models) — do not substitute primitive geometry for either model.
- After each model loads, measure its bounding box and scale it to the same fixed target height (rather than a hardcoded scale number) so both models compare fairly at a consistent visual size, and reposition each so it rests on its own ground plane.
- Add a "Sync orbit" checkbox. When checked, dragging either pane's camera must mirror that pane's viewing angle (azimuthal and polar angle only, converted via spherical coordinates) onto the other pane's camera, while preserving each pane's own independently-set zoom distance — do not simply copy one camera's raw position onto the other, since the two models may sit at different distances from their cameras.
- Compute and display a live triangle count for each loaded model, calculated by walking every mesh in its scene graph and summing triangle counts from either the indexed geometry's index count or the raw vertex count.
- Turn off OrbitControls' own wheel-zoom on both panes and instead implement zoom as an explicit opt-in gesture per pane: a vertical range-input slider, plus Ctrl/Cmd + scroll wheel — a plain scroll over either pane must do nothing and pass through to the page normally.
- Handle each pane's GLTFLoader error callback independently by logging which pane failed and substituting a distinct placeholder mesh in that pane only, so a single broken model URL never blanks out the other pane.`,
    },
  },
};

export default glbModelComparisonViewer;
