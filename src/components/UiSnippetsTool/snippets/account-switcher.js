const accountSwitcher = {
  id: 'account-switcher',
  title: 'Account Switcher',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<div class="acs-wrap">
  <button class="acs-trigger" id="acsTrigger" type="button" aria-haspopup="true" aria-expanded="false">
    <span class="acs-avatar" id="acsCurAvatar" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">N</span>
    <span class="acs-cur">
      <span class="acs-cur-name" id="acsCurName">Northwind Inc</span>
      <span class="acs-cur-plan" id="acsCurPlan">Pro workspace</span>
    </span>
    <svg class="acs-chev" viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
  </button>

  <div class="acs-menu" id="acsMenu" role="menu">
    <p class="acs-section">Switch workspace</p>
    <div class="acs-list" id="acsList"></div>
    <div class="acs-divider"></div>
    <button class="acs-action" type="button" role="menuitem">
      <span class="acs-action-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg></span>
      Create workspace
    </button>
    <button class="acs-action" type="button" role="menuitem">
      <span class="acs-action-ico"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
      Sign out
    </button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: flex-start; justify-content: center; padding: 60px 24px; }

.acs-wrap { position: relative; width: 100%; max-width: 280px; }

.acs-trigger {
  width: 100%;
  display: flex; align-items: center; gap: 11px;
  padding: 9px 12px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
  cursor: pointer; font-family: inherit; text-align: left;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.acs-trigger:hover, .acs-trigger[aria-expanded="true"] { border-color: #c7d2fe; box-shadow: 0 4px 16px rgba(99, 102, 241, 0.1); }

.acs-avatar { width: 36px; height: 36px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 14px; font-weight: 700; border-radius: 9px; }
.acs-cur { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.acs-cur-name { font-size: 13.5px; font-weight: 700; color: #0f172a; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.acs-cur-plan { font-size: 11.5px; color: #94a3b8; }
.acs-chev { width: 16px; height: 16px; flex-shrink: 0; fill: none; stroke: #94a3b8; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.25s; }
.acs-trigger[aria-expanded="true"] .acs-chev { transform: rotate(180deg); }

.acs-menu {
  position: absolute; top: calc(100% + 8px); left: 0; right: 0;
  background: #fff; border: 1px solid #e8edf3; border-radius: 14px;
  box-shadow: 0 16px 44px rgba(15, 23, 42, 0.14);
  padding: 8px;
  opacity: 0; transform: translateY(-8px) scale(0.98); transform-origin: top;
  pointer-events: none;
  transition: opacity 0.18s, transform 0.18s;
  z-index: 20;
}
.acs-menu.open { opacity: 1; transform: translateY(0) scale(1); pointer-events: auto; }

.acs-section { font-size: 10.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #94a3b8; padding: 8px 10px 6px; }
.acs-list { display: flex; flex-direction: column; gap: 2px; }

.acs-item {
  display: flex; align-items: center; gap: 11px;
  padding: 8px 10px; border-radius: 9px;
  background: none; border: none; cursor: pointer; font-family: inherit; text-align: left; width: 100%;
  transition: background 0.13s;
}
.acs-item:hover { background: #f1f5f9; }
.acs-item-av { width: 30px; height: 30px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: #fff; font-size: 12px; font-weight: 700; border-radius: 8px; }
.acs-item-text { display: flex; flex-direction: column; flex: 1; min-width: 0; }
.acs-item-name { font-size: 13px; font-weight: 600; color: #1e293b; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.acs-item-plan { font-size: 11px; color: #94a3b8; }
.acs-check { width: 16px; height: 16px; flex-shrink: 0; fill: none; stroke: #6366f1; stroke-width: 2.6; stroke-linecap: round; stroke-linejoin: round; opacity: 0; }
.acs-item.active .acs-check { opacity: 1; }

.acs-divider { height: 1px; background: #eef2f7; margin: 8px 4px; }
.acs-action {
  display: flex; align-items: center; gap: 11px;
  width: 100%; padding: 8px 10px; border-radius: 9px;
  background: none; border: none; cursor: pointer; font-family: inherit;
  font-size: 13px; font-weight: 600; color: #475569;
  transition: background 0.13s;
}
.acs-action:hover { background: #f1f5f9; }
.acs-action-ico { width: 30px; height: 30px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.acs-action-ico svg { width: 16px; height: 16px; fill: none; stroke: #64748b; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }`,
  js: `const WORKSPACES = [
  { name: 'Northwind Inc', plan: 'Pro workspace', initial: 'N', color: 'linear-gradient(135deg,#6366f1,#8b5cf6)' },
  { name: 'Acme Studio', plan: 'Team workspace', initial: 'A', color: 'linear-gradient(135deg,#0ea5e9,#22d3ee)' },
  { name: 'Brightwave Labs', plan: 'Free workspace', initial: 'B', color: 'linear-gradient(135deg,#16a34a,#84cc16)' },
  { name: 'Solo Projects', plan: 'Personal', initial: 'S', color: 'linear-gradient(135deg,#f97316,#ec4899)' },
];

const trigger = document.getElementById('acsTrigger');
const menu = document.getElementById('acsMenu');
const list = document.getElementById('acsList');
const curAvatar = document.getElementById('acsCurAvatar');
const curName = document.getElementById('acsCurName');
const curPlan = document.getElementById('acsCurPlan');
let activeIndex = 0;

function checkSvg() {
  return '<svg class="acs-check" viewBox="0 0 24 24" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
}

function buildList() {
  list.innerHTML = '';
  WORKSPACES.forEach((w, i) => {
    const item = document.createElement('button');
    item.className = 'acs-item' + (i === activeIndex ? ' active' : '');
    item.type = 'button';
    item.setAttribute('role', 'menuitem');
    item.innerHTML =
      '<span class="acs-item-av" style="background:' + w.color + '">' + w.initial + '</span>' +
      '<span class="acs-item-text"><span class="acs-item-name">' + w.name + '</span><span class="acs-item-plan">' + w.plan + '</span></span>' +
      checkSvg();
    item.addEventListener('click', () => switchTo(i));
    list.appendChild(item);
  });
}

function switchTo(i) {
  activeIndex = i;
  const w = WORKSPACES[i];
  curAvatar.textContent = w.initial;
  curAvatar.style.background = w.color;
  curName.textContent = w.name;
  curPlan.textContent = w.plan;
  buildList();
  close();
}

function open() { menu.classList.add('open'); trigger.setAttribute('aria-expanded', 'true'); }
function close() { menu.classList.remove('open'); trigger.setAttribute('aria-expanded', 'false'); }

trigger.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.contains('open') ? close() : open();
});

document.addEventListener('click', (e) => {
  if (!e.composedPath().includes(menu) && !e.composedPath().includes(trigger)) close();
});
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });

buildList();`,
  seo: {
    title: 'Account Switcher — Free HTML CSS JS Workspace Menu',
    description: 'A workspace/account switcher dropdown with avatars, active checkmark, create and sign-out actions, and click-outside close. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Account Switcher — Workspace Dropdown with Active Checkmark and Outside-Click Close',
      description: `Any app that supports multiple workspaces, organisations, or accounts — Slack, Notion, Vercel, Linear, GitHub — needs a switcher: a trigger showing the current account, and a dropdown to jump between the others. This component is exactly that, built in HTML, CSS, and vanilla JavaScript: a trigger button with the active workspace's avatar, name, and plan; a dropdown listing all workspaces with a checkmark on the current one; and create-workspace and sign-out actions below a divider. It handles the disclosure animation, switching, click-outside and Escape close, and ARIA wiring.

**The trigger that mirrors the selection**

The trigger button shows the active workspace: a gradient avatar with its initial, the workspace name (truncated with ellipsis so a long name never breaks the layout), the plan label beneath it, and a chevron that rotates 180 degrees when the menu opens. When you switch workspaces, \`switchTo()\` updates all of these in place — the avatar's letter and gradient, the name, and the plan — so the trigger always reflects the current context at a glance, the way the top-left switcher does in the apps users already know.

**Data-driven workspace list**

The dropdown is generated from a \`WORKSPACES\` array of \`{ name, plan, initial, color }\` objects. \`buildList()\` renders each as a menu item with its gradient avatar, name, plan, and a checkmark that is visible only on the active workspace (toggled by an \`.active\` class with \`opacity\`). Rebuilding the list on every switch keeps the checkmark in sync with the selection with no per-item bookkeeping. Adding a workspace is one array entry.

**The disclosure animation**

The menu starts hidden with \`opacity: 0\`, \`transform: translateY(-8px) scale(0.98)\`, and \`pointer-events: none\`. Adding the \`open\` class transitions it to full opacity and \`scale(1)\` with the transform origin at the top, so it grows downward out of the trigger — the standard dropdown reveal. Because \`pointer-events\` are disabled while closed, the invisible menu never intercepts clicks meant for the page behind it.

**Robust close behaviour**

A dropdown must close when you click elsewhere or press Escape. The outside-click handler uses \`e.composedPath().includes(...)\` rather than \`e.target.closest()\`, checking whether the click landed inside the menu or the trigger. \`composedPath()\` captures the full event path at dispatch time, which is more reliable than \`closest()\` when list items are re-rendered (the active item's DOM node is replaced on switch, which can break \`closest()\`-based checks). The trigger's own click uses \`stopPropagation()\` so it toggles the menu without immediately triggering the document handler that would close it. Escape closes it from anywhere.

**Accessible menu semantics**

The trigger carries \`aria-haspopup="true"\` and \`aria-expanded\` that flips with the open state, the dropdown has \`role="menu"\`, and each workspace and action has \`role="menuitem"\`. Every interactive element is a real \`<button>\`, so the whole switcher is keyboard-focusable and operable out of the box, and screen readers announce it as a menu with the correct expanded state.

**Customisation**

Replace the \`WORKSPACES\` array with your real accounts, use \`<img>\` avatars in place of the gradient initials if you have logos, and wire \`switchTo()\` to actually change the active workspace in your app (navigate, set a cookie, or call an API). Point the "Create workspace" and "Sign out" actions at your routes. Swap the \`#6366f1\` accent used by the checkmark and hover states for your brand. The whole component is 280px wide by default and sits in a relatively positioned wrapper, so it drops neatly into a sidebar or top bar.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A trigger button shows the current workspace's avatar, name, and plan, with a chevron.` },
      { title: 'Click the trigger', text: `The dropdown grows downward listing all workspaces, with a checkmark on the active one, plus Create and Sign out actions.` },
      { title: 'Pick a workspace', text: `The trigger's avatar, name, and plan update to the chosen workspace, the checkmark moves, and the menu closes.` },
      { title: 'Click outside or press Escape', text: `The menu closes reliably whether you click elsewhere on the page or hit Escape.` },
      { title: 'Add your workspaces', text: `Edit the WORKSPACES array; the list, avatars, and active checkmark all update automatically.` },
      { title: 'Wire up actions', text: `Make switchTo() change the active workspace in your app and point Create/Sign out at your routes; swap the accent colour.` },
    ]},
    features: [
      { title: 'Context-mirroring trigger', text: `The trigger shows the active workspace's avatar, truncated name, and plan and updates in place on switch.` },
      { title: 'Data-driven list', text: `A WORKSPACES array builds every menu item, avatar, and the active checkmark — adding one is a single entry.` },
      { title: 'Active checkmark', text: `Only the current workspace shows a checkmark, toggled by an .active class and kept in sync on every switch.` },
      { title: 'Scale-from-top reveal', text: `The menu animates opacity and scale from the top origin for the familiar dropdown disclosure.` },
      { title: 'composedPath outside-click', text: `Uses e.composedPath() so the click-outside check survives list re-renders that would break closest().` },
      { title: 'Escape + propagation handling', text: `Escape closes the menu, and the trigger stops propagation so its own click does not immediately re-close it.` },
      { title: 'Create and sign-out actions', text: `A divider separates workspace switching from account actions, matching real app switchers.` },
      { title: 'Accessible menu', text: `aria-haspopup, aria-expanded, role=menu/menuitem, and real buttons make it keyboard- and screen-reader-friendly.` },
    ],
    useCases: [
      { title: 'Multi-workspace SaaS apps', text: `Let users jump between organisations or teams from the sidebar — pair with a [profile dropdown](/ui-snippets/profile-dropdown/) for personal account actions.` },
      { title: 'Agency and client dashboards', text: `Switch the active client or project context at the top of the app.` },
      { title: 'Developer tools and consoles', text: `Move between projects, environments, or accounts the way cloud consoles do; complements a [sidebar nav](/ui-snippets/sidebar-nav/).` },
      { title: 'Team and org management', text: `Surface all memberships with plan labels and a quick create-new option.` },
      { title: 'Reseller and agency portals', text: `Switch between managed accounts with clear avatars and the current selection marked.` },
      { title: 'Learning dropdown patterns', text: `A reference for accessible disclosure menus, composedPath outside-click, and context-mirroring triggers; compare with a [nested dropdown](/ui-snippets/nested-dropdown/).` },
      { icon: 'CODE', title: 'Related: App Switcher Overlay', desc: 'See the [App Switcher Overlay](/ui-snippets/app-switcher-overlay/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Contextual Sub-Nav Morph', desc: 'See the [Contextual Sub-Nav Morph](/ui-snippets/contextual-subnav-morph/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Master-Detail Split Navigation', desc: 'See the [Master-Detail Split Navigation](/ui-snippets/master-detail-split-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use composedPath() instead of target.closest() for outside-click?', a: `Because the menu rebuilds its list on every switch, the DOM node you clicked may be replaced before the document handler runs, which can make target.closest('.acs-menu') return null and close the menu unexpectedly. e.composedPath() captures the full event path at dispatch time — before any re-render — so checking whether it includes the menu or trigger is reliable even right after a list rebuild.` },
      { q: 'How do I make switching actually change the app?', a: `In switchTo(), after updating the UI, perform your real switch: navigate to the workspace route (location.href or your router), set a workspace cookie/header, or call an API to change the active org, then reload the relevant data. The UI update and the real switch are separate concerns — the snippet handles the former so you can drop your logic into the latter.` },
      { q: 'How do I use logo images instead of letter avatars?', a: `Add an img field to each WORKSPACES entry and render <img class="acs-item-av" src={w.img}> (with object-fit: cover) instead of the initial span, doing the same for the trigger's .acs-avatar. Keep the gradient-initial version as a fallback for workspaces without a logo so the list always looks complete.` },
      { q: 'Does the menu close when I press Escape or click another part of the page?', a: `Yes to both. A document keydown handler closes it on Escape from anywhere, and a document click handler closes it whenever the click is outside the menu and trigger. The trigger's own click uses stopPropagation so toggling open does not instantly hit the document handler and close again. This matches the close behaviour users expect from any dropdown.` },
      { q: 'How do I use this account switcher in React, Vue, or Angular?', a: `Hold open and activeIndex in state. Render WORKSPACES with .map/v-for/*ngFor, binding each item's .active class to its index. The trigger toggles open; bind aria-expanded and the chevron rotation to it. For outside-click, add a document listener in an effect that closes on clicks outside a ref to the wrapper, and remove it on cleanup; add an Escape key handler too. switchTo sets activeIndex and runs your real switch. All the CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the outside-click logic by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why e.composedPath() is used instead of e.target.closest() to detect clicks outside the menu, and what specific scenario (the list being rebuilt on every switch) makes closest() unreliable here. The same assistant is useful for optimizing it — asking whether rebuilding the entire workspace list with innerHTML on every switch is wasteful compared to just toggling the active class and checkmark on existing nodes. It's just as good for extending the switcher: ask it to add keyboard arrow-key navigation between menu items, persist the last-selected workspace to localStorage, or support workspace logo images with a graceful fallback to the gradient initial. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an account/workspace switcher dropdown in plain HTML, CSS, and JavaScript — no libraries, driven by a plain data array.

Requirements:
- A trigger button showing the currently active workspace: a gradient-colored avatar with an initial letter, the workspace name (truncated with an ellipsis if too long), a secondary plan label beneath it, and a chevron icon that rotates 180 degrees when the menu is open.
- A dropdown menu, initially hidden via opacity 0, a translateY/scale transform, and pointer-events none (not display: none), that reveals with a transition to opacity 1 and scale 1 anchored from its top edge when an "open" class is added.
- The dropdown's list of workspaces must be generated entirely from a JavaScript array of objects (name, plan, initial, color), rebuilt into DOM elements every time the active workspace changes, with a checkmark icon visible only on the currently active item.
- Clicking a workspace in the list must update the trigger's avatar, name, and plan to match the selection and close the menu.
- Implement outside-click-to-close using event.composedPath() (not closest() or contains()) to check whether the click landed inside the menu or trigger, specifically because the list DOM nodes get replaced on every selection and a stale reference could otherwise cause incorrect behavior. Also close the menu on the Escape key.
- Give the trigger aria-haspopup and aria-expanded attributes that reflect state, mark the dropdown with role="menu" and each item with role="menuitem", and use real button elements throughout so the whole thing is keyboard operable.
- Include a divider and two extra actions below the workspace list (e.g. "Create workspace" and "Sign out").`,
    },
  },
};

export default accountSwitcher;
