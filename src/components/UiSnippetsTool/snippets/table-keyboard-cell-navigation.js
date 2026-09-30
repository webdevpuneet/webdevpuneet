const tableKeyboardCellNavigation = {
  id: 'table-keyboard-cell-navigation',
  title: 'Table with Keyboard Cell Navigation',
  category: 'tables',
  html: `<div class="wrap">
  <div class="table-head">
    <h2 class="table-title">Inventory Counts</h2>
    <span class="hint">Click a cell, then use arrow keys &middot; Enter to edit &middot; Esc to cancel</span>
  </div>
  <table class="tbl" id="tbl">
    <thead>
      <tr>
        <th>SKU</th>
        <th>Warehouse A</th>
        <th>Warehouse B</th>
        <th>Warehouse C</th>
        <th>Warehouse D</th>
      </tr>
    </thead>
    <tbody id="tbody"></tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; padding: 32px 20px; }

.wrap { max-width: 640px; margin: 0 auto; }
.table-head { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
.table-title { font-size: 17px; font-weight: 800; color: #0f172a; }
.hint { font-size: 11px; color: #94a3b8; font-weight: 600; }

.tbl { width: 100%; border-collapse: collapse; background: #fff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 6px rgba(0,0,0,0.06); }
.tbl thead tr { background: #f8fafc; }
.tbl th { padding: 11px 14px; text-align: left; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; color: #64748b; border-bottom: 1px solid #e2e8f0; }
.tbl th:not(:first-child) { text-align: right; }
.tbl td { padding: 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155; }
.tbl tbody tr:last-child td { border-bottom: none; }

.cell { display: block; padding: 10px 14px; outline: none; cursor: cell; font-variant-numeric: tabular-nums; text-align: right; user-select: none; }
.cell.sku-cell { text-align: left; font-weight: 700; color: #0f172a; cursor: default; user-select: text; }
.cell:not(.sku-cell):hover { background: #fafafa; }
.cell.focused { box-shadow: inset 0 0 0 2px #6366f1; background: #eef2ff; border-radius: 2px; }
.cell.editing { box-shadow: inset 0 0 0 2px #6366f1; background: #fff; padding: 0; }
.cell.editing input { width: 100%; height: 100%; border: none; outline: none; padding: 10px 14px; font: inherit; text-align: right; font-variant-numeric: tabular-nums; background: transparent; }
.cell.low { color: #dc2626; font-weight: 700; }`,
  js: `const SKUS = [
  { sku: 'WGT-1001', values: [42, 18, 96, 5] },
  { sku: 'WGT-1002', values: [8, 130, 4, 61] },
  { sku: 'WGT-1003', values: [220, 3, 45, 77] },
  { sku: 'WGT-1004', values: [15, 62, 2, 29] },
  { sku: 'WGT-1005', values: [90, 41, 118, 6] },
];
const LOW_THRESHOLD = 10;
const COLS = 4;

function render() {
  document.getElementById('tbody').innerHTML = SKUS.map((row, r) => {
    const cells = row.values.map((v, c) => {
      const low = v < LOW_THRESHOLD ? ' low' : '';
      return '<td><span class="cell' + low + '" tabindex="-1" data-r="' + r + '" data-c="' + c + '">' + v + '</span></td>';
    }).join('');
    return '<tr><td><span class="cell sku-cell" tabindex="-1" data-r="' + r + '" data-c="-1">' + row.sku + '</span></td>' + cells + '</tr>';
  }).join('');
}

let focusedR = 0, focusedC = 0;

function cellAt(r, c) {
  return document.querySelector('.cell[data-r="' + r + '"][data-c="' + c + '"]');
}

function focusCell(r, c) {
  const prev = document.querySelector('.cell.focused');
  if (prev) prev.classList.remove('focused');
  r = Math.max(0, Math.min(SKUS.length - 1, r));
  c = Math.max(0, Math.min(COLS - 1, c));
  focusedR = r;
  focusedC = c;
  const el = cellAt(r, c);
  if (el) {
    el.classList.add('focused');
    el.focus();
    el.scrollIntoView({ block: 'nearest' });
  }
}

function startEdit(r, c) {
  const el = cellAt(r, c);
  if (!el || el.classList.contains('editing')) return;
  const currentVal = SKUS[r].values[c];
  el.classList.add('editing');
  el.innerHTML = '<input type="text" inputmode="numeric" value="' + currentVal + '" />';
  const input = el.querySelector('input');
  input.focus();
  input.select();

  function commit(save) {
    if (save) {
      const parsed = parseInt(input.value, 10);
      if (!isNaN(parsed) && parsed >= 0) SKUS[r].values[c] = parsed;
    }
    el.classList.remove('editing');
    render();
    focusCell(r, c);
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); commit(true); }
    else if (e.key === 'Escape') { e.preventDefault(); commit(false); }
  });
  input.addEventListener('blur', () => commit(true));
}

document.getElementById('tbody').addEventListener('click', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const r = parseInt(cell.dataset.r, 10);
  const c = parseInt(cell.dataset.c, 10);
  if (c === -1) return;
  focusCell(r, c);
});

document.getElementById('tbl').addEventListener('keydown', (e) => {
  const editingCell = document.querySelector('.cell.editing');
  if (editingCell) return;

  if (e.key === 'ArrowUp') { e.preventDefault(); focusCell(focusedR - 1, focusedC); }
  else if (e.key === 'ArrowDown') { e.preventDefault(); focusCell(focusedR + 1, focusedC); }
  else if (e.key === 'ArrowLeft') { e.preventDefault(); focusCell(focusedR, focusedC - 1); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); focusCell(focusedR, focusedC + 1); }
  else if (e.key === 'Enter') { e.preventDefault(); startEdit(focusedR, focusedC); }
  else if (e.key === 'Tab') { e.preventDefault(); focusCell(focusedR, focusedC + (e.shiftKey ? -1 : 1)); }
});

render();
focusCell(0, 0);`,
  seo: {
    title: 'Table with Keyboard Cell Navigation — Free HTML CSS JS Snippet',
    description: 'A spreadsheet-style data table navigable entirely with arrow keys, with Enter-to-edit and Escape-to-cancel inline cell editing. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Table with Keyboard Cell Navigation — Arrow-Key Focus, Enter-to-Edit, Escape-to-Cancel',
      description: `A table full of numbers that only accepts mouse clicks feels slower than a spreadsheet the moment someone needs to check or correct more than one or two values — reaching for a mouse between every cell breaks the rhythm that arrow-key navigation gives for free. This snippet brings that spreadsheet rhythm to a plain HTML table: click any cell once, then move around entirely with the arrow keys, press Enter to edit the focused cell in place, and Escape to back out without saving.

**A single source of truth for focus position**

Rather than relying on the browser's native DOM focus order, the table tracks its own \`focusedR\`/\`focusedC\` coordinate pair in JavaScript. \`focusCell(r, c)\` clamps both values to the valid row and column range with \`Math.max(0, Math.min(...))\` before applying them — so pressing an arrow key at the table's edge simply has no effect rather than throwing an error or focusing a nonexistent cell. This clamping is what makes the arrow-key handlers safe to call unconditionally without bounds-checking logic scattered through each key handler.

**One keydown listener on the table, not one per cell**

A single \`keydown\` listener is attached to \`#tbl\` itself, and it reads \`focusedR\`/\`focusedC\` from the shared module state rather than needing to know which specific cell element dispatched the event. This is more efficient than attaching a listener to every \`.cell\` span individually, and it keeps the navigation logic centralized in one place regardless of how many rows or columns the table renders.

**Editing is a distinct mode, not always-on**

Cells are not contenteditable by default — \`startEdit(r, c)\` swaps a cell's content for a real \`<input>\` element only when Enter is pressed on the focused cell, and the table's own arrow-key handler explicitly bails out early (\`if (editingCell) return\`) whenever a cell is mid-edit, so arrow keys inside the input move the text cursor rather than jumping to a different cell. This separation — navigation mode versus edit mode — mirrors how a real spreadsheet behaves and avoids the confusing hybrid where arrow keys sometimes navigate and sometimes edit depending on invisible state.

**Commit-on-blur as a safety net, not just Enter/Escape**

The temporary input's \`commit(save)\` function is wired to fire on \`Enter\` (save), \`Escape\` (discard), and also on the input's own \`blur\` event with \`save\` defaulting to true. This means clicking away from an in-progress edit — rather than remembering to press Enter first — still saves the typed value instead of silently discarding it, which matches the forgiving behavior most spreadsheet and grid UIs use for accidental focus loss.

**Low-value cells get a visual flag independent of the navigation layer**

Any inventory count under \`LOW_THRESHOLD\` gets a \`.low\` class that colors and bolds the cell red — computed fresh on every \`render()\` call, so editing a value back above the threshold automatically clears the warning styling on the next render without any separate bookkeeping.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click any numeric cell to focus it', text: 'A focus ring highlights the active cell — the SKU column itself is not navigable since it is a row label, not a value.' },
        { title: 'Use the arrow keys to move around', text: 'Up/Down/Left/Right move the focus one cell at a time, clamped at the table\'s edges.' },
        { title: 'Press Enter to edit the focused cell', text: 'The cell swaps to a real input pre-filled with its current value and selected for immediate typing.' },
        { title: 'Press Enter to save, Escape to cancel', text: 'Saving validates the value is a non-negative number before committing it; clicking away from the input also saves.' },
        { title: 'Replace SKUS with your own data', text: 'Update the array with real row labels and per-column numeric values — extra columns work automatically as long as COLS matches row length.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a Tailwind CSS version.' },
      ],
    },
    features: [
      'Arrow-key navigation across all cells, clamped safely at row and column boundaries',
      'Single delegated keydown listener drives navigation for the entire table regardless of row count',
      'Enter opens inline editing on the focused cell with a real input pre-filled and pre-selected',
      'Escape discards an in-progress edit and returns to navigation mode without saving',
      'Committing on blur means clicking away from an edit still saves, matching spreadsheet UX conventions',
      'Navigation is explicitly disabled while a cell is mid-edit so arrow keys move the text cursor instead',
      'Tab and Shift+Tab move focus one cell forward or backward as an alternative to arrow keys',
      'Values under a configurable low-stock threshold are automatically styled as a warning on every render',
    ],
    useCases: [
      { icon: 'APP', title: 'Inventory and stock management tools', desc: 'The core use case — quickly scan and correct per-warehouse stock counts without reaching for the mouse between every cell.' },
      { icon: 'DASH', title: 'Admin data-correction grids', desc: 'Any admin table where an operator regularly fixes several values in a row benefits from arrow-key navigation over click-only editing.' },
      { icon: 'FORM', title: 'Bulk pricing or rate table editors', desc: 'Pair with the [Inline Cell Bulk Edit](/ui-snippets/table-inline-cell-bulk-edit/) pattern for a spreadsheet-like editing experience across many rows and columns.' },
      { icon: 'LEARN', title: 'Learn a focus-state-driven grid pattern', desc: 'A clean example of tracking navigable focus as explicit row/column coordinates rather than relying solely on native DOM tab order.' },
      { icon: 'CODE', title: 'Internal spreadsheet-style data tools', desc: 'Internal tools that mimic spreadsheet workflows (planning grids, scheduling matrices) can reuse the same navigation-plus-edit-mode pattern.' },
    ],
    faqs: [
      { q: 'How does the table know which cell is currently focused?', a: 'focusedR and focusedC are tracked as plain JavaScript variables, not read from the DOM\'s native focus state. focusCell(r, c) clamps both values into the valid range, applies a .focused class to the matching cell element, and calls the browser\'s real .focus() on it — keeping a single source of truth that both the visual highlight and the arrow-key handlers rely on.' },
      { q: 'Why is there only one keydown listener instead of one per cell?', a: 'A single listener is attached to the whole table element (#tbl) and reads the shared focusedR/focusedC state to know which cell to act on, rather than attaching and managing a separate listener on every individual cell. This is both more efficient and keeps all navigation logic in one place regardless of how many rows the table has.' },
      { q: 'What happens if I press arrow keys while editing a cell?', a: 'The table\'s keydown handler checks for an .editing cell first and returns immediately if one exists, so arrow key presses are left to the native input element instead — meaning they move the text cursor inside the input rather than navigating to a different table cell.' },
      { q: 'Does clicking away from an in-progress edit lose my change?', a: 'No — the temporary input\'s blur event also triggers commit(true), the same commit function Enter uses, so clicking anywhere else on the page while editing still saves the typed value rather than discarding it. Only pressing Escape explicitly discards an edit.' },
      { q: 'How is the low-stock warning styling applied?', a: 'render() checks each numeric value against LOW_THRESHOLD on every render call and adds a .low class (red, bold text) to any cell whose value falls under it. Because this check runs fresh every time the table re-renders after an edit, correcting a low value back above the threshold automatically clears the warning styling with no extra bookkeeping.' },
      { q: 'Can I add more rows or columns?', a: 'Add more objects to the SKUS array for rows, or more numbers to each row\'s values array for columns (also add a matching header <th> and update the COLS constant). The rendering, navigation clamping, and editing logic all read row and column counts from the data itself.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the table tracks focusedR/focusedC as separate JavaScript state instead of relying on the browser's native tabindex-based focus order, and what would break about arrow-key navigation if that separate state were removed. The same assistant can help optimize it — for instance asking whether the single-input-per-edit approach would still work cleanly if multiple cells needed to support paste-across-a-range editing. It's also useful for extending the table: ask it to add Shift+Arrow range selection for copy, support editing the SKU/label column too, or persist edits to a backend on each commit instead of only updating local state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a spreadsheet-style data table in plain HTML, CSS, and JavaScript with keyboard-driven cell navigation and inline editing — no framework, no grid library.

Requirements:
- Render a table of numeric values with a non-editable label column and several editable numeric columns per row, generated from a plain JavaScript array of row objects.
- Track the currently focused cell as explicit row/column coordinates in JavaScript (not solely relying on native DOM tab order), clamped so arrow-key presses at the table's edges have no effect rather than erroring or wrapping unexpectedly.
- Attach a single keydown listener to the table as a whole (not one per cell) that moves focus with the four arrow keys and with Tab/Shift+Tab, and starts inline editing of the focused cell when Enter is pressed.
- Implement inline editing by replacing the focused cell's content with a real text input pre-filled with its current value and with its text pre-selected; pressing Enter while editing must validate and save the new value then return to navigation mode and refocus that cell, pressing Escape must discard the edit and return to navigation mode without saving, and the input losing focus for any other reason (such as a click elsewhere on the page) must also save the value rather than silently discarding it.
- While a cell is actively being edited, arrow key presses must be left alone to move the text cursor inside the input rather than triggering cell-to-cell navigation — the table's navigation keydown handler must detect an active edit and skip its own handling in that case.
- Any numeric value below a configurable threshold must be visually flagged (for example bold red text) automatically, recalculated fresh every time the table re-renders after an edit.`,
    },
  },
};

export default tableKeyboardCellNavigation;
