const threeScrollMobiusRide = {
  id: 'three-scroll-mobius-ride',
  title: 'Three.js Scroll Möbius Strip Ride',
  lastmod: '2026-11-27',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="mob-stage" id="mobStage">
  <canvas id="mobCanvas"></canvas>
  <div class="mob-vignette"></div>
  <div class="mob-intro" id="mobIntro">
    <p class="mob-kicker">One surface · one edge</p>
    <h2>The Möbius Ride</h2>
    <p class="mob-hint">Scroll to ride <span class="mob-mouse"><i></i></span></p>
  </div>
  <p class="mob-caption" id="mobCaption"></p>
  <div class="mob-hud">
    <div class="mob-hud-row">
      <span>LAP <b id="mobLapNo">1</b>/2</span>
      <span>ROLL <b id="mobRoll">0</b>°</span>
      <span><b id="mobLap">0</b>%</span>
    </div>
    <div class="mob-bar"><i id="mobBar"></i><em></em></div>
  </div>
</section>
<section class="mob-bottom">
  <p class="mob-kicker">Back where you started</p>
  <h2>Two laps. One side. No edge you can fall off.</h2>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#07040f;color:#fff;font-family:system-ui,-apple-system,sans-serif}
.mob-stage{height:100vh;position:relative;overflow:hidden;background:radial-gradient(ellipse at 50% 35%,#2a1450 0%,#120826 45%,#07040f 100%)}
#mobCanvas{display:block;width:100%;height:100%}
.mob-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,transparent 55%,rgba(4,2,10,.75) 100%)}
.mob-intro{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px;pointer-events:none;z-index:5;background:radial-gradient(ellipse at center,rgba(7,4,15,.55) 0%,transparent 60%);transition:opacity .5s ease,transform .5s ease}
.mob-intro.is-hidden{opacity:0;transform:translateY(-20px)}
.mob-intro h2{font-size:clamp(34px,6vw,72px);font-weight:800;letter-spacing:-.02em;line-height:1;background:linear-gradient(90deg,#67e8f9,#c084fc 50%,#f472b6);-webkit-background-clip:text;background-clip:text;color:transparent}
.mob-kicker{font-size:12px;letter-spacing:.3em;text-transform:uppercase;color:#a78bfa}
.mob-hint{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#d8ccf5}
.mob-mouse{width:18px;height:28px;border:2px solid #d8ccf5;border-radius:10px;position:relative}
.mob-mouse i{position:absolute;left:50%;top:5px;width:3px;height:6px;margin-left:-1.5px;border-radius:2px;background:#67e8f9;animation:mobWheel 1.4s ease-in-out infinite}
@keyframes mobWheel{0%{opacity:0;transform:translateY(0)}30%{opacity:1}100%{opacity:0;transform:translateY(9px)}}
.mob-caption{position:absolute;left:50%;top:9%;transform:translateX(-50%);width:min(90%,560px);text-align:center;font-size:clamp(15px,2vw,20px);font-weight:600;color:#f5f0ff;text-shadow:0 2px 18px rgba(0,0,0,.8);pointer-events:none;z-index:4;opacity:0;transition:opacity .35s ease}
.mob-hud{position:absolute;left:24px;bottom:24px;width:min(calc(100% - 48px),300px);padding:12px 16px;border-radius:14px;background:rgba(14,8,30,.55);border:1px solid rgba(192,132,252,.25);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);z-index:4}
.mob-hud-row{display:flex;justify-content:space-between;font-size:11px;letter-spacing:.16em;color:#a78bfa;font-variant-numeric:tabular-nums}
.mob-hud-row b{color:#fff;font-weight:700}
.mob-bar{position:relative;height:4px;margin-top:10px;border-radius:4px;background:rgba(255,255,255,.1);overflow:hidden}
.mob-bar i{position:absolute;inset:0 auto 0 0;width:0;background:linear-gradient(90deg,#67e8f9,#c084fc,#f472b6);border-radius:4px;box-shadow:0 0 12px #c084fc}
.mob-bar em{position:absolute;left:50%;top:0;bottom:0;width:2px;margin-left:-1px;background:rgba(255,255,255,.55)}
.mob-bottom{min-height:80vh;display:flex;flex-direction:column;gap:14px;justify-content:center;align-items:center;text-align:center;padding:0 24px;background:linear-gradient(#07040f,#140a2a)}
.mob-bottom h2{max-width:640px;font-size:clamp(24px,3.6vw,40px);font-weight:700;line-height:1.2;color:#f5f0ff}
@media (max-width:600px){.mob-hud{left:16px;right:16px;top:16px;bottom:auto;width:auto;padding:10px 12px}.mob-caption{top:13%}.mob-hud-row{font-size:10px;letter-spacing:.1em}}
@media (prefers-reduced-motion:reduce){.mob-mouse i{animation:none}}`,

  js: `const canvas = document.getElementById('mobCanvas');
const introEl = document.getElementById('mobIntro');
const captionEl = document.getElementById('mobCaption');
const lapEl = document.getElementById('mobLap');
const lapNoEl = document.getElementById('mobLapNo');
const rollEl = document.getElementById('mobRoll');
const barEl = document.getElementById('mobBar');

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x140a2a, 0.022);
const camera = new THREE.PerspectiveCamera(72, 1, 0.05, 400);

scene.add(new THREE.HemisphereLight(0xc4b5fd, 0x1e1b4b, 0.75));
const key = new THREE.DirectionalLight(0xffffff, 0.6);
key.position.set(20, 30, 10);
scene.add(key);
const shipLight = new THREE.PointLight(0xf472b6, 2.2, 9, 2);
scene.add(shipLight);

// Möbius parametrization. u runs around the ring, v in [-1, 1] spans the
// strip width; the u/2 term is the half-twist.
const R = 14, W = 3.2, TAU = Math.PI * 2;
function mobiusPoint(u, v, target) {
  const half = u / 2;
  const r = R + v * W * Math.cos(half);
  return target.set(r * Math.cos(u), v * W * Math.sin(half), r * Math.sin(u));
}

// Track texture: dark deck, glowing edge rails, lane lines and a dashed
// center line. Drawn once on a canvas and repeated along the strip.
function makeTrackTexture() {
  const c = document.createElement('canvas');
  c.width = 256; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#1b1036'; g.fillRect(0, 0, 256, 256);
  g.fillStyle = 'rgba(167,139,250,.35)'; g.fillRect(0, 0, 3, 256);
  g.fillStyle = 'rgba(167,139,250,.18)'; g.fillRect(0, 62, 256, 2); g.fillRect(0, 192, 256, 2);
  g.fillStyle = '#f0abfc'; g.fillRect(0, 0, 256, 10); g.fillRect(0, 246, 256, 10);
  g.fillStyle = '#67e8f9'; g.fillRect(70, 124, 116, 8);
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  return tex;
}
const trackTex = makeTrackTexture();

// Strip: indexed grid over (u, v) with uv and a per-vertex color that
// drifts cyan -> violet -> pink around the ring.
const SEG_U = 320, SEG_V = 12, TILES = 72;
const count = (SEG_U + 1) * (SEG_V + 1);
const pos = new Float32Array(count * 3), uvs = new Float32Array(count * 2), cols = new Float32Array(count * 3);
const tmp = new THREE.Vector3(), col = new THREE.Color();
for (let i = 0; i <= SEG_U; i++) {
  const s = i / SEG_U, u = s * TAU;
  col.setHSL(0.52 + 0.4 * (0.5 - 0.5 * Math.cos(u)), 0.75, 0.62);
  for (let j = 0; j <= SEG_V; j++) {
    const v = (j / SEG_V) * 2 - 1, k = i * (SEG_V + 1) + j;
    mobiusPoint(u, v, tmp);
    pos.set([tmp.x, tmp.y, tmp.z], k * 3);
    uvs.set([s * TILES, j / SEG_V], k * 2);
    cols.set([col.r, col.g, col.b], k * 3);
  }
}
const idx = [];
for (let i = 0; i < SEG_U; i++) for (let j = 0; j < SEG_V; j++) {
  const a = i * (SEG_V + 1) + j, b = a + SEG_V + 1;
  idx.push(a, b, a + 1, b, b + 1, a + 1);
}
const stripGeo = new THREE.BufferGeometry();
stripGeo.setIndex(idx);
stripGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
stripGeo.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));
stripGeo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
stripGeo.computeVertexNormals();
const strip = new THREE.Mesh(stripGeo, new THREE.MeshStandardMaterial({
  map: trackTex, emissiveMap: trackTex, emissive: 0xffffff, emissiveIntensity: 0.55,
  vertexColors: true, roughness: 0.4, metalness: 0.3, side: THREE.DoubleSide,
}));
scene.add(strip);

// The single boundary edge: walk u from 0 to 4π (two laps) at v = +1 —
// one closed loop, because a Möbius strip has exactly one edge. Drawn as a
// neon tube plus a wider additive halo.
const edgePts = [];
for (let i = 0; i < SEG_U * 2; i++) edgePts.push(mobiusPoint((i / SEG_U) * TAU, 1.02, new THREE.Vector3()));
const edgeCurve = new THREE.CatmullRomCurve3(edgePts, true);
const edgeCore = new THREE.Mesh(new THREE.TubeGeometry(edgeCurve, 900, 0.07, 6, true), new THREE.MeshBasicMaterial({ color: 0xfbcfe8 }));
const edgeGlowMat = new THREE.MeshBasicMaterial({ color: 0xe879f9, transparent: true, opacity: 0.25, blending: THREE.AdditiveBlending, depthWrite: false });
scene.add(edgeCore, new THREE.Mesh(new THREE.TubeGeometry(edgeCurve, 900, 0.22, 8, true), edgeGlowMat));

// Rider frame on the centerline for any u in [0, 4π). The parametric v
// direction reverses at the 2π seam, so the normal is negated on lap two
// to keep the surface underfoot continuously.
const F_T1 = new THREE.Vector3(), F_T2 = new THREE.Vector3();
function frameAt(u, P, N) {
  const w = ((u % (TAU * 2)) + TAU * 2) % (TAU * 2), um = w % TAU;
  mobiusPoint(um, 0, P);
  mobiusPoint(um + 0.001, 0, F_T1).sub(P);
  mobiusPoint(um, 0.001, F_T2).sub(P);
  N.crossVectors(F_T1, F_T2).normalize();
  if (w >= TAU) N.negate();
}

// Neon gates the glider flies through — rings threaded on the ribbon.
const GATES = 20, gates = [];
const gateGeo = new THREE.TorusGeometry(W * 0.92, 0.05, 8, 64);
const gP = new THREE.Vector3(), gN = new THREE.Vector3(), gA = new THREE.Vector3();
for (let i = 0; i < GATES; i++) {
  const u = (i / GATES) * TAU;
  const m = new THREE.Mesh(gateGeo, new THREE.MeshBasicMaterial({
    color: i % 2 ? 0x67e8f9 : 0xf472b6, transparent: true, opacity: 0.5,
    blending: THREE.AdditiveBlending, depthWrite: false,
  }));
  frameAt(u, gP, gN);
  mobiusPoint(u + 0.01, 0, gA);
  m.position.copy(gP);
  m.up.copy(gN);
  m.lookAt(gA);
  m.userData.u = u;
  scene.add(m);
  gates.push(m);
}

// Glider: a flat arrowhead with a glowing underside, chased by the camera.
const shipGeo = new THREE.ConeGeometry(0.22, 0.85, 4);
shipGeo.scale(1, 1, 0.2);
shipGeo.rotateX(Math.PI / 2);
const ship = new THREE.Group();
ship.add(new THREE.Mesh(shipGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xc084fc, emissiveIntensity: 0.6, roughness: 0.3, metalness: 0.6 })));
const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 1.4), new THREE.MeshBasicMaterial({ color: 0xf472b6, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
glow.rotation.x = -Math.PI / 2;
glow.position.y = -0.1;
ship.add(glow);
scene.add(ship);

// Soft round sprite for dust and stars (default points are squares).
const dotTex = (() => {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d'), gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,.6)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = gr; g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
})();

glow.material.map = dotTex;
glow.material.needsUpdate = true;

// Drifting dust around the ring for depth and speed cues, kept out of the
// tube the camera flies through so no particle fills the screen.
const DUST = 1400, dpos = new Float32Array(DUST * 3);
for (let i = 0; i < DUST; i++) {
  let a, r, h;
  do {
    a = Math.random() * TAU; r = R + (Math.random() - 0.5) * 18; h = (Math.random() - 0.5) * 14;
  } while (Math.hypot(r - R, h) < W + 1.5);
  dpos.set([r * Math.cos(a), h, r * Math.sin(a)], i * 3);
}
const dustGeo = new THREE.BufferGeometry();
dustGeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xe9d5ff, size: 0.16, map: dotTex, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
scene.add(dust);

// Distant stars, unaffected by fog.
const STARS = 1600, spos = new Float32Array(STARS * 3);
for (let i = 0; i < STARS; i++) {
  tmp.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(140 + Math.random() * 60);
  spos.set([tmp.x, tmp.y, tmp.z], i * 3);
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(spos, 3));
scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 1.3, map: dotTex, fog: false, depthWrite: false, transparent: true, opacity: 0.85 })));

gsap.registerPlugin(ScrollTrigger);
// Two ring laps (u: 0 -> 4π) bring the rider back to the start orientation.
const ride = { u: 0 };
gsap.to(ride, {
  u: TAU * 2,
  ease: 'none',
  scrollTrigger: { trigger: '#mobStage', start: 'top top', end: '+=600%', scrub: 1, pin: true },
});

// Story captions keyed to ride progress (upper bound, text).
const CAPTIONS = [
  [0.04, ''],
  [0.18, 'The ribbon carries a single half-twist.'],
  [0.42, 'Ride it — the horizon rolls with the surface.'],
  [0.58, 'One lap. You are upside down… on the same side.'],
  [0.94, 'There is no other side. Keep going.'],
  [Infinity, 'Two laps. Home, right way up.'],
];
let lastCaption = null, captionTimer = 0;
function setCaption(p) {
  const text = CAPTIONS.find(c => p < c[0])[1];
  if (text === lastCaption) return;
  lastCaption = text;
  captionEl.style.opacity = '0';
  clearTimeout(captionTimer);
  captionTimer = setTimeout(() => {
    captionEl.textContent = text;
    captionEl.style.opacity = text ? '1' : '0';
  }, 220);
}

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.fov = camera.aspect < 0.8 ? 85 : 72;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
const P = new THREE.Vector3(), N = new THREE.Vector3();
const SP = new THREE.Vector3(), SN = new THREE.Vector3();
const LP = new THREE.Vector3(), LN = new THREE.Vector3();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();
  const u = ride.u, p = u / (TAU * 2);
  introEl.classList.toggle('is-hidden', p > 0.01);

  // Chase camera: behind and above the glider, looking down the track.
  // camera.up follows the surface normal — never a world up — so the view
  // rolls exactly as the ribbon twists.
  frameAt(u, P, N);
  frameAt(u + 0.13, SP, SN);
  frameAt(u + 0.36, LP, LN);
  camera.position.copy(P).addScaledVector(N, 1.5);
  camera.up.copy(N);
  camera.lookAt(LP.addScaledVector(LN, 0.2));

  const bob = Math.sin(t * 3) * 0.04;
  ship.position.copy(SP).addScaledVector(SN, 0.3 + bob);
  ship.up.copy(SN);
  frameAt(u + 0.16, LP, LN);
  ship.lookAt(LP.addScaledVector(LN, 0.3 + bob));
  shipLight.position.copy(ship.position).addScaledVector(SN, 0.6);
  glow.material.opacity = 0.55 + Math.sin(t * 6) * 0.15;

  // Gates light up as the glider approaches (2π-wrapped distance ahead).
  const um = u % TAU;
  gates.forEach(g => {
    const d = (((g.userData.u - um) % TAU) + TAU) % TAU;
    g.material.opacity = 0.18 + Math.max(0, 1 - d * 1.6) * 0.8;
  });

  edgeGlowMat.opacity = 0.2 + Math.sin(t * 2) * 0.08;
  dust.rotation.y = t * 0.015;

  // Roll = angle between the surface normal and world up: 0° at start,
  // 180° after one lap, back to 0° after two.
  rollEl.textContent = Math.round(Math.acos(Math.max(-1, Math.min(1, N.y))) * 180 / Math.PI);
  lapNoEl.textContent = u >= TAU ? 2 : 1;
  lapEl.textContent = Math.round(p * 100);
  barEl.style.width = (p * 100) + '%';
  setCaption(p);

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
animate();`,

  seo: {
    title: 'Three.js Scroll Möbius Ride — Neon Glider on a Twisted Track',
    description: 'Scroll a neon glider around a real Möbius strip in Three.js: the camera rolls upside down after one lap and needs two to come home. Export to React or Vue.',
    about: {
      title: 'How to Build a Scroll-Driven Möbius Strip Ride With Three.js and GSAP',
      description: `The **Three.js Scroll Möbius Strip Ride** snippet puts the camera on the centerline of a mathematically real Möbius strip and lets scroll drive it around — with the twist that makes the topology famous: after one full ring lap the camera is riding the *underside* of the surface, upside down relative to where it started, and only after a second lap (u = 4π) does it come home. GSAP's ScrollTrigger scrubs the ride parameter; the geometry, the roll, and the two-lap structure all fall out of the parametrization.

**Building the strip from its equation**

The surface is generated directly from the Möbius parametrization: for ring angle \`u\` and width coordinate \`v\`, the point is \`((R + vW·cos(u/2))·cos u, vW·sin(u/2), (R + vW·cos(u/2))·sin u)\`. The \`u/2\` half-angle is the entire secret — the strip's cross-section rotates half a turn while \`u\` makes a full turn, joining the ribbon to itself with a flip. A 320×12 grid of these points becomes an indexed \`BufferGeometry\` with uv coordinates, a per-vertex color that drifts cyan to violet to pink around the ring, and \`computeVertexNormals()\`. It is rendered \`DoubleSide\` because a one-sided surface, ironically, needs both GL faces drawn. A canvas-drawn track texture (glowing edge rails, lane lines, a dashed cyan center line) is tiled 72 times along the strip and reused as the emissive map, so the lines glow even when the rider is upside down and the key light is behind the ribbon.

**A camera frame with no world up**

Riding a surface that turns you upside down means \`camera.lookAt\` with the default world-up would fight the roll and flip violently at the poles of the twist. Instead the snippet constructs the rider's frame from the surface itself: two finite-difference tangents (one step along \`u\`, one along \`v\`) cross-multiplied into a local surface normal. A small \`frameAt(u)\` helper returns that point and normal for any \`u\` in [0, 4π), and three things use it: the chase camera sits 1.5 units above the centerline with \`camera.up\` set to the normal, a glowing arrowhead glider hovers a little further ahead with its own \`up\` and \`lookAt\` from the same frame, and the look-at target sits further down the track. The camera therefore rolls exactly as the surface rolls — by the end of lap one it is fully inverted, and the HUD's ROLL readout (the angle between the normal and world up) reads 180°.

**The 4π edge and the lap-two flip**

Two details encode the topology honestly. The neon boundary is a single \`TubeGeometry\` (plus a wider additive halo) along a closed curve built by walking \`u\` from 0 to 4π at \`v = 1\` — because \`point(u + 2π, v) = point(u, −v)\`, that one walk visits both sides of the ribbon and closes only after two circuits, exactly like the strip's single edge. And during lap two, the finite-difference normal (which always samples the same parametric side) is negated so the ride surface stays underfoot; without the flip the camera would clip through the strip the moment \`u\` crossed 2π. These are the kinds of sign subtleties that make one-sided surfaces a rite of passage.

**Speed made visible**

A camera gliding over a smooth ribbon has no motion cues, so the scene layers several. The tiled center dashes and cross lines stream past underfoot. Twenty neon rings are threaded onto the strip like gates, each one brightening as the glider approaches — opacity derived from angular distance with proper 2π wrapping — much like the recycled particles of the [scroll tunnel](/ui-snippets/three-scroll-tunnel/). Soft dust drifts around the ring (kept out of the tube the camera flies through), and fog-free stars sit far behind. The edge halo and the glider's underglow pulse on clock time so the scene idles alive, and story captions change at key moments of the ride.

**Why scrub suits this topology**

The Möbius property is an experiential claim — "go around once and you are flipped" — that a fired animation asserts but a scrub *proves*: users can stop at u = 2π, look around while inverted, and back up to re-watch the roll accumulate. The [gear train](/ui-snippets/three-scroll-gear-train/) scrubs an angle and the [pendulum wave](/ui-snippets/three-scroll-pendulum-wave/) scrubs time; this scrubs a coordinate on a surface, completing the series' tour of what a single scrubbed number can be. For the straight-line cousin of this ride, see the [staircase climb](/ui-snippets/three-scroll-staircase-climb/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the three CDN scripts', text: 'Add three.min.js, gsap.min.js, and ScrollTrigger.min.js in that order before the snippet JS.' },
        { title: 'Paste HTML, CSS, and JS', text: 'A pinned view opens on a title card over a neon track: a glowing glider ahead, the single edge rail on both sides, and gates threaded on the ribbon.' },
        { title: 'Scroll to ride', text: 'The chase camera follows the glider and rolls with the surface. The HUD shows lap, roll angle, and progress while captions narrate the twist.' },
        { title: 'Pause at 50%', text: 'At one full ring lap the ROLL readout says 180° — you are upside down, yet still on the same side of the strip.' },
        { title: 'Complete lap two', text: 'Only at 100% (u = 4π) does the camera return to its starting orientation — the Möbius property, proven by scroll.' },
        { title: 'Reshape the ribbon', text: 'Change R and W for ring radius and strip width, or replace u/2 with 3u/2 in mobiusPoint for a three-half-twist strip — the frame math adapts unchanged.' },
      ],
    },
    features: [
      'True Möbius parametrization — the u/2 half-angle term builds the one-sided surface from its equation',
      'Neon track: canvas texture used as map and emissive map, with cyan-to-pink vertex colors around the ring',
      'Chase camera and glowing glider share one frameAt(u) helper — camera.up follows the surface normal, no world up',
      'The ride rolls fully inverted at one lap and recovers at two, with a live ROLL readout to prove it',
      'Single edge drawn as one closed neon tube over 4π, plus an additive halo that pulses on clock time',
      'Twenty gate rings threaded on the ribbon light up as the glider approaches',
      'Story captions, lap counter and a progress bar with a halfway mark in a glass HUD',
      'Round-sprite dust and fog-free stars for depth; wider FOV and top HUD on narrow screens',
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
      { q: 'Why is the boundary edge traced from u = 0 to 4π?', a: 'A Möbius strip has exactly one edge: follow the v = +1 border around the ring and you arrive at v = −1 of your starting point, needing a second lap to close the loop. Because point(u + 2π, v) equals point(u, −v), walking u through 4π at v = 1 traces that whole loop, which becomes one closed neon tube. Drawing two separate v = ±1 circles would render the topology of a cylinder — visibly wrong once you know what to look for.' },
      { q: 'Can I use this Möbius ride in React, Vue, or Angular?', a: 'Yes. Export via the JSX, Vue, Angular, or Tailwind buttons. Build the geometry, gates, glider, and ScrollTrigger in a mount effect against a canvas ref, keeping the scratch vectors as effect-scope consts. On cleanup kill the ScrollTrigger, dispose every geometry, material and canvas texture, and call renderer.dispose(). The ride value lives in a plain object — never React state.' },
    ],
    aiPrompt: {
      paragraph: `You do not need to fight quaternion flips and sign errors alone — this snippet already contains the two subtle fixes (surface-normal camera.up and the lap-two negation) that make riding a one-sided surface work. Paste its HTML, CSS, and JS into an AI assistant like Claude and ask it to explain the u/2 half-twist term, why the boundary edge needs 4π to close, or what breaks with a world-up lookAt. The same assistant can extend the ride — a trefoil-knot track using the same frameAt technique, a fading light trail behind the glider, a small orbit-view minimap that shows where the rider is on the ring, or three half-twists (3u/2) to compare topologies. Treat the code as a starting point to interrogate and reshape, not a finished artifact.`,
      prompt: `Build a "scroll-driven Möbius strip ride" in plain HTML, CSS, and JavaScript using Three.js and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-viewport section with a transparent WebGLRenderer over a dark purple radial-gradient background, a vignette, PerspectiveCamera (72° FOV, 85° when the aspect is below 0.8), FogExp2, hemisphere + directional light, and a pink point light that follows the glider.
- A mobiusPoint(u, v, target) function with ring radius R ≈ 14 and half-width W ≈ 3.2: r = R + vW·cos(u/2); position = (r·cos u, vW·sin(u/2), r·sin u).
- The strip as an indexed BufferGeometry: a 320×12 grid over u ∈ [0, 2π], v ∈ [−1, 1], with uv (u tiled 72 times), a per-vertex color drifting cyan → violet → pink, computeVertexNormals(), and a MeshStandardMaterial (side: DoubleSide, vertexColors) whose map AND emissiveMap are one canvas texture: dark deck, pink edge rails, faint lane and cross lines, a cyan center dash.
- The single edge as one closed CatmullRomCurve3 built by walking u from 0 to 4π at v = 1.02, drawn as a thin bright TubeGeometry plus a wider additive halo tube whose opacity pulses with time.
- A frameAt(u, P, N) helper for u in [0, 4π): P = centerline point, N = normalize(cross(finite-difference tangent along u, tangent along v)), negated when u ≥ 2π so the surface stays underfoot across the seam. Never use a world up vector.
- Twenty additive TorusGeometry gates (radius ≈ 0.92W, alternating cyan and pink) placed with frameAt, facing along the track; each brightens as the glider nears it (2π-wrapped distance ahead).
- A glider: a 4-sided cone flattened and turned to point along +Z, with an additive soft glow plane underneath, placed 0.13 rad ahead of the camera and 0.3 above the surface with a small bob, oriented with up = N and lookAt further down the track.
- Dust: ~1400 additive round-sprite points around the ring, excluding a tube of radius W + 1.5 around the centerline; ~1600 fog-free stars on a far sphere. Make the round sprite from a radial-gradient canvas.
- One GSAP tween (ease "none") scrubbing u from 0 to 4π (TWO ring laps) on a ScrollTrigger with pin: true, scrub 1, end +=600%.
- Each frame: camera at P + 1.5N with camera.up = N, looking at the frame point 0.36 rad ahead lifted 0.2.
- UI: an intro title card ("The Möbius Ride", gradient text, animated scroll-mouse hint) that hides after 1%; story captions that cross-fade at set progress points; a glass HUD (bottom-left, top on mobile) with LAP 1/2, ROLL ° (acos of N.y), percent, and a gradient progress bar with a halfway tick; a closing section below.
- Confirm: at 50% ROLL reads ~180°; at 100% it is back near 0°; reverse scrolling unwinds the roll smoothly.`,
    },
  },
};

export default threeScrollMobiusRide;