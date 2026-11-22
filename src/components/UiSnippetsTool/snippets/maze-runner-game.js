const mazeRunnerGame = {
  id: 'maze-runner-game',
  title: 'Maze Runner Arrow-Key Game',
  lastmod: '2026-11-14',
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
requestAnimationFrame(loop);

/* wdp-share:start */
(function () {
  var TITLE = 'Maze Runner Arrow-Key Game', URL = 'https://webdevpuneet.com/ui-snippets/maze-runner-game/';
  if (window.__wdpShare) return;
  window.__wdpShare = true;
  var blob = null, file = null, lastInfo = null;

  /* ---- UI ---- */
  var st = document.createElement('style');
  st.textContent =
    '.wdps-in,.wdps-btn,.wdps-box{touch-action:manipulation;-webkit-tap-highlight-color:transparent}.wdps-in{display:block;margin:12px auto 0;border:0;border-radius:12px;padding:11px 22px;font:800 15px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 0 #11793a;pointer-events:auto;position:relative;z-index:5}' +
    '.wdps-in:hover{background:#15803d}.wdps-in:active{transform:translateY(2px);box-shadow:0 1px 0 #11793a}' +
    '.wdps-btn{position:fixed;right:12px;bottom:12px;z-index:2147483000;border:0;border-radius:99px;padding:9px 16px;font:700 13px/1 system-ui,sans-serif;background:#16a34a;color:#fff;cursor:pointer;box-shadow:0 3px 12px rgba(0,0,0,.3)}' +
    '.wdps-btn.wdps-hot{animation:wdps-p 1.4s ease-in-out infinite}' +
    '@keyframes wdps-p{0%,100%{box-shadow:0 0 0 0 rgba(22,163,74,.6),0 3px 12px rgba(0,0,0,.3)}50%{box-shadow:0 0 0 9px rgba(22,163,74,0),0 3px 12px rgba(0,0,0,.3)}}' +
    '.wdps-btn:active{transform:translateY(1px)}' +
    '.wdps-in[hidden],.wdps-btn[hidden],.wdps-box[hidden],.wdps-box [hidden]{display:none}' +
    '.wdps-box{position:fixed;left:50%;bottom:12px;transform:translateX(-50%);z-index:2147483001;width:max-content;max-width:calc(100vw - 24px);box-sizing:border-box;background:#fff;color:#64748b;border:1px solid #d5e2ee;border-radius:12px;padding:8px 12px;font:700 12px/1.4 system-ui,sans-serif;box-shadow:0 8px 26px rgba(15,23,42,.25);display:flex;flex-wrap:wrap;gap:8px;align-items:center}' +
    '.wdps-box button,.wdps-box a{border:1px solid #d5e2ee;background:#f8fafc;color:#1e293b;border-radius:99px;padding:5px 12px;font:700 12px system-ui,sans-serif;text-decoration:none;cursor:pointer}' +
    '.wdps-box .wdps-x{border:0;background:none;font-size:19px;line-height:1;padding:0 4px;margin-left:auto;color:#475569}' +
    '@media (max-width:700px){.wdps-box{width:calc(100vw - 24px);justify-content:center;padding:10px 12px}.wdps-box>span{width:100%;text-align:center}.wdps-box button,.wdps-box a{padding:9px 14px;font-size:13px}.wdps-box .wdps-x{position:absolute;top:4px;right:4px}.wdps-in{width:100%;max-width:320px}}';
  document.head.appendChild(st);

  var pill = document.createElement('button');
  pill.type = 'button'; pill.className = 'wdps-btn'; pill.textContent = 'Share result';
  var inl = document.createElement('button');
  inl.type = 'button'; inl.className = 'wdps-in'; inl.textContent = 'Share result'; inl.hidden = true;
  var box = document.createElement('div');
  box.className = 'wdps-box'; box.hidden = true;
  box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', 'Share your result');
  box.innerHTML =
    '<span data-a="msg">Share your result:</span>' +
    '<button type="button" data-a="copy">Copy image</button>' +
    '<a data-a="dl" download="result.png">Download image</a>' +
    '<button type="button" data-a="more" hidden>More&hellip;</button>' +
    '<a data-a="wa" target="_blank" rel="noopener">WhatsApp</a>' +
    '<a data-a="x" target="_blank" rel="noopener">X</a>' +
    '<a data-a="fb" target="_blank" rel="noopener">Facebook</a>' +
    '<button type="button" class="wdps-x" data-a="close" aria-label="Close share options">&times;</button>';
  document.body.appendChild(box);
  document.body.appendChild(pill);
  function q(a) { return box.querySelector('[data-a="' + a + '"]'); }
  function ours(el) { return el === inl || el === pill || !!el.closest('.wdps-box'); }

  /* ---- reading the result from the screen ---- */
  function shown(el) {
    if (!el || !el.getClientRects().length) return false;
    for (var n = el; n && n !== document.body; n = n.parentElement) {
      var cs = getComputedStyle(n);
      if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.1) return false;
      if (n.hidden || n.getAttribute('aria-hidden') === 'true') return false;
    }
    return true;
  }
  function txt(el) { return (el.textContent || '').replace(/\\s+/g, ' ').trim(); }
  function sig(el) { return ((el.id || '') + ' ' + (typeof el.className === 'string' ? el.className : '')).toLowerCase(); }
  var OUTCOME = /(you win|you won|win!|wins|victory|game over|time.?s up|cleared|complete|solved|defeat|you lose|you lost|lost|draw|crash|failed|success|congrat|score|result|finished|beat|all matched|well done|perfect|new best)/i;
  var HEADSIG = /(title|headline|msg|message|banner|result|verdict|status)/;
  var WIN = /(you win|you won|win!|wins|victory|cleared|complete|solved|success|congrat|beat|matched|perfect|new best|record)/i;
  var LOSS = /(game over|time.?s up|defeat|you lose|you lost|lost|crash|failed|out of)/i;
  var BOX = /(overlay|modal|banner|result|over|end|dialog|screen|popup|panel|card|finish|win)/;
  function readResult() {
    var head = '', sub = '', root = null, headEl = null;
    var all = document.body.querySelectorAll('h1,h2,h3,h4,p,strong,div,span');
    for (var i = 0; i < all.length && !head; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 2) continue;
      if (!HEADSIG.test(sig(el))) continue;
      /* a banner that holds its own title: use the title inside it instead */
      var inner = false;
      for (var c = 0; c < el.children.length; c++) if (HEADSIG.test(sig(el.children[c]))) inner = true;
      if (inner) continue;
      var t = txt(el);
      if (t.length < 3 || t.length > 70 || !OUTCOME.test(t) || !shown(el)) continue;
      head = t; headEl = el; root = el.parentElement;
    }
    if (root) {
      var kids = root.querySelectorAll('p,span,div');
      for (var j = 0; j < kids.length && !sub; j++) {
        var k = kids[j];
        if (ours(k) || k.children.length > 2 || !/(sub|text|summary|note|desc|detail)/.test(sig(k))) continue;
        var tt = txt(k);
        if (tt && tt !== head && tt.length >= 5 && tt.length <= 160 && shown(k)) sub = tt;
      }
    }
    /* the result screen the button goes into: the nearest overlay / banner / result box around the headline */
    var host = null;
    for (var n = headEl, d = 0; n && n !== document.body && d < 4; n = n.parentElement, d++) {
      if (d > 0 && BOX.test(sig(n)) && n.tagName !== 'BUTTON') { host = n; break; }
    }
    return { head: head, sub: sub, host: host };
  }
  var STATRE = /(score|moves|time|wpm|best|level|streak|accuracy|combo|coins|distance|height|points|stars|lives|wins|attempt|guess)/;
  function readStats() {
    var out = [], seen = {};
    var all = document.body.querySelectorAll('span,strong,b,div,p,output');
    for (var i = 0; i < all.length && out.length < 4; i++) {
      var el = all[i];
      if (ours(el) || el.children.length > 1) continue;
      if (!STATRE.test(sig(el))) continue;
      var t = txt(el);
      if (!t || t.length > 28 || !/[0-9]/.test(t) || !shown(el)) continue;
      if (!/[a-zA-Z]/.test(t) && el.parentElement) {
        var parts = [], ch = el.parentElement.childNodes;
        for (var p = 0; p < ch.length; p++) { var pv = (ch[p].textContent || '').replace(/\\s+/g, ' ').trim(); if (pv) parts.push(pv); }
        var pt = parts.join(' ');
        if (pt.length <= 30 && /[a-zA-Z]/.test(pt)) t = pt;
      }
      var key = t.toLowerCase();
      if (seen[key]) continue;
      seen[key] = 1; out.push(t);
    }
    return out;
  }
  function bestCanvas() {
    var cs = document.querySelectorAll('canvas'), best = null, area = 0;
    for (var i = 0; i < cs.length; i++) {
      var r = cs[i].getBoundingClientRect(), a = r.width * r.height;
      if (a > area && a > 8000 && shown(cs[i])) { area = a; best = cs[i]; }
    }
    return best;
  }

  /* ---- show the button when a result is on screen ---- */
  var lastHost = null, timer = 0;
  function sync() {
    timer = 0;
    var r = readResult();
    if (r.head && r.host) {
      if (inl.parentElement !== r.host) r.host.appendChild(inl);
      if (inl.hidden) inl.hidden = false;
      if (!pill.hidden) pill.hidden = true;
    } else {
      if (!inl.hidden) inl.hidden = true;
      if (pill.hidden) pill.hidden = false;
      pill.classList.toggle('wdps-hot', !!r.head);
    }
    if (lastHost && !r.head && !box.hidden) box.hidden = true;
    lastHost = r.head ? (r.host || document.body) : null;
  }
  function later() { if (!timer) timer = setTimeout(sync, 200); }
  try {
    new MutationObserver(function (list) {
      for (var i = 0; i < list.length; i++) {
        var t = list[i].target;
        if (t.nodeType !== 1) t = t.parentElement;
        if (t && !ours(t)) { later(); return; }
      }
    }).observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ['class', 'style', 'hidden'] });
  } catch (e) {}
  setInterval(later, 1500);
  later();

  /* ---- the card (1080 x 1080, drawn in memory, light like Pocket Artillery's) ---- */
  var outline = 0;
  function put(g, t, x, y) { if (outline) { g.lineJoin = 'round'; g.lineWidth = outline; g.strokeStyle = 'rgba(8,12,28,.85)'; g.strokeText(t, x, y); } g.fillText(t, x, y); }
  function wrap(g, text, x, y, maxW, lh, maxLines) {
    var words = text.split(' '), line = '', n = 0;
    for (var i = 0; i < words.length; i++) {
      var tst = line ? line + ' ' + words[i] : words[i];
      if (g.measureText(tst).width > maxW && line) {
        put(g, line, x, y); y += lh; n++; line = words[i];
        if (n >= maxLines - 1) { line = words.slice(i).join(' '); break; }
      } else line = tst;
    }
    if (line) {
      while (line.length > 3 && g.measureText(line).width > maxW) line = line.slice(0, -2);
      put(g, line, x, y); y += lh;
    }
    return y;
  }
  /* Biggest-screenshot card: the game frame fills the whole image, the text sits on top of it as an overlay. */
  function bgOf(el) {
    for (var n = el; n; n = n.parentElement) {
      var c = getComputedStyle(n).backgroundColor;
      if (c && c !== 'transparent' && c.slice(-4) !== ', 0)') return c;
    }
    return '#0f172a';
  }
  function drawBig(info, cv) {
    var W = 1080, r = cv.width / cv.height, H = Math.max(810, Math.min(1350, Math.round(W / r)));
    var c = document.createElement('canvas'); c.width = W; c.height = H;
    var g = c.getContext('2d');
    g.fillStyle = bgOf(cv.parentElement || cv); g.fillRect(0, 0, W, H);
    var w = W, h = w / r;
    if (h > H) { h = H; w = h * r; }
    g.imageSmoothingEnabled = true; g.imageSmoothingQuality = 'high';
    try { g.drawImage(cv, (W - w) / 2, (H - h) / 2, w, h); } catch (e) { return null; }
    /* dark fades under the text so it stays readable on any game colours */
    var g1 = g.createLinearGradient(0, 0, 0, H * 0.55); g1.addColorStop(0, 'rgba(8,12,28,.74)'); g1.addColorStop(1, 'rgba(8,12,28,0)');
    g.fillStyle = g1; g.fillRect(0, 0, W, H * 0.55);
    var g2 = g.createLinearGradient(0, H - 200, 0, H); g2.addColorStop(0, 'rgba(8,12,28,0)'); g2.addColorStop(1, 'rgba(8,12,28,.85)');
    g.fillStyle = g2; g.fillRect(0, H - 200, W, 200);
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    var y = 36;
    g.fillStyle = 'rgba(255,255,255,.93)'; g.font = '800 34px system-ui, sans-serif'; outline = 7;
    y = wrap(g, TITLE.toUpperCase(), W / 2, y + 34, 1000, 42, 1);
    g.fillStyle = kind === 'draw' ? '#e2e8f0' : kind === 'loss' ? '#9db8ff' : '#ffc233';
    var big = head.length > 22 ? 84 : 112; g.font = '900 ' + big + 'px system-ui, sans-serif'; outline = 16;
    y = wrap(g, head, W / 2, y + big * 0.85, 1000, big * 1.05, 2);
    if (info.sub) { g.fillStyle = '#fff'; g.font = '700 40px system-ui, sans-serif'; outline = 9; y = wrap(g, info.sub, W / 2, y + 6, 980, 50, 2); }
    outline = 0;
    if (info.stats.length) {
      g.font = '800 38px system-ui, sans-serif';
      var gap = 16, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 960 ? 960 / tot : 1, px = (W - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = 'rgba(8,12,28,.72)'; g.strokeStyle = 'rgba(255,255,255,.55)'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 68, 34); else g.rect(px, py, w0, 68);
        g.fill(); g.stroke();
        g.fillStyle = '#fff'; g.font = '800 ' + Math.round(38 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 47);
        px += w0 + gap * sc;
      }
    }
    outline = 8;
    g.fillStyle = '#fff'; g.font = '900 52px system-ui, sans-serif'; put(g, 'Can you beat it?', W / 2, H - 84);
    g.fillStyle = 'rgba(255,255,255,.92)'; g.font = '700 34px system-ui, sans-serif'; outline = 6; put(g, 'Play free at webdevpuneet.com', W / 2, H - 34);
    outline = 0;
    return c;
  }
  function finish(c, cb) {
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }
  function makeCard(info, cb) {
    var cv0 = bestCanvas();
    if (cv0) { var bc = drawBig(info, cv0); if (bc) { finish(bc, cb); return; } }
    var S = 1080, c = document.createElement('canvas');
    c.width = S; c.height = S;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, 0, S);
    gr.addColorStop(0, '#eaf4ff'); gr.addColorStop(1, '#fff3ef');
    g.fillStyle = gr; g.fillRect(0, 0, S, S);
    var cv = bestCanvas();
    var head = info.head || 'Can you beat me?';
    var kind = /draw|tie/i.test(head) ? 'draw' : LOSS.test(head) && !WIN.test(head) ? 'loss' : 'win';
    g.textAlign = 'center';
    g.fillStyle = '#1e293b'; g.font = '800 60px system-ui, sans-serif';
    var y = wrap(g, TITLE, S / 2, cv ? 120 : 200, 980, 68, 1);
    g.fillStyle = kind === 'draw' ? '#475569' : kind === 'loss' ? '#3b63e0' : '#e8553a';
    g.font = '800 ' + (head.length > 22 ? 76 : 100) + 'px system-ui, sans-serif';
    y = wrap(g, head, S / 2, y + (head.length > 22 ? 70 : 90), 980, head.length > 22 ? 84 : 108, 2);
    if (info.sub) { g.fillStyle = '#475569'; g.font = '700 38px system-ui, sans-serif'; y = wrap(g, info.sub, S / 2, y + 4, 940, 48, 2); }
    if (info.stats.length) {
      g.font = '800 36px system-ui, sans-serif';
      var gap = 18, pad = 26, ws = [], tot = -gap;
      for (var i = 0; i < info.stats.length; i++) { ws.push(g.measureText(info.stats[i]).width + pad * 2); tot += ws[i] + gap; }
      var sc = tot > 1000 ? 1000 / tot : 1, px = (S - tot * sc) / 2, py = y + 14;
      for (var k = 0; k < info.stats.length; k++) {
        var w0 = ws[k] * sc;
        g.fillStyle = '#ffffff'; g.strokeStyle = '#d5e2ee'; g.lineWidth = 3;
        g.beginPath();
        if (g.roundRect) g.roundRect(px, py, w0, 64, 32); else g.rect(px, py, w0, 64);
        g.fill(); g.stroke();
        g.fillStyle = '#1e293b'; g.font = '800 ' + Math.round(36 * sc) + 'px system-ui, sans-serif';
        g.fillText(info.stats[k], px + w0 / 2, py + 44);
        px += w0 + gap * sc;
      }
      y = py + 64 + 10;
    }
    if (cv) {
      try {
        var maxW = 960, maxH = Math.max(180, 930 - y - 30), r = cv.width / cv.height;
        var w = maxW, h = w / r;
        if (h > maxH) { h = maxH; w = h * r; }
        var x = (S - w) / 2, yy = y + 20 + Math.max(0, (maxH - h) / 2);
        g.save(); g.shadowColor = 'rgba(60,100,140,0.3)'; g.shadowBlur = 30; g.shadowOffsetY = 10;
        g.fillStyle = '#fff'; g.fillRect(x - 8, yy - 8, w + 16, h + 16); g.restore();
        g.drawImage(cv, x, yy, w, h);
      } catch (e) {}
    }
    g.fillStyle = '#1e293b'; g.font = '800 46px system-ui, sans-serif';
    g.fillText('Can you beat it?', S / 2, 1000);
    g.fillStyle = '#64748b'; g.font = '700 34px system-ui, sans-serif';
    g.fillText('Play free at webdevpuneet.com', S / 2, 1050);
    var dataUrl = '';
    try { dataUrl = c.toDataURL('image/png'); } catch (e) {}
    try { c.toBlob(function (b) { cb(b, dataUrl); }, 'image/png'); } catch (e) { cb(null, dataUrl); }
  }

  function shareText(info) {
    var bits = [];
    if (info.head) bits.push(info.head);
    if (info.stats.length) bits.push(info.stats.join(', '));
    return TITLE + ': ' + (bits.length ? bits.join(' - ') + '. ' : '') + 'Can you beat it? ' + URL;
  }
  function msg(t) { q('msg').textContent = t; }
  function openFallback() {
    var t = encodeURIComponent(shareText(lastInfo));
    q('wa').href = 'https://wa.me/?text=' + t;
    q('x').href = 'https://twitter.com/intent/tweet?text=' + t;
    q('fb').href = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(URL) + '&quote=' + t;
    box.hidden = false;
  }
  function nativeShare() {
    /* a user cancel does nothing; anything else (blocked in an iframe, no permission) shows Copy / Download / links */
    try {
      navigator.share({ files: [file], title: TITLE, text: shareText(lastInfo) }).catch(function (e) { if (!e || e.name !== 'AbortError') openFallback(); });
    } catch (e) { openFallback(); }
  }
  function onShare() {
    var info = readResult(); info.stats = readStats();
    lastInfo = info;
    msg('Share your result:');
    makeCard(info, function (b, dataUrl) {
      blob = b; file = null;
      if (b) { try { file = new File([b], 'result.png', { type: 'image/png' }); } catch (e) {} }
      if (dataUrl) q('dl').href = dataUrl;
      q('dl').hidden = !dataUrl;
      var canNative = !!(file && navigator.share && navigator.canShare && navigator.canShare({ files: [file] }));
      var touch = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches);
      q('more').hidden = !canNative;
      if (canNative && touch) nativeShare();
      else openFallback();
    });
  }
  /* Games often have document/window level touch and pointer handlers (some call preventDefault, which cancels the tap's
     click on phones, others restart the game on touchstart). So: keep every pointer event on our controls away from the
     game, and fire on touchend as well as click (guarded so one tap shares once). */
  var busy = 0;
  function trigger() { if (busy) return; busy = 1; setTimeout(function () { busy = 0; }, 700); onShare(); }
  function guard(el, act) {
    var evs = ['pointerdown', 'pointerup', 'mousedown', 'mouseup', 'touchstart', 'touchend', 'click'];
    for (var i = 0; i < evs.length; i++) el.addEventListener(evs[i], function (e) { e.stopPropagation(); });
    if (act) {
      el.addEventListener('touchend', function (e) { if (e.cancelable) e.preventDefault(); act(); });
      el.addEventListener('click', function () { act(); });
    }
  }
  guard(pill, trigger);
  guard(inl, trigger);
  guard(box);
  q('more').addEventListener('click', function () { if (file) nativeShare(); });
  q('close').addEventListener('click', function () { box.hidden = true; });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !box.hidden) box.hidden = true; });
  q('copy').addEventListener('click', function () {
    try {
      navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(
        function () { msg('Image copied. Paste it into your chat or post.'); },
        function () { msg('Could not copy here. Try Download image.'); }
      );
    } catch (e) { msg('Copying images is not supported here. Try Download image.'); }
  });
})();
/* wdp-share:end */`,

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
