const bootstrapBulkActionToolbar = {
  id: 'bootstrap-bulk-action-toolbar',
  title: 'Bootstrap Bulk Action Toolbar',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsbulk-card">
    <div class="card-body p-3">

      <div class="d-flex justify-content-between align-items-center mb-2 bsbulk-header" id="bsbulkDefaultHeader">
        <h6 class="fw-bold mb-0">Team members</h6>
        <span class="small text-muted">5 total</span>
      </div>

      <div class="d-flex justify-content-between align-items-center mb-2 bsbulk-toolbar d-none" id="bsbulkToolbar">
        <span class="small fw-semibold" id="bsbulkCount">0 selected</span>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-sm btn-outline-secondary" id="bsbulkArchive">Archive</button>
          <button type="button" class="btn btn-sm btn-outline-danger" id="bsbulkDeleteBtn">Delete</button>
          <button type="button" class="btn btn-sm btn-link text-decoration-none" id="bsbulkClear">Clear</button>
        </div>
      </div>

      <table class="table table-sm align-middle mb-0">
        <thead>
          <tr>
            <th style="width:36px"><input type="checkbox" class="form-check-input" id="bsbulkSelectAll"></th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody id="bsbulkBody">
          <tr data-row><td><input type="checkbox" class="form-check-input bsbulk-row-check"></td><td>Dana Reyes</td><td><span class="badge text-bg-success">Active</span></td></tr>
          <tr data-row><td><input type="checkbox" class="form-check-input bsbulk-row-check"></td><td>Marcus Lee</td><td><span class="badge text-bg-success">Active</span></td></tr>
          <tr data-row><td><input type="checkbox" class="form-check-input bsbulk-row-check"></td><td>Priya Nair</td><td><span class="badge text-bg-secondary">Invited</span></td></tr>
          <tr data-row><td><input type="checkbox" class="form-check-input bsbulk-row-check"></td><td>Sofia Chen</td><td><span class="badge text-bg-success">Active</span></td></tr>
          <tr data-row><td><input type="checkbox" class="form-check-input bsbulk-row-check"></td><td>Wale Adeyemi</td><td><span class="badge text-bg-warning">Suspended</span></td></tr>
        </tbody>
      </table>
    </div>
  </div>
</div>

<div class="modal fade" id="bsbulkModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Delete selected members?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="mb-0" id="bsbulkModalBody">This will remove them from the team.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger fw-bold" id="bsbulkDeleteConfirm">Delete</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsbulk-card { width: 480px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsbulk-toolbar { background: #eef0ff; border-radius: 8px; padding: 8px 10px; }
tr.bsbulk-archived td { opacity: .45; }
tr.bsbulk-row-selected { background: #f8f9fb; }`,
  js: `const selectAll = document.getElementById('bsbulkSelectAll');
const defaultHeader = document.getElementById('bsbulkDefaultHeader');
const toolbar = document.getElementById('bsbulkToolbar');
const countEl = document.getElementById('bsbulkCount');
const body = document.getElementById('bsbulkBody');
const modal = new bootstrap.Modal(document.getElementById('bsbulkModal'));
const modalBody = document.getElementById('bsbulkModalBody');

function rowChecks() {
  return Array.from(body.querySelectorAll('.bsbulk-row-check'));
}

function refresh() {
  const checks = rowChecks();
  const checked = checks.filter(c => c.checked);
  const n = checked.length;

  checks.forEach(c => c.closest('tr').classList.toggle('bsbulk-row-selected', c.checked));

  toolbar.classList.toggle('d-none', n === 0);
  defaultHeader.classList.toggle('d-none', n > 0);
  countEl.textContent = n + ' selected';

  selectAll.checked = n > 0 && n === checks.length;
  selectAll.indeterminate = n > 0 && n < checks.length;
}

selectAll.addEventListener('change', () => {
  rowChecks().forEach(c => { c.checked = selectAll.checked; });
  refresh();
});

body.addEventListener('change', e => {
  if (e.target.classList.contains('bsbulk-row-check')) refresh();
});

document.getElementById('bsbulkClear').addEventListener('click', () => {
  rowChecks().forEach(c => { c.checked = false; });
  refresh();
});

document.getElementById('bsbulkArchive').addEventListener('click', () => {
  rowChecks().filter(c => c.checked).forEach(c => {
    c.closest('tr').classList.add('bsbulk-archived');
    c.checked = false;
    c.disabled = true;
  });
  refresh();
});

document.getElementById('bsbulkDeleteBtn').addEventListener('click', () => {
  const n = rowChecks().filter(c => c.checked).length;
  modalBody.textContent = 'This removes ' + n + ' member' + (n === 1 ? '' : 's') + ' from the team. This can\\'t be undone.';
  modal.show();
});

document.getElementById('bsbulkDeleteConfirm').addEventListener('click', () => {
  rowChecks().filter(c => c.checked).forEach(c => c.closest('tr').remove());
  modal.hide();
  refresh();
});

refresh();`,

  seo: {
    title: 'Bootstrap Bulk Action Toolbar — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 table where selecting one or more rows swaps the header for a bulk-action toolbar — Archive, Delete (behind a confirmation modal), and Clear — that disappears the instant nothing is selected.',
    about: {
      title: 'Bootstrap Bulk Action Toolbar — HTML, CSS & JavaScript',
      description: `The core idea is that the toolbar and the default header are two mutually exclusive views of the same table state, not two independent pieces of UI that happen to swap — a single \`refresh()\` function reads how many \`.bsbulk-row-check\` boxes are checked and toggles both \`d-none\` classes from that one number, so the toolbar and the header can never both be visible (or both hidden) at once.\n\nThe header checkbox's tri-state behavior — checked, unchecked, or the visually distinct indeterminate dash — is recomputed the same way every time: \`selectAll.checked\` is true only when every row is checked, and \`selectAll.indeterminate\` is true only when some but not all are, both derived directly from the same \`checked\`/\`checks.length\` comparison rather than tracked as separate flags that could fall out of sync with the actual row state.\n\nDelete and Archive intentionally behave differently because they're different levels of destructive: Archive is reversible in spirit (rows fade and their checkboxes disable, standing in for "moved out of the active view"), so it runs immediately. Delete actually removes rows from the DOM, so it's gated behind a real confirmation modal whose body text is generated fresh from the current selection count — "This removes 3 members," not a generic message that doesn't reflect what's actually about to happen.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The table shows its normal "Team members" header with no toolbar visible.' },
        { title: 'Check one row\'s checkbox', text: 'The header instantly swaps for a bulk toolbar reading "1 selected" with Archive, Delete, and Clear actions.' },
        { title: 'Check a few more rows', text: 'The count updates live, and the header checkbox becomes a visually distinct indeterminate dash.' },
        { title: 'Check every remaining row', text: 'The header checkbox becomes fully checked instead of indeterminate.' },
        { title: 'Click "Delete"', text: 'A confirmation modal names exactly how many members will be removed before anything happens.' },
        { title: 'Click "Clear" instead', text: 'Every checkbox unchecks at once and the toolbar swaps back to the default header.' },
      ],
    },
    features: [
      'The toolbar and default header are two views of one refresh() computation, never independently toggled',
      'A genuine three-state header checkbox: unchecked, indeterminate, or fully checked, derived every time',
      'Archive applies instantly (a soft, reversible-feeling action); Delete is gated behind a real confirmation modal',
      'The confirmation modal\'s message is generated from the live selection count, not a static string',
      'Selected rows get a visible background highlight in addition to their checked checkbox',
      'Clearing selection and deleting rows both funnel back through the same refresh() to stay in sync',
    ],
    useCases: [
      { icon: 'APP', title: 'Admin dashboards managing users, orders, or content', desc: 'Pairs directly with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/) or [bootstrap-table-row-selection](/ui-snippets/bootstrap-table-row-selection/) for a complete selectable, actionable table.' },
      { icon: 'DASH', title: 'Editing individual fields without leaving the table', desc: 'Combine with [bootstrap-inline-table-cell-editing](/ui-snippets/bootstrap-inline-table-cell-editing/) so a row can be edited cell-by-cell or acted on in bulk with the same table.' },
      { icon: 'FORM', title: 'Email or inbox-style list management', desc: 'The same appear-on-selection toolbar pattern applies directly to [bootstrap-email-inbox-layout](/ui-snippets/bootstrap-email-inbox-layout/)-style message lists.' },
      { icon: 'CART', title: 'Bulk inventory or catalog management', desc: 'Swap Archive/Delete for Publish/Unpublish or Update price for a product-catalog admin screen.' },
      { icon: 'LEARN', title: 'Learning derived-state UI patterns', desc: 'A clean example of computing every piece of visible state (toolbar visibility, checkbox tri-state, button availability) from one source of truth instead of toggling each independently.' },
    ],
    faqs: [
      { q: 'Why does Archive not use a confirmation modal but Delete does?', a: 'Archive is modeled as a soft, easily-reversible action (rows fade and stay visible, just inactive), while Delete permanently removes rows from the DOM — the difference in friction matches the difference in how hard each action is to undo.' },
      { q: 'What happens if I delete some rows while others are archived?', a: 'They\'re independent — an archived row can still be selected and deleted, since archiving only disables its checkbox after deselecting it, not the row itself.' },
      { q: 'How is the indeterminate checkbox state set?', a: 'The indeterminate property is a real DOM/IDL property (not an HTML attribute) set directly in JavaScript inside refresh() — it has no effect if set only as an HTML attribute, which is a common mistake when implementing this pattern from scratch.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track selected row IDs in a Set in component state, derive the toolbar visibility and header checkbox\'s checked/indeterminate props from that Set\'s size on every render, and bind the indeterminate property via a ref since it isn\'t a settable JSX/template attribute in any of the three.' },
      { q: 'Can I add more bulk actions?', a: 'Yes — add a new button next to Archive and Delete and wire it to rowChecks().filter(c => c.checked) the same way both existing actions read the current selection; no changes to refresh() are needed.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "N selected" count badge that also breaks down the selection by status (e.g. "2 active, 1 suspended"), or to add an "Undo" toast after Archive that restores the archived rows if clicked within a few seconds.`,
      prompt: `Build a Bootstrap 5.3 table with a bulk action toolbar, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with a header checkbox and one checkbox per row, plus a default header area (e.g. a title) shown when nothing is selected.
- When one or more row checkboxes are checked, hide the default header and show a bulk-action toolbar instead, showing a live "N selected" count and Archive, Delete, and Clear buttons. Hide the toolbar and restore the default header the instant the selection count returns to zero.
- The header checkbox must reflect three real states derived from the row checkboxes: unchecked when none are selected, the DOM indeterminate state when some but not all are selected, and fully checked when all are selected.
- "Clear" unchecks every row. "Archive" should visually mark selected rows as archived (e.g. faded, checkbox disabled) without removing them. "Delete" must open a confirmation modal stating exactly how many rows will be removed, and only remove them from the table after the user confirms.`,
    },
  },
};

export default bootstrapBulkActionToolbar;
