const sliderCaptcha = {
  id: 'slider-captcha',
  title: 'Slider Captcha',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="sc-card">
  <div class="sc-stage" id="scStage">
    <div class="sc-gap" id="scGap"></div>
    <div class="sc-piece" id="scPiece"></div>
    <span class="sc-status" id="scStatus">Slide to verify</span>
  </div>
  <div class="sc-track" id="scTrack">
    <div class="sc-fill" id="scFill"></div>
    <button type="button" class="sc-handle" id="scHandle" aria-label="Slide to verify">&rsaquo;&rsaquo;</button>
    <span class="sc-hint">Drag the slider to fit the piece</span>
  </div>
  <button type="button" class="sc-reset" id="scReset">Reset</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;display:flex;justify-content:center;padding:40px 18px}

.sc-card{width:100%;max-width:340px}
.sc-stage{position:relative;height:160px;border-radius:12px;overflow:hidden;background:linear-gradient(135deg,#6366f1,#22d3ee 50%,#a855f7);margin-bottom:14px}
.sc-gap{position:absolute;top:54px;width:46px;height:46px;border-radius:8px;background:rgba(0,0,0,.32);box-shadow:inset 0 0 0 2px rgba(255,255,255,.35)}
.sc-piece{position:absolute;top:54px;left:8px;width:46px;height:46px;border-radius:8px;background:rgba(255,255,255,.9);box-shadow:0 4px 12px rgba(0,0,0,.3);backdrop-filter:blur(2px)}
.sc-status{position:absolute;left:0;right:0;bottom:8px;text-align:center;font-size:12px;font-weight:700;color:#fff;text-shadow:0 1px 2px rgba(0,0,0,.4)}

.sc-track{position:relative;height:42px;background:#e2e8f0;border-radius:10px;overflow:hidden;user-select:none}
.sc-fill{position:absolute;inset:0 auto 0 0;width:21px;background:#bfdbfe}
.sc-handle{position:absolute;top:0;left:0;width:42px;height:42px;border:none;border-radius:10px;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.2);cursor:grab;font-size:15px;color:#475569;display:flex;align-items:center;justify-content:center;touch-action:none}
.sc-handle:active{cursor:grabbing}
.sc-hint{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:12.5px;color:#94a3b8;pointer-events:none}

.sc-card.ok .sc-track{background:#dcfce7}
.sc-card.ok .sc-fill{background:#86efac}
.sc-card.ok .sc-handle{color:#16a34a}
.sc-card.fail .sc-fill{background:#fecaca}
.sc-card.fail .sc-handle{color:#dc2626}

.sc-reset{margin-top:10px;background:none;border:none;color:#64748b;font-size:12px;font-weight:600;cursor:pointer;font-family:inherit;text-decoration:underline}`,

  js: `var card = document.querySelector('.sc-card');
var stage = document.getElementById('scStage');
var gap = document.getElementById('scGap');
var piece = document.getElementById('scPiece');
var track = document.getElementById('scTrack');
var fill = document.getElementById('scFill');
var handle = document.getElementById('scHandle');
var status = document.getElementById('scStatus');
var done = false, target = 0, range = 0, pieceRange = 0;

function setup() {
  done = false;
  card.classList.remove('ok', 'fail');
  status.textContent = 'Slide to verify';
  // Random gap target between 40% and 85% of the stage width.
  var sw = stage.clientWidth;
  target = Math.round(sw * (0.4 + Math.random() * 0.45));
  gap.style.left = target + 'px';
  piece.style.left = '8px';
  handle.style.left = '0px';
  fill.style.width = '21px';
  range = track.clientWidth - handle.offsetWidth;
  pieceRange = (target - 8); // piece travels from 8px to target
}

function moveTo(px) {
  px = Math.max(0, Math.min(range, px));
  handle.style.left = px + 'px';
  fill.style.width = (px + 21) + 'px';
  var t = range ? px / range : 0;
  piece.style.left = (8 + t * pieceRange) + 'px';
}

function verify() {
  var pieceLeft = parseFloat(piece.style.left);
  if (Math.abs(pieceLeft - target) <= 6) {
    done = true; card.classList.add('ok'); status.textContent = '✓ Verified';
  } else {
    card.classList.add('fail'); status.textContent = 'Try again';
    setTimeout(setup, 600);
  }
}

handle.addEventListener('pointerdown', function (e) {
  if (done) return;
  e.preventDefault();
  var startX = e.clientX, startLeft = parseFloat(handle.style.left) || 0;
  function mv(ev) { moveTo(startLeft + (ev.clientX - startX)); }
  function up() { document.removeEventListener('pointermove', mv); document.removeEventListener('pointerup', up); if (!done) verify(); }
  document.addEventListener('pointermove', mv);
  document.addEventListener('pointerup', up);
});

document.getElementById('scReset').addEventListener('click', setup);
window.addEventListener('resize', setup);
setup();`,

  seo: {
    title: 'Slider Captcha — Drag-to-Fit Puzzle Verification',
    description: `A slider captcha: drag a handle to slot a puzzle piece into its gap, with success/fail states and reset. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Slider Captcha — Drag-to-Fit Puzzle Human Verification',
      description: `A slider captcha asks the user to drag a slider until a puzzle piece slots into a gap — a low-friction, mobile-friendly alternative to typing distorted text that's familiar from many sign-in flows. This snippet builds the interaction (drag, fit-check, success and fail states, and a randomised target) in plain HTML, CSS, and vanilla JavaScript. It's a UX demonstration of the pattern, not a security control on its own.

**Linked slider and puzzle piece**

Dragging the handle moves a puzzle piece across a background image in lockstep: as the handle travels its track, the piece travels from its start to the target gap, scaled so the two ranges line up. This 1:1 mapping is what makes the task intuitive — you're not guessing, you're aligning, and the visual feedback tells you when you're close.

**Randomised target and tolerance**

On each attempt the gap is placed at a random horizontal position (40–85% across), so the solution differs every time. On release, the snippet checks whether the piece landed within a few pixels of the gap; within tolerance it shows a green "Verified" state, otherwise it flashes a red "Try again" and re-randomises after a moment. The tolerance makes it forgiving for touch while still requiring a deliberate, roughly-correct drag.

**Pointer dragging for mouse and touch**

The handle uses Pointer Events with document-level move/up listeners, so a drag keeps tracking even if the pointer leaves the track, and the same code drives mouse, trackpad, and touch. \`touch-action: none\` stops the page scrolling while dragging on a phone, and \`user-select: none\` prevents text selection mid-drag.

**Clear states and reset**

Success, failure, and idle each have distinct colours on the track and handle, and a Reset link re-arms the challenge. Because the verification result is a single boolean, it's trivial to gate a form submit on it — but note that client-side checks like this only deter casual bots; real protection requires server-side validation of the drag trajectory and timing, which this snippet leaves as the integration point.

**Self-contained and responsive**

The whole challenge recalculates its geometry on resize so it works at any width, and it's a couple of hundred lines with no dependencies — a clean reference for the slide-to-fit captcha interaction you can wire into a login or signup flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A puzzle image renders with a gap and a slider track below.` },
      { title: 'Drag the handle', text: `The puzzle piece moves with the slider toward the gap.` },
      { title: 'Release to verify', text: `Land the piece in the gap to pass; miss to fail and retry.` },
      { title: 'See the result', text: `Green Verified on success, red Try again on a miss.` },
      { title: 'Reset', text: `The Reset link re-randomises the gap position.` },
      { title: 'Gate your form', text: `Use the verified boolean to enable submit — and validate server-side.` },
    ] },
    features: [
      { title: 'Drag-to-fit puzzle', text: `A piece slides into a randomly placed gap.` },
      { title: 'Randomised target', text: `The gap position changes every attempt.` },
      { title: 'Tolerance check', text: `Forgiving within a few pixels for touch use.` },
      { title: 'Pointer + touch', text: `Pointer Events with document-level tracking work on mobile.` },
      { title: 'Success/fail states', text: `Distinct track and handle colors for each outcome.` },
      { title: 'Auto re-arm', text: `A miss re-randomises the challenge after a moment.` },
      { title: 'Responsive geometry', text: `Recalculates on resize to fit any width.` },
      { title: 'No library', text: `Pure HTML/CSS/JS — no captcha dependency.` },
    ],
    useCases: [
      { title: 'Login and signup bot checks', text: 'Add friction for bots before an authentication step, with a puzzle piece the user drags into a randomly placed gap, inside an [auth login card](/ui-snippets/auth-login-card/).' },
      { title: 'Contact form spam control', text: 'Gate a [contact form](/ui-snippets/contact-form/) on a human drag, using a forgiving pixel tolerance suitable for touch use.' },
      { title: 'Rate-limited action checks', text: 'Require verification before a sensitive action is allowed, with distinct success and failure states and a reset to try again.' },
      { title: 'Slide confirmation variants', text: 'Compare with [slide to confirm](/ui-snippets/slide-to-confirm/), which uses a similar drag but confirms intent instead of proving a human is present.' },
      { title: 'Prototypes and drag learning', text: 'Show a captcha experience without a third-party service, and learn linked drag interactions with Pointer Events tracked at document level.' },
    ],
    faqs: [
      { q: 'Is a slider captcha actually secure?', a: `On its own, no — any client-side check can be bypassed. A slider captcha deters casual bots and is far less annoying than text captchas, but real protection requires sending the drag trajectory, timing, and a server-issued challenge token to your backend and validating them there. Treat this snippet as the front-end interaction; pair it with server verification for security.` },
      { q: 'How does the piece stay aligned with the slider?', a: `Both the handle and the puzzle piece are positioned from the same drag value. As the handle moves across its track (0 to its max travel), that fraction is applied to the piece's own travel range from start to the gap, so they move proportionally and reach the target together. This 1:1 mapping makes the task feel like aligning, not guessing.` },
      { q: 'Does it work on touch screens?', a: `Yes. The handle uses Pointer Events, which unify mouse and touch, with move and up listeners on the document so the drag keeps tracking if your finger leaves the track. touch-action: none prevents the page scrolling while you drag, and the challenge recomputes its geometry on resize so it fits any screen.` },
      { q: 'How forgiving is the fit check?', a: `The piece passes when it lands within a few pixels of the gap centre, which is lenient enough for touch input but still requires a deliberate, roughly correct drag. You can tighten or loosen this by changing the tolerance value in the verify function.` },
      { q: 'How do I use this slider captcha in React, Vue, or Angular?', a: `Hold the drag offset, target, and verified flag in state and render the handle and piece positions from them. Move the pointer logic into handlers that update state (attach window listeners in an effect and clean them up), and run the fit check on release. Expose the verified flag to gate your form. Always re-validate on the server. Tailwind users swap the classes for utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the proportional-mapping math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how moveTo() converts the handle's drag fraction into the puzzle piece's own travel range so the two stay locked together, or why the verify function compares against a tolerance in pixels rather than requiring an exact match. The same assistant can help you optimize it, for instance checking whether recalculating range and pieceRange on every resize event is necessary or could be debounced. It is just as useful for extending the captcha: ask it to add a background image with an actual visual notch cut into it using clip-path instead of a plain gap div, generate the puzzle piece shape with an SVG mask for a more convincing jigsaw look, or add a server-side trajectory-and-timing validation endpoint stub. Treat the code less like a finished artifact and more like a starting point for a conversation, and remember this UI alone is not a real bot defense without server verification.`,
      prompt: `Build a "slide-to-fit puzzle" slider captcha in plain HTML, CSS, and JavaScript using Pointer Events — no libraries, no real image processing.

Requirements:
- A stage area showing a gap placeholder and a draggable puzzle-piece placeholder, plus a separate horizontal slider track below it with its own draggable handle.
- On each setup, position the gap at a random horizontal location within a defined percentage range of the stage width (e.g. 40 to 85 percent), and reset the piece to its starting position and the handle to the start of the track.
- Moving the slider handle must proportionally move the puzzle piece: compute the handle's drag fraction (current position divided by its maximum travel), then apply that same fraction to the piece's own travel range from its start position to the target gap position, so the two elements move in lockstep regardless of how differently sized their tracks are.
- Use Pointer Events (pointerdown, pointermove, pointerup) with move and up listeners attached to the document, not just the handle, so a drag continues tracking even if the pointer moves off the handle mid-gesture. Set touch-action: none and user-select: none so dragging works cleanly on touchscreens.
- On release, compare the piece's final position to the target gap position with a small pixel tolerance (not an exact match) to decide success or failure. On success show a distinct visual success state; on failure show a distinct failure state and automatically reset to a new random target after a short delay.
- Recalculate all geometry (target position, travel ranges) on window resize so the challenge remains correctly proportioned at any viewport width.
- Include a manual reset control that re-randomizes the target immediately.`,
    },
  },
};

export default sliderCaptcha;
