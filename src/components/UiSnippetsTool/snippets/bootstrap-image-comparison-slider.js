const bootstrapImageComparisonSlider = {
  id: 'bootstrap-image-comparison-slider',
  title: 'Bootstrap Before/After Image Comparison Slider',
  lastmod: '2026-09-10',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bics-card">
    <div class="card-body p-3">
      <div class="bics-frame" id="bicsFrame">
        <img src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&h=500&fit=crop" class="bics-img bics-before" alt="Before">
        <div class="bics-after-wrap" id="bicsAfterWrap">
          <img src="https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&h=500&fit=crop" class="bics-img bics-after" alt="After">
        </div>
        <div class="bics-handle" id="bicsHandle">
          <div class="bics-handle-btn">&#8596;</div>
        </div>
        <span class="badge text-bg-dark bics-label bics-label-left">Before</span>
        <span class="badge text-bg-dark bics-label bics-label-right">After</span>
      </div>
      <div class="text-center text-muted small mt-2" id="bicsPercent">50%</div>
    </div>
  </div>
</div>`,
  css: `.bics-card { width: 100%; max-width: 700px; border: 1px solid #eceef1; border-radius: 14px; }
.bics-frame { position: relative; width: 100%; aspect-ratio: 16 / 10; overflow: hidden; border-radius: 10px; user-select: none; }
.bics-img { position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover; display: block; }
.bics-after-wrap { position: absolute; top: 0; left: 0; height: 100%; width: 50%; overflow: hidden; }
.bics-after-wrap .bics-img { width: var(--bics-frame-width, 100%); max-width: none; }
.bics-handle { position: absolute; top: 0; left: 50%; width: 4px; height: 100%; background: #fff; transform: translateX(-2px); cursor: ew-resize; box-shadow: 0 0 6px rgba(0,0,0,0.3); }
.bics-handle-btn { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 36px; height: 36px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-weight: 700; box-shadow: 0 2px 8px rgba(0,0,0,0.25); }
.bics-label { position: absolute; top: 10px; font-size: 0.7rem; }
.bics-label-left { left: 10px; }
.bics-label-right { right: 10px; }`,
  js: `const frame = document.getElementById('bicsFrame');
const afterWrap = document.getElementById('bicsAfterWrap');
const handle = document.getElementById('bicsHandle');
const afterImg = afterWrap.querySelector('.bics-img');
const percentLabel = document.getElementById('bicsPercent');

let dragging = false;

function setSplit(percent) {
  const clamped = Math.min(100, Math.max(0, percent));
  afterWrap.style.width = clamped + '%';
  handle.style.left = clamped + '%';
  afterImg.style.width = (frame.clientWidth) + 'px';
  percentLabel.textContent = Math.round(clamped) + '%';
}

function updateFromClientX(clientX) {
  const rect = frame.getBoundingClientRect();
  const x = clientX - rect.left;
  const percent = (x / rect.width) * 100;
  setSplit(percent);
}

handle.addEventListener('pointerdown', (e) => {
  dragging = true;
  handle.setPointerCapture(e.pointerId);
});

handle.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  updateFromClientX(e.clientX);
});

handle.addEventListener('pointerup', () => { dragging = false; });
handle.addEventListener('pointercancel', () => { dragging = false; });

// Clicking anywhere on the frame (not just dragging the handle) also jumps the split to that point.
frame.addEventListener('click', (e) => {
  if (dragging) return;
  updateFromClientX(e.clientX);
});

window.addEventListener('resize', () => {
  afterImg.style.width = frame.clientWidth + 'px';
});

setSplit(50);`,
  seo: {
    title: 'Bootstrap Before/After Image Comparison Slider',
    description: 'A draggable Bootstrap 5.3 before/after image slider using pointer events and clip-based width with a live percentage label. Export to React & Tailwind.',
    about: {
      title: 'Bootstrap Before/After Image Comparison Slider — HTML, CSS & JavaScript',
      description: `A before/after slider is really an optical illusion built from two stacked images and one clever clipping trick, and this snippet builds that trick with plain CSS width and overflow rather than anything Bootstrap-specific, wrapped inside a Bootstrap \`card\` for the surrounding chrome. Two absolutely-positioned \`.bics-img\` elements sit stacked in a \`.bics-frame\` container: the "before" image fills the frame normally, while the "after" image is nested inside a second absolutely-positioned wrapper, \`.bics-after-wrap\`, whose \`width\` and \`overflow: hidden\` together act as the reveal mask — shrinking that wrapper's width clips away the right side of the after image, showing the before image underneath.\n\nThe trick that makes this work correctly is that the after image inside the wrapper is given an explicit pixel \`width\` equal to the full frame's width (\`frame.clientWidth\`), not \`100%\` of its shrinking parent — if it were \`width: 100%\`, the after image would rescale and squash every time the wrapper narrowed, instead of staying full-size and simply getting cropped. \`setSplit(percent)\` is the single function that keeps both the wrapper's width and the handle's \`left\` position in sync with a percentage value, clamped between 0 and 100 with \`Math.min\`/\`Math.max\` so the handle can never be dragged past either edge of the frame.\n\nDragging uses the Pointer Events API — \`pointerdown\`, \`pointermove\`, \`pointerup\`, \`pointercancel\` — rather than separate mouse and touch handlers, which is what makes the same code work identically for mouse dragging and touchscreen dragging with no extra branching. \`handle.setPointerCapture(e.pointerId)\` on \`pointerdown\` is the detail that prevents a common bug in drag implementations: without it, moving the pointer fast enough during a drag can slip off the thin 4px handle element and stop receiving \`pointermove\` events entirely, leaving the drag "stuck"; capturing the pointer keeps every subsequent move event routed to the handle regardless of what element the cursor is actually over.\n\n\`updateFromClientX()\` converts a raw \`clientX\` coordinate into a percentage by subtracting the frame's \`getBoundingClientRect().left\` and dividing by its width — this is also reused by a plain \`click\` listener on the frame itself, so clicking anywhere on the image (not just grabbing the thin handle) jumps the split to that point, a usability nicety many comparison-slider implementations skip. A \`resize\` listener keeps the after image's pixel width correct if the frame's rendered size changes (for example, the browser window resizing), since the pixel width computed at drag time would otherwise become stale.\n\nBecause the entire interaction is three plain variables (a boolean \`dragging\` flag and the frame's live geometry) and one \`setSplit()\` function, it maps directly onto a React \`useState\`-driven percent plus a \`ref\`-based pointer handler, a Vue \`ref\`, or an Angular \`ngAfterViewInit\` binding, with the resize listener cleaned up in each framework's unmount hook.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Two photos appear split exactly down the middle with a white draggable handle and a "50%" label underneath.' },
        { title: 'Drag the handle left', text: 'More of the "after" image is revealed on the left side, the percentage label decreases, and the before image is covered accordingly.' },
        { title: 'Drag the handle right', text: 'More of the "before" image becomes visible and the percentage label increases toward 100%.' },
        { title: 'Click directly on the image without dragging', text: 'The split jumps instantly to wherever you clicked, without needing to grab the thin handle first.' },
        { title: 'Resize the browser window', text: 'The images and handle stay correctly proportioned and aligned to the frame at its new size.' },
      ],
    },
    features: [
      'Real drag interaction built on the Pointer Events API (pointerdown/move/up/cancel), working for mouse and touch alike',
      'setPointerCapture prevents the drag from breaking if the pointer moves faster than the handle can track',
      'Clip-based reveal using an overflow:hidden wrapper and a fixed-pixel-width inner image, avoiding image squashing',
      'Clicking anywhere on the frame jumps the split point, not only dragging the handle',
      'Live percentage label reflecting the exact current split position, rounded to a whole number',
      'Clamped drag range so the handle can never be pulled past either edge of the frame',
      'Resize listener keeps the after-image width correct if the frame\'s rendered size changes',
      'Bootstrap card and badge components used for the surrounding chrome and Before/After labels',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Before/after photo editing showcases', desc: 'The standard interaction for comparing photo retouching, filters, or design revisions side by side.' },
      { icon: 'APP', title: 'Property and renovation comparisons', desc: 'Show a room or property before and after renovation, similar in visual polish to a [product card grid](/ui-snippets/bootstrap-product-card-grid/) showcase page.' },
      { icon: 'LEARN', title: 'Learning pointer-event drag interactions', desc: 'A clean, dependency-free example of implementing draggable UI with setPointerCapture instead of separate mouse/touch handlers.' },
      { icon: 'DASHBOARD', title: 'A/B design comparisons', desc: 'Compare two dashboard layout iterations visually, useful alongside a [dashboard stat cards](/ui-snippets/bootstrap-dashboard-stat-cards/) redesign review.' },
      { icon: 'STAR', title: 'Marketing "results" sections', desc: 'Show measurable visual improvement on a landing page, pairing naturally with a [pricing comparison table](/ui-snippets/bootstrap-pricing-comparison-table/) further down the page.' },
    ],
    faqs: [
      { q: 'Why does the after image use a fixed pixel width instead of 100%?', a: "The after image sits inside a wrapper whose width shrinks as you drag; if the image itself were width:100% of that shrinking wrapper, it would visibly rescale and squash. Setting its width to the full frame's pixel width and clipping with overflow:hidden on the wrapper keeps the image at its true size while only the visible portion changes." },
      { q: 'Does this work on touchscreens, not just with a mouse?', a: 'Yes — the drag logic is built entirely on the Pointer Events API (pointerdown, pointermove, pointerup, pointercancel), which unifies mouse, touch, and pen input into one event model, so no separate touch-specific code is needed.' },
      { q: 'What is setPointerCapture actually preventing?', a: 'Without it, dragging quickly enough can move the cursor off the thin 4px-wide handle element mid-drag, which would stop pointermove events from firing on it; capturing the pointer on pointerdown guarantees the handle keeps receiving move events for the rest of that drag regardless of what is under the cursor.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — track the split percentage in useState (React) or a ref (Vue), attach the pointer handlers in useEffect/onMounted with refs instead of getElementById, apply the wrapper width and handle position as reactive styles, and clean up the resize listener in the component\'s unmount/ngOnDestroy hook.' },
      { q: 'Does this work with Tailwind instead of Bootstrap?', a: 'Yes — only the outer card and the Before/After badge labels use Bootstrap classes; the slider mechanics rely on plain absolute positioning and pointer events, so you can restyle the chrome with Tailwind utilities without touching the JavaScript.' },
      { q: 'Can I use my own images instead of the sample photos?', a: 'Yes — replace the two img src attributes with your own before and after images of the same dimensions; using two images with different aspect ratios will look inconsistent since both are stretched to fill the frame with object-fit: cover.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add keyboard arrow-key support for moving the handle a fixed percentage per press for accessibility, or to add a subtle auto-play mode that sweeps the handle back and forth when the slider is idle. It's also worth asking it to support vertical (top/bottom) comparison mode as an alternative orientation.`,
      prompt: `Build a Bootstrap 5.3 before/after image comparison slider using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Two stacked images (before and after) inside a fixed-aspect-ratio frame, where the after image is revealed by clipping it inside an overflow:hidden wrapper whose width represents the reveal percentage.
- A draggable vertical handle positioned at the boundary between the two images, implemented with the Pointer Events API (pointerdown/pointermove/pointerup) and setPointerCapture so dragging does not break if the pointer moves quickly.
- Clicking anywhere on the image frame (not only the handle) should also jump the split to that horizontal position.
- A live percentage label below the frame that updates continuously as the handle is dragged.
- Ensure the after image never visually rescales or squashes while the wrapper around it changes width during dragging.`,
    },
  },
};

export default bootstrapImageComparisonSlider;
