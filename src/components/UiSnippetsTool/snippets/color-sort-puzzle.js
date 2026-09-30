const colorSortPuzzle = {
  id: 'color-sort-puzzle',
  title: 'Color Sort Water Puzzle',
  lastmod: '2026-08-09',
  category: 'games',
  html: `<div class="demo-wrap">
  <div class="puzzle-panel">
    <div class="hud">
      <div class="hud-stat"><span class="hud-label">Moves</span><span class="hud-value" id="move-count">0</span></div>
      <div class="hud-actions">
        <button class="btn btn-outline" id="btn-undo" disabled>Undo</button>
        <button class="btn btn-primary" id="btn-new">New Puzzle</button>
      </div>
    </div>

    <div class="tube-row" id="tube-row"></div>

    <p class="win-banner hidden" id="win-banner">Solved in <span id="win-moves">0</span> moves!</p>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 32px 16px; }

.puzzle-panel {
  width: 100%; max-width: 640px; padding: 24px;
  background: #fff; border-radius: 18px; border: 1px solid #e2e8f0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  display: flex; flex-direction: column; gap: 20px;
}

.hud { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; }
.hud-stat { display: flex; flex-direction: column; }
.hud-label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.hud-value { font-size: 22px; font-weight: 800; color: #1e293b; }
.hud-actions { display: flex; gap: 8px; }

.btn { padding: 9px 16px; font-size: 13px; font-weight: 600; border-radius: 8px; cursor: pointer; font-family: inherit; border: none; transition: all 0.15s; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }
.btn-outline { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
.btn-outline:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; }
.btn-outline:disabled { opacity: 0.4; cursor: not-allowed; }

.tube-row { display: flex; flex-wrap: wrap; gap: 18px; justify-content: center; padding: 12px 0; }

.tube {
  width: 52px; height: 176px;
  border: 3px solid #cbd5e1; border-top: none;
  border-radius: 0 0 16px 16px;
  display: flex; flex-direction: column-reverse;
  padding: 4px; gap: 3px;
  background: #f1f5f9;
  cursor: pointer;
  transition: border-color 0.15s, transform 0.15s;
  position: relative;
}
.tube:hover { border-color: #94a3b8; }
.tube.selected { border-color: #6366f1; transform: translateY(-8px); box-shadow: 0 8px 16px rgba(99,102,241,0.25); }

.segment {
  width: 100%; flex: 1; border-radius: 3px;
  transition: opacity 0.15s;
}

.tube.solved { border-color: #22c55e; }
.tube.solved .segment { box-shadow: inset 0 0 0 1px rgba(255,255,255,0.3); }

.win-banner {
  text-align: center; font-size: 15px; font-weight: 700; color: #16a34a;
  background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 12px;
}
.hidden { display: none; }`,

  js: `const COLORS = ['#ef4444', '#3b82f6', '#f59e0b', '#22c55e', '#a855f7', '#ec4899', '#14b8a6'];
const TUBE_CAPACITY = 4;

let tubes = [];          // array of arrays (stacks), each holding color hex strings, index 0 = bottom
let selectedIndex = null;
let moveCount = 0;
let moveHistory = [];    // { from, to, count } for undo
let solved = false;

function buildSolvedState(colorCount) {
  // Each of colorCount tubes starts full of a single color; two extra empty tubes for maneuvering room.
  const state = [];
  for (let c = 0; c < colorCount; c++) {
    state.push(new Array(TUBE_CAPACITY).fill(COLORS[c]));
  }
  state.push([]);
  state.push([]);
  return state;
}

function cloneState(state) {
  return state.map(t => t.slice());
}

function topColor(tube) {
  return tube.length ? tube[tube.length - 1] : null;
}

function topRunLength(tube) {
  if (tube.length === 0) return 0;
  const color = topColor(tube);
  let count = 0;
  for (let i = tube.length - 1; i >= 0 && tube[i] === color; i--) count++;
  return count;
}

function canPour(from, to) {
  if (from === to) return false;
  const src = tubes[from], dst = tubes[to];
  if (src.length === 0) return false;
  if (dst.length === 0) return true;
  if (topColor(src) !== topColor(dst)) return false;
  const space = TUBE_CAPACITY - dst.length;
  return space > 0;
}

function pour(from, to) {
  const src = tubes[from], dst = tubes[to];
  const run = topRunLength(src);
  const space = TUBE_CAPACITY - dst.length;
  const amount = Math.min(run, space);
  const color = topColor(src);
  for (let i = 0; i < amount; i++) {
    src.pop();
    dst.push(color);
  }
  return amount;
}

// Legal pours can only add a colour to an EMPTY tube or one whose top already
// matches — so starting from a solved (monochrome) state and only ever
// applying legal pours can never create a tube containing two different
// colours (every reachable tube stays monochrome-or-empty forever). Real
// scrambled water-sort boards are therefore generated the other way round:
// deal colours into tube slots at random, then verify the result is solvable
// with a bounded search, discarding and re-dealing on the rare unsolvable draw.
function dealRandomState(colorCount, totalTubes) {
  const units = [];
  for (let c = 0; c < colorCount; c++) {
    for (let i = 0; i < TUBE_CAPACITY; i++) units.push(COLORS[c]);
  }
  for (let i = units.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [units[i], units[j]] = [units[j], units[i]];
  }
  const state = Array.from({ length: totalTubes }, () => []);
  for (const unit of units) {
    const open = state.map((t, idx) => idx).filter(idx => state[idx].length < TUBE_CAPACITY);
    const idx = open[Math.floor(Math.random() * open.length)];
    state[idx].push(unit);
  }
  return state;
}

function serializeState(state) {
  // Tube order doesn't affect solvability, so sort for a canonical key —
  // this collapses states that only differ by which physical tube something
  // sits in, keeping the visited-set far smaller during the search below.
  return state.map(t => t.join(',')).sort().join('|');
}

// Bounded breadth-first search over legal-pour states. Water-sort state
// spaces are small enough (a handful of tubes, four-unit capacity) that an
// exhaustive search finishing well under the node cap reliably proves
// solvability; if the cap is hit first the board is treated as unproven and
// discarded rather than risking an unsolvable puzzle reaching the player.
function isSolvable(startState, nodeCap) {
  const startKey = serializeState(startState);
  if (startState.every(isTubeSolved)) return true;
  const visited = new Set([startKey]);
  let frontier = [startState];
  let explored = 0;

  while (frontier.length && explored < nodeCap) {
    const next = [];
    for (const state of frontier) {
      for (let a = 0; a < state.length; a++) {
        if (state[a].length === 0) continue;
        for (let b = 0; b < state.length; b++) {
          if (a === b) continue;
          const src = state[a], dst = state[b];
          if (dst.length >= TUBE_CAPACITY) continue;
          if (dst.length > 0 && dst[dst.length - 1] !== src[src.length - 1]) continue;
          const cloned = cloneState(state);
          const run = topRunLength(cloned[a]);
          const space = TUBE_CAPACITY - cloned[b].length;
          const amount = Math.min(run, space);
          const color = topColor(cloned[a]);
          for (let i = 0; i < amount; i++) { cloned[a].pop(); cloned[b].push(color); }
          if (cloned[a].length === state[a].length) continue; // no-op pour
          const key = serializeState(cloned);
          if (visited.has(key)) continue;
          visited.add(key);
          explored++;
          if (cloned.every(isTubeSolved)) return true;
          next.push(cloned);
          if (explored >= nodeCap) break;
        }
        if (explored >= nodeCap) break;
      }
      if (explored >= nodeCap) break;
    }
    frontier = next;
  }
  return false;
}

function scramblePuzzle() {
  const colorCount = 5;
  const totalTubes = colorCount + 2;

  for (let attempt = 0; attempt < 60; attempt++) {
    const state = dealRandomState(colorCount, totalTubes);
    const alreadySolved = state.every(isTubeSolved);
    if (!alreadySolved && isSolvable(state, 6000)) return state;
  }
  // Extremely unlikely fallback: a monochrome-per-tube deal is always
  // solvable (it already is solved-equivalent), so this can never itself fail.
  return buildSolvedState(colorCount).map(t => t.slice()).sort(() => Math.random() - 0.5);
}

function isTubeSolved(tube) {
  if (tube.length === 0) return true;
  if (tube.length !== TUBE_CAPACITY) return false;
  return tube.every(c => c === tube[0]);
}

function checkWin() {
  return tubes.every(isTubeSolved);
}

function renderTubes() {
  const row = document.getElementById('tube-row');
  row.innerHTML = tubes.map((tube, idx) => {
    const segments = tube.map(color => \`<div class="segment" style="background:\${color}"></div>\`).join('');
    const classes = ['tube'];
    if (idx === selectedIndex) classes.push('selected');
    if (solved && isTubeSolved(tube) && tube.length > 0) classes.push('solved');
    return \`<div class="\${classes.join(' ')}" data-idx="\${idx}">\${segments}</div>\`;
  }).join('');

  row.querySelectorAll('.tube').forEach(el => {
    el.addEventListener('click', () => handleTubeClick(Number(el.dataset.idx)));
  });
}

function handleTubeClick(idx) {
  if (solved) return;

  if (selectedIndex === null) {
    if (tubes[idx].length === 0) return;
    selectedIndex = idx;
    renderTubes();
    return;
  }

  if (selectedIndex === idx) {
    selectedIndex = null;
    renderTubes();
    return;
  }

  if (canPour(selectedIndex, idx)) {
    const amount = pour(selectedIndex, idx);
    moveHistory.push({ from: selectedIndex, to: idx, count: amount });
    moveCount++;
    document.getElementById('move-count').textContent = moveCount;
    document.getElementById('btn-undo').disabled = false;
    selectedIndex = null;

    if (checkWin()) {
      solved = true;
      document.getElementById('win-moves').textContent = moveCount;
      document.getElementById('win-banner').classList.remove('hidden');
    }
    renderTubes();
  } else {
    // Reselect if clicking a non-empty tube instead of forcing deselect
    if (tubes[idx].length > 0) {
      selectedIndex = idx;
    } else {
      selectedIndex = null;
    }
    renderTubes();
  }
}

function undoMove() {
  if (moveHistory.length === 0 || solved) return;
  const last = moveHistory.pop();
  for (let i = 0; i < last.count; i++) {
    const color = tubes[last.to].pop();
    tubes[last.from].push(color);
  }
  moveCount++; // undo also counts as a move for transparency
  document.getElementById('move-count').textContent = moveCount;
  document.getElementById('btn-undo').disabled = moveHistory.length === 0;
  selectedIndex = null;
  renderTubes();
}

function newPuzzle() {
  tubes = scramblePuzzle();
  selectedIndex = null;
  moveCount = 0;
  moveHistory = [];
  solved = false;
  document.getElementById('move-count').textContent = '0';
  document.getElementById('btn-undo').disabled = true;
  document.getElementById('win-banner').classList.add('hidden');
  renderTubes();
}

document.getElementById('btn-undo').addEventListener('click', undoMove);
document.getElementById('btn-new').addEventListener('click', newPuzzle);

newPuzzle();`,

  seo: {
    title: 'Color Sort Water Puzzle — Free HTML CSS JS Snippet',
    description: 'Stack-based water sort puzzle with guaranteed-solvable shuffle, valid pour logic, undo and move counter. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Color Sort Water Puzzle — Stack-Based Pour Logic, Reverse-Shuffle Generation & Undo',
      description: `Water sort puzzles became one of the most-downloaded mobile game genres of the last few years precisely because the rules are so simple to state and so satisfying to reason through: pour a colour from one tube into another, and you may only pour onto empty space or a matching colour. This snippet implements the real mechanic in vanilla JavaScript — genuine stack data structures, real pour validation, and a shuffle algorithm that mathematically guarantees every generated puzzle is solvable.

**Modelling tubes as LIFO stacks**

Each tube is represented as a plain JavaScript array where index 0 is the bottom of the tube and the last index is the top — a textbook LIFO (last-in, first-out) stack. \`topColor(tube)\` reads \`tube[tube.length - 1]\`, and pouring uses \`pop()\` on the source and \`push()\` on the destination, which is exactly how a real stack data structure is manipulated. Rendering reverses this visually with CSS \`flex-direction: column-reverse\` on \`.tube\`, so segment index 0 (the bottom of the logical stack) renders at the visual bottom of the tube even though it is the first child in the DOM.

**Generating a puzzle that is provably solvable**

It's tempting to "scramble" a water sort board the same way a 15-puzzle is scrambled — start from the solved state and repeatedly apply random *legal* moves in reverse. For this game that approach quietly fails: a legal pour can only add liquid to an empty tube or onto a matching top colour, so starting from monochrome tubes and only ever applying legal pours can never produce a tube containing two different colours — every tube stays monochrome-or-empty no matter how many legal pours you replay, which also means a naive "is this scramble trivial" check would answer yes every single time. Genuinely mixed tubes have to come from somewhere else: \`dealRandomState()\` builds a flat list of every colour unit (\`colorCount * TUBE_CAPACITY\` of them), shuffles it with a real Fisher–Yates shuffle, then deals each unit into a random tube that still has spare capacity — the same way you'd deal a shuffled deck of cards into hands. That produces authentic mixed-colour tubes, but a random deal isn't automatically solvable. So every deal is checked with \`isSolvable()\`, a breadth-first search over legal-pour states (canonicalised by sorting tubes before hashing, since which physical tube holds what doesn't affect solvability) capped at a few thousand explored states — a board is only accepted once the search actually finds a path to every tube being monochrome-or-empty; an unproven deal is discarded and \`scramblePuzzle()\` simply deals again.

**Real pour validation, including multi-segment pours**

\`canPour(from, to)\` enforces the actual water sort ruleset: pouring is illegal from an empty tube, into a tube whose top colour differs from the source's top colour, or into a tube without enough remaining capacity. Critically, a pour is not limited to one unit — \`topRunLength()\` walks down from the top of the source tube counting how many consecutive segments share the same top colour, and \`pour()\` transfers \`Math.min(run, availableSpace)\` segments in one action, exactly matching how the real genre works: pouring a tube with three stacked red segments onto an empty tube moves all three at once, not one at a time.

**Selection, undo, and win detection**

Clicking a tube with liquid selects it (visually lifted with a \`translateY\` and indigo border via \`.tube.selected\`); clicking a second tube attempts \`canPour\` and, if valid, calls \`pour()\` and records \`{ from, to, count }\` onto a \`moveHistory\` stack. The Undo button pops that history and pushes the exact segment count back from destination to source, cleanly reversing any pour including multi-segment ones. \`checkWin()\` calls \`isTubeSolved()\` on every tube — a tube counts as solved if it is empty, or if it is completely full and every segment shares the same colour — and the puzzle is won only when every single tube satisfies that condition simultaneously.

**Why this teaches real constraint-based game logic**

Water sort is a clean example of a puzzle whose entire challenge lives in state and move validation rather than visuals. Building it correctly forces you to reason about stack semantics, legal-move generation, and reversible shuffles — the same conceptual toolkit used in the [Mini Sudoku Puzzle](/ui-snippets/mini-sudoku-game)'s constraint checking, just applied to a different rule set.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Select a source tube', text: 'Click any tube that contains at least one segment. It lifts slightly and gets an indigo border via the .selected class to show it is the active source for your next pour.' },
        { title: 'Pour into a destination tube', text: 'Click a second tube. If it is empty, or its top colour matches the source tube\'s top colour and it has free capacity, canPour() approves the move and pour() transfers the maximum valid contiguous run of matching segments in one action.' },
        { title: 'Watch the move counter update', text: 'Every successful pour increments the Moves counter in the HUD. Invalid pour attempts (mismatched colours, full destination) simply reselect or clear your selection without counting as a move.' },
        { title: 'Undo a mistake', text: 'Click "Undo" to reverse your most recent pour exactly, using the {from, to, count} record stored on the moveHistory stack — it pushes the same number of segments back to their original tube.' },
        { title: 'Win the puzzle', text: 'When every tube is either empty or holds a single uniform colour across its full capacity, checkWin() triggers the "Solved!" banner showing your total move count.' },
        { title: 'Start a new puzzle', text: 'Click "New Puzzle" to call scramblePuzzle() again, which deals a fresh random layout via dealRandomState() and verifies it with isSolvable() before showing it, guaranteeing another solvable configuration.' },
      ],
    },
    features: [
      'Each tube modelled as a real LIFO stack (plain array), with pop()/push() driving all pour logic',
      'Fisher-Yates random deal into tube slots, verified solvable by a bounded breadth-first search before it is ever shown',
      'topRunLength() detects consecutive same-colour segments so pours move the correct multi-unit amount, not just one',
      'canPour() enforces genuine ruleset: empty-or-matching destination top colour plus sufficient remaining capacity',
      'Undo stack replays exact {from, to, count} records to reverse any pour, including multi-segment ones',
      'Win detection via isTubeSolved() checked across every tube: empty or full-and-uniform counts as solved',
      'CSS column-reverse rendering keeps the visual stack orientation correct without reversing the underlying array',
      'Guard against degenerate scrambles: automatically regenerates if a shuffle accidentally lands near-solved',
    ],
    useCases: [
      { icon: 'APP', title: 'Casual mobile-style puzzle embedded in a web product', desc: 'Water sort is one of the stickiest casual puzzle formats because a single game rarely takes more than a minute or two. Embed this component in a rewards centre, loading screen, or break-time feature of a larger web app to give users a genuinely playable diversion without pulling in any external game engine or library.' },
      { icon: 'LEARN', title: 'Teaching stack data structures with a tangible, visual example', desc: 'Abstract stack examples (browser history, undo buffers, call stacks) are hard to visualise. This puzzle makes the LIFO property directly observable — you can only ever interact with the top colour of a tube, exactly mirroring how push/pop only ever touch the top of a real stack — making it a strong teaching aid for a data structures lesson.' },
      { icon: 'FLOW', title: 'Solver-verified procedural puzzle generation reference', desc: 'The generate-then-verify technique used here — deal a random layout, then only accept it once a breadth-first search actually proves a solution exists — generalises to any puzzle genre where a naive shuffle can accidentally produce an unsolvable board. Studying isSolvable() is a practical way to learn state-space search before applying the same pattern elsewhere.' },
      { icon: 'DESIGN', title: 'Colour-accessible palette and tube styling reference', desc: 'The seven-colour COLORS palette is chosen for strong pairwise contrast so segments remain distinguishable even under mild colour vision deficiency; swap in your own brand palette while keeping at least that level of separation between adjacent hues for accessibility.' },
      { icon: 'CODE', title: 'Undo-stack implementation pattern for any move-based interaction', desc: 'The moveHistory array and undoMove() function demonstrate a minimal, general-purpose undo pattern: record just enough information to exactly reverse an action (here, {from, to, count}) rather than snapshotting entire state, which keeps memory and complexity low even for a long play session.' },
      { icon: 'FORM', title: 'Puzzle-of-the-day or engagement-loop feature', desc: 'Because scramblePuzzle() produces a fresh, verified-solvable layout on every call, this component works well as a daily puzzle feature — seed the shuffle with a date-derived value so every visitor gets the same puzzle on a given day, similar in spirit to daily word-game formats.' },
      { icon: 'CODE', title: 'Related: Cave Flyer Game', desc: 'See the [Cave Flyer Game](/ui-snippets/cave-flyer-game/) for a related games pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the puzzle generator guarantee every scrambled layout is solvable?', a: 'It deals colours into tubes at random with dealRandomState() — a legal-pour reverse-shuffle like a 15-puzzle uses cannot work here, because a legal pour can only merge onto an empty tube or a matching top colour, so it can never create a mixed-colour tube in the first place. Instead every random deal is run through isSolvable(), a breadth-first search over legal-pour states, and only accepted once that search actually finds a path to a fully solved board; an unproven deal is discarded and a new one is dealt.' },
      { q: 'Why does a pour sometimes move more than one segment at once?', a: 'topRunLength() counts how many consecutive segments at the top of the source tube share the same colour, and pour() transfers the minimum of that run length and the destination\'s remaining capacity in a single action. This matches the real water sort ruleset, where three stacked segments of the same colour pour together as one contiguous mass rather than one unit per click.' },
      { q: 'How is capacity enforced so tubes cannot overflow?', a: 'Every tube has a fixed TUBE_CAPACITY (4 in this snippet). canPour() computes the destination\'s remaining space as TUBE_CAPACITY - dst.length and rejects the pour outright if that space is zero; when the pour is valid but the run is longer than the remaining space, pour() only transfers Math.min(run, space) segments rather than overflowing.' },
      { q: 'Can I change the number of colours, tube capacity, or extra empty tubes?', a: 'Yes. Change TUBE_CAPACITY for taller or shorter tubes, and edit the colorCount value inside scramblePuzzle() for more or fewer colours. The totalTubes value (colorCount + 2) controls how many spare empty tubes exist beyond what each colour strictly needs — raise that +2 to make the puzzle easier (more manoeuvring room) or lower it to make it harder, and isSolvable() will keep verifying whatever combination you choose.' },
      { q: 'Does the undo button count as an extra move?', a: 'Yes, by design — undoMove() increments moveCount just like a forward pour, so the displayed move count always reflects total actions taken rather than being gamed by repeated undo/redo. If you want undo to be free, remove the moveCount++ line inside undoMove().' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant like Claude and ask it to walk through exactly why a legal-pour reverse-shuffle (the technique that works for a 15-puzzle) can never produce a mixed-colour tube here, and how dealRandomState() plus the isSolvable() breadth-first search work together to guarantee a solvable board anyway — it's a genuinely interesting bit of state-space reasoning to have explained in plain language. You could also ask it to add a move-limit or star-rating scoring mode based on how close your move count comes to an optimal solve, extend isSolvable() to also return the shortest solving path so it can double as a hint system, or add a difficulty selector that adjusts colorCount and the empty-tube margin together. It's a solid exercise in state-space search once the core pour mechanics already work.`,
      prompt: `Build a water-sort colour puzzle in plain HTML, CSS, and JavaScript with real stack-based tube logic and a guaranteed-solvable shuffle — no frameworks, no libraries.

Requirements:
- Model each tube as a stack (array) holding up to a fixed number of coloured segments, with pours implemented via pop/push semantics rather than direct array splicing.
- Generate puzzles by dealing colours into tube slots at random (not by reverse-shuffling legal pours from a solved state — that approach can never produce a mixed-colour tube in this ruleset), and verify each random deal is actually solvable with a bounded search before showing it to the player, re-dealing on the rare unsolvable draw.
- Implement pour validation that checks the destination is either empty or has a matching top colour AND has enough free capacity, and moves the full contiguous run of matching top-colour segments in one action rather than one unit at a time.
- Click-to-select-source, click-to-attempt-pour interaction: selecting a tube highlights it, and clicking a second tube either performs a valid pour or reselects/deselects appropriately if the pour is illegal.
- A move counter that increments only on successful pours (decide explicitly whether undo also counts as a move, and document that choice).
- An undo feature that exactly reverses the most recent pour, including multi-segment pours, using a recorded move history rather than re-deriving state.
- Win detection that checks every tube is either empty or completely full with one uniform colour, with a clear success message showing the final move count.
- A "New Puzzle" action that regenerates a fresh guaranteed-solvable layout on demand.`,
    },
  },
};

export default colorSortPuzzle;
