const skeletonTable = {
  id: 'skeleton-table',
  title: 'Skeleton Table',
  lastmod: '2026-07-18',
  category: 'loaders',
  html: `<div class="skt">
  <div class="skt-head">
    <h3>Team members</h3>
    <button class="skt-reload" id="sktReload" type="button">
      <svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>
      Reload
    </button>
  </div>
  <table class="skt-table" aria-busy="true" id="sktTable">
    <thead>
      <tr><th>Name</th><th>Role</th><th>Status</th><th class="skt-r">Last active</th></tr>
    </thead>
    <tbody id="sktBody"></tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.skt { width: min(560px, 100%); background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08); overflow: hidden; }

.skt-head { display: flex; align-items: center; justify-content: space-between; padding: 15px 18px; border-bottom: 1px solid #f1f5f9; }
.skt-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.skt-reload {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 7px 13px; border: 1px solid #e2e8f0; border-radius: 9px; background: #fff;
  font-family: inherit; font-size: 12.5px; font-weight: 600; color: #475569; cursor: pointer; transition: all 0.2s;
}
.skt-reload:hover { border-color: #cbd5e1; }
.skt-reload svg { width: 13px; height: 13px; fill: none; stroke: currentColor; stroke-width: 2.2; stroke-linecap: round; stroke-linejoin: round; }
.skt-reload.loading svg { animation: sktSpin 0.8s linear infinite; }
@keyframes sktSpin { to { transform: rotate(360deg); } }

.skt-table { width: 100%; border-collapse: collapse; font-size: 13px; }
.skt-table th {
  padding: 10px 18px; text-align: left;
  font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: #94a3b8;
  background: #f8fafc;
}
.skt-table td { padding: 12px 18px; border-top: 1px solid #f1f5f9; color: #334155; }
.skt-r { text-align: right; }
td.skt-r { color: #94a3b8; font-size: 12.5px; }

.skt-user { display: flex; align-items: center; gap: 10px; }
.skt-user b { display: block; font-size: 13px; color: #0f172a; }
.skt-user small { font-size: 11.5px; color: #94a3b8; }
.skt-avatar {
  width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 12px; font-weight: 700;
}

.skt-pill { display: inline-flex; align-items: center; gap: 5px; padding: 3px 10px; border-radius: 999px; font-size: 11.5px; font-weight: 700; }
.skt-pill::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.skt-pill.on { background: #dcfce7; color: #16a34a; }
.skt-pill.away { background: #fef3c7; color: #d97706; }
.skt-pill.off { background: #f1f5f9; color: #64748b; }

/* --- Skeleton primitives --- */
.skt-bone {
  display: inline-block; height: 12px; border-radius: 6px;
  background: linear-gradient(90deg, #eef2f7 25%, #f8fafc 42%, #eef2f7 58%);
  background-size: 400% 100%;
  animation: sktShimmer 1.4s ease-in-out infinite;
}
.skt-bone.circle { width: 32px; height: 32px; border-radius: 50%; }
@keyframes sktShimmer { 0% { background-position: 100% 0; } 100% { background-position: 0 0; } }

@media (prefers-reduced-motion: reduce) {
  .skt-bone { animation: none; background: #eef2f7; }
}

/* Loaded rows fade-slide in with a stagger */
tr.skt-in { animation: sktRow 0.35s ease both; }
@keyframes sktRow { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: none; } }`,
  js: `const ROWS = [
  { name: 'Ava Chen',    email: 'ava@lumen.io',    color: '#6366f1', role: 'Product Designer', status: 'on',   statusLabel: 'Online',  active: 'Just now' },
  { name: 'Liam Ortiz',  email: 'liam@lumen.io',   color: '#0ea5e9', role: 'Frontend Engineer', status: 'away', statusLabel: 'Away',    active: '12m ago' },
  { name: 'Maya Patel',  email: 'maya@lumen.io',   color: '#f59e0b', role: 'Engineering Lead',  status: 'on',   statusLabel: 'Online',  active: '3m ago' },
  { name: 'Noah Kim',    email: 'noah@lumen.io',   color: '#10b981', role: 'Data Scientist',    status: 'off',  statusLabel: 'Offline', active: 'Yesterday' },
  { name: 'Zoe Dubois',  email: 'zoe@lumen.io',    color: '#ec4899', role: 'Product Manager',   status: 'on',   statusLabel: 'Online',  active: '1h ago' },
];

const body = document.getElementById('sktBody');
const table = document.getElementById('sktTable');
const reload = document.getElementById('sktReload');

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase();
}

// Skeleton row: same cell structure as the real row, bones sized like real content
function skeletonRow(i) {
  // Vary bone widths slightly per row so the skeleton doesn't look stamped
  const w1 = 90 + (i % 3) * 18, w2 = 110 - (i % 2) * 24;
  return '<tr>'
    + '<td><div class="skt-user"><span class="skt-bone circle"></span>'
    + '<span><span class="skt-bone" style="width:' + w1 + 'px"></span><br>'
    + '<span class="skt-bone" style="width:' + (w1 - 26) + 'px; height:9px; margin-top:4px"></span></span></div></td>'
    + '<td><span class="skt-bone" style="width:' + w2 + 'px"></span></td>'
    + '<td><span class="skt-bone" style="width:58px; height:20px; border-radius:999px"></span></td>'
    + '<td class="skt-r"><span class="skt-bone" style="width:56px"></span></td>'
    + '</tr>';
}

function realRow(r, i) {
  return '<tr class="skt-in" style="animation-delay:' + (i * 60) + 'ms">'
    + '<td><div class="skt-user"><span class="skt-avatar" style="background:' + r.color + '">' + initials(r.name) + '</span>'
    + '<span><b>' + r.name + '</b><small>' + r.email + '</small></span></div></td>'
    + '<td>' + r.role + '</td>'
    + '<td><span class="skt-pill ' + r.status + '">' + r.statusLabel + '</span></td>'
    + '<td class="skt-r">' + r.active + '</td>'
    + '</tr>';
}

let timer = null;

function load() {
  clearTimeout(timer);
  table.setAttribute('aria-busy', 'true');
  reload.classList.add('loading');
  body.innerHTML = ROWS.map((_, i) => skeletonRow(i)).join('');
  // Simulated fetch delay — replace with your real request
  timer = setTimeout(() => {
    body.innerHTML = ROWS.map(realRow).join('');
    table.setAttribute('aria-busy', 'false');
    reload.classList.remove('loading');
  }, 1800);
}

reload.addEventListener('click', load);
load();`,
  seo: {
    title: 'Skeleton Table — Free HTML CSS JS Loader Snippet',
    description: 'A table skeleton loader with shimmering bones matched to real cell shapes, aria-busy states and staggered row swap-in. Copy or export to React, Vue & Tailwind.',
    about: {
      title: 'Skeleton Table — Shimmer Loading Placeholder That Swaps Into Real Table Rows',
      description: `Skeleton screens beat spinners for data tables because they preserve layout: the user sees the table's shape immediately, and when data arrives nothing jumps. The catch is that a table skeleton only works if the placeholder rows genuinely match the real rows — same columns, same cell heights, same visual weight. This component builds that properly in HTML, CSS, and vanilla JavaScript: shimmering bone placeholders shaped like the final avatar, text, and status-pill content, an \`aria-busy\` accessibility contract, and a staggered fade-in when real rows replace the bones.

**One bone primitive, many shapes**

Everything skeletal is a single \`.skt-bone\` class — an inline-block with a three-stop grey \`linear-gradient\` whose \`background-size\` is 400% width, animated by sliding \`background-position\` from one end to the other. Because the gradient is wider than the element, a soft highlight band appears to sweep across each bone. Width, height, and border-radius are then overridden per use: a 32px circle for the avatar, a 999px-radius lozenge for the status pill, and various text bars. One keyframe animation serves every bone, and since all bones share the same duration and timing, the shimmer sweeps the whole table in unison — the coordinated look users recognise from Facebook and LinkedIn.

**Skeleton rows that mirror real rows**

\`skeletonRow()\` emits the exact same \`<tr>/<td>\` structure as \`realRow()\` — the same \`.skt-user\` flex layout in the name cell, the same right-aligned last column — with bones sized like the content they stand in for. Two widths are derived from the row index (\`90 + (i % 3) * 18\`) so consecutive rows differ slightly; identical stamped rows are the tell that makes skeletons look fake. Because both renderers agree on structure, the swap to real data cannot shift the layout: columns were already at their final widths.

**The loading contract: aria-busy**

While bones are showing, the table carries \`aria-busy="true"\`, which tells assistive technology the region is updating and its current content is not meaningful — screen readers won't announce a page full of decorative divs. When the data lands, the attribute flips to \`false\` and the real rows are announced normally. The demo also honours \`prefers-reduced-motion\` by freezing the shimmer to a flat grey, since large animated regions are a vestibular trigger.

**Staggered swap-in**

Real rows arrive with a \`.skt-in\` class animating a 5px rise-and-fade, each delayed 60ms after the previous via an inline \`animation-delay\`. The cascade reads as "data flowing in" rather than a hard cut, the same entrance choreography as the [stagger list](/ui-snippets/stagger-list/). A reload button (whose icon spins while loading) restarts the cycle, and the \`load()\` function clears any in-flight timer first so rapid clicks cannot queue overlapping swaps.

**Where your fetch goes**

The 1.8-second \`setTimeout\` stands in for a network request. In production, \`load()\` becomes: render skeletons, \`await fetch()\`, render real rows in the response handler, flip \`aria-busy\`. Because skeleton and real rendering are separate pure functions over the same structure, wiring a real API changes one line. If your row count is unknown ahead of time, render 5–8 skeleton rows — enough to fill the visible area without implying a precise count.

**Customisation**

Adjust the bone gradient greys for dark mode (dark base, slightly lighter sweep), tune the 1.4s shimmer, and extend the row templates to your columns — every new cell just needs a matching bone. For whole-page loading states, combine with the [skeleton dashboard](/ui-snippets/skeleton-dashboard/) and [skeleton card grid](/ui-snippets/skeleton-card-grid/) variants.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A team-members table renders in its loading state — five skeleton rows of shimmering avatar circles, text bars, and pill lozenges.` },
      { title: 'Watch the swap', text: `After the simulated 1.8s fetch, real rows cascade in with a 60ms stagger — avatars, roles, status pills, and timestamps land without any layout shift.` },
      { title: 'Click Reload', text: `The button's icon spins, skeletons return instantly, and the cycle repeats; rapid clicks are debounced by clearing the pending timer.` },
      { title: 'Check reduced motion', text: `With prefers-reduced-motion enabled, bones render as static grey blocks instead of shimmering.` },
      { title: 'Wire your API', text: `Replace the setTimeout in load() with your fetch call — render skeletons before the request and realRow() output in the response handler.` },
      { title: 'Match your columns', text: `Extend skeletonRow() and realRow() together — every real cell gets a bone sized like its content so the swap stays shift-free.` },
    ]},
    features: [
      { title: 'Single bone primitive', text: `One .skt-bone class with a sliding oversized gradient serves circles, bars, and pills via per-use size overrides.` },
      { title: 'Synchronised shimmer', text: `All bones share one keyframe and duration so the highlight sweeps the entire table in unison.` },
      { title: 'Structure-mirrored rows', text: `Skeleton and real rows emit identical tr/td structure, guaranteeing zero layout shift on swap.` },
      { title: 'Varied bone widths', text: `Widths derive from the row index so consecutive skeleton rows differ — no stamped-copy look.` },
      { title: 'aria-busy contract', text: `The table announces its loading state to assistive tech and flips to false when real rows land.` },
      { title: 'Reduced-motion fallback', text: `prefers-reduced-motion freezes the shimmer to flat grey for vestibular safety.` },
      { title: 'Staggered row entrance', text: `Real rows rise in with 60ms cascading delays instead of a hard content cut.` },
      { title: 'Debounced reload', text: `load() clears any pending timer first so repeated reloads never queue overlapping swaps.` },
    ],
    useCases: [
      { title: 'Admin dashboards', text: `The loading state for any user or record table — pair with a [data table](/ui-snippets/data-table/) or [sortable table](/ui-snippets/sortable-table/) once loaded.` },
      { title: 'SaaS member lists', text: `Team pages that fetch on mount get instant perceived structure; the status pills match a [team presence list](/ui-snippets/team-presence-list/).` },
      { title: 'Search results tables', text: `Re-show skeletons on every query change so result swaps feel deliberate, not flickery.` },
      { title: 'Infinite and paginated tables', text: `Append skeleton rows below existing data while the next page loads — see [infinite scroll table](/ui-snippets/infinite-scroll-table/).` },
      { title: 'Mobile app webviews', text: `Skeletons mask slow mobile networks far better than a centred spinner.` },
      { title: 'Learning skeleton technique', text: `A reference for the oversized-gradient shimmer, structure mirroring, and the aria-busy loading contract.` },
      { icon: 'CODE', title: 'Related: Optimistic Action Button with Rollback on Failure', desc: 'See the [Optimistic Action Button with Rollback on Failure](/ui-snippets/optimistic-action-rollback-loader/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Skeleton to Content Crossfade', desc: 'See the [Skeleton to Content Crossfade](/ui-snippets/skeleton-to-content-crossfade/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the shimmer effect actually work?', a: `Each bone's background is a linear-gradient with a lighter middle stop, sized to 400% of the element's width via background-size. The keyframe slides background-position from 100% to 0, moving the wide gradient across the narrow element so the light band sweeps through. Because it animates background-position on small elements rather than layout properties, it stays cheap even with dozens of bones on screen.` },
      { q: 'Why must skeleton rows mirror the real row structure?', a: `The entire point of a skeleton is zero layout shift: the browser computes final column widths and row heights from the skeleton markup, so when real content replaces it nothing reflows. If the skeleton were a generic block overlay, the table would snap to different dimensions when data arrived — visually worse than a spinner. Mirroring structure means every td, flex wrapper, and cell alignment is identical between skeletonRow() and realRow().` },
      { q: 'What does aria-busy do and why set it?', a: `aria-busy="true" tells screen readers the element is being updated and its contents should not be treated as final — without it, assistive tech may announce meaningless placeholder markup. Flipping it to "false" after the swap signals the content is ready. Pairing this with the prefers-reduced-motion fallback (static grey bones) covers both the announcement and vestibular sides of loading-state accessibility.` },
      { q: 'How many skeleton rows should I render when the count is unknown?', a: `Render enough to fill the visible scroll area — typically 5 to 8 for a card-height table. Too few makes the table look nearly empty; matching some exact expected count implies precision you don't have. This snippet renders one skeleton per known row because the demo data is fixed, but ROWS.map can trivially become Array.from({ length: 6 }) when the response size is unknown.` },
      { q: 'How do I use this skeleton table in React, Vue, or Angular?', a: `Model a loading boolean (or a data === null state) and render either the skeleton rows or the real rows from it — the two template branches replace innerHTML strings. Set aria-busy from the same state. The fetch lives in useEffect / onMounted / ngOnInit, setting data on resolve. The shimmer gradient, reduced-motion query, and stagger animation are pure CSS and port unchanged; skeleton components in libraries like MUI or shadcn/ui use this identical technique.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the bone-to-row mapping by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why skeletonRow() and realRow() must emit identical tr/td structure for the zero-layout-shift guarantee to hold, or how the width formula in skeletonRow (90 + (i % 3) * 18) avoids the stamped-copy look. The same assistant can help optimize it, for instance checking whether the debounced load() function correctly prevents overlapping timers on rapid reload clicks, or whether five skeleton rows is the right number when the real result count is unknown. It is just as useful for extending the table: ask it to add a skeleton error state for failed fetches, support column sorting on the loaded table, or generalize skeletonRow so adding a new real column automatically produces a matching bone. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "skeleton table" loading state in plain HTML, CSS, and JavaScript for a data table with an avatar, name/email, role, status pill, and last-active columns — no libraries.

Requirements:
- A single reusable bone primitive class: an inline-block element with a three-stop grey linear-gradient sized to 400% of the element's own width, animated by sliding background-position across it in one keyframe. Every skeleton shape (circle avatar, text bar, pill lozenge) must be this same class with only width, height, and border-radius overridden per use.
- A skeletonRow(index) function and a realRow(rowData, index) function that emit exactly the same tr/td structure (same wrapper divs, same cell order, same alignment classes) so that when skeleton rows are replaced by real rows, no column width or row height changes — zero layout shift.
- Skeleton bone widths must vary slightly based on the row index (not be identical across all rows) so the placeholder doesn't look like a stamped copy of a single row.
- The table element must carry aria-busy="true" while skeleton rows are showing and aria-busy="false" once real rows have rendered, so assistive technology does not announce placeholder content as meaningful.
- Real rows, when they replace the skeletons, must animate in with a fade-and-rise (opacity plus a small translateY) staggered by an increasing delay per row index, so data appears to cascade in rather than snapping in all at once.
- A reload control must restart the full skeleton-then-data cycle, and must clear any previously pending simulated-fetch timer first so rapid repeated clicks cannot queue overlapping swaps.
- Respect prefers-reduced-motion by freezing the bone shimmer to a static flat color instead of animating it.`,
    },
  },
};

export default skeletonTable;
