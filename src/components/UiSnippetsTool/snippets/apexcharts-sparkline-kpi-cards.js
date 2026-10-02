const apexchartsSparklineKpiCards = {
  id: 'apexcharts-sparkline-kpi-cards',
  title: 'ApexCharts Sparkline KPI Cards',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="asp-wrap">
  <div class="asp-top">
    <div class="asp-title">Store overview</div>
    <div class="asp-live"><span class="asp-dot"></span>Live · updates every 2s</div>
  </div>
  <div class="asp-grid" id="aspGrid"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.asp-wrap{width:100%;max-width:980px}
.asp-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.asp-title{font-size:16px;font-weight:700;color:#0f172a}
.asp-live{font-size:12px;color:#64748b;display:flex;align-items:center;gap:6px}
.asp-dot{width:8px;height:8px;border-radius:50%;background:#22c55e;box-shadow:0 0 0 0 rgba(34,197,94,.5);animation:aspPulse 2s infinite}
@keyframes aspPulse{70%{box-shadow:0 0 0 7px rgba(34,197,94,0)}100%{box-shadow:0 0 0 0 rgba(34,197,94,0)}}
.asp-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px}
.asp-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:16px 16px 6px;box-shadow:0 1px 4px rgba(15,23,42,.04)}
.asp-label{font-size:12px;font-weight:600;color:#64748b}
.asp-row{display:flex;align-items:baseline;justify-content:space-between;gap:8px;margin-top:4px}
.asp-value{font-size:24px;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}
.asp-delta{font-size:12px;font-weight:700;padding:2px 7px;border-radius:999px}
.asp-delta.up{background:#dcfce7;color:#15803d}
.asp-delta.down{background:#fee2e2;color:#b91c1c}
.asp-spark{margin:0 -6px}
@media (prefers-reduced-motion:reduce){.asp-dot{animation:none}}`,

  js: `var KPIS = [
  { key: 'rev',   label: 'Revenue',         color: '#6366f1', type: 'area', fmt: function (v) { return '$' + v.toLocaleString('en-US'); }, base: 4200, step: 180, goodUp: true },
  { key: 'ord',   label: 'Orders',          color: '#0ea5e9', type: 'bar',  fmt: function (v) { return v.toLocaleString('en-US'); },       base: 62,   step: 7,   goodUp: true },
  { key: 'cr',    label: 'Conversion rate', color: '#22c55e', type: 'line', fmt: function (v) { return v.toFixed(2) + '%'; },               base: 3.1,  step: 0.18, goodUp: true },
  { key: 'refund',label: 'Refund rate',     color: '#f43f5e', type: 'line', fmt: function (v) { return v.toFixed(2) + '%'; },               base: 1.4,  step: 0.12, goodUp: false },
];
var POINTS = 20;

function walk(base, step) {
  var arr = [base];
  for (var i = 1; i < POINTS; i++) arr.push(Math.max(0, arr[i - 1] + (Math.random() - 0.45) * step));
  return arr;
}

var grid = document.getElementById('aspGrid');
// Build every card BEFORE creating any chart. A chart measures its
// container once when it renders; if the grid still held one card at that
// moment, the first sparkline would size itself to the full row width.
KPIS.forEach(function (k) {
  k.data = walk(k.base, k.step);
  grid.insertAdjacentHTML('beforeend',
    '<div class="asp-card"><div class="asp-label">' + k.label + '</div>' +
    '<div class="asp-row"><div class="asp-value" id="v-' + k.key + '"></div><div class="asp-delta" id="d-' + k.key + '"></div></div>' +
    '<div class="asp-spark" id="s-' + k.key + '"></div></div>');
});

KPIS.forEach(function (k) {
  // sparkline.enabled strips axes, grid, legend and padding: the chart
  // becomes a pure trend line sized to its card.
  k.chart = new ApexCharts(document.getElementById('s-' + k.key), {
    chart: { type: k.type, height: 64, sparkline: { enabled: true }, animations: { enabled: true, speed: 400, dynamicAnimation: { speed: 400 } } },
    series: [{ name: k.label, data: k.data.map(round) }],
    colors: [k.color],
    stroke: { width: k.type === 'bar' ? 0 : 2, curve: 'smooth' },
    fill: k.type === 'area' ? { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0 } } : { opacity: 1 },
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 2 } },
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: function () { return ''; } }, formatter: function (v) { return k.fmt(v); } },
      marker: { show: false },
    },
  });
  k.chart.render();
  paint(k);
});

