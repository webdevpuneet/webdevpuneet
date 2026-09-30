const apexchartsBrushRangeNavigator = {
  id: 'apexcharts-brush-range-navigator',
  title: 'ApexCharts Brush Chart with Range Navigator',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="abr-wrap">
  <div class="abr-card">
    <div class="abr-head">
      <div>
        <div class="abr-title">Daily Active Users</div>
        <div class="abr-sub">Drag or resize the highlighted window in the lower chart to zoom the upper one</div>
      </div>
      <div class="abr-stat"><span id="abrAvg">—</span><small>avg in view</small></div>
    </div>
    <div id="abrMain"></div>
    <div id="abrBrush"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.abr-wrap{width:100%;max-width:780px}
.abr-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px 10px;box-shadow:0 1px 8px rgba(15,23,42,.06)}
.abr-head{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;margin-bottom:4px}
.abr-title{font-size:15px;font-weight:700;color:#0f172a}
.abr-sub{font-size:12px;color:#64748b;margin-top:3px;max-width:420px}
.abr-stat{text-align:right;font-size:22px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}
.abr-stat small{display:block;font-size:11px;font-weight:600;color:#94a3b8}`,

  js: `// 180 days of synthetic data: a slow upward trend, a weekly rhythm (weekends
// dip) and some noise. Timestamps are real milliseconds so the x-axis is a
// true datetime axis.
var DAY = 86400000;
var start = Date.UTC(2026, 2, 1);
var data = [];
var seed = 7;
function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }
for (var i = 0; i < 180; i++) {
  var t = start + i * DAY;
  var dow = new Date(t).getUTCDay();
  var weekend = dow === 0 || dow === 6 ? 0.78 : 1;
  var v = (4200 + i * 14) * weekend + (rand() - 0.5) * 420;
  data.push([t, Math.round(v)]);
}

var avgEl = document.getElementById('abrAvg');
function updateAverage(min, max) {
  var inView = data.filter(function (p) { return p[0] >= min && p[0] <= max; });
  if (!inView.length) { avgEl.textContent = '—'; return; }
  var sum = inView.reduce(function (s, p) { return s + p[1]; }, 0);
  avgEl.textContent = Math.round(sum / inView.length).toLocaleString('en-US');
}

// The main chart needs an id: the brush chart targets it by that id.
var main = new ApexCharts(document.getElementById('abrMain'), {
  chart: {
    id: 'abr-main',
    type: 'area',
    height: 260,
    toolbar: { show: false },
    zoom: { enabled: false },
    fontFamily: 'system-ui, sans-serif',
    events: {
      // Fires when the brush moves the main chart's visible x-range.
      zoomed: function (ctx, range) { updateAverage(range.xaxis.min, range.xaxis.max); },
    },
  },
  series: [{ name: 'Active users', data: data }],
  colors: ['#0ea5e9'],
  stroke: { width: 2, curve: 'monotoneCubic' },
  fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0.02 } },
  dataLabels: { enabled: false },
  xaxis: { type: 'datetime' },
  yaxis: { labels: { formatter: function (v) { return (v / 1000).toFixed(1) + 'k'; } } },
  tooltip: { x: { format: 'ddd dd MMM yyyy' } },
  grid: { borderColor: '#eef2f7', strokeDashArray: 4 },
});

var initialMin = start + 120 * DAY;
var initialMax = start + 179 * DAY;

var brush = new ApexCharts(document.getElementById('abrBrush'), {
  chart: {
    id: 'abr-brush',
    type: 'area',
    height: 110,
    // brush.target is the id of the chart to control. autoScaleYaxis
    // re-fits the main chart's y-axis to the data inside the window.
    brush: { enabled: true, target: 'abr-main', autoScaleYaxis: true },
    selection: {
      enabled: true,
      xaxis: { min: initialMin, max: initialMax },
      fill: { color: '#0ea5e9', opacity: 0.12 },
      stroke: { color: '#0284c7', width: 1, dashArray: 0 },
    },
    fontFamily: 'system-ui, sans-serif',
  },
  series: [{ name: 'Active users', data: data }],
  colors: ['#94a3b8'],
  stroke: { width: 1 },
  fill: { type: 'solid', opacity: 0.25 },
  dataLabels: { enabled: false },
  xaxis: { type: 'datetime', tooltip: { enabled: false } },
  yaxis: { show: false, tickAmount: 2 },
  grid: { show: false },
  tooltip: { enabled: false },
});

main.render().then(function () { return brush.render(); }).then(function () {
  updateAverage(initialMin, initialMax);
});`,

  seo: {
    title: 'ApexCharts Brush Chart with Range Navigator — Free Snippet',
    description: `A two-chart ApexCharts setup: drag a window across a small overview chart to zoom a detailed area chart above it, with the y-axis auto-rescaling and a live average of the visible range. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Brush Chart — Overview Below, Detail Above',
      description: `Six months of daily data is too much to read at full resolution and too little to aggregate away. A brush chart solves this with two views of the same series: a small overview that always shows everything, and a larger detail chart that shows only the window selected in the overview. This is the pattern behind stock charts, analytics range pickers and log explorers.

**Two charts, linked by id**

The detail chart is created with \`chart.id: 'abr-main'\`. The overview enables \`chart.brush\` and sets \`target: 'abr-main'\`. That id is the only link between them — ApexCharts looks the target up in its own registry, so the two charts can live anywhere on the page.

**The selection is the brush**

The overview's \`chart.selection\` sets the initial window (the last 60 days here) and styles the draggable highlight. Dragging moves it; dragging its edges resizes it. Each change updates the detail chart's visible x-range.

**autoScaleYaxis matters more than it looks**

Without \`autoScaleYaxis: true\`, the detail chart keeps the y-range of the full dataset. When you zoom into a quiet period, the line hugs the middle of the chart and variation disappears. With it enabled, the y-axis is re-fitted to the data inside the window.

**Reacting to the window**

The detail chart's \`events.zoomed\` callback receives the new \`xaxis.min\` and \`xaxis.max\`. The snippet uses them to compute the average of the visible points, a small example of keeping other UI in sync with the brush.

**Rendering order**

The overview is rendered after the detail chart resolves its \`render()\` promise, so the target already exists when the brush tries to control it.

**Synthetic data with a real shape**

The data generator uses a seeded random function, a slow trend and a weekend dip, so the chart looks like a real product metric and renders identically every time.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `A detail area chart renders above a compact overview chart.` },
      { title: 'Drag the window', text: `Move the shaded selection in the overview to pan the detail chart.` },
      { title: 'Resize the window', text: `Drag its edges to zoom in or out; the y-axis rescales to fit.` },
      { title: 'Watch the average', text: `The figure in the header recalculates for the visible range.` },
      { title: 'Use your data', text: `Replace the generated [timestamp, value] pairs with your own series.` },
    ] },
    features: [
      { title: 'Linked brush and target', text: `The overview controls the detail chart through chart.id.` },
      { title: 'Draggable, resizable window', text: `A styled selection sets the visible range.` },
      { title: 'Auto-scaling y-axis', text: `autoScaleYaxis keeps variation visible when zoomed in.` },
      { title: 'Datetime axis', text: `Real timestamps with formatted tooltips.` },
      { title: 'Live summary stat', text: `The zoomed event keeps a header average in sync.` },
      { title: 'Deterministic sample data', text: `A seeded generator renders identically every load.` },
      { title: 'Gradient area fill', text: `The detail chart fades from the line to the baseline.` },
      { title: 'Minimal overview', text: `No grid, labels or tooltip, so it reads as a control.` },
    ],
    useCases: [
      { title: 'Product analytics', text: `Explore months of active-user or signup data.` },
      { title: 'Finance and trading UIs', text: `The standard overview-plus-detail pattern for price history.` },
      { title: 'Monitoring dashboards', text: `Zoom into an incident window within a long metric history.` },
      { title: 'IoT and sensor data', text: `Navigate dense time series without downsampling.` },
      { title: 'Learning ApexCharts', text: `A minimal reference for brush, selection and zoomed events.` },
      { icon: 'CODE', title: 'Related: ECharts Revenue Line with Zoom Brush', desc: 'The same idea built with ECharts dataZoom: [ECharts Animated Revenue Line with Zoom Brush](/ui-snippets/echarts-revenue-line-zoom-brush/).' },
      { icon: 'CODE', title: 'Related: ApexCharts Annotations', desc: 'Mark events on a timeline with [ApexCharts Line Chart with Annotations and Target Lines](/ui-snippets/apexcharts-annotations-target-lines/).' },
    ],
    faqs: [
      { q: 'How does an ApexCharts brush chart work?', a: `Two charts render the same series. The detail chart gets a chart.id; the overview chart enables chart.brush with target set to that id, and enables chart.selection to draw a draggable window. Moving or resizing the window sets the detail chart's visible x-range.` },
      { q: 'What does autoScaleYaxis do?', a: `It recalculates the detail chart's y-axis from the points inside the selected window. Without it, the y-axis stays scaled to the whole dataset, so zooming into a narrow range shows a nearly flat line.` },
      { q: 'How do I read the selected range?', a: `Listen to the target chart's zoomed event (or the brush chart's brushScrolled or selection events). The callback receives an object with xaxis.min and xaxis.max as timestamps, which you can use to filter data or update other components.` },
      { q: 'Why render the overview after the main chart?', a: `The brush looks up its target chart by id. Rendering the target first, and only then the brush, guarantees the target exists when the brush applies its initial selection.` },
      { q: 'Can I use this with react-apexcharts?', a: `Yes. Render two Chart components with the same series. Give the first options.chart.id and the second options.chart.brush.target set to that id, plus a selection range. The linking works the same way because it is based on ids, not DOM elements.` },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant like Claude and ask it to walk through how the brush chart finds its target, and why autoScaleYaxis changes what you can see when zoomed in. It can help you extend the pattern: preset buttons (7D, 30D, 90D) that set the brush selection programmatically, a second series such as signups on the detail chart only, or URL parameters that restore a shared range. Ask it how to keep the overview readable when the series has tens of thousands of points.`,
      prompt: `Build an overview-plus-detail brush chart with ApexCharts (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Generate 180 days of daily values with a slow upward trend, a weekend dip and deterministic seeded noise, stored as [timestamp, value] pairs on a datetime x-axis.
- Render a detail area chart with a gradient fill, smooth line, formatted date tooltips and a y-axis in thousands.
- Render a compact overview chart below it that acts as a brush targeting the detail chart by id, with a styled draggable and resizable selection initially covering the last 60 days.
- Re-fit the detail chart's y-axis to the data inside the selected window.
- Show the average value of the currently visible range in the card header and update it whenever the window changes.
- Hide grid lines, y-axis labels and tooltips on the overview so it reads as a control rather than a second chart.`,
    },
  },
};

export default apexchartsBrushRangeNavigator;
