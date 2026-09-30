const bootstrapToastNotificationStack = {
  id: 'bootstrap-toast-notification-stack',
  title: 'Bootstrap Toast Notification Stack',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <div class="d-flex gap-2 justify-content-center flex-wrap">
    <button class="btn btn-success btn-sm" data-type="success">Trigger success</button>
    <button class="btn btn-danger btn-sm" data-type="danger">Trigger error</button>
    <button class="btn btn-secondary btn-sm" data-type="info">Trigger info</button>
  </div>
  <p class="text-muted small mt-3">Toasts stack, each auto-dismisses after 4s, or click × to close early.</p>
</div>

<div class="toast-container position-fixed bottom-0 end-0 p-3" id="bstoastContainer"></div>`,
  css: `.bstoast-item { min-width: 260px; }`,
  js: `const container = document.getElementById('bstoastContainer');

const MESSAGES = {
  success: { icon: '✓', bg: 'text-bg-success', text: 'Changes saved successfully.' },
  danger:  { icon: '✕', bg: 'text-bg-danger',  text: 'Something went wrong — try again.' },
  info:    { icon: 'i', bg: 'text-bg-secondary', text: 'A new version is available.' },
};

// Each click creates and mounts a brand-new toast element, then hands it to
// a fresh bootstrap.Toast instance — stacking is just normal DOM flow inside
// the fixed container, so any number can be visible/queued at once.
document.querySelectorAll('[data-type]').forEach(btn => {
  btn.addEventListener('click', () => {
    const cfg = MESSAGES[btn.dataset.type];
    const el = document.createElement('div');
    el.className = 'toast bstoast-item align-items-center border-0 ' + cfg.bg;
    el.setAttribute('role', 'alert');
    el.innerHTML =
      '<div class="d-flex">' +
      '<div class="toast-body"><strong>' + cfg.icon + '</strong>&nbsp; ' + cfg.text + '</div>' +
      '<button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>' +
      '</div>';
    container.appendChild(el);

    const toast = new bootstrap.Toast(el, { delay: 4000 });
    toast.show();
    // Bootstrap hides the element on timeout/dismiss but never removes it —
    // clean up the DOM once its own hide animation has actually finished.
    el.addEventListener('hidden.bs.toast', () => el.remove());
  });
});`,

  seo: {
    title: 'Bootstrap Toast Notification Stack — Free Snippet',
    description: 'Real Bootstrap 5.3 toasts that stack in the corner, auto-dismiss after 4 seconds, and clean themselves out of the DOM once their hide animation finishes.',
    about: {
      title: 'Bootstrap Toast Notification Stack — HTML, CSS & JavaScript',
      description: `Bootstrap's real Toast component only shows one static example in most demos — this snippet shows the pattern a real app actually needs: **creating a new toast on demand** and letting several stack in the corner at once. Each button click builds a fresh \`<div class="toast">\` element from a small message config, appends it into a \`.toast-container\`, and hands it to a new \`bootstrap.Toast\` instance with a 4-second \`delay\` — Bootstrap's own auto-dismiss timer, not a custom \`setTimeout\`.\n\nOne detail matters for anything beyond a single toast: **Bootstrap hides a toast on dismiss but never removes its element from the DOM.** Left unhandled, that would silently leave an invisible element behind after every notification. This snippet listens for Bootstrap's own \`hidden.bs.toast\` event — fired once the hide animation genuinely finishes — and removes the element then, so triggering dozens of toasts over a session never leaks stale nodes.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads three trigger buttons.' },
        { title: 'Click "Trigger success"', text: 'A real Bootstrap toast slides in at the bottom-right corner and auto-dismisses after 4 seconds.' },
        { title: 'Click multiple triggers quickly', text: 'Several toasts stack vertically in the corner, each running its own independent 4-second timer.' },
        { title: 'Dismiss one early', text: 'Click a toast\'s × button — it closes immediately rather than waiting for its timer.' },
        { title: 'Customize the message', text: 'Edit the MESSAGES object in the JS panel to change icons, colors, and text per type.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Toast component, using its own built-in auto-dismiss delay, not setTimeout',
      'Toasts are created fresh on each trigger and genuinely stack — any number can be visible at once',
      'Removes each toast\'s DOM element only after Bootstrap\'s own hidden.bs.toast event fires',
      'Three ready-made message types (success, danger, info) driven by one small config object',
      'Manual dismiss (×) and auto-dismiss both work correctly without any custom timer logic',
      'No memory leak from accumulating hidden-but-undeleted toast elements over a long session',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Save confirmations and background action feedback', desc: 'The standard place for "saved," "sent," or "uploaded" confirmations that shouldn\'t interrupt what the user is doing.' },
      { icon: 'LEARN', title: 'Learning to create Bootstrap components dynamically', desc: 'Most Bootstrap component demos show static markup — this is the pattern for genuinely creating and mounting instances at runtime.' },
      { icon: 'FLOW',  title: 'Error and status messaging in dashboards', desc: 'Pair with a real API call\'s success/error handlers to surface backend responses without a full-page alert.' },
      { icon: 'DASH',  title: 'Any app with background or async operations', desc: 'File uploads, autosave, sync status — anywhere a brief, non-blocking notification is the right amount of interruption.' },
    ],
    faqs: [
      { q: 'Is this real Bootstrap, or a custom notification system?', a: 'Real Bootstrap 5.3 — every toast is a genuine bootstrap.Toast instance using the actual component\'s show/hide/delay behavior, loaded from the real CDN.' },
      { q: 'Do the toasts clean up after themselves?', a: 'Yes — Bootstrap only hides a dismissed toast, it never removes the element. This snippet listens for the hidden.bs.toast event (fired once the hide animation completes) and removes the element then, so nothing accumulates in the DOM.' },
      { q: 'Can multiple toasts really be visible at the same time?', a: 'Yes — each click creates and mounts an entirely new toast element into the shared .toast-container, so triggering several in a row shows them all stacked, each running its own independent dismiss timer.' },
      { q: 'How do I change how long a toast stays visible?', a: 'Change the delay: 4000 value (in milliseconds) passed to new bootstrap.Toast(el, { delay: ... }).' },
      { q: 'Can I add a fourth notification type?', a: 'Yes — add a new key to the MESSAGES object with its own icon, Bootstrap background class (bg), and text, then trigger it from a button with the matching data-type attribute.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a progress-bar countdown inside each toast showing time remaining before auto-dismiss, or to limit the stack to a maximum of 3 visible toasts, queuing the rest. It's also a good exercise to ask the assistant to wire one of the trigger types to a real fetch() call's success/error branches.`,
      prompt: `Build a Bootstrap 5.3 stacking toast notification system, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A fixed-position Bootstrap toast-container in a screen corner, and at least three trigger buttons for different notification types (e.g. success, error, info), each with its own icon, background color, and message text driven by a small config object.
- Each button click must create a brand-new toast DOM element, append it to the container, and initialize it as a real bootstrap.Toast instance with a 4-second auto-dismiss delay — do not reuse or mutate a single static toast element.
- Multiple toasts triggered in quick succession must all be visible and stacked simultaneously, each running its own independent dismiss timer.
- After a toast is dismissed (either automatically or via its close button), remove its DOM element entirely once Bootstrap's own hidden.bs.toast event confirms the hide animation has finished — do not leave hidden toast elements accumulating in the DOM.`,
    },
  },
};

export default bootstrapToastNotificationStack;