function round(v) { return Math.round(v * 100) / 100; }

function paint(k) {
  var last = k.data[k.data.length - 1];
  var first = k.data[0];
  var change = first ? ((last - first) / first) * 100 : 0;
  var good = k.goodUp ? change >= 0 : change <= 0;
  document.getElementById('v-' + k.key).textContent = k.fmt(k.key === 'rev' || k.key === 'ord' ? Math.round(last) : last);
  var el = document.getElementById('d-' + k.key);
  el.textContent = (change >= 0 ? '▲ ' : '▼ ') + Math.abs(change).toFixed(1) + '%';
  // Colour by whether the move is GOOD, not by direction: a rising
  // refund rate is red even though the arrow points up.
  el.className = 'asp-delta ' + (good ? 'up' : 'down');
}

// Simulated live feed: drop the oldest point, append a new one.
setInterval(function () {
  KPIS.forEach(function (k) {
    var next = Math.max(0, k.data[k.data.length - 1] + (Math.random() - 0.45) * k.step);
    k.data = k.data.slice(1).concat(next);
    k.chart.updateSeries([{ data: k.data.map(round) }]);
    paint(k);
  });
}, 2000);`,

  seo: {
    title: 'ApexCharts Sparkline KPI Cards — Free Live Dashboard Snippet',
    description: `Four KPI cards with ApexCharts sparklines (area, bar and line), live-updating values and change badges coloured by whether the move is good or bad, not just its direction. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Sparkline KPI Cards — Numbers With Their Trend Attached',
      description: `A KPI number on its own hides the most important thing about it: which way it has been going. A sparkline — a tiny chart with no axes — puts the trend right under the number without taking over the card. This snippet builds a row of four KPI cards, each with a different sparkline style, updating live.

**sparkline.enabled does the heavy lifting**

Setting \`chart.sparkline.enabled: true\` removes axes, grid lines, the legend, the toolbar and chart padding in one go. The chart becomes a trend graphic that fills its container, which is exactly what a card needs. Everything else is regular ApexCharts, so each card can use a different \`type\`: a gradient area for revenue, bars for orders, and lines for rates.

**Tooltips trimmed for small charts**

The default tooltip shows the category and series name, which is noise on a 64px chart. The snippet hides the x value, the marker and the series title, leaving only the formatted value.

**Colour by meaning, not direction**

Each KPI carries a \`goodUp\` flag. Revenue going up is green; refund rate going up is red, even though its arrow also points up. This is the detail most dashboards get wrong — direction and desirability are different things.

**A rolling window**

Every two seconds each KPI drops its oldest point and appends a new one, then calls \`updateSeries\`. The change badge compares the newest value to the oldest in the window, so it always describes the visible trend.

**Build the cards before the charts**

A chart measures its container once, when it renders. If each card were added and charted in the same loop iteration, the first sparkline would render while it was the only card in an auto-fit grid — full row width — and keep that size after the other cards arrived. The snippet inserts all four cards first and creates the charts in a second pass.

**Responsive grid**

Cards sit in a \`repeat(auto-fit, minmax(210px, 1fr))\` grid, so the row becomes two columns or one on narrow screens without media queries. The live-indicator pulse respects \`prefers-reduced-motion\`.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `Four KPI cards render and start updating every two seconds.` },
      { title: 'Hover a sparkline', text: `A compact tooltip shows only the value at that point.` },
      { title: 'Read the badges', text: `Green means the move is good for that metric; red means it isn't.` },
      { title: 'Define your KPIs', text: `Edit KPIS: label, colour, chart type, formatter and goodUp.` },
      { title: 'Connect real data', text: `Replace the setInterval simulation with your API or WebSocket.` },
    ] },
    features: [
      { title: 'True sparklines', text: `Axes, grid and padding removed with sparkline.enabled.` },
      { title: 'Mixed sparkline styles', text: `Area, bar and line types per card.` },
      { title: 'Minimal tooltips', text: `Value only, no labels or markers.` },
      { title: 'Good/bad colouring', text: `goodUp decides green or red, not the arrow.` },
      { title: 'Rolling live window', text: `Oldest point out, newest in, animated.` },
      { title: 'Window-based change', text: `Badge compares the first and last visible points.` },
      { title: 'Auto-fit grid', text: `Four, two or one column without media queries.` },
      { title: 'Reduced-motion aware', text: `The live pulse stops for users who ask for less motion.` },
    ],
    useCases: [
      { title: 'SaaS and store dashboards', text: 'Put a summary row of KPI cards above your detailed charts. Each shows the number, a change badge and a tiny trend line, so direction is visible without opening a report.' },
      { title: 'Admin panels at a glance', text: 'Surface traffic, signups and errors together. The `goodUp` flag colours a rise in errors red and a rise in signups green, so colour reflects whether a move is good, not just its direction.' },
      { title: 'Trading and crypto tiles', text: 'Show price tiles with recent movement. Area, bar and line sparkline styles can be mixed per card, so each metric gets the representation that suits it best.' },
      { title: 'Operations monitoring', text: 'Track latency, error rate and throughput in compact tiles. Sparkline tooltips show only the value, with no labels or markers cluttering a small card.' },
      { title: 'Reports and emails', text: 'Use the same tiny charts in exported reports, where a sparkline with no axes, grid or padding fits neatly beside a headline number.' },
      { icon: 'CODE', title: 'Related: Sparkline Chart (vanilla)', desc: 'A no-library version: [Sparkline Chart](/ui-snippets/sparkline-chart/).' },
      { icon: 'CODE', title: 'Related: ApexCharts Mixed Bar and Line', desc: 'Put the detail chart below with [ApexCharts Mixed Bar and Line Chart with Dual Y-Axes](/ui-snippets/apexcharts-mixed-bar-line-dual-axis/).' },
    ],
    faqs: [
      { q: 'How do I make a sparkline in ApexCharts?', a: `Set chart.sparkline.enabled to true. It hides axes, grid, legend and toolbar and removes padding, leaving a compact trend chart that fills its container. It works with line, area and bar types.` },
      { q: 'How do I simplify the sparkline tooltip?', a: `Set tooltip.x.show to false, tooltip.marker.show to false, and return an empty string from tooltip.y.title.formatter. Keep a y.formatter so the value is formatted in the right units.` },
      { q: 'Why is a rising refund rate shown in red?', a: `Because an increase is bad for that metric. Each KPI has a goodUp flag, and the badge colour reflects whether the change is desirable, while the arrow still shows the direction.` },
      { q: 'How do I stream live data into the cards?', a: `Keep a fixed-length array per KPI. On each new value, drop the first element, push the new one, and call chart.updateSeries with the new data. ApexCharts animates the transition.` },
      { q: 'Is it expensive to render many sparklines?', a: `Each sparkline is a separate chart instance with its own SVG. A handful of cards is fine; for dozens of rows, lower the update frequency, disable animations, or draw simple SVG paths yourself.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain what sparkline.enabled removes and why the badge colour depends on goodUp. You can then ask it to connect the cards to a WebSocket feed, add a comparison against the same period last week, or pause updates while the tab is hidden with the Page Visibility API. Ask it to review how the change percentage should behave when the first value in the window is zero.`,
      prompt: `Build a row of four live KPI cards with ApexCharts sparklines (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- KPIs: revenue (gradient area sparkline), orders (bar sparkline), conversion rate and refund rate (line sparklines), each with its own colour and number formatter.
- Enable ApexCharts sparkline mode so charts have no axes, grid or padding, and trim tooltips to show only the formatted value.
- Show the latest value and a change badge comparing the newest and oldest points in the window.
- Colour the badge green or red by whether the change is good for that metric (a rising refund rate is red), while the arrow shows direction.
- Every two seconds, drop each KPI's oldest point, append a new random-walk point and update the chart and badge.
- Lay cards out in an auto-fit CSS grid and add a pulsing live indicator that respects prefers-reduced-motion.`,
    },
  },
};

export default apexchartsSparklineKpiCards;
