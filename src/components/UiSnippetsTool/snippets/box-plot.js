const boxPlot = {
  id: 'box-plot',
  title: 'Box Plot',
  lastmod: '2026-06-24',
  category: 'charts',
  html: `<div class="bp-card">
  <div class="bp-head"><h3>Score distribution by class</h3></div>
  <svg class="bp-svg" id="bpSvg" viewBox="0 0 380 240" role="img" aria-label="Box plot"></svg>
  <div class="bp-tip" id="bpTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.bp-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.bp-head h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:14px}
.bp-svg{width:100%;height:auto;display:block}
.bp-grid{stroke:#eef2f7;stroke-width:1}
.bp-whisker{stroke:#64748b;stroke-width:1.5}
.bp-box{stroke-width:1.5;cursor:pointer;transition:opacity .15s}
.bp-box:hover{opacity:.85}
.bp-median{stroke:#0f172a;stroke-width:2.5}
.bp-out{fill:#ef4444}
.bp-axis{font-size:10px;fill:#94a3b8;font-weight:700}
.bp-label{font-size:11px;fill:#475569;font-weight:700;text-anchor:middle}

.bp-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:11.5px;font-weight:600;padding:7px 10px;border-radius:8px;transform:translate(-50%,-115%);white-space:nowrap;z-index:5;line-height:1.6}
.bp-tip[hidden]{display:none}
.bp-tip b{font-weight:800}`,

  js: `// Raw samples per group. The box plot computes quartiles from these.
var GROUPS = [
  { name: 'Class A', color: '#6366f1', data: [55,62,64,67,68,70,71,73,74,76,78,82,95] },
  { name: 'Class B', color: '#22c55e', data: [40,58,60,63,65,66,68,69,72,75,77,80,88] },
  { name: 'Class C', color: '#f59e0b', data: [30,45,50,52,55,58,60,62,64,66,70,72,74] },
];

var svg = document.getElementById('bpSvg');
var tip = document.getElementById('bpTip');
var card = document.querySelector('.bp-card');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 380, H = 240, PADX = 20, PADTOP = 14, PADBOT = 28;

function quantile(sorted, q) {
  var pos = (sorted.length - 1) * q;
  var base = Math.floor(pos), rest = pos - base;
  return sorted[base + 1] !== undefined ? sorted[base] + rest * (sorted[base + 1] - sorted[base]) : sorted[base];
}

function stats(data) {
  var s = data.slice().sort(function (a, b) { return a - b; });
  var q1 = quantile(s, 0.25), med = quantile(s, 0.5), q3 = quantile(s, 0.75);
  var iqr = q3 - q1;
  var loFence = q1 - 1.5 * iqr, hiFence = q3 + 1.5 * iqr;
  // Whiskers extend to the most extreme points still within the fences.
  var inRange = s.filter(function (v) { return v >= loFence && v <= hiFence; });
  var min = inRange[0], max = inRange[inRange.length - 1];
  var outliers = s.filter(function (v) { return v < loFence || v > hiFence; });
  return { q1: q1, med: med, q3: q3, min: min, max: max, outliers: outliers };
}

function el(n, a) { var e = document.createElementNS(SVGNS, n); for (var k in a) e.setAttribute(k, a[k]); return e; }

function render() {
  var all = GROUPS.reduce(function (a, g) { return a.concat(g.data); }, []);
  var dMin = Math.min.apply(null, all), dMax = Math.max.apply(null, all);
  var lo = Math.floor(dMin / 10) * 10, hi = Math.ceil(dMax / 10) * 10;
  function y(v) { return (H - PADBOT) - ((v - lo) / (hi - lo)) * (H - PADTOP - PADBOT); }
  svg.innerHTML = '';
  for (var t = lo; t <= hi; t += (hi - lo) / 5) {
    svg.appendChild(el('line', { class: 'bp-grid', x1: 34, y1: y(t), x2: W - PADX, y2: y(t) }));
    var lab = el('text', { class: 'bp-axis', x: 28, y: y(t) + 3, 'text-anchor': 'end' }); lab.textContent = Math.round(t); svg.appendChild(lab);
  }
  var bw = (W - 34 - PADX) / GROUPS.length;
  GROUPS.forEach(function (g, i) {
    var st = stats(g.data);
    var cx = 34 + bw * (i + 0.5);
    var boxW = Math.min(46, bw * 0.5);
    // Whisker line + caps
    svg.appendChild(el('line', { class: 'bp-whisker', x1: cx, y1: y(st.min), x2: cx, y2: y(st.max) }));
    svg.appendChild(el('line', { class: 'bp-whisker', x1: cx - 9, y1: y(st.min), x2: cx + 9, y2: y(st.min) }));
    svg.appendChild(el('line', { class: 'bp-whisker', x1: cx - 9, y1: y(st.max), x2: cx + 9, y2: y(st.max) }));
    // Box from Q1 to Q3
    var box = el('rect', { class: 'bp-box', x: cx - boxW / 2, y: y(st.q3), width: boxW, height: y(st.q1) - y(st.q3), rx: 3, fill: g.color, 'fill-opacity': 0.25, stroke: g.color });
    box.dataset.name = g.name; box.dataset.q1 = Math.round(st.q1); box.dataset.med = Math.round(st.med); box.dataset.q3 = Math.round(st.q3); box.dataset.min = Math.round(st.min); box.dataset.max = Math.round(st.max);
    svg.appendChild(box);
    // Median line
    svg.appendChild(el('line', { class: 'bp-median', x1: cx - boxW / 2, y1: y(st.med), x2: cx + boxW / 2, y2: y(st.med) }));
    // Outliers
    st.outliers.forEach(function (o) { svg.appendChild(el('circle', { class: 'bp-out', cx: cx, cy: y(o), r: 3 })); });
    var label = el('text', { class: 'bp-label', x: cx, y: H - 8 }); label.textContent = g.name; svg.appendChild(label);
  });
}

svg.addEventListener('mousemove', function (e) {
  var box = e.target.closest('.bp-box');
  if (!box) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  var d = box.dataset;
  tip.innerHTML = '<b>' + d.name + '</b><br>Max ' + d.max + ' · Q3 ' + d.q3 + '<br>Median <b>' + d.med + '</b><br>Q1 ' + d.q1 + ' · Min ' + d.min;
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });

render();`,

  seo: {
    title: 'Box Plot — HTML CSS JS Box-and-Whisker (No Library)',
    description: `A box-and-whisker plot that computes quartiles, IQR whiskers, and outliers from raw data in SVG. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Box Plot — Quartiles, IQR Whiskers, and Outliers Computed from Raw Data',
      description: `A box plot (box-and-whisker) is the standard way to summarise a distribution: the box spans the middle 50% of values, a line marks the median, whiskers reach the typical range, and dots flag outliers. It compares spread and skew across groups far better than a bar of averages. This snippet builds it in plain HTML, CSS, SVG, and vanilla JavaScript, computing all the statistics from raw samples itself — no charting library.

**It computes the real statistics**

Given a raw array of numbers per group, \`stats()\` sorts them and derives the five-number summary using linear-interpolation quantiles: Q1 (25th percentile), the median (50th), and Q3 (75th). From those it computes the interquartile range (IQR = Q3 − Q1) and the Tukey fences at 1.5×IQR beyond each quartile. This quantile-and-IQR math is the heart of a box plot, and doing it from raw data (rather than pre-computed values) is what makes it a genuine statistical chart rather than a styled bar.

**Whiskers that stop at the data, plus outliers**

A correct box plot does not run its whiskers to the absolute min and max — it runs them to the most extreme points still *within* the 1.5×IQR fences, and draws anything beyond as individual outlier dots. The snippet filters the sorted data by the fences to find the whisker ends, then plots the out-of-fence points as red circles. This Tukey convention is the detail most hand-rolled box plots get wrong (running whiskers to the extremes hides outliers); getting it right is what makes the chart trustworthy.

**Drawn as labelled SVG glyphs**

Each group renders as a vertical whisker line with end caps, a translucent box from Q1 to Q3 in the group colour, a bold median line across it, and outlier dots — all positioned by a shared \`y()\` scale mapping data values to pixels (rounded to a clean axis range). Gridlines and axis ticks give reference levels, and a label sits under each box. Because the box is its own SVG node, hovering it shows the full five-number summary in a tooltip.

**A shared axis for comparison**

All groups share one y-axis computed from the combined data range, so their boxes are directly comparable — you can see at a glance which class has the higher median, the wider spread, or the skew (median off-centre in its box). Comparing distributions side by side on one scale is the main reason to use box plots over separate summaries.

**Data-driven and drop-in**

Feed it any array of \`{ name, color, data }\` with raw samples and it computes and draws the plot. It is a clear, dependency-free reference for the quartile, IQR, whisker, and outlier math behind every box-and-whisker chart.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A box plot renders for three classes, each computed from its raw scores.` },
      { title: 'Read the boxes', text: `The box is the middle 50% (Q1 to Q3), the bold line is the median, whiskers reach the IQR range.` },
      { title: 'Spot outliers', text: `Red dots beyond the whiskers are values outside the 1.5x IQR fences.` },
      { title: 'Hover a box', text: `See the full five-number summary (min, Q1, median, Q3, max) in a tooltip.` },
      { title: 'Swap in your data', text: `Replace the GROUPS array with your own { name, color, data } raw samples.` },
      { title: 'Wire to an API', text: `Fetch your samples, map them into GROUPS, and call render().` },
    ] },
    features: [
      { title: 'Five-number summary', text: `Computes Q1, median, and Q3 with linear-interpolation quantiles from raw data.` },
      { title: 'Tukey IQR fences', text: `Whiskers stop at the most extreme points within 1.5x IQR, not the absolute extremes.` },
      { title: 'Outlier dots', text: `Points beyond the fences are drawn individually as red circles.` },
      { title: 'Translucent quartile box', text: `A Q1 to Q3 box in the group colour with a bold median line across it.` },
      { title: 'Shared comparison axis', text: `All groups use one y-scale from the combined range, so distributions compare directly.` },
      { title: 'Gridlines and ticks', text: `Reference levels and axis labels make values readable.` },
      { title: 'Five-number tooltip', text: `Hovering a box shows min, Q1, median, Q3, and max.` },
      { title: 'Data-driven & no library', text: `Computes and draws from a GROUPS array of raw samples in plain HTML/CSS/SVG/JS.` },
    ],
    useCases: [
      { title: 'Comparing distributions', text: `Compare spread and skew across groups — pair with a [histogram](/ui-snippets/histogram/) for one group's shape.` },
      { title: 'Test scores and grades', text: `Show score distributions per class or cohort alongside a [bar chart](/ui-snippets/bar-chart/) of averages.` },
      { title: 'Performance and latency', text: `Visualise response-time spread and outliers across services.` },
      { title: 'Experiment and A/B results', text: `Compare outcome distributions between variants.` },
      { title: 'Scientific and survey data', text: `Summarise sample distributions with quartiles and outliers.` },
      { title: 'Learning quartile math', text: `A reference for IQR, whiskers, and outlier detection — compare with a [scatter plot](/ui-snippets/scatter-plot/).` },
      { icon: 'CODE', title: 'Related: Control Chart with Upper/Lower Control Limits', desc: 'See the [Control Chart with Upper/Lower Control Limits](/ui-snippets/control-chart-spc-limits/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Violin Plot Chart', desc: 'See the [Violin Plot Chart](/ui-snippets/violin-plot-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Streamgraph Chart', desc: 'See the [Streamgraph Chart](/ui-snippets/streamgraph-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the quartiles calculated?', a: `stats() sorts the raw data and uses linear-interpolation quantiles: for a percentile q, it finds the fractional position q × (n − 1), then interpolates between the two surrounding sorted values. This gives Q1 (q=0.25), the median (0.5), and Q3 (0.75). It is the same method most statistical tools use, and computing from raw samples is what makes this a real box plot rather than a styled bar.` },
      { q: 'Why do the whiskers not reach the minimum and maximum?', a: `By the standard Tukey convention, whiskers extend only to the most extreme data points still within 1.5x the interquartile range beyond Q1 and Q3 (the fences). Anything past the fences is an outlier, drawn as its own dot. Running whiskers to the absolute extremes would hide outliers, which defeats the purpose — so the snippet filters by the fences to find the whisker ends and plots the rest as outlier circles.` },
      { q: 'What does the box and median position tell me?', a: `The box spans Q1 to Q3 — the middle 50% of the data — so a taller box means more spread. The median line shows the centre; when it sits off-centre within the box, the distribution is skewed toward the longer side. Comparing boxes across groups on the shared axis reveals differences in centre, spread, and skew that an average alone would hide.` },
      { q: 'How do I change or add groups?', a: `Edit the GROUPS array — each entry is { name, color, data } where data is the raw sample array. Add, remove, or change groups and the quartiles, whiskers, outliers, shared axis, and labels all recompute on the next render(). For real data, fetch your samples, map them into that shape, and call render(); the layout adapts to any number of groups.` },
      { q: 'How do I use this box plot in React, Vue, or Angular?', a: `In React, hold the groups in state and compute stats with useMemo, rendering the SVG glyphs from them (or run render() in a useEffect with a ref); in Vue, use a computed stats array with v-for; in Angular, a getter with *ngFor. The quantile/IQR/outlier math is framework-agnostic and ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the quantile interpolation or the Tukey fence math by hand to trust this chart. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the quantile function interpolates between two sorted values to compute Q1, the median, and Q3, and why the whiskers are drawn from the most extreme in-fence points rather than the raw min and max. The same assistant can help optimize it — asking whether re-sorting each group's full array on every render() call matters at scale, or whether the SVG could be rebuilt incrementally instead of clearing innerHTML and rebuilding every node on each redraw. It's also useful for extending the chart: ask it to add notched boxes for a visual confidence-interval indicator, support horizontal box plots, or animate the box and whiskers growing in on load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "box-and-whisker plot" that computes real statistics from raw sample arrays in plain HTML, CSS, and SVG built with vanilla JavaScript — no charting library, no pre-computed quartiles supplied by the caller.

Requirements:
- Accept input as a plain array of groups, each with a name, a color, and a raw array of numeric samples (not pre-computed statistics).
- Compute Q1, median, and Q3 per group using linear-interpolation quantiles on the sorted sample array (interpolating between the two nearest ranked values, not simple nearest-rank).
- Compute the interquartile range and Tukey fences at 1.5 times the IQR beyond Q1 and Q3, and draw the whiskers only out to the most extreme sample values that still fall within those fences — never to the raw dataset minimum and maximum.
- Draw every sample outside the fences as its own individually plotted outlier point, distinct in color from the box and whiskers.
- Render each group as: a vertical whisker line with horizontal end caps, a semi-transparent rectangle spanning Q1 to Q3 in the group's color, and a bold horizontal median line drawn across the box at the correct height.
- Use one shared y-axis scale computed from the combined minimum and maximum across all groups (rounded to a clean range) so every group's box is positioned on a directly comparable scale, with gridlines and axis tick labels.
- On hovering a box, show a tooltip listing that group's name, minimum, Q1, median, Q3, and maximum, positioned near the cursor.`,
    },
  },
};

export default boxPlot;
