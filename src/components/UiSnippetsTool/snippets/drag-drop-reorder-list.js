const dragDropReorderList = {
  id: 'drag-drop-reorder-list',
  title: 'Drag & Drop Reorder List',
  category: 'layouts',
  html: `<ul class="reorder-list" id="reorderList">
  <li class="item" draggable="true" data-id="1">
    <span class="handle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>
    </span>
    <span class="label">Write project proposal</span>
  </li>
  <li class="item" draggable="true" data-id="2">
    <span class="handle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>
    </span>
    <span class="label">Review pull requests</span>
  </li>
  <li class="item" draggable="true" data-id="3">
    <span class="handle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>
    </span>
    <span class="label">Schedule design review</span>
  </li>
  <li class="item" draggable="true" data-id="4">
    <span class="handle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>
    </span>
    <span class="label">Update onboarding docs</span>
  </li>
  <li class="item" draggable="true" data-id="5">
    <span class="handle" aria-hidden="true">
      <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><circle cx="8" cy="6" r="1.6"/><circle cx="16" cy="6" r="1.6"/><circle cx="8" cy="12" r="1.6"/><circle cx="16" cy="12" r="1.6"/><circle cx="8" cy="18" r="1.6"/><circle cx="16" cy="18" r="1.6"/></svg>
    </span>
    <span class="label">Ship v2.3 release</span>
  </li>
</ul>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.reorder-list {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  padding: 12px 14px;
  box-shadow: 0 1px 2px rgba(0,0,0,0.03);
  cursor: grab;
  transition: box-shadow 0.15s, border-color 0.15s;
}
.item:active { cursor: grabbing; }

.item.dragging {
  opacity: 0.4;
}

.item.drag-over-top {
  border-top: 2px solid #6366f1;
}
.item.drag-over-bottom {
  border-bottom: 2px solid #6366f1;
}

.handle {
  color: #cbd5e1;
  display: flex;
  flex-shrink: 0;
}

.label {
  font-size: 14px;
  color: #1e293b;
  font-weight: 500;
}`,
  js: `const list = document.getElementById('reorderList');
let draggedItem = null;

list.addEventListener('dragstart', (e) => {
  draggedItem = e.target.closest('.item');
  draggedItem.classList.add('dragging');
  e.dataTransfer.effectAllowed = 'move';
});

list.addEventListener('dragend', () => {
  if (draggedItem) draggedItem.classList.remove('dragging');
  draggedItem = null;
  clearIndicators();
});

list.addEventListener('dragover', (e) => {
  e.preventDefault();
  const target = e.target.closest('.item');
  if (!target || target === draggedItem) return;

  clearIndicators();
  const rect = target.getBoundingClientRect();
  const isAfter = e.clientY - rect.top > rect.height / 2;
  target.classList.add(isAfter ? 'drag-over-bottom' : 'drag-over-top');
});

list.addEventListener('drop', (e) => {
  e.preventDefault();
  const target = e.target.closest('.item');
  if (!target || target === draggedItem) return;

  const rect = target.getBoundingClientRect();
  const isAfter = e.clientY - rect.top > rect.height / 2;
  target.insertAdjacentElement(isAfter ? 'afterend' : 'beforebegin', draggedItem);
  clearIndicators();
});

function clearIndicators() {
  list.querySelectorAll('.item').forEach((item) => {
    item.classList.remove('drag-over-top', 'drag-over-bottom');
  });
}`,

  seo: {
    title: 'Drag & Drop Reorder List — Free HTML CSS JS Sortable List Snippet',
    description: 'A vertical list you can reorder with native HTML5 drag-and-drop, complete with a drag handle icon and a visual insertion line. No library required.',
    about: {
      title: 'Drag & Drop Reorder List — HTML, CSS & JavaScript Sortable List',
      description: `Task lists, playlists, and priority queues often need to be manually reordered by the user. Rather than reaching for a sortable-list library, the browser already ships everything needed for this: the native **HTML5 Drag and Drop API**, available on any element with a \`draggable="true"\` attribute.

This snippet builds a fully working reorderable list using only that native API plus a handful of DOM events — \`dragstart\`, \`dragover\`, \`drop\`, and \`dragend\` — with **no external sortable library**.

**How dragging an item works**

Every \`<li class="item">\` has \`draggable="true"\`. When a drag begins, the \`dragstart\` listener (attached once, to the list itself, using event delegation via \`e.target.closest('.item')\`) records the dragged element in a \`draggedItem\` variable and adds a \`.dragging\` class that fades it to 40% opacity, giving clear visual feedback about which item is currently being moved.

**How the insertion indicator works**

The interesting part is figuring out *where* to drop the item relative to the row currently under the cursor. On every \`dragover\` event, the code calls \`target.getBoundingClientRect()\` to get the hovered row's position, then compares \`e.clientY\` (the cursor's vertical position) against the row's vertical midpoint: \`e.clientY - rect.top > rect.height / 2\`. If the cursor is in the bottom half of the row, a \`.drag-over-bottom\` class draws a colored line under it; if it's in the top half, \`.drag-over-top\` draws the line above it. This gives the user a precise, continuously updating preview of exactly where the item will land before they release the mouse.

**How the actual reorder happens**

The \`drop\` handler repeats the same top/bottom midpoint check, then uses the native \`insertAdjacentElement('beforebegin' | 'afterend', draggedItem)\` to physically move the dragged \`<li>\` in the DOM relative to the target row. Because \`insertAdjacentElement\` moves an existing node rather than cloning it, there's no need to remove-and-reinsert manually or worry about losing event listeners attached to the item.

**Reading the list order afterward**

To persist the new order, iterate \`list.querySelectorAll('.item')\` after any drop and read each element's \`data-id\` in document order — that gives you the array to send to your backend or save to local storage.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Drag & Drop Reorder List" in the sidebar Library tab. The preview shows five draggable task items.' },
        { title: 'Drag an item', text: 'Press and hold an item, then drag it up or down. Watch the indigo insertion line show exactly where it will land.' },
        { title: 'Drop it', text: 'Release the mouse to drop the item in its new position — the list reorders immediately with no page reload.' },
        { title: 'Add more items', text: 'In the HTML panel, copy an existing <li class="item" draggable="true"> block and give it a unique data-id — no JS changes are needed.' },
        { title: 'Persist the new order', text: 'In the JS panel, add a function that reads querySelectorAll(\'.item\') after each drop and saves the resulting data-id order to your backend or localStorage.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Built entirely on the native HTML5 Drag and Drop API — no sortable-list library',
      'Event delegation on the list container handles dragstart/dragover/drop for any number of items',
      'Insertion indicator line precisely tracks whether the cursor is above or below the hovered row\'s midpoint',
      'insertAdjacentElement moves the real dragged node, preserving any attached listeners or state',
      'Dragged item fades to 40% opacity for clear visual feedback during the drag',
      'Drag handle icon signals draggability without making the entire row feel like a button',
      'Works with any number of list items with zero JavaScript changes',
      'data-id attributes make it trivial to read out the final order after any reorder',
      'No mouse-move polyfills or pointer-event hacks — everything is native browser drag events',
      'No framework, no drag library, no build step required',
    ],
    useCases: [
      { icon: 'TASK', title: 'Task and to-do list prioritization', desc: 'Let users manually reorder a task list to reflect changing priorities, with the new order ready to persist to a backend.' },
      { icon: 'LEARN', title: 'Learn the native Drag and Drop API', desc: 'Study how dragstart, dragover, and drop cooperate with getBoundingClientRect to build a precise reorder interaction without any library.' },
      { icon: 'FLOW', title: 'Prototype playlist or queue reordering', desc: 'Drop this into a media player or admin panel prototype where users need to manually resequence items in a list.' },
      { icon: 'DESIGN', title: 'Match your design system', desc: 'Restyle the item cards, handle icon, and insertion line color to fit your product\'s visual language.' },
      { icon: 'ACCESS', title: 'Layer in keyboard reordering', desc: 'Use this as a base to add Up/Down arrow key handlers as an accessible alternative to mouse-only dragging.' },
      { icon: 'CODE', title: 'Port to React with a library or from scratch', desc: 'Use the JSX export as a reference for the event-handling shape, then either wire it to react-dnd/dnd-kit or keep it dependency-free with the same native events.' },
      { icon: 'CODE', title: 'Related: Grid / List View Toggle', desc: 'See the [Grid / List View Toggle](/ui-snippets/grid-list-view-toggle/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this need a drag-and-drop library like Sortable.js or dnd-kit?', a: 'No. It is built entirely on the browser\'s native HTML5 Drag and Drop API — the draggable attribute plus dragstart, dragover, drop, and dragend events. No external library is loaded.' },
      { q: 'How does the list know whether to insert above or below the hovered row?', a: 'On every dragover event, the code compares the cursor\'s vertical position (e.clientY) against the hovered row\'s vertical midpoint, calculated from getBoundingClientRect(). Above the midpoint inserts before the row; below it inserts after.' },
      { q: 'Why is e.preventDefault() called in the dragover and drop handlers?', a: 'Browsers do not allow dropping on an element by default — calling preventDefault() in dragover is required to signal that this element is a valid drop target, and calling it in drop prevents the browser\'s default action (like navigating to a dragged link).' },
      { q: 'How do I save the new order after a drag?', a: 'After any drop, call list.querySelectorAll(\'.item\') and map each element\'s data-id attribute in document order — that array reflects the current order and can be sent to your backend or saved to localStorage.' },
      { q: 'Does this work on touch devices like phones and tablets?', a: 'The native HTML5 Drag and Drop API has inconsistent touch support across mobile browsers. For a touch-friendly version, use Pointer Events (pointerdown/pointermove/pointerup) instead, tracking position manually rather than relying on native drag events.' },
      { q: 'Can I restrict dragging to just the handle icon instead of the whole row?', a: 'Yes. Remove draggable="true" from the .item and add it to the .handle span instead, then adjust dragstart to walk up to the parent .item with closest(\'.item\') as it already does.' },
      { q: 'Why does the dragged item fade instead of disappearing while dragging?', a: 'Fading with opacity: 0.4 rather than hiding it entirely keeps the list layout stable and gives the user a persistent visual anchor for which item they are moving, matching the behavior users expect from native OS drag interactions.' },
      { q: 'Can I animate the reordering with a smooth transition instead of an instant jump?', a: 'Yes, using the FLIP technique: record each item\'s bounding rect before the reorder, perform the DOM move, then read the new positions and animate from the old position to the new one with a CSS transform transition.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the getBoundingClientRect midpoint comparison in dragover decides between inserting before or after the hovered row, and why insertAdjacentElement is used instead of removing and re-appending the dragged node. Since native HTML5 drag-and-drop has patchy support on touch devices, it's also worth asking the assistant to help you build a Pointer Events-based version for mobile, or to add the FLIP animation technique so reordered items smoothly slide into their new position instead of jumping instantly — both are natural next steps once the base interaction is working.`,
      prompt: `Build a reorderable vertical list in plain HTML, CSS, and JavaScript using only the native HTML5 Drag and Drop API — no sortable-list library.

Requirements:
- A list of items, each with draggable="true", a drag handle icon, a label, and a unique data-id attribute.
- Use event delegation: attach dragstart, dragover, drop, and dragend listeners once on the list container, not on each individual item, using closest('.item') to resolve the actual row from the event target.
- On dragover, compare the cursor's vertical position against the hovered row's vertical midpoint (via getBoundingClientRect) to determine whether the dragged item should land above or below that row, and show a clear visual insertion line indicating the exact drop position — update it continuously as the cursor moves between rows.
- On drop, physically move the dragged element to its new position using insertAdjacentElement so the original DOM node (and any state attached to it) is preserved rather than cloned or recreated.
- Give the currently dragged item a distinct visual state (such as reduced opacity) for the duration of the drag, and clear all insertion-line indicators on dragend regardless of whether a drop succeeded.
- The list must support any number of items with no changes to the JavaScript, and it must be straightforward to read out the final order via each item's data-id after a reorder.`,
    },
  },
};

export default dragDropReorderList;
