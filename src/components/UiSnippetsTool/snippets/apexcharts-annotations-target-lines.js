const apexchartsAnnotationsTargetLines = {
  id: 'apexcharts-annotations-target-lines',
  title: 'ApexCharts Line Chart with Annotations and Target Lines',
  lastmod: '2026-09-25',
  category: 'charts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/apexcharts@7.6.0/dist/apexcharts.min.js',
  ],
  html: `<div class="aan-wrap">
  <div class="aan-card">
    <div class="aan-head">
      <div>
        <div class="aan-title">API p95 Latency</div>
        <div class="aan-sub">SLO target, a tolerance band, deploy markers and the worst spike are all annotations</div>
      </div>
      <label class="aan-slo">SLO
        <input type="range" id="aanSlo" min="180" max="320" step="10" value="250">
        <output id="aanSloOut">250 ms</output>
      </label>
    </div>
    <div id="aanChart"></div>
    <div class="aan-foot" id="aanFoot"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.aan-wrap{width:100%;max-width:860px}
.aan-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px 18px 14px;box-shadow:0 1px 8px rgba(15,23,42,.06)}
.aan-head{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;flex-wrap:wrap}
.aan-title{font-size:15px;font-weight:700;color:#0f172a}
.aan-sub{font-size:12px;color:#64748b;margin-top:3px;max-width:460px}
.aan-slo{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:#334155}
.aan-slo input{accent-color:#ef4444;width:130px}
.aan-slo output{font-variant-numeric:tabular-nums;min-width:52px}
.aan-foot{font-size:12.5px;color:#334155;padding:2px 6px}
.aan-foot b{color:#b91c1c}`,

  js: `var DAY = 86400000;
var start = Date.UTC(2026, 7, 1);
var seed = 3;
function rand() { seed = (seed * 16807) % 2147483647; return seed / 2147483647; }

var data = [];
for (var i = 0; i < 42; i++) {
  var v = 196 + Math.sin(i / 4) * 18 + rand() * 30;
  if (i === 17) v += 150;           // incident spike
  if (i >= 29) v -= 28;             // performance fix after a deploy
  data.push([start + i * DAY, Math.round(v)]);
}

var DEPLOYS = [
  { day: 9,  text: 'v4.2 deploy' },
  { day: 17, text: 'Cache outage' },
  { day: 29, text: 'v4.3 query fix' },
];

var peak = data.reduce(function (a, b) { return b[1] > a[1] ? b : a; });

// Everything except the SLO line is fixed; the SLO line and band depend on
// the slider, so annotations are rebuilt from one function.
function annotations(slo) {
  return {
    yaxis: [
      // A band (y to y2) shows the "warning" zone just under the target.
      { y: slo - 30, y2: slo, fillColor: '#fef3c7', opacity: 0.55, borderColor: 'transparent',
        label: { text: 'Warning band', position: 'left', textAnchor: 'start', offsetX: 6, style: { background: 'transparent', color: '#92400e', fontSize: '10px' }, borderColor: 'transparent' } },
      { y: slo, borderColor: '#ef4444', strokeDashArray: 5,
        label: { text: 'SLO ' + slo + ' ms', style: { background: '#ef4444', color: '#fff', fontSize: '11px' }, borderColor: '#ef4444' } },
    ],
    xaxis: DEPLOYS.map(function (d) {
      return { x: start + d.day * DAY, borderColor: '#94a3b8', strokeDashArray: 3,
        label: { text: d.text, orientation: 'vertical', style: { background: '#f1f5f9', color: '#334155', fontSize: '10px' }, borderColor: '#cbd5e1' } };
    }),
    points: [{
      x: peak[0], y: peak[1],
      marker: { size: 6, fillColor: '#ef4444', strokeColor: '#fff', strokeWidth: 2 },
      // Anchored to the right of the point so it clears the vertical event
      // label drawn on the same day.
      label: { text: 'Peak ' + peak[1] + ' ms', textAnchor: 'start', offsetX: 12, offsetY: 18, style: { background: '#0f172a', color: '#fff', fontSize: '11px' }, borderColor: '#0f172a' },
    }],
  };
}

var chart = new ApexCharts(document.getElementById('aanChart'), {
  chart: { type: 'line', height: 330, toolbar: { show: false }, zoom: { enabled: false }, fontFamily: 'system-ui, sans-serif' },
  series: [{ name: 'p95 latency', data: data }],
  colors: ['#4f46e5'],
  stroke: { width: 2.5, curve: 'smooth' },
  xaxis: { type: 'datetime', labels: { datetimeUTC: true } },
  yaxis: { min: 120, max: 400, tickAmount: 7, labels: { formatter: function (v) { return v + ' ms'; } } },
  grid: { borderColor: '#eef2f7', strokeDashArray: 4 },
  tooltip: { x: { format: 'dd MMM' }, y: { formatter: function (v) { return v + ' ms'; } } },
  annotations: annotations(250),
});
chart.render();

var sloInput = document.getElementById('aanSlo');
var sloOut = document.getElementById('aanSloOut');
var foot = document.getElementById('aanFoot');

function summarise(slo) {
  var breaches = data.filter(function (p) { return p[1] > slo; }).length;
  var pct = ((data.length - breaches) / data.length) * 100;
  foot.innerHTML = '<b>' + breaches + '</b> of ' + data.length + ' days breached ' + slo + ' ms · ' + pct.toFixed(1) + '% of days within SLO.';
}

sloInput.addEventListener('input', function () {
  var slo = Number(sloInput.value);
  sloOut.textContent = slo + ' ms';
  // updateOptions with a full annotations object replaces the old set,
  // rather than stacking a new line on top of the previous one.
  chart.updateOptions({ annotations: annotations(slo) }, false, false);
  summarise(slo);
});
summarise(250);`,

  seo: {
    title: 'ApexCharts Line Chart with Annotations and Target Lines — Free Snippet',
    description: `A latency chart that uses every ApexCharts annotation type: a dashed SLO target line, a warning band, vertical deploy markers and a labelled peak point, with a slider that moves the target and recounts breaches. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'ApexCharts Annotations — Turning a Line Chart Into an Explanation',
      description: `A line chart shows what happened. Annotations explain why. A target line tells you whether a value is good, a band shows the zone to worry about, vertical markers line changes up with events like deploys, and a point label calls out the outlier that everyone will ask about. This snippet uses all four on one latency chart.

**Three annotation groups**

ApexCharts accepts \`annotations.yaxis\`, \`annotations.xaxis\` and \`annotations.points\`. A y-axis annotation with only \`y\` draws a horizontal line; adding \`y2\` turns it into a shaded band between two values. X-axis annotations draw vertical lines at timestamps, with labels that can be rotated with \`orientation: 'vertical'\` so several fit without overlapping. Point annotations place a marker and label on a specific \`x, y\` coordinate.

**Annotations built from one function**

Because the SLO line and the warning band depend on the slider, all annotations come from \`annotations(slo)\`. On every slider change, \`updateOptions({ annotations: ... })\` replaces the whole set. Using \`addYaxisAnnotation\` instead would stack a new line on each input event unless the previous one were removed by id.

**The numbers under the chart**

The footer counts days above the current SLO and the share within it. The chart shows where breaches happened; the text states how many, so the result is available without reading the graphic.

**A fixed y-range**

\`yaxis.min\` and \`max\` are fixed so moving the SLO doesn't rescale the chart under the slider, which would make the line appear to jump.

**Deterministic data with a story**

Seeded data includes a cache-outage spike and a lasting improvement after a query fix, so the deploy markers line up with visible changes.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load ApexCharts', text: `Include apexcharts.min.js from the CDN.` },
      { title: 'Paste the snippet', text: `A latency line renders with target, band, deploy and peak annotations.` },
      { title: 'Move the SLO slider', text: `The line and band move together and the breach count updates.` },
      { title: 'Hover the line', text: `The tooltip shows the day's p95 latency.` },
      { title: 'Add your events', text: `Edit DEPLOYS with day offsets and labels.` },
      { title: 'Plot your metric', text: `Replace the generated data with [timestamp, value] pairs.` },
    ] },
    features: [
      { title: 'Target line', text: `A dashed y-axis annotation with a label.` },
      { title: 'Tolerance band', text: `y and y2 shade the zone below the target.` },
      { title: 'Event markers', text: `Vertical x-axis lines with rotated labels.` },
      { title: 'Labelled outlier', text: `A point annotation on the worst value.` },
      { title: 'Interactive threshold', text: `A slider rebuilds annotations in place.` },
      { title: 'Breach summary', text: `Days over target counted in text.` },
      { title: 'Stable scale', text: `Fixed y-range avoids jumping while dragging.` },
      { title: 'Deterministic data', text: `Seeded values with a realistic incident.` },
    ],
    useCases: [
      { title: 'SRE and uptime dashboards', text: 'Show latency against an SLO line with a shaded warning band below it. The slider moves the target and recounts how many points breach it.' },
      { title: 'Sales against quota', text: 'Plot revenue with a dashed quota line and vertical campaign markers, so a jump in sales can be tied to the launch that caused it.' },
      { title: 'Health readings against a safe range', text: 'Shade the safe zone with `y` and `y2` and let readings drift outside it, making out-of-range values obvious without reading axis numbers.' },
      { title: 'Release analytics', text: 'Mark deploys as vertical lines with rotated labels, then check whether a release changed the metric that followed it.' },
      { title: 'Reports with one headline number', text: 'Call out the single value everyone will ask about with a labelled point annotation on the worst or best reading, instead of leaving readers to hunt for it.' },
      { icon: 'CODE', title: 'Related: ApexCharts Brush Chart', desc: 'Navigate longer histories with [ApexCharts Brush Chart with Range Navigator](/ui-snippets/apexcharts-brush-range-navigator/).' },
      { icon: 'CODE', title: 'Related: Control Chart', desc: 'Statistical limits instead of fixed targets: [Control Chart with Upper/Lower Control Limits](/ui-snippets/control-chart-spc-limits/).' },
    ],
    faqs: [
      { q: 'How do I add a target line in ApexCharts?', a: `Add an object to annotations.yaxis with y set to the target value, a borderColor, optionally strokeDashArray for a dashed line, and a label.` },
      { q: 'How do I shade a range?', a: `Give a y-axis annotation both y and y2. ApexCharts fills the area between them using fillColor and opacity. The same works on the x-axis with x and x2 for time windows.` },
      { q: 'How do I mark events like deploys?', a: `Add objects to annotations.xaxis with x set to the event timestamp. Set label.orientation to 'vertical' so several nearby labels don't overlap.` },
      { q: 'How do I update annotations without duplicates?', a: `Rebuild the full annotations object and pass it to updateOptions, which replaces the previous set. If you use addYaxisAnnotation, give each annotation an id and remove it before adding a new one.` },
      { q: 'Can I label a single data point?', a: `Yes, use annotations.points with x and y coordinates, a marker style and a label. It is useful for peaks, records or anomalies.` },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant like Claude and ask it to explain the difference between y, y2, x and point annotations and why the snippet rebuilds all annotations on each slider change. Then ask it to load deploy events from an API, add an error-budget burn-down below the chart, or let users click the chart to add their own notes. Ask whether counting breached days is the right SLO measure for your service or whether a rolling window would be fairer.`,
      prompt: `Build an annotated latency line chart with ApexCharts (loaded from a CDN) in plain HTML, CSS and JavaScript.

Requirements:
- Generate 42 days of seeded p95 latency data on a UTC datetime axis, including one large spike and a lasting improvement after a later date.
- Add a dashed horizontal SLO target line with a label, and a shaded warning band 30 ms below the target.
- Add vertical dashed markers with rotated labels for three events (two deploys and an outage).
- Label the highest point with a marker and a text annotation.
- Add a slider that moves the SLO between 180 and 320 ms, rebuilding the annotations with a single update so lines never duplicate.
- Show a text summary of how many days breached the current SLO and the percentage within it.
- Keep the y-axis range fixed so dragging the slider doesn't rescale the chart.`,
    },
  },
};

export default apexchartsAnnotationsTargetLines;
