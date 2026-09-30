const cssLightDarkThemeDemo = {
  id: 'css-light-dark-theme-demo',
  title: 'CSS light-dark() Theme Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <p class="demo-note">No JavaScript, no class toggling, no data attributes. Switch your OS or browser color scheme (light/dark) and this whole card re-themes itself automatically via the CSS <code>light-dark()</code> function.</p>

  <article class="theme-card">
    <header class="card-head">
      <span class="dot-brand" aria-hidden="true"></span>
      <h2>Weekly Digest</h2>
    </header>
    <p class="card-body">Five stories worth your five minutes, picked without an algorithm. Read at your own pace, in whichever color scheme your system already prefers &mdash; this card never asks.</p>
    <div class="tag-row">
      <span class="tag">Design</span>
      <span class="tag">Reading</span>
      <span class="tag">No JS</span>
    </div>
    <button class="card-btn" type="button">Open digest</button>
  </article>

  <div class="fallback-note">
    <strong>No JS fallback:</strong> browsers without <code>light-dark()</code> support fall back to the light palette defined directly on each custom property, via an <code>@supports not</code> block &mdash; the card never looks broken, it just stops auto-switching.
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }

/* color-scheme tells the browser this page supports both palettes, which
   is required for light-dark() to know which value to resolve to — without
   it, light-dark() has no signal and effectively always resolves light. */
