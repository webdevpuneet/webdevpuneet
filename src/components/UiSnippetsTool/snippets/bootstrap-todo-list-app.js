const bootstrapTodoListApp = {
  id: 'bootstrap-todo-list-app',
  title: 'Bootstrap Todo List App',
  lastmod: '2026-09-10',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card btd-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">My Tasks</h5>

      <form id="btdForm" class="d-flex gap-2 mb-3">
        <input type="text" class="form-control" id="btdInput" placeholder="Add a new task...">
        <button class="btn btn-dark" type="submit">Add</button>
      </form>

      <div class="btn-group btn-group-sm mb-3" role="group" id="btdFilters">
        <button type="button" class="btn btn-outline-dark active" data-filter="all">All</button>
        <button type="button" class="btn btn-outline-dark" data-filter="active">Active</button>
        <button type="button" class="btn btn-outline-dark" data-filter="completed">Completed</button>
      </div>

      <ul class="list-group list-group-flush mb-3" id="btdList"></ul>

      <div class="d-flex justify-content-between align-items-center small text-muted">
        <span id="btdCount">0 items left</span>
        <a href="javascript:void(0)" id="btdClearCompleted">Clear completed</a>
      </div>
    </div>
  </div>
</div>`,
  css: `.btd-card { width: 420px; border: 1px solid #eceef1; border-radius: 14px; }
.btd-item-text.btd-done { text-decoration: line-through; color: #adb5bd; }
#btdList .list-group-item { display: flex; align-items: center; gap: 10px; border-left: none; border-right: none; }`,
  js: `const STORAGE_KEY = 'btd_todos_v1';
let todos = [];
let filter = 'all';

function loadTodos() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    todos = raw ? JSON.parse(raw) : [];
  } catch (e) {
    todos = [];
  }
}

function saveTodos() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  } catch (e) {
    // localStorage unavailable (private mode / quota) — fail silently, app still works in-memory.
  }
}

const form = document.getElementById('btdForm');
const input = document.getElementById('btdInput');
const list = document.getElementById('btdList');
const countEl = document.getElementById('btdCount');
const filterBtns = Array.from(document.querySelectorAll('#btdFilters button'));
const clearCompletedBtn = document.getElementById('btdClearCompleted');

function render() {
  list.innerHTML = '';
  const visible = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'completed') return t.done;
    return true;
  });

  visible.forEach(todo => {
    const li = document.createElement('li');
    li.className = 'list-group-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'form-check-input mt-0';
    checkbox.checked = todo.done;
    checkbox.addEventListener('change', () => {
      todo.done = checkbox.checked;
      saveTodos();
      render();
    });

    const span = document.createElement('span');
    span.className = 'flex-grow-1 btd-item-text' + (todo.done ? ' btd-done' : '');
    span.textContent = todo.text;

    const del = document.createElement('button');
    del.className = 'btn btn-sm btn-outline-danger';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      todos = todos.filter(t => t.id !== todo.id);
      saveTodos();
      render();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  });

  const remaining = todos.filter(t => !t.done).length;
  countEl.textContent = remaining + (remaining === 1 ? ' item left' : ' items left');
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now() + Math.random(), text, done: false });
  input.value = '';
  saveTodos();
  render();
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.getAttribute('data-filter');
    render();
  });
});

clearCompletedBtn.addEventListener('click', () => {
  todos = todos.filter(t => !t.done);
  saveTodos();
  render();
});

loadTodos();
render();`,
  seo: {
    title: 'Bootstrap Todo List App — Free HTML CSS JS Snippet',
    description: 'A Bootstrap 5.3 todo app with a btn-group filter, live item counter, and localStorage persistence guarded by try/catch. Export to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Todo List App — HTML, CSS & JavaScript',
      description: `A todo list is a small enough app that its correctness lives entirely in a handful of edge cases: does it survive a reload, does filtering stay in sync with edits, does deleting the wrong item ever happen. This snippet is built around one array, \`todos\`, and one function, \`render()\`, that always rebuilds the visible list from scratch — there is no incremental DOM patching, which removes an entire category of bugs where the displayed list drifts out of sync with the underlying data.\n\nEach todo is a plain object \`{ id, text, done }\`, where \`id\` is generated as \`Date.now() + Math.random()\` — combining a timestamp with a random fraction so two todos added within the same millisecond (a real possibility if a user pastes and submits quickly) still get distinct ids, which matters because delete and toggle actions both filter/find by \`id\`. The active view/Active/Completed segmentation is a real Bootstrap \`btn-group\` of toggle-style outline buttons; clicking one removes \`active\` from its siblings, adds it to itself, updates a module-level \`filter\` variable, and calls \`render()\`, which applies a simple three-branch filter (\`t.done\`, \`!t.done\`, or everything) before rebuilding the \`<ul>\`.\n\nPersistence goes through \`localStorage\` via \`loadTodos()\` and \`saveTodos()\`, and both are wrapped in \`try/catch\` deliberately — private browsing modes, storage quota limits, or a browser configured to block site data can all make \`localStorage\` throw on read or write, and without the guard the entire app would crash on load. On a caught read error \`todos\` falls back to an empty array; on a caught write error the app simply continues running in-memory for that session rather than surfacing an error to the user, which is the correct degrade-gracefully behavior for a non-critical feature like persistence.\n\nEach rendered \`<li>\` is a real Bootstrap \`list-group-item\` built with three live-wired children: a checkbox whose \`change\` event flips that todo's \`done\` flag, re-saves, and re-renders (which is also what applies the \`.btd-done\` strikethrough class to the text span); the text span itself; and a Delete button whose click filters that one \`id\` out of the \`todos\` array. The "N items left" counter recomputes on every \`render()\` call by filtering for \`!t.done\`, and correctly pluralizes to "1 item left" versus "2 items left" — a small detail a lot of todo-list tutorials skip. "Clear completed" performs one more array filter, removing every done todo in a single pass.\n\nBecause \`render()\` never depends on the previous DOM state, and \`todos\`/\`filter\` are the only two variables driving what is shown, this maps directly onto a React component's state and derived filtered array, a Vue \`ref\` array with a computed filtered list, or an Angular component property — with \`localStorage\` reads moved into \`useEffect\`/\`onMounted\`/\`ngOnInit\` behind the same try/catch guard.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'An empty task list appears (or your previously saved tasks, if this exact snippet preview was used before) along with an "N items left" counter at 0.' },
        { title: 'Type a task and click Add', text: 'The task appears instantly at the bottom of the list with an unchecked checkbox, and the items-left counter increments.' },
        { title: 'Check a task off', text: 'Its text gets a strikethrough and grays out immediately, and the items-left counter decrements.' },
        { title: 'Click the Active or Completed filter', text: 'The visible list narrows to only matching tasks, while the underlying full list and counter stay accurate.' },
        { title: 'Delete a task', text: 'That specific task is removed from the list regardless of which filter is active, and the counter updates accordingly.' },
        { title: 'Reload the page', text: 'Every task, its checked state, and its text persist exactly as left, because they were saved to localStorage after each change.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 list-group-flush items and a btn-group segmented filter control',
      'Single render() function rebuilds the entire visible list from state on every change',
      'All/Active/Completed filtering derived live from one filter variable and the todos array',
      'localStorage persistence with both read and write wrapped in try/catch for safety',
      'Graceful in-memory fallback if localStorage throws (private mode, quota, disabled storage)',
      'Unique todo ids combining Date.now() and Math.random() to avoid same-millisecond collisions',
      'Correctly pluralized "item left" vs "items left" counter text',
      'Clear completed removes all done todos in a single array filter pass',
    ],
    useCases: [
      { icon: 'APP', title: 'Personal task managers', desc: 'A complete, self-contained todo app pattern that persists across reloads without any backend.' },
      { icon: 'FLOW', title: 'Project task checklists', desc: 'Adapt the same checkbox-and-filter pattern for a checklist inside a [kanban board](/ui-snippets/bootstrap-kanban-board-cards/) card.' },
      { icon: 'LEARN', title: 'Learning localStorage persistence', desc: 'A clear, defensively-coded example of reading and writing localStorage safely with try/catch guards on both operations.' },
      { icon: 'DASHBOARD', title: 'Dashboard "my tasks" widgets', desc: 'Embed a compact version of this inside an [admin dashboard sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/) layout as a personal reminders panel.' },
      { icon: 'DESIGN', title: 'Onboarding checklists', desc: 'Repurpose the completed-state styling for a setup checklist, similar to progress cues used in a [profile card follow](/ui-snippets/bootstrap-profile-card-follow/) widget.' },
    ],
    faqs: [
      { q: 'Do my tasks survive closing the browser tab?', a: 'Yes — every add, toggle, delete, and clear-completed action calls saveTodos(), which writes the full todos array to localStorage as JSON under the key btd_todos_v1, and loadTodos() reads it back on the next page load.' },
      { q: 'What happens if localStorage is unavailable or blocked?', a: 'Both loadTodos() and saveTodos() wrap their calls in try/catch — a blocked or full localStorage causes the catch block to run silently, falling back to an empty list on load or simply not persisting on save, so the app keeps working in-memory for that session instead of crashing.' },
      { q: 'Does the items-left counter include completed tasks?', a: 'No — it filters specifically for todos where done is false, so checking off a task immediately decrements the counter even though the task itself remains visible under the All filter.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — move todos and filter into component state (useState/ref/class property), load persisted data in useEffect, onMounted, or ngOnInit with the same try/catch guard, and derive the filtered list with useMemo, a computed property, or a getter instead of manually rebuilding the DOM in render().' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — the list-group and btn-group classes are purely visual; swap them for Tailwind utility classes on the same elements and the state logic, filtering, and localStorage persistence all keep working unchanged.' },
      { q: 'Why use Date.now() plus Math.random() for ids instead of just an incrementing counter?', a: 'A simple incrementing counter reset to 0 on every page load would collide with ids already saved in localStorage from a previous session; combining the current timestamp with a random fraction produces an id that is extremely unlikely to collide with previously stored ids or with another todo added in the same millisecond.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add inline editing (double-click a task to rename it) or drag-to-reorder using the native HTML5 drag-and-drop API. It's also worth asking it to add due dates with overdue tasks highlighted in red.`,
      prompt: `Build a Bootstrap 5.3 todo list app using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- An input and Add button to create new todos, each todo stored as an object with a unique id, text, and a done boolean.
- Each rendered todo shows a checkbox (strikethrough text when checked) and a Delete button, inside a real Bootstrap list-group.
- A Bootstrap btn-group with All/Active/Completed buttons that filters the visible list without losing the underlying data for the other filters.
- A live "N items left" counter that only counts incomplete todos and correctly pluralizes between "item" and "items".
- A "Clear completed" action that removes all done todos in one action.
- Persist the todos array to localStorage after every change, and load it back on page load, with both the read and write wrapped in try/catch so the app still works if localStorage is unavailable.`,
    },
  },
};

export default bootstrapTodoListApp;
