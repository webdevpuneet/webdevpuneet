const bootstrapDragToReorderList = {
  id: 'bootstrap-drag-to-reorder-list',
  title: 'Bootstrap Drag-to-Reorder List',
  lastmod: '2026-09-11',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsdrag-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Priority order</h6>
      <ul class="list-unstyled mb-0" id="bsdragList"></ul>
      <p class="small text-muted mt-2 mb-0">Drag the handle to reorder.</p>
    </div>
  </div>
</div>`,
  css: `.bsdrag-card { width: 340px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsdrag-row {
  display: flex; align-items: center; gap: 10px; padding: 9px 6px;
  border-radius: 8px; background: #fff; margin-bottom: 4px; border: 1px solid #eceef1;
}
.bsdrag-handle { cursor: grab; color: #9ca3af; font-size: 14px; user-select: none; }
.bsdrag-row.bsdrag-dragging { opacity: .4; }
.bsdrag-row.bsdrag-over { border-top: 2px solid #6366f1; }
.bsdrag-rank { font: 700 11px ui-monospace, monospace; color: #9ca3af; width: 16px; }`,
  js: `let items = [
  { id: 1, text: 'Fix checkout bug' },
  { id: 2, text: 'Ship dark mode' },
  { id: 3, text: 'Write Q3 report' },
  { id: 4, text: 'Onboard new hire' },
];

const list = document.getElementById('bsdragList');
let draggedId = null;

function render() {
  list.innerHTML = items.map((item, i) =>
    '<li class="bsdrag-row" draggable="true" data-id="' + item.id + '">' +
      '<span class="bsdrag-handle">&#9776;</span>' +
      '<span class="bsdrag-rank">' + (i + 1) + '</span>' +
      '<span>' + item.text + '</span>' +
    '</li>'
  ).join('');
}

list.addEventListener('dragstart', e => {
  const row = e.target.closest('.bsdrag-row');
  if (!row) return;
  draggedId = Number(row.dataset.id);
  row.classList.add('bsdrag-dragging');
  e.dataTransfer.effectAllowed = 'move';
});

list.addEventListener('dragend', () => {
  document.querySelectorAll('.bsdrag-row').forEach(r => r.classList.remove('bsdrag-dragging', 'bsdrag-over'));
  draggedId = null;
});

list.addEventListener('dragover', e => {
  // Required: without preventDefault() here, the browser refuses the drop
  // entirely and no "drop" event ever fires on this element.
  e.preventDefault();
  const row = e.target.closest('.bsdrag-row');
  document.querySelectorAll('.bsdrag-row').forEach(r => r.classList.remove('bsdrag-over'));
  if (row && Number(row.dataset.id) !== draggedId) row.classList.add('bsdrag-over');
});

list.addEventListener('drop', e => {
  e.preventDefault();
  const targetRow = e.target.closest('.bsdrag-row');
  if (!targetRow || draggedId === null) return;
  const targetId = Number(targetRow.dataset.id);
  if (targetId === draggedId) return;

  const fromIndex = items.findIndex(i => i.id === draggedId);
  const toIndex = items.findIndex(i => i.id === targetId);
  const [moved] = items.splice(fromIndex, 1);
  items.splice(toIndex, 0, moved);
  render();
});

render();`,

  seo: {
    title: 'Bootstrap Drag-to-Reorder List — Free HTML CSS JS Snippet',
    description: 'A real drag-and-drop reorderable list built with Bootstrap 5.3 and the genuine native HTML5 Drag and Drop API — a live rank number per row, a clear drop-target indicator, and array splicing that keeps order exactly right.',
    about: {
      title: 'Bootstrap Drag-to-Reorder List — HTML, CSS & JavaScript',
      description: `This uses the browser's actual native HTML5 Drag and Drop API — \`draggable="true"\` on each row plus \`dragstart\`/\`dragover\`/\`drop\` listeners — rather than a pointer-events-based reimplementation, the same approach this collection's [bootstrap-kanban-board-cards](/ui-snippets/bootstrap-kanban-board-cards/) uses for moving cards between columns, applied here to reordering within a single list instead.\n\nThe one line that's easy to leave out and silently breaks everything is \`e.preventDefault()\` inside the \`dragover\` handler — without it, the browser's default behavior refuses the drop entirely, and the \`drop\` event never fires on the element at all, no matter how correct the rest of the drop logic is.\n\nThe actual reordering is a genuine array move, not a DOM-only shuffle: \`items.splice(fromIndex, 1)\` removes the dragged item from its old position, and \`items.splice(toIndex, 0, moved)\` reinserts it at the new one, then \`render()\` rebuilds the whole list from that updated array — including the visible rank number next to each row, which is what makes the numbers 1 through 4 always correctly reflect the list's true current order rather than needing separate logic to keep them in sync with whatever the drag-and-drop just did visually.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Four priority items list in order, each numbered 1 through 4 with a drag handle icon.' },
        { title: 'Press and drag the handle on item 3', text: 'It fades to semi-transparent while dragging, and rows show a blue top border as you hover over a valid drop target.' },
        { title: 'Drop it above item 1', text: 'The list reorders immediately, and every row\'s rank number updates to reflect the new true order.' },
        { title: 'Drag item 1 (now originally item 3) down to the bottom', text: 'It moves correctly, and the numbering stays accurate throughout.' },
        { title: 'Try dropping an item onto itself', text: 'Nothing changes — dropping a row where it already is is correctly treated as a no-op.' },
      ],
    },
    features: [
      'Uses the genuine native HTML5 Drag and Drop API, not a custom pointer-events reimplementation',
      'Reordering is a real array splice-out/splice-in, not a purely visual DOM shuffle disconnected from the data',
      'Rank numbers are rendered from the array\'s live order, always accurate after every reorder',
      'A clear visual drop-target indicator shows exactly where an item would land before releasing',
      'Dropping an item onto its own current position is correctly treated as a no-op',
    ],
    useCases: [
      { icon: 'FORM', title: 'Priority lists, to-do ordering, and custom sort preferences', desc: 'Pairs with [bootstrap-todo-list-app](/ui-snippets/bootstrap-todo-list-app/) for a fully reorderable task list.' },
      { icon: 'APP', title: 'Letting a reorder be undone as easily as a delete', desc: 'Pair with [bootstrap-undo-action-toast](/ui-snippets/bootstrap-undo-action-toast/) so removing an item from this same list offers the same safety net as reordering it does.' },
      { icon: 'DASH', title: 'Dashboard widget or navigation menu ordering', desc: 'Let a user customize the order of items in a settings or layout-configuration screen.' },
      { icon: 'APP', title: 'Playlist, queue, and step-ordering interfaces', desc: 'Any list where the sequence itself carries meaning benefits from a direct drag-to-reorder interaction.' },
    ],
    faqs: [
      { q: 'Why is e.preventDefault() required inside the dragover handler?', a: 'Browsers refuse a drop by default unless something explicitly opts in during dragover — omitting that one call means the drop event never fires at all on that element, regardless of how correct the rest of the drop-handling logic is.' },
      { q: 'Does the visual order after dragging match the actual underlying data order?', a: 'Yes — the reorder is a real Array.splice() operation on the items array itself, and render() rebuilds the entire list (including the rank numbers) from that array afterward, so the visible order is never just a disconnected DOM rearrangement.' },
      { q: 'Does this work on touch devices?', a: 'The native HTML5 Drag and Drop API has inconsistent and often poor support on mobile touch browsers; a production implementation targeting mobile should use a pointer-events-based drag library or fallback instead of relying on this API alone.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep items as an array in component state, and perform the same splice-based reorder inside your drop handler, updating state immutably (a new array, not a mutated one) per your framework\'s conventions.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add touch-friendly reordering (e.g. via Pointer Events, since native HTML5 drag-and-drop is unreliable on mobile) as a fallback for touch devices, or to add keyboard-accessible reordering (e.g. Alt+ArrowUp/ArrowDown to move the focused item) as an alternative to mouse-only dragging.`,
      prompt: `Build a Bootstrap 5.3 drag-to-reorder list, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card, and the browser's native HTML5 Drag and Drop API for the actual reordering — not a custom pointer-events reimplementation.

Requirements:
- A list of at least 4 items, each with draggable="true", a visible drag handle, and a rank number showing its current position.
- Implement dragstart (marking the dragged row and storing its id), dragover (calling preventDefault so the drop is actually accepted, and showing a visual indicator on the row currently being hovered over), dragend (clearing all drag-related visual state), and drop (performing the actual reorder).
- The reorder itself must be a real array operation — remove the dragged item from its old index and reinsert it at the dropped-on item's index — followed by a full re-render of the list from that updated array, so the rank numbers shown always reflect the array's true current order.
- Dropping an item onto its own current position must be a no-op with no visible change.`,
    },
  },
};

export default bootstrapDragToReorderList;
