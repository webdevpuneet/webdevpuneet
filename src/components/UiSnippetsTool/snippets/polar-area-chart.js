const polarAreaChart = {
  id: 'polar-area-chart',
  title: 'Polar Area Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="pa-card">
  <div class="pa-head"><h3>Activity by day</h3></div>
  <div class="pa-body">
    <svg class="pa-svg" id="paSvg" viewBox="0 0 200 200" role="img" aria-label="Polar area chart"></svg>
    <ul class="pa-legend" id="paLegend"></ul>
  </div>
  <div class="pa-tip" id="paTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pa-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:440px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.pa-head h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}
.pa-body{display:flex;align-items:center;gap:20px}
.pa-svg{width:180px;height:180px;flex-shrink:0;overflow:visible}
.pa-ring{fill:none;stroke:#eef2f7;stroke-width:1}
.pa-seg{cursor:pointer;transition:opacity .15s;opacity:.82}
.pa-seg:hover{opacity:1}

.pa-legend{list-style:none;display:flex;flex-direction:column;gap:7px;flex:1}
.pa-legend li{display:flex;align-items:center;gap:8px;font-size:12.5px;color:#475569}
.pa-dot{width:10px;height:10px;border-radius:3px;flex-shrink:0}
.pa-val{margin-left:auto;font-weight:800;color:#0f172a;font-variant-numeric:tabular-nums}

.pa-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.pa-tip[hidden]{display:none}`,

  js: `var DATA = [
  { name: 'Mon', value: 42, color: '#6366f1' },
  { name: 'Tue', value: 68, color: '#22c55e' },
  { name: 'Wed', value: 55, color: '#f59e0b' },
  { name: 'Thu', value: 81, color: '#ec4899' },
  { name: 'Fri', value: 90, color: '#0ea5e9' },
  { name: 'Sat', value: 34, color: '#14b8a6' },
  { name: 'Sun', value: 22, color: '#a855f7' },
];

var svg = document.getElementById('paSvg');
var legend = document.getElementById('paLegend');
var tip = document.getElementById('paTip');
var card = document.querySelector('.pa-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var CX = 100, CY = 100, RMAX = 92;

function pt(frac, r) {
  var a = frac * Math.PI * 2 - Math.PI / 2;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

// Every slice spans an EQUAL angle; the VALUE controls each slice's radius.
function render() {
  var max = Math.max.apply(null, DATA.map(function (d) { return d.value; }));
  var n = DATA.length;
  svg.innerHTML = '';
  // Reference rings
  [0.33, 0.66, 1].forEach(function (f) {
    var c = document.createElementNS(SVGNS, 'circle');
    c.setAttribute('class', 'pa-ring'); c.setAttribute('cx', CX); c.setAttribute('cy', CY); c.setAttribute('r', RMAX * f);
    svg.appendChild(c);
  });
  DATA.forEach(function (d, i) {
    var r = (d.value / max) * RMAX;
    var start = i / n, end = (i + 1) / n;
    var p0 = pt(start, r), p1 = pt(end, r);
    var large = (end - start) > 0.5 ? 1 : 0;
    var path = document.createElementNS(SVGNS, 'path');
    path.setAttribute('class', 'pa-seg');
    path.setAttribute('fill', d.color);
    path.setAttribute('d', 'M' + CX + ',' + CY + ' L' + p0[0].toFixed(2) + ',' + p0[1].toFixed(2) +
      ' A' + r.toFixed(2) + ',' + r.toFixed(2) + ' 0 ' + large + ' 1 ' + p1[0].toFixed(2) + ',' + p1[1].toFixed(2) + ' Z');
    path.dataset.name = d.name; path.dataset.value = d.value;
    svg.appendChild(path);
  });
  legend.innerHTML = DATA.map(function (d) {
    return '<li><span class="pa-dot" style="background:' + d.color + '"></span>' + d.name +
      '<span class="pa-val">' + d.value + '</span></li>';
  }).join('');
}

svg.addEventListener('mousemove', function (e) {
  var seg = e.target.closest('.pa-seg');
  if (!seg) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.innerHTML = seg.dataset.name + ': <b>' + seg.dataset.value + '</b>';
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

render();`,

  seo: {
    title: 'Polar Area Chart — HTML CSS JS Rose Chart (No Lib)',
    description: `A polar area (Nightingale rose) chart — equal-angle slices whose radius encodes value, with reference rings. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Polar Area Chart — Equal-Angle Slices Whose Radius Encodes the Value',
      description: `A polar area chart — also called a Nightingale rose or coxcomb chart, after Florence Nightingale who popularised it — is a circular chart where every slice takes an *equal* angle but extends to a *different* radius based on its value. It's a striking alternative to a bar chart for cyclical data like days of the week or months, where the circular form reinforces the cycle. This snippet builds it in plain HTML, CSS, SVG, and vanilla JavaScript, with reference rings, a legend, and hover tooltips — no charting library.

**Equal angles, value-driven radii**

This is the defining difference from a pie chart, and the snippet makes it explicit. In a pie, the *angle* of each slice encodes its value and the radius is constant. In a polar area chart, the *angle* is constant — every slice spans \`1/n\` of the circle — and the *radius* encodes the value (\`value / max × maxRadius\`). So a busier day reaches further out while still occupying its fixed angular wedge. Each slice is drawn as an SVG arc-path wedge from the centre out to its value-scaled radius, using the same \`cos\`/\`sin\` arc math as a pie but with the radius varying per slice.

**Reference rings for reading values**

Because radius (not angle) carries the meaning, the eye needs concentric reference rings to judge how far each slice extends — the polar equivalent of a bar chart's gridlines. The snippet draws rings at a third, two-thirds, and full radius, so a viewer can estimate each slice's value by which ring it reaches. Without these rings a polar area chart is pretty but hard to read; with them it's quantitative.

**Honest arc geometry**

Each wedge moves to the centre, lines out to the start of its arc at the slice's radius, sweeps the arc to the end angle, and closes — with the large-arc-flag set correctly for any slice spanning more than half the circle (relevant if you chart few categories). Starting at twelve o'clock (the −90° offset) matches the convention people expect for circular charts.

**Legend and tooltips**

A legend lists every slice with its colour and value, and hovering a wedge shows its name and value at the cursor via \`getBoundingClientRect\`, with one delegated \`mousemove\` listener. Because each wedge is its own SVG path, every slice is independently hoverable and could be animated or highlighted.

**Data-driven and drop-in**

Feed it any array of \`{ name, value, color }\` and it draws equal-angle, value-radius slices. It's especially suited to cyclical categories (days, months, hours, wind directions), and it's a clear reference for the polar-area construction and how it differs from a pie — the same arc math, applied to radius instead of angle.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A polar area chart renders with seven equal-angle slices reaching different radii by value.` },
      { title: 'Read with the rings', text: `Use the concentric reference rings to judge how far each slice extends.` },
      { title: 'Hover a slice', text: `See that slice's name and value in a tooltip.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own { name, value, color } items.` },
      { title: 'Best for cyclical data', text: `Use it for days, months, hours, or directions where the circular form reinforces the cycle.` },
      { title: 'Wire to an API', text: `Fetch your figures, map them into the DATA shape, and call render().` },
    ] },
    features: [
      { title: 'Equal-angle slices', text: `Every slice spans 1/n of the circle — angle is constant, unlike a pie chart.` },
      { title: 'Value-driven radius', text: `Each slice's radius encodes its value (value / max × maxRadius).` },
      { title: 'Reference rings', text: `Concentric rings let the eye judge each slice's value by how far it reaches.` },
      { title: 'SVG arc-path wedges', text: `Each slice is a real path, so every wedge is independently hoverable.` },
      { title: 'Correct arc geometry', text: `Starts at twelve o'clock with the large-arc-flag set for wide slices.` },
      { title: 'Legend with values', text: `Lists every slice with its colour and value.` },
      { title: 'Cursor tooltips', text: `Hovering a wedge shows its name and value at the pointer.` },
      { title: 'Data-driven & no library', text: `Draws from a DATA array in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Cyclical activity data', text: `Show activity by day or hour — pair with a [bar chart](/ui-snippets/bar-chart/) for a linear view.` },
      { title: 'Seasonal and monthly patterns', text: `Visualise sales or weather by month where the cycle matters, alongside a [radar chart](/ui-snippets/radar-chart/).` },
      { title: 'Survey category comparison', text: `Compare equal categories with a distinctive circular form.` },
      { title: 'Wind rose and direction data', text: `The classic use — magnitude by compass direction.` },
      { title: 'Dashboards wanting variety', text: `An eye-catching alternative to yet another bar chart, next to a [pie chart](/ui-snippets/pie-chart/).` },
      { title: 'Learning polar geometry', text: `A reference for equal-angle, value-radius construction — compare with a [donut chart](/ui-snippets/donut-chart/).` },
      { icon: 'CODE', title: 'Related: Stacked Area Chart', desc: 'See the [Stacked Area Chart](/ui-snippets/stacked-area-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a polar area chart different from a pie chart?', a: `In a pie chart, each slice's angle encodes its value and every slice shares the same radius. In a polar area (Nightingale rose) chart, it's reversed: every slice takes an equal angle (1/n of the circle) and the radius encodes the value, so larger values reach further out. This snippet computes equal angular wedges and scales each wedge's radius to its value.` },
      { q: 'Why are the reference rings important?', a: `Because radius carries the meaning, not angle, the viewer needs a scale to judge how far each slice extends — concentric rings are the polar equivalent of a bar chart's gridlines. Without them the chart looks decorative but is hard to read quantitatively; the rings at a third, two-thirds, and full radius let you estimate each slice's value at a glance.` },
      { q: 'When should I use a polar area chart?', a: `It shines for cyclical categories — days of the week, months, hours of the day, compass directions — where arranging the data in a circle reinforces the natural cycle and lets you spot patterns (a weekend dip, a seasonal peak). For non-cyclical comparison, a bar chart is usually clearer; for part-to-whole, a pie. Use polar area when the cycle is part of the story.` },
      { q: 'How are the wedges drawn?', a: `Each wedge is an SVG path: move to the centre, line out to the slice's start angle at its value-scaled radius, sweep an arc to the end angle (same radius), and close. The angles are evenly divided across the circle and offset by −90° to start at twelve o'clock; the large-arc-flag is set for any slice over half the circle. It's the same arc math as a pie, applied with a per-slice radius.` },
      { q: 'How do I use this polar area chart in React, Vue, or Angular?', a: `In React, hold the data in useState and render paths/legend from .map() (or run render() in a useEffect with a ref); in Vue, use v-for or a template ref with onMounted; in Angular, *ngFor or ViewChild with ngAfterViewInit. The pt() arc math and radius scaling are framework-agnostic and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the equal-angle-versus-value-radius distinction by staring at the math. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how each slice gets a fixed 1/n angular span while its individual radius is scaled by value divided by the maximum value in the dataset, and why the three reference rings at a third, two-thirds, and full radius are essential for reading the chart quantitatively rather than just decoratively. The same assistant can help optimize it, for example checking whether the reference ring values should be computed dynamically instead of hardcoded to thirds, or whether the arc math correctly handles a dataset with only one or two categories. It's also useful for extending the effect: ask it to animate each slice growing outward from the center on load, add numeric value labels directly on or near each wedge, or add a way to sort the slices by value instead of by their original array order. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a polar area chart (Nightingale rose chart) in plain HTML, CSS, and vanilla JavaScript using hand-drawn SVG path arcs — no charting library.

Requirements:
- A data array of objects each with a name, a numeric value, and a color, where every entry gets an equal angular slice of the full circle (360 degrees divided by the number of entries) but each slice's radius is independently scaled to that entry's value divided by the maximum value across the whole dataset, times a fixed maximum radius — this is the key difference from a pie chart, where angle (not radius) normally encodes value.
- Draw at least three concentric reference circles (for example at one third, two thirds, and full radius) underneath the data slices so a viewer can visually judge how far each wedge reaches relative to the maximum.
- Write a point-on-circle helper that takes a fraction of the circle and a radius and returns the x/y coordinate using cosine and sine, offset by -90 degrees so the first slice starts at the twelve o'clock position.
- Build each slice as an SVG path: move to the chart's center, line out to the start of the arc at that slice's own scaled radius, sweep an elliptical arc to the end of the slice at the same radius, then close — correctly setting the large-arc-flag to 1 for any slice spanning more than half the circle.
- Render a legend listing every entry's name, color swatch, and raw value, and add a tooltip that follows the cursor while hovering any wedge, showing that wedge's name and value, positioned using getBoundingClientRect relative to the chart's container.
- Keep the whole render data-driven from the array so changing values, adding entries, or removing entries automatically reflows both the angles and the radii on the next render.`,
    },
  },
};

export default polarAreaChart;
