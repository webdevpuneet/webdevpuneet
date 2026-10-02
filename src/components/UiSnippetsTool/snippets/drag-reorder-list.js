const dragReorderList = {
  id: 'drag-reorder-list',
  title: 'Drag to Reorder Priority List',
  lastmod: '2026-09-05',
  category: 'layouts',
  cdnUrls: [],
  html: `<div class="dr-wrap">
  <h2 class="dr-heading">Priority List</h2>
  <p class="dr-sub">Drag items to reorder them.</p>
  <ul class="dr-list" id="drList"></ul>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.dr-wrap { width: 100%; max-width: 420px; }
.dr-heading { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
.dr-sub { font-size: 13px; color: #64748b; margin-bottom: 16px; }

.dr-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }

.dr-item {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 10px;
  padding: 12px 14px; display: flex; align-items: center; gap: 10px;
  cursor: grab; font-size: 13.5px; font-weight: 600; color: #1e293b;
  box-shadow: 0 1px 2px rgba(15,23,42,0.04);
  transition: opacity 0.15s, border-color 0.15s;
}
.dr-item:active { cursor: grabbing; }
.dr-item.dr-dragging { opacity: 0.35; }
.dr-handle { color: #cbd5e1; font-size: 16px; line-height: 1; user-select: none; }
.dr-rank { font-size: 11px; font-weight: 800; color: #6366f1; background: #eef2ff; width: 22px; height: 22px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

.dr-placeholder {
  height: 44px; border: 2px dashed #a5b4fc; border-radius: 10px; background: #eef2ff;
}`,
  js: `const listEl = document.getElementById('drList');

const ITEMS = [
  'Ship the v2 onboarding redesign',
  'Fix payment webhook retry bug',
  'Respond to enterprise customer feedback',
  'Write release notes for v2.4',
  'Review Q3 hiring plan',
  'Update API rate-limit documentation',
];

let dragEl = null;

function makePlaceholder() {
  const ph = document.createElement('li');
  ph.className = 'dr-placeholder';
  ph.id = 'drPlaceholder';
  return ph;
}

function renderRanks() {
  const items = listEl.querySelectorAll('.dr-item .dr-rank');
  items.forEach((rankEl, i) => { rankEl.textContent = String(i + 1); });
}

function createItem(text) {
  const li = document.createElement('li');
  li.className = 'dr-item';
  li.draggable = true;
  li.innerHTML = '<span class="dr-rank">0</span><span class="dr-handle">\\u22EE\\u22EE</span><span>' + text + '</span>';

  li.addEventListener('dragstart', (e) => {
    dragEl = li;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', text);
    setTimeout(() => { li.classList.add('dr-dragging'); }, 0);
  });

  li.addEventListener('dragend', () => {
    li.classList.remove('dr-dragging');
    const ph = document.getElementById('drPlaceholder');
    if (ph) ph.remove();
    dragEl = null;
    renderRanks();
  });

  return li;
}

listEl.addEventListener('dragover', (e) => {
  e.preventDefault();
  if (!dragEl) return;

  const afterEl = getDragAfterElement(listEl, e.clientY);
  let ph = document.getElementById('drPlaceholder');
  if (!ph) {
    ph = makePlaceholder();
  }
  if (afterEl == null) {
    listEl.appendChild(ph);
  } else {
    listEl.insertBefore(ph, afterEl);
  }
});

listEl.addEventListener('drop', (e) => {
  e.preventDefault();
  const ph = document.getElementById('drPlaceholder');
  if (ph && dragEl) {
    listEl.insertBefore(dragEl, ph);
    ph.remove();
  }
  renderRanks();
});

function getDragAfterElement(container, y) {
  const items = [...container.querySelectorAll('.dr-item:not(.dr-dragging)')];
  return items.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    }
    return closest;
  }, { offset: Number.NEGATIVE_INFINITY, element: null }).element;
}

ITEMS.forEach((text) => { listEl.appendChild(createItem(text)); });
renderRanks();`,
  seo: {
    title: 'Drag to Reorder Priority List — Free HTML CSS JS Snippet',
    description: 'A vertical priority list you reorder by dragging items, with a live dashed placeholder showing exactly where the item will land. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Drag to Reorder Priority List — HTML5 Drag-and-Drop With Live Placeholder',
      description: `This snippet is a draggable priority list: six items that can be reordered by drag and drop, built entirely on the native HTML5 drag-and-drop API rather than a library like Sortable.js.

**Tracking the dragged element**

Every list item is \`draggable="true"\`. On \`dragstart\`, the item is stored in a module-level \`dragEl\` variable and given a \`.dr-dragging\` class (added on a \`setTimeout(…, 0)\` so the drag ghost image is captured before the opacity change applies). \`dragend\` clears both the class and \`dragEl\`, and removes any leftover placeholder.

**Computing drop position with getDragAfterElement**

The interesting part is figuring out *where* the dragged item would land. \`dragover\` on the list computes the vertical midpoint of every other item and picks the first one whose midpoint is below the cursor's y position — this is the classic "get element after which to insert" technique. A dashed placeholder \`<li>\` is then inserted right at that computed position, giving the user a live visual preview of where the item will drop before they let go.

**Committing the reorder on drop**

The \`drop\` handler simply moves the actual dragged DOM node to where the placeholder currently sits, then removes the placeholder. Because the placeholder was already tracking the correct insertion point throughout the drag, the drop itself is just one DOM move. After every drag ends, \`renderRanks()\` walks the list and rewrites each item's numeric rank badge to match its new position.`,
    },
    features: [
      'Native HTML5 drag-and-drop API with draggable, dragstart, dragover, drop, and dragend handlers',
      'Live dashed placeholder shows exactly where the dragged item will land as the cursor moves',
      'getDragAfterElement midpoint calculation determines insertion position from cursor Y coordinate',
      'Numeric rank badges automatically renumber after every reorder',
      'Faded opacity on the actively dragged item for clear visual feedback',
      'Drag handle icon signals the draggable affordance without extra libraries',
      'Fully self-contained vanilla JS with no external dependencies',
    ],
    useCases: [
      { icon: '✅', title: 'Task and priority managers', desc: 'Let users rank todos or priorities by dragging, with numeric rank badges that renumber automatically after every reorder.' },
      { icon: '📚', title: 'Placeholder-based reordering reference', desc: 'Show a dashed placeholder exactly where the dragged item will land, using `getDragAfterElement` midpoint maths against the cursor\'s Y position.' },
      { icon: '⚙️', title: 'Settings and preference ordering', desc: 'Reorder notification channels or menu items, with native drag events instead of a library such as Sortable.js.' },
      { icon: '🎓', title: 'Drag lifecycle teaching', desc: 'Demonstrate how `dataTransfer` and the dragged element reference work together across the full drag lifecycle from start to drop.' },
    ],
    faqs: [
      { q: 'How does the placeholder know where to appear?', a: 'The dragover handler measures the bounding rectangle of every non-dragging item, compares the cursor Y position against each item\'s vertical midpoint, and inserts the placeholder immediately before the first item whose midpoint sits below the cursor.' },
      { q: 'Does this reorder actual DOM elements or just visual positions?', a: 'The drop handler moves the real dragged <li> element to the placeholder\'s position, so it is an actual DOM reorder, not a purely visual illusion.' },
      { q: 'Why is the dragging class added with setTimeout instead of immediately?', a: 'Some browsers capture the drag ghost image synchronously when dragstart fires. Adding the opacity-reducing class immediately would make the ghost image itself appear faded; deferring it by one tick lets the ghost snapshot the original appearance.' },
      { q: 'Can I use this for more than six items?', a: 'Yes, the ITEMS array can hold any number of strings — the placeholder and rank-numbering logic scale to any list length without changes.' },
    ],
  },
};

export default dragReorderList;
