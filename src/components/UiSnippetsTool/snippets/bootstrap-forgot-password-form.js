const bootstrapForgotPasswordForm = {
  id: 'bootstrap-forgot-password-form',
  title: 'Bootstrap Forgot Password Form',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsfp-card">
    <div class="card-body p-4">

      <div id="bsfpForm">
        <h5 class="fw-bold mb-1 text-center">Forgot your password?</h5>
        <p class="text-muted small mb-3 text-center">Enter your email and we'll send you a reset link.</p>
        <label class="form-label small fw-semibold" for="bsfpEmail">Email address</label>
        <input type="email" class="form-control mb-2" id="bsfpEmail" placeholder="you@example.com">
        <div class="small text-danger mb-2 d-none" id="bsfpError">Please enter a valid email address.</div>
        <button class="btn btn-dark w-100 fw-bold mt-2" id="bsfpSubmit">Send reset link</button>
      </div>

      <div id="bsfpSuccess" class="d-none text-center">
        <div class="bsfp-check mb-3 mx-auto">&#10003;</div>
        <h5 class="fw-bold mb-1">Check your email</h5>
        <p class="text-muted small mb-3">We sent a reset link to<br><span class="fw-semibold" id="bsfpMasked"></span></p>
        <p class="small mb-0">
          Didn't get it?
          <a href="javascript:void(0)" id="bsfpResend">Resend link</a>
          <span id="bsfpTimer" class="text-muted"></span>
        </p>
      </div>

    </div>
  </div>
</div>`,
  css: `.bsfp-card { width: 380px; border: 1px solid #eceef1; border-radius: 14px; }
.bsfp-check { width: 52px; height: 52px; border-radius: 50%; background: #d1f5df; color: #1a7f4b; font-size: 26px; font-weight: 700; display: flex; align-items: center; justify-content: center; }
#bsfpSuccess { animation: bsfpFadeIn .25s ease; }
@keyframes bsfpFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`,
  js: `const RESEND_SECONDS = 30;

const formView = document.getElementById('bsfpForm');
const successView = document.getElementById('bsfpSuccess');
const emailInput = document.getElementById('bsfpEmail');
const errorMsg = document.getElementById('bsfpError');
const submitBtn = document.getElementById('bsfpSubmit');
const maskedLabel = document.getElementById('bsfpMasked');
const resendLink = document.getElementById('bsfpResend');
const timerLabel = document.getElementById('bsfpTimer');

let countdownId = null;

function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}

// Masks everything but the first character of the local part, e.g.
// "sarah@gmail.com" becomes "s\\u2022\\u2022\\u2022\\u2022\\u2022@gmail.com" so the
// success screen confirms the destination without fully exposing it.
function maskEmail(value) {
  const [local, domain] = value.split('@');
  if (!local || !domain) return value;
  const masked = local[0] + '\\u2022'.repeat(Math.max(local.length - 1, 3));
  return masked + '@' + domain;
}

function startCountdown() {
  let remaining = RESEND_SECONDS;
  resendLink.classList.add('disabled', 'text-muted');
  resendLink.style.pointerEvents = 'none';
  timerLabel.textContent = ' (' + remaining + 's)';
  clearInterval(countdownId);
  countdownId = setInterval(() => {
    remaining -= 1;
    if (remaining <= 0) {
      clearInterval(countdownId);
      timerLabel.textContent = '';
      resendLink.classList.remove('disabled', 'text-muted');
      resendLink.style.pointerEvents = 'auto';
    } else {
      timerLabel.textContent = ' (' + remaining + 's)';
    }
  }, 1000);
}

submitBtn.addEventListener('click', () => {
  const value = emailInput.value.trim();
  const valid = isValidEmail(value);
  emailInput.classList.toggle('is-invalid', !valid);
  errorMsg.classList.toggle('d-none', valid);
  if (!valid) return;

  maskedLabel.textContent = maskEmail(value);
  formView.classList.add('d-none');
  successView.classList.remove('d-none');
  startCountdown();
});

resendLink.addEventListener('click', () => {
  if (resendLink.classList.contains('disabled')) return;
  startCountdown();
});`,

  seo: {
    title: 'Bootstrap Forgot Password Form — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 forgot-password card with email masking on success and a live 30-second resend countdown. Copy-paste or export to React, Vue & Angular.',
    about: {
      title: 'Bootstrap Forgot Password Form — HTML, CSS & JavaScript',
      description: `This snippet swaps between two sibling views inside one \`.card\`: \`#bsfpForm\`, a standard Bootstrap \`form-control\` email field, and \`#bsfpSuccess\`, hidden by default with \`d-none\`. Clicking Send reset link runs \`isValidEmail()\` — a regex check for a basic \`local@domain.tld\` shape — and toggles Bootstrap's own \`is-invalid\` class plus a \`d-none\`-controlled inline error message when the value fails. On success, the real logic of this snippet runs: \`maskEmail()\` splits the address on \`@\`, keeps only the first character of the local part, and replaces the rest with bullet characters (\`\\u2022\`) padded to at least three, so \`sarah@gmail.com\` renders as \`s•••••@gmail.com\` — enough to confirm the right inbox without fully exposing it on a screen someone might be shoulder-surfing.\n\nThe success view carries a \`bsfp-check\` circular badge built from a handful of custom CSS rules (border-radius 50%, a light green background, centered flex content) rather than an icon library, keeping the whole snippet dependency-free, and a \`bsfpFadeIn\` keyframe animation plays when \`d-none\` is removed from \`#bsfpSuccess\`, matching the same reveal treatment used elsewhere in this library's multi-step forms.\n\nThe resend mechanic is implemented with \`startCountdown()\`, shared conceptually with this library's OTP and 2FA snippets but written independently here: it sets a 30-second \`RESEND_SECONDS\` counter, applies \`disabled\`/\`text-muted\` classes to the \`<a>\` link and sets \`pointerEvents: 'none'\` inline — necessary because CSS classes alone don't block clicks on an anchor tag the way the \`disabled\` attribute blocks a \`<button>\` — and ticks \`timerLabel.textContent\` down every second via \`setInterval\` until it hits zero, at which point it clears the interval and removes the disabled styling.\n\nA specific edge case this handles: \`startCountdown()\` always calls \`clearInterval(countdownId)\` at its own start, before creating a new interval. Without that guard, clicking Resend link right as a previous countdown is about to finish could start a second overlapping \`setInterval\`, causing the displayed number to skip or jump erratically as two intervals both write to \`timerLabel\` on slightly different schedules. Storing \`countdownId\` in outer scope (rather than as a local variable inside the click handler) is what makes that self-clearing possible across repeated calls. The masking function also guards against a malformed value with no \`@\` — \`const [local, domain] = value.split('@')\` — by returning the original string unchanged if either part is missing, rather than throwing on \`local[0]\` of \`undefined\`.\n\nValidation and masking are also kept as two separate, single-purpose functions rather than one combined routine: \`isValidEmail()\` only answers a yes/no question about format, and \`maskEmail()\` only transforms an already-known-valid string for display. Splitting them this way means the masking logic never has to defensively handle a completely malformed non-email string in the success view — by the time \`maskEmail()\` runs, \`isValidEmail()\` has already guaranteed the value contains an \`@\` and a domain-like suffix, so \`maskEmail()\` only needs to guard against edge cases within that already-valid shape, such as an unusually short local part. The Send button's click handler follows the same validate-then-branch structure used throughout this library's auth snippets: toggle the invalid-state classes first based on the check, then \`return\` early on failure so the success-view logic below never executes against bad input.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A card appears with a single email field and a "Send reset link" button.' },
        { title: 'Click Send with an empty or invalid email', text: 'The field outlines red and an inline error message appears beneath it.' },
        { title: 'Type "sarah@gmail.com" and click Send reset link', text: 'The card fades into a success view with a green checkmark badge.' },
        { title: 'Read the confirmation text', text: 'It shows the masked address "s•••••@gmail.com" — proving the destination without revealing the full email.' },
        { title: 'Look at the Resend link', text: 'It appears grayed out with a live "(30s)" countdown that ticks down every second.' },
        { title: 'Wait for the countdown to finish, then click Resend', text: 'The link re-enables and clicking it restarts a fresh 30-second countdown.' },
      ],
    },
    features: [
      'Two-view card swap (form and success state) using Bootstrap d-none, not a page navigation',
      'Real email format validation with Bootstrap is-invalid styling and an inline error message',
      'Dedicated maskEmail() function that reveals only the first character of the local part',
      'Custom circular success badge built from a handful of CSS rules, no icon library',
      'CSS keyframe fade-in animation when the success view is revealed',
      'Live 30-second resend countdown updating every second via setInterval',
      'startCountdown() clears any previous interval before starting a new one, preventing overlapping timers',
      'Guards against malformed email input when splitting on "@" for masking',
    ],
    useCases: [
      { icon: 'FORM', title: 'Account recovery flows', desc: 'The standard first step before a [bootstrap-reset-password-form](/ui-snippets/bootstrap-reset-password-form/) screen where the user actually sets a new password.' },
      { icon: 'FLOW', title: 'Login pages with a "Forgot password?" link', desc: 'Pairs with [bootstrap-login-form-validation](/ui-snippets/bootstrap-login-form-validation/) as the destination for that link.' },
      { icon: 'SECURITY', title: 'Privacy-conscious confirmation screens', desc: 'Masking the destination email avoids fully exposing account details on a shared or unlocked screen.' },
      { icon: 'LEARN', title: 'Learning string masking and countdown timers', desc: 'A compact, realistic example of both a data-masking function and a self-clearing setInterval countdown.' },
      { icon: 'APP', title: 'SaaS and admin portal auth pages', desc: 'A drop-in recovery card for any dashboard, similar in spirit to [bootstrap-admin-dashboard-sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/)\'s auth-adjacent screens.' },
    ],
    faqs: [
      { q: 'Does this actually send a password reset email?', a: 'No — this is a front-end demo. The Send reset link button validates the email format and swaps to a success view; wiring it to a real email dispatch would mean replacing that click handler with an API call and showing the success view only after the request resolves.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, hold a "submitted" boolean and the masked email in useState instead of toggling d-none directly, cleaning up the countdown interval in a useEffect return function; in Vue, use ref/reactive with onUnmounted; in Angular, store the interval handle on the component and clear it in ngOnDestroy.' },
      { q: 'How exactly is the email masked?', a: 'The address is split on "@"; the first character of the local part is kept, and the rest is replaced with bullet characters padded to at least three dots regardless of how short the original local part was, then the real domain is appended unchanged — so "al@x.com" still shows a masked block rather than a single dot.' },
      { q: 'What happens if I click Resend before the countdown finishes?', a: 'Nothing — the link carries the Bootstrap disabled class and an inline pointer-events: none style while counting down, and the click handler also checks classList.contains(\'disabled\') as a second guard before doing anything.' },
      { q: 'How would this look with Tailwind instead of Bootstrap classes?', a: 'Keep the HTML structure and all JS logic as-is, then replace .card/.card-body/.form-control with Tailwind utilities like rounded-2xl border p-6 and border rounded px-3 py-2 w-full, and rebuild .bsfp-check with a Tailwind rounded-full bg-green-100 text-green-700 flex items-center justify-center block.' },
      { q: 'Is the email format check strict enough for production?', a: 'It is a basic regex sufficient for a front-end demo, not full RFC 5322 validation — for production use, pair it with server-side validation and, ideally, an actual verification email round-trip rather than trusting client-side format checks alone.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a rate-limit message if reset is requested too many times in a row, or to persist the countdown across a page refresh with localStorage. It's also worth asking for a loading spinner on the submit button while the "request" is in flight.`,
      prompt: `Build a Bootstrap 5.3 forgot-password form, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A centered Bootstrap card containing a single email input, validated with a regex on submit, showing Bootstrap's is-invalid class and an inline error message for invalid input.
- On valid submission, replace the form with a success view within the same card (no page navigation) showing a checkmark badge and confirmation text.
- The confirmation text must show the email address the link was "sent" to, but masked so only the first character of the local part (before the @) is visible and the rest is replaced with bullet characters, keeping the real domain visible, e.g. "s•••••@gmail.com".
- Include a "Resend link" anchor that becomes disabled for 30 seconds after use, with a live countdown next to it updating every second via setInterval and correctly re-enabling when it reaches zero.
- Ensure repeated clicks or rapid resend attempts never start two overlapping countdown intervals.`,
    },
  },
};

export default bootstrapForgotPasswordForm;
