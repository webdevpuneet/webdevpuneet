const bubbleChart = {
  id: 'bubble-chart',
  title: 'Bubble Chart',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="bbc-card">
  <div class="bbc-head">
    <h3>Markets — reach vs. growth</h3>
    <span class="bbc-sub">bubble size = revenue</span>
  </div>
  <svg class="bbc-svg" id="bbcSvg" viewBox="0 0 360 240" role="img" aria-label="Bubble chart of markets"></svg>
  <div class="bbc-axislabels"><span>Reach →</span><span class="bbc-y">↑ Growth</span></div>
  <div class="bbc-tip" id="bbcTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.bbc-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.bbc-head{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:14px}
.bbc-head h3{font-size:16px;font-weight:800;color:#0f172a}
.bbc-sub{font-size:11.5px;font-weight:600;color:#94a3b8}

.bbc-svg{width:100%;height:auto;display:block}
.bbc-grid{stroke:#eef2f7;stroke-width:1}
.bbc-axis{stroke:#cbd5e1;stroke-width:1.5}
.bbc-bubble{cursor:pointer;transition:opacity .15s;opacity:.78}
.bbc-bubble:hover{opacity:1}
.bbc-blabel{font-size:9px;font-weight:700;fill:#fff;pointer-events:none;text-anchor:middle}

.bbc-axislabels{display:flex;justify-content:space-between;margin-top:6px;font-size:11px;font-weight:700;color:#94a3b8}
.bbc-y{position:absolute;left:-2px;top:50%;transform:rotate(-90deg) translateX(50%)}

.bbc-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:600;padding:7px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5;line-height:1.5}
.bbc-tip[hidden]{display:none}
.bbc-tip b{font-weight:800}`,

  js: `// x = reach (0-100), y = growth (0-100), r = revenue (drives bubble radius)
var DATA = [
  { name: 'NA', x: 82, y: 40, r: 920, color: '#6366f1' },
  { name: 'EU', x: 68, y: 55, r: 740, color: '#22c55e' },
  { name: 'APAC', x: 54, y: 82, r: 1180, color: '#f59e0b' },
  { name: 'LATAM', x: 38, y: 70, r: 410, color: '#ec4899' },
  { name: 'MEA', x: 24, y: 48, r: 260, color: '#0ea5e9' },
];

var svg = document.getElementById('bbcSvg');
var tip = document.getElementById('bbcTip');
var card = document.querySelector('.bbc-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 360, H = 240, PAD = 28;

function sx(x) { return PAD + (x / 100) * (W - PAD * 2); }
function sy(y) { return (H - PAD) - (y / 100) * (H - PAD * 2); }
function radius(r) {
  var max = Math.max.apply(null, DATA.map(function (d) { return d.r; }));
  // Area-proportional sizing (sqrt) so a 2x value isn't a 4x-looking blob.
  return 8 + Math.sqrt(r / max) * 30;
}

function el(name, attrs) {
  var e = document.createElementNS(SVGNS, name);
  for (var k in attrs) e.setAttribute(k, attrs[k]);
  return e;
}

function render() {
  svg.innerHTML = '';
  // Gridlines + axes
  for (var i = 1; i < 5; i++) {
    svg.appendChild(el('line', { class: 'bbc-grid', x1: PAD, y1: PAD + i * (H - PAD * 2) / 5, x2: W - PAD, y2: PAD + i * (H - PAD * 2) / 5 }));
    svg.appendChild(el('line', { class: 'bbc-grid', x1: PAD + i * (W - PAD * 2) / 5, y1: PAD, x2: PAD + i * (W - PAD * 2) / 5, y2: H - PAD }));
  }
  svg.appendChild(el('line', { class: 'bbc-axis', x1: PAD, y1: H - PAD, x2: W - PAD, y2: H - PAD }));
  svg.appendChild(el('line', { class: 'bbc-axis', x1: PAD, y1: PAD, x2: PAD, y2: H - PAD }));
  // Bubbles (largest first so small ones stay clickable on top)
  DATA.slice().sort(function (a, b) { return b.r - a.r; }).forEach(function (d) {
    var c = el('circle', { class: 'bbc-bubble', cx: sx(d.x), cy: sy(d.y), r: radius(d.r), fill: d.color });
    c.dataset.name = d.name; c.dataset.x = d.x; c.dataset.y = d.y; c.dataset.r = d.r;
    svg.appendChild(c);
    var t = el('text', { class: 'bbc-blabel', x: sx(d.x), y: sy(d.y) + 3 });
    t.textContent = d.name;
    svg.appendChild(t);
  });
}

svg.addEventListener('mousemove', function (e) {
  var b = e.target.closest('.bbc-bubble');
  if (!b) { tip.hidden = true; return; }
  var rect = card.getBoundingClientRect();
  tip.innerHTML = '<b>' + b.dataset.name + '</b><br>Reach ' + b.dataset.x + ' · Growth ' + b.dataset.y + '<br>Revenue $' + Number(b.dataset.r).toLocaleString() + 'k';
  tip.style.left = (e.clientX - rect.left) + 'px';
  tip.style.top = (e.clientY - rect.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

render();`,

  seo: {
    title: 'Bubble Chart — HTML CSS JS SVG Bubble Chart',
    description: `An SVG bubble chart — x/y position plus area-proportional size, gridlines, axes, and hover tooltips. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Bubble Chart — Three-Variable SVG Scatter with Area-Proportional Bubbles',
      description: `A bubble chart packs three dimensions of data into one view: two via the x and y position of each point, and a third via the size of the bubble. It's the right chart when you want to compare items across two metrics while also weighting them by a third — markets by reach and growth, sized by revenue; products by price and rating, sized by sales. This snippet builds a complete bubble chart in plain HTML, CSS, SVG, and vanilla JavaScript, with gridlines, axes, labelled bubbles, and hover tooltips — no charting library.

**Mapping data space to pixel space**

The core of any plotted chart is the scaling functions. \`sx(x)\` maps a data value on the x-axis (0–100 here) into a pixel x-coordinate inside the padded plot area, and \`sy(y)\` does the same for y — but inverted, because SVG's y-axis grows downward while a chart's grows upward. Getting that inversion right is what makes "up" mean "more." The padding keeps bubbles and axes off the very edge so labels and large bubbles aren't clipped.

**Area-proportional sizing, not radius-proportional**

The third dimension — bubble size — uses \`sqrt\` scaling: the radius is proportional to the square root of the value, not the value itself. This is the single most important detail in a bubble chart, because a circle's visual weight is its area, and area grows with the square of the radius. If you scaled the radius linearly, a value twice as large would look four times as big and badly mislead the reader. Square-root scaling makes the perceived area proportional to the value, which is the honest way to size bubbles.

**Gridlines, axes, and draw order**

The chart draws faint gridlines and solid x/y axes first, then the bubbles on top. Bubbles are sorted largest-first before drawing so smaller bubbles paint over big ones and stay hoverable — otherwise a large bubble would sit on top and swallow the clicks meant for a small one behind it. Each bubble carries a short label centred inside it (\`text-anchor: middle\`), and the label is \`pointer-events: none\` so it never blocks the bubble's own hover.

**Tooltips with all three values**

Hovering a bubble shows a tooltip with the name and all three data values — the x metric, the y metric, and the size metric — so the reader can read the exact numbers behind the position and size. The tooltip follows the cursor using \`getBoundingClientRect\` to translate page coordinates into card offsets, and a single delegated \`mousemove\` listener on the SVG handles every bubble via \`closest('.bbc-bubble')\`.

**Data-driven and drop-in**

Everything renders from a \`DATA\` array of \`{ name, x, y, r, color }\`. Swap in your own three-variable data and the positions, sizes, gridlines, and tooltips all follow. Because it's dependency-free SVG, it scales crisply, themes with CSS, and is a clear reference for the data-to-pixel scaling and area-proportional sizing that underpin every scatter and bubble visualisation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A bubble chart renders with five market bubbles positioned by reach and growth, sized by revenue.` },
      { title: 'Hover a bubble', text: `Move over any bubble to see a tooltip with its name and all three values (x, y, and size).` },
      { title: 'Swap in your data', text: `Replace the DATA array with { name, x, y, r, color } items on your own 0–100 scales.` },
      { title: 'Adjust the scales', text: `If your data isn't 0–100, change the divisor in sx()/sy() or normalise your values first.` },
      { title: 'Tune bubble sizes', text: `Edit the base size and multiplier in radius() to make bubbles larger or smaller overall.` },
      { title: 'Wire to an API', text: `Fetch your records, map them into the DATA shape, and call render() to draw the live chart.` },
    ] },
    features: [
      { title: 'Three data dimensions', text: `Each bubble encodes x position, y position, and size — three variables in one view.` },
      { title: 'Data-to-pixel scaling', text: `sx()/sy() map data values into the padded plot area, with y inverted so up means more.` },
      { title: 'Area-proportional sizing', text: `Radius uses sqrt scaling so a bubble's perceived area — not its radius — matches the value.` },
      { title: 'Gridlines and axes', text: `Faint gridlines and solid x/y axes give the plot a readable frame.` },
      { title: 'Largest-first draw order', text: `Bubbles are sorted big-to-small so small ones paint on top and stay hoverable.` },
      { title: 'Centred labels', text: `Each bubble carries a label with pointer-events:none so it never blocks the hover.` },
      { title: 'Three-value tooltips', text: `Hovering shows the name plus all three metrics, positioned at the cursor.` },
      { title: 'Data-driven & no library', text: `Renders entirely from a DATA array in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Market and segment analysis', text: `Plot markets by two metrics sized by a third — pair with a [bar chart](/ui-snippets/bar-chart/) for single-metric views.` },
      { title: 'Product portfolio mapping', text: `Position products by price and rating, sized by sales, alongside a [scatter plot](/ui-snippets/scatter-plot/) for two-variable data.` },
      { title: 'Risk vs. reward quadrants', text: `Map investments or projects across two axes with a weighting dimension.` },
      { title: 'Performance dashboards', text: `Show teams or campaigns by effort and impact next to a [stat comparison card](/ui-snippets/stat-comparison-card/).` },
      { title: 'Scientific and survey data', text: `Visualise three-variable datasets without a heavy plotting library.` },
      { title: 'Learning chart scaling', text: `A reference for data-to-pixel mapping and area-proportional sizing — compare with a [line chart](/ui-snippets/line-chart-widget/).` },
      { icon: 'CODE', title: 'Related: Control Chart with Upper/Lower Control Limits', desc: 'See the [Control Chart with Upper/Lower Control Limits](/ui-snippets/control-chart-spc-limits/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Violin Plot Chart', desc: 'See the [Violin Plot Chart](/ui-snippets/violin-plot-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why are bubbles sized by the square root of the value?', a: `A circle's visual weight is its area, and area grows with the square of the radius. If you set radius directly proportional to the value, a value twice as large would render with four times the area and mislead the reader. Scaling the radius by the square root of the value makes the perceived area proportional to the value — the honest, standard way to size bubbles.` },
      { q: 'Why is the y-axis inverted in the scaling function?', a: `SVG coordinates grow downward (y=0 is the top), but a chart's y-axis should grow upward (more = higher). sy() subtracts the scaled value from the bottom of the plot area so larger data values map to smaller pixel-y values, placing them higher on screen. Getting this inversion right is what makes "up" mean "more" on the chart.` },
      { q: 'Why are bubbles drawn largest-first?', a: `If a big bubble is drawn last, it sits on top and intercepts hover/click events meant for smaller bubbles behind it. Sorting the data largest-first before drawing puts small bubbles on top in the paint order, so every bubble stays individually hoverable. The labels are pointer-events:none for the same reason — so they never block their own bubble.` },
      { q: 'My data is not on a 0–100 scale — how do I adjust?', a: `The scaling functions sx()/sy() assume a 0–100 domain. Either change the divisor (100) to your data's maximum, or normalise your values to 0–100 before plotting. For axes with a non-zero minimum, subtract the min and divide by the range (max − min). The radius() function already normalises against the dataset's max, so bubble sizes adapt automatically.` },
      { q: 'How do I use this bubble chart in React, Vue, or Angular?', a: `In React, hold the data in useState and render circles/labels from .map(), or run the imperative render() in a useEffect with a ref to the SVG; in Vue, use v-for or a template ref with onMounted; in Angular, use *ngFor or ViewChild with ngAfterViewInit. The sx()/sy()/radius() scaling math is framework-agnostic and ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the scaling math by hand to trust this chart's proportions. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why radius() takes a square root of the ratio between a value and the dataset's max instead of scaling linearly, and why sy() subtracts the scaled value from the chart height rather than using it directly. The same assistant can help optimize it — asking whether recomputing Math.max across the whole dataset inside radius() on every single bubble is wasteful compared to computing it once per render, or whether the largest-first sort before drawing could be replaced with a z-index-free layering approach. It's also useful for extending the chart: ask it to add a legend mapping colors to categories, support a fourth dimension via bubble opacity or border, or animate bubbles growing in from radius zero on load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "bubble chart" in plain HTML, CSS, and SVG built with vanilla JavaScript that encodes three data dimensions per point (an x metric, a y metric, and a size metric) — no charting library, no canvas.

Requirements:
- Accept data as an array of objects, each with a name, an x value, a y value, a size-driving value, and a color, all on a shared numeric domain (e.g. 0-100 for x and y).
- Write separate x and y scaling functions that map a data value into pixel coordinates inside a padded plot area, and make sure the y-scaling function inverts the axis (larger data values must map to smaller pixel-y coordinates, i.e. higher on screen), since SVG's native coordinate system grows downward.
- Compute each bubble's radius using square-root scaling relative to the maximum size-value in the dataset (not a direct linear mapping), so that a data point twice as large in the size metric appears roughly 1.4 times the radius rather than twice the radius — preserving the reader's ability to correctly judge relative area at a glance.
- Draw faint gridlines and solid x and y axis lines before drawing any bubbles, and sort the bubbles from largest to smallest before appending them to the SVG, so smaller bubbles are painted on top of larger ones and remain independently hoverable.
- Give each bubble a centered text label whose pointer-events are disabled so the label itself never intercepts a hover meant for the bubble underneath it.
- Attach a single delegated mousemove listener on the SVG element (not one per bubble) that detects which bubble is under the cursor and shows a tooltip listing that bubble's name and all three of its underlying data values, positioned relative to the chart container using getBoundingClientRect.`,
    },
  },
};

export default bubbleChart;
