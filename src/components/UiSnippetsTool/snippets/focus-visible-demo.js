const focusVisibleDemo = {
  id: 'focus-visible-demo',
  title: ':focus-visible vs :focus Explainer',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="instructions">
    <div class="instruction-card mouse">
      <span class="instruction-icon">&#128433;</span>
      <p><strong>Click</strong> the elements below with your mouse or a touch tap.</p>
    </div>
    <div class="instruction-card keyboard">
      <span class="instruction-icon">&#8677;</span>
      <p><strong>Press Tab</strong> to move focus between elements with your keyboard.</p>
    </div>
  </div>

  <div class="element-row">
    <button class="demo-el demo-btn" id="el-button">Button</button>
    <input class="demo-el demo-input" id="el-input" type="text" placeholder="Text input">
    <a class="demo-el demo-link" id="el-link" href="#">Link</a>
    <div class="demo-el demo-div" id="el-div" tabindex="0">Custom div (tabindex=0)</div>
  </div>

  <div class="legend">
    <div class="legend-item">
      <span class="legend-swatch swatch-focus"></span>
      <span><code>:focus</code> style &mdash; blue dashed outline, fires for ANY focus method</span>
    </div>
    <div class="legend-item">
      <span class="legend-swatch swatch-focus-visible"></span>
      <span><code>:focus-visible</code> style &mdash; solid indigo ring, fires mainly for keyboard navigation</span>
    </div>
  </div>

  <div class="log-panel">
    <div class="log-header">
      <h3>Interaction log</h3>
      <button class="clear-btn" id="clear-log">Clear</button>
    </div>
    <ul class="log-list" id="log-list">
      <li class="log-empty">Interact with an element above to see which pseudo-class fired.</li>
    </ul>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; color: #1e293b; }

.demo-wrap { max-width: 680px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; gap: 24px; }

.instructions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.instruction-card { background: #fff; border-radius: 12px; padding: 14px 16px; display: flex; align-items: center; gap: 10px; box-shadow: 0 1px 6px rgba(0,0,0,0.05); }
.instruction-icon { font-size: 20px; }
.instruction-card p { font-size: 12.5px; color: #475569; line-height: 1.5; }

.element-row { display: flex; flex-wrap: wrap; gap: 14px; background: #fff; border-radius: 16px; padding: 26px 22px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); align-items: center; }

.demo-el { font-family: inherit; font-size: 14px; padding: 10px 18px; border-radius: 9px; }

.demo-btn { background: #6366f1; color: #fff; border: none; cursor: pointer; font-weight: 600; }
.demo-btn:hover { background: #4f46e5; }

.demo-input { border: 1.5px solid #e2e8f0; background: #f8fafc; color: #1e293b; }

.demo-link { color: #4338ca; text-decoration: none; font-weight: 600; padding: 10px 14px; border-radius: 9px; }

.demo-div { background: #f1f5f9; color: #475569; cursor: pointer; border: 1.5px dashed #cbd5e1; }

/* :focus fires for ANY focus method, including mouse click */
.demo-el:focus {
  outline: 3px dashed #3b82f6;
  outline-offset: 3px;
}

/* :focus-visible overrides with a distinct ring, mainly for keyboard nav.
   Browsers already suppress :focus-visible on mouse-clicked buttons/links/divs
   by default, so this rule mostly matters for text inputs where focus-visible
   still fires on click (since typing intent is always relevant there). */
.demo-el:focus-visible {
  outline: 3px solid #6366f1;
  outline-offset: 3px;
  box-shadow: 0 0 0 6px rgba(99,102,241,0.15);
}

.legend { display: flex; flex-direction: column; gap: 8px; background: #fff; border-radius: 12px; padding: 14px 18px; box-shadow: 0 1px 6px rgba(0,0,0,0.05); }
.legend-item { display: flex; align-items: center; gap: 10px; font-size: 12.5px; color: #475569; }
.legend-item code { background: #f1f5f9; padding: 1px 6px; border-radius: 4px; font-size: 11.5px; color: #6366f1; }
.legend-swatch { width: 22px; height: 14px; border-radius: 4px; flex-shrink: 0; }
.swatch-focus { border: 2.5px dashed #3b82f6; }
.swatch-focus-visible { border: 2.5px solid #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

.log-panel { background: #0f172a; border-radius: 14px; padding: 16px 18px; }
.log-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.log-header h3 { font-size: 13px; color: #e2e8f0; font-weight: 700; }
.clear-btn { background: transparent; border: 1px solid #334155; color: #94a3b8; font-size: 11px; padding: 4px 10px; border-radius: 6px; cursor: pointer; font-family: inherit; }
.clear-btn:hover { border-color: #6366f1; color: #a5b4fc; }

.log-list { list-style: none; display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; }
.log-empty { font-size: 12.5px; color: #64748b; font-style: italic; }
.log-list li { font-size: 12.5px; color: #cbd5e1; font-family: 'SFMono-Regular', Consolas, monospace; display: flex; gap: 8px; align-items: center; }
.log-tag { font-size: 10px; font-weight: 700; padding: 2px 7px; border-radius: 20px; text-transform: uppercase; letter-spacing: 0.02em; }
.log-tag.visible { background: rgba(99,102,241,0.2); color: #a5b4fc; }
.log-tag.notvisible { background: rgba(59,130,246,0.15); color: #93c5fd; }`,

  js: `const elements = document.querySelectorAll('.demo-el');
const logList = document.getElementById('log-list');
const clearBtn = document.getElementById('clear-log');

function addLogEntry(name, isFocusVisible) {
  const empty = logList.querySelector('.log-empty');
  if (empty) empty.remove();

  const li = document.createElement('li');
  const tag = document.createElement('span');
  tag.className = 'log-tag ' + (isFocusVisible ? 'visible' : 'notvisible');
  tag.textContent = isFocusVisible ? ':focus-visible' : ':focus (not visible)';

  const label = document.createElement('span');
  label.textContent = name;

  li.appendChild(tag);
  li.appendChild(label);
  logList.insertBefore(li, logList.firstChild);

  // Keep the log from growing unbounded
  while (logList.children.length > 12) {
    logList.removeChild(logList.lastChild);
  }
}

elements.forEach(el => {
  el.addEventListener('focusin', () => {
    // matches(':focus-visible') tells us whether the browser's own heuristic
    // (keyboard nav, or programmatic focus, vs a raw mouse/touch click on a
    // button/link/div) decided this focus event should show a visible ring.
    const isFocusVisible = el.matches(':focus-visible');
    const name = el.id
      .replace('el-', '')
      .replace(/^./, c => c.toUpperCase());
    addLogEntry(name, isFocusVisible);
  });
});

clearBtn.addEventListener('click', () => {
  logList.innerHTML = '<li class="log-empty">Interact with an element above to see which pseudo-class fired.</li>';
});`,

  seo: {
    title: ':focus-visible vs :focus Demo — Free HTML CSS JS Snippet',
    description: 'Interactive explainer showing when :focus fires vs :focus-visible, with a live interaction log. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: ':focus-visible vs :focus — Interactive CSS Pseudo-Class Explainer with Live Interaction Logging',
      description: `Focus styling is one of the most frequently botched pieces of accessible UI on the web. For years, developers had exactly one option — the \`:focus\` pseudo-class — which fires the moment ANY element receives keyboard input focus, including when a user simply clicks a button with a mouse. Because default browser focus rings (that blue glow around a clicked button) looked visually noisy to many designers, an enormous number of sites shipped \`*:focus { outline: none; }\` globally, silently stripping keyboard focus indication sitewide and making the page unusable for keyboard and switch-device users. \`:focus-visible\`, standardized in the CSS Selectors Level 4 spec and shipped natively in all major browsers since 2020-2021, fixes this by letting the browser itself decide, using its own heuristics, whether a focus event was likely triggered by keyboard/assistive-technology navigation (show a ring) versus a direct pointer interaction (usually suppress it).

**The actual browser heuristic**

\`:focus-visible\` is not simply "keyboard = true, mouse = false." The specification defines heuristics that browsers implement slightly differently but converge on in practice: a \`<button>\`, \`<a>\`, or a plain \`<div tabindex="0">\` clicked directly with a mouse generally does NOT match \`:focus-visible\` (because the user can already see what they clicked, a ring adds little value), but that same click on a \`<button>\` still matches \`:focus\`. Meanwhile a text \`<input>\` clicked with a mouse DOES typically still match \`:focus-visible\`, because focusing a text field is itself an implicit signal you're about to type and the insertion point benefits from a clear visual anchor. Any focus reached via Tab, Shift+Tab, arrow-key navigation inside composite widgets, or a screen reader's virtual cursor reliably matches \`:focus-visible\` across every interactive element type. Programmatic focus via \`el.focus()\` in JavaScript inherits the visibility state of whatever interaction triggered it, with document-level heuristics as a fallback.

**Why this distinction matters for real products**

Before \`:focus-visible\` existed, teams had to choose between two bad options: leave the default mouse-triggered focus ring in place (which many stakeholders reject as "ugly," clicking any button leaves a visible blue box) or strip focus outlines entirely with \`outline: none\` (which is a WCAG 2.4.7 "Focus Visible" failure and breaks the product for keyboard-only and switch-device users, a legally significant accessibility gap under ADA/Section 508 in many jurisdictions). \`:focus-visible\` resolves the tension natively, with zero JavaScript: style \`:focus-visible\` with your polished, prominent focus ring, and optionally leave a lighter or absent \`:focus\` style for pointer interactions, letting the browser's own input-method detection do the work that used to require third-party libraries like the old \`focus-visible\` polyfill (a JS library shimming this exact behavior before native support existed).

**What this playground demonstrates**

Four different interactive elements — a \`<button>\`, a text \`<input>\`, an \`<a>\` link, and a plain \`<div tabindex="0">\` — are each styled with two competing rules: \`.demo-el:focus\` applies a dashed blue outline unconditionally, and \`.demo-el:focus-visible\` applies a solid indigo ring with a soft glow that visually wins whenever it also matches (later rule, higher specificity of the more precise selector in practice, though both are single pseudo-classes here so declaration order decides). Click each element with your mouse, then Tab through them with your keyboard, and watch the live interaction log at the bottom record, in real time, whether \`:focus-visible\` matched for that exact focus event — captured by calling \`element.matches(':focus-visible')\` inside a \`focusin\` listener. You'll observe the button, link, and custom div suppress the indigo ring on a raw mouse click while the text input keeps it, exactly matching the spec's documented heuristic, and every Tab-driven focus event shows the ring regardless of element type.

**Implementation notes for your own components**

Because \`:focus-visible\` needs no JavaScript feature detection or event listener to use in production CSS — the interaction log here is purely a teaching aid, not a requirement — you can adopt it today by simply replacing \`outline: none\` reset rules with a deliberate \`:focus-visible\` ring and, if you want a subtler acknowledgment for pointer users, a lighter \`:focus:not(:focus-visible)\` style. Support has existed in Chrome/Edge since 86, Firefox since 85, and Safari since 15.4, so no polyfill is needed in 2025/2026 codebases.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click each element with your mouse', text: 'Click the Button, the Input, the Link, and the custom Div in the .element-row one at a time. Watch the log panel record whether :focus-visible matched — notice the button, link, and div typically log "not visible" while the text input still logs "visible", exactly following the spec heuristic.' },
        { title: 'Tab through the same elements with your keyboard', text: 'Click somewhere neutral first (like the page background) to remove focus, then press Tab repeatedly to move focus through #el-button, #el-input, #el-link, and #el-div in order. Every element should log "visible" in the interaction panel this time, since keyboard-driven focus always matches :focus-visible.' },
        { title: 'Read the live interaction log', text: 'Each focusin listener calls element.matches(":focus-visible") the instant focus lands, and addLogEntry() pushes a new entry to the top of #log-list tagged either ":focus-visible" (indigo) or ":focus (not visible)" (blue), letting you correlate your exact interaction with the resulting pseudo-class match.' },
        { title: 'Inspect the competing CSS rules', text: 'In the CSS panel, compare .demo-el:focus (a 3px dashed #3b82f6 outline that fires unconditionally) against .demo-el:focus-visible (a 3px solid #6366f1 ring plus a soft box-shadow glow) to see exactly how the two rules are declared and why the more specific-looking :focus-visible style visually wins whenever both apply simultaneously.' },
        { title: 'Adapt the pattern for outline: none resets', text: 'In your own stylesheet, never write a bare *:focus { outline: none; } reset. Instead write *:focus-visible { outline: 3px solid var(--focus-color); } and, if you still want pointer users to get some acknowledgment, add *:focus:not(:focus-visible) { outline: 1px solid transparent; } so mouse clicks stay visually quiet without breaking keyboard accessibility.' },
        { title: 'Test with assistive technology', text: 'Beyond mouse and keyboard, verify your real components with a screen reader\'s virtual cursor (NVDA, JAWS, VoiceOver) — focus-visible-matched styles should appear whenever the virtual cursor lands on a focusable element, confirming your ring is genuinely serving assistive technology users, not just sighted keyboard users.' },
      ],
    },
    features: [
      'Four distinct focusable element types (button, input, link, div[tabindex=0]) demonstrating per-element focus-visible heuristics',
      'Live element.matches(\":focus-visible\") check inside a focusin listener, logged in real time with no polling',
      'Dual CSS focus styling: unconditional :focus dashed outline vs conditional :focus-visible solid ring + glow',
      'Scrolling interaction log capped at 12 entries via logList.children.length check to prevent unbounded DOM growth',
      'Clear-log button resets the panel to its empty state placeholder',
      'Color-coded log tags (indigo for :focus-visible match, blue for :focus-only) for instant visual scanning',
      'Zero JavaScript polyfill required — relies entirely on native browser :focus-visible support (Chrome 86+, Firefox 85+, Safari 15.4+)',
      'Custom tabindex=0 div included specifically to show the heuristic applies beyond native interactive elements',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching accessibility fundamentals to a frontend team', desc: 'Use this playground in an onboarding session or design-system documentation to give engineers a hands-on, undeniable demonstration of why outline: none is a WCAG 2.4.7 violation and why :focus-visible is the modern fix. Watching the log confirm the exact same click behaves differently across element types makes the abstract spec language concrete.' },
      { icon: 'FORM', title: 'Auditing an existing design system\'s focus styles', desc: 'Copy the .demo-el:focus and .demo-el:focus-visible rule pattern into a component library audit to check whether buttons, links, and custom interactive divs correctly suppress the ring on pointer clicks while still showing it for keyboard navigation, catching regressions where a blanket outline: none reset silently broke accessibility.' },
      { icon: 'CODE', title: 'Replacing a legacy focus-visible polyfill with native CSS', desc: 'Teams that adopted the old JS focus-visible polyfill library before browser support landed can use this snippet as a reference for the native equivalent, removing the polyfill script and its associated data-focus-visible-added class-toggling logic entirely in favor of the plain :focus-visible selector.' },
      { icon: 'DESIGN', title: 'Designing a focus ring that satisfies both aesthetics and accessibility', desc: 'Use the live ring styling in this demo (solid indigo outline plus a soft box-shadow glow) as a starting template for a design system\'s focus token, then swap #6366f1 for your own accent color — the same approach used for the accent ring in the [GDPR Consent Manager](/ui-snippets/gdpr-consent-manager) toggle switches.' },
      { icon: 'APP', title: 'Debugging why a custom component\'s focus ring never appears', desc: 'If a custom tabindex=0 widget in your app never shows a focus ring even when tabbed to, use the exact matches(\":focus-visible\") check from this snippet\'s JS to log focus events in your real component and confirm whether the browser is matching the pseudo-class at all, versus a CSS specificity or overriding outline: none rule elsewhere suppressing it.' },
      { icon: 'FLOW', title: 'Validating keyboard navigation flows during QA', desc: 'QA engineers can Tab through a page and rely on visually distinct :focus-visible rings, informed by this demo\'s dashed-vs-solid contrast pattern, to confirm every interactive element in a user flow is reachable and clearly indicated via keyboard alone before sign-off.' },
      { icon: 'CODE', title: 'Related: Morse Code Translator & Player', desc: 'See the [Morse Code Translator & Player](/ui-snippets/morse-code-translator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the actual difference between :focus and :focus-visible?', a: ':focus matches an element the instant it receives focus, regardless of how — mouse click, touch tap, keyboard Tab, or JavaScript el.focus() all trigger it identically. :focus-visible matches only when the browser\'s own heuristic determines a visible indicator would help the user, which in practice means keyboard/assistive-tech-driven focus events almost always match, while direct mouse or touch clicks on buttons, links, and generic tabindex elements usually do NOT match (though clicking a text input still does, since typing intent is always relevant there).' },
      { q: 'Do I still need JavaScript to use :focus-visible?', a: 'No — :focus-visible is a native CSS pseudo-class with full support in Chrome/Edge 86+, Firefox 85+, and Safari 15.4+, so plain CSS selectors like .btn:focus-visible { outline: ... } work with zero JavaScript in production. This snippet only uses JavaScript (element.matches(\":focus-visible\") inside a focusin listener) to build the educational interaction log, not to make the styling itself function.' },
      { q: 'Why did the button not show a focus-visible ring when I clicked it?', a: 'That is the intended, spec-defined behavior: clicking a button with a mouse is not considered a case where the user needs an additional visual indicator, since the sighted user already knows exactly what they clicked. Tab to the same button with your keyboard instead and it will show the ring, because keyboard-driven focus does not carry the same implicit visual confirmation.' },
      { q: 'Should I remove outline: none from my old CSS resets?', a: 'Yes, always replace outline: none resets with a deliberate :focus-visible style rather than removing focus indication outright. A bare *:focus { outline: none; } (with no :focus-visible replacement) is a common and serious accessibility regression that fails WCAG 2.4.7 and makes your site effectively unusable for keyboard-only and switch-device users, since they lose all visual confirmation of where focus currently is.' },
      { q: 'Can I style :focus and :focus-visible differently on the same element?', a: 'Yes, and it is a common pattern: use :focus-visible for your prominent, high-contrast ring, and optionally add a :focus:not(:focus-visible) rule for a much subtler acknowledgment (or none at all) on pointer-triggered focus, so mouse users get a clean interface while keyboard and assistive-technology users still get a clear, unmissable indicator.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why clicking the button and the div suppress the :focus-visible ring while clicking the text input does not — the assistant can walk through the underlying browser heuristic in more depth than a comment can. You could also ask it to add a fifth interactive element, like a custom radio-button group built from divs, and predict how the log would behave for it before you test. It's a good candidate for extension too: ask the assistant to add a running tally counting how many times each pseudo-class fired, or to add a :focus:not(:focus-visible) style showing the subtler "acknowledgment only" pattern recommended for production use. Treat the demo as a live reference to interrogate, not just a finished artifact.`,
      prompt: `Build an interactive explainer comparing the CSS :focus and :focus-visible pseudo-classes in plain HTML, CSS, and JavaScript.

Requirements:
- At least four differently-typed focusable elements in a row: a native button, a native text input, a native anchor link, and a plain div with tabindex="0", so the browser's per-element-type focus-visible heuristic is visible.
- Two competing CSS focus styles on every element: one rule keyed on :focus that always applies a visible outline regardless of interaction method, and a second rule keyed on :focus-visible with a visually distinct, more prominent ring plus a soft box-shadow glow that only applies when the browser determines the focus event should be visually indicated.
- On-screen instructions telling the user to first click each element with a mouse, then separately Tab through them with a keyboard, so they can directly compare the two interaction methods.
- A live, scrolling interaction log that records, for every focus event, which element was focused and whether element.matches(':focus-visible') returned true, using a focusin listener on each element rather than polling.
- Color-coded log entries so a :focus-visible match and a :focus-only (not visible) match are visually distinguishable at a glance.
- A clear-log button that resets the log panel to an empty placeholder state.
- No JavaScript polyfill for the pseudo-class itself — rely entirely on native browser :focus-visible support, using JavaScript only to observe and log the result via matches().`,
    },
  },
};

export default focusVisibleDemo;
