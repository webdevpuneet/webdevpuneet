const dragScrollRow = {
  id: 'drag-scroll-row',
  title: 'Drag Scroll Row',
  lastmod: '2026-07-18',
  category: 'carousels',
  html: `<div class="ds-wrap">
  <h2 class="ds-title">Continue watching</h2>
  <div class="ds-row" id="dsRow" tabindex="0" aria-label="Scrollable gallery, drag to browse">
    <div class="ds-track" id="dsTrack"></div>
  </div>
  <div class="ds-hint">Drag, flick, or use the arrow keys</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a12;color:#fff;display:flex;align-items:center;min-height:100vh}

.ds-wrap{width:100%;max-width:840px;margin:0 auto;padding:24px}
.ds-title{font-size:22px;font-weight:800;margin-bottom:14px;padding-left:4px}
.ds-row{overflow:hidden;cursor:grab;-webkit-mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent);mask-image:linear-gradient(90deg,transparent,#000 3%,#000 97%,transparent)}
.ds-row.drag{cursor:grabbing}
.ds-row:focus-visible{outline:2px solid #6366f1;outline-offset:3px;border-radius:12px}
.ds-track{display:flex;gap:14px;padding:6px 4px;will-change:transform}

.ds-tile{width:170px;flex-shrink:0;user-select:none}
.ds-poster{aspect-ratio:2/3;border-radius:12px;background:var(--g);position:relative;overflow:hidden;box-shadow:0 14px 28px -14px rgba(0,0,0,.7)}
.ds-poster span{position:absolute;left:10px;bottom:10px;font-size:13px;font-weight:800;z-index:1}
.ds-poster::after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(0,0,0,.5),transparent 55%)}
.ds-cap{font-size:12px;color:#8b8ba3;margin-top:8px;padding-left:2px}
.ds-hint{margin-top:14px;text-align:center;font-size:12.5px;color:#55556e}`,

  js: `var GRADS = ['#6366f1,#8b5cf6','#ec4899,#f43f5e','#22d3ee,#3b82f6','#34d399,#10b981','#f59e0b,#ef4444','#a78bfa,#6366f1','#f472b6,#db2777','#2dd4bf,#0ea5e9','#fb7185,#e11d48','#60a5fa,#2563eb'];
var track = document.getElementById('dsTrack');
GRADS.forEach(function (g, i) {
  track.insertAdjacentHTML('beforeend',
    '<div class="ds-tile"><div class="ds-poster" style="--g:linear-gradient(160deg,' + g + ')"><span>Title ' + (i + 1) + '</span></div><div class="ds-cap">Episode ' + (i + 1) + ' · 48m</div></div>');
});

var row = document.getElementById('dsRow');
var pos = 0, min = 0, vel = 0, dragging = false, startX = 0, startPos = 0, lastX = 0, raf = null;

function bounds() { min = Math.min(0, row.clientWidth - track.scrollWidth - 8); }
function apply() { track.style.transform = 'translateX(' + pos + 'px)'; }
function clamp(v) { return Math.max(min, Math.min(0, v)); }
bounds(); window.addEventListener('resize', function () { bounds(); pos = clamp(pos); apply(); });

row.addEventListener('pointerdown', function (e) {
  dragging = true; row.classList.add('drag');
  startX = lastX = e.clientX; startPos = pos; vel = 0;
  row.setPointerCapture(e.pointerId);
  if (raf) cancelAnimationFrame(raf);
});
row.addEventListener('pointermove', function (e) {
  if (!dragging) return;
  pos = clamp(startPos + (e.clientX - startX));
  vel = e.clientX - lastX; lastX = e.clientX;
  apply();
});
function release() {
  if (!dragging) return;
  dragging = false; row.classList.remove('drag');
  // Momentum: keep gliding, decaying velocity each frame until it settles.
  function glide() {
    vel *= 0.93;
    pos = clamp(pos + vel);
    apply();
    if (Math.abs(vel) > 0.4) raf = requestAnimationFrame(glide);
  }
  glide();
}
row.addEventListener('pointerup', release);
row.addEventListener('pointercancel', release);

// Keyboard: arrows nudge by one tile width.
row.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { pos = clamp(pos - 184); apply(); e.preventDefault(); }
  if (e.key === 'ArrowLeft')  { pos = clamp(pos + 184); apply(); e.preventDefault(); }
});`,

  seo: {
    title: 'Drag Scroll Row — Free HTML CSS JS Momentum Carousel Snippet',
    description: `A horizontal media row you drag or flick to scroll, with momentum gliding, edge clamping, fade masks, and arrow-key support. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Drag Scroll Row — Flick-to-Scroll Gallery With Momentum',
      description: `The drag scroll row is the Netflix-style horizontal shelf you grab and fling: press anywhere on the row and drag to scroll, flick and release to let it glide on momentum, and it eases to a stop at the edges. This snippet builds it with plain HTML, CSS, and vanilla JavaScript using Pointer Events, so it works identically for mouse and touch.

**Dragging with Pointer Events and capture**

On \`pointerdown\`, the row records the start cursor x and the current track position, then calls \`setPointerCapture\` so it keeps receiving move events even if the pointer leaves the element mid-drag. As you move, the track's \`translateX\` is set to the start position plus the cursor delta, clamped to the scrollable range. Using Pointer Events (rather than separate mouse and touch handlers) means one code path drives both desktop dragging and mobile swiping.

**Momentum on release**

The flick feel comes from velocity tracking. During the drag, each move records the per-frame cursor delta as \`vel\`. On release, a \`glide()\` loop keeps moving the track by \`vel\` while multiplying \`vel\` by \`0.93\` every frame, so it decays exponentially and coasts to a stop — just like flicking a physical shelf. The loop ends once velocity drops below a small threshold. Cancelling any running glide on the next \`pointerdown\` lets you catch a moving row mid-flight.

**Edge clamping**

The track can only scroll between 0 and a negative minimum equal to \`rowWidth - trackWidth\` (computed in \`bounds()\`). Every position update runs through \`clamp()\`, so neither dragging nor momentum can push the content past its ends — it stops cleanly at the first and last tiles. A \`resize\` listener recomputes the bounds and re-clamps, so the row stays valid when the viewport changes.

**Edge fade and grab cursors**

A horizontal \`mask-image\` gradient fades the row's left and right edges so tiles dissolve in and out rather than hard-cutting at the container border. The cursor switches between \`grab\` and \`grabbing\` via a \`.drag\` class so it's obvious the row is draggable. Tiles set \`user-select: none\` so dragging never accidentally selects text or images.

**Keyboard accessible**

The row is focusable (\`tabindex="0"\`) with a visible focus ring, and Arrow Left/Right nudge it by one tile width — so it's fully operable without a pointer, which a drag-only carousel would fail. An aria-label describes it as a draggable gallery.

**Image-free, data-driven tiles**

Tiles are gradient "posters" with a title and caption, generated from a palette so the demo is dependency-free. Swap each poster's \`--g\` background for a real image to make it an actual media shelf; the drag, momentum, clamping, and keyboard logic are independent of the content.

**Customizing it**

Tune the \`0.93\` decay for longer or shorter glides, change the velocity cutoff, adjust the arrow-key nudge distance, resize the tiles, or drop in real images. Add more shelves by repeating the structure. Pair it with a [recently viewed carousel](/ui-snippets/recently-viewed-carousel/) or an [Instagram gallery](/ui-snippets/instagram-gallery/) for a complete media UI.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A horizontal shelf of poster tiles renders.` },
      { title: 'Drag the row', text: `Press and move to scroll the tiles left or right.` },
      { title: 'Flick and release', text: `The row glides on momentum and eases to a stop.` },
      { title: 'Reach an edge', text: `Scrolling clamps cleanly at the first and last tiles.` },
      { title: 'Use arrow keys', text: `Focus the row and press Left or Right to nudge it.` },
      { title: 'Swap in images', text: `Set each poster's --g to a real image.` },
    ] },
    features: [
      { title: 'Pointer Events drag', text: `One path for mouse and touch dragging.` },
      { title: 'Pointer capture', text: `Keeps tracking even off the element.` },
      { title: 'Momentum glide', text: `Velocity decays for a natural flick.` },
      { title: 'Edge clamping', text: `Never scrolls past the first or last tile.` },
      { title: 'Catch mid-flight', text: `A new press cancels the running glide.` },
      { title: 'Edge fade mask', text: `Tiles dissolve at the row's ends.` },
      { title: 'Grab cursors', text: `grab/grabbing signal draggability.` },
      { title: 'Keyboard nudge', text: `Arrow keys move by one tile width.` },
    ],
    useCases: [
      { title: 'Media shelves', text: `Build a streaming-style [recently viewed carousel](/ui-snippets/recently-viewed-carousel/).` },
      { title: 'Product rails', text: `Browse items beside a [product card](/ui-snippets/product-card/) grid.` },
      { title: 'Image galleries', text: `Pair with an [Instagram gallery](/ui-snippets/instagram-gallery/).` },
      { title: 'Category browsing', text: `Flick through a [chip filter](/ui-snippets/chip-filter/) of sections.` },
      { title: 'Dashboards', text: `Scroll a row of [metric card grid](/ui-snippets/metric-card-grid/) widgets.` },
      { title: 'Drag-scroll demos', text: `A reference for momentum flick scrolling.` },
      { icon: 'CODE', title: 'Related: Floating Share Dock', desc: 'See the [Floating Share Dock](/ui-snippets/floating-share-dock/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use Pointer Events instead of mouse and touch handlers?', a: `Pointer Events unify mouse, touch, and pen into one API, so a single set of pointerdown/move/up handlers drives both desktop dragging and mobile swiping. setPointerCapture also keeps the row receiving move events even if the pointer drifts off the element mid-drag, which separate mouse/touch code makes awkward.` },
      { q: 'How does the momentum flick work?', a: `During the drag, each move records the per-frame cursor delta as velocity. On release, a glide loop keeps translating the track by that velocity while multiplying it by 0.93 each frame, so it decays exponentially and coasts to a stop — like flicking a physical shelf. The loop ends when velocity falls below a small threshold.` },
      { q: 'How does it stop cleanly at the edges?', a: `The scrollable range is 0 to a negative minimum equal to the row width minus the track width. Every position update — from dragging or from momentum — passes through a clamp to that range, so the content can never be pushed past its first or last tile. A resize listener recomputes the bounds and re-clamps when the viewport changes.` },
      { q: 'Is it usable without a mouse?', a: `Yes. The row is focusable with a visible focus ring, and Arrow Left/Right nudge it by one tile width, so keyboard users can browse it. It also carries an aria-label describing it as a draggable gallery. A drag-only carousel would exclude keyboard users, so the arrow support matters for accessibility.` },
      { q: 'How do I use this drag scroll row in React, Vue, or Angular?', a: `Render the tiles from data and keep position, velocity, and dragging in refs (not state) so dragging doesn't re-render. Attach the pointer and keydown handlers in a mount effect with cleanup, using refs for the row and track. The momentum loop lives in the same effect. The CSS, including the edge mask, ports directly; in Tailwind use overflow-hidden with an arbitrary mask-image.` },
    ],
    aiPrompt: {
      paragraph: `Rather than reasoning through the physics yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why multiplying vel by 0.93 every animation frame inside glide() produces a natural-feeling deceleration, and how bounds() combined with clamp() guarantees the track can never be dragged or flung past its first or last tile. The same assistant can help optimize it, for instance checking whether recomputing bounds() on every resize event is sufficient or whether it should also rerun after images/tiles finish loading and change the track's scrollWidth. It's also useful for extending the row: ask it to snap to the nearest tile boundary when the glide settles instead of stopping at an arbitrary offset, add visible scroll-position dots below the row, or support mouse-wheel horizontal scrolling as an additional input alongside drag and arrow keys. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a horizontally draggable media row with momentum scrolling in plain HTML, CSS, and JavaScript using the Pointer Events API — no carousel library.

Requirements:
- A row container with overflow hidden and a horizontal mask-image gradient that fades tiles out near the left and right edges, containing an inner track element that holds all the tiles and is moved purely with a CSS transform: translateX, never by changing scrollLeft.
- Use pointerdown, pointermove, pointerup, and pointercancel (not separate mouse and touch listeners) so one code path handles both mouse dragging and touch swiping, calling setPointerCapture on pointerdown so the drag keeps tracking even if the pointer leaves the row's bounds.
- While dragging, compute the track's new translateX from the drag start position plus the cursor delta, clamped so the track can never be dragged further right than 0 or further left than the negative difference between the track's scroll width and the row's visible width.
- On pointer release, do not stop immediately: track the cursor's per-frame velocity during the drag, and on release run a requestAnimationFrame loop that keeps moving the track by the current velocity while multiplying that velocity by a decay factor (around 0.93) every frame, stopping the loop once velocity drops below a small threshold, and clamping every position update through the same bounds check used during dragging.
- If a new pointerdown occurs while a momentum glide is still animating, cancel the in-progress requestAnimationFrame so the drag can immediately take over from the row's current position.
- Make the row keyboard accessible: give it tabindex and a visible focus style, and handle ArrowLeft/ArrowRight keydown events to nudge the translateX by one tile's width (including its gap) through the same clamped positioning logic used by dragging and momentum.
- Recompute the scrollable bounds and re-clamp the current position on window resize so the row never ends up in an invalid, out-of-range position after a viewport change.`,
    },
  },
};

export default dragScrollRow;
