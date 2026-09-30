const featureComparisonMatrixTable = {
  id: 'feature-comparison-matrix-table',
  title: 'Feature Comparison Matrix Table',
  category: 'pricing',
  html: `<div class="matrix-wrap">
  <table class="matrix">
    <thead>
      <tr>
        <th class="feature-col">Features</th>
        <th>Starter</th>
        <th class="recommended">Pro <span class="rec-badge">Recommended</span></th>
        <th>Business</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="feature-col">Projects</td>
        <td>1</td>
        <td class="recommended">Unlimited</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <td class="feature-col">Team members</td>
        <td>1</td>
        <td class="recommended">Up to 10</td>
        <td>Unlimited</td>
      </tr>
      <tr>
        <td class="feature-col">Analytics dashboard</td>
        <td class="cell-icon no"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon yes recommended"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
        <td class="cell-icon yes"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
      </tr>
      <tr>
        <td class="feature-col">Priority support</td>
        <td class="cell-icon no"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon yes recommended"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
        <td class="cell-icon yes"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
      </tr>
      <tr>
        <td class="feature-col">SSO &amp; audit logs</td>
        <td class="cell-icon no"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon no recommended"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon yes"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
      </tr>
      <tr>
        <td class="feature-col">Dedicated account manager</td>
        <td class="cell-icon no"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon no recommended"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></td>
        <td class="cell-icon yes"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg></td>
      </tr>
      <tr>
        <td class="feature-col">Price</td>
        <td><strong>$9</strong>/mo</td>
        <td class="recommended"><strong>$29</strong>/mo</td>
        <td><strong>$79</strong>/mo</td>
      </tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.matrix-wrap {
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  overflow-x: auto;
  border-radius: 14px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
}

.matrix {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  font-size: 13.5px;
}

.matrix thead th {
  padding: 18px 16px;
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
  border-bottom: 2px solid #e2e8f0;
  position: relative;
}
.matrix thead th.feature-col { text-align: left; color: #94a3b8; font-weight: 600; font-size: 12px; text-transform: uppercase; letter-spacing: 0.03em; }

.rec-badge {
  display: block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #6366f1;
  margin-top: 4px;
}

/*
  Every cell in the recommended column shares the .recommended class,
  which gives the whole column a tinted background and a colored left
  and right border — visually singling it out as a continuous highlighted
  band running down the table.
*/
.matrix td.recommended,
.matrix th.recommended {
  background: #eef2ff;
  border-left: 2px solid #6366f1;
  border-right: 2px solid #6366f1;
}
.matrix thead th.recommended { border-top: 2px solid #6366f1; border-radius: 8px 8px 0 0; }

.matrix td, .matrix thead th:not(.feature-col) { text-align: center; }

.matrix td.feature-col {
  text-align: left;
  font-weight: 500;
  color: #334155;
}

.matrix tbody td {
  padding: 14px 16px;
  border-bottom: 1px solid #f1f5f9;
  color: #1e293b;
}
.matrix tbody tr:last-child td { border-bottom: none; padding-bottom: 20px; }
.matrix tbody tr:last-child td.recommended { border-radius: 0 0 8px 8px; }

.cell-icon svg { display: inline-block; vertical-align: middle; }
.cell-icon.yes { color: #16a34a; }
.cell-icon.no { color: #cbd5e1; }`,
  js: `// Fully static — no JavaScript needed. If plans/features come from a
  // CMS or config file, generate the same table structure dynamically,
  // for example:
  //
  // function renderRow(feature) {
  //   return \`<tr><td class="feature-col">\${feature.name}</td>\${
  //     feature.plans.map((included, i) =>
  //       \`<td class="cell-icon \${included ? 'yes' : 'no'} \${i === 1 ? 'recommended' : ''}">...\`
  //     ).join('')
  //   }</tr>\`;
  // }`,

  seo: {
    title: 'Feature Comparison Matrix Table — Free HTML CSS Pricing Table Snippet',
    description: 'A pricing feature comparison table with checkmark/x icons and a highlighted recommended plan column running the full height of the table.',
    about: {
      title: 'Feature Comparison Matrix Table — HTML & CSS Pricing Comparison',
      description: `When a pricing page has more than a couple of plans, a simple side-by-side card layout stops being enough — buyers need to compare specific features row by row across every plan. A feature comparison matrix solves this: plans become columns, features become rows, and each cell shows either a checkmark, an X, or a specific value like "Unlimited" or "Up to 10."

This snippet builds that matrix in **plain HTML and CSS**, with one plan visually called out as the recommended option.

**How the checkmark/x cells work**

Each boolean feature cell contains a small inline SVG — either a checkmark path or an X path — wrapped in a \`.cell-icon\` span with either a \`.yes\` or \`.no\` class. \`.yes\` colors the icon green, \`.no\` colors it a muted gray, so scanning down a column instantly shows which features that plan includes. For non-boolean features (like "Team members"), the cell just contains plain text — "1", "Up to 10", "Unlimited" — since a checkmark can't represent a variable value.

**How the recommended column highlight works**

Every single cell in the "Pro" column — its header, and every cell in every row below it — shares one \`.recommended\` class. That class applies a tinted background and colored left/right borders. Because the class is repeated down the entire column rather than applied once to a wrapping element, the highlight forms one continuous vertical band that reads clearly even though HTML tables have no native way to style "a column" as a single unit — CSS can only target table cells individually (or via the more limited \`<colgroup>\`/\`<col>\` elements, which can't set borders or many other properties reliably across browsers). Repeating the class on every cell is the standard, most reliable workaround.

**Rounding the highlighted column's corners**

The recommended column's header gets \`border-radius: 8px 8px 0 0\` and its last-row cell gets \`border-radius: 0 0 8px 8px\`, so the continuous highlighted band reads as one rounded "card" floating within the otherwise flat table — a detail that reinforces the column's separateness from its neighbors.

**Why use a table element at all instead of a CSS grid of cards**

A real \`<table>\` keeps the semantic row/column relationship intact — a screen reader can announce "Pro, Analytics dashboard: yes" correctly, and the browser's native table layout keeps every row's cells vertically aligned across columns automatically, which is exactly the alignment guarantee you want when comparing plans feature-by-feature.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Feature Comparison Matrix Table" in the sidebar Library tab to see a three-plan comparison table with the Pro column highlighted.' },
        { title: 'Scroll horizontally on narrow screens', text: 'Switch to the Mobile device preview — the table scrolls horizontally within its wrapper rather than squeezing columns unreadably thin.' },
        { title: 'Add a feature row', text: 'In the HTML panel, copy an existing <tr> and add a new feature name plus one cell per plan, remembering to add the recommended class to whichever cell falls under the highlighted plan.' },
        { title: 'Change which plan is recommended', text: 'Move the recommended class from the Pro column\'s header and cells to a different plan\'s corresponding header and cells throughout the table.' },
        { title: 'Restyle the highlight', text: 'In the CSS panel, adjust the background tint and border color on the .recommended selectors to match your brand accent.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Real semantic <table> markup keeps row/column relationships correct for screen readers',
      'Inline SVG checkmark and X icons need no icon font or external image request',
      'Recommended column highlighted as one continuous band by repeating a single class down every cell',
      'Rounded corners on the highlighted column\'s top and bottom cells make it read as a floating card',
      'Supports both boolean features (checkmark/x) and value features (plain text like "Unlimited")',
      'Horizontal scroll wrapper keeps the table usable on narrow screens without squeezing columns',
      'Sticky-friendly structure — easy to add a sticky first column or header row on top of this base',
      'Any number of feature rows or plan columns can be added with the same repeated markup pattern',
      'Clear visual hierarchy: feature column left-aligned and muted, plan columns centered and bold',
      'No framework, no pricing-table library, no build step required',
    ],
    useCases: [
      { icon: 'PRICING', title: 'SaaS and subscription pricing pages', desc: 'Let prospective customers compare exactly which features are included in each plan tier before choosing one to sign up for.' },
      { icon: 'LEARN', title: 'Learn the repeated-class column-highlight technique', desc: 'Study why highlighting an entire table column requires repeating a class on every cell, since CSS cannot directly select "a column" the way it can a row.' },
      { icon: 'FLOW', title: 'Prototype a plan comparison feature', desc: 'Drop this into a pricing page prototype to test which specific features (not just price) actually drive plan selection with real users.' },
      { icon: 'DESIGN', title: 'Match your brand\'s pricing page style', desc: 'Adjust the highlight color, badge copy, and icon colors to fit your product\'s existing pricing and design system.' },
      { icon: 'ACCESS', title: 'Keep comparison data screen-reader friendly', desc: 'Using a real table (rather than a grid of divs) ensures assistive technology correctly announces each feature-by-plan relationship.' },
      { icon: 'CODE', title: 'Generate the matrix from a config file', desc: 'Template this exact table structure from a features/plans config or CMS collection instead of hand-writing every row and cell.' },
      { icon: 'CODE', title: 'Related: Pricing Tier Recommender Quiz', desc: 'See the [Pricing Tier Recommender Quiz](/ui-snippets/pricing-tier-recommender/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing with Audience Segment Switcher', desc: 'See the [Pricing with Audience Segment Switcher](/ui-snippets/pricing-audience-segment-switcher/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Pricing Table with Collapsible Feature Categories', desc: 'See the [Pricing Table with Collapsible Feature Categories](/ui-snippets/pricing-feature-category-accordion/) for a related pricing pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Multi-Resource Usage Billing Simulator', desc: 'See the [Multi-Resource Usage Billing Simulator](/ui-snippets/pricing-multi-resource-usage-simulator/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is an entire column highlighted using only CSS?', a: 'CSS has no direct selector for "an entire table column" the way it does for rows. Instead, every cell that belongs to the highlighted column — its header and every row\'s cell in that position — shares one repeated .recommended class, which applies a consistent tinted background and border to each cell individually, forming what visually reads as one continuous highlighted band.' },
      { q: 'How do I move the highlight to a different plan?', a: 'Remove the recommended class from every cell currently in that column (the header and each row\'s corresponding <td>) and add it to the equivalent cells under the plan you want to highlight instead — the CSS rules apply automatically based on the class, with no other markup changes.' },
      { q: 'Can a feature row show a value instead of just a checkmark or X?', a: 'Yes. Rows like "Team members" simply put plain text inside the <td> instead of the cell-icon markup — "Unlimited", "Up to 10", or any other value works, since not every feature is a strict yes/no.' },
      { q: 'Why use a real HTML table instead of a CSS grid of divs?', a: 'A semantic <table> preserves the row/column relationships in a way screen readers understand natively, announcing something like "Pro, Analytics dashboard: yes" correctly. It also guarantees every row\'s cells align vertically across all columns automatically, which is the core requirement of a comparison matrix.' },
      { q: 'How does the table handle narrow mobile screens?', a: 'The table sits inside a .matrix-wrap container with overflow-x: auto, so on narrow screens the whole table becomes horizontally scrollable rather than squeezing its columns down to an unreadable width.' },
      { q: 'How do I add another feature row?', a: 'Copy an existing <tr> in the tbody, change the feature name in the first cell, and update each plan\'s cell to either the checkmark/x icon markup or a plain text value — remembering to keep the recommended class on whichever cell falls under the highlighted plan.' },
      { q: 'Can I add a sticky first column so feature names stay visible while scrolling horizontally on mobile?', a: 'Yes. Apply position: sticky; left: 0 with an opaque background to every .feature-col cell, similar to the technique used for a sticky table header, so the feature names remain visible as the plan columns scroll beneath them.' },
      { q: 'Are the checkmark and X icons accessible to screen readers?', a: 'The icons are decorative SVGs with no accessible text by default. For full accessibility, add a visually-hidden text node inside each cell (like "Included" or "Not included") alongside the icon, so screen reader users hear the actual meaning rather than nothing at all.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML and CSS to an AI coding assistant like Claude and ask it to explain why highlighting an entire table column in CSS requires repeating a single class on every cell in that column, rather than using a single selector the way you would highlight an entire row — and to review whether the <colgroup>/<col> alternative would work for your specific styling needs (it generally cannot set borders reliably, which is why the repeated-class approach is used here). It's also worth asking the assistant to help add proper accessible text alongside the decorative checkmark/x icons, and to generate the JavaScript template function that would render this exact table structure from a features/plans config object or CMS collection, so the comparison data can be maintained separately from the markup.`,
      prompt: `Build a pricing feature comparison table in plain HTML and CSS — no JavaScript required for the static version, no pricing-table library.

Requirements:
- A real semantic <table> with a header row listing plan names as columns and a first column listing feature names as rows, so the row/column relationships are correctly understood by assistive technology.
- Each boolean feature cell must show either a checkmark or an X using inline SVG icons (not an icon font), colored distinctly (e.g. green for included, muted gray for not included) via a shared class rather than one-off inline styles.
- At least one row must show a non-boolean value (such as a specific number or "Unlimited") instead of a checkmark, demonstrating the table supports both feature types.
- Exactly one plan column must be visually highlighted as "recommended" — every cell in that column, including its header, must share one repeated CSS class that gives the entire column a continuous tinted background and colored side borders, with rounded corners on the very top and very bottom cells of that column so it reads as a distinct floating card within the table.
- Wrap the table in a horizontally scrollable container so it remains usable on narrow mobile screens without squeezing columns unreadably thin.
- The markup pattern for one row must be simple and repeatable enough to be generated from a plans/features configuration object via a small template function.`,
    },
  },
};

export default featureComparisonMatrixTable;
