const pieChart = {
  id: 'pie-chart',
  title: 'Pie Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="pc-card">
  <div class="pc-head">
    <h3>Traffic by source</h3>
    <span class="pc-total" id="pcTotal"></span>
  </div>
  <div class="pc-body">
    <svg class="pc-svg" id="pcSvg" viewBox="0 0 200 200" role="img" aria-label="Pie chart of traffic by source"></svg>
    <ul class="pc-legend" id="pcLegend"></ul>
  </div>
  <div class="pc-tip" id="pcTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pc-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:420px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.pc-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:16px}
.pc-head h3{font-size:16px;font-weight:800;color:#0f172a}
.pc-total{font-size:12.5px;font-weight:700;color:#94a3b8}

.pc-body{display:flex;align-items:center;gap:20px}
.pc-svg{width:160px;height:160px;flex-shrink:0;overflow:visible}
.pc-slice{cursor:pointer;transition:opacity .15s;transform-origin:100px 100px}
.pc-slice:hover{opacity:.85}

.pc-legend{list-style:none;display:flex;flex-direction:column;gap:9px;flex:1}
.pc-legend li{display:flex;align-items:center;gap:9px;font-size:12.5px;color:#475569;cursor:pointer}
.pc-legend li.mute{opacity:.4}
.pc-dot{width:11px;height:11px;border-radius:3px;flex-shrink:0}
.pc-name{font-weight:600}
.pc-val{margin-left:auto;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}

.pc-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:600;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.pc-tip[hidden]{display:none}
.pc-tip b{font-weight:800}`,

  js: `var DATA = [
  { name: 'Organic search', value: 4820, color: '#6366f1' },
  { name: 'Direct',         value: 2410, color: '#22c55e' },
  { name: 'Social',         value: 1560, color: '#f59e0b' },
  { name: 'Referral',       value: 980,  color: '#ec4899' },
  { name: 'Email',          value: 540,  color: '#0ea5e9' },
];

var svg = document.getElementById('pcSvg');
var legend = document.getElementById('pcLegend');
var tip = document.getElementById('pcTip');
var card = document.querySelector('.pc-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var CX = 100, CY = 100, R = 92;
var hidden = {};

function total() {
  return DATA.reduce(function (s, d) { return hidden[d.name] ? s : s + d.value; }, 0);
}

// Point on the circle for a given fraction (0..1), starting at 12 o'clock.
function point(frac) {
  var a = frac * Math.PI * 2 - Math.PI / 2;
  return [CX + R * Math.cos(a), CY + R * Math.sin(a)];
}

function slicePath(start, end) {
  var p0 = point(start), p1 = point(end);
  var large = end - start > 0.5 ? 1 : 0;
  // Move to centre, line to arc start, arc to end, close — a filled wedge.
  return 'M' + CX + ',' + CY + ' L' + p0[0].toFixed(2) + ',' + p0[1].toFixed(2) +
    ' A' + R + ',' + R + ' 0 ' + large + ' 1 ' + p1[0].toFixed(2) + ',' + p1[1].toFixed(2) + ' Z';
}

function render() {
  var sum = total();
  document.getElementById('pcTotal').textContent = sum.toLocaleString() + ' visits';
  svg.innerHTML = '';
  var acc = 0;
  DATA.forEach(function (d) {
    if (hidden[d.name]) return;
    var frac = d.value / sum;
    var start = acc, end = acc + frac;
    acc = end;
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('class', 'pc-slice');
    path.setAttribute('fill', d.color);
    path.setAttribute('d', slicePath(start, end));
    path.dataset.name = d.name;
    path.dataset.value = d.value;
    path.dataset.pct = (frac * 100).toFixed(1);
    svg.appendChild(path);
  });
  // Legend (always lists every series so muted ones can be toggled back on).
  legend.innerHTML = DATA.map(function (d) {
    return '<li data-name="' + d.name + '" class="' + (hidden[d.name] ? 'mute' : '') + '">' +
      '<span class="pc-dot" style="background:' + d.color + '"></span>' +
      '<span class="pc-name">' + d.name + '</span>' +
      '<span class="pc-val">' + d.value.toLocaleString() + '</span></li>';
  }).join('');
}

svg.addEventListener('mousemove', function (e) {
  var slice = e.target.closest('.pc-slice');
  if (!slice) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.innerHTML = slice.dataset.name + ': <b>' + Number(slice.dataset.value).toLocaleString() + '</b> (' + slice.dataset.pct + '%)';
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

legend.addEventListener('click', function (e) {
  var li = e.target.closest('li');
  if (!li) return;
  var name = li.dataset.name;
  // Don't allow hiding the last visible slice.
  var visible = DATA.filter(function (d) { return !hidden[d.name]; }).length;
  if (!hidden[name] && visible <= 1) return;
  hidden[name] = !hidden[name];
  render();
});

render();`,

  seo: {
    title: 'Pie Chart — HTML CSS JS SVG Pie Chart (No Library)',
    description: `An SVG pie chart in vanilla JS — hover tooltips, a legend that toggles slices, and live percentages. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Pie Chart — SVG Arc-Path Pie Chart with Hover Tooltips & Toggleable Legend',
      description: `A pie chart shows part-to-whole composition at a glance — what share each source, category, or segment contributes to a total. This snippet builds a complete, interactive pie chart in plain HTML, CSS, SVG, and vanilla JavaScript, with no charting library: each slice is a real SVG \`<path>\` wedge computed from the data, with hover tooltips, a legend that toggles slices on and off, and percentages that recalculate live.

**Real SVG wedges, computed with trigonometry**

Each slice is an SVG \`path\` made of three commands: move to the centre, line out to the start of the arc, then an elliptical \`A\` (arc) command sweeping to the end of the slice, then close. The start and end points are found with \`point(frac)\`, which converts a fraction of the circle (0–1) into x/y coordinates using \`Math.cos\`/\`Math.sin\`, offset by −90° so the chart starts at twelve o'clock like every pie chart people expect. The arc's large-arc-flag is set to 1 whenever a slice spans more than half the circle, which is the one detail that trips people up when drawing arcs by hand — get it wrong and big slices render inverted.

**Why SVG paths instead of conic-gradient**

You can fake a pie with a single \`conic-gradient\`, but that gives you one flat element with no per-slice interactivity — no hover target, no individual slice to highlight or pull out, no accessible structure. Drawing each slice as its own \`path\` means every slice is a real DOM node you can attach a tooltip to, fade on hover, animate independently, or click. That interactivity is the whole point of a chart, so the small amount of arc math is worth it.

**A legend that toggles slices**

The legend lists every series with its colour swatch and value. Clicking a legend row hides or shows that slice, and the chart re-renders with the remaining slices re-proportioned to the new total — the same behaviour as Chart.js and every dashboard charting tool. A guard prevents hiding the last visible slice (an empty pie is meaningless), and hidden rows stay in the legend, dimmed, so they can be toggled back on. Because the percentages derive from the live total, hiding a slice recalculates everyone else's share automatically.

**Tooltips positioned to the cursor**

Hovering a slice shows a tooltip with the series name, its raw value, and its percentage, positioned at the mouse using \`getBoundingClientRect\` to convert the page coordinates into offsets within the card. The tooltip is \`pointer-events: none\` so it never flickers by intercepting its own hover, and it follows the cursor smoothly via a single \`mousemove\` listener on the SVG with event delegation through \`closest('.pc-slice')\`.

**Data-driven and drop-in**

The entire chart renders from a \`DATA\` array of \`{ name, value, color }\` — swap in your analytics, budget, or survey numbers and everything (slices, legend, total, percentages) updates. Because it's compact and dependency-free, it drops into any dashboard or report, and the arc math is a clear reference for understanding how SVG pie and donut charts are actually drawn.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pie chart renders with five slices, a legend, and a running total of visits.` },
      { title: 'Hover a slice', text: `Move over any wedge to see a tooltip with its name, value, and percentage of the total.` },
      { title: 'Toggle slices', text: `Click a legend row to hide that slice; the remaining slices re-proportion and the total updates.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { name, value, color } items — slices, legend, and percentages all derive from it.` },
      { title: 'Restyle it', text: `Change the colours, radius (R), or card styling; the arc math adapts to any radius automatically.` },
      { title: 'Wire to an API', text: `Fetch your figures, map them to the DATA shape, and call render() to draw the live chart.` },
    ] },
    features: [
      { title: 'Real SVG arc-path slices', text: `Each slice is a computed <path> wedge, so every slice is an interactive DOM node — not a flat conic-gradient.` },
      { title: 'Correct arc math', text: `Points are derived with cos/sin offset to start at 12 o'clock, with the large-arc-flag set for slices over half the circle.` },
      { title: 'Hover tooltips', text: `A cursor-following tooltip shows the slice name, raw value, and percentage, positioned via getBoundingClientRect.` },
      { title: 'Toggleable legend', text: `Clicking a legend row hides or shows a slice and re-proportions the rest, like Chart.js.` },
      { title: 'Live percentages', text: `Percentages derive from the visible total, so hiding a slice recalculates everyone else's share.` },
      { title: 'Last-slice guard', text: `The chart prevents hiding the final visible slice so the pie is never empty.` },
      { title: 'Event delegation', text: `One mousemove and one click listener handle every slice and legend row via closest().` },
      { title: 'Data-driven & no library', text: `Renders entirely from a DATA array in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Analytics traffic-source breakdowns', text: `Show where visits come from on a dashboard — pair with a [bar chart](/ui-snippets/bar-chart/) for trends over time.` },
      { title: 'Budget and spending composition', text: `Visualise how a budget splits across categories alongside a [donut chart](/ui-snippets/donut-chart/) for a hollow-centre variant.` },
      { title: 'Survey and poll results', text: `Display answer distribution as shares of the whole, complementing a [poll widget](/ui-snippets/poll-widget/).` },
      { title: 'Portfolio and asset allocation', text: `Show how holdings split across asset classes with live percentages.` },
      { title: 'Storage and quota usage', text: `Break down disk or plan usage by type next to a [quota usage meter](/ui-snippets/quota-usage-meter/).` },
      { title: 'Learning SVG arc drawing', text: `A clear reference for arc-path math — compare with a [gauge chart](/ui-snippets/gauge-chart/) for a single-value arc.` },
      { icon: 'CODE', title: 'Related: Skills Assessment Radar Chart', desc: 'See the [Skills Assessment Radar Chart](/ui-snippets/skills-assessment-radar/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the pie slices actually drawn?', a: `Each slice is an SVG <path> built from three commands: move to the centre, line to the slice's start point on the circle, then an elliptical arc (A) to its end point, then close (Z). The start/end points come from point(frac), which converts a fraction of the circle into x/y with Math.cos/Math.sin offset by −90° so the chart begins at twelve o'clock. The arc's large-arc-flag is set to 1 for any slice spanning more than half the circle.` },
      { q: 'Why use SVG paths instead of a CSS conic-gradient?', a: `A conic-gradient renders a pie as a single flat element with no per-slice interactivity — you can't hover, highlight, pull out, or animate an individual slice. Drawing each slice as its own <path> makes every slice a real DOM node you can attach tooltips and click handlers to, which is the entire value of an interactive chart. The arc math is the small cost of that interactivity.` },
      { q: 'How does toggling a slice recalculate the others?', a: `Clicking a legend row flips a flag in the hidden map and calls render(), which recomputes the total from only the visible slices and redraws each remaining wedge proportioned to that new total. Because percentages and the running total both derive from the live sum, hiding one slice automatically re-proportions the rest — the same behaviour as professional charting libraries.` },
      { q: 'How do I add more slices or change the data?', a: `Edit the DATA array — each entry is { name, value, color }. Add, remove, or change entries and the slices, legend, total, and percentages all derive from it on the next render(). For real data, fetch your numbers, map them into that shape, and call render(); the arc math handles any number of slices and any values.` },
      { q: 'How do I use this pie chart in React, Vue, or Angular?', a: `In React, hold the data and hidden state in useState and render the slices/legend from .map() with onClick toggles; in Vue, use v-for with ref state; in Angular, use *ngFor with component properties. The point()/slicePath() arc math is framework-agnostic — only the state and event wiring move into the framework, and the SVG paths render identically.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the arc trigonometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the point function converts a 0-1 fraction of the circle into an x/y coordinate with the -90 degree offset, and why the large-arc-flag in slicePath must switch to 1 once a slice exceeds half the circle. The same assistant can help optimize it, for example checking whether recomputing every slice's path string on every legend toggle is cheap enough for a chart with many more than five categories, or whether the mousemove tooltip handler could be throttled without hurting responsiveness. It's also useful for extending the effect: ask it to add an animated transition when slices are toggled instead of an instant redraw, turn it into a donut chart by punching an inner radius hole, or support clicking a slice to pull it outward like an exploded pie chart. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive pie chart in plain HTML, CSS, and vanilla JavaScript using hand-drawn SVG path arcs — no charting library, no CSS conic-gradient.

Requirements:
- A data array of objects each with a name, a numeric value, and a color, rendered into an SVG donut of wedges plus a legend listing every entry with its color swatch and value.
- Write a function that converts a fraction from 0 to 1 into an x/y point on a circle of a given radius, using cosine and sine with the angle offset by -90 degrees so a fraction of 0 lands at the twelve o'clock position rather than SVG's default three o'clock.
- Write a function that builds one slice's SVG path data as: move to the circle's center, draw a line out to the arc's start point, draw an elliptical arc command to the arc's end point, then close the path — and make sure the arc command's large-arc-flag is computed as 1 whenever that slice's angular span exceeds half the full circle, otherwise 0.
- Compute each slice's start and end fraction by accumulating each data entry's share of the running total (value divided by the sum of all currently visible values) in order, so slices tile the whole circle with no gaps or overlaps.
- Clicking a legend row must toggle that entry's slice out of the chart (hiding its path and dimming its legend row) and re-render every remaining slice re-proportioned against the new total of only the visible entries — but must never allow the very last visible slice to be hidden.
- Add a tooltip that follows the mouse while hovering any slice, showing that slice's name, raw value, and percentage of the current visible total, positioned using getBoundingClientRect so it tracks correctly relative to the chart's container regardless of page scroll.`,
    },
  },
};

export default pieChart;
