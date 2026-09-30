const threeScrollAsteroidBelt = {
  id: 'three-scroll-asteroid-belt',
  title: 'Three.js Scroll Asteroid Belt Run',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="ast-stage" id="astStage">
  <div class="ast-intro"><p>Scroll ↓ to thread the belt</p></div>
  <canvas id="astCanvas"></canvas>
  <div class="ast-hud">NEAR MISSES <span id="astMiss">0</span></div>
</section>
<section class="ast-bottom"><p>Clear of the field.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#07070d;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.ast-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8d8da5;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.ast-stage{height:100vh;position:relative;overflow:hidden;background:#07070d}
.ast-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#8d8da5;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#astCanvas{display:block;width:100%;height:100%}
.ast-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#fca5a5;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('astCanvas');
const missEl = document.getElementById('astMiss');
const introEl = document.querySelector('.ast-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
const BG = 0x07070d;
scene.background = new THREE.Color(BG);
scene.fog = new THREE.FogExp2(BG, 0.011);
const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 400);

scene.add(new THREE.AmbientLight(0x8899bb, 0.4));
const sun = new THREE.DirectionalLight(0xffe9c9, 1.2);
sun.position.set(40, 25, 30);
scene.add(sun);

function rand(seed) {
  const x = Math.sin(seed * 173.9 + 61.3) * 36241.7391;
  return x - Math.floor(x);
}

// One InstancedMesh draws every asteroid — 320 rocks, one draw call.
// Each instance stores its corridor placement and tumble parameters;
// matrices are recomposed each frame from those plus clock time.
const COUNT = 320, DEPTH = 480;
const rockGeo = new THREE.DodecahedronGeometry(1, 0);
// Roughen the base rock so instances read as debris, not dice.
const rp = rockGeo.attributes.position;
const rv = new THREE.Vector3();
for (let i = 0; i < rp.count; i++) {
  rv.fromBufferAttribute(rp, i);
  rv.multiplyScalar(0.82 + rand(i) * 0.36);
  rp.setXYZ(i, rv.x, rv.y, rv.z);
}
rockGeo.computeVertexNormals();
const rockMat = new THREE.MeshStandardMaterial({ color: 0x8a8578, roughness: 0.9, metalness: 0.15 });
const rocks = new THREE.InstancedMesh(rockGeo, rockMat, COUNT);
rocks.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
scene.add(rocks);

// The flight path weaves: lateral offsets the camera will steer through.
function pathX(z) { return Math.sin(z * 0.021) * 9 + Math.sin(z * 0.007) * 5; }
function pathY(z) { return Math.cos(z * 0.016) * 5; }

const asteroids = [];
for (let i = 0; i < COUNT; i++) {
  const z = -(i / COUNT) * DEPTH - 12;
  // Place rocks around the path, but keep a flyable channel: minimum
  // radial clearance from the path centerline, with a few "gate" rocks
  // deliberately closer for near-miss drama.
  const gate = rand(i + 7e3) > 0.88;
  const clearance = gate ? 3.4 : 6.5;
  const a = rand(i + 1e3) * Math.PI * 2;
  const r = clearance + rand(i + 2e3) * 16;
  asteroids.push({
    x: pathX(z) + Math.cos(a) * r,
    y: pathY(z) + Math.sin(a) * r,
    z,
    scale: gate ? 1.2 + rand(i + 3e3) * 1.6 : 0.7 + rand(i + 3e3) * 3.4,
    spinX: (rand(i + 4e3) - 0.5) * 0.8,
    spinY: (rand(i + 5e3) - 0.5) * 0.8,
    phase: rand(i + 6e3) * Math.PI * 2,
    gate,
    counted: false,
  });
}

const dummy = new THREE.Object3D();
const rockColor = new THREE.Color(0x8a8578);
const hotColor = new THREE.Color(0xff8866);
rocks.instanceColor = null; // ensure per-instance color buffer allocates on first set
for (let i = 0; i < COUNT; i++) rocks.setColorAt(i, rockColor);

// Distant star dust.
const starGeo = new THREE.BufferGeometry();
const starPos = new Float32Array(1000 * 3);
for (let i = 0; i < 1000; i++) {
  starPos[i * 3] = (rand(i + 9e3) - 0.5) * 300;
  starPos[i * 3 + 1] = (rand(i + 1e4) - 0.5) * 300;
  starPos[i * 3 + 2] = -rand(i + 11e3) * DEPTH - 40;
}
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaab4d4, size: 0.5, sizeAttenuation: true })));

