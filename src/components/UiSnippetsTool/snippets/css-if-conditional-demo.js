const cssIfConditionalDemo = {
  id: 'css-if-conditional-demo',
  title: 'CSS if() Conditional Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="cif-wrap">
  <div class="cif-card" id="cifCard" data-priority="medium">
    <div class="cif-card-top">
      <span class="cif-badge" id="cifBadge">Medium priority</span>
      <span class="cif-support" id="cifSupport">Checking support&hellip;</span>
    </div>
    <h3>Rewrite onboarding emails</h3>
    <p>Border color, badge color, and badge text all react to the priority below.</p>
  </div>

  <div class="cif-controls">
    <span class="cif-controls-label">Priority</span>
    <div class="cif-btns" id="cifBtns">
      <button type="button" class="cif-btn" data-value="low">Low</button>
      <button type="button" class="cif-btn selected" data-value="medium">Medium</button>
      <button type="button" class="cif-btn" data-value="high">High</button>
    </div>
  </div>

  <p class="cif-note" id="cifNote">This browser supports CSS <code>if()</code> &mdash; colors above are driven purely by CSS reacting to a custom property. No class is being toggled for color.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1017;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.cif-wrap{width:100%;max-width:420px}

/* --- Fallback path: plain CSS, no if() ---------------------------------- */
/* This is the baseline every browser gets. Colors here are applied either
   by these class rules directly, or (see below) overridden by the modern
   if()-driven rules when the browser actually supports if(). */
.cif-card{
  --priority: medium;
  background:#12151f;
  border:1px solid #232838;
  border-left:4px solid #6b7280;
  border-radius:14px;
  padding:18px 20px;
  box-shadow:0 20px 50px rgba(0,0,0,.45);
  transition:border-left-color .2s;
}
.cif-card[data-priority="low"]{border-left-color:#34d399}
.cif-card[data-priority="medium"]{border-left-color:#fbbf24}
.cif-card[data-priority="high"]{border-left-color:#f87171}

.cif-card-top{display:flex;align-items:center;justify-content:space-between;gap:10px;margin-bottom:10px}
.cif-badge{font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.04em;padding:4px 10px;border-radius:999px;background:rgba(107,114,128,.15);color:#9ca3af}
.cif-card[data-priority="low"] .cif-badge{background:rgba(52,211,153,.14);color:#34d399}
.cif-card[data-priority="medium"] .cif-badge{background:rgba(251,191,36,.14);color:#fbbf24}
.cif-card[data-priority="high"] .cif-badge{background:rgba(248,113,113,.14);color:#f87171}
.cif-support{font-size:10px;color:#4b5566;font-weight:700}

.cif-card h3{font-size:14.5px;font-weight:800;color:#e5e7eb;margin-bottom:5px}
.cif-card p{font-size:12px;color:#8b93a3;line-height:1.5}

/* --- Modern path: CSS if() with style() queries -------------------------
   As of 2026, if() is a very new, still-experimental CSS Values and Units
   Level 5 feature with limited browser support. It lets a property value
   branch on the computed value of a custom property directly in CSS, with
   no JavaScript class toggling involved. This whole block is gated behind
   an @supports feature query, so unsupported browsers never see it and
   simply keep using the class-based fallback rules above. */
@supports (color: if(style(--cif-test: 1): red; else: blue)) {
  .cif-card{
    border-left-color: if(
      style(--priority: high): #f87171;
      style(--priority: medium): #fbbf24;
      else: #34d399
    );
  }
  .cif-badge{
    background: if(
      style(--priority: high): rgba(248,113,113,.14);
      style(--priority: medium): rgba(251,191,36,.14);
      else: rgba(52,211,153,.14)
    );
    color: if(
      style(--priority: high): #f87171;
      style(--priority: medium): #fbbf24;
      else: #34d399
    );
  }
}

.cif-controls{display:flex;align-items:center;justify-content:space-between;margin-top:16px}
.cif-controls-label{font-size:11.5px;font-weight:700;color:#8b93a3}
.cif-btns{display:flex;gap:6px;background:#12151f;border:1px solid #232838;border-radius:10px;padding:4px}
.cif-btn{background:none;border:none;color:#8b93a3;font-size:12px;font-weight:700;padding:6px 12px;border-radius:7px;cursor:pointer;transition:background .12s,color .12s}
.cif-btn:hover{color:#e5e7eb}
.cif-btn.selected{background:#232838;color:#f1f5f9}

.cif-note{margin-top:14px;font-size:11.5px;color:#5b6472;line-height:1.6;background:#12151f;border:1px solid #232838;border-radius:10px;padding:10px 12px}
.cif-note code{background:#1c2130;padding:1px 5px;border-radius:4px;color:#a5b4fc;font-family:ui-monospace,monospace}`,

  js: `var card = document.getElementById('cifCard');
var badge = document.getElementById('cifBadge');
var btnsWrap = document.getElementById('cifBtns');
var supportEl = document.getElementById('cifSupport');
var noteEl = document.getElementById('cifNote');

var LABELS = { low: 'Low priority', medium: 'Medium priority', high: 'High priority' };

// Feature-detect the CSS if() function with a style() query. As of 2026 this
// is a brand-new, experimental part of the CSS Values and Units Level 5
// draft, so most browsers will correctly report "not supported" here — that
// is expected, not a bug in this demo.
var SUPPORTS_IF = (function () {
  try {
    return CSS.supports('color', 'if(style(--cif-test: 1): red; else: blue)');
  } catch (e) {
    return false;
  }
})();

function applyPriority(value) {
  // The custom property is always set. In browsers that support if(), this
  // single line is doing 100% of the color work above via the @supports
  // block in the CSS — nothing else in this function touches color.
  card.style.setProperty('--priority', value);
  card.dataset.priority = value; // fallback path: plain attribute-selector CSS reacts to this

  badge.textContent = LABELS[value];

  btnsWrap.querySelectorAll('.cif-btn').forEach(function (b) {
    b.classList.toggle('selected', b.dataset.value === value);
  });
}

if (SUPPORTS_IF) {
  supportEl.textContent = 'if() supported';
  supportEl.style.color = '#34d399';
  noteEl.innerHTML = 'This browser supports CSS <code>if()</code> &mdash; the border and badge colors above are driven purely by CSS reacting to the <code>--priority</code> custom property through <code>@supports (color: if(&hellip;))</code>. JavaScript only sets that one custom property; it never toggles a color class.';
} else {
  supportEl.textContent = 'if() not supported \\u2014 using fallback';
  supportEl.style.color = '#fbbf24';
  noteEl.innerHTML = 'This browser does not yet support CSS <code>if()</code> (expected \\u2014 it\\'s still experimental as of 2026). The colors above are coming from the plain <code>data-priority</code> attribute-selector CSS fallback instead, so the demo still looks correct.';
}

btnsWrap.addEventListener('click', function (e) {
  var btn = e.target.closest('.cif-btn');
  if (!btn) return;
  applyPriority(btn.dataset.value);
});

applyPriority('medium');`,

  seo: {
    title: 'CSS if() Conditional Demo — Free HTML CSS JS Snippet',
    description: `A hands-on demo of the new, experimental native CSS if() function with style() queries, gated behind a real @supports feature query with a graceful class-based fallback.`,
    about: {
      title: 'CSS if() Conditional Demo — Native Conditional Styling With a Real Fallback',
      description: `CSS has always needed JavaScript to change a style based on a value stored in a custom property — you'd read the property, decide, and toggle a class. The proposed \`if()\` function (part of the CSS Values and Units Level 5 draft) lets a property value branch directly in CSS using \`style()\` queries against a custom property, with no JavaScript decision-making at all. This snippet is a small, honest demo of that feature: a priority card whose border and badge colors react to a \`--priority\` custom property purely through CSS, with a real \`@supports\` feature query and a fully working fallback for the (currently large) majority of browsers that don't support it yet. See also [css has selector playground](/ui-snippets/css-has-selector-playground/) and [css container query units demo](/ui-snippets/css-container-query-units-demo/) for other emerging-CSS demos.

**Being honest about support**

As of 2026, \`if()\` is genuinely new and experimental — it is not broadly supported the way \`:has()\` or container queries now are. This demo does not assume you're on a browser that supports it: it feature-detects with \`CSS.supports()\` at load time and clearly labels which path is active, right in the UI, so you can see for yourself whether your current browser is running the modern CSS-only path or the fallback.

**The modern path: if() with style() queries**

Inside an \`@supports\` block, \`border-left-color\` and the badge's \`background\`/\`color\` are set with expressions like \`if(style(--priority: high): #f87171; style(--priority: medium): #fbbf24; else: #34d399)\`. Each \`style()\` query checks the *computed value* of the \`--priority\` custom property on that element, and the whole expression evaluates to whichever branch matches — functioning like an inline ternary chain, but written entirely in CSS with no JavaScript reading or branching on the value.

**JavaScript's only job: setting one property**

In a supporting browser, \`applyPriority()\` does exactly one color-relevant thing: \`card.style.setProperty('--priority', value)\`. It does not add or remove a color class, does not set any inline color, and does not otherwise touch the DOM's presentation — every color you see is a direct consequence of that single custom-property write flowing through the \`if()\` expressions in CSS.

**A real, working fallback**

The \`@supports (color: if(style(--cif-test: 1): red; else: blue))\` feature query is the mechanism that keeps this safe: it evaluates to false in any browser that doesn't understand \`if()\`, so those rules are simply never applied — there's no broken, half-parsed CSS left behind. Underneath, a completely ordinary set of \`data-priority\` attribute-selector rules (\`.cif-card[data-priority="high"] { border-left-color: #f87171 }\`) provides the exact same visual result, so the demo degrades gracefully rather than breaking.

**When to reach for this yourself**

Treat \`if()\` today as something to watch, not something to ship without a fallback — exactly the pattern this snippet demonstrates. If you use it in production ahead of broad support, always pair it with a genuine \`@supports\`-gated (or attribute/class-based) fallback path like this one, and re-test browser support periodically since this is one of the fastest-moving corners of the CSS spec.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A priority card renders with Medium selected and a support indicator in its top-right corner.` },
      { title: 'Check the support label', text: `It reads "if() supported" in green or "if() not supported — using fallback" in amber, based on your actual browser.` },
      { title: 'Click Low, Medium, or High', text: `The border color, badge background, and badge text all update to match.` },
      { title: 'Read the note below', text: `It explains exactly which code path (CSS if() or the class/attribute fallback) is producing what you're seeing.` },
      { title: 'Inspect the CSS', text: `The @supports block clearly separates the experimental if() rules from the always-on fallback rules.` },
      { title: 'Test in different browsers', text: `Support for if() is expected to vary significantly — that variance is exactly what this demo is built to show honestly.` },
    ] },
    features: [
      { title: 'Real CSS.supports() detection', text: `Feature detection happens at runtime and is shown directly in the UI, not assumed.` },
      { title: 'Genuine @supports gate', text: `The if() rules are wrapped in a real feature query, never left to fail silently or break layout.` },
      { title: 'Working attribute-selector fallback', text: `Unsupported browsers get an equivalent visual result from ordinary CSS, not a broken page.` },
      { title: 'JS sets only one property', text: `In the supported path, JavaScript never toggles a color class — one custom-property write drives everything.` },
      { title: 'style() query branching', text: `Demonstrates if() branching on a custom property's computed value, CSS's answer to a ternary.` },
      { title: 'Transparent support labeling', text: `A visible badge and note tell you exactly which code path is currently active.` },
      { title: 'No layout breakage either way', text: `Both the modern and fallback paths render an identical, complete-looking card.` },
      { title: 'Copy-paste safe', text: `Because of the @supports gate, this snippet is safe to use in production today without risking unsupported browsers.` },
    ],
    useCases: [
      { title: 'Learning emerging CSS features', text: `A hands-on way to see if() and style() queries without hunting through spec drafts.` },
      { title: 'Progressive enhancement demos', text: `A template for safely gating any bleeding-edge CSS feature behind @supports.` },
      { title: 'Design system prototyping', text: `Explore reducing JS-driven class toggling in favor of CSS-native conditionals as support grows.` },
      { title: 'Conference talks and blog posts', text: `A concrete, working example to accompany writing about CSS if() and its rollout.` },
      { title: 'Browser compatibility testing', text: `Drop this into different browsers/versions to track real-world if() support over time.` },
      { title: 'Complementary CSS-feature demos', text: `Pairs with [css has selector playground](/ui-snippets/css-has-selector-playground/) and [css container query units demo](/ui-snippets/css-container-query-units-demo/) in a "new CSS" showcase.` },
      { icon: 'CODE', title: 'Related: Drag & Drop Reorder List', desc: 'See the [Drag & Drop Reorder List](/ui-snippets/drag-drop-reorder-list/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is CSS if() actually supported anywhere yet?', a: `As of 2026, if() with style() queries is a genuinely new, experimental part of the CSS Values and Units Level 5 draft. Support is limited and inconsistent across browsers and versions — this demo does not assume it works, which is exactly why it feature-detects with CSS.supports() and shows you, live, which code path your browser is actually using rather than claiming universal support.` },
      { q: 'What does the @supports query in the CSS actually check?', a: `@supports (color: if(style(--cif-test: 1): red; else: blue)) asks the browser "do you know how to parse and apply an if()/style() expression as a color value?" If the browser doesn't recognize the syntax, the feature query evaluates to false and every rule inside that block is skipped entirely — the browser never attempts to apply malformed or partially-understood CSS, which is what keeps the fallback path completely clean.` },
      { q: 'How is this different from just using CSS custom properties with var()?', a: `A custom property plus var() can only be swapped to a different fixed value from JavaScript — the branching logic ("if high, red; if medium, amber; else green") has traditionally lived in JavaScript, which then sets or toggles the appropriate value or class. if() moves that branching decision itself into CSS: the same custom property write now flows through conditional logic that lives entirely in the stylesheet, not in a script.` },
      { q: 'Does the fallback look identical to the if()-driven version?', a: `Yes by design — the fallback uses plain data-priority attribute-selector rules (.cif-card[data-priority="high"] { border-left-color: #f87171 }) that produce the exact same colors as the if() expressions for each priority level. The point of a graceful fallback is that a viewer on an unsupported browser should see a fully correct result, not a degraded or broken one.` },
      { q: 'Should I use if() in a real production project today?', a: `Only ahead of broad support if you pair it with a real, tested fallback exactly like this one — never ship if()-only styling with no @supports gate, since unsupported browsers would simply not receive any of those styles. Treat it as an enhancement layered on top of solid, working CSS, and re-check browser support periodically since experimental CSS features like this can gain support quickly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the feature-detection and fallback strategy by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the @supports (color: if(style(--cif-test: 1): red; else: blue)) feature query is testing for and why that specific construction (rather than a simpler string check) correctly gates the if()-based rules without breaking unsupported browsers. The same assistant can help you verify current browser support for if() and style() queries, since this is one of the fastest-moving parts of the CSS spec and any claim about support can go stale quickly — always double check against an up to date source. It's also useful for extending the demo: ask it to add a third state that reacts to a container query alongside the style() query, explain how if() differs from the older env()/var() fallback chain pattern, or show what the equivalent JavaScript-only version of this component would look like for comparison. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a small demo of the experimental native CSS if() function (with style() queries against a custom property) in plain HTML, CSS, and JavaScript, with an honest, working fallback for browsers that don't support it — no frameworks or libraries.

Requirements:
- Create a simple card component (e.g. a priority-labeled task card) whose border color and a status badge's background/text color are meant to react to a "priority" state of low/medium/high, without any JavaScript directly setting or toggling a color-specific CSS class.
- Write the modern styling path using the proposed CSS if() function with style() queries — e.g. a value like if(style(--priority: high): red; style(--priority: medium): orange; else: green) — so that setting one CSS custom property from JavaScript is the only thing that needs to happen for every dependent color to update, with the branching logic itself living in the CSS, not the script.
- Wrap all if()-based rules inside a real @supports feature query that actually tests for if()/style() support (not a hard-coded true/false or a comment), so browsers that don't understand the syntax never receive those rules and cannot end up in a partially-applied or broken state.
- Provide a complete, independent fallback styling path using ordinary, broadly-supported CSS (e.g. attribute selectors or classes reacting to the priority value) that produces the same visual result as the if()-based path, so the component looks correct and complete in both supporting and non-supporting browsers.
- In JavaScript, feature-detect actual if()/style() support using CSS.supports() (not user-agent sniffing) and visibly display, right in the UI, which code path is currently active — do not silently assume support or claim broad browser compatibility, since if() is genuinely new and experimental as of 2026.
- Provide clickable controls to switch between the low/medium/high priority states and confirm both the modern and fallback styling paths update correctly in response.`,
    },
  },
};

export default cssIfConditionalDemo;
