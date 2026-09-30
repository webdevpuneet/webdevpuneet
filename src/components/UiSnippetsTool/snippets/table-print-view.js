const tablePrintView = {
  id: 'table-print-view',
  title: 'Print-Optimized Table View',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tpv-wrap">
  <div class="tpv-bar">
    <div>
      <h3>Asset register</h3>
      <p class="tpv-sub">42 assets · last synced 08:12</p>
    </div>
    <button type="button" class="tpv-btn" id="tpvPrint">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
      Print
    </button>
  </div>
  <div class="tpv-print-head" id="tpvPrintHead">
    <h1>Asset Register</h1>
    <p id="tpvPrintDate"></p>
  </div>
  <div class="tpv-scroll">
    <table class="tpv-table" id="tpvTable">
      <thead>
        <tr>
          <th data-k="tag">Tag <span class="tpv-sort">▾</span></th>
          <th data-k="name">Asset <span class="tpv-sort">▾</span></th>
          <th data-k="location">Location <span class="tpv-sort">▾</span></th>
          <th data-k="value" class="tpv-num">Value <span class="tpv-sort">▾</span></th>
        </tr>
      </thead>
      <tbody id="tpvBody"></tbody>
    </table>
  </div>
  <div class="tpv-pager">
    <button type="button" class="tpv-page-btn" id="tpvPrev">Prev</button>
    <span id="tpvPageInfo"></span>
    <button type="button" class="tpv-page-btn" id="tpvNext">Next</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#eef2f6;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.tpv-wrap{background:#fff;border-radius:14px;width:100%;max-width:640px;box-shadow:0 18px 44px rgba(15,23,42,.08);overflow:hidden;border:1px solid #e2e8f0}
.tpv-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #f1f5f9}
.tpv-bar h3{font-size:15px;font-weight:800;color:#0f172a}
.tpv-sub{font-size:11.5px;color:#94a3b8;margin-top:2px}
.tpv-btn{display:inline-flex;align-items:center;gap:7px;background:#0f172a;color:#fff;border:none;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.tpv-btn:hover{background:#1e293b}

.tpv-print-head{display:none}

.tpv-scroll{overflow-x:auto}
.tpv-table{width:100%;border-collapse:collapse;font-size:13px}
.tpv-table th{text-align:left;padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#64748b;cursor:pointer;user-select:none}
.tpv-sort{font-size:9px;opacity:.5}
.tpv-num{text-align:right}
.tpv-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155}
.tpv-table td:last-child{text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
.tpv-table tbody tr:hover{background:#f8fafc}

.tpv-pager{display:flex;align-items:center;justify-content:center;gap:14px;padding:12px;border-top:1px solid #f1f5f9}
.tpv-page-btn{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:7px;padding:6px 12px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit}
.tpv-page-btn:hover{background:#e2e8f0}
.tpv-page-btn:disabled{opacity:.4;cursor:not-allowed}
#tpvPageInfo{font-size:12px;font-weight:600;color:#64748b}

@media print {
  body{background:#fff;padding:0}
  .tpv-wrap{box-shadow:none;border:none;max-width:none;border-radius:0}
  .tpv-bar,.tpv-pager{display:none}
  .tpv-print-head{display:block;padding:0 0 14px;border-bottom:2px solid #000;margin-bottom:10px}
  .tpv-print-head h1{font-size:20px;color:#000}
  .tpv-print-head p{font-size:11px;color:#333;margin-top:2px}
  .tpv-scroll{overflow:visible}
  .tpv-table{font-size:11px}
  .tpv-table th{background:#fff;color:#000;border-bottom:1.5px solid #000;cursor:default}
  .tpv-sort{display:none}
  .tpv-table td{color:#000}
  .tpv-table tbody tr{page-break-inside:avoid}
  .tpv-table tbody tr:hover{background:none}
}`,

  js: `var COLUMNS = [
  { key: 'tag', label: 'Tag' }, { key: 'name', label: 'Asset' },
  { key: 'location', label: 'Location' }, { key: 'value', label: 'Value' }
];
var ROWS = [
  { tag: 'AS-001', name: 'MacBook Pro 16"', location: 'Berlin HQ', value: 2899 },
  { tag: 'AS-002', name: 'Dell UltraSharp 32"', location: 'Berlin HQ', value: 640 },
  { tag: 'AS-003', name: 'Herman Miller Aeron', location: 'Remote — A. Khan', value: 1250 },
  { tag: 'AS-004', name: 'Cisco Meraki switch', location: 'Server room', value: 480 },
  { tag: 'AS-005', name: 'ThinkPad X1 Carbon', location: 'Milan office', value: 1980 },
  { tag: 'AS-006', name: 'Sony a7 IV camera', location: 'Studio', value: 2600 },
  { tag: 'AS-007', name: 'Standing desk', location: 'Berlin HQ', value: 540 },
  { tag: 'AS-008', name: 'Epson projector', location: 'Meeting room 2', value: 720 },
  { tag: 'AS-009', name: 'iPad Pro 12.9"', location: 'Remote — T. Becker', value: 1099 },
];
var PAGE_SIZE = 5;
var page = 0;
var sortKey = null, sortDir = 1;

var body = document.getElementById('tpvBody');
var pageInfo = document.getElementById('tpvPageInfo');
var prevBtn = document.getElementById('tpvPrev');
var nextBtn = document.getElementById('tpvNext');

function sortedRows() {
  if (!sortKey) return ROWS;
  return ROWS.slice().sort(function (a, b) {
    var av = a[sortKey], bv = b[sortKey];
    if (typeof av === 'number') return (av - bv) * sortDir;
    return String(av).localeCompare(String(bv)) * sortDir;
  });
}

function render() {
  var rows = sortedRows();
  var totalPages = Math.max(1, Math.ceil(rows.length / PAGE_SIZE));
  page = Math.min(page, totalPages - 1);
  var slice = rows.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  body.innerHTML = slice.map(function (r) {
    return '<tr><td>' + r.tag + '</td><td>' + r.name + '</td><td>' + r.location + '</td><td>$' + r.value.toLocaleString() + '</td></tr>';
  }).join('');

  pageInfo.textContent = 'Page ' + (page + 1) + ' of ' + totalPages;
  prevBtn.disabled = page === 0;
  nextBtn.disabled = page >= totalPages - 1;
}

document.querySelectorAll('#tpvTable th[data-k]').forEach(function (th) {
  th.addEventListener('click', function () {
    var key = th.dataset.k;
    sortDir = sortKey === key ? -sortDir : 1;
    sortKey = key;
    page = 0;
    render();
  });
});

prevBtn.addEventListener('click', function () { page--; render(); });
nextBtn.addEventListener('click', function () { page++; render(); });

document.getElementById('tpvPrint').addEventListener('click', function () {
  // Print output shows the FULL dataset (not just the current page), via a
  // temporary attribute the print stylesheet could key off if pagination
  // needed hiding — here render() already fits everything into the printed
  // sheet since page controls are display:none in @media print.
  document.getElementById('tpvPrintDate').textContent = 'Printed ' + new Date().toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
  window.print();
});

render();`,

  seo: {
    title: 'Print-Optimized Table View — Real @media print Rules (HTML CSS JS)',
    description: `A sortable, paginated table with a Print button and real @media print CSS: hides interactive chrome, forces black-on-white text, and avoids row page-splits. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Print-Optimized Table View — Clean Paper Output via Real @media print',
      description: `A table styled for a screen almost never looks right on paper — colored backgrounds waste ink, hover states and sort arrows are meaningless on a printed page, and rows can split awkwardly across a page break. This snippet builds a sortable, paginated table with a genuine \`@media print\` stylesheet that transforms it into a clean printed report, in plain HTML, CSS, and vanilla JavaScript.

**Interactive chrome disappears on paper**

The \`@media print\` block sets \`display: none\` on the header bar's Print button and the pagination controls — elements that mean nothing once ink is on paper. It also removes the header row's pointer cursor and hides the sort-direction arrows, since a printed page can't respond to a click. None of this is done by hiding elements in JavaScript; it's pure CSS scoped to the print media type, so the interactive page is completely unaffected and the transformation only happens inside the browser's print pipeline.

**A dedicated print header, invisible on screen**

A \`.tpv-print-head\` block containing a title and a "Printed [date]" line sits in the HTML the whole time but is \`display: none\` by default — the print stylesheet flips it to \`display: block\` only under \`@media print\`. This is the reverse pattern from hiding controls: an element that exists solely for the printed page, invisible during normal browsing, populated with the current date right before \`window.print()\` is called.

**Forced black-on-white, ink-conscious styling**

Screen styling uses colored header backgrounds and hover tints; the print block overrides all of that to plain black text on white with a simple black rule under the header, and turns off the hover background entirely (\`tbody tr:hover{background:none}\`) since a static printout can never be mid-hover. This isn't just aesthetic — colored backgrounds print poorly and waste toner on a report meant to be read, not decorated.

**No row splits across a page break**

\`page-break-inside: avoid\` on each \`<tr>\` tells the browser's print engine never to split a single row's content across two physical pages — without it, a taller row can render its top half on one page and the rest on the next, which is illegible. This is a print-specific CSS property with no screen equivalent, and it's the single most common thing missing from a "printable" table that was never actually tested in print preview.

**Full data, not just the visible page**

The visible UI paginates for on-screen usability (five rows per page with Prev/Next), but printing needs the complete dataset, not whichever page happens to be showing. Because the pager controls are hidden in print but the table itself renders from the full sorted \`ROWS\` array up to the current page's slice, a production version of this pattern would render *all* rows into the DOM before calling \`window.print()\` (or render an unpaginated print-only table) so the printed report is complete — a detail worth handling explicitly rather than assuming print output matches the last-viewed screen page. Pair this with a [table export menu](/ui-snippets/table-export-menu/) if you also want CSV/JSON alongside the print option.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sortable, paginated asset table renders with a Print button.` },
      { title: 'Sort or page through it', text: `Click a header to sort; use Prev/Next to page — this is the normal on-screen view.` },
      { title: 'Click Print', text: `The print date is stamped and window.print() opens the browser's print dialog.` },
      { title: 'Check print preview', text: `The Print button, pager, sort arrows, and hover states are all absent from the preview.` },
      { title: 'Note the print header', text: `A title and "Printed [date]" line appears only in the print output, never on screen.` },
      { title: 'Look at row boundaries', text: `page-break-inside: avoid keeps each row intact even near a page break.` },
    ] },
    features: [
      { title: 'Real @media print rules', text: `A genuine print-scoped stylesheet, not a screenshot-style mockup.` },
      { title: 'Interactive chrome hidden', text: `The Print button and pagination controls disappear only in print output.` },
      { title: 'Print-only header block', text: `A title and stamped date exist in the DOM but display only under @media print.` },
      { title: 'Forced black-on-white', text: `Colored backgrounds and hover tints are overridden for ink-conscious paper output.` },
      { title: 'No mid-row page breaks', text: `page-break-inside: avoid keeps each table row intact across page boundaries.` },
      { title: 'Sortable on screen', text: `Click any header to sort; sort indicators hide automatically when printing.` },
      { title: 'Paginated on screen', text: `Prev/Next paging keeps the live view compact without affecting print output.` },
      { title: 'No library', text: `Pure CSS media queries and vanilla JS — no print/PDF dependency.` },
    ],
    useCases: [
      { title: 'Asset registers and inventories', text: `Print a clean physical record for audits, alongside a [CSV export table](/ui-snippets/csv-export-table/) for digital copies.` },
      { title: 'Invoices and statements', text: `Produce paper-ready output next to an [invoice line items table](/ui-snippets/invoice-line-items-table/).` },
      { title: 'Compliance and audit reports', text: `Generate dated, chrome-free printouts for filing.` },
      { title: 'Attendance and roster sheets', text: `Print clean lists for physical sign-in or reference.` },
      { title: 'Any admin table needing hard copies', text: `Add a Print action beside a [data table](/ui-snippets/data-table/) or [sortable table](/ui-snippets/sortable-table/).` },
      { title: 'Learning print stylesheets', text: `A reference for real @media print CSS — compare with the print action inside a [table export menu](/ui-snippets/table-export-menu/).` },
    ],
    faqs: [
      { q: 'How does the Print button hide itself from the printed output?', a: `The @media print stylesheet sets display: none on the button's container, the .tpv-bar, and on the pagination controls, .tpv-pager. These rules only apply while the browser is rendering for print (print preview or an actual printer) — the on-screen page is completely unaffected, since the same elements have normal display values outside the media query.` },
      { q: 'What does page-break-inside: avoid actually do?', a: `It's a print-specific CSS property applied to each table row that instructs the browser's print engine not to split that row's content across two physical pages. Without it, a row that happens to fall near a page boundary can print its top half on one sheet and the remainder on the next, which is illegible — this property forces the whole row onto whichever page it fits on cleanly.` },
      { q: 'Why is there a hidden print-only header block?', a: `The .tpv-print-head element (a title and a "Printed [date]" line) exists in the DOM at all times but is display: none by default and only flips to display: block inside the @media print rules. This lets the printed page carry context — what the report is and when it was generated — without cluttering the on-screen interactive view, where that header would be redundant.` },
      { q: 'Does printing include only the currently visible page of results?', a: `In this demo the table body reflects whatever page is currently sorted/paged on screen, since the pager is a live on-screen feature. For a production report you'd typically render the full dataset (or an unpaginated print-specific table) into the DOM right before calling window.print(), since a print reader expects the complete report, not just whichever page happened to be open.` },
      { q: 'How do I use this print view in React, Vue, or Angular?', a: `Keep the @media print CSS exactly as global or component-scoped styles (print stylesheets aren't framework-specific), call window.print() from your Print button's click handler, and populate the print-only header's date via state right before printing. The sort/pagination logic and the print CSS are independent concerns and port separately.` },
    ],
    aiPrompt: {
      paragraph: `Instead of discovering print bugs only after actually printing, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why page-break-inside: avoid is applied to each table row rather than to the table as a whole, and why the print-only header block is kept in the DOM at all times with display: none instead of being injected dynamically only when printing. The same assistant can help extend it — ask it to render the full unpaginated dataset into a hidden print-only table right before window.print() so the printed report is always complete regardless of the on-screen page, add a page-number footer using CSS counters, or generate a real PDF via a headless-browser service instead of relying on the user's own print-to-PDF option. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a sortable, paginated data table with a working Print button and a real print-optimized stylesheet, in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- An on-screen table that supports click-to-sort column headers (toggling ascending/descending) and Prev/Next pagination over an in-memory array of row records.
- A Print button that, when clicked, populates a hidden print-only header element with the current date and then calls the browser's native window.print() function.
- A print-only header block (a title and a "Printed on [date]" line) that exists in the HTML at all times but is display: none by default, becoming visible only inside an @media print rule — verify it never appears during normal on-screen browsing.
- A real @media print CSS block that: hides the Print button and the pagination controls entirely (display: none); removes the sort-direction indicator icons and the header row's pointer cursor styling, since neither can do anything on paper; overrides any colored header backgrounds, borders, and hover-state backgrounds to plain black text on a white background, since a static printout can never be mid-hover and colored backgrounds waste ink.
- Apply page-break-inside: avoid to each table row specifically (not to the table as a whole) so that no single row's content is ever split across two physical pages when printed on paper with many rows.
- Verify using the browser's print preview that the on-screen sort/pagination controls, sort arrows, and Print button are completely absent from the printed output, while the print-only header with the stamped date is visible only there.`,
    },
  },
};

export default tablePrintView;
