const skyHopperGame = {
  id: 'sky-hopper-game',
  title: 'Sky Hopper Game',
  lastmod: '2026-11-08',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="logo" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 18a4 4 0 0 1-.6-7.95A5.5 5.5 0 0 1 17 8.5a4.5 4.5 0 0 1 .5 9.5H7z"/><path d="M12 15V9m-2.5 2.5L12 9l2.5 2.5"/></svg></span>
      <div>
        <h2>Sky Hopper</h2>
        <p class="tagline">Endless sky climber</p>
      </div>
    </div>
    <div class="head-right">
      <span class="badge">Best <b id="best-score">0</b></span>
      <button class="icon-btn" id="btn-sound" type="button" aria-pressed="true" aria-label="Sound on" title="Sound (M)">🔊</button>
      <button class="icon-btn" id="btn-pause" type="button" aria-label="Pause" title="Pause (P)">❚❚</button>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="320" height="460" aria-label="Sky Hopper game canvas"></canvas>
    <div class="hud" aria-live="off">
      <span class="hud-h"><b id="hud-height">0</b><small>m</small></span>
      <span class="hud-stars"><i>★</i><b id="hud-stars">0</b></span>
    </div>
    <div class="hud-power" id="hud-power"></div>
    <div class="banner" id="banner" aria-hidden="true"></div>

    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-kicker">Endless climber</p>
        <p class="overlay-title">Sky <span>Hopper</span></p>
        <p class="overlay-sub">You bounce on your own. Steer left and right, <b>stomp the birds</b>, grab stars, propellers and shields, and climb through four skies.</p>
        <ul class="keys"><li><kbd>←</kbd><kbd>→</kbd> or <kbd>A</kbd><kbd>D</kbd> steer</li><li>touch: hold left / right side</li><li><kbd>P</kbd> pause</li></ul>
        <button class="btn btn-primary" id="btn-start" type="button">Hop</button>
      </div>
    </div>
    <div class="overlay hidden" id="pause-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Paused</p>
        <button class="btn btn-primary" id="btn-resume" type="button">Resume</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title over" id="over-title">You Fell!</p>
        <p class="overlay-score" id="final-score">0</p>
        <p class="overlay-sub" id="final-detail"></p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry" type="button">Hop again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="ctrl-btn" id="btn-left" type="button" aria-label="Steer left">◀</button>
    <button class="ctrl-btn" id="btn-right" type="button" aria-label="Steer right">▶</button>
  </div>
  <p class="hint-text">Keys: ← → or A D steer · P pause · M sound · on a phone, hold the left or right half of the sky</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:radial-gradient(700px 420px at 50% 0%,rgba(56,189,248,.26),transparent 70%),#0b1020;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;color:#e8eaf0}
.game-card{width:100%;max-width:380px;background:linear-gradient(180deg,#161c30,#0f1426);border-radius:22px;border:1px solid #28314d;box-shadow:0 24px 60px -24px rgba(56,189,248,.45);padding:16px;user-select:none;-webkit-user-select:none}

.game-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px;gap:10px;flex-wrap:wrap}
.game-title{display:flex;align-items:center;gap:10px}
.logo{display:grid;place-items:center;width:38px;height:38px;border-radius:12px;color:#7dd3fc;background:linear-gradient(135deg,rgba(56,189,248,.28),rgba(249,115,22,.16));border:1px solid rgba(125,211,252,.4);box-shadow:0 0 16px rgba(56,189,248,.28)}
.game-title h2{font-size:16px;font-weight:800;color:#fff;letter-spacing:-.01em}
.tagline{font-size:11px;color:#8590a8;margin-top:1px}
.head-right{display:flex;align-items:center;gap:6px}
.badge{font-size:11px;font-weight:700;color:#aeb7cc;background:#1b2238;border:1px solid #28314d;padding:5px 10px;border-radius:999px;white-space:nowrap}
.badge b{color:#fff;font-variant-numeric:tabular-nums}
.icon-btn{width:30px;height:28px;border-radius:9px;border:1px solid #28314d;background:#1b2238;color:#cbd2e4;font-size:12px;cursor:pointer;transition:background .15s,border-color .15s}
.icon-btn:hover{background:#262f4a;border-color:#4c5f8a}
.icon-btn[aria-pressed="false"]{opacity:.55}
.icon-btn:focus-visible,.btn:focus-visible,.ctrl-btn:focus-visible{outline:2px solid #7dd3fc;outline-offset:2px}

.canvas-wrap{position:relative;border-radius:16px;overflow:hidden;line-height:0;touch-action:none;background:#7dd3fc;border:1px solid #34406a;box-shadow:0 0 0 1px rgba(0,0,0,.5),0 0 30px -10px rgba(56,189,248,.5)}
canvas{display:block;width:100%;height:auto;touch-action:none}
.hud{position:absolute;inset:10px 14px auto 14px;display:flex;align-items:flex-start;justify-content:space-between;pointer-events:none;z-index:2;line-height:1.1}
.hud-h b{font-size:30px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 2px 0 rgba(15,23,42,.35),0 0 14px rgba(15,23,42,.45)}
.hud-h small{font-size:13px;font-weight:800;color:#fff;margin-left:3px;text-shadow:0 1px 6px rgba(15,23,42,.6)}
.hud-stars{display:flex;align-items:center;gap:4px;font-size:15px;font-weight:900;color:#fff;text-shadow:0 1px 8px rgba(15,23,42,.6);background:rgba(15,23,42,.28);border-radius:999px;padding:3px 10px}
.hud-stars i{font-style:normal;color:#fde047}
.hud-power{position:absolute;left:14px;bottom:10px;display:flex;gap:6px;z-index:2;pointer-events:none;line-height:1}
.hud-power span{font-size:10px;font-weight:800;letter-spacing:.06em;padding:4px 8px;border-radius:999px;background:rgba(15,23,42,.6);border:1px solid currentColor}
.hud-power .p-prop{color:#fda4af}
.hud-power .p-shield{color:#7dd3fc}
.banner{position:absolute;left:0;right:0;top:34%;text-align:center;font-size:24px;font-weight:900;letter-spacing:.24em;text-indent:.24em;color:#fff;text-shadow:0 2px 0 rgba(15,23,42,.4),0 0 18px rgba(15,23,42,.6);opacity:0;pointer-events:none;z-index:2;text-transform:uppercase}
.banner.show{animation:bannerIn 1.8s ease-out both}
@keyframes bannerIn{0%{opacity:0;transform:scale(.7)}16%{opacity:1;transform:scale(1)}72%{opacity:1}100%{opacity:0;transform:translateY(-10px) scale(1.08)}}

.overlay{position:absolute;inset:0;background:rgba(10,16,32,.55);backdrop-filter:blur(2px);display:flex;align-items:center;justify-content:center;padding:20px;line-height:1.4;z-index:3}
.overlay.hidden{display:none}
.overlay-card{text-align:center;max-width:300px}
.overlay-kicker{font-size:10.5px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#7dd3fc;margin-bottom:6px}
.overlay-title{font-size:32px;font-weight:900;letter-spacing:-.02em;color:#fff;margin-bottom:8px}
.overlay-title span{background:linear-gradient(90deg,#7dd3fc,#fb923c);-webkit-background-clip:text;background-clip:text;color:transparent}
.overlay-title.over{color:#fda4af;text-shadow:0 0 22px rgba(251,113,133,.55)}
.overlay-sub{font-size:12.5px;color:#d3daea;margin:0 auto}
.overlay-sub b{color:#fff}
.overlay-score{font-size:46px;font-weight:900;color:#fff;font-variant-numeric:tabular-nums;text-shadow:0 0 24px rgba(56,189,248,.8);line-height:1.1}
.overlay-best{font-size:12.5px;color:#fbbf24;font-weight:800;margin-top:6px;min-height:18px}
.keys{list-style:none;display:flex;flex-wrap:wrap;gap:6px 12px;justify-content:center;margin:12px 0 0;font-size:11.5px;color:#a3aec8}
.keys li{display:flex;align-items:center;gap:3px}
kbd{font:700 11px system-ui;color:#eef1f8;background:#232d49;border:1px solid #3f507a;border-bottom-width:2px;border-radius:5px;padding:1px 6px}
.btn{padding:11px 36px;font-size:14px;font-weight:800;border-radius:12px;cursor:pointer;font-family:inherit;transition:transform .12s,box-shadow .2s;border:none;margin-top:16px}
.btn-primary{background:linear-gradient(135deg,#38bdf8,#6366f1);color:#fff;box-shadow:0 6px 22px -6px rgba(56,189,248,.9)}
.btn-primary:hover{transform:translateY(-1px)}

.controls{display:flex;align-items:center;justify-content:center;gap:48px;margin-top:14px}
.ctrl-btn{-webkit-tap-highlight-color:transparent;touch-action:none;cursor:pointer;font-family:inherit;border:1px solid #34406a;width:96px;height:60px;border-radius:18px;background:linear-gradient(180deg,#232d49,#182038);color:#cfe3ff;font-size:24px;font-weight:700;box-shadow:0 4px 0 #0d1326;transition:transform .06s,background .12s}
.ctrl-btn:active{transform:translateY(3px);box-shadow:none;background:#2c3a5e}
.hint-text{font-size:11px;color:#6b7590;text-align:center;margin-top:10px}

@media(max-width:400px){.game-card{padding:12px}.overlay-title{font-size:26px}.badge{display:none}.controls{gap:24px}}
@media(prefers-reduced-motion:reduce){.banner.show{animation:none;opacity:1}}`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = 320, H = 460;
const DPR = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

const BEST_KEY = 'sky-hopper-best', BEST_H_KEY = 'sky-hopper-best-height', MUTE_KEY = 'sky-hopper-muted';
const reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = id => document.getElementById(id);
const rand = (a, b) => a + Math.random() * (b - a);
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const mod = (n, m) => ((n % m) + m) % m;
const TAU = Math.PI * 2, STEP = 1 / 60;

// Physics, in pixels per 1/60 s step. Bounce apex = v*v / (2*GRAV): about 156 px, spring about 378 px.
const GRAV = 0.36, JUMP_V = -10.6, SPRING_V = -16.5, STOMP_V = -11.4, MOVE = 4.6, ACCEL = 0.6, DRAG = 0.86;
const PW = 30, PH = 30, PLAT_H = 12, GROUND_Y = H - 40, START_Y = GROUND_Y - PH;
const SCROLL_KEYS = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'];

// Four skies. Colours blend smoothly between the metre marks.
const BIOMES = [
  { m: 0,   name: 'Meadow Sky',  top: [125, 211, 252], bot: [254, 235, 200] },
  { m: 200, name: 'High Clouds', top: [56, 189, 248],  bot: [186, 230, 253] },
  { m: 500, name: 'Sunset Ridge', top: [99, 52, 190],  bot: [251, 146, 60] },
  { m: 900, name: 'Starfield',   top: [2, 6, 23],      bot: [49, 46, 129] },
];

let state = 'idle';                                   // idle | play | paused | dying | over
let player, platforms, stars, powers, enemies, parts, popups;
let cam = 0, climb = 0, score = 0, starCount = 0, stomps = 0, shake = 0, prop = 0, shield = false;
let dyingT = 0, deathReason = 'fall', topY = 0, biomeIdx = 0, t = 0, acc = 0, lastFrame = 0, bestHeight = 0, powerKey = '';
const lastHud = { m: -1, s: -1 };
const inp = { kbL: false, kbR: false, btnL: false, btnR: false };
const touches = new Map();                            // pointer id -> 'L' | 'R' (hold a side of the canvas)
const goLeft = () => inp.kbL || inp.btnL || [...touches.values()].indexOf('L') >= 0;
const goRight = () => inp.kbR || inp.btnR || [...touches.values()].indexOf('R') >= 0;

const clouds = Array.from({ length: 16 }, (_, i) => ({ x: rand(0, W + 160), y: rand(0, H + 120), s: rand(0.7, 1.5), l: i % 3 }));
const bgStars = Array.from({ length: 70 }, () => ({ x: rand(0, W), y: rand(0, H), r: rand(0.6, 1.6), ph: rand(0, TAU) }));

function getNum(k) { try { return parseInt(localStorage.getItem(k)) || 0; } catch (e) { return 0; } }
function setNum(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) {} }

// ── Sound: a tiny WebAudio synth, created on the first click ──
let actx = null, muted = false;
try { muted = localStorage.getItem(MUTE_KEY) === '1'; } catch (e) {}
function unlockAudio() {
  if (!actx) { try { actx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} }
  if (actx && actx.state === 'suspended') actx.resume();
}
function tone(f0, f1, dur, type, vol) {
  if (muted || !actx) return;
  const o = actx.createOscillator(), g = actx.createGain(), n = actx.currentTime;
  o.type = type; o.frequency.setValueAtTime(f0, n); o.frequency.exponentialRampToValueAtTime(Math.max(30, f1), n + dur);
  g.gain.setValueAtTime(vol, n); g.gain.exponentialRampToValueAtTime(0.0001, n + dur);
  o.connect(g); g.connect(actx.destination); o.start(n); o.stop(n + dur);
}
function noise(dur, vol, cutoff) {
  if (muted || !actx) return;
  const len = Math.floor(actx.sampleRate * dur), buf = actx.createBuffer(1, len, actx.sampleRate), d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const s = actx.createBufferSource(), f = actx.createBiquadFilter(), g = actx.createGain();
  s.buffer = buf; f.type = 'lowpass'; f.frequency.value = cutoff; g.gain.value = vol;
  s.connect(f); f.connect(g); g.connect(actx.destination); s.start();
}
const sfx = {
  bounce: () => tone(300, 560, 0.09, 'sine', 0.05),
  spring: () => { tone(180, 940, 0.3, 'triangle', 0.07); },
  crumble: () => noise(0.28, 0.08, 900),
  star: () => { tone(880, 1320, 0.1, 'triangle', 0.05); setTimeout(() => tone(1320, 1760, 0.12, 'triangle', 0.04), 70); },
  power: () => { tone(380, 1200, 0.28, 'square', 0.035); },
  stomp: () => { tone(420, 140, 0.12, 'square', 0.05); noise(0.08, 0.05, 1500); },
  pop: () => { tone(900, 200, 0.12, 'sine', 0.06); noise(0.1, 0.05, 2500); },
  hurt: () => { noise(0.35, 0.1, 700); tone(260, 50, 0.4, 'sawtooth', 0.06); },
  fall: () => tone(500, 70, 0.7, 'sine', 0.06),
  save: () => tone(300, 1000, 0.3, 'triangle', 0.07),
  biome: () => { tone(330, 495, 0.14, 'triangle', 0.05); setTimeout(() => tone(495, 740, 0.2, 'triangle', 0.05), 130); },
};

// ── Level generation: one row of platforms at a time, always within bounce range ──
function pushPlatform(x, y, type, d) {
  const w = Math.round(66 - 14 * d);
  const p = { x: clamp(x, 2, W - w - 2), y, w, type, vx: type === 'move' ? (Math.random() < 0.5 ? 1 : -1) * (0.9 + 1.3 * d) : 0, comp: 0, dead: false };
  platforms.push(p);
  return p;
}
function rollType(d) {
  const r = Math.random(), crumble = 0.06 + 0.16 * d, move = 0.1 + 0.2 * d, spring = 0.07;
  if (r < crumble) return 'crumble';
  if (r < crumble + move) return 'move';
  if (r < crumble + move + spring) return 'spring';
  return 'normal';
}
function genRow() {
  const first = topY === GROUND_Y;
  const m = (START_Y - topY) / 10, d = clamp(m / 900, 0, 1);
  const gap = rand(50 + 20 * d, 78 + 46 * d);                 // widest gap 124 px against a 156 px bounce
  const y = topY - gap;
  const type = first ? 'normal' : rollType(d);
  const p = pushPlatform(first ? W / 2 - 33 + rand(-70, 70) : rand(0, W - 66), y, type, d);
  if (!first && d < 0.55 && Math.random() < 0.34 * (1 - d)) {   // early on, a second platform makes the climb forgiving
    const x2 = p.x < W / 2 ? rand(p.x + p.w + 24, W - p.w - 2) : rand(2, p.x - p.w - 24);   // never overlaps the first one
    pushPlatform(x2, y + rand(-8, 8), rollType(d), d);
  }
  if (type === 'normal' || type === 'move') {
    const r = Math.random();
    if (m > 20 && r < 0.2) {
      const n = 1 + ((Math.random() * 3) | 0);
      for (let i = 0; i < n; i++) stars.push({ x: p.x + p.w / 2 + (i - (n - 1) / 2) * 24, y: y - 34 - (i % 2 ? 8 : 0), ph: rand(0, TAU) });
    } else if (m > 110 && r < 0.222) powers.push({ kind: 'prop', x: p.x + p.w / 2, y: y - 22, ph: rand(0, TAU) });
    else if (m > 180 && r < 0.244) powers.push({ kind: 'shield', x: p.x + p.w / 2, y: y - 22, ph: rand(0, TAU) });
  }
  if (!first && m > 130 && gap > 62 && Math.random() < 0.05 + 0.12 * d) {
    const spike = m > 320 && Math.random() < 0.3 + 0.2 * d;
    const ey = y + gap * 0.5;
    if (spike) enemies.push({ kind: 'spike', x: rand(30, W - 30), y: ey, by: ey, ph: rand(0, TAU), rot: 0, r: 13 });
    else { const bx = rand(80, W - 80); enemies.push({ kind: 'bird', x: bx, bx, y: ey, ph: rand(0, TAU), amp: rand(36, 60), sp: rand(0.9, 1.5), dir: 1, r: 14 }); }
  }
  topY = y;
}

function resetState() {
  platforms = [{ x: -20, y: GROUND_Y, w: W + 40, type: 'ground', vx: 0, comp: 0, dead: false }];
  stars = []; powers = []; enemies = []; parts = []; popups = [];
  player = { x: W / 2 - PW / 2, y: START_Y, vx: 0, vy: JUMP_V, face: 1, squash: 0, rot: 0, spin: 0 };
  cam = 0; climb = 0; score = 0; starCount = 0; stomps = 0; prop = 0; shield = false; shake = 0; topY = GROUND_Y; biomeIdx = 0;
  while (topY > cam - 620) genRow();
  updateHud(true);
}

// ── Particles and popups ──
function burst(x, y, n, col, sp) {
  if (reduce) n = Math.ceil(n / 2);
  for (let i = 0; i < n; i++) parts.push({ type: 'dot', x, y, vx: rand(-sp, sp), vy: rand(-sp, sp * 0.4), grav: 0.12, life: rand(18, 34), max: 34, size: rand(1.5, 3.5), col });
}
function puff(x, y) { for (let i = 0; i < 5; i++) parts.push({ type: 'dot', x: x + rand(-8, 8), y, vx: rand(-0.8, 0.8), vy: rand(-0.1, 0.5), grav: -0.01, life: 22, max: 22, size: rand(2, 4), col: '#ffffff' }); }
function popup(x, y, text, col) { popups.push({ x, y, text, col, life: 54 }); }

// ── Events ──
function land(q) {
  const p = player, spring = q.type === 'spring';
  p.y = q.y - PH - (spring ? 8 : 0); p.squash = 1;
  p.vy = spring ? SPRING_V : JUMP_V;
  if (spring) { q.comp = 1; sfx.spring(); burst(p.x + PW / 2, q.y, 10, '#e9d5ff', 3); } else { sfx.bounce(); puff(p.x + PW / 2, q.y); }
  if (q.type === 'crumble') {
    q.dead = true; sfx.crumble();
    for (let i = 0; i < 7; i++) parts.push({ type: 'chunk', x: q.x + rand(0, q.w), y: q.y + 4, vx: rand(-1.6, 1.6), vy: rand(-2.4, 0), grav: 0.35, life: 55, max: 55, size: rand(3, 6.5), col: i % 2 ? '#d97706' : '#92400e', rot: rand(0, TAU), vr: rand(-0.3, 0.3) });
  }
}
function die(reason) {
  state = 'dying'; dyingT = 0; deathReason = reason; prop = 0; shield = false;
  const p = player;
  if (reason === 'hit') { p.vy = -6; p.spin = (p.face || 1) * 0.22; sfx.hurt(); if (!reduce) shake = 10; burst(p.x + PW / 2, p.y + PH / 2, 16, '#fda4af', 3.5); }
  else { p.spin = 0.12 * (p.face || 1); sfx.fall(); }
}
function rescue() {
  const p = player;
  shield = false; p.y = cam + H - 50; p.vy = -14.5; p.squash = 1;
  sfx.save(); burst(p.x + PW / 2, p.y + PH, 20, '#7dd3fc', 4); showBanner('Saved!');
  if (!reduce) shake = 6;
}
function near(cx, cy, x, y, r) { const dx = Math.abs(cx - x); return Math.min(dx, W - dx) < r && Math.abs(cy - y) < r && Math.hypot(Math.min(dx, W - dx), cy - y) < r; }

// ── One fixed 1/60 s simulation step ──
function step() {
  t += STEP;
  const playing = state === 'play', p = player;
  let dir = 0;
  if (playing) { if (goLeft()) dir -= 1; if (goRight()) dir += 1; }
  if (dir) { p.vx = clamp(p.vx + dir * ACCEL, -MOVE, MOVE); p.face = dir; }
  else p.vx *= state === 'dying' ? 0.99 : DRAG;
  const prevFeet = p.y + PH;
  p.x += p.vx;
  if (p.x + PW < 0) p.x = W; else if (p.x > W) p.x = -PW;     // wrap around the screen edges

  if (playing && prop > 0) {
    p.vy += (-8.6 - p.vy) * 0.14; prop -= STEP;
    if (prop <= 0) prop = 0;
    if (Math.random() < 0.8) parts.push({ type: 'dot', x: p.x + PW / 2 + rand(-4, 4), y: p.y + PH, vx: rand(-0.4, 0.4), vy: rand(1, 2.4), grav: 0, life: 20, max: 20, size: rand(2, 4), col: '#fde68a' });
  } else p.vy = Math.min(p.vy + GRAV, 15);
  p.y += p.vy;
  p.squash *= 0.82; if (p.squash < 0.01) p.squash = 0;
  if (state === 'dying') p.rot += p.spin;

  for (const q of platforms) {
    if (q.type === 'move') { q.x += q.vx; if (q.x < 0) { q.x = 0; q.vx = Math.abs(q.vx); } else if (q.x + q.w > W) { q.x = W - q.w; q.vx = -Math.abs(q.vx); } }
    if (q.comp > 0) q.comp = Math.max(0, q.comp - 0.07);
  }
  for (const e of enemies) {
    if (e.kind === 'bird') { const nx = e.bx + Math.sin(t * e.sp + e.ph) * e.amp; e.dir = nx >= e.x ? 1 : -1; e.x = nx; }
    else { e.y = e.by + Math.sin(t * 2 + e.ph) * 6; e.rot += 0.04; }
  }

  // One-way landing: only while falling, and only when the feet cross a platform top this step
  if ((playing || state === 'idle') && p.vy > 0 && !(prop > 0)) {
    const feet = p.y + PH;
    for (const q of platforms) {
      if (q.dead || (state === 'idle' && q.type !== 'ground')) continue;
      const top = q.type === 'spring' ? q.y - 8 : q.y;
      if (p.x + PW - 6 > q.x && p.x + 6 < q.x + q.w && prevFeet <= top + 4 && feet >= top) { land(q); break; }
    }
  }

  if (playing) {
    const cx = p.x + PW / 2, cy = p.y + PH / 2;
    for (let i = stars.length - 1; i >= 0; i--) {
      const s = stars[i];
      if (near(cx, cy, s.x, s.y, 22)) { stars.splice(i, 1); starCount++; sfx.star(); burst(s.x, s.y, 8, '#fde047', 2.5); popup(s.x, s.y - 10, '+10', '#fde047'); }
    }
    for (let i = powers.length - 1; i >= 0; i--) {
      const w = powers[i];
      if (near(cx, cy, w.x, w.y, 24)) {
        powers.splice(i, 1); sfx.power();
        if (w.kind === 'prop') { prop = 2.6; p.vy = Math.min(p.vy, -8); popup(w.x, w.y - 12, 'PROPELLER', '#fda4af'); }
        else { shield = true; popup(w.x, w.y - 12, 'SHIELD', '#7dd3fc'); }
        burst(w.x, w.y, 14, w.kind === 'prop' ? '#fda4af' : '#7dd3fc', 3);
      }
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
      const e = enemies[i];
      if (!near(cx, cy, e.x, e.y, 12 + e.r - 2)) continue;
      const feet = p.y + PH;
      if (e.kind === 'bird' && p.vy > 0 && feet < e.y + 6 && !(prop > 0)) {        // stomp from above
        enemies.splice(i, 1); p.vy = STOMP_V; p.squash = 1; stomps++; sfx.stomp(); burst(e.x, e.y, 14, '#fb7185', 3); popup(e.x, e.y - 12, '+25', '#ffffff');
      } else if (prop > 0) {                                                       // the propeller bulldozes through
        enemies.splice(i, 1); sfx.stomp(); burst(e.x, e.y, 14, e.kind === 'bird' ? '#fb7185' : '#c084fc', 3.5); popup(e.x, e.y - 12, '+25', '#ffffff'); stomps++;
      } else if (shield) {
        enemies.splice(i, 1); shield = false; sfx.pop(); burst(e.x, e.y, 18, '#7dd3fc', 4); if (!reduce) shake = 5;
      } else { die('hit'); break; }
    }
  }

  // Camera only ever moves up: it eases toward a point 40% down the view
  if (state !== 'idle') { const target = p.y - H * 0.4; if (target < cam) cam += (target - cam) * 0.22; }
  if (state === 'play') {
    climb = Math.max(climb, START_Y - p.y);
    score = Math.floor(climb / 10) + starCount * 10 + stomps * 25;
    const bi = skyColors(climb / 10).i;
    if (bi !== biomeIdx) { biomeIdx = bi; showBanner(BIOMES[bi].name); sfx.biome(); }
  }

  while (topY > cam - 620) genRow();
  const limit = cam + H + 80;
  platforms = platforms.filter(q => !q.dead && q.y < limit);
  stars = stars.filter(s => s.y < limit); powers = powers.filter(w => w.y < limit); enemies = enemies.filter(e => e.y < limit);

  if (state === 'play' && p.y > cam + H + 20) { if (shield) rescue(); else die('fall'); }
  if (state === 'dying') { dyingT += STEP; if (dyingT > 1) endGame(); }

  for (const q of parts) { q.x += q.vx; q.y += q.vy; q.vy += q.grav; q.life--; if (q.type === 'chunk') q.rot += q.vr; }
  parts = parts.filter(q => q.life > 0);
  if (parts.length > 260) parts.splice(0, parts.length - 260);
  for (const q of popups) { q.y -= 0.6; q.life--; }
  popups = popups.filter(q => q.life > 0);
  shake *= 0.85; if (shake < 0.2) shake = 0;
  updateHud(false);
}

// ── Drawing ──
function skyColors(m) {
  let i = 0; while (i < BIOMES.length - 1 && m >= BIOMES[i + 1].m) i++;
  const a = BIOMES[i], b = BIOMES[Math.min(i + 1, BIOMES.length - 1)];
  const k = a === b ? 0 : clamp((m - a.m) / (b.m - a.m), 0, 1), s = k * k * (3 - 2 * k);
  const mix = (u, v) => 'rgb(' + u.map((c, j) => Math.round(lerp(c, v[j], s))).join(',') + ')';
  return { top: mix(a.top, b.top), bot: mix(a.bot, b.bot), i };
}
function rr(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
function circ(x, y, r) { ctx.moveTo(x + r, y); ctx.arc(x, y, r, 0, TAU); }
function starPath(r1, r2) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, r = i % 2 ? r2 : r1; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); }
function glow(x, y, r, col) { const g = ctx.createRadialGradient(x, y, 0, x, y, r); g.addColorStop(0, col); g.addColorStop(1, 'rgba(255,255,255,0)'); ctx.fillStyle = g; ctx.fillRect(x - r, y - r, r * 2, r * 2); }

function drawBackdrop(m, space) {
  const sky = skyColors(m), g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, sky.top); g.addColorStop(1, sky.bot); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const down = -cam;
  const sunA = clamp(1 - m / 380, 0, 1);
  if (sunA > 0) { ctx.globalAlpha = sunA; glow(80, 96 + down * 0.06, 110, 'rgba(255,244,190,.95)'); ctx.fillStyle = '#fff7d6'; ctx.beginPath(); circ(80, 96 + down * 0.06, 20); ctx.fill(); ctx.globalAlpha = 1; }
  if (space > 0.02) {
    for (const s of bgStars) {
      ctx.fillStyle = 'rgba(255,255,255,' + (space * (0.45 + 0.55 * Math.sin(t * 2 + s.ph))).toFixed(3) + ')';
      ctx.fillRect(s.x, mod(s.y + down * 0.04, H), s.r, s.r);
    }
    const py = mod(-100 + down * 0.05, H + 260) - 130;
    ctx.globalAlpha = space;
    const pg = ctx.createRadialGradient(240, py - 8, 4, 250, py, 34); pg.addColorStop(0, '#fcd9a8'); pg.addColorStop(1, '#a855f7');
    ctx.fillStyle = pg; ctx.beginPath(); circ(250, py, 30); ctx.fill();
    ctx.strokeStyle = 'rgba(253,230,138,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.ellipse(250, py, 50, 11, -0.35, 0, TAU); ctx.stroke();
    ctx.globalAlpha = 1;
  }
  const drift = reduce ? 0.3 : 1;
  for (const c of clouds) {
    const a = (0.28 + 0.14 * c.l) * (1 - space * 0.85);
    if (a < 0.02) continue;
    const x = mod(c.x + t * (3 + c.l * 5) * drift, W + 160) - 80, y = mod(c.y + down * (0.12 + c.l * 0.16), H + 120) - 60;
    ctx.fillStyle = 'rgba(255,255,255,' + a.toFixed(3) + ')';
    ctx.beginPath(); circ(x, y, 16 * c.s); circ(x + 18 * c.s, y - 6 * c.s, 20 * c.s); circ(x + 40 * c.s, y, 15 * c.s); circ(x + 20 * c.s, y + 6 * c.s, 16 * c.s); ctx.fill();
  }
}

function drawMarkers(space) {
  const col = space > 0.4 ? 'rgba(255,255,255,.42)' : 'rgba(30,41,59,.3)';
  ctx.save(); ctx.font = '700 9px system-ui'; ctx.textBaseline = 'bottom'; ctx.setLineDash([5, 5]); ctx.lineWidth = 1;
  const lowM = (START_Y + PH - (cam + H)) / 10, hiM = (START_Y + PH - cam) / 10;
  for (let mm = Math.max(100, Math.ceil(lowM / 100) * 100); mm <= hiM; mm += 100) {
    const y = START_Y + PH - mm * 10;
    ctx.strokeStyle = col; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    ctx.fillStyle = col; ctx.fillText(mm + ' m', 6, y - 3);
  }
  if (bestHeight > 10) {
    const y = START_Y + PH - bestHeight * 10;
    if (y > cam - 20 && y < cam + H + 20) {
      ctx.strokeStyle = 'rgba(251,191,36,.95)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      ctx.fillStyle = '#fbbf24'; ctx.textAlign = 'right'; ctx.fillText('BEST ' + bestHeight + ' m', W - 6, y - 3);
    }
  }
  ctx.restore();
}

function drawGroundScene() {
  if (cam + H < GROUND_Y - 70) return;
  ctx.fillStyle = 'rgba(74,222,128,.38)'; ctx.beginPath(); ctx.ellipse(60, GROUND_Y + 6, 130, 52, 0, Math.PI, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(34,197,94,.42)'; ctx.beginPath(); ctx.ellipse(250, GROUND_Y + 6, 150, 70, 0, Math.PI, TAU); ctx.fill();
  ctx.fillStyle = '#7c4a21'; ctx.fillRect(238, GROUND_Y - 34, 8, 36);
  ctx.fillStyle = '#16a34a'; ctx.beginPath(); circ(242, GROUND_Y - 46, 20); circ(228, GROUND_Y - 36, 14); circ(256, GROUND_Y - 36, 14); ctx.fill();
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); circ(238, GROUND_Y - 52, 12); ctx.fill();
  const flowers = [[40, '#fb7185'], [64, '#fde047'], [118, '#f9a8d4'], [196, '#fde047'], [290, '#fb7185']];
  for (const f of flowers) { ctx.fillStyle = '#15803d'; ctx.fillRect(f[0], GROUND_Y - 8, 2, 8); ctx.fillStyle = f[1]; ctx.beginPath(); circ(f[0] + 1, GROUND_Y - 10, 3.2); ctx.fill(); }
}

function drawPlatform(q) {
  const x = q.x, y = q.y, w = q.w;
  if (q.type === 'ground') {
    ctx.fillStyle = '#7c4a21'; ctx.fillRect(x, y + 12, w, 460);
    ctx.fillStyle = '#6b3f1b'; for (let i = 0; i < 9; i++) ctx.fillRect(x + (i * 53) % w, y + 28 + (i * 37) % 120, 14, 4);
    const gg = ctx.createLinearGradient(0, y, 0, y + 14); gg.addColorStop(0, '#86efac'); gg.addColorStop(1, '#16a34a');
    ctx.fillStyle = gg; ctx.fillRect(x, y, w, 14);
    return;
  }
  const pal = { normal: ['#bbf7d0', '#22c55e', '#15803d'], move: ['#bae6fd', '#0ea5e9', '#0369a1'], crumble: ['#fde68a', '#d97706', '#92400e'], spring: ['#e9d5ff', '#a855f7', '#6b21a8'] }[q.type];
  ctx.fillStyle = pal[2]; rr(x, y + 3, w, PLAT_H, 6); ctx.fill();
  const g = ctx.createLinearGradient(0, y, 0, y + PLAT_H); g.addColorStop(0, pal[0]); g.addColorStop(0.5, pal[1]); g.addColorStop(1, pal[2]);
  ctx.fillStyle = g; rr(x, y, w, PLAT_H, 6); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,.45)'; rr(x + 5, y + 2, w - 10, 2.5, 1.2); ctx.fill();
  if (q.type === 'crumble') {
    ctx.strokeStyle = 'rgba(60,20,0,.6)'; ctx.lineWidth = 1.2; ctx.beginPath();
    ctx.moveTo(x + w * 0.3, y); ctx.lineTo(x + w * 0.38, y + 5); ctx.lineTo(x + w * 0.33, y + PLAT_H);
    ctx.moveTo(x + w * 0.68, y); ctx.lineTo(x + w * 0.6, y + 6); ctx.lineTo(x + w * 0.66, y + PLAT_H); ctx.stroke();
  } else if (q.type === 'move') {
    ctx.strokeStyle = 'rgba(255,255,255,.9)'; ctx.lineWidth = 1.6; ctx.beginPath();
    ctx.moveTo(x + 10, y + 3); ctx.lineTo(x + 5, y + 6); ctx.lineTo(x + 10, y + 9);
    ctx.moveTo(x + w - 10, y + 3); ctx.lineTo(x + w - 5, y + 6); ctx.lineTo(x + w - 10, y + 9); ctx.stroke();
  } else if (q.type === 'spring') {
    const h = 8 - 5 * q.comp, cx = x + w / 2;
    ctx.strokeStyle = '#f5d0fe'; ctx.lineWidth = 2.4; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(cx - 7, y);
    for (let i = 0; i < 4; i++) ctx.lineTo(cx + (i % 2 ? -7 : 7), y - h * (i + 1) / 4);
    ctx.stroke();
    ctx.fillStyle = '#fde68a'; rr(cx - 10, y - h - 3, 20, 4, 2); ctx.fill();
  }
}

function drawHopper(ox) {
  const p = player, cx = p.x + PW / 2 + ox, base = p.y + PH, v = p.vy, f = p.face || 1;
  const stretch = clamp(-v * 0.02, -0.1, 0.22), sq = p.squash * 0.3;
  const sy = 1 + stretch - sq, sx = 1 - stretch * 0.7 + sq * 0.8;
  const dead = state === 'dying' || state === 'over';
  ctx.save(); ctx.translate(cx, base); ctx.rotate(p.rot + clamp(p.vx * 0.03, -0.2, 0.2)); ctx.scale(sx, sy);
  const flop = clamp(v * 0.04, -0.4, 0.6);
  for (const s of [-1, 1]) {                                     // ears: they flare out when falling and flatten when rising
    ctx.save(); ctx.translate(s * 7, -26); ctx.rotate(s * (0.2 + flop * 0.5));
    ctx.fillStyle = '#ea580c'; ctx.beginPath(); ctx.ellipse(0, -9, 4.4, 11, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fda4af'; ctx.beginPath(); ctx.ellipse(0, -9, 2, 7.5, 0, 0, TAU); ctx.fill();
    ctx.restore();
  }
  const tuck = v < 0 ? -5 : 0;
  ctx.fillStyle = '#c2410c'; ctx.beginPath(); ctx.ellipse(-7, -2 + tuck, 6, 3.6, 0, 0, TAU); ctx.ellipse(7, -2 + tuck, 6, 3.6, 0, 0, TAU); ctx.fill();
  const bg = ctx.createRadialGradient(-4, -21, 2, 0, -15, 19); bg.addColorStop(0, '#fed7aa'); bg.addColorStop(1, '#f97316');
  ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(0, -15, 15, 15, 0, 0, TAU); ctx.fill();
  ctx.fillStyle = 'rgba(255,237,213,.9)'; ctx.beginPath(); ctx.ellipse(0, -9, 9, 7.5, 0, 0, TAU); ctx.fill();
  if (dead) {
    ctx.strokeStyle = '#431407'; ctx.lineWidth = 1.8; ctx.beginPath();
    for (const ex of [-5.5, 5.5]) { ctx.moveTo(ex - 2.6, -20.6); ctx.lineTo(ex + 2.6, -15.4); ctx.moveTo(ex + 2.6, -20.6); ctx.lineTo(ex - 2.6, -15.4); }
    ctx.stroke();
  } else {
    ctx.fillStyle = '#fff'; ctx.beginPath(); circ(-5.5 + f * 1.5, -18, 4.4); circ(5.5 + f * 1.5, -18, 4.4); ctx.fill();
    ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); circ(-5.5 + f * 2.8, -18 + clamp(v * 0.1, -1.2, 1.2), 2.2); circ(5.5 + f * 2.8, -18 + clamp(v * 0.1, -1.2, 1.2), 2.2); ctx.fill();
  }
  ctx.fillStyle = 'rgba(244,114,182,.55)'; ctx.beginPath(); circ(-10, -12.5, 2.6); circ(10, -12.5, 2.6); ctx.fill();
  ctx.strokeStyle = '#7c2d12'; ctx.lineWidth = 1.6; ctx.beginPath();
  if (dead) { ctx.arc(f * 1.5, -7, 3.2, 1.15 * Math.PI, 1.85 * Math.PI); } else { ctx.arc(f * 1.5, -12, 3.4, 0.15 * Math.PI, 0.85 * Math.PI); }
  ctx.stroke();
  if (prop > 0) {                                                // propeller cap
    ctx.globalAlpha = prop < 0.8 && Math.floor(t * 10) % 2 ? 0.45 : 1;
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.ellipse(0, -28, 10, 6, 0, Math.PI, TAU); ctx.fill();
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(-1.2, -37, 2.4, 9);
    ctx.fillStyle = '#fb7185'; ctx.beginPath(); ctx.ellipse(0, -38, 3 + 17 * Math.abs(Math.cos(t * 35)), 2.2, 0, 0, TAU); ctx.fill();
    ctx.globalAlpha = 1;
  }
  ctx.restore();
  if (shield) {
    const r = 25 + Math.sin(t * 5) * 1, sg = ctx.createRadialGradient(cx - 6, base - 22, 4, cx, base - 15, r);
    sg.addColorStop(0, 'rgba(186,230,253,.06)'); sg.addColorStop(1, 'rgba(56,189,248,.4)');
    ctx.fillStyle = sg; ctx.strokeStyle = 'rgba(186,230,253,.95)'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.arc(cx, base - 15, r, 0, TAU); ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(cx, base - 15, r - 5, 3.6, 4.4); ctx.stroke();
  }
}

function drawStar(s) {
  const sc = Math.abs(Math.cos(t * 3 + s.ph)), y = s.y + Math.sin(t * 3 + s.ph) * 2;
  glow(s.x, y, 17, 'rgba(253,224,71,.55)');
  ctx.save(); ctx.translate(s.x, y); ctx.scale(0.35 + 0.65 * sc, 1); starPath(9, 4);
  ctx.fillStyle = '#fde047'; ctx.fill(); ctx.strokeStyle = '#f59e0b'; ctx.lineWidth = 1.2; ctx.stroke(); ctx.restore();
}
function drawPower(w) {
  const y = w.y + Math.sin(t * 2.6 + w.ph) * 3, col = w.kind === 'prop' ? '#fda4af' : '#7dd3fc';
  glow(w.x, y, 24, w.kind === 'prop' ? 'rgba(253,164,175,.55)' : 'rgba(125,211,252,.55)');
  ctx.fillStyle = 'rgba(15,23,42,.72)'; ctx.strokeStyle = col; ctx.lineWidth = 1.8; ctx.beginPath(); ctx.arc(w.x, y, 13, 0, TAU); ctx.fill(); ctx.stroke();
  if (w.kind === 'prop') {
    ctx.fillStyle = '#ef4444'; ctx.beginPath(); ctx.ellipse(w.x, y + 3, 7, 5, 0, Math.PI, TAU); ctx.fill();
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(w.x - 1, y - 5, 2, 5);
    ctx.fillStyle = '#fda4af'; ctx.beginPath(); ctx.ellipse(w.x, y - 5.5, 2.5 + 8 * Math.abs(Math.cos(t * 12 + w.ph)), 1.8, 0, 0, TAU); ctx.fill();
  } else {
    ctx.fillStyle = '#38bdf8'; ctx.beginPath(); ctx.moveTo(w.x, y - 8); ctx.lineTo(w.x + 7, y - 5); ctx.lineTo(w.x + 6, y + 2); ctx.quadraticCurveTo(w.x + 4, y + 7, w.x, y + 9); ctx.quadraticCurveTo(w.x - 4, y + 7, w.x - 6, y + 2); ctx.lineTo(w.x - 7, y - 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.55)'; ctx.fillRect(w.x - 1, y - 5, 2, 9);
  }
}
function drawEnemy(e) {
  ctx.save(); ctx.translate(e.x, e.y);
  if (e.kind === 'bird') {
    ctx.scale(e.dir, 1);
    const fl = Math.sin(t * 16 + e.ph);
    ctx.fillStyle = '#be123c'; ctx.beginPath(); ctx.moveTo(-5, -3); ctx.lineTo(-13, -13 - fl * 8); ctx.lineTo(5, -4); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#e11d48'; ctx.beginPath(); ctx.moveTo(-14, 0); ctx.lineTo(-23, -6); ctx.lineTo(-23, 6); ctx.closePath(); ctx.fill();
    const bg = ctx.createLinearGradient(0, -11, 0, 11); bg.addColorStop(0, '#fb7185'); bg.addColorStop(1, '#e11d48');
    ctx.fillStyle = bg; ctx.beginPath(); ctx.ellipse(0, 0, 15, 11, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,.28)'; ctx.beginPath(); ctx.ellipse(0, 4, 9, 5, 0, 0, TAU); ctx.fill();
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(13, -1); ctx.lineTo(23, 2); ctx.lineTo(13, 5); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fda4af'; ctx.beginPath(); ctx.moveTo(-2, 1); ctx.lineTo(-10, 10 + fl * 8); ctx.lineTo(5, 3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.beginPath(); circ(6, -3, 3.4); ctx.fill();
    ctx.fillStyle = '#1e1b4b'; ctx.beginPath(); circ(7, -3, 1.7); ctx.fill();
    ctx.strokeStyle = '#4c0519'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(2, -9); ctx.lineTo(10, -5.5); ctx.stroke();
  } else {
    glow(0, 0, 26, 'rgba(168,85,247,.5)');
    ctx.save(); ctx.rotate(e.rot); ctx.fillStyle = '#a855f7';
    for (let i = 0; i < 8; i++) { ctx.rotate(Math.PI / 4); ctx.beginPath(); ctx.moveTo(-4.5, -9); ctx.lineTo(0, -19); ctx.lineTo(4.5, -9); ctx.closePath(); ctx.fill(); }
    ctx.restore();
    const bg = ctx.createRadialGradient(-3, -4, 2, 0, 0, 12); bg.addColorStop(0, '#7c3aed'); bg.addColorStop(1, '#2e1065');
    ctx.fillStyle = bg; ctx.beginPath(); circ(0, 0, 11); ctx.fill();
    ctx.fillStyle = '#fecaca'; ctx.beginPath(); circ(-4, -1.5, 2.6); circ(4, -1.5, 2.6); ctx.fill();
    ctx.fillStyle = '#7f1d1d'; ctx.beginPath(); circ(-4, -1, 1.2); circ(4, -1, 1.2); ctx.fill();
    ctx.strokeStyle = '#1e1b4b'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(-7, -6); ctx.lineTo(-2, -4); ctx.moveTo(7, -6); ctx.lineTo(2, -4); ctx.stroke();
  }
  ctx.restore();
}

function draw() {
  const m = climb / 10, space = clamp((m - 620) / 280, 0, 1);
  drawBackdrop(m, space);
  ctx.save();
  ctx.translate(shake ? (Math.random() - 0.5) * shake : 0, -cam + (shake ? (Math.random() - 0.5) * shake : 0));
  drawMarkers(space);
  drawGroundScene();
  const top = cam - 40, bottom = cam + H + 40;
  for (const q of platforms) if (q.y > top && q.y < bottom || q.type === 'ground') drawPlatform(q);
  for (const s of stars) if (s.y > top && s.y < bottom) drawStar(s);
  for (const w of powers) if (w.y > top && w.y < bottom) drawPower(w);
  for (const e of enemies) if (e.y > top && e.y < bottom) drawEnemy(e);
  drawHopper(0);
  if (player.x < 0) drawHopper(W); else if (player.x + PW > W) drawHopper(-W);
  for (const q of parts) {
    ctx.globalAlpha = clamp(q.life / q.max, 0, 1); ctx.fillStyle = q.col;
    if (q.type === 'chunk') { ctx.save(); ctx.translate(q.x, q.y); ctx.rotate(q.rot); ctx.fillRect(-q.size / 2, -q.size / 2, q.size, q.size * 0.6); ctx.restore(); }
    else { ctx.beginPath(); ctx.arc(q.x, q.y, q.size, 0, TAU); ctx.fill(); }
  }
  ctx.globalAlpha = 1;
  ctx.font = '800 12px system-ui'; ctx.textAlign = 'center'; ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(15,23,42,.55)';
  for (const q of popups) { ctx.globalAlpha = clamp(q.life / 30, 0, 1); ctx.fillStyle = q.col; ctx.strokeText(q.text, q.x, q.y); ctx.fillText(q.text, q.x, q.y); }
  ctx.globalAlpha = 1;
  ctx.restore();
}

// ── HUD, banner and screens ──
const bannerEl = $('banner'), powerEl = $('hud-power');
function showBanner(text) { bannerEl.textContent = text; bannerEl.classList.remove('show'); void bannerEl.offsetWidth; bannerEl.classList.add('show'); }
function updateHud(force) {
  const m = Math.floor(climb / 10);
  if (force || m !== lastHud.m) { $('hud-height').textContent = m; lastHud.m = m; }
  if (force || starCount !== lastHud.s) { $('hud-stars').textContent = starCount; lastHud.s = starCount; }
  const key = (prop > 0 ? Math.ceil(prop * 10) : 0) + '|' + shield;
  if (force || key !== powerKey) {
    powerKey = key;
    powerEl.innerHTML = (prop > 0 ? '<span class="p-prop">PROPELLER ' + prop.toFixed(1) + 's</span>' : '') + (shield ? '<span class="p-shield">SHIELD</span>' : '');
  }
}
const startOv = $('start-overlay'), pauseOv = $('pause-overlay'), overOv = $('gameover-overlay'), bestEl = $('best-score');

function startGame() {
  unlockAudio(); resetState(); state = 'play'; player.vy = JUMP_V; lastFrame = 0; acc = 0;
  startOv.classList.add('hidden'); overOv.classList.add('hidden'); pauseOv.classList.add('hidden');
  showBanner('Climb!');
}
function endGame() {
  state = 'over';
  const best = getNum(BEST_KEY), h = Math.floor(climb / 10), isBest = score > best;
  if (isBest) { setNum(BEST_KEY, score); bestEl.textContent = score; }
  if (h > bestHeight) { bestHeight = h; setNum(BEST_H_KEY, h); }
  $('over-title').textContent = deathReason === 'hit' ? 'Knocked Out!' : 'You Fell!';
  $('final-score').textContent = score;
  $('final-detail').textContent = h + ' m · ' + starCount + (starCount === 1 ? ' star' : ' stars') + ' · ' + stomps + (stomps === 1 ? ' stomp' : ' stomps');
  $('best-msg').textContent = isBest ? '🏆 New best score!' : 'Best ' + best;
  overOv.classList.remove('hidden');
  powerEl.innerHTML = '';
}
function togglePause() {
  if (state === 'play') { state = 'paused'; pauseOv.classList.remove('hidden'); }
  else if (state === 'paused') { state = 'play'; lastFrame = 0; acc = 0; pauseOv.classList.add('hidden'); }
}
const soundBtn = $('btn-sound');
function paintSound() { soundBtn.textContent = muted ? '🔇' : '🔊'; soundBtn.setAttribute('aria-pressed', String(!muted)); soundBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on'); }
function toggleMute() { muted = !muted; try { localStorage.setItem(MUTE_KEY, muted ? '1' : '0'); } catch (e) {} paintSound(); if (!muted) unlockAudio(); }

// ── Input ──
document.addEventListener('keydown', e => {
  if (SCROLL_KEYS.indexOf(e.code) >= 0) e.preventDefault();
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') inp.kbL = true;
  else if (e.code === 'ArrowRight' || e.code === 'KeyD') inp.kbR = true;
  else if (e.code === 'Space' && !e.repeat) { if (state === 'idle' || state === 'over') startGame(); else if (state === 'paused') togglePause(); }
  else if ((e.code === 'KeyP' || e.code === 'Escape') && !e.repeat) togglePause();
  else if (e.code === 'KeyM' && !e.repeat) toggleMute();
});
document.addEventListener('keyup', e => {
  if (e.code === 'ArrowLeft' || e.code === 'KeyA') inp.kbL = false;
  if (e.code === 'ArrowRight' || e.code === 'KeyD') inp.kbR = false;
});
function releaseInput() { inp.kbL = inp.kbR = inp.btnL = inp.btnR = false; touches.clear(); }
window.addEventListener('blur', () => { releaseInput(); if (state === 'play') togglePause(); });
document.addEventListener('visibilitychange', () => { if (document.hidden) { releaseInput(); if (state === 'play') togglePause(); } });

const sideOf = e => { const r = canvas.getBoundingClientRect(); return e.clientX - r.left < r.width / 2 ? 'L' : 'R'; };
canvas.addEventListener('pointerdown', e => { if (state !== 'play') return; touches.set(e.pointerId, sideOf(e)); try { canvas.setPointerCapture(e.pointerId); } catch (err) {} });
canvas.addEventListener('pointermove', e => { if (touches.has(e.pointerId)) touches.set(e.pointerId, sideOf(e)); });
['pointerup', 'pointercancel'].forEach(n => canvas.addEventListener(n, e => touches.delete(e.pointerId)));

function hold(id, key) {
  const el = $(id), on = e => { e.preventDefault(); inp[key] = true; }, off = () => { inp[key] = false; };
  el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('pointerleave', off);
  el.addEventListener('contextmenu', e => e.preventDefault());
}
hold('btn-left', 'btnL'); hold('btn-right', 'btnR');
$('btn-start').addEventListener('click', startGame);
$('btn-retry').addEventListener('click', startGame);
$('btn-resume').addEventListener('click', togglePause);
$('btn-pause').addEventListener('click', togglePause);
soundBtn.addEventListener('click', toggleMute);

// One permanent animation loop: fixed 1/60 s steps, drawn once per frame
function frame(ts) {
  requestAnimationFrame(frame);
  if (!lastFrame) lastFrame = ts;
  acc += Math.min((ts - lastFrame) / 1000, 0.1); lastFrame = ts;
  while (acc >= STEP) { if (state === 'idle' || state === 'play' || state === 'dying') step(); acc -= STEP; }
  draw();
}

bestEl.textContent = getNum(BEST_KEY);
bestHeight = getNum(BEST_H_KEY);
paintSound();
resetState();
requestAnimationFrame(frame);`,

  seo: {
    title: 'Sky Hopper Game — HTML Canvas Endless Climber in JS',
    description: 'Doodle-Jump-style climber in HTML5 canvas and JS: auto-bounce physics, crumbling and spring platforms, stompable birds, propeller and shield power-ups.',
    about: {
      title: 'Sky Hopper — Auto-Bounce Physics, Stompable Enemies and an Endless Generated Climb',
      description: `Sky Hopper is an endless vertical climber in the Doodle Jump tradition, drawn on a single HTML5 \`<canvas>\` with no libraries. The hopper never stops bouncing, so the only input is left and right. That makes it learnable in a second, and the difficulty comes from the world instead: it is generated as you rise, platforms get narrower and further apart, sliding ones get faster, and past roughly 130 m birds and spiked orbs start drifting through the gaps.

**Bounce physics with a one-way landing test**

The simulation runs on a fixed 1/60-second step. Gravity adds 0.36 px per step to the vertical speed, a normal bounce launches at -10.6 (an apex of about 156 px) and a spring pad at -16.5 (about 378 px). The landing test only runs while the hopper is falling, and it only fires when the previous step's feet were above a platform's top edge and this step's feet are at or below it. That is why you can rise straight up through a platform and only land when coming down. The test insets each platform by 6 px per side so a toe on the edge is a miss, and spring pads are raised 8 px so your feet sit on the pad rather than inside it.

**Steering with momentum**

Holding left or right accelerates the hopper by 0.6 px per step up to 4.6; letting go applies a 0.86 drag, so it glides to a stop. Leaving one edge of the screen brings you back on the other, and a second copy of the hopper is drawn on the far side while it straddles the edge so it never pops.

**A camera that only moves up**

The camera eases toward a point 40% down the view, but only upward. The ease (22% of the remaining distance per step) keeps big spring launches smooth. Because it never scrolls back, falling past the bottom edge ends the run, unless a shield is active, in which case it pops and throws you back up.

**Generating a level that can always be finished**

Each new row of platforms is placed above the previous one by a random gap. Early gaps run 50 to 78 px and widen to 70 to 124 px at 900 m, always under the 156 px bounce so no row is out of reach. A difficulty value (height divided by 900 m) shrinks platforms from 66 to 52 px, raises the chance of crumbling platforms from 6% to 22% and of sliding platforms from 10% to 30%, and speeds the sliders up. Early rows sometimes get a second platform to keep the first climb forgiving. A crumbling platform still gives a full bounce before it breaks, so it is always a safe stepping stone. Anything that scrolls below the view is discarded.

**Platforms, power-ups and enemies**

Green platforms are solid, blue ones slide, amber ones crack apart into tumbling fragments right after your bounce, and purple ones carry a visible coil that squashes and launches you much higher. Stars are worth 10 points. A propeller lifts you for 2.6 seconds, makes you immune and bulldozes anything in your way. A shield absorbs one hit or one fall. Birds can be stomped from above for 25 points and a free bounce, but touching one from the side kills you. Spiked orbs cannot be stomped at all, so you steer around them.

**Altitude biomes and parallax**

The sky blends smoothly between Meadow Sky, High Clouds, Sunset Ridge (500 m) and Starfield (900 m), and a banner announces each one. Cloud layers drift at three parallax speeds, the sun fades out as you climb, and stars and a ringed planet fade in near the top. A dashed line marks every 100 m, and a gold line marks your best height from a previous run.

**Controls, sound and saving**

Steer with the arrow keys or A and D, with the two on-screen buttons, or by holding the left or right half of the canvas on a touch screen. P or Escape pauses, M mutes, and the game also pauses on its own when the tab loses focus. All sound is synthesised with WebAudio, so nothing is downloaded. Your best score, best height and mute setting are saved in localStorage, and the canvas scales with devicePixelRatio and honours \`prefers-reduced-motion\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the climb', text: 'Press "Hop" or Space. startGame() rebuilds the world, unlocks audio (browsers require a click first) and drops the hopper onto the bottom platform. It bounces on its own from the first frame.' },
        { title: 'Steer three ways', text: 'Use the arrow keys or A and D, the two on-screen buttons, or hold the left or right half of the canvas with a finger. All three set the same left/right state, and holding two sources together does not double the speed.' },
        { title: 'Read the platforms', text: 'Green is solid. Blue slides. Amber cracks apart after one bounce, so do not plan to land on it twice. Purple has a spring coil and launches you about 2.4 times higher, which is how you skip a hard stretch.' },
        { title: 'Collect and stomp', text: 'Grab stars for 10 points each. Pick up a propeller for 2.6 seconds of invulnerable lift or a shield to survive one hit or one fall. Land on a bird from above to stomp it for 25 points; steer around spiked orbs.' },
        { title: 'Beat your marker', text: 'Dashed lines mark every 100 m and a gold line marks your best height. The first crossing of each sky (200, 500 and 900 m) shows a banner. Score is height in metres plus 10 per star and 25 per stomp.' },
        { title: 'Tune the feel', text: 'Change GRAV, JUMP_V, SPRING_V, MOVE and DRAG for the bounce and steering feel. The gap range in genRow() and the odds in rollType() set how hard the climb gets, and BIOMES holds the sky colours.' },
      ],
    },
    features: [
      'Fixed 1/60 s simulation with a one-way landing test: rise through platforms, bounce only when falling onto them',
      'Steering with momentum, edge wrap and a ghost copy of the hopper so it never pops at the screen edge',
      'Procedural level generator that keeps every gap under the bounce height and ramps difficulty with altitude',
      'Four platform types: solid, sliding, crumbling into tumbling fragments, and springs with a visible compressing coil',
      'Stompable birds, spiked orbs you must avoid, plus star pickups, a propeller lift and a one-hit shield',
      'Four blended sky biomes with parallax clouds, a fading sun, twinkling stars, a ringed planet and 100 m marker lines',
      'Hold-a-side touch steering, on-screen buttons and keyboard, with arrows and Space never scrolling the page',
      'Synthesised WebAudio sound with a saved mute toggle, pause on blur, saved best score and best height',
    ],
    useCases: [
      { icon: 'APP', title: 'Hold-a-side touch game template', desc: 'Automatic bouncing leaves one axis of input, so the hold-the-left-or-right-half scheme is a reusable base for any one-thumb mobile game where vertical movement is automatic.' },
      { icon: 'LEARN', title: 'Teaching one-way collision and level generation', desc: 'A crossing-based landing test and a generator bounded by the jump height are the two ideas behind every endless platformer, shown here in a short readable file you can step through.' },
      { icon: 'CODE', title: 'Starting point for a fuller climber', desc: 'Pools, hazards and pickups are already separate arrays, so you can add enemies that shoot, wind zones, jetpacks or a daily seed without touching the fixed-step loop.' },
      { icon: 'FORM', title: 'Playable demo on a games page', desc: 'It starts instantly with no sign-up or network call, learns in seconds and ends in short runs, which suits an embeddable demo on a portfolio, games portal or app landing page.' },
      { icon: 'FLOW', title: 'Loading or 404 screen distraction', desc: 'Because it needs nothing but a canvas, it works as an interactive filler on an error or waiting screen, like the [Lane Runner Endless Game](/ui-snippets/lane-runner-game/).' },
      { icon: 'DESIGN', title: 'Parallax and altitude-theming reference', desc: 'Interpolating sky colours by height and drifting cloud layers at different speeds is a directly reusable pattern for any vertically scrolling scene. See also the [Flap Dodge Game](/ui-snippets/flap-dodge-game/).' },
    ],
    faqs: [
      { q: 'Why is there no jump button?', a: 'The hopper bounces automatically every time it lands, so the whole control surface is left and right. That keeps the game playable with one thumb on a phone, and it moves the skill into aiming your descent at the next platform instead of timing a press.' },
      { q: 'Can the level ever be impossible?', a: 'No. Each row is placed above the last by at most 124 px, while a normal bounce rises about 156 px, and horizontal wrap means a platform is never far sideways. Crumbling platforms still give a full bounce before breaking, so every row stays reachable.' },
      { q: 'How do I stomp an enemy or survive a hit?', a: 'Land on a bird from above while falling to stomp it, score 25 and bounce again. Spiked orbs cannot be stomped. A shield absorbs one hit or one fall, and a propeller makes you immune while it lasts, destroying whatever you fly through.' },
      { q: 'Does it work on phones and tablets?', a: 'Yes. Hold the left or right half of the canvas, or use the two buttons underneath, with Pointer Events and touch-action disabled so the page does not scroll. The canvas scales with devicePixelRatio, and the game pauses if you switch apps.' },
      { q: 'What is saved between visits?', a: 'Your best score, your best height and the sound setting are stored in localStorage, and the best height appears as a gold line during later runs. Every read and write is wrapped in try/catch, so the game still runs where storage is blocked.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to walk through the crossing-based landing test, the fixed-step loop, and how genRow() keeps every gap under the bounce height. Then extend it: device-tilt steering through the DeviceOrientation API, a daily seeded climb with a shareable score card, birds that drop eggs, wind zones that push you sideways in the Sunset Ridge sky, unlockable hopper skins bought with stars, or a ghost replay of your best run. You could also ask it to port the game into a React component with useRef and useEffect while keeping the single animation loop.`,
      prompt: `Build a mobile-friendly endless vertical climber (Doodle-Jump style) on one HTML5 canvas in plain HTML, CSS and JavaScript, no frameworks. Scale the canvas with devicePixelRatio.

Core mechanics:
- A round character permanently under gravity that bounces automatically; there is NO jump button. Steering is left/right only, with acceleration and drag, and horizontal movement wraps around the screen edges (draw a second copy while it straddles an edge).
- Run a fixed 1/60 s step. Landing is one-way: only while falling, and only when the previous step's feet were above the platform top and the current step's feet are at or below it. Use squash-and-stretch on the character.
- A camera that eases toward 40% down the view but only ever moves up. Falling below the bottom ends the run.
- Procedural generation, one row at a time above the highest platform, with a gap always below the bounce apex (about 50-78 px early, up to about 124 px at 900 m). Discard anything that scrolls below the view. Difficulty (height / 900 m) narrows platforms and raises the odds of special ones.
- Platform types: solid, sliding (reverses at walls), crumbling (breaks into tumbling fragments right after the bounce), and spring (visible compressing coil, much higher bounce).
- Pickups and hazards: stars worth 10 points; a propeller for 2.6 s of invulnerable upward lift that destroys enemies; a shield absorbing one hit or one fall (throwing the player back up). Birds that patrol sideways and can be stomped from above for 25 points; spiked orbs that cannot be stomped.
- Four sky biomes blended by height (Meadow Sky, High Clouds, Sunset Ridge, Starfield) with a banner at each, parallax clouds, a fading sun, twinkling stars and a planet at the top, dashed lines every 100 m and a gold line at the saved best height.

Controls and polish: arrow keys / A and D, two on-screen hold buttons, and holding the left or right half of the canvas via Pointer Events (touch-action none; arrows and Space must never scroll the page). P or Escape pauses, M mutes, and the game pauses on blur or when the tab is hidden. Synthesise sound with WebAudio (bounce, spring, crumble, star, stomp, pop, hurt). Respect prefers-reduced-motion. Show start, pause and game-over screens with score, height, stars and stomps. Save best score, best height and the mute setting in localStorage with try/catch.`,
    },
  },
};

export default skyHopperGame;
