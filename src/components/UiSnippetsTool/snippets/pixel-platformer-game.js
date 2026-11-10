const pixelPlatformerGame = {
  id: 'pixel-platformer-game',
  title: 'Pixel Platformer Game',
  lastmod: '2026-11-10',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🧗</span>
      <h2>Pixel Platformer</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Coins <b id="coins">0</b></span>
      <span class="badge">Lives <b id="lives" class="hearts">♥♥♥</b></span>
      <span class="badge">Best <b id="best-score">—</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="300"></canvas>
    <div class="hud"><span id="hud-level">L1</span><span id="hud-score">0</span><span id="hud-time">0.0s</span></div>
    <button class="mute-btn" id="btn-mute" type="button" aria-label="Sound on" aria-pressed="false">🔊</button>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Pixel Platformer</p>
        <p class="overlay-sub">3 levels. Run and jump, stomp the mushrooms, dodge spikes and bats, grab every coin and reach the flag. You have 3 lives.</p>
        <button class="btn btn-primary" id="btn-start">Start</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title" id="over-title">Level Clear!</p>
        <p class="overlay-sub" id="final-score"></p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Play again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="dpad">
      <button class="ctrl-btn" id="btn-left" aria-label="Move left">◀</button>
      <button class="ctrl-btn" id="btn-right" aria-label="Move right">▶</button>
    </div>
    <button class="jump-btn" id="btn-jump" aria-label="Jump">JUMP</button>
  </div>

  <p class="hint-text">Keyboard: ← → or A D to run, Space / ↑ / W to jump (hold for a higher jump)</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #eef2ff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.stat-badges { display: flex; gap: 5px; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 8px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #2563eb; }
.badge b.hearts { color: #ef4444; letter-spacing: 1px; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #7dd3fc; }
canvas { display: block; width: 100%; height: auto; image-rendering: pixelated; image-rendering: crisp-edges; }

.hud { position: absolute; top: 8px; right: 10px; display: flex; gap: 8px; font-size: 12px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; background: rgba(255,255,255,0.72); padding: 2px 9px; border-radius: 10px; pointer-events: none; line-height: 1.5; }
.mute-btn { position: absolute; top: 7px; left: 10px; width: 28px; height: 24px; border: none; border-radius: 8px; background: rgba(255,255,255,0.72); font-size: 13px; line-height: 1; cursor: pointer; }
.mute-btn[aria-pressed="true"] { opacity: 0.6; }

.overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.84); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #2563eb; color: #fff; }
.btn-primary:hover { background: #1d4ed8; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
.dpad { display: flex; gap: 10px; }
.ctrl-btn, .jump-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn { width: 60px; height: 60px; border-radius: 14px; background: #f8fafc; color: #334155; font-size: 22px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #dbeafe; }
.jump-btn { width: 110px; height: 60px; border-radius: 14px; background: #16a34a; color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 1px; box-shadow: 0 3px 0 #15803d; border-color: #16a34a; }
.jump-btn:active { transform: translateY(3px); box-shadow: none; background: #15803d; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'pixel-platformer-best-score';
const $ = id => document.getElementById(id);

// ── Tuning: change these to change the game feel ──
const T = 20, ROWS = 15, GR = 13;            // tile size, rows per level, first ground row
const GRAV = 0.55, MAX_FALL = 11;
const RUN = 3.1, ACC_GROUND = 0.55, ACC_AIR = 0.38, FRICTION = 0.78;
const JUMP_V = 10.6, JUMP_CUT = 3.6;         // releasing JUMP early cuts the jump to JUMP_CUT
const COYOTE = 6, BUFFER = 7;                // frames of grace: jump just after leaving a ledge / just before landing
const START_LIVES = 3;

// ── Levels: plain data. Tile coordinates (column, row). Row GR (13) is the ground surface. ──
const row = (c, r, n) => Array.from({ length: n }, (_, i) => [c + i, r]);
const LEVELS = [
  { name: 'Green Hills', par: 45, cols: 84,
    theme: { skyA: '#7dd3fc', skyB: '#e0f2fe', far: '#bfdbfe', near: '#86efac', grass: '#4ade80', grass2: '#16a34a', dirt: '#a16207', dirt2: '#854d0e', sun: true },
    ground: [[0, 17], [20, 40], [44, 64], [67, 84]],
    plats: [[8, 10, 4], [23, 9, 3], [28, 7, 3], [47, 10, 4], [52, 8, 3], [70, 10, 4]],
    blocks: [[33, 11, 2, 2]],
    spikes: [[36, 2], [58, 3]],
    coins: [].concat(row(9, 9, 3), row(24, 8, 2), row(29, 6, 2), [[17, 11], [18, 10], [19, 11]], [[41, 10], [42, 10]], row(33, 9, 2), row(48, 9, 3), row(53, 7, 2), row(58, 10, 3), row(71, 9, 3), row(76, 12, 3)),
    walkers: [12, 26, 48, 62, 72, 78], bats: [[30, 8], [55, 6]], springs: [], cps: [46], flag: 80 },
  { name: 'Sunset Ridge', par: 70, cols: 110,
    theme: { skyA: '#fb923c', skyB: '#fde68a', far: '#fdba74', near: '#fcd34d', grass: '#a3e635', grass2: '#65a30d', dirt: '#92400e', dirt2: '#78350f', sun: true },
    ground: [[0, 14], [18, 32], [36, 46], [50, 56], [60, 76], [80, 92], [95, 110]],
    plats: [[15, 10, 3], [33, 9, 3], [47, 10, 3], [57, 9, 3], [77, 9, 3], [93, 10, 2], [40, 6, 4], [64, 8, 3], [70, 6, 3]],
    blocks: [[22, 11, 2, 2], [66, 11, 3, 2], [84, 10, 2, 3]],
    spikes: [[26, 3], [69, 3], [88, 2]],
    coins: [].concat(row(15, 9, 3), row(22, 9, 2), row(26, 10, 3), row(33, 8, 3), [[38, 8], [38, 6]], row(40, 5, 4), row(47, 9, 3), row(57, 8, 3), row(64, 7, 3), row(66, 9, 3), row(70, 5, 3), row(77, 8, 3), row(84, 8, 2), row(88, 10, 2), row(93, 9, 2), row(100, 12, 4)),
    walkers: [8, 21, 30, 44, 62, 72, 82, 100, 104], bats: [[34, 8], [52, 7], [74, 6], [90, 8]], springs: [38], cps: [52, 86], flag: 106 },
  { name: 'Midnight Run', par: 100, cols: 130,
    theme: { skyA: '#0f172a', skyB: '#312e81', far: '#3730a3', near: '#4338ca', grass: '#818cf8', grass2: '#4f46e5', dirt: '#334155', dirt2: '#1e293b', moon: true },
    ground: [[0, 12], [16, 26], [31, 38], [42, 48], [54, 60], [64, 66], [70, 84], [90, 96], [100, 106], [110, 130]],
    plats: [[13, 10, 2], [28, 10, 2], [39, 10, 2], [50, 10, 2], [61, 10, 2], [67, 10, 2], [86, 10, 2], [97, 10, 2], [107, 10, 2], [20, 8, 3], [44, 7, 3], [72, 7, 4], [114, 8, 3]],
    blocks: [[34, 11, 2, 2], [75, 11, 2, 2], [118, 10, 2, 3]],
    spikes: [[18, 3], [56, 3], [80, 2], [93, 2], [102, 3], [122, 3]],
    coins: [].concat(row(13, 9, 2), row(18, 10, 3), row(20, 7, 3), row(28, 9, 2), row(34, 9, 2), row(39, 9, 2), row(44, 6, 3), row(50, 9, 2), row(56, 10, 3), row(61, 9, 2), row(67, 9, 2), row(72, 6, 4), row(75, 9, 2), row(86, 9, 2), row(97, 9, 2), row(102, 10, 3), row(107, 9, 2), row(114, 7, 3), row(118, 8, 2), row(122, 10, 3)),
    walkers: [8, 22, 36, 44, 59, 73, 83, 91, 105, 113, 116], bats: [[14, 7], [30, 8], [47, 6], [63, 7], [78, 5], [88, 8], [99, 7], [108, 6], [120, 7]], springs: [45, 112], cps: [43, 92], flag: 127 },
];

// ── Pixel sprites: each row is a string, one character per pixel (drawn at 2x) ──
const PAL = { h: '#ef4444', s: '#fcd9b0', k: '#1e293b', b: '#2563eb', w: '#ffffff', r: '#dc2626', c: '#fde68a', m: '#92400e' };
const P_TOP = ['..hhh..', '.hhhhh.', '.sskss.', '.sssss.', '..bbb..', '.bbbbb.'];
const P_LEGS = { idle: ['.bb.bb.', '.bb.bb.', '.kk.kk.'], run1: ['bb..bb.', 'kk..kk.', '.......'], run2: ['.bbbb..', '..bb...', '..kk...'], jump: ['bb...bb', 'bb...bb', 'k.....k'] };
const WALK_TOP = ['.rrrrr.', 'rrrrrrr', 'rwwrwwr', 'rwkrwkr', 'rrrrrrr', '.ccccc.'];
const WALK_LEGS = [['.m...m.'], ['..m.m..']];
const BAT = [['k.....k', 'kk.k.kk', 'kkrkrkk', '.kkkkk.', '..k.k..'], ['.......', 'kk.k.kk', 'kkrkrkk', 'kkkkkkk', '.k...k.']];

function sprite(rows, x, y, flip, w) {
  for (let j = 0; j < rows.length; j++) for (let i = 0; i < rows[j].length; i++) {
    const ch = rows[j][i]; if (ch === '.') continue;
    ctx.fillStyle = PAL[ch];
    ctx.fillRect(Math.round(x + (flip ? (w - 1 - i) : i) * 2), Math.round(y + j * 2), 2, 2);
  }
}

// ── State ──
let L, player, cam, keys, running, rafId, lastFrame, acc, shake, tick, banner;
let levelIdx = 0, score = 0, lives = START_LIVES, coinCount = 0, coinTotal = 0, elapsed = 0, mode = 'start';
let particles = [], texts = [], muted = false, ac = null;

const startOverlay = $('start-overlay'), gameoverOverlay = $('gameover-overlay');
const hudTime = $('hud-time'), hudScore = $('hud-score'), hudLevel = $('hud-level');
const coinsEl = $('coins'), livesEl = $('lives'), bestEl = $('best-score');
const finalEl = $('final-score'), bestMsgEl = $('best-msg'), overTitle = $('over-title'), retryBtn = $('btn-retry'), muteBtn = $('btn-mute');

function getBest() { try { const v = parseInt(localStorage.getItem(BEST_KEY), 10); return isNaN(v) ? null : v; } catch (e) { return null; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

// ── Sound: tiny Web Audio synth, no files ──
function tone(f, dur, type, to, vol, delay) {
  if (muted) return;
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const t0 = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(vol || 0.05, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch (e) {}
}
const SFX = {
  jump: () => tone(320, 0.14, 'square', 720, 0.04),
  coin: () => { tone(988, 0.07, 'square', 0, 0.04); tone(1318, 0.14, 'square', 0, 0.04, 0.07); },
  stomp: () => tone(260, 0.16, 'triangle', 70, 0.08),
  hurt: () => tone(220, 0.35, 'sawtooth', 50, 0.06),
  spring: () => tone(240, 0.25, 'square', 900, 0.05),
  check: () => { tone(660, 0.1, 'square', 0, 0.04); tone(990, 0.18, 'square', 0, 0.04, 0.1); },
  win: () => [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.16, 'square', 0, 0.045, i * 0.11)),
  over: () => [392, 330, 262, 196].forEach((f, i) => tone(f, 0.22, 'triangle', 0, 0.06, i * 0.16)),
};

// ── Level building ──
function buildLevel(i) {
  const d = LEVELS[i];
  const grid = Array.from({ length: ROWS }, () => new Uint8Array(d.cols));   // 0 air, 1 ground, 2 one-way plank, 3 spikes, 5 brick
  d.ground.forEach(g => { for (let c = g[0]; c < g[1]; c++) for (let r = GR; r < ROWS; r++) grid[r][c] = 1; });
  d.plats.forEach(p => { for (let k = 0; k < p[2]; k++) grid[p[1]][p[0] + k] = 2; });
  d.blocks.forEach(b => { for (let c = b[0]; c < b[0] + b[2]; c++) for (let r = b[1]; r < b[1] + b[3]; r++) grid[r][c] = 5; });
  d.spikes.forEach(s => { for (let k = 0; k < s[1]; k++) grid[GR - 1][s[0] + k] = 3; });
  const level = {
    cols: d.cols, grid, theme: d.theme, name: d.name, par: d.par,
    coins: d.coins.map(c => ({ x: c[0] * T + T / 2, y: c[1] * T + T / 2, got: false })),
    enemies: [],
    springs: d.springs.map(c => ({ x: c * T, y: GR * T - 8, w: T, h: 8, t: 0 })),
    cps: d.cps.map(c => ({ x: c * T, y: GR * T - 18, on: false })),
    flag: { x: d.flag * T, y: (GR - 3) * T, w: T, h: 3 * T },
  };
  d.walkers.forEach(c => level.enemies.push({ type: 'walker', x: c * T + 3, y: GR * T - 14, w: 14, h: 14, vx: (c % 2 ? 0.6 : -0.6), dead: 0 }));
  d.bats.forEach(b => level.enemies.push({ type: 'bat', x: b[0] * T, x0: b[0] * T, y: b[1] * T, y0: b[1] * T, w: 14, h: 10, vx: 0.8, dead: 0, ph: b[0] }));
  level.respawn = { x: 2 * T + 3, y: GR * T - 18 };
  return level;
}
function tileAt(c, r) { if (c < 0 || c >= L.cols) return 1; if (r < 0 || r >= ROWS) return 0; return L.grid[r][c]; }
const isSolid = t => t === 1 || t === 5;

function loadLevel(i) {
  levelIdx = i; L = buildLevel(i);
  player = { x: L.respawn.x, y: L.respawn.y, w: 14, h: 18, vx: 0, vy: 0, onGround: false, face: 1, coyote: 0, buffer: 0, invuln: 0, sq: 1, anim: 0, boost: false };
  cam = 0; elapsed = 0; coinCount = 0; coinTotal = L.coins.length; shake = 0; tick = 0; acc = 0;
  particles = []; texts = [];
  keys = { left: false, right: false, jump: false };
  banner = { text: 'LEVEL ' + (i + 1), sub: L.name, t: 110 };
  updateHud();
}

function hearts() { return lives > 0 ? '♥'.repeat(lives) : '–'; }
function updateHud() {
  coinsEl.textContent = coinCount + '/' + coinTotal;
  livesEl.textContent = hearts();
  hudLevel.textContent = 'L' + (levelIdx + 1);
  hudScore.textContent = score;
  hudTime.textContent = elapsed.toFixed(1) + 's';
}

// ── Effects ──
function burst(x, y, color, n) {
  for (let i = 0; i < n; i++) particles.push({ x, y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.9) * 5, life: 18 + Math.random() * 14, color });
}
function floatText(x, y, text, color) { texts.push({ x, y, text, color: color || '#fff', life: 45 }); }

// ── Player actions ──
function requestJump() { if (player) player.buffer = BUFFER; }

function loseLife(respawn) {
  lives--; SFX.hurt(); shake = 8; burst(player.x + 7, player.y + 9, '#ef4444', 16); updateHud();
  if (lives <= 0) return gameOver();
  if (respawn) { player.x = L.respawn.x; player.y = L.respawn.y; player.vx = 0; player.vy = 0; floatText(player.x, player.y - 8, 'Ouch!', '#fecaca'); }
  else { player.vy = -6; player.vx = -player.face * 2.6; }
  player.invuln = 100;
}

function overlaps(ax, ay, aw, ah, bx, by, bw, bh) { return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by; }

// ── Physics step (fixed 1/60 s) ──
function update() {
  tick++; elapsed += 1 / 60;
  const p = player;

  // Horizontal: accelerate toward the target speed, friction when no key is held
  const want = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);
  const acc_ = p.onGround ? ACC_GROUND : ACC_AIR;
  if (want) { p.vx += want * acc_; p.vx = Math.max(-RUN, Math.min(RUN, p.vx)); p.face = want; }
  else p.vx *= FRICTION;
  if (Math.abs(p.vx) < 0.05) p.vx = 0;

  // Move X, resolve against solid tiles
  p.x += p.vx;
  const top = Math.floor(p.y / T), bot = Math.floor((p.y + p.h - 0.01) / T);
  if (p.vx > 0) {
    const c = Math.floor((p.x + p.w) / T);
    for (let r = top; r <= bot; r++) if (isSolid(tileAt(c, r))) { p.x = c * T - p.w; p.vx = 0; break; }
  } else if (p.vx < 0) {
    const c = Math.floor(p.x / T);
    for (let r = top; r <= bot; r++) if (isSolid(tileAt(c, r))) { p.x = (c + 1) * T; p.vx = 0; break; }
  }
  if (p.x < 0) p.x = 0;

  // Jump: buffered press + coyote time, and a shorter hop when JUMP is released early
  if (p.onGround) p.coyote = COYOTE; else if (p.coyote > 0) p.coyote--;
  if (p.buffer > 0) p.buffer--;
  if (p.buffer > 0 && p.coyote > 0) {
    p.vy = -JUMP_V; p.coyote = 0; p.buffer = 0; p.onGround = false; p.boost = false; p.sq = 1.3;
    SFX.jump(); burst(p.x + 7, p.y + p.h, '#e2e8f0', 4);
  }
  if (!keys.jump && !p.boost && p.vy < -JUMP_CUT) p.vy = -JUMP_CUT;

  // Gravity and move Y
  const prevBottom = p.y + p.h;
  p.vy = Math.min(p.vy + GRAV, MAX_FALL);
  p.y += p.vy;
  const wasGround = p.onGround;
  p.onGround = false;
  const c0 = Math.floor(p.x / T), c1 = Math.floor((p.x + p.w - 0.01) / T);
  if (p.vy >= 0) {
    const r = Math.floor((p.y + p.h) / T);
    for (let c = c0; c <= c1; c++) {
      const t = tileAt(c, r);
      if (isSolid(t) || (t === 2 && prevBottom <= r * T + 1)) {   // planks only catch you from above
        p.y = r * T - p.h; p.vy = 0; p.onGround = true; p.boost = false; break;
      }
    }
  } else {
    const r = Math.floor(p.y / T);
    for (let c = c0; c <= c1; c++) if (isSolid(tileAt(c, r))) { p.y = (r + 1) * T; p.vy = 0; break; }
  }
  if (p.onGround && !wasGround) { p.sq = 0.72; burst(p.x + 7, p.y + p.h, '#e2e8f0', 4); }
  p.sq += (1 - p.sq) * 0.2;
  if (p.invuln > 0) p.invuln--;
  p.anim += Math.abs(p.vx) * 0.12;

  // Fell into a pit
  if (p.y > H + 30) { loseLife(true); if (!running) return; }

  // Spikes (a smaller hitbox than the tile, so near-misses feel fair)
  const sc0 = Math.floor(p.x / T), sc1 = Math.floor((p.x + p.w) / T), sr0 = Math.floor(p.y / T), sr1 = Math.floor((p.y + p.h) / T);
  for (let r = sr0; r <= sr1; r++) for (let c = sc0; c <= sc1; c++) {
    if (tileAt(c, r) === 3 && p.invuln <= 0 && overlaps(p.x, p.y, p.w, p.h, c * T + 3, r * T + 9, T - 6, 11)) { loseLife(true); if (!running) return; }
  }

  // Springs
  L.springs.forEach(s => {
    if (s.t > 0) s.t--;
    if (p.vy > 0 && overlaps(p.x, p.y, p.w, p.h, s.x, s.y, s.w, s.h) && prevBottom <= s.y + 6) {
      p.vy = -15; p.boost = true; p.sq = 1.3; s.t = 10; SFX.spring();
    }
  });

  // Enemies
  L.enemies.forEach(e => {
    if (e.dead) { e.dead--; return; }
    if (e.type === 'walker') {
      e.x += e.vx;
      const ahead = Math.floor((e.x + (e.vx > 0 ? e.w : 0)) / T);
      const wall = isSolid(tileAt(ahead, Math.floor((e.y + e.h / 2) / T)));
      const edge = !(isSolid(tileAt(ahead, Math.floor((e.y + e.h + 1) / T))) || tileAt(ahead, Math.floor((e.y + e.h + 1) / T)) === 2);
      if (wall || edge) e.vx = -e.vx;
    } else {
      e.x += e.vx; if (Math.abs(e.x - e.x0) > 60) e.vx = -e.vx;
      e.y = e.y0 + Math.sin(tick * 0.07 + e.ph) * 14;
    }
    if (overlaps(p.x, p.y, p.w, p.h, e.x, e.y, e.w, e.h)) {
      if (p.vy > 0 && prevBottom <= e.y + 8) {          // stomp from above
        e.dead = 16; p.vy = keys.jump ? -10 : -7; p.boost = true; p.sq = 1.25;
        score += 50; SFX.stomp(); shake = 3; burst(e.x + e.w / 2, e.y + e.h / 2, e.type === 'bat' ? '#475569' : '#ef4444', 10); floatText(e.x, e.y - 6, '+50', '#fde68a');
      } else if (p.invuln <= 0) { loseLife(false); if (!running) return; }
    }
  });

  // Coins
  L.coins.forEach(c => {
    if (!c.got && overlaps(p.x, p.y, p.w, p.h, c.x - 8, c.y - 8, 16, 16)) {
      c.got = true; coinCount++; score += 10; SFX.coin(); burst(c.x, c.y, '#facc15', 6); floatText(c.x, c.y - 8, '+10', '#fde68a');
    }
  });

  // Checkpoints
  L.cps.forEach(cp => {
    if (!cp.on && p.x > cp.x) { cp.on = true; L.respawn = { x: cp.x, y: cp.y }; SFX.check(); burst(cp.x + 4, cp.y, '#4ade80', 12); floatText(cp.x - 14, cp.y - 8, 'Checkpoint!', '#bbf7d0'); }
  });

  // Goal
  if (overlaps(p.x, p.y, p.w, p.h, L.flag.x, L.flag.y, L.flag.w, L.flag.h)) return levelClear();

  // Camera: eases toward the player with a little look-ahead, clamped to the level
  const target = p.x + p.w / 2 - W / 2 + p.face * 28;
  cam += (Math.max(0, Math.min(L.cols * T - W, target)) - cam) * 0.12;

  particles.forEach(q => { q.x += q.vx; q.y += q.vy; q.vy += 0.2; q.life--; });
  particles = particles.filter(q => q.life > 0);
  texts.forEach(t => { t.y -= 0.5; t.life--; });
  texts = texts.filter(t => t.life > 0);
  if (shake > 0) shake *= 0.85;
  if (banner && banner.t > 0) banner.t--;
  updateHud();
}

// ── Drawing ──
function tri(u) { return Math.abs((((u % 120) + 120) % 120) - 60) / 60; }

function drawBackground() {
  const th = L.theme;
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, th.skyA); g.addColorStop(1, th.skyB);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  if (th.moon) {
    ctx.fillStyle = '#e0e7ff'; ctx.beginPath(); ctx.arc(290, 50, 18, 0, 7); ctx.fill();
    ctx.fillStyle = th.skyA; ctx.beginPath(); ctx.arc(298, 45, 16, 0, 7); ctx.fill();
    ctx.fillStyle = '#fff';
    for (let i = 0; i < 40; i++) { if ((i + Math.floor(tick / 30)) % 7 === 0) continue; ctx.fillRect((i * 97) % W, (i * 53) % 150, 2, 2); }
  } else if (th.sun) { ctx.fillStyle = '#fef08a'; ctx.beginPath(); ctx.arc(300, 54, 24, 0, 7); ctx.fill(); }
  // clouds (or drifting haze at night)
  ctx.fillStyle = th.moon ? 'rgba(165,180,252,0.18)' : 'rgba(255,255,255,0.85)';
  for (let i = 0; i < 5; i++) {
    const x = (((i * 150 - cam * 0.2 - tick * 0.15) % (W + 140)) + W + 140) % (W + 140) - 70, y = 30 + (i * 37) % 70;
    ctx.fillRect(x, y, 44, 10); ctx.fillRect(x + 8, y - 6, 26, 8); ctx.fillRect(x + 4, y + 10, 36, 4);
  }
  // two mountain layers at different parallax speeds
  [[0.25, th.far, 190, 70], [0.5, th.near, 225, 55]].forEach(m => {
    ctx.fillStyle = m[1]; ctx.beginPath(); ctx.moveTo(0, H);
    for (let x = 0; x <= W + 10; x += 10) ctx.lineTo(x, m[2] - m[3] * (1 - tri(x + cam * m[0])));
    ctx.lineTo(W + 10, H); ctx.closePath(); ctx.fill();
  });
}

function drawTiles() {
  const th = L.theme, c0 = Math.max(0, Math.floor(cam / T)), c1 = Math.min(L.cols - 1, Math.floor((cam + W) / T) + 1);
  for (let r = 0; r < ROWS; r++) for (let c = c0; c <= c1; c++) {
    const t = L.grid[r][c]; if (!t) continue;
    const x = c * T, y = r * T;
    if (t === 1) {
      ctx.fillStyle = th.dirt; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = th.dirt2; const h = (c * 7 + r * 13) % 5;
      if (h < 3) ctx.fillRect(x + ((c * 3 + r * 5) % 13) + 2, y + ((r * 7 + c) % 13) + 3, 3, 2);
      const above = r > 0 ? L.grid[r - 1][c] : 0;
      if (!isSolid(above)) { ctx.fillStyle = th.grass; ctx.fillRect(x, y, T, 5); ctx.fillStyle = th.grass2; ctx.fillRect(x, y + 5, T, 2); for (let k = 0; k < 4; k++) ctx.fillRect(x + k * 5 + 1, y + 7, 2, 2); }
    } else if (t === 5) {
      ctx.fillStyle = '#b45309'; ctx.fillRect(x, y, T, T);
      ctx.fillStyle = '#78350f'; ctx.fillRect(x, y + 9, T, 2); ctx.fillRect(x, y + T - 1, T, 1);
      ctx.fillRect(x + (r % 2 ? 6 : 13), y, 2, 10); ctx.fillRect(x + (r % 2 ? 13 : 6), y + 11, 2, 9);
      ctx.fillStyle = '#d97706'; ctx.fillRect(x, y, T, 1);
    } else if (t === 2) {
      ctx.fillStyle = '#d97706'; ctx.fillRect(x, y, T, 8);
      ctx.fillStyle = '#fbbf24'; ctx.fillRect(x, y, T, 2);
      ctx.fillStyle = '#92400e'; ctx.fillRect(x, y + 6, T, 2); ctx.fillRect(x + 9, y + 2, 2, 4);
    } else if (t === 3) {
      ctx.fillStyle = '#e2e8f0';
      for (let k = 0; k < 2; k++) { ctx.beginPath(); ctx.moveTo(x + k * 10, y + T); ctx.lineTo(x + k * 10 + 5, y + 6); ctx.lineTo(x + k * 10 + 10, y + T); ctx.closePath(); ctx.fill(); }
      ctx.fillStyle = '#94a3b8'; for (let k = 0; k < 2; k++) ctx.fillRect(x + k * 10 + 5, y + 8, 2, 12);
    }
  }
}

function drawWorld() {
  drawTiles();
  // springs
  L.springs.forEach(s => {
    const h = s.t > 0 ? 4 : 8;
    ctx.fillStyle = '#ef4444'; ctx.fillRect(s.x + 2, s.y + 8 - h, T - 4, h);
    ctx.fillStyle = '#e2e8f0'; ctx.fillRect(s.x + 5, s.y + 8 - h, T - 10, 2);
  });
  // coins (a spin: the width follows a sine)
  L.coins.forEach((c, i) => {
    if (c.got || c.x < cam - 20 || c.x > cam + W + 20) return;
    const bob = Math.sin(tick * 0.08 + i) * 2, sw = Math.max(2, Math.abs(Math.cos(tick * 0.07 + i)) * 8);
    ctx.fillStyle = '#ca8a04'; ctx.fillRect(Math.round(c.x - sw / 2 - 1), Math.round(c.y + bob - 8), Math.round(sw + 2), 16);
    ctx.fillStyle = '#facc15'; ctx.fillRect(Math.round(c.x - sw / 2), Math.round(c.y + bob - 7), Math.round(sw), 14);
    ctx.fillStyle = '#fef9c3'; ctx.fillRect(Math.round(c.x - sw / 2), Math.round(c.y + bob - 6), 2, 5);
  });
  // checkpoints
  L.cps.forEach(cp => {
    ctx.fillStyle = '#cbd5e1'; ctx.fillRect(cp.x + 8, cp.y - 8, 2, 26);
    ctx.fillStyle = cp.on ? '#4ade80' : '#94a3b8'; ctx.fillRect(cp.x + 10, cp.y - 8, 10, 7);
  });
  // goal flag
  const f = L.flag;
  ctx.fillStyle = '#e2e8f0'; ctx.fillRect(f.x + 8, f.y, 3, f.h);
  ctx.fillStyle = '#facc15'; ctx.fillRect(f.x + 6, f.y - 4, 7, 5);
  const wave = Math.sin(tick * 0.15) * 2;
  ctx.fillStyle = '#22c55e'; ctx.beginPath(); ctx.moveTo(f.x + 11, f.y + 2); ctx.lineTo(f.x + 30 + wave, f.y + 9); ctx.lineTo(f.x + 11, f.y + 17); ctx.closePath(); ctx.fill();
  // enemies
  L.enemies.forEach(e => {
    if (e.x < cam - 30 || e.x > cam + W + 30) return;
    if (e.type === 'walker') {
      if (e.dead) { ctx.fillStyle = '#dc2626'; ctx.fillRect(Math.round(e.x), Math.round(e.y + 9), 14, 5); return; }
      const legs = WALK_LEGS[Math.floor(tick / 8) % 2];
      sprite(WALK_TOP.concat(legs), e.x, e.y, false, 7);
    } else {
      if (e.dead) return;
      sprite(BAT[Math.floor(tick / 7) % 2], e.x, e.y, false, 7);
    }
  });
  // player
  const p = player;
  if (!(p.invuln > 0 && Math.floor(p.invuln / 4) % 2)) {
    const legs = !p.onGround ? P_LEGS.jump : (Math.abs(p.vx) > 0.6 ? (Math.floor(p.anim) % 2 ? P_LEGS.run1 : P_LEGS.run2) : P_LEGS.idle);
    ctx.save();
    ctx.translate(Math.round(p.x + p.w / 2), Math.round(p.y + p.h));
    ctx.scale(2 - p.sq, p.sq);
    sprite(P_TOP.concat(legs), -p.w / 2, -p.h, p.face < 0, 7);
    ctx.restore();
  }
  // particles and floating text
  particles.forEach(q => { ctx.fillStyle = q.color; ctx.fillRect(Math.round(q.x), Math.round(q.y), 3, 3); });
  ctx.font = 'bold 10px system-ui, sans-serif'; ctx.textAlign = 'center';
  texts.forEach(t => { ctx.globalAlpha = Math.min(1, t.life / 20); ctx.fillStyle = t.color; ctx.fillText(t.text, Math.round(t.x), Math.round(t.y)); });
  ctx.globalAlpha = 1;
}

function draw() {
  drawBackground();
  ctx.save();
  const sx = shake > 0.3 ? (Math.random() - 0.5) * shake : 0, sy = shake > 0.3 ? (Math.random() - 0.5) * shake : 0;
  ctx.translate(Math.round(-cam + sx), Math.round(sy));
  drawWorld();
  ctx.restore();
  // level intro banner
  if (banner && banner.t > 0) {
    ctx.globalAlpha = Math.min(1, banner.t / 30);
    ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.strokeStyle = 'rgba(15,23,42,0.6)'; ctx.lineWidth = 4;
    ctx.font = '800 26px system-ui, sans-serif'; ctx.strokeText(banner.text, W / 2, 110); ctx.fillText(banner.text, W / 2, 110);
    ctx.font = '700 13px system-ui, sans-serif'; ctx.strokeText(banner.sub, W / 2, 132); ctx.fillText(banner.sub, W / 2, 132);
    ctx.globalAlpha = 1;
  }
}

// ── Game flow ──
function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  acc += Math.min(ts - lastFrame, 100); lastFrame = ts;
  while (acc >= 1000 / 60 && running) { update(); acc -= 1000 / 60; }   // fixed 1/60 s steps, whatever the display rate
  draw();
  if (running) rafId = requestAnimationFrame(loop);
}
function run() { running = true; lastFrame = 0; startOverlay.classList.add('hidden'); gameoverOverlay.classList.add('hidden'); rafId = requestAnimationFrame(loop); }

function startNew() { score = 0; lives = START_LIVES; loadLevel(0); mode = 'play'; run(); }

function showOver(title, text, btn, nextMode) {
  running = false; cancelAnimationFrame(rafId); draw(); updateHud();
  overTitle.textContent = title; finalEl.textContent = text; retryBtn.textContent = btn; mode = nextMode;
  gameoverOverlay.classList.remove('hidden');
}
function saveBest() {
  const best = getBest();
  if (best === null || score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New best score!'; }
  else bestMsgEl.textContent = '';
}

function levelClear() {
  const bonus = Math.max(0, Math.round((L.par - elapsed) * 5)) + coinCount * 5;
  score += 100 + bonus; SFX.win();
  const info = 'Time ' + elapsed.toFixed(1) + 's · Coins ' + coinCount + '/' + coinTotal + ' · Bonus +' + (100 + bonus);
  bestMsgEl.textContent = '';
  if (levelIdx < LEVELS.length - 1) return showOver('🏁 Level ' + (levelIdx + 1) + ' clear!', info, 'Next level ▶', 'next');
  saveBest();
  showOver('🏆 You win!', 'Final score ' + score + ' · ' + info, 'Play again', 'start');
}
function gameOver() {
  SFX.over(); bestMsgEl.textContent = '';
  showOver('💥 Game over', 'Score ' + score + ' · reached level ' + (levelIdx + 1) + ' of ' + LEVELS.length, 'Try again', 'start');
  saveBest();
}
function onPrimary() {
  if (mode === 'next') { loadLevel(levelIdx + 1); mode = 'play'; run(); } else startNew();
}

// ── Input: keyboard ──
const KEY = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
document.addEventListener('keydown', e => {
  const jumpKey = e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W';
  if (!running) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) onPrimary(); }
    return;
  }
  if (KEY[e.key]) { keys[KEY[e.key]] = true; e.preventDefault(); }
  if (jumpKey) { e.preventDefault(); if (!e.repeat) requestJump(); keys.jump = true; }
});
document.addEventListener('keyup', e => {
  if (!keys) return;
  if (KEY[e.key]) keys[KEY[e.key]] = false;
  if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') keys.jump = false;
});

// ── Input: on-screen buttons (Pointer Events) ──
function hold(id, on, off) {
  const el = $(id);
  const down = e => { e.preventDefault(); on(); };
  const up = e => { e.preventDefault(); off && off(); };
  el.addEventListener('pointerdown', down);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', up);
  el.addEventListener('contextmenu', e => e.preventDefault());
}
hold('btn-left', () => keys.left = true, () => keys.left = false);
hold('btn-right', () => keys.right = true, () => keys.right = false);
hold('btn-jump', () => { keys.jump = true; requestJump(); }, () => { keys.jump = false; });

muteBtn.addEventListener('click', () => {
  muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(muted)); muteBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
});
$('btn-start').addEventListener('click', startNew);
retryBtn.addEventListener('click', onPrimary);

