const loaderInlineButtonMorph = {
  id: 'loader-inline-button-morph',
  title: 'Button Loading State Morph',
  lastmod: '2026-08-23',
  category: 'loaders',
  cdnUrls: [],
  html: `<form class="bm-form" id="bmForm">
  <button type="submit" class="bm-btn" id="bmBtn">
    <span class="bm-label">Submit order</span>
    <svg class="bm-spinner" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle></svg>
    <svg class="bm-check" viewBox="0 0 24 24"><path d="M5 13l4 4L19 7"></path></svg>
  </button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.bm-form{display:flex}
.bm-btn{position:relative;width:180px;height:48px;border-radius:24px;border:none;background:#6366f1;color:#fff;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit;
  transition:width .35s cubic-bezier(.65,0,.35,1),border-radius .35s cubic-bezier(.65,0,.35,1),background .3s;
  display:flex;align-items:center;justify-content:center;overflow:hidden}
.bm-btn:hover{background:#4f46e5}
.bm-btn:disabled{cursor:not-allowed}

.bm-label{transition:opacity .15s;white-space:nowrap}
.bm-spinner,.bm-check{position:absolute;width:20px;height:20px;opacity:0;transition:opacity .15s}
.bm-spinner{fill:none;stroke:#fff;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:42;stroke-dashoffset:32}
.bm-check{fill:none;stroke:#fff;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke-dasharray:24;stroke-dashoffset:24}

/* Loading: shrink to a circle, hide the label, show the spinning ring. */
.bm-btn.bm-loading{width:48px;border-radius:50%;background:#4f46e5}
.bm-btn.bm-loading .bm-label{opacity:0}
.bm-btn.bm-loading .bm-spinner{opacity:1;animation:bmSpin 0.85s linear infinite}
@keyframes bmSpin{to{transform:rotate(360deg)}}

/* Success: stay a circle, swap spinner for a drawn checkmark, go green. */
.bm-btn.bm-success{width:48px;border-radius:50%;background:#16a34a}
.bm-btn.bm-success .bm-label{opacity:0}
.bm-btn.bm-success .bm-spinner{opacity:0}
.bm-btn.bm-success .bm-check{opacity:1;animation:bmDraw .4s ease forwards}
@keyframes bmDraw{to{stroke-dashoffset:0}}`,

  js: `var form = document.getElementById('bmForm');
var btn = document.getElementById('bmBtn');
var label = btn.querySelector('.bm-label');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (btn.classList.contains('bm-loading') || btn.classList.contains('bm-success')) return;

  // Stage 1: pill -> circle, label fades, spinner appears.
  btn.disabled = true;
  btn.classList.add('bm-loading');

  // Simulate a real async request — replace with your actual fetch/submit promise.
  setTimeout(function () {
    // Stage 2: circle stays a circle, spinner swaps for a drawn checkmark.
    btn.classList.remove('bm-loading');
    btn.classList.add('bm-success');

    setTimeout(function () {
      // Stage 3: revert back to the original pill with its label.
      btn.classList.remove('bm-success');
      label.textContent = 'Submit order';
      btn.disabled = false;
    }, 1800);
  }, 1700);
});`,

  seo: {
    title: 'Button Loading State Morph — Shape-Shifting Submit Button in HTML CSS JS',
    description: `A submit button that shrinks its own width into a circle with an inline spinner on click, then morphs into a checkmark success state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Button Loading State Morph — A Button That Shrinks Into a Spinner, Then a Checkmark',
      description: `Most button loading states just swap an icon inside a fixed-size button. This one actually changes the button's own shape: on click, its width animates down from a full pill to a small circle while a spinner fades in inside that circle, then — once the simulated request resolves — the spinner swaps for a hand-drawn checkmark and the circle turns green, before reverting to the original label. It's a real \`width\`/\`border-radius\` transition tied to actual click-triggered state, not a decorative icon swap.

**Three real states, one element**

The button cycles through three CSS classes applied by JavaScript in sequence: idle (the full pill with its label), \`.bm-loading\` (width collapses to 48px, \`border-radius\` becomes 50%, the label fades out, an SVG ring spins in), and \`.bm-success\` (stays a circle, the spinner fades out, an SVG checkmark path animates its \`stroke-dashoffset\` from full to zero — a hand-drawn reveal — and the background turns green). Each transition is driven by \`transition: width .35s, border-radius .35s\`, so the shape change is a genuine animated morph, not an instant swap.

**The checkmark draws itself**

The check icon starts with \`stroke-dasharray: 24; stroke-dashoffset: 24\` — the full path length pulled off-screen — and the \`bmDraw\` keyframe animates \`stroke-dashoffset\` to 0, which is the classic SVG line-drawing technique. Combined with the circle popping green underneath it, the success state reads as a deliberate confirmation rather than just another static icon.

**A realistic async lifecycle**

The click handler is structured exactly like a real submit flow: \`btn.disabled = true\` and the loading class go on immediately, a \`setTimeout\` stands in for your actual \`fetch\`/form-submission promise, then on "resolve" the success class takes over, and a second timeout reverts everything back to idle and re-enables the button. Swap the two \`setTimeout\` calls for your real request's \`.then()\`/\`.finally()\` and the shape-morph logic needs no other changes.

**Drop-in and restyleable**

Recolor the loading and success backgrounds, change the idle pill's width or corner radius, or adjust the timing constants. Pair it with a [loading button](/ui-snippets/loading-button/) for a simpler icon-swap alternative, or a [multi-step form](/ui-snippets/multi-step-form/) where this becomes the final submit control.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A pill-shaped "Submit order" button renders, ready to click.` },
      { title: 'Click the button', text: `Its width animates down into a circle as the label fades and a spinner appears.` },
      { title: 'Watch it resolve', text: `After ~1.7s, the spinner swaps for a drawn checkmark and the circle turns green.` },
      { title: 'Watch it revert', text: `After another ~1.8s, the button eases back to its original pill and label.` },
      { title: 'Wire it to a real request', text: `Replace the two setTimeout calls with your fetch/submit promise's resolve and settle.` },
      { title: 'Restyle it', text: `Change the idle/loading/success colors, the pill width, or the timing constants.` },
    ] },
    features: [
      { title: 'Real width/border-radius morph', text: `The button's own shape animates from a pill to a circle, not just its icon.` },
      { title: 'Three genuine states', text: `Idle, loading, and success are distinct classes with distinct visuals.` },
      { title: 'Self-drawing checkmark', text: `An SVG stroke-dashoffset animation reveals the check like it's being drawn.` },
      { title: 'Click-triggered, not decorative', text: `Every transition is tied to a real click handler and async lifecycle.` },
      { title: 'Disabled during work', text: `The button disables itself while loading to prevent double-submission.` },
      { title: 'Auto-reverting', text: `Success reverts back to the idle label automatically after a pause.` },
      { title: 'GPU-friendly spinner', text: `The ring uses stroke-dashoffset + rotate, both compositor-friendly.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS transitions/keyframes, and vanilla JS — no library.` },
    ],
    useCases: [
      { title: 'Checkout and order submission', text: `The exact context shown here — pair with a [multi-step form](/ui-snippets/multi-step-form/) for the fields.` },
      { title: 'Form saves and settings updates', text: `A more expressive alternative to a plain [loading button](/ui-snippets/loading-button/).` },
      { title: 'Newsletter / signup submits', text: `Confirm a subscribe action with a satisfying morph-to-checkmark.` },
      { title: 'Payment confirmation buttons', text: `Reassure users during a payment request with a clear success state.` },
      { title: 'Any single-action async button', text: `Delete, approve, or send actions that benefit from visible confirmation.` },
      { title: 'Learning shape-morph techniques', text: `A reference for animating a component's own dimensions from state.` },
    ],
    faqs: [
      { q: 'How does the button actually change shape?', a: `The button's width and border-radius are set explicitly in the .bm-loading and .bm-success classes (48px and 50% respectively), and both properties have a CSS transition on the base .bm-btn rule. Toggling the class with JavaScript on click triggers a real animated interpolation between the pill and circle dimensions — it is not a swapped background image or icon.` },
      { q: 'How is the checkmark drawn rather than just faded in?', a: `The check SVG path starts with stroke-dasharray and stroke-dashoffset both set to the path's total length, which hides the entire stroke off the visible dash. The bmDraw keyframe animates stroke-dashoffset down to 0, progressively revealing the path from one end to the other — the standard SVG line-drawing technique, distinct from an opacity fade.` },
      { q: 'How do I wire this to a real form submission?', a: `In the submit handler, keep the immediate btn.disabled = true and btn.classList.add('bm-loading'), then replace the first setTimeout with your actual fetch or async submit call. On success, run the code that adds bm-success and removes bm-loading inside your .then(); on failure, add an error state instead. Use .finally() to guarantee the button never gets stuck loading.` },
      { q: 'Why disable the button during the loading state?', a: `btn.disabled = true prevents the browser from firing another click/submit event while a request is already in flight, which stops duplicate order submissions if the user clicks impatiently. The .bm-loading class also sets cursor: not-allowed as a visual cue, but the disabled attribute is what actually blocks the interaction at the browser level.` },
      { q: 'How do I use this button morph in React, Vue, or Angular?', a: `Track a status state (idle/loading/success) and derive the class list from it. In React: const [status, setStatus] = useState('idle'); on submit call setStatus('loading'), await your request, then setStatus('success'), and a setTimeout back to 'idle'. Keep disabled={status !== 'idle'} on the button. The CSS transitions and SVG animations port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the three-state class-swapping logic yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how animating the button's own width and border-radius (rather than swapping an icon inside a fixed-size button) produces the pill-to-circle morph, and how the checkmark's stroke-dasharray/stroke-dashoffset combination makes it look hand-drawn rather than faded in. The same assistant can help optimize it — for instance asking whether the two chained setTimeout calls should instead be replaced with a real Promise-based fetch call with proper .catch() error handling, since right now there is no error state. It's also useful for extending the pattern: ask it to add a fourth "error" morph state (perhaps a shake animation and red background), make the revert-to-idle delay configurable, or generalize the component into a reusable function that takes a promise and drives the three states automatically. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a form submit button whose own shape morphs through loading and success states in plain HTML, CSS, and JavaScript — no animation library.

Requirements:
- A pill-shaped button with a text label, containing (but not initially showing) an inline SVG spinner ring and a separate inline SVG checkmark, both absolutely positioned inside the button.
- On click/submit, the button itself must animate its own width and border-radius via a CSS transition (not a swapped icon inside a fixed-size button) from the full pill shape down to a small circle, while the text label fades out and the spinner fades in and spins continuously — driven by adding a "loading" class via JavaScript, and the button must be disabled for the duration to prevent repeat submissions.
- Simulate an async operation with a timeout structured so it is obvious where a real fetch or form-submission promise would be substituted in.
- When the simulated request resolves, swap to a distinct "success" state (still applied via a class toggle): keep the circular shape, fade out the spinner, and reveal a checkmark icon using an SVG stroke-dasharray/stroke-dashoffset animation so the checkmark appears to draw itself stroke-by-stroke rather than simply fading in, with the button's background color changing to a success color.
- After a pause in the success state, automatically revert the button back to its original pill shape and label, and re-enable it, so the whole three-stage cycle (idle to loading to success to idle) can be triggered again.
- Every shape and color transition must be driven by CSS transitions/keyframes reacting to JavaScript-toggled classes, not by JavaScript manually animating style properties frame by frame.`,
    },
  },
};

export default loaderInlineButtonMorph;
