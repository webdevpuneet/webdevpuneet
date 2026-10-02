const cssTextBoxTrimDemo = {
  id: 'css-text-box-trim-demo',
  title: 'CSS text-box-trim Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <p class="demo-note">Every font has invisible padding above and below its glyphs, baked into its metrics &mdash; it's why a heading never sits flush against a border or icon. The new CSS <code>text-box-trim</code> / <code>text-box-edge</code> properties trim that space off directly. Compare the two boxes below; both use the exact same font, size, and border.</p>

  <div class="compare-row">
    <div class="compare-box">
      <span class="compare-label">Default (untrimmed)</span>
      <div class="sample-box default-box">
        <span class="icon-chip" aria-hidden="true">&#9733;</span>
        <h2>Featured</h2>
      </div>
      <p class="compare-caption">Notice the gap above "Featured" and below it &mdash; that's leading from the font's own metrics, not padding you set.</p>
    </div>

    <div class="compare-box">
      <span class="compare-label">text-box-trim: both</span>
      <div class="sample-box trimmed-box">
        <span class="icon-chip" aria-hidden="true">&#9733;</span>
        <h2>Featured</h2>
      </div>
      <p class="compare-caption">The heading's text now sits flush against the box edges, aligned with the icon and border with no manual offset hacks.</p>
    </div>
  </div>

  <div class="fallback-note">
    <strong>Support note:</strong> <code>text-box-trim</code> is very new and not yet supported everywhere. The <code>@supports not</code> fallback below simply leaves the default spacing in place &mdash; nothing breaks, it just isn't trimmed there.
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #f4f2ec; color: #26221a; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 40px 20px 60px; }
.demo-note { font-size: 12.5px; color: #6b6455; line-height: 1.65; background: #fff; border: 1px solid #e6e1d3; border-radius: 10px; padding: 14px 16px; margin-bottom: 26px; }
.demo-note code { font-family: 'SFMono-Regular', Consolas, monospace; color: #b45309; }

.compare-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
.compare-box { display: flex; flex-direction: column; gap: 8px; }
.compare-label { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: #a8895c; }

.sample-box {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 2px solid #26221a;
  border-radius: 10px;
  padding: 14px 16px;
}
.icon-chip { font-size: 20px; color: #b45309; line-height: 1; }
.sample-box h2 { font-size: 24px; font-weight: 800; letter-spacing: -0.01em; background: #fef3c7; }

.compare-caption { font-size: 12px; color: #7a7460; line-height: 1.55; }

/* ---- text-box-trim ----
   Font metrics reserve space above the cap-height/ascent and below the
   descent for accents and descenders across the whole font, even on
   glyphs that don't use it — that reserved space is why a heading never
   sits perfectly flush against a border, icon, or another box, no matter
   how precisely you zero out margin/padding. text-box-trim removes that
   reserved space from the specified edge(s) of the text's own box;
   text-box-edge chooses which metric (cap-height, text, etc.) to trim to. */
.trimmed-box h2 {
  text-box-trim: trim-both;
  text-box-edge: cap alphabetic;
}

/* Fallback: no-op. Because normal text flow with the reserved leading is
   already a completely valid, readable layout, an unsupporting browser
   simply keeps the small visual gap around the heading — nothing breaks,
   it just isn't flush the way the trimmed box is. */
@supports not (text-box-trim: trim-both) {
  .trimmed-box h2 {
    /* Intentionally empty: default font leading remains, which still
       renders correctly, just without the flush alignment. */
  }
}`,

  js: `// No JavaScript: text-box-trim is a pure CSS property, and its fallback
// is simply the browser's default (untrimmed) text box — nothing to
// detect or patch from script.`,

  seo: {
    title: 'CSS text-box-trim Demo — Free Font Leading Trim Comparison',
    description: `A side-by-side comparison showing what the new CSS text-box-trim and text-box-edge properties do — removing a font's reserved leading so headings sit flush against borders and icons. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CSS text-box-trim Demo — Why Headings Never Quite Touch a Border',
      description: `Every font reserves invisible vertical space above and below its glyphs as part of its own metrics — room for accents on capital letters, room for descenders on letters like "g" and "y", sized generously enough to cover every character the font ships, even on a line that uses none of them. That reserved space, historically called leading, is why a heading dropped into a tightly-bordered card, next to an icon, or against a horizontal rule never sits perfectly flush no matter how precisely you zero out \`margin\` and \`padding\` — the gap isn't spacing you added, it's baked into the font itself. \`text-box-trim\` is a new CSS property that removes it directly.

**What's actually happening in the two boxes**

Both boxes in this demo use the identical font, size, weight, and border — the only difference is that \`.trimmed-box h2\` adds \`text-box-trim: trim-both\` alongside \`text-box-edge: cap alphabetic\`. In the default box, look closely at the gap between the top of the heading's border and the visible top of the "F" in "Featured," and the gap below the baseline before the border — that's the font's reserved ascent/descent space, present in every browser's default text rendering. In the trimmed box, that space is removed from both edges, so the heading's visible glyphs align flush with the icon beside it and the border around it.

**How text-box-edge chooses the metric**

\`text-box-trim\` decides which edges to trim (\`trim-start\`, \`trim-end\`, or \`trim-both\`), while \`text-box-edge\` decides which font metric to trim *to* on each edge — this demo uses \`cap alphabetic\`, meaning the top trims to the font's cap-height (the top of capital letters) and the bottom trims to the alphabetic baseline, which is usually what you want for a heading sitting in a tightly designed card or aligned next to an icon.

**Why this has been a real, persistent design pain point**

Before this property existed, designers and developers worked around the reserved leading with hand-tuned negative margins or fixed pixel offsets calculated per font — a fragile hack that breaks the moment the font, its version, or its fallback changes, since different fonts reserve different amounts of space. \`text-box-trim\` solves the actual problem at its source instead of compensating for it after the fact, which is why design tools like Figma have had an equivalent "trim" concept in their text engines for years while CSS had no way to express it.

**Genuinely new — treat the fallback seriously**

This is one of the newest properties in this batch of snippets: support is still rolling out unevenly across engines as of 2026, and it should not be assumed to be universally available yet. The \`@supports not (text-box-trim: trim-both)\` block in this snippet is deliberately a no-op — an unsupporting browser simply keeps the small reserved gap around the heading, which is still a completely valid, readable layout, just without the flush alignment. Never let the trimmed state be load-bearing for legibility; treat it purely as a polish layer. Pair this with [the CSS reading-flow demo](/ui-snippets/css-reading-flow-demo/) or [container query units](/ui-snippets/css-container-query-units-demo/) for more of the newest native CSS layer.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Compare the two boxes', text: `Look at the gap above and below "Featured" in the left (default) box versus the right (trimmed) box.` },
      { title: 'Check icon alignment', text: `In the trimmed box, the heading's cap-height lines up with the star icon; in the default box it sits slightly lower.` },
      { title: 'Inspect text-box-trim: trim-both', text: `Applied only to .trimmed-box h2 — the rest of the layout is identical CSS.` },
      { title: 'Check text-box-edge: cap alphabetic', text: `Trims the top to cap-height and the bottom to the alphabetic baseline.` },
      { title: 'Test in an unsupporting browser', text: `The @supports not fallback is a no-op — the heading just keeps its default spacing.` },
      { title: 'Try it on your own headings', text: `Apply the same two properties anywhere a heading sits inside a tight border or beside an icon.` },
    ] },
    features: [
      { title: 'Removes reserved font leading', text: `Trims the invisible ascent/descent space baked into every font.` },
      { title: 'text-box-edge: cap alphabetic', text: `Trims to cap-height on top, the alphabetic baseline on bottom.` },
      { title: 'Flush icon/border alignment', text: `Headings align with adjacent icons and borders with no manual offsets.` },
      { title: 'No negative-margin hacks needed', text: `Replaces fragile, font-specific pixel-offset workarounds.` },
      { title: 'Side-by-side comparison', text: `Identical font/size/border, only the trim property differs.` },
      { title: 'Honest no-op fallback', text: `Unsupporting browsers simply keep default, still-readable spacing.` },
      { title: 'Zero JavaScript', text: `A pure CSS property — nothing to feature-detect in script.` },
      { title: 'Works on any text element', text: `Not limited to headings — apply to any inline or block text box.` },
    ],
    useCases: [
      { title: 'Tightly bordered cards and badges', text: 'Align heading text flush against borders by trimming the invisible space fonts reserve above and below their glyphs.' },
      { title: 'Icon and label rows', text: 'Match text cap-height to an adjacent icon precisely, using `text-box-edge: cap alphabetic` instead of guessing pixel offsets.' },
      { title: 'Design system typography tokens', text: 'Standardise flush text alignment across design system components, replacing fragile negative-margin hacks that depend on one specific font.' },
      { title: 'Pixel-perfect design handoff', text: 'Match a Figma trimmed text setting exactly, so developers reproduce the designer\'s spacing without manual adjustments.' },
      { title: 'Buttons and modern CSS showcases', text: 'Remove excess vertical space from pills with tight padding, or pair with the [CSS reading-flow demo](/ui-snippets/css-reading-flow-demo/) and [CSS subgrid demo](/ui-snippets/css-subgrid-demo/) to present modern CSS.' },
      { icon: 'CODE', title: 'Related: Feature Spotlight Tabs', desc: 'See the [Feature Spotlight Tabs](/ui-snippets/feature-spotlight-tabs/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does a heading never sit flush against a border even with zero margin and padding?', a: `Every font reserves vertical space above and below its glyphs as part of its own metrics — room for accents on capital letters and descenders like "g" or "y" — sized to cover every character the font supports, regardless of what a given line of text actually uses. That reserved space, historically called leading, remains even after you zero out margin and padding, because it lives inside the text's own line-height box, not in spacing you control directly.` },
      { q: 'What is the difference between text-box-trim and text-box-edge?', a: `text-box-trim decides which edge(s) of the text box to trim — trim-start, trim-end, or trim-both. text-box-edge decides which font metric each trimmed edge should align to, such as cap-height for the top or the alphabetic baseline for the bottom. You typically set both together, as this demo does with trim-both and cap alphabetic.` },
      { q: 'Is text-box-trim widely supported yet?', a: `No — this is one of the newest CSS text properties as of 2026, and support is still rolling out unevenly across browser engines. Treat it as a genuinely experimental property rather than something you can assume is universally available, and always pair it with a fallback.` },
      { q: 'What happens in a browser that doesn\'t support it?', a: `This snippet's @supports not (text-box-trim: trim-both) block is intentionally a no-op — an unsupporting browser simply keeps the font's default reserved spacing around the heading. That default state is still a completely valid, readable layout; it just isn't flush-aligned the way the trimmed box is, so nothing breaks or looks obviously wrong.` },
      { q: 'How is this different from the old negative-margin trick?', a: `The negative-margin approach approximates the trim by guessing a fixed pixel offset for one specific font, which breaks the moment that font, its version, or a fallback font changes, since different fonts reserve different amounts of leading. text-box-trim solves the problem at the metric level using the font's own cap-height and baseline data, so it stays correct across font changes without hand-tuned numbers.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's CSS into an AI coding assistant like Claude and ask it to explain, using this exact comparison, what "reserved leading" or "half-leading" actually means in font metrics terms and why it's baked into every font rather than being something you can zero out with margin or padding — that background makes the rest of the property much easier to reason about. It's also a good prompt for auditing an existing design system: ask the assistant to find any negative-margin or fixed-pixel-offset hacks in your CSS that exist specifically to compensate for this reserved space, and evaluate whether text-box-trim could replace them, keeping in mind the fallback needs to remain a graceful no-op given current support levels. You could also ask it to explain the other text-box-edge metric keywords (like text or ex) and when each is the right choice versus cap alphabetic. Treat this as a snapshot of a brand-new property whose support will change — verify current browser coverage before shipping.`,
      prompt: `Build a side-by-side comparison demonstrating the new CSS text-box-trim and text-box-edge properties in plain HTML and CSS, with no JavaScript.

Requirements:
- Two visually identical boxes (same font, font-size, font-weight, border, and padding) each containing a heading next to a small icon, so any spacing difference between the two is caused only by the trim property, not by any other styling difference.
- The first box must use default, untrimmed text rendering, so the font's normal reserved leading is visible as a gap above and below the heading text relative to the box border and the adjacent icon.
- The second box must apply text-box-trim: trim-both together with text-box-edge: cap alphabetic to the heading, so its capital-letter top aligns to the cap-height metric and its bottom aligns to the alphabetic baseline, removing the reserved leading and making the heading sit flush against the border and align with the icon.
- Wrap the trimmed styling in a way that degrades gracefully in unsupporting browsers — an @supports not (text-box-trim: trim-both) block that is effectively a no-op, since the default (untrimmed) state is already a valid, readable layout and nothing should visually break there.
- Add a short, clearly labeled caption under each box explaining what it demonstrates, and a general note stating honestly that text-box-trim is a very new CSS property with still-uneven browser support as of 2026, so readers understand not to rely on it as anything more than a progressive enhancement.`,
    },
  },
};

export default cssTextBoxTrimDemo;
