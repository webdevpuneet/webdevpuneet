const tankArenaGame = {
  id: 'tank-arena-game',
  title: 'Tank Arena Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🎮</span>
      <h2>Tank Arena</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Wave <b id="wave">1</b></span>
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="360"></canvas>
    <div class="hud">
      <span id="hud-score">0</span>
      <span class="lives" id="hud-lives">❤️❤️❤️</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Tank Arena</p>
        <p class="overlay-sub">Drive with the D-pad, tap FIRE to shoot. Blast enemy tanks, use walls for cover.</p>
        <button class="btn btn-primary" id="btn-start">Deploy</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Destroyed</p>
        <p class="overlay-sub" id="final-score">Score 0</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Redeploy</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="dpad-cross">
      <button class="ctrl-btn up" id="btn-up" aria-label="Up">▲</button>
      <button class="ctrl-btn left" id="btn-left" aria-label="Left">◀</button>
      <button class="ctrl-btn right" id="btn-right" aria-label="Right">▶</button>
      <button class="ctrl-btn down" id="btn-down" aria-label="Down">▼</button>
    </div>
    <button class="fire-btn" id="btn-fire" aria-label="Fire">FIRE</button>
  </div>

  <p class="hint-text">Keyboard: arrows / WASD to drive, Space to fire</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.stat-badges { display: flex; gap: 6px; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #ea580c; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #1c1917; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 8px 12px auto 12px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; }
.lives { font-size: 12px; letter-spacing: 1px; }

.overlay { position: absolute; inset: 0; background: rgba(12,10,9,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #d6d3d1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #ea580c; color: #fff; }
.btn-primary:hover { background: #c2410c; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
.dpad-cross { display: grid; grid-template-columns: repeat(3, 44px); grid-template-rows: repeat(3, 44px); gap: 4px; }
.ctrl-btn, .fire-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn { border-radius: 10px; background: #f8fafc; color: #334155; font-size: 17px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #ffedd5; }
.ctrl-btn.up { grid-column: 2; grid-row: 1; }
.ctrl-btn.left { grid-column: 1; grid-row: 2; }
.ctrl-btn.right { grid-column: 3; grid-row: 2; }
.ctrl-btn.down { grid-column: 2; grid-row: 3; }
.fire-btn { width: 84px; height: 84px; border-radius: 50%; background: #ea580c; color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 1px; box-shadow: 0 4px 0 #9a3412; border-color: #c2410c; }
.fire-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #9a3412; background: #c2410c; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'tank-arena-best';

const TS = 24;                 // tile size
const COLS = W / TS, ROWS = H / TS;
const TANK = 18, SPEED = 1.7, BULLET_SPEED = 4.2, ENEMY_SPEED = 0.9;
const FIRE_CD = 380, ENEMY_FIRE_CD = 1400;
const DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };

let walls, player, enemies, bullets, particles;
let score, lives, wave, running, rafId, lastFrame;
let keys = { up: false, down: false, left: false, right: false, fire: false };
let lastShot = 0;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const hudLives = document.getElementById('hud-lives');
const waveEl = document.getElementById('wave');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

// Build a border wall plus a scattered set of destructible blocks (hp 2).
function buildWalls() {
  walls = [];
  const grid = [];
  for (let r = 0; r < ROWS; r++) { grid[r] = []; for (let c = 0; c < COLS; c++) grid[r][c] = 0; }
  for (let c = 0; c < COLS; c++) { grid[0][c] = 1; grid[ROWS - 1][c] = 1; }
  for (let r = 0; r < ROWS; r++) { grid[r][0] = 1; grid[r][COLS - 1] = 1; }
  // Interior cover blocks (destructible), avoiding spawn corners
  const spots = [[3,3],[3,4],[3,10],[3,11],[7,6],[7,7],[7,8],[11,3],[11,11],[5,13],[9,2],[4,7]];
  spots.forEach(([r, c]) => { if (grid[r] && grid[r][c] !== undefined) grid[r][c] = 2; });
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c]) walls.push({ x: c * TS, y: r * TS, w: TS, h: TS, solid: grid[r][c] === 1, hp: grid[r][c] === 1 ? Infinity : 2 });
}

function resetState() {
  buildWalls();
  player = { x: TS + 3, y: TS + 3, dir: 'up', color: '#f97316' };
  bullets = []; particles = [];
  score = 0; lives = 3; wave = 1;
  lastShot = 0;
  spawnWave();
  syncHud();
}

function spawnWave() {
  enemies = [];
  const count = Math.min(2 + wave, 6);
  const corners = [[W - TS * 2, TS + 3], [W - TS * 2, H - TS * 2], [TS + 3, H - TS * 2], [W / 2, TS + 3]];
  for (let i = 0; i < count; i++) {
    let [cx, cy] = corners[i % corners.length];
    // Find a nearby free tile so two enemies never spawn stacked and mutually block
    let tries = 0;
    while (!canMove(cx, cy) && tries < 16) { cx = TS + ((Math.random() * (COLS - 2)) | 0) * TS + 3; cy = TS + ((Math.random() * (ROWS - 2)) | 0) * TS + 3; tries++; }
    enemies.push({ x: cx, y: cy, dir: 'down', color: '#94a3b8', nextFire: performance.now() + 600 + Math.random() * ENEMY_FIRE_CD, nextTurn: 0 });
  }
}

function syncHud() { hudScore.textContent = score; hudLives.textContent = '❤️'.repeat(Math.max(0, lives)); waveEl.textContent = wave; }

function hit(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

function canMove(x, y, ignore) {
  const r = { x, y, w: TANK, h: TANK };
  if (x < 0 || y < 0 || x + TANK > W || y + TANK > H) return false;
  if (walls.some(wl => hit(r, wl))) return false;
  const others = [player, ...enemies].filter(t => t && t !== ignore);
  if (others.some(t => hit(r, { x: t.x, y: t.y, w: TANK, h: TANK }))) return false;
  return true;
}

function moveTank(t, dir, speed) {
  const [dx, dy] = DIRS[dir];
  t.dir = dir;
  const nx = t.x + dx * speed, ny = t.y + dy * speed;
  if (canMove(nx, t.y, t)) t.x = nx;
  if (canMove(t.x, ny, t)) t.y = ny;
}

function shoot(t, owner) {
  const [dx, dy] = DIRS[t.dir];
  bullets.push({ x: t.x + TANK / 2 - 2 + dx * TANK / 2, y: t.y + TANK / 2 - 2 + dy * TANK / 2, dx, dy, owner });
}

function playerShoot() {
  const now = performance.now();
  if (now - lastShot < FIRE_CD) return;
  lastShot = now; shoot(player, 'player');
}

function burst(x, y, color, n) {
  for (let i = 0; i < (n || 10); i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 5, vy: (Math.random() - 0.5) * 5, life: 1, color });
}

function update() {
  // Player movement (last pressed direction wins)
  let pd = null;
  if (keys.up) pd = 'up'; if (keys.down) pd = 'down'; if (keys.left) pd = 'left'; if (keys.right) pd = 'right';
  if (pd) moveTank(player, pd, SPEED);
  if (keys.fire) playerShoot();

  // Enemy AI: drift toward player, occasionally change axis, fire on cooldown
  const now = performance.now();
  enemies.forEach(e => {
    if (now > e.nextTurn) {
      const dxp = player.x - e.x, dyp = player.y - e.y;
      if (Math.random() < 0.5) e.aiDir = Math.abs(dxp) > Math.abs(dyp) ? (dxp > 0 ? 'right' : 'left') : (dyp > 0 ? 'down' : 'up');
      else e.aiDir = ['up', 'down', 'left', 'right'][(Math.random() * 4) | 0];
      e.nextTurn = now + 500 + Math.random() * 900;
    }
    moveTank(e, e.aiDir || 'down', ENEMY_SPEED);
    if (now > e.nextFire) { shoot(e, 'enemy'); e.nextFire = now + ENEMY_FIRE_CD + Math.random() * 800; }
  });

  // Bullets
  bullets.forEach(b => { b.x += b.dx * BULLET_SPEED; b.y += b.dy * BULLET_SPEED; });
  bullets = bullets.filter(b => {
    const br = { x: b.x, y: b.y, w: 4, h: 4 };
    // Walls
    for (const wl of walls) {
      if (hit(br, wl)) {
        if (!wl.solid) { wl.hp--; if (wl.hp <= 0) { wl.dead = true; burst(wl.x + TS / 2, wl.y + TS / 2, '#a16207', 8); } }
        burst(b.x, b.y, '#fbbf24', 5);
        return false;
      }
    }
    // Enemy bullet hits player
    if (b.owner === 'enemy' && hit(br, { x: player.x, y: player.y, w: TANK, h: TANK })) { loseLife(); return false; }
    // Player bullet hits an enemy
    if (b.owner === 'player') {
      for (let i = 0; i < enemies.length; i++) {
        if (hit(br, { x: enemies[i].x, y: enemies[i].y, w: TANK, h: TANK })) {
          burst(enemies[i].x + TANK / 2, enemies[i].y + TANK / 2, '#f87171', 14);
          enemies.splice(i, 1); score += 100; syncHud(); return false;
        }
      }
    }
    return b.x > -8 && b.x < W + 8 && b.y > -8 && b.y < H + 8;
  });
  walls = walls.filter(wl => !wl.dead);

  particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.05; });
  particles = particles.filter(p => p.life > 0);

  if (!enemies.length) { wave++; score += 50; spawnWave(); syncHud(); }
}

function loseLife() {
  lives--; burst(player.x + TANK / 2, player.y + TANK / 2, '#fb923c', 16); syncHud();
  if (lives <= 0) { endGame(); return; }
  player.x = TS + 3; player.y = TS + 3; player.dir = 'up';
}

function drawTank(t) {
  const [dx, dy] = DIRS[t.dir];
  ctx.fillStyle = t.color;
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(t.x, t.y, TANK, TANK, 4); ctx.fill(); }
  else ctx.fillRect(t.x, t.y, TANK, TANK);
  // Treads
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  if (dx === 0) { ctx.fillRect(t.x, t.y, 3, TANK); ctx.fillRect(t.x + TANK - 3, t.y, 3, TANK); }
  else { ctx.fillRect(t.x, t.y, TANK, 3); ctx.fillRect(t.x, t.y + TANK - 3, TANK, 3); }
  // Barrel
  ctx.strokeStyle = '#0f172a'; ctx.lineWidth = 4; ctx.beginPath();
  ctx.moveTo(t.x + TANK / 2, t.y + TANK / 2);
  ctx.lineTo(t.x + TANK / 2 + dx * TANK * 0.7, t.y + TANK / 2 + dy * TANK * 0.7);
  ctx.stroke();
}

function draw() {
  ctx.fillStyle = '#292524'; ctx.fillRect(0, 0, W, H);
  // subtle grid
  ctx.strokeStyle = 'rgba(255,255,255,0.03)'; ctx.lineWidth = 1;
  for (let c = 0; c <= COLS; c++) { ctx.beginPath(); ctx.moveTo(c * TS, 0); ctx.lineTo(c * TS, H); ctx.stroke(); }
  for (let r = 0; r <= ROWS; r++) { ctx.beginPath(); ctx.moveTo(0, r * TS); ctx.lineTo(W, r * TS); ctx.stroke(); }

  walls.forEach(wl => {
    if (wl.solid) { ctx.fillStyle = '#57534e'; ctx.fillRect(wl.x, wl.y, wl.w, wl.h); }
    else {
      ctx.fillStyle = wl.hp > 1 ? '#b45309' : '#92400e';
      ctx.fillRect(wl.x + 1, wl.y + 1, wl.w - 2, wl.h - 2);
      ctx.strokeStyle = 'rgba(0,0,0,0.3)'; ctx.strokeRect(wl.x + 4, wl.y + 4, wl.w - 8, wl.h - 8);
    }
  });

  enemies.forEach(drawTank);
  drawTank(player);

  bullets.forEach(b => { ctx.fillStyle = b.owner === 'player' ? '#fde047' : '#f87171'; ctx.fillRect(b.x, b.y, 4, 4); });
  particles.forEach(p => { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3); });
  ctx.globalAlpha = 1;
}

