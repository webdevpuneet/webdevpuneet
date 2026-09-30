const bootstrapUndoActionToast = {
  id: 'bootstrap-undo-action-toast',
  title: 'Bootstrap Undo Action Toast',
  lastmod: '2026-09-11',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsundo-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Inbox</h6>
      <ul class="list-unstyled mb-0" id="bsundoList"></ul>
    </div>
  </div>

  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div class="toast align-items-center" id="bsundoToast" role="status">
      <div class="d-flex">
        <div class="toast-body" id="bsundoToastBody"></div>
        <button type="button" class="btn btn-sm btn-link text-decoration-none flex-shrink-0" id="bsundoBtn">Undo</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsundo-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsundo-item { display: flex; justify-content: space-between; align-items: center; padding: 8px 4px; font-size: 13.5px; border-bottom: 1px solid #f1f2f5; }
.bsundo-item:last-child { border-bottom: none; }
.bsundo-remove { border: none; background: none; color: #9ca3af; cursor: pointer; }
.bsundo-remove:hover { color: #dc3545; }`,
  js: `const MESSAGES = [
  'Q3 planning notes',
  'Invoice #4021 receipt',
  'Team offsite itinerary',
  'Design review feedback',
  'Weekly report draft',
];

const list = document.getElementById('bsundoList');
const toastEl = document.getElementById('bsundoToast');
const toastBody = document.getElementById('bsundoToastBody');
const toast = new bootstrap.Toast(toastEl, { autohide: true, delay: 4000 });

let items = MESSAGES.map((text, id) => ({ id, text }));
let lastRemoved = null;
let lastIndex = -1;

function render() {
  list.innerHTML = items.map(item =>
    '<li class="bsundo-item" data-id="' + item.id + '"><span>' + item.text +
    '</span><button type="button" class="bsundo-remove" data-id="' + item.id + '">&times;</button></li>'
  ).join('') || '<li class="bsundo-item text-muted">Inbox is empty.</li>';
}

list.addEventListener('click', e => {
  const btn = e.target.closest('.bsundo-remove');
  if (!btn) return;
  const id = Number(btn.dataset.id);
  lastIndex = items.findIndex(i => i.id === id);
  lastRemoved = items[lastIndex];
  items = items.filter(i => i.id !== id);
  render();

  toastBody.textContent = '"' + lastRemoved.text + '" deleted.';
  toast.show();
});

document.getElementById('bsundoBtn').addEventListener('click', () => {
  if (!lastRemoved) return;
  items.splice(Math.min(lastIndex, items.length), 0, lastRemoved);
  lastRemoved = null;
  render();
  toast.hide();
});

render();`,

  seo: {
    title: 'Bootstrap Undo Action Toast — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 toast that offers Undo right after deleting an item — restoring it to its original position in the list, not just the end, and correctly forgetting the undo once a new item is removed.',
    about: {
      title: 'Bootstrap Undo Action Toast — HTML, CSS & JavaScript',
      description: `Undo only feels trustworthy if the restored item lands back exactly where it was — this snippet records \`lastIndex\` (the removed item's position) alongside \`lastRemoved\` (the item itself) at the moment of deletion, and \`splice(lastIndex, 0, lastRemoved)\` re-inserts it at that same position rather than appending it to the end of the list, which would silently reorder the inbox every time Undo was used.\n\nOnly the single most recently deleted item is ever recoverable — removing a second item before undoing the first overwrites \`lastRemoved\`/\`lastIndex\` with the new deletion, matching how a real single-toast undo pattern behaves (and matching what the visible toast itself can honestly represent, since only one toast is showing a single "Undo" action at a time).\n\nThe toast uses Bootstrap's own \`Toast\` component with \`autohide: true\` — after 4 seconds with no action, it disappears on its own, and \`lastRemoved\` staying set past that point is deliberate: nothing in this snippet clears it on autohide, so a very fast click on a since-hidden toast's Undo button (impossible through the UI, but worth noting for anyone modifying this) would still work as expected. In a real implementation, the actual delete request to a server should be delayed until the toast's hide event fires with no undo, so a click on Undo can cancel the deletion before it's ever actually persisted.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Five inbox items show in a list, no toast visible.' },
        { title: 'Click the \\u00d7 next to the third item', text: 'It disappears from the list, and a toast appears at the bottom right naming it, with an Undo action.' },
        { title: 'Click "Undo"', text: 'The item reappears in the exact same position — third in the list, not appended to the end.' },
        { title: 'Delete an item and wait 4 seconds without clicking Undo', text: 'The toast automatically hides itself, and the deletion stands.' },
        { title: 'Delete two different items in a row', text: 'Only the second deletion remains undoable — the toast and Undo action always reflect the most recent removal.' },
      ],
    },
    features: [
      'A restored item returns to its original list position, not the end of the list',
      'Only the single most recent deletion is ever undoable, matching what one visible toast can represent',
      'Uses Bootstrap\'s real Toast component with genuine autohide timing, not a custom-built popup',
      'Undo hides the toast immediately once used, rather than waiting for the autohide timer',
      'A cleanly empty-state message when every item has been deleted',
    ],
    useCases: [
      { icon: 'FORM', title: 'Email, task, and note list management', desc: 'The standard "safety net" pattern for any destructive single-item action in a list-based UI.' },
      { icon: 'APP', title: 'Reorderable lists that also support removal', desc: 'Pair with [bootstrap-drag-to-reorder-list](/ui-snippets/bootstrap-drag-to-reorder-list/) so a user can undo an accidental delete the same list also supports reordering in.' },
      { icon: 'APP', title: 'Admin panels deleting records', desc: 'A lower-friction alternative to a confirmation modal for actions that are easy and cheap to reverse.' },
      { icon: 'DASH', title: 'Kanban boards and drag-organized lists', desc: 'Pairs naturally with [bootstrap-kanban-board-cards](/ui-snippets/bootstrap-kanban-board-cards/) for reversible card removal.' },
    ],
    faqs: [
      { q: 'What happens if I delete a second item before undoing the first?', a: 'The first deletion becomes permanently unrecoverable through this UI — lastRemoved and lastIndex are overwritten by the second deletion, and the toast (there\'s only ever one visible) now represents only the most recent removal.' },
      { q: 'Does the restored item always land in the same position?', a: 'Yes — splice(lastIndex, 0, lastRemoved) inserts it back at its original index, clamped to the current list length in case items were somehow shorter since (which can\'t happen in this demo, but is a reasonable defensive detail).' },
      { q: 'Should the delete actually happen immediately, or wait for the toast to expire?', a: 'This demo removes it from the visible list immediately for clarity; a production implementation typically delays the real destructive backend call until the toast\'s hide event fires with no Undo click, so an in-time Undo can cancel the action before anything is truly deleted.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the items array, lastRemoved, and lastIndex in component state, and drive Bootstrap\'s Toast through a ref-based instance or an equivalent framework toast/snackbar component using the same restore-at-index logic.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to support undoing a batch of several deletions at once (e.g. from bootstrap-bulk-action-toolbar) instead of only a single item, or to delay the real backend delete call until the toast's autohide fires with no Undo click, so an in-time Undo can cancel it before anything is actually persisted.`,
      prompt: `Build a Bootstrap 5.3 list with an undoable delete action via a toast, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 5 sample items, each with its own remove button.
- Clicking an item's remove button removes it from the list and shows a real Bootstrap toast (with autohide after a few seconds) naming the removed item, with an "Undo" action inside the toast.
- Clicking Undo must restore the item to its exact original position in the list (not append it to the end), and hide the toast immediately.
- Only the single most recently deleted item should ever be undoable — deleting a second item before undoing the first must make the first one permanently unrecoverable through the UI, with the toast and Undo action reflecting only the latest deletion.
- Show a clear empty-state message once every item has been removed.`,
    },
  },
};

export default bootstrapUndoActionToast;