:root {
  color-scheme: light dark;

  /* Each custom property is defined ONCE, as a light/dark pair, resolved
     automatically by the browser based on the OS/browser preference —
     no media query duplication, no JS, no class toggle anywhere. */
  --bg: light-dark(#f5f4ef, #101218);
  --card-bg: light-dark(#ffffff, #171a24);
  --card-border: light-dark(#e6e3d8, #262b3b);
  --text: light-dark(#232017, #e7e9f5);
  --text-muted: light-dark(#6b6455, #8b91b0);
  --accent: light-dark(#8a5cf6, #a78bfa);
  --accent-bg: light-dark(#f1ecff, #241c3d);
  --tag-bg: light-dark(#f1f0ea, #1f2434);
  --shadow: light-dark(rgba(40,30,10,0.08), rgba(0,0,0,0.5));
}

body{font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 480px; margin: 0 auto; padding: 40px 20px; display: flex; flex-direction: column; gap: 16px; }

.demo-note { font-size: 12.5px; color: var(--text-muted); line-height: 1.6; background: var(--accent-bg); border: 1px solid var(--card-border); border-radius: 10px; padding: 12px 14px; }
.demo-note code { font-family: 'SFMono-Regular', Consolas, monospace; color: var(--accent); }

.theme-card { background: var(--card-bg); border: 1px solid var(--card-border); border-radius: 16px; padding: 24px; box-shadow: 0 10px 30px var(--shadow); }
.card-head { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.dot-brand { width: 10px; height: 10px; border-radius: 50%; background: var(--accent); }
.card-head h2 { font-size: 17px; }
.card-body { font-size: 14px; line-height: 1.65; color: var(--text-muted); margin-bottom: 16px; }
.tag-row { display: flex; gap: 8px; margin-bottom: 18px; flex-wrap: wrap; }
.tag { font-size: 11.5px; font-weight: 700; background: var(--tag-bg); color: var(--text-muted); padding: 5px 10px; border-radius: 999px; }
.card-btn { font-family: inherit; font-size: 13px; font-weight: 700; background: var(--accent); color: light-dark(#ffffff, #1a1029); border: none; padding: 10px 18px; border-radius: 9px; cursor: pointer; }
.card-btn:hover { filter: brightness(1.08); }
.card-btn:focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }

.fallback-note { font-size: 12px; color: var(--text-muted); line-height: 1.6; border-top: 1px dashed var(--card-border); padding-top: 14px; }
.fallback-note strong { color: var(--text); }
.fallback-note code { font-family: 'SFMono-Regular', Consolas, monospace; }

/* Honest fallback for browsers that don't yet support light-dark():
   redefine the same custom properties to a fixed light palette. The card
   still renders correctly — it just won't auto-switch with the OS/browser
   preference in that browser, rather than showing broken or unreadable
   colors. As of early 2026 light-dark() ships in current Chrome, Edge,
   Safari and Firefox, but this keeps older/uncommon engines safe. */
@supports not (color: light-dark(#000, #fff)) {
  :root {
    --bg: #f5f4ef;
    --card-bg: #ffffff;
    --card-border: #e6e3d8;
    --text: #232017;
    --text-muted: #6b6455;
    --accent: #8a5cf6;
    --accent-bg: #f1ecff;
    --tag-bg: #f1f0ea;
    --shadow: rgba(40,30,10,0.08);
  }
}`,

  js: `// Intentionally no JavaScript: the light/dark switch here is handled
// entirely by the browser resolving light-dark() against the user's OS or
// browser color-scheme preference. Nothing to wire up.`,

  seo: {
    title: 'CSS light-dark() Theme Demo — Free Native Auto Light/Dark Card',
    description: `A card themed with the native CSS light-dark() function — colors defined once per custom property, resolved automatically to the OS color scheme with zero JavaScript. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CSS light-dark() Theme Demo — Zero-JS Automatic Theming',
      description: `Most dark-mode implementations on the web involve either a media query duplicating every color variable under \`@media (prefers-color-scheme: dark)\`, or a JavaScript-driven class/data-attribute toggle like [the dark mode toggle](/ui-snippets/dark-mode-toggle/) snippet. The CSS \`light-dark()\` function, now shipping in current Chrome, Edge, Safari, and Firefox, offers a third option: define each color exactly once, as a light/dark pair, in a single custom property — no duplicated blocks, no JavaScript, no attribute to flip.

**How light-dark() actually works**

\`light-dark(lightValue, darkValue)\` is a CSS function that resolves to whichever of its two arguments matches the current color scheme. It requires \`color-scheme: light dark\` to be set on the element (usually \`:root\`) so the browser knows both palettes are genuinely supported and which preference to honor — without that declaration, \`light-dark()\` has no signal to resolve against. Every themed value in this card — background, border, text, accent — is written once as \`--bg: light-dark(#f5f4ef, #101218);\`, and the browser picks the right half automatically whenever the OS or browser-level color-scheme preference changes, live, with no reload and no script.

**Why this beats duplicated media queries**

The older approach of writing a full custom-property block once at \`:root\` and a second, overriding block inside \`@media (prefers-color-scheme: dark) { :root { ... } }\` works, but doubles the list of variables to maintain and makes it easy for the two blocks to drift out of sync as a design evolves. \`light-dark()\` keeps the light and dark value for a given token physically adjacent in the same declaration, which is both less code and harder to accidentally desync.

**Where light-dark() doesn't replace JS toggles**

This function only ever tracks the OS/browser-level \`prefers-color-scheme\` signal — it has no concept of a user-facing in-app toggle that overrides the system setting. If your product needs an explicit "force dark regardless of OS" switch, you still want [the dark mode toggle](/ui-snippets/dark-mode-toggle/) or [color mode toggle](/ui-snippets/color-mode-toggle/) pattern, which can layer on top by setting \`color-scheme\` explicitly per user choice rather than only inheriting the OS default.

**Honest support notes**

\`light-dark()\` is genuinely new: it shipped in Chrome 123, Safari 17.5, and Firefox 120, all in 2024, so it's safe in any current evergreen browser as of 2026 but will fail silently-ish in older or less common engines. This snippet includes an \`@supports not (color: light-dark(#000, #fff))\` block that redefines the same custom properties to a fixed light palette, so an unsupporting browser still renders a correct, readable card — it just won't auto-switch with the system preference there. Pair this with [CSS container query units](/ui-snippets/css-container-query-units-demo/) or [the :has() selector playground](/ui-snippets/css-has-selector-playground/) for more of the modern, JS-free CSS toolkit.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Toggle your OS appearance setting', text: `Switch your operating system between light and dark mode.` },
      { title: 'Watch the card re-theme with zero reload', text: `Every color updates live — no page refresh, no script running.` },
      { title: 'Inspect the CSS custom properties', text: `Each token like --bg is defined once as light-dark(lightValue, darkValue).` },
      { title: 'Check color-scheme: light dark on :root', text: `This declaration is required for light-dark() to resolve correctly.` },
      { title: 'Look at the @supports fallback', text: `Unsupporting browsers get a fixed light palette instead of broken colors.` },
      { title: 'Compare to a JS toggle', text: `This approach has no manual override — pair with a real toggle if you need one.` },
    ] },
    features: [
      { title: 'Zero JavaScript', text: `Theming is entirely CSS — no toggle script, no class, no attribute.` },
      { title: 'Single source per token', text: `Each color defined once as a light/dark pair, not two separate blocks.` },
      { title: 'Live OS-driven switching', text: `Colors update instantly when the system preference changes.` },
      { title: 'Required color-scheme declaration', text: `:root { color-scheme: light dark } tells the browser both palettes exist.` },
      { title: 'Honest @supports fallback', text: `Unsupporting browsers get a safe, fixed light theme, never broken colors.` },
      { title: 'No drift risk', text: `Light and dark values live in the same line, so they can't fall out of sync.` },
      { title: 'Works with existing components', text: `Any element using these custom properties gets theming for free.` },
      { title: 'Complements JS toggles', text: `Layer a real dark-mode switch on top by setting color-scheme explicitly.` },
    ],
    useCases: [
      { title: 'Marketing and content pages', text: `Auto-theme a page with zero runtime cost or flash-of-wrong-theme.` },
      { title: 'Design system tokens', text: `Define brand colors once per light/dark pair across a whole component library.` },
      { title: 'Alongside a manual toggle', text: `Pair with [the dark mode toggle](/ui-snippets/dark-mode-toggle/) for an explicit override.` },
      { title: 'Reducing stylesheet size', text: `Eliminate duplicated prefers-color-scheme media query blocks.` },
      { title: 'Static/JAMstack sites', text: `Get correct theming even with JavaScript disabled or slow to load.` },
      { title: 'Modern CSS showcases', text: `Pair with [CSS :has() playground](/ui-snippets/css-has-selector-playground/) or [container query units](/ui-snippets/css-container-query-units-demo/).` },
      { icon: 'CODE', title: 'Related: 500 Internal Server Error Page', desc: 'See the [500 Internal Server Error Page](/ui-snippets/error-500-page/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What does light-dark() actually require to work?', a: `It needs color-scheme: light dark set on the element (typically :root or html) so the browser knows the page genuinely supports both palettes and which preference to check. Without that declaration, light-dark() has no reliable signal to resolve against and will not switch correctly.` },
      { q: 'Does light-dark() respond to an in-app toggle, or only the OS setting?', a: `On its own, light-dark() only tracks the OS/browser-level prefers-color-scheme signal. It has no built-in concept of a manual, user-facing in-app override. If you want users to force a theme regardless of their OS setting, you still need a JS-driven approach like the dark mode toggle or color mode toggle snippets, which can set color-scheme explicitly per user choice.` },
      { q: 'Which browsers support light-dark()?', a: `It shipped in Chrome 123, Safari 17.5, and Firefox 120, all landing in 2024, so it is safe across all current evergreen browsers as of 2026. Older browser versions and some less common engines do not support it, which is why this snippet includes an @supports not (color: light-dark(#000, #fff)) fallback block.` },
      { q: 'What happens in a browser that doesn\'t support light-dark()?', a: `The @supports not (color: light-dark(#000, #fff)) block redefines the same custom properties to a fixed, readable light palette, so the card renders correctly and legibly — it simply won't auto-switch with the system color-scheme preference in that browser, rather than showing broken or transparent colors.` },
      { q: 'Is light-dark() better than a prefers-color-scheme media query?', a: `It is more concise for token definitions: instead of a full :root block plus a duplicated @media (prefers-color-scheme: dark) { :root { ... } } block, each variable is written once with both values adjacent, reducing duplication and the risk of the two palettes drifting out of sync as the design changes. A media query approach still works and is more broadly supported, so it remains a reasonable choice for wider legacy support.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's CSS into an AI coding assistant like Claude and ask it to explain exactly what color-scheme: light dark contributes beyond light-dark() itself, since the two are easy to conflate but serve different roles. It's also a good prompt for migrating an existing design system: ask the assistant to convert a stylesheet that currently duplicates :root and @media (prefers-color-scheme: dark) blocks into the single-declaration light-dark() form, flagging any values that don't cleanly reduce to a two-value pair. You could also ask it to reason about how this function should interact with a manual dark-mode toggle in a real product, since light-dark() alone only tracks the OS preference. Treat the snippet as a compact reference for a genuinely new CSS capability rather than a drop-in final answer for every theming need.`,
      prompt: `Build a themed card component using the native CSS light-dark() function, with no JavaScript and no class-based theme toggling.

Requirements:
- Set color-scheme: light dark on :root so the browser knows the page supports both palettes.
- Define every themed color (background, card background, border, text, muted text, accent, shadow) exactly once as a CSS custom property using light-dark(lightValue, darkValue) — do not write a separate @media (prefers-color-scheme: dark) block that redefines the same variables a second time.
- Build a small card UI (a heading, body text, a couple of tag chips, and a button) that consumes only these custom properties for its colors, so it re-themes automatically and instantly when the OS or browser color-scheme preference changes, with zero JavaScript and no page reload.
- Add an @supports not (color: light-dark(#000, #fff)) fallback block that redefines the same custom properties to a fixed, legible light palette, so the card still renders correctly in a browser that doesn't support light-dark() yet — it just won't auto-switch there.
- Include a short on-page note explaining that light-dark() only tracks the OS-level preference and has no concept of a manual in-app override, so a real product wanting an explicit user toggle still needs a JavaScript-driven approach layered on top.`,
    },
  },
};

export default cssLightDarkThemeDemo;
