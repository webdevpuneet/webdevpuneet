const tableColumnDragReorder = {
  id: 'table-column-drag-reorder',
  title: 'Drag to Reorder Table Columns',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tcd-card">
  <div class="tcd-head">
    <h3>Inventory report</h3>
    <p class="tcd-hint">Drag a column header left or right to reorder.</p>
  </div>
  <table class="tcd-table">
    <thead><tr id="tcdHeadRow"></tr></thead>
    <tbody id="tcdBody"></tbody>
  </table>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f0fdf6;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tcd-card{background:#fff;border-radius:14px;padding:16px;width:100%;max-width:640px;box-shadow:0 18px 44px rgba(6,95,70,.1);border:1px solid #d7f0e2}
.tcd-head{margin-bottom:12px}
.tcd-head h3{font-size:14px;font-weight:800;color:#064e3b}
.tcd-hint{font-size:11px;color:#5b9c85;font-weight:600;margin-top:2px}

.tcd-table{width:100%;border-collapse:collapse;font-size:12.5px}
.tcd-table th{text-align:left;padding:9px 12px;color:#0f766e;font-weight:700;font-size:10.5px;text-transform:uppercase;letter-spacing:.03em;border-bottom:1.5px solid #d7f0e2;background:#f0fdf6;cursor:grab;user-select:none;position:relative;transition:opacity .15s}
.tcd-table th:active{cursor:grabbing}
.tcd-table th.tcd-dragging{opacity:.35}
.tcd-table th.tcd-drop-target{box-shadow:inset 3px 0 0 #10b981}
.tcd-table th.tcd-drop-target-right{box-shadow:inset -3px 0 0 #10b981}
.tcd-table td{padding:9px 12px;border-bottom:1px solid #eafbf1;color:#134e3a}
.tcd-table tbody tr:hover{background:#f6fefa}
.tcd-num{text-align:right;font-variant-numeric:tabular-nums}`,

  js: `var COLUMNS = [
  { key: 'sku', label: 'SKU', type: 'string' },
  { key: 'name', label: 'Item', type: 'string' },
  { key: 'stock', label: 'Stock', type: 'number' },
  { key: 'reorder', label: 'Reorder at', type: 'number' },
  { key: 'price', label: 'Unit price', type: 'number' },
];

var ITEMS = [
  { sku: 'WGT-001', name: 'Widget A', stock: 340, reorder: 100, price: 4.5 },
  { sku: 'WGT-002', name: 'Widget B', stock: 58, reorder: 75, price: 19.99 },
  { sku: 'BRK-010', name: 'Bracket', stock: 1200, reorder: 300, price: 0.75 },
  { sku: 'BLT-004', name: 'Bolt Pack', stock: 410, reorder: 150, price: 3.2 },
  { sku: 'PNL-021', name: 'Panel', stock: 22, reorder: 20, price: 58 },
];

var order = COLUMNS.map(function (c) { return c.key; });
var dragKey = null;

function colByKey(key) { return COLUMNS.filter(function (c) { return c.key === key; })[0]; }
function fmt(col, value) { return col.type === 'number' && col.key === 'price' ? '$' + value.toFixed(2) : value; }

function renderHead() {
  document.getElementById('tcdHeadRow').innerHTML = order.map(function (key) {
    var col = colByKey(key);
    return '<th draggable="true" data-key="' + key + '">' + col.label + '</th>';
  }).join('');
}

function renderBody() {
  document.getElementById('tcdBody').innerHTML = ITEMS.map(function (item) {
    var cells = order.map(function (key) {
      var col = colByKey(key);
      var cls = col.type === 'number' ? ' class="tcd-num"' : '';
      return '<td' + cls + '>' + fmt(col, item[key]) + '</td>';
    }).join('');
    return '<tr>' + cells + '</tr>';
  }).join('');
}

function render() { renderHead(); renderBody(); }

function clearDropTargets() {
  document.querySelectorAll('.tcd-drop-target,.tcd-drop-target-right').forEach(function (el) {
    el.classList.remove('tcd-drop-target', 'tcd-drop-target-right');
  });
}

var headRow = document.getElementById('tcdHeadRow');

headRow.addEventListener('dragstart', function (e) {
  var th = e.target.closest('th');
  if (!th) return;
  dragKey = th.dataset.key;
  th.classList.add('tcd-dragging');
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', dragKey);
});

headRow.addEventListener('dragend', function (e) {
  var th = e.target.closest('th');
  if (th) th.classList.remove('tcd-dragging');
  clearDropTargets();
  dragKey = null;
});

headRow.addEventListener('dragover', function (e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  var th = e.target.closest('th');
  if (!th || !dragKey || th.dataset.key === dragKey) return;
  clearDropTargets();
  var rect = th.getBoundingClientRect();
  var beforeHalf = (e.clientX - rect.left) < rect.width / 2;
  th.classList.add(beforeHalf ? 'tcd-drop-target' : 'tcd-drop-target-right');
});

headRow.addEventListener('drop', function (e) {
  e.preventDefault();
  var th = e.target.closest('th');
  clearDropTargets();
  if (!th || !dragKey || th.dataset.key === dragKey) { dragKey = null; return; }

  var rect = th.getBoundingClientRect();
  var beforeHalf = (e.clientX - rect.left) < rect.width / 2;
  var targetKey = th.dataset.key;

  // Real column-order mutation: remove the dragged key, then reinsert it relative to the drop target.
  var fromIndex = order.indexOf(dragKey);
  order.splice(fromIndex, 1);
  var toIndex = order.indexOf(targetKey);
  order.splice(beforeHalf ? toIndex : toIndex + 1, 0, dragKey);

  dragKey = null;
  render();
});

render();`,

  seo: {
    title: 'Drag to Reorder Table Columns — HTML5 Header Drag and Drop',
    description: `Drag column headers to rearrange which order columns appear in, with every row's cells moving to match — real HTML5 drag-and-drop. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Drag to Reorder Table Columns — Header Drag Reshuffles Every Row',
      description: `Row reordering and column reordering solve different problems — this is the column axis: dragging a header left or right to change which order columns display in, with every row's cells following along automatically. This snippet implements it with genuine HTML5 drag-and-drop on the \`<th>\` elements themselves — \`draggable="true"\`, \`dragstart\`/\`dragover\`/\`drop\` — distinct from a [row drag reorder table](/ui-snippets/table-row-drag-reorder/), which drags \`<tr>\`s vertically instead.

**Column order lives in one array, not in the DOM**

Rather than physically moving \`<th>\` and \`<td>\` DOM nodes around during a drag, the current column order is tracked as a simple array of keys, \`order\`. Both \`renderHead()\` and \`renderBody()\` iterate \`order\` to decide which column renders where — dragging a header never touches the DOM directly, it only ever mutates this one array and re-renders, which is what keeps headers and every row's cells perfectly in sync automatically.

**Left-half vs right-half drop detection**

On every \`dragover\`, the handler compares the cursor's X position against the hovered header's \`getBoundingClientRect()\` midpoint — landing in the left half signals "insert before this column," the right half signals "insert after." A highlighted inset border on the corresponding edge of the target header shows which side the drop will land on, live as you drag across different headers, computed fresh on every \`dragover\` rather than as a static highlight.

**Splice-then-reinsert column math**

On drop, the dragged column's key is spliced out of \`order\` first, then reinserted at the target column's current index (or one past it, depending on which half was hovered) — the same core technique as row reordering, but applied to a flat array of column keys instead of row objects. Because the removal happens before the target index is looked up again, the insertion always lands in the correct final position regardless of whether the drag moved the column left or right.

**Every row's cells follow the same order array**

The critical detail that makes this a genuine column reorder rather than just a shuffled header: \`renderBody()\` maps over the exact same \`order\` array to decide each row's cell sequence. There's no separate bookkeeping for "which cell goes where" — header and body both read from one source of truth, so the moment \`order\` changes, every single row's cells reflow to match on the very next render with zero chance of drifting out of sync.

**A guard against dropping a column onto itself**

Both \`dragover\` and \`drop\` explicitly check \`th.dataset.key === dragKey\` and bail out — without this, dropping a header back onto its own current position would still run through the splice/reinsert logic and could produce a visually confusing no-op highlight or an unnecessary re-render.

**Customizing it**

Persist the column order to localStorage or a user preference, combine with [resizable columns](/ui-snippets/resizable-columns-table/) so width and order are both adjustable, or add a "reset order" control. Pair with a [frozen columns table](/ui-snippets/frozen-columns-table/) — just make sure frozen columns are excluded from the draggable set.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An inventory table renders with five draggable column headers.` },
      { title: 'Drag a header left or right', text: `The header fades to signal it's lifted; a green edge highlight shows where it will drop.` },
      { title: 'Drop it on another column', text: `Every row's cells reorder to match — headers and data always move together.` },
      { title: 'Drag past the halfway point of a header', text: `Dropping in the left half inserts before that column; the right half inserts after.` },
      { title: 'Try dragging a column onto itself', text: `Nothing happens — a guard prevents a meaningless no-op reorder.` },
      { title: 'Swap in your own columns', text: `Replace COLUMNS and ITEMS — render() rebuilds both header and body from the order array.` },
    ] },
    features: [
      { title: 'Real HTML5 header drag-and-drop', text: `Column th elements use native draggable, dragstart, dragover, and drop — not row dragging repurposed.` },
      { title: 'Single order array as source of truth', text: `Both header and body render from one array of column keys, never drifting apart.` },
      { title: 'Left/right half drop detection', text: `Cursor X position relative to the hovered header decides before/after placement live.` },
      { title: 'Visual edge drop indicator', text: `An inset border on the correct side of the target header shows exactly where the column lands.` },
      { title: 'Splice-then-reinsert order math', text: `The dragged key is removed before the target index is computed, keeping placement correct in both directions.` },
      { title: 'Self-drop guard', text: `Dropping a header onto its own current position is explicitly ignored.` },
      { title: 'Automatic row cell reflow', text: `Every row's cells reorder immediately to match the new column order on every render.` },
      { title: 'Column-type-aware formatting', text: `Numeric columns right-align and the price column formats as currency, independent of column order.` },
    ],
    useCases: [
      { title: 'Custom report builders', text: 'Let users arrange which metric columns appear first, with native `draggable` headers and every row\'s cells following along.' },
      { title: 'Spreadsheet-style admin tools', text: 'Pair with a [resizable columns table](/ui-snippets/resizable-columns-table/) so users of spreadsheet-style admin tools can both reorder and resize columns.' },
      { title: 'Inventory and catalogue dashboards', text: 'Let operators prioritise the fields they check most, with a single order array rendering both header and body.' },
      { title: 'Data comparison tools', text: 'Reorder columns to place related values next to each other, with the drop side chosen by whether the cursor is in the left or right half of the target header.' },
      { title: 'Row reordering companion', text: 'Combine with [table row drag reorder](/ui-snippets/table-row-drag-reorder/) for both axes, and study HTML5 drag events for header cells specifically.' },
      { icon: 'CODE', title: 'Related: Inline Add Row to Table', desc: 'See the [Inline Add Row to Table](/ui-snippets/table-inline-add-row/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from the row drag reorder table?', a: `That snippet drags <tr> elements vertically to change row order; this one drags <th> header elements horizontally to change column order. The underlying drag-and-drop mechanics (dragstart/dragover/drop, a drop indicator, splice-then-reinsert math) are structurally similar, but here it's a flat array of column keys being reordered instead of an array of row data objects, and every row's cells must follow the header order rather than just the rows themselves moving.` },
      { q: 'Why do both header and body read from the same order array instead of each tracking their own?', a: `If header order and body cell order were tracked separately, a bug or a missed update in one could leave them out of sync — a header for "Price" sitting above a column of stock quantities. Deriving both renderHead() and renderBody() from one shared order array guarantees they can never drift apart, since there's only one place column order is ever stored.` },
      { q: 'How do I persist the column order across page reloads?', a: `After every successful drop (inside the drop handler, after order is updated), save order to localStorage as JSON. On page load, before the first render() call, check localStorage for a saved order and use it instead of the default COLUMNS.map(c => c.key) order if present.` },
      { q: 'How do I prevent one specific column from being reordered, like a pinned ID column?', a: `Simply don't set draggable="true" on that column's th (or check for it and skip adding the attribute in renderHead), and in the dragover/drop handlers ignore that column's key as a valid target if you also want to prevent other columns from being dropped in front of it — the order array can still include it, just excluded from the drag interactions.` },
      { q: 'How do I use this column drag-reorder table in React, Vue, or Angular?', a: `Keep the order array (of column keys) in component state, and derive both the rendered header cells and each row's cell sequence by mapping over that same state array — exactly as renderHead and renderBody do here. Wire the same dragstart/dragover/drop handlers to call your state setter with the new order after the same splice/reinsert computation.` },
    ],
    aiPrompt: {
      paragraph: `Rather than working through the column-order bookkeeping by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why both the header row and every body row render by mapping over the same single order array of column keys, rather than each tracking column position independently, and what could go wrong if they were separate. The same assistant can help you extend it — ask it to persist the column order to localStorage so it survives a page reload, exclude a pinned identity column from being draggable while still rendering it in its fixed position, or combine this with the resizable-columns drag-to-resize interaction so both a column's width and its position are independently adjustable on the same header. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a table with drag-to-reorder columns in plain HTML, CSS, and JavaScript using real HTML5 drag-and-drop on the column header elements — no library, and distinct from reordering rows.

Requirements:
- Track the current column order as a single flat array of column keys (not derived from the DOM), and render both the header row and every body row's cells by mapping over that same array, so header and body can never fall out of sync with each other.
- Mark every header cell (th) draggable="true". On dragstart, record which column key is being dragged in a JavaScript variable, visually fade that header to indicate it is lifted, and call dataTransfer.setData with the key.
- On dragover for the header row, call preventDefault unconditionally so drop can fire, and — using the cursor's X position relative to the currently hovered header's bounding rect — determine whether the cursor is in the left half or right half of that header, then show a visual edge highlight (e.g. an inset border) on the corresponding side of that header showing whether the drop will insert before or after it, updating live as the drag moves across different headers.
- Explicitly ignore dragover and drop when the hovered header is the same column currently being dragged, so dropping a column onto its own existing position is a no-op with no visual highlight or reorder.
- On drop, compute the correct new column order by removing the dragged column's key from the order array first, then re-inserting it at the target column's index (or one position later, depending on which half of the target header was hovered) — do this against the array with the dragged key already removed so the final position is correct in both the "moved left" and "moved right" directions.
- Re-render both the header row and every body row from the updated order array after every drop, so every row's cells visibly reorder to match the new column arrangement, and clean up drag-related visual classes on dragend even if the drag is cancelled outside a valid drop target.`,
    },
  },
};

export default tableColumnDragReorder;
