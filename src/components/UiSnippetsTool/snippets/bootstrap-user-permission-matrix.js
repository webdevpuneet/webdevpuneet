const bootstrapUserPermissionMatrix = {
  id: 'bootstrap-user-permission-matrix',
  title: 'Bootstrap User Permission Matrix',
  lastmod: '2026-09-11',
  category: 'dashboards',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsperm-card">
    <div class="card-body p-3">
      <h6 class="fw-bold mb-2">Role permissions</h6>
      <div class="table-responsive">
        <table class="table table-sm align-middle mb-0" id="bspermTable">
          <thead>
            <tr>
              <th>Permission</th>
              <th class="text-center">Viewer</th>
              <th class="text-center">Editor</th>
              <th class="text-center">Admin</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <p class="small text-muted mt-2 mb-0">Click a cell to toggle it. Admin always keeps every permission.</p>
    </div>
  </div>
</div>`,
  css: `.bsperm-card { width: 420px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bsperm-cell { cursor: pointer; font-size: 16px; }
.bsperm-cell.bsperm-locked { cursor: not-allowed; opacity: .6; }
.bsperm-on { color: #198754; }
.bsperm-off { color: #d1d5db; }`,
  js: `const PERMISSIONS = ['View content', 'Edit content', 'Publish content', 'Manage billing', 'Manage users'];
const ROLES = ['viewer', 'editor', 'admin'];

// Admin is modeled as always-true and locked, rather than just pre-checked —
// this is what actually prevents someone from accidentally locking an admin
// out of a permission the role is supposed to always guarantee.
const grid = {
  viewer: [true, false, false, false, false],
  editor: [true, true, true, false, false],
  admin: PERMISSIONS.map(() => true),
};

const tbody = document.querySelector('#bspermTable tbody');

function render() {
  tbody.innerHTML = PERMISSIONS.map((perm, row) =>
    '<tr><td>' + perm + '</td>' +
    ROLES.map(role => {
      const locked = role === 'admin';
      const on = grid[role][row];
      return '<td class="text-center bsperm-cell' + (locked ? ' bsperm-locked' : '') +
        '" data-role="' + role + '" data-row="' + row + '">' +
        '<span class="' + (on ? 'bsperm-on' : 'bsperm-off') + '">' + (on ? '\\u2713' : '\\u2014') + '</span></td>';
    }).join('') + '</tr>'
  ).join('');
}

tbody.addEventListener('click', e => {
  const cell = e.target.closest('.bsperm-cell');
  if (!cell || cell.classList.contains('bsperm-locked')) return;
  const role = cell.dataset.role;
  const row = Number(cell.dataset.row);
  grid[role][row] = !grid[role][row];
  render();
});

render();`,

  seo: {
    title: 'Bootstrap User Permission Matrix — Free HTML CSS JS Snippet',
    description: 'A real, clickable Bootstrap 5.3 permission grid — toggle any Viewer or Editor cell directly, while Admin stays genuinely locked to every permission rather than just pre-checked and editable.',
    about: {
      title: 'Bootstrap User Permission Matrix — HTML, CSS & JavaScript',
      description: `The permission state lives in one plain \`grid\` object keyed by role, each holding a boolean array indexed the same way as \`PERMISSIONS\` — \`grid.editor[2]\` is unambiguously "does the editor role have the third permission," which is what makes rendering the entire table a matter of mapping over two small arrays rather than hand-writing markup for every one of the fifteen cells.\n\nAdmin's row isn't just pre-checked — every cell in \`grid.admin\` is genuinely fixed to \`true\` and separately marked \`locked\` in the render function, and the click handler explicitly bails out on a locked cell before touching \`grid\` at all. That distinction matters: a "pre-checked but still editable" admin row would let someone accidentally uncheck "Manage billing" for admins and lock the whole team out of billing, which a real permission matrix should treat as structurally impossible, not just discouraged.\n\nToggling any unlocked cell is a single, symmetric operation — \`grid[role][row] = !grid[role][row]\` — with no special-casing per permission or per role beyond the one admin-lock check, which is what keeps adding a sixth permission or a fourth role a matter of extending the two source arrays rather than writing new toggle logic.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A 5x3 grid renders with Viewer, Editor, and Admin columns, each cell showing a checkmark or dash.' },
        { title: 'Click a checkmark or dash in the Viewer or Editor column', text: 'It toggles immediately between granted and not granted.' },
        { title: 'Try clicking any cell in the Admin column', text: 'Nothing happens — every Admin cell is genuinely locked to always-granted, not just pre-checked.' },
        { title: 'Toggle several Editor permissions on and off', text: 'Each cell updates independently, with no effect on Viewer or Admin.' },
      ],
    },
    features: [
      'Permission state lives in one plain grid object, indexed identically to the rendered rows and columns',
      'Admin permissions are structurally locked, not just pre-checked and still technically editable',
      'The click handler explicitly rejects locked cells before ever touching the underlying grid state',
      'Toggling any unlocked cell is one symmetric operation with no per-permission or per-role special cases',
      'Adding a new permission or role only requires extending the two source arrays, not new logic',
    ],
    useCases: [
      { icon: 'APP', title: 'Admin panels managing team or workspace roles', desc: 'A direct, editable view of exactly what each role can do, more scannable than a paragraph description per role.' },
      { icon: 'DEV', title: 'Reviewing who changed a permission and when', desc: 'Pair with [bootstrap-audit-log-viewer](/ui-snippets/bootstrap-audit-log-viewer/) so a permission change here shows up as a searchable, filterable event there.' },
      { icon: 'DASH', title: 'Enterprise and B2B SaaS access control settings', desc: 'Pairs with [bootstrap-role-comparison-table](/ui-snippets/bootstrap-role-comparison-table/)-style summaries for a fuller access-management section.' },
      { icon: 'DEV', title: 'Internal tools defining custom role-based access', desc: 'A starting point for any admin UI letting an operator define exactly which permissions a custom role should carry.' },
    ],
    faqs: [
      { q: 'Why lock Admin instead of just leaving it pre-checked?', a: 'A pre-checked-but-editable cell can be accidentally unchecked by a stray click, silently removing a permission a role is supposed to always have — locking it structurally (both visually and in the click handler) makes that mistake impossible rather than just unlikely.' },
      { q: 'Can I add a fourth role, like "Billing Manager"?', a: 'Yes — add it to the ROLES array and give it its own boolean array in grid keyed by that role name; render() and the click handler both iterate ROLES generically and need no changes.' },
      { q: 'What happens if I add a new permission?', a: 'Add its label to PERMISSIONS and a corresponding boolean to every role\'s array in grid, at the same index — the table automatically grows by one row.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the grid object in component state, and toggle a cell by producing a new grid object with that one role/row value flipped (respecting your framework\'s immutability conventions) rather than mutating it directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "custom role" column that starts with every permission unchecked and lets an admin build a role from scratch, or to add a small diff summary showing exactly which permissions differ between two selected roles.`,
      prompt: `Build a Bootstrap 5.3 clickable user permission matrix, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A table with a row per permission (at least 5) and a column per role (at least 3, e.g. Viewer, Editor, Admin), each cell showing a checkmark or dash indicating whether that role has that permission.
- Store all permission state in a single object keyed by role, holding a boolean array per role indexed the same way as the permission rows, and render the entire table from that one structure.
- Clicking an unlocked cell must toggle that specific role/permission combination immediately, updating only that cell's visual state.
- One role (e.g. Admin) must have every permission structurally locked to always-granted — clicking any of its cells must have no effect at all, both visually (styled as non-interactive) and in the click handler logic itself.`,
    },
  },
};

export default bootstrapUserPermissionMatrix;
