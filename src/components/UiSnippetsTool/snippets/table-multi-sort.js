const tableMultiSort = {
  id: 'table-multi-sort',
  title: 'Multi-Column Sort Table',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tms-card">
  <div class="tms-head">
    <h3>Player leaderboard</h3>
    <p class="tms-hint">Click a header to sort. Shift+click to add a secondary sort key.</p>
  </div>
  <table class="tms-table">
    <thead><tr id="tmsHeadRow"></tr></thead>
    <tbody id="tmsBody"></tbody>
  </table>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1420;color:#e8ebf5;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tms-card{background:#171d2e;border-radius:14px;padding:16px;width:100%;max-width:640px;border:1px solid #262e45;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.tms-head{margin-bottom:12px}
.tms-head h3{font-size:14px;font-weight:800}
.tms-hint{font-size:11px;color:#8791b0;font-weight:600;margin-top:3px}

.tms-table{width:100%;border-collapse:collapse;font-size:12.5px}
.tms-table th{text-align:left;padding:9px 12px;color:#9aa4c4;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.04em;border-bottom:1.5px solid #262e45;cursor:pointer;user-select:none;white-space:nowrap;position:relative}
.tms-table th:hover{color:#e8ebf5}
.tms-table td{padding:9px 12px;border-bottom:1px solid #1e2438;color:#dbe0f0}
.tms-table tbody tr:hover{background:#1c2338}
.tms-num{text-align:right;font-variant-numeric:tabular-nums}

.tms-th-inner{display:flex;align-items:center;gap:6px}
.tms-arrow{font-size:10px;color:#818cf8;width:9px;display:inline-block}
.tms-badge{background:#6366f1;color:#fff;font-size:9px;font-weight:800;border-radius:999px;width:15px;height:15px;display:inline-flex;align-items:center;justify-content:center}`,

  js: `var COLUMNS = [
  { key: 'name', label: 'Player', type: 'string' },
  { key: 'region', label: 'Region', type: 'string' },
  { key: 'level', label: 'Level', type: 'number' },
  { key: 'wins', label: 'Wins', type: 'number' },
  { key: 'score', label: 'Score', type: 'number' },
];

var PLAYERS = [
  { name: 'NovaByte', region: 'EU', level: 42, wins: 118, score: 8820 },
  { name: 'QuietStorm', region: 'NA', level: 42, wins: 96, score: 8410 },
  { name: 'PixelRunner', region: 'APAC', level: 38, wins: 118, score: 7990 },
  { name: 'DriftKing', region: 'EU', level: 51, wins: 140, score: 9410 },
  { name: 'EchoWave', region: 'NA', level: 38, wins: 87, score: 7420 },
  { name: 'ZenithFox', region: 'APAC', level: 51, wins: 130, score: 9110 },
  { name: 'CoralBlade', region: 'EU', level: 42, wins: 96, score: 8390 },
  { name: 'MutedSignal', region: 'NA', level: 38, wins: 87, score: 7530 },
];

// Ordered list of active sort keys: [{ key, dir }], first = primary, second = secondary, etc.
var sortState = [];

function headerRow() {
  document.getElementById('tmsHeadRow').innerHTML = COLUMNS.map(function (col) {
    return '<th data-key="' + col.key + '"><span class="tms-th-inner">' + col.label + '<span class="tms-sort-ui" data-ui="' + col.key + '"></span></span></th>';
  }).join('');
}

function updateHeaderIndicators() {
  COLUMNS.forEach(function (col) {
    var ui = document.querySelector('[data-ui="' + col.key + '"]');
    var idx = sortState.findIndex(function (s) { return s.key === col.key; });
    if (idx === -1) { ui.innerHTML = ''; return; }
    var entry = sortState[idx];
    var arrow = entry.dir === 'asc' ? '\\u2191' : '\\u2193';
    ui.innerHTML = '<span class="tms-arrow">' + arrow + '</span><span class="tms-badge">' + (idx + 1) + '</span>';
  });
}

function compareValues(a, b, col) {
  var av = a[col.key];
  var bv = b[col.key];
  if (col.type === 'number') return av - bv;
  return String(av).localeCompare(String(bv));
}

function sortedPlayers() {
  if (!sortState.length) return PLAYERS.slice();
  var rows = PLAYERS.slice();
  rows.sort(function (a, b) {
    // Walk sort keys in priority order; the first non-zero comparison decides the order.
    for (var i = 0; i < sortState.length; i++) {
      var entry = sortState[i];
      var col = COLUMNS.filter(function (c) { return c.key === entry.key; })[0];
      var cmp = compareValues(a, b, col);
      if (entry.dir === 'desc') cmp = -cmp;
      if (cmp !== 0) return cmp;
    }
    return 0;
  });
  return rows;
}

function renderBody() {
  var rows = sortedPlayers();
  document.getElementById('tmsBody').innerHTML = rows.map(function (p) {
    return '<tr>' +
      '<td>' + p.name + '</td>' +
      '<td>' + p.region + '</td>' +
      '<td class="tms-num">' + p.level + '</td>' +
      '<td class="tms-num">' + p.wins + '</td>' +
      '<td class="tms-num">' + p.score.toLocaleString() + '</td>' +
    '</tr>';
  }).join('');
}

function applySort(key, additive) {
  var idx = sortState.findIndex(function (s) { return s.key === key; });

  if (!additive) {
    // Plain click: this column becomes the sole sort key, toggling direction if it already was.
    if (idx === 0 && sortState.length === 1) {
      sortState[0].dir = sortState[0].dir === 'asc' ? 'desc' : 'asc';
    } else {
      sortState = [{ key: key, dir: 'asc' }];
    }
  } else {
    // Shift+click: add or toggle this column as an additional secondary/tertiary sort key.
    if (idx === -1) {
      sortState.push({ key: key, dir: 'asc' });
    } else {
      sortState[idx].dir = sortState[idx].dir === 'asc' ? 'desc' : 'asc';
    }
  }
  updateHeaderIndicators();
  renderBody();
}

headerRow();
document.getElementById('tmsHeadRow').addEventListener('click', function (e) {
  var th = e.target.closest('th');
  if (!th) return;
  applySort(th.dataset.key, e.shiftKey);
});

updateHeaderIndicators();
renderBody();`,

  seo: {
    title: 'Multi-Column Sort Table — Shift-Click Priority Sort HTML CSS JS',
    description: `A table where shift-clicking additional headers adds secondary and tertiary sort keys, with numbered priority badges and per-column direction arrows. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Multi-Column Sort Table — Shift-Click Adds Secondary and Tertiary Sort Keys',
      description: `A single-column sort answers "order by score" — but "order by region, then by level, then by score" needs multiple sort keys applied in priority order, the way spreadsheets handle a multi-level sort dialog. This snippet implements that with shift-click: a plain click sets a column as the sole sort key, while shift-clicking additional columns appends them as secondary, tertiary, and further sort keys, each shown with a small numbered priority badge and its own ascending/descending arrow.

**An ordered array of sort keys, not a single field**

Where a typical sortable table stores one \`{ key, dir }\` pair, this one stores an *array* of them, \`sortState\`, ordered by priority — index 0 is the primary key, index 1 the secondary, and so on. That ordering is the whole feature: the comparator walks the array in sequence and only moves to the next key when the current one produces a tie, which is exactly how a multi-level spreadsheet sort behaves.

**The comparator short-circuits on the first real difference**

\`sortedPlayers()\`'s compare function loops through \`sortState\` in priority order, computing \`compareValues\` for each active key and returning immediately once one produces a non-zero result. Only when two rows are completely equal on the primary key does the secondary key ever get consulted, and so on down the list — the standard definition of a stable, priority-ordered multi-key sort.

**Plain click resets, shift-click appends or toggles**

A plain click on a header collapses \`sortState\` down to just that one column (toggling its direction if it was already the sole active sort), matching the everyday expectation that clicking a header means "sort by just this now." Shift-click instead either appends the clicked column to the end of \`sortState\` if it isn't already active, or toggles its existing direction in place if it is — so shift-clicking the same secondary column twice flips it between ascending and descending without disturbing its priority position or any other active key.

**Numbered badges make priority visible, not just implied**

Each active column's header shows a small circular badge with its position in \`sortState\` (1, 2, 3…) next to a direction arrow — without this, a user has no way to tell that region is being sorted before level, or that a third key even exists. The badge number is computed live from \`sortState.findIndex\`, so it always matches the column's actual current priority, updating immediately if a column is added, removed, or reordered.

**A generic comparator across types**

\`compareValues\` branches on each column's declared \`type\` — numeric subtraction for \`number\` columns, \`localeCompare\` for \`string\` columns — so the same multi-key loop works uniformly whether the active keys are a mix of text and numeric fields, without special-casing any particular column in the sort logic itself.

**Customizing it**

Add a way to remove a key from the middle of \`sortState\` (e.g. Ctrl+click), persist the sort configuration to the URL, or combine with a [filterable table](/ui-snippets/filterable-table/) so multi-sort applies to a filtered subset. Compare with a plain [sortable table](/ui-snippets/sortable-table/) for the single-key version this builds on.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A player leaderboard renders unsorted, with sortable column headers.` },
      { title: 'Click a header', text: `The table sorts by that column alone; clicking it again reverses direction.` },
      { title: 'Shift+click a second header', text: `That column is added as a secondary sort key, shown with a "2" badge and its own arrow.` },
      { title: 'Shift+click a third header', text: `A tertiary key is added with a "3" badge; rows now sort by all three keys in priority order.` },
      { title: 'Shift+click an active secondary key again', text: `Its direction toggles between ascending and descending without changing its priority.` },
      { title: 'Click any header without Shift', text: `All other sort keys are cleared and that column becomes the sole primary sort.` },
    ] },
    features: [
      { title: 'Ordered multi-key sort state', text: `sortState is an array, not a single field, so priority order is explicit and inspectable.` },
      { title: 'Short-circuit priority comparator', text: `The sort function only consults a lower-priority key when higher-priority keys tie.` },
      { title: 'Shift-click to append or toggle', text: `Adds a new secondary/tertiary key, or flips direction if the column is already active.` },
      { title: 'Plain click resets to single-key', text: `Matches the everyday expectation that a normal click means "just sort by this."` },
      { title: 'Live numbered priority badges', text: `Each active column shows its real position in sortState, computed on every change.` },
      { title: 'Per-column direction arrows', text: `Ascending and descending are shown independently for every active sort key.` },
      { title: 'Type-aware comparator', text: `Numeric and string columns both sort correctly through the same generic compare function.` },
      { title: 'Stable ties fall through cleanly', text: `Rows identical across all active keys retain their relative original order.` },
    ],
    useCases: [
      { title: 'Leaderboards and rankings', text: `Sort by region, then level, then score, mirroring how ranking systems are actually read.` },
      { title: 'Reporting and analytics tables', text: `Order results by category and then by a metric, pair with a [filterable table](/ui-snippets/filterable-table/).` },
      { title: 'Spreadsheet-style admin tools', text: `Bring a multi-level sort dialog's behavior directly into a web table's headers.` },
      { title: 'Scheduling and roster tables', text: `Sort by team, then by shift, then by name for a readable multi-key roster order.` },
      { title: 'Inventory and catalog browsing', text: `Sort by category, then stock status, then price for merchandising views.` },
      { title: 'Learning comparator composition', text: `A clear reference for chaining tie-breaking comparators, versus a single-key [sortable table](/ui-snippets/sortable-table/).` },
    ],
    faqs: [
      { q: 'Why is sortState an array instead of one { key, dir } object?', a: `A single object can only represent one active sort column. Multi-level sorting needs an ordered sequence of keys where earlier entries take priority over later ones — an array preserves that order explicitly, and the comparator walks it in sequence, which a single object has no way to express.` },
      { q: 'How does the comparator decide when to check the secondary key?', a: `It loops through sortState in order, computing each key's comparison result. The function returns as soon as any key produces a non-zero (non-tied) result. Only if the primary key's comparison is exactly 0 — meaning the two rows are equal on that field — does the loop proceed to check the next key in the array.` },
      { q: 'How do I remove one column from the middle of a multi-sort without clearing everything?', a: `Add a modifier (e.g. Ctrl+click, or a small × on the badge) that calls sortState.splice(idx, 1) for that column's index, then re-run updateHeaderIndicators() and renderBody() — the remaining keys keep their relative order and their badge numbers recompute automatically since they're derived from array position.` },
      { q: 'How do I persist the multi-sort state in the URL for shareable links?', a: `Serialize sortState to a query parameter, e.g. ?sort=region.asc,level.asc,score.desc, on every applySort call, and on page load parse that parameter back into the same array shape before the first renderBody() — the sort logic itself doesn't need to change, only where sortState's initial value comes from.` },
      { q: 'How do I use this multi-sort table in React, Vue, or Angular?', a: `Keep sortState as an array in component state and derive the sorted rows with a memoized computation (useMemo, computed, or a getter) that re-runs the same short-circuit comparator whenever sortState or the source data changes; bind each header's click handler to call your state setter with the updated array using the same additive/reset logic.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the priority logic yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the comparator function loops through sortState and returns on the first non-zero comparison rather than, say, averaging or combining all the comparisons at once, and why a plain click resets sortState to a single entry while shift-click either appends or toggles in place. The same assistant can help you extend it — ask it to add a way to remove one key from the middle of an active multi-sort without clearing the whole state, persist the sort configuration to a URL query parameter so a multi-sorted view is shareable, or add drag-to-reorder on the priority badges themselves so a user can re-rank which key is primary without re-clicking headers in a new order. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "multi-column sort" data table in plain HTML, CSS, and JavaScript with no library — clicking headers sorts normally, but shift-clicking additional headers adds them as secondary, tertiary, and further sort keys rather than replacing the current sort.

Requirements:
- Store the active sort configuration as an ordered array of { key, direction } objects (not a single object), where the array's order represents sort priority — index 0 is the primary sort key, index 1 secondary, and so on.
- On a plain click (no Shift) on a column header, collapse the sort state down to a single entry for that column only, toggling its direction if it was already the sole active sort key — this matches the normal expectation that a plain click means "sort by just this column now," clearing any other active keys.
- On a Shift+click on a column header, if that column is not already in the sort state array, append it to the end (making it the lowest-priority active key so far); if it is already in the array, toggle its direction in place without changing its position in the priority order or affecting any other active key.
- Write a single comparator function that, given two rows, loops through the sort state array in order and returns the result of the first comparison that is not a tie (not zero) — only consult a lower-priority key when every higher-priority key currently being compared for those two rows is exactly equal.
- Make the comparator generic across column data types (at least string and number columns) via a per-column type field, rather than hardcoding type-specific comparison logic per column name.
- On every active sort column's header, render a small numbered badge showing its actual current priority position in the sort state array (1 for primary, 2 for secondary, etc.) plus an ascending/descending arrow indicator, both of which must update immediately whenever the sort state array changes.`,
    },
  },
};

export default tableMultiSort;
