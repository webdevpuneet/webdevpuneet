const spacingScaleVisualizer = {
  id: 'spacing-scale-visualizer',
  title: 'Design System Spacing Scale',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="ssv-card">
  <div class="ssv-head">
    <h2>Spacing Scale</h2>
    <p class="ssv-sub">Reference bars for every spacing token in the system</p>
  </div>
  <div class="ssv-list" id="ssvList"></div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ssv-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:24px;max-width:560px;margin:0 auto}
.ssv-head h2{font-size:18px;margin:0 0 4px}
.ssv-sub{font-size:12px;color:#8b90a8;margin:0 0 20px}
.ssv-list{display:flex;flex-direction:column;gap:14px}
.ssv-row{display:grid;grid-template-columns:76px 1fr 64px;align-items:center;gap:14px}
.ssv-token{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#8b90a8;font-weight:600}
.ssv-track{background:#161927;border-radius:8px;padding:8px;display:flex;align-items:center}
.ssv-bar{height:16px;border-radius:5px;background:linear-gradient(90deg,#6366f1,#a78bfa);transition:width .2s ease}
.ssv-px{font-size:12px;color:#c7cae0;text-align:right;font-weight:600}`,

  js: `// A single source of truth for the scale — everything else (bar widths,
// labels) is derived from this array, nothing is duplicated by hand.
var scale = [
  { token: '--space-1', px: 4 },
  { token: '--space-2', px: 8 },
  { token: '--space-3', px: 12 },
  { token: '--space-4', px: 16 },
  { token: '--space-5', px: 24 },
  { token: '--space-6', px: 32 },
  { token: '--space-7', px: 48 },
  { token: '--space-8', px: 64 },
];

var maxPx = Math.max.apply(null, scale.map(function (s) { return s.px; }));
var list = document.getElementById('ssvList');

scale.forEach(function (item) {
  var row = document.createElement('div');
  row.className = 'ssv-row';

  var token = document.createElement('span');
  token.className = 'ssv-token';
  token.textContent = item.token;

  var track = document.createElement('div');
  track.className = 'ssv-track';
  var bar = document.createElement('div');
  bar.className = 'ssv-bar';
  // Proportional width relative to the largest token in the scale, so the
  // bars visually communicate relative size, not just labeled numbers.
  var pct = (item.px / maxPx) * 100;
  bar.style.width = pct + '%';
  track.appendChild(bar);

  var px = document.createElement('span');
  px.className = 'ssv-px';
  px.textContent = item.px + 'px';

  row.appendChild(token);
  row.appendChild(track);
  row.appendChild(px);
  list.appendChild(row);
});`,

  seo: {
    title: 'Design System Spacing Scale — Free Spacing Token Visualizer',
    description: `A proportional bar reference for a design system's spacing scale (4 to 64px), with token names and pixel values. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Design System Spacing Scale — A Proportional Reference for Spacing Tokens',
      description: `The spacing scale visualizer is the reference panel every design system documentation page needs: a row of bars sized proportionally to their pixel value, labeled with the token name and the exact px number, so anyone can see at a glance how \`--space-3\` compares to \`--space-7\`. This snippet builds one in plain HTML, CSS, and JavaScript from a single data array.

**One array drives everything**

The \`scale\` array is the only place spacing values live — each entry is a \`{ token, px }\` pair. The render loop computes every bar's width as a percentage of the largest value in the array (\`item.px / maxPx * 100\`), so the bars are always proportionally accurate to each other no matter how many tokens you add or what values you use. There's no separate hand-tuned width per row to keep in sync.

**Reading the scale at a glance**

Each row shows the token name in monospace (matching how it'd appear in code), a horizontal bar whose length is the visual signal, and the exact pixel value right-aligned for precision. The gradient fill gives the bars a bit of visual interest without competing with the information.

**Why proportional bars matter**

A plain list of numbers ("4, 8, 12, 16, 24, 32, 48, 64") doesn't communicate how a scale actually feels in a layout — proportional bars make the jump from \`--space-4\` (16px) to \`--space-5\` (24px) visually obvious as a 50% increase, which is exactly the kind of relationship spacing-scale decisions hinge on.

**Customizing it**

Swap in your own scale (linear, modular, or a t-shirt-size system like sm/md/lg), rename tokens to match your CSS custom properties, or add a "copy token" click handler. Pair it with a [typography scale preview](/ui-snippets/typography-scale-preview/) for a complete type-and-space reference, or a [color swatch](/ui-snippets/color-swatch/) panel for a full design-tokens page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A row renders for every token in the scale array.` },
      { title: 'Read token and value', text: `Each row shows the CSS variable name and its pixel value.` },
      { title: 'Compare bar lengths', text: `Bars are proportional to the largest value in the scale.` },
      { title: 'Edit the scale array', text: `Add, remove, or rename tokens — bars recompute automatically.` },
      { title: 'Match your CSS variables', text: `Rename tokens to mirror your real design-system custom properties.` },
    ] },
    features: [
      { title: 'Single data source', text: `One scale array drives every bar and label.` },
      { title: 'Proportional bar widths', text: `Computed relative to the largest token value.` },
      { title: 'Monospace token names', text: `Reads like the actual CSS variable syntax.` },
      { title: 'Exact px values', text: `Right-aligned for quick precise reference.` },
      { title: 'Easy to extend', text: `Add tokens without touching layout logic.` },
      { title: 'Gradient bar fill', text: `Subtle visual polish without noise.` },
      { title: 'Framework-portable', text: `Plain data + DOM, ports cleanly to any stack.` },
      { title: 'Zero dependencies', text: `No chart library or build step required.` },
    ],
    useCases: [
      { title: 'Design system documentation', text: 'Document a spacing scale for engineers, with bars sized in proportion to the largest token between 4 and 64 pixels.' },
      { title: 'Style guide pairing', text: 'Pair with a [typography scale preview](/ui-snippets/typography-scale-preview/) so a style guide shows both text and spacing tokens.' },
      { title: 'New hire onboarding', text: 'Give new team members a visual token reference, with monospace names that read like the actual CSS variable syntax.' },
      { title: 'Design and engineering handoff', text: 'Show implemented tokens alongside Figma values for handoff, with right-aligned pixel numbers for quick and precise reference.' },
      { title: 'Internal tools and client deliverables', text: 'Embed in an admin theme settings page, or present a spacing system as part of a brand package, from a single data source.' },
    ],
    faqs: [
      { q: 'Are the bar widths hardcoded per row?', a: `No — every bar's width is computed as item.px / maxPx * 100, a percentage of the largest value in the scale array. Add a new token with a larger or smaller pixel value and every bar's proportions recompute automatically.` },
      { q: 'How do I match this to my real design tokens?', a: `Edit the scale array's token and px fields to mirror your actual CSS custom properties (e.g. --space-1 through --space-8, or a t-shirt-size naming scheme). The rendering logic doesn't care about naming convention or value spacing.` },
      { q: 'Can I use a non-linear scale, like a modular scale?', a: `Yes — the array accepts any px values in any order (though sorting ascending reads best). Proportional bar math works the same whether your scale is linear, modular (multiplied by a ratio), or an arbitrary custom set.` },
      { q: 'Can I make the tokens clickable to copy the CSS variable?', a: `Yes — add a click listener to each row that copies the token string (e.g. via the Clipboard API) and shows a brief confirmation, following the same pattern as the color palette extractor snippet's copy-to-clipboard swatches.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the scale array into a constant or prop, map over it in your template to render rows, and compute each bar's width the same way (item.px / maxPx * 100) as an inline style or CSS custom property.` },
    ],
    aiPrompt: {
      paragraph: `Design-token references are easy to get subtly wrong — bars that look proportional but aren't actually computed from the data, or hardcoded widths that drift out of sync the moment someone adds a token. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to confirm every bar's width genuinely derives from item.px / maxPx rather than being eyeballed, and to suggest what happens to the layout if you add a token far larger than the current maximum (does the scale need a max-width cap or a logarithmic option for scales with a huge range?). It's also a good prompt for extending the panel: ask the assistant to add click-to-copy on each token, generate the scale from an actual set of CSS custom properties read via getComputedStyle, or build a matching modular-scale generator that computes px values from a base size and ratio instead of a hardcoded array.`,
      prompt: `Build a "design system spacing scale visualizer" in plain HTML, CSS, and JavaScript — no dependencies, no CDN.

Requirements:
- Define a single array of spacing tokens, each with a token name (e.g. "--space-1") and a pixel value (e.g. 4, 8, 12, 16, 24, 32, 48, 64).
- Render one row per token showing: the token name in monospace, a horizontal bar, and the exact pixel value.
- Compute each bar's width as a percentage of the LARGEST pixel value in the array (not a hardcoded width per row), so the bars are always proportionally accurate to each other and automatically adjust if tokens are added, removed, or changed.
- Keep the rendering driven entirely by the data array — no separate hardcoded list of widths or labels to maintain in sync.
- Style it as a clean reference card: dark theme, readable monospace token labels, a subtle gradient or solid fill on the bars, right-aligned pixel values.`,
    },
  },
};

export default spacingScaleVisualizer;
