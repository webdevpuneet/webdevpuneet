const kanbanBoard = {
    id: 'kanban-board',
    title: 'Kanban Board',
    category: 'dashboards',
    html: `<div class="board" id="board">
  <div class="col" data-col="todo">
    <div class="col-head"><span class="col-title">To Do</span><span class="col-count" id="c-todo">3</span></div>
    <div class="col-body" id="todo">
      <div class="card" draggable="true" data-id="1"><div class="card-tag blue">Feature</div><p>Design new onboarding flow</p><div class="card-foot"><span>PS</span><span>Aug 3</span></div></div>
      <div class="card" draggable="true" data-id="2"><div class="card-tag yellow">Bug</div><p>Fix mobile nav overflow</p><div class="card-foot"><span>AJ</span><span>Aug 5</span></div></div>
      <div class="card" draggable="true" data-id="3"><div class="card-tag purple">Docs</div><p>Update API documentation</p><div class="card-foot"><span>MB</span><span>Aug 8</span></div></div>
    </div>
  </div>
  <div class="col" data-col="doing">
    <div class="col-head"><span class="col-title">In Progress</span><span class="col-count" id="c-doing">2</span></div>
    <div class="col-body" id="doing">
      <div class="card" draggable="true" data-id="4"><div class="card-tag green">Shipped</div><p>Implement dark mode toggle</p><div class="card-foot"><span>PS</span><span>Aug 1</span></div></div>
      <div class="card" draggable="true" data-id="5"><div class="card-tag blue">Feature</div><p>Build CSV export endpoint</p><div class="card-foot"><span>LK</span><span>Aug 4</span></div></div>
    </div>
  </div>
  <div class="col" data-col="done">
    <div class="col-head"><span class="col-title">Done</span><span class="col-count" id="c-done">2</span></div>
    <div class="col-body" id="done">
      <div class="card done-card" draggable="true" data-id="6"><div class="card-tag gray">Done</div><p>Set up CI/CD pipeline</p><div class="card-foot"><span>MB</span><span>Jul 28</span></div></div>
      <div class="card done-card" draggable="true" data-id="7"><div class="card-tag gray">Done</div><p>Add rate limiting to API</p><div class="card-foot"><span>AJ</span><span>Jul 30</span></div></div>
    </div>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; padding: 24px; }

.board { display: flex; gap: 14px; align-items: flex-start; min-width: max-content; }

.col {
  width: 260px; background: #1e293b;
  border-radius: 14px; border: 1px solid #334155;
  display: flex; flex-direction: column;
}

.col-head { display: flex; align-items: center; justify-content: space-between; padding: 14px 14px 10px; border-bottom: 1px solid #334155; }
.col-title { font-size: 13px; font-weight: 700; color: #f1f5f9; }
.col-count { font-size: 10px; font-weight: 700; background: #334155; color: #64748b; border-radius: 20px; padding: 2px 7px; }

.col-body {
  padding: 10px; display: flex; flex-direction: column; gap: 8px;
  min-height: 120px; transition: background 0.15s;
}
.col-body.drag-over { background: rgba(99,102,241,0.06); border-radius: 0 0 14px 14px; }

.card {
  background: #0f172a; border: 1px solid #334155;
  border-radius: 10px; padding: 12px;
  cursor: grab; user-select: none;
  transition: border-color 0.15s, box-shadow 0.15s, opacity 0.15s;
}
.card:hover { border-color: #6366f1; box-shadow: 0 4px 16px rgba(0,0,0,0.3); }
.card.dragging { opacity: 0.4; cursor: grabbing; }
.done-card p { color: #475569; text-decoration: line-through; }

.card-tag { display: inline-block; font-size: 10px; font-weight: 700; border-radius: 4px; padding: 2px 7px; margin-bottom: 7px; }
.card-tag.blue   { background: rgba(99,102,241,0.15); color: #818cf8; }
.card-tag.yellow { background: rgba(245,158,11,0.15); color: #fbbf24; }
.card-tag.purple { background: rgba(139,92,246,0.15); color: #a78bfa; }
.card-tag.green  { background: rgba(34,197,94,0.15);  color: #4ade80; }
.card-tag.gray   { background: rgba(100,116,139,0.15);color: #64748b; }

.card p { font-size: 12.5px; color: #94a3b8; line-height: 1.5; margin-bottom: 10px; }

.card-foot { display: flex; justify-content: space-between; font-size: 10px; color: #475569; }`,
    js: `let dragged = null;

document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('dragstart', () => { dragged = card; setTimeout(() => card.classList.add('dragging'), 0); });
  card.addEventListener('dragend', () => { card.classList.remove('dragging'); updateCounts(); });
});

document.querySelectorAll('.col-body').forEach(col => {
  col.addEventListener('dragover', e => { e.preventDefault(); col.classList.add('drag-over'); });
  col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
  col.addEventListener('drop', e => {
    e.preventDefault();
    col.classList.remove('drag-over');
    if (dragged) col.appendChild(dragged);
  });
});

function updateCounts() {
  ['todo','doing','done'].forEach(id => {
    document.getElementById('c-'+id).textContent = document.getElementById(id).querySelectorAll('.card').length;
  });
}`,

  seo: {
    title: 'Kanban Board — Free HTML CSS JS Drag & Drop Snippet',
    description: 'Drag-and-drop kanban with HTML5 drag events, three columns and live card-count badges — no library. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Kanban Board — HTML5 Drag-Drop API, dragover/drop Handlers & Column Counts',
      description: `A kanban board is the standard visual tool for tracking work across stages. Cards represent tasks; columns represent stages (To Do, In Progress, Done). Dragging a card from one column to another updates its status. This snippet implements the full drag-and-drop kanban in pure HTML, CSS, and vanilla JavaScript using the HTML5 Drag and Drop API.

**The HTML5 Drag API**

Each card has \`draggable="true"\`. \`dragstart\` stores the card in \`dragged\` and adds \`.dragging\` via a \`setTimeout(() => card.classList.add('dragging'), 0)\` — the delay prevents the ghost image from showing the semi-transparent dragging state. \`dragend\` removes \`.dragging\` and calls \`updateCounts()\`.

Each \`.col-body\` has \`dragover\` (\`e.preventDefault()\` to allow drop) and \`drop\` listeners. The \`drop\` handler calls \`col.appendChild(dragged)\` — moving the card DOM element into the new column.

**Dynamic column card counts**

\`updateCounts()\` iterates each column and reads \`col.querySelectorAll('.card').length\`. It updates the count badge text in each column header. This fires after every drop and on page load.

**The .dragging visual state**

\`.dragging { opacity: 0.4 }\` makes the original card semi-transparent while it is being dragged. The ghost image (shown at the cursor) reflects the card's original appearance. On drop, the full card opacity is restored.

**Adding new cards**

In the HTML panel, copy a \`.card\` div and paste it inside any \`.col-body\`. The drag listeners are attached via \`querySelectorAll('.card')\` on page load — new cards added before that point are picked up automatically.

**The HTML5 drag-and-drop API**

Each card has draggable="true". Three events on the card: dragstart stores the card reference in a draggedCard variable. dragend removes visual drag state. Three events on each column: dragover calls e.preventDefault() — without this, the drop event never fires. dragenter adds a visual highlight to the target column. drop appends draggedCard to the column's card list and calls updateCounts().

**The setTimeout(0) ghost image fix**

When draggable="true" is set and mousedown fires, the browser immediately creates a drag ghost image from the element's current appearance. If .dragging (which typically dims the card) is applied inside dragstart directly, the ghost image captures the dimmed state. Adding .dragging inside a setTimeout(() => card.classList.add('dragging'), 0) delays the visual change to after the ghost image is captured, keeping the ghost looking normal while the original appears dimmed.

**Live column card counts**

updateCounts() iterates each column and counts its .card children: column.querySelectorAll('.card').length. It updates the count badge in the column header. This fires after every drop, keeping counts accurate even with multiple rapid moves.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag a card between columns', text: 'Click and drag any card from one column to another. The card moves to the new column and both column counts update.' },
        { title: 'Update card content', text: 'In the HTML panel, change the card title, description, badge, and metadata text.' },
        { title: 'Add more cards', text: 'Copy a .card div and paste it inside any .col-body. The drag listeners pick it up automatically.' },
        { title: 'Add a fourth column', text: 'Copy a .col div with its header and body. Add it to .board. The flex layout accommodates any number of columns.' },
        { title: 'Change column accent colours', text: 'Update the border-top colour and badge background on each .col-head in the CSS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'HTML5 draggable cards: dragstart stores card, dragend removes .dragging',
      'setTimeout 0 delay before .dragging prevents ghost image showing dimmed state',
      'dragover preventDefault on column body to allow drop',
      'drop appends dragged card to target column — native DOM move',
      '.dragging { opacity: 0.4 } visual feedback on dragged card',
      'updateCounts() reads querySelectorAll(".card").length per column after each drop',
      'Three-column flex layout: To Do, In Progress, Done on dark #0f172a background',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Sprint and project task tracking',  desc: 'Use as a lightweight project board. Cards represent tasks; drag them from To Do to In Progress to Done as work progresses.' },
      { icon: 'FLOW',   title: 'Content production pipelines',      desc: 'Track blog posts, videos, or design assets through stages: Draft, Review, Published. Each column represents a stage in the pipeline.' },
      { icon: 'LEARN',  title: 'Learn the HTML5 Drag and Drop API', desc: 'Edit the dragstart, dragover, and drop handlers in the JS panel to understand how the native drag API works without any library.' },
      { icon: 'DESIGN', title: 'Prototype workflow UIs',            desc: 'Use the kanban as a wireframe for any drag-to-reorder interface — see also the single-list [drag sort list](/ui-snippets/drag-sort-list/) for CRM stages, hiring pipeline, or order fulfilment tracking.' },
      { icon: 'CODE',   title: 'Replace with a React DnD library',  desc: 'Use this snippet to understand the underlying drag API, then migrate to react-beautiful-dnd or dnd-kit for React with keyboard accessibility and touch support.' },
      { icon: 'PEOPLE', title: 'Team task boards in small projects', desc: 'For small teams without Jira or Trello, embed a kanban board directly in a [dashboard layout](/ui-snippets/dashboard-layout/) or project intranet page. localStorage can persist card positions across sessions.' },
      { icon: 'CODE', title: 'Related: Loyalty Program Tier Progress', desc: 'See the [Loyalty Program Tier Progress](/ui-snippets/loyalty-tier-progress/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does drag and drop work without a library?', a: 'HTML5 provides native draggable="true" on elements and dragstart, dragover, drop events. dragstart stores the element. dragover calls e.preventDefault() to signal the element is a valid drop target. drop appends the stored element to the target container.' },
      { q: 'Why is there a setTimeout before adding .dragging?', a: 'The browser captures a ghost image of the element at the moment drag starts. If .dragging (which sets opacity: 0.4) is applied immediately, the ghost image shows the dimmed state. The setTimeout 0 delays the class until after the ghost is captured.' },
      { q: 'How are column counts updated?', a: 'updateCounts() calls querySelectorAll(".card").length on each .col-body after every drop. This counts the actual DOM children in each column, so the count is always accurate regardless of how many cards have been moved.' },
      { q: 'How do I persist card positions with localStorage?', a: 'After each drop, iterate all cards and store their column and position: const state = [...document.querySelectorAll(".card")].map(c => ({ id: c.id, col: c.closest(".col").id })); localStorage.setItem("kanban", JSON.stringify(state));. On load, read and reorder cards based on the saved state.' },
      { q: 'Does drag-and-drop work on mobile?', a: 'The HTML5 Drag API does not support touch events natively. For mobile kanban drag, use a touch event polyfill (drag-touch-polyfill) or migrate to a library like dnd-kit which handles both mouse and touch.' },
      { q: 'Can I use this kanban in React?', a: 'Yes. Click "JSX" for a React component. In React, manage cards as an array in useState with a columnId property. Use onDragStart, onDragOver, onDrop props and update the card array state on drop.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to puzzle out the drag lifecycle by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the setTimeout(() => card.classList.add('dragging'), 0) delay is necessary and what the drag ghost image would look like without it, or why dragover must call e.preventDefault() before drop will ever fire. The same assistant can help optimize it, for example asking whether recomputing updateCounts() with a fresh querySelectorAll on every drop is fine at hundreds of cards or whether it should track counts incrementally instead. It is just as useful for extending the board, such as persisting card positions to localStorage so a refresh does not reset the columns, adding a fourth column with its own accent color, or layering in a touch-friendly fallback since the native HTML5 Drag and Drop API does not support touch events. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drag-and-drop "kanban board" in plain HTML, CSS, and JavaScript using only the native HTML5 Drag and Drop API — no drag library, no framework.

Requirements:
- Three columns (To Do, In Progress, Done), each with a header showing the column name and a live count badge, and a body container that holds draggable card elements.
- Every card must have the draggable attribute set to true. On dragstart, store a reference to the dragged card in a module-level variable, then add a "dragging" class to it only after a setTimeout with a delay of 0 milliseconds, not immediately in the dragstart handler.
- On dragend, remove the "dragging" class from the card and recompute every column's card count.
- Each column body needs a dragover listener that calls preventDefault() (required for the browser to allow a drop at all) and toggles a "drag-over" highlight class, a dragleave listener that removes that highlight, and a drop listener that calls preventDefault, removes the highlight, and appends the stored dragged card into that column body via appendChild — moving the actual DOM node rather than cloning it.
- A count-update function that, after every drop, reads querySelectorAll('.card').length for each column and writes the number into that column's badge element.
- Style the dragging card with reduced opacity so it is visually distinguished while being moved, and explain in a comment why the class is applied on a delay: the browser captures the native drag ghost image synchronously when the drag begins, so applying the dimmed style immediately would bake the dimmed look into the ghost image itself.`,
    },
  }
};

export default kanbanBoard;