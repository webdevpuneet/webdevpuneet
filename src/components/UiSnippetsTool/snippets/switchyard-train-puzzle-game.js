const switchyardTrainPuzzleGame = {
  id: 'switchyard-train-puzzle-game',
  title: 'Switchyard Train Switch Puzzle Game',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="sy-wrap">
  <div class="sy-hud">
    <div class="sy-hud-title"><span class="sy-hud-level" id="sy-hud-level">Switchyard</span><span class="sy-hud-name" id="sy-hud-name">Pick a level</span></div>
    <div class="sy-hud-stats">
      <span class="sy-stat"><span class="sy-stat-label">Trains</span><b id="sy-trains">-</b></span>
      <span class="sy-stat"><span class="sy-stat-label">Misses</span><b class="sy-misses" id="sy-misses">-</b></span>
      <span class="sy-stat"><span class="sy-stat-label">Score</span><b id="sy-score">0</b></span>
      <span class="sy-combo" id="sy-combo"></span>
    </div>
    <div class="sy-hud-btns">
      <button class="sy-btn-sm" id="sy-speed" type="button" title="Speed (F)">1x</button>
      <button class="sy-btn-sm" id="sy-pause" type="button" title="Pause (Space)">Pause</button>
      <button class="sy-btn-sm" id="sy-mute" type="button" aria-pressed="false">Sound on</button>
      <button class="sy-btn-sm" id="sy-levels-btn" type="button" title="Levels (Esc)">Levels</button>
    </div>
  </div>
  <div class="sy-progress"><div class="sy-progress-bar" id="sy-progress"></div></div>

  <div class="sy-stage" id="sy-stage">
    <canvas id="sy-canvas" aria-label="Switchyard game board"></canvas>

    <div class="sy-overlay show" id="sy-menu">
      <div class="sy-menu-head">
        <p class="sy-logo">Switchyard</p>
        <p class="sy-tagline">Flip the switches. Send every train to the station of its colour.</p>
      </div>
      <div class="sy-menu-row">
        <button class="sy-daily" id="sy-daily" type="button">
          <span class="sy-daily-title" id="sy-daily-title">Daily Route</span>
          <span class="sy-daily-sub" id="sy-daily-sub">A new yard every day</span>
        </button>
        <div class="sy-totals">
          <span><b id="sy-star-total">0</b> / 60 stars</span>
          <span>Daily streak <b id="sy-streak">0</b></span>
        </div>
      </div>
      <div class="sy-levels" id="sy-levels"></div>
      <p class="sy-help">Click a switch or press its number key. Space pauses, F speeds up, R restarts, Esc opens the levels.</p>
    </div>

    <div class="sy-overlay" id="sy-result">
      <p class="sy-result-title" id="sy-result-title">Level cleared!</p>
      <div class="sy-result-stars" id="sy-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="sy-result-sub" id="sy-result-sub"></p>
      <div class="sy-result-btns">
        <button class="sy-btn" id="sy-next" type="button">Next level</button>
        <button class="sy-btn sy-btn-ghost" id="sy-retry" type="button">Retry</button>
        <button class="sy-btn sy-btn-ghost" id="sy-share" type="button">Copy result</button>
        <button class="sy-btn sy-btn-ghost" id="sy-menu-back" type="button">Levels</button>
      </div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  background: radial-gradient(ellipse at top, #111a35 0%, #070b16 60%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center;
  padding: 20px; color: #e2e8f0;
}

.sy-wrap { width: 100%; max-width: 1280px; display: flex; flex-direction: column; gap: 10px; }

.sy-hud { display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap; }
.sy-hud-title { display: flex; align-items: baseline; gap: 10px; min-width: 0; }
.sy-hud-level { font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #fbbf24; }
.sy-hud-name { font-size: 18px; font-weight: 800; color: #f8fafc; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.sy-hud-stats { display: flex; align-items: center; gap: 20px; }
.sy-stat { display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.sy-stat-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.sy-stat b { font-size: 17px; font-weight: 800; color: #f1f5f9; font-variant-numeric: tabular-nums; }
.sy-misses { letter-spacing: 3px; }
.sy-miss-on { color: #f87171; text-shadow: 0 0 10px rgba(248,113,113,0.7); }
.sy-miss-off { color: #334155; }
.sy-combo { min-width: 76px; font-size: 13px; font-weight: 900; color: #fbbf24; text-shadow: 0 0 12px rgba(251,191,36,0.6); }
.sy-combo.bump { animation: sy-bump 0.35s ease; }
@keyframes sy-bump { 0% { transform: scale(1.6); } 100% { transform: scale(1); } }

.sy-hud-btns { display: flex; gap: 6px; }
.sy-btn-sm {
  background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.08);
  border-radius: 8px; padding: 6px 11px; font: inherit; font-size: 12px; font-weight: 700; cursor: pointer;
  transition: background 0.15s, border-color 0.15s;
}
.sy-btn-sm:hover { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.18); }
.sy-btn-sm.on { background: #6366f1; border-color: #6366f1; color: #fff; }

.sy-progress { height: 4px; background: rgba(255,255,255,0.06); border-radius: 4px; overflow: hidden; }
.sy-progress-bar { height: 100%; width: 0; background: linear-gradient(90deg, #f87171, #facc15, #4ade80, #60a5fa, #c084fc); transition: width 0.3s; }

.sy-stage {
  position: relative; width: 100%; aspect-ratio: 1100 / 460;
  border-radius: 16px; overflow: hidden; background: #0a1022;
  box-shadow: 0 0 0 1px rgba(148,163,184,0.12), 0 24px 70px rgba(0,0,0,0.55), 0 0 80px rgba(99,102,241,0.12);
}
#sy-canvas { position: absolute; inset: 0; width: 100%; height: 100%; display: block; touch-action: manipulation; }

.sy-overlay {
  position: absolute; inset: 0; z-index: 2;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px;
  padding: 20px; text-align: center; overflow-y: auto;
  background: radial-gradient(ellipse at center, rgba(10,16,34,0.72), rgba(5,8,18,0.9));
  backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.sy-overlay.show { opacity: 1; pointer-events: auto; }

.sy-logo {
  font-size: clamp(30px, 4.6vw, 56px); font-weight: 900; letter-spacing: -0.02em; line-height: 1.05;
  background: linear-gradient(90deg, #f87171, #facc15, #4ade80, #60a5fa, #c084fc);
  -webkit-background-clip: text; background-clip: text; color: transparent;
  filter: drop-shadow(0 0 18px rgba(99,102,241,0.35));
}
.sy-tagline { font-size: 14px; color: #94a3b8; margin-top: 6px; }

.sy-menu-row { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; justify-content: center; }
.sy-daily {
  display: flex; flex-direction: column; align-items: flex-start; gap: 2px;
  padding: 12px 18px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left;
  border: 1px solid rgba(250,204,21,0.45); color: #fef3c7;
  background: linear-gradient(135deg, rgba(250,204,21,0.18), rgba(251,146,60,0.1));
  transition: transform 0.15s, box-shadow 0.15s;
}
.sy-daily:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,204,21,0.2); }
.sy-daily-title { font-size: 15px; font-weight: 800; }
.sy-daily-sub { font-size: 12px; color: #fcd34d; }
.sy-totals { display: flex; flex-direction: column; gap: 4px; font-size: 13px; color: #94a3b8; text-align: left; }
.sy-totals b { color: #f8fafc; }

.sy-levels { display: grid; grid-template-columns: repeat(10, minmax(0, 64px)); gap: 8px; justify-content: center; }
.sy-tile {
  position: relative; height: 58px; border-radius: 10px; cursor: pointer; font: inherit;
  border: 1px solid rgba(148,163,184,0.2); background: rgba(255,255,255,0.04); color: #e2e8f0;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px;
  transition: transform 0.12s, border-color 0.12s, background 0.12s;
}
.sy-tile:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); background: rgba(255,255,255,0.08); }
.sy-tile::after { content: ''; position: absolute; left: 12px; right: 12px; bottom: 5px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.sy-tile-num { font-size: 17px; font-weight: 800; }
.sy-tile-stars { font-size: 10px; letter-spacing: 1px; color: #334155; }
.sy-tile-stars .on { color: #facc15; }
.sy-tile:disabled { opacity: 0.32; cursor: not-allowed; }
.sy-tile.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 14px rgba(250,204,21,0.15); }
.sy-help { font-size: 12px; color: #64748b; }

.sy-result-title { font-size: clamp(24px, 3.4vw, 42px); font-weight: 900; color: #f8fafc; }
.sy-result-stars { display: flex; gap: 12px; font-size: clamp(36px, 5vw, 60px); line-height: 1; }
.sy-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.sy-result-stars span.on { color: #facc15; text-shadow: 0 0 24px rgba(250,204,21,0.75); }
.sy-overlay.show .sy-result-stars span { animation: sy-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.sy-overlay.show .sy-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.sy-overlay.show .sy-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes sy-star { to { transform: scale(1); opacity: 1; } }
.sy-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.6; }
.sy-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.sy-btn {
  padding: 10px 20px; border-radius: 10px; border: none; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800;
  background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; box-shadow: 0 6px 18px rgba(99,102,241,0.35);
  transition: transform 0.12s;
}
.sy-btn:hover { transform: translateY(-1px); }
.sy-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.sy-btn[hidden] { display: none; }

@media (max-width: 760px) {
  .sy-levels { grid-template-columns: repeat(5, minmax(0, 56px)); }
  .sy-hud-stats { gap: 12px; }
  .sy-tagline, .sy-help { display: none; }
}`,

  js: `const W = 1100, H = 460;           // logical board size; the canvas scales it to the container width
const STATION_X = 1020;               // front of each station shed
const SHED_END = STATION_X + 70;      // a train's head stops here, inside the shed
const ENTRY_MOUTH = 58;               // right edge of the entry tunnel mouths
const TRAIN_LEN = 88;
const PIECES = [{ off: 0, len: 30, engine: true }, { off: 34, len: 24 }, { off: 62, len: 24 }];
const MAX_MISSES = 3;
const COLORS = [
  { name: 'Red', c: '#f87171', d: '#b91c1c' },
  { name: 'Blue', c: '#60a5fa', d: '#1d4ed8' },
  { name: 'Green', c: '#4ade80', d: '#15803d' },
  { name: 'Yellow', c: '#facc15', d: '#a16207' },
  { name: 'Purple', c: '#c084fc', d: '#7e22ce' },
  { name: 'Orange', c: '#fb923c', d: '#c2410c' },
];
// Every level is data. The track layout is generated from it with a fixed seed, so a level always looks the same.
// stations: how many coloured stations; entries: 1 or 2 tunnels (2 tunnels means crossing tracks and crashes);
// speed: px per second; trains: how many trains; gap: average ms between trains; tunnels: how many track tunnels
// hide passing trains; dark: a long entry tunnel, so you see each train's colour later.
const LEVELS = [
  { name: 'First Switch',     stations: 2, entries: 1, speed: 70,  trains: 6,  gap: 3200, tunnels: 0, dark: false },
  { name: 'Two Ways',         stations: 3, entries: 1, speed: 75,  trains: 8,  gap: 3000, tunnels: 0, dark: false },
  { name: 'Fork in the Road', stations: 3, entries: 1, speed: 82,  trains: 10, gap: 2700, tunnels: 0, dark: false },
  { name: 'Morning Shift',    stations: 4, entries: 1, speed: 85,  trains: 10, gap: 2700, tunnels: 0, dark: false },
  { name: 'Busy Yard',        stations: 4, entries: 1, speed: 90,  trains: 12, gap: 2300, tunnels: 0, dark: false },
  { name: 'Five Platforms',   stations: 5, entries: 1, speed: 92,  trains: 12, gap: 2300, tunnels: 0, dark: false },
  { name: 'Express Lane',     stations: 5, entries: 1, speed: 105, trains: 14, gap: 2100, tunnels: 0, dark: false },
  { name: 'Six Colours',      stations: 6, entries: 1, speed: 100, trains: 14, gap: 2200, tunnels: 0, dark: false },
  { name: 'Into the Dark',    stations: 4, entries: 1, speed: 92,  trains: 12, gap: 2400, tunnels: 1, dark: true },
  { name: 'Hidden Freight',   stations: 5, entries: 1, speed: 95,  trains: 12, gap: 2300, tunnels: 2, dark: true },
  { name: 'Mountain Pass',    stations: 5, entries: 1, speed: 100, trains: 14, gap: 2200, tunnels: 2, dark: true },
  { name: 'Blind Corners',    stations: 6, entries: 1, speed: 100, trains: 14, gap: 2200, tunnels: 3, dark: true },
  { name: 'Crossroads',       stations: 4, entries: 2, speed: 85,  trains: 12, gap: 2000, tunnels: 0, dark: false },
  { name: 'Double Trouble',   stations: 4, entries: 2, speed: 92,  trains: 14, gap: 1900, tunnels: 0, dark: false },
  { name: 'Near Miss',        stations: 5, entries: 2, speed: 95,  trains: 14, gap: 1800, tunnels: 0, dark: false },
  { name: 'Grand Junction',   stations: 6, entries: 2, speed: 95,  trains: 16, gap: 1800, tunnels: 0, dark: false },
  { name: 'Rush Hour',        stations: 5, entries: 2, speed: 110, trains: 16, gap: 1700, tunnels: 1, dark: false },
  { name: 'Night Express',    stations: 6, entries: 2, speed: 115, trains: 18, gap: 1650, tunnels: 1, dark: true },
  { name: 'Total Chaos',      stations: 6, entries: 2, speed: 120, trains: 20, gap: 1550, tunnels: 2, dark: true },
  { name: 'Switchmaster',     stations: 6, entries: 2, speed: 130, trains: 22, gap: 1450, tunnels: 2, dark: true },
];
const GROUP_COLORS = ['#4ade80', '#60a5fa', '#c084fc', '#fb923c', '#f87171']; // one accent per group of 4 levels
const SAVE_KEY = 'switchyard-save-v1';
const DAY0 = Date.UTC(2026, 10, 11); // Daily Route #1

const stageEl = document.getElementById('sy-stage');
const canvas = document.getElementById('sy-canvas');
const ctx = canvas.getContext('2d');
const menuEl = document.getElementById('sy-menu');
const resultEl = document.getElementById('sy-result');
const levelsEl = document.getElementById('sy-levels');
const hudLevel = document.getElementById('sy-hud-level');
const hudName = document.getElementById('sy-hud-name');
const trainsEl = document.getElementById('sy-trains');
const missesEl = document.getElementById('sy-misses');
const scoreEl = document.getElementById('sy-score');
const comboEl = document.getElementById('sy-combo');
const progressEl = document.getElementById('sy-progress');
const speedBtn = document.getElementById('sy-speed');
const pauseBtn = document.getElementById('sy-pause');
const muteBtn = document.getElementById('sy-mute');
const nextBtn = document.getElementById('sy-next');
const shareBtn = document.getElementById('sy-share');

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() {
  return { stars: LEVELS.map(() => 0), best: LEVELS.map(() => 0), daily: { day: 0, stars: 0, streak: 0, lastDay: 0 } };
}
function loadSave() {
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      const f = freshSave();
      return {
        stars: f.stars.map((_, i) => s.stars[i] || 0),
        best: f.best.map((_, i) => (s.best && s.best[i]) || 0),
        daily: Object.assign(f.daily, s.daily || {}),
      };
    }
  } catch (e) { /* storage blocked */ }
  return freshSave();
}
function persist() {
  try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* storage blocked */ }
}
let save = loadSave();

/* ---------- Seeded random (same seed, same yard) ---------- */
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

/* ---------- Track geometry: each edge is a cubic curve with a lookup table for travelling along it ---------- */
function bez(p0, p1, p2, p3, t) {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
}
function makeEdge(a, b, to, gi) {
  const dx = b.x - a.x;
  const c1 = { x: a.x + dx * 0.5, y: a.y }, c2 = { x: b.x - dx * 0.5, y: b.y };
  const pts = [];
  let len = 0, prev = null;
  for (let i = 0; i <= 40; i++) {
    const p = bez(a, c1, c2, b, i / 40);
    if (prev) len += Math.hypot(p.x - prev.x, p.y - prev.y);
    pts.push({ x: p.x, y: p.y, d: len });
    prev = p;
  }
  return { a, b, pts, len, to, gi, tunnel: null, entry: false, cover: 0, colors: null };
}
function pointAt(e, d) {
  const n = e.pts.length;
  if (d <= 0 || d >= e.len) { // straight extension before the start / after the end
    const p0 = d <= 0 ? e.pts[0] : e.pts[n - 2], p1 = d <= 0 ? e.pts[1] : e.pts[n - 1];
    const ang = Math.atan2(p1.y - p0.y, p1.x - p0.x);
    const base = d <= 0 ? p0 : p1, over = d <= 0 ? d : d - e.len;
    return { x: base.x + Math.cos(ang) * over, y: base.y + Math.sin(ang) * over, ang };
  }
  let lo = 0, hi = n - 1;
  while (hi - lo > 1) { const mid = (lo + hi) >> 1; if (e.pts[mid].d < d) lo = mid; else hi = mid; }
  const p0 = e.pts[lo], p1 = e.pts[hi];
  const f = (d - p0.d) / ((p1.d - p0.d) || 1);
  return { x: p0.x + (p1.x - p0.x) * f, y: p0.y + (p1.y - p0.y) * f, ang: Math.atan2(p1.y - p0.y, p1.x - p0.x) };
}

/* ---------- Level layout ---------- */
function splitTree(list, depth, R) {
  if (list.length === 1) return { leaf: list[0], depth };
  const k = 1 + Math.floor(R() * (list.length - 1));
  return { depth, kids: [splitTree(list.slice(0, k), depth + 1, R), splitTree(list.slice(k), depth + 1, R)] };
}
function junctionDepth(n) { return n.kids ? 1 + Math.max(junctionDepth(n.kids[0]), junctionDepth(n.kids[1])) : 0; }
function leafYs(n, stations) { return n.kids ? leafYs(n.kids[0], stations).concat(leafYs(n.kids[1], stations)) : [stations[n.leaf].y]; }
function edgeColors(e) { // the station colours an edge can still lead to (used by the demo autopilot)
  if (!e.colors) e.colors = e.to.kind === 'station' ? [e.to.color] : edgeColors(e.to.out[0]).concat(edgeColors(e.to.out[1]));
  return e.colors;
}

function tryLayout(def, R, force) {
  const N = def.stations, top = 58, bottom = H - 58;
  const colorIdx = shuffle([0, 1, 2, 3, 4, 5], R).slice(0, N);
  const stations = [];
  for (let i = 0; i < N; i++) {
    stations.push({ kind: 'station', x: STATION_X, y: top + (bottom - top) * i / (N - 1), color: colorIdx[i], flash: 0, bad: 0 });
  }
  let groups, entryYs;
  if (def.entries === 1) {
    groups = [stations.map((_, i) => i)];
    entryYs = [H / 2 + (R() - 0.5) * 140];
  } else { // two tunnels serve alternating stations, so their tracks cross
    const a = [], b = [];
    stations.forEach((_, i) => (i % 2 ? b : a).push(i));
    groups = R() < 0.5 ? [a, b] : [b, a];
    entryYs = [H * 0.26, H * 0.74];
  }
  const junctions = [], edges = [], entries = [];
  groups.forEach((list, gi) => {
    const tree = splitTree(list, 0, R);
    const D = junctionDepth(tree);
    const ey = entryYs[gi];
    const x0 = def.entries === 1 ? 180 : 170 + gi * 60;
    const x1 = def.entries === 1 ? 860 : 820 + gi * 60;
    const place = n => {
      if (!n.kids) return stations[n.leaf];
      const ys = leafYs(n, stations);
      const my = ys.reduce((s, v) => s + v, 0) / ys.length;
      const j = {
        kind: 'junction', gi, out: [], pulse: 0, key: 0, state: R() < 0.5 ? 0 : 1,
        x: x0 + (x1 - x0) * (n.depth + 0.5) / D,
        y: ey + (my - ey) * (n.depth + 1) / (D + 1),
      };
      junctions.push(j);
      n.kids.forEach(k => {
        const child = place(k);
        const end = child.kind === 'station' ? { x: SHED_END, y: child.y } : { x: child.x, y: child.y };
        const e = makeEdge({ x: j.x, y: j.y }, end, child, gi);
        j.out.push(e);
        edges.push(e);
      });
      return j;
    };
    const root = place(tree);
    const entryEdge = makeEdge({ x: -90, y: ey }, { x: root.x, y: root.y }, root, gi);
    entryEdge.entry = true;
    entryEdge.cover = def.dark ? Math.max(ENTRY_MOUTH, Math.min(210, root.x - 140)) : ENTRY_MOUTH;
    edges.push(entryEdge);
    entries.push({ gi, y: ey, edge: entryEdge, group: list });
  });

  if (!force) { // reject cramped or confusing yards and try the next seed
    for (let i = 0; i < junctions.length; i++) {
      for (let k = i + 1; k < junctions.length; k++) {
        if (Math.hypot(junctions[i].x - junctions[k].x, junctions[i].y - junctions[k].y) < 66) return null;
      }
    }
    for (const e of edges) if (!e.entry && e.to.kind === 'junction' && e.b.x - e.a.x < 80) return null;
    if (entries.length > 1) {
      for (const j of junctions) {
        for (const e of edges) {
          if (e.gi === j.gi) continue;
          for (const p of e.pts) if (Math.hypot(p.x - j.x, p.y - j.y) < 30) return null;
        }
      }
    }
  }

  // number keys 1-9, left to right
  junctions.slice().sort((p, q) => p.x - q.x || p.y - q.y).forEach((j, i) => { j.key = i + 1; });

  // where tracks from the two tunnels cross (drawn as warning diamonds)
  const crossings = [];
  for (const e1 of edges) {
    for (const e2 of edges) {
      if (e1.gi >= e2.gi) continue;
      for (let i = 1; i < e1.pts.length; i++) {
        for (let k = 1; k < e2.pts.length; k++) {
          const p = segHit(e1.pts[i - 1], e1.pts[i], e2.pts[k - 1], e2.pts[k]);
          if (p && p.x > 0 && !crossings.some(c => Math.hypot(c.x - p.x, c.y - p.y) < 24)) crossings.push(p);
        }
      }
    }
  }
  // tunnels over the middle of long edges
  let tunnelCount = 0;
  shuffle(edges.filter(e => !e.entry && e.len > 220), R).forEach(e => {
    if (tunnelCount >= def.tunnels) return;
    const d0 = e.len * 0.26;
    let d1 = d0 + Math.min(170, e.len * 0.42);
    if (e.to.kind === 'station') d1 = Math.min(d1, e.len - 150);
    // never hide a crossing: a crash there would be invisible
    const hidesCrossing = crossings.some(c => e.pts.some(p => p.d > d0 - 20 && p.d < d1 + 20 && Math.hypot(p.x - c.x, p.y - c.y) < 30));
    if (d1 - d0 > 60 && !hidesCrossing) { e.tunnel = { d0, d1 }; tunnelCount++; }
  });

  edges.forEach(edgeColors);
  return { def, stations, junctions, edges, entries, crossings };
}
function segHit(a, b, c, d) {
  const den = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);
  if (!den) return null;
  const t = ((c.x - a.x) * (d.y - c.y) - (c.y - a.y) * (d.x - c.x)) / den;
  const u = ((c.x - a.x) * (b.y - a.y) - (c.y - a.y) * (b.x - a.x)) / den;
  return t >= 0 && t <= 1 && u >= 0 && u <= 1 ? { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t } : null;
}
function buildLevel(def, seed) {
  for (let attempt = 0; attempt < 80; attempt++) {
    const L = tryLayout(def, mulberry32(seed + attempt * 7919), false);
    if (L) return L;
  }
  return tryLayout(def, mulberry32(seed), true);
}
function makeSchedule(def, L, R, startAt) {
  const list = [];
  const last = L.entries.map(() => -1e9);
  const minGap = (TRAIN_LEN + 70) / def.speed * 1000; // trains from one tunnel never overlap
  let t = startAt;
  for (let i = 0; i < def.trains; i++) {
    const e = L.entries.length === 1 ? 0 : (R() < 0.5 ? 0 : 1);
    t = Math.max(t, last[e] + minGap);
    const g = L.entries[e].group;
    list.push({ t, entry: e, color: L.stations[g[Math.floor(R() * g.length)]].color });
    last[e] = t;
    t += def.gap * (0.7 + R() * 0.6);
  }
  return list;
}
function dailyDef(n) {
  const R = mulberry32(n * 9301 + 49297);
  const stations = 4 + Math.floor(R() * 3);
  const entries = R() < 0.55 ? 2 : 1;
  return {
    name: 'Daily Route #' + n, stations, entries,
    speed: 95 + Math.floor(R() * 25), trains: 14 + Math.floor(R() * 5), gap: entries === 2 ? 1800 : 2200,
    tunnels: R() < 0.5 ? 1 + Math.floor(R() * 2) : 0, dark: R() < 0.35,
  };
}

/* ---------- Sound: a tiny Web Audio synth, no files ---------- */
let audioCtx = null, muted = false;
function getAudio() {
  if (!audioCtx) {
    try { audioCtx = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { audioCtx = null; }
  }
  if (audioCtx && audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}
function tone(freq, dur, type, vol, slideTo, delay) {
  if (muted || !audioCtx) return;
  try {
    const t0 = audioCtx.currentTime + (delay || 0);
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
    gain.gain.setValueAtTime(vol, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur);
  } catch (e) { /* audio is optional */ }
}
const sfx = {
  flip() { tone(1250, 0.03, 'square', 0.03); tone(720, 0.05, 'square', 0.03, null, 0.03); },
  toot() { tone(587, 0.12, 'triangle', 0.025); tone(740, 0.16, 'triangle', 0.025, null, 0.13); },
  chime(n) { const f = 523 * Math.pow(1.12, n - 1); tone(f, 0.14, 'sine', 0.07); tone(f * 1.5, 0.22, 'sine', 0.05, null, 0.08); },
  wrong() { tone(150, 0.32, 'sawtooth', 0.06, 90); },
  crash() { tone(120, 0.5, 'sawtooth', 0.09, 40); tone(70, 0.6, 'square', 0.06, 35, 0.02); },
  win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, i * 0.12)); },
  lose() { tone(330, 0.3, 'sawtooth', 0.05, 160); tone(220, 0.45, 'sawtooth', 0.05, 110, 0.25); },
};
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
  muteBtn.setAttribute('aria-pressed', String(muted));
});

/* ---------- Game state ---------- */
let L = null, def = null, levelIndex = 0, isDaily = false, dailyNum = 0, demo = true;
let schedule = [], nextSpawn = 0, trains = [], particles = [], texts = [];
let time = 0, tick = 0, shake = 0, speedMul = 1;
let state = 'menu'; // menu (demo runs behind it) | play | paused | result
let delivered = 0, missed = 0, resolved = 0, score = 0, combo = 0, hover = null;
const staticCanvas = document.createElement('canvas');
const sctx = staticCanvas.getContext('2d');
let scale = 1;

function hiddenAt(e, d, p) {
  if (e.entry && p.x < e.cover) return true;              // still inside the entry tunnel
  if (e.tunnel && d > e.tunnel.d0 && d < e.tunnel.d1) return true; // under a tunnel
  return p.x > STATION_X + 4;                               // inside a station shed
}
function trainPoint(tr, d) { // a point d px along the train's path (negative = further back)
  let i = tr.hist.length - 1, dd = d;
  while (dd < 0 && i > 0) { i--; dd += tr.hist[i].len; }
  const e = tr.hist[i];
  const p = pointAt(e, dd);
  p.hidden = hiddenAt(e, dd, p);
  return p;
}

function loadRun(newDef, seed, isDemo) {
  def = newDef;
  demo = isDemo;
  L = buildLevel(def, seed);
  schedule = makeSchedule(def, L, mulberry32(seed + 5), isDemo ? 300 : 1700);
  nextSpawn = 0; trains = []; particles = []; texts = [];
  time = 0; shake = 0;
  delivered = 0; missed = 0; resolved = 0; score = 0; combo = 0;
  renderStatic();
}
function startLevel(i) {
  getAudio();
  isDaily = false;
  levelIndex = i;
  loadRun(LEVELS[i], 1000 + i * 37, false);
  beginPlay();
}
function startDaily() {
  getAudio();
  isDaily = true;
  dailyNum = todayNumber();
  loadRun(dailyDef(dailyNum), dailyNum * 7919 + 13, false);
  beginPlay();
}
function beginPlay() {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur(); // Space must not re-press a menu button
  state = 'play';
  menuEl.classList.remove('show');
  resultEl.classList.remove('show');
  pauseBtn.textContent = 'Pause';
  updateHud();
}
function restart() { if (isDaily) startDaily(); else startLevel(levelIndex); }

function startDemo() {
  isDaily = false;
  loadRun(LEVELS[15], 4242 + Math.floor(Math.random() * 1000), true);
}
function showMenu() {
  state = 'menu';
  resultEl.classList.remove('show');
  menuEl.classList.add('show');
  renderMenu();
  startDemo();
  hudLevel.textContent = 'Switchyard';
  hudName.textContent = 'Pick a level';
  trainsEl.textContent = '-'; missesEl.textContent = '-'; scoreEl.textContent = '0'; comboEl.textContent = '';
  progressEl.style.width = '0';
}

function spawn(item) {
  const en = L.entries[item.entry];
  trains.push({ entry: item.entry, color: item.color, hist: [en.edge], d: 0, seen: false, judged: false, gone: false, smoke: 0 });
}

function autopilot() { // demo only: set each junction for the nearest train heading into it
  const want = new Map();
  trains.forEach(tr => {
    const e = tr.hist[tr.hist.length - 1];
    if (e.to.kind !== 'junction') return;
    const left = e.len - tr.d;
    const cur = want.get(e.to);
    if (!cur || left < cur.left) want.set(e.to, { left, color: tr.color });
  });
  want.forEach((w, j) => {
    const s = edgeColors(j.out[0]).includes(w.color) ? 0 : 1;
    if (j.state !== s) { j.state = s; j.pulse = 1; }
  });
}

function moveTrain(tr, dt) {
  tr.d += def.speed * dt;
  let e = tr.hist[tr.hist.length - 1];
  while (tr.d >= e.len && e.to.kind === 'junction') {
    tr.d -= e.len;
    e = e.to.out[e.to.state]; // the switch decides at the moment the train reaches it
    tr.hist.push(e);
    if (tr.hist.length > 6) tr.hist.shift();
  }
  if (e.to.kind === 'station') {
    if (!tr.judged && tr.d >= e.len - (SHED_END - STATION_X)) judge(tr, e.to);
    if (tr.d >= e.len + 30) { tr.gone = true; return; } // the last wagon is inside the shed by now
  }
  const head = pointAt(e, tr.d);
  if (!tr.seen && !hiddenAt(e, tr.d, head)) { tr.seen = true; if (!demo) sfx.toot(); }
  tr.smoke -= dt;
  if (tr.smoke <= 0) {
    tr.smoke = 0.08;
    const p = trainPoint(tr, tr.d - 8);
    if (!p.hidden) particles.push({ kind: 'smoke', x: p.x, y: p.y, vx: (Math.random() - 0.5) * 8, vy: -14 - Math.random() * 10, life: 1, size: 3 });
  }
}

function judge(tr, st) {
  tr.judged = true;
  const c = COLORS[st.color];
  if (st.color === tr.color) {
    st.flash = 1;
    burst(STATION_X, st.y, c.c, 18, 'spark');
    if (demo) return;
    delivered++; resolved++;
    combo = Math.min(5, combo + 1);
    const pts = 100 * combo;
    score += pts;
    addText('+' + pts + (combo > 1 ? '  x' + combo : ''), STATION_X - 50, st.y - 30, c.c);
    sfx.chime(combo);
    if (combo > 1) { comboEl.classList.remove('bump'); void comboEl.offsetWidth; comboEl.classList.add('bump'); }
  } else {
    st.bad = 1;
    if (demo) return;
    missed++; resolved++; combo = 0;
    shake = 7;
    addText('Wrong station!', STATION_X - 60, st.y - 30, '#f87171');
    sfx.wrong();
  }
  updateHud();
  if (missed >= MAX_MISSES) finishLevel(false);
}

function checkCrashes() {
  if (L.entries.length < 2) return;
  for (let a = 0; a < trains.length; a++) {
    for (let b = a + 1; b < trains.length; b++) {
      const A = trains[a], B = trains[b];
      if (A.entry === B.entry || A.gone || B.gone || A.judged || B.judged) continue;
      const pa = PIECES.map(pc => trainPoint(A, A.d - pc.off - pc.len / 2));
      const pb = PIECES.map(pc => trainPoint(B, B.d - pc.off - pc.len / 2));
      let hit = null;
      for (const p of pa) for (const q of pb) if (!hit && Math.hypot(p.x - q.x, p.y - q.y) < 16) hit = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
      if (hit) crash(A, B, hit);
    }
  }
}
function crash(A, B, at) {
  A.gone = true; B.gone = true;
  burst(at.x, at.y, '#fb923c', 26, 'fire');
  burst(at.x, at.y, '#facc15', 16, 'spark');
  burst(at.x, at.y, '#475569', 14, 'smoke');
  shake = 14;
  if (demo) return;
  missed++; resolved += 2; combo = 0;
  addText('Crash!', at.x, at.y - 24, '#fb923c');
  sfx.crash();
  updateHud();
  if (missed >= MAX_MISSES) finishLevel(false);
}

function finishLevel(ok) {
  if (state !== 'play') return;
  state = 'result';
  const stars = ok ? Math.max(1, MAX_MISSES - missed) : 0;
  if (ok) score += stars * 150;
  let best = 0;
  if (isDaily) {
    const d = save.daily;
    if (d.day !== dailyNum) { d.day = dailyNum; d.stars = 0; }
    d.stars = Math.max(d.stars, stars);
    if (stars > 0 && d.lastDay !== dailyNum) {
      d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1;
      d.lastDay = dailyNum;
    }
  } else {
    save.stars[levelIndex] = Math.max(save.stars[levelIndex], stars);
    save.best[levelIndex] = Math.max(save.best[levelIndex], score);
    best = save.best[levelIndex];
  }
  persist();
  updateHud();
  if (ok) sfx.win(); else sfx.lose();

  const title = !ok ? 'Derailed!' : isDaily ? 'Daily Route cleared!' : stars === 3 ? 'Perfect run!' : 'Level cleared!';
  document.getElementById('sy-result-title').textContent = title;
  [...document.getElementById('sy-result-stars').children].forEach((s, i) => s.classList.toggle('on', i < stars));
  document.getElementById('sy-result-sub').textContent =
    'Delivered ' + delivered + ' of ' + def.trains + ' trains. Score ' + score +
    (isDaily ? '. Daily streak ' + save.daily.streak + '.' : '. Best ' + best + '.') +
    (ok ? '' : ' Three misses end the run.');
  nextBtn.hidden = isDaily || !ok || levelIndex >= LEVELS.length - 1;
  shareBtn.hidden = !isDaily;
  shareBtn.textContent = 'Copy result';
  setTimeout(() => { if (state === 'result') resultEl.classList.add('show'); }, 700);
}

/* ---------- HUD and menu ---------- */
function starSpans(n) {
  let s = '';
  for (let i = 0; i < 3; i++) s += '<span class="' + (i < n ? 'on' : '') + '">\\u2605</span>';
  return s;
}
function updateHud() {
  if (state === 'menu') return;
  hudLevel.textContent = isDaily ? 'Daily' : 'Level ' + (levelIndex + 1);
  hudName.textContent = def.name;
  trainsEl.textContent = resolved + '/' + def.trains;
  let m = '';
  for (let i = 0; i < MAX_MISSES; i++) m += '<span class="' + (i < missed ? 'sy-miss-on' : 'sy-miss-off') + '">\\u2715</span>';
  missesEl.innerHTML = m;
  scoreEl.textContent = score;
  comboEl.textContent = combo > 1 ? 'Combo x' + combo : '';
  progressEl.style.width = Math.min(100, (resolved / def.trains) * 100) + '%';
}
function renderMenu() {
  const today = todayNumber();
  const d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0; // missed a day
  levelsEl.innerHTML = '';
  LEVELS.forEach((lv, i) => {
    const unlocked = i === 0 || save.stars[i - 1] > 0;
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'sy-tile' + (save.stars[i] === 3 ? ' perfect' : '');
    b.style.setProperty('--g', GROUP_COLORS[Math.floor(i / 4)]);
    b.disabled = !unlocked;
    b.title = unlocked ? lv.name : 'Clear level ' + i + ' to unlock';
    b.innerHTML = '<span class="sy-tile-num">' + (i + 1) + '</span><span class="sy-tile-stars">' + starSpans(save.stars[i]) + '</span>';
    b.addEventListener('click', () => startLevel(i));
    levelsEl.appendChild(b);
  });
  document.getElementById('sy-star-total').textContent = save.stars.reduce((s, v) => s + v, 0);
  document.getElementById('sy-streak').textContent = d.streak;
  document.getElementById('sy-daily-title').textContent = 'Daily Route #' + today;
  document.getElementById('sy-daily-sub').textContent = d.day === today && d.stars > 0
    ? 'Today: ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' (play again to improve)'
    : 'A new yard every day. Keep your streak going!';
}

/* ---------- Effects ---------- */
function burst(x, y, color, n, kind) {
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2, sp = 30 + Math.random() * (kind === 'fire' ? 140 : 110);
    particles.push({ kind, x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - (kind === 'spark' ? 40 : 0), life: 1, size: kind === 'smoke' ? 5 : 2 + Math.random() * 2.5, color });
  }
}
function addText(text, x, y, color) { texts.push({ text, x, y, color, life: 1 }); }

/* ---------- Main loop ---------- */
function update(dt) {
  tick += dt;
  shake *= Math.pow(0.02, dt);
  particles.forEach(p => {
    p.x += p.vx * dt; p.y += p.vy * dt;
    if (p.kind === 'smoke') { p.size += 10 * dt; p.life -= 0.9 * dt; p.vx *= 0.98; }
    else { p.vy += 160 * dt; p.vx *= 0.97; p.life -= 1.4 * dt; }
  });
  particles = particles.filter(p => p.life > 0);
  texts.forEach(t => { t.y -= 26 * dt; t.life -= 0.8 * dt; });
  texts = texts.filter(t => t.life > 0);
  if (L) {
    L.stations.forEach(s => { s.flash = Math.max(0, s.flash - dt * 1.8); s.bad = Math.max(0, s.bad - dt * 1.5); });
    L.junctions.forEach(j => { j.pulse = Math.max(0, j.pulse - dt * 2.5); });
  }
  if (!L || (state !== 'play' && state !== 'menu')) return;

  time += dt * 1000;
  while (nextSpawn < schedule.length && time >= schedule[nextSpawn].t) spawn(schedule[nextSpawn++]);
  if (demo) autopilot();
  trains.forEach(tr => moveTrain(tr, dt));
  if (state === 'play' || demo) checkCrashes();
  trains = trains.filter(t => !t.gone);
  if (nextSpawn >= schedule.length && trains.length === 0) {
    if (demo) { schedule = makeSchedule(def, L, Math.random, 300); nextSpawn = 0; time = 0; }
    else finishLevel(true);
  }
}

let lastNow = performance.now();
function frame(now) {
  const raw = Math.min(0.05, (now - lastNow) / 1000);
  lastNow = now;
  update(state === 'play' ? raw * speedMul : raw);
  draw();
  requestAnimationFrame(frame);
}

/* ---------- Drawing ---------- */
function roundRect(c, x, y, w, h, r) {
  c.beginPath();
  c.moveTo(x + r, y);
  c.arcTo(x + w, y, x + w, y + h, r);
  c.arcTo(x + w, y + h, x, y + h, r);
  c.arcTo(x, y + h, x, y, r);
  c.arcTo(x, y, x + w, y, r);
  c.closePath();
}
function tracePath(c, e, d0, d1) {
  const from = d0 || 0, to = d1 === undefined ? e.len : d1;
  const s = pointAt(e, from);
  c.beginPath();
  c.moveTo(s.x, s.y);
  for (const p of e.pts) if (p.d > from && p.d < to) c.lineTo(p.x, p.y);
  const f = pointAt(e, to);
  c.lineTo(f.x, f.y);
}

function resize() {
  const w = stageEl.clientWidth || W;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const pw = Math.round(w * dpr), ph = Math.round(w * H / W * dpr);
  if (canvas.width !== pw || canvas.height !== ph) {
    canvas.width = pw; canvas.height = ph;
    staticCanvas.width = pw; staticCanvas.height = ph;
  }
  scale = pw / W;
  renderStatic();
}

function renderStatic() { // background and rails: drawn once per level / resize, then copied every frame
  const c = sctx;
  c.setTransform(1, 0, 0, 1, 0, 0);
  c.clearRect(0, 0, staticCanvas.width, staticCanvas.height);
  c.setTransform(scale, 0, 0, scale, 0, 0);
  const g = c.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0, '#0d1733'); g.addColorStop(1, '#060a18');
  c.fillStyle = g;
  c.fillRect(0, 0, W, H);
  const glow = c.createRadialGradient(W * 0.5, H * 0.55, 20, W * 0.5, H * 0.55, W * 0.6);
  glow.addColorStop(0, 'rgba(99,102,241,0.10)'); glow.addColorStop(1, 'rgba(99,102,241,0)');
  c.fillStyle = glow;
  c.fillRect(0, 0, W, H);
  c.fillStyle = 'rgba(148,163,184,0.07)';
  for (let x = 14; x < W; x += 28) for (let y = 14; y < H; y += 28) c.fillRect(x, y, 1.5, 1.5);
  if (!L) return;
  c.lineCap = 'round'; c.lineJoin = 'round';
  L.edges.forEach(e => { tracePath(c, e); c.strokeStyle = 'rgba(2,6,23,0.85)'; c.lineWidth = 20; c.stroke(); });
  L.edges.forEach(e => { // sleepers
    tracePath(c, e); c.setLineDash([3, 7]); c.lineCap = 'butt';
    c.strokeStyle = '#5b4636'; c.lineWidth = 14; c.stroke();
    c.setLineDash([]); c.lineCap = 'round';
  });
  L.edges.forEach(e => { // two steel rails
    tracePath(c, e); c.strokeStyle = '#a5b4c8'; c.lineWidth = 7.5; c.stroke();
    tracePath(c, e); c.strokeStyle = '#3a3240'; c.lineWidth = 4.5; c.stroke();
  });
}

function destColor(e) { // follow the switches from an edge to the station they currently lead to
  let guard = 0;
  while (e.to.kind === 'junction' && guard++ < 12) e = e.to.out[e.to.state];
  return COLORS[e.to.color].c;
}

function drawRoutes() { // the live route from each tunnel glows in the colour of the station it ends at
  L.entries.forEach(en => {
    let e = en.edge;
    const path = [e];
    let guard = 0;
    while (e.to.kind === 'junction' && guard++ < 12) { e = e.to.out[e.to.state]; path.push(e); }
    const col = COLORS[e.to.color].c;
    ctx.save();
    ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.lineCap = 'round';
    ctx.globalAlpha = 0.32 + 0.12 * Math.sin(tick * 3);
    ctx.shadowColor = col; ctx.shadowBlur = 14;
    path.forEach(p => { tracePath(ctx, p, p.entry ? p.cover : 0); ctx.stroke(); });
    ctx.restore();
  });
}

function drawCrossings() {
  L.crossings.forEach(c => {
    ctx.save();
    ctx.translate(c.x, c.y); ctx.rotate(Math.PI / 4);
    ctx.globalAlpha = 0.55 + 0.25 * Math.sin(tick * 4);
    ctx.strokeStyle = '#facc15'; ctx.lineWidth = 2;
    ctx.strokeRect(-7, -7, 14, 14);
    ctx.restore();
  });
}

function drawTrain(tr) {
  const col = COLORS[tr.color];
  const head = trainPoint(tr, tr.d);
  if (!head.hidden) { // headlight
    ctx.save();
    ctx.translate(head.x, head.y); ctx.rotate(head.ang);
    const g = ctx.createRadialGradient(0, 0, 2, 0, 0, 70);
    g.addColorStop(0, 'rgba(254,249,195,0.35)'); g.addColorStop(1, 'rgba(254,249,195,0)');
    ctx.fillStyle = g;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, 70, -0.32, 0.32); ctx.closePath(); ctx.fill();
    ctx.restore();
  }
  for (let i = PIECES.length - 1; i >= 0; i--) {
    const pc = PIECES[i];
    const p = trainPoint(tr, tr.d - pc.off - pc.len / 2);
    if (p.hidden) continue;
    const hl = pc.len / 2;
    ctx.save();
    ctx.translate(p.x, p.y); ctx.rotate(p.ang);
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    roundRect(ctx, -hl + 2, -6, pc.len, 15, 4); ctx.fill();
    ctx.shadowColor = col.c; ctx.shadowBlur = 10;
    ctx.fillStyle = col.c;
    roundRect(ctx, -hl, -8, pc.len, 16, 5); ctx.fill();
    ctx.shadowBlur = 0;
    if (pc.engine) {
      ctx.fillStyle = col.d; roundRect(ctx, -hl, -8, 11, 16, 4); ctx.fill();                  // cab
      ctx.fillStyle = 'rgba(255,255,255,0.3)'; roundRect(ctx, -2, -5, 13, 3.5, 2); ctx.fill(); // boiler shine
      ctx.fillStyle = '#111827'; ctx.beginPath(); ctx.arc(7, 0, 3.2, 0, Math.PI * 2); ctx.fill(); // chimney
      ctx.fillStyle = '#fef9c3'; ctx.beginPath(); ctx.arc(hl - 1, 0, 2.6, 0, Math.PI * 2); ctx.fill(); // lamp
    } else {
      ctx.fillStyle = col.d; roundRect(ctx, -hl, -8, pc.len, 4.5, 3); ctx.fill();            // roof stripe
      ctx.fillStyle = 'rgba(15,23,42,0.45)';
      ctx.fillRect(-hl + 4, -1, 6, 5); ctx.fillRect(hl - 10, -1, 6, 5);                       // windows
    }
    ctx.restore();
  }
}

function drawTunnels() {
  L.edges.forEach(e => {
    if (!e.tunnel) return;
    const { d0, d1 } = e.tunnel;
    ctx.save();
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 12;
    tracePath(ctx, e, d0, d1); ctx.strokeStyle = '#1c1917'; ctx.lineWidth = 40; ctx.stroke();
    ctx.shadowBlur = 0;
    tracePath(ctx, e, d0, d1); ctx.strokeStyle = '#44403c'; ctx.lineWidth = 34; ctx.stroke();
    tracePath(ctx, e, d0, d1); ctx.setLineDash([2, 9]); ctx.strokeStyle = '#57534e'; ctx.lineWidth = 26; ctx.stroke(); ctx.setLineDash([]);
    [d0, d1].forEach(d => { // portals
      const p = pointAt(e, d);
      ctx.fillStyle = '#020617'; ctx.strokeStyle = '#78716c'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.ellipse(p.x, p.y, 6, 13, p.ang, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    });
    ctx.restore();
  });
}

function drawEntries() {
  L.entries.forEach((en, ei) => {
    const cover = en.edge.cover, y = en.y;
    ctx.save();
    const g = ctx.createLinearGradient(0, y - 34, 0, y + 34);
    g.addColorStop(0, '#57534e'); g.addColorStop(1, '#292524');
    ctx.fillStyle = g;
    ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = 14;
    roundRect(ctx, -20, y - 34, cover + 26, 68, 18); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.06)';
    for (let x = 8; x < cover; x += 22) { ctx.fillRect(x, y - 26, 10, 4); ctx.fillRect(x + 8, y + 18, 10, 4); }
    ctx.fillStyle = '#020617'; ctx.strokeStyle = '#a8a29e'; ctx.lineWidth = 2.5;
    ctx.beginPath(); ctx.ellipse(cover, y, 9, 18, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.restore();

    if (demo) return;
    // the next two trains due from this tunnel
    const upcoming = schedule.slice(nextSpawn).filter(s => s.entry === ei).slice(0, 2);
    if (!upcoming.length) return;
    const bx = 10, by = y - 58;
    ctx.save();
    ctx.fillStyle = 'rgba(2,6,23,0.8)'; ctx.strokeStyle = 'rgba(148,163,184,0.25)'; ctx.lineWidth = 1;
    roundRect(ctx, bx, by, 92, 20, 10); ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#94a3b8'; ctx.font = '700 9px system-ui, sans-serif'; ctx.textBaseline = 'middle';
    ctx.fillText('NEXT', bx + 9, by + 10.5);
    upcoming.forEach((s, i) => {
      const soon = i === 0 && s.t - time < 1200;
      const cx = bx + 50 + i * 20;
      const col = def.dark ? '#64748b' : COLORS[s.color].c;
      ctx.fillStyle = col;
      if (soon) { ctx.shadowColor = col; ctx.shadowBlur = 8 + 6 * Math.sin(tick * 12); }
      ctx.beginPath(); ctx.arc(cx, by + 10, i === 0 ? 6 : 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
      if (def.dark) { ctx.fillStyle = '#0f172a'; ctx.font = '800 8px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.fillText('?', cx, by + 10.5); ctx.textAlign = 'left'; }
    });
    ctx.restore();
  });
}

function drawStations() {
  L.stations.forEach(st => {
    const c = COLORS[st.color], x = STATION_X, y = st.y;
    ctx.save();
    ctx.shadowColor = st.bad > 0 ? '#ef4444' : c.c;
    ctx.shadowBlur = 8 + 34 * Math.max(st.flash, st.bad);
    ctx.fillStyle = '#0f172a';
    roundRect(ctx, x - 4, y - 28, W - x + 20, 56, 10); ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = st.bad > 0 ? '#ef4444' : c.c; ctx.lineWidth = 2.5;
    roundRect(ctx, x - 4, y - 28, W - x + 20, 56, 10); ctx.stroke();
    ctx.fillStyle = '#020617';
    roundRect(ctx, x - 4, y - 13, 15, 26, 4); ctx.fill();          // doorway
    ctx.fillStyle = c.c;
    roundRect(ctx, x + 18, y - 13, 54, 26, 6); ctx.fill();         // name plate
    ctx.fillStyle = '#0f172a'; ctx.font = '800 12px system-ui, sans-serif';
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillText(c.name, x + 45, y + 0.5);
    if (st.flash > 0) {
      ctx.globalAlpha = st.flash * 0.35; ctx.fillStyle = '#ffffff';
      roundRect(ctx, x - 4, y - 28, W - x + 20, 56, 10); ctx.fill();
    }
    ctx.restore();
  });
}

function drawJunctions() {
  L.junctions.forEach(j => {
    const e = j.out[j.state];
    const col = destColor(e);
    const p = pointAt(e, 28);
    const ang = Math.atan2(p.y - j.y, p.x - j.x);
    const hov = hover === j && state === 'play';
    ctx.save();
    ctx.translate(j.x, j.y);
    if (j.pulse > 0) {
      ctx.strokeStyle = 'rgba(255,255,255,' + (j.pulse * 0.7) + ')'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, 0, 16 + (1 - j.pulse) * 18, 0, Math.PI * 2); ctx.stroke();
    }
    ctx.shadowColor = col; ctx.shadowBlur = hov ? 26 : 14;
    ctx.fillStyle = '#0b1226';
    ctx.beginPath(); ctx.arc(0, 0, hov ? 17 : 15, 0, Math.PI * 2); ctx.fill();
    ctx.lineWidth = 2.5; ctx.strokeStyle = col; ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.rotate(ang);
    ctx.fillStyle = col;
    ctx.beginPath(); ctx.moveTo(9, 0); ctx.lineTo(-5, -6.5); ctx.lineTo(-2, 0); ctx.lineTo(-5, 6.5); ctx.closePath(); ctx.fill();
    ctx.restore();
    if (!demo) { // number key badge
      ctx.save();
      ctx.fillStyle = 'rgba(15,23,42,0.9)'; ctx.strokeStyle = 'rgba(148,163,184,0.45)'; ctx.lineWidth = 1;
      roundRect(ctx, j.x - 8, j.y + 20, 16, 15, 4); ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#e2e8f0'; ctx.font = '800 10px system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(String(j.key), j.x, j.y + 28);
      ctx.restore();
    }
  });
}

function drawParticles() {
  particles.forEach(p => {
    ctx.globalAlpha = Math.max(0, p.life) * (p.kind === 'smoke' ? 0.28 : 1);
    ctx.fillStyle = p.kind === 'smoke' ? (p.color || '#cbd5e1') : p.color;
    ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fill();
  });
  ctx.globalAlpha = 1;
}
function drawTexts() {
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  texts.forEach(t => {
    ctx.globalAlpha = Math.min(1, t.life * 1.6);
    ctx.font = '900 17px system-ui, sans-serif';
    ctx.lineWidth = 4; ctx.strokeStyle = 'rgba(2,6,23,0.85)'; ctx.strokeText(t.text, t.x, t.y);
    ctx.fillStyle = t.color; ctx.fillText(t.text, t.x, t.y);
  });
  ctx.globalAlpha = 1;
}
function drawBanner() {
  if (state !== 'play' || time > 1700) return;
  const a = time < 1300 ? 1 : 1 - (time - 1300) / 400;
  ctx.save();
  ctx.globalAlpha = Math.max(0, a);
  ctx.fillStyle = 'rgba(2,6,23,0.78)';
  roundRect(ctx, W / 2 - 190, H / 2 - 44, 380, 88, 16); ctx.fill();
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#fbbf24'; ctx.font = '800 12px system-ui, sans-serif';
  ctx.fillText(isDaily ? 'DAILY ROUTE' : 'LEVEL ' + (levelIndex + 1), W / 2, H / 2 - 20);
  ctx.fillStyle = '#f8fafc'; ctx.font = '900 26px system-ui, sans-serif';
  ctx.fillText(def.name, W / 2, H / 2 + 6);
  ctx.fillStyle = '#94a3b8'; ctx.font = '600 12px system-ui, sans-serif';
  ctx.fillText(def.trains + ' trains. Click the switches or press their numbers.', W / 2, H / 2 + 30);
  ctx.restore();
}

function draw() {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.setTransform(scale, 0, 0, scale, 0, 0);
  if (shake > 0.3) ctx.translate((Math.random() - 0.5) * shake, (Math.random() - 0.5) * shake);
  ctx.drawImage(staticCanvas, 0, 0, W, H);
  if (!L) return;
  drawRoutes();
  drawCrossings();
  trains.forEach(drawTrain);
  drawTunnels();
  drawEntries();
  drawStations();
  drawJunctions();
  drawParticles();
  drawTexts();
  drawBanner();
  if (state === 'paused') {
    ctx.fillStyle = 'rgba(2,6,23,0.6)'; ctx.fillRect(0, 0, W, H);
    ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    ctx.fillStyle = '#f8fafc'; ctx.font = '900 32px system-ui, sans-serif'; ctx.fillText('Paused', W / 2, H / 2 - 8);
    ctx.fillStyle = '#94a3b8'; ctx.font = '600 13px system-ui, sans-serif'; ctx.fillText('Press Space to resume', W / 2, H / 2 + 22);
  }
}

/* ---------- Input ---------- */
function toLogical(e) {
  const r = canvas.getBoundingClientRect();
  return { x: (e.clientX - r.left) * W / r.width, y: (e.clientY - r.top) * H / r.height };
}
function findJunction(p) {
  if (!L) return null;
  let best = null, bd = 30;
  L.junctions.forEach(j => { const d = Math.hypot(j.x - p.x, j.y - p.y); if (d < bd) { bd = d; best = j; } });
  return best;
}
function flip(j) {
  j.state = 1 - j.state;
  j.pulse = 1;
  sfx.flip();
}
canvas.addEventListener('pointermove', e => {
  hover = state === 'play' ? findJunction(toLogical(e)) : null;
  canvas.style.cursor = hover ? 'pointer' : 'default';
});
canvas.addEventListener('pointerleave', () => { hover = null; });
canvas.addEventListener('pointerdown', e => {
  if (state !== 'play') return;
  const j = findJunction(toLogical(e));
  if (j) flip(j);
});

function togglePause() {
  if (state === 'play') { state = 'paused'; pauseBtn.textContent = 'Resume'; }
  else if (state === 'paused') { state = 'play'; pauseBtn.textContent = 'Pause'; }
}
function toggleSpeed() {
  speedMul = speedMul === 1 ? 2 : 1;
  speedBtn.textContent = speedMul + 'x';
  speedBtn.classList.toggle('on', speedMul === 2);
}
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (/^[1-9]$/.test(k) && state === 'play' && L) {
    const j = L.junctions.find(x => x.key === Number(k));
    if (j) { flip(j); e.preventDefault(); }
  } else if (k === ' ' || k === 'p' || k === 'P') {
    if (state === 'play' || state === 'paused') { e.preventDefault(); togglePause(); }
  } else if ((k === 'f' || k === 'F') && !e.repeat) {
    toggleSpeed();
  } else if ((k === 'r' || k === 'R') && (state === 'play' || state === 'paused' || state === 'result')) {
    restart();
  } else if (k === 'Escape' && state !== 'menu') {
    showMenu();
  }
});
document.addEventListener('visibilitychange', () => { if (document.hidden && state === 'play') togglePause(); });

speedBtn.addEventListener('click', toggleSpeed);
pauseBtn.addEventListener('click', togglePause);
document.getElementById('sy-levels-btn').addEventListener('click', showMenu);
document.getElementById('sy-daily').addEventListener('click', startDaily);
document.getElementById('sy-retry').addEventListener('click', restart);
document.getElementById('sy-menu-back').addEventListener('click', showMenu);
nextBtn.addEventListener('click', () => startLevel(levelIndex + 1));
shareBtn.addEventListener('click', () => {
  const d = save.daily;
  const text = 'Switchyard Daily #' + dailyNum + ' ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) +
    ' ' + delivered + '/' + def.trains + ' trains, streak ' + d.streak;
  const done = () => { shareBtn.textContent = 'Copied!'; };
  try {
    navigator.clipboard.writeText(text).then(done, () => { shareBtn.textContent = text; });
  } catch (e) { shareBtn.textContent = text; }
});

if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(stageEl);
else window.addEventListener('resize', resize);
resize();
showMenu();
requestAnimationFrame(frame);`,

  seo: {
    title: 'Switchyard Train Switch Puzzle Game – HTML, CSS & JS',
    description: 'Wide canvas train puzzle: flip junctions to route coloured trains home. 20 levels, tunnels, crash crossings, a Daily Route and day streaks. No libraries.',
    about: {
      title: 'Switchyard — A Wide Canvas Train Routing Puzzle with 20 Levels, Daily Routes and Streaks',
      description: `Switchyard is a train routing puzzle built for a wide desktop screen. Coloured trains roll out of tunnels on the left of the yard and run to the right along branching tracks. Every station on the right edge has a colour, and your job is to flip the junctions so each train arrives at the station that matches it. Three misses end the run. It is plain HTML, CSS and JavaScript on one canvas, with no libraries, no images and no audio files.

**A yard generated from data**

Each of the 20 levels is a small object in the \`LEVELS\` array: how many stations, one or two entry tunnels, the train speed, how many trains, the average gap between them, how many track tunnels and whether the entry tunnel is long. \`tryLayout()\` turns that into a track network. It splits the stations into a random binary tree (each split is a junction), places junctions in columns across the width, and draws every track as a cubic Bezier curve with a lookup table for travelling along it. A seeded random generator (\`mulberry32\`) means a level always produces the same yard, and layouts that are cramped or confusing are rejected and rebuilt from the next seed.

**Trains that follow the switches**

A train keeps a short history of the track pieces it has travelled and its distance along the current one. When its head reaches a junction, it reads the switch at that moment and continues on the chosen branch, so flipping a switch after a train has passed has no effect on it. The engine and its two wagons are placed at fixed distances behind the head, which makes them bend naturally around curves. The engine throws a headlight cone ahead and puffs steam.

**Readability: the live route glows**

The route from each tunnel through the current switch positions glows in the colour of the station it ends at, and each junction's ring and arrow take the same colour. You can read at a glance where the next train will go. A "Next" chip at each tunnel shows the colours of the next two trains, and the first one pulses just before it appears.

**Five groups of mechanics**

Levels 1 to 8 add junctions, colours and speed. Levels 9 to 12 add tunnels that hide passing trains and a long entry tunnel, so you see each train's colour later and the "Next" chip shows a question mark. Levels 13 to 16 add a second entry tunnel whose tracks cross the first. Crossings are marked with yellow diamonds, and two trains that meet there crash. Levels 17 to 20 combine everything at higher speeds.

**Reasons to come back**

Every level awards one to three stars (three for no misses), the next level unlocks with one star, and the menu shows your total out of 60. The Daily Route builds a new yard from the date, so everyone gets the same puzzle that day. Clearing it keeps a day streak going, and a Copy result button gives a short line to share. Progress, best scores and the streak are saved in \`localStorage\` inside try/catch, so the game still runs in a sandboxed iframe.

**Feel**

Sound comes from a tiny Web Audio synth: a click when a switch flips, a whistle when a train leaves its tunnel, a chime whose pitch rises with your combo, a buzz on a wrong station and a crash. Deliveries in a row build a combo up to x5. Particles, a screen shake on crashes and an animated star reveal on the results screen finish it off. Behind the menu, a demo yard runs itself with an autopilot that sets each switch for the nearest train.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a level or the Daily Route', text: 'The menu shows 20 levels in five colour groups, your stars on each and your total out of 60. Level 1 is open at first, and each level unlocks when the one before it gets at least one star. The yellow Daily Route button starts the yard of the day.' },
        { title: 'Read the yard', text: 'Trains come out of the tunnels on the left. Stations on the right are labelled with their colour. The glowing line from each tunnel shows where a train would go right now, and the "Next" chip shows the colours of the next two trains.' },
        { title: 'Flip the switches', text: 'Click a junction, or press the number on its badge, to send trains up or down. A switch only matters when a train reaches it, so you can set it for the next train as soon as the previous one has passed.' },
        { title: 'Watch for tunnels and crossings', text: 'From level 9, tunnels hide passing trains and the entry tunnel gets longer. From level 13, a second tunnel feeds tracks that cross the first ones at the yellow diamonds. Two trains meeting there crash.' },
        { title: 'Score stars and combos', text: 'Each correct delivery scores 100 points times your combo (up to x5). A wrong station or a crash is a miss and resets the combo. Three misses end the run. Finish with no misses for three stars.' },
        { title: 'Use the controls', text: 'Space pauses, F switches between normal and double speed, R restarts, Esc opens the level menu, and the sound button mutes the synth. The game pauses itself when the tab is hidden.' },
      ],
    },
    features: [
      'Wide 1100x460 canvas that scales to the full width of its container, sharp on retina screens',
      'Track networks generated from level data with a seeded random generator, so each level always has the same yard',
      'Cubic Bezier tracks with arc-length lookup tables, so trains move at an even speed and bend around curves',
      'Switches decide at the moment a train reaches them, with click and number-key controls',
      'Live route highlighting in the destination colour, plus a "Next" chip showing the next two trains',
      '20 levels in five groups: junctions, speed, tunnels that hide trains, crossing tracks with crashes, then everything at once',
      'One to three stars per level, unlocks, best scores and a star total saved to localStorage inside try/catch',
      'Daily Route generated from the date, a day streak and a Copy result button',
      'Web Audio synth effects, combos up to x5, steam, headlights, particles, screen shake and an animated results screen',
      'Demo yard with an autopilot running behind the menu, plus pause, double speed and auto-pause on a hidden tab',
    ],
    useCases: [
      { icon: 'APP', title: 'A wide, replayable game for a site or portfolio', desc: 'Most snippet games sit in a small box. Switchyard fills the full width of the page, and the Daily Route and streak give visitors a reason to come back every day.' },
      { icon: 'LEARN', title: 'Teaching path following and procedural layouts', desc: 'The snippet shows how to move objects along Bezier curves at an even speed with a lookup table, and how to build a level from a few numbers with a seeded random generator. Both ideas carry over to tower defence, racing and puzzle games.' },
      { icon: 'CODE', title: 'Reference for a data-driven level system', desc: 'Levels are plain objects, layouts are generated and validated, and progress is saved per level. Adding a level means adding one line to the LEVELS array.' },
      { icon: 'DESIGN', title: 'Canvas game feel without assets', desc: 'Glowing routes, headlights, steam, particles and a synth soundtrack are all drawn or generated in code. It is a good reference for adding polish to a canvas game without images or audio files.' },
      { icon: 'FLOW', title: 'Daily challenge and streak pattern', desc: 'The date-seeded Daily Route and the streak logic (continue on consecutive days, reset after a missed day) are a reusable pattern for any daily puzzle or habit feature.' },
      { icon: 'CODE', title: 'Related: Snake Game with Levels', desc: 'See the [Snake Game](/ui-snippets/snake-game/) for another games snippet with unlockable levels, lives and combos.' },
    ],
    faqs: [
      { q: 'How are the track layouts made?', a: 'tryLayout() splits the level\'s stations into a random binary tree, where every split is a junction. Junctions are placed in columns across the width and lean from the tunnel towards the stations they serve, and each track is a cubic Bezier curve. The random generator is seeded with the level number, so a level always has the same yard. Layouts with junctions too close together, very steep tracks or tracks passing too near another tunnel\'s junctions are rejected and built again from the next seed.' },
      { q: 'How do trains decide which way to go?', a: 'Each train stores the track pieces it has travelled and its distance along the current one. When that distance passes the end of a piece that ends at a junction, the train reads the junction\'s state and continues onto the chosen branch. Because the decision happens on arrival, you can change a switch as soon as one train has passed it to prepare it for the next.' },
      { q: 'How does the Daily Route and the streak work?', a: 'todayNumber() counts days since a fixed start date, and dailyDef() turns that number into a level with a seeded random generator, so everyone gets the same yard on the same day. Clearing it with at least one star on the day after your last clear adds one to the streak, while a gap of more than a day resets it. The result line copied by the button includes the day number, the stars, the trains delivered and the streak.' },
      { q: 'How do I add a level or change the difficulty?', a: 'Add an object to the LEVELS array with a name, the number of stations (2 to 6), entries (1 or 2), speed in pixels per second, number of trains, average gap in milliseconds, number of tunnels and dark set to true or false. The level select uses ten columns, and the "60 stars" total in the HTML should be updated if you add levels. Slower speed and longer gaps make a level easier.' },
      { q: 'Does it work on phones and in a sandboxed iframe?', a: 'It is designed for a desktop screen, but junctions can also be tapped, and the canvas scales to any width. All localStorage access is wrapped in try/catch, so in a sandboxed iframe the game runs without saving progress. The AudioContext is created on the first level start, which browsers require, and every sound call is wrapped as well.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how tryLayout() turns a few numbers into a track network, how pointAt() uses the lookup table to move trains at an even speed along a curve, and how the autopilot behind the menu chooses each switch. It is also a good base to extend: ask for a level editor where you drag junctions and stations, a three-way junction, trains with different speeds, a "freight" train that must skip a station, or a weekly leaderboard for the Daily Route. You can also ask it to review the crash check and the layout validation for edge cases.`,
      prompt: `Build a train routing puzzle game called Switchyard in plain HTML, CSS and JavaScript on one canvas, with no libraries, images or audio files, designed for a wide desktop screen.

Requirements:
- A canvas with a logical size of 1100x460 that scales to the full width of its container (aspect-ratio 1100/460) and stays sharp on retina screens. Draw the background and the rails to an offscreen canvas once per level and copy it every frame.
- Coloured trains come out of tunnels on the left and travel right along branching tracks to coloured stations on the right. Each track piece is a cubic Bezier curve with an arc-length lookup table so trains move at an even speed. A train is an engine plus two wagons placed at fixed distances behind its head.
- Junctions have two branches. Clicking a junction or pressing its number key flips it. A train reads the switch when its head reaches the junction. Highlight the current route from each tunnel in the colour of the station it ends at, and show the next two trains for each tunnel.
- A correct delivery scores 100 points times a combo up to x5. A wrong station or a crash is a miss, and three misses end the run. Stars: 3 for no misses, 2 for one, 1 for two.
- 20 levels defined as data (stations, entries, speed, trains, gap, tunnels, dark). Generate each layout from a seeded random binary tree of junctions and reject cramped layouts. Later levels add tunnels that hide trains, a long entry tunnel that hides colours, and a second entry tunnel whose tracks cross the first (trains from different tunnels that touch crash).
- A menu with a level grid showing stars, unlocks after one star, a star total, and a Daily Route generated from the date with a day streak and a copy result button. Save progress to localStorage inside try/catch.
- Web Audio synth sounds for switches, whistles, deliveries, wrong stations, crashes and results, with a mute button. Steam, headlights, particles, screen shake and an animated star reveal.
- Pause (Space), double speed (F), restart (R), menu (Esc), auto-pause on a hidden tab, and a demo yard with an autopilot running behind the menu.`,
    },
  },
};

export default switchyardTrainPuzzleGame;
