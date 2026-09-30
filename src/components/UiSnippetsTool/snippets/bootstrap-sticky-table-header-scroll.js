const bootstrapStickyTableHeaderScroll = {
  id: 'bootstrap-sticky-table-header-scroll',
  title: 'Bootstrap Sticky Table Header on Scroll',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bssticky-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Order history</h6>
      <div class="bssticky-scroll" id="bsstickyScroll">
        <table class="table table-sm mb-0">
          <thead>
            <tr>
              <th>Order</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody id="bsstickyBody"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>`,
  css: `.bssticky-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bssticky-scroll { max-height: 260px; overflow-y: auto; border: 1px solid #eceef1; border-radius: 8px; }
.bssticky-scroll thead th {
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 1;
  transition: box-shadow .15s ease;
}
.bssticky-scroll.bssticky-scrolled thead th {
  box-shadow: 0 2px 4px rgba(20, 22, 28, .08);
}`,
  js: `const scrollBox = document.getElementById('bsstickyScroll');
const body = document.getElementById('bsstickyBody');

const STATUSES = [
  ['Shipped', 'success'], ['Processing', 'secondary'], ['Delivered', 'success'],
  ['Delayed', 'warning'], ['Cancelled', 'danger'],
];
const NAMES = ['Dana Reyes', 'Marcus Lee', 'Priya Nair', 'Sofia Chen', 'Wale Adeyemi', 'Ken Sato'];

let rows = '';
for (let i = 1; i <= 24; i++) {
  const [label, tone] = STATUSES[i % STATUSES.length];
  const name = NAMES[i % NAMES.length];
  rows += '<tr><td>#' + (1000 + i) + '</td><td>' + name + '</td><td>$' + (20 + i * 7) +
    '.00</td><td><span class="badge text-bg-' + tone + '">' + label + '</span></td></tr>';
}
body.innerHTML = rows;

// The sticky header is pure CSS (position: sticky). The only thing JS adds is
// a shadow that appears once the body has actually scrolled underneath it,
// so the header only looks "elevated" when there's real content behind it.
scrollBox.addEventListener('scroll', () => {
  scrollBox.classList.toggle('bssticky-scrolled', scrollBox.scrollTop > 0);
});`,

  seo: {
    title: 'Bootstrap Sticky Table Header on Scroll — Free HTML CSS JS Snippet',
    description: 'A real scrollable Bootstrap 5.3 table whose header stays pinned to the top of its own scroll container via position: sticky, with a JavaScript-driven shadow that only appears once content has actually scrolled underneath it.',
    about: {
      title: 'Bootstrap Sticky Table Header on Scroll — HTML, CSS & JavaScript',
      description: `The header staying in place is entirely CSS — \`position: sticky; top: 0;\` on every \`thead th\`, scoped to the \`.bssticky-scroll\` container's own scrollbar rather than the page's. That scoping matters: \`position: sticky\` sticks relative to its nearest scrolling ancestor, so the container needs its own \`overflow-y: auto\` and a real height limit (\`max-height: 260px\` here) for the header to have anything to stick within — without that, the whole page would need to scroll before the header engaged at all.\n\nThe one piece of actual JavaScript exists purely to answer a question CSS can't: has the body content actually moved out from under the header yet? A single \`scroll\` listener toggles \`bssticky-scrolled\` based on \`scrollBox.scrollTop > 0\`, and that class is what applies the header's drop shadow — so the shadow only appears once there's genuinely something to visually separate the header from, rather than showing a permanent shadow that implies scrollable content even when the table is sitting at the very top.\n\nA background color on the sticky \`th\` elements (\`background: #fff\`) is required for this to look right, not optional — without an opaque background, the header would stay positioned correctly but the table rows scrolling underneath it would show through, defeating the whole point of a header that's supposed to stay legible above moving content.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A 4-column table appears with 24 rows inside a fixed-height scroll box, header at the top with no shadow.' },
        { title: 'Scroll down inside the table', text: 'The column headers stay pinned to the top of the box while every row scrolls underneath them.' },
        { title: 'Watch the header as you start scrolling', text: 'A subtle drop shadow fades in under the header the instant scrollTop leaves zero.' },
        { title: 'Scroll back to the very top', text: 'The shadow disappears again, since there\'s nothing left scrolled underneath the header.' },
      ],
    },
    features: [
      'A genuinely sticky header using position: sticky scoped to its own scroll container, not the page',
      'An opaque header background so scrolling rows never show through the pinned row',
      'A JavaScript-driven shadow that only appears once real scroll has occurred, not a static decoration',
      'Works with any number of rows — the header logic doesn\'t know or care how much data is in the table',
      'No JavaScript is required for the sticky behavior itself, only for the scroll-aware shadow',
    ],
    useCases: [
      { icon: 'DASH', title: 'Dashboard and admin data tables', desc: 'Any table with more rows than fit on screen at once benefits from a header that stays legible — pairs with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/).' },
      { icon: 'DASH', title: 'Wide tables with more columns than comfortably fit', desc: 'Combine with [bootstrap-table-column-visibility-toggle](/ui-snippets/bootstrap-table-column-visibility-toggle/) so a user can hide columns while the header they still see stays pinned.' },
      { icon: 'APP', title: 'Order, transaction, or activity history panels', desc: 'A compact card showing recent activity where scrolling to older entries shouldn\'t lose the column labels.' },
      { icon: 'FORM', title: 'Data-entry grids and spreadsheet-style UIs', desc: 'Column context stays visible no matter how far down a long entry list a user has scrolled.' },
      { icon: 'LEARN', title: 'Learning position: sticky\'s actual requirements', desc: 'A working example of the two things sticky headers commonly get wrong: needing a scoped scroll container, and needing an opaque background.' },
    ],
    faqs: [
      { q: 'Why doesn\'t the header stick if I remove max-height and overflow-y from the container?', a: 'position: sticky sticks relative to the nearest ancestor with real, scrollable overflow. Without a bounded height and overflow-y: auto on .bssticky-scroll, the container never scrolls on its own, so the header has no scroll context to stick within — the browser would fall back to normal static positioning.' },
      { q: 'Why is the header background set explicitly to white?', a: 'A sticky element keeps its position but not automatic opacity — without a solid background, table rows scrolling past would visibly show through the header text, since sticky elements paint in normal document flow rather than as an overlay.' },
      { q: 'Does this work with sticky first columns too?', a: 'The same position: sticky mechanism extends to a first column (with left: 0 instead of top: 0) for a frozen-column effect, though combining sticky rows and sticky columns for a fully frozen corner cell needs a small amount of extra CSS to handle the overlap.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — the sticky behavior is pure CSS and needs no framework changes at all; only the scroll-shadow toggle needs to move into a scroll event handler attached in a mount lifecycle hook (useEffect, onMounted, ngAfterViewInit).' },
      { q: 'Will this work on mobile Safari?', a: 'Yes — position: sticky has had solid support in all major mobile browsers for years, including inside a scrollable div rather than only the page body.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to also make the first column sticky (frozen) alongside the sticky header, so both a row's row-identifying column and the column headers stay visible while scrolling in both directions, or to add a subtle fade-out gradient at the bottom of the scroll box to hint that more rows exist below the fold.`,
      prompt: `Build a Bootstrap 5.3 table with a sticky header inside its own scrollable container, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with several columns and at least 20 rows of sample data, wrapped in a container with a fixed max-height and overflow-y: auto.
- The table header (thead th cells) must use position: sticky with top: 0 and an explicit opaque background color, so it stays pinned to the top of the scroll container while the body scrolls underneath it, without any content showing through.
- Add a scroll event listener on the scroll container that toggles a CSS class adding a subtle drop shadow under the header, only once the container's scrollTop is greater than zero — the shadow should disappear again when scrolled back to the very top.`,
    },
  },
};

export default bootstrapStickyTableHeaderScroll;
