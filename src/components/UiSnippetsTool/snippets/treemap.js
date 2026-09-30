const treemap = {
  id: 'treemap',
  title: 'Treemap',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="tm-card">
  <div class="tm-head"><h3>Disk usage by folder</h3><span class="tm-total" id="tmTotal"></span></div>
  <div class="tm-box" id="tmBox"></div>
  <div class="tm-tip" id="tmTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tm-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.tm-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px}
.tm-head h3{font-size:16px;font-weight:800;color:#0f172a}
.tm-total{font-size:12px;font-weight:700;color:#94a3b8}

.tm-box{position:relative;width:100%;height:280px;border-radius:10px;overflow:hidden}
.tm-cell{position:absolute;border:2px solid #fff;border-radius:6px;padding:8px 9px;overflow:hidden;cursor:pointer;transition:filter .12s;display:flex;flex-direction:column;justify-content:flex-start}
.tm-cell:hover{filter:brightness(1.08)}
.tm-name{font-size:12px;font-weight:800;color:#fff;line-height:1.2;text-shadow:0 1px 2px rgba(0,0,0,.25)}
.tm-val{font-size:10.5px;font-weight:600;color:rgba(255,255,255,.85);margin-top:2px}

.tm-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.tm-tip[hidden]{display:none}`,

  js: `var DATA = [
  { name: 'node_modules', value: 1840, color: '#6366f1' },
  { name: 'Photos', value: 920, color: '#22c55e' },
  { name: 'Videos', value: 760, color: '#f59e0b' },
  { name: 'Documents', value: 410, color: '#ec4899' },
  { name: 'Music', value: 280, color: '#0ea5e9' },
  { name: 'Downloads', value: 240, color: '#14b8a6' },
  { name: 'Cache', value: 150, color: '#a855f7' },
  { name: 'Other', value: 90, color: '#64748b' },
];

var box = document.getElementById('tmBox');
var tip = document.getElementById('tmTip');
var card = document.querySelector('.tm-card');

// Squarified-style slice-and-dice: recursively split the rectangle, alternating
// direction, allocating area proportional to value. Keeps cells near-square.
function layout(items, x, y, w, h) {
  if (items.length === 1) { items[0].rect = { x: x, y: y, w: w, h: h }; return; }
  var total = items.reduce(function (s, i) { return s + i.value; }, 0);
  // Split items into two groups whose sums are as balanced as possible.
  var half = total / 2, acc = 0, split = 0;
  for (var i = 0; i < items.length; i++) { acc += items[i].value; if (acc >= half) { split = i + 1; break; } }
  split = Math.max(1, Math.min(items.length - 1, split));
  var a = items.slice(0, split), b = items.slice(split);
  var aSum = a.reduce(function (s, i) { return s + i.value; }, 0);
  var ratio = aSum / total;
  if (w >= h) {
    var aw = w * ratio;
    layout(a, x, y, aw, h);
    layout(b, x + aw, y, w - aw, h);
  } else {
    var ah = h * ratio;
    layout(a, x, y, w, ah);
    layout(b, x, y + ah, w, h - ah);
  }
}

function render() {
  var sorted = DATA.slice().sort(function (a, b) { return b.value - a.value; });
  var rect = box.getBoundingClientRect();
  var W = rect.width || 416, H = 280;
  layout(sorted, 0, 0, W, H);
  var total = DATA.reduce(function (s, d) { return s + d.value; }, 0);
  document.getElementById('tmTotal').textContent = (total / 1000).toFixed(2) + ' GB';
  box.innerHTML = sorted.map(function (d) {
    var r = d.rect;
    var big = r.w > 64 && r.h > 38;
    return '<div class="tm-cell" style="left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.w + 'px;height:' + r.h + 'px;background:' + d.color + '" data-name="' + d.name + '" data-value="' + d.value + '">' +
      (big ? '<span class="tm-name">' + d.name + '</span><span class="tm-val">' + d.value + ' MB</span>' : '') +
    '</div>';
  }).join('');
}

box.addEventListener('mousemove', function (e) {
  var cell = e.target.closest('.tm-cell');
  if (!cell) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.innerHTML = cell.dataset.name + ': <b>' + cell.dataset.value + ' MB</b>';
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
box.addEventListener('mouseleave', function () { tip.hidden = true; });
window.addEventListener('resize', render);

render();`,

  seo: {
    title: 'Treemap — HTML CSS JS Treemap Chart (No Library)',
    description: `A treemap that packs value-proportional tiles into a rectangle via recursive slice-and-dice, with tooltips. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Treemap — Value-Proportional Tiles via Recursive Slice-and-Dice Layout',
      description: `A treemap shows part-to-whole composition by filling a rectangle with tiles whose *areas* are proportional to their values — ideal for disk usage, budgets, portfolios, or any hierarchy where you want to compare sizes and use space efficiently. This snippet builds a treemap in plain HTML, CSS, and vanilla JavaScript, computing the tile layout itself with a recursive slice-and-dice algorithm and rendering positioned tiles with labels and tooltips — no charting library.

**Area, not length, encodes the value**

Unlike a bar chart (length) or pie (angle), a treemap encodes value as *area*. The challenge is packing rectangles of given areas into a container with no gaps and reasonable aspect ratios. The snippet solves this with a recursive split: at each step it divides the items into two groups whose value-sums are as balanced as possible, allocates the container's space between them in proportion to those sums, and recurses into each half — alternating between horizontal and vertical splits based on which dimension is longer. Alternating the split direction is the key trick that keeps tiles close to square instead of degenerating into thin slivers.

**A real layout algorithm in a few lines**

\`layout(items, x, y, w, h)\` is the whole engine: it finds the balanced split point, computes the area ratio, and carves the rectangle along its longer axis, assigning each leaf item a final \`{ x, y, w, h }\`. This is a compact cousin of the "squarified treemap" approach used by D3 and OS disk-usage tools, written out clearly so you can see exactly how rectangles get packed by value — the part that makes treemaps look hard but is just balanced recursion.

**Tiles that adapt their labels**

Each item becomes an absolutely-positioned \`div\` at its computed rect, coloured per series, with a white border that visually separates adjacent tiles. Labels are shown only when a tile is big enough to hold them (a size check), so small tiles stay clean instead of overflowing with clipped text — and every tile, labelled or not, reveals its name and value on hover via a cursor-following tooltip. This "label if it fits, tooltip always" rule is how real treemaps stay legible across wildly different tile sizes.

**Responsive re-layout**

Because the layout is computed from the container's measured width, the treemap re-runs on resize, repacking the tiles to fill whatever space it's given. Sorting items largest-first before laying out gives a stable, readable arrangement with the biggest tiles anchored consistently.

**Data-driven and drop-in**

Feed it any array of \`{ name, value, color }\` and it packs them by area. Because it's dependency-free, it drops into any dashboard or report, and it's a clear reference for the recursive slice-and-dice layout that powers treemaps, disk-usage visualisers, and space-filling charts.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A treemap renders, filling the box with tiles sized by each folder's disk usage.` },
      { title: 'Hover a tile', text: `See that tile's name and exact value in a tooltip; big tiles also show inline labels.` },
      { title: 'Resize the window', text: `The treemap repacks to fill the available width.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { name, value, color } items.` },
      { title: 'Adjust the height', text: `Change the box height (and the H constant) to make the treemap taller or shorter.` },
      { title: 'Wire to an API', text: `Fetch your sizes, map them into the DATA shape, and call render().` },
    ] },
    features: [
      { title: 'Area-proportional tiles', text: `Each tile's area (not length or angle) encodes its value — the defining treemap property.` },
      { title: 'Recursive slice-and-dice', text: `Balanced two-way splits with area-proportional allocation pack the rectangle with no gaps.` },
      { title: 'Near-square tiles', text: `Alternating split direction by longest axis keeps tiles from degenerating into slivers.` },
      { title: 'Adaptive labels', text: `Tiles show inline labels only when big enough; all tiles reveal details on hover.` },
      { title: 'Cursor tooltips', text: `A following tooltip shows each tile's name and value.` },
      { title: 'Responsive re-layout', text: `The layout recomputes from the measured width on resize.` },
      { title: 'Largest-first ordering', text: `Sorting by value gives a stable, readable arrangement.` },
      { title: 'Data-driven & no library', text: `Packs and draws from a DATA array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Disk and storage usage', text: `Visualise folder or file sizes — pair with a [pie chart](/ui-snippets/pie-chart/) for a simpler share view.` },
      { title: 'Budget and spend composition', text: `Show where money goes by area alongside a [bar chart](/ui-snippets/bar-chart/) for ranking.` },
      { title: 'Portfolio and asset allocation', text: `Map holdings by weight, complementing a [donut chart](/ui-snippets/donut-chart/).` },
      { title: 'Codebase and bundle analysis', text: `Show module or package sizes like a bundle analyzer.` },
      { title: 'Category and inventory breakdowns', text: `Compare many categories where space efficiency matters.` },
      { title: 'Learning treemap layout', text: `A reference for recursive slice-and-dice packing — compare with a [bubble chart](/ui-snippets/bubble-chart/).` },
    ],
    faqs: [
      { q: 'How does a treemap decide each tile size?', a: `Value is encoded as area. The layout recursively splits the items into two groups with as-balanced-as-possible value sums, divides the rectangle between them in proportion to those sums, and recurses — alternating horizontal and vertical splits depending on which side of the rectangle is longer. Each leaf item ends up with an {x, y, w, h} whose area is proportional to its value, filling the container with no gaps.` },
      { q: 'Why alternate the split direction?', a: `If you always split the same way, tiles become long thin slivers that are hard to compare and label. Splitting along the rectangle's longer axis each time keeps the resulting tiles closer to square, which is the readability goal behind "squarified" treemaps. It's the single detail that separates a usable treemap from an unreadable one.` },
      { q: 'Why do only some tiles show labels?', a: `A label needs enough room or it overflows and gets clipped, which looks broken. Each tile checks whether it's wide and tall enough before rendering its inline name and value; smaller tiles stay clean. Every tile — labelled or not — still shows its full name and value on hover, so no information is lost. This "label if it fits, tooltip always" approach keeps the treemap legible across very different tile sizes.` },
      { q: 'Is this the same as a D3 treemap?', a: `It's a compact relative. D3 implements the full squarified algorithm with tunable aspect-ratio optimisation and hierarchy nesting. This snippet uses a simpler balanced slice-and-dice that produces near-square tiles for a flat list of values, written out so the packing logic is readable. For deep hierarchies or strict aspect-ratio control you'd reach for D3; for a flat composition view, this is enough and has no dependency.` },
      { q: 'How do I use this treemap in React, Vue, or Angular?', a: `In React, hold the data in useState, compute the layout with useMemo (re-running on a measured width), and render tiles from .map() with absolute positioning; in Vue, use a computed layout with v-for; in Angular, a getter with *ngFor. The layout() algorithm is framework-agnostic — only the width measurement and rendering move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the recursion by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the layout() function picks its split index with the running acc/half comparison, and why it alternates between carving along w and h based on which is bigger rather than always splitting the same way. It's a good target for optimization questions too — ask whether recomputing the entire layout from scratch on every resize event is wasteful for a large item list, and whether the resize handler should be debounced. For extending it, have it add a second level of nesting so each tile can itself contain sub-tiles, animate tiles smoothly when the underlying values change instead of snapping instantly, or add a legend that lets users click a category to isolate it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a treemap chart in plain HTML, CSS, and vanilla JavaScript using a recursive slice-and-dice layout algorithm — no charting library, no canvas.

Requirements:
- Accept a flat array of items, each with a name, a numeric value, and a color, and sort them largest-value-first before laying out.
- Write a recursive layout(items, x, y, w, h) function that: if given a single item, assigns it the full rectangle; otherwise finds the split index where the running sum of values first reaches half the group's total, divides the items into two groups at that index, computes the area ratio between the two groups, and recurses into each with the rectangle divided along whichever axis (width or height) is currently longer, allocating space proportional to each group's value sum.
- Render each item as an absolutely positioned div at its computed x/y/w/h, colored per item, with a visible border separating adjacent tiles.
- Only render a tile's inline name and value label when the tile's computed width and height both exceed a minimum size threshold; smaller tiles must render with no label.
- Every tile, regardless of whether it shows a label, must reveal its full name and value in a cursor-following tooltip on mousemove, and hide the tooltip on mouseleave.
- Recompute the entire layout from the container's actual measured width (not a hardcoded value) whenever the window resizes.`,
    },
  },
};

export default treemap;
