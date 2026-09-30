const nativePopoverApiDemo = {
  id: 'native-popover-api-demo',
  title: 'Native HTML Popover API Demo',
  lastmod: '2026-08-08',
  category: 'modals',
  html: `<div class="stage">
  <div class="row">
    <div class="demo-block">
      <p class="demo-label">popover="auto" &mdash; menu</p>
      <button popovertarget="menu-popover" class="btn btn-primary">Open menu</button>
      <div id="menu-popover" popover="auto" class="popover-panel menu-panel">
        <p class="panel-title">Actions</p>
        <button class="menu-item" popovertarget="menu-popover" popovertargetaction="hide">Rename</button>
        <button class="menu-item" popovertarget="menu-popover" popovertargetaction="hide">Duplicate</button>
        <button class="menu-item danger" popovertarget="menu-popover" popovertargetaction="hide">Delete</button>
      </div>
      <p class="hint">Click outside, press Esc, or another popovertarget click auto-closes it (popover="auto").</p>
    </div>

    <div class="demo-block">
      <p class="demo-label">popover="manual" &mdash; tooltip</p>
      <button id="tooltip-trigger" class="btn btn-outline" aria-describedby="tip-popover">Hover or focus me</button>
      <div id="tip-popover" popover="manual" class="popover-panel tip-panel">
        Manual popovers don't auto-dismiss on outside click &mdash; you control show/hide entirely in JS.
      </div>
      <p class="hint">Shown via <code>.showPopover()</code> on mouseenter, hidden via <code>.hidePopover()</code> on mouseleave.</p>
    </div>

    <div class="demo-block">
      <p class="demo-label">popover="auto" &mdash; auto-dismiss toast</p>
      <button id="toast-trigger" class="btn btn-outline">Show toast</button>
      <div id="toast-popover" popover="auto" class="popover-panel toast-panel">
        <span class="toast-dot"></span> Saved successfully
      </div>
      <p class="hint">Opens via JS <code>showPopover()</code>, auto-hides itself after 2.5s with <code>hidePopover()</code>.</p>
    </div>
  </div>

  <div class="event-log">
    <p class="log-title">Live event log <span class="log-sub">(beforetoggle / toggle)</span></p>
    <div class="log-body" id="log-body"></div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.stage { max-width: 980px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 28px; }

.row { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px; }

.demo-block {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 20px; display: flex; flex-direction: column; gap: 10px; align-items: flex-start;
  box-shadow: 0 6px 20px rgba(15,23,42,0.05);
}

.demo-label { font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.03em; }

.btn { padding: 10px 16px; font-size: 13.5px; font-weight: 600; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; }
.btn-primary { background: #6366f1; color: #fff; }
.btn-primary:hover { background: #4f46e5; }
.btn-outline { background: #fff; color: #334155; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }

.hint { font-size: 11.5px; color: #94a3b8; line-height: 1.6; }
.hint code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 11px; }

/* — Popover base reset — native popovers are top-layer elements — */
[popover] {
  border: none; padding: 0; margin: 0;
  border-radius: 12px;
  box-shadow: 0 20px 48px rgba(15,23,42,0.18);
}
[popover]::backdrop { background: rgba(15,23,42,0.1); }

.menu-panel { width: 190px; padding: 8px; background: #fff; border: 1px solid #e2e8f0; }
.panel-title { font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; padding: 6px 10px 4px; }
.menu-item {
  display: block; width: 100%; text-align: left;
  background: none; border: none; cursor: pointer;
  font-family: inherit; font-size: 13.5px; color: #1e293b;
  padding: 9px 10px; border-radius: 7px;
}
.menu-item:hover { background: #f1f5f9; }
.menu-item.danger { color: #dc2626; }
.menu-item.danger:hover { background: #fef2f2; }

.tip-panel {
  background: #1e293b; color: #f1f5f9;
  font-size: 12.5px; line-height: 1.6;
  padding: 10px 14px; width: 220px;
  position: fixed; inset: auto;
  margin-top: 44px;
}

.toast-panel {
  background: #0f172a; color: #f1f5f9;
  font-size: 13px; font-weight: 600;
  padding: 12px 18px; display: flex; align-items: center; gap: 9px;
  position: fixed; inset: auto; bottom: 24px; left: 50%;
  transform: translateX(-50%);
}
.toast-dot { width: 8px; height: 8px; border-radius: 50%; background: #34d399; flex-shrink: 0; }

/* :popover-open styling hook */
[popover]:popover-open { animation: pop-in 0.16s ease-out; }
@keyframes pop-in { from { opacity: 0; transform: scale(0.96); } to { opacity: 1; transform: scale(1); } }
.toast-panel:popover-open { animation: toast-in 0.2s ease-out; }
@keyframes toast-in { from { opacity: 0; transform: translate(-50%, 12px); } to { opacity: 1; transform: translate(-50%, 0); } }

.event-log {
  background: #0f172a; border-radius: 12px; padding: 16px 18px;
}
.log-title { font-size: 12px; font-weight: 700; color: #818cf8; margin-bottom: 4px; }
.log-sub { color: #64748b; font-weight: 500; }
.log-body {
  font-family: 'SFMono-Regular', Consolas, monospace; font-size: 11.5px;
  color: #cbd5e1; line-height: 1.8;
  max-height: 130px; overflow-y: auto;
}
.log-body div { border-bottom: 1px solid #1e293b; padding: 2px 0; }
.log-body span.evt-open { color: #34d399; }
.log-body span.evt-close { color: #fb7185; }`,

  js: `const logBody = document.getElementById('log-body');

function log(msg, cls) {
  const line = document.createElement('div');
  const time = new Date().toLocaleTimeString([], { hour12: false });
  line.innerHTML = '<span class="' + cls + '">' + msg + '</span> <span style="color:#475569">' + time + '</span>';
  logBody.prepend(line);
  while (logBody.children.length > 8) logBody.removeChild(logBody.lastChild);
}

// Listen for native toggle events on every popover element
document.querySelectorAll('[popover]').forEach(el => {
  el.addEventListener('beforetoggle', e => {
    const action = e.newState === 'open' ? 'opening' : 'closing';
    log('#' + el.id + ' beforetoggle -> ' + action, e.newState === 'open' ? 'evt-open' : 'evt-close');
  });
  el.addEventListener('toggle', e => {
    const action = e.newState === 'open' ? 'shown' : 'hidden';
    log('#' + el.id + ' toggle: ' + action, e.newState === 'open' ? 'evt-open' : 'evt-close');
  });
});

// Manual popover: tooltip shown/hidden explicitly via JS, not declarative popovertarget
const tooltipTrigger = document.getElementById('tooltip-trigger');
const tipPopover = document.getElementById('tip-popover');

function positionTip() {
  const rect = tooltipTrigger.getBoundingClientRect();
  tipPopover.style.left = rect.left + 'px';
  tipPopover.style.top = (rect.bottom + 8) + 'px';
  tipPopover.style.marginTop = '0';
}

tooltipTrigger.addEventListener('mouseenter', () => {
  positionTip();
  tipPopover.showPopover();
});
tooltipTrigger.addEventListener('mouseleave', () => tipPopover.hidePopover());
tooltipTrigger.addEventListener('focus', () => {
  positionTip();
  tipPopover.showPopover();
});
tooltipTrigger.addEventListener('blur', () => tipPopover.hidePopover());

// Auto-dismissing toast: popover="auto" opened via JS, closes itself after a timeout
const toastTrigger = document.getElementById('toast-trigger');
const toastPopover = document.getElementById('toast-popover');
let toastTimer = null;

toastTrigger.addEventListener('click', () => {
  toastPopover.showPopover();
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastPopover.hidePopover(), 2500);
});`,

  seo: {
    title: 'Native HTML Popover API Demo (popovertarget) — Free Snippet',
    description: 'Real browser-native popovers with popover="auto"/"manual", the top layer, and toggle events — no custom overlay JS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Native HTML Popover API — popover, popovertarget, the Top Layer, and toggle Events Explained',
      description: `Building a dropdown menu, tooltip, or toast notification used to require a surprising amount of custom JavaScript: manual z-index management, a click-outside listener attached to \`document\`, an Escape-key handler, and careful DOM placement to avoid the panel being clipped by a parent's \`overflow: hidden\`. The HTML Popover API, standardized across Chrome 114+, Safari 17+, and Firefox 125+, replaces all of that with two plain HTML attributes: \`popover\` on the panel itself, and \`popovertarget\` on the button that controls it.

**The \`popover\` attribute and the top layer**

Adding \`popover="auto"\` (or the bare \`popover\` attribute, which defaults to \`"auto"\`) to any element promotes it to the browser's **top layer** — the same rendering layer used natively by \`<dialog>\` and fullscreen elements, sitting visually above everything else in the document regardless of \`z-index\` or any ancestor's \`overflow\`/\`transform\`/\`position\` stacking context. This is the single biggest practical win over a hand-rolled \`position: absolute\` dropdown: no more z-index wars, no more panels getting clipped inside a scrollable card, no more manually portaling the element to \`document.body\` with a framework.

**Declarative wiring with \`popovertarget\`**

The menu example in this demo uses \`<button popovertarget="menu-popover">\` with zero JavaScript required to open it — clicking the button toggles the element whose \`id\` matches \`popovertarget\`. The \`popovertargetaction\` attribute (set to \`"hide"\` on each menu item here) explicitly closes the popover when an action is chosen, rather than the default toggle behavior. This declarative HTML-only wiring is a meaningful shift: a working dropdown menu needs no \`addEventListener\` calls at all for the open/close mechanics.

**\`auto\` vs \`manual\`: the light-dismiss behavior**

The \`popover\` attribute's value controls dismiss behavior. \`popover="auto"\` (used by the menu and the toast in this demo) gets automatic **light-dismiss**: clicking anywhere outside the panel, pressing Escape, or opening another auto popover closes it automatically, and only one auto popover can be open at a time by default. \`popover="manual"\` (used by the tooltip) opts out of all of that — it will not close on outside click or Escape, and you are fully responsible for calling \`.showPopover()\` and \`.hidePopover()\` yourself, which is exactly what this demo's tooltip does on \`mouseenter\`/\`mouseleave\` and \`focus\`/\`blur\`.

**The \`:popover-open\` pseudo-class and \`beforetoggle\`/\`toggle\` events**

While a popover is showing, it matches the \`:popover-open\` CSS pseudo-class, which this demo uses to trigger an entrance animation (\`animation: pop-in 0.16s\`) — no JavaScript class-toggling needed to drive the transition. On the JavaScript side, every popover fires a \`beforetoggle\` event just before its state changes and a \`toggle\` event immediately after, both carrying an \`event.newState\` property (\`"open"\` or \`"closed"\`) so you can hook cleanup logic, analytics, or animation coordination into the exact moment a popover opens or closes — this demo's event log panel is wired entirely from these two events across all three popovers.

**Why this matters for 2025/2026 UI work**

Before this API, every component library (Radix, Headless UI, Floating UI) shipped its own JavaScript reimplementation of focus trapping, outside-click detection, and top-layer portaling for popovers and menus. The native API doesn't replace advanced positioning logic (you'll still often pair it with the CSS Anchor Positioning API or a library like Floating UI for smart placement), but it does replace the dismiss-behavior and stacking-context plumbing that used to be boilerplate in every single implementation, shipped and maintained by the browser instead of your bundle.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the auto menu popover', text: 'Click "Open menu" — this button has popovertarget="menu-popover" pointing at the panel\'s id, so the browser opens it with zero JavaScript. Click any menu item (each has popovertargetaction="hide") or click anywhere outside the panel to close it via automatic light-dismiss, since the panel uses popover="auto".' },
        { title: 'Hover the manual tooltip trigger', text: 'Hover or keyboard-focus "Hover or focus me" — JavaScript calls tipPopover.showPopover() on mouseenter/focus and tipPopover.hidePopover() on mouseleave/blur. Because this panel uses popover="manual", clicking elsewhere on the page will not dismiss it automatically; only the explicit hidePopover() call does.' },
        { title: 'Trigger the auto-dismissing toast', text: 'Click "Show toast" to call toastPopover.showPopover() programmatically, then a setTimeout calls hidePopover() after 2.5 seconds. Even though it opens via JavaScript rather than a popovertarget attribute, it still uses popover="auto" so it also light-dismisses immediately if you click outside it before the timer fires.' },
        { title: 'Watch the live event log', text: 'Every popover in this demo has beforetoggle and toggle listeners attached that read event.newState ("open" or "closed") and print a timestamped line to the dark log panel, showing exactly when each lifecycle event fires relative to your interaction, including the brief beforetoggle-then-toggle sequence on every open and close.' },
        { title: 'Inspect the top-layer stacking', text: 'Open your browser devtools and note that none of the three popover panels have an explicit high z-index in the CSS — they render above the rest of the page purely because [popover] promotes them to the browser\'s top layer, the same rendering layer used by <dialog> and the Fullscreen API.' },
        { title: 'Reuse the pattern for your own menus and tooltips', text: 'For a simple toggle, add popover="auto" to any panel and popovertarget="that-panels-id" to its trigger button — no JavaScript required. For hover-driven or programmatically-timed popovers like the tooltip and toast here, call .showPopover() and .hidePopover() directly from your own event listeners instead.' },
      ],
    },
    features: [
      'popover="auto" attribute promotes elements to the browser top layer with zero manual z-index management',
      'Declarative popovertarget attribute wires a trigger button to a panel id with no addEventListener needed for open/close',
      'popovertargetaction="hide" explicitly closes an auto popover from within itself, e.g. after a menu item is chosen',
      'popover="manual" opts a panel out of automatic light-dismiss for hover-controlled tooltip-style UI',
      'Programmatic .showPopover() / .hidePopover() JavaScript methods used for hover and timed-dismiss interactions',
      ':popover-open CSS pseudo-class drives entrance animations without any JS class-toggling',
      'Native beforetoggle and toggle events with event.newState ("open"/"closed") power a live interaction log',
      '::backdrop pseudo-element styles the dimmed layer behind auto popovers, same mechanism used by <dialog>',
    ],
    useCases: [
      { icon: 'APP', title: 'Dropdown menus and action menus without a component library', desc: 'Context menus, "more options" kebab menus, and command palettes triggered from a button are the textbook popover="auto" use case: automatic light-dismiss on outside click and Escape, native top-layer stacking, and no z-index conflicts with modals or sticky headers elsewhere on the page.' },
      { icon: 'FORM', title: 'Hover and focus tooltips with manual control', desc: 'Tooltips need to stay visible while hovered and disappear on mouseleave without being accidentally dismissed by a click elsewhere on the page mid-interaction — popover="manual" combined with explicit showPopover()/hidePopover() calls on mouseenter/mouseleave gives exactly that control, unlike popover="auto"\'s automatic dismiss rules.' },
      { icon: 'FLOW', title: 'Toast notifications and transient status messages', desc: 'Save confirmations, form-submitted toasts, and undo prompts benefit from the top-layer stacking of popover="auto" so they\'re never accidentally hidden behind a modal or sticky element, combined with a simple setTimeout calling hidePopover() to auto-dismiss after a few seconds.' },
      { icon: 'CODE', title: 'Replacing custom dropdown/tooltip JavaScript libraries', desc: 'Many teams ship Radix UI, Headless UI, or a hand-rolled solution purely to get outside-click detection and top-layer rendering for simple menus and tooltips. For UI that doesn\'t need advanced smart positioning, the native Popover API covers the dismiss-behavior and stacking logic with substantially less JavaScript, pairing well with the [Native Dialog Showcase](/ui-snippets/native-dialog-showcase) for the modal side of the same top-layer mechanism.' },
      { icon: 'LEARN', title: 'Teaching the browser top layer and declarative HTML wiring', desc: 'This demo is a clear teaching tool for the shift toward declarative HTML-driven interactivity — popovertarget and popovertargetaction require no JavaScript for the open/close mechanics, which is a useful contrast to teach alongside the equivalent JS-driven .showPopover()/.hidePopover() API for cases needing custom timing or event logic.' },
      { icon: 'DESIGN', title: 'Design-system components needing consistent stacking behavior', desc: 'Design systems that mix menus, tooltips, toasts, and modals across many pages benefit from all of them sharing the same underlying top-layer rendering guarantee, eliminating an entire category of "this dropdown is behind that sticky header" bugs that used to require careful global z-index scale management.' },
      { icon: 'CODE', title: 'Related: Stacked Modal Manager — Multiple Modals on Top of Each Other, Correctly', desc: 'See the [Stacked Modal Manager — Multiple Modals on Top of Each Other, Correctly](/ui-snippets/stacked-modal-manager/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between popover="auto" and popover="manual"?', a: 'popover="auto" gets automatic light-dismiss: clicking outside the panel, pressing Escape, or opening another auto popover closes it, and only one auto popover is typically open at a time. popover="manual" disables all of that — outside clicks and Escape do nothing, and you must call .hidePopover() yourself. Use auto for menus and toasts, manual for hover tooltips or UI you need to keep open during unrelated page interactions.' },
      { q: 'Do popover elements really render above everything else, including modals?', a: 'Popover elements render in the browser\'s top layer, the same stacking mechanism used by <dialog> and the Fullscreen API, so they ignore ancestor z-index, overflow, and transform stacking contexts entirely. A popover opened while a <dialog> is showModal()-open will actually stack above the dialog by default, since top-layer elements are ordered by most-recently-added, which is worth testing explicitly if your app combines both.' },
      { q: 'What does the toggle event\'s newState property tell me?', a: 'Every popover fires beforetoggle just before its open/closed state changes and toggle immediately after, both with an event.newState property equal to the string "open" or "closed" (and event.oldState for the previous value). This lets you run cleanup, fire analytics, or coordinate an animation exactly when a popover\'s visibility actually changes, rather than inferring state from a class name or attribute check.' },
      { q: 'Can I position a popover next to its trigger button automatically?', a: 'The Popover API itself does not include smart positioning — by default a popover opens at its normal document position (or wherever CSS places it) rather than automatically anchored next to the trigger. For automatic placement that avoids viewport edges, pair popover with the newer CSS Anchor Positioning API (anchor-name / position-anchor) or a JS positioning library like Floating UI, as this demo does manually for its tooltip via getBoundingClientRect().' },
      { q: 'Is the Popover API accessible out of the box?', a: 'The browser automatically manages some accessibility semantics — popover panels get an implicit role and are exposed correctly to the top layer for assistive tech, and Escape-to-close is handled natively for auto popovers. However you should still add appropriate ARIA attributes like aria-haspopup or aria-expanded on the trigger button and aria-describedby (as this demo\'s tooltip trigger does) to fully communicate the relationship, since the API handles rendering and dismiss mechanics but not the full semantic relationship between trigger and content.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to walk through exactly what happens, event by event, when you click the menu button — specifically the order in which beforetoggle and toggle fire relative to the DOM update, since that ordering matters if you want to run an exit animation before a popover actually leaves the top layer. It's also worth asking the assistant to explain why the tooltip uses popover="manual" with explicit showPopover()/hidePopover() calls while the menu uses purely declarative popovertarget with no JS at all, and when you'd choose one wiring style over the other. You could also ask it to add CSS Anchor Positioning (anchor-name and position-anchor) to automatically place the tooltip relative to its trigger instead of the manual getBoundingClientRect() calculation currently used in positionTip().`,
      prompt: `Build a demo of the native HTML Popover API in plain HTML, CSS, and JavaScript that teaches popover="auto" vs popover="manual", declarative popovertarget wiring, and the beforetoggle/toggle events.

Requirements:
- A menu-style popover opened by a button using the declarative popovertarget attribute (no JavaScript for open/close), with popover="auto" on the panel and menu items that use popovertargetaction="hide" to close it after a choice, plus automatic light-dismiss on outside click and Escape.
- A tooltip-style popover using popover="manual", shown and hidden entirely via JavaScript .showPopover()/.hidePopover() calls triggered by mouseenter/mouseleave and focus/blur on its trigger button, explicitly not dismissing on an unrelated outside click.
- A toast-style popover using popover="auto" that opens via a JavaScript .showPopover() call on a button click and automatically calls .hidePopover() after a short timeout (roughly 2-3 seconds), while still supporting manual dismissal by clicking outside it before the timer fires.
- Visual styling that relies on the :popover-open CSS pseudo-class to trigger an entrance animation, and the ::backdrop pseudo-element for a dimmed background behind the auto popovers, with no manual z-index values needed anywhere since [popover] elements render in the browser's top layer.
- A live event log panel that attaches beforetoggle and toggle listeners to every popover element and prints a timestamped line reporting the element's id and the event.newState value ("open" or "closed") each time it fires.
- Clear inline comments distinguishing which behaviors come for free from the browser (light-dismiss, top-layer stacking, Escape-to-close) versus which require explicit JavaScript (manual show/hide, auto-dismiss timers).`,
    },
  },
};

export default nativePopoverApiDemo;
