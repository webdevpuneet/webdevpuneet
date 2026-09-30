const bootstrapInlineTableCellEditing = {
  id: 'bootstrap-inline-table-cell-editing',
  title: 'Bootstrap Inline Table Cell Editing',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscell-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Inventory</h6>
      <table class="table table-sm align-middle mb-0">
        <thead><tr><th>Item</th><th>Qty</th><th>Unit price</th></tr></thead>
        <tbody id="bscellBody"></tbody>
      </table>
      <p class="small text-muted mt-2 mb-0">Click Qty or Unit price to edit. Enter saves, Escape cancels.</p>
    </div>
  </div>
</div>`,
  css: `.bscell-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bscell-editable { cursor: pointer; border-radius: 5px; padding: 2px 6px; }
.bscell-editable:hover { background: #f0f1f5; }
.bscell-editing input { width: 80px; }`,
  js: `let rows = [
  { id: 1, name: 'USB-C Cable', qty: 42, price: 9.99 },
  { id: 2, name: 'Wireless Mouse', qty: 18, price: 24.5 },
  { id: 3, name: 'Laptop Stand', qty: 7, price: 39 },
];

const body = document.getElementById('bscellBody');

function render() {
  body.innerHTML = rows.map(r =>
    '<tr data-id="' + r.id + '">' +
      '<td>' + r.name + '</td>' +
      '<td><span class="bscell-editable" data-field="qty">' + r.qty + '</span></td>' +
      '<td><span class="bscell-editable" data-field="price">$' + r.price.toFixed(2) + '</span></td>' +
    '</tr>'
  ).join('');
}

function startEdit(cell) {
  const td = cell.closest('td');
  const tr = cell.closest('tr');
  const rowId = Number(tr.dataset.id);
  const field = cell.dataset.field;
  const row = rows.find(r => r.id === rowId);
  const rawValue = field === 'price' ? row.price : row.qty;

  td.classList.add('bscell-editing');
  td.innerHTML = '<input type="number" class="form-control form-control-sm" value="' + rawValue + '" ' +
    (field === 'price' ? 'step="0.01"' : 'step="1"') + '>';
  const input = td.querySelector('input');
  input.focus();
  input.select();

  // Removing the input from the DOM (which render() does) itself fires a
  // native blur event on it — without this guard, pressing Escape would
  // call commit(false), re-render, and then that synthetic blur would
  // immediately fire commit(true) again with the same stale input value,
  // silently overwriting the discard with an unwanted save.
  let committed = false;
  function commit(save) {
    if (committed) return;
    committed = true;
    if (save) {
      const parsed = Number(input.value);
      if (!Number.isNaN(parsed) && parsed >= 0) {
        row[field] = field === 'price' ? Math.round(parsed * 100) / 100 : Math.round(parsed);
      }
    }
    render();
  }

  input.addEventListener('blur', () => commit(true));
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); commit(true); }
    if (e.key === 'Escape') { e.preventDefault(); commit(false); }
  });
}

body.addEventListener('click', e => {
  const cell = e.target.closest('.bscell-editable');
  if (cell && !cell.closest('.bscell-editing')) startEdit(cell);
});

