const dragToRevealPanel = {
  id: 'drag-to-reveal-panel',
  title: 'Drag to Reveal Side Panel',
  lastmod: '2026-08-23',
  category: 'navigation',
  cdnUrls: [],
  html: `<div class="drp-stage" id="drpStage">
  <div class="drp-content">
    <h2>Main content</h2>
    <p>Grab the tab on the left edge and drag it inward to reveal the panel. It follows your drag distance live \\u2014 release partway and it snaps fully open or fully closed.</p>
  </div>

  <div class="drp-panel" id="drpPanel">
    <h3>Side panel</h3>
    <p>Navigation, filters, or settings live here. Drag the handle back toward the edge to close it, or drag it inward again to fully open.</p>
    <ul>
      <li>Dashboard</li>
      <li>Projects</li>
      <li>Settings</li>
    </ul>
  </div>

  <button type="button" class="drp-handle" id="drpHandle" aria-label="Drag to reveal panel">
    <span class="drp-grip"></span>
  </button>

  <div class="drp-scrim" id="drpScrim"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f16;color:#e7e9f3}
.drp-stage{position:relative;width:100%;max-width:640px;height:400px;margin:26px auto;border-radius:16px;overflow:hidden;border:1px solid #232838;background:#12141f}

.drp-content{position:relative;z-index:1;height:100%;padding:32px;display:flex;flex-direction:column;justify-content:center;gap:10px}
.drp-content h2{font-size:21px}
.drp-content p{font-size:13.5px;color:#9aa0ba;line-height:1.6;max-width:400px}

.drp-panel{position:absolute;top:0;left:0;width:250px;height:100%;background:#181c2c;border-right:1px solid #2a2f45;padding:26px 22px;transform:translateX(-100%);z-index:3;box-shadow:14px 0 30px -10px rgba(0,0,0,.5)}
.drp-panel h3{font-size:16px;margin-bottom:8px}
.drp-panel p{font-size:12.5px;color:#9299b8;line-height:1.55;margin-bottom:14px}
.drp-panel ul{list-style:none;display:flex;flex-direction:column;gap:6px}
.drp-panel li{font-size:13px;font-weight:600;color:#c7cce3;background:#20253a;padding:9px 12px;border-radius:8px}

.drp-scrim{position:absolute;inset:0;background:rgba(0,0,0,.45);opacity:0;pointer-events:none;z-index:2;transition:opacity .1s linear}

.drp-handle{position:absolute;top:50%;left:0;width:22px;height:64px;margin-top:-32px;border:none;border-radius:0 10px 10px 0;background:#2a2f45;display:flex;align-items:center;justify-content:center;cursor:grab;touch-action:none;z-index:4;transition:background .15s}
.drp-handle:hover,.drp-handle.dragging{background:#3a4066}
.drp-handle.dragging{cursor:grabbing}
.drp-grip{width:3px;height:26px;border-radius:99px;background:#666e8f}
.drp-handle:hover .drp-grip,.drp-handle.dragging .drp-grip{background:#c7cce3}`,

  js: `var stage = document.getElementById('drpStage');
var panel = document.getElementById('drpPanel');
var handle = document.getElementById('drpHandle');
var scrim = document.getElementById('drpScrim');

var PANEL_WIDTH = 250;
var SNAP_THRESHOLD = 0.4; // fraction of panel width to decide open vs closed on release

var dragging = false;
var startX = 0;
var startOffset = 0; // -PANEL_WIDTH (closed) .. 0 (open), the panel's current translateX
var currentOffset = -PANEL_WIDTH;
var isOpen = false;

function applyOffset(offset, withTransition) {
  currentOffset = Math.min(0, Math.max(-PANEL_WIDTH, offset));
  panel.style.transition = withTransition ? 'transform .28s cubic-bezier(.2,.8,.3,1)' : 'none';
  panel.style.transform = 'translateX(' + currentOffset + 'px)';
  handle.style.transition = withTransition ? 'left .28s cubic-bezier(.2,.8,.3,1)' : 'none';
  handle.style.left = (currentOffset + PANEL_WIDTH) + 'px';
  var revealFraction = (currentOffset + PANEL_WIDTH) / PANEL_WIDTH; // 0..1
  scrim.style.opacity = revealFraction * 0.45;
  scrim.style.pointerEvents = revealFraction > 0.05 ? 'auto' : 'none';
}

function settle(open) {
  isOpen = open;
  applyOffset(open ? 0 : -PANEL_WIDTH, true);
}

function pointerX(e) {
  return e.touches ? e.touches[0].clientX : e.clientX;
}

function onDragStart(e) {
  dragging = true;
  handle.classList.add('dragging');
  startX = pointerX(e);
  startOffset = currentOffset;
  e.preventDefault();
}

// The panel's reveal amount tracks the live drag distance \\u2014 partial drags
// show a genuinely partial reveal, not a snapped toggle mid-gesture.
function onDragMove(e) {
  if (!dragging) return;
  var dx = pointerX(e) - startX;
  applyOffset(startOffset + dx, false);
}

function onDragEnd() {
  if (!dragging) return;
  dragging = false;
  handle.classList.remove('dragging');
  var revealFraction = (currentOffset + PANEL_WIDTH) / PANEL_WIDTH;
  settle(revealFraction > SNAP_THRESHOLD);
}

handle.addEventListener('mousedown', onDragStart);
handle.addEventListener('touchstart', onDragStart, { passive: false });
window.addEventListener('mousemove', onDragMove);
window.addEventListener('touchmove', onDragMove, { passive: false });
window.addEventListener('mouseup', onDragEnd);
window.addEventListener('touchend', onDragEnd);

scrim.addEventListener('click', function () { settle(false); });
handle.addEventListener('click', function (e) {
  // A quick tap (no meaningful drag) toggles the panel outright.
  if (Math.abs(currentOffset - startOffset) < 4) settle(!isOpen);
});

applyOffset(-PANEL_WIDTH, false);`,

  seo: {
    title: 'Drag to Reveal Side Panel — Free Edge-Drag JS Snippet',
    description: `A hidden side panel dragged open from an edge handle, tracking drag distance live and snapping fully open or closed based on a threshold on release. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Drag to Reveal Side Panel — Live Drag Distance, Snap on Release',
      description: `This is a genuine drag-to-reveal gesture, not a click-toggled sidebar — dragging the edge handle partway shows the panel partway revealed in real time, and releasing snaps it fully open or fully closed based on how far you dragged. It is a different mechanic from [drag-to-resize panels](/ui-snippets/drag-resize-panels/), which resizes two permanently-visible adjacent panes; here, one pane starts fully hidden and the drag's only job is to reveal or re-hide it.

**The offset is the single source of truth**

Exactly one number, \`currentOffset\`, drives everything: it ranges from \`-PANEL_WIDTH\` (fully hidden, panel translated completely off-screen) to \`0\` (fully revealed), and \`applyOffset()\` is the only function that ever sets it. It positions the panel's \`transform: translateX\`, moves the handle so it always sits at the panel's current right edge, and derives the scrim's opacity as \`revealFraction * 0.45\` — so the backdrop dims proportionally to how far the panel has been dragged, not in a separate step that could drift out of sync.

**Live tracking, not a toggle**

\`onDragMove\` computes \`dx\`, the distance moved since the drag started, and calls \`applyOffset(startOffset + dx, false)\` on every single pointer move — the \`false\` disables the CSS transition during the drag so the panel's position is pinned exactly to the pointer with no lag or easing, which is what makes a partial drag show a genuinely partial reveal rather than a threshold-triggered snap happening mid-gesture.

**Threshold-based snap on release**

\`onDragEnd\` computes how far open the panel is as a fraction (\`revealFraction\`) and compares it to \`SNAP_THRESHOLD\` (0.4): past 40% open, it settles fully open; short of that, it settles fully closed. \`settle()\` re-enables the transition (\`withTransition: true\`) so this final snap animates smoothly, unlike the frame-by-frame drag itself.

**A tap still works as a toggle**

If the handle receives a \`click\` with almost no actual drag distance, it toggles the panel outright — so the control works both as a drag gesture and as a conventional tap-to-toggle affordance, covering visitors who don't realize (or don't want) to drag.

**Customizing it**

Change \`PANEL_WIDTH\` and \`SNAP_THRESHOLD\`, move the handle and panel to the right edge by mirroring the transform math, or drop the scrim for a push-content layout instead of an overlay. Pair it with [swipe delete list](/ui-snippets/swipe-delete-list/) or [elastic drag slider](/ui-snippets/elastic-drag-slider/) for more drag-distance-driven interactions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: `Paste HTML, CSS, and JS`, text: `A hidden panel and edge handle render over the content.` },
      { title: `Drag the handle inward`, text: `The panel slides open live, tracking your drag distance.` },
      { title: `Release past the halfway point`, text: `It snaps fully open with an eased animation.` },
      { title: `Release before that`, text: `It snaps back fully closed instead.` },
      { title: `Tap the scrim or drag back`, text: `Either closes an open panel.` },
      { title: `Tune the feel`, text: `Change PANEL_WIDTH and SNAP_THRESHOLD.` },
    ] },
    features: [
      { title: `Single-offset source of truth`, text: `One value drives the panel, handle, and scrim.` },
      { title: `Live drag tracking`, text: `Partial drags show a genuinely partial reveal.` },
      { title: `Threshold-based snap`, text: `Release position decides open vs closed.` },
      { title: `Eased settle animation`, text: `Only the final snap transitions, not the live drag.` },
      { title: `Tap-to-toggle fallback`, text: `A near-zero drag still toggles the panel.` },
      { title: `Proportional scrim`, text: `Backdrop opacity tracks reveal fraction exactly.` },
      { title: `Unified mouse + touch`, text: `One pointerX() helper drives both input types.` },
      { title: `Click-outside close`, text: `Tapping the scrim closes an open panel.` },
    ],
    useCases: [
      { title: 'Mobile navigation drawers', text: 'Offer an edge-drag alternative to a hamburger menu, where dragging partway reveals the panel partway in real time.' },
      { title: 'Filter and settings panels', text: 'Reveal filters without a permanent sidebar, with a threshold on release deciding whether the panel snaps open or closed.' },
      { title: 'Notification trays', text: 'Drag open a tray instead of using a click-only button, with one offset value driving the panel, handle and scrim.' },
      { title: 'Resize panel contrast', text: 'Contrast with [drag resize panels](/ui-snippets/drag-resize-panels/), which keep a panel visible and change its size rather than revealing it.' },
      { title: 'Touch-first kiosk UIs', text: 'Provide a natural gesture for tablets and kiosks, transitioning only the final snap so live dragging stays responsive.' },
      { icon: 'CODE', title: 'Related: Floating Share Dock', desc: 'See the [Floating Share Dock](/ui-snippets/floating-share-dock/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does the panel track a partial drag instead of just toggling?`, a: `Every pointermove-equivalent event computes dx, the distance moved since the drag started, and calls applyOffset(startOffset + dx, false) with the transition disabled. Because this runs on every single move event with no threshold check in between, the panel's on-screen position is pinned exactly to wherever the pointer currently is — a drag stopped halfway genuinely shows the panel halfway revealed, not snapped to one state or the other mid-gesture.` },
      { q: `What decides whether it snaps open or closed on release?`, a: `onDragEnd computes revealFraction, the panel's current offset expressed as a 0-to-1 fraction of PANEL_WIDTH, and compares it against SNAP_THRESHOLD (0.4 by default). If more than 40% of the panel was revealed when the drag ended, settle(true) animates it the rest of the way open; otherwise settle(false) animates it back closed. This threshold is the only thing that decides the outcome — the drag itself never snaps early.` },
      { q: `Why is the transition disabled during the drag but enabled after?`, a: `applyOffset takes a withTransition flag. During onDragMove it's always false, so the panel's transform updates instantly and exactly matches pointer position with zero animation lag — any easing during the live drag would make the panel visibly lag behind your finger. Once the drag ends, settle() calls applyOffset with withTransition: true so the final snap to fully open or fully closed animates smoothly instead of jumping.` },
      { q: `How is this different from the drag-to-resize panels snippet?`, a: `Drag-to-resize panels keeps two panes permanently visible and uses a drag to redistribute width between them — neither pane is ever fully hidden. This snippet's panel starts completely off-screen (translateX(-100%)) and the drag's entire purpose is to reveal or re-hide it; there's no second pane being resized, and the interaction ends in one of exactly two settled states rather than anywhere along a continuous range.` },
      { q: `How do I use this drag-to-reveal panel in React, Vue, or Angular?`, a: `Keep currentOffset, dragging, and startX/startOffset in refs since they update on every move event, and apply the transform/left/opacity styles imperatively via the refs rather than through state to avoid re-rendering on every pixel of drag. Attach the mouse/touch listeners in a mount effect with cleanup, and only touch component state (e.g. an isOpen boolean) at the end of the gesture in settle().`, },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the live-drag-plus-snap logic on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why applyOffset() is the single function that ever changes the panel's position, and how deriving the handle's left position and the scrim's opacity from that same offset value (rather than tracking them separately) guarantees all three elements can never visually drift out of sync. The same assistant can help you optimize it — for instance asking whether the drag should ignore very small accidental movements (a drag threshold) before committing to "dragging" mode, so a slightly-off tap doesn't get misread as a drag. It's also useful for extending the interaction: ask it to support opening from the right edge as well as the left with the same code mirrored, add velocity-based flinging so a fast short drag can still fully open the panel even under the distance threshold, or persist the panel's open/closed state across page loads with localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "drag to reveal side panel" interaction in plain HTML, CSS, and JavaScript with real pointer-drag tracking — not a click-only toggle.

Requirements:
- A panel positioned off-screen by default (e.g. via transform: translateX(-100%) for a left-edge panel) and a visible drag handle tab positioned at the panel's current trailing edge, plus a semi-transparent scrim overlay behind the panel and above the main content.
- Track the panel's reveal state as a single offset value ranging from fully-hidden to fully-revealed, with exactly one function responsible for applying that value to the panel's transform, the handle's position, and the scrim's opacity (derived as a proportional fraction of the offset) — no separate code path should be able to move these independently.
- On pointer/touch down on the handle, record the starting pointer position and the panel's current offset. On every subsequent move event while dragging, compute the distance moved since the drag started and set the panel's offset to the starting offset plus that distance (clamped to the valid range), with CSS transitions disabled during this live phase so the panel's position is pinned exactly to the pointer with zero lag — a drag stopped halfway must show the panel genuinely halfway revealed, not snapped to an endpoint mid-gesture.
- On release, compute the current reveal amount as a fraction of the panel's full width and compare it to a configurable snap threshold (e.g. 0.4): if past the threshold, animate the panel the rest of the way to fully open; otherwise animate it back to fully closed. This final snap must use a CSS transition, unlike the frame-by-frame drag itself.
- Support both mouse and touch input through a single shared coordinate-reading helper (not duplicated logic per input type), and use touch-action: none on the handle so dragging on mobile does not also scroll the page.
- Clicking the scrim while the panel is open must close it, and a handle click with negligible drag distance must toggle the panel as a conventional tap, so the control works both as a drag gesture and as a simple click.`,
    },
  },
};

export default dragToRevealPanel;
