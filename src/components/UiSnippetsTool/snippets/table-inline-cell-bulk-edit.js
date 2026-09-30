const tableInlineCellBulkEdit = {
  id: 'table-inline-cell-bulk-edit',
  title: 'Inline Cell Bulk-Edit Table — Floating Save Bar',
  lastmod: '2026-08-27',
  category: 'tables',
  html: `<div class="demo">
  <div class="table-wrap">
    <table class="edit-table" id="editTable">
      <thead>
        <tr>
          <th>SKU</th>
          <th>Product</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        <tr data-row="1">
          <td>SKU-1042</td>
          <td class="cell" contenteditable="true" data-field="product">Wireless Mouse</td>
          <td class="cell num" contenteditable="true" data-field="price">29.99</td>
          <td class="cell num" contenteditable="true" data-field="stock">142</td>
        </tr>
        <tr data-row="2">
          <td>SKU-1043</td>
          <td class="cell" contenteditable="true" data-field="product">Mechanical Keyboard</td>
          <td class="cell num" contenteditable="true" data-field="price">89.00</td>
          <td class="cell num" contenteditable="true" data-field="stock">37</td>
        </tr>
        <tr data-row="3">
          <td>SKU-1044</td>
          <td class="cell" contenteditable="true" data-field="product">USB-C Hub</td>
          <td class="cell num" contenteditable="true" data-field="price">45.50</td>
          <td class="cell num" contenteditable="true" data-field="stock">0</td>
        </tr>
        <tr data-row="4">
          <td>SKU-1045</td>
          <td class="cell" contenteditable="true" data-field="product">Webcam 1080p</td>
          <td class="cell num" contenteditable="true" data-field="price">54.25</td>
          <td class="cell num" contenteditable="true" data-field="stock">61</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="save-bar" id="saveBar">
    <span class="save-bar-count"><strong id="dirtyCount">0</strong> unsaved change<span id="dirtyPlural">s</span></span>
    <div class="save-bar-actions">
      <button class="btn ghost" id="discardBtn">Discard</button>
      <button class="btn primary" id="saveBtn">Save changes</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 560px; max-width: 100%; position: relative; padding-bottom: 70px; }

.table-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }
.edit-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.edit-table th { text-align: left; padding: 11px 14px; background: #f8fafc; color: #64748b; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #e2e8f0; }
.edit-table td { padding: 11px 14px; border-bottom: 1px solid #f1f5f9; color: #1f2937; }
.edit-table tr:last-child td { border-bottom: none; }
.edit-table td.num { font-variant-numeric: tabular-nums; }

.cell { cursor: text; border-radius: 6px; outline: 2px solid transparent; outline-offset: -2px; transition: background 0.15s, outline-color 0.15s; }
.cell:hover { background: #f8fafc; }
.cell:focus { outline-color: #6366f1; background: #eef2ff; }
.cell.dirty { background: #fffbeb; }
.cell.dirty::after { content: '●'; color: #f59e0b; font-size: 7px; vertical-align: super; margin-left: 5px; }
.cell.dirty:focus { background: #fef3c7; }

.save-bar { position: absolute; left: 50%; bottom: 0; transform: translate(-50%, 0) scale(0.96); width: calc(100% - 8px); background: #0f172a; color: #fff; border-radius: 14px; padding: 12px 16px; display: flex; align-items: center; justify-content: space-between; gap: 12px; box-shadow: 0 12px 30px rgba(15,23,42,0.25); opacity: 0; pointer-events: none; transition: opacity 0.2s ease, transform 0.2s ease; }
.save-bar.visible { opacity: 1; transform: translate(-50%, 0) scale(1); pointer-events: auto; }
.save-bar-count { font-size: 12.5px; font-weight: 600; color: #cbd5e1; }
.save-bar-count strong { color: #fff; }
.save-bar-actions { display: flex; gap: 8px; }
.btn { border: none; padding: 8px 14px; border-radius: 8px; font-size: 12.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.btn.ghost { background: rgba(255,255,255,0.08); color: #e2e8f0; }
.btn.ghost:hover { background: rgba(255,255,255,0.14); }
.btn.primary { background: #6366f1; color: #fff; }
.btn.primary:hover { background: #4f46e5; }`,
  js: `const table = document.getElementById('editTable');
const saveBar = document.getElementById('saveBar');
const dirtyCount = document.getElementById('dirtyCount');
const dirtyPlural = document.getElementById('dirtyPlural');
const saveBtn = document.getElementById('saveBtn');
const discardBtn = document.getElementById('discardBtn');

const originalValues = new Map();
table.querySelectorAll('.cell').forEach((cell) => {
  originalValues.set(cell, cell.textContent);
});

function updateBar() {
  const dirty = table.querySelectorAll('.cell.dirty');
  dirtyCount.textContent = dirty.length;
  dirtyPlural.textContent = dirty.length === 1 ? '' : 's';
  saveBar.classList.toggle('visible', dirty.length > 0);
}

table.addEventListener('input', (e) => {
  const cell = e.target.closest('.cell');
  if (!cell) return;
  const isDirty = cell.textContent !== originalValues.get(cell);
  cell.classList.toggle('dirty', isDirty);
  updateBar();
});

table.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    e.target.blur();
  }
});

saveBtn.addEventListener('click', () => {
  table.querySelectorAll('.cell.dirty').forEach((cell) => {
    originalValues.set(cell, cell.textContent);
    cell.classList.remove('dirty');
  });
  updateBar();
  saveBtn.textContent = 'Saved ✓';
  setTimeout(() => { saveBtn.textContent = 'Save changes'; }, 1200);
});

discardBtn.addEventListener('click', () => {
  table.querySelectorAll('.cell.dirty').forEach((cell) => {
    cell.textContent = originalValues.get(cell);
    cell.classList.remove('dirty');
  });
  updateBar();
});`,
  seo: {
    title: 'Inline Cell Bulk-Edit Table — contenteditable Cells with a Floating Save Bar',
    description: 'A data table where any cell becomes editable in place; a floating save bar tracks how many cells changed across the whole table and commits or discards them all at once.',
    about: {
      title: 'Inline Bulk-Edit Table — Per-Cell Editing with a Batched Save Bar',
      description: `Most editable-table patterns fall into two camps: a full "edit mode" toggle that locks the whole row, or a modal that opens per-row for editing one record at a time. This snippet takes a third approach that scales better for quick multi-field corrections: every cell is directly editable via \`contenteditable\`, and a **floating save bar** tracks how many cells have changed across the *entire table* — not just one row — letting a user fix several fields in several different rows and commit them all as one batch.

**Tracking dirty state per cell, not per row**

On load, every \`.cell\` element's original text is captured into a \`Map\` keyed by the DOM node itself: \`originalValues.set(cell, cell.textContent)\`. On every \`input\` event, the current text is compared back against that stored original — if they differ, the cell gets a \`.dirty\` class (a small amber dot and background tint); if a user types something and then types it back to the original value, the dirty state clears automatically, since the comparison is against the *original* value, not "has this cell ever been touched."

**Why the save bar counts cells, not rows**

\`updateBar()\` queries \`.cell.dirty\` across the whole table and shows that count in the floating bar — "3 unsaved changes" might mean three fields in one row, or one field each in three different rows. This framing matches how someone actually works through a spreadsheet-like table: fixing individual field values here and there rather than deciding to edit specific whole rows.

**Committing vs discarding**

"Save changes" copies every dirty cell's current text back into the \`originalValues\` map and clears its dirty flag — in a real integration, this is also where a batched \`PATCH\` request to a backend would fire before clearing the flags. "Discard" does the reverse: it resets every dirty cell's \`textContent\` back to the value stored in the map, immediately reverting all unsaved edits table-wide with a single click.

**Enter to confirm, not to insert a newline**

Because table cells are single-line values, the \`keydown\` handler intercepts \`Enter\` and calls \`.blur()\` on the focused cell instead of letting \`contenteditable\` insert a line break — so pressing Enter reads naturally as "I'm done editing this cell" rather than corrupting the value with an embedded newline.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Mark editable cells with class="cell" contenteditable="true"', text: 'Add a data-field attribute for identification, and .num for numeric columns that should use tabular figures.' },
        { title: 'Leave non-editable columns as plain <td>', text: 'The SKU column in the demo has no .cell class, so it stays read-only while adjacent cells remain editable.' },
        { title: 'Add or remove rows freely', text: 'Any new .cell elements are automatically picked up by the initial originalValues.forEach loop as long as the script runs after the table is in the DOM.' },
        { title: 'Wire the save button to your API', text: 'Inside the saveBtn click handler, collect the dirty cells\' row and field before clearing dirty state, and send them as a single batched PATCH request.' },
        { title: 'Customize the dirty-cell indicator', text: 'Adjust the .cell.dirty background and ::after dot styling in the CSS panel to match your product\'s existing "unsaved" visual language.' },
      ],
    },
    features: [
      'Every cell independently editable via contenteditable — no row-level edit-mode toggle required',
      'Per-cell dirty tracking against a Map of original values, so re-typing the original value clears the dirty flag',
      'Floating save bar counts dirty cells across the whole table, not per row, matching how spreadsheet-style edits actually happen',
      'Single Save commits all dirty cells at once; single Discard reverts all of them at once',
      'Enter key blurs the cell instead of inserting a line break, keeping single-line values clean',
      'Save bar animates in only when there is at least one unsaved change, and out again once clean',
      'Read-only columns (like SKU) simply omit the .cell class — no extra configuration needed',
      'Momentary "Saved ✓" button state gives immediate confirmation feedback after committing',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Admin Product Catalogs', desc: 'Let an operations team quickly correct prices, stock counts or names across many SKUs without opening a modal per row.' },
      { icon: 'DATA', title: 'Internal Data-Correction Tools', desc: 'Ideal for internal dashboards where staff routinely need to fix a handful of scattered field values in bulk.' },
      { icon: 'SHEET', title: 'Spreadsheet-Style Web Apps', desc: 'Approximate the fast, low-friction editing feel of a spreadsheet inside a web app\'s data table.' },
      { icon: 'CMS', title: 'Lightweight CMS Content Grids', desc: 'Quick-edit titles, prices or statuses across many CMS entries listed in a table view.' },
      { icon: 'CODE', title: 'Related: Sticky Summary/Totals Row', desc: 'See the [Sticky Summary/Totals Row](/ui-snippets/table-sticky-summary-row/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why contenteditable instead of swapping each cell to an <input> on click?', a: 'contenteditable keeps the table\'s exact visual layout and column widths intact with no layout shift when entering or leaving edit mode, and every cell is simultaneously editable without a separate click-to-activate step per cell.' },
      { q: 'How does the table know a cell has actually changed?', a: 'Each cell\'s starting text is captured into a Map keyed by the DOM node on load. Every input event compares the live textContent back against that stored value — if they match again (e.g. the user typed then undid their change), the dirty flag clears automatically.' },
      { q: 'What happens if I click Discard?', a: 'Every cell currently marked dirty has its textContent reset to the value stored in the originalValues map, and its dirty class is removed — reverting all unsaved edits across the whole table in one action.' },
      { q: 'Can I validate cell values before allowing Save?', a: 'Yes — add validation inside the input handler (or right before the save loop) that checks a cell\'s data-field and content, and either block the save or flag the cell with an additional error class if invalid.' },
      { q: 'Does this work with numeric input types like a real <input type="number">?', a: 'Not directly — contenteditable cells accept any text, so add your own numeric validation for .num cells if you need to guarantee only valid numbers are entered.' },
      { q: 'How would I persist changes to a server?', a: 'Inside the saveBtn click handler, before clearing dirty flags, collect each dirty cell\'s closest tr[data-row] id and data-field name plus its new textContent into a batch array, then send that array as one request instead of one request per field.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why tracking dirty state per cell in a Map keyed by the DOM node scales cleanly to a table with many rows and columns, compared to alternatives like storing dirty state on the row or diffing the whole table's HTML on every keystroke. It's also worth asking for a version that adds keyboard cell-to-cell navigation with Tab/Shift+Tab/arrow keys, or one that shows a live diff (old value struck through) inside dirty cells before saving.`,
      prompt: `Build an inline bulk-edit data table in HTML, CSS and vanilla JavaScript where individual cells are directly editable and a floating save bar tracks unsaved changes across the whole table — no external libraries.

Requirements:
- A table where designated cells use contenteditable="true" while other columns (like an ID column) remain plain, read-only text.
- On page load, capture every editable cell's original text value so later edits can be compared against it.
- As a user edits a cell, visually mark it "dirty" the instant its content differs from its original value, and automatically clear that dirty state if the user types the original value back.
- A floating save bar, hidden by default, that appears once at least one cell is dirty and shows a live count of dirty cells across the entire table (not per row).
- A Save button in the bar that commits all dirty cells at once (updating their stored "original" value and clearing dirty state) and a Discard button that reverts all dirty cells back to their original values in one action.
- Pressing Enter while editing a cell should confirm/blur the cell rather than insert a line break.`,
    },
  },
};

export default tableInlineCellBulkEdit;