function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  let acc = Math.min((ts - lastFrame) / 1000, 0.05);
  lastFrame = ts;
  while (acc > 0 && running) { update(); acc -= 1 / 60; }
  if (running) { draw(); rafId = requestAnimationFrame(loop); }
}

function startGame() {
  resetState(); running = true; lastFrame = 0;
  startOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = getBest();
  finalEl.textContent = 'Score ' + score + ' · Wave ' + wave;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New high score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard ──
const KEYMAP = { ArrowUp: 'up', ArrowDown: 'down', ArrowLeft: 'left', ArrowRight: 'right', w: 'up', s: 'down', a: 'left', d: 'right' };
document.addEventListener('keydown', e => {
  if (KEYMAP[e.key]) { keys[KEYMAP[e.key]] = true; e.preventDefault(); }
  if (e.key === ' ') { keys.fire = true; e.preventDefault(); }
});
document.addEventListener('keyup', e => {
  if (KEYMAP[e.key]) keys[KEYMAP[e.key]] = false;
  if (e.key === ' ') keys.fire = false;
});

// ── Input: on-screen buttons ──
function hold(id, on, off) {
  const el = document.getElementById(id);
  const down = e => { e.preventDefault(); on(); };
  const up = e => { e.preventDefault(); off && off(); };
  el.addEventListener('pointerdown', down);
  el.addEventListener('pointerup', up);
  el.addEventListener('pointercancel', up);
  el.addEventListener('pointerleave', up);
  el.addEventListener('contextmenu', e => e.preventDefault());
}
hold('btn-up', () => keys.up = true, () => keys.up = false);
hold('btn-down', () => keys.down = true, () => keys.down = false);
hold('btn-left', () => keys.left = true, () => keys.left = false);
hold('btn-right', () => keys.right = true, () => keys.right = false);
hold('btn-fire', () => keys.fire = true, () => keys.fire = false);

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Tank Arena Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly top-down canvas tank battle with a 4-way on-screen D-pad and fire button, AI enemy tanks, destructible cover, waves and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Tank Arena — Top-Down Combat with a 4-Way D-Pad, Enemy AI and Destructible Cover',
      description: `A top-down tank game is a compact showcase of grid-based movement, tile collision, simple enemy AI, and a directional shooting system — and it maps perfectly onto touch, because a four-way D-pad plus a fire button is exactly the control set an arcade tank game needs. This snippet builds the whole thing on a single HTML5 \`<canvas>\`: you drive with an on-screen cross D-pad, tap FIRE to shoot in the direction you are facing, and battle waves of AI tanks across an arena of solid and destructible walls.

**Tile arena with two kinds of wall**

The arena is generated on a tile grid in \`buildWalls()\`. The border is *solid* (indestructible), while a scattered set of interior blocks is *destructible* with two hit points. Every wall is stored as a rectangle, and both movement and bullets test against that same wall list. Because destructible blocks are removed from the list once their hit points reach zero, cover genuinely erodes over a match — you can shoot your way through a wall to reach an enemy, and so can they.

**Axis-separated movement so tanks slide along walls**

Movement is resolved one axis at a time in \`moveTank()\`: the horizontal move is applied only if the destination doesn't collide, then the vertical move is checked independently. This axis-separation is what lets a tank slide along a wall it's pressed against instead of sticking — a small but important detail for a game where you're constantly threading between blocks. The same \`canMove()\` test also blocks tanks from driving through each other, so the arena stays physically consistent for both the player and the AI.

**Directional firing on a cooldown**

A tank always faces its last movement direction, stored as one of four unit vectors. \`shoot()\` spawns a bullet travelling along that vector from the barrel tip, so what you see (the barrel) is exactly where the shot goes. The player's fire is gated by a \`FIRE_CD\` timestamp cooldown so holding the FIRE button produces a controlled rate of fire rather than a stream, and each enemy carries its own independent fire timer.

**Enemy AI and wave progression**

Each enemy periodically re-picks a direction in \`update()\` — biased toward the player's current position but with a random component so they don't move in lockstep — and fires on its own cooldown. Player bullets destroy enemies for points; enemy bullets cost the player a life and respawn them at the start corner. Clearing every enemy advances the wave, which spawns more tanks, and the whole simulation runs on a fixed 1/60-second timestep so behaviour is identical across refresh rates. The best score persists to \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Deploy', text: 'Tap "Deploy" to call startGame(), which builds the walled arena via buildWalls(), spawns the first wave of enemy tanks, and starts the fixed-timestep loop.' },
        { title: 'Drive with the D-pad', text: 'Hold the ▲ ◀ ▶ ▼ buttons (or arrow keys / WASD) to move. Your tank turns to face the direction it drives; movement is resolved per-axis so you slide along walls instead of sticking to them.' },
        { title: 'Fire in your facing direction', text: 'Tap or hold FIRE (or Space) to shoot. The shell travels straight out of the barrel in the direction your tank is facing, rate-limited by a cooldown so holding gives controlled fire, not a stream.' },
        { title: 'Use — and destroy — cover', text: 'Grey border walls are indestructible; brown interior blocks take two hits and then break apart. Use them to block incoming fire, or blast through them to open a firing lane on an enemy.' },
        { title: 'Survive the AI', text: 'Enemy tanks hunt toward your position and fire on their own timers. An enemy shell costs one of your three lives and respawns you at the corner; losing all three ends the run.' },
        { title: 'Clear waves and beat your best', text: 'Destroying every enemy advances the wave and spawns more tanks. Your high score persists in localStorage under tank-arena-best. Tune TANK/SPEED, fire cooldowns, and the wall layout in the JS.' },
      ],
    },
    features: [
      'Four-way on-screen cross D-pad plus a fire button (Pointer Events), with keyboard/WASD fallback driving the same input state',
      'Tile-based arena with indestructible border walls and destructible cover blocks that break after two hits',
      'Axis-separated movement collision so tanks slide along walls instead of catching on corners',
      'Directional firing: shells launch from the barrel along the tank facing vector, gated by a fire cooldown',
      'Enemy tank AI that biases movement toward the player with randomness, each with an independent fire timer',
      'Wave progression that scales enemy count, plus score, three lives and respawn-at-corner',
      'Particle bursts on hits and wall destruction, and a fixed 1/60s timestep for frame-rate-independent play',
      'Persisted high score via localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Four-way touch control template', desc: 'The cross D-pad plus fire button wired through Pointer Events is a reusable control layout for any top-down touch game — shooters, roguelikes, or maze games.' },
      { icon: 'LEARN', title: 'Teaching tile collision and simple AI', desc: 'Axis-separated wall collision and a bias-plus-random enemy controller are compact, readable references for two core arcade-game techniques, with no engine involved.' },
      { icon: 'CODE', title: 'Starting point for a fuller tank game', desc: 'The tile arena, wall hit points and directional bullets generalise to power-ups, a base to defend, smarter pathfinding, or two-player local co-op on the same keyboard.' },
      { icon: 'FORM', title: 'Instantly playable arcade demo', desc: 'A self-contained battle with no assets to download starts immediately — a strong embeddable demo for a games portal, blog, or landing page.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it makes an interactive distraction on an error or loading screen, in the spirit of the [Snake Game](/ui-snippets/snake-game).' },
      { icon: 'DESIGN', title: 'Canvas grid + HUD + overlay reference', desc: 'The tile-grid rendering, corner HUD and start/game-over overlays are directly reusable patterns for any grid-based canvas experience.' },
      { icon: 'CODE', title: 'Related: Word Search Puzzle Grid', desc: 'See the [Word Search Puzzle Grid](/ui-snippets/word-search-puzzle/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the tank slide along a wall instead of getting stuck?', a: 'Movement is resolved one axis at a time in moveTank(): the horizontal step is applied only if the new x position is clear, then the vertical step is checked separately. When you drive diagonally into a wall, the blocked axis is simply skipped while the free axis still moves, so the tank slides along the surface rather than stopping dead at the corner.' },
      { q: 'How do destructible walls work?', a: 'Each wall stores hit points. Border walls are solid with infinite hit points; interior cover blocks start with two. When a bullet overlaps a destructible wall its hit points drop and a spark burst plays, and once they reach zero the wall is flagged dead and filtered out of the walls array — so it no longer blocks movement or shots. Both your bullets and enemy bullets erode cover the same way.' },
      { q: 'How does the enemy AI decide where to go?', a: 'On a timer, each enemy re-picks a direction inside update(). Half the time it chooses the axis that points most directly at the player (compare the horizontal and vertical distance and move toward the player on the larger one); the other half it picks a random direction. That mix makes enemies pursue you without all converging on the exact same path, and each fires on its own independent cooldown.' },
      { q: 'Why is firing rate-limited?', a: 'Holding FIRE sets keys.fire = true, which is read every simulation step. Without a limit that would emit a bullet every step. A FIRE_CD timestamp check only spawns a shell once enough real milliseconds have passed since the last one, giving a controlled, consistent rate of fire regardless of frame rate.' },
      { q: 'Does my high score persist?', a: 'Yes. The best score is stored in localStorage under tank-arena-best and read back on load, so it survives reloads and browser restarts on the same browser and origin. It resets only if site data is cleared, or if you play in a different browser, device, or a private window.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the axis-separated wall collision, the destructible-wall hit-point system, and the bias-plus-random enemy AI. It is a strong base to extend: ask for grid A* pathfinding so enemies route around walls, power-ups (rapid fire, shield, speed), a destructible home base you must protect, smarter aim that only fires when it has line of sight, or local two-player co-op on one keyboard. You could also ask it to add rotating turrets independent of the tank body, or to port the fixed-timestep loop into a React component with useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly top-down tank battle game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A player tank on a tile-based arena that drives in four directions and shoots in its facing direction. Provide an on-screen four-way cross D-pad plus a FIRE button for touch, AND keyboard controls (arrows/WASD + Space). Both drive the same shared input state read each simulation step.
- Use Pointer Events for the buttons with press-and-hold, releasing on pointerup/pointercancel/pointerleave. Run the simulation on a fixed 1/60-second timestep so behaviour is frame-rate-independent.
- Generate the arena with indestructible border walls and scattered destructible cover blocks that take two hits before breaking. Store walls as rectangles and test both movement and bullets against them; remove destroyed blocks from the world.
- Resolve tank movement one axis at a time so tanks slide along walls instead of sticking, and prevent tanks from driving through each other.
- Bullets launch from the barrel along the tank facing vector; rate-limit the player fire with a timestamp cooldown. Add enemy tanks with simple AI that biases movement toward the player with a random component and fires on independent cooldowns.
- Player bullets destroy enemies for points; enemy bullets cost the player one of three lives and respawn them at a corner. Clearing all enemies advances the wave and spawns more. Persist the high score in localStorage with defensive try/catch, and show start / game-over overlays with particle burst effects.`,
    },
  },
};

export default tankArenaGame;
