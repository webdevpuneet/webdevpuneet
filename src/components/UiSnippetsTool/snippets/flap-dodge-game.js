const flapDodgeGame = {
  id: 'flap-dodge-game',
  title: 'Flap & Dodge Obstacle Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="fd-wrap">
  <div class="fd-stage">
    <canvas id="fd-canvas" width="360" height="520"></canvas>
    <div class="fd-hud">
      <span id="fd-score">0</span>
    </div>
    <div class="fd-screen fd-start-screen" id="start-screen">
      <p class="fd-logo">Flap &amp; Dodge</p>
      <p class="fd-sub">Tap, click, or press Space to flap</p>
      <button class="fd-btn" id="start-btn">Start</button>
      <p class="fd-best">Best: <span id="start-best">0</span></p>
    </div>
    <div class="fd-screen fd-over-screen" id="over-screen">
      <p class="fd-logo">Game Over</p>
      <p class="fd-final-score">Score: <span id="final-score">0</span></p>
      <p class="fd-best">Best: <span id="over-best">0</span></p>
      <button class="fd-btn" id="retry-btn">Try Again</button>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.fd-wrap { display: flex; align-items: center; justify-content: center; }

.fd-stage {
  position: relative;
  width: 360px; height: 520px;
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
  cursor: pointer;
}

#fd-canvas { display: block; width: 100%; height: 100%; background: #7dd3fc; }

.fd-hud {
  position: absolute; top: 16px; left: 0; right: 0;
  text-align: center; pointer-events: none;
}
#fd-score {
  font-size: 42px; font-weight: 800; color: #fff;
  text-shadow: 0 2px 0 rgba(0,0,0,0.25);
  font-family: 'Courier New', monospace;
}

.fd-screen {
  position: absolute; inset: 0;
  background: rgba(15,23,42,0.72);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 10px;
  opacity: 0; pointer-events: none; transition: opacity 0.2s;
}
.fd-screen.show { opacity: 1; pointer-events: all; }

