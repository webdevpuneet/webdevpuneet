const colorSortPuzzle = {
  id: 'color-sort-puzzle',
  title: 'Color Sort Water Puzzle',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="cs-fit" id="cs-fit"><div class="cs-wrap" id="cs-wrap">
  <div class="cs-panel" id="cs-panel">
    <div class="cs-hud">
      <div class="cs-hud-left">
        <span class="cs-kicker" id="cs-kicker">Color Sort</span>
        <span class="cs-name" id="cs-name">Pick a level</span>
      </div>
      <div class="cs-stat"><span class="cs-label">Moves</span><b id="cs-moves">0</b></div>
      <div class="cs-stat"><span class="cs-label">Par</span><b id="cs-par">-</b></div>
      <div class="cs-hud-btns">
        <button class="cs-btn-sm" id="cs-symbols" type="button" aria-pressed="false" title="Show a symbol on every colour">Symbols off</button>
        <button class="cs-btn-sm" id="cs-levels-btn" type="button" title="Levels (Esc)">Levels</button>
        <button class="cs-btn-sm" id="cs-mute" type="button" aria-pressed="false">Sound on</button>
      </div>
    </div>
    <div class="cs-progress"><div class="cs-progress-bar" id="cs-progress"></div></div>

    <div class="cs-board"><div class="cs-tubes" id="cs-tubes"></div></div>
    <p class="cs-msg" id="cs-msg">Tap a tube, then tap where to pour.</p>

    <div class="cs-tools">
      <button class="cs-tool" id="cs-undo" type="button"><span class="cs-tool-ico">&#8630;</span>Undo <em>Z</em></button>
      <button class="cs-tool" id="cs-hint" type="button"><span class="cs-tool-ico">&#128161;</span>Hint <i id="cs-hint-count">3</i><em>H</em></button>
      <button class="cs-tool" id="cs-restart" type="button"><span class="cs-tool-ico">&#8635;</span>Restart <em>R</em></button>
    </div>

    <div class="cs-overlay show" id="cs-menu">
      <p class="cs-logo">Color Sort</p>
      <p class="cs-tagline">Pour the colours until every tube holds a single colour. Only matching colours can stack, and a tube holds four.</p>
      <div class="cs-menu-row">
        <button class="cs-daily" id="cs-daily" type="button">
          <span class="cs-daily-title" id="cs-daily-title">Daily Puzzle</span>
          <span class="cs-daily-sub" id="cs-daily-sub">The same puzzle for everyone</span>
        </button>
        <div class="cs-totals"><span><b id="cs-star-total">0</b> / 60 stars</span><span>Daily streak <b id="cs-streak">0</b></span></div>
      </div>
      <div class="cs-tiers" id="cs-tiers"></div>
    </div>

    <div class="cs-overlay" id="cs-result">
      <p class="cs-result-title" id="cs-result-title">Sorted!</p>
      <div class="cs-result-stars" id="cs-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="cs-result-sub" id="cs-result-sub"></p>
      <div class="cs-result-btns">
        <button class="cs-btn" id="cs-next" type="button">Next level</button>
        <button class="cs-btn cs-btn-ghost" id="cs-retry" type="button">Replay</button>
        <button class="cs-btn cs-btn-ghost" id="cs-share" type="button">Copy result</button>
        <button class="cs-btn cs-btn-ghost" id="cs-menu-back" type="button">Levels</button>
      </div>
    </div>
  </div>
</div></div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #e2e8f0;
  background: radial-gradient(ellipse at top, #1d2457 0%, #0a0e24 60%, #060818 100%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 12px 14px; overflow: hidden;
}
/* The game scales itself to the space it is given (fitToView): .cs-fit takes the scaled size, .cs-wrap is laid out at
   its natural size and then shrunk with transform. */
.cs-fit { flex: none; }
.cs-wrap { width: 720px; transform-origin: top left; }
.cs-panel {
  position: relative; display: flex; flex-direction: column; gap: 10px; padding: 16px; border-radius: 20px; overflow: hidden;
  background: linear-gradient(180deg, rgba(28,34,86,0.72), rgba(10,14,36,0.94));
  border: 1px solid rgba(148,163,184,0.16); box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(99,102,241,0.14);
}

.cs-hud { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.cs-hud-left { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; min-width: 0; }
.cs-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #fbbf24; }
.cs-name { font-size: 17px; font-weight: 800; color: #f8fafc; white-space: nowrap; }
.cs-stat { display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.cs-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.cs-stat b { font-size: 17px; font-weight: 800; color: #f1f5f9; font-variant-numeric: tabular-nums; }
.cs-stat b.over { color: #fb923c; }
.cs-hud-btns { display: flex; gap: 5px; }
.cs-btn-sm { background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
.cs-btn-sm:hover { background: rgba(255,255,255,0.14); }
.cs-btn-sm[aria-pressed="true"] { background: #4f46e5; border-color: #818cf8; color: #fff; }
.cs-progress { height: 4px; background: rgba(255,255,255,0.07); border-radius: 4px; overflow: hidden; }
.cs-progress-bar { height: 100%; width: 0; background: linear-gradient(90deg, #6366f1, #a78bfa, #f472b6, #fbbf24); transition: width 0.3s; }

.cs-board { padding: 26px 8px 8px; min-height: 250px; display: flex; align-items: center; justify-content: center; }
.cs-tubes { position: relative; display: flex; flex-wrap: wrap; gap: 26px 16px; justify-content: center; max-width: 660px; }

.cs-tube {
  position: relative; width: 54px; height: 184px; padding: 5px 5px 7px; cursor: pointer; flex: none;
  display: flex; flex-direction: column-reverse; gap: 3px; outline: none;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08));
  border: 2px solid rgba(226,232,240,0.4); border-top: none; border-radius: 0 0 28px 28px;
  transition: transform 0.28s cubic-bezier(0.3, 0.7, 0.4, 1), box-shadow 0.2s, border-color 0.2s; z-index: 1;
}
.cs-tube::before { content: ''; position: absolute; left: -5px; right: -5px; top: -3px; height: 8px; border-radius: 8px; background: rgba(226,232,240,0.45); }
.cs-tube::after { content: ''; position: absolute; left: 7px; top: 12px; bottom: 26px; width: 4px; border-radius: 4px; background: linear-gradient(180deg, rgba(255,255,255,0.45), rgba(255,255,255,0)); pointer-events: none; z-index: 3; }
.cs-tube:hover { border-color: rgba(226,232,240,0.7); }
.cs-tube:focus-visible { box-shadow: 0 0 0 3px #fde68a; }
.cs-tube.sel { transform: translateY(-16px); border-color: #a5b4fc; box-shadow: 0 10px 22px rgba(129,140,248,0.4); }
.cs-tube.pouring { z-index: 20; transition: transform 0.32s ease-in-out; }
.cs-tube.done { border-color: #4ade80; box-shadow: 0 0 16px rgba(74,222,128,0.4); cursor: default; }
.cs-tube.done::before { background: #4ade80; }
.cs-tube.hintFrom { box-shadow: 0 0 0 3px #fbbf24, 0 0 18px rgba(251,191,36,0.6); }
.cs-tube.hintTo { box-shadow: 0 0 0 3px #4ade80, 0 0 18px rgba(74,222,128,0.6); }
.cs-tube.bad { animation: cs-shake 0.3s ease; }
@keyframes cs-shake { 25% { margin-left: -4px; } 75% { margin-left: 4px; } }
.cs-num { position: absolute; left: 0; right: 0; bottom: -20px; text-align: center; font-size: 10px; font-weight: 800; color: #64748b; pointer-events: none; }

.cs-slot {
  flex: 0 0 39px; display: none; align-items: center; justify-content: center; border-radius: 6px; position: relative;
  background: #475569; box-shadow: inset 0 3px 5px rgba(255,255,255,0.28), inset 0 -3px 5px rgba(0,0,0,0.25);
}
.cs-slot.on { display: flex; }
.cs-slot b { font-size: 17px; font-weight: 900; color: rgba(0,0,0,0.5); line-height: 1; pointer-events: none; text-shadow: 0 1px 0 rgba(255,255,255,0.2); }
.cs-slot.fresh { animation: cs-fill 0.3s ease-out; transform-origin: top; }
@keyframes cs-fill { from { transform: scaleY(0); opacity: 0.4; } to { transform: scaleY(1); opacity: 1; } }
.cs-stream { position: absolute; width: 7px; border-radius: 4px; z-index: 19; pointer-events: none; transform-origin: top; animation: cs-stream 0.22s ease-out; box-shadow: 0 0 8px rgba(255,255,255,0.3); }
@keyframes cs-stream { from { transform: scaleY(0); } to { transform: scaleY(1); } }

.cs-msg { min-height: 36px; font-size: 13px; line-height: 1.45; color: #94a3b8; text-align: center; padding: 0 4px; }
.cs-msg b { color: #5eead4; }
.cs-msg.warn { color: #fca5a5; }
.cs-tools { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.cs-tool { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 0; border-radius: 12px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; color: #cbd5e1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); transition: background 0.12s, border-color 0.12s; }
.cs-tool:hover:not(:disabled) { background: rgba(255,255,255,0.1); border-color: rgba(165,180,252,0.5); }
.cs-tool:disabled { opacity: 0.35; cursor: not-allowed; }
.cs-tool-ico { font-size: 15px; line-height: 1; }
.cs-tool em { font-style: normal; font-size: 9px; color: #64748b; }
.cs-tool i { font-style: normal; font-size: 10px; background: #6366f1; color: #fff; border-radius: 8px; padding: 0 6px; }

.cs-overlay { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 18px; text-align: center; overflow-y: auto; background: radial-gradient(ellipse at center, rgba(10,14,36,0.965), rgba(5,7,20,0.985)); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.cs-overlay.show { opacity: 1; pointer-events: auto; }
.cs-logo { font-size: 44px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; background: linear-gradient(90deg, #f87171, #fbbf24, #4ade80, #60a5fa, #c084fc); -webkit-background-clip: text; background-clip: text; color: transparent; }
.cs-tagline { font-size: 13px; color: #94a3b8; max-width: 440px; line-height: 1.5; }
.cs-menu-row { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.cs-daily { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 18px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left; color: #fef3c7; border: 1px solid rgba(250,204,21,0.45); background: linear-gradient(135deg, rgba(250,204,21,0.18), rgba(251,146,60,0.1)); transition: transform 0.15s, box-shadow 0.15s; }
.cs-daily:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,204,21,0.2); }
.cs-daily-title { font-size: 14px; font-weight: 800; }
.cs-daily-sub { font-size: 11px; color: #fcd34d; }
.cs-totals { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: #94a3b8; text-align: left; }
.cs-totals b { color: #f8fafc; }
.cs-tiers { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 640px; }
.cs-tier { display: grid; grid-template-columns: 110px 1fr; align-items: center; gap: 10px; }
.cs-tier-name { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--g); text-align: left; line-height: 1.2; }
.cs-tier-name small { display: block; font-size: 9px; font-weight: 600; color: #64748b; text-transform: none; letter-spacing: 0; }
.cs-tier-tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.cs-tile { position: relative; height: 46px; border-radius: 10px; cursor: pointer; font: inherit; color: #e2e8f0; border: 1px solid rgba(148,163,184,0.22); background: rgba(255,255,255,0.04); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; transition: transform 0.12s, border-color 0.12s; }
.cs-tile:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); }
.cs-tile::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.cs-tile-num { font-size: 15px; font-weight: 800; }
.cs-tile-stars { font-size: 9px; letter-spacing: 1px; color: #334155; }
.cs-tile-stars .on { color: #facc15; }
.cs-tile:disabled { opacity: 0.32; cursor: not-allowed; }
.cs-tile.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 12px rgba(250,204,21,0.15); }

.cs-result-title { font-size: 36px; font-weight: 900; color: #f8fafc; }
.cs-result-stars { display: flex; gap: 10px; font-size: 52px; line-height: 1; }
.cs-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.cs-result-stars span.on { color: #facc15; text-shadow: 0 0 22px rgba(250,204,21,0.75); }
.cs-overlay.show .cs-result-stars span { animation: cs-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.cs-overlay.show .cs-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.cs-overlay.show .cs-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes cs-star { to { transform: scale(1); opacity: 1; } }
.cs-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.7; }
.cs-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.cs-btn { padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6366f1, #8b5cf6); box-shadow: 0 6px 18px rgba(99,102,241,0.35); transition: transform 0.12s; }
.cs-btn:hover { transform: translateY(-1px); }
.cs-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.cs-btn[hidden] { display: none; }
.cs-confetti { position: absolute; top: -12px; width: 8px; height: 14px; border-radius: 2px; z-index: 40; pointer-events: none; animation: cs-fall linear forwards; }
@keyframes cs-fall { to { transform: translate(var(--dx), 700px) rotate(var(--rot)); opacity: 0.9; } }

.cs-narrow .cs-tier { grid-template-columns: 1fr; gap: 4px; }
.cs-narrow .cs-logo { font-size: 34px; }`,

  js: `const CAP = 4; // units per tube
const COLORS = [
  { c: '#ef4444', g: '\\u25CF' }, { c: '#3b82f6', g: '\\u25B2' }, { c: '#f59e0b', g: '\\u25A0' }, { c: '#22c55e', g: '\\u25C6' },
  { c: '#a855f7', g: '\\u2605' }, { c: '#ec4899', g: '\\u2665' }, { c: '#14b8a6', g: '\\u271A' }, { c: '#f97316', g: '\\u2716' },
  { c: '#06b6d4', g: '\\u263E' }, { c: '#a3e635', g: '\\u2B22' }, { c: '#6366f1', g: '\\u2600' }, { c: '#a16207', g: '\\u266A' },
];
const TIERS = [
  { name: 'Splash',  note: '3-5 colours',                  color: '#4ade80' },
  { name: 'Stream',  note: '6-8 colours',                  color: '#60a5fa' },
  { name: 'Torrent', note: '8-10 colours, hidden layers',  color: '#c084fc' },
  { name: 'Flood',   note: '10-12 colours, hidden layers', color: '#fb923c' },
];
// colours, empty tubes, scramble depth (how far the board is mixed up), hidden (layers under the top are "?" until exposed)
const LEVELS = [
  [3, 2, 10, false], [4, 2, 14, false], [4, 2, 18, false], [5, 2, 22, false], [5, 2, 26, false],
  [6, 2, 30, false], [6, 2, 34, false], [7, 2, 38, false], [7, 2, 42, false], [8, 2, 46, false],
  [8, 2, 50, true],  [9, 2, 54, true],  [9, 2, 58, true],  [10, 2, 62, true], [10, 2, 66, true],
  [10, 2, 70, true], [11, 2, 74, true], [11, 2, 78, true], [12, 2, 82, true], [12, 2, 90, true],
];
const LEVEL_COUNT = LEVELS.length;
const SAVE_KEY = 'color-sort-save-v1';
const DAY0 = Date.UTC(2026, 10, 11); // Daily Puzzle #1
const MAX_HINTS = 3;

const $ = id => document.getElementById(id);
const tubesEl = $('cs-tubes'), msgEl = $('cs-msg'), panelEl = $('cs-panel'), menuEl = $('cs-menu'), resultEl = $('cs-result');
const undoBtn = $('cs-undo'), hintBtn = $('cs-hint'), nextBtn = $('cs-next'), shareBtn = $('cs-share'), muteBtn = $('cs-mute'), symBtn = $('cs-symbols');

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() {
  return { stars: Array(LEVEL_COUNT).fill(0), best: Array(LEVEL_COUNT).fill(0), symbols: false, daily: { day: 0, stars: 0, moves: 0, streak: 0, lastDay: 0 } };
}
function loadSave() {
  const f = freshSave();
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      f.stars = f.stars.map((_, i) => s.stars[i] || 0);
      f.best = f.best.map((_, i) => (s.best && s.best[i]) || 0);
      f.symbols = !!s.symbols;
      Object.assign(f.daily, s.daily || {});
    }
  } catch (e) { /* storage blocked */ }
  return f;
}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* storage blocked */ } }
let save = loadSave();

/* ---------- Seeded random: the same seed always gives the same board ---------- */
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function todayNumber() {
  const d = new Date();
  return Math.max(1, Math.floor((Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()) - DAY0) / 86400000) + 1);
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
  pick() { tone(520, 0.06, 'sine', 0.05); },
  bad() { tone(160, 0.18, 'sawtooth', 0.04, 100); },
  pour(n) { for (let i = 0; i < n * 2; i++) tone(260 + i * 55 + Math.random() * 40, 0.09, 'sine', 0.05, 380 + i * 60, i * 0.075); },
  done() { tone(659, 0.12, 'triangle', 0.06); tone(988, 0.2, 'triangle', 0.06, null, 0.1); },
  win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, i * 0.12)); },
};
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
  muteBtn.setAttribute('aria-pressed', String(muted));
});

/* ---------- Rules ---------- */
const topOf = t => t[t.length - 1];
function topRun(t) { let n = 0; for (let i = t.length - 1; i >= 0 && t[i] === topOf(t); i--) n++; return n; }
const isMono = t => t.length > 0 && t.every(c => c === t[0]);
const isDone = t => t.length === CAP && isMono(t);
// a pour must be legal and useful: onto an empty tube or a matching top, never out of a finished tube,
// and never a single-colour tube into an empty one (that only wastes a move)
function legal(ts, a, b) {
  if (a === b) return false;
  const s = ts[a], d = ts[b];
  if (!s.length || isDone(s) || d.length >= CAP) return false;
  if (d.length === 0) return !isMono(s);
  return topOf(d) === topOf(s);
}
function hasMoves(ts) { for (let a = 0; a < ts.length; a++) for (let b = 0; b < ts.length; b++) if (legal(ts, a, b)) return true; return false; }
function applyPour(ts, a, b) { // moves the whole top run that fits, returns how many units moved
  const n = Math.min(topRun(ts[a]), CAP - ts[b].length), c = topOf(ts[a]);
  for (let i = 0; i < n; i++) { ts[a].pop(); ts[b].push(c); }
  return n;
}
const allSorted = (ts, colors) => ts.filter(isDone).length === colors && ts.every(t => t.length === 0 || isDone(t));

/* ---------- Level generator: scramble BACKWARDS from the solved board, so a solution always exists ---------- */
// Every step is the exact inverse of a legal pour: take k units from the top of one tube and put them on a tube whose top is a
// different colour (or empty). Played forwards the steps, in reverse order, solve the board, and their number is the par.
function scramble(colors, empties, steps, R) {
  const n = colors + empties;
  const ts = Array.from({ length: n }, (_, i) => (i < colors ? Array(CAP).fill(i) : []));
  let done = 0, guard = 0;
  while (done < steps && guard++ < steps * 40) {
    const rooms = []; // tubes that can receive units
    ts.forEach((t, i) => { if (t.length < CAP) rooms.push(i); });
    const s = rooms[Math.floor(R() * rooms.length)], S = ts[s];
    const donors = []; // tubes whose top colour differs from the receiver's top
    ts.forEach((t, i) => { if (i !== s && t.length && (!S.length || topOf(t) !== topOf(S))) donors.push(i); });
    if (!donors.length) continue;
    const d = donors[Math.floor(R() * donors.length)], D = ts[d];
    const run = topRun(D);
    const ks = [];
    for (let k = 1; k <= Math.min(run, CAP - S.length); k++) if (k < run || k === D.length) ks.push(k);
    if (!ks.length) continue;
    const k = ks[Math.floor(R() * ks.length)];
    for (let i = 0; i < k; i++) S.push(D.pop());
    done++;
  }
  const mixed = ts.filter(t => t.length && !isMono(t)).length;
  return { tubes: ts, par: done, ok: done === steps && !allSorted(ts, colors) && mixed >= Math.ceil(colors * 0.75) };
  // (par here is the length of the backwards scramble: an upper bound, loadPuzzle() tightens it with the solver)
}
function generate(colors, empties, steps, seed) {
  let last = null;
  for (let attempt = 0; attempt < 40; attempt++) {
    last = scramble(colors, empties, steps, mulberry32(seed + attempt * 7919));
    if (last.ok) return last;
  }
  return last;
}
function levelSpec(i) { const [colors, empties, steps, hidden] = LEVELS[i]; return { name: 'Level ' + (i + 1), colors, empties, steps, hidden, seed: 500 + i * 7919 }; }
function dailySpec(n) { return { name: 'Daily Puzzle #' + n, colors: 8 + (n % 3), empties: 2, steps: 56 + (n % 4) * 6, hidden: n % 2 === 0, seed: n * 104729 + 31 }; }

/* ---------- Hint solver: greedy best-first search over tube states ---------- */
function heuristic(ts) {
  let h = 0; const bottoms = {};
  ts.forEach(t => { if (t.length) { bottoms[t[0]] = (bottoms[t[0]] || 0) + 1; h += t.filter(c => c !== t[0]).length; } });
  Object.keys(bottoms).forEach(k => { h += bottoms[k] - 1; });
  return h;
}
function stateKey(ts) { return ts.map(t => t.map(c => String.fromCharCode(97 + c)).join('')).sort().join('|'); }
function solve(start, colors, capNodes, capMs) { // returns a list of {from, to} or null
  const t0 = Date.now(), heap = [], seen = new Set([stateKey(start)]);
  const push = n => { heap.push(n); let i = heap.length - 1; while (i > 0) { const p = (i - 1) >> 1; if (heap[p].f <= heap[i].f) break; [heap[p], heap[i]] = [heap[i], heap[p]]; i = p; } };
  const pop = () => { const top = heap[0], last = heap.pop(); if (heap.length) { heap[0] = last; let i = 0; for (;;) { let m = i; const l = 2 * i + 1, r = l + 1; if (l < heap.length && heap[l].f < heap[m].f) m = l; if (r < heap.length && heap[r].f < heap[m].f) m = r; if (m === i) break; [heap[m], heap[i]] = [heap[i], heap[m]]; i = m; } } return top; };
  push({ ts: start, g: 0, f: heuristic(start) * 3, parent: null, move: null });
  let nodes = 0;
  while (heap.length && nodes < capNodes && Date.now() - t0 < capMs) {
    const cur = pop(); nodes++;
    if (allSorted(cur.ts, colors)) { const path = []; for (let n = cur; n.parent; n = n.parent) path.push(n.move); return path.reverse(); }
    for (let a = 0; a < cur.ts.length; a++) for (let b = 0; b < cur.ts.length; b++) {
      if (!legal(cur.ts, a, b)) continue;
      const nx = cur.ts.map(t => t.slice());
      applyPour(nx, a, b);
      const k = stateKey(nx);
      if (seen.has(k)) continue;
      seen.add(k);
      push({ ts: nx, g: cur.g + 1, f: heuristic(nx) * 3 + cur.g + 1, parent: cur, move: { from: a, to: b } });
    }
  }
  return null;
}

/* ---------- Game state ---------- */
let spec = null, isDaily = false, dailyNum = 0, levelIndex = 0;
let tubes = [], revealed = [], par = 0, moves = 0, hintsLeft = MAX_HINTS, hintsUsed = 0;
let history = [], sel = -1, busy = false, state = 'menu', runId = 0;
const tubeEls = [], slotEls = [], numEls = [];

function buildBoard() {
  tubesEl.innerHTML = '';
  tubeEls.length = 0; slotEls.length = 0;
  tubes.forEach((_, i) => {
    const el = document.createElement('div');
    el.className = 'cs-tube'; el.tabIndex = 0; el.setAttribute('role', 'button');
    const slots = [];
    for (let k = 0; k < CAP; k++) { const s = document.createElement('i'); s.className = 'cs-slot'; s.innerHTML = '<b></b>'; el.appendChild(s); slots.push(s); }
    const num = document.createElement('span'); num.className = 'cs-num'; num.textContent = String(i + 1); el.appendChild(num);
    el.addEventListener('pointerdown', e => { if (e.button === 0) { onTube(i); } });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onTube(i); }
      else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); const j = (i + (e.key === 'ArrowRight' ? 1 : -1) + tubes.length) % tubes.length; tubeEls[j].focus(); }
    });
    tubesEl.appendChild(el); tubeEls.push(el); slotEls.push(slots);
  });
}
function snapshot() { history.push({ tubes: tubes.map(t => t.slice()), revealed: revealed.map(t => t.slice()), moves }); }
function exposeTops() { tubes.forEach((t, i) => { if (t.length) revealed[i][t.length - 1] = true; if (isDone(t)) revealed[i] = revealed[i].map(() => true); }); }

function loadPuzzle(s) {
  spec = s;
  const g = generate(s.colors, s.empties, s.steps, s.seed);
  tubes = g.tubes; par = g.par;
  const found = solve(tubes.map(t => t.slice()), s.colors, 12000, 600); // a real solution is usually much shorter than the scramble
  if (found && found.length) par = Math.min(par, found.length);
  revealed = tubes.map(t => t.map(() => !s.hidden));
  exposeTops();
  moves = 0; hintsLeft = MAX_HINTS; hintsUsed = 0; history = []; sel = -1; busy = false; runId++;
  buildBoard();
  setMsg(s.hidden ? 'Hidden layers: a "?" is revealed when it reaches the top of its tube.' : 'Tap a tube, then tap where to pour.');
  render(true);
}
function startLevel(i) { getAudio(); isDaily = false; levelIndex = i; loadPuzzle(levelSpec(i)); beginPlay(); $('cs-kicker').textContent = 'Level ' + (i + 1) + ' - ' + TIERS[Math.floor(i / 5)].name; $('cs-name').textContent = spec.colors + ' colours' + (spec.hidden ? ', hidden layers' : ''); }
function startDaily() { getAudio(); isDaily = true; dailyNum = todayNumber(); loadPuzzle(dailySpec(dailyNum)); beginPlay(); $('cs-kicker').textContent = 'Daily'; $('cs-name').textContent = spec.name; }
function beginPlay() {
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  state = 'play';
  menuEl.classList.remove('show'); resultEl.classList.remove('show');
  render(false);
}
function restart() { if (isDaily) startDaily(); else startLevel(levelIndex); }
function showMenu() {
  runId++; busy = false; state = 'menu';
  resultEl.classList.remove('show'); menuEl.classList.add('show');
  renderMenu();
  $('cs-kicker').textContent = 'Color Sort'; $('cs-name').textContent = 'Pick a level';
}

/* ---------- Rendering ---------- */
function setMsg(html, warn) { msgEl.innerHTML = html; msgEl.classList.toggle('warn', !!warn); }
function render(fresh) {
  tubes.forEach((t, i) => {
    const el = tubeEls[i];
    el.classList.toggle('sel', i === sel);
    el.classList.toggle('done', isDone(t));
    const names = t.map((c, k) => (revealed[i][k] ? 'colour ' + (c + 1) : 'hidden')).join(', ');
    el.setAttribute('aria-label', 'Tube ' + (i + 1) + ': ' + (names || 'empty'));
    for (let k = 0; k < CAP; k++) {
      const s = slotEls[i][k];
      if (k < t.length) {
        const vis = revealed[i][k];
        s.classList.add('on');
        s.style.background = vis ? COLORS[t[k]].c : '#475569';
        s.firstChild.textContent = vis ? (save.symbols ? COLORS[t[k]].g : '') : '?';
      } else s.classList.remove('on');
    }
  });
  $('cs-moves').textContent = moves;
  $('cs-par').textContent = par || '-';
  $('cs-moves').classList.toggle('over', par > 0 && moves > Math.ceil(par * 1.25) + 1);
  $('cs-progress').style.width = (spec ? tubes.filter(isDone).length / spec.colors * 100 : 0) + '%';
  $('cs-hint-count').textContent = hintsLeft;
  undoBtn.disabled = state !== 'play' || busy || history.length === 0;
  hintBtn.disabled = state !== 'play' || busy || hintsLeft <= 0;
  $('cs-restart').disabled = state !== 'play' || busy;
  symBtn.textContent = save.symbols ? 'Symbols on' : 'Symbols off';
  symBtn.setAttribute('aria-pressed', String(save.symbols));
}
function renderMenu() {
  const today = todayNumber(), d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0; // a missed day resets the streak
  const wrap = $('cs-tiers');
  wrap.innerHTML = '';
  TIERS.forEach((t, ti) => {
    const row = document.createElement('div');
    row.className = 'cs-tier'; row.style.setProperty('--g', t.color);
    row.innerHTML = '<div class="cs-tier-name">' + t.name + '<small>' + t.note + '</small></div>';
    const tiles = document.createElement('div');
    tiles.className = 'cs-tier-tiles';
    for (let k = 0; k < 5; k++) {
      const i = ti * 5 + k, unlocked = i === 0 || save.stars[i - 1] > 0; // solving a level unlocks the next one
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'cs-tile' + (save.stars[i] === 3 ? ' perfect' : '');
      b.disabled = !unlocked; b.title = unlocked ? 'Level ' + (i + 1) : 'Solve level ' + i + ' to unlock';
      b.innerHTML = '<span class="cs-tile-num">' + (i + 1) + '</span><span class="cs-tile-stars">' + [0, 1, 2].map(n => '<span class="' + (n < save.stars[i] ? 'on' : '') + '">\\u2605</span>').join('') + '</span>';
      b.addEventListener('click', () => startLevel(i));
      tiles.appendChild(b);
    }
    row.appendChild(tiles); wrap.appendChild(row);
  });
  $('cs-star-total').textContent = save.stars.reduce((s, v) => s + v, 0);
  $('cs-streak').textContent = d.streak;
  $('cs-daily-title').textContent = 'Daily Puzzle #' + today;
  $('cs-daily-sub').textContent = d.day === today && d.stars > 0 ? 'Done today: ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' in ' + d.moves + ' moves' : 'The same puzzle for everyone. Keep your streak!';
}

/* ---------- Playing ---------- */
function onTube(i) {
  if (state !== 'play' || busy) return;
  const t = tubes[i];
  if (sel === -1) {
    if (!t.length) return;
    if (isDone(t)) { setMsg('That tube is already complete.'); return; }
    sel = i; sfx.pick(); render(); return;
  }
  if (sel === i) { sel = -1; render(); return; }
  if (legal(tubes, sel, i)) { pourAnimated(sel, i); return; }
  const wasSel = sel;
  sel = -1;
  tubeEls[i].classList.remove('bad'); void tubeEls[i].offsetWidth; tubeEls[i].classList.add('bad');
  sfx.bad();
  setMsg(!tubes[wasSel].length ? '' : tubes[i].length >= CAP ? 'That tube is full.' : tubes[i].length && topOf(tubes[i]) !== topOf(tubes[wasSel]) ? 'Only the same colour can go on top.' : 'No need to move a sorted tube into an empty one.', true);
  if (t.length && !isDone(t)) { sel = i; sfx.pick(); }
  render();
}
function pourAnimated(a, b) {
  busy = true;
  const id = runId, A = tubeEls[a], B = tubeEls[b];
  const n = Math.min(topRun(tubes[a]), CAP - tubes[b].length), color = COLORS[topOf(tubes[a])].c, destLen = tubes[b].length;
  sel = -1; A.classList.remove('sel'); render();
  const side = B.offsetLeft >= A.offsetLeft ? 1 : -1;
  const dx = (B.offsetLeft + B.offsetWidth / 2 - side * 12) - (A.offsetLeft + A.offsetWidth / 2);
  const dy = (B.offsetTop - 30) - A.offsetTop;
  A.classList.add('pouring');
  A.style.transformOrigin = '50% 0';
  A.style.transform = 'translate(' + dx + 'px,' + dy + 'px) rotate(' + (side * 72) + 'deg)';
  sfx.pour(n);
  setTimeout(() => { // the stream flows, then the units change tubes
    if (id !== runId) return;
    const sY = B.offsetTop - 26, bottom = B.offsetTop + B.offsetHeight - 8, surface = bottom - destLen * 42;
    const st = document.createElement('div');
    st.className = 'cs-stream'; st.style.background = color;
    st.style.left = (B.offsetLeft + B.offsetWidth / 2 - side * 12 - 3) + 'px'; st.style.top = sY + 'px'; st.style.height = Math.max(24, surface - sY) + 'px';
    tubesEl.appendChild(st);
    snapshot();
    applyPour(tubes, a, b);
    for (let i = 0; i < n; i++) revealed[b][destLen + i] = true;
    revealed[a].length = tubes[a].length;
    moves++;
    exposeTops();
    render();
    for (let i = destLen; i < destLen + n; i++) slotEls[b][i].classList.add('fresh');
    setTimeout(() => st.remove(), 340);
  }, 330);
  setTimeout(() => { if (id === runId) { A.style.transform = ''; } }, 700);
  setTimeout(() => {
    if (id !== runId) return;
    A.classList.remove('pouring'); busy = false;
    if (isDone(tubes[b])) { sfx.done(); setMsg('<b>Tube ' + (b + 1) + ' is sorted!</b>'); } else setMsg('');
    render();
    if (allSorted(tubes, spec.colors)) finish();
    else if (!hasMoves(tubes)) setMsg('No moves left. Undo a few moves or restart.', true);
  }, 980);
}
function undo() {
  if (state !== 'play' || busy || !history.length) return;
  const h = history.pop();
  tubes = h.tubes; revealed = h.revealed; moves = h.moves; sel = -1;
  setMsg('Undone. Undo is free and never costs a move.');
  render();
}
function hint() {
  if (state !== 'play' || busy || hintsLeft <= 0) return;
  setMsg('Looking for a good move...');
  const id = runId;
  setTimeout(() => {
    if (id !== runId) return;
    const path = solve(tubes.map(t => t.slice()), spec.colors, 9000, 700);
    if (!path || !path.length) { setMsg('No hint found from here. Try undoing a few moves.', true); return; }
    hintsLeft--; hintsUsed++;
    const m = path[0];
    tubeEls[m.from].classList.add('hintFrom'); tubeEls[m.to].classList.add('hintTo');
    setTimeout(() => { tubeEls[m.from].classList.remove('hintFrom'); tubeEls[m.to].classList.remove('hintTo'); }, 2600);
    setMsg('<b>Hint:</b> pour tube ' + (m.from + 1) + ' into tube ' + (m.to + 1) + '.');
    sfx.pick();
    render();
  }, 30);
}

function finish() {
  if (state !== 'play') return;
  state = 'over';
  const s3 = Math.ceil(par * 1.25) + 1, s2 = Math.ceil(par * 1.7) + 3;
  let stars = moves <= s3 ? 3 : moves <= s2 ? 2 : 1;
  if (hintsUsed > 0) stars = Math.max(1, stars - 1);
  let best = 0;
  if (isDaily) {
    const d = save.daily;
    if (d.day !== dailyNum) { d.day = dailyNum; d.stars = 0; d.moves = 0; }
    if (stars > d.stars || (stars === d.stars && (!d.moves || moves < d.moves))) { d.stars = stars; d.moves = moves; }
    if (d.lastDay !== dailyNum) { d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1; d.lastDay = dailyNum; }
  } else {
    save.stars[levelIndex] = Math.max(save.stars[levelIndex], stars);
    save.best[levelIndex] = save.best[levelIndex] ? Math.min(save.best[levelIndex], moves) : moves;
    best = save.best[levelIndex];
  }
  persist(); render();
  sfx.win(); confetti();
  $('cs-result-title').textContent = stars === 3 ? 'Perfectly sorted!' : 'Sorted!';
  [...$('cs-result-stars').children].forEach((el, i) => el.classList.toggle('on', i < stars));
  $('cs-result-sub').innerHTML = moves + ' moves (par ' + par + ')' + (hintsUsed ? ', ' + hintsUsed + ' hint' + (hintsUsed > 1 ? 's' : '') : '') +
    '<br>3 stars at ' + s3 + ' moves or fewer, 2 stars at ' + s2 + (hintsUsed ? ', and a hint costs a star' : '') + (isDaily ? '<br>Streak ' + save.daily.streak : (best ? '<br>Best: ' + best + ' moves' : ''));
  nextBtn.hidden = isDaily || levelIndex >= LEVEL_COUNT - 1;
  shareBtn.hidden = !isDaily; shareBtn.textContent = 'Copy result';
  const id = runId;
  setTimeout(() => { if (id === runId && state === 'over') resultEl.classList.add('show'); }, 900);
}
function confetti() {
  const colors = ['#f87171', '#fbbf24', '#4ade80', '#60a5fa', '#c084fc', '#f472b6'];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div');
    p.className = 'cs-confetti'; p.style.left = Math.random() * 100 + '%'; p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (1.6 + Math.random() * 1.4) + 's'; p.style.animationDelay = (Math.random() * 0.5) + 's';
    panelEl.appendChild(p); setTimeout(() => p.remove(), 3800);
  }
}

/* ---------- Controls ---------- */
undoBtn.addEventListener('click', () => { undo(); undoBtn.blur(); });
hintBtn.addEventListener('click', () => { hint(); hintBtn.blur(); });
$('cs-restart').addEventListener('click', restart);
symBtn.addEventListener('click', () => { save.symbols = !save.symbols; persist(); render(); symBtn.blur(); });
$('cs-levels-btn').addEventListener('click', showMenu);
$('cs-daily').addEventListener('click', startDaily);
$('cs-retry').addEventListener('click', restart);
$('cs-menu-back').addEventListener('click', showMenu);
nextBtn.addEventListener('click', () => startLevel(levelIndex + 1));
shareBtn.addEventListener('click', () => {
  const d = save.daily;
  const text = 'Color Sort Daily #' + dailyNum + ' ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' ' + d.moves + ' moves, streak ' + d.streak;
  const done = () => { shareBtn.textContent = 'Copied!'; };
  try { navigator.clipboard.writeText(text).then(done, () => { shareBtn.textContent = text; }); } catch (e) { shareBtn.textContent = text; }
});
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (state === 'play') {
    if ((k === 'z' || k === 'Z') && !e.repeat) undo();
    else if ((k === 'h' || k === 'H') && !e.repeat) hint();
    else if ((k === 'r' || k === 'R') && !e.repeat) restart();
    else if (/^[1-9]$/.test(k) && Number(k) <= tubes.length) onTube(Number(k) - 1);
  }
  if (k === 'Escape' && state !== 'menu') showMenu();
});

/* ---------- Fit the game into the space available ---------- */
const fitEl = $('cs-fit'), wrapEl = $('cs-wrap');
function fitToView() {
  const availW = Math.max(240, window.innerWidth - 28), availH = Math.max(240, window.innerHeight - 24);
  const narrow = availW < 640;
  wrapEl.classList.toggle('cs-narrow', narrow);
  document.body.style.overflow = narrow ? 'auto' : 'hidden';
  document.body.style.alignItems = narrow ? 'flex-start' : 'center';
  if (narrow) { wrapEl.style.transform = 'none'; wrapEl.style.width = Math.min(520, availW) + 'px'; fitEl.style.width = wrapEl.style.width; fitEl.style.height = wrapEl.offsetHeight + 'px'; return; }
  wrapEl.style.transform = 'none'; wrapEl.style.width = '720px';
  const natH = wrapEl.offsetHeight || 1, k = Math.max(0.4, Math.min(1, availW / 720, availH / natH));
  wrapEl.style.transform = k < 1 ? 'scale(' + k + ')' : 'none';
  fitEl.style.width = Math.round(720 * k) + 'px'; fitEl.style.height = Math.round(natH * k) + 'px';
}
window.addEventListener('resize', fitToView);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitToView).observe(wrapEl);

loadPuzzle(levelSpec(0));
showMenu();
fitToView();`,

  seo: {
    title: 'Color Sort Water Puzzle with 20 Levels – HTML, CSS & JS',
    description: 'Free water sort game with 20 levels, hidden layers, a hint solver, a daily puzzle, pour animation and colour-blind symbols. Plain JS, exports to React & Vue.',
    about: {
      title: 'Color Sort Water Puzzle — 20 Levels, Hidden Layers, a Hint Solver, Pour Animation and a Daily Puzzle',
      description: `Color Sort, also known as water sort, is a puzzle where coloured liquid is poured between glass tubes until every tube holds a single colour. The rule is simple: a tube holds four units, a pour needs an empty tube or a tube whose top colour matches, and the whole run of that colour moves at once if it fits. This version is a complete game with 20 levels in four tiers, hidden layers, a hint solver, free undo, a Daily Puzzle with a streak and a pour animation, in plain HTML, CSS and JavaScript with no libraries, images or audio files.

**Boards that are always solvable, generated backwards**

A random deal can produce a board nobody can finish. Instead \`scramble()\` starts from the solved board and plays moves backwards. Each step is the exact inverse of a legal pour: take k units from the top of one tube and put them on a tube whose top colour is different (or empty). Played forwards in reverse order, those steps solve the board, so a solution is guaranteed, and the number of steps is the par. Boards that are not mixed enough, or that start already sorted, are thrown away and the next seed is tried. A seeded random generator (\`mulberry32\`) means level i is the same board for every player.

**Levels as data**

The \`LEVELS\` array holds, for each level, the number of colours, the number of empty tubes, how many scramble steps to apply and whether layers are hidden. The four tiers (Splash, Stream, Torrent, Flood) grow from 3 colours to 12. From level 11, only the top unit of each tube is visible and the layers underneath show a question mark until they reach the top, so you have to plan with partial information. Adding a level means adding one row.

**A hint solver, not a canned answer**

The Hint button runs a greedy best-first search (\`solve()\`) from the current board, with a small heuristic: how many units sit on top of a different colour, and how many tubes start with the same colour. It uses a binary heap, a canonical key that ignores the order of the tubes, and caps on the number of nodes and the time. The first move of the solution found is highlighted: the source tube in amber and the target tube in green. A hint costs one star, and each level gives three.

**Pouring you can see and hear**

When you pour, the source tube lifts, tilts toward the target and a stream of the right colour flows down before the units change tubes. The new layers grow into place, and the sound is a run of short bubble tones whose length matches the number of units moved. A completed tube glows green and is locked. Pours that would only waste a move, such as emptying a single-colour tube into an empty tube, are refused with a short explanation.

**Stars, undo and the daily puzzle**

Moves are counted against the par. Three stars for par plus about 25 percent, two stars for about 70 percent more, and one star for any solution, minus one star if you used a hint. Undo is free and removes the move from the counter, because it restores a snapshot of the tubes and the hidden layers. Winning a level unlocks the next. The Daily Puzzle builds its board from the date, so everyone plays the same one, and clearing it on consecutive days builds a streak. Progress, best moves and the streak are saved to \`localStorage\` inside try/catch.

**Accessible and responsive**

Every colour can show a symbol (a circle, triangle, square and so on), so the game does not depend on telling colours apart. Tubes are focusable buttons with labels such as "Tube 3: colour 2, colour 5", and the keyboard works: arrow keys move focus, Enter or Space selects and pours, the number keys pick a tube, and Z, H and R undo, hint and restart. The whole game scales to short preview areas, and on phones the layout stacks and the page scrolls.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a level or the Daily Puzzle', text: 'The menu shows 20 levels in four tiers, with your stars on each. Level 1 is open at first and each solved level unlocks the next. The gold Daily Puzzle card starts the puzzle of the day, which is the same for everyone.' },
        { title: 'Select a tube and pour', text: 'Tap a tube to lift it, then tap another tube to pour into it. You can pour onto an empty tube or onto a tube whose top colour matches, as long as there is room. The whole top run of that colour moves at once if it fits.' },
        { title: 'Sort every colour', text: 'You win when every colour fills a single tube. A finished tube glows green and locks, and the progress bar above the board shows how many colours are done.' },
        { title: 'Watch for hidden layers', text: 'From level 11 only the top unit of each tube is visible. The layers below show a question mark and are revealed when they reach the top, so plan your pours with what you can see.' },
        { title: 'Use undo and hints', text: 'Undo (Z) is free and takes the move back off the counter. Hint (H) shows a good next pour, highlighting the source in amber and the target in green. You get three hints per level and each one costs a star. Restart (R) starts the level again.' },
        { title: 'Earn stars, turn on symbols', text: 'Finish within about 25 percent of the par for three stars. The Symbols button shows a different shape on every colour, which helps if colours are hard to tell apart. Your stars, best moves and daily streak are saved in this browser.' },
      ],
    },
    features: [
      '20 levels in four tiers from 3 to 12 colours, defined as data, plus a Daily Puzzle with a streak',
      'Boards generated by scrambling backwards from the solved state, so every level is solvable and has a known par',
      'Seeded generator: level i is the same board for every player',
      'Hidden layers from level 11: only the top unit of each tube is visible until it is exposed',
      'Hint solver: greedy best-first search with a heap, a canonical state key and node and time caps',
      'Free undo through snapshots, restart, and a locked state for finished tubes',
      'Pour animation: the tube lifts and tilts, a stream of colour flows, new layers grow in, with bubble sounds from a Web Audio synth',
      'Colour-blind friendly: optional symbols on every colour, focusable tubes with labels and full keyboard play',
      'Stars from moves against par, unlocks, best moves and the streak saved to localStorage inside try/catch',
      'Scales to its preview area (down to 40 percent) and stacks on phones, with confetti, a result screen and a copy result button',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching puzzle generation by reversing the rules', desc: 'Generating the board by scrambling backwards from the solved state is a neat trick that works for many puzzles: if every step is the inverse of a legal move, the puzzle is solvable by construction and the number of steps gives you a par.' },
      { icon: 'CODE', title: 'A compact best-first search with a heap', desc: 'solve() is a short, readable search with a heuristic, a priority queue, canonical state keys and resource caps. It is a good example of how to add a hint system to any state-based puzzle.' },
      { icon: 'APP', title: 'A relaxing game for a site or app', desc: 'Water sort is calm and quick to learn. The daily puzzle and streak give visitors a reason to return, and progress is saved without an account.' },
      { icon: 'DESIGN', title: 'Accessible colour-based games', desc: 'The optional symbols, labelled focusable tubes and keyboard controls show how to make a game that depends on colour playable for everyone.' },
      { icon: 'FLOW', title: 'Animating state changes with CSS only', desc: 'The tilt, stream and fill animations are plain CSS transitions and keyframes driven by a few class changes and inline transforms, with the logic state updated at the right moment.' },
      { icon: 'CODE', title: 'Related: Lights Out Puzzle Game', desc: 'See the [Lights Out Puzzle Game](/ui-snippets/lights-out-puzzle-game/) for another puzzle that can be generated from a solved state.' },
      { icon: 'CODE', title: 'Related: Cave Flyer Game', desc: 'See the [Cave Flyer Game](/ui-snippets/cave-flyer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do you guarantee that every level can be solved?', a: 'The board is not dealt at random. scramble() starts from the solved board and applies inverse pours: it takes k units from the top of a tube and puts them on a tube whose top is a different colour or empty. Each of those steps, played forwards, is a legal pour, so playing the steps in reverse order solves the board. The number of steps is the par shown in the HUD.' },
      { q: 'Why can I not pour a single-colour tube into an empty tube?', a: 'It would only waste a move, because the colour is already sorted and nothing changes about the puzzle. legal() refuses it and the game shows a short message. Full single-colour tubes are also locked, since taking units out of a finished tube is never useful.' },
      { q: 'How does the hint work, and why does it cost a star?', a: 'solve() runs a greedy best-first search from the current board. The heuristic counts units that sit on a different colour and tubes that start with the same colour, a binary heap picks the most promising state, and a canonical key ignores the order of the tubes so equal boards are not searched twice. The first move of the path it finds is shown. Because a hint does part of the thinking, the star rating drops by one when you use it.' },
      { q: 'How do hidden layers work?', a: 'From level 11 each unit has a revealed flag. At the start only the top unit of every tube is revealed, and a unit is revealed as soon as it becomes the top of its tube. Units you pour keep being visible, and a finished tube reveals everything. Undo restores the flags together with the tubes.' },
      { q: 'How do I add a level or change the difficulty?', a: 'Add a row to the LEVELS array with the number of colours (up to 12), the number of empty tubes, the scramble depth and whether layers are hidden. More scramble steps mix the board more and raise the par. The menu shows five levels per tier, so add levels in groups of five, or edit the TIERS array. Colours and their symbols are in the COLORS array.' },
      { q: 'Does it work in a sandboxed iframe and on phones?', a: 'Yes. All localStorage reads and writes are wrapped in try/catch, so a blocked storage only means that progress is not saved. The AudioContext is created when a level starts and every sound call is wrapped. Tubes respond to pointer events, and on narrow screens the layout stacks and the page scrolls.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain why scramble() works backwards instead of dealing colours at random, how the inverse-pour conditions guarantee a solution, and how solve() uses a heuristic and a heap to find hints. It is also a good base to extend: ask for tubes of different heights, a mode with limited undo, a "locked tube" obstacle, colours that mix, or an exact shortest-solution search (IDA* or BFS) to compute a true par. You can also ask it to review the pour animation timing and the busy flag for edge cases when you restart in the middle of a pour.`,
      prompt: `Build a water-sort (color sort) puzzle in plain HTML, CSS and JavaScript with no libraries, images or audio files.

Requirements:
- Glass tubes that hold four units each, drawn with CSS (gloss highlight, rim, rounded bottom). A pour is legal onto an empty tube or a tube with the same top colour and room, and moves the whole top run of that colour that fits. Refuse useless pours: out of a finished tube, or a single-colour tube into an empty tube. A tube full of one colour glows and locks. Win when every colour fills one tube.
- Generate each board by scrambling backwards from the solved state with inverse pours (take k units from a tube top and put them on a tube whose top is a different colour or empty), so a solution always exists and the number of steps is the par. Use a seeded random generator (mulberry32) so level i is the same for everyone. Reject boards that are not mixed enough.
- 20 levels in 4 tiers defined as data (colours 3 to 12, empty tubes, scramble depth, hidden layers). From level 11 the layers below the top unit show "?" until they become the top. Level unlocks after the previous one is solved.
- Stars from moves against par (3 stars within about 25 percent of par, 2 within about 70 percent, otherwise 1, minus one star if a hint was used). A Daily Puzzle seeded from the date with a day streak and a copy result button. Save stars, best moves, symbol setting and the streak to localStorage inside try/catch.
- Free undo using snapshots of the tubes and hidden flags (undo also removes the move from the counter), Restart, and 3 hints per level using a greedy best-first search with a binary heap, a canonical state key that ignores tube order and node and time caps. Highlight the source tube and the target tube.
- Pour animation: the source tube lifts and tilts toward the target, a stream of the right colour flows down, then the units change tubes and the new layers grow in. Lock input while animating and guard timers with a run id. Bubble sounds from the Web Audio API with a mute button, confetti on a win, a result screen with stars.
- Accessibility: an optional symbol on every colour, focusable tubes with aria labels, arrow keys and Enter to play, number keys to select tubes, and Z, H and R for undo, hint and restart.
- Scale the whole game to fit the available area (shrink with transform down to 40 percent) and stack the layout on narrow screens.`,
    },
  },
};

export default colorSortPuzzle;
