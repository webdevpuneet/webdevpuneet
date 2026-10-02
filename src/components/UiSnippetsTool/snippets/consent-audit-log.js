const consentAuditLog = {
  id: 'consent-audit-log',
  title: 'Consent Audit Log',
  lastmod: '2026-08-22',
  category: 'tables',
  cdnUrls: [],
  html: `<div class="ca-card">
  <div class="ca-head">
    <h2>Consent audit log</h2>
    <div class="ca-filters">
      <select id="caTypeFilter">
        <option value="">All consent types</option>
        <option value="Marketing emails">Marketing emails</option>
        <option value="Cookies">Cookies</option>
        <option value="Data sharing">Data sharing</option>
      </select>
      <select id="caActionFilter">
        <option value="">All actions</option>
        <option value="Granted">Granted</option>
        <option value="Revoked">Revoked</option>
      </select>
    </div>
  </div>

  <div class="ca-table-wrap">
    <table class="ca-table">
      <thead>
        <tr>
          <th>Timestamp</th>
          <th>Consent type</th>
          <th>Action</th>
          <th>IP / device</th>
        </tr>
      </thead>
      <tbody id="caBody">
        <tr data-type="Marketing emails" data-action="Granted">
          <td>2026-08-22 09:14:02</td>
          <td>Marketing emails</td>
          <td><span class="ca-pill ca-pill--granted">Granted</span></td>
          <td>192.168.4.21 · Chrome / macOS</td>
        </tr>
        <tr data-type="Cookies" data-action="Granted">
          <td>2026-08-21 18:02:47</td>
          <td>Cookies</td>
          <td><span class="ca-pill ca-pill--granted">Granted</span></td>
          <td>10.0.2.113 · Safari / iOS</td>
        </tr>
        <tr data-type="Data sharing" data-action="Revoked">
          <td>2026-08-20 07:41:19</td>
          <td>Data sharing</td>
          <td><span class="ca-pill ca-pill--revoked">Revoked</span></td>
          <td>172.16.9.4 · Firefox / Windows</td>
        </tr>
        <tr data-type="Marketing emails" data-action="Revoked">
          <td>2026-08-18 13:55:31</td>
          <td>Marketing emails</td>
          <td><span class="ca-pill ca-pill--revoked">Revoked</span></td>
          <td>192.168.4.21 · Chrome / macOS</td>
        </tr>
        <tr data-type="Cookies" data-action="Revoked">
          <td>2026-08-15 21:09:56</td>
          <td>Cookies</td>
          <td><span class="ca-pill ca-pill--revoked">Revoked</span></td>
          <td>203.0.113.7 · Edge / Windows</td>
        </tr>
        <tr data-type="Data sharing" data-action="Granted">
          <td>2026-08-10 11:20:04</td>
          <td>Data sharing</td>
          <td><span class="ca-pill ca-pill--granted">Granted</span></td>
          <td>10.0.2.113 · Safari / iOS</td>
        </tr>
      </tbody>
    </table>
    <p class="ca-empty" id="caEmpty" hidden>No matching consent events.</p>
  </div>
  <p class="ca-count" id="caCount">6 events</p>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d13;color:#e5e9f2;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.ca-card{width:100%;max-width:760px;background:#12141c;border:1px solid #232838;border-radius:14px;padding:22px}
.ca-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px;margin-bottom:16px}
.ca-head h2{font-size:17px;margin:0}
.ca-filters{display:flex;gap:8px}
.ca-filters select{background:#1a1e2c;border:1px solid #2a3044;color:#e5e9f2;padding:8px 10px;border-radius:8px;font-size:12.5px}
.ca-table-wrap{overflow-x:auto;border:1px solid #212636;border-radius:10px}
.ca-table{width:100%;border-collapse:collapse;font-size:13px;min-width:560px}
.ca-table thead th{text-align:left;padding:10px 14px;background:#171b27;color:#8891a8;font-weight:600;font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;border-bottom:1px solid #232838}
.ca-table tbody td{padding:11px 14px;border-bottom:1px solid #1c2130;color:#c9cee0}
.ca-table tbody tr:last-child td{border-bottom:none}
.ca-table tbody tr:hover{background:#161a26}
.ca-pill{display:inline-block;padding:3px 10px;border-radius:999px;font-size:11.5px;font-weight:700}
.ca-pill--granted{background:#173523;color:#5fe0a0}
.ca-pill--revoked{background:#3a1d24;color:#ff8a94}
.ca-empty{padding:24px;text-align:center;color:#767f98;font-size:13px}
.ca-count{margin:12px 2px 0;font-size:12px;color:#767f98}`,

  js: `// Client-side filtering of the audit table by consent type and action.
const typeFilter = document.getElementById('caTypeFilter');
const actionFilter = document.getElementById('caActionFilter');
const rows = Array.from(document.querySelectorAll('#caBody tr'));
const table = document.querySelector('.ca-table');
const emptyState = document.getElementById('caEmpty');
const countEl = document.getElementById('caCount');

function applyFilters() {
  const typeVal = typeFilter.value;
  const actionVal = actionFilter.value;
  let visibleCount = 0;

  rows.forEach((row) => {
    const matchesType = !typeVal || row.dataset.type === typeVal;
    const matchesAction = !actionVal || row.dataset.action === actionVal;
    const show = matchesType && matchesAction;
    row.hidden = !show;
    if (show) visibleCount += 1;
  });

  table.hidden = visibleCount === 0;
  emptyState.hidden = visibleCount !== 0;
  countEl.textContent = \`\${visibleCount} event\${visibleCount === 1 ? '' : 's'}\`;
}

typeFilter.addEventListener('change', applyFilters);
actionFilter.addEventListener('change', applyFilters);
applyFilters();`,

  seo: {
    title: 'Consent Audit Log — Free Compliance Table with Filters',
    description: `A filterable compliance table logging consent events — timestamp, consent type, granted/revoked action, and IP/device — for marketing, cookies, and data-sharing consent. Plain HTML, CSS & JS.`,
    about: {
      title: 'Consent Audit Log — A Filterable Table of Consent Events',
      description: `The consent audit log is the compliance table privacy dashboards and admin panels use to prove, row by row, when a user granted or revoked consent for something — marketing emails, cookies, data sharing — and from where. This snippet builds a filterable version in plain HTML, CSS, and JavaScript.

**Data attributes as the filter index**

Each \`<tr>\` carries \`data-type\` and \`data-action\` attributes matching its visible cells. The filter logic reads these directly instead of re-parsing cell text, which keeps filtering fast and keeps the source of truth attached to the row itself.

**Two independent filters, combined**

A consent-type \`<select>\` and an action \`<select>\` (Granted/Revoked) each default to "All," and \`applyFilters()\` shows a row only when it satisfies both — an AND, not an OR — which is how compliance reviewers actually narrow down "show me all revoked cookie consents."

**A real empty state**

When a filter combination matches zero rows, the table itself is hidden and a "No matching consent events" message takes its place, rather than leaving a confusing table with just a header and no rows.

**Status as a colored pill, text unambiguous**

Granted and revoked actions render as small colored pills (green/red) but the word itself is always present in the pill text — so the status is legible even without relying on color alone, which matters doubly in a compliance context.

**Live result count**

A count line below the table ("4 events") updates on every filter change, giving an immediate sense of scale — useful when a compliance reviewer needs to eyeball whether a filter narrowed things down as expected.

**Horizontal scroll on narrow viewports**

The table wrapper uses \`overflow-x: auto\` with a \`min-width\` on the table itself, so the IP/device column doesn't get crushed on mobile — it scrolls instead of wrapping awkwardly.

**Customizing it**

Wire the rows to a real audit-log API, add a date-range filter or CSV export, or add a search box that filters by IP. Pair it with [gdpr-consent-manager](/ui-snippets/gdpr-consent-manager/) or [cookie preferences](/ui-snippets/cookie-preferences/) as the settings screen this log is auditing.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sample audit log with six events renders.` },
      { title: 'Filter by consent type', text: `Choose marketing, cookies, or data sharing.` },
      { title: 'Filter by action', text: `Narrow to granted or revoked only.` },
      { title: 'Combine both filters', text: `Rows must match every active filter.` },
      { title: 'Clear filters', text: `Select "All" to see every event again.` },
      { title: 'Connect real data', text: `Replace the static rows with server-rendered ones.` },
    ] },
    features: [
      { title: 'Two combinable filters', text: `Consent type and action, both must match.` },
      { title: 'Data-attribute filtering', text: `Fast, no cell-text parsing needed.` },
      { title: 'Real empty state', text: `Table hides, a message replaces it.` },
      { title: 'Color-coded status pills', text: `Text label always present, not color-only.` },
      { title: 'Live result count', text: `Updates as filters change.` },
      { title: 'Horizontal scroll table', text: `IP/device column stays readable on mobile.` },
      { title: 'Sortable-ready markup', text: `Standard table structure, easy to extend.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and JavaScript.` },
    ],
    useCases: [
      { title: 'Privacy compliance dashboards', text: 'Prove when a user granted or revoked consent, row by row, with timestamp, consent type, action and IP or device in one filterable table.' },
      { title: 'Support staff review', text: 'Let back-office staff review a single user\'s consent history, filtering by type and action with both conditions required to match.' },
      { title: 'GDPR and CCPA record keeping', text: 'Pair with a [GDPR consent manager](/ui-snippets/gdpr-consent-manager/) so every change a user makes is written to an auditable log.' },
      { title: 'Cookie preference logging', text: 'Log actions from [cookie preferences](/ui-snippets/cookie-preferences/), with status pills that always include a text label so colour is never the only signal.' },
      { title: 'Customer-facing history pages', text: 'Let people review their own consent events, using data-attribute filtering so no cell text needs parsing and an empty state replaces the table when nothing matches.' },
      { icon: 'CODE', title: 'Related: Insurance Coverage Comparison Table', desc: 'See the [Insurance Coverage Comparison Table](/ui-snippets/coverage-comparison-table/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Scroll Shadow Indicators', desc: 'See the [Table with Scroll Shadow Indicators](/ui-snippets/table-scroll-shadow-indicators/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Formula-Calculated Columns Table', desc: 'See the [Formula-Calculated Columns Table](/ui-snippets/table-formula-calculated-columns/) for a related tables pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Table with Sticky Footer Totals Row', desc: 'See the [Table with Sticky Footer Totals Row](/ui-snippets/table-sticky-footer-totals/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does filtering work without a backend request?', a: `Every row has data-type and data-action attributes. applyFilters() reads the two select values and, for every row, checks whether it matches both (or is exempted by an "All" selection), toggling the row's hidden attribute — all in the browser with no round trip.` },
      { q: 'What happens when a filter combination has no matches?', a: `The table is hidden and a dedicated empty-state paragraph ("No matching consent events") is shown instead, so reviewers see a clear message rather than a table with just a header row and no data.` },
      { q: 'Is the granted/revoked status accessible to color-blind users?', a: `Yes — each pill always includes the word "Granted" or "Revoked" as text, not just a color. The color is a secondary visual cue layered on top of a text label that's always present.` },
      { q: 'How do I load real consent events from an API?', a: `Fetch your audit records, then render one <tr> per event with the same data-type and data-action attributes and matching cell content (timestamp, type, a pill for the action, and IP/device text) — the existing filter logic works unchanged against dynamically inserted rows as long as it re-queries rows or you re-run applyFilters() after inserting them.` },
      { q: 'Can I add a date-range filter or CSV export?', a: `Yes — add a date input pair, include a date comparison alongside the existing type/action checks in applyFilters(), and for export, map the currently visible (non-hidden) rows into CSV rows using their cell text or data attributes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the two independent select filters combine with an AND condition using each row's data attributes, and why the empty state hides the table entirely rather than just leaving an empty tbody. It can help you add a date-range filter, a search box that matches against the IP/device column, sortable column headers, or a CSV/JSON export of the currently filtered rows — and help you wire the static rows to a real consent-event API while keeping the same filtering logic working against dynamically rendered rows.`,
      prompt: `Build a "consent audit log" compliance table in plain HTML, CSS, and JavaScript (no dependencies).

Requirements:
- A table with columns for timestamp, consent type (e.g. marketing emails, cookies, data sharing), an action (granted/revoked) rendered as a colored pill that ALSO always includes the word "Granted" or "Revoked" as visible text (not color alone), and an IP/device column.
- Two independent filter <select> elements above the table — one for consent type, one for action — each defaulting to an "All" option. A row must satisfy BOTH active filters simultaneously to remain visible (i.e., combine filters with AND, not OR).
- Store each row's filterable values as data attributes on the <tr> (e.g. data-type, data-action) and have the filtering logic read from those attributes rather than parsing visible cell text, toggling each row's hidden attribute based on whether it currently matches.
- A distinct empty state: when the active filter combination matches zero rows, hide the table and show a separate "no matching events" message instead of leaving a header with no rows.
- A live count of currently visible rows/events that updates every time a filter changes, with correct singular/plural wording (e.g. "1 event" vs. "4 events").
- Wrap the table in a horizontally scrollable container with a sensible min-width on the table so the IP/device column stays readable on narrow/mobile viewports instead of being crushed.`,
    },
  },
};

export default consentAuditLog;
