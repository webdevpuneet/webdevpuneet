const cssHasSelectorPlayground = {
  id: 'css-has-selector-playground',
  title: 'CSS :has() Selector Playground',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="intro">
    <h2>Pick a plan</h2>
    <p>Click a card to select it. The highlight, checkmark and border are driven entirely by <code>:has()</code> — no JS class toggling on the cards themselves.</p>
  </div>

  <div class="card-grid" id="card-grid">
    <label class="plan-card">
      <input type="radio" name="plan" value="starter" checked>
      <div class="card-body">
        <span class="badge">Starter</span>
        <span class="price">$9<small>/mo</small></span>
        <span class="desc">Good for side projects</span>
      </div>
      <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
    </label>

    <label class="plan-card">
      <input type="radio" name="plan" value="pro">
      <div class="card-body">
        <span class="badge">Pro</span>
        <span class="price">$29<small>/mo</small></span>
        <span class="desc">For growing teams</span>
      </div>
      <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
    </label>

    <label class="plan-card">
      <input type="radio" name="plan" value="scale">
      <div class="card-body">
        <span class="badge">Scale</span>
        <span class="price">$79<small>/mo</small></span>
        <span class="desc">For high-volume usage</span>
      </div>
      <svg class="check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>
    </label>
  </div>

  <div class="divider"></div>

  <div class="intro">
    <h2>Form validity state</h2>
    <p>This fieldset uses <code>fieldset:has(input:invalid)</code> to show a live warning banner the moment any field inside it becomes invalid — again, zero JavaScript validation logic.</p>
  </div>

  <fieldset class="signup-fieldset" id="signup-fieldset">
    <legend>Create account</legend>
    <div class="field">
      <label for="email-input">Email</label>
      <input type="email" id="email-input" placeholder="you@example.com" required>
    </div>
    <div class="field">
      <label for="pw-input">Password (min 8 chars)</label>
      <input type="password" id="pw-input" placeholder="••••••••" minlength="8" required>
    </div>
    <p class="invalid-warning">
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/></svg>
      Some fields still need attention before you can submit.
    </p>
  </fieldset>

  <div class="css-panel">
    <p class="css-panel-label">Live matching rule</p>
    <code class="css-panel-code" id="css-live-rule">.plan-card:has(input:checked) { border-color: #6366f1; background: #eef2ff; }</code>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; }

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 32px 20px 48px; display: flex; flex-direction: column; gap: 8px; }

.intro h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.intro p { font-size: 13px; color: #64748b; line-height: 1.6; }
.intro code { background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 5px; font-size: 12px; }

.card-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; margin: 16px 0 8px; }

.plan-card {
  position: relative;
  display: block;
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px 14px;
  cursor: pointer;
  background: #fff;
  transition: border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.2s;
}
.plan-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(15,23,42,0.08); }
.plan-card input { position: absolute; opacity: 0; pointer-events: none; }

/* The core :has() trick — style the label based on its child radio's checked state */
.plan-card:has(input:checked) {
  border-color: #6366f1;
  background: #eef2ff;
  box-shadow: 0 0 0 4px rgba(99,102,241,0.12);
}

