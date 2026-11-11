const miniSudokuGame = {
  id: 'mini-sudoku-game',
  title: 'Mini Sudoku Puzzle (6x6)',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="ms-fit" id="ms-fit"><div class="ms-wrap" id="ms-wrap">
  <div class="ms-panel" id="ms-panel">
    <div class="ms-hud">
      <div class="ms-hud-left">
        <span class="ms-kicker" id="ms-kicker">Mini Sudoku</span>
        <span class="ms-name" id="ms-name">Pick a level</span>
      </div>
      <div class="ms-stat"><span class="ms-label">Time</span><b id="ms-time">00:00</b></div>
      <div class="ms-stat"><span class="ms-label">Lives</span><b class="ms-lives" id="ms-lives" aria-live="polite"></b></div>
      <div class="ms-hud-btns">
        <button class="ms-btn-sm" id="ms-levels-btn" type="button" title="Levels (Esc)">Levels</button>
        <button class="ms-btn-sm" id="ms-pause" type="button" title="Pause (P)">Pause</button>
        <button class="ms-btn-sm" id="ms-mute" type="button" aria-pressed="false">Sound on</button>
      </div>
    </div>
    <div class="ms-progress"><div class="ms-progress-bar" id="ms-progress"></div></div>

    <div class="ms-board-wrap">
      <div class="ms-board" id="ms-board" role="grid" aria-label="Sudoku board"></div>
      <div class="ms-paused" id="ms-paused"><span>Paused</span><small>Press P or click to resume</small></div>
    </div>
    <p class="ms-msg" id="ms-msg">Select a cell, then pick a number.</p>

    <div class="ms-tools">
      <button class="ms-tool" id="ms-notes" type="button" aria-pressed="false"><span class="ms-tool-ico">&#9998;</span>Notes <em>N</em></button>
      <button class="ms-tool" id="ms-hint" type="button"><span class="ms-tool-ico">&#128161;</span>Hint <i id="ms-hint-count">3</i></button>
      <button class="ms-tool" id="ms-undo" type="button"><span class="ms-tool-ico">&#8630;</span>Undo <em>Z</em></button>
      <button class="ms-tool" id="ms-erase" type="button"><span class="ms-tool-ico">&#9003;</span>Erase</button>
    </div>
    <div class="ms-pad" id="ms-pad"></div>

    <div class="ms-overlay show" id="ms-menu">
      <p class="ms-logo">Mini Sudoku</p>
      <p class="ms-tagline">Fill every row, column and 3x2 box with 1 to 6. Every puzzle has exactly one solution.</p>
      <div class="ms-menu-row">
        <button class="ms-daily" id="ms-daily" type="button">
          <span class="ms-daily-title" id="ms-daily-title">Daily Puzzle</span>
          <span class="ms-daily-sub" id="ms-daily-sub">A new puzzle every day</span>
        </button>
        <div class="ms-totals"><span><b id="ms-star-total">0</b> / 72 stars</span><span>Daily streak <b id="ms-streak">0</b></span></div>
      </div>
      <div class="ms-tiers" id="ms-tiers"></div>
    </div>

    <div class="ms-overlay" id="ms-result">
      <p class="ms-result-title" id="ms-result-title">Solved!</p>
      <div class="ms-result-stars" id="ms-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="ms-result-sub" id="ms-result-sub"></p>
      <div class="ms-result-btns">
        <button class="ms-btn" id="ms-next" type="button">Next level</button>
        <button class="ms-btn ms-btn-ghost" id="ms-retry" type="button">Retry</button>
        <button class="ms-btn ms-btn-ghost" id="ms-share" type="button">Copy result</button>
        <button class="ms-btn ms-btn-ghost" id="ms-menu-back" type="button">Levels</button>
      </div>
    </div>
  </div>
</div></div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: radial-gradient(ellipse at top, #1b1f4a 0%, #090c1c 62%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 12px 14px; color: #e2e8f0; overflow: hidden;
}
/* The game scales itself to the space it is given (see fitToView in the script): .ms-fit takes the scaled size,
   .ms-wrap is laid out at its natural size and then shrunk with transform. */
.ms-fit { flex: none; width: 100%; max-width: 520px; }
.ms-wrap { width: 100%; transform-origin: top left; }

.ms-panel {
  position: relative; display: flex; flex-direction: column; gap: 10px;
  padding: 16px; border-radius: 20px; overflow: hidden;
  background: linear-gradient(180deg, rgba(30,36,80,0.72), rgba(12,16,38,0.92));
  border: 1px solid rgba(148,163,184,0.16);
  box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(99,102,241,0.14);
}

.ms-hud { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.ms-hud-left { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; min-width: 0; }
.ms-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #fbbf24; }
.ms-name { font-size: 16px; font-weight: 800; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ms-stat { display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.ms-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.ms-stat b { font-size: 16px; font-weight: 800; color: #f1f5f9; font-variant-numeric: tabular-nums; }
.ms-stat .ms-lives { color: #f87171; letter-spacing: 2px; text-shadow: 0 0 10px rgba(248,113,113,0.6); }
.ms-lives .off { color: #334155; text-shadow: none; }
.ms-lives.hit { animation: ms-shake 0.4s ease; }
@keyframes ms-shake { 20%, 60% { transform: translateX(-4px); } 40%, 80% { transform: translateX(4px); } }

.ms-hud-btns { display: flex; gap: 5px; }
.ms-btn-sm {
  background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.09);
  border-radius: 8px; padding: 5px 9px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer;
}
.ms-btn-sm:hover { background: rgba(255,255,255,0.13); }

.ms-progress { height: 4px; background: rgba(255,255,255,0.07); border-radius: 4px; overflow: hidden; }
.ms-progress-bar { height: 100%; width: 0; background: linear-gradient(90deg, #6366f1, #a78bfa, #f472b6, #fbbf24); transition: width 0.3s; }

.ms-board-wrap { position: relative; }
.ms-board {
  display: grid; gap: 2px; padding: 3px; border-radius: 12px;
  background: #3b4670; user-select: none; -webkit-user-select: none;
  grid-template-columns: repeat(3, 1fr) 2px repeat(3, 1fr);
  grid-template-rows: auto auto 2px auto auto 2px auto auto;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,0.05);
}
.ms-board.dim .ms-cell { filter: blur(7px); }

.ms-cell {
  position: relative; aspect-ratio: 1 / 1; display: flex; align-items: center; justify-content: center;
  background: #121a36; color: #a5b4fc; font-size: clamp(20px, 6.4vw, 30px); font-weight: 800;
  cursor: pointer; transition: background 0.12s, box-shadow 0.12s, color 0.12s;
}
.ms-cell.given { background: #1a2547; color: #e2e8f0; cursor: default; }
.ms-cell.peer { background: #19234a; }
.ms-cell.given.peer { background: #202c57; }
.ms-cell.same { background: #3b3320; color: #fde68a; box-shadow: inset 0 0 0 2px rgba(251,191,36,0.7); }
.ms-cell.sel { background: #3730a3; color: #fff; box-shadow: inset 0 0 0 2px #a5b4fc, 0 0 18px rgba(129,140,248,0.55); z-index: 1; }
.ms-cell.wrong { background: #4a1620; color: #fca5a5; animation: ms-wrong 0.4s ease; }
.ms-cell.hinted { color: #5eead4; }
.ms-cell.pop .ms-val { animation: ms-pop 0.28s cubic-bezier(0.2, 1.6, 0.4, 1); }
@keyframes ms-pop { 0% { transform: scale(0.3); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }
@keyframes ms-wrong { 20%, 60% { transform: translateX(-3px); } 40%, 80% { transform: translateX(3px); } }
.ms-cell.wave { animation: ms-wave 0.7s ease; animation-delay: var(--wd, 0s); }
@keyframes ms-wave { 40% { background-color: #166534; color: #bbf7d0; transform: scale(1.08); } }

.ms-notes { position: absolute; inset: 2px; display: none; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); font-size: clamp(8px, 2.3vw, 11px); font-weight: 700; color: #94a3b8; }
.ms-notes span { display: flex; align-items: center; justify-content: center; }
.ms-cell.has-notes .ms-notes { display: grid; }
.ms-cell.has-notes .ms-val { display: none; }
.ms-cell.sel .ms-notes { color: #c7d2fe; }

.ms-paused {
  position: absolute; inset: 0; display: none; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
  font-size: 26px; font-weight: 900; color: #f8fafc; cursor: pointer; border-radius: 12px; background: rgba(9,12,28,0.55);
}
.ms-paused small { font-size: 12px; font-weight: 600; color: #94a3b8; }
.ms-paused.show { display: flex; }

.ms-msg { min-height: 40px; font-size: 13px; line-height: 1.45; color: #94a3b8; text-align: center; padding: 0 4px; }
.ms-msg b { color: #5eead4; }
.ms-msg.warn { color: #fca5a5; }

.ms-tools { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; }
.ms-tool {
  display: flex; flex-direction: column; align-items: center; gap: 2px; padding: 7px 0; border-radius: 10px; cursor: pointer;
  font: inherit; font-size: 11px; font-weight: 700; color: #cbd5e1;
  background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); transition: background 0.12s, border-color 0.12s;
}
.ms-tool:hover:not(:disabled) { background: rgba(255,255,255,0.1); border-color: rgba(165,180,252,0.5); }
.ms-tool:disabled { opacity: 0.35; cursor: not-allowed; }
.ms-tool-ico { font-size: 16px; line-height: 1; }
.ms-tool em { font-style: normal; font-size: 9px; color: #64748b; margin-left: 2px; }
.ms-tool i { font-style: normal; font-size: 10px; background: #6366f1; color: #fff; border-radius: 8px; padding: 0 6px; margin-left: 2px; }
.ms-tool[aria-pressed="true"] { background: #4f46e5; border-color: #818cf8; color: #fff; }

.ms-pad { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
.ms-pad-btn {
  position: relative; padding: 10px 0 8px; border-radius: 12px; cursor: pointer; font: inherit;
  font-size: 22px; font-weight: 800; color: #e0e7ff; background: linear-gradient(180deg, #2a3472, #1c2552);
  border: 1px solid rgba(165,180,252,0.28); transition: transform 0.1s, background 0.12s, opacity 0.2s;
}
.ms-pad-btn:hover:not(:disabled) { transform: translateY(-2px); background: linear-gradient(180deg, #3a46a0, #28337a); }
.ms-pad-btn:active:not(:disabled) { transform: scale(0.95); }
.ms-pad-btn small { position: absolute; right: 6px; top: 3px; font-size: 9px; font-weight: 700; color: #94a3b8; }
.ms-pad-btn:disabled { opacity: 0.25; cursor: default; }

.ms-overlay {
  position: absolute; inset: 0; z-index: 5; display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 12px; padding: 18px; text-align: center; overflow-y: auto;
  background: radial-gradient(ellipse at center, rgba(11,15,36,0.965), rgba(6,8,20,0.985));
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.ms-overlay.show { opacity: 1; pointer-events: auto; }
.ms-logo {
  font-size: 40px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05;
  background: linear-gradient(90deg, #818cf8, #f472b6, #fbbf24); -webkit-background-clip: text; background-clip: text; color: transparent;
}
.ms-tagline { font-size: 13px; color: #94a3b8; max-width: 380px; line-height: 1.5; }
.ms-menu-row { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
.ms-daily {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 16px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left;
  color: #fef3c7; border: 1px solid rgba(250,204,21,0.45); background: linear-gradient(135deg, rgba(250,204,21,0.18), rgba(251,146,60,0.1));
  transition: transform 0.15s, box-shadow 0.15s;
}
.ms-daily:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,204,21,0.2); }
.ms-daily-title { font-size: 14px; font-weight: 800; }
.ms-daily-sub { font-size: 11px; color: #fcd34d; }
.ms-totals { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: #94a3b8; text-align: left; }
.ms-totals b { color: #f8fafc; }

.ms-tiers { display: flex; flex-direction: column; gap: 8px; width: 100%; }
.ms-tier { display: grid; grid-template-columns: 78px 1fr; align-items: center; gap: 10px; }
.ms-tier-name { font-size: 11px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--g); text-align: left; line-height: 1.2; }
.ms-tier-name small { display: block; font-size: 9px; font-weight: 600; color: #64748b; text-transform: none; letter-spacing: 0; }
.ms-tier-tiles { display: grid; grid-template-columns: repeat(6, 1fr); gap: 6px; }
.ms-tile {
  position: relative; height: 46px; border-radius: 10px; cursor: pointer; font: inherit; color: #e2e8f0;
  border: 1px solid rgba(148,163,184,0.22); background: rgba(255,255,255,0.04);
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; transition: transform 0.12s, border-color 0.12s;
}
.ms-tile:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); }
.ms-tile::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.ms-tile-num { font-size: 15px; font-weight: 800; }
.ms-tile-stars { font-size: 9px; letter-spacing: 1px; color: #334155; }
.ms-tile-stars .on { color: #facc15; }
.ms-tile:disabled { opacity: 0.32; cursor: not-allowed; }
.ms-tile.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 12px rgba(250,204,21,0.15); }

.ms-result-title { font-size: 34px; font-weight: 900; color: #f8fafc; }
.ms-result-stars { display: flex; gap: 10px; font-size: 52px; line-height: 1; }
.ms-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.ms-result-stars span.on { color: #facc15; text-shadow: 0 0 22px rgba(250,204,21,0.75); }
.ms-overlay.show .ms-result-stars span { animation: ms-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.ms-overlay.show .ms-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.ms-overlay.show .ms-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes ms-star { to { transform: scale(1); opacity: 1; } }
.ms-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.7; }
.ms-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.ms-btn {
  padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800; color: #fff;
  background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 6px 18px rgba(99,102,241,0.35); transition: transform 0.12s;
}
.ms-btn:hover { transform: translateY(-1px); }
.ms-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.ms-btn[hidden] { display: none; }

.ms-confetti { position: absolute; top: -12px; width: 8px; height: 14px; border-radius: 2px; z-index: 9; pointer-events: none; animation: ms-fall linear forwards; }
@keyframes ms-fall { to { transform: translate(var(--dx), 620px) rotate(var(--rot)); opacity: 0.9; } }

@media (max-width: 460px) {
  .ms-tier { grid-template-columns: 1fr; gap: 4px; }
  .ms-tier-name small { display: inline; margin-left: 6px; }
  .ms-hud { gap: 8px; }
}`,

  js: `const SIZE = 6, BOX_W = 3, BOX_H = 2, FULL = 63; // digits 1..6 as bits 0..5
const MAX_LIVES = 3, MAX_HINTS = 3;
// 24 levels in 4 tiers of 6. clues: how many digits are given. logic: the hardest technique a level needs
// (naked = only cells with one candidate, hidden = also digits that fit only one cell in a row, column or box,
// null = any unique puzzle). par: seconds for the "fast" mark.
const TIERS = [
  { name: 'Warm-up',      note: 'singles only',   clues: 21, logic: 'naked',  par: 150, color: '#4ade80' },
  { name: 'Sharp',        note: 'hidden singles', clues: 17, logic: 'hidden', par: 240, color: '#60a5fa' },
  { name: 'Brain-burner', note: 'few clues',      clues: 14, logic: 'hidden', par: 360, color: '#c084fc' },
  { name: 'Grandmaster',  note: 'minimal clues',  clues: 11, logic: null,     par: 540, color: '#fb923c' },
];
const LEVEL_COUNT = TIERS.length * 6;
const SAVE_KEY = 'mini-sudoku-save-v1';
const DAY0 = Date.UTC(2026, 10, 11); // Daily Puzzle #1

const $ = id => document.getElementById(id);
const boardEl = $('ms-board'), msgEl = $('ms-msg'), timeEl = $('ms-time'), livesEl = $('ms-lives');
const kickerEl = $('ms-kicker'), nameEl = $('ms-name'), progressEl = $('ms-progress');
const menuEl = $('ms-menu'), resultEl = $('ms-result'), panelEl = $('ms-panel'), pausedEl = $('ms-paused');
const notesBtn = $('ms-notes'), hintBtn = $('ms-hint'), undoBtn = $('ms-undo'), eraseBtn = $('ms-erase');
const padEl = $('ms-pad'), nextBtn = $('ms-next'), shareBtn = $('ms-share'), pauseBtn = $('ms-pause'), muteBtn = $('ms-mute');

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() {
  return { stars: Array(LEVEL_COUNT).fill(0), best: Array(LEVEL_COUNT).fill(0), daily: { day: 0, stars: 0, streak: 0, lastDay: 0, time: 0 } };
}
function loadSave() {
  const f = freshSave();
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      f.stars = f.stars.map((_, i) => s.stars[i] || 0);
      f.best = f.best.map((_, i) => (s.best && s.best[i]) || 0);
      Object.assign(f.daily, s.daily || {});
    }
  } catch (e) { /* storage blocked */ }
  return f;
}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* storage blocked */ } }
let save = loadSave();

/* ---------- Seeded random: the same seed always gives the same puzzle ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function shuffle(arr, R) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); const t = a[i]; a[i] = a[j]; a[j] = t; }
  return a;
}
function todayNumber() {
  const d = new Date();
  return Math.max(1, Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - DAY0) / 86400000) + 1);
}

/* ---------- Rules, candidates and solving ---------- */
function emptyGrid() { return Array.from({ length: SIZE }, () => Array(SIZE).fill(0)); }
function copyGrid(g) { return g.map(row => row.slice()); }
function boxOf(r, c) { return Math.floor(r / BOX_H) * (SIZE / BOX_W) + Math.floor(c / BOX_W); }
function sameUnit(a, b) { return a.r === b.r || a.c === b.c || boxOf(a.r, a.c) === boxOf(b.r, b.c); }
function candMask(g, r, c) { // digits still possible in an empty cell, as a bit mask
  let used = 0;
  for (let i = 0; i < SIZE; i++) {
    if (g[r][i]) used |= 1 << (g[r][i] - 1);
    if (g[i][c]) used |= 1 << (g[i][c] - 1);
  }
  const r0 = Math.floor(r / BOX_H) * BOX_H, c0 = Math.floor(c / BOX_W) * BOX_W;
  for (let i = r0; i < r0 + BOX_H; i++) for (let j = c0; j < c0 + BOX_W; j++) if (g[i][j]) used |= 1 << (g[i][j] - 1);
  return FULL & ~used;
}
function bitCount(m) { let n = 0; while (m) { n += m & 1; m >>= 1; } return n; }
function bitsOf(m) { const out = []; for (let d = 1; d <= SIZE; d++) if (m & (1 << (d - 1))) out.push(d); return out; }

function countSolutions(g, limit) { // stops as soon as it has found "limit" solutions
  let best = null, bestN = 99;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (g[r][c]) continue;
      const n = bitCount(candMask(g, r, c));
      if (n < bestN) { bestN = n; best = { r, c }; if (n === 0) return 0; }
    }
  }
  if (!best) return 1;
  let found = 0;
  const m = candMask(g, best.r, best.c);
  for (let d = 1; d <= SIZE && found < limit; d++) {
    if (!(m & (1 << (d - 1)))) continue;
    g[best.r][best.c] = d;
    found += countSolutions(g, limit - found);
    g[best.r][best.c] = 0;
  }
  return found;
}
function fillGrid(g, pos, R) {
  if (pos === SIZE * SIZE) return true;
  const r = Math.floor(pos / SIZE), c = pos % SIZE;
  const m = candMask(g, r, c);
  for (const d of shuffle([1, 2, 3, 4, 5, 6], R)) {
    if (!(m & (1 << (d - 1)))) continue;
    g[r][c] = d;
    if (fillGrid(g, pos + 1, R)) return true;
    g[r][c] = 0;
  }
  return false;
}

const UNITS = (() => { // every row, column and box as a list of cells
  const u = [];
  for (let r = 0; r < SIZE; r++) u.push({ kind: 'row', n: r + 1, cells: Array.from({ length: SIZE }, (_, c) => ({ r, c })) });
  for (let c = 0; c < SIZE; c++) u.push({ kind: 'column', n: c + 1, cells: Array.from({ length: SIZE }, (_, r) => ({ r, c })) });
  for (let b = 0; b < SIZE; b++) {
    const cells = [];
    for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (boxOf(r, c) === b) cells.push({ r, c });
    u.push({ kind: 'box', n: b + 1, cells });
  }
  return u;
})();

function findNaked(g) {
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) {
    if (g[r][c]) continue;
    const m = candMask(g, r, c);
    if (bitCount(m) === 1) return { r, c, d: bitsOf(m)[0], type: 'naked' };
  }
  return null;
}
function findHidden(g) {
  for (const u of UNITS) {
    for (let d = 1; d <= SIZE; d++) {
      if (u.cells.some(p => g[p.r][p.c] === d)) continue;
      const spots = u.cells.filter(p => !g[p.r][p.c] && (candMask(g, p.r, p.c) & (1 << (d - 1))));
      if (spots.length === 1) return { r: spots[0].r, c: spots[0].c, d, type: 'hidden', unit: u };
    }
  }
  return null;
}
function solvableBy(grid, level) { // can the puzzle be finished using only the allowed techniques?
  const g = copyGrid(grid);
  for (let guard = 0; guard < 60; guard++) {
    const step = findNaked(g) || (level === 'hidden' ? findHidden(g) : null);
    if (!step) break;
    g[step.r][step.c] = step.d;
  }
  return g.every(row => row.every(v => v));
}

/* ---------- Puzzle generator: remove digits one by one, keeping the solution unique ---------- */
function carve(sol, target, R) {
  const g = copyGrid(sol);
  let clues = SIZE * SIZE;
  for (const pos of shuffle(Array.from({ length: SIZE * SIZE }, (_, i) => i), R)) {
    if (clues <= target) break;
    const r = Math.floor(pos / SIZE), c = pos % SIZE, v = g[r][c];
    g[r][c] = 0;
    if (countSolutions(copyGrid(g), 2) === 1) clues--; else g[r][c] = v; // two solutions: put it back
  }
  return { puzzle: g, clues };
}
function buildPuzzle(seed, target, logic) {
  let fallback = null;
  for (let attempt = 0; attempt < 60; attempt++) {
    const R = mulberry32(seed + attempt * 977);
    const sol = emptyGrid();
    fillGrid(sol, 0, R);
    const made = carve(sol, target, R);
    const ok = !logic || solvableBy(made.puzzle, logic);
    if (ok && made.clues <= target + 1) return { sol, puzzle: made.puzzle };
    if (ok && !fallback) fallback = { sol, puzzle: made.puzzle };
    if (!fallback && attempt === 59) fallback = { sol, puzzle: made.puzzle };
  }
  return fallback;
}
function levelSpec(i) {
  const tier = TIERS[Math.floor(i / 6)];
  return { tier, name: 'Level ' + (i + 1), clues: tier.clues - (i % 6 >= 3 ? 1 : 0), logic: tier.logic, par: tier.par, seed: 1000 + i * 7919 };
}
function dailySpec(n) {
  return { tier: TIERS[2], name: 'Daily Puzzle #' + n, clues: 15, logic: 'hidden', par: 300, seed: n * 104729 + 17 };
}

/* ---------- Sound: a tiny Web Audio synth, no files ---------- */
let audioCtx = null, muted = false;
function getAudio() {
  if (!audioCtx) { try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; } }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function tone(freq, dur, type, vol, slideTo, delay) {
  if (muted || !audioCtx) return;
  try {
    const t0 = audioCtx.currentTime + (delay || 0);
    const osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(t0); osc.stop(t0 + dur);
  } catch (e) { /* audio is optional */ }
}
const sfx = {
  place(d) { tone(300 + d * 55, 0.1, 'triangle', 0.07); },
  note() { tone(900, 0.04, 'square', 0.02); },
  wrong() { tone(170, 0.28, 'sawtooth', 0.06, 90); },
  hint() { tone(660, 0.1, 'sine', 0.06); tone(990, 0.18, 'sine', 0.06, null, 0.09); },
  done() { tone(523, 0.1, 'sine', 0.06); tone(784, 0.16, 'sine', 0.06, null, 0.08); },
  win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, i * 0.12)); },
  lose() { tone(330, 0.3, 'sawtooth', 0.05, 160); tone(220, 0.45, 'sawtooth', 0.05, 110, 0.25); },
};
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
  muteBtn.setAttribute('aria-pressed', String(muted));
});

/* ---------- Game state ---------- */
let spec = null, isDaily = false, dailyNum = 0, levelIndex = 0;
let sol = emptyGrid(), given = emptyGrid(), grid = emptyGrid();
let notes = emptyGrid();            // pencil marks: a bit mask per cell
let hinted = emptyGrid();           // 1 where a hint filled the cell
let selected = null, notesMode = false;
let lives = MAX_LIVES, hintsLeft = MAX_HINTS, mistakes = 0, hintsUsed = 0;
let undoStack = [];
let state = 'menu';                  // menu | play | paused | result
let elapsed = 0, lastTick = 0;
const cellEls = [];

function buildBoard() {
  boardEl.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const el = document.createElement('div');
      el.className = 'ms-cell';
      el.setAttribute('role', 'gridcell');
      el.style.gridColumn = String(c < 3 ? c + 1 : c + 2);   // the 2px spacer track sits between the box columns
      el.style.gridRow = String(r + 1 + Math.floor(r / 2));  // and between the box rows
      el.innerHTML = '<span class="ms-val"></span><span class="ms-notes">' + [1, 2, 3, 4, 5, 6].map(() => '<span></span>').join('') + '</span>';
      el.addEventListener('pointerdown', () => { if (state === 'play') select(r, c); });
      boardEl.appendChild(el);
      cellEls.push(el);
    }
  }
  padEl.innerHTML = '';
  for (let d = 1; d <= SIZE; d++) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ms-pad-btn'; b.dataset.d = String(d);
    b.innerHTML = d + '<small></small>';
    b.addEventListener('click', () => { if (state === 'play') input(d); b.blur(); });
    padEl.appendChild(b);
  }
}
const cellAt = (r, c) => cellEls[r * SIZE + c];

function loadPuzzle(s, seed) {
  spec = s;
  const built = buildPuzzle(s.seed, s.clues, s.logic);
  sol = built.sol;
  given = built.puzzle.map(row => row.map(v => (v ? 1 : 0)));
  grid = copyGrid(built.puzzle);
  notes = emptyGrid(); hinted = emptyGrid();
  selected = null; notesMode = false; undoStack = [];
  lives = MAX_LIVES; hintsLeft = MAX_HINTS; mistakes = 0; hintsUsed = 0;
  elapsed = 0;
  notesBtn.setAttribute('aria-pressed', 'false');
  setMsg('Select a cell, then pick a number. Tap a number on the board to highlight it everywhere.');
  render();
}
function startLevel(i) {
  getAudio();
  isDaily = false; levelIndex = i;
  loadPuzzle(levelSpec(i));
  beginPlay();
}
function startDaily() {
  getAudio();
  isDaily = true; dailyNum = todayNumber();
  loadPuzzle(dailySpec(dailyNum));
  beginPlay();
}
function beginPlay() {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  state = 'play';
  menuEl.classList.remove('show'); resultEl.classList.remove('show');
  pausedEl.classList.remove('show'); boardEl.classList.remove('dim');
  pauseBtn.textContent = 'Pause';
  lastTick = performance.now();
  kickerEl.textContent = isDaily ? 'Daily' : 'Level ' + (levelIndex + 1) + ' - ' + spec.tier.name;
  nameEl.textContent = isDaily ? spec.name : spec.tier.note;
  render();
}
function restart() { if (isDaily) startDaily(); else startLevel(levelIndex); }
function showMenu() {
  state = 'menu';
  resultEl.classList.remove('show'); pausedEl.classList.remove('show');
  menuEl.classList.add('show');
  renderMenu();
  kickerEl.textContent = 'Mini Sudoku';
  nameEl.textContent = 'Pick a level';
}

/* ---------- Rendering ---------- */
function setMsg(html, warn) { msgEl.innerHTML = html; msgEl.classList.toggle('warn', !!warn); }
function fmt(s) { return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(Math.floor(s % 60)).padStart(2, '0'); }

function render() {
  const sel = selected;
  const selVal = sel ? grid[sel.r][sel.c] : 0;
  const counts = Array(SIZE + 1).fill(0);
  let filled = 0;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const el = cellAt(r, c), v = grid[r][c];
      if (v && v === sol[r][c]) { counts[v]++; filled++; }
      const isSel = !!sel && sel.r === r && sel.c === c;
      el.classList.toggle('given', !!given[r][c]);
      el.classList.toggle('sel', isSel);
      el.classList.toggle('peer', !!sel && !isSel && sameUnit(sel, { r, c }));
      el.classList.toggle('same', !!selVal && v === selVal && !isSel);
      el.classList.toggle('wrong', !!v && v !== sol[r][c]);
      el.classList.toggle('hinted', !!hinted[r][c]);
      el.classList.toggle('has-notes', !v && !!notes[r][c]);
      el.firstChild.textContent = v || '';
      const spans = el.lastChild.children;
      for (let i = 0; i < SIZE; i++) spans[i].textContent = (notes[r][c] >> i) & 1 ? String(i + 1) : '';
    }
  }
  [...padEl.children].forEach(b => {
    const d = Number(b.dataset.d), left = SIZE - counts[d];
    b.disabled = left <= 0;
    b.firstElementChild.textContent = left > 0 ? left : '';
  });
  livesEl.innerHTML = Array.from({ length: MAX_LIVES }, (_, i) => '<span class="' + (i < lives ? '' : 'off') + '">\\u2665</span>').join('');
  progressEl.style.width = Math.round(((filled - given.flat().filter(Boolean).length) / (SIZE * SIZE - given.flat().filter(Boolean).length || 1)) * 100) + '%';
  hintBtn.disabled = hintsLeft <= 0 || state !== 'play';
  $('ms-hint-count').textContent = hintsLeft;
  undoBtn.disabled = undoStack.length === 0 || state !== 'play';
  eraseBtn.disabled = state !== 'play';
  timeEl.textContent = fmt(elapsed);
}

function renderMenu() {
  const today = todayNumber();
  const d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0; // a missed day resets the streak
  const wrap = $('ms-tiers');
  wrap.innerHTML = '';
  TIERS.forEach((t, ti) => {
    const row = document.createElement('div');
    row.className = 'ms-tier';
    row.style.setProperty('--g', t.color);
    row.innerHTML = '<div class="ms-tier-name">' + t.name + '<small>' + t.note + '</small></div>';
    const tiles = document.createElement('div');
    tiles.className = 'ms-tier-tiles';
    for (let k = 0; k < 6; k++) {
      const i = ti * 6 + k;
      const unlocked = i === 0 || save.stars[i - 1] > 0; // clearing a level unlocks the next one
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'ms-tile' + (save.stars[i] === 3 ? ' perfect' : '');
      b.disabled = !unlocked;
      b.title = unlocked ? 'Level ' + (i + 1) : 'Clear level ' + i + ' to unlock';
      b.innerHTML = '<span class="ms-tile-num">' + (i + 1) + '</span><span class="ms-tile-stars">' +
        [0, 1, 2].map(n => '<span class="' + (n < save.stars[i] ? 'on' : '') + '">\\u2605</span>').join('') + '</span>';
      b.addEventListener('click', () => startLevel(i));
      tiles.appendChild(b);
    }
    row.appendChild(tiles);
    wrap.appendChild(row);
  });
  $('ms-star-total').textContent = save.stars.reduce((s, v) => s + v, 0);
  $('ms-streak').textContent = d.streak;
  $('ms-daily-title').textContent = 'Daily Puzzle #' + today;
  $('ms-daily-sub').textContent = d.day === today && d.stars > 0
    ? 'Done today: ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' (play again to improve)'
    : 'The same puzzle for everyone. Keep your streak!';
}

/* ---------- Playing ---------- */
function select(r, c) {
  selected = { r, c };
  const v = grid[r][c];
  if (v && given[r][c]) setMsg('Clue ' + v + '. Every ' + v + ' on the board is highlighted.');
  render();
}
function snapshot() {
  undoStack.push({ grid: copyGrid(grid), notes: copyGrid(notes), hinted: copyGrid(hinted) });
  if (undoStack.length > 120) undoStack.shift();
}
function undo() {
  if (state !== 'play' || !undoStack.length) return;
  const s = undoStack.pop();
  grid = s.grid; notes = s.notes; hinted = s.hinted;
  render();
}
function input(d) {
  if (state !== 'play' || !selected) { if (state === 'play') setMsg('Select a cell first.'); return; }
  const { r, c } = selected;
  if (given[r][c] || hinted[r][c]) return;
  if (notesMode) {
    if (grid[r][c]) return;
    snapshot();
    notes[r][c] ^= 1 << (d - 1);
    sfx.note();
    render();
    return;
  }
  if (grid[r][c] === d) return;
  snapshot();
  grid[r][c] = d;
  notes[r][c] = 0;
  const el = cellAt(r, c);
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  if (d !== sol[r][c]) { // a wrong digit costs a life
    lives--; mistakes++;
    sfx.wrong();
    livesEl.classList.remove('hit'); void livesEl.offsetWidth; livesEl.classList.add('hit');
    setMsg('Not ' + d + ' here. That costs a life.', true);
    render();
    if (lives <= 0) finish(false);
    return;
  }
  sfx.place(d);
  setMsg('');
  for (let i = 0; i < SIZE; i++) { // a placed digit cannot be a pencil mark anywhere in its row, column or box
    for (let j = 0; j < SIZE; j++) if (sameUnit({ r, c }, { r: i, c: j })) notes[i][j] &= ~(1 << (d - 1));
  }
  celebrateUnits(r, c);
  render();
  if (isSolved()) finish(true);
}
function erase() {
  if (state !== 'play' || !selected) return;
  const { r, c } = selected;
  if (given[r][c] || hinted[r][c] || (!grid[r][c] && !notes[r][c])) return;
  snapshot();
  grid[r][c] = 0; notes[r][c] = 0;
  render();
}
function isSolved() { return grid.every((row, r) => row.every((v, c) => v === sol[r][c])); }

function celebrateUnits(r, c) { // a green wave across any row, column or box that was just completed
  const done = UNITS.filter(u => u.cells.some(p => p.r === r && p.c === c) && u.cells.every(p => grid[p.r][p.c] === sol[p.r][p.c]));
  if (!done.length) return;
  sfx.done();
  done.forEach(u => u.cells.forEach((p, i) => {
    const el = cellAt(p.r, p.c);
    el.style.setProperty('--wd', (i * 0.06) + 's');
    el.classList.remove('wave'); void el.offsetWidth; el.classList.add('wave');
    setTimeout(() => el.classList.remove('wave'), 1200);
  }));
}

function useHint() {
  if (state !== 'play' || hintsLeft <= 0) return;
  const eff = copyGrid(grid); // wrong digits do not count as placed
  for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (eff[r][c] && eff[r][c] !== sol[r][c]) eff[r][c] = 0;
  let step = findNaked(eff) || findHidden(eff);
  if (!step) {
    outer: for (let r = 0; r < SIZE; r++) for (let c = 0; c < SIZE; c++) if (!eff[r][c]) { step = { r, c, d: sol[r][c], type: 'plain' }; break outer; }
  }
  if (!step) return;
  snapshot();
  grid[step.r][step.c] = step.d;
  notes[step.r][step.c] = 0;
  hinted[step.r][step.c] = 1;
  hintsLeft--; hintsUsed++;
  selected = { r: step.r, c: step.c };
  const where = 'R' + (step.r + 1) + 'C' + (step.c + 1);
  if (step.type === 'naked') {
    const others = [1, 2, 3, 4, 5, 6].filter(x => x !== step.d).join(', ');
    setMsg('<b>' + where + ' can only be ' + step.d + '</b>: ' + others + ' are already in its row, column or box.');
  } else if (step.type === 'hidden') {
    setMsg('<b>In ' + step.unit.kind + ' ' + step.unit.n + ', only ' + where + ' can hold a ' + step.d + '</b>: every other cell there is blocked.');
  } else {
    setMsg('Revealed ' + where + '.');
  }
  sfx.hint();
  const el = cellAt(step.r, step.c);
  el.classList.remove('pop'); void el.offsetWidth; el.classList.add('pop');
  for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE; j++) if (sameUnit(step, { r: i, c: j })) notes[i][j] &= ~(1 << (step.d - 1));
  celebrateUnits(step.r, step.c);
  render();
  if (isSolved()) finish(true);
}

function finish(ok) {
  if (state !== 'play') return;
  state = 'result';
  const stars = ok ? Math.max(1, 3 - (mistakes > 0 ? 1 : 0) - (hintsUsed > 0 ? 1 : 0)) : 0;
  const t = Math.floor(elapsed);
  const score = ok ? Math.max(100, 1000 + Math.max(0, spec.par - t) * 4 - mistakes * 120 - hintsUsed * 90) : 0;
  let best = 0;
  if (isDaily) {
    const d = save.daily;
    if (d.day !== dailyNum) { d.day = dailyNum; d.stars = 0; d.time = 0; }
    if (stars > d.stars) { d.stars = stars; d.time = t; }
    if (stars > 0 && d.lastDay !== dailyNum) { d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1; d.lastDay = dailyNum; }
  } else if (ok) {
    save.stars[levelIndex] = Math.max(save.stars[levelIndex], stars);
    save.best[levelIndex] = save.best[levelIndex] ? Math.min(save.best[levelIndex], t) : t;
    best = save.best[levelIndex];
  }
  persist();
  render();
  if (ok) { sfx.win(); confetti(); } else { sfx.lose(); }

  $('ms-result-title').textContent = !ok ? 'Out of lives' : stars === 3 ? 'Flawless!' : 'Solved!';
  [...$('ms-result-stars').children].forEach((s, i) => s.classList.toggle('on', i < stars));
  $('ms-result-sub').innerHTML = ok
    ? 'Time ' + fmt(t) + (t <= spec.par ? ' (under par ' + fmt(spec.par) + ')' : ' (par ' + fmt(spec.par) + ')') +
      '<br>Mistakes ' + mistakes + ', hints ' + hintsUsed + '<br>Score ' + score + (isDaily ? ', streak ' + save.daily.streak : (best ? ', best time ' + fmt(best) : ''))
    : 'Three wrong digits end the run. The puzzle stays the same, so you can learn from it.';
  nextBtn.hidden = isDaily || !ok || levelIndex >= LEVEL_COUNT - 1;
  shareBtn.hidden = !isDaily || !ok;
  shareBtn.textContent = 'Copy result';
  setTimeout(() => { if (state === 'result') resultEl.classList.add('show'); }, ok ? 900 : 500);
}
function confetti() {
  const colors = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6'];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div');
    p.className = 'ms-confetti';
    p.style.left = Math.random() * 100 + '%';
    p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
    p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (1.6 + Math.random() * 1.4) + 's';
    p.style.animationDelay = (Math.random() * 0.5) + 's';
    panelEl.appendChild(p);
    setTimeout(() => p.remove(), 3800);
  }
}

/* ---------- Timer, pause, input ---------- */
setInterval(() => {
  if (state !== 'play') return;
  const now = performance.now();
  elapsed += (now - lastTick) / 1000;
  lastTick = now;
  timeEl.textContent = fmt(elapsed);
}, 250);

function togglePause() {
  if (state === 'play') { state = 'paused'; pausedEl.classList.add('show'); boardEl.classList.add('dim'); pauseBtn.textContent = 'Resume'; }
  else if (state === 'paused') { state = 'play'; lastTick = performance.now(); pausedEl.classList.remove('show'); boardEl.classList.remove('dim'); pauseBtn.textContent = 'Pause'; }
  render();
}
function toggleNotes() {
  notesMode = !notesMode;
  notesBtn.setAttribute('aria-pressed', String(notesMode));
  if (notesMode) setMsg('Notes on: numbers become small pencil marks.');
  else setMsg('');
}

document.addEventListener('keydown', e => {
  if (e.altKey || e.metaKey) return;
  const k = e.key;
  if (e.ctrlKey) { if ((k === 'z' || k === 'Z') && state === 'play') { e.preventDefault(); undo(); } return; }
  if (state === 'play' && /^[1-6]$/.test(k)) { input(Number(k)); return; }
  if (state === 'play' && (k === 'Backspace' || k === 'Delete' || k === '0')) { e.preventDefault(); erase(); return; }
  if (state === 'play' && /^Arrow/.test(k)) {
    e.preventDefault();
    const cur = selected || { r: 0, c: 0 };
    const dr = k === 'ArrowUp' ? -1 : k === 'ArrowDown' ? 1 : 0, dc = k === 'ArrowLeft' ? -1 : k === 'ArrowRight' ? 1 : 0;
    select(Math.max(0, Math.min(SIZE - 1, selected ? cur.r + dr : 0)), Math.max(0, Math.min(SIZE - 1, selected ? cur.c + dc : 0)));
    return;
  }
  if (k === 'n' || k === 'N') { if (state === 'play') toggleNotes(); }
  else if (k === 'h' || k === 'H') useHint();
  else if (k === 'z' || k === 'Z') undo();
  else if (k === 'p' || k === 'P') togglePause();
  else if (k === 'Escape' && state !== 'menu') showMenu();
});
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') togglePause(); });

notesBtn.addEventListener('click', () => { if (state === 'play') toggleNotes(); notesBtn.blur(); });
hintBtn.addEventListener('click', () => { useHint(); hintBtn.blur(); });
undoBtn.addEventListener('click', () => { undo(); undoBtn.blur(); });
eraseBtn.addEventListener('click', () => { erase(); eraseBtn.blur(); });
pauseBtn.addEventListener('click', () => { if (state === 'play' || state === 'paused') togglePause(); pauseBtn.blur(); });
pausedEl.addEventListener('click', togglePause);
$('ms-levels-btn').addEventListener('click', showMenu);
$('ms-daily').addEventListener('click', startDaily);
$('ms-retry').addEventListener('click', restart);
$('ms-menu-back').addEventListener('click', showMenu);
nextBtn.addEventListener('click', () => startLevel(levelIndex + 1));
shareBtn.addEventListener('click', () => {
  const d = save.daily;
  const text = 'Mini Sudoku Daily #' + dailyNum + ' ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' ' + fmt(d.time) + ', streak ' + d.streak;
  const done = () => { shareBtn.textContent = 'Copied!'; };
  try { navigator.clipboard.writeText(text).then(done, () => { shareBtn.textContent = text; }); } catch (e) { shareBtn.textContent = text; }
});

/* ---------- Fit the whole game into the space available (a short preview area shrinks it instead of cutting it off) ---------- */
const fitEl = $('ms-fit'), wrapEl = $('ms-wrap');
function fitToView() {
  const availW = Math.max(240, window.innerWidth - 28), availH = Math.max(240, window.innerHeight - 24);
  const w = Math.min(520, availW);
  wrapEl.style.transform = 'none';
  wrapEl.style.width = w + 'px';
  const natH = wrapEl.offsetHeight || 1;          // height at this width, before shrinking
  const k = Math.max(0.4, Math.min(1, availH / natH)); // never below 40%, below that the page scrolls
  wrapEl.style.transform = k < 1 ? 'scale(' + k + ')' : 'none';
  fitEl.style.width = Math.round(w * k) + 'px';
  fitEl.style.height = Math.round(natH * k) + 'px';
}
window.addEventListener('resize', fitToView);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitToView).observe(wrapEl);

buildBoard();
isDaily = false; levelIndex = 0;
loadPuzzle(levelSpec(0));
showMenu();
fitToView();`,

  seo: {
    title: 'Mini Sudoku Game with 24 Levels – Free HTML, CSS & JS',
    description: 'Free 6x6 Sudoku with 24 levels, a daily puzzle, hints, pencil notes, lives and stars. Unique-solution generator in plain JS. Exports to React, Vue & Angular.',
    about: {
      title: 'Mini Sudoku — 24 Levels, Unique-Solution Generator, Hints, Pencil Notes, Lives and a Daily Puzzle',
      description: `Mini Sudoku is a 6x6 version of the classic number puzzle: every row, every column and every 3x2 box must contain the digits 1 to 6 exactly once. This version is a full game rather than a demo. It has 24 levels in four difficulty tiers, a Daily Puzzle with a streak, three lives, hints that explain themselves, pencil notes, undo, stars and saved progress. It is written in plain HTML, CSS and JavaScript, with no libraries, no images and no audio files.

**A generator that guarantees one solution**

Every puzzle starts from a complete grid built with randomised backtracking (\`fillGrid()\`). \`carve()\` then removes digits one at a time in random order. After each removal, \`countSolutions()\` runs a depth-first search that always branches on the cell with the fewest candidates and stops after finding two solutions. If the puzzle now has more than one solution, the digit is put back. The result is a puzzle with exactly one answer, so a player can always reason their way to it instead of guessing.

**Difficulty from data, not guesses**

The \`TIERS\` array holds four tiers (Warm-up, Sharp, Brain-burner, Grandmaster), each with a clue count and the hardest technique it may require. \`solvableBy()\` plays a puzzle using only naked singles (a cell with one candidate left) or also hidden singles (a digit that fits only one cell in a row, column or box). Warm-up levels must be solvable with naked singles alone, the middle tiers need hidden singles, and Grandmaster only guarantees a unique solution with as few as 11 clues. If a generated puzzle is too hard for its tier, the generator tries the next seed.

**Seeded, so levels are the same for everyone**

A small seeded random generator (\`mulberry32\`) drives the whole pipeline. Level number i always uses the seed \`1000 + i * 7919\`, so level 7 is the same puzzle for every player and every visit. The Daily Puzzle uses a seed derived from the day number, so everyone gets the same puzzle on the same day, and clearing it on consecutive days builds a streak.

**Hints that teach**

\`useHint()\` looks at the board (ignoring wrong digits) and prefers a naked single, then a hidden single. It fills the cell and explains why in plain words: "R3C4 can only be 5: 1, 2, 3, 4 and 6 are already in its row, column or box", or "In row 2, only R2C5 can hold a 3". The player learns the technique instead of just seeing an answer, and hints reduce the star rating.

**Lives, notes and undo**

A digit that does not match the solution costs one of three lives, shakes the lives counter and turns the cell red. Pencil notes are stored as bit masks, one per cell, and a correct digit removes itself from the notes of every cell in its row, column and box. Undo restores a snapshot of the grid, the notes and the hint cells. Placing the last needed digit of a row, column or box sends a green wave across it.

**Stars, saved progress and feel**

A solved level earns up to three stars: one is lost for any mistake and one for using a hint. A level unlocks when the one before it has at least one star. Stars, best times, the streak and the daily result are saved to \`localStorage\` inside try/catch, so the game also runs in a sandboxed iframe. The board highlights the selected cell's row, column and box and every cell with the same digit, the number pad shows how many of each digit are left, and a synthesized sound and confetti mark a win. The timer pauses with P, when you open the level menu, and when the tab is hidden.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a level or the Daily Puzzle', text: 'The menu shows 24 levels in four tiers with your stars on each. Level 1 is open at first, and each level unlocks when the one before it has at least one star. The gold Daily Puzzle card starts the puzzle of the day.' },
        { title: 'Select a cell and enter a number', text: 'Click a cell, then click a number on the pad or press 1 to 6. The cell, its row, column and box are highlighted, and so is every cell holding the same digit. Move with the arrow keys, and use Backspace or the Erase button to clear a cell.' },
        { title: 'Use pencil notes', text: 'Press N (or the Notes button) to turn numbers into small pencil marks for cells where you are unsure. Placing the correct digit removes it from the notes of its row, column and box automatically.' },
        { title: 'Mind your lives', text: 'A wrong digit turns red and costs one of your three lives. Lose all three and the run ends, but the puzzle stays the same, so you can retry it with what you learned.' },
        { title: 'Ask for a hint when stuck', text: 'Press H or the Hint button. It fills a cell that can be found by logic and explains why in the message line. You get three hints per puzzle, and using one costs a star.' },
        { title: 'Earn stars and unlock more', text: 'Finish with no mistakes and no hints for three stars. The result screen shows your time against the par time, your score and your best time. The timer pauses with P, and Z undoes your last move.' },
      ],
    },
    features: [
      '24 levels in four tiers, plus a Daily Puzzle with a streak, all generated from seeds so they are the same for every player',
      'Generator that keeps the solution unique: digits are removed one by one and put back if a second solution appears',
      'Difficulty checked by a logic solver: naked singles only, hidden singles, or minimal clues with a unique solution',
      'Hints that pick a logical next move and explain it in words, limited to three per puzzle',
      'Three lives: a wrong digit turns red, shakes the lives counter and costs a life',
      'Pencil notes stored as bit masks, cleaned automatically from the row, column and box when a digit is placed',
      'Undo snapshots, arrow-key navigation, pause, and a number pad that counts how many of each digit are left',
      'Stars, par times, best times and unlocks saved to localStorage inside try/catch',
      'Highlights for the selected row, column, box and matching digits, a green wave when a unit is completed, and confetti on a win',
      'Web Audio synth sounds with a mute button, no libraries, no images, and a pause when the tab is hidden',
      'Scales to the space it is given: fitToView() shrinks the whole game (down to 40 percent) in a short or narrow area instead of cutting it off',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching backtracking, constraint solving and unique-solution generation', desc: 'The 6x6 size keeps the search instant, so it is a clear example of three ideas: backtracking to build a grid, a solution counter that stops at two to test uniqueness, and a logic solver that rates difficulty. All three are short enough to read in one sitting.' },
      { icon: 'APP', title: 'A daily puzzle feature for a site or newsletter', desc: 'The date-seeded Daily Puzzle, the streak and the Copy result button are a ready-made pattern for a "puzzle of the day" that brings readers back every morning.' },
      { icon: 'CODE', title: 'Reference for seeded, data-driven level design', desc: 'Levels are rows in a table (clues, technique, par time) and the puzzles are generated from a seed. Adding a tier or changing the difficulty means editing a few numbers.' },
      { icon: 'DESIGN', title: 'Number-entry UI patterns', desc: 'Pencil notes, a pad with remaining counts, same-digit highlighting, arrow-key movement, undo and an explained hint are the features players expect from any good number puzzle, and they carry over to Kakuro, Futoshiki and similar grids.' },
      { icon: 'FLOW', title: 'A calm break in a waiting or onboarding flow', desc: 'A puzzle takes a few minutes, pauses when the tab is hidden and saves progress, so it suits a waiting room, a long upload or the end of a tutorial.' },
      { icon: 'CODE', title: 'Related: Robot Loop Programmer Game', desc: 'See the [Robot Loop Programmer Game](/ui-snippets/robot-loop-programmer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the generator guarantee a unique solution?', a: 'After building a full grid, carve() removes digits in random order. Each time, countSolutions() searches for solutions, always branching on the cell with the fewest candidates, and stops as soon as it finds two. If a second solution exists, the removed digit is restored. Only removals that keep exactly one solution are kept, which is why every puzzle can be solved by reasoning alone.' },
      { q: 'How are the difficulty tiers decided?', a: 'Each tier in the TIERS array has a target number of clues and the hardest technique it may need. solvableBy() solves a copy of the puzzle using only allowed techniques: naked singles, or naked plus hidden singles. A Warm-up puzzle must be fully solvable with naked singles, Sharp and Brain-burner with hidden singles as well, and Grandmaster only needs a unique solution with the fewest clues. A generated puzzle that is too hard for its tier is thrown away and the next seed is tried.' },
      { q: 'Why is every level the same for everyone?', a: 'Randomness comes from mulberry32, a seeded generator, and level i uses the fixed seed 1000 + i * 7919. The same seed always gives the same grid and the same removals, so level 7 is identical for every player. The Daily Puzzle uses a seed built from the number of days since a start date.' },
      { q: 'How do the stars, lives and hints work?', a: 'You get three lives and three hints per puzzle. A digit that does not match the solution costs a life, and losing all three ends the run. A solved puzzle gives three stars, minus one if you made any mistake and minus one if you used a hint, with a minimum of one. The next level unlocks as soon as the previous one has a star.' },
      { q: 'How do I change the levels or add more?', a: 'Edit the TIERS array: clues is how many digits are given, logic is the hardest technique allowed (naked, hidden or null) and par is the target time in seconds. Each tier has six levels, so adding a tier means adding an object and raising the star total in the HTML (three stars per level). levelSpec() lowers the clue count by one for the second half of each tier.' },
      { q: 'Does it work in a sandboxed iframe and on phones?', a: 'Yes. All localStorage reads and writes are wrapped in try/catch, so a blocked storage only means progress is not saved. The AudioContext is created on the first level start and every sound call is wrapped in try/catch. The board uses pointer events and a number pad, so it plays by touch as well as by keyboard.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how carve() and countSolutions() keep every puzzle unique, how solvableBy() rates difficulty with naked and hidden singles, and how useHint() builds its explanation. It is also a good base to extend: ask for a 9x9 mode, a "naked pairs" technique for a harder tier, a hint that shows candidate cells before filling anything, a weekly leaderboard for the Daily Puzzle, or an auto-notes button that fills every candidate. You can also ask it to review the undo snapshots and the lives logic for edge cases.`,
      prompt: `Build a 6x6 Sudoku game with levels in plain HTML, CSS and JavaScript, with no libraries, images or audio files.

Requirements:
- A 6x6 board with 3-column by 2-row boxes, drawn with CSS grid and thicker lines between boxes. Select a cell by click or arrow keys, enter digits with a number pad or the keys 1 to 6, erase with Backspace. Highlight the selected cell's row, column and box and every cell with the same digit. The number pad shows how many of each digit are left and disables a digit that is finished.
- Generate puzzles from a seeded random generator: build a full grid with randomised backtracking, then remove digits one at a time in random order, putting a digit back whenever the puzzle would have more than one solution (a solution counter that branches on the cell with the fewest candidates and stops at two).
- 24 levels in 4 tiers of 6 (Warm-up, Sharp, Brain-burner, Grandmaster) defined as data with a clue count, the hardest technique allowed and a par time. Check difficulty with a logic solver that uses naked singles, or naked and hidden singles, and regenerate with another seed if a puzzle needs more. Level i always uses a fixed seed so every player gets the same puzzle.
- A Daily Puzzle seeded from the date with a day streak and a copy result button. Save stars, best times, the streak and the daily result to localStorage inside try/catch. A level unlocks when the previous one has at least one star.
- Three lives: a digit that does not match the solution turns the cell red and costs a life, and at zero lives the run ends with a retry button. Three hints per puzzle: fill a cell found by logic (naked single first, then hidden single) and explain why in words.
- Pencil notes stored as bit masks per cell, toggled with N, automatically removed from the row, column and box when a digit is placed. Undo using snapshots (Z or Ctrl+Z).
- Stars: 3 for no mistakes and no hints, minus one for each of the two. Show time against par, score and best time on a results screen.
- Feel: a green wave across a completed row, column or box, pop animation on placed digits, a shake on mistakes, confetti on a win, Web Audio synth sounds with a mute button, pause with P and auto-pause when the tab is hidden.`,
    },
  },
};

export default miniSudokuGame;
