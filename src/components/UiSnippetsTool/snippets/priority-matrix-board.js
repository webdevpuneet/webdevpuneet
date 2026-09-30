const priorityMatrixBoard = {
  id: 'priority-matrix-board',
  title: 'Priority Matrix Board',
  lastmod: '2026-06-20',
  category: 'dashboards',
  html: `<div class="pmb-card">
  <div class="pmb-head">
    <h3>Priority matrix</h3>
    <span>Drag tasks between quadrants</span>
  </div>
  <div class="pmb-axis-label pmb-axis-top">Important</div>
  <div class="pmb-grid">
    <div class="pmb-quad" data-q="do" style="--c:#22c55e">
      <div class="pmb-quad-head">Do first <span>Urgent + Important</span></div>
      <div class="pmb-list" data-q="do"></div>
    </div>
    <div class="pmb-quad" data-q="schedule" style="--c:#6366f1">
      <div class="pmb-quad-head">Schedule <span>Not urgent + Important</span></div>
      <div class="pmb-list" data-q="schedule"></div>
    </div>
    <div class="pmb-quad" data-q="delegate" style="--c:#f59e0b">
      <div class="pmb-quad-head">Delegate <span>Urgent + Not important</span></div>
      <div class="pmb-list" data-q="delegate"></div>
    </div>
    <div class="pmb-quad" data-q="delete" style="--c:#94a3b8">
      <div class="pmb-quad-head">Delete <span>Not urgent + Not important</span></div>
      <div class="pmb-list" data-q="delete"></div>
    </div>
  </div>
  <div class="pmb-axis-label pmb-axis-bottom">Urgent</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pmb-card{background:#fff;border-radius:18px;padding:20px;width:100%;max-width:560px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.pmb-head{margin-bottom:10px}
.pmb-head h3{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:2px}
.pmb-head span{font-size:11.5px;color:#94a3b8;font-weight:600}

.pmb-axis-label{text-align:center;font-size:10.5px;font-weight:800;color:#cbd5e1;text-transform:uppercase;letter-spacing:.06em}
.pmb-axis-top{margin-bottom:4px}
.pmb-axis-bottom{margin-top:6px}

.pmb-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.pmb-quad{background:#f8fafc;border:1.5px solid #f1f5f9;border-top:3px solid var(--c);border-radius:12px;padding:10px;min-height:150px}
.pmb-quad-head{font-size:12px;font-weight:800;color:#1e293b;margin-bottom:8px}
.pmb-quad-head span{display:block;font-size:10px;font-weight:600;color:#94a3b8;margin-top:1px}

.pmb-list{display:flex;flex-direction:column;gap:6px;min-height:60px;border-radius:8px;transition:background .12s}
.pmb-list.drag-over{background:rgba(99,102,241,.08)}

.pmb-task{background:#fff;border:1px solid #e2e8f0;border-radius:8px;padding:8px 10px;font-size:12px;font-weight:600;color:#334155;
  cursor:grab;box-shadow:0 1px 3px rgba(15,23,42,.06);transition:opacity .15s,transform .15s}
.pmb-task:active{cursor:grabbing}
.pmb-task.dragging{opacity:.3;transform:scale(.96)}`,

  js: `var TASKS = [
  { id: 1, text: 'Fix production login bug', q: 'do' },
  { id: 2, text: 'Plan next quarter roadmap', q: 'schedule' },
  { id: 3, text: 'Reply to client escalation', q: 'do' },
  { id: 4, text: 'Review pull requests', q: 'delegate' },
  { id: 5, text: 'Organize the shared drive', q: 'delete' },
  { id: 6, text: 'Write Q3 performance reviews', q: 'schedule' },
  { id: 7, text: 'Approve expense reports', q: 'delegate' },
  { id: 8, text: 'Clean up old Slack channels', q: 'delete' },
];

var dragId = null;

function render() {
  document.querySelectorAll('.pmb-list').forEach(function (list) {
    var q = list.dataset.q;
    list.innerHTML = TASKS.filter(function (t) { return t.q === q; }).map(function (t) {
      return '<div class="pmb-task" draggable="true" data-id="' + t.id + '">' + t.text + '</div>';
    }).join('');
  });
  attachTaskHandlers();
}

function attachTaskHandlers() {
  document.querySelectorAll('.pmb-task').forEach(function (task) {
    task.addEventListener('dragstart', function () {
      dragId = +task.dataset.id;
      task.classList.add('dragging');
    });
    task.addEventListener('dragend', function () {
      task.classList.remove('dragging');
    });
  });
}

document.querySelectorAll('.pmb-list').forEach(function (list) {
  list.addEventListener('dragover', function (e) {
    e.preventDefault();
    list.classList.add('drag-over');
  });
  list.addEventListener('dragleave', function () {
    list.classList.remove('drag-over');
  });
  list.addEventListener('drop', function (e) {
    e.preventDefault();
    list.classList.remove('drag-over');
    if (dragId === null) return;
    var task = TASKS.find(function (t) { return t.id === dragId; });
    if (task) task.q = list.dataset.q;
    dragId = null;
    render();
  });
});

render();`,

  seo: {
    title: 'Priority Matrix Board — Eisenhower Drag-and-Drop',
    description: `A 2×2 Eisenhower priority matrix (Do/Schedule/Delegate/Delete) with tasks draggable between quadrants. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Priority Matrix Board — Eisenhower Quadrants with Native Drag-and-Drop Tasks',
      description: `The Eisenhower Matrix — sorting work into Urgent/Important, Important/Not Urgent, Urgent/Not Important, and neither — is one of the most widely taught prioritization frameworks precisely because the four-quadrant layout makes "what should I actually work on" visually obvious in a way a flat to-do list never can. This snippet builds the matrix as a real drag-and-drop board: four labeled quadrants, each a native drop target, holding draggable task cards that move freely between them.

**Four drop zones, one shared drag implementation**

Every quadrant's task list is an independent native HTML5 drop target wired to the same three events (\`dragover\`, \`dragleave\`, \`drop\`), and every task card is a draggable element wired to \`dragstart\`/\`dragend\` — the same underlying API used by this library's [image reorder grid](/ui-snippets/image-reorder-grid/), applied here across multiple distinct containers instead of within a single grid. Because the drop handler only needs to know *which quadrant* it belongs to (read from \`list.dataset.q\`), the same generic logic handles all four zones without four separate near-duplicate handlers.

**A task's quadrant is a property, not a list membership**

Rather than storing four separate arrays (one per quadrant) and physically moving an object between them, every task has a single \`q\` field holding its current quadrant id, and \`render()\` simply filters the one shared \`TASKS\` array by quadrant for each list. Dropping a task onto a new quadrant is therefore a one-line mutation (\`task.q = list.dataset.q\`) followed by a full re-render — there's no risk of a task accidentally existing in two lists at once or vanishing during a move, a real bug class with the multi-array approach.

**Color-coded quadrant headers reinforce the framework**

Each quadrant has a colored top border and label pair — "Do first" in green for urgent-and-important, "Schedule" in indigo, "Delegate" in amber, "Delete" in gray — set via a CSS custom property (\`--c\`) per quadrant, so the visual hierarchy (green = act now, gray = least important) reads correctly even before a user reads the quadrant's full description text.

**Drop-target highlighting per list**

Hovering a dragged task over any quadrant's list (not just over an existing task) highlights that entire list with a subtle tinted background via \`.drag-over\` — crucial for an empty quadrant, which has no task cards to hover over but still needs to show it's a valid drop target.

**The matrix forces a decision a flat list avoids**

A plain to-do list lets "urgent-feeling but unimportant" busywork sit at the same visual level as the one task that actually matters, because nothing forces you to weigh importance against urgency before adding an item. The matrix's four labeled quadrants make that judgment call unavoidable at the moment a task is placed (or dragged elsewhere), which is the entire reason this 1950s framework still gets taught in every productivity course written since.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 2×2 matrix renders with "Important" and "Urgent" axis labels and eight example tasks distributed across the four quadrants.` },
      { title: 'Drag a task', text: `Click and hold any task card — it fades and shrinks slightly to show it's being dragged.` },
      { title: 'Hover a different quadrant', text: `That quadrant's task list highlights with a tinted background, even if it's currently empty.` },
      { title: 'Drop the task', text: `Release over the target quadrant — the task moves there instantly and both quadrants' lists update.` },
      { title: 'Add your own tasks', text: `Push a new { id, text, q } object into the TASKS array and call render() to add it to the matrix in its starting quadrant.` },
      { title: 'Persist quadrant assignments', text: `After a drop, send each task's id and updated q value to your backend so the matrix layout survives a page reload.` },
    ] },
    features: [
      { title: 'Four real drop targets', text: `Every quadrant is an independent native HTML5 drop zone, all driven by the same shared, generic drag/drop handlers.` },
      { title: 'Single source of truth per task', text: `A task's quadrant is one field (q) on a shared array, eliminating the risk of duplicate or lost tasks during a move.` },
      { title: 'Color-coded quadrant priority', text: `Each quadrant's accent color (green, indigo, amber, gray) visually reinforces its urgency/importance combination.` },
      { title: 'Empty-quadrant-safe drop highlighting', text: `The entire list area highlights on drag-over, not just existing cards, so empty quadrants are still valid, visible drop targets.` },
      { title: 'Re-render from filtered data', text: `Each quadrant's visible tasks are simply TASKS filtered by quadrant — no manual DOM node moving between containers.` },
      { title: 'Axis labels for framework context', text: `"Important" and "Urgent" axis labels frame the four quadrants within the actual Eisenhower Matrix logic.` },
      { title: 'Lightweight, dependency-free drag-and-drop', text: `Built entirely on native browser drag events — no sorting library needed for a multi-container board.` },
      { title: 'Easy to extend with more metadata', text: `Each task object can carry additional fields (due date, assignee) without changing the core quadrant-filtering logic.` },
    ],
    useCases: [
      { title: 'Personal task and time management', text: `The classic individual productivity use of the Eisenhower Matrix for daily or weekly planning.` },
      { title: 'Team sprint and triage planning', text: `Sort incoming requests or bugs into urgency/importance quadrants during a planning or triage meeting.` },
      { title: 'Product and feature prioritization', text: `Relabel quadrants as Impact/Effort and use the same drag-and-drop matrix for a feature prioritization workshop.` },
      { title: 'Project management tool integrations', text: `Offer a matrix view alongside a [Kanban board](/ui-snippets/kanban-board/) as an alternate way to triage the same task list.` },
      { title: 'Coaching and productivity apps', text: `Teach the Eisenhower framework interactively rather than as a static diagram.` },
      { title: 'Learning multi-container drag-and-drop', text: `A clear example of one generic drop handler serving several distinct containers — pair with a [drag-sort list](/ui-snippets/drag-sort-list/) for a single-list variant.` },
    ],
    faqs: [
      { q: 'How do I persist quadrant assignments to a server?', a: `In the drop handler, after task.q is updated, send that task's id and new q value to your backend with a fetch PATCH call, so reloading the page can restore each task to its last-dropped quadrant instead of resetting to the static TASKS array.` },
      { q: 'How do I reorder tasks within the same quadrant, not just move between quadrants?', a: `Track a drop position within the target list (similar to the index-based splice logic in the image reorder grid snippet) in addition to the quadrant change, and insert the dragged task at that specific position in a quadrant-filtered, order-preserving array rather than just appending it.` },
      { q: 'How do I add a due date or assignee to each task card?', a: `Add the fields to each task object (e.g. due, assignee) and extend the template string in render() to display them on the card — the filtering and drag-and-drop logic doesn't need to change since it only depends on the q field.` },
      { q: 'How do I support touch devices for dragging?', a: `The native HTML5 Drag and Drop API has inconsistent touch support; add touchstart/touchmove/touchend listeners that track the dragged card's position and manually detect which quadrant's bounding box the finger is over on release, calling the same task.q update and render() used by the desktop drop handler.` },
      { q: 'How do I use this priority matrix in React, Vue, or Angular?', a: `In React, keep tasks in useState and update a task's q on drop via setTasks with a mapped array; in Vue, mutate a reactive tasks array directly; in Angular, use a component array field updated the same way. Filtering tasks per quadrant for rendering is a simple .filter() call in every framework's templating syntax.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the shared drag-and-drop wiring by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why every task's quadrant is stored as a single q field on one shared array instead of four separate arrays, and how that design choice makes the generic dragover/drop handlers safe against a task ending up duplicated or lost during a move. The same assistant can help optimize it, for example checking whether re-rendering all four quadrant lists on every single drop is wasteful once the task count grows large, or whether the drag-over highlight logic correctly handles a fast drag that crosses multiple quadrants quickly. It's also useful for extending the effect: ask it to add within-quadrant reordering (not just moving between quadrants), persist each task's quadrant to a backend after every drop, or add touch event support since native HTML5 drag-and-drop has inconsistent mobile behavior. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an Eisenhower Matrix priority board with drag-and-drop tasks in plain HTML, CSS, and vanilla JavaScript using the native HTML5 Drag and Drop API — no sorting library.

Requirements:
- A 2x2 grid of four labeled quadrants (for example Do first, Schedule, Delegate, Delete), each with its own accent color and a short description of what urgency/importance combination it represents, plus axis labels framing the grid (Important on one side, Urgent on the other).
- A single shared array of task objects, where each task has a unique id, a text label, and one field indicating which quadrant it currently belongs to — do not use four separate arrays, one per quadrant.
- Render each quadrant's visible tasks by filtering the one shared array down to tasks whose quadrant field matches that quadrant's id, re-rendering all four lists together whenever the underlying data changes.
- Make every task element draggable using the native draggable attribute and dragstart/dragend events (fading and slightly shrinking the element while it's being dragged), and make every quadrant's task-list container a valid drop target using dragover (with preventDefault so drop is allowed), dragleave, and drop events — implemented once generically so the same handler logic works for all four quadrants by reading which quadrant a list belongs to from a data attribute.
- On a successful drop, update only the single quadrant field on the dropped task's object (not any array membership), then re-render every quadrant's filtered list.
- While dragging over any quadrant's list area, highlight that entire list container (not just individual task cards) with a distinct background tint, so even an empty quadrant is visibly a valid drop target, and remove the highlight when the drag leaves or completes.`,
    },
  },
};

export default priorityMatrixBoard;
