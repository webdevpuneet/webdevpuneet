const tableColumnVisibilityToggle = {
  id: 'table-column-visibility-toggle',
  title: 'Table Column Visibility Toggle Menu',
  lastmod: '2026-08-27',
  category: 'tables',
  html: `<div class="demo">
  <div class="col-toolbar">
    <div class="col-menu-wrap">
      <button class="col-menu-btn" id="colMenuBtn" aria-haspopup="true" aria-expanded="false">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
        Columns
        <span class="col-count" id="colCount"></span>
      </button>
      <div class="col-menu" id="colMenu" role="menu">
        <label class="col-item"><input type="checkbox" data-col="email" checked /><span>Email</span></label>
        <label class="col-item"><input type="checkbox" data-col="role" checked /><span>Role</span></label>
        <label class="col-item"><input type="checkbox" data-col="status" checked /><span>Status</span></label>
        <label class="col-item"><input type="checkbox" data-col="lastActive" checked /><span>Last active</span></label>
        <label class="col-item"><input type="checkbox" data-col="joined" /><span>Joined date</span></label>
      </div>
    </div>
  </div>

  <table class="col-table" id="colTable">
    <thead>
      <tr>
        <th>Name</th>
        <th data-col="email">Email</th>
        <th data-col="role">Role</th>
        <th data-col="status">Status</th>
        <th data-col="lastActive">Last active</th>
        <th data-col="joined">Joined date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Maya Chen</td>
        <td data-col="email">maya@company.com</td>
        <td data-col="role">Admin</td>
        <td data-col="status"><span class="badge on">Active</span></td>
        <td data-col="lastActive">2 hours ago</td>
        <td data-col="joined">Jan 12, 2024</td>
      </tr>
      <tr>
        <td>Rahul Patel</td>
        <td data-col="email">rahul@company.com</td>
        <td data-col="role">Editor</td>
        <td data-col="status"><span class="badge on">Active</span></td>
        <td data-col="lastActive">1 day ago</td>
        <td data-col="joined">Mar 4, 2024</td>
      </tr>
      <tr>
        <td>Ines Fischer</td>
        <td data-col="email">ines@company.com</td>
        <td data-col="role">Viewer</td>
        <td data-col="status"><span class="badge off">Inactive</span></td>
        <td data-col="lastActive">3 weeks ago</td>
        <td data-col="joined">Jun 20, 2024</td>
      </tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 580px; max-width: 100%; display: flex; flex-direction: column; gap: 10px; }

.col-toolbar { display: flex; justify-content: flex-end; }
.col-menu-wrap { position: relative; }
.col-menu-btn { display: flex; align-items: center; gap: 7px; background: #fff; border: 1.5px solid #e2e8f0; padding: 8px 13px; border-radius: 9px; font-size: 12.5px; font-weight: 700; color: #475569; cursor: pointer; font-family: inherit; }
.col-menu-btn:hover { background: #f8fafc; }
.col-count { background: #eef2ff; color: #4338ca; font-size: 10.5px; font-weight: 800; padding: 1px 7px; border-radius: 999px; }

.col-menu { position: absolute; top: calc(100% + 6px); right: 0; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 12px 28px rgba(15,23,42,0.12); padding: 6px; min-width: 170px; display: none; flex-direction: column; z-index: 10; }
.col-menu.open { display: flex; }
.col-item { display: flex; align-items: center; gap: 9px; padding: 8px 10px; font-size: 12.5px; font-weight: 600; color: #334155; border-radius: 7px; cursor: pointer; }
.col-item:hover { background: #f8fafc; }
.col-item input { width: 15px; height: 15px; accent-color: #6366f1; cursor: pointer; }

.col-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; font-size: 13px; }
.col-table th { text-align: left; padding: 11px 14px; background: #f8fafc; color: #64748b; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; border-bottom: 1px solid #e2e8f0; }
.col-table td { padding: 11px 14px; color: #1f2937; border-bottom: 1px solid #f1f5f9; }
.col-table tr:last-child td { border-bottom: none; }
.col-table [data-col].col-hidden { display: none; }

.badge { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.badge.on { background: #dcfce7; color: #15803d; }
.badge.off { background: #f1f5f9; color: #64748b; }`,
  js: `const menuBtn = document.getElementById('colMenuBtn');
const menu = document.getElementById('colMenu');
const colCount = document.getElementById('colCount');
const table = document.getElementById('colTable');
const checkboxes = Array.from(menu.querySelectorAll('input[data-col]'));

function applyVisibility() {
  checkboxes.forEach((cb) => {
    const col = cb.dataset.col;
    const hidden = !cb.checked;
    // Toggle every cell (header and body) belonging to this column across
    // every row — a single querySelectorAll scoped to the whole table.
    table.querySelectorAll(\`[data-col="\${col}"]\`).forEach((cell) => {
      cell.classList.toggle('col-hidden', hidden);
    });
  });

  const visibleCount = checkboxes.filter((cb) => cb.checked).length;
  const totalCount = checkboxes.length;
  colCount.textContent = \`\${visibleCount + 1}/\${totalCount + 1}\`; // +1 accounts for the always-visible Name column
}

checkboxes.forEach((cb) => {
  cb.addEventListener('change', applyVisibility);
});

menuBtn.addEventListener('click', () => {
  const open = menu.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.col-menu-wrap')) {
    menu.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

applyVisibility();`,
  seo: {
    title: 'Table Column Visibility Toggle Menu — Real Dynamic Show/Hide Columns',
    description: 'A data table with a dropdown menu of checkboxes that genuinely show and hide entire table columns (header and every row\'s cell together), not just a decorative filter list.',
    about: {
      title: 'Table Column Visibility Toggle — Actually Adding and Removing Columns',
      description: `A "columns" menu is only useful if unchecking a box genuinely removes that column from the table — header and every row's matching cell together — rather than just visually greying out a menu item with no real effect. This snippet implements the real behavior: each checkbox is wired to a shared \`data-col\` identifier that both the header cell and every body cell in that column carry, so one toggle hides or reveals an entire column consistently across the whole table.

**One data attribute links a checkbox to its entire column, header included**

Every column that can be hidden has a \`data-col\` value — \`email\`, \`role\`, \`status\`, and so on — applied to *both* its \`<th>\` and every \`<td>\` in that column across every row. The checkbox controlling it carries the same value in its own \`data-col\` attribute. \`applyVisibility()\` reads each checkbox's \`data-col\`, then runs a single \`table.querySelectorAll(\`[data-col="\${col}"]\`)\` scoped to the whole table — which matches the header cell *and* every row's cell for that column in one query, applying the same \`.col-hidden\` toggle to all of them together, so a column can never end up with its header hidden but its body cells still showing, or vice versa.

**The "Name" column is intentionally not toggleable**

The first column (\`Name\`) has no \`data-col\` attribute and no matching checkbox — it's structurally exempt from the hide/show system entirely, modeling the realistic constraint that a table needs at least one identifying column always visible to remain meaningful; hiding every other column while keeping Name visible still leaves a usable, if minimal, table.

**The visible-column counter accounts for that always-visible column explicitly**

\`colCount.textContent\` computes \`\${visibleCount + 1}/\${totalCount + 1}\` — adding \`1\` to both the numerator and denominator specifically to account for the always-visible Name column, which isn't represented in the \`checkboxes\` array at all. Getting this off-by-one right matters for the badge to honestly report "6/6" when everything is visible, rather than under-reporting "5/5" and omitting the one column that was never optional in the first place.

**Dropdown menu behavior follows the same conventions as this library's other menus**

The columns button toggles \`aria-expanded\` and a \`.open\` class on the dropdown, and a document-level click listener closes the menu whenever a click lands outside \`.col-menu-wrap\` — standard, predictable dropdown-menu behavior that doesn't require re-learning for anyone who's used a similar menu elsewhere in a product.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Columns" and toggle any checkbox', text: 'Watch the corresponding column\'s header and every row\'s cell for that column hide or reveal together, immediately.' },
        { title: 'Add a new toggleable column', text: 'Give the new <th> and every matching <td> the same new data-col value, and add a matching checkbox with that same value in the menu.' },
        { title: 'Keep an identifying column always visible', text: 'Leave your primary identifying column (like Name here) without a data-col attribute so it\'s structurally exempt from being hidden.' },
        { title: 'Persist the visibility state (optional)', text: 'Save each checkbox\'s checked state to localStorage on change, and restore it before the initial applyVisibility() call, so a user\'s column preferences survive a reload.' },
        { title: 'Adjust which columns start hidden by default', text: 'Remove the checked attribute from any checkbox in the HTML to have that column start hidden.' },
      ],
    },
    features: [
      'Genuine show/hide — a single data-col attribute links each checkbox to both its header cell and every row\'s matching cell',
      'One toggle always hides or shows an entire column consistently, never leaving header and body cells out of sync',
      'One always-visible identifying column structurally exempt from the hide/show system, keeping the table always meaningful',
      'Visible-column counter badge correctly accounts for the always-visible column in its displayed ratio',
      'Standard dropdown menu conventions — aria-expanded, click-outside-to-close — matching this library\'s other menu patterns',
      'Single querySelectorAll per column toggle efficiently updates every affected cell in one pass',
      'Works with any number of columns and rows without additional wiring per row',
      'Pure vanilla JavaScript — no table/grid library dependency',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Admin Data Tables', desc: 'Let users customize which fields they see in a dense admin table of users, orders, or records.' },
      { icon: 'SAAS', title: 'Customizable Dashboard Tables', desc: 'Give users control over information density in any data-heavy table view.' },
      { icon: 'CRM', title: 'CRM / Spreadsheet-Style Views', desc: 'A common pattern in CRM and spreadsheet-like tools where users tailor visible columns to their workflow.' },
      { icon: 'REPORTING', title: 'Report Builder Tables', desc: 'Let users toggle which metrics or dimensions appear in a generated report table.' },
      { icon: 'CODE', title: 'Related: Table Loading / Empty / Error States', desc: 'See the [Table Loading / Empty / Error States](/ui-snippets/table-loading-empty-error-states/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does unchecking a box actually remove the column, or just fade it visually?', a: 'It genuinely hides the column — both the header cell and every row\'s corresponding cell get display:none applied via a shared .col-hidden class, driven by a single data-col attribute shared between the checkbox and every cell in that column, so the column\'s space is fully reclaimed by the table layout, not just dimmed.' },
      { q: 'Can the header and body cells for a column ever get out of sync (one hidden, one visible)?', a: 'No — both are toggled together in the exact same operation, since applyVisibility() queries table.querySelectorAll(`[data-col="${col}"]`) scoped to the whole table, which matches the header cell and every row\'s cell for that column in one pass and applies the identical class change to all of them.' },
      { q: 'Why is the Name column not toggleable?', a: 'It deliberately has no data-col attribute and no matching checkbox, modeling the realistic requirement that a table keeps at least one identifying column always visible — hiding every other column should still leave a minimally usable table, not an empty one.' },
      { q: 'Why does the counter show one more than the number of checkboxes when everything is checked?', a: 'The counter explicitly adds 1 to both the visible count and the total count to account for the always-visible Name column, which has no checkbox representing it at all — without that adjustment, the badge would misleadingly under-report the true number of visible and total columns.' },
      { q: 'How do I add a new optional column?', a: 'Add a data-col attribute with a new unique value to the new column\'s <th> and to every row\'s matching <td>, then add a corresponding checkbox with that same data-col value inside the menu — applyVisibility() picks it up automatically since it iterates over whatever checkboxes currently exist in the menu.' },
      { q: 'Does the visibility state persist across page reloads?', a: 'Not by default in this snippet — checkbox states reset to their HTML-defined defaults on reload. Add localStorage reads/writes around each checkbox\'s checked state if you want a user\'s column preferences to persist.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why sharing one data-col attribute between a checkbox, a header cell, and every row's matching cell is what guarantees header and body visibility can never fall out of sync, compared to an approach that toggled header and body cells through separate, independently-tracked logic. It's also worth asking for a version that persists column visibility preferences to localStorage across reloads, or one that also supports reordering visible columns via drag-and-drop in the same dropdown menu.`,
      prompt: `Build a data table with a column visibility toggle menu in HTML, CSS and vanilla JavaScript, where checkboxes genuinely show and hide entire table columns — no external table/grid library.

Requirements:
- A table with one always-visible identifying column (e.g. Name) and several other columns, each of which can be independently shown or hidden.
- A dropdown "Columns" button revealing a menu of checkboxes, one per optional column, where each checkbox and its column's header cell plus every row's corresponding cell all share a single common identifying attribute (e.g. a matching data attribute value).
- Toggling a checkbox must hide or show that column's header cell AND every row's matching cell together in one operation, so the two can never end up out of sync with each other — implement this as a single query that matches all cells sharing that column's identifier, not separate logic for header versus body cells.
- Display a small counter (e.g. "5/6") showing how many columns are currently visible out of the total, correctly accounting for the always-visible identifying column that has no checkbox of its own.
- The dropdown menu must close when clicking anywhere outside of it, and its trigger button must have an accurate aria-expanded attribute reflecting whether the menu is currently open.
- Ensure the solution generalizes to adding a new optional column without needing to write any additional per-row JavaScript wiring.`,
    },
  },
};

export default tableColumnVisibilityToggle;
