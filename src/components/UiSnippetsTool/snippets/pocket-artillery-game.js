const pocketArtilleryGame = {
  id: 'pocket-artillery-game',
  title: 'Pocket Artillery Tank Duel',
  lastmod: '2026-11-14',
  category: 'games',
  previewCss: '.pa-overlay{display:none}', // thumbnail only: show the field with both tanks, not the start card
  html: `<div class="pa-wrap">
  <div class="pa-header">
    <h2>Pocket Artillery</h2>
    <div class="pa-scores">
      <span class="pa-you"><span id="pa-name-you">You</span> <strong id="pa-score-you">0</strong></span>
      <span class="pa-shot" id="pa-shot">Shot 1 / 6</span>
      <span class="pa-cpu"><span id="pa-name-cpu">CPU</span> <strong id="pa-score-cpu">0</strong></span>
    </div>
  </div>

  <div class="pa-stage">
    <canvas id="pa-canvas" aria-label="Artillery battlefield with two tanks"></canvas>
    <div class="pa-overlay" id="pa-overlay">
      <p class="pa-title" id="pa-title">Pocket Artillery</p>
      <p class="pa-sub" id="pa-sub">Drag on the field to aim. Six shots each, closest blasts score most.</p>
      <div class="pa-opts">
        <div class="pa-seg" id="pa-mode" role="group" aria-label="Mode">
          <button type="button" data-v="cpu" class="on">vs CPU</button>
          <button type="button" data-v="two">2 players</button>
        </div>
        <div class="pa-seg" id="pa-diff" role="group" aria-label="CPU level">
          <button type="button" data-v="0">Easy</button>
          <button type="button" data-v="1" class="on">Normal</button>
          <button type="button" data-v="2">Hard</button>
        </div>
      </div>
      <div class="pa-btns">
        <button class="pa-btn" id="pa-play" type="button">Play</button>
        <button class="pa-btn pa-btn-alt" id="pa-daily" type="button">Daily map</button>
      </div>
      <p class="pa-best" id="pa-best"></p>
    </div>
  </div>

  <div class="pa-panel" id="pa-panel">
    <label class="pa-ctl"><span>Angle <strong id="pa-angle-val">55</strong>&deg;</span>
      <input id="pa-angle" type="range" min="0" max="180" value="55" aria-label="Angle">
    </label>
    <label class="pa-ctl"><span>Power <strong id="pa-power-val">60</strong></span>
      <input id="pa-power" type="range" min="10" max="100" value="60" aria-label="Power">
    </label>
    <button class="pa-fire" id="pa-fire" type="button">Fire!</button>
  </div>
  <div class="pa-weapons" id="pa-weapons" role="group" aria-label="Weapons"></div>
  <div class="pa-foot">
    <span>Drag the field or arrows to aim &middot; Space: fire &middot; 1-9: weapon</span>
    <button class="pa-mute" id="pa-mute" type="button" aria-pressed="false">Sound on</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef6fb; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; color: #1e293b; }

.pa-wrap { width: 100%; max-width: 640px; display: flex; flex-direction: column; gap: 10px; }
.pa-header { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.pa-header h2 { font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.pa-scores { display: flex; align-items: center; gap: 12px; font-size: 13px; font-weight: 700; color: #64748b; }
.pa-scores strong { font-size: 17px; margin-left: 3px; }
.pa-you strong { color: #e8553a; }
.pa-cpu strong { color: #3b63e0; }
.pa-shot { font-size: 11px; background: #fff; border: 1px solid #d5e2ee; border-radius: 99px; padding: 3px 10px; }

.pa-stage { position: relative; border-radius: 14px; overflow: hidden; box-shadow: 0 8px 26px rgba(60, 100, 140, 0.22); border: 2px solid #fff; }
#pa-canvas { display: block; width: 100%; aspect-ratio: 16 / 9; touch-action: none; background: #cfeaff; }

.pa-overlay { position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: min(92%, 330px); background: rgba(255, 255, 255, 0.92); border-radius: 14px; box-shadow: 0 6px 22px rgba(60, 100, 140, 0.25); display: flex; flex-direction: column; align-items: center; gap: 7px; text-align: center; padding: 10px 14px 12px; }
.pa-overlay.hide { display: none; }
.pa-title { font-size: 21px; font-weight: 800; letter-spacing: -0.02em; }
.pa-sub { font-size: 12px; line-height: 1.4; color: #475569; max-width: 360px; }
.pa-btns { display: flex; gap: 8px; }
.pa-btn { padding: 10px 24px; font-size: 14px; font-weight: 800; border: none; border-radius: 10px; background: #e8553a; color: #fff; cursor: pointer; font-family: inherit; box-shadow: 0 3px 0 #b83f28; }
.pa-btn-alt { background: #3b63e0; box-shadow: 0 3px 0 #2a47a8; }
.pa-btn:active { transform: translateY(2px); box-shadow: none; }
.pa-best { font-size: 12px; font-weight: 700; color: #64748b; min-height: 16px; }
.pa-opts { display: flex; flex-wrap: wrap; justify-content: center; gap: 8px; }
.pa-seg { display: inline-flex; background: #fff; border: 1px solid #d5e2ee; border-radius: 99px; padding: 3px; }
.pa-seg button { border: none; background: transparent; padding: 5px 12px; font-size: 12px; font-weight: 700; color: #64748b; border-radius: 99px; cursor: pointer; font-family: inherit; }
.pa-seg button.on { background: #1e293b; color: #fff; }
.pa-seg.dim { opacity: 0.35; pointer-events: none; }
.pa-btn { padding: 8px 20px; font-size: 13px; }
@media (max-width: 520px) { .pa-overlay { top: 6px; gap: 5px; padding: 6px 10px 8px; } .pa-sub { display: none; } .pa-title { font-size: 17px; } .pa-seg button { padding: 4px 9px; font-size: 11px; } .pa-btn { padding: 6px 16px; } }

.pa-panel { display: flex; align-items: flex-end; gap: 12px; flex-wrap: wrap; background: #fff; border: 1px solid #d5e2ee; border-radius: 12px; padding: 10px 12px; }
.pa-ctl { flex: 1 1 140px; display: flex; flex-direction: column; gap: 4px; font-size: 12px; font-weight: 700; color: #64748b; }
.pa-ctl strong { color: #1e293b; font-size: 14px; }
.pa-ctl input { width: 100%; accent-color: #e8553a; }
.pa-fire { padding: 11px 26px; font-size: 14px; font-weight: 800; border: none; border-radius: 10px; background: #e8553a; color: #fff; cursor: pointer; font-family: inherit; box-shadow: 0 3px 0 #b83f28; }
.pa-fire:active { transform: translateY(2px); box-shadow: none; }
.pa-panel.off { opacity: 0.5; pointer-events: none; }

.pa-weapons { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
@media (max-width: 520px) { .pa-weapons { grid-template-columns: repeat(3, 1fr); } }
.pa-weapon { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 8px 6px; font-size: 12px; font-weight: 700; font-family: inherit; color: #334155; background: #fff; border: 2px solid #d5e2ee; border-radius: 9px; cursor: pointer; }
.pa-weapon i { width: 10px; height: 10px; border-radius: 50%; flex: none; }
.pa-weapon.on { border-color: #e8553a; background: #fff3ef; }
.pa-weapon.used { opacity: 0.35; text-decoration: line-through; cursor: not-allowed; }

.pa-foot { display: flex; justify-content: space-between; align-items: center; gap: 8px; font-size: 11px; color: #64748b; font-weight: 600; }
.pa-mute { background: #fff; color: #64748b; border: 1px solid #d5e2ee; border-radius: 8px; padding: 4px 10px; font-size: 11px; font-weight: 700; cursor: pointer; font-family: inherit; }`,

  js: `const canvas = document.getElementById('pa-canvas');
const ctx = canvas.getContext('2d');
const W = 640, H = 360;
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * dpr;
canvas.height = H * dpr;
ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

const $ = id => document.getElementById(id);
const angleIn = $('pa-angle'), powerIn = $('pa-power');
const overlay = $('pa-overlay'), panel = $('pa-panel');
const GRAVITY = 0.11, WIND_K = 0.0025, POWER_K = 0.085, SHOTS = 6;

/* Nine weapons, each usable once per match. r = blast radius, pts = points for a direct hit. */
const WEAPONS = [
  { id: 'missile', name: 'Missile', r: 22, pts: 100, col: '#e8553a' },
  { id: 'big', name: 'Big Boom', r: 36, pts: 90, col: '#f59e0b' },
  { id: 'triple', name: 'Triple', r: 16, pts: 60, col: '#8b5cf6' },
  { id: 'bouncer', name: 'Bouncer', r: 24, pts: 100, col: '#10b981' },
  { id: 'nuke', name: 'Mini Nuke', r: 54, pts: 70, col: '#ef4444' },
  { id: 'roller', name: 'Roller', r: 20, pts: 110, col: '#0ea5e9' },
  { id: 'digger', name: 'Digger', r: 14, pts: 120, col: '#64748b' },
  { id: 'napalm', name: 'Napalm', r: 16, pts: 40, col: '#f97316' },
  { id: 'dirt', name: 'Dirt Ball', r: 30, pts: 0, col: '#a16207' },
];
/* Themes only change colours. The seed picks one, so the daily map always looks the same for everyone that day. */
const THEMES = [
  { name: 'Meadow', sky: ['#bfe6ff', '#fff3dc'], sun: '#ffe9a8', hills: '#d6ecd9', soil: ['#f1d5a2', '#d9a76a'], grass: '#7ccf7a', cloud: 'rgba(255,255,255,0.85)', ink: '#334155' },
  { name: 'Desert', sky: ['#ffd9a0', '#fff1d6'], sun: '#fff6c9', hills: '#f3d9b1', soil: ['#f0c27a', '#d49a4f'], grass: '#e3b862', cloud: 'rgba(255,255,255,0.6)', ink: '#5b3a1a' },
  { name: 'Snow', sky: ['#cfe3f5', '#f4f8fc'], sun: '#ffffff', hills: '#e3edf5', soil: ['#e8eef4', '#b7c6d6'], grass: '#ffffff', cloud: 'rgba(255,255,255,0.95)', ink: '#334155' },
  { name: 'Night', sky: ['#0f172a', '#3b3f73'], sun: '#e2e8f0', hills: '#27305a', soil: ['#4a4e7a', '#2a2c52'], grass: '#4fb3a0', cloud: 'rgba(148,163,184,0.25)', ink: '#e2e8f0', stars: true },
];
let theme = THEMES[0], mapKind = 'Hills';

/* CPU skill: aim error in degrees, and the chance of a bigger slip. */
const LEVELS = [{ err: 6, slip: 0.4 }, { err: 2.4, slip: 0.25 }, { err: 0.7, slip: 0.05 }];

function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

let rng = mulberry32(1);
let ground = new Float32Array(W + 1);
let tanks = [];
let turn = 0, phase = 'menu', wind = 0, sel = 0, waitFrames = 0, mode = 'cpu', diff = 1, drag = null;
let lastPath = [[], []], fires = [], isDaily = false, dly = {};
let shots = [], parts = [], rings = [], floats = [], shake = 0, muted = false, audio = null;
const clouds = [{ x: 90, y: 40, s: 1 }, { x: 330, y: 70, s: 0.8 }, { x: 540, y: 34, s: 1.2 }];
/* Hard level only: birds cross the sky. A shell that touches one is wasted: the bird drops and the turn passes on. */
const birds = [];
const birdsOn = () => mode === 'cpu' && diff === 2;
function spawnBird(b, fromEdge) {
  const dir = Math.random() < 0.5 ? 1 : -1;
  b.dir = dir; b.speed = 0.45 + Math.random() * 0.6;
  b.x = fromEdge ? (dir > 0 ? -30 : W + 30) : 40 + Math.random() * (W - 80);
  b.base = 55 + Math.random() * 100; b.y = b.base; b.ph = Math.random() * 6; b.fall = 0; b.spin = 0; b.alive = true;
  return b;
}
for (let i = 0; i < 3; i++) birds.push(spawnBird({}, false));
function birdsStep() {
  if (!birdsOn()) return;
  birds.forEach(b => {
    if (b.alive) {
      b.x += b.dir * b.speed; b.ph += 0.2; b.y = b.base + Math.sin(b.ph * 0.35) * 6;
      if (b.x < -40 || b.x > W + 40) spawnBird(b, true);
    } else {
      b.fall += 0.12; b.y += b.fall; b.x += b.dir * 0.3; b.spin += 0.25;
      if (b.y > H + 20) { spawnBird(b, true); b.x = b.dir > 0 ? -30 : W + 30; }
    }
  });
}
function birdHit(s) {
  if (!birdsOn()) return false;
  for (let i = 0; i < birds.length; i++) {
    const b = birds[i];
    if (b.alive && Math.hypot(s.x - b.x, s.y - b.y) < 12) {
      b.alive = false; b.fall = -1.2; s.dead = true;
      for (let k = 0; k < 14; k++) parts.push({ x: b.x, y: b.y, vx: (Math.random() - 0.5) * 3, vy: -Math.random() * 2, life: 30 + Math.random() * 20, col: k % 2 ? '#ffffff' : '#94a3b8' });
      floats.push({ x: b.x, y: b.y - 10, t: 50, txt: 'Bird!', col: '#64748b' });
      rings.push({ x: b.x, y: b.y, r: 4, max: 22, col: '#94a3b8' });
      tone(760, 220, 0.18, 'square', 0.07);
      return true;
    }
  }
  return false;
}
let best = 0;
try { best = Number(localStorage.getItem('pa-best')) || 0; } catch (e) {}
try { dly = JSON.parse(localStorage.getItem('pa-daily')) || {}; } catch (e) { dly = {}; }
const dayKey = d => d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
const todayKey = () => dayKey(new Date());
const prevKey = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayKey(d); };
/* Daily streak: finishing the daily map on consecutive days; a missed day resets it to 1. */
function recordDaily(score) {
  const k = todayKey();
  if (dly.last !== k) { dly.streak = dly.last === prevKey() ? (dly.streak || 0) + 1 : 1; dly.last = k; dly.today = 0; }
  dly.today = Math.max(dly.today || 0, score);
  try { localStorage.setItem('pa-daily', JSON.stringify(dly)); } catch (e) {}
}

/* ---------- sound (Web Audio, no files) ---------- */
function ensureAudio() {
  if (audio || muted) return;
  try { audio = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audio = null; }
}
function tone(f1, f2, dur, type, vol) {
  if (!audio || muted) return;
  const o = audio.createOscillator(), g = audio.createGain();
  o.type = type; o.frequency.setValueAtTime(f1, audio.currentTime);
  o.frequency.exponentialRampToValueAtTime(f2, audio.currentTime + dur);
  g.gain.setValueAtTime(vol, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + dur);
  o.connect(g); g.connect(audio.destination);
  o.start(); o.stop(audio.currentTime + dur);
}
const sfxFire = () => tone(520, 140, 0.22, 'triangle', 0.14);
const sfxBoom = big => tone(big ? 110 : 160, 30, big ? 0.55 : 0.35, 'sawtooth', 0.2);

/* ---------- map ---------- */
function buildMap(seed) {
  rng = mulberry32(seed);
  const hh = Math.imul(seed | 0, 2654435761) >>> 0;
  theme = THEMES[(hh >>> 8) % 4];
  const valley = (hh >>> 4) % 4 === 0;
  mapKind = valley ? 'Valley' : 'Hills';
  const p1 = rng() * 6, p2 = rng() * 6, p3 = rng() * 6;
  const a1 = 38 + rng() * 22, a2 = 16 + rng() * 14;
  for (let x = 0; x <= W; x++) {
    const v = H * 0.64 + Math.sin(x / 95 + p1) * a1 + Math.sin(x / 41 + p2) * a2 + Math.sin(x / 17 + p3) * 4;
    /* Valley: high ridges at both ends and a deep dip in the middle that every shot has to cross. */
    const d = Math.abs(x - W / 2) / (W / 2);
    const vv = 255 - 125 * Math.pow(d, 1.5) + Math.sin(x / 41 + p2) * 6 + Math.sin(x / 17 + p3) * 3;
    ground[x] = Math.max(120, Math.min(H - 50, valley ? vv : v));
  }
  const px = 46 + rng() * 80, cx = W - 46 - rng() * 80;
  tanks = [
    { x: px, y: ground[Math.round(px)], dy: 0, a: 55, p: 60, col: '#e8553a', dark: '#b83f28', score: 0, used: [], name: 'You' },
    { x: cx, y: ground[Math.round(cx)], dy: 0, a: 125, p: 60, col: '#3b63e0', dark: '#2a47a8', score: 0, used: [], name: 'CPU' },
  ];
  tanks.forEach(t => { t.dy = t.y; });
}

function crater(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    if (ground[x] <= cy + dy && ground[x] >= cy - dy) ground[x] = Math.min(H - 6, cy + dy);
  }
}
function addDirt(cx, cy, r) {
  for (let x = Math.max(0, Math.floor(cx - r)); x <= Math.min(W, Math.ceil(cx + r)); x++) {
    const dx = x - cx, dy = Math.sqrt(Math.max(0, r * r - dx * dx));
    const t = cy - dy * 0.85;
    if (ground[x] > t) ground[x] = Math.max(60, t);
  }
}

/* ---------- turns ---------- */
const who = () => turn % 2;
const cur = () => tanks[who()];

function startTurn() {
  wind = Math.round(rng() * 10 - 5);
  if (who() === 0 || mode === 'two') {
    phase = 'aim';
    if (cur().used[sel]) sel = WEAPONS.findIndex((w, i) => !cur().used[i]);
    syncUi();
  } else {
    phase = 'cpu';
    syncUi();
    setTimeout(cpuTurn, 900);
  }
}

function nextTurn() {
  turn++;
  if (turn >= SHOTS * 2) return endGame();
  startTurn();
}

function fire(wi) {
  const t = tanks[who()], w = WEAPONS[wi];
  t.used[wi] = true;
  lastPath[who()] = [];
  const offs = w.id === 'triple' ? [-7, 0, 7] : [0];
  offs.forEach(o => {
    const rad = (t.a + o) * Math.PI / 180, sp = t.p * POWER_K;
    shots.push({ x: t.x + Math.cos(rad) * 18, y: t.y - 12 - Math.sin(rad) * 18, vx: Math.cos(rad) * sp, vy: -Math.sin(rad) * sp, w: w, owner: who(), age: 0, bounces: 0, dead: false, trail: [], rec: o === 0 });
  });
  phase = 'fly';
  ensureAudio();
  sfxFire();
  syncUi();
}

function explode(s) {
  s.dead = true;
  const w = s.w, enemy = tanks[1 - s.owner];
  if (w.pts) {
    const d = Math.hypot(s.x - enemy.x, s.y - (enemy.y - 8)), reach = w.r + 13;
    if (d < reach) {
      const pts = Math.max(5, Math.round(w.pts * (1 - d / reach)));
      tanks[s.owner].score += pts;
      floats.push({ x: enemy.x, y: enemy.y - 24, t: 60, txt: '+' + pts, col: tanks[s.owner].col });
    }
  }
  if (w.id === 'napalm') fires.push({ x: s.x, t: 150, owner: s.owner });
  if (w.id === 'dirt') addDirt(s.x, s.y, w.r);
  else if (w.id === 'digger') { for (let i = 0; i < 5; i++) crater(s.x, s.y + i * 11, w.r); }
  else crater(s.x, s.y, w.r);
  rings.push({ x: s.x, y: s.y, r: 4, max: w.r * 1.5, col: w.col });
  const n = w.id === 'dirt' ? 14 : 24;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, v = 1 + Math.random() * 3.2;
    parts.push({ x: s.x, y: s.y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1.2, life: 30 + Math.random() * 20, col: i % 2 ? '#c99a62' : '#8fd18a' });
  }
  shake = Math.max(shake, w.r > 30 ? 9 : 4);
  sfxBoom(w.r > 30);
  syncUi();
}

function roll(s) {
  /* Roller: after landing it runs along the ground, faster downhill, and blows up on a wall, a tank or after 130 steps. */
  const dir = s.vx >= 0 ? 1 : -1, nx = s.x + dir * s.speed;
  if (nx < 0 || nx > W) { s.dead = true; return; }
  const g0 = ground[Math.round(s.x)], g1 = ground[Math.round(nx)];
  s.roll++;
  if (g1 < g0 - 5 || s.roll > 130) { explode(s); return; }
  s.speed = Math.max(1.1, Math.min(3.4, s.speed + (g1 - g0) * 0.12 - 0.01));
  s.x = nx; s.y = g1 - 3;
  if (s.roll % 3 === 0) parts.push({ x: s.x, y: g1, vx: -dir * 0.6, vy: -0.8, life: 14, col: '#c99a62' });
  for (let i = 0; i < 2; i++) {
    if (Math.hypot(s.x - tanks[i].x, s.y - (tanks[i].y - 8)) < 12) { explode(s); return; }
  }
}

function step() {
  shots.forEach(s => {
    if (s.dead) return;
    if (s.rolling) { roll(s); return; }
    s.age++;
    s.vx += wind * WIND_K; s.vy += GRAVITY;
    s.x += s.vx; s.y += s.vy;
    if (s.rec && s.age % 2 === 0) lastPath[s.owner].push({ x: s.x, y: s.y });
    if (s.age % 2 === 0) { s.trail.push({ x: s.x, y: s.y }); if (s.trail.length > 26) s.trail.shift(); }
    if (s.x < -30 || s.x > W + 30 || s.y > H + 40) { s.dead = true; return; }
    if (birdHit(s)) return;
    if (s.x >= 0 && s.x <= W) {
      const g = ground[Math.round(s.x)];
      if (s.y >= g) {
        if (s.w.id === 'bouncer' && s.bounces < 2) {
          s.y = g - 1; s.vy = -Math.abs(s.vy) * 0.62; s.vx *= 0.85; s.bounces++;
          for (let i = 0; i < 6; i++) parts.push({ x: s.x, y: g, vx: (Math.random() - 0.5) * 2, vy: -Math.random() * 2, life: 18, col: '#c99a62' });
        } else if (s.w.id === 'roller') {
          s.rolling = true; s.roll = 0; s.speed = 1.6; s.y = g - 3;
        } else { explode(s); return; }
      }
    }
    if (s.age > 6) {
      for (let i = 0; i < 2; i++) {
        if (Math.hypot(s.x - tanks[i].x, s.y - (tanks[i].y - 8)) < 11) { explode(s); return; }
      }
    }
  });
  if (phase === 'fly' && shots.every(s => s.dead)) { phase = 'wait'; waitFrames = 50; shots = []; }
  else if (phase === 'wait' && --waitFrames <= 0 && !fires.length) nextTurn();
  fires.forEach(f => {
    f.t--;
    const en = tanks[1 - f.owner];
    if (f.t % 25 === 0 && Math.abs(en.x - f.x) < 30 && Math.abs(en.y - ground[Math.max(0, Math.min(W, Math.round(f.x)))]) < 22) {
      tanks[f.owner].score += 12;
      floats.push({ x: en.x, y: en.y - 24, t: 40, txt: '+12', col: '#f97316' });
      syncUi();
    }
    if (f.t % 4 === 0) parts.push({ x: f.x + (Math.random() - 0.5) * 50, y: ground[Math.max(0, Math.min(W, Math.round(f.x)))] - 4, vx: 0, vy: -1.2, life: 16, col: '#fb923c' });
  });
  fires = fires.filter(f => f.t > 0);
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += 0.1; p.life--; });
  parts = parts.filter(p => p.life > 0);
  rings.forEach(r => { r.r += (r.max - r.r) * 0.25 + 0.5; });
  rings = rings.filter(r => r.r < r.max - 0.5);
  floats.forEach(f => { f.y -= 0.5; f.t--; });
  floats = floats.filter(f => f.t > 0);
  shake *= 0.86;
  clouds.forEach(c => { c.x += 0.05 * c.s; if (c.x > W + 60) c.x = -60; });
  tanks.forEach(t => { t.y = ground[Math.round(t.x)]; t.dy += (t.y - t.dy) * 0.25; });
}

/* ---------- CPU ---------- */
function simulate(x, y, vx, vy) {
  for (let i = 0; i < 700; i++) {
    vx += wind * WIND_K; vy += GRAVITY; x += vx; y += vy;
    if (x < 0 || x > W) return { x: x, y: H };
    if (y >= ground[Math.round(x)]) return { x: x, y: y };
    if (y > H + 40) return { x: x, y: H };
  }
  return { x: x, y: y };
}

function cpuTurn() {
  if (phase !== 'cpu') return;
  const t = tanks[1], me = tanks[0];
  const free = WEAPONS.map((w, i) => i).filter(i => !t.used[i]);
  const real = free.filter(i => WEAPONS[i].id !== 'dirt');
  const pool = real.length ? real : free;
  const wi = pool[Math.floor(Math.random() * pool.length)];
  let bestA = 120, bestP = 60, bestD = 1e9;
  if (WEAPONS[wi].id === 'dirt') {
    bestA = 100 + Math.random() * 60; bestP = 30 + Math.random() * 60;
  } else {
    for (let a = 10; a <= 170; a += 3) {
      for (let p = 25; p <= 100; p += 3) {
        const rad = a * Math.PI / 180, sp = p * POWER_K;
        const hit = simulate(t.x + Math.cos(rad) * 18, t.y - 12 - Math.sin(rad) * 18, Math.cos(rad) * sp, -Math.sin(rad) * sp);
        /* a Roller should land a little short of the target and roll the rest of the way */
        const tx = me.x + (WEAPONS[wi].id === 'roller' ? 45 : 0);
        const d = Math.hypot(hit.x - tx, hit.y - (me.y - 8));
        if (d < bestD) { bestD = d; bestA = a; bestP = p; }
      }
    }
    const lv = LEVELS[diff], e = Math.random() < lv.slip ? lv.err * 2.5 : lv.err;
    bestA += (Math.random() * 2 - 1) * e;
    bestP += (Math.random() * 2 - 1) * e * 1.3;
  }
  t.a = Math.max(0, Math.min(180, Math.round(bestA)));
  t.p = Math.max(10, Math.min(100, Math.round(bestP)));
  setTimeout(() => { if (phase === 'cpu') fire(wi); }, 650);
}

/* ---------- UI ---------- */
function syncUi() {
  $('pa-score-you').textContent = tanks.length ? tanks[0].score : 0;
  $('pa-score-cpu').textContent = tanks.length ? tanks[1].score : 0;
  $('pa-shot').textContent = 'Shot ' + Math.min(SHOTS, Math.floor(turn / 2) + 1) + ' / ' + SHOTS;
  const my = tanks.length ? (phase === 'cpu' ? tanks[1] : cur()) : null;
  if (my) {
    angleIn.value = my.a; powerIn.value = my.p;
    $('pa-angle-val').textContent = my.a; $('pa-power-val').textContent = my.p;
  }
  panel.classList.toggle('off', phase !== 'aim');
  const box = $('pa-weapons');
  if (!box.children.length) {
    WEAPONS.forEach((w, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'pa-weapon'; b.dataset.i = i;
      b.innerHTML = '<i style="background:' + w.col + '"></i>' + w.name;
      b.addEventListener('click', () => { if (phase === 'aim' && !(my && my.used[i])) { sel = i; syncUi(); } });
      box.appendChild(b);
    });
  }
  [].forEach.call(box.children, (b, i) => {
    b.classList.toggle('on', i === sel && phase === 'aim');
    b.classList.toggle('used', !!(my && my.used[i]));
  });
}

function setAim(a, p) {
  if (phase !== 'aim') return;
  if (a !== null) cur().a = Math.max(0, Math.min(180, a));
  if (p !== null) cur().p = Math.max(10, Math.min(100, p));
  syncUi();
}

/* ---------- drag to aim: pull back from the tank like a slingshot ---------- */
function pointer(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
}
function dragAim(pt) {
  const t = cur(), dx = t.x - pt.x, dy = (t.y - 14) - pt.y;
  const dist = Math.hypot(dx, dy);
  if (dist < 6) return;
  let a = Math.atan2(-dy, dx) * 180 / Math.PI;
  if (a < 0) a = dx >= 0 ? 0 : 180;
  setAim(Math.round(a), Math.round(Math.max(10, Math.min(100, dist / 1.3))));
}
canvas.addEventListener('pointerdown', e => {
  if (phase !== 'aim') return;
  canvas.setPointerCapture(e.pointerId);
  drag = pointer(e); dragAim(drag);
});
canvas.addEventListener('pointermove', e => { if (drag) { drag = pointer(e); dragAim(drag); } });
['pointerup', 'pointercancel'].forEach(n => canvas.addEventListener(n, () => { drag = null; }));
angleIn.addEventListener('input', () => setAim(Number(angleIn.value), null));
powerIn.addEventListener('input', () => setAim(null, Number(powerIn.value)));
$('pa-fire').addEventListener('click', () => { if (phase === 'aim') fire(sel); });

document.addEventListener('keydown', e => {
  if (phase !== 'aim' || (e.target && e.target.tagName === 'INPUT')) return;
  const k = e.key, big = e.shiftKey ? 5 : 1;
  if (k === 'ArrowLeft') setAim(cur().a + big, null);
  else if (k === 'ArrowRight') setAim(cur().a - big, null);
  else if (k === 'ArrowUp') setAim(null, cur().p + big);
  else if (k === 'ArrowDown') setAim(null, cur().p - big);
  else if ((k === ' ' || k === 'Enter') && !(e.target && e.target.tagName === 'BUTTON')) fire(sel);
  else if (k >= '1' && k <= '9' && !cur().used[Number(k) - 1]) { sel = Number(k) - 1; syncUi(); }
  else return;
  e.preventDefault();
});

$('pa-mute').addEventListener('click', () => {
  muted = !muted;
  $('pa-mute').textContent = muted ? 'Sound off' : 'Sound on';
  $('pa-mute').setAttribute('aria-pressed', String(muted));
});

function setupSeg(id, onPick) {
  const box = $(id);
  box.addEventListener('click', e => {
    const b = e.target.closest('button');
    if (!b) return;
    [].forEach.call(box.children, c => c.classList.toggle('on', c === b));
    onPick(b.dataset.v);
  });
}
setupSeg('pa-mode', v => { mode = v; $('pa-diff').classList.toggle('dim', v === 'two'); });
setupSeg('pa-diff', v => { diff = Number(v); });

function newGame(seed, daily) {
  isDaily = !!daily;
  birds.forEach(b => spawnBird(b, false));
  ensureAudio();
  buildMap(seed);
  if (mode === 'two') { tanks[0].name = 'P1'; tanks[1].name = 'P2'; }
  $('pa-name-you').textContent = tanks[0].name;
  $('pa-name-cpu').textContent = tanks[1].name;
  turn = 0; sel = 0; shots = []; parts = []; rings = []; floats = []; fires = []; lastPath = [[], []];
  overlay.classList.add('hide');
  startTurn();
}
function showBest() {
  const bits = [];
  if (best) bits.push('Best score: ' + best);
  if (dly.last === todayKey()) bits.push('Daily today: ' + dly.today);
  if (dly.streak && (dly.last === todayKey() || dly.last === prevKey())) bits.push('Streak: ' + dly.streak + (dly.streak > 1 ? ' days' : ' day'));
  $('pa-best').textContent = bits.join(' · ');
}
function endGame() {
  phase = 'over';
  const a = tanks[0].score, b = tanks[1].score;
  const two = mode === 'two';
  if (!two && a > best) { best = a; try { localStorage.setItem('pa-best', String(best)); } catch (e) {} }
  if (!two && isDaily) recordDaily(a);
  const n0 = two ? 'Player 1' : 'You', n1 = two ? 'Player 2' : 'CPU';
  $('pa-title').textContent = a === b ? 'Draw at ' + a : a > b ? n0 + (two ? ' wins ' : ' win! ') + a + ' to ' + b : n1 + ' wins ' + b + ' to ' + a;
  $('pa-sub').textContent = two ? 'Good duel. Swap sides and go again.' : a > b ? 'Nice shooting. Try the daily map or a fresh one.' : 'So close. Mind the wind and go again.';
  $('pa-play').textContent = 'New map';
  showBest();
  overlay.classList.remove('hide');
  syncUi();
}
$('pa-play').addEventListener('click', () => newGame(Math.floor(Math.random() * 1e9)));
$('pa-daily').addEventListener('click', () => {
  newGame(todayKey(), true);
});

/* ---------- drawing ---------- */
function cloud(x, y, s) {
  ctx.fillStyle = theme.cloud;
  ctx.beginPath();
  ctx.ellipse(x, y, 30 * s, 10 * s, 0, 0, 7);
  ctx.ellipse(x - 16 * s, y + 3 * s, 18 * s, 8 * s, 0, 0, 7);
  ctx.ellipse(x + 18 * s, y + 3 * s, 20 * s, 8 * s, 0, 0, 7);
  ctx.fill();
}

/* Ground texture: drawn once per theme on a hidden canvas (strata, speckles, pebbles), then clipped to the live terrain shape every frame so craters cut through it. */
const texCache = {};
function groundTex() {
  if (texCache[theme.name]) return texCache[theme.name];
  const c = document.createElement('canvas');
  c.width = W * dpr; c.height = H * dpr;
  const g = c.getContext('2d'), rr = mulberry32(99);
  g.scale(dpr, dpr);
  for (let b = 0; b < 8; b++) {
    const y0 = 140 + b * 30;
    g.beginPath();
    for (let x = 0; x <= W; x += 8) { const y = y0 + Math.sin(x / 55 + b * 1.7) * 6; if (x) g.lineTo(x, y); else g.moveTo(x, y); }
    g.strokeStyle = 'rgba(0,0,0,0.07)'; g.lineWidth = 3; g.stroke();
    g.translate(0, 3); g.strokeStyle = 'rgba(255,255,255,0.14)'; g.lineWidth = 1.5; g.stroke(); g.translate(0, -3);
  }
  for (let i = 0; i < 800; i++) {
    g.fillStyle = i % 3 ? 'rgba(0,0,0,0.13)' : 'rgba(255,255,255,0.3)';
    const z = 0.8 + rr() * 1.4;
    g.fillRect(rr() * W, 110 + rr() * (H - 110), z, z);
  }
  for (let i = 0; i < 46; i++) {
    const x = rr() * W, y = 125 + rr() * (H - 125), a = 2.5 + rr() * 3.5;
    g.fillStyle = 'rgba(0,0,0,0.11)'; g.beginPath(); g.ellipse(x, y, a, a * 0.65, 0, 0, 7); g.fill();
    g.fillStyle = 'rgba(255,255,255,0.3)'; g.beginPath(); g.ellipse(x - a * 0.25, y - a * 0.25, a * 0.5, a * 0.3, 0, 0, 7); g.fill();
  }
  texCache[theme.name] = c;
  return c;
}

function drawTank(t, active) {
  const y = t.dy, s = t.x < W / 2 ? 1 : -1;
  const slope = Math.atan2(ground[Math.min(W, Math.round(t.x + 9))] - ground[Math.max(0, Math.round(t.x - 9))], 18);
  ctx.save();
  ctx.translate(t.x, y); ctx.rotate(slope * 0.9);
  ctx.fillStyle = '#475569';
  ctx.beginPath(); ctx.roundRect(-14, -7, 28, 8, 4); ctx.fill();
  ctx.fillStyle = t.col;
  ctx.beginPath(); ctx.roundRect(-12, -12, 24, 8, 3); ctx.fill();
  ctx.beginPath(); ctx.arc(0, -12, 7, Math.PI, 0); ctx.fill();
  ctx.restore();
  const rad = t.a * Math.PI / 180;
  ctx.strokeStyle = t.dark; ctx.lineWidth = 4; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(t.x, y - 14); ctx.lineTo(t.x + Math.cos(rad) * 17, y - 14 - Math.sin(rad) * 17); ctx.stroke();
  ctx.fillStyle = theme.ink; ctx.font = '700 9px system-ui, sans-serif'; ctx.textAlign = 'center';
  ctx.fillText(t.name, t.x, y - 28);
  if (active) {
    const b = Math.sin(performance.now() / 180) * 2;
    ctx.fillStyle = t.col;
    ctx.beginPath(); ctx.moveTo(t.x - 5, y - 44 + b); ctx.lineTo(t.x + 5, y - 44 + b); ctx.lineTo(t.x, y - 37 + b); ctx.fill();
  }
}

function draw() {
  ctx.save();
  if (shake > 0.3) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, theme.sky[0]); sky.addColorStop(1, theme.sky[1]);
  ctx.fillStyle = sky; ctx.fillRect(-10, -10, W + 20, H + 20);
  if (theme.stars) {
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 46; i++) {
      ctx.globalAlpha = 0.45 + 0.45 * Math.abs(Math.sin(performance.now() / 700 + i * 2.1));
      ctx.fillRect((i * 97) % W, (i * 53) % 150, i % 5 === 0 ? 2 : 1.4, i % 5 === 0 ? 2 : 1.4);
    }
    ctx.globalAlpha = 1;
  }
  ctx.fillStyle = theme.sun; ctx.beginPath(); ctx.arc(W - 70, 52, 24, 0, 7); ctx.fill();
  clouds.forEach(c => cloud(c.x, c.y, c.s));
  ctx.fillStyle = theme.hills;
  ctx.beginPath(); ctx.moveTo(0, H);
  for (let x = 0; x <= W; x += 8) ctx.lineTo(x, H * 0.55 + Math.sin(x / 70 + 1) * 26 + Math.sin(x / 29) * 8);
  ctx.lineTo(W, H); ctx.fill();

  if (birdsOn()) birds.forEach(b => {
    ctx.save(); ctx.translate(b.x, b.y);
    if (b.alive) ctx.scale(b.dir, 1); else { ctx.rotate(b.spin); ctx.globalAlpha = Math.max(0.2, 1 - b.fall / 6); }
    const w = b.alive ? Math.sin(b.ph) * 6 : 5;
    ctx.strokeStyle = theme.ink; ctx.lineWidth = 2.2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.moveTo(-9, w); ctx.quadraticCurveTo(-4, -4 + w * 0.3, 0, 0); ctx.quadraticCurveTo(4, -4 + w * 0.3, 9, w); ctx.stroke();
    ctx.restore();
  });
  if (tanks.length) {
    const soil = ctx.createLinearGradient(0, 120, 0, H);
    soil.addColorStop(0, theme.soil[0]); soil.addColorStop(1, theme.soil[1]);
    ctx.fillStyle = soil;
    ctx.beginPath(); ctx.moveTo(0, H + 4);
    for (let x = 0; x <= W; x++) ctx.lineTo(x, ground[x]);
    ctx.lineTo(W, H + 4); ctx.fill();
    ctx.save(); ctx.clip(); ctx.drawImage(groundTex(), 0, 0, W, H); ctx.restore();
    /* soft shadow under the grass edge, then little grass tufts that follow the live surface */
    ctx.strokeStyle = 'rgba(0,0,0,0.12)'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) { if (x) ctx.lineTo(x, ground[x] + 6); else ctx.moveTo(x, ground[x] + 6); }
    ctx.stroke();
    ctx.strokeStyle = theme.grass; ctx.lineWidth = 5; ctx.lineJoin = 'round';
    ctx.beginPath();
    for (let x = 0; x <= W; x += 2) { if (x) ctx.lineTo(x, ground[x] + 1); else ctx.moveTo(x, ground[x] + 1); }
    ctx.stroke();

    ctx.strokeStyle = theme.grass; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
    ctx.beginPath();
    for (let x = 3; x < W; x += 5) {
      const h = 2 + ((x * 7919) % 5), gy = ground[x];
      ctx.moveTo(x, gy); ctx.lineTo(x + ((x * 31) % 3) - 1, gy - h - 1);
    }
    ctx.stroke();
    tanks.forEach((t, i) => drawTank(t, (phase === 'aim' || phase === 'cpu') && who() === i));

    if (phase === 'aim') {
      const t = cur(), rad = t.a * Math.PI / 180;
      if (drag) {
        ctx.strokeStyle = 'rgba(30,41,59,0.45)'; ctx.lineWidth = 2; ctx.setLineDash([5, 4]);
        ctx.beginPath(); ctx.moveTo(drag.x, drag.y); ctx.lineTo(t.x, t.y - 14); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = t.col; ctx.beginPath(); ctx.arc(drag.x, drag.y, 6, 0, 7); ctx.fill();
      }
      if (mode === 'cpu' && diff === 0 && lastPath[who()].length > 1) {
        /* Easy only: faint ghost of this player's previous shot, so the next aim can be corrected from it. */
        const lp = lastPath[who()];
        ctx.strokeStyle = t.col; ctx.globalAlpha = 0.3; ctx.lineWidth = 2; ctx.setLineDash([2, 5]);
        ctx.beginPath(); ctx.moveTo(lp[0].x, lp[0].y);
        for (let i = 1; i < lp.length; i++) ctx.lineTo(lp[i].x, lp[i].y);
        ctx.stroke(); ctx.setLineDash([]);
        const e = lp[lp.length - 1];
        ctx.beginPath(); ctx.arc(e.x, e.y, 4, 0, 7); ctx.stroke(); ctx.globalAlpha = 1;
      }
      if (drag && mode === 'cpu' && diff === 0) {
        /* Easy only: dotted preview of the first part of the flight, using the same gravity and wind as a real shell. */
        const sp = t.p * POWER_K;
        let px = t.x + Math.cos(rad) * 18, py = t.y - 12 - Math.sin(rad) * 18, pvx = Math.cos(rad) * sp, pvy = -Math.sin(rad) * sp;
        ctx.fillStyle = t.col;
        for (let i = 1; i <= 70; i++) {
          pvx += wind * WIND_K; pvy += GRAVITY; px += pvx; py += pvy;
          if (px < 0 || px > W || py >= ground[Math.round(px)]) break;
          if (i % 4 === 0) { ctx.globalAlpha = 0.75 - i / 110; ctx.beginPath(); ctx.arc(px, py, 2.2, 0, 7); ctx.fill(); }
        }
        ctx.globalAlpha = 1;
      }
      ctx.fillStyle = t.col; ctx.globalAlpha = 0.6;
      for (let k = 1; k <= 4; k++) { ctx.beginPath(); ctx.arc(t.x + Math.cos(rad) * (18 + k * 11), t.y - 14 - Math.sin(rad) * (18 + k * 11), 2, 0, 7); ctx.fill(); }
      ctx.globalAlpha = 1;
    }
    shots.forEach(s => {
      s.trail.forEach((p, i) => { ctx.fillStyle = 'rgba(71,85,105,' + (i / s.trail.length * 0.4) + ')'; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, 7); ctx.fill(); });
      if (!s.dead) { ctx.fillStyle = s.w.col; ctx.beginPath(); ctx.arc(s.x, s.y, 4, 0, 7); ctx.fill(); ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke(); }
    });
    fires.forEach(f => {
      const gx = ground[Math.max(0, Math.min(W, Math.round(f.x)))], fade = Math.min(1, f.t / 30), tm = performance.now() / 90;
      for (let k = -3; k <= 3; k++) {
        const h = (10 + Math.abs(Math.sin(tm + k * 1.7)) * 12) * fade, fx = f.x + k * 8;
        ctx.fillStyle = k % 2 ? '#f97316' : '#fbbf24';
        ctx.beginPath(); ctx.moveTo(fx - 6, gx + 1); ctx.lineTo(fx, gx - h); ctx.lineTo(fx + 6, gx + 1); ctx.fill();
      }
    });
    rings.forEach(r => { ctx.strokeStyle = r.col; ctx.globalAlpha = 0.6; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(r.x, r.y, r.r, 0, 7); ctx.stroke(); ctx.globalAlpha = 1; });
    parts.forEach(p => { ctx.fillStyle = p.col; ctx.globalAlpha = Math.min(1, p.life / 20); ctx.fillRect(p.x, p.y, 3, 3); ctx.globalAlpha = 1; });
    floats.forEach(f => { ctx.globalAlpha = Math.min(1, f.t / 20); ctx.fillStyle = f.col; ctx.font = '800 16px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText(f.txt, f.x, f.y); ctx.globalAlpha = 1; });

    ctx.fillStyle = 'rgba(255,255,255,0.85)';
    ctx.beginPath(); ctx.roundRect(W / 2 - 56, 8, 112, 22, 11); ctx.fill();
    ctx.fillStyle = '#334155'; ctx.font = '700 12px system-ui, sans-serif'; ctx.textAlign = 'center';
    /* one chevron per wind point, pointing the way the wind blows */
    ctx.fillText('Wind ' + (wind === 0 ? 'calm' : (wind < 0 ? '\\u2039' : '\\u203a').repeat(Math.abs(wind)) + ' ' + Math.abs(wind)), W / 2, 23);
  }
  if (tanks.length) {
    ctx.fillStyle = theme.ink; ctx.globalAlpha = 0.7; ctx.font = '700 11px system-ui, sans-serif'; ctx.textAlign = 'left';
    ctx.fillText(theme.name + ' · ' + mapKind, 10, 19); ctx.globalAlpha = 1;
  }
  ctx.restore();
}

let last = performance.now(), acc = 0;
function frame(now) {
  acc += Math.min(0.05, (now - last) / 1000); last = now;
  while (acc >= 1 / 60) { birdsStep(); if (tanks.length && phase !== 'menu') step(); acc -= 1 / 60; }
  draw();
  requestAnimationFrame(frame);
}

buildMap(20261113);
phase = 'menu';
syncUi();
showBest();
requestAnimationFrame(frame);`,

  seo: {
    title: 'Pocket Artillery – Free HTML, CSS & JS Tank Duel Game',
    description: 'Artillery tank duel in plain JavaScript: drag to aim, destructible terrain, wind, 9 weapons, 3 CPU levels, daily streak. Free canvas game code to copy.',
    about: {
      title: 'Pocket Artillery — Drag-to-Aim, Destructible Terrain, Nine Weapons & an AI That Simulates Its Shots',
      description: `Artillery duels are one of the oldest game ideas on the PC: two tanks, a hill between them, and a guess at angle and power. This snippet is a bright, light-themed canvas version you can play at once: six shots each, nine weapons to choose from that can each be fired only once, wind that changes every turn, and terrain that really crumbles when it is hit. Pull back on the field like a slingshot to aim, play the CPU on three levels, or hand the device to a friend for a two-player duel.

**Terrain as a height map you can carve**

The ground is one array, \`ground[x]\`, holding the surface height of every pixel column. A blast calls \`crater(cx, cy, r)\`, which lowers each column inside the circle to the bottom of that circle, and the Dirt Ball does the opposite with \`addDirt()\`. Because the map is just numbers, collision is a single lookup (\`s.y >= ground[Math.round(s.x)]\`), the tanks settle by reading the same array, and the soil and grass are drawn from it every frame.

**Ballistics with wind on a fixed time step**

Each shell gets a velocity from the angle and power (\`speed = power * 0.085\`), then gravity pulls \`vy\` down and the wind adds a small sideways push each step. The loop runs on a 60 Hz accumulator, so the flight is identical on a 144 Hz monitor, and the same step rule is reused by the CPU when it plans a shot.

**A CPU that tests shots before it fires**

On its turn the computer tries about 1,300 angle and power pairs through \`simulate()\`, a copy of the physics that stops at the first terrain hit, and keeps the pair that lands closest to your tank. Then it adds a random error, with an occasional bigger slip. The three levels only change those numbers: Easy errs by about 6 degrees and slips often, Normal by 2.4, Hard by under 1, so the same code gives a beatable opponent or a sharp one.

**Scoring by closeness**

A blast scores \`pts * (1 - distance / reach)\` for the enemy tank, so a direct hit is worth the full value and a near miss still pays a little. Each weapon trades radius against points: the Mini Nuke covers a huge area for fewer points, and the Dirt Ball scores nothing but can bury a tank.

**Weapons with their own behaviour**

The Roller lands, then runs along the height map, faster downhill, until it meets a wall, a tank or runs out of steps. The Digger carves five stacked craters straight down and scores only on a tight radius. The Triple fires three shells 7 degrees apart, the Bouncer hops twice before it explodes, and the Napalm leaves a flame patch that keeps scoring while an enemy tank stands in it. Each one is a few lines in fire() or step(), keyed by its id.

**Drag to aim, or play two-player**

On the field, a pointer drag measures the pull from the tank: the direction gives the angle and the length gives the power, so it feels like a slingshot and works the same with a mouse or a finger. In the two-player mode the same controls act on whichever tank is up (cur()), and the CPU turn is simply skipped.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start a match', text: 'Choose "vs CPU" (Easy, Normal or Hard) or "2 players", then press "Play" for a random map or "Daily map" for the same map everyone gets today. You are the coral tank on the left.' },
        { title: 'Set angle and power', text: 'Drag on the field away from your tank like a slingshot (the pull sets both), or use the sliders, or the arrow keys (Shift moves five at a time). A dotted line shows where the barrel points, and on Easy a dotted arc previews the first part of the flight while you drag and a faint ghost line shows where your previous shot went.' },
        { title: 'Read the wind', text: 'The Wind badge at the top shows the direction and strength for this turn. Aim a little into it so the shell drifts back onto the target.' },
        { title: 'Pick a weapon and fire', text: 'Choose one of the nine weapons (keys 1 to 9) and press "Fire!" or Space. Each weapon can be used once per match, and you get six shots, so you choose which two to skip.' },
        { title: 'Score the closest blast', text: 'After six shots each the higher score wins. Your best score is saved in the browser. Finish the Daily map on consecutive days to build a streak.' },
      ],
    },
    features: [
      'Destructible terrain stored as a one-dimensional height map, carved by craters and raised by dirt',
      'Wind that changes every turn and bends the shells, shown in a badge on the field',
      'Nine weapons, each usable once, six shots per player: Missile, Big Boom, Triple, Bouncer, Mini Nuke, Roller, Digger, Napalm and Dirt Ball',
      'Drag-to-aim on the field, slingshot style, plus sliders and keyboard controls',
      'Easy level also keeps a faint ghost of your previous shot on the field, like Worms, so the next aim can be corrected from it',
      'Wind badge shows one chevron per wind point in the direction it blows',
      'Easy level shows a dotted trajectory preview while dragging, so new players learn what angle, power and wind do',
      'Two-player hot-seat mode on one device, or a CPU with Easy, Normal and Hard levels',
      'CPU opponent that simulates around 1,300 shots, picks the closest and adds a level-based human-like error',
      'Distance-based scoring, so near misses still earn points',
      'Daily map from a date seed plus a random map button, using a small seeded random generator',
      'On the Hard level, birds flap across the sky; a shell that hits one is wasted, the bird tumbles down with feathers, and the next turn begins',
      'Textured ground: soil strata, speckles and pebbles drawn once to a hidden canvas per theme and clipped to the terrain, plus grass tufts that follow the surface',
      'Four colour themes (Meadow, Desert, Snow, Night with twinkling stars) and a Valley map type with high ridges and a deep dip, all chosen from the map seed',
      'Daily streak and the best daily score kept in localStorage, so there is a reason to come back tomorrow',
      'Fixed 60 Hz physics step, so shell flight is the same on every screen refresh rate',
      'Bright light theme with a sky, clouds and soft hills, plus particles, rings and screen shake',
      'Mouse, touch and keyboard controls, Web Audio sound with a mute button, best score in localStorage',
    ],
    useCases: [
      { icon: 'APP', title: 'Quick arcade mini-game for a site', desc: 'A match takes about two minutes and needs no assets or libraries, so it fits an Easter egg page, a 404 screen or a "while you wait" corner.' },
      { icon: 'LEARN', title: 'Teaching projectile motion', desc: 'Angle, power, gravity and wind are all visible and adjustable, which makes the game a hands-on demo for a physics or maths lesson.' },
      { icon: 'CODE', title: 'Reference for height-map terrain', desc: 'Carving and filling a column array is the simplest way to get destructible ground, and the code shows it in under 20 lines.' },
      { icon: 'FLOW', title: 'Example of an AI that plans by simulation', desc: 'The CPU does not cheat: it runs the same physics offline, scores each result and picks the best, a pattern reused in many turn-based games.' },
      { icon: 'DESIGN', title: 'Branded reskin for a campaign', desc: 'Swap the tank colours, the sky and the weapon names for brand versions to make a "beat our mascot" promo game.' },
      { icon: 'APP', title: 'Local two-player duel on one screen', desc: 'The built-in 2 players mode hands the same controls to each tank in turn, which suits a classroom, a break room or a phone passed between friends.' },
      { icon: 'CODE', title: 'Related: Tank Arena', desc: 'See the [Tank Arena](/ui-snippets/tank-arena-game/) for a top-down tank shooter that pairs well with this turn-based duel.' },
    ],
    faqs: [
      { q: 'How does the terrain get destroyed?', a: 'The ground is an array with one surface height per pixel column. A blast lowers every column inside its circle to the bottom of that circle, so the hole is round, and the tanks then read the new height and drop down into it.' },
      { q: 'Why does the CPU not always hit me?', a: 'It finds the best angle and power by simulating many shots, then adds a random error of a couple of degrees, and now and then a bigger one. Lower the error values in cpuTurn() for a harder opponent or raise them for an easier one.' },
      { q: 'How is the wind applied?', a: 'Each physics step adds wind * 0.0025 to the shell\'s horizontal speed. The wind is a whole number from -5 to 5 picked from the seeded generator at the start of every turn.' },
      { q: 'How does the daily streak work?', a: 'Finishing a vs-CPU match on the Daily map stores the date and score in localStorage. If the last finished daily was yesterday the streak goes up by one, otherwise it restarts at 1. Two-player matches do not count.' },
      { q: 'How does Napalm work?', a: 'It makes a small crater, then adds a fire object at that spot that lasts 150 steps. Every 25 steps an enemy tank within about 30 pixels of it gives the shooter 12 points, and the next turn waits until the flames die out.' },
      { q: 'How do I add a new theme?', a: 'Add an object to the THEMES array with a name, two sky colours, a sun colour, hill colour, two soil colours, a grass colour, a cloud colour and a text colour. Themes change colours only, so no other code needs to change.' },
      { q: 'What happens when a shell hits a bird?', a: 'Birds appear on the Hard CPU level only. Each bird is a small object with a position, speed and flap phase. If a shell comes within about 12 pixels, the shell is marked dead without exploding, the bird switches to a falling state with feather particles, and the turn moves on. It respawns off screen after it drops.' },
      { q: 'What is the daily map?', a: 'It seeds the random generator with today\'s date as a number, so the terrain, the theme, the tank positions and the wind sequence are the same for everyone that day.' },
      { q: 'How do I add a new weapon?', a: 'Add an entry to the WEAPONS array with a name, blast radius, points and colour. Special behaviour such as the Triple spread, the Bouncer hops, the Roller run or the Digger tunnel lives in fire(), step() and explode(), keyed by the weapon id. The weapon buttons are built from the array, so a new entry shows up by itself.' },
      { q: 'How do I change the CPU difficulty?', a: 'Edit the LEVELS array: err is the aim error in degrees and slip is the chance of a bigger mistake. Easy, Normal and Hard just select one of the three rows, and the search over angles and powers stays the same.' },
      { q: 'How does drag-to-aim work?', a: 'A pointerdown on the canvas starts a drag. The vector from the pointer to the tank gives the angle (atan2) and its length divided by 1.3 gives the power, and both are clamped. Pointer events and touch-action: none make it work for mouse and touch.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the height-map terrain, the fixed-step physics and the simulate() function the CPU uses fit together, then ask for a new weapon such as a Napalm shell that leaves a burning patch, or a campaign of maps with rising CPU levels.`,
      prompt: `Build a turn-based artillery tank duel with the HTML5 Canvas API in plain HTML, CSS and JavaScript, no frameworks and no audio files.
- Light, bright look: pale sky gradient, clouds, soft hills, green-topped soil, one coral tank (player, left) and one blue tank (CPU, right).
- Store terrain as a height array with one value per pixel column. Explosions carve a circular crater by lowering columns; a Dirt Ball weapon raises them. Tanks sit on the surface and settle after each blast.
- Controls: Angle slider 0-180, Power slider 10-100, Fire button, arrow keys to aim (Shift for bigger steps), Space to fire, keys 1-9 to choose a weapon, and slingshot-style drag on the field (pull back from the tank: direction = angle, length = power). Works with touch.
- Physics on a fixed 60 Hz step: shell velocity from angle and power, constant gravity, and a per-turn wind from -5 to 5 shown in a badge.
- Nine weapons, each usable once per match: Missile, Big Boom (large radius), Triple (three shells spread by 7 degrees), Bouncer (two hops), Mini Nuke (huge crater, fewer points), Roller (rolls along the ground after landing), Digger (five stacked craters straight down), Napalm (small blast that leaves a burning patch scoring 12 points every 25 frames an enemy tank stands in it), Dirt Ball (no points).
- Six shots each, alternating, so players choose which weapons to skip. Score the enemy by blast distance: pts * (1 - distance / (radius + 13)), with floating +points text.
- CPU opponent with Easy, Normal and Hard levels (aim error and slip chance): pick an unused weapon, try many angle and power pairs with an offline simulate() copy of the physics, choose the closest landing to the player, add a random error. Also a 2 players mode on one device that swaps the controls between the tanks.
- On the Easy level only, while dragging, draw a short dotted trajectory preview using the same gravity and wind as a real shell.
- On Easy, also keep a faint dashed ghost arc of the previous shot visible during the next aim. The wind badge shows one chevron per wind point in the wind direction.
- Give the soil a texture (wavy strata lines, speckles, pebbles) pre-rendered to an offscreen canvas per theme and clipped to the terrain shape each frame, with a soft shadow under the grass edge and small grass tufts along the surface.
- Four colour-only themes (Meadow, Desert, Snow, Night with twinkling stars) and a Valley map type (high ridges at both ends, deep dip in the middle), both picked from a hash of the map seed and named in a small label on the field.
- On the Hard level only, three birds fly across the sky with flapping wings. A shell that touches a bird is wasted: the bird falls with feather particles and the turn passes on.
- Random map button, Daily map button seeded from the date, best score and a daily streak (consecutive days the daily map was finished, with today's score) saved in localStorage inside try/catch.
- Particles, expanding rings, screen shake, Web Audio synth sounds with a mute button, a start overlay and a results overlay.`,
    },
  },
};

export default pocketArtilleryGame;
