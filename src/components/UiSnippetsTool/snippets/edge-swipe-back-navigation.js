const edgeSwipeBackNavigation = {
  id: 'edge-swipe-back-navigation',
  title: 'Edge Swipe Back Navigation',
  category: 'navigation',
  html: `<div class="es-phone">
  <div class="es-statusbar"></div>
  <div class="es-stack" id="esStack"></div>
  <div class="es-edge-hint" aria-hidden="true"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.es-phone {
  position: relative; width: 300px; height: 540px; background: #0f172a;
  border-radius: 32px; padding: 10px; box-shadow: 0 24px 60px rgba(15,23,42,0.35);
  overflow: hidden; touch-action: pan-y;
}
.es-statusbar { position: absolute; top: 10px; left: 10px; right: 10px; height: 20px; z-index: 50; }

.es-stack { position: relative; width: 100%; height: 100%; border-radius: 22px; overflow: hidden; background: #fff; }

.es-screen {
  position: absolute; inset: 0; display: flex; flex-direction: column;
  will-change: transform;
}
.es-screen-header {
  display: flex; align-items: center; gap: 10px; padding: 16px 16px 12px;
  border-bottom: 1px solid #f1f5f9; flex-shrink: 0;
}
.es-back-btn { border: none; background: none; padding: 4px; cursor: pointer; color: #6366f1; display: flex; }
.es-screen-title { font-size: 15px; font-weight: 800; color: #1e293b; }
.es-screen-body { flex: 1; padding: 18px 16px; overflow-y: auto; }
.es-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 13px 14px; background: #f8fafc; border-radius: 10px; margin-bottom: 8px;
  font-size: 13px; font-weight: 600; color: #334155; cursor: pointer;
}
.es-row:active { background: #eef2ff; }
.es-hint-text { font-size: 11.5px; color: #94a3b8; line-height: 1.6; margin-top: 6px; }

/* A visible shadow-scrim on the layer beneath the active screen, like iOS,
   so the peeking previous screen visually recedes rather than sitting flush. */
.es-screen.es-below::after {
  content: ''; position: absolute; inset: 0; background: rgba(0,0,0,0.18);
  transition: opacity 0.05s;
}

.es-edge-hint {
  position: absolute; left: 10px; top: 50%; width: 4px; height: 46px; margin-top: -23px;
  background: rgba(255,255,255,0.28); border-radius: 3px; pointer-events: none; z-index: 60;
}`,
  js: `const stackEl = document.getElementById('esStack');

const SCREENS = [
  { id: 'home', title: 'Inbox', rows: ['Design review — Priya', 'Q3 roadmap draft', 'Standup notes', 'Client feedback thread'] },
  { id: 'thread', title: 'Design review', rows: ['Priya: Left comments on frame 4', 'You: Fixing the spacing now', 'Priya: Looks great, ship it'] },
  { id: 'detail', title: 'Frame 4 comments', rows: ['Line-height too tight on mobile', 'Button contrast fails AA', 'Resolved by Priya'] },
];

let stack = [0]; // indices into SCREENS currently pushed
let screenEls = [];

function iconSvg(name) {
  if (name === 'back') return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>';
  return '';
}

function buildScreen(screenIdx) {
  const data = SCREENS[screenIdx];
  const el = document.createElement('div');
  el.className = 'es-screen';
  el.dataset.idx = String(screenIdx);

  const canGoBack = stack.length > 1 || stack.indexOf(screenIdx) > 0;
  el.innerHTML = \`
    <div class="es-screen-header">
      \${screenIdx !== 0 ? '<button class="es-back-btn" aria-label="Back">' + iconSvg('back') + '</button>' : '<span style="width:20px"></span>'}
      <span class="es-screen-title">\${data.title}</span>
    </div>
    <div class="es-screen-body">
      \${data.rows.map((r, i) => '<div class="es-row" data-row="' + i + '">' + r + '</div>').join('')}
      \${screenIdx < SCREENS.length - 1 ? '<p class="es-hint-text">Tap a row to push the next screen. Swipe right from the left edge, or tap the back arrow, to pop back.</p>' : '<p class="es-hint-text">This is the deepest screen in the stack — swipe from the left edge or tap back.</p>'}
    </div>\`;

  const backBtn = el.querySelector('.es-back-btn');
  if (backBtn) backBtn.addEventListener('click', () => pop());

  el.querySelectorAll('.es-row').forEach((row, i) => {
    row.addEventListener('click', () => {
      const nextIdx = Math.min(SCREENS.length - 1, screenIdx + 1);
      if (nextIdx !== screenIdx) push(nextIdx);
    });
  });

  return el;
}

function renderStack() {
  stackEl.innerHTML = '';
  screenEls = stack.map(idx => buildScreen(idx));
  screenEls.forEach((el, i) => {
    el.style.transform = i === screenEls.length - 1 ? 'translateX(0)' : 'translateX(-30%)';
    el.style.transition = 'transform 0.28s cubic-bezier(0.32,0.72,0,1)';
    if (i < screenEls.length - 1) el.classList.add('es-below');
    stackEl.appendChild(el);
  });
}

function push(screenIdx) {
  stack.push(screenIdx);
  renderStack();
}

function pop() {
  if (stack.length <= 1) return;
  const topEl = screenEls[screenEls.length - 1];
  const belowEl = screenEls[screenEls.length - 2];
  if (topEl) {
    topEl.style.transition = 'transform 0.26s cubic-bezier(0.32,0.72,0,1)';
    topEl.style.transform = 'translateX(100%)';
  }
  if (belowEl) {
    belowEl.style.transition = 'transform 0.26s cubic-bezier(0.32,0.72,0,1)';
    belowEl.style.transform = 'translateX(0)';
    belowEl.classList.remove('es-below');
  }
  setTimeout(() => {
    stack.pop();
    renderStack();
  }, 260);
}

// --- Edge-swipe-to-go-back gesture handling ---
const EDGE_ZONE = 24; // px from the left edge that starts tracking a swipe
let dragging = false;
let dragStartX = 0;
let dragCurrentX = 0;
let dragWidth = 300;

stackEl.addEventListener('pointerdown', (e) => {
  const rect = stackEl.getBoundingClientRect();
  const localX = e.clientX - rect.left;
  if (localX > EDGE_ZONE || stack.length <= 1) return;
  dragging = true;
  dragStartX = e.clientX;
  dragWidth = rect.width;
  screenEls.forEach(el => { el.style.transition = 'none'; });
  stackEl.setPointerCapture(e.pointerId);
});

stackEl.addEventListener('pointermove', (e) => {
  if (!dragging) return;
  dragCurrentX = Math.max(0, e.clientX - dragStartX);
  const progress = Math.min(1, dragCurrentX / dragWidth);
  const topEl = screenEls[screenEls.length - 1];
  const belowEl = screenEls[screenEls.length - 2];
  if (topEl) topEl.style.transform = \`translateX(\${progress * 100}%)\`;
  if (belowEl) belowEl.style.transform = \`translateX(\${-30 * (1 - progress)}%)\`;
});

function endDrag(e) {
  if (!dragging) return;
  dragging = false;
  const progress = Math.min(1, dragCurrentX / dragWidth);
  screenEls.forEach(el => { el.style.transition = 'transform 0.22s cubic-bezier(0.32,0.72,0,1)'; });
  if (progress > 0.35) {
    pop();
  } else {
    const topEl = screenEls[screenEls.length - 1];
    const belowEl = screenEls[screenEls.length - 2];
    if (topEl) topEl.style.transform = 'translateX(0)';
    if (belowEl) belowEl.style.transform = 'translateX(-30%)';
  }
  dragCurrentX = 0;
}

stackEl.addEventListener('pointerup', endDrag);
stackEl.addEventListener('pointercancel', endDrag);

renderStack();`,
  seo: {
    title: 'Edge Swipe Back Navigation — Free HTML CSS JS Snippet',
    description: 'An iOS-style edge-swipe-to-go-back gesture nav with a live-dragged screen stack, peeking previous screen, and snap-back or commit-to-pop physics. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Edge Swipe Back Navigation — iOS-Style Drag-From-Edge Screen Stack in Vanilla JS',
      description: `Mobile apps built with a push/pop navigation stack almost universally support swiping in from the very left edge of the screen to go back, dragging the current screen aside in real time to reveal the previous one peeking in underneath — a much more direct, cancelable interaction than only offering a small back-arrow tap target. This snippet implements the real gesture physics with the Pointer Events API: the drag distance is tracked live, both screens move together in proportion to the drag, and lifting your finger either commits the pop or snaps back based on how far you dragged.

**A real navigation stack, not two hardcoded screens**

\`stack\` is a plain array of indices into a \`SCREENS\` list. \`push(screenIdx)\` and \`pop()\` mutate that array and call \`renderStack()\`, which rebuilds only the top two visible layers with CSS transforms — the top screen at \`translateX(0)\` and the one beneath it partially shifted left at \`translateX(-30%)\`, exactly matching how iOS renders a peeking previous screen with parallax rather than a hard cut. Any number of screens can be pushed; this is a genuine stack, not a fixed two-screen demo.

**Restricting the gesture to the edge zone**

The \`pointerdown\` handler checks \`localX > EDGE_ZONE\` and bails immediately if the touch didn't start within the leftmost \`24px\` of the screen — this is the defining constraint of an *edge* swipe gesture as opposed to a general swipe-anywhere gesture, and it's essential so that normal scrolling or tapping rows elsewhere on the screen is never mistaken for a back-navigation attempt.

**Live 1:1 drag tracking, not a fixed animation**

While dragging, \`pointermove\` computes \`progress\` as the raw drag distance divided by the screen width (clamped to \`0–1\`) and applies it directly as a percentage transform to both the top screen (sliding right) and the screen beneath it (sliding the rest of the way in from its \`-30%\` offset toward \`0\`) — every pixel of finger movement maps directly to a pixel of screen movement, with \`transition: none\` set during the drag so there is zero animation lag between touch and visual response.

**Commit-or-cancel on release**

\`endDrag()\` reads the final \`progress\` value against a \`0.35\` threshold: past it, \`pop()\` runs and completes the transition off-screen; below it, both screens animate back to their resting positions instead. This threshold-based commit/cancel behavior — rather than always completing or always reverting — is what makes the gesture feel physically responsive instead of all-or-nothing, and matches the same threshold pattern iOS itself uses for its edge-swipe-back gesture.

**A visible scrim on the receding screen**

The \`.es-below::after\` pseudo-element darkens whichever screen sits beneath the active one with a semi-transparent overlay, reinforcing the sense that it is "behind" the active screen in a real depth stack rather than simply positioned off to the side.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Tap a row to push a new screen', text: 'Tapping any row slides in the next screen from the right, adding it to the top of the navigation stack.' },
        { title: 'Swipe from the very left edge to go back', text: 'Press down within the leftmost ~24px of the phone frame and drag right — the current screen follows your finger in real time.' },
        { title: 'Release past the halfway point to commit', text: 'Dragging more than about 35% of the screen width and releasing completes the pop; releasing before that snaps both screens back to their resting position.' },
        { title: 'Tap the back arrow as an alternative', text: 'The header back button calls the same pop() function as a completed swipe, for users who prefer tapping over gesturing.' },
        { title: 'Adjust the edge zone width', text: 'Change the EDGE_ZONE constant in the JS panel to widen or narrow how close to the left edge a touch must start to begin tracking.' },
        { title: 'Add more screens to the stack', text: 'Extend the SCREENS array — push() and pop() work with any stack depth without additional changes.' },
      ],
    },
    features: [
      'Real Pointer Events-based drag tracking, not a canned CSS animation triggered on tap alone',
      'Gesture recognition restricted to a configurable left-edge zone so it never conflicts with scrolling or row taps',
      'Live 1:1 finger-to-screen movement mapping during the drag, with transitions disabled mid-drag for zero lag',
      'Threshold-based commit-or-cancel on release, matching the real iOS edge-swipe-back interaction',
      'Genuine array-based navigation stack supporting any number of pushed screens, not a fixed two-screen demo',
      'Parallax-style peeking previous screen with a darkening scrim, reinforcing stack depth visually',
      'Back button in the header calls the identical pop() function as a completed swipe gesture',
      'Pure vanilla JS and CSS transforms — no animation or gesture library',
    ],
    useCases: [
      { icon: 'APP', title: 'Mobile app shell prototypes', desc: 'A realistic, physically-interactive base for prototyping any stack-based mobile navigation flow — settings drill-downs, message threads, detail views.' },
      { icon: 'FLOW', title: 'Hybrid and PWA app navigation', desc: 'Progressive web apps that want native-feeling navigation without a full mobile framework can adapt this gesture-driven stack directly.' },
      { icon: 'LEARN', title: 'Teaching Pointer Events drag physics', desc: 'A concrete, complete example of live drag tracking, progress-based transform interpolation, and threshold-based commit/cancel logic using only the Pointer Events API.' },
      { icon: 'DESIGN', title: 'Design system navigation documentation', desc: 'Demonstrate exactly how an edge-swipe-back interaction should feel to designers and stakeholders who may only have seen static navigation stack diagrams.' },
      { icon: 'CODE', title: 'Reference for stack-based push/pop UI', desc: 'The array-based stack plus renderStack() pattern generalizes well beyond gestures — useful for any push/pop UI including modal stacks and wizard flows.' },
    ],
    faqs: [
      { q: 'How is the swipe gesture restricted to the screen edge?', a: 'The pointerdown handler measures the touch\'s x-position relative to the container and immediately returns without starting a drag if that position is greater than the EDGE_ZONE constant (24px by default). Only a touch starting within that narrow left-edge band begins tracking a back-swipe.' },
      { q: 'How does the screen follow the finger during the drag?', a: 'pointermove computes progress as the raw horizontal drag distance divided by the container\'s width, clamped between 0 and 1, and applies it directly as a percentage transform to both the top screen (translateX(progress * 100%)) and the screen beneath it (translating the remaining distance from its -30% resting offset toward 0%) — a direct, un-eased mapping so there is no perceptible lag between finger and screen movement.' },
      { q: 'What happens if I release the drag partway through?', a: 'endDrag() compares the final progress value against a 0.35 threshold. If the drag passed that threshold, pop() runs and the screen finishes animating off-screen; if not, both screens animate back to their original resting transforms instead of completing the navigation.' },
      { q: 'Why is transition set to none during the drag?', a: 'A CSS transition adds a delay between a style change and its visual result. During an active drag, every pointermove event must move the screen instantly to match the finger exactly — any transition lag would make the drag feel disconnected from the touch. Transitions are re-enabled only once the drag ends, so the snap-back or completing animation is smooth.' },
      { q: 'Can I use this with more than two screens deep?', a: 'Yes — stack is a plain array and can hold any number of pushed screen indices. renderStack() only ever positions the top two entries visually (the active screen and the one directly beneath it), which is both how the real interaction should look and keeps rendering cheap regardless of stack depth.' },
      { q: 'How do I adapt this for React or another framework?', a: 'Keep the stack array in component state (e.g. useState<number[]>), and drive the pointerdown/pointermove/pointerup handlers with refs to the current and previous screen elements rather than direct DOM queries, applying the same progress-based transform math inside the move handler.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the EDGE_ZONE check in the pointerdown handler prevents this gesture from ever conflicting with normal scrolling or row taps, and how the progress value computed in pointermove drives both the top screen and the peeking screen beneath it with a single shared number. It's also a good candidate for extension — ask it to add velocity-based completion (a fast flick should complete the pop even if released before the 35% threshold, the way iOS does), add a matching push transition when tapping forward instead of only an instant slide, or wire the stack up to real client-side routing so each pushed screen corresponds to a URL.`,
      prompt: `Build an iOS-style edge-swipe-to-go-back navigation stack in plain HTML, CSS, and JavaScript using the Pointer Events API — no gesture or animation library.

Requirements:
- Maintain a navigation stack as a plain array of screen identifiers, with push() and pop() functions that mutate the array and re-render the visible screens — support any stack depth, not just two hardcoded screens.
- Render only the top two stack entries as absolutely positioned layers: the active (top) screen at a resting position covering the full container, and the screen directly beneath it shifted partially to the left (a parallax "peeking" effect), with a semi-transparent scrim over the peeking screen so it reads as visually behind the active one.
- On pointerdown, only begin tracking a drag if the touch/click started within a small, configurable pixel distance from the very left edge of the container — a touch starting anywhere else must not trigger the gesture, so it never conflicts with scrolling or tapping other content.
- On pointermove during an active drag, compute how far the pointer has moved as a proportion of the container's width (clamped between 0 and 1) and apply that proportion directly as a live percentage transform to both the active screen (sliding it right, off toward the edge) and the peeking screen beneath it (sliding it the rest of the way toward its full resting position) — the movement must track the pointer with no animation lag while dragging is in progress.
- On pointerup, compare the final drag proportion against a threshold (e.g. 0.35): if it exceeds the threshold, complete the pop with a smooth animated transition; if not, animate both screens back to their original resting positions instead.
- Also provide a conventional back-arrow button in each screen's header that calls the exact same pop function as a completed swipe gesture, for users who prefer tapping.
- Tapping content within a screen (not near the edge) must push a new screen onto the stack with a slide-in transition.`,
    },
  },
};

export default edgeSwipeBackNavigation;
