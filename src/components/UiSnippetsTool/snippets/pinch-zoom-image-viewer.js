const pinchZoomImageViewer = {
  id: 'pinch-zoom-image-viewer',
  title: 'Pinch & Scroll Zoom Image Viewer',
  lastmod: '2026-08-23',
  category: 'media',
  cdnUrls: [],
  html: `<div class="pz-wrap">
  <div class="pz-stage" id="pzStage">
    <div class="pz-canvas" id="pzCanvas">
      <img class="pz-img" id="pzImg" src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=70&auto=format&fit=crop" alt="Mountain landscape" draggable="false">
    </div>
    <div class="pz-badge" id="pzBadge">100%</div>
  </div>
  <div class="pz-bar">
    <p class="pz-hint">Pinch with two fingers, scroll to zoom, or drag while zoomed in</p>
    <button type="button" class="pz-reset" id="pzReset">Reset zoom</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f16;color:#e5e7eb;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:20px}

.pz-wrap{width:100%;max-width:560px}
.pz-stage{position:relative;border-radius:16px;overflow:hidden;border:1px solid #232838;background:#05070c;aspect-ratio:4/3;touch-action:none;cursor:grab}
.pz-stage.dragging{cursor:grabbing}
.pz-canvas{width:100%;height:100%;transform-origin:0 0;will-change:transform}
.pz-img{width:100%;height:100%;object-fit:cover;user-select:none;-webkit-user-select:none;pointer-events:none}
.pz-badge{position:absolute;top:10px;right:10px;background:rgba(0,0,0,.55);backdrop-filter:blur(4px);color:#fff;font-size:11.5px;font-weight:700;padding:5px 10px;border-radius:999px;font-variant-numeric:tabular-nums}

.pz-bar{display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:12px;flex-wrap:wrap}
.pz-hint{font-size:12px;color:#8b93a7;flex:1;min-width:200px}
.pz-reset{border:1px solid #2c3346;background:#161b28;color:#cbd3e6;font:700 12.5px system-ui;padding:9px 16px;border-radius:9px;cursor:pointer;white-space:nowrap}
.pz-reset:hover{background:#1e2536}`,

  js: `var stage = document.getElementById('pzStage');
var canvas = document.getElementById('pzCanvas');
var badge = document.getElementById('pzBadge');
var resetBtn = document.getElementById('pzReset');

var MIN_SCALE = 1, MAX_SCALE = 4;
var scale = 1, tx = 0, ty = 0;

function apply() {
  canvas.style.transform = 'translate(' + tx + 'px,' + ty + 'px) scale(' + scale + ')';
  badge.textContent = Math.round(scale * 100) + '%';
}

function clampPan() {
  var rect = stage.getBoundingClientRect();
  var maxX = 0, minX = -(rect.width * scale - rect.width);
  var maxY = 0, minY = -(rect.height * scale - rect.height);
  tx = Math.min(maxX, Math.max(minX, tx));
  ty = Math.min(maxY, Math.max(minY, ty));
}

function zoomAt(clientX, clientY, nextScale) {
  var rect = stage.getBoundingClientRect();
  var px = clientX - rect.left, py = clientY - rect.top;
  var clamped = Math.min(MAX_SCALE, Math.max(MIN_SCALE, nextScale));
  // Keep the point under the cursor/pinch-midpoint stationary while the scale changes.
  var ratio = clamped / scale;
  tx = px - (px - tx) * ratio;
  ty = py - (py - ty) * ratio;
  scale = clamped;
  if (scale === MIN_SCALE) { tx = 0; ty = 0; }
  clampPan();
  apply();
}

// --- Mouse wheel zoom (desktop) ---
stage.addEventListener('wheel', function (e) {
  e.preventDefault();
  var delta = -e.deltaY * 0.0016;
  zoomAt(e.clientX, e.clientY, scale * (1 + delta));
}, { passive: false });

// --- Drag to pan when zoomed in (mouse) ---
var dragging = false, lastX = 0, lastY = 0;
stage.addEventListener('mousedown', function (e) {
  if (scale <= MIN_SCALE) return;
  dragging = true;
  stage.classList.add('dragging');
  lastX = e.clientX; lastY = e.clientY;
});
window.addEventListener('mousemove', function (e) {
  if (!dragging) return;
  tx += e.clientX - lastX;
  ty += e.clientY - lastY;
  lastX = e.clientX; lastY = e.clientY;
  clampPan();
  apply();
});
window.addEventListener('mouseup', function () { dragging = false; stage.classList.remove('dragging'); });

// --- Real touch pinch-to-zoom + single-finger pan ---
var pinch = null; // { startDist, startScale, midX, midY }
var pan = null;   // { x, y }

function touchDist(t0, t1) {
  var dx = t0.clientX - t1.clientX, dy = t0.clientY - t1.clientY;
  return Math.sqrt(dx * dx + dy * dy);
}
function touchMid(t0, t1) {
  return { x: (t0.clientX + t1.clientX) / 2, y: (t0.clientY + t1.clientY) / 2 };
}

stage.addEventListener('touchstart', function (e) {
  if (e.touches.length === 2) {
    pan = null;
    var mid = touchMid(e.touches[0], e.touches[1]);
    pinch = { startDist: touchDist(e.touches[0], e.touches[1]), startScale: scale, midX: mid.x, midY: mid.y };
  } else if (e.touches.length === 1 && scale > MIN_SCALE) {
    pinch = null;
    pan = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }
}, { passive: true });

stage.addEventListener('touchmove', function (e) {
  if (pinch && e.touches.length === 2) {
    // Real finger-distance-ratio math: how far apart the two fingers currently
    // are, divided by how far apart they were when the pinch began, scales
    // the image proportionally — the actual pinch-to-zoom gesture, not a
    // simulated slider.
    e.preventDefault();
    var dist = touchDist(e.touches[0], e.touches[1]);
    var ratio = dist / pinch.startDist;
    var mid = touchMid(e.touches[0], e.touches[1]);
    zoomAt(mid.x, mid.y, pinch.startScale * ratio);
  } else if (pan && e.touches.length === 1) {
    e.preventDefault();
    var t = e.touches[0];
    tx += t.clientX - pan.x;
    ty += t.clientY - pan.y;
    pan.x = t.clientX; pan.y = t.clientY;
    clampPan();
    apply();
  }
}, { passive: false });

function endTouch(e) {
  if (e.touches.length < 2) pinch = null;
  if (e.touches.length < 1) pan = null;
}
stage.addEventListener('touchend', endTouch);
stage.addEventListener('touchcancel', endTouch);

resetBtn.addEventListener('click', function () {
  scale = 1; tx = 0; ty = 0;
  apply();
});

apply();`,

  seo: {
    title: 'Pinch & Scroll Zoom Image Viewer — Free Touch Pinch-Zoom Snippet',
    description: `An image viewer with real two-finger pinch-to-zoom on touch, mouse wheel zoom on desktop, and drag-to-pan when zoomed in — with clamped scale and a reset button. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Pinch & Scroll Zoom Image Viewer — Real Finger-Distance Math',
      description: `This viewer implements the actual pinch-to-zoom gesture you'd expect from a native photo app: two fingers on the glass, moving apart or together, scaling the image in real time — plus a mouse wheel equivalent for desktop and drag-to-pan once zoomed in. It's built in plain HTML, CSS, and vanilla JavaScript with no gesture library, tracking real \`touchstart\`/\`touchmove\`/\`touchend\` events and \`event.touches\`.

**Finger-distance ratio, not a fake slider**

When a second finger lands (\`e.touches.length === 2\`), the code records the starting distance between the two touch points with the Pythagorean theorem — \`Math.sqrt(dx*dx + dy*dy)\` — and the scale at that moment. On every subsequent \`touchmove\`, it recomputes the current distance and divides it by the starting distance: \`ratio = dist / pinch.startDist\`. Multiplying that ratio by the starting scale is the actual pinch math — fingers twice as far apart as when the gesture began means the image is scaled 2x from where it started. This is genuine two-finger tracking, not a decorative animation that plays regardless of finger movement.

**Zooming toward a fixed point**

Both the pinch and the wheel handler call a shared \`zoomAt(x, y, nextScale)\` that keeps whatever point is under the cursor (or the pinch midpoint) visually stationary as the scale changes. It does this by solving for the new translation: \`tx = px - (px - tx) * ratio\`, where \`ratio\` is the scale change. Without this, zooming would always scale around the image's top-left corner and the point you're actually pinching or scrolling over would drift away — the standard complaint with naive zoom implementations.

**Wheel zoom on desktop**

\`wheel\` events feed the same \`zoomAt\` function, converting \`deltaY\` into a small multiplicative scale change so scrolling up zooms in and down zooms out, at the cursor position — desktop users get the same "zoom toward what I'm pointing at" behavior touch users get from pinching.

**Drag-to-pan and clamped bounds**

Once \`scale > MIN_SCALE\`, both a single remaining touch and a mouse drag translate the image, with \`clampPan()\` constraining the translation so the image edges can never be dragged past the stage bounds — you can't pan into empty space. \`MIN_SCALE\`/\`MAX_SCALE\` similarly clamp every zoom operation (pinch, wheel, or the derived scale) so the image can neither shrink below its natural size nor blow up into a blurry mess.

**Customizing it**

Change \`MIN_SCALE\`/\`MAX_SCALE\`, swap the wheel sensitivity constant, or add double-tap-to-zoom by wiring a tap-timing check (see [double-tap to like](/ui-snippets/double-tap-like-burst/) for that exact detection pattern) into a call to \`zoomAt\`. Pair it with an [image magnifier](/ui-snippets/image-magnifier/) for a hover-based alternative, or an [image zoom card](/ui-snippets/image-zoom-card/) for a lighter-weight click-to-zoom.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An image renders inside a bounded, touch-friendly stage.` },
      { title: 'Pinch with two fingers', text: `The image scales in real time from the pinch midpoint.` },
      { title: 'Scroll the mouse wheel', text: `Desktop zooms toward the cursor position.` },
      { title: 'Drag while zoomed in', text: `Pan around the enlarged image, clamped to its edges.` },
      { title: 'Click Reset zoom', text: `Instantly returns to 100% and centered.` },
      { title: 'Tune the clamps', text: `Change MIN_SCALE, MAX_SCALE, and wheel sensitivity.` },
    ] },
    features: [
      { title: 'Real pinch detection', text: `Two-finger distance ratio drives the actual scale.` },
      { title: 'Zoom-to-point math', text: `The pinched or scrolled point stays visually fixed.` },
      { title: 'Wheel zoom parity', text: `Desktop scroll mirrors the touch pinch behavior.` },
      { title: 'Clamped scale', text: `MIN_SCALE/MAX_SCALE stop over- or under-zoom.` },
      { title: 'Bounded panning', text: `Drag can't pull the image past its own edges.` },
      { title: 'One-finger and mouse pan', text: `Both input types share the same clamp logic.` },
      { title: 'Live zoom badge', text: `A percentage readout tracks the current scale.` },
      { title: 'One-tap reset', text: `Instantly returns to 100% and centered.` },
    ],
    useCases: [
      { title: 'Product photo viewers', text: `Let shoppers inspect detail beyond an [image magnifier](/ui-snippets/image-magnifier/).` },
      { title: 'Photo galleries and lightboxes', text: `Add real zoom to a full-screen image view.` },
      { title: 'Map and diagram viewers', text: `Pinch and pan large diagrams or floor plans.` },
      { title: 'Document and scan previews', text: `Zoom into scanned pages or receipts on mobile.` },
      { title: 'Portfolio and design showcases', text: `Pair with an [image zoom card](/ui-snippets/image-zoom-card/) grid.` },
      { title: 'Learning multi-touch gestures', text: `A reference for real finger-distance pinch math.` },
      { icon: 'CODE', title: 'Related: Unsaved Changes Guard — Confirm Before Closing a Dirty Modal', desc: 'See the [Unsaved Changes Guard — Confirm Before Closing a Dirty Modal](/ui-snippets/unsaved-changes-modal-guard/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the pinch gesture actually compute zoom?', a: `When a second finger touches down, the code measures the distance between the two touch points using the Pythagorean theorem and stores it along with the current scale. On every touchmove with two fingers still down, it recomputes that distance and divides by the starting distance to get a ratio, then multiplies the starting scale by that ratio. Fingers twice as far apart as when the gesture began means the image is at 2x its starting scale — genuine two-finger tracking, not a canned animation.` },
      { q: 'Why does the image not drift when zooming?', a: `Both the pinch and wheel handlers call a shared zoomAt(x, y, scale) function that solves for the translation needed to keep the point under the cursor or pinch midpoint stationary as scale changes: tx = px - (px - tx) * ratio. Without this correction, every zoom would scale around the image's top-left corner, and whatever you were actually pinching or scrolling over would visibly slide away.` },
      { q: 'How does mouse wheel zoom mirror the touch pinch?', a: `The wheel event handler converts the scroll delta into a small multiplicative scale change and passes the cursor's clientX/clientY into the exact same zoomAt function the pinch gesture uses, so desktop scrolling zooms toward the cursor position with identical clamping and point-anchoring behavior as the touch gesture.` },
      { q: `Why can't I drag the image out of view?`, a: `clampPan() runs after every pan or zoom and constrains the translation so the scaled image's edges can never move past the stage's visible bounds — computed from the stage's actual rendered size and the current scale. This prevents dragging or zooming into empty space around the image.` },
      { q: 'How do I use this pinch-zoom viewer in React, Vue, or Angular?', a: `Keep scale, tx, and ty in refs (not state) since they change on every touchmove/wheel frame, and apply them via a transform style bound to the canvas ref in an effect or directly via ref.current.style. Attach the touch, wheel, and mouse listeners in a mount effect with { passive: false } where preventDefault is needed, and clean them up on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the pinch-distance math from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how measuring the distance between two touch points with the Pythagorean theorem, then dividing the current distance by the distance recorded when the pinch began, produces a scale ratio that genuinely tracks finger movement — and why zoomAt solves for a new translation rather than only changing the scale, to keep the pinched point visually fixed. The same assistant can help you optimize it, for instance asking whether the wheel handler's sensitivity constant should be adjusted for trackpad "pinch" gestures (which browsers report as ctrlKey wheel events) versus a physical mouse wheel. It's also useful for extending the viewer: ask it to add double-tap-to-zoom using tap-timing detection, momentum/inertia when releasing a drag, or a minimap indicator showing which portion of the zoomed image is currently visible. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "pinch & scroll zoom image viewer" in plain HTML, CSS, and JavaScript with real multi-touch pinch detection — no gesture library.

Requirements:
- An image inside a bounded, overflow-hidden stage container, rendered inside an inner wrapper element that receives all scale/translate transforms (never transform the image element or stage directly), with touch-action: none on the stage so gestures don't trigger page scroll/zoom.
- Real two-finger pinch-to-zoom: on touchstart with exactly two active touches (via event.touches), record the distance between the two touch points using the Pythagorean theorem and the current scale. On touchmove with two touches still down, recompute that distance, divide it by the starting distance to get a ratio, and multiply the starting scale by that ratio to get the new scale — this must be real finger-distance math, not a fixed animation or a simulated slider.
- A shared zoom-toward-a-point function used by both the pinch gesture and mouse wheel zoom: given a screen point and a target scale, it must solve for a new translation that keeps that exact point visually stationary as the scale changes (not just changing scale and letting the image drift).
- Mouse wheel support on desktop that calls the same zoom-toward-a-point function using the cursor position and the wheel's deltaY converted into a small scale multiplier, with preventDefault so the page itself doesn't scroll.
- Drag-to-pan once zoomed in past the minimum scale, supporting both a single remaining touch point and a mouse drag, translating the image by the pointer's movement delta.
- Clamp the scale between a minimum (the image's natural size) and a maximum, and clamp the pan translation on every pan/zoom so the image's edges can never be dragged or zoomed past the visible stage bounds.
- A visible zoom percentage readout that updates live, and a reset button that returns scale and translation to their initial values.`,
    },
  },
};

export default pinchZoomImageViewer;
