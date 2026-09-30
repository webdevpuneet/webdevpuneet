const bootstrapSessionActivityTimeline = {
  id: 'bootstrap-session-activity-timeline',
  title: 'Bootstrap Session Activity Timeline',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bssat-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Active sessions</h6>
      <ul class="list-unstyled mb-0" id="bssatList"></ul>
    </div>
  </div>
</div>`,
  css: `.bssat-card { width: 400px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bssat-row { display: flex; gap: 10px; padding: 10px 0; border-bottom: 1px solid #f1f2f5; }
.bssat-row:last-child { border-bottom: none; }
.bssat-icon {
  width: 32px; height: 32px; border-radius: 8px; background: #eceef3;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 15px;
}
.bssat-meta { font: 700 10.5px ui-monospace, monospace; color: #9ca3af; }
.bssat-signout { border: none; background: none; color: #dc3545; font: 700 11.5px system-ui, sans-serif; cursor: pointer; }`,
  js: `const SESSIONS = [
  { device: 'MacBook Pro', icon: '\\u{1F4BB}', location: 'San Francisco, US', time: 'Active now', current: true },
  { device: 'iPhone 15', icon: '\\u{1F4F1}', location: 'San Francisco, US', time: '2 hours ago', current: false },
  { device: 'Windows PC', icon: '\\u{1F5A5}\\uFE0F', location: 'Austin, US', time: 'Yesterday', current: false },
  { device: 'iPad Air', icon: '\\u{1F4F1}', location: 'Chicago, US', time: '4 days ago', current: false },
];

const list = document.getElementById('bssatList');
let sessions = SESSIONS.map((s, id) => ({ ...s, id }));

function render() {
  list.innerHTML = sessions.map(s =>
    '<li class="bssat-row" data-id="' + s.id + '">' +
      '<div class="bssat-icon">' + s.icon + '</div>' +
      '<div class="flex-grow-1">' +
        '<div class="d-flex justify-content-between">' +
          '<strong class="small">' + s.device + (s.current ? ' <span class="badge text-bg-success ms-1">This device</span>' : '') + '</strong>' +
        '</div>' +
        '<div class="bssat-meta">' + s.location + ' &middot; ' + s.time + '</div>' +
      '</div>' +
      (s.current ? '' : '<button type="button" class="bssat-signout" data-id="' + s.id + '">Sign out</button>') +
    '</li>'
  ).join('');
}

list.addEventListener('click', e => {
  const btn = e.target.closest('.bssat-signout');
  if (!btn) return;
  sessions = sessions.filter(s => s.id !== Number(btn.dataset.id));
  render();
});

render();`,

  seo: {
    title: 'Bootstrap Session Activity Timeline — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 active-sessions list — device, location, and last-active time per session, a "This device" badge on the current one, and a working Sign out action on every other session.',
    about: {
      title: 'Bootstrap Session Activity Timeline — HTML, CSS & JavaScript',
      description: `This is a security-data-specific pattern, distinct from a decorative timeline component like [bootstrap-timeline-vertical](/ui-snippets/bootstrap-timeline-vertical/) — every row here carries real account-security fields (device, location, last-active time) and a genuine action (revoking a session), not just a chronological list of generic events.\n\nThe \`current: true\` flag on one session is what drives two related pieces of behavior at once: it adds the green "This device" badge, and it's checked inline (\`s.current ? '' : '...Sign out button...'\`) to withhold the Sign out button entirely from the current session — a real account-security page shouldn't let a user casually sign out of the very device they're using to view the list, since doing so from inside the app they're currently using would immediately invalidate the session rendering the button they just clicked.\n\nSigning out of another session calls \`sessions.filter(s => s.id !== ...)\` and re-renders — in this demo that's purely a local list update, but the shape of it (remove by id, re-render from the updated array) is exactly what wiring up a real revoke-session API call would look like, with the actual network request added right alongside the filter rather than replacing it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Four sessions list, the first (MacBook Pro) marked "This device" with no Sign out button.' },
        { title: 'Look at the current device\'s row', text: 'It has no Sign out action — only other sessions can be revoked from this view.' },
        { title: 'Click "Sign out" on the iPhone session', text: 'That row disappears from the list immediately.' },
        { title: 'Sign out of the remaining other sessions', text: 'Only the current device\'s session remains, with no Sign out button to click at all.' },
      ],
    },
    features: [
      'Real account-security fields per row (device, location, last-active time), not generic timeline entries',
      'A "This device" badge clearly distinguishes the session currently being used to view the list',
      'The current session deliberately has no Sign out button, preventing an accidental self-lockout',
      'Signing out of a session removes it immediately, re-rendering from a single updated source array',
      'Icons are chosen per device type for quick visual scanning of a session list',
    ],
    useCases: [
      { icon: 'APP', title: 'Account security and "manage your devices" settings pages', desc: 'Pairs with [bootstrap-reauthentication-modal](/ui-snippets/bootstrap-reauthentication-modal/) for a complete account-security section.' },
      { icon: 'DASH', title: 'Admin panels showing a user\'s login history for support purposes', desc: 'Let support staff see (and in a real app, help revoke) a customer\'s active sessions.' },
      { icon: 'FORM', title: 'Post-password-change device review', desc: 'A natural place to show this list right after a password reset, encouraging users to sign out of unrecognized devices.' },
    ],
    faqs: [
      { q: 'Why can\'t the current device be signed out from this list?', a: 'Because the list is being viewed from that exact session — revoking it would invalidate the page rendering the button mid-click. Signing out of the current device belongs in a dedicated, explicit "Log out" action elsewhere, not mixed into a list meant for reviewing other sessions.' },
      { q: 'Does signing out here actually invalidate a real session?', a: 'This demo only removes the row from a local array; a real implementation must call an actual backend endpoint to revoke that session\'s token, and should only remove the row from the UI once that request succeeds.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the sessions array in component state, mark the current session with the same current flag, and derive the Sign out button\'s visibility per row from that flag in your render function.' },
      { q: 'How would I add a "Sign out of all other devices" bulk action?', a: 'Add a button that filters sessions down to just the entry with current: true, calling your real revoke-session API for every other session id first — the same underlying pattern as the per-row action, applied to the whole list at once.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "Sign out of all other devices" bulk action above the list, or to flag a session as suspicious (e.g. an unfamiliar location) with a warning badge and a more prominent revoke call-to-action.`,
      prompt: `Build a Bootstrap 5.3 active-sessions/account-security list, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 4 sample sessions, each showing a device icon, device name, location, and a last-active time.
- Exactly one session is marked as the current device with a visible "This device" badge; that session must not show a Sign out button at all, since it represents the session currently viewing the page.
- Every other session shows a working "Sign out" button that removes it from the list immediately when clicked.
- Re-render the whole list from a single source array after any change, rather than manipulating individual DOM rows by hand.`,
    },
  },
};

export default bootstrapSessionActivityTimeline;
