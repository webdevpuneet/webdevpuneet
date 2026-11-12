const tileMerge2048Game = {
  id: 'tile-merge-2048-game',
  title: 'Tile Merge 2048 Puzzle',
  lastmod: '2026-11-11',
  category: 'games',
  html: `<div class="tm-fit" id="tm-fit"><div class="tm-wrap" id="tm-wrap">
  <div class="tm-panel" id="tm-panel">
    <div class="tm-hud">
      <div class="tm-hud-left">
        <span class="tm-kicker" id="tm-kicker">2048</span>
        <span class="tm-name" id="tm-name">Pick a level</span>
      </div>
      <div class="tm-score"><span class="tm-label">Score</span><b id="tm-score">0</b></div>
      <div class="tm-score"><span class="tm-label">Best</span><b id="tm-best">0</b></div>
      <div class="tm-hud-btns">
        <button class="tm-btn-sm" id="tm-levels-btn" type="button" title="Levels (Esc)">Levels</button>
        <button class="tm-btn-sm" id="tm-mute" type="button" aria-pressed="false">Sound on</button>
      </div>
    </div>

    <div class="tm-main">
      <div class="tm-board-col">
        <div class="tm-board" id="tm-board"><div class="tm-cells" id="tm-cells"></div><div class="tm-tiles" id="tm-tiles"></div><div class="tm-floats" id="tm-floats"></div><div class="tm-banner" id="tm-banner"></div></div>
      </div>
      <aside class="tm-side">
        <div class="tm-goal" id="tm-goal">
          <span class="tm-label">Goal</span>
          <b id="tm-goal-text">Reach 2048</b>
          <div class="tm-bar"><div class="tm-bar-fill" id="tm-bar"></div></div>
          <span class="tm-goal-sub" id="tm-goal-sub"></span>
        </div>
        <div class="tm-stats">
          <div><span class="tm-label">Moves</span><b id="tm-moves">0</b></div>
          <div><span class="tm-label">Highest tile</span><b id="tm-max">2</b></div>
          <div><span class="tm-label">Par</span><b id="tm-par">-</b></div>
        </div>
        <div class="tm-tools">
          <button class="tm-tool" id="tm-undo" type="button"><span class="tm-tool-ico">&#8630;</span>Undo <i id="tm-undo-count">3</i><em>U</em></button>
          <button class="tm-tool" id="tm-hammer" type="button" aria-pressed="false"><span class="tm-tool-ico">&#128296;</span>Smash <i id="tm-hammer-count">1</i><em>H</em></button>
        </div>
        <p class="tm-msg" id="tm-msg"></p>
        <p class="tm-keys">Arrow keys or WASD to slide. On a touch screen, swipe on the board.</p>
      </aside>
    </div>

    <div class="tm-overlay show" id="tm-menu">
      <p class="tm-logo">2048</p>
      <p class="tm-tagline">Slide the tiles, merge equal numbers and chase the goal of each level. Boards get bigger, stones get in the way, and the goals get harder.</p>
      <div class="tm-menu-row">
        <button class="tm-daily" id="tm-daily" type="button">
          <span class="tm-daily-title" id="tm-daily-title">Daily Game</span>
          <span class="tm-daily-sub" id="tm-daily-sub">The same tiles for everyone</span>
        </button>
        <button class="tm-daily tm-classic" id="tm-classic" type="button">
          <span class="tm-daily-title">Classic 2048</span>
          <span class="tm-daily-sub" id="tm-classic-sub">Endless, chase your best score</span>
        </button>
        <div class="tm-totals"><span><b id="tm-star-total">0</b> / 60 stars</span><span>Daily streak <b id="tm-streak">0</b></span><span id="tm-record"></span></div>
      </div>
      <div class="tm-tiers" id="tm-tiers"></div>
    </div>

    <div class="tm-overlay" id="tm-result">
      <p class="tm-result-title" id="tm-result-title">Level cleared!</p>
      <div class="tm-result-stars" id="tm-result-stars"><span>&#9733;</span><span>&#9733;</span><span>&#9733;</span></div>
      <p class="tm-result-sub" id="tm-result-sub"></p>
      <div class="tm-result-btns">
        <button class="tm-btn" id="tm-next" type="button">Next level</button>
        <button class="tm-btn tm-btn-ghost" id="tm-retry" type="button">Play again</button>
        <button class="tm-btn tm-btn-ghost" id="tm-share" type="button">Copy result</button>
        <button class="tm-btn tm-btn-ghost" id="tm-menu-back" type="button">Levels</button>
      </div>
    </div>
  </div>
</div></div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif; color: #e2e8f0;
  background: radial-gradient(ellipse at top, #2a1d4d 0%, #0d0a24 60%, #06051a 100%);
  min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 12px 14px; overflow: hidden;
}
/* The game scales itself to the space it is given (fitToView): .tm-fit takes the scaled size, .tm-wrap is laid out at its
   natural size and then shrunk with transform. */
.tm-fit { flex: none; }
.tm-wrap { width: 880px; transform-origin: top left; }
.tm-panel {
  position: relative; display: flex; flex-direction: column; gap: 12px; padding: 16px; border-radius: 20px; overflow: hidden; min-height: 600px;
  background: linear-gradient(180deg, rgba(36,26,80,0.74), rgba(11,9,32,0.95));
  border: 1px solid rgba(167,139,250,0.18); box-shadow: 0 30px 80px rgba(0,0,0,0.55), 0 0 90px rgba(245,158,11,0.1);
}

.tm-hud { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; }
.tm-hud-left { display: flex; flex-direction: column; line-height: 1.15; margin-right: auto; min-width: 0; }
.tm-kicker { font-size: 10px; font-weight: 800; letter-spacing: 0.09em; text-transform: uppercase; color: #fbbf24; }
.tm-name { font-size: 17px; font-weight: 800; color: #f8fafc; white-space: nowrap; }
.tm-score { display: flex; flex-direction: column; align-items: center; min-width: 84px; padding: 5px 12px; border-radius: 10px; background: rgba(255,255,255,0.06); line-height: 1.15; }
.tm-score b { font-size: 20px; font-weight: 800; color: #fff; font-variant-numeric: tabular-nums; }
.tm-label { font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #8b93b8; }
.tm-hud-btns { display: flex; gap: 5px; }
.tm-btn-sm { background: rgba(255,255,255,0.06); color: #cbd5e1; border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 6px 10px; font: inherit; font-size: 11px; font-weight: 700; cursor: pointer; }
.tm-btn-sm:hover { background: rgba(255,255,255,0.14); }

.tm-main { display: flex; gap: 26px; align-items: center; justify-content: center; flex: 1; }
.tm-board-col { flex: none; width: 520px; }
.tm-board { position: relative; width: 520px; height: 520px; border-radius: 16px; background: #1a1538; box-shadow: inset 0 0 0 2px rgba(167,139,250,0.2), 0 10px 30px rgba(0,0,0,0.4); touch-action: none; user-select: none; -webkit-user-select: none; overflow: hidden; }
.tm-board.hammer { cursor: crosshair; box-shadow: inset 0 0 0 3px #f87171, 0 0 24px rgba(248,113,113,0.5); }
.tm-board.shake { animation: tm-shake 0.18s ease; }
@keyframes tm-shake { 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
.tm-cells, .tm-tiles, .tm-floats { position: absolute; inset: 0; }
.tm-cell { position: absolute; border-radius: 10px; background: rgba(255,255,255,0.05); }
.tm-cell.stone { background: repeating-linear-gradient(135deg, #2b3350 0 6px, #232a45 6px 12px); box-shadow: inset 0 0 0 2px #46507a; }
.tm-tiles { pointer-events: none; }
.tm-tile {
  position: absolute; left: 0; top: 0; display: flex; align-items: center; justify-content: center; border-radius: 10px; font-weight: 900; color: #f8fafc;
  transition: transform 0.12s ease-in-out; will-change: transform; box-shadow: 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.22);
}
.tm-tile span { display: block; transition: transform 0.1s; }
.tm-tile.spawn span { animation: tm-spawn 0.2s ease-out 0.1s backwards; }
.tm-tile.merge span { animation: tm-merge 0.2s ease-out; }
@keyframes tm-spawn { from { transform: scale(0); } to { transform: scale(1); } }
@keyframes tm-merge { 0% { transform: scale(1); } 45% { transform: scale(1.28); } 100% { transform: scale(1); } }
.tm-tile.gone { opacity: 0; transition: transform 0.12s ease-in-out, opacity 0.12s; }
.t2 { background: #34406a; } .t4 { background: #3f5088; }
.t8 { background: #e8833a; } .t16 { background: #ee6a3a; } .t32 { background: #f04f3b; } .t64 { background: #e1352d; }
.t128 { background: #e8b43b; box-shadow: 0 0 16px rgba(232,180,59,0.45), 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.3); }
.t256 { background: #e8a92a; box-shadow: 0 0 18px rgba(232,169,42,0.55), 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.3); }
.t512 { background: #dc9a1c; box-shadow: 0 0 22px rgba(220,154,28,0.65), 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.3); }
.t1024 { background: #35b777; box-shadow: 0 0 24px rgba(53,183,119,0.7), 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.3); }
.t2048 { background: linear-gradient(135deg, #38bdf8, #6366f1); box-shadow: 0 0 30px rgba(99,102,241,0.9), 0 3px 0 rgba(0,0,0,0.28), inset 0 2px 0 rgba(255,255,255,0.35); }
.t4096 { background: linear-gradient(135deg, #a855f7, #ec4899); box-shadow: 0 0 32px rgba(236,72,153,0.9), 0 3px 0 rgba(0,0,0,0.28); }
.t-super { background: linear-gradient(135deg, #111827, #312e81); color: #fde047; box-shadow: 0 0 34px rgba(253,224,71,0.8); }
.tm-float { position: absolute; font-weight: 900; font-size: 22px; color: #fde68a; text-shadow: 0 0 10px rgba(251,191,36,0.9), 0 2px 4px rgba(0,0,0,0.6); pointer-events: none; animation: tm-float 0.9s ease-out forwards; z-index: 6; }
@keyframes tm-float { to { transform: translateY(-48px); opacity: 0; } }
.tm-spark { position: absolute; width: 6px; height: 6px; border-radius: 50%; pointer-events: none; animation: tm-spark 0.6s ease-out forwards; z-index: 5; }
@keyframes tm-spark { to { transform: translate(var(--dx), var(--dy)) scale(0.2); opacity: 0; } }
.tm-banner { position: absolute; left: 0; right: 0; top: 12px; text-align: center; font-size: 16px; font-weight: 900; color: #422006; background: #fbbf24; padding: 7px 14px; margin: 0 40px; border-radius: 10px; opacity: 0; transform: translateY(-10px); transition: opacity 0.25s, transform 0.25s; pointer-events: none; z-index: 8; box-shadow: 0 0 24px rgba(251,191,36,0.6); }
.tm-banner.show { opacity: 1; transform: translateY(0); }

.tm-side { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 10px; }
.tm-goal { padding: 12px 14px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); display: flex; flex-direction: column; gap: 5px; }
.tm-goal b { font-size: 20px; font-weight: 900; color: #fde68a; }
.tm-bar { height: 8px; border-radius: 6px; background: rgba(255,255,255,0.08); overflow: hidden; }
.tm-bar-fill { height: 100%; width: 0; border-radius: 6px; background: linear-gradient(90deg, #6366f1, #f472b6, #fbbf24); transition: width 0.25s; }
.tm-goal-sub { font-size: 11px; color: #94a3b8; }
.tm-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.tm-stats div { display: flex; flex-direction: column; align-items: center; padding: 8px 4px; border-radius: 10px; background: rgba(255,255,255,0.04); line-height: 1.15; }
.tm-stats b { font-size: 18px; font-weight: 800; font-variant-numeric: tabular-nums; }
.tm-tools { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.tm-tool { display: flex; align-items: center; justify-content: center; gap: 6px; padding: 9px 0; border-radius: 12px; cursor: pointer; font: inherit; font-size: 12px; font-weight: 800; color: #cbd5e1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.09); transition: background 0.12s, border-color 0.12s; }
.tm-tool:hover:not(:disabled) { background: rgba(255,255,255,0.1); border-color: rgba(251,191,36,0.55); }
.tm-tool:disabled { opacity: 0.35; cursor: not-allowed; }
.tm-tool[aria-pressed="true"] { background: #b91c1c; border-color: #f87171; color: #fff; }
.tm-tool-ico { font-size: 15px; line-height: 1; }
.tm-tool em { font-style: normal; font-size: 9px; color: #64748b; }
.tm-tool i { font-style: normal; font-size: 10px; background: #7c3aed; color: #fff; border-radius: 8px; padding: 0 6px; }
.tm-msg { min-height: 48px; font-size: 13px; line-height: 1.5; color: #94a3b8; }
.tm-msg b { color: #fbbf24; }
.tm-msg.warn { color: #fca5a5; }
.tm-keys { font-size: 11px; color: #64748b; line-height: 1.5; }

.tm-overlay { position: absolute; inset: 0; z-index: 30; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 18px; text-align: center; overflow-y: auto; background: radial-gradient(ellipse at center, rgba(11,9,32,0.965), rgba(5,4,20,0.985)); opacity: 0; pointer-events: none; transition: opacity 0.25s; }
.tm-overlay.show { opacity: 1; pointer-events: auto; }
.tm-logo { font-size: 56px; font-weight: 900; letter-spacing: -0.02em; line-height: 1.05; background: linear-gradient(90deg, #f59e0b, #ef4444, #a855f7, #38bdf8); -webkit-background-clip: text; background-clip: text; color: transparent; }
.tm-tagline { font-size: 13px; color: #94a3b8; max-width: 540px; line-height: 1.5; }
.tm-menu-row { display: flex; align-items: center; justify-content: center; gap: 14px; flex-wrap: wrap; }
.tm-daily { display: flex; flex-direction: column; align-items: flex-start; gap: 2px; padding: 10px 18px; border-radius: 12px; cursor: pointer; font: inherit; text-align: left; color: #fef3c7; border: 1px solid rgba(250,204,21,0.45); background: linear-gradient(135deg, rgba(250,204,21,0.18), rgba(251,146,60,0.1)); transition: transform 0.15s, box-shadow 0.15s; }
.tm-daily:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(250,204,21,0.2); }
.tm-classic { color: #ede9fe; border-color: rgba(167,139,250,0.5); background: linear-gradient(135deg, rgba(167,139,250,0.18), rgba(124,58,237,0.1)); }
.tm-classic .tm-daily-sub { color: #c4b5fd; }
.tm-daily-title { font-size: 14px; font-weight: 800; }
.tm-daily-sub { font-size: 11px; color: #fcd34d; max-width: 200px; }
.tm-totals { display: flex; flex-direction: column; gap: 3px; font-size: 12px; color: #94a3b8; text-align: left; }
.tm-totals b { color: #f8fafc; }
.tm-tiers { display: flex; flex-direction: column; gap: 8px; width: 100%; max-width: 760px; }
.tm-tier { display: grid; grid-template-columns: 150px 1fr; align-items: center; gap: 12px; }
.tm-tier-name { font-size: 12px; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: var(--g); text-align: left; line-height: 1.2; }
.tm-tier-name small { display: block; font-size: 10px; font-weight: 600; color: #6b7399; text-transform: none; letter-spacing: 0; }
.tm-tier-tiles { display: grid; grid-template-columns: repeat(5, 1fr); gap: 6px; }
.tm-tile-btn { position: relative; height: 52px; border-radius: 10px; cursor: pointer; font: inherit; color: #e2e8f0; border: 1px solid rgba(148,163,184,0.22); background: rgba(255,255,255,0.04); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 1px; transition: transform 0.12s, border-color 0.12s; }
.tm-tile-btn:hover:not(:disabled) { transform: translateY(-2px); border-color: var(--g); }
.tm-tile-btn::after { content: ''; position: absolute; left: 10px; right: 10px; bottom: 4px; height: 2px; border-radius: 2px; background: var(--g); opacity: 0.7; }
.tm-tile-num { font-size: 14px; font-weight: 800; }
.tm-tile-num small { display: block; font-size: 9px; font-weight: 600; color: #94a3b8; line-height: 1.1; }
.tm-tile-stars { font-size: 9px; letter-spacing: 1px; color: #334155; }
.tm-tile-stars .on { color: #facc15; }
.tm-tile-btn:disabled { opacity: 0.32; cursor: not-allowed; }
.tm-tile-btn.perfect { border-color: rgba(250,204,21,0.55); box-shadow: inset 0 0 12px rgba(250,204,21,0.15); }

.tm-result-title { font-size: 38px; font-weight: 900; color: #f8fafc; }
.tm-result-stars { display: flex; gap: 10px; font-size: 52px; line-height: 1; }
.tm-result-stars span { color: #1e293b; transform: scale(0.4); opacity: 0; }
.tm-result-stars span.on { color: #facc15; text-shadow: 0 0 22px rgba(250,204,21,0.75); }
.tm-overlay.show .tm-result-stars span { animation: tm-star 0.45s cubic-bezier(0.2, 1.6, 0.4, 1) forwards; }
.tm-overlay.show .tm-result-stars span:nth-child(2) { animation-delay: 0.18s; }
.tm-overlay.show .tm-result-stars span:nth-child(3) { animation-delay: 0.36s; }
@keyframes tm-star { to { transform: scale(1); opacity: 1; } }
.tm-result-sub { font-size: 14px; color: #94a3b8; line-height: 1.7; max-width: 480px; }
.tm-result-btns { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.tm-btn { padding: 10px 18px; border: none; border-radius: 10px; cursor: pointer; font: inherit; font-size: 14px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #f59e0b, #ef4444); box-shadow: 0 6px 18px rgba(239,68,68,0.35); transition: transform 0.12s; }
.tm-btn:hover { transform: translateY(-1px); }
.tm-btn-ghost { background: rgba(255,255,255,0.06); box-shadow: none; border: 1px solid rgba(255,255,255,0.12); color: #cbd5e1; }
.tm-btn[hidden] { display: none; }
.tm-confetti { position: absolute; top: -12px; width: 8px; height: 14px; border-radius: 2px; z-index: 40; pointer-events: none; animation: tm-fall linear forwards; }
@keyframes tm-fall { to { transform: translate(var(--dx), 720px) rotate(var(--rot)); opacity: 0.9; } }

.tm-narrow .tm-main { flex-direction: column; }
.tm-narrow .tm-board-col { width: 100%; }
.tm-narrow .tm-side { width: 100%; }
.tm-narrow .tm-tier { grid-template-columns: 1fr; gap: 4px; }
.tm-narrow .tm-logo { font-size: 42px; }`,

  js: `const SAVE_KEY = 'tile-merge-2048-save-v1';
const DAY0 = Date.UTC(2026, 10, 11); // Daily Game #1
const BOARD_PX = 520, GAP = 10;
const TIERS = [
  { name: 'Warm-up',    note: '4x4, reach the target',     color: '#4ade80' },
  { name: 'Big boards', note: '5x5, more room, bigger goals', color: '#60a5fa' },
  { name: 'Stones',     note: '4x4 with blocks in the way', color: '#c084fc' },
  { name: 'Master',     note: 'tiny 3x3 boards and 4096', color: '#fb923c' },
];
// n: board size, kind 'tile' (reach a tile) or 'score' (reach a score within a limit of moves), stones: fixed blocks that never move
const LEVELS = [
  { n: 4, kind: 'tile', target: 64, stones: 0 }, { n: 4, kind: 'tile', target: 128, stones: 0 }, { n: 4, kind: 'tile', target: 256, stones: 0 },
  { n: 4, kind: 'score', target: 2500, limit: 160, stones: 0 }, { n: 4, kind: 'tile', target: 512, stones: 0 },
  { n: 5, kind: 'tile', target: 256, stones: 0 }, { n: 5, kind: 'tile', target: 512, stones: 0 }, { n: 5, kind: 'tile', target: 1024, stones: 0 },
  { n: 5, kind: 'score', target: 9000, limit: 330, stones: 0 }, { n: 5, kind: 'tile', target: 2048, stones: 0 },
  { n: 4, kind: 'tile', target: 128, stones: 1 }, { n: 4, kind: 'tile', target: 256, stones: 2 }, { n: 4, kind: 'tile', target: 512, stones: 2 },
  { n: 4, kind: 'tile', target: 256, stones: 3 }, { n: 4, kind: 'tile', target: 512, stones: 3 },
  { n: 3, kind: 'tile', target: 32, stones: 0 }, { n: 3, kind: 'tile', target: 64, stones: 0 }, { n: 4, kind: 'tile', target: 1024, stones: 0 },
  { n: 4, kind: 'tile', target: 2048, stones: 0 }, { n: 4, kind: 'tile', target: 4096, stones: 0 },
];
const LEVEL_COUNT = LEVELS.length;
const parOf = L => L.kind === 'score' ? Math.ceil(L.limit * 0.85) : Math.ceil(L.target / 2.2 * 1.3); // moves for the speed star
const FLOOR = { 2048: 'Reach 2048', 1024: 'Reach 1024', 512: 'Reach 512' };

const $ = id => document.getElementById(id);
const boardEl = $('tm-board'), cellsEl = $('tm-cells'), tilesEl = $('tm-tiles'), floatsEl = $('tm-floats'), bannerEl = $('tm-banner'), panelEl = $('tm-panel');
const menuEl = $('tm-menu'), resultEl = $('tm-result'), msgEl = $('tm-msg'), undoBtn = $('tm-undo'), hammerBtn = $('tm-hammer');
const nextBtn = $('tm-next'), shareBtn = $('tm-share'), muteBtn = $('tm-mute');

/* ---------- Saved progress (localStorage can throw in sandboxed iframes, so every access is guarded) ---------- */
function freshSave() {
  return { stars: Array(LEVEL_COUNT).fill(0), best: 0, games: 0, wins: 0, daily: { day: 0, stars: 0, score: 0, max: 0, streak: 0, lastDay: 0 } };
}
function loadSave() {
  const f = freshSave();
  try {
    const s = JSON.parse(localStorage.getItem(SAVE_KEY) || 'null');
    if (s && Array.isArray(s.stars)) {
      f.stars = f.stars.map((_, i) => s.stars[i] || 0); f.best = s.best || 0; f.games = s.games || 0; f.wins = s.wins || 0; Object.assign(f.daily, s.daily || {});
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
const sfx = {
  slide() { tone(220, 0.07, 'sine', 0.03, 160); },
  merge(v) { const f = 330 * Math.pow(1.06, Math.log2(v) * 2); tone(f, 0.12, 'triangle', 0.06); tone(f * 1.5, 0.1, 'triangle', 0.04, null, 0.05); },
  smash() { tone(140, 0.2, 'sawtooth', 0.07, 60); },
  bad() { tone(150, 0.12, 'square', 0.03, 110); },
  win() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.22, 'triangle', 0.07, null, i * 0.12)); },
  lose() { tone(330, 0.3, 'sawtooth', 0.05, 160); tone(220, 0.45, 'sawtooth', 0.05, 110, 0.25); },
};
muteBtn.addEventListener('click', () => {
  muted = !muted;
  muteBtn.textContent = muted ? 'Sound off' : 'Sound on';
  muteBtn.setAttribute('aria-pressed', String(muted));
});

/* ---------- Game logic: a grid of null, a stone ('S') or a tile { id, value } ---------- */
const DIRS = { left: [0, -1], right: [0, 1], up: [-1, 0], down: [1, 0] };
const isTile = x => x && x !== 'S';
function lineOf(n, dir, k) { // the cells of one row or column, starting at the side the tiles slide towards
  const out = [];
  for (let i = 0; i < n; i++) {
    if (dir === 'left') out.push([k, i]); else if (dir === 'right') out.push([k, n - 1 - i]);
    else if (dir === 'up') out.push([i, k]); else out.push([n - 1 - i, k]);
  }
  return out;
}
// Slides every tile as far as it will go and merges equal neighbours once per move. A stone splits a line into separate segments.
function slide(grid, n, dir) {
  const next = grid.map(row => row.map(c => (c === 'S' ? 'S' : null)));
  const moves = [], merges = []; let gained = 0, moved = false;
  for (let k = 0; k < n; k++) {
    const cells = lineOf(n, dir, k);
    let start = 0;
    const flush = end => { // segment cells[start..end)
      const seg = cells.slice(start, end), placed = [];
      seg.forEach(([r, c]) => {
        const t = grid[r][c]; if (!isTile(t)) return;
        const last = placed[placed.length - 1];
        if (last && !last.merged && last.tile.value === t.value) { last.merged = true; last.absorbed = t; gained += t.value * 2; }
        else placed.push({ tile: t, from: [r, c], merged: false, absorbed: null });
      });
      placed.forEach((p, j) => {
        const to = seg[j], nt = { id: p.tile.id, value: p.merged ? p.tile.value * 2 : p.tile.value };
        next[to[0]][to[1]] = nt;
        moves.push({ id: p.tile.id, from: p.from, to, absorbedId: p.absorbed ? p.absorbed.id : null, absorbedFrom: p.absorbed ? grid.__from : null });
        if (p.merged) merges.push({ id: p.tile.id, value: nt.value, to, absorbed: p.absorbed });
        if (p.from[0] !== to[0] || p.from[1] !== to[1] || p.merged) moved = true;
      });
    };
    for (let i = 0; i < n; i++) { const [r, c] = cells[i]; if (grid[r][c] === 'S') { flush(i); start = i + 1; } }
    flush(n);
  }
  return { next, moves, merges, gained, moved };
}
function canMove(grid, n) {
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const t = grid[r][c];
    if (t === null) return true;
    if (!isTile(t)) continue;
    if (c + 1 < n && isTile(grid[r][c + 1]) && grid[r][c + 1].value === t.value) return true;
    if (r + 1 < n && isTile(grid[r + 1][c]) && grid[r + 1][c].value === t.value) return true;
  }
  return false;
}

/* ---------- Game state ---------- */
let spec = null, mode = 'level', levelIndex = 0, dailyNum = 0, n = 4, grid = [], score = 0, movesMade = 0, idCounter = 0;
let rng = Math.random, history = [], undosLeft = 3, hammersLeft = 1, assisted = false, hammerMode = false;
let phase = 'menu', busy = false, runId = 0, won = false, milestones = {};
let tileEls = new Map(), cellSize = 100;

function maxTile() { let m = 0; grid.forEach(row => row.forEach(t => { if (isTile(t) && t.value > m) m = t.value; })); return m; }
function emptyCells() { const out = []; grid.forEach((row, r) => row.forEach((t, c) => { if (t === null) out.push([r, c]); })); return out; }
function spawn() {
  const e = emptyCells(); if (!e.length) return null;
  const [r, c] = e[Math.floor(rng() * e.length)], t = { id: ++idCounter, value: rng() < 0.9 ? 2 : 4 };
  grid[r][c] = t; return { tile: t, r, c };
}
function setupGame(s) {
  spec = s; mode = s.mode; n = s.n; runId++; busy = false; hammerMode = false; won = false; milestones = {};
  rng = s.seed ? mulberry32(s.seed) : Math.random;
  grid = Array.from({ length: n }, () => Array(n).fill(null));
  if (s.stones) { // stones go on seeded positions, never in a corner, so the board always stays playable
    const R = mulberry32(s.stoneSeed || 99), spots = [];
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (!((r === 0 || r === n - 1) && (c === 0 || c === n - 1))) spots.push([r, c]);
    for (let i = 0; i < s.stones; i++) { const k = Math.floor(R() * spots.length), [r, c] = spots.splice(k, 1)[0]; grid[r][c] = 'S'; }
  }
  score = 0; movesMade = 0; idCounter = 0; history = [];
  undosLeft = s.mode === 'daily' ? 0 : 3; hammersLeft = s.mode === 'daily' ? 0 : (s.mode === 'classic' ? 1 : 1); assisted = false;
  spawn(); spawn();
  buildBoard(); rebuildTiles();
  phase = 'play'; menuEl.classList.remove('show'); resultEl.classList.remove('show'); bannerEl.classList.remove('show');
  if (document.activeElement && document.activeElement.blur) document.activeElement.blur();
  setMsg(s.msg || 'Slide the tiles and merge equal numbers.');
  fitToView(); hud();
}
function startLevel(i) {
  getAudio(); levelIndex = i;
  const L = LEVELS[i];
  setupGame(Object.assign({ mode: 'level', stoneSeed: 700 + i * 31, msg: L.stones ? 'Grey blocks never move. Tiles stop against them and cannot merge across them.' : undefined }, L));
  $('tm-kicker').textContent = 'Level ' + (i + 1) + ' - ' + TIERS[Math.floor(i / 5)].name;
  $('tm-name').textContent = L.n + 'x' + L.n + (L.stones ? ' with ' + L.stones + ' stone' + (L.stones > 1 ? 's' : '') : '');
}
function startClassic() { getAudio(); setupGame({ mode: 'classic', n: 4, kind: 'endless', stones: 0, msg: 'Endless mode: keep going after 2048 and chase your best score.' }); $('tm-kicker').textContent = 'Classic'; $('tm-name').textContent = 'Endless 2048'; }
function startDaily() {
  getAudio(); dailyNum = todayNumber();
  setupGame({ mode: 'daily', n: 4, kind: 'endless', stones: 0, seed: dailyNum * 104729 + 13, msg: 'Same tiles for everyone today. No undo or smash: reach 512, 1024 or 2048 for 1, 2 or 3 stars.' });
  $('tm-kicker').textContent = 'Daily'; $('tm-name').textContent = 'Daily Game #' + dailyNum;
}
function restart() { if (mode === 'daily') startDaily(); else if (mode === 'classic') startClassic(); else startLevel(levelIndex); }
function showMenu() {
  runId++; busy = false; phase = 'menu';
  resultEl.classList.remove('show'); menuEl.classList.add('show'); renderMenu();
  $('tm-kicker').textContent = '2048'; $('tm-name').textContent = 'Pick a level';
}

/* ---------- Rendering: tiles are persistent elements that slide with a CSS transform ---------- */
function buildBoard() {
  cellSize = (BOARD_PX - GAP * (n + 1)) / n;
  cellsEl.innerHTML = '';
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) {
    const el = document.createElement('div'); el.className = 'tm-cell' + (grid[r][c] === 'S' ? ' stone' : '');
    el.style.width = el.style.height = cellSize + 'px'; el.style.left = posOf(c) + 'px'; el.style.top = posOf(r) + 'px';
    cellsEl.appendChild(el);
  }
}
const posOf = k => GAP + k * (cellSize + GAP);
function tileClass(v) { return v <= 4096 ? 't' + v : 't-super'; }
function makeTileEl(t, r, c, cls) {
  const el = document.createElement('div');
  el.className = 'tm-tile ' + tileClass(t.value) + (cls ? ' ' + cls : '');
  el.style.width = el.style.height = cellSize + 'px'; el.style.fontSize = Math.round(cellSize * (String(t.value).length > 3 ? 0.3 : String(t.value).length > 2 ? 0.38 : 0.46)) + 'px';
  el.style.transform = 'translate(' + posOf(c) + 'px,' + posOf(r) + 'px)';
  el.innerHTML = '<span>' + t.value + '</span>';
  tilesEl.appendChild(el); tileEls.set(t.id, el);
  return el;
}
function rebuildTiles() { tilesEl.innerHTML = ''; tileEls = new Map(); grid.forEach((row, r) => row.forEach((t, c) => { if (isTile(t)) makeTileEl(t, r, c, ''); })); }
function setMsg(html, warn) { msgEl.innerHTML = html; msgEl.classList.toggle('warn', !!warn); }
function goalText() {
  if (mode === 'level') { const L = spec; return L.kind === 'tile' ? 'Reach ' + L.target : 'Score ' + L.target + ' in ' + L.limit + ' moves'; }
  if (mode === 'daily') return 'Reach 512 / 1024 / 2048';
  return 'Beat your best: ' + save.best;
}
function hud() {
  $('tm-score').textContent = score; $('tm-best').textContent = Math.max(save.best, mode === 'classic' ? score : save.best);
  $('tm-moves').textContent = movesMade + (spec.kind === 'score' ? ' / ' + spec.limit : ''); $('tm-max').textContent = maxTile();
  $('tm-par').textContent = mode === 'level' ? parOf(spec) : '-';
  $('tm-goal-text').textContent = goalText();
  let pct = 0, sub = '';
  if (mode === 'level') { pct = spec.kind === 'tile' ? Math.log2(maxTile() || 2) / Math.log2(spec.target) : score / spec.target; sub = spec.kind === 'tile' ? 'Highest tile: ' + maxTile() : 'Score ' + score + ' of ' + spec.target + ', ' + Math.max(0, spec.limit - movesMade) + ' moves left'; }
  else if (mode === 'daily') { pct = Math.log2(maxTile() || 2) / 11; sub = 'Highest tile: ' + maxTile() + ', score ' + score; }
  else { pct = save.best ? score / save.best : 0; sub = score > save.best ? 'New best score!' : 'Best score: ' + save.best; }
  $('tm-bar').style.width = Math.max(0, Math.min(100, pct * 100)) + '%'; $('tm-goal-sub').textContent = sub;
  $('tm-undo-count').textContent = undosLeft; $('tm-hammer-count').textContent = hammersLeft;
  undoBtn.disabled = phase !== 'play' || undosLeft <= 0 || history.length === 0; hammerBtn.disabled = phase !== 'play' || hammersLeft <= 0;
  hammerBtn.setAttribute('aria-pressed', String(hammerMode)); boardEl.classList.toggle('hammer', hammerMode);
  undoBtn.style.display = mode === 'daily' ? 'none' : ''; hammerBtn.style.display = mode === 'daily' ? 'none' : '';
}
function renderMenu() {
  const today = todayNumber(), d = save.daily;
  if (d.lastDay && d.lastDay < today - 1) d.streak = 0; // a missed day resets the streak
  const wrap = $('tm-tiers'); wrap.innerHTML = '';
  TIERS.forEach((t, ti) => {
    const row = document.createElement('div');
    row.className = 'tm-tier'; row.style.setProperty('--g', t.color);
    row.innerHTML = '<div class="tm-tier-name">' + t.name + '<small>' + t.note + '</small></div>';
    const tiles = document.createElement('div'); tiles.className = 'tm-tier-tiles';
    for (let k = 0; k < 5; k++) {
      const i = ti * 5 + k, L = LEVELS[i], unlocked = i === 0 || save.stars[i - 1] > 0; // clearing a level unlocks the next one
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'tm-tile-btn' + (save.stars[i] === 3 ? ' perfect' : '');
      b.disabled = !unlocked; b.title = unlocked ? L.n + 'x' + L.n + (L.stones ? ', ' + L.stones + ' stones' : '') : 'Clear level ' + i + ' to unlock';
      const goal = L.kind === 'tile' ? String(L.target) : L.target + ' pts';
      b.innerHTML = '<span class="tm-tile-num">' + (i + 1) + '<small>' + goal + '</small></span><span class="tm-tile-stars">' + [0, 1, 2].map(x => '<span class="' + (x < save.stars[i] ? 'on' : '') + '">\\u2605</span>').join('') + '</span>';
      b.addEventListener('click', () => startLevel(i));
      tiles.appendChild(b);
    }
    row.appendChild(tiles); wrap.appendChild(row);
  });
  $('tm-star-total').textContent = save.stars.reduce((s, v) => s + v, 0); $('tm-streak').textContent = d.streak;
  $('tm-record').textContent = save.games ? 'Played ' + save.games + ', best score ' + save.best : 'No games played yet';
  $('tm-classic-sub').textContent = save.best ? 'Endless. Your best: ' + save.best : 'Endless, chase your best score';
  $('tm-daily-title').textContent = 'Daily Game #' + today;
  $('tm-daily-sub').textContent = d.day === today && d.stars > 0 ? 'Today: ' + '\\u2605'.repeat(d.stars) + '\\u2606'.repeat(3 - d.stars) + ', best score ' + d.score : 'The same tiles for everyone. Reach 512, 1024 or 2048. Keep your streak!';
}

/* ---------- Playing ---------- */
function doMove(dir) {
  if (phase !== 'play' || busy) return;
  const res = slide(grid, n, dir);
  if (!res.moved) { boardEl.classList.remove('shake'); void boardEl.offsetWidth; boardEl.classList.add('shake'); sfx.bad(); return; }
  history.push({ grid: grid.map(row => row.map(c => (isTile(c) ? { id: c.id, value: c.value } : c))), score, movesMade });
  if (history.length > 60) history.shift();
  const prev = grid; grid = res.next; score += res.gained; movesMade++;
  busy = true; const id = runId;
  // slide every tile to its new place; the tile that is merged into another slides there and fades away
  const survivors = new Map(); res.moves.forEach(m => { const el = tileEls.get(m.id); if (el) el.style.transform = 'translate(' + posOf(m.to[1]) + 'px,' + posOf(m.to[0]) + 'px)'; });
  res.merges.forEach(m => { const ael = tileEls.get(m.absorbed.id); if (ael) { ael.style.transform = 'translate(' + posOf(m.to[1]) + 'px,' + posOf(m.to[0]) + 'px)'; ael.classList.add('gone'); } });
  sfx.slide();
  setTimeout(() => {
    if (id !== runId) return;
    res.merges.forEach(m => {
      const ael = tileEls.get(m.absorbed.id); if (ael) { ael.remove(); tileEls.delete(m.absorbed.id); }
      const el = tileEls.get(m.id); if (el) { el.className = 'tm-tile ' + tileClass(m.value) + ' merge'; el.style.fontSize = Math.round(cellSize * (String(m.value).length > 3 ? 0.3 : String(m.value).length > 2 ? 0.38 : 0.46)) + 'px'; el.firstChild.textContent = m.value; }
      if (m.value >= 128) sparks(m.to[0], m.to[1], m.value);
    });
    if (res.merges.length) sfx.merge(Math.max(...res.merges.map(m => m.value)));
    if (res.gained) floatText('+' + res.gained + (res.merges.length >= 3 ? '  COMBO x' + res.merges.length : ''), res.merges[0].to);
    const sp = spawn(); if (sp) makeTileEl(sp.tile, sp.r, sp.c, 'spawn');
    busy = false; hud(); afterMove();
  }, 125);
  hud();
}
function floatText(text, to) {
  const el = document.createElement('div'); el.className = 'tm-float'; el.textContent = text;
  el.style.left = Math.max(6, Math.min(BOARD_PX - 150, posOf(to[1]))) + 'px'; el.style.top = posOf(to[0]) + 'px';
  floatsEl.appendChild(el); setTimeout(() => el.remove(), 950);
}
function sparks(r, c, v) {
  const colors = v >= 2048 ? ['#38bdf8', '#818cf8', '#fff'] : ['#fde68a', '#fbbf24', '#fb923c'];
  for (let i = 0; i < 10; i++) {
    const el = document.createElement('div'); el.className = 'tm-spark'; el.style.background = colors[i % colors.length];
    el.style.left = (posOf(c) + cellSize / 2) + 'px'; el.style.top = (posOf(r) + cellSize / 2) + 'px';
    const a = Math.random() * Math.PI * 2, d = 30 + Math.random() * 50;
    el.style.setProperty('--dx', Math.cos(a) * d + 'px'); el.style.setProperty('--dy', Math.sin(a) * d + 'px');
    floatsEl.appendChild(el); setTimeout(() => el.remove(), 650);
  }
}
function banner(text) { bannerEl.textContent = text; bannerEl.classList.add('show'); setTimeout(() => bannerEl.classList.remove('show'), 2200); }
function afterMove() {
  if (phase !== 'play') return;
  const mx = maxTile();
  if (mode === 'level') {
    if (spec.kind === 'tile' && mx >= spec.target) { finish(true); return; }
    if (spec.kind === 'score') { if (score >= spec.target) { finish(true); return; } if (movesMade >= spec.limit) { finish(false, 'You ran out of moves before reaching ' + spec.target + ' points.'); return; } }
  } else if (mode === 'daily') {
    [512, 1024, 2048].forEach(m => { if (mx >= m && !milestones[m]) { milestones[m] = true; sfx.win(); banner('You reached ' + m + '! ' + (m === 2048 ? '3 stars!' : 'Keep going for more.')); } });
  } else if (mx >= 2048 && !won) { won = true; sfx.win(); banner('You reached 2048! The game goes on.'); }
  if (!canMove(grid, n)) finish(mode !== 'level', 'No more moves.');
}
function undo() {
  if (phase !== 'play' || busy || undosLeft <= 0 || !history.length) return;
  const h = history.pop();
  grid = h.grid; score = h.score; movesMade = h.movesMade; undosLeft--; assisted = true; hammerMode = false; idCounter = Math.max(idCounter, ...grid.flat().filter(isTile).map(t => t.id));
  rebuildTiles(); setMsg('Undone. Using undo or smash costs you the unassisted star.'); hud();
}
function toggleHammer() {
  if (phase !== 'play' || hammersLeft <= 0) return;
  hammerMode = !hammerMode; setMsg(hammerMode ? '<b>Smash:</b> click a tile on the board to remove it. Click the button again to cancel.' : ''); hud();
}
function smashAt(r, c) {
  const t = grid[r][c];
  if (!isTile(t)) { setMsg('Click a tile to smash it.', true); sfx.bad(); return; }
  history.push({ grid: grid.map(row => row.map(x => (isTile(x) ? { id: x.id, value: x.value } : x))), score, movesMade });
  const el = tileEls.get(t.id); if (el) { el.classList.add('gone'); setTimeout(() => { el.remove(); }, 130); tileEls.delete(t.id); }
  grid[r][c] = null; hammersLeft--; hammerMode = false; assisted = true; sfx.smash(); sparks(r, c, 128);
  setMsg('Smashed. That tile is gone.'); hud();
}
function finish(success, why) {
  if (phase !== 'play') return;
  phase = 'over'; hammerMode = false;
  const mx = maxTile(); save.games++;
  let stars = 0, title, sub;
  if (mode === 'level') {
    if (success) {
      stars = 1 + (movesMade <= parOf(spec) ? 1 : 0) + (!assisted ? 1 : 0);
      title = stars === 3 ? 'Perfect level!' : 'Level cleared!';
      sub = 'Done in ' + movesMade + ' moves (par ' + parOf(spec) + '), score ' + score + '. ' + (assisted ? 'Undo or smash used: no unassisted star.' : 'No undo or smash used.');
      save.stars[levelIndex] = Math.max(save.stars[levelIndex], stars); save.wins++;
    } else { title = why ? 'Out of moves' : 'Stuck'; sub = (why || 'The board is full and nothing can merge.') + ' Your highest tile was ' + mx + '. Try again, or use undo and smash.'; }
  } else if (mode === 'daily') {
    stars = mx >= 2048 ? 3 : mx >= 1024 ? 2 : mx >= 512 ? 1 : 0;
    title = stars ? 'Daily complete!' : 'Game over'; sub = 'Highest tile ' + mx + ', score ' + score + ' in ' + movesMade + ' moves. ' + (stars ? '' : 'Reach 512 to count for your streak.');
    const d = save.daily; if (d.day !== dailyNum) { d.day = dailyNum; d.stars = 0; d.score = 0; d.max = 0; }
    d.stars = Math.max(d.stars, stars); d.score = Math.max(d.score, score); d.max = Math.max(d.max, mx);
    if (stars > 0 && d.lastDay !== dailyNum) { d.streak = d.lastDay === dailyNum - 1 ? d.streak + 1 : 1; d.lastDay = dailyNum; }
  } else { title = 'Game over'; sub = 'Score ' + score + ', highest tile ' + mx + ', ' + movesMade + ' moves.' + (score > save.best ? ' New best score!' : ''); }
  if (score > save.best && mode !== 'daily') save.best = score;
  persist(); hud();
  if (success) { sfx.win(); confetti(); } else sfx.lose();
  $('tm-result-title').textContent = title; $('tm-result-sub').textContent = sub;
  [...$('tm-result-stars').children].forEach((el, i) => el.classList.toggle('on', i < stars));
  $('tm-result-stars').style.visibility = (mode === 'level' || mode === 'daily') && stars ? 'visible' : 'hidden';
  nextBtn.hidden = mode !== 'level' || !success || levelIndex >= LEVEL_COUNT - 1;
  shareBtn.hidden = mode !== 'daily' || !stars; shareBtn.textContent = 'Copy result';
  shareBtn.dataset.text = 'Tile Merge 2048 Daily #' + dailyNum + ' ' + '\\u2605'.repeat(stars) + '\\u2606'.repeat(3 - stars) + ' tile ' + mx + ', score ' + score + ', streak ' + save.daily.streak;
  const id = runId;
  setTimeout(() => { if (id === runId && phase === 'over') resultEl.classList.add('show'); }, 900);
}
function confetti() {
  const colors = ['#f59e0b', '#ef4444', '#a855f7', '#38bdf8', '#4ade80', '#f472b6'];
  for (let i = 0; i < 46; i++) {
    const p = document.createElement('div');
    p.className = 'tm-confetti'; p.style.left = Math.random() * 100 + '%'; p.style.background = colors[i % colors.length];
    p.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px'); p.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    p.style.animationDuration = (1.8 + Math.random() * 1.4) + 's'; p.style.animationDelay = (Math.random() * 0.5) + 's';
    panelEl.appendChild(p); setTimeout(() => p.remove(), 4200);
  }
}

/* ---------- Input ---------- */
const KEYS = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down', a: 'left', d: 'right', w: 'up', s: 'down', A: 'left', D: 'right', W: 'up', S: 'down' };
document.addEventListener('keydown', e => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const k = e.key;
  if (k === 'Escape' && phase !== 'menu') { showMenu(); return; }
  if (phase !== 'play') return;
  if (KEYS[k]) { e.preventDefault(); doMove(KEYS[k]); }
  else if ((k === 'u' || k === 'U' || k === 'z' || k === 'Z') && !e.repeat) undo();
  else if ((k === 'h' || k === 'H') && !e.repeat) toggleHammer();
  else if ((k === 'r' || k === 'R') && !e.repeat) restart();
});
let swipe = null;
boardEl.addEventListener('pointerdown', e => { swipe = { x: e.clientX, y: e.clientY }; });
boardEl.addEventListener('pointerup', e => {
  if (!swipe) return;
  const dx = e.clientX - swipe.x, dy = e.clientY - swipe.y; swipe = null;
  if (phase !== 'play') return;
  if (Math.max(Math.abs(dx), Math.abs(dy)) < 24) { // a tap: with the smash tool it removes the tile under the finger
    if (hammerMode) { const r = boardEl.getBoundingClientRect(), fx = (e.clientX - r.left) / r.width * BOARD_PX, fy = (e.clientY - r.top) / r.height * BOARD_PX; const c = Math.floor((fx - GAP / 2) / (cellSize + GAP)), rr = Math.floor((fy - GAP / 2) / (cellSize + GAP)); if (rr >= 0 && rr < n && c >= 0 && c < n) smashAt(rr, c); }
    return;
  }
  doMove(Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up'));
});
boardEl.addEventListener('pointercancel', () => { swipe = null; });
undoBtn.addEventListener('click', () => { undo(); undoBtn.blur(); });
hammerBtn.addEventListener('click', () => { toggleHammer(); hammerBtn.blur(); });
$('tm-levels-btn').addEventListener('click', showMenu);
$('tm-daily').addEventListener('click', startDaily);
$('tm-classic').addEventListener('click', startClassic);
$('tm-retry').addEventListener('click', restart);
$('tm-menu-back').addEventListener('click', showMenu);
nextBtn.addEventListener('click', () => startLevel(levelIndex + 1));
shareBtn.addEventListener('click', () => {
  const text = shareBtn.dataset.text || '', done = () => { shareBtn.textContent = 'Copied!'; };
  try { navigator.clipboard.writeText(text).then(done, () => { shareBtn.textContent = text; }); } catch (e) { shareBtn.textContent = text; }
});

/* ---------- Fit the game into the space available ---------- */
const fitEl = $('tm-fit'), wrapEl = $('tm-wrap');
function fitToView() {
  const availW = Math.max(240, window.innerWidth - 28), availH = Math.max(240, window.innerHeight - 24);
  const narrow = availW < 760;
  wrapEl.classList.toggle('tm-narrow', narrow);
  document.body.style.overflow = narrow ? 'auto' : 'hidden';
  document.body.style.alignItems = narrow ? 'flex-start' : 'center';
  if (narrow) { wrapEl.style.transform = 'none'; wrapEl.style.width = Math.min(560, availW) + 'px'; fitEl.style.width = wrapEl.style.width; fitEl.style.height = wrapEl.offsetHeight + 'px'; return; }
  wrapEl.style.transform = 'none'; wrapEl.style.width = '880px';
  const natH = wrapEl.offsetHeight || 1, k = Math.max(0.4, Math.min(1, availW / 880, availH / natH));
  wrapEl.style.transform = k < 1 ? 'scale(' + k + ')' : 'none';
  fitEl.style.width = Math.round(880 * k) + 'px'; fitEl.style.height = Math.round(natH * k) + 'px';
}
window.addEventListener('resize', fitToView);
if (typeof ResizeObserver !== 'undefined') new ResizeObserver(fitToView).observe(wrapEl);

setupGame({ mode: 'classic', n: 4, kind: 'endless', stones: 0 });
showMenu();
fitToView();`,

  seo: {
    title: 'Tile Merge 2048 Puzzle with 20 Levels, Stones & Daily Game',
    description: 'Free 2048 in plain JS: sliding animation, 20 levels with goals, 5x5 and 3x3 boards, stone blocks, undo, smash, a daily game and classic mode. No libraries.',
    about: {
      title: 'Tile Merge 2048 — Sliding Animation, 20 Levels, Bigger Boards, Stones, Undo, Smash and a Daily Game',
      description: `2048 is a sliding puzzle: every move slides all tiles as far as they can go, equal neighbours merge into one tile of double the value, and a new tile appears. This version keeps that simple rule and adds a game around it: tiles that actually slide, 20 levels with different goals and board sizes, stones that get in the way, undo and a smash tool, a Daily Game with the same tiles for everyone, and the classic endless mode. It is plain HTML, CSS and JavaScript with no libraries, images or audio files.

**Move logic that handles any board**

The board is an n by n grid whose cells are empty, a stone, or a tile with an id and a value. \`slide()\` handles all four directions with one function: \`lineOf()\` lists the cells of a row or column starting at the side the tiles move towards, and each line is processed from that side. Tiles are placed one after another, and a tile merges into the previous one only if their values are equal and the previous one has not merged yet in this move, which is the rule that stops 2, 2, 4 becoming 8. A stone splits a line into separate segments, so tiles stop against it and never merge across it. The same code runs a 3x3, 4x4 and 5x5 board.

**Tiles that really slide**

The old way to draw a 2048 board is to redraw every tile after each move, which makes tiles jump. Here every tile is a persistent element with an id, positioned with a CSS \`transform\`. A move only changes the transform of each element, so the browser slides it. The tile that is merged into another slides to the same cell and fades, then the survivor pops with the new value, a spark burst shows for big merges and a floating "+score" text appears (with a combo label when three or more pairs merge at once). A new tile pops in after the slide finishes.

**Levels with real goals**

The \`LEVELS\` array lists 20 levels in four tiers. Warm-up levels use the 4x4 board with targets from 64 to 512, including a score target with a move limit. Big boards use 5x5 with goals up to 2048. Stones adds one to three fixed blocks on seeded positions (never in a corner). Master has tiny 3x3 boards and a 4096 goal. A level is cleared the moment the goal is reached. The par number of moves is calculated from the target, because a tile of value T needs at least about T divided by 2.2 moves, as the average spawn is 2.2.

**Undo, smash and stars**

Each level gives three undos (a snapshot stack of the grid, the score and the move count) and one smash that removes any tile. Both are optional helpers that cost the unassisted star. Stars are one for clearing the level, one for finishing within the par number of moves and one for using neither undo nor smash. Clearing a level unlocks the next.

**Daily game, classic mode and saving**

The Daily Game draws its new tiles from a seeded random generator (\`mulberry32\`), so everyone who plays the same moves gets the same game, and it has no undo or smash. Reach 512, 1024 or 2048 for one, two or three stars, and a streak builds when you play it on consecutive days. Classic mode is the endless game with your best score. All progress is saved to \`localStorage\` inside try/catch, so the game also runs in a sandboxed iframe where storage is blocked.

**Controls and feel**

Arrow keys or WASD slide the tiles, U undoes, H starts the smash tool and R restarts. On a touch screen you swipe on the board, and a tap removes a tile when the smash tool is active. Sounds come from a Web Audio synth (merge pitch rises with the tile value), big tiles glow, and the whole game scales to short preview areas.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pick a level, Classic or the Daily Game', text: 'The menu shows 20 levels in four tiers with their goals. Level 1 is open at first, and clearing a level unlocks the next. Classic is the endless game, and the Daily Game uses the same tiles for everyone.' },
        { title: 'Slide the tiles', text: 'Use the arrow keys or WASD, or swipe on a touch screen. Every tile slides as far as it can in that direction, and two tiles with the same number merge into one with double the value. A new tile appears after every move.' },
        { title: 'Reach the goal', text: 'The goal card shows what to do, for example reach a 256 tile, or score 2500 points in 160 moves, with a progress bar. The moment you reach it the level is cleared.' },
        { title: 'Watch out for stones', text: 'On the Stones levels the grey blocks never move. Tiles stop against them and cannot merge across them, so plan your lines carefully.' },
        { title: 'Use undo and smash when you are stuck', text: 'Undo (U) takes back your last move, three times per level. Smash (H) removes any one tile you click. Both help, but using either costs you the unassisted star.' },
        { title: 'Earn stars and chase the daily', text: 'One star for clearing the level, one for finishing within the par number of moves, one for using no undo or smash. In the Daily Game, reach 512, 1024 or 2048 for one, two or three stars and keep your streak going.' },
      ],
    },
    features: [
      'Tiles are persistent elements that slide with CSS transforms, merge with a pop, and spawn with a delay, instead of being redrawn on every move',
      'One slide() function for all four directions that merges each pair once per move and treats stones as segment breaks',
      'Three board sizes (3x3, 4x4, 5x5) and fixed stone blocks on seeded positions',
      '20 levels in four tiers with tile goals and score-in-limited-moves goals, par moves calculated from the target',
      'Undo (three snapshots per level) and a smash tool that removes a tile, both marked as assists for the stars',
      'Daily Game with a seeded tile sequence, no assists, three stars for 512, 1024 and 2048, and a streak',
      'Classic endless mode with a saved best score and a banner when 2048 is reached',
      'Sparks for big merges, floating score and combo text, glowing high tiles, a goal progress bar and Web Audio sounds that rise in pitch with the merge',
      'Arrow keys, WASD and swipe, with a tap-to-smash on touch screens, and scaling to short preview areas',
      'Progress, stars and best score saved to localStorage inside try/catch, so it works in a sandboxed iframe',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching a clean slide-and-merge algorithm', desc: 'The single-pass rule that merges each pair only once is the heart of 2048, and getting it right in all four directions with one function is a good exercise. Adding stones shows how a small change in the data model changes a whole game.' },
      { icon: 'DESIGN', title: 'Animating a grid without a library', desc: 'Persistent elements with a transform transition are the simplest way to animate sliding pieces. The same idea works for any tile-based game, a kanban board or a sortable list.' },
      { icon: 'APP', title: 'A classic with progression for a games page', desc: 'Levels with different goals, a daily game and a streak turn a well-known game into something people return to, with no account or backend.' },
      { icon: 'CODE', title: 'Reference for undo with snapshots', desc: 'A stack of cloned grids, scores and move counts is the simplest reliable undo. It also shows how to rebuild the DOM from state after an undo.' },
      { icon: 'FLOW', title: 'Seeded randomness for fair daily challenges', desc: 'Drawing every new tile from a seeded generator makes the same game for everyone on a given day, which is easy to share and compare.' },
      { icon: 'CODE', title: 'Related: Sliding Number Puzzle (15-Puzzle)', desc: 'See the [Sliding Number Puzzle](/ui-snippets/sliding-puzzle-game/) for another sliding tile puzzle with a different goal.' },
      { icon: 'CODE', title: 'Related: Minesweeper Puzzle Game', desc: 'See the [Minesweeper Puzzle Game](/ui-snippets/minesweeper-game/) for another logic game with levels and a daily board.' },
    ],
    faqs: [
      { q: 'Why does a row like 2, 2, 4 become 4, 4 and not 8?', a: 'slide() merges a tile into the previous one only if the previous one has not merged in the same move. The two 2s merge into a 4, which is marked as merged, so the next tile (a 4) cannot merge into it in the same move. The next move can then merge the two 4s into an 8. This single-merge rule is what makes 2048 playable.' },
      { q: 'How do the stones work?', a: 'A stone is a cell that never moves and never holds a tile. When a line is processed, each stone ends the current segment, and the tiles on either side of it are slid and merged separately. So tiles stop right next to a stone and cannot merge across it. Stones are placed with a seeded random generator, never in a corner.' },
      { q: 'How are the stars and par moves worked out?', a: 'One star for reaching the goal, one for doing it in no more than the par number of moves, one for not using undo or smash. For a tile goal, par is the target divided by 2.2 (the average value of a new tile) times 1.3, because the board has to receive at least that much value from new tiles. For a score goal, par is 85 percent of the move limit.' },
      { q: 'How does the Daily Game stay the same for everyone?', a: 'New tiles come from a mulberry32 generator seeded with the day number. Every spawn uses the next numbers of that sequence, so if two players make the same moves they get the same tiles. The daily game has no undo or smash, so the result depends only on your moves.' },
      { q: 'How do I add a level or change a goal?', a: 'Add an object to the LEVELS array: n is the board size, kind is tile or score, target is the tile or score to reach, limit is the move limit for score levels and stones is the number of fixed blocks. The menu shows five levels per tier, so add levels in fives or edit TIERS. Changing BOARD_PX or GAP changes the size of the board and the spacing.' },
      { q: 'Does it work in a sandboxed iframe and on phones?', a: 'Yes. All localStorage access is wrapped in try/catch, so a blocked storage only means that progress and best score are not saved, and every sound call is wrapped too. Swipes on the board play the game, and a tap removes a tile when the smash tool is active. On narrow screens the side panel moves under the board.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to explain how slide() processes a line from the destination side, how the merged flag prevents double merges, and how doMove() animates sliding and merging with transforms and timers. It is also a good base to extend: ask for a hint that suggests a move using a simple heuristic (corner strategy or expectimax), a replay of your game, a 6x6 board, a "time attack" mode, tiles that are not powers of two (Fibonacci), or an online leaderboard for the Daily Game. You can also ask it to review how undo rebuilds the tile elements and how ids are kept unique afterwards.`,
      prompt: `Build a 2048 game with levels in plain HTML, CSS and JavaScript, with no libraries, images or audio files.

Requirements:
- An n by n board (3x3, 4x4 or 5x5) where each cell is empty, a stone, or a tile with a unique id and a value. One slide(grid, n, dir) function handles all four directions: it walks each row or column starting from the side the tiles move towards, merges a tile into the previous one only when the values are equal and that one has not merged in this move, treats a stone as a break between segments, and returns the new grid, the list of moves, the merges and the score gained. A new tile (2 with 90 percent, 4 with 10 percent) appears in a random empty cell after every move that changed the board. Detect game over when the board is full and no equal neighbours remain.
- Tiles are persistent DOM elements positioned with transform: translate and a CSS transition, so they slide. A tile merged into another slides there and fades, the survivor pops with its new value, big merges show sparks, floating "+score" text appears (with a combo label for three or more merges) and new tiles pop in after the slide. Colour tiles by value with a glow for 128 and above.
- 20 levels in 4 tiers defined as data: n, kind (reach a tile, or reach a score within a move limit), target, stones (fixed blocks on seeded positions, never in a corner). Show the goal with a progress bar, the moves, the highest tile and par moves (target / 2.2 * 1.3 for tile goals, 85 percent of the limit for score goals). Stars: 1 for clearing, +1 for finishing within par, +1 for no undo or smash. Clearing a level unlocks the next.
- Undo (3 per level, snapshots of the grid, score and moves, rebuilding the tile elements) and a smash tool (1 per level, click a tile to remove it); both mark the run as assisted. A Classic endless mode with a saved best score and a banner at 2048. A Daily Game with new tiles drawn from a seeded generator (mulberry32) based on the date, no undo or smash, stars for reaching 512, 1024 and 2048, a day streak and a copy result button. Save stars, best score, daily result and streak to localStorage inside try/catch.
- Controls: arrow keys and WASD, swipe on the board with pointer events, U undo, H smash, R restart, Esc menu. Web Audio synth sounds (merge pitch rising with the tile value) with a mute button, confetti on a win, and a result screen with stars.
- Scale the whole game to fit the available area (down to 40 percent) and stack the layout on narrow screens.`,
    },
  },
};

export default tileMerge2048Game;
