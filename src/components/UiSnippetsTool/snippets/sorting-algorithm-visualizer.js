const sortingAlgorithmVisualizer = {
  id: 'sorting-algorithm-visualizer',
  title: 'Sorting Algorithm Visualizer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="wrap">
  <div class="toolbar">
    <div class="algo-tabs" id="algo-tabs">
      <button class="algo-tab active" data-algo="bubble">Bubble Sort</button>
      <button class="algo-tab" data-algo="selection">Selection Sort</button>
      <button class="algo-tab" data-algo="insertion">Insertion Sort</button>
      <button class="algo-tab" data-algo="quick">Quick Sort</button>
      <button class="algo-tab" data-algo="merge">Merge Sort</button>
    </div>
    <div class="controls-row">
      <button class="btn btn-primary" id="btn-play">Play</button>
      <button class="btn" id="btn-shuffle">Shuffle</button>
      <label class="speed-label">Speed
        <input type="range" id="speed" min="1" max="100" value="60">
      </label>
    </div>
  </div>
  <div class="stage" id="stage"></div>
  <div class="stats-row">
    <div class="stat"><span class="stat-label">Comparisons</span><span class="stat-val" id="stat-compares">0</span></div>
    <div class="stat"><span class="stat-label">Swaps</span><span class="stat-val" id="stat-swaps">0</span></div>
    <div class="stat"><span class="stat-label">Status</span><span class="stat-val" id="stat-status">Idle</span></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.wrap { width: 100%; max-width: 640px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; }

.toolbar { display: flex; flex-direction: column; gap: 12px; margin-bottom: 16px; }
.algo-tabs { display: flex; flex-wrap: wrap; gap: 6px; }
.algo-tab { font-size: 12.5px; font-weight: 600; padding: 7px 12px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #f8fafc; color: #64748b; cursor: pointer; transition: all 0.15s; }
.algo-tab:hover { border-color: #a5b4fc; color: #4f46e5; }
.algo-tab.active { background: #6366f1; border-color: #6366f1; color: #fff; }

.controls-row { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
.btn { font-size: 13px; font-weight: 600; padding: 8px 16px; border-radius: 8px; border: 1.5px solid #e2e8f0; background: #fff; color: #374151; cursor: pointer; transition: all 0.15s; }
.btn:hover { border-color: #cbd5e1; background: #f8fafc; }
.btn-primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; border-color: #4f46e5; }
.btn:disabled { opacity: 0.5; cursor: not-allowed; }

.speed-label { display: flex; align-items: center; gap: 8px; font-size: 12px; font-weight: 600; color: #64748b; margin-left: auto; }
.speed-label input { accent-color: #6366f1; }

.stage { height: 220px; display: flex; align-items: flex-end; gap: 3px; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 10px; padding: 10px; }

.bar { flex: 1; border-radius: 4px 4px 2px 2px; background: #94a3b8; transition: height 0.18s ease, background-color 0.15s ease, transform 0.15s ease; position: relative; min-width: 2px; }
.bar.compare { background: #f59e0b; transform: scaleY(1.02); }
.bar.swap { background: #ef4444; }
.bar.sorted { background: #22c55e; }
.bar.pivot { background: #8b5cf6; }

.stats-row { display: flex; gap: 20px; margin-top: 14px; padding-top: 14px; border-top: 1px solid #f1f5f9; }
.stat { display: flex; flex-direction: column; gap: 2px; }
.stat-label { font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-val { font-size: 15px; font-weight: 700; color: #0f172a; }`,
  js: `let array = [];
let steps = [];
let stepIndex = 0;
let timer = null;
let playing = false;
let currentAlgo = 'bubble';
let compares = 0;
let swaps = 0;
const SIZE = 32;

function randomArray() {
  return Array.from({ length: SIZE }, () => 8 + Math.floor(Math.random() * 92));
}

function buildSteps(arr, algo) {
  const a = arr.slice();
  const list = [];
  if (algo === 'bubble') bubbleSteps(a, list);
  else if (algo === 'selection') selectionSteps(a, list);
  else if (algo === 'insertion') insertionSteps(a, list);
  else if (algo === 'quick') quickSteps(a, 0, a.length - 1, list);
  else if (algo === 'merge') mergeSteps(a, 0, a.length - 1, list);
  list.push({ type: 'done' });
  return list;
}

function bubbleSteps(a, list) {
  const n = a.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      list.push({ type: 'compare', i: j, j: j + 1 });
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        list.push({ type: 'swap', i: j, j: j + 1 });
      }
    }
    list.push({ type: 'mark-sorted', i: n - i - 1 });
  }
  list.push({ type: 'mark-sorted', i: 0 });
}

function selectionSteps(a, list) {
  const n = a.length;
  for (let i = 0; i < n; i++) {
    let min = i;
    for (let j = i + 1; j < n; j++) {
      list.push({ type: 'compare', i: min, j });
      if (a[j] < a[min]) min = j;
    }
    if (min !== i) {
      [a[i], a[min]] = [a[min], a[i]];
      list.push({ type: 'swap', i, j: min });
    }
    list.push({ type: 'mark-sorted', i });
  }
}

function insertionSteps(a, list) {
  const n = a.length;
  for (let i = 1; i < n; i++) {
    let j = i;
    while (j > 0) {
      list.push({ type: 'compare', i: j - 1, j });
      if (a[j - 1] > a[j]) {
        [a[j - 1], a[j]] = [a[j], a[j - 1]];
        list.push({ type: 'swap', i: j - 1, j });
        j--;
      } else break;
    }
  }
  for (let i = 0; i < n; i++) list.push({ type: 'mark-sorted', i });
}

function quickSteps(a, lo, hi, list) {
  if (lo >= hi) {
    if (lo === hi) list.push({ type: 'mark-sorted', i: lo });
    return;
  }
  const pivot = a[hi];
  list.push({ type: 'pivot', i: hi });
  let p = lo;
  for (let k = lo; k < hi; k++) {
    list.push({ type: 'compare', i: k, j: hi });
    if (a[k] < pivot) {
      [a[k], a[p]] = [a[p], a[k]];
      if (k !== p) list.push({ type: 'swap', i: k, j: p });
      p++;
    }
  }
  [a[p], a[hi]] = [a[hi], a[p]];
  list.push({ type: 'swap', i: p, j: hi });
  list.push({ type: 'mark-sorted', i: p });
  quickSteps(a, lo, p - 1, list);
  quickSteps(a, p + 1, hi, list);
}

function mergeSteps(a, lo, hi, list) {
  if (lo >= hi) return;
  const mid = Math.floor((lo + hi) / 2);
  mergeSteps(a, lo, mid, list);
  mergeSteps(a, mid + 1, hi, list);
  const left = a.slice(lo, mid + 1);
  const right = a.slice(mid + 1, hi + 1);
  let i = 0, j = 0, k = lo;
  while (i < left.length && j < right.length) {
    list.push({ type: 'compare', i: lo + i, j: mid + 1 + j });
    if (left[i] <= right[j]) { a[k] = left[i]; i++; }
    else { a[k] = right[j]; j++; }
    list.push({ type: 'overwrite', i: k, value: a[k] });
    k++;
  }
  while (i < left.length) { a[k] = left[i]; list.push({ type: 'overwrite', i: k, value: a[k] }); i++; k++; }
  while (j < right.length) { a[k] = right[j]; list.push({ type: 'overwrite', i: k, value: a[k] }); j++; k++; }
  for (let m = lo; m <= hi; m++) list.push({ type: 'mark-sorted-transient', i: m });
}

function renderBars() {
  const stage = document.getElementById('stage');
  stage.innerHTML = '';
  array.forEach((v) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = v + '%';
    stage.appendChild(bar);
  });
}

function bars() { return document.getElementById('stage').children; }

function clearHighlights() {
  Array.from(bars()).forEach(b => b.classList.remove('compare', 'swap', 'pivot'));
}

function applyStep(step) {
  const els = bars();
  if (step.type === 'compare') {
    clearHighlights();
    els[step.i].classList.add('compare');
    els[step.j].classList.add('compare');
    compares++;
  } else if (step.type === 'swap') {
    const hi = els[step.i].style.height;
    els[step.i].style.height = els[step.j].style.height;
    els[step.j].style.height = hi;
    els[step.i].classList.add('swap');
    els[step.j].classList.add('swap');
    swaps++;
  } else if (step.type === 'overwrite') {
    els[step.i].style.height = step.value + '%';
    els[step.i].classList.add('swap');
    swaps++;
  } else if (step.type === 'pivot') {
    els[step.i].classList.add('pivot');
  } else if (step.type === 'mark-sorted') {
    els[step.i].classList.add('sorted');
  } else if (step.type === 'mark-sorted-transient') {
    els[step.i].classList.remove('compare', 'swap');
  } else if (step.type === 'done') {
    Array.from(els).forEach(b => b.classList.add('sorted'));
    document.getElementById('stat-status').textContent = 'Sorted';
    pause();
  }
  document.getElementById('stat-compares').textContent = compares;
  document.getElementById('stat-swaps').textContent = swaps;
}

function tick() {
  if (stepIndex >= steps.length) { pause(); return; }
  applyStep(steps[stepIndex]);
  stepIndex++;
  const speed = Number(document.getElementById('speed').value);
  const delay = Math.max(4, 220 - speed * 2);
  timer = setTimeout(tick, delay);
}

function play() {
  if (playing) return;
  if (stepIndex >= steps.length) resetSteps();
  playing = true;
  document.getElementById('btn-play').textContent = 'Pause';
  document.getElementById('stat-status').textContent = 'Sorting';
  tick();
}

function pause() {
  playing = false;
  clearTimeout(timer);
  document.getElementById('btn-play').textContent = 'Play';
  if (document.getElementById('stat-status').textContent === 'Sorting') {
    document.getElementById('stat-status').textContent = 'Paused';
  }
}

function resetSteps() {
  clearTimeout(timer);
  stepIndex = 0;
  compares = 0;
  swaps = 0;
  steps = buildSteps(array, currentAlgo);
  renderBars();
  document.getElementById('stat-compares').textContent = '0';
  document.getElementById('stat-swaps').textContent = '0';
  document.getElementById('stat-status').textContent = 'Idle';
}

function shuffle() {
  array = randomArray();
  playing = false;
  document.getElementById('btn-play').textContent = 'Play';
  resetSteps();
}

document.querySelectorAll('.algo-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.algo-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    currentAlgo = tab.dataset.algo;
    pause();
    resetSteps();
  });
});

document.getElementById('btn-play').addEventListener('click', () => {
  if (playing) pause(); else play();
});
document.getElementById('btn-shuffle').addEventListener('click', shuffle);

shuffle();`,
  seo: {
    title: 'Sorting Algorithm Visualizer — Free HTML CSS JS Snippet',
    description: 'Animated bar-array visualizer for Bubble, Selection, Insertion, Quick & Merge sort with live counters. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Sorting Algorithm Visualizer — Animated Bar Comparison for Bubble, Selection, Insertion, Quick & Merge Sort in Vanilla JS',
      description: `Most sorting visualizations you find online hardcode the animation directly into the sorting function — a \`setTimeout\` or \`await sleep()\` call sits right inside the comparison loop, which means the algorithm's actual logic and its on-screen playback speed are permanently welded together. This snippet takes a different, more reusable approach: **every algorithm is compiled into a flat array of step objects before a single frame is drawn.** Each step is a small descriptive record like \`{type:'compare', i, j}\`, \`{type:'swap', i, j}\`, or \`{type:'mark-sorted', i}\`. The sorting functions themselves — \`bubbleSteps\`, \`selectionSteps\`, \`insertionSteps\`, \`quickSteps\`, \`mergeSteps\` — run to completion synchronously against a plain copy of the array, pushing a step for every comparison and mutation, with zero knowledge of timing, DOM elements, or animation at all.

**Why decoupling steps from playback matters**

Once the full step list exists, a single \`tick()\` function walks it on a \`setTimeout\` loop, applying one step per call and scheduling the next with a delay computed from the speed slider (\`Math.max(4, 220 - speed * 2)\`). This separation is the single most important idea in the file, and it is the same pattern reused across the pathfinding grid visualizer (BFS/A* frontier expansion) and the recursion tree visualizer (call-stack push/pop events) in this library — any traversal or search algorithm can be pre-computed into steps, then replayed at any speed, paused, or even scrubbed backward, because the algorithm never has to be re-run to change the pacing. It also makes the counters trivially accurate: \`compares\` and \`swaps\` increment inside \`applyStep()\` exactly once per comparison or swap step, so the displayed numbers always match what's rendered, not an approximation.

**How each algorithm is translated into steps**

Bubble, selection, and insertion sort push one \`compare\` step per inner-loop comparison and one \`swap\` step whenever two elements exchange positions — the visual choreography follows directly from the textbook pseudocode, which is why bubble sort visibly "bubbles" the largest remaining value to the right on every outer pass. Quick sort adds a \`pivot\` step (colored violet) before partitioning around \`a[hi]\`, using the Lomuto partition scheme, then recurses on the two sub-ranges exactly like the real algorithm — so the animation shows partitioning happening independently within shrinking sub-arrays, which is the detail that makes quicksort's average O(n log n) behavior visually distinct from bubble sort's O(n²) crawl. Merge sort is the odd one out: it doesn't swap in place, it **overwrites**. The \`mergeSteps\` function recursively splits the array, merges two sorted halves into temporary \`left\`/\`right\` slices, and pushes an \`overwrite\` step (\`{type:'overwrite', i, value}\`) for every value written back — so on screen you see bars snapping to new heights rather than trading places, which is an honest visual representation of merge sort actually needing auxiliary space.

**Bar rendering and color-coded state**

Each bar is a plain \`<div>\` with its \`height\` set as a CSS percentage and a \`transition: height 0.18s ease\` — so even though JavaScript sets the height instantly, the browser's compositor animates the visual change smoothly without any \`requestAnimationFrame\` bookkeeping. Four classes carry meaning: \`.compare\` (amber, applied to the two indices currently being examined), \`.swap\` (red, applied briefly to bars that just exchanged values), \`.pivot\` (violet, quicksort's anchor element), and \`.sorted\` (green, permanently applied once an index's final position is confirmed). \`clearHighlights()\` strips the transient amber/red classes before applying a new compare step so only the current comparison is ever highlighted, keeping the visualization readable even at high speed.

**Speed slider and the setTimeout scheduling formula**

The speed slider ranges from 1 to 100 and feeds directly into the delay formula \`220 - speed * 2\`, clamped to a 4ms floor so that even at maximum speed there's still one animation frame's worth of breathing room and the browser doesn't lock up mid-sort on a 500-element style array. Because \`tick()\` re-reads the slider's value on every single scheduled call rather than caching it once, dragging the slider mid-sort changes the pace immediately — there's no need to restart the sort or rebuild the step list, since the steps and the timing are fully independent by design.

**Why array snapshots avoid a subtle bug**

Every \`*Steps\` function operates on \`arr.slice()\`, a shallow copy, rather than the live \`array\` variable. This avoids a bug that's easy to introduce: if the step-generation functions mutated the same array object that \`renderBars()\` reads from, the array would already be fully sorted before the first frame ever plays, because step generation runs synchronously and instantly, while playback is deliberately slow. Working on a copy guarantees the visualization always starts from the original shuffled state and only reaches the sorted state after all steps have actually played out on screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Pick an algorithm from the tab row', text: 'Choose Bubble, Selection, Insertion, Quick, or Merge Sort. The bar array instantly resets to its unsorted shuffled state and the comparison/swap counters return to zero.' },
      { title: 'Click Play to start the animation', text: 'Bars begin comparing in amber pairs and swapping with a red flash. Watch how differently each algorithm approaches the same starting array — bubble sort crawls, quick sort jumps around a pivot.' },
      { title: 'Drag the speed slider at any time', text: 'The delay between animation steps recalculates on every tick, so speed changes apply immediately mid-sort with no restart, letting you slow down to study a tricky partition or speed up to see the full pass.' },
      { title: 'Watch bars lock in green as they finalize', text: 'Once an index reaches its permanent sorted position it turns green and never changes color again. By the end every bar is green, confirming the sort is complete.' },
      { title: 'Click Shuffle for a new random array', text: 'Generates a fresh set of 32 random bar heights and rebuilds the step list for whichever algorithm tab is currently active, resetting all counters to zero.' },
      { title: 'Compare counters across algorithms', text: 'Run the same array size through Bubble Sort and then Quick Sort back to back and compare the final Comparisons and Swaps counts — the gap between O(n²) and O(n log n) becomes a concrete number instead of an abstract notation.' },
    ]},
    features: [
      'Five algorithms: Bubble, Selection, Insertion, Quick (Lomuto partition), and Merge Sort',
      'Steps pre-computed as a flat array of {type, i, j} records before any animation plays',
      'setTimeout-driven playback loop fully decoupled from sorting logic — speed changes apply mid-sort instantly',
      'Live comparison and swap counters incremented inside a single applyStep() function for accuracy',
      'Color-coded bar states: amber compare, red swap, violet pivot, green sorted',
      'Merge sort uses overwrite steps instead of swaps, visually distinguishing it from in-place algorithms',
      'Speed slider maps 1-100 to a clamped millisecond delay with a 4ms floor to prevent UI lockup',
      'Play/Pause toggle and Shuffle button both fully reset or resume animation state cleanly',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching algorithm complexity in a classroom or bootcamp', desc: 'Run the same shuffled array through Bubble Sort and Quick Sort back to back so students see O(n²) versus O(n log n) as a real comparison-count difference, not just Big-O notation on a whiteboard. Pair with the [binary search visualizer](/ui-snippets/binary-search-visualizer) to build a full "searching and sorting" lesson module.' },
      { icon: 'CODE', title: 'Technical interview prep and algorithm self-study', desc: 'Step through Quick Sort at low speed to trace exactly how the Lomuto partition scheme moves the pivot, which is one of the most commonly whiteboarded interview questions. Watching the pivot (violet) and partition boundary evolve step-by-step builds intuition that reading pseudocode alone rarely gives.' },
      { icon: 'DESIGN', title: 'Portfolio and CS-education website interactive demo', desc: 'Drop this into a computer-science blog post or portfolio piece as a live, embedded demonstration rather than a static GIF. The self-contained HTML/CSS/JS means it runs in any iframe or [UI snippets](/ui-snippets) gallery without a build step.' },
      { icon: 'APP', title: 'Documentation for a sorting library or coding course platform', desc: 'Course platforms like the ones teaching data structures benefit from a visual companion to code samples. Reuse the step-array architecture to add your own algorithms (heap sort, shell sort) by writing one more *Steps function that pushes compare/swap records.' },
      { icon: 'FORM', title: 'Reference implementation for step-based animation architecture', desc: 'Because the algorithm logic and the playback timer are fully separate, this is a good reference for any UI that needs "compute everything, then replay it at a controllable pace" — the same pattern used by the [recursion tree visualizer](/ui-snippets/recursion-tree-visualizer) for call-stack events and the [pathfinding grid visualizer](/ui-snippets/pathfinding-grid-visualizer) for search frontiers.' },
    ],
    faqs: [
      { q: 'Can I use this sorting visualizer in React, Vue, or Angular?', a: 'Yes. In React, move buildSteps/bubbleSteps/etc. into a utils file, generate the step array in a useMemo keyed on the array and algorithm, and drive playback with useEffect that sets a setInterval or recursive setTimeout — clear it in the cleanup function to avoid ticking after unmount. In Vue, call buildSteps() in a method and drive tick() from onMounted, clearing the timer in onUnmounted. In Angular, generate steps in ngOnInit and manage the timer in a service, clearing it in ngOnDestroy. In every framework, the critical rule is the same: whatever schedules tick() (setTimeout or setInterval) must be cleared on unmount/pause, or the timer keeps firing against DOM nodes that no longer exist.' },
      { q: 'Why does merge sort look different from the other algorithms during playback?', a: 'Merge sort is not an in-place algorithm — it needs auxiliary arrays to merge two sorted halves, so this snippet models it with overwrite steps (bars snapping to a new height) rather than swap steps (two bars trading heights). This is intentional and accurate: showing merge sort as a series of swaps would misrepresent how the algorithm actually works and hide the O(n) auxiliary space it requires.' },
      { q: 'How do I add another algorithm like Heap Sort or Shell Sort?', a: 'Write a new function following the same contract as the existing ones: accept a plain array copy and a shared list array, push {type:"compare", i, j} before every comparison and {type:"swap", i, j} (or {type:"overwrite", i, value} if not in-place) after every mutation, then push {type:"mark-sorted", i} for finalized indices. Add it to the algo dispatch in buildSteps() and a matching tab button with a data-algo attribute — the playback engine, counters, and color states all work automatically with no other changes.' },
      { q: 'Why use setTimeout instead of requestAnimationFrame for the playback loop?', a: 'requestAnimationFrame is ideal for continuous per-frame motion like dragging or physics, but this visualizer needs discrete, variable-length pauses between logically meaningful steps (one comparison, one swap) rather than a fixed 60fps cadence. setTimeout with a delay computed from the speed slider gives precise control over how long each step is visible, which matters more here than frame-perfect smoothness — and it makes the pause/resume logic trivial since clearTimeout instantly halts playback at an exact step boundary.' },
      { q: 'Can I make the array size configurable instead of the fixed 32 bars?', a: 'Yes — change the SIZE constant and randomArray() will generate that many bars. For arrays larger than roughly 80, reduce the CSS gap between .bar elements and consider raising the speed slider default, since O(n²) algorithms like bubble and insertion sort generate proportionally many more steps and can take a long time to finish at slow speeds with a larger n.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to trace exactly how quickSteps() implements the Lomuto partition scheme, or how mergeSteps() reconstructs the sorted range from two temporary slices — both are classic points of confusion. It's also worth asking the assistant to add heap sort or shell sort following the existing step-object contract, add a "step backward" button using the same pre-computed array, or add ARIA live-region announcements for each comparison so the visualizer is usable with a screen reader.`,
      prompt: `Build an animated sorting algorithm visualizer in plain HTML, CSS, and JavaScript, no libraries or frameworks.

Requirements:
- Render an array of 30+ values as a row of divs whose height represents the value, with smooth CSS-transitioned height changes.
- Support at least Bubble Sort, Selection Sort, Insertion Sort, and Quick Sort, selectable via tab buttons that reset the array and rebuild the animation.
- Architect each algorithm to run to completion up front against a plain copy of the array, pushing a flat array of discrete step objects (e.g. {type:'compare', i, j} and {type:'swap', i, j}) — the algorithm itself must never call setTimeout or know about timing.
- Play back the pre-computed step array using a single timer-driven loop that applies one step per tick, so animation speed is fully decoupled from the sorting logic and can change mid-sort without restarting.
- Color-code bar state during playback: one color for the two elements currently being compared, another for elements that just swapped, and a third for elements confirmed in their final sorted position.
- Include a speed slider that changes the delay between steps in real time, a shuffle button that generates a new random array, and live counters for total comparisons and total swaps.
- Ensure Play/Pause can stop and resume cleanly at the exact step index, and that switching algorithms or shuffling always fully resets step index, counters, and bar colors.`,
    },
  },
};

export default sortingAlgorithmVisualizer;
