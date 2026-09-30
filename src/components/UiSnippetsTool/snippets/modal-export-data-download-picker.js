const modalExportDataDownloadPicker = {
  id: 'modal-export-data-download-picker',
  title: 'Export Data Modal with Format and Field Picker',
  lastmod: '2026-08-31',
  category: 'modals',
  cdnUrls: [],
  html: `<div class="edm-page"><button type="button" class="edm-open" id="edmOpen">Export data</button></div>

<div class="edm-backdrop" id="edmBackdrop"></div>
<div class="edm-modal" id="edmModal" role="dialog" aria-modal="true" aria-labelledby="edmTitle">
  <button type="button" class="edm-close" id="edmClose" aria-label="Close">&#10005;</button>
  <h3 id="edmTitle">Export data</h3>
  <p class="edm-sub">Choose a format and the fields to include.</p>

  <div class="edm-section">
    <span class="edm-label">Format</span>
    <div class="edm-formats" id="edmFormats">
      <button type="button" class="edm-format edm-format-active" data-format="CSV">
        <b>CSV</b><span>Spreadsheet-friendly, comma-separated</span>
      </button>
      <button type="button" class="edm-format" data-format="JSON">
        <b>JSON</b><span>Structured, ideal for scripts and APIs</span>
      </button>
      <button type="button" class="edm-format" data-format="PDF">
        <b>PDF</b><span>Formatted report, ready to share</span>
      </button>
    </div>
  </div>

  <div class="edm-section">
    <div class="edm-fields-head">
      <span class="edm-label">Fields to include</span>
      <button type="button" class="edm-select-all" id="edmSelectAll">Select all</button>
    </div>
    <div class="edm-fields" id="edmFields">
      <label class="edm-field"><input type="checkbox" value="Name" checked><span>Name</span></label>
      <label class="edm-field"><input type="checkbox" value="Email" checked><span>Email</span></label>
      <label class="edm-field"><input type="checkbox" value="Plan" checked><span>Plan</span></label>
      <label class="edm-field"><input type="checkbox" value="Signup date" checked><span>Signup date</span></label>
      <label class="edm-field"><input type="checkbox" value="Last active"><span>Last active</span></label>
      <label class="edm-field"><input type="checkbox" value="Billing address"><span>Billing address</span></label>
      <label class="edm-field"><input type="checkbox" value="Tags"><span>Tags</span></label>
    </div>
  </div>

  <div class="edm-footer">
    <span class="edm-summary" id="edmSummary">Exporting 4 fields as CSV</span>
    <button type="button" class="edm-export-btn" id="edmExportBtn">Export</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}
.edm-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.edm-open{background:#0f172a;color:#fff;border:none;border-radius:11px;padding:12px 22px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit}

.edm-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.edm-backdrop.show{opacity:1;pointer-events:all}

.edm-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(460px,92vw);max-height:88vh;overflow-y:auto;background:#fff;border-radius:18px;padding:28px 26px 22px;z-index:91;
  transition:opacity .2s,transform .2s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.edm-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.edm-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:12px}

#edmTitle{font-size:19px;font-weight:800;color:#0f172a;margin-bottom:4px}
.edm-sub{font-size:12.5px;color:#64748b;margin-bottom:22px}

.edm-section{margin-bottom:20px}
.edm-label{display:block;font-size:11.5px;font-weight:800;letter-spacing:.03em;text-transform:uppercase;color:#94a3b8;margin-bottom:10px}

.edm-formats{display:grid;grid-template-columns:1fr;gap:8px}
.edm-format{display:flex;flex-direction:column;align-items:flex-start;gap:2px;text-align:left;padding:11px 14px;border-radius:11px;border:1.5px solid #e2e8f0;background:#fff;cursor:pointer;font-family:inherit;transition:border-color .15s,background .15s}
.edm-format b{font-size:13px;color:#1e293b}
.edm-format span{font-size:11.5px;color:#94a3b8}
.edm-format:hover{border-color:#c7cff5}
.edm-format-active{border-color:#6366f1;background:#f5f6ff}
.edm-format-active b{color:#4338ca}

.edm-fields-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:10px}
.edm-fields-head .edm-label{margin-bottom:0}
.edm-select-all{background:none;border:none;color:#6366f1;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit}
.edm-fields{display:grid;grid-template-columns:1fr 1fr;gap:8px 12px}
.edm-field{display:flex;align-items:center;gap:9px;font-size:13px;color:#334155;cursor:pointer;padding:6px 4px}
.edm-field input{accent-color:#6366f1;width:16px;height:16px;flex-shrink:0}

.edm-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;padding-top:16px;border-top:1px solid #f1f5f9}
.edm-summary{font-size:12px;color:#64748b}
.edm-export-btn{background:#6366f1;color:#fff;border:none;border-radius:9px;padding:10px 22px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.edm-export-btn:hover{background:#4f46e5}
.edm-export-btn:disabled{background:#c7cff5;cursor:not-allowed}`,

  js: `// The summary line and the export button's enabled state both derive from
// the same two pieces of state -- selected format and checked field count --
// recalculated together in one function so they can never show conflicting info.
var backdrop = document.getElementById('edmBackdrop');
var modal = document.getElementById('edmModal');
var openBtn = document.getElementById('edmOpen');
var closeBtn = document.getElementById('edmClose');
var formatButtons = Array.prototype.slice.call(document.querySelectorAll('.edm-format'));
var fieldCheckboxes = Array.prototype.slice.call(document.querySelectorAll('.edm-fields input[type="checkbox"]'));
var selectAllBtn = document.getElementById('edmSelectAll');
var summaryEl = document.getElementById('edmSummary');
var exportBtn = document.getElementById('edmExportBtn');

var selectedFormat = 'CSV';

function openModal() {
  backdrop.classList.add('show');
  modal.classList.add('show');
}
function closeModal() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
}

openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

function updateSummary() {
  var checkedCount = fieldCheckboxes.filter(function (cb) { return cb.checked; }).length;

  if (checkedCount === 0) {
    summaryEl.textContent = 'Select at least one field to export';
    exportBtn.disabled = true;
  } else {
    summaryEl.textContent = 'Exporting ' + checkedCount + ' field' + (checkedCount === 1 ? '' : 's') + ' as ' + selectedFormat;
    exportBtn.disabled = false;
  }

  var allChecked = fieldCheckboxes.every(function (cb) { return cb.checked; });
  selectAllBtn.textContent = allChecked ? 'Deselect all' : 'Select all';
}

formatButtons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    selectedFormat = btn.getAttribute('data-format');
    formatButtons.forEach(function (b) { b.classList.toggle('edm-format-active', b === btn); });
    updateSummary();
  });
});

fieldCheckboxes.forEach(function (cb) {
  cb.addEventListener('change', updateSummary);
});

selectAllBtn.addEventListener('click', function () {
  var allChecked = fieldCheckboxes.every(function (cb) { return cb.checked; });
  fieldCheckboxes.forEach(function (cb) { cb.checked = !allChecked; });
  updateSummary();
});

exportBtn.addEventListener('click', function () {
  var fields = fieldCheckboxes.filter(function (cb) { return cb.checked; }).map(function (cb) { return cb.value; });
  exportBtn.textContent = 'Preparing...';
  exportBtn.disabled = true;
  setTimeout(function () {
    exportBtn.textContent = 'Export';
    updateSummary();
    closeModal();
  }, 900);
  // fields and selectedFormat now hold everything a real export request needs, e.g.:
  // fetch('/api/export', { method: 'POST', body: JSON.stringify({ format: selectedFormat, fields: fields }) })
});

updateSummary();`,

  seo: {
    title: 'Export Data Modal with Format and Field Picker — Free HTML CSS JS Snippet',
    description: 'A data export modal where a visitor picks CSV, JSON, or PDF and checks exactly which fields to include, with a live summary and a select-all toggle. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Export Data Modal — Format Selection Plus a Field Checklist with a Live Summary',
      description: `A plain "Export CSV" button assumes every visitor wants every field in exactly one format. This modal gives them a real choice: three format cards (CSV, JSON, PDF) and a checklist of individual fields, with a summary line and the export button itself both staying in sync with whatever combination is currently selected.

**One \`updateSummary()\` function reconciles three states at once**

Every interaction — clicking a format card, toggling a single checkbox, or clicking "Select all" — calls the same \`updateSummary()\` function afterward. It recomputes the checked-field count, rewrites the summary sentence to match both that count and the currently selected format, and enables or disables the export button — all together, so there's no path where the summary text could say "3 fields" while the button is actually disabled for having zero, or where the format name in the summary lags behind the actually-selected format card.

**The export button disables itself on a real, checked condition**

Rather than always being clickable and letting a zero-field export silently do nothing, \`exportBtn.disabled\` is set directly from \`checkedCount === 0\`. A visitor who unchecks every field sees the summary line change to an explicit "Select at least one field to export" and watches the button visually grey out — the invalid state is communicated, not just silently prevented.

**"Select all" is really "select all or deselect all," decided live**

\`selectAllBtn\`'s own label text updates every time \`updateSummary()\` runs, based on \`fieldCheckboxes.every(cb => cb.checked)\`. When every field is already checked, the button relabels itself "Deselect all" — clicking it then unchecks everything rather than doing nothing (which is what a button permanently labeled "Select all" would confusingly do once everything was already selected).

**Format selection uses one shared variable, not per-button state**

\`selectedFormat\` is a single string variable that every format button's click handler overwrites, and the visual active state is reapplied to all three buttons together via \`formatButtons.forEach\` on every click — comparing each button against the one that was actually clicked. This guarantees exactly one format card can ever show as active, since the active class is fully recomputed across all three buttons on every click rather than toggled individually.

**The export action is a real state handoff, not a dead end**

Clicking "Export" collects the checked fields into a real array via \`.filter().map()\` and pairs it with \`selectedFormat\` — exactly the payload a real \`fetch()\` call to a backend export endpoint would need, shown in a code comment at the point where you'd wire it in. The button shows a brief "Preparing..." state before the modal closes, simulating the round-trip a real export request would involve.

**Customizing it**

Add a fourth format by adding another \`.edm-format\` button with its own \`data-format\` value — the click-handler loop and \`selectedFormat\` logic already generalize to any number of format buttons. Add or remove fields by editing the \`.edm-field\` checkboxes in \`#edmFields\`; \`fieldCheckboxes\` is queried fresh from the DOM, so no JavaScript changes are needed for the count and summary logic to pick up new fields.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the export modal', text: 'Click "Export data" to open the format and field picker.' },
        { title: 'Choose a format', text: 'Click CSV, JSON, or PDF — the active card highlights and the summary line updates.' },
        { title: 'Check or uncheck fields', text: 'The summary and the Export button both update live as you change the selection.' },
        { title: 'Try Select all / Deselect all', text: 'The button label itself flips depending on whether every field is already checked.' },
        { title: 'Uncheck every field', text: 'The Export button disables and the summary explains why.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Three format cards (CSV, JSON, PDF) with exactly one active at a time',
      'Independent field checkboxes with a live checked-count summary line',
      'Export button disables itself automatically when zero fields are selected',
      'Select all button relabels itself to Deselect all once every field is already checked',
      'One updateSummary() function keeps the summary text and button state from ever conflicting',
      'Export click handler collects selected fields and format into a ready-to-send payload shape',
      'Simulated "Preparing..." button state before the modal closes on export',
      'Escape key, backdrop click, and a close button all dismiss the modal',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Admin dashboards and data table toolbars', desc: 'Let users export exactly the columns they need instead of a fixed, all-or-nothing CSV dump.' },
      { icon: 'FLOW', title: 'CRM and customer data platforms', desc: 'Pair with the [table export column selector](/ui-snippets/table-export-column-selector/) for a matching inline toolbar alternative.' },
      { icon: 'FORM', title: 'Analytics and reporting tools', desc: 'Offer PDF for shareable reports and CSV/JSON for further processing from the same export flow.' },
      { icon: 'LEARN', title: 'Learn single-source-of-truth summary patterns', desc: 'Study how one updateSummary() function prevents the summary text and button state from ever showing conflicting information.' },
      { icon: 'DESIGN', title: 'GDPR and data portability request flows', desc: 'Reuse the field-picker pattern for a "download your data" self-service compliance feature.' },
      { icon: 'CODE', title: 'Related: Onboarding Checklist Progress Modal', desc: 'See the [Onboarding Checklist Progress Modal](/ui-snippets/modal-onboarding-checklist-progress/) for a related checkbox-driven modal pattern.' },
    ],
    faqs: [
      { q: 'What happens if I uncheck every field?', a: 'updateSummary() detects checkedCount === 0, changes the summary text to "Select at least one field to export," and sets exportBtn.disabled = true, visually greying out the button so it cannot be clicked until at least one field is checked again.' },
      { q: 'How does the "Select all" button know to relabel itself?', a: 'Every time updateSummary() runs, it checks fieldCheckboxes.every(cb => cb.checked) and sets the button\'s text to "Deselect all" if every checkbox is already checked, or "Select all" otherwise. Clicking the button itself reads that same allChecked condition to decide whether to check or uncheck every field.' },
      { q: 'Can more than one format be selected at once?', a: 'No. selectedFormat is a single shared variable, and clicking any format button loops over all format buttons via formatButtons.forEach, toggling the active class only on the one that was actually clicked. This guarantees exactly one format card is ever shown as active.' },
      { q: 'What data does the Export click handler actually produce?', a: 'It builds a fields array via fieldCheckboxes.filter(checked).map(value) and pairs it with the selectedFormat string — together forming exactly the payload shape a real backend export endpoint would need, shown as a commented-out fetch() call at the point where you would wire in a real request.' },
      { q: 'How do I add a fourth export format, like XML?', a: 'Add another button with class edm-format and a data-format="XML" attribute inside #edmFormats, following the same markup pattern as the existing three. The click-handler loop is bound to formatButtons, which is queried from the DOM at load time, so make sure the new button exists before that query runs (i.e., it is present in the initial HTML).' },
      { q: 'How do I add or remove a field from the checklist?', a: 'Add or remove a .edm-field label with its checkbox inside #edmFields in the HTML panel. fieldCheckboxes is queried fresh via document.querySelectorAll on page load, so updateSummary() and the select-all logic both automatically include whatever fields are present with no other JavaScript changes needed.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the state reconciliation by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how updateSummary() keeps the summary text, the export button's disabled state, and the select-all button's own label all derived from the same two pieces of state — the checked field count and the selected format — so none of them can ever show conflicting information after an interaction. The same assistant can help you extend it — ask it to wire the commented-out fetch() call into a real backend export endpoint and handle the response (e.g. triggering a file download or showing a progress toast), add per-format field restrictions (e.g. PDF only supports a subset of fields), or persist the last-used format and field selection to localStorage so returning visitors see their previous choices pre-selected. It's also useful for an accessibility review: ask whether the format cards should use role="radiogroup" semantics instead of plain buttons, given that exactly one is always selected. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a data export modal in plain HTML, CSS, and vanilla JavaScript with a format picker and an independent field checklist — no framework.

Requirements:
- A trigger button that opens a modal (backdrop plus centered dialog with a fade/scale transition), closable via a close button, backdrop click, and the Escape key.
- Inside the modal, a row of format option cards (e.g. CSV, JSON, PDF), each showing a name and a short description, where clicking one selects it and visually deselects the others — exactly one format can be active at any time, tracked in a single shared variable.
- Below the format picker, a grid of individually checkable field checkboxes (at least six), some checked by default and some not, plus a "Select all" button.
- Write one single function that recomputes, together, on every interaction (format click, checkbox toggle, or select-all click): a summary sentence stating how many fields are selected and in what format, and whether the export button should be enabled or disabled — the export button must be disabled specifically when zero fields are checked, with the summary text explicitly explaining why.
- The "Select all" button must relabel itself to "Deselect all" whenever every field checkbox is already checked, and clicking it in that state must uncheck everything rather than doing nothing.
- Clicking the export button (only reachable while enabled) should collect the currently selected format and an array of the checked fields' values, briefly show a "Preparing..." state on the button, then close the modal — include a code comment showing where a real fetch() call to a backend export endpoint would use that collected data.`,
    },
  },
};

export default modalExportDataDownloadPicker;
