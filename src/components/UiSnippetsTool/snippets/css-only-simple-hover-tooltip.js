const cssOnlySimpleHoverTooltip = {
  id: 'css-only-simple-hover-tooltip',
  title: 'Simple Hover Tooltip — CSS Only, Truly Zero JavaScript',
  lastmod: '2026-08-26',
  category: 'modals',
  html: `<div class="demo">
  <div class="row">
    <button class="tip-trigger">
      Save changes
      <span class="tooltip-text">Saves the current draft without publishing it</span>
    </button>
    <button class="tip-trigger">
      Delete account
      <span class="tooltip-text">Permanently deletes your account and all data. This cannot be undone.</span>
    </button>
  </div>
  <div class="row">
    <span class="tip-trigger tip-icon" tabindex="0" role="img" aria-label="Encrypted with AES-256">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
      <span class="tooltip-text">Encrypted with AES-256 at rest</span>
    </span>
    <a href="#" class="tip-trigger tip-link">
      What is a webhook?
      <span class="tooltip-text">A webhook is an HTTP callback your server receives when an event happens</span>
    </a>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 60px 20px; }
.demo { display: flex; flex-direction: column; gap: 44px; align-items: center; }
.row { display: flex; gap: 28px; align-items: center; flex-wrap: wrap; justify-content: center; }

.tip-trigger { position: relative; display: inline-flex; align-items: center; padding: 10px 16px; border: 1px solid #d1d5db; border-radius: 8px; background: #fff; font-size: 13px; font-weight: 500; color: #1f2937; cursor: pointer; text-decoration: none; }
.tip-icon { padding: 8px; border-radius: 50%; color: #4b5563; background: #f3f4f6; border: none; }
.tip-link { border: none; background: none; padding: 4px 0; color: #4f46e5; font-weight: 600; }

/* The tooltip text lives directly in the markup as static content —
   no data-attribute, no attr()/content() trick, no JS writing text in */
.tooltip-text {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%) translateY(4px);
  width: max-content;
  max-width: 220px;
  background: #111827;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.45;
  padding: 7px 11px;
  border-radius: 6px;
  text-align: center;
  visibility: hidden;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
}

/* CSS-drawn arrow: one rotated square, half-hidden behind the tooltip box */
.tooltip-text::after {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #111827;
  transform: translateX(-50%) translateY(-4px) rotate(45deg);
}

/* Reveal on :hover AND :focus-visible so keyboard users see it too */
.tip-trigger:hover .tooltip-text,
.tip-trigger:focus-visible .tooltip-text {
  visibility: visible;
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}`,
  seo: {
    title: 'Simple CSS Tooltip — No JavaScript, No Attributes, No Script Loop',
    description: 'The simplest possible pure-CSS tooltip: a static child span revealed with :hover and :focus-visible, needing no JavaScript at all, not even a one-line script loop.',
    about: {
      title: 'Simple Hover Tooltip — Static Markup, No JavaScript, Not Even a One-Line Loop',
      description: `This library's other [tooltip](/ui-snippets/tooltip/) snippet uses a small JS loop to copy each trigger's \`data-tip\` attribute into a child \`.tip\` span's \`textContent\`, purely so a single reusable CSS ruleset can serve any number of tooltips without repeating markup. That's a reasonable convenience in a normal web app — but it is still JavaScript, and there are real environments where even that one small loop cannot run at all. This snippet is the version for exactly those environments: the tooltip text is authored directly as static HTML, and the CSS does nothing but reveal and position it.

**Static content instead of a data attribute**

Rather than \`data-tip="..."\` plus a script that reads it, each trigger simply contains a child \`<span class="tooltip-text">\` with the real message typed directly into the markup: \`<span class="tooltip-text">Saves the current draft...</span>\`. There is no attribute to read, no \`textContent\` assignment, no loop over \`querySelectorAll\` — the browser parses the tooltip text as ordinary HTML content the same way it parses the button's own label, and CSS positions and hides/reveals that already-present element.

**Why not attr() and content instead?**

CSS does have a way to pull an HTML attribute's value into rendered content — \`content: attr(data-tip)\` on a \`::before\`/\`::after\` pseudo-element. It was deliberately not used here, for two practical reasons: pseudo-element generated content is not selectable text and is invisible to some assistive technology and to a browser's "find in page," making it a poor choice for genuinely informative tooltip text; and it still requires memorizing and correctly quoting attribute-escaped text in an HTML attribute, which is markedly more error-prone for longer messages than just writing a normal child element. A plain \`<span>\` with real text content is simpler, more accessible, and requires zero special escaping — which is why it's the more broadly-recommended approach for exactly this "truly no JS, no tricks" use case.

**visibility + opacity, not display**

The tooltip toggles \`visibility\` and \`opacity\` together, not \`display\`. \`display\` can't be transitioned by CSS at all, so a fade would be impossible with it; \`visibility\` can be included in a transition list (letting the browser defer hiding until the fade-out finishes) while also removing the element from the accessibility tree and click hit-testing once fully hidden — \`opacity: 0\` alone would leave an invisible-but-interactive tooltip floating over the page.

**The arrow, identical technique to the JS-assisted version**

The small triangle is one 8×8px \`::after\` box rotated 45 degrees positioned so half of it sits behind the tooltip's bottom edge — the same simple, broadly-compatible technique as the reference tooltip.js snippet, since the arrow itself was never dependent on JavaScript in either version; only the *text-filling* mechanism differs between the two snippets.

**:hover and :focus-visible together, same as always**

\`:hover\` alone would leave keyboard users with no way to see the tooltip at all, since tabbing to an element never triggers \`:hover\`. \`:focus-visible\` covers exactly that gap, and because both selectors point at the identical \`.tooltip-text\` rule, mouse and keyboard users get the same visual reveal through two different interaction paths.

**Where this version — not the JS-assisted one — is required**

Sanitized user-generated content (forum posts, comments, wiki pages) frequently strips \`<script>\` tags but allows a constrained set of safe HTML elements including plain \`<span>\`s; many CMS "raw HTML" content areas do the same; HTML email clients strip all scripts universally, with no exceptions; AMP pages forbid custom JavaScript outright; and iframe embeds sandboxed without \`allow-scripts\` simply will not execute any script, however small. In every one of these, the JS-assisted tooltip.js snippet's fill-in loop never runs, so its \`.tip\` spans stay empty and no tooltip text ever appears — while this snippet's statically-authored text is present in the HTML from the very first paint, unaffected by whether scripting is available at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Add class="tip-trigger" to any element', text: 'Works on buttons, links, or any inline element — position: relative on the trigger is what anchors the tooltip\'s absolute positioning.' },
        { title: 'Add a child span.tooltip-text with real text', text: 'Type the tooltip message directly as the span\'s text content — no data attribute, no JavaScript step required.' },
        { title: 'Paste the CSS once', text: 'The :hover and :focus-visible reveal rules apply to every .tip-trigger on the page automatically.' },
        { title: 'Use tip-icon or tip-link modifiers as needed', text: 'These adjust padding/shape for icon-only or link-style triggers; add role="img" and aria-label to icon-only triggers for baseline screen-reader context.' },
        { title: 'Keep tooltip text short', text: 'max-width: 220px wraps longer text automatically, but this pattern is best suited to brief, single-purpose explanations rather than long paragraphs.' },
      ],
    },
    features: [
      'Tooltip text is real, static child markup — no data attribute, no JavaScript step of any kind, not even one line',
      'Deliberately avoids content: attr() generated text, which is unselectable and inconsistently exposed to assistive tech',
      'visibility + opacity transition combination avoids the un-transitionable display property while still removing hit-testing when hidden',
      'Single rotated-square ::after arrow, identical lightweight technique to this library\'s JS-assisted tooltip',
      ':focus-visible reveal alongside :hover gives keyboard users the same tooltip access as mouse users',
      'Works in sanitized user-generated HTML, CMS raw-HTML blocks, HTML email, AMP pages, and script-sandboxed iframes',
      'Icon-only trigger example includes role="img" and aria-label for baseline screen-reader support',
      'Zero dependencies, zero script — pure HTML and CSS only, contrasted explicitly against this site\'s JS-assisted tooltip',
    ],
    useCases: [
      { icon: 'DOC', title: 'Sanitized User-Generated Content', desc: 'Forum posts, wiki pages, or comment sections that allow a safe HTML subset but strip all <script> tags' },
      { icon: 'MAIL', title: 'HTML Email Footnotes', desc: 'Brief explanatory tooltips in transactional or marketing email, where every mail client strips scripts unconditionally' },
      { icon: 'APP', title: 'Script-Sandboxed Iframe Widgets', desc: 'Embedded widgets in an <iframe sandbox> without allow-scripts, where even a one-line JS loop cannot execute' },
      { icon: 'DOC', title: 'AMP Pages', desc: 'AMP explicitly forbids custom JavaScript, making this the only viable tooltip approach on an AMP page' },
      { icon: 'FORM', title: 'CMS Raw-HTML Content Blocks', desc: 'Page builder blocks that accept pasted HTML but execute it in a script-stripped rendering context' },
    ],
    faqs: [
      { q: 'How is this different from the site\'s other Tooltip snippet?', a: 'The other tooltip snippet uses a small JavaScript loop to copy a data-tip attribute\'s value into a child span at page load, which lets one script serve unlimited tooltips without repeating markup. This snippet skips that convenience entirely and writes the tooltip text directly as static HTML, so it needs zero JavaScript, including that one-line loop, and works in contexts where even minimal scripts are stripped.' },
      { q: 'Why not use content: attr(data-tooltip) on a pseudo-element instead of a child span?', a: 'Pseudo-element generated content is not selectable text, is not consistently exposed to screen readers the way real DOM text is, and requires careful attribute-value escaping for longer messages. A plain child span with real text content sidesteps all three issues and is the simpler, more robust choice.' },
      { q: 'Does this tooltip work on touch devices?', a: 'Like most hover-based tooltips, it relies on :hover, which touch devices simulate inconsistently. For a touch-friendly variant, you would need a tap-to-toggle interaction, which requires JavaScript — a limitation this snippet does not attempt to solve, by design.' },
      { q: 'Can I reuse the same CSS for many tooltips on one page?', a: 'Yes — the .tip-trigger / .tooltip-text CSS is fully reusable; just add a new .tip-trigger element with its own .tooltip-text child anywhere on the page. There is no per-tooltip CSS or ID required.' },
      { q: 'Is this accessible to keyboard and screen reader users?', a: 'The :focus-visible rule reveals the tooltip on keyboard focus exactly as :hover does for mouse users. Icon-only triggers additionally use role="img" and aria-label so screen readers announce their purpose independent of whether the visual tooltip is showing.' },
      { q: 'Why does the tooltip use visibility and opacity together instead of just opacity?', a: 'opacity alone leaves an invisible element still clickable and still reachable by "find in page" or screen readers even when faded out. Combining it with visibility (deferred via the transition) fully removes the tooltip from interaction and accessibility exposure once it has finished hiding.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain concretely why content: attr() would have been a worse choice than a real child span for this specific use case — the reasoning (selectability, screen-reader exposure, attribute escaping) generalizes to a lot of other "should I generate this with CSS or just write it in HTML" decisions. It's also worth asking for a version that adds a data-tooltip attribute purely as a documentation/fallback layer while keeping the actual rendered content in the static span, and for guidance on the tradeoffs versus this site's separate JS-assisted tooltip when JavaScript is actually available.`,
      prompt: `Build the simplest possible pure-CSS tooltip in plain HTML and CSS — absolutely no JavaScript, no data attributes read by any script, no <script> tags at all, not even a one-line loop.

Requirements:
- Each tooltip trigger element must contain a child span with the tooltip's message written directly as real, static text content in the HTML — do not use a data attribute combined with a CSS content: attr() trick, and do not use any JavaScript to fill in text.
- The tooltip span must be absolutely positioned above its trigger, hidden by default using a combination of visibility and opacity (not display, since display cannot be transitioned), and revealed smoothly with a CSS transition.
- The tooltip must reveal on both :hover and :focus-visible (not plain :focus) so keyboard-only users get the same access as mouse users.
- Include a small CSS-drawn arrow pointing from the tooltip toward its trigger, built from a single rotated square pseudo-element that automatically matches the tooltip's background color.
- Demonstrate at least one text-button trigger, one icon-only trigger with an appropriate ARIA label, and one link-style trigger.
- In accompanying comments, explain why this approach needs no JavaScript whatsoever, contrasted with a hypothetical version that uses a data attribute and a script loop to fill in tooltip text.`,
    },
  },
};

export default cssOnlySimpleHoverTooltip;
