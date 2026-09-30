const anchorPositioningMenu = {
  id: 'anchor-positioning-menu',
  title: 'Anchor Positioning Menu',
  lastmod: '2026-07-22',
  category: 'navigation',
  html: `<div class="page">
  <p class="page-hint">Native <strong>Popover API</strong> + <strong>CSS anchor positioning</strong> — the browser opens, closes, layers and places these menus. Scroll the box: menus flip sides automatically.</p>

  <div class="scroll-box">
    <div class="scroll-inner">
      <div class="toolbar">
        <!-- Menu 1: actions dropdown -->
        <button class="tb-btn" popovertarget="menu-actions" id="anchor-actions">
          Actions
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <!-- Menu 2: share dropdown -->
        <button class="tb-btn" popovertarget="menu-share" id="anchor-share">
          Share
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 9l6 6 6-6"/></svg>
        </button>

        <!-- Kebab: icon menu -->
        <button class="tb-btn icon-only" popovertarget="menu-more" id="anchor-more" aria-label="More options">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="12" cy="19" r="2"/></svg>
        </button>
      </div>

      <div popover id="menu-actions" class="menu" style="position-anchor: --actions">
        <button class="mi">Rename<span class="kbd">F2</span></button>
        <button class="mi">Duplicate<span class="kbd">⌘D</span></button>
        <button class="mi">Move to…</button>
        <hr class="mi-sep">
        <button class="mi danger">Delete<span class="kbd">⌫</span></button>
      </div>

      <div popover id="menu-share" class="menu" style="position-anchor: --share">
        <button class="mi">Copy link</button>
        <button class="mi">Email invite</button>
        <button class="mi">Embed code</button>
      </div>

      <div popover id="menu-more" class="menu" style="position-anchor: --more">
        <button class="mi">Export as PDF</button>
        <button class="mi">Print</button>
        <button class="mi">Settings</button>
      </div>
    </div>
  </div>

  <p class="support-note" id="support-note" hidden>This browser lacks CSS anchor positioning — menus fall back to a fixed drop position.</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.page { width: 100%; max-width: 520px; }
.page-hint { font-size: 12.5px; color: #64748b; line-height: 1.6; margin-bottom: 16px; text-align: center; }
.page-hint strong { color: #a5b4fc; }

/* Scrollable stage proving auto-flip */
.scroll-box {
  height: 260px; overflow-y: auto;
  border: 1px dashed #334155; border-radius: 14px;
  background: repeating-linear-gradient(0deg, transparent 0 46px, rgba(51,65,85,0.25) 46px 47px);
}
.scroll-inner { height: 560px; display: flex; align-items: center; justify-content: center; }

.toolbar {
  display: flex; gap: 8px;
  background: #1e293b; border: 1px solid #334155;
  border-radius: 12px; padding: 8px;
}
.tb-btn {
  display: flex; align-items: center; gap: 7px;
  background: none; border: none; color: #cbd5e1;
  padding: 8px 14px; border-radius: 8px;
  font-size: 13px; font-weight: 600; font-family: inherit;
  cursor: pointer; transition: background 0.15s;
}
.tb-btn:hover { background: #334155; }
.tb-btn.icon-only { padding: 8px 10px; }

/* — Anchor names: each trigger declares itself an anchor — */
#anchor-actions { anchor-name: --actions; }
#anchor-share   { anchor-name: --share; }
#anchor-more    { anchor-name: --more; }

/* — The menus: native popovers, positioned by CSS only — */
.menu {
  /* popover UA defaults reset */
  inset: auto; border: 1px solid #334155; padding: 6px;
  background: #1e293b; border-radius: 12px;
  box-shadow: 0 18px 45px rgba(0,0,0,0.5);
  min-width: 190px;
  margin: 0;

  /* place below the anchor, aligned to its left edge;
     try-order flips it above when there's no room below */
  position-area: bottom span-right;
  position-try-fallbacks: top span-right, bottom span-left, top span-left;
  margin-block: 6px;

  /* entry/exit animation — allow-discrete animates display:none */
  opacity: 0; transform: translateY(-4px) scale(0.98);
  transition: opacity 0.16s, transform 0.16s, overlay 0.16s allow-discrete, display 0.16s allow-discrete;
}
.menu:popover-open {
  opacity: 1; transform: none;
}
/* entry starting point (needed because display:none has no styles) */
@starting-style {
  .menu:popover-open { opacity: 0; transform: translateY(-4px) scale(0.98); }
}

/* menu items */
.mi {
  display: flex; align-items: center; justify-content: space-between; gap: 20px;
  width: 100%; background: none; border: none;
  color: #e2e8f0; padding: 8px 11px; border-radius: 8px;
  font-size: 13px; font-family: inherit; text-align: left;
  cursor: pointer; transition: background 0.12s;
}
.mi:hover, .mi:focus-visible { background: #334155; outline: none; }
.mi.danger { color: #f87171; }
.mi.danger:hover { background: rgba(248,113,113,0.12); }
.kbd { font-size: 10.5px; color: #64748b; font-family: 'SF Mono', Consolas, monospace; }
.mi-sep { border: none; border-top: 1px solid #334155; margin: 5px 4px; }

.support-note {
  margin-top: 14px; font-size: 12px; color: #f59e0b;
  background: rgba(245,158,11,0.1); border: 1px solid rgba(245,158,11,0.3);
  border-radius: 9px; padding: 9px 13px;
}

/* Fallback when anchor positioning is unsupported:
   fixed-position drop under the toolbar (functional, not anchored) */
@supports not (anchor-name: --a) {
  .menu { position: fixed; left: 50%; top: 50%; transform: translate(-50%, 20px); }
  .menu:popover-open { transform: translate(-50%, 30px); }
  @starting-style { .menu:popover-open { transform: translate(-50%, 20px); } }
}`,

  js: `// Everything here is optional garnish — opening, closing, light-dismiss,
// ESC handling, focus and top-layer stacking are ALL handled natively by
// the Popover API with zero JavaScript.

// 1. Close the menu after choosing an item (popovers don't auto-close on
//    inner clicks — that's app logic, so it lives here).
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('click', e => {
    if (e.target.closest('.mi')) menu.hidePopover();
  });
});

// 2. Feature-detect anchor positioning for the support note.
if (!CSS.supports('anchor-name: --a')) {
  document.getElementById('support-note').hidden = false;
}

// 3. Optional: log popover lifecycle (the API fires toggle events).
document.querySelectorAll('.menu').forEach(menu => {
  menu.addEventListener('toggle', e => {
    // e.newState is "open" or "closed"
    // console.log(menu.id, e.newState);
  });
});`,

  seo: {
    title: 'CSS Anchor Positioning Menu — HTML CSS JS Snippet',
    description: 'Dropdown menus with the native Popover API and CSS anchor positioning: auto-flip fallbacks, top layer, light dismiss — near-zero JS. React & Tailwind notes.',
    about: {
      title: 'Anchor Positioning Menu — Native Popover API, anchor-name/position-area, position-try Fallbacks & @starting-style Animation',
      description: `For fifteen years, dropdown menus meant JavaScript positioning libraries — Popper, Floating UI, or hand-rolled getBoundingClientRect math — plus manual outside-click handlers, Escape listeners, z-index wars, and clipping fights with overflow: hidden ancestors. Two platform features ended that era: the **Popover API** (open/close, light dismiss, Escape, and top-layer rendering, all native) and **CSS anchor positioning** (declarative tethering with automatic flip fallbacks). This snippet builds a toolbar with three dropdown menus using both — inside a scrollable stage that proves the flagship trick: scroll until a menu runs out of room below its button, and the browser flips it above, with zero JavaScript involved.

**The Popover API: behaviour without listeners**

Each menu is a plain \`<div popover id="menu-actions">\`, and each trigger is \`<button popovertarget="menu-actions">\`. That attribute pair alone gives you: toggle on click, light dismiss (clicking anywhere else closes it), Escape to close, only-one-auto-popover-open-at-a-time (open Share and Actions closes itself), focus handling, and rendering in the **top layer** — the same stacking context as native \`<dialog>\`, which sits above every z-index and cannot be clipped by any \`overflow: hidden\` ancestor. The demo's JS does exactly two real things, both app logic rather than plumbing: closing a menu after an item is chosen (\`menu.hidePopover()\` on item click, since popovers rightly don't assume inner clicks mean "done"), and feature-detecting anchor support for the notice. The API also fires \`toggle\` events with \`newState\` for analytics or lazy content.

**Anchor positioning: tethering as a style**

Positioning takes four declarations. The trigger declares \`anchor-name: --actions\` — an identifier, like a named target. The menu declares \`position-anchor: --actions\` to tether to it, and \`position-area: bottom span-right\` to sit below the anchor, spanning rightward from its left edge (the 9-cell \`position-area\` grid replaces all the old \`top: calc(...)\` math). Finally — the part that used to require a library — \`position-try-fallbacks: top span-right, bottom span-left, top span-left\` lists alternate placements the browser tries *automatically* whenever the preferred one would overflow the viewport: scroll the stage and watch menus flip above their buttons in real time, re-evaluated on every scroll and resize by the engine, off the main thread. Because popovers live in the top layer, the tether even works across the scroll container boundary that would clip an absolutely-positioned menu.

**Animating from display: none**

Popovers are \`display: none\` when closed, which historically made entry animation impossible — transitions need a starting style, and a hidden element has none. Two new primitives fix it, both used here: \`@starting-style\` supplies the "from" values (\`opacity: 0; translateY(-4px) scale(0.98)\`) applied for the first frame after the popover opens, and \`transition: display 0.16s allow-discrete, overlay 0.16s allow-discrete\` keeps the element rendered (and in the top layer — that's the \`overlay\` property) until the exit transition finishes. The result is the standard dropdown fade-and-drop, implemented entirely in the stylesheet against \`:popover-open\`.

**Progressive enhancement posture**

The Popover API is supported everywhere (Chrome 114+, Safari 17+, Firefox 125+). Anchor positioning shipped in Chromium (125+) and is rolling through Safari and Firefox; the snippet guards it with \`@supports not (anchor-name: --a)\`, falling back to a centred fixed-position drop so menus remain fully functional — open/close/dismiss all still native — just not tethered. \`CSS.supports('anchor-name: --a')\` drives the user-facing notice. This is the correct adoption posture in 2026: popover everywhere, anchors as enhancement, and a polyfill (\`@oddbird/css-anchor-positioning\`) if you need tethering universally today.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Open the menus and test the native behaviour',
          text: 'Click Actions, Share, or the kebab — menus fade in below their buttons. Press Escape, click outside, or open another menu: each closes correctly with no JS listeners involved. Now scroll the dashed stage so a button nears the bottom edge and reopen its menu — it flips above the button automatically via position-try-fallbacks, re-evaluating as you continue scrolling.',
        },
        {
          title: 'Wire a menu to your own trigger',
          text: 'Three steps: give the trigger anchor-name: --mymenu and popovertarget="my-menu"; give the panel popover, id="my-menu", and position-anchor: --mymenu; choose a position-area (bottom span-right for left-aligned dropdowns, bottom span-left for right-aligned ones like user menus in a top-right corner) plus a position-try-fallbacks list of the placements you would accept when space runs out.',
        },
        {
          title: 'Choose placement with the position-area grid',
          text: 'position-area addresses a 3×3 grid around the anchor: block keywords (top/bottom/center) × inline keywords (left/right/span-left/span-right/center). span-right means "start at the anchor\'s left edge and grow rightward". For a centred tooltip use top center; for a submenu flying out sideways use right span-bottom. The margin-block: 6px on the menu is the gap from the anchor.',
        },
        {
          title: 'Keep the exit animation working',
          text: 'The transition list must include display and overlay with allow-discrete, or closing will snap instead of fading (the element becomes display:none immediately). @starting-style must repeat the closed-state values for :popover-open — it defines the first frame of entry. If you add new animated properties, add them in three places: base .menu, :popover-open, and @starting-style.',
        },
        {
          title: 'Handle browsers without anchor support',
          text: 'The @supports not (anchor-name: --a) block gives non-supporting browsers a fixed centred drop — functional but untethered. For production-parity everywhere, add the @oddbird/css-anchor-positioning polyfill (a script tag; it parses and emulates the CSS), or branch to a Floating UI implementation when CSS.supports("anchor-name: --a") is false. Never gate the popover behaviour itself — that part is universal.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — popover and popovertarget are plain attributes (React 19 passes them through), so the pattern needs no refs or portals; the top layer replaces createPortal entirely. Compare with the JS-positioned [Dropdown Menu](/ui-snippets/dropdown-menu) and [Nested Dropdown](/ui-snippets/nested-dropdown) to see what the platform now absorbs, and pair with the [Context Menu](/ui-snippets/context-menu) or [Command Palette](/ui-snippets/command-palette) for adjacent patterns.',
        },
      ],
    },
    features: [
      'Zero-JS open/close: popovertarget wiring gives toggle, light dismiss, Escape, and auto-close of sibling popovers',
      'Top-layer rendering — menus can never be clipped by overflow ancestors or beaten by z-index',
      'Declarative tethering: anchor-name on the trigger, position-anchor + position-area on the menu',
      'Automatic viewport-aware flipping via position-try-fallbacks, re-evaluated on scroll and resize off the main thread',
      'Scrollable demo stage that visibly proves the auto-flip as buttons approach the edge',
      'Entry/exit animation from display:none using @starting-style and allow-discrete transitions on display and overlay',
      'Menu items with keyboard hints, separator, and a danger action; item click closes via hidePopover()',
      '@supports fallback plus CSS.supports() detection — fully functional menus in non-anchor browsers',
    ],
    useCases: [
      {
        icon: 'WEB',
        title: 'Replacing Popper/Floating UI in app toolbars and headers',
        desc: 'Every SaaS header carries dropdowns — user menu, notifications, workspace switcher — typically dragging a positioning library plus portal plumbing into the bundle. This pattern deletes that stack: the top layer replaces portals, position-area replaces middleware, position-try replaces flip/shift, and light dismiss replaces outside-click handlers. Migrate one menu at a time; the trigger/panel markup barely changes, and the deleted JS is usually the larger diff. Keep Floating UI only for the CSS.supports-false branch if your support matrix demands it.',
      },
      {
        icon: 'FLOW',
        title: 'Menus inside scroll containers and data tables',
        desc: 'The classic breakage this snippet\'s stage demonstrates: a row-actions kebab menu inside a scrollable table gets clipped by overflow: auto, or requires position: fixed hacks that detach on scroll. Popover + anchor solves both structurally — top layer escapes the clip, and the tether tracks the anchor through scrolling with fallbacks flipping near edges. Use one shared menu element retargeted per row (set position-anchor via style and showPopover()) for tables with hundreds of rows.',
      },
      {
        icon: 'CSS',
        title: 'Design systems standardising on platform primitives',
        desc: 'Component libraries (Radix, Headless UI, MUI) exist substantially to paper over missing popover/anchor primitives. Teams building 2026-era design systems can now define Menu, Tooltip, Select, and HoverCard on the platform layer: consistent light-dismiss semantics for free, no positioning dependency to version-manage, and CSS-only theming of placement per component via position-area tokens. This snippet is the reference implementation shape — trigger attribute contract, panel attribute contract, and the three-place animation rule documented in the how-to.',
      },
      {
        icon: 'LEARN',
        title: 'Learning the 2024–2026 popover platform stack',
        desc: 'Five cutting-edge primitives cooperate in ~40 lines of CSS here: popover/popovertarget, the top layer, anchor-name/position-area, position-try-fallbacks, and @starting-style with allow-discrete. Each is individually documented but rarely shown composed; this demo is deliberately minimal enough to read as a lesson. Delete pieces to see what each does — remove the fallbacks and watch menus overflow at edges, remove allow-discrete and watch exit animation vanish, remove @starting-style and watch entry snap.',
      },
      {
        icon: 'FORM',
        title: 'Select-like inputs, comboboxes, and date-picker popups',
        desc: 'Anything that drops a panel under a field — custom selects, autocomplete results, calendar popups — inherits this pattern wholesale: the input carries anchor-name, the panel is a popover with position-area: bottom span-right and a top fallback for fields near the viewport bottom (the exact case where naive dropdowns break in checkout forms). Combine with the [Custom Select](/ui-snippets/custom-select) or [Date Picker](/ui-snippets/date-picker) internals, letting the platform own placement while your code owns only selection state.',
      },
      {
        icon: 'CODE',
        title: 'Tooltips and hover cards with hint popovers',
        desc: 'The popover attribute takes a hint value (popover="hint") designed for tooltips: hint popovers can stack alongside auto popovers without closing them and pair with interest invokers for hover/focus triggering. Reuse this snippet\'s anchor CSS with position-area: top center and a bottom fallback, and you have declarative tooltips that never clip — a platform-native alternative to the [CSS Tooltip](/ui-snippets/css-tooltip) technique, with the same @starting-style entrance. The kbd-hint styling in the menu items transfers directly to shortcut tooltips.',
      },
      { icon: 'CODE', title: 'Related: Account Switcher', desc: 'See the [Account Switcher](/ui-snippets/account-switcher/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Breadcrumb Trail with Collapsing Middle Items', desc: 'See the [Breadcrumb Trail with Collapsing Middle Items](/ui-snippets/breadcrumbs/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Icon Rail with Flyout Submenu', desc: 'See the [Icon Rail with Flyout Submenu](/ui-snippets/flyout-icon-rail-nav/) for a related navigation pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Drill-Down Settings Navigation', desc: 'See the [Drill-Down Settings Navigation](/ui-snippets/drill-down-settings-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'What exactly does the Popover API handle that I previously wrote JavaScript for?',
        a: 'Six behaviours, all free with popover + popovertarget: (1) toggle on trigger click, including correct aria-expanded semantics on the invoker; (2) light dismiss — clicking outside closes the popover, implemented natively so it cannot desync the way document-level click listeners do; (3) Escape-key dismissal; (4) auto-popover exclusivity — opening one closes others, which previously required a shared store or event bus; (5) top-layer rendering above all stacking contexts, replacing portal/append-to-body strategies and killing z-index and clipping bugs structurally; and (6) toggle/beforetoggle lifecycle events for hooks like lazy-loading menu content. What it deliberately does not do: close when something inside is clicked (that is app semantics — a menu closes on item choice, a filter panel does not, so this snippet adds the three-line item-click handler), and arrow-key roving focus between items, which remains your responsibility for full menu-role accessibility.',
      },
      {
        q: 'How do position-area and position-try-fallbacks actually decide where the menu goes?',
        a: 'position-area places the positioned element into a cell of an implicit 3×3 grid drawn around the anchor: one block-axis keyword (top/center/bottom) and one inline-axis keyword (left/center/right, or the span- variants which align to an anchor edge and grow across it — span-right means "left edges aligned, extend rightward", the normal dropdown alignment). If the chosen placement would overflow the element\'s containing block (effectively the viewport for top-layer popovers), the browser walks position-try-fallbacks in order and uses the first candidate that fits, re-running this test on every scroll, resize, and anchor movement — the engine-level equivalent of Floating UI\'s flip middleware, but off the main thread and with no listeners. Order your fallbacks by preference: this snippet tries the vertical flip first (top span-right) before horizontal realignment, because a menu jumping sides is more disorienting than one flipping up.',
      },
      {
        q: 'Why does the exit animation need "allow-discrete", and what is the overlay property?',
        a: 'A closed popover is display: none, and display is a discrete property — normally it switches instantly at transition start, so the element vanishes before your opacity transition can play. transition: display 0.16s allow-discrete changes the timing for discrete properties: display flips at the END of the transition when animating to none, keeping the element rendered while it fades out. overlay is the companion property that only exists for top-layer elements: it controls whether the element is still promoted to the top layer, and it also needs allow-discrete so the browser keeps the popover in the top layer for the duration of the exit — without it, the closing menu instantly drops out of the top layer and can get clipped or reordered mid-fade. Entry needs the third piece, @starting-style, because an element coming from display:none has no prior computed styles to transition from; the @starting-style block supplies that first-frame state. All three appear in this snippet\'s .menu rules — remove any one and a direction of the animation breaks.',
      },
      {
        q: 'Can I use this with Tailwind CSS, React, or Angular today, and what about unsupported browsers?',
        a: 'Tailwind v4 speaks these features via arbitrary properties and variants: the trigger gets [anchor-name:--menu], the panel gets [position-anchor:--menu] [position-area:bottom_span-right] [position-try-fallbacks:top_span-right] open:opacity-100 (the :popover-open state maps to Tailwind\'s open: variant), with @starting-style via the starting: variant in v4. React 19 forwards popover, popovertarget, and popovertargetaction as regular props — no refs, no portals (the top layer makes createPortal obsolete for this), and toggle events attach with onToggle. Angular binds them as attributes and the CSS ships in component styles unchanged. Support: the Popover API is universal in evergreen browsers (Chrome 114+, Safari 17+, Firefox 125+); anchor positioning is Chromium 125+ with Safari/Firefox rolling out — so ship popovers unguarded, wrap tethering in @supports as this snippet does, and where the fallback drop position is not acceptable, add the @oddbird/css-anchor-positioning polyfill or branch to Floating UI when CSS.supports("anchor-name: --a") returns false.',
      },
    ],
    aiPrompt: {
      paragraph: `This snippet compresses five new platform features into one small file, and an AI assistant is the fastest way to pull them apart: paste it into Claude and ask it to enumerate exactly which behaviours come from the popover attribute versus the anchor CSS versus the three animation primitives — then have it break each one deliberately (remove allow-discrete, remove @starting-style, remove the fallback list) and describe what you'd observe, which is the quickest route to a durable mental model. For real work, hand it one of your existing Popper or Floating UI dropdowns and ask for a migration to this pattern, including the CSS.supports branch your browser matrix requires and the roving arrow-key focus the Popover API leaves to you for menu-role accessibility. Two extensions worth requesting: a single shared popover retargeted across a table's row-action kebabs by rewriting position-anchor before showPopover(), and a hint-popover tooltip variant reusing the same anchor plumbing with position-area: top center. Each teaches a corner of the API the basic demo can't.`,
      prompt: `Build a toolbar with three dropdown menus using ONLY the native Popover API and CSS anchor positioning in plain HTML and CSS — JavaScript may appear solely for closing a menu after an item is chosen and for feature detection.

Requirements:
- A toolbar with two labelled buttons (Actions, Share) and an icon-only kebab button; each button opens its own menu using the popovertarget attribute pointing at a div with the popover attribute — no click listeners for opening, closing, outside-click, or Escape, since the Popover API provides toggle, light dismiss, Escape handling, sibling auto-closing, and top-layer rendering natively.
- Tether each menu with CSS anchor positioning: anchor-name on its trigger, position-anchor plus position-area (below the anchor, left-aligned growing rightward) on the menu, a small block-axis margin as the gap, and a position-try-fallbacks list that flips the menu above the anchor and realigns it when viewport space runs out.
- Place the toolbar inside a taller-than-viewport scrollable stage with a dashed border so scrolling visibly demonstrates the automatic flip — menus must reposition live as their anchors approach the container edges, with zero scroll listeners.
- Animate entry and exit from display:none correctly: base closed styles with opacity and a small translate/scale, revealed under :popover-open, an @starting-style block supplying the entry first-frame, and a transition list that includes display and overlay with allow-discrete so the exit fade completes before the element leaves the top layer.
- Menus contain hover-highlighted items with monospace keyboard-shortcut hints, a separator, and a red danger action; a small delegated click handler calls hidePopover() when an item is chosen.
- Guard anchor positioning with @supports not (anchor-name: --a) providing a functional fixed-position fallback, surface a notice via CSS.supports() detection, and comment which behaviours are native versus app logic — making clear the popover part ships unguarded because its support is universal.`,
    },
  },
};

export default anchorPositioningMenu;
