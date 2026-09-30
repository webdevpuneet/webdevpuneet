const threeScrollDominoRun = {
  id: 'three-scroll-domino-run',
  title: 'Three.js Scroll Domino Run',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="dmn-stage" id="dmnStage">
  <div class="dmn-intro"><p>Scroll ↓ to topple the run</p></div>
  <canvas id="dmnCanvas"></canvas>
  <div class="dmn-hud"><span id="dmnDown">0</span> / <span id="dmnTotal">0</span> DOWN</div>
</section>
<section class="dmn-bottom"><p>Chain reaction complete.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#101216;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.dmn-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8b93a3;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.dmn-stage{height:100vh;position:relative;overflow:hidden;background:#101216}
.dmn-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8b93a3;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#dmnCanvas{display:block;width:100%;height:100%}
.dmn-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#f472b6;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('dmnCanvas');
const downEl = document.getElementById('dmnDown');
const totalEl = document.getElementById('dmnTotal');
const introEl = document.querySelector('.dmn-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101216);
scene.fog = new THREE.Fog(0x101216, 50, 130);
const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 300);

scene.add(new THREE.AmbientLight(0xffffff, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 1.0);
key.position.set(14, 22, 10);
scene.add(key);

const table = new THREE.Mesh(
  new THREE.BoxGeometry(150, 1, 90),
  new THREE.MeshStandardMaterial({ color: 0x1c2027, roughness: 0.8 })
);
table.position.y = -0.5;
scene.add(table);

// The run follows an S-curve sampled from a CatmullRom spline, so the
// chain visibly snakes rather than marching in a line.
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(-46, 0, -18),
  new THREE.Vector3(-22, 0, 14),
  new THREE.Vector3(4, 0, -16),
  new THREE.Vector3(26, 0, 12),
  new THREE.Vector3(46, 0, -8),
]);

const N = 64;
totalEl.textContent = N;
const H = 4.2, W = 2.1, D = 0.6;
const dominoes = [];
const tangent = new THREE.Vector3();
for (let i = 0; i < N; i++) {
  const u = i / (N - 1);
  const pos = path.getPointAt(u);
  path.getTangentAt(u, tangent);
  const hue = 0.85 - u * 0.35;
  const m = new THREE.Mesh(
    new THREE.BoxGeometry(W, H, D),
    new THREE.MeshStandardMaterial({
      color: new THREE.Color().setHSL(hue, 0.6, 0.62), roughness: 0.4, metalness: 0.1,
    })
  );
  // Pivot trick: translate geometry so the BOTTOM-FRONT edge is the
  // origin — rotation.x then topples the tile about its resting edge,
  // exactly like a real domino tipping over.
  m.geometry.translate(0, H / 2, D / 2);
  m.position.copy(pos);
  // Face along the path: yaw from the tangent.
  m.rotation.y = Math.atan2(tangent.x, tangent.z);
  scene.add(m);
  dominoes.push({ m, u, yaw: m.rotation.y });
}

