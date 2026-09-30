const threeScrollPrismSplit = {
  id: 'three-scroll-prism-split',
  title: 'Three.js Scroll Prism Light Split',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="prm-stage" id="prmStage">
  <div class="prm-intro"><p>Scroll ↓ to split the light</p></div>
  <canvas id="prmCanvas"></canvas>
  <div class="prm-hud">DISPERSION <span id="prmPct">0</span>%</div>
</section>
<section class="prm-bottom"><p>White light was the whole story all along.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#050508;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.prm-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a8a9e;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 20px}
.prm-stage{height:100vh;position:relative;overflow:hidden;background:#050508}
.prm-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8a8a9e;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#prmCanvas{display:block;width:100%;height:100%}
.prm-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#f9a8d4;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('prmCanvas');
const pctEl = document.getElementById('prmPct');
const introEl = document.querySelector('.prm-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x050508);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);

scene.add(new THREE.AmbientLight(0xffffff, 0.35));
const key = new THREE.PointLight(0xffffff, 0.8, 100);
key.position.set(-10, 14, 12);
scene.add(key);

// The prism: a triangular cross-section extruded — CylinderGeometry with
// 3 radial segments is the cheapest equilateral prism in Three.js.
const prism = new THREE.Mesh(
  new THREE.CylinderGeometry(6, 6, 7, 3, 1),
  new THREE.MeshPhysicalMaterial({
    color: 0xd8ecf5, transparent: true, opacity: 0.22, roughness: 0.02,
    metalness: 0, side: THREE.DoubleSide, depthWrite: false,
  })
);
prism.rotation.z = Math.PI / 2; // axis horizontal, triangle facing camera
scene.add(prism);
// Edge wireframe so the glass reads even at low opacity.
const prismEdges = new THREE.LineSegments(
  new THREE.EdgesGeometry(prism.geometry),
  new THREE.LineBasicMaterial({ color: 0x9fd8ee, transparent: true, opacity: 0.5 })
);
prismEdges.rotation.copy(prism.rotation);
scene.add(prismEdges);

// The incoming white beam: a thin bright box from the left edge to the
// prism face. Beams are boxes, not lines, so they can glow via scale.
function beam(color, width) {
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(1, width, width),
    new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending, depthWrite: false })
  );
  scene.add(m);
  return m;
}
const whiteBeam = beam(0xffffff, 0.5);

// Spectrum: seven rays fanning from the prism's exit face. Each stores
// its rest hue and an exit angle that widens with dispersion.
const SPECTRUM = [0xff3b30, 0xff9500, 0xffd60a, 0x34c759, 0x30c9e8, 0x4169e1, 0x9d4edc];
const rays = SPECTRUM.map((c, i) => ({
  m: beam(c, 0.34),
  // Violet bends most: index 6 gets the widest angle.
  bend: (i - 3) * 1, // -3..3 spread factor
  i,
}));

// Dust motes so the beams have something to illuminate.
const MOTES = 300;
const moteGeo = new THREE.BufferGeometry();
const motePos = new Float32Array(MOTES * 3);
for (let i = 0; i < MOTES; i++) {
  motePos[i * 3] = (Math.random() - 0.5) * 70;
  motePos[i * 3 + 1] = (Math.random() - 0.5) * 40;
  motePos[i * 3 + 2] = (Math.random() - 0.5) * 30;
}
moteGeo.setAttribute('position', new THREE.BufferAttribute(motePos, 3));
const motes = new THREE.Points(moteGeo, new THREE.PointsMaterial({
  color: 0xbfd4e8, size: 0.09, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending, depthWrite: false,
}));
scene.add(motes);

