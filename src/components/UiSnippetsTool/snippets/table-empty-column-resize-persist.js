const tableEmptyColumnResizePersist = {
  id: 'table-empty-column-resize-persist',
  title: 'Column Widths That Persist (localStorage)',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="crp-wrap">
  <div class="crp-bar">
    <h3>Support tickets</h3>
    <button type="button" class="crp-reset" id="crpReset">Reset widths</button>
  </div>
  <div class="crp-scroll">
    <table class="crp-table" id="crpTable">
      <colgroup id="crpColgroup"></colgroup>
      <thead>
        <tr id="crpHeadRow"></tr>
      </thead>
      <tbody id="crpBody"></tbody>
    </table>
  </div>
  <p class="crp-note" id="crpNote"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#eef2ff;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.crp-wrap{background:#fff;border-radius:14px;width:100%;max-width:680px;box-shadow:0 18px 44px rgba(49,46,129,.1);overflow:hidden;border:1px solid #e0e7ff}
.crp-bar{display:flex;align-items:center;justify-content:space-between;padding:16px 18px;border-bottom:1px solid #eef2ff}
.crp-bar h3{font-size:15px;font-weight:800;color:#312e81}
.crp-reset{background:#eef2ff;border:1px solid #c7d2fe;border-radius:8px;padding:6px 12px;font-size:12px;font-weight:700;color:#4338ca;cursor:pointer;font-family:inherit}
.crp-reset:hover{background:#e0e7ff}

.crp-scroll{overflow-x:auto}
.crp-table{border-collapse:collapse;font-size:13px;table-layout:fixed;width:100%}
.crp-table th{position:relative;text-align:left;padding:10px 14px;background:#f5f6ff;border-bottom:1px solid #e0e7ff;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#4338ca;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;user-select:none}
.crp-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.crp-table tbody tr:hover{background:#f8fafc}

.crp-handle{position:absolute;top:0;right:-3px;width:7px;height:100%;cursor:col-resize;z-index:2}
.crp-handle:hover,.crp-handle.crp-active{background:rgba(79,70,229,.35)}

.crp-note{padding:10px 18px 14px;font-size:11.5px;color:#6366f1;font-weight:600}`,

  js: `var COLUMNS = [
  { key: 'id', label: 'Ticket', width: 90 },
  { key: 'subject', label: 'Subject', width: 260 },
  { key: 'requester', label: 'Requester', width: 150 },
  { key: 'status', label: 'Status', width: 110 },
];
var ROWS = [
  { id: '#4021', subject: 'Checkout fails intermittently on Safari 17', requester: 'Aisha Khan', status: 'Open' },
  { id: '#4022', subject: 'Add a dark mode toggle to settings', requester: 'Tom Becker', status: 'Planned' },
  { id: '#4023', subject: 'Search is slow on mobile connections', requester: 'Priya Nair', status: 'In progress' },
  { id: '#4024', subject: 'CSV export drops quoted commas', requester: 'Sara Lind', status: 'Open' },
  { id: '#4025', subject: 'Autofill breaks the signup form in Safari', requester: 'Diego Sosa', status: 'Resolved' },
];

var STORAGE_KEY = 'crp-column-widths-v1';
var MIN_WIDTH = 60;

var colgroup = document.getElementById('crpColgroup');
var headRow = document.getElementById('crpHeadRow');
var body = document.getElementById('crpBody');
var note = document.getElementById('crpNote');

function loadWidths() {
  try {
    var raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    var parsed = JSON.parse(raw);
    return (parsed && typeof parsed === 'object') ? parsed : {};
  } catch (err) {
    return {};
  }
}

function saveWidths(widths) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widths));
  } catch (err) {
    // Storage may be unavailable (private mode, quota) — resizing still works for this session.
  }
}

var savedWidths = loadWidths();

function currentWidth(col) {
  return savedWidths[col.key] || col.width;
}

function renderStructure() {
  colgroup.innerHTML = COLUMNS.map(function (c) {
    return '<col data-key="' + c.key + '" style="width:' + currentWidth(c) + 'px">';
  }).join('');

  headRow.innerHTML = COLUMNS.map(function (c) {
    return '<th data-key="' + c.key + '">' + c.label + '<span class="crp-handle" data-key="' + c.key + '"></span></th>';
  }).join('');

  body.innerHTML = ROWS.map(function (r) {
    return '<tr>' + COLUMNS.map(function (c) { return '<td>' + r[c.key] + '</td>'; }).join('') + '</tr>';
  }).join('');

  var restoredCount = Object.keys(savedWidths).length;
  note.textContent = restoredCount
    ? 'Restored ' + restoredCount + ' custom column width' + (restoredCount === 1 ? '' : 's') + ' from a previous visit.'
    : 'Drag a column edge, then reload the page — your widths persist via localStorage.';
}

renderStructure();

// Pointer-drag resizing: on pointerdown over a handle, track the starting X and the
// column's starting width, then update the matching <col> element's width live on
// pointermove. On release, persist every column's current width to localStorage.
var dragKey = null, startX = 0, startWidth = 0;

document.getElementById('crpTable').addEventListener('pointerdown', function (e) {
  var handle = e.target.closest('.crp-handle');
  if (!handle) return;
  dragKey = handle.dataset.key;
  startX = e.clientX;
  var col = document.querySelector('col[data-key="' + dragKey + '"]');
  startWidth = col.getBoundingClientRect().width;
  handle.classList.add('crp-active');
  handle.setPointerCapture(e.pointerId);
  e.preventDefault();
});

document.getElementById('crpTable').addEventListener('pointermove', function (e) {
  if (!dragKey) return;
  var delta = e.clientX - startX;
  var next = Math.max(MIN_WIDTH, Math.round(startWidth + delta));
  var col = document.querySelector('col[data-key="' + dragKey + '"]');
  col.style.width = next + 'px';
});

function endDrag() {
  if (!dragKey) return;
  var widths = {};
  document.querySelectorAll('col[data-key]').forEach(function (col) {
    widths[col.dataset.key] = parseInt(col.style.width, 10);
  });
  savedWidths = widths;
  saveWidths(widths);
  var active = document.querySelector('.crp-handle.crp-active');
  if (active) active.classList.remove('crp-active');
  dragKey = null;
  note.textContent = 'Column widths saved — they\\'ll be restored next time you load this page.';
}

document.getElementById('crpTable').addEventListener('pointerup', endDrag);
document.getElementById('crpTable').addEventListener('pointercancel', endDrag);

document.getElementById('crpReset').addEventListener('click', function () {
  savedWidths = {};
  try { localStorage.removeItem(STORAGE_KEY); } catch (err) {}
  renderStructure();
});`,

  seo: {
    title: 'Column Widths That Persist — Real Drag Resize + localStorage (JS)',
    description: `A table with real pointer-drag column resizing whose widths are saved to localStorage and restored on reload — genuine persistence, not a session-only demo. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Persistent Column Widths — Real Drag Resizing Saved to localStorage',
      description: `Letting users resize table columns is only half the feature — if the widths reset every time they reload the page, it barely feels like a preference at all. This snippet builds genuine pointer-drag column resizing in plain HTML, CSS, and vanilla JavaScript, and actually writes the resulting widths to \`localStorage\`, reading them back on load so a user's column layout survives a refresh or a return visit days later.

**Real pointer-drag resizing, not a decorative handle**

Each header renders a thin \`.crp-handle\` at its right edge. A \`pointerdown\` on a handle records the starting cursor X and the column's current width (read from its live \`<col>\` element via \`getBoundingClientRect\`), and \`setPointerCapture\` ensures the drag keeps tracking even if the cursor leaves the handle's small hit area. \`pointermove\` then computes \`delta = e.clientX - startX\` and sets the \`<col>\`'s width directly, clamped to a \`MIN_WIDTH\` floor so a column can never be dragged to zero or negative width. Using \`<col>\` elements inside a \`<colgroup>\` (rather than styling every \`<td>\` individually) is what lets one width change apply to the entire column in one place.

**Genuine localStorage read and write**

On \`pointerup\`, \`endDrag()\` reads every column's *current* width off its \`<col>\` element into a plain \`{ key: widthPx }\` object and calls \`localStorage.setItem('crp-column-widths-v1', JSON.stringify(widths))\` — a real write to persistent browser storage, not an in-memory variable that resets on reload. On load, \`loadWidths()\` reads that same key back with \`localStorage.getItem\` and \`JSON.parse\`s it, wrapped in a \`try/catch\` since storage can throw in private browsing or when disabled — falling back to each column's default width if nothing was saved or parsing fails.

**A sensible key and JSON structure**

The storage key is namespaced and versioned (\`crp-column-widths-v1\`), and the stored value is a flat object keyed by column identifier rather than array index — so adding, removing, or reordering columns in a future version doesn't silently apply stale widths to the wrong column. This is a small but important design choice: an index-keyed structure (\`widths[2] = 180\`) would misassign every saved width the moment a column is added.

**Confirms the persistence, doesn't just claim it**

A status line beneath the table explicitly states whether widths were restored from a previous visit or nothing is saved yet, and updates immediately after a drag to confirm the save happened — so the persistence isn't just present in the code, it's visibly confirmed in the UI, which matters for a feature that's otherwise invisible until the user reloads.

**Reset and defaults**

A "Reset widths" button clears the stored key and re-renders from each column's default width, giving users an escape hatch if they resize columns into an awkward layout. Pair this with a [table column resize](/ui-snippets/table-column-resize/) snippet if you want resizing without persistence, or a [resizable columns table](/ui-snippets/resizable-columns-table/) for a broader resizing reference.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tickets table renders with drag handles on the right edge of each header.` },
      { title: 'Drag a column edge', text: `The column resizes live as you drag, clamped to a minimum width.` },
      { title: 'Release the drag', text: `The current widths of every column are written to localStorage immediately.` },
      { title: 'Reload the page', text: `Your custom widths are read back from localStorage and applied on load.` },
      { title: 'Check the status line', text: `It confirms whether widths were restored from a previous visit.` },
      { title: 'Click Reset widths', text: `Clears the saved localStorage entry and returns every column to its default width.` },
    ] },
    features: [
      { title: 'Real pointer-drag resizing', text: `pointerdown/pointermove/pointerup with setPointerCapture drives live column resizing.` },
      { title: 'Genuine localStorage writes', text: `Widths are actually persisted via localStorage.setItem on drag release.` },
      { title: 'Genuine localStorage reads', text: `Saved widths are read and applied via localStorage.getItem on every load.` },
      { title: 'Namespaced, versioned key', text: `A dedicated storage key avoids collisions with other localStorage data.` },
      { title: 'Key-based, not index-based JSON', text: `Widths are stored by column key, staying correct if columns are reordered.` },
      { title: 'Minimum width clamp', text: `Columns can't be dragged below a sensible floor.` },
      { title: 'colgroup-driven widths', text: `One <col> width change resizes the entire column cleanly.` },
      { title: 'Visible persistence confirmation', text: `A status line states whether widths were restored or just saved.` },
    ],
    useCases: [
      { title: 'Admin and data-dense tables', text: `Let power users tune column widths once and keep them — pair with a [resizable columns table](/ui-snippets/resizable-columns-table/).` },
      { title: 'Support and ticket queues', text: `Persist a layout tuned for longer subject lines across sessions.` },
      { title: 'Spreadsheet-like internal tools', text: `Mirror spreadsheet column-width memory that survives reloads.` },
      { title: 'Dashboards with saved layouts', text: `Extend the same localStorage pattern to column order or visibility, alongside [data table column toggle](/ui-snippets/data-table-column-toggle/).` },
      { title: 'Multi-user internal apps', text: `Each browser remembers its own layout independently, no backend needed.` },
      { title: 'Learning localStorage persistence', text: `A reference for real read/write persistence — compare with [table column resize](/ui-snippets/table-column-resize/) for resizing without saving.` },
      { icon: 'CODE', title: 'Related: Nested JSON to Table Mapper', desc: 'See the [Nested JSON to Table Mapper](/ui-snippets/table-nested-json-mapper/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this really save to localStorage, or just to a JS variable?', a: `It really saves to localStorage. On pointerup, endDrag() reads each column's live width and calls localStorage.setItem with a JSON-stringified object under the key crp-column-widths-v1 — open your browser's DevTools Application/Storage tab after dragging a column and you'll see the entry written there, and it survives closing the tab.` },
      { q: 'What happens if localStorage is unavailable (private browsing, quota)?', a: `Both the read and write paths are wrapped in try/catch. loadWidths() falls back to an empty object (so every column uses its coded default width) if reading throws or the value can't be parsed, and saveWidths() silently no-ops if writing throws — so resizing still works visually for the current session even if persistence isn't available.` },
      { q: 'Why store widths keyed by column name instead of by column index?', a: `An index-keyed structure like widths[2] breaks the moment a column is added, removed, or reordered — index 2 might now be a completely different column, and it would silently apply the wrong saved width. Keying by each column's stable identifier (e.g. "subject") means a saved width always reapplies to the correct column even if the table's column order changes later.` },
      { q: 'How does the drag actually resize the column smoothly?', a: `On pointerdown over a handle, the code records the starting cursor X and the column's current width. On every pointermove during the drag, it computes how far the cursor has moved (delta) and sets the <col> element's width to the starting width plus that delta, clamped to a minimum. Because all cells in a column share one <col> element inside a <colgroup>, this single width update resizes the whole column at once.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the widths object in component state, initialize it from localStorage.getItem in an effect/lifecycle hook on mount, attach pointerdown/pointermove/pointerup handlers to each resize handle that update that state, and call localStorage.setItem on pointerup. Bind each <col>'s width style to the corresponding state value — the drag math and storage calls are framework-agnostic.` },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why a homemade column resizer forgets its widths on reload, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how pointer capture keeps the drag tracking correctly even when the cursor moves off the thin handle element, and why the persisted JSON structure is keyed by column name rather than array index. The same assistant can help extend it — ask it to also persist column order (via drag-and-drop reordering) in the same localStorage entry, add a "fit to content" double-click action on a handle, or sync the saved widths across tabs using the storage event so two open tabs of the same table stay in sync. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a data table with real pointer-drag column resizing whose widths persist across page reloads via localStorage, in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- Render the table using a <colgroup> with one <col> element per column, each with an inline width style, so a single width change per column resizes every cell in that column at once, and add a thin drag-handle element to the right edge of each header cell.
- Implement real drag resizing using pointer events: on pointerdown over a handle, record the starting cursor X position and the column's current live width (read from its <col> element's bounding rect), and call setPointerCapture so the drag continues tracking correctly even if the cursor moves off the thin handle. On pointermove during an active drag, compute the cursor's horizontal delta since the drag started and set the corresponding <col>'s width to the starting width plus that delta, clamped to a sensible minimum width so a column can never be dragged to zero or a negative size.
- On pointerup (ending the drag), read the current width of every column from its <col> element into a plain JavaScript object keyed by a stable column identifier (not array index), and write that object to localStorage under a specific, namespaced key using JSON.stringify — this must be a genuine localStorage.setItem call, not just updating an in-memory variable.
- On page load, before rendering, read that same localStorage key back with getItem and JSON.parse, and apply any saved widths to their matching columns by looking them up by the same stable column identifier used when saving — columns with no saved width should fall back to a sensible coded default. Wrap both the read and write in try/catch so the feature degrades gracefully (falling back to defaults, or just not persisting) if localStorage throws, such as in private browsing.
- Add a "Reset widths" button that clears the saved localStorage entry and re-renders every column at its default width.
- Verify the persistence actually works by resizing a column, reloading the page (or simulating a reload by re-running the load logic), and confirming the resized width is restored — not just that resizing itself works within a single session.`,
    },
  },
};

export default tableEmptyColumnResizePersist;
