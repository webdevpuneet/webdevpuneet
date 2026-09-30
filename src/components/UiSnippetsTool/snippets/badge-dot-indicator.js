const badgeDotIndicator = {
  id: 'badge-dot-indicator',
  title: 'Badge Dot Indicator',
  category: 'buttons',
  html: `<div class="demo-row">
  <div class="icon-wrap">
    <button class="icon-btn" aria-label="Notifications">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
      <span class="badge-dot"></span>
    </button>
    <span class="label">Plain dot</span>
  </div>

  <div class="icon-wrap">
    <button class="icon-btn" aria-label="Messages, 5 unread">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span class="badge-count" id="countBadge">5</span>
    </button>
    <span class="label">Count badge</span>
  </div>

  <div class="icon-wrap">
    <div class="avatar" aria-label="Jane, online">JS<span class="badge-dot avatar-dot"></span></div>
    <span class="label">Avatar status</span>
  </div>

  <div class="icon-wrap">
    <button class="icon-btn" aria-label="Cart, 128 items">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#475569" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
      <span class="badge-count" id="overflowBadge">99+</span>
    </button>
    <span class="label">Overflow cap</span>
  </div>
</div>
<button class="bump-btn" onclick="bumpCount()">Add notification</button>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.demo-row { display: flex; gap: 32px; flex-wrap: wrap; margin-bottom: 24px; }

.icon-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.label { font-size: 12px; color: #94a3b8; }

.icon-btn {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.icon-btn:hover { border-color: #cbd5e1; box-shadow: 0 2px 8px rgba(15,23,42,0.08); }
.icon-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

.badge-dot {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
  border: 2px solid #fff;
}

.badge-count {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 10px;
  font-weight: 700;
  line-height: 18px;
  text-align: center;
  border: 2px solid #f8fafc;
}

.avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #6366f1;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
}
.avatar-dot { background: #22c55e; top: 2px; right: 2px; }

.bump-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #fff;
  background: #6366f1;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
.bump-btn:hover { background: #4f46e5; }`,
  js: `let count = 5;
const MAX_DISPLAY = 99;

function renderCount() {
  const el = document.getElementById('countBadge');
  el.textContent = count > MAX_DISPLAY ? MAX_DISPLAY + '+' : String(count);
  el.style.display = count > 0 ? 'block' : 'none';
}

function bumpCount() {
  count += Math.floor(Math.random() * 20) + 1;
  renderCount();
}

renderCount();`,

  seo: {
    title: 'Badge Dot Indicator — Free HTML CSS JS Notification Badge Snippet',
    description: 'Corner notification badges for icons and avatars: a plain unread dot, a numeric count badge with a 99+ overflow cap, and an avatar online-status dot. Vanilla JS, no dependencies.',
    about: {
      title: 'Badge Dot Indicator — HTML, CSS & JavaScript Notification Badges',
      description: `A small colored dot or number in the corner of an icon is one of the most information-dense UI elements on the web — it tells the user "something happened here" without taking any extra space. This snippet demonstrates the three common variants: a plain unread dot on a bell icon, a numeric count badge on a messages icon, and an online-status dot on a circular avatar, plus a count badge that caps its display at "99+" once the real number gets too large to fit comfortably.

**How the corner positioning works**

Every badge is \`position: absolute\` inside a parent that has \`position: relative\` (the \`.icon-btn\` or \`.avatar\`). The dot variant uses \`top: 4px; right: 4px\` with a 2px white border, so it visually "cuts into" the icon's corner rather than floating in empty space outside it. The count variant is pulled slightly further outside the button with \`top: -6px; right: -6px\`, since it's wider than a plain dot and needs the extra clearance to avoid touching the icon glyph.

**How the overflow cap works**

Real unread counts can jump well past what fits legibly in an 18px circle. \`renderCount()\` compares \`count\` against a \`MAX_DISPLAY\` constant (99) and renders \`MAX_DISPLAY + '+'\` whenever the real count exceeds it, otherwise it renders the exact number. Because the badge uses \`min-width: 18px\` rather than a fixed width, both a single digit and "99+" render at a readable size without the circle becoming egg-shaped or the text overflowing its bounds.

**How the badge auto-hides**

When \`count\` reaches zero, \`renderCount()\` sets \`display: none\` on the badge so the icon reverts to its plain, unbadged state — there's no such thing as a "0" badge cluttering the UI.

**Accessibility notes**

Icon buttons carry a descriptive \`aria-label\` (e.g. "Messages, 5 unread") rather than relying on the badge's visual number alone, since screen readers do not reliably announce absolutely-positioned decorative badge text.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Badge Dot Indicator" in the sidebar Library tab to see all four badge variants in the preview.' },
        { title: 'Click "Add notification"', text: 'Watch the count badge increase and eventually flip to the "99+" overflow state.' },
        { title: 'Change the badge color', text: 'Update the background value on .badge-dot and .badge-count in the CSS panel to match your brand\'s alert color.' },
        { title: 'Adjust the overflow threshold', text: 'Change the MAX_DISPLAY constant in the JS panel to cap the badge at a different number, like 9+ instead of 99+.' },
        { title: 'Wire to real data', text: 'Replace the bumpCount demo function with a call that sets count from your actual unread/notification data and calls renderCount().' },
        { title: 'Export and save', text: 'Use the export buttons or click "Save as" to keep a customized version for reuse.' },
      ],
    },
    features: [
      'Plain unread dot, numeric count badge, avatar status dot, and overflow-capped badge in one snippet',
      'Absolute positioning anchored to a relatively-positioned icon or avatar parent',
      'White/background border ring around each badge so it reads clearly against any icon color',
      'Automatic "99+" overflow cap driven by a single MAX_DISPLAY constant',
      'Badge auto-hides via display:none when the count reaches zero',
      'min-width instead of a fixed width so both single digits and multi-character text render cleanly',
      'Descriptive aria-label on icon buttons for screen reader users',
      'Focus-visible outline on icon buttons for keyboard navigation',
    ],
    useCases: [
      { icon: 'BELL', title: 'Notification bells and inboxes', desc: 'Show an unread dot or exact count on a notification icon in an app header or nav bar.' },
      { icon: 'CHAT', title: 'Messaging and chat unread counts', desc: 'Display unread message counts on a chat icon, capping large numbers at "99+" to keep the badge compact.' },
      { icon: 'AVATAR', title: 'Online/offline presence dots', desc: 'Overlay a green or grey status dot on a user avatar to indicate presence in a team or chat app.' },
      { icon: 'SHOP', title: 'Cart item counts', desc: 'Show the number of items in a shopping cart icon, using the same overflow-safe count badge.' },
      { icon: 'DASH', title: 'Dashboard alert indicators', desc: 'Flag a sidebar icon (Settings, Billing) with a plain dot when something needs the user\'s attention.' },
      { icon: 'ACCESS', title: 'Accessible badge patterns', desc: 'Study how aria-label communicates badge information to screen readers instead of relying on visual-only text.' },
      { icon: 'CODE', title: 'Related: Keyboard Shortcuts Help Overlay — Press ', desc: 'See the [Keyboard Shortcuts Help Overlay — Press ](/ui-snippets/keyboard-shortcuts-help-overlay/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Undo/Redo History Toolbar with Jump-to-State', desc: 'See the [Undo/Redo History Toolbar with Jump-to-State](/ui-snippets/undo-redo-history-toolbar/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: GPA Calculator', desc: 'See the [GPA Calculator](/ui-snippets/gpa-calculator/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Days Between Dates Calculator', desc: 'See the [Days Between Dates Calculator](/ui-snippets/days-between-dates-calculator/) for a related misc pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Compound Interest Calculator', desc: 'See the [Compound Interest Calculator](/ui-snippets/compound-interest-calculator/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between a dot badge and a count badge?', a: 'A dot badge is a small solid circle that just signals "there is something new" without a specific number. A count badge shows the actual number of unread items, capping at a value like "99+" once the number gets too large to display cleanly.' },
      { q: 'How is the badge positioned exactly in the corner?', a: 'The icon button or avatar has position: relative, and the badge has position: absolute with small top/right offsets. A visible border matching the page background creates the illusion the badge is cut into the icon rather than floating separately.' },
      { q: 'How does the "99+" overflow cap work?', a: 'The renderCount function compares the live count against a MAX_DISPLAY constant (99). If count exceeds it, the badge renders "99+" instead of the literal number, keeping the badge width consistent and legible.' },
      { q: 'Why does the badge use min-width instead of a fixed width?', a: 'A fixed width would either clip "99+" or leave too much empty space around a single digit. min-width plus horizontal padding lets the badge grow just enough to fit its content while staying pill-shaped.' },
      { q: 'How do I hide the badge when there are no notifications?', a: 'renderCount sets the badge\'s display to none whenever count is 0, so no empty circle is shown. Call renderCount whenever your underlying count changes.' },
      { q: 'Can I use this for an online/offline status dot instead of notifications?', a: 'Yes — the .avatar-dot variant is exactly that: a colored dot (green for online) placed in the corner of a circular avatar. Swap the color and update the aria-label to reflect the status text.' },
      { q: 'Is the badge accessible to screen reader users?', a: 'The visual badge alone is not reliably announced, so the icon button carries a full aria-label describing both the icon\'s purpose and its current count or status, e.g. "Messages, 5 unread".' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet to an AI assistant and ask it to explain why the badge needs a border matching the page background rather than no border at all — the border is what visually separates the badge from the icon glyph underneath it and makes it read as "on top of" the icon rather than merging into it. It's also a good prompt for extending the pattern: ask the assistant to animate the badge with a brief scale-pulse whenever the count increases, or to add a small aria-live region so screen reader users are proactively notified when a new notification arrives rather than only on request.`,
      prompt: `Build a "badge dot indicator" set in plain HTML, CSS, and vanilla JavaScript covering these variants:

Requirements:
- A plain unread dot overlaying the top-right corner of an icon button, using absolute positioning anchored to a relatively-positioned parent, with a border matching the page background so it visually separates from the icon.
- A numeric count badge overlaying a second icon button, using min-width rather than a fixed width so it fits both single digits and multi-character text without clipping or looking oversized.
- A JavaScript overflow rule: once the underlying count exceeds a configurable maximum (default 99), the badge must display "99+" instead of the literal number, driven by a single named constant that is easy to change.
- A rule that hides the badge entirely (not just shows "0") whenever the underlying count is zero.
- A circular avatar with a small colored status dot in its corner to demonstrate the same technique used for presence indicators, not just notification counts.
- Every icon button must carry a descriptive aria-label reflecting both its purpose and its current badge state for screen reader users.`,
    },
  },
};

export default badgeDotIndicator;
