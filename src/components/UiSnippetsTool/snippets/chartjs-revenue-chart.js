const chartjsRevenueChart = {
  id: 'chartjs-revenue-chart',
  title: 'Chart.js Gradient Revenue Chart',
  lastmod: '2026-08-02',
  category: 'charts',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js'],
  html: `<div class="crc-card">
  <div class="crc-top">
    <div>
      <span class="crc-tag">chart.js · scriptable gradient</span>
      <h2>Revenue</h2>
      <div class="crc-figure"><b id="crcTotal">$0</b><span class="crc-delta" id="crcDelta">+0%</span></div>
    </div>
    <div class="crc-ranges" id="crcRanges">
      <button class="crc-chip" data-range="6">6M</button>
      <button class="crc-chip is-on" data-range="12">12M</button>
    </div>
  </div>

  <div class="crc-canvas"><canvas id="crcChart"></canvas></div>

  <button class="crc-add" id="crcAdd">Add this month</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d1c;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.crc-card{width:min(620px,95vw);background:#111528;border:1px solid rgba(255,255,255,.09);border-radius:20px;padding:24px;box-shadow:0 30px 70px -34px rgba(0,0,0,.95)}

.crc-top{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:18px;flex-wrap:wrap}
.crc-tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#5eead4;background:rgba(94,234,212,.11);border:1px solid rgba(94,234,212,.28);padding:4px 10px;border-radius:99px;margin-bottom:10px}
.crc-top h2{font-size:15px;font-weight:600;color:#98a2c0}
.crc-figure{display:flex;align-items:baseline;gap:10px;margin-top:4px}
.crc-figure b{font-size:32px;font-weight:800;letter-spacing:-.025em;font-variant-numeric:tabular-nums}
.crc-delta{font-size:12.5px;font-weight:700;color:#34d399;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);padding:3px 9px;border-radius:99px}
.crc-delta.down{color:#fb7185;background:rgba(251,113,133,.12);border-color:rgba(251,113,133,.3)}

.crc-ranges{display:flex;gap:6px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);border-radius:11px;padding:4px}
.crc-chip{padding:7px 14px;border:none;border-radius:8px;background:transparent;color:#8f9ab8;font:600 12.5px system-ui;cursor:pointer;transition:background .16s,color .16s}
.crc-chip.is-on{background:rgba(94,234,212,.16);color:#a7f3e5}

.crc-canvas{height:260px;position:relative}

.crc-add{width:100%;margin-top:18px;padding:12px;border-radius:12px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.05);color:#dbe3fb;font:600 13px system-ui;cursor:pointer;transition:background .16s}
.crc-add:hover{background:rgba(255,255,255,.11)}`,

  js: `var MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
var FULL = [42, 48, 45, 58, 63, 61, 74, 82, 79, 95, 104, 118];
var range = 12;
var extra = 0;

var money = function (n) { return '$' + n.toLocaleString() + 'k'; };

function slice() {
  var vals = FULL.slice(-range);
  var labels = MONTHS.slice(-range);
  for (var i = 0; i < extra; i++) {
    vals = vals.concat([vals[vals.length - 1] + Math.round((Math.random() - 0.35) * 22)]);
    labels = labels.concat(['+' + (i + 1)]);
  }
  return { labels: labels, vals: vals };
}

// Chart.js calls scriptable options during layout, BEFORE chartArea exists on
// the very first pass — returning early avoids the classic "gradient is null" crash.
function areaGradient(ctx) {
  var chart = ctx.chart;
  var area = chart.chartArea;
  if (!area) return 'rgba(94,234,212,0.18)';
  var g = chart.ctx.createLinearGradient(0, area.top, 0, area.bottom);
  g.addColorStop(0, 'rgba(94,234,212,0.42)');
  g.addColorStop(0.55, 'rgba(56,189,248,0.14)');
  g.addColorStop(1, 'rgba(56,189,248,0)');
  return g;
}

var start = slice();

var chart = new Chart(document.getElementById('crcChart'), {
  type: 'line',
  data: {
    labels: start.labels,
    datasets: [{
      data: start.vals,
      borderColor: '#5eead4',
      borderWidth: 2.5,
      backgroundColor: areaGradient,
      fill: true,
      tension: 0.38,
      pointRadius: 0,
      pointHoverRadius: 6,
      pointHoverBackgroundColor: '#5eead4',
      pointHoverBorderColor: '#0a0d1c',
      pointHoverBorderWidth: 3
    }]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    // Without this the tooltip only fires when the cursor is near the line itself.
    interaction: { mode: 'index', intersect: false },
    animation: { duration: 700, easing: 'easeOutQuart' },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#0a0d1c',
        borderColor: 'rgba(255,255,255,.14)',
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        titleColor: '#8f9ab8',
        bodyColor: '#fff',
        bodyFont: { size: 15, weight: '700' },
        callbacks: { label: function (c) { return money(c.parsed.y); } }
      }
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: '#6b7595', font: { size: 11 } }
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(255,255,255,.055)' },
        border: { display: false },
        ticks: { color: '#6b7595', font: { size: 11 }, maxTicksLimit: 5, callback: function (v) { return '$' + v + 'k'; } }
      }
    }
  }
});

function refresh() {
  var d = slice();
  chart.data.labels = d.labels;
  chart.data.datasets[0].data = d.vals;
  // 'active' reuses the running animation config so bars/points glide to the
  // new values instead of the whole chart being torn down and redrawn.
  chart.update('active');

  var total = d.vals.reduce(function (a, b) { return a + b; }, 0);
  document.getElementById('crcTotal').textContent = money(total);

  var half = Math.floor(d.vals.length / 2);
  var older = d.vals.slice(0, half).reduce(function (a, b) { return a + b; }, 0) || 1;
  var newer = d.vals.slice(half).reduce(function (a, b) { return a + b; }, 0);
  var pct = Math.round(((newer - older) / older) * 100);
  var delta = document.getElementById('crcDelta');
  delta.textContent = (pct >= 0 ? '+' : '') + pct + '%';
  delta.classList.toggle('down', pct < 0);
}

refresh();

document.getElementById('crcRanges').addEventListener('click', function (e) {
  var chip = e.target.closest('.crc-chip');
  if (!chip) return;
  document.querySelectorAll('.crc-chip').forEach(function (c) { c.classList.remove('is-on'); });
  chip.classList.add('is-on');
  range = Number(chip.dataset.range);
  extra = 0;
  refresh();
});

document.getElementById('crcAdd').addEventListener('click', function () {
  extra++;
  refresh();
});`,

  seo: {
    title: 'Chart.js Gradient Revenue Chart — Animated Area Chart',
    description: 'A dark revenue area chart with a scriptable canvas gradient, index-mode tooltips and animated updates. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Chart.js Gradient Revenue Chart — Scriptable Options and Animated Updates',
      description: `Chart.js gets you a working chart in about ten lines. Getting one that looks like it belongs in a designed product takes a handful of specific options, and two of them are the source of nearly every Stack Overflow question about the library.

## The gradient that crashes on first render

A vertical gradient under an area line is the most requested Chart.js customization, and the naive version throws:

\`var g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom); // TypeError\`

The reason is ordering. A canvas gradient needs pixel coordinates, and the chart does not know its own plot area until it has laid out — but \`backgroundColor\` is read *during* that layout. On the first pass \`chart.chartArea\` is genuinely \`undefined\`.

The fix is to pass a **scriptable option** — a function rather than a value — and guard it:

\`if (!area) return 'rgba(94,234,212,0.18)';\`

Chart.js calls the function again once layout completes, so the flat fallback color is only ever used for a single frame. The same pattern applies to any option that needs to know the chart's geometry, and it also means the gradient **regenerates on resize automatically**, which a gradient created once at setup would not.

## interaction.mode, the option that fixes tooltips

Default Chart.js only shows a tooltip when the cursor is close to an actual data point. On a smooth line with \`pointRadius: 0\`, that means hovering feels broken — the user waves the mouse across the chart and nothing happens.

\`interaction: { mode: 'index', intersect: false }\`

\`intersect: false\` stops requiring a direct hit, and \`mode: 'index'\` selects whichever x-position the cursor is nearest. Together they turn the chart into a continuous readout: move anywhere along it and the tooltip tracks the nearest month. This single option does more for perceived quality than any styling.

Points are then hidden at rest (\`pointRadius: 0\`) and only appear on hover (\`pointHoverRadius: 6\`) with a background-colored border, which makes the hovered point read as punched out of the line rather than sitting on top of it.

## Updating without destroying

The most common mistake in dashboards is calling \`chart.destroy()\` and constructing a new chart whenever data changes. That throws away the animation state, so every update flashes.

\`chart.data.datasets[0].data = d.vals; chart.update('active');\`

Mutating the data in place and calling \`update()\` makes Chart.js **interpolate from current values to new ones**, so the line visibly glides. The \`'active'\` argument reuses the running animation configuration rather than replaying the initial one. Because the range toggle and the add-a-month button both route through one \`refresh()\` function, every update path animates identically and the summary figures can never disagree with the chart.

## Styling that gets out of the way

The defaults are built for standalone charts, not embedded panels. Four changes do most of the work:

- \`legend: { display: false }\` — a single series does not need a legend explaining it.
- \`grid: { display: false }\` on the x axis and a very faint \`rgba(255,255,255,.055)\` on the y — horizontal guides help read values; vertical ones are noise.
- \`border: { display: false }\` on both axes — the Chart.js 4 way to remove axis spines, which moved out of \`gridLines\` in v3.
- \`maxTicksLimit: 5\` — caps y-axis labels regardless of the value range, so the axis never crowds.

\`tension: 0.38\` curves the line. It is worth knowing this is a *smoothing* value with no relationship to the underlying data — high tension on volatile data invents peaks between points that were never measured. For revenue it is honest enough; for anything where exact values matter, keep it low.

## Sizing

\`maintainAspectRatio: false\` plus a fixed-height wrapper (\`.crc-canvas { height: 260px }\`) is the correct pattern for a chart inside a layout. Left on, Chart.js enforces its own aspect ratio and fights your container. The canvas needs a *positioned, sized* parent — sizing the canvas element directly does not work reliably.

## Reusing it

Replace \`FULL\` with your series and everything downstream follows, including the total and the period-over-period delta. For a sparkline-sized version, drop the axes and tooltip; for a dependency-free alternative, compare [area chart](/ui-snippets/area-chart/) or [realtime line chart](/ui-snippets/realtime-line-chart/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Chart.js CDN', text: 'Include the chart.umd build from the CDN panel — global Chart.' },
      { title: 'Paste HTML, CSS, and JS', text: 'A gradient area chart animates in with a live total and delta.' },
      { title: 'Hover anywhere', text: 'Index-mode tooltips track the nearest month without needing a direct hit.' },
      { title: 'Switch the range', text: '6M and 12M mutate the dataset and animate between them.' },
      { title: 'Add a month', text: 'New points glide in — the chart is updated, never destroyed.' },
      { title: 'Plug in your data', text: 'Replace the FULL array; total and delta derive from it.' },
    ] },
    features: [
      { title: 'Scriptable gradient fill', text: 'A function option that regenerates the gradient on every resize.' },
      { title: 'chartArea guard', text: 'Returns a fallback on the first layout pass instead of crashing.' },
      { title: 'Index-mode tooltips', text: 'intersect false means hovering anywhere reads the nearest month.' },
      { title: 'Punched-out hover points', text: 'Hidden at rest, revealed with a background-colored border.' },
      { title: 'Animated data updates', text: 'update("active") interpolates instead of tearing the chart down.' },
      { title: 'One refresh path', text: 'Range toggle and append share a function, so figures never drift.' },
      { title: 'Dashboard-grade styling', text: 'No legend, no vertical grid, no axis spines, capped tick count.' },
      { title: 'Container-driven sizing', text: 'maintainAspectRatio false with a fixed-height wrapper.' },
    ],
    useCases: [
      { title: 'SaaS revenue dashboards', text: 'The headline chart above a [metric card grid](/ui-snippets/metric-card-grid/).' },
      { title: 'Analytics panels', text: 'Traffic or conversion trends with period comparison.' },
      { title: 'Finance and billing pages', text: 'Spend over time with an honest period-over-period delta.' },
      { title: 'Admin overview screens', text: 'Pair with a [stats card](/ui-snippets/stats-card/) row.' },
      { title: 'Reporting exports', text: 'A styled chart that reads well in a PDF or screenshot.' },
      { title: 'Learning Chart.js', text: 'A reference for scriptable options and non-destructive updates.' },
      { icon: 'CODE', title: 'Related: Dumbbell Chart', desc: 'See the [Dumbbell Chart](/ui-snippets/dumbbell-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does creating a gradient throw an error on the first render?', a: 'A canvas gradient needs pixel coordinates from chart.chartArea, but backgroundColor is read during layout — before the chart knows its own plot area. On the first pass chartArea is undefined. Passing a scriptable function that returns a flat fallback color when chartArea is missing fixes it, and Chart.js calls the function again after layout so the gradient appears immediately.' },
      { q: 'Why does the tooltip only appear near the line by default?', a: 'Chart.js defaults to requiring the cursor to intersect an actual data point, which feels broken on a smooth line with hidden points. Setting interaction to { mode: "index", intersect: false } removes the hit requirement and selects the nearest x position instead, so hovering anywhere over the plot reads the nearest value.' },
      { q: 'Why update the chart instead of destroying and recreating it?', a: 'Destroying discards the animation state, so every data change flashes. Mutating chart.data in place and calling chart.update() makes Chart.js interpolate from the current values to the new ones, so the line glides. Passing "active" reuses the running animation configuration rather than replaying the initial entrance.' },
      { q: 'What does tension actually do, and is it safe?', a: 'It applies bezier smoothing between points. It is purely cosmetic and has no relationship to the underlying data, so high tension on volatile series invents visual peaks between measurements that never existed. It is fine for a smooth revenue trend, but keep it low or at zero wherever exact values matter.' },
      { q: 'Why is maintainAspectRatio set to false?', a: 'Left on, Chart.js enforces its own width-to-height ratio and fights whatever container it is in. Turning it off and giving the canvas a positioned parent with an explicit height lets the layout own the sizing. Setting dimensions on the canvas element directly does not work reliably.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'react-chartjs-2 and vue-chartjs wrap the lifecycle for you and accept the same data and options objects. With the vanilla build, create the chart in a mount effect against a canvas ref, keep the instance in a ref, and call chart.destroy() in cleanup or remounts leak canvases. Update by mutating the instance data and calling update() rather than recreating on every render.' },
    ],
    aiPrompt: {
      paragraph: `Two of the options in this chart account for most of the frustration people have with Chart.js, so it is worth having them explained properly. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain why chart.chartArea is undefined the first time the backgroundColor function runs, and what the sequence of layout and option evaluation actually is — then remove the guard clause to reproduce the crash. Ask why interaction: { mode: 'index', intersect: false } changes the hover experience so much on a line with pointRadius 0. Then ask what chart.update('active') does differently from destroying and reconstructing the chart, and what visual difference you would see. For optimization, ask whether regenerating the gradient on every scriptable call is wasteful and how you would memoize it against the chart area dimensions. To extend it: have it add a second dataset with its own gradient, add a vertical crosshair line on hover via a custom plugin, stream live data with a rolling window, or make tension configurable and explain the honesty trade-off. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a dark dashboard-style revenue area chart with Chart.js 4 (from a CDN, global Chart) in plain HTML, CSS, and JavaScript.

Requirements:
- Fill the area under the line with a vertical canvas gradient created as a SCRIPTABLE option (a function passed to backgroundColor, not a value). Inside it, read chart.chartArea and if it is undefined return a flat fallback color instead. Explain in a comment that Chart.js evaluates scriptable options during layout, before the chart knows its own plot area, so the first pass genuinely has no chartArea — and that using a function also means the gradient regenerates correctly on resize, which a gradient built once at setup would not.
- Set interaction: { mode: 'index', intersect: false } and explain why: by default Chart.js only shows a tooltip when the cursor intersects an actual point, which feels broken on a smooth line with pointRadius 0. Index mode with intersect off makes the tooltip track the nearest x position from anywhere in the plot.
- Hide points at rest with pointRadius 0 and reveal them on hover with pointHoverRadius plus a border in the card's background color, so the hovered point reads as punched out of the line.
- Style it as an embedded dashboard panel rather than a standalone chart: no legend, no vertical grid lines, a very faint horizontal grid, axis borders/spines removed (in Chart.js 4 this is the border option on each scale), a maxTicksLimit on the y axis, and currency-formatted tick and tooltip callbacks.
- Set maintainAspectRatio: false and give the canvas a parent with an explicit fixed height, explaining that otherwise Chart.js enforces its own aspect ratio and fights the container, and that sizing the canvas element directly is unreliable.
- Provide a 6M/12M range toggle and an "add this month" button. BOTH must go through one shared refresh function that mutates chart.data.labels and chart.data.datasets[0].data in place and calls chart.update('active') — never destroy and recreate the chart. Explain that mutate-and-update makes Chart.js interpolate from current to new values so the line glides, whereas recreating discards animation state and flashes.
- Have the same refresh function recompute a headline total and a period-over-period percentage delta from the visible data, toggling a positive/negative style on the delta pill, so the summary figures can never disagree with the chart.
- Use a tension around 0.38 for line smoothing, and note that tension is purely cosmetic with no relationship to the data, so it should be kept low wherever exact values matter.`,
    },
  },
};

export default chartjsRevenueChart;
