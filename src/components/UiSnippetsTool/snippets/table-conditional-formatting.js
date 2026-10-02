const tableConditionalFormatting = {
  id: 'table-conditional-formatting',
  title: 'Conditional Formatting Table',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tcf-card">
  <div class="tcf-head">
    <h3>Rep performance — units sold</h3>
  </div>
  <div class="tcf-controls">
    <label>Low threshold<input type="number" id="tcfLow" value="40" min="0" max="200"></label>
    <label>High threshold<input type="number" id="tcfHigh" value="80" min="0" max="200"></label>
  </div>
  <table class="tcf-table" id="tcfTable">
    <thead><tr><th>Rep</th><th>Jan</th><th>Feb</th><th>Mar</th><th>Apr</th><th>May</th><th>Jun</th></tr></thead>
    <tbody id="tcfBody"></tbody>
  </table>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#faf7ff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tcf-card{background:#fff;border-radius:14px;padding:16px;width:100%;max-width:620px;box-shadow:0 18px 44px rgba(88,28,135,.1);border:1px solid #ede4fb}
.tcf-head{margin-bottom:10px}
.tcf-head h3{font-size:14px;font-weight:800;color:#3b0764}

.tcf-controls{display:flex;gap:18px;margin-bottom:14px;flex-wrap:wrap}
.tcf-controls label{display:flex;flex-direction:column;gap:4px;font-size:11px;font-weight:700;color:#7c3aed}
.tcf-controls input{width:80px;border:1.5px solid #e9d5ff;border-radius:7px;padding:5px 8px;font-size:12.5px;font-family:inherit;color:#3b0764}
.tcf-controls input:focus{outline:none;border-color:#a855f7}

.tcf-table{width:100%;border-collapse:collapse;font-size:12.5px}
.tcf-table th{text-align:left;padding:8px 10px;color:#8b5cf6;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;border-bottom:1.5px solid #ede4fb}
.tcf-table th:not(:first-child){text-align:center}
.tcf-table td{padding:0;border-bottom:1px solid #f5f0fc}
.tcf-table td:first-child{padding:9px 10px;font-weight:700;color:#3b0764}
.tcf-cell{display:block;text-align:center;padding:9px 6px;font-variant-numeric:tabular-nums;font-weight:700;transition:background .12s,color .12s}`,

  js: `var COLUMNS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
var REPS = [
  { name: 'Priya Nair', jan: 62, feb: 71, mar: 45, apr: 88, may: 92, jun: 78 },
  { name: 'Marcus Webb', jan: 30, feb: 28, mar: 35, apr: 41, may: 38, jun: 44 },
  { name: 'Yuki Tanaka', jan: 95, feb: 101, mar: 87, apr: 76, may: 68, jun: 90 },
  { name: 'Elena Cruz', jan: 55, feb: 60, mar: 58, apr: 33, may: 47, jun: 62 },
  { name: 'Dan Osei', jan: 18, feb: 22, mar: 25, apr: 20, may: 30, jun: 27 },
];

var lowInput = document.getElementById('tcfLow');
var highInput = document.getElementById('tcfHigh');
var body = document.getElementById('tcfBody');

// A real function mapping a value to a color band based on the current threshold controls.
function colorFor(value, low, high) {
  if (value < low) return { bg: '#fee2e2', fg: '#b91c1c' };
  if (value < high) return { bg: '#fef3c7', fg: '#92400e' };
  return { bg: '#dcfce7', fg: '#15803d' };
}

function render() {
  var low = Number(lowInput.value);
  var high = Number(highInput.value);
  if (high < low) high = low;

  body.innerHTML = REPS.map(function (rep) {
    var cells = COLUMNS.map(function (key) {
      var value = rep[key];
      var color = colorFor(value, low, high);
      return '<td><span class="tcf-cell" style="background:' + color.bg + ';color:' + color.fg + '">' + value + '</span></td>';
    }).join('');
    return '<tr><td>' + rep.name + '</td>' + cells + '</tr>';
  }).join('');
}

lowInput.addEventListener('input', render);
highInput.addEventListener('input', render);

render();`,

  seo: {
    title: 'Conditional Formatting Table — Live Threshold Cell Coloring HTML CSS JS',
    description: `A numeric table that colors every cell live from its value against adjustable low/high thresholds, recomputed on the fly, spreadsheet-style. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Conditional Formatting Table — Cells Colored Live From Adjustable Thresholds',
      description: `Spreadsheets have offered conditional formatting for decades because color is the fastest way to scan a grid of numbers for outliers — red for underperforming, green for exceeding target — without reading every value individually. This snippet reimplements that as a genuine live computation: a plain function maps each cell's numeric value to a color band based on two adjustable threshold inputs, and every cell recolors immediately whenever those thresholds change.

**A pure value-to-color function, not precomputed classes**

\`colorFor(value, low, high)\` takes a number and the two current threshold values and returns a background/foreground color pair with three plain \`if\`/\`return\` branches — below \`low\` is red, between \`low\` and \`high\` is amber, at or above \`high\` is green. Nothing about which cells are which color is baked into the markup or the data; every single cell's color is the live output of calling this function during render, which is what makes the thresholds genuinely adjustable rather than cosmetic.

**Number inputs drive a full re-render**

Two \`<input type="number">\` controls hold the current low and high thresholds. Their \`input\` event (firing on every keystroke or spinner click, not just on blur) calls \`render()\`, which re-runs \`colorFor\` against every cell in the table with the new threshold values and rewrites the table body — so dragging or typing a new threshold recolors the entire grid live, the same way dragging a conditional formatting rule's threshold in a spreadsheet does.

**A guard against an inverted range**

If a user sets the high threshold below the low threshold, the three-band logic would produce a nonsensical or empty middle band. \`render()\` clamps \`high\` up to at least \`low\` before computing colors, so the bands always stay in a sane low ≤ middle < high order regardless of what the user types into the controls.

**Style applied inline from computed values, not toggled classes**

Because the color bands are threshold-driven rather than a small fixed set of states, each cell's background and text color are set directly via an inline \`style\` attribute built from \`colorFor\`'s return value, rather than switching between a few predefined CSS classes — the right approach when the underlying value-to-color mapping is a continuous function of user-adjustable numbers rather than a small enum of fixed states.

**Same function, every column**

\`render()\` runs the identical \`colorFor\` call across every numeric column for every rep — there's no per-column special-casing, so adding a seventh month of data or changing which columns exist requires no changes to the coloring logic at all, only to the \`COLUMNS\` array driving which fields get rendered.

**Customizing it**

Add a third or fourth band with more granular thresholds, invert the direction (lower is better) with a toggle, or compute thresholds automatically from the dataset's own mean and standard deviation instead of fixed inputs. Pair with a [multi-column sort table](/ui-snippets/table-multi-sort/) to sort by whichever month is currently most colored.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sales rep performance table renders with cells colored red, amber, or green by value.` },
      { title: 'Adjust the Low threshold input', text: `Every cell below the new low value immediately turns red; the table recolors live.` },
      { title: 'Adjust the High threshold input', text: `Cells at or above the new high value turn green; values between the two turn amber.` },
      { title: 'Set High below Low', text: `The high value automatically clamps up to match low, keeping the three bands sane.` },
      { title: 'Scan for outliers', text: `Colors make it immediately obvious which reps are under or over target across months.` },
      { title: 'Swap in your own data and columns', text: `Replace REPS and COLUMNS — colorFor runs identically across every numeric column.` },
    ] },
    features: [
      { title: 'Pure value-to-color function', text: `colorFor computes a color band from a value and two thresholds — nothing is precomputed or hardcoded.` },
      { title: 'Live threshold controls', text: `Number inputs recolor the entire table on every keystroke via the input event.` },
      { title: 'Three-band classification', text: `Below-low, mid-band, and at-or-above-high map to distinct red/amber/green treatments.` },
      { title: 'Inverted-range guard', text: `High is clamped to never fall below low, keeping the bands coherent under any input.` },
      { title: 'Inline computed styling', text: `Colors are set from the function's live return value, appropriate for a continuous threshold-driven mapping.` },
      { title: 'Uniform across all columns', text: `The same coloring function applies identically to every numeric column with no special-casing.` },
      { title: 'Tabular numeral alignment', text: `Centered, monospaced-width numerals keep the colored grid easy to scan by column.` },
      { title: 'Data-driven, not markup-driven', text: `Adding rows, columns, or changing values requires no changes to the coloring logic.` },
    ],
    useCases: [
      { title: 'Sales performance dashboards', text: 'Spot underperforming reps by colouring each cell from its value against low and high thresholds, recalculated on every keystroke.' },
      { title: 'Inventory stock monitoring', text: 'Colour stock counts red, amber or green according to adjustable limits, with high clamped so it can never fall below low.' },
      { title: 'Budget tracking', text: 'Flag over-budget or under-target lines in a grid, in the same way spreadsheets use conditional formatting for outliers.' },
      { title: 'QA test result matrices', text: 'Colour pass-rate percentages across builds and suites, and compare with a [comparison table](/ui-snippets/comparison-table/) for feature grids.' },
      { title: 'Grading tables', text: 'Highlight scores in a grid, using a pure `colorFor` function that maps a value and two thresholds to a colour band.' },
      { icon: 'CODE', title: 'Related: Nested JSON to Table Mapper', desc: 'See the [Nested JSON to Table Mapper](/ui-snippets/table-nested-json-mapper/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why are the colors set with inline styles instead of CSS classes?', a: `The color bands are driven by two continuously adjustable number inputs, not a small fixed set of states — colorFor computes an actual color value based on where a number falls between two arbitrary thresholds a user can change at any time. Toggling between a handful of predefined CSS classes works for a fixed number of states, but a threshold-driven function is more directly expressed by computing the style value itself in JavaScript and applying it inline.` },
      { q: 'How do I add a fourth color band, like a special color for values far above the high threshold?', a: `Add another comparison branch to colorFor before the final return, e.g. if (value >= high * 1.5) return { bg: '#a7f3d0', fg: '#065f46' } for an "exceptional" band, checked before the regular at-or-above-high case — the render loop and every input control keep working unchanged since they only ever call colorFor and use whatever it returns.` },
      { q: 'How do I make lower values better (invert the color direction)?', a: `Swap which branch returns red and which returns green in colorFor — the below-low branch would return the green color pair and the at-or-above-high branch would return red, since the function only decides which color a range gets, not which direction is "good." Everything else (the threshold inputs, the render loop) is unaffected.` },
      { q: 'How do I compute the thresholds automatically instead of using fixed number inputs?', a: `Before rendering, calculate the dataset's mean and standard deviation (or a percentile) across all visible values, and set low/high to something like mean minus one standard deviation and mean plus one standard deviation instead of reading them from the input fields — colorFor itself doesn't need to change, since it only needs any two numeric thresholds passed in.` },
      { q: 'How do I use this conditional formatting table in React, Vue, or Angular?', a: `Keep colorFor as a pure, framework-independent function. Store the low and high threshold values in component state bound to two number inputs, and compute each cell's inline style (or CSS custom properties) by calling colorFor(value, low, high) during render — the function itself needs no changes since it takes plain numbers and returns a plain color pair.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through the threshold math on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why colorFor is written as a pure function taking a value plus the two current threshold numbers, rather than precomputing a color for every cell once and storing it, and how that choice is what makes the coloring genuinely live rather than a fixed set of highlighted values. The same assistant can help you extend it — ask it to add a fourth color band for extreme outliers, compute thresholds automatically from the dataset's statistical mean and standard deviation instead of manual inputs, or add a legend that dynamically shows the current threshold values next to their color swatches. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "conditional formatting" numeric data table in plain HTML, CSS, and JavaScript with no library — cell background and text color are computed live from each cell's value against adjustable threshold controls, the way spreadsheet conditional formatting rules work.

Requirements:
- Write a pure function, e.g. colorFor(value, lowThreshold, highThreshold), that takes a numeric cell value and the two current threshold numbers and returns a color pair (background and foreground) based on which of three bands the value falls into: below the low threshold, between the two thresholds, or at/above the high threshold. This function must be the single source of truth for every cell's color — no color should be hardcoded or precomputed anywhere else.
- Add two number input controls on the page for the low and high thresholds, pre-filled with reasonable default values, and wire both to the input event (which fires on every keystroke and spinner click, not just on blur) so that changing either value triggers an immediate full re-render of the table.
- In the render function, guard against the high threshold being set below the low threshold by clamping high up to at least equal low before computing any colors, so the three bands never become inverted or nonsensical regardless of what a user types into the controls.
- Render a data table with one row per entity and several numeric columns (e.g. monthly figures), where every single cell's background and text color is set by calling colorFor with that cell's value and the current threshold state, applied as an inline style since the color is a computed continuous value rather than one of a small fixed set of CSS classes.
- Make sure the coloring logic works identically across every column with no per-column special-casing, so adding a new numeric column to the underlying data array requires no changes to the coloring function itself.
- Confirm changing either threshold input visibly and immediately recolors every affected cell across the entire table, not just the row or column nearest the control.`,
    },
  },
};

export default tableConditionalFormatting;
