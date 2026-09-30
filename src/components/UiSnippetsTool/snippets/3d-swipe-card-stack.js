const swipeCardStack3d = {
  id: '3d-swipe-card-stack',
  title: '3D Swipe Card Stack',
  category: 'animations',
  html: `<div class="wrap">
  <div class="stack" id="stack">
    <div class="card" style="--bg: linear-gradient(140deg,#6366f1,#818cf8)">
      <h3>Mountain Trail</h3>
      <p>Colorado, USA</p>
    </div>
    <div class="card" style="--bg: linear-gradient(140deg,#06b6d4,#22d3ee)">
      <h3>Coastal Cliffs</h3>
      <p>Big Sur, USA</p>
    </div>
    <div class="card" style="--bg: linear-gradient(140deg,#f59e0b,#fbbf24)">
      <h3>Desert Dunes</h3>
      <p>Sahara, Morocco</p>
    </div>
    <div class="card" style="--bg: linear-gradient(140deg,#ec4899,#f472b6)">
      <h3>Northern Lights</h3>
      <p>Tromso, Norway</p>
    </div>
    <div class="card" style="--bg: linear-gradient(140deg,#10b981,#34d399)">
      <h3>Rainforest Canopy</h3>
      <p>Borneo, Malaysia</p>
    </div>
  </div>

  <div class="actions">
    <button class="act skip" id="skipBtn" aria-label="Skip">&times;</button>
    <button class="act like" id="likeBtn" aria-label="Like">&hearts;</button>
  </div>
  <p class="hint">Drag a card left or right, or use the buttons.</p>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; align-items: center; min-height: 100vh; padding: 40px 20px; }

.wrap { width: 100%; max-width: 320px; text-align: center; }

.stack { position: relative; width: 100%; height: 360px; perspective: 1200px; margin-bottom: 22px; }

.card {
  position: absolute; inset: 0; border-radius: 20px; background: var(--bg);
  display: flex; flex-direction: column; justify-content: flex-end; padding: 22px;
  color: #fff; box-shadow: 0 20px 40px rgba(15,23,42,0.22);
  cursor: grab; user-select: none; touch-action: none;
  transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), opacity 0.3s;
  transform-style: preserve-3d;
}
.card:active { cursor: grabbing; }
.card h3 { font-size: 19px; font-weight: 800; margin: 0 0 4px; }
.card p { font-size: 13px; opacity: 0.9; margin: 0; }

.card.dragging { transition: none; }
.card.fly-left  { transform: translate3d(-460px, 40px, -60px) rotateY(-35deg) rotateZ(-24deg); opacity: 0; }
.card.fly-right { transform: translate3d(460px, 40px, -60px) rotateY(35deg) rotateZ(24deg); opacity: 0; }

.actions { display: flex; justify-content: center; gap: 18px; margin-bottom: 10px; }
.act {
  width: 52px; height: 52px; border-radius: 50%; border: none; cursor: pointer;
  font-size: 22px; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 20px rgba(15,23,42,0.15); transition: transform 0.15s;
}
.act:active { transform: scale(0.9); }
.skip { background: #fff; color: #ef4444; }
.like { background: #fff; color: #ec4899; }

.hint { font-size: 12px; color: #94a3b8; margin: 0; }`,
  js: `const stack = document.getElementById('stack');

function layoutStack() {
  // Stacking depth is a real 3D transform (translateZ + a slight rotateX),
  // not just a 2D scale-and-offset trick, so the deck has genuine
  // perspective falloff as it recedes.
  const cards = [...stack.querySelectorAll('.card')];
  cards.forEach((card, i) => {
    card.style.zIndex = String(cards.length - i);
    if (card.classList.contains('dragging') || card.classList.contains('fly-left') || card.classList.contains('fly-right')) return;
    const depth = i;
    card.style.transform =
      'translate3d(0, ' + (depth * 8) + 'px, ' + (depth * -30) + 'px) rotateX(' + (depth * -2) + 'deg) scale(' + (1 - depth * 0.045) + ')';
    card.style.opacity = depth > 3 ? '0' : '1';
  });
}

function bindTopCard() {
  const card = stack.querySelector('.card');
  if (!card) return;
  let startX = 0, startY = 0, dx = 0, dy = 0, dragging = false;

  function onDown(e) {
    dragging = true;
    card.classList.add('dragging');
    const p = e.touches ? e.touches[0] : e;
    startX = p.clientX; startY = p.clientY;
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }
  function onMove(e) {
    if (!dragging) return;
    const p = e.touches ? e.touches[0] : e;
    dx = p.clientX - startX; dy = p.clientY - startY;
    const rotateZ = dx * 0.06;
    const rotateY = dx * 0.05;
    card.style.transform = 'translate3d(' + dx + 'px, ' + dy + 'px, 0) rotateZ(' + rotateZ + 'deg) rotateY(' + rotateY + 'deg)';
  }
  function onUp() {
    dragging = false;
    card.classList.remove('dragging');
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
    if (dx > 110) { resolveSwipe(card, 'right'); }
    else if (dx < -110) { resolveSwipe(card, 'left'); }
    else { card.style.transform = ''; layoutStack(); }
    dx = 0; dy = 0;
  }

  card.addEventListener('pointerdown', onDown);
}

function resolveSwipe(card, dir) {
  card.classList.add(dir === 'left' ? 'fly-left' : 'fly-right');
  card.addEventListener('transitionend', () => {
    card.remove();
    if (stack.children.length === 0) {
      const p = document.createElement('p');
      p.className = 'hint';
      p.textContent = 'You have viewed every card.';
      stack.appendChild(p);
    }
    layoutStack();
    bindTopCard();
  }, { once: true });
}

document.getElementById('skipBtn').addEventListener('click', () => {
  const card = stack.querySelector('.card');
  if (card) resolveSwipe(card, 'left');
});
document.getElementById('likeBtn').addEventListener('click', () => {
  const card = stack.querySelector('.card');
  if (card) resolveSwipe(card, 'right');
});

layoutStack();
bindTopCard();`,
  seo: {
    title: '3D Swipe Card Stack — Tinder-Style CSS JS',
    description: 'Draggable card deck with real 3D depth (translateZ, rotateX) between stacked cards and a rotateY/rotateZ fly-away swipe animation. Exports to React, Vue & Tailwind.',
    about: {
      title: '3D Swipe Card Stack — Real translateZ Depth and a rotateY Fly-Away Swipe',
      description: `Swipeable card decks are everywhere — dating apps, recommendation feeds, onboarding "pick your interests" flows. Most web implementations fake the stacked look with 2D scale and a vertical offset. This one goes further and gives the deck genuine 3D depth, and animates the swiped card away with real translateZ and rotateY, so it visibly recedes and tumbles rather than just sliding sideways.

**Real 3D stacking, not a 2D illusion**

\`layoutStack()\` positions every card behind the top one with \`transform: translate3d(0, depth*8px, depth*-30px) rotateX(depth*-2deg) scale(1 - depth*0.045)\`. The \`translateZ\` component (the third value in \`translate3d\`) pushes each successive card back along the Z axis inside the \`.stack\` container's \`perspective: 1200px\`, so cards further back genuinely recede into the screen rather than merely appearing smaller. Adding a small \`rotateX\` tilt on top gives the deck a subtle fanned-open feel instead of a perfectly flat stack.

**Dragging the top card**

\`bindTopCard()\` attaches \`pointerdown\`/\`pointermove\`/\`pointerup\` listeners to whichever card is currently on top (the Pointer Events API unifies mouse, touch, and pen input in one set of events). While dragging, the card's transform follows the pointer's horizontal and vertical delta directly, plus a \`rotateZ\` twist and a \`rotateY\` 3D tilt both proportional to horizontal drag distance — so the card doesn't just translate, it visibly banks like a card being flicked off a real deck.

**Deciding the swipe outcome**

On pointer release, \`onUp()\` checks the accumulated horizontal delta against a 110px threshold in either direction. Past the threshold, \`resolveSwipe(card, dir)\` takes over and adds \`.fly-left\` or \`.fly-right\`, which animates the card to \`translate3d(±460px, 40px, -60px) rotateY(±35deg) rotateZ(±24deg)\` with \`opacity: 0\` — the card doesn't just leave sideways, it tumbles away in 3D and recedes in depth at the same time, driven by the same \`cubic-bezier(0.34, 1.56, 0.64, 1)\` overshoot easing used for the resting stack transforms. Below the threshold, the card's inline transform is simply cleared and \`layoutStack()\` restores it to its resting position in the deck.

**Removing the card and re-stacking**

\`resolveSwipe()\` listens for \`transitionend\` on the flying card, removes it from the DOM once the fly-away animation finishes, then calls \`layoutStack()\` again (so every remaining card shifts up one position in depth) and \`bindTopCard()\` again (so drag listeners are re-attached to whatever card is now on top). Re-binding on every card change, rather than delegating listeners once at the container level, keeps the drag logic simple since each card's own local \`dx\`/\`dy\`/\`dragging\` state never has to be reset or looked up by identity.

**Buttons as an alternative input**

The like/skip buttons call the exact same \`resolveSwipe()\` function the drag gesture uses, just with a hardcoded direction instead of one derived from pointer position — this keeps swipe-by-drag and swipe-by-button visually and behaviorally identical, and means any future change to the fly-away animation automatically applies to both input methods.

**Adapting the deck**

Because every card's resting transform is computed purely from its index (\`depth\`) inside \`layoutStack()\`, adding, removing, or reordering cards in the HTML requires no other code changes — the function re-derives every card's position, rotation, scale, and opacity from scratch on each call.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the top card', text: 'Drag left or right past roughly 110px and release — it flies away in 3D and reveals the next card.' },
        { title: 'Use the buttons', text: 'Click the X or heart button to skip or like the top card without dragging.' },
        { title: 'Add more cards', text: 'Add more .card elements inside #stack in the HTML panel — layoutStack() automatically re-derives every position from index.' },
        { title: 'Adjust stack depth/spacing', text: 'Change the depth*8/depth*-30/depth*-2/depth*0.045 multipliers inside layoutStack().' },
        { title: 'Change the swipe threshold', text: 'Edit the 110 (pixels) comparison inside onUp() to make swipes trigger sooner or require more drag distance.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real 3D stacking via translateZ + rotateX inside a perspective container, not a 2D scale illusion',
      'Pointer Events drag (pointerdown/pointermove/pointerup) unifies mouse, touch, and pen input',
      'Live rotateZ/rotateY tilt proportional to drag distance while the top card is being dragged',
      'Fly-away swipe animates translateZ, rotateY, and rotateZ together for a genuine tumble-away exit',
      'Distance-threshold logic decides swipe vs. snap-back on pointer release',
      'Like/skip buttons call the identical resolveSwipe() function used by drag, so both stay in sync',
      'layoutStack() re-derives every card position purely from its index — add/remove cards freely',
      'Empty-state message appears automatically once every card has been swiped',
      'Zero dependencies — no Hammer.js, no swipe-gesture library',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Recommendation and discovery feeds', desc: 'The canonical use case — swipe-to-decide interfaces for matching, browsing, or curating a list of items one at a time.' },
      { icon: 'FORM', title: 'Onboarding preference pickers', desc: 'Ask new users to like/skip through a stack of interests, topics, or products to seed a personalization model.' },
      { icon: 'LEARN', title: 'Flashcard-style review decks', desc: 'Swipe left for "review again" and right for "got it" through a stack of study or vocabulary cards.' },
      { icon: 'CODE', title: 'Learn 3D drag interactions', desc: 'A compact reference for combining Pointer Events drag tracking with CSS 3D transforms (translateZ, rotateY, rotateX) instead of flat 2D dragging.' },
      { icon: 'DESIGN', title: 'Portfolio/case-study card decks', desc: 'Present project highlights or testimonials as a swipeable deck with real depth instead of a flat carousel.' },
      { icon: 'ACCESS', title: 'Keyboard-alternative browsing', desc: 'The like/skip buttons already provide a non-drag path through the deck; extend with keyboard arrow-key bindings for full accessibility.' },
      { icon: 'CODE', title: 'Related: Avatar Stack Fan Expand', desc: 'See the [Avatar Stack Fan Expand](/ui-snippets/avatar-stack-fan-expand/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the stacked depth effect real 3D or a 2D trick?', a: 'It is real 3D. Each card behind the top one gets a translateZ offset (pushing it back along the Z axis) inside a parent with CSS perspective, plus a small rotateX tilt, so the deck has genuine perspective falloff rather than just being scaled smaller in 2D.' },
      { q: 'What decides whether a drag counts as a swipe or snaps back?', a: 'onUp() compares the total horizontal drag distance (dx) against a 110px threshold in either direction. Past the threshold, resolveSwipe() runs the fly-away animation. Below it, the card transform resets and layoutStack() restores its resting position.' },
      { q: 'Why use Pointer Events instead of separate mouse and touch listeners?', a: 'The Pointer Events API (pointerdown/pointermove/pointerup) fires for mouse, touch, and pen input through one unified event model, so a single set of listeners handles dragging on both desktop and mobile without duplicating logic for each input type.' },
      { q: 'How do the like/skip buttons stay visually consistent with dragging?', a: 'Both paths call the exact same resolveSwipe(card, direction) function — the buttons just hardcode the direction instead of deriving it from drag distance — so any change to the fly-away animation automatically applies to both.' },
      { q: 'How do I add more cards or change their content?', a: 'Add more .card elements inside #stack in the HTML. layoutStack() computes every card resting transform purely from its position in the DOM, so no JavaScript changes are needed when the card count changes.' },
      { q: 'What happens when every card has been swiped?', a: 'resolveSwipe() checks stack.children.length after removing a card, and if none remain, appends a plain "You have viewed every card" message in place of the deck.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to walk through how translateZ combines with the parent's perspective to create real depth in the stack, versus just scaling cards smaller in 2D — understanding that distinction is what lets you confidently retune the stacking depth values. It is also a great base to extend: ask the assistant to help you add velocity-based swipe detection (using the drag speed, not just distance, to decide a swipe) or to persist which cards have already been swiped in localStorage so the deck resumes where the user left off.`,
      prompt: `Build a swipeable, Tinder-style card stack in plain HTML, CSS, and JavaScript with genuine 3D depth between stacked cards and a 3D fly-away swipe animation — no gesture library.

Requirements:
- A stack of absolutely-positioned card elements inside a container with CSS perspective set on the container.
- A function that positions every card except the top one using translate3d with a Z-axis offset proportional to its stack index (so cards further back genuinely recede in 3D, not just scale down), plus a small rotateX tilt and a slight downward Y offset, so it reads as a fanned deck.
- Pointer Events (pointerdown/pointermove/pointerup) drag support on the top card: while dragging, the card should follow the pointer's X/Y movement and rotate proportionally (rotateZ and a 3D rotateY tilt) based on horizontal drag distance.
- On release, if the horizontal drag distance passed a threshold (around 100-120px) in either direction, animate the card flying off screen in that direction using translate3d (including a further negative Z push so it recedes as it exits), rotateY, and rotateZ together, fading its opacity to 0, then remove it from the DOM once the transition ends and re-layout the remaining stack.
- If the drag did not pass the threshold, snap the card back to its resting stacked position instead.
- Add like and skip buttons that trigger the exact same swipe-resolution function as dragging, just with a fixed direction, so both input methods behave identically.
- Show a simple message once every card has been removed from the stack.`,
    },
  },
};

export default swipeCardStack3d;
