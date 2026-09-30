const tooltip = {
  id: 'tooltip',
  title: 'CSS Tooltip with Smart Positioning',
  lastmod: '2026-08-17',
  category: 'modals',
  html: `<div class="demo">
  <div class="row">
    <button class="tip-trigger" data-tip="Copies the current URL" data-pos="top">Top <span class="tip"></span></button>
    <button class="tip-trigger" data-tip="Deletes this item permanently" data-pos="bottom">Bottom <span class="tip"></span></button>
    <button class="tip-trigger" data-tip="Opens the settings panel" data-pos="left">Left <span class="tip"></span></button>
    <button class="tip-trigger" data-tip="Shares with your team" data-pos="right">Right <span class="tip"></span></button>
  </div>
  <div class="row">
    <span class="icon-trigger" data-tip="128-bit AES encryption at rest" data-pos="top" tabindex="0" role="img" aria-label="Encrypted">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      <span class="tip"></span>
    </span>
    <button class="tip-trigger tip-wide" data-tip="This field must contain a valid email address and cannot be left blank when the account is set to receive billing notifications." data-pos="top">Long tooltip <span class="tip"></span></button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 60px 20px; }
.demo { display: flex; flex-direction: column; gap: 60px; align-items: center; }
.row { display: flex; gap: 40px; align-items: center; flex-wrap: wrap; justify-content: center; }
.tip-trigger { padding: 9px 16px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; font-size: 13px; font-weight: 500; color: #1f2937; cursor: pointer; position: relative; }
.icon-trigger { position: relative; display: inline-flex; align-items: center; justify-content: center; width: 36px; height: 36px; border-radius: 50%; background: #f3f4f6; color: #4b5563; cursor: default; }
.tip { position: absolute; z-index: 20; background: #111827; color: #fff; font-size: 12px; font-weight: 500; line-height: 1.4; padding: 6px 10px; border-radius: 6px; white-space: nowrap; max-width: 220px; pointer-events: none; opacity: 0; transform: scale(0.92); transition: opacity 0.12s ease, transform 0.12s ease; transition-delay: 0s; }
.tip-wide .tip { white-space: normal; width: 220px; }
.tip::after { content: ''; position: absolute; width: 8px; height: 8px; background: #111827; transform: rotate(45deg); }
[data-pos="top"] .tip { bottom: calc(100% + 9px); left: 50%; transform: translateX(-50%) scale(0.92); transform-origin: bottom center; }
[data-pos="top"] .tip::after { bottom: -4px; left: 50%; margin-left: -4px; }
[data-pos="bottom"] .tip { top: calc(100% + 9px); left: 50%; transform: translateX(-50%) scale(0.92); transform-origin: top center; }
[data-pos="bottom"] .tip::after { top: -4px; left: 50%; margin-left: -4px; }
[data-pos="left"] .tip { right: calc(100% + 9px); top: 50%; transform: translateY(-50%) scale(0.92); transform-origin: right center; }
[data-pos="left"] .tip::after { right: -4px; top: 50%; margin-top: -4px; }
[data-pos="right"] .tip { left: calc(100% + 9px); top: 50%; transform: translateY(-50%) scale(0.92); transform-origin: left center; }
[data-pos="right"] .tip::after { left: -4px; top: 50%; margin-top: -4px; }
.tip-trigger:hover .tip, .tip-trigger:focus-visible .tip, .icon-trigger:hover .tip, .icon-trigger:focus-visible .tip { opacity: 1; transform-origin: inherit; transition-delay: 0.35s; }
[data-pos="top"].tip-trigger:hover .tip, [data-pos="top"] .icon-trigger:hover .tip { transform: translateX(-50%) scale(1); }
[data-pos="bottom"].tip-trigger:hover .tip { transform: translateX(-50%) scale(1); }
[data-pos="left"].tip-trigger:hover .tip { transform: translateY(-50%) scale(1); }
[data-pos="right"].tip-trigger:hover .tip { transform: translateY(-50%) scale(1); }`,
  js: `document.querySelectorAll('[data-tip]').forEach(function(el) {
  var tip = el.querySelector('.tip');
  tip.textContent = el.getAttribute('data-tip');
});`,
  seo: {
    title: 'Tooltip — CSS Hover Snippet with 4-Way Positioning',
    description: 'Pure CSS tooltip with top/bottom/left/right positioning, an arrow, hover-intent delay, and keyboard focus support. Exports to React, Vue & Angular.',
    about: {
      title: 'Tooltip with Smart 4-Way Positioning — Pure CSS, No JavaScript Runtime',
      description: `A tooltip is the small label that appears next to an element on hover or focus, used to explain an icon-only button, define a term, or add context without permanently occupying screen space. This snippet builds a reusable tooltip system driven entirely by a \`data-tip\` attribute and a \`data-pos\` attribute, so adding a new tooltip anywhere on a page requires zero additional CSS or JavaScript.\n\n**Data-attribute-driven content**\n\nRather than hardcoding four separate tooltip markups, every trigger element carries \`data-tip="..."\` with its message and \`data-pos="top|bottom|left|right"\` for its side. A tiny JS loop on page load reads \`data-tip\` and writes it into a child \`.tip\` span's \`textContent\` — using \`textContent\`, not \`innerHTML\`, so the tooltip text can never be interpreted as markup, which matters if the message ever comes from user data. The positioning itself needs no JavaScript at all: CSS attribute selectors like \`[data-pos="top"] .tip\` place the tooltip and its arrow relative to the trigger using \`position: absolute\` and the corresponding \`bottom\`/\`top\`/\`left\`/\`right\` offset.\n\n**The arrow**\n\nThe small triangle pointing from the tooltip to its trigger is a single 8×8px square rotated 45 degrees (\`.tip::after { transform: rotate(45deg) }\`) and positioned so exactly half of it peeks out from behind the tooltip's rounded rectangle. This is simpler and more reliable across browsers than the classic CSS border-triangle trick, and it inherits the tooltip's background color automatically since it shares the same \`background: #111827\`.\n\n**Hover-intent delay**\n\nTooltips that appear the instant the cursor crosses an element create visual noise as a user's mouse passes over several triggers on its way somewhere else. The \`transition-delay: 0.35s\` on the hover/focus rule means the tooltip only appears if the cursor lingers for over a third of a second — long enough to filter out incidental passes, short enough to feel responsive to a deliberate hover. The delay applies only to the *appearing* transition; disappearing is instant, because a laggy exit reads as sluggish in a way a laggy entrance does not.\n\n**Positioning math**\n\nEach position uses \`calc(100% + 9px)\` to place the tooltip 9px past the trigger's edge, then centers it on the perpendicular axis with \`left: 50%; transform: translateX(-50%)\` (for top/bottom) or the vertical equivalent (for left/right). The \`scale(0.92)\` to \`scale(1)\` transform on entry, combined with a \`transform-origin\` set to the edge nearest the trigger, makes the tooltip grow out of the element it describes rather than simply fading in place.\n\n**Keyboard accessibility**\n\nThe \`:focus-visible\` selector triggers the same reveal as \`:hover\`, so keyboard users tabbing through the page see the same tooltips sighted mouse users get — a common accessibility gap in tooltip implementations that rely on \`:hover\` alone. The icon-only trigger additionally carries \`role="img"\` and \`aria-label\` so screen readers announce its purpose even before any tooltip is triggered.\n\n**Long-content wrapping**\n\nBy default \`.tip\` uses \`white-space: nowrap\` so short labels never awkwardly break. The \`.tip-wide\` modifier switches to \`white-space: normal\` with a fixed \`width: 220px\`, which is what the long-form tooltip in the demo uses — a rule of thumb worth following: keep short tooltips on one line, and give longer explanatory text an explicit wrap width rather than letting it stretch to the viewport edge.\n\n**Viewport-edge behavior**\n\nThis snippet positions tooltips relative to their trigger only — it does not flip a tooltip to the opposite side if it would overflow the viewport. For triggers near a screen edge, pick the \`data-pos\` value that points inward, or add a \`ResizeObserver\`/\`getBoundingClientRect\` check that swaps the \`data-pos\` attribute dynamically when an overflow is detected.\n\nSee also the [popover](/ui-snippets/popover/) snippet for click-triggered (rather than hover-triggered) floating panels with richer content, and the [avatar stack with tooltip](/ui-snippets/avatar-stack-tooltip/) for a specific applied example of this same positioning technique.`,
    },
    howToUse: [
      { title: 'Add data-tip and data-pos to any element', text: 'Wrap the trigger element and add data-tip="your message" plus data-pos="top|bottom|left|right" to choose which side the tooltip appears on.' },
      { title: 'Add the .tip span', text: 'Inside the trigger, add <span class="tip"></span> as the last child — the JS fills its text and the CSS positions it relative to the trigger.' },
      { title: 'Paste the CSS once', text: 'The attribute selectors and animation rules apply to every tooltip on the page automatically — no per-tooltip CSS needed.' },
      { title: 'Include the JS loop', text: 'One querySelectorAll loop reads every data-tip on page load and writes it into its .tip span using textContent for safety.' },
      { title: 'Use .tip-wide for longer messages', text: 'Add class="tip-wide" alongside tip-trigger for explanatory tooltips over a few words — it switches from nowrap to a fixed-width wrapped paragraph.' },
    ],
    features: [
      'Four positions (top, bottom, left, right) driven by a single data-pos attribute — no per-position markup duplication',
      'Content driven by data-tip, written safely via textContent, so no extra markup is needed per tooltip',
      'Self-positioning CSS arrow built from one rotated square, matching the tooltip background automatically',
      '350ms hover-intent delay on entry filters out incidental cursor passes, with instant exit',
      ':focus-visible support so keyboard users see the same tooltips as mouse users',
      'Icon-only trigger example with role="img" and aria-label for baseline screen-reader support',
      '.tip-wide modifier for longer, wrapped explanatory tooltips',
      'Zero dependencies — pure HTML, CSS, and one small JS loop',
    ],
    useCases: [
      { icon: 'GEAR', title: 'Icon-Only Buttons', desc: 'Explaining toolbar icons in a dashboard, alongside a [split button](/ui-snippets/split-button/) for grouped actions' },
      { icon: 'FORM', title: 'Form Field Hints', desc: 'Clarifying validation rules or password requirements without permanently occupying layout space' },
      { icon: 'DOC', title: 'Data Tables', desc: 'Truncated cell values or column header definitions in a [sortable table](/ui-snippets/sortable-table/)' },
      { icon: 'CODE', title: 'Feature Badges', desc: 'Explaining what a status badge or [encrypted lock icon](/ui-snippets/toggle-switch/) means at a glance' },
      { icon: 'APP', title: 'Onboarding Hints', desc: 'Pointing out a new feature the first time a user sees it, paired with an [onboarding tour](/ui-snippets/onboarding-tour/)' },
    ],
    faqs: [
      { q: 'How do I stop a tooltip overflowing the edge of the screen?', a: 'Use the data-pos value that points inward for triggers near an edge (e.g. "left" instead of "right" for the rightmost item in a toolbar), or add a small JS check with getBoundingClientRect() that swaps data-pos when the tooltip would overflow window.innerWidth.' },
      { q: 'Why use transition-delay instead of showing the tooltip instantly?', a: 'An instant tooltip flashes on screen every time the cursor passes over a trigger on its way elsewhere, which reads as noisy. A 300–400ms delay only reveals the tooltip when the user actually pauses on the element, which is what real hover intent looks like.' },
      { q: 'Can I show a tooltip on click instead of hover for touch devices?', a: 'Touch devices have no hover state, so :hover-only tooltips never appear on tap. Add a click handler that toggles a .tip-visible class matching the same CSS the :hover rule uses, and close it on an outside click or a second tap.' },
      { q: 'How do I use this tooltip in React?', a: 'Wrap the trigger in a component that renders the .tip span with the message as a prop, e.g. <Tooltip text="..." pos="top"><button>...</button></Tooltip>. The CSS positioning logic needs no changes since it depends only on data-pos and the DOM structure, not on React state.' },
      { q: 'Can I export this to Vue, Angular, or Tailwind?', a: 'Yes — the Export menu on the snippet page generates a React component, a React + Tailwind version with the positioning offsets expressed as arbitrary-value utility classes, a Vue 3 SFC accepting text and pos as props, and an Angular standalone component with @Input() bindings for the same two values.' },
    ],
    aiPrompt: {
      paragraph: `Paste this tooltip's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the four data-pos variants each calculate their offset and center themselves on the perpendicular axis, and why the CSS arrow is a rotated square rather than the older border-triangle trick. This snippet deliberately does not handle viewport-edge overflow, so it's a good one to hand to an assistant and ask for a getBoundingClientRect-based fix that automatically flips a tooltip from, say, right to left when it would run off the screen. It's also worth asking the assistant to add a touch-friendly tap-to-toggle mode, since the current implementation relies on :hover and :focus-visible, neither of which fires on a touchscreen tap.`,
      prompt: `Build a reusable CSS tooltip system in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Any element should become a tooltip trigger by adding a data-tip attribute containing the message text and a data-pos attribute set to one of four values: top, bottom, left, or right.
- Inside each trigger, include an empty child span that a single JavaScript loop fills with the data-tip text using textContent (not innerHTML) when the page loads, so no markup injection is possible.
- CSS attribute selectors keyed on data-pos must position the tooltip absolutely on the correct side of its trigger with a small gap, centered on the perpendicular axis, with no per-tooltip custom CSS required.
- Each tooltip must have a small triangular arrow pointing at its trigger, built from a single rotated square element rather than a border-based CSS triangle, and it must automatically match the tooltip's background color.
- The tooltip must reveal on both mouse hover and keyboard focus (using :focus-visible, not plain :focus), with a deliberate delay of at least 300ms before it appears so that a cursor briefly passing over the trigger does not flash it, while disappearing instantly with no delay.
- Include a modifier variant for long tooltip text that switches from single-line nowrap text to a wrapped paragraph with a fixed maximum width, and demonstrate both a text-button trigger and an icon-only trigger with an appropriate ARIA label.`,
    },
  },
};

export default tooltip;
