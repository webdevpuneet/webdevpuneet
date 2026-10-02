const slopeChart = {
  id: 'slope-chart',
  title: 'Slope Chart',
  lastmod: '2026-06-24',
  category: 'charts',
  html: `<div class="sl-card">
  <div class="sl-head"><h3>Market share: 2024 → 2025</h3></div>
  <div class="sl-cols"><span>2024</span><span>2025</span></div>
  <svg class="sl-svg" id="slSvg" viewBox="0 0 380 280" role="img" aria-label="Slope chart"></svg>
  <div class="sl-tip" id="slTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.sl-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:440px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.sl-head h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:12px}
.sl-cols{display:flex;justify-content:space-between;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#94a3b8;padding:0 8px}
.sl-svg{width:100%;height:auto;display:block}
.sl-line{stroke-width:2;transition:stroke-width .12s,opacity .12s}
.sl-dot{transition:r .12s}
.sl-row:hover .sl-line{stroke-width:3.5}
.sl-row:hover .sl-dot{r:6}
.sl-row.dim{opacity:.28}
.sl-lab{font-size:11px;font-weight:700;fill:#334155}
.sl-val{font-size:11px;font-weight:800;fill:#0f172a}

.sl-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.sl-tip[hidden]{display:none}`,

  js: `// Each series has a 'before' and 'after' value; the slope shows the change.
var DATA = [
  { name: 'Acme', before: 34, after: 41, color: '#6366f1' },
  { name: 'Globex', before: 28, after: 22, color: '#ec4899' },
  { name: 'Initech', before: 18, after: 24, color: '#22c55e' },
  { name: 'Umbrella', before: 12, after: 9, color: '#f59e0b' },
  { name: 'Stark', before: 8, after: 4, color: '#0ea5e9' },
];

var svg = document.getElementById('slSvg');
var tip = document.getElementById('slTip');
var card = document.querySelector('.sl-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 380, H = 280, PADY = 22, LX = 96, RX = W - 96;

function el(n, a) { var e = document.createElementNS(SVGNS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }

function render() {
  var all = DATA.reduce(function (a, d) { return a.concat([d.before, d.after]); }, []);
  var max = Math.max.apply(null, all), min = Math.min.apply(null, all);
  function y(v) { return (H - PADY) - ((v - min) / (max - min)) * (H - PADY * 2); }
  svg.innerHTML = '';
  // Two vertical axis lines.
  svg.appendChild(el('line', { x1: LX, y1: PADY, x2: LX, y2: H - PADY, stroke: '#e2e8f0', 'stroke-width': 1.5 }));
  svg.appendChild(el('line', { x1: RX, y1: PADY, x2: RX, y2: H - PADY, stroke: '#e2e8f0', 'stroke-width': 1.5 }));
  DATA.forEach(function (d, i) {
    var g = el('g', { class: 'sl-row' });
    g.dataset.i = i;
    var y1 = y(d.before), y2 = y(d.after);
    g.appendChild(el('line', { class: 'sl-line', x1: LX, y1: y1, x2: RX, y2: y2, stroke: d.color }));
    g.appendChild(el('circle', { class: 'sl-dot', cx: LX, cy: y1, r: 4, fill: d.color }));
    g.appendChild(el('circle', { class: 'sl-dot', cx: RX, cy: y2, r: 4, fill: d.color }));
    // Left label: name + before value. Right label: after value + name.
    var lname = el('text', { class: 'sl-lab', x: LX - 12, y: y1 + 4, 'text-anchor': 'end' }); lname.textContent = d.name; g.appendChild(lname);
    var lval = el('text', { class: 'sl-val', x: LX - 12, y: y1 - 9, 'text-anchor': 'end' }); lval.textContent = d.before + '%'; g.appendChild(lval);
    var rval = el('text', { class: 'sl-val', x: RX + 12, y: y2 - 9, 'text-anchor': 'start' }); rval.textContent = d.after + '%'; g.appendChild(rval);
    var rname = el('text', { class: 'sl-lab', x: RX + 12, y: y2 + 4, 'text-anchor': 'start' }); rname.textContent = d.name; g.appendChild(rname);
    svg.appendChild(g);
  });
}

svg.addEventListener('mousemove', function (e) {
  var row = e.target.closest('.sl-row');
  svg.querySelectorAll('.sl-row').forEach(function (r) { r.classList.toggle('dim', !!row && r !== row); });
  if (!row) { tip.hidden = true; return; }
  var d = DATA[+row.dataset.i];
  var change = d.after - d.before;
  var rect = card.getBoundingClientRect();
  tip.textContent = d.name + ': ' + (change >= 0 ? '+' : '') + change + ' pts';
  tip.style.left = (e.clientX - rect.left) + 'px';
  tip.style.top = (e.clientY - rect.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () {
  svg.querySelectorAll('.sl-row').forEach(function (r) { r.classList.remove('dim'); });
  tip.hidden = true;
});

render();`,

  seo: {
    title: 'Slope Chart — HTML CSS JS Slopegraph (No Library)',
    description: `A slope chart (slopegraph) connecting each category's before and after value with a line, so change reads at a glance. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Slope Chart — Before-and-After Lines That Show Change at a Glance',
      description: `A slope chart (or slopegraph, popularised by Edward Tufte) compares two points in time by drawing a line for each category between its before and after value on two parallel axes. The slope of each line — up, down, steep, flat — instantly communicates the direction and size of change, and crossings show rank shifts. This snippet builds it in plain HTML, CSS, SVG, and vanilla JavaScript, with labelled endpoints and hover focus — no charting library.

**Two axes, one line per category**

The chart has two vertical axes — left for the "before" period, right for "after" — and each category is a single line connecting its two values, with a dot at each end. A line that climbs rose; one that falls dropped; a steep line changed a lot. This direct encoding of change as slope is what a slopegraph does better than a grouped bar chart or two pies: the eye reads the trend without comparing bar heights across a gap.

**A shared scale for honest slopes**

Both axes share one scale computed from the combined min and max of all values, so a slope's steepness genuinely reflects the magnitude of change and lines are comparable across categories. The \`y()\` function maps each value to a pixel position on that shared range (inverted for SVG). Using one scale for both columns is essential — separate scales would make the slopes meaningless.

**Endpoints labelled on both sides**

Each line is labelled at both ends: the category name and its before value on the left, its after value and name on the right. Labelling both endpoints (rather than relying on a legend) lets the reader follow any line across without losing track of which is which — the convention that makes a slopegraph readable even with crossing lines.

**Hover to focus**

Hovering a line dims all the others and thickens the focused one, with a tooltip showing the exact change in points. This focus-and-dim interaction is what tames a busy slope chart: when several lines cross, hovering isolates the one you care about so you can trace it cleanly. The whole row (line, dots, labels) is one SVG group, so it highlights together.

**Data-driven and drop-in**

It renders from a \`DATA\` array of \`{ name, before, after, color }\`. Swap in any two-period comparison — market share, rankings, prices, survey results across two years — and the slopes, scale, and labels follow. It is a clear, dependency-free reference for slopegraph construction: shared-scale endpoints, connecting lines, and focus interaction. A slope chart only scales gracefully to a dozen or so categories before the left and right labels start overlapping vertically — past that point, either label only the lines a viewer is most likely to care about (the biggest movers) and let the rest go unlabeled until hovered, or switch to small multiples grouping related categories into separate, less crowded slope charts.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A slope chart renders connecting each company's 2024 and 2025 market share.` },
      { title: 'Read the slopes', text: `Upward lines rose, downward fell; steeper means a bigger change, crossings mean rank shifts.` },
      { title: 'Hover a line', text: `The others dim and a tooltip shows the change in points for the focused line.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { name, before, after, color } items.` },
      { title: 'Use for any two periods', text: `Years, before/after, baseline/result — any two comparable points work.` },
      { title: 'Wire to an API', text: `Map your two-period data into the DATA shape and call render().` },
    ] },
    features: [
      { title: 'Slope encodes change', text: `Each category is a line between its before and after value — direction and steepness show the change.` },
      { title: 'Shared scale', text: `Both axes use one scale from the combined range, so slopes are honest and comparable.` },
      { title: 'Endpoints labelled both sides', text: `Name and value at each end let you follow any line without a legend.` },
      { title: 'Rank-shift crossings', text: `Lines that cross reveal categories swapping positions.` },
      { title: 'Hover focus-and-dim', text: `Hovering a line dims the rest and thickens it, taming crossings.` },
      { title: 'Change tooltip', text: `Shows the exact +/- change in points for the focused line.` },
      { title: 'Grouped SVG rows', text: `Each line, its dots, and labels are one group that highlights together.` },
      { title: 'Data-driven & no library', text: `Renders from a DATA array in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Before-and-after comparisons', text: 'Show change between two periods with one line per category, where steepness reads as the size of the change and direction as an increase or decrease.' },
      { title: 'Market share and ranking shifts', text: 'Visualise share or rank movement between two years, where lines that cross reveal the categories that swapped positions.' },
      { title: 'Survey and poll waves', text: 'Compare responses across two waves with the name and value labelled at both ends, so every line can be followed without a legend.' },
      { title: 'Price and KPI movement', text: 'Show how prices or KPIs moved between two dates on one shared scale, so slopes stay honest and comparable across categories.' },
      { title: 'Experiment results', text: 'Compare a baseline with the result across segments, and reach for a [bar chart](/ui-snippets/bar-chart/) or [multi-line chart](/ui-snippets/multi-line-chart/) when you need more than two time points.' },
    ],
    faqs: [
      { q: 'What is a slope chart good for?', a: `Comparing exactly two points — usually two time periods — across several categories. Each category becomes a line whose slope shows the direction and size of change, and crossings reveal rank swaps. It communicates change more directly than grouped bars (no comparing heights across a gap) or two pies (no tracking slices between them), which is why Tufte popularised it for before/after comparisons.` },
      { q: 'Why must both axes share one scale?', a: `The whole point of a slope chart is that the steepness of a line reflects how much a value changed. If each axis had its own scale, identical changes would render as different slopes and the chart would mislead. The snippet computes one min/max from all values across both periods and maps both endpoints through the same y() function, so every slope is comparable and honest.` },
      { q: 'Why label both ends of each line?', a: `When several lines are close together or cross, a legend forces the reader to match colours back and forth. Labelling each line's name and value at both endpoints lets the eye follow any line straight across the chart without losing it. This dual labelling is the standard slopegraph convention and is what keeps it readable as the number of categories grows.` },
      { q: 'How does the hover focus help?', a: `With many categories the lines can overlap and cross, making one hard to trace. Hovering a line adds a dim class to all the other rows and thickens the focused line and its dots, visually isolating it, while a tooltip shows its exact change. Because each line, its dots, and labels are grouped in one SVG <g>, they highlight and dim together.` },
      { q: 'How do I use this slope chart in React, Vue, or Angular?', a: `In React, hold the data in useState and render the line groups from .map() (or run render() in a useEffect with a ref), tracking the hovered index in state for the dim effect; in Vue, use v-for with a hovered ref; in Angular, *ngFor with a property. The shared-scale y() math is framework-agnostic and ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the shared-scale math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the y() function derives its min and max from every before and after value combined rather than scaling each axis independently, or how the mousemove handler uses closest('.sl-row') plus a dim class to isolate one line among crossing ones. The same assistant can help optimize it, for instance checking whether rebuilding the entire SVG with innerHTML equals '' plus re-creating every element on each render() call is wasteful for data that updates frequently versus patching existing nodes. It is just as useful for extending the chart: ask it to add a third time period as a middle column, sort the DATA array by change magnitude and only label the biggest movers to avoid overlap with many categories, or animate the lines drawing in in on load using stroke-dashoffset. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "slope chart" (slopegraph) comparing a before and after value per category in plain HTML, CSS, and inline SVG built with JavaScript — no charting library.

Requirements:
- Two parallel vertical axis lines, one for the "before" period and one for "after", with one straight line per category connecting its before value's y-position on the left axis to its after value's y-position on the right axis, plus a small circle marker at each end.
- Compute a single shared vertical scale from the combined minimum and maximum across every before and after value in the dataset, and use that one scale function for both axis positions — never compute separate independent scales for the two axes, since that would make slope steepness meaningless between categories.
- Label both ends of every line: the category name and its value at the left endpoint, and the value and category name again at the right endpoint, so a viewer can trace any single line across the chart without needing a color legend.
- Group each line, its two dot markers, and its four text labels into one SVG group element per category, so they can be selected and styled together as a unit.
- On mousemove over the chart, detect which row group the pointer is over (using event target's closest ancestor match), thicken that row's line and enlarge its dots, add a dimming class to every other row's group, and show a tooltip near the cursor stating the exact numeric change (with a plus or minus sign) for the hovered category. On mouseleave, clear the dimming and hide the tooltip.
- Render everything from a plain JavaScript array of objects (name, before, after, color) so swapping in new data requires no changes to the rendering logic.`,
    },
  },
};

export default slopeChart;
