const shiftClickRangeSelectTable = {
  id: 'shift-click-range-select-table',
  title: 'Shift-Click Range Select in a Table (Gmail/Sheets-Style)',
  lastmod: '2026-08-28',
  category: 'tables',
  html: `<div class="demo">
  <div class="table-toolbar">
    <span class="sel-count" id="selCount">0 selected</span>
    <span class="sel-hint">Click a row to select it, Shift-click another to select the range between them, Cmd/Ctrl-click to toggle one row</span>
  </div>
  <table class="sel-table">
    <thead>
      <tr><th class="th-check"></th><th>Name</th><th>Status</th><th>Owner</th></tr>
    </thead>
    <tbody id="tbody">
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Landing page redesign</td><td><span class="status live">Live</span></td><td>Mia Chen</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Checkout flow v2</td><td><span class="status draft">Draft</span></td><td>Sam Okoye</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Pricing page copy</td><td><span class="status review">Review</span></td><td>Jules Park</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Onboarding emails</td><td><span class="status live">Live</span></td><td>Mia Chen</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Mobile nav revamp</td><td><span class="status draft">Draft</span></td><td>Ravi Singh</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>API docs refresh</td><td><span class="status review">Review</span></td><td>Sam Okoye</td></tr>
      <tr data-row><td class="td-check"><input type="checkbox" tabindex="-1" /></td><td>Dark mode support</td><td><span class="status live">Live</span></td><td>Jules Park</td></tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 560px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.table-toolbar { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
.sel-count { font-size: 12.5px; font-weight: 700; color: #4338ca; background: #eef2ff; padding: 4px 10px; border-radius: 999px; }
.sel-hint { font-size: 11px; color: #94a3b8; }

.sel-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; user-select: none; }
.sel-table th { text-align: left; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; padding: 10px 12px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
.sel-table td { padding: 10px 12px; font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; }
.sel-table tr:last-child td { border-bottom: none; }
.th-check, .td-check { width: 34px; }
.td-check input { pointer-events: none; accent-color: #6366f1; }

tr[data-row] { cursor: pointer; transition: background 0.1s; }
tr[data-row]:hover { background: #f8fafc; }
tr[data-row].selected { background: #eef2ff; }
tr[data-row].anchor { outline: 2px solid #6366f1; outline-offset: -2px; }

.status { font-size: 11px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.status.live { background: #ecfdf5; color: #047857; }
.status.draft { background: #f1f5f9; color: #64748b; }
.status.review { background: #fffbeb; color: #b45309; }`,
  js: `const tbody = document.getElementById('tbody');
const selCount = document.getElementById('selCount');
const rows = Array.from(tbody.querySelectorAll('tr[data-row]'));

let anchorIndex = null; // the last row clicked without a modifier — the fixed end of a shift-click range
const selected = new Set();

function updateRowVisuals() {
  rows.forEach((row, i) => {
    row.classList.toggle('selected', selected.has(i));
    row.querySelector('input[type="checkbox"]').checked = selected.has(i);
    row.classList.toggle('anchor', i === anchorIndex);
  });
  selCount.textContent = \`\${selected.size} selected\`;
}

function selectRange(from, to) {
  const [start, end] = from <= to ? [from, to] : [to, from];
  selected.clear();
  for (let i = start; i <= end; i++) selected.add(i);
}

rows.forEach((row, index) => {
  row.addEventListener('click', (e) => {
    const isToggleModifier = e.metaKey || e.ctrlKey;
    const isRangeModifier = e.shiftKey;

    if (isRangeModifier && anchorIndex !== null) {
      // Range select: fill every row between the anchor and this row,
      // replacing whatever selection existed before — matches Sheets/Gmail
      // behavior where shift-click always defines a fresh contiguous range
      // from the anchor, not an additive union with prior clicks.
      selectRange(anchorIndex, index);
    } else if (isToggleModifier) {
      // Toggle select: add or remove just this one row, leaving everything
      // else untouched, and move the anchor here so a *subsequent* shift-click
      // ranges from this newly toggled row rather than the old anchor.
      if (selected.has(index)) selected.delete(index);
      else selected.add(index);
      anchorIndex = index;
    } else {
      // Plain click: a fresh single-row selection, and this row becomes the
      // new anchor for any future shift-click range.
      selected.clear();
      selected.add(index);
      anchorIndex = index;
    }

    updateRowVisuals();
  });
});

updateRowVisuals();`,
  seo: {
    title: 'Shift-Click Range Select in a Table — Gmail/Sheets-Style Multi-Row Selection',
    description: 'A data table implementing real shift-click contiguous range selection and Cmd/Ctrl-click individual toggling, tracking a selection anchor exactly the way spreadsheet and email apps do.',
    about: {
      title: 'Shift-Click Range Selection — The Anchor-Based Pattern Behind Sheets and Gmail',
      description: `Most custom-built admin tables only support one selection mode: click a checkbox, one row at a time. Power users expect the selection behavior every spreadsheet and email client has trained them on for decades — plain click selects one row, **Shift-click selects everything between** that row and the last one clicked, and **Cmd/Ctrl-click toggles a single row** without disturbing the rest of the selection. This snippet implements all three modes correctly, built around the one concept that makes range selection possible: a persistent **anchor**.

**What the anchor actually is**

\`anchorIndex\` tracks the index of the last row clicked *without* the Shift modifier — not simply "the last row clicked" in general. This distinction is what makes range selection predictable: Shift-clicking always measures a range from that fixed anchor point, regardless of how many Shift-clicks happen afterward. Click row 2, Shift-click row 6 (selects 2–6), then Shift-click row 4 — the range recalculates as 2–4, not "extend from 6 to 4," because the anchor never moved during any of the Shift-click steps. This exactly matches how Sheets and Gmail behave, and is the detail most hand-rolled implementations get wrong by treating "last clicked row" and "anchor" as the same thing.

**Why Shift-click replaces the selection instead of adding to it**

\`selectRange()\` calls \`selected.clear()\` before filling in the new range — a fresh Shift-click always defines a brand-new contiguous selection from the anchor, discarding whatever was selected before. This mirrors real spreadsheet behavior: Shift-click is for *defining a range*, not *appending to an existing arbitrary selection* (that's what Cmd/Ctrl-click is for). Conflating the two would make it impossible to ever shrink a range back down after over-shooting it with a previous Shift-click.

**Why Cmd/Ctrl-click moves the anchor, but plain click also moves it**

Both the toggle path and the plain-click path update \`anchorIndex\` to the row that was just clicked — but Shift-click deliberately does **not**. This means a user can Cmd-click three unrelated rows, and if they then Shift-click a fourth, the range is measured from the *last Cmd-clicked row* (since that click updated the anchor), letting range and toggle selection compose naturally in the same interaction sequence, exactly as it does in real file managers and spreadsheets.

**Checkboxes reflect state, they don't drive it**

Every row's checkbox has \`tabindex="-1"\` and \`pointer-events: none\` in the CSS — they're rendered purely as a *visual reflection* of \`selected\`, not an independent interactive control a user could click directly. All selection logic lives in the row's own click handler, so there's exactly one source of truth for whether a row is selected, and the checkbox can never fall out of sync with the row's actual selection state.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a row', text: 'Selects just that row and sets it as the anchor for any future Shift-click range.' },
        { title: 'Shift-click a different row', text: 'Selects every row between the anchor and the clicked row, replacing the previous selection with this new contiguous range.' },
        { title: 'Cmd/Ctrl-click a row', text: 'Toggles just that one row on or off without disturbing the rest of the selection, and moves the anchor to it.' },
        { title: 'Combine the two', text: 'Cmd-click a few individual rows, then Shift-click another — the range is measured from the last Cmd-clicked row, letting the two modes compose naturally.' },
        { title: 'Wire up bulk actions', text: 'Read the selected Set (or the checked checkboxes) to drive a bulk-action toolbar — the selection state is already fully tracked and ready to use.' },
      ],
    },
    features: [
      'Genuine anchor-based Shift-click range selection, matching Sheets/Gmail/Finder behavior exactly',
      'Cmd/Ctrl-click toggles individual rows without disturbing the rest of the selection',
      'Anchor updates on plain click and toggle click, but deliberately not on Shift-click — enabling correct mode composition',
      'Checkboxes are a pure visual reflection of selection state, not an independent interactive control (pointer-events: none)',
      'Live selection count updates in the toolbar on every interaction',
      'Selected rows get a distinct background and the current anchor row gets a visible outline',
      'A range selection always replaces the prior selection rather than merging with it, matching real spreadsheet semantics',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Admin data tables', desc: 'Any internal tool listing rows a user needs to bulk-select — users, orders, content items — benefits from familiar range selection.' },
      { icon: 'EMAIL', title: 'Inbox-style list views', desc: 'Message or notification lists where selecting a contiguous block for a bulk action (archive, delete, mark read) is common.' },
      { icon: 'FILES', title: 'File and asset managers', desc: 'File browser grids and lists where users expect the exact same Shift/Cmd-click conventions from their OS file manager.' },
      { icon: 'SPREADSHEET', title: 'Spreadsheet-like data grids', desc: 'Any grid UI aiming to feel native to users coming from Excel, Sheets, or Airtable benefits from matching this exact interaction model.' },
      { icon: 'CODE', title: 'Related: Conditional Formatting Table', desc: 'See the [Conditional Formatting Table](/ui-snippets/table-conditional-formatting/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What exactly is the "anchor" and how is it different from "the last clicked row"?', a: 'The anchor is the last row clicked without holding Shift — it updates on a plain click or a Cmd/Ctrl-click, but not on a Shift-click. This is what lets repeated Shift-clicks recalculate a range from a stable, fixed point rather than accidentally chaining forward from whichever row was Shift-clicked most recently.' },
      { q: 'Why does Shift-click replace the whole selection instead of adding the range to it?', a: 'This matches how spreadsheets and file managers behave — Shift-click defines a fresh contiguous range from the anchor. If you want to add a separate non-contiguous row to an existing selection, that is what Cmd/Ctrl-click is for; combining both modifiers in sequence lets you compose ranges and individual toggles together.' },
      { q: 'Can I combine Cmd-click and Shift-click in one selection session?', a: 'Yes — Cmd-click a few individual rows first (each one becomes the new anchor as you go), then Shift-click another row: the range will be measured from the most recently Cmd-clicked row, letting you build up complex selections the same way a spreadsheet allows.' },
      { q: 'Why are the checkboxes not directly clickable?', a: 'They have pointer-events: none and are purely a visual reflection of the selected Set — this guarantees there is exactly one source of truth for selection state (the row click handler), so the checkbox display can never fall out of sync with the actual selection.' },
      { q: 'How do I read which rows are selected for a bulk action?', a: 'The selected Set holds the currently selected row indices at any time — iterate it (or check each row\'s .selected class) to build a bulk-action payload referencing the underlying data for those rows.' },
      { q: 'Does this work with touch devices, where there is no Shift or Ctrl key?', a: 'Shift-click and Ctrl-click are keyboard-modifier-dependent and are primarily a desktop pattern. For touch, pair this with a long-press-to-enter-selection-mode pattern so mobile users have an equivalent way to multi-select without keyboard modifiers.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through exactly why the anchor must be distinct from "the last row clicked" and to trace through a multi-step example (click, shift-click, shift-click again) showing how the range recalculates each time. It's also worth asking for a touch-friendly companion pattern (long-press to enter a multi-select mode) so the same table works well on mobile where Shift/Ctrl modifiers don't exist, or for keyboard-only equivalent controls (Shift+Arrow to extend a range) for full accessibility.`,
      prompt: `Build a data table in HTML, CSS, and vanilla JavaScript implementing genuine Shift-click range selection and Cmd/Ctrl-click toggle selection, matching the behavior of Gmail, Google Sheets, and native file managers — no external library.

Requirements:
- A table of at least six rows, each with a checkbox that visually reflects (but is not itself directly clickable — pointer-events: none) whether that row is currently selected.
- Track a selection "anchor": the index of the last row clicked without any modifier key held, or via a Cmd/Ctrl-click. This anchor must NOT update on a Shift-click.
- A plain click on a row must clear the existing selection, select only that row, and set the anchor to it.
- A Cmd/Ctrl-click on a row must toggle only that row's selection on or off without touching any other currently-selected rows, and must update the anchor to the clicked row.
- A Shift-click on a row must clear the existing selection and select every row in the contiguous range between the current anchor and the clicked row (inclusive, working correctly whether the clicked row is before or after the anchor), without moving the anchor itself.
- Show a live count of currently selected rows in a toolbar above the table, updating immediately on every interaction.
- Visually distinguish selected rows from unselected ones, and give the current anchor row a distinct visual marker (like an outline) separate from the selected-background styling.`,
    },
  },
};

export default shiftClickRangeSelectTable;
