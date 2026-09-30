const bootstrapVersionHistoryPanel = {
  id: 'bootstrap-version-history-panel',
  title: 'Bootstrap Version History Panel',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsver-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Version history</h6>
      <ul class="list-unstyled mb-0" id="bsverList"></ul>
    </div>
  </div>
</div>

<div class="modal fade" id="bsverModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Restore this version?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="mb-0" id="bsverModalBody"></p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-dark fw-bold" id="bsverConfirm">Restore</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsver-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsver-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #f1f2f5; font-size: 13px; }
.bsver-row:last-child { border-bottom: none; }
.bsver-current { color: #198754; font-weight: 700; }
.bsver-meta { color: #9ca3af; font-size: 11.5px; }`,
  js: `const VERSIONS = [
  { id: 5, author: 'Dana Reyes', time: 'Just now', summary: 'Fixed hero copy typo' },
  { id: 4, author: 'Marcus Lee', time: '2 hours ago', summary: 'Updated pricing table' },
  { id: 3, author: 'Sofia Chen', time: 'Yesterday', summary: 'Added testimonials section' },
  { id: 2, author: 'Dana Reyes', time: '3 days ago', summary: 'Rewrote intro paragraph' },
  { id: 1, author: 'Marcus Lee', time: '1 week ago', summary: 'Initial draft' },
];

const list = document.getElementById('bsverList');
const modal = new bootstrap.Modal(document.getElementById('bsverModal'));
const modalBody = document.getElementById('bsverModalBody');
const confirmBtn = document.getElementById('bsverConfirm');

let versions = VERSIONS.map(v => ({ ...v }));
let currentId = versions[0].id;
let pendingRestoreId = null;

function render() {
  list.innerHTML = versions.map(v => {
    const isCurrent = v.id === currentId;
    return '<li class="bsver-row" data-id="' + v.id + '">' +
      '<div>' +
        '<div class="' + (isCurrent ? 'bsver-current' : '') + '">v' + v.id + (isCurrent ? ' (current)' : '') + ' &mdash; ' + v.summary + '</div>' +
        '<div class="bsver-meta">' + v.author + ' &middot; ' + v.time + '</div>' +
      '</div>' +
      (isCurrent ? '' : '<button type="button" class="btn btn-sm btn-link p-0 bsver-restore" data-id="' + v.id + '">Restore</button>') +
    '</li>';
  }).join('');
}

list.addEventListener('click', e => {
  const btn = e.target.closest('.bsver-restore');
  if (!btn) return;
  pendingRestoreId = Number(btn.dataset.id);
  const v = versions.find(x => x.id === pendingRestoreId);
  modalBody.textContent = 'This replaces the current content with v' + v.id + ' ("' + v.summary + '"), authored by ' + v.author + '.';
  modal.show();
});

confirmBtn.addEventListener('click', () => {
  currentId = pendingRestoreId;
  render();
  modal.hide();
});

render();`,

  seo: {
    title: 'Bootstrap Version History Panel — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 version history list — the current version is clearly marked with no Restore button of its own, and restoring any other version asks for confirmation naming exactly what will change.',
    about: {
      title: 'Bootstrap Version History Panel — HTML, CSS & JavaScript',
      description: `The "current" state isn't a property baked into any one version — it's a single \`currentId\` variable compared against every version's \`id\` at render time, which is what makes restoring an older version as simple as reassigning \`currentId\` and re-rendering, with the "current" badge and the missing Restore button both automatically following that reassignment on whichever row now matches.\n\nThe current version deliberately has no Restore button of its own — \`isCurrent ? '' : '...button...'\` withholds it, since restoring the version you're already on is a meaningless action a real interface shouldn't offer at all, rather than offering it and having it silently do nothing.\n\nRestoring is a genuine two-step confirmation: clicking "Restore" on a row stores \`pendingRestoreId\` and opens a modal whose message is generated from that specific version's real summary and author, not a generic "are you sure?" — only clicking "Restore" inside the modal actually reassigns \`currentId\`. That separation matters because restoring an old version is inherently destructive to whatever's currently live, the same reasoning behind gating deletion behind a confirmation elsewhere in this collection.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Version 5 is marked "(current)" in green with no Restore button; every older version has one.' },
        { title: 'Click "Restore" on version 3', text: 'A modal opens naming exactly what v3 contains and who authored it, asking for confirmation.' },
        { title: 'Click "Restore" inside the modal', text: 'Version 3 becomes marked "(current)", and it now has no Restore button — the same logic that applied to v5 originally.' },
        { title: 'Click "Restore" on version 5 (the one that used to be current)', text: 'It works the same way — restoring is fully reversible in the sense that any version can become current again.' },
        { title: 'Open the restore confirmation and click "Cancel" instead', text: 'Nothing changes — the current version stays exactly as it was.' },
      ],
    },
    features: [
      '"Current" is a single comparison, not a flag stored on any individual version, so it can move freely between rows',
      'The current version never shows its own Restore button, since restoring onto itself would be meaningless',
      'Restoring requires a real confirmation naming the specific version\'s author and summary, not a generic warning',
      'Cancelling the confirmation leaves the current version completely unchanged',
      'Any version, including a previously-current one, can be restored back to at any time',
    ],
    useCases: [
      { icon: 'DEV', title: 'CMS and document editors with version tracking', desc: 'Pairs with [bootstrap-diff-viewer](/ui-snippets/bootstrap-diff-viewer/) to show exactly what changed between the current content and a version before restoring it.' },
      { icon: 'DASH', title: 'Configuration and settings history in admin tools', desc: 'Let an operator roll back a configuration change with a clear, specific confirmation of what they\'re restoring.' },
      { icon: 'APP', title: 'Design tools and collaborative editors', desc: 'A standard "restore this version" pattern for any collaboratively edited document or file.' },
    ],
    faqs: [
      { q: 'Can I restore a version that used to be current, back to being current again?', a: 'Yes — currentId is just a plain comparison value, not a one-way flag, so any version (including the one that was current before the last restore) can be restored to at any time.' },
      { q: 'What happens if I cancel the restore confirmation?', a: 'Nothing — currentId is only ever reassigned inside the modal\'s own Restore button handler, so dismissing or cancelling the modal leaves the current version completely untouched.' },
      { q: 'Why doesn\'t the current version have its own Restore button?', a: 'Restoring the version that\'s already current is a no-op that shouldn\'t be presented as an available action — omitting the button entirely is clearer than showing one that would do nothing.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the versions array and currentId in component state, derive each row\'s "current" and Restore-button-visibility from a comparison in the render function, and manage the confirmation modal\'s open state and pending version id the same way.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "Compare with current" action per version that opens a diff view before committing to a restore, or to add the ability to permanently delete an old version (with its own separate, stronger confirmation) rather than only ever restoring to it.`,
      prompt: `Build a Bootstrap 5.3 version history panel with restore confirmation, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 5 sample versions, each with an author, a relative timestamp, and a short summary of what changed.
- Track which version is "current" as a single comparable value (not a flag stored per version), and visually mark that one row as current — it must not show a Restore button, since restoring onto itself is meaningless.
- Every other version shows a "Restore" button that opens a real Bootstrap confirmation modal, whose message is generated dynamically from that specific version's own summary and author, not a generic warning.
- Only clicking "Restore" inside the confirmation modal should actually change which version is marked current; cancelling or dismissing the modal must leave the current version unchanged.
- Restoring an older version must correctly update the UI so it becomes the new "current" row (losing its Restore button), and the version that was previously current must gain a Restore button of its own.`,
    },
  },
};

export default bootstrapVersionHistoryPanel;
