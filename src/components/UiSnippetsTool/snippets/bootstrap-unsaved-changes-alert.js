const bootstrapUnsavedChangesAlert = {
  id: 'bootstrap-unsaved-changes-alert',
  title: 'Bootstrap Unsaved Changes Alert',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsuca-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h5 class="fw-bold mb-0">Profile settings</h5>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsucaLeave">&larr; Back to dashboard</button>
      </div>

      <div class="mb-3">
        <label class="form-label small fw-semibold">Display name</label>
        <input type="text" class="form-control" id="bsucaName" value="Priya Nair">
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold">Bio</label>
        <textarea class="form-control" id="bsucaBio" rows="3">Frontend engineer. Building small, fast things.</textarea>
      </div>

      <div class="d-flex align-items-center gap-2">
        <button type="button" class="btn btn-dark fw-bold" id="bsucaSave">Save changes</button>
        <span class="small" id="bsucaStatus">No changes yet</span>
      </div>
    </div>
  </div>
</div>

<div class="modal fade" id="bsucaModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Unsaved changes</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="mb-0">You've edited this form but haven't saved. Leaving now will discard those changes.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Keep editing</button>
        <button type="button" class="btn btn-outline-danger" id="bsucaDiscard">Discard &amp; leave</button>
        <button type="button" class="btn btn-dark fw-bold" id="bsucaSaveLeave">Save &amp; leave</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsuca-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsucaStatus.text-warning { color: #b45309 !important; }
#bsucaStatus.text-success { color: #198754 !important; }`,
  js: `const nameInput = document.getElementById('bsucaName');
const bioInput = document.getElementById('bsucaBio');
const saveBtn = document.getElementById('bsucaSave');
const leaveBtn = document.getElementById('bsucaLeave');
const status = document.getElementById('bsucaStatus');
const modalEl = document.getElementById('bsucaModal');
const modal = new bootstrap.Modal(modalEl);

let isDirty = false;
let savedName = nameInput.value;
let savedBio = bioInput.value;

function markDirty() {
  isDirty = true;
  status.textContent = 'Unsaved changes';
  status.className = 'small text-warning fw-semibold';
}

function save() {
  savedName = nameInput.value;
  savedBio = bioInput.value;
  isDirty = false;
  status.textContent = 'Saved';
  status.className = 'small text-success fw-semibold';
}

[nameInput, bioInput].forEach(el => el.addEventListener('input', markDirty));

saveBtn.addEventListener('click', save);

// The real, page-leaving protection: a native confirmation the browser itself
// shows when a tab is closed or a full navigation happens while isDirty is
// still true. It won't visibly fire inside this sandboxed preview, but this
// is the exact line a real page needs.
window.addEventListener('beforeunload', e => {
  if (!isDirty) return;
  e.preventDefault();
  e.returnValue = '';
});

// The in-page nav we can actually demo: clicking "Back to dashboard" is
// treated as a same-app navigation, so it goes through the modal instead of
// a full page load, and only when there is something to lose.
leaveBtn.addEventListener('click', () => {
  if (!isDirty) {
    status.textContent = 'Left the page';
    status.className = 'small text-muted';
    return;
  }
  modal.show();
});

document.getElementById('bsucaDiscard').addEventListener('click', () => {
  nameInput.value = savedName;
  bioInput.value = savedBio;
  isDirty = false;
  status.textContent = 'Left the page (changes discarded)';
  status.className = 'small text-muted';
  modal.hide();
});

document.getElementById('bsucaSaveLeave').addEventListener('click', () => {
  save();
  status.textContent = 'Saved, then left the page';
  status.className = 'small text-muted';
  modal.hide();
});`,

  seo: {
    title: 'Bootstrap Unsaved Changes Alert — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 form that tracks its own dirty state and warns with a modal — Keep editing, Discard & leave, or Save & leave — before an in-app navigation, plus a genuine beforeunload guard for real page exits.',
    about: {
      title: 'Bootstrap Unsaved Changes Alert — HTML, CSS & JavaScript',
      description: `Two separate things have to work for this pattern to be real rather than decorative: knowing the form is actually dirty, and knowing when the user is actually trying to leave. This snippet tracks the first with a single \`isDirty\` flag flipped by an \`input\` listener on every field, and it tracks the second two ways at once — a same-page click on "Back to dashboard" (interceptable, so it can show a real Bootstrap modal with three genuine choices) and a native \`beforeunload\` listener (for a real tab close or address-bar navigation, which no in-page modal can ever intercept).\n\nThe three modal buttons aren't decoration either — "Discard & leave" restores \`nameInput\`/\`bioInput\` to the last saved values before closing, "Save & leave" runs the exact same \`save()\` function the visible Save button uses, and "Keep editing" is just Bootstrap's own \`data-bs-dismiss\`. Because \`save()\` is the single function that updates the saved snapshot and clears \`isDirty\`, there's no separate "did the modal's save actually work" bookkeeping to keep in sync with the main form.\n\nThe \`beforeunload\` listener is guarded behind \`if (!isDirty) return\` specifically so it never fires for a clean form — a form that nags on every exit regardless of whether anything changed trains users to click through the browser's own dialog without reading it, which defeats the point of having one at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The status line reads "No changes yet" and the form is untouched.' },
        { title: 'Edit the name or bio field', text: 'The status flips to "Unsaved changes" the instant you type.' },
        { title: 'Click "Back to dashboard" while dirty', text: 'A modal appears offering to keep editing, discard, or save before leaving.' },
        { title: 'Click "Discard & leave"', text: 'Both fields revert to their last saved values and the modal closes.' },
        { title: 'Edit again, then click "Save changes"', text: 'The status turns green and reads "Saved" — the dirty flag clears.' },
        { title: 'Click "Back to dashboard" now', text: 'Nothing to lose, so it leaves immediately with no modal at all.' },
      ],
    },
    features: [
      'A single isDirty flag driven by real input events, not a guess',
      'A Bootstrap modal with three real outcomes: keep editing, discard, or save-then-leave',
      'Discard restores the exact last-saved values instead of just closing the modal',
      'A genuine window.beforeunload guard for real tab-close/navigation protection',
      'The nag never fires on a clean form — beforeunload is skipped entirely when nothing changed',
      'One save() function is the single source of truth for what "saved" means',
    ],
    useCases: [
      { icon: 'FORM', title: 'Settings and profile pages', desc: 'Anywhere a user edits a form across several fields before a deliberate Save, this prevents an accidental tab-close from losing the work.' },
      { icon: 'APP', title: 'Admin and CMS content editors', desc: 'Pairs naturally with something like [bootstrap-inline-form-editing](/ui-snippets/bootstrap-inline-form-editing/) wherever edits happen in place.' },
      { icon: 'CART', title: 'Multi-field checkout or order forms', desc: 'Warn a shopper before an accidental back-button tap wipes out a partially filled shipping form.' },
      { icon: 'LEARN', title: 'Learning the difference between in-app and browser-level navigation', desc: 'A compact, real example of why a page needs both an interceptable click handler and a beforeunload listener — one can never substitute for the other.' },
    ],
    faqs: [
      { q: 'Will the beforeunload dialog actually appear in this preview?', a: 'No — sandboxed iframes and most browsers suppress custom beforeunload dialogs outside of a real top-level page, and some browsers show only a generic built-in message regardless of e.returnValue. The listener itself is real and correct; only the in-page modal demo is fully visible here.' },
      { q: 'Why track isDirty with input events instead of comparing values on every check?', a: 'Both approaches work — this snippet uses a flag for simplicity, but comparing current values against the saved snapshot on demand is equally valid and avoids ever getting the flag out of sync, at the cost of a slightly more expensive check.' },
      { q: 'Can I use this with more than two fields?', a: 'Yes — add every field that should count as "dirty" to the array passed to forEach, and add its restore logic to Discard the same way nameInput and bioInput are handled.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, track isDirty and the saved snapshot in useState and open/close the modal via a ref to Bootstrap\'s Modal API or a controlled modal component; the beforeunload listener belongs in a useEffect that re-attaches whenever isDirty changes.' },
      { q: 'Should this replace real autosave?', a: 'No — they solve different problems and pair well together. See [bootstrap-form-autosave-status](/ui-snippets/bootstrap-form-autosave-status/) for a pattern that removes the need for this warning almost entirely by saving continuously instead of on a single explicit action.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to wire the same isDirty flag into a real client-side router's navigation guard (React Router's blocker, Vue Router's beforeRouteLeave, or Angular's CanDeactivate) instead of a single button click, so the warning covers every route change in a real single-page app.`,
      prompt: `Build a Bootstrap 5.3 form that warns before losing unsaved changes, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A card containing at least two form fields and a visible "Save changes" button.
- Track a single isDirty boolean, set true by an input listener on every field and cleared only when Save is explicitly clicked.
- A small status line reflecting the current state: "No changes yet", "Unsaved changes", or "Saved".
- A "Back to dashboard" button that, when isDirty is true, opens a Bootstrap modal with three real actions: keep editing (dismiss), discard changes and leave (restore the fields to their last saved values), and save then leave (run the same save logic as the Save button). When isDirty is false, clicking it should do nothing but immediately proceed.
- Also attach a window.beforeunload listener that calls preventDefault only when isDirty is true, for real browser-level protection against a tab close or address-bar navigation.`,
    },
  },
};

export default bootstrapUnsavedChangesAlert;
