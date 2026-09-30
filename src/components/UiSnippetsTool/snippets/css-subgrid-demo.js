const cssSubgridDemo = {
  id: 'css-subgrid-demo',
  title: 'CSS Subgrid Demo',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="intro">
    <h2>Parent grid vs. nested subgrid</h2>
    <p>The outer grid defines 4 columns. Each product card below is itself a grid with 3 rows (image, title, price row). Toggle the switch to see those inner rows align to the <strong>parent's</strong> row tracks via <code>grid-template-rows: subgrid</code>, versus each card sizing its rows independently.</p>
  </div>

  <div class="toggle-row">
    <span class="toggle-label" id="mode-label">Mode: <strong>Independent grid</strong> (rows NOT aligned)</span>
    <label class="switch">
      <input type="checkbox" id="subgrid-toggle">
      <span class="switch-slider"></span>
    </label>
  </div>

  <div class="parent-grid" id="parent-grid">
    <div class="product-card">
      <div class="p-img">📦</div>
      <div class="p-title">Compact Backpack</div>
      <div class="p-price-row">
        <span class="p-price">$49</span>
        <button class="p-btn">Add</button>
      </div>
    </div>
    <div class="product-card">
      <div class="p-img">🎧</div>
      <div class="p-title">Wireless Headphones with Extra Long Name</div>
      <div class="p-price-row">
        <span class="p-price">$89</span>
        <button class="p-btn">Add</button>
      </div>
    </div>
    <div class="product-card">
      <div class="p-img">⌚</div>
      <div class="p-title">Smart Watch</div>
      <div class="p-price-row">
        <span class="p-price">$129</span>
        <button class="p-btn">Add</button>
      </div>
    </div>
    <div class="product-card">
      <div class="p-img">🔌</div>
      <div class="p-title">USB-C Hub</div>
      <div class="p-price-row">
        <span class="p-price">$29</span>
        <button class="p-btn">Add</button>
      </div>
    </div>
  </div>

  <div class="css-panel">
    <p class="css-panel-label">Active rule on .product-card</p>
    <code class="css-panel-code" id="css-live-rule">grid-template-rows: subgrid;  /* aligned to parent row tracks */</code>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; color: #1e293b; }

.demo-wrap { max-width: 760px; margin: 0 auto; padding: 32px 20px 48px; }
.intro h2 { font-size: 18px; font-weight: 700; margin-bottom: 6px; }
.intro p { font-size: 13px; color: #64748b; line-height: 1.6; }
.intro code { background: #eef2ff; color: #4f46e5; padding: 1px 6px; border-radius: 5px; font-size: 12px; }
.intro strong { color: #1e293b; }

.toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  margin: 18px 0 16px; padding: 12px 14px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
}
.toggle-label { font-size: 13px; color: #475569; }
.toggle-label strong { color: #0f172a; }

.switch { position: relative; display: inline-block; width: 46px; height: 26px; flex-shrink: 0; cursor: pointer; }
.switch input { opacity: 0; width: 0; height: 0; position: absolute; }
.switch-slider { position: absolute; inset: 0; background: #e2e8f0; border-radius: 26px; transition: background 0.25s; }
.switch-slider::before { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.18); top: 4px; left: 4px; transition: transform 0.25s; }
.switch input:checked + .switch-slider { background: #6366f1; }
.switch input:checked + .switch-slider::before { transform: translateX(20px); }

/* --- Parent grid: 4 columns, auto rows sized by content --- */
.parent-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  background: #eef2ff;
  border: 1.5px dashed #a5b4fc;
  border-radius: 14px;
  padding: 16px;
}
@media (max-width: 640px) {
  .parent-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Default: each card is an independent grid — rows size to its own content only */
.product-card {
  display: grid;
  grid-template-rows: auto auto auto;
  gap: 8px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px;
  /* card spans 3 parent rows so subgrid mode has something to align to */
  grid-row: span 3;
  transition: box-shadow 0.2s;
}

/* Subgrid mode: rows inherit the PARENT grid's row track sizing */
.parent-grid.subgrid-mode .product-card {
  grid-template-rows: subgrid;
}

.p-img { font-size: 34px; display: flex; align-items: center; }
.p-title { font-size: 13px; font-weight: 600; color: #1e293b; line-height: 1.4; align-self: start; }
.p-price-row { display: flex; align-items: center; justify-content: space-between; align-self: end; }
.p-price { font-size: 14px; font-weight: 700; color: #0f172a; }
.p-btn {
  background: #6366f1; color: #fff; border: none; border-radius: 6px;
  padding: 5px 10px; font-size: 11px; font-weight: 600; cursor: pointer; font-family: inherit;
  transition: background 0.15s;
}
.p-btn:hover { background: #4f46e5; }

.css-panel { margin-top: 18px; background: #0f172a; border-radius: 12px; padding: 14px 16px; }
.css-panel-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: #818cf8; margin-bottom: 6px; }
.css-panel-code { display: block; font-family: "SF Mono", Consolas, monospace; font-size: 12px; color: #e2e8f0; word-break: break-word; }`,
  js: `const toggle = document.getElementById('subgrid-toggle');
const parentGrid = document.getElementById('parent-grid');
const modeLabel = document.getElementById('mode-label');
const liveRule = document.getElementById('css-live-rule');

function applyMode() {
  const isSubgrid = toggle.checked;
  parentGrid.classList.toggle('subgrid-mode', isSubgrid);

  if (isSubgrid) {
    modeLabel.innerHTML = 'Mode: <strong>grid-template-rows: subgrid</strong> (rows aligned to parent)';
    liveRule.textContent = 'grid-template-rows: subgrid;  /* aligned to parent row tracks */';
  } else {
    modeLabel.innerHTML = 'Mode: <strong>Independent grid</strong> (rows NOT aligned)';
    liveRule.textContent = 'grid-template-rows: auto auto auto;  /* each card sizes its own rows */';
  }
}

toggle.addEventListener('change', applyMode);
applyMode();`,
  seo: {
    title: 'CSS Subgrid Demo — grid-template-rows: subgrid Snippet',
    description: 'Toggle between subgrid and independent nested grids to see how CSS subgrid aligns child rows/columns to a parent grid. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS Subgrid Demo — Aligning Nested Grid Items to Their Parent\'s Tracks',
      description: `CSS Grid solved most two-dimensional layout problems, but it had one long-standing gap: a grid item that was itself a grid container could not align its own rows or columns to its parent's tracks. If you built a row of product cards where each card internally used a 3-row grid (image, title, price), every card's internal rows sized independently, based only on that card's own content — so a card with a two-line title would get a taller title row than its neighbors, and the price row beneath it would no longer line up horizontally across the row. This is exactly the "ragged card grid" problem countless product listings, pricing tables, and dashboard tiles run into. The \`subgrid\` value for \`grid-template-columns\` and \`grid-template-rows\`, part of CSS Grid Level 2 and supported in Chrome/Edge 117+, Firefox 71+, and Safari 16+ (meaning full baseline support across evergreen browsers by 2023), closes this gap directly at the platform level.

**How subgrid works technically**

Normally, when you write \`display: grid\` on an element that is itself a grid item, its \`grid-template-columns\` and \`grid-template-rows\` define a brand-new, independent set of tracks scoped only to that element's own children — there is no relationship to the parent grid's tracks at all. Writing \`grid-template-rows: subgrid\` (or \`grid-template-columns: subgrid\`) instead tells the browser: "don't create new tracks — adopt the row (or column) tracks of the ancestor grid item that this element spans." The element must actually span multiple track lines of the parent for this to be meaningful, which is why this demo's \`.product-card\` uses \`grid-row: span 3\` — it explicitly claims 3 of the parent grid's row tracks so that \`subgrid\` has real parent tracks to inherit. Once subgridded, each of the card's own grid items (the image, title, and price row) is positioned into the corresponding *parent* track, and — critically — the *sizing* of those tracks (how tall each row is) is now computed across all sibling cards simultaneously, not per-card. That's what makes titles, images, and price rows align perfectly across every card in the row, even when their content lengths differ.

**Why this matters for modern UI development in 2025/2026**

Card grids, comparison tables, and any repeated-component layout ("all these things must visually align even though their content differs in length") used to require either JavaScript row-height measurement/syncing (expensive, layout-thrashing, and fragile on resize), or a hacky flattened single-level grid where you gave up the semantic nesting of "card contains image, title, price" and instead put every image/title/price as siblings directly in the parent grid (breaking HTML semantics and complicating styling per-card). Subgrid lets you keep the natural nested markup — a \`.product-card\` component that is a self-contained, reusable unit — while still getting perfect cross-card alignment, purely through CSS. This is a meaningful capability for any team building a component library where a "Card" component needs to visually align with its siblings when repeated in a grid, without the Card component needing to know anything about its siblings.

**What this demo shows**

Toggle the switch to compare both states side by side using the same markup. In "Independent grid" mode, each card's \`grid-template-rows: auto auto auto\` sizes its own three rows purely from its own content, so the headphones card (with a longer title) has a taller title row than its neighbors, pushing its price row down and breaking alignment. Switch to subgrid mode, and the same cards adopt \`grid-template-rows: subgrid\`, which makes all four cards' rows size together — the parent grid computes one shared height per row track across every card that spans it, so every price row lands on the same horizontal line regardless of title length.

**Browser support and fallback strategy**

Subgrid support is solid across evergreen browsers today, but for any project needing to support older browser versions, feature-detect with \`@supports (grid-template-rows: subgrid)\` and provide an independent-grid fallback — visually imperfect alignment, but a functional layout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Compare the two modes', text: 'The demo loads in "Independent grid" mode by default. Notice the "Wireless Headphones with Extra Long Name" card has a taller title area than its siblings, which pushes its price row out of alignment with the other three cards.' },
        { title: 'Flip the toggle to subgrid', text: 'Click the switch to enable subgrid mode. The .product-card rule grid-template-rows: subgrid is applied via the .subgrid-mode class on the parent, and every card\'s image, title, and price rows snap into alignment across the whole row — watch the price row line up perfectly.' },
        { title: 'Inspect the span requirement', text: 'Each .product-card has grid-row: span 3 in the CSS, which is required for subgrid to work — a subgridded element must span the parent tracks it wants to inherit. Try removing the span value in DevTools to see subgrid have nothing to align to.' },
        { title: 'Read the live CSS panel', text: 'The dark panel at the bottom shows the exact grid-template-rows value currently active on .product-card, switching between subgrid and auto auto auto as you toggle, so you can see the literal CSS driving the alignment change.' },
        { title: 'Resize the browser window', text: 'Shrink the window to see the parent grid drop from 4 columns to 2 at the 640px breakpoint (grid-template-columns: repeat(2, 1fr)). Subgrid alignment recalculates per-row automatically as cards wrap into new rows.' },
        { title: 'Apply subgrid to your own card grids', text: 'In your own layout, give the parent display: grid with defined row tracks, make each card grid-row: span N, and set the card\'s own grid-template-rows: subgrid. Wrap the property in @supports (grid-template-rows: subgrid) { ... } to provide a graceful auto-row fallback for unsupported browsers.' },
      ],
    },
    features: [
      'grid-template-rows: subgrid on .product-card inherits the parent .parent-grid\'s row track sizing',
      'grid-row: span 3 explicitly claims 3 parent row tracks so subgrid has real tracks to adopt',
      'Toggle switch swaps a single .subgrid-mode class on the parent to flip between subgrid and auto rows',
      'Row heights compute jointly across sibling cards in subgrid mode — no JS height measurement needed',
      'Independent-grid mode intentionally shows the ragged-alignment problem subgrid solves, side by side',
      'Live CSS panel reflects the exact grid-template-rows value currently applied to .product-card',
      'Responsive parent grid: repeat(4, 1fr) desktop, repeat(2, 1fr) at the 640px breakpoint',
      '@supports (grid-template-rows: subgrid) is the recommended feature-detection gate for production use',
    ],
    useCases: [
      { icon: 'CARDS', title: 'Product and pricing card grids with aligned internal rows', desc: 'E-commerce listings, comparison tables, and pricing pages commonly need every card\'s image, title, and CTA button to align horizontally across a row even when title lengths vary. Subgrid solves this natively, replacing JS-based row-height syncing that previously required measuring the tallest element and forcing others to match, similar in spirit to techniques used in the [Pricing Card](/ui-snippets/pricing-card/) snippet.' },
      { icon: 'LAYOUT', title: 'Dashboard tiles with consistent internal structure', desc: 'A dashboard grid of stat tiles — each with a label, big number, and trend indicator — can use subgrid so the trend indicator row aligns across every tile regardless of how many digits the number has or how long the label text is, without any per-tile height calculation logic.' },
      { icon: 'DESIGN', title: 'Design systems that need self-aligning nested components', desc: 'A reusable Card component in a component library can be authored once, ignorant of its siblings, and still visually align when repeated in a grid — because the alignment responsibility moves to the CSS relationship between parent and subgridded child, not to the component\'s own internal logic.' },
      { icon: 'LEARN', title: 'Teaching the difference between nested grids and subgrid', desc: 'This side-by-side toggle is built specifically to make the "ragged vs aligned" distinction visible in real time, which is otherwise a subtle, easy-to-miss CSS Grid Level 2 concept that most developers only discover after hitting the alignment problem in production.' },
      { icon: 'CODE', title: 'Replacing JavaScript row-height synchronization utilities', desc: 'Older solutions to this alignment problem (like jQuery matchHeight plugins or ResizeObserver-based height-syncing scripts) recalculated and forced equal heights via JS on every resize, adding runtime cost and layout thrashing. Subgrid achieves the same visual result with zero JavaScript and correctly recomputes on resize as part of normal layout, not a separate reflow pass.' },
      { icon: 'APP', title: 'Multi-column form layouts with aligned labels and inputs', desc: 'A form repeated as several side-by-side field groups (e.g. billing and shipping address blocks) can use subgrid so label rows and input rows align vertically between the two groups even when one group has a longer label, improving visual rhythm without manual width or height tweaks.' },
      { icon: 'CODE', title: 'Related: Feature Spotlight Tabs', desc: 'See the [Feature Spotlight Tabs](/ui-snippets/feature-spotlight-tabs/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between a nested grid and a subgrid?', a: 'A plain nested grid (display: grid on a grid item) creates entirely new, independent row and column tracks scoped to that element\'s own children — its sizing has no relationship to the parent grid. A subgrid (grid-template-rows: subgrid or grid-template-columns: subgrid) instead reuses the ancestor grid\'s existing tracks for the axis you specify, so sizing is computed jointly across all elements that share those tracks, which is what produces cross-sibling alignment.' },
      { q: 'Why does .product-card need grid-row: span 3 for subgrid to work?', a: 'Subgrid inherits tracks from whatever span of parent tracks the element itself occupies as a grid item. If a card only spans 1 row track by default, there is nothing for grid-template-rows: subgrid to meaningfully divide — you need to explicitly span the number of parent row tracks (3, in this demo: image, title, price) that you want the card\'s own children to align against.' },
      { q: 'Is CSS subgrid supported in all modern browsers in 2026?', a: 'Yes for practical purposes — subgrid has been supported in Firefox since version 71 (2019), Safari since 16 (2022), and Chrome/Edge since 117 (2023), giving it full coverage across evergreen browsers well before 2025. Projects needing to support older Chromium versions (116 and below) should wrap subgrid usage in an @supports (grid-template-rows: subgrid) feature query with an independent-grid fallback.' },
      { q: 'Can I use subgrid for columns as well as rows?', a: 'Yes — grid-template-columns: subgrid works identically for the column axis, and you can apply subgrid to both axes at once on the same element if it spans both parent row and column tracks. A common pattern is column-only subgrid for aligning form labels and inputs across repeated field groups, with normal independent row sizing.' },
      { q: 'Does subgrid inherit gap and alignment properties from the parent too?', a: 'By default, a subgridded axis inherits the parent\'s gap value for that axis unless you explicitly set a different gap on the subgrid itself, and named grid lines from the parent are also inherited and can be referenced by the subgridded element\'s own children. Alignment properties like justify-items and align-items are NOT automatically inherited and can still be set independently on the subgrid container.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why grid-row: span 3 is required before grid-template-rows: subgrid has any effect, and to walk through how the browser computes shared row-track heights across sibling cards once subgrid is applied. You could also ask it to extend the demo to subgrid the column axis as well, or to add an @supports feature-detection fallback with a visibly different independent-grid layout for browsers that don't support subgrid. It's a good target for asking about practical migration: how would you retrofit an existing non-subgrid card grid component in a real codebase to use this technique without breaking existing markup?`,
      prompt: `Build an interactive HTML/CSS/JS demo comparing CSS subgrid to independent nested grids using a row of product cards.

Requirements:
- An outer parent element using display: grid with a fixed number of columns (e.g. 4, responsive down to 2 on smaller screens) containing several card items with deliberately varying content lengths (at least one card must have a noticeably longer title than the others, to expose misalignment).
- Each card is itself display: grid with 3 internal rows (an image/icon row, a title row, and a price-plus-button row) and uses grid-row: span 3 so it occupies 3 of the parent's row tracks.
- A toggle switch that adds/removes a modifier class on the parent grid, switching every card's own grid-template-rows between subgrid (aligned to parent tracks, computed jointly across all cards) and a normal independent auto auto auto (each card sized purely by its own content) — using real CSS subgrid syntax, not a simulated visual effect.
- In independent mode, the layout must visibly show rows failing to align across cards (e.g. price rows land at different vertical positions) so the problem subgrid solves is obvious; in subgrid mode, all rows must align perfectly across every card in the same grid row.
- A small text panel or label that updates to show the literal grid-template-rows value currently applied, so the mechanism is never hidden behind only a visual change.
- Keep the markup for individual cards identical in both modes — only a class on the parent grid should change, proving the alignment behavior is purely a CSS toggle, not different markup.
- Use a neutral palette with a single accent color and smooth transitions where changing state, and make the layout responsive at a reasonable breakpoint.`,
    },
  },
};

export default cssSubgridDemo;
