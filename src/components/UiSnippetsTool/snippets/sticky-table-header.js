const stickyTableHeader = {
  id: 'sticky-table-header',
  title: 'Sticky Table Header',
  category: 'tables',
  html: `<div class="table-scroll">
  <table class="sticky-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer</th>
        <th>Product</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      <tr><td>#10245</td><td>Aisha Bello</td><td>Wireless Mouse</td><td>$24.00</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10246</td><td>Marco Silva</td><td>Mechanical Keyboard</td><td>$89.00</td><td><span class="badge pending">Pending</span></td></tr>
      <tr><td>#10247</td><td>Lena Ivanova</td><td>USB-C Hub</td><td>$34.50</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10248</td><td>Kenji Watanabe</td><td>27" Monitor</td><td>$249.00</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10249</td><td>Sofia Rossi</td><td>Laptop Stand</td><td>$42.00</td><td><span class="badge cancelled">Cancelled</span></td></tr>
      <tr><td>#10250</td><td>Noah Becker</td><td>Webcam 1080p</td><td>$56.00</td><td><span class="badge pending">Pending</span></td></tr>
      <tr><td>#10251</td><td>Grace Kim</td><td>Desk Lamp</td><td>$29.00</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10252</td><td>Ahmed Farouk</td><td>Noise Cancelling Headset</td><td>$120.00</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10253</td><td>Elena Petrova</td><td>Ergonomic Chair</td><td>$310.00</td><td><span class="badge pending">Pending</span></td></tr>
      <tr><td>#10254</td><td>Diego Fernandez</td><td>Portable SSD 1TB</td><td>$99.00</td><td><span class="badge shipped">Shipped</span></td></tr>
      <tr><td>#10255</td><td>Fatima Zahra</td><td>Bluetooth Speaker</td><td>$45.00</td><td><span class="badge cancelled">Cancelled</span></td></tr>
      <tr><td>#10256</td><td>Liam O'Connor</td><td>Graphics Tablet</td><td>$180.00</td><td><span class="badge shipped">Shipped</span></td></tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; margin: 0; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.table-scroll {
  max-width: 640px;
  max-height: 320px;
  overflow-y: auto;
  margin: 0 auto;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.sticky-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

/*
  position: sticky combined with top: 0 keeps the header row pinned to
  the top of the scrolling .table-scroll container. It needs an opaque
  background of its own, otherwise the scrolling body rows would show
  through beneath it while it's pinned.
*/
.sticky-table thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #f1f5f9;
  text-align: left;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: #64748b;
  font-weight: 600;
  padding: 12px 16px;
  border-bottom: 1px solid #e2e8f0;
}

.sticky-table tbody td {
  padding: 12px 16px;
  color: #1e293b;
  border-bottom: 1px solid #f1f5f9;
}
.sticky-table tbody tr:last-child td { border-bottom: none; }
.sticky-table tbody tr:hover { background: #f8fafc; }

.badge {
  display: inline-block;
  font-size: 11px;
  font-weight: 700;
  padding: 3px 10px;
  border-radius: 999px;
}
.badge.shipped { background: #dcfce7; color: #166534; }
.badge.pending { background: #fef3c7; color: #92400e; }
.badge.cancelled { background: #fee2e2; color: #991b1b; }`,
  js: `// No JavaScript is required. position: sticky is a native CSS layout
// mode — the header pins itself to the top of its nearest scrolling
// ancestor (.table-scroll) automatically as the body scrolls beneath it.`,

  seo: {
    title: 'Sticky Table Header — Free HTML CSS Scrollable Table Snippet',
    description: 'A scrollable table whose header row stays pinned to the top using CSS position: sticky while the body scrolls beneath it. No JavaScript needed.',
    about: {
      title: 'Sticky Table Header — CSS position: sticky Scrollable Table',
      description: `Long data tables — order lists, transaction histories, leaderboards — become hard to read once you scroll past the header row and lose track of which column is which. The fix is a table header that stays pinned in place while the rows beneath it keep scrolling, and modern CSS can do this with a single property: \`position: sticky\`.

This snippet builds a scrollable table with a pinned header using **pure CSS — no JavaScript, no scroll event listeners**.

**How the sticky header works**

The table lives inside a \`.table-scroll\` container with a fixed \`max-height\` and \`overflow-y: auto\`, which makes it the scrolling context for everything inside it. Every \`<th>\` in the \`<thead>\` gets \`position: sticky; top: 0\`. Sticky positioning behaves like \`relative\` until the element would scroll past the specified offset (\`top: 0\` here), at which point it "sticks" and behaves like \`position: fixed\` *relative to its scrolling ancestor* — in this case, \`.table-scroll\` rather than the whole page. As the \`<tbody>\` rows scroll upward inside the container, the header row simply never leaves the top of the visible area.

**Why the header needs its own background**

Sticky elements don't automatically get an opaque backdrop — without one, the scrolling body rows would visually show through and overlap the header text as they pass beneath it. Setting \`background: #f1f5f9\` on every sticky \`<th>\` (not just the \`<thead>\` as a whole, since some browsers don't propagate background through to sticky children reliably) keeps the header fully opaque against the scrolling content behind it.

**Why z-index is set**

A small \`z-index: 1\` ensures the sticky header renders above the table body's rows in the stacking order, which matters if any body content (like a border or hover background) would otherwise visually compete with the header at the boundary where they meet.

**Sticky vs. fixed vs. JavaScript scroll listeners**

Before \`position: sticky\` had solid browser support, this effect required either a duplicated header element repositioned with JavaScript on scroll, or a fixed-position header requiring careful width syncing with the underlying table. \`position: sticky\` avoids both — it's declarative, has no JavaScript scroll listener overhead, and the browser handles all position calculations natively and efficiently.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Sticky Table Header" in the sidebar Library tab. The preview shows a scrollable order table inside a fixed-height container.' },
        { title: 'Scroll inside the table', text: 'Scroll down within the table area in the preview and watch the header row stay pinned at the top while the order rows scroll beneath it.' },
        { title: 'Adjust the scroll container height', text: 'In the CSS panel, change max-height on .table-scroll to control how many rows are visible before scrolling kicks in.' },
        { title: 'Add more rows', text: 'In the HTML panel, add more <tr> rows to the tbody — the sticky header behavior applies automatically with no other changes.' },
        { title: 'Restyle the header', text: 'In the CSS panel, update the background and text color on .sticky-table thead th to match your brand, keeping it opaque.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Pure CSS solution using position: sticky — zero JavaScript or scroll listeners',
      'Header pins relative to its own scrolling container, not the whole page',
      'Opaque background on every sticky th prevents body rows from showing through',
      'z-index ensures the header renders above scrolling body content at the boundary',
      'Works with any number of rows or columns without additional markup or script changes',
      'Configurable max-height on the scroll container controls how many rows show before scrolling',
      'Hover states and status badges continue to render normally inside the scrolling body',
      'No layout thrashing or reflow cost since the browser handles sticky positioning natively',
      'Degrades gracefully to a normal static header in browsers without sticky support',
      'No framework, no virtualized table library, no build step required',
    ],
    useCases: [
      { icon: 'TABLE', title: 'Order and transaction history tables', desc: 'Keep column headers visible while users scroll through long lists of orders, transactions, or logs inside a fixed-height panel.' },
      { icon: 'LEARN', title: 'Learn position: sticky in a real layout', desc: 'Study how sticky positioning resolves relative to its nearest scrolling ancestor rather than the viewport, and why an opaque background is required.' },
      { icon: 'FLOW', title: 'Prototype dashboard data panels', desc: 'Drop this into an admin dashboard prototype where a compact scrollable table needs to stay readable without taking over the whole page height.' },
      { icon: 'DESIGN', title: 'Match your table\'s visual style', desc: 'Adjust the header background, badge colors, and row hover state in the CSS panel to fit your existing design system.' },
      { icon: 'ACCESS', title: 'Keep tables usable at any content length', desc: 'A pinned header keeps long tables navigable for users scanning many rows, reducing the need to scroll back up to check a column\'s meaning.' },
      { icon: 'CODE', title: 'Combine with a sticky first column', desc: 'Extend the same sticky technique to the first column (position: sticky; left: 0) to pin both the header row and an identifying column simultaneously.' },
      { icon: 'CODE', title: 'Related: Table Export with Column Selector — Choose Exactly What Gets Exported', desc: 'See the [Table Export with Column Selector — Choose Exactly What Gets Exported](/ui-snippets/table-export-column-selector/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this require JavaScript or a scroll event listener?', a: 'No. position: sticky is a native CSS layout mode. The browser automatically keeps the header pinned to the top of its scrolling container as the user scrolls — there is no JavaScript involved anywhere in this snippet.' },
      { q: 'Why does the header need its own background color?', a: 'Sticky elements don\'t automatically render an opaque backdrop. Without a background set directly on the sticky th elements, the scrolling body rows underneath would visually bleed through the header text as they pass beneath it.' },
      { q: 'Why does the header stick to the table container instead of the whole page?', a: 'position: sticky resolves relative to the nearest ancestor with a scrolling overflow context. Because .table-scroll has overflow-y: auto and a fixed max-height, it becomes that scrolling context, and the header sticks within its bounds rather than sticking to the browser viewport.' },
      { q: 'Can I make the whole page scroll instead of a fixed-height container?', a: 'Yes. Remove the max-height and overflow-y: auto from .table-scroll so the table scrolls with the page itself — the sticky header will then pin to the top of the browser viewport instead of a boxed container.' },
      { q: 'Can I also pin the first column while scrolling horizontally?', a: 'Yes. Apply position: sticky; left: 0 to the first column\'s th and td elements (with their own background color), and it will remain pinned to the left edge while the table scrolls horizontally, independent of the vertical header stickiness.' },
      { q: 'Does position: sticky work in all modern browsers?', a: 'Yes, it has solid support in all current major browsers. In very old browsers without support, the header simply behaves like a normal static row and scrolls away with the rest of the table — a safe, non-breaking fallback.' },
      { q: 'How do I control how many rows are visible before scrolling starts?', a: 'Adjust the max-height value on .table-scroll in the CSS panel — a larger value shows more rows before the container starts scrolling, a smaller value shows fewer.' },
      { q: 'Will the sticky header work correctly with a very wide table that also scrolls horizontally?', a: 'Yes, as long as overflow-x and overflow-y are both handled on the same scrolling container — the sticky top offset continues to apply independently of horizontal scroll position.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML and CSS to an AI coding assistant like Claude and ask it to explain precisely why position: sticky resolves against .table-scroll rather than the browser viewport, and why the opaque background has to live on the individual th elements rather than on thead itself for the pinned effect to look correct while rows scroll underneath. It's also a good snippet to extend with the assistant's help — ask it to add a sticky first column for pinning both an identifying row and the header simultaneously, or to add a subtle box-shadow beneath the sticky header that only appears once the table has actually been scrolled, giving users a clearer visual cue that content is hidden above.`,
      prompt: `Build a scrollable data table with a header row that stays pinned to the top while the body scrolls beneath it, using plain HTML and CSS only — no JavaScript, no scroll event listeners.

Requirements:
- A table wrapped in a container with a fixed max-height and overflow-y: auto, so the container itself becomes the scrolling context for the table.
- Apply position: sticky and top: 0 to every header cell (not the thead element as a whole) so the header row remains visible at the top of the scrolling container regardless of how far the body has scrolled.
- Give the sticky header cells their own opaque background color so that scrolling body rows never visually show through or overlap the header text as they pass beneath it.
- Set an appropriate z-index on the sticky header cells so they render above the table body content at the boundary where they meet.
- The table body should contain at least ten rows of realistic tabular data with a status badge or similarly styled inline element in at least one column, to verify the sticky effect works correctly with rich cell content.
- The solution must not use any JavaScript at all — the entire sticky behavior must come from CSS position: sticky.`,
    },
  },
};

export default stickyTableHeader;
