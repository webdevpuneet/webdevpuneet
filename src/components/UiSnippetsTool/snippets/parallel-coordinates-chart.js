const parallelCoordinatesChart = {
  id: 'parallel-coordinates-chart',
  title: 'Parallel Coordinates Chart',
  category: 'charts',
  html: `<div class="app">
  <div class="card">
    <div class="card-header">
      <h3>Laptop Comparison</h3>
      <p class="sub">Each line is one laptop, plotted across five specs. Hover a line to isolate it.</p>
    </div>
    <div class="chart-wrap">
      <svg id="pc" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
    <div class="legend" id="legend"></div>
  </div>
</div>`,
  css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.app { width: 100%; max-width: 680px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }
.card-header { margin-bottom: 10px; }
h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12px; color: #94a3b8; margin-top: 3px; }
.chart-wrap { width: 100%; }
#pc { width: 100%; display: block; overflow: visible; }
.axis-line { stroke: #cbd5e1; stroke-width: 1.5; }
.axis-label { font-size: 11px; font-weight: 700; fill: #475569; text-anchor: middle; }
.tick-label { font-size: 9px; fill: #94a3b8; text-anchor: end; }
.pc-line { fill: none; stroke-width: 2; opacity: 0.55; cursor: pointer; transition: opacity 0.15s, stroke-width 0.15s; }
.pc-line.dim { opacity: 0.08; }
.pc-line.active { opacity: 1; stroke-width: 3.5; }
.pc-dot { r: 3; transition: opacity 0.15s; }
.pc-dot.dim { opacity: 0.08; }
.legend { display: flex; flex-wrap: wrap; gap: 10px 16px; margin-top: 14px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-weight: 600; color: #475569; cursor: pointer; }
.legend-item .sw { width: 10px; height: 10px; border-radius: 3px; flex-shrink: 0; }
.legend-item.dim { opacity: 0.35; }`,
  js: `const svg = document.getElementById('pc');
const legendEl = document.getElementById('legend');
const NS = 'http://www.w3.org/2000/svg';

const AXES = [
  { key: 'price', label: 'Price ($)', min: 700, max: 2600 },
  { key: 'battery', label: 'Battery (hr)', min: 6, max: 20 },
  { key: 'weight', label: 'Weight (kg)', min: 0.9, max: 2.4, invert: true },
  { key: 'perf', label: 'Perf score', min: 40, max: 100 },
  { key: 'screen', label: 'Screen (in)', min: 12, max: 17 },
];

const ROWS = [
  { name: 'Aria 13',   color: '#6366f1', price: 1299, battery: 14, weight: 1.1, perf: 78, screen: 13.3 },
  { name: 'Vector Pro',color: '#f97316', price: 2399, battery: 9,  weight: 1.8, perf: 96, screen: 16 },
  { name: 'Nomad Air',  color: '#22c55e', price: 999,  battery: 18, weight: 1.0, perf: 55, screen: 13.6 },
  { name: 'Forge X1',   color: '#e11d48', price: 1799, battery: 7,  weight: 2.1, perf: 90, screen: 15.6 },
  { name: 'Studio Lite',color: '#0ea5e9', price: 1399, battery: 11, weight: 1.4, perf: 70, screen: 14 },
];

const PAD_L = 46, PAD_R = 30, PAD_T = 30, PAD_B = 20;
const W = 640, H = 360;
const innerW = W - PAD_L - PAD_R;
const innerH = H - PAD_T - PAD_B;

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

function axisX(i) {
  if (AXES.length === 1) return PAD_L + innerW / 2;
  return PAD_L + (i / (AXES.length - 1)) * innerW;
}

function normalize(axis, value) {
  let t = (value - axis.min) / (axis.max - axis.min);
  t = Math.max(0, Math.min(1, t));
  if (axis.invert) t = 1 - t;
  return t;
}

function valueY(axis, value) {
  const t = normalize(axis, value);
  return PAD_T + innerH - t * innerH;
}

function buildPath(row) {
  return AXES.map((axis, i) => \`\${i === 0 ? 'M' : 'L'} \${axisX(i)} \${valueY(axis, row[axis.key])}\`).join(' ');
}

function draw() {
  svg.innerHTML = '';

  AXES.forEach((axis, i) => {
    const x = axisX(i);
    svg.appendChild(el('line', { class: 'axis-line', x1: x, y1: PAD_T, x2: x, y2: PAD_T + innerH }));

    const label = el('text', { class: 'axis-label', x, y: PAD_T - 12 });
    label.textContent = axis.label;
    svg.appendChild(label);

    [0, 0.5, 1].forEach(t => {
      const rawVal = axis.invert ? axis.max - t * (axis.max - axis.min) : axis.min + t * (axis.max - axis.min);
      const y = PAD_T + innerH - t * innerH;
      const tick = el('text', { class: 'tick-label', x: x - 8, y: y + 3 });
      tick.textContent = Number.isInteger(rawVal) ? rawVal : rawVal.toFixed(1);
      svg.appendChild(tick);
    });
  });

  const lineEls = [];
  const dotEls = [];

  ROWS.forEach(row => {
    const path = el('path', {
      class: 'pc-line', d: buildPath(row), stroke: row.color, 'data-name': row.name,
    });
    svg.appendChild(path);
    lineEls.push(path);

    const dots = AXES.map((axis, i) => {
      const dot = el('circle', {
        class: 'pc-dot', cx: axisX(i), cy: valueY(axis, row[axis.key]), fill: row.color,
      });
      const title = el('title', {});
      title.textContent = \`\${row.name} — \${axis.label}: \${row[axis.key]}\`;
      dot.appendChild(title);
      svg.appendChild(dot);
      return dot;
    });
    dotEls.push(...dots);

    path.addEventListener('mouseenter', () => setActive(row.name));
    path.addEventListener('mouseleave', () => setActive(null));
  });

  function setActive(name) {
    lineEls.forEach(p => {
      if (!name) { p.classList.remove('dim', 'active'); return; }
      p.classList.toggle('active', p.dataset.name === name);
      p.classList.toggle('dim', p.dataset.name !== name);
    });
    document.querySelectorAll('.pc-dot').forEach((dot, idx) => {
      const rowIdx = Math.floor(idx / AXES.length);
      const row = ROWS[rowIdx];
      if (!name) { dot.classList.remove('dim'); return; }
      dot.classList.toggle('dim', row.name !== name);
    });
    document.querySelectorAll('.legend-item').forEach(item => {
      if (!name) { item.classList.remove('dim'); return; }
      item.classList.toggle('dim', item.dataset.name !== name);
    });
  }

  legendEl.innerHTML = '';
  ROWS.forEach(row => {
    const item = document.createElement('div');
    item.className = 'legend-item';
    item.dataset.name = row.name;
    const sw = document.createElement('span');
    sw.className = 'sw';
    sw.style.background = row.color;
    item.appendChild(sw);
    item.appendChild(document.createTextNode(row.name));
    item.addEventListener('mouseenter', () => setActive(row.name));
    item.addEventListener('mouseleave', () => setActive(null));
    legendEl.appendChild(item);
  });
}

draw();`,
  seo: {
    title: 'Parallel Coordinates Chart — Free HTML CSS JS Snippet',
    description: 'Compare items across five numeric dimensions at once with hand-drawn SVG parallel axes, per-axis min-max normalization and hover-to-isolate lines. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Parallel Coordinates Chart — Multi-Dimensional Comparison with Per-Axis Normalization and Hover Isolation',
      description: `A parallel coordinates chart plots several numeric dimensions as vertical axes placed side by side, and represents each data row as a single polyline that crosses every axis at its corresponding value. Unlike a scatter plot, which can only show two (or with size and color, four) dimensions at once, a parallel coordinates chart scales to many more dimensions in one static view — this snippet compares five laptop specs (price, battery life, weight, performance score, and screen size) across five products using nothing but hand-drawn inline **SVG** and vanilla JavaScript.

**Independent scales per axis via min-max normalization**

Each axis in \`AXES\` defines its own \`min\` and \`max\` — price ranges from 700 to 2600 dollars while screen size ranges from 12 to 17 inches, wildly different scales that would be meaningless plotted against a single shared y-axis. \`normalize(axis, value)\` converts any raw value into a 0-to-1 fraction of that axis's own range: \`(value - axis.min) / (axis.max - axis.min)\`, clamped to [0, 1] in case a data point falls outside the configured bounds. \`valueY()\` then maps that 0-to-1 fraction onto the chart's actual pixel height, so every axis independently spans the same vertical pixel range regardless of its real-world units — this is what makes wildly different metrics visually comparable side by side.

**Handling axes where "lower is better"**

Weight is configured with \`invert: true\`, because for weight (unlike performance or battery life) a lower value is the more desirable one. \`normalize()\` checks this flag and flips the fraction (\`1 - t\`) before it's used, so the top of the weight axis always represents the *lightest* laptop rather than the heaviest — keeping the visual convention "up is good" consistent across every axis even though the underlying numeric direction differs per metric. \`draw()\`'s tick-label loop performs the same inversion in reverse when computing which raw value to print at each gridline position, so the printed numbers stay correct regardless of the flag.

**Building each row's polyline**

\`buildPath(row)\` walks the \`AXES\` array once per data row, computing an SVG path command for each axis in order — \`M\` (move-to) for the first point and \`L\` (line-to) for every subsequent one — using \`axisX(i)\` for the horizontal position (axes are evenly spaced by index) and \`valueY(axis, row[axis.key])\` for the vertical position on that axis. The resulting path string, like \`M 46 120 L 195 80 L 344 210 ...\`, is assigned directly to an SVG \`<path>\`'s \`d\` attribute, producing one continuous line per data row that crosses every axis exactly once.

**Hover-to-isolate interaction**

With five overlapping semi-transparent lines, picking out one specific item's path across all axes is hard by eye alone. Each \`<path>\` and its matching legend entry share a \`mouseenter\`/\`mouseleave\` pair wired to a shared \`setActive(name)\` function: when a name is active, every other line and its axis dots gain a \`.dim\` class (dropping opacity to near-zero) while the hovered line gains \`.active\` (full opacity, thicker stroke), and the matching legend swatch highlights too. This turns an otherwise noisy tangle of lines into a chart where any single item's full profile across all five dimensions can be traced instantly by hovering either its line or its legend entry.

**Per-axis tick labels and vertex tooltips**

Three tick labels (min, midpoint, max) are printed beside each axis by reversing the normalization math for \`t = 0, 0.5, 1\`, so the actual units (dollars, hours, kilograms, and so on) stay readable next to each axis rather than requiring a separate legend for scale. Every vertex on every line additionally carries a small \`<circle>\` marker with a native SVG \`<title>\` tooltip reporting the exact row name, axis label, and value on hover, giving precise numbers on demand without cluttering the chart by default.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the axes left to right', text: 'Each vertical axis is one dimension (price, battery, weight, and so on), independently scaled between its own configured min and max via normalize().' },
        { title: 'Trace a single item\'s line', text: 'Each colored polyline is one item, crossing every axis at that item\'s value for that dimension, connected in order by buildPath().' },
        { title: 'Hover a line or legend entry to isolate it', text: 'setActive(name) dims every other line and its axis dots while highlighting the hovered item\'s full profile, making it easy to trace one item across all dimensions.' },
        { title: 'Check exact values', text: 'Hover any small vertex dot to see a native tooltip with the exact row name, axis label, and value at that point.' },
        { title: 'Edit the axes and data', text: 'Update the AXES array (key, label, min, max, and an optional invert flag) and the ROWS array of data objects to chart your own items and dimensions.' },
        { title: 'Add or remove dimensions', text: 'Add another object to AXES with a matching key present on every ROWS entry — axisX() automatically spaces however many axes are defined evenly across the chart width.' },
      ],
    },
    features: [
      'Independent per-axis min-max normalization so wildly different units (dollars, hours, kg) plot on one shared pixel scale',
      'Optional invert flag per axis flips the up-is-good convention for metrics where lower values are better',
      'buildPath() generates one continuous SVG path per data row crossing every axis exactly once',
      'Hover-to-isolate interaction dims every other line and its vertex dots via a shared setActive() function',
      'Legend entries and chart lines are cross-linked — hovering either one highlights the same item',
      'Three auto-computed tick labels per axis (min, midpoint, max) printed in each axis\'s real units',
      'Native SVG <title> tooltips on every vertex report the exact row, axis, and value on hover',
      'Evenly-spaced axis positions computed automatically from however many entries exist in AXES',
      'Pure inline SVG built with createElementNS — no charting library or canvas',
    ],
    useCases: [
      { icon: 'CHART', title: 'Multi-attribute product or spec comparison', desc: 'Compare products, plans, or configurations across many numeric specs at once — laptops, cars, subscription tiers — in a single static view impossible to fit into a [scatter plot](/ui-snippets/scatter-plot/).' },
      { icon: 'DASH', title: 'Candidate or vendor scoring dashboards', desc: 'Plot several weighted evaluation criteria per candidate or vendor as parallel axes so reviewers can trace trade-offs between candidates at a glance.' },
      { icon: 'DATA', title: 'Multivariate dataset exploration', desc: 'Analysts commonly use parallel coordinates as a first exploratory view of a dataset with many numeric columns, spotting clusters and outliers before deeper analysis.' },
      { icon: 'LEARN', title: 'Teaching multi-dimensional data visualization', desc: 'A clear, from-scratch example of normalizing several independent scales onto one shared axis system, useful alongside the [radar chart](/ui-snippets/radar-chart/) for comparing chart-type trade-offs.' },
      { icon: 'FORM', title: 'Interactive filtering and comparison tools', desc: 'Extend the hover-isolate interaction into click-to-pin comparisons for a product finder or configurator tool that highlights a shortlist against the full field.' },
    ],
    faqs: [
      { q: 'How does the chart handle axes with completely different units and ranges?', a: 'Every axis independently normalizes its own values to a 0-to-1 fraction using that axis\'s own configured min and max via normalize(), then maps that fraction onto the same pixel height for every axis via valueY(). The real units never need to match between axes because the pixel positions are always computed relative to each axis\'s own range.' },
      { q: 'What does the invert flag on an axis actually change?', a: 'When invert is true, normalize() computes 1 minus the usual fraction before converting it to a pixel position, and the tick-label calculation performs the same reversal when deciding which raw number to print at each gridline. This keeps "up on the chart" consistently meaning "the better value" even for metrics like weight where a lower number is preferable.' },
      { q: 'How does hovering isolate one line without a chart library?', a: 'Every path element and legend entry share a single setActive(name) function wired to their mouseenter/mouseleave events. It toggles a .dim class (near-zero opacity) on every non-matching line, dot, and legend swatch, and an .active class (full opacity, thicker stroke) on the matching line, purely through CSS class toggling.' },
      { q: 'Can I add more than five axes or more than five rows?', a: 'Yes. axisX() spaces however many entries exist in the AXES array evenly across the available chart width automatically, and draw() loops over however many rows exist in ROWS — just add more objects to either array with the required key, label, min, and max fields (and matching data keys on each row).' },
      { q: 'Why use path elements instead of individual line segments between axes?', a: 'A single path per row (built by buildPath() with one M command and subsequent L commands) is one continuous SVG element with one set of hover listeners and one stroke, which is simpler to isolate and style than managing N-1 separate line segments per row and keeping their hover states synchronized.' },
      { q: 'Can I use this chart in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, recompute buildPath() for each row from your data array during render and manage the currently-hovered row name in a piece of state instead of toggling classList directly.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how normalize() and the invert flag work together to keep "up is good" consistent across axes with opposite real-world directions, and why buildPath() uses a single SVG path per row instead of separate line segments between each pair of axes. It's also a good candidate for extension — ask it to add draggable axis reordering so users can rearrange which dimension comes next to which, brushing (click-and-drag a range on one axis to filter which lines stay fully visible), or a color scale driven by one of the data dimensions itself instead of a fixed per-row color.`,
      prompt: `Build a parallel coordinates chart in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting library.

Requirements:
- Define a configurable array of axes, each with a label, a data key, a minimum value, a maximum value, and an optional flag indicating that a lower value should be treated as "better" (i.e. plotted toward the top of that axis instead of the bottom).
- Define a configurable array of data rows, each with a name, a color, and a numeric value for every axis's data key.
- Space the axes evenly across the chart width as vertical lines, and independently normalize each axis's values to the same pixel height range using that axis's own min and max, respecting its invert flag when computing pixel position — so axes with completely different units and ranges are still visually comparable.
- Draw one continuous SVG path per data row that connects a point on every axis, in axis order, at that row's normalized value for that axis, plus a small circle marker at every point with a native title tooltip reporting the exact row name, axis label, and value.
- Print three tick labels per axis (minimum, midpoint, and maximum) in each axis's real units, correctly reversed for any axis using the invert flag.
- Add a hover interaction (on both the chart lines and a text legend) that dims every non-matching row's line and point markers while keeping the hovered row's line and markers at full opacity and a thicker stroke, so a single row's profile across all axes can be traced clearly even with several overlapping lines.`,
    },
  },
};

export default parallelCoordinatesChart;
