const caveFlyerGame = {
  id: 'cave-flyer-game',
  title: 'Cave Flyer Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🚁</span>
      <h2>Cave Flyer</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="380" height="320"></canvas>
    <div class="hud"><span id="hud-score">0</span></div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Cave Flyer</p>
        <p class="overlay-sub">Hold the button to rise, release to fall. Thread the cave — it narrows and speeds up the deeper you go.</p>
        <button class="btn btn-primary" id="btn-start">Fly</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Crashed!</p>
        <p class="overlay-sub" id="final-score">Distance 0</p>
        <p class="overlay-best" id="best-msg"></p>
        <button class="btn btn-primary" id="btn-retry">Fly again</button>
      </div>
    </div>
  </div>

  <button class="fly-btn" id="btn-fly" aria-label="Hold to fly">HOLD TO FLY</button>

  <p class="hint-text">Keyboard / mouse: hold Space, ↑, or click the game to rise</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 420px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #d97706; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #1c1917; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; top: 8px; right: 12px; font-size: 15px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; }

.overlay { position: absolute; inset: 0; background: rgba(12,10,9,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #d6d3d1; margin-bottom: 4px; max-width: 300px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #d97706; color: #fff; }
.btn-primary:hover { background: #b45309; }

.fly-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; display: block; width: 100%; margin-top: 14px; height: 66px; border-radius: 16px; background: #d97706; color: #fff; font-size: 16px; font-weight: 800; letter-spacing: 1.5px; border: 1px solid #b45309; box-shadow: 0 4px 0 #92400e; transition: transform 0.06s, background 0.12s; }
.fly-btn:active { transform: translateY(4px); box-shadow: none; background: #b45309; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'cave-flyer-best';

const GRAV = 0.32, LIFT = -0.55, MAX_VY = 6.5;
const PLAYER_X = 70, PLAYER_R = 9;
const SLICE_W = 10;

let player, slices, scrollX, speed, distance, score, running, rafId, lastFrame;
let flying = false;
let centerY, gap, walkVy;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function makeSlice(x) {
  // Meander the cave centre with a bounded random walk; narrow the gap over distance
  walkVy += (Math.random() - 0.5) * 1.4;
  walkVy = Math.max(-2.4, Math.min(2.4, walkVy));
  centerY += walkVy;
  const margin = gap / 2 + 20;
  if (centerY < margin) { centerY = margin; walkVy = Math.abs(walkVy); }
  if (centerY > H - margin) { centerY = H - margin; walkVy = -Math.abs(walkVy); }
  const top = centerY - gap / 2, bottom = centerY + gap / 2;
  // Occasional stalactite/stalagmite jutting into the gap
  let obs = null;
  if (Math.random() < 0.05 && gap > 90) {
    const fromTop = Math.random() < 0.5, len = 18 + Math.random() * (gap - 70);
    obs = { fromTop, len };
  }
  return { top, bottom, obs };
}

function resetState() {
  centerY = H / 2; gap = 170; walkVy = 0;
  slices = [];
  scrollX = 0; speed = 2.2; distance = 0; score = 0;
  player = { y: H / 2, vy: 0 };
  const need = Math.ceil(W / SLICE_W) + 3;
  for (let i = 0; i < need; i++) slices.push(makeSlice(i * SLICE_W));
  hudScore.textContent = '0';
}

function update(dt) {
  const step = dt * 60;
  speed = 2.2 + distance * 0.0008;
  gap = Math.max(96, 170 - distance * 0.02);

  // Vertical physics: hold = lift, release = gravity
  player.vy += (flying ? LIFT : GRAV) * step;
  player.vy = Math.max(-MAX_VY, Math.min(MAX_VY, player.vy));
  player.y += player.vy * step;

  // Scroll the cave; recycle slices off the left, append on the right
  scrollX += speed * step;
  distance += speed * step;
  score = Math.floor(distance / 10);
  hudScore.textContent = score;

  while (scrollX >= SLICE_W) { scrollX -= SLICE_W; slices.shift(); slices.push(makeSlice(0)); }

  // Collision: the slice under the player's x
  const idx = Math.floor((PLAYER_X + scrollX) / SLICE_W);
  const s = slices[idx];
  if (s) {
    if (player.y - PLAYER_R < s.top || player.y + PLAYER_R > s.bottom) return endGame();
    if (s.obs) {
      const oTop = s.obs.fromTop ? s.top : s.bottom - s.obs.len;
      const oBot = s.obs.fromTop ? s.top + s.obs.len : s.bottom;
      if (player.y + PLAYER_R > oTop && player.y - PLAYER_R < oBot) return endGame();
    }
  }
  if (player.y < 0 || player.y > H) return endGame();
}

function draw() {
  ctx.fillStyle = '#0c0a09'; ctx.fillRect(0, 0, W, H);

  // Cave walls as filled polygons
  ctx.fillStyle = '#57534e';
  ctx.beginPath(); ctx.moveTo(0, 0);
  slices.forEach((s, i) => ctx.lineTo(i * SLICE_W - scrollX, s.top));
  ctx.lineTo(W, 0); ctx.closePath(); ctx.fill();
  ctx.beginPath(); ctx.moveTo(0, H);
  slices.forEach((s, i) => ctx.lineTo(i * SLICE_W - scrollX, s.bottom));
  ctx.lineTo(W, H); ctx.closePath(); ctx.fill();

  // Obstacles
  ctx.fillStyle = '#78716c';
  slices.forEach((s, i) => {
    if (!s.obs) return;
    const x = i * SLICE_W - scrollX;
    const oy = s.obs.fromTop ? s.top : s.bottom - s.obs.len;
    ctx.fillRect(x, oy, SLICE_W + 1, s.obs.len);
  });

  // Player craft with a little thrust flame when flying
  const y = player.y;
  ctx.fillStyle = flying ? '#fbbf24' : '#f59e0b';
  ctx.beginPath(); ctx.arc(PLAYER_X, y, PLAYER_R, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#0c0a09'; ctx.fillRect(PLAYER_X - 2, y - 2, 4, 4);
  if (flying) { ctx.fillStyle = '#22d3ee'; ctx.beginPath(); ctx.moveTo(PLAYER_X - PLAYER_R, y); ctx.lineTo(PLAYER_X - PLAYER_R - 8, y - 4); ctx.lineTo(PLAYER_X - PLAYER_R - 8, y + 4); ctx.closePath(); ctx.fill(); }

  hudScore.textContent = score;
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
  finalEl.textContent = 'Distance ' + score;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New best distance!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: one control, many surfaces (button, keyboard, canvas tap) ──
function setFly(v) { flying = v; }

const flyBtn = document.getElementById('btn-fly');
flyBtn.addEventListener('pointerdown', e => { e.preventDefault(); setFly(true); });
flyBtn.addEventListener('pointerup', e => { e.preventDefault(); setFly(false); });
flyBtn.addEventListener('pointercancel', () => setFly(false));
flyBtn.addEventListener('pointerleave', () => setFly(false));
flyBtn.addEventListener('contextmenu', e => e.preventDefault());

canvas.addEventListener('pointerdown', e => { e.preventDefault(); setFly(true); });
canvas.addEventListener('pointerup', () => setFly(false));
canvas.addEventListener('pointerleave', () => setFly(false));

document.addEventListener('keydown', e => { if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') { setFly(true); e.preventDefault(); } });
document.addEventListener('keyup', e => { if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') setFly(false); });

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Cave Flyer Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly one-button cave-flying game: hold to rise, release to fall, and thread a procedurally generated scrolling cave that narrows and speeds up. localStorage best distance. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Cave Flyer — One-Button Thrust Physics and a Procedural Scrolling Cave',
      description: `The one-button "helicopter" game is a masterclass in doing the most with the least: a single input — hold to go up, release to go down — against an ever-narrowing tunnel. There's no simpler control scheme, which makes it the purest demonstration of hold-to-thrust physics and of the procedural, recycling terrain that an endless side-scroller needs. This snippet builds it on one HTML5 \`<canvas>\`: hold the button (or Space, or a tap on the game) to fire the craft's lift, release to let gravity take it, and thread a meandering cave that tightens and accelerates the further you fly.

**Hold-to-thrust: gravity versus lift on one axis**

The craft only moves vertically, driven by a single boolean. Every frame, if \`flying\` is true a negative (upward) \`LIFT\` acceleration is added to the velocity; if it's false a positive (downward) \`GRAV\` is added instead. The velocity is clamped to \`MAX_VY\` and integrated into the position. That's the entire control model — the craft is never *set* to a height, it's constantly accelerating one way or the other, so flying smoothly means feathering the button to hover, exactly like a real helicopter game. Because it's a single flag, the same input works from a hold button, the keyboard, and a press on the canvas without any extra logic.

**One input, four surfaces**

The \`flying\` flag is set true on \`pointerdown\` and false on \`pointerup\`/\`pointercancel\`/\`pointerleave\` — bound to the dedicated FLY button, to the canvas itself (so a tap anywhere on the game works), and to Space/↑ on the keyboard. Routing every surface through one \`setFly()\` call means the physics never knows or cares where the press came from, and releasing is handled everywhere so the thrust can't get stuck on.

**A procedural cave built from recycled slices**

The cave is a list of thin vertical *slices*, each storing a ceiling height and a floor height. \`makeSlice()\` meanders the cave's centre with a bounded random walk (so the tunnel curves naturally instead of jittering), narrows the vertical gap as distance grows, and occasionally juts a stalactite or stalagmite into the passage. As the world scrolls, slices that pass off the left edge are shifted out of the array and fresh ones pushed on the right — a constant, small number of slices in memory no matter how far you fly. The walls are drawn as two filled polygons traced along the slice tops and bottoms.

**Collision, difficulty and persistence**

Collision is cheap: only the single slice directly under the craft's fixed x-position is tested, against the ceiling, the floor, and any obstacle in that slice. Both the scroll speed and the cave's narrowing are continuous functions of distance, so the game gets relentlessly harder. The score is distance flown, shown live, and the best persists to \`localStorage\`; all motion is delta-time scaled for consistent speed across refresh rates.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start flying', text: 'Tap "Fly" to call startGame(), which generates the starting cave, places the craft mid-screen, and starts the delta-time loop. The craft immediately begins to fall under gravity.' },
        { title: 'Hold to rise, release to fall', text: 'Hold the HOLD TO FLY button — or Space / ↑, or press anywhere on the game — to apply upward thrust; release to let gravity pull the craft down. The craft is always accelerating one way, so feather the button to hover level.' },
        { title: 'Thread the cave', text: 'Keep the craft between the ceiling and the floor. Touching either wall — or an obstacle jutting into the passage — ends the run instantly.' },
        { title: 'Watch it narrow', text: 'The vertical gap shrinks and the scroll speed rises continuously with distance, so the later cave demands finer control than the open early stretch.' },
        { title: 'Dodge the stalactites', text: 'Occasional stone spikes jut from the ceiling or floor into the gap. They only occupy one slice, so a small, well-timed altitude change slips past them.' },
        { title: 'Beat your distance', text: 'The score is distance flown, shown top-right, and persists in localStorage under cave-flyer-best. Tune GRAV, LIFT, the starting gap and its narrowing rate to change the difficulty.' },
      ],
    },
    features: [
      'Single hold-to-thrust control routed through one flag from a button, the keyboard, and a canvas tap — released on pointerup/cancel/leave so thrust never sticks',
      'Gravity-vs-lift vertical physics: constant acceleration one way or the other with a clamped max velocity, for true hover-by-feathering feel',
      'Procedural cave from recycled vertical slices with a bounded random-walk centre so the tunnel meanders smoothly',
      'Continuously narrowing gap and rising scroll speed as functions of distance flown',
      'Occasional stalactite/stalagmite obstacles jutting into the passage',
      'Cheap collision testing only the single slice under the craft, against ceiling, floor and obstacle',
      'Distance-based live scoring and a persisted best via localStorage with defensive try/catch',
      'Delta-time scaled motion and polygon-traced cave walls, with no assets or dependencies',
    ],
    useCases: [
      { icon: 'APP', title: 'One-button touch game template', desc: 'Hold-to-thrust is the minimal mobile control — a reusable template for any single-input game, and a clean example of routing one action through button, key and tap surfaces at once.' },
      { icon: 'LEARN', title: 'Teaching thrust physics and procedural terrain', desc: 'Gravity-vs-lift integration and a recycling random-walk cave are compact references for two staples of side-scrollers: analog one-axis control and endless generated levels.' },
      { icon: 'CODE', title: 'Starting point for a fuller flyer', desc: 'The slice-based cave and thrust physics generalise to collectible fuel, gaps that fork, moving gates, or a parallax background, without touching the delta-time loop.' },
      { icon: 'FORM', title: 'Instantly playable one-more-try game', desc: 'A one-button endless flyer is learnable in a second and hard to put down — a strong embeddable demo for a games portal, blog, or app landing page.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it starts instantly as an interactive distraction on an error or loading screen, like the [Flap Dodge Game](/ui-snippets/flap-dodge-game).' },
      { icon: 'DESIGN', title: 'Canvas procedural-terrain reference', desc: 'The random-walk cave centre, slice recycling and polygon-traced walls are directly reusable techniques for any endlessly generated side-scrolling canvas scene.' },
      { icon: 'CODE', title: 'Related: Breakout Brick Breaker', desc: 'See the [Breakout Brick Breaker](/ui-snippets/breakout-brick-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Tower of Hanoi Game', desc: 'See the [Tower of Hanoi Game](/ui-snippets/tower-of-hanoi-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a single button control the craft precisely?', a: 'The craft only moves on the vertical axis and is always accelerating: while the button is held, an upward lift acceleration is added to its velocity each frame; while released, a downward gravity acceleration is added instead. The velocity is clamped and integrated into position. Because it is continuous acceleration rather than a fixed up/down speed, tapping and feathering the button lets you hover and make fine adjustments — the same analog feel as a classic helicopter game.' },
      { q: 'Why can I press the button, the canvas, and the keyboard interchangeably?', a: 'All three surfaces call the same setFly() function that toggles one flying flag — true on press, false on release. The physics reads only that flag and has no idea where the input came from, so a hold button, a tap on the game area, and Space/Up all behave identically. Release is bound on pointerup, pointercancel and pointerleave everywhere, so the thrust can never get stuck on if a finger slides off.' },
      { q: 'How is the cave generated endlessly without running out of memory?', a: 'The cave is a list of thin vertical slices, each with a ceiling and floor height. As the world scrolls, slices that move off the left edge are removed from the front of the array and new ones are appended at the right. This keeps a constant, small number of slices in memory regardless of how far you fly, and the new slices are generated on the fly by meandering the cave centre with a bounded random walk.' },
      { q: 'Why does the game get harder the further I go?', a: 'Two values scale continuously with distance flown: the scroll speed increases, so the cave rushes past faster, and the vertical gap between ceiling and floor shrinks toward a minimum, so there is less room to manoeuvre. Together they make the late cave demand much finer button control than the wide, slow opening stretch, which is what gives a one-button game a difficulty curve.' },
      { q: 'Does my best distance persist across reloads?', a: 'Yes. The best distance is stored in localStorage under cave-flyer-best and read on load, so it survives reloads and browser restarts on the same browser and origin. The read and write are wrapped in try/catch so the game still runs in sandboxed or private contexts where storage access can throw.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the gravity-vs-lift one-axis physics, the single flying flag shared across button/keyboard/canvas, and the recycling random-walk cave. It is a strong base to extend: ask for collectible fuel or coins in the gap, a cave that occasionally forks into two paths, moving gates you must time, a parallax rock background, or a gentle screen shake on near-misses. You could also ask it to add a difficulty select that tunes gravity and the narrowing rate, or to port the loop into a React component using useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly one-button cave-flying game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- The craft moves only vertically and is controlled by a single hold input: while held, add an upward lift acceleration to its velocity each frame; while released, add a downward gravity acceleration. Clamp the velocity and integrate into position so the feel is analog (feather to hover), not fixed up/down speed.
- Route the single control through one boolean flag set true on press and false on release, bound to a dedicated hold button, to the canvas itself (tap anywhere), AND to Space/Up on the keyboard. Release on pointerup, pointercancel and pointerleave everywhere so thrust never sticks on.
- Generate the cave as a list of thin vertical slices, each with a ceiling and floor height. Meander the cave centre with a bounded random walk so the tunnel curves smoothly, and occasionally add a stalactite/stalagmite obstacle jutting into the gap. As the world scrolls, remove slices off the left and append new ones on the right so memory stays bounded.
- Test collision only against the single slice under the craft's fixed x — ceiling, floor and any obstacle. Make the scroll speed increase and the gap narrow continuously with distance flown.
- Use requestAnimationFrame with delta-time scaling. Score by distance, shown live, and persist the best in localStorage with defensive try/catch. Show start and game-over overlays, and draw the cave walls as filled polygons traced along the slice tops and bottoms.`,
    },
  },
};

export default caveFlyerGame;
