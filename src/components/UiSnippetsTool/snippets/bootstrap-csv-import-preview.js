const bootstrapCsvImportPreview = {
  id: 'bootstrap-csv-import-preview',
  title: 'Bootstrap CSV Import Preview',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscsv-card">
    <div class="card-body p-3">
      <label class="form-label small fw-semibold">Paste CSV data</label>
      <textarea class="form-control mb-2" id="bscsvInput" rows="4">name,email,role
Dana Reyes,dana@acme.co,Admin
Marcus Lee,marcus@acme,Editor
,priya@acme.co,Viewer</textarea>
      <button type="button" class="btn btn-dark btn-sm fw-bold mb-3" id="bscsvParse">Preview import</button>

      <div class="d-none" id="bscsvResult">
        <p class="small mb-2">
          <span class="text-success fw-semibold" id="bscsvValid">0 valid</span> &middot;
          <span class="text-danger fw-semibold" id="bscsvInvalid">0 with errors</span>
        </p>
        <div class="table-responsive">
          <table class="table table-sm mb-0" id="bscsvTable"></table>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bscsv-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bscsvInput { font: 12px ui-monospace, Menlo, Consolas, monospace; }
.bscsv-row-error { background: #fef2f2; }
.bscsv-error-msg { font-size: 10.5px; color: #dc3545; display: block; }`,
  js: `const input = document.getElementById('bscsvInput');
const table = document.getElementById('bscsvTable');
const result = document.getElementById('bscsvResult');
const validEl = document.getElementById('bscsvValid');
const invalidEl = document.getElementById('bscsvInvalid');

// A minimal CSV line parser handling quoted fields with embedded commas —
// not a full RFC 4180 implementation, but correct for the common cases a
// pasted spreadsheet export actually produces.
function parseLine(line) {
  const fields = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') { inQuotes = !inQuotes; continue; }
    if (ch === ',' && !inQuotes) { fields.push(current); current = ''; continue; }
    current += ch;
  }
  fields.push(current);
  return fields.map(f => f.trim());
}

function validateRow(row) {
  const errors = [];
  if (!row.name) errors.push('missing name');
  if (!row.email || !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(row.email)) errors.push('invalid email');
  return errors;
}

document.getElementById('bscsvParse').addEventListener('click', () => {
  const lines = input.value.split('\\n').map(l => l.trim()).filter(Boolean);
  if (lines.length < 2) return;

  const headers = parseLine(lines[0]);
  const rows = lines.slice(1).map(line => {
    const values = parseLine(line);
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ''; });
    row.__errors = validateRow(row);
    return row;
  });

  const validCount = rows.filter(r => r.__errors.length === 0).length;
  validEl.textContent = validCount + ' valid';
  invalidEl.textContent = (rows.length - validCount) + ' with errors';

  table.innerHTML =
    '<thead><tr>' + headers.map(h => '<th>' + h + '</th>').join('') + '</tr></thead>' +
    '<tbody>' + rows.map(row => {
      const hasErrors = row.__errors.length > 0;
      return '<tr class="' + (hasErrors ? 'bscsv-row-error' : '') + '">' +
        headers.map(h => '<td>' + (row[h] || '<em class="text-muted">empty</em>') + '</td>').join('') +
        '</tr>' + (hasErrors ? '<tr class="bscsv-row-error"><td colspan="' + headers.length +
          '"><span class="bscsv-error-msg">' + row.__errors.join(', ') + '</span></td></tr>' : '');
    }).join('') + '</tbody>';

  result.classList.remove('d-none');
});`,

  seo: {
    title: 'Bootstrap CSV Import Preview — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 CSV import preview — parses pasted CSV text (including quoted fields with embedded commas), validates each row, and flags exactly which rows and reasons would fail before anything is actually imported.',
    about: {
      title: 'Bootstrap CSV Import Preview — HTML, CSS & JavaScript',
      description: `Splitting a CSV line on a plain comma breaks the instant a field itself contains a comma inside quotes (a common case in a real spreadsheet export, like an address field) — \`parseLine()\` instead walks the line character by character, tracking an \`inQuotes\` flag that a \`"\` character flips, and only treats a comma as a field separator while that flag is false. That's a small but genuinely necessary piece of correctness a naive \`line.split(',')\` implementation gets wrong.\n\nEvery parsed row is validated independently through \`validateRow()\`, which returns an array of specific, human-readable error strings rather than a single "invalid" boolean — a row is flagged for a missing name and a badly formatted email separately, so the errors shown per row (\`"missing name, invalid email"\`) tell the user exactly what to fix, not just that something's wrong.\n\nThe headers themselves come from the first parsed line rather than being hardcoded, so \`row[h]\` for each header \`h\` builds every row as a plain object keyed by whatever columns the pasted data actually has — pasting CSV data with different column names or a different column count renders correctly without any code changes, since nothing downstream assumes a fixed schema.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A textarea holds sample CSV text: a header row plus three data rows, one with a malformed email and one with a missing name.' },
        { title: 'Click "Preview import"', text: 'A table renders every row, with a live count of valid rows vs. rows with errors above it.' },
        { title: 'Look at the row with "marcus@acme" (missing a domain suffix)', text: 'It\'s highlighted red with an inline "invalid email" message beneath it.' },
        { title: 'Look at the row with an empty name field', text: 'It shows "empty" in italics for that cell and lists "missing name" as its specific error.' },
        { title: 'Edit the textarea to fix an error, then click "Preview import" again', text: 'The corrected row moves from the error count into the valid count.' },
      ],
    },
    features: [
      'A real character-by-character CSV line parser that correctly handles quoted fields containing commas',
      'Per-row validation returns specific, readable error reasons rather than a single pass/fail flag',
      'Column headers are read from the pasted data itself, not hardcoded to a fixed schema',
      'Invalid rows are visually flagged with their exact error reasons shown inline, right below the row',
      'A live valid-vs-error count summarizes the whole import before anything is actually committed',
    ],
    useCases: [
      { icon: 'DEV', title: 'Bulk user, contact, or product import tools', desc: 'Let an admin catch and fix data problems before an import runs, rather than discovering failures after the fact.' },
      { icon: 'DEV', title: 'Guarding against the same file being imported twice', desc: 'Pair with [bootstrap-duplicate-file-detection-upload](/ui-snippets/bootstrap-duplicate-file-detection-upload/) to catch a re-uploaded CSV before it\'s even parsed.' },
      { icon: 'APP', title: 'Internal data migration and onboarding tools', desc: 'A safety check before committing a bulk operation against real records.' },
      { icon: 'FORM', title: 'Spreadsheet-to-database import flows', desc: 'Pairs naturally with any backend import endpoint as the client-side preview step before submission.' },
    ],
    faqs: [
      { q: 'Does the parser handle quoted fields with commas inside them?', a: 'Yes — parseLine() tracks whether it\'s currently inside a quoted field and only treats a comma as a field separator when it isn\'t, correctly handling a value like "Reyes, Dana" as one field rather than splitting it into two.' },
      { q: 'Is this a full RFC 4180-compliant CSV parser?', a: 'No — it handles the common real-world cases (quoted fields, embedded commas) but not every edge case of the full CSV specification, like escaped quotes within a quoted field. For fully compliant parsing of arbitrary real-world CSV files, a dedicated library like PapaParse is the safer choice.' },
      { q: 'What validation rules does it check?', a: 'This demo checks for a non-empty name and a plausibly formatted email address as an illustrative example — validateRow() is the single place to add or change rules for whatever fields your real import actually requires.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep parseLine() and validateRow() as plain, framework-agnostic functions, store the parsed rows in component state, and map them to your framework\'s table-rendering approach instead of building an HTML string directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a real file input (in addition to the paste textarea) that reads an uploaded .csv file via FileReader before parsing, or to add a "download only invalid rows" button so a user can fix and re-upload just the rows that failed validation.`,
      prompt: `Build a Bootstrap 5.3 CSV import preview tool, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A textarea where a user can paste CSV text (header row plus data rows), and a "Preview import" button.
- Implement a character-by-character CSV line parser that correctly handles quoted fields containing embedded commas, rather than naively splitting each line on a plain comma.
- Read column headers from the first parsed line dynamically — don't hardcode a fixed set of expected columns.
- Validate each data row (e.g. requiring a non-empty name field and a plausibly formatted email field) and collect specific, readable error messages per row rather than a single pass/fail flag.
- Render every row in a table, visually flagging rows with validation errors and showing their specific error reasons inline, alongside a live summary count of valid rows versus rows with errors.`,
    },
  },
};

export default bootstrapCsvImportPreview;
