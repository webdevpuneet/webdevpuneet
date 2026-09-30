const megaMenuPanel = {
  id: 'mega-menu-panel',
  title: 'Mega Menu Panel',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<nav class="mmp-nav" id="mmpNav">
  <div class="mmp-brand">Northwind</div>
  <ul class="mmp-links" id="mmpLinks">
    <li class="mmp-item" data-menu="products">
      <button class="mmp-trigger" type="button" aria-haspopup="true" aria-expanded="false">Products
        <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </li>
    <li class="mmp-item" data-menu="solutions">
      <button class="mmp-trigger" type="button" aria-haspopup="true" aria-expanded="false">Solutions
        <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
    </li>
    <li class="mmp-item"><a class="mmp-trigger" href="#">Pricing</a></li>
    <li class="mmp-item"><a class="mmp-trigger" href="#">Docs</a></li>
  </ul>
  <a class="mmp-cta" href="#">Get started</a>

  <div class="mmp-panel" id="mmpPanel" role="region">
    <div class="mmp-grid" id="mmpGrid"></div>
    <div class="mmp-feature" id="mmpFeature"></div>
  </div>
</nav>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; }

.mmp-nav { position: relative; display: flex; align-items: center; gap: 28px; max-width: 1000px; margin: 0 auto; padding: 14px 24px; background: #fff; border-bottom: 1px solid #e8edf3; }
.mmp-brand { font-size: 17px; font-weight: 800; color: #0f172a; }
.mmp-links { list-style: none; display: flex; gap: 4px; }
.mmp-item { position: static; }

.mmp-trigger {
  display: inline-flex; align-items: center; gap: 5px;
  padding: 8px 12px;
  background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 14px; font-weight: 600; color: #475569; text-decoration: none;
  border-radius: 8px;
  transition: color 0.15s, background 0.15s;
}
.mmp-trigger:hover { color: #0f172a; background: #f1f5f9; }
.mmp-trigger svg { width: 14px; height: 14px; fill: none; stroke: currentColor; stroke-width: 2.4; stroke-linecap: round; stroke-linejoin: round; transition: transform 0.22s; }
.mmp-item.open .mmp-trigger { color: #6366f1; }
.mmp-item.open .mmp-trigger svg { transform: rotate(180deg); }

.mmp-cta { margin-left: auto; padding: 9px 18px; background: #6366f1; color: #fff; border-radius: 9px; font-size: 14px; font-weight: 700; text-decoration: none; transition: background 0.15s; }
.mmp-cta:hover { background: #4f46e5; }

.mmp-panel {
  position: absolute; top: 100%; left: 12px; right: 12px;
  background: #fff; border: 1px solid #e8edf3; border-radius: 16px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.14);
  padding: 22px;
  display: grid; grid-template-columns: 1fr 260px; gap: 22px;
  opacity: 0; transform: translateY(-10px); pointer-events: none;
  transition: opacity 0.22s, transform 0.22s;
  z-index: 30;
}
.mmp-nav.open .mmp-panel { opacity: 1; transform: translateY(8px); pointer-events: auto; }

.mmp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.mmp-cell { display: flex; gap: 12px; padding: 12px; border-radius: 11px; text-decoration: none; transition: background 0.13s; }
.mmp-cell:hover { background: #f6f8fb; }
.mmp-cell-ico { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; border-radius: 10px; background: color-mix(in srgb, var(--c) 14%, #fff); color: var(--c); }
.mmp-cell-ico svg { width: 19px; height: 19px; fill: none; stroke: currentColor; stroke-width: 2; stroke-linecap: round; stroke-linejoin: round; }
.mmp-cell-title { font-size: 14px; font-weight: 700; color: #0f172a; }
.mmp-cell-desc { font-size: 12.5px; line-height: 1.45; color: #94a3b8; margin-top: 2px; }

.mmp-feature { border-radius: 13px; padding: 20px; display: flex; flex-direction: column; justify-content: flex-end; color: #fff; min-height: 180px; }
.mmp-feature-tag { font-size: 11px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; opacity: 0.85; }
.mmp-feature-title { font-size: 18px; font-weight: 800; margin-top: 6px; line-height: 1.25; }
.mmp-feature-link { margin-top: 12px; font-size: 13px; font-weight: 700; }

@media (max-width: 720px) {
  .mmp-panel { grid-template-columns: 1fr; left: 8px; right: 8px; }
  .mmp-grid { grid-template-columns: 1fr; }
  .mmp-feature { min-height: 120px; }
}`,
  js: `const MENUS = {
  products: {
    cells: [
      { c: '#6366f1', icon: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>', title: 'Dashboard', desc: 'All your metrics in one view' },
      { c: '#0ea5e9', icon: '<path d="M12 20v-6M6 20V10M18 20V4"/>', title: 'Analytics', desc: 'Real-time charts and reports' },
      { c: '#16a34a', icon: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>', title: 'Teams', desc: 'Collaborate with your org' },
      { c: '#f97316', icon: '<path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/>', title: 'Automations', desc: 'Workflows without code' },
    ],
    feature: { bg: 'linear-gradient(135deg,#6366f1,#8b5cf6)', tag: 'New', title: 'Meet the v3 workspace', link: 'See what changed →' },
  },
  solutions: {
    cells: [
      { c: '#6366f1', icon: '<path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>', title: 'For startups', desc: 'Move fast on a budget' },
      { c: '#0ea5e9', icon: '<rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>', title: 'For enterprise', desc: 'Scale, SSO, and controls' },
      { c: '#16a34a', icon: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20"/>', title: 'For agencies', desc: 'Manage many clients' },
      { c: '#f97316', icon: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>', title: 'For healthcare', desc: 'Compliant by design' },
    ],
    feature: { bg: 'linear-gradient(135deg,#0ea5e9,#22d3ee)', tag: 'Guide', title: 'Pick the right plan', link: 'Read the guide →' },
  },
};

const nav = document.getElementById('mmpNav');
const panel = document.getElementById('mmpPanel');
const grid = document.getElementById('mmpGrid');
const feature = document.getElementById('mmpFeature');
const items = [...document.querySelectorAll('.mmp-item[data-menu]')];
let openKey = null;
let closeTimer = null;

function paint(key) {
  const data = MENUS[key];
  grid.innerHTML = data.cells.map(cell =>
    '<a class="mmp-cell" href="#"><span class="mmp-cell-ico" style="--c:' + cell.c + '"><svg viewBox="0 0 24 24" aria-hidden="true">' + cell.icon + '</svg></span>' +
    '<span><span class="mmp-cell-title">' + cell.title + '</span><span class="mmp-cell-desc">' + cell.desc + '</span></span></a>'
  ).join('');
  feature.style.background = data.feature.bg;
  feature.innerHTML =
    '<span class="mmp-feature-tag">' + data.feature.tag + '</span>' +
    '<span class="mmp-feature-title">' + data.feature.title + '</span>' +
    '<span class="mmp-feature-link">' + data.feature.link + '</span>';
}

function openMenu(key) {
  clearTimeout(closeTimer);
  openKey = key;
  paint(key);
  nav.classList.add('open');
  items.forEach(it => {
    const isOpen = it.dataset.menu === key;
    it.classList.toggle('open', isOpen);
    it.querySelector('.mmp-trigger').setAttribute('aria-expanded', isOpen);
  });
}

function closeMenu() {
  openKey = null;
  nav.classList.remove('open');
  items.forEach(it => { it.classList.remove('open'); it.querySelector('.mmp-trigger').setAttribute('aria-expanded', 'false'); });
}

items.forEach(item => {
  const key = item.dataset.menu;
  const trigger = item.querySelector('.mmp-trigger');

  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    openKey === key ? closeMenu() : openMenu(key);
  });
  item.addEventListener('mouseenter', () => openMenu(key));
  item.addEventListener('mouseleave', () => { closeTimer = setTimeout(closeMenu, 160); });
});

panel.addEventListener('mouseenter', () => clearTimeout(closeTimer));
panel.addEventListener('mouseleave', () => { closeTimer = setTimeout(closeMenu, 160); });

document.addEventListener('click', (e) => { if (!e.composedPath().includes(nav)) closeMenu(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });`,
  seo: {
    title: 'Mega Menu Panel — Free HTML CSS JS Navigation Snippet',
    description: 'A full-width mega menu with a multi-column link grid, a featured promo panel, hover-intent open and click/keyboard support. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Mega Menu Panel — Full-Width Dropdown with Link Grid and Featured Promo',
      description: `When a site has more than a handful of destinations, a plain dropdown becomes a long, hard-to-scan list. The mega menu solves this: a full-width panel that drops from the navigation bar with links organised into a grid — each with an icon, title, and description — plus a featured promo panel to spotlight what is new. It is the navigation pattern used by Stripe, GitHub, Atlassian, and most large product sites. This component builds a complete mega menu in HTML, CSS, and vanilla JavaScript, with hover-intent open, click and keyboard support, and a data-driven panel that swaps content per top-level item.

**One shared panel, swapped per menu**

Rather than a separate dropdown per nav item, there is one \`.mmp-panel\` whose content is repainted when you open a different menu. A \`MENUS\` object holds the data for each top-level item ("products", "solutions") — an array of grid \`cells\` and a \`feature\` promo. Opening a menu calls \`paint()\`, which builds the cell grid and the featured panel from that data. This keeps the DOM light (one panel, not many) and makes the menu trivially extensible: add a key to \`MENUS\` and a trigger with a matching \`data-menu\` attribute.

**The two-zone layout**

The panel is a grid with a flexible multi-column link area on the left (\`1fr\`) and a fixed \`260px\` feature panel on the right. The link area is itself a two-column grid of cells, each a flex row with a tinted icon tile (coloured from a \`--c\` custom property via \`color-mix\`), a bold title, and a muted description — the scannable, explained-links format that makes a mega menu more useful than a bare list. The feature panel is a gradient card with a tag, headline, and link, anchoring the eye and giving you a place to promote a launch or a guide.

**Hover-intent open and close**

Mega menus that open and slam shut on every stray mouse movement are infuriating. This one uses hover intent: entering a nav item opens its menu immediately, but leaving does not close instantly — a 160ms \`setTimeout\` delays the close, and that timer is cleared if the pointer enters the panel (or another trigger) in the meantime. So moving diagonally from the trigger down into the panel keeps it open, while genuinely leaving closes it after a brief grace period. This forgiving timing is the difference between a mega menu that feels smooth and one that feels hostile.

**Click and keyboard too**

The menu is not hover-only, which would exclude touch and keyboard users. Each trigger is also clickable — clicking toggles its menu open or closed — and the trigger uses \`stopPropagation\` so its click does not immediately hit the document handler that closes the menu on outside clicks. That outside-click handler uses \`e.composedPath().includes(nav)\` to reliably detect clicks outside the whole nav even as the panel's contents are repainted, and Escape closes the menu from anywhere. Triggers carry \`aria-haspopup\` and \`aria-expanded\` that flips with state.

**The reveal animation and chevron**

The panel starts hidden with \`opacity: 0\`, \`translateY(-10px)\`, and \`pointer-events: none\`; opening transitions it to visible and nudges it down into place. Because \`pointer-events\` are off while closed, the invisible panel never blocks clicks on the page behind it. The active trigger recolours to the accent and its chevron rotates 180 degrees, so it is always clear which menu is open.

**Customisation**

Edit the \`MENUS\` object to define each panel's cells (icon path, colour, title, description) and feature promo (gradient, tag, headline, link). Add a top-level item by adding a \`<li data-menu="key">\` trigger and a \`MENUS.key\` entry. Swap the \`#6366f1\` accent and the feature gradients for your brand. On screens under 720px the panel becomes single-column and the grid stacks, so the same menu works on mobile (where you would typically trigger it by click).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A nav bar renders with brand, top-level links (Products, Solutions have dropdowns), and a Get started CTA.` },
      { title: 'Hover Products or Solutions', text: `A full-width panel drops down with a grid of explained links and a gradient feature promo, and the trigger's chevron rotates.` },
      { title: 'Move into the panel', text: `Hover intent keeps it open as you move from the trigger into the panel; leaving entirely closes it after a short grace period.` },
      { title: 'Click or press Escape', text: `Clicking a trigger toggles its menu; clicking outside the nav or pressing Escape closes it.` },
      { title: 'Edit the menus', text: `Change the MENUS object's cells and feature promo per key, and add items via a data-menu trigger plus a matching MENUS entry.` },
      { title: 'Theme it', text: `Swap the accent colour and the feature gradients, and resize-test: under 720px the panel stacks to one column.` },
    ]},
    features: [
      { title: 'Full-width link grid', text: `Links are shown as a multi-column grid of icon + title + description cells, far more scannable than a plain list.` },
      { title: 'Featured promo panel', text: `A fixed gradient card spotlights a launch or guide beside the links, the way large product sites do.` },
      { title: 'One panel, data-driven', text: `A single panel repaints from a MENUS object per top-level item, keeping the DOM light and the menu easy to extend.` },
      { title: 'Hover-intent timing', text: `A 160ms close delay, cleared when the pointer enters the panel, keeps the menu open across the diagonal trigger-to-panel move.` },
      { title: 'Click and keyboard support', text: `Triggers are clickable (with stopPropagation) and Escape closes the menu, so it is not hover-only.` },
      { title: 'composedPath outside-click', text: `Outside-click detection uses e.composedPath() so it survives the panel repainting its contents.` },
      { title: 'Animated reveal', text: `The panel fades and slides down with pointer-events off while hidden so it never blocks the page.` },
      { title: 'Responsive stacking', text: `Under 720px the panel becomes single-column and the grid stacks for mobile.` },
    ],
    useCases: [
      { title: 'Product and SaaS navigation', text: `Organise many destinations into scannable groups with a featured callout — pair with a [mega footer](/ui-snippets/mega-footer/) for the bottom of the page.` },
      { title: 'E-commerce category menus', text: `Show product categories and a promoted collection in one panel; compare with a [mega menu](/ui-snippets/mega-menu/) variant.` },
      { title: 'Documentation and developer sites', text: `Group products, solutions, and resources with descriptions so visitors find the right section fast.` },
      { title: 'Enterprise and agency sites', text: `Present solutions-by-industry and use-case grids with a guide promo, the way large B2B sites do.` },
      { title: 'Marketing site headers', text: `Replace a cramped dropdown with an organised panel; complements a [fullscreen menu](/ui-snippets/fullscreen-menu/) for mobile.` },
      { title: 'Learning mega-menu UX', text: `A reference for hover-intent timing, data-driven panel swapping, and accessible click/keyboard dropdown behaviour.` },
      { icon: 'CODE', title: 'Related: Page Minimap', desc: 'See the [Page Minimap](/ui-snippets/page-minimap/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does hover intent stop the menu from flickering shut?', a: `Leaving a nav item does not close the menu immediately — it starts a 160ms setTimeout to close. If the pointer enters the panel (or another trigger) within that window, the timer is cleared and the menu stays open. This handles the common case of moving diagonally from the trigger down into the panel, where the cursor briefly leaves the trigger. Without the delay, that movement would close the menu before you reached it.` },
      { q: 'How do I add a new top-level menu?', a: `Add a <li class="mmp-item" data-menu="resources"> with a trigger button to the nav, then add a matching resources key to the MENUS object with its cells array and feature promo. The script wires every .mmp-item[data-menu] automatically and paints from MENUS[key], so no other code changes are needed — the new menu opens, paints, and closes like the others.` },
      { q: 'Is the mega menu usable on touch and keyboard?', a: `Yes. It is not hover-only: each trigger is clickable and toggles its menu, so touch users can tap to open. The trigger uses stopPropagation so its tap does not immediately trigger the outside-click close. Escape closes the menu, triggers carry aria-haspopup and aria-expanded, and on mobile (under 720px) the panel stacks to one column. For full keyboard menu navigation you can add arrow-key handling between cells.` },
      { q: 'Why does the panel use one shared element instead of one per menu?', a: `A single panel that repaints its contents keeps the DOM lightweight (one node, not one per top-level item) and means the open/close animation and positioning logic exist once. The paint() function swaps in the right menu's cells and feature from the MENUS data when you open it. This is more maintainable and scales better than duplicating panel markup for every menu.` },
      { q: 'How do I use this mega menu in React, Vue, or Angular?', a: `Store openKey in state and render the panel's cells/feature from a MENUS map keyed by it. Triggers set openKey on click and on mouseenter; mouseleave starts a close timeout you keep in a ref and clear on the panel's mouseenter. Add a document click listener (outside the nav) and an Escape handler in an effect, cleaned up on unmount. Bind .open and aria-expanded to openKey comparisons. The CSS — layout, reveal, color-mix icons — ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to reconstruct the single-shared-panel architecture by inspecting the DOM alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why there is one mmpPanel element repainted by paint(openKey) rather than one panel per top-level nav item, and how the 160ms scheduleClose timer combined with clearTimeout on the panel's own mouseenter creates the hover bridge that prevents flicker when the cursor moves diagonally from trigger to panel. The same assistant can help optimize it, for instance asking whether rebuilding the entire grid.innerHTML string on every openMenu call is wasteful compared to caching each menu's rendered HTML the first time it's painted. It is also useful for extending the menu: ask it to add arrow-key navigation between the cells inside an open panel, support a third or fourth top-level mega menu by extending the MENUS object, or make the panel width responsive to the number of cells rather than a fixed 260px feature column. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "mega menu" navigation bar in plain HTML, CSS, and JavaScript with no libraries, using one shared dropdown panel repainted per top-level menu item rather than one panel per item.

Requirements:
- A nav bar with a brand mark, several top-level items where at least two are buttons with aria-haspopup and aria-expanded attributes (identified by a data-menu key), plus a single shared panel element positioned to span the nav.
- A data object keyed by each menu's identifier, where each entry defines an array of link "cells" (icon, accent color, title, description) and a single featured promo block (background, tag, title, link text).
- A paint function that, given a menu key, rebuilds the shared panel's link grid and featured promo entirely from that key's data, so opening a different top-level item swaps the panel's content without creating or destroying any panel DOM nodes.
- Opening a menu must work on both mouseenter (immediate) and click (toggle), and the panel must visually track which trigger is active by recoloring it and rotating its chevron icon.
- Closing on mouseleave must not happen instantly: leaving a trigger or the panel itself must schedule a close after a short delay (roughly 150-200ms), and entering either the panel or any trigger during that delay must cancel the pending close, so moving the cursor diagonally from the trigger down into the panel never causes a flicker.
- A document-level click listener must close the open menu when a click lands outside the whole nav (using a technique that correctly detects "outside" even though the panel's contents are being repainted), and a keydown listener must close the menu on Escape from anywhere on the page.
- The closed panel must be invisible and non-interactive (no pointer events) so it never blocks clicks on the page content beneath it, and the open panel must animate in with a fade and a slight vertical shift.`,
    },
  },
};

export default megaMenuPanel;
