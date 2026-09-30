const bootstrapReauthenticationModal = {
  id: 'bootstrap-reauthentication-modal',
  title: 'Bootstrap Re-authentication Modal',
  lastmod: '2026-09-11',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsreauth-card">
    <div class="card-body p-4">
      <h6 class="fw-bold mb-1">Account settings</h6>
      <p class="small text-muted mb-3">Sensitive actions ask you to confirm your password first.</p>
      <button type="button" class="btn btn-outline-danger w-100" data-bs-toggle="modal" data-bs-target="#bsreauthModal">
        Delete account
      </button>
      <p class="small mt-3 mb-0" id="bsreauthStatus">&nbsp;</p>
    </div>
  </div>
</div>

<div class="modal fade" id="bsreauthModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title fw-bold">Confirm it's you</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <p class="small text-muted mb-2">Re-enter your password to continue (try "demo1234" for this preview).</p>
        <input type="password" class="form-control" id="bsreauthPassword" autocomplete="current-password">
        <p class="small text-danger mt-2 mb-0 d-none" id="bsreauthError">Incorrect password. Try again.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
        <button type="button" class="btn btn-danger fw-bold" id="bsreauthConfirm">Confirm &amp; delete</button>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsreauth-card { width: 360px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsreauthPassword.is-invalid { border-color: #dc3545; }`,
  js: `const REAL_PASSWORD = 'demo1234';
const modalEl = document.getElementById('bsreauthModal');
const modal = new bootstrap.Modal(modalEl);
const passwordInput = document.getElementById('bsreauthPassword');
const error = document.getElementById('bsreauthError');
const confirmBtn = document.getElementById('bsreauthConfirm');
const status = document.getElementById('bsreauthStatus');

let attempts = 0;

modalEl.addEventListener('shown.bs.modal', () => {
  passwordInput.value = '';
  passwordInput.classList.remove('is-invalid');
  error.classList.add('d-none');
  passwordInput.focus();
});

function attempt() {
  attempts++;
  if (passwordInput.value === REAL_PASSWORD) {
    modal.hide();
    status.textContent = 'Account deleted. (Attempts needed: ' + attempts + ')';
    status.className = 'small mt-3 mb-0 text-danger fw-semibold';
    attempts = 0;
  } else {
    passwordInput.classList.add('is-invalid');
    error.classList.remove('d-none');
    passwordInput.select();
  }
}

confirmBtn.addEventListener('click', attempt);
passwordInput.addEventListener('keydown', e => { if (e.key === 'Enter') attempt(); });
passwordInput.addEventListener('input', () => {
  passwordInput.classList.remove('is-invalid');
  error.classList.add('d-none');
});`,

  seo: {
    title: 'Bootstrap Re-authentication Modal — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 step-up confirmation modal — re-enter your password before a destructive action proceeds, with a genuine wrong-password error state and a reset on every reopen.',
    about: {
      title: 'Bootstrap Re-authentication Modal — HTML, CSS & JavaScript',
      description: `This is a distinct pattern from an idle-session timeout warning like [bootstrap-session-expiry-warning](/ui-snippets/bootstrap-session-expiry-warning/) — re-authentication isn't about *how long* a session has lasted, it's about confirming identity again right before one *specific, high-consequence* action, regardless of how recently the user last typed their password. That's why it's triggered directly from the "Delete account" button via Bootstrap's own \`data-bs-toggle="modal"\`, not from any timer.\n\nBootstrap's \`shown.bs.modal\` event is what resets the password field, clears any previous error, and focuses the input — deliberately on every single open, not just the first, so a user who gets the password wrong, dismisses the modal, and reopens it always starts from a clean state rather than seeing a stale error message from their last attempt.\n\nA wrong password clears itself the moment the user starts typing again (the \`input\` listener removes \`is-invalid\` and hides the error immediately), rather than requiring another failed submit to acknowledge that they're actively correcting it — leaving a red error state visible while someone is mid-correction reads as the form ignoring what they're currently doing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Delete account"', text: 'A modal opens asking to confirm your password, with the field empty and focused.' },
        { title: 'Type an incorrect password and confirm', text: 'The field outlines in red with an "Incorrect password" message beneath it.' },
        { title: 'Start typing again', text: 'The red error clears immediately, even before you\'ve resubmitted.' },
        { title: 'Type "demo1234" and confirm (or press Enter)', text: 'The modal closes and a status message confirms the action, along with how many attempts it took.' },
        { title: 'Reopen the modal after a successful or failed attempt', text: 'The field is always empty and the error always cleared, regardless of what happened last time.' },
      ],
    },
    features: [
      'A distinct pattern from idle-timeout warnings — triggered by a specific action, not elapsed time',
      'Every modal open resets the field and error state via Bootstrap\'s real shown.bs.modal event',
      'A wrong-password error clears itself the instant the user starts correcting it, not only on resubmit',
      'Both clicking Confirm and pressing Enter in the field trigger the same verification function',
      'The confirmed action only proceeds after a genuinely correct password, modeled with a real comparison',
    ],
    useCases: [
      { icon: 'APP', title: 'Account deletion and irreversible destructive actions', desc: 'The standard "prove it\'s really you" step before an action that can\'t be undone.' },
      { icon: 'APP', title: 'Reviewing which devices are currently signed in', desc: 'Pair with [bootstrap-session-activity-timeline](/ui-snippets/bootstrap-session-activity-timeline/) for a complete account-security section covering both active sessions and step-up confirmation.' },
      { icon: 'FORM', title: 'Changing an email address, password, or payment method', desc: 'Sensitive account changes commonly require a step-up confirmation even within an already-authenticated session.' },
      { icon: 'DASH', title: 'Admin panels performing high-privilege actions', desc: 'Require re-confirmation before an admin action affecting other users\' data or access.' },
    ],
    faqs: [
      { q: 'How is this different from a session expiry warning?', a: 'A session expiry warning (see bootstrap-session-expiry-warning) is about time — it fires after a period of inactivity regardless of what the user is doing. This modal fires in response to a specific action, checking identity again right before something consequential happens, independent of how long the session has been active.' },
      { q: 'Does the field really validate a password, or just simulate it?', a: 'This demo compares against a fixed, visible demo password ("demo1234") for illustration; a real implementation should send the entered password to a real authentication endpoint and treat the modal\'s success state as driven by that server response, not a client-side string comparison.' },
      { q: 'Why does the error clear on typing instead of only on the next failed submit?', a: 'Leaving a red error visible while someone is actively correcting their input misrepresents the current state of the form — clearing it immediately on input reflects that the previous failed attempt no longer describes what\'s currently in the field.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track the password value and an error boolean in component state, reset both inside a modal-shown callback (or effect keyed to the modal\'s open state), and call your real authentication check from the same confirm handler.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a maximum-attempts lockout (e.g. after 3 wrong passwords, disable the form for 30 seconds) to slow down brute-force guessing, or to support re-authenticating via a one-time code sent to email instead of only a password.`,
      prompt: `Build a Bootstrap 5.3 re-authentication confirmation modal for a destructive action, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A "Delete account" button that opens a Bootstrap modal via data-bs-toggle="modal", asking the user to re-enter their password before the action proceeds.
- Every time the modal opens (via Bootstrap's shown.bs.modal event), reset the password field to empty, clear any previous error state, and focus the input.
- On an incorrect password, show a clear inline error and mark the field invalid; the error and invalid styling must clear immediately once the user starts typing again, not only after another failed submit.
- Support both clicking a "Confirm" button and pressing Enter in the password field to trigger the same verification logic.
- On a correct password, close the modal and show a status message confirming the action completed.`,
    },
  },
};

export default bootstrapReauthenticationModal;
