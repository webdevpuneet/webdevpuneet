const bootstrapCountdownTimerBanner = {
  id: 'bootstrap-countdown-timer-banner',
  title: 'Bootstrap Countdown Timer Banner',
  lastmod: '2026-09-10',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="alert alert-dark bsct-banner d-flex align-items-center justify-content-center flex-wrap gap-4 mb-0 rounded-0" id="bsctBanner" role="alert">
  <div class="text-center">
    <div class="fw-bold bsct-title">Flash Sale Ends In</div>
    <div class="small bsct-label" id="bsctDone" style="display:none">The sale has ended — check back soon!</div>
  </div>

  <div class="d-flex gap-3" id="bsctBoxes">
    <div class="text-center">
      <div class="bsct-box" id="bsctDays">00</div>
      <div class="small bsct-label">Days</div>
    </div>
    <div class="text-center">
      <div class="bsct-box" id="bsctHours">00</div>
      <div class="small bsct-label">Hours</div>
    </div>
    <div class="text-center">
      <div class="bsct-box" id="bsctMinutes">00</div>
      <div class="small bsct-label">Minutes</div>
    </div>
    <div class="text-center">
      <div class="bsct-box" id="bsctSeconds">00</div>
      <div class="small bsct-label">Seconds</div>
    </div>
  </div>

  <button type="button" class="btn-close btn-close-white ms-2" aria-label="Close" id="bsctClose"></button>
</div>`,
  css: `/* alert-dark is a light tint in Bootstrap 5.3, so the banner's own alert variables are
   overridden to get a real dark surface that the light text and close button read against. */
.bsct-banner {
  --bs-alert-bg: #111827;
  --bs-alert-color: #f9fafb;
  --bs-alert-border-color: #111827;
  padding: 1rem 1.5rem;
  position: relative;
}
.bsct-title { font-size: 1.05rem; letter-spacing: .01em; color: #fff; }
.bsct-label { color: #cbd5e1; font-size: .72rem; text-transform: uppercase; letter-spacing: .06em; margin-top: 4px; }
.bsct-box {
  min-width: 56px;
  padding: 8px 6px;
  background: #1f2937;
  border: 1px solid #374151;
  border-radius: 8px;
  color: #fbbf24;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.2;
  font-variant-numeric: tabular-nums;
}`,
  js: `const TARGET = new Date(Date.now() + (2 * 24 * 60 * 60 + 5 * 60 * 60 + 30 * 60) * 1000).getTime();

const boxes = {
  days: document.getElementById('bsctDays'),
  hours: document.getElementById('bsctHours'),
  minutes: document.getElementById('bsctMinutes'),
  seconds: document.getElementById('bsctSeconds'),
};
const boxesWrap = document.getElementById('bsctBoxes');
const doneMsg = document.getElementById('bsctDone');
const banner = document.getElementById('bsctBanner');
const closeBtn = document.getElementById('bsctClose');

function pad(n) {
  return String(n).padStart(2, '0');
}

let intervalId = null;

function tick() {
  const remaining = TARGET - Date.now();

  if (remaining <= 0) {
    clearInterval(intervalId);
    boxesWrap.style.display = 'none';
    doneMsg.style.display = 'block';
    return;
  }

  const totalSeconds = Math.floor(remaining / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  boxes.days.textContent = pad(days);
  boxes.hours.textContent = pad(hours);
  boxes.minutes.textContent = pad(minutes);
  boxes.seconds.textContent = pad(seconds);
}

tick();
intervalId = setInterval(tick, 1000);

closeBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  banner.style.display = 'none';
});`,

  seo: {
    title: 'Bootstrap Countdown Timer Banner — Free JS Snippet',
    description: `A dismissible Bootstrap alert banner with a live setInterval countdown split into four tabular-nums boxes, plus a zero-state swap. Exports to React & Tailwind.`,
    about: {
      title: 'Bootstrap Countdown Timer Banner — HTML, CSS & JavaScript',
      description: `A countdown banner has one real technical risk: drifting or breaking as it counts down, especially around the moment it hits zero. This snippet avoids drift entirely by never storing "seconds remaining" as a decrementing counter — instead, \`TARGET\` is a fixed millisecond timestamp computed once at load time, and every tick of \`setInterval(tick, 1000)\` recalculates \`remaining = TARGET - Date.now()\` from scratch. That means a slow tab, a throttled background timer, or a paused browser tab can never cause the displayed time to fall out of sync with the real target — the next tick always self-corrects because it's measuring against the actual system clock, not counting down from a stored number.\n\nThe banner itself is a real Bootstrap \`alert alert-dark\` element with \`role="alert"\` for accessibility, laid out with flexbox utilities (\`d-flex align-items-center justify-content-center flex-wrap gap-4\`) so the four time boxes wrap gracefully on narrow screens instead of overflowing. Each unit — Days, Hours, Minutes, Seconds — is rendered inside a \`.bsct-box\` div styled with a dark raised background, a subtle border, amber high-contrast digits, rounded corners, and \`font-variant-numeric: tabular-nums\`, a CSS property that gives every digit the same fixed width so the numbers don't visually jitter left and right as they change each second (a subtle but noticeable polish detail easy to miss).\n\n\`tick()\` converts the remaining milliseconds into whole seconds, then derives days, hours, minutes, and seconds using integer division and modulo against 86400, 3600, and 60 — standard duration math, but written so each unit's remainder feeds the next smaller unit correctly rather than each being computed independently and potentially double-counting. Every value is passed through a \`pad()\` helper using \`String.padStart(2, '0')\` so single-digit values always display as two digits ("05" not "5"), keeping the box widths visually stable.\n\nThe non-obvious edge case this snippet explicitly handles is the transition at zero: rather than just displaying "00:00:00:00" forever, \`tick()\` checks \`remaining <= 0\`, calls \`clearInterval(intervalId)\` to stop the timer from continuing to run in the background, hides the \`#bsctBoxes\` element, and reveals a \`#bsctDone\` message instead — a real state swap rather than a frozen countdown. The dismiss button is a genuine Bootstrap \`btn-close btn-close-white\` control that also clears the interval before hiding the banner, so closing it doesn't leave an orphaned timer still running and updating hidden DOM nodes every second.\n\nThe \`intervalId\` returned by \`setInterval\` is stored in module scope specifically so both exit paths — the natural zero-completion inside \`tick()\` and the manual dismiss button — can reach the same handle and call \`clearInterval()\` on it. Keeping a single named reference, rather than letting each path create or track its own, is what guarantees the timer is stopped exactly once and never double-cleared or left dangling under either exit route.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A dark full-width banner appears showing four ticking boxes for Days, Hours, Minutes, and Seconds, counting down from roughly 2 days.' },
        { title: 'Watch the Seconds box', text: 'It decrements every second on a real one-second interval, and rolls Minutes down by one each time it wraps past zero.' },
        { title: 'Click the × close button', text: 'The entire banner disappears immediately and its underlying timer stops running.' },
        { title: 'Reload the snippet preview', text: 'The countdown target resets to roughly 2 days, 5 hours, 30 minutes from the moment the page loads.' },
        { title: 'Imagine the timer reaching zero', text: 'The four number boxes are replaced by the message "The sale has ended — check back soon!" and the interval stops updating.' },
      ],
    },
    features: [
      'Fixed target timestamp computed once, avoiding countdown drift over time',
      'Live setInterval tick recalculating remaining time from Date.now() every second',
      'Four separate Days/Hours/Minutes/Seconds boxes with tabular-nums for stable digit width',
      'Zero-padded two-digit display for every unit via padStart',
      'Automatic zero-state swap replacing the boxes with a completion message',
      'clearInterval called both on completion and on manual dismiss to avoid orphaned timers',
      'Real dismissible Bootstrap alert with a functional btn-close control',
      'Responsive flex-wrap layout that reflows the boxes on narrow screens',
    ],
    useCases: [
      { icon: 'CART', title: 'E-commerce flash sale banners', desc: `A site-wide urgency banner above a product grid, often paired with a [sticky navbar](/ui-snippets/bootstrap-sticky-navbar-shrink/) so the countdown stays visible while scrolling.` },
      { icon: 'FLOW', title: 'Event and webinar registration pages', desc: 'Count down to a live event start time so visitors know exactly how long they have left to register.' },
      { icon: 'STAR', title: 'Product launch announcements', desc: `Combine with a [coming-soon page](/ui-snippets/bootstrap-coming-soon-page/) as the top banner counting down to the same launch moment shown on the full page.` },
      { icon: 'LEARN', title: 'Learning drift-free timer implementation', desc: 'A clear example of computing remaining time from a fixed target and the current clock, rather than decrementing a stored counter — the correct pattern for any countdown.' },
      { icon: 'APP', title: 'Limited-time promo codes', desc: `Show urgency for a discount code alongside an [alert stack](/ui-snippets/bootstrap-alert-dismissible-stack/) confirming when the code was applied.` },
    ],
    faqs: [
      { q: 'Does this countdown drift or lose accuracy over long periods?', a: 'No — because every tick recomputes remaining time as TARGET minus Date.now() rather than decrementing a stored counter, any delay in a single setInterval firing (from a throttled background tab, for example) self-corrects on the very next tick instead of accumulating error.' },
      { q: 'What happens exactly when the countdown reaches zero?', a: 'The tick() function detects remaining <= 0, calls clearInterval() to stop the timer permanently, hides the four number boxes, and reveals a completion message in their place — it does not keep displaying 00:00:00:00.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — set the interval inside useEffect (React) with a cleanup function calling clearInterval, or onMounted/onUnmounted in Vue, or ngOnInit/ngOnDestroy in Angular; store the target timestamp in state or a ref rather than a plain module-level constant.' },
      { q: 'Why use font-variant-numeric: tabular-nums on the number boxes?', a: 'Without it, digits like "1" and "8" render at slightly different widths in most fonts, causing the countdown numbers to visibly shift left and right every second; tabular-nums forces every digit to the same fixed width.' },
      { q: 'Does closing the banner stop the timer from running in the background?', a: 'Yes — the close button\'s click handler explicitly calls clearInterval(intervalId) before hiding the banner, so no interval keeps firing and updating now-invisible DOM elements after dismissal.' },
      { q: 'How do I change the countdown target date?', a: 'Replace the TARGET constant\'s calculation with a fixed date, for example new Date(\'2026-12-31T23:59:59Z\').getTime(), instead of the relative Date.now()-based offset used in this demo.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to persist dismissal in localStorage so the banner stays hidden across page reloads, or to add a pulsing animation on the Seconds box each time it changes. It's also worth asking it to swap in a different message and CTA button once the countdown completes.`,
      prompt: `Build a Bootstrap 5.3 dismissible countdown timer banner using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A full-width real Bootstrap alert element with role="alert" containing four boxes for Days, Hours, Minutes, Seconds, each zero-padded to two digits.
- The countdown target must be a fixed timestamp computed once, and the displayed remaining time must be recalculated every second from the current time minus that fixed target (not decremented from a stored counter), so the countdown cannot drift.
- When the countdown reaches zero, the four boxes must be hidden and replaced with a completion message, and the interval timer must be stopped with clearInterval.
- A real Bootstrap btn-close button must dismiss the entire banner and also stop the underlying timer so it doesn't keep running after the banner is hidden.
- Use font-variant-numeric: tabular-nums or similar so the digits don't visually jitter as they update each second.`,
    },
  },
};

export default bootstrapCountdownTimerBanner;
