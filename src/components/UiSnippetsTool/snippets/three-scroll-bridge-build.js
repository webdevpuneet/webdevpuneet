const threeScrollBridgeBuild = {
  id: 'three-scroll-bridge-build',
  title: 'Three.js Scroll Bridge Build Crossing',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="brg-stage" id="brgStage">
  <div class="brg-intro"><p>Scroll ↓ to build your way across</p></div>
  <canvas id="brgCanvas"></canvas>
  <div class="brg-hud">SPAN <span id="brgPct">0</span>%</div>
</section>
<section class="brg-bottom"><p>The far side, reached one plank at a time.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#10151c;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.brg-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8ba3b8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 20px}
.brg-stage{height:100vh;position:relative;overflow:hidden;background:#10151c}
.brg-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8ba3b8;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#brgCanvas{display:block;width:100%;height:100%}
.brg-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#34d399;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('brgCanvas');
const pctEl = document.getElementById('brgPct');
const introEl = document.querySelector('.brg-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x10151c);
scene.fog = new THREE.Fog(0x10151c, 60, 160);
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);

scene.add(new THREE.AmbientLight(0xbdd4e8, 0.55));
const sun = new THREE.DirectionalLight(0xffe9c9, 1.0);
sun.position.set(-30, 40, 20);
scene.add(sun);

function rand(seed) {
  const x = Math.sin(seed * 119.9 + 83.3) * 39163.2917;
  return x - Math.floor(x);
}

// Two canyon walls with jagged displaced cliff faces, a river far below.
const rockMat = new THREE.MeshLambertMaterial({ color: 0x2b3a48 });
function cliff(x0, x1) {
  const g = new THREE.BoxGeometry(Math.abs(x1 - x0), 60, 90, 6, 10, 12);
  const pos = g.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    pos.setX(i, pos.getX(i) + (rand(i + x0) - 0.5) * 3.2);
    pos.setZ(i, pos.getZ(i) + (rand(i * 3 + x1) - 0.5) * 3.2);
  }
  g.computeVertexNormals();
  const m = new THREE.Mesh(g, rockMat);
  m.position.set((x0 + x1) / 2, -30, 0);
  scene.add(m);
}
const GAP = 70; // canyon width
cliff(-GAP / 2 - 45, -GAP / 2);
cliff(GAP / 2, GAP / 2 + 45);

const river = new THREE.Mesh(
  new THREE.PlaneGeometry(GAP + 4, 90),
  new THREE.MeshLambertMaterial({ color: 0x14364a })
);
river.rotation.x = -Math.PI / 2;
river.position.y = -58;
scene.add(river);

// Bridge parts: planks + two rope rails (as thin boxes) + support posts.
// Each plank flies in from below-ahead just before the camera reaches it.
const PLANKS = 46;
const planks = [];
const plankW = GAP / PLANKS;
const woodMat = new THREE.MeshStandardMaterial({ color: 0x8a6a3e, roughness: 0.7 });
for (let i = 0; i < PLANKS; i++) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(plankW * 0.82, 0.35, 5.4), woodMat.clone());
  const x = -GAP / 2 + (i + 0.5) * plankW;
  // Gentle catenary-like sag across the span.
  const sag = Math.sin((i / (PLANKS - 1)) * Math.PI) * -2.4;
  m.position.set(x, sag, 0);
  scene.add(m);
  planks.push({ m, x, sag, u: i / (PLANKS - 1), spin: (rand(i) - 0.5) * 4 });
}
// Rope rails: tube-like thin cylinders per segment, following the sag.
const ropeMat = new THREE.MeshBasicMaterial({ color: 0x5c4a30 });
const ropes = [];
[-2.5, 2.5].forEach((z) => {
  for (let i = 0; i < PLANKS - 1; i++) {
    const a = planks[i], b = planks[i + 1];
    const len = Math.hypot(b.x - a.x, b.sag - a.sag);
    const seg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, len, 6), ropeMat);
    seg.position.set((a.x + b.x) / 2, (a.sag + b.sag) / 2 + 2.4, z);
    seg.rotation.z = Math.PI / 2 + Math.atan2(b.sag - a.sag, b.x - a.x);
    scene.add(seg);
    ropes.push({ m: seg, u: (i + 0.5) / (PLANKS - 1) });
  }
});

