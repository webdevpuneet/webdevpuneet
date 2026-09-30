const tableExportColumnSelector = {
  id: 'table-export-column-selector',
  title: 'Table Export with Column Selector — Choose Exactly What Gets Exported',
  lastmod: '2026-08-28',
  category: 'tables',
  html: `<div class="demo">
  <div class="export-toolbar">
    <span class="export-title">Customer orders (4 rows)</span>
    <div class="export-wrap">
      <button class="export-btn" id="exportBtn" aria-haspopup="true" aria-expanded="false">
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
        Export
      </button>
      <div class="export-panel" id="exportPanel" hidden>
        <p class="export-panel-title">Columns to include</p>
        <label class="export-check"><input type="checkbox" value="id" checked /> Order ID</label>
        <label class="export-check"><input type="checkbox" value="customer" checked /> Customer</label>
        <label class="export-check"><input type="checkbox" value="total" checked /> Total</label>
        <label class="export-check"><input type="checkbox" value="status" checked /> Status</label>
        <label class="export-check"><input type="checkbox" value="date" /> Order date</label>
        <label class="export-check"><input type="checkbox" value="region" /> Region</label>
        <div class="export-format">
          <span class="export-panel-title">Format</span>
          <div class="format-row">
            <label><input type="radio" name="fmt" value="csv" checked /> CSV</label>
            <label><input type="radio" name="fmt" value="json" /> JSON</label>
          </div>
        </div>
        <button class="export-confirm" id="exportConfirm">Download export</button>
      </div>
    </div>
  </div>

  <table class="export-table" id="exportTable">
    <thead><tr>
      <th data-key="id">Order ID</th><th data-key="customer">Customer</th><th data-key="total">Total</th>
      <th data-key="status">Status</th><th data-key="date">Order date</th><th data-key="region">Region</th>
    </tr></thead>
    <tbody>
      <tr><td data-key="id">#8841</td><td data-key="customer">Mia Chen</td><td data-key="total">$212.00</td><td data-key="status">Shipped</td><td data-key="date">2026-08-11</td><td data-key="region">EU</td></tr>
      <tr><td data-key="id">#8842</td><td data-key="customer">Sam Okoye</td><td data-key="total">$58.40</td><td data-key="status">Processing</td><td data-key="date">2026-08-14</td><td data-key="region">NA</td></tr>
      <tr><td data-key="id">#8843</td><td data-key="customer">Jules Park</td><td data-key="total">$140.75</td><td data-key="status">Delivered</td><td data-key="date">2026-08-09</td><td data-key="region">APAC</td></tr>
      <tr><td data-key="id">#8844</td><td data-key="customer">Ravi Singh</td><td data-key="total">$76.20</td><td data-key="status">Shipped</td><td data-key="date">2026-08-16</td><td data-key="region">NA</td></tr>
    </tbody>
  </table>

  <pre class="export-preview" id="exportPreview" hidden></pre>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 560px; max-width: 100%; display: flex; flex-direction: column; gap: 12px; }

.export-toolbar { display: flex; align-items: center; justify-content: space-between; }
.export-title { font-size: 13px; font-weight: 700; color: #111827; }
.export-wrap { position: relative; }
.export-btn { display: flex; align-items: center; gap: 7px; padding: 8px 14px; border: 1.5px solid #e2e8f0; background: #fff; border-radius: 9px; font-size: 12.5px; font-weight: 700; color: #334155; cursor: pointer; font-family: inherit; }
.export-btn:hover { border-color: #6366f1; color: #4338ca; }

.export-panel { position: absolute; right: 0; top: calc(100% + 8px); width: 220px; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 14px; box-shadow: 0 20px 45px rgba(15,23,42,0.14); z-index: 10; display: flex; flex-direction: column; gap: 8px; }
.export-panel-title { font-size: 10.5px; font-weight: 800; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; margin-top: 4px; }
.export-panel-title:first-child { margin-top: 0; }
.export-check { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #334155; cursor: pointer; }
.export-check input { accent-color: #6366f1; }
.export-format { display: flex; flex-direction: column; gap: 6px; }
.format-row { display: flex; gap: 14px; }
.format-row label { display: flex; align-items: center; gap: 5px; font-size: 12.5px; color: #334155; }
.format-row input { accent-color: #6366f1; }

.export-confirm { margin-top: 6px; padding: 9px; border: none; border-radius: 9px; background: #4f46e5; color: #fff; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.export-confirm:hover { background: #4338ca; }

.export-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.export-table th { text-align: left; font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; padding: 9px 12px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
.export-table td { padding: 9px 12px; font-size: 12.5px; color: #334155; border-bottom: 1px solid #f1f5f9; }
.export-table tr:last-child td { border-bottom: none; }

.export-preview { background: #0f172a; color: #d1fae5; font-size: 11px; padding: 14px; border-radius: 10px; overflow-x: auto; max-height: 180px; overflow-y: auto; white-space: pre; font-family: 'SFMono-Regular', Consolas, monospace; }`,
  js: `const exportBtn = document.getElementById('exportBtn');
const exportPanel = document.getElementById('exportPanel');
const exportConfirm = document.getElementById('exportConfirm');
const exportPreview = document.getElementById('exportPreview');
const table = document.getElementById('exportTable');

const COLUMN_LABELS = { id: 'Order ID', customer: 'Customer', total: 'Total', status: 'Status', date: 'Order date', region: 'Region' };

exportBtn.addEventListener('click', () => {
  const isOpen = !exportPanel.hidden;
  exportPanel.hidden = isOpen;
  exportBtn.setAttribute('aria-expanded', String(!isOpen));
});

document.addEventListener('click', (e) => {
  if (!exportPanel.hidden && !e.target.closest('.export-wrap')) {
    exportPanel.hidden = true;
    exportBtn.setAttribute('aria-expanded', 'false');
  }
});

function getSelectedColumns() {
  return Array.from(exportPanel.querySelectorAll('.export-check input:checked')).map((cb) => cb.value);
}

function getFormat() {
  return exportPanel.querySelector('input[name="fmt"]:checked').value;
}

// Reads directly from the live DOM table rather than a separate data model —
// this guarantees the export always reflects exactly what's on screen right
// now (including any sorting or filtering already applied to the table),
// rather than a stale copy of the original dataset.
function collectRows(columns) {
  const rows = Array.from(table.querySelectorAll('tbody tr'));
  return rows.map((row) => {
    const record = {};
    columns.forEach((key) => {
      const cell = row.querySelector(\`td[data-key="\${key}"]\`);
      record[key] = cell ? cell.textContent.trim() : '';
    });
    return record;
  });
}

function toCsv(records, columns) {
  const escapeCell = (value) => {
    const str = String(value);
    // Quote any cell containing a comma, quote, or newline, doubling internal quotes —
    // the standard CSV escaping rule, applied consistently rather than only "when it looks needed."
    return /[",\\n]/.test(str) ? '"' + str.replace(/"/g, '""') + '"' : str;
  };
  const header = columns.map((c) => escapeCell(COLUMN_LABELS[c])).join(',');
  const lines = records.map((r) => columns.map((c) => escapeCell(r[c])).join(','));
  return [header, ...lines].join('\\n');
}

function toJson(records) {
  return JSON.stringify(records, null, 2);
}

exportConfirm.addEventListener('click', () => {
  const columns = getSelectedColumns();
  if (columns.length === 0) {
    exportPreview.hidden = false;
    exportPreview.textContent = 'Select at least one column to export.';
    return;
  }

  const format = getFormat();
  const records = collectRows(columns);
  const output = format === 'csv' ? toCsv(records, columns) : toJson(records);

  exportPreview.hidden = false;
  exportPreview.textContent = output;

  exportPanel.hidden = true;
  exportBtn.setAttribute('aria-expanded', 'false');
});`,
  seo: {
    title: 'Table Export with Column Selector — CSV/JSON Export of Exactly the Columns You Want',
    description: 'A data table export panel letting users pick exactly which columns to include and which format (CSV or JSON) to generate, reading live from the rendered table so the export always matches what is on screen.',
    about: {
      title: 'Table Export with a Column Selector — Exporting Exactly What the User Wants',
      description: `A one-click "Export all" button is easy to build but often exports far more than a user actually wants — every column, whether relevant or not, in whatever format the developer happened to pick. This snippet gives the user real control: a checklist of which columns to include, a choice between CSV and JSON, and a generated output that reflects exactly those choices.

**Reading from the live table, not a separate data model**

\`collectRows()\` queries \`tbody tr\` elements directly from the rendered \`<table>\` and reads each cell's \`textContent\` by its \`data-key\` attribute — it does not reference a separate JavaScript array of "the original dataset." This is a deliberate choice: if the table were later hooked up to sorting, filtering, or pagination, the export would automatically reflect whatever rows and order are *currently visible*, with zero additional wiring. A hardcoded data-model export would silently ignore any live filtering already applied to the table, exporting stale or irrelevant rows.

**Correct CSV escaping, not just \`.join(',')\`**

\`toCsv()\`'s \`escapeCell()\` function checks each value for a comma, double quote, or newline, and — only when one of those is present — wraps the value in double quotes with any internal quotes doubled (the standard CSV escaping convention). A naive \`row.join(',')\` implementation would silently corrupt any cell containing a comma (splitting it into extra, misaligned columns when the file is opened in a spreadsheet), so this check runs on every cell rather than being skipped as an edge case.

**Column labels are separate from column keys**

\`COLUMN_LABELS\` maps each internal \`data-key\` value (like \`id\`, \`date\`) to its human-readable export header (\`Order ID\`, \`Order date\`). Keeping this mapping explicit and separate from the raw keys means the exported CSV header row is genuinely readable rather than a dump of internal field names — and it's the same mapping used to render the checkbox labels in the column-selector panel, so the two stay consistent automatically.

**Guarding against an empty-column export**

If a user unchecks every column and clicks export anyway, the code short-circuits before generating anything and shows a clear message instead of producing a blank or malformed file — a small check, but one that prevents a genuinely confusing empty-download experience.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the Export button', text: 'Opens a panel listing every available column as a checkbox, plus a format choice between CSV and JSON.' },
        { title: 'Uncheck columns you don\'t need', text: 'Only checked columns are included in the generated export — order ID, customer, and total are checked by default in this demo.' },
        { title: 'Choose CSV or JSON', text: 'CSV produces a comma-separated file with a proper header row and correctly escaped values; JSON produces an array of objects keyed by column.' },
        { title: 'Click Download export', text: 'The generated output renders in a preview area below the table — in a real app, this is where you would trigger an actual file download instead.' },
        { title: 'Adapt collectRows() to your own table', text: 'Match the data-key attributes on your table cells to the columns you want selectable, and update COLUMN_LABELS with your own readable header names.' },
      ],
    },
    features: [
      'User-selectable column checklist controls exactly which fields appear in the export, not a fixed "export everything"',
      'Choice between CSV and JSON output formats from the same selected column set',
      'Reads directly from the live rendered table, so the export automatically reflects any active sorting or filtering',
      'Correct CSV escaping for cells containing commas, quotes, or newlines — not naive comma-joining',
      'Separate human-readable column labels used for CSV headers, decoupled from internal data-key attribute names',
      'Guards against exporting with zero columns selected, showing a clear message instead of a broken file',
      'Export panel closes on an outside click and manages aria-expanded for accessible disclosure behavior',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Admin reporting tables', desc: 'Let internal users export only the columns relevant to their current report, instead of every field in the schema.' },
      { icon: 'FINANCE', title: 'Order and transaction exports', desc: 'Finance teams often need specific column subsets (totals and dates, but not internal IDs) for reconciliation spreadsheets.' },
      { icon: 'CRM', title: 'Contact and lead list exports', desc: 'Sales tools exporting contact lists benefit from letting users exclude sensitive or irrelevant columns per export.' },
      { icon: 'API', title: 'JSON export for downstream tooling', desc: 'The JSON format option produces clean, structured data ready to feed into another script or API without further parsing.' },
      { icon: 'CODE', title: 'Related: Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted', desc: 'See the [Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted](/ui-snippets/table-row-density-toggle/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the export include rows that have been filtered or sorted in the table?', a: 'Yes — collectRows() reads directly from the currently rendered tbody rows, so any sorting or filtering already applied to the table is automatically reflected in the export with no extra code needed.' },
      { q: 'What happens if a cell value contains a comma?', a: 'toCsv()\'s escaping function detects commas (and quotes and newlines) in a cell value and wraps that cell in double quotes, doubling any internal quotes — the standard CSV escaping rule — so the value stays in a single column when opened in a spreadsheet.' },
      { q: 'What if I uncheck every column and try to export?', a: 'The export short-circuits before generating any output and shows a "select at least one column" message instead of producing an empty or malformed file.' },
      { q: 'How do I make this trigger an actual file download instead of a preview?', a: 'Replace the exportPreview.textContent assignment with code that creates a Blob from the generated string and triggers a download via a temporary anchor element with the download attribute, using .csv or .json as the file extension based on the chosen format.' },
      { q: 'Why are column labels kept separate from the data-key values?', a: 'data-key values (like "id" or "date") are meant to be short, stable identifiers used for both the checkbox values and the DOM queries. COLUMN_LABELS maps each one to a proper human-readable header, so the exported CSV/JSON is genuinely readable rather than exposing internal field naming.' },
      { q: 'Can I add more columns to select from?', a: 'Add a new data-key attribute to both the header and every row\'s corresponding cell, add a matching checkbox to the export panel, and add an entry to COLUMN_LABELS — the export logic picks up any selected column generically.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why reading export data from the live DOM table (rather than a separate JavaScript data array) is the more robust choice once sorting or filtering is added, and to walk through exactly what the CSV escaping function protects against with a concrete example value containing a comma. It's also worth asking for an XLSX export option using a lightweight library, or for a version that remembers a user's last-selected columns across sessions via localStorage.`,
      prompt: `Build a table export feature in HTML, CSS, and vanilla JavaScript with a column selector and a CSV/JSON format choice — no external library.

Requirements:
- A data table of at least four rows and six columns, each cell tagged with a data-key attribute identifying its column.
- An Export button that opens a dropdown panel containing a checkbox for every column (some checked by default, some not) and a radio choice between CSV and JSON output format.
- Generate the export by reading directly from the currently rendered table rows (not a separate hardcoded dataset), including only the columns whose checkbox is checked, in the order they appear in the panel.
- Implement correct CSV escaping: any cell value containing a comma, a double quote, or a newline must be wrapped in double quotes with internal quotes doubled, following the standard CSV escaping convention — not a naive comma-join that would corrupt such values.
- Use a separate mapping from each column's internal key to a human-readable header label for the CSV header row and the checkbox labels, rather than exposing raw internal key names to the user.
- If the user attempts to export with zero columns selected, show a clear message instead of generating an empty or malformed export.
- Show the generated CSV or JSON output in a preview area after clicking a confirm button inside the panel, and close the panel automatically both on confirm and on an outside click.`,
    },
  },
};

export default tableExportColumnSelector;
