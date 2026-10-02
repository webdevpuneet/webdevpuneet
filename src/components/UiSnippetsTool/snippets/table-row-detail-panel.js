const tableRowDetailPanel = {
  id: 'table-row-detail-panel',
  title: 'Table Row Detail Panel (Master-Detail)',
  lastmod: '2026-08-23',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="rdp-wrap">
  <div class="rdp-list">
    <div class="rdp-bar"><h3>Inbox</h3></div>
    <table class="rdp-table" id="rdpTable">
      <thead><tr><th>From</th><th>Subject</th><th>Date</th></tr></thead>
      <tbody id="rdpBody"></tbody>
    </table>
  </div>
  <div class="rdp-detail" id="rdpDetail">
    <div class="rdp-empty" id="rdpEmpty">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 4h16v16H4z"/><path d="M4 4l8 8 8-8"/></svg>
      <p>Select a row to see its details here.</p>
    </div>
    <div class="rdp-content" id="rdpContent" hidden></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:32px 20px}

.rdp-wrap{background:#fff;border-radius:14px;width:100%;max-width:820px;box-shadow:0 18px 44px rgba(15,23,42,.08);overflow:hidden;border:1px solid #e2e8f0;display:grid;grid-template-columns:1.1fr 1fr;min-height:420px}
@media (max-width:640px){.rdp-wrap{grid-template-columns:1fr}}

.rdp-list{border-right:1px solid #e2e8f0;display:flex;flex-direction:column;min-width:0}
.rdp-bar{padding:14px 16px;border-bottom:1px solid #f1f5f9}
.rdp-bar h3{font-size:14px;font-weight:800;color:#0f172a}
.rdp-table{width:100%;border-collapse:collapse;font-size:12.5px}
.rdp-table th{text-align:left;padding:9px 14px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:10px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;color:#64748b}
.rdp-table td{padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#334155;cursor:pointer;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:0}
.rdp-table tbody tr:hover td{background:#f8fafc}
.rdp-table tbody tr.rdp-selected td{background:#eef2ff}
.rdp-table tbody tr.rdp-selected td:first-child{box-shadow:inset 3px 0 0 #4f46e5}
.rdp-unread td:first-child,.rdp-unread td:nth-child(2){font-weight:800;color:#0f172a}
.rdp-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:#4f46e5;margin-right:6px;vertical-align:middle}

.rdp-detail{padding:20px;display:flex;flex-direction:column;min-width:0}
.rdp-empty{margin:auto;text-align:center;color:#cbd5e1;display:flex;flex-direction:column;align-items:center;gap:10px}
.rdp-empty p{font-size:12.5px;color:#94a3b8;max-width:220px}
.rdp-content[hidden]{display:none}
.rdp-content h4{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:4px}
.rdp-meta{font-size:12px;color:#64748b;margin-bottom:14px;display:flex;flex-direction:column;gap:2px}
.rdp-meta b{color:#334155}
.rdp-body{font-size:13px;color:#334155;line-height:1.7;padding-top:14px;border-top:1px solid #f1f5f9}
.rdp-tags{display:flex;gap:6px;margin-top:14px}
.rdp-tag{font-size:10.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:#eef2ff;color:#4338ca}`,

  js: `var MESSAGES = [
  { id: 1, from: 'Aisha Khan', email: 'aisha@acme.io', subject: 'Q3 roadmap review', date: 'Aug 21', unread: true,
    body: 'Hi team — attaching the updated Q3 roadmap ahead of tomorrow\\'s review. The main change is moving the billing migration up two weeks so it lands before the conference.',
    tags: ['Product', 'Urgent'] },
  { id: 2, from: 'Marco Rossi', email: 'marco@acme.io', subject: 'Design review notes', date: 'Aug 20', unread: true,
    body: 'Notes from today\\'s design review are in the shared doc. Biggest open question is whether the new table density should be the default for all users or opt-in.',
    tags: ['Design'] },
  { id: 3, from: 'Lena Park', email: 'lena@acme.io', subject: 'Re: API v3 migration', date: 'Aug 19', unread: false,
    body: 'Migration is on track. All internal services are cut over; external partner notice goes out Friday with a 60-day deprecation window on v2.',
    tags: ['Engineering'] },
  { id: 4, from: 'Tom Becker', email: 'tom@acme.io', subject: 'Billing dashboard feedback', date: 'Aug 18', unread: false,
    body: 'Support flagged that the billing dashboard\\'s export button is easy to miss on mobile. Screenshots attached — might be worth a follow-up ticket.',
    tags: ['Support', 'Mobile'] },
  { id: 5, from: 'Priya Nair', email: 'priya@acme.io', subject: 'Onboarding revamp kickoff', date: 'Aug 17', unread: false,
    body: 'Kicking off the onboarding revamp next Monday. Please review the current funnel drop-off data before then so we start from shared numbers.',
    tags: ['Product'] },
];

var body = document.getElementById('rdpBody');
var contentEl = document.getElementById('rdpContent');
var emptyEl = document.getElementById('rdpEmpty');
var selectedId = null;

function render() {
  body.innerHTML = MESSAGES.map(function (m) {
    var cls = (m.id === selectedId ? 'rdp-selected ' : '') + (m.unread ? 'rdp-unread' : '');
    return '<tr class="' + cls.trim() + '" data-id="' + m.id + '">' +
      '<td>' + (m.unread ? '<span class="rdp-dot"></span>' : '') + m.from + '</td>' +
      '<td>' + m.subject + '</td><td>' + m.date + '</td></tr>';
  }).join('');
}

function showDetail(id) {
  var m = MESSAGES.find(function (x) { return x.id === id; });
  if (!m) return;
  selectedId = id;
  m.unread = false; // opening a message marks it read, like a real inbox
  render();

  emptyEl.hidden = true;
  contentEl.hidden = false;
  contentEl.innerHTML =
    '<h4>' + m.subject + '</h4>' +
    '<div class="rdp-meta"><span><b>' + m.from + '</b> &lt;' + m.email + '&gt;</span><span>' + m.date + '</span></div>' +
    '<div class="rdp-body">' + m.body + '</div>' +
    '<div class="rdp-tags">' + m.tags.map(function (t) { return '<span class="rdp-tag">' + t + '</span>'; }).join('') + '</div>';
}

body.addEventListener('click', function (e) {
  var tr = e.target.closest('tr[data-id]');
  if (!tr) return;
  showDetail(+tr.dataset.id);
});

render();`,

  seo: {
    title: 'Table Row Detail Panel — Master-Detail List with Instant Inspector (JS)',
    description: `Clicking a table row updates an adjacent detail panel instantly — a master-detail, email-client-style layout, distinct from an expandable-row accordion. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Table Row Detail Panel — A Master List with an Always-Visible Inspector',
      description: `An email client's message list and reading pane is a specific, well-understood pattern: a compact list on one side, and a detail panel that updates instantly as you click different rows on the other — never expanding inline, never navigating away. This snippet builds that master-detail layout for a table in plain HTML, CSS, and vanilla JavaScript, distinct from an accordion-style expandable row that pushes content into the row itself.

**Master-detail, not expand-in-place**

An [expandable table](/ui-snippets/expandable-table/) grows the clicked row taller to reveal its detail inline, pushing every row below it down the page. This pattern does the opposite: the list stays a fixed, compact grid, and a *separate* panel beside it shows the selected row's extended information. Clicking a different row doesn't grow anything — it swaps the panel's content instantly, exactly like clicking between emails in an inbox never resizes the message list.

**One click, one source of truth**

\`showDetail(id)\` looks up the clicked message by id, sets it as \`selectedId\`, and rebuilds both the list (to show the selection highlight and clear the unread dot) and the detail panel's content from that single message object. Because both halves of the UI render from the same lookup, the highlighted row in the list and the content in the panel can never disagree about which item is "current."

**A real empty state before any selection**

Before anything is clicked, the detail panel shows a dedicated empty state — an icon and "Select a row to see its details here" — rather than either a blank panel or a default-selected first row. This matches how a reading pane actually behaves the first time you open a mail client: there's a genuine prompt, not an implicit selection the user didn't make.

**Read-state side effect, like a real inbox**

Opening a message clears its \`unread\` flag and removes its bold styling and dot indicator on the very next render — a small but realistic detail that shows the detail panel isn't just a display surface, it's wired to actually mutate the underlying data the way clicking into an email marks it read.

**Compact list columns, expanded detail content**

The list intentionally shows only three columns (From, Subject, Date) with \`text-overflow: ellipsis\` truncation, while the detail panel shows the full sender email, full body text, and tags — information that would be far too dense to fit in the table itself. This division of "just enough to scan" versus "everything once selected" is the actual reason the master-detail pattern exists, as opposed to just making the table wider. Pair it with a [selectable table](/ui-snippets/selectable-table/) if you also need multi-row bulk actions alongside single-row inspection, or a [table row context menu](/ui-snippets/table-row-context-menu/) for right-click actions on the same list.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An inbox-style list renders on the left with an empty detail panel on the right.` },
      { title: 'Click a row', text: `The detail panel instantly fills with that message's full sender, body, and tags.` },
      { title: 'Click a different row', text: `The panel content swaps immediately — the list itself never grows or shifts.` },
      { title: 'Note the unread dot', text: `Unread rows are bold with a dot; opening one clears both, mirroring a real inbox.` },
      { title: 'Check the selection highlight', text: `The currently open row stays visually marked in the list.` },
      { title: 'Swap in your data', text: `Replace MESSAGES with your own records; showDetail() is generic over any object shape.` },
    ] },
    features: [
      { title: 'True master-detail layout', text: `A fixed-size list beside a panel that updates in place, not an expanding row.` },
      { title: 'Instant panel updates', text: `Clicking any row immediately re-renders the detail panel from that row's data.` },
      { title: 'Single source of truth', text: `Both the list highlight and panel content derive from one selectedId lookup.` },
      { title: 'Genuine empty state', text: `A dedicated prompt appears before any row is selected, not a default-open first row.` },
      { title: 'Real read-state mutation', text: `Opening a message clears its unread flag in the actual data, not just visually.` },
      { title: 'Compact list, rich detail', text: `The list truncates to essentials; the panel shows full content only once selected.` },
      { title: 'Selection highlight', text: `The open row stays visually marked with an accent bar and tint.` },
      { title: 'Data-driven & no library', text: `Renders from a MESSAGES array of objects — zero dependencies.` },
    ],
    useCases: [
      { title: 'Inbox and messaging layouts', text: 'Build the canonical list and reading pane, where clicking a row updates a detail panel instantly rather than expanding inline.' },
      { title: 'Ticket reading panes', text: 'Show full ticket context in an adjacent panel, with a [table search highlight](/ui-snippets/table-search-highlight/) helping agents find the right ticket first.' },
      { title: 'CRM contact browsers', text: 'Click a contact row to inspect full details, with one selected id driving both the row highlight and the panel.' },
      { title: 'Admin record inspectors', text: 'Pair with a [selectable table](/ui-snippets/selectable-table/) when both bulk actions and single-record detail are needed on the same admin screen.' },
      { title: 'Master-detail versus accordion', text: 'Compare with an [expandable table](/ui-snippets/expandable-table/) that opens details inline, and study the empty state shown before any row is chosen.' },
    ],
    faqs: [
      { q: 'How is this different from an expandable/accordion table row?', a: `An expandable row grows taller in place to reveal its detail, pushing every row beneath it down the page — the list's layout changes with every click. This pattern keeps the list a fixed grid and shows detail in a completely separate panel beside it, so clicking different rows never resizes or reflows the list itself — exactly like an email client's message list and reading pane.` },
      { q: 'Does clicking a row genuinely update the data, or just the display?', a: `Both. showDetail() looks up the clicked message by id and both re-renders the panel from it and sets that message's real unread property to false in the underlying MESSAGES array — so the bold styling and dot indicator that reflect "unread" are driven by an actual data mutation, the same way opening an email in a real inbox marks it read in the underlying mail store, not just visually.` },
      { q: 'What happens before any row is clicked?', a: `The detail panel shows a dedicated empty state with an icon and a "Select a row to see its details here" message — there's no default-selected first row and no blank panel. This matches the real first-load behavior of a mail client's reading pane, which prompts for a selection rather than guessing one.` },
      { q: 'Can the list and panel ever show different rows?', a: `No — both are rendered from the same selectedId and the same MESSAGES.find() lookup inside showDetail(), so the highlighted row in the list and the content in the panel always refer to the same record. There's no separate state for "what's highlighted" versus "what's displayed."` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep selectedId in component state, derive the selected record with a find() over your data array, and render the list (with a selected class check) and the detail panel (or its empty state) both from that same state and derived value — the click handler just needs to set the id, and both halves re-render consistently.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reverse-engineering a mail-client-style layout, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the list and the detail panel are both driven from the same selectedId lookup instead of tracking separate "highlighted row" and "shown detail" state, and why the unread flag is mutated on the real MESSAGES array rather than just toggled visually with a CSS class. The same assistant can help extend it — ask it to add keyboard navigation (up/down arrows to move the selection, Enter to open), support marking a message unread again from the detail panel, or add a responsive mode where the detail panel becomes a full-screen overlay on narrow viewports instead of a side-by-side column. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a master-detail list-with-inspector layout in plain HTML, CSS, and JavaScript, modeled on an email client's message list and reading pane — no libraries.

Requirements:
- A two-column layout: a compact list/table on one side (showing only a few essential columns, truncated with ellipsis if needed) and a separate detail panel on the other side, laid out side by side (not one expanding into the other, and not navigating to a different page).
- Clicking any row in the list must instantly update the detail panel's content to show that row's extended information (fields not visible in the compact list view), without resizing, reordering, or reflowing the list itself.
- Both the list's "currently selected" visual highlight and the detail panel's displayed content must be derived from the same single piece of state (e.g. a selected id) and the same lookup into the underlying data array, so they can never disagree about which record is currently shown.
- Before any row has been clicked, the detail panel must show a distinct, deliberate empty state (an icon plus a prompt like "Select a row to see its details") — not a blank panel and not a row selected by default.
- Include at least one example of the detail panel's selection causing a genuine mutation of the underlying data (for instance, marking a message as read when opened, clearing an unread indicator in the real data array, not just a CSS toggle), demonstrating the panel is wired to real state rather than being a static display-only surface.
- Visually distinguish unread/flagged rows in the list (e.g. bold text and a dot indicator) and confirm that indicator clears correctly, driven by the real data change, when that row is opened.`,
    },
  },
};

export default tableRowDetailPanel;
