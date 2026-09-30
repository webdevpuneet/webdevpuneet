const cssReadingFlowDemo = {
  id: 'css-reading-flow-demo',
  title: 'CSS reading-flow Demo',
  lastmod: '2026-08-22',
  category: 'visualizers',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <p class="demo-note">This grid's visual order is deliberately scrambled from its source order &mdash; card 3 is placed first on screen, card 1 last. Try pressing <kbd>Tab</kbd> from the button above the grid. With the new CSS <code>reading-flow</code> property, keyboard and screen-reader order follows the sensible visual order instead of the confusing raw source order.</p>

  <button class="focus-anchor" id="focusAnchor">Tab from here &rarr;</button>

  <div class="flow-grid" id="flowGrid">
    <a class="flow-card order-3" href="#" tabindex="0"><span class="badge">3rd in source</span><h3>Reviewed</h3></a>
    <a class="flow-card order-1" href="#" tabindex="0"><span class="badge">1st in source</span><h3>Submitted</h3></a>
    <a class="flow-card order-4" href="#" tabindex="0"><span class="badge">4th in source</span><h3>Shipped</h3></a>
    <a class="flow-card order-2" href="#" tabindex="0"><span class="badge">2nd in source</span><h3>Approved</h3></a>
  </div>

  <div class="fallback-note">
    <strong>Support note:</strong> <code>reading-flow</code> is a very new, experimental CSS property. Where it isn't supported, Tab order simply follows plain DOM source order &mdash; usable, but it won't match the visual left-to-right order shown above.
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #0d0f1a; color: #dfe1f0; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 620px; margin: 0 auto; padding: 40px 20px 60px; }
.demo-note { font-size: 12.5px; color: #8b91b0; line-height: 1.65; background: #12131f; border: 1px solid #232a3d; border-radius: 10px; padding: 14px 16px; margin-bottom: 20px; }
.demo-note code { font-family: 'SFMono-Regular', Consolas, monospace; color: #a78bfa; }
.demo-note kbd { background: #1c2138; border: 1px solid #323966; border-radius: 4px; padding: 1px 6px; font-family: inherit; font-size: 11px; font-weight: 700; }

.focus-anchor {
  font-family: inherit; font-size: 13px; font-weight: 700;
  background: transparent; color: #a78bfa; border: 1.5px dashed #4c3f8a;
  padding: 8px 14px; border-radius: 8px; cursor: pointer; margin-bottom: 18px;
}
.focus-anchor:focus-visible { outline: 3px solid #6366f1; outline-offset: 3px; }

.flow-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

/* Visual placement, deliberately NOT matching DOM source order — this is
   the exact situation (grid-area / order-based rearrangement) that has
   historically broken keyboard tab order and screen-reader reading order,
   since both have traditionally followed raw DOM order regardless of how
   CSS repositions things visually. */
.flow-card {
  text-decoration: none;
  display: flex; flex-direction: column; gap: 8px;
  background: #171a28; border: 1px solid #2c3350; border-radius: 14px;
  padding: 18px;
}
.flow-card:focus-visible { outline: 3px solid #6366f1; outline-offset: 2px; }
.flow-card h3 { color: #eef0fa; font-size: 15px; }
.badge { font-size: 10.5px; font-weight: 700; color: #a78bfa; text-transform: uppercase; letter-spacing: 0.04em; }

.order-3 { grid-column: 1; grid-row: 1; }
.order-1 { grid-column: 2; grid-row: 1; }
.order-4 { grid-column: 1; grid-row: 2; }
.order-2 { grid-column: 2; grid-row: 2; }

/* ---- reading-flow ----
   Part of the CSS Overflow/Display specifications' work on decoupling
   visual order from DOM/focus/reading order. Setting reading-flow on the
   grid container tells the browser to derive tab order and accessibility
   reading order from the elements' actual visual position (grid-order in
   this case) instead of blindly following raw source order — so a
   visually scrambled grid like this one still tabs and reads in a sane,
   top-left-to-bottom-right sequence. This is very new and experimental:
   as of 2026 it has only limited/early implementation support and should
   not be relied on in production without testing your target browsers. */
@supports (reading-flow: grid-order) {
  .flow-grid {
    reading-flow: grid-order;
  }
}

/* No fallback rule is needed here: without reading-flow support, the
   browser simply keeps using plain DOM source order for Tab and screen
   reader navigation, which is still fully usable — just not aligned with
   the visual left-to-right, top-to-bottom order shown on screen. */

.fallback-note { margin-top: 20px; font-size: 12px; color: #8b91b0; line-height: 1.6; border-top: 1px dashed #232a3d; padding-top: 14px; }
.fallback-note strong { color: #dfe1f0; }
.fallback-note code { font-family: 'SFMono-Regular', Consolas, monospace; }`,

  js: `// No JavaScript: reading-flow is a pure CSS property that changes how the
// browser itself derives tab order and accessibility reading order from
// visual layout — there's nothing for script to compute or patch.
// (If you need equivalent behavior in an unsupporting browser today, the
// only reliable fallback is reordering the actual DOM source to match the
// intended visual/reading sequence, since tabindex > 0 to force order is
// widely considered an anti-pattern that itself confuses assistive tech.)`,

  seo: {
    title: 'CSS reading-flow Demo — Free Experimental Visual/Tab Order Sync',
    description: `A grid with scrambled visual order versus DOM source order, showing how the new, experimental CSS reading-flow property can keep keyboard tab order and screen-reader order matching what's on screen. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'CSS reading-flow Demo — Keeping Tab Order Sane When Visual Order Isn\'t Source Order',
      description: `CSS has always let you rearrange elements visually without touching the DOM — \`grid-column\`/\`grid-row\` placement, \`order\` in flexbox, absolute positioning — but keyboard tab order and screen-reader reading order have traditionally followed raw DOM source order regardless of how the page actually looks. That mismatch is a well-known, persistent accessibility bug class: a grid can look perfectly ordered left-to-right on screen while a keyboard user tabbing through it jumps around unpredictably, because Tab is following the markup, not the layout. \`reading-flow\` is a new CSS property, part of the CSS Overflow/Display specifications' ongoing work, aimed directly at that gap.

**What's scrambled in this demo, on purpose**

The four cards in \`#flowGrid\` are written to the DOM in one order (Reviewed, Submitted, Shipped, Approved) but visually placed in a different order using explicit \`grid-column\`/\`grid-row\` values, so "Submitted" (1st in source) actually appears top-right on screen while "Reviewed" (3rd in source) appears top-left. This exact pattern — CSS Grid or Flexbox visually reordering content away from its source order — is extremely common in real layouts (responsive reflows, masonry-style card grids, dashboard widgets) and is exactly the situation where DOM-order-based tab sequences stop matching what a sighted user sees.

**What reading-flow: grid-order actually changes**

Setting \`reading-flow: grid-order\` on the grid container tells the browser to derive both keyboard tab order and the accessibility tree's reading order from the grid items' actual visual position, rather than their DOM source position — so tabbing through this scrambled grid follows the sane top-left-to-bottom-right sequence you see on screen, matching how a sighted user would naturally scan it, instead of jumping according to source order. This directly targets a category of bug that used to require either reordering markup to match every possible visual arrangement (impossible once responsive breakpoints reorder things differently at different widths) or resorting to \`tabindex\` values greater than zero, a technique widely considered a genuine anti-pattern because it creates its own, different order-mismatch problems and is broadly discouraged in accessibility guidance.

**Very new — treat this as genuinely experimental**

Be honest with yourself about where this property stands: as of 2026, \`reading-flow\` has only limited and early implementation support across browser engines, and the specification itself is still evolving. This is meaningfully newer and less settled than most other properties in this batch of snippets. There's no meaningful CSS-only fallback for its actual behavior — this snippet's \`@supports\` block simply omits the property where unsupported, and the browser falls back to plain DOM source order for Tab and screen-reader navigation, which stays fully usable but won't match the scrambled visual arrangement above.

**The honest workaround today**

Until \`reading-flow\` has broad support, the only reliable way to keep tab order aligned with visual order is to write your DOM in the order you want things read and tabbed through, and use CSS purely for the *visual* rearrangement layered on top — never reach for \`tabindex\` greater than zero to force a different order, since it's widely discouraged and tends to create worse, harder-to-reason-about inconsistencies than the problem it's solving. Pair this with [the focus-visible explainer](/ui-snippets/focus-visible-demo/) and [the skip-to-content link](/ui-snippets/skip-to-content-link/) as part of a broader keyboard-navigation accessibility toolkit.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Read the badges on each card', text: `They show each card's real DOM source order (1st through 4th), independent of screen position.` },
      { title: 'Click "Tab from here"', text: `This focuses a starting point right above the grid.` },
      { title: 'Press Tab repeatedly', text: `In a browser supporting reading-flow, focus moves in visual reading order (top-left, top-right, bottom-left, bottom-right).` },
      { title: 'Compare to a browser without support', text: `Tab order there follows plain DOM source order — 1st, 2nd, 3rd, 4th — which won't match the visual grid.` },
      { title: 'Inspect the grid-column/grid-row placement', text: `See how visual order is scrambled independent of the HTML's own element order.` },
      { title: 'Check the @supports (reading-flow: grid-order) block', text: `The only place reading-flow is actually applied.` },
    ] },
    features: [
      { title: 'Deliberately scrambled visual order', text: `Grid placement intentionally differs from DOM source order.` },
      { title: 'reading-flow: grid-order', text: `Aligns tab order and reading order to visual position, not markup order.` },
      { title: 'Targets a real, common bug class', text: `Grid/flex visual reordering breaking keyboard navigation.` },
      { title: 'No tabindex > 0 hacks', text: `Avoids the widely discouraged manual-tab-order anti-pattern.` },
      { title: 'Graceful, honest fallback', text: `Unsupporting browsers just use plain DOM order — still usable.` },
      { title: 'Visible source-order badges', text: `Each card labels its real DOM position for easy comparison.` },
      { title: 'Zero JavaScript', text: `A pure CSS property with no script-side detection needed.` },
      { title: 'Pairs with responsive reflow', text: `Useful anywhere breakpoints change visual order per screen size.` },
    ],
    useCases: [
      { title: 'Dashboard and card grids', text: `Keep Tab order sane when cards are visually rearranged by CSS Grid.` },
      { title: 'Responsive layouts that reorder per breakpoint', text: `Different visual order at different widths, one correct reading order.` },
      { title: 'Masonry-style galleries', text: `Pair with [the native CSS masonry gallery](/ui-snippets/css-masonry-native-gallery/) where visual packing order varies.` },
      { title: 'Accessibility audits', text: `Demonstrate and test the mismatch this property is meant to fix.` },
      { title: 'Keyboard navigation toolkits', text: `Combine with [focus-visible](/ui-snippets/focus-visible-demo/) and [skip-to-content](/ui-snippets/skip-to-content-link/).` },
      { title: 'Modern CSS feature tracking', text: `Pair with [container query units](/ui-snippets/css-container-query-units-demo/) or [the :has() playground](/ui-snippets/css-has-selector-playground/) as part of a "what's new in CSS" showcase.` },
      { icon: 'CODE', title: 'Related: Two-Column FAQ', desc: 'See the [Two-Column FAQ](/ui-snippets/faq-two-column/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does Tab order not automatically match visual order today?', a: `Keyboard tab order and screen-reader reading order have traditionally followed raw DOM source order, regardless of how CSS visually repositions elements with grid-column/grid-row, flexbox order, or absolute positioning. This mismatch is a long-standing accessibility bug class: a layout can look perfectly ordered on screen while a keyboard user tabbing through it jumps around according to the markup instead of what they see.` },
      { q: 'What does reading-flow: grid-order actually do?', a: `Set on a grid container, it tells the browser to derive both keyboard tab order and the accessibility tree's reading order from the grid items' actual visual position rather than their DOM source position, so navigating through the grid follows the sensible on-screen order even when that differs from how the elements are written in the markup.` },
      { q: 'How mature is browser support for reading-flow?', a: `Very early, as of 2026 — this is one of the newest and least-settled properties covered in this collection, with only limited implementation across browser engines and an evolving specification. Treat it as genuinely experimental and verify current support in your specific target browsers before depending on it.` },
      { q: 'Is there a CSS fallback that replicates reading-flow\'s behavior?', a: `No meaningful one. Without reading-flow, the browser falls back to plain DOM source order for Tab and screen-reader navigation — a fully usable but not visually-matched order. The honest fallback approach is to write your DOM in the order you want things read and tabbed through, applying CSS purely for the visual rearrangement on top, rather than trying to fake reading-flow's exact behavior another way.` },
      { q: 'Why shouldn\'t I just use tabindex greater than zero to fix the order instead?', a: `Setting explicit positive tabindex values to force a specific tab sequence is widely considered an anti-pattern in accessibility guidance: it creates a separate, hard-to-maintain order that has to be manually kept in sync with any layout change, and it interacts confusingly with the rest of the page's natural (zero/unset) tabindex elements, often producing a worse and more surprising experience than the DOM-order mismatch it was meant to fix.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain precisely why grid-column/grid-row placement can visually reorder content without changing DOM order, and why that specific gap is what reading-flow is designed to close — understanding that distinction is the core of the whole property. It's also a good prompt for auditing your own dashboards or card grids: ask the assistant to identify any places where CSS visually reorders content away from its source order, since those are exactly the spots where keyboard tab order silently breaks today without reading-flow. You could ask it to check current browser support status for reading-flow specifically, since this is one of the newest properties around and support will keep changing after this snippet was written. Treat the demo as a teaching example for a real, common accessibility bug rather than a production-ready pattern to ship on its own yet.`,
      prompt: `Build a demo in plain HTML and CSS, no JavaScript, that illustrates the mismatch between visual order and DOM/tab order in a CSS Grid layout, and shows how the new, experimental reading-flow CSS property can fix it.

Requirements:
- A grid of at least 4 focusable card elements (e.g. anchor or button elements) written to the DOM in one order, but visually placed in a deliberately different order using explicit grid-column and grid-row values, so the visual left-to-right/top-to-bottom order clearly differs from the source order.
- Label each card visibly with its actual DOM source position (e.g. "1st in source", "2nd in source") so a reader can directly compare source order against visual position.
- Inside an @supports (reading-flow: grid-order) block, set reading-flow: grid-order on the grid container so that, in a supporting browser, keyboard Tab order and accessibility reading order follow the visual position of the cards rather than their DOM source order.
- Do not use tabindex values greater than zero anywhere as a workaround — explain in a code comment or on-page note why that approach is a discouraged anti-pattern.
- Add a focusable element just before the grid so a user can conveniently start tabbing from a known point and observe the resulting order.
- Include an honest, clearly visible note explaining that reading-flow is a very new and experimental CSS property with limited browser support as of 2026, and that in an unsupporting browser, Tab order will simply fall back to plain DOM source order rather than matching the visual layout.`,
    },
  },
};

export default cssReadingFlowDemo;
