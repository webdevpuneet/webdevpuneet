const pivotTable = {
  id: 'pivot-table',
  title: 'Pivot Table',
  lastmod: '2026-06-23',
  category: 'tables',
  html: `<div class="pv-wrap">
  <div class="pv-bar">
    <h3>Sales pivot</h3>
    <label class="pv-agg">Measure
      <select id="pvAgg"><option value="sum">Sum</option><option value="avg">Average</option><option value="count">Count</option></select>
    </label>
  </div>
  <div class="pv-scroll"><table class="pv-table" id="pvTable"></table></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.pv-wrap{background:#fff;border-radius:14px;width:100%;max-width:600px;box-shadow:0 18px 44px rgba(15,23,42,.08);overflow:hidden}
.pv-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #f1f5f9}
.pv-bar h3{font-size:15px;font-weight:800;color:#0f172a}
.pv-agg{font-size:12px;font-weight:700;color:#64748b;display:flex;align-items:center;gap:7px}
.pv-agg select{border:1.5px solid #e2e8f0;border-radius:7px;padding:4px 8px;font-size:12px;font-weight:700;font-family:inherit;color:#0f172a}

.pv-scroll{overflow-x:auto}
.pv-table{width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}
.pv-table th,.pv-table td{padding:9px 13px;text-align:right;border-bottom:1px solid #f1f5f9;white-space:nowrap}
.pv-table thead th{background:#f8fafc;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#64748b;border-bottom:1px solid #e2e8f0}
.pv-table th.pv-corner,.pv-table th.pv-rowhead,.pv-table td.pv-rowhead{text-align:left;font-weight:700;color:#0f172a}
.pv-table .pv-cell{color:#334155}
.pv-table tbody tr:hover{background:#f8fafc}
.pv-total,.pv-table tfoot td{font-weight:800;color:#0f172a;background:#f8fafc}
.pv-table tfoot td{border-top:2px solid #e2e8f0}`,

  js: `// Flat records — a pivot table cross-tabulates these by row field × column field.
var DATA = [
  { region: 'North', quarter: 'Q1', sales: 120 }, { region: 'North', quarter: 'Q2', sales: 150 },
  { region: 'North', quarter: 'Q3', sales: 90 },  { region: 'North', quarter: 'Q4', sales: 200 },
  { region: 'South', quarter: 'Q1', sales: 80 },  { region: 'South', quarter: 'Q2', sales: 110 },
  { region: 'South', quarter: 'Q3', sales: 140 }, { region: 'South', quarter: 'Q4', sales: 130 },
  { region: 'East',  quarter: 'Q1', sales: 200 }, { region: 'East',  quarter: 'Q2', sales: 170 },
  { region: 'East',  quarter: 'Q3', sales: 160 }, { region: 'East',  quarter: 'Q4', sales: 210 },
];
var ROW = 'region', COL = 'quarter', VAL = 'sales';

var table = document.getElementById('pvTable');
var aggSel = document.getElementById('pvAgg');

function uniq(field) { return DATA.reduce(function (a, r) { if (a.indexOf(r[field]) < 0) a.push(r[field]); return a; }, []); }
function aggregate(records, how) {
  if (!records.length) return how === 'count' ? 0 : '';
  if (how === 'count') return records.length;
  var sum = records.reduce(function (s, r) { return s + r[VAL]; }, 0);
  return how === 'avg' ? Math.round(sum / records.length) : sum;
}

function render() {
  var how = aggSel.value;
  var rows = uniq(ROW), cols = uniq(COL);
  // Header row: corner + each column value + row total.
  var head = '<thead><tr><th class="pv-corner">' + ROW + ' / ' + COL + '</th>' +
    cols.map(function (c) { return '<th>' + c + '</th>'; }).join('') + '<th>Total</th></tr></thead>';
  // Body: one row per ROW value, a cell per COL value, then the row total.
  var body = rows.map(function (rv) {
    var cells = cols.map(function (cv) {
      var match = DATA.filter(function (r) { return r[ROW] === rv && r[COL] === cv; });
      return '<td class="pv-cell">' + aggregate(match, how) + '</td>';
    }).join('');
    var rowRecs = DATA.filter(function (r) { return r[ROW] === rv; });
    return '<tr><td class="pv-rowhead">' + rv + '</td>' + cells + '<td class="pv-total">' + aggregate(rowRecs, how) + '</td></tr>';
  }).join('');
  // Footer: column totals + grand total.
  var foot = '<tfoot><tr><td class="pv-rowhead">Total</td>' +
    cols.map(function (cv) {
      var colRecs = DATA.filter(function (r) { return r[COL] === cv; });
      return '<td>' + aggregate(colRecs, how) + '</td>';
    }).join('') +
    '<td>' + aggregate(DATA, how) + '</td></tr></tfoot>';
  table.innerHTML = head + '<tbody>' + body + '</tbody>' + foot;
}

aggSel.addEventListener('change', render);
render();`,

  seo: {
    title: 'Pivot Table — Cross-Tab HTML CSS JS (No Library)',
    description: `A pivot table that cross-tabulates flat records by row × column with sum/average/count and row, column, and grand totals. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Pivot Table — Cross-Tabulate Flat Records by Row and Column with Totals',
      description: `A pivot table turns a flat list of records into a cross-tabulation: pick a field for the rows, a field for the columns, and a measure for the cells, and it summarises the data into a grid with totals — the core of every spreadsheet pivot and BI tool. This snippet builds a working pivot table in plain HTML, CSS, and vanilla JavaScript, aggregating the data itself with switchable sum/average/count measures and full totals — no library.

**Cross-tabulation from flat data**

The input is a flat array of records (region, quarter, sales). The pivot derives the unique row values and unique column values, then for each row/column intersection filters the records that match both and aggregates them into a cell. This filter-and-aggregate at every intersection is the essence of a pivot — it reshapes one-row-per-event data into a summary matrix, which is exactly what makes raw transactional data readable.

**Switchable measures**

A selector changes the aggregation across the whole table — sum, average, or count — and re-pivots live. \`aggregate(records, how)\` is the single function that defines each measure: count is the record tally, sum totals the value field, average divides the two. Because every cell, row total, column total, and the grand total all route through this one function, switching the measure recomputes the entire grid consistently — there's no chance of the totals using a different calculation than the cells.

**Totals on both axes**

The table adds a Total column (each row aggregated across all columns), a Total row in the footer (each column aggregated across all rows), and a grand total at their intersection. Crucially, totals are computed from the *raw records*, not by summing the displayed cells — this matters for the average measure, where averaging the cell averages would be wrong; aggregating the underlying records gives the correct overall average. Getting totals right under non-additive measures is the detail that separates a real pivot from a naive grid.

**Readable, scrollable layout**

Row headers and the corner are left-aligned while numeric cells are right-aligned with tabular figures so columns line up, totals are emphasised with a tinted background, and the table scrolls horizontally if there are many columns. These are the conventions that make a dense numeric grid scannable.

**Data-driven and drop-in**

Change the \`ROW\`, \`COL\`, and \`VAL\` field names at the top to pivot any flat dataset by different dimensions, or wire those to selectors for a fully interactive pivot. It's a clear, dependency-free reference for the cross-tabulation and aggregation logic behind every pivot table. The filter-per-cell approach here is intentionally simple and easy to follow for a dataset this size; it scans the full \`DATA\` array once per intersection, so it's O(rows × cols × records) — fine for dozens of cells, but for a pivot over thousands of records you'd first group records once into a \`Map\` keyed by \`row+col\`, then read each cell's aggregate from that map in O(1). The same regrouping approach extends naturally to a pivot with more than two dimensions — a third "page" field, say — by keying the map on all three values and adding a selector that filters which page's slice is currently rendered, without changing how the row/column grid itself is built.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pivot table renders, cross-tabulating sales by region (rows) and quarter (columns).` },
      { title: 'Switch the measure', text: `Use the Measure selector to re-pivot as sum, average, or count.` },
      { title: 'Read the totals', text: `A Total column, Total row, and grand total summarise both axes.` },
      { title: 'Change the dimensions', text: `Edit the ROW, COL, and VAL field names to pivot by different fields.` },
      { title: 'Swap in your data', text: `Replace the flat DATA array with your own records.` },
      { title: 'Make it interactive', text: `Wire ROW/COL/VAL to selectors to let users choose the pivot dimensions.` },
    ] },
    features: [
      { title: 'Cross-tabulation', text: `Reshapes flat records into a row × column summary matrix.` },
      { title: 'Switchable measures', text: `Sum, average, or count — all through one aggregate function for consistency.` },
      { title: 'Row and column totals', text: `A Total column and Total row summarise each axis.` },
      { title: 'Correct non-additive totals', text: `Totals aggregate the raw records, so averages stay correct (not an average of averages).` },
      { title: 'Grand total', text: `The corner of the totals aggregates the whole dataset.` },
      { title: 'Aligned numeric grid', text: `Right-aligned tabular cells and left-aligned headers keep columns readable.` },
      { title: 'Horizontal scroll', text: `The table scrolls when there are many columns.` },
      { title: 'Data-driven & no library', text: `Pivots a flat DATA array by configurable fields in plain HTML/CSS/JS.` },
    ],
    useCases: [
      { title: 'Sales by region and product', text: 'Cross-tabulate flat records into a row by column grid, summarising revenue with row, column and grand totals.' },
      { title: 'Analytics breakdowns', text: 'Summarise events by two dimensions, pairing with a [bar chart](/ui-snippets/bar-chart/) so the same figures can be viewed as a picture.' },
      { title: 'Finance and budgeting', text: 'Pivot spend by category and month using sum, average or count, with totals aggregated from raw records so averages remain correct.' },
      { title: 'Survey cross-tabs', text: 'Cross-tabulate survey responses by two questions at once, switching between sum, average and count through a single aggregate function.' },
      { title: 'Inventory across locations', text: 'Summarise stock by site and type, or compare with a flat [data table](/ui-snippets/data-table/) and a [grouped rows table](/ui-snippets/grouped-rows-table/) for different levels of detail.' },
      { icon: 'CODE', title: 'Related: Table Column Pin/Unpin Toggle — User-Controlled Sticky Columns', desc: 'See the [Table Column Pin/Unpin Toggle — User-Controlled Sticky Columns](/ui-snippets/table-column-pin-toggle/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does a pivot table differ from a normal table?', a: `A normal table shows one row per record. A pivot table cross-tabulates: it picks a field for the rows and a field for the columns, then summarises a measure at each intersection. This reshapes flat, one-row-per-event data into a compact summary grid — turning, say, twelve sales records into a region-by-quarter matrix with totals.` },
      { q: 'Why compute totals from raw records instead of summing the cells?', a: `For additive measures like sum or count, summing the cells happens to give the right total. But for average, averaging the displayed cell-averages is mathematically wrong — it ignores how many records each cell represents. Aggregating the underlying raw records for every total guarantees correctness across all measures, which is essential for a trustworthy pivot.` },
      { q: 'How do I pivot by different fields?', a: `Change the ROW, COL, and VAL constants to the field names you want as rows, columns, and the measured value. The code derives the unique values and aggregates generically, so any flat dataset pivots by any of its fields. To make it interactive, bind those constants to dropdowns and call render() on change.` },
      { q: 'Can it handle many columns or rows?', a: `Yes — the grid is generated from the unique values in your data, so it scales to any number of rows and columns, and the container scrolls horizontally when columns overflow. For very large datasets you'd precompute the aggregation once (e.g. group records into a map keyed by row+column) instead of filtering per cell, but the logic is the same.` },
      { q: 'How do I use this pivot table in React, Vue, or Angular?', a: `In React, hold the data and measure in state and compute the pivoted structure with useMemo, then render the grid from it; in Vue, use a computed pivot object with v-for; in Angular, a getter with *ngFor. The uniq()/aggregate() cross-tab logic is framework-agnostic — only the measure state and rendering move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the aggregation edge cases by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the footer and row totals must aggregate the raw filtered records rather than summing the already-computed cell values, and specifically why that distinction matters for the average measure but not for sum or count. The same assistant can help optimize it, for example checking whether the current approach of filtering the full DATA array once per row/column intersection becomes a real bottleneck as the dataset grows, and how to replace it with a single grouping pass into a lookup map keyed by row and column. It's also useful for extending the effect: ask it to add a third pivot dimension (a "page" filter that slices which subset of data is shown), support sorting rows or columns by their total, or add CSV export of the rendered grid. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a pivot table that cross-tabulates a flat array of records in plain HTML, CSS, and vanilla JavaScript, with no charting or spreadsheet library.

Requirements:
- Start from a flat array of plain objects (for example, each with a region, a quarter, and a numeric sales value) and three configurable field names: which field becomes the row dimension, which becomes the column dimension, and which numeric field is being measured.
- Derive the unique values for the row dimension and the unique values for the column dimension directly from the data (not hardcoded), and build a table where every row/column intersection is a cell showing the aggregated measure for exactly the records matching both that row's value and that column's value.
- Implement a single aggregate function that supports at least three modes — sum, average, and count — and route every cell, every row total, every column total, and the grand total through that one function so switching modes can never leave some totals using a different calculation than others.
- Add a dropdown that lets the user switch the aggregation mode live, causing the entire grid (cells and all totals) to recompute and re-render immediately.
- Add a totals column at the right of each row and a totals row at the bottom of the table, plus a grand total in their intersection — and make sure every one of these totals is computed by aggregating the underlying raw records that match that slice, not by summing the already-rendered cell values, so the average mode's totals stay mathematically correct.
- Style numeric cells with right-aligned, tabular-figure text and header/label cells left-aligned, and make the table scroll horizontally if there are more columns than fit the container.`,
    },
  },
};

export default pivotTable;
