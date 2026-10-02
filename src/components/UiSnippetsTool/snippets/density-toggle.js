const densityToggle = {
  id: 'density-toggle',
  title: 'Table Density Toggle',
  lastmod: '2026-07-18',
  category: 'tables',
  html: `<div class="dt-card">
  <div class="dt-bar">
    <h3>Team members</h3>
    <div class="dt-seg" id="dtSeg" role="group" aria-label="Row density">
      <button type="button" data-d="compact" aria-pressed="false">Compact</button>
      <button type="button" data-d="cozy" aria-pressed="true">Cozy</button>
      <button type="button" data-d="comfy" aria-pressed="false">Comfortable</button>
      <span class="dt-glide" id="dtGlide"></span>
    </div>
  </div>
  <div class="dt-scroll">
    <table class="dt-table cozy" id="dtTable">
      <thead><tr><th>Name</th><th>Role</th><th>Status</th></tr></thead>
      <tbody id="dtBody"></tbody>
    </table>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;color:#0f172a;display:flex;justify-content:center;padding:28px 18px}

.dt-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden;width:100%;max-width:460px;box-shadow:0 12px 34px -24px rgba(0,0,0,.3)}
.dt-bar{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:14px 16px;border-bottom:1px solid #f1f5f9;flex-wrap:wrap}
.dt-bar h3{font-size:14px;font-weight:800}

.dt-seg{position:relative;display:flex;background:#f1f5f9;border-radius:9px;padding:3px}
.dt-seg button{position:relative;z-index:2;border:none;background:transparent;padding:6px 11px;font-size:11.5px;font-weight:700;color:#64748b;cursor:pointer;font-family:inherit;border-radius:7px;transition:color .2s}
.dt-seg button[aria-pressed=true]{color:#0f172a}
.dt-glide{position:absolute;z-index:1;top:3px;bottom:3px;border-radius:7px;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,.12);transition:left .25s cubic-bezier(.4,0,.2,1),width .25s cubic-bezier(.4,0,.2,1)}

.dt-scroll{overflow-x:auto}
.dt-table{width:100%;border-collapse:collapse;font-size:13.5px}
.dt-table th{text-align:left;color:#94a3b8;font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;border-bottom:1px solid #e2e8f0}
.dt-table td{border-bottom:1px solid #f1f5f9;color:#334155}
.dt-table tbody tr{transition:background .12s}
.dt-table tbody tr:hover{background:#f8fafc}

/* Density classes drive padding + font-size in one place. */
.dt-table.compact th,.dt-table.compact td{padding:5px 14px}
.dt-table.compact{font-size:12.5px}
.dt-table.cozy th,.dt-table.cozy td{padding:10px 14px}
.dt-table.comfy th,.dt-table.comfy td{padding:16px 14px}
.dt-table.comfy{font-size:14px}

.dt-pill{display:inline-block;font-size:11px;font-weight:700;padding:2px 9px;border-radius:999px}
.dt-pill.on{background:#dcfce7;color:#16a34a}
.dt-pill.off{background:#f1f5f9;color:#94a3b8}
.dt-pill.away{background:#fef3c7;color:#b45309}`,

  js: `var PEOPLE = [
  { name: 'Ada Lovelace',   role: 'Engineering Lead', status: 'on' },
  { name: 'Linus Carter',   role: 'Backend Engineer', status: 'away' },
  { name: 'Priya Nair',     role: 'Product Designer',  status: 'on' },
  { name: 'Omar Reyes',     role: 'Data Analyst',      status: 'off' },
  { name: 'Mei Tan',        role: 'QA Engineer',       status: 'on' },
  { name: 'Jonas Berg',     role: 'DevOps',            status: 'away' }
];
var LABEL = { on: 'Online', away: 'Away', off: 'Offline' };

var body = document.getElementById('dtBody');
PEOPLE.forEach(function (p) {
  var tr = document.createElement('tr');
  tr.innerHTML = '<td>' + p.name + '</td><td>' + p.role + '</td>' +
    '<td><span class="dt-pill ' + p.status + '">' + LABEL[p.status] + '</span></td>';
  body.appendChild(tr);
});

var table = document.getElementById('dtTable');
var seg = document.getElementById('dtSeg');
var glide = document.getElementById('dtGlide');
var btns = seg.querySelectorAll('button');
var DENSITIES = ['compact', 'cozy', 'comfy'];

function setDensity(d, btn) {
  DENSITIES.forEach(function (x) { table.classList.remove(x); });
  table.classList.add(d);
  btns.forEach(function (b) { b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'); });
  moveGlide(btn);
}

// Slide the highlight pill under the active segment button.
function moveGlide(btn) {
  glide.style.left = btn.offsetLeft + 'px';
  glide.style.width = btn.offsetWidth + 'px';
}

btns.forEach(function (b) {
  b.addEventListener('click', function () { setDensity(b.getAttribute('data-d'), b); });
});

// Position the glide under the initially-active button.
var active = seg.querySelector('[aria-pressed=true]');
requestAnimationFrame(function () { moveGlide(active); });`,

  seo: {
    title: 'Table Density Toggle — Free Compact Row Spacing JS Snippet',
    description: `A data table density switcher with compact, cozy, and comfortable row spacing and a sliding segmented control. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Table Density Toggle — Compact / Cozy / Comfortable Rows',
      description: `A density toggle lets users switch a data table between compact, cozy, and comfortable row spacing — the control Gmail, Notion, Linear, and admin dashboards offer so power users can fit more rows on screen while others get breathing room. This snippet builds one in plain HTML, CSS, and vanilla JavaScript: a segmented control with a sliding highlight that swaps a single class on the table to change padding and font size. No dependency.

**Density as a single class swap**

All three densities are defined in CSS as classes — \`.compact\`, \`.cozy\`, \`.comfy\` — each setting the \`th\`/\`td\` padding and, for the extremes, a font size. Changing density is just removing the others and adding one: \`setDensity()\` does exactly that. Because the spacing lives entirely in CSS, the JavaScript never touches per-cell styles, so the table re-flows instantly and the rule stays the single source of truth for how each mode looks.

**A sliding segmented control**

The segmented control is the buttons plus one absolutely-positioned \`.dt-glide\` pill behind them. On selection, \`moveGlide()\` reads the active button's \`offsetLeft\` and \`offsetWidth\` and sets the pill's \`left\` and \`width\`, which animate via a CSS transition — so the highlight glides under whichever button you pick rather than snapping. Measuring the real button geometry means it adapts automatically if the labels change width or the control is resized.

**Accessible toggle semantics**

Each option is a real \`<button>\` with \`aria-pressed\` reflecting the active density, grouped in a \`role="group"\` labelled "Row density". That makes the control keyboard-operable and announces which mode is selected, without needing radio inputs or custom roles. The text color also shifts on the active button so the state is visible as well as audible.

**Initial position with rAF**

The glide pill needs the active button's measurements, which are only correct after layout. A single \`requestAnimationFrame\` defers the first \`moveGlide()\` until the browser has laid the buttons out, so the highlight starts under the default "Cozy" option instead of at \`left: 0\`.

**Persisting the preference**

Density is a per-user preference, so in production you'd save the chosen class to \`localStorage\` (or a user setting) and apply it on load before first paint to avoid a flash. Since the whole state is one class name on the table, persisting and restoring it is a two-line addition around \`setDensity()\`.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A data table renders with a Compact / Cozy / Comfortable switcher.` },
      { title: 'Click a density', text: `The row padding and font size change instantly across the table.` },
      { title: 'Watch the highlight', text: `A pill glides under the selected segment button.` },
      { title: 'Compare the modes', text: `Compact fits more rows; comfortable adds breathing room.` },
      { title: 'Use the keyboard', text: `Tab to the buttons and press Enter — aria-pressed tracks the active mode.` },
      { title: 'Persist the choice', text: `Save the active class to localStorage and apply it on load.` },
    ] },
    features: [
      { title: 'Three densities', text: `Compact, cozy, and comfortable defined purely in CSS.` },
      { title: 'Single class swap', text: `JS only toggles one class — spacing lives in CSS.` },
      { title: 'Sliding highlight', text: `A glide pill animates under the active button.` },
      { title: 'Geometry-measured', text: `offsetLeft/Width adapt to any label widths.` },
      { title: 'Accessible group', text: `Real buttons with aria-pressed in a labelled group.` },
      { title: 'rAF first paint', text: `The highlight starts under the default option correctly.` },
      { title: 'Easy to persist', text: `One class name maps cleanly to localStorage.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no table or UI library.` },
    ],
    useCases: [
      { title: 'Admin record tables', text: 'Let users densify a [data table](/ui-snippets/data-table/) of records, with compact, cozy and comfortable spacing defined purely in CSS.' },
      { title: 'Inbox and email lists', text: 'Offer Gmail-style spacing in an [email inbox](/ui-snippets/email-inbox/), where JavaScript only swaps one class and the stylesheet does the rest.' },
      { title: 'View option menus', text: 'Pair with a [data table column toggle](/ui-snippets/data-table-column-toggle/) so people tune both which columns show and how tightly rows are packed.' },
      { title: 'Sortable grid controls', text: 'Combine with a [sortable table](/ui-snippets/sortable-table/) for power users who scan many rows, with the active choice shown by `aria-pressed`.' },
      { title: 'Segmented control reuse', text: 'Reuse the sliding pill from a [segmented control](/ui-snippets/segmented-control/), measuring `offsetLeft` and width so any label length works.' },
      { icon: 'CODE', title: 'Related: Row-Level Diff Table', desc: 'See the [Row-Level Diff Table](/ui-snippets/diff-table/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does changing density not require restyling every cell?', a: `Each density is a CSS class on the table — .compact, .cozy, .comfy — that sets the th and td padding and font size. setDensity() removes the other classes and adds one, so the browser reflows all rows from the new rule. The JavaScript never sets per-cell styles, keeping CSS the single source of truth.` },
      { q: 'How does the sliding highlight follow the buttons?', a: `A single absolutely-positioned pill sits behind the buttons. On each selection, moveGlide() reads the active button's offsetLeft and offsetWidth and sets the pill's left and width, which animate via a CSS transition. Measuring the real geometry means it adapts to any label width without hardcoded positions.` },
      { q: 'Why is the first highlight position set in requestAnimationFrame?', a: `The pill needs the active button's measured size, which is only correct after the browser lays the buttons out. Calling moveGlide() inside a requestAnimationFrame defers it one frame until layout is done, so the highlight starts under the default option instead of jumping from left: 0.` },
      { q: 'How do I remember the user\'s density choice?', a: `Because the entire state is one class name on the table, save it to localStorage in setDensity() and read it back on load, applying the class before first paint to avoid a flash. For logged-in users, store it as a profile setting and hydrate it the same way.` },
      { q: 'How do I use this density toggle in React, Vue, or Angular?', a: `Hold the active density in state and bind it as the table's class. Render the segment buttons from the density list with aria-pressed tied to state. For the sliding pill, use a ref to measure the active button in a layout effect (useLayoutEffect, onMounted, ngAfterViewInit) and set the pill's style. In Tailwind, map each density to a set of padding utilities.` },
    ],
    aiPrompt: {
      paragraph: `Instead of reasoning through the geometry math alone, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely how moveGlide() turns offsetLeft and offsetWidth into the sliding pill's left and width, and why the very first call is wrapped in a requestAnimationFrame rather than run immediately on page load. The same assistant can help optimize it, for example checking whether recalculating offsetLeft on every window resize is needed to keep the glide pill aligned if the segmented control's width changes. It is also useful for extending the toggle: ask it to persist the chosen density to localStorage and restore it before first paint, add a fourth "ultra-compact" density tier, or drive the same glide-pill pattern for an unrelated tab bar. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a segmented density toggle for a data table in plain HTML, CSS, and JavaScript with no UI library.

Requirements:
- Three real button elements (Compact, Cozy, Comfortable) inside a role="group" container, each with aria-pressed reflecting whether it is the active option, plus one absolutely-positioned sibling element acting as a sliding highlight pill behind the buttons.
- Define each density entirely as a CSS class on the table (setting th/td padding and, for the extremes, font-size) so that switching density in JavaScript never touches individual cell styles — only one class is swapped on the table element.
- On click, read the clicked button's offsetLeft and offsetWidth and set them as the pill's left and width so the pill visually glides to sit exactly behind whichever button is active, animated by a CSS transition on left and width.
- Defer the very first positioning of the pill until inside a requestAnimationFrame callback, since offsetLeft/offsetWidth are only correct after the browser has completed layout, and calling it synchronously on script load would place the pill at the wrong position.
- Render a small table of sample rows above the toggle so the density change is visibly demonstrated, and make sure hovering a row and switching density do not conflict visually.`,
    },
  },
};

export default densityToggle;
