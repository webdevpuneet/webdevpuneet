const tableNestedJsonMapper = {
  id: 'table-nested-json-mapper',
  title: 'Nested JSON to Table Mapper',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="njm-wrap">
  <div class="njm-bar">
    <h3>Nested JSON → flat table</h3>
    <div class="njm-tabs">
      <button type="button" class="njm-tab njm-on" data-view="split">Split</button>
      <button type="button" class="njm-tab" data-view="json">JSON only</button>
      <button type="button" class="njm-tab" data-view="table">Table only</button>
    </div>
  </div>
  <div class="njm-panes" id="njmPanes">
    <div class="njm-pane" id="njmJsonPane">
      <div class="njm-pane-label">Raw nested JSON</div>
      <pre class="njm-json" id="njmJson"></pre>
    </div>
    <div class="njm-pane" id="njmTablePane">
      <div class="njm-pane-label">Flattened, dot-notation columns</div>
      <div class="njm-scroll"><table class="njm-table" id="njmTable"></table></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a1a12;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.njm-wrap{background:#0f261a;border-radius:14px;width:100%;max-width:760px;box-shadow:0 18px 44px rgba(0,0,0,.4);overflow:hidden;border:1px solid #1c3a28}
.njm-bar{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1c3a28;flex-wrap:wrap;gap:10px}
.njm-bar h3{font-size:14px;font-weight:800;color:#d1fae5}
.njm-tabs{display:flex;gap:6px}
.njm-tab{background:#132e20;border:1px solid #1c3a28;border-radius:7px;padding:6px 12px;font-size:11.5px;font-weight:700;color:#6ee7b7;cursor:pointer;font-family:inherit}
.njm-tab:hover{background:#173626}
.njm-tab.njm-on{background:#10b981;border-color:#10b981;color:#052e1c}

.njm-panes{display:grid;grid-template-columns:1fr 1fr;gap:1px;background:#1c3a28}
.njm-panes.njm-single{grid-template-columns:1fr}
.njm-pane{background:#0f261a;min-width:0}
.njm-pane[hidden]{display:none}
.njm-pane-label{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;color:#4ade80;padding:10px 14px;border-bottom:1px solid #1c3a28}

.njm-json{padding:12px 14px;font-family:'SF Mono',Consolas,monospace;font-size:11.5px;line-height:1.6;color:#a7f3d0;white-space:pre-wrap;word-break:break-word;max-height:360px;overflow:auto}

.njm-scroll{overflow:auto;max-height:400px}
.njm-table{width:100%;border-collapse:collapse;font-size:12px;font-variant-numeric:tabular-nums}
.njm-table th{position:sticky;top:0;text-align:left;padding:8px 10px;background:#132e20;border-bottom:1px solid #1c3a28;font-size:10px;font-weight:800;color:#6ee7b7;white-space:nowrap;font-family:'SF Mono',Consolas,monospace}
.njm-table td{padding:8px 10px;border-bottom:1px solid #16311f;color:#d1fae5;white-space:nowrap}
.njm-table tbody tr:hover{background:#132e20}

@media (max-width:640px){.njm-panes{grid-template-columns:1fr}}`,

  js: `var DATA = [
  {
    id: 101,
    user: { name: 'Aisha Khan', email: 'aisha@example.com', address: { city: 'Berlin', country: 'DE' } },
    order: { total: 128.4, currency: 'USD' },
    tags: ['vip', 'wholesale']
  },
  {
    id: 102,
    user: { name: 'Marco Rossi', email: 'marco@example.com', address: { city: 'Milan', country: 'IT' } },
    order: { total: 64, currency: 'USD' },
    tags: ['new']
  },
  {
    id: 103,
    user: { name: 'Lena Park', email: 'lena@example.com', address: { city: 'Seoul', country: 'KR' } },
    order: { total: 219.99, currency: 'EUR' },
    tags: []
  },
];

// Recursively flattens a nested object into { 'a.b.c': value } pairs using dot notation.
// Arrays of primitives are joined into a readable string; arrays of objects are indexed
// (tags.0, tags.1, ...) via the same recursive call so nested arrays of objects also flatten.
function flatten(obj, prefix, out) {
  prefix = prefix || '';
  out = out || {};
  Object.keys(obj).forEach(function (key) {
    var value = obj[key];
    var path = prefix ? prefix + '.' + key : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flatten(value, path, out);
    } else if (Array.isArray(value)) {
      var allPrimitive = value.every(function (v) { return v === null || typeof v !== 'object'; });
      if (allPrimitive) {
        out[path] = value.join(', ');
      } else {
        value.forEach(function (v, i) { flatten({ item: v }, path + '.' + i, out); });
      }
    } else {
      out[path] = value;
    }
  });
  return out;
}

function flattenAll(records) {
  var flatRows = records.map(function (r) { return flatten(r); });
  var columns = [];
  flatRows.forEach(function (row) {
    Object.keys(row).forEach(function (k) { if (columns.indexOf(k) < 0) columns.push(k); });
  });
  return { columns: columns, rows: flatRows };
}

var jsonEl = document.getElementById('njmJson');
var tableEl = document.getElementById('njmTable');

jsonEl.textContent = JSON.stringify(DATA, null, 2);

var flat = flattenAll(DATA);
tableEl.innerHTML = '<thead><tr>' +
  flat.columns.map(function (c) { return '<th>' + c + '</th>'; }).join('') +
  '</tr></thead><tbody>' +
  flat.rows.map(function (row) {
    return '<tr>' + flat.columns.map(function (c) {
      var v = row[c];
      return '<td>' + (v === undefined ? '<span style="opacity:.35">—</span>' : String(v)) + '</td>';
    }).join('') + '</tr>';
  }).join('') +
  '</tbody>';

var tabs = Array.prototype.slice.call(document.querySelectorAll('.njm-tab'));
var jsonPane = document.getElementById('njmJsonPane');
var tablePane = document.getElementById('njmTablePane');
var panes = document.getElementById('njmPanes');

tabs.forEach(function (tab) {
  tab.addEventListener('click', function () {
    tabs.forEach(function (t) { t.classList.toggle('njm-on', t === tab); });
    var view = tab.dataset.view;
    jsonPane.hidden = view === 'table';
    tablePane.hidden = view === 'json';
    panes.classList.toggle('njm-single', view !== 'split');
  });
});`,

  seo: {
    title: 'Nested JSON to Table Mapper — Recursive Flatten to Dot-Notation Columns (JS)',
    description: `A tool that flattens a nested JSON array into table columns using dot notation via a real recursive flattening function, with raw JSON and the result side by side. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Nested JSON to Table Mapper — Real Recursive Flattening to Dot-Notation Columns',
      description: `APIs almost never return flat data — a "user" object nests an "address," an order nests line items, and a table needs flat columns. This snippet builds a real recursive flattening function that walks arbitrarily nested JSON and produces dot-notation columns like \`user.address.city\`, then renders both the raw source and the flattened result — in plain HTML, CSS, and vanilla JavaScript, no library.

**Real recursion, not a fixed number of levels**

\`flatten(obj, prefix, out)\` calls itself whenever it encounters a nested plain object, appending the current key to a dot-joined \`prefix\` and recursing into the child object with that longer prefix. Because it's genuine recursion rather than two or three hardcoded \`obj.a.b\` accesses, it flattens objects nested to *any* depth — \`user.address.city\` works the same way \`user.address.geo.lat\` would if that level existed, with zero extra code.

**Handling arrays two different ways**

Arrays need their own rule, since "flatten an array" is ambiguous. This implementation checks whether every array element is a primitive: if so (like \`tags: ['vip', 'wholesale']\`), it joins them into one readable comma-separated cell rather than exploding them into columns. If the array holds objects, each element is recursively flattened under an indexed path (\`items.0.sku\`, \`items.1.sku\`), reusing the exact same \`flatten()\` call rather than a separate code path — so nested arrays-of-objects flatten correctly too.

**A stable column set across heterogeneous rows**

Because different records can have different nested shapes (one order has \`tags\`, another has none), \`flattenAll()\` collects the *union* of every flattened key across all rows into one ordered \`columns\` array, and any row missing a given column renders a dash. This is the detail that makes the table usable for real-world JSON, where not every record populates every optional nested field.

**Raw JSON and flattened table, side by side**

A tab control toggles between a split view (JSON on the left, the flattened table on the right), JSON-only, and table-only — so you can trace exactly which nested value produced which dot-notation column and cell. This traceability is what makes the tool useful for debugging an API response, not just for display.

**A generic utility, not display-only**

\`flatten()\` and \`flattenAll()\` are plain functions that return data (a \`{ columns, rows }\` shape) — they don't touch the DOM. That means the same flattening logic works for CSV export (feed \`columns\`/\`rows\` into the escaping logic from a [CSV export table](/ui-snippets/csv-export-table/)) or for building a searchable [data table](/ui-snippets/data-table/) on top of arbitrary nested JSON, not just this demo's read-only view.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Sample nested JSON renders on the left; its flattened dot-notation table renders on the right.` },
      { title: 'Compare a value', text: `Find "Berlin" in the JSON under user.address.city, then find the user.address.city column in the table.` },
      { title: 'Switch views', text: `Use the Split / JSON only / Table only tabs to focus on either side.` },
      { title: 'Note the missing-value dash', text: `The third record has no tags — its tags column renders a dash rather than breaking the row.` },
      { title: 'Swap in your own JSON', text: `Replace the DATA array with your API response; flatten() handles any nesting depth automatically.` },
      { title: 'Reuse the flattening logic', text: `Feed flattenAll()'s { columns, rows } output into a CSV export or a sortable table.` },
    ] },
    features: [
      { title: 'True recursive flattening', text: `flatten() calls itself for any nesting depth — not hardcoded for two or three levels.` },
      { title: 'Dot-notation columns', text: `Nested keys become user.address.city-style flat column headers.` },
      { title: 'Smart array handling', text: `Primitive arrays join into one cell; object arrays flatten with indexed paths.` },
      { title: 'Union column set', text: `Columns come from every row's keys combined, so heterogeneous records all fit one table.` },
      { title: 'Missing-value handling', text: `A row without a given nested field renders a dash instead of breaking the column count.` },
      { title: 'Side-by-side JSON and table', text: `Toggle between split, JSON-only, and table-only views to trace values.` },
      { title: 'Data functions, not display-only', text: `flatten()/flattenAll() return plain data reusable for CSV export or other tables.` },
      { title: 'No library', text: `Pure recursive JavaScript over plain objects and arrays.` },
    ],
    useCases: [
      { title: 'API response debugging', text: `Flatten a nested JSON payload into a table to eyeball every field at once.` },
      { title: 'Data pipeline previews', text: `Preview how nested records will map to flat spreadsheet columns before exporting via a [CSV export table](/ui-snippets/csv-export-table/).` },
      { title: 'Admin tools over document databases', text: `Render MongoDB/Firestore-style nested documents as flat, scannable rows.` },
      { title: 'Config and settings inspectors', text: `Turn a nested config JSON into a flat key/value-style table, similar to a [JSON tree](/ui-snippets/json-tree/) viewer's alternative flat view.` },
      { title: 'Log and event analysis', text: `Flatten nested event payloads into columns for a [sortable table](/ui-snippets/sortable-table/) or [filterable table](/ui-snippets/filterable-table/).` },
      { title: 'Learning recursive data transforms', text: `A reference for real recursive flattening — compare with [json-tree](/ui-snippets/json-tree/) for a nested (non-flattened) view of the same data.` },
    ],
    faqs: [
      { q: 'Does it really handle any depth of nesting, not just two or three levels?', a: `Yes. flatten() recurses on itself whenever it meets a nested plain object, extending the dot-joined path each call. There's no hardcoded limit like obj.a.b — a value nested five levels deep (e.g. user.address.geo.coords.lat) flattens correctly with the exact same code path as a two-level nesting.` },
      { q: 'How are arrays flattened?', a: `Two ways, decided per-array. An array where every element is a primitive (numbers, strings) is joined into a single readable comma-separated cell — exploding "tags: [vip, wholesale]" into two columns would be noisy and inconsistent across rows. An array of objects is instead flattened element-by-element into indexed dot-notation paths (e.g. items.0.sku, items.1.sku) using the same recursive flatten() call.` },
      { q: 'What happens when records have different nested shapes?', a: `flattenAll() computes the union of every flattened key across all input records for the column list, so a record missing an optional nested field simply renders a dash in that column rather than shifting or breaking the table's column alignment. This makes it robust against real-world JSON where optional fields aren't present on every record.` },
      { q: 'Can I reuse the flattening logic outside this table?', a: `Yes — flatten() and flattenAll() are pure functions that take and return plain JavaScript data (an object, or a { columns, rows } shape) with no DOM access. You can feed that output into the CSV-escaping logic from a CSV export table, into a sortable/filterable table's row data, or into any other consumer that wants flat records.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Call flattenAll(yourNestedArray) once (in a useMemo/computed) to get { columns, rows }, then render a <thead> from columns and a <tbody> row per entry in rows exactly as in this snippet — the recursive flattening function itself needs no changes since it's framework-agnostic plain JavaScript.` },
    ],
    aiPrompt: {
      paragraph: `Rather than hand-flattening a nested API response, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how flatten() decides between recursing into a nested object versus joining a primitive array into one cell versus recursively flattening an array of objects with indexed paths, and why flattenAll() computes the union of keys across all rows instead of just using the first row's keys. The same assistant can help extend it — ask it to add a configurable maximum flattening depth (stopping and showing raw JSON past that depth), let the user click a column header to jump back to that value's location in the raw JSON pane, or feed the flattened { columns, rows } output straight into a CSV download. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a tool that recursively flattens an array of nested JSON objects into a flat table with dot-notation column headers, in plain HTML, CSS, and JavaScript — no library.

Requirements:
- Implement a genuinely recursive flatten(obj, prefix, out) function: for each key in the object, if its value is a plain nested object, recurse into it with the key appended to a dot-joined prefix (e.g. "user" then "user.address" then "user.address.city"); this must work for arbitrary nesting depth, not just two or three hardcoded levels — test it against at least three levels of nesting.
- Handle arrays with two distinct rules inside the same function: if every element of an array is a primitive value, join them into one readable string for a single flattened cell (do not explode primitive arrays into separate indexed columns); if the array contains objects, flatten each element recursively under an indexed dot-notation path (e.g. "items.0.sku", "items.1.sku") using the same recursive flatten call.
- Implement a flattenAll(records) function that flattens every record in an input array and computes the full ordered union of column keys across ALL flattened rows (not just the first row's keys), so records with different optional nested fields still produce one consistent table where a row missing a given field shows an empty/dash placeholder in that column rather than misaligning columns.
- Render the original nested JSON with JSON.stringify(data, null, 2) in a preformatted block, and render the flattened result as a real HTML table with one column per entry in the computed column union and dot-notation column headers.
- Add a way to toggle between viewing the raw JSON only, the flattened table only, and both side by side, so a user can trace a specific nested value (e.g. a deeply nested city field) to its corresponding flat column and back.
- Keep the flatten/flattenAll functions pure (no DOM manipulation inside them) so they return plain data structures that could be reused elsewhere, such as feeding a CSV export.`,
    },
  },
};

export default tableNestedJsonMapper;
