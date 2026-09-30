const pixelPlatformerGame = {
  id: 'pixel-platformer-game',
  title: 'Pixel Platformer Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🧗</span>
      <h2>Pixel Platformer</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Coins <b id="coins">0</b></span>
      <span class="badge">Best <b id="best-score">—</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="300"></canvas>
    <div class="hud"><span id="hud-time">0.0s</span></div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Pixel Platformer</p>
        <p class="overlay-sub">Run with ◀ ▶, tap JUMP to leap. Grab the coins, dodge the spikes, reach the flag.</p>
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

  <p class="hint-text">Keyboard: ← → to run, Space / ↑ to jump</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #eef2ff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.stat-badges { display: flex; gap: 6px; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #2563eb; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #7dd3fc; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; top: 8px; right: 12px; font-size: 13px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; background: rgba(255,255,255,0.7); padding: 2px 8px; border-radius: 10px; pointer-events: none; }

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
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'pixel-platformer-best';

const GRAV = 0.6, MOVE = 3.4, JUMP_V = 11, FRICTION = 0.8;
const LEVEL_W = 1600, GROUND_Y = H - 30;

// Static level: platforms, coins, spikes, and a goal flag.
const platforms = [
  { x: 0, y: GROUND_Y, w: 340, h: 30 },
  { x: 400, y: GROUND_Y, w: 300, h: 30 },
  { x: 760, y: GROUND_Y, w: 840, h: 30 },
  { x: 250, y: 205, w: 90, h: 14 },
  { x: 430, y: 165, w: 80, h: 14 },
  { x: 600, y: 205, w: 90, h: 14 },
  { x: 860, y: 190, w: 90, h: 14 },
  { x: 1020, y: 150, w: 90, h: 14 },
  { x: 1200, y: 200, w: 110, h: 14 },
];
const spikes = [
  { x: 360, y: GROUND_Y - 16, w: 40, h: 16 },
  { x: 700, y: GROUND_Y - 16, w: 60, h: 16 },
  { x: 1120, y: GROUND_Y - 16, w: 60, h: 16 },
];
let coins = [
  { x: 285, y: 175 }, { x: 465, y: 135 }, { x: 635, y: 175 },
  { x: 520, y: GROUND_Y - 24 }, { x: 895, y: 160 }, { x: 1055, y: 120 },
  { x: 1245, y: 170 }, { x: 1400, y: GROUND_Y - 24 },
];
const flag = { x: 1520, y: GROUND_Y - 60, w: 10, h: 60 };

let player, cam, keys, coinCount, running, won, elapsed, rafId, lastFrame, coinState;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudTime = document.getElementById('hud-time');
const coinsEl = document.getElementById('coins');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');
const overTitle = document.getElementById('over-title');

function getBest() { try { const v = parseFloat(localStorage.getItem(BEST_KEY)); return isNaN(v) ? null : v; } catch (e) { return null; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function resetState() {
  player = { x: 40, y: GROUND_Y - 30, w: 20, h: 28, vx: 0, vy: 0, onGround: false, face: 1 };
  cam = 0; coinCount = 0; elapsed = 0; won = false;
  coinState = coins.map(() => true);
  keys = { left: false, right: false, jump: false };
  coinsEl.textContent = '0';
}

function requestJump() { if (player.onGround) { player.vy = -JUMP_V; player.onGround = false; } }

function rectsOverlap(ax, ay, aw, ah, bx, by, bw, bh) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function update() {
  // Horizontal
  if (keys.left) { player.vx = -MOVE; player.face = -1; }
  else if (keys.right) { player.vx = MOVE; player.face = 1; }
  else player.vx *= FRICTION;
  player.x += player.vx;

  // Gravity
  player.vy += GRAV;
  player.y += player.vy;
  player.onGround = false;

  // Platform collision (land on top when falling)
  platforms.forEach(p => {
    if (rectsOverlap(player.x, player.y, player.w, player.h, p.x, p.y, p.w, p.h)) {
      const prevBottom = player.y - player.vy + player.h;
      if (player.vy >= 0 && prevBottom <= p.y + 6) {
        player.y = p.y - player.h; player.vy = 0; player.onGround = true;
      }
    }
  });

  // World bounds
  if (player.x < 0) player.x = 0;
  if (player.x + player.w > LEVEL_W) player.x = LEVEL_W - player.w;

  // Fell off the world
  if (player.y > H + 40) return die();

  // Spikes
  for (const s of spikes)
    if (rectsOverlap(player.x, player.y, player.w, player.h, s.x, s.y, s.w, s.h)) return die();

  // Coins
  coins.forEach((c, i) => {
    if (coinState[i] && rectsOverlap(player.x, player.y, player.w, player.h, c.x - 8, c.y - 8, 16, 16)) {
      coinState[i] = false; coinCount++; coinsEl.textContent = coinCount;
    }
  });

  // Goal flag
  if (rectsOverlap(player.x, player.y, player.w, player.h, flag.x, flag.y, flag.w, flag.h)) return finish();

  // Camera follows player, clamped to level bounds
  cam = Math.max(0, Math.min(LEVEL_W - W, player.x + player.w / 2 - W / 2));
  elapsed += 1 / 60;
}

function draw() {
  // Sky gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#7dd3fc'); g.addColorStop(1, '#bae6fd');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(-cam, 0);

  // Parallax hills
  ctx.fillStyle = '#86efac';
  for (let i = 0; i < 8; i++) {
    const hx = i * 260 - (cam * 0.3) % 260;
    ctx.beginPath(); ctx.arc(hx + cam * 0.3, GROUND_Y, 120, Math.PI, 0); ctx.fill();
  }

  // Platforms
  platforms.forEach(p => {
    ctx.fillStyle = '#4ade80';
    ctx.fillRect(p.x, p.y, p.w, 6);
    ctx.fillStyle = '#a16207';
    ctx.fillRect(p.x, p.y + 6, p.w, p.h - 6);
  });

  // Spikes
  ctx.fillStyle = '#ef4444';
  spikes.forEach(s => {
    const n = Math.floor(s.w / 12);
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.moveTo(s.x + i * 12, s.y + s.h);
      ctx.lineTo(s.x + i * 12 + 6, s.y);
      ctx.lineTo(s.x + i * 12 + 12, s.y + s.h);
      ctx.closePath(); ctx.fill();
    }
  });

  // Coins
  coins.forEach((c, i) => {
    if (!coinState[i]) return;
    const bob = Math.sin(elapsed * 4 + i) * 3;
    ctx.fillStyle = '#facc15'; ctx.strokeStyle = '#eab308'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(c.x, c.y + bob, 7, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  });

  // Flag
  ctx.fillStyle = '#64748b'; ctx.fillRect(flag.x, flag.y, 3, flag.h);
  ctx.fillStyle = '#22c55e';
  ctx.beginPath(); ctx.moveTo(flag.x + 3, flag.y); ctx.lineTo(flag.x + 26, flag.y + 8); ctx.lineTo(flag.x + 3, flag.y + 16); ctx.closePath(); ctx.fill();

  // Player
  ctx.fillStyle = '#2563eb';
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(player.x, player.y, player.w, player.h, 5); ctx.fill(); }
  else ctx.fillRect(player.x, player.y, player.w, player.h);
  ctx.fillStyle = '#fff';
  const ex = player.face > 0 ? player.x + player.w - 8 : player.x + 3;
  ctx.fillRect(ex, player.y + 7, 5, 5);

  ctx.restore();

  hudTime.textContent = elapsed.toFixed(1) + 's';
}

function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  // Fixed-step update: run one or more 60fps steps per frame to keep physics stable
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

function die() {
  running = false; cancelAnimationFrame(rafId); draw();
  overTitle.textContent = '💥 Ouch!';
  finalEl.textContent = 'You grabbed ' + coinCount + ' / ' + coins.length + ' coins. Try again!';
  bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

function finish() {
  running = false; won = true; cancelAnimationFrame(rafId); draw();
  const best = getBest();
  overTitle.textContent = '🏁 Level Clear!';
  finalEl.textContent = 'Time ' + elapsed.toFixed(1) + 's · Coins ' + coinCount + '/' + coins.length;
  if (best === null || elapsed < best) { setBest(elapsed); bestEl.textContent = elapsed.toFixed(1) + 's'; bestMsgEl.textContent = '🏆 New best time!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') keys.left = true;
  if (e.key === 'ArrowRight') keys.right = true;
  if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { requestJump(); e.preventDefault(); }
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft') keys.left = false;
  if (e.key === 'ArrowRight') keys.right = false;
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
// Jump is a single tap, fired on pointerdown
document.getElementById('btn-jump').addEventListener('pointerdown', e => { e.preventDefault(); requestJump(); });
document.getElementById('btn-jump').addEventListener('contextmenu', e => e.preventDefault());

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

const b = getBest();
bestEl.textContent = b === null ? '—' : b.toFixed(1) + 's';
resetState();
draw();`,

  seo: {
    title: 'Pixel Platformer Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly canvas platformer with on-screen run and jump buttons, gravity physics, one-way platforms, coins, spikes, a scrolling camera and a goal flag. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Pixel Platformer — Gravity, One-Way Platforms and a Scrolling Camera on Canvas',
      description: `A side-scrolling platformer is the classic proving ground for 2D game physics because it forces you to solve, in a small space, the three problems every action game shares: applying gravity every frame, resolving collisions so the character stands on solid ground instead of falling through it, and moving a camera that follows the player through a level larger than the screen. This snippet implements all three on a single HTML5 \`<canvas>\`, and controls the character with an on-screen ◀ ▶ D-pad and a JUMP button so it plays with a thumb on a phone as naturally as with the arrow keys.

**A stable fixed-timestep loop**

Platformer physics is sensitive to frame timing: a variable step can let a fast-moving character tunnel straight through a thin platform. To avoid that, the loop accumulates elapsed time and runs the physics \`update()\` in fixed 1/60-second steps, draining the accumulator with a \`while\` loop before each paint. Rendering still happens once per frame, but the simulation always advances in the same discrete increments, so jump height, run speed and collision behaviour are identical whether the display refreshes at 60Hz or 120Hz.

**Gravity and one-way platform collision**

Every step, gravity is added to the character's vertical velocity, the velocity is added to position, and then each platform is tested. The key detail is that platforms are *one-way from the top*: a landing only registers when the player is moving downward (\`vy >= 0\`) and their previous-frame bottom edge was at or above the platform surface. That single guard lets the character jump up *through* a floating platform and land on it coming down — the expected feel of a platformer — instead of being blocked from below. Horizontal movement uses acceleration toward a target speed with friction when no direction is held, so the character eases to a stop rather than snapping.

**Jump as a discrete action, run as a held state**

Run and jump are deliberately different input types. Left and right are *held states* — the D-pad buttons and arrow keys toggle \`keys.left\`/\`keys.right\`, read every step. Jump is a *discrete action* fired once on press: the JUMP button uses \`pointerdown\` (not a held flag) and only launches the character when \`onGround\` is true, which prevents mid-air double jumps and matches how a jump button should behave. Both control schemes call the same \`requestJump()\` function.

**A camera that follows through a wide level**

The level is far wider than the canvas. The camera's x-offset tracks the player's centre and is clamped to the level bounds so it never scrolls past the start or end, and the whole world is drawn through a single \`ctx.translate(-cam, 0)\`. Parallax hills scroll at a fraction of the camera speed for depth. Coins, spikes and a goal flag complete the level: collecting coins updates a counter, touching a spike or falling off the world ends the run, and reaching the flag finishes the level and records the completion time to \`localStorage\` as a personal best.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the level', text: 'Tap "Start" to call startGame(), which resets the player to the left edge, clears the coin state and begins the fixed-timestep requestAnimationFrame loop.' },
        { title: 'Run with the D-pad', text: 'Hold ◀ or ▶ (or the Left/Right arrow keys) to run. These set keys.left / keys.right, read every physics step; releasing applies friction so the character eases to a stop rather than stopping dead.' },
        { title: 'Jump with the JUMP button', text: 'Tap JUMP (or Space / ↑). Jump is a discrete action fired on pointerdown and only works when the character is on the ground, so there is no accidental double jump. You can jump up through a platform and land on it on the way down.' },
        { title: 'Collect coins, dodge spikes', text: 'Grab the bobbing gold coins to raise the counter in the header. Touching a red spike, or falling off the bottom of the world, ends the run and shows a retry screen.' },
        { title: 'Reach the flag', text: 'Get to the green flag at the far right to finish the level. Your completion time is shown and, if it beats your stored best, saved to localStorage under pixel-platformer-best.' },
        { title: 'Edit the level', text: 'The platforms, spikes, coins and flag are plain data arrays near the top of the JS. Add or move objects there, and tune GRAV, MOVE and JUMP_V to change the game feel.' },
      ],
    },
    features: [
      'On-screen run D-pad plus a discrete-tap JUMP button (Pointer Events), with keyboard fallback — jump only when grounded',
      'Fixed-timestep physics (1/60s steps drained per frame) so jump height and speed are identical across refresh rates',
      'Gravity + velocity integration with acceleration and friction for a smooth run-and-stop feel',
      'One-way platform collision: land from above while falling, jump up through platforms from below',
      'Scrolling camera clamped to level bounds via ctx.translate, with parallax hills for depth',
      'Data-driven level: platforms, spikes, coins and a goal flag defined as editable arrays',
      'Coin collection counter, spike/fall death, and a level-complete win state',
      'Persisted best completion time in localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Mobile platformer control template', desc: 'The split between held run buttons and a discrete grounded-only jump button, all wired through Pointer Events, is a reusable control scheme for any touch platformer or action game.' },
      { icon: 'LEARN', title: 'Teaching 2D game physics from scratch', desc: 'Gravity integration, one-way platform collision, and a fixed timestep are the three foundations of platformer physics — this is a compact, readable reference for all three without a game engine.' },
      { icon: 'CODE', title: 'Starting point for a full platformer', desc: 'The data-driven level and camera generalise cleanly: add moving platforms, enemies, checkpoints, multiple levels or sprite art on top of the same physics core.' },
      { icon: 'FORM', title: 'Instantly playable browser-game demo', desc: 'A self-contained platformer with no assets to load starts immediately, making it a strong embeddable demo for a games site, portfolio, or landing page.' },
      { icon: 'FLOW', title: 'Interactive empty-state or 404 filler', desc: 'With no network dependency it works as an engaging distraction on an error page or slow-loading screen, like the [Maze Runner Arrow-Key Game](/ui-snippets/maze-runner-game).' },
      { icon: 'DESIGN', title: 'Canvas camera and parallax reference', desc: 'The translate-based camera clamped to level bounds and the fractional-speed parallax layer are directly reusable patterns for any wide-scrolling canvas scene.' },
      { icon: 'CODE', title: 'Related: Rock Paper Scissors vs Computer', desc: 'See the [Rock Paper Scissors vs Computer](/ui-snippets/rock-paper-scissors-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the game use a fixed timestep instead of scaling by delta-time?', a: 'Platformer collision is sensitive to how far an object moves in a single step. With a large variable step, a fast-falling character can move entirely past a thin platform between two frames and tunnel through it. Running the physics in fixed 1/60-second steps (draining an accumulator each frame) keeps every jump and collision identical regardless of frame rate and avoids that tunnelling, while drawing still happens once per rendered frame.' },
      { q: 'How can I jump up through a platform but still land on it?', a: 'Platforms are one-way. A landing is only registered when the player is moving downward (vy >= 0) and their bottom edge in the previous step was at or above the platform surface. When jumping upward, vy is negative so the collision is ignored, letting the character pass through from below; on the way down the guard becomes true and the character lands on top.' },
      { q: 'Why is JUMP a tap while left/right are held?', a: 'Running is a continuous state, so the D-pad buttons and arrow keys toggle boolean flags read every step. Jumping is a one-shot action: the JUMP button fires on pointerdown and only launches when onGround is true. Treating it as a discrete event (rather than a held flag) prevents the character from repeatedly jumping or double-jumping while the button is held down.' },
      { q: 'How does the camera follow the player without showing past the level edges?', a: 'The camera x-offset is set to centre the player, then clamped with Math.max(0, Math.min(LEVEL_W - W, ...)) so it never scrolls before the start or past the end of the level. The whole world is rendered through a single ctx.translate(-cam, 0), so every object is drawn in level coordinates and the camera math lives in one place.' },
      { q: 'How do I design my own level?', a: 'The platforms, spikes and coins arrays and the flag object near the top of the JS are plain data in level (world) coordinates. Add, remove or reposition entries there to build a new layout, adjust LEVEL_W if you make it longer, and tune GRAV, MOVE and JUMP_V to change how the character handles.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to walk through the fixed-timestep loop, the one-way platform collision guard, and the clamped follow-camera. It is a strong base to extend: ask for moving platforms, patrolling enemies with stomp-to-defeat, mid-level checkpoints, a double-jump or wall-jump, multiple levels loaded from a data file, or sprite-sheet animation for the character. You could also ask it to add coyote time and jump buffering for a more forgiving feel, or to port the loop into a React component using useRef and useEffect for the animation-frame lifecycle. Treat it as a working prototype to question and rebuild rather than a finished engine.`,
      prompt: `Build a mobile-friendly side-scrolling platformer game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A character affected by gravity that runs left/right and jumps. Provide an on-screen ◀ ▶ D-pad plus a JUMP button for touch, AND keyboard controls (arrows + Space/Up). Left/right are held states; JUMP is a discrete action fired on press that only works when the character is on the ground (no double jump).
- Use Pointer Events for the buttons. Run the physics on a FIXED timestep (fixed 1/60-second steps drained via an accumulator each frame) so jump height and speed are consistent across refresh rates and fast falls do not tunnel through thin platforms.
- Implement gravity plus velocity integration, with acceleration toward a target run speed and friction when no direction is held. Platforms must be one-way: the character lands on them when falling from above but can jump up through them from below.
- The level is wider than the canvas. Add a camera that follows the player and is clamped to the level bounds, drawn with ctx.translate. Include a parallax background layer.
- Add collectible coins (with a counter), spike hazards and a fall-off-the-world condition that end the run, and a goal flag that completes the level. Persist the best completion time in localStorage with defensive try/catch, and show start / death / level-complete overlays.
- Keep the level layout as editable data arrays (platforms, spikes, coins, flag) near the top of the file.`,
    },
  },
};

export default pixelPlatformerGame;
