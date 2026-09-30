const permissionMatrix = {
  id: 'permission-matrix',
  title: 'Role Permission Matrix',
  lastmod: '2026-08-15',
  category: 'tables',
  html: `<div class="pm-wrap">
  <div class="pm-head">
    <div>
      <h3>Role permissions</h3>
      <p class="pm-sub">Higher roles inherit everything the roles below them can do.</p>
    </div>
    <div class="pm-count"><span id="pmCount">0</span> explicit grants</div>
  </div>

  <div class="pm-scroll">
    <table class="pm-table" id="pmTable">
      <thead>
        <tr>
          <th class="pm-cap">Capability</th>
          <th data-role="0">Viewer</th>
          <th data-role="1">Editor</th>
          <th data-role="2">Admin</th>
          <th data-role="3">Owner</th>
        </tr>
      </thead>
      <tbody id="pmBody"></tbody>
    </table>
  </div>

  <div class="pm-foot">
    <div class="pm-key">
      <span><i class="k on"></i> granted</span>
      <span><i class="k inh"></i> inherited</span>
      <span><i class="k off"></i> denied</span>
    </div>
    <button class="pm-btn" id="pmReset">Reset to defaults</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0f172a;padding:26px 16px;color:#e2e8f0}

.pm-wrap{max-width:760px;margin:0 auto;background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden}
.pm-head{display:flex;align-items:flex-start;justify-content:space-between;gap:16px;padding:16px 18px;border-bottom:1px solid #334155}
.pm-head h3{font-size:15px;font-weight:700}
.pm-sub{font-size:12px;color:#94a3b8;margin-top:3px}
.pm-count{font-size:12px;color:#a5b4fc;background:rgba(99,102,241,.14);padding:5px 10px;border-radius:999px;white-space:nowrap;font-weight:600}

.pm-scroll{overflow-x:auto}
.pm-table{width:100%;border-collapse:collapse;min-width:560px}
.pm-table th{
  padding:11px 12px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
  color:#94a3b8;background:#172033;border-bottom:1px solid #334155;text-align:center;
}
.pm-table th.pm-cap{text-align:left;width:44%}
.pm-table td{padding:0;border-bottom:1px solid #263449;text-align:center}
.pm-table tbody tr:last-child td{border-bottom:none}
.pm-table tbody tr:hover{background:#22304a}

/* Needs to out-specify the centred .pm-table td rule above. */
.pm-table td.pm-name{padding:11px 12px;text-align:left;font-size:13px;color:#cbd5e1}
.pm-name small{display:block;font-size:11px;color:#64748b;margin-top:2px}

.pm-cell{
  width:100%;height:100%;min-height:44px;background:none;border:none;cursor:pointer;
  display:flex;align-items:center;justify-content:center;font-family:inherit;padding:8px;
}
.pm-cell:focus-visible{outline:2px solid #6366f1;outline-offset:-2px}

.box{
  width:19px;height:19px;border-radius:6px;border:1.5px solid #475569;
  display:flex;align-items:center;justify-content:center;transition:all .14s;
}
.box svg{width:11px;height:11px;stroke:#fff;stroke-width:3;fill:none;opacity:0}

.pm-cell.on .box{background:#6366f1;border-color:#6366f1}
.pm-cell.on .box svg{opacity:1}

/* Inherited cells are shown as satisfied but visually quieter, and are not clickable. */
.pm-cell.inh{cursor:not-allowed}
.pm-cell.inh .box{background:rgba(99,102,241,.22);border-color:rgba(99,102,241,.45);border-style:dashed}
.pm-cell.inh .box svg{opacity:1;stroke:#a5b4fc}

.pm-cell.locked{cursor:not-allowed}
.pm-cell.locked .box{background:#334155;border-color:#334155}
.pm-cell.locked .box svg{opacity:1;stroke:#64748b}

.pm-foot{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:13px 18px;border-top:1px solid #334155;flex-wrap:wrap}
.pm-key{display:flex;gap:14px;font-size:11.5px;color:#94a3b8}
.pm-key span{display:flex;align-items:center;gap:6px}
.k{width:11px;height:11px;border-radius:4px;display:inline-block}
.k.on{background:#6366f1}
.k.inh{background:rgba(99,102,241,.22);border:1.5px dashed rgba(99,102,241,.6)}
.k.off{border:1.5px solid #475569}

.pm-btn{background:#334155;color:#cbd5e1;border:none;border-radius:7px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
.pm-btn:hover{background:#475569}`,

  js: `var ROLES = ['Viewer', 'Editor', 'Admin', 'Owner'];

var CAPS = [
  { id: 'read',    name: 'View content',        hint: 'Read pages and comments',     min: 0 },
  { id: 'comment', name: 'Comment',             hint: 'Post and reply in threads',   min: 0 },
  { id: 'write',   name: 'Create and edit',     hint: 'Draft and publish content',   min: 1 },
  { id: 'delete',  name: 'Delete content',      hint: 'Remove any published item',   min: 2 },
  { id: 'invite',  name: 'Invite members',      hint: 'Send workspace invitations',  min: 2 },
  { id: 'billing', name: 'Manage billing',      hint: 'Change plan and payment',     min: 3, locked: true },
  { id: 'transfer',name: 'Transfer ownership',  hint: 'Hand the workspace over',     min: 3, locked: true },
];

var CHECK = '<svg viewBox="0 0 24 24"><polyline points="4 12 10 18 20 6"/></svg>';

var body = document.getElementById('pmBody');
var countEl = document.getElementById('pmCount');

// state[capId] = index of the LOWEST role explicitly granted this capability.
var state = {};

function reset() {
  CAPS.forEach(function (c) { state[c.id] = c.min; });
  render();
}

// A role has a capability if its index is at or above the granted floor —
// that single rule is what produces inheritance without storing it per cell.
function has(capId, roleIndex) {
  return roleIndex >= state[capId];
}

function render() {
  body.innerHTML = '';
  var grants = 0;

  CAPS.forEach(function (cap) {
    var tr = document.createElement('tr');

    var name = document.createElement('td');
    name.className = 'pm-name';
    name.innerHTML = cap.name + '<small>' + cap.hint + '</small>';
    tr.appendChild(name);

    ROLES.forEach(function (role, i) {
      var td = document.createElement('td');
      var btn = document.createElement('button');
      btn.className = 'pm-cell';
      btn.innerHTML = '<span class="box">' + CHECK + '</span>';
      btn.dataset.cap = cap.id;
      btn.dataset.role = i;

      var granted = has(cap.id, i);
      var isFloor = granted && i === state[cap.id];

      if (cap.locked) {
        btn.classList.toggle('locked', granted);
        btn.disabled = true;
        btn.title = 'Fixed by the plan — cannot be changed here';
      } else if (isFloor) {
        btn.classList.add('on');
        grants++;
        btn.title = 'Granted at ' + role + '. Click to revoke.';
      } else if (granted) {
        btn.classList.add('inh');
        btn.disabled = true;
        btn.title = 'Inherited from ' + ROLES[state[cap.id]];
      } else {
        btn.title = 'Click to grant from ' + role + ' upward';
      }

      btn.setAttribute('aria-label', cap.name + ' for ' + role);
      btn.setAttribute('aria-pressed', String(granted));

      td.appendChild(btn);
      tr.appendChild(td);
    });

    body.appendChild(tr);
  });

  countEl.textContent = grants;
}

body.addEventListener('click', function (e) {
  var cell = e.target.closest('.pm-cell');
  if (!cell || cell.disabled) return;

  var cap = cell.dataset.cap;
  var role = Number(cell.dataset.role);

  // Clicking the current floor revokes it entirely; clicking anything else
  // moves the floor to that role, which cascades to every role above it.
  state[cap] = state[cap] === role ? ROLES.length : role;
  render();
});

document.getElementById('pmReset').addEventListener('click', reset);

reset();`,

  seo: {
    title: 'Role Permission Matrix — Free HTML CSS JS Snippet',
    description: 'Roles-by-capability permission grid with real inheritance: granting a capability cascades to every higher role. Three cell states, no library.',
    about: {
      title: 'Role Permission Matrix — Cascading Inheritance, Three-State Cells & a Single Source of Truth',
      description: `A permission matrix looks like a grid of independent checkboxes and almost never behaves like one. Real role systems are hierarchical: if an Editor can publish, an Admin and an Owner can publish too, and a UI that lets you tick "Admin can publish" while leaving "Owner can publish" unticked is describing a system that cannot exist. This snippet models the hierarchy honestly, and the result is both simpler to reason about and much smaller to store.

**One number per capability, not one boolean per cell**

The entire state is \`state[capabilityId] = lowestRoleIndexGranted\`. A four-role, seven-capability grid is twenty-eight cells but only seven numbers. Whether any given cell is on is derived with one comparison — \`roleIndex >= state[capId]\` — so inheritance is not something the code maintains, it is something the data model makes impossible to violate. There is no synchronisation step, no cascade function to call after an edit, and no way for the grid to enter an inconsistent state.

**Three visual states for three different meanings**

A cell is granted (solid indigo, clickable, this is where the capability starts), inherited (dashed and muted, not clickable, it is on because a lower role has it), or denied (empty outline). Collapsing inherited into granted is the mistake that makes these grids confusing, because the user clicks to turn off an Admin permission, watches it stay on, and concludes the UI is broken. Showing inheritance as visually distinct and explicitly non-interactive — with a tooltip naming the role it comes from — answers the question before it is asked.

**Clicking has one rule**

Clicking an empty cell sets the floor to that role, which immediately grants every role above it. Clicking the current floor revokes the capability entirely by pushing the floor past the last role. Every other cell is inherited and inert. That is the whole interaction model, and because it is expressed as a single assignment before a full re-render, there are no partial-update bugs.

**Locked rows for capabilities you do not control**

Billing and ownership transfer are marked \`locked\` in the capability data and render as permanently-on, disabled cells with an explanatory title. Most real permission systems have a handful of these — capabilities fixed by the plan, by legal requirement, or by the platform — and the matrix needs a way to display them as genuinely immovable rather than as settings the user will try and fail to change.

**Rendered from data, accessible by default**

Roles and capabilities are two arrays at the top of the file; adding a role is one string and adding a capability is one object with a name, a hint and a minimum role. Cells are real \`<button>\` elements rather than styled divs, so they are keyboard-focusable and reachable by tab, carry \`aria-pressed\` reflecting their granted state, and use the \`disabled\` attribute for inherited and locked cells so assistive technology reports them as unavailable rather than merely looking that way.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the grid as a hierarchy', text: 'Roles run left to right from least to most privileged. A capability granted at one role is automatically available to every role to its right, which is what the dashed inherited cells are showing you.' },
        { title: 'Click an empty cell to grant', text: 'Granting a capability at Editor immediately fills Admin and Owner as inherited, because a permission system where a higher role has less access than a lower one is not a state you want to be able to express.' },
        { title: 'Click the solid cell to revoke', text: 'The solid indigo cell is the floor — the role where the capability starts. Clicking it removes the capability from every role at once, since there is no longer any role granting it.' },
        { title: 'Notice what you cannot click', text: 'Inherited cells are disabled and explain themselves on hover, naming the role the permission comes from. To change them you move the floor, which is the only edit the model allows.' },
        { title: 'Watch the explicit grant count', text: 'The pill in the header counts floors rather than filled cells, so it reports how many real decisions have been made rather than how many boxes happen to be ticked.' },
        { title: 'Reset to the defaults', text: 'Every capability carries a default minimum role in its data. Reset restores all of them at once, which is the escape hatch that makes exploring the grid safe.' },
      ],
    },
    features: [
      'Hierarchical model storing one number per capability rather than one boolean per cell',
      'Inheritance derived from a single comparison, so an inconsistent grid is unrepresentable',
      'Three distinct cell states — granted, inherited, denied — with inherited explicitly non-interactive',
      'Tooltips naming the role a permission is inherited from, answering the "why can I not untick this" question',
      'Locked capability rows for permissions fixed by plan or platform, rendered as disabled rather than editable',
      'Roles and capabilities defined as data arrays; adding either needs no logic changes',
      'Real button elements with aria-pressed and the disabled attribute, keyboard focusable throughout',
      'Explicit-grant counter that reports decisions made rather than cells filled',
      'Reset to per-capability defaults, with the whole grid re-rendered from one state object',
    ],
    useCases: [
      { icon: 'DASH', title: 'Team and workspace settings in a SaaS product', desc: 'The canonical home for this component. Pair it with a [team member card grid](/ui-snippets/team-member-card-grid/) so administrators can move between "what can this role do" and "who has this role" without leaving the settings area.' },
      { icon: 'FLOW', title: 'Admin consoles with hierarchical role models', desc: 'Any system where roles genuinely nest — support tiers, approval chains, moderation levels — is misrepresented by independent checkboxes. This layout makes the nesting the visible structure rather than a rule buried in the backend.' },
      { icon: 'CODE', title: 'Reference for modelling derived state in UI', desc: 'The pattern of storing a threshold and deriving every dependent cell, rather than storing every cell and keeping them in sync, generalises to pricing tiers, feature gates and plan comparison grids.' },
      { icon: 'LEARN', title: 'Documenting a permission model for your users', desc: 'A read-only version of this grid — disable all cells and drop the counter — is a far clearer explanation of what each role can do than a bulleted list, because inheritance is shown rather than described.' },
      { icon: 'FORM', title: 'Onboarding step for choosing a default role', desc: 'Showing the matrix while an admin picks the default role for new members turns an abstract dropdown choice into a concrete preview of the access they are handing out.' },
      { icon: 'APP', title: 'Compliance and access review interfaces', desc: 'Periodic access reviews need a compact view of who can do what. Because the state is a handful of numbers, the same structure serialises cleanly into an audit record of exactly what the permission set was on a given date.' },
      { icon: 'CODE', title: 'Related: Grouped Column Headers Table', desc: 'See the [Grouped Column Headers Table](/ui-snippets/table-column-group-headers/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why can I not untick an inherited cell?', a: 'Because the state it represents cannot exist. If Editors can publish, an Admin — who is strictly more privileged — must be able to publish too. Inherited cells are disabled and their tooltip names the role the permission comes from; to change them you move the floor by clicking the solid cell or a lower one.' },
      { q: 'How is the inheritance actually calculated?', a: 'Each capability stores one number: the index of the lowest role granted it. A cell is on when its role index is greater than or equal to that number. There is no cascade routine and no per-cell storage, so the grid cannot drift into an inconsistent state between renders.' },
      { q: 'How do I add a role or a capability?', a: 'Add a string to the ROLES array or an object to CAPS with id, name, hint and min (the default lowest role). Everything else — headers, cells, inheritance, the counter — is generated from those two arrays, so no logic changes are needed. Set locked: true on a capability to render it as a fixed, non-editable row.' },
      { q: 'What if my permission model is not hierarchical?', a: 'Then this is the wrong shape and you want independent checkboxes per cell, with state stored as a set of role-capability pairs. Most role systems are hierarchical in practice, but capability-based systems where roles are genuinely orthogonal exist, and forcing them into a floor model would misrepresent them.' },
      { q: 'Is the grid keyboard accessible?', a: 'Cells are real button elements, so they are in the tab order and activate with Enter or Space, with a visible focus ring via :focus-visible. Granted state is exposed through aria-pressed, and inherited and locked cells use the disabled attribute so screen readers announce them as unavailable rather than simply rendering them greyed out.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes, and it ports unusually cleanly because the state is a small plain object. Hold state as { capabilityId: lowestRoleIndex } in component state, render cells with a derived has(cap, role) helper, and handle clicks by setting one key. Since the whole grid is a pure function of that object, the framework re-render replaces the manual render() call with no other changes.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add a diff view that compares the current matrix against the saved defaults and lists every change in plain English — "Editors can now delete content", "Admins can no longer invite members" — which is exactly what an access-review workflow needs before anyone clicks save. Other natural extensions: add capability groups with collapsible section headers so a long list stays navigable; add a per-role column summary counting total capabilities; support custom roles inserted between the built-in ones, which tests whether your index-based model holds up; or build the read-only documentation variant that renders the same data with all interaction removed.`,
      prompt: `Build a role permission matrix in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Model roles as an ordered array from least to most privileged, and capabilities as an array of objects with an id, display name, short hint, and a default minimum role index.
- Store state as ONE number per capability: the index of the lowest role explicitly granted it. Do not store a boolean per cell. Derive whether any cell is on with the comparison roleIndex >= grantedFloor, so inheritance is a property of the data model rather than something the code has to synchronise.
- Render three visually distinct cell states: granted (the floor itself — solid, clickable), inherited (on because a lower role has it — dashed/muted, disabled, with a tooltip naming the source role), and denied (empty outline, clickable).
- Clicking an empty cell sets the floor to that role, cascading to every higher role. Clicking the current floor revokes the capability entirely by pushing the floor past the last role. Inherited cells must not be clickable.
- Support capabilities marked as locked, which render as permanently granted, disabled cells with an explanatory title — for permissions fixed by plan or platform.
- Use real <button> elements for cells so they are keyboard focusable, set aria-pressed to reflect granted state, use the disabled attribute for inherited and locked cells, and show a visible :focus-visible ring.
- Show a counter of explicit grants (floors), a legend explaining the three states, and a Reset button restoring each capability's default minimum role.
- Style it as a dark settings table with a left capability column showing name plus hint, centred role columns, and a horizontally scrollable wrapper.`,
    },
  },
};

export default permissionMatrix;
