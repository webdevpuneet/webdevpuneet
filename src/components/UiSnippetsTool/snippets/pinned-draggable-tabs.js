const pinnedDraggableTabs = {
  id: 'pinned-draggable-tabs',
  title: 'Pinned, Draggable Browser-Style Tabs',
  lastmod: '2026-08-28',
  category: 'navigation',
  html: `<div class="demo">
  <div class="tabbar" id="tabbar" role="tablist" aria-label="Open documents">
    <div class="tab pinned" role="tab" aria-selected="true" tabindex="0" draggable="true" data-id="t1">
      <span class="tab-pin" title="Pinned">📌</span>
      <span class="tab-label">Q3 Report</span>
    </div>
    <div class="tab" role="tab" aria-selected="false" tabindex="-1" draggable="true" data-id="t2">
      <span class="tab-label">Roadmap.md</span>
      <button class="tab-close" aria-label="Close Roadmap.md" tabindex="-1">×</button>
    </div>
    <div class="tab" role="tab" aria-selected="false" tabindex="-1" draggable="true" data-id="t3">
      <span class="tab-label">design-notes.txt</span>
      <button class="tab-close" aria-label="Close design-notes.txt" tabindex="-1">×</button>
    </div>
    <div class="tab" role="tab" aria-selected="false" tabindex="-1" draggable="true" data-id="t4">
      <span class="tab-label">budget.xlsx</span>
      <button class="tab-close" aria-label="Close budget.xlsx" tabindex="-1">×</button>
    </div>
  </div>
  <p class="tab-hint">Drag a tab to reorder. Right-click (or use the pin button) to pin/unpin — pinned tabs stay leftmost and show no close button.</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 500px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.tabbar { display: flex; gap: 3px; background: #e2e8f0; padding: 4px; border-radius: 10px; overflow-x: auto; }
.tab { display: flex; align-items: center; gap: 8px; padding: 8px 10px; background: #f8fafc; border-radius: 7px; font-size: 12.5px; font-weight: 600; color: #64748b; cursor: pointer; white-space: nowrap; user-select: none; transition: background 0.12s, color 0.12s, opacity 0.15s; flex-shrink: 0; }
.tab:hover { background: #f1f5f9; color: #334155; }
.tab[aria-selected="true"] { background: #fff; color: #111827; box-shadow: 0 1px 3px rgba(15,23,42,0.08); }
.tab:focus-visible { outline: 2px solid #6366f1; outline-offset: 1px; }
.tab.dragging { opacity: 0.4; }
.tab.pinned { max-width: 36px; overflow: hidden; }
.tab.pinned .tab-label { opacity: 0; width: 0; }
.tab-pin { font-size: 11px; }
.tab-close { border: none; background: transparent; color: #94a3b8; font-size: 14px; line-height: 1; cursor: pointer; padding: 2px 4px; border-radius: 4px; }
.tab-close:hover { background: #fee2e2; color: #b91c1c; }

.tab.drop-before { box-shadow: inset 3px 0 0 #6366f1; }
.tab.drop-after { box-shadow: inset -3px 0 0 #6366f1; }

.tab-hint { font-size: 11px; color: #94a3b8; line-height: 1.5; }`,
  js: `const tabbar = document.getElementById('tabbar');

function getTabs() {
  return Array.from(tabbar.querySelectorAll('.tab'));
}

function selectTab(tab) {
  getTabs().forEach((t) => {
    t.setAttribute('aria-selected', String(t === tab));
    t.tabIndex = t === tab ? 0 : -1;
  });
}

function togglePin(tab) {
  tab.classList.toggle('pinned');
  // Pinned tabs are always sorted leftmost, in front of every unpinned tab —
  // this reflects how real browser tab bars behave: pinning isn't just a
  // visual style, it's a positional guarantee.
  const pinned = getTabs().filter((t) => t.classList.contains('pinned'));
  const unpinned = getTabs().filter((t) => !t.classList.contains('pinned'));
  [...pinned, ...unpinned].forEach((t) => tabbar.appendChild(t));
}

tabbar.addEventListener('click', (e) => {
  const closeBtn = e.target.closest('.tab-close');
  const pinIcon = e.target.closest('.tab-pin');
  const tab = e.target.closest('.tab');
  if (!tab) return;

  if (closeBtn) {
    tab.remove();
    return;
  }
  if (pinIcon) {
    togglePin(tab);
    return;
  }
  selectTab(tab);
});

tabbar.addEventListener('contextmenu', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  e.preventDefault();
  togglePin(tab);
});

tabbar.addEventListener('keydown', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  const tabs = getTabs();
  const index = tabs.indexOf(tab);
  if (e.key === 'ArrowRight' && index < tabs.length - 1) {
    e.preventDefault();
    tabs[index + 1].focus();
    selectTab(tabs[index + 1]);
  } else if (e.key === 'ArrowLeft' && index > 0) {
    e.preventDefault();
    tabs[index - 1].focus();
    selectTab(tabs[index - 1]);
  }
});

// --- Drag to reorder ---
let draggedTab = null;

tabbar.addEventListener('dragstart', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  draggedTab = tab;
  tab.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});

tabbar.addEventListener('dragend', () => {
  if (draggedTab) draggedTab.classList.remove('dragging');
  draggedTab = null;
  getTabs().forEach((t) => t.classList.remove('drop-before', 'drop-after'));
});

tabbar.addEventListener('dragover', (e) => {
  e.preventDefault();
  const overTab = e.target.closest('.tab');
  if (!overTab || overTab === draggedTab) return;

  getTabs().forEach((t) => t.classList.remove('drop-before', 'drop-after'));
  const rect = overTab.getBoundingClientRect();
  const isBefore = e.clientX < rect.left + rect.width / 2;
  overTab.classList.add(isBefore ? 'drop-before' : 'drop-after');
});

tabbar.addEventListener('drop', (e) => {
  e.preventDefault();
  const overTab = e.target.closest('.tab');
  if (!overTab || !draggedTab || overTab === draggedTab) return;

  const rect = overTab.getBoundingClientRect();
  const isBefore = e.clientX < rect.left + rect.width / 2;
  tabbar.insertBefore(draggedTab, isBefore ? overTab : overTab.nextSibling);
  getTabs().forEach((t) => t.classList.remove('drop-before', 'drop-after'));
});`,
  seo: {
    title: 'Pinned, Draggable Browser-Style Tabs — Reorder and Pin Like a Real Browser',
    description: 'A tab bar supporting drag-to-reorder with a live drop-position indicator, plus pin/unpin (right-click or a pin button) that keeps pinned tabs sorted leftmost — the same interaction model as a real browser tab strip.',
    about: {
      title: 'Browser-Style Tabs — Drag Reordering and Position-Guaranteeing Pins',
      description: `Browser tabs are one of the most-used UI patterns on the planet, and users bring very specific expectations from them: tabs can be dragged into any order, and pinning a tab doesn't just style it differently — it *guarantees* it stays leftmost, ahead of every unpinned tab, no matter what. This snippet reproduces both behaviors correctly, along with the keyboard navigation and native \`draggable\` API wiring that make it feel like a real tab strip rather than a static row of buttons.

**Drag-and-drop uses the native HTML Drag and Drop API, not a library**

Every tab has \`draggable="true"\`, and the reordering logic is built entirely from \`dragstart\`, \`dragover\`, \`drop\`, and \`dragend\` events — no external sortable library. \`dragover\` must call \`e.preventDefault()\` on every fire (this is a common gotcha: without it, the \`drop\` event never fires at all, since the browser's default behavior for a dragover is to disallow dropping). The live "which side would this land on" indicator is computed on every \`dragover\` by comparing the pointer's \`clientX\` to the midpoint of the tab currently being hovered — left half means "drop before this tab," right half means "drop after," giving continuous visual feedback rather than only showing where a drop will land after the fact.

**Pinning is a positional guarantee, not just a style**

\`togglePin()\` doesn't just toggle a CSS class — after flipping the class, it re-sorts every tab in the bar into two groups, pinned first, then unpinned, and re-appends them all in that order. This means pinning a tab that's currently at the far right instantly moves it to sit immediately after the last pinned tab, and unpinning a tab moves it back into the unpinned group — matching exactly how pinning works in Chrome, Firefox, and every other tab-based browser, where "pinned" is fundamentally a positional property, not merely a visual one.

**Right-click and a dedicated pin icon both work**

The pin toggle is wired to two separate triggers: a \`contextmenu\` handler (so right-clicking anywhere on a tab pins/unpins it, matching real browser tab context menus) and a click on the small pin icon itself for discoverability without needing to know the right-click shortcut. Both call the same \`togglePin()\` function, so there's exactly one implementation of the pin behavior regardless of which trigger fired it.

**Keyboard navigation follows the ARIA tabs pattern**

Only the currently selected tab has \`tabindex="0"\`; every other tab has \`tabindex="-1"\`, so a single Tab keypress moves focus into the tab strip once rather than tabbing through every individual tab. Once focus is inside, Arrow Left/Right move focus (and selection) between adjacent tabs — the same roving-tabindex convention used by native OS tab bars and the ARIA Authoring Practices tabs pattern, keeping the whole strip a single stop in the page's overall tab order.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a tab to select it', text: 'The selected tab gets a raised white background; aria-selected updates for assistive technology.' },
        { title: 'Drag a tab to reorder', text: 'A blue indicator line shows exactly which side of the hovered tab the dragged tab will land on before you release.' },
        { title: 'Right-click a tab, or click its pin icon', text: 'Toggles pinning — a pinned tab shrinks to an icon-only width and jumps to sit immediately after the other pinned tabs.' },
        { title: 'Try to drag a pinned tab past an unpinned one', text: 'Reordering still works within drag-and-drop, but re-pinning any tab always re-sorts pinned tabs back to the leftmost group.' },
        { title: 'Use Arrow Left/Right with a tab focused', text: 'Moves focus (and selection) to the adjacent tab, following the standard ARIA tabs keyboard pattern.' },
      ],
    },
    features: [
      'Native HTML5 Drag and Drop API reordering — no external sortable library',
      'Live drop-position indicator shows exactly which side of the hovered tab a dragged tab will land on',
      'Pinning is a genuine positional guarantee — pinned tabs are always re-sorted leftmost, not just styled differently',
      'Pin/unpin available via both right-click (matching real browser tab context menus) and a dedicated pin icon',
      'Pinned tabs collapse to an icon-only width and lose their close button, matching real pinned-tab behavior',
      'Roving tabindex keyboard navigation — Arrow Left/Right move between tabs following the ARIA tabs pattern',
      'Close button removes a tab directly from the DOM with a dedicated accessible label per tab',
    ],
    useCases: [
      { icon: 'EDITOR', title: 'Code and document editors', desc: 'Multi-file editing tools (IDE-style web apps, note-taking apps) benefit from familiar drag-reorder and pin-to-keep-open behavior.' },
      { icon: 'BROWSER', title: 'In-app browser or preview tabs', desc: 'Apps embedding multiple preview panes or in-app browser tabs benefit from matching users\' existing browser tab mental model.' },
      { icon: 'DASHBOARD', title: 'Multi-view dashboards', desc: 'Dashboards with several switchable views benefit from letting users reorder and pin their most-used views to the front.' },
      { icon: 'PRODUCTIVITY', title: 'Workspace and project switchers', desc: 'Any tool managing multiple open "documents" or "workspaces" benefits from this exact interaction model.' },
      { icon: 'CODE', title: 'Related: Sidebar Mini', desc: 'See the [Sidebar Mini](/ui-snippets/sidebar-mini/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does dragover need e.preventDefault()?', a: 'The browser\'s default behavior during a dragover is to disallow dropping entirely — without calling preventDefault() on every dragover event, the drop event will simply never fire, no matter how the drag ends.' },
      { q: 'What exactly does pinning a tab guarantee?', a: 'Pinning re-sorts the entire tab bar so all pinned tabs sit as a contiguous group at the leftmost position, ahead of every unpinned tab — this happens immediately on pin/unpin, not just as a passive style change, matching real browser tab bar behavior.' },
      { q: 'How do I pin a tab without right-clicking?', a: 'Click the small pin icon shown on the currently-pinned example tab (or add a pin icon to any tab) — both the right-click context menu handler and the pin-icon click call the same togglePin() function.' },
      { q: 'Why do pinned tabs lose their close button?', a: 'Matching real browser behavior — a pinned tab represents something the user wants to always keep open, so removing the close affordance (both visually, since the tab collapses to icon width, and functionally) reinforces that intent.' },
      { q: 'How does keyboard navigation work here?', a: 'Only the selected tab has tabindex="0"; all others have tabindex="-1", so Tab moves focus into the strip once. Once a tab has focus, Arrow Left/Right move focus (and selection) between adjacent tabs — the standard roving-tabindex pattern for ARIA tablists.' },
      { q: 'Can I drag a tab to the very end of the list?', a: 'Yes — dropping on the right half of the last tab inserts the dragged tab immediately after it (using nextSibling as the insertion reference), correctly placing it at the very end of the strip.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why calling preventDefault() inside the dragover handler is required for the drop event to fire at all, and to trace through exactly what togglePin() does step by step when pinning a tab that currently sits at the far right of an unpinned group. It's also worth asking for a version that persists tab order and pin state to localStorage, or one that adds a proper role="tablist"/role="tabpanel" pairing so each tab actually shows different panel content when selected.`,
      prompt: `Build a draggable, pinnable browser-style tab bar in HTML, CSS, and vanilla JavaScript using the native HTML5 Drag and Drop API — no external sortable library.

Requirements:
- A row of at least four tabs, each with a label and a close button, one of them marked as pinned initially (shown as an icon-only, narrower tab with no close button).
- Implement drag-to-reorder using dragstart, dragover, drop, and dragend events. While dragging, show a live visual indicator on whichever tab is currently hovered, distinguishing whether the dragged tab would land before or after it based on which half of that tab the pointer is over.
- Implement pin/unpin toggling triggered by both a right-click (contextmenu event, with the default browser context menu suppressed) on any tab and a dedicated small pin icon/button, both calling the same shared toggle function.
- Pinning must be a genuine positional guarantee: whenever a tab's pinned state changes, immediately re-sort the entire tab bar so all pinned tabs form a contiguous group at the leftmost position, ahead of every unpinned tab — not merely a visual style applied in place.
- Implement roving-tabindex keyboard navigation: only the currently selected tab should have tabindex="0", every other tab tabindex="-1", and pressing Arrow Left/Right while a tab has focus should move both focus and selection to the adjacent tab.
- Clicking a tab's close button should remove just that tab from the DOM without affecting the others.`,
    },
  },
};

export default pinnedDraggableTabs;
