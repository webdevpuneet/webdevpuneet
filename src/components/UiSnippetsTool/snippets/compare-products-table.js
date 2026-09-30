const compareProductsTable = {
  id: 'compare-products-table',
  title: 'Compare Products Table',
  category: 'tables',
  html: `<div class="compare-wrap" id="compareWrap">
  <table class="compare-table">
    <thead>
      <tr>
        <th class="feature-col">Feature</th>
        <th class="product-col" data-product="1">
          <button class="remove-btn" onclick="removeProduct(1)" aria-label="Remove Starter plan">&times;</button>
          <div class="product-name">Starter</div>
          <div class="product-price">$9/mo</div>
        </th>
        <th class="product-col" data-product="2">
          <button class="remove-btn" onclick="removeProduct(2)" aria-label="Remove Pro plan">&times;</button>
          <div class="product-name">Pro</div>
          <div class="product-price">$29/mo</div>
        </th>
        <th class="product-col" data-product="3">
          <button class="remove-btn" onclick="removeProduct(3)" aria-label="Remove Enterprise plan">&times;</button>
          <div class="product-name">Enterprise</div>
          <div class="product-price">$99/mo</div>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr><td>Users included</td><td data-product="1">3</td><td data-product="2">10</td><td data-product="3">Unlimited</td></tr>
      <tr><td>Storage</td><td data-product="1">5 GB</td><td data-product="2">100 GB</td><td data-product="3">2 TB</td></tr>
      <tr><td>Priority support</td><td data-product="1">✕</td><td data-product="2">✓</td><td data-product="3">✓</td></tr>
      <tr><td>API access</td><td data-product="1">✕</td><td data-product="2">✓</td><td data-product="3">✓</td></tr>
      <tr><td>Custom SLA</td><td data-product="1">✕</td><td data-product="2">✕</td><td data-product="3">✓</td></tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; }

.compare-wrap { overflow-x: auto; }

.compare-table {
  width: 100%;
  min-width: 480px;
  border-collapse: collapse;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(15,23,42,0.06);
}

.feature-col {
  text-align: left;
  padding: 14px 16px;
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  border-bottom: 1px solid #e2e8f0;
  width: 30%;
}

.product-col {
  position: relative;
  text-align: center;
  padding: 20px 16px 14px;
  border-bottom: 1px solid #e2e8f0;
  border-left: 1px solid #f1f5f9;
  transition: opacity 0.2s, transform 0.2s;
}
.product-col.removing { opacity: 0; transform: scale(0.9); }

.remove-btn {
  position: absolute;
  top: 6px;
  right: 8px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: none;
  background: #f1f5f9;
  color: #94a3b8;
  font-size: 14px;
  line-height: 1;
  cursor: pointer;
}
.remove-btn:hover { background: #fee2e2; color: #ef4444; }

.product-name { font-size: 15px; font-weight: 700; color: #1e293b; }
.product-price { font-size: 13px; color: #6366f1; font-weight: 600; margin-top: 2px; }

tbody td { padding: 12px 16px; font-size: 13px; color: #475569; text-align: center; border-bottom: 1px solid #f1f5f9; border-left: 1px solid #f1f5f9; }
tbody td:first-child { text-align: left; color: #1e293b; font-weight: 500; border-left: none; }
tbody tr:last-child td { border-bottom: none; }`,
  js: `function removeProduct(id) {
  const cells = document.querySelectorAll('[data-product="' + id + '"]');
  cells.forEach(cell => cell.classList.add('removing'));

  setTimeout(() => {
    cells.forEach(cell => cell.remove());
  }, 200);
}`,

  seo: {
    title: 'Compare Products Table — Free HTML CSS JS Product Comparison Snippet',
    description: 'An e-commerce product comparison table with per-product remove buttons, feature rows, and a smooth fade-out removal animation. Vanilla JS, no dependencies.',
    about: {
      title: 'Compare Products Table — HTML, CSS & JavaScript Product Comparison Grid',
      description: `Comparison tables are a conversion-critical pattern on pricing and product pages — shoppers scan feature rows across a handful of columns to decide which plan or product fits. This snippet builds a three-column comparison table with a name/price header per product and a per-product remove (×) button, so users can narrow the comparison down as they decide.

**How columns are tied together with data-product**

Every cell belonging to a given product — its header cell and every row's value cell — carries a matching \`data-product="1"\` (or 2, 3) attribute. This is the same "attribute as source of truth" approach used elsewhere in this snippet library: there's no JavaScript array mapping products to columns, the DOM attribute *is* the mapping.

**How removing a product works**

Clicking the × button calls \`removeProduct(id)\`, which uses \`document.querySelectorAll('[data-product="' + id + '"]')\` to select every cell across the entire table — header and every body row — that belongs to that product, in one query. It adds a \`.removing\` class to all of them simultaneously, which triggers a CSS \`opacity\`/\`transform: scale(0.9)\` transition. After a \`setTimeout\` matching the CSS transition duration (200ms), the cells are actually removed from the DOM with \`.remove()\`. Removing the cells (rather than just hiding them) automatically causes the browser's native table layout algorithm to redistribute the remaining columns' widths — no manual width recalculation needed.

**Why the fade happens before the DOM removal**

If \`.remove()\` were called immediately on click, the column would vanish instantly with a jarring layout jump. Deferring the actual removal until after the fade transition has time to play gives the user visual feedback that their action registered, then a clean, expected reflow once the fade completes.

**Responsive handling**

The table sits inside a \`.compare-wrap\` with \`overflow-x: auto\` and the table itself has a \`min-width\`, so on narrow viewports the table scrolls horizontally rather than squeezing columns unreadably thin — a far more usable pattern for data tables than trying to force a comparison grid into a phone-width viewport.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Compare Products Table" in the sidebar Library tab to load the three-column comparison table.' },
        { title: 'Remove a product column', text: 'Click the × button in any product header in the preview and watch the fade-out before the column collapses.' },
        { title: 'Add feature rows', text: 'Add a new <tr> in the HTML panel with a label cell and one data-product cell per column.' },
        { title: 'Add a fourth product', text: 'Add a new <th data-product="4"> in the header and a matching <td data-product="4"> in every row, plus its own remove button.' },
        { title: 'Style the value symbols', text: 'Replace the ✓/✕ text with styled SVG icons in the CSS/HTML panels if you want colored check and cross marks.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this comparison layout for a new pricing page.' },
      ],
    },
    features: [
      'data-product attributes tie every header and row cell for a column together with no JS mapping array',
      'One removeProduct(id) call fades and removes an entire column across every row in a single query',
      'Fade-then-remove sequencing avoids a jarring instant layout jump when a column is dropped',
      'Native table layout reflows remaining columns automatically once cells are actually removed',
      'Horizontal scroll container keeps the table usable on narrow/mobile viewports without squeezing text',
      'Clear visual hierarchy: uppercase feature labels, bold product names, accent-colored prices',
      'Accessible remove buttons with descriptive aria-label text naming the specific plan',
      'Zero dependencies — pure HTML table markup, CSS, and about ten lines of JavaScript',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce product comparison pages', desc: 'Let shoppers compare specs across several products and drop ones they\'ve ruled out as they narrow their choice.' },
      { icon: 'PRICE', title: 'SaaS pricing tier comparisons', desc: 'Show feature differences across pricing plans, exactly like the Starter/Pro/Enterprise demo included here.' },
      { icon: 'FLOW', title: 'Interactive shortlisting tools', desc: 'Use the remove-to-narrow interaction pattern in any tool where users compare several shortlisted options.' },
      { icon: 'LEARN', title: 'Learn attribute-driven table manipulation', desc: 'Study how a single data attribute lets one querySelectorAll call operate on an entire table column at once.' },
      { icon: 'DASH', title: 'Internal spec-comparison tools', desc: 'Reuse the pattern for comparing internal tool tiers, vendor contracts, or hardware specs side by side.' },
      { icon: 'CODE', title: 'Related: Consent Audit Log', desc: 'See the [Consent Audit Log](/ui-snippets/consent-audit-log/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Row Action Dropdown', desc: 'See the [Table with Row Action Dropdown](/ui-snippets/table-row-action-dropdown/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: CSV Paste-to-Populate Table', desc: 'See the [CSV Paste-to-Populate Table](/ui-snippets/table-csv-paste-populate/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Merged Row Groups (rowspan)', desc: 'See the [Table with Merged Row Groups (rowspan)](/ui-snippets/table-merged-row-groups/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does clicking one × button remove an entire column?', a: 'Every cell in that column — the header and every row\'s value cell — shares the same data-product attribute. removeProduct(id) selects all of them in one querySelectorAll call and removes them together.' },
      { q: 'Why is there a delay before the cells are actually removed from the DOM?', a: 'The removing class triggers a CSS fade/scale transition first. A setTimeout matching that transition\'s duration (200ms) waits for the animation to visually finish before calling .remove(), so the column disappears smoothly instead of jumping out instantly.' },
      { q: 'What happens to the table layout after a column is removed?', a: 'Because the cells are genuinely removed from the DOM (not just hidden), the browser\'s native table layout algorithm automatically redistributes the remaining columns to fill the available width — no manual recalculation is needed.' },
      { q: 'How do I add a fourth product column?', a: 'Add a new <th data-product="4"> with its own remove button, name, and price in the header row, then add a matching <td data-product="4"> cell with the right value in every existing <tr> in the body.' },
      { q: 'Can I compare more than a handful of features?', a: 'Yes — just add more <tr> rows. The table has no limit on row count; long tables will simply scroll vertically with the rest of the page.' },
      { q: 'How does this stay usable on mobile screens?', a: 'The table is wrapped in a container with overflow-x: auto and the table itself sets a min-width, so on narrow viewports the user scrolls horizontally to see all columns rather than the text being squeezed illegibly small.' },
      { q: 'Can I let users re-add a removed product?', a: 'The base version permanently removes the DOM cells. To support re-adding, keep a JS object of each product\'s full row data and, instead of calling .remove(), hide the column and offer an "Add back" control that re-creates the cells from that stored data.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why removeProduct defers the actual .remove() call behind a setTimeout instead of calling it immediately on click — the short answer is sequencing the visual fade before the layout-affecting DOM change, but it's worth having the assistant walk through what breaks if you skip that step. You can also ask it to make the removal reversible (undo via a stored snapshot of the removed column's data), or to highlight the row-by-row "best value" cell automatically based on which column has the most checkmarks.`,
      prompt: `Build a "compare products table" in plain HTML, CSS, and vanilla JavaScript for a pricing or e-commerce comparison page.

Requirements:
- A table with one feature-label column and three or more product columns, where the header row shows each product's name and price alongside a small round remove (×) button.
- Every cell belonging to a given product column — its header cell and its value cell in every feature row — must share a common data-product attribute value, so a single query can select the entire column.
- Clicking a remove button must select every cell sharing that data-product value in one querySelectorAll call, apply a CSS class that fades and slightly scales them down via transition, and only after that transition's duration has elapsed actually remove the cells from the DOM.
- Removing a column must let the browser's native table layout reflow the remaining columns to fill the freed width — do not manually recalculate column widths in JavaScript.
- The table must sit inside a horizontally scrollable container with a sensible min-width so it degrades gracefully on narrow/mobile viewports instead of squeezing text unreadably.
- Every remove button must have a descriptive aria-label naming the specific product it removes.`,
    },
  },
};

export default compareProductsTable;
