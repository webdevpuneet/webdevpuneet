const dotMuncherGame = {
  id: 'dot-muncher-game',
  title: 'Dot Muncher Maze Game',
  lastmod: '2026-08-16',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🟡</span>
      <h2>Dot Muncher</h2>
    </div>
    <div class="stat-badges">
      <span class="badge">Lvl <b id="level">1</b></span>
      <span class="badge">Best <b id="best-score">0</b></span>
    </div>
  </div>

  <div class="canvas-wrap">
    <canvas id="game-canvas" width="304" height="336"></canvas>
    <div class="hud">
      <span id="hud-score">0</span>
      <span class="lives" id="hud-lives">🟡🟡🟡</span>
    </div>
    <div class="overlay" id="start-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Dot Muncher</p>
        <p class="overlay-sub">Eat every dot with the D-pad. Grab a power pellet to turn the ghosts blue and chomp them. Don't get caught.</p>
        <button class="btn btn-primary" id="btn-start">Start</button>
      </div>
    </div>
    <div class="overlay hidden" id="gameover-overlay">
      <div class="overlay-card">
        <p class="overlay-title">Game Over</p>
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
    <div class="tip-box">Power pellets turn the hunters into the hunted — for a few seconds.</div>
  </div>

  <p class="hint-text">Keyboard: arrow keys / WASD to steer</p>
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
.badge b { color: #d97706; }

.canvas-wrap { position: relative; border-radius: 12px; overflow: hidden; line-height: 0; touch-action: none; background: #000; }
canvas { display: block; width: 100%; height: auto; }

.hud { position: absolute; inset: 6px 10px auto 10px; display: flex; align-items: center; justify-content: space-between; font-size: 13px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; text-shadow: 0 1px 4px rgba(0,0,0,0.7); pointer-events: none; }
.lives { font-size: 11px; letter-spacing: 1px; }

.overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 21px; font-weight: 800; color: #fde047; margin-bottom: 8px; }
.overlay-sub { font-size: 13px; color: #cbd5e1; margin-bottom: 4px; max-width: 290px; }
.overlay-best { font-size: 12px; color: #fbbf24; font-weight: 700; margin: 6px 0 0; min-height: 16px; }

.btn { padding: 11px 26px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; margin-top: 14px; }
.btn-primary { background: #d97706; color: #fff; }
.btn-primary:hover { background: #b45309; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 14px; margin-top: 14px; }
.dpad-cross { display: grid; grid-template-columns: repeat(3, 46px); grid-template-rows: repeat(3, 46px); gap: 4px; flex-shrink: 0; }
.ctrl-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; color: #334155; font-size: 18px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; transition: transform 0.06s, background 0.12s; }
.ctrl-btn:active { transform: translateY(2px); box-shadow: none; background: #fef3c7; }
.ctrl-btn.up { grid-column: 2; grid-row: 1; }
.ctrl-btn.left { grid-column: 1; grid-row: 2; }
.ctrl-btn.right { grid-column: 3; grid-row: 2; }
.ctrl-btn.down { grid-column: 2; grid-row: 3; }
.tip-box { font-size: 12px; font-weight: 600; color: #92400e; background: #fef3c7; border-radius: 12px; padding: 10px 12px; line-height: 1.4; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const TS = 16;
const BEST_KEY = 'dot-muncher-best';

// Maze: # wall, . dot, o power pellet, space empty, P player start.
// The board is cleaned at load: unreachable dots are removed and ghosts are
// spawned on a reachable tile, so the game is always winnable.
const MAZE = [
  '###################',
  '#........#........#',
  '#o##.###.#.###.##o#',
  '#.................#',
  '#.##.#.#####.#.##.#',
  '#....#...#...#....#',
  '####.###.#.###.####',
  '#.......#.#.......#',
  '#.###.#######.###.#',
  '#.................#',
  '#.###.##.#.##.###.#',
  '#....#..#.#..#....#',
  '####.#.#####.#.####',
  '#........#........#',
  '#.##.###.#.###.##.#',
  '#o.#.....P.....#.o#',
  '##.#.#.#####.#.#.##',
  '#....#...#...#....#',
  '#.######.#.######.#',
  '#.................#',
  '###################',
];
const COLS = MAZE[0].length, ROWS = MAZE.length;
const W = COLS * TS, H = ROWS * TS;

const DIRS = [{ x: 0, y: -1 }, { x: 0, y: 1 }, { x: -1, y: 0 }, { x: 1, y: 0 }];
const GHOST_COLORS = ['#ef4444', '#ec4899', '#22d3ee'];
const GHOST_CORNERS = [{ c: COLS - 2, r: 1 }, { c: 1, r: 1 }, { c: 1, r: ROWS - 2 }];

let grid, dots, dotsLeft, player, ghosts, playerSpawn, ghostSpawn;
let score, lives, level, running, rafId, lastFrame;
let modeTime, frightTime, mouth;

const startOverlay = document.getElementById('start-overlay');
const gameoverOverlay = document.getElementById('gameover-overlay');
const hudScore = document.getElementById('hud-score');
const hudLives = document.getElementById('hud-lives');
const levelEl = document.getElementById('level');
const bestEl = document.getElementById('best-score');
const finalEl = document.getElementById('final-score');
const bestMsgEl = document.getElementById('best-msg');

function getBest() { try { return parseInt(localStorage.getItem(BEST_KEY)) || 0; } catch (e) { return 0; } }
function setBest(v) { try { localStorage.setItem(BEST_KEY, String(v)); } catch (e) {} }

function isWall(c, r) { return c < 0 || c >= COLS || r < 0 || r >= ROWS || grid[r][c] === '#'; }
function center(c, r) { return { x: c * TS + TS / 2, y: r * TS + TS / 2 }; }

// Parse the maze into a wall grid + a dot grid, find the player start, then BFS
// from it to keep only reachable dots and choose a reachable ghost spawn tile.
function buildMaze() {
  grid = MAZE.map(row => row.padEnd(COLS, '#').slice(0, COLS).split(''));
  dots = [];
  playerSpawn = { c: 1, r: 1 };
  for (let r = 0; r < ROWS; r++) {
    dots[r] = [];
    for (let c = 0; c < COLS; c++) {
      const ch = grid[r][c];
      if (ch === 'P') { playerSpawn = { c, r }; grid[r][c] = ' '; }
      dots[r][c] = ch === '.' ? 1 : ch === 'o' ? 2 : 0;
      if (ch === '#') continue; else grid[r][c] = grid[r][c] === '#' ? '#' : ' ';
    }
  }
  // Rebuild walls cleanly (everything not '#' is a corridor)
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      grid[r][c] = MAZE[r] && MAZE[r][c] === '#' ? '#' : ' ';

  // BFS reachability from the player start
  const seen = Array.from({ length: ROWS }, () => new Array(COLS).fill(false));
  const q = [playerSpawn]; seen[playerSpawn.r][playerSpawn.c] = true;
  while (q.length) {
    const t = q.shift();
    for (const d of DIRS) {
      const nc = t.c + d.x, nr = t.r + d.y;
      if (!isWall(nc, nr) && !seen[nr][nc]) { seen[nr][nc] = true; q.push({ c: nc, r: nr }); }
    }
  }
  dotsLeft = 0;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (!seen[r][c]) dots[r][c] = 0;             // drop unreachable dots
      if (dots[r][c]) dotsLeft++;
    }

  // Ghost spawn: nearest reachable tile to the maze centre
  ghostSpawn = playerSpawn;
  let bestD = Infinity;
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (seen[r][c]) {
        const d = Math.abs(c - COLS / 2) + Math.abs(r - ROWS / 2);
        if (d < bestD) { bestD = d; ghostSpawn = { c, r }; }
      }
}

function makeMover(c, r, speed) { return { c, r, dir: { x: 0, y: 0 }, prog: 0, speed, px: 0, py: 0 }; }

function resetPositions() {
  player = makeMover(playerSpawn.c, playerSpawn.r, 6.2);
  player.want = { x: -1, y: 0 };
  const gspeed = 4.8 + (level - 1) * 0.25;
  ghosts = GHOST_COLORS.map((col, i) => {
    const g = makeMover(ghostSpawn.c, ghostSpawn.r, gspeed);
    g.color = col; g.corner = GHOST_CORNERS[i % GHOST_CORNERS.length]; g.idx = i;
    g.frightened = false; g.release = i * 0.6; g.baseSpeed = gspeed;
    return g;
  });
  syncPos(player); ghosts.forEach(syncPos);
  modeTime = 0; frightTime = 0;
}

function resetState() {
  buildMaze();
  score = 0; lives = 3; level = 1;
  resetPositions(); syncHud();
}

function syncHud() {
  hudScore.textContent = score;
  hudLives.textContent = '🟡'.repeat(Math.max(0, lives));
  levelEl.textContent = level;
}

function syncPos(e) { const cen = center(e.c, e.r); e.px = cen.x + e.dir.x * e.prog * TS; e.py = cen.y + e.dir.y * e.prog * TS; }

function open(e, d) { return !isWall(e.c + d.x, e.r + d.y); }
function isReverse(a, b) { return a.x === -b.x && a.y === -b.y; }

function ghostTarget(g) {
  const scatter = (modeTime % 27) < 7;      // 7s scatter, 20s chase, repeating
  if (scatter) return g.corner;
  if (g.idx === 0) return { c: player.c, r: player.r };
  if (g.idx === 1) return { c: player.c + player.dir.x * 3, r: player.r + player.dir.y * 3 };
  const far = Math.abs(g.c - player.c) + Math.abs(g.r - player.r) > 6;
  return far ? { c: player.c, r: player.r } : g.corner;
}

function decidePlayer() {
  if (player.want && open(player, player.want)) player.dir = player.want;
  else if (!open(player, player.dir)) player.dir = { x: 0, y: 0 };
}

function decideGhost(g) {
  const cands = DIRS.filter(d => open(g, d) && !isReverse(d, g.dir));
  const list = cands.length ? cands : DIRS.filter(d => open(g, d));
  if (!list.length) { g.dir = { x: 0, y: 0 }; return; }
  if (g.frightened) { g.dir = list[(Math.random() * list.length) | 0]; return; }
  const tgt = ghostTarget(g);
  let best = list[0], bestD = Infinity;
  for (const d of list) {
    const nc = g.c + d.x, nr = g.r + d.y;
    const dist = (nc - tgt.c) * (nc - tgt.c) + (nr - tgt.r) * (nr - tgt.r);
    if (dist < bestD) { bestD = dist; best = d; }
  }
  g.dir = best;
}

function eatAt(c, r) {
  if (dots[r][c] === 1) { dots[r][c] = 0; score += 10; dotsLeft--; }
  else if (dots[r][c] === 2) { dots[r][c] = 0; score += 50; dotsLeft--; frightTime = 6; ghosts.forEach(g => g.frightened = true); }
  if (dotsLeft <= 0) { level++; nextLevel(); }
}

function stepMover(e, dt, isPlayer) {
  // Responsive reversal for the player (turn back mid-corridor)
  if (isPlayer && (e.dir.x || e.dir.y) && e.want && isReverse(e.want, e.dir)) {
    e.c += e.dir.x; e.r += e.dir.y; e.dir = e.want; e.prog = 1 - e.prog;
  }
  if (!e.dir.x && !e.dir.y) { isPlayer ? decidePlayer() : decideGhost(e); if (!e.dir.x && !e.dir.y) { syncPos(e); return; } }
  e.prog += e.speed * dt;
  let guard = 0;
  while (e.prog >= 1 && guard++ < 8) {
    e.prog -= 1;
    e.c += e.dir.x; e.r += e.dir.y;
    if (isPlayer) eatAt(e.c, e.r);
    isPlayer ? decidePlayer() : decideGhost(e);
    if (!e.dir.x && !e.dir.y) { e.prog = 0; break; }
  }
  syncPos(e);
}

function update(dt) {
  mouth += dt * 10;
  modeTime += dt;
  if (frightTime > 0) { frightTime -= dt; if (frightTime <= 0) ghosts.forEach(g => g.frightened = false); }

  stepMover(player, dt, true);
  ghosts.forEach(g => {
    if (g.release > 0) { g.release -= dt; return; }
    g.speed = g.frightened ? g.baseSpeed * 0.6 : g.baseSpeed;
    stepMover(g, dt, false);
  });

  // Collisions
  for (const g of ghosts) {
    if (g.release > 0) continue;
    if (Math.hypot(g.px - player.px, g.py - player.py) < TS * 0.7) {
      if (g.frightened) { score += 200; g.frightened = false; g.c = ghostSpawn.c; g.r = ghostSpawn.r; g.prog = 0; g.dir = { x: 0, y: 0 }; g.release = 0.4; syncPos(g); }
      else return loseLife();
    }
  }
  syncHud();
}

function nextLevel() {
  buildMazeDotsOnly();
  resetPositions();
}

// Refill dots for a new level without re-running the full parse (walls unchanged)
function buildMazeDotsOnly() {
  const saved = grid;
  buildMaze();
  grid = saved; // keep the same walls
}

function loseLife() {
  lives--; syncHud();
  if (lives <= 0) { endGame(); return; }
  resetPositions();
}

function draw() {
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);

  // Walls
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (grid[r][c] === '#') {
        ctx.fillStyle = '#1e3a8a';
        ctx.fillRect(c * TS + 1, r * TS + 1, TS - 2, TS - 2);
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(c * TS + 3, r * TS + 3, TS - 6, TS - 6);
      }

  // Dots
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++) {
      if (!dots[r][c]) continue;
      const cen = center(c, r);
      ctx.fillStyle = '#fcd34d';
      ctx.beginPath();
      if (dots[r][c] === 2) { const p = 3 + Math.sin(mouth * 1.5) * 1.5; ctx.arc(cen.x, cen.y, p + 2, 0, Math.PI * 2); }
      else ctx.arc(cen.x, cen.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }

  // Ghosts
  ghosts.forEach(g => {
    const blink = g.frightened && frightTime < 2 && (Math.floor(frightTime * 6) % 2 === 0);
    ctx.fillStyle = g.frightened ? (blink ? '#e2e8f0' : '#3730a3') : g.color;
    const x = g.px, y = g.py, rad = TS * 0.45;
    ctx.beginPath();
    ctx.arc(x, y - 1, rad, Math.PI, 0);
    ctx.lineTo(x + rad, y + rad);
    for (let i = 0; i < 3; i++) { ctx.lineTo(x + rad - (i + 0.5) * (rad * 2 / 3), y + rad - 3); ctx.lineTo(x + rad - (i + 1) * (rad * 2 / 3), y + rad); }
    ctx.closePath(); ctx.fill();
    // eyes
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(x - 4, y - 2, 3, 0, Math.PI * 2); ctx.arc(x + 4, y - 2, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = g.frightened ? '#fff' : '#1e293b';
    ctx.beginPath(); ctx.arc(x - 4 + g.dir.x * 1.5, y - 2 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2); ctx.arc(x + 4 + g.dir.x * 1.5, y - 2 + g.dir.y * 1.5, 1.5, 0, Math.PI * 2); ctx.fill();
  });

  // Player with animated mouth facing its direction
  const a = Math.abs(Math.sin(mouth)) * 0.32 + 0.02;
  let ang = 0;
  if (player.dir.x === 1) ang = 0; else if (player.dir.x === -1) ang = Math.PI;
  else if (player.dir.y === 1) ang = Math.PI / 2; else if (player.dir.y === -1) ang = -Math.PI / 2;
  ctx.fillStyle = '#fde047';
  ctx.beginPath();
  ctx.moveTo(player.px, player.py);
  ctx.arc(player.px, player.py, TS * 0.48, ang + a * Math.PI, ang + (2 - a) * Math.PI);
  ctx.closePath(); ctx.fill();
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
  resetState(); running = true; lastFrame = 0; mouth = 0;
  startOverlay.classList.add('hidden');
  gameoverOverlay.classList.add('hidden');
  rafId = requestAnimationFrame(loop);
}

function endGame() {
  running = false; cancelAnimationFrame(rafId); draw();
  const best = getBest();
  finalEl.textContent = 'Score ' + score + ' · Level ' + level;
  if (score > best) { setBest(score); bestEl.textContent = score; bestMsgEl.textContent = '🏆 New high score!'; }
  else bestMsgEl.textContent = '';
  gameoverOverlay.classList.remove('hidden');
}

// ── Input: keyboard ──
const KEY = { ArrowUp: { x: 0, y: -1 }, ArrowDown: { x: 0, y: 1 }, ArrowLeft: { x: -1, y: 0 }, ArrowRight: { x: 1, y: 0 }, w: { x: 0, y: -1 }, s: { x: 0, y: 1 }, a: { x: -1, y: 0 }, d: { x: 1, y: 0 } };
document.addEventListener('keydown', e => { if (KEY[e.key] && player) { player.want = KEY[e.key]; e.preventDefault(); } });

// ── Input: on-screen D-pad (sets the queued direction, which persists) ──
function steer(id, d) {
  const el = document.getElementById(id);
  el.addEventListener('pointerdown', e => { e.preventDefault(); if (player) player.want = d; });
  el.addEventListener('contextmenu', e => e.preventDefault());
}
steer('btn-up', { x: 0, y: -1 }); steer('btn-down', { x: 0, y: 1 });
steer('btn-left', { x: -1, y: 0 }); steer('btn-right', { x: 1, y: 0 });

document.getElementById('btn-start').addEventListener('click', startGame);
document.getElementById('btn-retry').addEventListener('click', startGame);

bestEl.textContent = getBest();
resetState();
draw();`,

  seo: {
    title: 'Dot Muncher Maze Game — Free HTML CSS JS Snippet',
    description: 'A mobile-friendly Pac-Man-style maze-chase game on canvas with a four-way D-pad, dot eating, power pellets, ghost chase AI with scatter/chase/frightened modes, lives and a localStorage high score. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Dot Muncher — Grid-Locked Movement, Ghost Chase AI and a Self-Healing Maze',
      description: `The maze-chase arcade formula — eat every dot while being hunted through a grid, with power pellets that briefly reverse the roles — packs an unusual amount of game programming into a small board: tile-locked movement that turns cleanly at intersections, several ghosts each running their own targeting behaviour, a global mode timer, and a win condition that depends on the maze actually being solvable. This snippet builds the whole thing on one HTML5 \`<canvas>\` with a four-way D-pad, and adds a robustness trick that makes the maze self-healing.

**Tile-locked movement with progress between tiles**

Every mover — the player and each ghost — is stored as a current tile (\`c\`, \`r\`), a direction, and a \`prog\` value from 0 to 1 representing how far it has travelled toward the next tile. Its pixel position is just the tile centre plus \`dir * prog * TS\`. Each frame \`prog\` advances by \`speed * dt\`, and when it crosses 1 the mover snaps onto the next tile and makes a decision. This tile-hop model means an entity can only ever turn at a tile centre and can never clip through a wall, no matter the frame rate — the essential property a maze game needs, and something a free-floating velocity model gets wrong.

**Direction buffering and instant reversal**

The player's D-pad and keyboard don't turn immediately — they set a *queued* \`want\` direction, and at each tile the game turns into it only if that way is open. That buffering is why the game feels forgiving: you can press up just before the corridor opens and the turn still lands. Reversing direction is special-cased to happen instantly mid-corridor, because turning back the way you came is always legal and should feel immediate.

**Three ghosts, three targeting rules**

Each ghost picks its direction at every tile by choosing, among the open non-reverse exits, the one that gets it closest to a *target tile*. What differs is the target. A global timer cycles between **scatter** (each ghost heads for its own corner) and **chase**. In chase, the first ghost targets the player directly, the second aims a few tiles *ahead* of the player's heading to cut you off, and the third switches between chasing and retreating depending on how close it is. Eating a **power pellet** flips every ghost to **frightened**: they slow down, move randomly, turn blue, and can be eaten for bonus points before the timer runs out and they flash back.

**A self-healing, always-winnable maze**

Because the win condition is "no dots left", an unreachable dot in a hand-drawn maze would make the game impossible. At load, \`buildMaze()\` flood-fills (BFS) from the player's start over every non-wall tile, clears any dot that wasn't reached, and counts only the reachable ones — so the board is guaranteed solvable however the ASCII maze was drawn. The same reachability pass picks a valid, reachable centre tile to spawn the ghosts, so they can always roam. Movement is delta-time scaled, lives and levels are tracked, and the best score persists to \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start the maze', text: 'Tap "Start" to call startGame(), which parses the maze, flood-fills to keep only reachable dots, spawns the muncher and three ghosts, and begins the delta-time loop.' },
        { title: 'Steer with the D-pad', text: 'Tap ▲ ◀ ▶ ▼ (or arrow keys / WASD) to set your direction. The input is buffered — the muncher turns into it at the next tile where that way is open — and reversing is instant, so pressing back the way you came flips you immediately.' },
        { title: 'Eat every dot', text: 'Travel the corridors to eat all the small dots (10 points each). Clearing every dot advances you to the next level, which refills the board and speeds the ghosts up.' },
        { title: 'Use the power pellets', text: 'The four large flashing pellets (50 points) turn all ghosts blue and frightened for a few seconds. While blue they slow down and flee; touch one to eat it for 200 points, sending it back to the centre.' },
        { title: 'Avoid the ghosts', text: 'When not frightened, a ghost touching you costs one of your three lives and resets everyone to their start tiles. Each ghost hunts differently — one chases directly, one tries to cut you off, one wavers — so read their colours.' },
        { title: 'Beat your high score', text: 'Survive, clear levels, and rack up points; the best persists in localStorage under dot-muncher-best. Redraw the MAZE array to design your own board — unreachable dots are cleaned automatically, so you cannot make it unwinnable.' },
      ],
    },
    features: [
      'Four-way on-screen D-pad plus keyboard/WASD, with buffered turning and instant reversal for a forgiving feel',
      'Tile-locked movement (current tile + 0..1 progress) so entities turn only at intersections and never clip walls at any frame rate',
      'Three ghosts with distinct targeting: direct chase, ambush-ahead, and a chase/retreat waverer',
      'Global scatter/chase mode timer plus a frightened mode from power pellets, with slowed random flight and end-of-timer blinking',
      'Self-healing maze: a BFS from the player start removes unreachable dots and picks a reachable ghost spawn, guaranteeing the board is winnable',
      'Dot, power-pellet and ghost scoring, three lives, and levels that refill the board and speed ghosts up',
      'Delta-time scaled simulation with an animated muncher mouth and classic ghost rendering',
      'Persisted high score via localStorage with defensive try/catch guards',
    ],
    useCases: [
      { icon: 'APP', title: 'Grid-maze touch control template', desc: 'The buffered four-way D-pad with instant reversal is a reusable control layout for any tile-maze touch game, and demonstrates direction queuing that feels responsive on a phone.' },
      { icon: 'LEARN', title: 'Teaching tile-locked movement and chase AI', desc: 'The progress-between-tiles mover and the target-tile greedy ghost AI are compact, readable references for two techniques behind most grid games, with no engine involved.' },
      { icon: 'CODE', title: 'Starting point for a fuller maze-chase game', desc: 'The mode timer, ghost targeting and self-healing maze generalise to a fourth ghost, a ghost house with release logic, bonus fruit, or multiple hand-drawn boards.' },
      { icon: 'FORM', title: 'Instantly playable retro arcade demo', desc: 'A self-contained maze-chase clone with no assets to download starts immediately — a strong embeddable demo for a games portal, blog, or landing page.' },
      { icon: 'FLOW', title: 'Engaging empty-state or 404 filler', desc: 'With no network dependency it makes an interactive distraction on an error or loading screen, like the [Maze Runner Arrow-Key Game](/ui-snippets/maze-runner-game).' },
      { icon: 'DESIGN', title: 'ASCII-to-canvas level rendering reference', desc: 'Parsing an ASCII maze into wall and dot grids, then rendering blocks, dots and sprites, is a directly reusable pattern for any tile-based canvas layout.' },
    ],
    faqs: [
      { q: 'How does the muncher turn cleanly at corners instead of clipping walls?', a: 'Every entity uses tile-locked movement: it stores the tile it is on, a direction, and a progress value from 0 to 1 toward the next tile, with its pixel position derived from those. Turns and wall checks only happen when progress crosses 1 and the entity snaps onto the next tile. Because it can never be partway through a wall, it turns cleanly at intersections and never clips, regardless of frame rate — unlike a free-floating velocity model.' },
      { q: 'Why does pressing a direction slightly early still work?', a: 'Input is buffered rather than applied instantly. The D-pad and keyboard set a queued want direction, and at each tile the muncher turns into it only if that path is open. So if you press up a fraction before reaching the opening, the turn is remembered and executed the moment the corridor allows it. Reversing direction is special-cased to apply immediately, since turning back is always legal.' },
      { q: 'How do the ghosts decide where to go?', a: 'At each tile a ghost looks at its open exits (excluding an immediate U-turn) and picks the one that minimises the distance to a target tile. A global timer alternates scatter mode (each ghost targets its own corner) with chase mode. In chase, one ghost targets your tile directly, one targets a few tiles ahead of your heading to ambush you, and one alternates between chasing and retreating based on distance — so they cover the board instead of following identical paths.' },
      { q: 'What do the power pellets do?', a: 'Eating one of the large flashing pellets sets every ghost to frightened for a few seconds: they slow down, choose directions randomly, and turn blue. During that window touching a ghost eats it for 200 points and sends it back to the centre spawn instead of costing you a life. As the timer runs out the ghosts blink to warn you before they become dangerous again.' },
      { q: 'What if I draw a maze with dots that cannot be reached?', a: 'The game cleans the board at load. It runs a breadth-first flood fill from the player start over all corridor tiles, removes any dot that was not reached, and counts only reachable dots toward the win condition — so the level is always winnable no matter how the ASCII maze is drawn. The same pass also chooses a reachable centre tile to spawn the ghosts, so they can always move.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the tile-locked mover (current tile plus 0..1 progress), the buffered-turn-and-instant-reversal input, the target-tile ghost AI with scatter/chase/frightened modes, and the BFS that makes the maze self-healing. It is a strong base to extend: ask for a fourth ghost with its own targeting, a proper ghost house with staggered release and a return-to-house state for eaten ghosts, bonus fruit that appears mid-level, a side tunnel with screen wrap, or multiple hand-drawn boards selected by level. You could also ask it to add swipe controls as an alternative to the D-pad, or to port the loop into a React component with useRef and useEffect. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a mobile-friendly Pac-Man-style maze-chase game on an HTML5 canvas in plain HTML, CSS and JavaScript — no frameworks. Use a generic name and art (do not copy trademarked characters).

Requirements:
- Parse an ASCII maze (walls, dots, power pellets, a player start) into wall and dot grids. At load, run a BFS flood fill from the player start, remove any unreachable dots, count only reachable ones for the win condition, and pick a reachable centre tile to spawn the ghosts — so the board is always winnable.
- Use tile-locked movement for the player and ghosts: store a current tile, a direction, and a progress value from 0 to 1 toward the next tile, deriving pixel position from those. Only turn and test walls when progress crosses a tile boundary, so entities turn cleanly at intersections and never clip walls at any frame rate.
- Controls: a four-way on-screen D-pad plus keyboard arrows/WASD. Buffer the input as a queued direction applied at the next open tile, and make reversing direction instant. Provide these on touch and desktop from the same state.
- Add three ghosts that each pick, at every tile, the open non-reverse exit minimising distance to a target tile. Cycle a global timer between scatter (target own corner) and chase (one targets the player, one aims ahead to ambush, one alternates chase/retreat). Power pellets set all ghosts frightened for a few seconds: slower, random movement, edible for bonus points, with an end-of-timer blink.
- Track score (dots, pellets, eaten ghosts), three lives with position resets on death, and levels that refill dots and speed ghosts up. Use requestAnimationFrame with delta-time scaling, persist the high score in localStorage with defensive try/catch, and show start / game-over overlays with an animated muncher mouth.`,
    },
  },
};

export default dotMuncherGame;
