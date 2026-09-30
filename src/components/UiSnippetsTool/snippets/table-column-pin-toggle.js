const tableColumnPinToggle = {
  id: 'table-column-pin-toggle',
  title: 'Table Column Pin/Unpin Toggle — User-Controlled Sticky Columns',
  lastmod: '2026-08-28',
  category: 'tables',
  html: `<div class="demo">
  <div class="pin-scroll" id="pinScroll">
    <table class="pin-table" id="pinTable">
      <thead>
        <tr>
          <th data-col="0"><span>Project</span><button class="pin-btn" data-col="0" aria-label="Pin Project column">📌</button></th>
          <th data-col="1"><span>Owner</span><button class="pin-btn" data-col="1" aria-label="Pin Owner column">📌</button></th>
          <th data-col="2"><span>Status</span><button class="pin-btn" data-col="2" aria-label="Pin Status column">📌</button></th>
          <th data-col="3"><span>Budget</span><button class="pin-btn" data-col="3" aria-label="Pin Budget column">📌</button></th>
          <th data-col="4"><span>Start date</span><button class="pin-btn" data-col="4" aria-label="Pin Start date column">📌</button></th>
          <th data-col="5"><span>Deadline</span><button class="pin-btn" data-col="5" aria-label="Pin Deadline column">📌</button></th>
          <th data-col="6"><span>Region</span><button class="pin-btn" data-col="6" aria-label="Pin Region column">📌</button></th>
        </tr>
      </thead>
      <tbody>
        <tr><td data-col="0">Nebula Redesign</td><td data-col="1">Mia Chen</td><td data-col="2">Active</td><td data-col="3">$84,000</td><td data-col="4">Jan 12</td><td data-col="5">Sep 30</td><td data-col="6">EU</td></tr>
        <tr><td data-col="0">Atlas Migration</td><td data-col="1">Sam Okoye</td><td data-col="2">On hold</td><td data-col="3">$142,500</td><td data-col="4">Feb 03</td><td data-col="5">Nov 15</td><td data-col="6">NA</td></tr>
        <tr><td data-col="0">Comet Onboarding</td><td data-col="1">Jules Park</td><td data-col="2">Active</td><td data-col="3">$36,200</td><td data-col="4">Mar 21</td><td data-col="5">Oct 05</td><td data-col="6">APAC</td></tr>
        <tr><td data-col="0">Vega Analytics</td><td data-col="1">Ravi Singh</td><td data-col="2">Completed</td><td data-col="3">$59,000</td><td data-col="4">Apr 09</td><td data-col="5">Aug 18</td><td data-col="6">NA</td></tr>
      </tbody>
    </table>
  </div>
  <p class="pin-hint">Click the pin icon on a column header to keep that column visible while scrolling horizontally.</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 560px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.pin-scroll { overflow-x: auto; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff; }
.pin-table { border-collapse: collapse; width: max-content; min-width: 100%; }
.pin-table th, .pin-table td { padding: 10px 16px; font-size: 13px; text-align: left; white-space: nowrap; border-bottom: 1px solid #f1f5f9; }
.pin-table th { background: #f8fafc; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; border-bottom: 1px solid #e2e8f0; display: table-cell; position: relative; }
.pin-table th span { display: inline-block; margin-right: 22px; }
.pin-table tbody tr:last-child td { border-bottom: none; }

.pin-btn { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; font-size: 12px; opacity: 0.35; padding: 2px; border-radius: 4px; filter: grayscale(1); transition: opacity 0.15s, filter 0.15s; }
.pin-btn:hover { opacity: 0.8; }
.pin-btn:focus-visible { outline: 2px solid #6366f1; opacity: 1; }
th.pinned .pin-btn { opacity: 1; filter: none; }

th.pinned, td.pinned {
  position: sticky;
  z-index: 2;
  background: #fff;
  box-shadow: 2px 0 6px rgba(15,23,42,0.06);
}
th.pinned { background: #f1f5f9; z-index: 3; }

.pin-hint { font-size: 11.5px; color: #94a3b8; }`,
  js: `const table = document.getElementById('pinTable');
const headerCells = Array.from(table.querySelectorAll('thead th'));
const pinButtons = Array.from(table.querySelectorAll('.pin-btn'));

const pinnedCols = new Set();

// Sticky-positioning a column requires knowing exactly how far from the left
// edge every *other currently-pinned* column already extends — pin two
// columns and the second one's "left" offset must equal the first one's
// full rendered width, not zero. This has to be recalculated every time the
// pinned set changes, since widths and the pin order both affect it.
function recalculateStickyOffsets() {
  let runningLeft = 0;
  headerCells.forEach((th, colIndex) => {
    const isPinned = pinnedCols.has(colIndex);
    const cellsInColumn = [th, ...table.querySelectorAll(\`tbody td[data-col="\${colIndex}"]\`)];

    cellsInColumn.forEach((cell) => cell.classList.toggle('pinned', isPinned));

    if (isPinned) {
      cellsInColumn.forEach((cell) => { cell.style.left = runningLeft + 'px'; });
      runningLeft += th.getBoundingClientRect().width;
    } else {
      cellsInColumn.forEach((cell) => { cell.style.left = ''; });
    }
  });
}

pinButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const col = parseInt(btn.dataset.col, 10);
    const label = btn.closest('th').querySelector('span').textContent;

    if (pinnedCols.has(col)) {
      pinnedCols.delete(col);
      btn.setAttribute('aria-label', \`Pin \${label} column\`);
      btn.textContent = '📌';
    } else {
      pinnedCols.add(col);
      btn.setAttribute('aria-label', \`Unpin \${label} column\`);
      btn.textContent = '📍';
    }

    recalculateStickyOffsets();
  });
});

recalculateStickyOffsets();
window.addEventListener('resize', recalculateStickyOffsets);`,
  seo: {
    title: 'Table Column Pin/Unpin Toggle — User-Controlled Sticky Columns',
    description: 'Wide data table where any column can be pinned on demand via a header button — pinned columns stack correctly left-to-right with recalculated sticky offsets, not just one fixed frozen column.',
    about: {
      title: 'User-Controlled Column Pinning — Sticky Columns That Stack Correctly',
      description: `A table with a single hardcoded frozen first column is common — but real data tables often need the *user* to decide which column matters most to keep visible, and to be able to pin more than one. This snippet implements genuine per-column pinning: click the pin icon on any header, and that column sticks to the left edge while the rest of the table scrolls underneath it — and multiple pinned columns stack correctly side by side, in pin order.

**Why sticky columns can't all just use \`left: 0\`**

CSS \`position: sticky\` needs an explicit \`left\` offset, and that offset is different for every pinned column depending on how many *other* pinned columns come before it and how wide each of those already is. Pin the first column and it sticks at \`left: 0\`. Pin a second column after it, and that second column must sit at \`left: <width of the first pinned column>px\` — not \`left: 0\` (which would overlap it) and not some column-index-based guess (since pinning order and column order aren't guaranteed to match, and column widths vary with content).

**\`recalculateStickyOffsets()\` — the core of the whole pattern**

This function walks every column left to right, and for each one that's currently pinned, it assigns \`left\` equal to a running total (\`runningLeft\`) of every already-processed pinned column's actual rendered width, then adds this column's own width to that running total before moving to the next. Because it always recalculates from scratch — rather than trying to incrementally patch offsets — pinning or unpinning any column in any order always produces a correct, non-overlapping stack of sticky columns, without needing to track fragile per-column deltas.

**Every cell in a column, not just the header, needs the same treatment**

Pinning a column means every \`<td>\` in that column (not just its \`<th>\`) needs \`position: sticky\`, the same \`left\` offset, and a background color to stay visually opaque as content scrolls underneath. The function queries \`tbody td[data-col="…"]\` for each column index alongside its header cell, so the entire column — header and every row's cell — pin and unpin together as one atomic unit, never leaving a header pinned while its body cells scroll away underneath (or vice versa).

**Recalculating on resize, not just on pin/unpin**

Column widths can change when the viewport resizes (text wrapping differently, or a responsive layout adjusting), which would silently invalidate previously-correct \`left\` offsets. Re-running \`recalculateStickyOffsets()\` on the window's \`resize\` event keeps every pinned column's offset accurate even if its own or an earlier pinned column's rendered width has changed since it was last pinned.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll the table horizontally', text: 'With no columns pinned, the whole table scrolls together — try it first to see the full width of data available.' },
        { title: 'Click a pin icon in a header', text: 'That column sticks to the left edge and stays visible as you continue scrolling horizontally; the icon changes to indicate it is pinned.' },
        { title: 'Pin a second column', text: 'It stacks correctly to the right of the first pinned column — recalculateStickyOffsets() computes its offset from the first column\'s actual rendered width.' },
        { title: 'Unpin a column', text: 'Click its pin icon again — the column scrolls normally again, and any columns pinned after it shift their offsets to close the gap automatically.' },
        { title: 'Resize the window', text: 'Offsets recalculate on resize, so pinned columns stay correctly aligned even if column widths change.' },
      ],
    },
    features: [
      'Any column can be pinned or unpinned independently by the user, not just a single hardcoded frozen column',
      'Multiple pinned columns stack correctly left to right based on actual rendered widths, not column index',
      'recalculateStickyOffsets() always recomputes from scratch, so any pin/unpin order produces a correct, non-overlapping result',
      'Header and body cells for a column pin and unpin together atomically, never falling out of sync with each other',
      'Recalculates offsets on window resize, keeping pinned columns aligned as rendered widths change',
      'Pinned columns get a subtle drop shadow and distinct header background to visually separate them from scrolling content',
      'Pin button accessible label updates between "Pin" and "Unpin" to reflect current state for screen reader users',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Wide admin data tables', desc: 'Let users choose to pin the column most relevant to their current task — project name, owner, or ID — rather than a fixed default.' },
      { icon: 'FINANCE', title: 'Financial and spreadsheet-style grids', desc: 'Mirrors the freeze-panes behavior finance users expect from Excel and Google Sheets, but user-controlled per column.' },
      { icon: 'DASHBOARD', title: 'Reporting and analytics tables', desc: 'Wide tables with many metric columns benefit from letting users pin whichever identifying column matters most to their view.' },
      { icon: 'CRM', title: 'CRM and pipeline tables', desc: 'Sales and support tools with many columns (owner, status, value, dates) benefit from flexible per-user pinning rather than one fixed layout for everyone.' },
      { icon: 'CODE', title: 'Related: Inline Cell Bulk-Edit Table — Floating Save Bar', desc: 'See the [Inline Cell Bulk-Edit Table — Floating Save Bar](/ui-snippets/table-inline-cell-bulk-edit/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why can\'t every pinned column just use left: 0?', a: 'Only the first pinned column can sit at left: 0 without overlapping anything. Any subsequent pinned column needs a left offset equal to the total rendered width of every pinned column before it, which recalculateStickyOffsets() computes fresh every time the pinned set changes.' },
      { q: 'What happens if I unpin a column that has another pinned column after it?', a: 'recalculateStickyOffsets() recomputes every pinned column\'s offset from scratch on every change, so the remaining pinned columns automatically shift left to close the gap left by the unpinned one — there is no stale, hardcoded offset left behind.' },
      { q: 'Does pinning affect just the header, or the whole column?', a: 'The whole column — every td in that column (queried by its shared data-col attribute) gets the same sticky positioning, offset, and background as its header, so the column pins and unpins as one visual unit.' },
      { q: 'Why recalculate offsets on window resize?', a: 'A pinned column\'s rendered width can change when the viewport resizes (due to text reflow or responsive layout changes), which would invalidate previously-correct offsets for any columns pinned after it. Recalculating on resize keeps the stack correctly aligned.' },
      { q: 'Can I pin more than two columns?', a: 'Yes — the pinnedCols Set and the running-offset calculation both work for any number of pinned columns in any order; there is no hardcoded limit in the logic.' },
      { q: 'How would I persist which columns are pinned across page reloads?', a: 'Serialize the pinnedCols Set (e.g. Array.from(pinnedCols)) to localStorage whenever it changes, and read it back on page load to re-apply the same pinned columns before the first recalculateStickyOffsets() call.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain exactly why sticky column offsets must be recalculated from a running total rather than derived from a column's own index, and to trace through what would go wrong if the second pinned column were hardcoded to some fixed left value instead. It's also worth asking for a version that persists pinned columns to localStorage, or one that lets users drag to reorder which pinned column appears leftmost rather than always following the original column order.`,
      prompt: `Build a wide, horizontally-scrollable data table in HTML, CSS, and vanilla JavaScript where the user can pin or unpin individual columns via a button in each header cell — no external library.

Requirements:
- A table with at least six columns and several rows, wrapped in a horizontally scrollable container, with a pin toggle button in every header cell.
- Clicking a column's pin button toggles position: sticky on that column's header cell and every body cell in that column (matched via a shared column-index data attribute), giving pinned cells an opaque background and a subtle shadow so scrolling content underneath doesn't show through.
- When more than one column is pinned, they must stack correctly side by side in pin order — each pinned column's sticky "left" offset must equal the total actual rendered width of every already-pinned column before it, recalculated fresh (not hardcoded) every time a column is pinned or unpinned.
- Unpinning a column must correctly shift any remaining pinned columns to close the gap it leaves behind, without requiring a page reload.
- Recalculate all sticky offsets on window resize, since rendered column widths can change and would otherwise leave stale, incorrect offsets behind.
- Update each pin button's accessible label (aria-label) to reflect whether it currently pins or unpins its column.`,
    },
  },
};

export default tableColumnPinToggle;
