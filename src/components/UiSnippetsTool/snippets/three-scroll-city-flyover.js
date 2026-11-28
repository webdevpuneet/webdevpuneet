const threeScrollCityFlyover = {
  id: 'three-scroll-city-flyover',
  title: 'Three.js Scroll City Flyover',
  lastmod: '2026-11-28',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="cty-stage" id="ctyStage">
  <canvas id="ctyCanvas" aria-hidden="true"></canvas>
  <div class="cty-vignette"></div>
  <div class="cty-intro" id="ctyIntro">
    <p class="cty-kicker">Night flight &middot; 02:14 AM</p>
    <h2 class="cty-title">Fly over the city</h2>
    <p class="cty-hint"><span class="cty-mouse"></span>Scroll to take off</p>
  </div>
  <div class="cty-chapters">
    <p class="cty-chapter"><b>01</b>Street level<span>Threading the main avenue</span></p>
    <p class="cty-chapter"><b>02</b>Climbing<span>Past the Meridian Tower</span></p>
    <p class="cty-chapter"><b>03</b>Cruising altitude<span>City lights to the horizon</span></p>
  </div>
  <div class="cty-hud">
    <div><small>ALT</small><strong id="ctyAlt">0</strong><em>m</em></div>
    <div><small>SPD</small><strong id="ctySpd">0</strong><em>km/h</em></div>
    <div class="cty-track"><i id="ctyBar"></i></div>
  </div>
</section>
<section class="cty-bottom">
  <p class="cty-kicker">Flight complete</p>
  <h2>Cruising above the rooftops.</h2>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html,body{background:#04050c;color:#fff;font-family:system-ui,-apple-system,"Segoe UI",sans-serif}
.cty-stage{height:100vh;position:relative;overflow:hidden;background:#04050c}
#ctyCanvas{display:block;width:100%;height:100%}
.cty-vignette{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 55%,transparent 55%,rgba(2,3,10,.75) 100%)}
.cty-intro{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px;pointer-events:none;transition:opacity .5s ease,transform .5s ease}
.cty-intro.is-hidden{opacity:0;transform:translateY(-14px)}
.cty-kicker{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:#facc15}
.cty-title{font-size:clamp(36px,6.5vw,76px);font-weight:800;letter-spacing:-.02em;line-height:1;text-shadow:0 4px 30px rgba(0,0,0,.65)}
.cty-hint{display:flex;align-items:center;gap:10px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:#aab1d6}
.cty-mouse{width:18px;height:28px;border:2px solid #aab1d6;border-radius:10px;position:relative}
.cty-mouse::after{content:"";position:absolute;left:50%;top:5px;width:3px;height:6px;margin-left:-1.5px;border-radius:2px;background:#facc15;animation:ctyWheel 1.6s ease-in-out infinite}
@keyframes ctyWheel{0%{transform:translateY(0);opacity:1}70%{transform:translateY(9px);opacity:0}100%{opacity:0}}
.cty-chapters{position:absolute;left:clamp(20px,4vw,48px);top:clamp(20px,6vh,56px);pointer-events:none}
.cty-chapter{position:absolute;left:0;top:0;white-space:nowrap;font-size:clamp(22px,2.8vw,32px);font-weight:700;letter-spacing:-.01em;opacity:0;transform:translateY(10px);transition:opacity .5s ease,transform .5s ease;text-shadow:0 2px 18px rgba(0,0,0,.7)}
.cty-chapter.is-on{opacity:1;transform:none}
.cty-chapter b{display:block;font-size:12px;letter-spacing:.24em;color:#facc15;margin-bottom:8px}
.cty-chapter span{display:block;font-size:14px;font-weight:400;letter-spacing:0;color:#aab1d6;margin-top:6px}
.cty-hud{position:absolute;left:clamp(16px,4vw,48px);bottom:clamp(16px,4vh,40px);display:flex;gap:24px;align-items:flex-end;padding:12px 18px 18px;border:1px solid rgba(250,204,21,.25);border-radius:12px;background:rgba(6,8,20,.55);-webkit-backdrop-filter:blur(6px);backdrop-filter:blur(6px);font-variant-numeric:tabular-nums}
.cty-hud small{display:block;font-size:10px;letter-spacing:.22em;color:#7c83a6;margin-bottom:2px}
.cty-hud strong{font-size:22px;font-weight:700;color:#facc15}
.cty-hud em{font-style:normal;font-size:11px;color:#aab1d6;margin-left:3px}
.cty-track{position:absolute;left:18px;right:18px;bottom:8px;height:2px;background:rgba(255,255,255,.12);border-radius:2px;overflow:hidden}
.cty-track i{display:block;height:100%;width:100%;background:#facc15;transform:scaleX(0);transform-origin:left}
.cty-bottom{min-height:70vh;display:flex;flex-direction:column;gap:12px;justify-content:center;align-items:center;text-align:center;padding:40px 24px;background:linear-gradient(#04050c,#0b0b1e)}
.cty-bottom h2{font-size:clamp(26px,4vw,44px);font-weight:800;letter-spacing:-.01em}
@media (max-width:600px){.cty-hud{gap:16px}.cty-hud strong{font-size:18px}}
@media (prefers-reduced-motion:reduce){.cty-mouse::after{animation:none}.cty-intro,.cty-chapter{transition:none}}`,

  js: `const stage = document.getElementById('ctyStage');
const canvas = document.getElementById('ctyCanvas');
const altEl = document.getElementById('ctyAlt');
const spdEl = document.getElementById('ctySpd');
const barEl = document.getElementById('ctyBar');
const introEl = document.getElementById('ctyIntro');
const chapters = Array.from(document.querySelectorAll('.cty-chapter'));
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Seeded random so the skyline is identical on every load.
let seed = 7;
function rand() {
  seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
const maxAniso = renderer.capabilities.getMaxAnisotropy();

// Fog uses the sky's horizon colour so distant blocks melt into the sky.
const HORIZON = 0x161230;
const scene = new THREE.Scene();
scene.background = new THREE.Color(HORIZON);
scene.fog = new THREE.FogExp2(HORIZON, 0.0085);
const camera = new THREE.PerspectiveCamera(62, 1, 0.1, 1400);

scene.add(new THREE.HemisphereLight(0x8a9cff, 0x0a0a12, 0.55));
const moonLight = new THREE.DirectionalLight(0xc8d8ff, 0.45);
moonLight.position.set(-300, 260, -500);
scene.add(moonLight);

// ---------- shared canvas textures ----------
function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.18, 'rgba(255,255,255,0.85)');
  grd.addColorStop(0.45, 'rgba(255,255,255,0.22)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}
const dotTex = glowTexture();

function moonTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, 'rgba(255,248,231,1)');
  grd.addColorStop(0.17, 'rgba(255,246,225,1)');
  grd.addColorStop(0.2, 'rgba(255,236,200,0.35)');
  grd.addColorStop(0.5, 'rgba(190,170,255,0.08)');
  grd.addColorStop(1, 'rgba(190,170,255,0)');
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}

// One 256px window atlas for every building. Each cell has a 3px black
// frame, so column 0-2 is always dark and doubles as the roof colour.
const CELL = 16;
const winCanvas = document.createElement('canvas');
winCanvas.width = winCanvas.height = 256;
const wctx = winCanvas.getContext('2d');
const WARM = ['#ffd27a', '#ffc35c', '#ffe3a6'];
const COOL = ['#8fd3ff', '#b9e4ff'];
function paintCell(cx, cy, on, rnd) {
  wctx.globalAlpha = 1;
  wctx.fillStyle = '#000';
  wctx.fillRect(cx * CELL, cy * CELL, CELL, CELL);
  if (!on) return;
  const pal = rnd() < 0.28 ? COOL : WARM;
  wctx.fillStyle = pal[Math.floor(rnd() * pal.length)];
  wctx.globalAlpha = 0.5 + rnd() * 0.5;
  wctx.fillRect(cx * CELL + 3, cy * CELL + 3, CELL - 6, CELL - 5);
  wctx.globalAlpha = 1;
}
for (let cy = 0; cy < 16; cy++) {
  const darkFloor = rand() < 0.18;
  for (let cx = 0; cx < 16; cx++) paintCell(cx, cy, !darkFloor && rand() < 0.42, rand);
}
const windowTex = new THREE.CanvasTexture(winCanvas);
windowTex.wrapS = windowTex.wrapT = THREE.RepeatWrapping;
windowTex.anisotropy = maxAniso;

function roadTexture() {
  const c = document.createElement('canvas');
  c.width = 128; c.height = 256;
  const g = c.getContext('2d');
  g.fillStyle = '#0a0b13'; g.fillRect(0, 0, 128, 256);
  g.fillStyle = '#2a2d44'; g.fillRect(3, 0, 3, 256); g.fillRect(122, 0, 3, 256);
  g.fillStyle = '#c9a545'; g.fillRect(61, 0, 2, 256); g.fillRect(65, 0, 2, 256);
  g.fillStyle = '#4a4e6c';
  for (let y = 0; y < 256; y += 64) { g.fillRect(32, y, 2, 32); g.fillRect(94, y, 2, 32); }
  const t = new THREE.CanvasTexture(c);
  t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = maxAniso;
  return t;
}

// ---------- sky: gradient dome, stars and moon follow the camera ----------
const skyGroup = new THREE.Group();
scene.add(skyGroup);
(function buildSky() {
  const R = 1000;
  const geo = new THREE.SphereGeometry(R, 32, 16);
  const p = geo.attributes.position;
  const col = new Float32Array(p.count * 3);
  const low = new THREE.Color(HORIZON), mid = new THREE.Color(0x0b0b22), top = new THREE.Color(0x020309);
  const c = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const y = p.getY(i) / R;
    if (y < 0.06) c.copy(low);
    else if (y < 0.45) c.copy(low).lerp(mid, (y - 0.06) / 0.39);
    else c.copy(mid).lerp(top, (y - 0.45) / 0.55);
    col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const dome = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide, fog: false, depthWrite: false }));
  dome.renderOrder = -1;
  skyGroup.add(dome);

  const N = 700, sp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const th = rand() * Math.PI * 2, y = 0.1 + rand() * 0.9, r = Math.sqrt(1 - y * y);
    sp[i * 3] = Math.cos(th) * r * 950; sp[i * 3 + 1] = y * 950; sp[i * 3 + 2] = Math.sin(th) * r * 950;
  }
  const sg = new THREE.BufferGeometry();
  sg.setAttribute('position', new THREE.BufferAttribute(sp, 3));
  skyGroup.add(new THREE.Points(sg, new THREE.PointsMaterial({
    color: 0xdfe6ff, size: 2, sizeAttenuation: false, map: dotTex, transparent: true, opacity: 0.85, depthWrite: false, fog: false,
  })));

  const moon = new THREE.Sprite(new THREE.SpriteMaterial({ map: moonTexture(), transparent: true, depthWrite: false, fog: false }));
  moon.position.set(-420, 300, -800);
  moon.scale.setScalar(190);
  skyGroup.add(moon);
})();

// ---------- ground, avenue and cross streets ----------
const AVENUE = 12;          // half-width of the open avenue the flight starts in
const BLOCK = 80, STREET = 12, BLOCKS = 40;
const cityDepth = BLOCKS * BLOCK;
const ROAD_END = 60, ROAD_LEN = cityDepth + 300;

const ground = new THREE.Mesh(new THREE.PlaneGeometry(4400, 4400), new THREE.MeshStandardMaterial({ color: 0x06070e, roughness: 1 }));
ground.rotation.x = -Math.PI / 2;
ground.position.z = -1500;
scene.add(ground);

const roadTex = roadTexture();
roadTex.repeat.set(1, ROAD_LEN / 24);
const road = new THREE.Mesh(new THREE.PlaneGeometry(AVENUE * 2, ROAD_LEN), new THREE.MeshBasicMaterial({ map: roadTex }));
road.rotation.x = -Math.PI / 2;
road.position.set(0, 0.04, ROAD_END - ROAD_LEN / 2);
scene.add(road);

const crossGeo = new THREE.PlaneGeometry(300, STREET);
const crossMat = new THREE.MeshBasicMaterial({ color: 0x0d0e18 });
for (let b = 0; b < BLOCKS; b++) {
  const s = new THREE.Mesh(crossGeo, crossMat);
  s.rotation.x = -Math.PI / 2;
  s.position.set(0, 0.03, 20 - b * BLOCK - (BLOCK - STREET) - STREET / 2);
  scene.add(s);
}

// ---------- buildings: hundreds of boxes merged into a few meshes ----------
const buckets = new Map();
function addGeo(mat, geo) {
  if (!buckets.has(mat)) buckets.set(mat, []);
  buckets.get(mat).push(geo);
}
function mergeGeometries(list) {
  let vCount = 0, iCount = 0;
  list.forEach(g => { vCount += g.attributes.position.count; iCount += g.index.count; });
  const pos = new Float32Array(vCount * 3), nor = new Float32Array(vCount * 3), uv = new Float32Array(vCount * 2);
  const idx = new Uint32Array(iCount);
  let vo = 0, io = 0;
  list.forEach(g => {
    pos.set(g.attributes.position.array, vo * 3);
    nor.set(g.attributes.normal.array, vo * 3);
    uv.set(g.attributes.uv.array, vo * 2);
    const gi = g.index.array;
    for (let i = 0; i < gi.length; i++) idx[io + i] = gi[i] + vo;
    vo += g.attributes.position.count;
    io += gi.length;
    g.dispose();
  });
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  out.setIndex(new THREE.BufferAttribute(idx, 1));
  return out;
}

function towerMat(tint) {
  return new THREE.MeshStandardMaterial({
    color: 0x0d0f1d, roughness: 0.8, metalness: 0.2,
    emissive: tint, emissiveMap: windowTex, emissiveIntensity: 1.1,
  });
}
const sideMats = [towerMat(0xffffff), towerMat(0xcfe0ff), towerMat(0xffd9c2)];
const landmarkMat = towerMat(0xbfe3ff);
const neonMats = [0x22d3ee, 0xf472b6, 0xa78bfa].map(c => new THREE.MeshBasicMaterial({ color: c }));
const antennaMat = new THREE.MeshBasicMaterial({ color: 0x1a1d2c });
const warnPositions = [];

// A neon rim is four thin bars round the roof edge, so it reads as a
// glowing outline from above instead of a solid coloured slab.
function addRim(x, top, z, w, d, mat, t) {
  [[w + t, t, 0, d / 2], [w + t, t, 0, -d / 2], [t, d + t, w / 2, 0], [t, d + t, -w / 2, 0]].forEach(([bw, bd, dx, dz]) => {
    const bar = new THREE.BoxGeometry(bw, t, bd);
    bar.translate(x + dx, top + t / 2, z + dz);
    addGeo(mat, bar);
  });
}

const TILE = 16;            // world units per texture tile = 1 unit per window
const ROOF_U = 1.5 / 256;   // a pixel inside the always-black cell frame
function addBuilding(x, z, w, d, h, y0, mat) {
  const geo = new THREE.BoxGeometry(w, h, d);
  const uv = geo.attributes.uv;
  const ox = Math.floor(rand() * 16) / 16, oy = Math.floor(rand() * 16) / 16;
  const face = [[d, h], [d, h], [w, d], [w, d], [w, h], [w, h]];
  for (let f = 0; f < 6; f++) {
    const roof = f === 2 || f === 3;
    const su = Math.max(1, Math.round(face[f][0])) / TILE;
    const sv = Math.max(1, Math.round(face[f][1])) / TILE;
    for (let v = f * 4; v < f * 4 + 4; v++) {
      if (roof) uv.setXY(v, ROOF_U, 0.5);
      else uv.setXY(v, uv.getX(v) * su + ox, uv.getY(v) * sv + oy);
    }
  }
  geo.translate(x, y0 + h / 2, z);
  addGeo(mat || sideMats[Math.floor(rand() * sideMats.length)], geo);
  const top = y0 + h;
  if (rand() < 0.2) addRim(x, top, z, w, d, neonMats[Math.floor(rand() * neonMats.length)], 0.6);
  if (h > 55 && !mat) {
    const ant = new THREE.CylinderGeometry(0.18, 0.3, 7, 6);
    ant.translate(x, top + 3.5, z);
    addGeo(antennaMat, ant);
    warnPositions.push(x, top + 7.3, z);
  }
}

// Landmark: a stepped tower with a spire, beacon and sweeping searchlights.
const LANDMARK = { x: -52, z: -1010 };
const tiers = [[28, 90, 0], [21, 65, 90], [14, 45, 155]];
tiers.forEach(([s, h, y0]) => {
  addBuilding(LANDMARK.x, LANDMARK.z, s, s, h, y0, landmarkMat);
  addRim(LANDMARK.x, y0 + h, LANDMARK.z, s, s, neonMats[0], 0.8);
});
const spire = new THREE.CylinderGeometry(0.4, 2.2, 42, 8);
spire.translate(LANDMARK.x, 221, LANDMARK.z);
addGeo(antennaMat, spire);
warnPositions.push(LANDMARK.x, 243, LANDMARK.z);

for (let b = 0; b < BLOCKS; b++) {
  const z0 = 20 - b * BLOCK;
  const depth = BLOCK - STREET;
  [-1, 1].forEach(sign => {
    let cursor = AVENUE + 2 + rand() * 3;
    while (cursor < 170) {
      const w = 7 + rand() * 11;
      const x = sign * (cursor + w / 2);
      const mid = z0 - depth / 2;
      const parts = rand() < 0.45 ? [[z0, mid + 1], [mid - 1, z0 - depth]] : [[z0, z0 - depth]];
      const near = cursor < 40;
      parts.forEach(([za, zb]) => {
        const inset = 1 + rand() * 3;
        const d = Math.abs(za - zb) - inset * 2;
        const zc = (za + zb) / 2;
        if (Math.hypot(x - LANDMARK.x, zc - LANDMARK.z) < 42) return;
        let h = 10 + Math.pow(rand(), 1.7) * (near ? 40 : 65);
        if (!near && rand() < 0.08) h = 95 + rand() * 45;
        addBuilding(x, zc, w - inset, d, h, 0);
      });
      cursor += w + 1.5 + rand() * 3;
    }
  });
}
buckets.forEach((list, mat) => scene.add(new THREE.Mesh(mergeGeometries(list), mat)));

const beamPivot = new THREE.Group();
beamPivot.position.set(LANDMARK.x, 200, LANDMARK.z);
scene.add(beamPivot);
const beamGeo = new THREE.ConeGeometry(16, 320, 24, 1, true);
beamGeo.translate(0, -160, 0);
beamGeo.rotateX(Math.PI);
// Vertex colours fade the beam from bright at the lamp to black at its far
// end; with additive blending black adds nothing, so the beam dissolves.
const beamCol = [];
const bp = beamGeo.attributes.position;
for (let i = 0; i < bp.count; i++) {
  const f = Math.pow(Math.max(0, 1 - bp.getY(i) / 320), 1.6);
  beamCol.push(f, f, f);
}
beamGeo.setAttribute('color', new THREE.Float32BufferAttribute(beamCol, 3));
const beamMat = new THREE.MeshBasicMaterial({
  color: 0x9fd4ff, vertexColors: true, transparent: true, opacity: 0.16, side: THREE.DoubleSide,
  blending: THREE.AdditiveBlending, depthWrite: false, fog: false,
});
[0, Math.PI].forEach(a => {
  const arm = new THREE.Group();
  arm.rotation.y = a;
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.z = 0.5;
  arm.add(beam);
  beamPivot.add(arm);
});

// ---------- lights: streetlamps, traffic, rooftop warning lamps ----------
function glowPoints(arr, color, size) {
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(arr, 3));
  const pts = new THREE.Points(geo, new THREE.PointsMaterial({
    color, size, map: dotTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
  }));
  scene.add(pts);
  return pts;
}

const lamps = [];
for (let z = ROAD_END; z > ROAD_END - ROAD_LEN; z -= 22) lamps.push(-AVENUE + 0.6, 6, z, AVENUE - 0.6, 6, z - 11);
glowPoints(new Float32Array(lamps), 0xffb45a, 2.6);

// Each car is a pair of dots; headlights drive toward the camera, tail lights away.
function makeTraffic(color, lanes, dir) {
  const CARS = 150;
  const arr = new Float32Array(CARS * 6), speeds = new Float32Array(CARS);
  for (let i = 0; i < CARS; i++) {
    const lane = lanes[i % lanes.length], z = ROAD_END - rand() * ROAD_LEN;
    arr.set([lane - 0.6, 0.7, z, lane + 0.6, 0.7, z], i * 6);
    speeds[i] = (0.35 + rand() * 0.35) * dir;
  }
  return { pts: glowPoints(arr, color, 1.5), speeds };
}
const traffic = [
  makeTraffic(0xfff4d6, [-3, -8.5], 1),
  makeTraffic(0xff3b3b, [3, 8.5], -1),
];
const warnLights = glowPoints(new Float32Array(warnPositions), 0xff2a2a, 3.2);

// Speed streaks: line segments whose length follows camera velocity.
const STREAKS = 90;
const heads = [];
for (let i = 0; i < STREAKS; i++) heads.push(new THREE.Vector3((rand() - 0.5) * 180, rand() * 120, 40 - rand() * 380));
const streakGeo = new THREE.BufferGeometry();
streakGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(STREAKS * 6), 3));
const streakMat = new THREE.LineBasicMaterial({ color: 0xcfe6ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const streaks = new THREE.LineSegments(streakGeo, streakMat);
streaks.frustumCulled = false;
scene.add(streaks);

// ---------- flight path: down the avenue, past the tower, up over the city ----------
const path = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0, 5, 40),
  new THREE.Vector3(1.5, 7, -160),
  new THREE.Vector3(-2, 16, -400),
  new THREE.Vector3(4, 55, -700),
  new THREE.Vector3(-8, 118, -980),
  new THREE.Vector3(6, 150, -1350),
  new THREE.Vector3(0, 168, -1800),
], false, 'centripetal');

gsap.registerPlugin(ScrollTrigger);
const flight = { t: 0 };
gsap.to(flight, {
  t: 1,
  ease: 'none',
  scrollTrigger: { trigger: stage, start: 'top top', end: '+=600%', scrub: reduceMotion ? true : 1, pin: true },
});

const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
stage.addEventListener('pointermove', e => {
  if (e.pointerType !== 'mouse') return;
  const r = stage.getBoundingClientRect();
  pointer.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
  pointer.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
});
stage.addEventListener('pointerleave', () => { pointer.x = pointer.y = 0; });

let visible = true;
new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }).observe(stage);

function resize() {
  const w = canvas.clientWidth, h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const clock = new THREE.Clock();
const pos = new THREE.Vector3(), prevPos = new THREE.Vector3(), vel = new THREE.Vector3(), dir = new THREE.Vector3();
const tan = new THREE.Vector3(), tanAhead = new THREE.Vector3();
const look = new THREE.Vector3(), lookSmooth = new THREE.Vector3();
const focus = new THREE.Vector3(LANDMARK.x, 150, LANDMARK.z);
const chapterRanges = [[0.03, 0.24], [0.3, 0.62], [0.7, 2]];
let roll = 0, speed = 0, elapsed = 0, flickerTimer = 0, primed = false;

function frame() {
  requestAnimationFrame(frame);
  const dt = Math.min(clock.getDelta(), 0.05);
  if (!visible) return;
  const k = dt * 60;
  elapsed += dt;
  const t = flight.t;

  path.getPointAt(t, pos);
  path.getTangentAt(t, tan);
  path.getTangentAt(Math.min(t + 0.03, 1), tanAhead);
  const alt = THREE.MathUtils.clamp((pos.y - 5) / 160, 0, 1);

  // Look ahead along the path, tilt down with altitude, glance at the tower.
  pointer.sx += (pointer.x - pointer.sx) * Math.min(1, 0.05 * k);
  pointer.sy += (pointer.y - pointer.sy) * Math.min(1, 0.05 * k);
  look.copy(pos).addScaledVector(tan, 70);
  look.y -= THREE.MathUtils.lerp(3, 34, alt);
  look.lerp(focus, Math.max(0, 1 - Math.abs(pos.z - (LANDMARK.z + 60)) / 280) * 0.4);
  look.x += pointer.sx * 10;
  look.y -= pointer.sy * 6;
  if (!primed) { lookSmooth.copy(look); prevPos.copy(pos); primed = true; }
  lookSmooth.lerp(look, Math.min(1, 0.15 * k));

  camera.position.copy(pos);
  camera.lookAt(lookSmooth);
  const turn = tan.x * tanAhead.z - tan.z * tanAhead.x;
  roll += (THREE.MathUtils.clamp(-turn * 9, -0.25, 0.25) - roll) * Math.min(1, 0.06 * k);
  camera.rotateZ(roll);

  skyGroup.position.copy(pos);
  scene.fog.density = THREE.MathUtils.lerp(0.0085, 0.0022, alt);

  vel.subVectors(pos, prevPos);
  prevPos.copy(pos);
  const raw = dt > 0 ? vel.length() / dt : 0;
  speed += (raw - speed) * Math.min(1, 0.08 * k);

  // Streaks wrap around the camera; tails stretch along the direction of travel.
  dir.copy(vel).normalize();
  const len = Math.min(speed * 0.06, 26);
  streakMat.opacity = Math.min(0.6, speed / 250);
  const sa = streakGeo.attributes.position.array;
  heads.forEach((h, i) => {
    if (h.z > pos.z + 10) h.z -= 380; else if (h.z < pos.z - 370) h.z += 380;
    if (h.x > pos.x + 90) h.x -= 180; else if (h.x < pos.x - 90) h.x += 180;
    if (h.y > pos.y + 60) h.y -= 120; else if (h.y < pos.y - 60) h.y += 120;
    sa[i * 6] = h.x; sa[i * 6 + 1] = h.y; sa[i * 6 + 2] = h.z;
    sa[i * 6 + 3] = h.x + dir.x * len; sa[i * 6 + 4] = h.y + dir.y * len; sa[i * 6 + 5] = h.z + dir.z * len;
  });
  streakGeo.attributes.position.needsUpdate = true;

  if (!reduceMotion) {
    traffic.forEach(tr => {
      const a = tr.pts.geometry.attributes.position.array;
      for (let i = 0; i < tr.speeds.length; i++) {
        let z = a[i * 6 + 2] + tr.speeds[i] * k;
        if (z > ROAD_END) z -= ROAD_LEN; else if (z < ROAD_END - ROAD_LEN) z += ROAD_LEN;
        a[i * 6 + 2] = z; a[i * 6 + 5] = z;
      }
      tr.pts.geometry.attributes.position.needsUpdate = true;
    });
    warnLights.material.opacity = Math.sin(elapsed * 3.2) > 0.55 ? 1 : 0.18;
    beamPivot.rotation.y += dt * 0.35;
    flickerTimer += dt;
    if (flickerTimer > 0.35) {
      flickerTimer = 0;
      for (let i = 0; i < 4; i++) paintCell(Math.floor(Math.random() * 16), Math.floor(Math.random() * 16), Math.random() < 0.45, Math.random);
      windowTex.needsUpdate = true;
    }
  }

  altEl.textContent = Math.round(pos.y);
  spdEl.textContent = Math.round(speed * 3.6);
  barEl.style.transform = 'scaleX(' + t.toFixed(4) + ')';
  introEl.classList.toggle('is-hidden', t > 0.02);
  chapters.forEach((el, i) => el.classList.toggle('is-on', t > chapterRanges[i][0] && t < chapterRanges[i][1]));

  renderer.render(scene, camera);
}

resize();
window.addEventListener('resize', resize);
frame();`,

  seo: {
    title: 'Three.js Scroll City Flyover — GSAP Night Skyline Flight',
    description: 'Scroll-driven Three.js night flight down a neon avenue, past a searchlit tower and over 1,200 lit buildings, with live traffic and a speed HUD. Free code.',
    about: {
      title: 'How to Build a Scroll-Driven Night City Flyover With Three.js and GSAP',
      description: `The **Three.js Scroll City Flyover** snippet turns a long scroll into a night flight. The camera starts at street level in the middle of a lit avenue, threads past traffic and streetlamps, climbs beside a stepped landmark tower with sweeping searchlights, then levels out high above a city that fades into a moonlit horizon. One scrubbed GSAP ScrollTrigger value drives all of it, so scrolling back up flies the exact route in reverse. Unlike the [scroll tunnel](/ui-snippets/three-scroll-tunnel/), which threads a fixed tube, this is an open 3D city that the camera moves through on a spline.

**1,200 buildings, a few dozen draw calls**

Every building is a \`THREE.BoxGeometry\` with random width, depth and height, laid out in blocks on both sides of the avenue with cross streets between them. Drawing hundreds of separate meshes would cost hundreds of draw calls, so each box is translated into world space and then merged with its neighbours into one big geometry per material. A small hand-written merge function copies the position, normal and UV arrays and offsets the index buffer, which needs no extra library. The whole skyline ends up as a handful of meshes, which keeps the frame rate steady even on laptops and phones.

**Windows from one canvas texture**

The windows are drawn once with the 2D Canvas API: a 16×16 grid of cells, some floors left fully dark, the rest lit in warm or cool tones at random brightness. That canvas becomes the \`emissiveMap\` of a \`MeshStandardMaterial\`, so the windows glow while the dark facade still takes the moonlight. To keep one shared texture across buildings of every size, the snippet rewrites each box's UVs instead of cloning textures: wall UVs are scaled to the wall's size in whole windows and shifted by a random cell offset, so no two buildings show the same pattern. Roof faces point all their UVs at a pixel inside the always-black window frame, which gives plain dark roofs without a second material. Every third of a second a few cells are repainted and the texture re-uploads, so lights switch on and off across the city.

**A spline flight with banking**

The route is a \`CatmullRomCurve3\` through seven points: low in the avenue, rising past the tower, then high over the rooftops. \`getPointAt\` places the camera and \`getTangentAt\` points it forward, with the look target tilting further down as altitude grows. Comparing the tangent now with the tangent slightly ahead gives the turn direction, which feeds a smoothed roll so the camera banks into each curve. As the camera nears the landmark, the look target is pulled toward it, so the shot glances at the tower on the way past. Moving the mouse adds a small look offset.

**Sky, fog and light**

A sphere with vertex colours makes the gradient sky, and it follows the camera together with seven hundred stars and a moon sprite. \`FogExp2\` uses the horizon colour of that sky, so far blocks melt into it instead of ending at a hard edge, and the fog thins as the camera climbs so the whole city opens up below. The glowing details are all additive \`THREE.Points\` sharing one radial glow texture: amber streetlamps along the avenue, white headlight pairs driving toward you, red tail lights driving away, and red aircraft warning lamps blinking on antennas. Two open cones on the tower's crown rotate slowly as searchlight beams.

**Speed you can feel**

Ninety line segments float around the camera and wrap into place as it moves. Their length and opacity follow the camera's real speed, measured from frame to frame, so they vanish when the scroll stops and stretch into streaks when it is fast. The same speed feeds the HUD in km/h next to the altitude, a progress bar tracks the whole flight, and three chapter captions fade in at set points of the scroll. With prefers-reduced-motion on, the scroll scrub becomes direct and the ambient motion (traffic, blinking, flicker, beams) stops. For a different scroll story in the same style, try the [rocket launch](/ui-snippets/three-scroll-rocket-launch/) or a [starfield warp](/ui-snippets/three-starfield-warp/) intro.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load all three CDN scripts', text: 'Add three.min.js, gsap.min.js and ScrollTrigger.min.js from the CDN panel, in that order, before the snippet JS.' },
        { title: 'Paste HTML, CSS and JS', text: 'The stage pins to the screen with the intro title, the avenue view, and the altitude and speed HUD in the bottom-left.' },
        { title: 'Scroll down', text: 'The camera flies down the avenue, climbs past the Meridian Tower and its searchlights, then cruises high above the city while chapter captions change.' },
        { title: 'Scroll fast, then slow', text: 'Speed streaks and the km/h read-out follow how fast you scroll; scrolling back up flies the route in reverse.' },
        { title: 'Reshape the city', text: 'Change BLOCKS, BLOCK, STREET or the height formula in the layout loop to make the city denser, taller or longer.' },
        { title: 'Change the route', text: 'Edit the points of the CatmullRomCurve3 path and the chapterRanges array to fly a different line and retime the captions.' },
      ],
    },
    features: [
      'About 1,200 box buildings merged into a few meshes by a small built-in merge function, so the skyline costs only a handful of draw calls',
      'One shared canvas window texture used as an emissiveMap, with per-building UV scaling and offsets so every facade looks different',
      'Window lights switch on and off over time by repainting a few texture cells',
      'CatmullRomCurve3 flight path from street level to cruising altitude, with banking worked out from the path curvature',
      'Landmark tower with neon trims, a spire beacon and two rotating searchlight beams',
      'Gradient sky dome, stars and moon that follow the camera, with fog matched to the horizon and thinning as you climb',
      'Live traffic (headlights and tail lights), avenue streetlamps and blinking rooftop warning lamps',
      'Speed streaks plus an altitude, km/h and progress HUD that react to scroll speed, and three chapter captions',
      'Mouse look, seeded layout, pauses rendering off screen, and respects prefers-reduced-motion',
    ],
    useCases: [
      { icon: 'WEB', title: 'Smart city and mobility products', desc: 'Traffic, streetlights and a city seen from above fit ride-sharing, delivery, parking or urban-data startups telling their story on scroll.' },
      { icon: 'ANIM', title: 'Real estate and development launches', desc: 'Rename the Meridian Tower to your project, move it on the map and let the flight glance at it as visitors scroll toward the enquiry form.' },
      { icon: 'DESIGN', title: 'Event and conference sites', desc: 'Swap the chapter captions for the city, venue and dates so the flyover becomes the hero before the schedule and tickets.' },
      { icon: 'GAME', title: 'Game and film promo pages', desc: 'The night skyline, searchlights and speed streaks give a cinematic opening before a trailer embed or wishlist button.' },
      { icon: 'ART', title: 'Creative developer portfolios', desc: 'A strong first scroll that shows WebGL, scroll scrubbing and procedural content in one piece, ready to restyle in your own colours.' },
      { icon: 'LEARN', title: 'Learning Three.js performance tricks', desc: 'A compact real example of merging geometry, sharing one texture through UV edits, and additive glow points instead of post-processing.' },
    ],
    faqs: [
      { q: 'How can hundreds of buildings run smoothly in the browser?', a: 'Each building is a box that gets moved into world space and then merged with the others into one geometry per material, so the GPU draws the whole skyline in a few calls instead of hundreds. The merge function in the snippet only copies the position, normal and UV arrays and offsets the index buffer, so no extra library is needed. The layout is built once and nothing in the geometry changes per frame; only the camera, a few small point buffers and the streak lines update.' },
      { q: 'How do the buildings get different window patterns from one texture?', a: 'Instead of cloning the texture per building, the snippet edits each box\'s UV coordinates. Wall UVs are scaled so one texture cell equals one window, and shifted by a random whole-cell offset, so every facade starts at a different place in the pattern. Roof faces point all four UVs at a pixel inside the black window frame, so roofs stay dark with the same material. The texture is used as an emissiveMap, so lit windows glow while the facade around them still takes the scene lighting.' },
      { q: 'How does the camera bank into turns?', a: 'The flight follows a CatmullRomCurve3. Each frame the snippet reads the path tangent at the current scroll position and a little ahead of it. The cross product of those two directions tells whether the path is turning left or right and how sharply, and that value is smoothed into a roll applied with camera.rotateZ after lookAt. Because it comes from the path itself, any route you draw banks correctly without extra keyframes.' },
      { q: 'Why do the speed streaks only appear when I scroll fast?', a: 'The snippet measures how far the camera moved since the last frame and turns that into a smoothed speed. The streak lines take their length and opacity from that speed, so they disappear when the page is still and stretch out on a quick scroll. The same value drives the km/h read-out in the HUD.' },
      { q: 'Can I use this Three.js city flyover in React, Vue, Angular, or Tailwind?', a: 'Yes. Click JSX for a React component, Vue for a Vue 3 SFC, Angular for a standalone component, or Tailwind for a React + Tailwind version. Build the scene and the GSAP tween inside a mount effect against a canvas ref, and on cleanup kill the ScrollTrigger (or revert a gsap.context), cancel the animation frame, disconnect the IntersectionObserver, dispose of the textures and geometries, and call renderer.dispose().' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out how a whole night city flyover fits together on your own. Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain how the buildings are merged into a few meshes, or how one window texture gives every facade a different pattern through UV edits. The same assistant can help you take it further: add a helicopter that flies alongside for part of the route, make clickable hotspots on chosen buildings that open an info card, swap the procedural layout for a real street plan from a JSON file, or add a sunrise that warms the sky and turns the windows off as the flight ends. Treat the code as a working draft to question and reshape, not a finished piece you cannot touch.`,
      prompt: `Build a "scroll-scrubbed night city flyover" in plain HTML, CSS and JavaScript using Three.js r128 and GSAP's ScrollTrigger plugin, all loaded from a CDN (no bundler, no build step).

Requirements:
- A pinned full-screen section with a canvas, a soft vignette, a centred intro (small kicker, big "Fly over the city" title, scroll hint with an animated mouse icon) that fades out once scrolling starts, three chapter captions in the top-left that fade in at set scroll ranges, and a glassy bottom-left HUD with altitude (m), speed (km/h) and a thin progress bar.
- Use a seeded random function so the city layout is the same on every load.
- Sky: a large back-side sphere with vertex colours going from a purple horizon to near-black at the top, 700 star points and a moon sprite made from a radial-gradient canvas texture; the sky group follows the camera. FogExp2 uses the horizon colour and its density drops as the camera climbs.
- Draw one 256px window texture on a 2D canvas (16x16 cells, some floors fully dark, warm and cool lit windows, a 3px black frame per cell) and use it as the emissiveMap of a dark MeshStandardMaterial in a few tints.
- Build about 1,200 BoxGeometry buildings in blocks on both sides of a central avenue with cross streets. Rewrite each box's UVs so one texture cell equals one window, with a random whole-cell offset per building, and point the roof UVs at a black frame pixel. Translate each box into place and merge them all into one geometry per material with a small custom merge function (copy position, normal and uv arrays, offset the index buffer).
- Add a landmark: a three-tier stepped tower with neon roof trims, a spire, a red beacon and two additive open cones rotating as searchlights. Add neon trims on some roofs and antennas with blinking red warning lights on tall buildings.
- Add a textured avenue road with lane markings, amber streetlamp points, and traffic as pairs of additive glow points: white headlights driving toward the camera and red tail lights driving away, wrapping along the road.
- The camera follows a CatmullRomCurve3 from street level in the avenue, past the tower, up to cruising altitude. Use getPointAt and getTangentAt with one scrubbed value t (GSAP tween, pin: true, start top top, end +=600%, scrub 1). Look ahead along the tangent, tilt down with altitude, glance toward the tower when near it, add a small mouse-look offset, and bank the camera with a smoothed roll from the cross product of the current and upcoming tangent.
- Measure camera speed from frame to frame. Use it for 90 line-segment speed streaks around the camera (length and opacity follow speed) and for the km/h read-out.
- Every few hundred milliseconds repaint a few window cells so lights switch on and off.
- Pause rendering when the section is off screen (IntersectionObserver). With prefers-reduced-motion, use scrub: true and stop the traffic, blinking, flicker, searchlight rotation and CSS animations.
- Scrolling back up must fly the whole route in reverse.`,
    },
  },
};

export default threeScrollCityFlyover;
