const pricingCompareMatrixGrid = {
  id: 'pricing-compare-matrix-grid',
  title: 'Dense Feature Comparison Matrix',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="cmg-wrap">
  <div class="cmg-intro">
    <h2>Compare every plan, every feature</h2>
    <p>Scroll down and across — the feature column and the plan header both stay pinned.</p>
  </div>
  <div class="cmg-scroll" id="cmgScroll">
    <table class="cmg-table">
      <thead>
        <tr>
          <th class="cmg-corner">Feature</th>
          <th>Free</th>
          <th class="cmg-featured">Starter</th>
          <th>Business</th>
          <th>Enterprise</th>
        </tr>
      </thead>
      <tbody>
        <tr><th scope="row">Projects</th><td>3</td><td class="cmg-featured">25</td><td>Unlimited</td><td>Unlimited</td></tr>
        <tr><th scope="row">Team members</th><td>1</td><td class="cmg-featured">5</td><td>25</td><td>Unlimited</td></tr>
        <tr><th scope="row">Storage</th><td>1 GB</td><td class="cmg-featured">50 GB</td><td>500 GB</td><td>Custom</td></tr>
        <tr><th scope="row">API access</th><td class="cmg-dash">—</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">API rate limit</th><td class="cmg-dash">—</td><td class="cmg-featured">60 req/min</td><td>600 req/min</td><td>Custom</td></tr>
        <tr><th scope="row">SSO / SAML</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">Audit logs</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">Role-based permissions</th><td class="cmg-dash">—</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">Custom domains</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td class="cmg-check">✓</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">Uptime SLA</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td>99.9%</td><td>99.99%</td></tr>
        <tr><th scope="row">Support</th><td>Community</td><td class="cmg-featured">Email</td><td>Priority</td><td>Dedicated CSM</td></tr>
        <tr><th scope="row">Onboarding</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td>Guided setup</td><td>White-glove</td></tr>
        <tr><th scope="row">SOC 2 report</th><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td class="cmg-dash">—</td><td class="cmg-check">✓</td></tr>
        <tr><th scope="row">Monthly price</th><td>$0</td><td class="cmg-featured">$29</td><td>$99</td><td>Custom</td></tr>
      </tbody>
    </table>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d14;min-height:100vh;padding:40px 20px}
