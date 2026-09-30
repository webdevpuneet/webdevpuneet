const wordSearchPuzzle = {
  id: 'word-search-puzzle',
  title: 'Word Search Puzzle Grid',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🔍</span>
      <h2>Word Search</h2>
    </div>
    <button class="btn btn-outline" id="btn-new-puzzle">New puzzle</button>
  </div>

  <div class="stat-row">
    <div class="stat-box"><span class="stat-label">Time</span><span class="stat-value" id="stat-time">0.0s</span></div>
    <div class="stat-box"><span class="stat-label">Found</span><span class="stat-value" id="stat-found">0 / 8</span></div>
  </div>

  <div class="puzzle-layout">
    <div class="grid-wrap">
      <div class="word-grid" id="word-grid"></div>
      <div class="win-overlay hidden" id="win-overlay">
        <div class="win-card">
          <p class="win-title">🎉 You found all 8 words!</p>
          <p class="win-detail" id="win-detail">Time: 0.0s</p>
          <button class="btn btn-primary" id="btn-play-again">New puzzle</button>
        </div>
      </div>
    </div>
    <div class="word-list" id="word-list"></div>
  </div>

  <p class="hint-text">Click and drag (or touch-drag) across letters to select a word</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 520px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 22px; }

.game-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; }
.game-title { display: flex; align-items: center; gap: 8px; }
.game-icon { font-size: 20px; }
.game-title h2 { font-size: 17px; font-weight: 700; color: #0f172a; }

.btn { padding: 9px 15px; font-size: 13px; font-weight: 700; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; }
.btn-outline { background: #fff; color: #475569; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }

.stat-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 16px; }
.stat-box { background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 10px; text-align: center; }
.stat-label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: #94a3b8; margin-bottom: 4px; }
.stat-value { display: block; font-size: 17px; font-weight: 800; color: #6366f1; font-variant-numeric: tabular-nums; }

.puzzle-layout { display: flex; gap: 16px; margin-bottom: 14px; flex-wrap: wrap; }

.grid-wrap { position: relative; flex: 1; min-width: 260px; }
.word-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 2px;
  background: #e2e8f0;
  border-radius: 10px;
  padding: 6px;
  user-select: none;
  aspect-ratio: 1 / 1;
}
.grid-cell {
  display: flex; align-items: center; justify-content: center;
  background: #fff;
  border-radius: 4px;
  font-size: 13px; font-weight: 700; color: #334155;
  cursor: pointer;
  transition: background 0.1s, color 0.1s;
}
.grid-cell.selecting { background: #c7d2fe; color: #3730a3; }
.grid-cell.found { background: #6366f1; color: #fff; }
.grid-cell.found-2 { background: #10b981; color: #fff; }
.grid-cell.found-3 { background: #f59e0b; color: #fff; }
.grid-cell.found-4 { background: #ec4899; color: #fff; }
.grid-cell.found-5 { background: #06b6d4; color: #fff; }
.grid-cell.found-6 { background: #8b5cf6; color: #fff; }
.grid-cell.found-7 { background: #ef4444; color: #fff; }
.grid-cell.found-8 { background: #84cc16; color: #1e293b; }

.word-list { flex: 0 0 130px; display: flex; flex-direction: column; gap: 6px; }
.word-item { font-size: 13px; font-weight: 600; color: #475569; padding: 6px 10px; border-radius: 8px; background: #f8fafc; border: 1px solid #eef2f7; transition: all 0.15s; }
.word-item.found { color: #16a34a; text-decoration: line-through; background: #f0fdf4; border-color: #bbf7d0; }

.win-overlay { position: absolute; inset: 0; background: rgba(15,23,42,0.78); border-radius: 10px; display: flex; align-items: center; justify-content: center; z-index: 5; }
.win-overlay.hidden { display: none; }
.win-card { background: #fff; border-radius: 14px; padding: 20px 24px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.win-title { font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.win-detail { font-size: 12px; color: #64748b; margin-bottom: 12px; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; }
.hidden { display: none !important; }

@media (max-width: 480px) {
  .puzzle-layout { flex-direction: column; }
  .word-list { flex-direction: row; flex-wrap: wrap; }
}`,

  js: `const SIZE = 10;
const WORDS = ['APPLE', 'RIVER', 'CLOUD', 'CHAIR', 'PLANT', 'STONE', 'LIGHT', 'BREAD'];
const DIRECTIONS = [
  { dx: 1, dy: 0 },   // horizontal
  { dx: 0, dy: 1 },   // vertical
  { dx: 1, dy: 1 },   // diagonal down-right
];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

let grid = [];
let placements = [];
let foundWords = new Set();
let selecting = false;
let selectionStart = null;
let selectionCells = [];
let startTime = 0;
let timerInterval = null;
let elapsed = 0;
let won = false;

const gridEl = document.getElementById('word-grid');
const wordListEl = document.getElementById('word-list');
const statTime = document.getElementById('stat-time');
const statFound = document.getElementById('stat-found');
const winOverlay = document.getElementById('win-overlay');
const winDetail = document.getElementById('win-detail');

function randInt(max) {
  return Math.floor(Math.random() * max);
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = randInt(i + 1);
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildPuzzle() {
  grid = Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  placements = [];

  const wordsToPlace = shuffle(WORDS);

  wordsToPlace.forEach((word, idx) => {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 200) {
      attempts++;
      const dir = DIRECTIONS[randInt(DIRECTIONS.length)];
      const maxX = SIZE - (dir.dx ? word.length : 1);
      const maxY = SIZE - (dir.dy ? word.length : 1);
      if (maxX < 0 || maxY < 0) continue;
      const startX = randInt(maxX + 1);
      const startY = randInt(maxY + 1);

      const cells = [];
      let fits = true;
      for (let i = 0; i < word.length; i++) {
        const x = startX + dir.dx * i;
        const y = startY + dir.dy * i;
        const existing = grid[y][x];
        if (existing !== null && existing !== word[i]) {
          fits = false;
          break;
        }
        cells.push({ x, y });
      }
      if (!fits) continue;

      cells.forEach((c, i) => { grid[c.y][c.x] = word[i]; });
      placements.push({ word, cells, index: idx + 1 });
      placed = true;
    }
  });

  // Fill remaining empty cells with random filler letters
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      if (grid[y][x] === null) grid[y][x] = ALPHABET[randInt(ALPHABET.length)];
    }
  }
}

function renderGrid() {
  gridEl.innerHTML = '';
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const cell = document.createElement('div');
      cell.className = 'grid-cell';
      cell.textContent = grid[y][x];
      cell.dataset.x = x;
      cell.dataset.y = y;
      gridEl.appendChild(cell);
    }
  }
}

function renderWordList() {
  wordListEl.innerHTML = '';
  placements.forEach(p => {
    const item = document.createElement('div');
    item.className = 'word-item' + (foundWords.has(p.word) ? ' found' : '');
    item.textContent = p.word;
    item.dataset.word = p.word;
    wordListEl.appendChild(item);
  });
}

function cellEl(x, y) {
  return gridEl.querySelector('[data-x="' + x + '"][data-y="' + y + '"]');
}

function clearSelectingClass() {
  gridEl.querySelectorAll('.grid-cell.selecting').forEach(el => el.classList.remove('selecting'));
}

function cellsBetween(a, b) {
  const dx = Math.sign(b.x - a.x);
  const dy = Math.sign(b.y - a.y);
  // Only allow straight horizontal, vertical, or diagonal lines
  if (Math.abs(b.x - a.x) !== Math.abs(b.y - a.y) && dx !== 0 && dy !== 0) return null;
  const len = Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) + 1;
  const cells = [];
  for (let i = 0; i < len; i++) {
    cells.push({ x: a.x + dx * i, y: a.y + dy * i });
  }
  return cells;
}

function updateSelection(x, y) {
  if (!selectionStart) return;
  const cells = cellsBetween(selectionStart, { x, y });
  if (!cells) return;
  clearSelectingClass();
  selectionCells = cells;
  cells.forEach(c => {
    const el = cellEl(c.x, c.y);
    if (el) el.classList.add('selecting');
  });
}

function selectionWord(cells) {
  return cells.map(c => grid[c.y][c.x]).join('');
}

function tryMatchSelection() {
  const forward = selectionWord(selectionCells);
  const backward = forward.split('').reverse().join('');
  const match = placements.find(p => !foundWords.has(p.word) && (p.word === forward || p.word === backward));
  if (match) {
    foundWords.add(match.word);
    const colorIndex = match.index;
    selectionCells.forEach(c => {
      const el = cellEl(c.x, c.y);
      if (el) {
        el.classList.remove('selecting');
        el.classList.add('found', 'found-' + colorIndex);
      }
    });
    renderWordList();
    statFound.textContent = foundWords.size + ' / ' + placements.length;
    if (foundWords.size === placements.length) handleWin();
  }
}

function handleWin() {
  won = true;
  clearInterval(timerInterval);
  winDetail.textContent = 'Time: ' + elapsed.toFixed(1) + 's';
  winOverlay.classList.remove('hidden');
}

function startSelection(x, y) {
  if (won) return;
  selecting = true;
  selectionStart = { x, y };
  selectionCells = [{ x, y }];
  clearSelectingClass();
  const el = cellEl(x, y);
  if (el) el.classList.add('selecting');
}

function endSelection() {
  if (!selecting) return;
  selecting = false;
  tryMatchSelection();
  clearSelectingClass();
  gridEl.querySelectorAll('.grid-cell.found').forEach(el => {}); // no-op, found cells keep their class
  selectionStart = null;
  selectionCells = [];
}

function coordsFromPoint(clientX, clientY) {
  const el = document.elementFromPoint(clientX, clientY);
  if (!el || !el.classList.contains('grid-cell')) return null;
  return { x: parseInt(el.dataset.x, 10), y: parseInt(el.dataset.y, 10) };
}

gridEl.addEventListener('mousedown', e => {
  const target = e.target.closest('.grid-cell');
  if (!target) return;
  startSelection(parseInt(target.dataset.x, 10), parseInt(target.dataset.y, 10));
});
gridEl.addEventListener('mousemove', e => {
  if (!selecting) return;
  const target = e.target.closest('.grid-cell');
  if (!target) return;
  updateSelection(parseInt(target.dataset.x, 10), parseInt(target.dataset.y, 10));
});
document.addEventListener('mouseup', endSelection);

gridEl.addEventListener('touchstart', e => {
  const t = e.touches[0];
  const coords = coordsFromPoint(t.clientX, t.clientY);
  if (coords) startSelection(coords.x, coords.y);
}, { passive: true });
gridEl.addEventListener('touchmove', e => {
  if (!selecting) return;
  const t = e.touches[0];
  const coords = coordsFromPoint(t.clientX, t.clientY);
  if (coords) updateSelection(coords.x, coords.y);
  e.preventDefault();
}, { passive: false });
document.addEventListener('touchend', endSelection);

function updateTimer() {
  elapsed = (Date.now() - startTime) / 1000;
  statTime.textContent = elapsed.toFixed(1) + 's';
}

function newPuzzle() {
  foundWords = new Set();
  won = false;
  elapsed = 0;
  selecting = false;
  selectionStart = null;
  selectionCells = [];
  statTime.textContent = '0.0s';
  winOverlay.classList.add('hidden');
  buildPuzzle();
  statFound.textContent = '0 / ' + placements.length;
  renderGrid();
  renderWordList();
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);
}

document.getElementById('btn-new-puzzle').addEventListener('click', newPuzzle);
document.getElementById('btn-play-again').addEventListener('click', newPuzzle);

newPuzzle();`,

  seo: {
    title: 'Word Search Puzzle Grid — Free HTML CSS JS Snippet',
    description: 'A real click-and-drag word search with 8 hidden words, straight-line matching and a timer. Exports to React, Vue, Angular & Tailwind snippets.',
    about: {
      title: 'Word Search Puzzle Grid — Click-and-Drag Word Placement, Straight-Line Matching, and Puzzle Generation',
      description: `Word search puzzles look simple from the player's side — find the hidden words in a grid of letters — but building one that actually works requires solving two distinct problems: placing words into a grid without illegal overlaps, and detecting a valid straight-line selection dragged across that grid. This snippet solves both from scratch in vanilla JavaScript, producing a genuinely playable 10×10 puzzle with eight target words, click-and-drag (and touch-drag) selection, and permanent per-word highlight colours.

**Placing words without silently failing**

\`buildPuzzle()\` iterates the word list in shuffled order and, for each word, repeatedly attempts a random placement: pick one of three directions — horizontal, vertical, or diagonal down-right — then pick a random starting cell constrained so the word fits fully inside the 10×10 bounds (\`maxX\`/\`maxY\` subtract the word's length from the grid size along the axis that direction moves). Before committing a placement, the code walks every cell the word would occupy and checks \`existing !== null && existing !== word[i]\` — meaning a placement is only rejected if a cell is already occupied by a **different** letter than the one this word needs there. This deliberately allows words to legitimately cross and share a letter (a common, expected word-search feature) while still preventing letter corruption. Each word gets up to 200 randomised attempts before giving up, which in practice is more than enough headroom for eight words of five letters on a 100-cell grid.

**Filling the gaps and the direction set**

After every word is placed, any grid cell still \`null\` is filled with a uniformly random letter from A-Z. The three supported directions — horizontal (dx:1, dy:0), vertical (dx:0, dy:1), and diagonal down-right (dx:1, dy:1) — cover the requested scope of straight lines in forward orientations without needing to support reversed/backwards placement, keeping the generation logic and the matching logic symmetric and simple.

**Detecting a valid drag selection**

As the player drags across the grid, \`cellsBetween(a, b)\` determines whether the current start and end cell form a legitimate straight line: it computes the sign of the x and y deltas (\`Math.sign\`) to get a per-step direction, then rejects the selection if the horizontal and vertical distances aren't equal (which would mean the drag isn't running along a true horizontal, vertical, or 45-degree diagonal). If the line is valid, it builds the ordered list of cells from start to end using that per-step direction — this is the same directional-stepping logic used by the placement algorithm, just running in reverse to validate rather than generate.

**Matching in either direction along the line**

On release, \`tryMatchSelection()\` reads the letters under the selected cells in order (\`selectionWord()\`) and also computes the reversed string, then checks both against the list of not-yet-found target words. This means a player can drag a horizontal word either left-to-right or right-to-left, and a vertical word either top-to-bottom or bottom-to-top, and it will still register correctly — natural behaviour for click-and-drag selection where the player doesn't necessarily know which end of a word they'll spot first.

**Distinct per-word highlight colours and persistent state**

Each placed word is assigned an index at generation time, and a found match adds both a shared \`.found\` class and a word-specific \`.found-N\` class (mapped to eight distinct accent colours in CSS) to its cells — so once a word is found, its path through the grid stays permanently and distinctly highlighted, and it's struck through in the sidebar checklist via \`renderWordList()\`. Touch support uses \`document.elementFromPoint()\` to resolve which grid cell is currently under the user's finger during a \`touchmove\`, since touch events don't naturally target the element being dragged over the way mouse events do.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Find a word by dragging across it',
          text: 'Click (or touch) the first letter of a word visible in the grid and drag to its last letter in a straight horizontal, vertical, or diagonal line. cellsBetween() validates the line is genuinely straight as you drag, highlighting the cells in light indigo.',
        },
        {
          title: 'Release to check your selection',
          text: 'Releasing the mouse or lifting your finger calls tryMatchSelection(), which reads the letters under your selection both forwards and backwards and compares them against the unfound target words — so you can drag in either direction along a word\'s line.',
        },
        {
          title: 'Watch words get permanently highlighted',
          text: 'A correct match adds a distinct colour class (found-1 through found-8) to that word\'s cells, which stays applied for the rest of the puzzle, and strikes the word through in the sidebar checklist via renderWordList().',
        },
        {
          title: 'Track your progress and time',
          text: 'The Found stat counts foundWords.size against the total word count, and the Time stat ticks up every 100ms from a setInterval started when the puzzle loads. Both reset automatically on New puzzle.',
        },
        {
          title: 'Complete the puzzle',
          text: 'Finding all 8 words triggers handleWin(), which stops the timer and shows a win overlay reporting your final elapsed time — click "New puzzle" on that overlay to immediately generate a fresh grid.',
        },
        {
          title: 'Generate a fresh grid at any time',
          text: 'Click "New puzzle" in the header to call newPuzzle(), which reshuffles word order, re-runs the random placement algorithm in buildPuzzle(), refills empty cells with new random letters, and resets found-word state, the timer, and the win overlay.',
        },
      ],
    },
    features: [
      'Randomised word placement across three straight directions (horizontal, vertical, diagonal) with legal letter-sharing overlap detection',
      'Up to 200 randomised placement attempts per word so all 8 target words reliably fit on the 10x10 grid',
      'Straight-line drag validation via cellsBetween(), rejecting any selection that isn\'t a true horizontal, vertical, or diagonal line',
      'Bidirectional word matching — a selection is checked both forwards and backwards against the target word list',
      'Distinct permanent highlight colour per found word (found-1 through found-8 classes) so completed words stay visually marked',
      'Unified mouse and touch input using document.elementFromPoint() to resolve the cell under a moving touch point',
      'Live sidebar checklist with strikethrough styling for found words, synced to the foundWords Set',
      'Live timer and found-count stats, both reset cleanly on New puzzle, with a win overlay reporting final completion time',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Classroom vocabulary and spelling reinforcement activity',
        desc: 'Word search puzzles are widely used in early education to reinforce spelling and word recognition through active visual scanning rather than passive reading. Swap the WORDS array for a themed vocabulary set (colours, animals, weather terms) matching a specific lesson, and the puzzle regenerates a new, still fully solvable layout on every "New puzzle" click.',
      },
      {
        icon: 'APP',
        title: 'Print-and-play or digital puzzle-book feature',
        desc: 'Digital puzzle collections and brain-training apps commonly include word search as one format alongside crosswords and sudoku. This snippet\'s generation algorithm can be reused to output puzzles for print (rendering the grid to canvas or an image) as well as the interactive digital version shown here, from the same underlying placement logic.',
      },
      {
        icon: 'FLOW',
        title: 'Themed seasonal or promotional mini-game for marketing pages',
        desc: 'Word searches are an easy, on-brand engagement mechanic for a seasonal landing page — swap in words tied to a product launch, holiday theme, or event name. Because the grid, timer, and completion state are all self-contained, it drops into any campaign page without a backend, similar in spirit to the [Word Unscramble Puzzle Game](/ui-snippets/word-unscramble-game) as a lightweight branded activity.',
      },
      {
        icon: 'DESIGN',
        title: 'Teaching drag-selection UX and multi-colour state visualization',
        desc: 'The click-and-drag selection pattern, with live highlighting during the drag and a permanent distinct colour on confirmation, generalises to spreadsheet-style cell selection, calendar range-picking, or any UI where a user selects a contiguous run of elements by dragging across them.',
      },
      {
        icon: 'LEARN',
        title: 'Learn constraint-based random placement and line-validation geometry',
        desc: 'This snippet demonstrates two reusable techniques: constraint-based random placement (retry-until-valid, common in procedural content generation) for fitting words into a grid without collisions, and Math.sign()-based line-direction detection for validating that a set of points forms a genuine straight line — both patterns extend well beyond word puzzles into any grid-based game logic.',
      },
      {
        icon: 'CODE',
        title: 'Base for an expanded puzzle with reversed words and scoring',
        desc: 'The placement and matching logic is deliberately scoped to forward horizontal, vertical, and diagonal directions — extending it to support backwards-placed words only requires adding negative dx/dy direction pairs to the DIRECTIONS array, since tryMatchSelection() already checks both forward and backward reads of a selection. A time-based or hint-penalty scoring system could layer on top the same way the Quick Math Arithmetic Game tracks accuracy.',
      },
    ],
    faqs: [
      {
        q: 'How does the puzzle guarantee all 8 words actually fit in the grid?',
        a: 'Each word gets up to 200 randomised placement attempts, trying a new random direction and starting position each time, and only committing a placement once every cell along the word\'s path is either empty or already holds the exact same letter the word needs there. With 8 words of five letters each on a 100-cell grid, this retry budget is comfortably more than enough in virtually all cases; if you significantly increase the word count or word length relative to grid size, you may need to raise the 200-attempt limit or the SIZE constant.',
      },
      {
        q: 'Why can I drag a word backwards and still have it register as found?',
        a: 'tryMatchSelection() computes both the forward string read from your selected cells and its character-reversed form, then checks each target word against both. This mirrors how people naturally play word search — you often spot the middle or end of a word before its start, and dragging in either direction along the correct line should count as finding it.',
      },
      {
        q: 'How do I add reversed diagonal directions (bottom-left to top-right)?',
        a: 'Add additional entries to the DIRECTIONS array, such as { dx: 1, dy: -1 } for diagonal up-right — buildPuzzle() already loops over whatever directions exist in that array when placing words, and no other placement code needs to change. Just make sure the maxX/maxY bounds logic in buildPuzzle() correctly accounts for negative dy when computing valid starting rows, since a word placed upward needs enough rows above its start point.',
      },
      {
        q: 'What happens if two words need to cross at incompatible letters?',
        a: 'The placement check existing !== null && existing !== word[i] rejects any placement where a cell is already filled with a different letter than the current word needs — so incompatible crossings are simply avoided by trying a different random position or direction on the next attempt, rather than corrupting an already-placed word. This is why placement uses many retry attempts rather than committing to the first randomly chosen position.',
      },
      {
        q: 'How does touch-drag selection work without native drag-and-drop APIs?',
        a: 'Touch events report only the coordinates of the touch point, not which DOM element it is currently over, so the snippet uses document.elementFromPoint(clientX, clientY) inside the touchmove handler to look up whichever .grid-cell element is currently beneath the finger and feeds those coordinates into the same updateSelection() logic used by mouse dragging — meaning mouse and touch share nearly all of the selection code past the initial coordinate lookup.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how buildPuzzle() places words with retry-based random placement, and how cellsBetween() and tryMatchSelection() together validate a straight-line drag and check it against the word list in both directions. It's a good candidate to extend — ask the assistant to add reversed diagonal directions (bottom-to-top, right-to-left) to the DIRECTIONS array, add a difficulty setting that changes grid size and word count together, implement a hint button that briefly flashes one letter of an unfound word, or add a shareable puzzle seed so two players can solve the exact same grid layout. You could also ask it to review the placement algorithm's retry logic for correctness at higher word counts, or help port the mouse/touch selection handling into a React component using refs instead of raw DOM queries. Use the conversation to genuinely understand and reshape the puzzle generation and matching logic, not just to copy the snippet unexamined.`,
      prompt: `Build a click-and-drag word search puzzle in plain HTML, CSS, and JavaScript with real word placement and straight-line selection matching — no frameworks or libraries.

Requirements:
- Generate a fixed-size letter grid (around 10x10) and randomly place a list of 6-8 target words along real straight lines: horizontal, vertical, and diagonal, in forward orientations only, using a retry-based random placement algorithm that allows legitimate letter overlaps between crossing words but never overwrites a cell with a conflicting letter.
- Fill every remaining empty cell with a random filler letter after all target words are placed.
- Support selecting a word by clicking-and-dragging with the mouse across a straight line of letters, with live visual highlighting of the currently selected cells as the drag progresses, and validate that the drag path is a genuine straight line (horizontal, vertical, or diagonal) before accepting it as a candidate selection.
- Support the same selection interaction via touch-drag on touch devices, resolving which grid cell is under the user's finger as it moves.
- On release, check whether the selected cell sequence spells one of the unfound target words when read in either direction along that line (forwards or backwards), and if so, permanently and distinctly highlight that word's cells (a different color per word is a nice touch) and mark it as found in a sidebar checklist.
- Track and display a live timer and a "words found" counter (e.g. "3 / 8"), and when every target word has been found, show a clear completion message including the total elapsed time.
- Provide a "New puzzle" control that regenerates the grid with a fresh random word placement and filler letters, resetting all found-word state and the timer.`,
    },
  },
};

export default wordSearchPuzzle;
