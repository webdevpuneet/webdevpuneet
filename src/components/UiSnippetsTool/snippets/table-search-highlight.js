const tableSearchHighlight = {
  id: 'table-search-highlight',
  title: 'Live Search with Highlighted Matches',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="tsh-wrap">
  <div class="tsh-bar">
    <svg class="tsh-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="tshInput" class="tsh-input" placeholder="Search across all columns…">
    <span class="tsh-count" id="tshCount"></span>
  </div>
  <table class="tsh-table">
    <thead><tr><th>Ticket</th><th>Subject</th><th>Requester</th><th>Assignee</th></tr></thead>
    <tbody id="tshBody"></tbody>
  </table>
  <p class="tsh-empty" id="tshEmpty" hidden>No rows contain "<span id="tshQ"></span>".</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fdf4ff;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.tsh-wrap{background:#fff;border-radius:14px;width:100%;max-width:680px;box-shadow:0 18px 44px rgba(112,26,117,.1);overflow:hidden;border:1px solid #f5d0fe}
.tsh-bar{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #fae8ff;background:#fdf4ff}
.tsh-icon{color:#a21caf;flex-shrink:0}
.tsh-input{flex:1;border:1.5px solid #f0abfc;border-radius:9px;padding:8px 12px;font-size:13px;font-family:inherit;color:#3b0764}
.tsh-input:focus{outline:none;border-color:#a21caf;box-shadow:0 0 0 3px rgba(162,28,175,.14)}
.tsh-count{font-size:11px;font-weight:700;color:#a21caf;white-space:nowrap}

.tsh-table{width:100%;border-collapse:collapse;font-size:13px}
.tsh-table th{text-align:left;padding:10px 14px;background:#fdf4ff;border-bottom:1px solid #fae8ff;font-size:10.5px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#a21caf}
.tsh-table td{padding:10px 14px;border-bottom:1px solid #faf5ff;color:#44403c}
.tsh-table tbody tr:hover{background:#fdfaff}
.tsh-table mark{background:#f0abfc;color:#3b0764;border-radius:3px;padding:0 2px;font-weight:700}

.tsh-empty{padding:26px;text-align:center;font-size:13px;color:#a78bfa;font-weight:600}
.tsh-empty[hidden]{display:none}`,

  js: `var ROWS = [
  ['#4021', 'Checkout fails on Safari', 'Aisha Khan', 'Marco Rossi'],
  ['#4022', 'Add dark mode toggle', 'Tom Becker', 'Lena Park'],
  ['#4023', 'Slow search on mobile', 'Priya Nair', 'Yuki Tanaka'],
  ['#4024', 'Export to CSV missing quotes', 'Sara Lind', 'Marco Rossi'],
  ['#4025', 'Safari autofill breaks form', 'Diego Sosa', 'Priya Nair'],
  ['#4026', 'Search results out of order', 'Lena Park', 'Tom Becker'],
  ['#4027', 'Dark mode contrast too low', 'Yuki Tanaka', 'Aisha Khan'],
];

var body = document.getElementById('tshBody');
var input = document.getElementById('tshInput');
var countEl = document.getElementById('tshCount');
var emptyEl = document.getElementById('tshEmpty');
var qEl = document.getElementById('tshQ');

function esc(s) {
  return String(s).replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; });
}

// Finds every non-overlapping occurrence of the query (case-insensitive) inside text
// and returns HTML with each occurrence wrapped in <mark>, escaping everything else.
function highlightAll(text, query) {
  var t = String(text);
  if (!query) return esc(t);
  var lower = t.toLowerCase();
  var q = query.toLowerCase();
  var out = '';
  var pos = 0;
  var idx;
  while ((idx = lower.indexOf(q, pos)) !== -1) {
    out += esc(t.slice(pos, idx));
    out += '<mark>' + esc(t.slice(idx, idx + q.length)) + '</mark>';
    pos = idx + q.length;
  }
  out += esc(t.slice(pos));
  return out;
}

function rowMatches(row, q) {
  return row.some(function (cell) { return String(cell).toLowerCase().indexOf(q) !== -1; });
}

function render() {
  var raw = input.value.trim();
  var q = raw.toLowerCase();
  var shown = q ? ROWS.filter(function (r) { return rowMatches(r, q); }) : ROWS;

  body.innerHTML = shown.map(function (r) {
    return '<tr>' + r.map(function (cell) {
      return '<td>' + highlightAll(cell, raw) + '</td>';
    }).join('') + '</tr>';
  }).join('');

  countEl.textContent = q ? (shown.length + ' of ' + ROWS.length) : (ROWS.length + ' tickets');
  emptyEl.hidden = shown.length > 0;
  if (!shown.length) qEl.textContent = raw;
}

input.addEventListener('input', render);
render();`,

  seo: {
    title: 'Live Search Table with Highlighted Matches — Real Substring Highlighting (JS)',
    description: `A table search box that filters rows AND highlights every matching substring inline as you type, using real position-finding — not a whole-cell background. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Live Search Table with Highlighted Matches — Real Substring-Position Highlighting',
      description: `A search box that filters a table is useful; one that also shows *exactly where* the match occurred inside each cell is far more useful, because the user doesn't have to re-scan the row to figure out why it matched. This snippet builds real substring-position highlighting in plain HTML, CSS, and vanilla JavaScript — it finds every occurrence of the query inside each cell's text and wraps only that slice in \`<mark>\`, rather than tinting the whole cell or row.

**Finding every occurrence, not just the first**

\`highlightAll()\` walks each cell's text with \`indexOf\` in a loop, advancing the search position past each match so it finds *every* non-overlapping occurrence of the query — not just the first. A naive implementation that only highlights the first hit misses repeated terms within the same cell (e.g. "Safari" appearing twice), which looks like a bug the moment a user searches for a common word.

**Escape-then-wrap, never innerHTML on raw text**

Because the result is injected via \`innerHTML\`, every plain-text segment is passed through \`esc()\` before being placed in the output string, and only the matched slice is wrapped in \`<mark>\`. This escape-then-wrap order means a ticket subject containing \`<\` or \`&\` renders as literal text instead of being interpreted as markup — the query itself never needs escaping since it's compared against lowercase text and only used to slice the *original* (already-safe-to-escape) string.

**Filtering AND highlighting from the same query**

A single input drives both behaviors: rows are kept only if *any* column contains the query (case-insensitive), and every kept row's cells run through the same highlighting function. Because filtering and highlighting share one \`raw\`/\`q\` pair, there's no risk of the visible highlight drifting from what actually caused the row to match.

**Real position math, not a CSS trick**

The highlighting genuinely locates character offsets with \`indexOf\` and slices the string at those offsets — it isn't a \`background-color\` applied to a whole \`<td>\` or a CSS \`:contains\`-style hack (which doesn't exist and couldn't underline a substring anyway). This is the same technique behind real search-result snippets in tools like a code search UI or a command palette.

**Count, empty state, and multi-column search**

A live "N of M" count and a friendly empty state (echoing back the exact query that matched nothing) round out the interaction. The search runs across every column — ticket number, subject, requester, and assignee — so one input replaces four separate filters. Pair it with a [filterable-table](/ui-snippets/filterable-table/) when you need independent per-column filters instead of one combined search, or a [sortable-table](/ui-snippets/sortable-table/) to let users reorder the highlighted results.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A ticket table renders with a search box above it.` },
      { title: 'Type a query', text: `Rows filter live to only those containing the text in any column.` },
      { title: 'Watch the highlight', text: `Every matching substring inside each visible cell is wrapped in a highlighted mark.` },
      { title: 'Search a repeated word', text: `Type a term that appears twice in one cell (e.g. "Safari") — both occurrences highlight.` },
      { title: 'Clear the input', text: `The table returns to unfiltered, unhighlighted rows.` },
      { title: 'Swap in your data', text: `Replace the ROWS array with your own columns; the search and highlight logic is generic.` },
    ] },
    features: [
      { title: 'Real substring position search', text: `indexOf-based matching finds exact character offsets, not a whole-cell tint.` },
      { title: 'Every occurrence highlighted', text: `A loop finds all non-overlapping matches per cell, not just the first.` },
      { title: 'Escape-then-wrap safety', text: `Cell text is HTML-escaped before the matched slice is wrapped in mark.` },
      { title: 'Multi-column search', text: `One input searches across every column at once, case-insensitively.` },
      { title: 'Shared query for filter and highlight', text: `Filtering and highlighting always agree, since both read the same query.` },
      { title: 'Live result count', text: `An "N of M" counter updates on every keystroke.` },
      { title: 'Query-aware empty state', text: `The empty message echoes back the exact search term that matched nothing.` },
      { title: 'Data-driven & no library', text: `Renders from a ROWS array with generic column logic — zero dependencies.` },
    ],
    useCases: [
      { title: 'Support ticket queues', text: 'Search subjects, requesters and assignees at once, highlighting every matching substring inline instead of shading the whole cell.' },
      { title: 'Admin and log tables', text: 'Locate one event across many columns, with all non-overlapping matches per cell found through a loop of `indexOf` calls.' },
      { title: 'Directories and CRMs', text: 'Find contacts by any visible field, pairing with a [selectable table](/ui-snippets/selectable-table/) for acting on the results afterwards.' },
      { title: 'Command-palette pickers', text: 'Reuse the highlight technique in pickers and menus, escaping cell text as HTML before wrapping the matched slice in a mark.' },
      { title: 'Safe highlight rendering', text: 'Learn escape-then-wrap rendering as a reference, and compare with a simpler [filterable table](/ui-snippets/filterable-table/) that filters without highlighting.' },
    ],
    faqs: [
      { q: 'How is this different from just tinting the whole cell?', a: `This snippet computes the exact character offset of the query inside each cell's text using indexOf, then slices the string at that offset so only the matching substring is wrapped in a mark element. A whole-cell background tells you the row matched somewhere; this shows exactly which characters matched, which is far more useful when scanning longer text.` },
      { q: 'Does it find repeated matches within one cell?', a: `Yes. highlightAll() runs indexOf in a loop, advancing the search position past each match it finds, so if a term like "Safari" appears twice in one subject line, both occurrences get wrapped — not just the first. This matters because real user data frequently repeats the searched term.` },
      { q: 'Is the highlighting safe against HTML injection?', a: `Yes. Every non-matching text segment is HTML-escaped before being placed in the output string, and only the matched slice is wrapped in <mark> afterward. Because escaping happens first, cell data containing < or & can never be interpreted as markup, even though the result is injected via innerHTML.` },
      { q: 'Does the search check every column?', a: `Yes — rowMatches() checks whether any column in a row contains the query (case-insensitive substring match), so one search box replaces needing a separate filter per field. If you need independent per-column filters instead, see the filterable table snippet.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep the query in component state, derive the filtered rows with a filter/some check, and render each cell by splitting its text around the query's indexOf position into escaped-and-mark-wrapped React elements (or use v-html/[innerHTML] bindings with the same escape-then-wrap string logic in Vue/Angular). The matching and highlight algorithm is framework-agnostic.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering the highlight loop by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how highlightAll() finds every non-overlapping occurrence of the query in a cell using indexOf in a loop, and why the escape() call runs on each in-between text segment before the matched slice is wrapped in mark rather than escaping the whole cell up front. The same assistant can help optimize it — ask whether re-scanning and re-joining every cell into a new HTML string on each keystroke would stay fast with thousands of rows, or whether the input should be debounced. It's also useful for extending the search: have it add fuzzy/typo-tolerant matching, highlight matches inside a specific subset of columns only, or make the count update with a subtle animation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live-search table in plain HTML, CSS, and JavaScript that filters rows AND highlights the actual matching text inside each cell — no libraries.

Requirements:
- A single search input that filters a data table live on every keystroke, matching case-insensitively against every column in each row (not just one column) — a row is shown if any of its cell values contains the query as a substring.
- For every visible row's cells, implement a real substring-position highlighting function: it must use string search (e.g. indexOf) to find the exact character offset of each occurrence of the query inside the cell's text, then split the string into escaped plain-text segments and matched segments, wrapping only the matched segments in a mark (or span with a highlight class) element. Do not simply apply a background color to the whole cell.
- The highlighting must find every occurrence of the query within a single cell, not just the first — verify this against a cell whose text contains the search term more than once.
- All plain-text segments must be HTML-escaped (escaping <, >, and &) before being inserted via innerHTML, with the escaping happening before the mark-wrapping so no cell data can ever inject real markup, regardless of what characters it contains.
- Show a live "N of M" result count that updates as the user types, and a distinct empty-state message that echoes back the exact search term when zero rows match.
- Clearing the search input must restore the full unfiltered, unhighlighted table.`,
    },
  },
};

export default tableSearchHighlight;
