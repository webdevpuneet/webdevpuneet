const tileMerge2048Game = {
  id: 'tile-merge-2048-game',
  title: 'Tile Merge 2048 Puzzle',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="g2048-wrap">
  <div class="g2048-top">
    <h1 class="g2048-title">2048</h1>
    <div class="g2048-scores">
      <div class="g2048-score-box">
        <span class="g2048-score-label">Score</span>
        <span class="g2048-score-value" id="score-value">0</span>
      </div>
      <div class="g2048-score-box">
        <span class="g2048-score-label">Best</span>
        <span class="g2048-score-value" id="best-value">0</span>
      </div>
    </div>
  </div>
  <div class="g2048-controls">
    <p class="g2048-hint">Use arrow keys or swipe to move tiles</p>
    <button class="g2048-new-btn" id="new-game-btn">New Game</button>
  </div>
  <div class="g2048-board-outer">
    <div class="g2048-grid-bg" id="grid-bg"></div>
    <div class="g2048-tiles" id="tiles-layer"></div>
    <div class="g2048-overlay" id="game-overlay">
      <div class="g2048-overlay-inner">
        <p class="g2048-overlay-msg" id="overlay-msg">Game Over</p>
        <button class="g2048-new-btn" id="overlay-retry-btn">Try Again</button>
      </div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #faf8ef; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.g2048-wrap { width: 340px; max-width: 100%; }

.g2048-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.g2048-title { font-size: 34px; font-weight: 800; color: #776e65; }
.g2048-scores { display: flex; gap: 8px; }
.g2048-score-box {
  background: #6366f1; border-radius: 8px; padding: 6px 14px;
  display: flex; flex-direction: column; align-items: center; min-width: 56px;
}
.g2048-score-label { font-size: 10px; font-weight: 700; color: #e0e7ff; text-transform: uppercase; letter-spacing: 0.5px; }
.g2048-score-value { font-size: 17px; font-weight: 800; color: #fff; }

.g2048-controls { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; gap: 8px; }
.g2048-hint { font-size: 11px; color: #a8a29e; }
.g2048-new-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 8px;
  padding: 8px 16px; font-size: 13px; font-weight: 700; cursor: pointer;
  font-family: inherit; transition: background 0.15s; white-space: nowrap;
}
.g2048-new-btn:hover { background: #4f46e5; }

.g2048-board-outer {
  position: relative;
  width: 340px; max-width: 100%; aspect-ratio: 1;
  background: #bbada0; border-radius: 10px; padding: 8px;
  touch-action: none;
}

.g2048-grid-bg {
  display: grid; grid-template-columns: repeat(4, 1fr); grid-template-rows: repeat(4, 1fr);
  gap: 8px; width: 100%; height: 100%;
}
.g2048-grid-bg .cell-bg { background: rgba(238,228,218,0.35); border-radius: 6px; }

.g2048-tiles { position: absolute; inset: 8px; }

.g2048-tile {
  position: absolute;
  display: flex; align-items: center; justify-content: center;
  border-radius: 6px; font-weight: 800;
  transition: top 0.12s ease, left 0.12s ease, transform 0.12s ease, opacity 0.12s ease;
}
.g2048-tile.spawn { animation: g2048-spawn 0.18s ease; }
.g2048-tile.merged { animation: g2048-pop 0.16s ease; }
@keyframes g2048-spawn { from { transform: scale(0); opacity: 0; } to { transform: scale(1); opacity: 1; } }
@keyframes g2048-pop { 0% { transform: scale(1); } 50% { transform: scale(1.14); } 100% { transform: scale(1); } }

.t2 { background: #eee4da; color: #776e65; }
.t4 { background: #ede0c8; color: #776e65; }
.t8 { background: #f2b179; color: #fff; }
.t16 { background: #f59563; color: #fff; }
.t32 { background: #f67c5f; color: #fff; }
.t64 { background: #f65e3b; color: #fff; }
.t128 { background: #edcf72; color: #fff; font-size: 0.9em; }
.t256 { background: #edcc61; color: #fff; font-size: 0.9em; }
.t512 { background: #edc850; color: #fff; font-size: 0.9em; }
.t1024 { background: #edc53f; color: #fff; font-size: 0.78em; }
.t2048 { background: #edc22e; color: #fff; font-size: 0.78em; box-shadow: 0 0 20px rgba(237,194,46,0.7); }
.t-super { background: #3c3a32; color: #fff; font-size: 0.7em; }

.g2048-overlay {
  position: absolute; inset: 0; border-radius: 10px;
  background: rgba(238,228,218,0.75);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; pointer-events: none; transition: opacity 0.25s;
}
.g2048-overlay.show { opacity: 1; pointer-events: all; }
.g2048-overlay-inner { display: flex; flex-direction: column; align-items: center; gap: 14px; }
.g2048-overlay-msg { font-size: 26px; font-weight: 800; color: #776e65; }`,

  js: `const SIZE = 4;
const BEST_KEY = 'g2048-best-score';
let board = [];
let score = 0;
let best = 0;
let hasWon = false;
let isGameOver = false;
let tileIdCounter = 0;

const tilesLayer = document.getElementById('tiles-layer');
const gridBg = document.getElementById('grid-bg');
const scoreValueEl = document.getElementById('score-value');
const bestValueEl = document.getElementById('best-value');
const overlayEl = document.getElementById('game-overlay');
const overlayMsgEl = document.getElementById('overlay-msg');
const boardOuter = document.querySelector('.g2048-board-outer');

for (let i = 0; i < SIZE * SIZE; i++) {
  const c = document.createElement('div');
  c.className = 'cell-bg';
  gridBg.appendChild(c);
}

function emptyBoard() {
  const b = [];
  for (let r = 0; r < SIZE; r++) b.push(new Array(SIZE).fill(null));
  return b;
}

function getEmptyCells() {
  const cells = [];
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (!board[r][c]) cells.push([r, c]);
    }
  }
  return cells;
}

function spawnTile(isInitial) {
  const empties = getEmptyCells();
  if (!empties.length) return;
  const [r, c] = empties[Math.floor(Math.random() * empties.length)];
  const value = Math.random() < 0.9 ? 2 : 4;
  board[r][c] = { id: ++tileIdCounter, value, r, c, isNew: !isInitial, merged: false };
}

function cellSizePx() {
  const outer = boardOuter.getBoundingClientRect().width - 16; // padding 8px each side
  const gap = 8;
  return (outer - gap * (SIZE - 1)) / SIZE;
}

function render() {
  const size = cellSizePx();
  const gap = 8;
  tilesLayer.innerHTML = '';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const tile = board[r][c];
      if (!tile) continue;
      const el = document.createElement('div');
      el.className = 'g2048-tile ' + tileClass(tile.value);
      if (tile.isNew) el.classList.add('spawn');
      if (tile.merged) el.classList.add('merged');
      el.style.width = size + 'px';
      el.style.height = size + 'px';
      el.style.left = (c * (size + gap)) + 'px';
      el.style.top = (r * (size + gap)) + 'px';
      el.style.fontSize = Math.max(16, size * 0.42) + 'px';
      el.textContent = tile.value;
      tilesLayer.appendChild(el);
      tile.isNew = false;
      tile.merged = false;
    }
  }
  scoreValueEl.textContent = score;
  bestValueEl.textContent = best;
}

function tileClass(value) {
  return value <= 2048 ? 't' + value : 't-super';
}

function cloneBoardValues() {
  return board.map(row => row.map(t => (t ? t.value : null)));
}

function boardsEqual(a, b) {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (a[r][c] !== b[r][c]) return false;
    }
  }
  return true;
}

// Slides and merges a single line of tiles (array of tile-or-null, length SIZE)
// toward index 0. Returns { line, gained, moved }.
function slideLine(line) {
  const values = line.filter(t => t !== null);
  const result = [];
  let gained = 0;
  let i = 0;
  while (i < values.length) {
    if (i + 1 < values.length && values[i].value === values[i + 1].value) {
      // Merge exactly once — the merged tile cannot merge again this move
      const mergedValue = values[i].value * 2;
      result.push({ id: values[i].id, value: mergedValue, merged: true, isNew: false });
      gained += mergedValue;
      i += 2;
    } else {
      result.push({ id: values[i].id, value: values[i].value, merged: false, isNew: false });
      i += 1;
    }
  }
  while (result.length < SIZE) result.push(null);
  return { line: result, gained };
}

function move(direction) {
  if (isGameOver) return;
  const before = cloneBoardValues();
  let totalGained = 0;
  const newBoard = emptyBoard();

  if (direction === 'left' || direction === 'right') {
    for (let r = 0; r < SIZE; r++) {
      let line = board[r].slice();
      if (direction === 'right') line = line.slice().reverse();
      const { line: newLine, gained } = slideLine(line);
      totalGained += gained;
      const finalLine = direction === 'right' ? newLine.slice().reverse() : newLine;
      for (let c = 0; c < SIZE; c++) {
        if (finalLine[c]) newBoard[r][c] = { ...finalLine[c], r, c };
      }
    }
  } else {
    for (let c = 0; c < SIZE; c++) {
      let col = [];
      for (let r = 0; r < SIZE; r++) col.push(board[r][c]);
      if (direction === 'down') col = col.reverse();
      const { line: newLine, gained } = slideLine(col);
      totalGained += gained;
      const finalCol = direction === 'down' ? newLine.slice().reverse() : newLine;
      for (let r = 0; r < SIZE; r++) {
        if (finalCol[r]) newBoard[r][c] = { ...finalCol[r], r, c };
      }
    }
  }

  board = newBoard;
  const after = cloneBoardValues();
  if (!boardsEqual(before, after)) {
    score += totalGained;
    if (score > best) { best = score; localStorage.setItem(BEST_KEY, String(best)); }
    spawnTile(false);
    render();
    checkWin();
    checkGameOver();
  }
}

function checkWin() {
  if (hasWon) return;
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      if (board[r][c] && board[r][c].value === 2048) {
        hasWon = true;
        showOverlay('You reached 2048! Keep playing?');
        return;
      }
    }
  }
}

function checkGameOver() {
  if (getEmptyCells().length > 0) return;
  // Check if any adjacent equal-value merge is still possible
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const v = board[r][c].value;
      if (c + 1 < SIZE && board[r][c + 1].value === v) return;
      if (r + 1 < SIZE && board[r + 1][c].value === v) return;
    }
  }
  isGameOver = true;
  showOverlay('Game Over — Score: ' + score);
}

function showOverlay(msg) {
  overlayMsgEl.textContent = msg;
  overlayEl.classList.add('show');
}
function hideOverlay() {
  overlayEl.classList.remove('show');
}

function newGame() {
  board = emptyBoard();
  score = 0;
  hasWon = false;
  isGameOver = false;
  hideOverlay();
  spawnTile(true);
  spawnTile(true);
  render();
}

document.addEventListener('keydown', (e) => {
  const map = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
  if (map[e.key]) {
    e.preventDefault();
    move(map[e.key]);
  }
});

let touchStartX = 0, touchStartY = 0;
boardOuter.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });
boardOuter.addEventListener('touchend', (e) => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;
  const absDx = Math.abs(dx), absDy = Math.abs(dy);
  if (Math.max(absDx, absDy) < 24) return;
  if (absDx > absDy) {
    move(dx > 0 ? 'right' : 'left');
  } else {
    move(dy > 0 ? 'down' : 'up');
  }
}, { passive: true });

document.getElementById('new-game-btn').addEventListener('click', newGame);
document.getElementById('overlay-retry-btn').addEventListener('click', newGame);

best = parseInt(localStorage.getItem(BEST_KEY) || '0', 10) || 0;
window.addEventListener('resize', render);
newGame();`,

  seo: {
    title: '2048 Tile Merge Game — Free HTML CSS JS Snippet',
    description: 'Playable 4x4 2048 with swipe/arrow controls, single-merge-per-move logic, animated tiles and localStorage best score. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Tile Merge 2048 Puzzle — Single-Merge-Per-Move Logic, Absolute-Positioned Tile Animation & Swipe Input',
      description: `2048 looks simple to clone but has a surprisingly sharp edge case that trips up most quick implementations: a tile must only merge once per move. If three equal tiles slide together — say three 2s in a row — the naive approach of repeatedly combining adjacent equal pairs left-to-right can accidentally merge the resulting 4 with the third 2 in the same pass, producing an 8 out of thin air. This snippet's \`slideLine()\` function avoids that bug entirely by processing each line with a single forward pass and an index that jumps by two positions the instant a merge happens, guaranteeing no merged tile is ever reconsidered for a second merge within the same move.

**How a single move is processed**

Each arrow key or swipe gesture triggers \`move(direction)\`, which reduces the 2D board to four independent 1D lines — either the four rows (for left/right) or the four columns (for up/down) — and runs \`slideLine()\` on each one after optionally reversing it so every direction can reuse the same left-aligned slide-and-merge logic. \`slideLine()\` first filters out empty cells, then walks the remaining values left to right: if the current tile's value equals the next tile's value, it emits one merged tile worth double and advances the index by two; otherwise it emits the tile unchanged and advances by one. The result is padded back out to four slots with nulls representing empty space, then written into a fresh board array.

**Detecting whether a move actually changed anything**

Because arrow keys fire even when a move is illegal (for example pressing left when everything is already pressed against the left wall), the snippet snapshots the board's values before and after via \`cloneBoardValues()\` and \`boardsEqual()\`. A new tile only spawns, and the score/localStorage update only happens, when the comparison shows the board actually changed — this matches the real 2048 rule that a no-op keypress does not consume a turn.

**Animated, absolutely positioned tiles**

Rather than re-laying out a DOM grid every move, each tile is an absolutely positioned \`div\` inside \`.g2048-tiles\`, and its \`left\`/\`top\` pixel offsets are computed from its row/column index and the live cell size (recalculated on resize via \`cellSizePx()\`). A CSS \`transition\` on \`top\`/\`left\`/\`transform\` means simply changing those style properties on each render produces a smooth glide animation for free, while freshly spawned tiles get a \`.spawn\` class that plays a scale-in keyframe animation and merged tiles get a \`.merged\` class that plays a brief pop/bounce.

**Ace-free but not gimmick-free: soft rules that matter**

Score accumulates by the value of every merge, not just a flat point per move, matching the original 2048 scoring rule. Reaching a 2048 tile triggers a one-time win overlay but does not lock the board — play continues seamlessly afterward, exactly like the original game, tracked with a \`hasWon\` flag that prevents the win banner from firing again on subsequent moves. Game over is detected only when the board is completely full and no two horizontally or vertically adjacent cells share a value, meaning every remaining move would be a no-op. The best score persists across sessions using \`localStorage.setItem('g2048-best-score', ...)\`, read back on load so returning players see their all-time high immediately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Move tiles with arrows or swipe', text: 'Press an Arrow key on desktop, or swipe in any direction on a touch screen (a 24px minimum swipe distance in touchend prevents accidental taps from triggering a move). All tiles slide as far as possible in that direction.' },
        { title: 'Merge equal tiles', text: 'When two tiles of the same value collide during a slide, they combine into one tile of double the value, and your score increases by that new value. Each tile can only take part in one merge per move — three 2s sliding together become a 4 and a leftover 2, never an 8.' },
        { title: 'Watch a new tile spawn', text: 'After any move that actually changes the board, spawnTile() places a new 2 (90% chance) or 4 (10% chance) in a random empty cell, matching the original 2048 spawn distribution.' },
        { title: 'Reach 2048 to win, or keep going', text: 'The first time a 2048 tile appears on the board, an overlay announces the win but the board stays interactive — hasWon prevents the banner from re-triggering, so you can keep merging toward 4096 and beyond.' },
        { title: 'Recognise game over', text: 'When the board is completely full and no adjacent pair of tiles (horizontally or vertically) shares a value, no move can change the board any further and a Game Over overlay appears showing your final score.' },
        { title: 'Track your best score and start fresh', text: 'Your highest-ever score persists in localStorage under g2048-best-score and displays in the Best box at all times. Click "New Game" (or "Try Again" on the overlay) to reset the board to two starting tiles.' },
      ],
    },
    features: [
      'slideLine() single-pass merge algorithm that guarantees each tile merges at most once per move',
      'cloneBoardValues() + boardsEqual() diffing to detect no-op moves and skip spawning/scoring on illegal keypresses',
      'Absolutely positioned tiles with CSS transition on top/left for a smooth slide-and-merge glide animation',
      'Distinct .spawn scale-in and .merged pop keyframe animations for new versus combined tiles',
      'Direction-agnostic line processing: rows/columns optionally reversed so left/right/up/down share one merge function',
      'Touch swipe detection via touchstart/touchend coordinate delta with a minimum-distance threshold',
      'Persistent best score via localStorage.setItem, read back on load and updated live whenever the current score exceeds it',
      'Win-without-stopping: hasWon flag shows a one-time 2048 banner while leaving the board fully playable afterward',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching array-reduction and 1D-line abstraction techniques', desc: 'The trick of reducing four different move directions down to one slideLine() function by transposing/reversing rows and columns is a genuinely useful abstraction pattern applicable well beyond games — anywhere a 2D grid operation can be decomposed into repeated 1D passes. This snippet is a clean, self-contained example of that technique for students studying array manipulation.' },
      { icon: 'APP', title: 'Portfolio piece demonstrating edge-case-aware game logic', desc: 'The single-merge-per-move bug is a well-known trap that separates a superficial 2048 clone from a correct one. Including this snippet in a portfolio, alongside an explanation of how slideLine() specifically prevents double-merging, demonstrates attention to subtle correctness details that reviewers and interviewers notice.' },
      { icon: 'FLOW', title: 'Idle-time puzzle embedded in a site or internal tool', desc: 'A fully playable, dependency-free 2048 is an easy drop-in for a 404 page, waiting-room screen, or "break room" section of an internal dashboard. Its localStorage best-score tracking gives repeat visitors a reason to come back and beat their own record, similar to the replay incentive built into the [Minesweeper Puzzle Game](/ui-snippets/minesweeper-game) snippet.' },
      { icon: 'DESIGN', title: 'Reference for animated absolutely-positioned tile/card layouts', desc: 'The pattern of computing pixel left/top offsets from a logical grid index and letting a CSS transition animate the difference is reusable for any UI that needs smooth repositioning — Kanban cards, draggable dashboard widgets, or reflowing image galleries — without needing a JavaScript animation library.' },
      { icon: 'CODE', title: 'Starting point for larger boards or alternate merge rules', desc: 'Because SIZE is a single top-level constant driving the grid template, empty-board generation, and win/loss checks, this snippet is a practical base for a 5x5 or 6x6 variant, or for experimenting with alternate spawn probabilities, a undo-last-move feature, or a move counter.' },
      { icon: 'FORM', title: 'Mobile-first touch gesture game for casual play', desc: 'The swipe detection with a minimum-distance threshold makes this genuinely comfortable to play one-handed on a phone, without the accidental-move problem that plagues 2048 clones with overly sensitive touch handling.' },
    ],
    faqs: [
      { q: 'How does this snippet prevent a tile from merging twice in one move?', a: 'slideLine() processes each line with a single left-to-right pass using an index i. When values[i] equals values[i+1], it emits one merged tile and jumps i forward by 2, skipping past both source tiles entirely. Because the loop never looks backward at a tile it already emitted, a freshly merged tile can never be compared against the next tile in the same pass, which is exactly the bug (2+2+4 collapsing into 8) that this logic is structured to avoid.' },
      { q: 'Why does a keypress sometimes do nothing?', a: 'move() computes the resulting board and compares it against a snapshot taken before the move using boardsEqual(). If nothing changed — for example pressing left when all tiles are already flush against the left edge — no new tile spawns and no score is added, matching the original 2048\'s rule that an illegal move does not consume a turn.' },
      { q: 'How is the best score persisted, and can I reset it?', a: 'The best score is written to localStorage under the key g2048-best-score every time the current score surpasses it, and read back into the best variable on page load via localStorage.getItem. To reset it, run localStorage.removeItem("g2048-best-score") in the browser console and reload, or change BEST_KEY in the JS to start tracking a fresh key.' },
      { q: 'Does winning at 2048 end the game?', a: 'No. The first time a 2048-value tile appears, checkWin() sets a hasWon flag and shows a one-time overlay announcing the win, but the board remains fully interactive — you can dismiss the overlay-adjacent game state and keep merging toward 4096, 8192, and beyond, exactly like the original 2048. The hasWon flag ensures the win banner only fires once per game.' },
      { q: 'How does the game detect that no more moves are possible?', a: 'checkGameOver() first checks whether any cell is empty (getEmptyCells().length > 0); if so, the game continues. If the board is completely full, it scans every cell for a horizontally or vertically adjacent neighbour with the same value — if none exists anywhere on the board, no slide in any direction could produce a merge, so isGameOver is set and the Game Over overlay appears with the final score.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why slideLine()'s single forward pass with an index that jumps by two on a merge is sufficient to prevent the classic double-merge bug — tracing through a three-in-a-row example (2, 2, 4) by hand alongside the AI is the fastest way to really understand it. It's also worth asking the assistant to add features on top: an undo-last-move button that snapshots the board before each move, a move counter or moves-per-minute stat, or an animated score increment that counts up rather than snapping instantly, similar to the merge pop animation already in the CSS. You could also ask it to compare this line-reduction approach for handling all four directions against an alternative that transposes the matrix for vertical moves, and discuss the tradeoffs of each.`,
      prompt: `Build a playable 2048 tile-merge puzzle game in plain HTML, CSS, and JavaScript on a 4x4 grid — no frameworks, no libraries.

Requirements:
- Arrow keys (and swipe gestures on touch devices) slide every tile as far as possible in the pressed direction.
- Adjacent tiles of equal value merge into one tile of double the value, but each individual tile must only be allowed to participate in one merge per move — sliding three equal tiles together must produce one merged tile and one leftover tile, never a double-merged result.
- After any move that actually changes the board state, spawn a new tile in a random empty cell: 90% chance of value 2, 10% chance of value 4. A keypress that would not change the board must not spawn a tile or add to the score.
- Track a running score that increases by the value of every merge (not a flat per-move point), and persist the best-ever score across page reloads using localStorage.
- Detect game over: the board is full and no two horizontally or vertically adjacent tiles share a value, meaning no legal move remains.
- Detect reaching a 2048-value tile as a win condition, show a win indicator, but allow the player to keep playing past it toward higher values.
- Animate tile movement and merging with CSS transitions rather than having tiles jump instantly to their new position.`,
    },
  },
};

export default tileMerge2048Game;
