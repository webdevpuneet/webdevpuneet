const asteroidsGame = {
  id: 'asteroids-game',
  title: 'Asteroids Blaster Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🚀</span>
      <h2>Asteroids Blaster</h2>
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
      <span class="lives" id="hud-lives">🚀🚀🚀</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Asteroids Blaster</p>
        <p class="overlay-sub">Rotate with ↺ ↻, hold THRUST to drift, tap FIRE. Shots split the rocks. Fly off one edge, appear on the other.</p>
        <button class="btn btn-primary" id="btn-start">Launch</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Wrecked</p>
        <p class="overlay-sub" id="final-score">Score 0</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Relaunch</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="dpad">
      <button class="ctrl-btn" id="btn-left" aria-label="Rotate left">↺</button>
      <button class="ctrl-btn" id="btn-right" aria-label="Rotate right">↻</button>
    </div>
    <div class="actions">
      <button class="act-btn thrust" id="btn-thrust" aria-label="Thrust">THRUST</button>
      <button class="act-btn fire" id="btn-fire" aria-label="Fire">FIRE</button>
    </div>
  </div>

  <p class="hint-text">Keyboard: ← → rotate, ↑ thrust, Space fire</p>
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

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #05060f; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 8px 12px auto 12px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; }
.lives { font-size: 11px; letter-spacing: 1px; }

.overlay { position: absolute; inset: 0; background: rgba(5,6,15,0.88); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 300px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #7c3aed; color: #fff; }
.btn-primary:hover { background: #6d28d9; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; }
.dpad { display: flex; gap: 10px; }
.actions { display: flex; gap: 10px; }
.ctrl-btn, .act-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn { width: 56px; height: 62px; border-radius: 14px; background: #f8fafc; color: #334155; font-size: 24px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #ede9fe; }
.act-btn { width: 78px; height: 62px; border-radius: 14px; color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; }
.act-btn.thrust { background: #0891b2; box-shadow: 0 3px 0 #0e7490; border-color: #0891b2; }
.act-btn.thrust:active { transform: translateY(3px); box-shadow: none; background: #0e7490; }
.act-btn.fire { background: #7c3aed; box-shadow: 0 3px 0 #5b21b6; border-color: #6d28d9; }
.act-btn.fire:active { transform: translateY(3px); box-shadow: none; background: #6d28d9; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'asteroids-blaster-best';

const TURN = 4.6, THRUST = 0.14, DRAG = 0.992, MAX_V = 6;
const BULLET_SPEED = 6, BULLET_LIFE = 60, FIRE_CD = 260, INVULN = 90;
const SIZES = { 3: 34, 2: 22, 1: 13 };

let ship, bullets, rocks, particles;
let score, lives, wave, running, rafId, lastFrame, invuln;
let keys = { left: false, right: false, thrust: false, fire: false };
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

function wrap(o) { if (o.x < 0) o.x += W; if (o.x > W) o.x -= W; if (o.y < 0) o.y += H; if (o.y > H) o.y -= H; }

function makeRock(x, y, size) {
  const r = SIZES[size];
  const verts = [];
  const n = 9;
  for (let i = 0; i < n; i++) verts.push(0.7 + Math.random() * 0.5);
  const a = Math.random() * Math.PI * 2, sp = (4 - size) * (0.4 + Math.random() * 0.5);
  return { x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, size, r, verts, rot: Math.random() * 6, spin: (Math.random() - 0.5) * 0.04 };
}

function spawnWave() {
  rocks = [];
  const count = 3 + wave;
  for (let i = 0; i < count; i++) {
    // Spawn away from the centre where the ship sits
    let x, y;
    do { x = Math.random() * W; y = Math.random() * H; } while (Math.hypot(x - W / 2, y - H / 2) < 90);
    rocks.push(makeRock(x, y, 3));
  }
}

function resetState() {
  ship = { x: W / 2, y: H / 2, vx: 0, vy: 0, angle: -Math.PI / 2 };
  bullets = []; particles = [];
  score = 0; lives = 3; wave = 1; invuln = INVULN;
  lastShot = 0;
  spawnWave(); syncHud();
}

function syncHud() { hudScore.textContent = score; hudLives.textContent = '🚀'.repeat(Math.max(0, lives)); waveEl.textContent = wave; }

function fire() {
  const now = performance.now();
  if (now - lastShot < FIRE_CD) return;
  lastShot = now;
  bullets.push({ x: ship.x + Math.cos(ship.angle) * 12, y: ship.y + Math.sin(ship.angle) * 12, vx: Math.cos(ship.angle) * BULLET_SPEED, vy: Math.sin(ship.angle) * BULLET_SPEED, life: BULLET_LIFE });
}

function burst(x, y, color, n) {
  for (let i = 0; i < (n || 10); i++) { const a = Math.random() * Math.PI * 2, s = Math.random() * 3; particles.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s, life: 1, color }); }
}

function splitRock(idx) {
  const r = rocks[idx];
  score += (4 - r.size) * 20; syncHud();
  burst(r.x, r.y, '#c4b5fd', 12);
  rocks.splice(idx, 1);
  if (r.size > 1) { rocks.push(makeRock(r.x, r.y, r.size - 1)); rocks.push(makeRock(r.x, r.y, r.size - 1)); }
}

function update(dt) {
  const step = dt * 60;
  if (keys.left) ship.angle -= (TURN / 60) * step;
  if (keys.right) ship.angle += (TURN / 60) * step;
  if (keys.thrust) { ship.vx += Math.cos(ship.angle) * THRUST * step; ship.vy += Math.sin(ship.angle) * THRUST * step; }
  const spd = Math.hypot(ship.vx, ship.vy);
  if (spd > MAX_V) { ship.vx *= MAX_V / spd; ship.vy *= MAX_V / spd; }
  ship.vx *= DRAG; ship.vy *= DRAG;
  ship.x += ship.vx * step; ship.y += ship.vy * step; wrap(ship);
  if (keys.fire) fire();
  if (invuln > 0) invuln -= step;

  bullets.forEach(b => { b.x += b.vx * step; b.y += b.vy * step; b.life -= step; wrap(b); });
  bullets = bullets.filter(b => b.life > 0);

  rocks.forEach(r => { r.x += r.vx * step; r.y += r.vy * step; r.rot += r.spin * step; wrap(r); });

  // Bullet vs rock
  for (let i = rocks.length - 1; i >= 0; i--) {
    const r = rocks[i];
    for (let j = bullets.length - 1; j >= 0; j--) {
      if (Math.hypot(r.x - bullets[j].x, r.y - bullets[j].y) < r.r) { bullets.splice(j, 1); splitRock(i); break; }
    }
  }

  // Ship vs rock
  if (invuln <= 0) {
    for (const r of rocks) {
      if (Math.hypot(r.x - ship.x, r.y - ship.y) < r.r + 8) { loseLife(); break; }
    }
  }

  particles.forEach(p => { p.x += p.vx * step; p.y += p.vy * step; p.life -= 0.03 * step; });
  particles = particles.filter(p => p.life > 0);

  if (!rocks.length) { wave++; score += 50; invuln = INVULN; spawnWave(); syncHud(); }
}

function loseLife() {
  lives--; burst(ship.x, ship.y, '#f472b6', 18); syncHud();
  if (lives <= 0) { endGame(); return; }
  ship.x = W / 2; ship.y = H / 2; ship.vx = 0; ship.vy = 0; ship.angle = -Math.PI / 2; invuln = INVULN;
}

function draw() {
  ctx.fillStyle = '#05060f'; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = 'rgba(255,255,255,0.4)';
  for (let i = 0; i < 40; i++) ctx.fillRect((i * 47) % W, (i * 71) % H, 1.5, 1.5);

  // Rocks
  ctx.strokeStyle = '#a78bfa'; ctx.lineWidth = 2;
  rocks.forEach(r => {
    ctx.save(); ctx.translate(r.x, r.y); ctx.rotate(r.rot); ctx.beginPath();
    for (let i = 0; i < r.verts.length; i++) {
      const a = (i / r.verts.length) * Math.PI * 2, rad = r.r * r.verts[i];
      const px = Math.cos(a) * rad, py = Math.sin(a) * rad;
      i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
    }
    ctx.closePath(); ctx.stroke(); ctx.restore();
  });

  // Bullets
  ctx.fillStyle = '#fde047';
  bullets.forEach(b => { ctx.beginPath(); ctx.arc(b.x, b.y, 2.5, 0, Math.PI * 2); ctx.fill(); });

  // Particles
  particles.forEach(p => { ctx.globalAlpha = Math.max(0, p.life); ctx.fillStyle = p.color; ctx.fillRect(p.x, p.y, 2.5, 2.5); });
  ctx.globalAlpha = 1;

  // Ship (blink while invulnerable)
  if (!(invuln > 0 && (Math.floor(invuln / 6) % 2))) {
    ctx.save(); ctx.translate(ship.x, ship.y); ctx.rotate(ship.angle);
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 2; ctx.beginPath();
    ctx.moveTo(13, 0); ctx.lineTo(-9, -8); ctx.lineTo(-5, 0); ctx.lineTo(-9, 8); ctx.closePath(); ctx.stroke();
    if (keys.thrust) { ctx.strokeStyle = '#22d3ee'; ctx.beginPath(); ctx.moveTo(-5, -4); ctx.lineTo(-14, 0); ctx.lineTo(-5, 4); ctx.stroke(); }
    ctx.restore();
  }
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
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === 'ArrowUp') keys.thrust = true;
  if (e.key === ' ') { keys.fire = true; e.preventDefault(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
  if (e.key === 'ArrowUp') keys.thrust = false;
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
hold('btn-left', () => keys.left = true, () => keys.left = false);
hold('btn-right', () => keys.right = true, () => keys.right = false);
hold('btn-thrust', () => keys.thrust = true, () => keys.thrust = false);
hold('btn-fire', () => keys.fire = true, () => keys.fire = false);

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Asteroids Blaster Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly canvas Asteroids clone with on-screen rotate, thrust and fire buttons, inertia-based vector movement, screen wrapping, splitting rocks and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Asteroids Blaster — Inertia Physics, Screen Wrap and Splitting Rocks on Canvas',
      description: `The original Asteroids is the canonical example of *momentum-based* control: you don't steer the ship, you steer its acceleration. That single idea — rotate to aim a thrust vector, then coast on the velocity you've built up — makes it a perfect demonstration of vector movement, and it maps cleanly onto touch as two rotate buttons plus a thrust and a fire button. This snippet builds a complete version on one HTML5 \`<canvas>\`: inertia, screen wrapping, procedurally shaped rocks that split into smaller ones when shot, lives with a respawn-invulnerability window, and wave progression.

**Rotate the heading, thrust along it, coast on the velocity**

The ship stores a heading \`angle\` and a velocity vector \`(vx, vy)\` that are deliberately independent. The rotate buttons only change the angle; the THRUST button adds a small acceleration *along the current heading* (\`vx += cos(angle) * THRUST\`), and every frame the velocity is multiplied by a \`DRAG\` factor slightly below 1 so the ship gradually slows but never stops on its own. That decoupling of facing from motion is the entire feel of the game — you can drift backwards while firing forwards — and it's why the control scheme needs a separate thrust button rather than a directional pad. Speed is capped by normalising the velocity vector when it exceeds \`MAX_V\`.

**Toroidal screen wrapping**

Everything that moves — ship, bullets, rocks — passes through the same \`wrap()\` function, which teleports an object that crosses one edge to the opposite edge. This makes the play field a torus: there are no walls, and the tactical wrinkle is that a rock (or your own bullet) leaving the right edge reappears on the left. Because bullets have a limited \`BULLET_LIFE\`, they don't wrap forever and circle back to hit you.

**Procedural rocks that split**

Each rock is built by \`makeRock()\` with a ring of randomised radii, so no two are the same lumpy shape, and it carries a size class (3, 2 or 1). When a bullet is within a rock's radius, \`splitRock()\` awards size-scaled points and — if the rock isn't already the smallest — replaces it with two smaller rocks launched in new directions. That one rule produces the escalating swarm the game is known for: one big slow rock becomes two, then four, then eight fast small ones.

**Lives, invulnerability and waves**

Colliding with a rock costs a life and respawns the ship at centre with a blinking \`INVULN\` window so you aren't instantly killed again by an overlapping rock. Clearing every rock advances the wave, which spawns more and larger rocks. Movement is delta-time scaled so the physics runs at the same rate on any display, and the best score persists to \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Launch', text: 'Tap "Launch" to call startGame(), which places the ship at centre, spawns wave 1 of large rocks away from the middle, and starts the delta-time requestAnimationFrame loop.' },
        { title: 'Rotate to aim', text: 'Hold ↺ or ↻ (or the Left/Right arrow keys) to spin the ship. Rotation only changes the heading angle — it does not move you — so aim first, then thrust.' },
        { title: 'Thrust to build momentum', text: 'Hold THRUST (or ↑) to accelerate along the current heading. Release and you keep coasting on the velocity you built; a slight drag bleeds it off over time. You can drift one way while facing another.' },
        { title: 'Fire to split rocks', text: 'Tap or hold FIRE (or Space) to shoot along your heading, rate-limited by a cooldown. Hitting a large rock splits it into two smaller, faster rocks; the smallest ones vanish for the most points.' },
        { title: 'Use the wrap-around edges', text: 'Fly off any edge and you reappear on the opposite side — and so do the rocks. Use wrapping to escape a crowded corner, but watch for rocks coming back around behind you.' },
        { title: 'Survive and clear waves', text: 'A rock collision costs one of three lives and respawns you with a brief blinking invulnerability. Clearing all rocks advances the wave. Your best score persists in localStorage under asteroids-blaster-best; tune THRUST, DRAG and MAX_V for a different feel.' },
      ],
    },
    features: [
      'On-screen rotate (↺ ↻), THRUST and FIRE buttons via Pointer Events with press-and-hold, plus keyboard fallback driving one shared input state',
      'Momentum-based vector movement: heading angle and velocity are independent, with acceleration along the heading, drag and a speed cap',
      'Toroidal screen wrapping applied uniformly to the ship, bullets and rocks',
      'Procedurally shaped asteroids that split into two smaller, faster rocks when shot, with size-scaled scoring',
      'Lives with a blinking respawn-invulnerability window so you are not instantly re-killed',
      'Wave progression that spawns more and larger rocks, plus particle burst effects on hits and destruction',
      'Delta-time scaled physics for frame-rate-independent motion and a cooldown-limited fire rate',
      'Persisted high score via localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Rotational touch-control template', desc: 'The rotate + thrust + fire layout is a distinct control archetype from a directional D-pad, and a reusable template for any momentum-based touch game — space shooters, lunar landers, or physics toys.' },
      { icon: 'LEARN', title: 'Teaching vector movement and inertia', desc: 'Decoupling heading from velocity, accelerating along a vector, applying drag and capping speed are the foundations of 2D physics movement, shown here in compact, readable form.' },
      { icon: 'CODE', title: 'Starting point for a fuller space game', desc: 'The vector ship, wrap() and splitting rocks generalise to hyperspace jumps, UFO enemies, shields, or shot power-ups without touching the delta-time loop.' },
      { icon: 'FORM', title: 'Instantly playable arcade demo', desc: 'A self-contained vector shooter with no assets to download starts immediately — a strong embeddable demo for a games portal, blog, or landing page.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it makes an interactive distraction on an error or loading screen, in the spirit of the [Space Blaster Arcade Game](/ui-snippets/space-blaster-game).' },
      { icon: 'DESIGN', title: 'Canvas vector-rendering reference', desc: 'The stroked procedural rock shapes, rotated ship rendered with save/translate/rotate, and thruster flame are directly reusable techniques for any vector-styled canvas scene.' },
      { icon: 'CODE', title: 'Related: Number Sequence Memory Game', desc: 'See the [Number Sequence Memory Game](/ui-snippets/number-sequence-memory-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Lights Out Puzzle Game', desc: 'See the [Lights Out Puzzle Game](/ui-snippets/lights-out-puzzle-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Checkers Game', desc: 'See the [Checkers Game](/ui-snippets/checkers-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the ship keep drifting after I stop thrusting?', a: 'Asteroids is momentum-based: the ship stores a velocity vector that persists between frames. Thrusting only adds acceleration along the heading; when you release, the velocity remains and is multiplied by a DRAG factor just below 1 each frame, so the ship slowly coasts to a stop rather than halting instantly. That inertia is the defining feel of the game and the reason steering is about anticipation, not direct control.' },
      { q: 'How does screen wrapping work?', a: 'Every moving object passes through a single wrap() function that checks whether it has crossed an edge and, if so, adds or subtracts the canvas width or height to move it to the opposite side. Applying the same function to the ship, bullets and rocks makes the whole field behave like a torus with no walls. Bullets have a limited lifetime so they expire instead of wrapping around forever and hitting you.' },
      { q: 'Why do rocks split into smaller ones?', a: 'Each rock carries a size class. When a bullet is within a rock\'s radius, splitRock() removes it and, unless it is already the smallest size, spawns two smaller rocks moving in fresh random directions. This is the classic Asteroids mechanic: destroying one large rock creates more targets, so the field gets busier and faster as you clear it, and the smallest rocks award the most points.' },
      { q: 'Why can I not steer directly like in a top-down game?', a: 'That is intentional — the control scheme separates facing from motion. The rotate buttons change only the heading angle, and thrust accelerates along that angle. This is why the game uses dedicated rotate and thrust buttons instead of a four-way pad: you are piloting acceleration and momentum, not directly setting a position, which is a fundamentally different (and more physical) control model.' },
      { q: 'Does my high score persist across reloads?', a: 'Yes. The best score is written to localStorage under asteroids-blaster-best and read on load, so it survives reloads and browser restarts on the same browser and origin. The read and write are wrapped in try/catch so the game still runs in sandboxed or private contexts where storage access can throw.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain how the independent heading angle and velocity vector, the drag-and-cap on speed, and the shared wrap() function combine into Asteroids-style momentum flight. It is a strong base to extend: ask for a hyperspace teleport button, UFO enemies that shoot at you, a shield or extra-life pickup, thrust particles that persist as a trail, or shot power-ups (spread, rapid fire). You could also ask it to add gentle screen-relative aiming assist for touch, or to port the loop into a React component using useRef and useEffect. Treat it as a working prototype to question and rebuild rather than a finished game.`,
      prompt: `Build a mobile-friendly Asteroids-style vector shooter on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A ship controlled by rotation and thrust with momentum: store an independent heading angle and a velocity vector. Rotate buttons change only the angle; a thrust button accelerates along the heading; apply a drag factor each frame and cap the maximum speed. Provide on-screen rotate-left, rotate-right, THRUST and FIRE buttons for touch AND keyboard controls (arrows + Space). Both drive one shared input-state object read once per frame.
- Use Pointer Events for the buttons with press-and-hold released on pointerup/pointercancel/pointerleave. Scale all motion by delta-time so physics is frame-rate-independent, and rate-limit firing with a timestamp cooldown.
- Wrap the ship, bullets and asteroids around the screen edges (toroidal field) using one shared wrap function. Give bullets a limited lifetime so they expire instead of wrapping forever.
- Generate procedurally shaped asteroids with a size class. When a bullet hits a rock, award size-scaled points and split it into two smaller, faster rocks unless it is already the smallest.
- Give the ship three lives; a rock collision costs a life and respawns it at centre with a brief blinking invulnerability window. Clearing all rocks advances the wave and spawns more, larger rocks. Persist the high score in localStorage with defensive try/catch, and show start / game-over overlays with particle bursts.`,
    },
  },
};

export default asteroidsGame;
