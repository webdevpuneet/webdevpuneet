const dragResizePanels = {
  id: 'drag-resize-panels',
  title: 'Drag-to-Resize Split Panels',
  category: 'layouts',
  description: 'Free drag-to-resize split panel HTML CSS JavaScript snippet. Pointer-driven divider clamps panel widths between minimums, updates a live percentage readout, and supports double-click to reset to 50/50.',
  html: `<div class="demo">
  <div class="split">
    <div class="pane left">
      <span class="pane-label">Editor</span>
      <span class="pane-pct">50%</span>
    </div>
    <div class="divider" role="separator" aria-orientation="vertical" tabindex="0">
      <span class="grip"></span>
    </div>
    <div class="pane right">
      <span class="pane-label">Preview</span>
      <span class="pane-pct">50%</span>
    </div>
  </div>
  <p class="hint">Drag the divider to resize · double-click it to reset to 50 / 50</p>
</div>`,
  css: `.demo {
  font-family: 'Segoe UI', system-ui, sans-serif;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px;
  background: #f1f5f9;
}
.split {
  display: flex;
  height: 220px;
  border-radius: 14px;
  overflow: hidden;
  border: 1px solid #e2e8f0;
  background: #fff;
  user-select: none;
}
.pane {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  flex-shrink: 0;
}
.pane.left {
  width: 50%;
  background: #eef2ff;
}
.pane.right {
  flex: 1;
  background: #ecfeff;
}
.pane-label {
  font-size: 14px;
  font-weight: 700;
  color: #1e293b;
}
.pane-pct {
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: #64748b;
  background: rgba(255,255,255,0.7);
  padding: 2px 10px;
  border-radius: 999px;
}
.divider {
  width: 14px;
  flex-shrink: 0;
  background: #f8fafc;
  border-left: 1px solid #e2e8f0;
  border-right: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: col-resize;
  touch-action: none;
}
.divider:hover, .divider:focus-visible { background: #e0e7ff; outline: none; }
.divider.dragging { background: #c7d2fe; }
.grip {
  width: 4px;
  height: 36px;
  border-radius: 999px;
  background: #cbd5e1;
}
.divider:hover .grip, .divider.dragging .grip { background: #6366f1; }
.hint {
  margin: 0;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
}`,
  js: `const split = document.querySelector('.split');
const divider = document.querySelector('.divider');
const left = document.querySelector('.pane.left');
const leftPct = left.querySelector('.pane-pct');
const rightPct = document.querySelector('.pane.right .pane-pct');

const MIN_PCT = 18;
let dragging = false;

function setSplit(pct) {
  const clamped = Math.min(100 - MIN_PCT, Math.max(MIN_PCT, pct));
  left.style.width = clamped + '%';
  leftPct.textContent = Math.round(clamped) + '%';
  rightPct.textContent = Math.round(100 - clamped) + '%';
}

function pointerX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}

function onMove(e) {
  if (!dragging) return;
  const rect = split.getBoundingClientRect();
  const pct = ((pointerX(e) - rect.left) / rect.width) * 100;
  setSplit(pct);
}

function startDrag(e) {
  dragging = true;
  divider.classList.add('dragging');
  e.preventDefault();
}
function endDrag() {
  dragging = false;
  divider.classList.remove('dragging');
}

divider.addEventListener('mousedown', startDrag);
divider.addEventListener('touchstart', startDrag, { passive: false });
window.addEventListener('mousemove', onMove);
window.addEventListener('touchmove', onMove, { passive: false });
window.addEventListener('mouseup', endDrag);
window.addEventListener('touchend', endDrag);

divider.addEventListener('dblclick', () => setSplit(50));
divider.addEventListener('keydown', (e) => {
  const current = parseFloat(left.style.width) || 50;
  if (e.key === 'ArrowLeft') setSplit(current - 4);
  if (e.key === 'ArrowRight') setSplit(current + 4);
});

setSplit(50);`,
  seo: {
    title: 'Drag-to-Resize Panels — Free HTML CSS JS Snippet',
    description: 'Split panels with a pointer-driven divider, clamped widths, keyboard resize and double-click reset. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'How these drag-to-resize split panels were built — a percentage-based width model and a unified pointer/keyboard interaction',
      description: `This snippet recreates the resizable split view found in code editors, email clients, and admin dashboards — drag a vertical divider between two panes and their widths adjust live, with a percentage readout, sensible minimum-width clamping, double-click-to-reset, and full keyboard support. It's built with flexbox, one CSS class toggle, and roughly 50 lines of vanilla JavaScript.

**A single percentage drives the entire layout**

Rather than tracking pixel widths (which would need recalculating on every window resize), the snippet keeps just one number — the left pane's width as a percentage — and a single function, \`setSplit(pct)\`, applies it everywhere: it clamps the value, sets \`left.style.width\`, and updates both panes' percentage readouts. The right pane uses \`flex: 1\` so it automatically fills whatever space remains — there is no need to compute or store its width separately. This "one source of truth, one function that propagates it" structure is the same idea behind the [Sticky Cart Drawer](/ui-snippets/sticky-cart-drawer)'s \`recalc()\` — derive everything from a single value rather than juggling several that could drift out of sync.

**Clamping prevents unusable layouts**

\`setSplit\` runs every incoming value through \`Math.min(100 - MIN_PCT, Math.max(MIN_PCT, pct))\` before applying it — a double-clamp that guarantees neither pane can ever shrink below \`MIN_PCT\` (18%). Without this, a visitor could drag the divider all the way to one edge and effectively hide a pane completely, often making the UI feel broken or "stuck." The clamp is computed fresh on every pointer move, so even a fast, sloppy drag past either edge snaps cleanly back to the minimum rather than producing a jarring layout glitch.

**One coordinate function unifies mouse and touch**

A small \`pointerX(e)\` helper returns \`e.touches[0].clientX\` for touch events and \`e.clientX\` for mouse events — collapsing two input families into a single code path. \`onMove\` then converts that absolute screen coordinate into a percentage of the split container's width via \`getBoundingClientRect()\`, so \`startDrag\`/\`onMove\`/\`endDrag\` work identically whether the visitor drags with a mouse on desktop or a finger on a touchscreen, with \`touch-action: none\` on the divider stopping the page from scrolling mid-drag.

**Accessible by more than just pointer**

The divider carries \`role="separator"\`, \`aria-orientation="vertical"\`, and \`tabindex="0"\` — marking it as an interactive layout control for assistive technology — and a \`keydown\` handler lets arrow keys nudge the split by 4 percentage points at a time. A \`dblclick\` listener resets the split back to an even 50/50. None of these alternate interaction paths duplicate the clamping or rendering logic; they all funnel through the same \`setSplit()\` function the pointer-drag code uses.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Lay out two panes and a divider with flexbox', text: 'Wrap a fixed-width `.pane.left`, a narrow `.divider`, and a `flex: 1` `.pane.right` in a `display: flex` container — the right pane automatically fills whatever space the left pane and divider do not occupy.' },
        { title: 'Track the split as a single percentage', text: 'Write a `setSplit(pct)` function that is the *only* place layout state changes — it clamps the incoming value, sets `left.style.width = pct + "%"`, and updates both panes\' percentage readouts in one place.' },
        { title: 'Clamp to sensible minimum widths', text: 'Run every value through `Math.min(100 - MIN_PCT, Math.max(MIN_PCT, pct))` so neither pane can shrink past a configurable minimum (e.g. 18%) — preventing a dragged-to-the-edge pane from disappearing entirely.' },
        { title: 'Normalize mouse and touch coordinates', text: 'Write a `pointerX(e)` helper that returns `e.touches?.[0].clientX ?? e.clientX`, then convert that into a percentage with `((pointerX(e) - rect.left) / rect.width) * 100` using the container\'s `getBoundingClientRect()`.' },
        { title: 'Wire drag start/move/end across both input types', text: 'Add `mousedown`/`touchstart` listeners that set a `dragging` flag and toggle a `.dragging` class, `mousemove`/`touchmove` listeners on `window` that call `setSplit()` while dragging, and `mouseup`/`touchend` listeners that clear the flag.' },
        { title: 'Add keyboard and double-click affordances', text: 'Mark the divider `role="separator"` with `tabindex="0"`, handle `ArrowLeft`/`ArrowRight` `keydown` events to nudge the split by a fixed step, and add a `dblclick` listener that calls `setSplit(50)` to reset evenly.' },
      ],
    },
    features: [
      'Single-percentage layout model — one `setSplit(pct)` function is the only place panel widths change, deriving both readouts and the actual CSS width from a single source of truth, the same architecture used in the Sticky Cart Drawer\'s recalc loop',
      'Double-clamped resize bounds — `Math.min(100 - MIN_PCT, Math.max(MIN_PCT, pct))` guarantees neither pane can ever shrink past a configurable minimum, so a fast or sloppy drag never produces a broken, hidden, or unusable pane',
      'Unified mouse + touch dragging — a `pointerX()` helper collapses both input families into one code path, with `touch-action: none` on the divider so dragging on mobile does not also scroll the page',
      'Live percentage readouts — both panes display their current share as a rounded percentage that updates in real time as the divider moves, giving visitors precise, immediate feedback',
      'Full keyboard accessibility — `role="separator"`, `aria-orientation="vertical"`, and `tabindex="0"` mark the divider for assistive technology, with `ArrowLeft`/`ArrowRight` nudging the split by fixed increments',
      'Double-click to reset — a `dblclick` handler instantly returns the layout to an even 50/50 split, a small but important "undo my mess" affordance for resizable layouts',
      'Pure vanilla JavaScript and flexbox — no layout library or framework; copy the HTML, CSS, and JS into any page and the resizable split works immediately',
    ],
    useCases: [
      { icon: 'CODE', title: 'Code editors, IDEs, and live-preview tools', desc: 'Build an editor-and-preview split view — the exact layout behind browser devtools, online code playgrounds, and Markdown editors like the [Markdown Live Preview](/ui-snippets/markdown-live-preview) snippet — letting users allocate more space to whichever side they are focused on.' },
      { icon: 'FLOW', title: 'Admin dashboards and multi-pane workspaces', desc: 'Let users resize a navigation list against a detail view, or a data table against a chart panel — giving power users control over their own workspace layout instead of a fixed, one-size-fits-all split.' },
      { icon: 'PEOPLE', title: 'Email, chat, and inbox-style interfaces', desc: 'Use the divider to let users widen a conversation list or narrow a message-preview pane — a familiar interaction pattern from desktop email clients that translates well to web apps.' },
      { icon: 'GLOBAL', title: 'Learning unified pointer/touch/keyboard interaction design', desc: 'A compact, real-world example of building one interaction (resize) that works identically across mouse drag, touch drag, and keyboard input — directly transferable to sliders, croppers, and other draggable controls.' },
      { icon: 'DESIGN', title: 'Comparison and before/after viewers', desc: 'Adapt the same divider-and-clamp mechanics to build an image or content comparison slider, where dragging reveals more of one side and less of the other.' },
      { icon: 'LEARN', title: 'A reference for clamped, single-source-of-truth layouts', desc: 'The `setSplit()` pattern — one function that clamps, applies, and reflects a single piece of state — is directly reusable any time a UI needs to keep multiple visual elements in sync from one underlying value.' },
      { icon: 'CODE', title: 'Related: Grid / List View Toggle', desc: 'See the [Grid / List View Toggle](/ui-snippets/grid-list-view-toggle/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the snippet keep both panes\' widths in sync without tracking two separate values?', a: 'It tracks only the *left* pane\'s width as a percentage and gives the right pane `flex: 1`, so flexbox automatically computes its width as "whatever space remains." The single `setSplit(pct)` function is the only place that ever changes layout — it sets the left pane\'s `style.width` and derives both percentage readouts (`pct` and `100 - pct`) from that one number, so the two values can never drift out of sync.' },
      { q: 'What stops a visitor from dragging a pane down to nothing?', a: '`setSplit` runs every incoming value through `Math.min(100 - MIN_PCT, Math.max(MIN_PCT, pct))` before applying it, where `MIN_PCT` is 18. That double-clamp guarantees the left pane can never go below 18% and — because the right pane is `100 - left` — can also never push the right pane below 18%. Even a fast drag straight to the edge of the container snaps cleanly to the minimum rather than collapsing a pane to zero width.' },
      { q: 'How does dragging work on both desktop and touchscreens with the same code?', a: 'A small `pointerX(e)` helper returns `e.touches[0].clientX` when the event has a `touches` array (a touch event) and `e.clientX` otherwise (a mouse event) — collapsing both into one coordinate value. `startDrag`, `onMove`, and `endDrag` are then registered for both `mousedown`/`mousemove`/`mouseup` and `touchstart`/`touchmove`/`touchend`, so the exact same functions drive the resize regardless of input device. `touch-action: none` on the divider also prevents the browser from interpreting the drag as a page-scroll gesture.' },
      { q: 'Can I resize the panels without a mouse or touchscreen?', a: 'Yes — the divider has `tabindex="0"` so it can receive keyboard focus, and a `keydown` handler listens for `ArrowLeft`/`ArrowRight`, nudging the current split by 4 percentage points in either direction via the same `setSplit()` function the drag interaction uses. It also carries `role="separator"` and `aria-orientation="vertical"` so assistive technologies announce it correctly as an adjustable layout control.' },
      { q: 'How do I change the minimum pane width or reset the layout programmatically?', a: 'Adjust the `MIN_PCT` constant near the top of the script — every clamp calculation derives from that single value, so changing it instantly updates both the minimum and (via `100 - MIN_PCT`) the maximum bound for the left pane. To reset the layout from code, simply call `setSplit(50)` — the same function the divider\'s `dblclick` handler calls to snap back to an even split.' },
      { q: 'Can I use this drag-to-resize panels snippet on my own site for free, including commercial projects?', a: 'Yes — copy the HTML, CSS, and JS with the buttons on this page and use them anywhere, including commercial products, with no attribution required. It is built entirely with flexbox layout and vanilla JavaScript pointer/keyboard handling — no resizable-layout library or licensing to track.' },
    ],
    aiPrompt: {
      paragraph: `Rather than working through the clamp math yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setSplit() runs every incoming value through a double Math.min/Math.max clamp against MIN_PCT and 100 minus MIN_PCT, and how the pointerX() helper collapses touch and mouse events into a single coordinate so onMove() never needs to branch on input type. The same assistant can help you optimize it, for instance checking whether attaching mousemove and touchmove listeners to the whole window (rather than just the divider) has any real performance cost during a drag. It is also useful for extending the panels: ask it to support three or more resizable panes with independent minimums, persist the chosen split to localStorage across page loads, or add a vertical (horizontal-divider) orientation variant. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drag-to-resize two-pane split layout in plain HTML, CSS, and JavaScript with no layout library.

Requirements:
- A flexbox container holding a left pane with an explicit percentage width, a narrow divider element in between, and a right pane using flex: 1 so it automatically fills whatever width remains — never computing or storing the right pane's width directly.
- A single function that is the only place layout state ever changes: given a percentage, it must clamp the value between a configurable minimum percentage and 100 minus that same minimum, apply the clamped value as the left pane's width, and update both panes' live percentage readouts from that one clamped number.
- A single coordinate helper that returns the correct clientX whether the incoming event is a mouse event or a touch event (reading from the touches array only for touch events), so the same drag-start, drag-move, and drag-end functions work for both input types without branching.
- Wire mousedown/touchstart on the divider to begin a drag, mousemove/touchmove on the window to update the split while dragging (converting the absolute pointer position into a percentage of the container's bounding rect width), and mouseup/touchend on the window to end the drag, with touch-action: none on the divider so dragging never triggers page scrolling.
- Make the divider keyboard accessible: give it role="separator", aria-orientation="vertical", and tabindex="0", and handle ArrowLeft/ArrowRight keydown events to nudge the split by a fixed percentage step through the same clamped function used by dragging.
- Add a double-click handler on the divider that resets the split to an even 50/50 through that same single function, so every interaction path (drag, keyboard, double-click) funnels through one source of truth.`,
    },
  },
};

export default dragResizePanels;
