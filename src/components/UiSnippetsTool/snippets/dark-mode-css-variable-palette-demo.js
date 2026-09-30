const darkModeCssVariablePaletteDemo = {
  id: 'dark-mode-css-variable-palette-demo',
  title: 'Dark Mode CSS Variable Palette Demo',
  lastmod: '2026-09-05',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="pd-wrap" id="pdWrap">
  <div class="pd-header">
    <h2>Design tokens</h2>
    <label class="pd-switch">
      <input type="checkbox" id="pdToggle" />
      <span class="pd-switch-track"><span class="pd-switch-thumb"></span></span>
      <span class="pd-switch-label">Dark mode</span>
    </label>
  </div>

  <div class="pd-swatches">
    <div class="pd-swatch"><span class="pd-swatch-color" style="background:var(--pd-surface)"></span>Surface</div>
    <div class="pd-swatch"><span class="pd-swatch-color" style="background:var(--pd-text)"></span>Text</div>
    <div class="pd-swatch"><span class="pd-swatch-color" style="background:var(--pd-border)"></span>Border</div>
    <div class="pd-swatch"><span class="pd-swatch-color" style="background:var(--pd-accent)"></span>Accent</div>
  </div>

  <div class="pd-components">
    <button class="pd-btn">Primary button</button>
    <div class="pd-card">
      <h3>Sample card</h3>
      <p>Every color here reads from a shared set of custom properties.</p>
    </div>
    <input class="pd-input" type="text" placeholder="Sample input" />
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.pd-wrap {
  width: 100%; max-width: 420px; border-radius: 18px; padding: 26px;
  background: var(--pd-page); border: 1px solid var(--pd-border);
  --pd-page: #ffffff; --pd-surface: #f8fafc; --pd-text: #1e293b; --pd-border: #e2e8f0; --pd-accent: #4f46e5; --pd-muted: #64748b;
  transition: background 0.2s, border-color 0.2s;
}
@media (prefers-color-scheme: dark) {
  .pd-wrap:not([data-theme="light"]) { --pd-page: #0f172a; --pd-surface: #1e293b; --pd-text: #f1f5f9; --pd-border: #334155; --pd-accent: #818cf8; --pd-muted: #94a3b8; }
}
.pd-wrap[data-theme="dark"] { --pd-page: #0f172a; --pd-surface: #1e293b; --pd-text: #f1f5f9; --pd-border: #334155; --pd-accent: #818cf8; --pd-muted: #94a3b8; }

.pd-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
.pd-header h2 { margin: 0; font-size: 15px; color: var(--pd-text); }

.pd-switch { display: flex; align-items: center; gap: 8px; cursor: pointer; }
.pd-switch input { display: none; }
.pd-switch-track { width: 38px; height: 22px; background: var(--pd-border); border-radius: 999px; position: relative; transition: background 0.2s; }
.pd-switch-thumb { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); }
.pd-switch input:checked + .pd-switch-track { background: var(--pd-accent); }
.pd-switch input:checked + .pd-switch-track .pd-switch-thumb { transform: translateX(16px); }
.pd-switch-label { font-size: 12.5px; font-weight: 700; color: var(--pd-muted); }

.pd-swatches { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 22px; }
.pd-swatch { display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 10.5px; font-weight: 700; color: var(--pd-muted); }
.pd-swatch-color { width: 100%; height: 40px; border-radius: 10px; border: 1px solid var(--pd-border); }

.pd-components { display: flex; flex-direction: column; gap: 12px; }
.pd-btn { background: var(--pd-accent); color: #fff; border: none; padding: 10px; border-radius: 9px; font-weight: 700; font-size: 13px; cursor: pointer; font-family: inherit; }
.pd-card { background: var(--pd-surface); border: 1px solid var(--pd-border); border-radius: 12px; padding: 16px; }
.pd-card h3 { margin: 0 0 6px; font-size: 13.5px; color: var(--pd-text); }
.pd-card p { margin: 0; font-size: 12px; color: var(--pd-muted); line-height: 1.6; }
.pd-input { background: var(--pd-surface); border: 1.5px solid var(--pd-border); color: var(--pd-text); padding: 10px 12px; border-radius: 9px; font-size: 13px; font-family: inherit; }
.pd-input::placeholder { color: var(--pd-muted); }`,
  js: `var wrap = document.getElementById('pdWrap');
var toggle = document.getElementById('pdToggle');

var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
toggle.checked = prefersDark;
wrap.setAttribute('data-theme', prefersDark ? 'dark' : 'light');

toggle.addEventListener('change', function () {
  wrap.setAttribute('data-theme', toggle.checked ? 'dark' : 'light');
});`,
  seo: {
    title: 'Dark Mode CSS Variable Palette Demo — Free HTML CSS JS Snippet',
    description: 'A token-based design system demo — swatches and sample components restyled entirely through CSS custom properties, with a manual toggle and prefers-color-scheme default. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Dark Mode CSS Variable Palette Demo — Token-Driven Theming with prefers-color-scheme',
      description: `This snippet demonstrates the core technique behind scalable dark mode support: defining a small set of semantic CSS custom properties — surface, text, border, accent, muted — and having every component in the system read exclusively from those tokens rather than hardcoded colors.\n\n**Tokens defined once, consumed everywhere**\n\nAll five custom properties are declared on the outer \`.pd-wrap\` container. The four color swatches, a button, a card, and an input all reference them via \`var(--pd-surface)\`, \`var(--pd-text)\`, and so on — nothing in any component's own CSS rule hardcodes a hex value, so redefining the five tokens is sufficient to reskin every element inside the container at once.\n\n**Honoring the OS preference by default**\n\nBefore any manual interaction, a \`@media (prefers-color-scheme: dark)\` block guarded by \`:not([data-theme="light"])\` redefines the same five tokens to their dark values — so a visitor whose OS is already set to dark mode sees the dark palette immediately, with no flash of the light theme and no JavaScript required for that initial state. The JS only reads \`matchMedia\` once, on load, purely to set the toggle switch's initial checked state to match.\n\n**The manual override**\n\nToggling the switch sets an explicit \`data-theme="dark"\` or \`data-theme="light"\` attribute on the wrapper. A same-specificity-order CSS rule keyed to \`[data-theme="dark"]\` redefines the tokens identically to the media-query block, and takes over once present — giving the user a manual override that always wins over the OS-level default while sharing the exact same token values.`,
    },
    features: [
      'Five semantic CSS custom properties (surface, text, border, accent, muted) drive every color in the demo',
      'Live swatch row visualizing the current value of each token',
      'Sample button, card, and input all restyled purely by variable inheritance, no per-component overrides',
      '@media (prefers-color-scheme: dark) sets the correct theme by default before any manual toggle',
      'Manual data-theme attribute toggle always takes precedence over the OS-level default',
      'No flash of incorrect theme — the default state is resolved via CSS media query, not a JS reflow after load',
      'Toggle switch initial position synced to the resolved starting theme via a single matchMedia read',
      'Fully self-contained, framework-free token system easy to extend with more colors',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Design system documentation', desc: 'Demonstrate a token palette and how components consume it to design and engineering stakeholders.' },
      { icon: 'CODE', title: 'Dark mode implementation reference', desc: 'A minimal, copy-pasteable pattern for adding CSS-variable-driven dark mode to any project.' },
      { icon: 'LEARN', title: 'Teaching CSS custom properties', desc: 'Shows both the media-query default and manual-override layers of a token system in one file.' },
      { icon: 'APP', title: 'Theming for component libraries', desc: 'The same five-token approach scales to full component libraries needing consistent light/dark support.' },
    ],
    faqs: [
      { q: 'How do components get their colors without any per-component dark-mode CSS?', a: 'Every component references shared custom properties like var(--pd-surface) instead of hardcoded colors. Redefining those five properties at the container level is enough to reskin the button, card, and input simultaneously.' },
      { q: 'How does the palette pick the correct starting theme automatically?', a: 'A @media (prefers-color-scheme: dark) block, guarded so it does not fire once a manual light theme is chosen, redefines the same custom properties to dark values — so an OS set to dark mode shows the dark palette immediately on load with no JavaScript needed for that first paint.' },
      { q: 'What happens when the toggle is used?', a: 'It sets an explicit data-theme="dark" or "light" attribute on the wrapper. A CSS rule scoped to [data-theme="dark"] then redefines the tokens, and takes precedence over the OS-level media query default from that point on.' },
      { q: 'Can I add more tokens, like a "danger" or "success" color?', a: 'Yes — add the new custom property to both the base :root-style declaration and the dark override blocks (the media query and the [data-theme="dark"] rule), then reference it with var() in any component.' },
    ],
  },
};

export default darkModeCssVariablePaletteDemo;
