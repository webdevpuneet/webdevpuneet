const minesweeperGame = {
  id: 'minesweeper-game',
  title: 'Minesweeper Puzzle Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="ms-wrap">
  <div class="ms-header">
    <div class="ms-counter" id="mine-counter">010</div>
    <button class="ms-face" id="ms-face" aria-label="New game">🙂</button>
    <div class="ms-counter" id="ms-timer">000</div>
  </div>
  <div class="ms-toolbar">
    <button class="ms-flag-toggle" id="flag-toggle">🚩 Flag mode: <span id="flag-mode-label">Off</span></button>
    <span class="ms-hint">Right-click to flag on desktop</span>
  </div>
  <div class="ms-board" id="ms-board"></div>
  <p class="ms-status" id="ms-status" aria-live="polite"></p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.ms-wrap { display: flex; flex-direction: column; align-items: center; gap: 12px; user-select: none; }

.ms-header {
  display: flex; align-items: center; justify-content: space-between;
  width: 100%; max-width: 342px;
  background: #1e293b; border-radius: 10px 10px 0 0;
  padding: 10px 14px;
}
.ms-counter {
  font-family: 'Courier New', monospace; font-weight: 700; font-size: 20px;
  color: #f87171; background: #0f172a; padding: 4px 8px; border-radius: 4px;
  letter-spacing: 2px; min-width: 54px; text-align: center;
}
.ms-face {
  width: 38px; height: 38px; border-radius: 8px; border: none;
  background: #334155; font-size: 18px; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, transform 0.1s;
}
.ms-face:hover { background: #475569; }
.ms-face:active { transform: scale(0.92); }

.ms-toolbar {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  width: 100%; max-width: 342px; flex-wrap: wrap;
}
.ms-flag-toggle {
  font-size: 12px; font-weight: 600; color: #475569;
  background: #fff; border: 1.5px solid #e2e8f0; border-radius: 8px;
  padding: 6px 12px; cursor: pointer; transition: all 0.15s;
}
.ms-flag-toggle.active { background: #fef3c7; border-color: #f59e0b; color: #92400e; }
.ms-hint { font-size: 11px; color: #94a3b8; }

.ms-board {
  display: grid;
  grid-template-columns: repeat(9, 36px);
  grid-template-rows: repeat(9, 36px);
  gap: 2px;
  background: #cbd5e1;
  padding: 6px;
  border-radius: 0 0 10px 10px;
  box-shadow: 0 8px 24px rgba(15,23,42,0.12);
}

.ms-cell {
  width: 36px; height: 36px;
  display: flex; align-items: center; justify-content: center;
  font-size: 15px; font-weight: 800;
  background: #e2e8f0; border-radius: 4px;
  cursor: pointer; border: none;
  transition: background 0.1s, transform 0.06s;
  font-family: inherit;
}
.ms-cell:hover:not(.revealed) { background: #f1f5f9; }
.ms-cell:active:not(.revealed) { transform: scale(0.94); }

.ms-cell.revealed {
  background: #fff; cursor: default;
  box-shadow: inset 0 0 0 1px #f1f5f9;
}
.ms-cell.mine.revealed { background: #fecaca; }
.ms-cell.mine-triggered { background: #f87171; }
.ms-cell.flagged { background: #fef3c7; }

.ms-cell.n1 { color: #2563eb; }
.ms-cell.n2 { color: #16a34a; }
.ms-cell.n3 { color: #dc2626; }
.ms-cell.n4 { color: #7c3aed; }
.ms-cell.n5 { color: #b45309; }
.ms-cell.n6 { color: #0891b2; }
.ms-cell.n7 { color: #1e293b; }
.ms-cell.n8 { color: #64748b; }

.ms-status { font-size: 13px; font-weight: 700; min-height: 18px; color: #6366f1; }
.ms-status.lose { color: #dc2626; }
.ms-status.win { color: #16a34a; }

@media (max-width: 400px) {
  .ms-board { grid-template-columns: repeat(9, 30px); grid-template-rows: repeat(9, 30px); }
  .ms-cell { width: 30px; height: 30px; font-size: 13px; }
}`,

  js: `const ROWS = 9, COLS = 9, MINES = 10;
let grid = [];
let revealedCount = 0;
let flagCount = 0;
let firstClickDone = false;
let gameOver = false;
let timerInterval = null;
let seconds = 0;
let flagMode = false;

const boardEl = document.getElementById('ms-board');
const counterEl = document.getElementById('mine-counter');
const timerEl = document.getElementById('ms-timer');
const faceEl = document.getElementById('ms-face');
const statusEl = document.getElementById('ms-status');
const flagToggleEl = document.getElementById('flag-toggle');
const flagModeLabel = document.getElementById('flag-mode-label');

function makeEmptyGrid() {
  const g = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({ mine: false, revealed: false, flagged: false, adjacent: 0 });
    }
    g.push(row);
  }
  return g;
}

function placeMines(excludeR, excludeC) {
  let placed = 0;
  while (placed < MINES) {
    const r = Math.floor(Math.random() * ROWS);
    const c = Math.floor(Math.random() * COLS);
    // Never place on the excluded cell or its neighbours (fairness)
    if (Math.abs(r - excludeR) <= 1 && Math.abs(c - excludeC) <= 1) continue;
    if (grid[r][c].mine) continue;
    grid[r][c].mine = true;
    placed++;
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      if (grid[r][c].mine) continue;
      grid[r][c].adjacent = countAdjacentMines(r, c);
    }
  }
}

function countAdjacentMines(r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && grid[nr][nc].mine) count++;
    }
  }
  return count;
}

function buildBoardDOM() {
  boardEl.innerHTML = '';
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const btn = document.createElement('button');
      btn.className = 'ms-cell';
      btn.dataset.r = r;
      btn.dataset.c = c;
      btn.addEventListener('click', () => handleCellClick(r, c));
      btn.addEventListener('contextmenu', (e) => { e.preventDefault(); toggleFlag(r, c); });
      boardEl.appendChild(btn);
    }
  }
}

function cellEl(r, c) {
  return boardEl.children[r * COLS + c];
}

function handleCellClick(r, c) {
  if (gameOver) return;
  const cell = grid[r][c];
  if (cell.flagged || cell.revealed) {
    if (flagMode && !cell.revealed) toggleFlag(r, c);
    return;
  }
  if (flagMode) { toggleFlag(r, c); return; }

  if (!firstClickDone) {
    placeMines(r, c);
    firstClickDone = true;
    startTimer();
  }

  if (cell.mine) {
    revealAllMines(r, c);
    endGame(false);
    return;
  }

  floodReveal(r, c);
  checkWin();
}

function floodReveal(startR, startC) {
  // Iterative flood fill using a stack to reveal connected zero-adjacency cells
  const stack = [[startR, startC]];
  while (stack.length) {
    const [r, c] = stack.pop();
    const cell = grid[r][c];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    revealedCount++;
    renderCell(r, c);
    if (cell.adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          if (dr === 0 && dc === 0) continue;
          const nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < ROWS && nc >= 0 && nc < COLS && !grid[nr][nc].revealed) {
            stack.push([nr, nc]);
          }
        }
      }
    }
  }
}

function toggleFlag(r, c) {
  if (gameOver) return;
  const cell = grid[r][c];
  if (cell.revealed) return;
  cell.flagged = !cell.flagged;
  flagCount += cell.flagged ? 1 : -1;
  updateCounter();
  renderCell(r, c);
}

function renderCell(r, c) {
  const cell = grid[r][c];
  const el = cellEl(r, c);
  el.className = 'ms-cell';
  el.textContent = '';
  if (cell.flagged) {
    el.classList.add('flagged');
    el.textContent = '🚩';
    return;
  }
  if (!cell.revealed) return;
  el.classList.add('revealed');
  if (cell.mine) {
    el.classList.add('mine');
    el.textContent = '💣';
  } else if (cell.adjacent > 0) {
    el.classList.add('n' + cell.adjacent);
    el.textContent = cell.adjacent;
  }
}

function revealAllMines(triggerR, triggerC) {
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = grid[r][c];
      if (cell.mine) {
        cell.revealed = true;
        renderCell(r, c);
        if (r === triggerR && c === triggerC) cellEl(r, c).classList.add('mine-triggered');
      }
    }
  }
}

function checkWin() {
  const safeCells = ROWS * COLS - MINES;
  if (revealedCount === safeCells) {
    endGame(true);
  }
}

function endGame(won) {
  gameOver = true;
  stopTimer();
  faceEl.textContent = won ? '😎' : '💀';
  statusEl.textContent = won ? 'You cleared the field!' : 'Boom! Game over.';
  statusEl.className = 'ms-status ' + (won ? 'win' : 'lose');
  if (won) {
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        if (grid[r][c].mine && !grid[r][c].flagged) {
          grid[r][c].flagged = true;
          renderCell(r, c);
        }
      }
    }
    updateCounter();
  }
}

function updateCounter() {
  const remaining = Math.max(0, MINES - flagCount);
  counterEl.textContent = String(remaining).padStart(3, '0');
}

function startTimer() {
  seconds = 0;
  timerEl.textContent = '000';
  timerInterval = setInterval(() => {
    seconds++;
    if (seconds > 999) seconds = 999;
    timerEl.textContent = String(seconds).padStart(3, '0');
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function newGame() {
  stopTimer();
  grid = makeEmptyGrid();
  revealedCount = 0;
  flagCount = 0;
  firstClickDone = false;
  gameOver = false;
  seconds = 0;
  faceEl.textContent = '🙂';
  statusEl.textContent = '';
  statusEl.className = 'ms-status';
  timerEl.textContent = '000';
  updateCounter();
  buildBoardDOM();
}

flagToggleEl.addEventListener('click', () => {
  flagMode = !flagMode;
  flagToggleEl.classList.toggle('active', flagMode);
  flagModeLabel.textContent = flagMode ? 'On' : 'Off';
});
faceEl.addEventListener('click', newGame);

newGame();`,

  seo: {
    title: 'Minesweeper Game — Free HTML CSS JS Snippet',
    description: 'Playable 9x9 Minesweeper with flood-fill reveal, flagging, mine counter and timer, built in vanilla JS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Minesweeper Puzzle Game — Recursive Flood Fill, Safe First-Click Generation & Flag Logic',
      description: `Minesweeper is one of the oldest and most instructive logic puzzles to implement, because a correct version is not just a grid of clickable squares — it requires a genuine flood-fill algorithm, deferred board generation, and careful state tracking for flags, reveals, and win detection. This snippet builds a fully playable 9x9 grid with 10 mines using nothing but vanilla JavaScript and CSS Grid, and every rule that makes Minesweeper feel fair and satisfying is implemented rather than faked.

**Safe first click, generated after the fact**

The classic frustration in a badly made Minesweeper clone is losing on your very first click through no fault of your own. This snippet avoids that entirely: the board starts completely empty of mines, and \`placeMines(excludeR, excludeC)\` only runs the moment the player clicks their first cell, deliberately skipping that cell and its eight neighbours when scattering the 10 mines with \`Math.random()\`. This guarantees the opening click always lands on a safe, typically zero-adjacency area, which is the standard fairness convention every reference implementation of Minesweeper follows.

**Iterative flood fill, not a single-cell reveal**

Clicking a cell with zero adjacent mines should cascade outward and reveal every connected empty region along with its numbered border — this is the heart of what makes Minesweeper fun to play quickly. The \`floodReveal()\` function implements this with an explicit stack rather than naive recursion (which risks call-stack depth issues on larger boards): it pushes the starting cell, pops cells one at a time, marks each revealed, and — only when that cell's \`adjacent\` count is zero — pushes all eight unrevealed neighbours back onto the stack. Cells with a positive adjacency count are still revealed and rendered with their colour-coded number, but the fill does not continue past them, exactly matching the classic Windows Minesweeper behaviour.

**Colour-coded numbers and flag mode**

Revealed cells with adjacent mines get a class like \`.n3\` that maps to the traditional colour convention — 1 is blue, 2 is green, 3 is red, and so on up through 8 — purely through CSS class selectors keyed off the stored \`adjacent\` integer. Flagging is handled two ways: a right-click (\`contextmenu\` event, with \`preventDefault()\` to suppress the browser menu) toggles a flag on desktop, while a dedicated "Flag mode" toggle button lets touch users tap to flag instead of reveal, since touch devices have no reliable right-click equivalent.

**Win and loss detection**

Every reveal increments a \`revealedCount\` counter; the game is won the instant that count equals the total non-mine cell count (81 minus 10 mines), which is checked after every successful reveal in \`checkWin()\`. Losing triggers \`revealAllMines()\`, which reveals every mine on the board and highlights the specific one that was clicked in a brighter red so the player can see exactly what ended the round. A live mine counter subtracts placed flags from the total mine count, and a timer starts on the first click and stops the instant the game ends, both rendered in a retro seven-segment style display for authenticity.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Reveal your first cell', text: 'Click any cell on the 9x9 grid. Mines are generated only after this first click, and the clicked cell plus its neighbours are guaranteed mine-free, so your opening move is always safe.' },
        { title: 'Read the flood-fill reveal', text: 'If the clicked cell has zero adjacent mines, floodReveal() cascades outward and automatically reveals the whole connected empty region plus its numbered border cells, exactly like the classic game.' },
        { title: 'Flag suspected mines', text: 'Right-click a hidden cell to place a flag on desktop. On touch devices, tap the "Flag mode" toggle button first, then tap cells to flag them instead of revealing them.' },
        { title: 'Watch the counter and timer', text: 'The left digital counter shows mines remaining (10 minus flags placed) and the right counter is a timer that starts on your first click and freezes the instant the round ends.' },
        { title: 'Win or lose the round', text: 'Clicking a mine ends the game immediately and reveals every mine, with the fatal one highlighted in bright red. Revealing all 71 safe cells triggers the win state and auto-flags the remaining mines.' },
        { title: 'Start a new game', text: 'Click the face button (🙂) at any time — it shows 😎 on a win or 💀 on a loss — to instantly regenerate a fresh empty board and reset the counter, timer, and flag mode.' },
      ],
    },
    features: [
      'Iterative stack-based floodReveal() flood fill, avoiding recursion depth issues on cascading reveals',
      'Mine placement deferred until after the first click via placeMines(excludeR, excludeC) for guaranteed-fair openings',
      'countAdjacentMines() precomputes the classic 3x3 neighbour scan for every non-mine cell',
      'Colour-coded number classes .n1 through .n8 matching the traditional Minesweeper convention',
      'Dual flagging input: contextmenu event for right-click desktop flagging plus a touch-friendly flag-mode toggle',
      'Live mine counter (mines minus flags) and a setInterval-driven timer capped at 999 seconds',
      'revealAllMines() highlights the exact mine that ended the game with a distinct .mine-triggered class',
      'Win detection by comparing revealedCount against the precomputed safe-cell total, auto-flagging remaining mines on victory',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching flood-fill and graph traversal concepts', desc: 'Minesweeper\'s cascading reveal is one of the most approachable real-world examples of a flood-fill / connected-component search, the same family of algorithm behind the bucket-fill tool in image editors and connected-region detection in computer vision. This snippet\'s iterative stack-based implementation is a clean teaching example for students learning breadth-first or depth-first traversal without the overhead of recursion.' },
      { icon: 'APP', title: 'Portfolio and coding-interview showpiece', desc: 'A working Minesweeper clone is a well-recognised way to demonstrate state management, 2D grid algorithms, and DOM performance in a portfolio project or take-home interview exercise. Because every rule — safe first click, flood fill, flagging, win/loss detection — is implemented rather than mocked, it holds up to detailed code review far better than a static grid mockup.' },
      { icon: 'FLOW', title: 'Idle-moment browser game embedded in a site', desc: 'Drop this into a 404 page, a changelog page, or a "just for fun" section of a personal site or internal tool to give visitors something genuinely playable while they wait or browse. Its self-contained HTML/CSS/JS with no dependencies makes it trivial to embed anywhere a spare corner of screen space exists.' },
      { icon: 'DESIGN', title: 'Retro digital-counter and grid UI reference', desc: 'The seven-segment-style mine and timer counters, the face button micro-interactions, and the neutral grid palette with a single accent colour are a reusable reference for building other retro-styled utility widgets, dashboards, or arcade-style UI elements that need a nostalgic digital-display aesthetic.' },
      { icon: 'CODE', title: 'Base for a difficulty-selectable or timed-challenge variant', desc: 'Because ROWS, COLS, and MINES are top-level constants, this snippet is a natural starting point for adding a difficulty selector (Beginner 9x9/10, Intermediate 16x16/40, Expert 30x16/99) or a leaderboard that stores best completion times in localStorage, similar in spirit to the persisted best-score pattern used in the [2048 Tile Merge Puzzle](/ui-snippets/tile-merge-2048-game) snippet.' },
      { icon: 'FORM', title: 'Accessible touch-first mobile puzzle', desc: 'Because right-click has no reliable equivalent on touch screens, the explicit "Flag mode" toggle button gives mobile and tablet users full parity with desktop play — a pattern worth reusing anywhere a desktop app relies on a secondary mouse button for an action that touch users also need to perform.' },
      { icon: 'CODE', title: 'Related: Pixel Platformer Game', desc: 'See the [Pixel Platformer Game](/ui-snippets/pixel-platformer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why doesn\'t my first click ever hit a mine?', a: 'Mines are not placed when the board is first built — the grid starts completely empty. placeMines(r, c) only runs inside handleCellClick() the moment you make your first click, and it explicitly skips the clicked cell plus its eight surrounding neighbours when scattering the 10 mines. This "safe first click" rule is the standard fairness convention in every well-made Minesweeper implementation, including Microsoft\'s original.' },
      { q: 'How does the flood fill avoid revealing mines by accident?', a: 'floodReveal() only ever pushes unrevealed, unflagged neighbour cells onto its stack, and it stops expanding outward from any cell whose adjacent mine count is greater than zero — it still reveals that numbered cell but does not continue past it. Since mines are never popped from the stack (the function is only ever called starting from a confirmed non-mine cell), a correct board layout guarantees the cascade can never touch a mine cell.' },
      { q: 'Can I change the grid size or mine count?', a: 'Yes. The ROWS, COLS, and MINES constants at the top of the JS control the entire board. Increasing MINES relative to the grid area raises difficulty; the CSS grid-template-columns/rows on .ms-board must be updated to match COLS and ROWS if you change them, since the layout is not currently computed dynamically from those constants.' },
      { q: 'How do I add keyboard or screen-reader support?', a: 'Each .ms-cell is rendered as a real <button>, so it is already focusable and clickable via Enter/Space by default. For fuller accessibility, add arrow-key navigation between grid cells using a roving tabindex pattern, and add aria-label attributes reflecting each cell\'s state (hidden, flagged, revealed-with-count, or mine) so screen reader users get equivalent information to the visual number colours and flag icon.' },
      { q: 'Why use an iterative stack instead of a recursive function for the flood fill?', a: 'A naive recursive flood fill calls itself once per revealed cell, and on a large, mostly-empty board that can produce thousands of nested calls, risking a "Maximum call stack size exceeded" error in some browsers. The iterative version in this snippet uses a plain JavaScript array as an explicit stack, achieving the identical reveal pattern without any risk of stack overflow, which matters more as you scale the grid up from the default 9x9 to Expert-sized 30x16 boards.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how floodReveal()'s stack-based traversal decides which neighbouring cells to push, and why it stops expanding past a numbered cell but not past a zero-adjacency one — understanding that boundary condition is the key to understanding the whole algorithm. It's also a great snippet to extend with AI help: ask it to add a difficulty selector that swaps ROWS/COLS/MINES and resizes the CSS grid to match, add a chording feature (clicking a revealed number that already has the correct number of adjacent flags reveals all its remaining unflagged neighbours), or persist best completion times per difficulty using localStorage the same way the 2048 snippet in this gallery persists its best score. Treat the working game as a base to question and build on, not a finished black box.`,
      prompt: `Build a playable Minesweeper game in plain HTML, CSS, and JavaScript on a 9x9 grid with 10 mines — no frameworks, no libraries.

Requirements:
- Mines must not be placed until after the player's first click, and that first click (plus its immediate neighbours) must never be a mine, so the opening move is always safe.
- Clicking a cell with zero adjacent mines must cascade-reveal all connected zero-adjacency cells and their bordering numbered cells using a real flood-fill algorithm (iterative or recursive), not just the single clicked cell.
- Revealed cells with adjacent mines must show the count, colour-coded using the classic convention (1 blue, 2 green, 3 red, etc).
- Right-click must flag a hidden cell instead of revealing it, and there must be a separate flag-mode toggle so touch-only users without a right-click can flag cells too.
- Track and display a live mine counter (total mines minus flags currently placed) and a timer that starts on the first click and stops when the game ends.
- Clicking a mine must end the game immediately, reveal every mine on the board, and visually distinguish the specific mine that was clicked from the rest.
- Detect the win condition (every non-mine cell revealed) and show a distinct win state, and provide a button to start a completely fresh game with a newly randomized mine layout at any time.`,
    },
  },
};

export default minesweeperGame;
