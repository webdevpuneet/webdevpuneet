const tableStickySummaryRow = {
  id: 'table-sticky-summary-row',
  title: 'Sticky Summary/Totals Row',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tsr-card">
  <div class="tsr-head">
    <h3>Monthly expenses</h3>
    <p class="tsr-hint">Scroll the table — totals stay pinned to the bottom.</p>
  </div>
  <div class="tsr-scroll" id="tsrScroll">
    <table class="tsr-table">
      <thead><tr><th>Category</th><th class="tsr-num">Budget</th><th class="tsr-num">Spent</th><th class="tsr-num">Remaining</th></tr></thead>
      <tbody id="tsrBody"></tbody>
      <tfoot><tr id="tsrSummary"></tr></tfoot>
    </table>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0e1420;color:#e5e9f5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tsr-card{background:#161d2e;border-radius:14px;padding:16px;width:100%;max-width:560px;border:1px solid #242c42;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.tsr-head{margin-bottom:10px}
.tsr-head h3{font-size:14px;font-weight:800}
.tsr-hint{font-size:11px;color:#8791ae;font-weight:600;margin-top:2px}

.tsr-scroll{max-height:300px;overflow-y:auto;border:1px solid #242c42;border-radius:10px}
.tsr-table{width:100%;border-collapse:collapse;font-size:12.5px}
.tsr-table thead th{position:sticky;top:0;background:#1b2338;color:#8b94b8;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;text-align:left;padding:9px 12px;border-bottom:1.5px solid #242c42;z-index:2}
.tsr-num{text-align:right!important;font-variant-numeric:tabular-nums}
.tsr-table tbody td{padding:9px 12px;border-bottom:1px solid #1e2537;color:#d3d8ec}
.tsr-table tbody tr:hover{background:#1a2136}

.tsr-table tfoot td{position:sticky;bottom:0;background:#20293f;color:#f4f6fc;font-weight:800;padding:10px 12px;border-top:2px solid #6366f1;z-index:3}
.tsr-table tfoot tr{position:sticky;bottom:0}`,

  js: `var CATEGORIES = [
  { name: 'Engineering tools', budget: 12000, spent: 9800 },
  { name: 'Cloud infrastructure', budget: 34000, spent: 38200 },
  { name: 'Office & facilities', budget: 8000, spent: 6100 },
  { name: 'Marketing campaigns', budget: 21000, spent: 19850 },
  { name: 'Travel & events', budget: 6000, spent: 4300 },
  { name: 'Recruiting', budget: 15000, spent: 11200 },
  { name: 'Software licenses', budget: 9000, spent: 9400 },
  { name: 'Contractor fees', budget: 18000, spent: 16750 },
];

function money(n) { return '$' + n.toLocaleString(); }

var body = document.getElementById('tsrBody');
body.innerHTML = CATEGORIES.map(function (c) {
  var remaining = c.budget - c.spent;
  var color = remaining < 0 ? '#f87171' : '#d3d8ec';
  return '<tr>' +
    '<td>' + c.name + '</td>' +
    '<td class="tsr-num">' + money(c.budget) + '</td>' +
    '<td class="tsr-num">' + money(c.spent) + '</td>' +
    '<td class="tsr-num" style="color:' + color + '">' + money(remaining) + '</td>' +
  '</tr>';
}).join('');

// The totals row is computed live from the actual row data, never hardcoded.
function computeTotals(rows) {
  return rows.reduce(function (acc, r) {
    acc.budget += r.budget;
    acc.spent += r.spent;
    return acc;
  }, { budget: 0, spent: 0 });
}

var totals = computeTotals(CATEGORIES);
var remainingTotal = totals.budget - totals.spent;
document.getElementById('tsrSummary').innerHTML =
  '<td>Total</td>' +
  '<td class="tsr-num">' + money(totals.budget) + '</td>' +
  '<td class="tsr-num">' + money(totals.spent) + '</td>' +
  '<td class="tsr-num" style="color:' + (remainingTotal < 0 ? '#f87171' : '#4ade80') + '">' + money(remainingTotal) + '</td>';`,

  seo: {
    title: 'Sticky Summary Row — Pinned Totals Footer HTML CSS JS',
    description: `A scrolling data table whose totals row stays pinned to the bottom of the viewport via real position:sticky, computed live from the row data. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Sticky Summary Row — Pinned Totals Computed Live From Real Row Data',
      description: `A totals row buried at the bottom of a long scrollable table is only useful the moment you happen to scroll all the way down to it — the rest of the time, the sums you actually want to reference while scanning the data are out of view. This snippet keeps the summary row pinned to the bottom of the visible scroll area at all times using genuine \`position: sticky\`, with every total computed live from the row data rather than typed in by hand.

**A tfoot pinned with position: sticky, not a fixed overlay**

The totals row lives in a real \`<tfoot>\`, and its cells get \`position: sticky; bottom: 0\` within the scrolling container — the browser-native mechanism for pinning an element to an edge of its nearest scrolling ancestor. This is the vertical counterpart to a [sticky header table](/ui-snippets/sticky-header-table/), which pins the \`<thead>\` to \`top: 0\` the same way; here it's the footer pinned to the bottom instead, so both ends of a long table can stay visible simultaneously while only the body scrolls between them.

**Real aggregation, not a hardcoded row**

\`computeTotals()\` runs a genuine \`Array.prototype.reduce\` over the live \`CATEGORIES\` array, summing the \`budget\` and \`spent\` fields across every row into a single accumulator object — nothing about the totals row's numbers is typed in directly. Change a value in the source data, add or remove a category, and the totals recompute correctly the next time this function runs, because they are a direct function of the actual rows, never a separately maintained number that could drift out of sync.

**A derived total, not just two summed totals**

The remaining-budget total isn't summed directly from a "remaining" field — it's derived as \`totals.budget - totals.spent\` after the two real column sums are already computed, matching how the per-row remaining values are themselves computed as \`budget - spent\` rather than stored. This keeps a single consistent definition of "remaining" used both per-row and in aggregate, so the footer's math always agrees with what you'd get by manually summing every row's own remaining column.

**Elevated z-index so scrolling content passes beneath it cleanly**

As body rows scroll past underneath the pinned footer, the summary row needs a higher \`z-index\` and an opaque background or scrolling rows would visibly show through it — set here alongside a distinct top border and heavier font weight so the summary row also reads visually as the "final word" on the data above it, not just another row.

**Consistent styling logic between rows and the total**

The negative-remaining highlight (a warning color when a category is over budget) uses the exact same conditional check in both the per-row loop and the summary computation — \`remaining < 0\` — so the visual language for "over budget" is identical whether you're looking at one category or the aggregate across all of them.

**Customizing it**

Add an average alongside the sum, compute per-column totals generically by iterating column keys instead of naming each field, or combine with a [virtualized table](/ui-snippets/virtualized-table/) for a sticky summary over a very large scrolling dataset.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An eight-row expense table renders with a Total row already visible at the bottom.` },
      { title: 'Scroll the table body', text: `The Total row stays pinned to the bottom of the visible scroll area as rows pass beneath it.` },
      { title: 'Check the numbers', text: `Budget, Spent, and Remaining totals are computed live from the actual row values via reduce.` },
      { title: `Edit a row's budget or spent value`, text: `The totals recompute the next render — nothing about the summary is hand-typed.` },
      { title: 'Add or remove a category', text: `The totals update correctly to reflect exactly the rows currently in the data array.` },
      { title: 'Watch an over-budget category', text: `Its Remaining value and the aggregate Remaining both use the same negative-value highlight.` },
    ] },
    features: [
      { title: 'Real position:sticky footer', text: `The summary row pins to bottom: 0 within the scroll container, the vertical counterpart to a sticky header.` },
      { title: 'Live-computed totals via reduce', text: `Sums are calculated from the actual row array on every run, never hardcoded.` },
      { title: 'Derived aggregate fields', text: `Remaining total is computed from summed budget minus summed spent, matching per-row logic.` },
      { title: 'Consistent conditional styling', text: `The same over-budget check applies identically to individual rows and the aggregate total.` },
      { title: 'Elevated z-index and opaque background', text: `Scrolling rows never visually bleed through the pinned summary row.` },
      { title: 'Sticky header and footer together', text: `Column labels stay visible at the top while totals stay visible at the bottom, simultaneously.` },
      { title: 'Visually distinct summary row', text: `A heavier weight and accent top border set the total apart from ordinary data rows.` },
      { title: 'Data-driven, not markup-driven', text: `Adding, removing, or editing rows requires no manual update to the totals anywhere.` },
    ],
    useCases: [
      { title: 'Budget and expense tracking', text: 'Keep running totals visible while scanning a long table, with the summary row pinned to `bottom: 0` of the scroll container.' },
      { title: 'Financial and accounting tables', text: 'Pin sum and average rows, with a remaining total computed as summed budget minus summed spent from the real data.' },
      { title: 'Order line-item tables', text: 'Keep an order total in view while editing many lines, using `reduce` over the row array on every render.' },
      { title: 'Inventory and stock summaries', text: 'Pin aggregate stock counts, applying the same over-budget check to individual rows and to the summary for consistent styling.' },
      { title: 'Reporting dashboards and sticky learning', text: 'Pair with a [multi-column sort table](/ui-snippets/table-multi-sort/) and a [sticky header table](/ui-snippets/sticky-header-table/) for a fully pinned layout.' },
    ],
    faqs: [
      { q: `Why does the summary row need position: sticky instead of just being the table's last row?`, a: `As an ordinary last row, the summary would scroll out of view along with the rest of the body the moment you scroll down through a long table — exactly when a running total is most useful to have visible. position: sticky with bottom: 0 keeps it pinned to the bottom edge of the scrolling container regardless of how far the body has scrolled, the same mechanism a sticky header uses at top: 0.` },
      { q: `Why is the remaining total computed as totals.budget minus totals.spent, rather than summing each row's own remaining value?`, a: `Both approaches produce the same number here since subtraction distributes over the sum, but computing it from the already-summed budget and spent totals keeps a single definition of "remaining" (budget minus spent) used consistently everywhere, rather than maintaining what amounts to the same calculation in two separate places that could theoretically diverge if the formula ever changed in only one spot.` },
      { q: 'How do I add an average alongside the sum in the summary row?', a: `Inside computeTotals, alongside the running budget and spent sums, either divide the final sums by rows.length after the reduce completes, or accumulate a count and divide inside the reduce callback — then render an additional summary value using that computed average the same way the sums are rendered.` },
      { q: 'How do I make the totals computation generic across any set of numeric columns, not just budget and spent?', a: `Instead of naming budget and spent explicitly in computeTotals, pass in an array of column keys to sum and use reduce with a loop over those keys (acc[key] = (acc[key] || 0) + row[key]) inside the reducer — this way adding a new numeric column to the row data only requires adding its key to the columns array, not editing the aggregation function itself.` },
      { q: 'How do I use this sticky summary row in React, Vue, or Angular?', a: `Compute the totals with the same reduce logic inside a memoized calculation (useMemo, a computed property, or a getter) that re-runs when the underlying row data changes, and render the tfoot's sticky-positioned cells from that computed value — the CSS position:sticky behavior needs no JavaScript and ports unchanged into any framework's table markup.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working through the aggregation logic yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the summary row uses position: sticky with bottom: 0 inside a scrolling container rather than being placed outside the scrollable area entirely, and why computeTotals runs a real reduce over the row array instead of the totals being typed directly into the footer markup. The same assistant can help you extend it — ask it to make the totals computation generic across an arbitrary list of numeric columns instead of naming budget and spent explicitly, add an average row alongside the sum row, or combine this sticky-footer technique with a [virtualized table](/ui-snippets/virtualized-table/) where only a windowed slice of rows is ever in the DOM but the totals still need to reflect the complete underlying dataset, not just the currently rendered slice. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a data table with a sticky totals/summary row in plain HTML, CSS, and JavaScript with no library — the summary row must stay pinned to the bottom of the table's scrollable viewport while the body scrolls above it, and its numbers must be computed live from the actual row data.

Requirements:
- Structure the table with a real thead, tbody, and tfoot, and wrap it in a container with a fixed max-height and overflow-y: auto so the table body actually needs to scroll.
- Give the tfoot's cells position: sticky with bottom: 0 (within the scrolling container) so the summary row remains visible at the bottom of the visible area regardless of how far the user has scrolled through the body — this is the vertical counterpart to a sticky header pinned with top: 0, and both should work simultaneously in this table.
- Write a totals computation function that uses a real array reduce (or equivalent aggregation loop) over the actual array of row data objects to sum the numeric columns — do not hardcode or manually type the summary row's numbers anywhere in the markup or JavaScript.
- Derive any computed aggregate field (such as a "remaining" total calculated as total budget minus total spent) from the already-summed totals, using the same formula that produces each individual row's own derived value, so the aggregate and the per-row calculations stay logically consistent.
- Give the sticky summary row a higher z-index and an explicit opaque background color so that as body rows scroll underneath it, they do not visually show through the pinned totals row, and style it visually distinctly (e.g. bolder text, an accent top border) from ordinary data rows.
- Apply the same conditional formatting logic (e.g. a warning color when a value is negative or over some limit) consistently to both individual row cells and the corresponding aggregate cell in the summary row, using one shared comparison rather than two separately maintained checks.
- Confirm that adding, removing, or editing a row in the underlying data array and re-running the render correctly updates the totals with no other manual changes required.`,
    },
  },
};

export default tableStickySummaryRow;
