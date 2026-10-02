const transferList = {
  id: 'transfer-list',
  title: 'Transfer List',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="tl" id="tl">
  <div class="tl-side">
    <div class="tl-head"><span>Available</span><span class="tl-count" data-for="available">0</span></div>
    <input class="tl-search" type="search" placeholder="Filter…" data-list="available" aria-label="Filter available">
    <ul class="tl-box" data-list="available" role="listbox" aria-multiselectable="true"></ul>
  </div>

  <div class="tl-controls">
    <button type="button" class="tl-btn" data-act="add-all" title="Move all right">&raquo;</button>
    <button type="button" class="tl-btn" data-act="add" title="Move selected right">&rsaquo;</button>
    <button type="button" class="tl-btn" data-act="remove" title="Move selected left">&lsaquo;</button>
    <button type="button" class="tl-btn" data-act="remove-all" title="Move all left">&laquo;</button>
  </div>

  <div class="tl-side">
    <div class="tl-head"><span>Selected</span><span class="tl-count" data-for="selected">0</span></div>
    <input class="tl-search" type="search" placeholder="Filter…" data-list="selected" aria-label="Filter selected">
    <ul class="tl-box" data-list="selected" role="listbox" aria-multiselectable="true"></ul>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:36px 16px}

.tl{display:flex;align-items:stretch;gap:12px;background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:16px;box-shadow:0 12px 34px -22px rgba(0,0,0,.3)}
.tl-side{display:flex;flex-direction:column;width:200px}
.tl-head{display:flex;justify-content:space-between;align-items:center;font-size:12px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#64748b;margin-bottom:8px}
.tl-count{background:#eef2ff;color:#4f46e5;border-radius:20px;padding:1px 8px;font-size:11px}
.tl-search{border:1px solid #e2e8f0;border-radius:8px;padding:6px 10px;font-size:12.5px;font-family:inherit;margin-bottom:8px;outline:none}
.tl-search:focus{border-color:#6366f1}
.tl-box{list-style:none;flex:1;min-height:220px;max-height:220px;overflow-y:auto;border:1px solid #e2e8f0;border-radius:10px;padding:6px}
.tl-item{padding:7px 10px;border-radius:7px;font-size:13px;font-weight:500;cursor:pointer;user-select:none;transition:background .12s}
.tl-item:hover{background:#f8fafc}
.tl-item.tl-sel{background:#eef2ff;color:#4338ca;font-weight:600}

.tl-controls{display:flex;flex-direction:column;justify-content:center;gap:8px}
.tl-btn{width:38px;height:34px;border:1px solid #e2e8f0;background:#fff;border-radius:9px;font-size:16px;font-weight:800;color:#475569;cursor:pointer;transition:all .12s}
.tl-btn:hover:not(:disabled){border-color:#6366f1;color:#4f46e5;background:#eef2ff}
.tl-btn:disabled{opacity:.4;cursor:not-allowed}

@media (max-width:560px){.tl{flex-direction:column}.tl-side{width:100%}.tl-controls{flex-direction:row;justify-content:center}.tl-btn{transform:rotate(90deg)}}`,

  js: `var DATA = ['Analytics','Billing','Comments','Dashboard','Exports','Integrations','Members','Notifications','Reports','Security','Single Sign-On','Webhooks'];
var state = { available: DATA.slice(), selected: [] };
var root = document.getElementById('tl');
var sel = { available: {}, selected: {} }; // selection sets

function boxes() { return { available: root.querySelector('[data-list="available"].tl-box'), selected: root.querySelector('[data-list="selected"].tl-box') }; }

function render(which) {
  var box = boxes()[which];
  var q = (root.querySelector('input[data-list="' + which + '"]').value || '').toLowerCase();
  box.innerHTML = '';
  state[which].forEach(function (label) {
    if (q && label.toLowerCase().indexOf(q) === -1) return;
    var li = document.createElement('li');
    li.className = 'tl-item' + (sel[which][label] ? ' tl-sel' : '');
    li.textContent = label;
    li.setAttribute('role', 'option');
    li.setAttribute('aria-selected', sel[which][label] ? 'true' : 'false');
    li.addEventListener('click', function () {
      if (sel[which][label]) delete sel[which][label]; else sel[which][label] = true;
      render(which);
    });
    li.addEventListener('dblclick', function () { move(which, [label]); });
    box.appendChild(li);
  });
  root.querySelector('.tl-count[data-for="' + which + '"]').textContent = state[which].length;
  updateButtons();
}

function move(from, labels) {
  var to = from === 'available' ? 'selected' : 'available';
  labels.forEach(function (label) {
    var i = state[from].indexOf(label);
    if (i > -1) { state[from].splice(i, 1); state[to].push(label); }
    delete sel[from][label];
  });
  state[to].sort();
  render('available'); render('selected');
}

function selectedKeys(which) { return Object.keys(sel[which]); }
function updateButtons() {
  root.querySelector('[data-act="add"]').disabled = selectedKeys('available').length === 0;
  root.querySelector('[data-act="remove"]').disabled = selectedKeys('selected').length === 0;
  root.querySelector('[data-act="add-all"]').disabled = state.available.length === 0;
  root.querySelector('[data-act="remove-all"]').disabled = state.selected.length === 0;
}

root.querySelectorAll('.tl-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {
    var act = btn.getAttribute('data-act');
    if (act === 'add') move('available', selectedKeys('available'));
    if (act === 'remove') move('selected', selectedKeys('selected'));
    if (act === 'add-all') move('available', state.available.slice());
    if (act === 'remove-all') move('selected', state.selected.slice());
  });
});
root.querySelectorAll('.tl-search').forEach(function (input) {
  input.addEventListener('input', function () { render(input.getAttribute('data-list')); });
});

render('available'); render('selected');`,

  seo: {
    title: 'Transfer List — Dual List Box to Move Items Between Lists',
    description: `A dual list box to move and filter items between Available and Selected, with multi-select and move-all. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Transfer List — Dual List Box with Multi-Select, Filtering and Move-All',
      description: `A transfer list — also called a dual list box — lets users move items between two lists: an "available" pool and a "selected" set. It's the classic control for assigning permissions, picking columns, building playlists, or choosing recipients. This snippet builds a complete one with multi-select, per-list filtering, move-selected and move-all buttons, and double-click-to-move, in plain HTML, CSS, and vanilla JavaScript.

**A single source of truth**

Both lists are rendered from one \`state\` object holding two arrays (\`available\` and \`selected\`) plus a selection set per side. Every action mutates those arrays and re-renders, so the UI can never drift from the data — there's no manual DOM shuffling that risks duplicate or orphaned items. Moving an item splices it out of one array and pushes it into the other, then re-sorts the destination so the lists stay alphabetised.

**Multi-select and the four controls**

Click an item to toggle its selection (highlighted), then use \`&rsaquo;\` to move the selected items right or \`&lsaquo;\` to move them left. \`&raquo;\` and \`&laquo;\` move everything at once. The buttons disable themselves intelligently: "move selected" is greyed out when nothing is selected on that side, and "move all" is greyed out when a side is empty — so the controls always reflect what's actually possible. Double-clicking an item moves it immediately, the shortcut power users expect.

**Per-list filtering**

Each side has its own search box that filters that list as you type, matching case-insensitively. Filtering is purely a view concern — it never changes the underlying arrays — so moving a filtered subset still works correctly and clearing the filter restores the full list. This matters when the available pool has dozens or hundreds of items.

**Accessible structure**

The lists use \`role="listbox"\` with \`aria-multiselectable\`, and each item is a \`role="option"\` carrying \`aria-selected\`, so assistive tech understands the multi-select model. The counts in each header announce how many items each side holds, and the move buttons have descriptive \`title\` attributes. Because everything is real, focusable markup, it's straightforward to extend with full keyboard navigation.

**Responsive**

On narrow screens the two lists stack vertically and the control column rotates to sit between them, so the same interaction works on a phone. The whole component is a couple of hundred lines with no dependencies, making it a clean, drop-in reference for the transfer-list pattern that UI kits charge a component for.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two lists render — Available is populated, Selected starts empty.` },
      { title: 'Set your items', text: `Replace the DATA array with your own labels (or objects, with a small tweak).` },
      { title: 'Select and move', text: `Click items to select, then use the ›/‹ buttons, or double-click to move one.` },
      { title: 'Move everything', text: `The »/« buttons transfer all items at once between the lists.` },
      { title: 'Filter long lists', text: `Type in either search box to narrow that side as you go.` },
      { title: 'Read the result', text: `state.selected holds the chosen items — submit or sync it as needed.` },
    ] },
    features: [
      { title: 'Dual list box', text: `Move items between Available and Selected pools.` },
      { title: 'Multi-select', text: `Click to toggle multiple items, then move them together.` },
      { title: 'Move-all controls', text: `Transfer the entire list in one click, in either direction.` },
      { title: 'Double-click move', text: `Double-clicking an item sends it across instantly.` },
      { title: 'Per-list filtering', text: `Each side has its own case-insensitive search box.` },
      { title: 'Smart button state', text: `Controls disable when there is nothing to move.` },
      { title: 'Listbox ARIA', text: `role=listbox/option with aria-selected for the multi-select model.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no UI-kit transfer component.` },
    ],
    useCases: [
      { title: 'Role and permission assignment', text: 'Pick capabilities for a user by moving them from an Available pool into Selected, with multi-select toggling and move-all controls.' },
      { title: 'Table column choices', text: 'Move columns in or out of view alongside a [data table column toggle](/ui-snippets/data-table-column-toggle/), filtering each pool by search.' },
      { title: 'Recipient lists', text: 'Build a send list from a directory of recipients, with double-click sending any single item across instantly without using the buttons.' },
      { title: 'Integration enablement', text: 'Enable a subset of services from a catalogue, linked to [integration cards](/ui-snippets/integration-cards/) for details on each.' },
      { title: 'Tag assignment and settings', text: 'Assign many tags at once, or place inside a [settings panel](/ui-snippets/settings-panel/), with a single source of truth for both lists.' },
    ],
    faqs: [
      { q: 'What is a transfer list (dual list box)?', a: `It is a control with two side-by-side lists — an available pool and a selected set — and buttons to move items between them. It is ideal when users assign a subset from a larger collection, such as permissions, columns, or recipients, because it shows both what is chosen and what remains in one view, unlike a multi-select dropdown.` },
      { q: 'How do I get the chosen items?', a: `Read state.selected — it is the array of labels currently in the Selected list, kept sorted. Mirror it into a hidden input, post it with fetch, or bind it to your framework state at submit time. Because every move updates that array, it is always an accurate reflection of the UI.` },
      { q: 'Does filtering affect what gets moved?', a: `No. The search boxes only change what is displayed; they never alter the underlying arrays. So if you filter the Available list and click "move all," only the visible behaviour you would expect is affected — the move operations work on the real state, and clearing a filter restores the full list intact.` },
      { q: 'Can I move multiple items at once?', a: `Yes. Click several items to select them (they highlight), then use the move-selected button to transfer them together. The move-all buttons send the entire list across in one click, and double-clicking a single item is a quick shortcut to move just that one.` },
      { q: 'How do I use this transfer list in React, Vue, or Angular?', a: `Hold the two arrays and the selection sets in component state and render both lists from them — useState (React), reactive refs (Vue), or component fields (Angular). The move and filter functions become methods that update state instead of calling render(); the framework re-renders for you. Keep the role=listbox/option markup for accessibility, and in Tailwind swap the classes for utilities.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the move() and render() calls by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why moving items reads selectedKeys from the sel object and calls state[to].sort() instead of just appending to the destination array. It's also a good target for optimization questions — ask whether re-rendering both full lists on every keystroke in the search boxes could be replaced with something that only touches the changed rows once the item counts grow into the thousands. For extending it, have it add keyboard support so arrow keys and space toggle selection without a mouse, drag-and-drop reordering within a list, or grouped/nested items with a select-all-in-group checkbox. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "transfer list" (dual list box) in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- Two side-by-side lists, Available and Selected, each backed by its own array in a single state object, plus a per-list object tracking which labels are currently selected.
- Clicking an item toggles it into or out of that list's selection set and re-renders just that list, highlighting selected items visually and via aria-selected.
- Double-clicking an item moves it immediately to the other list.
- Four buttons: move-selected-right, move-selected-left, move-all-right, move-all-left. Moving an item must splice it out of the source array, push it into the destination array, delete it from the source's selection set, then re-sort the destination array alphabetically before re-rendering both lists.
- Each button must disable itself automatically based on current state: the move-selected buttons disable when that side has nothing selected, and the move-all buttons disable when that side's array is empty.
- Each list has its own case-insensitive text filter input that hides non-matching items by re-rendering, but must never mutate the underlying arrays — moving "all" while a filter is active must still move every item in the real array, not just the visible ones.
- Use role="listbox" and aria-multiselectable on each list container and role="option" with aria-selected on each item for accessibility.
- On viewports under 560px, stack the two lists vertically and rotate the middle button column 90 degrees so it reads correctly between them.`,
    },
  },
};

export default transferList;
