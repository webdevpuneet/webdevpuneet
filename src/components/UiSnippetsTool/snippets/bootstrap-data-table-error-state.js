const bootstrapDataTableErrorState = {
  id: 'bootstrap-data-table-error-state',
  title: 'Bootstrap Data Table Error State',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bstblerr-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Recent orders</h6>
      <table class="table table-sm align-middle mb-0">
        <thead>
          <tr><th>Order</th><th>Customer</th><th>Total</th><th>Status</th></tr>
        </thead>
        <tbody id="bstblerrBody"></tbody>
      </table>
    </div>
  </div>
</div>`,
  css: `.bstblerr-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bstblerr-loading td { color: #9ca3af; font-size: 13px; }
.bstblerr-error-icon { font-size: 20px; }`,
  js: `const body = document.getElementById('bstblerrBody');
let attempt = 0;

const ROWS = [
  ['#1042', 'Dana Reyes', '$128.00', 'Shipped', 'success'],
  ['#1043', 'Marcus Lee', '$64.50', 'Processing', 'secondary'],
  ['#1044', 'Priya Nair', '$212.00', 'Delivered', 'success'],
];

function renderLoading() {
  body.innerHTML = '<tr class="bstblerr-loading"><td colspan="4" class="text-center py-4">Loading orders...</td></tr>';
}

function renderError(message) {
  body.innerHTML =
    '<tr><td colspan="4" class="text-center py-4">' +
    '<div class="bstblerr-error-icon mb-1">&#9888;</div>' +
    '<p class="fw-semibold mb-1">Couldn\\'t load orders</p>' +
    '<p class="small text-muted mb-3">' + message + '</p>' +
    '<button type="button" class="btn btn-sm btn-outline-danger" id="bstblerrRetry">Retry</button>' +
    '</td></tr>';
  document.getElementById('bstblerrRetry').addEventListener('click', load);
}

function renderData() {
  body.innerHTML = ROWS.map(([id, name, total, status, tone]) =>
    '<tr><td>' + id + '</td><td>' + name + '</td><td>' + total +
    '</td><td><span class="badge text-bg-' + tone + '">' + status + '</span></td></tr>'
  ).join('');
}

function load() {
  attempt++;
  renderLoading();

  setTimeout(() => {
    // The first attempt always fails so the error state (and Retry) is
    // actually reachable in this preview; every retry after that has a
    // genuine 60% chance of succeeding, like a flaky real request.
    const failed = attempt === 1 || Math.random() > 0.6;
    if (failed) {
      renderError('Network request failed. Check your connection and try again.');
    } else {
      renderData();
    }
  }, 1000);
}

load();`,

  seo: {
    title: 'Bootstrap Data Table Error State — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 table that models a failed data fetch — a centered inline error message with a working Retry button in place of the rows, styled to fit the same table it replaces.',
    about: {
      title: 'Bootstrap Data Table Error State — HTML, CSS & JavaScript',
      description: `A table's error state is easy to get structurally wrong by replacing the whole table, headers included — this snippet only ever replaces \`#bstblerrBody\`, so the column headers (Order, Customer, Total, Status) stay put whether the table is loading, showing an error, or showing real rows. The error message itself lives in a single \`<tr>\` with one \`<td colspan="4">\`, which keeps it a real, valid row inside the same table rather than an absolutely positioned overlay that would need its own sizing logic to line up with the table underneath it.\n\n\`load()\` is deliberately written so the very first call always fails — \`attempt === 1\` short-circuits the random check — specifically so the error state and its Retry button are actually reachable the moment this preview loads, instead of only existing in the code and needing a lucky dice roll to ever be seen. Every retry after that has a genuine 60% chance of succeeding, closer to how a real flaky network request behaves.\n\nRetry calls the exact same \`load()\` function the initial page load calls, which is what keeps the loading state, the error state, and the eventual data state all synchronized through one code path — there's no separate "retry logic" that could drift from what a fresh load actually does, the same one-function-owns-every-outcome pattern used in [bootstrap-form-autosave-status](/ui-snippets/bootstrap-form-autosave-status/).`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A brief "Loading orders..." row appears inside the table.' },
        { title: 'Wait about a second', text: 'The load intentionally fails the first time, showing a warning icon, message, and a Retry button in place of the rows.' },
        { title: 'Click "Retry"', text: 'The loading row reappears, and this time there\'s a real 60% chance the three sample orders load successfully.' },
        { title: 'If it fails again', text: 'Click Retry as many times as needed — each attempt runs through the identical load() logic.' },
        { title: 'Once it succeeds', text: 'The real order rows replace the error message, and the column headers above never moved the whole time.' },
      ],
    },
    features: [
      'Only the tbody is ever replaced — the table\'s own column headers never disappear during loading or error states',
      'The error message is a real table row with colspan, not an absolutely positioned overlay needing separate sizing',
      'The first load is guaranteed to fail so the error state is always reachable in this preview',
      'Every retry after the first has a genuine randomized chance of succeeding, like a real flaky request',
      'Retry calls the exact same load() function a fresh page load calls — one code path for every outcome',
    ],
    useCases: [
      { icon: 'DASH', title: 'Any dashboard table backed by a real, sometimes-unreliable API', desc: 'Pairs directly with [bootstrap-data-table-loading-skeleton](/ui-snippets/bootstrap-data-table-loading-skeleton/) for the success path the same fetch also needs to handle.' },
      { icon: 'APP', title: 'Order history, billing, and account activity panels', desc: 'A failed fetch on a billing table is exactly the kind of failure a user needs a visible, actionable retry for, not a silently empty table.' },
      { icon: 'API', title: 'Internal tools hitting flaky or rate-limited internal APIs', desc: 'The retry-through-the-same-function pattern here generalizes directly to [bootstrap-api-retry-notification](/ui-snippets/bootstrap-api-retry-notification/)-style global failure banners.' },
      { icon: 'LEARN', title: 'Learning to design for the unhappy path first', desc: 'A compact example of building the failure and retry flow as a first-class state, not an afterthought bolted onto a success-only table.' },
    ],
    faqs: [
      { q: 'Why does the first load always fail?', a: 'So the error state is guaranteed to be visible the moment this preview loads, rather than depending on a random chance a viewer might never see. A real implementation should remove that special case and let the actual request outcome decide every time.' },
      { q: 'Why replace only the tbody instead of the whole table?', a: 'Keeping the thead in place means the user never loses the context of what columns to expect, whether the table is loading, erroring, or showing data — replacing the entire table would force a flash of missing structure on every state change.' },
      { q: 'Why colspan the error row instead of using an absolutely positioned banner?', a: 'A real table row participates in the table\'s own layout and sizing automatically, so the error message always matches the table\'s actual width with zero extra positioning logic, and it disappears cleanly the moment real rows replace it.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track a status value (loading, error, success) in component state, and conditionally render the loading row, the colspan error row, or the mapped data rows from that single status — the load()/retry function shape carries over directly.' },
      { q: 'How would I connect this to a real API?', a: 'Replace the setTimeout and random check in load() with a real fetch call, treating a resolved, successful response as the data path and a rejected promise or non-2xx response as the error path — the render functions around it need no changes.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add exponential backoff on repeated retries (waiting longer after each consecutive failure), or to distinguish a genuine network failure from a permission error (403) with a different message and no Retry button for the latter, since retrying a permission error can never succeed.`,
      prompt: `Build a Bootstrap 5.3 data table with a working error state, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with a fixed header row (column labels) and a tbody that gets replaced between three states: loading, error, and loaded data.
- Loading state: a single row spanning all columns with a "Loading..." message.
- Error state: a single row spanning all columns showing a warning icon, a "Couldn't load data" message, a short reason, and a Retry button — implemented as a real table row with colspan, not an absolutely positioned overlay.
- Success state: the real sample data rows.
- The very first load attempt must always fail (to guarantee the error state is visible without relying on chance), and every retry after that should have a genuine randomized chance of succeeding. Retry must call the exact same load function the initial page load uses.`,
    },
  },
};

export default bootstrapDataTableErrorState;
