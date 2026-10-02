const tabulatorEditableCellsValidation = {
  id: 'tabulator-editable-cells-validation',
  title: 'Tabulator Editable Cells with Validation and Undo',
  lastmod: '2026-09-24',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/tabulator-tables@6.2.5/dist/css/tabulator.min.css',
    'https://cdn.jsdelivr.net/npm/tabulator-tables@6.2.5/dist/js/tabulator.min.js',
  ],
  html: `<div class="te-card">
  <div class="te-bar">
    <button type="button" class="te-btn" id="teAdd">+ Add product</button>
    <button type="button" class="te-btn" id="teUndo" title="Undo (Ctrl+Z)">&#8630; Undo</button>
    <button type="button" class="te-btn" id="teRedo" title="Redo (Ctrl+Y)">&#8631; Redo</button>
    <span class="te-hint">Double-click a cell to edit</span>
    <button type="button" class="te-save" id="teSave">Save changes</button>
  </div>
  <div id="teTable"></div>
  <div class="te-msg" id="teMsg" role="status" aria-live="polite">No changes yet.</div>
</div>`,
  css: `body { background: #f2f4f9; padding: 18px; font-family: system-ui, sans-serif; }
.te-card { max-width: 820px; margin: 0 auto; background: #fff; border: 1px solid #dde1ec; border-radius: 14px; padding: 14px; box-shadow: 0 8px 24px rgba(20,30,70,.06); }
.te-bar { display: flex; gap: 8px; align-items: center; margin-bottom: 12px; flex-wrap: wrap; }
.te-btn { font: 700 12.5px/1 system-ui, sans-serif; color: #334155; background: #eef1f6; border: 0; border-radius: 9px; padding: 9px 12px; cursor: pointer; }
.te-btn:hover { background: #e0e5ee; }
.te-hint { margin-left: auto; font-size: 12px; color: #6b7290; }
.te-save { font: 700 13px/1 system-ui, sans-serif; color: #fff; background: #4f46e5; border: 0; border-radius: 9px; padding: 10px 14px; cursor: pointer; }
.te-save:hover { background: #4338ca; }
.te-msg { margin-top: 10px; padding: 10px 12px; border-radius: 9px; background: #f3f4fb; color: #48506a; font: 600 12.5px/1.5 system-ui, sans-serif; }
.te-msg.err { background: #fef2f2; color: #991b1b; }
.te-msg.ok { background: #f0fdf4; color: #166534; }
.tabulator { border: 1px solid #e0e4ee; border-radius: 10px; font-size: 13.5px; }
.tabulator .tabulator-header { background: #f6f7fc; border-bottom: 1px solid #e0e4ee; }
.tabulator .tabulator-header .tabulator-col { background: #f6f7fc; border-right: 1px solid #e8ebf3; }
.tabulator-row { border-bottom: 1px solid #eef0f6; }
.tabulator-row:hover { background: #f5f6ff; }
.tabulator-cell.edited { background: #fffbeb !important; box-shadow: inset 3px 0 0 #f59e0b; }
.tabulator-cell.tabulator-validation-fail { background: #fef2f2 !important; box-shadow: inset 0 0 0 2px #ef4444; }
.tabulator-row .tabulator-cell.tabulator-editing { background: #fff !important; box-shadow: inset 0 0 0 2px #4f46e5; }
.del { color: #dc2626; cursor: pointer; font-weight: 800; }
.del:hover { color: #7f1d1d; }`,
  js: `const data = [
  { id: 1, name: 'Espresso Beans 1kg', sku: 'COF-001', qty: 42, price: 18.5, status: 'in-stock' },
  { id: 2, name: 'Ceramic Pour-over Set', sku: 'COF-014', qty: 7, price: 46, status: 'low' },
  { id: 3, name: 'Burr Grinder', sku: 'COF-022', qty: 0, price: 129, status: 'out' },
  { id: 4, name: 'Milk Frother', sku: 'COF-031', qty: 19, price: 34.9, status: 'in-stock' },
  { id: 5, name: 'Paper Filters x200', sku: 'COF-040', qty: 88, price: 6.25, status: 'in-stock' },
];

const msg = document.getElementById('teMsg');
function say(text, kind) { msg.textContent = text; msg.className = 'te-msg' + (kind ? ' ' + kind : ''); }
let nextId = 6;
const edited = new Set();

const table = new Tabulator('#teTable', {
  data: data,
  layout: 'fitColumns',
  history: true,                    // records edits so undo() and redo() work
  validationMode: 'highlight',      // let the user type an invalid value, but flag it (the default blocks the edit)
  editTriggerEvent: 'dblclick',
  columns: [
    { title: 'Product', field: 'name', minWidth: 180, editor: 'input', validator: ['required', 'minLength:3'] },
    { title: 'SKU', field: 'sku', width: 110, editor: 'input', validator: ['required', 'regex:^[A-Z]{3}-[0-9]{3}$'] },
    { title: 'Qty', field: 'qty', width: 90, hozAlign: 'right', editor: 'number', editorParams: { min: 0, max: 9999, step: 1 }, validator: ['required', 'integer', 'min:0', 'max:9999'] },
    { title: 'Price', field: 'price', width: 110, hozAlign: 'right', editor: 'number', editorParams: { min: 0, step: 0.05 }, formatter: 'money', formatterParams: { symbol: '$', precision: 2 }, validator: ['required', 'numeric', 'min:0.01'] },
    { title: 'Status', field: 'status', width: 120, editor: 'list', editorParams: { values: { 'in-stock': 'In stock', low: 'Low', out: 'Out' } } },
    { title: '', width: 44, hozAlign: 'center', headerSort: false, formatter: function () { return '<span class="del" title="Delete row">&times;</span>'; },
      cellClick: function (e, cell) { cell.getRow().delete(); say('Row deleted. Undo brings it back.', ''); } },
  ],
});

table.on('cellEdited', function (cell) {
  cell.getElement().classList.add('edited');
  edited.add(cell.getRow().getData().id);
  say(edited.size + ' row' + (edited.size > 1 ? 's' : '') + ' changed - not saved yet.', '');
});
table.on('validationFailed', function (cell, value, validators) {
  const rule = validators[0] && validators[0].type;
  const label = { required: 'is required', minLength: 'is too short', regex: 'must look like ABC-123', integer: 'must be a whole number', min: 'is too small', max: 'is too large', numeric: 'must be a number' }[rule] || 'is invalid';
  say(cell.getField().toUpperCase() + ' ' + label + '. Fix the red cell to save.', 'err');
});

document.getElementById('teAdd').addEventListener('click', function () {
  table.addRow({ id: nextId++, name: '', sku: '', qty: 0, price: 0, status: 'in-stock' }, true).then(function (row) {
    row.getCell('name').edit();
  });
});
document.getElementById('teUndo').addEventListener('click', function () { table.undo(); });
document.getElementById('teRedo').addEventListener('click', function () { table.redo(); });

document.getElementById('teSave').addEventListener('click', function () {
  const problems = table.validate();               // true when every cell passes, otherwise an array of failing cells
  if (problems !== true) { say(problems.length + ' cell' + (problems.length > 1 ? 's are' : ' is') + ' invalid - fix ' + (problems.length > 1 ? 'them' : 'it') + ' before saving.', 'err'); return; }
  const payload = table.getData();
  table.getRows().forEach(function (r) { r.getCells().forEach(function (c) { c.getElement().classList.remove('edited'); }); });
  edited.clear();
  say('Saved ' + payload.length + ' products. (In a real app this would be a fetch() with the payload.)', 'ok');
});`,

  seo: {
    title: 'Tabulator Editable Grid with Validation — Free JS Snippet',
    description: `An inline-editable data grid built with Tabulator: typed editors, rule-based cell validation, highlighted invalid cells, dirty-cell tracking, add and delete rows, undo/redo and a validate-before-save flow.`,
    about: {
      title: 'Tabulator Editable Cells with Validation — HTML, CSS & JavaScript',
      description: `Turning a table into a spreadsheet-style editor raises problems a read-only grid never has. What happens when someone types letters into a quantity column? How do they know which cells they changed? What if they delete the wrong row? Tabulator has answers to all of these as configuration, and this snippet wires them together into a complete edit-then-save workflow for a small product catalogue.

Editing starts with the editor property on each column. An input editor gives a text box, number gives a numeric field with min, max and step through editorParams, and list gives a dropdown whose values object maps stored values to labels — so the cell stores "in-stock" but shows "In stock". editTriggerEvent: 'dblclick' requires a double-click to start editing, which prevents accidental edits when people are just clicking around a table.

Validation is declared beside the editor as a validator array of rules: required, minLength:3, integer, min:0, max:9999, numeric, and even a regular expression for SKU format. The important choice is validationMode. The default is 'blocking', which keeps the cell stuck in edit mode until the value is valid — safe, but it traps users who want to move on. This snippet uses 'highlight', which lets the value in but marks the cell red with a tabulator-validation-fail class, and then makes validity a gate at save time: table.validate() returns true when everything passes, or an array of the failing cells. The validationFailed event supplies the failing rule, which the snippet translates into a plain-English message such as "SKU must look like ABC-123".

Change tracking is a small addition with a big effect. The cellEdited event adds a class that shades edited cells amber and records the row in a Set, so the message bar can say "2 rows changed — not saved yet", and saving clears the marks. Setting history: true makes Tabulator record every change so table.undo() and table.redo() work for edits, additions and deletions alike — which is the safety net that makes a one-click delete button acceptable. New rows are added with addRow(data, true) and the promise it returns is used to open the name cell for editing immediately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Edit a cell', text: 'Double-click a product name, quantity or price and type a new value. The cell shades amber to show it changed.' },
        { title: 'Trigger a validation error', text: 'Set a quantity to a negative number or an SKU to "abc". The cell turns red and the message bar says why.' },
        { title: 'Try to save with an error', text: 'Press Save changes while a cell is invalid. Saving is refused and the count of invalid cells is shown.' },
        { title: 'Add and delete rows', text: 'Use Add product to insert a row, and the × button to delete one.' },
        { title: 'Undo mistakes', text: 'Press Undo to reverse the last edit, addition or deletion, and Redo to reapply it.' },
      ],
    },
    features: [
      'Typed editors: input, number with min/max/step and a labelled dropdown',
      'Declarative validation rules including a regex for SKU format',
      'validationMode "highlight" flags invalid cells without trapping the user',
      'table.validate() as a gate before saving',
      'Friendly messages built from the validationFailed rule type',
      'Edited cells shaded and counted through the cellEdited event',
      'Add and delete rows with full undo and redo history',
      'Double-click to edit so casual clicks never change data',
    ],
    useCases: [
      { icon: '📦', title: 'Inventory and catalogue editors', desc: 'Let staff fix prices and stock levels in place, with typed editors and a labelled dropdown for fixed choices.' },
      { icon: '🧾', title: 'Budgeting and invoice lines', desc: 'Edit amounts and quantities with rule-based validation, including a regular expression for a correctly formatted SKU.' },
      { icon: '🧹', title: 'Bulk data cleanup', desc: 'Correct many records quickly in bulk cleanup tools, with dirty-cell tracking showing exactly which cells changed before anything is finally saved.' },
      { icon: '🎓', title: 'Validation mode comparison', desc: 'See how `validationMode: \'highlight\'` flags invalid cells without trapping the user, unlike blocking validation, and compare with the [Tabulator sortable filterable grid](/ui-snippets/tabulator-sortable-filterable-grid/).' },
      { icon: '↩️', title: 'Safe editing workflows', desc: 'Add and delete rows with undo and redo available, and gate saving behind `table.validate()` so invalid data never leaves the grid.' },
    ],
    faqs: [
      { q: 'What is the difference between validationMode blocking and highlight?', a: 'Blocking keeps the cell in edit mode until the value is valid. Highlight accepts the value but marks the cell invalid, so you can gate the save instead.' },
      { q: 'How do I check that all cells are valid before saving?', a: 'Call table.validate(). It returns true when everything passes, or an array of the invalid cells.' },
      { q: 'How do I enable undo and redo?', a: 'Set history: true in the options, then call table.undo() and table.redo().' },
      { q: 'How do I store a value but display a label in a dropdown?', a: 'Give the list editor a values object such as { "in-stock": "In stock" }; the key is stored and the label is displayed.' },
      { q: 'How can I detect which cells were changed?', a: 'Listen for the cellEdited event and record the cell or row, or compare against your original data.' },
      { q: 'How do I validate with a regular expression?', a: 'Add a rule such as "regex:^[A-Z]{3}-[0-9]{3}$" to the validator array.' },
      { q: 'Can I use this editable grid in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Tabulator, so in a framework project install it with npm install tabulator-tables (or react-tabulator) instead of the CDN tag, create it in useEffect / onMounted / ngAfterViewInit and wait for the tableBuilt event, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to send the changed rows to an API with fetch, add a required-column marker in headers, or add row-level validation that compares two columns.`,
      prompt: `Build an editable product grid with Tabulator 6 loaded from a CDN (script and CSS).

Requirements:
- Use history: true, validationMode: 'highlight' and editTriggerEvent: 'dblclick'.
- Define editable columns: name (input, required, minLength:3), SKU (regex ^[A-Z]{3}-[0-9]{3}$), quantity (number, integer, 0 to 9999), price (number with the money formatter, min 0.01) and status (list editor with labelled values), plus a delete-row column.
- On cellEdited shade the cell and count changed rows; on validationFailed show a plain-English message based on the failing rule.
- Add Add product (addRow then edit the name cell), Undo and Redo buttons, and a Save button that calls table.validate() and refuses to save when invalid cells exist.
- Show a status bar for unsaved changes, errors and successful saves.`,
    },
  },
};

export default tabulatorEditableCellsValidation;
