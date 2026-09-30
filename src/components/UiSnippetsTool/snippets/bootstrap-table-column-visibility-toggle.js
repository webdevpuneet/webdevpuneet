const bootstrapTableColumnVisibilityToggle = {
  id: 'bootstrap-table-column-visibility-toggle',
  title: 'Bootstrap Table Column Visibility Toggle',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscolvis-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0">Customers</h6>
        <div class="dropdown">
          <button class="btn btn-sm btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">Columns</button>
          <ul class="dropdown-menu p-2" id="bscolvisMenu"></ul>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-sm mb-0" id="bscolvisTable"></table>
      </div>
    </div>
  </div>
</div>`,
  css: `.bscolvis-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bscolvis-menu-item { display: flex; align-items: center; gap: 8px; padding: 4px 8px; font-size: 12.5px; white-space: nowrap; }
th.bscolvis-hidden, td.bscolvis-hidden { display: none; }`,
  js: `const COLUMNS = [
  { key: 'name', label: 'Name', locked: true },
  { key: 'email', label: 'Email', locked: false },
  { key: 'plan', label: 'Plan', locked: false },
  { key: 'mrr', label: 'MRR', locked: false },
  { key: 'signup', label: 'Signed up', locked: false },
];

const ROWS = [
  { name: 'Dana Reyes', email: 'dana@acme.co', plan: 'Pro', mrr: '$29', signup: '2024-01-04' },
  { name: 'Marcus Lee', email: 'marcus@acme.co', plan: 'Team', mrr: '$99', signup: '2024-03-19' },
  { name: 'Priya Nair', email: 'priya@acme.co', plan: 'Free', mrr: '$0', signup: '2024-06-02' },
];

let visible = new Set(COLUMNS.map(c => c.key));

const menu = document.getElementById('bscolvisMenu');
const table = document.getElementById('bscolvisTable');

function renderMenu() {
  menu.innerHTML = COLUMNS.map(c =>
    '<li><label class="bscolvis-menu-item"><input type="checkbox" class="form-check-input" data-key="' + c.key + '" ' +
    (visible.has(c.key) ? 'checked' : '') + (c.locked ? ' disabled' : '') + '> ' + c.label + '</label></li>'
  ).join('');
}

function renderTable() {
  const cols = COLUMNS.filter(c => visible.has(c.key));
  table.innerHTML =
    '<thead><tr>' + cols.map(c => '<th>' + c.label + '</th>').join('') + '</tr></thead>' +
    '<tbody>' + ROWS.map(row =>
      '<tr>' + cols.map(c => '<td>' + row[c.key] + '</td>').join('') + '</tr>'
    ).join('') + '</tbody>';
}

menu.addEventListener('change', e => {
  const key = e.target.dataset.key;
  if (!key) return;
  if (e.target.checked) visible.add(key); else visible.delete(key);
  renderTable();
});

renderMenu();
renderTable();`,

  seo: {
    title: 'Bootstrap Table Column Visibility Toggle — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 dropdown checklist for showing and hiding table columns — the table is re-rendered from only the currently visible columns, and one column is genuinely locked always-visible.',
    about: {
      title: 'Bootstrap Table Column Visibility Toggle — HTML, CSS & JavaScript',
      description: `Visible columns are tracked as a \`Set\` of column keys rather than a boolean flag per column scattered across variables, which is what makes \`renderTable()\` a one-line filter — \`COLUMNS.filter(c => visible.has(c.key))\` — instead of a chain of individual if-checks per column. Both the header row and every body row map over that exact same filtered \`cols\` array, so a header and its corresponding data cells can never fall out of sync about which columns actually exist.\n\nThe Name column is marked \`locked: true\` and its checkbox renders \`disabled\` — table content with no visible identifying column at all is close to meaningless, so removing the one column every row needs to make sense isn't offered as an option in the first place, rather than being technically possible and just discouraged.\n\nThe dropdown uses Bootstrap's real \`data-bs-auto-close="outside"\` option, the same technique this collection uses in [bootstrap-multi-select-dropdown](/ui-snippets/bootstrap-multi-select-dropdown/) and [bootstrap-notification-center-dropdown](/ui-snippets/bootstrap-notification-center-dropdown/) — without it, Bootstrap's default dropdown behavior closes the menu the instant the first checkbox is clicked, which would make toggling more than one column at a time frustratingly slow.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A five-column customer table shows in full, with a "Columns" dropdown button above it.' },
        { title: 'Click "Columns"', text: 'A checklist opens showing all five columns checked, with Name greyed out and unclickable.' },
        { title: 'Uncheck "MRR"', text: 'The MRR column disappears from the table immediately, and the dropdown stays open.' },
        { title: 'Uncheck "Signed up" too, without closing the dropdown first', text: 'Both columns can be toggled off in one open dropdown session, since it doesn\'t auto-close on the first click.' },
        { title: 'Try to uncheck "Name"', text: 'Its checkbox is disabled — it can never be hidden.' },
      ],
    },
    features: [
      'Visible columns are tracked in a single Set, filtered once to drive both the header and every row',
      'The header and body columns are always structurally guaranteed to match, since both render from the same filtered list',
      'One column is genuinely locked always-visible, disabled at the checkbox level, not just discouraged',
      'The dropdown stays open across multiple checkbox clicks via Bootstrap\'s real auto-close="outside" option',
      'Adding a new toggleable column is a one-line addition to the COLUMNS array',
    ],
    useCases: [
      { icon: 'DASH', title: 'Admin data tables with more columns than fit comfortably', desc: 'Pairs with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/) or [bootstrap-sticky-table-header-scroll](/ui-snippets/bootstrap-sticky-table-header-scroll/) for a fuller-featured data grid.' },
      { icon: 'DEV', title: 'Internal reporting and analytics dashboards', desc: 'Let a user focus on only the columns relevant to their current task, hiding the rest.' },
      { icon: 'APP', title: 'CRM and customer-management tools', desc: 'A standard feature in most real CRM table views, letting users customize which fields they see.' },
    ],
    faqs: [
      { q: 'Why is the Name column locked?', a: 'A row with every identifying column hidden would be meaningless — locking the one column every row needs to actually be readable prevents a user from accidentally hiding every useful piece of context at once.' },
      { q: 'Why does the dropdown need data-bs-auto-close="outside"?', a: 'Bootstrap\'s dropdown closes itself by default on any click inside it, including a checkbox click — without this option, toggling a second or third column would require reopening the dropdown after every single click.' },
      { q: 'Can I add more columns?', a: 'Yes — add an entry to the COLUMNS array with a key, label, and locked flag, and add matching data to each row in ROWS keyed the same way; renderMenu() and renderTable() both iterate the array generically.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the visible column keys in a Set (or equivalent) in component state, and derive both the checklist and the filtered table columns from it in your render function — the locked-column logic carries over directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to persist the user's column visibility choices to localStorage so they're remembered on their next visit, or to add drag handles in the dropdown checklist letting the user also reorder the visible columns, not just show/hide them.`,
      prompt: `Build a Bootstrap 5.3 table with a column visibility toggle dropdown, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with at least 5 columns and a few sample rows, plus a dropdown button labeled "Columns" (using Bootstrap's real dropdown component with data-bs-auto-close="outside" so it stays open across multiple checkbox clicks).
- The dropdown contains one checkbox per column, all checked by default. Track visible columns in a single Set of column keys, and render both the table header and every row's cells by filtering the full column list against that Set — never by independently toggling individual header or cell elements.
- Unchecking a column's checkbox must immediately hide that column from the table (both header and every row); rechecking must restore it.
- Exactly one column (e.g. the primary identifying column, like a name) must be structurally locked always-visible — its checkbox should be disabled and unclickable, not just pre-checked.`,
    },
  },
};

export default bootstrapTableColumnVisibilityToggle;
