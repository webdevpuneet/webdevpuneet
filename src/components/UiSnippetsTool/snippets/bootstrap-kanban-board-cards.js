const bootstrapKanbanBoardCards = {
  id: 'bootstrap-kanban-board-cards',
  title: 'Bootstrap Kanban Board with Drag-and-Drop Cards',
  lastmod: '2026-09-09',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="row g-3">
    <div class="col-md-4">
      <div class="bskanban-col" data-status="todo">
        <div class="bskanban-col-head">To Do <span class="badge bg-secondary bskanban-count">2</span></div>
        <div class="bskanban-drop" data-status="todo">
          <div class="card bskanban-card" draggable="true">Design onboarding email</div>
          <div class="card bskanban-card" draggable="true">Audit API rate limits</div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="bskanban-col" data-status="progress">
        <div class="bskanban-col-head">In Progress <span class="badge bg-primary bskanban-count">1</span></div>
        <div class="bskanban-drop" data-status="progress">
          <div class="card bskanban-card" draggable="true">Rebuild settings page</div>
        </div>
      </div>
    </div>
    <div class="col-md-4">
      <div class="bskanban-col" data-status="done">
        <div class="bskanban-col-head">Done <span class="badge bg-success bskanban-count">1</span></div>
        <div class="bskanban-drop" data-status="done">
          <div class="card bskanban-card" draggable="true">Fix login redirect bug</div>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bskanban-col { background: #f6f7f9; border-radius: 10px; padding: 12px; height: 100%; }
.bskanban-col-head { display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #4b5563; margin-bottom: 10px; }
.bskanban-drop { min-height: 60px; display: flex; flex-direction: column; gap: 8px; }
.bskanban-drop.bskanban-over { background: #eef0ff; border-radius: 8px; outline: 2px dashed #6366f1; outline-offset: 2px; }
.bskanban-card { padding: 10px 12px; font-size: 13px; border: 1px solid #eceef1; cursor: grab; }
.bskanban-card.bskanban-dragging { opacity: .4; }`,
  js: `const cards = document.querySelectorAll('.bskanban-card');
const drops = document.querySelectorAll('.bskanban-drop');
let dragged = null;

cards.forEach(card => {
  card.addEventListener('dragstart', () => {
    dragged = card;
    card.classList.add('bskanban-dragging');
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('bskanban-dragging');
    dragged = null;
    updateCounts();
  });
});

drops.forEach(zone => {
  zone.addEventListener('dragover', e => {
    e.preventDefault(); // required so 'drop' actually fires on this element
    zone.classList.add('bskanban-over');
  });
  zone.addEventListener('dragleave', () => zone.classList.remove('bskanban-over'));
  zone.addEventListener('drop', e => {
    e.preventDefault();
    zone.classList.remove('bskanban-over');
    if (dragged) zone.appendChild(dragged);
  });
});

function updateCounts() {
  document.querySelectorAll('.bskanban-col').forEach(col => {
    const count = col.querySelector('.bskanban-drop').children.length;
    col.querySelector('.bskanban-count').textContent = count;
  });
}`,

  seo: {
    title: 'Bootstrap Kanban Board with Drag-and-Drop Cards — Free Snippet',
    description: 'A real Bootstrap 5.3 kanban board where cards actually drag between columns using the native HTML5 Drag and Drop API, with a live per-column count.',
    about: {
      title: 'Bootstrap Kanban Board with Drag-and-Drop Cards — HTML, CSS & JavaScript',
      description: `This kanban board uses the browser's **native HTML5 Drag and Drop API** — \`draggable="true"\` on every card, plus \`dragstart\`/\`dragend\`/\`dragover\`/\`drop\` event listeners — rather than a third-party drag library, built on **real Bootstrap 5.3** cards and grid columns underneath. The one easy-to-miss requirement: a drop zone's \`dragover\` handler must call \`e.preventDefault()\`, since the browser's default behavior is to **reject** drops everywhere; without that one line, nothing would ever actually drop.\n\nDropping a card is genuinely simple once that's in place — \`zone.appendChild(dragged)\` moves the real dragged element into the target column, and a shared \`updateCounts()\` function re-reads how many cards each column actually contains and updates its badge, called after every drag ends so the counts can never go stale.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads three columns: To Do (2), In Progress (1), Done (1).' },
        { title: 'Drag a card', text: 'Click and drag any card — the column you drag over highlights with a dashed outline.' },
        { title: 'Drop it in a different column', text: 'The card moves there for real, and both columns\' counts update to reflect the new totals.' },
        { title: 'Drag it back', text: 'Cards can move between any columns in any direction, any number of times.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 card and grid components as the board structure',
      'Genuine native HTML5 Drag and Drop — no drag-and-drop library required',
      'Drop zones highlight visually while a card is dragged over them',
      'Live per-column card counts, recalculated from the actual DOM after every drop',
      'Cards can move freely between any columns, any number of times',
      'Dragged card dims to reduced opacity while in motion for clear visual feedback',
    ],
    useCases: [
      { icon: 'DASH',  title: 'Project management and task boards', desc: 'The standard To Do / In Progress / Done kanban pattern, built with only native browser APIs and real Bootstrap components.' },
      { icon: 'LEARN', title: 'Learning the native HTML5 Drag and Drop API', desc: 'A clear, minimal example of the dragstart/dragover/drop event sequence, including the easy-to-miss preventDefault() requirement.' },
      { icon: 'CODE',  title: 'Internal tools and lightweight project trackers', desc: 'A genuinely functional starting point for a small team\'s task board without pulling in a drag-and-drop dependency.' },
      { icon: 'FLOW',  title: 'Sales pipelines and any staged workflow', desc: 'Relabel the three columns for a sales pipeline, hiring pipeline, or any process with discrete stages.' },
    ],
    faqs: [
      { q: 'Is this using a drag-and-drop library?', a: 'No — it uses the browser\'s native HTML5 Drag and Drop API directly (draggable="true" plus dragstart/dragover/drop event listeners), no external library required.' },
      { q: 'Why does dragover need e.preventDefault()?', a: 'Browsers reject drops on any element by default. Calling preventDefault() inside the dragover handler is what tells the browser this element is a valid drop target — without it, the drop event never fires at all, no matter how the card is released.' },
      { q: 'How do the column counts stay accurate?', a: 'updateCounts() re-reads how many card elements each column\'s drop zone actually contains and updates its badge, called every time a drag ends — so it\'s always counting the real current DOM state, not tracking increments/decrements separately.' },
      { q: 'Does this work on touch devices like tablets?', a: 'Native HTML5 drag and drop has inconsistent touch support across browsers. For reliable mobile drag-and-drop, consider adding pointer-event-based dragging as a fallback or replacement.' },
      { q: 'Can I add a fourth column?', a: 'Yes — copy a .col-md-4 block with its own data-status and a fresh .bskanban-drop zone; the drag/drop event listeners are attached generically to every .bskanban-drop element, so a new one works immediately.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to persist card positions to localStorage so the board state survives a page reload, or to add a "+ Add card" input at the bottom of each column. It's also a good exercise to ask the assistant to add pointer-event-based touch support for mobile drag-and-drop as a fallback.`,
      prompt: `Build a Bootstrap 5.3 kanban board with drag-and-drop cards, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Three columns (e.g. To Do, In Progress, Done) built with Bootstrap's grid, each containing a drop zone with a few real Bootstrap cards, and a live count badge showing how many cards are currently in that column.
- Implement dragging using the native HTML5 Drag and Drop API (draggable="true" on cards, with dragstart/dragend/dragover/drop event listeners) — do not use a third-party drag-and-drop library.
- Drop zones must visually highlight (e.g. a dashed outline) while a card is being dragged over them, and correctly call preventDefault() in the dragover handler so drops are actually accepted.
- Dropping a card on a different column's drop zone must genuinely move that card element there, and the per-column count badges must update to reflect the real card count in each column after every move.`,
    },
  },
};

export default bootstrapKanbanBoardCards;
