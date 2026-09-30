const frozenColumnsTable = {
  id: 'frozen-columns-table',
  title: 'Frozen Columns Table',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="fct-card">
  <div class="fct-head">
    <h3>Quarterly revenue by account</h3>
    <p class="fct-hint">Scroll right — the first two columns stay pinned.</p>
  </div>
  <div class="fct-scroll">
    <table class="fct-table">
      <thead>
        <tr>
          <th class="fct-frozen fct-frozen-1">Account</th>
          <th class="fct-frozen fct-frozen-2">Owner</th>
          <th>Q1 2025</th><th>Q2 2025</th><th>Q3 2025</th><th>Q4 2025</th>
          <th>Q1 2026</th><th>Q2 2026</th><th>Q3 2026</th><th>Q4 2026</th>
        </tr>
      </thead>
      <tbody id="fctBody"></tbody>
    </table>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;color:#e6e9f2;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.fct-card{background:#121828;border-radius:16px;padding:18px;width:100%;max-width:760px;border:1px solid #1f2740;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.fct-head{margin-bottom:12px}
.fct-head h3{font-size:15px;font-weight:800;color:#f4f6fb}
.fct-hint{font-size:11.5px;color:#7d87a8;font-weight:600;margin-top:2px}

.fct-scroll{overflow-x:auto;border-radius:10px;border:1px solid #1f2740;max-width:100%}
.fct-table{border-collapse:separate;border-spacing:0;font-size:12.5px;min-width:920px;width:100%}
.fct-table th,.fct-table td{padding:10px 14px;text-align:right;white-space:nowrap;border-bottom:1px solid #1c2338}
.fct-table th:nth-child(1),.fct-table th:nth-child(2),.fct-table td:nth-child(1),.fct-table td:nth-child(2){text-align:left}
.fct-table thead th{background:#171e33;font-weight:700;color:#9aa4c4;font-size:11px;text-transform:uppercase;letter-spacing:.04em;position:sticky;top:0;z-index:3}
.fct-table tbody td{color:#dfe3f0;font-variant-numeric:tabular-nums}
.fct-table tbody tr:hover td{background:#161d33}

.fct-frozen{position:sticky;z-index:4;background:#171e33}
.fct-frozen-1{left:0;min-width:160px}
.fct-frozen-2{left:160px;min-width:120px;box-shadow:2px 0 0 rgba(0,0,0,.25)}
td.fct-frozen{z-index:2}
tbody .fct-frozen-1{left:0;background:#131a2c}
tbody .fct-frozen-2{left:160px;background:#131a2c}
tbody tr:hover .fct-frozen-1,tbody tr:hover .fct-frozen-2{background:#1a2238}
.fct-frozen-2::after{content:'';position:absolute;top:0;right:-1px;bottom:0;width:6px;background:linear-gradient(90deg,rgba(0,0,0,.35),transparent);pointer-events:none}
.fct-table th,.fct-table td{position:relative}

.fct-owner{display:flex;align-items:center;gap:8px}
.fct-avatar{width:20px;height:20px;border-radius:50%;background:#6366f1;color:#fff;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0}`,

  js: `var ACCOUNTS = [
  { name: 'Northwind Traders', owner: 'Priya Nair', values: [82000, 91000, 87000, 104000, 112000, 118000, 121000, 130000] },
  { name: 'Globex Corp', owner: 'Marcus Webb', values: [54000, 58000, 61000, 59000, 64000, 68000, 71000, 75000] },
  { name: 'Initech LLC', owner: 'Yuki Tanaka', values: [131000, 128000, 140000, 152000, 149000, 158000, 162000, 171000] },
  { name: 'Umbrella Retail', owner: 'Elena Cruz', values: [23000, 25000, 27000, 26000, 29000, 31000, 33000, 35000] },
  { name: 'Hooli Systems', owner: 'Dan Osei', values: [67000, 71000, 69000, 74000, 78000, 81000, 85000, 89000] },
  { name: 'Soylent Group', owner: 'Ines Farah', values: [45000, 47000, 49000, 51000, 53000, 55000, 58000, 61000] },
];

function money(n) { return '$' + n.toLocaleString(); }
function initials(name) { return name.split(' ').map(function (p) { return p[0]; }).join('').slice(0, 2); }

var body = document.getElementById('fctBody');
body.innerHTML = ACCOUNTS.map(function (a) {
  var cells = a.values.map(function (v) { return '<td>' + money(v) + '</td>'; }).join('');
  return '<tr>' +
    '<td class="fct-frozen fct-frozen-1">' + a.name + '</td>' +
    '<td class="fct-frozen fct-frozen-2"><span class="fct-owner"><span class="fct-avatar">' + initials(a.owner) + '</span>' + a.owner + '</span></td>' +
    cells +
  '</tr>';
}).join('');`,

  seo: {
    title: 'Frozen Columns Table — Sticky Horizontal Pinned Columns HTML CSS JS',
    description: `A wide table with the first two columns pinned in place with real position:sticky while the rest scrolls horizontally. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Frozen Columns Table — Pin Leading Columns With Real position:sticky',
      description: `A wide table with a dozen quarters or metrics across the top is unreadable the moment you scroll right and lose sight of which row you're even looking at. Spreadsheets solve this with "freeze panes" — the leading identifying columns (name, id, owner) stay put while the rest of the data scrolls underneath. This snippet builds that with genuine \`position: sticky\` on the frozen cells themselves, not a fake overlay or a second table drawn on top.

**Sticky columns, not a sticky header**

It's easy to confuse this with a [sticky header table](/ui-snippets/sticky-header-table/), which pins rows vertically as you scroll down. This is the perpendicular problem: pinning columns horizontally as you scroll right, inside a container with \`overflow-x: auto\`. Both the frozen \`<th>\` and every frozen \`<td>\` in that column get \`position: sticky\` with a \`left\` offset — the header uses \`fct-frozen-1\` at \`left: 0\` and \`fct-frozen-2\` at \`left: 160px\` (the first column's width), so the second frozen column sits flush against the first rather than overlapping it.

**Why every frozen cell needs its own sticky rule, not just the column**

CSS has no way to say "this column is sticky" — sticky positioning is a per-element property, so the class has to be applied to every \`<th>\` and every \`<td>\` in that column, each with the same \`left\` value. That's why the JS building each row's markup writes \`fct-frozen fct-frozen-1\` and \`fct-frozen fct-frozen-2\` onto the corresponding \`<td>\`s directly rather than relying on a single rule targeting a column position — sticky only works cell by cell.

**Layering frozen cells above scrolling ones**

As scrolling cells slide underneath the frozen columns, the frozen cells need an opaque background and a higher \`z-index\` or they'd let the scrolling content show through. The header's frozen cells get \`z-index: 4\` (above both scrolling header cells at \`z-index: 3\` and body cells), and body frozen cells get \`z-index: 2\`, so the visual stacking always reads correctly no matter how far right you scroll.

**A subtle edge to signal the seam**

Without a visual cue, it's not obvious to the eye where "frozen" ends and "scrolling" begins. A small \`::after\` gradient shadow on the second frozen column's right edge fades from dark to transparent, mimicking the drop-shadow spreadsheet apps use at a freeze-pane boundary — a cheap but effective affordance.

**Hover state that spans both zones**

Because frozen and scrolling cells are separate DOM elements per row, a row hover needs \`tbody tr:hover td\` and an explicit override for the frozen cells' background (\`tbody tr:hover .fct-frozen-1\`) so the whole row — frozen and scrolling parts alike — highlights together, keeping the illusion of one continuous row intact.

**Customizing it**

Freeze one column instead of two by dropping the \`fct-frozen-2\` class and adjusting widths, or freeze three by adding a \`fct-frozen-3\` at \`left: 280px\`. Pair it with [resizable columns](/ui-snippets/resizable-columns-table/) or a [column drag reorder](/ui-snippets/table-column-drag-reorder/) for a fuller spreadsheet-grade table.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A revenue table with eight quarterly columns renders inside a horizontally scrollable card.` },
      { title: 'Scroll the table right', text: `The Account and Owner columns stay pinned in place while the quarter columns slide underneath.` },
      { title: 'Hover a row', text: `The highlight spans both the frozen and scrolling portions of the row together.` },
      { title: 'Watch the edge shadow', text: `A subtle gradient on the second frozen column marks the freeze-pane boundary as content scrolls under it.` },
      { title: 'Add or remove a frozen column', text: `Apply fct-frozen plus a fct-frozen-N class (with the right left offset) to freeze more or fewer leading columns.` },
      { title: 'Swap in your own data', text: `Replace the ACCOUNTS array — each row's cells render from a plain array of values.` },
    ] },
    features: [
      { title: 'Real position:sticky columns', text: `Frozen th and td elements use sticky with a left offset — not a duplicated overlay table.` },
      { title: 'Per-cell sticky application', text: `Every frozen cell in a column carries the sticky class, since CSS has no column-level sticky selector.` },
      { title: 'Stacked z-index layering', text: `Frozen cells sit above scrolling ones with distinct z-index tiers for header versus body.` },
      { title: 'Freeze-pane edge shadow', text: `A gradient on the last frozen column's edge signals the scroll boundary, spreadsheet-style.` },
      { title: 'Unified row hover', text: `Hover styling spans frozen and scrolling cells so the row reads as one continuous highlight.` },
      { title: 'Sticky header too', text: `The header row is simultaneously sticky vertically, so column labels stay visible on tall tables.` },
      { title: 'Right-aligned numeric columns', text: `Quarterly values are right-aligned with tabular numerals for easy scanning down a column.` },
      { title: 'Configurable freeze count', text: `Freeze one, two, or more leading columns by adding matching fct-frozen-N classes and left offsets.` },
    ],
    useCases: [
      { title: 'Financial and revenue dashboards', text: `Keep account names visible while scanning many quarters or months of figures.` },
      { title: 'Spreadsheet-style admin tools', text: `Pair with a [resizable columns table](/ui-snippets/resizable-columns-table/) for an Excel-like internal tool.` },
      { title: 'Wide product or SKU catalogs', text: `Freeze product name and SKU while scrolling through per-warehouse stock columns.` },
      { title: 'Comparison matrices', text: `Keep the row label frozen in a wide [comparison table](/ui-snippets/comparison-table/) with many feature columns.` },
      { title: 'Timesheet and scheduling grids', text: `Pin employee name while scrolling across days or weeks of shift data.` },
      { title: 'Learning sticky positioning', text: `A clear reference for combining horizontal and vertical position:sticky in one table.` },
      { icon: 'CODE', title: 'Related: Shift-Click Range Select in a Table (Gmail/Sheets-Style)', desc: 'See the [Shift-Click Range Select in a Table (Gmail/Sheets-Style)](/ui-snippets/shift-click-range-select-table/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do both the header and body cells need the sticky class?', a: `Sticky positioning is applied per element, not per column — CSS has no selector that means "this entire column." The header's th and every td in that column across every row must each carry the fct-frozen class with a matching left offset, or only some rows would freeze correctly while others scrolled away.` },
      { q: 'How do I freeze three columns instead of two?', a: `Add a fct-frozen-3 rule with left set to the combined width of the first two frozen columns (e.g. 280px if they're 160px and 120px), apply fct-frozen fct-frozen-3 to the third column's th and every td, and give it its own z-index and background so it layers correctly above scrolling cells.` },
      { q: 'Why do the frozen cells need an opaque background?', a: `Without one, scrolling cells sliding underneath would show through the "frozen" cells as you scroll, breaking the illusion. Setting an explicit background color on every frozen cell (and a distinct hover background) keeps the pinned columns visually solid at all scroll positions.` },
      { q: 'Does this work on mobile and touch devices?', a: `Yes — position:sticky and overflow-x:auto both work with native touch scrolling, so a user can swipe the table horizontally and the frozen columns stay pinned exactly as they do with mouse-wheel or trackpad scrolling.` },
      { q: 'How do I use this frozen columns table in React, Vue, or Angular?', a: `Render the table exactly the same way — the sticky behavior is pure CSS and needs no JavaScript beyond building the row markup. In React, map ACCOUNTS to JSX rows with the same fct-frozen classes; in Vue or Angular use v-for or *ngFor. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than puzzling out the sticky offsets by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why every frozen td in a column needs its own position:sticky rule rather than one rule targeting "the column," and why the second frozen column's left offset must equal the first frozen column's width in pixels. The same assistant can help you extend it — ask it to make the freeze count configurable via a data attribute, add a resize handle so a frozen column's width (and therefore the next column's left offset) can change dynamically, or combine this with sticky header rows for freezing in both directions at once, which this snippet already does but is worth verifying interacts correctly as you add more frozen columns. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "frozen columns" data table in plain HTML, CSS, and JavaScript with no library — a wide table where the first two columns stay visually pinned in place while the rest of the table's columns scroll horizontally underneath them.

Requirements:
- Wrap the table in a container with overflow-x: auto and give the table a min-width wider than the container so it actually needs horizontal scrolling.
- Use real CSS position: sticky (not a duplicated overlay table or JavaScript-driven repositioning) on both the header cell and every body cell of the first two columns, with a left offset — the first frozen column at left: 0 and the second at left equal to the first column's pixel width, so the two frozen columns sit flush against each other with no gap or overlap.
- Give the frozen cells a higher z-index than the scrolling cells and an explicit opaque background color, so as columns slide underneath during a horizontal scroll they do not visually show through the frozen ones.
- Also make the header row sticky vertically (position: sticky, top: 0) so column labels remain visible if the table is tall enough to scroll vertically too, and make sure the header's frozen cells have the highest z-index of all so they stay above both scrolling header cells and frozen body cells.
- Add a subtle right-edge shadow or gradient on the last frozen column to visually mark the boundary between frozen and scrolling content, similar to a spreadsheet's freeze-pane divider.
- Make row hover styling apply consistently across both the frozen and scrolling cells of a row, so hovering highlights the entire row as one visual unit despite frozen and scrolling cells being separate elements.
- Render the table rows from a plain JavaScript array of row objects (name, owner, and several numeric values), building the row's HTML string in a loop rather than hardcoding every row by hand.`,
    },
  },
};

export default frozenColumnsTable;
