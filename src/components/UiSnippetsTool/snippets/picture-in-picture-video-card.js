const pictureInPictureVideoCard = {
  id: 'picture-in-picture-video-card',
  title: 'Picture-in-Picture Video Card',
  lastmod: '2026-08-08',
  category: 'media',
  html: `<div class="pip-stage" id="pip-stage">
  <div class="pip-backdrop">
    <div class="pip-hint">Drag the player anywhere — release it and watch it snap to the nearest corner</div>
  </div>

  <div class="pip-player" id="pip-player">
    <div class="pip-video">
      <div class="pip-gradient"></div>
      <div class="pip-caption">Live Demo</div>
    </div>
    <div class="pip-controls">
      <button class="pip-btn" id="pip-minimize-btn" aria-label="Minimize">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>
      </button>
      <button class="pip-btn" id="pip-close-btn" aria-label="Close">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></svg>
      </button>
    </div>
    <div class="pip-bubble" id="pip-bubble" aria-label="Expand">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    </div>
  </div>

  <div class="pip-toast" id="pip-toast">
    <span>Video closed</span>
    <button class="pip-undo" id="pip-undo-btn">Undo</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.pip-stage { position: relative; width: 340px; height: 480px; background: #eef1f8; border-radius: 20px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.06); }
.pip-backdrop { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; padding: 46px; }
.pip-hint { font-size: 12.5px; color: #94a3b8; text-align: center; line-height: 1.6; }

.pip-player {
  position: absolute; top: 20px; left: 20px; width: 150px; height: 96px;
  border-radius: 12px; overflow: hidden; box-shadow: 0 10px 28px rgba(15,23,42,0.28);
  cursor: grab; touch-action: none; z-index: 20; background: #0f172a;
}
.pip-player.dragging { cursor: grabbing; box-shadow: 0 16px 40px rgba(15,23,42,0.4); }
.pip-player.snapping { transition: left 0.38s cubic-bezier(0.22,0.68,0,1.1), top 0.38s cubic-bezier(0.22,0.68,0,1.1); }
.pip-player.minimized { width: 56px; height: 56px; border-radius: 50%; }
.pip-player.minimized.snapping { transition: left 0.38s cubic-bezier(0.22,0.68,0,1.1), top 0.38s cubic-bezier(0.22,0.68,0,1.1), width 0.28s ease, height 0.28s ease, border-radius 0.28s ease; }
.pip-player.flying { transition: transform 0.42s cubic-bezier(0.5,0,1,0.6), opacity 0.42s ease; }

.pip-video { position: absolute; inset: 0; }
.pip-gradient { position: absolute; inset: 0; background: linear-gradient(135deg, #818cf8, #6366f1 45%, #c084fc); animation: pip-shift 6s ease-in-out infinite alternate; }
@keyframes pip-shift { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(35deg); } }
.pip-caption { position: absolute; left: 8px; bottom: 6px; font-size: 10px; font-weight: 700; color: rgba(255,255,255,0.9); text-shadow: 0 1px 4px rgba(0,0,0,0.4); }
.pip-player.minimized .pip-caption, .pip-player.minimized .pip-controls { display: none; }

.pip-controls { position: absolute; top: 4px; right: 4px; display: flex; gap: 4px; opacity: 0; transition: opacity 0.15s; }
.pip-player:hover .pip-controls { opacity: 1; }
.pip-btn { width: 20px; height: 20px; border-radius: 50%; background: rgba(15,23,42,0.55); border: none; color: #fff; display: flex; align-items: center; justify-content: center; cursor: pointer; }
.pip-btn:hover { background: rgba(15,23,42,0.8); }

.pip-bubble { position: absolute; inset: 0; display: none; align-items: center; justify-content: center; color: #fff; background: linear-gradient(135deg, #818cf8, #6366f1); }
.pip-player.minimized .pip-bubble { display: flex; }

.pip-toast {
  position: absolute; left: 50%; bottom: -60px; transform: translateX(-50%);
  display: flex; align-items: center; gap: 12px; background: #0f172a; color: #fff;
  padding: 10px 16px; border-radius: 10px; font-size: 12.5px; box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: bottom 0.32s cubic-bezier(0.22,0.68,0,1.1); z-index: 30; white-space: nowrap;
}
.pip-toast.show { bottom: 18px; }
.pip-undo { background: transparent; border: none; color: #a5b4fc; font-weight: 700; font-size: 12.5px; cursor: pointer; padding: 2px 4px; }
.pip-undo:hover { color: #c7d2fe; }`,
  js: `const stage = document.getElementById('pip-stage');
const player = document.getElementById('pip-player');
const minimizeBtn = document.getElementById('pip-minimize-btn');
const closeBtn = document.getElementById('pip-close-btn');
const bubble = document.getElementById('pip-bubble');
const toast = document.getElementById('pip-toast');
const undoBtn = document.getElementById('pip-undo-btn');

const MARGIN = 12;         // gap kept from the stage edges when snapping to a corner
const FLICK_VELOCITY = 0.6; // px/ms - dragging faster than this toward an edge triggers dismiss
const FLICK_DISTANCE = 90;  // px - or dragging this far past the edge also triggers dismiss

let dragging = false;
let minimized = false;
let pointerId = null;
let startX = 0, startY = 0;      // pointer position at pointerdown, relative to stage
let playerStartX = 0, playerStartY = 0; // player's left/top at pointerdown
let lastX = 0, lastY = 0, lastT = 0;    // for instantaneous velocity tracking
let velocityX = 0, velocityY = 0;
let toastTimer = null;
let lastPosition = null; // remembers left/top before a dismiss, for Undo

function stageRect() { return stage.getBoundingClientRect(); }
function playerSize() {
  const w = player.offsetWidth, h = player.offsetHeight;
  return { w, h };
}

function onPointerDown(e) {
  if (e.target === minimizeBtn || e.target === closeBtn || e.target.closest('.pip-btn')) return;
  dragging = true;
  pointerId = e.pointerId;
  player.setPointerCapture(pointerId);
  player.classList.remove('snapping', 'flying');
  player.classList.add('dragging');

  const rect = stageRect();
  startX = e.clientX - rect.left;
  startY = e.clientY - rect.top;
  playerStartX = player.offsetLeft;
  playerStartY = player.offsetTop;
  lastX = e.clientX;
  lastY = e.clientY;
  lastT = performance.now();
  velocityX = 0;
  velocityY = 0;
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  const rect = stageRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  const dx = x - startX;
  const dy = y - startY;

  player.style.left = (playerStartX + dx) + 'px';
  player.style.top = (playerStartY + dy) + 'px';

  const now = performance.now();
  const dt = Math.max(1, now - lastT);
  // Instantaneous velocity in px/ms, used only to decide a flick-dismiss on release.
  velocityX = (e.clientX - lastX) / dt;
  velocityY = (e.clientY - lastY) / dt;
  lastX = e.clientX;
  lastY = e.clientY;
  lastT = now;
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  dragging = false;
  player.releasePointerCapture(pointerId);
  player.classList.remove('dragging');

  if (shouldDismiss()) {
    dismiss(velocityX, velocityY);
    return;
  }
  snapToNearestCorner();
}

// ---- Flick-to-dismiss: velocity or distance past an edge ----
function shouldDismiss() {
  const rect = stageRect();
  const { w, h } = playerSize();
  const left = player.offsetLeft;
  const top = player.offsetTop;
  const speed = Math.hypot(velocityX, velocityY);

  const pastLeft = left < -FLICK_DISTANCE;
  const pastRight = left + w > rect.width + FLICK_DISTANCE;
  const pastTop = top < -FLICK_DISTANCE;
  const pastBottom = top + h > rect.height + FLICK_DISTANCE;
  const pastAnyEdge = pastLeft || pastRight || pastTop || pastBottom;

  const fastEnough = speed > FLICK_VELOCITY;
  // Only count "fast" as a dismiss if the motion is also heading toward an edge
  // the player is already near, so a fast flick back toward the center never
  // accidentally closes the player.
  const nearLeftEdge = left < rect.width * 0.25;
  const nearRightEdge = left + w > rect.width * 0.75;
  const nearTopEdge = top < rect.height * 0.25;
  const nearBottomEdge = top + h > rect.height * 0.75;
  const headingOut =
    (nearLeftEdge && velocityX < -FLICK_VELOCITY) ||
    (nearRightEdge && velocityX > FLICK_VELOCITY) ||
    (nearTopEdge && velocityY < -FLICK_VELOCITY) ||
    (nearBottomEdge && velocityY > FLICK_VELOCITY);

  return pastAnyEdge || (fastEnough && headingOut);
}

// ---- Corner snap: compute distance to each of the 4 corners, pick nearest ----
function snapToNearestCorner() {
  const rect = stageRect();
  const { w, h } = playerSize();
  const left = player.offsetLeft;
  const top = player.offsetTop;
  const cx = left + w / 2;
  const cy = top + h / 2;

  const corners = [
    { left: MARGIN, top: MARGIN },                                   // top-left
    { left: rect.width - w - MARGIN, top: MARGIN },                  // top-right
    { left: MARGIN, top: rect.height - h - MARGIN },                 // bottom-left
    { left: rect.width - w - MARGIN, top: rect.height - h - MARGIN } // bottom-right
  ];

  let best = corners[0];
  let bestDist = Infinity;
  corners.forEach(c => {
    const ccx = c.left + w / 2;
    const ccy = c.top + h / 2;
    const dist = Math.hypot(cx - ccx, cy - ccy);
    if (dist < bestDist) { bestDist = dist; best = c; }
  });

  player.classList.add('snapping');
  player.style.left = best.left + 'px';
  player.style.top = best.top + 'px';
}

function toggleMinimize(e) {
  if (e) e.stopPropagation();
  minimized = !minimized;
  const rect = stageRect();
  const beforeLeft = player.offsetLeft, beforeTop = player.offsetTop;
  player.classList.toggle('minimized', minimized);
  player.classList.add('snapping');
  // Re-clamp position so the (now differently sized) player stays fully on stage.
  requestAnimationFrame(() => {
    const { w, h } = playerSize();
    const clampedLeft = Math.min(Math.max(beforeLeft, MARGIN), rect.width - w - MARGIN);
    const clampedTop = Math.min(Math.max(beforeTop, MARGIN), rect.height - h - MARGIN);
    player.style.left = clampedLeft + 'px';
    player.style.top = clampedTop + 'px';
  });
}

function dismiss(vx, vy) {
  lastPosition = { left: player.offsetLeft, top: player.offsetTop, minimized };
  const angle = Math.atan2(vy, vx) || Math.random() * Math.PI * 2 - Math.PI;
  const flyX = Math.cos(angle) * 600 + (vx * 300);
  const flyY = Math.sin(angle) * 600 + (vy * 300);

  player.classList.add('flying');
  player.style.transform = 'translate(' + flyX + 'px,' + flyY + 'px) scale(0.5)';
  player.style.opacity = '0';

  setTimeout(() => {
    player.style.display = 'none';
    showToast();
  }, 420);
}

function showToast() {
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 4000);
}

function undoDismiss() {
  clearTimeout(toastTimer);
  toast.classList.remove('show');
  if (!lastPosition) return;
  player.classList.remove('flying');
  player.style.transform = 'none';
  player.style.opacity = '1';
  player.style.display = '';
  player.style.left = lastPosition.left + 'px';
  player.style.top = lastPosition.top + 'px';
  minimized = lastPosition.minimized;
  player.classList.toggle('minimized', minimized);
}

player.addEventListener('pointerdown', onPointerDown);
player.addEventListener('pointermove', onPointerMove);
player.addEventListener('pointerup', onPointerUp);
player.addEventListener('pointercancel', onPointerUp);
minimizeBtn.addEventListener('click', toggleMinimize);
bubble.addEventListener('click', toggleMinimize);
closeBtn.addEventListener('click', (e) => { e.stopPropagation(); dismiss(0, 0.8); });
undoBtn.addEventListener('click', undoDismiss);

// Initial placement: top-right corner.
requestAnimationFrame(() => {
  const rect = stageRect();
  const { w } = playerSize();
  player.style.left = (rect.width - w - MARGIN) + 'px';
  player.style.top = MARGIN + 'px';
});`,
  seo: {
    title: 'Picture-in-Picture Video Card — Free HTML CSS JS Snippet',
    description: 'A draggable PiP player that snaps to the nearest corner on release, with flick-to-dismiss and undo. Exports to React, Vue & Angular.',
    about: {
      title: 'Picture-in-Picture Video Card — Draggable Corner-Snapping Mini Player With Flick-to-Dismiss, in Vanilla JS',
      description: `YouTube, Google Meet, FaceTime, and most video-call apps all share the same floating mini-player pattern: a small video window you can drag anywhere on screen, that automatically snaps itself to whichever corner it ended up closest to once you let go, and that you can flick toward an edge to dismiss entirely. None of that behavior comes from a native browser API for free — the real \`document.pictureInPicture\` API only gives you an OS-level floating window with no custom drag physics or corner-snap logic at all. This snippet rebuilds the *interaction design* of picture-in-picture entirely in userland: pointer events for dragging, a nearest-corner distance calculation for the snap, and a velocity-based threshold for the dismiss gesture.

**Tracking the drag with pointer events, not mouse events**

The player listens for \`pointerdown\`, \`pointermove\`, and \`pointerup\` rather than the older \`mousedown\`/\`mousemove\`/\`mouseup\` trio, because pointer events unify mouse, touch, and pen input behind one API — the same code drags correctly whether you are using a trackpad or a phone screen. \`setPointerCapture(pointerId)\` is called on \`pointerdown\`, which is the detail most drag implementations skip: it guarantees that subsequent \`pointermove\` and \`pointerup\` events keep firing on the player element even if the pointer moves faster than the browser can track and briefly leaves the element's bounds mid-drag — without it, a fast drag can "lose" the element and stop responding.

**The corner-snap distance math**

\`snapToNearestCorner()\` is the heart of the interaction. On release, it computes the player's current center point, builds an array of the four candidate corner positions (each already inset by \`MARGIN\` pixels and, critically, accounting for the player's own width and height so the bottom-right and bottom-left corners are anchored by the player's far edge, not its top-left origin), then loops over all four computing \`Math.hypot(cx - cornerCenterX, cy - cornerCenterY)\` — literally the straight-line Euclidean distance from the player's center to each corner's would-be center. Whichever corner produces the smallest distance is the target; a CSS \`transition\` on \`left\`/\`top\` (only added via the \`.snapping\` class at the moment of release, never during the drag itself) animates the move with an overshoot-flavored \`cubic-bezier\` curve so the snap feels alive rather than mechanical.

**The flick-to-dismiss velocity and distance thresholds**

Every \`pointermove\` computes an instantaneous velocity in pixels per millisecond by dividing the distance moved since the last event by the elapsed time (\`dt\`), continuously overwriting \`velocityX\`/\`velocityY\` so that by the time \`pointerup\` fires, those variables hold the true velocity of the final flick motion — not an average over the whole drag. \`shouldDismiss()\` then combines two independent signals: a **distance** check (has the player actually been dragged more than \`FLICK_DISTANCE\` pixels past the stage's edge already?) and a **velocity-plus-direction** check (is the player currently near an edge, and is it moving fast enough, *and in that edge's outward direction specifically*?). That direction qualifier is the detail that prevents false positives — without it, a fast flick from the top-left corner back toward the center of the screen would trigger a dismiss simply because the speed was high, even though the user was clearly moving the player further onto the stage, not off it.

**Why a dismissed player gets an undo toast instead of vanishing silently**

A flick gesture is easy to trigger by accident, especially on touch, and losing a floating video player with no way to get it back is a frustrating dead end — the same reason Gmail's "Archive" and most delete actions surface an undo toast instead of committing instantly. \`dismiss()\` saves the player's exact position and minimized state into \`lastPosition\` before animating it off-screen, and the toast's Undo button calls \`undoDismiss()\`, which restores the saved position, clears the fly-away transform, and re-displays the player exactly as it was — a full round trip, not just a re-show.

**Minimize/expand and re-clamping to the stage**

\`toggleMinimize()\` swaps the player between its full mini-player size and a small circular bubble via the \`.minimized\` class. Because the bubble is much smaller than the full player, simply keeping the same \`left\`/\`top\` could leave it not snapped to any edge cleanly, so after the size change is applied, the function re-clamps the position on the next animation frame using the corner's known margin bounds, keeping the toggle visually anchored near where it already was rather than jumping unexpectedly.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'See the mini player start in the top-right corner', text: 'A small floating video window with an animated gradient background sits pinned near the top-right of the stage, with hover-revealed minimize and close controls.' },
      { title: 'Drag the player anywhere with your mouse or finger', text: 'Press and hold on the player and move it freely — it tracks your pointer exactly using pointer events, so it works identically with mouse, trackpad, and touch input.' },
      { title: 'Release it and watch it snap to the nearest corner', text: 'The moment you let go, the player animates smoothly to whichever of the four corners its center point was closest to, using an eased overshoot transition rather than a linear snap.' },
      { title: 'Click the minimize button (or the bubble) to collapse it', text: 'The full mini-player collapses into a small circular bubble with a play icon, then re-clamps its position so it stays fully visible near where it was.' },
      { title: 'Drag it quickly toward any edge and release', text: 'If your flick is fast enough and heading outward, or if you drag it far enough past the stage boundary, the player animates flying off-screen and disappears, simulating a dismiss gesture.' },
      { title: 'Click "Undo" on the toast that appears', text: 'A "Video closed" toast slides up from the bottom with an Undo button — clicking it restores the player to its exact previous position and size instead of leaving it gone for good.' },
    ]},
    features: [
      'Full pointer-event drag (pointerdown/pointermove/pointerup) with setPointerCapture for reliable fast-drag tracking',
      'Nearest-corner snap computed via Math.hypot distance to all 4 candidate corners on every release',
      'CSS transition only applied via a .snapping class at release time, never during active dragging',
      'Real per-move velocity tracking (px/ms) used to distinguish a flick from a slow drag on release',
      'Direction-aware flick-dismiss: requires both sufficient speed AND outward heading near an edge, avoiding false positives',
      'Minimize/expand toggle between full mini-player and a compact circular bubble, with position re-clamping',
      'Flick-to-dismiss animates the player flying off along the release velocity vector, not a generic fade',
      '"Video closed" undo toast that restores the exact prior position, size, and minimized state',
    ],
    useCases: [
      { icon: 'APP', title: 'Video call and conferencing mini-player UI', desc: 'The exact pattern used by Google Meet, Zoom, and FaceTime for a self-view or floating participant tile — pairs naturally with a [video call grid](/ui-snippets/video-call-grid) for the full-screen layout underneath it.' },
      { icon: 'MEDIA', title: 'Streaming and media players with a floating "keep watching" mode', desc: 'The same drag-snap-dismiss interaction powers YouTube\'s in-app mini player and most OTT streaming apps\' floating video mode while browsing other content.' },
      { icon: 'LEARN', title: 'Teaching pointer-based drag physics and gesture thresholds', desc: 'A concrete, inspectable reference for corner-snap distance math and velocity-based gesture detection, both patterns that reappear in swipeable cards like [swipe cards](/ui-snippets/swipe-cards) and [swipe delete list](/ui-snippets/swipe-delete-list).' },
      { icon: 'DESIGN', title: 'Floating widget and helper-bubble UI patterns', desc: 'Adapt the same drag-and-snap mechanics for a floating help bubble, a draggable chat launcher, or a movable [notification bell](/ui-snippets/notification-bell) that should never overlap key content.' },
      { icon: 'CODE', title: 'Portfolio pieces demonstrating gesture-driven interaction design', desc: 'A polished demonstration of real pointer physics and threshold-based gesture recognition, distinct from simpler drag demos that just follow the cursor with no release behavior at all.' },
      { icon: 'CODE', title: 'Related: Mobile Settings Screen', desc: 'See the [Mobile Settings Screen](/ui-snippets/mobile-settings-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use pointer events instead of separate mouse and touch event handlers?', a: 'Pointer events (pointerdown/pointermove/pointerup) are a single unified API that fires consistently for mouse, touch, and pen input, so one set of listeners handles every device instead of maintaining parallel mousedown/touchstart and mousemove/touchmove handlers with different coordinate properties. setPointerCapture also solves a real bug that plain mouse events have: without it, a fast drag can move the pointer outside the element between two event frames and silently stop receiving move events, which pointer capture prevents by locking all subsequent events to the original target regardless of where the pointer physically travels.' },
      { q: 'How exactly does the corner-snap distance calculation work?', a: 'On release, the code computes the player\'s current center point, builds an array of the four corner target positions (each accounting for the player\'s own width and height so the right and bottom corners are correctly anchored), and for each one computes Math.hypot(centerX - cornerCenterX, centerY - cornerCenterY) — the straight-line distance formula. The corner with the smallest resulting distance is chosen as the snap target, and a CSS transition (added only at this moment via a .snapping class) animates left and top to that corner\'s coordinates.' },
      { q: 'What exactly triggers the flick-to-dismiss versus a normal corner snap?', a: 'Two independent conditions are checked on release: whether the player has already been dragged more than a fixed pixel distance past any stage edge, or whether it is both currently near an edge (within the outer quarter of the stage on that side) and moving fast enough in that edge\'s outward direction, measured from the actual pointer velocity captured during the last few move events. Requiring the direction to match the nearby edge specifically prevents a fast flick back toward the center of the stage from accidentally triggering a dismiss.' },
      { q: 'Can I use this picture-in-picture card in React, Vue, or Angular?', a: 'Yes. Keep the drag state (dragging, start coordinates, velocity) in refs rather than component state since they update on every pointermove and do not need to trigger re-renders, and attach the pointerdown/pointermove/pointerup listeners inside a useEffect (React), onMounted (Vue), or ngAfterViewInit (Angular) that runs after the player element exists in the DOM. Remove the listeners, and clear any pending setTimeout from the dismiss/undo flow, in the corresponding cleanup function (useEffect\'s return, onUnmounted, or ngOnDestroy) so a drag in progress cannot keep firing into an unmounted component.' },
      { q: 'How do I make the player snap to more than just the 4 corners, like the middle of each edge too?', a: 'Extend the corners array inside snapToNearestCorner() with additional candidate positions — for example, add mid-top ({ left: (rect.width - w) / 2, top: MARGIN }) and the equivalent for the bottom, left, and right edges. The nearest-distance logic already loops over whatever is in that array and picks the closest one using the same Math.hypot comparison, so no other part of the snap logic needs to change; you are only expanding the candidate list it chooses from.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JS to an AI assistant like Claude and ask it to trace through why shouldDismiss() checks both distance-past-edge and velocity-with-direction rather than relying on speed alone — that combination is what prevents a fast flick toward the center from accidentally closing the player, and it's easy to miss on a first read. It's also worth asking whether tracking velocity from consecutive pointermove events (as this snippet does) is noisier than sampling over a short rolling window, and what tradeoff that would introduce. For extending it: ask for snap targets at the midpoints of each edge in addition to the four corners, a settings panel that lets the snap margin and flick threshold be tuned live, or swapping the placeholder gradient for a real muted <video> element with its own play/pause state.`,
      prompt: `Build a draggable picture-in-picture style floating video player in plain HTML, CSS, and JavaScript using pointer events, no libraries.

Requirements:
- A small floating player window (video content can be a simple animated gradient placeholder) that the user can freely drag anywhere within a bounded container using pointerdown/pointermove/pointerup with setPointerCapture, working for both mouse and touch.
- On pointer release, compute the straight-line distance from the player's current center to each of the container's 4 corners, and animate the player to whichever corner is closest using a CSS transition added only at release time (never during the active drag).
- Track real pointer velocity (pixels per millisecond) throughout the drag from consecutive pointermove events.
- Implement a flick-to-dismiss gesture: on release, if the player is either dragged far enough past the container's edge, or is near an edge and moving fast enough specifically in that edge's outward direction, animate it flying off-screen along the release velocity direction and hide it — a fast flick back toward the center must NOT trigger a dismiss.
- Show a small "Video closed" toast with an Undo button after a dismiss; clicking Undo must restore the player to its exact prior position, size, and minimized state, not just make a new player reappear at a default position.
- Include a minimize/expand toggle that swaps the full player for a small circular bubble and re-clamps its position so it stays fully inside the container after the size change.`,
    },
  },
};

export default pictureInPictureVideoCard;
