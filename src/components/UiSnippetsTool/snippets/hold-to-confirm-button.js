const holdToConfirmButton = {
  id: 'hold-to-confirm-button',
  title: 'Hold to Confirm Button',
  lastmod: '2026-07-18',
  category: 'buttons',
  html: `<div class="hc-wrap">
  <button type="button" class="hc-btn" id="hcBtn">
    <span class="hc-fill" id="hcFill"></span>
    <span class="hc-label" id="hcLabel">Hold to delete</span>
  </button>
  <p class="hc-status" id="hcStatus">Press and hold for 1.2s</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.hc-wrap{text-align:center;width:100%;max-width:260px}
.hc-btn{position:relative;width:100%;border:none;border-radius:11px;background:#7f1d1d;color:#fff;font-family:inherit;font-size:14.5px;font-weight:800;padding:14px;cursor:pointer;overflow:hidden;user-select:none;-webkit-user-select:none;touch-action:none;transition:transform .1s}
.hc-btn:active{transform:scale(.985)}
.hc-fill{position:absolute;left:0;top:0;bottom:0;width:0;background:#dc2626;z-index:1}
.hc-label{position:relative;z-index:2;display:flex;align-items:center;justify-content:center;gap:7px}
.hc-btn.done{background:#16a34a}
.hc-btn.done .hc-fill{background:#16a34a}

.hc-status{margin-top:14px;font-size:12px;color:#94a3b8;font-weight:600;min-height:16px}`,

  js: `var btn = document.getElementById('hcBtn');
var fill = document.getElementById('hcFill');
var label = document.getElementById('hcLabel');
var status = document.getElementById('hcStatus');

var HOLD_MS = 1200;
var startTime = 0;
var raf = null;
var done = false;

function frame(now) {
  var elapsed = now - startTime;
  var progress = Math.min(1, elapsed / HOLD_MS);
  fill.style.width = (progress * 100) + '%';
  if (progress >= 1) { confirm(); return; }
  raf = requestAnimationFrame(frame);
}

function start() {
  if (done) reset();
  startTime = performance.now();
  status.textContent = 'Keep holding\\u2026';
  raf = requestAnimationFrame(frame);
}

// Cancel if the pointer is released before the bar fills.
function cancel() {
  if (done) return;
  cancelAnimationFrame(raf);
  raf = null;
  fill.style.transition = 'width .2s';
  fill.style.width = '0%';
  status.textContent = 'Released too soon \\u2014 try again';
  setTimeout(function () { fill.style.transition = ''; }, 220);
}

function confirm() {
  cancelAnimationFrame(raf);
  done = true;
  btn.classList.add('done');
  fill.style.width = '100%';
  label.textContent = 'Deleted';
  status.textContent = 'Action confirmed';
}

function reset() {
  done = false;
  btn.classList.remove('done');
  fill.style.width = '0%';
  label.textContent = 'Hold to delete';
  status.textContent = 'Press and hold for 1.2s';
}

btn.addEventListener('pointerdown', function (e) { btn.setPointerCapture(e.pointerId); start(); });
btn.addEventListener('pointerup', cancel);
btn.addEventListener('pointercancel', cancel);
btn.addEventListener('pointerleave', function () { if (raf) cancel(); });`,

  seo: {
    title: 'Hold to Confirm Button — Free Press and Hold JS Snippet',
    description: `A press-and-hold confirm button with a filling progress bar that cancels on early release and locks in on completion. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Hold to Confirm Button — Press-and-Hold Action',
      description: `A hold-to-confirm button replaces a two-step "Are you sure?" dialog with a single deliberate gesture: the user presses and holds, a bar fills, and the action only fires when it completes. It's the safety pattern behind "hold to delete", "hold to power off", and destructive actions in apps that want intent without a modal interrupt. This snippet builds it in plain HTML, CSS, and vanilla JavaScript with no dependency.

**Time-based progress, not a CSS transition**

The fill is driven by \`requestAnimationFrame\` against \`performance.now()\`, not a fixed CSS animation. Each frame computes \`progress = elapsed / HOLD_MS\` and sets the fill width, so the bar's position always reflects exactly how long the button has been held — and releasing mid-way leaves it at the real point reached. Reaching \`progress >= 1\` calls \`confirm()\` once and stops the loop, so the action can't double-fire.

**Pointer Events with capture**

A single set of Pointer Events covers mouse, touch, and pen. On \`pointerdown\` the button calls \`setPointerCapture\`, which means it keeps receiving \`pointerup\` even if the finger drifts off the button — critical on touch, where a small slide would otherwise drop the release event and leave the hold stuck. \`touch-action:none\` stops the page scrolling while you hold.

**Cancel on early release**

\`pointerup\`, \`pointercancel\`, and a guarded \`pointerleave\` all route to \`cancel()\`, which stops the animation frame and animates the fill back to zero with a brief CSS transition (re-enabled only for the retract so the fill-up itself stays frame-accurate). A status line gives feedback — "Released too soon" — so the gesture's requirement is obvious without trial and error.

**Locked completion and reset**

On success the button turns green, swaps its label to "Deleted", and sets \`done\`, which makes the next press reset first rather than re-running. Separating \`confirm()\`, \`cancel()\`, and \`reset()\` keeps each transition explicit and makes the control easy to reason about.

**Wiring to a real action**

Put your destructive call inside \`confirm()\` — delete the record, sign out, wipe the cache. Because completion is the single choke point, you get the safety of a held gesture with one line of integration, and you can tune \`HOLD_MS\` to match how dangerous the action is.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A red "Hold to delete" button renders with a status line beneath it.` },
      { title: 'Press and hold', text: `A fill bar sweeps across the button while you keep pressing.` },
      { title: 'Release early', text: `Letting go before it fills retracts the bar and shows a retry hint.` },
      { title: 'Hold to completion', text: `At full the button turns green and the action confirms once.` },
      { title: 'Press again to reset', text: `A completed button resets on the next press before re-running.` },
      { title: 'Wire your action', text: `Put the real delete or sign-out call inside confirm().` },
    ] },
    features: [
      { title: 'Time-accurate fill', text: `rAF against performance.now() reflects real hold duration.` },
      { title: 'Pointer capture', text: `Release is caught even if the finger drifts off the button.` },
      { title: 'Cancel on release', text: `Early release retracts the bar with a brief transition.` },
      { title: 'Fires exactly once', text: `Completion stops the loop so the action can't double-run.` },
      { title: 'Clear feedback', text: `A status line states the requirement and the result.` },
      { title: 'Tunable duration', text: `One HOLD_MS constant sets how long the hold takes.` },
      { title: 'Touch-friendly', text: `touch-action:none keeps the page still while holding.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS — no modal or confirm library.` },
    ],
    useCases: [
      { title: 'Destructive actions', text: 'Replace a plain [confirm dialog](/ui-snippets/confirm-dialog/) with a single deliberate gesture, firing only when a filling bar completes.' },
      { title: 'Slide-style alternatives', text: 'Offer a hold gesture instead of a [slide to confirm](/ui-snippets/slide-to-confirm/), measuring real hold time with `performance.now()` inside `requestAnimationFrame`.' },
      { title: 'Account and security actions', text: 'Confirm sign-out or data wipe, pairing with a [snackbar undo](/ui-snippets/snackbar-undo/) for a second chance after the action has fired.' },
      { title: 'Bulk operations', text: 'Guard a delete inside a [bulk actions bar](/ui-snippets/bulk-actions-bar/) with a hold, using pointer capture so release is detected even if the finger drifts.' },
      { title: 'Kiosk and touch interfaces', text: 'Prevent accidental taps where a [loading button](/ui-snippets/loading-button/) would not be enough, with completion stopping the loop so the action never double-fires.' },
      { icon: 'CODE', title: 'Related: Print This Page Button', desc: 'See the [Print This Page Button](/ui-snippets/print-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use requestAnimationFrame instead of a CSS animation?', a: `Because the progress must reflect the real hold duration so an early release leaves the bar exactly where it stopped. Each frame computes progress as elapsed / HOLD_MS from performance.now() and sets the width. A fixed CSS animation couldn't be paused at an arbitrary point or report how far it got when you let go.` },
      { q: 'How does it work reliably on touch screens?', a: `It uses Pointer Events and calls setPointerCapture on pointerdown, so the button keeps receiving the pointerup even if your finger slides slightly off it — a common cause of stuck holds otherwise. touch-action:none also stops the page from scrolling while you press.` },
      { q: 'What happens if I release too early?', a: `pointerup, pointercancel, and pointerleave all call cancel(), which stops the animation frame and animates the fill back to zero with a short transition, then shows a "Released too soon" message. The transition is enabled only for the retract so the fill-up itself stays frame-accurate.` },
      { q: 'Can the action fire twice?', a: `No. When progress reaches 1, confirm() runs once and the animation loop stops. A done flag marks the button complete so the next press resets it rather than re-triggering, ensuring the destructive action executes a single time per hold.` },
      { q: 'How do I use this hold to confirm button in React, Vue, or Angular?', a: `Keep the progress and done state in the component and store the rAF id and start time in refs (not state) so updating them doesn't re-render. Attach the pointer handlers to a ref'd button, and call your action inside confirm(). Clean up the animation frame on unmount. In Tailwind, the fill is an absolutely-positioned span with an inline width bound to progress.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the pointer-event lifecycle by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setPointerCapture is called on pointerdown, or how the frame function's progress calculation against performance.now() keeps the fill bar accurate even if the browser drops a few animation frames. The same assistant is useful for optimizing it — ask whether the retract transition re-enabled inside cancel could conflict with a rapid press-cancel-press sequence, and how to guard against that race condition. It's just as handy for extending the control: ask it to add a haptic vibration pulse on completion for supporting devices, make HOLD_MS configurable per instance so different actions require different hold lengths, or add a keyboard-accessible fallback using a held Enter or Space key with the same progress logic. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "hold to confirm" button in plain HTML, CSS, and JavaScript using the Pointer Events API — no requestAnimationFrame-free CSS-only trick, no library.

Requirements:
- A button containing an absolutely-positioned fill element (initially zero width, positioned behind the label) and a label span on top of it.
- On pointerdown, capture the pointer with setPointerCapture using the event's pointerId, record the start time via performance.now(), and begin a requestAnimationFrame loop.
- Each animation frame must compute progress as the elapsed time since start divided by a fixed hold duration constant (clamped to a maximum of 1), set the fill element's width to that progress as a percentage, and only trigger the confirmed action once progress reaches exactly 1 — after which the animation loop must stop so the action cannot fire twice.
- On pointerup, pointercancel, or the pointer leaving the button while a hold is in progress, cancel the animation frame, animate the fill back to zero width using a short CSS transition (enabled only for this retract, not for the fill-up itself), and show a message indicating the hold was released too early.
- Set touch-action: none on the button so holding it does not trigger page scrolling on touch devices.
- On successful completion, visually mark the button as done (e.g. a color change and updated label) and make the next press reset the button to its initial state before starting a new hold, rather than immediately re-triggering the action.
- Expose the hold duration as a single named constant so it's trivial to tune for more or less dangerous actions.`,
    },
  },
};

export default holdToConfirmButton;