.cmg-wrap{max-width:820px;margin:0 auto}
.cmg-intro{margin-bottom:16px}
.cmg-intro h2{font-size:19px;font-weight:800;color:#f4f7fb}
.cmg-intro p{font-size:13px;color:#8b96ab;margin-top:6px}
.cmg-scroll{max-height:420px;overflow:auto;border:1px solid #232d42;border-radius:14px;background:#0d1220}
.cmg-table{border-collapse:separate;border-spacing:0;min-width:640px;width:100%;font-size:13px}
.cmg-table th,.cmg-table td{padding:12px 16px;text-align:center;white-space:nowrap;border-bottom:1px solid #1c2536;border-right:1px solid #1c2536}
.cmg-table thead th{background:#141b2c;color:#f4f7fb;font-weight:800;font-size:12.5px;position:sticky;top:0;z-index:2;border-bottom:2px solid #2a3654}
.cmg-table thead th.cmg-featured{color:#7dd3fc}
.cmg-table .cmg-corner{position:sticky;top:0;left:0;z-index:3;text-align:left;background:#141b2c}
.cmg-table tbody th{position:sticky;left:0;z-index:1;background:#111827;text-align:left;color:#c3cbdb;font-weight:700;font-size:12.5px}
.cmg-table tbody td{color:#9aa5bd;font-variant-numeric:tabular-nums}
.cmg-table tbody tr:nth-child(even) td:not(.cmg-featured),
.cmg-table tbody tr:nth-child(even) th{background:#0f1524}
.cmg-table td.cmg-featured{background:rgba(125,211,252,.08);color:#7dd3fc;font-weight:700}
.cmg-check{color:#34d399;font-weight:800}
.cmg-dash{color:#3f4a63}
.cmg-table tbody tr:last-child th,.cmg-table tbody tr:last-child td{border-bottom:none}
.cmg-table thead th:last-child,.cmg-table tbody td:last-child{border-right:none}`,

  js: `// No JS is required for the sticky-both-axes behavior itself — it is
// pure CSS (position: sticky on both the header row and the first
// column, with the corner cell using both top and left simultaneously).
// This script only adds a small enhancement: highlight the row under
// the pointer so it's easier to track a feature across many columns
// while scrolling a wide, dense matrix.
const scroller = document.getElementById('cmgScroll');
const rows = scroller.querySelectorAll('tbody tr');

rows.forEach((row) => {
  row.addEventListener('mouseenter', () => {
    row.querySelectorAll('th, td').forEach((cell) => {
      cell.dataset.prevBg = cell.style.background || '';
      if (!cell.classList.contains('cmg-featured')) {
        cell.style.background = '#182238';
      }
    });
  });
  row.addEventListener('mouseleave', () => {
    row.querySelectorAll('th, td').forEach((cell) => {
      cell.style.background = cell.dataset.prevBg || '';
    });
  });
});`,

  seo: {
    title: 'Dense Feature Comparison Matrix — Sticky Rows & Columns, No Library',
    description: 'A 4-plan by 14-row plan comparison table with a genuinely sticky header row AND sticky first column at the same time, using pure CSS position: sticky.',
    about: {
      title: 'Dense Feature Comparison Matrix — Sticky Header Row AND Sticky First Column, Together',
      description: `A comparison table with four or more plans and a dozen-plus feature rows is too big to fit on screen at once, which normally forces a visitor to scroll and lose track of which row or which plan column they were even looking at. This snippet solves both problems simultaneously with pure CSS \`position: sticky\` — the plan header row stays pinned while scrolling down, the feature-name column stays pinned while scrolling right, and the top-left corner cell stays pinned in both directions at once, genuinely, not just one axis dressed up to look like both.

**Why sticky-both-axes is harder than it looks**

Making a header row sticky (\`position: sticky; top: 0\`) is common and well-documented. Making a *first column* sticky (\`position: sticky; left: 0\`) on its own is also common. Doing **both at the same time**, correctly, requires getting three separate rules right together — miss any one and either the corner cell scrolls away with the header, or the first-column cells overlap the header incorrectly, or z-index fighting makes cells render behind each other during scroll:

1. Every \`thead th\` gets \`position: sticky; top: 0\` so the whole header row pins to the top of the scroll container.
2. Every \`tbody th\` (the first-column feature-name cells) gets \`position: sticky; left: 0\` so the whole first column pins to the left.
3. The single corner cell — \`.cmg-corner\`, the top-left \`th\` in \`thead\` — gets **both** \`top: 0\` and \`left: 0\` simultaneously, plus the highest \`z-index\` of the three layers, so it stays fixed in both directions and always renders above the header row scrolling underneath it and the first column scrolling underneath it.

**The z-index layering that makes it actually work**

Without careful z-index ordering, sticky cells render in DOM order as they scroll under each other, producing visible seams or the wrong cell on top. This snippet layers it explicitly: the corner cell at \`z-index: 3\` (highest, since it overlaps both other sticky layers), the header row at \`z-index: 2\`, the first column at \`z-index: 1\`, and ordinary body cells at the default stacking level. Each sticky cell also needs its own explicit \`background\`, since a transparent sticky cell lets the scrolling content behind it show through — an easy, common mistake that makes "sticky" cells look broken even when the positioning itself is correct.

**\`border-collapse: separate\`, not \`collapse\`**

Sticky positioning on table cells is unreliable with \`border-collapse: collapse\` in some browser rendering engines, because collapsed borders are shared between adjacent cells in ways that interact awkwardly with sticky's own layout calculations. This table uses \`border-collapse: separate; border-spacing: 0\` and draws borders manually via \`border-bottom\`/\`border-right\` on individual cells instead, which keeps the sticky behavior consistent and predictable across browsers.

**A real 4×14 matrix, not a toy example**

Four plans (Free, Starter, Business, Enterprise) across 14 feature rows — from project and team limits through SSO, audit logs, uptime SLA, and monthly price — is dense enough that sticky-both-axes genuinely matters; a small 2×4 table wouldn't demonstrate the problem this pattern solves. The scroll container is capped with \`max-height\` and \`overflow: auto\`, so both scrolling axes are real, not simulated.

**Customizing it**

Add rows or columns freely — the sticky rules apply by element type (\`thead th\`, \`tbody th\`, \`.cmg-corner\`), not by index, so the layout keeps working at any size. Pair it with [pricing feature table](/ui-snippets/pricing-feature-table/) for a simpler, non-scrolling variant, or [comparison table](/ui-snippets/comparison-table/) for a general-purpose base.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Scroll down inside the table', text: 'The Feature/plan header row stays pinned to the top.' },
      { title: 'Scroll right inside the table', text: 'The feature-name column stays pinned to the left.' },
      { title: 'Scroll diagonally', text: 'The corner cell stays fixed in both directions simultaneously.' },
      { title: 'Hover a row', text: 'A lightweight highlight helps track a feature across many columns.' },
      { title: 'Add a plan column', text: 'Add a th to the header and a matching td to every row — sticky rules apply automatically.' },
      { title: 'Add a feature row', text: 'Add a tr with a tbody th first cell — it inherits the sticky first-column rule.' },
    ] },
    features: [
      { title: 'Genuinely both-axes sticky', text: 'Header row and first column stay pinned at the same time.' },
      { title: 'Correct z-index layering', text: 'Corner above header above first column above body cells.' },
      { title: 'border-collapse: separate', text: 'Avoids collapsed-border sticky rendering bugs.' },
      { title: '4 plans × 14 feature rows', text: 'Dense enough to actually need the pattern.' },
      { title: 'Semantic table markup', text: 'scope="row" row headers keep it screen-reader friendly.' },
      { title: 'Featured-plan column styling', text: 'A highlighted Starter column draws the eye.' },
      { title: 'Zebra striping', text: 'Alternating row backgrounds aid horizontal scanning.' },
      { title: 'Row-hover highlight', text: 'Small JS enhancement to track a row while scrolling.' },
    ],
    useCases: [
      { title: 'Dense SaaS plan comparisons', text: 'Offer a dense alternative to a [pricing feature table](/ui-snippets/pricing-feature-table/), with four plans and fourteen rows where header row and first column both stay pinned at once.' },
      { title: 'Enterprise sales collateral', text: 'Compare against [enterprise pricing](/ui-snippets/enterprise-pricing/) tiers in a document buyers can scroll without losing track of which plan or feature row they are reading.' },
      { title: 'Product specification sheets', text: 'Present any large row-by-column technical comparison, using `border-collapse: separate` to avoid the sticky rendering bugs that collapsed borders can cause.' },
      { title: 'Competitor comparison pages', text: 'Extend the plan columns to include competitors, with a correct z-index order of corner above header above first column above body cells.' },
      { title: 'Admin dashboards and API tier docs', text: 'Reuse the sticky-both-axes pattern for internal data grids, or compare plan and API tier limits at a glance in documentation.' },
      { icon: 'CODE', title: 'Related: Commitment Length Discount Ladder', desc: 'See the [Commitment Length Discount Ladder](/ui-snippets/pricing-commitment-discount-ladder/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the sticky-both-axes behavior actually work, or is only one direction really sticky?', a: 'Both axes genuinely work at once. thead th cells use position: sticky with top: 0 (sticky vertically), tbody th cells use position: sticky with left: 0 (sticky horizontally), and the single corner cell — the top-left th — uses both top: 0 and left: 0 together with the highest z-index of the three layers, so it stays fixed in both directions simultaneously as you scroll diagonally.' },
      { q: 'Why does the corner cell need a higher z-index than the header row or first column?', a: 'As you scroll, the corner cell sits at the intersection where the sticky header row and the sticky first column would otherwise overlap each other. Without the corner having the highest z-index, whichever layer comes later in the DOM would render on top during scroll, causing the corner cell to visually disappear under the header or the first column instead of staying correctly on top of both.' },
      { q: 'Why use border-collapse: separate instead of collapse?', a: 'position: sticky on table cells behaves unreliably in some browsers when combined with border-collapse: collapse, because collapsed borders are shared between adjacent cells in a way that can interfere with sticky\'s positioning calculations. Using border-collapse: separate with border-spacing: 0, and drawing borders manually on individual cells, avoids that class of bug entirely.' },
      { q: 'Why do sticky cells need an explicit background color?', a: 'A sticky cell without its own background is transparent, so as the rest of the table scrolls underneath it, that scrolling content shows through the "pinned" cell — which looks broken even though the positioning itself is technically correct. Every sticky cell in this table sets an explicit background so it visually occludes whatever scrolls beneath it.' },
      { q: 'Will adding more rows or columns break the sticky behavior?', a: 'No — the sticky rules are written against element types (thead th, tbody th, and the .cmg-corner class) rather than specific row or column indices, so adding a new plan column (a th plus a matching td in every row) or a new feature row (a tr with a tbody th first cell) automatically inherits the correct sticky behavior with no other changes needed.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly why the corner cell needs both top and left sticky positioning plus the highest z-index of the three sticky layers, and why border-collapse: separate is used instead of collapse. It's also a good candidate to extend — ask it to add a "pin this column" feature letting a visitor sticky an arbitrary plan column for direct comparison, make the table keyboard-navigable with arrow keys, or convert it to a responsive card-per-plan layout below a breakpoint where the sticky matrix stops making sense on narrow screens.`,
      prompt: `Build a dense plan comparison table in plain HTML, CSS, and JavaScript with no dependencies, where BOTH the header row (plan names) AND the first column (feature names) stay visibly pinned while scrolling — genuinely on both axes at the same time, not just one axis.

Requirements:
- At least 4 plan columns and at least 10 feature rows (aim for real density: limits, boolean features shown as check/dash, and price rows), inside a scroll container with a fixed max-height and overflow: auto so both vertical and horizontal scrolling are real, not simulated.
- Use position: sticky with top: 0 on every header cell (thead th) so the entire header row pins to the top of the scroll container while scrolling down.
- Use position: sticky with left: 0 on every first-column cell (a tbody th per row, ideally with scope="row" for accessibility) so the entire feature-name column pins to the left while scrolling right.
- The single top-left corner header cell must use position: sticky with BOTH top: 0 and left: 0 set simultaneously, and must have a higher z-index than the rest of the header row and the rest of the first column, so it stays fixed in both directions at once and renders above the other two sticky layers during a diagonal scroll — verify this actually works by reasoning through what happens at each z-index layer during scroll before finalizing the CSS.
- Use border-collapse: separate with border-spacing: 0 instead of border-collapse: collapse, and draw cell borders individually, to avoid known sticky-positioning rendering issues with collapsed table borders.
- Give every sticky cell an explicit, non-transparent background color so scrolling content does not visibly show through it.
- Style one plan column as "featured" or "recommended" to draw attention, and add zebra-striping to body rows for horizontal scannability.`,
    },
  },
};

export default pricingCompareMatrixGrid;
