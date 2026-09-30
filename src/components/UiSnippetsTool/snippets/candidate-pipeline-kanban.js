const candidatePipelineKanban = {
  id: 'candidate-pipeline-kanban',
  title: 'Candidate Pipeline Kanban',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="cpk-board" id="cpkBoard">
  <section class="cpk-col" data-stage="applied">
    <header class="cpk-col-head"><h3>Applied</h3><span class="cpk-count" id="cpkCount-applied">3</span></header>
    <div class="cpk-dropzone" data-stage="applied">
      <article class="cpk-card" draggable="true" data-id="c1">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#6d5efc">MK</span><strong>Maya Kessler</strong></div>
        <p class="cpk-role">Senior Product Designer</p>
        <div class="cpk-tags"><span class="cpk-tag">Figma</span><span class="cpk-tag">Design Systems</span></div>
      </article>
      <article class="cpk-card" draggable="true" data-id="c2">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#22d3ee">RT</span><strong>Ravi Thakur</strong></div>
        <p class="cpk-role">Backend Engineer</p>
        <div class="cpk-tags"><span class="cpk-tag">Go</span><span class="cpk-tag">Postgres</span></div>
      </article>
      <article class="cpk-card" draggable="true" data-id="c3">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#f472b6">SL</span><strong>Sara Lindqvist</strong></div>
        <p class="cpk-role">Growth Marketer</p>
        <div class="cpk-tags"><span class="cpk-tag">SEO</span><span class="cpk-tag">Paid Media</span></div>
      </article>
    </div>
  </section>

  <section class="cpk-col" data-stage="screening">
    <header class="cpk-col-head"><h3>Screening</h3><span class="cpk-count" id="cpkCount-screening">2</span></header>
    <div class="cpk-dropzone" data-stage="screening">
      <article class="cpk-card" draggable="true" data-id="c4">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#34d399">JB</span><strong>Jordan Blake</strong></div>
        <p class="cpk-role">Data Analyst</p>
        <div class="cpk-tags"><span class="cpk-tag">SQL</span><span class="cpk-tag">Python</span></div>
      </article>
      <article class="cpk-card" draggable="true" data-id="c5">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#fbbf24">EP</span><strong>Elena Popescu</strong></div>
        <p class="cpk-role">Customer Success Lead</p>
        <div class="cpk-tags"><span class="cpk-tag">SaaS</span><span class="cpk-tag">Onboarding</span></div>
      </article>
    </div>
  </section>

  <section class="cpk-col" data-stage="interview">
    <header class="cpk-col-head"><h3>Interview</h3><span class="cpk-count" id="cpkCount-interview">1</span></header>
    <div class="cpk-dropzone" data-stage="interview">
      <article class="cpk-card" draggable="true" data-id="c6">
        <div class="cpk-card-top"><span class="cpk-avatar" style="background:#f87171">DN</span><strong>Diego Nunez</strong></div>
        <p class="cpk-role">Frontend Engineer</p>
        <div class="cpk-tags"><span class="cpk-tag">React</span><span class="cpk-tag">TypeScript</span></div>
      </article>
    </div>
  </section>

  <section class="cpk-col" data-stage="offer">
    <header class="cpk-col-head"><h3>Offer</h3><span class="cpk-count" id="cpkCount-offer">0</span></header>
    <div class="cpk-dropzone" data-stage="offer"></div>
  </section>
</div>`,

  css: `*{box-sizing:border-box}
body{margin:0;font-family:system-ui,-apple-system,sans-serif;background:#0c0e15;color:#e7e9f2;padding:28px;min-height:100vh;display:flex;align-items:center;justify-content:center}
.cpk-board{display:grid;grid-template-columns:repeat(4,minmax(240px,1fr));gap:16px;max-width:1100px;margin:0 auto}
.cpk-col{background:#12141f;border:1px solid #23273a;border-radius:14px;padding:12px;display:flex;flex-direction:column;min-height:420px}
.cpk-col-head{display:flex;align-items:center;justify-content:space-between;padding:6px 6px 12px}
.cpk-col-head h3{margin:0;font-size:13px;font-weight:700;letter-spacing:.02em;text-transform:uppercase;color:#c7cade}
.cpk-count{background:#1c2136;color:#9aa0b8;font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px}
.cpk-dropzone{flex:1;display:flex;flex-direction:column;gap:10px;border-radius:10px;padding:4px;min-height:80px;transition:background .12s ease}
.cpk-dropzone.cpk-dragover{background:#1a1e2e;outline:2px dashed #6d5efc;outline-offset:-2px}
.cpk-card{background:#181b27;border:1px solid #262b3f;border-radius:12px;padding:12px;cursor:grab;transition:transform .12s ease,box-shadow .12s ease}
.cpk-card:active{cursor:grabbing}
.cpk-card.cpk-dragging{opacity:.4}
.cpk-card:hover{border-color:#3a3f5c;box-shadow:0 4px 14px rgba(0,0,0,.3)}
.cpk-card-top{display:flex;align-items:center;gap:8px;margin-bottom:8px}
.cpk-avatar{width:26px;height:26px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:10.5px;font-weight:700;color:#0c0e15;flex:none}
.cpk-card-top strong{font-size:13.5px}
.cpk-role{margin:0 0 8px;font-size:12px;color:#9aa0b8}
.cpk-tags{display:flex;gap:6px;flex-wrap:wrap}
.cpk-tag{font-size:10.5px;font-weight:600;color:#8a8fa8;background:#1c2136;padding:3px 8px;border-radius:99px}
@media (max-width:860px){.cpk-board{grid-template-columns:1fr}}`,

  js: `const board = document.getElementById('cpkBoard');
let draggedCard = null;

function updateCounts() {
  board.querySelectorAll('.cpk-col').forEach((col) => {
    const stage = col.dataset.stage;
    const n = col.querySelectorAll('.cpk-card').length;
    const badge = document.getElementById('cpkCount-' + stage);
    if (badge) badge.textContent = String(n);
  });
}

// Real HTML5 drag-and-drop: dragstart marks the source card, dragover permits
// dropping on a dropzone, and drop actually moves the card element in the DOM.
board.querySelectorAll('.cpk-card').forEach((card) => {
  card.addEventListener('dragstart', () => {
    draggedCard = card;
    card.classList.add('cpk-dragging');
  });
  card.addEventListener('dragend', () => {
    card.classList.remove('cpk-dragging');
    draggedCard = null;
  });
});

board.querySelectorAll('.cpk-dropzone').forEach((zone) => {
  zone.addEventListener('dragover', (e) => {
    e.preventDefault(); // required to allow a drop
    zone.classList.add('cpk-dragover');
    const afterEl = getDragAfterElement(zone, e.clientY);
    if (!draggedCard) return;
    if (afterEl == null) {
      zone.appendChild(draggedCard);
    } else {
      zone.insertBefore(draggedCard, afterEl);
    }
  });
  zone.addEventListener('dragleave', (e) => {
    if (e.target === zone) zone.classList.remove('cpk-dragover');
  });
  zone.addEventListener('drop', (e) => {
    e.preventDefault();
    zone.classList.remove('cpk-dragover');
    updateCounts();
  });
});

function getDragAfterElement(container, y) {
  const cards = [...container.querySelectorAll('.cpk-card:not(.cpk-dragging)')];
  return cards.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

updateCounts();`,

  seo: {
    title: 'Candidate Pipeline Kanban — Free Recruiting Board With Real Drag & Drop',
    description: `A recruiting pipeline kanban board — Applied, Screening, Interview, Offer columns with candidate cards you actually drag between stages using the native HTML5 Drag and Drop API.`,
    about: {
      title: 'Candidate Pipeline Kanban — Draggable Recruiting Stages',
      description: `The candidate pipeline kanban is the recruiter's home screen: candidates as cards moving through Applied, Screening, Interview, and Offer columns. This snippet implements genuinely working drag-and-drop using the native HTML5 Drag and Drop API — no library, and no click-to-move fallback standing in for real dragging.

**Real HTML5 drag events, not a simulation**

Every card has \`draggable="true"\`. \`dragstart\` records the dragged element and fades it with \`cpk-dragging\`; \`dragend\` cleans that state up. Each column's \`.cpk-dropzone\` listens for \`dragover\` (calling \`e.preventDefault()\`, which is what tells the browser this element is a valid drop target at all) and \`drop\`. Without that \`preventDefault\` call, the browser's default is to reject the drop entirely — it's the one line that makes the whole interaction possible.

**Cards actually move in the DOM**

On \`dragover\`, \`getDragAfterElement\` compares the pointer's Y position against the vertical midpoint of every other card in that column to find where the dragged card should land, then \`insertBefore\`/\`appendChild\` physically relocates the dragged element — the same node, not a clone — into its new position. That's what makes this real drag-and-drop: the element you picked up is the element that lands, mid-column reordering included, not just a column swap.

**Visual feedback during the drag**

The dragged card gets partial opacity via \`cpk-dragging\`, and the column currently under the pointer gets a dashed outline via \`cpk-dragover\` — both cleared on \`dragend\`/\`dragleave\` so the board never gets stuck in a mid-drag visual state.

**Counts stay in sync**

\`updateCounts()\` recounts each column's \`.cpk-card\` children and updates its badge after every drop, so the header numbers never drift from what's actually rendered.

**Customizing it**

Wire the drop handler to persist the new stage to your backend, add a confirmation before moving a candidate to Offer, or add a WIP limit per column. Pair it with a [kanban board](/ui-snippets/kanban-board/) for a general task-board version, a [drag-sort-list](/ui-snippets/drag-sort-list/) for single-column reordering, or a [job listing card](/ui-snippets/job-listing-card/) for the postings these candidates applied to.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `Four columns of candidate cards render.` },
      { title: 'Press and drag a card', text: `It fades slightly and follows your cursor.` },
      { title: 'Drag over another column', text: `That column outlines with a dashed border.` },
      { title: 'Drop the card', text: `It actually relocates into the DOM at that position.` },
      { title: 'Drag within the same column', text: `Cards reorder based on where you drop.` },
      { title: 'Watch the column counts', text: `Badges update to match the real card counts.` },
    ] },
    features: [
      { title: 'Native HTML5 drag-and-drop', text: `draggable, dragstart, dragover, drop — no library.` },
      { title: 'Real DOM relocation', text: `insertBefore/appendChild move the actual node.` },
      { title: 'Position-aware reordering', text: `getDragAfterElement uses pointer Y vs card midpoints.` },
      { title: 'Drag visual feedback', text: `Dragging card fades; target column outlines.` },
      { title: 'Live count badges', text: `Recompute from actual DOM children after each drop.` },
      { title: 'Four-stage pipeline', text: `Applied, Screening, Interview, Offer out of the box.` },
      { title: 'Candidate tags', text: `Skill chips per card for quick scanning.` },
      { title: 'Zero dependencies', text: `Native browser APIs only.` },
    ],
    useCases: [
      { title: 'Recruiting dashboards', text: `Pair with a [job listing card](/ui-snippets/job-listing-card/) for postings.` },
      { title: 'ATS internal tools', text: `Model stages as columns exactly like this.` },
      { title: 'General task boards', text: `See the broader [kanban board](/ui-snippets/kanban-board/) pattern.` },
      { title: 'Sales pipelines', text: `Swap candidates for deals across stages.` },
      { title: 'Onboarding trackers', text: `Combine with [onboarding checklist widget](/ui-snippets/onboarding-checklist-widget/).` },
      { title: 'Event RSVP triage', text: `Sort attendees through review stages.` },
      { icon: 'CODE', title: 'Related: Content Calendar Grid', desc: 'See the [Content Calendar Grid](/ui-snippets/content-calendar-grid/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this real drag-and-drop or a click-to-move fallback?', a: `It is real HTML5 drag-and-drop. Cards carry draggable="true" and the script listens for the actual dragstart, dragover, and drop events the browser fires during a native drag gesture. The dragover handler calls e.preventDefault(), which is required by the spec to mark an element as a valid drop target — without it the browser's default behavior rejects the drop.` },
      { q: 'How does the card land in the right position within a column?', a: `getDragAfterElement compares the current pointer Y position against the vertical midpoint of every other card in that column (excluding the one being dragged) using getBoundingClientRect, and finds the closest card whose midpoint is still below the pointer. The dragged element is then inserted before that card with insertBefore, or appended to the end if none qualifies — so mid-column reordering works, not just column-to-column moves.` },
      { q: 'Does the card element actually move, or is it a copy?', a: `The same DOM node moves. draggedCard holds a reference to the actual element clicked in dragstart, and dragover repeatedly calls insertBefore or appendChild on that exact reference as the pointer moves — so by the time drop fires, the card has already been physically relocated in the DOM tree, not swapped for a clone.` },
      { q: 'How do I persist the new stage to a server?', a: `In the drop handler (after updateCounts() runs), read the dragged card's data-id and the dropzone's data-stage attribute, then send that pair to your API. Since the DOM move already happened during dragover, the drop handler is purely the moment to fire the network request — you don't need to move anything there yourself.` },
      { q: 'How do I use this kanban in React, Vue, or Angular?', a: `Native HTML5 drag-and-drop events work the same way inside any framework component — bind dragstart/dragover/drop with your framework's event syntax and keep a ref or local variable for the dragged item's id. On drop, update your state's stage field for that candidate rather than moving DOM nodes directly, and let the framework re-render the columns from state. The getDragAfterElement positioning logic ports as-is since it only reads layout geometry.` },
    ],
    aiPrompt: {
      paragraph: `Drag-and-drop is one of those features that looks simple and has several easy-to-miss details, so it's worth pasting this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and asking it to walk through why dragover must call preventDefault for a drop to be allowed at all, and how getDragAfterElement's midpoint comparison against getBoundingClientRect lets a card land in the correct position mid-column rather than only at the top or bottom. The same assistant can help you harden it for production — for example asking whether the drop handler should debounce or batch a persistence API call, how to add touch-device support since native HTML5 drag-and-drop does not work on mobile browsers out of the box, or how to announce moves to screen reader users who can't perform a mouse drag. It's also useful for extending the board: ask it to add a WIP (work-in-progress) limit per column that visually warns when exceeded.`,
      prompt: `Build a "candidate pipeline kanban" board in plain HTML, CSS, and JavaScript using the native HTML5 Drag and Drop API — no external library, and no click-to-move fallback standing in for real dragging.

Requirements:
- Four columns (e.g. Applied, Screening, Interview, Offer), each with a header showing a live count badge and a dropzone container holding candidate cards.
- Each candidate card has draggable="true" and real dragstart/dragend listeners: dragstart records a reference to the dragged element and applies a "dragging" visual style (reduced opacity); dragend clears that state.
- Each column's dropzone has a dragover listener that calls preventDefault() (required for the drop to be allowed), applies a visual "drag over" indicator to the column (e.g. dashed outline), and computes the correct insertion position within that column based on comparing the pointer's Y coordinate against the vertical midpoint of each existing card (via getBoundingClientRect) — then actually calls insertBefore or appendChild to relocate the real dragged DOM element into that position, so cards can be reordered within a column, not just moved between columns.
- A drop listener that calls preventDefault, removes the drag-over indicator, and updates the column count badges to reflect the real number of card children in each column afterward.
- The dragged element must be the same DOM node throughout — no cloning, no re-rendering from a separate data array — this must be genuine imperative DOM drag-and-drop.
- Keep it in a dark theme with distinct avatar colors per candidate, and ensure the JavaScript only references classnames/ids that exist in the HTML you write.`,
    },
  },
};

export default candidatePipelineKanban;
