const bootstrapAlertDismissibleStack = {
  id: 'bootstrap-alert-dismissible-stack',
  title: 'Bootstrap Dismissible Alert Stack',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5" style="max-width:520px">
  <div id="bsalertStack">
    <div class="alert alert-warning alert-dismissible fade show" role="alert">
      Your trial ends in 3 days. <a href="javascript:void(0)" class="alert-link">Upgrade now</a>.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="alert alert-info alert-dismissible fade show" role="alert">
      New dashboard layout is available in Settings.
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  </div>
  <p class="text-muted small mt-2">Open: <strong id="bsalertCount">2</strong></p>
</div>`,
  css: `#bsalertStack .alert:last-child { margin-bottom: 0; }`,
  js: `const stack = document.getElementById('bsalertStack');
const countEl = document.getElementById('bsalertCount');

function recount() {
  countEl.textContent = stack.querySelectorAll('.alert').length;
}

// Bootstrap's own Alert component removes the element from the DOM once its
// fade-out finishes, firing closed.bs.alert — but that event does not bubble
// up to a parent container the way native DOM events do, so the listener has
// to sit on each individual alert rather than once on the shared wrapper.
stack.querySelectorAll('.alert').forEach(alert => alert.addEventListener('closed.bs.alert', recount));
recount();`,

  seo: {
    title: 'Bootstrap Dismissible Alert Stack — Free Snippet',
    description: 'Real Bootstrap 5.3 dismissible alerts that fade out and remove themselves via Bootstrap\'s own Alert component, with a live count of how many remain open.',
    about: {
      title: 'Bootstrap Dismissible Alert Stack — HTML, CSS & JavaScript',
      description: `Bootstrap's dismissible alert (\`.alert-dismissible\` plus \`data-bs-dismiss="alert"\`) already does the hard part on its own: clicking the × fades the alert out and **removes its element from the DOM entirely** once the animation finishes — no manual class toggling or \`element.remove()\` call required. This snippet shows that real, self-contained behavior with two stacked alerts, and adds one small piece of custom code: a live "Open: N" counter that stays accurate by listening for Bootstrap's own \`closed.bs.alert\` event, fired exactly when an alert has genuinely finished being removed.\n\n**The event doesn't bubble to a parent — attach it per alert**\n\nA natural first instinct is to attach one \`closed.bs.alert\` listener to the shared wrapper around all the alerts, expecting it to catch the event from whichever child dismisses, the way a native \`click\` would bubble. Bootstrap's alert event **does not bubble** that way — it fires only on the specific \`.alert\` element being removed. The listener has to be attached to each alert individually (\`stack.querySelectorAll('.alert').forEach(...)\`), which is also why a *newly added* alert needs its own listener attached explicitly rather than being caught automatically by a parent-level one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads two dismissible alerts and "Open: 2".' },
        { title: 'Dismiss one', text: 'Click its × — Bootstrap fades it out and removes it from the DOM, and the count updates to 1.' },
        { title: 'Dismiss the other', text: 'The count updates to 0, with no alerts left in the stack.' },
        { title: 'Add a third alert', text: 'Copy one .alert block in the HTML panel with a different alert-<color> class — it participates in the count automatically.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 dismissible Alert component — no custom dismiss logic needed',
      'Bootstrap removes each alert\'s DOM element itself once its fade-out finishes',
      'Live open-alert counter driven by Bootstrap\'s own closed.bs.alert event',
      'Works with any number of stacked alerts — the counter re-queries the DOM, not a fixed number',
      'Alerts stack in normal document flow, no custom positioning needed',
      'Includes a linked call-to-action inside one alert (.alert-link) styled to match its context',
    ],
    useCases: [
      { icon: 'CODE',  title: 'Account and billing notices', desc: 'Trial-ending warnings, payment issues, or feature announcements that a user should see but can dismiss once acknowledged.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s self-cleaning Alert component', desc: 'A clear example that Bootstrap\'s dismissible alert needs no manual DOM removal — it already handles that itself.' },
      { icon: 'DASH',  title: 'Dashboard and admin panel system messages', desc: 'Stack multiple system notices at the top of a dashboard, each independently dismissible.' },
      { icon: 'FORM',  title: 'Form-level validation or status summaries', desc: 'Reuse the dismissible-alert pattern for a form\'s top-level success or error summary above its fields.' },
    ],
    faqs: [
      { q: 'Does clicking × actually remove the alert, or just hide it?', a: 'It genuinely removes the element from the DOM — that\'s Bootstrap\'s real Alert component behavior (data-bs-dismiss="alert"), not something this snippet implements manually.' },
      { q: 'How does the counter stay accurate?', a: 'It listens for Bootstrap\'s own closed.bs.alert event, which fires exactly when an alert has finished being removed, and re-queries how many .alert elements remain — so it\'s always reading the DOM\'s true current state, not tracking clicks separately. The listener is attached to each individual alert, not once on their shared wrapper, since this event does not bubble up to a parent element.' },
      { q: 'Can I add more alert types?', a: 'Yes — copy an existing alert block and change alert-warning or alert-info to any of Bootstrap\'s contextual classes (alert-success, alert-danger, etc.); it will be counted and dismissible automatically.' },
      { q: 'Can an alert auto-dismiss after a few seconds instead of requiring a click?', a: 'Yes — get the alert\'s bootstrap.Alert instance and call its .close() method inside a setTimeout; the same closed.bs.alert event fires either way, so the counter stays correct.' },
      { q: 'Is the dismiss button accessible?', a: 'Yes — it\'s a real button with aria-label="Close", and the alert itself carries role="alert" so its content is announced by screen readers when it appears.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add an auto-dismiss timer to the info alert (calling Bootstrap's own .close() method after a delay) while leaving the warning alert requiring a manual dismiss, or to persist dismissed alert IDs to localStorage so they stay hidden on a page reload. It's also a good exercise to ask the assistant to add a small slide-up animation as each alert leaves, layered on top of Bootstrap's own fade.`,
      prompt: `Build a stack of dismissible Bootstrap 5.3 alerts with a live open-count, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- At least two Bootstrap alerts (using different contextual color classes) with alert-dismissible and a real close button (data-bs-dismiss="alert") — rely entirely on Bootstrap's own Alert component for the fade-out and DOM removal; do not write custom JavaScript to remove the elements.
- A counter showing how many alerts are currently open, updated by listening for Bootstrap's own closed.bs.alert event (which fires once an alert has actually finished being removed) and re-querying the remaining alert count — not by manually decrementing a variable on click.
- The counter must work correctly regardless of the order alerts are dismissed in, and must reflect any number of alerts, not just the initial two.`,
    },
  },
};

export default bootstrapAlertDismissibleStack;
