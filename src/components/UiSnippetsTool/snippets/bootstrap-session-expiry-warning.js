const bootstrapSessionExpiryWarning = {
  id: 'bootstrap-session-expiry-warning',
  title: 'Bootstrap Session Expiry Warning',
  lastmod: '2026-09-11',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bssess-card">
    <div class="card-body p-4 text-center">
      <h6 class="fw-bold mb-1">Dashboard</h6>
      <p class="small text-muted mb-2">Demo session (sped up): expires after 18 seconds of inactivity.</p>
      <p class="fw-semibold mb-0" id="bssessTimer">18s remaining</p>
    </div>
  </div>
</div>

<div class="modal fade" id="bssessModal" tabindex="-1" data-bs-backdrop="static" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Your session is about to expire</h5>
      </div>
      <div class="modal-body">
        <p class="mb-0">You've been inactive for a while. You'll be signed out in <strong id="bssessCountdown">8</strong> seconds.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" id="bssessLogout">Log out now</button>
        <button type="button" class="btn btn-dark fw-bold" id="bssessStay">Stay signed in</button>
      </div>
    </div>
  </div>
</div>

<div class="bssess-expired d-none" id="bssessExpired">
  <div class="text-center text-white">
    <p class="fw-bold mb-2">Session expired</p>
    <button type="button" class="btn btn-light btn-sm fw-bold" id="bssessRestart">Log in again</button>
  </div>
</div>`,
  css: `.bssess-card { width: 340px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; position: relative; }
.bssess-expired {
  position: fixed; inset: 0; background: rgba(20,22,28,.85);
  display: flex; align-items: center; justify-content: center; z-index: 1100;
}`,
  js: `const TOTAL = 18;
const WARN_AT = 8;

const timerEl = document.getElementById('bssessTimer');
const modalEl = document.getElementById('bssessModal');
const modal = new bootstrap.Modal(modalEl);
const countdownEl = document.getElementById('bssessCountdown');
const expiredOverlay = document.getElementById('bssessExpired');

let remaining = TOTAL;
let interval = null;

function tick() {
  remaining--;
  if (remaining > WARN_AT) {
    timerEl.textContent = remaining + 's remaining';
  } else if (remaining > 0) {
    timerEl.textContent = remaining + 's remaining';
    countdownEl.textContent = remaining;
    if (!modalEl.classList.contains('show')) modal.show();
  } else {
    clearInterval(interval);
    modal.hide();
    expiredOverlay.classList.remove('d-none');
  }
}

function start() {
  clearInterval(interval);
  remaining = TOTAL;
  timerEl.textContent = remaining + 's remaining';
  expiredOverlay.classList.add('d-none');
  interval = setInterval(tick, 1000);
}

document.getElementById('bssessStay').addEventListener('click', () => {
  modal.hide();
  start();
});

document.getElementById('bssessLogout').addEventListener('click', () => {
  clearInterval(interval);
  modal.hide();
  expiredOverlay.classList.remove('d-none');
});

document.getElementById('bssessRestart').addEventListener('click', start);

start();`,

  seo: {
    title: 'Bootstrap Session Expiry Warning — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 idle-session warning — a countdown modal appears before expiry with "Stay signed in" and "Log out now", and an unanswered countdown genuinely locks the page with an expired-session overlay.',
    about: {
      title: 'Bootstrap Session Expiry Warning — HTML, CSS & JavaScript',
      description: `One \`setInterval\` ticking once a second drives every state this snippet shows — the quiet background countdown on the page itself, the warning modal that appears once \`remaining\` crosses \`WARN_AT\`, and the final expired overlay once it hits zero — rather than three separate timers that would need to stay manually synchronized with each other.\n\nThe modal is deliberately configured with \`data-bs-backdrop="static"\`, one of Bootstrap's own real modal options, so clicking outside it can't dismiss it the way a normal informational modal would — an expiry warning that can be casually clicked away without addressing it defeats its own purpose. "Stay signed in" and "Log out now" both stop the current countdown, but only "Stay signed in" calls \`start()\` again to reset \`remaining\` back to \`TOTAL\`; "Log out now" intentionally goes straight to the expired overlay instead, since choosing to log out shouldn't need its own separate countdown to actually happen.\n\nThe expired state is modeled as a full-page overlay rather than another modal — a session that has actually expired should block interaction with the underlying page entirely until the user restarts (in a real app, redirects to a login page), which a dismissible Bootstrap modal isn't designed to guarantee on its own.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A countdown begins immediately, sped up for this demo to 18 seconds total.' },
        { title: 'Wait until 8 seconds remain', text: 'A warning modal appears automatically, itself counting down from 8, with backdrop clicks disabled.' },
        { title: 'Click "Stay signed in"', text: 'The modal closes and the full 18-second countdown restarts from the beginning.' },
        { title: 'Let the modal\'s countdown reach zero without clicking anything', text: 'The modal is replaced by a full-page "Session expired" overlay blocking the page.' },
        { title: 'Click "Log in again"', text: 'The whole demo resets and the countdown starts over from 18 seconds.' },
      ],
    },
    features: [
      'One single interval drives the background timer, the warning modal, and the final expired state',
      'The warning modal uses a real static backdrop, preventing an outside click from dismissing an unanswered warning',
      '"Log out now" intentionally skips straight to the expired state instead of running its own countdown',
      'The expired state is a full-page overlay, not a dismissible modal, correctly blocking further interaction',
      'Every path (stay, log out, or timeout) correctly clears the interval so no stray timer keeps running',
    ],
    useCases: [
      { icon: 'APP', title: 'Banking, healthcare, and other compliance-sensitive dashboards', desc: 'Session timeout warnings are frequently a genuine security or compliance requirement, not just a UX nicety.' },
      { icon: 'FORM', title: 'Any app with a real backend session or auth token expiry', desc: 'Pairs with [bootstrap-reauthentication-modal](/ui-snippets/bootstrap-reauthentication-modal/) for the related but distinct pattern of confirming identity before a specific sensitive action.' },
      { icon: 'LEARN', title: 'Learning to coordinate multiple UI states from one timer', desc: 'A clean example of driving several dependent visual states from a single source of truth instead of separate competing timers.' },
    ],
    faqs: [
      { q: 'Is this based on real user inactivity, or just a fixed timer?', a: 'This demo runs on a fixed countdown so the behavior is fully visible without waiting for a real idle period; a production version should reset the timer on genuine activity signals (mousemove, keydown, or an actual API heartbeat) rather than running unconditionally.' },
      { q: 'Why can\'t I dismiss the warning modal by clicking outside it?', a: 'It\'s configured with Bootstrap\'s data-bs-backdrop="static" option specifically so an accidental outside click can\'t make an unanswered expiry warning disappear without the user actually choosing to stay or log out.' },
      { q: 'What happens to unsaved work when the session actually expires?', a: 'This snippet only models the timing and lockout behavior — a real implementation should pair this with something like [bootstrap-unsaved-changes-alert](/ui-snippets/bootstrap-unsaved-changes-alert/)\'s dirty-tracking to warn about (or attempt to save) unsaved work before a session lockout occurs.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the remaining seconds in a ref-backed interval (to avoid restarting it on every re-render) mirrored into component state for display, and drive the modal and overlay\'s visibility from that same state.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to reset the countdown automatically on real user activity (mousemove, keydown, click) instead of only via the "Stay signed in" button, or to make an actual authenticated API call on "Stay signed in" to refresh a real backend session token rather than just resetting a client-side timer.`,
      prompt: `Build a Bootstrap 5.3 session expiry warning, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A single interval-driven countdown (sped up for demo purposes, e.g. 18 seconds total) with a visible remaining-time indicator on the page.
- Once the countdown crosses a warning threshold (e.g. 8 seconds remaining), automatically show a Bootstrap modal with its own live countdown and two actions: "Stay signed in" and "Log out now". The modal must use a static backdrop so it cannot be dismissed by clicking outside it.
- "Stay signed in" must reset the full countdown from the beginning and close the modal. "Log out now" must immediately end the session instead of running any further countdown.
- If the modal's countdown reaches zero with no action taken, replace it with a full-page overlay indicating the session has expired, blocking interaction with the underlying page until a "Log in again" action resets the whole demo.`,
    },
  },
};

export default bootstrapSessionExpiryWarning;
