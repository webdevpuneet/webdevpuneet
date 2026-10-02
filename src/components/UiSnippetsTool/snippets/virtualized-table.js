const virtualizedTable = {
  id: 'virtualized-table',
  title: 'Virtualized Table (Windowed Rendering)',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="vrt-card">
  <div class="vrt-head">
    <h3>5,000 rows</h3>
    <p class="vrt-hint" id="vrtRange">Rendering rows 0–24 of 5000</p>
  </div>
  <div class="vrt-scroll" id="vrtScroll">
    <div class="vrt-spacer" id="vrtSpacer">
      <table class="vrt-table" id="vrtTable" style="top:0">
        <thead><tr><th>#</th><th>User</th><th>Score</th><th>Region</th><th>Status</th></tr></thead>
        <tbody id="vrtBody"></tbody>
      </table>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f4f6fb;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.vrt-card{background:#fff;border-radius:14px;padding:16px;width:100%;max-width:600px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.vrt-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.vrt-head h3{font-size:14px;font-weight:800;color:#0f172a}
.vrt-hint{font-size:11px;color:#94a3b8;font-weight:600;font-variant-numeric:tabular-nums}

.vrt-scroll{height:360px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:10px;position:relative}
.vrt-spacer{position:relative}
.vrt-table{width:100%;border-collapse:collapse;font-size:12.5px;position:absolute;left:0;right:0}
.vrt-table thead{position:sticky;top:0;z-index:2}
.vrt-table thead th{background:#f8fafc;color:#64748b;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;text-align:left;padding:8px 12px;border-bottom:1.5px solid #e2e8f0}
.vrt-table tbody td{padding:0 12px;height:28px;line-height:28px;border-bottom:1px solid #f1f5f9;color:#334155;white-space:nowrap}
.vrt-table tbody tr:nth-child(even){background:#fafbfc}
.vrt-badge{display:inline-block;padding:1px 8px;border-radius:999px;font-size:10px;font-weight:700}
.vrt-badge.ok{background:#dcfce7;color:#15803d}
.vrt-badge.warn{background:#fef3c7;color:#a16207}
.vrt-badge.err{background:#fee2e2;color:#b91c1c}`,

  js: `var ROW_HEIGHT = 28;
var HEADER_HEIGHT = 33;
var BUFFER = 6;
var TOTAL_ROWS = 5000;
var REGIONS = ['NA', 'EU', 'APAC', 'LATAM'];
var STATUSES = ['ok', 'warn', 'err'];

// Generate a large dataset up front — the point is that we never render all of it at once.
var DATA = [];
for (var i = 0; i < TOTAL_ROWS; i++) {
  DATA.push({
    id: i,
    user: 'user_' + (1000 + i),
    score: Math.round((Math.sin(i * 0.37) * 0.5 + 0.5) * 1000),
    region: REGIONS[i % REGIONS.length],
    status: STATUSES[Math.floor(Math.abs(Math.sin(i)) * STATUSES.length) % STATUSES.length],
  });
}

var scroller = document.getElementById('vrtScroll');
var spacer = document.getElementById('vrtSpacer');
var table = document.getElementById('vrtTable');
var body = document.getElementById('vrtBody');
var rangeLabel = document.getElementById('vrtRange');

// The spacer's height is the full virtual content height, so the scrollbar behaves correctly
// even though only a small window of rows is ever actually in the DOM.
spacer.style.height = (TOTAL_ROWS * ROW_HEIGHT + HEADER_HEIGHT) + 'px';

function statusBadge(s) {
  var label = s === 'ok' ? 'OK' : s === 'warn' ? 'Warn' : 'Error';
  return '<span class="vrt-badge ' + s + '">' + label + '</span>';
}

function renderWindow() {
  var scrollTop = scroller.scrollTop;
  var viewportHeight = scroller.clientHeight;

  // Real scroll-position math: convert pixel scroll offset into a row index, then
  // compute how many rows fit in the viewport, padding both ends with a buffer.
  var firstVisible = Math.max(0, Math.floor((scrollTop - HEADER_HEIGHT) / ROW_HEIGHT));
  var visibleCount = Math.ceil(viewportHeight / ROW_HEIGHT);
  var startIndex = Math.max(0, firstVisible - BUFFER);
  var endIndex = Math.min(TOTAL_ROWS, firstVisible + visibleCount + BUFFER);

  var slice = DATA.slice(startIndex, endIndex);
  body.innerHTML = slice.map(function (row) {
    return '<tr>' +
      '<td>' + row.id + '</td>' +
      '<td>' + row.user + '</td>' +
      '<td>' + row.score + '</td>' +
      '<td>' + row.region + '</td>' +
      '<td>' + statusBadge(row.status) + '</td>' +
    '</tr>';
  }).join('');

  // Absolutely position the rendered window at its true offset within the virtual content,
  // so the small set of real DOM rows lines up exactly where the full dataset would have put them.
  table.style.top = (startIndex * ROW_HEIGHT) + 'px';
  rangeLabel.textContent = 'Rendering rows ' + startIndex + '\\u2013' + (endIndex - 1) + ' of ' + TOTAL_ROWS + ' (' + slice.length + ' DOM rows)';
}

scroller.addEventListener('scroll', renderWindow);
window.addEventListener('resize', renderWindow);
renderWindow();`,

  seo: {
    title: 'Virtualized Table — Windowed Row Rendering HTML CSS JS',
    description: `A table with 5,000+ generated rows that only ever renders the visible window plus a buffer, using real scroll-position math. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Virtualized Table — Real Windowed Rendering for Thousands of Rows',
      description: `Rendering five thousand \`<tr>\` elements into the DOM at once is slow to build, slow to lay out, and heavy on memory — most of those rows are never on screen at any given moment. Virtualization (also called windowing) fixes this by keeping only the rows that are actually visible, plus a small buffer, in the DOM at all times, while a spacer element fakes the full scrollable height so the scrollbar still behaves correctly. This snippet implements genuine windowed rendering over 5,000 generated rows in plain HTML, CSS, and vanilla JavaScript — no library, no shortcuts.

**A full-height spacer, a tiny real table**

The scroll container holds a \`.vrt-spacer\` sized to \`TOTAL_ROWS * ROW_HEIGHT\` pixels — the height the table *would* be if every row were rendered — so the browser's native scrollbar reflects the true scrollable distance. Inside it, the actual \`<table>\` is absolutely positioned and, at any moment, contains only a couple dozen \`<tr>\`s. The spacer is what makes the scrollbar honest while the DOM stays cheap.

**Real scroll-position math, not a fixed slice**

On every \`scroll\` event, \`renderWindow()\` reads \`scroller.scrollTop\` and converts that pixel offset into a row index with \`Math.floor((scrollTop - HEADER_HEIGHT) / ROW_HEIGHT)\` — genuine arithmetic tying the scroll position to which row is first visible, not a hardcoded window that never moves. \`visibleCount\` is derived from the viewport's actual \`clientHeight\` divided by the fixed row height, so the number of rows rendered adapts if the container is resized.

**A buffer so fast scrolling doesn't flash blank rows**

Rendering exactly the visible rows and nothing else would show a flicker of empty space during a fast scroll, since the new rows for the next frame haven't rendered yet. \`BUFFER\` pads \`startIndex\` and \`endIndex\` by a few extra rows on each side, so there's always a small overrun of already-rendered content beyond the viewport edge to scroll into before the next \`renderWindow()\` call catches up.

**Absolute positioning to land rows at their true offset**

Because only a slice of the data is ever in the DOM, the rendered \`<tbody>\` can't simply start at the top of the container — row 3,000 needs to visually sit 3,000 row-heights down. The \`<table>\`'s \`top\` style is set to \`startIndex * ROW_HEIGHT\` on every render, placing the small set of real rows at the exact pixel offset the full dataset would have put them, so scrolling feels seamless even though the underlying DOM content is constantly being swapped out.

**Sticky header, live row count**

The header stays \`position: sticky\` within the scroll container so column labels remain visible regardless of scroll position, and a live label reports exactly which row indices and how many actual DOM rows are rendered at any moment — useful for seeing the technique work, and a good sanity check that it never renders anywhere close to all 5,000 rows.

**Customizing it**

Swap fixed-height rows for variable heights (requires tracking cumulative offsets instead of a constant multiply), add horizontal virtualization for very wide tables, or combine with a [frozen columns table](/ui-snippets/frozen-columns-table/) for pinned columns on a huge dataset. Pair with an [infinite scroll table](/ui-snippets/infinite-scroll-table/) if the data is paginated from a server instead of generated upfront.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `5,000 rows are generated in an array and the first window renders inside a fixed-height scroll container.` },
      { title: 'Scroll the table', text: `Only the visible rows plus a small buffer exist in the DOM at any moment — check the live row-range label.` },
      { title: 'Scroll to the very bottom', text: `The scrollbar reaches its true end because the spacer element reflects the full 5,000-row height.` },
      { title: 'Scroll quickly', text: `The buffer of extra rows above and below the viewport prevents blank flashes during fast scrolling.` },
      { title: 'Resize the window', text: `visibleCount recalculates from the container's live clientHeight, so the rendered window adapts.` },
      { title: 'Swap in your own data', text: `Replace DATA and TOTAL_ROWS — the windowing math works for any row count.` },
    ] },
    features: [
      { title: 'Real windowed rendering', text: `Only visible rows plus a buffer exist in the DOM at any time — never all 5,000.` },
      { title: 'Full-height spacer element', text: `A sized spacer keeps the scrollbar proportional to the true dataset length.` },
      { title: 'Live scroll-to-index math', text: `scrollTop is converted to a row index on every scroll event, not a static offset.` },
      { title: 'Absolute-positioned row window', text: `The rendered table is translated to its true pixel offset so rows land exactly where the full data would place them.` },
      { title: 'Buffered overscan', text: `Extra rows beyond each viewport edge prevent blank flashes during fast scrolling.` },
      { title: 'Sticky header', text: `Column labels stay visible within the scroll container regardless of scroll position.` },
      { title: 'Resize-aware', text: `The visible row count recalculates from the container's live height on window resize.` },
      { title: 'Live DOM row count readout', text: `A label reports exactly which indices and how many real rows are rendered, for verifying the technique works.` },
    ],
    useCases: [
      { title: 'Large admin data grids', text: 'Browse tens of thousands of records smoothly, rendering only the visible rows plus a buffer using real `scrollTop` to row index maths.' },
      { title: 'Log and event viewers', text: 'Scroll through large log datasets without freezing the page, with a full-height spacer keeping the scrollbar proportional to the total.' },
      { title: 'Analytics and reporting tables', text: 'Pair with a [multi-column sort table](/ui-snippets/table-multi-sort/) so very long reports can be reordered, with the rendered window translated to its true pixel offset.' },
      { title: 'Financial transaction ledgers', text: 'Render thousands of transactions at once, with only about twenty rows of real DOM at any moment instead of five thousand `tr` elements.' },
      { title: 'Search results and virtualisation learning', text: 'Show a large unpaginated result set, or study a clear, dependency-free example of windowed rendering with constant row height.' },
    ],
    faqs: [
      { q: 'Why does the spacer element need a fixed height at all?', a: `The browser computes scrollbar size and thumb position from the scrollable content's actual height. Since only a tiny slice of rows is ever rendered, without a spacer sized to the full virtual height (TOTAL_ROWS * ROW_HEIGHT) the scrollbar would reflect only the few rendered rows, making it impossible to scroll to the middle or end of the real dataset.` },
      { q: 'What does the buffer (BUFFER = 6) actually protect against?', a: `Without it, the rendered window would exactly match the visible viewport, so a fast scroll could outrun the scroll event handler and briefly show blank space before renderWindow catches up. Padding startIndex and endIndex by a few rows on each side keeps a small overrun of already-rendered rows just out of view, ready to scroll into immediately.` },
      { q: 'How do I support variable-height rows instead of a fixed ROW_HEIGHT?', a: `Precompute a cumulative offset array where offsets[i] is the sum of all row heights before row i, then binary-search that array for the row index whose offset is closest to scrollTop instead of using a constant division. It is more work than fixed-height virtualization but the windowing logic (buffer, absolute positioning) stays conceptually the same.` },
      { q: 'How is this different from an infinite scroll table?', a: `Infinite scroll typically loads more data from a server as the user nears the bottom and keeps appending it to a growing DOM, so the DOM size still increases over time. This virtualized table already has all the data in memory and instead swaps which small slice is rendered as you scroll — the DOM never grows past a couple dozen rows regardless of how far you scroll or how large the dataset is.` },
      { q: 'How do I use this virtualized table in React, Vue, or Angular?', a: `The math is framework-agnostic: keep scrollTop in state, derive startIndex/endIndex with the same formulas in a memoized calculation, and render only DATA.slice(startIndex, endIndex) mapped to row components with the table absolutely positioned via a computed top style. Libraries like react-window or react-virtual implement this exact pattern with additional ergonomics if you want to skip hand-rolling it.` },
    ],
    aiPrompt: {
      paragraph: `Rather than deriving the windowing math yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the spacer element needs to be sized to the full virtual content height even though the real table inside it only ever contains a couple dozen rows, and how the startIndex * ROW_HEIGHT positioning keeps those few real rows landing at the same pixel offsets the full unrendered dataset would occupy. The same assistant can help you extend it — ask it to support variable row heights using a cumulative offset lookup instead of a fixed multiply, add horizontal virtualization for a table with hundreds of columns, or wire the data source to a paginated API instead of an in-memory array. It's also useful for verifying correctness: ask it to reason through what happens at the very first and very last scroll positions to confirm the buffer and clamping never render a negative or out-of-bounds row index. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "virtualized table" (windowed row rendering) in plain HTML, CSS, and JavaScript with no library — a table over 5,000+ generated data rows that never has more than a small window of actual <tr> elements in the DOM at once.

Requirements:
- Generate a large in-memory array of at least 5,000 row objects with a loop, not hand-written data.
- Put the table inside a fixed-height, vertically scrollable container, and inside that container add a separate "spacer" element whose height is set (in JavaScript, from the row count times a fixed row height in pixels) to the full height the table would occupy if every row were actually rendered — this is what keeps the native scrollbar's size and travel distance representative of the true dataset length even though most rows never exist in the DOM.
- On every scroll event on the container, compute the current scroll offset, convert it into a first-visible row index using real division by the fixed row height (not a hardcoded or approximate value), and compute how many rows fit in the container's current viewport height.
- Pad the computed start and end row indices with a small buffer of extra rows on each side (an overscan), so a fast scroll doesn't visibly flash empty space before the next render catches up, and clamp both indices so they never go below 0 or beyond the total row count.
- Render only that slice of the data array into the table body on each scroll event (replacing the previous slice entirely), and absolutely position the table element's vertical offset to startIndex times the row height, so the small set of currently-rendered rows lines up exactly where the full unrendered dataset would have placed them.
- Add a sticky table header that stays visible within the scroll container regardless of scroll position, and a small live label showing which row index range and how many actual DOM rows are currently rendered, to make the virtualization technique visibly verifiable.
- Recalculate the visible row count on window resize, not just on scroll, since the container's viewport height can change independently of scrolling.`,
    },
  },
};

export default virtualizedTable;
