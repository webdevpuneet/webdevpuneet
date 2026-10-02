const imageComparisonSlider = {
  id: 'image-comparison-slider',
  title: 'Before/After Image Comparison Slider',
  lastmod: '2026-08-17',
  category: 'media',
  html: `<div class="demo">
  <div class="compare" id="compare">
    <div class="pane pane-before">
      <div class="swatch swatch-before">Before</div>
      <div class="tag">Original</div>
    </div>
    <div class="pane pane-after" id="afterPane">
      <div class="swatch swatch-after">After</div>
      <div class="tag tag-after">Enhanced</div>
    </div>
    <div class="handle" id="handle" role="slider" tabindex="0" aria-label="Comparison position" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">
      <div class="handle-line"></div>
      <div class="handle-grip">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
      </div>
    </div>
  </div>
  <p class="hint">Drag the handle, or use the arrow keys after focusing it</p>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8f9fa; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 100%; max-width: 420px; }
.compare { position: relative; width: 100%; aspect-ratio: 16/10; border-radius: 14px; overflow: hidden; user-select: none; box-shadow: 0 10px 30px rgba(0,0,0,0.12); cursor: ew-resize; }
.pane { position: absolute; inset: 0; }
.swatch { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 15px; font-weight: 700; color: rgba(255,255,255,0.55); letter-spacing: 0.04em; }
.swatch-before { background: linear-gradient(135deg, #94a3b8, #475569); }
.swatch-after { background: linear-gradient(135deg, #38bdf8, #6366f1); }
.tag { position: absolute; top: 12px; left: 12px; background: rgba(15,23,42,0.55); color: #fff; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px; letter-spacing: 0.03em; pointer-events: none; }
.tag-after { left: auto; right: 12px; }
.pane-after { clip-path: inset(0 0 0 50%); }
.handle { position: absolute; top: 0; bottom: 0; left: 50%; width: 0; transform: translateX(-50%); display: flex; align-items: center; justify-content: center; touch-action: none; }
.handle-line { position: absolute; top: 0; bottom: 0; width: 3px; background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,0.08); }
.handle-grip { position: relative; z-index: 2; width: 36px; height: 36px; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; gap: 1px; color: #374151; box-shadow: 0 3px 10px rgba(0,0,0,0.25); }
.handle:focus-visible .handle-grip { outline: 2px solid #2563eb; outline-offset: 2px; }
.hint { margin-top: 10px; font-size: 12.5px; color: #9ca3af; text-align: center; }`,
  js: `var compare = document.getElementById('compare');
var afterPane = document.getElementById('afterPane');
var handle = document.getElementById('handle');
var dragging = false;

function setPosition(pct) {
  pct = Math.max(0, Math.min(100, pct));
  afterPane.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
  handle.style.left = pct + '%';
  handle.setAttribute('aria-valuenow', Math.round(pct));
}

function positionFromEvent(clientX) {
  var rect = compare.getBoundingClientRect();
  var pct = ((clientX - rect.left) / rect.width) * 100;
  setPosition(pct);
}

compare.addEventListener('pointerdown', function(e) {
  dragging = true;
  handle.setPointerCapture(e.pointerId);
  positionFromEvent(e.clientX);
});
compare.addEventListener('pointermove', function(e) {
  if (!dragging) return;
  positionFromEvent(e.clientX);
});
window.addEventListener('pointerup', function() { dragging = false; });

handle.addEventListener('keydown', function(e) {
  var current = parseFloat(handle.getAttribute('aria-valuenow'));
  if (e.key === 'ArrowLeft') { setPosition(current - 5); e.preventDefault(); }
  else if (e.key === 'ArrowRight') { setPosition(current + 5); e.preventDefault(); }
  else if (e.key === 'Home') { setPosition(0); e.preventDefault(); }
  else if (e.key === 'End') { setPosition(100); e.preventDefault(); }
});

setPosition(50);`,
  seo: {
    title: 'Before/After Slider — Image Comparison Snippet',
    description: 'Draggable before/after image comparison slider with clip-path reveal, pointer capture, and full keyboard support. Exports to React, Vue & Angular.',
    about: {
      title: 'Before/After Image Comparison Slider — clip-path Reveal with Pointer Capture',
      description: `A before/after slider stacks two images and lets a visitor drag a divider to reveal how much of each is showing — the standard pattern for photo editing demos, before/after room renovations, and product comparison shots. This snippet builds the reveal with a single CSS property, \`clip-path\`, rather than the older technique of resizing an \`overflow: hidden\` container.\n\n**The clip-path reveal**\n\nBoth images are stacked with \`position: absolute; inset: 0\`, fully overlapping. The top ("after") image has \`clip-path: inset(0 0 0 50%)\` applied, which clips away everything to the left of the 50% mark, letting the bottom ("before") image show through in that region. Dragging the handle simply rewrites the \`left\` inset percentage on every move — \`inset(0 0 0 ${'${pct}'}%)\`. This is cheaper for the browser than the historical technique of \`width\`-clipping an inner wrapper, because \`clip-path\` doesn't affect layout at all; it only changes what's painted, so there's no reflow on every drag frame.\n\n**Pointer Events with capture**\n\nA single set of \`pointerdown\`/\`pointermove\`/\`pointerup\` handlers covers mouse, touch, and pen with no separate touch-event code path. \`handle.setPointerCapture(e.pointerId)\` on \`pointerdown\` is the detail that keeps the drag working smoothly on a touchscreen — without it, a finger that drifts slightly off the handle element mid-drag can lose the \`pointermove\` events entirely, since by default they're only delivered to whatever element is directly under the pointer.\n\n**Position math**\n\n\`positionFromEvent()\` reads \`compare.getBoundingClientRect()\` on every move and computes \`((clientX - rect.left) / rect.width) * 100\` to convert a raw pixel coordinate into a percentage. Recomputing the bounding rect on every event (rather than caching it once at drag-start) means the slider stays correct even if the container's size changes mid-drag, for example from a responsive layout shift or an orientation change on mobile.\n\n**Keyboard accessibility**\n\nThe handle carries \`role="slider"\`, \`tabindex="0"\`, and \`aria-valuemin\`/\`aria-valuemax\`/\`aria-valuenow\` — the standard ARIA slider pattern. ArrowLeft/ArrowRight nudge the position by 5%, and Home/End jump to the extremes. This means the entire comparison is fully operable without a pointer at all, which a pure drag-only implementation would miss completely; screen readers announce the current percentage from \`aria-valuenow\`, which is kept in sync with the visual position on every update.\n\n**Why the grip has two chevrons**\n\nThe circular handle grip contains two small chevrons pointing left and right rather than a single icon, which visually communicates "this drags both directions" at a glance — a subtle affordance cue that a plain circle or single-arrow icon doesn't convey.\n\n**Swapping in real images**\n\nThe demo uses two CSS gradients as stand-ins so the snippet has no external image dependency. To use real photos, replace \`.swatch-before\`/\`.swatch-after\`'s background with \`background-image: url(...); background-size: cover; background-position: center\` on the two \`.pane\` elements, and make sure both images share the exact same dimensions and framing — a comparison slider only reads correctly when the two images are pixel-aligned to each other.\n\n**Performance note**\n\nBecause the reveal is driven by \`clip-path\` and the handle position by \`left\` (a cheap property for a thin absolutely-positioned element with no siblings reflowing around it), the drag stays smooth even with two full-resolution photographs loaded, unlike a canvas-based cross-fade approach that would need to redraw pixels on every frame.\n\nSee also the [scroll before/after](/ui-snippets/scroll-before-after/) snippet for a scroll-triggered (rather than drag-triggered) reveal of the same concept, and the [color swatch](/ui-snippets/color-swatch/) snippet if you only need a static side-by-side rather than an interactive divider.`,
    },
    howToUse: [
      { title: 'Copy the compare/pane/handle markup', text: 'The .compare container holds two stacked .pane divs (before and after) and a .handle slider element — copy all three as one unit.' },
      { title: 'Replace the placeholder swatches with real images', text: 'Set background-image: url(...) with background-size: cover on both .pane elements instead of the demo gradients, using two images with identical framing and dimensions.' },
      { title: 'Add the CSS and JS', text: 'Paste both blocks unmodified — the clip-path math and pointer handling work against percentages, not fixed pixels, so they adapt to any container width automatically.' },
      { title: 'Set an aspect ratio', text: 'Adjust aspect-ratio on .compare to match your images so the container doesn\'t distort or crop them awkwardly on different screen widths.' },
      { title: 'Test keyboard access', text: 'Tab to the handle and use the arrow keys — Home/End jump to the extremes, and aria-valuenow announces the current percentage to screen readers.' },
    ],
    features: [
      'clip-path-based reveal — no layout reflow on drag, unlike width-based clipping approaches',
      'Pointer Events with setPointerCapture so touch drags never lose tracking off the handle',
      'Bounding rect recalculated on every move, staying correct through responsive layout changes mid-drag',
      'Full ARIA slider pattern — role="slider", aria-valuenow, keyboard operable with arrows/Home/End',
      'Percentage-based math adapts to any container width with zero fixed pixel values',
      'Two-chevron handle grip visually signals bidirectional drag',
      'Works with any two same-size images — just swap the background-image on each pane',
      'Zero dependencies — pure HTML, CSS, and JavaScript',
    ],
    useCases: [
      { icon: '📷', title: 'Photo editing demos', desc: 'Show a raw photograph beside the retouched result, revealing each with `clip-path` so no layout reflow happens during the drag.' },
      { icon: '🏠', title: 'Renovation and design reveals', desc: 'Show a room, garden or product before and after, with a full ARIA slider so keyboard users can move the divider too.' },
      { icon: '🖥️', title: 'Redesign case studies', desc: 'Compare an old website with the new one, recalculating the bounding rectangle on every move to stay correct through responsive layout changes.' },
      { icon: '🧴', title: 'Product marketing proof', desc: 'Show skincare, fitness or restoration results with pointer capture keeping touch drags tracked even off the handle.' },
      { icon: '📊', title: 'Feature comparison context', desc: 'Pair with a [comparison table](/ui-snippets/comparison-table/) so a visual before-and-after sits above the detailed list of differences.' },
      { icon: 'CODE', title: 'Related: Subscription Tier Card Stack — Recommended Highlight', desc: 'See the [Subscription Tier Card Stack — Recommended Highlight](/ui-snippets/subscription-tier-stack-recommended/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use real photos instead of the demo gradients?', a: 'Set background-image: url(your-photo.jpg); background-size: cover; background-position: center directly on the .pane-before and .pane-after elements in place of the .swatch gradient backgrounds, keeping both images the same dimensions and framing.' },
      { q: 'Why use clip-path instead of resizing a wrapper with overflow: hidden?', a: 'clip-path only changes what is painted, not the box\'s layout, so the browser can update it every frame without triggering a reflow. Resizing an overflow:hidden wrapper\'s width changes layout on every drag frame, which is more expensive and can visibly jank on lower-end devices.' },
      { q: 'Why does the drag use setPointerCapture?', a: 'Without pointer capture, pointermove events are only delivered to whatever element sits directly under the pointer. A fast or slightly off-target touch drag can slip off the handle mid-gesture and stop receiving events; capturing the pointer on pointerdown guarantees the handle keeps receiving moves until pointerup, regardless of where the finger drifts.' },
      { q: 'Is this comparison slider accessible to keyboard and screen reader users?', a: 'Yes — the handle uses role="slider" with aria-valuemin/max/now, is focusable via tabindex="0", and responds to ArrowLeft/ArrowRight (5% steps) and Home/End (jump to extremes), with aria-valuenow kept in sync so screen readers announce the current position.' },
      { q: 'How do I use this before/after slider in React, Vue, or Angular?', a: 'Open the Export menu on the snippet page for a React component tracking position in useState with the same pointer-capture logic in event handlers, a React + Tailwind version, a Vue 3 SFC, or an Angular standalone component — all preserve the clip-path math and the ARIA slider attributes.' },
    ],
    aiPrompt: {
      paragraph: `Paste this comparison slider's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why clip-path was chosen over resizing an overflow-hidden wrapper, and how setPointerCapture prevents the drag from losing tracking when a touch input drifts off the handle. It's worth asking the assistant to verify the percentage math in positionFromEvent handles container resizing correctly, since it deliberately recomputes getBoundingClientRect on every move rather than caching it once at drag start. Beyond that, ask it to add a caption overlay that fades in near each edge, a double-click-to-reset-to-50% behavior, or support for a vertical (top/bottom) orientation instead of the current horizontal left/right split.`,
      prompt: `Build a draggable before/after image comparison slider in plain HTML, CSS, and JavaScript, no framework, no libraries, no image assets.

Requirements:
- Two full-size panes stacked exactly on top of each other inside one container, representing a "before" image underneath and an "after" image on top, using CSS gradients as placeholder visuals since no real images are used.
- The top pane must be revealed and hidden using the CSS clip-path property based on a percentage value, not by resizing a width or using overflow:hidden on a wrapper, so the reveal never triggers a layout reflow.
- A vertical draggable handle positioned at the current split percentage, with a circular grip containing two small opposing chevron icons to signal it can be dragged in either direction.
- Dragging must use Pointer Events (pointerdown, pointermove, pointerup) with pointer capture set on drag start, so the drag keeps tracking correctly even if a touch input drifts off the handle element mid-gesture, and the container's bounding rectangle must be measured fresh on every move rather than cached once, so it stays correct through any responsive resizing.
- The handle must also be a proper ARIA slider: focusable, with role="slider" and aria-valuemin, aria-valuemax, and aria-valuenow attributes that stay in sync with the current position, and it must respond to ArrowLeft/ArrowRight for small step adjustments and Home/End to jump to the two extremes.
- All position math must be expressed in percentages relative to the container's width, not fixed pixel values, so the slider works correctly at any container size.`,
    },
  },
};

export default imageComparisonSlider;
