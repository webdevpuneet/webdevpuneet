const binaryHeapPriorityQueueVisualizer = {
  id: 'binary-heap-priority-queue-visualizer',
  title: 'Binary Heap Priority Queue Visualizer',
  lastmod: '2026-09-25',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="bh">
  <div class="bh-top">
    <div>
      <h2>Binary min-heap</h2>
      <p>A tree stored in a plain array. Parent of <code>i</code> is <code>⌊(i−1)/2⌋</code>; children are <code>2i+1</code> and <code>2i+2</code>.</p>
    </div>
    <form class="bh-form" id="bhForm">
      <input type="number" id="bhVal" min="1" max="99" placeholder="1–99" aria-label="Value to insert">
      <button type="submit">Insert</button>
      <button type="button" id="bhRand" class="ghost">Random</button>
      <button type="button" id="bhPop" class="pop">Extract min</button>
    </form>
  </div>
  <svg id="bhTree" viewBox="0 0 800 300" role="img" aria-label="Heap as a tree"></svg>
  <div class="bh-array" id="bhArray" aria-label="Heap as an array"></div>
  <div class="bh-log" id="bhLog" aria-live="polite"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fffbeb;color:#1c1917;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.bh{width:100%;max-width:900px}
.bh-top{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}
.bh h2{font-size:18px}
.bh-top p{font-size:12px;color:#78716c;margin-top:4px}
.bh code{background:#fef3c7;padding:1px 5px;border-radius:4px;font-size:11px}
.bh-form{display:flex;gap:6px;flex-wrap:wrap}
.bh-form input{width:80px;border:1px solid #d6d3d1;border-radius:9px;padding:8px 10px;font:600 13px system-ui}
.bh-form button{border:0;border-radius:9px;padding:8px 12px;font:700 12px system-ui;background:#1c1917;color:#fff;cursor:pointer}
.bh-form button.ghost{background:#fff;color:#1c1917;border:1px solid #d6d3d1}
.bh-form button.pop{background:#dc2626}
.bh-form button:disabled{opacity:.4;cursor:default}
.bh-form :focus-visible{outline:2px solid #f59e0b;outline-offset:2px}
#bhTree{width:100%;margin-top:14px;background:#fff;border:1px solid #fde68a;border-radius:14px}
#bhTree line{stroke:#e7e5e4;stroke-width:2}
#bhTree circle{fill:#fff;stroke:#a8a29e;stroke-width:2;transition:fill .2s,stroke .2s}
#bhTree text{font:800 14px system-ui;text-anchor:middle;dominant-baseline:central;fill:#1c1917}
#bhTree .idx{font:600 9px system-ui;fill:#a8a29e}
#bhTree .root circle{stroke:#16a34a;stroke-width:3}
#bhTree .cmp circle{fill:#fef3c7;stroke:#f59e0b}
#bhTree .swap circle{fill:#fde68a;stroke:#d97706;stroke-width:3}
.bh-array{display:flex;gap:4px;flex-wrap:wrap;margin-top:12px}
.bh-cell{width:44px;text-align:center;border:1px solid #e7e5e4;border-radius:8px;background:#fff;padding:6px 0}
.bh-cell b{display:block;font-size:15px}
.bh-cell small{font-size:10px;color:#a8a29e}
.bh-cell.cmp{background:#fef3c7;border-color:#f59e0b}
.bh-cell.swap{background:#fde68a;border-color:#d97706}
.bh-log{margin-top:12px;font-size:13px;color:#44403c;background:#fff;border:1px solid #fde68a;border-radius:12px;padding:10px 12px;min-height:42px}`,

  js: `var heap = [];
var busy = false;
var tree = document.getElementById('bhTree');
var arr = document.getElementById('bhArray');
var logEl = document.getElementById('bhLog');
var NS = 'http://www.w3.org/2000/svg';
var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
var PAUSE = reduce ? 0 : 520;

function wait() { return new Promise(function (r) { setTimeout(r, PAUSE); }); }
function parent(i) { return Math.floor((i - 1) / 2); }

// Position of index i: level = floor(log2(i+1)); nodes spread evenly
// across that level. This is only for drawing; the heap is just the array.
function pos(i) {
  var level = Math.floor(Math.log2(i + 1));
  var first = Math.pow(2, level) - 1;
  var slots = Math.pow(2, level);
  return [((i - first + 0.5) / slots) * 800, 36 + level * 62];
}

function render(mark) {
  mark = mark || {};
  tree.innerHTML = '';
  heap.forEach(function (_, i) {
    if (!i) return;
    var a = pos(parent(i)), b = pos(i);
    var l = document.createElementNS(NS, 'line');
    l.setAttribute('x1', a[0]); l.setAttribute('y1', a[1]); l.setAttribute('x2', b[0]); l.setAttribute('y2', b[1]);
    tree.appendChild(l);
  });
  heap.forEach(function (v, i) {
    var p = pos(i);
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('transform', 'translate(' + p[0] + ',' + p[1] + ')');
    g.setAttribute('class', (i === 0 ? 'root ' : '') + (mark[i] || ''));
    g.innerHTML = '<circle r="19"></circle><text>' + v + '</text><text class="idx" y="29">[' + i + ']</text>';
    tree.appendChild(g);
  });
  arr.innerHTML = heap.map(function (v, i) {
    return '<div class="bh-cell ' + (mark[i] || '') + '"><b>' + v + '</b><small>' + i + '</small></div>';
  }).join('') || '<div class="bh-cell"><b>—</b><small>empty</small></div>';
  document.getElementById('bhPop').disabled = busy || !heap.length;
}

function log(h) { logEl.innerHTML = h; }

// Insert: append at the end (keeps the tree complete), then "sift up":
// swap with the parent while the parent is larger.
async function insert(v) {
  if (heap.length >= 31) { log('Capacity for this demo is 31 values (5 levels).'); return; }
  busy = true;
  heap.push(v);
  var i = heap.length - 1;
  var swaps = 0;
  log('Insert <b>' + v + '</b> at index ' + i + ', the next free slot, then sift up.');
  render({ [i]: 'swap' });
  await wait();
  while (i > 0) {
    var p = parent(i);
    render({ [i]: 'cmp', [p]: 'cmp' });
    log('Compare ' + heap[i] + ' with parent ' + heap[p] + ' at index ' + p + '.');
    await wait();
    if (heap[p] <= heap[i]) break;
    var t = heap[p]; heap[p] = heap[i]; heap[i] = t;
    swaps++;
    render({ [p]: 'swap' });
    await wait();
    i = p;
  }
  log('Inserted ' + v + ' with ' + swaps + ' swap' + (swaps === 1 ? '' : 's') + '. At most ⌊log₂ n⌋ = ' + Math.floor(Math.log2(heap.length)) + ' swaps are ever needed.');
  busy = false;
  render();
}

// Extract-min: the root is the answer. Move the LAST element to the root
// and "sift down": swap with the smaller child while a child is smaller.
async function extract() {
  if (!heap.length) return;
  busy = true;
  var min = heap[0];
  var last = heap.pop();
  if (!heap.length) { log('Extracted <b>' + min + '</b>. The heap is now empty.'); busy = false; render(); return; }
  heap[0] = last;
  log('Take the root <b>' + min + '</b>. Move the last value ' + last + ' to the root, then sift down.');
  render({ 0: 'swap' });
  await wait();
  var i = 0;
  while (true) {
    var l = 2 * i + 1, r = 2 * i + 2, smallest = i;
    var mark = { [i]: 'cmp' };
    if (l < heap.length) mark[l] = 'cmp';
    if (r < heap.length) mark[r] = 'cmp';
    render(mark);
    if (l < heap.length && heap[l] < heap[smallest]) smallest = l;
    if (r < heap.length && heap[r] < heap[smallest]) smallest = r;
    if (smallest === i) { log('Extracted <b>' + min + '</b>. ' + heap[i] + ' is no larger than its children, so the heap is valid again.'); break; }
    log('The smaller child is ' + heap[smallest] + '; swap it with ' + heap[i] + '.');
    await wait();
    var t = heap[i]; heap[i] = heap[smallest]; heap[smallest] = t;
    render({ [smallest]: 'swap' });
    await wait();
    i = smallest;
  }
  busy = false;
  render();
}

document.getElementById('bhForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var input = document.getElementById('bhVal');
  var v = Math.round(Number(input.value));
  if (busy || !(v >= 1 && v <= 99)) return;
  input.value = '';
  insert(v);
});
document.getElementById('bhRand').addEventListener('click', function () { if (!busy) insert(1 + Math.floor(Math.random() * 99)); });
document.getElementById('bhPop').addEventListener('click', function () { if (!busy) extract(); });

// Seed synchronously (no animation) so the page opens with a real heap.
[42, 17, 8, 63, 25, 11, 30, 5, 71, 19, 36].forEach(function (v) {
  heap.push(v);
  var i = heap.length - 1;
  while (i > 0 && heap[parent(i)] > heap[i]) { var p = parent(i); var t = heap[p]; heap[p] = heap[i]; heap[i] = t; i = p; }
});
render();
log('The smallest value is always at index 0. Insert a value or extract the minimum to watch the heap repair itself.');`,

  seo: {
    title: 'Binary Heap Priority Queue Visualizer — Free Interactive Min-Heap Demo',
    description: `An animated binary min-heap shown as a tree and as the array it really is: insert values to watch sift-up, extract the minimum to watch sift-down, with every comparison and swap explained. Plain HTML, CSS and JS; exports to React, Vue & Tailwind.`,
    about: {
      title: 'Binary Heap Visualizer — A Tree That Lives in an Array',
      description: `A binary heap is the data structure behind priority queues: task schedulers, event simulations, Dijkstra's shortest path, heap sort, and "top K" problems. Its trick is that it looks like a tree but is stored as a flat array, with parent and child positions computed from indexes. This visualizer draws both views side by side so the connection is obvious.

**The shape rule and the order rule**

A heap is a *complete* binary tree — every level full except possibly the last, which fills from the left — so it packs into an array with no gaps. The index of a node's parent is \`⌊(i − 1) / 2⌋\`, and its children are at \`2i + 1\` and \`2i + 2\`. In a *min*-heap, every parent is less than or equal to its children, so the smallest value is always at index 0.

**Insert: sift up**

A new value goes into the next free array slot, which keeps the shape rule. It may break the order rule, so it is compared with its parent and swapped upward until the parent is smaller or it reaches the root. The tree has ⌊log₂ n⌋ levels, so an insert takes at most that many swaps: O(log n).

**Extract-min: sift down**

The minimum is the root. Removing it would leave a hole, so the last element moves into the root (keeping the shape) and sinks: at each level it swaps with its smaller child until neither child is smaller. Also O(log n).

**Why not just sort?**

A sorted array gives the minimum in O(1) but inserting costs O(n) because elements must shift. A heap keeps both operations logarithmic, which is exactly what a priority queue needs.

**Reading the animation**

Amber cells are being compared and darker cells were just swapped, in both the tree and the array, with each step explained below.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Start from the seeded heap', text: `Eleven values are already arranged as a valid min-heap.` },
      { title: 'Insert', text: `Type a value 1–99 or press Random, then watch it sift up.` },
      { title: 'Extract min', text: `The root is removed and the last value sifts down.` },
      { title: 'Compare the views', text: `Match each tree node to its array index.` },
      { title: 'Read the log', text: `Every comparison and swap is explained.` },
    ] },
    features: [
      { title: 'Tree and array views', text: `The same heap drawn two ways.` },
      { title: 'Animated sift-up', text: `Comparisons and swaps on insert.` },
      { title: 'Animated sift-down', text: `Smaller-child swaps on extract.` },
      { title: 'Index arithmetic shown', text: `Parent and child formulas on screen.` },
      { title: 'Swap counting', text: `Compared against the log₂ n bound.` },
      { title: 'Input validation', text: `Values 1–99, one operation at a time.` },
      { title: 'Reduced-motion aware', text: `No step delays when requested.` },
      { title: 'No libraries', text: `Plain SVG and DOM.` },
    ],
    useCases: [
      { title: 'Data structures courses', text: `A clear demo of heap operations.` },
      { title: 'Interview preparation', text: `Heaps appear in top-K and scheduling problems.` },
      { title: 'Understanding Dijkstra', text: `See the queue that makes it fast.` },
      { title: 'Heap sort', text: `Repeated extract-min produces sorted output.` },
      { title: 'Self-study', text: `Predict each swap before it happens.` },
      { icon: 'CODE', title: "Related: Dijkstra's Shortest Path", desc: `Where priority queues are used: [Dijkstra's Shortest Path Visualizer](/ui-snippets/dijkstra-shortest-path-visualizer/).` },
      { icon: 'CODE', title: 'Related: Huffman Coding Tree', desc: 'Another heap-driven algorithm: [Huffman Coding Tree Visualizer](/ui-snippets/huffman-coding-tree-visualizer/).' },
    ],
    faqs: [
      { q: 'How is a binary heap stored in an array?', a: `Nodes are stored level by level from left to right. For a node at index i, its parent is at floor((i − 1) / 2) and its children are at 2i + 1 and 2i + 2. Because the tree is complete, the array has no gaps.` },
      { q: 'What is the difference between a min-heap and a max-heap?', a: `In a min-heap every parent is less than or equal to its children, so the root holds the minimum. In a max-heap every parent is greater than or equal to its children, so the root holds the maximum. Only the comparison changes.` },
      { q: 'What is the time complexity of heap operations?', a: `Insert and extract are O(log n) because values move along one root-to-leaf path. Reading the minimum is O(1). Building a heap from n items can be done in O(n) with bottom-up heapify.` },
      { q: 'Why move the last element to the root on extract?', a: `Removing the root leaves a hole. Moving the last element into it keeps the tree complete, and sifting it down restores the ordering in O(log n).` },
      { q: 'Is a heap a sorted structure?', a: `No. Only the parent-child relationship is ordered; siblings and cousins can be in any order. That weaker guarantee is what makes inserts and extracts cheap.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to prove why sift-up needs at most log₂ n swaps. Ask it to add a max-heap toggle, a "build heap from array" button using O(n) heapify, a heap sort mode, or a decrease-key operation as used by Dijkstra. It can also quiz you: show a heap and ask what it will look like after one more insert.`,
      prompt: `Build an animated binary min-heap visualizer in plain HTML, CSS and JavaScript.

Requirements:
- Store the heap in a plain array and draw it both as an SVG tree (positioned by level and index) and as a row of array cells labelled with their indexes.
- Show the parent and child index formulas on the page.
- Insert a value (1–99, or random): append it, then sift up, highlighting each comparison with the parent and each swap with a short pause and a log message.
- Extract the minimum: take the root, move the last element to the root, then sift down by swapping with the smaller child, with the same highlighting and messages.
- Report the number of swaps compared with floor(log2 n), block new operations while one is animating, limit the demo to 31 values, and skip the pauses for users who prefer reduced motion.
- Start with a pre-built heap of about eleven values.`,
    },
  },
};

export default binaryHeapPriorityQueueVisualizer;
