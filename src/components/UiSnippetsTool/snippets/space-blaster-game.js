const spaceBlasterGame = {
  id: 'space-blaster-game',
  title: 'Space Blaster Arcade Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🚀</span>
      <h2>Space Blaster</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Wave <b id="wave">1</b></span>
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="440"></canvas>
    <div class="hud">
      <span id="hud-score">0</span>
      <span class="lives" id="hud-lives">❤️❤️❤️</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Space Blaster</p>
        <p class="overlay-sub">Move with the D-pad, hold FIRE to shoot. Clear each wave — they hit back.</p>
        <button class="btn btn-primary" id="btn-start">Launch</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title" id="over-title">Game Over</p>
        <p class="overlay-sub" id="final-score">Score 0</p>
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
    <button class="fire-btn" id="btn-fire" aria-label="Fire">FIRE</button>
  </div>

  <p class="hint-text">Keyboard: ← → to move, Space to fire</p>
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
.badge b { color: #7c3aed; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #0b1020; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 8px 12px auto 12px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.5); pointer-events: none; }
.lives { font-size: 12px; letter-spacing: 1px; }

.overlay { position: absolute; inset: 0; background: rgba(8,12,30,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 280px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #7c3aed; color: #fff; }
.btn-primary:hover { background: #6d28d9; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; }
.dpad { display: flex; gap: 10px; }
.ctrl-btn, .fire-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn { width: 60px; height: 60px; border-radius: 14px; background: #f8fafc; color: #334155; font-size: 22px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #eef2ff; }
.fire-btn { width: 96px; height: 60px; border-radius: 14px; background: #7c3aed; color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 1px; box-shadow: 0 3px 0 #5b21b6; border-color: #6d28d9; }
.fire-btn:active { transform: translateY(3px); box-shadow: none; background: #6d28d9; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'space-blaster-best';

const SHIP_W = 34, SHIP_H = 20, SHIP_Y = H - 34, SHIP_SPEED = 5;
const BULLET_SPEED = 7, ENEMY_BULLET_SPEED = 3.2, FIRE_COOLDOWN = 260;

let ship, bullets, enemyBullets, enemies, particles;
let score, lives, wave, running, rafId, lastFrame;
let keys = { left: false, right: false, fire: false };
let lastShot = 0, enemyDir = 1, enemyDrop = 0;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const hudLives = document.getElementById('hud-lives');
const waveEl = document.getElementById('wave');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');
const overTitle = document.getElementById('over-title');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function buildWave(n) {
  enemies = [];
  const cols = Math.min(4 + n, 7), rows = Math.min(2 + Math.floor(n / 2), 4);
  const gapX = W / (cols + 1), startY = 40, gapY = 34;
  for (let r = 0; r < rows; r++)
    for (let c = 0; c < cols; c++)
      enemies.push({ x: gapX * (c + 1) - 14, y: startY + r * gapY, w: 28, h: 20, alive: true, hp: 1 + Math.floor(n / 4) });
  enemyDir = 1; enemyDrop = 0;
}

function resetState() {
  ship = { x: W / 2 - SHIP_W / 2 };
  bullets = []; enemyBullets = []; particles = [];
  score = 0; lives = 3; wave = 1;
  lastShot = 0;
  buildWave(wave);
  syncHud();
}

function syncHud() {
  hudScore.textContent = score;
  hudLives.textContent = '❤️'.repeat(Math.max(0, lives));
  waveEl.textContent = wave;
}

function fire() {
  const now = performance.now();
  if (now - lastShot < FIRE_COOLDOWN) return;
  lastShot = now;
  bullets.push({ x: ship.x + SHIP_W / 2 - 2, y: SHIP_Y - 6, w: 4, h: 12 });
}

function burst(x, y, color) {
  for (let i = 0; i < 8; i++)
    particles.push({ x, y, vx: (Math.random() - 0.5) * 4, vy: (Math.random() - 0.5) * 4, life: 1, color });
}

function hit(a, b) { return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }

function update(dt) {
  const step = dt * 60;
  if (keys.left) ship.x -= SHIP_SPEED * step;
  if (keys.right) ship.x += SHIP_SPEED * step;
  ship.x = Math.max(4, Math.min(W - SHIP_W - 4, ship.x));
  if (keys.fire) fire();

  bullets.forEach(b => b.y -= BULLET_SPEED * step);
  bullets = bullets.filter(b => b.y + b.h > 0);

  // Enemy formation drift
  let hitEdge = false, speed = (0.5 + wave * 0.18);
  enemies.forEach(e => {
    if (!e.alive) return;
    e.x += enemyDir * speed * step;
    if (e.x < 4 || e.x + e.w > W - 4) hitEdge = true;
  });
  if (hitEdge) { enemyDir *= -1; enemies.forEach(e => e.y += 12); }

  // Random enemy fire
  const alive = enemies.filter(e => e.alive);
  if (alive.length && Math.random() < 0.012 + wave * 0.004) {
    const e = alive[(Math.random() * alive.length) | 0];
    enemyBullets.push({ x: e.x + e.w / 2 - 2, y: e.y + e.h, w: 4, h: 10 });
  }
  enemyBullets.forEach(b => b.y += ENEMY_BULLET_SPEED * step);
  enemyBullets = enemyBullets.filter(b => b.y < H);

  // Bullet vs enemy
  bullets.forEach(b => {
    enemies.forEach(e => {
      if (e.alive && hit(b, e)) {
        b.y = -50; e.hp--;
        if (e.hp <= 0) { e.alive = false; score += 10 * wave; burst(e.x + e.w / 2, e.y + e.h / 2, '#f472b6'); }
        else burst(b.x, b.y, '#fbbf24');
        syncHud();
      }
    });
  });
  bullets = bullets.filter(b => b.y > -40);

  // Enemy bullet vs ship
  const shipRect = { x: ship.x, y: SHIP_Y, w: SHIP_W, h: SHIP_H };
  enemyBullets.forEach(b => {
    if (hit(b, shipRect)) { b.y = H + 50; loseLife(); }
  });
  enemyBullets = enemyBullets.filter(b => b.y < H + 40);

  // Enemy reaches ship line
  if (alive.some(e => e.y + e.h >= SHIP_Y - 4)) { loseLife(); enemies.forEach(e => e.y -= 60); }

  // Wave cleared
  if (!alive.length) { wave++; buildWave(wave); enemyBullets = []; syncHud(); }

  particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.life -= 0.05; });
  particles = particles.filter(p => p.life > 0);
}

function loseLife() {
  lives--; burst(ship.x + SHIP_W / 2, SHIP_Y, '#60a5fa'); syncHud();
  if (lives <= 0) endGame(false);
}

function drawShip(x, y) {
  ctx.fillStyle = '#a78bfa';
  ctx.beginPath();
  ctx.moveTo(x + SHIP_W / 2, y);
  ctx.lineTo(x + SHIP_W, y + SHIP_H);
  ctx.lineTo(x + SHIP_W / 2, y + SHIP_H - 6);
  ctx.lineTo(x, y + SHIP_H);
  ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#22d3ee';
  ctx.fillRect(x + SHIP_W / 2 - 3, y + 4, 6, 8);
}

function draw() {
  ctx.fillStyle = '#0b1020'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  for (let i = 0; i < 30; i++) ctx.fillRect((i * 53) % W, (i * 89 + (performance.now() / 40)) % H, 2, 2);

  ctx.fillStyle = '#fbbf24';
  bullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));
  ctx.fillStyle = '#f87171';
  enemyBullets.forEach(b => ctx.fillRect(b.x, b.y, b.w, b.h));

  enemies.forEach(e => {
    if (!e.alive) return;
    ctx.fillStyle = e.hp > 1 ? '#fb7185' : '#f472b6';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(e.x, e.y, e.w, e.h, 5); else ctx.rect(e.x, e.y, e.w, e.h);
    ctx.fill();
    ctx.fillStyle = '#0b1020';
    ctx.fillRect(e.x + 6, e.y + 7, 4, 4); ctx.fillRect(e.x + e.w - 10, e.y + 7, 4, 4);
  });

  particles.forEach(p => { ctx.globalAlpha = p.life; ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 3, 3); });
  ctx.globalAlpha = 1;

  drawShip(ship.x, SHIP_Y);
}

function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 0.05);
  lastFrame = ts;
  update(dt);
  if (running) { draw(); rafId = requestAnimationFrame(loop); }
}

function startGame() {
  resetState();
  running = true; lastFrame = 0;
  startOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = getBest();
  overTitle.textContent = 'Game Over';
  finalEl.textContent = 'Score ' + score + ' · Wave ' + wave;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New high score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === ' ') { keys.fire = true; e.preventDefault(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === ' ') keys.fire = false;
});

