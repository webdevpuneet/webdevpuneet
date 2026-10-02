const longPressConfirmRadial = {
  id: 'long-press-confirm-radial',
  title: 'Long-Press Confirm with Radial Fill',
  lastmod: '2026-08-23',
  category: 'buttons',
  cdnUrls: [],
  html: `<div class="lpr-wrap">
  <button type="button" class="lpr-btn" id="lprBtn" aria-label="Press and hold to confirm">
    <svg class="lpr-ring" viewBox="0 0 120 120" aria-hidden="true">
      <circle class="lpr-track" cx="60" cy="60" r="52"></circle>
      <circle class="lpr-fill" id="lprFill" cx="60" cy="60" r="52"></circle>
    </svg>
    <span class="lpr-core">
      <svg class="lpr-icon" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1V7a5 5 0 0 0-5-5zm0 2a3 3 0 0 1 3 3v4H9V7a3 3 0 0 1 3-3z"/></svg>
    </span>
  </button>
  <p class="lpr-status" id="lprStatus">Press and hold the lock to unlock</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e1a;color:#e2e8f0;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.lpr-wrap{text-align:center}
.lpr-btn{position:relative;width:120px;height:120px;border:none;border-radius:50%;background:#121826;cursor:pointer;display:flex;align-items:center;justify-content:center;touch-action:none;-webkit-user-select:none;user-select:none;padding:0;transition:transform .15s}
.lpr-btn:active{transform:scale(.97)}
.lpr-ring{position:absolute;inset:0;width:100%;height:100%;transform:rotate(-90deg)}
.lpr-track{fill:none;stroke:#1e2740;stroke-width:6}
.lpr-fill{fill:none;stroke:#38bdf8;stroke-width:6;stroke-linecap:round;stroke-dasharray:326.7;stroke-dashoffset:326.7}
.lpr-btn.done .lpr-fill{stroke:#22c55e}
.lpr-core{position:relative;z-index:2;width:52px;height:52px;border-radius:50%;background:#1c2540;display:flex;align-items:center;justify-content:center;transition:background .2s}
.lpr-btn.done .lpr-core{background:#14311f}
.lpr-icon{width:24px;height:24px;fill:#94a3b8;transition:fill .2s,transform .3s}
.lpr-btn.done .lpr-icon{fill:#4ade80;transform:scale(1.1) rotate(-8deg)}

.lpr-status{margin-top:18px;font-size:12.5px;color:#8791ab;font-weight:600;min-height:16px}`,

  js: `var btn = document.getElementById('lprBtn');
var fill = document.getElementById('lprFill');
var status = document.getElementById('lprStatus');

var HOLD_MS = 1400;
var CIRCUMFERENCE = 2 * Math.PI * 52; // matches the r=52 circle, ~326.7
var startTime = 0;
var raf = null;
var done = false;

// The ring's stroke-dashoffset is driven every frame from the *real* elapsed
// hold time (performance.now() delta), not a CSS animation that just plays
// for a fixed duration regardless of how long the pointer was actually down.
function frame(now) {
  var elapsed = now - startTime;
  var progress = Math.min(1, elapsed / HOLD_MS);
  fill.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  if (progress >= 1) { confirm(); return; }
  raf = requestAnimationFrame(frame);
}

function start(e) {
  if (done) reset();
  startTime = performance.now();
  status.textContent = 'Keep holding\\u2026';
  raf = requestAnimationFrame(frame);
}

function cancel() {
  if (done || raf === null) return;
  cancelAnimationFrame(raf);
  raf = null;
  fill.style.transition = 'stroke-dashoffset .25s ease-out';
  fill.style.strokeDashoffset = CIRCUMFERENCE;
  status.textContent = 'Released too soon \\u2014 hold until the ring closes';
  setTimeout(function () { fill.style.transition = ''; }, 260);
}

function confirm() {
  cancelAnimationFrame(raf);
  raf = null;
  done = true;
  btn.classList.add('done');
  fill.style.strokeDashoffset = 0;
  status.textContent = 'Unlocked \\u2014 press again to reset';
}

function reset() {
  done = false;
  btn.classList.remove('done');
  fill.style.strokeDashoffset = CIRCUMFERENCE;
  status.textContent = 'Press and hold the lock to unlock';
}

btn.addEventListener('pointerdown', function (e) { btn.setPointerCapture(e.pointerId); start(e); });
btn.addEventListener('pointerup', cancel);
btn.addEventListener('pointercancel', cancel);
btn.addEventListener('pointerleave', function () { if (raf) cancel(); });`,

  seo: {
    title: 'Long-Press Confirm with Radial Fill — Free Circular Hold Button',
    description: `A press-and-hold button surrounded by a circular SVG progress ring that fills based on real elapsed hold time, confirming only when the ring closes. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Long-Press Confirm with Radial Fill — A Circular Hold Gesture',
      description: `This is the same "deliberate gesture beats an interrupting dialog" idea behind [hold to confirm](/ui-snippets/hold-to-confirm-button/), rebuilt around a circular progress ring instead of a linear bar. Holding the button traces an SVG ring closed around it; letting go early resets the ring instead of confirming. It's the shape you see around a countdown avatar, a wearable's unlock gesture, or a camera shutter hold, and it reads as more deliberate than a bar because the "target" — a fully closed circle — is visually obvious from the first frame.

**A stroke-dashoffset ring, not a CSS animation**

The ring is a single \`<circle>\` given \`stroke-dasharray\` equal to its own circumference (\`2 π r\`) and a \`stroke-dashoffset\` that starts equal to that same value, which hides the entire stroke. Every animation frame recomputes \`progress = elapsed / HOLD_MS\` from \`performance.now()\` and sets \`strokeDashoffset = CIRCUMFERENCE * (1 - progress)\`, so the visible arc length is always an exact, real-time reflection of how long the pointer has been down — not a canned CSS \`@keyframes\` sweep that runs for a fixed duration no matter what the user does.

**Radial vs. linear: why the mechanic changes the feel**

A linear bar fills left-to-right and communicates "how much is left" the way a loading bar does. A radial ring instead frames the button itself, so the *target* — a closed loop — is spatially obvious around the exact thing you're pressing, and the gesture reads more like "close the circle" than "wait for a bar." Because the ring is drawn with \`stroke-linecap: round\` and rotated \`-90deg\` so it starts at 12 o'clock, the sweep looks like a clock hand completing a lap, which is a distinct visual grammar from a progress bar.

**Real elapsed-time math, not decoration**

Exactly like a linear hold button, releasing early doesn't just stop an animation — \`cancel()\` reads whatever \`strokeDashoffset\` the ring is currently at and eases it back to the closed (empty) state with a short transition, so a hold released at 40% visibly retracts from 40%, never snapping or lying about how far you got. The transition is re-enabled only for that retract, keeping the fill-up itself frame-accurate.

**Pointer capture keeps the hold honest**

\`setPointerCapture\` on \`pointerdown\` means the button keeps receiving \`pointerup\` even if a finger drifts slightly off the small circular hit area during the hold — important since a round button has a smaller forgiving hit region than a wide bar. \`touch-action: none\` stops the page from scrolling underneath the gesture.

**Customizing it**

Swap the icon inside the ring, change \`HOLD_MS\`, recolor the completed state, or make the ring a full 360° gauge with tick marks for a "charge meter" feel. Pair it with [slide to confirm](/ui-snippets/slide-to-confirm/) as an alternate confirm gesture, or use the same stroke-dashoffset technique to drive a [radial menu](/ui-snippets/radial-menu/) trigger's own progress state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A circular lock button renders with an empty ring around it.` },
      { title: 'Press and hold the button', text: `The ring traces closed clockwise from 12 o'clock in real time.` },
      { title: 'Release early', text: `The ring eases back to empty from wherever it stopped.` },
      { title: 'Hold to completion', text: `The ring fully closes, turns green, and the action confirms once.` },
      { title: 'Press again to reset', text: `A completed button resets before re-running the confirm.` },
      { title: 'Tune the hold', text: `Change HOLD_MS or the ring's stroke width and color.` },
    ] },
    features: [
      { title: 'Real-time radial fill', text: `strokeDashoffset tracks actual elapsed hold time.` },
      { title: 'SVG circumference math', text: `2πr drives the dasharray/offset relationship.` },
      { title: 'Clock-style sweep', text: `Rotated -90deg so the ring starts at 12 o'clock.` },
      { title: 'Honest early release', text: `Retracts from the exact point it was released at.` },
      { title: 'Pointer capture', text: `Small circular target still catches the release.` },
      { title: 'Fires exactly once', text: `Completion stops the loop before confirming.` },
      { title: 'Rounded stroke cap', text: `Reads as a deliberate arc, not a raw line.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS, no animation library.` },
    ],
    useCases: [
      { title: 'Destructive confirmations', text: 'Offer a circular alternative to [hold to confirm](/ui-snippets/hold-to-confirm-button/), where an SVG ring closes around the button based on real elapsed hold time.' },
      { title: 'Unlock gestures', text: 'Provide wearable- or kiosk-style press-and-hold unlocks, with the ring starting at 12 o\'clock through a minus 90 degree rotation.' },
      { title: 'Camera and recording controls', text: 'Build hold-to-record shutter buttons, where an early release retracts the ring from exactly the point where the finger lifted.' },
      { title: 'Alarm and timer dismissal', text: 'Require a deliberate hold instead of an easy tap to dismiss an alarm, so accidental touches never silence it.' },
      { title: 'Power controls and ring learning', text: 'Guard risky actions next to a [slide to confirm](/ui-snippets/slide-to-confirm/), and learn `stroke-dashoffset` circumference maths with 2πr driving the dash array.' },
      { icon: 'CODE', title: 'Related: Shake to Undo', desc: 'See the [Shake to Undo](/ui-snippets/shake-to-undo/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the ring math calculated?', a: `The circle's stroke-dasharray is set to its own circumference, 2 * Math.PI * r for r=52 (about 326.7), which makes the entire stroke one dash the length of the circle. stroke-dashoffset then starts at that same value, hiding the stroke completely. Setting the offset to CIRCUMFERENCE * (1 - progress) reveals exactly progress percent of the ring, so the visible arc length is a direct, real-time function of elapsed hold time.` },
      { q: 'Why not just use a CSS keyframe animation on the ring?', a: `A fixed-duration CSS animation would play for the same length of time regardless of how long the pointer was actually held, and it can't report an arbitrary in-progress value back to JavaScript if the user releases early. Driving strokeDashoffset from requestAnimationFrame against performance.now() means the ring's state always matches the real hold duration, and releasing early retracts from wherever it genuinely stopped.` },
      { q: 'How is this different from a linear hold-to-confirm bar?', a: `The underlying elapsed-time and pointer-capture logic is the same pattern as a linear bar, but the visual target changes: a radial ring frames the button itself so the goal (closing the loop) is obvious around the exact element being pressed, and the clockwise sweep from 12 o'clock reads as a clock or gauge completing rather than a bar filling left to right.` },
      { q: 'What happens if the pointer drifts off the button while holding?', a: `setPointerCapture is called on pointerdown, so the button keeps receiving the eventual pointerup even if the finger slides slightly outside its circular hit area — which matters more here than on a wide bar, since a circle has a smaller forgiving target. pointerleave only cancels the hold if the capture was somehow lost.` },
      { q: 'How do I use this radial hold button in React, Vue, or Angular?', a: `Keep progress and done in component state (or refs, to avoid re-rendering every frame) and store the rAF id and start time in refs. Bind strokeDashoffset to the circle via an inline style or attribute binding, attach the pointer handlers to the button ref, and call your real action inside confirm(). Clean up the animation frame on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to derive the SVG circumference math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why stroke-dasharray is set to the circle's own circumference (2 * Math.PI * r), how setting stroke-dashoffset to circumference times (1 - progress) reveals exactly that fraction of the ring, and why driving that offset from requestAnimationFrame against performance.now() produces a ring that is always an honest reflection of real hold duration rather than a canned animation. The same assistant can help you optimize it, for instance asking whether the ring's radius and the CIRCUMFERENCE constant could be computed from the SVG's own getTotalLength() so they never drift out of sync if the radius changes. It's also useful for extending the interaction: ask it to add tick marks around the ring for a segmented "charge meter" look, make the ring a full continuously-updating gauge instead of resetting after each hold, or add a subtle haptic pulse when the ring crosses each quarter. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "long-press confirm with radial fill" button in plain HTML, CSS, and JavaScript using the Pointer Events API and an SVG circle progress ring — no CSS-only animation, no library.

Requirements:
- A round button containing an SVG with two concentric circles: a static background track circle and a foreground progress circle whose stroke-dasharray is set (in CSS or JS) to its own circumference, 2 * Math.PI * radius, with stroke-dashoffset initially equal to that same circumference so no stroke is visible.
- On pointerdown, capture the pointer with setPointerCapture using the event's pointerId, record the start time via performance.now(), and begin a requestAnimationFrame loop.
- Each animation frame must compute progress as elapsed time divided by a fixed hold-duration constant (clamped to a max of 1), and set the progress circle's stroke-dashoffset to circumference * (1 - progress) so the visible arc length is a direct, real-time function of actual elapsed hold time — not a fixed-duration CSS animation that plays regardless of how long the pointer was actually held. Reaching progress 1 must trigger the confirmed action exactly once and stop the loop.
- On pointerup, pointercancel, or the pointer leaving the button mid-hold, cancel the animation frame and animate stroke-dashoffset back to the full (empty) circumference using a short CSS transition on that property specifically, enabled only for this retract so the fill-up itself stays frame-accurate — visually retracting the ring from whatever point it had actually reached, not resetting instantly.
- Rotate the SVG -90 degrees so the ring visually begins filling from the 12 o'clock position like a clock hand, and use a rounded stroke-linecap so the arc's leading edge looks deliberate rather than a raw cut line.
- Set touch-action: none on the button so holding it does not scroll the page on touch devices, and on successful completion mark the button visually done (e.g. a color change) with the next press resetting the ring to empty before starting a new hold.`,
    },
  },
};

export default longPressConfirmRadial;