render();`,

  seo: {
    title: 'Bootstrap Inline Table Cell Editing — Free HTML CSS JS Snippet',
    description: 'A real spreadsheet-style Bootstrap 5.3 table — click a Qty or price cell to edit it in place, Enter or blur saves a validated numeric value, and Escape reverts without touching the underlying data.',
    about: {
      title: 'Bootstrap Inline Table Cell Editing — HTML, CSS & JavaScript',
      description: `Editing happens entirely inside the clicked \`<td>\` — \`startEdit()\` reads the row's current raw numeric value directly from the \`rows\` data array (not by parsing the displayed, already-formatted "$39.00" text back out of the DOM), swaps the cell's content for a real number input pre-filled with that value, and focuses and selects it so typing immediately replaces the old value.\n\n\`commit(save)\` is the single function both the blur listener and the keydown handler funnel through — blurring the input (clicking away) and pressing Enter both save, while Escape calls \`commit(false)\`, which re-renders without touching \`rows\` at all, discarding whatever was typed. Centralizing both outcomes in one function is what guarantees "save" always means the same thing regardless of which path triggered it.\n\nA save is only actually applied when the parsed value passes \`!Number.isNaN(parsed) && parsed >= 0\` — typing garbage or a negative number into the cell and pressing Enter silently keeps the row's previous value rather than corrupting it with \`NaN\` or a nonsensical negative quantity, and price values are additionally rounded to two decimal places to avoid accumulating floating-point artifacts like \`24.500000000000004\`.\n\nA \`committed\` flag guards \`commit()\` against running twice for a subtle reason: \`render()\` removes the \`<input>\` from the DOM, and removing a focused element from the DOM itself fires a native \`blur\` event on it. Without the guard, pressing Escape would discard the edit, re-render, and then that synthetic blur would immediately fire \`commit(true)\` a second time with the same stale input value — silently overwriting the discard with an unwanted save a moment later.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A three-row inventory table shows, with Qty and Unit price cells styled as clickable.' },
        { title: 'Click a Qty cell', text: 'It becomes a real number input, pre-filled and already selected, ready to type over.' },
        { title: 'Type a new number and press Enter', text: 'The cell saves and reverts to plain text showing the new value.' },
        { title: 'Click a price cell, type a new value, and click elsewhere on the page', text: 'Blurring the input also saves, exactly like pressing Enter does.' },
        { title: 'Click a cell, type something, then press Escape', text: 'The edit is discarded and the cell reverts to its previous, unchanged value.' },
        { title: 'Try entering a negative number or clearing the field entirely', text: 'The cell keeps its last valid value rather than accepting invalid input.' },
      ],
    },
    features: [
      'Editing reads the real underlying numeric value from the data array, never a formatted display string',
      'Enter, blur, and Escape all funnel through one commit() function with a single save/discard branch',
      'Invalid input (NaN or negative) is silently rejected, keeping the previous valid value instead',
      'Price values are rounded to two decimals on save, avoiding floating-point display artifacts',
      'The input is focused and pre-selected the instant editing starts, ready for immediate typing',
    ],
    useCases: [
      { icon: 'DASH', title: 'Inventory, pricing, and spreadsheet-style admin tables', desc: 'Pairs with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/) for a fuller editable data grid.' },
      { icon: 'APP', title: 'Bulk-selecting rows before a batch edit or export', desc: 'Combine with [bootstrap-bulk-action-toolbar](/ui-snippets/bootstrap-bulk-action-toolbar/) so a user can select several rows and act on them alongside editing individual cells.' },
      { icon: 'APP', title: 'Order and quote line-item editors', desc: 'Adjust a quantity or price directly in a table row without opening a separate edit form.' },
      { icon: 'DEV', title: 'Internal admin tools managing structured records', desc: 'A fast way to correct individual field values without a full record-edit modal for a single-number change.' },
    ],
    faqs: [
      { q: 'Where does the editor get its starting value from?', a: 'Directly from the underlying rows data array (row.qty or row.price), never by parsing the displayed, already-formatted cell text — this avoids re-parsing a "$39.00" string back into a number, which is both unnecessary and error-prone.' },
      { q: 'What happens if I type a negative number or leave the field empty?', a: 'The parsed value fails the !Number.isNaN(parsed) && parsed >= 0 check inside commit(), so the save is silently skipped and the cell reverts to its last valid value rather than accepting invalid data.' },
      { q: 'Does clicking away from the input save or discard the edit?', a: 'It saves — the blur event calls commit(true), the same as pressing Enter; only pressing Escape explicitly discards the edit via commit(false).' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track which cell (row id + field) is currently being edited in component state, conditionally render an input or plain text per cell based on that state, and validate/commit the parsed value the same way on blur, Enter, or Escape.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add inline validation styling (a red outline) that appears live while an invalid value is typed, before the user even tries to save, or to add support for editing a text field (like the item name) alongside the existing numeric fields, using a text input instead of a number input.`,
      prompt: `Build a Bootstrap 5.3 table with inline, click-to-edit cells, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with at least 3 rows and at least two numeric editable columns (e.g. quantity and price), backed by a plain JavaScript array of row objects holding the real numeric values.
- Clicking an editable cell replaces its content with a real number input pre-filled with that field's actual underlying value (not a value parsed back out of the formatted display text), focused and with its text selected.
- Pressing Enter or blurring the input (clicking elsewhere) must save the edit; pressing Escape must discard it — all three paths should funnel through one shared commit function with a single save/discard branch, not duplicated logic per trigger.
- A save must be rejected (keeping the cell's previous value) if the entered value is not a valid non-negative number. Price values should be rounded to two decimal places on save to avoid floating-point display artifacts.`,
    },
  },
};

export default bootstrapInlineTableCellEditing;
