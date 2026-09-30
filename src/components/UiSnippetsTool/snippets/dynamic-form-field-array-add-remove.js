const dynamicFormFieldArrayAddRemove = {
  id: 'dynamic-form-field-array-add-remove',
  title: 'Dynamic Field Array — Add/Remove Repeatable Form Rows',
  lastmod: '2026-08-27',
  category: 'forms',
  html: `<div class="demo">
  <form class="field-array-form" id="farrayForm" novalidate>
    <div class="fa-head">
      <label>Team member emails</label>
      <span class="fa-count" id="faCount">1 field</span>
    </div>

    <div class="fa-rows" id="faRows">
      <div class="fa-row" data-index="0">
        <input type="email" class="fa-input" placeholder="teammate@company.com" required />
        <button type="button" class="fa-remove" aria-label="Remove field" disabled>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>
    </div>

    <button type="button" class="fa-add" id="faAdd">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      Add another email
    </button>

    <button type="submit" class="fa-submit">Send invites</button>
    <p class="fa-status" id="faStatus" role="status" aria-live="polite"></p>
  </form>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.field-array-form { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; display: flex; flex-direction: column; gap: 12px; }

.fa-head { display: flex; align-items: center; justify-content: space-between; }
.fa-head label { font-size: 13px; font-weight: 700; color: #111827; }
.fa-count { font-size: 11px; font-weight: 600; color: #94a3b8; }

.fa-rows { display: flex; flex-direction: column; gap: 8px; }
.fa-row { display: flex; gap: 8px; align-items: center; }
.fa-input { flex: 1; padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 13px; font-family: inherit; }
.fa-input:focus-visible { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.fa-input.invalid { border-color: #ef4444; }

.fa-remove { width: 36px; height: 36px; flex-shrink: 0; background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 9px; color: #94a3b8; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: background 0.15s, color 0.15s; }
.fa-remove:hover:not(:disabled) { background: #fef2f2; color: #dc2626; border-color: #fecaca; }
.fa-remove:disabled { opacity: 0.4; cursor: not-allowed; }

.fa-add { align-self: flex-start; display: flex; align-items: center; gap: 6px; background: none; border: 1.5px dashed #c7d2fe; color: #4f46e5; padding: 8px 14px; border-radius: 9px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.fa-add:hover { background: #eef2ff; }

.fa-submit { margin-top: 6px; background: #4f46e5; color: #fff; border: none; padding: 11px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.fa-submit:hover { background: #4338ca; }

.fa-status { font-size: 12px; color: #dc2626; font-weight: 600; min-height: 14px; }
.fa-status.success { color: #059669; }`,
  js: `const rowsEl = document.getElementById('faRows');
const addBtn = document.getElementById('faAdd');
const countEl = document.getElementById('faCount');
const form = document.getElementById('farrayForm');
const statusEl = document.getElementById('faStatus');

let nextIndex = 1;

function refreshRemoveButtons() {
  const rows = rowsEl.querySelectorAll('.fa-row');
  rows.forEach((row) => {
    row.querySelector('.fa-remove').disabled = rows.length <= 1;
  });
  countEl.textContent = \`\${rows.length} field\${rows.length === 1 ? '' : 's'}\`;
}

function createRow() {
  const row = document.createElement('div');
  row.className = 'fa-row';
  row.dataset.index = String(nextIndex++);

  const input = document.createElement('input');
  input.type = 'email';
  input.className = 'fa-input';
  input.placeholder = 'teammate@company.com';
  input.required = true;

  const removeBtn = document.createElement('button');
  removeBtn.type = 'button';
  removeBtn.className = 'fa-remove';
  removeBtn.setAttribute('aria-label', 'Remove field');
  removeBtn.innerHTML = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>';
  removeBtn.addEventListener('click', () => {
    row.remove();
    refreshRemoveButtons();
  });

  row.append(input, removeBtn);
  return row;
}

addBtn.addEventListener('click', () => {
  const row = createRow();
  rowsEl.appendChild(row);
  refreshRemoveButtons();
  row.querySelector('.fa-input').focus();
});

// Wire the remove button on the initial row that already exists in the HTML.
rowsEl.querySelector('.fa-remove').addEventListener('click', function () {
  this.closest('.fa-row').remove();
  refreshRemoveButtons();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputs = Array.from(rowsEl.querySelectorAll('.fa-input'));
  let firstInvalid = null;
  let validCount = 0;

  inputs.forEach((input) => {
    const isValid = input.value.trim() !== '' && /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(input.value.trim());
    input.classList.toggle('invalid', !isValid);
    if (isValid) validCount += 1;
    else if (!firstInvalid) firstInvalid = input;
  });

  if (firstInvalid) {
    statusEl.textContent = 'Enter a valid email in every field before sending.';
    statusEl.classList.remove('success');
    firstInvalid.focus();
  } else {
    statusEl.textContent = \`\${validCount} invite\${validCount === 1 ? '' : 's'} sent successfully.\`;
    statusEl.classList.add('success');
  }
});

refreshRemoveButtons();`,
  seo: {
    title: 'Dynamic Field Array — Add and Remove Repeatable Form Rows in Vanilla JS',
    description: 'A repeatable form-field pattern where users can add or remove input rows dynamically, with the last remaining row protected from deletion and full per-row email validation on submit.',
    about: {
      title: 'Dynamic Field Array — Add/Remove Rows Without a Form Framework',
      description: `Forms that collect an unknown number of similar values — invite emails, phone numbers, URLs, line items — need a way for the user to add or remove input rows on the fly. This is normally handled by a form library's "field array" abstraction (React Hook Form, Formik, etc.); this snippet implements the same idea directly in vanilla JavaScript, with the same correctness guarantees a library version would provide.

**Every row is fully self-contained, created identically**

\`createRow()\` builds one complete \`.fa-row\` — an \`<input>\` and its own \`.fa-remove\` button, with the remove button's click listener attached at creation time — and returns it as a single DOM fragment ready to append. This matters because it means dynamically-added rows and the one static row already in the HTML need to behave *identically*; the snippet handles this by explicitly wiring up a click listener on the pre-existing HTML row separately, right after the \`createRow\` function is defined, so both code paths converge on the same removal behavior.

**The last row can never be deleted**

\`refreshRemoveButtons()\` runs after every add or remove, and disables every row's remove button whenever exactly one row remains — \`rows.length <= 1\`. This prevents a genuinely broken state (a form with zero input rows and no way to add one back except reloading the page) that a naive "just delete on click" implementation would allow. The disabled state is a real HTML \`disabled\` attribute, not a class-based fake, so it's also correctly skipped by keyboard Tab order.

**Validation runs across the whole dynamic set, not a fixed list**

On submit, \`rowsEl.querySelectorAll('.fa-input')\` re-queries the DOM for whatever rows currently exist — however many the user has added or removed — rather than relying on a hardcoded list of expected field references. Each input is checked against a real email-format regex, invalid ones get a visible \`.invalid\` border, and the *first* invalid field receives focus, so the user is taken directly to the first problem rather than having to hunt for it themselves across several similar-looking rows.

**Why unique row indices matter even though this demo doesn't use them for naming**

Each new row is tagged with an auto-incrementing \`data-index\`, distinct from the current DOM position (which shifts as rows are removed). This is worth keeping even in a simple demo because a real backend integration would typically need distinct field names per row (\`emails[0]\`, \`emails[1]\`, etc.) — using an ever-incrementing counter rather than the row's current array position avoids two different rows accidentally colliding on the same generated name after some rows have been removed and others added.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Add another email" to append a row', text: 'Each new row is a fully independent input plus a working remove button, and gets focused automatically after being added.' },
        { title: 'Remove any row via its × button', text: 'Every row\'s remove button works identically, including the one present in the initial HTML.' },
        { title: 'Try removing down to one row', text: 'The last remaining row\'s remove button becomes genuinely disabled — the form can never be left with zero input rows.' },
        { title: 'Submit with an empty or malformed row', text: 'Validation runs across every currently-existing row and focuses the first invalid one, regardless of how many rows have been added or removed.' },
        { title: 'Swap the input type or add more fields per row', text: 'Extend createRow() to build a more complex row (e.g. name + email pair) — the add/remove/validate logic already generalizes to any row shape.' },
      ],
    },
    features: [
      'Fully dynamic add/remove — validation and row-count logic re-query the live DOM rather than assuming a fixed field list',
      'Last remaining row\'s remove button is genuinely disabled (native disabled attribute), preventing a zero-row form state',
      'Newly added rows and the row already present in the initial HTML share identical remove behavior',
      'Per-row email format validation on submit, with the first invalid field automatically focused',
      'Live field-count label updates correctly as rows are added or removed',
      'Unique auto-incrementing index per row, independent of current DOM position, ready for real field naming',
      'Accessible status region (role="status" aria-live="polite") announces validation and submission outcomes',
      'No form library dependency — the entire field-array pattern is implemented in plain vanilla JavaScript',
    ],
    useCases: [
      { icon: 'INVITE', title: 'Team Invite Forms', desc: 'Let a user invite an arbitrary number of teammates by email in one submission, as shown in this demo.' },
      { icon: 'FORM', title: 'Multi-Value Contact Fields', desc: 'Collect a variable number of phone numbers, URLs, or addresses in forms that don\'t know the count up front.' },
      { icon: 'COMMERCE', title: 'Dynamic Line-Item Entry', desc: 'Adapt the same add/remove row pattern for entering multiple order line items without a full data-table.' },
      { icon: 'SURVEY', title: 'Survey/Application Repeatable Sections', desc: 'Collect a variable number of similar entries — work history, references, project links — in an application form.' },
      { icon: 'CODE', title: 'Related: GDPR Data Request Form', desc: 'See the [GDPR Data Request Form](/ui-snippets/gdpr-data-request-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Can the user delete every row, leaving the form empty?', a: 'No — refreshRemoveButtons() disables the remove button on the last remaining row whenever exactly one row is left, so it is structurally impossible to reduce the form to zero input rows through the UI.' },
      { q: 'Does validation only check the rows that existed when the page first loaded?', a: 'No — the submit handler re-queries rowsEl.querySelectorAll(\'.fa-input\') at submit time, so it always validates however many rows currently exist, regardless of how many were added or removed since the page loaded.' },
      { q: 'What happens on submit if one field in the middle is invalid?', a: 'Every field is checked and gets an .invalid style if it fails validation, but only the first invalid field in DOM order receives keyboard focus, so the user is guided directly to the earliest problem rather than needing to scan the whole form.' },
      { q: 'Why does each row get a unique data-index instead of just using its current position?', a: 'A row\'s position in the DOM shifts whenever an earlier row is removed, so using position alone as an identifier could cause two different rows to be treated as "the same" field across add/remove operations. An ever-incrementing counter guarantees every row keeps a stable, unique identity for its whole lifetime.' },
      { q: 'How would I connect this to a real backend submission?', a: 'Replace the demo\'s statusEl.textContent success message with an actual fetch/XHR call, building the request body from Array.from(rowsEl.querySelectorAll(\'.fa-input\')).map(i => i.value) once validation passes.' },
      { q: 'Can I use this pattern for rows with more than one input field each?', a: 'Yes — extend createRow() to build and append multiple inputs (and their own labels) inside each .fa-row instead of just one, and update the submit-time validation loop to check each row\'s full set of fields together.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why re-querying the DOM for the current set of rows at submit time (rather than tracking a separate JavaScript array of row state) is a robust approach here, and what could go wrong if row state and DOM state were allowed to drift apart. It's also worth asking for a version where each row holds multiple related fields (like a name and an email together), or one that supports drag-to-reorder rows in addition to add/remove.`,
      prompt: `Build a dynamic repeatable form-field pattern in HTML, CSS and vanilla JavaScript where users can add and remove input rows freely — no form library, no external dependencies.

Requirements:
- Start with one input row (an email field plus a remove button) already present in the HTML, and an "Add another" button that appends new, fully independent rows built the same way in JavaScript.
- Every row's remove button — both the one in the initial HTML and any dynamically created ones — must behave identically and actually remove that specific row from the DOM.
- The very last remaining row's remove button must become genuinely disabled (using the native disabled attribute) whenever only one row is left, so the form can never be reduced to zero input rows.
- On form submit, validate every currently-existing row's email format (re-querying the DOM rather than relying on a fixed list built at page load), mark invalid fields visibly, and move keyboard focus to the first invalid field found.
- Show a live count of how many fields currently exist, updating correctly after every add or remove.
- Use an accessible live region to announce the submit result (validation failure or success) to screen reader users.`,
    },
  },
};

export default dynamicFormFieldArrayAddRemove;
