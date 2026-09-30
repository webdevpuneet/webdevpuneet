const binarySearchVisualizer = {
  id: 'binary-search-visualizer',
  title: 'Binary Search Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="toolbar">
    <div class="field">
      <label class="label">Target value</label>
      <input type="number" id="target" value="42" />
    </div>
    <button class="btn btn-primary" id="btn-search">Search</button>
    <button class="btn" id="btn-shuffle">New Array</button>
  </div>
  <div class="ptr-row" id="ptr-row"></div>
  <div class="boxes" id="boxes"></div>
  <div class="log-panel">
    <div class="log-title">Comparison Log</div>
    <div class="log-list" id="log-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 640px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.toolbar { display: flex; align-items: flex-end; gap: 10px; flex-wrap: wrap; margin-bottom: 18px; }
.field { display: flex; flex-direction: column; gap: 4px; }
.label { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.field input { width: 110px; padding: 8px 10px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; color: #0f172a; }
.field input:focus { outline: none; border-color: #6366f1; }

.btn { font-size: 13px; font-weight: 600; padding: 9px 16px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; border-color: #4f46e5; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.ptr-row { display: flex; gap: 3px; height: 20px; margin-bottom: 4px; }
.ptr { flex: 1; display: flex; align-items: flex-end; justify-content: center; font-size: 10px; font-weight: 800; color: transparent; }
.ptr.show-low { color: #0891b2; }
.ptr.show-mid { color: #7c3aed; }
.ptr.show-high { color: #dc2626; }

.boxes { display: flex; gap: 3px; margin-bottom: 18px; }
.box { flex: 1; min-width: 0; aspect-ratio: 1; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; background: #f1f5f9; color: #475569; border-radius: 6px; transition: all 0.25s ease; }
.box.eliminated { opacity: 0.22; transform: scale(0.9); }
.box.mid { background: #7c3aed; color: #fff; transform: scale(1.12); box-shadow: 0 4px 14px rgba(124,58,237,0.35); }
.box.found { background: #22c55e; color: #fff; transform: scale(1.15); box-shadow: 0 4px 14px rgba(34,197,94,0.4); }
.box.range { background: #e0e7ff; }

.log-panel { border-top: 1px solid #f1f5f9; padding-top: 12px; }
.log-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px; }
.log-list { max-height: 160px; overflow-y: auto; display: flex; flex-direction: column; gap: 4px; }
.log-item { font-size: 12.5px; padding: 6px 10px; border-radius: 6px; background: #f8fafc; color: #475569; font-family: ui-monospace, monospace; }
.log-item.found { background: #dcfce7; color: #15803d; font-weight: 700; }
.log-item.notfound { background: #fee2e2; color: #b91c1c; font-weight: 700; }`,
  js: `const SIZE = 16;
let array = [];
let running = false;

function randomArray() {
  const set = new Set();
  while (set.size < SIZE) set.add(2 + Math.floor(Math.random() * 98));
  return Array.from(set).sort((a, b) => a - b);
}

function renderBoxes() {
  const boxes = document.getElementById('boxes');
  const ptrRow = document.getElementById('ptr-row');
  boxes.innerHTML = '';
  ptrRow.innerHTML = '';
  array.forEach(v => {
    const box = document.createElement('div');
    box.className = 'box';
    box.textContent = v;
    boxes.appendChild(box);
    const ptr = document.createElement('div');
    ptr.className = 'ptr';
    ptr.textContent = '';
    ptrRow.appendChild(ptr);
  });
}

function log(text, cls) {
  const list = document.getElementById('log-list');
  const item = document.createElement('div');
  item.className = 'log-item' + (cls ? ' ' + cls : '');
  item.textContent = text;
  list.appendChild(item);
  list.scrollTop = list.scrollHeight;
}

function clearPointers() {
  document.querySelectorAll('.ptr').forEach(p => { p.className = 'ptr'; p.textContent = ''; });
}

function setPointer(index, cls, label) {
  const ptrs = document.querySelectorAll('.ptr');
  if (ptrs[index]) {
    ptrs[index].classList.add(cls);
    ptrs[index].textContent = label;
  }
}

function buildSteps(target) {
  const steps = [];
  let lo = 0, hi = array.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    steps.push({ lo, hi, mid, value: array[mid], target });
    if (array[mid] === target) { steps.push({ found: true, mid }); break; }
    else if (array[mid] < target) lo = mid + 1;
    else hi = mid - 1;
  }
  if (!steps.length || !steps[steps.length - 1].found) steps.push({ notFound: true });
  return steps;
}

async function runSearch() {
  if (running) return;
  const target = Number(document.getElementById('target').value);
  if (Number.isNaN(target)) return;
  running = true;
  document.getElementById('btn-search').disabled = true;
  document.getElementById('log-list').innerHTML = '';
  document.querySelectorAll('.box').forEach(b => b.className = 'box');
  clearPointers();

  const steps = buildSteps(target);
  const boxes = document.querySelectorAll('.box');

  for (const step of steps) {
    await wait(650);
    if (step.found) {
      boxes[step.mid].className = 'box found';
      log('Found ' + target + ' at index ' + step.mid + '!', 'found');
      break;
    }
    if (step.notFound) {
      log(target + ' is not in the array.', 'notfound');
      break;
    }
    const { lo, hi, mid, value } = step;
    document.querySelectorAll('.box').forEach((b, i) => {
      b.classList.remove('mid', 'range');
      if (i < lo || i > hi) b.classList.add('eliminated');
      else { b.classList.remove('eliminated'); b.classList.add('range'); }
    });
    boxes[mid].classList.remove('range');
    boxes[mid].classList.add('mid');
    clearPointers();
    setPointer(lo, 'show-low', 'L');
    setPointer(mid, 'show-mid', 'M');
    setPointer(hi, 'show-high', 'H');

    let verdict;
    if (value === target) verdict = '== target, found it';
    else if (value < target) verdict = '< target (' + target + '), search right half';
    else verdict = '> target (' + target + '), search left half';
    log('lo=' + lo + ' hi=' + hi + ' mid=' + mid + ', arr[' + mid + ']=' + value + ' ' + verdict);
  }

  running = false;
  document.getElementById('btn-search').disabled = false;
}

function wait(ms) { return new Promise(res => setTimeout(res, ms)); }

function shuffle() {
  array = randomArray();
  document.getElementById('target').value = array[Math.floor(Math.random() * array.length)];
  renderBoxes();
  document.getElementById('log-list').innerHTML = '';
}

document.getElementById('btn-search').addEventListener('click', runSearch);
document.getElementById('btn-shuffle').addEventListener('click', shuffle);

shuffle();`,
  seo: {
    title: 'Binary Search Visualizer — Free HTML CSS JS Snippet',
    description: 'Animate low, mid, and high pointers narrowing on a target with a live comparison log for each step. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Binary Search Visualizer — Animated Low/Mid/High Pointers on a Sorted Array with Step-by-Step Comparison Log in Vanilla JS',
      description: `Binary search is usually taught with a paragraph of pseudocode and a static diagram, which hides the thing that actually makes it fast: **every single comparison throws away half of what's left.** This snippet makes that visible by animating the \`low\`, \`mid\`, and \`high\` pointers as they crawl across a row of sorted number boxes, dimming the eliminated half after every comparison and printing a plain-English log line for each step.

**Why the array must be sorted**

Binary search's entire correctness argument depends on one guarantee: if \`array[mid]\` is less than the target, every value to the left of \`mid\` is also less than the target, so the whole left half can be discarded without checking it individually. That guarantee only holds because the array is sorted ascending. This snippet enforces it structurally — \`randomArray()\` builds a \`Set\` of 16 unique random integers and immediately calls \`.sort((a,b) => a - b)\` before the array is ever rendered, so there is no code path that produces an unsorted state. If you swap in your own data, sorting it first isn't optional decoration, it's the precondition the entire algorithm depends on; run this same logic on unsorted data and the left/right elimination becomes wrong on the very first step.

**Step pre-computation, same architecture as the sorting visualizer**

\`buildSteps(target)\` runs the full binary search synchronously before any animation happens, pushing one record per comparison: \`{lo, hi, mid, value, target}\`, followed by either a \`{found: true, mid}\` or \`{notFound: true}\` terminal step. This mirrors the step-array architecture used across this library's other algorithm visualizers — the search logic and the on-screen playback are entirely separate concerns. The advantage here specifically is that the log panel and the box highlighting are guaranteed to describe exactly the same sequence of comparisons, since both are driven off the identical pre-computed step list rather than being narrated separately.

**The O(log n) intuition made concrete**

Each step computes \`mid = Math.floor((lo + hi) / 2)\` and then narrows either \`lo\` to \`mid + 1\` or \`hi\` to \`mid - 1\` — never both, and never a small adjustment, always cutting the live range \`[lo, hi]\` exactly in half. With 16 elements, that means the range shrinks 16 → 8 → 4 → 2 → 1, so the search is guaranteed to finish in at most 4 comparisons regardless of where the target sits or whether it's present at all. That is the entire content of "O(log n)": every step does a constant amount of work but eliminates a *proportion* of what's left rather than a fixed count, so the number of steps needed grows logarithmically, not linearly, as the array grows. Doubling the array to 32 elements adds only one more possible step, not sixteen — a fact that becomes visually obvious once you've watched the elimination happen a few times.

**Rendering the elimination and pointer animation**

Every comparison step repaints all boxes: indices outside the current \`[lo, hi]\` window get the \`.eliminated\` class (22% opacity, slightly scaled down via a CSS transition), indices still in play get a light indigo \`.range\` background, and the \`mid\` box itself gets a distinct violet \`.mid\` style with a scale-up and shadow so it's unmistakable which element is being compared right now. A separate row of pointer labels above the boxes — \`L\`, \`M\`, \`H\` in cyan, violet, and red respectively — is cleared and repositioned above the correct box index on every step using \`querySelectorAll('.ptr')[index]\`, giving a textbook-style visual of the three pointers converging without needing any SVG or canvas.

**The comparison log as a plain-English trace**

Every step also appends a line to the log panel in the exact format \`lo=3 hi=10 mid=6, arr[6]=42 > 30, search left half\` — deliberately readable without any algorithm background, generated by a simple three-way branch comparing \`value\` to \`target\`. This log is what turns an abstract animation into something closer to a textbook walkthrough: a learner can pause at any point, read the last log line, and understand exactly why the algorithm chose to look left or right next, reinforcing the pointer movement they're watching simultaneously above.

**Async/await pacing instead of a manual timer loop**

Unlike the sorting and pathfinding visualizers in this library, which use a \`setTimeout\`-driven \`tick()\` function, this one uses a single \`async function runSearch()\` with a \`wait(ms)\` helper that wraps \`setTimeout\` in a Promise. Because binary search never has more than a handful of steps (at most \`log2(n)\`), a simple \`for...of\` loop with \`await wait(650)\` between iterations is simpler to read and reason about than a recursive scheduler, while still keeping the algorithm (\`buildSteps\`) and the animation (\`runSearch\`) in clearly separate functions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Enter a target value in the input field', text: 'Type any number. New Array pre-fills a value that actually exists in the current array so you can see a successful search on first load.' },
      { title: 'Click Search to start the animation', text: 'The low (cyan), mid (violet), and high (red) pointers appear above the boxes, and the array boxes reset to their full, non-eliminated state.' },
      { title: 'Watch the mid box highlight and half the array dim', text: 'Each step highlights the current mid box in violet and fades the eliminated half to 22% opacity, visually shrinking the active search range on every comparison.' },
      { title: 'Read the comparison log as it appends live', text: 'Each step logs a line like "lo=0 hi=15 mid=7, arr[7]=51 > 30, search left half" so you can follow exactly why the algorithm moved the pointers where it did.' },
      { title: 'See the found box turn green, or a not-found message', text: 'If the target exists, its box pulses green and scales up; if the range collapses without a match, the log shows a red "not in the array" line instead.' },
      { title: 'Click New Array to reset with fresh sorted values', text: 'Generates 16 new unique random integers, sorts them ascending, and clears the pointers and log so you can try another search from scratch.' },
    ]},
    features: [
      'Sorted-array precondition enforced structurally: Set-based dedup + sort() runs before any rendering happens',
      'Steps pre-computed by buildSteps() as {lo, hi, mid, value} records before the animation plays',
      'Three animated pointer labels (low, mid, high) repositioned above the correct box index on every step',
      'Eliminated half fades via CSS opacity + scale transition rather than being removed from the DOM',
      'Plain-English comparison log line generated per step: lo/hi/mid values plus the branch taken',
      'Async/await + Promise-wrapped setTimeout pacing instead of a manual recursive timer loop',
      'Found state pulses green with a scale-up and shadow; not-found produces a distinct red log entry',
      'New Array button guarantees the pre-filled target exists in the array for a reliable first demo',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching binary search and O(log n) complexity', desc: 'Show students that a 16-element array always resolves in at most 4 comparisons, then a 1000-element array in at most 10 — making logarithmic growth concrete instead of abstract. Pair with the [sorting algorithm visualizer](/ui-snippets/sorting-algorithm-visualizer) since binary search assumes sorted input.' },
      { icon: 'CODE', title: 'Interview preparation for binary search edge cases', desc: 'Binary search off-by-one bugs (using mid instead of mid+1/mid-1, or <= versus <) are a classic interview stumbling block. Watching lo and hi converge step by step in the log builds the muscle memory needed to write it correctly under pressure.' },
      { icon: 'APP', title: 'Documentation for a search API or database index feature', desc: 'Explain to engineering audiences why a sorted index enables logarithmic lookups compared to a linear table scan, using this visualizer as a live companion to database indexing documentation.' },
      { icon: 'DESIGN', title: 'Interactive algorithm demo embedded in a CS blog post', desc: 'Drop into an article explaining searching algorithms as a live, testable demo rather than a static diagram. Fully self-contained with no build step, works inside any [UI snippets](/ui-snippets) gallery or iframe.' },
      { icon: 'FORM', title: 'Reference implementation for pointer-narrowing UI patterns', desc: 'A clean reference for any UI that needs to visualize a shrinking range with clearly labeled boundary markers, a pattern that also shows up in range sliders and [date range picker](/ui-snippets) components.' },
      { icon: 'CODE', title: 'Related: Canvas Pixelate Image Reveal', desc: 'See the [Canvas Pixelate Image Reveal](/ui-snippets/canvas-image-pixelate-reveal/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Gear-to-Checkmark Icon Morph', desc: 'See the [Gear-to-Checkmark Icon Morph](/ui-snippets/gear-to-checkmark-icon-morph/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can I use this binary search visualizer in React, Vue, or Angular?', a: 'Yes. Move buildSteps() into a utils function that takes an array and target and returns the step list — it is pure and framework-agnostic. In React, trigger the animation from a click handler that runs an async loop inside a useCallback, and if the component can unmount mid-search, guard each await wait() continuation with an isMounted ref check, or track the pending timeout id in a ref and clear it in a useEffect cleanup. In Vue, run the same async function from a method and check a component-level flag before updating state after each await. In Angular, run it from a component method and check an isDestroyed flag set in ngOnDestroy before touching the DOM after each awaited step.' },
      { q: 'Why does binary search require a sorted array?', a: 'The algorithm decides which half to discard based on a single comparison at the midpoint, assuming everything to one side is uniformly smaller and everything to the other side is uniformly larger. If the array is not sorted, that assumption is false, so eliminating an entire half based on one comparison can throw away the target itself. This snippet guarantees the precondition by always sorting the generated array before it is ever displayed or searched.' },
      { q: 'What is the actual time complexity and why is it O(log n)?', a: 'Every comparison discards roughly half of the remaining search range, so after k comparisons the range has shrunk by a factor of 2^k. The search ends when the range is reduced to zero elements, which happens once 2^k >= n, i.e. k >= log2(n). That is why the number of steps grows logarithmically with array size rather than linearly like a plain scan — doubling the array size adds only one more possible comparison, not double the work.' },
      { q: 'What happens if the target value appears more than once in the array?', a: 'This implementation stops at the first index where array[mid] equals the target, which is not guaranteed to be the first or last occurrence of a duplicated value — standard binary search only guarantees finding *a* match, not a specific one. To find the leftmost occurrence, change the found branch to keep narrowing hi = mid - 1 instead of breaking immediately, and track the best match found so far; a symmetric change finds the rightmost occurrence.' },
      { q: 'How do I change the array size or make it editable by the user?', a: 'Change the SIZE constant to generate a different number of unique random values (the Set-based generator scales to any size). To let users type their own sorted list, add a text input, parse it with .split(",").map(Number), sort it defensively with .sort((a,b) => a - b) even if you expect it pre-sorted, and assign the result to array before calling renderBoxes() — never skip the defensive sort, since an unsorted input silently breaks the algorithm\'s core guarantee.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JavaScript to an AI assistant like Claude and ask it to walk through exactly why Math.floor((lo + hi) / 2) combined with lo = mid + 1 / hi = mid - 1 guarantees termination — a surprisingly common source of infinite-loop bugs when written slightly differently. Good extensions to request: finding the first/last occurrence of a duplicated target, an "exponential search" variant for unbounded/streamed arrays, or a side-by-side race between binary search and linear search showing comparison counts diverge as array size grows.`,
      prompt: `Build an animated binary search visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- Generate and display a sorted row of unique random number boxes (roughly 16 values), guaranteeing sort order is enforced before display, never left to chance.
- Provide a numeric input for a target value and a Search button that starts the animation.
- Pre-compute the entire search as a flat array of step objects (lo, hi, mid, value at mid) by running the real binary search algorithm to completion before any animation begins, keeping the algorithm function pure and separate from the rendering/animation function.
- Animate three labeled pointers (low, mid, high) that reposition above the correct box index on every step, using distinct colors for each.
- On every step, visually fade/dim the half of the array outside the current [low, high] range using a CSS transition, and highlight the mid box distinctly (different color, slight scale-up).
- Append a plain-English log line for every comparison in the format "lo=X hi=Y mid=Z, arr[Z]=V > target, search left half" (or the appropriate direction/equality case), so a reader can trace the algorithm's decisions without reading code.
- Show a clear success state (found box pulses a success color) or a not-found state (distinct log entry) once the search terminates, and support re-running with a new randomly generated sorted array.`,
    },
  },
};

export default binarySearchVisualizer;
