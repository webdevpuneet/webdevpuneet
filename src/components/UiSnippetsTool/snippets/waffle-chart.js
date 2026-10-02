const waffleChart = {
  id: 'waffle-chart',
  title: 'Waffle Chart',
  lastmod: '2026-06-24',
  category: 'charts',
  html: `<div class="wc-card">
  <div class="wc-head"><h3>Budget allocation</h3><span class="wc-sub">each square = 1%</span></div>
  <div class="wc-grid" id="wcGrid"></div>
  <ul class="wc-legend" id="wcLegend"></ul>
  <div class="wc-tip" id="wcTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.wc-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.wc-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px}
.wc-head h3{font-size:16px;font-weight:800;color:#0f172a}
.wc-sub{font-size:11px;font-weight:600;color:#94a3b8}

.wc-grid{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin-bottom:16px}
.wc-cell{aspect-ratio:1;border-radius:4px;background:#eef2f7;transition:transform .12s}
.wc-cell[data-c]{cursor:pointer}
.wc-cell[data-c]:hover{transform:scale(1.18)}

.wc-legend{list-style:none;display:flex;flex-direction:column;gap:8px}
.wc-legend li{display:flex;align-items:center;gap:9px;font-size:12.5px;color:#475569}
.wc-ldot{width:11px;height:11px;border-radius:3px;flex-shrink:0}
.wc-lname{font-weight:600}
.wc-lval{margin-left:auto;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}

.wc-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.wc-tip[hidden]{display:none}`,

  js: `var DATA = [
  { name: 'Engineering', value: 38, color: '#6366f1' },
  { name: 'Marketing', value: 24, color: '#22c55e' },
  { name: 'Sales', value: 18, color: '#f59e0b' },
  { name: 'Operations', value: 12, color: '#ec4899' },
  { name: 'Other', value: 8, color: '#0ea5e9' },
];

var grid = document.getElementById('wcGrid');
var legend = document.getElementById('wcLegend');
var tip = document.getElementById('wcTip');
var card = document.querySelector('.wc-card');
var TOTAL = 100;   // 10x10 grid of cells

// Largest-remainder rounding: round each share to whole cells, then distribute
// any leftover cells (from rounding) to the largest fractional parts so the grid
// always sums to exactly 100.
function allocate() {
  var sum = DATA.reduce(function (s, d) { return s + d.value; }, 0);
  var raw = DATA.map(function (d) { return d.value / sum * TOTAL; });
  var floors = raw.map(Math.floor);
  var used = floors.reduce(function (s, n) { return s + n; }, 0);
  var remainder = TOTAL - used;
  var order = raw.map(function (v, i) { return { i: i, frac: v - floors[i] }; })
    .sort(function (a, b) { return b.frac - a.frac; });
  for (var k = 0; k < remainder; k++) floors[order[k].i]++;
  return floors;
}

function render() {
  var counts = allocate();
  var cells = [];
  DATA.forEach(function (d, di) {
    for (var n = 0; n < counts[di]; n++) {
      cells.push('<div class="wc-cell" data-c="' + di + '" style="background:' + d.color + '"></div>');
    }
  });
  // Fill any remainder (shouldn't occur) with empty cells.
  while (cells.length < TOTAL) cells.push('<div class="wc-cell"></div>');
  grid.innerHTML = cells.join('');
  legend.innerHTML = DATA.map(function (d, di) {
    return '<li><span class="wc-ldot" style="background:' + d.color + '"></span>' +
      '<span class="wc-lname">' + d.name + '</span><span class="wc-lval">' + counts[di] + '%</span></li>';
  }).join('');
}

grid.addEventListener('mousemove', function (e) {
  var cell = e.target.closest('.wc-cell[data-c]');
  if (!cell) { tip.hidden = true; return; }
  var d = DATA[+cell.dataset.c];
  var r = card.getBoundingClientRect();
  tip.textContent = d.name;
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
grid.addEventListener('mouseleave', function () { tip.hidden = true; });

render();`,

  seo: {
    title: 'Waffle Chart — HTML CSS JS Square-Grid Percentage Chart',
    description: `A waffle chart — a 10x10 grid where each square is 1% — with largest-remainder rounding so categories always sum to 100. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Waffle Chart — A 100-Square Grid Where Each Cell Is One Percent',
      description: `A waffle chart shows part-to-whole composition as a 10×10 grid of 100 squares, each representing one percent, coloured by category. It is often easier to read than a pie chart because counting squares is more intuitive than judging angles. This snippet builds it in plain HTML, CSS, and vanilla JavaScript, with correct rounding so the categories always fill exactly 100 cells — no charting library.

**The grid is the chart**

A CSS grid of 100 square cells (10 columns, \`aspect-ratio: 1\`) is the entire canvas. Each category claims a run of cells in its colour, filled in order, so the coloured blocks read as proportions of the whole. Using a real grid of elements (rather than a drawn chart) means every cell is a DOM node you can hover, and the layout is naturally responsive — the squares scale with the card width.

**Largest-remainder rounding (the hard part)**

The subtle problem every waffle chart faces: percentages rarely round to whole cells that sum to 100. If you naively round each category, you might end up with 99 or 101 cells. The snippet uses the largest-remainder method: floor each category's cell count, then hand out the leftover cells one at a time to the categories with the biggest fractional remainders. This guarantees the grid sums to exactly 100 while distributing rounding as fairly as possible — the same apportionment method used for allocating seats from vote shares. Getting this right is what keeps the waffle honest and gap-free.

**Color runs and an empty fallback**

Cells are generated category by category, so each colour forms a contiguous run across the grid (left-to-right, top-to-bottom). Any unallocated cells (which should not occur once rounding sums to 100) fall back to a neutral empty colour, so the grid never breaks. Hovering a coloured cell shows its category name in a tooltip.

**A legend with the rounded values**

The legend lists each category with its colour and its *rounded* cell count (the number actually shown), not the raw percentage — so the legend always agrees with what is on the grid. Showing the displayed value rather than the source number avoids the confusing case where the legend says 38% but you can count 37 squares.

**Data-driven and drop-in**

It renders from a \`DATA\` array of \`{ name, value, color }\`; values need not pre-sum to 100 (they are normalised). Swap in budget splits, market share, time allocation, or survey results and it lays out the grid. It is a clear, dependency-free reference for waffle layout and the largest-remainder rounding that part-to-whole square charts require. The same largest-remainder method generalises beyond charts — it's the standard algorithm for apportioning parliamentary seats by vote share, splitting a fixed pool of anything (budget headcount, inventory units) across categories by percentage, and any other case where rounded shares of a whole must still sum to the whole exactly. It's worth implementing once as a small, generic \`allocate(values, total)\` helper rather than re-deriving it per chart, since the floor-then-distribute-remainders logic here doesn't reference anything specific to waffle rendering — the exact same function would apportion budget headcount across departments or seats across parties from vote percentages.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 10x10 waffle chart renders, each square representing 1% of the whole.` },
      { title: 'Read the blocks', text: `Each colour's run of squares is its share; the legend lists the percentages.` },
      { title: 'Hover a square', text: `See which category a cell belongs to in a tooltip.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { name, value, color } items.` },
      { title: 'Values need not total 100', text: `They are normalised, and rounding ensures the grid always fills exactly 100 cells.` },
      { title: 'Resize the grid', text: `Change the grid-template-columns count (and TOTAL) for a different cell count.` },
    ] },
    features: [
      { title: '100-square grid', text: `A responsive 10x10 CSS grid where each cell is one percent.` },
      { title: 'Largest-remainder rounding', text: `Guarantees the categories sum to exactly 100 cells, distributing leftovers fairly.` },
      { title: 'Contiguous colour runs', text: `Each category fills a continuous run of cells for clear blocks.` },
      { title: 'Normalised values', text: `Source values need not total 100 — they are scaled to the grid.` },
      { title: 'Hover tooltips', text: `Hovering a coloured cell shows its category.` },
      { title: 'Legend matches the grid', text: `The legend shows rounded cell counts, so it always agrees with the squares.` },
      { title: 'Empty-cell fallback', text: `Any unallocated cells render neutral so the grid never breaks.` },
      { title: 'Data-driven & no library', text: `Renders from a DATA array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Budget and spend allocation', text: 'Show how a budget splits across categories as a 10 by 10 grid, where each square represents exactly one percent of the total.' },
      { title: 'Market and category share', text: 'Display share of a whole more intuitively than a [pie chart](/ui-snippets/pie-chart/), because counting squares is easier than judging angles.' },
      { title: 'Time and effort breakdown', text: 'Visualise where time goes across projects, with each category filling one continuous run of cells for clear, countable blocks.' },
      { title: 'Survey and demographic splits', text: 'Show response composition, with largest-remainder rounding guaranteeing that the categories always add up to exactly 100 squares.' },
      { title: 'Single-colour progress', text: 'Use one colour for a completion figure that reads at a glance, and a [donut chart](/ui-snippets/donut-chart/) when you want a continuous ring instead.' },
    ],
    faqs: [
      { q: 'Why is special rounding needed?', a: `Each category's share rarely converts to a whole number of cells, and naively rounding each one can make the total come out to 99 or 101 instead of 100. The largest-remainder method floors every count, then distributes the leftover cells one at a time to the categories with the largest fractional parts. This guarantees the grid sums to exactly 100 while keeping the rounding as fair as possible.` },
      { q: 'Do my values have to add up to 100?', a: `No. The values are normalised — each category's cell count is value ÷ total × 100 — so you can pass raw amounts (dollars, counts, hours) and the chart converts them to percentages of their sum. The largest-remainder rounding then ensures those convert to whole cells that fill the grid exactly.` },
      { q: 'Why does the legend show cell counts instead of the raw percentage?', a: `Because rounding can make the displayed squares differ slightly from the source percentage (38.4% becomes 38 cells). Showing the rounded cell count in the legend means the legend always matches what you can count on the grid, avoiding the confusing case where the legend and the visible squares disagree.` },
      { q: 'Can I change the grid size or shape?', a: `Yes. Change grid-template-columns to a different column count and set TOTAL to the number of cells (e.g. 5x5 = 25, or 10x20 = 200 for half-percent resolution). The allocation scales to whatever TOTAL you choose, so each cell represents 100/TOTAL percent. Keep TOTAL and the column count consistent for square cells.` },
      { q: 'How do I use this waffle chart in React, Vue, or Angular?', a: `In React, hold the data in useState, compute the cell allocation with useMemo, and render the grid from it; in Vue, use a computed counts array with v-for; in Angular, a getter with *ngFor. The allocate() largest-remainder logic is framework-agnostic — only the state and rendering move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the rounding algorithm by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how allocate() uses Math.floor on each category's raw share, then sorts by descending fractional remainder to decide which categories receive the leftover whole cells, and why that specific approach guarantees the total always lands on exactly 100 rather than 99 or 101. It's worth asking it to verify the edge case too — what happens if two categories tie exactly on their fractional remainder. For extending it, have it generalize allocate() into a standalone utility usable outside chart rendering (e.g. apportioning a fixed headcount across departments by percentage), add a way to sort the legend by value, or support a second row of squares to double the resolution to half-percent cells. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a waffle chart (a 10x10 grid of 100 squares representing percentages) in plain HTML, CSS, and vanilla JavaScript with no charting library.

Requirements:
- A CSS grid of exactly 100 square cells (10 columns) representing 100% of a whole, filled with colored squares in contiguous runs per category, ordered by category.
- Accept an input array of categories each with a name, a raw numeric value, and a color; the raw values do not need to sum to 100 — normalize each category's share as its value divided by the sum of all values, times 100.
- Implement the allocation using the largest-remainder rounding method: floor each category's normalized share to get a whole-cell count, sum the floors to find how many cells are still unassigned, then sort categories by the descending size of their fractional remainder (the part lost to flooring) and hand out one additional cell each, in that sorted order, until the total reaches exactly 100 cells. Do not use plain Math.round per category, since that can make the total sum to something other than 100.
- Any leftover unallocated cells (which should never occur if the algorithm is correct) must render as a neutral, uncolored fallback square rather than breaking the layout.
- Render a legend listing each category's color swatch, name, and its rounded cell count (not the raw input value or unrounded percentage), so the legend always agrees exactly with what's visibly countable on the grid.
- Add a mouseover tooltip that follows the cursor and shows the category name when hovering any colored cell, and hides when the pointer leaves the grid.`,
    },
  },
};

export default waffleChart;