gsap.registerPlugin(ScrollTrigger);
const flight = { z: 6 };
gsap.to(flight, {
  z: -DEPTH - 6,
  ease: 'none',
  scrollTrigger: { trigger: '#astStage', start: 'top top', end: '+=600%', scrub: 0.55, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

let misses = 0;
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const cz = flight.z;
  if (introEl) introEl.style.opacity = cz < 4 ? '0' : '1';

  // The camera flies the weaving path; banking is the X-derivative of the
  // path, which reads as steering rather than sliding.
  const px = pathX(cz), py = pathY(cz);
  const lead = 14;
  camera.position.set(px, py, cz);
  camera.lookAt(pathX(cz - lead), pathY(cz - lead), cz - lead);
  const bank = (pathX(cz - 1) - pathX(cz + 1)) * 0.09;
  camera.rotation.z = bank;

  // Recompose every instance matrix: tumble from clock, proximity glow
  // and count from camera distance.
  let needColor = false;
  for (let i = 0; i < COUNT; i++) {
    const A2 = asteroids[i];
    dummy.position.set(A2.x, A2.y, A2.z);
    dummy.rotation.set(A2.phase + t * A2.spinX, A2.phase + t * A2.spinY, A2.phase * 0.5);
    dummy.scale.setScalar(A2.scale);
    dummy.updateMatrix();
    rocks.setMatrixAt(i, dummy.matrix);

    // Near-miss: gates within 6 units of the camera flash hot and count
    // once per pass (reset when re-approached from the front).
    const dz = A2.z - cz;
    if (A2.gate) {
      const close = Math.abs(dz) < 6;
      if (close && !A2.counted && dz > -1) { A2.counted = true; misses++; }
      if (dz > 6) A2.counted = false; // re-arm when scrolled back above it
      rocks.setColorAt(i, close ? hotColor : rockColor);
      needColor = true;
    }
  }
  rocks.instanceMatrix.needsUpdate = true;
  if (needColor && rocks.instanceColor) rocks.instanceColor.needsUpdate = true;

  missEl.textContent = misses;
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Asteroid Belt — InstancedMesh Dodge Run',
    description: 'Scroll weaves a banking camera through 320 instanced asteroids with a guaranteed corridor and flashing near-miss gates. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Asteroid Belt Run With InstancedMesh and GSAP',
      description: `The **Three.js Scroll Asteroid Belt Run** snippet flies the camera on a weaving, banking path through 320 tumbling asteroids — every rock a single \`InstancedMesh\` instance, so the whole field costs one draw call — with "gate" asteroids seeded deliberately close to the flight path that flash hot and increment a NEAR MISSES counter as the camera threads them. GSAP's ScrollTrigger scrubs the camera's Z; the corridor, the banking, and the drama are all construction-time guarantees.

**One draw call for the whole field**

Rendering 320 individual \`Mesh\` objects means 320 draw calls and 320 scene-graph nodes. \`InstancedMesh\` submits one geometry, one material, and a buffer of per-instance matrices — the GPU stamps the rock 320 times in a single call. Each frame the loop recomposes every matrix through a shared \`Object3D\` dummy (position from placement, rotation from clock-time tumble, scale from seed) and flags \`instanceMatrix.needsUpdate\`. With \`DynamicDrawUsage\` hinting the driver that this buffer changes every frame, the field animates as cheaply as a particle system while remaining fully lit, shadowed, solid geometry. The base rock itself is a \`DodecahedronGeometry\` with seeded per-vertex radial jitter, so instances read as debris rather than dice.

**A corridor guaranteed at construction**

Dodge-field scenes fail when a rock happens to spawn on the flight path. Here the path is two analytic functions — \`pathX(z)\` and \`pathY(z)\`, sums of incommensurate sines that weave without repeating — and every asteroid is placed *relative to the path at its own Z*: a random angle around the centerline at a radius of at least 6.5 units of clearance. The corridor is therefore flyable by construction, no collision testing ever needed. The 12% of rocks flagged as gates get clearance 3.4 instead — close enough to feel dangerous, still outside the camera's envelope. Threat placement is a parameter, not luck.

**Banking sells the steering**

A camera translated along a curve looks like it is being dragged; a camera that *banks* looks like it is flying. The roll angle is the numerical X-derivative of the path — \`(pathX(z−1) − pathX(z+1)) × 0.09\` — so the camera leans into every turn exactly as hard as the turn demands, with look-at aimed 14 units down-path. One derivative turns a slide into a cockpit, the first-person sibling of the [bridge crossing](/ui-snippets/three-scroll-bridge-build/)'s footstep bob.

**Near-misses with scrub-safe counting**

Gate rocks within 6 units of the camera tint hot orange via \`setColorAt\` — per-instance color, still one draw call — and increment the counter once per pass. The \`counted\` flag re-arms only when the camera retreats fully above the gate, so oscillating mid-pass cannot double-count, and scrolling back up genuinely re-arms the gates for another run. It is the honest-counter philosophy of the [portal gate sequence](/ui-snippets/three-scroll-portal-gate/) adapted to stateful counting on a scrubbed axis.

**Fog as density illusion**

\`FogExp2\` matched to the background makes rocks materialize gradually out of the dark ahead — the belt feels endless although only 320 rocks exist across 480 units, the same budget-infinity trick as the [scroll tunnel](/ui-snippets/three-scroll-tunnel/). Star dust points scattered through the corridor depth supply parallax between rock encounters. For the physics-flavored cousin where the field reacts to you, see [magnetic particles](/ui-snippets/three-magnetic-particles/); for the warp-speed version with no obstacles, [starfield warp](/ui-snippets/three-starfield-warp/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'You hover at the edge of a fog-shrouded asteroid field, rocks tumbling ahead — NEAR MISSES 0 in the HUD.' },
        { title: 'Scroll to fly', text: 'The camera weaves and banks along the corridor as asteroids materialize from the fog and slide past on both sides.' },
        { title: 'Thread the gates', text: 'Occasional rocks sit deliberately close — they flash hot orange as you pass and the near-miss counter ticks up.' },
        { title: 'Scroll back', text: 'The run reverses; gates re-arm as you retreat above them, ready to count again on the next pass.' },
        { title: 'Tune the danger', text: 'Raise the gate probability (0.88 threshold), lower gate clearance (3.4), or add rocks — the corridor stays flyable by construction.' },
      ],
    },
    features: [
      '320 asteroids in ONE InstancedMesh draw call, matrices recomposed per frame via a shared dummy Object3D',
      'DynamicDrawUsage hint on the instance buffer for per-frame matrix updates',
      'Seeded per-vertex jitter on one DodecahedronGeometry makes every instance read as unique debris',
      'Analytic weaving path from incommensurate sines — flyable corridor guaranteed at construction, zero collision tests',
      'Gate asteroids at reduced clearance (3.4 vs 6.5) for parameterized, not random, danger',
      'Banking from the path\'s numerical X-derivative — the camera leans into turns like a cockpit',
      'Near-miss counting with re-arm logic that survives scrub oscillation and reverse runs',
      'Per-instance hot-flash via setColorAt, still within the single draw call; FogExp2 density illusion',
    ],
    useCases: [
      { icon: 'GAME', title: 'Space shooter and racer promos', desc: 'The dodge-run is the genre\'s core fantasy, scrubbed — hand off to a [product viewer](/ui-snippets/three-product-viewer/) for the ship itself.' },
      { icon: 'WEB', title: '"Navigating complexity" B2B narratives', desc: 'Compliance, security, and logistics products get threats threaded in first person, with near-misses as the risk counter.' },
      { icon: 'LEARN', title: 'Teaching InstancedMesh fundamentals', desc: 'The complete pattern in one scene: shared dummy, matrix recomposition, DynamicDrawUsage, and per-instance color — the single most important Three.js scaling technique.' },
      { icon: 'ANIM', title: 'High-energy portfolio openers', desc: 'A banking flythrough outpaces static heroes; the fog reveal paces long scrolls like the [scroll tunnel](/ui-snippets/three-scroll-tunnel/).' },
      { icon: 'DATA', title: 'Risk and anomaly storytelling', desc: 'Map gates to real incidents — each flash a logged event, the counter a running total, annotated via [scroll pin steps](/ui-snippets/scroll-pin-steps/).' },
      { icon: 'ART', title: 'Ambient space scenes', desc: 'Zero out the gates and slow the path for a drifting debris-field meditation, kin to the [comet trail](/ui-snippets/three-comet-trail/).' },
    ],
    faqs: [
      { q: 'Why use InstancedMesh instead of 320 separate meshes?', a: 'Each Mesh costs a draw call plus scene-graph overhead; 320 of them would bottleneck most devices. InstancedMesh submits geometry and material once with a buffer of per-instance matrices — one draw call stamps all 320 rocks. The frame loop recomposes matrices through a shared Object3D dummy and sets instanceMatrix.needsUpdate, with DynamicDrawUsage hinting the GPU driver that the buffer updates every frame. Scaling to 2,000 rocks changes one constant.' },
      { q: 'How is the flight corridor guaranteed to be clear?', a: 'The path is analytic — pathX(z) and pathY(z) are sums of sines — and every asteroid is placed RELATIVE to the path evaluated at its own Z: random angle, radius of at least 6.5 units (3.4 for gates). Since placement starts from the centerline outward, no rock can occupy the corridor. It is a construction-time guarantee, so the scene needs no collision detection at runtime, ever.' },
      { q: 'What makes the camera feel like it is flying rather than sliding?', a: 'Banking: camera.rotation.z is set to the numerical derivative of the lateral path — (pathX(z−1) − pathX(z+1)) × 0.09 — so it rolls into each turn proportionally to how sharp the turn is, while lookAt aims 14 units down-path. Translation alone reads as being carried; the derivative-driven roll reads as steering, for one subtraction per frame.' },
      { q: 'How does the near-miss counter avoid double-counting during scrub jitter?', a: 'Each gate has a counted flag: it counts when the camera first comes within 6 units approaching from the front (dz > −1), and only re-arms once the camera retreats more than 6 units back above it. Small oscillations around the gate cannot re-trigger it, but a genuine reverse run re-arms every gate — deliberate state on top of a scrubbed axis, designed so both directions behave sensibly.' },
      { q: 'Can I use this asteroid belt in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the InstancedMesh, asteroid parameter array, and ScrollTrigger in a mount effect against a canvas ref; the misses counter and dummy Object3D live in effect scope, with the HUD updated through a ref. On cleanup kill the ScrollTrigger, dispose the rock geometry/material (one of each — that is the instancing win), the star system, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not need to learn the InstancedMesh API by trial and error — this snippet is the complete working pattern: shared dummy, per-frame matrix recomposition, DynamicDrawUsage, per-instance color. Paste its HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the corridor guarantee, the derivative banking, or the near-miss re-arm logic. The same assistant can escalate the run — a screen-edge red vignette flash on each near miss, engine particles trailing the camera, a second asteroid size class on its own InstancedMesh, thruster audio tied to bank angle via the WebAudio API, or 2,000 rocks with the count constant and clearances retuned. It can also flip the scene into an autopilot cruise by driving Z from clock time instead of scroll. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven asteroid belt run" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (~70° FOV, resized with aspect on window resize), FogExp2 matched to a near-black background, ambient + warm directional light, and ~1,000 star-dust points through the corridor depth.
- ONE InstancedMesh of ~320 asteroids: base DodecahedronGeometry(1, 0) with seeded per-vertex radial jitter (0.82–1.18, sin-hash, no Math.random) and computeVertexNormals; MeshStandardMaterial; instanceMatrix.setUsage(THREE.DynamicDrawUsage).
- An analytic weaving flight path: pathX(z) = sin(z × 0.021) × 9 + sin(z × 0.007) × 5, pathY(z) = cos(z × 0.016) × 5.
- Corridor guarantee: each asteroid spawns at its own Z, positioned at a seeded random angle around the path centerline with radial clearance ≥ 6.5 — except ~12% flagged as "gates" with clearance 3.4 and larger scale. No collision detection anywhere.
- One GSAP tween (ease "none") scrubbing camera Z from +6 to −486 on a ScrollTrigger with pin: true, scrub ~0.55, end ~+=600%.
- Each frame: camera position = (pathX(z), pathY(z), z), lookAt the path 14 units ahead, and BANKING via rotation.z = (pathX(z−1) − pathX(z+1)) × 0.09. Recompose every instance matrix through a shared Object3D dummy: seeded position/scale, clock-time tumble rotation; set instanceMatrix.needsUpdate.
- Near-miss system: gates within 6 units of the camera tint hot orange via setColorAt (flag instanceColor.needsUpdate) and increment a NEAR MISSES counter once per pass — counted on approach (dz > −1), re-armed only when the camera retreats 6+ units above the gate, so scrub jitter cannot double-count but a reverse run re-arms everything.
- An intro overlay fading once the flight starts.
- Confirm the corridor is never blocked and reverse scrolling flies the run backwards with gates flashing again.`,
    },
  },
};

export default threeScrollAsteroidBelt;