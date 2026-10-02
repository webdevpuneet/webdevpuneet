const sortablejsSortableTableRows = {
  id: 'sortablejs-sortable-table-rows',
  title: 'SortableJS Sortable Table Rows with Live Ranking and Undo',
  lastmod: '2026-09-24',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/sortablejs@1.15.3/Sortable.min.js',
  ],
  html: `<div class="st-card">
  <div class="st-bar">
    <div><h3>Roadmap priorities</h3><p>Drag rows to rank them. Rank and score update as you go.</p></div>
    <div class="st-btns">
      <button type="button" id="stUndo" disabled>&#8630; Undo</button>
      <button type="button" id="stSort">Sort by score</button>
    </div>
  </div>
  <table class="st-table" aria-label="Roadmap priorities">
    <thead><tr><th class="c">#</th><th></th><th>Initiative</th><th>Team</th><th class="r">Impact</th><th class="r">Effort</th></tr></thead>
    <tbody id="stBody"></tbody>
  </table>
  <p class="st-note" id="stNote" aria-live="polite">Top of the list ships first.</p>
</div>`,
  css: `body { background: #f0f2f8; padding: 16px; font-family: system-ui, sans-serif; }
.st-card { max-width: 720px; margin: 0 auto; background: #fff; border: 1px solid #dde1ec; border-radius: 16px; padding: 16px; box-shadow: 0 8px 24px rgba(20,30,70,.06); }
.st-bar { display: flex; justify-content: space-between; align-items: flex-start; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
.st-bar h3 { margin: 0 0 3px; font-size: 17px; color: #12162e; } .st-bar p { margin: 0; font-size: 13px; color: #6b7290; }
.st-btns { display: flex; gap: 6px; }
.st-btns button { font: 800 12px/1 system-ui, sans-serif; color: #384057; background: #eef1f6; border: 0; border-radius: 9px; padding: 10px 12px; cursor: pointer; }
.st-btns button:hover:not(:disabled) { background: #e0e5ee; } .st-btns button:disabled { opacity: .45; cursor: default; }
.st-table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
.st-table th { text-align: left; font: 800 11px/1 system-ui, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: #6b7290; padding: 10px 10px; border-bottom: 2px solid #e6e9f4; }
.st-table td { padding: 11px 10px; border-bottom: 1px solid #eef0f8; color: #1b2033; background: #fff; }
.c { text-align: center; width: 44px; } .r { text-align: right; }
.st-table td.rank { font: 800 13px/1 system-ui, sans-serif; color: #4338ca; text-align: center; font-variant-numeric: tabular-nums; }
.st-table td.grip { width: 26px; color: #9aa1bd; cursor: grab; font-size: 16px; user-select: none; text-align: center; padding: 0; touch-action: none; }
.st-table td.grip:active { cursor: grabbing; }
.st-table td.num { text-align: right; font-variant-numeric: tabular-nums; font-weight: 700; }
.team { display: inline-block; font: 800 11px/1 system-ui, sans-serif; padding: 4px 8px; border-radius: 999px; }
.t-Growth { background: #dcfce7; color: #166534; } .t-Core { background: #dbeafe; color: #1e40af; } .t-Design { background: #fce7f3; color: #9d174d; } .t-Infra { background: #fef3c7; color: #92400e; }
tr.st-ghost td { background: #c7d2fe !important; opacity: .55; }
tr.st-flash td { animation: stFlash 1s ease-out; }
@keyframes stFlash { from { background: #fde68a; } to { background: #fff; } }
.st-note { margin: 10px 2px 0; font-size: 12.5px; color: #6b7290; }`,
  js: `const ROWS = [
  { id: 1, n: 'Single sign-on', t: 'Core', i: 9, e: 8 },
  { id: 2, n: 'Onboarding checklist', t: 'Growth', i: 8, e: 3 },
  { id: 3, n: 'Dark mode', t: 'Design', i: 6, e: 4 },
  { id: 4, n: 'Usage-based billing', t: 'Core', i: 9, e: 9 },
  { id: 5, n: 'Faster search index', t: 'Infra', i: 7, e: 6 },
  { id: 6, n: 'Referral programme', t: 'Growth', i: 7, e: 5 },
];
const body = document.getElementById('stBody');
const note = document.getElementById('stNote');
const undoBtn = document.getElementById('stUndo');
const undoStack = [];                   // each entry is an array of ids in the previous order

function render(order) {
  const byId = {}; ROWS.forEach(function (r) { byId[r.id] = r; });
  body.innerHTML = order.map(function (id, idx) {
    const r = byId[id];
    return '<tr tabindex="0" data-id="' + r.id + '"><td class="grip" aria-hidden="true" title="Drag to reorder">⠇</td><td class="rank">' + (idx + 1) + '</td>' +
      '<td>' + r.n + '</td><td><span class="team t-' + r.t + '">' + r.t + '</span></td><td class="num">' + r.i + '</td><td class="num">' + r.e + '</td></tr>';
  }).join('');
}
const currentOrder = function () { return Array.prototype.map.call(body.children, function (tr) { return Number(tr.dataset.id); }); };
render(ROWS.map(function (r) { return r.id; }));
let last = currentOrder();

// Renumber in place after a drag: cheaper and smoother than re-rendering the whole table.
function renumber() {
  Array.prototype.forEach.call(body.children, function (tr, i) { tr.querySelector('.rank').textContent = i + 1; });
}

Sortable.create(body, {
  animation: 170,
  handle: '.grip',
  ghostClass: 'st-ghost',
  forceFallback: false,
  onStart: function () { last = currentOrder(); },
  onEnd: function (evt) {
    if (evt.oldIndex === evt.newIndex) return;
    undoStack.push(last); undoBtn.disabled = false;
    renumber();
    const moved = body.children[evt.newIndex];
    moved.classList.add('st-flash');
    setTimeout(function () { moved.classList.remove('st-flash'); }, 1000);
    const name = moved.children[2].textContent;
    note.textContent = name + ' moved from #' + (evt.oldIndex + 1) + ' to #' + (evt.newIndex + 1) + '.';
  },
});

// Undo replays the previous order through the same render path, so numbers and rows always agree.
undoBtn.addEventListener('click', function () {
  const prev = undoStack.pop(); if (!prev) return;
  render(prev); undoBtn.disabled = undoStack.length === 0;
  note.textContent = 'Undid the last move.';
});
document.getElementById('stSort').addEventListener('click', function () {
  undoStack.push(currentOrder()); undoBtn.disabled = false;
  const score = function (r) { return r.i / r.e; };
  render(ROWS.slice().sort(function (a, b) { return score(b) - score(a); }).map(function (r) { return r.id; }));
  note.textContent = 'Sorted by impact divided by effort. Drag rows to override.';
});

// Keyboard alternative: Alt+ArrowUp/Down moves the focused row (each row is rendered with tabindex=0).
body.addEventListener('keydown', function (e) {
  if (!e.altKey || (e.key !== 'ArrowUp' && e.key !== 'ArrowDown')) return;
  const tr = e.target.closest('tr'); if (!tr) return;
  const other = e.key === 'ArrowUp' ? tr.previousElementSibling : tr.nextElementSibling;
  if (!other) return;
  e.preventDefault();
  undoStack.push(currentOrder()); undoBtn.disabled = false;
  if (e.key === 'ArrowUp') body.insertBefore(tr, other); else body.insertBefore(other, tr);
  renumber(); tr.focus();
});`,

  seo: {
    title: 'SortableJS Sortable Table Rows with Undo — Free JS Snippet',
    description: `A drag-to-rank table built with SortableJS: draggable table rows with a handle, live rank renumbering, a moved-row flash, undo history, sort-by-score and Alt+Arrow keyboard reordering.`,
    about: {
      title: 'SortableJS Sortable Table Rows — HTML, CSS & JavaScript',
      description: `Reordering table rows by drag is one of the most requested interactions in admin tools — prioritised roadmaps, ranked shortlists, playlist and queue editors — and one of the ones that go wrong in interesting ways. Tables have quirks lists do not: a row is not a normal block element, so dragging it can collapse its column widths mid-drag, and the ranking column must stay in step with the visual order. SortableJS treats a tbody as a sortable list, and this snippet shows how to make the whole interaction feel finished.

Making a tbody sortable is one line: Sortable.create(tbody). The handle option restricts drag start to the grip cell, which matters more in tables than elsewhere because rows contain text people want to select. The dragged row's cells keep their widths in modern browsers, and the ghostClass styling has to target td elements rather than the tr — backgrounds on table rows are unreliable, so the CSS colours the cells. The demo uses the native HTML5 drag path; if column widths jump in a browser you support, forceFallback: true moves to Sortable's own drag implementation.

The ranking column is the important detail. After a drag, the numbers must reflect the new order. There are two ways: re-render the whole table, or update just the rank cells. Re-rendering is simple but interrupts the drop animation, so the snippet's renumber() walks the rows and rewrites only the rank text, and the moved row flashes briefly so the eye can find where it landed. A message reports the move — "Dark mode moved from #3 to #1" — which doubles as a live region for screen readers.

Every user-facing reorder tool deserves undo, and this one shows how cheap it can be when order is just a list of ids. onStart snapshots the order, onEnd pushes that snapshot to a history stack, and Undo pops it and re-renders through the same function that drew the table, so ranks and rows cannot disagree. The Sort by score button is a bulk reorder that goes through the same history path, so it too can be undone. Finally, drag-only reordering excludes keyboard users, so Alt with the up or down arrow moves the focused row, with the rows made focusable through tabindex.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag a row', text: 'Drag a row by its grip. The rank numbers update and the moved row flashes.' },
        { title: 'Read the message', text: 'A note below the table says which row moved and from which rank to which.' },
        { title: 'Undo', text: 'Press Undo to restore the previous order. Each move, and each sort, adds a history step.' },
        { title: 'Sort by score', text: 'Press Sort by score to rank by impact over effort, then drag rows to override.' },
        { title: 'Use the keyboard', text: 'Tab to a row and press Alt with the up or down arrow to move it.' },
      ],
    },
    features: [
      'Sortable tbody with a grip-cell drag handle',
      'Rank column renumbered in place, without re-rendering',
      'Moved-row flash and an announcement of the old and new position',
      'Undo history built from order snapshots (onStart and onEnd)',
      'Bulk Sort by score routed through the same undo path',
      'Alt+Arrow keyboard reordering with focusable rows',
      'Cell-level ghost styling because row backgrounds are unreliable',
      'Order modelled as a list of ids, so render and undo are simple',
    ],
    useCases: [
      { icon: '🗺️', title: 'Roadmap prioritisation', desc: 'Rank initiatives by dragging rows by a grip cell, with the rank column renumbered in place and the moved row flashing briefly.' },
      { icon: '🎵', title: 'Playlist and queue editors', desc: 'Reorder items that play or process in sequence, with an announcement of the old and new position for screen readers.' },
      { icon: '🏆', title: 'Shortlists and rankings', desc: 'Rank candidates or options by drag, or sort by score, and use Alt plus Arrow keys to reorder without a mouse.' },
      { icon: '📊', title: 'Full-featured grids', desc: 'Compare with the [Tabulator sortable filterable grid](/ui-snippets/tabulator-sortable-filterable-grid/) when columns, filtering and large data sets matter more than manual ranking.' },
      { icon: '↩️', title: 'Undo history reference', desc: 'Learn a minimal and reliable undo feature built from order snapshots, taken in the `onStart` and `onEnd` hooks of the drag.' },
    ],
    faqs: [
      { q: 'Can SortableJS reorder table rows?', a: 'Yes. Call Sortable.create on the tbody. Use a handle cell so text remains selectable.' },
      { q: 'Why is my dragged table row misaligned?', a: 'Table rows can lose column widths while dragged. Style the ghost through td elements, and try forceFallback: true if a browser misbehaves.' },
      { q: 'How do I keep the rank column in sync?', a: 'In onEnd, loop through the rows and rewrite each rank cell with its index plus one.' },
      { q: 'How do I add undo?', a: 'Snapshot the order in onStart, push it to a stack in onEnd, and on Undo pop it and re-render the table from that list of ids.' },
      { q: 'How do I make row reordering keyboard accessible?', a: 'Make rows focusable and handle a shortcut such as Alt+ArrowUp/Down that moves the row and re-focuses it.' },
      { q: 'How do I read the final order?', a: 'Map over tbody.children and read each row\'s data-id, or use sortable.toArray().' },
      { q: 'Can I use this sortable table in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from SortableJS, so in a framework project install it with npm install sortablejs (or react-sortablejs / vuedraggable) instead of the CDN tag, create it in useEffect / onMounted / ngAfterViewInit, and sync your state from onEnd, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to send the new order to an API, add a redo stack, or animate the rank numbers when they change.`,
      prompt: `Build a drag-to-rank table with SortableJS 1.15 loaded from a CDN.

Requirements:
- Render six roadmap rows in a tbody with a grip cell, a rank cell, initiative, team pill and impact/effort numbers; call Sortable.create on the tbody with handle '.grip' and a ghostClass styled on the td cells.
- In onEnd renumber the rank cells in place, flash the moved row and show a note like "X moved from #a to #b".
- Implement undo using order snapshots taken in onStart and pushed onto a history stack, re-rendering from an array of ids; add a Sort by score button (impact/effort) that also records history.
- Add Alt+ArrowUp/ArrowDown keyboard reordering with focusable rows.`,
    },
  },
};

export default sortablejsSortableTableRows;
