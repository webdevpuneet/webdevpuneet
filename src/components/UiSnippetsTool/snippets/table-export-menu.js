const tableExportMenu = {
  id: 'table-export-menu',
  title: 'Table Export Menu (CSV/JSON/Print)',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tem-wrap" id="temWrap">
  <div class="tem-bar">
    <h3>Inventory</h3>
    <div class="tem-menu" id="temMenu">
      <button type="button" class="tem-toggle" id="temToggle">Export <span class="tem-caret">▾</span></button>
      <div class="tem-drop" id="temDrop" hidden>
        <button type="button" class="tem-item" data-action="csv">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          Download CSV
        </button>
        <button type="button" class="tem-item" data-action="json">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
          Download JSON
        </button>
        <button type="button" class="tem-item" data-action="print">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>
          Print view
        </button>
      </div>
    </div>
  </div>
  <table class="tem-table" id="temTable">
    <thead><tr><th>SKU</th><th>Item</th><th>Warehouse</th><th class="tem-num">Qty</th></tr></thead>
    <tbody id="temBody"></tbody>
  </table>
  <p class="tem-note" id="temNote" hidden></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.tem-wrap{background:#fff;border-radius:14px;width:100%;max-width:620px;box-shadow:0 18px 44px rgba(15,23,42,.08);overflow:visible;border:1px solid #e2e8f0}
.tem-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #f1f5f9}
.tem-bar h3{font-size:15px;font-weight:800;color:#0f172a}

.tem-menu{position:relative}
.tem-toggle{display:inline-flex;align-items:center;gap:6px;background:#0f172a;color:#fff;border:none;border-radius:9px;padding:8px 14px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.tem-toggle:hover{background:#1e293b}
.tem-caret{font-size:10px}
.tem-drop{position:absolute;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #e2e8f0;border-radius:10px;box-shadow:0 12px 32px rgba(15,23,42,.16);min-width:180px;padding:6px;z-index:20}
.tem-drop[hidden]{display:none}
.tem-item{display:flex;align-items:center;gap:9px;width:100%;background:none;border:none;text-align:left;padding:9px 10px;border-radius:7px;font-size:13px;font-weight:600;color:#334155;cursor:pointer;font-family:inherit}
.tem-item:hover{background:#f1f5f9}
.tem-item svg{color:#64748b;flex-shrink:0}

.tem-table{width:100%;border-collapse:collapse;font-size:13px}
.tem-table th{text-align:left;padding:10px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#64748b}
.tem-num{text-align:right}
.tem-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155}
.tem-table td:last-child{text-align:right;font-weight:700;font-variant-numeric:tabular-nums}
.tem-table tbody tr:hover{background:#f8fafc}
.tem-note{padding:0 18px 14px;font-size:12px;font-weight:600;color:#16a34a}
.tem-note[hidden]{display:none}

@media print {
  body{background:#fff;padding:0}
  .tem-wrap{box-shadow:none;border:none;max-width:none}
  .tem-bar .tem-menu,.tem-note{display:none}
  .tem-bar{border-bottom:2px solid #000}
  .tem-table th{background:#fff;color:#000;border-bottom:2px solid #000}
  .tem-table td{color:#000}
  .tem-table tbody tr:hover{background:none}
}`,

  js: `var COLUMNS = ['SKU', 'Item', 'Warehouse', 'Qty'];
var KEYS = ['sku', 'item', 'warehouse', 'qty'];
var ROWS = [
  { sku: 'WD-1042', item: 'Wireless mouse', warehouse: 'North', qty: 214 },
  { sku: 'WD-1043', item: 'USB-C hub, 7-port', warehouse: 'East', qty: 58 },
  { sku: 'WD-1044', item: 'Mechanical keyboard', warehouse: 'North', qty: 132 },
  { sku: 'WD-1045', item: '27" monitor', warehouse: 'West', qty: 21 },
  { sku: 'WD-1046', item: 'Laptop stand', warehouse: 'East', qty: 96 },
];

var body = document.getElementById('temBody');
body.innerHTML = ROWS.map(function (r) {
  return '<tr><td>' + r.sku + '</td><td>' + r.item + '</td><td>' + r.warehouse + '</td><td>' + r.qty + '</td></tr>';
}).join('');

var toggle = document.getElementById('temToggle');
var drop = document.getElementById('temDrop');
var note = document.getElementById('temNote');

toggle.addEventListener('click', function (e) {
  e.stopPropagation();
  drop.hidden = !drop.hidden;
});
document.addEventListener('click', function () { drop.hidden = true; });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') drop.hidden = true; });

function showNote(msg) {
  note.textContent = msg;
  note.hidden = false;
  setTimeout(function () { note.hidden = true; }, 2600);
}

function download(filename, content, type) {
  var blob = new Blob([content], { type: type });
  var url = URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// RFC-4180-style escaping.
function csvCell(v) {
  var s = String(v);
  if (/[",\\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function exportCsv() {
  var lines = [COLUMNS.map(csvCell).join(',')];
  ROWS.forEach(function (r) {
    lines.push(KEYS.map(function (k) { return csvCell(r[k]); }).join(','));
  });
  var csv = lines.join('\\r\\n');
  download('inventory-' + new Date().toISOString().slice(0, 10) + '.csv', '\\ufeff' + csv, 'text/csv;charset=utf-8;');
  showNote('\\u2713 Exported ' + ROWS.length + ' rows to CSV');
}

function exportJson() {
  var json = JSON.stringify(ROWS, null, 2);
  download('inventory-' + new Date().toISOString().slice(0, 10) + '.json', json, 'application/json;charset=utf-8;');
  showNote('\\u2713 Exported ' + ROWS.length + ' rows to JSON');
}

function exportPrint() {
  // The @media print rules hide the export menu/note and force a clean layout —
  // window.print() opens the browser's real print dialog against that stylesheet.
  window.print();
}

document.getElementById('temDrop').addEventListener('click', function (e) {
  var btn = e.target.closest('.tem-item');
  if (!btn) return;
  var action = btn.dataset.action;
  if (action === 'csv') exportCsv();
  else if (action === 'json') exportJson();
  else if (action === 'print') exportPrint();
  drop.hidden = true;
});`,

  seo: {
    title: 'Table Export Menu — CSV, JSON & Print, Real Working Downloads (JS)',
    description: `A table with a real Export dropdown offering CSV download, JSON download, and a print-optimized view — all three genuinely functional, no console.log stand-ins. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Table Export Menu — One Dropdown, Three Real Export Actions',
      description: `Most tables eventually need more than one export format — a CSV for spreadsheets, JSON for another tool to consume, and a clean printable page for a physical record. This snippet builds a single "Export ▾" dropdown with all three actions genuinely wired up in plain HTML, CSS, and vanilla JavaScript: correctly-escaped CSV, structured JSON matching the row data, and a real \`window.print()\` call against dedicated \`@media print\` rules — every action produces a real file or a real print dialog, nothing is a decorative button.

**A real dropdown menu, not a static list**

The "Export ▾" button toggles a positioned \`.tem-drop\` panel, closes on an outside click or Escape, and stops the toggle click from immediately re-triggering the document-level close listener via \`stopPropagation()\`. This is the standard, dependency-free dropdown pattern — no library, just a hidden attribute and two listeners.

**CSV: RFC-4180 escaping, not naive joining**

\`exportCsv()\` reuses the same \`csvCell()\` escaping rule as a dedicated [CSV export table](/ui-snippets/csv-export-table/): values containing a comma, quote, or newline are wrapped in quotes with internal quotes doubled. A UTF-8 BOM is prepended so Excel reads accented characters correctly, and the result is downloaded via a \`Blob\` + temporary \`<a download>\` — entirely client-side.

**JSON: the same row data as an array of objects**

\`exportJson()\` calls \`JSON.stringify(ROWS, null, 2)\` directly on the same object array that renders the table — not a re-shaped or hand-written copy — so the exported JSON is guaranteed to match what's on screen, keyed by the same field names (\`sku\`, \`item\`, \`warehouse\`, \`qty\`). This is the format another script, API, or tool would actually want to consume, as opposed to the flat rows CSV needs.

**Print: real @media print rules, not a fake preview**

\`exportPrint()\` calls the browser's native \`window.print()\`. The page defines an \`@media print\` block that hides the export menu and the confirmation note, removes shadows/borders/hover backgrounds, and forces black-on-white table text — so what prints is a clean report, not a screenshot of the interactive UI with a floating button baked in. Because it's real \`@media print\` CSS and a real \`window.print()\` call, it works in the browser's actual print preview and any physical printer, not just as a stylized "looks printable" mockup.

**One source of truth, three outputs**

All three actions read from the same \`ROWS\`/\`COLUMNS\`/\`KEYS\` — there's no separate hardcoded string for any format, so adding a column or row updates all three exports and the visible table simultaneously. Pair this with a [data table](/ui-snippets/data-table/) for sorting/filtering before export, or a dedicated [print view](/ui-snippets/table-print-view/) if print is your primary export format.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An inventory table renders with an "Export ▾" button in the header.` },
      { title: 'Open the menu', text: `Click Export to reveal Download CSV, Download JSON, and Print view.` },
      { title: 'Download CSV', text: `A correctly-escaped, UTF-8 BOM-prefixed .csv file downloads immediately.` },
      { title: 'Download JSON', text: `A .json file downloads containing the exact row objects as an array.` },
      { title: 'Use Print view', text: `Triggers the browser's print dialog against dedicated @media print styling that hides the menu.` },
      { title: 'Close the menu', text: `Click outside or press Escape to dismiss the dropdown without exporting.` },
    ] },
    features: [
      { title: 'Real dropdown menu', text: `Toggles open/closed, closes on outside click or Escape.` },
      { title: 'Working CSV export', text: `RFC-4180 escaping and a UTF-8 BOM via a real Blob download.` },
      { title: 'Working JSON export', text: `JSON.stringify on the actual row objects — matches the table exactly.` },
      { title: 'Working print view', text: `A genuine window.print() call against dedicated @media print rules.` },
      { title: 'Print hides interactive chrome', text: `The export menu and confirmation note disappear only in print output.` },
      { title: 'One data source, three outputs', text: `CSV, JSON, and the table all render from the same ROWS array.` },
      { title: 'Export confirmation', text: `A note confirms row count exported for CSV and JSON, then auto-dismisses.` },
      { title: 'No library', text: `Blob, URL.createObjectURL, and window.print() — all native browser APIs.` },
    ],
    useCases: [
      { title: 'Admin dashboard exports', text: 'Offer spreadsheet, API-consumable and printable output from one Export menu, closing on outside click or Escape.' },
      { title: 'Warehouse printing', text: 'Let operations staff print a clean copy of a [data table](/ui-snippets/data-table/), using dedicated `@media print` rules that remove interface chrome.' },
      { title: 'JSON hand-off to tools', text: 'Feed another script with `JSON.stringify` of the real row objects, so the export matches the table exactly.' },
      { title: 'Finance and invoicing', text: 'Export line items in several formats from an [invoice line items table](/ui-snippets/invoice-line-items-table/), with CSV escaped per RFC 4180.' },
      { title: 'Compliance records', text: 'Print a dated, chrome-free report for audits, and see [CSV export table](/ui-snippets/csv-export-table/) for a single-format version.' },
      { icon: 'CODE', title: 'Related: Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted', desc: 'See the [Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted](/ui-snippets/table-row-density-toggle/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are all three export actions actually functional?', a: `Yes. CSV and JSON both build a real Blob and trigger a genuine file download via a temporary anchor element — open the downloaded files and they contain the actual row data, correctly escaped for CSV and structured as an array of objects for JSON. Print calls the browser's real window.print() against dedicated @media print CSS, so it opens the actual print dialog, not a styled mockup.` },
      { q: 'Why does the print view need its own CSS block?', a: `Without @media print rules, printing the page would output the interactive UI as-is — the Export button, hover states, shadows, and colored backgrounds baked onto paper. The @media print block hides the menu and note entirely, strips shadows and borders, and forces plain black-on-white text so the printed page reads like a clean report.` },
      { q: 'Does the JSON export match the table exactly?', a: `Yes — exportJson() calls JSON.stringify directly on the same ROWS array of objects that renders the table body, with no reshaping. So the field names and values in the downloaded JSON are exactly what's rendered, keyed by sku/item/warehouse/qty.` },
      { q: 'Why does the CSV export prepend a BOM character?', a: `Microsoft Excel doesn't assume UTF-8 by default and can mangle accented or non-Latin characters without a byte-order mark. Prepending \\ufeff signals UTF-8 to Excel so names and text with accents open correctly, while remaining invisible to other tools like Google Sheets.` },
      { q: 'How do I use this export menu in React, Vue, or Angular?', a: `Keep drop-open state in a boolean, and put the exportCsv/exportJson/exportPrint logic in the menu item's click handlers — all three functions (Blob creation, anchor download, window.print) are plain browser APIs that work identically inside any framework's event handlers.` },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing which parts of a multi-format export menu are real, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the same ROWS array feeds all three export paths — CSV via csvCell() escaping, JSON via a direct JSON.stringify, and print via a dedicated @media print stylesheet block — so none of the three formats can silently drift from what's rendered on screen. The same assistant can help extend it: ask it to add an XLSX export using a lightweight in-browser library, let the user pick which columns to include before exporting, or export only the currently filtered/selected rows instead of the full dataset. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a table with a single "Export ▾" dropdown menu offering three real, working export actions in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A dropdown toggle button that shows/hides a menu panel with three items: Download CSV, Download JSON, Print view. The menu must close when clicking outside it or pressing Escape, and the toggle click must not immediately re-trigger the outside-click close handler.
- CSV export: build the CSV string with a proper RFC-4180 escaping function (quote and double-escape any field containing a comma, quote, or newline), prepend a UTF-8 byte-order-mark, and trigger a real file download via a Blob and a temporary anchor element with a download attribute — not a console.log or alert.
- JSON export: call JSON.stringify (pretty-printed) directly on the same in-memory array of row objects that renders the table, and trigger a real .json file download via the same Blob/anchor technique — the exported JSON must be an array of objects with the same keys as the table's data, not a hand-written or reshaped string.
- Print export: call the browser's native window.print() function, and define a real @media print CSS block that hides the export menu button and any confirmation/toast elements, removes box-shadows, colored backgrounds, and hover-only styles, and forces plain black text on a white background for the table — verify by using the browser's print preview that the menu is absent from the printed output.
- All three actions must derive from one shared array of row data — do not hardcode a separate string for any of the three formats — so adding or editing a row automatically updates all three export outputs and the visible table together.
- Show a brief confirmation message after CSV/JSON export stating how many rows were exported, auto-dismissing after a couple seconds, and make sure that message itself is hidden in the print output.`,
    },
  },
};

export default tableExportMenu;
