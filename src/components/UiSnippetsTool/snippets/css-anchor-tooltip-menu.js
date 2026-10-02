const cssAnchorTooltipMenu = {
  id: 'css-anchor-tooltip-menu',
  title: 'CSS Anchor-Positioned Tooltip Menu',
  lastmod: '2026-08-22',
  category: 'navigation',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <p class="demo-note">The menu below is positioned relative to its trigger button using only the native CSS Anchor Positioning API (<code>anchor-name</code>, <code>position-anchor</code>, <code>anchor()</code>) &mdash; no JavaScript computes its coordinates in a supporting browser. In an unsupporting browser, a small JS fallback measures the button and positions the menu the old-fashioned way.</p>

  <div class="trigger-row">
    <button class="anchor-btn" id="anchorBtn" popovertarget="anchorMenu" aria-haspopup="menu">
      Account <span aria-hidden="true">&#9662;</span>
    </button>
  </div>

  <ul class="anchor-menu" id="anchorMenu" popover role="menu">
    <li role="none"><button role="menuitem" class="menu-item">Profile</button></li>
    <li role="none"><button role="menuitem" class="menu-item">Billing</button></li>
    <li role="none"><button role="menuitem" class="menu-item">Team settings</button></li>
    <li role="none" class="menu-divider"></li>
    <li role="none"><button role="menuitem" class="menu-item danger">Sign out</button></li>
  </ul>

  <div class="fallback-badge" id="fallbackBadge" hidden>JS fallback positioning active (anchor-name unsupported here)</div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #0d0f1a; color: #dfe1f0; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 480px; margin: 0 auto; padding: 60px 20px 220px; }
.demo-note { font-size: 12.5px; color: #8b91b0; line-height: 1.6; background: #12131f; border: 1px solid #232a3d; border-radius: 10px; padding: 12px 14px; margin-bottom: 28px; }
.demo-note code { font-family: 'SFMono-Regular', Consolas, monospace; color: #a78bfa; }

.trigger-row { display: flex; }
.anchor-btn {
  font-family: inherit; font-size: 13.5px; font-weight: 700;
  background: #1c2138; color: #dfe1f5; border: 1px solid #323966;
  padding: 10px 16px; border-radius: 9px; cursor: pointer;
  display: flex; align-items: center; gap: 6px;

  /* Names this button as an anchor other elements can position against.
     A plain custom-ident, scoped to this element only. */
  anchor-name: --account-anchor;
}
.anchor-btn:hover { border-color: #6366f1; }
.anchor-btn:focus-visible { outline: 3px solid #6366f1; outline-offset: 2px; }

.anchor-menu {
  list-style: none;
  margin: 0;
  width: 220px;
  background: #171a28;
  border: 1px solid #2c3350;
  border-radius: 12px;
  padding: 6px;
  box-shadow: 0 20px 50px rgba(0,0,0,0.45);
  /* Popover API resets browser default UA styling for [popover] */
  color: inherit;
}
.anchor-menu:not(:popover-open) { display: none; }

.menu-item {
  width: 100%; text-align: left;
  font-family: inherit; font-size: 13.5px; font-weight: 600;
  background: transparent; color: #dfe1f5; border: none;
  padding: 9px 12px; border-radius: 8px; cursor: pointer;
}
.menu-item:hover { background: #232a45; }
.menu-item:focus-visible { outline: 2px solid #6366f1; outline-offset: -2px; }
.menu-item.danger { color: #fca5a5; }
.menu-divider { height: 1px; background: #2c3350; margin: 6px 4px; }

.fallback-badge { margin-top: 14px; font-size: 11.5px; color: #fbbf24; background: #2a2210; border: 1px solid #4d3e12; border-radius: 8px; padding: 8px 12px; display: inline-block; }

/* ---- Native CSS Anchor Positioning ----
   position-anchor ties this element to the anchor-name declared above;
   the anchor() function then reads that anchor's edges directly in CSS,
   with no JS measuring pass. This is a genuinely new API: full support
   landed in Chrome/Edge 125+ (2024); as of 2026 it is NOT yet supported
   in Firefox or Safari, both still tracking the spec. */
@supports (anchor-name: --a) {
  .anchor-menu {
    position: fixed;
    position-anchor: --account-anchor;
    top: anchor(--account-anchor bottom);
    left: anchor(--account-anchor left);
    margin-top: 8px;
  }
}`,

  js: `const anchorBtn = document.getElementById('anchorBtn');
const anchorMenu = document.getElementById('anchorMenu');
const fallbackBadge = document.getElementById('fallbackBadge');

// Feature-detect the Anchor Positioning API. If the browser doesn't
// understand anchor-name, CSS.supports reports it and we fall back to a
// plain JS-computed position instead of leaving the menu mispositioned.
const supportsAnchorPositioning =
  typeof CSS !== 'undefined' && CSS.supports && CSS.supports('anchor-name: --a');

if (!supportsAnchorPositioning) {
  fallbackBadge.hidden = false;

  function positionMenuManually() {
    const rect = anchorBtn.getBoundingClientRect();
    anchorMenu.style.position = 'fixed';
    anchorMenu.style.top = (rect.bottom + 8) + 'px';
    anchorMenu.style.left = rect.left + 'px';
    anchorMenu.style.margin = '0';
  }

  anchorBtn.addEventListener('click', () => {
    // The popover API itself (open/close/light-dismiss) is broadly
    // supported independent of anchor positioning, so we only need to
    // patch the *position*, not the show/hide behavior.
    requestAnimationFrame(positionMenuManually);
  });
  window.addEventListener('resize', () => {
    if (anchorMenu.matches(':popover-open')) positionMenuManually();
  });
  window.addEventListener('scroll', () => {
    if (anchorMenu.matches(':popover-open')) positionMenuManually();
  }, true);
}`,

  seo: {
    title: 'CSS Anchor-Positioned Tooltip Menu — Free Native Anchor Positioning Demo',
    description: `A dropdown menu positioned relative to its trigger button using the native CSS Anchor Positioning API (anchor-name, anchor()) instead of JavaScript, with a JS fallback for unsupported browsers. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CSS Anchor-Positioned Tooltip Menu — Positioning a Popover With Pure CSS',
      description: `Every dropdown, tooltip, and popover library on the web has historically needed JavaScript to compute where the floating element should sit relative to its trigger — measuring the trigger's \`getBoundingClientRect()\`, accounting for scroll and viewport edges, and repositioning on every resize. The CSS Anchor Positioning API changes that for browsers that support it: an element can be tied to another element's edges directly in CSS, with the browser recalculating position on scroll, resize, and layout changes automatically.

**The three pieces: anchor-name, position-anchor, anchor()**

The trigger button declares \`anchor-name: --account-anchor\`, a custom-ident that names it as an anchor other elements can reference. The menu then sets \`position-anchor: --account-anchor\` to link itself to that specific anchor, and uses the \`anchor()\` function inside its \`top\`/\`left\` values — \`top: anchor(--account-anchor bottom)\` reads the anchor's bottom edge directly, and \`left: anchor(--account-anchor left)\` reads its left edge — so the menu's position is expressed declaratively against the button's real, live layout box, not a JS-computed snapshot.

**Paired with the Popover API**

This menu also uses the native \`popover\` attribute and \`popovertarget\` (see [the native popover API demo](/ui-snippets/native-popover-api-demo/) for that piece in isolation) for the actual show/hide and light-dismiss behavior — clicking outside or pressing Escape closes it natively, with zero JS event listeners for that part. Anchor positioning and the Popover API are separate specs that happen to compose extremely well together: popover handles *whether* the menu is visible, anchor positioning handles *where* it sits.

**Honest support status**

Anchor Positioning is genuinely new and, as of 2026, Chromium-only: full support landed in Chrome and Edge 125 in 2024, but Firefox and Safari have not shipped it yet, both still tracking the specification. This is not a "safe everywhere with a vendor prefix" situation — it's an active, ongoing rollout. This snippet feature-detects with \`CSS.supports('anchor-name: --a')\` in JavaScript and, when unsupported, falls back to a small manual positioning routine using \`getBoundingClientRect()\`, re-run on open, resize, and scroll — the exact JS logic that anchor positioning exists to eventually make unnecessary.

**Why bother with anchor positioning if you still need a JS fallback today**

Even with a required fallback in 2026, the CSS-only path is worth adopting incrementally: browsers that support it get automatically correct positioning through scroll, resize, and dynamic content changes with no listeners at all, which is strictly less code running and fewer edge cases than a fully JS-driven solution — while the fallback guarantees nothing breaks elsewhere. As support broadens, the fallback branch simply stops running, and you can eventually delete it. Pair this with [the native dialog showcase](/ui-snippets/native-dialog-showcase/) or [the anchor positioning menu](/ui-snippets/anchor-positioning-menu/) for more of this same emerging pattern.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Account"', text: `The menu opens via the native Popover API, positioned just below the button.` },
      { title: 'Check for the fallback badge', text: `In a browser without Anchor Positioning support, a yellow badge confirms JS fallback positioning is active.` },
      { title: 'Resize or scroll while it is open', text: `In a supporting browser, CSS repositions it automatically; in the fallback, a resize/scroll listener recalculates it.` },
      { title: 'Press Escape or click outside', text: `The popover light-dismisses natively, independent of the positioning method.` },
      { title: 'Inspect anchor-name and anchor()', text: `See how top/left read the button's live edges directly in CSS.` },
      { title: 'Swap the anchor edge', text: `Change anchor(--account-anchor bottom) to top/right/left to reposition the menu.` },
    ] },
    features: [
      { title: 'Pure CSS positioning', text: `anchor-name + anchor() place the menu with zero JS in supporting browsers.` },
      { title: 'Native Popover API', text: `Show/hide and light-dismiss handled by the browser, not custom listeners.` },
      { title: 'Feature-detected fallback', text: `CSS.supports("anchor-name: --a") gates a JS positioning routine.` },
      { title: 'Fallback tracks resize/scroll', text: `Manual positioning recalculates exactly when the anchor could move.` },
      { title: 'Visible fallback indicator', text: `A badge confirms which code path is active for easy testing.` },
      { title: 'Accessible menu semantics', text: `role="menu"/"menuitem" and aria-haspopup on the trigger.` },
      { title: 'No positioning library', text: `Replaces the core job of a JS popper/floating-UI style dependency.` },
      { title: 'Honest 2026 support notes', text: `Chromium-only today; Firefox and Safari not yet shipped.` },
    ],
    useCases: [
      { title: 'Account and settings dropdowns', text: 'Position a menu below its header button with `anchor-name` and `anchor()` in pure CSS, with no `getBoundingClientRect` calls.' },
      { title: 'Tooltips and popovers', text: 'Pair with the [native popover API demo](/ui-snippets/native-popover-api-demo/) so show, hide and light-dismiss are handled by the browser.' },
      { title: 'Replacing a positioning library', text: 'Drop a floating-element dependency where CSS anchor positioning is supported, keeping a JavaScript fallback gated by `CSS.supports`.' },
      { title: 'Context and kebab menus', text: 'Anchor a right-click or overflow menu to its trigger, with the fallback recalculating whenever the anchor scrolls or the window resizes.' },
      { title: 'Progressive enhancement demos', text: 'Show a real fallback pattern, and compare with the [anchor positioning menu](/ui-snippets/anchor-positioning-menu/) for another take on the same API.' },
      { icon: 'CODE', title: 'Related: Dot Pagination Carousel', desc: 'See the [Dot Pagination Carousel](/ui-snippets/dot-pagination-carousel/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does anchor-name actually do?', a: `anchor-name assigns a custom-ident (a name you choose, prefixed with --) to an element, marking it as something other elements can position themselves relative to. It doesn't move or style the element itself — it only makes its layout box available as a named reference for the anchor() function elsewhere in the stylesheet.` },
      { q: 'How does the menu know where the button actually is?', a: `The menu sets position-anchor: --account-anchor to link itself to that specific named anchor, then uses the anchor() function inside its top and left values, e.g. top: anchor(--account-anchor bottom), which reads the anchor element's real, live bottom edge directly in CSS. The browser keeps this position correct through scroll and layout changes without any JavaScript recalculating it.` },
      { q: 'Which browsers support CSS Anchor Positioning right now?', a: `As of 2026, it is Chromium-only: Chrome and Edge shipped full support starting from version 125 in 2024. Firefox and Safari have not shipped the Anchor Positioning API yet, both still tracking the specification, so any production use needs a genuine fallback rather than assuming universal support.` },
      { q: 'How does the JS fallback decide when to run?', a: `It checks CSS.supports('anchor-name: --a') once on load. If that returns false, it shows a visible fallback badge and switches to a getBoundingClientRect()-based positioning routine, re-run whenever the menu opens, the window resizes, or the page scrolls while the menu is open — the same recalculation triggers native anchor positioning would otherwise handle for free.` },
      { q: 'Is the Popover API (popover, popovertarget) part of the same spec as Anchor Positioning?', a: `No — they are separate CSS/HTML specifications that happen to compose very well together. The Popover API (broadly supported in current browsers) handles whether an element is shown, hidden, and dismissed by clicking outside or pressing Escape; Anchor Positioning handles where a positioned element sits relative to another element. This snippet uses both, but you can use either independently.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how anchor(--account-anchor bottom) resolves to a real pixel position and why that stays correct through scroll and resize without any JavaScript recalculation — that mental model is the key thing to internalize before relying on this API elsewhere. It's also a good prompt for auditing whether a floating-UI-style JS dependency in your own project could be replaced, at least for its supported-browser path, by native anchor positioning with this exact fallback pattern layered underneath. You could ask it to extend the demo with anchor(--account-anchor bottom, --account-anchor left) style flip logic for when the menu would overflow the viewport, or to add position-try-fallbacks for automatic edge avoidance, another part of this same emerging spec. Treat this as a living reference for browser support, since Firefox and Safari's timelines here can change.`,
      prompt: `Build a dropdown menu positioned relative to its trigger button using the native CSS Anchor Positioning API, with a JavaScript fallback for browsers that don't support it.

Requirements:
- A trigger button with anchor-name: --some-name set in CSS, marking it as a named anchor.
- A menu element that uses the HTML Popover API (the popover attribute and popovertarget on the trigger) for its show/hide and light-dismiss behavior — clicking outside or pressing Escape should close it natively, with no custom JS listeners for that part.
- Inside an @supports (anchor-name: --a) block, position the menu using position-anchor tied to the trigger's anchor name, and use the anchor() CSS function (e.g. top: anchor(--some-name bottom); left: anchor(--some-name left)) to place it directly below the trigger — no JavaScript should compute this position in a supporting browser.
- Feature-detect support in JavaScript with CSS.supports('anchor-name: --a'). If unsupported, show a small visible indicator confirming the fallback is active, and implement a manual positioning function using getBoundingClientRect() on the trigger that runs when the menu opens and again on window resize/scroll while it remains open.
- Give the menu proper accessible semantics: role="menu" on the list, role="menuitem" on each item, and aria-haspopup="menu" on the trigger button.
- Include a short, honest note in the UI or comments that CSS Anchor Positioning is, as of 2026, supported in Chromium browsers (Chrome/Edge) but not yet in Firefox or Safari.`,
    },
  },
};

export default cssAnchorTooltipMenu;
