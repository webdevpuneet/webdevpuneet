const threeScrollHologramScan = {
  id: 'three-scroll-hologram-scan',
  title: 'Three.js Scroll Hologram Scan Reveal',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="hgs-stage" id="hgsStage">
  <div class="hgs-intro"><p>Scroll ↓ to run the scan</p></div>
  <canvas id="hgsCanvas"></canvas>
  <div class="hgs-hud">SCAN <span id="hgsPct">0</span>%</div>
</section>
<section class="hgs-bottom"><p>Render complete.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#020609;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.hgs-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#4d7a8f;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.hgs-stage{height:100vh;position:relative;overflow:hidden;background:#020609}
.hgs-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#4d7a8f;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#hgsCanvas{display:block;width:100%;height:100%}
.hgs-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#22d3ee;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('hgsCanvas');
const pctEl = document.getElementById('hgsPct');
const introEl = document.querySelector('.hgs-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// Clipping planes are opt-in — without this flag material.clippingPlanes
// is silently ignored.
renderer.localClippingEnabled = true;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x020609);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);

scene.add(new THREE.AmbientLight(0x66e0ff, 0.5));
const key = new THREE.PointLight(0x22d3ee, 1.1, 80);
key.position.set(8, 12, 10);
scene.add(key);

// Pedestal emitter.
const pedestal = new THREE.Mesh(
  new THREE.CylinderGeometry(6.5, 7.5, 1.2, 48),
  new THREE.MeshStandardMaterial({ color: 0x0b1620, roughness: 0.35, metalness: 0.8 })
);
pedestal.position.y = -6.6;
scene.add(pedestal);
const emitterRing = new THREE.Mesh(
  new THREE.TorusGeometry(5.6, 0.12, 12, 64),
  new THREE.MeshBasicMaterial({ color: 0x22d3ee })
);
emitterRing.rotation.x = Math.PI / 2;
emitterRing.position.y = -5.95;
scene.add(emitterRing);

// The scanned subject: a torus-knot "artifact". Two clipped copies — a
// solid holographic fill and a wireframe overlay — plus an unclipped faint
// ghost so the unscanned region reads as "detected but not rendered".
const SCAN_MIN = -6, SCAN_MAX = 6.5;
// One shared plane: everything below plane.constant is visible.
const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), SCAN_MIN);
const knotGeo = new THREE.TorusKnotGeometry(3.2, 1.05, 220, 36);

const holoFill = new THREE.Mesh(knotGeo, new THREE.MeshPhongMaterial({
  color: 0x0e7490, emissive: 0x0891b2, emissiveIntensity: 0.55,
  transparent: true, opacity: 0.5, side: THREE.DoubleSide,
  clippingPlanes: [clipPlane],
}));
scene.add(holoFill);

const holoWire = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({
  color: 0x67e8f9, wireframe: true, transparent: true, opacity: 0.55,
  clippingPlanes: [clipPlane],
}));
scene.add(holoWire);

const ghost = new THREE.Mesh(knotGeo, new THREE.MeshBasicMaterial({
  color: 0x155e75, wireframe: true, transparent: true, opacity: 0.06,
}));
scene.add(ghost);

