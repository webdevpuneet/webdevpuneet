const threeScrollMobiusRide = {
  id: 'three-scroll-mobius-ride',
  title: 'Three.js Scroll Möbius Strip Ride',
  lastmod: '2026-07-22',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="mob-stage" id="mobStage">
  <div class="mob-intro"><p>Scroll ↓ to ride the Möbius strip</p></div>
  <canvas id="mobCanvas"></canvas>
  <div class="mob-hud">LAP <span id="mobLap">0</span>%</div>
</section>
<section class="mob-bottom"><p>One surface. One edge. Two laps to come home.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#0b0714;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.mob-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#9d8fc2;font-size:15px;letter-spacing:.08em;text-transform:uppercase;text-align:center;padding:0 20px}
.mob-stage{height:100vh;position:relative;overflow:hidden;background:#0b0714}
.mob-intro{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;text-align:center;padding:24px;pointer-events:none;z-index:5;color:#9d8fc2;font-size:15px;letter-spacing:.08em;text-transform:uppercase;transition:opacity .4s ease}
#mobCanvas{display:block;width:100%;height:100%}
.mob-hud{position:absolute;left:24px;bottom:24px;font-variant-numeric:tabular-nums;font-size:13px;letter-spacing:.14em;color:#c084fc;text-transform:uppercase;opacity:.85}`,

  js: `const canvas = document.getElementById('mobCanvas');
const lapEl = document.getElementById('mobLap');
const introEl = document.querySelector('.mob-intro');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0b0714);
scene.fog = new THREE.FogExp2(0x0b0714, 0.02);
const camera = new THREE.PerspectiveCamera(70, 1, 0.05, 300);

scene.add(new THREE.AmbientLight(0xbfa8ff, 0.55));
const key = new THREE.DirectionalLight(0xffffff, 0.8);
key.position.set(20, 30, 10);
scene.add(key);

// Möbius parametrization. u ∈ [0, 2π) runs around the ring; v ∈ [−1, 1]
// spans the strip width; the half-twist is the u/2 term.
const R = 14, W = 3.4;
function mobiusPoint(u, v, target) {
  const half = u / 2;
  const r = R + v * W * Math.cos(half);
  target.set(r * Math.cos(u), v * W * Math.sin(half), r * Math.sin(u));
  return target;
}

// Build the strip as an indexed BufferGeometry grid over (u, v).
const SEG_U = 260, SEG_V = 10;
const stripGeo = new THREE.BufferGeometry();
const verts = new Float32Array((SEG_U + 1) * (SEG_V + 1) * 3);
const tmp = new THREE.Vector3();
for (let i = 0; i <= SEG_U; i++) {
  const u = (i / SEG_U) * Math.PI * 2;
  for (let j = 0; j <= SEG_V; j++) {
    const v = (j / SEG_V) * 2 - 1;
    mobiusPoint(u, v, tmp);
    const k = (i * (SEG_V + 1) + j) * 3;
    verts[k] = tmp.x; verts[k + 1] = tmp.y; verts[k + 2] = tmp.z;
  }
}
const idx = [];
for (let i = 0; i < SEG_U; i++) for (let j = 0; j < SEG_V; j++) {
  const a = i * (SEG_V + 1) + j, b = a + SEG_V + 1;
  idx.push(a, b, a + 1, b, b + 1, a + 1);
}
stripGeo.setIndex(idx);
stripGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
stripGeo.computeVertexNormals();
const strip = new THREE.Mesh(stripGeo, new THREE.MeshStandardMaterial({
  color: 0x4c1d95, roughness: 0.45, metalness: 0.35, side: THREE.DoubleSide,
}));
scene.add(strip);

// Edge glow: the single boundary edge of a Möbius strip is one closed
// loop that takes 4π of u to close — trace it with a Line.
const edgePts = [];
for (let i = 0; i <= SEG_U * 2; i++) {
  const u = (i / SEG_U) * Math.PI * 2; // 0 → 4π
  edgePts.push(mobiusPoint(u % (Math.PI * 2), (Math.floor(u / (Math.PI * 2)) % 2 === 0) ? 1 : -1, new THREE.Vector3()).clone());
}
const edge = new THREE.Line(
  new THREE.BufferGeometry().setFromPoints(edgePts),
  new THREE.LineBasicMaterial({ color: 0xd8b4fe, transparent: true, opacity: 0.9 })
);
scene.add(edge);

// Guide dashes on the centerline so speed is readable.
const dashes = [];
for (let i = 0; i < 36; i++) {
  const d = new THREE.Mesh(
    new THREE.BoxGeometry(0.8, 0.06, 0.28),
    new THREE.MeshBasicMaterial({ color: 0xe9d5ff, transparent: true, opacity: 0.7 })
  );
  scene.add(d);
  dashes.push(d);
}

gsap.registerPlugin(ScrollTrigger);
// The rider must travel u = 0 → 4π (two ring laps) to return to the
// start orientation — the point of a Möbius strip, and of this demo.
const ride = { u: 0 };
gsap.to(ride, {
  u: Math.PI * 4,
  ease: 'none',
  scrollTrigger: { trigger: '#mobStage', start: 'top top', end: '+=600%', scrub: 0.5, pin: true },
});

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
const P = new THREE.Vector3(), AHEAD = new THREE.Vector3(), NORM = new THREE.Vector3();
const T1 = new THREE.Vector3(), T2 = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const u = ride.u;
  if (introEl) introEl.style.opacity = u > 0.1 ? '0' : '1';

  // Rider frame: position on the centerline, look-ahead along the strip,
  // and the local surface normal from two nearby tangent samples. The
  // normal flips over one lap — the camera rolls upside down and back,
  // which IS the Möbius property, so never use a world up vector here.
  const um = u % (Math.PI * 2);
  mobiusPoint(um, 0, P);
  mobiusPoint((u + 0.14) % (Math.PI * 2), 0, AHEAD);
  mobiusPoint((u + 0.01) % (Math.PI * 2), 0, T1).sub(P);
  mobiusPoint(um, 0.01, T2).sub(P);
  NORM.crossVectors(T1, T2).normalize();
  // On the second lap the sampled v-direction is on the "other side":
  // flip the normal so the ride surface stays underfoot continuously.
  if (u > Math.PI * 2) NORM.negate();

  camera.position.copy(P).addScaledVector(NORM, 1.5);
  camera.up.copy(NORM);
  camera.lookAt(AHEAD.addScaledVector(NORM, 1.2));

  dashes.forEach((d, i) => {
    const du = (i / 36) * Math.PI * 2;
    mobiusPoint(du, 0, tmp);
    d.position.copy(tmp);
    d.lookAt(mobiusPoint((du + 0.05) % (Math.PI * 2), 0, T1));
    // Dashes near the rider glow brighter.
    const dist = Math.abs(((du - um + Math.PI * 3) % (Math.PI * 2)) - Math.PI);
    d.material.opacity = 0.25 + Math.max(0, 1 - dist * 1.5) * 0.7;
  });

  edge.material.opacity = 0.6 + Math.sin(t * 2) * 0.25;
  strip.rotation.y = 0; // strip is static; the ride supplies all motion

  lapEl.textContent = Math.round((u / (Math.PI * 4)) * 100);
  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Möbius Ride — Camera on a One-Sided Surface',
    description: 'Scroll drives a camera along a parametric Möbius strip — it rolls inverted and needs two laps to come home. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'How to Build a Scroll-Driven Möbius Strip Ride With Three.js and GSAP',
      description: `The **Three.js Scroll Möbius Strip Ride** snippet puts the camera on the centerline of a mathematically real Möbius strip and lets scroll drive it around — with the twist that makes the topology famous: after one full ring lap the camera is riding the *underside* of the surface, upside down relative to where it started, and only after a second lap (u = 4π) does it come home. GSAP's ScrollTrigger scrubs the ride parameter; the geometry, the roll, and the two-lap structure all fall out of the parametrization.

**Building the strip from its equation**

The surface is generated directly from the Möbius parametrization: for ring angle \`u\` and width coordinate \`v\`, the point is \`((R + vW·cos(u/2))·cos u, vW·sin(u/2), (R + vW·cos(u/2))·sin u)\`. The \`u/2\` half-angle is the entire secret — the strip's cross-section rotates half a turn while \`u\` makes a full turn, joining the ribbon to itself with a flip. A 260×10 grid of these points becomes an indexed \`BufferGeometry\` with \`computeVertexNormals()\`, rendered \`DoubleSide\` because a one-sided surface, ironically, needs both GL faces drawn.

**A camera frame with no world up**

Riding a surface that turns you upside down means \`camera.lookAt\` with the default world-up would fight the roll and flip violently at the poles of the twist. Instead the snippet constructs the rider's frame from the surface itself: two finite-difference tangents (one step along \`u\`, one along \`v\`) cross-multiplied into a local surface normal, the camera positioned 1.5 units along that normal, \`camera.up\` set to it, and the look-at aimed at a point further along the centerline lifted by the same normal. The camera therefore rolls exactly as the surface rolls — by the end of lap one it is fully inverted, and most viewers only notice when the fog-dimmed far side of the ring appears "above" them.

**The 4π edge and the lap-two flip**

Two details encode the topology honestly. The glowing boundary line is built by walking \`u\` from 0 to 4π while alternating the \`v = ±1\` side each lap — because a Möbius strip has exactly one edge, and that edge closes only after two circuits. And during lap two, the finite-difference normal (which always samples the same parametric side) is negated so the ride surface stays underfoot; without the flip the camera would clip through the strip the moment \`u\` crossed 2π. These are the kinds of sign subtleties that make one-sided surfaces a rite of passage.

**Speed made visible**

A camera gliding over a smooth purple ribbon has no motion cues, so 36 dash markers sit along the centerline, oriented by \`lookAt\` toward the next sample. Each dash brightens as the rider approaches — opacity derived from angular distance with proper 2π wrapping — producing a runway-light effect that communicates both speed and direction, similar in role to the recycled particles of the [scroll tunnel](/ui-snippets/three-scroll-tunnel/). The single edge pulses slowly on clock time so the scene idles alive, per this series' convention.

**Why scrub suits this topology**

The Möbius property is an experiential claim — "go around once and you are flipped" — that a fired animation asserts but a scrub *proves*: users can stop at u = 2π, look around while inverted, and back up to re-watch the roll accumulate. The [gear train](/ui-snippets/three-scroll-gear-train/) scrubs an angle and the [pendulum wave](/ui-snippets/three-scroll-pendulum-wave/) scrubs time; this scrubs a coordinate on a surface, completing the series' tour of what a single scrubbed number can be. For the straight-line cousin of this ride, see the [staircase climb](/ui-snippets/three-scroll-staircase-climb/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A pinned view sits on the purple strip\'s centerline, runway dashes ahead, the single glowing edge pulsing at both sides.' },
        { title: 'Scroll to ride', text: 'The camera glides along the ribbon while rolling with the surface — the horizon tilts continuously as the half-twist accumulates.' },
        { title: 'Pause at 50%', text: 'At one full ring lap you are riding the underside, fully inverted — look up at where you started.' },
        { title: 'Complete lap two', text: 'Only at 100% (u = 4π) does the camera return to its starting orientation — the Möbius property, proven by scroll.' },
        { title: 'Reshape the ribbon', text: 'Change R and W for ring radius and strip width, or replace u/2 with 3u/2 in mobiusPoint for a three-half-twist strip — the frame math adapts unchanged.' },
      ],
    },
    features: [
      'True Möbius parametrization — the u/2 half-angle term builds the one-sided surface from its equation',
      'Indexed 260×10 BufferGeometry grid with computed normals, rendered DoubleSide',
      'Camera frame derived from finite-difference surface tangents — camera.up follows the local normal, no world up',
      'The ride rolls fully inverted at one lap and recovers at two, experiencing the topology rather than asserting it',
      'Lap-two normal negation keeps the surface underfoot across the parametric seam',
      'Single boundary edge traced over 4π with alternating v-sides — one closed loop, as topology demands',
      '36 runway dashes brightening near the rider with proper 2π angular-distance wrapping',
      'Scrub-honest: pause inverted at the halfway point, reverse to unwind the roll',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Math education and topology pages', desc: 'The strongest possible demo of one-sidedness: students ride the flip, pause inverted, and reverse it — pair with a [pendulum wave](/ui-snippets/three-scroll-pendulum-wave/) for a physics-and-math duo.' },
      { icon: 'WEB', title: 'Infinity-themed brand loops', desc: 'Logistics, recycling, and subscription brands get a literal endless-loop hero where the journey visibly never hits an edge.' },
      { icon: 'DESIGN', title: 'Award-site signature interactions', desc: 'A camera that rolls upside down mid-scroll is a memorable centerpiece, more disorienting than a [scroll tunnel](/ui-snippets/three-scroll-tunnel/) flythrough.' },
      { icon: 'ANIM', title: 'Album, film, and title sequences', desc: 'Use the inversion moment as a narrative beat — drop a title card exactly at u = 2π when the world is upside down.' },
      { icon: 'GAME', title: 'Puzzle and perspective game promos', desc: 'Monument-Valley-adjacent games can let visitors experience impossible geometry before seeing gameplay.' },
      { icon: 'ART', title: 'Generative and kinetic art portfolios', desc: 'Present the strip as sculpture with the ride as the exhibition path, alongside pieces like the [wave ribbon](/ui-snippets/three-wave-ribbon/).' },
    ],
    faqs: [
      { q: 'Why does the camera need two full laps to return to its start?', a: 'That is the defining property of a Möbius strip. The u/2 term rotates the strip\'s cross-section half a turn per ring lap, so after u = 2π the rider is on the same surface but locally inverted — the "other side" that does not exist as a separate side. Only after 4π of travel has the accumulated roll returned to identity. The scrub lets users verify this by pausing at 50% and looking around while upside down.' },
      { q: 'Why not use camera.lookAt with the normal world up vector?', a: 'lookAt orthonormalizes against camera.up; with a fixed world up, the computed right vector degenerates as the surface rolls past 90° and the camera snaps or spins wildly. Setting camera.up to the local surface normal each frame — computed from cross(tangent-along-u, tangent-along-v) — lets the camera roll smoothly and continuously through full inversion, which is the entire point of the ride.' },
      { q: 'What is the normal flip at lap two for?', a: 'The finite-difference normal always samples the same parametric v-direction, but after u = 2π the rider is physically on the opposite face of the ribbon, where that sampled normal points into the surface. Negating it during lap two keeps the camera hovering 1.5 units above the face underfoot instead of clipping through the strip at the seam. It is a one-line fix for a sign error that is invisible until it teleports the camera.' },
      { q: 'Why is the boundary edge traced from u = 0 to 4π?', a: 'A Möbius strip has exactly one edge: follow the v = +1 border around the ring and you arrive at v = −1 of your starting point, needing a second lap to close the loop. The edge line walks u through 4π while alternating which v-extreme it samples per lap, producing the single closed loop. Drawing two separate v = ±1 circles would render the topology of a cylinder — visibly wrong once you know what to look for.' },
      { q: 'Can I use this Möbius ride in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the parametric geometry, dashes, and ScrollTrigger in a mount effect against a canvas ref, reusing the module-scope scratch vectors as effect-scope consts. On cleanup kill the ScrollTrigger, dispose the strip and edge geometries, dash geometries/materials, and call renderer.dispose(). The ride value lives in a plain object — never React state.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to fight quaternion flips and sign errors alone — this snippet already contains the two subtle fixes (surface-normal camera.up and the lap-two negation) that make riding a one-sided surface work. Paste its HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the u/2 half-twist term, why the boundary edge needs 4π to close, or what breaks with a world-up lookAt. The same assistant can extend the ride — a trefoil-knot path using the same finite-difference frame technique, strip vertex colors that reveal "sides" as the rider passes, a HUD arrow proving inversion by pointing at world-up, or three half-twists (3u/2) to compare topologies. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven Möbius strip ride" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a canvas, WebGLRenderer, PerspectiveCamera (~70° FOV, resized with aspect on window resize), FogExp2 matched to a dark background, ambient + directional light.
- A mobiusPoint(u, v, target) function implementing the standard parametrization with ring radius R ≈ 14 and half-width W ≈ 3.4: r = R + vW·cos(u/2); position = (r·cos u, vW·sin(u/2), r·sin u).
- The strip as an indexed BufferGeometry: a 260×10 grid over u ∈ [0, 2π], v ∈ [−1, 1], two triangles per cell, computeVertexNormals(), MeshStandardMaterial with side: THREE.DoubleSide.
- The single boundary edge as one THREE.Line built by walking u from 0 to 4π while alternating the v = ±1 side each lap — one closed loop, not two circles — with slowly pulsing opacity.
- 36 small dash markers along the centerline, each oriented by lookAt toward the next centerline sample, brightening near the rider using angular distance with correct 2π wrapping.
- One GSAP tween (ease "none") scrubbing the ride parameter u from 0 to 4π (TWO ring laps) on a ScrollTrigger with pin: true, scrub ~0.5, end ~+=600%.
- Rider frame each frame WITHOUT any world up vector: position = centerline point + 1.5 × local normal, where the normal = normalize(cross(finite-difference tangent along u, finite-difference tangent along v)); set camera.up to that normal; lookAt a point ~0.14 rad ahead lifted by the same normal. NEGATE the normal during the second lap (u > 2π) so the surface stays underfoot across the parametric seam.
- A LAP % HUD showing u / 4π, and an intro overlay fading once u passes ~0.1.
- Confirm: at 50% scroll the camera is fully inverted relative to its start; at 100% it has returned to the starting orientation; reverse scrolling unwinds the roll smoothly.`,
    },
  },
};

export default threeScrollMobiusRide;