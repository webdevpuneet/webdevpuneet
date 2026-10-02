const canvasGameOfLife = {
  id: 'canvas-game-of-life',
  title: "Canvas Conway's Game of Life",
  lastmod: '2026-08-21',
  category: 'games',
  cdnUrls: [],
  html: `<div class="gl-wrap">
  <canvas id="glCanvas" class="gl-canvas"></canvas>
  <div class="gl-bar">
    <button class="gl-btn" id="glPlay">Play</button>
    <button class="gl-btn" id="glStep">Step</button>
    <button class="gl-btn" id="glRandom">Random</button>
    <button class="gl-btn" id="glClear">Clear</button>
    <label class="gl-speed">Speed
      <input type="range" id="glSpeed" min="1" max="30" value="10">
    </label>
  </div>
  <p class="gl-hint">Click cells to toggle them while paused. <span id="glGen">Generation 0</span></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#090a0f;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gl-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:min(620px,96vw)}
.gl-canvas{width:100%;aspect-ratio:1/1;background:#0e1016;border-radius:14px;border:1px solid rgba(255,255,255,.1);display:block;cursor:pointer}
.gl-bar{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:center}
.gl-btn{padding:8px 16px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:#161a24;color:#c7cce0;font:600 12px system-ui;cursor:pointer;transition:background .2s,border-color .2s}
.gl-btn:hover{background:#1f2432}
.gl-btn.is-active{background:#34d399;color:#04241a;border-color:#34d399}
.gl-speed{display:flex;align-items:center;gap:8px;color:#8791ac;font-size:12px}
.gl-hint{color:#6b7284;font-size:12px;text-align:center}
#glGen{color:#34d399;font-weight:700}`,

  js: `const canvas = document.getElementById('glCanvas');
const ctx = canvas.getContext('2d');
const playBtn = document.getElementById('glPlay');
const stepBtn = document.getElementById('glStep');
const randomBtn = document.getElementById('glRandom');
const clearBtn = document.getElementById('glClear');
const speedInput = document.getElementById('glSpeed');
const genLabel = document.getElementById('glGen');

const COLS = 40, ROWS = 40;
let grid = new Uint8Array(COLS * ROWS);
let running = false;
let generation = 0;
let lastTick = 0;
let dpr, cellSize;

function idx(x, y) { return y * COLS + x; }

function resize() {
  dpr = Math.min(window.devicePixelRatio || 1, 2);
  const size = canvas.clientWidth;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  cellSize = size / COLS;
  draw();
}

function randomize() {
  for (let i = 0; i < grid.length; i++) grid[i] = Math.random() < 0.28 ? 1 : 0;
  generation = 0;
  updateGen();
  draw();
}

function clearGrid() {
  grid.fill(0);
  generation = 0;
  updateGen();
  draw();
}

function updateGen() { genLabel.textContent = 'Generation ' + generation; }

function countNeighbors(x, y) {
  let count = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === 0 && dy === 0) continue;
      const nx = (x + dx + COLS) % COLS;
      const ny = (y + dy + ROWS) % ROWS;
      count += grid[idx(nx, ny)];
    }
  }
  return count;
}

// Applies Conway's rules to a fresh buffer so the whole generation updates
// simultaneously from a consistent snapshot of the previous state.
function step() {
  const next = new Uint8Array(COLS * ROWS);
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      const alive = grid[idx(x, y)];
      const n = countNeighbors(x, y);
      next[idx(x, y)] = alive ? (n === 2 || n === 3 ? 1 : 0) : (n === 3 ? 1 : 0);
    }
  }
  grid = next;
  generation++;
  updateGen();
  draw();
}

function draw() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.fillStyle = '#34d399';
  for (let y = 0; y < ROWS; y++) {
    for (let x = 0; x < COLS; x++) {
      if (grid[idx(x, y)]) {
        ctx.fillRect(x * cellSize + 1, y * cellSize + 1, cellSize - 1.5, cellSize - 1.5);
      }
    }
  }
}

function toggleCell(clientX, clientY) {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((clientX - rect.left) / cellSize);
  const y = Math.floor((clientY - rect.top) / cellSize);
  if (x < 0 || y < 0 || x >= COLS || y >= ROWS) return;
  grid[idx(x, y)] ^= 1;
  draw();
}

canvas.addEventListener('click', e => {
  if (running) return;
  toggleCell(e.clientX, e.clientY);
});

playBtn.addEventListener('click', () => {
  running = !running;
  playBtn.textContent = running ? 'Pause' : 'Play';
  playBtn.classList.toggle('is-active', running);
});
stepBtn.addEventListener('click', () => { if (!running) step(); });
randomBtn.addEventListener('click', randomize);
clearBtn.addEventListener('click', clearGrid);

function loop(ts) {
  if (running) {
    const interval = 1000 / Number(speedInput.value);
    if (ts - lastTick >= interval) {
      lastTick = ts;
      step();
    }
  }
  requestAnimationFrame(loop);
}

resize();
randomize();
requestAnimationFrame(loop);
window.addEventListener('resize', resize);`,

  seo: {
    title: "Canvas Conway's Game of Life — Free Cellular Automaton Snippet",
    description: `A classic Game of Life grid on Canvas 2D with play/pause, step, random seed, and a speed control — a self-contained cellular automaton simulation. Exports to React, Vue & Tailwind.`,
    about: {
      title: "Canvas Conway's Game of Life — A Playable Cellular Automaton",
      description: `Conway's Game of Life is the classic cellular automaton: a grid of cells that are either alive or dead, evolving generation by generation according to four simple rules based purely on each cell's living neighbor count. This snippet implements it fully on the Canvas 2D API, with a typed-array grid, play/pause/step/random controls, and an adjustable simulation speed.

**A Uint8Array grid, not a 2D array of booleans**

The grid is stored as a single flat \`Uint8Array(COLS * ROWS)\`, indexed with a helper \`idx(x, y) => y * COLS + x\`. A typed array of 1s and 0s is both faster to allocate and iterate than a nested array of arrays, and it maps cleanly onto the two states a Life cell can have — no need for a richer data structure for a strictly binary grid.

**Neighbor counting wraps at the edges**

\`countNeighbors\` checks all eight surrounding cells, but wraps out-of-bounds coordinates back around with \`(x + dx + COLS) % COLS\` — so the grid behaves like a torus, where the right edge is a neighbor of the left edge and the bottom wraps to the top. This is the standard way to avoid dead zones at the grid boundary that would otherwise behave differently from interior cells.

**Rules apply to a snapshot, not in place**

\`step()\` is the heart of the simulation: it builds a brand new \`next\` array and computes every cell's next state purely from the *current* \`grid\`, following Conway's four rules — a live cell with 2 or 3 neighbors survives, a dead cell with exactly 3 neighbors becomes alive, everything else dies or stays dead. Applying the rules to a fresh buffer (rather than mutating \`grid\` cell by cell) is essential: mutating in place would let cells computed earlier in the loop affect the neighbor counts of cells computed later in the same generation, corrupting the simulation.

**A real play/pause loop with adjustable tick rate**

\`loop(ts)\` runs every frame via \`requestAnimationFrame\`, but only calls \`step()\` when enough time has passed based on the speed slider (\`1000 / speed\` ms between generations) — decoupling the simulation's tick rate from the display's refresh rate, so speed changes take effect immediately without restarting the loop. Pausing simply stops the interval check from ever triggering \`step\`, while clicking a cell is only allowed while paused, matching the classic editable-then-run interaction.

**Customizing it**

Change \`COLS\`/\`ROWS\` for a finer or coarser grid, tweak the random seed density in \`randomize\`, or seed a specific classic pattern (glider, blinker) programmatically instead of randomizing. Pair it with [tic tac toe game](/ui-snippets/tic-tac-toe-game/) or [whack a mole game](/ui-snippets/whack-a-mole-game/) for more canvas-and-grid-based casual games.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grid canvas seeds randomly and controls render.` },
      { title: 'Click Play', text: `Generations advance automatically at the set speed.` },
      { title: 'Click Pause', text: `The simulation freezes on the current generation.` },
      { title: 'Click cells while paused', text: `Toggle individual cells alive or dead.` },
      { title: 'Click Step', text: `Advance exactly one generation at a time.` },
      { title: 'Click Random or Clear', text: `Reseed the grid randomly or wipe it empty.` },
      { title: 'Drag the speed slider', text: `Change how many generations run per second.` },
    ] },
    features: [
      { title: 'Typed array grid', text: `Uint8Array stores the whole grid compactly.` },
      { title: 'Wrapping edges', text: `The grid behaves as a torus, avoiding boundary bias.` },
      { title: 'Snapshot-based rules', text: `Next generation computed from a frozen prior state.` },
      { title: 'Play/pause/step controls', text: `Full manual and automatic simulation control.` },
      { title: 'Adjustable tick rate', text: `A slider decouples simulation speed from frame rate.` },
      { title: 'Click-to-edit', text: `Toggle individual cells while paused.` },
      { title: 'Random seeding', text: `One click reseeds the grid at ~28% density.` },
      { title: 'Generation counter', text: `Live label tracks how many generations have run.` },
    ],
    useCases: [
      { title: 'Casual browser games', text: 'Place alongside a [tic tac toe game](/ui-snippets/tic-tac-toe-game/) and a [whack-a-mole game](/ui-snippets/whack-a-mole-game/) in a games section, with play, pause, step and speed controls.' },
      { title: 'Computer science education', text: 'Teach cellular automata and emergent behaviour, with the next generation computed from a frozen snapshot of the previous one.' },
      { title: 'Portfolio technical pieces', text: 'Show command of canvas and simulation in a portfolio piece, storing the whole grid compactly in a `Uint8Array` for speed.' },
      { title: 'Screensaver-style backgrounds', text: 'Run it passively behind other content, with wrapping edges making the grid behave as a torus and avoiding boundary bias.' },
      { title: 'Interview practice and generative art', text: 'Study a well-known algorithm, or seed patterns and watch what they grow into, using a random seed button for new starting points.' },
      { icon: 'CODE', title: 'Related: Blackjack Card Game vs Dealer', desc: 'See the [Blackjack Card Game vs Dealer](/ui-snippets/blackjack-card-game/) for a related games pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Tower of Hanoi Game', desc: 'See the [Tower of Hanoi Game](/ui-snippets/tower-of-hanoi-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: "What are Conway's Game of Life rules exactly?", a: `Any live cell with two or three live neighbors survives to the next generation; any dead cell with exactly three live neighbors becomes alive; every other live cell dies (from under- or overpopulation) and every other dead cell stays dead. All four outcomes are derived purely from each cell's eight-neighbor count, applied simultaneously to the whole grid.` },
      { q: 'Why compute the next generation into a new array instead of updating the grid in place?', a: `Because every cell's next state depends on the current state of its neighbors, mutating cells one at a time in the same array would mean cells processed later in the loop see already-updated neighbors instead of the previous generation's values, corrupting the simulation. Building a separate next array from an untouched snapshot of grid guarantees every cell's rule is evaluated against the same consistent prior generation.` },
      { q: 'Why do the edges wrap around instead of just stopping?', a: `Without wrapping, cells at the grid's border would have fewer possible neighbors than interior cells, causing edge behavior to diverge from the mathematically "correct" infinite-plane Game of Life. Wrapping x and y coordinates with the modulo operator makes the grid behave like a torus, so every cell — edge or interior — always has exactly eight neighbors to evaluate.` },
      { q: 'How does the speed slider work without changing the animation frame rate?', a: `The requestAnimationFrame loop runs every frame regardless of the slider, but it only calls step() when enough real time has elapsed since the last generation, computed as 1000 divided by the slider's value in generations-per-second. That decouples how often the simulation advances from the display's refresh rate, so dragging the slider changes speed immediately without restarting or re-scheduling the loop.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the canvas setup, grid state, and the requestAnimationFrame loop into a mount effect scoped to a canvas ref, keeping the grid, generation counter, and running flag in refs rather than component state so the loop doesn't get torn down on every render. Cancel the animation frame and remove event listeners in the cleanup function, and drive the play/pause/step buttons through the same refs.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why computing the next generation into a separate buffer (rather than mutating the grid in place) is required for Conway's rules to apply correctly, and how the edge-wrapping neighbor count turns the flat grid into a torus. It's also a great snippet to extend with an assistant's help — ask for preset classic patterns (glider, glider gun, pulsar) placeable by click, a population-over-time graph, or a version that detects and highlights stable/oscillating patterns. Use the conversation to make sure you understand the simultaneous-update rule before adapting the simulation loop for a different cellular automaton ruleset.`,
      prompt: `Build a playable "Conway's Game of Life" simulation in plain HTML, CSS, and JavaScript using only the Canvas 2D API — no external libraries or CDNs.

Requirements:
- A fixed-size grid (e.g. 40x40 cells) stored in a flat typed array (Uint8Array or similar), not a nested array of arrays, with a helper function to convert (x, y) coordinates to a flat index.
- Implement neighbor counting for each cell that checks all eight surrounding cells and wraps out-of-bounds coordinates around to the opposite edge (torus/wrap-around behavior), so edge and corner cells are evaluated the same way as interior cells.
- Implement the generation-advance function so that it computes the entire next generation into a brand new array based purely on the current grid's state, following Conway's actual rules (a live cell with 2 or 3 live neighbors survives; a dead cell with exactly 3 live neighbors becomes alive; all other cells die or stay dead) — do not mutate the grid array in place during the same pass used to read neighbor counts.
- Provide UI controls for: Play/Pause (toggling automatic generation advancement), Step (advance exactly one generation while paused), Random (reseed the grid with a random distribution of live cells), and Clear (empty the grid).
- Provide a speed slider that controls how many generations run per second while playing, implemented by gating calls to the step function inside a requestAnimationFrame loop based on elapsed time (not by changing the animation frame rate itself).
- Allow the user to click individual cells to toggle them alive/dead, but only while the simulation is paused (not while playing).
- Display a live generation counter, and make the canvas responsive with correct device-pixel-ratio handling.`,
    },
  },
};

export default canvasGameOfLife;