.card-body { display: flex; flex-direction: column; gap: 6px; }
.badge { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: #64748b; }
.plan-card:has(input:checked) .badge { color: #4f46e5; }
.price { font-size: 20px; font-weight: 800; color: #0f172a; }
.price small { font-size: 12px; font-weight: 500; color: #94a3b8; }
.desc { font-size: 12px; color: #94a3b8; }

.check {
  position: absolute; top: 10px; right: 10px;
  width: 20px; height: 20px; border-radius: 50%;
  background: #6366f1; color: #fff; padding: 3px;
  opacity: 0; transform: scale(0.6);
  transition: opacity 0.18s, transform 0.18s;
}
.plan-card:has(input:checked) .check { opacity: 1; transform: scale(1); }

.divider { height: 1px; background: #e2e8f0; margin: 20px 0; }

.signup-fieldset {
  border: 2px solid #e2e8f0;
  border-radius: 14px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  background: #fff;
  transition: border-color 0.2s, background 0.2s;
}
.signup-fieldset legend { font-size: 13px; font-weight: 700; padding: 0 6px; color: #475569; }

.field { display: flex; flex-direction: column; gap: 6px; }
.field label { font-size: 12px; font-weight: 600; color: #475569; }
.field input {
  padding: 9px 12px; border: 1.5px solid #e2e8f0; border-radius: 8px;
  font-size: 13px; font-family: inherit; transition: border-color 0.15s;
}
.field input:focus { outline: none; border-color: #6366f1; }
.field input:invalid:not(:placeholder-shown) { border-color: #f87171; }

.invalid-warning {
  display: none;
  align-items: center; gap: 8px;
  font-size: 12px; font-weight: 600; color: #b91c1c;
  background: #fef2f2; border: 1px solid #fecaca;
  border-radius: 8px; padding: 10px 12px;
}
.invalid-warning svg { flex-shrink: 0; }

/* Fieldset reacts to ANY invalid input inside it, once the user has interacted */
.signup-fieldset:has(input:invalid:not(:placeholder-shown)) {
  border-color: #f87171;
  background: #fff5f5;
}
.signup-fieldset:has(input:invalid:not(:placeholder-shown)) .invalid-warning {
  display: flex;
}

.css-panel {
  margin-top: 24px;
  background: #0f172a;
  border-radius: 12px;
  padding: 14px 16px;
}
.css-panel-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 6px; }
.css-panel-code { display: block; font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #e2e8f0; line-height: 1.6; white-space: pre-wrap; word-break: break-word; }

@media (max-width: 520px) {
  .card-grid { grid-template-columns: 1fr; }
}`,
  js: `// This entire demo's visual state is driven by CSS :has() — the JS below only
// updates the informational "live rule" panel so learners can see which
// selector is conceptually active. It never toggles the highlight classes itself.

const radios = document.querySelectorAll('.plan-card input[type="radio"]');
const liveRule = document.getElementById('css-live-rule');

radios.forEach(radio => {
  radio.addEventListener('change', () => {
    if (radio.checked) {
      liveRule.textContent = \`.plan-card:has(input[value="\${radio.value}"]:checked) { border-color: #6366f1; background: #eef2ff; }\`;
    }
  });
});

const emailInput = document.getElementById('email-input');
const pwInput = document.getElementById('pw-input');
const fieldset = document.getElementById('signup-fieldset');

function reportFieldsetState() {
  const invalidField = fieldset.querySelector('input:invalid:not(:placeholder-shown)');
  if (invalidField) {
    liveRule.textContent = 'fieldset:has(input:invalid:not(:placeholder-shown)) { border-color: #f87171; background: #fff5f5; }';
  }
}

[emailInput, pwInput].forEach(input => {
  input.addEventListener('input', reportFieldsetState);
  input.addEventListener('blur', reportFieldsetState);
});`,
  seo: {
    title: 'CSS :has() Selector Playground — Free HTML CSS JS Snippet',
    description: 'Interactive demo of the CSS :has() parent selector for card highlighting and form validity states — no JS class toggling. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS :has() Selector Playground — The Native Parent Selector for Conditional Styling',
      description: `For as long as CSS has existed, selectors could only look downward or sideways — you could style a child based on its parent's class, or a sibling based on the element before it, but you could never style a parent based on what was happening inside it. That gap closed with the \`:has()\` relational pseudo-class, sometimes nicknamed the "parent selector," which shipped in all major browsers (Chrome, Edge, Safari, Firefox 121+) through 2023 and is now considered baseline-safe for 2025/2026 production work. This playground demonstrates two real, common UI problems that \`:has()\` solves without a single line of JavaScript state management.

**How :has() works technically**

\`:has()\` takes a relative selector argument and matches any element that contains at least one descendant matching that argument. Written as \`A:has(B)\`, it selects \`A\` if \`A\` contains \`B\` anywhere in its subtree (not just as a direct child, unless you scope it with the child combinator like \`:has(> B)\`). Critically, \`:has()\` can reference pseudo-classes on the descendant, such as \`:checked\`, \`:invalid\`, \`:focus\`, or \`:disabled\` — meaning the parent's appearance can react live to the interactive state of an input buried inside it. This is the mechanism behind both demos above: \`.plan-card:has(input:checked)\` matches a card label the instant its internal radio button becomes checked, and \`fieldset:has(input:invalid:not(:placeholder-shown))\` matches the fieldset the instant any field inside it fails HTML validation after the user has typed something.

**Why this matters for modern UI development**

Before \`:has()\`, both of these effects required JavaScript: an event listener on every radio button to add/remove a "selected" class on its parent card, and a submit or input listener to toggle a warning banner's visibility based on aggregated validity across multiple fields. That JavaScript had to stay in sync with the DOM, handle edge cases like programmatic value changes, and re-run on every relevant event. With \`:has()\`, the browser's own style engine does this work — the rule re-evaluates automatically whenever the matched state changes, with no listeners, no reflow thrashing from manual class toggles, and no risk of the visual state drifting out of sync with the actual DOM state. This is a meaningful simplification for form-heavy dashboards, pricing pages, and settings panels where "does this container have an active/invalid/checked descendant" is an extremely common question to answer visually.

**The card selection pattern**

The card grid wraps each \`<input type="radio">\` inside a \`<label class="plan-card">\`, which is itself already a common accessibility pattern — clicking anywhere on the label toggles the input. Layering \`:has(input:checked)\` on top means the selected-state border, background tint, and checkmark icon are pure CSS side effects of that native radio behavior, keyboard navigation (arrow keys move between radios in a group) included for free.

**The form validity pattern**

The signup fieldset combines \`:invalid\` (from the browser's built-in constraint validation, driven by \`type="email"\`, \`required\`, and \`minlength="8"\`) with \`:not(:placeholder-shown)\` — a trick that suppresses the invalid style until the user has actually typed something, avoiding the jarring experience of a form that looks broken before you've touched it. \`fieldset:has(...)\` then promotes that single-field state up to the whole group, showing an aggregate warning banner.

**Browser support caveats**

\`:has()\` has shipped in Chrome/Edge 105+, Safari 15.4+, and Firefox 121+ (December 2023), giving it broad coverage today, but any project supporting older Firefox ESR or legacy Safari should feature-detect with \`CSS.supports("selector(:has(a))")\` and provide a JavaScript fallback for critical UI.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Select a plan card', text: 'Click any of the three plan cards. Watch the border color, background tint, and the checkmark icon appear — all driven by the CSS rule .plan-card:has(input:checked), not a JS class toggle. The "live rule" panel at the bottom updates to show the exact selector conceptually in effect.' },
        { title: 'Trigger the invalid-form state', text: 'Type an incomplete email (e.g. "test") or a password under 8 characters into the signup-fieldset fields, then click away. The fieldset border turns red and a warning banner appears — because fieldset:has(input:invalid:not(:placeholder-shown)) now matches.' },
        { title: 'Fix the fields to clear the warning', text: 'Correct the email format and lengthen the password to 8+ characters. As soon as both inputs pass HTML5 constraint validation, the :invalid pseudo-class stops matching, :has() stops matching, and the warning disappears automatically — no JS re-check required.' },
        { title: 'Inspect the CSS panel', text: 'The dark panel at the bottom of the demo shows the current CSS selector as plain text, updated by a small JS listener purely for teaching purposes — it has no effect on the actual styling, which remains 100% CSS-driven.' },
        { title: 'Extend with your own :has() rules', text: 'Try adding a new rule like .card-grid:has(.plan-card:hover) to dim unselected cards on hover, or form:has(input:focus) to highlight the entire form when any field inside it has focus — both are one-line additions to the css panel.' },
        { title: 'Export and adapt', text: 'Click HTML to download a standalone file, or JSX/Vue/Angular to get a framework component. In React, the CSS stays identical — :has() needs no JS state at all, so the component can be nearly stateless aside from standard form field values.' },
      ],
    },
    features: [
      '.plan-card:has(input:checked) styles a label parent based on its child radio state, no JS class toggling',
      'fieldset:has(input:invalid:not(:placeholder-shown)) aggregates validity across multiple descendant inputs',
      ':not(:placeholder-shown) combinator suppresses invalid styling until the user has actually typed',
      'Pure-CSS checkmark reveal: opacity and scale transition triggered by the :has() match, no JS visibility toggling',
      'Native radio-group accessibility preserved: label-wrapped inputs, arrow-key navigation between plan cards',
      'HTML5 constraint validation (required, type=email, minlength) drives the :invalid pseudo-class used by :has()',
      'Live CSS rule panel reflects the conceptually active selector as plain text for a genuinely educational readout',
      'Feature-detectable via CSS.supports("selector(:has(a))") for graceful fallback on unsupported browsers',
    ],
    useCases: [
      { icon: 'FORM', title: 'Pricing and plan-selection cards with zero JS state', desc: 'Any card-based single-select UI — pricing tiers, shipping options, seat plans — can use the label-wraps-radio plus :has(input:checked) pattern shown here to get selected-state styling without writing a single change event listener. This pairs well with the [Radio Card Group](/ui-snippets/radio-card-group/) pattern if you want an even more focused single-purpose component.' },
      { icon: 'FORM', title: 'Aggregate validity banners on multi-field forms', desc: 'Long signup or checkout forms often need a single "something below is wrong" banner rather than per-field error text alone. Wrapping related fields in a fieldset and using fieldset:has(input:invalid:not(:placeholder-shown)) gives you that aggregate signal for free, and it automatically stays correct as fields are added or removed from the group.' },
      { icon: 'DESIGN', title: 'Empty-state and populated-state container styling', desc: 'A common dashboard need is styling a list or grid container differently when it has zero items versus one or more — for example ul:has(li) to hide a placeholder, or the inverse ul:not(:has(li)) to show one. This is a direct extension of the same relational-selector concept demonstrated in the card grid above.' },
      { icon: 'APP', title: 'Hover-reactive sibling dimming in card grids', desc: 'Combine :has() with :hover to dim unselected siblings when one card in a grid is hovered — .card-grid:has(.plan-card:hover) .plan-card:not(:hover) { opacity: 0.6 } is a single rule that replaces what used to require mouseenter/mouseleave listeners on every card.' },
      { icon: 'LEARN', title: 'Teaching the CSS relational selector model', desc: 'This playground is intentionally built so every visual reaction traces back to one readable CSS rule, shown live in the bottom panel. It is a good reference component for onboarding a team to :has() before they use it in production forms and dashboards.' },
      { icon: 'CODE', title: 'Replacing form-validation JS libraries for simple cases', desc: 'For forms that only need visual invalid-state feedback (not custom async validation), :has() combined with native HTML5 constraints can remove the need for a JS validation library entirely, shrinking bundle size and reducing the surface area for validation-state bugs.' },
      { icon: 'CODE', title: 'Related: Motion One Spring Card Expand', desc: 'See the [Motion One Spring Card Expand](/ui-snippets/motion-flip-expand/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What exactly does :has() select — the child or the parent?', a: 'It selects the parent (or ancestor). Written as A:has(B), the browser finds every element matching A that contains at least one descendant matching B anywhere below it in the DOM tree, and applies the rule\'s styles to A itself, not B. You can scope it to direct children only with the child combinator, e.g. A:has(> B).' },
      { q: 'Can :has() reference pseudo-classes like :checked or :invalid?', a: 'Yes — this is exactly what makes it powerful for interactive UI. :has(input:checked), :has(input:invalid), :has(input:focus), and :has(button:disabled) are all valid and re-evaluate live as the matched descendant\'s state changes, with no JavaScript required to keep the parent\'s styling in sync.' },
      { q: 'Is :has() safe to use in production in 2026?', a: 'Yes for the vast majority of audiences. It has shipped in Chrome/Edge since version 105 (2022), Safari since 15.4, and Firefox since 121 (December 2023) — all evergreen browsers used today support it. Check caniuse.com for your specific audience, and use CSS.supports("selector(:has(a))") to detect support and fall back to a JS-driven class toggle for older or unusual browsers.' },
      { q: 'Does :has() hurt page performance?', a: 'Modern browser engines optimize :has() matching, but because it requires the engine to look forward/downward into descendants rather than just backward through ancestors, deeply nested or very broad :has() selectors (like body:has(.some-rare-class)) can be more expensive to re-evaluate on every DOM mutation than a simple class selector. For typical component-scoped use like the card grid and fieldset shown here, the cost is negligible; avoid applying :has() at very high-traffic elements like html or body with wide search scope.' },
      { q: 'Why does the invalid warning not show immediately when the page loads?', a: 'The rule uses :invalid:not(:placeholder-shown) specifically so empty required fields do not look broken before the user interacts with them. :placeholder-shown only matches an input while it is empty and showing its placeholder text, so as soon as the user types and the field is genuinely invalid, :placeholder-shown stops matching, :not(:placeholder-shown) starts matching, and the warning becomes visible.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to trace exactly how .plan-card:has(input:checked) and fieldset:has(input:invalid:not(:placeholder-shown)) get evaluated by the browser — it can walk through the selector matching step by step, including why :not(:placeholder-shown) is needed to avoid showing errors on page load. You could also ask it to extend the demo: add a fourth "Enterprise" card with a :has()-driven "Popular" ribbon, or add a new rule that dims non-selected cards when the grid has any :hover match. It's also a good target for a browser-compatibility question — ask it to write the CSS.supports() feature-detection fallback and an equivalent JS-driven version of both patterns for browsers that don't support :has().`,
      prompt: `Build an interactive HTML/CSS/JS playground that demonstrates the CSS :has() relational selector using two real UI patterns: a selectable pricing card grid and a form fieldset with aggregate validity feedback.

Requirements:
- A grid of 3 plan cards, each an actual <label> wrapping a radio <input>, where the selected card's border color, background tint, and a checkmark icon are controlled purely by a CSS rule like .plan-card:has(input:checked) — no JavaScript class toggling on click.
- A fieldset containing at least two real HTML5-validated inputs (e.g. type="email" required, and a password with minlength), where the fieldset itself gets a red border and a warning banner appears the moment any input inside becomes invalid, using fieldset:has(input:invalid:not(:placeholder-shown)) so the warning does not show before the user has typed anything.
- A small "live CSS rule" text panel that updates via a minimal JS listener purely to display which :has() rule is conceptually active, making clear that this display panel is not what drives the actual styling.
- Keep all state resolution in CSS — JavaScript should only be used for the informational panel text, never to toggle the actual highlight/warning classes.
- Preserve native accessibility: labels wrapping inputs for large click targets, working keyboard radio-group navigation, and HTML5 constraint validation attributes (required, type, minlength) driving the :invalid state.
- Add smooth CSS transitions (200ms range) on border-color, background, and the checkmark's opacity/transform so state changes feel polished rather than instant.
- Use a neutral palette with a single accent color (indigo, #6366f1) for selected/valid states and a red/rose tone for the invalid warning state.`,
    },
  },
};

export default cssHasSelectorPlayground;
