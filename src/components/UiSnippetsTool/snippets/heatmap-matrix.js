const heatmapMatrix = {
  id: 'heatmap-matrix',
  title: 'Heatmap Matrix',
  lastmod: '2026-06-17',
  category: 'charts',
  html: `<div class="hm-card">
  <div class="hm-head">
    <h2 class="hm-title">Activity by hour</h2>
    <div class="hm-legend"><span>Low</span><div class="hm-scale"></div><span>High</span></div>
  </div>
  <div class="hm-plot" id="hmPlot">
    <div class="hm-grid" id="hmGrid"></div>
    <div class="hm-tip" id="hmTip"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.hm-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:20px;width:100%;max-width:480px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.hm-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px;flex-wrap:wrap;gap:10px}
.hm-title{font-size:16px;font-weight:800;color:#1e293b}
.hm-legend{display:flex;align-items:center;gap:7px;font-size:11px;color:#94a3b8;font-weight:600}
.hm-scale{width:80px;height:9px;border-radius:5px;background:linear-gradient(90deg,#eef2ff,#6366f1)}

.hm-plot{position:relative}
.hm-grid{display:grid;gap:4px}
.hm-corner{}
.hm-collab,.hm-rowlab{font-size:10px;font-weight:700;color:#94a3b8;display:flex;align-items:center;justify-content:center}
.hm-rowlab{justify-content:flex-end;padding-right:6px}
.hm-cell{aspect-ratio:1;border-radius:5px;cursor:pointer;transition:transform .12s,box-shadow .12s}
.hm-cell:hover{transform:scale(1.18);box-shadow:0 4px 10px rgba(15,23,42,.18);z-index:1;position:relative}

.hm-tip{position:absolute;background:#1e293b;color:#fff;font-size:11px;font-weight:600;padding:6px 9px;border-radius:7px;white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .12s;transform:translate(-50%,-115%);box-shadow:0 6px 18px rgba(0,0,0,.3);z-index:3}
.hm-tip b{font-weight:800}`,

  js: `var ROWS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var COLS = ['6a', '9a', '12p', '3p', '6p', '9p'];
var grid = document.getElementById('hmGrid');
var plot = document.getElementById('hmPlot');
var tip = document.getElementById('hmTip');
var DATA = [];

function gen() {
  return ROWS.map(function (_, r) {
    return COLS.map(function (_, c) {
      var mid = 1 - Math.abs(c - 2.5) / 3;            // busier midday
      var wk = r < 5 ? 1 : 0.45;                       // quieter weekend
      return Math.round((mid * wk * 80 + Math.random() * 25));
    });
  });
}

function build() {
  DATA = gen();
  var max = Math.max.apply(null, DATA.map(function (row) { return Math.max.apply(null, row); }));
  grid.style.gridTemplateColumns = '34px repeat(' + COLS.length + ', 1fr)';

  var html = '<div class="hm-corner"></div>';
  COLS.forEach(function (c) { html += '<div class="hm-collab">' + c + '</div>'; });

  DATA.forEach(function (row, r) {
    html += '<div class="hm-rowlab">' + ROWS[r] + '</div>';
    row.forEach(function (v, c) {
      var a = 0.08 + 0.92 * (v / max);
      var fg = a > 0.55 ? '#fff' : '#475569';
      html += '<div class="hm-cell" data-r="' + r + '" data-c="' + c + '" data-v="' + v + '" ' +
        'style="background:rgba(99,102,241,' + a.toFixed(2) + ');color:' + fg + '"></div>';
    });
  });
  grid.innerHTML = html;

  grid.querySelectorAll('.hm-cell').forEach(function (cell) {
    cell.addEventListener('mouseenter', function () { show(cell); });
  });
  plot.addEventListener('mouseleave', function () { tip.style.opacity = '0'; });
}

function show(cell) {
  var r = +cell.dataset.r, c = +cell.dataset.c, v = cell.dataset.v;
  tip.innerHTML = ROWS[r] + ' ' + COLS[c] + ' · <b>' + v + '</b> sessions';
  tip.style.left = (cell.offsetLeft + cell.offsetWidth / 2) + 'px';
  tip.style.top = cell.offsetTop + 'px';
  tip.style.opacity = '1';
}

build();`,

  seo: {
    title: 'Heatmap Matrix — Value Grid HTML CSS JS Snippet',
    description: `Colour-scaled heatmap matrix with row/column labels, intensity cells, a hover zoom + tooltip, and a low-to-high legend. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Heatmap Matrix — Intensity Cells, Row/Column Labels & Hover Tooltip`,
      description: `A heatmap matrix turns a two-dimensional table of numbers into a grid of colour, so patterns — busy hours, hot correlations, high-traffic cells — jump out instantly. Unlike a calendar heatmap, a matrix maps any rows against any columns (days × hours, products × regions, features × cohorts). This snippet builds one from a 2D array in plain HTML, CSS, and vanilla JavaScript: colour-scaled cells, row and column labels, a hover zoom with a tooltip, and a low-to-high legend.

**Colour encodes value**

\`build\` finds the maximum value across the whole matrix, then colours each cell with a single hue at an alpha proportional to its value (\`0.08 + 0.92 × v/max\`). Low values are nearly white, high values are saturated indigo — a perceptually simple "more colour = more value" scale that needs no legend to interpret, though one is provided. The cell's text colour flips to white above a contrast threshold so any in-cell labels stay legible on dark cells. Colours are written as literal \`rgba(...)\` inline styles, so they render identically across every framework export.

**CSS Grid layout with labels**

The matrix is a single CSS Grid: the first column is a fixed label track and the rest are equal fractions (\`34px repeat(n, 1fr)\`). The first row holds a blank corner plus the column labels; each subsequent row starts with its row label followed by the value cells. Cells use \`aspect-ratio: 1\` so they stay square as the card resizes — no JavaScript sizing needed.

**Hover zoom and tooltip**

Each cell lifts and scales on hover (\`transform: scale(1.18)\` with a shadow and raised z-index), a tactile cue that also enlarges the cell you are inspecting. On \`mouseenter\`, \`show\` reads the cell's \`data-r\`/\`data-c\`/\`data-v\` attributes and positions a dark tooltip above it ("Wed 12p · 64 sessions"), giving the precise value that colour alone can only approximate. Leaving the plot hides the tooltip.

**Data-driven and self-scaling**

The whole grid derives from \`ROWS\`, \`COLS\`, and a 2D \`DATA\` array. A \`gen\` function fabricates a realistic pattern (busier midday, quieter weekends) for the demo; swap it for your real matrix and call \`build\` — the colour scale, labels, and grid columns all adapt to the new dimensions automatically.

Pair this with a [stacked bar chart](/ui-snippets/stacked-bar-chart/) for composition, an [activity heatmap](/ui-snippets/activity-heatmap/) for calendar-style data, or a [metric card grid](/ui-snippets/metric-card-grid/) for headline numbers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An "Activity by hour" card appears with a 7×6 grid of indigo cells, day labels down the left, hour labels across the top, and a low-to-high legend.` },
      { title: 'Read the pattern', text: `Darker cells mean more activity — midday weekdays glow strongest, weekends and early hours stay pale.` },
      { title: 'Hover a cell', text: `It zooms slightly and a tooltip shows the exact value ("Wed 12p · 64 sessions").` },
      { title: 'Scan rows and columns', text: `The labels let you read any cell as a row × column intersection at a glance.` },
      { title: 'Check the legend', text: `The gradient bar maps the pale-to-saturated scale used by the cells.` },
      { title: 'Plug in your data', text: `Replace \`ROWS\`, \`COLS\`, and the \`gen\` data with your matrix and call \`build\`; colours auto-scale to the new max.` },
    ] },
    features: [
      { title: 'Value-proportional colour', text: `Each cell's alpha is \`0.08 + 0.92 × v/max\`, a simple perceptual "more colour = more value" scale with no config.` },
      { title: 'Contrast-safe text', text: `In-cell text colour flips to white above a threshold so labels stay legible on dark cells.` },
      { title: 'CSS Grid with labels', text: `One grid lays out a fixed label column plus equal-fraction value columns, with a header row of column labels.` },
      { title: 'Square self-sizing cells', text: `\`aspect-ratio: 1\` keeps cells square as the card resizes — no JavaScript measurement.` },
      { title: 'Hover zoom', text: `Cells scale and lift with a shadow on hover, enlarging the one you inspect and signalling interactivity.` },
      { title: 'Precise tooltip', text: `\`show\` reads \`data-r\`/\`data-c\`/\`data-v\` and positions a tooltip with the exact value colour alone can't convey.` },
      { title: 'Literal rgba colours', text: `Cell colours are inline \`rgba(...)\` strings, so they render identically across HTML, React, Vue, and Tailwind exports.` },
      { title: 'Dimension-agnostic', text: `The grid derives columns and rows from \`ROWS\`/\`COLS\`/\`DATA\`, so any matrix size works without layout changes.` },
    ],
    useCases: [
      { title: 'Usage and activity patterns', text: `Sessions by day-and-hour to find peak times. Pair with an [activity heatmap](/ui-snippets/activity-heatmap/) for the calendar view.` },
      { title: 'Correlation matrices', text: `Visualise feature or metric correlations in analytics and data-science dashboards, where intensity shows strength.` },
      { title: 'Cohort and retention grids', text: `Retention by signup cohort × week, a classic heatmap that reveals drop-off bands at a glance.` },
      { title: 'Product / region performance', text: `Sales by product × region with hover values; combine with a [stacked bar chart](/ui-snippets/stacked-bar-chart/) for breakdowns.` },
      { title: 'Availability and scheduling', text: `Booking density by day × slot; works alongside a [schedule table](/ui-snippets/schedule-table/) for the detail.` },
      { title: 'Risk and status matrices', text: `Likelihood × impact grids in project and security dashboards where colour communicates severity.` },
      { icon: 'CODE', title: 'Related: Range Bar Chart', desc: 'See the [Range Bar Chart](/ui-snippets/range-bar-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I plug in my own matrix?', a: `Set \`ROWS\` and \`COLS\` to your labels and assign your 2D numbers to \`DATA\` (skip the \`gen\` generator), then call \`build\`. It computes the global max and recolours every cell, and \`gridTemplateColumns\` adapts to the number of columns — so any dimensions work without other changes.` },
      { q: 'How do I use a multi-colour (diverging) scale?', a: `For data centred on zero (e.g. correlations from −1 to 1), interpolate between two hues through white: map negative values toward one colour and positive toward another, with white at zero. Replace the single-hue alpha calc in \`build\` with an interpolation function that returns an \`rgb(...)\` based on the signed, normalised value, and update the legend gradient to match.` },
      { q: 'How do I handle very large matrices?', a: `SVG/DOM cells are fine up to a few thousand. Beyond that, render to a Canvas (one \`fillRect\` per cell) for performance and overlay a single tooltip computed from the cursor's grid coordinates. For huge matrices, also consider virtualising rows so only visible cells exist in the DOM.` },
      { q: 'Is a heatmap accessible?', a: `Colour alone is not accessible, so the tooltip exposes the exact value on hover, and you should add an \`aria-label\` per cell ("Wednesday 12pm, 64 sessions") plus a \`role="img"\` or an off-screen data table for screen-reader users. Ensure the scale is distinguishable for colour-blind users — a single-hue lightness ramp (as used here) is generally safe.` },
      { q: 'How do I use this heatmap in React, Vue, or Angular?', a: `In React, compute the max with \`useMemo\` and render cells from your 2D array with inline \`rgba\` styles, tracking the hovered cell in \`useState\` for the tooltip — no manual DOM building. In Vue, use nested \`v-for\` with \`:style\`. In Angular, \`*ngFor\` with \`[style.background]\`. The colour math and grid CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the color math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the alpha formula 0.08 plus 0.92 times v over max maps raw values onto a single-hue scale, or why the grid-template-columns string is rebuilt dynamically instead of hardcoded. The same assistant is useful for optimizing it — ask whether rebuilding the entire grid's innerHTML on every build call would scale to a much larger matrix, say fifty rows by fifty columns, or whether it should switch to canvas rendering at that size. It's just as handy for extending the heatmap: ask it to add a diverging two-color scale for signed data like correlations, support click-to-drill-down into a cell's time series, or add keyboard navigation between cells for accessibility. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a heatmap matrix in plain HTML, CSS, and JavaScript using CSS Grid — no canvas, no SVG, no charting library.

Requirements:
- Accept a row labels array, a column labels array, and a 2D array of numeric values with one row per row label and one value per column label.
- Compute the maximum value across the entire 2D array, then color every cell using a single hue whose alpha channel is 0.08 plus 0.92 times that cell's value divided by the max, written as a literal rgba(...) inline style (not a CSS variable or class lookup).
- Flip each cell's text color to white above a defined alpha/contrast threshold and keep it a dark gray below that threshold, so any in-cell label text stays legible regardless of background darkness.
- Lay the grid out as one CSS Grid whose first column is a fixed-width label track and remaining columns are equal fractions, with grid-template-columns built dynamically as a string from the column count (not hardcoded), a header row of column labels, and a leading row label before each row of value cells.
- Give every cell an aspect-ratio of 1 so cells stay square as the container resizes, without any JavaScript measuring their size.
- Attach a single mouseenter listener per cell that reads its row, column, and value from data attributes and positions a tooltip using the cell's offsetLeft/offsetTop/offsetWidth, hiding the tooltip on mouseleave from the plot container.
- Make the whole thing regenerate correctly if given a completely different-sized matrix (different row/column counts) with no other code changes.`,
    },
  },
};

export default heatmapMatrix;
