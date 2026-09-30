const bulletChart = {
  id: 'bullet-chart',
  title: 'Bullet Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="blt-card">
  <h3>Q3 KPIs vs. target</h3>
  <div class="blt-rows" id="bltRows"></div>
  <div class="blt-key">
    <span><i class="blt-k1"></i>Poor</span>
    <span><i class="blt-k2"></i>OK</span>
    <span><i class="blt-k3"></i>Good</span>
    <span><i class="blt-kt"></i>Target</span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.blt-card{background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.blt-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:18px}

.blt-rows{display:flex;flex-direction:column;gap:18px}
.blt-row{display:grid;grid-template-columns:84px 1fr;align-items:center;gap:12px}
.blt-name{font-size:12.5px;font-weight:700;color:#334155}
.blt-name small{display:block;font-size:10.5px;font-weight:600;color:#94a3b8}

.blt-track{position:relative;height:26px;border-radius:6px;overflow:hidden;display:flex}
.blt-range{height:100%}
.blt-measure{position:absolute;left:0;top:50%;transform:translateY(-50%);height:9px;border-radius:5px;background:#0f172a;width:0;transition:width .8s cubic-bezier(.22,1,.36,1)}
.blt-target{position:absolute;top:3px;bottom:3px;width:3px;background:#ef4444;border-radius:2px}

.blt-key{display:flex;flex-wrap:wrap;gap:14px;margin-top:20px;padding-top:14px;border-top:1px solid #f1f5f9;font-size:11px;font-weight:600;color:#64748b}
.blt-key span{display:flex;align-items:center;gap:5px}
.blt-key i{width:11px;height:11px;border-radius:3px;display:inline-block}
.blt-k1{background:#fee2e2}.blt-k2{background:#fef3c7}.blt-k3{background:#dcfce7}
.blt-kt{background:#ef4444;width:3px!important;height:13px!important;border-radius:2px}`,

  js: `// Each KPI: value (actual), target, max (axis), and qualitative band thresholds.
var KPIS = [
  { name: 'Revenue', unit: '$k', value: 268, target: 250, max: 320, bands: [150, 220] },
  { name: 'Signups', unit: '', value: 1840, target: 2000, max: 2400, bands: [1200, 1800] },
  { name: 'NPS', unit: '', value: 47, target: 40, max: 60, bands: [20, 35] },
  { name: 'Churn', unit: '%', value: 4.2, target: 3, max: 8, bands: [3, 5], invert: true },
];

var rows = document.getElementById('bltRows');

function render() {
  rows.innerHTML = KPIS.map(function (k) {
    var p1 = k.bands[0] / k.max * 100;
    var p2 = k.bands[1] / k.max * 100;
    // For normal KPIs, higher band = better; for inverted (churn), reverse the shade order.
    var shades = k.invert ? ['#dcfce7', '#fef3c7', '#fee2e2'] : ['#fee2e2', '#fef3c7', '#dcfce7'];
    var ranges =
      '<div class="blt-range" style="width:' + p1 + '%;background:' + shades[0] + '"></div>' +
      '<div class="blt-range" style="width:' + (p2 - p1) + '%;background:' + shades[1] + '"></div>' +
      '<div class="blt-range" style="width:' + (100 - p2) + '%;background:' + shades[2] + '"></div>';
    var hit = k.invert ? k.value <= k.target : k.value >= k.target;
    return '<div class="blt-row">' +
      '<span class="blt-name">' + k.name + '<small>' + (hit ? '✓ on target' : 'below target') + '</small></span>' +
      '<div class="blt-track">' + ranges +
        '<div class="blt-measure" data-w="' + (k.value / k.max * 100) + '"></div>' +
        '<div class="blt-target" style="left:' + (k.target / k.max * 100) + '%"></div>' +
      '</div></div>';
  }).join('');
  requestAnimationFrame(function () {
    rows.querySelectorAll('.blt-measure').forEach(function (el) { el.style.width = el.dataset.w + '%'; });
  });
}

render();`,

  seo: {
    title: 'Bullet Chart — HTML CSS JS KPI vs Target Graph',
    description: `A bullet chart showing each KPI's actual value vs. target with poor/OK/good bands. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Bullet Chart — KPI vs. Target with Qualitative Bands in One Compact Row',
      description: `A bullet chart — Stephen Few's bullet graph — is the most information-dense way to show a single KPI: in one slim horizontal bar it shows the actual value, the target to beat, and qualitative "poor / OK / good" context, all at a glance. It's the gauge done right, fitting many KPIs into the space one dial would waste. This snippet builds a complete bullet chart in plain HTML, CSS, and vanilla JavaScript, with shaded performance bands, a target marker, an animated measure bar, and support for inverted metrics — no charting library.

**Three layers in one track**

Each KPI row stacks three things in a single track. The background is split into three shaded qualitative ranges (poor, OK, good) sized from the metric's band thresholds as percentages of its axis maximum. On top, a thin dark "measure" bar shows the actual value. And a vertical red marker shows the target. Reading it is instant: is the dark bar past the red line, and which colour band does it land in? That's the whole point of a bullet graph — comparison and context without a single number to parse.

**Each KPI on its own scale**

Real dashboards mix metrics with wildly different ranges — dollars, counts, percentages, scores. Every KPI here carries its own \`max\`, \`target\`, and band thresholds, and everything (ranges, measure, target) is computed as a percentage of that KPI's own max. So revenue in the hundreds and NPS out of 60 each get a correctly-proportioned bar, and they line up visually as a tidy column despite measuring completely different things.

**Inverted metrics, handled correctly**

Some KPIs are better when lower — churn, cost, response time. The snippet supports an \`invert\` flag that reverses two things: the shaded bands flip so green sits at the low end, and the "on target" test becomes "value ≤ target" instead of "value ≥ target." This matters because a bullet chart that shows churn with green on the high end would be actively misleading. Handling the inverted case is what makes the component honest across every kind of metric.

**Animated measure, status label**

The measure bar animates from zero to its value on the next animation frame — the same \`requestAnimationFrame\` trick that lets a CSS width transition run from a freshly-created element. Each row also shows a tiny status line ("✓ on target" or "below target") computed from the value-versus-target comparison, so the verdict is spelled out alongside the visual.

**Data-driven and drop-in**

Every row renders from a \`KPIS\` array of \`{ name, value, target, max, bands, invert }\`. Add a KPI, change a target, or wire in live numbers and the bands, measure, target marker, and status all follow. Because it's compact, dependency-free, and stacks neatly, a bullet chart is the ideal way to put a whole scorecard of KPIs on one screen — far more scannable than a wall of gauges.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A bullet chart renders with four KPIs, each showing actual vs. target over shaded bands.` },
      { title: 'Read each row', text: `Check whether the dark measure bar passes the red target marker and which colour band it lands in.` },
      { title: 'Swap in your KPIs', text: `Replace the KPIS array with { name, value, target, max, bands } items for your own metrics.` },
      { title: 'Flag inverted metrics', text: `Add invert: true to any KPI that's better when lower (churn, cost) to flip the bands and target test.` },
      { title: 'Tune the bands', text: `Adjust each KPI's bands thresholds to set where poor/OK/good begin on its scale.` },
      { title: 'Wire to an API', text: `Fetch your figures, map them into the KPIS shape, and call render() to draw the live scorecard.` },
    ] },
    features: [
      { title: 'Actual + target + context', text: `Each row shows the value, the target marker, and poor/OK/good bands in one compact track.` },
      { title: 'Per-KPI scaling', text: `Every KPI uses its own max, so metrics with different ranges all proportion correctly.` },
      { title: 'Qualitative bands', text: `Three shaded ranges give instant context for whether a value is poor, OK, or good.` },
      { title: 'Inverted-metric support', text: `An invert flag flips the bands and the on-target test for metrics that are better when lower.` },
      { title: 'Animated measure bar', text: `The measure animates from zero via requestAnimationFrame so the CSS width transition runs.` },
      { title: 'Target marker', text: `A vertical marker positioned by percentage shows the target to beat.` },
      { title: 'Status label per row', text: `Each KPI shows "on target" or "below target" computed from value vs. target.` },
      { title: 'Data-driven & no library', text: `Renders entirely from a KPIS array in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Executive KPI scorecards', text: `Fit many KPIs vs. targets on one screen — pair with a [metric card grid](/ui-snippets/metric-card-grid/) for headline numbers.` },
      { title: 'Sales and revenue dashboards', text: `Show progress to quota with context, alongside a [gauge chart](/ui-snippets/gauge-chart/) for a single dial.` },
      { title: 'OKR and goal tracking', text: `Display each key result against its target next to a [profile completion](/ui-snippets/profile-completion/) meter.` },
      { title: 'Performance reviews', text: `Compare metrics against benchmarks with poor/OK/good context.` },
      { title: 'SLA and ops monitoring', text: `Track latency or error budgets (inverted) beside an [uptime status page](/ui-snippets/uptime-status-page/).` },
      { title: 'Learning bullet-graph design', text: `A reference for Stephen Few's bullet graph — compare with a [bar chart](/ui-snippets/bar-chart/) for plain comparison.` },
      { icon: 'CODE', title: 'Related: D3 Force Bubble Chart', desc: 'See the [D3 Force Bubble Chart](/ui-snippets/d3-force-bubbles/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is a bullet chart and why use it over a gauge?', a: `A bullet chart (bullet graph, designed by Stephen Few) packs a KPI's actual value, its target, and qualitative poor/OK/good context into one slim horizontal bar. It conveys everything a circular gauge does but in a fraction of the space and with a clearer actual-vs-target comparison — so you can stack a whole scorecard of KPIs in the room one gauge would occupy, and scan them all at once.` },
      { q: 'How do KPIs with different ranges line up?', a: `Each KPI carries its own max, and the bands, measure bar, and target marker are all computed as percentages of that KPI's max. So a revenue metric in the hundreds and an NPS out of 60 each fill their track proportionally and align into a tidy column, even though they measure completely different things on completely different scales.` },
      { q: 'How does the inverted mode work for metrics like churn?', a: `Setting invert: true on a KPI does two things: it reverses the band shading so green sits at the low end (where low is good), and it changes the on-target test from value ≥ target to value ≤ target. This keeps the chart honest for metrics that are better when smaller — churn, cost, response time — which would otherwise be shown with the colours and verdict backwards.` },
      { q: 'How do I set the poor/OK/good bands?', a: `Each KPI's bands array holds two thresholds on its own scale — the first ends the "poor" range and starts "OK", the second ends "OK" and starts "good". They're converted to percentages of the KPI's max to size the three shaded regions. Pick thresholds that reflect your real performance tiers; for inverted metrics the shading order flips automatically.` },
      { q: 'How do I use this bullet chart in React, Vue, or Angular?', a: `In React, hold the KPIS in useState and render the rows from .map(), setting the measure widths in a useEffect so they animate after mount; in Vue, use v-for with onMounted; in Angular, use *ngFor with ngAfterViewInit. The percentage math for bands, measure, and target is framework-agnostic — only the state and the deferred width-set move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the invert flag's ripple effects by hand to trust this chart. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the invert flag simultaneously reverses the shades array ordering and flips the on-target comparison from value greater-or-equal target to value less-or-equal target, and why both changes are necessary together rather than just one. The same assistant can help optimize it — asking whether computing percentages inline inside the template string on every render call versus precomputing them in a mapped array would matter for a scorecard with dozens of KPIs, or whether the requestAnimationFrame width-set could be replaced with a CSS custom property animation. It's also useful for extending the chart: ask it to add a second comparison marker for last period's value, support more than three qualitative bands, or add a compact sparkline of historical values next to each row. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "bullet chart" (Stephen Few style KPI-vs-target graph) in plain HTML, CSS, and JavaScript using only div elements for the bars — no SVG, no charting library.

Requirements:
- Accept KPI data as a plain array of objects, each with a name, a current value, a target value, an axis maximum, two band thresholds marking poor/OK/good ranges, and an optional invert boolean flag.
- For every KPI, render one compact horizontal track containing three background segments shaded to represent poor, OK, and good ranges (sized as percentages of the axis maximum using the two band thresholds), a single thin dark "measure" bar overlaid on top representing the actual current value, and a distinct vertical marker line representing the target value, all positioned as percentages of that same axis maximum so different KPIs with wildly different scales (dollars, percentages, raw counts) still render as proportionally correct, same-width tracks.
- When a KPI's invert flag is true, reverse the order of the three qualitative shade colors (so the "good" shade appears at the low end of the scale instead of the high end) and reverse the on-target comparison so that being at or below the target counts as on-target instead of at or above it — both changes must apply together for any inverted KPI.
- Show a short status label per row (e.g. "on target" versus "below target") computed directly from comparing the value to the target using the correct (possibly inverted) comparison direction.
- Animate the measure bar growing from zero width to its true computed width after the row is inserted into the DOM, using a requestAnimationFrame callback (or equivalent technique) so the CSS width transition actually plays rather than snapping instantly to its final value.
- Include a small legend explaining the three shade colors and the target marker so the chart is readable without prior context.`,
    },
  },
};

export default bulletChart;
