const groupedBarChart = {
  id: 'grouped-bar-chart',
  title: 'Grouped Bar Chart',
  lastmod: '2026-07-18',
  category: 'charts',
  html: `<div class="gb-card">
  <div class="gb-head"><h3>Revenue by quarter</h3></div>
  <div class="gb-legend" id="gbLegend"></div>
  <div class="gb-chart" id="gbChart"></div>
  <div class="gb-tip" id="gbTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;padding:32px 18px}

.gb-card{position:relative;background:#1e293b;border:1px solid #334155;border-radius:16px;padding:18px;width:100%;max-width:460px}
.gb-head h3{font-size:15px;font-weight:800;color:#f1f5f9}
.gb-legend{display:flex;gap:14px;margin:10px 0 16px;flex-wrap:wrap}
.gb-leg{display:flex;align-items:center;gap:6px;font-size:12px;color:#cbd5e1}
.gb-leg span{width:10px;height:10px;border-radius:3px}

.gb-chart{display:flex;align-items:flex-end;justify-content:space-around;gap:14px;height:200px;border-bottom:1px solid #334155;padding-bottom:0}
.gb-group{display:flex;flex-direction:column;align-items:center;gap:7px;flex:1;height:100%;justify-content:flex-end}
.gb-bars{display:flex;align-items:flex-end;gap:4px;height:100%;width:100%;justify-content:center}
.gb-bar{width:18px;border-radius:5px 5px 0 0;transition:height .6s cubic-bezier(.22,1,.36,1),filter .12s;cursor:pointer;align-self:flex-end}
.gb-bar:hover{filter:brightness(1.18)}
.gb-label{font-size:11.5px;font-weight:700;color:#94a3b8}

.gb-tip{position:absolute;transform:translate(-50%,-100%);background:#0b1120;border:1px solid #334155;border-radius:8px;padding:6px 10px;font-size:11.5px;color:#f1f5f9;pointer-events:none;white-space:nowrap;z-index:5;box-shadow:0 8px 20px rgba(0,0,0,.4)}`,

  js: `var SERIES = [ { name:'2024', color:'#6366f1' }, { name:'2025', color:'#22d3ee' }, { name:'2026', color:'#f59e0b' } ];
var GROUPS = [
  { label:'Q1', values:[42,55,61] },
  { label:'Q2', values:[38,49,72] },
  { label:'Q3', values:[51,47,68] },
  { label:'Q4', values:[60,66,80] }
];
var chart = document.getElementById('gbChart');
var tip = document.getElementById('gbTip');
var card = document.querySelector('.gb-card');
var max = 0;
GROUPS.forEach(function (g) { g.values.forEach(function (v) { if (v > max) max = v; }); });
max = Math.ceil(max / 10) * 10;

GROUPS.forEach(function (g) {
  var group = document.createElement('div');
  group.className = 'gb-group';
  var bars = document.createElement('div');
  bars.className = 'gb-bars';
  g.values.forEach(function (v, i) {
    var bar = document.createElement('div');
    bar.className = 'gb-bar';
    bar.style.background = SERIES[i].color;
    bar.style.height = '0%';
    bar.addEventListener('mouseenter', function (e) { showTip(e, g.label + ' · ' + SERIES[i].name + ': ' + v + 'k'); });
    bar.addEventListener('mousemove', function (e) { moveTip(e); });
    bar.addEventListener('mouseleave', function () { tip.hidden = true; });
    bars.appendChild(bar);
    // animate in
    requestAnimationFrame(function () { requestAnimationFrame(function () { bar.style.height = (v / max * 100) + '%'; }); });
  });
  var label = document.createElement('div');
  label.className = 'gb-label';
  label.textContent = g.label;
  group.appendChild(bars);
  group.appendChild(label);
  chart.appendChild(group);
});

function showTip(e, text) { tip.textContent = text; tip.hidden = false; moveTip(e); }
function moveTip(e) {
  var r = card.getBoundingClientRect();
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top - 10) + 'px';
}

document.getElementById('gbLegend').innerHTML = SERIES.map(function (s) { return '<span class="gb-leg"><span style="background:' + s.color + '"></span>' + s.name + '</span>'; }).join('');`,

  seo: {
    title: 'Grouped Bar Chart — Clustered Multi-Series Bars',
    description: `A grouped (clustered) bar chart in HTML/CSS: side-by-side series per category, animated bars, legend and tooltips. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Grouped Bar Chart — Clustered Multi-Series Bars with Tooltips',
      description: `A grouped bar chart (also called a clustered bar chart) places several series side by side within each category, so you can compare both across categories and between series at a glance — sales across years per quarter, scores per metric, and the like. This snippet builds one with pure HTML and CSS bars, animated growth, a legend, and tooltips, in plain HTML, CSS, and vanilla JavaScript — no SVG, no chart library.

**Flexbox layout, no coordinate math**

Each category is a flex column; inside it the series bars sit in a row, bottom-aligned. Bar heights are simple percentages of the chart height (\`value / max\`), so there's no axis or pixel math — the browser's layout engine does the work, and the chart is naturally responsive. The y-scale rounds the maximum up to a clean number so the tallest bar doesn't touch the top.

**Consistent color encoding**

Each series gets one colour used for its bar in every group, and the legend ties colours to series names. This is the whole point of a grouped chart: the eye follows a colour across categories to read a trend ("the amber series climbs every quarter") while still comparing the cluster within each category.

**Animated growth**

Bars start at zero height and animate up to their value on load via a CSS transition triggered on the next frame — a small touch that draws attention to the data and reads as "this just rendered." A subtle brightness lift on hover gives per-bar feedback.

**Cursor-following tooltips**

Hovering any bar shows a tooltip with the category, series, and value, positioned relative to the card and following the pointer. Because tooltips are driven by simple mouse coordinates rather than chart geometry, they're robust at any size and easy to extend with more detail.

**Data-driven and portable**

Series are defined once (\`name\`, \`color\`) and groups are \`{ label, values }\`, so adding a series or a category is a data edit — the bars, legend, scale, and tooltips all derive from it. With no SVG or dependency, it's a clean, lightweight reference for the clustered-bar pattern that's easy to drop into any dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A grouped bar chart renders with three series across four quarters.` },
      { title: 'Use your data', text: `Edit SERIES (name + color) and GROUPS ({ label, values }).` },
      { title: 'Watch it animate', text: `Bars grow from zero to their value on load.` },
      { title: 'Hover a bar', text: `A tooltip shows the category, series, and value.` },
      { title: 'Read by color', text: `Follow a series color across groups to spot trends.` },
      { title: 'Restyle', text: `Change colors, bar width, gap, or chart height.` },
    ] },
    features: [
      { title: 'Clustered series', text: `Multiple series side by side within each category.` },
      { title: 'Flexbox heights', text: `Percentage heights — no SVG or coordinate math.` },
      { title: 'Clean y-scale', text: `Max rounds up so the tallest bar fits neatly.` },
      { title: 'Color-coded legend', text: `Each series keeps one color across all groups.` },
      { title: 'Animated growth', text: `Bars rise from zero on load via CSS transition.` },
      { title: 'Hover tooltips', text: `Cursor-following tip with category, series, and value.` },
      { title: 'Responsive', text: `The browser's layout makes it fluid by default.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no chart dependency.` },
    ],
    useCases: [
      { title: 'Year-over-year comparison', text: `Compare quarters across years in a [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'A/B and variant results', text: `Show metrics per variant side by side.` },
      { title: 'Survey breakdowns', text: `Compare answers across segments beside a [bar chart](/ui-snippets/bar-chart/).` },
      { title: 'Team or region performance', text: `Cluster KPIs per group on a dashboard.` },
      { title: 'Budget vs actual', text: `Pair planned and actual bars per category.` },
      { title: 'Learning CSS charts', text: `A reference for flexbox bars and tooltips.` },
      { icon: 'CODE', title: 'Related: Range Area Chart', desc: 'See the [Range Area Chart](/ui-snippets/range-area-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why build bars in CSS instead of SVG?', a: `For a grouped bar chart, CSS flexbox is simpler and naturally responsive: each bar is a div whose height is a percentage of the container, so there is no viewBox, no coordinate mapping, and no manual resize handling. SVG shines for curves, arcs, and precise axes; for rectangular bars, letting the layout engine size them keeps the code short and fluid.` },
      { q: 'How is the y-scale determined?', a: `The script finds the maximum value across all series and rounds it up to the next ten, then every bar's height is value divided by that maximum, as a percentage. Rounding up gives headroom so the tallest bar does not touch the top edge and the proportions stay readable. You can change the rounding granularity to suit your data range.` },
      { q: 'How do grouped bars help comparison?', a: `Grouping places each series next to the others within a category, so you compare series within a group directly, while consistent per-series colors let you track one series across categories to see its trend. It answers two questions at once — "which is biggest here?" and "how does this series change over time?" — which a single-series or stacked chart cannot.` },
      { q: 'How do I add another series or category?', a: `Add an entry to SERIES (a name and color) and a matching value to each group's values array; or add a group with its own label and values. The legend, scale, bars, and tooltips all derive from these arrays, so no other code changes. Keep each group's values array the same length as SERIES.` },
      { q: 'How do I use this grouped bar chart in React, Vue, or Angular?', a: `Map your series and groups to elements in JSX/templates, setting each bar's height from value/max as an inline style. Trigger the grow animation with a mounted effect or a CSS class toggled after render. Track hover state for the tooltip. Recharts or Chart.js can replace the rendering, but the data shape stays the same. Tailwind users apply heights and colors with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to trace the layout math by hand to understand this chart. Paste the HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the max value gets rounded up to set the y-scale, and why bar heights are expressed as percentages instead of pixel values computed in JavaScript. The same assistant is useful for optimizing it — ask whether recomputing every bar's height on window resize would be cheaper than the current fixed-at-render approach, or whether the tooltip's mousemove listener needs throttling for a chart with many more bars. It is just as handy for extending the effect: ask it to add a stacked-total mode alongside the grouped view, animate the legend to fade groups in and out on click, or drive the SERIES and GROUPS arrays from a live fetch call. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grouped (clustered) bar chart in plain HTML, CSS, and JavaScript using only flexbox for layout — no SVG, no canvas, no charting library.

Requirements:
- Two data structures: an array of series objects (name, color) and an array of group objects (label, values array, one value per series, in series order).
- Compute the maximum value across every group's values array, then round it up to the next multiple of ten to use as the chart's scale ceiling.
- Render one flex column per group, each containing a row of bars (one per series, bottom-aligned, using flexbox rather than absolute positioning), with every bar's height set as a CSS percentage of the container (value divided by the rounded max), not a pixel value computed from container measurements.
- Each bar must animate its height from 0% up to its target percentage after insertion, triggered via a double requestAnimationFrame so the browser commits the zero-height state before the transition starts.
- Generate a legend above the chart from the series array, pairing each series' name with a small colored swatch in that series' color.
- On mouseenter and mousemove over any bar, show a tooltip positioned relative to the chart card's bounding rect (not the viewport) that follows the cursor and displays the group label, series name, and value; hide it on mouseleave.
- Everything must be data-driven: adding a series (with a new color) or a group (with a matching-length values array) should require no changes outside the two data arrays.`,
    },
  },
};

export default groupedBarChart;
