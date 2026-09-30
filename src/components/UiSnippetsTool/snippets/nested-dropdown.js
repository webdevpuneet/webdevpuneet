const nestedDropdown = {
  id: 'nested-dropdown',
  title: 'Nested Dropdown Menu',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<nav class="nd-bar">
  <button class="nd-root" id="ndRoot" aria-haspopup="true" aria-expanded="false">Menu ▾</button>
  <ul class="nd-menu" id="ndMenu" role="menu"></ul>
</nav>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b14;color:#e8e8f2;display:flex;justify-content:center;padding:80px 24px;min-height:100vh}

.nd-bar{position:relative;align-self:flex-start}
.nd-root{background:#17172a;border:1px solid #2a2a44;color:#fff;font-family:inherit;font-size:14px;font-weight:600;padding:10px 16px;border-radius:10px;cursor:pointer}
.nd-root[aria-expanded=true]{background:#1f1f38}

.nd-menu,.nd-sub{list-style:none;position:absolute;min-width:210px;background:#15152a;border:1px solid #2a2a44;border-radius:12px;padding:6px;box-shadow:0 18px 44px -18px rgba(0,0,0,.75);opacity:0;visibility:hidden;transform:translateY(-6px);transition:opacity .16s,transform .16s,visibility .16s;z-index:10}
.nd-menu{top:calc(100% + 8px);left:0}
.nd-menu.open{opacity:1;visibility:visible;transform:none}
.nd-sub{top:-6px;left:100%;margin-left:6px}
.nd-item{position:relative}
.nd-item.open > .nd-sub{opacity:1;visibility:visible;transform:none}

.nd-link{display:flex;align-items:center;gap:10px;width:100%;background:none;border:none;color:#d4d4e6;font-family:inherit;font-size:13.5px;text-align:left;padding:9px 11px;border-radius:8px;cursor:pointer}
.nd-link:hover,.nd-link.active{background:#262647;color:#fff}
.nd-ico{width:16px;text-align:center;flex-shrink:0;opacity:.85}
.nd-caret{margin-left:auto;opacity:.6;transition:transform .15s}
.nd-item.open > .nd-link .nd-caret{transform:rotate(0)}
.nd-kbd{margin-left:auto;font-size:10.5px;color:#7a7a96;border:1px solid #33334e;border-radius:5px;padding:1px 5px}`,

  js: `var DATA = [
  { ico: '📄', label: 'New file', kbd: '⌘N' },
  { ico: '📁', label: 'Open recent', children: [
    { ico: '•', label: 'dashboard.tsx' }, { ico: '•', label: 'api/routes.ts' }, { ico: '•', label: 'styles.css' }
  ] },
  { ico: '🔗', label: 'Share', children: [
    { ico: '✉', label: 'Email link' },
    { ico: '👥', label: 'Invite people', children: [
      { ico: '✏', label: 'Can edit' }, { ico: '👁', label: 'Can view' }, { ico: '💬', label: 'Can comment' }
    ] }
  ] },
  { ico: '⚙', label: 'Preferences', kbd: '⌘,' },
  { ico: '🚪', label: 'Sign out' }
];

function build(items, level) {
  var ul = document.createElement('ul');
  ul.className = level === 0 ? 'nd-menu' : 'nd-sub';
  ul.setAttribute('role', 'menu');
  items.forEach(function (it) {
    var li = document.createElement('li');
    li.className = 'nd-item';
    var hasKids = it.children && it.children.length;
    li.innerHTML = '<button class="nd-link" role="menuitem"' + (hasKids ? ' aria-haspopup="true"' : '') + '>' +
      '<span class="nd-ico">' + it.ico + '</span><span>' + it.label + '</span>' +
      (hasKids ? '<span class="nd-caret">›</span>' : it.kbd ? '<span class="nd-kbd">' + it.kbd + '</span>' : '') +
      '</button>';
    if (hasKids) li.appendChild(build(it.children, level + 1));
    ul.appendChild(li);
  });
  return ul;
}

var root = document.getElementById('ndRoot');
var menu = build(DATA, 0);
document.getElementById('ndMenu').replaceWith(menu);
menu.id = 'ndMenu';

var open = false;
function setOpen(v) {
  open = v; menu.classList.toggle('open', v);
  root.setAttribute('aria-expanded', v ? 'true' : 'false');
  if (!v) closeAllSubs(menu);
}
function closeAllSubs(scope) {
  scope.querySelectorAll('.nd-item.open').forEach(function (i) { i.classList.remove('open'); });
}

root.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!open); });

// Hover opens submenus; clicking a leaf closes everything.
menu.addEventListener('pointerover', function (e) {
  var li = e.target.closest('.nd-item');
  if (!li || !menu.contains(li)) return;
  // Close sibling submenus at this level, then open the hovered one if it has kids.
  var siblings = li.parentElement.children;
  Array.prototype.forEach.call(siblings, function (s) { if (s !== li) closeAllSubs(s), s.classList.remove('open'); });
  if (li.querySelector(':scope > .nd-sub')) li.classList.add('open');
});
menu.addEventListener('click', function (e) {
  var btn = e.target.closest('.nd-link');
  if (!btn) return;
  var li = btn.parentElement;
  if (li.querySelector(':scope > .nd-sub')) return;  // parent items just expand
  e.stopPropagation();
  setOpen(false);
});

document.addEventListener('click', function () { if (open) setOpen(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });`,

  seo: {
    title: 'Nested Dropdown Menu — Free HTML CSS JS Flyout Snippet',
    description: `A multi-level dropdown with submenus that fly out on hover, built recursively from a data tree with click-away dismissal. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Nested Dropdown Menu — Recursive Multi-Level Flyout Menus',
      description: `The nested dropdown is the desktop-app menu pattern where a top-level menu opens, and hovering an item with children flies a submenu out to the right — which can itself contain further submenus, several levels deep. This snippet builds it from a data tree with plain HTML, CSS, and recursive vanilla JavaScript, so the menu structure is data, not hand-written markup.

**Recursive rendering from a tree**

The menu is described as a nested \`DATA\` array where any item can have a \`children\` array. A \`build(items, level)\` function turns that tree into DOM: it creates a \`<ul>\`, adds a button for each item, and — if an item has children — calls itself to build the child \`<ul>\` and nests it inside. Because it's recursive, the menu supports arbitrary depth (the demo goes three levels: Share → Invite people → Can edit) with no extra code per level. Restructuring the menu is just editing the data.

**Flyout submenus**

The root menu drops below the button (\`top: 100%\`), while every submenu is positioned \`left: 100%\` of its parent item, so it flies out to the side like a classic cascading menu. Submenus start hidden (\`opacity: 0; visibility: hidden\`) and reveal when their parent \`<li>\` gets an \`.open\` class, transitioning opacity and a small slide. Using \`visibility\` alongside opacity ensures closed submenus aren't focusable or hoverable.

**Hover logic that closes siblings**

On \`pointerover\`, the handler finds the hovered item and first closes any sibling submenus at that level (so two branches are never open at once), then opens the hovered item's submenu if it has children. Closing siblings is what keeps a cascading menu tidy — moving from one parent to another collapses the old branch. The \`:scope > .nd-sub\` selector ensures it only opens the item's direct submenu, not deeper ones.

**Clicks: expand vs. act**

A click is interpreted by whether the item has children. Parent items only expand their submenu (handled by hover), so clicking them does nothing destructive. Clicking a leaf item (no children) is a real action, so it closes the entire menu. This mirrors how native menus behave — folders open, commands execute and dismiss.

**Dismissal and accessibility**

The whole menu closes on a document click outside it (the root button stops propagation so opening doesn't immediately self-close) and on the Escape key. The root carries \`aria-haspopup\` and an \`aria-expanded\` that flips with state, each submenu trigger is marked \`aria-haspopup\`, and items use \`role="menuitem"\` within \`role="menu"\` lists. Keyboard shortcuts are shown inline for leaf commands.

**Customizing it**

Edit the \`DATA\` tree to change the menu — add items, nest deeper, or attach icons, shortcuts, and handlers. Restyle the surfaces, adjust the flyout offset, or change the open transition. Wire each leaf's click to a real action by reading an id from the data. Pair it with a [context menu](/ui-snippets/context-menu/) or a [command palette](/ui-snippets/command-palette/) for a complete app navigation set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A Menu button renders, built from a nested data tree.` },
      { title: 'Open the menu', text: `Click the button to drop the top-level menu.` },
      { title: 'Hover a parent item', text: `Its submenu flies out to the right.` },
      { title: 'Go deeper', text: `Hover a nested parent to open a further submenu.` },
      { title: 'Click a leaf', text: `A command item closes the whole menu.` },
      { title: 'Edit the tree', text: `Change the DATA array to restructure the menu.` },
    ] },
    features: [
      { title: 'Recursive build', text: `Arbitrary depth from a nested data tree.` },
      { title: 'Side flyout submenus', text: `Children open at left: 100% of the parent.` },
      { title: 'Sibling auto-close', text: `Only one branch stays open per level.` },
      { title: 'Scoped selectors', text: `:scope opens just the direct submenu.` },
      { title: 'Leaf vs parent clicks', text: `Commands act and dismiss; parents expand.` },
      { title: 'Click-away and Escape', text: `Standard, robust dismissal.` },
      { title: 'ARIA menu roles', text: `haspopup, expanded, menu, and menuitem.` },
      { title: 'Inline shortcuts', text: `Keyboard hints shown on leaf items.` },
    ],
    useCases: [
      { title: 'App menu bars', text: `Pair with a [context menu](/ui-snippets/context-menu/) for right-click parity.` },
      { title: 'Account menus', text: `Nest settings under a [profile dropdown](/ui-snippets/profile-dropdown/).` },
      { title: 'Toolbar actions', text: `Group commands beside a [command palette](/ui-snippets/command-palette/).` },
      { title: 'Navigation', text: `Cascading sections like a [mega menu](/ui-snippets/mega-menu/).` },
      { title: 'File browsers', text: `Open-recent and share submenus.` },
      { title: 'Recursive UI demos', text: `A reference for tree-driven flyout menus.` },
      { icon: 'CODE', title: 'Related: Pagination', desc: 'See the [Pagination](/ui-snippets/pagination/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does it support arbitrary menu depth?', a: `The menu is rendered by a recursive build(items, level) function. It creates a list, adds a button per item, and when an item has a children array it calls itself to build and nest the child list. Because it recurses, any number of levels works with no per-level code — the demo nests three deep. Changing depth is just editing the data tree.` },
      { q: 'How do submenus fly out to the side?', a: `The root menu is positioned below the button at top: 100%, while each submenu is positioned at left: 100% of its parent item with a small margin, so it appears to the right like a cascading menu. Submenus are hidden with opacity and visibility and revealed when their parent li gets an open class, with a short transition.` },
      { q: 'Why close sibling submenus on hover?', a: `So only one branch is open per level, which keeps a cascading menu readable. On pointerover the handler closes sibling submenus at the hovered item's level before opening the hovered one. The :scope > .nd-sub selector ensures it opens only the item's direct submenu, not a deeper descendant.` },
      { q: 'Why do clicks behave differently on parents and leaves?', a: `Clicking a parent item only expands its submenu (which hover already handles), so it does nothing destructive — matching how folders work in native menus. Clicking a leaf item with no children is treated as a real command and closes the entire menu. This expand-vs-act distinction is what users expect from desktop menus.` },
      { q: 'How do I use this nested dropdown in React, Vue, or Angular?', a: `Render the menu with a recursive component that maps the data tree, passing each node's children to a nested instance of itself. Track open submenu paths in state keyed by item id, and handle hover and click to update it. The CSS flyout positioning ports directly. In Tailwind, use group and group-hover or data-state variants to reveal submenus, with absolute left-full positioning.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the recursion by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how build(items, level) turns the nested DATA array into DOM without any level-specific code, and why the pointerover handler has to close sibling submenus before opening the hovered one to avoid two branches being open at once. The same assistant can help optimize it, for instance asking whether the recursive build() re-render on every menu open is wasteful compared to building it once and reusing the DOM, or whether the :scope selector usage could misbehave with very deep nesting. It's also useful for extending the menu: ask it to add keyboard arrow-key navigation between siblings and into submenus (not just hover), support a search filter across all levels of the tree, or add a small delay before closing a submenu so a diagonal mouse movement into it doesn't accidentally dismiss it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "nested dropdown menu" (cascading flyout menu) in plain HTML, CSS, and JavaScript that renders recursively from a data tree — no menu library.

Requirements:
- Define the entire menu structure as a plain nested JavaScript array where any item can optionally have a children array of the same shape, supporting arbitrary depth (at least three levels deep in your example data).
- Write one recursive function that takes an items array and a nesting level and returns a fully built list element: it creates one row per item, and if that item has children, recursively calls itself to build and nest a child list inside that row — with no per-depth-level special-casing anywhere in the function.
- The top-level list must open below its trigger button; every nested list must be positioned to the right of its parent row (a flyout), starting hidden (both invisible and non-interactive) and revealing with a short opacity/transform transition when its direct parent row is marked open.
- Hovering over a row must open its child flyout (if it has one) and must close any sibling rows' flyouts at that same nesting level first, so only one branch per level is ever open simultaneously; use a scoped selector so this only affects each row's direct child list, not deeper descendants.
- Clicking a row with children must do nothing destructive (children only open via hover); clicking a row with no children (a leaf/command item) must close the entire menu tree.
- The whole menu must close when clicking anywhere outside it and when pressing Escape, and the trigger button plus every row with children must carry appropriate ARIA attributes (aria-haspopup, aria-expanded, role="menu"/"menuitem").`,
    },
  },
};

export default nestedDropdown;
