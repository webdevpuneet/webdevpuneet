const invoiceLineItemsTable = {
  id: 'invoice-line-items-table',
  title: 'Invoice Line Items Table',
  lastmod: '2026-08-22',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="ilt-card">
  <div class="ilt-head">
    <h3>Invoice #INV-1042</h3>
    <p>Edit line items — totals recalculate live</p>
  </div>

  <div class="ilt-table-wrap">
    <table class="ilt-table">
      <thead>
        <tr>
          <th class="ilt-col-desc">Description</th>
          <th class="ilt-col-num">Qty</th>
          <th class="ilt-col-num">Unit price</th>
          <th class="ilt-col-num">Line total</th>
          <th class="ilt-col-del"></th>
        </tr>
      </thead>
      <tbody id="iltBody"></tbody>
    </table>
  </div>

  <button type="button" class="ilt-add" id="iltAdd">+ Add line item</button>

  <div class="ilt-totals">
    <div class="ilt-totals-row">
      <span>Subtotal</span>
      <b id="iltSubtotal">$0.00</b>
    </div>
    <div class="ilt-totals-row ilt-tax-row">
      <span>Tax
        <input type="number" id="iltTaxRate" value="8" min="0" max="100" step="0.1" />%
      </span>
      <b id="iltTax">$0.00</b>
    </div>
    <div class="ilt-totals-row ilt-total-row">
      <span>Total due</span>
      <b id="iltTotal">$0.00</b>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f16;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ilt-card{background:#12151f;border:1px solid #232838;border-radius:16px;padding:24px;width:100%;max-width:640px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.ilt-head{margin-bottom:18px}
.ilt-head h3{font-size:17px;font-weight:800;color:#f5f7fb}
.ilt-head p{font-size:12px;color:#7c8398;margin-top:3px}

.ilt-table-wrap{overflow-x:auto;border-radius:10px;border:1px solid #1f2432}
.ilt-table{width:100%;border-collapse:collapse;min-width:520px}
.ilt-table thead th{text-align:left;font-size:10.5px;text-transform:uppercase;letter-spacing:.05em;color:#697089;font-weight:700;padding:10px 12px;background:#171b27;border-bottom:1px solid #232838}
.ilt-col-num{text-align:right !important}
.ilt-col-del{width:36px}
.ilt-table tbody td{padding:8px 10px;border-bottom:1px solid #1b202e;vertical-align:middle}
.ilt-table tbody tr:last-child td{border-bottom:none}

.ilt-table input[type="text"]{width:100%;background:transparent;border:1px solid transparent;border-radius:6px;padding:6px 8px;color:#e6e9f2;font-size:13px;font-family:inherit}
.ilt-table input[type="text"]:hover,.ilt-table input[type="text"]:focus{border-color:#2b3346;background:#171b27}
.ilt-table input[type="text"]:focus{outline:none}

.ilt-table input[type="number"]{width:82px;background:transparent;border:1px solid transparent;border-radius:6px;padding:6px 8px;color:#e6e9f2;font-size:13px;text-align:right;font-family:inherit;font-variant-numeric:tabular-nums}
.ilt-table input[type="number"]:hover,.ilt-table input[type="number"]:focus{border-color:#2b3346;background:#171b27}
.ilt-table input[type="number"]:focus{outline:none}

.ilt-line-total{display:block;text-align:right;font-weight:700;color:#e6e9f2;font-variant-numeric:tabular-nums;padding-right:2px}

.ilt-del-btn{background:none;border:none;color:#4b5266;cursor:pointer;font-size:16px;line-height:1;padding:4px 6px;border-radius:6px;transition:color .15s,background .15s}
.ilt-del-btn:hover{color:#f87171;background:rgba(248,113,113,.1)}

.ilt-add{margin-top:12px;background:#171b27;border:1px dashed #2b3346;border-radius:9px;padding:9px 14px;color:#9aa2ba;font-size:12.5px;font-weight:700;cursor:pointer;width:100%;transition:background .15s,border-color .15s,color .15s}
.ilt-add:hover{background:#1c2130;border-color:#3a4260;color:#c7cee0}

.ilt-totals{margin-top:20px;padding-top:16px;border-top:1px solid #232838;display:flex;flex-direction:column;gap:9px}
.ilt-totals-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#9aa2ba}
.ilt-totals-row b{color:#e6e9f2;font-weight:700;font-variant-numeric:tabular-nums}
.ilt-tax-row span{display:flex;align-items:center;gap:6px}
.ilt-tax-row input{width:52px;background:#171b27;border:1px solid #2b3346;border-radius:6px;padding:5px 7px;color:#e6e9f2;font-size:12.5px;text-align:right;font-family:inherit}
.ilt-tax-row input:focus{outline:none;border-color:#5865f2}
.ilt-total-row{padding-top:9px;border-top:1px dashed #232838;font-size:15px;font-weight:700;color:#e6e9f2}
.ilt-total-row b{color:#818cf8;font-size:17px}`,

  js: `var seq = 0;
var items = [
  { id: seq++, desc: 'Website redesign — design phase', qty: 1, price: 2400 },
  { id: seq++, desc: 'Hosting (monthly)', qty: 3, price: 45 },
  { id: seq++, desc: 'Content migration hours', qty: 6, price: 85 },
];

var bodyEl = document.getElementById('iltBody');
var addBtn = document.getElementById('iltAdd');
var taxInput = document.getElementById('iltTaxRate');
var subtotalEl = document.getElementById('iltSubtotal');
var taxEl = document.getElementById('iltTax');
var totalEl = document.getElementById('iltTotal');

function fmtMoney(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function render() {
  bodyEl.innerHTML = items.map(function (item) {
    var lineTotal = item.qty * item.price;
    return '<tr data-id="' + item.id + '">' +
      '<td><input type="text" class="ilt-desc" value="' + item.desc.replace(/"/g, '&quot;') + '" /></td>' +
      '<td><input type="number" class="ilt-qty" value="' + item.qty + '" min="0" step="1" /></td>' +
      '<td><input type="number" class="ilt-price" value="' + item.price.toFixed(2) + '" min="0" step="0.01" /></td>' +
      '<td><span class="ilt-line-total">' + fmtMoney(lineTotal) + '</span></td>' +
      '<td><button type="button" class="ilt-del-btn" aria-label="Remove line item">&times;</button></td>' +
    '</tr>';
  }).join('');
  renderTotals();
}

function renderTotals() {
  var subtotal = items.reduce(function (sum, item) { return sum + item.qty * item.price; }, 0);
  var taxRate = Math.max(0, Number(taxInput.value) || 0);
  var tax = subtotal * (taxRate / 100);
  var total = subtotal + tax;

  subtotalEl.textContent = fmtMoney(subtotal);
  taxEl.textContent = fmtMoney(tax);
  totalEl.textContent = fmtMoney(total);
}

bodyEl.addEventListener('input', function (e) {
  var row = e.target.closest('tr');
  if (!row) return;
  var id = Number(row.dataset.id);
  var item = items.find(function (i) { return i.id === id; });
  if (!item) return;

  if (e.target.classList.contains('ilt-desc')) {
    item.desc = e.target.value;
  } else if (e.target.classList.contains('ilt-qty')) {
    item.qty = Math.max(0, Number(e.target.value) || 0);
    row.querySelector('.ilt-line-total').textContent = fmtMoney(item.qty * item.price);
  } else if (e.target.classList.contains('ilt-price')) {
    item.price = Math.max(0, Number(e.target.value) || 0);
    row.querySelector('.ilt-line-total').textContent = fmtMoney(item.qty * item.price);
  }
  renderTotals();
});

bodyEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.ilt-del-btn');
  if (!btn) return;
  var row = btn.closest('tr');
  var id = Number(row.dataset.id);
  items = items.filter(function (i) { return i.id !== id; });
  render();
});

addBtn.addEventListener('click', function () {
  items.push({ id: seq++, desc: 'New item', qty: 1, price: 0 });
  render();
});

taxInput.addEventListener('input', renderTotals);

render();`,

  seo: {
    title: 'Invoice Line Items Table — Free Editable Billing Table (HTML/CSS/JS)',
    description: `An editable invoice table with add/remove line items, live per-row totals, and a tax-rate field that recalculates the subtotal, tax, and total instantly. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Invoice Line Items Table — Live-Recalculating Editable Billing Table',
      description: `Billing and invoicing screens all share the same core interaction: a table of line items where quantity times unit price gives a line total, and every edit needs to ripple through to the subtotal, the tax, and the grand total instantly. This snippet builds that editable invoice table in plain HTML, CSS, and vanilla JavaScript — no framework, no library, just an items array and a render function.

**Data-driven rows, not DOM patching**

Every line item lives in an \`items\` array of \`{ id, desc, qty, price }\` objects. Adding a row pushes to the array and calls \`render()\`; deleting filters it out and re-renders. Each row gets a stable \`id\` (from an incrementing sequence, not its array index) stamped as a \`data-id\` attribute, so edits and deletes always target the correct underlying item even after other rows have been added or removed.

**Two recalculation paths, same result**

Typing in an existing row's quantity or price field updates that one item's line total directly (a cheap, targeted DOM write) and then calls \`renderTotals()\` — it doesn't re-render the whole table on every keystroke, which would steal focus from the input you're typing in. Adding or removing a row, where the whole list shape changes, calls the full \`render()\` instead. Both paths end at the same \`renderTotals()\` function, so the totals are always consistent no matter which path triggered them.

**Live tax math**

The tax rate is itself an editable input, not a fixed percentage. \`renderTotals()\` sums every line item's \`qty * price\` into a subtotal, reads the current tax rate, computes tax as \`subtotal * (rate / 100)\`, and total as subtotal plus tax — all three recompute on every relevant input event, so changing the tax rate from 8% to 10% updates the total immediately without a save step.

**Guardable inputs**

Quantity and price both clamp to a minimum of zero and fall back to zero on invalid input (\`Number(value) || 0\`), so a cleared or malformed field can't produce \`NaN\` propagating through the totals. This is the same defensive pattern worth using in any editable numeric table.

**Where it fits**

Pair it with a [proration preview card](/ui-snippets/proration-preview-card/) for subscription upgrades, an [invoice preview](/ui-snippets/invoice-preview/) for the final read-only bill, or a [checkout form](/ui-snippets/checkout-form/) for the payment step. It's also a clean reference alongside a general-purpose [editable table](/ui-snippets/editable-table/) for any grid that needs computed columns rather than plain data entry.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A three-line invoice renders with totals already calculated.` },
      { title: 'Edit a quantity or price', text: `That row's line total and every total below update instantly.` },
      { title: 'Add a line item', text: `Click "+ Add line item" for a new zero-value row ready to edit.` },
      { title: 'Delete a row', text: `Click the × button; totals recalculate from the remaining rows.` },
      { title: 'Change the tax rate', text: `Edit the % field in the totals section to see tax and total react live.` },
      { title: 'Wire up real data', text: `Populate the items array from your invoicing API and submit it on save.` },
    ] },
    features: [
      { title: 'Live line totals', text: `Qty × unit price recomputes and re-renders as you type, per row.` },
      { title: 'Editable tax rate', text: `Tax is a percentage input, not a fixed value — total reacts instantly.` },
      { title: 'Add / remove rows', text: `Add a blank line item or delete any row; totals always stay correct.` },
      { title: 'Stable row identity', text: `Rows are tracked by a stable id, not array index, so edits never target the wrong row.` },
      { title: 'Targeted vs full re-render', text: `Keystrokes patch one cell; structural changes re-render the table.` },
      { title: 'NaN-safe inputs', text: `Quantity and price clamp to zero on invalid or cleared input.` },
      { title: 'Formatted currency', text: `All money values render with thousands separators and two decimals.` },
      { title: 'Framework-agnostic core', text: `Plain array + render function ports cleanly to React, Vue, or Angular state.` },
    ],
    useCases: [
      { title: 'Invoicing tools', text: `Let a freelancer or SMB build an invoice before sending it — pair with an [invoice preview](/ui-snippets/invoice-preview/).` },
      { title: 'Subscription upgrade flows', text: `Show itemized proration next to a [proration preview card](/ui-snippets/proration-preview-card/).` },
      { title: 'Quote and estimate builders', text: `Let sales reps assemble a line-itemized quote with live totals.` },
      { title: 'Checkout review screens', text: `Show an editable cart summary before handing off to a [checkout form](/ui-snippets/checkout-form/).` },
      { title: 'Expense reports', text: `Adapt the same pattern for itemized expense entry with a running total.` },
      { title: 'Admin billing tools', text: `Give support staff a way to adjust a customer's invoice before it's finalized.` },
      { icon: 'CODE', title: 'Related: Sticky Table Header', desc: 'See the [Sticky Table Header](/ui-snippets/sticky-table-header/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the line total stay in sync as I type?', a: `Each row's quantity and price live in an items array, and an input listener on the table body updates the matching item (matched by a stable id, not row position) and writes that row's new qty * price directly to its line-total cell, then calls renderTotals() to update the subtotal, tax, and total below.` },
      { q: 'Why use an id instead of the row index in the array?', a: `If rows are added or deleted, array indices shift, but a stable id (assigned once from an incrementing counter) always points to the correct item even after other rows change. Matching edits by id instead of index avoids a class of bugs where an edit silently applies to the wrong row.` },
      { q: 'How is tax calculated?', a: `Tax rate is a plain percentage input. renderTotals() sums every line item's qty times price into a subtotal, then computes tax as subtotal * (rate / 100), and total as subtotal + tax. All three values recompute on every input event, whether it's a line-item edit or a tax-rate change.` },
      { q: 'What stops invalid input from breaking the totals?', a: `Quantity and price inputs run through Number(value) || 0 and are clamped to a minimum of zero, so an empty field, a stray letter, or a negative number can never produce NaN or a negative total propagating through the math.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the items array into component state (useState in React, a reactive ref in Vue) and derive subtotal, tax, and total with useMemo or a computed property. Bind each input's onChange/@input to update the matching item by id, and let the framework's reactivity replace the manual innerHTML re-render.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the recalculation logic here on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the table uses a stable id per row instead of array index to match input events back to the correct item, and why editing an existing cell patches just that row's line-total text instead of calling the full render() (hint: focus). The same assistant can help you harden it — ask whether the Number(value) || 0 fallback correctly handles every edge case, including a user pasting a formatted number like "1,200", or whether the delete button needs a confirmation step for rows with a large line total. It's also useful for extending the pattern: ask it to add a discount-percentage column, support multiple tax rates per line item, or persist edits to a backend on blur instead of only in memory. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an editable invoice line-items table in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Store line items in a plain array of objects, each with a stable id (from an incrementing counter, not the array index), a description, a quantity, and a unit price.
- Render one table row per item with editable description (text), quantity (number), and unit price (number) inputs, plus a read-only computed line-total cell (quantity × unit price) and a delete button.
- When a quantity or price input changes, update only that row's line-total cell directly (don't re-render the whole table, which would lose input focus) and then recompute the totals section.
- When a row is added or deleted, the item list changes shape, so re-render the full table body from the array, then recompute totals.
- Match every input and delete event back to its item by the row's stable id (read from a data attribute), never by array position, so edits are correct even after other rows have been added or removed.
- Add a totals section below the table with a subtotal (sum of every line total), an editable tax-rate percentage input, a computed tax amount (subtotal × rate/100), and a total due (subtotal + tax) — all of it must recompute live whenever any line item or the tax rate changes.
- Clamp quantity and price to a minimum of zero and fall back to zero for invalid or empty input so the totals can never show NaN.
- Format every money value with thousands separators and exactly two decimal places.`,
    },
  },
};

export default invoiceLineItemsTable;
