const mazeRunnerGame = {
  id: 'maze-runner-game',
  title: 'Maze Runner Arrow-Key Game',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🧭</span>
      <h2>Maze Runner</h2>
      <span class="lvl-badge" id="stat-level">Lv 1</span>
    </div>
    <div class="head-btns">
      <button class="mini-btn" id="btn-pause" type="button" aria-label="Pause">⏸</button>
      <button class="mini-btn" id="btn-mute" type="button" aria-label="Sound on" aria-pressed="false">🔊</button>
    </div>
  </div>

  <div class="stat-row">
    <div class="stat-box"><span class="stat-label">Time</span><span class="stat-value" id="stat-time">0.0s</span></div>
    <div class="stat-box"><span class="stat-label">Moves</span><span class="stat-value" id="stat-moves">0</span></div>
    <div class="stat-box"><span class="stat-label">Score</span><span class="stat-value" id="stat-score">0</span></div>
    <div class="stat-box"><span class="stat-label">Lives</span><span class="stat-value lives" id="stat-lives">♥♥♥</span></div>
  </div>

  <div class="maze-wrap">
    <canvas id="maze-canvas" width="420" height="420"></canvas>
    <div class="overlay" id="overlay">
      <div class="overlay-card">
        <p class="overlay-title" id="ov-title">Maze Runner</p>
        <p class="overlay-stars" id="ov-stars"></p>
        <p class="overlay-sub" id="ov-sub">Find the glowing portal. Collect gems, dodge the guards, and fight the fog. 3 stars for the shortest routes.</p>
        <div class="overlay-btns">
          <button class="btn btn-primary" id="ov-primary">Play</button>
          <button class="btn btn-ghost hidden" id="ov-secondary">Level 1</button>
        </div>
      </div>
    </div>
  </div>

  <div class="controls">
    <button class="side-btn" id="btn-hint" type="button">💡 Hint <b id="hint-count">3</b></button>
    <div class="dpad">
      <button class="dir-btn up" data-dir="1" aria-label="Up">▲</button>
      <button class="dir-btn left" data-dir="8" aria-label="Left">◀</button>
      <button class="dir-btn right" data-dir="2" aria-label="Right">▶</button>
      <button class="dir-btn down" data-dir="4" aria-label="Down">▼</button>
    </div>
    <button class="side-btn" id="btn-restart" type="button">↻ Restart</button>
  </div>

  <p class="hint-text">Arrow keys / WASD (hold to run), swipe the maze, or use the D-pad · H for a hint · P to pause</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 460px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 18px; user-select: none; -webkit-user-select: none; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }
