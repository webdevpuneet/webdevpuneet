const expandableRowDetailTable = {
  id: 'expandable-row-detail-table',
  title: 'Expandable Row Detail Table',
  lastmod: '2026-08-27',
  category: 'tables',
  html: `<div class="demo">
  <table class="detail-table" id="detailTable">
    <thead>
      <tr>
        <th class="th-toggle"></th>
        <th>Order</th>
        <th>Customer</th>
        <th>Total</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr class="row-main" data-row="1" aria-expanded="false">
        <td><button class="row-toggle" aria-label="Expand order #1042 details"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></button></td>
        <td>#1042</td>
        <td>Maya Chen</td>
        <td>$128.00</td>
        <td><span class="badge shipped">Shipped</span></td>
      </tr>
      <tr class="row-detail" data-detail-for="1" hidden>
        <td colspan="5">
          <div class="detail-panel">
            <div class="detail-items">
              <div class="detail-item"><span>2× Wireless Mouse</span><span>$59.98</span></div>
              <div class="detail-item"><span>1× USB-C Hub</span><span>$45.50</span></div>
              <div class="detail-item"><span>Shipping</span><span>$22.52</span></div>
            </div>
            <div class="detail-meta">
              <span>Tracking: <strong>1Z999AA10123456784</strong></span>
              <span>Shipped Aug 24, 2026</span>
            </div>
          </div>
        </td>
      </tr>

      <tr class="row-main" data-row="2" aria-expanded="false">
        <td><button class="row-toggle" aria-label="Expand order #1043 details"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></button></td>
        <td>#1043</td>
        <td>Rahul Patel</td>
        <td>$64.25</td>
        <td><span class="badge processing">Processing</span></td>
      </tr>
      <tr class="row-detail" data-detail-for="2" hidden>
        <td colspan="5">
          <div class="detail-panel">
            <div class="detail-items">
              <div class="detail-item"><span>1× Webcam 1080p</span><span>$54.25</span></div>
              <div class="detail-item"><span>Shipping</span><span>$10.00</span></div>
            </div>
            <div class="detail-meta">
              <span>Awaiting warehouse pickup</span>
              <span>Placed Aug 26, 2026</span>
            </div>
          </div>
        </td>
      </tr>

      <tr class="row-main" data-row="3" aria-expanded="false">
        <td><button class="row-toggle" aria-label="Expand order #1044 details"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="m9 6 6 6-6 6"/></svg></button></td>
        <td>#1044</td>
        <td>Ines Fischer</td>
        <td>$212.40</td>
        <td><span class="badge delivered">Delivered</span></td>
      </tr>
      <tr class="row-detail" data-detail-for="3" hidden>
        <td colspan="5">
          <div class="detail-panel">
            <div class="detail-items">
              <div class="detail-item"><span>1× Mechanical Keyboard</span><span>$189.00</span></div>
              <div class="detail-item"><span>Shipping</span><span>$23.40</span></div>
            </div>
            <div class="detail-meta">
              <span>Delivered to front door</span>
              <span>Aug 20, 2026</span>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.detail-table { width: 520px; max-width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; font-size: 13px; }
.detail-table th { text-align: left; padding: 11px 12px; background: #f8fafc; color: #64748b; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #e2e8f0; }
.th-toggle { width: 36px; }
.detail-table td { padding: 12px; color: #1f2937; border-bottom: 1px solid #f1f5f9; }

.row-toggle { width: 24px; height: 24px; border: none; background: #f1f5f9; border-radius: 6px; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: transform 0.2s, background 0.15s; }
.row-toggle:hover { background: #e2e8f0; }
.row-main[aria-expanded="true"] .row-toggle { transform: rotate(90deg); background: #eef2ff; color: #4338ca; }
.row-main[aria-expanded="true"] { background: #f8fafc; }

.badge { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.badge.shipped { background: #e0e7ff; color: #4338ca; }
.badge.processing { background: #fef3c7; color: #92400e; }
.badge.delivered { background: #dcfce7; color: #15803d; }

.row-detail td { padding: 0; border-bottom: 1px solid #f1f5f9; }
.detail-panel { background: #f8fafc; padding: 14px 18px 16px 46px; display: flex; flex-direction: column; gap: 10px; }
.detail-items { display: flex; flex-direction: column; gap: 6px; }
.detail-item { display: flex; justify-content: space-between; font-size: 12px; color: #475569; }
.detail-item:last-child { font-weight: 700; color: #334155; padding-top: 6px; border-top: 1px dashed #e2e8f0; }
.detail-meta { display: flex; justify-content: space-between; font-size: 11px; color: #94a3b8; font-weight: 600; }`,
  js: `const table = document.getElementById('detailTable');

table.addEventListener('click', (e) => {
  const toggle = e.target.closest('.row-toggle');
  if (!toggle) return;

  const mainRow = toggle.closest('.row-main');
  const rowId = mainRow.dataset.row;
  const detailRow = table.querySelector(\`.row-detail[data-detail-for="\${rowId}"]\`);
  const isExpanded = mainRow.getAttribute('aria-expanded') === 'true';

  mainRow.setAttribute('aria-expanded', String(!isExpanded));
  detailRow.hidden = isExpanded;
  toggle.setAttribute('aria-label', toggle.getAttribute('aria-label').replace(isExpanded ? 'Collapse' : 'Expand', isExpanded ? 'Expand' : 'Collapse'));
});

// Also allow clicking anywhere on the main row (except the toggle itself,
// which already has its own handler above) to expand/collapse it.
table.querySelectorAll('.row-main').forEach((row) => {
  row.addEventListener('click', (e) => {
    if (e.target.closest('.row-toggle')) return;
    row.querySelector('.row-toggle').click();
  });
  row.style.cursor = 'pointer';
});`,
  seo: {
    title: 'Expandable Row Detail Table — Accordion Rows for Order/Record Line Items',
    description: 'A data table where clicking any row expands an inline detail panel beneath it showing line items and metadata, built with real aria-expanded state and a shared toggle handler.',
    about: {
      title: 'Expandable Row Detail Table — Inline Drill-Down Without a Modal',
      description: `Showing every order's full line-item breakdown directly in a table would make it unreadable; hiding that detail behind a separate page or modal adds friction for a quick check. This pattern splits the difference: each row's detail is a **second, adjacent table row** that stays hidden until the user expands it, keeping the list scannable by default while making full detail one click away, in place, with no navigation.

**Two rows per record, connected by a data attribute, not DOM adjacency alone**

Each record is actually two \`<tr>\` elements — a \`.row-main\` summary row and a \`.row-detail\` row directly beneath it containing a single full-width \`<td colspan="5">\` with the detail content inside. They're linked by matching \`data-row\`/\`data-detail-for\` values rather than assumed adjacency, so the toggle logic — \`table.querySelector(\`.row-detail[data-detail-for="\${rowId}"]\`)\` — finds the correct detail row explicitly even if the table's structure changes, rather than relying on fragile "next sibling" DOM traversal that would break if anything were inserted between them.

**aria-expanded on the row itself, not just a visual class**

\`.row-main\` carries \`aria-expanded="true"/"false"\` directly, toggled in the same click handler that shows/hides the detail row — giving assistive technology accurate, real-time information about which rows are currently expanded, matching how a native disclosure widget should behave, rather than relying purely on a CSS class a screen reader has no way to interpret.

**hidden attribute, not just CSS display, for the detail row**

The collapsed detail row uses the native \`hidden\` boolean attribute rather than a CSS class toggling \`display: none\` — functionally similar for visual rendering, but \`hidden\` is the semantically correct HTML mechanism for "this content is not currently relevant," and it means the detail row is guaranteed to be excluded from things like browser find-in-page and the accessibility tree without any additional CSS needing to account for it.

**Whole-row click as a convenience, not a replacement for the toggle button**

Beyond the dedicated toggle button, clicking anywhere else on a \`.row-main\` row also triggers the same expand/collapse by simply calling \`.click()\` on that row's own toggle button — reusing the exact same code path rather than duplicating the expand logic, so there is only one real implementation of "toggle this row" that both interaction methods funnel through.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Pair every summary row with a matching detail row', text: 'Give both rows the same identifier via data-row on the .row-main and data-detail-for on its .row-detail.' },
        { title: 'Keep the detail row hidden by default', text: 'Add the hidden attribute (not a CSS class) to every .row-detail on initial render.' },
        { title: 'Set colspan to match your column count', text: 'The detail row\'s single <td> needs colspan equal to the number of columns in your table header for the panel to span full width.' },
        { title: 'Customize the detail panel content freely', text: 'Anything can go inside .detail-panel — line items, metadata, even a small nested table or action buttons.' },
        { title: 'Add or remove rows dynamically', text: 'Since the click handler is delegated on the table itself, any new .row-main/.row-detail pair added later works immediately with no extra listener wiring.' },
      ],
    },
    features: [
      'Detail rows linked to their summary row via explicit data attributes, not fragile DOM-adjacency assumptions',
      'Real aria-expanded state on the summary row kept in sync with the detail row\'s visibility on every toggle',
      'Native hidden attribute used for the collapsed state, not just a CSS display:none class',
      'Delegated click handling on the table means dynamically added rows work without additional listener setup',
      'Whole-row click reuses the same toggle button\'s click handler rather than duplicating the expand logic',
      'Rotating chevron icon gives a clear, animated visual affordance for expanded/collapsed state',
      'aria-label on the toggle button dynamically updates between "Expand" and "Collapse" wording',
      'Full-width detail panel supports any content — line items, metadata, nested tables, or actions',
    ],
    useCases: [
      { icon: 'COMMERCE', title: 'Order Management Tables', desc: 'Show order summaries in a compact list with full line-item breakdown available inline on demand.' },
      { icon: 'ADMIN', title: 'Admin Record Lists', desc: 'Any admin table listing records that have more detail than fits in a summary row (users, transactions, tickets).' },
      { icon: 'FINANCE', title: 'Transaction / Invoice Tables', desc: 'Expand a transaction row to show its line items, fees, and metadata without leaving the list view.' },
      { icon: 'LOGS', title: 'Audit / Activity Log Tables', desc: 'Keep a log summary compact while making full event detail available inline per entry.' },
      { icon: 'CODE', title: 'Related: Responsive Table to Cards', desc: 'See the [Responsive Table to Cards](/ui-snippets/responsive-table-cards/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the toggle logic find the correct detail row for a given summary row?', a: 'Each summary row has a data-row identifier and its matching detail row has a data-detail-for attribute with the same value; the click handler looks up the detail row explicitly via that attribute match rather than assuming it\'s always the very next sibling in the DOM.' },
      { q: 'Why use the hidden attribute instead of a CSS class for collapsing detail rows?', a: 'hidden is the semantically correct native HTML mechanism for content that isn\'t currently relevant — it\'s automatically excluded from the accessibility tree and browser find-in-page without requiring any CSS rule, unlike a custom class that only has meaning because a stylesheet happens to define display:none for it.' },
      { q: 'Does clicking anywhere on a row expand it, or only the toggle button?', a: 'Both — clicking anywhere on a .row-main row (except directly on the toggle button, which has its own handler) programmatically clicks that row\'s toggle button, so the whole row is a convenient click target while the actual expand/collapse logic exists in exactly one place.' },
      { q: 'Do newly added rows (e.g. loaded via pagination) need their own click listeners?', a: 'No — the click listener is delegated on the table element itself using event bubbling and .closest(), so any new .row-main/.row-toggle pairs added to the table later work immediately without additional JavaScript wiring.' },
      { q: 'How is the colspan on the detail row determined?', a: 'It must be set manually to match the number of columns in your table header — in this demo that\'s 5 (toggle, order, customer, total, status) — so the detail panel visually spans the table\'s full width rather than only one column.' },
      { q: 'Is the expand/collapse state accessible to screen reader users?', a: 'Yes — the summary row carries a live aria-expanded attribute reflecting its actual current state, and the toggle button\'s aria-label text switches between "Expand" and "Collapse" wording, both updated in the same handler that shows or hides the detail row.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why linking summary and detail rows via explicit data attributes is more robust than relying on the detail row always being the "next sibling" in the DOM, and what could break if that assumption were made instead. It's also worth asking for a version that only allows one row to be expanded at a time (accordion-exclusive behavior), or one that lazy-loads a row's detail content via a fetch call the first time it's expanded rather than rendering it all upfront.`,
      prompt: `Build an expandable-row data table in HTML, CSS and vanilla JavaScript where clicking a row reveals a full-width detail panel beneath it — no external libraries.

Requirements:
- A table where each data record is represented by two adjacent table rows: a compact summary row and a hidden detail row containing a single full-width cell with expanded content (e.g. line items and metadata).
- Link each summary row to its corresponding detail row using explicit matching data attributes (not by assuming DOM adjacency), so the toggle logic looks up the correct detail row by that identifier.
- Use the native hidden attribute (not a CSS display:none class) to control the detail row's collapsed state.
- Implement the expand/collapse toggle using a single delegated click listener on the table itself, so rows added to the table later work without needing additional listener setup.
- Keep the summary row's aria-expanded attribute and the toggle button's aria-label text in sync with the actual expanded/collapsed state at all times.
- Make the entire summary row clickable to expand/collapse it (not just a small toggle icon), while still keeping only one real implementation of the toggle logic that both interaction paths share.`,
    },
  },
};

export default expandableRowDetailTable;
