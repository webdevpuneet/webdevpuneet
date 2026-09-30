const skyHopperGame = {
  id: 'sky-hopper-game',
  title: 'Sky Hopper Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🦘</span>
      <h2>Sky Hopper</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="320" height="460"></canvas>
    <div class="hud"><span id="hud-score">0</span></div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Sky Hopper</p>
        <p class="overlay-sub">Hold ◀ ▶ to steer. You bounce automatically — climb as high as you can. Off one side, back on the other.</p>
        <button class="btn btn-primary" id="btn-start">Hop</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">You Fell!</p>
        <p class="overlay-sub" id="final-score">Height 0</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Hop again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="ctrl-btn" id="btn-left" aria-label="Move left">◀</button>
    <button class="ctrl-btn" id="btn-right" aria-label="Move right">▶</button>
  </div>

  <p class="hint-text">Keyboard: ← → to steer (you jump on your own)</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #eff6ff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 360px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #2563eb; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #dbeafe; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; top: 8px; left: 12px; font-size: 15px; font-weight: 800; color: #1e3a8a; font-variant-numeric: tabular-nums; pointer-events: none; }

.overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.82); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #2563eb; color: #fff; }
.btn-primary:hover { background: #1d4ed8; }

.controls { display: flex; align-items: center; justify-content: center; gap: 60px; margin-top: 14px; }
.ctrl-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; width: 84px; height: 64px; border-radius: 16px; background: #f8fafc; color: #334155; font-size: 24px; font-weight: 700; box-shadow: 0 3px 0 #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn:active { transform: translateY(3px); box-shadow: none; background: #dbeafe; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'sky-hopper-best';

const GRAV = 0.28, MOVE = 4.2, JUMP_V = -10.4, SPRING_V = -16;
const PLAYER_W = 30, PLAYER_H = 30;
const PLAT_W = 62, PLAT_H = 12, GAP = 72;

let player, platforms, cam, score, running, rafId, lastFrame, highestY;
let keys = { left: false, right: false };

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function makePlatform(y, forceStatic) {
  const x = Math.random() * (W - PLAT_W);
  let type = 'normal';
  if (!forceStatic) {
    const r = Math.random();
    if (r < 0.14) type = 'break';        // collapses after one bounce
    else if (r < 0.30) type = 'move';     // slides side to side
    else if (r < 0.40) type = 'spring';   // super-bounce
  }
  return { x, y, type, vx: type === 'move' ? (Math.random() < 0.5 ? 1.3 : -1.3) : 0, used: false, spring: type === 'spring' };
}

function resetState() {
  platforms = [];
  // Start with a solid platform under the player, then a stack going up
  platforms.push({ x: W / 2 - PLAT_W / 2, y: H - 40, type: 'normal', vx: 0, used: false, spring: false });
  for (let i = 1; i < 10; i++) platforms.push(makePlatform(H - 40 - i * GAP, i < 3));
  player = { x: W / 2 - PLAYER_W / 2, y: H - 80, vy: JUMP_V, face: 1 };
  cam = 0; score = 0; highestY = player.y;
  hudScore.textContent = '0';
}

function update() {
  // Horizontal from held buttons, with screen wrap
  let vx = 0;
  if (keys.left) { vx = -MOVE; player.face = -1; }
  if (keys.right) { vx = MOVE; player.face = 1; }
  player.x += vx;
  if (player.x + PLAYER_W < 0) player.x = W;
  if (player.x > W) player.x = -PLAYER_W;

  // Gravity
  player.vy += GRAV;
  player.y += player.vy;

  // Moving platforms drift and bounce off walls
  platforms.forEach(p => {
    if (p.type === 'move') { p.x += p.vx; if (p.x < 0 || p.x + PLAT_W > W) p.vx *= -1; }
  });

  // Land only while falling and feet cross the platform top
  if (player.vy > 0) {
    for (const p of platforms) {
      if (p.dead) continue;
      const feet = player.y + PLAYER_H;
      if (player.x + PLAYER_W > p.x + 4 && player.x < p.x + PLAT_W - 4 &&
          feet > p.y && feet < p.y + PLAT_H + player.vy) {
        player.vy = p.spring ? SPRING_V : JUMP_V;
        if (p.type === 'break') p.dead = true;   // give way after the bounce
        break;
      }
    }
  }

  // Camera scrolls up when the player climbs past the middle line
  const line = H * 0.42;
  if (player.y < cam + line) {
    const dy = (cam + line) - player.y;
    cam -= dy;
  }
  // Score is how high above the start you have climbed
  const climbed = Math.max(0, Math.floor((H - 80 - (player.y)) / 10) + Math.floor(-cam / 10));
  if (climbed > score) { score = climbed; hudScore.textContent = score; }

  // Recycle platforms that scrolled below the view; spawn new ones on top
  const topMost = platforms.reduce((m, p) => Math.min(m, p.y), Infinity);
  platforms = platforms.filter(p => p.y < cam + H + 20);
  while (platforms.length < 11) {
    const y = Math.min(topMost, platforms.reduce((m, p) => Math.min(m, p.y), Infinity)) - GAP;
    platforms.push(makePlatform(y, false));
  }

  // Fall off the bottom of the view = game over
  if (player.y > cam + H + 10) endGame();
}

function draw() {
  // Sky gradient that lightens as you climb
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#bfdbfe'); g.addColorStop(1, '#dbeafe');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

  ctx.save();
  ctx.translate(0, -cam);

  platforms.forEach(p => {
    if (p.dead) return;
    let col = '#22c55e';
    if (p.type === 'break') col = '#f59e0b';
    else if (p.type === 'move') col = '#38bdf8';
    else if (p.type === 'spring') col = '#a855f7';
    ctx.fillStyle = col;
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(p.x, p.y, PLAT_W, PLAT_H, 6); else ctx.rect(p.x, p.y, PLAT_W, PLAT_H);
    ctx.fill();
    if (p.type === 'spring') { ctx.fillStyle = '#581c87'; ctx.fillRect(p.x + PLAT_W / 2 - 8, p.y - 6, 16, 6); }
  });

  // Player
  const y = player.y;
  ctx.fillStyle = '#2563eb';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(player.x, y, PLAYER_W, PLAYER_H, 8); else ctx.rect(player.x, y, PLAYER_W, PLAYER_H);
  ctx.fill();
  // eyes look in travel direction
  ctx.fillStyle = '#fff';
  const ex = player.face > 0 ? player.x + PLAYER_W - 12 : player.x + 6;
  ctx.fillRect(ex, y + 8, 6, 6); ctx.fillRect(ex + (player.face > 0 ? -8 : 8), y + 8, 6, 6);

  ctx.restore();

  hudScore.textContent = score;
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
  finalEl.textContent = 'Height ' + score;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New best height!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard ──
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = true;
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd') keys.right = false;
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

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Sky Hopper Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly Doodle-Jump-style vertical platform climber with two hold-to-steer buttons, automatic bouncing, a scrolling camera, breakable/moving/spring platforms and a localStorage best height. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Sky Hopper — Auto-Bounce Physics, a Scrolling Camera and Recycled Platforms',
      description: `A vertical platform-hopper is the purest possible action game: the character bounces on its own, so the *entire* input surface is left and right. That makes it an ideal demonstration of a two-button touch game, and of the two systems that make an "endless climb" work — a camera that scrolls with the player and a platform pool that recycles as you rise. This snippet builds the whole thing on one HTML5 \`<canvas>\`: hold ◀ or ▶ to steer, and the hopper bounces automatically off every platform it lands on, climbing forever through normal, breakable, moving and spring platforms.

**Automatic bouncing, with a one-way landing test**

The player is always under gravity, so \`vy\` grows each step and the character falls until it meets a platform. The landing test only fires *while falling* (\`vy > 0\`) and only when the character's feet cross the platform's top surface between this frame and the next — the same one-way collision idea as a platformer, which lets the hopper rise straight up through a platform and only bounce when coming down onto it. A bounce simply sets \`vy\` to a fixed upward velocity, so the character launches to a consistent height every time without any jump button at all. Spring platforms set a much larger upward velocity for a super-bounce.

**A camera that only scrolls up**

The camera tracks the player's height but is deliberately one-directional: when the hopper climbs above a line at 42% of the canvas height, the camera moves up to keep it there; when the hopper falls, the camera stays put. That asymmetry is what turns a bounce into *progress* — you never scroll back down, so falling below the bottom of the view means you missed a platform and the run ends. The whole world is drawn through a single \`ctx.translate(0, -cam)\`, so every platform is stored in world coordinates and the camera math lives in one place.

**A recycling platform pool**

An endless climb can't keep every platform ever generated. Each step, platforms that have scrolled below the view are filtered out, and new ones are spawned above the current topmost platform at a fixed vertical gap until the pool is refilled — so there is always a ladder of platforms ahead and a bounded number in memory. \`makePlatform()\` rolls a type on spawn: mostly normal, with a chance of a *breakable* platform that gives way after one bounce, a *moving* platform that slides side to side and reverses at the walls, or a *spring* platform. Horizontal movement wraps around the screen edges, so steering off one side brings you back on the other.

**Scoring and persistence**

The score is how high you've climbed, shown live, and the best height persists to \`localStorage\`. The simulation runs on a fixed 1/60-second timestep so the bounce height and fall speed are identical across refresh rates.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start hopping', text: 'Tap "Hop" to call startGame(), which builds a starting stack of platforms, drops the hopper onto the solid one at the bottom, and starts the fixed-timestep loop. The character bounces on its own from the first frame.' },
        { title: 'Steer with two buttons', text: 'Hold ◀ or ▶ (or the Left/Right arrow keys / A and D) to move horizontally. There is no jump button — the hopper bounces automatically whenever it lands on a platform. Steering off one side of the screen wraps you to the other.' },
        { title: 'Aim for the next platform', text: 'Because you only bounce when you land, steering is about lining up the next platform above you while you are in the air. Miss them all and you fall past the bottom of the view.' },
        { title: 'Learn the platform types', text: 'Green platforms are normal. Amber ones break and give way after a single bounce, so do not linger. Blue ones slide side to side. Purple spring platforms launch you much higher — use them to skip a gap.' },
        { title: 'Climb as high as you can', text: 'The camera only ever scrolls up, so every bounce is progress and there is no going back down. Your height is the score, shown top-left; the best persists in localStorage under sky-hopper-best.' },
        { title: 'Tune the feel', text: 'Adjust GRAV, JUMP_V and SPRING_V for bounce feel, GAP for platform spacing, and the probabilities in makePlatform() to change how often special platforms appear.' },
      ],
    },
    features: [
      'Two hold-to-steer buttons (Pointer Events) plus keyboard fallback — no jump button, the character bounces automatically',
      'Gravity with a one-way landing test so the hopper rises through platforms and bounces only when falling onto them',
      'A one-directional scrolling camera that turns every bounce into permanent upward progress',
      'A recycling platform pool: off-screen platforms are removed and new ones spawned above, keeping memory bounded',
      'Four platform types — normal, breakable (gives way after one bounce), moving (slides and reverses), and spring (super-bounce)',
      'Horizontal screen wrapping so steering off one edge returns you on the other',
      'Height-based live scoring and a persisted best via localStorage with defensive try/catch',
      'Fixed 1/60s timestep for frame-rate-independent bounce height and fall speed',
    ],
    useCases: [
      { icon: 'APP', title: 'Two-button touch game template', desc: 'The steer-only control scheme with automatic bouncing is the minimal touch game — a reusable template for any one-axis mobile game where the vertical motion is automatic.' },
      { icon: 'LEARN', title: 'Teaching scrolling cameras and object pooling', desc: 'A one-directional follow camera and a recycling platform pool are the two systems behind every endless climber or runner, shown here in compact, readable form.' },
      { icon: 'CODE', title: 'Starting point for a fuller climber', desc: 'The platform pool and camera generalise to enemies, collectible jetpacks or springs, shooting downward, or themed biomes as you ascend, without touching the fixed-step loop.' },
      { icon: 'FORM', title: 'Instantly playable casual game', desc: 'A one-more-try vertical hopper is learnable in seconds — a strong embeddable demo for a games portal, blog, or app landing page with no sign-up.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it starts instantly as an interactive distraction on an error or loading screen, like the [Lane Runner Endless Game](/ui-snippets/lane-runner-game).' },
      { icon: 'DESIGN', title: 'Canvas camera-translate reference', desc: 'The single ctx.translate(0, -cam) camera with world-coordinate objects and a lightening sky gradient is a directly reusable pattern for any vertically scrolling canvas scene.' },
      { icon: 'CODE', title: 'Related: Terminal Command Game', desc: 'See the [Terminal Command Game](/ui-snippets/terminal-command-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is there no jump button?', a: 'In a vertical hopper the jump is automatic: the character is always under gravity and bounces to a fixed upward velocity every time it lands on a platform. That reduces the entire control surface to horizontal steering, which is why the game needs only two buttons. It is a deliberate design choice that makes the game trivially playable with one thumb on a phone.' },
      { q: 'How does the character bounce on a platform but pass up through it?', a: 'The landing test only runs while the character is falling (vy > 0) and only when its feet cross the top edge of the platform between the current frame and the next. When rising, vy is negative so the test is skipped and the character moves straight up through the platform; on the way down the test becomes true and it bounces. This is the same one-way collision technique used in side-scrolling platformers.' },
      { q: 'Why does the view never scroll back down?', a: 'The camera is one-directional on purpose: it moves up when the player climbs above a line partway up the screen, but it never moves down when the player falls. That asymmetry is what makes every bounce count as progress and creates the fail condition — if you miss the platforms and drop below the bottom of the current view, the run ends because there is nothing to scroll back to.' },
      { q: 'Does the game keep every platform in memory as I climb?', a: 'No. Each step, platforms that have scrolled below the visible area are removed from the array, and new ones are generated above the current highest platform until the pool is refilled to a fixed size. This object-pooling approach keeps a constant, small number of platforms in memory no matter how high you climb, which is essential for an endless game.' },
      { q: 'Does my best height persist across reloads?', a: 'Yes. The best height is stored in localStorage under sky-hopper-best and read on load, so it survives reloads and browser restarts on the same browser and origin. The read and write are wrapped in try/catch so the game still runs in sandboxed or private contexts where storage access can throw.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the automatic-bounce landing test, the one-directional follow camera, and the recycling platform pool that keeps memory bounded. It is a strong base to extend: ask for a jetpack or propeller-hat power-up that carries you up a screen, enemies you must steer around or land on, breakable platforms that crumble in stages, a shooting mechanic aimed downward, or themed biomes that change as your height increases. You could also ask it to add device-tilt steering via the DeviceOrientation API as an alternative to the buttons, or to port the loop into a React component with useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly Doodle-Jump-style vertical platform climber on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A character permanently under gravity that bounces automatically to a fixed upward velocity whenever it lands on a platform — there is NO jump button. The only controls are steer-left and steer-right: provide two on-screen hold buttons for touch AND keyboard arrows, both driving one shared input state. Wrap horizontal movement around the screen edges.
- The landing test must only fire while the character is falling and only when its feet cross a platform's top edge, so the character rises up through platforms and bounces only when coming down onto them.
- Add a one-directional camera that scrolls up when the player climbs above a line partway up the screen but never scrolls back down, drawn with ctx.translate. Falling below the bottom of the view ends the run.
- Use a recycling platform pool: remove platforms that scroll below the view and spawn new ones above the current highest platform at a fixed vertical gap, keeping a bounded number in memory. Include platform types: normal, breakable (gives way after one bounce), moving (slides side to side and reverses at walls), and spring (much larger bounce).
- Run the simulation on a fixed 1/60-second timestep so bounce height and fall speed are frame-rate-independent. Score by height climbed, shown live, and persist the best in localStorage with defensive try/catch. Show start and game-over overlays.`,
    },
  },
};

export default skyHopperGame;
