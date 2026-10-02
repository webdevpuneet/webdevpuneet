const tableCellValidationErrors = {
  id: 'table-cell-validation-errors',
  title: 'Table Inline Cell Validation',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tcv-wrap">
  <div class="tcv-bar">
    <h3>Add order line</h3>
    <button type="button" class="tcv-save" id="tcvSave">Save row</button>
  </div>
  <table class="tcv-table">
    <thead><tr><th>Product</th><th>Email</th><th>Quantity</th><th>Discount %</th></tr></thead>
    <tbody>
      <tr id="tcvRow">
        <td class="tcv-cell" data-field="product">
          <input class="tcv-input" data-field="product" placeholder="Required">
          <span class="tcv-err" id="err-product"></span>
        </td>
        <td class="tcv-cell" data-field="email">
          <input class="tcv-input" data-field="email" placeholder="name@company.com">
          <span class="tcv-err" id="err-email"></span>
        </td>
        <td class="tcv-cell" data-field="qty">
          <input class="tcv-input" data-field="qty" placeholder="e.g. 12">
          <span class="tcv-err" id="err-qty"></span>
        </td>
        <td class="tcv-cell" data-field="discount">
          <input class="tcv-input" data-field="discount" placeholder="0–100">
          <span class="tcv-err" id="err-discount"></span>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="tcv-status" id="tcvStatus" hidden></div>
  <div class="tcv-log" id="tcvLog"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fff7ed;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.tcv-wrap{background:#fff;border-radius:14px;width:100%;max-width:680px;box-shadow:0 18px 44px rgba(154,52,18,.1);overflow:visible;border:1px solid #fed7aa}
.tcv-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #ffedd5}
.tcv-bar h3{font-size:15px;font-weight:800;color:#7c2d12}
.tcv-save{background:#ea580c;color:#fff;border:none;border-radius:9px;padding:8px 16px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.tcv-save:hover{background:#c2410c}

.tcv-table{width:100%;border-collapse:collapse;font-size:13px;table-layout:fixed}
.tcv-table th{text-align:left;padding:10px 14px;background:#fff7ed;border-bottom:1px solid #ffedd5;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#9a3412}
.tcv-cell{padding:10px 12px;vertical-align:top;position:relative}
.tcv-input{width:100%;border:1.5px solid #e2e8f0;border-radius:7px;padding:7px 9px;font-size:13px;font-family:inherit;color:#292524}
.tcv-input:focus{outline:none;border-color:#f97316;box-shadow:0 0 0 3px rgba(249,115,22,.14)}
.tcv-cell.tcv-invalid .tcv-input{border-color:#dc2626;background:#fef2f2}
.tcv-cell.tcv-invalid .tcv-input:focus{box-shadow:0 0 0 3px rgba(220,38,38,.14)}
.tcv-err{display:none;position:absolute;top:calc(100% + 2px);left:12px;right:12px;background:#dc2626;color:#fff;font-size:11px;font-weight:600;padding:5px 8px;border-radius:6px;z-index:5;line-height:1.3}
.tcv-err::before{content:'';position:absolute;top:-4px;left:12px;width:8px;height:8px;background:#dc2626;transform:rotate(45deg)}
.tcv-cell.tcv-invalid .tcv-err{display:block}

.tcv-status{margin:14px 18px 0;padding:9px 12px;border-radius:8px;font-size:12.5px;font-weight:700}
.tcv-status.tcv-ok{background:#dcfce7;color:#166534}
.tcv-status.tcv-bad{background:#fee2e2;color:#991b1b}
.tcv-status[hidden]{display:none}

.tcv-log{padding:12px 18px 18px}
.tcv-log-row{display:flex;gap:10px;font-size:12px;color:#57534e;padding:6px 0;border-top:1px solid #ffedd5}`,

  js: `// One real validator per column. Each returns a message string on failure, or '' when valid.
var VALIDATORS = {
  product: function (v) {
    return v.trim() ? '' : 'Product name is required.';
  },
  email: function (v) {
    if (!v.trim()) return 'Email is required.';
    var re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return re.test(v.trim()) ? '' : 'Enter a valid email address.';
  },
  qty: function (v) {
    if (!v.trim()) return 'Quantity is required.';
    var n = Number(v.trim());
    return (Number.isInteger(n) && n > 0) ? '' : 'Quantity must be a positive whole number.';
  },
  discount: function (v) {
    if (v.trim() === '') return ''; // optional
    var n = Number(v.trim());
    return (!isNaN(n) && n >= 0 && n <= 100) ? '' : 'Discount must be a number from 0 to 100.';
  }
};

var inputs = Array.prototype.slice.call(document.querySelectorAll('.tcv-input'));
var savedRows = [];

function validateField(field, value) {
  var msg = VALIDATORS[field](value);
  var cell = document.querySelector('.tcv-cell[data-field="' + field + '"]');
  var errEl = document.getElementById('err-' + field);
  if (msg) {
    cell.classList.add('tcv-invalid');
    errEl.textContent = msg;
  } else {
    cell.classList.remove('tcv-invalid');
    errEl.textContent = '';
  }
  return !msg;
}

function validateAll() {
  var ok = true;
  inputs.forEach(function (inp) {
    if (!validateField(inp.dataset.field, inp.value)) ok = false;
  });
  return ok;
}

inputs.forEach(function (inp) {
  inp.addEventListener('input', function () { validateField(inp.dataset.field, inp.value); });
  inp.addEventListener('blur', function () { validateField(inp.dataset.field, inp.value); });
});

var statusEl = document.getElementById('tcvStatus');
var logEl = document.getElementById('tcvLog');

document.getElementById('tcvSave').addEventListener('click', function () {
  var allValid = validateAll();
  statusEl.hidden = false;
  if (!allValid) {
    statusEl.className = 'tcv-status tcv-bad';
    statusEl.textContent = 'Fix the highlighted cells before saving this row.';
    return;
  }
  var row = {};
  inputs.forEach(function (inp) { row[inp.dataset.field] = inp.value.trim(); });
  savedRows.push(row);
  statusEl.className = 'tcv-status tcv-ok';
  statusEl.textContent = '\\u2713 Row saved (' + savedRows.length + ' total).';
  logEl.insertAdjacentHTML('afterbegin',
    '<div class="tcv-log-row"><strong>' + row.product + '</strong><span>' + row.email + '</span><span>qty ' + row.qty + '</span><span>' + (row.discount || '0') + '% off</span></div>');
  inputs.forEach(function (inp) {
    inp.value = '';
    validateField(inp.dataset.field, '');
  });
});`,

  seo: {
    title: 'Table Inline Cell Validation — Real Per-Column Validators (HTML CSS JS)',
    description: `An editable table row with real per-column validation functions — email regex, positive-integer quantity, required fields — red outlines, inline error tooltips, and a save block. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Table Inline Cell Validation — Genuine Per-Column Rules That Block Saving',
      description: `An editable table cell that accepts anything typed into it isn't actually editable data entry — it's a text box pretending to be a form. This snippet builds real per-column validation for an editable table row in plain HTML, CSS, and vanilla JavaScript: a dedicated validator function per field, a red outline and an inline error tooltip on invalid cells, and a Save action that's genuinely blocked until every cell in the row passes.

**A real validator function per column**

The \`VALIDATORS\` object maps each field name to a function that inspects the actual current value and returns an error message string (or an empty string when valid). \`product\` checks non-empty; \`email\` runs a real regex (\`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\`) against the trimmed value; \`qty\` parses the value as a number and checks \`Number.isInteger(n) && n > 0\`; \`discount\` is optional but, if filled in, must parse to a number between 0 and 100. None of these are decorative — each genuinely inspects the live input value and computes a real pass/fail result, so typing "abc" into the quantity cell or "not-an-email" into the email cell is caught by actual logic, not styling alone.

**Inline error tooltip, not just a red border**

An invalid cell gets both a red input outline (\`.tcv-invalid .tcv-input\`) *and* a small speech-bubble-style message positioned directly beneath the offending input, showing the exact validator's message ("Enter a valid email address," "Quantity must be a positive whole number"). Color alone doesn't tell a user *why* a cell is wrong; the message does — and because it's populated by the validator's actual return value, the message always matches the real reason the cell failed.

**Validated on input and blur, re-validated at save**

Every input validates live as the user types (so the error clears the moment the value becomes correct) and again on blur. Clicking "Save row" runs \`validateAll()\` across every cell regardless of which was last touched, and only pushes the row into \`savedRows\` if every single validator passes — an invalid row is genuinely never accepted; the save function returns early and leaves the invalid cells highlighted rather than silently proceeding.

**Real data on success, not a fake confirmation**

A successfully validated row is pushed into a real \`savedRows\` array and rendered into a running log below the form, with a live count. This closes the loop: validation isn't a UI-only gate that then does nothing — passing it results in the row's data genuinely being captured, exactly the way a real save-to-server call would only fire after the same validation passed.

**Extending to more columns or rules**

Because every column's rule lives in one small function keyed by field name, adding a new validated column is one new \`VALIDATORS\` entry plus a matching cell and error span — no changes to \`validateField\`, \`validateAll\`, or the save handler. Pair this with an [editable table](/ui-snippets/editable-table/) for the broader inline-editing pattern, or a [data table](/ui-snippets/data-table/) once validated rows need to live in a larger, sortable dataset.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An editable row renders with Product, Email, Quantity, and Discount % cells.` },
      { title: 'Leave a field empty and click Save', text: `Required cells outline red with an inline error tooltip; the row is not saved.` },
      { title: 'Type an invalid email', text: `The email cell fails its regex check and shows "Enter a valid email address."` },
      { title: 'Type a negative or decimal quantity', text: `The quantity cell fails its integer-and-positive check.` },
      { title: 'Fix every cell and click Save', text: `Once all validators pass, the row is captured and appended to the log below.` },
      { title: 'Add another rule', text: `Add a new key to VALIDATORS and a matching cell/error span for a new validated column.` },
    ] },
    features: [
      { title: 'Real per-column validators', text: `A dedicated function per field genuinely inspects the value and returns a pass/fail message.` },
      { title: 'Regex email validation', text: `A real pattern check, not just a non-empty check.` },
      { title: 'Positive-integer quantity check', text: `Number.isInteger plus a positivity check rejects decimals, negatives, and text.` },
      { title: 'Optional-but-bounded fields', text: `Discount is optional when empty but must be 0–100 when filled in.` },
      { title: 'Inline error tooltip', text: `A positioned message beneath the invalid input states the exact reason it failed.` },
      { title: 'Live and blur validation', text: `Errors clear the instant a value becomes valid while typing.` },
      { title: 'Genuinely blocked save', text: `Save only pushes data into savedRows when every cell in the row passes.` },
      { title: 'Real captured data', text: `Valid rows are pushed into a real array and rendered into a running log.` },
    ],
    useCases: [
      { title: 'Bulk data entry grids', text: 'Validate spreadsheet-style row entry in bulk data entry grids, with a dedicated function per column genuinely inspecting each value.' },
      { title: 'Order and invoice line entry', text: 'Catch bad quantities or discounts using `Number.isInteger` plus a positivity check, as in an [invoice line items table](/ui-snippets/invoice-line-items-table/).' },
      { title: 'CRM and contact imports', text: 'Validate emails inline with a real pattern before saving, showing red outlines and an inline error tooltip.' },
      { title: 'Editable admin panels', text: 'Block a save on any row with errors, extending a plain [editable table](/ui-snippets/editable-table/) with real validation rules.' },
      { title: 'Optional bounded fields', text: 'Treat discount as optional when empty but required to be between 0 and 100 when filled, reusing the validator pattern for onboarding forms.' },
      { icon: 'CODE', title: 'Related: Inline Add Row to Table', desc: 'See the [Inline Add Row to Table](/ui-snippets/table-inline-add-row/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are the validators actually checking the data, or is this just styling?', a: `They genuinely check it. Each entry in VALIDATORS is a function that receives the live input value and computes a real result — the email validator runs an actual regex test, the quantity validator calls Number.isInteger on the parsed value and checks it's greater than zero. The red outline and error message only appear because that function's return value was a non-empty error string, not because of any hardcoded styling rule.` },
      { q: 'Can a row with an invalid cell actually be saved?', a: `No. Clicking Save row calls validateAll(), which runs every column's validator against its current value and returns false if any one fails. The save handler checks that return value and returns early without touching savedRows if it's false — so an invalid row genuinely never gets appended to the saved data or the log, it isn't just visually blocked.` },
      { q: 'Why is the discount field optional but still validated?', a: `Its validator returns no error for an empty value (since discounts aren't required), but if the user does type something, it must parse as a number between 0 and 100 — a non-numeric value or one outside that range still fails. This models a common real-world rule: a field can be optional while still needing to be well-formed whenever it is provided.` },
      { q: 'What does the inline error message actually say?', a: `Exactly what the failing validator returned — "Product name is required," "Enter a valid email address," "Quantity must be a positive whole number," or "Discount must be a number from 0 to 100." Because the tooltip's text is set directly from the validator's return value, it always matches the real reason that specific cell is invalid rather than a generic "invalid input" message.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the VALIDATORS map exactly as plain functions, store each field's current value and error message in component state, run the relevant validator on input/blur/save, and bind the invalid class and error text to that state. The validator functions themselves are framework-agnostic and don't need to change.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing which validation rules a real form should enforce, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the email validator's regex does and doesn't catch, why the quantity validator uses Number.isInteger rather than just checking the value is truthy, and why the discount field's validator treats an empty string as valid while the other required fields don't. The same assistant can help extend it — ask it to add async validation (e.g. checking an email isn't already registered via a debounced API call), support validating and saving multiple rows at once instead of a single row, or add a "Discard changes" action that resets the row without saving. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an editable table row with real inline per-column validation in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Four editable cells in one row: a required product-name text field, an email field, a quantity field, and an optional discount-percentage field.
- Implement a genuine validator function for each column (not decorative styling): the product validator must fail on an empty/whitespace-only value; the email validator must fail unless the trimmed value matches a real email-shaped regex pattern; the quantity validator must fail unless the value parses to a positive whole integer (reject empty, negative, decimal, and non-numeric input); the discount validator must pass on an empty value (it's optional) but, if a value is present, must fail unless it parses to a number between 0 and 100 inclusive.
- On every keystroke (input event) and on blur, re-run that specific field's validator against its current value and update that cell's UI: add a distinct red-outline style and show a small inline error tooltip positioned directly beneath the input when invalid, and remove both when the value becomes valid.
- The inline error tooltip's text must be the actual message returned by that field's validator, not a generic "invalid" label, so different failure reasons show different specific text.
- A "Save row" button must call every column's validator across the whole row (regardless of which field was last edited) and must NOT proceed with saving the row's data if any single cell fails — it should re-show the appropriate error state on every currently-invalid cell and stop.
- Only when every cell passes should the row's data actually be captured (e.g. pushed into an in-memory array and reflected in a small confirmation/log area), and the inputs should then clear for the next entry.`,
    },
  },
};

export default tableCellValidationErrors;
