const dashboardWidgetGrid = {
  id: 'dashboard-widget-grid',
  title: 'Dashboard Widget Grid',
  lastmod: '2026-07-23',
  category: 'dashboards',
  html: `<div class="dash">
  <div class="dash-head">
    <h2>Overview</h2>
    <p class="dash-hint">Drag headers to rearrange · ⤢ toggles width · layout persists</p>
  </div>

  <div class="grid" id="grid">
    <div class="widget" data-id="revenue" draggable="true">
      <div class="w-head">
        <span class="w-title">Revenue</span>
        <span class="w-tools">
          <button class="w-size" title="Toggle width">⤢</button>
          <span class="w-grip">⠿</span>
        </span>
      </div>
      <div class="w-body">
        <p class="kpi">$128,430</p>
        <p class="kpi-delta up">▲ 12.4% vs last month</p>
      </div>
    </div>

    <div class="widget" data-id="users" draggable="true">
      <div class="w-head">
        <span class="w-title">Active users</span>
        <span class="w-tools">
          <button class="w-size" title="Toggle width">⤢</button>
          <span class="w-grip">⠿</span>
        </span>
      </div>
      <div class="w-body">
        <p class="kpi">8,912</p>
        <p class="kpi-delta up">▲ 3.1%</p>
      </div>
    </div>

    <div class="widget wide" data-id="traffic" draggable="true">
      <div class="w-head">
        <span class="w-title">Traffic</span>
        <span class="w-tools">
          <button class="w-size" title="Toggle width">⤢</button>
          <span class="w-grip">⠿</span>
        </span>
      </div>
      <div class="w-body">
        <svg class="spark" viewBox="0 0 200 48" preserveAspectRatio="none">
          <polyline points="0,38 20,32 40,35 60,24 80,28 100,18 120,22 140,12 160,16 180,8 200,12"
            fill="none" stroke="#818cf8" stroke-width="2.5" stroke-linejoin="round"/>
          <polyline points="0,38 20,32 40,35 60,24 80,28 100,18 120,22 140,12 160,16 180,8 200,12 200,48 0,48"
            fill="rgba(129,140,248,0.12)" stroke="none"/>
        </svg>
      </div>
    </div>

    <div class="widget" data-id="churn" draggable="true">
      <div class="w-head">
        <span class="w-title">Churn</span>
        <span class="w-tools">
          <button class="w-size" title="Toggle width">⤢</button>
          <span class="w-grip">⠿</span>
        </span>
      </div>
      <div class="w-body">
        <p class="kpi">3.1%</p>
        <p class="kpi-delta down">▼ 0.4pts</p>
      </div>
    </div>

    <div class="widget" data-id="tasks" draggable="true">
      <div class="w-head">
        <span class="w-title">Tasks</span>
        <span class="w-tools">
          <button class="w-size" title="Toggle width">⤢</button>
          <span class="w-grip">⠿</span>
        </span>
      </div>
      <div class="w-body">
        <ul class="task-list">
          <li><span class="dot d1"></span>Review Q3 report</li>
          <li><span class="dot d2"></span>Ship pricing page</li>
          <li><span class="dot d3"></span>Migrate legacy plans</li>
        </ul>
      </div>
    </div>
  </div>

  <button class="reset-btn" id="reset-btn">Reset layout</button>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; padding: 28px 20px; }

.dash { max-width: 620px; margin: 0 auto; }
.dash-head { display: flex; align-items: baseline; justify-content: space-between; gap: 14px; margin-bottom: 16px; flex-wrap: wrap; }
.dash-head h2 { color: #f1f5f9; font-size: 18px; }
.dash-hint { font-size: 11.5px; color: #64748b; }

/* — Grid — */
.grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }

.widget {
  background: #1e293b; border: 1px solid #334155;
  border-radius: 14px; overflow: hidden;
  transition: border-color 0.15s, opacity 0.2s, box-shadow 0.2s;
}
.widget.wide { grid-column: span 2; }

/* drag states */
.widget.dragging { opacity: 0.35; border-style: dashed; }
.widget.drop-target { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.25); }

.w-head {
  display: flex; align-items: center; justify-content: space-between;
  padding: 11px 14px; border-bottom: 1px solid #283548;
  cursor: grab; user-select: none;
}
.w-head:active { cursor: grabbing; }
.w-title { font-size: 12px; font-weight: 700; color: #cbd5e1; letter-spacing: 0.02em; }
.w-tools { display: flex; align-items: center; gap: 8px; }
.w-grip { color: #475569; font-size: 13px; }
.w-size {
  background: none; border: none; color: #475569; cursor: pointer;
  font-size: 13px; padding: 2px 4px; border-radius: 5px; font-family: inherit;
}
.w-size:hover { color: #a5b4fc; background: #273549; }

.w-body { padding: 14px; }
.kpi { font-size: 24px; font-weight: 800; color: #f8fafc; font-variant-numeric: tabular-nums; }
.kpi-delta { font-size: 11.5px; font-weight: 600; margin-top: 4px; }
.kpi-delta.up { color: #34d399; }
.kpi-delta.down { color: #f87171; }

.spark { width: 100%; height: 64px; display: block; }

.task-list { list-style: none; display: flex; flex-direction: column; gap: 9px; }
.task-list li { display: flex; align-items: center; gap: 9px; font-size: 12.5px; color: #94a3b8; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.d1 { background: #f59e0b; } .d2 { background: #34d399; } .d3 { background: #818cf8; }

.reset-btn {
  margin-top: 16px; background: none;
  border: 1px solid #334155; color: #64748b;
  border-radius: 8px; padding: 7px 14px;
  font-size: 12px; font-weight: 600; font-family: inherit; cursor: pointer;
  transition: all 0.15s;
}
.reset-btn:hover { border-color: #6366f1; color: #cbd5e1; }

@media (max-width: 440px) {
  .grid { grid-template-columns: 1fr; }
  .widget.wide { grid-column: auto; }
}`,

  js: `const grid = document.getElementById('grid');
const STORAGE_KEY = 'dash-layout';

/* ————— Drag to reorder (HTML5 drag & drop) ————— */
let dragged = null;

grid.addEventListener('dragstart', e => {
  const w = e.target.closest('.widget');
  if (!w) return;
  dragged = w;
  // Delay the class so the drag image is the *undimmed* widget.
  requestAnimationFrame(() => w.classList.add('dragging'));
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/plain', w.dataset.id); // Firefox requires data
});

grid.addEventListener('dragend', () => {
  if (dragged) dragged.classList.remove('dragging');
  dragged = null;
  clearTargets();
  save();
});

grid.addEventListener('dragover', e => {
  e.preventDefault(); // required to allow dropping
  const over = e.target.closest('.widget');
  if (!over || over === dragged) return;

  clearTargets();
  over.classList.add('drop-target');

  // Decide before/after from the pointer's position within the hovered
  // widget, then move the dragged node live — the grid reflows as preview.
  const r = over.getBoundingClientRect();
  const after = (e.clientX - r.left) / r.width > 0.5 || (e.clientY - r.top) / r.height > 0.75;
  if (after) over.after(dragged);
  else over.before(dragged);
});

grid.addEventListener('drop', e => e.preventDefault());

function clearTargets() {
  grid.querySelectorAll('.drop-target').forEach(el => el.classList.remove('drop-target'));
}

/* ————— Width toggle ————— */
grid.addEventListener('click', e => {
  const btn = e.target.closest('.w-size');
  if (!btn) return;
  btn.closest('.widget').classList.toggle('wide');
  save();
});

/* ————— Persistence ————— */
function save() {
  const layout = [...grid.children].map(w => ({
    id: w.dataset.id,
    wide: w.classList.contains('wide'),
  }));
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch (_) {}
}

function restore() {
  let layout = null;
  try { layout = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (_) {}
  if (!layout) return;
  layout.forEach(item => {
    const w = grid.querySelector('.widget[data-id="' + item.id + '"]');
    if (!w) return;                    // widget removed since save
    grid.appendChild(w);               // append in saved order
    w.classList.toggle('wide', item.wide);
  });
}
restore();

document.getElementById('reset-btn').addEventListener('click', () => {
  try { localStorage.removeItem(STORAGE_KEY); } catch (_) {}
  location.reload();
});`,

  seo: {
    title: 'Dashboard Widget Grid — Drag & Drop HTML CSS JS',
    description: 'Rearrangeable dashboard: drag widgets to reorder with live grid reflow, toggle widths, persist layout to localStorage. React, Vue & Tailwind exports.',
    about: {
      title: 'Dashboard Widget Grid — HTML5 Drag & Drop Reordering, Live Reflow Preview, Span Toggling & localStorage Layout Persistence',
      description: `"Let users arrange their own dashboard" is one of the most-requested SaaS features and one of the most over-engineered — teams reach for gridster clones and 40KB drag libraries when the core interaction fits in ~60 lines of vanilla JavaScript over CSS Grid. This snippet is a working customisable dashboard: five widgets (KPI cards, an SVG sparkline, a task list) in a two-column grid that users reorder by dragging, resize between single and double width, and whose layout survives reload via localStorage — with the drag preview done the honest way, by live-reflowing the real grid.

**Reordering with the native drag & drop API**

Widgets carry \`draggable="true"\`, and all five drag events are handled by *delegation on the grid* — no per-widget listeners, so widgets added later just work. The mechanics tour the API's quirks, each handled and commented: \`dragstart\` stores the dragged node and applies the dimming class inside \`requestAnimationFrame\` (applied synchronously, the browser would capture the *dimmed* widget as the drag image — the classic gotcha); it also calls \`setData()\`, without which Firefox refuses to start the drag at all. \`dragover\` must call \`preventDefault()\` to declare the grid a valid drop zone — the API's most notorious trap, since omitting it silently makes drops impossible.

**The live-reflow preview**

Instead of painting insertion lines or ghost placeholders, \`dragover\` computes whether the pointer sits in the leading or trailing portion of the hovered widget and immediately moves the dragged node there with \`before()\`/\`after()\`. Because the container is CSS Grid, the whole dashboard *reflows in real time* — the user watches the actual final layout at every instant of the drag, wide widgets pushing rows around exactly as they will on drop. This is both simpler than placeholder systems (no synthetic elements to manage) and more truthful (the preview cannot differ from the result, because it *is* the result). Drop and dragend then only need to clean up classes and persist. The hovered widget gets a ring via \`.drop-target\`, and the dragged one dims to 35% with a dashed border.

**Span toggling and the responsive fallback**

Each widget header carries a ⤢ button toggling the \`.wide\` class — \`grid-column: span 2\` — turning a KPI card into a full-row panel; CSS Grid absorbs the change and re-wraps neighbours automatically, no position math anywhere. The demo ships the sparkline widget wide by default to show mixed spans reordering correctly. Below 440px the grid collapses to one column and neutralises spans (\`grid-column: auto\`), because dragging 2-across layouts on a phone-width screen is noise; production dashboards typically also disable dragging there.

**Persistence as an ordered id list**

The layout serialises to the minimal truthful form: an ordered array of \`{ id, wide }\` mapped from \`grid.children\`. \`restore()\` replays it by \`appendChild\`-ing each found widget in saved order — appending an existing node *moves* it, so restoration is a no-copy reorder — and silently skips ids that no longer exist, which is exactly the forward-compatibility you need when widgets ship and retire across releases. Saving happens at the two mutation points (dragend, span toggle), and a reset button clears the key. Swapping \`localStorage\` for a \`PATCH /me/dashboard\` call turns this into per-user server-side layout with no other changes — the serialised shape is already the API payload.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Rearrange the dashboard',
          text: 'Grab any widget by its header and drag over the grid: the dragged card dims, the hovered card shows an indigo ring, and the layout reflows live so you always see the true final arrangement — including how the wide Traffic panel pushes rows. Release to drop. Click ⤢ on any widget to toggle it between single and double width. Reload the page: your arrangement is back. Reset layout restores the default.',
        },
        {
          title: 'Add your own widgets',
          text: 'A widget is one markup block: .widget with a unique data-id and draggable="true", a .w-head (title + ⤢ + grip glyph), and a .w-body with anything inside — chart, table, feed. Because all drag handling is delegated to the grid, new widgets need zero JS registration. Give charts intrinsic height (like the sparkline\'s fixed 64px) so rows stay stable during reflow.',
        },
        {
          title: 'Persist server-side instead of locally',
          text: 'Replace the localStorage lines in save()/restore() with your API: save() POSTs the [{ id, wide }] array to /me/dashboard (debounce it ~500ms if users fiddle a lot); restore() awaits the GET before replaying. Keep the skip-unknown-ids behaviour — it is what lets you remove a widget type in a release without corrupting saved layouts — and treat absent ids in the saved list as "new widgets append at the end", which restore() already does implicitly.',
        },
        {
          title: 'Restrict the drag handle',
          text: 'Currently the whole widget is draggable (headers styled as the grab affordance). To make ONLY the header start drags — so text inside widget bodies stays selectable — set draggable="true" on .w-head instead of .widget, and in dragstart use e.target.closest(".widget") exactly as now to resolve the card. This is the right call for widgets containing tables or copyable content.',
        },
        {
          title: 'Extend to more sizes or columns',
          text: 'For a 3- or 4-column dashboard, change grid-template-columns and let .wide span 2 of them; add a .tall class with grid-row: span 2 and a second toggle for two-axis sizing — CSS Grid\'s auto-placement handles the packing (add grid-auto-flow: dense if you want holes backfilled, with the caveat that dense placement can visually reorder against DOM order). The persistence array extends naturally with a tall flag.',
        },
        {
          title: 'Export and compose',
          text: 'Click JSX for React — hold the layout array in state, render widgets from it with a stable key, and on drop splice the array instead of moving DOM nodes (see the FAQ for why). Fill the widgets from this library: [Metric Card Grid](/ui-snippets/metric-card-grid) KPIs, [Sparkline Chart](/ui-snippets/sparkline-chart), [Activity Feed](/ui-snippets/activity-feed), [Donut Chart](/ui-snippets/donut-chart) — and pair with the [Dashboard Layout](/ui-snippets/dashboard-layout) shell and [Container Query Card](/ui-snippets/container-query-card) so widgets restyle themselves when spans change.',
        },
      ],
    },
    features: [
      'Native HTML5 drag & drop — no library; all five drag events delegated to the grid container',
      'Live-reflow preview: the dragged node moves in real time, so the preview IS the final layout',
      'Leading/trailing drop resolution from pointer position within the hovered widget',
      'The three API gotchas handled and commented: rAF-delayed drag class, Firefox setData, dragover preventDefault',
      'Per-widget width toggle (span 2) with CSS Grid absorbing every re-wrap — zero position math',
      'Layout persisted as an ordered { id, wide } array; restore skips retired widgets gracefully',
      'Mixed widget bodies out of the box: KPI cards with deltas, filled SVG sparkline, task list',
      'Single-column mobile fallback that neutralises spans below 440px, plus a reset-layout button',
    ],
    useCases: [
      {
        icon: 'CHART',
        title: 'Customisable SaaS dashboards and admin homes',
        desc: 'The direct use: let each user compose their own overview from your widget catalogue. The ordered-id persistence shape is already the API payload for per-user server storage, the skip-unknown-ids restore gives you forward compatibility as widgets ship and retire, and the delegated drag handling means a widget picker ("Add widget" appending new cards) needs no drag wiring. Fill bodies from the charts family — [Line Chart Widget](/ui-snippets/line-chart-widget), [Gauge Chart](/ui-snippets/gauge-chart), [Stat Comparison Card](/ui-snippets/stat-comparison-card).',
      },
      {
        icon: 'FLOW',
        title: 'Internal tools and ops consoles ranked by attention',
        desc: 'On-call dashboards and ops consoles benefit most from user arrangement: the metric that matters this week drags to the top-left, the noisy one shrinks to single width. Because layouts persist per browser via localStorage with zero backend, this pattern ships to internal tools in an afternoon — and the honest live-reflow preview matters here, since operators arranging alert panels need certainty about where things land, not approximate insertion lines.',
      },
      {
        icon: 'LEARN',
        title: 'Learning HTML5 drag & drop properly',
        desc: 'The native DnD API is powerful and notoriously quirky, and this snippet is a working tour of exactly the quirks that burn people: why the drag image captures before your dragstart styling (hence the rAF delay), why Firefox needs setData to start a drag at all, and why dragover\'s preventDefault is mandatory for drops. Compare with the pointer-events approach in [Drag Sort List](/ui-snippets/drag-sort-list) and [Image Reorder Grid](/ui-snippets/image-reorder-grid) to understand when each API is the right tool — native DnD for discrete slots, pointer events for free positioning.',
      },
      {
        icon: 'APP',
        title: 'Widget-based portals: intranets, student dashboards, trading views',
        desc: 'Portals aggregating heterogeneous content — company news, calendar, quick links, market tickers — are the original home of widget grids. The mixed-body demo (numbers, chart, list) shows the container is content-agnostic; the ⤢ span toggle covers the "my calendar deserves half the row" request that portals always get. For role-based defaults, ship per-role layout arrays as the fallback when no saved layout exists — restore() slots that in as a one-line change.',
      },
      {
        icon: 'DESIGN',
        title: 'The live-reflow pattern for any sortable grid',
        desc: 'The core trick — move the real node during dragover and let CSS Grid reflow as the preview — transfers to any discrete-slot sorting: kanban columns, photo albums, pricing-tier builders, form-builder canvases. It eliminates the entire placeholder-element subsystem that most sortable implementations maintain, and it cannot desync from the drop result. The leading/trailing pointer-position test is the one piece to adapt per geometry (pure-horizontal for lists, the blended x/y test here for grids).',
      },
      {
        icon: 'CODE',
        title: 'Prototyping ahead of a grid-library decision',
        desc: 'Teams evaluating gridstack/react-grid-layout can ship this first and learn what users actually rearrange before paying the library\'s complexity tax. It covers the 80%: reorder, two widths, persistence, responsive collapse. The honest boundary: free 2D placement with holes, drag-to-resize by pixels, and collision pushing are where the libraries earn their weight — the how-to\'s grid-auto-flow: dense note marks the exact edge of what auto-placement gives you for free.',
      },
      { icon: 'CODE', title: 'Related: Geolocation Accuracy Indicator', desc: 'See the [Geolocation Accuracy Indicator](/ui-snippets/geolocation-accuracy-map/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why does the dragging class go on inside requestAnimationFrame, and why the setData call?',
        a: 'Both are API-order quirks. When a drag starts, the browser synchronously snapshots the element to use as the ghost image that follows the cursor — and it takes that snapshot after your dragstart handler runs. Apply opacity: 0.35 synchronously and the ghost itself is captured dimmed and dashed, which looks broken; deferring the class one frame with requestAnimationFrame lets the browser capture the pristine widget while the in-grid original still dims immediately after. setData exists because Firefox implements the spec strictly: a drag with an empty data store is considered vacuous and never starts (Chrome is lenient). Setting any payload — the widget id is the natural choice — makes the drag universal, and the id payload is also what you would read in a cross-container drop (dragging a widget from a catalogue panel into the grid).',
      },
      {
        q: 'Why move the actual node during dragover instead of showing a placeholder or insertion line?',
        a: 'Because in a grid with mixed spans, only the real layout engine can tell the truth. An insertion line says "it will go between these two" — but with a 2-column grid containing span-2 widgets, inserting one card can re-wrap every subsequent row, and a line cannot communicate that cascade; users drop, the layout jumps to something the line never showed, and the interaction feels lying. Moving the dragged node live makes CSS Grid itself render the preview: what you see mid-drag is by construction identical to the drop result, wide-widget cascades included. The costs are real but small: DOM mutation on every dragover crossing (throttled naturally by the over-a-new-widget check), and the node moving means dragend must not assume original position — which this code never does. The alternative placeholder approach earns its complexity only when the dragged item must stay visually in place while a ghost travels, as in cross-window drags.',
      },
      {
        q: 'How does the persistence survive widgets being added or removed in future releases?',
        a: 'By storing intent, not geometry, and restoring defensively. The saved layout is just an ordered list of widget ids with a wide flag — no coordinates, no indexes into anything. restore() walks that list and, for each id, moves the matching live widget into position via appendChild (which relocates rather than clones) — and simply skips ids with no matching element, so a widget you removed in v2 disappears from saved layouts harmlessly instead of corrupting them. New widgets added since the save were never in the list, so they are never moved: they retain their DOM order and end up after the restored ones — a sensible "new things appear at the end" default. The one upgrade worth adding for server-side persistence is a schema version field alongside the array, so a future layout format (say, adding a tall flag or multi-column coordinates) can migrate old payloads explicitly rather than by inference.',
      },
      {
        q: 'How would this work in React or Angular, and can Tailwind handle the styling?',
        a: 'In React, do not port the DOM-moving approach literally — React owns the DOM, and nodes you relocate behind its back get clobbered on the next render. Instead, invert it: hold layout as state ([{ id, wide }]), render widgets by mapping with key={id}, and translate the drag handlers to state updates — dragover computes the target index exactly as here (closest widget + leading/trailing test) but calls a reorder(draggedId, targetIndex) that splices the array, letting React re-render the new order; because keys are stable, React moves the same DOM nodes and the live-reflow preview behaves identically. Persistence becomes a useEffect on the layout state. Angular mirrors this with a signal array and @for (track widget.id), or you can adopt the CDK\'s DragDropModule which implements the placeholder pattern natively. Tailwind styling maps directly: the grid is grid grid-cols-2 gap-3.5 max-[440px]:grid-cols-1; widgets are bg-slate-800 border border-slate-700 rounded-xl overflow-hidden with data-[dragging]:opacity-35 data-[dragging]:border-dashed and data-[target]:border-indigo-500 data-[target]:ring-[3px] data-[target]:ring-indigo-500/25 variants; wide is col-span-2 max-[440px]:col-auto.',
      },
    ],
    aiPrompt: {
      paragraph: `The most useful thing an AI assistant can do with this snippet is stress your mental model of native drag & drop: paste it into Claude and ask what breaks if you remove the requestAnimationFrame around the dragging class, the setData call, and the dragover preventDefault — three one-line deletions with three different failure modes, and predicting them before asking is a genuine test of understanding. For product work, the requests that pay off: convert the DOM-moving handlers into the state-splicing React version with stable keys (ask it to explain why the literal port corrupts React's reconciliation — the answer generalises to all DOM-mutating vanilla patterns); add a widget catalogue drawer whose items drag INTO the grid using the setData id payload that is already there; and swap localStorage for a debounced PATCH with a schema version field. If your dashboard needs true 2D placement with resize handles and collision pushing, ask the assistant for an honest feature-by-feature comparison of extending this versus adopting gridstack or react-grid-layout — knowing where the 60-line version's edge is beats discovering it in production.`,
      prompt: `Build a customisable dashboard widget grid in plain HTML, CSS, and JavaScript — drag to reorder with a live grid-reflow preview, width toggling, and persisted layout. Native HTML5 drag & drop only, no libraries.

Requirements:
- A two-column CSS Grid of five widgets, each with a unique data-id, draggable="true", a header row (title, a ⤢ width-toggle button, a grip glyph, grab/grabbing cursors), and varied bodies: two KPI cards with tabular-nums figures and coloured delta lines, one default-wide panel containing an SVG sparkline with a filled area, one more KPI, and a task list with coloured status dots.
- Handle ALL drag events by delegation on the grid container so future widgets need zero registration, and handle the API's three classic gotchas with comments: apply the dragged-dimming class inside requestAnimationFrame so the browser's drag ghost captures the undimmed widget; call dataTransfer.setData in dragstart because Firefox refuses to start drags with an empty data store; and call preventDefault in dragover because drops are silently impossible without it.
- Implement the live-reflow preview: in dragover, resolve the hovered widget, decide leading/trailing from the pointer's fractional position within it, and immediately move the dragged node there with before()/after() so CSS Grid re-renders the true final layout — including span-2 cascade effects — at every instant; style the dragged widget at reduced opacity with a dashed border and give the hovered widget an accent ring.
- The ⤢ button toggles a .wide class (grid-column: span 2) via one delegated click handler; a media query below 440px collapses to one column and neutralises spans.
- Persist on dragend and on width toggle as an ordered array of { id, wide } in localStorage; restore on load by appendChild-ing matched widgets in saved order (moving, not cloning), silently skipping ids that no longer exist; include a "Reset layout" button that clears the key and reloads.
- Comment where a server PATCH would replace localStorage and why the ordered-id shape (intent, not geometry) is what makes saved layouts survive widgets being added or removed across releases.`,
    },
  },
};

export default dashboardWidgetGrid;
