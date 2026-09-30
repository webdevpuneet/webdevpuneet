const multiDirectional2dSlider = {
  id: 'multi-directional-2d-slider',
  title: 'Multi-Directional 2D Slider',
  lastmod: '2026-09-14',
  category: 'forms',
  html: `<div class="mds-wrap">
  <div class="mds-viewport" id="mdsViewport">
    <div class="mds-grid" id="mdsGrid">
      <div class="mds-cell" style="background:linear-gradient(160deg,#6366f1,#4338ca)">1</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#0ea5e9,#0369a1)">2</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#ec4899,#9d174d)">3</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#10b981,#047857)">4</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#f59e0b,#b45309)">5</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#8b5cf6,#5b21b6)">6</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#ef4444,#991b1b)">7</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#14b8a6,#0f766e)">8</div>
      <div class="mds-cell" style="background:linear-gradient(160deg,#eab308,#854d0e)">9</div>
    </div>
  </div>
  <div class="mds-pad" id="mdsPad">
    <button class="mds-dir mds-up" data-dx="0" data-dy="1" aria-label="Move up">▲</button>
    <button class="mds-dir mds-left" data-dx="1" data-dy="0" aria-label="Move left">◀</button>
    <div class="mds-dot"></div>
    <button class="mds-dir mds-right" data-dx="-1" data-dy="0" aria-label="Move right">▶</button>
    <button class="mds-dir mds-down" data-dx="0" data-dy="-1" aria-label="Move down">▼</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1117;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:22px;padding:24px}
.mds-viewport{width:220px;height:220px;overflow:hidden;border-radius:16px;box-shadow:0 16px 36px rgba(0,0,0,.5)}
.mds-grid{display:grid;grid-template-columns:repeat(3,220px);grid-template-rows:repeat(3,220px);width:660px;height:660px;transition:transform .4s cubic-bezier(.4,0,.2,1);touch-action:none;cursor:grab}
.mds-grid.mds-grabbing{cursor:grabbing}
.mds-cell{display:flex;align-items:center;justify-content:center;font-size:60px;font-weight:800;color:rgba(255,255,255,.9)}
.mds-pad{display:grid;grid-template-columns:repeat(3,34px);grid-template-rows:repeat(3,34px);gap:4px;place-items:center}
.mds-up{grid-column:2;grid-row:1}
.mds-left{grid-column:1;grid-row:2}
.mds-dot{grid-column:2;grid-row:2;width:8px;height:8px;border-radius:50%;background:#2a3348}
.mds-right{grid-column:3;grid-row:2}
.mds-down{grid-column:2;grid-row:3}
.mds-dir{width:34px;height:34px;border-radius:8px;background:#161c2c;border:1px solid #2a3348;color:#cbd5e1;font-size:13px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s,color .15s}
.mds-dir:hover{background:#232c42;color:#fff}`,

  js: `var viewport = document.getElementById('mdsViewport');
var grid = document.getElementById('mdsGrid');
var CELL = 220;
var col = 1, row = 1; // start centered on cell "5"
var minCol = 0, maxCol = 2, minRow = 0, maxRow = 2;

function render() {
  grid.style.transform = 'translate(' + (-col * CELL) + 'px, ' + (-row * CELL) + 'px)';
}

function move(dx, dy) {
  col = Math.max(minCol, Math.min(maxCol, col - dx));
  row = Math.max(minRow, Math.min(maxRow, row - dy));
  render();
}

document.querySelectorAll('.mds-dir').forEach(function (btn) {
  btn.addEventListener('click', function () {
    move(parseInt(btn.dataset.dx, 10), parseInt(btn.dataset.dy, 10));
  });
});

// Free drag across both axes, snapping to the nearest cell on release
var dragging = false;
var startX = 0, startY = 0, baseX = 0, baseY = 0;

function currentTranslate() {
  return { x: -col * CELL, y: -row * CELL };
}

function pointerDown(e) {
  dragging = true;
  grid.classList.add('mds-grabbing');
  grid.style.transition = 'none';
  var t = currentTranslate();
  baseX = t.x; baseY = t.y;
  startX = e.touches ? e.touches[0].clientX : e.clientX;
  startY = e.touches ? e.touches[0].clientY : e.clientY;
}

function pointerMoveHandler(e) {
  if (!dragging) return;
  var x = e.touches ? e.touches[0].clientX : e.clientX;
  var y = e.touches ? e.touches[0].clientY : e.clientY;
  var tx = baseX + (x - startX);
  var ty = baseY + (y - startY);
  grid.style.transform = 'translate(' + tx + 'px, ' + ty + 'px)';
}

function pointerUpHandler(e) {
  if (!dragging) return;
  dragging = false;
  grid.classList.remove('mds-grabbing');
  grid.style.transition = '';
  var style = getComputedStyle(grid).transform;
  var matrix = new DOMMatrixReadOnly(style);
  col = Math.max(minCol, Math.min(maxCol, Math.round(-matrix.m41 / CELL)));
  row = Math.max(minRow, Math.min(maxRow, Math.round(-matrix.m42 / CELL)));
  render();
}

viewport.addEventListener('pointerdown', pointerDown);
window.addEventListener('pointermove', pointerMoveHandler);
window.addEventListener('pointerup', pointerUpHandler);
viewport.addEventListener('touchstart', pointerDown, { passive: true });
window.addEventListener('touchmove', pointerMoveHandler, { passive: true });
window.addEventListener('touchend', pointerUpHandler);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowUp') move(0, 1);
  else if (e.key === 'ArrowDown') move(0, -1);
  else if (e.key === 'ArrowLeft') move(1, 0);
  else if (e.key === 'ArrowRight') move(-1, 0);
});

render();`,

  seo: {
    title: 'Multi-Directional 2D Slider — HTML CSS JS Snippet',
    description: 'A slider that moves across a real 3×3 grid of slides in any direction — drag freely in both axes at once, snapping to the nearest cell, plus a directional D-pad and full arrow-key support. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Multi-Directional 2D Slider — One Transform, Two Axes at Once',
      description: `Every other carousel in this library moves along a single axis. This one drops that constraint entirely: nine cells sit in a real 3×3 CSS Grid, and a single \`translate(x, y)\` transform pans that grid within a fixed viewport — so dragging diagonally moves *both* axes simultaneously in one continuous motion, not two separate horizontal-then-vertical slides.\n\n**Column and row as the real state, translate as its rendering**\n\nJust like the other carousels in this collection, the actual state isn't a pixel offset — it's two small integers, \`col\` and \`row\`, each clamped between 0 and 2. \`render()\` is the only place they become a transform: \`translate(-col * CELL, -row * CELL)\`. The D-pad buttons and arrow keys both just increment or decrement \`col\`/\`row\` by one and call \`render()\` — clean, discrete, always-aligned movement.\n\n**Free drag, then reconciled back to that same discrete state**\n\nDuring an active drag, the grid's \`transform\` is set directly to follow the pointer in both axes at once — genuinely free movement, not constrained to a straight line. The moment the pointer releases, the code reads the grid's *actual current rendered transform* back out via \`getComputedStyle\` and a \`DOMMatrixReadOnly\`, divides by the cell size, and rounds to the nearest whole \`col\`/\`row\` — snapping the free-form drag position back onto the same clean integer grid the buttons and keys use, so however you moved, you always land squarely on one of the nine cells.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A viewport shows one cell of a 3×3 grid, centered on cell "5", with a directional pad beside it.' },
        { title: 'Drag in any direction', text: 'Including diagonally — the grid pans freely to follow your cursor across both axes at once.' },
        { title: 'Release', text: 'The grid snaps to whichever cell ended up most centered, aligning perfectly.' },
        { title: 'Use the D-pad or arrow keys', text: 'Move exactly one cell at a time in any of the four cardinal directions.' },
        { title: 'Reach an edge', text: 'Movement stops cleanly at the grid\'s boundary — no cell "5" can accidentally scroll past cell "1" or "9".' },
      ],
    },
    features: [
      'A real 3×3 CSS Grid panned by one transform, moving both axes simultaneously — genuine diagonal drag, not two separate sliders',
      'Discrete column/row integers are the true state; the transform is always just their rendering',
      'Free-form drag reconciled back to the nearest whole cell via a computed-transform readback on release',
      'A visual directional pad (D-pad) alongside full 4-way arrow key support',
      'Bounds-clamped in both axes independently — dragging or pressing past an edge cell does nothing further',
      'Unified pointer and touch dragging with touch-action: none preventing scroll interference',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Panoramic or map-style image browsers', desc: 'Pan across a large tiled image in any direction, not just left-right.' },
      { icon: 'APP',    title: 'Dashboard grid navigation', desc: 'Move between a 3×3 grid of widgets or views with drag or directional controls.' },
      { icon: 'CODE',   title: 'Game menu or level-select screens', desc: 'A grid of levels or menu screens navigable by drag, D-pad, or arrow keys alike.' },
      { icon: 'STAR',   title: 'Spatial portfolio or mood-board layouts', desc: 'Let visitors explore a 2D arrangement of work samples in any direction they choose.' },
    ],
    faqs: [
      { q: 'How do I change the grid size, like 4×4 instead of 3×3?', a: 'Add more .mds-cell elements to fill the new grid, update .mds-grid\'s grid-template-columns/rows and total width/height to match, and update minCol/maxCol/minRow/maxRow (and the starting col/row) to the new bounds.' },
      { q: 'How does releasing a drag know which cell to snap to?', a: 'getComputedStyle(grid).transform returns the grid\'s exact current rendered transform matrix as a string; parsing it with DOMMatrixReadOnly gives the real x/y translation values, which are then divided by the cell size and rounded to the nearest whole column and row.' },
      { q: 'Can I make it wrap around instead of stopping at the edges?', a: 'Replace the Math.max/Math.min clamping in move() and in the drag-release handler with a modulo operation against the grid\'s column/row count, so moving past the last column wraps back to the first.' },
      { q: 'Does it work with only horizontal or only vertical movement if I want that instead?', a: 'Yes — restrict the D-pad to left/right (or up/down) buttons only, and in the drag handlers, only apply the x (or y) component of the pointer delta to the transform.' },
      { q: 'Is it accessible?', a: 'The D-pad buttons are real, labeled <button> elements, and the entire grid is also operable via all four arrow keys — both provide a fully mouse/touch-independent way to navigate the same grid.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how DOMMatrixReadOnly is used to read the grid's actual rendered transform back out after a free-form drag, and why that's necessary instead of just tracking the drag delta directly in JavaScript variables throughout the gesture. It's also worth asking the assistant to add wrap-around navigation (so moving right from the last column jumps to the first), or to add momentum/inertia to the release the same way the Momentum Drag Carousel snippet does, but across both axes at once.`,
      prompt: `Build a slider that navigates a 3x3 grid of slides in any direction — including diagonally — using a single combined transform, in plain HTML, CSS, and vanilla JavaScript, no library.

Requirements:
- Nine slide/cell elements arranged in a real 3-column by 3-row CSS Grid, all contained within a grid element that is larger than a fixed-size viewport container which clips it via overflow hidden.
- The current position must be tracked as two small integers (a column index and a row index, each ranging from 0 to 2), which are the single source of truth — a render function must be the only place that converts these two integers into a CSS transform translating the grid by negative (column times cell size) horizontally and negative (row times cell size) vertically.
- A directional pad UI with four buttons (up, down, left, right) that each move exactly one column or row in that direction, clamped so movement stops at the grid's edges and cannot go out of bounds.
- Free-form dragging (via pointer events with touch fallback) that pans the grid smoothly to follow the pointer in BOTH horizontal and vertical directions simultaneously during the drag — including diagonal movement — not constrained to a single axis, with no CSS transition applied while actively dragging so it tracks the pointer exactly.
- On drag release, the grid's actual current rendered transform must be read back out programmatically (not estimated from the drag delta alone) and converted back into the nearest valid whole column and row, then the grid must animate smoothly to snap into perfect alignment with that cell, clamped within the same bounds as the directional pad.
- Full arrow key support performing the same one-cell-at-a-time movement as the directional pad buttons, in all four directions.`,
    },
  },
};

export default multiDirectional2dSlider;
