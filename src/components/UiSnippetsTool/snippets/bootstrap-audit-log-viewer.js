const bootstrapAuditLogViewer = {
  id: 'bootstrap-audit-log-viewer',
  title: 'Bootstrap Audit Log Viewer',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsaudit-card">
    <div class="card-body p-3">
      <div class="d-flex gap-2 mb-2">
        <input type="search" class="form-control form-control-sm" id="bsauditSearch" placeholder="Search actor or action...">
        <select class="form-select form-select-sm" id="bsauditType" style="max-width:130px;">
          <option value="">All types</option>
          <option value="security">Security</option>
          <option value="content">Content</option>
          <option value="billing">Billing</option>
        </select>
      </div>
      <p class="small text-muted mb-2" id="bsauditCount"></p>
      <ul class="list-unstyled mb-0" id="bsauditList"></ul>
    </div>
  </div>
</div>`,
  css: `.bsaudit-card { width: 440px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsaudit-row { padding: 8px 0; border-bottom: 1px solid #f1f2f5; font-size: 12.5px; }
.bsaudit-row:last-child { border-bottom: none; }
.bsaudit-time { color: #9ca3af; font: 600 10.5px ui-monospace, monospace; }
.bsaudit-row mark { background: #fde68a; padding: 0 1px; border-radius: 2px; }`,
  js: `const LOG = [
  { actor: 'Dana Reyes', action: 'signed in from a new device', type: 'security', time: '2 min ago', tone: 'warning' },
  { actor: 'Marcus Lee', action: 'published "Q3 Roadmap"', type: 'content', time: '18 min ago', tone: 'success' },
  { actor: 'Priya Nair', action: 'updated billing card', type: 'billing', time: '1 hr ago', tone: 'secondary' },
  { actor: 'Sofia Chen', action: 'deleted "Draft: onboarding copy"', type: 'content', time: '3 hr ago', tone: 'danger' },
  { actor: 'Wale Adeyemi', action: 'reset their password', type: 'security', time: 'Yesterday', tone: 'warning' },
  { actor: 'Dana Reyes', action: 'invited ken@acme.co', type: 'security', time: 'Yesterday', tone: 'secondary' },
  { actor: 'Ken Sato', action: 'downgraded to Starter plan', type: 'billing', time: '2 days ago', tone: 'danger' },
];

const search = document.getElementById('bsauditSearch');
const typeFilter = document.getElementById('bsauditType');
const list = document.getElementById('bsauditList');
const count = document.getElementById('bsauditCount');

function escapeHtml(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

function highlight(text, q) {
  if (!q) return escapeHtml(text);
  const escaped = q.replace(/[.*+?^\${}()|[\\]\\\\]/g, '\\\\$&');
  return escapeHtml(text).replace(new RegExp('(' + escaped + ')', 'ig'), '<mark>$1</mark>');
}

function render() {
  const q = search.value.trim();
  const type = typeFilter.value;
  const qLower = q.toLowerCase();

  const matches = LOG.filter(entry => {
    const typeOk = !type || entry.type === type;
    const textOk = !q || entry.actor.toLowerCase().includes(qLower) || entry.action.toLowerCase().includes(qLower);
    return typeOk && textOk;
  });

  count.textContent = matches.length + ' of ' + LOG.length + ' events';
  list.innerHTML = matches.map(entry =>
    '<li class="bsaudit-row"><span class="badge text-bg-' + entry.tone + ' me-1">' + entry.type + '</span>' +
    '<strong>' + highlight(entry.actor, q) + '</strong> ' + highlight(entry.action, q) +
    ' <span class="bsaudit-time">&middot; ' + entry.time + '</span></li>'
  ).join('') || '<li class="bsaudit-row text-muted">No matching events.</li>';
}

search.addEventListener('input', render);
typeFilter.addEventListener('change', render);
render();`,

  seo: {
    title: 'Bootstrap Audit Log Viewer — Free HTML CSS JS Snippet',
    description: 'A real, filterable Bootstrap 5.3 audit log — search by actor or action text with live highlighting, combined with an event-type filter, both narrowing the same list together with AND logic.',
    about: {
      title: 'Bootstrap Audit Log Viewer — HTML, CSS & JavaScript',
      description: `Search text and the type dropdown filter the exact same \`LOG\` array together inside one \`render()\` call — \`matches\` only keeps an entry where both \`typeOk\` and \`textOk\` are true, so searching "dana" while the type filter is set to "Content" correctly shows nothing (Dana's visible actions here are security-type), rather than the two filters accidentally behaving as an OR and returning a confusing mixed result.\n\nThe search box matches against both the actor's name and the action text in one pass, and every match gets the same safe-highlighting treatment used in [bootstrap-search-results-highlighting](/ui-snippets/bootstrap-search-results-highlighting/) — the query is escaped before being used to build a \`RegExp\` (so a search containing a regex-special character can't break or misbehave), and the source text is HTML-escaped before highlighting (so an actor name or action text can never be misinterpreted as markup).\n\nEach entry's \`tone\` field is independent of its \`type\` field — a security event can be a routine invite (\`secondary\`) or a genuinely concerning new-device sign-in (\`warning\`), which is why tone is stored per entry rather than derived automatically from type; two events of the same category don't necessarily carry the same real-world severity.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'All 7 audit events show, each tagged with a colored type badge and a relative time.' },
        { title: 'Type "dana" in the search box', text: 'The list narrows live to Dana\'s two events, with "Dana" highlighted in yellow in each.' },
        { title: 'Select "Content" from the type dropdown while still searching "dana"', text: 'The list empties, since none of Dana\'s visible events are content-type — both filters apply together.' },
        { title: 'Clear the search and leave "Content" selected', text: 'Only the content-type events show, regardless of actor.' },
        { title: 'Reset both filters', text: 'All 7 events reappear, and the count reads "7 of 7 events".' },
      ],
    },
    features: [
      'Text search and the type dropdown combine with real AND logic, not an accidental OR',
      'Search matches both actor name and action text, with matches safely highlighted in both',
      'The highlight query is escaped for safe RegExp use, and the source text is HTML-escaped before rendering',
      'Each entry\'s severity tone is stored independently of its category, not derived automatically from it',
      'A live "X of Y events" count reflects exactly what both active filters currently allow through',
    ],
    useCases: [
      { icon: '🛡️', title: 'Admin security dashboards', desc: 'Let administrators search by actor or action text while narrowing by event type, with both filters combining through real AND logic in a single render call.' },
      { icon: '📑', title: 'Compliance and SOC2 reporting', desc: 'Provide a searchable, filterable activity history for auditors, with matching text highlighted safely after the source is HTML-escaped.' },
      { icon: '🔎', title: 'Customer support investigations', desc: 'Look up everything one user did before a complaint, typing their name to see matches across both the actor and action columns.' },
      { icon: '🔐', title: 'Permission change reviews', desc: 'Pair with the [Bootstrap permission matrix](/ui-snippets/bootstrap-user-permission-matrix/) so administrators can see who changed access and what each role can currently do.' },
    ],
    faqs: [
      { q: 'Do the search and type filter combine, or does selecting a type override the search?', a: 'They combine with AND logic — an entry must satisfy both the current search text and the current type selection (when either is set) to appear, which is why searching one actor while filtering to an unrelated type can correctly return zero results.' },
      { q: 'Is the highlighted search text safe against regex-special characters?', a: 'Yes — the query is escaped before being used to build a RegExp, the same technique used in bootstrap-search-results-highlighting, so typing a character like "(" or "*" searches for it literally instead of breaking or matching unpredictably.' },
      { q: 'Why is severity ("tone") separate from the event type?', a: 'Two events of the same type can carry very different real-world significance — a routine invite and a suspicious new-device sign-in are both "security" events, but only one deserves a warning-colored badge, which is why tone is set per entry rather than inferred from type.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep LOG as static data, track search and type filter in component state, and derive the filtered/highlighted list in the render function using the same combined AND-filter and escape-then-highlight approach.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a date-range filter alongside the existing search and type filters (combining with the same AND logic), or to add a CSV export button that downloads the currently filtered entries, not the full unfiltered log.`,
      prompt: `Build a Bootstrap 5.3 filterable, searchable audit log viewer, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A list of at least 7 sample audit log entries, each with an actor name, an action description, a type (e.g. security, content, billing) shown as a colored badge, and a relative timestamp.
- A search input filtering by actor name or action text, and a type dropdown filtering by category — both filters must combine with AND logic, narrowing the same list together rather than one overriding the other.
- Matching search text must be safely highlighted in both the actor name and action text, with the search query escaped for safe use in a RegExp and the source text HTML-escaped before rendering.
- Show a live "X of Y events" count reflecting the currently filtered results, and an explicit no-matches message when both filters together exclude everything.`,
    },
  },
};

export default bootstrapAuditLogViewer;
