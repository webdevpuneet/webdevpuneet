const swipeTabSwitcher = {
  id: 'swipe-tab-switcher',
  title: 'Swipe Tab Switcher',
  lastmod: '2026-08-08',
  category: 'mobile',
  html: `<div class="sts-wrap">
  <div class="sts-tabbar" id="sts-tabbar">
    <button class="sts-tab active" data-index="0">Posts</button>
    <button class="sts-tab" data-index="1">Replies</button>
    <button class="sts-tab" data-index="2">Media</button>
    <button class="sts-tab" data-index="3">Likes</button>
    <div class="sts-indicator" id="sts-indicator"></div>
  </div>

  <div class="sts-viewport" id="sts-viewport">
    <div class="sts-track" id="sts-track">
      <div class="sts-panel">
        <h3>Posts</h3>
        <p>Swipe left to see Replies, or click any tab above. The underline slides and resizes to match whichever tab is active.</p>
      </div>
      <div class="sts-panel">
        <h3>Replies</h3>
        <p>Both click navigation and drag navigation share one piece of state, so they never fight each other or fall out of sync.</p>
      </div>
      <div class="sts-panel">
        <h3>Media</h3>
        <p>Drag the content area itself horizontally — panels slide in real time with your finger or cursor, not just after you release.</p>
      </div>
      <div class="sts-panel">
        <h3>Likes</h3>
        <p>Release before crossing the threshold and the panel springs back to where it started instead of committing to a switch.</p>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.sts-wrap { width: 100%; max-width: 380px; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }

.sts-tabbar { position: relative; display: flex; border-bottom: 1px solid #eef1f8; }
.sts-tab { flex: 1; background: transparent; border: none; padding: 14px 8px; font-size: 13px; font-weight: 600; color: #94a3b8; cursor: pointer; transition: color 0.2s; position: relative; z-index: 2; }
.sts-tab.active { color: #4f46e5; }
.sts-tab:hover:not(.active) { color: #64748b; }

.sts-indicator { position: absolute; bottom: 0; left: 0; height: 3px; background: linear-gradient(90deg, #818cf8, #6366f1); border-radius: 3px 3px 0 0; transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), width 0.28s cubic-bezier(0.4,0,0.2,1); will-change: transform, width; }
.sts-indicator.dragging { transition: none; }

.sts-viewport { overflow: hidden; touch-action: pan-y; }
.sts-track { display: flex; will-change: transform; }
.sts-track.animating { transition: transform 0.32s cubic-bezier(0.22,0.61,0.36,1); }

.sts-panel { flex: 0 0 100%; padding: 26px 22px 32px; min-height: 180px; }
.sts-panel h3 { font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 8px; }
.sts-panel p { font-size: 13.5px; color: #64748b; line-height: 1.65; }`,
  js: `const tabbar = document.getElementById('sts-tabbar');
const indicator = document.getElementById('sts-indicator');
const viewport = document.getElementById('sts-viewport');
const track = document.getElementById('sts-track');
const tabs = Array.from(tabbar.querySelectorAll('.sts-tab'));
const PANEL_COUNT = tabs.length;

// ---- Single shared piece of state ----
// currentIndex: which panel is "settled" (0-based)
// dragOffsetPx: how far the track is currently displaced from currentIndex's
// resting position because of an in-progress drag (0 when not dragging)
// Both the tab click handler and the pointer drag handler only ever read and
// write these two values - there is no second, parallel navigation system to
// fall out of sync with.
let currentIndex = 0;
let dragOffsetPx = 0;

let dragging = false;
let pointerId = null;
let startX = 0;
let viewportWidth = 0;
const DRAG_THRESHOLD_RATIO = 0.28; // fraction of viewport width needed to commit a swipe

function applyTransform(animate) {
  track.classList.toggle('animating', animate);
  const baseX = -currentIndex * viewportWidth;
  track.style.transform = 'translateX(' + (baseX + dragOffsetPx) + 'px)';
}

function moveIndicator(animate) {
  const activeTab = tabs[currentIndex];
  indicator.classList.toggle('dragging', !animate);
  // Measure the active tab button directly rather than assuming equal widths,
  // so the indicator works even if tab labels have different lengths.
  indicator.style.width = activeTab.offsetWidth + 'px';
  indicator.style.transform = 'translateX(' + activeTab.offsetLeft + 'px)';
}

function setActiveTabClass() {
  tabs.forEach((t, i) => t.classList.toggle('active', i === currentIndex));
}

function goToIndex(index, animate) {
  currentIndex = Math.max(0, Math.min(PANEL_COUNT - 1, index));
  dragOffsetPx = 0;
  setActiveTabClass();
  applyTransform(animate !== false);
  moveIndicator(animate !== false);
}

function measure() {
  viewportWidth = viewport.getBoundingClientRect().width;
}

// ---- Click navigation ----
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => goToIndex(i, true));
});

// ---- Drag / swipe navigation, driven by the same currentIndex + dragOffsetPx state ----
function onPointerDown(e) {
  dragging = true;
  pointerId = e.pointerId;
  viewport.setPointerCapture(pointerId);
  measure();
  startX = e.clientX;
  track.classList.remove('animating');
  indicator.classList.add('dragging');
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  const dx = e.clientX - startX;

  // Resist dragging past the first or last panel instead of allowing it to
  // slide off freely, so the ends of the tab set feel bounded.
  const atStart = currentIndex === 0 && dx > 0;
  const atEnd = currentIndex === PANEL_COUNT - 1 && dx < 0;
  dragOffsetPx = (atStart || atEnd) ? dx * 0.35 : dx;

  applyTransform(false);

  // Interpolate the indicator live between the current tab and the tab in
  // the direction being dragged, in sync with how far the track has moved.
  const dragRatio = Math.max(-1, Math.min(1, dragOffsetPx / viewportWidth));
  const neighborIndex = dragRatio < 0
    ? Math.min(PANEL_COUNT - 1, currentIndex + 1)
    : Math.max(0, currentIndex - 1);
  const from = tabs[currentIndex];
  const to = tabs[neighborIndex];
  const t = Math.abs(dragRatio);
  const width = from.offsetWidth + (to.offsetWidth - from.offsetWidth) * t;
  const left = from.offsetLeft + (to.offsetLeft - from.offsetLeft) * t;
  indicator.style.width = width + 'px';
  indicator.style.transform = 'translateX(' + left + 'px)';
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  dragging = false;
  viewport.releasePointerCapture(pointerId);

  const threshold = viewportWidth * DRAG_THRESHOLD_RATIO;
  if (dragOffsetPx <= -threshold && currentIndex < PANEL_COUNT - 1) {
    goToIndex(currentIndex + 1, true);
  } else if (dragOffsetPx >= threshold && currentIndex > 0) {
    goToIndex(currentIndex - 1, true);
  } else {
    // Threshold not crossed - snap back to the current panel/tab exactly.
    goToIndex(currentIndex, true);
  }
}

viewport.addEventListener('pointerdown', onPointerDown);
viewport.addEventListener('pointermove', onPointerMove);
viewport.addEventListener('pointerup', onPointerUp);
viewport.addEventListener('pointercancel', onPointerUp);

window.addEventListener('resize', () => {
  measure();
  applyTransform(false);
  moveIndicator(false);
});

measure();
goToIndex(0, false);`,
  seo: {
    title: 'Swipe Tab Switcher — Free HTML CSS JS Snippet',
    description: 'A tab bar with a sliding underline indicator plus horizontally swipeable panels kept in sync by one shared state. Exports to React & Vue.',
    about: {
      title: 'Swipe Tab Switcher — Click-and-Swipe Tabs With a Shared Index + Drag-Offset State Model, in Vanilla JS',
      description: `Instagram profile tabs and Twitter's timeline both let you either tap a tab label or swipe the content area itself to move between sections, and both keep the underline indicator perfectly synced no matter which method you use. That sync is the actual hard part. Most naive implementations end up with two separate systems — one that moves panels when you click a tab, another that moves panels when you drag — that each independently try to own "where are we now," and inevitably drift apart the moment a user starts one interaction and finishes with the other. This snippet is built around a deliberately different architecture: **one shared piece of state**, read and written by both the click handler and the drag handler, so there is structurally nothing for them to disagree about.

**The two numbers that describe the entire UI: currentIndex and dragOffsetPx**

The whole component's position is fully described by exactly two variables. \`currentIndex\` is which panel is currently "settled" — the panel that renders when no drag is in progress. \`dragOffsetPx\` is how far the track is currently displaced, in pixels, away from \`currentIndex\`'s resting position because of an active drag; it is always 0 when nothing is being dragged. Every rendering function — \`applyTransform()\` for the panel track, \`moveIndicator()\` for the underline — computes its output purely from these two numbers. A tab click doesn't "do something different" from a drag release; it just calls the exact same \`goToIndex()\` function that a completed drag calls, which sets \`currentIndex\` and resets \`dragOffsetPx\` to 0. There is only one code path that ever changes which panel is showing.

**The indicator: measuring real layout instead of assuming equal-width tabs**

\`moveIndicator()\` does not divide the tab bar into four equal fractions and assume each tab is the same width — it reads \`activeTab.offsetLeft\` and \`activeTab.offsetWidth\` directly from the DOM and animates the indicator's \`transform: translateX()\` and \`width\` to match exactly. This means the underline works correctly even with tab labels of very different lengths ("Posts" vs. "Notifications"), because it is driven by the real rendered geometry of the button it needs to sit under, not a guessed percentage. The CSS transition on \`transform\` and \`width\` (rather than animating \`left\`, which would trigger layout on every frame) keeps the slide on the compositor thread for smooth 60fps motion.

**Live-interpolating the indicator during an active drag**

The interesting part is what happens to the indicator *while* the user is mid-drag, before they have released. \`onPointerMove()\` computes a \`dragRatio\` between -1 and 1 representing how far through the transition to the neighboring panel the drag currently is, identifies which neighbor tab is being dragged toward, and then linearly interpolates both the indicator's width and left position between the current tab's geometry and that neighbor's geometry using that ratio. The underline doesn't just jump to the next tab when the swipe completes — it visibly stretches and slides in real time as you drag, exactly tracking your finger, which is what makes the swipe feel connected to the indicator rather than the indicator looking like an afterthought that catches up later.

**Committing or reverting: the drag threshold**

On \`pointerup\`, \`onPointerUp()\` compares the final \`dragOffsetPx\` against \`viewportWidth * DRAG_THRESHOLD_RATIO\` (28% of the viewport width). Cross that threshold in either direction and \`goToIndex()\` commits to the neighboring panel; fail to cross it and the exact same \`goToIndex(currentIndex, true)\` call runs instead, snapping back to wherever the drag started. Because both outcomes funnel through the same function, "commit" and "revert" are not two different animations bolted on separately — they are the same state update landing on two different target indices, one of which happens to be the panel you started on.

**Resisting overscroll at the first and last tab**

When the user drags past the leftmost or rightmost panel, \`onPointerMove()\` multiplies the raw drag delta by 0.35 instead of applying it 1:1, producing a soft rubber-band resistance rather than either a hard stop or unbounded free scrolling into empty space. This is a small but important UX signal: it tells the user "you have reached the edge" through feel, the same way iOS scroll views resist and bounce back at their content boundaries, without needing any extra visual cue.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Look at the underline beneath the active tab', text: 'A solid indigo bar sits under "Posts" by default, sized exactly to that tab\'s width and position, not a fixed fraction of the bar.' },
      { title: 'Click a different tab, like "Media"', text: 'The content panel slides horizontally to the Media panel and the underline animates smoothly to the new tab\'s exact width and position at the same time.' },
      { title: 'Press and drag the content area itself left or right', text: 'The panels move in real time with your pointer, and the underline simultaneously stretches and slides between the current and neighboring tab in proportion to how far you have dragged.' },
      { title: 'Release the drag past roughly a quarter of the width', text: 'The swipe commits — the panel finishes sliding to the neighboring tab and the underline snaps cleanly to match it, exactly as if you had clicked that tab directly.' },
      { title: 'Release the drag before crossing that threshold', text: 'The panel springs back to where it started and the underline returns to the original tab, since the shared state never actually changed which index was "current."' },
      { title: 'Try dragging past the first or last tab', text: 'The panel resists with a soft rubber-band pull instead of sliding freely into empty space, signalling you have reached the end of the tab set.' },
    ]},
    features: [
      'Single shared state model: currentIndex + dragOffsetPx drive both click and swipe navigation with zero duplication',
      'Underline indicator measured from real DOM geometry (offsetLeft/offsetWidth), not assumed equal tab widths',
      'Live indicator interpolation during an active drag, stretching and sliding in sync with pointer movement',
      'Pointer-event drag (pointerdown/pointermove/pointerup) with setPointerCapture for reliable tracking',
      'Threshold-based commit-or-revert logic funnels both outcomes through the same goToIndex() function',
      'Rubber-band resistance at the first and last panel instead of a hard stop or unbounded overscroll',
      'CSS transform-based sliding (translateX), kept off the animating class during active drag for zero lag',
      'Responsive re-measurement on window resize keeps both the track offset and the indicator geometry correct',
    ],
    useCases: [
      { icon: 'APP', title: 'Social profile and timeline tab navigation', desc: 'The exact Instagram-profile / Twitter-timeline pattern — Posts, Replies, Media, Likes — for any social or content app, pairing naturally with a [tab bar](/ui-snippets/tab-bar) used elsewhere in the same app for consistency.' },
      { icon: 'MOBILE', title: 'Mobile app section switchers', desc: 'A natural fit for any mobile-first layout where swiping the content area is expected behavior, alongside other [mobile](/ui-snippets) screens like a settings or notifications view.' },
      { icon: 'LEARN', title: 'Teaching shared-state architecture for multi-input UI', desc: 'A clear, inspectable example of how to avoid two competing navigation systems fighting each other — a pattern that generalizes well beyond tabs to any UI with both a discrete control and a continuous gesture driving the same outcome.' },
      { icon: 'DESIGN', title: 'Onboarding carousels and settings sections', desc: 'Reuse the same click+swipe+threshold model for an onboarding flow or a settings screen with swipeable sub-pages, distinct from the plain click-only [animated tabs](/ui-snippets/animated-tabs) pattern.' },
      { icon: 'CODE', title: 'Content and dashboard section tabs', desc: 'A richer alternative to a static [dynamic tabs](/ui-snippets/dynamic-tabs) component when the underlying content benefits from being explorable by touch as well as by click.' },
      { icon: 'CODE', title: 'Related: Picture-in-Picture Video Card', desc: 'See the [Picture-in-Picture Video Card](/ui-snippets/picture-in-picture-video-card/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How exactly do click navigation and swipe navigation stay in sync without fighting each other?', a: 'Both interactions read from and write to the exact same two variables, currentIndex and dragOffsetPx, and both ultimately call the same goToIndex() function to commit a change. A tab click sets currentIndex directly and resets dragOffsetPx to zero; a completed swipe past the threshold does the exact same thing with a different target index. Because there is only one function that actually changes which panel is showing, and both input methods route through it, there is no possibility of the two systems disagreeing about the current state.' },
      { q: 'Why does the indicator interpolate live during the drag instead of just jumping at the end?', a: 'Jumping only at the end would make the underline feel disconnected from the swipe gesture the user is actively performing — they would see the panel sliding under their finger but the indicator sitting motionless until release. Instead, onPointerMove() computes how far through the transition the drag currently is (as a ratio from -1 to 1) and linearly interpolates the indicator\'s width and position between the current tab and whichever neighbor tab is being dragged toward, so the underline visibly tracks the gesture in real time, the same way the panel itself does.' },
      { q: 'How do I add more tabs or change the swipe threshold?', a: 'Add more <button class="sts-tab"> elements to the tab bar and matching <div class="sts-panel"> elements to the track in the same order — PANEL_COUNT is derived automatically from tabs.length, so no other constant needs updating. To change how far a user must drag before the swipe commits, adjust DRAG_THRESHOLD_RATIO (currently 0.28, meaning 28% of the viewport width); a lower value makes swipes commit with a shorter drag, a higher value requires a more deliberate swipe.' },
      { q: 'Can I use this swipe tab switcher in React, Vue, or Angular?', a: 'Yes. Keep currentIndex in component state (since changing it should trigger a re-render) but keep dragOffsetPx, the pointerId, and the drag start coordinates in a ref, since they update on every pointermove and applying them directly to the DOM (as this snippet does) avoids re-rendering the whole component on every pixel of movement. Attach the pointer listeners in a useEffect/onMounted/ngAfterViewInit after the viewport element exists, and remove them (plus cancel any in-flight transition) in the corresponding cleanup function so a drag cannot keep writing to a detached element after unmount.' },
      { q: 'Why does dragging past the first or last tab resist instead of stopping instantly?', a: 'onPointerMove() multiplies the raw drag delta by a small damping factor (0.35) whenever currentIndex is already at the first or last panel and the drag direction would go further past it, producing a soft rubber-band pull rather than an abrupt hard stop. This mirrors how native scroll views like iOS Safari behave at their content boundaries and communicates "you have reached the end" through feel, without needing a disabled-looking visual state or a separate boundary indicator.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JS to an AI assistant like Claude and ask it to explain exactly how currentIndex and dragOffsetPx together fully describe the UI's state, and why routing both the click handler and the drag-release handler through the same goToIndex() function is what keeps them from ever disagreeing — that shared-state architecture is the real lesson here, more than the swipe mechanics themselves. It's also worth asking how you would add momentum (continuing to the next panel on a fast flick even if the drag distance didn't cross the threshold) without breaking that shared-state model. Good extensions to request: vertical swipe support, a lazy-loaded panel that only renders its content once its tab becomes active, or persisting the active tab index to the URL hash so a reload keeps the same section open.`,
      prompt: `Build a swipeable tab interface in plain HTML, CSS, and JavaScript with an animated sliding underline indicator, no libraries.

Requirements:
- A row of tab buttons above a horizontally scrolling set of content panels, one panel per tab.
- An underline indicator that animates its width and position to exactly match the currently active tab button's real measured offsetLeft and offsetWidth (not a fixed fraction of the tab bar), sliding smoothly rather than snapping instantly.
- The content area must support horizontal dragging via pointer events (pointerdown/pointermove/pointerup), moving the panels in real time in sync with the pointer, and also support plain clicking on a tab button to jump directly to that panel.
- Drive both the click-based and drag-based navigation from one shared piece of state (e.g. a current panel index plus a live drag offset), routed through a single function that actually changes which panel is current, so the two input methods can never fall out of sync with each other.
- While dragging, interpolate the underline indicator live between the current tab and whichever neighboring tab is being dragged toward, in proportion to how far the drag has progressed — it should visibly track the gesture, not just jump at the end.
- On release, commit to the neighboring panel if the drag distance crossed a threshold (e.g. a percentage of the viewport width), or smoothly revert back to the original panel and tab if it did not.
- Add rubber-band resistance when dragging past the first or last panel instead of allowing free overscroll or a hard stop.`,
    },
  },
};

export default swipeTabSwitcher;
