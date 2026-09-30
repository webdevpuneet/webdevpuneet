const dodgeTheBlocksGame = {
  id: 'dodge-the-blocks-game',
  title: 'Dodge the Falling Blocks Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🟪</span>
      <h2>Dodge the Blocks</h2>
    </div>
    <div class="best-badge">Best: <span id="best-score">0.0s</span></div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="480"></canvas>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Dodge the Blocks</p>
        <p class="overlay-sub">Move with ← → or A/D. Survive as long as you can — it gets faster.</p>
        <button class="btn btn-primary" id="btn-start">Start</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Game Over</p>
        <p class="overlay-sub" id="final-score">Survived 0.0s</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Try again</button>
      </div>
    </div>
    <div class="hud">
      <span id="hud-time">0.0s</span>
    </div>
  </div>

  <p class="hint-text">Arrow keys, A/D, or drag on touch devices to move left and right</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 20px; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.best-badge { font-size: 12px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 5px 10px; border-radius: 20px; }

.canvas-wrap { position: relative; margin-bottom: 12px; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; }
canvas { display: block; width: 100%; height: auto; background: #0f172a; }

.hud { position: absolute; top: 10px; right: 12px; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.4); }

.overlay {
  position: absolute; inset: 0;
  background: rgba(15,23,42,0.82);
  display: flex; align-items: center; justify-content: center;
  padding: 20px;
}
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 20px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; line-height: 1.5; max-width: 280px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin-bottom: 14px; min-height: 16px; }

.btn { padding: 11px 24px; font-size: 14px; font-weight: 700; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; margin-top: 12px; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const BEST_KEY = 'dodge-blocks-best-time';

const PLAYER_W = 44;
const PLAYER_H = 14;
const PLAYER_Y = H - 30;
const PLAYER_SPEED = 6;

let player = { x: W / 2 - PLAYER_W / 2 };
let blocks = [];
let running = false;
let startTime = 0;
let elapsed = 0;
let lastSpawn = 0;
let spawnInterval = 1100;
let fallSpeed = 2.2;
let rafId = null;
let keys = { left: false, right: false };
let dragX = null;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudTime = document.getElementById('hud-time');
const finalScoreEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');
const bestScoreEl = document.getElementById('best-score');

function getBest() {
  try {
    return parseFloat(localStorage.getItem(BEST_KEY)) || 0;
  } catch (e) {
    return 0;
  }
}

function setBest(v) {
  try {
    localStorage.setItem(BEST_KEY, String(v));
  } catch (e) { /* ignore */ }
}

function resetState() {
  player.x = W / 2 - PLAYER_W / 2;
  blocks = [];
  elapsed = 0;
  lastSpawn = 0;
  spawnInterval = 1100;
  fallSpeed = 2.2;
}

function spawnBlock() {
  const width = 28 + Math.random() * 56;
  const x = Math.random() * (W - width);
  blocks.push({ x, y: -20, width, height: 18 });
}

function rectsOverlap(a, b) {
  return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function update(dt) {
  elapsed += dt;

  // Difficulty ramps up over time: faster fall speed and more frequent spawns
  fallSpeed = 2.2 + elapsed * 0.09;
  spawnInterval = Math.max(1100 - elapsed * 22, 320);

  lastSpawn += dt * 1000;
  if (lastSpawn >= spawnInterval) {
    spawnBlock();
    lastSpawn = 0;
  }

  if (keys.left) player.x -= PLAYER_SPEED;
  if (keys.right) player.x += PLAYER_SPEED;
  if (dragX !== null) player.x = dragX - PLAYER_W / 2;
  player.x = Math.max(0, Math.min(W - PLAYER_W, player.x));

  const playerRect = { x: player.x, y: PLAYER_Y, width: PLAYER_W, height: PLAYER_H };

  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i];
    b.y += fallSpeed * (dt * 60);
    if (rectsOverlap(playerRect, b)) {
      endGame();
      return;
    }
    if (b.y > H) blocks.splice(i, 1);
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, W, H);

  ctx.fillStyle = '#f87171';
  blocks.forEach(b => {
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(b.x, b.y, b.width, b.height, 4);
    else ctx.rect(b.x, b.y, b.width, b.height);
    ctx.fill();
  });

  ctx.fillStyle = '#6366f1';
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(player.x, PLAYER_Y, PLAYER_W, PLAYER_H, 6);
  else ctx.rect(player.x, PLAYER_Y, PLAYER_W, PLAYER_H);
  ctx.fill();

  hudTime.textContent = elapsed.toFixed(1) + 's';
}

