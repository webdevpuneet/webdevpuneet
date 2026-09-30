const bootstrapPricingComparisonTable = {
  id: 'bootstrap-pricing-comparison-table',
  title: 'Bootstrap Pricing Feature Comparison Table',
  lastmod: '2026-09-09',
  category: 'pricing',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <h1 class="text-center bscmp-title mb-4">Compare plans</h1>
  <div class="table-responsive">
    <table class="table bscmp-table align-middle text-center">
      <thead>
        <tr>
          <th class="text-start">Feature</th>
          <th>Starter</th>
          <th class="bscmp-featured">Pro</th>
          <th>Team</th>
        </tr>
      </thead>
      <tbody>
        <tr><td class="text-start">Projects</td><td>1</td><td class="bscmp-featured">Unlimited</td><td class="bscmp-featured">Unlimited</td></tr>
        <tr><td class="text-start">Storage</td><td>1 GB</td><td class="bscmp-featured">100 GB</td><td class="bscmp-featured">1 TB</td></tr>
        <tr><td class="text-start">Team members</td><td>1</td><td class="bscmp-featured">5</td><td class="bscmp-featured">Unlimited</td></tr>
        <tr><td class="text-start">Priority support</td><td>—</td><td class="bscmp-featured">✓</td><td class="bscmp-featured">✓</td></tr>
        <tr><td class="text-start">SSO &amp; audit log</td><td>—</td><td>—</td><td class="bscmp-featured">✓</td></tr>
        <tr><td class="text-start">API access</td><td>—</td><td class="bscmp-featured">✓</td><td class="bscmp-featured">✓</td></tr>
        <tr><td class="text-start fw-bold">Price</td><td>$0/mo</td><td class="bscmp-featured fw-bold">$24/mo</td><td class="bscmp-featured fw-bold">$79/mo</td></tr>
        <tr><td></td><td><button class="btn btn-sm btn-outline-dark">Choose</button></td><td class="bscmp-featured"><button class="btn btn-sm btn-dark">Choose</button></td><td class="bscmp-featured"><button class="btn btn-sm btn-outline-dark">Choose</button></td></tr>
      </tbody>
    </table>
  </div>
</div>`,
  css: `.bscmp-title { font-weight: 800; letter-spacing: -0.01em; }
.bscmp-table th, .bscmp-table td { border-color: #eceef1; }
.bscmp-table thead th { font-size: 13px; text-transform: uppercase; letter-spacing: .04em; color: #6b7280; border-bottom-width: 2px; }
.bscmp-featured { background: #f8f9ff; }
.bscmp-table thead .bscmp-featured { color: #4338ca; font-weight: 700; }`,
  js: `// Purely presentational — the featured "Pro" column is styled via the
// .bscmp-featured class already applied to every cell in that column. No
// JavaScript is needed for this snippet; it's included to keep the file
// shape consistent across the Bootstrap collection.`,

  seo: {
    title: 'Bootstrap Pricing Feature Comparison Table — Free Snippet',
    description: 'A real Bootstrap 5.3 responsive table comparing three plans feature-by-feature, with the recommended plan\'s whole column visually highlighted.',
    about: {
      title: 'Bootstrap Pricing Feature Comparison Table — HTML, CSS & JavaScript',
      description: `Three pricing cards side by side answer "what does each plan cost" — a **table** answers the harder question, "what exactly do I lose by picking the cheaper one." This snippet builds that comparison on **real Bootstrap 5.3**'s \`.table\` component wrapped in \`.table-responsive\`, so a wide feature comparison scrolls horizontally on a narrow screen instead of breaking the layout.\n\nEvery cell in the recommended "Pro" column — including its header — carries a shared \`.bscmp-featured\` class, giving that entire column a distinct tint and bolder header without needing per-row logic; adding a new feature row just means adding three plain \`<td>\`s and one \`.bscmp-featured\` one, and the highlight stays consistent automatically.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a 4-column feature comparison table.' },
        { title: 'Scan the Pro column', text: 'It\'s tinted and its header is bolded, drawing the eye toward the recommended plan.' },
        { title: 'Shrink the preview width', text: 'The table scrolls horizontally within its own container rather than breaking the page layout.' },
        { title: 'Add a feature row', text: 'Copy a <tr> in the HTML panel, adding a fourth <td class="bscmp-featured"> for whichever column(s) should stay highlighted.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 table component wrapped in table-responsive for horizontal scroll on narrow screens',
      'Recommended plan\'s entire column highlighted via one shared CSS class on every cell in it',
      'Clear ✓/— convention for feature availability, scannable at a glance',
      'CTA buttons embedded directly in the table\'s final row, one per plan',
      'Adding a feature row or a fourth plan column needs no changes to the highlight logic',
      'Sticky, uppercase header row styled distinctly from the data rows',
    ],
    useCases: [
      { icon: 'MONEY', title: 'SaaS pricing pages with meaningfully different tiers', desc: 'When plans differ on several specific features (not just price), a comparison table communicates that far better than repeating bullet lists across three cards.' },
      { icon: 'LEARN', title: 'Learning responsive table patterns', desc: 'A clean example of table-responsive solving horizontal overflow without any custom media queries.' },
      { icon: 'CODE',  title: 'Feature-gated product tiers', desc: 'Any product with tiered feature access — API limits, seats, storage — benefits from a scannable feature-by-feature table.' },
      { icon: 'DESIGN', title: 'Pairing with the pricing-card snippets', desc: 'Use the card-based Bootstrap Pricing Table snippet above the fold for the emotional pitch, and this table below it for detail-seekers.' },
    ],
    faqs: [
      { q: 'Is this a real Bootstrap table?', a: 'Yes — the actual .table component from Bootstrap 5.3, wrapped in .table-responsive so it scrolls horizontally on narrow screens instead of squeezing or breaking.' },
      { q: 'How is the recommended plan\'s column highlighted?', a: 'Every cell in that column, including its header, carries a shared .bscmp-featured class giving it a light background tint; the header additionally gets bold, accent-colored text.' },
      { q: 'How do I add a fourth plan?', a: 'Add a new <th> to the header row and a new <td> to every feature row (plus the price and CTA rows), keeping the same column order across every row.' },
      { q: 'Does this replace the pricing cards, or work alongside them?', a: 'It\'s meant to complement card-based pricing, not replace it — cards communicate the emotional pitch and headline price quickly, while a table answers detailed feature questions for a more deliberate buyer.' },
      { q: 'Are the Choose buttons wired to anything?', a: 'They\'re plain Bootstrap buttons with no handler attached in this demo — wire them to your real signup or checkout flow, matching each button to its column\'s plan.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a sticky first column (feature names) so they stay visible while horizontally scrolling on mobile, or to add tooltips on feature names explaining what each one means. It's also a good exercise to ask the assistant to make the table collapse into stacked cards on mobile instead of scrolling horizontally.`,
      prompt: `Build a Bootstrap 5.3 pricing feature comparison table, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap table (wrapped in table-responsive) comparing at least three pricing plans across at least six feature rows, using a checkmark or dash convention for boolean features and real values for numeric ones (e.g. storage, seats).
- One plan's entire column (header included) must be visually highlighted via a single shared CSS class applied to every cell in that column, not per-cell inline styling.
- Include a final row with a CTA button per plan.
- The table must scroll horizontally within its own container on narrow screens without breaking the surrounding page layout.`,
    },
  },
};

export default bootstrapPricingComparisonTable;