// ── Input: on-screen buttons (hold-to-repeat via pointer events) ──
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
hold('btn-left', () => keys.left = true, () => keys.left = false);
hold('btn-right', () => keys.right = true, () => keys.right = false);
hold('btn-fire', () => keys.fire = true, () => keys.fire = false);

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Space Blaster Arcade Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly canvas space shooter with on-screen D-pad and fire controls, enemy waves, lives, particle effects and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Space Blaster — A Canvas Space Shooter Built Around On-Screen Touch Controls',
      description: `A fixed-shooter arcade game is one of the most complete small demonstrations of real-time game programming: it needs a continuous render loop, two independent bullet systems, formation movement, per-frame collision detection between many objects, a lives/score economy, and — the focus of this snippet — a control scheme that works equally well with a keyboard and a thumb on glass. This snippet builds the whole thing on a single HTML5 \`<canvas>\` with \`requestAnimationFrame\`, and drives movement through an on-screen D-pad plus a FIRE button so it is playable on a phone with no keyboard at all.

**One input state, two input devices**

The core idea that keeps mobile and desktop controls from fighting each other is that nothing moves the ship directly inside an event handler. Instead every handler only flips booleans in a single \`keys\` object — \`keys.left\`, \`keys.right\`, \`keys.fire\` — and the game reads those booleans once per frame inside \`update()\`. Keyboard \`keydown\`/\`keyup\` listeners set them; the on-screen buttons set the same flags through a small \`hold()\` helper wired to Pointer Events (\`pointerdown\` to press, \`pointerup\`/\`pointercancel\`/\`pointerleave\` to release). Because both paths write to the identical state, holding the D-pad feels exactly like holding an arrow key, and the ship never gets "stuck on" if a finger slides off the button, because \`pointerleave\` releases it.

**Frame-independent movement and a fire cooldown**

The loop computes \`dt\` (seconds since the previous frame, clamped to 50ms) and scales all motion by it, so the ship and bullets travel at the same real-world speed on a 60Hz or a 120Hz display. Firing is rate-limited with a \`FIRE_COOLDOWN\` timestamp check rather than a per-frame flag, so holding FIRE produces an even stream of shots regardless of frame rate instead of a solid wall of bullets on fast displays.

**Formation movement and two bullet systems**

Enemies are generated per wave in a grid by \`buildWave(n)\`, which scales column count, row count and per-enemy hit points with the wave number. The formation drifts sideways as a block, and the instant any enemy touches a screen edge the whole grid reverses direction and steps down — the classic Space-Invaders march, implemented by detecting the edge hit in one pass and applying the reversal to every enemy in the next. Player bullets move up, enemy bullets move down, and each is tested against the opposing set every frame with an axis-aligned bounding box check in \`hit()\`.

**Score, lives, particles and a persisted best**

Destroying an enemy adds particles via \`burst()\`, awards wave-scaled points, and decrements that enemy's hit points (tougher enemies on later waves take multiple shots). Taking a hit — or letting the formation reach the ship's line — costs a life; at zero lives \`endGame()\` stops the loop and compares the run's score against the value stored in \`localStorage\` under \`space-blaster-best\`, showing a "New high score!" message when it is beaten.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Launch the game', text: 'Tap "Launch" to call startGame(), which runs resetState() to build wave 1, reset score and the three lives, and start the requestAnimationFrame loop.' },
        { title: 'Move with the D-pad', text: 'Press and hold the ◀ / ▶ buttons (or the Left/Right arrow keys) to move your ship. The handlers only set keys.left / keys.right, which update() reads once per frame — held input moves the ship smoothly, and pointerleave releases it if your finger slides off.' },
        { title: 'Hold FIRE to shoot', text: 'Hold the FIRE button (or Space) to shoot upward. A FIRE_COOLDOWN timestamp check spaces the shots evenly no matter how fast the display refreshes, so holding produces a steady stream rather than a solid beam.' },
        { title: 'Clear each wave', text: 'Enemies drift as a formation and reverse direction, stepping downward, whenever the block touches a screen edge. Later-wave enemies have more hit points and need multiple shots — destroying them awards wave-scaled points shown in the HUD.' },
        { title: 'Avoid enemy fire', text: 'Enemies fire back at random; a bullet that hits your ship, or a formation that reaches your line, costs one of your three lives (shown top-right). Lose all three and the run ends.' },
        { title: 'Beat your high score', text: 'Your best score persists in localStorage under space-blaster-best and shows in the header. Tune difficulty via buildWave() (grid size and hit points) and the enemy fire probability in update().' },
      ],
    },
    features: [
      'On-screen D-pad and FIRE button using Pointer Events with press-and-hold, plus keyboard fallback — both drive the same input state',
      'requestAnimationFrame loop with delta-time scaling for frame-rate-independent ship and bullet motion',
      'Timestamp-based fire cooldown so holding FIRE yields an even shot cadence on any refresh rate',
      'Space-Invaders-style formation movement: block drift with edge-triggered reversal and step-down',
      'Two independent bullet systems (player up, enemies down) with AABB collision each frame',
      'Wave progression that scales enemy count and per-enemy hit points, with wave-scaled scoring',
      'Particle burst effects on hits and destruction, plus a lives economy and Game Over state',
      'Persisted high score via localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Mobile-first game control pattern for touch UIs', desc: 'The D-pad + action-button layout wired through Pointer Events with pointerleave release is a reusable template for any browser game or interactive demo that must play well on a phone without a keyboard.' },
      { icon: 'FORM', title: 'Instantly playable arcade demo for a games portal', desc: 'A self-contained shooter with no assets to download starts immediately, making it a strong embeddable demo for a games site, blog, or app landing page — no tutorial or sign-up required.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 distraction', desc: 'With no network dependency it works as an interactive filler on an error page or slow-loading screen, in the same spirit as the [Dodge the Falling Blocks Game](/ui-snippets/dodge-the-blocks-game).' },
      { icon: 'LEARN', title: 'Teaching real-time collision and formation AI', desc: 'The two-bullet-system AABB checks and edge-triggered formation march are a compact reference for the collision and movement patterns behind classic 2D shooters, before any physics engine is involved.' },
      { icon: 'CODE', title: 'Starting point for a richer shmup', desc: 'The wave builder, particle system and unified input generalise well: add power-ups, shields, boss enemies, or sprite art without touching the dt-scaled loop or the collision core.' },
      { icon: 'DESIGN', title: 'Canvas + HUD + overlay layout reference', desc: 'The layered structure of a full-bleed canvas, an absolutely positioned HUD, and start/game-over overlays is directly reusable for any canvas experience that needs status readouts and modal states.' },
      { icon: 'CODE', title: 'Related: Typing Speed Test (WPM Counter)', desc: 'See the [Typing Speed Test (WPM Counter)](/ui-snippets/typing-speed-test/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the touch buttons and keyboard avoid conflicting?', a: 'Neither input moves the ship directly. Keyboard handlers and the on-screen button handlers both only toggle booleans in a shared keys object (keys.left, keys.right, keys.fire), and update() reads those booleans once per frame. Because there is a single source of truth for input state, a held button behaves identically to a held key, and there is no separate touch code path to keep in sync.' },
      { q: 'Why does the ship not get stuck moving when I lift my finger off the button?', a: 'The hold() helper binds pointerup, pointercancel and pointerleave in addition to pointerdown. If your finger releases or slides off the edge of the button, pointerleave or pointercancel fires and clears the corresponding flag, so the ship stops even when pointerup would otherwise be missed.' },
      { q: 'Why use a cooldown for firing instead of shooting every frame?', a: 'Holding FIRE sets keys.fire = true, which is read every frame. Without throttling, a 120Hz display would fire twice as many bullets as a 60Hz one. The FIRE_COOLDOWN timestamp check (fire only if enough real milliseconds have passed since the last shot) makes the shot cadence consistent in real time across any frame rate.' },
      { q: 'How does the enemy formation know when to turn around?', a: 'Each frame every living enemy is moved sideways in the current direction, and if any of them crosses the left or right margin a hitEdge flag is set. After that pass, if the flag is set, the direction is reversed for the whole block and every enemy steps down a fixed amount — reproducing the classic marching-formation behaviour with one detection pass and one reaction pass.' },
      { q: 'Does my high score survive a page reload?', a: 'Yes. The best score is written to localStorage under the key space-blaster-best and read back on load, so it persists across reloads and browser restarts on the same browser and origin. It resets only if site data is cleared or the game is played in a different browser, device, or a private window.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain how the shared keys input state lets the on-screen D-pad, the FIRE button and the keyboard all drive the same ship without conflicting, and how the FIRE_COOLDOWN keeps the shot rate frame-rate-independent. It is a strong base to extend: ask for power-ups that widen the shot or add a shield, a boss enemy with a health bar at the end of every fifth wave, screen-shake on player hits, or an object pool for bullets and particles to cut garbage collection during long runs. You could also ask it to port the loop into a React component with useRef/useEffect for the animation-frame lifecycle, or to add a second fire button for a special weapon. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly canvas space-shooter arcade game in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A player ship near the bottom of a canvas that moves left/right. Provide BOTH an on-screen D-pad (◀ ▶) and a FIRE button for touch, AND keyboard controls (arrow keys + Space). Both input methods must drive the same shared input-state object read once per frame — do not move the ship directly inside event handlers.
- Use Pointer Events for the on-screen buttons with press-and-hold, and release the input on pointerup, pointercancel AND pointerleave so the ship never gets stuck moving when a finger slides off a button.
- Use requestAnimationFrame and scale all motion by delta-time so speed is consistent across refresh rates. Rate-limit firing with a timestamp-based cooldown so holding FIRE gives an even shot cadence regardless of frame rate.
- Enemies spawn in a grid formation per wave; the formation drifts sideways and reverses direction and steps down whenever it touches a screen edge. Enemies fire back at random.
- Player bullets travel up, enemy bullets travel down; use axis-aligned bounding box collision every frame. Destroying an enemy awards points and spawns a small particle burst; later waves have more enemies with more hit points.
- Track score and three lives with a HUD; losing all lives shows a Game Over overlay with a Play Again button. Persist the best score in localStorage with defensive try/catch.`,
    },
  },
};

export default spaceBlasterGame;
