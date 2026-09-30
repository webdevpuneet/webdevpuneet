const mazeRunnerGame = {
  id: 'maze-runner-game',
  title: 'Maze Runner Arrow-Key Game',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="game-card">
  <div class="game-header">
    <div class="game-title">
      <span class="game-icon">🧭</span>
      <h2>Maze Runner</h2>
    </div>
    <button class="btn btn-outline" id="btn-new-maze">New maze</button>
  </div>

  <div class="stat-row">
    <div class="stat-box"><span class="stat-label">Time</span><span class="stat-value" id="stat-time">0.0s</span></div>
    <div class="stat-box"><span class="stat-label">Moves</span><span class="stat-value" id="stat-moves">0</span></div>
  </div>

  <div class="maze-wrap">
    <div class="maze-grid" id="maze-grid"></div>
    <div class="win-overlay hidden" id="win-overlay">
      <div class="win-card">
        <p class="win-title">🎉 You reached the goal!</p>
        <p class="win-detail" id="win-detail">Time: 0.0s · Moves: 0</p>
        <button class="btn btn-primary" id="btn-play-again">Play again</button>
      </div>
    </div>
  </div>

  <p class="hint-text">Use Arrow keys or WASD to move · reach the goal in the bottom-right corner</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.game-card { width: 100%; max-width: 460px; background: #fff; border-radius: 18px; border: 1px solid #e2e8f0; box-shadow: 0 12px 40px rgba(15,23,42,0.08); padding: 22px; }

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

.maze-wrap { position: relative; margin-bottom: 14px; }
.maze-grid {
  display: grid;
  gap: 0;
  background: #1e293b;
  border-radius: 12px;
  padding: 4px;
  aspect-ratio: 1 / 1;
  outline: none;
}
.maze-cell { position: relative; background: #1e293b; }
.maze-cell .cell-inner { position: absolute; inset: 1px; background: #f8fafc; }
.maze-cell.wall-top .cell-inner { top: 3px; }
.maze-cell.wall-right .cell-inner { right: 3px; }
.maze-cell.wall-bottom .cell-inner { bottom: 3px; }
.maze-cell.wall-left .cell-inner { left: 3px; }

.marker {
  position: absolute; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 60%; font-weight: 800; color: #fff;
  transition: left 0.12s ease, top 0.12s ease;
  z-index: 2;
}
.marker-player { background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.25); }
.marker-goal { background: #f59e0b; }

.win-overlay {
  position: absolute; inset: 0;
  background: rgba(15,23,42,0.72);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  z-index: 5;
}
.win-overlay.hidden { display: none; }
.win-card { background: #fff; border-radius: 14px; padding: 22px 26px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); }
.win-title { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
.win-detail { font-size: 13px; color: #64748b; margin-bottom: 14px; }

.hint-text { font-size: 11px; color: #94a3b8; text-align: center; }
.hidden { display: none !important; }`,

  js: `const SIZE = 13;
const CELL_PX = 26;

const N = 1, E = 2, S = 4, W = 8;
const OPPOSITE = { [N]: S, [E]: W, [S]: N, [W]: E };
const DX = { [N]: 0, [E]: 1, [S]: 0, [W]: -1 };
const DY = { [N]: -1, [E]: 0, [S]: 1, [W]: 0 };

let grid = [];
let playerX = 0, playerY = 0;
let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let moves = 0;
let won = false;

const gridEl = document.getElementById('maze-grid');
const statTime = document.getElementById('stat-time');
const statMoves = document.getElementById('stat-moves');
const winOverlay = document.getElementById('win-overlay');
const winDetail = document.getElementById('win-detail');

function generateMaze(size) {
  const cells = [];
  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) row.push({ walls: N | E | S | W, visited: false });
    cells.push(row);
  }

  const stack = [[0, 0]];
  cells[0][0].visited = true;

  while (stack.length) {
    const [cx, cy] = stack[stack.length - 1];
    const dirs = shuffleDirs();
    let moved = false;
    for (const dir of dirs) {
      const nx = cx + DX[dir];
      const ny = cy + DY[dir];
      if (nx < 0 || ny < 0 || nx >= size || ny >= size) continue;
      if (cells[ny][nx].visited) continue;
      cells[cy][cx].walls &= ~dir;
      cells[ny][nx].walls &= ~OPPOSITE[dir];
      cells[ny][nx].visited = true;
      stack.push([nx, ny]);
      moved = true;
      break;
    }
    if (!moved) stack.pop();
  }

  return cells;
}

function shuffleDirs() {
  const dirs = [N, E, S, W];
  for (let i = dirs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [dirs[i], dirs[j]] = [dirs[j], dirs[i]];
  }
  return dirs;
}

function renderMaze() {
  gridEl.innerHTML = '';
  gridEl.style.gridTemplateColumns = 'repeat(' + SIZE + ', 1fr)';
  gridEl.style.gridTemplateRows = 'repeat(' + SIZE + ', 1fr)';

  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      const cell = grid[y][x];
      const div = document.createElement('div');
      div.className = 'maze-cell';
      if (!(cell.walls & N)) div.classList.add('wall-top');
      if (!(cell.walls & E)) div.classList.add('wall-right');
      if (!(cell.walls & S)) div.classList.add('wall-bottom');
      if (!(cell.walls & W)) div.classList.add('wall-left');
      const inner = document.createElement('div');
      inner.className = 'cell-inner';
      div.appendChild(inner);
      gridEl.appendChild(div);
    }
  }

  const player = document.createElement('div');
  player.className = 'marker marker-player';
  player.id = 'player-marker';
  gridEl.appendChild(player);

  const goal = document.createElement('div');
  goal.className = 'marker marker-goal';
  goal.textContent = '★';
  gridEl.appendChild(goal);

  positionMarkers();
  const goalPct = (100 / SIZE);
  goal.style.width = goalPct + '%';
  goal.style.height = goalPct + '%';
  goal.style.left = ((SIZE - 1) * goalPct) + '%';
  goal.style.top = ((SIZE - 1) * goalPct) + '%';
}

function positionMarkers() {
  const player = document.getElementById('player-marker');
  const pct = (100 / SIZE);
  player.style.width = pct + '%';
  player.style.height = pct + '%';
  player.style.left = (playerX * pct) + '%';
  player.style.top = (playerY * pct) + '%';
}

function canMove(x, y, dir) {
  return !(grid[y][x].walls & dir);
}

function tryMove(dir) {
  if (won) return;
  if (!canMove(playerX, playerY, dir)) return;
  playerX += DX[dir];
  playerY += DY[dir];
  moves++;
  statMoves.textContent = moves;
  positionMarkers();
  if (playerX === SIZE - 1 && playerY === SIZE - 1) handleWin();
}

function handleWin() {
  won = true;
  clearInterval(timerInterval);
  winDetail.textContent = 'Time: ' + elapsed.toFixed(1) + 's · Moves: ' + moves;
  winOverlay.classList.remove('hidden');
}

function updateTimer() {
  elapsed = (Date.now() - startTime) / 1000;
  statTime.textContent = elapsed.toFixed(1) + 's';
}

function newMaze() {
  grid = generateMaze(SIZE);
  playerX = 0;
  playerY = 0;
  moves = 0;
  won = false;
  elapsed = 0;
  statMoves.textContent = '0';
  statTime.textContent = '0.0s';
  winOverlay.classList.add('hidden');
  renderMaze();
  clearInterval(timerInterval);
  startTime = Date.now();
  timerInterval = setInterval(updateTimer, 100);
}

const KEY_DIR = {
  ArrowUp: N, w: N, W: N,
  ArrowRight: E, d: E, D: E,
  ArrowDown: S, s: S, S: S,
  ArrowLeft: W, a: W, A: W,
};

document.addEventListener('keydown', e => {
  const dir = KEY_DIR[e.key];
  if (dir) {
    e.preventDefault();
    tryMove(dir);
  }
});

document.getElementById('btn-new-maze').addEventListener('click', newMaze);
document.getElementById('btn-play-again').addEventListener('click', newMaze);

newMaze();`,

  seo: {
    title: 'Maze Runner Arrow-Key Game — Free HTML CSS JS Snippet',
    description: 'A procedurally generated maze game with arrow-key movement, real wall collision and a live timer. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Maze Runner Arrow-Key Game — Recursive Backtracking Maze Generation with Real Wall Collision',
      description: `Procedural maze generation is one of the most rewarding small algorithms to implement because the result is instantly verifiable — you can see, and play, whether the maze actually works. This snippet builds a genuinely playable maze runner: a fresh 13×13 maze is generated on every load using **recursive backtracking** (a randomised depth-first search), rendered as a CSS grid of walled cells, and navigated with real per-cell wall-collision checking rather than a simulated or pre-baked path.

**How recursive backtracking generates a solvable maze**

The algorithm starts by treating every cell as a sealed room — each cell begins with all four walls (\`N | E | S | W\`, stored as a 4-bit bitmask) intact. \`generateMaze()\` pushes the starting cell \`[0, 0]\` onto a stack and marks it visited. On each iteration, it looks at the cell on top of the stack, shuffles the four compass directions into random order via a Fisher-Yates shuffle (\`shuffleDirs()\`), and tries each one in turn looking for an unvisited neighbour. When it finds one, it **knocks down the wall** between the current cell and that neighbour — by clearing the matching bit on both cells' wall masks using \`cells[cy][cx].walls &= ~dir\` and the opposite direction on the neighbour — marks the neighbour visited, and pushes it onto the stack. If none of the four directions leads to an unvisited neighbour, the algorithm pops the current cell off the stack and backtracks, trying again from there. This continues until the stack empties, at which point every cell has been visited exactly once.

**Why this guarantees a maze with exactly one path between any two points**

Because a wall is only removed when moving from a visited cell to a *previously unvisited* one, the set of removed walls forms a **spanning tree** over the grid graph — connected, with no cycles. A spanning tree by definition has exactly one path between any two nodes, so this is what guarantees the maze is always fully solvable, with no dead-end ambiguity about which corridor is "correct."

**Rendering walls without drawing lines**

Rather than drawing wall segments with borders or SVG lines, each \`.maze-cell\` is rendered as a dark background square containing a smaller white \`.cell-inner\` square inset by 1px on all sides by default. When a cell's bitmask indicates an open passage in a given direction (checked with \`!(cell.walls & N)\`, etc.), a corresponding class like \`.wall-top\` extends that one edge of the inner square outward to meet the neighbouring cell's inner square, visually merging the two into one open corridor — walls are simply the dark grid background showing through the 1px gaps, a lightweight technique needing no canvas or SVG.

**Movement and real collision checking**

The player and goal are absolutely positioned circular markers layered on top of the grid, each sized and positioned as a percentage of the grid (\`100 / SIZE\`) so they align perfectly with cell boundaries regardless of container size. \`tryMove(dir)\` is the collision gate: before updating \`playerX\`/\`playerY\`, it calls \`canMove()\`, which checks whether the current cell's wall bitmask has the requested direction's bit cleared. If the bit is still set (a wall exists), the move is silently rejected — this is genuine per-cell wall data driving movement, not a visual-only maze with unrestricted player motion. Arrow keys and WASD are both mapped to the same four direction constants via a single \`KEY_DIR\` lookup table.

**Timer, move counter, and regeneration**

A \`setInterval\` ticking every 100ms updates an elapsed-time display from \`Date.now() - startTime\`, and every accepted move increments a visible move counter. Reaching the bottom-right cell triggers \`handleWin()\`, which stops the timer and shows a win overlay with the final time and move count. **New maze** calls \`generateMaze()\` again with a fresh random seed, producing an entirely different, independently solvable layout every time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Navigate with Arrow keys or WASD',
          text: 'Press ArrowUp/W, ArrowRight/D, ArrowDown/S, or ArrowLeft/A to move the indigo player marker one cell at a time. tryMove() checks canMove() before allowing the move, so you are physically blocked by any wall the maze generator left standing.',
        },
        {
          title: 'Reach the goal marker',
          text: 'The amber star marker sits in the bottom-right cell. Reaching that exact cell triggers handleWin(), which stops the timer and shows a win overlay with your final time and move count.',
        },
        {
          title: 'Watch the live timer and move counter',
          text: 'A setInterval ticking every 100ms updates the Time stat from Date.now() - startTime as soon as a new maze loads. The Moves stat increments only on successful (unblocked) moves, so bumping into a wall does not count against you.',
        },
        {
          title: 'Generate a fresh maze at any time',
          text: 'Click "New maze" to call generateMaze() again with SIZE set to 13x13, producing a completely different randomised layout via recursive backtracking, resetting the player to the top-left, and restarting the timer from zero.',
        },
        {
          title: 'Replay after winning',
          text: 'On the win overlay, click "Play again" to trigger the same newMaze() reset — a new maze, timer, and move counter, with the win overlay hidden again — so you can immediately attempt a fresh layout.',
        },
        {
          title: 'Adjust maze size or corridor rendering',
          text: 'Change the SIZE constant in the JS panel to any odd or even number (larger values create a harder, longer maze). The .maze-cell and .cell-inner CSS controls corridor thickness — reduce the inset value for thinner walls or increase it for a more open feel.',
        },
      ],
    },
    features: [
      'Recursive backtracking (randomised DFS) maze generation using a 4-bit wall bitmask per cell (N | E | S | W)',
      'Spanning-tree guarantee: exactly one path between any two cells, so every generated maze is always fully solvable',
      'Real per-cell wall-collision checking via canMove() — movement is blocked, not just visually implied',
      'Wall rendering with inset cell-inner squares instead of drawn border lines, extended per-direction with wall-top/right/bottom/left classes',
      'Percentage-based marker positioning so player and goal markers align to cell boundaries at any container size',
      'Arrow-key and WASD support unified through a single KEY_DIR lookup table',
      'Live timer (100ms tick via setInterval) and move counter, both reset cleanly on New maze',
      'Win overlay reporting final time and move count, with a Play again button that regenerates an entirely new maze',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'Teaching procedural generation and graph theory concepts',
        desc: 'Recursive backtracking is one of the clearest, most visual introductions to depth-first search and spanning trees in computer science education. This snippet is directly usable as a teaching aid — students can watch the generator carve corridors and reason about why the resulting structure has no loops and always connects every cell.',
      },
      {
        icon: 'APP',
        title: 'Loading-screen or 404-page interactive filler',
        desc: 'A tiny playable maze is a much more engaging "please wait" or "page not found" experience than a static illustration. Because generation runs entirely client-side with no assets to load, it appears instantly and re-generates a new layout on every visit, similar in spirit to the [Quick Math Arithmetic Game](/ui-snippets/quick-math-game) as a lightweight embedded distraction.',
      },
      {
        icon: 'FLOW',
        title: 'Casual daily-puzzle or speedrun leaderboard feature',
        desc: 'The built-in timer and move counter are exactly the primitives a speedrun-style leaderboard needs. Pair a date-seeded random number generator with this maze algorithm to produce the same maze for every player on a given day, then compare completion times for a shareable daily-challenge format.',
      },
      {
        icon: 'DESIGN',
        title: 'Demonstrating CSS Grid layout combined with absolutely positioned overlays',
        desc: 'The maze grid itself is a clean example of a CSS Grid with programmatically generated \`grid-template-columns\`/\`rows\`, while the player and goal markers show how to layer freely positioned elements over a grid using percentage-based coordinates rather than pixel maths — a technique reusable in any grid-aligned overlay UI.',
      },
      {
        icon: 'LEARN',
        title: 'Learn bitmask-based state representation for compact cell data',
        desc: 'Storing each cell\'s four wall states in a single integer bitmask (rather than four separate boolean properties) is a compact, fast pattern common in game development and low-level systems programming. This snippet is a approachable, real-world example of bitwise AND/OR/NOT operations (\`&\`, \`|\`, \`~\`) used for genuinely practical state tracking.',
      },
      {
        icon: 'CODE',
        title: 'Base for a full browser game with expanded mechanics',
        desc: 'The maze generator, collision system, and timer form a solid foundation to extend into a fuller game — add collectible items placed at dead ends, a fog-of-war reveal radius around the player, multiple difficulty tiers via the SIZE constant, or a two-player race mode where both players navigate the same generated maze from opposite corners.',
      },
      { icon: 'CODE', title: 'Related: Logic Gate Puzzle Game', desc: 'See the [Logic Gate Puzzle Game](/ui-snippets/logic-gate-puzzle-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does recursive backtracking always produce a solvable maze?',
        a: 'Every wall removal happens exactly once, when the algorithm moves from an already-visited cell into a brand-new unvisited one. Because no wall is ever removed between two cells that are both already visited, the resulting graph of open connections is a spanning tree — connected (every cell reachable) with zero cycles. A connected, cycle-free graph has exactly one path between any two nodes, which is precisely the property that makes the maze solvable and unambiguous.',
      },
      {
        q: 'How do I make the maze bigger or smaller?',
        a: 'Change the SIZE constant near the top of the JS panel — it controls both the grid dimensions (SIZE × SIZE cells) and, together with the CSS aspect-ratio: 1/1 rule on .maze-grid, the automatic per-cell sizing. Larger values like 21 create a substantially longer, harder maze since recursive backtracking on more cells produces more twisting corridors; smaller values like 7 create a quick, easy maze suitable for younger players.',
      },
      {
        q: 'Can I add a limited visibility or "fog of war" effect?',
        a: 'Yes — add a CSS radial-gradient mask or an overlay div with a transparent circular cutout centred on the player\'s pixel position (derived the same way positionMarkers() computes percentage coordinates), updated on every tryMove() call. This is a common difficulty-increasing variant that forces players to rely on memory and exploration rather than seeing the full maze layout upfront.',
      },
      {
        q: 'Does the maze generation ever get stuck in an infinite loop?',
        a: 'No — the while (stack.length) loop is bounded because every cell can be pushed onto the stack at most once (cells are only pushed when newly marked visited), and the loop terminates precisely when the stack empties after all SIZE × SIZE cells have been visited and backtracked through. There is no scenario where the algorithm revisits a cell or loops indefinitely.',
      },
      {
        q: 'How is the player prevented from moving through walls?',
        a: 'canMove(x, y, dir) checks the actual wall bitmask stored on the current cell: grid[y][x].walls & dir evaluates to a non-zero value only if that direction\'s wall bit is still set. tryMove() calls this check before updating playerX/playerY, so an attempted move into a standing wall is rejected before any position change happens — the collision logic operates on the same data structure used to render the walls, so what you see is exactly what blocks movement.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain step by step how generateMaze()'s stack-based recursive backtracking guarantees a spanning tree, and how the wall bitmask on each cell is read both for rendering (renderMaze()) and for movement (canMove()). It's a great candidate for extension — ask the assistant to add a fog-of-war visibility radius around the player, generate a shortest-path solution overlay using breadth-first search for a "show hint" button, add collectible items at algorithmically-detected dead ends, or implement a date-seeded pseudo-random generator so every player gets an identical daily maze for leaderboard comparison. You could also ask it to profile whether the DOM-based rendering approach (one div per cell) would benefit from a canvas rewrite at much larger maze sizes, or to review the bitmask wall representation for any edge cases at the grid boundaries. Use it to interrogate and reshape the algorithm, not just to copy the code as-is.`,
      prompt: `Build a procedurally generated maze game in plain HTML, CSS, and JavaScript with arrow-key navigation and real wall collision — no frameworks, canvas, or external libraries required.

Requirements:
- Generate a grid-based maze (roughly 11x11 to 15x15 cells) using a real recursive backtracking / randomized depth-first search algorithm: start from one cell, randomly visit unvisited neighboring cells while carving a passage (removing the wall) between the current and new cell, and backtrack when a cell has no unvisited neighbors, continuing until every cell has been visited. This must guarantee the maze is always fully solvable with exactly one path between any two cells (no loops, fully connected).
- Represent each cell's walls in a way that both the visual rendering and the movement logic read from the same source of truth, so there is no possibility of a mismatch between what's drawn and what blocks movement.
- Render the maze as a grid of cells with visible walls/passages reflecting the generated layout, plus a distinct player marker starting at the top-left cell and a distinct goal marker at the bottom-right cell.
- Support movement via both Arrow keys and WASD, with real collision checking: an attempted move must be silently blocked if a wall exists between the player's current cell and the target cell in that direction, not just visually obstructed.
- Include a live running timer (updating at least every second) and a move counter that increments only on successful, unblocked moves.
- Detect when the player reaches the goal cell and show a clear win message including the final elapsed time and total move count, pausing further movement until a new maze is started.
- Provide a "New maze" control that generates a completely fresh random maze layout using the same algorithm and resets the player position, timer, and move counter.`,
    },
  },
};

export default mazeRunnerGame;
