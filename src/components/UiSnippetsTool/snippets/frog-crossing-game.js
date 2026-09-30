const frogCrossingGame = {
  id: 'frog-crossing-game',
  title: 'Frog Crossing Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🐸</span>
      <h2>Frog Crossing</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Home <b id="homes">0/4</b></span>
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="360" height="440"></canvas>
    <div class="hud">
      <span id="hud-score">0</span>
      <span class="lives" id="hud-lives">🐸🐸🐸</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Frog Crossing</p>
        <p class="overlay-sub">Hop with the arrows. Dodge the traffic, ride the logs across the river, fill all four homes.</p>
        <button class="btn btn-primary" id="btn-start">Hop in</button>
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
    <div class="dpad-cross">
      <button class="ctrl-btn up" id="btn-up" aria-label="Up">▲</button>
      <button class="ctrl-btn left" id="btn-left" aria-label="Left">◀</button>
      <button class="ctrl-btn right" id="btn-right" aria-label="Right">▶</button>
      <button class="ctrl-btn down" id="btn-down" aria-label="Down">▼</button>
    </div>
    <div class="tip-box">Ride the logs — the river is deadly on its own.</div>
  </div>

  <p class="hint-text">Keyboard: arrow keys / WASD to hop</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f0fdf4; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }

.game-card { width: 100%; max-width: 400px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.1); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.stat-badges { display: flex; gap: 6px; }
.badge { font-size: 11px; font-weight: 600; color: #475569; background: #f1f5f9; padding: 4px 9px; border-radius: 20px; white-space: nowrap; }
.badge b { color: #16a34a; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #0f172a; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 8px 12px auto 12px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.6); pointer-events: none; }
.lives { font-size: 12px; letter-spacing: 1px; }

.overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.86); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fff; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #16a34a; color: #fff; }
.btn-primary:hover { background: #15803d; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 14px; }
.dpad-cross { display: grid; grid-template-columns: repeat(3, 46px); grid-template-rows: repeat(3, 46px); gap: 4px; flex-shrink: 0; }
.ctrl-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; color: #334155; font-size: 18px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #dcfce7; }
.ctrl-btn.up { grid-column: 2; grid-row: 1; }
.ctrl-btn.left { grid-column: 1; grid-row: 2; }
.ctrl-btn.right { grid-column: 3; grid-row: 2; }
.ctrl-btn.down { grid-column: 2; grid-row: 3; }
.tip-box { font-size: 12px; font-weight: 600; color: #166534; background: #dcfce7; border-radius: 12px; padding: 10px 12px; line-height: 1.4; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const BEST_KEY = 'frog-crossing-best';

const TS = 40;                 // tile size
const COLS = W / TS, ROWS = H / TS;  // 9 x 11
const FROG = 30;

// Row layout (index 0 = top). goal, 4 water rows, safe median, 4 road rows, start.
const ROW_TYPE = ['goal', 'water', 'water', 'water', 'water', 'safe', 'road', 'road', 'road', 'road', 'safe'];
// Per-row movement config for water (logs) and road (cars): [speed px/s, gapTiles, lenTiles]
const LANES = {
  1: { speed: 55, gap: 4, len: 3 }, 2: { speed: -70, gap: 4, len: 2 },
  3: { speed: 45, gap: 5, len: 3 }, 4: { speed: -60, gap: 4, len: 2 },
  6: { speed: -90, gap: 4, len: 1 }, 7: { speed: 70, gap: 5, len: 1 },
  8: { speed: -110, gap: 6, len: 1 }, 9: { speed: 60, gap: 4, len: 2 },
};

let frog, lanes, homes, score, lives, running, rafId, lastFrame, rideVX;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const hudLives = document.getElementById('hud-lives');
const homesEl = document.getElementById('homes');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');
const overTitle = document.getElementById('over-title');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function buildLanes() {
  lanes = {};
  for (const row in LANES) {
    const cfg = LANES[row];
    const spanTiles = cfg.len + cfg.gap;
    const count = Math.ceil(COLS / spanTiles) + 1;
    const total = count * spanTiles * TS;   // full repeat length for seamless wrap
    const items = [];
    for (let i = 0; i < count; i++) items.push({ x: i * spanTiles * TS, w: cfg.len * TS });
    lanes[row] = { speed: cfg.speed, items, total };
  }
}

function resetFrog() { frog = { col: Math.floor(COLS / 2), row: ROWS - 1, x: Math.floor(COLS / 2) * TS + TS / 2, y: (ROWS - 1) * TS + TS / 2 }; rideVX = 0; }

function resetState() {
  buildLanes(); resetFrog();
  homes = [false, false, false, false];
  score = 0; lives = 3;
  syncHud();
}

function syncHud() {
  hudScore.textContent = score;
  hudLives.textContent = '🐸'.repeat(Math.max(0, lives));
  homesEl.textContent = homes.filter(Boolean).length + '/4';
}

function hop(dc, dr) {
  if (!running) return;
  const nr = Math.max(0, Math.min(ROWS - 1, frog.row + dr));
  let nx = frog.x + dc * TS;
  nx = Math.max(TS / 2, Math.min(W - TS / 2, nx));
  frog.row = nr;
  frog.x = dc !== 0 ? nx : frog.x;
  frog.y = nr * TS + TS / 2;
  if (dr < 0) score += 10;
  checkLanding();
}

// Homes sit in 4 slots across the top goal row.
function homeSlots() {
  const slots = [];
  const slotW = W / 4;
  for (let i = 0; i < 4; i++) slots.push({ cx: slotW * i + slotW / 2, i });
  return slots;
}

function checkLanding() {
  if (frog.row !== 0) return;
  // Must land in an empty home slot
  const slot = homeSlots().find(s => Math.abs(s.cx - frog.x) < TS / 2 && !homes[s.i]);
  if (slot) {
    homes[slot.i] = true; score += 100; syncHud();
    if (homes.every(Boolean)) { win(); return; }
    resetFrog();
  } else {
    die();  // hit the bank between homes or a filled home
  }
}

function update(dt) {
  const type = ROW_TYPE[frog.row];

  // Move lane items
  for (const row in lanes) {
    const ln = lanes[row];
    ln.items.forEach(it => {
      it.x += ln.speed * dt;
      if (ln.speed > 0 && it.x > W) it.x -= ln.total;
      if (ln.speed < 0 && it.x + it.w < 0) it.x += ln.total;
    });
  }

  const fr = { x: frog.x - FROG / 2, y: frog.y - FROG / 2, w: FROG, h: FROG };

  if (type === 'road') {
    const ln = lanes[frog.row];
    if (ln && ln.items.some(it => overlap(fr, it, frog.row))) return die();
    rideVX = 0;
  } else if (type === 'water') {
    const ln = lanes[frog.row];
    const log = ln ? ln.items.find(it => onLog(frog.x, it, frog.row)) : null;
    if (!log) return die();                 // in the river with no log = drown
    frog.x += ln.speed * dt;                 // ride the log
    rideVX = ln.speed;
    if (frog.x < TS / 4 || frog.x > W - TS / 4) return die();  // carried off screen
  } else {
    rideVX = 0;
  }
}

function itemRect(it, row) { const y = row * TS; return { x: it.x, y: y + 6, w: it.w, h: TS - 12 }; }
function overlap(a, it, row) { const b = itemRect(it, row); return a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y; }
function onLog(cx, it, row) { return cx > it.x + 4 && cx < it.x + it.w - 4; }

function die() {
  lives--; syncHud();
  if (lives <= 0) { endGame(false); return; }
  resetFrog();
}

function win() {
  score += 200; syncHud();
  endGame(true);
}

function draw() {
  // Lanes background
  for (let r = 0; r < ROWS; r++) {
    const t = ROW_TYPE[r];
    ctx.fillStyle = t === 'water' ? '#1d4ed8' : t === 'road' ? '#334155' : t === 'goal' ? '#14532d' : '#65a30d';
    ctx.fillRect(0, r * TS, W, TS);
    if (t === 'road') { ctx.strokeStyle = 'rgba(250,204,21,0.5)'; ctx.setLineDash([10, 10]); ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(0, r * TS + TS / 2); ctx.lineTo(W, r * TS + TS / 2); ctx.stroke(); ctx.setLineDash([]); }
  }

  // Home slots
  homeSlots().forEach(s => {
    ctx.fillStyle = homes[s.i] ? '#22c55e' : '#052e16';
    ctx.beginPath();
    if (ctx.roundRect) ctx.roundRect(s.cx - TS / 2 + 6, 6, TS - 12, TS - 12, 6); else ctx.rect(s.cx - TS / 2 + 6, 6, TS - 12, TS - 12);
    ctx.fill();
    if (homes[s.i]) { ctx.font = '18px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('🐸', s.cx, TS / 2); }
  });

  // Lane items
  for (const row in lanes) {
    const ln = lanes[row]; const isWater = ROW_TYPE[row] === 'water';
    ln.items.forEach(it => {
      const y = row * TS;
      if (isWater) { ctx.fillStyle = '#92400e'; }
      else { ctx.fillStyle = ['#ef4444', '#f97316', '#eab308', '#ec4899'][(it.x | 0) % 4]; }
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(it.x, y + 6, it.w, TS - 12, 7); else ctx.rect(it.x, y + 6, it.w, TS - 12);
      ctx.fill();
      if (isWater) { ctx.strokeStyle = 'rgba(0,0,0,0.25)'; ctx.lineWidth = 1; for (let k = 1; k < it.w / TS; k++) { ctx.beginPath(); ctx.moveTo(it.x + k * TS, y + 8); ctx.lineTo(it.x + k * TS, y + TS - 8); ctx.stroke(); } }
    });
  }

  // Frog
  ctx.font = (FROG - 4) + 'px system-ui'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText('🐸', frog.x, frog.y);
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

function endGame(won) {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = getBest();
  overTitle.textContent = won ? '🎉 All Home!' : 'Game Over';
  finalEl.textContent = 'Score ' + score;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New high score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard (discrete hops) ──
const KEY = { ArrowUp: [0, -1], ArrowDown: [0, 1], ArrowLeft: [-1, 0], ArrowRight: [1, 0], w: [0, -1], s: [0, 1], a: [-1, 0], d: [1, 0] };
document.addEventListener('keydown', e => { if (KEY[e.key]) { hop(KEY[e.key][0], KEY[e.key][1]); e.preventDefault(); } });

// ── Input: on-screen buttons (single-tap hops on pointerdown) ──
function tap(id, dc, dr) {
  const el = document.getElementById(id);
  el.addEventListener('pointerdown', e => { e.preventDefault(); hop(dc, dr); });
  el.addEventListener('contextmenu', e => e.preventDefault());
}
tap('btn-up', 0, -1); tap('btn-down', 0, 1); tap('btn-left', -1, 0); tap('btn-right', 1, 0);

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Frog Crossing Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly Frogger-style canvas game with a four-way on-screen D-pad, traffic lanes to dodge, a river of logs to ride, four homes to fill, lives and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Frog Crossing — Grid Hops, Traffic Lanes and a River You Have to Ride',
      description: `Frogger is the definitive grid-hop game, and its brilliance is that it has *two opposite* hazard rules on the same board: on the road, touching a moving object kills you, and on the river, *not* touching one kills you. Teaching a player to read which rule applies to the row they're on — while every row scrolls at a different speed and direction — is the whole game, and it maps perfectly onto a four-way D-pad of discrete hops. This snippet builds it on one HTML5 \`<canvas>\`: hop up through four road lanes and four river lanes, ride the logs across the water, and fill all four homes at the top.

**Discrete grid hops, not continuous movement**

Unlike a runner or a platformer, the frog doesn't move smoothly — each button press is one hop of exactly one tile, fired on \`pointerdown\` through a tiny \`tap()\` helper. The frog tracks a grid \`row\` and a pixel \`x\`; hopping up or down changes the row, hopping left or right shifts \`x\` by one tile clamped to the board. Keyboard arrows and WASD call the same \`hop()\` function. Because movement is discrete, timing your hop into a gap is the core skill — you commit to a tile and can't take it back.

**Two collision rules, chosen by row type**

Every row carries a type — \`road\`, \`water\`, \`safe\` or \`goal\` — and \`update()\` branches on the frog's current row. On a **road** row, the frog dies if its rectangle overlaps any car (standard AABB overlap). On a **water** row, the logic inverts: the frog dies *unless* its centre is on a log, and when it is on one, the log's velocity is added to the frog's \`x\` every frame so it rides along — and if a log carries it off the edge of the screen, it drowns. That single inversion is the entire risk/reward of the river.

**Independently scrolling lanes with wrap-around**

Each moving row is configured with a signed speed, a piece length and a gap, and \`buildLanes()\` fills it with evenly spaced items that scroll and wrap: an item leaving one side re-enters on the other so the traffic and log flow is continuous and endless. Alternating lane directions and varied speeds create the staggered timing windows that make the crossing a puzzle rather than a straight sprint.

**Homes, lives and scoring**

The top row has four home slots. Landing the frog in an *empty* home fills it and resets the frog to the start; landing on the bank between homes, or on an already-filled one, costs a life. Filling all four wins the round. The frog has three lives, deaths reset it to the bottom, and the score rewards forward hops, reaching a home, and completing the board. The best score persists to \`localStorage\`, and all motion is delta-time scaled so lane speeds are consistent across refresh rates.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hop in', text: 'Tap "Hop in" to call startGame(), which builds the scrolling lanes, places the frog on the safe bank at the bottom, and starts the delta-time loop.' },
        { title: 'Move one tile per tap', text: 'Tap ▲ ◀ ▶ ▼ (or arrow keys / WASD) to hop exactly one tile. Movement is discrete — each press commits you to a tile, so time your hops into the gaps rather than holding a direction.' },
        { title: 'Cross the road', text: 'On the dark road lanes, cars are deadly on contact. Wait on a safe tile, read the gap in the next lane, and hop through it. Each lane scrolls at a different speed and direction.' },
        { title: 'Ride the river', text: 'On the blue water lanes the rule flips: the river drowns you unless you are standing on a log. Hop onto a log and it carries you sideways — but if it carries you off the screen edge, you drown, so hop off in time.' },
        { title: 'Fill all four homes', text: 'Land the frog in one of the four empty home slots at the top to score and reset to the start. Landing on the bank between homes, or on a filled home, costs a life. Fill all four to win the round.' },
        { title: 'Beat your best', text: 'You have three lives; the score rewards forward progress, reaching homes, and completing the board, and persists in localStorage under frog-crossing-best. Tune lane speeds, gaps and piece lengths in the LANES config.' },
      ],
    },
    features: [
      'Four-way on-screen cross D-pad of discrete single-tap hops (Pointer Events), plus keyboard/WASD driving the same hop() function',
      'Two opposite collision rules chosen by row type: cars kill on contact, the river kills unless you are on a log',
      'Log-riding physics — a log adds its velocity to the frog each frame, and carries it off-screen if you overstay',
      'Independently scrolling lanes with signed speeds, configurable gaps and lengths, and seamless wrap-around',
      'Four home slots to fill, with landing validation against empty vs filled vs bank',
      'Three lives, death-resets, and scoring for forward hops, homes reached and board completion',
      'Delta-time scaled lane motion for frame-rate-independent difficulty',
      'Persisted high score via localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Grid-hop touch control template', desc: 'The discrete four-way tap D-pad is a reusable control layout for any tile-based touch game — Sokoban, turn-based movement, or roguelike navigation — where each press is one committed move.' },
      { icon: 'LEARN', title: 'Teaching row-typed game logic and inverse hazards', desc: 'Branching collision on a row type, and the road-kills / water-saves inversion, are a compact lesson in how a small rule change produces completely different play on the same board.' },
      { icon: 'CODE', title: 'Starting point for a fuller Frogger', desc: 'The lane config and row types generalise to diving turtles, crocodiles in the homes, a countdown timer, bonus flies, and more lanes, without touching the delta-time loop.' },
      { icon: 'FORM', title: 'Instantly playable retro arcade demo', desc: 'A self-contained Frogger clone with no assets to download starts immediately — a strong embeddable demo for a games portal, blog, or landing page.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it makes an interactive distraction on an error or loading screen, like the [Maze Runner Arrow-Key Game](/ui-snippets/maze-runner-game).' },
      { icon: 'DESIGN', title: 'Canvas lane-and-grid rendering reference', desc: 'The row-typed background rendering, wrap-around scrolling lanes and emoji sprites are directly reusable techniques for any tile-based canvas layout.' },
      { icon: 'CODE', title: 'Related: Flexbox Alignment Game', desc: 'See the [Flexbox Alignment Game](/ui-snippets/flexbox-align-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the frog move in fixed hops instead of sliding?', a: 'Frogger is a grid game: each press is a single, committed hop of exactly one tile, fired on pointerdown. The frog stores a grid row and a pixel x; up/down changes the row, left/right shifts x by one tile clamped to the board. This discreteness is the source of the tension — you cannot nudge or cancel a hop, so reading the gap before you commit is the whole skill.' },
      { q: 'Why does the river kill me when the road did not?', a: 'The two hazard types have opposite rules, chosen by the row the frog is on. On a road row the frog dies if it overlaps any car. On a water row the logic inverts: the frog drowns unless its centre is on a log. When it is on a log, the log\'s velocity is added to the frog every frame so it rides along. That inversion is intentional and is the defining mechanic of the game.' },
      { q: 'How do the logs carry the frog?', a: 'While the frog is on a water row and standing on a log, the game adds that lane\'s signed speed to the frog\'s x position every frame, so it drifts with the log. If the drift carries the frog past the edge of the screen it drowns, which is why you must hop off a log before it reaches the far side rather than riding it all the way.' },
      { q: 'How does the traffic scroll forever without running out?', a: 'Each moving lane is built with evenly spaced items and a configured speed, length and gap. As items scroll, any that leave one side of the screen have the total lane span added or subtracted so they re-enter on the opposite side. This wrap-around recycling keeps a fixed number of items per lane while producing a continuous, endless flow of cars and logs.' },
      { q: 'Does my high score persist across reloads?', a: 'Yes. The best score is stored in localStorage under frog-crossing-best and read on load, so it survives reloads and browser restarts on the same browser and origin. The read and write are wrapped in try/catch so the game still runs in sandboxed or private contexts where storage access can throw.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the row-typed collision branching, the road-kills / water-saves inversion, and the log-riding velocity transfer. It is a strong base to extend: ask for diving turtles that submerge on a cycle, crocodiles that occupy some homes, a per-life countdown timer, bonus flies that appear in a home for extra points, or additional lanes for a taller board. You could also ask it to add swipe-gesture controls as an alternative to the D-pad, or to port the loop into a React component with useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly Frogger-style grid-crossing game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks.

Requirements:
- A frog that moves in discrete single-tile hops. Provide an on-screen four-way cross D-pad for touch AND keyboard arrows/WASD, both calling the same hop function. Each press is one committed hop (fired on pointerdown) — no held movement.
- Lay out the board in rows with types: a goal row with home slots, several water rows, a safe median, several road rows, and a start bank. Branch collision on the row type: on road rows the frog dies if it overlaps any car; on water rows the frog drowns UNLESS its centre is on a log, and while on a log the log's velocity is added to the frog each frame (and it drowns if carried off-screen).
- Give each moving lane a signed speed, piece length and gap, filled with evenly spaced items that scroll and wrap around the screen edges seamlessly.
- Put four home slots in the top row; landing in an empty home scores and resets the frog, landing on the bank between homes or on a filled home costs a life. Filling all four wins the round.
- Give three lives with death-resets, score forward hops / homes / completion, and use requestAnimationFrame with delta-time scaling so lane speeds are frame-rate-independent. Persist the high score in localStorage with defensive try/catch, and show start / game-over overlays.`,
    },
  },
};

export default frogCrossingGame;
