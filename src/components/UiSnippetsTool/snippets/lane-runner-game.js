const laneRunnerGame = {
  id: 'lane-runner-game',
  title: 'Lane Runner Endless Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🏃</span>
      <h2>Lane Runner</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="330" height="440"></canvas>
    <div class="hud"><span id="hud-score">0</span></div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Lane Runner</p>
        <p class="overlay-sub">Switch lanes with ◀ ▶, JUMP over barriers, SLIDE under gates. It keeps speeding up.</p>
        <button class="btn btn-primary" id="btn-start">Run</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Crashed!</p>
        <p class="overlay-sub" id="final-score">Score 0</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Run again</button>
      </div>
    </div>
  </div>

  <div class="controls">
    <div class="dpad">
      <button class="ctrl-btn" id="btn-left" aria-label="Move left">◀</button>
      <button class="ctrl-btn" id="btn-right" aria-label="Move right">▶</button>
    </div>
    <div class="actions">
      <button class="act-btn jump" id="btn-jump" aria-label="Jump">JUMP</button>
      <button class="act-btn slide" id="btn-slide" aria-label="Slide">SLIDE</button>
    </div>
  </div>

  <p class="hint-text">Keyboard: ← → lanes, ↑/Space jump, ↓ slide</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 380px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #0891b2; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #0f172a; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; top: 8px; right: 12px; font-size: 15px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.5); pointer-events: none; }

.overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #0891b2; color: #fff; }
.btn-primary:hover { background: #0e7490; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; }
.dpad { display: flex; gap: 10px; }
.actions { display: flex; gap: 10px; }
.ctrl-btn, .act-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn { width: 56px; height: 62px; border-radius: 14px; background: #f8fafc; color: #334155; font-size: 20px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #cffafe; }
.act-btn { width: 74px; height: 62px; border-radius: 14px; color: #fff; font-size: 13px; font-weight: 800; letter-spacing: 0.5px; }
.act-btn.jump { background: #16a34a; box-shadow: 0 3px 0 #15803d; border-color: #16a34a; }
.act-btn.jump:active { transform: translateY(3px); box-shadow: none; background: #15803d; }
.act-btn.slide { background: #d97706; box-shadow: 0 3px 0 #b45309; border-color: #d97706; }
.act-btn.slide:active { transform: translateY(3px); box-shadow: none; background: #b45309; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'lane-runner-best';

const LANES = 3;
const LANE_W = W / LANES;
const laneX = i => LANE_W * i + LANE_W / 2;
const RUNNER_Y = H - 90, RUNNER_W = 30, RUNNER_H = 42;
const JUMP_MS = 620, SLIDE_MS = 520;
const OBSTACLES = ['barrier', 'gate', 'block']; // jump / slide / dodge-lane

let lane, targetX, curX, jumpT, slideT;
let obstacles, spawnZ, speed, score, running, rafId, lastFrame, distance;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function resetState() {
  lane = 1; targetX = curX = laneX(1);
  jumpT = 0; slideT = 0;
  obstacles = []; spawnZ = 0;
  speed = 3.4; score = 0; distance = 0;
  hudScore.textContent = '0';
}

function moveLane(d) { lane = Math.max(0, Math.min(LANES - 1, lane + d)); targetX = laneX(lane); }
function doJump() { if (jumpT <= 0 && slideT <= 0) jumpT = JUMP_MS; }
function doSlide() { if (slideT <= 0 && jumpT <= 0) slideT = SLIDE_MS; }

function spawnRow() {
  const type = OBSTACLES[(Math.random() * OBSTACLES.length) | 0];
  if (type === 'block') {
    // Fill two random lanes with solid blocks; one lane always open
    const open = (Math.random() * LANES) | 0;
    for (let i = 0; i < LANES; i++) if (i !== open) obstacles.push({ lane: i, y: -60, type: 'block' });
  } else {
    // barrier (jump) or gate (slide) spanning a single random lane
    obstacles.push({ lane: (Math.random() * LANES) | 0, y: -60, type });
  }
}

function update(dt) {
  const ms = dt * 1000;
  distance += speed * dt * 60;
  score = Math.floor(distance / 10);
  hudScore.textContent = score;
  speed = 3.4 + distance * 0.0009;

  // Smoothly ease toward target lane x
  curX += (targetX - curX) * Math.min(1, dt * 14);

  if (jumpT > 0) jumpT -= ms;
  if (slideT > 0) slideT -= ms;

  // Spawn rows at distance intervals that tighten as speed grows
  spawnZ += speed * dt * 60;
  const gap = Math.max(150, 300 - distance * 0.03);
  if (spawnZ >= gap) { spawnRow(); spawnZ = 0; }

  obstacles.forEach(o => o.y += speed * dt * 60);

  // Collision: obstacle in the runner band and same lane
  const jumping = jumpT > 0, sliding = slideT > 0;
  for (const o of obstacles) {
    if (o.lane !== lane) continue;
    if (o.y > RUNNER_Y - 20 && o.y < RUNNER_Y + RUNNER_H) {
      if (o.type === 'barrier' && jumping) continue;   // jumped over
      if (o.type === 'gate' && sliding) continue;       // slid under
      if (o.type === 'block') { return endGame(); }     // must be in another lane
      if (o.type === 'barrier' && !jumping) return endGame();
      if (o.type === 'gate' && !sliding) return endGame();
    }
  }
  obstacles = obstacles.filter(o => o.y < H + 60);
}

function draw() {
  ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, W, H);

  // Lane dividers with scrolling dashes
  ctx.strokeStyle = 'rgba(148,163,184,0.35)'; ctx.lineWidth = 2; ctx.setLineDash([14, 16]);
  ctx.lineDashOffset = -(distance % 30);
  for (let i = 1; i < LANES; i++) { ctx.beginPath(); ctx.moveTo(LANE_W * i, 0); ctx.lineTo(LANE_W * i, H); ctx.stroke(); }
  ctx.setLineDash([]);

  // Obstacles
  obstacles.forEach(o => {
    const x = laneX(o.lane);
    if (o.type === 'barrier') {          // low wall — jump it
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(x - LANE_W / 2 + 8, o.y, LANE_W - 16, 20);
      ctx.fillStyle = '#052e16';
      for (let i = 0; i < 4; i++) ctx.fillRect(x - LANE_W / 2 + 12 + i * (LANE_W - 24) / 4, o.y + 4, 4, 12);
    } else if (o.type === 'gate') {      // overhead gate — slide under
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(x - LANE_W / 2 + 8, o.y - 24, LANE_W - 16, 24);
      ctx.fillStyle = '#78350f';
      ctx.fillRect(x - LANE_W / 2 + 8, o.y - 6, LANE_W - 16, 6);
    } else {                              // solid block — change lane
      ctx.fillStyle = '#ef4444';
      if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x - LANE_W / 2 + 10, o.y, LANE_W - 20, 40, 6); ctx.fill(); }
      else ctx.fillRect(x - LANE_W / 2 + 10, o.y, LANE_W - 20, 40);
    }
  });

  // Runner — squashes when sliding, lifts when jumping
  const jp = jumpT > 0 ? Math.sin((1 - jumpT / JUMP_MS) * Math.PI) : 0;
  const lift = jp * 46;
  const sliding = slideT > 0;
  const h = sliding ? RUNNER_H * 0.55 : RUNNER_H;
  const y = RUNNER_Y + (RUNNER_H - h) - lift;
  // shadow
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath(); ctx.ellipse(curX, RUNNER_Y + RUNNER_H, 16 - jp * 6, 5, 0, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = sliding ? '#fbbf24' : '#22d3ee';
  if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(curX - RUNNER_W / 2, y, RUNNER_W, h, 8); ctx.fill(); }
  else ctx.fillRect(curX - RUNNER_W / 2, y, RUNNER_W, h);
  // face dot
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(curX + 4, y + 8, 5, 5);
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
  finalEl.textContent = 'Score ' + score;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New high score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard (all discrete taps) ──
document.addEventListener('keydown', e => {
  if (!running && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
  if (e.key === 'ArrowLeft') { moveLane(-1); e.preventDefault(); }
  if (e.key === 'ArrowRight') { moveLane(1); e.preventDefault(); }
  if (e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') { doJump(); e.preventDefault(); }
  if (e.key === 'ArrowDown' || e.key === 's') { doSlide(); e.preventDefault(); }
});

// ── Input: on-screen buttons (all single-tap actions, fired on pointerdown) ──
function tap(id, fn) {
  const el = document.getElementById(id);
  el.addEventListener('pointerdown', e => { e.preventDefault(); fn(); });
  el.addEventListener('contextmenu', e => e.preventDefault());
}
tap('btn-left', () => moveLane(-1));
tap('btn-right', () => moveLane(1));
tap('btn-jump', doJump);
tap('btn-slide', doSlide);

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Lane Runner Endless Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly endless three-lane runner with on-screen lane-switch, jump and slide buttons, three obstacle types, a rising speed curve and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Lane Runner — An Endless Three-Lane Runner Built for Thumb Controls',
      description: `Endless runners are the most touch-native game genre there is: the whole game is a handful of instant decisions — left, right, jump, slide — made against an obstacle stream that never stops speeding up. That maps onto four on-screen buttons with nothing left over, which makes this an ideal demonstration of *discrete-action* touch controls. This snippet builds a complete three-lane runner on a single HTML5 \`<canvas>\`, with an on-screen ◀ ▶ pair to change lanes and JUMP / SLIDE buttons for the two timed dodges, plus a full keyboard mapping.

**Every control is a discrete tap, not a held state**

Unlike a platformer where you *hold* to run, every input here is a one-shot event. Changing lanes nudges a target lane index; jumping and sliding start a fixed-duration timer. So all four on-screen buttons fire on \`pointerdown\` via a tiny \`tap()\` helper — there is no press-and-hold to manage and no stuck-input edge case, because nothing depends on the button still being down. The keyboard handlers call the exact same \`moveLane()\`, \`doJump()\` and \`doSlide()\` functions, so the two input methods are guaranteed to behave identically.

**Lanes as an index, with smooth interpolation**

The runner's lane is just an integer 0–2. \`moveLane()\` clamps it, and the runner's on-screen x-position eases toward the target lane centre every frame with a simple interpolation (\`curX += (targetX - curX) * k\`) rather than snapping — so a lane change reads as a quick slide, not a teleport. This split between the logical lane (used for collision) and the visual x (used for drawing) is a clean, reusable pattern for any grid-snapped movement that should still look fluid.

**Three obstacle types that each demand a different verb**

The obstacle stream teaches three distinct reactions. A green **barrier** must be jumped; an amber overhead **gate** must be slid under; a red **block** fills every lane but one, so it must be *avoided* by switching lanes. Collision is deliberately simple and readable: an obstacle only matters if it is in the runner's lane and inside the runner's vertical band, and then a \`jumpT\`/\`slideT\` timer being active is what lets you pass a barrier or gate. Any other case is a crash. Because the jump and slide are timed windows, mistiming them fails exactly as a real runner does — jumping too early lands you before the barrier.

**A rising speed curve and distance scoring**

Speed is a continuous function of distance travelled, and the gap between spawned obstacle rows shrinks as distance grows, so the game gets relentlessly faster and denser. The score is the distance travelled, shown live, and the best is persisted to \`localStorage\`. Movement is delta-time scaled so the runner covers the same ground per second on any refresh rate.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start running', text: 'Tap "Run" to call startGame(), which resets the runner to the centre lane, clears the obstacle stream, and starts the delta-time requestAnimationFrame loop. The runner auto-advances; you only steer and dodge.' },
        { title: 'Switch lanes', text: 'Tap ◀ or ▶ (or the Left/Right arrow keys) to change lanes. Each tap nudges the lane index; the runner eases smoothly to the new lane rather than snapping.' },
        { title: 'Jump the green barriers', text: 'Tap JUMP (or ↑ / Space) as a low green barrier approaches. Jump is a timed window (a jumpT countdown), so timing matters — jump too early and you land before clearing it.' },
        { title: 'Slide under the amber gates', text: 'Tap SLIDE (or ↓) for the overhead amber gates. The runner squashes for the slide window; you can only jump or slide one at a time.' },
        { title: 'Dodge the red blocks', text: 'Red blocks fill every lane but one and cannot be jumped or slid — you must switch to the open lane in time. This is what forces lane changes into the rhythm.' },
        { title: 'Beat your distance', text: 'The score is the distance travelled and rises continuously; the game speeds up and obstacles pack tighter as you go. Your best persists in localStorage under lane-runner-best. Tune speed, JUMP_MS, SLIDE_MS and the spawn gap in the JS.' },
      ],
    },
    features: [
      'Four discrete on-screen buttons (lane left/right, jump, slide) fired on pointerdown, plus a matching keyboard map — no held-input edge cases',
      'Logical lane index for collision separated from an interpolated visual x-position for smooth lane changes',
      'Three obstacle types, each requiring a different response: jump a barrier, slide under a gate, switch lanes past a block',
      'Timed jump and slide windows so mistiming fails realistically, with a squash/lift animation on the runner',
      'Continuously rising speed and tightening spawn gap driven by distance travelled',
      'Delta-time scaled movement for frame-rate-independent speed, with scrolling lane dashes for a sense of motion',
      'Distance-based live scoring and a persisted best via localStorage with defensive try/catch',
      'Self-contained canvas rendering with start and game-over overlays — no assets or dependencies',
    ],
    useCases: [
      { icon: 'APP', title: 'Discrete-tap touch control template', desc: 'The all-taps control scheme (lane nudges plus timed jump/slide) fired on pointerdown is a reusable pattern for any endless runner or rhythm-style touch game, with no press-and-hold state to manage.' },
      { icon: 'FORM', title: 'Instantly playable casual game for entertainment sites', desc: 'An endless runner is learnable in seconds and has infinite replayability — a strong embeddable demo for a games portal, blog, or app landing page with no sign-up or download.' },
      { icon: 'FLOW', title: 'Engaging empty-state, loading or 404 distraction', desc: 'With no network dependency it starts instantly, making it a lively filler for an error page or slow-loading screen, like the [Dodge the Falling Blocks Game](/ui-snippets/dodge-the-blocks-game).' },
      { icon: 'LEARN', title: 'Teaching lane-snap movement and timed-window mechanics', desc: 'The separation of a logical lane index from an interpolated visual position, and the timer-based jump/slide windows, are compact references for two common game-feel techniques.' },
      { icon: 'CODE', title: 'Starting point for a fuller endless runner', desc: 'The obstacle stream and speed curve generalise well: add coins and power-ups, a shield, curved roads, sprite art, or a combo multiplier without touching the delta-time loop.' },
      { icon: 'DESIGN', title: 'Canvas motion and parallax reference', desc: 'The scrolling dashed lane dividers, runner shadow, and squash/lift animation are directly reusable techniques for conveying speed and weight in any canvas scene.' },
      { icon: 'CODE', title: 'Related: Hangman Word Guessing Game', desc: 'See the [Hangman Word Guessing Game](/ui-snippets/hangman-word-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why are all the controls single taps instead of press-and-hold?', a: 'Every action in an endless runner is instantaneous: a lane change nudges an index, and jump/slide start a fixed-duration timer. None of them depend on the button staying pressed, so each on-screen button simply fires its function on pointerdown. That removes any need to track button release and eliminates the "stuck input" edge case entirely, while the keyboard handlers call the identical functions.' },
      { q: 'How does the runner move smoothly between lanes if lanes are just indices?', a: 'The lane is a logical integer used for collision, but the runner is drawn at a separate x-position that eases toward the target lane centre each frame with curX += (targetX - curX) * k. That interpolation turns an instant index change into a visible quick slide. Keeping the logical lane and the visual position separate is a clean pattern for any movement that snaps to a grid but should still animate.' },
      { q: 'Why do I crash even though I pressed jump?', a: 'Jump and slide are timed windows, not toggles. Pressing JUMP starts a jumpT countdown, and you only clear a barrier if that timer is still active when the barrier reaches the runner band. Pressing too early means the window has expired by the time you reach the obstacle. Red blocks additionally cannot be jumped or slid at all — the only way past them is to be in the open lane.' },
      { q: 'How does the difficulty increase over time?', a: 'Both the speed and the spawn density scale with distance travelled. Speed is speed = 3.4 + distance * 0.0009, so the runner accelerates continuously, and the gap between spawned obstacle rows shrinks toward a floor as distance grows. Together they make later stages both faster and busier, which is what gives an endless runner its escalating pressure.' },
      { q: 'Does my high score survive a reload?', a: 'Yes. The best distance score is stored in localStorage under lane-runner-best and read on load, so it persists across reloads and browser restarts on the same browser and origin. The read and write are wrapped in try/catch so the game still runs in sandboxed or private contexts where storage access can throw.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the all-taps control model, the split between the logical lane index and the interpolated visual x, and the timed jump/slide collision windows. It is a strong base to extend: ask for collectible coins with a magnet power-up, a shield that absorbs one hit, a combo multiplier for near-misses, curved or forking tracks, sprite-sheet run/jump/slide animation, or a difficulty that ramps in named stages. You could also ask it to add haptic feedback on mobile via the Vibration API, or to port the loop into a React component using useRef and useEffect for the animation-frame lifecycle. Treat it as a working prototype to question and rebuild rather than a finished game.`,
      prompt: `Build a mobile-friendly endless three-lane runner game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A runner that auto-advances down a three-lane track. The player changes lanes and performs a jump and a slide. Provide on-screen buttons for lane-left, lane-right, JUMP and SLIDE, AND keyboard controls (arrows + Space). Every control is a discrete single tap fired on pointerdown — do not use press-and-hold. Both input methods must call the same action functions.
- Represent the current lane as an integer used for collision, but draw the runner at a separate x-position that eases toward the target lane centre each frame so lane changes animate smoothly instead of snapping.
- Include three obstacle types: a barrier that must be jumped, an overhead gate that must be slid under, and a solid block that fills all lanes but one and must be avoided by changing lanes. Jump and slide are timed windows (fixed-duration timers) so mistiming fails; only one of jump/slide can be active at a time.
- Use requestAnimationFrame with delta-time scaling. Make the game speed and obstacle spawn density both increase continuously with distance travelled.
- Score by distance travelled, shown live, and persist the best score in localStorage with defensive try/catch. Show start and game-over overlays, scrolling lane dividers for a sense of motion, and a squash/lift animation on the runner for slide and jump.`,
    },
  },
};

export default laneRunnerGame;