const b = getBest();
bestEl.textContent = b === null ? '—' : b;
loadLevel(0);
draw();`,

  seo: {
    title: 'Pixel Platformer Game: 3 Levels, Enemies & Checkpoints',
    description: 'A free 3-level canvas pixel platformer: stomp enemies, grab coins, hit checkpoints, with coyote time, variable jumps, sound and touch controls. Copy the code.',
    about: {
      title: 'Pixel Platformer: Tile Levels, Stomping Enemies and Game Feel on Canvas',
      description: `A platformer is the classic proving ground for 2D game programming because a small game has to get several hard things right at once: gravity and collision against a tile map, enemies that can be stomped, a camera that follows the player through a level wider than the screen, and the many small touches that make a jump feel good. This snippet is a complete three-level pixel platformer on a single HTML5 \`<canvas>\`, with no libraries and no image files: the sprites are drawn from strings of characters, the sound is synthesised with the Web Audio API, and the levels are plain data. It plays with the arrow keys or A / D and Space, and with an on-screen ◀ ▶ D-pad and JUMP button on a phone.

**Levels as data, tiles as a grid**

Each level is an object listing ground stretches, one-way planks, brick blocks, spike runs, coins, walkers, bats, springs, checkpoints and the goal flag, all in tile coordinates. \`buildLevel()\` turns that into a two-dimensional grid of tile types, and everything else (collision, drawing, enemy edge detection) asks the grid with one function, \`tileAt(column, row)\`. Adding a fourth level means adding one more object to the \`LEVELS\` array. The three included levels (Green Hills, Sunset Ridge and Midnight Run) change the colour theme, the sky, the parallax mountains and the difficulty, and the third adds a moon and stars.

**Collision that resolves one axis at a time**

The player moves horizontally first and is pushed out of any solid tile it overlaps, then moves vertically and is resolved the same way. Resolving one axis at a time is what stops a character from snagging on the seams between tiles. Planks are one-way: they only catch the player when falling and when the bottom edge was above the plank on the previous step, so you can jump up through a plank and land on it from above. Spikes use a hitbox smaller than their tile so near misses feel fair.

**Game feel: coyote time, jump buffering and variable jump height**

Three small rules separate a platformer that feels fair from one that feels stiff. *Coyote time* lets you still jump for a few frames after running off a ledge. *Jump buffering* remembers a jump press made a few frames before landing, so you never lose a jump by pressing slightly early. *Variable jump height* cuts the upward speed when you release the button, so a tap is a hop and holding the button is a full jump. Landing and jumping also squash and stretch the sprite, and dust, coin sparkles and a short screen shake give each action weight.

**Enemies you can stomp**

Mushroom walkers patrol the ground and turn around at walls and at the edge of a platform by checking the tile ahead and below them. Bats fly a sine-wave path. Both are defeated by landing on them from above, which bounces you up, and both cost a life if you touch them from the side, followed by a short blinking invulnerability so one mistake is not a chain of deaths. Springs launch you high, and checkpoint flags set where you restart after a fall or a spike.

**A fixed timestep, a smooth camera and a synthesised soundtrack**

The simulation advances in fixed 1/60-second steps drained from an accumulator, so jump height and run speed are identical on a 60Hz or a 144Hz display and fast falls cannot tunnel through thin planks. The camera eases toward the player with a little look-ahead and is clamped to the level. Sound effects (jump, coin, stomp, hurt, spring, checkpoint and a short win jingle) are generated with oscillators, with a mute button, and your best score is kept in \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the game', text: 'Press Start (or Enter). You begin level 1 with 3 lives, and a banner shows the level name.' },
        { title: 'Run and jump', text: 'Use the arrow keys or A / D to run, and Space, the up arrow or W to jump; on a phone use the ◀ ▶ buttons and JUMP. Hold jump for a full jump and tap it for a hop.' },
        { title: 'Stomp enemies', text: 'Land on a mushroom or a bat to defeat it and bounce. Touching one from the side costs a life, followed by a short moment of invulnerability.' },
        { title: 'Collect coins and use checkpoints', text: 'Each coin is worth 10 points and stomps are worth 50. Passing a checkpoint flag turns it green and sets where you restart after a fall or a spike.' },
        { title: 'Reach the flag', text: 'The goal flag ends the level. You get a bonus for finishing quickly and for every coin collected, then move on to the next of the three levels.' },
        { title: 'Edit the levels', text: 'The LEVELS array near the top of the JS holds every level as data in tile coordinates. Move planks, add spikes or enemies, or add a new level object, and tune GRAV, RUN and JUMP_V to change how the game feels.' },
      ],
    },
    features: [
      'Three complete levels with different themes (day, sunset, night), parallax mountains, clouds, a sun or a moon with stars',
      'Tile-grid collision resolved one axis at a time, with one-way planks, solid bricks and spikes',
      'Coyote time, jump buffering and variable jump height for a platformer that feels fair',
      'Stompable mushroom walkers that turn at walls and edges, plus sine-wave bats',
      'Springs, checkpoints, 3 lives, score, level bonus and a best score saved in localStorage',
      'Pixel sprites drawn from character strings: no images to load, with animated running, jumping and squash and stretch',
      'Particles, floating score text, screen shake and a level-intro banner',
      'Synthesised sound effects with the Web Audio API and a mute button, no audio files',
      'Fixed 1/60 s timestep, an eased follow-camera with look-ahead, and Pointer Events touch controls plus keyboard',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Learning platformer game feel', desc: 'Coyote time, jump buffering and variable jump height are each a few lines here and easy to switch off one by one, so you can feel exactly what they change.' },
      { icon: 'CODE', title: 'A tile-based level format to build on', desc: 'Levels are plain data turned into a grid, so adding moving platforms, new enemy types, doors or a level editor builds on the same structure.' },
      { icon: 'APP', title: 'Mobile platformer control template', desc: 'The held run buttons and the discrete, buffered JUMP button, all wired with Pointer Events, are a reusable control scheme for any touch action game.' },
      { icon: 'FORM', title: 'An instantly playable browser-game demo', desc: 'With no assets to load the game starts immediately, which makes it a strong embeddable demo for a games site, a portfolio or a landing page.' },
      { icon: 'FLOW', title: 'An interactive 404 page or loading screen', desc: 'The game has no network dependency, so it works as a distraction on an error page, like the [Maze Runner Arrow-Key Game](/ui-snippets/maze-runner-game).' },
      { icon: 'DESIGN', title: 'Pixel art without image files', desc: 'Sprites stored as arrays of strings and drawn with fillRect are a tiny, editable way to do pixel art in a canvas game, and the palette can be swapped in one object.' },
      { icon: 'CODE', title: 'Related: Rock Paper Scissors vs Computer', desc: 'See the [Rock Paper Scissors vs Computer](/ui-snippets/rock-paper-scissors-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What are coyote time and jump buffering?', a: 'Coyote time gives you a few frames after you walk off a ledge during which a jump still works, and jump buffering remembers a jump pressed a few frames before you land and fires it on touchdown. Both are set by two constants, COYOTE and BUFFER, near the top of the JS. They make the game forgive timing the player could not reasonably see, and setting either to 0 shows how stiff the game feels without it.' },
      { q: 'How does variable jump height work?', a: 'Jumping sets a strong upward speed, and while the jump button is held the character rises fully. If the button is released while still moving up faster than JUMP_CUT, the upward speed is clamped to that value, so a quick tap gives a small hop and holding gives a full jump. Bounces from springs and stomps set a flag that skips the clamp.' },
      { q: 'Why is the physics run in fixed steps?', a: 'A variable step lets a fast-falling character move past a thin plank between two frames, and it makes jump height depend on the frame rate. The loop adds the elapsed time to an accumulator and runs update() once for every 1/60 of a second in it, so the game behaves the same on a 60Hz and a 144Hz display, while drawing still happens once per frame.' },
      { q: 'How do I design my own level?', a: 'Each level in the LEVELS array lists ground stretches as [from, to] columns, planks as [column, row, length], bricks as [column, row, width, height], spikes, coins, walkers (column), bats ([column, row]), springs, checkpoints and the flag column. Row 13 is the ground surface. Keep gaps under about 5 tiles or add a plank over them, because a jump covers about 6 tiles.' },
      { q: 'How are the sprites and the sound made without files?', a: 'The sprites are arrays of strings where each character is a colour from the PAL object, drawn as 2x2 squares with fillRect, and flipped by mirroring the column. The sounds are short oscillator tones with a falling or rising frequency, made with the Web Audio API the first time one plays, so there are no image or audio files, and the mute button simply skips them.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to walk through the tile-grid collision, the coyote time and jump buffering, and the fixed-timestep loop. It is a strong base to extend: ask for moving platforms, a boss at the end of level 3, power-ups such as a double jump or a shield, a wall jump, more enemy types that shoot or chase, a level editor, or a sprite sheet in place of the character-string sprites. You could also ask it to add gamepad support, a pause screen, or to port the game into a React component with useRef and useEffect for the animation-frame lifecycle. Treat it as a working prototype to question and rebuild rather than a finished engine.`,
      prompt: `Build a complete, mobile-friendly pixel platformer on an HTML5 canvas in plain HTML, CSS and JavaScript, with no frameworks and no image or audio files.

Requirements:
- Three levels defined as plain data (ground stretches, one-way planks, bricks, spike runs, coins, enemies, springs, checkpoints, a goal flag) in tile coordinates, turned into a tile grid. Give each level its own colour theme, parallax mountains, clouds and a sun or a moon with stars.
- Controls: arrow keys or A / D to run and Space / Up / W to jump, plus an on-screen left, right and JUMP button using Pointer Events. Left and right are held states; jump is a buffered action.
- Physics on a FIXED timestep (1/60 s steps drained from an accumulator). Move on the X axis then the Y axis, resolving each against solid tiles. Planks are one-way (land from above only). Acceleration and friction on the run.
- Game feel: coyote time, jump buffering and variable jump height (releasing jump early cuts the jump), squash and stretch on jump and landing, dust and coin particles, floating score text and a small screen shake.
- Enemies: walkers that patrol and turn at walls and platform edges, and bats that fly a sine path. Stomping from above defeats them and bounces the player; touching from the side costs a life and gives a short blinking invulnerability. Spikes and pits cost a life and respawn at the last checkpoint. Springs launch the player high.
- 3 lives, a score (coins, stomps and a time and coin bonus for each level), a level-intro banner, level-clear, game-over and win overlays, and the best score in localStorage (with try/catch).
- Pixel sprites drawn from arrays of strings with fillRect (no images). Sound effects synthesised with the Web Audio API and a mute button.
- Smooth follow-camera with look-ahead, clamped to the level bounds.`,
    },
  },
};

export default pixelPlatformerGame;
