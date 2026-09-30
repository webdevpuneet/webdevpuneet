const nonogramPuzzleGame = {
  id: 'nonogram-puzzle-game',
  title: 'Nonogram Puzzle Game',
  category: 'games',
  html: `<div class="ng-app">
  <div class="ng-header">
    <h2>Nonogram</h2>
    <div class="stats">
      <div class="stat"><span class="stat-label">Filled</span><span class="stat-val" id="ng-filled">0</span></div>
      <div class="stat"><span class="stat-label">Mistakes</span><span class="stat-val" id="ng-mistakes">0</span></div>
    </div>
  </div>

  <p class="ng-goal" id="ng-goal">Left-click to fill a cell, right-click (or long-press) to mark it empty. Match the row and column clue numbers.</p>

  <div class="ng-board" id="ng-board"></div>

  <div class="ng-actions">
    <button class="ghost-btn" id="ng-new">New Puzzle</button>
    <button class="ghost-btn" id="ng-clear">Clear Marks</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.ng-app { max-width: 420px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; align-items: center; gap: 14px; }

.ng-header { width: 100%; display: flex; align-items: center; justify-content: space-between; }
.ng-header h2 { font-size: 19px; font-weight: 800; color: #1e293b; }

.stats { display: flex; gap: 10px; }
.stat { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px 14px; min-width: 60px; text-align: center; }
.stat-label { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #94a3b8; }
.stat-val { display: block; font-size: 15px; font-weight: 800; color: #6366f1; }

.ng-goal { font-size: 12px; color: #475569; text-align: center; line-height: 1.6; }
.ng-goal.win { color: #16a34a; font-weight: 800; font-size: 13px; }

.ng-board {
  display: inline-grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; gap: 4px;
  user-select: none; -webkit-user-select: none;
}
.ng-corner { }
.ng-col-clues { display: flex; }
.ng-row-clues { display: flex; flex-direction: column; }
.ng-grid { display: grid; }

.ng-col-clue, .ng-row-clue {
  display: flex; align-items: flex-end; justify-content: center;
  font-size: 10px; font-weight: 700; color: #475569; line-height: 1.1;
  flex-direction: column; text-align: center;
}
.ng-row-clue { align-items: center; justify-content: flex-end; flex-direction: row; gap: 3px; padding-right: 4px; }

.ng-cell {
  border: 1px solid #e2e8f0; background: #fff; cursor: pointer;
  transition: background 0.08s;
}
.ng-cell:hover { background: #eef2ff; }
.ng-cell.filled { background: #6366f1; border-color: #6366f1; }
.ng-cell.marked { background: #f1f5f9; position: relative; }
.ng-cell.marked::after {
  content: '\\2715'; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center;
  color: #cbd5e1; font-size: 10px;
}
.ng-cell.block-r { border-right-width: 2px; border-right-color: #94a3b8; }
.ng-cell.block-b { border-bottom-width: 2px; border-bottom-color: #94a3b8; }

.ghost-btn {
  background: none; border: 1.5px solid #e2e8f0; border-radius: 10px;
  padding: 8px 16px; font-size: 12px; font-weight: 700; color: #475569;
  cursor: pointer; font-family: inherit; transition: border-color 0.15s, color 0.15s;
}
.ghost-btn:hover { border-color: #6366f1; color: #6366f1; }`,
  js: `const SIZE = 6;
const CELL = 34;

// A small library of hand-picked 6x6 solutions (true = filled). Each solve
// draws the next puzzle from this pool, so the game genuinely varies while
// every puzzle is guaranteed to have a valid, unique-looking picture.
const PUZZLES = [
  [
    [0,0,1,1,0,0],
    [0,1,1,1,1,0],
    [1,1,0,0,1,1],
    [1,1,1,1,1,1],
    [0,1,0,0,1,0],
    [0,1,0,0,1,0],
  ],
  [
    [0,1,1,1,1,0],
    [1,0,0,0,0,1],
    [1,0,1,1,0,1],
    [1,0,0,0,0,1],
    [1,0,1,0,1,1],
    [0,1,1,1,1,0],
  ],
  [
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
    [0,0,1,1,0,0],
    [0,0,1,1,0,0],
    [1,1,0,0,1,1],
    [1,1,0,0,1,1],
  ],
  [
    [0,0,0,1,0,0],
    [0,0,1,1,1,0],
    [0,1,1,1,1,1],
    [0,0,1,1,1,0],
    [0,1,1,1,1,1],
    [1,1,0,1,0,1],
  ],
];

let solution = [];
let state = []; // 0 = empty, 1 = filled, 2 = marked-empty
let mistakes = 0;
let won = false;

const boardEl = document.getElementById('ng-board');
const filledEl = document.getElementById('ng-filled');
const mistakesEl = document.getElementById('ng-mistakes');
const goalEl = document.getElementById('ng-goal');

function runsFor(line) {
  const runs = [];
  let count = 0;
  for (const v of line) {
    if (v === 1) count++;
    else { if (count) runs.push(count); count = 0; }
  }
  if (count) runs.push(count);
  return runs.length ? runs : [0];
}

function rowClue(r) { return runsFor(solution[r]); }
function colClue(c) { return runsFor(solution.map(row => row[c])); }

function buildBoard() {
  boardEl.innerHTML = '';
  boardEl.style.gridTemplateColumns = 'auto ' + (SIZE * CELL) + 'px';

  const corner = document.createElement('div');
  corner.className = 'ng-corner';
  boardEl.appendChild(corner);

  const colCluesWrap = document.createElement('div');
  colCluesWrap.className = 'ng-col-clues';
  for (let c = 0; c < SIZE; c++) {
    const cell = document.createElement('div');
    cell.className = 'ng-col-clue';
    cell.style.width = CELL + 'px';
    cell.style.height = '38px';
    colClue(c).forEach(n => {
      const line = document.createElement('span');
      line.textContent = n;
      cell.appendChild(line);
    });
    colCluesWrap.appendChild(cell);
  }
  boardEl.appendChild(colCluesWrap);

  const rowCluesWrap = document.createElement('div');
  rowCluesWrap.className = 'ng-row-clues';
  for (let r = 0; r < SIZE; r++) {
    const cell = document.createElement('div');
    cell.className = 'ng-row-clue';
    cell.style.height = CELL + 'px';
    cell.style.width = '46px';
    cell.textContent = rowClue(r).join(' ');
    rowCluesWrap.appendChild(cell);
  }
  boardEl.appendChild(rowCluesWrap);

  const grid = document.createElement('div');
  grid.className = 'ng-grid';
  grid.style.gridTemplateColumns = 'repeat(' + SIZE + ', ' + CELL + 'px)';
  grid.style.gridTemplateRows = 'repeat(' + SIZE + ', ' + CELL + 'px)';
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const cell = document.createElement('div');
      cell.className = 'ng-cell';
      if ((c + 1) % 3 === 0 && c !== SIZE - 1) cell.classList.add('block-r');
      if ((r + 1) % 3 === 0 && r !== SIZE - 1) cell.classList.add('block-b');
      cell.addEventListener('click', () => onCellClick(r, c));
      cell.addEventListener('contextmenu', (e) => { e.preventDefault(); onCellRightClick(r, c); });
      grid.appendChild(cell);
    }
  }
  boardEl.appendChild(grid);
}

function renderCells() {
  const cells = boardEl.querySelectorAll('.ng-grid .ng-cell');
  cells.forEach((cell, i) => {
    const r = Math.floor(i / SIZE), c = i % SIZE;
    cell.classList.toggle('filled', state[r][c] === 1);
    cell.classList.toggle('marked', state[r][c] === 2);
  });
}

function onCellClick(r, c) {
  if (won || state[r][c] !== 0) return;
  if (solution[r][c] === 1) {
    state[r][c] = 1;
  } else {
    state[r][c] = 2;
    mistakes++;
    mistakesEl.textContent = String(mistakes);
  }
  afterMove();
}

function onCellRightClick(r, c) {
  if (won) return;
  if (state[r][c] === 0) state[r][c] = 2;
  else if (state[r][c] === 2) state[r][c] = 0;
  afterMove();
}

function afterMove() {
  renderCells();
  const filledCount = state.flat().filter(v => v === 1).length;
  filledEl.textContent = String(filledCount);
  checkWin();
}

function checkWin() {
  for (let r = 0; r < SIZE; r++) {
    for (let c = 0; c < SIZE; c++) {
      const shouldBeFilled = solution[r][c] === 1;
      const isFilled = state[r][c] === 1;
      if (shouldBeFilled !== isFilled) return;
    }
  }
  won = true;
  goalEl.textContent = 'Solved! Every filled cell matches the picture, with ' + mistakes + ' mistake' + (mistakes === 1 ? '' : 's') + '.';
  goalEl.className = 'ng-goal win';
}

function newPuzzle() {
  solution = PUZZLES[Math.floor(Math.random() * PUZZLES.length)];
  state = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  mistakes = 0;
  won = false;
  filledEl.textContent = '0';
  mistakesEl.textContent = '0';
  goalEl.textContent = 'Left-click to fill a cell, right-click (or long-press) to mark it empty. Match the row and column clue numbers.';
  goalEl.className = 'ng-goal';
  buildBoard();
  renderCells();
}

function clearMarks() {
  if (won) return;
  state = Array.from({ length: SIZE }, () => Array(SIZE).fill(0));
  mistakes = 0;
  mistakesEl.textContent = '0';
  filledEl.textContent = '0';
  renderCells();
}

document.getElementById('ng-new').addEventListener('click', newPuzzle);
document.getElementById('ng-clear').addEventListener('click', clearMarks);

newPuzzle();`,
  seo: {
    title: 'Nonogram Puzzle Game — Free HTML CSS JS Snippet',
    description: 'A playable 6x6 nonogram (picross) picture logic puzzle with auto-generated row/column clues, right-click empty marking, and live win detection. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Nonogram Puzzle Game — Picross Picture Logic Puzzle with Auto-Generated Clues',
      description: `A nonogram (also called picross or griddler) is a picture logic puzzle: every row and column is labeled with a sequence of numbers representing the lengths of consecutive filled-cell runs in that line, and the solver must deduce which cells to fill purely from those numbers until a hidden picture emerges. This snippet implements a real, playable 6x6 nonogram — clues are computed programmatically from an actual solution grid, not hand-typed, and the win condition checks the full grid against that solution.

**Clues are derived from the solution, not authored separately**

Rather than storing clue numbers as separate data (which risks the clues and the picture disagreeing), \`runsFor(line)\` computes them directly from a boolean row or column: it walks the line counting consecutive \`1\`s, pushing each run's length to an array whenever a \`0\` (or the line's end) breaks a run. \`rowClue(r)\` calls this on \`solution[r]\` directly; \`colClue(c)\` first transposes a column out of the row-based \`solution\` array with \`solution.map(row => row[c])\` and runs the identical function. This guarantees the displayed clues are always exactly correct for whichever solution grid is loaded — there is no possibility of the clues and the actual picture drifting out of sync.

**Two-state cell interaction: fill and mark-empty**

A cell has three possible states — \`0\` (untouched), \`1\` (filled), \`2\` (marked empty, shown as an X). Left-click (\`onCellClick\`) fills a cell if the solution says it should be filled, or marks it empty (and increments the mistake counter) if it shouldn't — giving immediate right/wrong feedback rather than letting an error sit undetected until the final check. Right-click (\`onCellRightClick\`, with \`preventDefault()\` to suppress the browser context menu) toggles a manual empty-mark independently of correctness, which is how experienced nonogram solvers cross off cells they've logically eliminated without committing to filling them.

**A small pool of hand-authored solutions**

\`PUZZLES\` holds several complete 6x6 boolean solution grids, each hand-drawn to form a recognizable simple shape. \`newPuzzle()\` picks one at random, so replaying the game produces genuinely different puzzles rather than the same picture every time, while every puzzle in the pool is guaranteed solvable and correctly clued since the clues are always derived live from whichever grid was picked.

**3x3 block dividers for readability**

Standard nonograms mark every third row and column with a slightly heavier grid line so the eye can count cells in groups instead of one at a time — this snippet reproduces that with \`.block-r\`/\`.block-b\` classes applied every third cell, purely a readability aid with no effect on game logic.

**Win detection against the true solution**

\`checkWin()\` compares every cell's \`state\` against \`solution\` directly — a cell counts as solved only if \`state[r][c] === 1\` exactly matches \`solution[r][c] === 1\`; marked-empty cells (\`state === 2\`) are correct as long as the solution agrees they should be empty. The moment every cell matches, the puzzle is marked won and a message reports the player's total mistake count.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the row and column clue numbers', text: 'Each number sequence tells you the length of consecutive filled-cell runs in that row or column, in order.' },
        { title: 'Left-click to fill a cell', text: 'If the cell should be filled, it turns indigo. If not, it is marked with an X and counts as a mistake.' },
        { title: 'Right-click to mark a cell empty', text: 'Cross off cells you have logically ruled out without risking a mistake — this toggle does not affect your mistake count.' },
        { title: 'Watch the filled and mistake counters', text: 'The header tracks how many cells are currently filled and how many incorrect fills you have made this puzzle.' },
        { title: 'Solve to reveal the picture', text: 'The puzzle is automatically detected as solved the instant every cell matches the hidden solution grid.' },
        { title: 'Load a new puzzle', text: 'Click "New Puzzle" to draw a different random solution from the built-in pool, or "Clear Marks" to reset the current puzzle\'s cells without changing the picture.' },
      ],
    },
    features: [
      'Row and column clues computed live from the solution grid via a run-length function — never hand-typed or able to drift out of sync',
      'Three-state cells: untouched, filled, and marked-empty, each with distinct styling',
      'Left-click fill gives immediate right/wrong feedback and increments a live mistake counter on an incorrect fill',
      'Right-click (or long-press) toggles a mistake-free empty mark for logically eliminated cells',
      'A small pool of hand-authored 6x6 solution grids selected at random for real replay variety',
      '3x3 heavier grid-line dividers matching standard nonogram readability conventions',
      'Win detection compares the full grid against the true solution, not just the filled-cell count',
      'Context menu suppressed on right-click so marking works cleanly without an unwanted browser menu',
    ],
    useCases: [
      { icon: 'GAME', title: 'Logic puzzle game collections', desc: 'A picture-deduction puzzle structurally different from stacking or matching games, pairing well with the [Mini Sudoku Game](/ui-snippets/mini-sudoku-game/) or [Lights Out Puzzle Game](/ui-snippets/lights-out-puzzle-game/) in a puzzle games section.' },
      { icon: 'LEARN', title: 'Teaching run-length encoding', desc: 'runsFor() is a compact, readable real-world example of run-length encoding applied to a boolean sequence — a useful concept well beyond nonograms alone.' },
      { icon: 'APP', title: 'Daily puzzle or brain-training apps', desc: 'The random-pick-from-a-pool pattern in newPuzzle() is a direct starting point for a "puzzle of the day" feature once expanded with a larger authored puzzle set.' },
      { icon: 'CODE', title: 'Reference for solution-derived UI', desc: 'Deriving displayed clues from the underlying data (rather than storing them redundantly) is a broadly useful pattern for any UI that must never let its labels drift out of sync with its source data.' },
      { icon: 'DESIGN', title: 'Grid-with-margin-labels layout reference', desc: 'The corner/column-clues/row-clues/grid four-quadrant CSS grid layout is reusable for any spreadsheet-like UI needing synchronized row and column headers.' },
    ],
    faqs: [
      { q: 'How are the row and column clue numbers generated?', a: 'runsFor(line) walks a boolean array counting consecutive filled (1) cells, pushing each run\'s length to a results array whenever a 0 or the end of the line breaks the run. rowClue() calls this directly on a solution row; colClue() first builds a column array with solution.map(row => row[c]) and runs the identical function, so clues are always computed live from the true solution rather than authored by hand.' },
      { q: 'What is the difference between left-click and right-click?', a: 'Left-click attempts to fill a cell: if the solution agrees it should be filled, it fills correctly; if not, it is marked with an X and counts as a mistake. Right-click toggles a manual empty-mark (also shown as an X) that never counts as a mistake, regardless of whether the cell should actually be filled — this is the standard nonogram technique for crossing off cells you have deduced must be empty.' },
      { q: 'How does the game know when the puzzle is solved?', a: 'checkWin() compares every cell in state against the true solution grid: a cell counts as correctly solved if being filled (state === 1) exactly matches whether the solution says that cell should be filled. The instant every cell in the grid agrees, the puzzle is marked won.' },
      { q: 'How do I add more puzzles?', a: 'Add another 6x6 array of 0s and 1s to the PUZZLES array in the JS panel — no separate clue data is needed, since rowClue() and colClue() compute clues automatically from whatever solution grid is loaded.' },
      { q: 'Can I make a larger grid?', a: 'Yes — change the SIZE constant and add correspondingly larger (SIZE x SIZE) solution grids to PUZZLES. The clue-generation, rendering, and win-check logic are all written generically against SIZE rather than hardcoded to 6.' },
      { q: 'Why is there a separate mistake counter from the filled counter?', a: 'The filled counter (from state.flat().filter(v => v === 1).length) shows raw progress, while mistakes only increments on an incorrect left-click fill — separating "how much have I done" from "how accurately am I solving it" gives more useful feedback than either number alone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how runsFor() turns a boolean row or column into the clue numbers shown in the header, and why deriving clues from the solution at render time instead of storing them separately eliminates an entire class of "clues don't match the picture" bugs. It's also a good candidate for extension — ask it to add a solvability checker that verifies each new puzzle has a logically deducible (not just guessable) solution, add a hint button that reveals one correct cell, or generate a much larger pool of solution grids algorithmically instead of hand-authoring each one.`,
      prompt: `Build a playable nonogram (picross) picture logic puzzle in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Store one or more complete boolean solution grids (e.g. 6x6 arrays of 0/1) representing hidden pictures, and pick one at random each new game.
- Compute every row's and every column's clue numbers programmatically from the solution grid itself using run-length logic (consecutive filled-cell run lengths, in order) — do not hand-author or separately store the clue numbers, since they must always exactly match whichever solution is loaded.
- Render the row clues to the left of the grid and the column clues above it, in a layout where the clue labels stay aligned with their corresponding grid row or column.
- Support three cell states: untouched, filled, and marked-empty. Left-clicking an untouched cell fills it if the solution says it should be filled, or marks it empty (with a visible X) and increments a mistake counter if the solution says it should not be filled. Right-clicking (with the browser's default context menu suppressed) toggles a manual empty-mark on any untouched or marked cell without ever counting as a mistake.
- Detect the win condition by comparing every cell's current state against the true solution grid, and the instant every cell agrees, show a clear "solved" message including the total mistake count for that puzzle.
- Add a heavier grid line every third row and every third column purely for visual grouping, matching standard nonogram readability conventions.
- Include a "New Puzzle" control that picks a new random solution and fully resets the board, and a separate "Clear Marks" control that resets only the current puzzle's cell states without changing which solution is loaded.`,
    },
  },
};

export default nonogramPuzzleGame;
