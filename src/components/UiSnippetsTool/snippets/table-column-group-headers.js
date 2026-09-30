const tableColumnGroupHeaders = {
  id: 'table-column-group-headers',
  title: 'Grouped Column Headers Table',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="cgh-wrap">
  <div class="cgh-bar">
    <h3>Quarterly revenue by region</h3>
    <span class="cgh-note">Figures in $000s</span>
  </div>
  <div class="cgh-scroll">
    <table class="cgh-table">
      <thead>
        <tr>
          <th class="cgh-corner" rowspan="2">Region</th>
          <th class="cgh-group cgh-q1" colspan="3">Q1</th>
          <th class="cgh-group cgh-q2" colspan="3">Q2</th>
          <th class="cgh-total-head" rowspan="2">H1 Total</th>
        </tr>
        <tr>
          <th class="cgh-q1">Jan</th><th class="cgh-q1">Feb</th><th class="cgh-q1">Mar</th>
          <th class="cgh-q2">Apr</th><th class="cgh-q2">May</th><th class="cgh-q2">Jun</th>
        </tr>
      </thead>
      <tbody id="cghBody"></tbody>
    </table>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f19;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.cgh-wrap{background:#121826;border-radius:14px;width:100%;max-width:680px;box-shadow:0 18px 44px rgba(0,0,0,.4);overflow:hidden;border:1px solid #1f2937}
.cgh-bar{display:flex;align-items:baseline;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #1f2937}
.cgh-bar h3{font-size:15px;font-weight:800;color:#f1f5f9}
.cgh-note{font-size:11px;font-weight:600;color:#64748b}

.cgh-scroll{overflow-x:auto}
.cgh-table{width:100%;border-collapse:collapse;font-size:13px;font-variant-numeric:tabular-nums}
.cgh-table th,.cgh-table td{padding:9px 12px;text-align:right;white-space:nowrap}
.cgh-table thead th{font-weight:800;text-transform:uppercase;letter-spacing:.04em;font-size:10.5px;color:#0b0f19;border-bottom:1px solid rgba(0,0,0,.15)}
.cgh-table thead tr:first-child th{border-top:1px solid transparent}
.cgh-corner{background:#1e2536;color:#94a3b8;text-align:left;vertical-align:bottom;padding-bottom:9px}
.cgh-q1{background:#818cf8}
.cgh-q2{background:#34d399}
.cgh-total-head{background:#1e2536;color:#e2e8f0;vertical-align:bottom}
.cgh-table thead tr:nth-child(2) th{font-size:11px;color:rgba(11,15,25,.75)}

.cgh-table td{color:#cbd5e1;border-bottom:1px solid #1f2937}
.cgh-table td.cgh-rowhead{text-align:left;font-weight:700;color:#f1f5f9}
.cgh-table td.cgh-total{font-weight:800;color:#fff;background:#1a2233}
.cgh-table tbody tr:hover td{background:#182034}
.cgh-table tbody tr:hover td.cgh-total{background:#212c46}`,

  js: `// One record per region with monthly values — the grouped header is purely presentational,
// derived from these six month keys split into two quarters.
var MONTHS = ['jan', 'feb', 'mar', 'apr', 'may', 'jun'];
var DATA = [
  { region: 'North America', jan: 412, feb: 438, mar: 455, apr: 470, may: 460, jun: 502 },
  { region: 'Europe',        jan: 301, feb: 296, mar: 322, apr: 340, may: 355, jun: 368 },
  { region: 'Asia Pacific',  jan: 258, feb: 275, mar: 290, apr: 310, may: 330, jun: 349 },
  { region: 'Latin America', jan: 96,  feb: 101, mar: 108, apr: 114, may: 120, jun: 129 },
];

var body = document.getElementById('cghBody');

function total(row) {
  return MONTHS.reduce(function (s, m) { return s + row[m]; }, 0);
}

body.innerHTML = DATA.map(function (row) {
  var cells = MONTHS.map(function (m) { return '<td>' + row[m].toLocaleString() + '</td>'; }).join('');
  return '<tr><td class="cgh-rowhead">' + row.region + '</td>' + cells +
    '<td class="cgh-total">' + total(row).toLocaleString() + '</td></tr>';
}).join('');`,

  seo: {
    title: 'Grouped Column Headers Table — Two-Level colspan Header (HTML CSS JS)',
    description: `A data table with a real two-level header — group labels like Q1/Q2 spanning individual month columns via real colspan, not visual faking. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Grouped Column Headers Table — Real colspan/rowspan for Multi-Level Headers',
      description: `Wide tables with many related columns — months under quarters, metrics under categories — read better when a top header row groups them, and a second row labels each individual column. This snippet builds that grouped header the correct way: real \`colspan\` and \`rowspan\` attributes on actual \`<th>\` elements, not a second absolutely-positioned bar drawn over a flat header. The result is a table that's both visually grouped and structurally correct for screen readers and copy-paste into a spreadsheet.

**Two real header rows, not one faked row**

The \`<thead>\` contains two \`<tr>\` elements. The first row has a "Region" corner cell with \`rowspan="2"\` (so it spans both header rows without repeating), then a "Q1" \`<th colspan="3">\` and a "Q2" \`<th colspan="3">\`, each covering exactly three of the six data columns, plus an "H1 Total" corner with \`rowspan="2"\`. The second row supplies the six individual month labels. Because the browser's own table layout engine resolves the colspans, the group headers stay perfectly aligned with their columns at any width or font size — a visual-only overlay would drift the moment content reflows.

**Why rowspan matters for the corner cells**

The "Region" and "H1 Total" headers logically belong to *both* header rows (a single column, but the header block is two rows tall), so they're written once with \`rowspan="2"\` rather than duplicated. This is the detail that trips people up when hand-building grouped headers: without \`rowspan\`, the corner cells either repeat awkwardly or the columns miscount, because the browser expects every row in a table to describe the same number of column slots once spans are accounted for.

**Semantically correct, not just visually grouped**

Because this uses genuine table markup, a screen reader announcing a cell can trace it back through its header row to both "Q1" and "Feb," and selecting the table and pasting into Excel or Sheets reproduces the same grouped structure. A CSS-only fake header (a positioned bar with no real \`<th>\` relationship to the columns below it) loses all of that — it looks right but conveys nothing structurally and breaks on copy-paste or with assistive technology.

**Color-coded groups for fast scanning**

Each quarter's header cells and its underlying data columns share a tint (indigo for Q1, green for Q2), so a reader's eye groups the six month columns into two chunks before reading a single number — useful once you have more than three or four related columns in a row.

**Data-driven and generic**

The body renders from a flat \`DATA\` array of region records; the \`MONTHS\` array drives which keys become columns and their total. Add a new quarter by adding a third grouped \`<th colspan="3">\` and three more month keys — the rendering loop over \`MONTHS\` needs no other change. Pair this pattern with a [pivot table](/ui-snippets/pivot-table/) when you need the grouping computed from raw records rather than pre-aggregated columns, or a [sticky header table](/ui-snippets/sticky-header-table/) to keep a grouped header visible while scrolling a long report.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A revenue table renders with Q1/Q2 group headers spanning three month columns each.` },
      { title: 'Inspect the header markup', text: `Two real <tr> rows in <thead>, with colspan="3" on each quarter and rowspan="2" on the corner cells.` },
      { title: 'Resize the panel', text: `Group headers stay aligned to their columns because the browser's own table layout resolves the spans.` },
      { title: 'Add a quarter', text: `Add a third colspan="3" group header and three more month keys to MONTHS and each DATA row.` },
      { title: 'Select and copy', text: `Select the table and paste into a spreadsheet — the grouped structure carries over.` },
      { title: 'Swap in your data', text: `Replace DATA and MONTHS with your own metrics and periods.` },
    ] },
    features: [
      { title: 'Real colspan grouping', text: `Group headers use actual colspan="3" over month <th> cells — no positioned overlay.` },
      { title: 'rowspan corner cells', text: `Region and Total headers span both header rows once via rowspan="2".` },
      { title: 'Browser-resolved alignment', text: `Native table layout keeps groups aligned to columns at any width.` },
      { title: 'Screen-reader correct', text: `Real header/data cell relationships, unlike a CSS-only faked header bar.` },
      { title: 'Copy-paste fidelity', text: `Selecting and pasting into a spreadsheet preserves the grouped structure.` },
      { title: 'Color-coded groups', text: `Each quarter's header and data columns share a tint for fast visual grouping.` },
      { title: 'Row and column totals', text: `An H1 Total column sums each region's six months.` },
      { title: 'Data-driven & no library', text: `Renders from a flat DATA array and a MONTHS key list — zero dependencies.` },
    ],
    useCases: [
      { title: 'Financial and revenue reports', text: `Group months under quarters or quarters under years — pair with a [pivot table](/ui-snippets/pivot-table/) for aggregated views.` },
      { title: 'Multi-metric comparisons', text: `Group related metrics (min/avg/max) under one category header, similar to a [comparison table](/ui-snippets/comparison-table/).` },
      { title: 'Scientific and survey data', text: `Group repeated measures (pre/post) under a condition header.` },
      { title: 'Scheduling grids', text: `Group time slots under a day header in a [schedule table](/ui-snippets/schedule-table/)-style layout.` },
      { title: 'Long reports needing sticky headers', text: `Combine with a [sticky header table](/ui-snippets/sticky-header-table/) so the grouped header stays visible on scroll.` },
      { title: 'Learning table semantics', text: `A reference for correct colspan/rowspan grouping — compare with a [grouped rows table](/ui-snippets/grouped-rows-table/), which groups rows instead of columns.` },
      { icon: 'CODE', title: 'Related: Inline Cell Bulk-Edit Table — Floating Save Bar', desc: 'See the [Inline Cell Bulk-Edit Table — Floating Save Bar](/ui-snippets/table-inline-cell-bulk-edit/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use colspan instead of a second absolutely-positioned header bar?', a: `A positioned overlay only looks aligned — it has no real relationship to the columns beneath it, so it drifts on resize, breaks with different font sizes, and conveys nothing to screen readers or spreadsheet paste. Real colspan is resolved by the browser's own table layout engine, so the group header is always exactly as wide as the columns it spans, at any viewport width.` },
      { q: 'Why do the Region and Total headers use rowspan="2"?', a: `Those two headers apply to a single column but the header block is two rows tall. rowspan="2" lets one cell occupy both header rows for that column, rather than duplicating the label or leaving an empty cell. Without it, the browser would miscount the columns in the second header row relative to the first.` },
      { q: 'Does this work correctly for screen readers?', a: `Yes — because the groups are real <th> elements with genuine colspan/rowspan relationships to the data cells below, assistive technology can associate each data cell with both its group header (e.g. "Q1") and its specific column header (e.g. "Feb"), which a CSS-only faked header cannot provide.` },
      { q: 'How do I add a third level of grouping (e.g. years above quarters)?', a: `Add a new <tr> above the current first row with a single <th colspan="6"> (or however many columns the year spans) for the year label, using rowspan="1" since it's a new top row, and increase the rowspan on the Region and Total corner cells to 3 so they still span all three header rows.` },
      { q: 'How do I use this grouped header table in React, Vue, or Angular?', a: `Render the two <thead> rows from a config object describing each group's label and column count, and the body from your data array as here. The colspan/rowspan markup is framework-agnostic — only the loop that emits <th> elements moves into JSX/template syntax.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing why a hand-rolled grouped header looks misaligned, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how colspan="3" on the Q1 and Q2 header cells keeps them aligned to three month columns each without any manual width math, and why rowspan="2" on the Region and H1 Total headers is necessary for the second header row's column count to line up correctly. The same assistant can help extend it — ask it to add a third grouping level (years above quarters), make the group headers themselves clickable to sort by that quarter's total, or generate the grouped <thead> markup dynamically from a nested config object instead of hand-written HTML. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a data table with a real two-level grouped column header in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A <thead> with two real <tr> rows, not a single row with an overlay. The first row must contain a corner header cell using rowspan="2" (spanning both header rows, since it applies to one column), two or more group header <th> cells each using a genuine colspan attribute (e.g. colspan="3") to span multiple underlying data columns, and a trailing totals corner header also using rowspan="2".
- The second header row must contain one <th> per individual data column (e.g. six month labels split three-and-three under two quarter group headers), with no colspan/rowspan on these — they occupy exactly one column slot each.
- Verify the column count adds up correctly: the corner cell (1) + the group headers' combined colspans (e.g. 3+3=6) + the totals corner (1) in row one must equal the six individual column headers + the row head + the total cell accounted for in row two, so the browser doesn't misalign columns.
- Render the table body from a flat JavaScript array of row records (e.g. one per region, with a value per month), computing each row's total by summing its month values — do not hardcode the totals.
- Style the two quarter groups with distinct background tints on both their header cells and, optionally, their data columns, so a reader visually groups the six month columns into two chunks at a glance.
- Confirm resizing the container keeps the group headers aligned exactly over their spanned columns, since this relies on the browser's native table layout resolving the colspans rather than any manual positioning.`,
    },
  },
};

export default tableColumnGroupHeaders;
