const slideToConfirm = {
  id: 'slide-to-confirm',
  title: 'Slide to Confirm',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="sc-wrap">
  <div class="sc-track" id="scTrack">
    <div class="sc-fill" id="scFill"></div>
    <span class="sc-label" id="scLabel">Slide to confirm payment</span>
    <button class="sc-handle" id="scHandle" aria-label="Slide to confirm">
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>
    </button>
  </div>
  <button class="sc-reset" id="scReset">↺ Reset</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}
.sc-wrap{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%;max-width:340px}

.sc-track{position:relative;width:100%;height:60px;background:#1e293b;border:1px solid #334155;border-radius:30px;overflow:hidden;display:flex;align-items:center;user-select:none;touch-action:none}
.sc-track.done{border-color:#10b981}

.sc-fill{position:absolute;left:0;top:0;bottom:0;width:100%;background:linear-gradient(90deg,#059669,#10b981);transform:scaleX(0);transform-origin:left;border-radius:30px}
.sc-fill.animate{transition:transform .3s cubic-bezier(.4,0,.2,1)}

.sc-label{position:absolute;left:0;right:0;text-align:center;font-size:14px;font-weight:700;color:#94a3b8;pointer-events:none;z-index:1;padding-left:30px;letter-spacing:.01em}
.sc-track.done .sc-label{color:#fff}

.sc-handle{position:absolute;left:5px;top:5px;width:50px;height:50px;border-radius:50%;background:#fff;border:none;color:#6366f1;display:flex;align-items:center;justify-content:center;cursor:grab;z-index:2;box-shadow:0 4px 12px rgba(0,0,0,.3);font-size:18px;font-weight:800}
.sc-handle:active{cursor:grabbing}
.sc-handle.animate{transition:transform .3s cubic-bezier(.4,0,.2,1)}
.sc-track.done .sc-handle{color:#10b981}

.sc-reset{background:none;border:none;color:#475569;font-size:12px;font-weight:700;cursor:pointer;font-family:inherit;opacity:0;pointer-events:none;transition:opacity .2s}
.sc-reset.show{opacity:1;pointer-events:auto}
.sc-reset:hover{color:#94a3b8}`,

  js: `var track = document.getElementById('scTrack');
var handle = document.getElementById('scHandle');
var fill = document.getElementById('scFill');
var label = document.getElementById('scLabel');
var resetBtn = document.getElementById('scReset');
var dragging = false, offset = 0, pos = 0, done = false;

function maxPos() { return track.clientWidth - handle.offsetWidth - 10; }

function setPos(p) {
  pos = Math.max(0, Math.min(maxPos(), p));
  handle.style.transform = 'translateX(' + pos + 'px)';
  fill.style.transform = 'scaleX(' + ((pos + handle.offsetWidth + 5) / track.clientWidth) + ')';
}

function down(e) {
  if (done) return;
  dragging = true;
  handle.classList.remove('animate');
  fill.classList.remove('animate');
  var x = e.touches ? e.touches[0].clientX : e.clientX;
  offset = x - pos;
  if (e.cancelable) e.preventDefault();
}

function move(e) {
  if (!dragging) return;
  var x = e.touches ? e.touches[0].clientX : e.clientX;
  setPos(x - offset);
}

function up() {
  if (!dragging) return;
  dragging = false;
  handle.classList.add('animate');
  fill.classList.add('animate');
  if (pos >= maxPos() - 4) complete();
  else setPos(0);
}

function complete() {
  done = true;
  setPos(maxPos());
  fill.style.transform = 'scaleX(1)';
  track.classList.add('done');
  label.textContent = '✓ Payment confirmed';
  resetBtn.classList.add('show');
}

function resetSlide() {
  done = false;
  track.classList.remove('done');
  label.textContent = 'Slide to confirm payment';
  resetBtn.classList.remove('show');
  handle.classList.add('animate');
  fill.classList.add('animate');
  setPos(0);
}

handle.addEventListener('mousedown', down);
handle.addEventListener('touchstart', down, { passive: false });
window.addEventListener('mousemove', move);
window.addEventListener('touchmove', move, { passive: false });
window.addEventListener('mouseup', up);
window.addEventListener('touchend', up);
resetBtn.addEventListener('click', resetSlide);`,

  seo: {
    title: 'Slide to Confirm — Drag Slider HTML CSS JS Snippet',
    description: `Slide-to-confirm drag control: drag the handle across the track to commit, with a green fill, snap-back & a locked state. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Slide to Confirm — Drag-to-Commit Handle, Snap-Back & Confirmed Lock State`,
      description: `"Slide to confirm" is the deliberate-action control: instead of a one-tap button that is easy to hit by accident, the user must drag a handle all the way across a track to commit. It is the right pattern for irreversible or high-stakes actions — sending a payment, deleting an account, dispatching an order, unlocking a device. This snippet implements it in plain HTML, CSS, and vanilla JavaScript with full touch and mouse support: a draggable handle, a fill that tracks the drag, snap-back if released early, and a locked confirmed state.

**Transform-based dragging (smooth everywhere)**

The handle moves with \`transform: translateX\` and the green fill grows with \`transform: scaleX\` from a left origin — both are compositor-friendly transforms, so the drag is smooth and, importantly, the animation survives a Tailwind/React export unchanged (utility frameworks animate transforms but not raw \`width\`). During an active drag the position is set directly with no transition for 1:1 finger tracking; only the snap-back and confirm use a \`.animate\` class that adds \`transition: transform\`.

**Accurate pointer math**

On press, \`down\` records the offset between the pointer and the handle's current position, so the handle does not jump to the cursor. \`move\` then sets the position as \`pointerX − offset\`, clamped between 0 and \`maxPos()\` (the track width minus the handle and padding, measured live so it stays correct if the layout changes). The move and up listeners live on \`window\`, so dragging continues even if the pointer leaves the track.

**Threshold, snap-back, and lock**

On release, \`up\` checks whether the handle reached the end (within a few pixels of \`maxPos()\`). If it did, \`complete()\` locks the control: it snaps the handle fully right, fills the track green, changes the label to "✓ Payment confirmed", and reveals a reset link. If it did not, the handle and fill animate back to the start — the action is *not* committed, which is the whole point of requiring a full, intentional slide. A \`done\` flag blocks further dragging once confirmed so the action cannot fire twice.

**Replayable**

A reset button (hidden until confirmation) calls \`resetSlide\`, animating everything back to the initial state so you can demo it repeatedly or re-arm the control after, say, a failed transaction.

Because the commit happens only in \`complete()\`, wiring it to a real action is a one-line change. Pair this with a [confirm dialog](/ui-snippets/confirm-dialog/) for typed confirmations, an [order summary](/ui-snippets/order-summary/) before payment, or a [download button](/ui-snippets/download-button/) for progress-based actions.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark pill track appears with a white circular handle on the left and the label "Slide to confirm payment".` },
      { title: 'Drag the handle', text: `Press the handle and drag right — it follows your finger 1:1 and a green fill grows behind it.` },
      { title: 'Release early', text: `Let go before the end — the handle and fill spring back to the start and nothing is confirmed.` },
      { title: 'Slide all the way', text: `Drag to the far right and release — the track locks green, the label becomes "✓ Payment confirmed", and a reset link appears.` },
      { title: 'Reset and replay', text: `Click "↺ Reset" — everything animates back so you can try again or re-arm the control.` },
      { title: 'Wire your action', text: `Put your real API call or navigation inside \`complete()\` — it only runs on a full, intentional slide.` },
    ] },
    features: [
      { title: 'Transform-based drag', text: `Handle uses \`translateX\` and the fill uses \`scaleX\`, so the motion is compositor-smooth and survives Tailwind/React export (which animate transforms, not raw width).` },
      { title: 'Jump-free grab', text: `\`down\` records the pointer-to-handle offset, so grabbing the handle anywhere does not snap it to the cursor — it tracks naturally.` },
      { title: 'Live-measured bounds', text: `\`maxPos()\` reads the track and handle sizes on each use, so the end threshold stays correct even if the layout resizes.` },
      { title: 'Window-level tracking', text: `Move and release listeners on \`window\` keep the drag alive when the pointer leaves the track mid-slide.` },
      { title: 'Threshold commit', text: `Release within a few pixels of the end triggers \`complete()\`; anything short animates back, enforcing a deliberate full slide.` },
      { title: 'Locked confirmed state', text: `On confirm, a \`done\` flag blocks further dragging so the action cannot double-fire, and the track turns green with a check label.` },
      { title: 'Snap-back animation', text: `An \`.animate\` class adds \`transition: transform\` only for snap-back and confirm, keeping the active drag perfectly 1:1.` },
      { title: 'Touch + mouse', text: `Pointer coordinates are read from \`e.touches\` or \`e.clientX\`, so it works identically on phones and desktops.` },
    ],
    useCases: [
      { title: 'Payment and checkout confirmation', text: `A deliberate "slide to pay" before charging a card. Place it after an [order summary](/ui-snippets/order-summary/) so users review then commit.` },
      { title: 'Destructive action guards', text: `Require a full slide to delete an account or wipe data; pair with a [confirm dialog](/ui-snippets/confirm-dialog/) for an extra typed safeguard.` },
      { title: 'Dispatch and approval flows', text: `"Slide to send", "slide to approve", or "slide to publish" in admin tools where an accidental tap would be costly. Pair reversible ones with a [snackbar with undo](/ui-snippets/snackbar-undo/).` },
      { title: 'Unlock and access controls', text: `Slide-to-unlock for kiosks, lock screens, or gated content, mirroring the original mobile unlock gesture.` },
      { title: 'Emergency and high-stakes triggers', text: `Arm or trigger an action that must not fire by accident, where the long deliberate motion is the safety mechanism.` },
      { title: 'Ride-share / delivery handoffs', text: `"Slide to start trip" or "slide to mark delivered" — a confident, unambiguous commit gesture on mobile.` },
    ],
    faqs: [
      { q: 'How do I run my action when confirmed?', a: `Put your code inside \`complete()\` — it is called only when the handle is released at the end of the track. For async actions (a payment API), keep the locked state during the request and, on failure, call \`resetSlide()\` with an error message so the user can slide again; on success, leave it locked or navigate away.` },
      { q: 'Why animate transform instead of the fill width?', a: `Transforms (\`translateX\`, \`scaleX\`) run on the compositor for smoothness, and — crucially for this site's framework exports — Tailwind's \`transition\` utility animates transform but not raw \`width\`. Using \`scaleX\` for the fill means the snap-back animation works identically in the HTML, React, Vue, and Tailwind versions.` },
      { q: 'How do I change the confirm threshold?', a: `\`up()\` confirms when \`pos >= maxPos() - 4\` (within 4px of the end). Lower the tolerance for a stricter "must reach the very end" feel, or raise it to forgive a slightly short slide. You can also require holding at the end briefly before committing by adding a short timer in \`up()\`.` },
      { q: 'Is slide-to-confirm accessible?', a: `Dragging alone is not accessible, so provide a keyboard path: make the handle a focusable \`<button>\` (it is) and support Enter/Space or Arrow-Right-to-fill as an alternative that calls \`complete()\`. Add \`role="slider"\` with \`aria-valuenow\` updated as it moves, and ensure the confirmed state is announced via the label text, not colour alone.` },
      { q: 'How do I use slide-to-confirm in React, Vue, or Angular?', a: `In React, store the position in a ref (not state, to avoid re-render per frame), attach pointer listeners in a \`useEffect\` with cleanup, and set the transform via the handle ref; flip a \`confirmed\` state in \`complete\`. In Vue, use template refs and \`onMounted\`/\`onUnmounted\`. In Angular, bind in \`ngAfterViewInit\` with \`@ViewChild\`. The transform math and snap-back CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the pointer math or the threshold logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why down() records an offset between the pointer and the handle's current position instead of just using the raw pointer coordinate, or why maxPos() is recalculated live rather than cached once. The same assistant can help optimize it, for instance checking whether the move handler could throttle its style writes on very high-frequency pointer events without hurting the 1:1 tracking feel. It is just as useful for extending the control: ask it to add a keyboard-accessible fallback with arrow-key filling and a role of slider with aria-valuenow, support a hold-at-the-end confirmation delay before locking, or add a haptic vibration call on mobile when the slide completes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "slide to confirm" drag-to-commit control in plain HTML, CSS, and JavaScript, supporting both mouse and touch — no libraries.

Requirements:
- A pill-shaped track containing a label, a fill element, and a circular draggable handle positioned at the left edge.
- The handle's position must be driven only by a CSS transform: translateX, and the fill's growth only by transform: scaleX from a left transform-origin — do not animate raw width or left/right positioning, so the motion stays compositor-smooth and survives being exported to a utility-class framework that only animates transforms.
- On pointer-down, record the offset between the pointer's coordinate and the handle's current position so that grabbing the handle anywhere on its face does not cause it to jump to the cursor location.
- On pointer-move, compute the new position as pointerCoordinate minus that recorded offset, clamped between zero and a live-measured maximum derived from the track's current width minus the handle's width and padding — recompute this maximum on each interaction rather than caching it once, so it stays correct if the layout changes.
- Attach the move and release listeners to the window, not just the track or handle, so a drag continues tracking correctly even if the pointer leaves the track's bounds mid-gesture.
- On release, if the handle's position is within a few pixels of the maximum, lock the control into a confirmed state: snap the handle fully to the end, fill the entire track, change the label text, and block any further dragging via a boolean flag. If released short of that threshold, animate both the handle and fill back to the start with a CSS transition that is only enabled during the snap-back and confirm moments, not during active dragging.
- Provide a reset control that reverses the confirmed state and animates everything back to the starting position so the interaction can be replayed.`,
    },
  },
};

export default slideToConfirm;
