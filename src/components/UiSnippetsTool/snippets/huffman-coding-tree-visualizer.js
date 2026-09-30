const huffmanCodingTreeVisualizer = {
  id: 'huffman-coding-tree-visualizer',
  title: 'Huffman Coding Tree Visualizer',
  lastmod: '2026-09-25',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="hf">
  <div class="hf-top">
    <div>
      <h2>Huffman coding</h2>
      <p>Frequent letters get short codes, rare letters get long ones — and no code is a prefix of another.</p>
    </div>
    <form class="hf-form" id="hfForm">
      <input id="hfText" value="mississippi river" maxlength="40" aria-label="Text to encode" autocomplete="off">
      <button type="submit">Start</button>
    </form>
  </div>
  <div class="hf-ctrl">
    <button type="button" id="hfStep">Merge two smallest</button>
    <button type="button" id="hfAll" class="ghost">Build whole tree</button>
    <span id="hfMsg" aria-live="polite"></span>
  </div>
  <svg id="hfSvg" viewBox="0 0 900 330" role="img" aria-label="Huffman forest"></svg>
  <div class="hf-out">
    <table class="hf-table"><thead><tr><th>Char</th><th>Count</th><th>Code</th><th>Bits</th></tr></thead><tbody id="hfCodes"></tbody></table>
    <div class="hf-bits">
      <div class="hf-sum" id="hfSum"></div>
      <div class="hf-stream" id="hfStream"></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#ecfeff;color:#083344;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.hf{width:100%;max-width:1000px}
.hf-top{display:flex;justify-content:space-between;align-items:flex-end;gap:14px;flex-wrap:wrap}
.hf h2{font-size:18px}
.hf-top p{font-size:12.5px;color:#155e75;margin-top:4px}
.hf-form{display:flex;gap:6px}
.hf-form input{width:230px;border:1px solid #a5f3fc;border-radius:9px;padding:8px 10px;font:600 14px ui-monospace,monospace;color:#083344}
.hf button{border:0;border-radius:9px;padding:8px 13px;font:700 12px system-ui;background:#0e7490;color:#fff;cursor:pointer}
.hf button.ghost{background:#fff;color:#0e7490;border:1px solid #a5f3fc}
.hf button:disabled{opacity:.4}
.hf :focus-visible{outline:2px solid #06b6d4;outline-offset:2px}
.hf-ctrl{display:flex;gap:8px;align-items:center;margin:12px 0 8px;flex-wrap:wrap}
.hf-ctrl span{font-size:12.5px;color:#155e75}
#hfSvg{width:100%;background:#fff;border:1px solid #a5f3fc;border-radius:14px}
#hfSvg line{stroke:#a5f3fc;stroke-width:2}
#hfSvg .bit{font:800 11px system-ui;fill:#0891b2;text-anchor:middle}
#hfSvg circle{stroke-width:2}
#hfSvg .leaf circle{fill:#cffafe;stroke:#06b6d4}
#hfSvg .inner circle{fill:#fff;stroke:#94a3b8}
#hfSvg .new circle{fill:#fde68a;stroke:#d97706}
#hfSvg text.c{font:800 13px ui-monospace,monospace;text-anchor:middle;dominant-baseline:central;fill:#083344}
#hfSvg text.w{font:600 10px system-ui;text-anchor:middle;fill:#64748b}
.hf-out{display:grid;grid-template-columns:260px 1fr;gap:14px;margin-top:12px}
@media (max-width:760px){.hf-out{grid-template-columns:1fr}}
.hf-table{width:100%;border-collapse:collapse;font-size:12.5px;background:#fff;border:1px solid #a5f3fc;border-radius:12px;overflow:hidden}
.hf-table th,.hf-table td{padding:5px 9px;text-align:left;border-bottom:1px solid #ecfeff}
.hf-table th{color:#155e75}
.hf-table code{font:700 12px ui-monospace,monospace;color:#0e7490}
.hf-bits{background:#fff;border:1px solid #a5f3fc;border-radius:12px;padding:12px;min-width:0}
.hf-sum{font-size:13px;line-height:1.6}
.hf-stream{font:600 12px ui-monospace,monospace;word-break:break-all;margin-top:8px;line-height:1.7}
.hf-stream span:nth-child(odd){background:#ecfeff}`,

  js: `var forest, nextId, done, lastNew, srcText, counts;
var svg = document.getElementById('hfSvg');
var NS = 'http://www.w3.org/2000/svg';
function show(c) { return c === ' ' ? '␣' : c; }

function start() {
  var text = document.getElementById('hfText').value.slice(0, 40) || 'a';
  counts = {};
  text.split('').forEach(function (c) { counts[c] = (counts[c] || 0) + 1; });
  nextId = 0;
  // One single-node tree per distinct character: the initial forest.
  forest = Object.keys(counts).map(function (c) { return { id: nextId++, ch: c, w: counts[c] }; });
  sortForest();
  done = forest.length === 1;
  lastNew = null;
  srcText = text;
  msg(forest.length + ' distinct characters → ' + forest.length + ' single-node trees, sorted by count.');
  render();
}

// Sort by weight, then by creation id: a stable tie-break makes the tree
// (and the codes) deterministic, which matters when you compare results.
function sortForest() { forest.sort(function (a, b) { return a.w - b.w || a.id - b.id; }); }

// The whole algorithm: take the two lightest trees, join them under a new
// parent whose weight is their sum, put it back. Repeat until one remains.
function merge() {
  if (done) return;
  var a = forest.shift(), b = forest.shift();
  var parent = { id: nextId++, w: a.w + b.w, left: a, right: b };
  forest.push(parent);
  sortForest();
  lastNew = parent.id;
  done = forest.length === 1;
  msg('Merged ' + label(a) + ' (' + a.w + ') and ' + label(b) + ' (' + b.w + ') into a node of weight ' + parent.w + '. ' +
    (done ? 'One tree left: done.' : forest.length + ' trees left.'));
  render();
}
function label(n) { return n.ch !== undefined ? '"' + show(n.ch) + '"' : 'subtree'; }
function msg(t) { document.getElementById('hfMsg').textContent = t; }

// Layout: leaves get consecutive x slots in left-to-right order; a parent
// sits midway between its children; depth sets y. Trees sit side by side.
function layout() {
  var slot = 0, maxDepth = 0, nodes = [];
  function walk(n, depth) {
    maxDepth = Math.max(maxDepth, depth);
    if (!n.left) { n.x = slot++; }
    else { walk(n.left, depth + 1); walk(n.right, depth + 1); n.x = (n.left.x + n.right.x) / 2; }
    n.depth = depth;
    nodes.push(n);
  }
  forest.forEach(function (t) { walk(t, 0); slot += 0.6; });
  return { nodes: nodes, slots: slot, maxDepth: maxDepth };
}

function render() {
  var L = layout();
  var xs = function (x) { return 30 + (x / Math.max(1, L.slots - 0.6)) * 840; };
  var ys = function (d) { return 30 + d * Math.min(62, 270 / Math.max(1, L.maxDepth)); };
  svg.innerHTML = '';
  L.nodes.forEach(function (n) {
    if (!n.left) return;
    [[n.left, '0'], [n.right, '1']].forEach(function (pair) {
      var c = pair[0];
      var l = document.createElementNS(NS, 'line');
      l.setAttribute('x1', xs(n.x)); l.setAttribute('y1', ys(n.depth));
      l.setAttribute('x2', xs(c.x)); l.setAttribute('y2', ys(c.depth));
      svg.appendChild(l);
      var t = document.createElementNS(NS, 'text');
      t.setAttribute('class', 'bit');
      t.setAttribute('x', (xs(n.x) + xs(c.x)) / 2 + (pair[1] === '0' ? -7 : 7));
      t.setAttribute('y', (ys(n.depth) + ys(c.depth)) / 2);
      t.textContent = pair[1];
      svg.appendChild(t);
    });
  });
  L.nodes.forEach(function (n) {
    var g = document.createElementNS(NS, 'g');
    g.setAttribute('class', (n.left ? 'inner' : 'leaf') + (n.id === lastNew ? ' new' : ''));
    g.setAttribute('transform', 'translate(' + xs(n.x) + ',' + ys(n.depth) + ')');
    g.innerHTML = '<circle r="15"></circle><text class="c">' + (n.left ? n.w : show(n.ch).replace('<', '&lt;').replace('&', '&amp;')) + '</text>' +
      (n.left ? '' : '<text class="w" y="27">' + n.w + '</text>');
    svg.appendChild(g);
  });
  codes();
  document.getElementById('hfStep').disabled = done;
  document.getElementById('hfAll').disabled = done;
}

// Codes exist once the tree is complete: the path from the root, 0 for left
// and 1 for right. Only leaves hold characters, so no code can be a prefix
// of another.
function codes() {
  var body = document.getElementById('hfCodes'), sum = document.getElementById('hfSum'), stream = document.getElementById('hfStream');
  var text = srcText || '';
  if (!done) {
    body.innerHTML = Object.keys(counts).sort(function (a, b) { return counts[b] - counts[a]; }).map(function (c) {
      return '<tr><td><code>' + show(c) + '</code></td><td>' + counts[c] + '</td><td>…</td><td></td></tr>';
    }).join('');
    sum.innerHTML = 'Keep merging: codes are read off the finished tree.';
    stream.textContent = '';
    return;
  }
  var table = {}, rows = [];
  (function walk(n, path) {
    if (!n.left) { table[n.ch] = path || '0'; rows.push(n); return; }
    walk(n.left, path + '0'); walk(n.right, path + '1');
  })(forest[0], '');
  rows.sort(function (a, b) { return b.w - a.w; });
  body.innerHTML = rows.map(function (n) {
    return '<tr><td><code>' + show(n.ch) + '</code></td><td>' + n.w + '</td><td><code>' + table[n.ch] + '</code></td><td>' + table[n.ch].length * n.w + '</td></tr>';
  }).join('');
  var bits = text.split('').map(function (c) { return table[c]; });
  var total = bits.join('').length;
  var fixed = Math.max(1, Math.ceil(Math.log2(rows.length))) * text.length;
  sum.innerHTML = '<b>' + total + ' bits</b> with Huffman · ' + fixed + ' bits with a fixed ' + Math.max(1, Math.ceil(Math.log2(rows.length))) + '-bit code · ' +
    text.length * 8 + ' bits as 8-bit ASCII.<br>Average ' + (total / text.length).toFixed(2) + ' bits per character.';
  stream.innerHTML = bits.map(function (b) { return '<span>' + b + '</span>'; }).join('');
}

document.getElementById('hfForm').addEventListener('submit', function (e) { e.preventDefault(); start(); });
document.getElementById('hfStep').addEventListener('click', merge);
document.getElementById('hfAll').addEventListener('click', function () { while (!done) merge(); });
start();`,

  seo: {
    title: 'Huffman Coding Tree Visualizer — Free Interactive Compression Demo',
    description: `Build a Huffman tree step by step from any text: repeatedly merge the two lightest trees, then read prefix-free binary codes off the finished tree and compare the encoded size with fixed-length and 8-bit ASCII. Plain HTML, CSS and JS; exports to React, Vue & Tailwind.`,
    about: {
      title: 'Huffman Coding — Building an Optimal Prefix Code by Hand',
      description: `Huffman coding is how lossless compression gives common symbols short codes and rare symbols long ones. It's inside DEFLATE (ZIP, gzip, PNG), JPEG and MP3. The algorithm is surprisingly small — a loop that merges the two lightest trees — and this visualizer lets you run that loop yourself on your own text.

**Start with a forest**

Count how often each character appears. Each distinct character becomes its own one-node tree, weighted by its count.

**Merge the two lightest, repeatedly**

Take the two trees with the smallest weights, make them the left and right children of a new node whose weight is their sum, and put that node back in the forest. Each merge reduces the number of trees by one, so a text with k distinct characters needs k − 1 merges. The newest node is highlighted in amber so you can follow each step.

**Reading the codes**

In the finished tree, every left edge means 0 and every right edge means 1. A character's code is the path from the root to its leaf. Because characters only live at leaves, no code can be the start of another code — the "prefix-free" property that lets a decoder read the bit stream without separators.

**Why it's optimal**

The two rarest symbols end up deepest, so they get the longest codes, and every merge pushes the least frequent weight down the tree. Huffman proved this gives the shortest possible average code length for a code that assigns whole bits to each symbol.

**Measuring the saving**

The summary compares the Huffman-encoded length with a fixed-length code (just enough bits for the number of distinct characters) and with 8-bit ASCII, and shows the actual bit stream split per character. A real compressed file also has to store the tree or code table, which matters for short inputs like these.

**Deterministic ties**

When two trees have equal weight, the one created earlier is taken first. Different tie-breaks give different, equally optimal codes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Enter text', text: `Up to 40 characters, then press Start.` },
      { title: 'Merge step by step', text: `Each click joins the two lightest trees; the new node is highlighted.` },
      { title: 'Or build it all', text: `Build whole tree runs every merge.` },
      { title: 'Read the codes', text: `Left edges are 0, right edges are 1.` },
      { title: 'Compare sizes', text: `See Huffman bits vs fixed-length vs ASCII.` },
    ] },
    features: [
      { title: 'Step-by-step merging', text: `Two lightest trees combined per step.` },
      { title: 'Whole forest drawn', text: `Every subtree visible between merges.` },
      { title: 'Edge bits labelled', text: `0 for left, 1 for right.` },
      { title: 'Prefix-free code table', text: `Character, count, code and bits used.` },
      { title: 'Size comparison', text: `Huffman vs fixed-length vs 8-bit ASCII.` },
      { title: 'Encoded bit stream', text: `Per-character codes shown in sequence.` },
      { title: 'Deterministic ties', text: `Stable ordering by creation.` },
      { title: 'No libraries', text: `SVG layout computed in plain JS.` },
    ],
    useCases: [
      { title: 'Algorithms courses', text: `Greedy algorithms and optimal codes.` },
      { title: 'Understanding compression', text: `What ZIP and PNG do under the hood.` },
      { title: 'Interview preparation', text: `A classic priority-queue problem.` },
      { title: 'Information theory intros', text: `Relate code length to frequency.` },
      { title: 'Teaching', text: `Build a tree for a student's own name.` },
      { icon: 'CODE', title: 'Related: Binary Heap Priority Queue', desc: 'The structure used to find the two lightest trees: [Binary Heap Priority Queue Visualizer](/ui-snippets/binary-heap-priority-queue-visualizer/).' },
      { icon: 'CODE', title: 'Related: Big-O Growth Visualizer', desc: 'Why efficient structures matter: [Big-O Complexity Growth Visualizer](/ui-snippets/big-o-complexity-growth-visualizer/).' },
    ],
    faqs: [
      { q: 'How does Huffman coding work?', a: `Count symbol frequencies, make one weighted tree per symbol, then repeatedly merge the two lightest trees under a new node whose weight is their sum until one tree remains. Codes are the paths from the root to each leaf, using 0 for left and 1 for right.` },
      { q: 'What does prefix-free mean?', a: `No code is the beginning of another code. Because symbols are only at leaves, a decoder can read bits one at a time, walk the tree, and output a symbol whenever it reaches a leaf, with no separators needed.` },
      { q: 'Is Huffman coding optimal?', a: `It produces the shortest possible average code length among codes that use a whole number of bits per symbol. Arithmetic coding and ANS can get closer to the theoretical entropy limit by using fractional bits.` },
      { q: 'Why are there different valid Huffman trees for the same text?', a: `When weights tie, either tree can be merged first, and left/right can be swapped. All such choices produce codes with the same total length, but the individual codes differ.` },
      { q: 'Where is Huffman coding used?', a: `In DEFLATE (used by ZIP, gzip and PNG), in JPEG and in MP3, usually combined with other techniques like LZ77 or transforms that make the data more compressible first.` },
    ],
    aiPrompt: {
      paragraph: `Paste this visualizer into an AI assistant like Claude and ask it to explain why merging the two lightest trees is always safe — the greedy-choice argument. Ask it to add a decoder that walks the tree bit by bit as you click, canonical Huffman codes like DEFLATE uses, an entropy calculation for comparison, or a binary heap instead of sorting. It can also estimate how much the stored code table costs for short inputs.`,
      prompt: `Build an interactive Huffman coding visualizer in plain HTML, CSS and JavaScript.

Requirements:
- A text input (up to 40 characters) and Start button that counts character frequencies and creates one single-node tree per distinct character, sorted by weight with a stable tie-break by creation order.
- A "Merge two smallest" button that removes the two lightest trees, creates a parent with their combined weight, re-inserts it and highlights the new node, plus a "Build whole tree" button.
- Draw the entire forest in SVG after every step, positioning leaves in consecutive slots, parents midway between their children and rows by depth, with edges labelled 0 (left) and 1 (right).
- When one tree remains, derive each character's code from its root-to-leaf path and show a table of character, count, code and total bits.
- Show the total encoded length compared with a fixed-length code and 8-bit ASCII, the average bits per character, and the encoded bit stream split per character.
- Display spaces with a visible symbol.`,
    },
  },
};

export default huffmanCodingTreeVisualizer;
