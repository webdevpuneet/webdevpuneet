const bootstrapMaintenancePage = {
  id: 'bootstrap-maintenance-page',
  title: 'Bootstrap Maintenance Page',
  lastmod: '2026-09-10',
  category: 'layouts',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="text-center bsmaint-card">
    <div class="bsmaint-icon mb-3">
      <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.7 6.3a4 4 0 0 1-5.6 5.6L3 18l3 3 6.1-6.1a4 4 0 0 1 5.6-5.6l-2.1 2.1-2-2z"></path>
      </svg>
    </div>
    <h2 class="fw-bold mb-2">We'll be right back</h2>
    <p class="text-muted mb-4">Our site is currently undergoing scheduled maintenance. Thanks for your patience — we're making things better.</p>

    <div class="d-flex justify-content-center gap-3 mb-4" id="bsmaintCountdown">
      <div class="bsmaint-unit"><div class="bsmaint-num" id="bsmaintDays">00</div><div class="bsmaint-label">Days</div></div>
      <div class="bsmaint-unit"><div class="bsmaint-num" id="bsmaintHours">00</div><div class="bsmaint-label">Hours</div></div>
      <div class="bsmaint-unit"><div class="bsmaint-num" id="bsmaintMins">00</div><div class="bsmaint-label">Mins</div></div>
      <div class="bsmaint-unit"><div class="bsmaint-num" id="bsmaintSecs">00</div><div class="bsmaint-label">Secs</div></div>
    </div>

    <div id="bsmaintFormWrap">
      <form id="bsmaintForm" class="d-flex justify-content-center" novalidate>
        <div class="input-group bsmaint-inputgroup">
          <input type="email" class="form-control" id="bsmaintEmail" placeholder="you@example.com" aria-label="Email address">
          <button class="btn btn-dark" type="submit">Notify me</button>
        </div>
      </form>
      <div id="bsmaintError" class="text-danger small mt-2" style="display:none;">Please enter a valid email address.</div>
    </div>

    <div id="bsmaintSuccess" class="alert alert-success d-inline-block mt-2" style="display:none;">
      Thanks! We'll email <strong id="bsmaintEmailEcho"></strong> the moment we're back online.
    </div>
  </div>
</div>`,
  css: `.bsmaint-card { max-width: 520px; }
.bsmaint-icon { color: #212529; }
.bsmaint-unit { min-width: 64px; }
.bsmaint-num { font-size: 1.75rem; font-weight: 700; background: #f1f3f5; border-radius: 10px; padding: 8px 0; }
.bsmaint-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.06em; color: #868e96; margin-top: 4px; }
.bsmaint-inputgroup { max-width: 380px; }`,
  js: `// Target time is computed once at load: 6 hours from the moment the page opens.
const backOnline = new Date(Date.now() + 6 * 60 * 60 * 1000);

const daysEl = document.getElementById('bsmaintDays');
const hoursEl = document.getElementById('bsmaintHours');
const minsEl = document.getElementById('bsmaintMins');
const secsEl = document.getElementById('bsmaintSecs');

function pad(n) { return String(n).padStart(2, '0'); }

function tick() {
  const diff = backOnline.getTime() - Date.now();
  if (diff <= 0) {
    daysEl.textContent = hoursEl.textContent = minsEl.textContent = secsEl.textContent = '00';
    clearInterval(timer);
    return;
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const mins = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(mins);
  secsEl.textContent = pad(secs);
}

tick();
const timer = setInterval(tick, 1000);

const form = document.getElementById('bsmaintForm');
const emailInput = document.getElementById('bsmaintEmail');
const errorEl = document.getElementById('bsmaintError');
const formWrap = document.getElementById('bsmaintFormWrap');
const successEl = document.getElementById('bsmaintSuccess');
const emailEcho = document.getElementById('bsmaintEmailEcho');

const EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();
  if (!EMAIL_RE.test(value)) {
    errorEl.style.display = 'block';
    emailInput.classList.add('is-invalid');
    return;
  }
  errorEl.style.display = 'none';
  emailInput.classList.remove('is-invalid');
  emailEcho.textContent = value;
  formWrap.style.display = 'none';
  successEl.style.display = 'inline-block';
});

emailInput.addEventListener('input', () => {
  if (emailInput.classList.contains('is-invalid') && EMAIL_RE.test(emailInput.value.trim())) {
    emailInput.classList.remove('is-invalid');
    errorEl.style.display = 'none';
  }
});`,
  seo: {
    title: 'Bootstrap Maintenance Page — Free HTML CSS JS Snippet',
    description: 'A Bootstrap 5.3 maintenance page with a live setInterval countdown and an email form validated via regex before showing confirmation. Exports to React & Vue.',
    about: {
      title: 'Bootstrap Maintenance Page — HTML, CSS & JavaScript',
      description: `A maintenance page needs to do two jobs at once: reassure the visitor nothing is broken, and give them a reason to come back. This snippet builds both on top of real Bootstrap 5.3 markup — a centered \`.text-center\` card, an inline SVG wrench icon (no icon-font dependency), and a Bootstrap \`input-group\` combining an \`<input type="email">\` with a dark submit button.\n\nThe countdown is computed, not hardcoded. On load, \`backOnline\` is set once to \`Date.now() + 6 * 60 * 60 * 1000\` — six hours out — captured as a fixed timestamp rather than recalculated every tick, which matters: if you instead recomputed "6 hours from now" inside the interval, the countdown would never move. A \`tick()\` function run immediately and then every second via \`setInterval\` subtracts the current time from that fixed target, converts the millisecond difference into whole days, hours, minutes and seconds using integer division and modulo against 86400, 3600 and 60, and writes each zero-padded value (via a small \`pad()\` helper using \`padStart\`) into the four \`.bsmaint-num\` boxes. When the difference reaches zero or below, the digits are pinned to \`00\` and the interval is cleared with \`clearInterval(timer)\` so it does not keep ticking into negative numbers — a real edge case, since without that guard the display would show garbage once the target time passed while the tab stayed open.\n\nThe "Notify me" form intercepts its own submit event with \`e.preventDefault()\` so nothing actually posts anywhere, then validates the typed email against \`EMAIL_RE\`, a pragmatic \`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\` pattern. A failed check adds Bootstrap's \`is-invalid\` class to the input and reveals a small \`text-danger\` message below the field; a passing check hides both, writes the entered address into a \`<strong>\` echo inside a Bootstrap \`alert-success\`, hides the form wrapper entirely, and shows that confirmation in its place. A second \`input\` listener clears the invalid state the moment the user fixes the address, rather than waiting for another submit attempt, which is the small detail that keeps the form from feeling stuck in an error state.\n\nBecause every element is addressed by plain \`id\` selectors and the logic runs from a single top-level script, the whole thing drops into a React \`useEffect\`, a Vue \`onMounted\`, or an Angular \`ngAfterViewInit\` with only the timer's cleanup needing extra care — clearing the interval on unmount to avoid a state update after the component is gone. Restyling with Tailwind utility classes instead of Bootstrap's card and input-group primitives requires no change to the JavaScript at all, since none of the logic queries a Bootstrap-specific class name; it only reads plain ids like \`bsmaintForm\` and \`bsmaintEmail\`, which stay stable regardless of which design system paints the surrounding chrome.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A wrench icon, a headline, and a live four-box countdown (Days/Hours/Mins/Secs) appear immediately, already counting down from six hours.' },
        { title: 'Watch the countdown', text: 'The seconds box decrements every second; once minutes roll over to 60 the minutes box increments and seconds resets, exactly like a real clock.' },
        { title: 'Submit an invalid email', text: 'Typing "abc" and clicking Notify me shows a red border on the input and a "Please enter a valid email address" message below it.' },
        { title: 'Fix the email', text: 'As soon as the address becomes valid, the red border and error message disappear automatically without needing to resubmit.' },
        { title: 'Submit a valid email', text: 'The form disappears and a green confirmation box appears in its place, echoing back the exact email address you entered.' },
        { title: 'Leave the tab open past the target time', text: 'Once the countdown reaches zero, all four boxes lock at 00 and stop updating instead of counting into negative numbers.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 card layout, input-group, and alert-success components',
      'Inline SVG wrench icon with no external icon font or image dependency',
      'Countdown target computed once on load as a fixed Date, not recalculated every tick',
      'setInterval-driven tick() updates four zero-padded Days/Hours/Mins/Secs boxes every second',
      'Countdown automatically halts at 00:00:00:00 via clearInterval instead of going negative',
      'Email validated client-side with a regex before the form is allowed to succeed',
      'Bootstrap is-invalid state applied and cleared live as the user edits the field',
      'Form-to-confirmation swap echoes the submitted email into the success alert',
    ],
    useCases: [
      { icon: 'APP', title: 'Planned downtime and deploy windows', desc: 'Show visitors a precise return estimate during a deploy or migration instead of a bare error page.' },
      { icon: 'FORM', title: 'Pre-launch waitlist capture', desc: 'Reuse the same email-capture pattern seen in the [subscription plans cards](/ui-snippets/bootstrap-subscription-plans-cards/) to collect leads while a product is still being built.' },
      { icon: 'DASHBOARD', title: 'Status page companion', desc: 'Pair this page with an internal [admin dashboard sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/) so the team can watch progress while visitors see the friendly countdown view.' },
      { icon: 'LEARN', title: 'Learning countdown timer mechanics', desc: 'A clean example of computing a fixed target Date once, then deriving days/hours/minutes/seconds from a live diff without drift.' },
      { icon: 'FLOW', title: 'Incident communication', desc: 'Adapt the copy and countdown to communicate estimated recovery time during an outage, similar in spirit to a [back to top button](/ui-snippets/bootstrap-back-to-top-button/) that reassures users the page still works.' },
    ],
    faqs: [
      { q: 'Does the countdown keep counting after I close and reopen the tab?', a: 'No — the target time is computed relative to when the page loads (Date.now() plus six hours), so reopening the tab resets the countdown to a fresh six hours unless you replace it with a fixed timestamp from your backend or a query parameter.' },
      { q: 'What happens when the countdown reaches zero?', a: 'All four boxes lock at 00 and the setInterval loop is cleared via clearInterval(timer), so the numbers stop updating cleanly instead of drifting into negative values once Date.now() passes the target.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — start the interval inside useEffect (React), onMounted (Vue), or ngAfterViewInit (Angular), store the interval id, and clear it in the cleanup function or ngOnDestroy; swap the getElementById calls for refs or a bound reactive value for the four numbers.' },
      { q: 'Is the email actually sent anywhere?', a: 'No — this is a front-end-only demo. The preventDefault() call stops the native form submission and the regex check only validates format; wire the fetch/axios POST to your notification service inside the same submit handler.' },
      { q: 'Will this look right with Tailwind instead of Bootstrap classes?', a: 'The HTML structure and JS logic are framework-agnostic — swap card, input-group, and alert-success for Tailwind utility classes on the same elements and every id-based selector in the JS keeps working unchanged.' },
      { q: 'What if a user pastes a valid-looking but malformed email?', a: 'The regex only checks structural shape (text, @, text, dot, text) — it deliberately does not verify the domain exists, since that requires a server round trip; pair it with server-side verification for production use.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add a progress bar that fills as the countdown approaches zero, or to persist the target timestamp in localStorage so a page refresh does not reset the six-hour window. It is also worth asking it to wire the notify form to a real email API with a loading spinner on the submit button.`,
      prompt: `Build a Bootstrap 5.3 maintenance page using the real Bootstrap CDN (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A centered card with an inline SVG icon, a heading, and a short message.
- A live countdown made of four boxes (Days, Hours, Mins, Secs) counting down to a fixed target time computed once on load as six hours from now, updated every second via setInterval, and halting at 00 instead of going negative once it reaches zero.
- An email-capture form using a Bootstrap input-group with an email input and a submit button. On submit, prevent the default form action, validate the email with a regex, and show a Bootstrap is-invalid state plus an error message on failure.
- On a valid submission, hide the form and show a Bootstrap alert-success confirmation that echoes back the submitted email address.
- Clearing the invalid state live as the user corrects the email, without requiring another submit click.`,
    },
  },
};

export default bootstrapMaintenancePage;
