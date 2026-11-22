const cssScopeComponentStyles = {
  id: 'css-scope-component-styles',
  title: 'CSS @scope Tutorial: Scoped Component Styles Without BEM',
  lastmod: '2026-11-22',
  category: 'cards',
  html: `<main class="sc-page">
  <h1>Scoped styles, no class prefixes</h1>
  <p class="sc-sub">The same card markup in two themes, and a nested card that the outer scope cannot reach. All of it from <code>@scope</code>.</p>

  <div class="sc-grid">
    <section class="theme-sunrise" aria-label="Sunrise theme">
      <div class="card">
        <h2>Sunrise plan</h2>
        <p class="price">&pound;12<span>/mo</span></p>
        <div class="card-body">
          <p>Applies .card styles inside .theme-sunrise only.</p>
          <div class="card"><h2>Nested card</h2><p>This one sits in the donut hole, so the outer scope stops here.</p></div>
        </div>
        <button type="button">Choose Sunrise</button>
      </div>
    </section>

    <section class="theme-tide" aria-label="Tide theme">
      <div class="card">
        <h2>Tide plan</h2>
        <p class="price">&pound;18<span>/mo</span></p>
        <div class="card-body">
          <p>The same markup, a different scope, different styles.</p>
          <div class="card"><h2>Nested card</h2><p>Untouched by the Tide scope too.</p></div>
        </div>
        <button type="button">Choose Tide</button>
      </div>
    </section>
  </div>
  <p class="sc-note" id="scNote"></p>
</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#eef0f4;color:#1f2430;min-height:100vh}
.sc-page{max-width:820px;margin:0 auto;padding:48px 20px}
h1{font-size:clamp(26px,5vw,34px);letter-spacing:-.02em}
.sc-sub{margin:10px 0 26px;color:#59607a;line-height:1.6}
.sc-sub code{background:#e1e5ee;padding:1px 6px;border-radius:5px;font-size:.9em}
.sc-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}
.sc-note{margin-top:22px;font-size:13px;color:#6b7390}

/* Shared structure, defined once, applied inside either theme.
   "to (.card-body)" makes a donut: the scope ends where .card-body begins. */
@scope (.theme-sunrise) to (.card-body){
  :scope{--accent:#e8590c;--soft:#fff1e6;--ink:#3b1d0a}
  .card{background:var(--soft);color:var(--ink);border-radius:20px;padding:22px;border:2px solid var(--accent)}
  h2{font-size:20px;color:var(--accent)}
  .price{font-size:38px;font-weight:800;margin:6px 0}
  .price span{font-size:15px;font-weight:600;opacity:.7}
  button{margin-top:14px;padding:12px 18px;border:0;border-radius:12px;background:var(--accent);color:#fff;font:700 15px system-ui,sans-serif;cursor:pointer}
  button:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
}
@scope (.theme-tide) to (.card-body){
  :scope{--accent:#0b7285;--soft:#e3f6f9;--ink:#06303a}
  .card{background:var(--soft);color:var(--ink);border-radius:6px;padding:22px;border-left:8px solid var(--accent)}
  h2{font-size:20px;color:var(--accent);text-transform:uppercase;letter-spacing:.08em}
  .price{font-size:38px;font-weight:800;margin:6px 0}
  .price span{font-size:15px;font-weight:600;opacity:.7}
  button{margin-top:14px;padding:12px 18px;border:2px solid var(--accent);border-radius:4px;background:transparent;color:var(--accent);font:700 15px system-ui,sans-serif;cursor:pointer}
  button:hover{background:var(--accent);color:#fff}
  button:focus-visible{outline:3px solid var(--ink);outline-offset:2px}
}

/* Inside the donut hole the outer scopes do not apply: this nested card has its own neutral look */
.card-body{margin-top:12px;font-size:14px;line-height:1.55}
.card-body .card{margin-top:12px;padding:14px;background:#fff;border:1px dashed #98a0b8;border-radius:10px;color:#1f2430}
.card-body .card h2{font-size:15px;color:#1f2430;text-transform:none;letter-spacing:0}`,

  js: `// @scope needs no script. This only reports whether the browser knows the rule.
var ok = typeof CSSScopeRule !== 'undefined';
document.getElementById('scNote').textContent = ok
  ? '@scope is supported here: each theme styles .card, h2 and button only inside its own root, and stops at .card-body.'
  : '@scope is not supported in this browser, so the cards appear unstyled. In production, ship a fallback with prefixed class names.';`,

  seo: {
    title: 'CSS @scope Tutorial: Scoped Component Styles Without BEM',
    description: `Learn CSS @scope with a live demo: the same card markup in two themes, scope roots, donut scoping with "to", and proximity. Copy the free working code.`,
    about: {
      title: 'CSS @scope: Style Inside a Component Without Naming Everything',
      description: `Large stylesheets leak: a rule for \`.card h2\` meant for one place restyles a nested card somewhere else, so teams invent BEM names, CSS modules or Shadow DOM. The \`@scope\` at-rule gives the cascade a boundary. \`@scope (.theme-sunrise) { .card { ... } }\` styles \`.card\` only inside \`.theme-sunrise\`. This snippet shows two scopes and the "donut" that keeps nested components safe.

**A scope root**

\`@scope (.theme-sunrise)\` makes \`.theme-sunrise\` the root. Selectors inside are relative to it, so plain \`.card\`, \`h2\` and \`button\` need no prefix. \`:scope\` refers to the root itself, used here to define the theme's custom properties.

**Donut scoping with a lower bound**

\`@scope (.theme-sunrise) to (.card-body)\` ends the scope where \`.card-body\` begins. Everything inside that element is outside the scope, so the nested card keeps its neutral dashed look. This is how a tabs component styles its own panels without reaching into whatever the author put inside them.

**Same markup, two scopes**

The Sunrise and Tide sections contain identical HTML. One scope gives rounded, filled cards and the other square, outlined ones. You re-theme by changing the wrapper class, not the markup.

**Proximity wins**

When two scopes could both match, the one whose root is closer to the element wins, which is why nested themes work without \`!important\`. Specificity is unchanged by \`@scope\`, so inner selectors stay low.

**Support**

\`@scope\` works in Chrome, Edge, Safari and Firefox 146 and later. In older browsers the rules are ignored, so ship fallback classes where you need them. For container-driven layout see the [container query card](/ui-snippets/container-query-card/).

**Practical advice**

Scope at the component boundary, not at the page. A scope root like a section or custom wrapper is cheap to match, and the lower bound is the single most useful part: put it on the slot where authors drop their own content. Avoid scoping to the whole body, because then nothing is isolated, and test with the nested component in place before shipping.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Pick the root', text: 'Choose the element that owns the component, here .theme-sunrise and .theme-tide, and write @scope (.theme-sunrise) { ... }.' },
      { title: 'Write short selectors inside', text: 'Inside the block use .card, h2 and button without a prefix; they only match descendants of the root.' },
      { title: 'Use :scope for the root', text: 'Define custom properties on :scope so every rule inside can read --accent and --soft.' },
      { title: 'Add a lower bound', text: 'Write to (.card-body) after the root to stop the scope at that element, protecting nested components.' },
      { title: 'Re-theme by changing the wrapper', text: 'Swap theme-sunrise for theme-tide on the section; the markup stays identical.' },
      { title: 'Check support', text: 'The note under the demo reports whether CSSScopeRule exists in your browser.' },
    ] },
    features: [
      { title: 'Plain selectors', text: 'No BEM prefixes: .card and h2 are enough inside a scope.' },
      { title: 'Donut scoping', text: 'to (.card-body) stops the scope at the content slot.' },
      { title: ':scope root', text: 'The scope root defines the theme variables.' },
      { title: 'Two themes, one markup', text: 'Sunrise and Tide share every element and differ only by wrapper.' },
      { title: 'Nested card protection', text: 'The inner card keeps its own style because it is outside the scope.' },
      { title: 'Proximity resolves conflicts', text: 'The nearer scope root wins when scopes overlap.' },
      { title: 'No JavaScript', text: 'The behaviour is pure CSS; the script only reports support.' },
      { title: 'Visible focus', text: 'Both button styles keep a clear focus outline.' },
    ],
    useCases: [
      { title: 'Design-system themes', text: 'Offer light, dark and brand variants of a component by changing a wrapper class, without duplicating selectors or generating prefixed class names.' },
      { title: 'Component libraries and CMS blocks', text: 'Keep a block\'s styles from leaking into editor-supplied content that lives inside it, using a lower bound.' },
      { title: 'Third-party widgets', text: 'Embed a widget on pages with unknown CSS and confine its rules to its own root.' },
      { title: 'Replacing BEM and CSS-in-JS', text: 'Cut long class names and build tooling by using the platform feature that solves the same leakage.' },
    ],
    faqs: [
      { q: 'Does @scope replace Shadow DOM?', a: 'No. @scope limits where rules apply but does not stop outside rules from reaching in or hide the markup. Shadow DOM provides true encapsulation in both directions. @scope is lighter and fits ordinary server-rendered HTML.' },
      { q: 'What does "to (.card-body)" do?', a: 'It sets a lower boundary. Elements inside .card-body are outside the scope even though they are descendants of the root, so nested components are not touched. It is called donut scoping because the scope has a hole.' },
      { q: 'Does @scope change specificity?', a: 'No. Selectors inside keep their normal specificity, and :scope adds the specificity of a pseudo-class. What it adds is the scoping-proximity step, where the closer scope root wins before source order is considered.' },
      { q: 'Which browsers support it?', a: 'Chrome and Edge 118 and later, Safari 17.4 and later, and Firefox from 146. In older versions the whole block is ignored, so plan a fallback if you must support them.' },
    ],
    aiPrompt: {
      paragraph: 'Paste this snippet into an AI coding assistant and ask it to explain the root, :scope and the "to" lower bound, and how proximity decides which scope wins. Useful follow-ups: add a third dark theme, scope a tabs component whose panels hold arbitrary content, or convert a BEM stylesheet into scoped rules. Ask it to keep the donut hole for nested cards.',
      prompt: `Build a demo of the CSS @scope rule in plain HTML and CSS.

Requirements:
- Two sections with the same card markup (heading, price, a .card-body containing text and a nested card, and a button): one with class theme-sunrise and one with theme-tide.
- @scope (.theme-sunrise) to (.card-body) and @scope (.theme-tide) to (.card-body), each defining theme custom properties on :scope and styling plain .card, h2, .price and button selectors (Sunrise: rounded, filled; Tide: square, left border, outlined button with hover).
- Outside the scopes, give the nested .card-body .card its own neutral dashed style to prove the donut hole works.
- Visible focus styles on both buttons, a responsive two-column grid, and a note set by a script that checks typeof CSSScopeRule.
- No class prefixes or BEM names anywhere.`,
    },
  },
};

export default cssScopeComponentStyles;
