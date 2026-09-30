const tableColumnResize = {
  id: 'table-column-resize',
  title: 'Resizable Table Columns',
  lastmod: '2026-08-15',
  category: 'tables',
  html: `<div class="rc-wrap">
  <div class="rc-head">
    <h3>Deployments</h3>
    <button class="rc-reset" id="rcReset">Reset widths</button>
  </div>

  <div class="rc-scroll">
    <table class="rc-table" id="rcTable">
      <colgroup>
        <col style="width:220px"><col style="width:130px"><col style="width:160px">
        <col style="width:120px"><col style="width:150px">
      </colgroup>
      <thead>
        <tr>
          <th>Service<span class="rc-grip" data-col="0"></span></th>
          <th>Environment<span class="rc-grip" data-col="1"></span></th>
          <th>Commit<span class="rc-grip" data-col="2"></span></th>
          <th>Status<span class="rc-grip" data-col="3"></span></th>
          <th>Deployed</th>
        </tr>
      </thead>
      <tbody>
        <tr><td>checkout-api</td><td>production</td><td><code>a91f3c2</code></td><td><span class="rc-pill ok">passed</span></td><td>2 min ago</td></tr>
        <tr><td>identity-service</td><td>production</td><td><code>7d40be1</code></td><td><span class="rc-pill ok">passed</span></td><td>18 min ago</td></tr>
        <tr><td>web-storefront</td><td>staging</td><td><code>c02aa5e</code></td><td><span class="rc-pill run">running</span></td><td>21 min ago</td></tr>
        <tr><td>notification-worker</td><td>staging</td><td><code>3fe8810</code></td><td><span class="rc-pill bad">failed</span></td><td>1 hr ago</td></tr>
        <tr><td>search-indexer</td><td>production</td><td><code>bb17d94</code></td><td><span class="rc-pill ok">passed</span></td><td>3 hr ago</td></tr>
        <tr><td>media-transcoder</td><td>development</td><td><code>5a6c0f7</code></td><td><span class="rc-pill ok">passed</span></td><td>5 hr ago</td></tr>
      </tbody>
    </table>
  </div>

  <p class="rc-note" id="rcNote">Drag the divider between any two headers. Double-click a divider to auto-fit that column.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#0f172a;padding:26px 16px;color:#e2e8f0}

.rc-wrap{max-width:840px;margin:0 auto;background:#1e293b;border:1px solid #334155;border-radius:14px;overflow:hidden}
.rc-head{display:flex;align-items:center;justify-content:space-between;padding:15px 18px;border-bottom:1px solid #334155}
.rc-head h3{font-size:15px;font-weight:700}
.rc-reset{background:#334155;color:#cbd5e1;border:none;border-radius:7px;padding:7px 12px;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit}
.rc-reset:hover{background:#475569}

.rc-scroll{overflow-x:auto}
.rc-table{border-collapse:collapse;table-layout:fixed;min-width:100%}

.rc-table th{
  position:relative;text-align:left;padding:11px 14px;font-size:11px;font-weight:700;
  letter-spacing:.06em;text-transform:uppercase;color:#94a3b8;background:#172033;
  border-bottom:1px solid #334155;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  -webkit-user-select:none;user-select:none;
}
.rc-table td{
  padding:11px 14px;font-size:13px;color:#cbd5e1;border-bottom:1px solid #263449;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
.rc-table tbody tr:last-child td{border-bottom:none}
.rc-table tbody tr:hover td{background:#22304a}
.rc-table code{font-family:ui-monospace,Menlo,Consolas,monospace;font-size:12px;color:#a5b4fc}

/* The grip is a wide invisible hit area with a thin visible line inside it. */
.rc-grip{
  position:absolute;top:0;right:-5px;width:11px;height:100%;
  cursor:col-resize;z-index:2;touch-action:none;
}
.rc-grip::after{
  content:'';position:absolute;left:5px;top:22%;width:1px;height:56%;
  background:#475569;transition:background .15s,height .15s;
}
.rc-grip:hover::after,.rc-grip.on::after{background:#6366f1;height:100%;top:0;width:2px;left:4px}

.rc-wrap.sizing{cursor:col-resize}
.rc-wrap.sizing .rc-table tbody tr:hover td{background:transparent}

.rc-pill{display:inline-block;padding:3px 9px;border-radius:999px;font-size:11px;font-weight:700}
.rc-pill.ok{background:rgba(16,185,129,.16);color:#34d399}
.rc-pill.run{background:rgba(99,102,241,.18);color:#a5b4fc}
.rc-pill.bad{background:rgba(244,63,94,.16);color:#fb7185}

.rc-note{padding:12px 18px;font-size:12px;color:#64748b;border-top:1px solid #334155}
.rc-note.live{color:#a5b4fc}`,

  js: `var MIN_W = 70;          // never let a column collapse past this
var table = document.getElementById('rcTable');
var wrap = document.querySelector('.rc-wrap');
var note = document.getElementById('rcNote');
var cols = table.querySelectorAll('colgroup col');

var DEFAULTS = Array.prototype.map.call(cols, function (c) { return parseInt(c.style.width, 10); });

var drag = null;   // { index, startX, startW }

function setWidth(i, px) {
  cols[i].style.width = Math.max(MIN_W, Math.round(px)) + 'px';
}

function say(msg, live) {
  note.textContent = msg;
  note.classList.toggle('live', !!live);
}

// Measure the widest cell in a column by cloning its text into a hidden span.
// Reading scrollWidth directly is unreliable once text-overflow has clipped it.
function autoFit(index) {
  var probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit';
  document.body.appendChild(probe);

  var widest = 0;
  var rows = table.querySelectorAll('tr');
  Array.prototype.forEach.call(rows, function (row) {
    var cell = row.children[index];
    if (!cell) return;
    probe.style.font = window.getComputedStyle(cell).font;
    probe.textContent = cell.textContent.trim();
    widest = Math.max(widest, probe.offsetWidth);
  });

  document.body.removeChild(probe);
  setWidth(index, widest + 30);   // padding on both sides plus a little slack
  say('Column ' + (index + 1) + ' auto-fitted to ' + cols[index].style.width + '.', true);
}

function onDown(e) {
  var grip = e.target.closest('.rc-grip');
  if (!grip) return;
  e.preventDefault();

  var index = Number(grip.dataset.col);
  drag = {
    index: index,
    startX: e.clientX,
    startW: table.querySelectorAll('th')[index].offsetWidth,
    grip: grip,
  };

  grip.classList.add('on');
  wrap.classList.add('sizing');
  grip.setPointerCapture(e.pointerId);
}

function onMove(e) {
  if (!drag) return;
  var next = drag.startW + (e.clientX - drag.startX);
  setWidth(drag.index, next);
  say('Column ' + (drag.index + 1) + ': ' + cols[drag.index].style.width, true);
}

function onUp() {
  if (!drag) return;
  drag.grip.classList.remove('on');
  wrap.classList.remove('sizing');
  drag = null;
}

table.addEventListener('pointerdown', onDown);
table.addEventListener('pointermove', onMove);
table.addEventListener('pointerup', onUp);
table.addEventListener('pointercancel', onUp);

table.addEventListener('dblclick', function (e) {
  var grip = e.target.closest('.rc-grip');
  if (grip) autoFit(Number(grip.dataset.col));
});

document.getElementById('rcReset').addEventListener('click', function () {
  DEFAULTS.forEach(function (w, i) { cols[i].style.width = w + 'px'; });
  say('Widths reset to their defaults.', false);
});`,

  seo: {
    title: 'Resizable Table Columns — Free HTML CSS JS Snippet',
    description: 'Drag-to-resize table columns with a colgroup, pointer capture and double-click auto-fit. No library, works with mouse, touch and stylus.',
    about: {
      title: 'Resizable Table Columns — colgroup Sizing, Pointer Capture Dragging & Double-Click Auto-Fit',
      description: `Column resizing is the feature that makes people reach for a data-grid library, and it is roughly sixty lines of vanilla JavaScript once you know which element to actually resize. This snippet implements the full interaction — drag handles between headers, a minimum width floor, live feedback during the drag, double-click auto-fit, and a reset — with no dependencies and no re-render of the table body.

**Resizing the colgroup, not the cells**

The naive approach sets a width on the \`<th>\` and hopes the body cells follow. They often do not, because without a fixed layout algorithm the browser is free to redistribute space based on content. This snippet uses \`table-layout: fixed\` together with a \`<colgroup>\` of \`<col>\` elements, and resizing writes to \`col.style.width\`. That single write re-lays the entire column — header and every body cell — in one operation, because \`<col>\` exists precisely to carry column-level presentation. It is also the cheapest possible update: one style change rather than one per row.

**Pointer events and setPointerCapture**

The drag uses pointer events rather than mouse events, so one code path serves a mouse, a finger and a stylus. \`setPointerCapture()\` on the grip is what makes the drag survive leaving the element — without it, moving the cursor faster than the browser repaints drops the pointer outside the 11px handle and the resize stops mid-gesture. Capture redirects every subsequent move to the original element until release, which is the correct primitive for any drag and a far better fit than attaching temporary listeners to \`document\`.

**A hit area wider than the line it draws**

The visible divider is a 1px line, and a 1px drag target would be unusable. The \`.rc-grip\` element is 11 pixels wide and positioned to straddle the column boundary, with the thin line drawn by a pseudo-element inside it. The handle grows and turns indigo on hover so the affordance is obvious before the user commits. \`touch-action: none\` on the grip stops the browser interpreting the drag as a scroll gesture on touch devices, which is the single most common reason a drag interaction "works on desktop but not on mobile".

**Auto-fit measured properly**

Double-clicking a divider fits the column to its widest cell. Doing this by reading \`scrollWidth\` fails once \`text-overflow: ellipsis\` has clipped the content, because the clipped element reports the clipped size. Instead the snippet creates one hidden probe span, copies each cell's computed font onto it, writes the cell text, and reads \`offsetWidth\` — an accurate measurement of the untruncated string. The probe is created once per auto-fit and removed immediately, so no layout thrash is left behind.

**Feedback and escape hatches**

The note line under the table reports the live pixel width during a drag and the result after an auto-fit, so the interaction is legible rather than guessy. A minimum width constant prevents a column being dragged to nothing and becoming unrecoverable, and the Reset button restores the original widths captured on load, which is the safety net that makes users willing to experiment with the feature at all.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover between two column headers', text: 'An 11-pixel-wide invisible grip straddles each column boundary. On hover the thin divider thickens and turns indigo, and the cursor changes to col-resize so the affordance is clear before you press.' },
        { title: 'Drag left or right to resize', text: 'Press and drag to set the column width live. The note under the table shows the current pixel width as you move, and a minimum of 70px stops the column collapsing to nothing.' },
        { title: 'Release anywhere on the page', text: 'Because the grip captures the pointer, the drag keeps tracking even if your cursor leaves the table or the window entirely — releasing anywhere ends the gesture cleanly.' },
        { title: 'Double-click a divider to auto-fit', text: 'The column resizes to fit its widest cell, measured with a hidden probe element that reports the true untruncated text width rather than the clipped one.' },
        { title: 'Use it with touch or a stylus', text: 'Pointer events plus touch-action: none mean the same drag works with a finger on a phone without the browser hijacking the gesture as a page scroll.' },
        { title: 'Reset when you have made a mess', text: 'The Reset widths button restores the original column widths captured from the colgroup on load, so experimenting with the layout is always reversible.' },
      ],
    },
    features: [
      'Resizes via colgroup <col> widths with table-layout: fixed, so one write re-lays the whole column',
      'Pointer events with setPointerCapture so drags survive leaving the handle or the window',
      'Wide invisible grip around a thin visible divider, with a clear hover affordance',
      'touch-action: none so the drag is not stolen by the browser as a scroll on touch devices',
      'Double-click auto-fit measured with a hidden probe span, accurate even when cells are ellipsised',
      'Minimum width floor so a column can never be dragged into an unrecoverable state',
      'Live pixel-width readout during the drag and a summary after auto-fit',
      'Reset button restoring the widths captured on load, with no library or virtual DOM involved',
    ],
    useCases: [
      { icon: 'DASH', title: 'Admin panels and internal data tables', desc: 'Any table where different users care about different columns benefits from letting each of them size it. Pair it with a [sortable table](/ui-snippets/sortable-table/) so column width and sort order are both under the reader\'s control.' },
      { icon: 'CODE', title: 'Replacing a data-grid dependency for a simple table', desc: 'Teams frequently add a full grid library for resizing alone, shipping hundreds of kilobytes and a new rendering model. If resizing is the only missing feature, this is the whole implementation in one file.' },
      { icon: 'FLOW', title: 'Log and audit views with unpredictable content widths', desc: 'Columns holding commit hashes, URLs or stack frames vary wildly in width between rows. Double-click auto-fit gives users a one-action way to reveal a truncated column without hunting for a horizontal scrollbar.' },
      { icon: 'LEARN', title: 'Reference for correct drag implementation', desc: 'The setPointerCapture and touch-action combination here is the pattern every drag interaction needs — sliders, splitters, reorderable lists — and it is much easier to see in a small component than inside a library.' },
      { icon: 'APP', title: 'Reporting and analytics exports', desc: 'When users size columns before printing or exporting a view, the widths they choose are the widths they expect in the output. Reading them back from the colgroup gives you an exact, already-validated set of numbers.' },
      { icon: 'DESIGN', title: 'Design-system table component groundwork', desc: 'Because resizing is isolated to a colgroup and a pointer handler, it layers onto an existing table component without touching cell markup, making it a safe addition to a shared table in a design system.' },
      { icon: 'CODE', title: 'Related: Table Loading / Empty / Error States', desc: 'See the [Table Loading / Empty / Error States](/ui-snippets/table-loading-empty-error-states/) for a related tables pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why resize the colgroup instead of the th element?', a: 'A <col> element carries column-level presentation, so writing one width there re-lays the header and every body cell in a single operation. Setting widths on a th relies on the browser propagating that down, which is unreliable unless table-layout: fixed is set — and once it is set, the colgroup is both the clearer and the cheaper place to write.' },
      { q: 'Why does the drag keep working when my cursor leaves the table?', a: 'The grip calls setPointerCapture() on pointerdown, which redirects all subsequent pointer events to that element until release. Without it, a fast drag outruns the 11px handle, the pointer lands on a different element, and the resize stops mid-gesture — the most common bug in hand-rolled resizers.' },
      { q: 'Does this work on touch screens?', a: 'Yes. Pointer events cover mouse, touch and stylus with one code path, and the grip sets touch-action: none so the browser does not claim the gesture as a page scroll before your handler ever sees it. On touch, the wider hit area also matters much more than it does with a mouse.' },
      { q: 'Why not use scrollWidth for the auto-fit measurement?', a: 'Because these cells use text-overflow: ellipsis, a clipped cell reports its clipped width rather than the width its full text would need. The snippet instead measures with a hidden probe span that copies the cell font and text, giving the true untruncated width, then adds padding and a little slack.' },
      { q: 'How do I persist the widths a user chooses?', a: 'Read the colgroup after a drag ends — Array.from(cols).map(c => c.style.width) — and store that array in localStorage or on the user record. On load, apply it back before the first paint. The DEFAULTS array in the snippet already models capturing widths once, so persistence is the same idea with a different storage target.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep a ref to the table, render the colgroup from an array of widths held in state, and have the pointer handlers write to the col elements directly during the drag — committing to state only on pointerup. Writing state on every pointermove would re-render the whole table sixty times a second to change one number the DOM is already showing.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to add width persistence to localStorage plus a keyboard-accessible resize mode, where a focused header responds to Arrow Left/Right with a 16px step and Shift+Arrow with a 1px step — that closes the accessibility gap a pointer-only resizer leaves. Other natural extensions: constrain the total table width so widening one column narrows its neighbour rather than growing the table; add column reordering by dragging the header itself while the grip keeps handling resize; store widths as flexible fractions rather than pixels so the layout survives a viewport change; or add a "fit all columns" button that runs the auto-fit measurement across every column in one pass.`,
      prompt: `Build a data table with drag-to-resize columns in plain HTML, CSS, and JavaScript — no frameworks or libraries.

Requirements:
- Use table-layout: fixed with a <colgroup> of <col> elements, and perform all resizing by writing to col.style.width so the header and every body cell re-lay in a single operation.
- Put a resize grip in each header except the last: an absolutely positioned element roughly 11px wide straddling the column boundary, with a thin 1px divider drawn by a pseudo-element inside it. The grip must show a col-resize cursor and a clear hover state.
- Implement the drag with pointer events (pointerdown/pointermove/pointerup) and call setPointerCapture() on the grip so the drag continues correctly when the pointer leaves the handle or the window. Set touch-action: none on the grip so touch drags are not consumed as page scrolls.
- Enforce a minimum column width so a column can never be collapsed to an unrecoverable size.
- On double-click of a grip, auto-fit that column to its widest cell. Measure with a hidden probe span that copies each cell's computed font and text content and reads offsetWidth — do not use scrollWidth, since cells use text-overflow: ellipsis and would report clipped widths.
- Show live feedback: a status line reporting the column's pixel width while dragging and the result after an auto-fit.
- Capture the initial widths on load and provide a Reset button that restores them.
- Style it as a dark admin table with uppercase header labels, hover row highlighting, and status pills, and keep the table horizontally scrollable in a wrapper so widened columns do not break the page layout.`,
    },
  },
};

export default tableColumnResize;
