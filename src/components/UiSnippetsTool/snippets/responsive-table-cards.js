const responsiveTableCards = {
  id: 'responsive-table-cards',
  title: 'Responsive Table to Cards',
  category: 'tables',
  html: `<table class="rtable">
  <thead>
    <tr>
      <th>Employee</th>
      <th>Department</th>
      <th>Role</th>
      <th>Status</th>
      <th>Salary</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Employee">Maria Chen</td>
      <td data-label="Department">Engineering</td>
      <td data-label="Role">Senior Developer</td>
      <td data-label="Status"><span class="badge active">Active</span></td>
      <td data-label="Salary">$118,000</td>
    </tr>
    <tr>
      <td data-label="Employee">James Okafor</td>
      <td data-label="Department">Design</td>
      <td data-label="Role">Product Designer</td>
      <td data-label="Status"><span class="badge active">Active</span></td>
      <td data-label="Salary">$96,500</td>
    </tr>
    <tr>
      <td data-label="Employee">Priya Nair</td>
      <td data-label="Department">Marketing</td>
      <td data-label="Role">Growth Lead</td>
      <td data-label="Status"><span class="badge leave">On Leave</span></td>
      <td data-label="Salary">$88,200</td>
    </tr>
    <tr>
      <td data-label="Employee">Tom Fischer</td>
      <td data-label="Department">Sales</td>
      <td data-label="Role">Account Executive</td>
      <td data-label="Status"><span class="badge active">Active</span></td>
      <td data-label="Salary">$74,000</td>
    </tr>
  </tbody>
</table>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; margin: 0; }

.rtable {
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.rtable thead th {
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #64748b;
  background: #f1f5f9;
  padding: 12px 16px;
  font-weight: 600;
}

.rtable tbody td {
  padding: 14px 16px;
  font-size: 14px;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
}
.rtable tbody tr:last-child td { border-bottom: none; }
.rtable tbody tr:hover { background: #f8fafc; }

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
.badge.active { background: #dcfce7; color: #166534; }
.badge.leave { background: #fef3c7; color: #92400e; }

/*
  Below 640px the table itself is hidden and each row is rendered as a
  standalone card instead. The data-label attribute on every <td> is
  surfaced as a pseudo-header using the CSS attr() function inside a
  ::before pseudo-element, so no duplicate label markup is needed.
*/
@media (max-width: 640px) {
  .rtable thead { display: none; }

  .rtable, .rtable tbody, .rtable tr, .rtable td {
    display: block;
    width: 100%;
  }

  .rtable tr {
    margin-bottom: 12px;
    border-radius: 10px;
    border: 1px solid #e2e8f0;
    overflow: hidden;
  }
  .rtable tr:last-child { margin-bottom: 0; }

  .rtable td {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: right;
    border-bottom: 1px solid #f1f5f9;
    padding: 10px 14px;
  }
  .rtable tr td:last-child { border-bottom: none; }

  .rtable td::before {
    content: attr(data-label);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.03em;
    color: #94a3b8;
    text-align: left;
  }
}`,
  js: `// No JavaScript is required — the table-to-card transformation is
// achieved purely with a CSS media query and the attr() function
// reading each cell's data-label attribute.`,

  seo: {
    title: 'Responsive Table to Cards — Free HTML CSS Mobile Table Snippet',
    description: 'A data table that collapses into stacked cards on mobile using pure CSS and the attr() function to surface data-label attributes as pseudo-headers.',
    about: {
      title: 'Responsive Table to Cards — CSS-Only Mobile Table Snippet',
      description: `HTML tables are the right structure for tabular data, but they're notoriously bad on narrow screens — either they overflow horizontally or every column gets crushed unreadably thin. A common, elegant fix is to keep the semantic \`<table>\` markup for desktop and re-render each row as a self-contained "card" on mobile, with each cell's value paired with its own label.

This snippet does exactly that using **pure CSS — no JavaScript at all**.

**How the desktop table works**

On wider screens, this is a completely ordinary HTML table: \`<thead>\` with column headers, \`<tbody>\` with data rows, striped hover states, and a status badge. Nothing unusual.

**How the mobile collapse works**

Inside a \`@media (max-width: 640px)\` block, every table-related element is forced to \`display: block\`: the table, its body, each row, and each cell. This breaks the table out of its grid layout entirely — \`<thead>\` is hidden outright since column headers make no sense once there's no grid to label — and each \`<tr>\` becomes its own bordered, rounded "card" stacked vertically.

**How the pseudo-header labels work**

The clever part is what replaces the missing column headers. Every \`<td>\` in the HTML already carries a \`data-label\` attribute matching its column name, e.g. \`<td data-label="Department">Engineering</td>\`. Inside the mobile media query, a \`::before\` pseudo-element on every \`td\` uses \`content: attr(data-label)\` to pull that attribute's value and render it as text — no duplicate label markup, no JavaScript to inject text nodes. Each cell is then laid out with \`display: flex; justify-content: space-between\`, so the generated label sits on the left and the actual cell value sits on the right, like a mobile settings row.

**Why data-label instead of a JS-based transform**

Because the label text lives in an HTML attribute rather than being computed by JavaScript, this technique keeps working even if scripts are disabled, degrades gracefully, and requires zero runtime cost — the browser's own CSS engine does the entire transformation via a single media query breakpoint.

**Choosing the breakpoint**

640px is used here because it comfortably fits five columns' worth of stacked rows on a typical phone screen. Adjust the breakpoint to match wherever your specific table's columns actually start feeling cramped in your own layout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Responsive Table to Cards" in the sidebar Library tab. The preview shows a normal employee table.' },
        { title: 'Switch to the Mobile device preview', text: 'Click the Mobile (375px) device button above the preview to see the table collapse into stacked cards with visible field labels.' },
        { title: 'Check the data-label attributes', text: 'In the HTML panel, confirm every <td> has a data-label matching its column header — this is what powers the mobile labels.' },
        { title: 'Add a new column', text: 'Add a new <th> in the header row and a matching <td data-label="..."> in every row — the mobile card layout picks it up automatically.' },
        { title: 'Adjust the breakpoint', text: 'In the CSS panel, change the max-width value in the @media query to match where your own table starts feeling cramped.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Pure CSS solution — zero JavaScript required for the table-to-card transformation',
      'Uses the CSS attr() function inside a ::before pseudo-element to render data-label as text',
      'Same semantic <table> markup serves both the desktop table and mobile card layouts',
      'thead is hidden entirely on mobile since there is no grid left for it to label',
      'Each row becomes a bordered, rounded card with flexbox-aligned label/value rows',
      'Status badges and other rich cell content continue to render correctly inside cards',
      'Single configurable breakpoint controls exactly when the collapse happens',
      'Degrades gracefully with scripting disabled since no JS drives the transformation',
      'Works with any number of columns or rows without any markup duplication',
      'No framework, no responsive table library, no build step required',
    ],
    useCases: [
      { icon: 'TABLE', title: 'Admin dashboards and back-office tools', desc: 'Keep dense employee, order, or inventory tables usable on tablets and phones without building a separate mobile layout by hand.' },
      { icon: 'LEARN', title: 'Learn the attr() pseudo-header technique', desc: 'Study how data-label attributes paired with a ::before pseudo-element eliminate the need for duplicate label markup or JavaScript.' },
      { icon: 'FLOW', title: 'Prototype data-heavy mobile views', desc: 'Drop this into any prototype involving tabular data — pricing plans, comparison tables, reports — that also needs to work on narrow screens.' },
      { icon: 'DESIGN', title: 'Match your card and badge styling', desc: 'Adjust the card border, spacing, and badge colors in the CSS panel to fit your existing design system.' },
      { icon: 'ACCESS', title: 'Preserve semantic table structure', desc: 'Because the underlying markup stays a real <table>, screen readers and assistive tools retain full row/column semantics even though the visual layout changes.' },
      { icon: 'CODE', title: 'Apply the pattern to any existing table', desc: 'Add data-label attributes to any table you already have and drop in the same media query to make it responsive with no other markup changes.' },
      { icon: 'CODE', title: 'Related: Table Column Visibility Toggle Menu', desc: 'See the [Table Column Visibility Toggle Menu](/ui-snippets/table-column-visibility-toggle/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this require any JavaScript?', a: 'No. The entire table-to-card transformation happens with a single CSS media query and the attr() function — there is no JavaScript in this snippet at all.' },
      { q: 'How do the mobile card labels get their text?', a: 'Every <td> has a data-label attribute matching its column, such as data-label="Department". A ::before pseudo-element inside the mobile media query uses content: attr(data-label) to render that attribute\'s value as visible text, positioned to the left of the actual cell value.' },
      { q: 'Why is <thead> hidden on mobile?', a: 'Once every table element is forced to display: block, there is no longer a tabular grid for the column headers to label — the headers would just appear as an orphaned row above the stacked cards, so thead is hidden entirely and each cell gets its own inline label instead.' },
      { q: 'Can I add a new column without breaking the mobile layout?', a: 'Yes. Add a new <th> to the header row and a matching <td data-label="Your Column"> to every row in the body — the CSS reads the data-label dynamically, so no additional CSS or JavaScript changes are needed to support the new column.' },
      { q: 'How do I change the breakpoint where the table collapses?', a: 'Edit the max-width value in the @media (max-width: 640px) rule in the CSS panel to whatever pixel width matches when your specific table starts feeling too cramped for its column count.' },
      { q: 'Does this technique preserve accessibility?', a: 'Yes, largely — the underlying markup remains a real <table> with <th> and <td> elements, so screen readers still understand the row and column relationships even though the visual presentation changes with CSS alone.' },
      { q: 'Can rich content like badges or icons still appear inside the mobile cards?', a: 'Yes. Any HTML inside a <td> — badges, icons, links, buttons — renders exactly as normal on the right side of its flex row; only the layout direction changes, not the cell content itself.' },
      { q: 'Is this approach better than horizontally scrolling the table on mobile?', a: 'It depends on the use case. Horizontal scroll preserves the exact table shape but requires users to scroll sideways to read later columns; the card collapse shown here reads top-to-bottom naturally on a phone but takes more vertical space per row. For wide tables with many columns, cards are usually the more mobile-friendly choice.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain exactly how the CSS attr() function reads the data-label attribute inside the ::before pseudo-element, and why this specific transformation needs every table-related element forced to display: block rather than just changing the table's own display property. It's also worth asking the assistant to help apply this exact pattern to a different table you already have in your codebase — describe your table's columns and ask it to generate the matching data-label attributes and confirm the media query breakpoint makes sense for your content's actual character lengths.`,
      prompt: `Build a responsive HTML table that renders as a normal table on desktop and collapses into stacked "cards" on mobile — pure CSS only, no JavaScript.

Requirements:
- A standard semantic <table> with <thead>, <tbody>, multiple columns, and at least one cell per row containing rich content (such as a colored status badge), not just plain text.
- Every <td> must carry a data-label attribute exactly matching its column's header text.
- Inside a single @media (max-width: ...) query, force the table, tbody, tr, and td elements all to display: block, and hide the thead entirely, so the table breaks out of its grid layout and each row becomes an independently stacked block.
- Inside that same media query, give each td a ::before pseudo-element with content: attr(data-label) to render the column name as a label pulled directly from the data-label attribute — do not duplicate the label text anywhere else in the markup or in JavaScript.
- Lay out each mobile td as a flex row with the generated label on the left and the actual cell value right-aligned on the right, and wrap each tr in a bordered, rounded card style with spacing between cards.
- The solution must scale to any number of columns or rows without any JavaScript and without duplicating label text outside the data-label attributes.`,
    },
  },
};

export default responsiveTableCards;
