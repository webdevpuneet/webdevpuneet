const notificationBell = {
    id: 'notification-bell',
    title: 'Notification Bell',
    category: 'dashboards',
    html: `<div class="page">
  <div class="bell-wrap">
    <button class="bell-btn" id="bell" onclick="toggle()">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="badge" id="badge">3</span>
    </button>

    <div class="notif-panel" id="panel">
      <div class="notif-head">
        <span class="notif-title">Notifications</span>
        <button class="mark-all" onclick="markAll()">Mark all read</button>
      </div>
      <div class="notif-list" id="notif-list">
        <div class="notif unread" data-id="1">
          <div class="notif-avatar" style="background:#6366f1">PS</div>
          <div class="notif-body">
            <div class="notif-text"><strong>Puneet</strong> commented on your post</div>
            <div class="notif-time">2 min ago</div>
          </div>
          <div class="notif-dot"></div>
        </div>
        <div class="notif unread" data-id="2">
          <div class="notif-avatar" style="background:#10b981">💰</div>
          <div class="notif-body">
            <div class="notif-text">Invoice <strong>#1042</strong> was paid — $2,400</div>
            <div class="notif-time">1 hour ago</div>
          </div>
          <div class="notif-dot"></div>
        </div>
        <div class="notif unread" data-id="3">
          <div class="notif-avatar" style="background:#f59e0b">⚠️</div>
          <div class="notif-body">
            <div class="notif-text">Storage at <strong>90%</strong> — upgrade your plan</div>
            <div class="notif-time">3 hours ago</div>
          </div>
          <div class="notif-dot"></div>
        </div>
        <div class="notif" data-id="4">
          <div class="notif-avatar" style="background:#8b5cf6">🚀</div>
          <div class="notif-body">
            <div class="notif-text">Deployment <strong>v2.4.1</strong> succeeded</div>
            <div class="notif-time">Yesterday</div>
          </div>
        </div>
      </div>
      <div class="notif-foot">
        <a href="#" class="view-all">View all notifications →</a>
      </div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: flex-start; justify-content: center; min-height: 100vh; padding: 40px 20px; }

.page { display: flex; justify-content: center; }

.bell-wrap { position: relative; }

.bell-btn {
  position: relative; width: 40px; height: 40px; border-radius: 10px;
  background: #1e293b; border: 1px solid #334155;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: #94a3b8; transition: border-color 0.15s, color 0.15s;
}
.bell-btn:hover { border-color: #6366f1; color: #f1f5f9; }

.badge {
  position: absolute; top: -4px; right: -4px;
  min-width: 16px; height: 16px;
  background: #ef4444; color: #fff;
  font-size: 9px; font-weight: 700;
  border-radius: 20px; padding: 0 4px;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #0f172a;
  transition: transform 0.2s;
}
.badge.hidden { display: none; }
.badge.bump { transform: scale(1.3); }

.notif-panel {
  position: absolute; top: calc(100% + 8px); right: 0;
  width: 320px;
  background: #1e293b; border: 1px solid #334155;
  border-radius: 14px; overflow: hidden;
  box-shadow: 0 16px 48px rgba(0,0,0,0.4);
  display: none; z-index: 100;
}
.notif-panel.open { display: flex; flex-direction: column; }

.notif-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 16px 10px; border-bottom: 1px solid #334155; }
.notif-title { font-size: 13px; font-weight: 700; color: #f1f5f9; }
.mark-all { font-size: 11px; font-weight: 600; color: #6366f1; background: none; border: none; cursor: pointer; font-family: inherit; }
.mark-all:hover { color: #a78bfa; }

.notif-list { overflow-y: auto; max-height: 300px; }

.notif {
  display: flex; align-items: flex-start; gap: 10px;
  padding: 12px 16px; cursor: pointer; position: relative;
  transition: background 0.1s;
}
.notif:hover { background: #334155; }
.notif.unread { background: rgba(99,102,241,0.06); }
.notif.unread:hover { background: rgba(99,102,241,0.12); }

.notif-avatar { width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: #fff; flex-shrink: 0; }
.notif-body { flex: 1; min-width: 0; }
.notif-text { font-size: 12.5px; color: #94a3b8; line-height: 1.5; }
.notif-text strong { color: #f1f5f9; }
.notif-time { font-size: 11px; color: #475569; margin-top: 3px; }

.notif-dot { width: 7px; height: 7px; border-radius: 50%; background: #6366f1; flex-shrink: 0; margin-top: 5px; }

.notif-foot { padding: 10px 16px; border-top: 1px solid #334155; }
.view-all { font-size: 12px; font-weight: 600; color: #6366f1; text-decoration: none; }
.view-all:hover { color: #a78bfa; }`,
    js: `function toggle() {
  const panel = document.getElementById('panel');
  panel.classList.toggle('open');
}

function markAll() {
  document.querySelectorAll('.notif.unread').forEach(n => {
    n.classList.remove('unread');
    n.querySelector('.notif-dot')?.remove();
  });
  const badge = document.getElementById('badge');
  badge.classList.add('hidden');
}

document.addEventListener('click', e => {
  if (!e.target.closest('.bell-wrap')) document.getElementById('panel').classList.remove('open');
});`,

  seo: {
    title: 'Notification Bell — Free HTML CSS JS Dropdown Snippet',
    description: 'Bell button with unread badge, dropdown notification panel and mark-all-read action. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Notification Bell — Unread Badge, Toggle Dropdown & Mark All Read',
      description: `A notification bell in the app header gives users a quick glance at pending alerts without navigating away from their current view — the full list typically lives in a [notification center](/ui-snippets/notification-center/). The red unread badge communicates urgency; the dropdown reveals the notification list; Mark all read clears the badge. This is a complete, production-quality implementation with click-outside close.

**The unread badge**

The bell button has an absolutely positioned \`.badge\` div showing the unread count. It starts with a \`display: none\` state that can be shown conditionally. When there are unread notifications, the badge appears with a red background and white count number.

**The dropdown toggle**

\`toggle()\` calls \`panel.classList.toggle('open')\`. The \`.panel.open\` CSS rule transitions \`opacity\` from 0 to 1 and \`transform\` from \`translateY(-8px)\` to \`translateY(0)\`. \`pointer-events: none\` when closed prevents the invisible panel from intercepting clicks. The dropdown has a fixed width and max-height with \`overflow-y: auto\` for long notification lists.

**Unread notification styling**

Notifications with \`.unread\` class have a blue \`.notif-dot\` indicator and a slightly tinted background. The \`.unread\` class drives all visual differences — removing it marks the notification as read.

**Mark all read**

\`markAll()\` queries all \`.notif.unread\` elements, removes the \`.unread\` class, removes the \`.notif-dot\` element, then hides the badge if the unread count reaches zero. This is the minimum viable implementation — in production, it would also fire an API call.

**Click-outside close**

A \`document.addEventListener('click', e => { if (!e.target.closest('.bell-wrap')) panel.classList.remove('open'); })\` closes the panel when the user clicks outside. This is the same \`closest()\` pattern used in the [Dropdown Menu](/ui-snippets/dropdown-menu/) snippet.

**The badge counter**

The unread badge uses position: absolute; top: -4px; right: -4px to sit above the bell icon. It shows a count number and uses min-width: 16px so it looks correct for single and double digit counts. When count exceeds 9, display "9+" instead of the full number. The badge disappears (display: none) when count reaches 0.

**The dropdown open/close**

Clicking the bell toggles .open on the dropdown panel, which uses scale(0.95) + opacity: 0 in the closed state and scale(1) + opacity: 1 in the open state. This CSS transition matches the [popover](/ui-snippets/popover/) pattern. The dropdown is positioned using position: absolute; right: 0; top: calc(100% + 8px). Click-outside detection uses document.addEventListener('click', e => { if (!e.target.closest('.bell-wrap')) close(); }).

**Mark as read interaction**

Each notification item has a "Mark read" button. Clicking it removes the .unread class from the notification and decrements the badge count. The mark-all-read button iterates all .unread items and marks them simultaneously. Both patterns update the badge count immediately — optimistic UI that syncs to the backend separately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the bell icon', text: 'Click the bell icon in the preview to open the notification panel. Click it again or click outside to close.' },
        { title: 'Click "Mark all read"', text: 'Click the Mark all read link to remove the unread styling from all notifications and hide the red badge.' },
        { title: 'Update notification content', text: 'In the HTML panel, update the .notif elements with real notification text, timestamps, and icons.' },
        { title: 'Add new notifications', text: 'Copy a .notif div and paste it inside the notifications list. Add .unread to mark it as new. Update the badge count.' },
        { title: 'Fire an API on mark-all-read', text: 'In the JS panel, add a fetch() call inside markAll() after the DOM changes to sync the read state with your backend.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Absolute-positioned red unread badge with count number',
      'toggle() adds/removes .open on the panel — one function for open and close',
      'opacity + translateY(-8px) CSS transition on .panel.open',
      'pointer-events: none when closed — invisible panel does not intercept clicks',
      '.unread class drives all visual differences per notification item',
      'markAll() removes .unread, removes .notif-dot, hides badge when count reaches zero',
      'Click-outside close via e.target.closest(".bell-wrap") document listener',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Dashboard and app header notifications', desc: 'Add to any dashboard header. Wire the badge count to your real-time notification API response and update it via WebSocket or polling.' },
      { icon: 'PEOPLE', title: 'Social and collaboration tools',          desc: 'Notify users of new mentions, comments, team activity, and messages. The .unread class and mark-all-read pattern match what users expect from social products.' },
      { icon: 'LEARN',  title: 'Learn click-outside close pattern',       desc: 'The click-outside handler uses e.target.closest(".bell-wrap"). Edit the selector to understand how closest() traverses the DOM.' },
      { icon: 'FLOW',   title: 'Prototype notification UX',               desc: 'Use the snippet to prototype how notification volume, grouping, and read/unread states should work before building a production notification system.' },
      { icon: 'DESIGN', title: 'Customise the badge and panel styling',   desc: 'Change the badge colour, panel width, and notification item layout in the CSS panel to match your design system.' },
      { icon: 'CODE',   title: 'Real-time notification updates',          desc: 'On a WebSocket message, increment the badge count and prepend a new .notif.unread item to the list. The CSS handles the visual state automatically.' },
      { icon: 'CODE', title: 'Related: Restaurant Order Status Tracker', desc: 'See the [Restaurant Order Status Tracker](/ui-snippets/restaurant-order-status/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the dropdown open and close?', a: 'toggle() calls panel.classList.toggle("open"). The CSS .panel.open rule transitions opacity from 0 to 1 and transform from translateY(-8px) to translateY(0) over 0.2s. pointer-events: none when closed prevents invisible click interception.' },
      { q: 'How does mark-all-read work?', a: 'markAll() queries all .notif.unread elements. For each: it removes .unread, finds and removes the .notif-dot element inside it. After the loop, it checks if any .unread remain — if none, it hides the badge element.' },
      { q: 'How does click-outside close work?', a: 'A document click listener checks !e.target.closest(".bell-wrap"). If the click was outside the bell wrapper (no ancestor with that class), panel.classList.remove("open") closes the panel. This is the same pattern as the Dropdown Menu snippet.' },
      { q: 'How do I update the unread count from an API?', a: 'Fetch notifications from your API and update the badge textContent with the unread count. Add .unread class to unread notification elements. Show or hide the badge based on count > 0.' },
      { q: 'How do I add real-time notifications?', a: 'Listen to a WebSocket or Server-Sent Events stream. On new notification, create a .notif div with .unread, prepend it to the notification list, increment the badge count, and show the badge if hidden.' },
      { q: 'Can I use this notification bell in React?', a: 'Yes. Click "JSX" for a React component. Manage open state with useState, notifications as an array with useState, and the unread count derived from filter. Use useEffect to add and clean up the document click listener.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the dropdown's dismissal logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the document-level click listener's e.target.closest('.bell-wrap') check avoids immediately closing the panel on the same click that opened it, and why markAll() has to both remove the unread class and delete the notif-dot element rather than just one or the other. The same assistant can help optimize it, for instance asking whether toggling classList on every notif row during markAll() would still be fast with a very long notification list, or whether the panel's open/close transition should account for prefers-reduced-motion. It's also useful for extending the bell: ask it to add per-notification "mark as read" on click (not just mark-all), prepend newly arriving notifications from a WebSocket with their own entrance animation, or group notifications by day with sticky section headers. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "notification bell" dropdown in plain HTML, CSS, and JavaScript with an unread badge and click-outside dismissal — no dropdown library.

Requirements:
- A bell icon button with an absolutely positioned unread-count badge in its top-right corner, bordered to separate it from the button's background; the badge must be capable of being hidden entirely (not just showing "0").
- Clicking the bell toggles a dropdown panel open and closed using a single class toggle (not separate open/close functions), positioned below and right-aligned to the bell, that transitions in with an opacity and vertical-offset animation and must not intercept clicks while closed (its closed state must not be clickable even though the closed DOM technically still exists).
- A scrollable list of notification rows inside the panel, each with an avatar, message text, and a relative timestamp; unread rows must be visually distinguished from read ones (a tinted background plus a small colored dot) purely through one class name difference.
- A "Mark all read" action that removes the unread distinction (both the tint and the dot) from every currently-unread row in one action, and hides the bell's badge once no unread rows remain.
- The panel must close automatically when the user clicks anywhere outside the bell-and-panel wrapper, implemented with a single document-level click listener using closest() to detect clicks inside versus outside the component — this must not require a listener on every notification row.
- A footer link inside the panel for viewing the full notification history, visually separated from the list by a border.`,
    },
  },
};

export default notificationBell;
