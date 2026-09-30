const typographyScalePreview = {
  id: 'typography-scale-preview',
  title: 'Typography Scale Preview',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="tsp-card">
  <div class="tsp-head">
    <h2>Type Scale</h2>
    <p class="tsp-sub">Live rendered samples at every step, with real size and line-height</p>
  </div>
  <div class="tsp-list" id="tspList"></div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.tsp-card{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;color:#e9ebf5;border:1px solid #262a3b;border-radius:18px;padding:24px;max-width:640px;margin:0 auto}
.tsp-head h2{font-size:18px;margin:0 0 4px}
.tsp-sub{font-size:12px;color:#8b90a8;margin:0 0 20px}
.tsp-list{display:flex;flex-direction:column}
.tsp-row{display:flex;justify-content:space-between;align-items:baseline;gap:20px;padding:16px 0;border-bottom:1px solid #1c2033;flex-wrap:wrap}
.tsp-row:last-child{border-bottom:none}
.tsp-sample{color:#f2f3fa;letter-spacing:-.01em;word-break:break-word}
.tsp-meta{display:flex;flex-direction:column;align-items:flex-end;gap:2px;flex-shrink:0}
.tsp-name{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#a78bfa}
.tsp-vals{font-family:ui-monospace,Menlo,monospace;font-size:11px;color:#8b90a8;white-space:nowrap}`,

  js: `// Single source of truth: each step defines its own font-size and
// line-height, and the sample text renders live at those exact values —
// nothing here is a static screenshot or pre-baked image.
var scale = [
  { name: 'Display', text: 'Design with clarity', size: 56, lh: 1.05, weight: 800 },
  { name: 'H1', text: 'Build interfaces faster', size: 40, lh: 1.1, weight: 800 },
  { name: 'H2', text: 'A scale that just works', size: 32, lh: 1.15, weight: 700 },
  { name: 'H3', text: 'Consistent visual rhythm', size: 24, lh: 1.25, weight: 700 },
  { name: 'Body', text: 'The quick brown fox jumps over the lazy dog.', size: 16, lh: 1.6, weight: 400 },
  { name: 'Caption', text: 'Last updated 2 minutes ago', size: 13, lh: 1.5, weight: 500 },
];

var list = document.getElementById('tspList');

scale.forEach(function (step) {
  var row = document.createElement('div');
  row.className = 'tsp-row';

  var sample = document.createElement('div');
  sample.className = 'tsp-sample';
  sample.style.fontSize = step.size + 'px';
  sample.style.lineHeight = step.lh;
  sample.style.fontWeight = step.weight;
  sample.textContent = step.text;

  var meta = document.createElement('div');
  meta.className = 'tsp-meta';
  var name = document.createElement('span');
  name.className = 'tsp-name';
  name.textContent = step.name;
  var vals = document.createElement('span');
  vals.className = 'tsp-vals';
  vals.textContent = step.size + 'px / ' + step.lh + ' \\u00b7 ' + step.weight;

  meta.appendChild(name);
  meta.appendChild(vals);
  row.appendChild(sample);
  row.appendChild(meta);
  list.appendChild(row);
});`,

  seo: {
    title: 'Typography Scale Preview — Free Live Type Scale Reference',
    description: `A vertical stack of live-rendered text samples across a type scale — Display, H1, H2, H3, Body, Caption — with real font-size, line-height, and weight labels. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Typography Scale Preview — Live Samples at Every Step of the Scale',
      description: `The typography scale preview is the reference every design system doc needs alongside its color and spacing tokens: a vertical stack of text samples, each one actually rendered at its real font-size, line-height, and weight, with those exact values labeled beside it. This snippet builds one in plain HTML, CSS, and JavaScript, driven entirely by a single data array.

**Live rendering, not a mockup**

Each row's sample text has its \`font-size\`, \`line-height\`, and \`font-weight\` set directly as inline styles pulled straight from the \`scale\` array — \`sample.style.fontSize = step.size + 'px'\`. That means what you see is exactly what those values produce in a real browser, including how the font's actual metrics affect line spacing, not a static image or a pre-rendered screenshot standing in for the type.

**Six standard steps**

The default scale covers Display, H1, H2, H3, Body, and Caption — the steps most design systems define — each with distinct size, line-height, and weight combinations. Larger headline steps use tighter line-heights (\`1.05\`–\`1.15\`) since large text needs less vertical breathing room, while Body uses a generous \`1.6\` for readability in paragraphs.

**Exact values labeled**

Beside every sample, a monospace label prints the precise \`size / line-height · weight\` combination, so a developer implementing the scale in CSS doesn't have to reverse-engineer it from the visual alone — the numbers are right there.

**Why a single array matters**

Because every row is generated from one \`scale\` array, adding a new step (say, an "Overline" or "H4") or adjusting an existing size is a one-line change — the rendering, labeling, and layout all stay in sync automatically.

**Customizing it**

Swap the sample copy for your own brand voice, change the font family via the card's \`font-family\`, add more steps, or connect it to real CSS custom properties with \`getComputedStyle\`. Pair it with a [spacing scale visualizer](/ui-snippets/spacing-scale-visualizer/) for a complete type-and-space design tokens reference.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A live sample renders for every step in the scale.` },
      { title: 'Read each row', text: `Sample text on the left, exact size/line-height/weight on the right.` },
      { title: 'Compare rhythm', text: `See how each step's proportions relate to its neighbors.` },
      { title: 'Edit the scale array', text: `Add steps or change values — samples re-render live.` },
      { title: 'Swap the font family', text: `Change .tsp-card's font-family to preview your real typeface.` },
    ] },
    features: [
      { title: 'Live-rendered samples', text: `Actual inline styles, not a screenshot or image.` },
      { title: 'Six standard steps', text: `Display, H1, H2, H3, Body, and Caption included.` },
      { title: 'Exact value labels', text: `Size, line-height, and weight printed per row.` },
      { title: 'Single data source', text: `One scale array drives every sample and label.` },
      { title: 'Real line-height rendering', text: `See actual vertical rhythm, not a guessed number.` },
      { title: 'Easy to extend', text: `Add or remove steps without touching layout code.` },
      { title: 'Custom sample copy', text: `Each step has its own preview text.` },
      { title: 'Zero dependencies', text: `Plain data and DOM, no build step.` },
    ],
    useCases: [
      { title: 'Design system docs', text: `Document a type scale alongside spacing tokens.` },
      { title: 'Brand style guides', text: `Preview a typeface across all defined sizes.` },
      { title: 'Font pairing tests', text: `Swap font-family to compare typefaces at scale.` },
      { title: 'Client presentations', text: `Show a proposed type system live, not mocked up.` },
      { title: 'Storybook/Figma handoff', text: `Give engineers exact values to implement.` },
      { title: 'Internal theme tools', text: `Preview scale changes before shipping to production.` },
    ],
    faqs: [
      { q: 'Are the samples real text rendering, or images?', a: `Real rendering. Each sample's font-size, line-height, and font-weight are set as inline styles directly from the scale array's values, so what you see is the browser's actual text layout at those exact numbers — not a screenshot or a pre-rendered image standing in for it.` },
      { q: 'How do I preview my own typeface?', a: `Change the font-family on .tsp-card (or add a @font-face and reference it) — every sample inherits it since they don't set their own font-family, so the whole scale updates to your typeface at once.` },
      { q: 'Can I add more steps to the scale, like an Overline or H4?', a: `Yes — add another object to the scale array with a name, text, size, lh, and weight. It renders automatically in the same list with no other code changes.` },
      { q: 'Why do headline steps use tighter line-heights than body text?', a: `Larger text needs proportionally less line-height to look balanced — a 1.6 line-height at 56px would create huge gaps between lines, while the same 1.6 is exactly right for comfortable paragraph reading at 16px. The scale's per-step lh values reflect that relationship.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move the scale array into a constant, map over it in your template, and bind size/lh/weight to inline styles or CSS custom properties per sample the same way. No DOM-specific logic needs to change.` },
    ],
    aiPrompt: {
      paragraph: `Type scales look simple until the line-heights stop feeling right at different sizes, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to explain why the scale array pairs larger font-sizes with tighter line-heights and smaller sizes with looser ones, and whether the specific ratios here (1.05 at 56px vs. 1.6 at 16px) match established typographic conventions or could be tuned further for your specific typeface. It's also a useful sounding board for extending the demo: ask it to generate the scale programmatically from a base size and a ratio (a modular scale) instead of hardcoding each step, to add a responsive variant that shows how each step's clamp() value should look across viewport widths, or to wire the font-family to a live Google Fonts picker so you can A/B compare typefaces across the whole scale at once.`,
      prompt: `Build a "typography scale preview" in plain HTML, CSS, and JavaScript — no dependencies, no CDN.

Requirements:
- Define a single array of type scale steps, each with a name (Display, H1, H2, H3, Body, Caption), sample text, a font-size in px, a line-height, and a font-weight.
- Render each step as a row: the sample text actually rendered LIVE at that step's exact font-size, line-height, and font-weight via inline styles (not an image or static mockup), with the step's name and its exact size/line-height/weight values labeled beside it in a readable format.
- Larger heading steps should use tighter line-heights than body text, reflecting real typographic practice.
- Keep everything driven by the single data array — adding, removing, or editing a step should require no other code changes.
- Style it as a clean vertical stack with dividers between rows, dark-theme friendly, with the metadata label right-aligned and in a monospace font.`,
    },
  },
};

export default typographyScalePreview;
