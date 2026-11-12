const minesweeperGame = {
  id: 'minesweeper-game',
  title: 'Minesweeper Puzzle Game',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="mw-fit" id="mw-fit"><div class="mw-wrap" id="mw-wrap">
  <div class="mw-panel" id="mw-panel">
    <div class="mw-hud">
      <div class="mw-hud-left">
        <span class="mw-kicker" id="mw-kicker">Minesweeper</span>
        <span class="mw-name" id="mw-name">Pick a level</span>
      </div>
      <div class="mw-stat"><span class="mw-label">Mines</span><b class="mw-seg" id="mw-mines">000</b></div>
      <div class="mw-stat"><span class="mw-label">Time</span><b class="mw-seg" id="mw-time">0:00</b></div>
      <div class="mw-stat"><span class="mw-label">Lives</span><b class="mw-lives" id="mw-lives" aria-live="polite"></b></div>
      <div class="mw-hud-btns">
        <button class="mw-btn-sm" id="mw-levels-btn" type="button" title="Levels (Esc)">Levels</button>
        <button class="mw-btn-sm" id="mw-mute" type="button" aria-pressed="false">Sound on</button>
      </div>
    </div>

    <div class="mw-board-wrap"><div class="mw-board" id="mw-board" role="grid" aria-label="Minesweeper board"></div></div>
    <p class="mw-msg" id="mw-msg">Click a cell to reveal it. Right-click or press and hold to flag a mine.</p>

    <div class="mw-tools">
      <button class="mw-tool" id="mw-flagmode" type="button" aria-pressed="false"><span class="mw-tool-ico" id="mw-flag-ico"></span>Flag mode <em>F</em></button>
      <button class="mw-tool" id="mw-hint" type="button"><span class="mw-tool-ico">&#128161;</span>Hint <i id="mw-hint-count">3</i><em>H</em></button>
      <button class="mw-tool" id="mw-restart" type="button"><span class="mw-tool-ico">&#8635;</span>Restart <em>R</em></button>
    </div>

    <div class="mw-overlay show" id="mw-menu">
      <p class="mw-logo">Minesweeper</p>
      <p class="mw-tagline">Numbers tell you how many mines touch a cell. Every board can be solved by pure logic, from the opening shown, without a single guess.</p>
      <div class="mw-menu-row">
        <button class="mw-daily" id="mw-daily" type="button">
          <span class="mw-daily-title" id="mw-daily-title">Daily Board</span>
          <span class="mw-daily-sub" id="mw-daily-sub">The same board for everyone</span>
        </button>
        <div class="mw-totals"><span><b id="mw-star-total">0</b> / 60 stars</span><span>Daily streak <b id="mw-streak">0</b></span><span id="mw-record"></span></div>
      </div>
      <div class="mw-tiers" id="mw-tiers"></div>
    </div>

    <div class="mw-overlay" id="mw-result">
      <p class="mw-result-title" id="mw-result-title">Field cleared!</p>
      <div class="mw-result-stars" id="mw-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="mw-result-sub" id="mw-result-sub"></p>
      <div class="mw-result-btns">
        <button class="mw-btn" id="mw-next" type="button">Next level</button>
        <button class="mw-btn mw-btn-ghost" id="mw-retry" type="button">Play again</button>
        <button class="mw-btn mw-btn-ghost" id="mw-share" type="button">Copy result</button>
        <button class="mw-btn mw-btn-ghost" id="mw-menu-back" type="button">Levels</button>
      </div>
    </div>
  </div>
</div></div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #e2e8f0;
  background: radial-gradient(ellipse at top, #1a2a3d 0%, #0a131f 60%, #050a12 100%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 12px 14px; overflow: hidden;
}
/* The game scales itself to the space it is given (fitToView): .mw-fit takes the scaled size, .mw-wrap is laid out at its
   natural size and then shrunk with transform. */
.mw-fit { flex: none; }
.mw-wrap { width: 900px; transform-origin: top left; }
.mw-panel {
  position: relative; display: flex; flex-direction: column; gap: 10px; padding: 16px; border-radius: 20px; overflow: hidden;
  background: linear-gradient(180deg, rgba(22,38,58,0.8), rgba(8,15,26,0.95));
  border: 1px solid rgba(148,163,184,0.16); box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(56,189,248,0.1);
}
.mw-panel.shake { animation: mw-shake 0.4s ease; }
@keyframes mw-shake { 20% { transform: translate(-5px, 3px); } 40% { transform: translate(5px, -3px); } 60% { transform: translate(-4px, 2px); } 80% { transform: translate(4px, -2px); } }

.mw-hud { display: flex; align-items: center; gap: 18px; flex-wrap: wrap; }
.mw-hud-left { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; min-width: 0; }
.mw-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #fbbf24; }
.mw-name { font-size: 17px; font-weight: 800; color: #f8fafc; white-space: nowrap; }
.mw-stat { display: flex; flex-direction: column; align-items: center; line-height: 1.15; }
.mw-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
.mw-seg { font-family: 'Courier New', monospace; font-size: 22px; font-weight: 800; color: #f87171; background: #0b1220; padding: 2px 8px; border-radius: 5px; letter-spacing: 2px; text-shadow: 0 0 8px rgba(248,113,113,0.6); min-width: 62px; text-align: center; }
.mw-lives { font-size: 17px; letter-spacing: 3px; color: #f87171; text-shadow: 0 0 10px rgba(248,113,113,0.5); min-width: 56px; text-align: center; }
.mw-lives .off { color: #334155; text-shadow: none; }
.mw-lives.hit { animation: mw-shake 0.4s ease; }
.mw-hud-btns { display: flex; gap: 5px; }
.mw-btn-sm { background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
.mw-btn-sm:hover { background: rgba(255,255,255,0.14); }

.mw-board-wrap { display: flex; justify-content: center; padding: 6px 0; min-height: 200px; align-items: center; }
.mw-board { display: grid; gap: 2px; padding: 8px; border-radius: 12px; background: #152235; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.06), 0 10px 30px rgba(0,0,0,0.4); touch-action: manipulation; user-select: none; -webkit-user-select: none; }
.mw-cell {
  position: relative; display: flex; align-items: center; justify-content: center; border: none; border-radius: 5px; cursor: pointer; padding: 0;
  font: inherit; font-weight: 900; color: #e2e8f0; outline: none;
  background: linear-gradient(145deg, #3d5878, #2b415c); box-shadow: inset 1px 1px 0 rgba(255,255,255,0.22), inset -1px -1px 0 rgba(0,0,0,0.35);
  transition: background 0.1s, transform 0.08s;
}
.mw-cell:hover:not(.rev):not(.flag) { background: linear-gradient(145deg, #4a6a90, #35506f); }
.mw-cell:active:not(.rev) { transform: scale(0.93); }
.mw-cell.rev { background: #0f1b2b; box-shadow: inset 0 0 0 1px rgba(255,255,255,0.04); cursor: default; animation: mw-reveal 0.28s ease-out backwards; animation-delay: var(--d, 0s); }
.mw-cell.rev.num { cursor: pointer; }
@keyframes mw-reveal { from { transform: scale(0.5); opacity: 0.2; background: #3d5878; } to { transform: scale(1); opacity: 1; } }
.mw-cell.cur { box-shadow: inset 0 0 0 3px #fde68a; }
.mw-cell svg { width: 66%; height: 66%; pointer-events: none; }
.mw-cell.flag { background: linear-gradient(145deg, #3d5878, #2b415c); }
.mw-cell.mine { background: #3b1219; }
.mw-cell.boom { background: #b91c1c; animation: mw-boom 0.6s ease-out; }
@keyframes mw-boom { 0% { transform: scale(0.6); box-shadow: 0 0 0 0 rgba(251,146,60,0.9); } 40% { transform: scale(1.35); box-shadow: 0 0 30px 12px rgba(251,146,60,0.8); } 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(251,146,60,0); } }
.mw-cell.wrong { background: #3b1219; }
.mw-cell.hintClue { box-shadow: inset 0 0 0 3px #fbbf24, 0 0 14px rgba(251,191,36,0.7); z-index: 2; }
.mw-cell.hintSafe { box-shadow: inset 0 0 0 3px #4ade80, 0 0 16px rgba(74,222,128,0.8); z-index: 2; }
.mw-cell.hintMine { box-shadow: inset 0 0 0 3px #f87171, 0 0 16px rgba(248,113,113,0.8); z-index: 2; }
.mw-cell.win { animation: mw-win 0.5s ease backwards; animation-delay: var(--d, 0s); }
@keyframes mw-win { 40% { background: #16a34a; transform: scale(1.12); } }
.mw-n1 { color: #60a5fa; } .mw-n2 { color: #4ade80; } .mw-n3 { color: #f87171; } .mw-n4 { color: #a78bfa; }
.mw-n5 { color: #fb923c; } .mw-n6 { color: #22d3ee; } .mw-n7 { color: #e2e8f0; } .mw-n8 { color: #94a3b8; }

.mw-msg { min-height: 40px; font-size: 13px; line-height: 1.5; color: #94a3b8; text-align: center; padding: 0 6px; }
.mw-msg b { color: #5eead4; }
.mw-msg.warn { color: #fca5a5; }
.mw-tools { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 520px; width: 100%; margin: 0 auto; }
.mw-tool { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 0; border-radius: 12px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; color: #cbd5e1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); transition: background 0.12s, border-color 0.12s; }
.mw-tool:hover:not(:disabled) { background: rgba(255,255,255,0.1); border-color: rgba(125,211,252,0.5); }
.mw-tool:disabled { opacity: 0.35; cursor: not-allowed; }
.mw-tool[aria-pressed="true"] { background: #b45309; border-color: #fbbf24; color: #fff; }
.mw-tool-ico { font-size: 15px; line-height: 1; display: flex; }
.mw-tool-ico svg { width: 16px; height: 16px; }
.mw-tool em { font-style: normal; font-size: 9px; color: #64748b; }
.mw-tool i { font-style: normal; font-size: 10px; background: #0284c7; color: #fff; border-radius: 8px; padding: 0 6px; }

.mw-overlay { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 18px; text-align: center; overflow-y: auto; background: radial-gradient(ellipse at center, rgba(8,15,26,0.965), rgba(4,8,14,0.985)); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.mw-overlay.show { opacity: 1; pointer-events: auto; }
.mw-logo { font-size: 46px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; background: linear-gradient(90deg, #38bdf8, #4ade80, #fbbf24, #f87171); -webkit-background-clip: text; background-clip: text; color: transparent; }
.mw-tagline { font-size: 13px; color: #94a3b8; max-width: 520px; line-height: 1.5; }
.mw-menu-row { display: flex; align-items: center; justify-content: center; gap: 16px; flex-wrap: wrap; }
.mw-daily { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 18px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left; color: #fef3c7; border: 1px solid rgba(250,204,21,0.45); background: linear-gradient(135deg, rgba(250,204,21,0.18), rgba(251,146,60,0.1)); transition: transform 0.15s, box-shadow 0.15s; }
.mw-daily:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,204,21,0.2); }
.mw-daily-title { font-size: 14px; font-weight: 800; }
.mw-daily-sub { font-size: 11px; color: #fcd34d; max-width: 230px; }
.mw-totals { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: #94a3b8; text-align: left; }
.mw-totals b { color: #f8fafc; }
.mw-tiers { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 740px; }
.mw-tier { display: grid; grid-template-columns: 150px 1fr; align-items: center; gap: 12px; }
.mw-tier-name { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--g); text-align: left; line-height: 1.2; }
.mw-tier-name small { display: block; font-size: 10px; font-weight: 600; color: #64748b; text-transform: none; letter-spacing: 0; }
.mw-tier-tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.mw-tile { position: relative; height: 46px; border-radius: 10px; cursor: pointer; font: inherit; color: #e2e8f0; border: 1px solid rgba(148,163,184,0.22); background: rgba(255,255,255,0.04); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; transition: transform 0.12s, border-color 0.12s; }
.mw-tile:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); }
.mw-tile::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.mw-tile-num { font-size: 15px; font-weight: 800; }
.mw-tile-stars { font-size: 9px; letter-spacing: 1px; color: #334155; }
.mw-tile-stars .on { color: #facc15; }
.mw-tile:disabled { opacity: 0.32; cursor: not-allowed; }
.mw-tile.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 12px rgba(250,204,21,0.15); }

.mw-result-title { font-size: 36px; font-weight: 900; color: #f8fafc; }
.mw-result-stars { display: flex; gap: 10px; font-size: 52px; line-height: 1; }
.mw-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.mw-result-stars span.on { color: #facc15; text-shadow: 0 0 22px rgba(250,204,21,0.75); }
.mw-overlay.show .mw-result-stars span { animation: mw-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.mw-overlay.show .mw-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.mw-overlay.show .mw-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes mw-star { to { transform: scale(1); opacity: 1; } }
.mw-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.7; }
.mw-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.mw-btn { padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #0284c7, #0d9488); box-shadow: 0 6px 18px rgba(2,132,199,0.35); transition: transform 0.12s; }
.mw-btn:hover { transform: translateY(-1px); }
.mw-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.mw-btn[hidden] { display: none; }
.mw-confetti { position: absolute; top: -12px; width: 8px; height: 14px; border-radius: 2px; z-index: 40; pointer-events: none; animation: mw-fall linear forwards; }
@keyframes mw-fall { to { transform: translate(var(--dx), 760px) rotate(var(--rot)); opacity: 0.9; } }

.mw-narrow .mw-tier { grid-template-columns: 1fr; gap: 4px; }
.mw-narrow .mw-logo { font-size: 34px; }`,

  js: `const SAVE_KEY = 'minesweeper-save-v1';
const DAY0 = Date.UTC(2026, 10, 11); // Daily Board #1
const MAX_HINTS = 3;
const TIERS = [
  { name: 'Recruit',    note: '8x8, three lives',     color: '#4ade80' },
  { name: 'Squad',      note: '12x12, two lives',     color: '#60a5fa' },
  { name: 'Bomb squad', note: '16x16, one life',      color: '#c084fc' },
  { name: 'Expert',     note: '26x15, dense, one life', color: '#fb923c' },
];
// columns, rows, mines, lives. Every board is generated so it can be solved by logic alone, from the opening that is shown.
const LEVELS = [
  [8, 8, 6, 3], [8, 8, 8, 3], [8, 8, 10, 3], [8, 8, 11, 3], [8, 8, 12, 3],
  [12, 12, 18, 2], [12, 12, 22, 2], [12, 12, 26, 2], [12, 12, 29, 2], [12, 12, 32, 2],
  [16, 16, 34, 1], [16, 16, 38, 1], [16, 16, 42, 1], [16, 16, 46, 1], [16, 16, 50, 1],
  [26, 15, 56, 1], [26, 15, 62, 1], [26, 15, 68, 1], [26, 15, 74, 1], [26, 15, 80, 1],
];
const LEVEL_COUNT = LEVELS.length;
const FLAG_SVG = '<svg viewBox="0 0 24 24"><path d="M6 3v18" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round"/><path d="M7 4l11 4.5L7 13z" fill="#ef4444"/><path d="M3 21h10" stroke="#94a3b8" stroke-width="2" stroke-linecap="round"/></svg>';
const MINE_SVG = '<svg viewBox="0 0 24 24"><g stroke="#cbd5e1" stroke-width="2.2" stroke-linecap="round"><path d="M12 2.5v19M2.5 12h19M5.3 5.3l13.4 13.4M18.7 5.3L5.3 18.7"/></g><circle cx="12" cy="12" r="6.2" fill="#1e293b" stroke="#cbd5e1" stroke-width="1"/><circle cx="10" cy="10" r="1.8" fill="#e2e8f0"/></svg>';
const WRONG_SVG = '<svg viewBox="0 0 24 24"><path d="M6 3v18" stroke="#e2e8f0" stroke-width="2" stroke-linecap="round"/><path d="M7 4l11 4.5L7 13z" fill="#ef4444"/><path d="M4 4l16 16M20 4L4 20" stroke="#fbbf24" stroke-width="2.4" stroke-linecap="round"/></svg>';

const $ = id => document.getElementById(id);
const boardEl = $('mw-board'), msgEl = $('mw-msg'), panelEl = $('mw-panel'), menuEl = $('mw-menu'), resultEl = $('mw-result');
const hintBtn = $('mw-hint'), flagBtn = $('mw-flagmode'), nextBtn = $('mw-next'), shareBtn = $('mw-share'), muteBtn = $('mw-mute');
$('mw-flag-ico').innerHTML = FLAG_SVG;

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() {
  return { stars: Array(LEVEL_COUNT).fill(0), best: Array(LEVEL_COUNT).fill(0), wins: 0, losses: 0, daily: { day: 0, stars: 0, time: 0, streak: 0, lastDay: 0 } };
}
function loadSave() {
  const f = freshSave();
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      f.stars = f.stars.map((_, i) => s.stars[i] || 0); f.best = f.best.map((_, i) => (s.best && s.best[i]) || 0);
      f.wins = s.wins || 0; f.losses = s.losses || 0; Object.assign(f.daily, s.daily || {});
    }
  } catch (e) { /* storage blocked */ }
  return f;
}
function persist() { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) { /* storage blocked */ } }
let save = loadSave();

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
function noise(dur, vol, lowpass) {
  if (muted || !audioCtx) return;
  try {
    const len = Math.floor(audioCtx.sampleRate * dur), buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate), data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = audioCtx.createBufferSource(), filter = audioCtx.createBiquadFilter(), gain = audioCtx.createGain();
    src.buffer = buf; filter.type = 'lowpass'; filter.frequency.value = lowpass;
    gain.gain.setValueAtTime(vol, audioCtx.currentTime); gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    src.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination); src.start();
  } catch (e) { /* audio is optional */ }
}
const sfx = {
  tick(n) { tone(420 + (n || 0) * 60, 0.05, 'triangle', 0.05); },
  open() { tone(300, 0.18, 'sine', 0.05, 700); },
  flag() { tone(760, 0.04, 'square', 0.03); tone(520, 0.05, 'square', 0.03, null, 0.04); },
  boom() { noise(0.6, 0.2, 700); tone(80, 0.5, 'sine', 0.14, 30); },
  hint() { tone(880, 0.1, 'sine', 0.05); tone(1320, 0.16, 'sine', 0.05, null, 0.09); },
  win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, i * 0.12)); },
  lose() { noise(0.9, 0.18, 500); tone(220, 0.5, 'sawtooth', 0.05, 90, 0.2); },
};
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
  muteBtn.setAttribute('aria-pressed', String(muted));
});

/* ---------- Board model: flat arrays, cell index = row * cols + col ---------- */
let cols = 8, rows = 8, total = 64, minesN = 6, NB = [];
function buildNeighbours() {
  NB = [];
  for (let i = 0; i < total; i++) {
    const r = (i / cols) | 0, c = i % cols, out = [];
    for (let dr = -1; dr <= 1; dr++) for (let dc = -1; dc <= 1; dc++) {
      if (!dr && !dc) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) out.push(nr * cols + nc);
    }
    NB.push(out);
  }
}
const coord = i => String.fromCharCode(65 + (i % cols)) + (((i / cols) | 0) + 1);
function numbersOf(mine) { const num = new Int8Array(total); for (let i = 0; i < total; i++) if (!mine[i]) { let n = 0; NB[i].forEach(j => { if (mine[j]) n++; }); num[i] = n; } return num; }

/* ---------- The logic solver: used to guarantee boards without guessing, and to explain hints ---------- */
// st: { rev, num, mine (known mines), safe (known safe) } as arrays of 0/1. Returns the deductions that follow from the numbers:
// 1) a number whose mines are all found makes its other neighbours safe, a number with as many hidden neighbours as mines left makes them all mines;
// 2) if the hidden neighbours of one number are a subset of another's, the difference can be settled by subtracting.
function findSteps(st) {
  const cons = [];
  for (let i = 0; i < total; i++) {
    if (!st.rev[i] || st.num[i] <= 0) continue;
    const unknown = []; let known = 0;
    NB[i].forEach(n => { if (st.mine[n]) known++; else if (!st.rev[n] && !st.safe[n]) unknown.push(n); });
    if (unknown.length) cons.push({ i, cells: unknown, need: st.num[i] - known, known });
  }
  const steps = [], seen = new Set();
  const add = (type, cell, rule, clues, extra) => { const k = type + cell; if (!seen.has(k)) { seen.add(k); steps.push({ type, cell, rule, clues, extra }); } };
  cons.forEach(c => {
    if (c.need === 0) c.cells.forEach(x => add('safe', x, 'done', [c.i], c.known));
    else if (c.need === c.cells.length) c.cells.forEach(x => add('mine', x, 'all', [c.i], c.need));
  });
  if (steps.length) return steps;
  const byCell = {};
  cons.forEach((c, k) => c.cells.forEach(x => { (byCell[x] = byCell[x] || []).push(k); }));
  cons.forEach((a, ka) => {
    (byCell[a.cells[0]] || []).forEach(kb => {
      const b = cons[kb];
      if (kb === ka || a.cells.length >= b.cells.length) return;
      const inB = new Set(b.cells);
      if (!a.cells.every(x => inB.has(x))) return;
      const inA = new Set(a.cells), diff = b.cells.filter(x => !inA.has(x)), need = b.need - a.need;
      if (need === 0) diff.forEach(x => add('safe', x, 'subset', [a.i, b.i], 0));
      else if (need === diff.length) diff.forEach(x => add('mine', x, 'subset', [a.i, b.i], need));
    });
  });
  return steps;
}
function isLogicSolvable(mine, start) { // plays the whole board with the solver only, from the opening at "start"
  const num = numbersOf(mine), st = { rev: new Uint8Array(total), num, mine: new Uint8Array(total), safe: new Uint8Array(total) };
  let revealed = 0;
  const open = s => {
    const stack = [s];
    while (stack.length) {
      const i = stack.pop();
      if (st.rev[i] || mine[i]) continue;
      st.rev[i] = 1; revealed++;
      if (num[i] === 0) NB[i].forEach(n => { if (!st.rev[n]) stack.push(n); });
    }
  };
  open(start);
  for (let guard = 0; guard < 400; guard++) {
    const steps = findSteps(st);
    if (!steps.length) break;
    let progress = false;
    steps.forEach(s => {
      if (s.type === 'mine') { if (!st.mine[s.cell]) { st.mine[s.cell] = 1; progress = true; } }
      else if (!st.rev[s.cell]) { if (mine[s.cell]) return; open(s.cell); progress = true; }
    });
    if (!progress) break;
  }
  return revealed === total - minesN;
}
function generateBoard(c, r, m, seed) {
  cols = c; rows = r; total = c * r; minesN = m; buildNeighbours();
  let last = null;
  for (let attempt = 0; attempt < 400; attempt++) {
    const R = mulberry32(seed + attempt * 7919);
    const startR = 1 + Math.floor(R() * (r - 2)), startC = 1 + Math.floor(R() * (c - 2)), start = startR * c + startC;
    const banned = new Set(NB[start].concat(start));
    const cand = []; for (let i = 0; i < total; i++) if (!banned.has(i)) cand.push(i);
    for (let i = cand.length - 1; i > 0; i--) { const j = Math.floor(R() * (i + 1)); const t = cand[i]; cand[i] = cand[j]; cand[j] = t; }
    const mine = new Uint8Array(total);
    cand.slice(0, m).forEach(i => { mine[i] = 1; });
    last = { mine, start };
    if (isLogicSolvable(mine, start)) return { mine, start, attempts: attempt + 1, ok: true };
  }
  return { mine: last.mine, start: last.start, attempts: 400, ok: false };
}

/* ---------- Game state ---------- */
let spec = null, mode = 'level', levelIndex = 0, dailyNum = 0;
let mineMap = new Uint8Array(0), numMap = new Int8Array(0), startCell = 0;
let rev = new Uint8Array(0), flag = new Uint8Array(0), boomed = new Uint8Array(0);
let revealed = 0, flags = 0, lives = 1, hintsLeft = MAX_HINTS, hintsUsed = 0, minesHit = 0;
let phase = 'menu', timerOn = false, elapsed = 0, lastTick = 0, runId = 0, flagMode = false, cursor = -1, cellEls = [];

function setupGame(s) {
  spec = s; mode = s.mode;
  runId++; clearInterval(window.__mwTimer);
  const g = generateBoard(s.cols, s.rows, s.mines, s.seed);
  mineMap = g.mine; startCell = g.start; numMap = numbersOf(mineMap);
  rev = new Uint8Array(total); flag = new Uint8Array(total); boomed = new Uint8Array(total);
  revealed = 0; flags = 0; lives = s.lives; hintsLeft = MAX_HINTS; hintsUsed = 0; minesHit = 0;
  timerOn = false; elapsed = 0; flagMode = false; cursor = -1;
  buildBoardDom();
  openArea(startCell, true); // the opening is shown at the start, so no guess is ever needed
  phase = 'play';
  menuEl.classList.remove('show'); resultEl.classList.remove('show');
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  setMsg('The opening is revealed. Click a cell to reveal it, right-click or press and hold to flag a mine, click a number to clear around it once its flags match.');
  window.__mwTimer = setInterval(tick, 250);
  fitToView();
  render();
}
function startLevel(i) {
  getAudio(); levelIndex = i;
  const [c, r, m, l] = LEVELS[i];
  setupGame({ mode: 'level', cols: c, rows: r, mines: m, lives: l, seed: 900 + i * 7919, par: Math.round(c * r * 0.8 + m * 2) });
  $('mw-kicker').textContent = 'Level ' + (i + 1) + ' - ' + TIERS[Math.floor(i / 5)].name;
  $('mw-name').textContent = c + ' x ' + r + ', ' + m + ' mines';
}
function startDaily() {
  getAudio(); dailyNum = todayNumber();
  setupGame({ mode: 'daily', cols: 16, rows: 16, mines: 40, lives: 1, seed: dailyNum * 104729 + 3, par: Math.round(256 * 0.8 + 80) });
  $('mw-kicker').textContent = 'Daily'; $('mw-name').textContent = 'Daily Board #' + dailyNum + ' (16 x 16, 40 mines)';
}
function restart() { if (mode === 'daily') startDaily(); else startLevel(levelIndex); }
function showMenu() {
  runId++; clearInterval(window.__mwTimer); phase = 'menu';
  resultEl.classList.remove('show'); menuEl.classList.add('show');
  renderMenu();
  $('mw-kicker').textContent = 'Minesweeper'; $('mw-name').textContent = 'Pick a level';
}

/* ---------- Rendering ---------- */
function buildBoardDom() {
  const cs = Math.max(22, Math.min(40, Math.floor(820 / cols), Math.floor(450 / rows)));
  boardEl.style.gridTemplateColumns = 'repeat(' + cols + ', ' + cs + 'px)';
  boardEl.style.gridTemplateRows = 'repeat(' + rows + ', ' + cs + 'px)';
  boardEl.style.fontSize = Math.round(cs * 0.55) + 'px';
  boardEl.innerHTML = ''; cellEls = [];
  let down = null;
  const cancel = () => { if (down) { clearTimeout(down.timer); down = null; } };
  for (let i = 0; i < total; i++) {
    const el = document.createElement('button');
    el.type = 'button'; el.className = 'mw-cell'; el.setAttribute('role', 'gridcell');
    el.addEventListener('contextmenu', e => e.preventDefault());
    el.addEventListener('pointerdown', e => {
      if (phase !== 'play') return;
      if (e.button === 2) { toggleFlag(i); return; }
      if (e.button === 1) { e.preventDefault(); chord(i); return; }
      if (e.button !== 0) return;
      down = { i, long: false, timer: setTimeout(() => { if (down) { down.long = true; toggleFlag(i); } }, 420) }; // press and hold flags (touch)
    });
    el.addEventListener('pointerup', e => {
      if (!down || down.i !== i) { cancel(); return; }
      const d = down; cancel();
      if (e.button === 0 && !d.long) onCell(i, e.shiftKey);
    });
    el.addEventListener('pointerleave', cancel); el.addEventListener('pointercancel', cancel);
    boardEl.appendChild(el); cellEls.push(el);
  }
}
function drawCell(i) {
  const el = cellEls[i];
  let cls = 'mw-cell', html = '';
  if (rev[i]) {
    cls += ' rev';
    if (mineMap[i]) { cls += ' mine' + (boomed[i] ? ' boom' : ''); html = MINE_SVG; }
    else if (numMap[i] > 0) { cls += ' num mw-n' + numMap[i]; html = String(numMap[i]); }
  } else if (flag[i]) {
    cls += ' flag'; html = FLAG_SVG;
    if (phase === 'over' && !mineMap[i]) { cls += ' wrong'; html = WRONG_SVG; }
  }
  if (i === cursor) cls += ' cur';
  const keep = el.className.match(/hint(Clue|Safe|Mine)|win/g);
  el.className = cls + (keep ? ' ' + keep.join(' ') : '');
  if (el.dataset.h !== html) { el.innerHTML = html; el.dataset.h = html; }
}
function render() {
  for (let i = 0; i < total; i++) drawCell(i);
  $('mw-mines').textContent = String(Math.max(-99, minesN - flags - minesHit)).padStart(3, '0');
  $('mw-time').textContent = fmt(elapsed);
  $('mw-lives').innerHTML = Array.from({ length: spec ? spec.lives : 1 }, (_, k) => '<span class="' + (k < lives ? '' : 'off') + '">\\u2665</span>').join(' ');
  $('mw-hint-count').textContent = hintsLeft;
  hintBtn.disabled = phase !== 'play' || hintsLeft <= 0;
  flagBtn.setAttribute('aria-pressed', String(flagMode));
}
function fmt(s) { s = Math.floor(s); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); }
function setMsg(html, warn) { msgEl.innerHTML = html; msgEl.classList.toggle('warn', !!warn); }
function renderMenu() {
  const today = todayNumber(), d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0; // a missed day resets the streak
  const wrap = $('mw-tiers');
  wrap.innerHTML = '';
  TIERS.forEach((t, ti) => {
    const row = document.createElement('div');
    row.className = 'mw-tier'; row.style.setProperty('--g', t.color);
    row.innerHTML = '<div class="mw-tier-name">' + t.name + '<small>' + t.note + '</small></div>';
    const tiles = document.createElement('div');
    tiles.className = 'mw-tier-tiles';
    for (let k = 0; k < 5; k++) {
      const i = ti * 5 + k, unlocked = i === 0 || save.stars[i - 1] > 0; // clearing a level unlocks the next one
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'mw-tile' + (save.stars[i] === 3 ? ' perfect' : '');
      b.disabled = !unlocked; b.title = unlocked ? LEVELS[i][2] + ' mines' + (save.best[i] ? ', best ' + fmt(save.best[i]) : '') : 'Clear level ' + i + ' to unlock';
      b.innerHTML = '<span class="mw-tile-num">' + (i + 1) + '</span><span class="mw-tile-stars">' + [0, 1, 2].map(n => '<span class="' + (n < save.stars[i] ? 'on' : '') + '">\\u2605</span>').join('') + '</span>';
      b.addEventListener('click', () => startLevel(i));
      tiles.appendChild(b);
    }
    row.appendChild(tiles); wrap.appendChild(row);
  });
  $('mw-star-total').textContent = save.stars.reduce((s, v) => s + v, 0);
  $('mw-streak').textContent = d.streak;
  $('mw-record').textContent = 'Record ' + save.wins + ' won, ' + save.losses + ' lost';
  $('mw-daily-title').textContent = 'Daily Board #' + today;
  $('mw-daily-sub').textContent = d.day === today && d.stars > 0 ? 'Cleared today: ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' in ' + fmt(d.time) : '16 x 16, 40 mines, the same board for everyone. Keep your streak!';
}

/* ---------- Playing ---------- */
function tick() {
  if (phase !== 'play' || !timerOn) return;
  const now = performance.now();
  if (document.hidden) { lastTick = now; return; } // the clock stops while the tab is hidden
  elapsed += (now - lastTick) / 1000; lastTick = now;
  $('mw-time').textContent = fmt(elapsed);
}
function startTimer() { if (!timerOn) { timerOn = true; lastTick = performance.now(); } }
function openArea(start, quiet) { // reveal a cell, and flood outwards over empty cells
  const stack = [start], order = [];
  while (stack.length) {
    const i = stack.pop();
    if (rev[i] || flag[i] || mineMap[i]) continue;
    rev[i] = 1; revealed++; order.push(i);
    if (numMap[i] === 0) NB[i].forEach(n => { if (!rev[n]) stack.push(n); });
  }
  const sr = (start / cols) | 0, sc = start % cols;
  order.forEach(i => { const d = Math.max(Math.abs(((i / cols) | 0) - sr), Math.abs((i % cols) - sc)); cellEls[i].style.setProperty('--d', (d * 0.04) + 's'); });
  if (!quiet) { if (order.length > 3) sfx.open(); else sfx.tick(numMap[start]); }
  order.forEach(drawCell);
}
function onCell(i, shift) {
  if (phase !== 'play') return;
  cursor = i;
  startTimer();
  if (flagMode || shift) { toggleFlag(i); return; }
  if (rev[i]) { if (numMap[i] > 0) chord(i); return; }
  if (flag[i]) return;
  revealCell(i);
}
function revealCell(i) {
  if (mineMap[i]) { hitMine(i); return; }
  openArea(i, false);
  afterMove();
}
function chord(i) { // click a number whose flags match it: reveal everything else around it
  if (phase !== 'play' || !rev[i] || numMap[i] <= 0) return;
  let f = 0; NB[i].forEach(n => { if (flag[n] || (rev[n] && mineMap[n])) f++; });
  if (f !== numMap[i]) { setMsg('Chording needs exactly ' + numMap[i] + ' flag' + (numMap[i] > 1 ? 's' : '') + ' around that number (you have ' + f + ').', true); return; }
  startTimer();
  let hit = null, any = false;
  NB[i].forEach(n => { if (!rev[n] && !flag[n]) { any = true; if (mineMap[n]) hit = hit === null ? n : hit; else openArea(n, true); } });
  if (any) sfx.open();
  if (hit !== null) { hitMine(hit); return; }
  afterMove();
}
function toggleFlag(i) {
  if (phase !== 'play' || rev[i]) return;
  startTimer();
  flag[i] = flag[i] ? 0 : 1; flags += flag[i] ? 1 : -1;
  sfx.flag(); drawCell(i); render();
}
function hitMine(i) {
  minesHit++;
  rev[i] = 1; boomed[i] = 1; if (flag[i]) { flag[i] = 0; flags--; }
  sfx.boom();
  panelEl.classList.remove('shake'); void panelEl.offsetWidth; panelEl.classList.add('shake');
  lives--;
  const L = $('mw-lives'); L.classList.remove('hit'); void L.offsetWidth; L.classList.add('hit');
  if (lives > 0) {
    drawCell(i);
    setMsg('<b>Boom!</b> You lost a life. That mine is now marked. ' + lives + ' ' + (lives === 1 ? 'life' : 'lives') + ' left.', true);
    render(); afterMove(); return;
  }
  finish(false);
}
function afterMove() {
  render();
  if (phase === 'play' && revealed >= total - minesN) finish(true); // every safe cell is open
}

/* ---------- Hints that explain themselves ---------- */
function hint() {
  if (phase !== 'play' || hintsLeft <= 0) return;
  startTimer();
  clearHints();
  // 1) a wrong flag is the first thing to point out
  const wrong = []; for (let i = 0; i < total; i++) if (flag[i] && !mineMap[i]) wrong.push(i);
  let text = '', marks = [];
  if (wrong.length) {
    marks = [{ i: wrong[0], cls: 'hintMine' }];
    text = '<b>Hint:</b> your flag at ' + coord(wrong[0]) + ' is wrong, there is no mine there.';
  } else {
    const st = { rev, num: numMap, mine: new Uint8Array(total), safe: new Uint8Array(total) };
    for (let i = 0; i < total; i++) if ((flag[i] && mineMap[i]) || (rev[i] && mineMap[i])) st.mine[i] = 1;
    const steps = findSteps(st);
    const safeSteps = steps.filter(s => s.type === 'safe' && !rev[s.cell]), mineSteps = steps.filter(s => s.type === 'mine' && !flag[s.cell]);
    const s = safeSteps[0] || mineSteps[0];
    if (!s) { setMsg('No sure move found right now. Check that every flag is correct.', true); return; }
    const a = s.clues[0], b = s.clues[1];
    marks = s.clues.map(c => ({ i: c, cls: 'hintClue' })).concat([{ i: s.cell, cls: s.type === 'safe' ? 'hintSafe' : 'hintMine' }]);
    if (s.rule === 'done') text = 'The <b>' + numMap[a] + '</b> at ' + coord(a) + ' already has its ' + (numMap[a] === 1 ? 'mine' : numMap[a] + ' mines') + ' marked, so ' + coord(s.cell) + ' next to it is <b>safe</b>.';
    else if (s.rule === 'all') text = 'The <b>' + numMap[a] + '</b> at ' + coord(a) + ' has exactly ' + s.extra + ' hidden neighbour' + (s.extra > 1 ? 's' : '') + ' left to hold its mines, so ' + coord(s.cell) + ' is a <b>mine</b>. Flag it.';
    else if (s.type === 'safe') text = 'Every hidden cell next to the <b>' + numMap[a] + '</b> at ' + coord(a) + ' is also next to the <b>' + numMap[b] + '</b> at ' + coord(b) + ', and they need the same number of mines, so ' + coord(s.cell) + ' is <b>safe</b>.';
    else text = 'The <b>' + numMap[b] + '</b> at ' + coord(b) + ' needs ' + s.extra + ' more mine' + (s.extra > 1 ? 's' : '') + ' than the <b>' + numMap[a] + '</b> at ' + coord(a) + ', and it has exactly that many extra cells, so ' + coord(s.cell) + ' is a <b>mine</b>. Flag it.';
    text = '<b>Hint:</b> ' + text;
  }
  hintsLeft--; hintsUsed++;
  marks.forEach(m => cellEls[m.i].classList.add(m.cls));
  setMsg(text); sfx.hint(); render();
  const id = runId;
  setTimeout(() => { if (id === runId) clearHints(); }, 4500);
}
function clearHints() { cellEls.forEach(el => el.classList.remove('hintClue', 'hintSafe', 'hintMine')); }

/* ---------- Results ---------- */
function finish(won) {
  if (phase !== 'play') return;
  phase = 'over'; clearHints();
  const t = Math.floor(elapsed);
  // reveal the rest of the board: a wave over the safe cells when you win, the mines when you lose
  if (won) {
    for (let i = 0; i < total; i++) { if (mineMap[i] && !flag[i] && !(rev[i])) { flag[i] = 1; flags++; } }
    for (let i = 0; i < total; i++) { drawCell(i); if (!mineMap[i]) { cellEls[i].style.setProperty('--d', ((((i / cols) | 0) + (i % cols)) * 0.025) + 's'); cellEls[i].classList.add('win'); } }
  } else {
    let k = 0;
    for (let i = 0; i < total; i++) { if (mineMap[i] && !flag[i] && !rev[i]) { const j = i, d = (k++) * 25; setTimeout(() => { rev[j] = 1; drawCell(j); }, d); } } // the mines appear one after another
    for (let i = 0; i < total; i++) drawCell(i);
  }
  render();
  const stars = won ? 1 + (hintsUsed + minesHit === 0 ? 1 : 0) + (t <= spec.par ? 1 : 0) : 0;
  let best = 0;
  if (won) {
    save.wins++;
    if (mode === 'daily') {
      const d = save.daily;
      if (d.day !== dailyNum) { d.day = dailyNum; d.stars = 0; d.time = 0; }
      if (stars > d.stars || (stars === d.stars && (!d.time || t < d.time))) { d.stars = stars; d.time = t; }
      if (d.lastDay !== dailyNum) { d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1; d.lastDay = dailyNum; }
    } else { save.stars[levelIndex] = Math.max(save.stars[levelIndex], stars); save.best[levelIndex] = save.best[levelIndex] ? Math.min(save.best[levelIndex], t) : t; best = save.best[levelIndex]; }
  } else save.losses++;
  persist();
  if (won) { sfx.win(); confetti(); setMsg('<b>Field cleared!</b>'); } else { sfx.lose(); setMsg('<b>Boom!</b> That was a mine.', true); }
  $('mw-result-title').textContent = won ? (stars === 3 ? 'Perfect clear!' : 'Field cleared!') : 'Boom!';
  [...$('mw-result-stars').children].forEach((el, i) => el.classList.toggle('on', i < stars));
  $('mw-result-stars').style.visibility = won ? 'visible' : 'hidden';
  $('mw-result-sub').innerHTML = won
    ? 'Time ' + fmt(t) + (t <= spec.par ? ' (under par ' + fmt(spec.par) + ')' : ' (par ' + fmt(spec.par) + ')') + '<br>Mines hit ' + minesHit + ', hints ' + hintsUsed + (mode === 'daily' ? '<br>Streak ' + save.daily.streak : (best ? '<br>Best time: ' + fmt(best) : ''))
    : 'You stepped on a mine with no lives left. This board can always be solved by logic, so try again: the opening is the same, and a hint will explain a deduction.';
  nextBtn.hidden = mode !== 'level' || !won || levelIndex >= LEVEL_COUNT - 1;
  shareBtn.hidden = mode !== 'daily' || !won; shareBtn.textContent = 'Copy result';
  const id = runId;
  setTimeout(() => { if (id === runId && phase === 'over') resultEl.classList.add('show'); }, won ? 1300 : 1500);
}
function confetti() {
  const colors = ['#38bdf8', '#4ade80', '#fbbf24', '#f87171', '#c084fc', '#f472b6'];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div');
    p.className = 'mw-confetti'; p.style.left = Math.random() * 100 + '%'; p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (1.8 + Math.random() * 1.4) + 's'; p.style.animationDelay = (Math.random() * 0.5) + 's';
    panelEl.appendChild(p); setTimeout(() => p.remove(), 4200);
  }
}

/* ---------- Controls ---------- */
hintBtn.addEventListener('click', () => { hint(); hintBtn.blur(); });
flagBtn.addEventListener('click', () => { flagMode = !flagMode; render(); flagBtn.blur(); });
$('mw-restart').addEventListener('click', restart);
$('mw-levels-btn').addEventListener('click', showMenu);
$('mw-daily').addEventListener('click', startDaily);
$('mw-retry').addEventListener('click', restart);
$('mw-menu-back').addEventListener('click', showMenu);
nextBtn.addEventListener('click', () => startLevel(levelIndex + 1));
shareBtn.addEventListener('click', () => {
  const d = save.daily;
  const text = 'Minesweeper Daily #' + dailyNum + ' ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ' ' + fmt(d.time) + ', streak ' + d.streak;
  const done = () => { shareBtn.textContent = 'Copied!'; };
  try { navigator.clipboard.writeText(text).then(done, () => { shareBtn.textContent = text; }); } catch (e) { shareBtn.textContent = text; }
});
document.addEventListener('visibilitychange', () => { if (document.hidden) tick(); else lastTick = performance.now(); });
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (k === 'Escape' && phase !== 'menu') { showMenu(); return; }
  if (phase !== 'play') return;
  if (/^Arrow/.test(k)) {
    e.preventDefault();
    const cur = cursor < 0 ? startCell : cursor, r = (cur / cols) | 0, c = cur % cols;
    const nr = Math.max(0, Math.min(rows - 1, r + (k === 'ArrowUp' ? -1 : k === 'ArrowDown' ? 1 : 0))), nc = Math.max(0, Math.min(cols - 1, c + (k === 'ArrowLeft' ? -1 : k === 'ArrowRight' ? 1 : 0)));
    const old = cursor; cursor = cursor < 0 ? startCell : nr * cols + nc;
    if (old >= 0) drawCell(old); drawCell(cursor);
  }
  else if ((k === ' ' || k === 'Enter') && cursor >= 0) { e.preventDefault(); onCell(cursor, false); }
  else if ((k === 'f' || k === 'F') && !e.repeat) { if (cursor >= 0 && !rev[cursor]) toggleFlag(cursor); else { flagMode = !flagMode; render(); } }
  else if ((k === 'c' || k === 'C') && cursor >= 0) chord(cursor);
  else if ((k === 'h' || k === 'H') && !e.repeat) hint();
  else if ((k === 'r' || k === 'R') && !e.repeat) restart();
});

/* ---------- Fit the game into the space available ---------- */
const fitEl = $('mw-fit'), wrapEl = $('mw-wrap');
function fitToView() {
  const availW = Math.max(240, window.innerWidth - 28), availH = Math.max(240, window.innerHeight - 24);
  const narrow = availW < 640;
  wrapEl.classList.toggle('mw-narrow', narrow);
  document.body.style.overflow = narrow ? 'auto' : 'hidden';
  document.body.style.alignItems = narrow ? 'flex-start' : 'center';
  if (narrow) { wrapEl.style.transform = 'none'; wrapEl.style.width = Math.min(560, availW) + 'px'; fitEl.style.width = wrapEl.style.width; fitEl.style.height = wrapEl.offsetHeight + 'px'; return; }
  wrapEl.style.transform = 'none'; wrapEl.style.width = '900px';
  const natH = wrapEl.offsetHeight || 1, k = Math.max(0.4, Math.min(1, availW / 900, availH / natH));
  wrapEl.style.transform = k < 1 ? 'scale(' + k + ')' : 'none';
  fitEl.style.width = Math.round(900 * k) + 'px'; fitEl.style.height = Math.round(natH * k) + 'px';
}
window.addEventListener('resize', fitToView);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitToView).observe(wrapEl);

startLevel(0);
showMenu();
fitToView();`,

  seo: {
    title: 'Minesweeper Game with 20 Levels, No-Guess Boards & Hints',
    description: 'Free Minesweeper in plain JS: 20 levels, boards you can always solve by logic, hints that explain, chording, lives, a daily board and best times. No libraries.',
    about: {
      title: 'Minesweeper — 20 Levels, Boards Solvable Without Guessing, Hints That Explain, Chording and a Daily Board',
      description: `Minesweeper is a logic puzzle: numbers tell you how many mines touch a cell, and you clear the field using deduction alone. This version is a complete game rather than a demo. It has 20 levels in four tiers, a Daily Board with a streak, boards that can always be solved without guessing, hints that explain the deduction in words, chording, extra lives on the easier levels, stars and best times. It is plain HTML, CSS and JavaScript with no libraries, images or audio files.

**Boards that never force a guess**

The classic frustration in Minesweeper is a 50/50 guess at the end of a long game. \`generateBoard()\` removes it. It picks a start cell, places the mines away from that cell and its neighbours, and then runs the logic solver on the finished board. Only boards that the solver can clear completely from the opening are kept, otherwise another seed is tried. The opening is revealed when the level starts, so a first-click guess is not needed either. A seeded random generator (\`mulberry32\`) means a level is the same board for every player.

**The solver is the hint system too**

\`findSteps()\` applies two rules to every revealed number. If a number already has all its mines marked, its other hidden neighbours are safe. If it has exactly as many hidden neighbours as mines left, they are all mines. When neither applies, the subset rule compares two numbers: if the hidden neighbours of one number are all neighbours of another, subtracting them settles the difference. The Hint button runs the same function on your current board and explains the result in words, for example "Every hidden cell next to the 1 at C3 is also next to the 2 at D3, and they need the same number of mines, so E3 is safe." It highlights the clue numbers in amber and the target cell in green (safe) or red (mine). If you have placed a wrong flag, the hint points that out first.

**Controls for mouse, keyboard and touch**

Left-click reveals, right-click flags, and clicking a revealed number does a chord: if the number of flags around it matches, every other neighbour is revealed at once, which is the fastest way to play. A press-and-hold flags on a touch screen, and a Flag mode button is there too. The keyboard works as well: arrow keys move a cursor, Space or Enter reveals, F flags, C chords, H hints and R restarts.

**Lives, stars and the daily board**

The first levels give three lives and later ones two or one: stepping on a mine costs a life, marks that mine and lets you carry on. Winning earns one star, a second star for a clean run with no mines hit and no hints, and a third for finishing under the par time. Clearing a level unlocks the next, and best times are saved. The Daily Board is a seeded 16 by 16 board with 40 mines, the same for everyone, and clearing it on consecutive days builds a streak.

**Feel and scaling**

Flood fills ripple outwards from the clicked cell, explosions shake the panel and flash the cell, a wave sweeps across the board when you win, and the sounds (clicks, flags, an explosion made of filtered noise and a win jingle) come from a Web Audio synth. Flags and mines are drawn as inline SVG, so they look the same everywhere. Progress, best times and the streak are saved to \`localStorage\` inside try/catch, and the whole game scales to short preview areas, from an 8 by 8 board up to 26 by 15.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a level or the Daily Board', text: 'The menu shows 20 levels in four tiers, from 8 by 8 with three lives to 26 by 15 with one life. Level 1 is open at first and each cleared level unlocks the next. The gold card starts the Daily Board, the same for everyone.' },
        { title: 'Start from the opening', text: 'Every board starts with an opening already revealed, so you never have to guess. Read the numbers: a number is how many of the 8 cells around it contain a mine.' },
        { title: 'Reveal and flag', text: 'Click a cell to reveal it. Right-click it, or press and hold on a touch screen, to flag a suspected mine. The Flag mode button (or F) switches the click to flagging. The counter shows the mines left minus your flags.' },
        { title: 'Chord to go faster', text: 'Click a revealed number when you have flagged exactly that many mines around it, and every other neighbour opens at once. A wrong flag will make you hit a mine, so be sure.' },
        { title: 'Ask for a hint when stuck', text: 'The Hint button (H) finds a deduction that is certain and explains it, highlighting the numbers it used and the cell it settles. You get three hints per game and using one costs the clean-run star.' },
        { title: 'Earn stars', text: 'One star for clearing the board, a second for no mines hit and no hints, a third for finishing under the par time. A mine costs a life, and on the later levels one mine ends the game.' },
      ],
    },
    features: [
      '20 levels in four tiers from 8x8 to 26x15, defined as data with columns, rows, mines and lives',
      'Boards generated so that logic alone solves them from a revealed opening: no 50/50 guesses, ever',
      'Seeded generator: every level and the Daily Board are the same for all players',
      'Solver with the single-number rules and the subset rule, shared by the generator and the hint system',
      'Hints that explain the deduction in words, highlight the clue numbers and the target cell, and flag wrong flags first',
      'Chording (click a satisfied number), flag mode, press-and-hold flagging for touch and full keyboard control',
      'Extra lives on the early levels: a mine costs a life, is marked, and play continues',
      'Stars for clearing, for a clean run and for beating par, plus best times and a daily streak saved to localStorage inside try/catch',
      'Flood-fill ripple, explosion with screen shake, win wave, confetti and Web Audio sounds, with flags and mines drawn as SVG',
      'Scales to its preview area (down to 40 percent) and stacks on phones',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching constraint solving with a real example', desc: 'The two rules in findSteps() are a compact introduction to constraint propagation. The subset rule shows how combining two constraints reveals something neither says alone, an idea that carries over to Sudoku, Kakuro and many scheduling problems.' },
      { icon: 'CODE', title: 'Generating puzzles that are fair by construction', desc: 'Generating a board and keeping it only if a solver can finish it is a simple pattern that guarantees fairness. The same approach works for any puzzle where you can write a solver.' },
      { icon: 'APP', title: 'A classic with a reason to return', desc: 'Levels, stars, best times and a daily board with a streak turn Minesweeper into something players come back to, and everything is saved in the browser with no account.' },
      { icon: 'DESIGN', title: 'Input handling for mouse, touch and keyboard', desc: 'Right-click, middle-click, shift-click, press-and-hold and arrow keys all map to the same few functions, which is a useful pattern for any grid game that has to work on desktop and phones.' },
      { icon: 'FLOW', title: 'Explaining an algorithm to the user', desc: 'Turning a solver result into a sentence with highlighted cells is a good model for any hint or tutorial feature: the explanation comes from the same code that makes the decision.' },
      { icon: 'CODE', title: 'Related: Pixel Platformer Game', desc: 'See the [Pixel Platformer Game](/ui-snippets/pixel-platformer-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Mini Sudoku Puzzle (6x6)', desc: 'See the [Mini Sudoku Puzzle](/ui-snippets/mini-sudoku-game/) for another logic puzzle with a generator, a solver and explained hints.' },
    ],
    faqs: [
      { q: 'How do you guarantee a board can be solved without guessing?', a: 'generateBoard() places mines at random away from a chosen start cell, then plays the whole board with the solver. isLogicSolvable() reveals the opening, then repeatedly applies findSteps(): flag the certain mines, reveal the certain safe cells and repeat. If every safe cell gets revealed this way, the board is kept. If the solver gets stuck, the board is thrown away and the next seed is tried, up to 400 times.' },
      { q: 'What do the hints actually do?', a: 'They run the same solver on your current board. Mines you have flagged correctly count as known, wrong flags are ignored and pointed out first. The first certain step is explained in a sentence, the clue numbers are highlighted in amber and the target cell in green (safe) or red (mine). A hint costs the clean-run star, and you get three per game.' },
      { q: 'What is chording?', a: 'Clicking a revealed number whose count equals the number of flags around it. The game reveals every other hidden neighbour at once. It is much faster than clicking each cell, but if one of your flags is wrong you will hit a mine, which is why the Flag mode and hints exist.' },
      { q: 'How do lives and stars work?', a: 'The early levels have three lives, then two, then one. A mine costs a life, shows the mine and lets you continue. A level gives one star for clearing it, a second if you hit no mine and used no hint, and a third if you finish under the par time (a function of the board size and the number of mines). The next level unlocks when the previous one has a star.' },
      { q: 'How do I change the levels or board sizes?', a: 'Edit the LEVELS array: each row is columns, rows, mines and lives. Keep mines below about 22 percent of the cells, because very dense boards are rarely solvable by logic alone and the generator then needs many attempts. The cell size adapts to the board, and the menu shows five levels per tier.' },
      { q: 'Does it work in a sandboxed iframe and on phones?', a: 'Yes. All localStorage access is in try/catch, so a blocked storage only means progress is not saved, and every sound call is wrapped. Press and hold flags on a touch screen, and Flag mode is a button. On narrow screens the layout stacks and the page scrolls.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how findSteps() applies the single-number and subset rules, how isLogicSolvable() simulates a full game with the solver, and how hint() turns a deduction into a sentence. It is also a good base to extend: ask for a stronger solver that can use the total mine count or enumerate small groups of cells, a "probability" overlay that shows the chance of a mine for each hidden cell, a custom board size picker, a replay of your game, or a mode where boards need a guess so it can be compared with the no-guess ones. You can also ask it to review the press-and-hold logic against the right-click handler for double toggles.`,
      prompt: `Build a Minesweeper game with levels in plain HTML, CSS and JavaScript, with no libraries, images or audio files.

Requirements:
- A grid of buttons built once per level with CSS grid, sized to fit (8x8 up to 26x15), raised unrevealed cells and flat revealed cells, coloured numbers 1 to 8, flags and mines drawn as inline SVG. A mine counter (mines minus flags), a timer that starts on the first action, and lives shown as hearts.
- Controls: left-click reveals (flood fill over zero cells), right-click flags, click a revealed number to chord (reveal all other neighbours when the flag count matches), middle-click or shift-click helpers, press-and-hold (about 400 ms) to flag on touch, a Flag mode button, and keyboard play (arrows, Space/Enter, F, C, H, R, Esc).
- Boards that never need a guess: generate mines with a seeded random generator (mulberry32) away from a start cell and its neighbours, then run a logic solver on the finished board and keep the board only if the solver can clear all safe cells from the revealed opening (up to a few hundred attempts). The opening is revealed when the level starts.
- The solver (findSteps) works on revealed numbers: a number with all mines known makes its other hidden neighbours safe, a number with as many hidden neighbours as mines left makes them all mines, and a subset rule subtracts one number's hidden neighbours from another's. Use the same function for hints.
- Hints (3 per game): highlight the clue numbers in amber and the target cell in green (safe) or red (mine) and explain the deduction in a sentence; if the player has a wrong flag, point it out first.
- 20 levels in 4 tiers defined as data (columns, rows, mines, lives). A mine costs a life, is shown and play continues until lives run out, then the mines are revealed and wrong flags are crossed out. Stars: 1 for clearing, +1 for no mines hit and no hints, +1 for finishing under a par time. A level unlocks when the previous one has a star. Save stars, best times and the daily result to localStorage inside try/catch.
- A Daily Board (16x16, 40 mines) seeded from the date with a day streak and a copy result button.
- Feel: a ripple on flood fills, an explosion animation with panel shake, a win wave and confetti, Web Audio synth sounds (including noise for explosions) with a mute button, and a result screen with stars.
- Scale the whole game to fit the available area (down to 40 percent) and stack the layout on narrow screens.`,
    },
  },
};

export default minesweeperGame;
