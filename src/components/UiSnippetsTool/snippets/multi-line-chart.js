const multiLineChart = {
  id: 'multi-line-chart',
  title: 'Multi-Line Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="mlc-card">
  <div class="mlc-head">
    <h3>Weekly active users</h3>
    <ul class="mlc-legend" id="mlcLegend"></ul>
  </div>
  <svg class="mlc-svg" id="mlcSvg" viewBox="0 0 380 220" role="img" aria-label="Multi-series line chart"></svg>
  <div class="mlc-xlabels" id="mlcX"></div>
  <div class="mlc-tip" id="mlcTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.mlc-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:480px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.mlc-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:10px}
.mlc-head h3{font-size:16px;font-weight:800;color:#0f172a}
.mlc-legend{list-style:none;display:flex;flex-wrap:wrap;gap:10px}
.mlc-legend li{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#475569;cursor:pointer}
.mlc-legend li.mute{opacity:.35}
.mlc-dot{width:10px;height:10px;border-radius:3px}

.mlc-svg{width:100%;height:auto;display:block}
.mlc-grid{stroke:#eef2f7;stroke-width:1}
.mlc-line{fill:none;stroke-width:2.5;stroke-linecap:round;stroke-linejoin:round}
.mlc-pt{cursor:pointer}
.mlc-xlabels{display:flex;justify-content:space-between;margin-top:6px;padding:0 4px;font-size:10.5px;font-weight:700;color:#94a3b8}

.mlc-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.mlc-tip[hidden]{display:none}`,

  js: `var LABELS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
var SERIES = [
  { name: 'Desktop', color: '#6366f1', data: [320,340,310,380,420,300,280] },
  { name: 'Mobile',  color: '#22c55e', data: [210,260,290,310,360,410,430] },
  { name: 'Tablet',  color: '#f59e0b', data: [80,95,70,110,130,90,75] },
];

var svg = document.getElementById('mlcSvg');
var legend = document.getElementById('mlcLegend');
var tip = document.getElementById('mlcTip');
var card = document.querySelector('.mlc-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 380, H = 220, PAD = 30;
var hidden = {};

function el(n, a) { var e = document.createElementNS(SVGNS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }
function px(i) { return PAD + i * (W - PAD * 2) / (LABELS.length - 1); }
function py(v, max) { return (H - PAD) - (v / max) * (H - PAD * 2); }

function maxVal() {
  var m = 0;
  SERIES.forEach(function (s) { if (!hidden[s.name]) s.data.forEach(function (v) { if (v > m) m = v; }); });
  return Math.ceil(m / 100) * 100 || 100;
}

function render() {
  svg.innerHTML = '';
  var max = maxVal();
  for (var i = 0; i <= 4; i++) {
    var gy = PAD + i * (H - PAD * 2) / 4;
    svg.appendChild(el('line', { class: 'mlc-grid', x1: PAD, y1: gy, x2: W - PAD, y2: gy }));
  }
  SERIES.forEach(function (s) {
    if (hidden[s.name]) return;
    var pts = s.data.map(function (v, i) { return px(i) + ',' + py(v, max); }).join(' ');
    svg.appendChild(el('polyline', { class: 'mlc-line', stroke: s.color, points: pts }));
    s.data.forEach(function (v, i) {
      var c = el('circle', { class: 'mlc-pt', cx: px(i), cy: py(v, max), r: 3.5, fill: '#fff', stroke: s.color, 'stroke-width': 2 });
      c.dataset.series = s.name; c.dataset.label = LABELS[i]; c.dataset.value = v;
      svg.appendChild(c);
    });
  });
  legend.innerHTML = SERIES.map(function (s) {
    return '<li data-name="' + s.name + '" class="' + (hidden[s.name] ? 'mute' : '') + '">' +
      '<span class="mlc-dot" style="background:' + s.color + '"></span>' + s.name + '</li>';
  }).join('');
  document.getElementById('mlcX').innerHTML = LABELS.map(function (l) { return '<span>' + l + '</span>'; }).join('');
}

svg.addEventListener('mousemove', function (e) {
  var p = e.target.closest('.mlc-pt');
  if (!p) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.textContent = p.dataset.series + ' · ' + p.dataset.label + ': ' + Number(p.dataset.value).toLocaleString();
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

legend.addEventListener('click', function (e) {
  var li = e.target.closest('li');
  if (!li) return;
  var name = li.dataset.name;
  var visible = SERIES.filter(function (s) { return !hidden[s.name]; }).length;
  if (!hidden[name] && visible <= 1) return;
  hidden[name] = !hidden[name];
  render();
});

render();`,

  seo: {
    title: 'Multi-Line Chart — HTML CSS JS Multi-Series Lines',
    description: `A multi-series SVG line chart — shared scale, a legend that toggles series, point tooltips, and gridlines. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Multi-Line Chart — Several Series on a Shared Scale with a Toggleable Legend',
      description: `When you need to compare how several things trend over the same period — desktop vs. mobile vs. tablet traffic, revenue across regions, temperatures across cities — you want them on one chart, sharing one scale, so the comparison is direct. This snippet builds a multi-series line chart in plain HTML, CSS, SVG, and vanilla JavaScript: multiple lines drawn as SVG polylines, a legend that toggles each series, point tooltips, and a y-scale that adapts to whichever series are visible — no charting library.

**Polylines on a shared, adaptive scale**

Each series is drawn as an SVG \`polyline\` whose points come from mapping the data through \`px(i)\` (evenly spacing points across the width by index) and \`py(v, max)\` (scaling values up the height, inverted for SVG's downward y). All visible series share one \`max\`, computed from the highest value across only the visible series and rounded up to a clean hundred — so the lines are directly comparable, and the scale tightens automatically when you hide a tall series, giving the remaining lines more vertical room.

**A legend that toggles series**

The legend lists every series with its colour. Clicking one hides or shows that line and re-renders, which recomputes the shared max and redraws the remaining lines on the new scale — exactly how Chart.js and dashboard charts behave. A guard prevents hiding the last visible series, and hidden entries stay in the legend, dimmed, so they're easy to bring back. This toggling is what makes a busy multi-line chart usable: readers can isolate the series they care about.

**Points for precise reading**

On top of each line sit small circles at every data point — white-filled with a coloured stroke so they read as markers against any line colour. Each carries its series name, label, and value as data attributes, so hovering shows a tooltip with the exact figure at that point. A single delegated \`mousemove\` listener handles every point across every series via \`closest('.mlc-pt')\`, and the tooltip follows the cursor using \`getBoundingClientRect\`.

**Gridlines and aligned x-labels**

Horizontal gridlines give the eye reference levels, and the x-axis labels render as a flex row beneath the SVG, justified to match the evenly-spaced points. Keeping the labels in HTML rather than SVG text means they inherit normal font rendering and wrap or truncate with CSS if needed.

**Data-driven and drop-in**

The chart renders from a \`LABELS\` array and a \`SERIES\` array of \`{ name, color, data }\`. Add a series, change the labels, or swap the numbers and everything — lines, legend, scale, tooltips, x-labels — follows. Because it's dependency-free SVG, it's crisp at any size and a clear reference for multi-series scaling and the polyline-from-data pattern that underpins every line chart.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A multi-line chart renders with three series (Desktop, Mobile, Tablet) over a week.` },
      { title: 'Toggle a series', text: `Click a legend item to hide or show that line; the shared scale recomputes and the lines redraw.` },
      { title: 'Hover a point', text: `Move over any marker to see that series, day, and exact value in a tooltip.` },
      { title: 'Swap in your data', text: `Replace LABELS and the SERIES array ({ name, color, data }) with your own values.` },
      { title: 'Add more series', text: `Push another { name, color, data } object — the legend, scale, and lines adapt automatically.` },
      { title: 'Wire to an API', text: `Fetch your series, map them into the SERIES shape, and call render() to draw the live chart.` },
    ] },
    features: [
      { title: 'Multiple polylines', text: `Each series is an SVG polyline mapped from data via index spacing and value scaling.` },
      { title: 'Shared adaptive scale', text: `All visible series share one max, recomputed when series are toggled so comparison stays fair.` },
      { title: 'Toggleable legend', text: `Clicking a legend item hides/shows its line and rescales the rest, like Chart.js.` },
      { title: 'Point markers & tooltips', text: `White-filled markers on every point show series, label, and value on hover.` },
      { title: 'Last-series guard', text: `The chart prevents hiding the final visible series so it's never empty.` },
      { title: 'Gridlines & aligned x-labels', text: `Reference gridlines plus HTML x-labels justified to match the evenly-spaced points.` },
      { title: 'Event delegation', text: `One mousemove and one click listener handle all points and legend items via closest().` },
      { title: 'Data-driven & no library', text: `Renders from LABELS + SERIES arrays in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Traffic and engagement trends', text: `Compare device or channel trends over time — pair with a [bar chart](/ui-snippets/bar-chart/) for totals.` },
      { title: 'Revenue across regions', text: `Track several markets on one scale alongside a [stat comparison card](/ui-snippets/stat-comparison-card/).` },
      { title: 'Performance and uptime metrics', text: `Plot latency or response times per service next to an [uptime status page](/ui-snippets/uptime-status-page/).` },
      { title: 'Finance and price history', text: `Compare multiple assets over time, complementing a [candlestick chart](/ui-snippets/candlestick-chart/).` },
      { title: 'Cohort and funnel comparison', text: `Show several cohorts' weekly retention on a single chart.` },
      { title: 'Learning line-chart scaling', text: `A reference for multi-series scaling and polyline drawing — compare with a [sparkline chart](/ui-snippets/sparkline-chart/).` },
      { icon: 'CODE', title: 'Related: Skills Assessment Radar Chart', desc: 'See the [Skills Assessment Radar Chart](/ui-snippets/skills-assessment-radar/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the lines share one scale?', a: `maxVal() scans every visible series for the highest value and rounds it up to a clean hundred; py(v, max) then scales all series against that single max. Because every line uses the same scale, vertical positions are directly comparable. When you hide a tall series, the max drops and the remaining lines are redrawn taller, using the freed vertical space.` },
      { q: 'How are the lines actually drawn?', a: `Each series becomes an SVG <polyline> whose points attribute is a list of "x,y" pairs. The x of each point is its index spaced evenly across the width by px(i); the y is the value scaled up the height by py(v, max), inverted because SVG's y-axis grows downward. The polyline connects them with rounded joins, and circles are drawn on top as point markers.` },
      { q: 'How does toggling a series rescale the chart?', a: `Clicking a legend item flips a flag in the hidden map and calls render(), which recomputes the shared max from only the visible series and redraws every visible line on that new scale. A guard prevents hiding the last visible series. Hidden entries remain in the legend, dimmed, so they can be toggled back on.` },
      { q: 'How do I add another series or change the labels?', a: `Push another object to SERIES with { name, color, data } where data has one value per label, and edit LABELS for the x-axis categories. The legend, shared scale, lines, and tooltips all derive from those two arrays on the next render(). For real data, fetch it, map it into that shape, and call render().` },
      { q: 'How do I use this multi-line chart in React, Vue, or Angular?', a: `In React, hold the series and hidden state in useState and render polylines/markers from .map() with legend onClick toggles; in Vue, use v-for with ref state; in Angular, use *ngFor with component properties. The px()/py()/maxVal() scaling math is framework-agnostic and ports unchanged — only state and event wiring move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working through the scaling math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why maxVal() recomputes from only the visible series rather than all of them, and how that recomputation is what makes hiding a tall series make the remaining lines taller on redraw. The same assistant can help you optimize it, for instance asking whether wiping and rebuilding the entire svg.innerHTML on every legend click is wasteful compared to updating just the changed polyline and circle elements, or how the chart would need to change to handle a series with missing data points (gaps) rather than a dense array. It's also useful for extending the chart: ask it to add a synchronized vertical hover guideline across all series at once instead of per-point tooltips, animate the polylines drawing in on load, or support a secondary y-axis for a series on a very different scale. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "multi-series line chart" in plain HTML, CSS, and SVG built with vanilla JavaScript — no charting library, no canvas.

Requirements:
- Accept a labels array (x-axis categories) and a series array of objects, each with a name, a color, and a data array of numbers aligned to the labels.
- Draw each visible series as one SVG polyline whose points are computed by spacing x positions evenly across the chart width by index and scaling y positions by the value against a shared maximum, inverted so higher values sit higher on screen.
- The shared maximum used for the y-scale must be computed dynamically from only the currently visible series (not a fixed constant), rounded up to a clean round number, so hiding a series changes the scale and the remaining lines redraw taller to use the freed vertical space.
- Render a small circular marker at every data point on every visible line, each carrying the series name, the x-axis label, and the raw value as data attributes.
- Build a clickable legend listing every series by name and color swatch; clicking a legend entry must toggle that series' visibility and trigger a full rescale/redraw, but must be prevented from hiding the very last remaining visible series.
- Implement hover behavior with a single delegated mousemove listener on the chart (not one listener per point) that detects the nearest point marker under the cursor and shows a tooltip with the series name, label, and exact value, positioned near the cursor.
- Add faint horizontal gridlines behind the data and x-axis labels below the chart, aligned to the same even spacing used for the point positions.`,
    },
  },
};

export default multiLineChart;
