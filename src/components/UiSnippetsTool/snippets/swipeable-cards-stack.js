const swipeableCardsStack = {
  id: 'swipeable-cards-stack',
  title: 'Swipeable Cards Stack',
  category: 'cards',
  html: `<div class="stack-wrap">
  <div class="card-stack" id="cardStack">
    <div class="swipe-card" data-name="Card 4" style="background: linear-gradient(135deg,#f59e0b,#d97706)"><span>Card 4</span></div>
    <div class="swipe-card" data-name="Card 3" style="background: linear-gradient(135deg,#10b981,#059669)"><span>Card 3</span></div>
    <div class="swipe-card" data-name="Card 2" style="background: linear-gradient(135deg,#ec4899,#db2777)"><span>Card 2</span></div>
    <div class="swipe-card" data-name="Card 1" style="background: linear-gradient(135deg,#6366f1,#4f46e5)"><span>Card 1</span></div>
  </div>
  <div class="stack-actions">
    <button class="action-btn reject" onclick="programmaticSwipe(-1)" aria-label="Reject">&times;</button>
    <button class="action-btn accept" onclick="programmaticSwipe(1)" aria-label="Accept">&check;</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 24px; display: flex; justify-content: center; }

.stack-wrap { display: flex; flex-direction: column; align-items: center; gap: 20px; }

.card-stack {
  position: relative;
  width: 260px;
  height: 340px;
}

.swipe-card {
  position: absolute;
  inset: 0;
  border-radius: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(15,23,42,0.15);
  cursor: grab;
  touch-action: none;
  transition: transform 0.35s ease, opacity 0.35s ease;
}
.swipe-card:active { cursor: grabbing; }
.swipe-card span { font-size: 22px; font-weight: 700; color: #fff; pointer-events: none; }
.swipe-card.dragging { transition: none; }
.swipe-card.fly-left { transform: translate(-600px, 40px) rotate(-30deg) !important; opacity: 0; }
.swipe-card.fly-right { transform: translate(600px, 40px) rotate(30deg) !important; opacity: 0; }

.stack-actions { display: flex; gap: 20px; }
.action-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  background: #fff;
  font-size: 20px;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(15,23,42,0.15);
}
.action-btn.reject { color: #ef4444; }
.action-btn.accept { color: #22c55e; }
.action-btn:hover { transform: scale(1.06); }`,
  js: `const SWIPE_THRESHOLD = 100;

function getTopCard() {
  const cards = document.querySelectorAll('.swipe-card');
  return cards[cards.length - 1] || null;
}

function attachDrag(card) {
  let startX = 0, startY = 0, currentX = 0, currentY = 0, dragging = false;

  card.addEventListener('pointerdown', (e) => {
    if (card !== getTopCard()) return;
    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.classList.add('dragging');
    card.setPointerCapture(e.pointerId);
  });

  card.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    currentX = e.clientX - startX;
    currentY = e.clientY - startY;
    const rotate = currentX / 12;
    card.style.transform = 'translate(' + currentX + 'px,' + currentY + 'px) rotate(' + rotate + 'deg)';
  });

  card.addEventListener('pointerup', () => {
    if (!dragging) return;
    dragging = false;
    card.classList.remove('dragging');

    if (currentX > SWIPE_THRESHOLD) {
      finishSwipe(card, 1);
    } else if (currentX < -SWIPE_THRESHOLD) {
      finishSwipe(card, -1);
    } else {
      card.style.transform = '';
    }
    currentX = 0;
    currentY = 0;
  });
}

function finishSwipe(card, direction) {
  card.classList.add(direction > 0 ? 'fly-right' : 'fly-left');
  card.addEventListener('transitionend', () => card.remove(), { once: true });
}

function programmaticSwipe(direction) {
  const card = getTopCard();
  if (card) finishSwipe(card, direction);
}

document.querySelectorAll('.swipe-card').forEach(attachDrag);`,

  seo: {
    title: 'Swipeable Cards Stack — Free HTML CSS JS Tinder-Style Swipe Snippet',
    description: 'A Tinder-style draggable card stack: drag the top card left or right with pointer events, feel it rotate as you drag, and watch it fly off past a threshold. Vanilla JS.',
    about: {
      title: 'Swipeable Cards Stack — HTML, CSS & JavaScript Draggable Card Swiper',
      description: `The Tinder-style swipe stack is a widely recognized interaction: a pile of cards where the top one can be dragged left or right, rotates slightly as it's dragged, and either flies off-screen if dragged far enough or springs back to center if released short of the threshold. This snippet implements the whole interaction using the modern **Pointer Events API**, which unifies mouse, touch, and stylus input into a single set of events.

**How only the top card is draggable**

Every \`.swipe-card\` gets a drag listener attached via \`attachDrag\`, but each listener's \`pointerdown\` handler immediately checks \`if (card !== getTopCard()) return\`. \`getTopCard()\` returns the *last* element in the \`.swipe-card\` NodeList, since later siblings render on top in normal DOM stacking order. This guard means clicking or touching a card buried underneath the top one does nothing — only the visually topmost card responds to drag gestures.

**How the drag and rotation work**

\`pointermove\` computes \`currentX\`/\`currentY\` as the offset from the initial \`pointerdown\` position, then sets \`transform: translate(...) rotate(...)\` directly via inline style. The rotation angle is simply \`currentX / 12\` — a card dragged 120px to the right rotates 10 degrees, giving the drag a natural, physical feel where horizontal movement and tilt are proportionally linked, mimicking how a physical card would pivot as you slide it across a table.

**How pointer capture keeps the drag reliable**

\`card.setPointerCapture(e.pointerId)\` is called on \`pointerdown\`. This ensures all subsequent pointer events for that same pointer continue to fire on the card element even if the cursor moves faster than the browser can track and briefly ends up outside the card's bounds — without it, fast drags could "lose" the card and stop responding to movement.

**How the fly-off and reset decision is made**

On \`pointerup\`, \`currentX\` is compared against a \`SWIPE_THRESHOLD\` constant (100px). Past the threshold in either direction, \`finishSwipe\` adds a \`.fly-left\` or \`.fly-right\` class, which uses \`!important\` transform values and a CSS transition to animate the card off-screen and fade it out; a \`transitionend\` listener (with \`{ once: true }\`) then removes the card from the DOM once the animation actually finishes, so the next card underneath becomes the new top card automatically. If the drag didn't clear the threshold, the inline \`transform\` is simply cleared, and the card's own CSS \`transition\` (present whenever \`.dragging\` isn't active) animates it smoothly back to center.

**How the accept/reject buttons reuse the same logic**

The two action buttons call \`programmaticSwipe(direction)\`, which finds the current top card via the same \`getTopCard()\` helper and calls the identical \`finishSwipe\` function used by a real drag gesture — buttons and touch/mouse dragging are just two different triggers for the same underlying swipe logic.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Swipeable Cards Stack" in the sidebar Library tab to load the four-card stack.' },
        { title: 'Drag the top card', text: 'Click and drag (or touch-drag) the top card left or right in the preview and release past the edge to see it fly off.' },
        { title: 'Try the action buttons', text: 'Click the reject (×) and accept (✓) buttons below the stack to trigger the same swipe animation programmatically.' },
        { title: 'Adjust the swipe threshold', text: 'Change SWIPE_THRESHOLD in the JS panel to require a longer or shorter drag before a card commits to flying off.' },
        { title: 'Add more cards', text: 'Add new .swipe-card divs before the existing ones in the HTML (earlier siblings render underneath) — attachDrag runs for every card automatically.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this stack in a real matching or review-queue interface.' },
      ],
    },
    features: [
      'Pointer Events API unifies mouse, touch, and stylus drag handling in one code path',
      'Only the visually topmost card responds to drag gestures via a getTopCard() stacking check',
      'Rotation angle scales proportionally with horizontal drag distance for a natural pivot feel',
      'setPointerCapture prevents fast drags from losing tracking outside the card bounds',
      'Threshold-based decision cleanly separates "commit to swipe" from "spring back to center"',
      'transitionend-driven removal ensures the card is only removed once its fly-off animation visually completes',
      'Programmatic accept/reject buttons reuse the exact same finishSwipe function as real dragging',
      'touch-action: none prevents the browser from also scrolling the page during a drag gesture',
    ],
    useCases: [
      { icon: 'DATING', title: 'Dating and matching apps', desc: 'The canonical use case — swipe right to like, left to pass, with a stack of upcoming profile cards underneath.' },
      { icon: 'FLOW', title: 'Review or triage queues', desc: 'Let a user quickly approve or reject items (support tickets, submissions, photos) one at a time with a satisfying gesture.' },
      { icon: 'LEARN', title: 'Learn the Pointer Events API', desc: 'Study how pointerdown/pointermove/pointerup plus setPointerCapture replace separate mouse and touch event handling.' },
      { icon: 'GAME', title: 'Card-based games and quizzes', desc: 'Reuse the drag-and-flick mechanic for flashcards, quiz questions, or any card-by-card game interaction.' },
      { icon: 'DESIGN', title: 'Onboarding and preference collection', desc: 'Use swipe left/right as a lightweight way to collect binary preferences during an onboarding flow.' },
    ],
    faqs: [
      { q: 'Why does only the top card respond to dragging?', a: 'Every card has a drag listener attached, but each pointerdown handler checks whether the card being touched is the last element in the .swipe-card list (which renders on top due to normal DOM stacking order). If it isn\'t the top card, the handler exits immediately and does nothing.' },
      { q: 'How does the card rotate realistically while being dragged?', a: 'The rotation angle is calculated as the horizontal drag distance divided by a fixed factor (12), so the further the card is dragged sideways, the more it tilts — mimicking how a real card pivots when slid across a surface, rather than staying perfectly upright.' },
      { q: 'What is setPointerCapture doing and why is it needed?', a: 'It locks all subsequent pointer events for that specific pointer to the card element, even if the cursor temporarily moves outside the card\'s boundaries during a fast drag. Without it, quick drags could stop firing move events on the card and appear to "drop" the gesture.' },
      { q: 'How does the card decide whether to fly off or snap back?', a: 'On release, the total horizontal drag distance is compared against a SWIPE_THRESHOLD constant. If it exceeds the threshold in either direction, the card animates off-screen. Otherwise, its inline transform is cleared and its own CSS transition smoothly returns it to the center position.' },
      { q: 'Why is the card only removed from the DOM after a transitionend event?', a: 'Removing the card immediately on release would cut off the fly-off animation before it visually plays. Waiting for the transitionend event guarantees the card is only removed once the CSS animation has actually finished, so the next card underneath appears cleanly.' },
      { q: 'How do the accept/reject buttons trigger the same animation as dragging?', a: 'Both paths call the same finishSwipe(card, direction) function — buttons just find the current top card programmatically and invoke it directly, rather than deriving the direction from a live drag gesture.' },
      { q: 'Does this work on mobile touch screens?', a: 'Yes — Pointer Events unify mouse, touch, and stylus input, and touch-action: none on the card prevents the browser\'s default scroll/zoom gestures from interfering with the drag on touch devices.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why using the Pointer Events API (pointerdown/pointermove/pointerup plus setPointerCapture) is preferable here to handling separate mousedown/touchstart event families, especially for a gesture-heavy component like this one. It's also a great prompt for adding a visual "LIKE"/"NOPE" label that fades in as the card is dragged past a partial threshold (before the full commit threshold), or for wiring up a callback that fires with the swiped-away card's data so the app can act on the accept/reject decision.`,
      prompt: `Build a "swipeable cards stack" (Tinder-style card swiper) in plain HTML, CSS, and vanilla JavaScript using the Pointer Events API — no touch/mouse-specific duplicated handlers, no library.

Requirements:
- A stack of absolutely-positioned cards layered on top of each other, where only the visually topmost card (the last one in DOM order) responds to drag gestures — cards underneath must be completely inert to pointer input.
- Dragging the top card must translate it with the cursor/finger and rotate it proportionally to the horizontal drag distance, using setPointerCapture on pointerdown so fast drags do not lose tracking if the pointer briefly exits the card's bounds.
- On release, if the horizontal drag distance exceeds a configurable threshold in either direction, the card must animate fully off-screen in that direction (continuing its rotation) and fade out, then be removed from the DOM only after that animation visually completes — not immediately on release.
- If the drag did not exceed the threshold, the card must smoothly animate back to its original centered position instead of the drag transform snapping away instantly.
- Two demo buttons (accept, reject) must trigger the exact same off-screen animation and removal logic as a real drag, applied to whichever card is currently on top.
- Disable the browser's native touch scrolling on the cards so the drag gesture works cleanly on touch devices.`,
    },
  },
};

export default swipeableCardsStack;
