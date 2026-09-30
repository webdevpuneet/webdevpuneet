const histogram = {
  id: 'histogram',
  title: 'Histogram',
  lastmod: '2026-06-23',
  category: 'charts',
  html: `<div class="hg-card">
  <div class="hg-head">
    <h3>Response time distribution</h3>
    <label class="hg-bins">Bins
      <select id="hgBins"><option>8</option><option selected>12</option><option>20</option></select>
    </label>
  </div>
  <svg class="hg-svg" id="hgSvg" viewBox="0 0 380 220" role="img" aria-label="Histogram"></svg>
  <div class="hg-axis" id="hgAxis"></div>
  <div class="hg-tip" id="hgTip" hidden></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.hg-card{position:relative;background:#fff;border-radius:16px;padding:22px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.08)}
.hg-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:14px}
.hg-head h3{font-size:16px;font-weight:800;color:#0f172a}
.hg-bins{font-size:12px;font-weight:700;color:#64748b;display:flex;align-items:center;gap:7px}
.hg-bins select{border:1.5px solid #e2e8f0;border-radius:7px;padding:4px 7px;font-size:12px;font-family:inherit;font-weight:700;color:#0f172a}

.hg-svg{width:100%;height:auto;display:block}
.hg-grid{stroke:#eef2f7;stroke-width:1}
.hg-bar{fill:#6366f1;cursor:pointer;transition:fill .12s}
.hg-bar:hover{fill:#4f46e5}
.hg-axis{display:flex;justify-content:space-between;margin-top:6px;padding:0 2px;font-size:10px;font-weight:600;color:#94a3b8}

.hg-tip{position:absolute;pointer-events:none;background:#0f172a;color:#fff;font-size:12px;font-weight:700;padding:6px 10px;border-radius:8px;transform:translate(-50%,-130%);white-space:nowrap;z-index:5}
.hg-tip[hidden]{display:none}`,

  js: `// Raw measurements (e.g. API response times in ms). A histogram bins these.
var DATA = [120,135,140,142,150,151,155,158,160,162,165,168,170,172,175,178,180,182,185,188,190,192,195,198,200,205,210,215,220,118,145,167,177,189,201,159,163,171,183,193,148,156,164,174,186,196,152,169,179,191];

var svg = document.getElementById('hgSvg');
var axis = document.getElementById('hgAxis');
var tip = document.getElementById('hgTip');
var card = document.querySelector('.hg-card');
var binsSel = document.getElementById('hgBins');
var SVGNS = 'http://www.w3.org/2000/svg';
var W = 380, H = 220, PAD = 30;

function bin(count) {
  var min = Math.min.apply(null, DATA), max = Math.max.apply(null, DATA);
  var width = (max - min) / count;
  var bins = [];
  for (var i = 0; i < count; i++) bins.push({ lo: min + i * width, hi: min + (i + 1) * width, n: 0 });
  DATA.forEach(function (v) {
    var idx = Math.min(count - 1, Math.floor((v - min) / width));
    bins[idx].n++;
  });
  return bins;
}

function render() {
  var count = +binsSel.value;
  var bins = bin(count);
  var maxN = Math.max.apply(null, bins.map(function (b) { return b.n; }));
  var bw = (W - PAD * 2) / count;
  svg.innerHTML = '';
  for (var g = 0; g <= 4; g++) {
    var gy = PAD + g * (H - PAD * 2) / 4;
    svg.appendChild(line('hg-grid', PAD, gy, W - PAD, gy));
  }
  bins.forEach(function (b, i) {
    var h = maxN ? (b.n / maxN) * (H - PAD * 2) : 0;
    var x = PAD + i * bw;
    var rect = document.createElementNS(SVGNS, 'rect');
    rect.setAttribute('class', 'hg-bar');
    rect.setAttribute('x', x + 1);
    rect.setAttribute('y', H - PAD - h);
    rect.setAttribute('width', bw - 2);
    rect.setAttribute('height', h);
    rect.setAttribute('rx', 2);
    rect.dataset.range = Math.round(b.lo) + '–' + Math.round(b.hi);
    rect.dataset.n = b.n;
    svg.appendChild(rect);
  });
  // A few axis ticks across the range.
  var min = Math.min.apply(null, DATA), max = Math.max.apply(null, DATA);
  axis.innerHTML = [0, .25, .5, .75, 1].map(function (f) {
    return '<span>' + Math.round(min + f * (max - min)) + '</span>';
  }).join('');
}

function line(cls, x1, y1, x2, y2) {
  var l = document.createElementNS(SVGNS, 'line');
  l.setAttribute('class', cls); l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
  return l;
}

svg.addEventListener('mousemove', function (e) {
  var bar = e.target.closest('.hg-bar');
  if (!bar) { tip.hidden = true; return; }
  var r = card.getBoundingClientRect();
  tip.innerHTML = bar.dataset.range + 'ms: <b>' + bar.dataset.n + '</b>';
  tip.style.left = (e.clientX - r.left) + 'px';
  tip.style.top = (e.clientY - r.top) + 'px';
  tip.hidden = false;
});
svg.addEventListener('mouseleave', function () { tip.hidden = true; });
binsSel.addEventListener('change', render);

render();`,

  seo: {
    title: 'Histogram — HTML CSS JS SVG Histogram (No Library)',
    description: `A histogram that bins raw values into adjustable buckets and draws an SVG frequency chart with hover tooltips. No library. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Histogram — Bin Raw Data into Adjustable Buckets and Draw the Distribution',
      description: `A histogram answers "how is this data distributed?" — it bins a set of raw measurements into ranges and shows how many values fall in each, revealing the shape (normal, skewed, bimodal) that a list of numbers hides. This snippet builds a real histogram in plain HTML, CSS, SVG, and vanilla JavaScript: it bins raw data itself, lets you change the bin count live, and draws adjoining bars with hover tooltips — no charting library.

**Binning is the actual work**

Unlike a bar chart (where you supply pre-aggregated values), a histogram takes *raw* numbers and computes the buckets. \`bin(count)\` finds the data's min and max, divides that range into equal-width bins, then drops each value into its bin by index (\`floor((v − min) / width)\`), with the maximum value clamped into the last bin so the top edge isn't lost. The output is an array of \`{ lo, hi, n }\` — the frequency per range. This binning logic is what makes it a histogram rather than a bar chart, and it's the part people get subtly wrong (off-by-one at the upper edge).

**Adjustable bin count**

The number of bins dramatically changes a histogram's story — too few hides structure, too many turns it into noise. A selector lets you switch between 8, 12, and 20 bins and re-bins live, so you can find the resolution that reveals the distribution's real shape. Re-binning recomputes everything from the raw data, so the bars, scaling, and axis all update together.

**Adjoining bars, scaled to the tallest bin**

Histogram bars touch (unlike a categorical bar chart's gapped bars) because the x-axis is a continuous range, not discrete categories — the snippet draws them edge-to-edge with only a hairline separation. Each bar's height is its count as a fraction of the busiest bin, drawn as an SVG \`rect\` from the baseline up, with gridlines behind for reading frequencies.

**Tooltips with the range and count**

Hovering a bar shows its value range and exact count ("165–172ms: 9"), positioned at the cursor via \`getBoundingClientRect\`, with one delegated \`mousemove\` listener on the SVG. The range labels come from the bin edges, so the reader sees exactly which values each bar represents — essential for a histogram, where the bar's position encodes a range rather than a single label.

**Data-driven and drop-in**

Point it at any array of raw numbers — response times, ages, scores, prices — and it bins and draws the distribution. Because it's dependency-free SVG, it's crisp at any size and a clear reference for the binning algorithm and frequency scaling that underpin every histogram and distribution chart. One thing worth noting if your raw values include outliers: equal-width binning (used here) puts a handful of extreme values into mostly-empty bins out at the edges, stretching the range and squashing the interesting part of the distribution into fewer bins — for heavily skewed data, computing bin edges over a clipped percentile range instead of the true min/max usually tells a clearer story.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A histogram renders, binning 50 sample measurements into adjoining frequency bars.` },
      { title: 'Change the bin count', text: `Use the Bins selector (8/12/20) to re-bin the data live and see the distribution at different resolutions.` },
      { title: 'Hover a bar', text: `See that bin's value range and exact count in a tooltip.` },
      { title: 'Swap in your data', text: `Replace the DATA array with your own raw numbers — binning is automatic.` },
      { title: 'Add bin options', text: `Add more <option> values to the selector for finer or coarser binning.` },
      { title: 'Wire to an API', text: `Fetch raw values, assign them to DATA, and call render() to draw the live distribution.` },
    ] },
    features: [
      { title: 'Real binning algorithm', text: `Bins raw values into equal-width buckets with correct upper-edge clamping.` },
      { title: 'Adjustable bin count', text: `Switch bin counts live to find the resolution that reveals the distribution's shape.` },
      { title: 'Adjoining bars', text: `Bars touch because the x-axis is a continuous range, not discrete categories.` },
      { title: 'Frequency scaling', text: `Each bar's height is its count as a fraction of the busiest bin.` },
      { title: 'Range + count tooltips', text: `Hovering shows the bin's value range and exact frequency.` },
      { title: 'Range axis ticks', text: `Axis labels mark the min, quartiles, and max of the data range.` },
      { title: 'Event delegation', text: `One mousemove listener handles every bar via closest().` },
      { title: 'Data-driven & no library', text: `Bins and draws from a raw DATA array in plain HTML/CSS/SVG/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Performance distributions', text: `Show response-time or latency spread — pair with a [line chart](/ui-snippets/line-chart-widget/) for trends.` },
      { title: 'Analytics and metrics', text: `Visualise the distribution of session lengths, order values, or scores alongside a [bar chart](/ui-snippets/bar-chart/).` },
      { title: 'Survey and rating spread', text: `See how responses cluster, complementing a [rating breakdown](/ui-snippets/rating-breakdown/).` },
      { title: 'Pricing and demographics', text: `Show price bands or age distributions for a dataset.` },
      { title: 'Scientific and lab data', text: `Reveal the shape of measurement data without a plotting library.` },
      { title: 'Learning the binning algorithm', text: `A reference for histogram binning and frequency scaling — compare with a [box plot](/ui-snippets/box-plot/).` },
      { icon: 'CODE', title: 'Related: Range Bar Chart', desc: 'See the [Range Bar Chart](/ui-snippets/range-bar-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is a histogram different from a bar chart?', a: `A bar chart plots pre-aggregated values for discrete categories with gaps between bars. A histogram takes raw continuous data, bins it into equal-width ranges, and counts how many values fall in each — so its bars touch (the x-axis is a continuous scale) and represent ranges, not labels. This snippet does the binning itself, which is what makes it a true histogram.` },
      { q: 'How does the binning handle the maximum value?', a: `Each value's bin index is floor((value − min) / binWidth). The maximum value would compute to an index equal to the bin count (one past the last bin), so it's clamped with Math.min(count − 1, …) into the final bin. Without this clamp the largest value would be dropped — the classic off-by-one error in histogram binning.` },
      { q: 'Why does changing the bin count matter so much?', a: `The number of bins controls the histogram's resolution. Too few bins smooth away real structure (you might miss that the data is bimodal); too many produce a spiky, noisy chart where each bin holds one or two values. Letting you switch bin counts live lets you find the count that best reveals the distribution's true shape — a core part of reading histograms.` },
      { q: 'Why do histogram bars touch instead of having gaps?', a: `Because the x-axis is a continuous numeric range, not a set of separate categories. Adjacent bars represent adjacent value ranges with no gap between them, so they're drawn edge-to-edge (here with a 1px hairline for legibility). Gapped bars would imply discrete categories, which is a bar chart, not a histogram.` },
      { q: 'How do I use this histogram in React, Vue, or Angular?', a: `In React, hold the raw data and bin count in useState, compute bins with useMemo, and render rects from .map() (or run the imperative render in useEffect with a ref); in Vue, use a computed bins array; in Angular, a getter with *ngFor. The bin() algorithm and scaling are framework-agnostic and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the binning math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the bin function clamps the max value's index with Math.min(count - 1, ...), or how changing the bin count selector recomputes the entire distribution from the raw DATA array. The same assistant is useful for optimizing it — ask whether equal-width binning is the right choice for heavily skewed data with outliers, or whether percentile-clipped bin edges would tell a clearer story, as the about section hints at. It's just as handy for extending the chart: ask it to add a toggle between equal-width and equal-frequency (quantile) binning, overlay a normal-distribution curve for comparison, or add a brush-select interaction that highlights a range of bins and reports their combined count. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a histogram chart in plain HTML, CSS, and SVG built with vanilla JavaScript — no charting library.

Requirements:
- Start from a flat array of raw numeric measurements (not pre-aggregated categories).
- Write a binning function that takes a bin count, finds the data's min and max, divides that range into that many equal-width buckets, and counts how many raw values fall into each bucket using floor((value - min) / binWidth) as the index — with the index clamped to the last bin so the maximum value is never dropped due to an off-by-one edge case.
- Render the bins as adjoining SVG rect bars (touching edge to edge with only a hairline gap, not the gapped bars of a categorical bar chart), scaled so the tallest bin's bar reaches the full chart height and the rest are proportional to it.
- Include a selector control that lets the user switch between at least three different bin counts, and re-run the entire binning and redraw whenever it changes.
- Draw a few horizontal gridlines behind the bars and a row of axis labels beneath the chart showing the data's min, quartiles, and max values.
- Attach a single delegated mousemove listener on the SVG (not one listener per bar) that detects which bar is under the cursor via closest, and shows a tooltip with that bin's value range and exact count positioned near the cursor using the container's bounding rect.
- Make the whole chart re-derivable from a new raw data array with no structural changes — swapping the array and calling the render function should be sufficient.`,
    },
  },
};

export default histogram;
