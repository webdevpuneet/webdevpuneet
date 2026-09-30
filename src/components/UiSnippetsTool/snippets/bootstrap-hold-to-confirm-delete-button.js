const bootstrapHoldToConfirmDeleteButton = {
  id: 'bootstrap-hold-to-confirm-delete-button',
  title: 'Bootstrap Hold-to-Confirm Delete Button',
  lastmod: '2026-09-11',
  category: 'buttons',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bshold-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-1" id="bshold-title">Project Alpha</h5>
      <p class="small text-muted mb-3">Press and hold the button for 1.5 seconds to delete &mdash; releasing early cancels it.</p>

      <button type="button" class="btn btn-outline-danger bshold-btn w-100" id="bsholdBtn">
        <span class="bshold-fill" id="bsholdFill"></span>
        <span class="bshold-label">Hold to delete</span>
      </button>

      <p class="small text-muted mt-3 mb-0" id="bsholdStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bshold-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bshold-btn { position: relative; overflow: hidden; font-weight: 700; user-select: none; touch-action: none; }
.bshold-fill { position: absolute; inset: 0; width: 0%; background: #dc3545; z-index: 0; pointer-events: none; }
.bshold-label { position: relative; z-index: 1; }
.bshold-btn:hover .bshold-label { color: inherit; }
.bshold-btn.bshold-active .bshold-label { color: #fff; }
#bsholdStatus.text-danger { color: #dc3545 !important; }`,
  js: `const btn = document.getElementById('bsholdBtn');
const fill = document.getElementById('bsholdFill');
const status = document.getElementById('bsholdStatus');
const title = document.getElementById('bshold-title');
const HOLD_MS = 1500;

let timer = null;
let deleted = false;

function startHold() {
  if (deleted) return;
  btn.classList.add('bshold-active');
  fill.style.transition = 'width ' + HOLD_MS + 'ms linear';
  // Reflow before flipping the width so the transition actually animates
  // from 0 instead of jumping straight to 100.
  requestAnimationFrame(() => { fill.style.width = '100%'; });
  status.textContent = 'Keep holding...';
  status.className = 'small text-muted';
  timer = setTimeout(completeDelete, HOLD_MS);
}

function cancelHold() {
  if (deleted || timer === null) return;
  clearTimeout(timer);
  timer = null;
  btn.classList.remove('bshold-active');
  fill.style.transition = 'width 180ms ease';
  fill.style.width = '0%';
  status.textContent = 'Cancelled — released too early.';
  status.className = 'small text-muted';
}

function completeDelete() {
  deleted = true;
  timer = null;
  btn.disabled = true;
  status.textContent = title.textContent + ' was deleted.';
  status.className = 'small text-danger fw-semibold';
}

btn.addEventListener('pointerdown', startHold);
btn.addEventListener('pointerup', cancelHold);
btn.addEventListener('pointerleave', cancelHold);
btn.addEventListener('pointercancel', cancelHold);

// Keyboard users get the same press-and-hold behavior with Space/Enter,
// guarded against the browser's own key-repeat re-firing keydown every
// frame while a key stays physically pressed.
let keyHolding = false;
btn.addEventListener('keydown', e => {
  if ((e.key === ' ' || e.key === 'Enter') && !keyHolding) {
    keyHolding = true;
    startHold();
  }
});
btn.addEventListener('keyup', e => {
  if (e.key === ' ' || e.key === 'Enter') {
    keyHolding = false;
    cancelHold();
  }
});`,

  seo: {
    title: 'Bootstrap Hold-to-Confirm Delete Button — Free HTML CSS JS Snippet',
    description: 'A real press-and-hold delete button built with Bootstrap 5.3 — a visible fill animates across the button over 1.5 seconds, releasing early cancels instantly, and full keyboard support works the same way with Space or Enter.',
    about: {
      title: 'Bootstrap Hold-to-Confirm Delete Button — HTML, CSS & JavaScript',
      description: `A hold-to-confirm button replaces a modal dialog with time itself as the confirmation — instead of asking "are you sure?" in a second popup, it simply requires 1.5 uninterrupted seconds of intent. The mechanism is a \`.bshold-fill\` element whose \`width\` is animated from 0% to 100% with a real CSS transition timed to match a \`setTimeout\` of the same duration, so the visual fill and the actual deletion always complete at the same instant rather than being two unrelated animations that happen to look synced.\n\nCanceling has to feel immediate, which is why \`cancelHold()\` swaps the transition to a much shorter 180ms before resetting the width — reusing the full 1500ms transition for the reset would make releasing early feel like it takes as long as holding all the way through. The \`requestAnimationFrame\` wrapper around setting \`width: 100%\` in \`startHold()\` exists for a specific reason: setting a new transition duration and a new target width in the same synchronous tick can let the browser coalesce them into one paint with no visible animation at all, so the frame is forced to flush the transition-duration change first.\n\nKeyboard support isn't bolted on as an afterthought — Space and Enter drive the exact same \`startHold()\`/\`cancelHold()\` functions a pointer does, guarded with a \`keyHolding\` flag specifically because a held key fires repeated \`keydown\` events (key-repeat) that would otherwise restart the hold timer every few milliseconds and make it impossible to ever complete.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A red outline "Hold to delete" button sits below the project name, with no status message yet.' },
        { title: 'Press and hold the button', text: 'A solid red fill sweeps left to right across the button over 1.5 seconds, and the label turns white as it\'s covered.' },
        { title: 'Release before the fill finishes', text: 'The fill snaps back to empty almost instantly and the status reads "Cancelled — released too early."' },
        { title: 'Press and hold all the way through', text: 'Once the fill reaches 100%, the button disables and the status confirms the deletion.' },
        { title: 'Tab to the button and hold Space instead of clicking', text: 'The exact same fill animation and timing plays for keyboard users.' },
      ],
    },
    features: [
      'A real CSS width transition timed to match the setTimeout duration exactly, not two independent animations',
      'Releasing early cancels with a fast 180ms reset instead of reusing the slow fill-in duration',
      'A requestAnimationFrame guard prevents the browser from silently skipping the fill animation',
      'Full keyboard support via Space/Enter, using the identical hold logic a pointer uses',
      'A keyHolding flag stops native key-repeat from restarting the timer while a key is held down',
      'pointerleave and pointercancel both cancel the hold, so dragging off the button mid-press behaves like a release',
    ],
    useCases: [
      { icon: 'APP', title: 'Destructive actions in settings and admin panels', desc: 'An alternative to [bootstrap-type-confirm-delete-modal](/ui-snippets/bootstrap-type-confirm-delete-modal/) for lower-friction confirmation where a full modal feels heavier than the action warrants.' },
      { icon: 'MOBILE', title: 'Touch interfaces and mobile apps', desc: 'A press-and-hold gesture reads naturally on touch devices, where an accidental tap is far more common than an accidental 1.5-second hold.' },
      { icon: 'CART', title: 'Removing items from a cart or list without a confirmation popup', desc: 'Skips an extra modal click entirely while still requiring deliberate, sustained intent before anything is removed.' },
      { icon: 'LEARN', title: 'Learning transition-timed interaction patterns', desc: 'The fill-matches-timeout technique here generalizes to any UI where a visible progress indicator should complete at the exact moment an action fires.' },
    ],
    faqs: [
      { q: 'Why use a CSS transition instead of a JavaScript-driven progress loop?', a: 'A CSS transition is handled by the browser\'s compositor and stays smooth even if the main thread is briefly busy, whereas a requestAnimationFrame-driven width update competing with other work could visibly stutter.' },
      { q: 'What happens if I drag my pointer off the button while holding?', a: 'The pointerleave listener cancels the hold exactly like releasing the mouse button does — leaving the button\'s bounds is treated as giving up on the action.' },
      { q: 'Why is there a special case for keyboard key-repeat?', a: 'Holding a key down fires keydown repeatedly (the operating system\'s own key-repeat), and without the keyHolding guard each repeated event would call startHold() again and reset the timer, making it impossible to ever reach 1.5 seconds.' },
      { q: 'Can I change the hold duration?', a: 'Yes — change the single HOLD_MS constant; both the setTimeout delay and the CSS transition duration read from it, so the visual fill and the actual delete timing can never drift out of sync.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the timer and deleted flag in a ref (not state, since they don\'t need to trigger re-renders on their own), and drive the fill width through a CSS custom property or inline style bound to the same startHold/cancelHold logic.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a subtle haptic-style pulse animation on the button right as the hold completes, or to make the hold duration configurable per button via a data-hold-ms attribute so the same component can be reused with different confirmation lengths on the same page.`,
      prompt: `Build a Bootstrap 5.3 hold-to-confirm delete button, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card, not custom CSS made to resemble it.

Requirements:
- A button labeled "Hold to delete" with an absolutely positioned fill element inside it that visually sweeps from 0% to 100% width using a real CSS transition.
- A single HOLD_MS constant (around 1500) that drives both the CSS transition duration and a matching setTimeout, so the fill animation finishes at the exact moment the delete action fires.
- Releasing the pointer (pointerup, pointerleave, or pointercancel) before the hold completes must cancel the timer and reset the fill quickly, using a noticeably shorter transition duration than the fill-in animation.
- Support keyboard users identically via Space and Enter keydown/keyup, and prevent the operating system's key-repeat from restarting the hold timer on every repeated keydown while a key is held.
- Once the hold completes, disable the button and show a status message confirming the item was deleted.`,
    },
  },
};

export default bootstrapHoldToConfirmDeleteButton;