gsap.registerPlugin(ScrollTrigger);
const run = { p: 0 };
gsap.to(run, {
  p: 1,
  ease: 'none',
  scrollTrigger: { trigger: '#dmnStage', start: 'top top', end: '+=450%', scrub: 0.4, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

// The topple front travels the chain across the scroll; each domino falls
// over a short window after the front passes it, easing into its neighbor.
const WIN = 0.055;
// Final rest angle: just past the neighbor gap so tiles lean on each other.
const REST = Math.PI / 2 * 0.82;
function easeOutQuad(x) { return 1 - (1 - x) * (1 - x); }

const clock = new THREE.Clock();
const camPos = new THREE.Vector3(), lookPos = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const p = run.p;
  if (introEl) introEl.style.opacity = p > 0.02 ? '0' : '1';

  // Front position leads the raw scrub slightly so the first domino falls
  // right at scroll start rather than lagging by one window.
  const front = p * (1 + WIN) - 0;
  let down = 0;
  dominoes.forEach((d) => {
    const lp = Math.min(1, Math.max(0, (front - d.u) / WIN));
    if (lp >= 1) down++;
    // easeOut: fast initial tip (gravity takes it) settling into the lean.
    d.m.rotation.x = easeOutQuad(lp) * REST;
  });
  downEl.textContent = down;

  // Camera tracks the topple front along the spline, framed low like a
  // tabletop camera chasing the chain reaction.
  const fu = Math.min(0.985, Math.max(0.015, front - WIN / 2));
  path.getPointAt(fu, lookPos);
  path.getPointAt(Math.max(0.001, fu - 0.12), camPos);
  camera.position.set(
    camPos.x + Math.sin(t * 0.4) * 1.2 - 9,
    12 + Math.sin(t * 0.3) * 0.7,
    camPos.z + 20
  );
  camera.lookAt(lookPos.x, 2, lookPos.z);

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Domino Run — Edge-Pivot Chain Topple',
    description: 'Scroll drives a topple front along 64 dominoes on an S-curve spline, each tipping on its bottom edge into a lean. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Domino Run With Three.js and GSAP',
      description: `The **Three.js Scroll Domino Run** snippet lines 64 dominoes along a snaking S-curve and lets scroll drive the topple front down the chain — each tile tipping about its bottom edge with a gravity-fast ease, settling into a lean against its neighbor, while a low tabletop camera chases the falling front along the spline. GSAP's ScrollTrigger scrubs the front's position; everything else is derived per frame.

**The pivot is a geometry translation**

A domino must rotate about its bottom-front edge — the edge it tips over in reality. Like the spine hinge in the [book pages](/ui-snippets/three-scroll-book-pages/) snippet, this is solved with a one-time geometry translation: \`geometry.translate(0, H/2, D/2)\` moves the box so that edge sits at the local origin, and from then on plain \`rotation.x\` *is* the topple. No pivot groups, no matrix composition — the same trick that handles doors, levers, and lids handles a falling tile.

**A spline placement that snakes**

The run follows a \`CatmullRomCurve3\` through five control points, sampled at 64 even parameters with \`getPointAt\`. Each domino's yaw comes from the curve tangent via \`atan2(tangent.x, tangent.z)\`, so tiles always face along the path — through both S-bends — without any manual angle bookkeeping. Re-routing the entire run means editing five control points; count, spacing, and facing all recompute. A hue ramp across the chain (magenta fading toward orange) makes the front's progress legible even in wide shots.

**A topple front with per-domino windows**

The scrubbed value positions an invisible *front* traveling the chain from u = 0 to u = 1. Each domino compares the front against its own path parameter: once passed, it animates through a short window (\`WIN = 0.055\`) from upright to its rest angle. The window overlap means the previous tile is still falling as the next one starts — the visual signature of a chain reaction — using the same derived-stagger arithmetic as the [voxel build](/ui-snippets/three-scroll-voxel-build/), but keyed to path parameter rather than index, so the front moves at constant *speed along the curve* even where control points crowd.

**Two constants encode the physics feel**

\`easeOutQuad\` on each tile's window mimics gravity taking over — the tip starts fast and decelerates into rest, the inverse of a thrown object. And the rest angle is \`π/2 × 0.82\`, not a full quarter turn: real toppled dominoes never lie flat, they lean on the next tile at roughly 74°. That 0.82 factor is the difference between a chain of tiles that reads as *resting on each other* and one that reads as pancaked. Tiles never intersect because neighbors farther down the chain are always at an equal or lesser angle.

**A chase camera on the same spline**

The camera samples the curve twice — once at the front for its look-at, once 0.12 behind for its own anchor — then offsets low and wide like a tabletop tracking shot. Because both samples derive from the same scrubbed front, the camera decelerates through bends exactly as the front does, and reversing the scroll rewinds the chase shot along with the un-toppling tiles. The DOWN counter counts tiles whose window has completed, honest-count style like the [portal gate sequence](/ui-snippets/three-scroll-portal-gate/). For the launch-scale version of a chain of staged events, compare the [rocket launch](/ui-snippets/three-scroll-rocket-launch/) phase table.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'Sixty-four hue-ramped dominoes stand along an S-curve on a dark table, HUD reading 0 / 64 DOWN.' },
        { title: 'Scroll to topple', text: 'The front travels the chain — each tile tips fast and settles into a 74° lean on its neighbor while the camera chases low along the spline.' },
        { title: 'Ride the bends', text: 'Tangent-derived yaw keeps every tile facing along the path through both S-bends; the hue ramp shows progress at a glance.' },
        { title: 'Scroll back', text: 'Tiles stand back up in exact reverse order and the chase shot rewinds — the front is a pure function of the scrub.' },
        { title: 'Re-route the run', text: 'Edit the five CatmullRom control points (or add more) — placement, facing, and camera path all recompute automatically.' },
      ],
    },
    features: [
      'Edge-pivot topple via geometry.translate — rotation.x alone tips each tile about its resting edge',
      'CatmullRomCurve3 layout: 64 tiles placed by getPointAt with yaw from the curve tangent, re-routable via five points',
      'Topple front keyed to path parameter, so the chain reaction moves at constant speed along the curve',
      'Overlapping 0.055 windows — the previous tile is still falling as the next one starts',
      'easeOutQuad per tile: gravity-fast initial tip decelerating into rest',
      'Rest angle π/2 × 0.82 so tiles lean on neighbors at ~74° instead of pancaking flat',
      'Chase camera sampling the same spline twice (look-at at the front, anchor 0.12 behind)',
      'Honest DOWN counter — counts completed windows, not raw scroll percentage',
    ],
    useCases: [
      { icon: 'WEB', title: 'Cause-and-effect product stories', desc: 'Automation and workflow tools get their pitch literally: one trigger, a visible chain of consequences — annotate stages with [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'ANIM', title: 'Agency and campaign intros', desc: 'The chain reaction is a classic momentum metaphor; land the last tile\'s fall on your headline like a [scroll hero exit](/ui-snippets/scroll-hero-exit/) beat.' },
      { icon: 'LEARN', title: 'Teaching pivot and spline techniques', desc: 'Two transferable patterns in one scene: edge-pivot geometry translation and parameter-keyed stagger along a CatmullRom curve.' },
      { icon: 'GAME', title: 'Physics-toy and puzzle game promos', desc: 'Rube-Goldberg games can demo their core loop scrubbed; pair with the [physics 2D burst](/ui-snippets/physics-2d-burst/) for interaction contrast.' },
      { icon: 'DESIGN', title: 'Process and pipeline visualizations', desc: 'Sixty-four stages of anything — CI steps, supply chain hops — falling in sequence, with hue encoding the pipeline segment.' },
      { icon: 'DATA', title: 'Cascade and dependency storytelling', desc: 'Risk, contagion, and dependency-graph narratives get a visceral cascade; the DOWN counter doubles as an impact metric.' },
    ],
    faqs: [
      { q: 'How does each domino rotate about its bottom edge instead of its center?', a: 'geometry.translate(0, H/2, D/2) is applied once at build time, shifting the box\'s vertices so the bottom-front edge lies at the local origin. Rotation always occurs about the local origin, so rotation.x now tips the tile about exactly the edge a real domino pivots on. One translation replaces a pivot Group per domino — 64 fewer scene-graph nodes.' },
      { q: 'Why is the topple front keyed to path parameter instead of domino index?', a: 'Index-keyed stagger would make the front race through regions where dominoes happen to be closer together and crawl where they spread out. Keying to the CatmullRom parameter u (each tile compares the front against its own u) makes the reaction travel at constant speed along the curve, which matches how a real chain propagates — spacing determines timing, not array position.' },
      { q: 'Why do fallen dominoes stop at 74° instead of lying flat?', a: 'Real toppled dominoes rest ON the next tile, propped at roughly 70–80° of rotation depending on spacing. The REST constant of π/2 × 0.82 reproduces that lean. A full 90° would make tiles interpenetrate the table and each other, and would read instantly as fake — the 0.82 factor is the cheapest realism in the scene.' },
      { q: 'What keeps neighboring tiles from clipping through each other mid-fall?', a: 'The window arithmetic guarantees a monotonic angle gradient down the chain: a tile can never be more rotated than the one before it, because its window starts later on the same front. Combined with the sub-90° rest angle and the spacing implied by 64 samples over the spline, each tile\'s swept volume stays clear of its neighbor\'s — collision-free by construction rather than by physics testing.' },
      { q: 'Can I use this domino run in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the spline, dominoes, and ScrollTrigger inside a mount effect against a canvas ref; the HUD counter should update through a ref. On cleanup kill the ScrollTrigger, dispose all 64 geometries and materials plus the table, and call renderer.dispose(). The curve object itself is plain math and needs no disposal.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out edge pivots and front propagation yourself. Paste this snippet's HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the geometry-translation pivot, the parameter-keyed topple front, or why the rest angle is 82% of a quarter turn. The same assistant can escalate the run — branching chains that split at a Y junction (two splines sharing a control point), a tile that flips a lever or rings a bell mid-chain using the same window math, camera cuts between wide and chase framing at set front positions, or your logo spelled in dominoes by generating control points from text coordinates. It can also convert the tiles to an InstancedMesh with per-instance rotation matrices if you want a thousand-tile run. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven domino run" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (resized with aspect on window resize), ambient + directional light, a large dark table BoxGeometry, and Fog matched to the background.
- A THREE.CatmullRomCurve3 through five control points forming an S-curve on the table plane.
- 64 domino tiles (BoxGeometry ~2.1 × 4.2 × 0.6) placed at even curve parameters with getPointAt; each tile's yaw = atan2(tangent.x, tangent.z) from getTangentAt so it faces along the path. HSL hue ramp across the chain.
- Edge pivot: apply geometry.translate(0, H/2, D/2) ONCE per tile so the bottom-front edge is the local origin — rotation.x alone must perform the topple.
- One GSAP tween (ease "none") scrubbing p 0→1 on a ScrollTrigger with pin: true, scrub ~0.4, end ~+=450%.
- Topple front: front = p × (1 + WIN) with WIN = 0.055; each tile's local progress = clamp((front − u) / WIN); rotation.x = easeOutQuad(local) × (π/2 × 0.82) so tiles tip fast and settle into a ~74° lean, never lying flat. Windows must overlap so the previous tile is still falling as the next starts.
- A chase camera that samples the SAME spline twice — lookAt point at the front (clamped to [0.015, 0.985]), camera anchor 0.12 behind — offset low and to the side like a tabletop tracking shot, with a small clock-driven sway.
- A HUD "n / 64 DOWN" counting tiles whose window completed, and an intro overlay fading at p > 0.02.
- Confirm reverse scrolling stands tiles back up in exact reverse order while the chase shot rewinds.`,
    },
  },
};

export default threeScrollDominoRun;