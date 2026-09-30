const violinPlotChart = {
  id: 'violin-plot-chart',
  title: 'Violin Plot Chart',
  category: 'charts',
  html: `<div class="app">
  <div class="card">
    <div class="card-header">
      <h3>Response Time by Server Region</h3>
      <p class="sub">Width at each height shows how common that response time was. The white bar marks the median.</p>
    </div>
    <div class="chart-wrap">
      <svg id="violin" viewBox="0 0 560 340" xmlns="http://www.w3.org/2000/svg"></svg>
    </div>
  </div>
</div>`,
  css: `* { margin: 0; padding: 0; box-sizing: border-box; }
body { background: #f8fafc; font-family: system-ui, sans-serif; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.app { width: 100%; max-width: 600px; }
.card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; box-shadow: 0 12px 30px rgba(30,41,59,0.06); }
.card-header { margin-bottom: 8px; }
h3 { font-size: 16px; font-weight: 800; color: #1e293b; }
.sub { font-size: 12px; color: #94a3b8; margin-top: 3px; }
#violin { width: 100%; display: block; overflow: visible; }
.grid-line { stroke: #f1f5f9; stroke-width: 1; }
.axis-label-y { font-size: 9.5px; fill: #94a3b8; text-anchor: end; }
.axis-label-x { font-size: 11.5px; font-weight: 700; fill: #475569; text-anchor: middle; }
.violin-body { stroke-width: 1.5; transition: opacity 0.15s; }
.violin-body:hover { opacity: 0.85; }
.median-bar { stroke: #fff; stroke-width: 3; stroke-linecap: round; }
.box-rect { fill: rgba(15,23,42,0.18); stroke: none; }
.stat-label { font-size: 9px; fill: #1e293b; text-anchor: middle; font-weight: 700; }`,
  js: `const svg = document.getElementById('violin');
const NS = 'http://www.w3.org/2000/svg';

const GROUPS = [
  { name: 'US-East', color: '#6366f1', samples: gen(120, 24, 6) },
  { name: 'EU-West', color: '#f97316', samples: gen(160, 40, 14) },
  { name: 'AP-South', color: '#22c55e', samples: gen(210, 55, 20) },
  { name: 'SA-East',  color: '#e11d48', samples: gen(260, 70, 35) },
];

function gen(mean, spread, skew) {
  const out = [];
  for (let i = 0; i < 260; i++) {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    let g = Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    let val = mean + g * spread + Math.max(0, g) * skew * 0.4;
    out.push(Math.max(5, val));
  }
  return out.sort((a, b) => a - b);
}

function quantile(sorted, q) {
  const pos = (sorted.length - 1) * q;
  const base = Math.floor(pos);
  const rest = pos - base;
  if (sorted[base + 1] !== undefined) return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
  return sorted[base];
}

function kde(samples, points, bandwidth) {
  return points.map(x => {
    let sum = 0;
    for (const s of samples) {
      const u = (x - s) / bandwidth;
      sum += Math.exp(-0.5 * u * u);
    }
    return sum / (samples.length * bandwidth * Math.sqrt(2 * Math.PI));
  });
}

function el(tag, attrs) {
  const e = document.createElementNS(NS, tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

const PAD_L = 46, PAD_R = 20, PAD_T = 24, PAD_B = 40;
const W = 560, H = 340;
const innerW = W - PAD_L - PAD_R;
const innerH = H - PAD_T - PAD_B;

const allVals = GROUPS.flatMap(g => g.samples);
const yMin = 0;
const yMax = Math.ceil(Math.max(...allVals) / 20) * 20 + 20;

function yPos(v) {
  return PAD_T + innerH - ((v - yMin) / (yMax - yMin)) * innerH;
}

function draw() {
  svg.innerHTML = '';

  for (let v = 0; v <= yMax; v += 50) {
    const y = yPos(v);
    svg.appendChild(el('line', { class: 'grid-line', x1: PAD_L, y1: y, x2: PAD_L + innerW, y2: y }));
    const label = el('text', { class: 'axis-label-y', x: PAD_L - 8, y: y + 3 });
    label.textContent = v + 'ms';
    svg.appendChild(label);
  }

  const slotW = innerW / GROUPS.length;
  const maxViolinW = slotW * 0.72;

  GROUPS.forEach((group, gi) => {
    const cx = PAD_L + slotW * (gi + 0.5);
    const points = [];
    const step = (yMax - yMin) / 60;
    for (let v = yMin; v <= yMax; v += step) points.push(v);

    const bandwidth = Math.max(6, (Math.max(...group.samples) - Math.min(...group.samples)) / 9);
    const density = kde(group.samples, points, bandwidth);
    const maxDensity = Math.max(...density);

    const leftPts = [];
    const rightPts = [];
    points.forEach((v, i) => {
      const w = (density[i] / maxDensity) * (maxViolinW / 2);
      const y = yPos(v);
      leftPts.push(\`\${cx - w},\${y}\`);
      rightPts.push(\`\${cx + w},\${y}\`);
    });
    const outline = leftPts.join(' L ') + ' L ' + rightPts.reverse().join(' L ') + ' Z';
    const path = el('path', {
      class: 'violin-body',
      d: \`M \${outline}\`,
      fill: group.color,
      stroke: group.color,
      'fill-opacity': '0.28',
    });
    svg.appendChild(path);

    const q1 = quantile(group.samples, 0.25);
    const q3 = quantile(group.samples, 0.75);
    const median = quantile(group.samples, 0.5);
    const boxHalf = maxViolinW * 0.09;
    svg.appendChild(el('rect', {
      class: 'box-rect',
      x: cx - boxHalf, y: yPos(q3),
      width: boxHalf * 2, height: Math.max(2, yPos(q1) - yPos(q3)),
      rx: 2,
    }));

    svg.appendChild(el('line', {
      class: 'median-bar',
      x1: cx - boxHalf, y1: yPos(median), x2: cx + boxHalf, y2: yPos(median),
    }));

    const label = el('text', { class: 'axis-label-x', x: cx, y: H - 12 });
    label.textContent = group.name;
    svg.appendChild(label);

    const medLabel = el('text', { class: 'stat-label', x: cx, y: yPos(median) - 9 });
    medLabel.textContent = Math.round(median) + 'ms';
    svg.appendChild(medLabel);

    const title = el('title', {});
    title.textContent = \`\${group.name}: median \${Math.round(median)}ms, IQR \${Math.round(q1)}-\${Math.round(q3)}ms\`;
    path.appendChild(title);
  });
}

draw();`,
  seo: {
    title: 'Violin Plot Chart — Free HTML CSS JS Snippet',
    description: 'Compare full response-time distributions across groups with hand-drawn SVG violin shapes built from kernel density estimation, plus an embedded median and quartile box. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Violin Plot Chart — Kernel Density Estimation and Embedded Box Plot in Hand-Drawn SVG',
      description: `A violin plot shows the full shape of a numeric distribution for each group, not just a handful of summary numbers — the width of the "violin" at any height represents how common values near that height actually were in the underlying data. This snippet renders four such shapes for simulated server response-time samples across regions, computing every curve directly from raw data with a **kernel density estimate (KDE)**, and overlays a compact quartile box and median line inside each violin for a quick numeric read alongside the full shape.

**Why a violin plot beats a bar of averages**

A bar chart of average response time per region collapses an entire distribution — which might be tightly clustered, widely spread, or skewed with a long tail of slow outliers — into one number, hiding exactly the information that matters for diagnosing performance issues. A [box plot](/ui-snippets/box-plot/) improves on this by showing quartiles and a median, but still only draws a handful of summary lines. A violin plot shows the *entire* density curve, so a bimodal distribution (two separate clusters of typical values), a long tail, or a sharp single peak are all immediately visible as shape differences, not just numbers a viewer has to interpret.

**Kernel density estimation from raw samples**

\`kde(samples, points, bandwidth)\` computes, for each candidate value along the y-axis, a smoothed estimate of how densely the raw samples cluster near that value. For every point being evaluated, it sums a Gaussian kernel (\`Math.exp(-0.5 * u * u)\`, the bell-curve shape) centered on every individual sample, where \`u\` is the distance from the evaluation point to that sample scaled by the \`bandwidth\`, then normalizes the sum by the sample count and bandwidth so the result behaves like a proper probability density. A larger bandwidth smooths the curve more aggressively (blurring together nearby bumps); a smaller one hugs the raw data more tightly and can look noisier. The bandwidth here is derived per-group from that group's own value range (\`(max - min) / 9\`), so groups with wider spreads automatically get proportionally wider smoothing.

**Turning a density curve into a symmetric violin outline**

For each group, the code evaluates \`kde()\` at 60 evenly-spaced y-values spanning the shared y-axis range, then for each evaluated point computes a horizontal half-width proportional to that point's density relative to the group's own peak density (\`density[i] / maxDensity\`). Mirroring that half-width to the left and right of the group's center x-position, at every y-value, produces two point lists; joining the left list top-to-bottom, then the reversed right list bottom-to-top, and closing the path, draws one continuous, symmetric outline — the classic violin silhouette — as a single SVG \`<path>\` with \`fill-opacity\` for a soft, layered look.

**Overlaying a box plot for exact quartiles**

Because a density curve alone doesn't make it easy to read exact numbers, a small rectangle and a bold median line are drawn on top of each violin. \`quantile(sorted, q)\` implements linear-interpolation quantile calculation on the group's pre-sorted sample array — finding the fractional index for a given quantile \`q\` and interpolating between the two nearest actual samples — to compute the 25th percentile (\`q1\`), 75th percentile (\`q3\`), and 50th percentile (the median). The rectangle spans from \`q1\` to \`q3\` (the interquartile range, where the middle 50% of samples fall), and a short bold horizontal bar marks the exact median position, giving a precise numeric anchor inside the more qualitative violin shape.

**Simulated data via a Box-Muller transform**

Because the chart needs realistic-looking distributions rather than a flat uniform spread to be meaningful, \`gen()\` generates each group's 260 samples using a Box-Muller transform (\`Math.sqrt(-2 * ln(u)) * cos(2π * v)\` from two uniform random numbers \`u\` and \`v\`) to produce approximately normally-distributed random values, then adds a positive skew term so the resulting distribution has a realistic long tail toward slower response times, matching the shape real latency data usually takes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the width at any height', text: 'At any y-axis value, a violin\'s horizontal width shows how common response times near that value were — wider means more samples landed there.' },
        { title: 'Find the median and IQR', text: 'The bold white bar marks the exact median from quantile(samples, 0.5); the shaded rectangle behind it spans the interquartile range from the 25th to 75th percentile.' },
        { title: 'Compare shapes across groups', text: 'Compare how tight, wide, or skewed each region\'s violin is — a region with a long lower tail has more consistently fast responses than one with a wide, evenly-spread shape.' },
        { title: 'Hover a violin for exact numbers', text: 'Hover any violin body to see a native tooltip reporting its exact median and interquartile range in milliseconds.' },
        { title: 'Swap in real data', text: 'Replace the gen() calls in the GROUPS array with your own raw sample arrays — any array of numeric values works directly with kde() and quantile().' },
        { title: 'Tune the smoothing', text: 'Adjust the bandwidth formula in the draw() loop — a larger divisor produces a smoother, less detailed curve; a smaller one hugs the raw data more tightly.' },
      ],
    },
    features: [
      'Kernel density estimation (KDE) computes a real smoothed distribution curve from raw sample arrays',
      'Gaussian kernel with a per-group adaptive bandwidth derived from each group\'s own value range',
      'Symmetric violin outline built as one closed SVG path by mirroring density-proportional widths',
      'Embedded box plot overlay: interquartile range rectangle plus a bold median bar inside each violin',
      'quantile() implements proper linear-interpolation percentile calculation, not simple bucket counting',
      'Box-Muller transform generates realistic skewed-normal sample data for the built-in demo',
      'Native SVG title tooltips report exact median and IQR values per group on hover',
      'Shared y-axis scale across all groups makes distribution widths and positions directly comparable',
    ],
    useCases: [
      { icon: 'CHART', title: 'API latency and performance distribution analysis', desc: 'Compare full response-time distributions across regions, endpoints, or deploys — revealing tail latency and bimodal patterns a single average or even a [box plot](/ui-snippets/box-plot/) can hide.' },
      { icon: 'DATA', title: 'A/B test and experiment result comparison', desc: 'Show the complete outcome distribution for control versus treatment groups, making it clear whether a shift in the average also came with a shift in variance or shape.' },
      { icon: 'DASH', title: 'Scientific and statistical reporting dashboards', desc: 'Violin plots are a standard statistics-communication tool for comparing distributions across experimental conditions or survey cohorts.' },
      { icon: 'LEARN', title: 'Teaching kernel density estimation', desc: 'A concrete, readable from-scratch implementation of Gaussian KDE and quantile interpolation, useful as a companion to the [histogram](/ui-snippets/histogram/) for comparing distribution-visualization techniques.' },
      { icon: 'CODE', title: 'Reference for statistical SVG chart building', desc: 'The KDE, quantile, and violin-outline construction functions are small, dependency-free, and reusable in any project needing distribution visualization without a charting library.' },
    ],
    faqs: [
      { q: 'How is the violin shape actually computed from raw data?', a: 'kde() evaluates a Gaussian kernel density estimate at 60 points spanning the y-axis range for each group\'s raw samples, producing a smoothed density value at each height. Those density values are converted to horizontal half-widths (scaled relative to that group\'s own peak density) and mirrored left and right of the group\'s center, then joined into one closed SVG path.' },
      { q: 'What does the bandwidth parameter control, and how is it chosen here?', a: 'Bandwidth controls how much the kernel density estimate smooths the raw data — larger values blur nearby clusters together into one smoother bump, smaller values hug the raw samples more tightly and can look spikier or noisier. This snippet derives it per group as roughly one-ninth of that group\'s own value range, so wider-spread groups get proportionally more smoothing automatically.' },
      { q: 'What do the embedded rectangle and bar represent?', a: 'The shaded rectangle spans the interquartile range — from the 25th percentile to the 75th percentile, computed by quantile() with linear interpolation — meaning the middle 50% of that group\'s samples fall inside it. The bold bar marks the exact median (50th percentile) position.' },
      { q: 'How is the demo data generated to look realistic?', a: 'gen() uses a Box-Muller transform to convert pairs of uniform random numbers into approximately normally-distributed values, then adds a proportional positive-skew term so the resulting samples have a realistic long tail toward higher (slower) values, similar to how real latency data typically distributes.' },
      { q: 'How is this different from a box plot?', a: 'A box plot shows only five summary numbers (minimum, first quartile, median, third quartile, maximum) as straight lines and a rectangle. A violin plot shows those same summary numbers as an overlay but also draws the complete estimated density curve, so shape differences like bimodal distributions or asymmetric tails remain visible instead of being compressed into a handful of lines.' },
      { q: 'Can I use this chart in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, run kde() and quantile() over your data during render (or memoize them with useMemo since KDE is O(samples × points)) and build the SVG path string the same way from the results.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the Gaussian kernel inside kde() turns discrete raw samples into a smooth density curve, and how the bandwidth parameter trades off smoothness against fidelity to the raw data. It's also a good candidate for extension — ask it to add a toggle between separate violins per group and mirrored split-violins comparing two conditions side by side within one shape, overlay the individual raw sample points as a jittered strip alongside the density curve, or compute bandwidth automatically per group using a standard rule like Silverman's rule of thumb instead of the fixed range-based heuristic used here.`,
      prompt: `Build a violin plot chart in plain HTML, CSS, and JavaScript using inline SVG created with createElementNS — no charting library, no canvas.

Requirements:
- Implement a kernel density estimation function that takes a raw array of numeric samples, an array of evaluation points, and a bandwidth, and returns an estimated density value at each evaluation point using a Gaussian kernel summed across all samples and normalized by sample count and bandwidth.
- Implement a quantile function that computes any percentile (e.g. 0.25, 0.5, 0.75) from a sorted numeric array using linear interpolation between the two nearest actual values, not simple nearest-value lookup.
- For each of several groups of raw sample data, evaluate the density function at many evenly-spaced points spanning a shared y-axis range, convert each density value into a horizontal half-width scaled relative to that group's own peak density, and build one closed, symmetric SVG path by mirroring those widths to the left and right of the group's center x-position across all evaluated heights — producing the classic violin silhouette.
- Overlay a small shaded rectangle spanning each group's interquartile range (25th to 75th percentile, from the quantile function) and a bold horizontal bar marking the exact median, positioned inside each violin shape.
- Draw a shared y-axis with gridlines and labels so violin widths and vertical positions are directly comparable across all groups, plus a text label naming each group beneath its violin.
- Add a native tooltip (or equivalent) on each violin reporting its exact computed median and interquartile range values.
- Include a data-generation helper using a Box-Muller transform to produce realistic pseudo-random sample data with a configurable mean, spread, and skew for demonstration purposes.`,
    },
  },
};

export default violinPlotChart;
