const bootstrapNotificationCenterDropdown = {
  id: 'bootstrap-notification-center-dropdown',
  title: 'Bootstrap Notification Center Dropdown',
  lastmod: '2026-09-09',
  category: 'navigation',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <div class="dropdown">
    <button class="btn btn-light position-relative" data-bs-toggle="dropdown" data-bs-auto-close="outside" aria-expanded="false">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="badge rounded-pill bg-danger position-absolute top-0 start-100 translate-middle" id="bsnotifBadge">3</span>
    </button>
    <div class="dropdown-menu dropdown-menu-end bsnotif-panel p-0">
      <div class="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
        <strong class="small">Notifications</strong>
        <button class="btn btn-link btn-sm p-0" id="bsnotifReadAll">Mark all read</button>
      </div>
      <div id="bsnotifList">
        <a href="javascript:void(0)" class="dropdown-item bsnotif-item bsnotif-unread py-2">
          <div class="d-flex gap-2"><span class="bsnotif-dot"></span><div><div class="small">Sara commented on your PR</div><div class="text-muted" style="font-size:11px">2m ago</div></div></div>
        </a>
        <a href="javascript:void(0)" class="dropdown-item bsnotif-item bsnotif-unread py-2">
          <div class="d-flex gap-2"><span class="bsnotif-dot"></span><div><div class="small">Deploy to production succeeded</div><div class="text-muted" style="font-size:11px">1h ago</div></div></div>
        </a>
        <a href="javascript:void(0)" class="dropdown-item bsnotif-item bsnotif-unread py-2">
          <div class="d-flex gap-2"><span class="bsnotif-dot"></span><div><div class="small">Weekly report is ready</div><div class="text-muted" style="font-size:11px">3h ago</div></div></div>
        </a>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsnotif-panel { width: 300px; }
.bsnotif-dot { width: 8px; height: 8px; border-radius: 50%; background: #6366f1; margin-top: 5px; flex-shrink: 0; }
.bsnotif-item.bsnotif-unread { background: #f8f9ff; }
.bsnotif-item:not(.bsnotif-unread) .bsnotif-dot { background: transparent; }`,
  js: `const badge = document.getElementById('bsnotifBadge');
const list = document.getElementById('bsnotifList');
const readAllBtn = document.getElementById('bsnotifReadAll');

function updateBadge() {
  const unread = document.querySelectorAll('.bsnotif-unread').length;
  badge.textContent = unread;
  badge.style.display = unread > 0 ? '' : 'none';
}

// Clicking one notification marks only that one read. The dropdown stays
// open through that click because of the trigger's data-bs-auto-close="outside"
// attribute — Bootstrap's default (autoClose: true) closes on ANY click inside
// the menu too, not just outside it, which would dismiss the panel after the
// very first notification a visitor tried to read.
list.addEventListener('click', e => {
  const item = e.target.closest('.bsnotif-item');
  if (!item) return;
  item.classList.remove('bsnotif-unread');
  updateBadge();
});

readAllBtn.addEventListener('click', () => {
  document.querySelectorAll('.bsnotif-unread').forEach(item => item.classList.remove('bsnotif-unread'));
  updateBadge();
});

updateBadge();`,

  seo: {
    title: 'Bootstrap Notification Center Dropdown — Free Snippet',
    description: 'A real Bootstrap 5.3 dropdown notification center with a live unread badge that updates as individual notifications are read, or all at once.',
    about: {
      title: 'Bootstrap Notification Center Dropdown — HTML, CSS & JavaScript',
      description: `The badge count on this bell icon isn't a static "3" — it's derived live from how many \`.bsnotif-item\` elements currently carry the \`.bsnotif-unread\` class, recalculated by \`updateBadge()\` after every change and hidden entirely once it reaches zero, all inside **real Bootstrap 5.3**'s Dropdown component.\n\n**Keeping the menu open past the first click**\n\nBootstrap's Dropdown closes on any click by default — \`autoClose: true\` closes it both on an outside click *and* on a click anywhere inside the menu, including a notification item. Left as the default, marking one notification read would immediately dismiss the whole panel, making it impossible to read a second one without reopening it. The trigger button's \`data-bs-auto-close="outside"\` attribute changes that to Bootstrap's other documented mode: the menu now closes only on a genuine outside click, so clicking through several notifications in one open dropdown works as expected. A separate "Mark all read" control clears every unread notification in one action for the case where reading each individually isn't worth the effort.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a bell icon with a red "3" badge.' },
        { title: 'Open the dropdown', text: 'Click the bell — Bootstrap\'s real Dropdown component opens showing three unread (tinted) notifications.' },
        { title: 'Click one notification', text: 'It loses its unread tint and dot, the badge updates to "2", and the dropdown stays open.' },
        { title: 'Click "Mark all read"', text: 'Every remaining notification clears at once and the badge disappears entirely.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Dropdown component, loaded from the actual CDN',
      'Unread badge count is derived live from the DOM, not a hardcoded or separately tracked number',
      'Badge hides itself entirely once the unread count reaches zero',
      'Clicking one notification marks only that one read, without closing the dropdown',
      '"Mark all read" clears every unread notification in a single action',
      'Unread notifications get a distinct background tint and dot indicator',
    ],
    useCases: [
      { icon: 'CODE',  title: 'App and dashboard notification centers', desc: 'The standard bell-icon-with-badge pattern for surfacing recent activity without a dedicated notifications page.' },
      { icon: 'LEARN', title: 'Learning derived-state badge counts', desc: 'A clean example of computing a count from the current DOM state rather than incrementing/decrementing a separately tracked variable.' },
      { icon: 'DASH',  title: 'Admin panels and SaaS product headers', desc: 'Pair with the Bootstrap Admin Dashboard snippet\'s top bar for a complete notification experience.' },
      { icon: 'FLOW',  title: 'Any read/unread list pattern', desc: 'The mark-one vs. mark-all pattern generalizes to inboxes, task lists, or any other read-state-tracked list.' },
    ],
    faqs: [
      { q: 'Is this a real Bootstrap dropdown?', a: 'Yes — it uses Bootstrap 5.3\'s actual Dropdown component via data-bs-toggle="dropdown", loaded from the genuine CDN, for the open/close and outside-click behavior.' },
      { q: 'How does the badge count stay accurate?', a: 'updateBadge() re-counts how many elements currently carry the .bsnotif-unread class every time a notification is read (individually or via "mark all"), so the number always reflects the real current state rather than a separately maintained counter.' },
      { q: 'Why doesn\'t the dropdown close when I click a notification?', a: 'The trigger button carries data-bs-auto-close="outside", one of Bootstrap\'s built-in Dropdown options. Left at the default (autoClose: true), Bootstrap closes the menu on any click inside it too, which would dismiss the whole panel after marking just the first notification read — "outside" mode closes it only on a genuine click outside the menu instead.' },
      { q: 'What happens when all notifications are read?', a: 'The badge hides itself entirely (display: none) once the unread count reaches zero, rather than showing a "0" badge, which would be visual noise.' },
      { q: 'Can I add a new notification dynamically?', a: 'Yes — insert a new .dropdown-item.bsnotif-item.bsnotif-unread element into #bsnotifList and call updateBadge() afterward; both the click-to-read and mark-all-read handlers pick it up automatically since they query by class, not by a fixed list.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add real-time notifications via a WebSocket or polling connection that prepend new unread items to the list, or to add a "View all notifications" link at the bottom leading to a full notifications page. It's also a good exercise to ask the assistant to persist read state to localStorage so it survives a page reload.`,
      prompt: `Build a Bootstrap 5.3 notification center dropdown, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A bell icon button with an unread-count badge, using Bootstrap's real Dropdown component (data-bs-toggle="dropdown") to reveal a panel listing at least three notifications, each visually distinguished as unread (a background tint and a dot indicator) with a message and a relative timestamp.
- A "Mark all read" control inside the panel header.
- Clicking an individual notification must mark only that one as read (removing its unread styling) without closing the dropdown panel, so a visitor can read through several notifications in one open dropdown.
- The unread badge count must be recalculated live from how many notifications are currently marked unread (not a separately tracked counter), and the badge must hide itself entirely once the count reaches zero.`,
    },
  },
};

export default bootstrapNotificationCenterDropdown;
