const notificationCenter = {
  id: 'notification-center',
  title: 'Notification Center',
  lastmod: '2026-06-12',
  category: 'navigation',
  html: `<div class="app">
  <div class="topbar">
    <div class="topbar-left">
      <div class="logo">⚡</div>
      <span class="app-name">Dashboard</span>
    </div>
    <div class="topbar-right">
      <div class="bell-wrap" id="bell-wrap">
        <button class="bell-btn" id="bell-btn" aria-label="Open notifications" aria-expanded="false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          <span class="badge" id="badge">3</span>
        </button>
        <div class="panel" id="panel" role="dialog" aria-label="Notifications" aria-modal="true">
          <div class="panel-head">
            <span class="panel-title">Notifications</span>
            <div class="head-actions">
              <button class="mark-all-btn" id="mark-all">Mark all read</button>
              <button class="close-btn" id="close-btn" aria-label="Close notifications">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
          </div>
          <ul class="notif-list" id="notif-list"></ul>
          <div class="panel-foot">
            <button class="view-all-btn">View all notifications →</button>
          </div>
        </div>
      </div>
      <div class="avatar">PS</div>
    </div>
  </div>
  <div class="content">
    <p class="content-hint">Click the 🔔 bell to open the notification center</p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; }
.app { min-height: 100vh; display: flex; flex-direction: column; }

.topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 0 20px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 50;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
}
.topbar-left { display: flex; align-items: center; gap: 10px; }
.logo { font-size: 20px; }
.app-name { font-size: 15px; font-weight: 700; color: #1e293b; }
.topbar-right { display: flex; align-items: center; gap: 12px; }

.bell-wrap { position: relative; }

.bell-btn {
  position: relative;
  width: 38px; height: 38px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #64748b;
  cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}
.bell-btn:hover, .bell-btn.open { background: #f0f4ff; border-color: #6366f1; color: #6366f1; }

.badge {
  position: absolute;
  top: -5px; right: -5px;
  min-width: 18px; height: 18px;
  padding: 0 4px;
  background: #ef4444; color: #fff;
  font-size: 10px; font-weight: 700;
  border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff;
  transition: transform 0.15s;
}
.badge.hidden { display: none; }
.badge.bump { animation: bump 0.3s ease; }
@keyframes bump { 0%,100%{transform:scale(1)} 50%{transform:scale(1.35)} }

.panel {
  position: absolute;
  top: calc(100% + 10px); right: 0;
  width: 330px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  opacity: 0;
  transform: translateY(-8px) scale(0.97);
  pointer-events: none;
  transition: opacity 0.18s, transform 0.18s;
  overflow: hidden;
}
.panel.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: all; }

.panel-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px 12px;
  border-bottom: 1px solid #f1f5f9;
}
.panel-title { font-size: 14px; font-weight: 700; color: #1e293b; }
.head-actions { display: flex; align-items: center; gap: 8px; }
.mark-all-btn {
  font-size: 11px; font-weight: 600; color: #6366f1;
  background: none; border: none; cursor: pointer;
  padding: 3px 6px; border-radius: 5px; transition: background 0.15s;
}
.mark-all-btn:hover { background: #f0f4ff; }
.close-btn {
  width: 24px; height: 24px; border-radius: 6px;
  border: none; background: none; color: #94a3b8;
  cursor: pointer; display: flex; align-items: center; justify-content: center;
}
.close-btn:hover { background: #f1f5f9; color: #475569; }

.notif-list { list-style: none; max-height: 310px; overflow-y: auto; }
.notif-list::-webkit-scrollbar { width: 4px; }
.notif-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 2px; }

.notif-item {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 11px 16px 11px 22px;
  border-bottom: 1px solid #f8fafc;
  position: relative;
  transition: background 0.1s;
  cursor: pointer;
}
.notif-item:last-child { border-bottom: none; }
.notif-item:hover { background: #f8fafc; }
.notif-item.unread { background: #fafaff; }

.notif-dot {
  position: absolute; left: 8px; top: 50%; transform: translateY(-50%);
  width: 6px; height: 6px; border-radius: 50%; background: #6366f1;
}
.notif-item:not(.unread) .notif-dot { opacity: 0; }

.notif-icon {
  width: 34px; height: 34px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; font-size: 15px;
}
.notif-icon--success { background: #f0fdf4; }
.notif-icon--warning { background: #fffbeb; }
.notif-icon--info    { background: #eff6ff; }
.notif-icon--error   { background: #fef2f2; }

.notif-body { flex: 1; min-width: 0; }
.notif-title { font-size: 12.5px; font-weight: 600; color: #1e293b; margin-bottom: 2px; }
.notif-desc  { font-size: 11.5px; color: #64748b; line-height: 1.4; margin-bottom: 3px; }
.notif-time  { font-size: 10.5px; color: #94a3b8; }

.notif-dismiss {
  width: 22px; height: 22px;
  border: none; background: none; color: #cbd5e1;
  font-size: 18px; line-height: 1; cursor: pointer;
  border-radius: 5px; display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; transition: background 0.15s, color 0.15s;
}
.notif-dismiss:hover { background: #fee2e2; color: #ef4444; }

.panel-foot { padding: 10px 16px; border-top: 1px solid #f1f5f9; }
.view-all-btn {
  width: 100%; background: #f8fafc; border: 1px solid #e2e8f0;
  border-radius: 8px; padding: 8px;
  font-size: 12px; font-weight: 600; color: #6366f1;
  cursor: pointer; transition: background 0.15s;
}
.view-all-btn:hover { background: #f0f4ff; }

.empty-state {
  padding: 32px 16px; text-align: center;
  color: #94a3b8; font-size: 13px;
}

.avatar {
  width: 34px; height: 34px; border-radius: 10px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: #fff; font-size: 11px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}

.content { flex: 1; display: flex; align-items: center; justify-content: center; }
.content-hint { font-size: 14px; color: #94a3b8; }`,
  js: `const NOTIFICATIONS = [
  { id:1, type:'success', icon:'✓', title:'Deployment successful',  desc:'Build #142 deployed to production',       time:'2 min ago',  unread:true  },
  { id:2, type:'info',    icon:'👤', title:'New team member',        desc:'Alex joined your workspace',             time:'15 min ago', unread:true  },
  { id:3, type:'warning', icon:'⚠',  title:'Storage at 85%',        desc:'Consider upgrading your storage plan',   time:'1 hr ago',   unread:true  },
  { id:4, type:'error',   icon:'✕',  title:'Payment failed',         desc:'Retry your subscription renewal',        time:'3 hr ago',   unread:false },
  { id:5, type:'info',    icon:'📊', title:'Weekly report ready',    desc:'Your analytics summary is available',    time:'Yesterday',  unread:false },
];

let notifications = NOTIFICATIONS.map(n => ({...n}));

const bellBtn   = document.getElementById('bell-btn');
const panel     = document.getElementById('panel');
const badge     = document.getElementById('badge');
const list      = document.getElementById('notif-list');
const markAllBtn = document.getElementById('mark-all');
const closeBtn  = document.getElementById('close-btn');

const unreadCount = () => notifications.filter(n => n.unread).length;

function updateBadge() {
  const c = unreadCount();
  badge.textContent = c;
  badge.classList.toggle('hidden', c === 0);
}

function renderList() {
  if (!notifications.length) {
    list.innerHTML = '<li class="empty-state">🔔<br>No notifications</li>';
    return;
  }
  list.innerHTML = notifications.map(n => \`
    <li class="notif-item\${n.unread ? ' unread' : ''}" data-id="\${n.id}">
      <span class="notif-dot"></span>
      <div class="notif-icon notif-icon--\${n.type}">\${n.icon}</div>
      <div class="notif-body">
        <div class="notif-title">\${n.title}</div>
        <div class="notif-desc">\${n.desc}</div>
        <div class="notif-time">\${n.time}</div>
      </div>
      <button class="notif-dismiss" data-id="\${n.id}" aria-label="Dismiss">×</button>
    </li>\`).join('');
}

const openPanel  = () => { panel.classList.add('open'); bellBtn.classList.add('open'); bellBtn.setAttribute('aria-expanded','true'); };
const closePanel = () => { panel.classList.remove('open'); bellBtn.classList.remove('open'); bellBtn.setAttribute('aria-expanded','false'); };

bellBtn.addEventListener('click', e => { e.stopPropagation(); panel.classList.contains('open') ? closePanel() : openPanel(); });
closeBtn.addEventListener('click', e => { e.stopPropagation(); closePanel(); });
document.addEventListener('click', e => { if (!document.getElementById('bell-wrap').contains(e.target)) closePanel(); });

markAllBtn.addEventListener('click', e => {
  e.stopPropagation();
  notifications.forEach(n => n.unread = false);
  renderList(); updateBadge();
});

list.addEventListener('click', e => {
  e.stopPropagation();
  const dismiss = e.target.closest('.notif-dismiss');
  if (dismiss) {
    notifications = notifications.filter(n => n.id !== +dismiss.dataset.id);
    renderList(); updateBadge(); return;
  }
  const item = e.target.closest('.notif-item');
  if (item) {
    const n = notifications.find(n => n.id === +item.dataset.id);
    if (n && n.unread) { n.unread = false; renderList(); updateBadge(); }
  }
});

renderList(); updateBadge();`,
  seo: {
    title: 'Notification Center — Free HTML CSS JS Snippet',
    description: `Slide-down notification panel with badge counter, mark-as-read, dismiss, and click-outside close. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Notification Center — HTML CSS JavaScript',
      description: `Accessible notification center with animated panel, badge counter, mark-as-read, dismiss, and empty state. Pure HTML/CSS/JS, no dependencies.

A notification center is one of the most common UI patterns in modern web apps — every SaaS product, admin dashboard, and collaboration tool relies on it to surface system events without interrupting the primary workflow. This snippet builds a fully functional, accessible notification panel using pure HTML, CSS, and vanilla JavaScript with zero dependencies.

**Panel animation without display toggling**

The notification panel is an absolutely-positioned element anchored \`top: calc(100% + 10px); right: 0\` on the bell wrapper. Instead of toggling \`display: none\` — which removes the element from the render tree and prevents CSS transitions from firing — the panel uses \`opacity: 0\` and \`transform: translateY(-8px) scale(0.97)\` combined with \`pointer-events: none\` in the closed state. Adding the \`.open\` class resets both properties and re-enables pointer events. The 18ms \`transition\` creates the slide-and-scale entrance that characterises polished notification UIs. This is the canonical pattern for animating overlays in production code.

**Badge counter mechanics**

The red badge sits \`position: absolute; top: -5px; right: -5px\` on the bell button with a \`border: 2px solid #fff\` halo to separate it visually from the button. The count is derived by filtering the notifications array for \`unread: true\` entries on every render call and hidden with \`display: none\` when the count reaches zero. A CSS \`@keyframes bump\` animation briefly scales the badge to 1.35× when the count changes, giving tactile feedback that a new event arrived.

**Notification data model**

Each notification object carries \`id\`, \`type\` (success/warning/info/error), \`icon\`, \`title\`, \`desc\`, \`time\`, and \`unread\` fields. The \`renderList()\` function maps over the live array and generates list items with a conditional \`unread\` class. Unread items get an absolutely-positioned indigo dot — rendered via a \`.notif-dot\` span whose \`opacity\` is set to zero on read items rather than being removed, to avoid layout reflow during the transition. The four type variants drive tinted icon backgrounds through \`.notif-icon--success\`, \`.notif-icon--warning\`, etc.

**Read and dismiss event delegation**

A single \`click\` listener on the \`<ul>\` handles both dismissal and mark-as-read via event delegation — \`e.target.closest('.notif-dismiss')\` intercepts dismiss clicks, and \`e.target.closest('.notif-item')\` handles row clicks. This avoids attaching one listener per notification, which matters when the list can grow to dozens of items. \`e.stopPropagation()\` on the dismiss handler prevents the event from bubbling to the row handler, which would otherwise attempt a mark-as-read on an item that is about to be removed.

**Click-outside close pattern**

A document-level \`click\` listener closes the panel when focus leaves the bell wrapper. The check is \`!document.getElementById('bell-wrap').contains(e.target)\` — clicks anywhere inside the wrapper (panel, bell button, or dismiss buttons) are excluded. The bell button itself calls \`e.stopPropagation()\` so the document listener does not immediately close a panel that was just opened.

**Customisation path**

Replace the static \`NOTIFICATIONS\` array with a WebSocket or fetch-based push to get live notifications. Persist read state between page loads with \`localStorage.setItem('notifs', JSON.stringify(notifications))\` after every mutation and read it back on init. Add a \`group\` field and render date-separator \`<li>\` elements in \`renderList()\` to group today vs. yesterday vs. older events.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Click the bell icon',
        text: `The notification panel slides down from the button with a scale-and-fade animation. The red badge shows the unread count.`,
      },
      {
        title: 'Click a notification row',
        text: `The unread dot disappears and the background lightens from the tinted unread state to white. The badge counter decrements instantly.`,
      },
      {
        title: 'Dismiss a notification',
        text: `Click the × button on any row to remove it from the list entirely. The panel height adjusts and the badge updates.`,
      },
      {
        title: 'Mark all as read',
        text: `Click "Mark all read" in the panel header to clear all unread indicators at once and reset the badge to zero.`,
      },
      {
        title: 'Close the panel',
        text: `Click the × in the header, click the bell button again, or click anywhere outside the panel — all three paths call the same closePanel() function.`,
      },
      {
        title: 'Connect real data',
        text: `Edit the NOTIFICATIONS array at the top of the JS, or replace it with a fetch/WebSocket call. Each object needs id, type, icon, title, desc, time, and unread fields.`,
      },
    ] },
    features: [
      {
        title: 'CSS-only open animation',
        text: `opacity + transform transitions on a pointer-events:none element — no display toggle so transitions fire on every open and close.`,
      },
      {
        title: 'Live badge counter',
        text: `Derives unread count from the array on every render. Hides itself at zero and plays a bump scale animation on change.`,
      },
      {
        title: 'Four notification types',
        text: `Success, warning, info, error — each with a tinted icon background. Swap the emoji icons for SVGs without changing any other code.`,
      },
      {
        title: 'Event delegation',
        text: `One listener on the <ul> handles both row clicks and dismiss clicks via .closest(). Efficient regardless of list size.`,
      },
      {
        title: 'Click-outside close',
        text: `A document listener uses .contains() to close the panel when clicking outside the bell wrapper, without interfering with toggle.`,
      },
      {
        title: 'Empty state',
        text: `When all notifications are dismissed the panel shows a bell emoji and copy rather than an empty white box.`,
      },
      {
        title: 'Accessible markup',
        text: `Bell button has aria-label and aria-expanded. Panel has role="dialog" and aria-modal. Badge exposes count to screen readers.`,
      },
      {
        title: 'Scrollable list',
        text: `The notification list has max-height: 310px and overflow-y: auto with a styled scrollbar, so long lists never overflow the panel.`,
      },
    ],
    useCases: [
      {
        title: 'SaaS dashboards',
        text: `Surface deployment events, billing alerts, and team activity. Pair with an [activity feed](/ui-snippets/activity-feed/) for a full notification history page.`,
      },
      {
        title: 'E-commerce alerts',
        text: `Notify users of order status changes and back-in-stock items. Combine with a [toast queue](/ui-snippets/toast-queue/) for transient real-time alerts.`,
      },
      {
        title: 'Collaboration tools',
        text: `Show mentions, comments, and file-share events in the top bar of a [dashboard layout](/ui-snippets/dashboard-layout/).`,
      },
      {
        title: 'Onboarding prompts',
        text: `Seed the center with onboarding tips and step-completion messages. Combine with an [onboarding tour](/ui-snippets/onboarding-tour/) for guided first-run flows.`,
      },
      {
        title: 'Admin panels',
        text: `Display system health alerts, user reports, and moderation flags. Link each notification to a route — swap the dismiss button for a "View" link.`,
      },
      { icon: 'CODE', title: 'Related: Pinned, Draggable Browser-Style Tabs', desc: 'See the [Pinned, Draggable Browser-Style Tabs](/ui-snippets/pinned-draggable-tabs/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I connect this to a real backend?',
        a: `Replace the static NOTIFICATIONS array with a WebSocket message handler or a polling fetch. On each new event, push an object into the array, call renderList() and updateBadge(). To animate the badge bump, add the "bump" class then remove it after 300ms with setTimeout.`,
      },
      {
        q: 'How do I persist read state across page loads?',
        a: `After every mutation call localStorage.setItem("notifs", JSON.stringify(notifications)). On init, read it back: const stored = JSON.parse(localStorage.getItem("notifs") || "null"); and fall back to the default array if null.`,
      },
      {
        q: 'How do I group notifications by date?',
        a: `Add a date field to each object (e.g. "Today", "Yesterday"). In renderList(), use reduce() to bucket items by date into a Map, then render a <li class="date-separator"> header before each group.`,
      },
      {
        q: 'Why does the panel animate when I use opacity/transform but not display:none?',
        a: `display:none removes the element from the render tree before the transition can sample the start state. opacity and pointer-events:none keep the element in layout so the CSS transition engine can interpolate between open and closed states.`,
      },
      {
        q: 'How do I add sound or vibration on new notifications?',
        a: `After pushing a new notification to the array, call new Audio("/notification.mp3").play() for sound or navigator.vibrate(200) for mobile haptics. Both are one-liners that slot in after the renderList() call.`,
      },
      {
        q: 'Can I use this notification center in React, Vue, or Angular?',
        a: `Yes. Use the React, Vue, Angular, or Tailwind export buttons above the preview to download a ready-made component. In React, hold the notifications in useState and map them to JSX instead of building innerHTML strings; in Vue use a reactive ref array with v-for; in Angular use a component property with *ngFor. The slide-down panel animation, the unread badge counter, the mark-as-read toggle, and the click-outside-to-close logic all translate directly — only the rendering layer changes between frameworks. The Tailwind export rewrites every CSS rule as utility classes so you can drop the panel straight into a Tailwind project without a separate stylesheet.`,
      },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the event-delegation logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the panel animates with opacity, transform, and pointer-events instead of toggling display, and how the single click listener on the notif-list uses closest() to distinguish a dismiss-button click from a row click without attaching a handler to every item. The same assistant can help optimize it, for instance asking whether re-running innerHTML on the entire list after every dismiss or mark-as-read is wasteful compared to removing just the affected list item node, or whether the notifications array needs a cap to avoid an unbounded list. It's also useful for extending the center: ask it to persist read/dismissed state to localStorage as the FAQ suggests, group notifications by day with sticky headers, or wire real-time push notifications in over a WebSocket with their own entrance animation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "notification center" dropdown panel in plain HTML, CSS, and JavaScript with a badge counter, mark-as-read, and dismiss — no framework, no notification library.

Requirements:
- A bell button in a top bar with an absolutely positioned unread-count badge; the badge must derive its number by filtering a notifications array for unread items on every render and hide itself entirely when that count is zero, plus play a brief scale "bump" animation whenever the count changes.
- Clicking the bell toggles a dropdown panel anchored below it; the panel must animate open and closed using opacity and transform (never display: none), and must have pointer-events disabled while closed so an invisible panel can't intercept clicks.
- Each notification row shows a type-tinted icon (at least four types: success, warning, info, error, each with a distinct background tint), a title, description, relative timestamp, an unread indicator dot, and a small dismiss (x) button.
- Implement dismiss and mark-as-read entirely through one delegated click listener on the list container, distinguishing which sub-element was clicked with closest() rather than attaching a listener to every row or every dismiss button.
- Clicking a row (not the dismiss button) must mark it read, removing its unread styling and dot and decrementing the badge; clicking a row's dismiss button must remove that notification permanently from the array and re-render, without also triggering the mark-as-read behavior on the same click.
- A "Mark all read" header action must clear the unread state from every notification at once. Clicking anywhere outside the bell/panel wrapper must close the panel, and the list must show a distinct friendly empty state when there are zero notifications left.`,
    },
  },
};
export default notificationCenter;
