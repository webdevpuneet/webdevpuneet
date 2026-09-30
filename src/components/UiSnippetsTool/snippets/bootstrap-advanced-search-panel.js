const bootstrapAdvancedSearchPanel = {
  id: 'bootstrap-advanced-search-panel',
  title: 'Bootstrap Advanced Search Panel',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsadv-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center">
        <input type="text" class="form-control me-2" id="bsadvKeyword" placeholder="Search tickets...">
        <button type="button" class="btn btn-outline-secondary flex-shrink-0" type="button" data-bs-toggle="collapse" data-bs-target="#bsadvPanel">
          Filters <span id="bsadvBadge" class="badge text-bg-secondary ms-1 d-none">0</span>
        </button>
      </div>

      <div class="collapse mt-3" id="bsadvPanel">
        <div class="row g-2">
          <div class="col-6">
            <label class="form-label small fw-semibold mb-1">Status</label>
            <select class="form-select form-select-sm" id="bsadvStatus">
              <option value="">Any</option>
              <option value="open">Open</option>
              <option value="pending">Pending</option>
              <option value="closed">Closed</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label small fw-semibold mb-1">Priority</label>
            <select class="form-select form-select-sm" id="bsadvPriority">
              <option value="">Any</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
          <div class="col-6">
            <label class="form-label small fw-semibold mb-1">From date</label>
            <input type="date" class="form-control form-control-sm" id="bsadvFrom">
          </div>
          <div class="col-6">
            <label class="form-label small fw-semibold mb-1">To date</label>
            <input type="date" class="form-control form-control-sm" id="bsadvTo">
          </div>
        </div>
        <div class="d-flex gap-2 mt-3">
          <button type="button" class="btn btn-dark btn-sm fw-bold" id="bsadvApply">Apply filters</button>
          <button type="button" class="btn btn-outline-secondary btn-sm" id="bsadvReset">Reset</button>
        </div>
      </div>

      <p class="small text-muted mt-3 mb-0" id="bsadvSummary">No filters applied.</p>
    </div>
  </div>
</div>`,
  css: `.bsadv-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }`,
  js: `const keyword = document.getElementById('bsadvKeyword');
const status = document.getElementById('bsadvStatus');
const priority = document.getElementById('bsadvPriority');
const from = document.getElementById('bsadvFrom');
const to = document.getElementById('bsadvTo');
const badge = document.getElementById('bsadvBadge');
const summary = document.getElementById('bsadvSummary');

function activeCriteria() {
  const parts = [];
  if (keyword.value.trim()) parts.push('keyword "' + keyword.value.trim() + '"');
  if (status.value) parts.push('status: ' + status.value);
  if (priority.value) parts.push('priority: ' + priority.value);
  if (from.value) parts.push('from ' + from.value);
  if (to.value) parts.push('to ' + to.value);
  return parts;
}

function fieldCount() {
  return [status.value, priority.value, from.value, to.value].filter(Boolean).length;
}

function applyFilters() {
  const parts = activeCriteria();
  const n = fieldCount();
  badge.textContent = String(n);
  badge.classList.toggle('d-none', n === 0);
  summary.textContent = parts.length ? 'Searching for ' + parts.join(', ') + '.' : 'No filters applied.';
}

document.getElementById('bsadvApply').addEventListener('click', applyFilters);

document.getElementById('bsadvReset').addEventListener('click', () => {
  keyword.value = '';
  status.value = '';
  priority.value = '';
  from.value = '';
  to.value = '';
  applyFilters();
});

keyword.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });

applyFilters();`,

  seo: {
    title: 'Bootstrap Advanced Search Panel — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 collapsible filter panel — status, priority, and a date range — with an active-filter count badge on the toggle button and a live plain-English summary of the current search.',
    about: {
      title: 'Bootstrap Advanced Search Panel — HTML, CSS & JavaScript',
      description: `The panel uses Bootstrap's real \`collapse\` component (\`data-bs-toggle="collapse"\`) rather than a custom show/hide implementation, so it inherits Bootstrap's built-in animation and ARIA wiring for free. The filter count badge on the "Filters" toggle button is what lets a user know criteria are active even with the panel collapsed — \`fieldCount()\` counts only the structured dropdown and date fields (not the free-text keyword, which gets its own place in the summary sentence), since those are the filters a badge count meaningfully represents.\n\nThe summary line at the bottom is built by \`activeCriteria()\` into one readable sentence rather than a raw dump of field values, so "Searching for status: open, priority: high" reads the way a person would actually describe their own search back to themselves — a small but real usability difference from just listing form field names and values.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The panel is collapsed, the badge is hidden, and the summary reads "No filters applied."' },
        { title: 'Click "Filters"', text: 'The panel expands with Bootstrap\'s real collapse animation, revealing status, priority, and date fields.' },
        { title: 'Select a status and a priority', text: 'Click "Apply filters" — the badge shows "2" and the summary describes both selections in plain English.' },
        { title: 'Type a keyword and press Enter', text: 'The summary updates to include the keyword alongside the existing filters.' },
        { title: 'Click "Reset"', text: 'Every field clears, the badge disappears, and the summary reverts to "No filters applied."' },
      ],
    },
    features: [
      'Uses Bootstrap\'s real collapse component, not a custom-built expand/collapse',
      'A live badge counts only the structured filter fields that are actually set',
      'A generated plain-English summary sentence instead of a raw list of field values',
      'Pressing Enter in the keyword field applies filters without needing to click the button',
      'Reset clears every field and immediately re-syncs the badge and summary in one action',
    ],
    useCases: [
      { icon: 'APP', title: 'Support ticket and issue-tracking dashboards', desc: 'Pairs with [bootstrap-sortable-data-table](/ui-snippets/bootstrap-sortable-data-table/) to actually filter the rows a search like this describes.' },
      { icon: 'SEARCH', title: 'Any list view needing more than a single search box', desc: 'Combine with [bootstrap-filter-chips](/ui-snippets/bootstrap-filter-chips/) to also show each applied criterion as its own removable chip.' },
      { icon: 'CART', title: 'Ecommerce and marketplace search', desc: 'Swap status/priority for category/price range for a product-search variant of the same panel.' },
    ],
    faqs: [
      { q: 'Why doesn\'t the badge count the keyword field?', a: 'The badge is meant to summarize structured, discrete filter selections (dropdowns and dates); a free-text keyword already has its own visible place in the input box and the summary sentence, so counting it in the badge too would be redundant.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep each field in component state, derive fieldCount and the summary sentence from that state on every render, and use Bootstrap\'s collapse via a ref-driven Collapse instance or an equivalent framework transition.' },
      { q: 'How would I wire this to actually filter a table?', a: 'Call your filtering function with the same field values read inside applyFilters(), right alongside (or instead of) updating the badge and summary — the criteria-gathering logic is already centralized in one place.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to persist the last-applied filters to localStorage so they survive a page reload, or to add per-field "clear" buttons that reset one field at a time without resetting the entire panel.`,
      prompt: `Build a Bootstrap 5.3 advanced search panel, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A keyword search input next to a "Filters" toggle button that expands/collapses a panel using Bootstrap's real collapse component (data-bs-toggle="collapse").
- Inside the panel: a status select, a priority select, and a from/to date range.
- The toggle button must show a badge counting how many of the structured filter fields (not the keyword) currently have a value, hidden when the count is zero.
- An "Apply filters" button that generates a plain-English summary sentence listing every active criterion (keyword, status, priority, date range) below the panel.
- A "Reset" button that clears every field and immediately updates both the badge and the summary back to their empty state.`,
    },
  },
};

export default bootstrapAdvancedSearchPanel;