let lastFrame = 0;
function loop(ts) {
  if (!running) return;
  if (!lastFrame) lastFrame = ts;
  const dt = Math.min((ts - lastFrame) / 1000, 0.05);
  lastFrame = ts;
  update(dt);
  if (running) {
    draw();
    rafId = requestAnimationFrame(loop);
  }
}

function startGame() {
  resetState();
  running = true;
  lastFrame = 0;
  startOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  running = false;
  cancelAnimationFrame(rafId);
  draw();
  const best = getBest();
  finalScoreEl.textContent = 'Survived ' + elapsed.toFixed(1) + 's';
  if (elapsed > best) {
    setBest(elapsed);
    bestScoreEl.textContent = elapsed.toFixed(1) + 's';
    bestMsgEl.textContent = '🏆 New best time!';
  } else {
    bestMsgEl.textContent = '';
  }
  gameoverOverlay.classList.remove('hidden');
}

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = true;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = true;
});
document.addEventListener('keyup', e => {
  if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') keys.left = false;
  if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') keys.right = false;
});

function pointerToCanvasX(clientX) {
  const rect = canvas.getBoundingClientRect();
  return ((clientX - rect.left) / rect.width) * W;
}

canvas.addEventListener('pointerdown', e => {
  dragX = pointerToCanvasX(e.clientX);
});
canvas.addEventListener('pointermove', e => {
  if (e.buttons > 0 || e.pointerType === 'touch') dragX = pointerToCanvasX(e.clientX);
});
canvas.addEventListener('pointerup', () => { dragX = null; });
canvas.addEventListener('pointerleave', () => { dragX = null; });

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestScoreEl.textContent = getBest().toFixed(1) + 's';
draw();`,

  seo: {
    title: 'Dodge the Falling Blocks Game — Free HTML CSS JS Snippet',
    description: 'A canvas survival game with ramping difficulty, AABB collision and a localStorage best time. Exports to React, Vue, Angular & Tailwind snippets.',
    about: {
      title: 'Dodge the Falling Blocks Game — Canvas Survival Game with AABB Collision and Ramping Difficulty',
      description: `Falling-object survival games are a compact, satisfying test of a canvas rendering loop because every core game-programming concept fits in a small surface area: continuous animation, real-time collision detection, and a difficulty curve that keeps the player engaged. This snippet builds a complete version using the HTML5 \`<canvas>\` API and \`requestAnimationFrame\` — a player rectangle confined to the bottom of the play field dodges randomly spawning blocks that fall from the top, with genuine axis-aligned bounding box (AABB) collision detection and a difficulty curve that ramps up the longer the run continues.

**The game loop and frame-independent movement**

The core loop is driven by \`requestAnimationFrame\`, calling \`loop(ts)\` on every repaint. Rather than moving objects by a fixed number of pixels per frame — which would make the game run faster or slower depending on the player's display refresh rate — the loop computes \`dt\`, the elapsed time in seconds since the previous frame, and clamps it to a maximum of 50ms to avoid physics glitches after a tab was backgrounded and resumed. Every movement calculation (block falling, difficulty ramp) is scaled by \`dt\`, making the game's speed consistent across 60Hz, 120Hz, or throttled displays — a standard technique for frame-independent motion.

**Spawning and AABB collision detection**

\`spawnBlock()\` creates a new falling block with a random width (between 28 and 84 pixels) and a random horizontal position clamped so the block never spawns partially off-canvas, added to a \`blocks\` array. Collision detection uses the classic **axis-aligned bounding box** test in \`rectsOverlap()\`: two rectangles overlap if and only if each one's horizontal range intersects the other's horizontal range *and* their vertical ranges also intersect — expressed as \`a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y\`. This is checked between the player's rectangle and every active block on every frame; any true result immediately ends the run. Blocks that fall past the bottom of the canvas without hitting the player are removed from the array to keep the collision check cheap regardless of how long the run lasts.

**Genuine difficulty ramping**

Both variables that control challenge are explicit, continuous functions of \`elapsed\` (seconds survived), not fixed constants or step changes. \`fallSpeed = 2.2 + elapsed * 0.09\` means blocks fall measurably faster every second that passes. \`spawnInterval = Math.max(1100 - elapsed * 22, 320)\` means new blocks appear more frequently over time, shrinking the gap between spawns from 1.1 seconds down to a floor of 320 milliseconds so the game never becomes literally impossible to react to. Together these two curves mean the last thirty seconds of a long run are meaningfully denser and faster than the opening seconds — the difficulty is felt, not just theoretical.

**Input: keyboard and touch in one code path**

Movement responds to \`ArrowLeft\`/\`ArrowRight\` and \`A\`/\`D\` via \`keydown\`/\`keyup\` listeners that toggle a \`keys\` state object, read once per frame in \`update()\` — this avoids the classic bug of moving the player directly inside the event handler, which can feel jerky and framerate-dependent. For touch and mouse-drag input, the Pointer Events API (\`pointerdown\`/\`pointermove\`/\`pointerup\`) tracks a \`dragX\` value converted from screen coordinates to canvas coordinates via \`pointerToCanvasX()\`, which accounts for the canvas's actual rendered size versus its internal pixel resolution using \`getBoundingClientRect()\`. When \`dragX\` is set, it directly overrides keyboard movement for that frame, so the same player object works identically whether driven by keys or a finger.

**Persisting the best survival time**

\`getBest()\` and \`setBest()\` wrap \`localStorage\` access in try/catch for defensiveness, storing the longest survival time in seconds under \`dodge-blocks-best-time\`. \`endGame()\` compares the current run's \`elapsed\` value against the stored best and, if it's a new record, updates \`localStorage\` and displays a "New best time!" message alongside the always-visible best-score badge in the header.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Start the run',
          text: 'Click "Start" on the opening overlay to call startGame(), which resets all state via resetState() and kicks off the requestAnimationFrame loop. The indigo player rectangle appears at the bottom-centre of the canvas.',
        },
        {
          title: 'Move to avoid falling blocks',
          text: 'Use ArrowLeft/ArrowRight or A/D to move the player horizontally — held keys are tracked in the keys object and applied every frame in update(). On touch devices, drag anywhere on the canvas; pointerToCanvasX() converts your finger position directly into the player\'s target X coordinate.',
        },
        {
          title: 'Survive as long as possible',
          text: 'Red blocks of random width spawn at the top at an interval controlled by spawnInterval and fall at a speed controlled by fallSpeed — both increase continuously as elapsed time (shown in the top-right HUD) grows, via fallSpeed = 2.2 + elapsed * 0.09 and a shrinking spawnInterval floor of 320ms.',
        },
        {
          title: 'Understand what ends the run',
          text: 'Every frame, rectsOverlap() checks the player\'s bounding box against every active block using real AABB (axis-aligned bounding box) intersection math. Any overlap immediately calls endGame(), stopping the animation loop and showing the Game Over overlay with your survival time.',
        },
        {
          title: 'Beat your persisted best time',
          text: 'Your longest survival time is stored in localStorage under the key dodge-blocks-best-time and shown in the header badge at all times. Beating it on Game Over triggers a "New best time!" message and updates the stored value immediately.',
        },
        {
          title: 'Retry or tune the difficulty curve',
          text: 'Click "Try again" to call startGame() again with a freshly reset block array and difficulty curve. To make the game harder or easier overall, adjust the constants in update(): the 0.09 multiplier on fallSpeed and the 22 multiplier and 320 floor on spawnInterval.',
        },
      ],
    },
    features: [
      'requestAnimationFrame game loop with delta-time (dt) scaling for frame-rate-independent movement',
      'Real AABB (axis-aligned bounding box) collision detection between the player rectangle and every active falling block',
      'Continuous difficulty ramp: fall speed and spawn frequency both increase as a function of elapsed survival time, not fixed steps',
      'Unified keyboard (Arrow keys / A-D) and Pointer Events (mouse drag / touch drag) input driving the same player position',
      'Canvas coordinate conversion via getBoundingClientRect() so touch/drag input works correctly at any rendered canvas size',
      'ctx.roundRect() rounded-corner rendering with a rect() fallback for older browser engines',
      'Persisted best survival time via localStorage with defensive try/catch guards',
      'Clean start/game-over overlay states layered above the canvas without pausing the underlying render pipeline',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Reflex and reaction-time casual game for entertainment sites',
        desc: 'Falling-object dodge games are a proven, low-friction casual game format — the entire ruleset is learnable in under five seconds of watching. Embed this on a games portal, blog sidebar, or app store landing page as an instantly playable demo that needs no tutorial, account, or download.',
      },
      {
        icon: 'APP',
        title: 'Mobile-friendly touch-drag interaction showcase',
        desc: 'The Pointer Events-based drag control demonstrates a smooth, responsive touch interaction pattern suitable for any mobile web game or interactive product demo. Because pointerdown/pointermove/pointerup unify mouse and touch handling in one code path, this same input logic scales cleanly to a full mobile game without a separate touch implementation.',
      },
      {
        icon: 'FLOW',
        title: 'Loading screen or 404-page interactive distraction',
        desc: 'A self-contained canvas game with no assets to load and no network dependency starts instantly, making it well suited to an empty-state screen, a slow-loading page, or an error page — similar in purpose to the [Maze Runner Arrow-Key Game](/ui-snippets/maze-runner-game) as an engaging alternative to a static spinner or illustration.',
      },
      {
        icon: 'DESIGN',
        title: 'Teaching canvas rendering, overlay UI, and HUD design patterns',
        desc: 'The layered structure — a full-bleed dark canvas, an absolutely positioned semi-transparent overlay for start/game-over states, and a small always-visible HUD in the corner — is a directly reusable pattern for any canvas-based interactive experience, from games to data visualisations that need a "loading" or "no data" overlay state.',
      },
      {
        icon: 'LEARN',
        title: 'Learn frame-independent motion and AABB collision from scratch',
        desc: 'This snippet is a compact, readable reference for two foundational game-programming concepts: scaling movement by delta-time so gameplay speed is consistent regardless of frame rate, and axis-aligned bounding box collision detection, which underlies collision systems in countless 2D games before any physics engine is introduced.',
      },
      {
        icon: 'CODE',
        title: 'Starting point for a richer arcade-style browser game',
        desc: 'The core loop, spawn system, and difficulty curve generalise well — swap falling rectangles for sprite images, add power-ups that temporarily slow fallSpeed, introduce a shield or extra-life mechanic, or add a horizontal-scrolling parallax background. The AABB collision and dt-scaled update loop remain valid regardless of what visual complexity is layered on top.',
      },
      { icon: 'CODE', title: 'Related: Color Match Reflex Game', desc: 'See the [Color Match Reflex Game](/ui-snippets/color-match-reflex-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dot Muncher Maze Game', desc: 'See the [Dot Muncher Maze Game](/ui-snippets/dot-muncher-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does the game use delta-time instead of moving objects a fixed amount per frame?',
        a: 'Browsers call requestAnimationFrame at a rate tied to the display\'s refresh rate — 60 times per second on most monitors, but up to 120 or more on high-refresh-rate displays, and potentially lower if the tab is throttled. Moving blocks by a fixed pixel amount per frame would make the game run visibly faster on a 120Hz display than a 60Hz one. Scaling every movement by dt (seconds elapsed since the last frame) keeps fall speed and spawn timing consistent in real time regardless of how many frames per second the browser is actually rendering.',
      },
      {
        q: 'How does the AABB collision check actually work?',
        a: 'Two axis-aligned rectangles overlap only if both their horizontal ranges intersect and their vertical ranges intersect simultaneously. rectsOverlap() checks a.x < b.x + b.width (rectangle a starts before b ends) and a.x + a.width > b.x (a ends after b starts) for the horizontal axis, then repeats the same pattern for y and height on the vertical axis. If all four conditions are true, the rectangles are guaranteed to overlap on both axes at once, meaning they visually intersect. This is one of the cheapest and most common collision tests in 2D game development because it only requires four comparisons.',
      },
      {
        q: 'How do I make the difficulty ramp faster or slower?',
        a: 'Both difficulty curves live inside update(): fallSpeed = 2.2 + elapsed * 0.09 controls how quickly blocks fall, and spawnInterval = Math.max(1100 - elapsed * 22, 320) controls how often new blocks appear. Increase the 0.09 multiplier for a steeper speed ramp, increase the 22 multiplier for spawns to tighten up faster, or raise the 320 floor to keep a minimum breathing room between spawns even at very high elapsed times.',
      },
      {
        q: 'Does the best score reset if I close the browser?',
        a: 'No — the best survival time is stored under the localStorage key dodge-blocks-best-time, which persists across page reloads and browser restarts on the same browser and origin. It only resets if the user clears site data, switches browsers or devices, or plays in a private/incognito window, since localStorage does not sync across those contexts without a backend.',
      },
      {
        q: 'Why use canvas instead of DOM elements for the falling blocks?',
        a: 'Canvas is well suited to this kind of game because dozens of blocks can be moving and being collision-checked every frame; redrawing a bitmap surface with ctx.clearRect() and re-filling rectangles is typically cheaper than creating, animating, and destroying many individual DOM nodes with CSS transforms at 60fps. Canvas also makes it straightforward to add visual effects later (particle trails, screen shake, gradients) without touching the DOM tree at all.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the requestAnimationFrame loop, the dt-scaled fallSpeed/spawnInterval difficulty curve, and the rectsOverlap() AABB check work together each frame. It's a strong base to extend — ask the assistant to add a brief invincibility window after a near-miss, introduce power-up blocks (a different colour) that grant a temporary shield or slow-motion effect when collected instead of ending the run, add a particle-burst effect on collision using canvas, or refactor the single blocks array into an object pool to reduce garbage collection pressure during very long runs. You could also ask it to review the touch-drag pointer handling for edge cases on multi-touch devices, or to help port the canvas loop into a React component using useRef and useEffect for the animation frame lifecycle instead of top-level DOM code. Treat it as a working prototype to question and rebuild, not a finished black box.`,
      prompt: `Build a canvas-based falling-block dodge survival game in plain HTML, CSS, and JavaScript with ramping difficulty — no frameworks or libraries.

Requirements:
- A player rectangle confined horizontally within the bottom of a canvas, controllable via Arrow keys or A/D on keyboard, and via mouse drag or touch drag directly on the canvas (both input methods must move the same player state, not conflict).
- Blocks of random width spawn at random horizontal positions at the top of the canvas at a timed interval and fall downward at a constant-per-frame but continuously increasing speed.
- Use requestAnimationFrame for the game loop, and scale all per-frame movement by delta-time (elapsed seconds since the last frame) so gameplay speed stays consistent regardless of the display's actual frame rate.
- Implement real axis-aligned bounding box (AABB) collision detection between the player rectangle and every currently-falling block rectangle on every frame; colliding with any block must immediately end the run.
- Make the difficulty genuinely ramp over time: both the falling speed of blocks and the frequency at which new blocks spawn must increase continuously as a function of elapsed survival time, so the game is meaningfully harder in the later stages of a long run than at the very start (with a sensible minimum floor on spawn interval so it never becomes literally unplayable).
- Track elapsed survival time as the score, shown live during play, and show a Game Over screen with the final survival time when a collision occurs, plus a "Try again" button that fully resets the run.
- Persist the best (longest) survival time across page reloads using localStorage, guarded defensively in case storage access throws, and always display it in the UI.`,
    },
  },
};

export default dodgeTheBlocksGame;
