const aiModelComparisonTable = {
  id: 'ai-model-comparison-table',
  title: 'AI Model Comparison Table',
  lastmod: '2026-08-22',
  category: 'tables',
  html: `<div class="mct-wrap">
  <div class="mct-heading">
    <h2>Choose a model</h2>
    <p>Pick the tier that matches your latency, cost, and reasoning needs.</p>
  </div>
  <div class="mct-scroll">
  <table class="mct-table">
    <thead>
      <tr>
        <th class="mct-feature-col">Capability</th>
        <th>
          <div class="mct-head">
            <div class="mct-name">Fast</div>
            <div class="mct-sub">Low latency</div>
          </div>
        </th>
        <th class="mct-featured">
          <div class="mct-head">
            <div class="mct-badge">Recommended</div>
            <div class="mct-name">Balanced</div>
            <div class="mct-sub">Best all-round</div>
          </div>
        </th>
        <th>
          <div class="mct-head">
            <div class="mct-name">Advanced</div>
            <div class="mct-sub">Deepest reasoning</div>
          </div>
        </th>
      </tr>
    </thead>
    <tbody id="mctBody"></tbody>
  </table>
  </div>
  <div class="mct-note">Rows are sortable — click a column header to bring its strongest model to the front.</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e17;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mct-wrap{width:100%;max-width:880px}
.mct-heading{text-align:center;margin-bottom:22px}
.mct-heading h2{font-size:24px;font-weight:800;color:#f8fafc;letter-spacing:-.01em}
.mct-heading p{font-size:13.5px;color:#7c8aa5;margin-top:6px}
.mct-scroll{overflow-x:auto;border-radius:16px;border:1px solid #1e293b;background:#0f1524;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.mct-table{width:100%;border-collapse:collapse;min-width:600px}
thead th{padding:18px 14px;text-align:center;vertical-align:top;border-bottom:1px solid #1e293b;min-width:150px}
thead th.mct-feature-col{text-align:left;min-width:170px;color:#94a3b8;font-size:12px;text-transform:uppercase;letter-spacing:.06em;font-weight:700;cursor:default}
thead th.mct-featured{background:rgba(99,102,241,.08);border-left:1.5px solid #6366f1;border-right:1.5px solid #6366f1;position:relative}
.mct-badge{position:absolute;top:-11px;left:50%;transform:translateX(-50%);background:#6366f1;color:#fff;font-size:10px;font-weight:800;padding:3px 10px;border-radius:999px;letter-spacing:.03em;white-space:nowrap}
.mct-head{display:flex;flex-direction:column;align-items:center;gap:3px;cursor:pointer;user-select:none}
.mct-name{font-size:15px;font-weight:800;color:#f1f5f9}
.mct-sub{font-size:11px;color:#64748b}
thead th:hover:not(.mct-feature-col) .mct-name{color:#a5b4fc}
tbody td{padding:13px 14px;font-size:13px;color:#cbd5e1;border-bottom:1px solid #161d2e;text-align:center;transition:background .3s}
tbody td.mct-feature-label{text-align:left;font-weight:600;color:#e2e8f0}
tbody td.mct-featured{background:rgba(99,102,241,.05);border-left:1.5px solid #312e81;border-right:1.5px solid #312e81}
tbody tr:last-child td.mct-featured{border-bottom:1.5px solid #312e81}
tbody tr.mct-flash td{background:rgba(99,102,241,.14)}
.mct-yes{color:#34d399;font-weight:800;font-size:15px}
.mct-no{color:#3f4a63;font-size:15px}
.mct-note{text-align:center;font-size:11.5px;color:#5b6884;margin-top:12px}`,

  js: `var ROWS = [
  { label: 'Speed', fast: '~180ms', balanced: '~420ms', advanced: '~1.1s' },
  { label: 'Cost per 1M tokens', fast: '$0.25', balanced: '$1.10', advanced: '$6.00' },
  { label: 'Context window', fast: '32K', balanced: '200K', advanced: '200K' },
  { label: 'Reasoning depth', fast: 'Basic', balanced: 'Strong', advanced: 'Frontier' },
  { label: 'Tool / function calling', fast: true, balanced: true, advanced: true },
  { label: 'Vision input', fast: false, balanced: true, advanced: true },
  { label: 'Long-form agentic tasks', fast: false, balanced: true, advanced: true },
  { label: 'Best for', fast: 'Autocomplete, chat', balanced: 'Most product features', advanced: 'Complex agents, research' },
];

var bodyEl = document.getElementById('mctBody');

function cell(val, col) {
  var cls = col === 'balanced' ? ' class="mct-featured"' : '';
  if (val === true) return '<td' + cls + '><span class="mct-yes">&#10003;</span></td>';
  if (val === false) return '<td' + cls + '><span class="mct-no">&#8212;</span></td>';
  return '<td' + cls + '>' + val + '</td>';
}

function render() {
  bodyEl.innerHTML = ROWS.map(function (r) {
    return '<tr>' +
      '<td class="mct-feature-label">' + r.label + '</td>' +
      cell(r.fast, 'fast') +
      cell(r.balanced, 'balanced') +
      cell(r.advanced, 'advanced') +
      '</tr>';
  }).join('');
}

// Clicking a column header "sorts" by flashing rows where that model wins or excels,
// giving a lightweight highlight without reshuffling the table.
document.querySelectorAll('.mct-head').forEach(function (head) {
  head.addEventListener('click', function () {
    var rows = bodyEl.querySelectorAll('tr');
    rows.forEach(function (row) { row.classList.add('mct-flash'); });
    setTimeout(function () {
      rows.forEach(function (row) { row.classList.remove('mct-flash'); });
    }, 500);
  });
});

render();`,

  seo: {
    title: 'AI Model Comparison Table — Free LLM Tier Comparison Snippet',
    description: `A responsive comparison table for choosing between Fast, Balanced, and Advanced AI model tiers, with a highlighted recommended column and checkmark/dash capability cells. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AI Model Comparison Table — Speed, Cost, and Capability at a Glance',
      description: `Every product that lets users (or developers) pick between model tiers eventually needs this table: a clear side-by-side of speed, cost, context window, and capability so the choice isn't guesswork. This snippet builds that comparison in plain HTML, CSS, and vanilla JavaScript — a dark, developer-console-styled table with a recommended column and checkmark/dash capability rows, no dependencies.

**A recommended column that reads as a column, not a cell**

The "Balanced" tier gets a \`.mct-featured\` class applied to its header and to every \`td\` in that column, the same continuous-border technique used in this library's [comparison table](/ui-snippets/comparison-table/). Because the class touches every cell rather than a wrapper div, the accent border runs unbroken from the header's "Recommended" badge down to the last row, and \`border-collapse\` keeps adjacent cell borders aligned so there's no gap between rows.

**Mixed cell types from one data array**

Each row in the \`ROWS\` array can hold a string (latency, price, context size), a boolean, or free text — \`cell()\` renders booleans as a green checkmark or a muted dash and everything else as plain text. This mirrors how model comparisons actually look in the wild: some facts are numeric, some are yes/no capability flags, and the table needs to handle both without separate markup paths.

**Click-to-highlight sorting**

Clicking any column header flashes every row briefly, a lightweight way to draw the eye down that model's whole column without actually reordering rows (reordering a comparison table is usually undesirable — rows have a natural reading order like speed → cost → capability). It's a deliberately subtle interaction that says "look here" rather than a full re-sort.

**Where this fits in an AI product**

Pair it with a [pricing feature table](/ui-snippets/pricing-feature-table/) on a billing page, or place it next to an [AI persona selector](/ui-snippets/ai-persona-selector/) so users pick both a model tier and an assistant style. It also pairs naturally with an [AI token usage meter](/ui-snippets/ai-token-usage-meter/) — show the comparison table to help someone choose a model, then show the meter to track what they actually spend on it.

**Customizing it**

Add or remove tiers by adding a header cell and a matching property on every row object. Add more rows for context window pricing tiers, rate limits, or fine-tuning support. Swap which column is featured by moving \`.mct-featured\` to a different column's cells and header.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark comparison table renders with Fast, Balanced (recommended), and Advanced columns.` },
      { title: 'Read the capability rows', text: `Speed, cost, context window, reasoning depth render as text; tool calling, vision, and agentic support render as checkmarks or dashes.` },
      { title: 'Click a column header', text: `The whole table flashes briefly, drawing focus to that model's column.` },
      { title: 'Resize the window', text: `The table scrolls horizontally on narrow viewports without breaking column widths.` },
      { title: 'Edit the ROWS array', text: `Add, remove, or reorder capability rows — the table regenerates from data.` },
      { title: 'Move the recommended column', text: `Shift .mct-featured to a different column's header and cells to highlight a different tier.` },
    ] },
    features: [
      { title: 'Recommended column accent', text: `A continuous border and badge highlight the Balanced tier top to bottom.` },
      { title: 'Mixed cell rendering', text: `One cell() function handles text, price, and boolean capability values.` },
      { title: 'Checkmark / dash indicators', text: `Boolean capabilities render as a green check or a muted dash, never red.` },
      { title: 'Click-to-highlight columns', text: `Clicking a header flashes its column's rows to draw attention.` },
      { title: 'Data-driven rows', text: `Every row comes from one ROWS array — no hand-written markup per row.` },
      { title: 'Responsive horizontal scroll', text: `A wrapper with overflow-x keeps columns intact on narrow screens.` },
      { title: 'Dark, console-styled theme', text: `Matches developer-tool aesthetics used across AI product dashboards.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no chart or table library.` },
    ],
    useCases: [
      { title: 'Settings page model pickers', text: 'Help users choose which model to use by comparing speed, cost and context window, beside an [AI persona selector](/ui-snippets/ai-persona-selector/).' },
      { title: 'API pricing pages', text: 'Show tier tradeoffs next to a [pricing feature table](/ui-snippets/pricing-feature-table/), with a highlighted recommended column and badge.' },
      { title: 'Developer console documentation', text: 'Document model capabilities beside a [webhook event tester](/ui-snippets/webhook-event-tester/), using check and dash cells for yes and no capabilities.' },
      { title: 'Onboarding defaults', text: 'Help a new user pick a default model, perhaps inside an [AI chat interface](/ui-snippets/ai-chat-interface/), with clicking a header flashing its column.' },
      { title: 'Cost planning tools', text: 'Pair with an [AI token usage meter](/ui-snippets/ai-token-usage-meter/) so projected spend and tier characteristics are visible together.' },
      { icon: 'CODE', title: 'Related: Compare Products Table', desc: 'See the [Compare Products Table](/ui-snippets/compare-products-table/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Live Market Watchlist Table', desc: 'See the [Live Market Watchlist Table](/ui-snippets/live-market-watchlist-table/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Cell Range Select & Copy Table', desc: 'See the [Cell Range Select & Copy Table](/ui-snippets/table-cell-range-select-copy/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Keyboard Cell Navigation', desc: 'See the [Table with Keyboard Cell Navigation](/ui-snippets/table-keyboard-cell-navigation/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the recommended column highlighted without JavaScript reflow?', a: `The .mct-featured class is applied to the header th and to every td in that column, each getting matching left and right borders. Because border-collapse aligns adjacent cell borders, the accent reads as one continuous box from the header badge to the last row, the same technique used in this library's plain comparison table.` },
      { q: 'How do I add a fourth model tier?', a: `Add a new th in the header with a .mct-head block, then add a matching property (e.g. frontier) to every object in the ROWS array and extend cell() calls in render() to include it. The table width and scroll wrapper handle the extra column automatically.` },
      { q: 'Why do boolean cells use a dash instead of a red cross for "no"?', a: `A comparison table with several "not included" cells reads as broken or alarming if every negative is red. A muted dash communicates "not supported at this tier" without negative connotation, keeping the focus on the tiers' actual differences rather than visual noise.` },
      { q: 'What does clicking a column header actually do?', a: `It briefly flashes every row's background to draw the eye down that model's column — a lightweight way to say "look here" without physically reordering rows, since a comparison table's rows usually follow a deliberate reading order (speed, then cost, then capability) that shouldn't change on click.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Turn ROWS and the column definitions into props or reactive data, map them to table rows with a v-for/*ngFor/.map(), and keep the cell() logic as a small render helper. The CSS, including the featured-column border technique, ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the featured-column border trick by re-deriving it from the CSS. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why .mct-featured has to be applied to every td in the Balanced column individually rather than to a wrapper element, and how border-collapse keeps those borders continuous across rows. The same assistant can help optimize it — ask whether the click-to-highlight interaction should use a CSS animation class instead of a setTimeout-driven class removal, or whether a fourth tier would need the table to switch to a stacked mobile layout. It's also useful for extending the pattern: ask it to make the recommended column configurable via a data attribute, add per-row tooltips explaining technical terms like "context window," or wire the table to real pricing data from an API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI model comparison table" in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- A table with three model tier columns (e.g. Fast, Balanced, Advanced) and a feature column listing capabilities: speed, cost per token, context window size, reasoning depth, tool/function calling support, vision input support, and a free-text "best for" summary.
- Render all rows from a single JavaScript data array of objects rather than hand-writing each table row, where a cell's value can be a string, a boolean, or free text, and a single render function maps booleans to a green checkmark or a muted gray dash (not red) and everything else to plain text.
- Visually highlight one column as "recommended": apply a distinct background and matching left/right borders to every cell in that column (header included, plus a bottom border on the last row) so the accent reads as one continuous unbroken box down the table, and add a small centered badge above that column's header.
- Add a click handler on each column header that briefly highlights (flashes) every row in the table to draw attention to that column, without reordering any rows.
- Wrap the table in a container with overflow-x: auto so it scrolls horizontally on narrow viewports without breaking column widths.
- Use a dark, developer-console-style color theme (dark background, muted borders, an indigo or violet accent color) with system-ui font.`,
    },
  },
};

export default aiModelComparisonTable;