.fd-logo { font-size: 26px; font-weight: 800; color: #fff; }
.fd-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 6px; }
.fd-final-score { font-size: 18px; font-weight: 700; color: #f1f5f9; }
.fd-best { font-size: 12px; color: #94a3b8; margin-top: 2px; }

.fd-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  padding: 10px 26px; font-size: 14px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s, transform 0.1s;
  margin-top: 4px;
}
.fd-btn:hover { background: #4f46e5; }
.fd-btn:active { transform: scale(0.96); }`,

  js: `const canvas = document.getElementById('fd-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'flap-dodge-best';

const startScreen = document.getElementById('start-screen');
const overScreen = document.getElementById('over-screen');
const scoreEl = document.getElementById('fd-score');
const finalScoreEl = document.getElementById('final-score');
const startBestEl = document.getElementById('start-best');
const overBestEl = document.getElementById('over-best');
const stage = document.querySelector('.fd-stage');

let best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0;
startBestEl.textContent = best;
overBestEl.textContent = best;

const GRAVITY = 1400;        // px/s^2
const FLAP_VELOCITY = -420;  // px/s
const PIPE_SPEED = 150;      // px/s
const PIPE_GAP = 150;        // px
const PIPE_WIDTH = 58;
const PIPE_INTERVAL = 1.5;   // seconds between pipe pairs
const BIRD_RADIUS = 14;
const BIRD_X = 90;

let state = 'idle'; // idle | playing | over
let bird = { y: H / 2, vy: 0 };
let pipes = [];
let score = 0;
let timeSincePipe = 0;
let lastTime = 0;
let rafId = null;

function resetGame() {
  bird = { y: H / 2, vy: 0 };
  pipes = [];
  score = 0;
  timeSincePipe = 0;
  scoreEl.textContent = '0';
}

function startGame() {
  resetGame();
  state = 'playing';
  startScreen.classList.remove('show');
  overScreen.classList.remove('show');
  lastTime = performance.now();
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  state = 'over';
  cancelAnimationFrame(rafId);
  if (score > best) {
    best = score;
    localStorage.setItem(BEST_KEY, String(best));
  }
  finalScoreEl.textContent = score;
  overBestEl.textContent = best;
  overScreen.classList.add('show');
}

function flap() {
  if (state === 'idle') { startGame(); return; }
  if (state === 'over') return;
  bird.vy = FLAP_VELOCITY;
}

function spawnPipe() {
  const margin = 60;
  const gapCenter = margin + Math.random() * (H - margin * 2);
  pipes.push({
    x: W + PIPE_WIDTH,
    gapCenter,
    passed: false,
  });
}

function update(dt) {
  bird.vy += GRAVITY * dt;
  bird.y += bird.vy * dt;

  timeSincePipe += dt;
  if (timeSincePipe >= PIPE_INTERVAL) {
    timeSincePipe = 0;
    spawnPipe();
  }

  for (const pipe of pipes) {
    pipe.x -= PIPE_SPEED * dt;
    if (!pipe.passed && pipe.x + PIPE_WIDTH < BIRD_X - BIRD_RADIUS) {
      pipe.passed = true;
      score++;
      scoreEl.textContent = score;
    }
  }
  pipes = pipes.filter(p => p.x > -PIPE_WIDTH);

  // Collisions: ground / ceiling
  if (bird.y - BIRD_RADIUS < 0 || bird.y + BIRD_RADIUS > H) {
    endGame();
    return;
  }

  // Collisions: pipes
  for (const pipe of pipes) {
    const withinX = BIRD_X + BIRD_RADIUS > pipe.x && BIRD_X - BIRD_RADIUS < pipe.x + PIPE_WIDTH;
    if (withinX) {
      const gapTop = pipe.gapCenter - PIPE_GAP / 2;
      const gapBottom = pipe.gapCenter + PIPE_GAP / 2;
      if (bird.y - BIRD_RADIUS < gapTop || bird.y + BIRD_RADIUS > gapBottom) {
        endGame();
        return;
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, W, H);

  // Sky gradient
  const g = ctx.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#7dd3fc');
  g.addColorStop(1, '#bae6fd');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, W, H);

  // Pipes
  ctx.fillStyle = '#22c55e';
  ctx.strokeStyle = '#15803d';
  ctx.lineWidth = 3;
  for (const pipe of pipes) {
    const gapTop = pipe.gapCenter - PIPE_GAP / 2;
    const gapBottom = pipe.gapCenter + PIPE_GAP / 2;
    ctx.fillRect(pipe.x, 0, PIPE_WIDTH, gapTop);
    ctx.strokeRect(pipe.x, 0, PIPE_WIDTH, gapTop);
    ctx.fillRect(pipe.x, gapBottom, PIPE_WIDTH, H - gapBottom);
    ctx.strokeRect(pipe.x, gapBottom, PIPE_WIDTH, H - gapBottom);
  }

  // Ground line
  ctx.fillStyle = '#a3e635';
  ctx.fillRect(0, H - 4, W, 4);

  // Bird
  const angle = Math.max(-0.5, Math.min(0.9, bird.vy / 600));
  ctx.save();
  ctx.translate(BIRD_X, bird.y);
  ctx.rotate(angle);
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(0, 0, BIRD_RADIUS, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(4, -4, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(5, -4, 1.8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(BIRD_RADIUS - 2, 0);
  ctx.lineTo(BIRD_RADIUS + 8, -3);
  ctx.lineTo(BIRD_RADIUS + 8, 3);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function loop(now) {
  const dt = Math.min(0.033, (now - lastTime) / 1000);
  lastTime = now;
  if (state === 'playing') {
    update(dt);
    draw();
    if (state === 'playing') rafId = requestAnimationFrame(loop);
  }
}

stage.addEventListener('mousedown', (e) => {
  if (e.target.closest('.fd-btn')) return;
  flap();
});
stage.addEventListener('touchstart', (e) => {
  if (e.target.closest('.fd-btn')) return;
  e.preventDefault();
  flap();
}, { passive: false });

document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    flap();
  }
});

document.getElementById('start-btn').addEventListener('click', startGame);
document.getElementById('retry-btn').addEventListener('click', startGame);

draw();
startScreen.classList.add('show');`,

  seo: {
    title: 'Flap & Dodge Obstacle Game — Free HTML CSS JS Snippet',
    description: 'Canvas side-scroller with gravity, tap-to-flap, delta-time obstacle scroll and localStorage best score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Flap & Dodge Obstacle Game — Delta-Time Physics, Canvas Rendering & Gap Collision Detection',
      description: `Side-scrolling flap-and-dodge games look simple on the surface but hinge entirely on one detail most quick clones get wrong: frame-rate independence. If gravity and obstacle speed are applied as a fixed number of pixels per rendered frame, the game runs at wildly different speeds on a 60Hz versus a 144Hz display, or stutters unpredictably when the browser tab is throttled. This snippet uses genuine delta-time physics — every update multiplies velocity and position changes by the elapsed time since the last frame, in seconds, so the character falls, accelerates, and the obstacles scroll at a truly constant real-world speed regardless of the device's refresh rate.

**The game loop and delta time**

The core loop runs through \`requestAnimationFrame(loop)\`, and each call computes \`dt\` as the milliseconds since the previous frame converted to seconds and clamped to a maximum of 0.033 (roughly 30fps) so a dropped frame or tab-switch stall never produces a huge physics jump that teleports the character through an obstacle. Gravity is defined as \`GRAVITY = 1400\` pixels per second squared, applied each frame as \`bird.vy += GRAVITY * dt\`, and the resulting velocity moves the character as \`bird.y += bird.vy * dt\`. A click, tap, or spacebar press calls \`flap()\`, which simply overwrites the vertical velocity to a fixed upward value (\`FLAP_VELOCITY = -420\`) — the same physics integration then naturally arcs the character back down under gravity afterward.

**Obstacle spawning and gap collision**

New obstacle pairs are pushed onto a \`pipes\` array on a fixed real-time interval (\`PIPE_INTERVAL\` seconds, not frame count), each with a randomly chosen \`gapCenter\` kept away from the very top and bottom of the canvas via a margin. Every frame, each pipe's \`x\` decreases by \`PIPE_SPEED * dt\`, and pipes are filtered out of the array once they scroll fully off the left edge, keeping the array small and collision checks cheap. Collision detection is a straightforward two-axis check: a pipe is only a collision candidate while the character's horizontal extent overlaps the pipe's horizontal extent, and within that window the character loses if its vertical extent extends above the gap's top edge or below the gap's bottom edge — exactly the classic "AABB vs gap" test used by every implementation of this genre.

**Scoring and canvas rendering**

A pipe is marked \`passed\` and the score increments the instant the pipe's right edge scrolls behind the character's left edge, so scoring happens exactly once per obstacle regardless of frame rate. Rendering is done entirely on a single 2D canvas context: a vertical sky gradient, filled rectangles for the top and bottom pipe segments (derived directly from each pipe's \`gapCenter\` and \`PIPE_GAP\`), and a hand-drawn circular character with a rotating tilt driven by the current vertical velocity (\`Math.atan\`-free — a simple clamped ratio of \`vy\`) so the character visibly noses down while falling and up while flapping, a small but important readability cue borrowed from the genre's classic feel. Best score persists via \`localStorage\` and is shown on both the start screen and the game-over screen.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the game', text: 'Click "Start" on the opening screen, or simply click/tap the stage or press Space — any flap input while idle begins the run immediately via startGame().' },
        { title: 'Flap to gain height', text: 'Each click, tap, or spacebar press sets the character\'s vertical velocity to a fixed upward value (FLAP_VELOCITY), instantly interrupting its fall. Gravity then pulls it back down every frame until you flap again.' },
        { title: 'Dodge the gaps', text: 'Obstacle pairs scroll in from the right at a constant real-world speed (PIPE_SPEED, not frame-dependent) with a randomly positioned vertical gap. Keep the character\'s circle within the gap as each pair passes.' },
        { title: 'Watch your score climb', text: 'The score increments by one the instant a pipe pair is fully passed, tracked per-pipe with a passed flag so each obstacle only scores once no matter the frame rate.' },
        { title: 'See your final score on Game Over', text: 'Colliding with a pipe, the ceiling, or the ground ends the run immediately, freezes the loop, and shows the Game Over screen with your final score and your all-time best.' },
        { title: 'Beat your best score', text: 'Your highest score persists across sessions via localStorage. Click "Try Again" to instantly reset the character, obstacles, and score and start a fresh delta-time-driven run.' },
      ],
    },
    features: [
      'Delta-time physics integration: gravity and obstacle speed scale by real elapsed seconds, not frame count',
      'requestAnimationFrame game loop with a clamped dt (max ~33ms) to prevent physics jumps on dropped frames',
      'Randomised obstacle gap position per pipe pair, generated with a safe margin from the canvas edges',
      'Two-axis AABB-vs-gap collision test: horizontal overlap gates a vertical gap-boundary check',
      'Per-pipe passed flag ensures the score increments exactly once per obstacle regardless of frame rate',
      'Canvas-drawn character with velocity-driven tilt rotation for a readable falling/flapping visual cue',
      'Persistent best score via localStorage, shown on both the start screen and the game-over screen',
      'Unified input handling across mousedown, touchstart (with preventDefault), and Space keydown',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching delta-time game physics and canvas fundamentals', desc: 'This snippet is a compact, complete example of the single most important concept in real-time game programming: decoupling simulation speed from rendering frame rate. Students can compare the update() function\'s use of dt against a naive fixed-step version to directly see why frame-rate-dependent physics breaks on variable-refresh-rate hardware.' },
      { icon: 'APP', title: 'Portfolio piece demonstrating canvas game-loop architecture', desc: 'A working obstacle-dodging game with correct delta-time physics, collision detection, and persisted high scores is a strong, self-contained portfolio artifact that goes well beyond a static canvas drawing — it demonstrates real game-loop architecture, state machines (idle/playing/over), and input handling across mouse, touch, and keyboard.' },
      { icon: 'FLOW', title: 'Engaging waiting-screen or loading-state distraction', desc: 'A quick, replayable arcade game like this is a natural fit for a loading screen, an offline/error page, or a "while you wait" panel in a checkout or onboarding flow, giving users something genuinely fun to do rather than staring at a spinner.' },
      { icon: 'DESIGN', title: 'Canvas HUD and overlay-screen pattern reference', desc: 'The layered structure — a canvas for the simulation, an absolutely positioned score HUD, and semi-transparent start/game-over overlay screens that fade in and out — is a reusable pattern for any canvas-based mini-game or interactive demo that needs UI chrome layered on top of a rendering surface.' },
      { icon: 'CODE', title: 'Base for difficulty ramps or alternate obstacle patterns', desc: 'Because GRAVITY, PIPE_SPEED, PIPE_GAP, and PIPE_INTERVAL are top-level constants, this snippet is a practical starting point for a difficulty curve that gradually increases pipe speed or narrows the gap as the score rises, similar in spirit to how the [Rhythm Tap Game](/ui-snippets/rhythm-tap-game) snippet could scale its note frequency over time.' },
      { icon: 'FORM', title: 'One-thumb mobile arcade game', desc: 'The single-tap-to-flap control scheme, combined with preventDefault on touchstart to stop the page from scrolling or zooming during play, makes this comfortable to play one-handed on a phone without any on-screen buttons taking up screen space.' },
      { icon: 'CODE', title: 'Related: Dot Muncher Maze Game', desc: 'See the [Dot Muncher Maze Game](/ui-snippets/dot-muncher-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Flexbox Alignment Game', desc: 'See the [Flexbox Alignment Game](/ui-snippets/flexbox-align-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the game use delta time instead of fixed pixel steps per frame?', a: 'requestAnimationFrame does not guarantee a fixed interval between calls — it can fire at 60fps, 120fps, or drop frames under load. If gravity and obstacle speed were applied as constant pixel amounts per frame, the game would run faster on high-refresh-rate displays and stutter unpredictably under load. By multiplying every physics change by dt (seconds elapsed since the last frame), this snippet keeps gravity acceleration and obstacle scroll speed constant in real-world time regardless of how often the frame callback fires.' },
      { q: 'How does collision detection work against the obstacle gaps?', a: 'For each pipe, the code first checks horizontal overlap: does the character\'s circle extent intersect the pipe\'s x-range? Only if that is true does it check the vertical condition — whether the character\'s top edge is above the gap\'s top boundary or its bottom edge is below the gap\'s bottom boundary. If either is true while horizontally overlapping, it is a collision. This two-stage check is cheap because most pipes are off-screen or far away and get skipped by the horizontal test immediately.' },
      { q: 'Can I make the game harder as the score increases?', a: 'Yes. Add a scaling factor to PIPE_SPEED and/or shrink PIPE_GAP based on the current score inside update(), for example recalculating an effective speed as PIPE_SPEED + score * 3 each frame. Keep the change gradual and test that the gap never shrinks below roughly 2.5x the character\'s diameter, or the game becomes unfairly difficult to react to.' },
      { q: 'Why is the best score still visible after a fresh Start?', a: 'best is read from localStorage once when the script first loads and kept in memory for the whole session, only being overwritten (in memory and in localStorage) when a completed run\'s score exceeds it. Starting a new game resets the current score to 0 but intentionally leaves best untouched so it always reflects your highest-ever run, shown on both the start screen and the game-over screen.' },
      { q: 'How do I add sound effects for flapping, scoring, or crashing?', a: 'Create Audio objects (e.g. const flapSound = new Audio("flap.mp3")) and call .play() inside flap(), inside the score-increment branch in update(), and inside endGame() respectively. Since many browsers block audio playback before any user interaction, the very first flap() call (which also starts the game from idle) is a safe place to "unlock" audio playback for the rest of the session.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the dt clamp in the game loop protects against a physics-breaking jump if the browser tab is backgrounded and then resumed — that single line is doing more work than it looks like. It's also a great snippet to extend with AI assistance: ask it to add a gradual difficulty ramp that increases obstacle speed or narrows the gap as the score rises, add a simple particle burst or screen-shake effect on collision for more satisfying game feedback, or refactor the character's tilt-rotation math into its own small function with comments explaining the velocity-to-angle mapping. Use the assistant to sanity-check the collision math too — walk through a near-miss scenario by hand and confirm the AABB-vs-gap logic agrees with your intuition.`,
      prompt: `Build a canvas-based side-scrolling flap-and-dodge obstacle game in plain HTML, CSS, and JavaScript — no frameworks, no libraries, no external assets. Do not name it after any existing commercial game.

Requirements:
- A character falls under constant gravity and receives an upward velocity boost on each click, tap, or spacebar press.
- A steady stream of gapped obstacle pairs scroll from right to left at a constant speed, each with a randomly chosen vertical gap position, spawned on a fixed real-world time interval.
- Use requestAnimationFrame for the game loop and compute all movement (gravity integration and obstacle scrolling) using delta-time in seconds since the previous frame, not a fixed per-frame pixel amount, so speed stays consistent across different frame rates. Clamp the delta-time value to avoid large physics jumps after a dropped frame or backgrounded tab.
- Colliding with any obstacle, the ceiling, or the ground immediately ends the run.
- The score increases by exactly one each time the character successfully passes through an obstacle gap, counted once per obstacle regardless of frame rate.
- Include a Start screen shown before the first run, and a Game Over screen after a collision showing the final score and a "Try again" button that fully resets the game state.
- Persist the best-ever score across page reloads using localStorage and display it on both the start and game-over screens.`,
    },
  },
};

export default flapDodgeGame;
