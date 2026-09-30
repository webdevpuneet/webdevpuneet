const bootstrapDataTableLoadingSkeleton = {
  id: 'bootstrap-data-table-loading-skeleton',
  title: 'Bootstrap Data Table Loading Skeleton',
  lastmod: '2026-09-11',
  category: 'tables',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsskel-card">
    <div class="card-body p-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h6 class="fw-bold mb-0">Team members</h6>
        <button type="button" class="btn btn-sm btn-outline-secondary" id="bsskelReload">Reload data</button>
      </div>
      <table class="table table-sm align-middle mb-0">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th></tr>
        </thead>
        <tbody id="bsskelBody"></tbody>
      </table>
    </div>
  </div>
</div>`,
  css: `.bsskel-card { width: 480px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsskel-bar {
  display: inline-block; height: 10px; border-radius: 4px;
  background: linear-gradient(90deg, #eceef1 25%, #f5f6f8 37%, #eceef1 63%);
  background-size: 400% 100%;
  animation: bsskel-shimmer 1.4s ease infinite;
}
@keyframes bsskel-shimmer { 0% { background-position: 100% 50%; } 100% { background-position: 0 50%; } }`,
  js: `const body = document.getElementById('bsskelBody');
const reloadBtn = document.getElementById('bsskelReload');

const ROWS = [
  ['Dana Reyes', 'dana@acme.co', 'Engineering', 'Active', 'success'],
  ['Marcus Lee', 'marcus@acme.co', 'Design', 'Active', 'success'],
  ['Priya Nair', 'priya@acme.co', 'Product', 'Invited', 'secondary'],
  ['Sofia Chen', 'sofia@acme.co', 'Engineering', 'Active', 'success'],
  ['Wale Adeyemi', 'wale@acme.co', 'Support', 'Suspended', 'warning'],
];

// Column-width hints so the skeleton's bars roughly match the real content's
// shape, instead of five identical rectangles that don't resemble a table.
const WIDTHS = ['70%', '85%', '60%', '50%'];

function renderSkeleton() {
  let rows = '';
  for (let i = 0; i < 5; i++) {
    rows += '<tr>' + WIDTHS.map(w =>
      '<td><span class="bsskel-bar" style="width:' + w + '"></span></td>'
    ).join('') + '</tr>';
  }
  body.innerHTML = rows;
}

function renderData() {
  body.innerHTML = ROWS.map(([name, email, role, status, tone]) =>
    '<tr><td>' + name + '</td><td class="text-muted">' + email + '</td><td>' + role +
    '</td><td><span class="badge text-bg-' + tone + '">' + status + '</span></td></tr>'
  ).join('');
}

function load() {
  renderSkeleton();
  reloadBtn.disabled = true;
  setTimeout(() => {
    renderData();
    reloadBtn.disabled = false;
  }, 1400);
}

reloadBtn.addEventListener('click', load);
load();`,

  seo: {
    title: 'Bootstrap Data Table Loading Skeleton — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 table that shows shimmering skeleton rows shaped like its actual columns while data loads, then swaps to real content — with a Reload button to trigger it again on demand.',
    about: {
      title: 'Bootstrap Data Table Loading Skeleton — HTML, CSS & JavaScript',
      description: `A skeleton only works if it roughly matches the shape of what's coming — five identical gray rectangles read as generic "loading," while bars sized to each column's typical content read as "this table, loading." That's what the \`WIDTHS\` array does here: each of the four \`<td>\` bars gets a different percentage width (70%, 85%, 60%, 50%) echoing that a name is usually shorter than an email, which is usually longer than a role label.\n\nThe shimmer itself is a single CSS \`background-position\` animation on a gradient that's four times wider than the element (\`background-size: 400% 100%\`) — animating its position sweeps a lighter band across each bar continuously, entirely on the compositor thread, with no JavaScript driving the visual effect frame by frame. JavaScript's only job is swapping which markup is in \`#bsskelBody\` at all: \`renderSkeleton()\` for the loading state, \`renderData()\` for the resolved one, both writing into the exact same tbody so nothing about the surrounding table needs to change between states.\n\nThe Reload button disables itself for the duration of the simulated fetch specifically so a second click can't restart the skeleton mid-load and leave two competing timers racing to populate the same tbody — the same overlapping-request problem [bootstrap-form-autosave-status](/ui-snippets/bootstrap-form-autosave-status/) solves for a save action instead of a fetch.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Five shimmering skeleton rows appear immediately, each bar sized differently per column.' },
        { title: 'Wait about 1.4 seconds', text: 'The skeleton rows are replaced by five real rows of names, emails, roles, and status badges.' },
        { title: 'Click "Reload data"', text: 'The skeleton reappears and the button disables itself until the simulated fetch resolves again.' },
        { title: 'Click Reload again quickly', text: 'Nothing happens while it\'s disabled — a second load can\'t start until the first one finishes.' },
      ],
    },
    features: [
      'Skeleton bar widths are shaped per column instead of being uniform placeholder rectangles',
      'The shimmer animation runs entirely on background-position, with zero per-frame JavaScript',
      'renderSkeleton() and renderData() both target the same tbody, so no other markup changes between states',
      'The Reload button disables itself for the duration of the load, preventing overlapping fetch simulations',
      'The row count and column count of the skeleton matches the real data, not an arbitrary placeholder shape',
    ],
    useCases: [
      { icon: 'DASH', title: 'Dashboards and admin tables backed by an API', desc: 'Replace the setTimeout with a real fetch call — pairs naturally with [bootstrap-data-table-error-state](/ui-snippets/bootstrap-data-table-error-state/) for the failure path a real request also needs.' },
      { icon: 'APP', title: 'Any table that loads after an initial page render', desc: 'Avoids a layout jump between "nothing" and "a full table" by showing the table\'s eventual shape immediately.' },
      { icon: 'CART', title: 'Order history and account activity panels', desc: 'Pairs with [bootstrap-sticky-table-header-scroll](/ui-snippets/bootstrap-sticky-table-header-scroll/) for a longer real-data table that also loads asynchronously.' },
      { icon: 'LEARN', title: 'Learning shape-matched loading states', desc: 'A direct, working comparison point against a generic spinner overlay — see how differently each communicates what\'s about to appear.' },
    ],
    faqs: [
      { q: 'How is this different from a spinner overlay?', a: 'A spinner (see bootstrap-loading-spinner-overlay) communicates "something is happening" with no hint of what. A skeleton shaped like the real table communicates the eventual layout immediately, which most research on perceived performance shows feels faster even at the identical actual load time.' },
      { q: 'Why do the skeleton bars have different widths instead of matching?', a: 'Uniform bars read as a generic loading placeholder; bars sized like real content (a name column narrower than an email column) make the skeleton specifically resemble this table rather than any table, which is what makes the transition to real data feel seamless instead of jarring.' },
      { q: 'Does the shimmer use any JavaScript?', a: 'No — it is a pure CSS @keyframes animation on background-position over an oversized gradient. JavaScript is only responsible for swapping the skeleton markup for real data once the (simulated) load finishes.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track a loading boolean in component state and conditionally render either a mapped array of skeleton rows or the real data rows from the same array-mapping logic — the CSS shimmer class needs no changes.' },
      { q: 'How would I connect this to a real API?', a: 'Replace the setTimeout in load() with an actual fetch, calling renderData() with the resolved response inside .then() and keeping the skeleton visible (and Reload disabled) for the full duration of the real request.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to make the skeleton row count match a real API's expected page size automatically, or to add a minimum-display-time guard so the skeleton never flashes for an imperceptibly short moment on a very fast connection.`,
      prompt: `Build a Bootstrap 5.3 data table with a loading skeleton state, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with 4 columns and a "Reload data" button above it.
- On load, and again on every Reload click, first render 5 skeleton rows whose cells are shimmering gray bars — give each column's bar a different width so the skeleton\'s shape roughly matches the real content\'s shape (e.g. a shorter bar for a short column, a longer one for a long column).
- The shimmer effect must be a pure CSS animation (an oversized background gradient animated via background-position), not a JavaScript-driven frame-by-frame effect.
- After a simulated delay (around 1.4 seconds via setTimeout), replace the skeleton rows with 5 rows of real sample data in the same table.
- Disable the Reload button for the duration of the simulated load so a second click cannot start an overlapping load.`,
    },
  },
};

export default bootstrapDataTableLoadingSkeleton;
