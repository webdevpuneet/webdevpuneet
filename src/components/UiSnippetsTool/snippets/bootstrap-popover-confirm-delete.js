const bootstrapPopoverConfirmDelete = {
  id: 'bootstrap-popover-confirm-delete',
  title: 'Bootstrap Popover Confirm Delete',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="list-group bspop-list" style="max-width:420px" id="bspopList">
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <span>Q3-financial-report.pdf</span>
      <button class="btn btn-sm btn-outline-danger bspop-trigger" type="button">Delete</button>
    </div>
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <span>brand-guidelines.sketch</span>
      <button class="btn btn-sm btn-outline-danger bspop-trigger" type="button">Delete</button>
    </div>
    <div class="list-group-item d-flex justify-content-between align-items-center">
      <span>onboarding-notes.docx</span>
      <button class="btn btn-sm btn-outline-danger bspop-trigger" type="button">Delete</button>
    </div>
  </div>
  <p class="text-muted small mt-3">Deleted: <strong id="bspopDeleted">none</strong></p>
</div>`,
  css: `.bspop-popover .popover-body { padding: 10px 12px; }
.bspop-popover .btn { font-size: 12px; padding: 3px 10px; }`,
  js: `let pending = null;

// Bootstrap's popover sanitizes its HTML content by default, and <button>
// is not in that default allowlist — left as-is, both buttons below would
// be silently stripped before the popover ever renders them. Extending the
// allowList (not disabling sanitize) is the documented, still-safe way to
// permit the one extra tag this content actually needs.
const allowList = { ...bootstrap.Popover.Default.allowList, button: ['type', 'class'] };

// One popover instance per trigger, built with a custom HTML body (two real
// buttons) rather than Bootstrap's plain-text default — the standard
// "are you sure?" inline-confirm pattern, with no modal and no page reload.
document.querySelectorAll('.bspop-trigger').forEach(btn => {
  const row = btn.closest('.list-group-item');
  const name = row.querySelector('span').textContent;

  const popover = new bootstrap.Popover(btn, {
    html: true,
    trigger: 'manual',
    placement: 'top',
    customClass: 'bspop-popover',
    allowList,
    content: '<div class="d-flex flex-column gap-2">' +
      '<div>Delete <strong>' + name + '</strong>?</div>' +
      '<div class="d-flex gap-2">' +
      '<button type="button" class="btn btn-danger bspop-confirm">Delete</button>' +
      '<button type="button" class="btn btn-light bspop-cancel">Cancel</button>' +
      '</div></div>',
  });

  btn.addEventListener('click', () => {
    if (pending && pending !== popover) pending.hide();
    popover.toggle();
    pending = popover;
  });

  btn.addEventListener('shown.bs.popover', () => {
    const tip = document.querySelector('.popover.show .bspop-confirm, .popover.show .bspop-cancel')?.closest('.popover');
    if (!tip) return;
    tip.querySelector('.bspop-confirm').addEventListener('click', () => {
      document.getElementById('bspopDeleted').textContent = name;
      row.remove();
      popover.hide();
    });
    tip.querySelector('.bspop-cancel').addEventListener('click', () => popover.hide());
  });
});

// Clicking anywhere outside a trigger or its popover closes it.
document.addEventListener('click', e => {
  if (!pending) return;
  const tipEl = document.querySelector('.popover.show');
  if (tipEl && (tipEl.contains(e.target))) return;
  if (e.target.closest('.bspop-trigger')) return;
  pending.hide();
  pending = null;
});`,

  seo: {
    title: 'Bootstrap Popover Confirm Delete — Free Snippet',
    description: 'A real Bootstrap 5.3 popover with custom HTML content used as an inline delete confirmation — no modal, no page reload, dismissed by confirming, cancelling, or clicking away.',
    about: {
      title: 'Bootstrap Popover Confirm Delete — HTML, CSS & JavaScript',
      description: `A confirmation modal is overkill for deleting one row from a list — it dims the whole page for a single yes/no decision. This snippet uses **real Bootstrap 5.3**'s Popover component instead, configured with \`html: true\` and a custom \`content\` string containing two real buttons (Delete, Cancel), so the confirmation appears right next to the action that triggered it rather than taking over the screen.\n\n**The one non-obvious step: extending the allowList**\n\nBootstrap's popover sanitizes any HTML content it's given by default, checked against an internal allowlist of permitted tags and attributes — and \`<button>\` is not on that default list. Passed as-is, both the Delete and Cancel buttons in the content string above would be **silently stripped** before the popover ever rendered, leaving an empty confirmation with nothing to click. The fix is \`allowList: { ...bootstrap.Popover.Default.allowList, button: ['type', 'class'] }\` — spreading Bootstrap's own default list and adding one explicit entry for the tag this content actually needs, rather than disabling sanitization outright (which would also drop the XSS protection sanitize:true exists for).\n\nEach trigger gets its own \`bootstrap.Popover\` instance created with \`trigger: 'manual'\`, meaning the popover only opens or closes when JavaScript explicitly calls \`.toggle()\`/\`.hide()\` — Bootstrap's default hover/click auto-triggering wouldn't leave room for the Delete/Cancel buttons inside the popover to be clicked before it closed. A page-level click listener also closes whichever popover is open if a visitor clicks anywhere outside it, and only one popover is ever open at a time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a 3-item file list.' },
        { title: 'Click "Delete" on any row', text: 'A real Bootstrap popover opens above the button with a confirm message and two buttons.' },
        { title: 'Click "Cancel"', text: 'The popover closes and the row is untouched.' },
        { title: 'Click "Delete" again, then confirm', text: 'Click the row\'s Delete button, then the popover\'s red "Delete" — the row is removed and the "Deleted" readout updates.' },
        { title: 'Try opening a popover then clicking elsewhere', text: 'Open one, then click blank space on the page — it closes without deleting anything.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Popover component with custom HTML content, not the plain-text default',
      'Manual trigger mode — the popover opens/closes only via explicit JS calls, so its own buttons stay clickable',
      'Only one popover open at a time; opening a new one closes any other',
      'Clicking outside the open popover or its trigger closes it, same as a native dropdown',
      'Confirm and Cancel are real buttons wired to real handlers, not decorative text',
      'No modal, no backdrop, no full-screen dim — the confirmation stays anchored to its trigger',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Deleting rows from a list or table', desc: 'An inline popover confirmation is lighter-weight than a modal for single-item deletions in a list, table, or file browser.' },
      { icon: 'LEARN', title: 'Learning manual-trigger Popovers', desc: 'A concrete example of trigger: "manual" mode, needed anytime a popover\'s own content must remain interactive.' },
      { icon: 'FLOW',  title: 'Any low-stakes destructive action', desc: 'Reuse this pattern for "remove," "unfollow," or "archive" actions where a full modal would be excessive friction.' },
      { icon: 'DASH',  title: 'Admin panels and file managers', desc: 'A natural fit alongside the Bootstrap Admin Dashboard snippet\'s data rows for quick, in-place row actions.' },
    ],
    faqs: [
      { q: 'Is this Bootstrap\'s real Popover, or a custom-built tooltip?', a: 'Real Bootstrap 5.3 — it\'s the actual Popover component (new bootstrap.Popover(el, options)) with html: true and a custom content string, loaded from the genuine Bootstrap CDN.' },
      { q: 'Why is the popover set to trigger: "manual"?', a: 'Bootstrap\'s default click/hover triggers would close the popover as soon as the pointer moved to click one of its own Confirm/Cancel buttons. Manual mode means only explicit .toggle()/.hide() calls open or close it, so its interactive content stays usable.' },
      { q: 'Why does the popover need a custom allowList?', a: 'Bootstrap sanitizes any HTML passed to a popover by default, checked against an internal allowlist of tags and attributes — and <button> isn\'t on that default list. Without extending it, both the Delete and Cancel buttons in the content string would be silently stripped before the popover ever renders, leaving an empty confirmation. Spreading bootstrap.Popover.Default.allowList and adding a button entry fixes this while keeping sanitization\'s XSS protection intact for everything else.' },
      { q: 'Does deleting a row actually delete anything?', a: 'It removes the row from the DOM in this front-end demo. Wire the confirm handler\'s click listener to a real DELETE API call before removing the row for actual persistence.' },
      { q: 'Can two popovers be open at once?', a: 'No — clicking a new trigger explicitly hides any other currently-open popover first, so there\'s never more than one confirmation visible at a time.' },
      { q: 'What closes the popover without deleting anything?', a: 'Clicking its Cancel button, or clicking anywhere outside both the trigger and the open popover itself — a document-level click listener handles the outside-click case.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a loading state on the confirm button while a real delete API call is in flight, or to add an Escape-key handler that closes the open popover. It's also a good exercise to ask the assistant to generalize this into a reusable confirmPopover(triggerEl, { message, onConfirm }) helper function usable on any element.`,
      prompt: `Build a Bootstrap 5.3 inline delete-confirmation popover, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A list of at least three items, each with a "Delete" button.
- Clicking a Delete button opens a real Bootstrap Popover (new bootstrap.Popover with html: true and trigger: "manual") positioned above the button, containing custom HTML content: a confirmation message naming that specific item, and two real buttons — a red "Delete" and a "Cancel".
- Clicking the popover's own Delete button must remove that item's row from the list and close the popover; clicking Cancel must close the popover without removing anything.
- Only one popover should ever be open at a time — opening a new one must close any other that's currently open.
- Clicking anywhere outside the open popover and its trigger button must also close it, without deleting anything.`,
    },
  },
};

export default bootstrapPopoverConfirmDelete;
