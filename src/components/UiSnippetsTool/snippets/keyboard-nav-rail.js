const keyboardNavRail = {
  id: 'keyboard-nav-rail',
  title: 'Keyboard-Navigable Icon Rail',
  lastmod: '2026-08-08',
  category: 'navigation',
  html: `<div class="demo-wrap">
  <nav class="icon-rail" role="navigation" aria-label="Primary" id="icon-rail">
    <button class="rail-item" data-label="Home" aria-current="page" tabindex="0">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9.5 12 3l9 6.5"/><path d="M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10"/></svg>
      <span class="rail-tooltip">Home</span>
    </button>
    <button class="rail-item" data-label="Search" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <span class="rail-tooltip">Search</span>
    </button>
    <button class="rail-item" data-label="Projects" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
      <span class="rail-tooltip">Projects</span>
    </button>
    <button class="rail-item" data-label="Messages" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
      <span class="rail-tooltip">Messages</span>
    </button>
    <button class="rail-item" data-label="Analytics" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      <span class="rail-tooltip">Analytics</span>
    </button>
    <button class="rail-item" data-label="Settings" tabindex="-1">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      <span class="rail-tooltip">Settings</span>
    </button>
  </nav>
  <div class="rail-hint">Use <kbd>&uarr;</kbd> <kbd>&darr;</kbd> to navigate, <kbd>Enter</kbd> to select</div>
  <div class="rail-status" id="rail-status">Active section: <strong id="active-label">Home</strong></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; gap: 18px; padding: 24px; }

.icon-rail {
  display: flex; flex-direction: column; gap: 6px;
  background: #1e293b; padding: 12px 8px; border-radius: 16px;
  box-shadow: 0 8px 28px rgba(15,23,42,0.18);
}

.rail-item {
  position: relative;
  width: 44px; height: 44px;
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 10px;
  color: #94a3b8; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.rail-item:hover { background: #334155; color: #f1f5f9; }
.rail-item:focus-visible { outline: 2px solid #818cf8; outline-offset: 2px; }

.rail-item[aria-current="page"] {
  background: #6366f1; color: #fff;
}
.rail-item[aria-current="page"]:hover { background: #6366f1; }

.rail-tooltip {
  position: absolute; left: calc(100% + 10px); top: 50%;
  transform: translateY(-50%) translateX(-4px);
  background: #0f172a; color: #f1f5f9;
  font-size: 12px; font-weight: 600;
  padding: 5px 10px; border-radius: 6px;
  white-space: nowrap;
  opacity: 0; pointer-events: none;
  transition: opacity 0.15s, transform 0.15s;
  z-index: 10;
}
.rail-item:hover .rail-tooltip,
.rail-item:focus-visible .rail-tooltip {
  opacity: 1; transform: translateY(-50%) translateX(0);
}

.rail-hint {
  font-size: 12px; color: #64748b;
  display: flex; align-items: center; gap: 4px; flex-wrap: wrap; justify-content: center;
}
kbd {
  background: #fff; border: 1px solid #cbd5e1; border-bottom-width: 2px;
  border-radius: 5px; padding: 2px 6px; font-size: 11px; font-family: inherit;
  color: #334155;
}

.rail-status { font-size: 12px; color: #475569; }
.rail-status strong { color: #6366f1; }`,
  js: `const rail = document.getElementById('icon-rail');
const items = Array.from(rail.querySelectorAll('.rail-item'));
const statusLabel = document.getElementById('active-label');

let activeIndex = 0; // currently "selected" (aria-current) item
let focusIndex = 0;  // currently roving-tabindex focused item

function setRovingTabindex(newFocusIndex) {
  items[focusIndex].setAttribute('tabindex', '-1');
  focusIndex = newFocusIndex;
  items[focusIndex].setAttribute('tabindex', '0');
  items[focusIndex].focus();
}

function selectItem(index) {
  items[activeIndex].removeAttribute('aria-current');
  activeIndex = index;
  items[activeIndex].setAttribute('aria-current', 'page');
  statusLabel.textContent = items[activeIndex].dataset.label;
}

rail.addEventListener('keydown', (e) => {
  const currentIndex = items.indexOf(document.activeElement);
  const from = currentIndex === -1 ? focusIndex : currentIndex;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    setRovingTabindex((from + 1) % items.length);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    setRovingTabindex((from - 1 + items.length) % items.length);
  } else if (e.key === 'Home') {
    e.preventDefault();
    setRovingTabindex(0);
  } else if (e.key === 'End') {
    e.preventDefault();
    setRovingTabindex(items.length - 1);
  } else if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    selectItem(from);
  }
});

items.forEach((item, index) => {
  item.addEventListener('click', () => {
    setRovingTabindex(index);
    selectItem(index);
  });
});`,
  seo: {
    title: 'Keyboard-Navigable Icon Rail — Free HTML CSS JS Snippet',
    description: 'Accessible vertical icon nav rail with roving tabindex, arrow-key navigation, and aria-current styling. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Keyboard-Navigable Icon Rail — Roving Tabindex, Arrow Key Navigation & ARIA Toolbar Pattern',
      description: `Icon-only navigation rails are everywhere in 2026 product design — Linear, Figma, Notion, and most modern SaaS dashboards collapse primary navigation into a slim vertical strip of icons to maximize canvas space. The visual pattern is easy to copy; the accessibility pattern behind it almost never is. This snippet implements the icon rail exactly as the WAI-ARIA Authoring Practices Guide specifies for a toolbar or single-select navigation widget: **roving tabindex**, not a flat list of independently tabbable buttons.

**Why roving tabindex instead of plain Tab order**

The naive implementation gives every icon button its own place in the page's Tab order, so a keyboard user has to press Tab six separate times just to get past the sidebar before reaching page content — a real and common source of keyboard-only user frustration. The roving tabindex pattern solves this by keeping exactly one item in the natural Tab sequence at any moment (\`tabindex="0"\`) while every other item is removed from it (\`tabindex="-1"\`, meaning "focusable via script, not via Tab"). Tab into the rail once, and the browser lands on whichever item currently holds \`tabindex="0"\` — by default, the active item. From there, Arrow Up and Arrow Down move focus *within* the rail without ever touching the page's Tab order, and pressing Tab again exits the rail entirely and moves to the next focusable region of the page. This is the same interaction model used by native OS toolbars, browser tab strips, and radio-button groups, and it's codified in the ARIA APG's "Navigation" and "Toolbar" patterns.

**How the JavaScript keeps state in sync**

Two separate indices are tracked: \`focusIndex\`, which item currently owns \`tabindex="0"\` (keyboard focus position), and \`activeIndex\`, which item is the "selected" page (\`aria-current="page"\`). These are deliberately distinct — a sighted keyboard user should be able to arrow through the rail to preview items without those arrow presses actually navigating anywhere, exactly like arrowing through a native \`<select>\` doesn't submit a form until you commit. \`setRovingTabindex()\` flips \`tabindex\` from the old focus item to the new one and calls \`.focus()\`, while \`selectItem()\` is only called on Enter, Space, or a mouse click, moving the \`aria-current="page"\` attribute (and its accompanying purple background style) to the newly committed item. \`Home\` and \`End\` keys jump focus to the first and last item respectively, matching the APG spec for composite widgets.

**Discoverability: the on-screen hint**

A hidden interaction pattern is a broken interaction pattern for most users. This is why the demo includes a small, permanently visible hint row — "Use ↑ ↓ to navigate, Enter to select" — rendered with styled \`<kbd>\` elements that mimic physical keycaps. Production interfaces that rely on keyboard shortcuts without any on-screen affordance (or at minimum a hover tooltip, a help panel, or a "?" shortcut overlay) systematically under-perform on usability testing, because most users — even keyboard-proficient ones — do not attempt undocumented key combinations. Making the shortcut visible costs twelve words of screen real estate and materially increases how many users discover and use it.

**Tooltips and aria-current styling**

Because the rail carries no visible text labels, each button includes a \`.rail-tooltip\` span holding the item's name, revealed on both \`:hover\` and \`:focus-visible\` via an opacity and \`translateX\` transition — critical, because a hover-only tooltip is invisible to keyboard users, defeating an otherwise fully keyboard-operable component. The active item is styled through the \`aria-current="page"\` attribute selector directly (\`.rail-item[aria-current="page"]\`) rather than a separate \`.active\` CSS class, which keeps the semantic state and the visual state a single source of truth — screen readers announce "current page" automatically, and there's no risk of the ARIA attribute and the CSS class drifting out of sync during a refactor.

**Why this matters for 2026 accessibility baselines**

Keyboard-first design has moved from a compliance checkbox to a baseline expectation, driven by WCAG 2.2's stronger focus-visibility requirements, growing enterprise procurement requirements around accessibility conformance, and simply better product craft. An icon rail with correct roving-tabindex semantics, visible focus rings, tooltip-on-focus, and a documented shortcut is the kind of detail that separates a genuinely accessible navigation component from one that merely looks accessible.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Tab into the rail', text: 'Press Tab from anywhere on the page — focus lands on whichever item currently has tabindex="0" (Home, by default), not on every icon individually, because only one item is in the natural Tab order at a time.' },
        { title: 'Arrow through items', text: 'With focus inside the rail, press ArrowDown or ArrowUp to move the roving tabindex between icons via setRovingTabindex(). Home and End jump to the first and last item respectively.' },
        { title: 'Activate with Enter or Space', text: 'Press Enter or Space to commit the focused item as the active page — this moves aria-current="page" and its purple highlight to that item via selectItem(), separately from keyboard focus position.' },
        { title: 'Check the tooltip on hover or focus', text: 'Each icon reveals a .rail-tooltip label on both :hover and :focus-visible, so keyboard users get the same text disclosure as mouse users, not just a sighted-mouse-only affordance.' },
        { title: 'Read the on-screen hint', text: 'The "Use ↑ ↓ to navigate, Enter to select" row below the rail is intentionally always visible — remove it only if your product has a more discoverable shortcut-teaching mechanism elsewhere.' },
        { title: 'Add or remove rail items', text: 'Duplicate a .rail-item button in the HTML with a new SVG icon and data-label, keeping tabindex="-1" (only the first/active item should start as tabindex="0") — the JS automatically re-queries all .rail-item elements on load via querySelectorAll.' },
      ],
    },
    features: [
      'Roving tabindex pattern: exactly one item has tabindex="0" at any time, matching the WAI-ARIA APG toolbar/navigation spec',
      'ArrowUp/ArrowDown move focus within the rail; Home/End jump to first/last item; Enter/Space commits selection',
      'Separate focusIndex and activeIndex state so arrowing through items previews without navigating until committed',
      'aria-current="page" drives both the semantic active state and its CSS styling from a single source of truth',
      'Tooltip labels shown on both :hover and :focus-visible so keyboard-only users get the same disclosure as mouse users',
      'Always-visible on-screen keyboard hint using styled <kbd> elements for shortcut discoverability',
      'role="navigation" and aria-label="Primary" on the <nav> element for correct screen-reader landmark semantics',
      'Visible :focus-visible outline ring distinct from hover styling, satisfying WCAG 2.2 focus-appearance guidance',
    ],
    useCases: [
      { icon: 'APP', title: 'SaaS dashboard primary navigation', desc: 'Collapsed icon-only sidebars are standard in tools like Linear, Notion, and Figma to maximize canvas space for the main content area. This rail gives you the exact roving-tabindex interaction those products implement, so keyboard-only and screen-reader users get first-class navigation rather than a mouse-only imitation of the pattern.' },
      { icon: 'FORM', title: 'Enterprise software accessibility conformance', desc: 'Enterprise buyers increasingly require WCAG 2.2 AA conformance and VPAT documentation before procurement. A correctly implemented roving-tabindex navigation rail with visible focus states and aria-current semantics directly satisfies keyboard-operability and focus-visibility success criteria that auditors specifically test for.' },
      { icon: 'LEARN', title: 'Teaching the ARIA roving tabindex pattern', desc: 'This snippet is a compact, complete reference implementation of a pattern that is frequently described but rarely shown fully working — useful in frontend accessibility training, code review discussions, or as a linked example when explaining why "just make every button tabindex 0" is the wrong approach for composite widgets. See also the [Command Palette](/ui-snippets/command-palette) snippet for a related keyboard-first pattern.' },
      { icon: 'DESIGN', title: 'Design system navigation rail component', desc: 'Component libraries that ship an icon-rail primitive can use this as the accessibility-correct base implementation, then layer in badges, section dividers, or a collapsible label mode without touching the underlying keyboard and focus-management logic.' },
      { icon: 'FLOW', title: 'Multi-page app shells and admin panels', desc: 'Admin panels with five to eight top-level sections (dashboard, users, billing, settings, logs) commonly use a rail like this as a permanent shell element. Because the active item state is driven purely by aria-current, wiring it to real client-side routing is a matter of calling selectItem() on route change.' },
      { icon: 'CODE', title: 'Prototyping and design-to-code handoff', desc: 'Designers handing off an icon-rail Figma component to engineering can point to this snippet as the exact keyboard behavior expected, avoiding the common gap where the visual design is pixel-perfect but the interaction model silently degrades to mouse-only.' },
      { icon: 'CODE', title: 'Related: Nested Sidebar Nav with Active Path Auto-Expand', desc: 'See the [Nested Sidebar Nav with Active Path Auto-Expand](/ui-snippets/nested-sidebar-active-path-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is roving tabindex and why not just make every icon tabindex="0"?', a: 'Roving tabindex keeps only one element of a composite widget (like a toolbar, rail, or radio group) in the page\'s natural Tab order at a time, with every other item at tabindex="-1" (focusable via script, skipped by Tab). If every icon were tabindex="0", a user would need to press Tab six separate times just to pass the rail, and Arrow keys would have no special meaning. Roving tabindex means Tab enters and exits the rail once each, while arrow keys handle movement inside it — matching how native OS toolbars and the WAI-ARIA Authoring Practices Guide define composite widget navigation.' },
      { q: 'Why are there two separate index variables, focusIndex and activeIndex?', a: 'focusIndex tracks keyboard focus position (which item currently has tabindex="0"), while activeIndex tracks which item is actually selected as the current page (aria-current="page"). Keeping them separate lets a user arrow through the rail to preview each icon\'s tooltip without triggering navigation — only pressing Enter or Space (or clicking) calls selectItem() and commits the change, exactly like arrowing through a native <select> element does not submit anything until you commit.' },
      { q: 'How do keyboard-only users discover the arrow-key shortcut?', a: 'The demo includes a permanently visible hint line below the rail — "Use ↑ ↓ to navigate, Enter to select" — rendered with styled <kbd> elements. Undiscoverable keyboard shortcuts are effectively unused shortcuts for most users; a visible, low-cost hint materially increases adoption versus relying on users to guess or check documentation.' },
      { q: 'Do the tooltips work for keyboard users, not just mouse hover?', a: 'Yes — the CSS selector is `.rail-item:hover .rail-tooltip, .rail-item:focus-visible .rail-tooltip`, so the tooltip label appears identically whether the item is moused-over or reached via keyboard focus. A hover-only tooltip would leave keyboard users without the text label entirely, since the rail has no visible text by default.' },
      { q: 'How do I wire this to real client-side routing (Next.js, React Router)?', a: 'Replace the body of selectItem() with your router\'s navigation call (e.g. router.push(item.dataset.href)) and call selectItem(index) either on click or in a useEffect that syncs aria-current to the current route on mount and on route change, so the rail reflects the real active page even when navigation happens by URL rather than by clicking the rail.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how setRovingTabindex() and selectItem() divide responsibility between keyboard focus position and committed selection — that split is the core of the roving-tabindex pattern and worth understanding fully before you extend it. Ask the assistant to add support for a collapsible "expanded" mode that shows text labels alongside icons on wider viewports, to wire selectItem() into real client-side routing so aria-current reflects the actual current URL rather than only click/keyboard state, or to add a badge/notification-dot overlay on individual rail items (for something like unread message counts) without breaking the existing focus and tooltip behavior. It's also a good snippet to ask an AI assistant to accessibility-audit against the WAI-ARIA Authoring Practices Guide's navigation/toolbar pattern to confirm nothing was missed.`,
      prompt: `Build a vertical icon-only navigation rail in plain HTML, CSS, and JavaScript that is fully operable by keyboard using the roving tabindex pattern.

Requirements:
- 5-7 icon buttons in a vertical rail, each with a hidden text label exposed via a tooltip that appears identically on both mouse hover and keyboard focus (not hover-only).
- Implement roving tabindex correctly: only one item has tabindex="0" at any time; all others have tabindex="-1"; pressing Tab from outside the rail lands on the currently-focused item, not the first item in DOM order necessarily.
- ArrowDown and ArrowUp move keyboard focus between items (wrapping from last to first and vice versa); Home and End jump to the first and last item; Enter and Space commit the focused item as the active/selected page.
- Keep "focused" state and "selected/active" state as two distinct concepts — arrowing through items must not itself trigger navigation or change which item is marked active, only committing with Enter/Space/click should.
- The active item must be marked with aria-current="page" and styled distinctly (e.g. accent background color), with the CSS driven off that same ARIA attribute rather than a separate class, so semantics and styling can't drift out of sync.
- Include a small always-visible on-screen hint describing the keyboard shortcut, and correct landmark semantics (role="navigation" or a <nav> element with an aria-label) on the container.
- Add a visible focus ring (focus-visible) distinct from the hover style.`,
    },
  },
};
export default keyboardNavRail;