.lvl-badge { font-size: 11px; font-weight: 800; color: #0369a1; background: #e0f2fe; padding: 3px 9px; border-radius: 20px; }
.head-btns { display: flex; gap: 6px; }
.mini-btn { width: 34px; height: 30px; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 9px; font-size: 14px; line-height: 1; cursor: pointer; }
.mini-btn[aria-pressed="true"] { opacity: 0.55; }

.stat-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
.stat-box { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 7px 4px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 2px; }
.stat-value { display: block; font-size: 15px; font-weight: 800; color: #0284c7; font-variant-numeric: tabular-nums; }
.stat-value.lives { color: #ef4444; letter-spacing: 1px; }

.maze-wrap { position: relative; border-radius: 14px; overflow: hidden; line-height: 0; touch-action: none; background: #050816; box-shadow: 0 8px 24px rgba(2,6,23,0.35); }
#maze-canvas { display: block; width: 100%; height: auto; }

.overlay { position: absolute; inset: 0; background: rgba(5,8,22,0.88); display: flex; align-items: center; justify-content: center; padding: 20px; line-height: 1.4; }
.overlay.hidden { display: none; }
.overlay-card { text-align: center; }
.overlay-title { font-size: 22px; font-weight: 800; color: #fff; margin-bottom: 6px; }
.overlay-stars { font-size: 28px; letter-spacing: 5px; color: #fbbf24; min-height: 8px; margin-bottom: 4px; }
.overlay-sub { font-size: 13px; color: #bae6fd; max-width: 300px; margin: 0 auto 4px; }
.overlay-btns { display: flex; gap: 8px; justify-content: center; margin-top: 14px; }

.btn { padding: 10px 24px; font-size: 14px; font-weight: 700; border-radius: 10px; cursor: pointer; font-family: inherit; transition: background 0.15s; border: none; }
.btn.hidden { display: none; }
.btn-primary { background: #0ea5e9; color: #fff; }
.btn-primary:hover { background: #0284c7; }
.btn-ghost { background: transparent; color: #bae6fd; border: 1px solid #0c4a6e; }
.btn-ghost:hover { border-color: #38bdf8; }

.controls { display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-top: 14px; }
.dpad { display: grid; grid-template-columns: repeat(3, 46px); grid-template-rows: repeat(3, 46px); gap: 4px; flex-shrink: 0; }
.dir-btn { -webkit-tap-highlight-color: transparent; touch-action: none; cursor: pointer; font-family: inherit; border: 1px solid #e2e8f0; border-radius: 10px; background: #f8fafc; color: #334155; font-size: 18px; font-weight: 700; box-shadow: 0 2px 0 #e2e8f0; transition: transform 0.06s, background 0.12s; }
.dir-btn:active { transform: translateY(2px); box-shadow: none; background: #e0f2fe; }
.dir-btn.up { grid-column: 2; grid-row: 1; }
.dir-btn.left { grid-column: 1; grid-row: 2; }
.dir-btn.right { grid-column: 3; grid-row: 2; }
.dir-btn.down { grid-column: 2; grid-row: 3; }
.side-btn { flex: 1; max-width: 120px; padding: 10px 8px; border: 1px solid #e2e8f0; background: #f8fafc; border-radius: 12px; font: 700 12.5px system-ui, sans-serif; color: #334155; cursor: pointer; }
.side-btn:hover:not(:disabled) { border-color: #38bdf8; color: #0284c7; }
.side-btn:disabled { opacity: 0.45; cursor: default; }
.side-btn b { color: #0284c7; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; margin-top: 10px; }`,

  js: `const $ = id => document.getElementById(id);
const canvas = $('maze-canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width, H = canvas.height;
const PROG_KEY = 'maze-runner-progress';

// Walls are bit flags on each cell; a set bit means that side is walled
const UP = 1, RIGHT = 2, DOWN = 4, LEFT = 8;
const OPP = { 1: 4, 2: 8, 4: 1, 8: 2 };
const DX = { 1: 0, 2: 1, 4: 0, 8: -1 };
const DY = { 1: -1, 2: 0, 4: 1, 8: 0 };
const DIRS = [UP, RIGHT, DOWN, LEFT];
const START_LIVES = 3, REPEAT = 0.105;

const THEMES = [
  { bg: '#050816', a: '#0b1230', b: '#0e1838', wall: '#38bdf8', glow: '#0ea5e9', player: '#67e8f9' },
  { bg: '#0d0518', a: '#1a0b2e', b: '#210f3a', wall: '#e879f9', glow: '#c026d3', player: '#f0abfc' },
  { bg: '#03110b', a: '#07200f', b: '#0a2a14', wall: '#4ade80', glow: '#16a34a', player: '#bbf7d0' },
  { bg: '#190a05', a: '#2a1208', b: '#341709', wall: '#fb923c', glow: '#ea580c', player: '#fed7aa' },
];
// Each level: bigger maze, more loops (so there is more than one route), fog of war from level 3, guards from level 4
function params(n) {
  return {
    size: Math.min(21, 7 + 2 * n),
    loop: Math.min(0.14, 0.04 + 0.015 * n),
    fog: n >= 3 ? Math.max(3.2, 5.2 - (n - 3) * 0.35) : 0,
    guards: n < 4 ? 0 : Math.min(3, 1 + Math.floor((n - 4) / 2)),
    coins: 3 + Math.floor(n / 2),
  };
}

let level = 1, score = 0, lives = START_LIVES, moves = 0, elapsed = 0, hints = 3, hintT = 0, hintPath = [], phase = 'menu';
let P, size, cell, ox, oy, grid, px, py, dxp, dyp, goalGlow = 0, coins, guards, explored, optimal, theme, mazeCv, fogR;
let trail = [], parts = [], pops = [], shake = 0, invuln = 0, banner = null, coinsGot = 0, time = 0;
let held = [], moveCd = 0, bumpCd = 0, swipe = null, muted = false, ac = null, primaryAction = null, secondaryAction = null, lastTs = 0, hintUsed = 0;

const overlay = $('overlay'), ovTitle = $('ov-title'), ovSub = $('ov-sub'), ovStars = $('ov-stars'), ovPrimary = $('ov-primary'), ovSecondary = $('ov-secondary');
const statTime = $('stat-time'), statMoves = $('stat-moves'), statScore = $('stat-score'), statLives = $('stat-lives'), statLevel = $('stat-level');
const hintBtn = $('btn-hint'), hintCount = $('hint-count'), muteBtn = $('btn-mute');

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const shuffled = a => { const r = a.slice(); for (let i = r.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [r[i], r[j]] = [r[j], r[i]]; } return r; };

// ── Progress ──
function loadProg() { try { const p = JSON.parse(localStorage.getItem(PROG_KEY)); if (p && p.stars) return p; } catch (e) {} return { max: 1, best: 0, stars: [] }; }
function saveProg() { try { localStorage.setItem(PROG_KEY, JSON.stringify(prog)); } catch (e) {} }
let prog = loadProg();
const starText = n => '★'.repeat(n) + '☆'.repeat(3 - n);

// ── Sound ──
function tone(f, dur, type, to, vol, delay) {
  if (muted) return;
  try {
    if (!ac) ac = new (window.AudioContext || window.webkitAudioContext)();
    if (ac.state === 'suspended') ac.resume();
    const t0 = ac.currentTime + (delay || 0), o = ac.createOscillator(), g = ac.createGain();
    o.type = type || 'sine'; o.frequency.setValueAtTime(f, t0);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t0 + dur);
    g.gain.setValueAtTime(vol || 0.04, t0); g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(ac.destination); o.start(t0); o.stop(t0 + dur + 0.02);
  } catch (e) {}
}
const sfx = {
  step: () => tone(300 + (moves % 5) * 12, 0.04, 'triangle', 0, 0.02),
  bump: () => tone(110, 0.07, 'square', 0, 0.025),
  coin: () => { tone(988, 0.07, 'square', 0, 0.035); tone(1318, 0.12, 'square', 0, 0.035, 0.06); },
  hint: () => [660, 880].forEach((f, i) => tone(f, 0.08, 'sine', 0, 0.04, i * 0.07)),
  hit: () => { tone(200, 0.45, 'sawtooth', 50, 0.07); },
  win: () => [523, 659, 784, 1046, 1318].forEach((f, i) => tone(f, 0.15, 'triangle', 0, 0.05, i * 0.09)),
  over: () => [392, 330, 262, 196].forEach((f, i) => tone(f, 0.2, 'triangle', 0, 0.06, i * 0.15)),
  go: () => [392, 523, 659].forEach((f, i) => tone(f, 0.1, 'triangle', 0, 0.04, i * 0.08)),
};

// ── Maze generation: a depth-first "perfect" maze, then a few walls knocked out so there are loops ──
function generateMaze(n, loop) {
  const cells = Array.from({ length: n }, () => Array.from({ length: n }, () => ({ walls: 15, visited: false })));
  const stack = [[0, 0]];
  cells[0][0].visited = true;
  while (stack.length) {
    const [cx, cy] = stack[stack.length - 1];
    let moved = false;
    for (const d of shuffled(DIRS)) {
      const nx = cx + DX[d], ny = cy + DY[d];
      if (nx < 0 || ny < 0 || nx >= n || ny >= n || cells[ny][nx].visited) continue;
      cells[cy][cx].walls &= ~d; cells[ny][nx].walls &= ~OPP[d]; cells[ny][nx].visited = true;
      stack.push([nx, ny]); moved = true;
      break;
    }
    if (!moved) stack.pop();
  }
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    if (Math.random() > loop) continue;
    const d = Math.random() < 0.5 ? RIGHT : DOWN, nx = x + DX[d], ny = y + DY[d];
    if (nx >= n || ny >= n || !(cells[y][x].walls & d)) continue;
    cells[y][x].walls &= ~d; cells[ny][nx].walls &= ~OPP[d];
  }
  return cells.map(r => r.map(c => c.walls));
}

// Breadth-first search: the shortest route between two cells (also used for the hint and the star rating)
function shortestPath(sx, sy, tx, ty) {
  const prev = new Map(), key = (x, y) => y * size + x, q = [[sx, sy]];
  prev.set(key(sx, sy), null);
  while (q.length) {
    const [x, y] = q.shift();
    if (x === tx && y === ty) break;
    for (const d of DIRS) {
      if (grid[y][x] & d) continue;
      const nx = x + DX[d], ny = y + DY[d];
      if (prev.has(key(nx, ny))) continue;
      prev.set(key(nx, ny), [x, y]); q.push([nx, ny]);
    }
  }
  const path = []; let cur = [tx, ty];
  while (cur) { path.push({ x: cur[0], y: cur[1] }); cur = prev.get(key(cur[0], cur[1])); }
  return path.reverse();
}

// ── Level setup ──
function renderMaze() {
  mazeCv = document.createElement('canvas'); mazeCv.width = W; mazeCv.height = H;
  const g = mazeCv.getContext('2d');
  g.fillStyle = theme.bg; g.fillRect(0, 0, W, H);
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) { g.fillStyle = (x + y) % 2 ? theme.a : theme.b; g.fillRect(ox + x * cell, oy + y * cell, cell, cell); }
  const sg = g.createRadialGradient(ox + cell / 2, oy + cell / 2, 0, ox + cell / 2, oy + cell / 2, cell * 0.9);
  sg.addColorStop(0, theme.glow + '66'); sg.addColorStop(1, theme.glow + '00');
  g.fillStyle = sg; g.fillRect(ox, oy, cell * 2, cell * 2);
  g.lineCap = 'round'; g.strokeStyle = theme.wall; g.lineWidth = Math.max(2, cell * 0.09); g.shadowColor = theme.glow; g.shadowBlur = 8;
  g.beginPath();
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    const w = grid[y][x], x0 = ox + x * cell, y0 = oy + y * cell;
    if (w & UP) { g.moveTo(x0, y0); g.lineTo(x0 + cell, y0); }
    if (w & LEFT) { g.moveTo(x0, y0); g.lineTo(x0, y0 + cell); }
    if (y === size - 1 && (w & DOWN)) { g.moveTo(x0, y0 + cell); g.lineTo(x0 + cell, y0 + cell); }
    if (x === size - 1 && (w & RIGHT)) { g.moveTo(x0 + cell, y0); g.lineTo(x0 + cell, y0 + cell); }
  }
  g.stroke();
}

function startLevel(n, quiet) {
  level = n; P = params(n); size = P.size; fogR = P.fog; theme = THEMES[Math.floor((n - 1) / 2) % THEMES.length];
  cell = Math.floor(W / size); ox = Math.floor((W - cell * size) / 2); oy = Math.floor((H - cell * size) / 2);
  grid = generateMaze(size, P.loop);
  px = 0; py = 0; dxp = 0; dyp = 0; moves = 0; elapsed = 0; hints = 3; hintUsed = 0; hintT = 0; hintPath = []; coinsGot = 0;
  trail = []; parts = []; pops = []; shake = 0; invuln = 0; held = []; moveCd = 0;
  optimal = shortestPath(0, 0, size - 1, size - 1).length - 1;
  explored = new Uint8Array(size * size);
  // Gems: dead ends first (the dead ends are where the maze hides things), then anywhere
  const dead = [], other = [];
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
    if ((x === 0 && y === 0) || (x === size - 1 && y === size - 1)) continue;
    const w = grid[y][x], open = DIRS.filter(d => !(w & d)).length;
    (open === 1 ? dead : other).push([x, y]);
  }
  coins = shuffled(dead).concat(shuffled(other)).slice(0, P.coins).map(c => ({ x: c[0], y: c[1], ph: Math.random() * 6 }));
  // Guards start far from you
  const far = shuffled(other.concat(dead)).filter(c => c[0] + c[1] >= size * 0.8);
  guards = far.slice(0, P.guards).map(c => ({ x: c[0], y: c[1], dx: c[0], dy: c[1], last: 0, t: Math.random() * 0.3 }));
  renderMaze(); reveal(); syncHud();
  banner = { text: 'LEVEL ' + n, sub: fogR ? 'Fog of war: you only see nearby' : 'Reach the glowing portal', t: 2 };
  phase = 'play'; overlay.classList.add('hidden'); if (!quiet) sfx.go();
}

function newRun() { score = 0; lives = START_LIVES; startLevel(1); }

function reveal() {
  if (!fogR) return;
  for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) if (Math.hypot(x - px, y - py) <= fogR) explored[y * size + x] = 1;
}
const visible = (x, y) => !fogR || Math.hypot(x - px, y - py) <= fogR;

function syncHud() {
  statTime.textContent = elapsed.toFixed(1) + 's';
  statMoves.textContent = moves;
  statScore.textContent = score;
  statLives.textContent = lives > 0 ? '♥'.repeat(lives) : '–';
  statLevel.textContent = 'Lv ' + level;
  hintCount.textContent = hints;
  hintBtn.disabled = phase !== 'play' || hints <= 0;
}

// ── Effects ──
function burst(x, y, n, colors, spd) {
  for (let i = 0; i < n && parts.length < 300; i++) {
    const a = Math.random() * 6.283, v = (0.3 + Math.random()) * (spd || 2.4);
    parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 20 + Math.random() * 20, max: 40, c: colors[(Math.random() * colors.length) | 0], s: 1.5 + Math.random() * 2 });
  }
}
function popup(x, y, text, color) { pops.push({ x, y, text, color: color || '#fde68a', t: 0.9 }); }
const cx = x => ox + (x + 0.5) * cell, cy = y => oy + (y + 0.5) * cell;

// ── Moving ──
function tryMove(dir) {
  if (phase !== 'play') return;
  if (grid[py][px] & dir) { if (bumpCd <= 0) { sfx.bump(); shake = Math.max(shake, 2.5); bumpCd = 0.12; } return; }
  px += DX[dir]; py += DY[dir]; moves++;
  trail.push({ x: cx(px), y: cy(py) }); if (trail.length > 14) trail.shift();
  sfx.step(); reveal();
  const ci = coins.findIndex(c => c.x === px && c.y === py);
  if (ci >= 0) { coins.splice(ci, 1); coinsGot++; score += 25; sfx.coin(); burst(cx(px), cy(py), 12, ['#fde047', '#fff', '#fbbf24'], 2.6); popup(cx(px), cy(py) - cell * 0.4, '+25', '#fde047'); }
  if (px === size - 1 && py === size - 1) { win(); return; }
  checkGuards();
  syncHud();
}

function checkGuards() {
  if (invuln > 0) return;
  if (guards.some(g => g.x === px && g.y === py)) hit();
}
function hit() {
  lives--; sfx.hit(); shake = 9; burst(cx(px), cy(py), 26, ['#ef4444', '#f97316', '#fff'], 3.4);
  if (lives <= 0) { gameOver(); return; }
  popup(cx(px), cy(py) - cell * 0.5, 'CAUGHT!', '#fca5a5');
  px = 0; py = 0; dxp = 0; dyp = 0; trail = []; invuln = 1.6; reveal(); syncHud();
}

function useHint() {
  if (phase !== 'play' || hints <= 0) return;
  hints--; hintUsed++; score = Math.max(0, score - 25); sfx.hint();
  hintPath = shortestPath(px, py, size - 1, size - 1); hintT = 3.2; syncHud();
}

function stepGuard(g) {
  const w = grid[g.y][g.x], opts = DIRS.filter(d => !(w & d));
  let cand = opts.filter(d => d !== OPP[g.last]);
  if (!cand.length) cand = opts;
  let d;
  if (Math.abs(g.x - px) + Math.abs(g.y - py) <= 7 && Math.random() < 0.4) {   // sometimes it heads toward you
    d = cand.slice().sort((a, b) => (Math.abs(g.x + DX[a] - px) + Math.abs(g.y + DY[a] - py)) - (Math.abs(g.x + DX[b] - px) + Math.abs(g.y + DY[b] - py)))[0];
  } else d = cand[(Math.random() * cand.length) | 0];
  g.last = d; g.x += DX[d]; g.y += DY[d];
}

// ── Win and lose ──
function win() {
  phase = 'won'; primaryAction = null; sfx.win(); syncHud();
  const ratio = moves / Math.max(1, optimal), stars = ratio <= 1.25 ? 3 : ratio <= 1.7 ? 2 : 1;
  const par = optimal * 0.55, timeBonus = Math.max(0, Math.round((par - elapsed) * 5)), pts = 100 * level + 50 * stars + timeBonus;
  score += pts;
  prog.stars[level - 1] = Math.max(prog.stars[level - 1] || 0, stars);
  prog.max = Math.max(prog.max, level + 1); prog.best = Math.max(prog.best, score); saveProg();
  burst(cx(size - 1), cy(size - 1), 60, ['#fde047', '#67e8f9', '#f0abfc', '#fff'], 4);
  banner = null; syncHud();
  setTimeout(() => {
    showOverlay('🏁 Level ' + level + ' clear!', starText(stars),
      moves + ' moves (best possible ' + optimal + ') · ' + elapsed.toFixed(1) + 's · gems ' + (coinsGot) + '/' + P.coins + ' · +' + pts + ' points',
      'Next level ▶', () => startLevel(level + 1), 'Replay', () => startLevel(level));
  }, 700);
}
function gameOver() {
  phase = 'over'; primaryAction = null; sfx.over(); prog.best = Math.max(prog.best, score); saveProg(); syncHud();
  setTimeout(() => {
    showOverlay('The guards got you', '', 'Reached level ' + level + ' · score ' + score + (score >= prog.best && score > 0 ? ' · 🏆 best!' : ''), 'Try again', newRun, null, null);
  }, 600);
}

function showOverlay(title, stars, sub, primaryLabel, onPrimary, secondaryLabel, onSecondary) {
  ovTitle.textContent = title; ovStars.textContent = stars; ovSub.textContent = sub;
  ovPrimary.textContent = primaryLabel; primaryAction = onPrimary;
  ovSecondary.classList.toggle('hidden', !secondaryLabel);
  if (secondaryLabel) ovSecondary.textContent = secondaryLabel;
  secondaryAction = onSecondary;
  overlay.classList.remove('hidden'); syncHud();
}
function showMenu() {
  phase = 'menu';
  const cont = prog.max > 1;
  showOverlay('Maze Runner', '', 'Find the glowing portal. Collect gems, dodge the guards and fight the fog. Fewer moves earn more stars.' + (prog.best ? ' Best score ' + prog.best + '.' : ''),
    cont ? 'Continue level ' + prog.max : 'Play', () => { score = 0; lives = START_LIVES; startLevel(prog.max); }, cont ? 'New run' : null, newRun);
}
function setPaused(p) {
  if (p && phase === 'play') { phase = 'paused'; held = []; showOverlay('Paused', '', 'Take a breath. The guards will wait.', 'Resume', () => setPaused(false), null, null); }
  else if (!p && phase === 'paused') { phase = 'play'; overlay.classList.add('hidden'); lastTs = 0; syncHud(); }
}

// ── Frame update ──
function update(dt) {
  time += dt;
  parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; p.life--; });
  parts = parts.filter(p => p.life > 0);
  pops.forEach(p => { p.t -= dt; p.y -= 14 * dt; }); pops = pops.filter(p => p.t > 0);
  if (banner) { banner.t -= dt; if (banner.t <= 0) banner = null; }
  if (shake > 0.2) shake *= Math.pow(0.85, dt * 60); else shake = 0;
  if (bumpCd > 0) bumpCd -= dt;
  const k = Math.min(1, dt * 16);
  dxp += (px - dxp) * k; dyp += (py - dyp) * k;
  goalGlow += dt;
  if (phase !== 'play') return;

  elapsed += dt; if (invuln > 0) invuln -= dt; if (hintT > 0) hintT -= dt;
  if (held.length) { moveCd -= dt; if (moveCd <= 0) { moveCd = REPEAT; tryMove(held[held.length - 1]); } }
  for (const g of guards) {
    g.t += dt;
    if (g.t >= Math.max(0.2, 0.36 - level * 0.012)) { g.t = 0; stepGuard(g); checkGuards(); if (phase !== 'play') return; }
    g.dx += (g.x - g.dx) * k; g.dy += (g.y - g.dy) * k;
  }
  if ((time * 10 | 0) % 2) syncHud();
}

// ── Drawing ──
function draw() {
  ctx.fillStyle = theme.bg; ctx.fillRect(0, 0, W, H);
  ctx.save();
  if (shake) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  ctx.drawImage(mazeCv, 0, 0);

  // Hint: a dashed glowing line along the shortest route
  if (hintT > 0 && hintPath.length > 1) {
    ctx.save(); ctx.globalAlpha = Math.min(1, hintT); ctx.strokeStyle = '#fde047'; ctx.lineWidth = Math.max(2, cell * 0.1); ctx.setLineDash([cell * 0.2, cell * 0.2]); ctx.lineDashOffset = -time * 30;
    ctx.shadowColor = '#fde047'; ctx.shadowBlur = 8; ctx.beginPath();
    hintPath.forEach((c, i) => { i ? ctx.lineTo(cx(c.x), cy(c.y)) : ctx.moveTo(cx(c.x), cy(c.y)); }); ctx.stroke(); ctx.restore();
  }

  // The portal
  const gx = cx(size - 1), gy = cy(size - 1), seen = !fogR || explored[(size - 1) * size + (size - 1)];
  if (seen) {
    const pg = ctx.createRadialGradient(gx, gy, 0, gx, gy, cell * 0.9); pg.addColorStop(0, '#ffffffaa'); pg.addColorStop(0.4, theme.glow + '99'); pg.addColorStop(1, theme.glow + '00');
    ctx.fillStyle = pg; ctx.fillRect(gx - cell, gy - cell, cell * 2, cell * 2);
    ctx.strokeStyle = '#fff'; ctx.lineWidth = Math.max(1.5, cell * 0.06);
    for (let i = 0; i < 3; i++) { const r = cell * (0.16 + i * 0.1) + Math.sin(goalGlow * 3 + i) * cell * 0.03; ctx.globalAlpha = 0.9 - i * 0.22; ctx.beginPath(); ctx.ellipse(gx, gy, r, r * 0.6, goalGlow * (1 + i * 0.5), 0, 6.3); ctx.stroke(); }
    ctx.globalAlpha = 1;
  }

  // Gems (they spin)
  coins.forEach(c => {
    if (!visible(c.x, c.y)) return;
    const x = cx(c.x), y = cy(c.y) + Math.sin(time * 4 + c.ph) * cell * 0.04, w = Math.max(2, Math.abs(Math.cos(time * 3 + c.ph)) * cell * 0.2);
    const gg = ctx.createRadialGradient(x, y, 0, x, y, cell * 0.4); gg.addColorStop(0, 'rgba(253,224,71,0.5)'); gg.addColorStop(1, 'rgba(253,224,71,0)');
    ctx.fillStyle = gg; ctx.fillRect(x - cell * 0.4, y - cell * 0.4, cell * 0.8, cell * 0.8);
    ctx.fillStyle = '#fbbf24'; ctx.beginPath(); ctx.moveTo(x, y - cell * 0.2); ctx.lineTo(x + w, y); ctx.lineTo(x, y + cell * 0.2); ctx.lineTo(x - w, y); ctx.fill();
    ctx.fillStyle = '#fef9c3'; ctx.fillRect(x - 1, y - cell * 0.08, 2, cell * 0.1);
  });

  // Guards
  guards.forEach(g => {
    if (!visible(g.x, g.y)) return;
    const x = cx(g.dx), y = cy(g.dy), r = cell * 0.3;
    const gg = ctx.createRadialGradient(x, y, 0, x, y, cell * 0.7); gg.addColorStop(0, 'rgba(239,68,68,0.5)'); gg.addColorStop(1, 'rgba(239,68,68,0)');
    ctx.fillStyle = gg; ctx.fillRect(x - cell, y - cell, cell * 2, cell * 2);
    ctx.fillStyle = '#1e1b4b'; ctx.strokeStyle = '#ef4444'; ctx.lineWidth = Math.max(1.5, cell * 0.06);
    ctx.beginPath(); ctx.arc(x, y - r * 0.15, r, Math.PI, 0); ctx.lineTo(x + r, y + r * 0.8);
    for (let i = 0; i < 3; i++) { ctx.lineTo(x + r - (i + 0.5) * (r * 2 / 3), y + r * 0.45 + ((Math.floor(time * 6) + i) % 2) * r * 0.25); ctx.lineTo(x + r - (i + 1) * (r * 2 / 3), y + r * 0.8); }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#fecaca'; ctx.fillRect(x - r * 0.5, y - r * 0.35, r * 0.35, r * 0.4); ctx.fillRect(x + r * 0.15, y - r * 0.35, r * 0.35, r * 0.4);
  });

  // Fog of war: unexplored cells are black, explored ones dim, the lit circle fades at its edge
  if (fogR) {
    for (let y = 0; y < size; y++) for (let x = 0; x < size; x++) {
      const d = Math.hypot(x - dxp, y - dyp);
      let a = 1;
      if (d <= fogR - 1) a = 0; else if (d <= fogR) a = (d - (fogR - 1)) * (explored[y * size + x] ? 0.62 : 1);
      else a = explored[y * size + x] ? 0.62 : 1;
      if (a > 0) { ctx.fillStyle = 'rgba(2,3,10,' + a.toFixed(2) + ')'; ctx.fillRect(ox + x * cell - 0.5, oy + y * cell - 0.5, cell + 1, cell + 1); }
    }
  }

  // Your trail and the runner
  for (let i = 1; i < trail.length; i++) { ctx.strokeStyle = theme.player; ctx.globalAlpha = (i / trail.length) * 0.35; ctx.lineWidth = cell * 0.2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(trail[i - 1].x, trail[i - 1].y); ctx.lineTo(trail[i].x, trail[i].y); ctx.stroke(); }
  ctx.globalAlpha = 1;
  const x = cx(dxp), y = cy(dyp), r = cell * 0.27;
  if (!(invuln > 0 && Math.floor(invuln * 12) % 2)) {
    const halo = ctx.createRadialGradient(x, y, 0, x, y, cell * (0.9 + Math.sin(time * 4) * 0.08)); halo.addColorStop(0, theme.player + 'aa'); halo.addColorStop(1, theme.player + '00');
    ctx.fillStyle = halo; ctx.fillRect(x - cell, y - cell, cell * 2, cell * 2);
    const og = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, r * 0.1, x, y, r); og.addColorStop(0, '#ffffff'); og.addColorStop(1, theme.player);
    ctx.fillStyle = og; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.3); ctx.fill();
  }

  ctx.globalCompositeOperation = 'lighter';
  parts.forEach(p => { ctx.globalAlpha = clamp(p.life / p.max, 0, 1); ctx.fillStyle = p.c; ctx.fillRect(p.x - p.s / 2, p.y - p.s / 2, p.s, p.s); });
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  ctx.font = '800 ' + Math.max(10, Math.round(cell * 0.32)) + 'px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  pops.forEach(p => { ctx.globalAlpha = clamp(p.t * 2, 0, 1); ctx.fillStyle = p.color; ctx.fillText(p.text, p.x, p.y); });
  ctx.globalAlpha = 1;
  ctx.restore();

  if (banner) {
    ctx.globalAlpha = clamp(banner.t * 1.6, 0, 1); ctx.textAlign = 'center'; ctx.lineWidth = 5; ctx.strokeStyle = 'rgba(2,6,23,0.8)'; ctx.fillStyle = '#fff';
    ctx.font = '900 30px system-ui, sans-serif'; ctx.strokeText(banner.text, W / 2, H / 2 - 8); ctx.fillText(banner.text, W / 2, H / 2 - 8);
    ctx.font = '700 13px system-ui, sans-serif'; ctx.fillStyle = theme.player; ctx.strokeText(banner.sub, W / 2, H / 2 + 20); ctx.fillText(banner.sub, W / 2, H / 2 + 20); ctx.globalAlpha = 1;
  }
}

function loop(ts) {
  if (!lastTs) lastTs = ts;
  const dt = Math.min((ts - lastTs) / 1000, 1 / 20);
  lastTs = ts;
  update(dt); draw();
  requestAnimationFrame(loop);
}

// ── Input: keys (hold to run), D-pad (hold to run) and swipes all feed the same tryMove ──
const KEY_DIR = { ArrowUp: UP, w: UP, W: UP, ArrowRight: RIGHT, d: RIGHT, D: RIGHT, ArrowDown: DOWN, s: DOWN, S: DOWN, ArrowLeft: LEFT, a: LEFT, A: LEFT };
function press(dir) { if (!held.includes(dir)) held.push(dir); tryMove(dir); moveCd = 0.2; }
function release(dir) { held = held.filter(d => d !== dir); }
document.addEventListener('keydown', e => {
  if (e.key === 'p' || e.key === 'P' || e.key === 'Escape') { if (phase === 'play' || phase === 'paused') setPaused(phase === 'play'); return; }
  if ((e.key === 'Enter' || e.key === ' ') && phase !== 'play') { e.preventDefault(); if (!e.repeat && primaryAction) primaryAction(); return; }
  if (phase !== 'play') return;
  if (e.key === 'h' || e.key === 'H') { useHint(); return; }
  if (e.key === 'r' || e.key === 'R') { startLevel(level); return; }
  const d = KEY_DIR[e.key];
  if (d) { e.preventDefault(); if (!e.repeat) press(d); }
});
document.addEventListener('keyup', e => { const d = KEY_DIR[e.key]; if (d) release(d); });
document.addEventListener('visibilitychange', () => { if (document.hidden) setPaused(true); });

document.querySelectorAll('.dir-btn').forEach(b => {
  const d = +b.getAttribute('data-dir');
  b.addEventListener('pointerdown', e => { e.preventDefault(); press(d); });
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => b.addEventListener(ev, () => release(d)));
  b.addEventListener('contextmenu', e => e.preventDefault());
});
canvas.addEventListener('pointerdown', e => { swipe = { x: e.clientX, y: e.clientY }; });
canvas.addEventListener('pointermove', e => {
  if (!swipe || phase !== 'play') return;
  const sx = e.clientX - swipe.x, sy = e.clientY - swipe.y, step = canvas.getBoundingClientRect().width / size * 0.8;
  if (Math.abs(sx) < step && Math.abs(sy) < step) return;
  tryMove(Math.abs(sx) > Math.abs(sy) ? (sx > 0 ? RIGHT : LEFT) : (sy > 0 ? DOWN : UP));
  swipe = { x: e.clientX, y: e.clientY };
});
['pointerup', 'pointercancel', 'pointerleave'].forEach(ev => canvas.addEventListener(ev, () => { swipe = null; }));

ovPrimary.addEventListener('click', () => primaryAction && primaryAction());
ovSecondary.addEventListener('click', () => secondaryAction && secondaryAction());
hintBtn.addEventListener('click', useHint);
$('btn-restart').addEventListener('click', () => { if (phase === 'play') startLevel(level); });
$('btn-pause').addEventListener('click', () => { if (phase === 'play' || phase === 'paused') setPaused(phase === 'play'); });
muteBtn.addEventListener('click', () => {
  muted = !muted; muteBtn.textContent = muted ? '🔇' : '🔊';
  muteBtn.setAttribute('aria-pressed', String(muted)); muteBtn.setAttribute('aria-label', muted ? 'Sound off' : 'Sound on');
});

// Show a maze behind the menu, then wait for Play
startLevel(1, true); showMenu();
requestAnimationFrame(loop);`,

  seo: {
    title: 'Maze Runner Game: Fog of War, Guards and 3-Star Levels',
    description: 'A free canvas maze game with endless levels: collect gems, dodge guards, fight the fog, use hints and swipe or hold to run. Copy the HTML, CSS and JS.',
    about: {
      title: 'Maze Runner: Generated Mazes, Fog of War, Guards and a Shortest-Path Star Rating',
      description: `A maze game is a small playground for some of the most useful algorithms in programming: generating a random maze, finding the shortest path through it, and steering simple enemies around it. This snippet turns those into a complete game on one HTML5 \`<canvas>\` with no libraries and no image files. You guide a glowing runner to a portal in the far corner of an ever bigger maze, collect gems hidden in dead ends, dodge patrolling guards, and earn up to three stars per level for taking a short route. It plays with the arrow keys or WASD (hold to run), by swiping on the maze, or with an on-screen D-pad.

**Generated mazes that are always solvable**

Each level builds a new maze with a depth-first search (a "recursive backtracker"): start in one corner, repeatedly step to a random unvisited neighbour while knocking out the wall between them, and backtrack when stuck. This produces a "perfect" maze, where exactly one path joins any two cells. Because that makes for long, winding dead ends, the generator then knocks out a few extra walls (more of them on later levels), so there is usually more than one route and choosing the best one matters. Walls are stored as four bit flags on each cell, and the maze is painted once into an off-screen canvas, with a neon glow, so each frame only draws the moving parts.

**Breadth-first search for hints and stars**

A breadth-first search from the runner to the portal returns the shortest route. The game uses it three times: at the start of a level to count the minimum number of moves, for the Hint button (which draws that route as a glowing dashed line for a few seconds, for a small score cost), and in the star rating. Finish within 25% of the minimum number of moves for three stars, within 70% for two, and any finish earns one.

**Fog of war and guards**

From level 3 the maze is dark: you only see a circle of cells around you, shrinking slightly each level, and cells you have already seen stay dimly visible so you can remember where you have been. The fog is drawn per cell with a soft edge, and gems, guards and the portal are only drawn when they are inside the light. From level 4 guards patrol the corridors one cell at a time. They never turn around unless they hit a dead end, and sometimes they head toward you when you are within seven cells. Touching one costs a life and sends you back to the start with a moment of invulnerability. You have three lives, and running out ends the run.

**Controls and feel**

Movement is cell by cell, but the drawn runner glides between cells, leaves a fading trail and bumps the screen slightly when you hit a wall. Holding a key or a D-pad button repeats the move about ten times a second, and dragging a finger across the maze moves one cell for each stretch of swipe. Gems pop in a burst of sparkles, the portal has spinning rings, each pair of levels has its own colour theme, and sound effects are made with the Web Audio API, with a mute button. The game pauses on P, the button or a tab switch, and your furthest level, stars and best score are saved in \`localStorage\`.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Start', text: 'Press Play (or Continue to resume from the furthest level you reached). Move with the arrow keys or WASD, the D-pad, or by swiping on the maze. Hold a key or button to keep running.' },
        { title: 'Find the portal', text: 'Reach the glowing portal in the bottom-right corner. Each level is a new random maze, bigger than the last, with several routes once the loops appear.' },
        { title: 'Collect gems', text: 'Gems are worth 25 points and tend to hide in dead ends, so going for them costs moves. Decide whether the points are worth the extra steps.' },
        { title: 'Beat the fog and the guards', text: 'From level 3 you can only see nearby, and from level 4 guards patrol the corridors. Touching a guard costs a life. You have three lives for the whole run.' },
        { title: 'Use a hint', text: 'Press 💡 Hint (or H) to show the shortest route for a few seconds. You get three per level and each costs 25 points.' },
        { title: 'Earn stars', text: 'Finish within 25% of the minimum number of moves for three stars. Time and level bonuses add to your score, and your stars and best score are saved in your browser.' },
      ],
    },
    features: [
      'Random mazes from a depth-first search, with extra walls removed so levels have loops and more than one route',
      'Breadth-first shortest path for the move counter, the Hint button and the three-star rating',
      'Eight and more levels that grow from 9 by 9 to 21 by 21 cells, each pair with its own neon colour theme',
      'Fog of war from level 3 with remembered cells, drawn per cell with a soft edge',
      'Patrolling guards from level 4 that sometimes chase you, three lives and a respawn with brief invulnerability',
      'Gems hidden in dead ends, a combo-free score with level and time bonuses',
      'Mazes, walls and glow pre-rendered to an off-screen canvas; a gliding runner with a fading trail',
      'Hold-to-run keys and D-pad, swipe on the maze, hint, restart, pause and mute',
      'Web Audio sound effects and saved progress (furthest level, stars, best score) in localStorage',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Learning maze generation and pathfinding', desc: 'A depth-first generator and a breadth-first solver sit in one short file, so you can see how both work on the same grid.' },
      { icon: 'CODE', title: 'A grid-game base with bit-flag walls', desc: 'Storing walls as bit flags is compact and fast, and the same structure works for dungeon crawlers, roguelikes and puzzle games.' },
      { icon: 'DESIGN', title: 'Fog of war and glow on canvas', desc: 'Per-cell fog with a soft edge and a pre-rendered neon wall layer show how to get atmosphere on a canvas cheaply.' },
      { icon: 'APP', title: 'A touch-friendly puzzle game', desc: 'Hold-to-run, swipe and a D-pad make a grid game comfortable on a phone as well as a keyboard.' },
      { icon: 'FLOW', title: 'An interactive 404 page or loading screen', desc: 'A maze is a fitting 404 page and works with no network, like the [Frog Crossing Game](/ui-snippets/frog-crossing-game/).' },
    ],
    faqs: [
      { q: 'How is the maze generated?', a: 'generateMaze() uses a depth-first search: it starts in the top-left cell and keeps moving to a random unvisited neighbour, removing the wall between the two, and backtracks when it has no unvisited neighbour. That makes a perfect maze with one route between any two cells. It then removes a random handful of extra walls (more on later levels) so that there are loops.' },
      { q: 'How are walls stored?', a: 'Each cell holds a number whose four low bits say which sides have a wall: 1 for up, 2 for right, 4 for down and 8 for left. Removing a wall clears the bit on both cells that share it. Checking whether you can move is then one bitwise AND.' },
      { q: 'How are the stars decided?', a: 'A breadth-first search finds the minimum number of moves from the start to the portal. Finishing in at most 1.25 times that gives three stars, at most 1.7 times gives two, and anything else gives one. Hints do not affect stars, but each costs 25 points.' },
      { q: 'How does the fog of war work?', a: 'From level 3, every cell further than the light radius from the runner is covered by a dark rectangle. Cells you have been near are remembered and covered by a lighter dim, and cells at the edge of the light fade in gradually. Gems, guards and the portal are only drawn inside the light (or the portal once you have seen it).' },
      { q: 'How do the guards move?', a: 'Every 0.2 to 0.35 seconds a guard takes one step along the corridors. It avoids turning back unless it reaches a dead end. When you are within seven cells it has a 40% chance to pick the open direction that gets it closest to you, otherwise it picks randomly. They never leave the maze or cut through walls.' },
      { q: 'Can I change the maze size or difficulty?', a: 'Yes: params(n) returns the size, the loop chance, the fog radius, the guard count and the gem count for level n. Change the size formula (7 + 2n, capped at 21), the fog from level 3, or the guards from level 4. The canvas is 420 pixels wide and the cell size is worked out from the maze size.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant like Claude and ask it to explain the depth-first maze generator, the bit-flag walls, the breadth-first hint and star rating, and the fog of war. It is a good base to extend: ask for keys and locked doors, a minimap, a daily seeded maze, a ghost of your best run, smarter guards that use the same pathfinding, a level editor, or a port to a React component with the game state in a ref. Treat it as a working prototype to question and rebuild.`,
      prompt: `Build a complete, level-based maze game on an HTML5 canvas in plain HTML, CSS and JavaScript, with no libraries and no image files.

Requirements:
- Random mazes generated with a depth-first search (recursive backtracker), with walls stored as four bit flags per cell, then a few extra walls removed so the maze has loops. Level n has a bigger maze (9 cells at level 1 growing to 21), more loops, and its own neon colour theme every two levels. Paint the walls (with glow) and floor once into an off-screen canvas.
- A runner that moves one cell at a time (arrow keys and WASD with hold-to-run repeat, an on-screen D-pad, and swipes on the canvas) but is drawn gliding between cells, with a fading trail and a glowing halo. A bump on a wall shakes the screen.
- Reach a glowing portal in the far corner to clear the level. A breadth-first search gives the minimum number of moves; finishing within 1.25x gives 3 stars, within 1.7x gives 2, else 1. Level, star and time bonuses add to the score.
- Gems hidden mostly in dead ends (25 points each), with sparkle bursts and floating score text.
- A Hint button (3 per level, 25 points each) and the H key that draw the shortest route as an animated dashed line for a few seconds.
- Fog of war from level 3: only cells within a radius of the runner are fully visible, explored cells stay dimly visible, and the edge of the light fades. Gems, guards and the portal are drawn only inside the light.
- Guards from level 4: they step along corridors, avoid turning back, and sometimes head toward the player within seven cells. Touching one costs a life (3 lives per run) and respawns the runner at the start with brief invulnerability.
- Start, win, game-over and pause overlays, a level banner, Web Audio sound with mute, pause on P and on tab switch, and progress (furthest level, stars, best score) saved in localStorage with try/catch.`,
    },
  },
};

export default mazeRunnerGame;
