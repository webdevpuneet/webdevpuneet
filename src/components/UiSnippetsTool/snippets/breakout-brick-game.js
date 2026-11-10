const breakoutBrickGame = {
  id: 'breakout-brick-game',
  title: 'Breakout Brick Breaker',
  lastmod: '2026-11-10',
  category: 'games',
  html: `<div class="bo-wrap">
  <div class="bo-header">
    <h2>Breakout</h2>
    <div class="bo-stats">
      <span>Level <strong id="bo-level">1</strong></span>
      <span>Score <strong id="bo-score">0</strong></span>
      <span>Lives <strong id="bo-lives">3</strong></span>
    </div>
  </div>

  <div class="bo-canvas-wrap">
    <canvas id="bo-canvas" width="440" height="360"></canvas>
    <div class="bo-overlay" id="bo-overlay">
      <p class="bo-overlay-title" id="bo-overlay-title">Breakout</p>
      <p class="bo-overlay-sub" id="bo-overlay-sub">8 levels of bricks: steel, tough, explosive and power bricks. Catch the capsules for multi-ball, lasers, fireballs and more.</p>
      <div class="bo-btns">
        <button class="bo-new-btn" id="bo-new-btn">New Game</button>
        <button class="bo-cont-btn hidden" id="bo-cont-btn">Continue</button>
      </div>
      <p class="bo-best" id="bo-best"></p>
    </div>
  </div>

  <div class="bo-bar">
    <p class="bo-hint">Move the mouse, drag, or use ← → · click, tap or Space to launch · P to pause</p>
    <div class="bo-mini">
      <button class="bo-mini-btn" id="bo-pause" type="button" aria-label="Pause">⏸</button>
      <button class="bo-mini-btn" id="bo-mute" type="button" aria-label="Sound on" aria-pressed="false">🔊</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.bo-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; width: 100%; max-width: 460px; user-select: none; -webkit-user-select: none; }

.bo-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.bo-header h2 { color: #f1f5f9; font-size: 20px; font-weight: 800; letter-spacing: -0.02em; }
.bo-stats { display: flex; gap: 12px; font-size: 12px; color: #94a3b8; font-weight: 600; }
.bo-stats strong { color: #facc15; font-size: 14px; font-variant-numeric: tabular-nums; }
#bo-lives { color: #f87171; }
#bo-level { color: #67e8f9; }

.bo-canvas-wrap { position: relative; width: 100%; aspect-ratio: 11 / 9; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.4); touch-action: none; }
#bo-canvas { width: 100%; height: 100%; display: block; background: #0b1120; cursor: none; }

.bo-overlay { position: absolute; inset: 0; background: rgba(2, 6, 23, 0.88); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px; text-align: center; padding: 20px; }
.bo-overlay.hidden { display: none; }
.bo-overlay-title { color: #f8fafc; font-size: 24px; font-weight: 800; }
.bo-overlay-sub { color: #94a3b8; font-size: 13px; max-width: 320px; line-height: 1.5; }
.bo-btns { display: flex; gap: 8px; }
.bo-new-btn, .bo-cont-btn { border: none; padding: 10px 22px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; font-family: inherit; }
.bo-new-btn { background: #facc15; color: #0f172a; }
.bo-new-btn:hover { background: #fde047; }
.bo-cont-btn { background: transparent; color: #67e8f9; border: 1px solid #0e7490; }
.bo-cont-btn:hover { border-color: #67e8f9; }
.bo-cont-btn.hidden { display: none; }
.bo-best { color: #fbbf24; font-size: 12px; font-weight: 700; min-height: 16px; }

.bo-bar { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.bo-hint { color: #64748b; font-size: 11.5px; }
.bo-mini { display: flex; gap: 6px; }
.bo-mini-btn { width: 34px; height: 28px; border: 1px solid #334155; background: #1e293b; color: #e2e8f0; border-radius: 8px; font-size: 13px; cursor: pointer; }
.bo-mini-btn[aria-pressed="true"] { opacity: 0.55; }`,

  js: `const $ = id => document.getElementById(id);
const canvas = $('bo-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'breakout-best', LEVEL_KEY = 'breakout-level';

const PADDLE_Y = H - 26, PADDLE_H = 12, BASE_PW = 80, BALL_R = 6;
const COLS = 10, PAD = 4, BRICK_TOP = 40, BRICK_H = 16, BRICK_W = (W - PAD * (COLS + 1)) / COLS;
const ROW_COLORS = ['#f87171', '#fb923c', '#facc15', '#4ade80', '#22d3ee', '#60a5fa', '#a78bfa', '#f472b6'];
// Levels: 1-3 = hits needed, S = steel (unbreakable), X = explosive, P = power brick, . = empty
const LEVELS = [
  { name: 'Warm-up', map: ['..........', '1111111111', '1111111111', '1111111111', '1111111111'] },
  { name: 'Pyramid', map: ['....22....', '...2112...', '..21PP12..', '.21111112.', '2111111112'] },
  { name: 'Fortress', map: ['S22222222S', 'S21111112S', 'S2.PXXP.2S', 'S21111112S', 'SSS1111SSS'] },
  { name: 'Checkers', map: ['3.3.3.3.3.', '.2.2.2.2.2', '1.1.P.1.1.', '.1.1.1.1.1', 'X.X.X.X.X.'] },
  { name: 'Invader', map: ['..1....1..', '...1..1...', '..222222..', '.22X22X22.', '2222222222', '2.2PPPP2.2', '2.2....2.2', '...22.22..'] },
  { name: 'Steel Maze', map: ['3333333333', 'S........S', 'S.222222.S', 'S.2XPPX2.S', 'S.222222.S', 'S........S', 'SSSS..SSSS'] },
  { name: 'Diamond', map: ['....33....', '...3223...', '..321123..', '.3211X123.', '..321P23..', '...3223...', '....33....'] },
  { name: 'Final Wall', map: ['3333333333', '3XS3XX3SX3', '2222222222', '2P2P22P2P2', '1111111111', 'S1S1S1S1S1'] },
];
const POWERS = [
  ['wide', 0.2, '#4ade80', 'W'], ['multi', 0.2, '#38bdf8', 'M'], ['laser', 0.14, '#f43f5e', 'L'], ['slow', 0.14, '#a78bfa', 'S'],
  ['fire', 0.1, '#fb923c', 'F'], ['life', 0.05, '#f472b6', '♥'], ['shrink', 0.17, '#64748b', '−'],
];

let paddle, balls, bricks, drops, lasers, parts, pops;
let score, lives, level, running = false, paused = false, rafId, lastFrame, phase = 'play', phaseT = 0, banner, combo = 0;
let wideT = 0, shrinkT = 0, laserT = 0, slowT = 0, fireT = 0, laserCd = 0, shake = 0, time = 0;
let keys = {}, targetX = null, muted = false, ac = null;

const scoreEl = $('bo-score'), livesEl = $('bo-lives'), levelEl = $('bo-level');
const overlayEl = $('bo-overlay'), overlayTitleEl = $('bo-overlay-title'), overlaySubEl = $('bo-overlay-sub');
const newBtn = $('bo-new-btn'), contBtn = $('bo-cont-btn'), bestEl = $('bo-best'), muteBtn = $('bo-mute');

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function load(k) { try { return parseInt(localStorage.getItem(k), 10) || 0; } catch (e) { return 0; } }
function save(k, v) { try { localStorage.setItem(k, String(v)); } catch (e) {} }

// ── Sound ──
function tone(f, dur, type, to, vol, delay) {
  if (muted) return;
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const t0 = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'square'; o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(vol || 0.04, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch (e) {}
}
const sfx = {
  paddle: () => tone(260, 0.06, 'square', 0, 0.04),
  brick: c => tone(440 + Math.min(c, 12) * 60, 0.06, 'square', 0, 0.035),
  steel: () => tone(1600, 0.05, 'triangle', 0, 0.03),
  boom: () => { tone(120, 0.4, 'sawtooth', 40, 0.08); tone(80, 0.3, 'square', 30, 0.05); },
  power: () => [523, 784, 1046].forEach((f, i) => tone(f, 0.09, 'triangle', 0, 0.05, i * 0.06)),
  bad: () => tone(400, 0.3, 'sawtooth', 120, 0.05),
  laser: () => tone(1400, 0.05, 'square', 600, 0.02),
  lose: () => tone(300, 0.6, 'triangle', 60, 0.07),
  clear: () => [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, 0.15, 'square', 0, 0.04, i * 0.09)),
};

// ── Levels ──
function buildLevel(n) {
  const L = LEVELS[(n - 1) % LEVELS.length];
  bricks = [];
  L.map.forEach((row, r) => {
    for (let c = 0; c < COLS; c++) {
      const ch = row[c];
      if (!ch || ch === '.') continue;
      const hp = ch === 'S' ? Infinity : '123'.indexOf(ch) >= 0 ? +ch : 1;
      bricks.push({ r, c, x: PAD + c * (BRICK_W + PAD), y: BRICK_TOP + r * (BRICK_H + PAD), w: BRICK_W, h: BRICK_H, hp, max: hp, kind: ch === 'S' ? 'steel' : ch === 'X' ? 'bomb' : ch === 'P' ? 'power' : 'normal', color: ROW_COLORS[r % ROW_COLORS.length], alive: true, flash: 0 });
    }
  });
  banner = { text: 'LEVEL ' + n, sub: L.name + (n > LEVELS.length ? ' · round ' + (1 + Math.floor((n - 1) / LEVELS.length)) : ''), t: 1.8 };
}
const baseSpeed = () => Math.min(7, 4.2 + (level - 1) * 0.25);
const paddleW = () => (wideT > 0 ? 120 : shrinkT > 0 ? 54 : BASE_PW);

function newBall(stuck) { return { x: paddle.x, y: PADDLE_Y - BALL_R - 1, vx: 0, vy: 0, stuck, offset: (Math.random() - 0.5) * 20, trail: [] }; }
function launch(b) {
  if (!b.stuck) return;
  b.stuck = false;
  const a = (b.offset / paddleW()) * 1.6 - 0.15 + (Math.random() - 0.5) * 0.3, sp = baseSpeed();
  b.vx = Math.sin(a) * sp; b.vy = -Math.cos(a) * sp;
}

function resetPowers() { wideT = 0; shrinkT = 0; laserT = 0; slowT = 0; fireT = 0; }
function startLevel(n, keepScore) {
  level = n; if (!keepScore) { score = 0; lives = 3; }
  paddle = { x: W / 2, vx: 0 };
  balls = [newBall(true)]; drops = []; lasers = []; parts = parts || []; pops = []; combo = 0;
  resetPowers(); buildLevel(n); phase = 'play';
  if (n > load(LEVEL_KEY)) save(LEVEL_KEY, n);
  syncHud();
}

function syncHud() { scoreEl.textContent = score; livesEl.textContent = lives; levelEl.textContent = level; }

function burst(x, y, n, colors, spd) {
  for (let i = 0; i < n && parts.length < 500; i++) {
    const a = Math.random() * 6.283, v = (0.3 + Math.random()) * (spd || 3);
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, g: 0.12, life: 18 + Math.random() * 20, max: 38, c: colors[(Math.random() * colors.length) | 0], s: 1.5 + Math.random() * 2.5 });
  }
}
function popup(x, y, text, color) { pops.push({ x, y, text, color: color || '#fde68a', t: 0.9 }); }

function dropPower(x, y) {
  let r = Math.random(), p = POWERS[0];
  for (const q of POWERS) { if (r < q[1]) { p = q; break; } r -= q[1]; }
  drops.push({ x, y, type: p[0], color: p[2], label: p[3] });
}

// Damage a brick; explosive bricks take their neighbours with them
function hitBrick(b, fromBall) {
  if (!b.alive) return;
  if (b.kind === 'steel') { b.flash = 0.08; sfx.steel(); return; }
  b.hp--; b.flash = 0.08;
  if (fromBall) combo++;
  const mult = 1 + Math.min(3, Math.floor(combo / 4));
  if (b.hp > 0) { score += 10 * mult; sfx.brick(combo); burst(b.x + b.w / 2, b.y + b.h / 2, 4, [b.color, '#fff'], 1.5); syncHud(); return; }
  b.alive = false;
  const pts = 20 * b.max * mult;
  score += pts; sfx.brick(combo);
  burst(b.x + b.w / 2, b.y + b.h / 2, 12, [b.color, '#ffffff', '#fde68a'], 2.6);
  if (mult > 1) popup(b.x + b.w / 2, b.y, '+' + pts + ' x' + mult, '#fbbf24');
  if (b.kind === 'power' || Math.random() < 0.11) dropPower(b.x + b.w / 2, b.y + b.h / 2);
  if (b.kind === 'bomb') {
    sfx.boom(); shake = 9; burst(b.x + b.w / 2, b.y + b.h / 2, 40, ['#f97316', '#fde047', '#ef4444', '#fff'], 4.5);
    bricks.forEach(o => { if (o.alive && o !== b && Math.abs(o.r - b.r) <= 1 && Math.abs(o.c - b.c) <= 1 && o.kind !== 'steel') { o.hp = 1; hitBrick(o, false); } });
  }
  syncHud();
}

// Move a ball in small sub-steps so it can never skip through a brick
function moveBall(b, step) {
  const sp = Math.hypot(b.vx, b.vy) * step, n = Math.max(1, Math.ceil(sp / 3));
  const mul = (slowT > 0 ? 0.7 : 1) * step / n;
  for (let i = 0; i < n; i++) {
    b.x += b.vx * mul; b.y += b.vy * mul;
    if (b.x < BALL_R) { b.x = BALL_R; b.vx = Math.abs(b.vx); sfx.steel(); }
    if (b.x > W - BALL_R) { b.x = W - BALL_R; b.vx = -Math.abs(b.vx); sfx.steel(); }
    if (b.y < BALL_R) { b.y = BALL_R; b.vy = Math.abs(b.vy); sfx.steel(); }
    // Paddle: the hit position sets the angle, so you can aim
    const pw = paddleW();
    if (b.vy > 0 && b.y + BALL_R >= PADDLE_Y && b.y + BALL_R <= PADDLE_Y + PADDLE_H + 4 && b.x > paddle.x - pw / 2 - BALL_R && b.x < paddle.x + pw / 2 + BALL_R) {
      const rel = clamp((b.x - paddle.x) / (pw / 2), -1, 1), a = rel * 1.05 + paddle.vx * 0.02;
      const s = Math.min(baseSpeed() * 1.35, Math.hypot(b.vx, b.vy) * 1.012);
      b.vx = Math.sin(a) * s; b.vy = -Math.abs(Math.cos(a) * s); b.y = PADDLE_Y - BALL_R - 1;
      combo = 0; sfx.paddle();
      burst(b.x, PADDLE_Y, 5, ['#67e8f9', '#fff'], 1.5);
    }
    // Bricks: push out along the shallowest axis and bounce (a fireball keeps going through)
    for (const br of bricks) {
      if (!br.alive) continue;
      const nx = clamp(b.x, br.x, br.x + br.w), ny = clamp(b.y, br.y, br.y + br.h), dx = b.x - nx, dy = b.y - ny;
      if (dx * dx + dy * dy > BALL_R * BALL_R) continue;
      const fire = fireT > 0 && br.kind !== 'steel';
      if (!fire) {
        const ox = Math.min(b.x + BALL_R - br.x, br.x + br.w - (b.x - BALL_R)), oy = Math.min(b.y + BALL_R - br.y, br.y + br.h - (b.y - BALL_R));
        if (ox < oy) { b.vx = b.x < br.x + br.w / 2 ? -Math.abs(b.vx) : Math.abs(b.vx); b.x += b.vx > 0 ? ox : -ox; }
        else { b.vy = b.y < br.y + br.h / 2 ? -Math.abs(b.vy) : Math.abs(b.vy); b.y += b.vy > 0 ? oy : -oy; }
      }
      if (fire) { br.hp = 1; }
      hitBrick(br, true);
      if (!fire) break;
    }
  }
  // keep the ball from going nearly horizontal forever
  if (Math.abs(b.vy) < 1.2) b.vy = b.vy < 0 ? -1.2 : 1.2;
}

// ── Frame update ──
function update(dt) {
  time += dt;
  const step = dt * 60;
  parts.forEach(p => { p.x += p.vx * step; p.y += p.vy * step; p.vy += p.g * step; p.life -= step; });
  parts = parts.filter(p => p.life > 0);
  pops.forEach(p => { p.t -= dt; p.y -= 0.5 * step; }); pops = pops.filter(p => p.t > 0);
  if (banner) { banner.t -= dt; if (banner.t <= 0) banner = null; }
  if (shake > 0.3) shake *= Math.pow(0.85, step); else shake = 0;
  bricks.forEach(b => { if (b.flash > 0) b.flash -= dt; });

  if (phase === 'clear') { phaseT -= dt; if (phaseT <= 0) startLevel(level + 1, true); return; }
  if (phase === 'lost') { phaseT -= dt; if (phaseT <= 0) { if (lives <= 0) { gameOver(); return; } balls = [newBall(true)]; phase = 'play'; } return; }

  if (wideT > 0) wideT -= dt; if (shrinkT > 0) shrinkT -= dt; if (laserT > 0) laserT -= dt; if (slowT > 0) slowT -= dt; if (fireT > 0) fireT -= dt;

  // Paddle: keys accelerate it, the mouse / finger pulls it
  const pw = paddleW(), prev = paddle.x;
  const dir = (keys.ArrowRight || keys.d || keys.D ? 1 : 0) - (keys.ArrowLeft || keys.a || keys.A ? 1 : 0);
  if (dir) { paddle.x += dir * 7.5 * step; targetX = null; }
  else if (targetX !== null) paddle.x += (targetX - paddle.x) * Math.min(1, 0.45 * step);
  paddle.x = clamp(paddle.x, pw / 2, W - pw / 2);
  paddle.vx = (paddle.x - prev) / Math.max(step, 0.001);

  // Balls
  for (const b of balls) {
    if (b.stuck) { b.x = paddle.x + clamp(b.offset, -pw / 2 + 8, pw / 2 - 8); b.y = PADDLE_Y - BALL_R - 1; continue; }
    moveBall(b, step);
    b.trail.push({ x: b.x, y: b.y }); if (b.trail.length > 10) b.trail.shift();
  }
  balls = balls.filter(b => b.y < H + 20);
  if (!balls.length) {
    lives--; combo = 0; resetPowers(); drops = []; lasers = []; sfx.lose(); shake = 8; syncHud();
    phase = 'lost'; phaseT = 1.0; return;
  }

  // Lasers fire automatically while the power is on
  if (laserT > 0) {
    laserCd -= dt;
    if (laserCd <= 0) { laserCd = 0.28; lasers.push({ x: paddle.x - pw / 2 + 6, y: PADDLE_Y }, { x: paddle.x + pw / 2 - 6, y: PADDLE_Y }); sfx.laser(); }
  }
  lasers.forEach(l => {
    l.y -= 9 * step;
    for (const br of bricks) if (br.alive && l.x > br.x && l.x < br.x + br.w && l.y > br.y && l.y < br.y + br.h) { l.dead = true; hitBrick(br, false); break; }
  });
  lasers = lasers.filter(l => !l.dead && l.y > -10);

  // Power capsules
  for (const d of drops) {
    d.y += 2.1 * step;
    if (d.y + 7 > PADDLE_Y && d.y - 7 < PADDLE_Y + PADDLE_H && Math.abs(d.x - paddle.x) < pw / 2 + 10) {
      d.dead = true;
      const label = { wide: 'WIDE!', multi: 'MULTI-BALL!', laser: 'LASERS!', slow: 'SLOW!', fire: 'FIREBALL!', life: '+1 LIFE', shrink: 'SHRINK!' }[d.type];
      popup(d.x, PADDLE_Y - 18, label, d.color);
      if (d.type === 'shrink') { sfx.bad(); shrinkT = 8; wideT = 0; } else sfx.power();
      if (d.type === 'wide') { wideT = 12; shrinkT = 0; }
      else if (d.type === 'multi') { const src = balls.find(b => !b.stuck) || balls[0]; [-0.5, 0.5].forEach(a => { const s = baseSpeed(); balls.push({ x: src.x, y: src.y, vx: Math.sin(a) * s, vy: -Math.cos(a) * s, stuck: false, offset: 0, trail: [] }); }); }
      else if (d.type === 'laser') laserT = 9;
      else if (d.type === 'slow') slowT = 8;
      else if (d.type === 'fire') fireT = 6;
      else if (d.type === 'life') { lives++; syncHud(); }
    }
  }
  drops = drops.filter(d => !d.dead && d.y < H + 10);

  if (!bricks.some(b => b.alive && b.kind !== 'steel')) {
    const bonus = 500 * level; score += bonus; syncHud(); sfx.clear();
    banner = { text: 'LEVEL CLEAR!', sub: '+' + bonus, t: 1.8 }; phase = 'clear'; phaseT = 2.0;
    burst(W / 2, H / 2, 60, ROW_COLORS, 5);
  }
}

// ── Drawing ──
function rr(x, y, w, h, r) { ctx.beginPath(); if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h); }

function drawBrick(b) {
  const x = b.x, y = b.y, w = b.w, h = b.h;
  let top, bot;
  if (b.kind === 'steel') { top = '#cbd5e1'; bot = '#64748b'; }
  else if (b.kind === 'bomb') { const p = 0.5 + Math.sin(time * 6) * 0.5; top = p > 0.5 ? '#f87171' : '#ef4444'; bot = '#991b1b'; }
  else if (b.kind === 'power') { top = '#fde68a'; bot = '#ca8a04'; }
  else { top = b.color; bot = 'rgba(0,0,0,0.35)'; }
  const g = ctx.createLinearGradient(0, y, 0, y + h); g.addColorStop(0, top); g.addColorStop(1, bot);
  if (b.kind === 'normal') { ctx.fillStyle = b.color; rr(x, y, w, h, 4); ctx.fill(); }
  ctx.fillStyle = b.flash > 0 ? '#ffffff' : g; rr(x, y, w, h, 4); ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(x + 4, y + 2, w - 8, 2);
  if (b.kind === 'steel') { ctx.fillStyle = '#475569'; [[4, 4], [w - 6, 4], [4, h - 6], [w - 6, h - 6]].forEach(p => ctx.fillRect(x + p[0], y + p[1], 2, 2)); }
  ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  if (b.kind === 'bomb') { ctx.fillStyle = '#fff7ed'; ctx.fillText('✸', x + w / 2, y + h / 2 + 1); }
  if (b.kind === 'power') { ctx.fillStyle = '#713f12'; ctx.fillText('?', x + w / 2, y + h / 2 + 1); }
  if (b.kind === 'normal' && b.max > 1) {
    for (let i = 0; i < b.hp; i++) { ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.beginPath(); ctx.arc(x + w / 2 + (i - (b.hp - 1) / 2) * 7, y + h / 2 + 1, 2, 0, 6.3); ctx.fill(); }
    if (b.hp < b.max) { ctx.strokeStyle = 'rgba(0,0,0,0.45)'; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(x + 8, y + 3); ctx.lineTo(x + 14, y + 9); ctx.lineTo(x + 11, y + h - 2); ctx.moveTo(x + w - 9, y + 4); ctx.lineTo(x + w - 15, y + 11); ctx.stroke(); }
  }
}

function draw() {
  const bg = ctx.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, '#0b1120'); bg.addColorStop(1, '#111c3a');
  ctx.fillStyle = bg; ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = 'rgba(148,163,184,0.06)'; ctx.lineWidth = 1; ctx.beginPath();
  for (let x = 0; x <= W; x += 22) { ctx.moveTo(x, 0); ctx.lineTo(x, H); }
  for (let y = 0; y <= H; y += 22) { ctx.moveTo(0, y); ctx.lineTo(W, y); }
  ctx.stroke();
  ctx.save();
  if (shake) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  bricks.forEach(b => { if (b.alive) drawBrick(b); });
  // Capsules
  drops.forEach(d => {
    ctx.fillStyle = d.color; rr(d.x - 14, d.y - 7, 28, 14, 7); ctx.fill();
    ctx.fillStyle = 'rgba(255,255,255,0.35)'; ctx.fillRect(d.x - 10, d.y - 5, 20, 2);
    ctx.fillStyle = '#0f172a'; ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(d.label, d.x, d.y + 1);
  });
  // Lasers
  ctx.fillStyle = '#fb7185'; lasers.forEach(l => ctx.fillRect(l.x - 1.5, l.y - 8, 3, 10));
  // Paddle
  const pw = paddleW(), px = paddle.x - pw / 2, col = shrinkT > 0 ? '#94a3b8' : wideT > 0 ? '#4ade80' : '#22d3ee';
  const glow = ctx.createRadialGradient(paddle.x, PADDLE_Y + 6, 4, paddle.x, PADDLE_Y + 6, pw * 0.8); glow.addColorStop(0, col + '55'); glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow; ctx.fillRect(px - 30, PADDLE_Y - 20, pw + 60, 44);
  const pg = ctx.createLinearGradient(0, PADDLE_Y, 0, PADDLE_Y + PADDLE_H); pg.addColorStop(0, '#f8fafc'); pg.addColorStop(0.4, col); pg.addColorStop(1, '#0e7490');
  ctx.fillStyle = pg; rr(px, PADDLE_Y, pw, PADDLE_H, 6); ctx.fill();
  if (laserT > 0) { ctx.fillStyle = '#f43f5e'; ctx.fillRect(px + 3, PADDLE_Y - 5, 6, 6); ctx.fillRect(px + pw - 9, PADDLE_Y - 5, 6, 6); }
  // Balls with trails
  ctx.globalCompositeOperation = 'lighter';
  balls.forEach(b => {
    b.trail.forEach((t, i) => { ctx.globalAlpha = (i / b.trail.length) * 0.35; ctx.fillStyle = fireT > 0 ? '#fb923c' : '#67e8f9'; ctx.beginPath(); ctx.arc(t.x, t.y, BALL_R * (0.4 + i / b.trail.length * 0.6), 0, 6.3); ctx.fill(); });
    ctx.globalAlpha = 1;
    const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, BALL_R * 3); g.addColorStop(0, fireT > 0 ? 'rgba(251,146,60,0.6)' : 'rgba(103,232,249,0.5)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(b.x - BALL_R * 3, b.y - BALL_R * 3, BALL_R * 6, BALL_R * 6);
  });
  parts.forEach(p => { ctx.globalAlpha = clamp(p.life / p.max, 0, 1); ctx.fillStyle = p.c; ctx.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s); });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  balls.forEach(b => { ctx.fillStyle = fireT > 0 ? '#fed7aa' : '#ffffff'; ctx.beginPath(); ctx.arc(b.x, b.y, BALL_R, 0, 6.3); ctx.fill(); });
  ctx.font = 'bold 11px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  pops.forEach(p => { ctx.globalAlpha = clamp(p.t * 2, 0, 1); ctx.fillStyle = p.color; ctx.fillText(p.text, p.x, p.y); });
  ctx.globalAlpha = 1;
  ctx.restore();

  // Status: active power-ups, combo, launch hint, banners
  const tags = [];
  if (wideT > 0) tags.push('WIDE ' + Math.ceil(wideT)); if (shrinkT > 0) tags.push('SHRINK ' + Math.ceil(shrinkT)); if (laserT > 0) tags.push('LASER ' + Math.ceil(laserT));
  if (slowT > 0) tags.push('SLOW ' + Math.ceil(slowT)); if (fireT > 0) tags.push('FIRE ' + Math.ceil(fireT));
  ctx.font = 'bold 10px system-ui'; ctx.textAlign = 'left'; ctx.fillStyle = '#cbd5e1'; if (tags.length) ctx.fillText(tags.join('  '), 8, 14);
  const mult = 1 + Math.min(3, Math.floor(combo / 4));
  if (mult > 1) { ctx.textAlign = 'right'; ctx.font = '800 13px system-ui'; ctx.fillStyle = '#fbbf24'; ctx.fillText('COMBO x' + mult, W - 8, 14); }
  if (phase === 'play' && balls.some(b => b.stuck) && !banner) { ctx.textAlign = 'center'; ctx.font = '700 12px system-ui'; ctx.fillStyle = 'rgba(226,232,240,' + (0.55 + Math.sin(time * 4) * 0.3).toFixed(2) + ')'; ctx.fillText('Click, tap or press Space to launch', W / 2, PADDLE_Y - 40); }
  if (banner) {
    ctx.globalAlpha = clamp(banner.t * 2, 0, 1); ctx.textAlign = 'center';
    ctx.font = '900 28px system-ui'; ctx.fillStyle = '#f8fafc'; ctx.fillText(banner.text, W / 2, H * 0.62);
    ctx.font = '700 13px system-ui'; ctx.fillStyle = '#67e8f9'; ctx.fillText(banner.sub, W / 2, H * 0.62 + 24);
    ctx.globalAlpha = 1;
  }
}

// ── Game flow ──
function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 1 / 30);
  lastFrame = ts;
  update(dt);
  if (running) { draw(); rafId = requestAnimationFrame(loop); }
}

function showMenu() {
  const best = load(BEST_KEY), reached = load(LEVEL_KEY);
  bestEl.textContent = best ? 'Best score ' + best + (reached > 1 ? ' · reached level ' + reached : '') : '';
  contBtn.classList.toggle('hidden', reached < 2);
  contBtn.textContent = 'Continue level ' + reached;
  overlayEl.classList.remove('hidden');
}

function begin(n) {
  startLevel(n, false); running = true; paused = false; lastFrame = 0;
  overlayEl.classList.add('hidden');
  cancelAnimationFrame(rafId); rafId = requestAnimationFrame(loop);
}

function setPaused(p) {
  if (!running && !paused) return;
  if (p === paused) return;
  paused = p;
  if (p) { running = false; cancelAnimationFrame(rafId); keys = {}; draw(); overlayTitleEl.textContent = 'Paused'; overlaySubEl.textContent = 'Press P or Resume to continue.'; newBtn.textContent = 'Resume'; contBtn.classList.add('hidden'); bestEl.textContent = ''; overlayEl.classList.remove('hidden'); }
  else { overlayEl.classList.add('hidden'); newBtn.textContent = 'New Game'; running = true; lastFrame = 0; rafId = requestAnimationFrame(loop); }
}

function gameOver() {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = load(BEST_KEY), isBest = score > best;
  if (isBest) save(BEST_KEY, score);
  overlayTitleEl.textContent = 'Game Over';
  overlaySubEl.textContent = 'Score ' + score + ' · level ' + level + (isBest ? ' · 🏆 new best!' : '');
  newBtn.textContent = 'New Game';
  showMenu();
}

// ── Input ──
const toX = e => { const r = canvas.getBoundingClientRect(); return (e.clientX - r.left) * (W / r.width); };
canvas.addEventListener('pointermove', e => { targetX = toX(e); });
canvas.addEventListener('pointerdown', e => { e.preventDefault(); targetX = toX(e); if (running && phase === 'play') balls.forEach(launch); });
document.addEventListener('keydown', e => {
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if (running || paused) setPaused(!paused); return; }
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === ' ') e.preventDefault();
  if (e.key === ' ' && !e.repeat) {
    if (running && phase === 'play') balls.forEach(launch);
    else if (paused) setPaused(false);
    else if (!running) begin(1);
    return;
  }
  keys[e.key] = true;
});
document.addEventListener('keyup', e => { keys[e.key] = false; });
document.addEventListener('visibilitychange', () => { if (document.hidden && running) setPaused(true); });

newBtn.addEventListener('click', () => { if (paused) setPaused(false); else begin(1); });
contBtn.addEventListener('click', () => begin(Math.max(1, load(LEVEL_KEY))));
$('bo-pause').addEventListener('click', () => { if (running || paused) setPaused(!paused); });
muteBtn.addEventListener('click', () => {
  muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(muted)); muteBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
});

parts = [];
startLevel(1, false);
draw();
showMenu();`,

  seo: {
    title: 'Breakout Brick Breaker: 8 Levels, Power-Ups and Combos',
    description: 'A free Breakout game on canvas with 8 levels of steel, tough, explosive and power bricks, plus multi-ball, lasers, fireballs, combos and continue-from-level.',
    about: {
      title: 'Breakout: Designed Levels, Special Bricks, Seven Power-Ups and Tunnel-Free Ball Physics',
      description: `Breakout is the classic paddle-and-ball brick breaker: keep the ball in play with your paddle and knock out every brick to clear the level. This snippet builds a complete version on one HTML5 \`<canvas>\` with no libraries and no image files: eight hand-designed levels, four kinds of bricks, seven power-ups, combos, and a save that lets you continue from the furthest level you reached. It plays with the mouse, a finger dragged on the board, or the arrow keys or A and D, and you launch the ball with a click, a tap or Space.

**Levels drawn as text**

Each level is an array of strings in the \`LEVELS\` list, one character per brick: 1, 2 or 3 for how many hits a brick needs, S for unbreakable steel, X for an explosive brick, P for a power brick that always drops a capsule, and a dot for a gap. The eight levels (Warm-up, Pyramid, Fortress, Checkers, Invader, Steel Maze, Diamond and Final Wall) introduce the special bricks one at a time. A level is cleared when every breakable brick is gone, which pays 500 points times the level. After level 8 the layouts repeat as a new round with a faster ball, and the highest level you reached is saved so the menu can offer "Continue".

**Ball physics that never skip a brick**

The ball moves in small sub-steps of at most three pixels per frame, so even at top speed it cannot pass through a brick between frames. Each sub-step tests the ball as a circle against each brick's rectangle and, on contact, pushes it out along the axis with the smaller overlap and reverses that component of the velocity, which gives clean bounces off sides and corners. Where the ball meets the paddle decides the bounce angle (the edges send it out wide), the paddle's own movement adds a little spin, every paddle hit speeds the ball up slightly up to a cap, and a minimum vertical speed stops it from sliding sideways forever.

**Special bricks and power-ups**

Tough bricks show pips for their remaining hits and crack as they are damaged. Steel bricks ring when hit and only bounce the ball. An explosive brick destroys the eight bricks around it, so a well-placed hit can set off a chain reaction. Broken bricks drop a capsule 11% of the time (power bricks always do): W widens the paddle, M splits into three balls, L mounts auto-firing lasers, S slows the ball, F turns it into a fireball that smashes through bricks without bouncing, ♥ is an extra life, and the grey − capsule shrinks your paddle, so not every capsule is worth catching.

**Combos and juice**

Bricks broken without the ball touching the paddle build a combo, and every four raise the multiplier up to x4. Bricks burst into particles, explosions shake the screen, the ball leaves a glowing trail (orange as a fireball), and each level opens with a banner. Sounds rise in pitch with the combo and are made with the Web Audio API, with a mute button. The game pauses on P, the pause button or a tab switch, and the best score is kept in \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start', text: 'Press New Game, or Continue to resume from the furthest level you reached. Move the paddle with the mouse, by dragging on the board, or with the arrow keys or A and D.' },
        { title: 'Launch and aim', text: 'Click, tap or press Space to launch the ball. Where it hits the paddle sets the angle: the centre sends it straight up, the edges send it out wide.' },
        { title: 'Know your bricks', text: 'Dots on a brick show how many hits it still needs. Grey steel bricks cannot be broken. Red ✸ bricks explode and destroy their neighbours. Gold ? bricks always drop a power-up.' },
        { title: 'Catch the right capsules', text: 'W widens the paddle, M gives three balls, L adds lasers, S slows the ball, F makes a fireball and ♥ is an extra life. Avoid the grey − capsule, which shrinks your paddle.' },
        { title: 'Build combos', text: 'Break several bricks before the ball returns to the paddle. Every four bricks raise the multiplier, up to x4.' },
        { title: 'Clear all eight levels', text: 'Clear every breakable brick to finish a level and earn a bonus. After level 8 the levels repeat faster. Press P to pause.' },
      ],
    },
    features: [
      'Eight hand-designed levels defined as text maps, repeating as faster rounds after level 8',
      'Tough bricks with hit pips and cracks, unbreakable steel, explosive bricks that chain, and power bricks',
      'Seven capsules: wide paddle, multi-ball, lasers, slow ball, fireball, extra life, and a shrink trap',
      'Sub-stepped circle-versus-rectangle collision so the ball never tunnels through bricks',
      'Paddle-position aiming with a little spin from paddle movement, and a gradual speed-up',
      'Combo multiplier up to x4, level-clear bonuses, and continue from the furthest level reached',
      'Glossy gradient bricks, glowing ball trails, particles, screen shake and level banners',
      'Mouse, touch drag and keyboard controls; click, tap or Space to launch',
      'Web Audio sound with a mute button, pause on P, a button or tab switch, and best score in localStorage',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Learning collision without tunnelling', desc: 'Sub-stepping the ball and resolving circle-rectangle overlaps along the smaller axis is a robust pattern for any fast-moving object.' },
      { icon: 'CODE', title: 'Levels as data', desc: 'Each level is a few strings, so designing new layouts or loading them from a file needs no code changes.' },
      { icon: 'DESIGN', title: 'Polished canvas rendering', desc: 'Gradient bricks, glows, trails and particles show how to make a simple game look rich with no image assets.' },
      { icon: 'APP', title: 'A touch-friendly arcade game', desc: 'Dragging on the board and tapping to launch make it comfortable on a phone as well as with a mouse.' },
      { icon: 'FLOW', title: 'An interactive 404 page or loading screen', desc: 'A familiar, quick-to-learn game makes a friendly distraction, like the [Space Blaster Arcade Game](/ui-snippets/space-blaster-game/).' },
    ],
    faqs: [
      { q: 'How do I design my own level?', a: 'Add an object to the LEVELS array with a name and a map of strings, each up to 10 characters wide. Use 1, 2 or 3 for bricks that need that many hits, S for steel, X for an explosive brick, P for a power brick and a dot for an empty space. A level ends when no breakable bricks are left, so steel bricks never block completion.' },
      { q: 'Why does the ball never pass through a brick?', a: 'Each frame the ball\'s movement is split into sub-steps of at most three pixels, and collisions are checked after every sub-step. Because the ball radius is six pixels, it can never jump past a brick edge between checks, however fast it moves.' },
      { q: 'How does aiming work?', a: 'The bounce angle depends on where the ball hits the paddle, from straight up at the centre to about 60 degrees at the edges. Moving the paddle as the ball hits adds a little extra angle, and each paddle hit increases the ball speed by about one percent, up to 35% above the level\'s base speed.' },
      { q: 'What do the power-ups do?', a: 'W makes the paddle wider for 12 seconds, M adds two extra balls, L fires lasers from the paddle for 9 seconds, S slows the ball for 8 seconds, F makes the ball smash through bricks for 6 seconds, ♥ adds a life, and the grey − shrinks the paddle for 8 seconds. Losing your last ball clears all active power-ups.' },
      { q: 'How does the combo work?', a: 'Every brick hit by a ball before the ball touches the paddle again adds to the combo. The score multiplier is 1 plus one for every four bricks in the combo, up to x4, and it resets when the ball touches the paddle.' },
      { q: 'Is my progress saved?', a: 'Yes. The furthest level you reached and your best score are saved in localStorage, and the menu shows a Continue button that starts at that level with three lives.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the level text format, the sub-stepped circle-rectangle collision, the paddle aiming and the explosive chain reaction. It is a good base to extend: ask for a level editor, moving bricks, bosses, a sticky "catch" power-up, a two-player mode, or a port to a React component with the game state in a ref. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a complete Breakout brick-breaker game on an HTML5 canvas in plain HTML, CSS and JavaScript, with no libraries and no image files.

Requirements:
- Eight levels defined as arrays of strings (1-3 = hits needed, S = unbreakable steel, X = explosive brick that destroys its eight neighbours, P = brick that always drops a power-up, . = empty). A level is cleared when all breakable bricks are gone, with a bonus and a banner; after the last level, repeat the layouts faster. Save the furthest level and offer Continue.
- A paddle controlled by the mouse, touch drag and the arrow keys or A and D, and a ball that starts stuck to the paddle and launches on click, tap or Space. The hit position on the paddle sets the bounce angle, and the ball speeds up slightly with each paddle hit, up to a cap.
- Sub-stepped ball movement (at most 3 px per step) with circle-versus-rectangle collision that pushes out along the smaller overlap axis, so the ball never tunnels.
- Capsules dropped from broken bricks: wide paddle, multi-ball, lasers, slow ball, fireball (passes through bricks), extra life, and a shrink trap, with timers shown on screen.
- A combo multiplier for bricks broken without touching the paddle, up to x4. Tough bricks show remaining hits and cracks.
- Glossy gradient bricks, glowing ball trails, particles, screen shake on explosions, Web Audio sound with mute, pause on P, a button and tab switch, and the best score in localStorage (with try/catch).`,
    },
  },
};

export default breakoutBrickGame;
