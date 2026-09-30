const masterDetailSplitNav = {
  id: 'master-detail-split-nav',
  title: 'Master-Detail Split Navigation',
  category: 'navigation',
  html: `<div class="md-shell" id="mdShell">
  <aside class="md-list" id="mdList">
    <div class="md-list-header">
      <h2>Messages</h2>
      <span class="md-count" id="mdCount">6</span>
    </div>
    <div class="md-items" id="mdItems"></div>
  </aside>

  <section class="md-detail" id="mdDetail">
    <button class="md-back-btn" id="mdBackBtn" aria-label="Back to list">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
      <span>Messages</span>
    </button>
    <div class="md-detail-body" id="mdDetailBody"></div>
  </section>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.md-shell {
  width: 100%; max-width: 640px; height: 420px;
  display: grid; grid-template-columns: 240px 1fr;
  border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden;
  background: #fff; box-shadow: 0 12px 30px rgba(30,41,59,0.06);
}

.md-list { border-right: 1px solid #e2e8f0; display: flex; flex-direction: column; overflow: hidden; }
.md-list-header { display: flex; align-items: center; justify-content: space-between; padding: 16px 16px 12px; flex-shrink: 0; }
.md-list-header h2 { font-size: 15px; font-weight: 800; color: #1e293b; }
.md-count { font-size: 11px; font-weight: 700; background: #eef2ff; color: #6366f1; padding: 2px 8px; border-radius: 999px; }
.md-items { flex: 1; overflow-y: auto; padding: 0 8px 8px; }

.md-item {
  display: flex; gap: 10px; padding: 10px 8px; border-radius: 10px; cursor: pointer;
  align-items: flex-start; transition: background 0.12s;
}
.md-item:hover { background: #f8fafc; }
.md-item.active { background: #eef2ff; }
.md-avatar {
  width: 34px; height: 34px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 800; color: #fff;
}
.md-item-body { flex: 1; min-width: 0; }
.md-item-name { font-size: 12.5px; font-weight: 700; color: #1e293b; display: flex; align-items: center; justify-content: space-between; gap: 6px; }
.md-item-time { font-size: 10px; font-weight: 600; color: #94a3b8; flex-shrink: 0; }
.md-item-preview { font-size: 11.5px; color: #64748b; margin-top: 2px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.md-item.unread .md-item-name span:first-child::before { content: ''; display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #6366f1; margin-right: 6px; }

.md-detail { display: flex; flex-direction: column; overflow: hidden; }
.md-back-btn {
  display: none; align-items: center; gap: 6px; background: none; border: none;
  padding: 14px 16px; font-size: 13px; font-weight: 700; color: #6366f1; cursor: pointer;
  border-bottom: 1px solid #f1f5f9; flex-shrink: 0; font-family: inherit;
}
.md-detail-body { flex: 1; overflow-y: auto; padding: 22px 24px; }
.md-detail-empty { display: flex; align-items: center; justify-content: center; height: 100%; color: #94a3b8; font-size: 13px; text-align: center; padding: 20px; }
.md-detail-name { font-size: 17px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
.md-detail-time { font-size: 11.5px; color: #94a3b8; margin-bottom: 16px; }
.md-detail-text { font-size: 13.5px; color: #334155; line-height: 1.8; }

/* Mobile: collapse to single-pane, list-first. Selecting an item slides in
   the detail pane; the back button returns to the list. */
@media (max-width: 560px) {
  .md-shell { grid-template-columns: 1fr; height: 480px; position: relative; }
  .md-list, .md-detail {
    grid-column: 1; grid-row: 1;
    position: absolute; inset: 0; transition: transform 0.24s cubic-bezier(0.32,0.72,0,1);
  }
  .md-detail { transform: translateX(100%); border-right: none; }
  .md-shell.md-showing-detail .md-list { transform: translateX(-100%); }
  .md-shell.md-showing-detail .md-detail { transform: translateX(0); }
  .md-back-btn { display: flex; }
}`,
  js: `const AVATAR_COLORS = ['#6366f1', '#f472b6', '#22d3ee', '#f59e0b', '#34d399', '#a78bfa'];

const MESSAGES = [
  { id: 1, name: 'Priya Shah', time: '9:41 AM', preview: 'Left comments on frame 4, mostly about spacing.', unread: true,
    body: 'Hey! Just left a round of comments on frame 4 in the design file — mostly small spacing and contrast tweaks. Nothing blocking, should be a quick pass. Let me know if anything is unclear and I can hop on a call.' },
  { id: 2, name: 'Dev Patel', time: '9:12 AM', preview: 'Q3 roadmap draft is ready for review', unread: true,
    body: 'The Q3 roadmap draft is up in the shared doc. I tried to keep the top three priorities tight this time based on last quarter\\'s feedback about scope creep. Would love your eyes on the sequencing before Thursday\\'s planning meeting.' },
  { id: 3, name: 'Standup Bot', time: 'Yesterday', preview: 'Daily standup notes have been posted', unread: false,
    body: 'Yesterday\\'s standup notes are posted in #eng-standup. Highlights: checkout flow refactor is on track, the flaky test in payments has been isolated, and the on-call rotation for next week has been confirmed.' },
  { id: 4, name: 'Client — Northwind', time: 'Yesterday', preview: 'Feedback on the latest build, a few notes', unread: true,
    body: 'Thanks for the latest build! Overall it looks great. A few small notes: the onboarding flow feels a touch long, and we noticed the empty state on the dashboard could use some guidance text. Otherwise really happy with the direction.' },
  { id: 5, name: 'Ella Novak', time: 'Mon', preview: 'Can we push the sync to 3pm instead?', unread: false,
    body: 'Would it work to push our sync from 2pm to 3pm today? I have a conflicting interview that just got scheduled. Happy to keep it at 2pm if that\\'s genuinely easier for you though — just let me know.' },
  { id: 6, name: 'Finn Ortiz', time: 'Mon', preview: 'Shipped the fix for the flaky checkout test', unread: false,
    body: 'Shipped a fix for the flaky checkout test — turned out to be a race condition in how the cart total was recalculated after a coupon was applied. Added a regression test so it should be caught earlier if it resurfaces.' },
];

const shell = document.getElementById('mdShell');
const itemsEl = document.getElementById('mdItems');
const countEl = document.getElementById('mdCount');
const detailBody = document.getElementById('mdDetailBody');
const backBtn = document.getElementById('mdBackBtn');

let activeId = null;
let readIds = new Set();

function initials(name) {
  return name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
}

function renderList() {
  itemsEl.innerHTML = '';
  const unreadCount = MESSAGES.filter(m => m.unread && !readIds.has(m.id)).length;
  countEl.textContent = String(unreadCount);

  MESSAGES.forEach((m, i) => {
    const isUnread = m.unread && !readIds.has(m.id);
    const item = document.createElement('div');
    item.className = 'md-item' + (m.id === activeId ? ' active' : '') + (isUnread ? ' unread' : '');
    item.innerHTML = \`
      <div class="md-avatar" style="background:\${AVATAR_COLORS[i % AVATAR_COLORS.length]}">\${initials(m.name)}</div>
      <div class="md-item-body">
        <div class="md-item-name"><span>\${m.name}</span><span class="md-item-time">\${m.time}</span></div>
        <div class="md-item-preview">\${m.preview}</div>
      </div>\`;
    item.addEventListener('click', () => selectMessage(m.id));
    itemsEl.appendChild(item);
  });
}

function renderDetail() {
  const msg = MESSAGES.find(m => m.id === activeId);
  if (!msg) {
    detailBody.innerHTML = '<div class="md-detail-empty">Select a message from the list to read it here.</div>';
    return;
  }
  detailBody.innerHTML = \`
    <div class="md-detail-name">\${msg.name}</div>
    <div class="md-detail-time">\${msg.time}</div>
    <div class="md-detail-text">\${msg.body}</div>\`;
}

function selectMessage(id) {
  activeId = id;
  readIds.add(id);
  shell.classList.add('md-showing-detail');
  renderList();
  renderDetail();
}

backBtn.addEventListener('click', () => {
  shell.classList.remove('md-showing-detail');
});

renderList();
renderDetail();`,
  seo: {
    title: 'Master-Detail Split Navigation — Free HTML CSS JS Snippet',
    description: 'A responsive two-pane master-detail layout that stays side-by-side on desktop and collapses to a sliding single-pane, list-then-detail flow on mobile. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Master-Detail Split Navigation — Responsive Two-Pane List and Detail Layout',
      description: `Master-detail (also called list-detail) is the navigation pattern behind email clients, messaging apps, and settings screens: a list of items sits in one pane, and selecting an item shows its full content in an adjacent pane — both visible simultaneously on wide screens. The pattern only becomes interesting on small screens, where there isn't room for two panes side by side, and the interaction has to fall back to a single pane that shows the list first and slides in the detail on selection. This snippet implements both behaviors from one shared DOM and state model, switching purely via CSS media query and one toggled class — not two separate implementations.

**One shared data model drives both panes**

\`MESSAGES\` is the single source of truth; \`renderList()\` and \`renderDetail()\` both read from it and from the shared \`activeId\`. Selecting a message calls \`selectMessage(id)\`, which updates \`activeId\`, marks the message read, and re-renders both panes — there is no separate mobile-only or desktop-only state, which is what keeps the two responsive behaviors from ever drifting out of sync with each other.

**Desktop: both panes always visible**

At the default (wide) layout, \`.md-shell\` is a two-column CSS grid — the list pane at a fixed width, the detail pane filling the rest. Both are always rendered and visible; clicking a list item simply swaps which message's content appears in the already-visible detail pane, with the newly active row highlighted via the \`.active\` class.

**Mobile: an absolutely-positioned sliding single pane**

Below the \`560px\` breakpoint, the media query repositions both \`.md-list\` and \`.md-detail\` to the same grid cell using \`position: absolute; inset: 0\`, so only one is visually on top at a time, and each has a CSS \`transition\` on \`transform\`. The detail pane starts pre-positioned at \`translateX(100%)\` (off-screen to the right); toggling the single \`.md-showing-detail\` class on the shell slides the list pane out to \`-100%\` and the detail pane in to \`0\` simultaneously — a coordinated slide driven by one class toggle rather than two independent animations that could fall out of sync.

**A back button that only exists where it's needed**

The back button is present in the markup for every screen size but stays \`display: none\` until the same \`560px\` media query flips it to \`display: flex\` — there is no JavaScript check for screen width; the button's visibility itself is a pure CSS responsive concern, while its click handler (removing \`.md-showing-detail\`) works identically whether or not the button happens to be visible at the current viewport width.

**Read-state tracking independent of selection**

A \`readIds\` Set tracks which messages have been opened, decoupled from \`activeId\` — so a message correctly stays marked as read (no unread dot, no unread-count contribution) even after a different message becomes the active selection, rather than "read" incorrectly meaning "currently selected."`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a message in the list', text: 'The full message loads into the detail pane. On desktop this happens beside the list; both panes stay visible.' },
        { title: 'Shrink the preview below ~560px', text: 'The layout collapses to a single pane. Selecting a message now slides the detail pane in over the list.' },
        { title: 'Use the back button on mobile', text: 'The back button (hidden on desktop, visible only below the breakpoint) slides the list pane back into view.' },
        { title: 'Watch the unread count and dot', text: 'Selecting an unread message marks it read immediately — the header count and the item\'s unread dot both update.' },
        { title: 'Change the breakpoint', text: 'Edit the max-width value in the CSS media query to control at what viewport width the layout switches from two-pane to sliding single-pane.' },
        { title: 'Swap in your own list data', text: 'Replace the MESSAGES array with your own items — renderList() and renderDetail() work with any array sharing the same id/name/preview/body shape.' },
      ],
    },
    features: [
      'Single shared data model and state drive both the desktop two-pane and mobile sliding single-pane layouts',
      'Responsive switch handled entirely by one CSS media query and one toggled class — no JS viewport-width branching',
      'Absolutely-positioned panes with coordinated CSS transform transitions produce a native-feeling slide on mobile',
      'Back button present in markup at all sizes, shown only via CSS below the breakpoint, with one click handler regardless',
      'Independent read-state tracking (a Set) so a message stays marked read even after selection moves elsewhere',
      'Live unread count badge in the list header recomputed from actual message state, not a static number',
      'Per-avatar color cycling and initials generated from each contact\'s name',
      'Detail pane shows a clear empty state before any message has been selected',
    ],
    useCases: [
      { icon: 'APP', title: 'Email, messaging, and inbox interfaces', desc: 'The defining use case — see also the [Feedback Tab Widget](/ui-snippets/feedback-tab-widget/) for a related list-plus-content pattern worth comparing.' },
      { icon: 'DASH', title: 'Settings and preferences screens', desc: 'A categories list on the left with the selected category\'s settings on the right is the same master-detail pattern applied to configuration UI.' },
      { icon: 'FLOW', title: 'Responsive admin and support tools', desc: 'Ticket queues, customer records, and support-inbox tools all need the exact side-by-side-on-desktop, sliding-on-mobile behavior this snippet implements.' },
      { icon: 'LEARN', title: 'Teaching CSS-only responsive layout switching', desc: 'A clear example of handling two structurally different layouts from one shared DOM and state model, switched purely by CSS rather than duplicated JS logic.' },
      { icon: 'CODE', title: 'Reference for absolute-position pane sliding', desc: 'The inset: 0 plus transform: translateX() sliding-pane technique is directly reusable for any single-pane-at-a-time mobile navigation need.' },
    ],
    faqs: [
      { q: 'How does the layout switch between two-pane and single-pane?', a: 'A single CSS media query at max-width: 560px repositions both .md-list and .md-detail to the same grid cell using position: absolute; inset: 0, and gives each a transform transition. No JavaScript checks the viewport width — the responsive switch is handled entirely by CSS, while the JS state (which message is active) stays identical at every screen size.' },
      { q: 'How does the mobile slide-in animation work?', a: 'The detail pane starts pre-positioned off-screen at translateX(100%). Selecting a message adds a single .md-showing-detail class to the shell, and CSS rules scoped to that class slide the list pane to translateX(-100%) and the detail pane to translateX(0) at the same time, both animated by the same transition duration for a coordinated slide.' },
      { q: 'Why is the back button always in the HTML instead of only rendered on mobile?', a: 'Its visibility (display: none by default, display: flex only within the same media query used for the pane-sliding layout) is a pure CSS responsive concern. Keeping one element and one click handler for every screen size is simpler and less error-prone than conditionally rendering different markup per viewport in JavaScript.' },
      { q: 'How is read/unread state tracked separately from which message is selected?', a: 'A readIds Set records every message ID that has been opened, independent of activeId (the currently displayed message). This means a message correctly remains marked as read after the user selects a different message — read state is a property of the message itself, not of whatever happens to be currently selected.' },
      { q: 'How do I change the breakpoint where the layout switches?', a: 'Edit the max-width: 560px value in the CSS media query. Everything else — the JS state model, the slide transition, the back button visibility — is driven by that same breakpoint automatically.' },
      { q: 'Can I use this pattern for more than two levels (e.g. list, then detail, then sub-detail)?', a: 'Yes conceptually, by extending the same pattern: add a third absolutely-positioned pane and a second toggled class for the next drill-down level, sliding each new pane in over the previous one using the identical transform-transition technique already used between the list and detail panes.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the single .md-showing-detail class toggle drives two coordinated CSS transforms at once, and why keeping one shared data model and selection state (rather than separate mobile/desktop logic) is what keeps the two responsive layouts from ever falling out of sync. It's also a good candidate for extension — ask it to add swipe-to-go-back gesture support on the mobile detail pane (similar to the [Edge Swipe Back Navigation](/ui-snippets/edge-swipe-back-navigation/) snippet), add keyboard arrow-key navigation through the list, or persist the read/unread state to localStorage so it survives a page reload.`,
      prompt: `Build a responsive master-detail (list-detail) navigation layout in plain HTML, CSS, and JavaScript — no libraries or frameworks.

Requirements:
- A single shared data array of list items (e.g. messages, each with an id, name, short preview text, and full body text), rendered into a list pane on the left and, once selected, into a detail pane on the right — both panes reading from the same array and the same "currently selected id" state.
- On wide viewports, both panes must be visible simultaneously as a two-column layout, with the currently selected list item visually highlighted and the detail pane showing its full content beside the list.
- Below a defined breakpoint (e.g. 560px), the layout must collapse to a single visible pane at a time: the list shows first, and selecting an item slides the detail pane in over the list using CSS transform transitions on absolutely-positioned panes, driven by toggling exactly one CSS class on a shared container — do not duplicate rendering logic or state between the desktop and mobile behavior.
- Include a back button that is only visually shown below that same breakpoint (via CSS, not JavaScript viewport checks) and, when clicked, removes the toggled class to slide the list pane back into view.
- Track which items have been "read" (opened) independently from which item is currently selected, using a persistent set of read IDs, and reflect that in a live unread-count badge and per-item unread indicator.
- Show a clear empty state in the detail pane before any item has been selected.`,
    },
  },
};

export default masterDetailSplitNav;
