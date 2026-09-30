const bootstrapTypeConfirmDeleteModal = {
  id: 'bootstrap-type-confirm-delete-modal',
  title: 'Bootstrap Type-to-Confirm Delete Modal',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <button class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#bsdelModal">Delete project</button>
  <p class="small text-muted mt-3" id="bsdelResult"></p>
</div>

<div class="modal fade" id="bsdelModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h5 class="modal-title text-danger fw-bold">Delete "Northwind Marketing"?</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <p class="small text-muted">This permanently deletes the project, its 48 files, and cannot be undone.</p>
        <label class="form-label small">Type <strong>delete northwind-marketing</strong> to confirm.</label>
        <input type="text" class="form-control" id="bsdelInput" autocomplete="off">
      </div>
      <div class="modal-footer border-0">
        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger" id="bsdelConfirm" disabled>Delete project</button>
      </div>
    </div>
  </div>
</div>`,
  css: `#bsdelInput.is-valid { border-color: #16a34a; }`,
  js: `const PHRASE = 'delete northwind-marketing';
const modalEl = document.getElementById('bsdelModal');
const input = document.getElementById('bsdelInput');
const confirmBtn = document.getElementById('bsdelConfirm');
const result = document.getElementById('bsdelResult');

input.addEventListener('input', () => {
  const match = input.value.trim() === PHRASE;
  confirmBtn.disabled = !match;
  input.classList.toggle('is-valid', match);
});

confirmBtn.addEventListener('click', () => {
  result.textContent = 'Project "Northwind Marketing" was deleted.';
  bootstrap.Modal.getInstance(modalEl).hide();
});

// Every reopen starts from a clean, disabled state — a stale typed phrase
// from a previous open must never leave the confirm button pre-enabled.
modalEl.addEventListener('hidden.bs.modal', () => {
  input.value = '';
  input.classList.remove('is-valid');
  confirmBtn.disabled = true;
});`,

  seo: {
    title: 'Bootstrap Type-to-Confirm Delete Modal — Free Snippet',
    description: 'A real Bootstrap 5.3 modal that only enables its Delete button once you\'ve typed the exact confirmation phrase — the pattern GitHub and similar tools use for irreversible actions.',
    about: {
      title: 'Bootstrap Type-to-Confirm Delete Modal — HTML, CSS & JavaScript',
      description: `A plain "Are you sure?" confirm dialog is easy to click through on autopilot. This snippet uses the stronger pattern real production tools reach for on genuinely irreversible actions: the Delete button inside a **real Bootstrap 5.3** modal stays \`disabled\` until the visitor types an **exact phrase** — here, \`delete northwind-marketing\` — matched with a plain string comparison on every keystroke.\n\nThe input also gets Bootstrap's real \`is-valid\` styling the instant the phrase matches exactly, giving immediate positive feedback rather than leaving the visitor to guess whether they've typed it correctly. On close — whether by cancelling, confirming, or the backdrop — Bootstrap's own \`hidden.bs.modal\` event resets the input and re-disables the button, so a stale typed phrase from a previous open can never leave the button pre-enabled the next time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a "Delete project" button.' },
        { title: 'Open the modal', text: 'Click it — a real Bootstrap modal opens with a disabled red Delete button.' },
        { title: 'Type an incomplete or wrong phrase', text: 'The Delete button stays disabled no matter what\'s typed, until it matches exactly.' },
        { title: 'Type the exact phrase shown', text: '"delete northwind-marketing" — the input turns green and the Delete button enables.' },
        { title: 'Click Delete', text: 'The modal closes and a confirmation message appears below the original button.' },
        { title: 'Reopen the modal', text: 'The input is empty and the button disabled again — nothing carries over from the previous attempt.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 modal component, loaded from the actual CDN',
      'Delete button stays genuinely disabled until an exact phrase match, not just a non-empty check',
      'Live input validation with Bootstrap\'s real is-valid state on an exact match',
      'Closes via Bootstrap\'s documented Modal API (getInstance().hide()), not manual class toggling',
      'Fully resets on every close via Bootstrap\'s hidden.bs.modal event — no stale state on reopen',
      'The same, stronger pattern production tools like GitHub use for irreversible actions',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Deleting a project, repository, or account', desc: 'Type-to-confirm is the appropriate friction level for an action that destroys real data with no undo.' },
      { icon: 'APP', title: 'A lighter-friction alternative for lower-stakes deletes', desc: 'See [bootstrap-hold-to-confirm-delete-button](/ui-snippets/bootstrap-hold-to-confirm-delete-button/) for a press-and-hold pattern when typing a confirmation phrase feels heavier than the action warrants.' },
      { icon: 'LEARN', title: 'Learning exact-match input validation', desc: 'A clean example of gating an action behind a precise string comparison rather than a checkbox or a simple non-empty check.' },
      { icon: 'ACCESS', title: 'Preventing accidental destructive clicks', desc: 'Typing a specific phrase forces genuine intent in a way a single confirm click cannot, reducing costly mistakes.' },
      { icon: 'DASH',  title: 'Admin panels with high-stakes bulk actions', desc: 'Reuse this pattern for "delete all users," "reset production database," or any admin action with serious consequences.' },
    ],
    faqs: [
      { q: 'Is the confirm button genuinely disabled, not just styled that way?', a: 'Genuinely — its disabled property is set based on an exact string match, so it\'s functionally unclickable and correctly skipped in tab order until the phrase matches exactly.' },
      { q: 'What counts as a match — is it case-sensitive?', a: 'Yes, this demo does a plain, case-sensitive trimmed comparison against the exact phrase. Add .toLowerCase() to both sides of the comparison if you want it case-insensitive.' },
      { q: 'Does the project actually get deleted?', a: 'No — this is a front-end demo showing a confirmation message. Wire the confirm button\'s click handler to a real DELETE API call before hiding the modal.' },
      { q: 'What happens if I close the modal without confirming and reopen it?', a: 'Bootstrap\'s hidden.bs.modal event clears the input and re-disables the button on every close, so reopening always starts from a clean, unconfirmed state.' },
      { q: 'Can the confirmation phrase include the actual resource name dynamically?', a: 'Yes — build the PHRASE string from a real project/resource name variable instead of a hardcoded string, and update the visible instruction text to match.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire the confirm button to a real delete API call with a loading state and error handling, or to make the confirmation phrase dynamic based on a real resource name passed into the component. It's also a good exercise to ask the assistant to add a brief countdown (e.g. "wait 3 seconds") before the button becomes clickable, even after the phrase matches, as extra friction for the most destructive actions.`,
      prompt: `Build a Bootstrap 5.3 type-to-confirm delete modal, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap modal (opened via data-bs-toggle="modal") warning about an irreversible delete action, with a text input and instructions telling the user to type an exact confirmation phrase.
- A Delete button that starts disabled and only becomes enabled once the input's value exactly matches the required phrase (checked live on every keystroke, not just on a separate confirm click) — apply Bootstrap's is-valid styling to the input once it matches.
- Clicking the enabled Delete button must close the modal using Bootstrap's documented JavaScript API (bootstrap.Modal.getInstance(element).hide()), not manual class or attribute manipulation, and show a confirmation message outside the modal.
- The modal must fully reset — clearing the input and re-disabling the Delete button — every time it's closed, using Bootstrap's own hidden.bs.modal event, so a previously typed phrase can never leave the button pre-enabled on the next open.`,
    },
  },
};

export default bootstrapTypeConfirmDeleteModal;