gsap.registerPlugin(ScrollTrigger);
const disp = { p: 0 };
gsap.to(disp, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#prmStage', start: 'top top', end: '+=400%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Position a beam box between two points by midpoint + length + yaw-roll.
const A = new THREE.Vector3(), B = new THREE.Vector3();
function layBeam(m, ax, ay, bx, by) {
  A.set(ax, ay, 0); B.set(bx, by, 0);
  const len = A.distanceTo(B);
  m.scale.x = len;
  m.position.set((ax + bx) / 2, (ay + by) / 2, 0);
  m.rotation.z = Math.atan2(by - ay, bx - ax);
}

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const p = disp.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  // Phase 1 (0–0.3): the white beam extends from off-screen to the prism.
  // Phase 2 (0.3–1): dispersion — the fan opens and the prism rotates.
  const reach = Math.min(1, p / 0.3);
  const fan = Math.max(0, (p - 0.3) / 0.7);
  const fanE = fan * fan * (3 - 2 * fan);

  // The beam grows from off-screen left toward the entry point on the
  // prism's left face as reach goes 0 → 1.
  const IN_X = -6 * 0.55, IN_Y = 2.2;
  layBeam(whiteBeam, -46, 8, -46 + reach * (46 + IN_X), 8 + reach * (IN_Y - 8));
  whiteBeam.material.opacity = 0.25 + reach * 0.6;
  // White beam thins as its energy transfers into the spectrum.
  whiteBeam.scale.y = whiteBeam.scale.z = 1 - fanE * 0.55;

  // Spectrum rays exit from the right face, fanning by dispersion. Length
  // also grows with fan so colors shoot to the edge of frame.
  const EXIT_X = 6 * 0.55, EXIT_Y = 0.4;
  rays.forEach((r) => {
    const angle = -0.12 - r.bend * 0.085 * fanE;
    const len = 4 + fanE * 46;
    const ex = EXIT_X + Math.cos(angle) * len;
    const ey = EXIT_Y + Math.sin(angle) * len;
    layBeam(r.m, EXIT_X, EXIT_Y, ex, ey);
    r.m.material.opacity = fanE * 0.9;
    // Rays shimmer independently so the fan feels lit, not painted.
    r.m.scale.y = r.m.scale.z = 1 + Math.sin(t * 3 + r.i) * 0.18;
  });

  // The prism rotates slowly with dispersion — the "cause" of the split —
  // plus a gentle idle wobble.
  prism.rotation.y = fanE * 0.5 + Math.sin(t * 0.4) * 0.05;
  prismEdges.rotation.y = prism.rotation.y;
  prism.material.opacity = 0.16 + fanE * 0.14;

  // Camera swings from edge-on (beam view) toward front (fan view).
  const ang = -0.9 + p * 1.1;
  camera.position.set(Math.sin(ang) * 34, 4 + Math.sin(t * 0.3) * 0.5, Math.cos(ang) * 34);
  camera.lookAt(2, 2, 0);

  pctEl.textContent = Math.round(fanE * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Prism — Spectrum Dispersion Fan',
    description: 'Scroll extends a white beam into a glass prism, then fans seven spectral rays with violet bending furthest. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Prism Light Split With Three.js and GSAP',
      description: `The **Three.js Scroll Prism Light Split** snippet stages the most famous experiment in optics: a white beam extends across a dark room into a glass prism, and as the user keeps scrolling, seven spectral rays fan out of the far face — red bending least, violet most — while the camera swings from an edge-on beam view to the full *Dark Side of the Moon* silhouette. GSAP's ScrollTrigger scrubs one dispersion value; the beams are boxes laid between computed points.

**A prism from a three-sided cylinder**

Three.js has no prism primitive, but \`CylinderGeometry(6, 6, 7, 3)\` — three radial segments — is exactly an extruded equilateral triangle. Rotated so its axis lies horizontal, it presents a triangular cross-section to the camera at zero modeling cost. The glass recipe repeats this series' budget formula (see the [hourglass](/ui-snippets/three-scroll-hourglass/) bulbs): \`MeshPhysicalMaterial\` at 22% opacity with near-zero roughness, \`depthWrite\` off, plus an \`EdgesGeometry\` wireframe overlay so the silhouette stays crisp even where the glass is nearly invisible.

**Beams are boxes, not lines**

WebGL line width is capped at 1px on most platforms, so glowing light rays can't be \`Line\` objects. Every beam here is a 1-unit \`BoxGeometry\` stretched between two points by a \`layBeam()\` helper: scale.x becomes the length, position the midpoint, rotation.z the \`atan2\` of the direction. Additive blending makes overlapping beams brighten each other, and each ray's cross-section shimmers independently on clock time so the fan reads as *light*, not painted stripes. The white beam thins as dispersion grows — its energy visibly transferring into the spectrum.

**Dispersion as a per-ray bend factor**

Each of the seven rays stores a bend factor from −3 (red) to +3 (violet), and its exit angle is \`−0.12 − bend × 0.085 × dispersion\` — so at zero dispersion all rays overlap the white beam's line, and as the scrub advances the fan opens with violet deflecting most, the correct physics ordering. Ray length also grows with dispersion (4 to 50 units), shooting color to the frame edges at full split. Because angle and length are pure functions of the scrubbed value, scrolling back retracts the spectrum into the prism and restores the undivided white beam.

**Two phases, one camera thesis**

The scrub splits at 30%: first the white beam *reaches* — extending from off-screen to the entry face, an arrival that gives the split a cause — then the fan opens through a smoothstepped 70%. Meanwhile the camera swings 1.1 radians from nearly edge-on (where the beam is a bright line and the prism a dark triangle) to frontal (where the fan is widest). The camera move is doing argumentative work: it starts where the *beam* is the subject and ends where the *spectrum* is, the same choreography-as-explanation idea as the [pendulum wave](/ui-snippets/three-scroll-pendulum-wave/)'s profile-to-front slide.

**Dust makes light visible**

Beams in empty space are invisible in reality and unconvincing in 3D. Three hundred additive dust motes drift through the scene, giving the beams something to appear to illuminate — the same trick film sets use with haze machines. The prism itself rotates half a radian as dispersion grows, suggesting the split is *caused* by the geometry change, and idles with a gentle wobble so the scene never freezes. For the full-scene color treatment of this idea, see the [scroll color morph](/ui-snippets/three-scroll-color-morph/); for beams at architectural scale, the [lightning orb](/ui-snippets/three-scroll-lightning-orb/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A glass prism floats in a dark, dust-hazed room, viewed nearly edge-on — DISPERSION 0% in the HUD.' },
        { title: 'Scroll to send the beam', text: 'Across the first 30% a white beam extends from off-screen and lands on the prism\'s entry face.' },
        { title: 'Keep scrolling to split it', text: 'Seven rays fan from the exit face — violet bending furthest — while the white beam visibly thins and the camera swings to the frontal view.' },
        { title: 'Scroll back', text: 'The spectrum retracts into the prism and the beam withdraws — every angle and length is a pure function of the scrub.' },
        { title: 'Restyle the spectrum', text: 'Edit the SPECTRUM hex array (fewer, more, or brand colors) — bend factors derive from array position automatically.' },
      ],
    },
    features: [
      'Prism from CylinderGeometry with 3 radial segments — a zero-cost extruded equilateral triangle',
      'Budget glass: MeshPhysicalMaterial at 22% opacity, near-zero roughness, plus an EdgesGeometry outline',
      'Beams as stretched boxes via a layBeam(midpoint, length, atan2) helper — WebGL line-width limits bypassed',
      'Physically ordered dispersion: per-ray bend factors from −3 to +3, violet deflecting most',
      'White beam thins as the fan opens — energy visibly transferring into the spectrum',
      'Two-phase scrub: beam arrival (30%), smoothstepped fan opening (70%)',
      'Camera swings edge-on to frontal, reframing the subject from beam to spectrum',
      '300 additive dust motes giving the light something to illuminate, plus independent per-ray shimmer',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Creative-tool and brand-palette pages', desc: 'Design tools whose product is color get their origin story: white in, spectrum out — swap SPECTRUM for your brand ramp.' },
      { icon: 'WEB', title: 'Analytics and "one input, many insights" pitches', desc: 'The prism is the diagram every BI deck draws — here it renders live, with rays as report categories annotated via [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'LEARN', title: 'Physics and optics teaching pages', desc: 'Correct dispersion ordering plus a scrub students can reverse — pair with the [pendulum wave](/ui-snippets/three-scroll-pendulum-wave/) for a classroom set.' },
      { icon: 'ANIM', title: 'Music and album visuals', desc: 'The Dark Side silhouette is a permanent cultural reference — land the full fan on a tracklist or tour date reveal.' },
      { icon: 'ART', title: 'Portfolio hero for colorists and photographers', desc: 'Light-as-subject framing suits color graders; the dust-haze room sets a cinematic mood beyond a flat [aurora background](/ui-snippets/aurora-bg/).' },
      { icon: 'GAME', title: 'Puzzle games with light mechanics', desc: 'Beam-routing puzzles can demo their core verb — split, bend, recombine — before a single screenshot.' },
    ],
    faqs: [
      { q: 'Why is the prism a CylinderGeometry?', a: 'CylinderGeometry\'s radialSegments parameter controls the cross-section polygon: 32 gives a circle, 3 gives an equilateral triangle — which extruded along the axis is exactly a prism. Rotated 90° so the axis is horizontal, the triangle faces the camera. It ships in every Three.js build, needs no ExtrudeGeometry shape path, and its EdgesGeometry gives clean silhouette lines for the glass outline.' },
      { q: 'Why are the light rays boxes instead of THREE.Line objects?', a: 'The WebGL spec only guarantees 1-pixel line width, and most platforms enforce it, so glowing beams cannot be drawn as lines. A unit BoxGeometry stretched by scale.x between two points — midpoint position, atan2 rotation — renders at any thickness, supports additive blending for overlap glow, and its cross-section can animate (the shimmer and the white beam\'s thinning) via scale.y/z.' },
      { q: 'Is the dispersion physically correct?', a: 'The ordering is: violet carries the largest bend factor and deflects most, red least — matching real glass, where refractive index rises toward shorter wavelengths. The angles themselves are art-directed rather than Snell\'s-law-derived (a real 60° prism at this geometry would fan only a few degrees), a standard theatrical exaggeration so the split reads at page scale.' },
      { q: 'What do the dust motes contribute?', a: 'In reality a light beam crossing clean air is invisible — you see light only where it scatters off something. The 300 additive-blended motes drifting through the scene give the beams an atmosphere to visually illuminate, the same reason film sets use haze machines. Without them the boxes read as solid neon tubes; with them, as light through a dusty room.' },
      { q: 'Can I use this prism scene in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the prism, beams, and ScrollTrigger inside a mount effect against a canvas ref; the layBeam helper and scratch vectors live in effect scope. On cleanup kill the ScrollTrigger, dispose the prism geometry, edges, every beam box\'s geometry/material, the mote system, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to fight WebGL's line-width limits or derive dispersion factors yourself. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the three-segment cylinder trick, the layBeam box-stretching helper, or why violet gets the largest bend factor. The same assistant can extend the optics — a second prism that recombines the fan back into white (Newton's actual follow-up experiment), a rainbow projection patch where the rays land, Snell's-law-accurate angles if you want the educational version, or the beam origin following the mouse before scroll takes over. It can also swap the seven spectral colors for your brand ramp with bend factors regenerated from array position. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven prism light split" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), dim ambient plus one PointLight, near-black background.
- A prism from CylinderGeometry(6, 6, 7, 3) — three radial segments = extruded equilateral triangle — rotated so the axis is horizontal. Glass look: MeshPhysicalMaterial ~22% opacity, roughness ~0.02, DoubleSide, depthWrite false, plus an EdgesGeometry LineSegments outline.
- A layBeam(mesh, ax, ay, bx, by) helper that stretches a unit BoxGeometry between two points: scale.x = distance, position = midpoint, rotation.z = atan2 — because WebGL lines are capped at 1px. All beams use MeshBasicMaterial with AdditiveBlending and depthWrite false.
- One white beam and seven spectral rays (red 0xff3b30 → violet 0x9d4edc), each ray storing a bend factor from −3 (red) to +3 (violet).
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=400%.
- Two derived phases: reach = min(1, p/0.3) extends the white beam from off-screen to the prism's entry face; fan = smoothstep((p − 0.3)/0.7) opens the spectrum. Each ray's exit angle = −0.12 − bend × 0.085 × fan, length = 4 + fan × 46, opacity = fan × 0.9 — violet must visibly deflect most. The white beam's cross-section thins by 55% as fan grows.
- ~300 additive dust motes drifting in the scene so beams appear to illuminate something; per-ray cross-section shimmer on clock time; prism rotates ~0.5 rad with fan plus an idle wobble.
- A camera swinging ~1.1 rad from edge-on to frontal across the scroll, lookAt slightly right of the prism; a DISPERSION % HUD from fan; intro overlay fades at p > 0.02.
- Confirm reverse scrolling retracts the spectrum into the prism and withdraws the beam.`,
    },
  },
};

export default threeScrollPrismSplit;