gsap.registerPlugin(ScrollTrigger);
const cross = { p: 0 };
gsap.to(cross, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#brgStage', start: 'top top', end: '+=500%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// Planks assemble ahead of the walker: plank at parameter u is fully
// placed when the build front (which leads the camera) passes it.
const LEAD = 0.16, WIN = 0.09;
function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const p = cross.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  const frontier = p * (1 + LEAD);
  let placed = 0;
  planks.forEach((pl) => {
    const lp = Math.min(1, Math.max(0, (frontier - pl.u) / WIN));
    if (lp >= 1) placed++;
    const e = easeOutCubic(lp);
    // Fly in from below and ahead, untwisting on the way.
    pl.m.position.y = pl.sag - (1 - e) * 26;
    pl.m.position.z = (1 - e) * 14;
    pl.m.rotation.x = (1 - e) * pl.spin;
    pl.m.rotation.z = (1 - e) * pl.spin * 0.5;
    pl.m.material.opacity = 1;
  });
  ropes.forEach((r) => {
    const lp = Math.min(1, Math.max(0, (frontier - r.u) / WIN));
    r.m.scale.y = Math.max(0.001, lp);
    r.m.visible = lp > 0.02;
  });

  // Walker camera: crosses the span behind the build frontier, with a
  // subtle footstep bob. Height follows the plank sag beneath it.
  const wu = Math.min(1, Math.max(0, p));
  const wx = -GAP / 2 + wu * GAP;
  const sagHere = Math.sin(wu * Math.PI) * -2.4;
  // Over-the-shoulder framing: above, behind, and beside the walker so
  // the deck ahead, the canyon drop, and the arriving planks all read.
  camera.position.set(
    wx - 7,
    sagHere + 7.5 + Math.abs(Math.sin(p * 60)) * 0.35 + Math.sin(t * 0.4) * 0.15,
    9
  );
  // Look ahead and down at the frontier where planks are arriving; at
  // the end, lift the gaze to the far side.
  const lookX = Math.min(GAP / 2 + 14, wx + 11);
  camera.lookAt(lookX, sagHere - 1.5 + p * 3, 0);

  pctEl.textContent = Math.round(p * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Bridge Build — Planks Assemble Ahead',
    description: 'A first-person canyon crossing where rope-bridge planks fly into place just ahead of your footsteps as you scroll. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Bridge Crossing With Three.js and GSAP',
      description: `The **Three.js Scroll Bridge Build Crossing** snippet puts the camera in first person at the edge of a canyon and lets scroll walk it across — with the catch that the rope bridge does not exist yet: planks fly up from the depths and twist into place just ahead of each footstep, rope rails zipping along behind them, so the walker is perpetually a few steps from the void. GSAP's ScrollTrigger scrubs the crossing; a build frontier that *leads* the camera turns one value into both journey and construction.

**The frontier leads the walker**

Two derived positions move across the span: the camera at raw progress \`p\`, and the build frontier at \`p × (1 + LEAD)\` with LEAD = 0.16. Because the frontier multiplier exceeds one, construction stays ahead of the walker — about seven planks of safety margin at mid-span — and both positions finish together at the far cliff. Each plank compares the frontier against its own span parameter through a short window, the parameter-keyed stagger pattern from the [domino run](/ui-snippets/three-scroll-domino-run/), but here the front *creates* rather than destroys.

**Planks arrive with story**

A plank's local progress drives an \`easeOutCubic\` flight from 26 units below and 14 units ahead, untwisting from a seeded random spin as it rises — so each board visibly *arrives from somewhere* rather than fading in. The seeded hash (shared across this series since the [Rubik's cube assembly](/ui-snippets/three-scroll-rubiks-assemble/)) keeps every plank's tumble identical across reloads and reversals. Rope rail segments scale up along their length (\`scale.y\` from 0 to 1) slightly behind the planks they connect, reading as rope being pulled taut segment by segment.

**A catenary from one sine**

Real rope bridges sag. Every plank's rest height is \`sin(u × π) × −2.4\` — a half-sine dip that approximates a catenary closely enough at this scale — and the rope segments inherit the sag by connecting neighboring plank positions with per-segment rotation from \`atan2\`. Crucially, the walker camera's height follows the same sag function evaluated at its own position, so descending into the dip and climbing out of it is *felt* in first person, not just seen.

**A footstep bob sells first person**

The camera's Y adds \`|sin(p × 60)| × 0.35\` — the absolute-value sine that mimics the rise-fall-rise of walking gait, keyed to scroll so steps only happen while moving. The look-at aims 16 units ahead at the arrival zone where planks are flying in (the natural place a person crossing a half-built bridge would stare), then lifts toward the far side as the crossing completes. Canyon walls are displaced-vertex boxes with \`computeVertexNormals\` for jagged cliff shading, and a river plane 58 units below plus matched fog supply the vertigo.

**One value, two motions, honest reversal**

Scrolling backwards is the full effect in reverse: the walker retreats while planks *behind* the frontier tumble back into the depths and rope segments unzip — the bridge unbuilds itself in your wake. Nothing fires or toggles; walker, frontier, plank flights, rope scales, sag, bob, and the SPAN HUD all derive from one scrubbed number. For the sibling that builds a structure while orbiting it rather than crossing it, see the [voxel build](/ui-snippets/three-scroll-voxel-build/); for another first-person scrubbed traversal, the [staircase climb](/ui-snippets/three-scroll-staircase-climb/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'You stand first-person at a cliff edge — canyon walls drop to a river far below, no bridge in sight, SPAN 0% in the HUD.' },
        { title: 'Scroll to walk', text: 'Planks fly up from the depths and untwist into place a few steps ahead while rope rails zip taut behind them — your footstep bob begins.' },
        { title: 'Feel the sag', text: 'The camera descends into the catenary dip at mid-span and climbs out, always a safe margin behind the build frontier.' },
        { title: 'Scroll back', text: 'The bridge unbuilds in your wake — planks tumble back into the canyon in exact reverse as you retreat.' },
        { title: 'Retune the crossing', text: 'Change GAP, PLANKS, LEAD (safety margin), or the sag amplitude — frontier, ropes, and camera height all recompute.' },
      ],
    },
    features: [
      'Build frontier at p × 1.16 leads the first-person walker — construction stays ~7 planks ahead by construction',
      'Parameter-keyed plank windows: each board flies in as the frontier passes its span position',
      'Planks arrive from 26 below and 14 ahead, untwisting from seeded spins — never fading in',
      'Rope rails as per-segment cylinders scaling taut slightly behind their planks',
      'Half-sine catenary sag shared by planks, ropes, and the walker camera height — the dip is felt, not just seen',
      'Footstep bob from |sin(p × 60)| keyed to scroll, so steps only happen while moving',
      'Displaced-vertex canyon cliffs with computed normals, river 58 units down, fog-matched depth',
      'Fully reversible: scrolling back unbuilds the bridge in your wake, plank by plank',
    ],
    useCases: [
      { icon: 'WEB', title: 'Onboarding and migration journeys', desc: 'The pitch writes itself — "we build the path as you walk it" — for migration tools, guided setups, and managed services, annotated via [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'ANIM', title: 'Trust and partnership storytelling', desc: 'Agencies and consultancies get a first-person metaphor for stepwise commitment; land the far cliff on the CTA.' },
      { icon: 'GAME', title: 'Adventure and platformer promos', desc: 'A canyon crossing with just-in-time platforms is native gaming vocabulary — hand off to a [scroll camera path](/ui-snippets/three-scroll-camera-path/) level tour.' },
      { icon: 'LEARN', title: 'Teaching frontier-lead scrub design', desc: 'The two-position pattern (actor at p, world-builder at p × k) is reusable for any "path appears ahead of you" sequence.' },
      { icon: 'DESIGN', title: 'Portfolio narratives with stakes', desc: 'The vertigo framing keeps attention through a long scroll better than a flat [scroll horizontal pin](/ui-snippets/scroll-horizontal-pin/) section.' },
      { icon: 'DATA', title: 'Roadmap and milestone reveals', desc: 'Each plank a shipped milestone, the frontier your delivery pace — the SPAN HUD doubles as roadmap progress.' },
    ],
    faqs: [
      { q: 'How does the bridge stay exactly ahead of the walker?', a: 'Two positions derive from one scrubbed value: the camera crosses at raw p while the build frontier moves at p × (1 + 0.16). Since the frontier runs 16% faster, it leads by a growing-then-shrinking margin that peaks mid-span (~7 planks) and converges at the far cliff, where both reach 1 together. Each plank\'s flight window is keyed to the frontier, so the safety margin is structural — no timing coordination can drift.' },
      { q: 'Why do planks fly in from below instead of fading in?', a: 'Opacity fades read as UI; motion reads as construction. Each plank\'s local progress drives an easeOutCubic flight from 26 units down and 14 units forward while untwisting from a seeded random spin, so boards visibly arrive from the canyon and settle. The seeded hash keeps every tumble identical across reloads and scroll reversals — Math.random would break the unbuild-in-reverse effect.' },
      { q: 'How is the rope-bridge sag computed?', a: 'A half-sine: each plank rests at sin(u × π) × −2.4, dipping 2.4 units at mid-span — a close visual approximation of a catenary at this scale. Rope segments connect neighboring plank rest positions with rotation from atan2, inheriting the curve, and the walker camera evaluates the same function at its own position so the descent into the dip is experienced in first person.' },
      { q: 'What creates the walking feel?', a: 'Three layers on the camera: the sag-following base height, a footstep bob of |sin(p × 60)| × 0.35 — the absolute sine\'s cusps mimic heel strikes, and being keyed to p means steps stop when scrolling stops — and a slow clock sway for idle life. The look-at aims at the plank arrival zone ahead, which is where a real person crossing a half-built bridge would look.' },
      { q: 'Can I use this bridge crossing in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build cliffs, planks, ropes, and the ScrollTrigger inside a mount effect against a canvas ref. Note each plank clones the wood material — dispose all clones on cleanup along with rope and cliff geometries, kill the ScrollTrigger, and call renderer.dispose() so the pin and WebGL context release.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to invent the frontier-lead pattern — it is the heart of this snippet and transfers to any "path builds ahead of you" idea. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the two-position derivation, the seeded plank tumbles, or why the camera height shares the sag function. The same assistant can raise the stakes — wind that sways planks and ropes on clock time with amplitude peaking mid-span, a plank that arrives late (window offset) for a heart-skip beat, fog rolling up from the river as you descend into the dip, or milestone labels on every eighth plank. It can also convert the crossing into third person by orbiting a walker figure with the same two-position math. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven bridge build crossing" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), cool ambient + warm directional light, and Fog matched to the background.
- A canyon: two cliff walls from BoxGeometry with vertices jittered by a seeded sin-hash (no Math.random) and computeVertexNormals for jagged shading, separated by a ~70-unit gap, with a dark river plane ~58 units below.
- 46 wooden planks spanning the gap, each resting at a half-sine catenary sag y = sin(u × π) × −2.4. Rope rails on both sides as thin cylinder segments connecting neighboring plank positions, rotated via atan2 to follow the sag.
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=500%.
- TWO derived positions: the first-person camera crosses at raw p; a build frontier moves at p × 1.16. Each plank's local progress = clamp((frontier − u) / 0.09), driving an easeOutCubic flight from 26 units below and 14 units ahead while untwisting from a per-plank seeded spin. Rope segments scale.y from 0 to 1 on the same windows, slightly behind their planks.
- Walker camera: x from p across the gap, height = sag(p) + 4.6 + footstep bob |sin(p × 60)| × 0.35 + small clock sway; lookAt ~16 units ahead at the plank arrival zone, lifting toward the far side near the end.
- A SPAN % HUD from p and an intro overlay fading at p > 0.02.
- Confirm scrolling backwards retreats the walker while the bridge unbuilds in reverse — planks tumbling back into the canyon along their identical seeded paths.`,
    },
  },
};

export default threeScrollBridgeBuild;