// The visible scan line: a thin glowing disc that rides at clip height.
const scanDisc = new THREE.Mesh(
  new THREE.CylinderGeometry(5.4, 5.4, 0.06, 64, 1, true),
  new THREE.MeshBasicMaterial({ color: 0x7df9ff, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
);
scene.add(scanDisc);

// Rising sparkle motes inside the scan column.
const MOTES = 260;
const moteGeo = new THREE.BufferGeometry();
const motePos = new Float32Array(MOTES * 3);
for (let i = 0; i < MOTES; i++) {
  const a = Math.random() * Math.PI * 2, r = Math.random() * 5;
  motePos[i * 3] = Math.cos(a) * r;
  motePos[i * 3 + 1] = SCAN_MIN + Math.random() * (SCAN_MAX - SCAN_MIN);
  motePos[i * 3 + 2] = Math.sin(a) * r;
}
moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
  color: 0x9ff3ff, size: 0.12, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(motes);

gsap.registerPlugin(ScrollTrigger);
const scan = { h: SCAN_MIN };
gsap.to(scan, {
  h: SCAN_MAX,
  ease: 'none',
  scrollTrigger: { trigger: '#hgsStage', start: 'top top', end: '+=350%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const h = scan.h;
  const prog = (h - SCAN_MIN) / (SCAN_MAX - SCAN_MIN);
  if (introEl) introEl.style.opacity = prog > 0.02 ? '0' : '1';

  // Plane normal (0,-1,0): a point is kept when -y + constant >= 0, i.e.
  // y <= constant — so constant IS the scan height.
  clipPlane.constant = h;
  scanDisc.position.y = h;
  scanDisc.material.opacity = (prog > 0.005 && prog < 0.995) ? 0.55 + Math.sin(t * 9) * 0.15 : 0;

  // The artifact slowly rotates like a museum hologram; the ghost and
  // clipped copies share the rotation so the clip stays coherent.
  const ry = t * 0.35, rx = Math.sin(t * 0.2) * 0.15;
  [holoFill, holoWire, ghost].forEach((m) => { m.rotation.y = ry; m.rotation.x = rx; });

  // Flicker: brief emissive dips make the projection feel electrical.
  const flick = Math.sin(t * 23) * Math.sin(t * 7.3) > 0.93 ? 0.3 : 1;
  holoFill.material.opacity = 0.5 * flick;
  holoWire.material.opacity = 0.55 * flick;
  emitterRing.material.color.setHSL(0.52, 0.9, 0.45 + Math.sin(t * 4) * 0.1 + prog * 0.15);

  const mp = motes.geometry.attributes.position;
  for (let i = 0; i < MOTES; i++) {
    let y = mp.array[i * 3 + 1] + 0.025;
    if (y > SCAN_MAX) y = SCAN_MIN;
    mp.array[i * 3 + 1] = y;
  }
  mp.needsUpdate = true;
  motes.material.opacity = 0.25 + prog * 0.55;

  const ang = 0.5 + t * 0.1 + prog * 0.9;
  camera.position.set(Math.sin(ang) * 22, 2 + prog * 4, Math.cos(ang) * 22);
  camera.lookAt(0, 0, 0);

  pctEl.textContent = Math.round(prog * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Hologram Scan — Clipping Plane Reveal',
    description: 'Scroll rides a glowing scan line up a torus-knot hologram using a real THREE.Plane clip, with flicker and sparkle motes. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Hologram Scan With Three.js Clipping Planes and GSAP',
      description: `The **Three.js Scroll Hologram Scan Reveal** snippet materializes a rotating torus-knot "artifact" above a pedestal emitter, sliced open by a glowing scan line that rides upward with scroll — and unlike most scan effects, the slice is real: a \`THREE.Plane\` clipping plane whose constant GSAP's ScrollTrigger scrubs directly, so geometry below the line renders and geometry above it is mathematically cut away by the GPU.

**Real clipping, not opacity tricks**

Most "scan reveal" effects fade a whole object in, or mask it in 2D. This snippet enables \`renderer.localClippingEnabled = true\` (clipping is silently ignored without the flag — the classic gotcha) and assigns \`clippingPlanes: [clipPlane]\` to the hologram materials. The plane's normal is (0, −1, 0), which makes a fragment survive when \`y ≤ constant\` — meaning the plane's \`constant\` literally *is* the scan height, and the GSAP tween scrubs that constant from below the knot to above it. The cut edge is razor-sharp and follows every fold of the torus knot's surface, something no fade or mask can do.

**Three copies of one geometry**

The artifact is one \`TorusKnotGeometry\` rendered three times: a clipped translucent Phong fill with cyan emissive (the "light volume" of the hologram), a clipped brighter wireframe overlay (the structural lines that read as projection), and an unclipped 6%-opacity ghost wireframe. The ghost is the storytelling layer — above the scan line you faintly see what is *detected but not yet rendered*, giving the reveal a destination. All three share the same rotation values each frame, so the clip boundary stays coherent across copies while the artifact turns like a museum piece.

**A scan line you can see**

Clipping alone leaves a hollow cross-section but no visible beam. An open-ended, thin cylinder (\`CylinderGeometry\` with \`openEnded: true\`) rides at exactly the clip height, pulsing opacity on a 9 Hz sine — the visible manifestation of the invisible plane. It hides itself at the extreme ends of the range so no stray ring floats before the scan starts or after it completes. Rising additive-blended sparkle motes recycle through the scan column (the wrap-don't-respawn pattern from the [ocean dive](/ui-snippets/three-scroll-ocean-dive/) bubbles), brightening as the scan progresses.

**Electrical flicker sells the projection**

Holograms in film language flicker. Here two incommensurate sines are multiplied — \`sin(23t) × sin(7.3t)\` — and only when the product exceeds 0.93 do the fill and wireframe opacities briefly dip to 30%. The threshold on a product of unrelated frequencies produces irregular, unpredictable dropouts a single sine could never give, at the cost of one line of code. The emitter ring's HSL lightness also breathes with time and warms with progress, tying pedestal to projection.

**Scroll as the scanner**

Because the scrubbed value is the clip constant itself, the interaction is honest: scrolling *is* scanning, pausing leaves a partial render with a live cross-section through the knot's tubes, and scrolling up de-renders the artifact top-down. The HUD percentage is a normalization of the same value. The technique generalizes to any mesh — swap the torus knot for a loaded product model and this becomes a [product viewer](/ui-snippets/three-product-viewer/) with a manufacturing-scan intro, or pair it with the [exploded view](/ui-snippets/three-scroll-exploded-view/) for a full sci-fi teardown sequence.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A pedestal with a glowing emitter ring sits under a faint ghost wireframe of the artifact — the SCAN HUD reads 0%.' },
        { title: 'Scroll to scan', text: 'A pulsing cyan disc rises through the ghost; below it the artifact renders as a translucent emissive fill plus bright wireframe, cut razor-sharp at the line.' },
        { title: 'Pause mid-scan', text: 'Stop scrolling to inspect a live cross-section — the clip follows every fold of the rotating torus knot.' },
        { title: 'Scroll back down', text: 'The artifact de-renders top-down as the plane constant retreats — the scan is fully scrubbed, not fired.' },
        { title: 'Scan your own model', text: 'Replace the TorusKnotGeometry with any geometry (or a loaded GLTF\'s meshes) and assign the same clippingPlanes array to its materials.' },
      ],
    },
    features: [
      'Real GPU clipping via THREE.Plane — the scrubbed value IS the plane constant, no masks or fades',
      'renderer.localClippingEnabled flag handled — the silent-failure gotcha of Three.js clipping',
      'Three renders of one geometry: clipped emissive fill, clipped wireframe, unclipped 6% ghost preview',
      'Visible scan line from an open-ended thin cylinder riding at exact clip height with a 9 Hz pulse',
      'Irregular hologram flicker from thresholding the product of two incommensurate sines',
      '260 additive sparkle motes recycling through the scan column, brightening with progress',
      'Museum-style rotation shared across all three copies so the clip boundary stays coherent',
      'Scrub-honest interaction: pause for a live cross-section, scroll up to de-render top-down',
    ],
    useCases: [
      { icon: 'WEB', title: 'Sci-fi product and dev-tool launches', desc: 'Render your product into existence as users scroll — a literal "we materialize software" metaphor for build tools and 3D platforms.' },
      { icon: 'SHOP', title: 'Hardware pages with a scan intro', desc: 'Swap the knot for your device model and run the scan before handing off to a [product viewer](/ui-snippets/three-product-viewer/) orbit.' },
      { icon: 'GAME', title: 'Game artifact and loot reveals', desc: 'The pedestal-hologram language is native to game UI — reveal a relic, then explode it with the [exploded view](/ui-snippets/three-scroll-exploded-view/) pattern.' },
      { icon: 'LEARN', title: 'Teaching Three.js clipping planes', desc: 'Covers the localClippingEnabled flag, plane-normal sign logic, and multi-material clipping in one compact scene.' },
      { icon: 'ANIM', title: 'Medical and scanning-tech marketing', desc: 'CT/MRI companies get an honest visual: a plane sweeping a volume, revealing cross-sections — pair with [scroll pin steps](/ui-snippets/scroll-pin-steps/) annotations.' },
      { icon: 'DESIGN', title: 'Portfolio centerpiece interactions', desc: 'A rotating clipped torus knot is a strong signature piece, more mechanical than the organic [morphing blob](/ui-snippets/three-morphing-blob/).' },
    ],
    faqs: [
      { q: 'Why does the clipping plane have no visible effect in my own scene?', a: 'Almost always the renderer flag: clipping is opt-in, and without renderer.localClippingEnabled = true every material\'s clippingPlanes array is silently ignored — no warning, no error. The second common cause is plane orientation: with normal (0, −1, 0) fragments survive where y ≤ constant; flip the normal and the kept side inverts. This snippet sets the flag immediately after creating the renderer so the gotcha is impossible to miss.' },
      { q: 'Why render the same geometry three times instead of one material?', a: 'Each copy does one job: the translucent Phong fill provides the hologram\'s light volume, the wireframe overlay provides the projected-structure lines (a single material cannot be both filled and wireframe), and the unclipped faint ghost previews the unscanned remainder so the reveal has a visible destination. Geometry is shared — three materials, one TorusKnotGeometry, so memory cost is one mesh\'s worth of vertices.' },
      { q: 'How is the visible scan disc kept in sync with the invisible clip?', a: 'Both read the same scrubbed value: the frame loop sets clipPlane.constant = scan.h and scanDisc.position.y = scan.h in adjacent lines. Because the plane\'s constant IS the world-space Y of the cut (given the (0,−1,0) normal), no conversion is needed — one number drives geometry math and beam position identically, which is why they can never drift apart.' },
      { q: 'What creates the irregular flicker of the hologram?', a: 'The product sin(23t) × sin(7.3t) crosses 0.93 only at irregular intervals because the frequencies are incommensurate — the pattern never repeats on a perceivable period. When it does cross, opacity dips to 30% for a frame or two. A single sine would pulse metronomically and read as a loading indicator; the thresholded product reads as electrical interference.' },
      { q: 'Can I use this hologram scan in React, Vue, or Angular?', a: 'Yes. Export with the JSX, Vue, Angular, or Tailwind buttons. Set localClippingEnabled inside the mount effect right after renderer creation, build the three meshes and ScrollTrigger there, and on cleanup kill the ScrollTrigger, dispose the shared TorusKnotGeometry once plus all four materials, and call renderer.dispose(). The clip plane itself is plain math — no disposal needed.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to debug clipping-plane sign conventions alone. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why localClippingEnabled must be set, how the (0, −1, 0) normal makes the constant equal the scan height, or why the flicker uses a thresholded product of sines. The same assistant can upgrade the effect — scanning a loaded GLTF product model instead of the torus knot, adding a second horizontal plane for a band-only reveal, emitting a particle burst along the cut edge by sampling vertices near the plane, or driving the scan from element visibility instead of a pinned scrub. It can also generate the cyan-to-your-brand-color material swap in one pass. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven hologram scan reveal" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer with renderer.localClippingEnabled = true set immediately after creation, and a PerspectiveCamera resized (with aspect) on window resize; cyan-tinted ambient and point lights.
- A metallic pedestal (CylinderGeometry) with a glowing TorusGeometry emitter ring whose HSL lightness breathes with clock time.
- One THREE.Plane with normal (0, −1, 0) shared by the hologram materials, so a fragment survives when y ≤ plane.constant — the constant IS the scan height.
- One TorusKnotGeometry rendered THREE times: (1) clipped translucent MeshPhongMaterial fill with cyan emissive, (2) clipped brighter wireframe MeshBasicMaterial overlay, (3) UNclipped ~6% opacity ghost wireframe previewing the unscanned remainder. All three share rotation each frame (slow museum turn).
- A visible scan line: a thin open-ended CylinderGeometry disc positioned at exactly the clip height, opacity pulsing on a ~9 Hz sine, hidden at the extreme ends of the range.
- ~260 additive-blended sparkle motes rising through the scan column, wrapping from top back to bottom by mutating one Float32Array, opacity growing with scan progress.
- Hologram flicker: when sin(23t) × sin(7.3t) exceeds 0.93, dip fill and wireframe opacity to ~30% — irregular, non-periodic dropouts.
- One GSAP tween (ease "none") scrubbing the plane constant from below the artifact to above it on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=350%.
- A SCAN % HUD normalized from the same value, an intro overlay fading at 2% progress, and a camera that slowly orbits and rises with progress.
- Confirm pausing mid-scroll shows a live cross-section through the rotating knot, and scrolling back de-renders it top-down.`,
    },
  },
};

export default threeScrollHologramScan;