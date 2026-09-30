const bootstrapResetPasswordForm = {
  id: 'bootstrap-reset-password-form',
  title: 'Bootstrap Reset Password Form',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsrp-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-1 text-center">Reset your password</h5>
      <p class="text-muted small mb-3 text-center">Choose a new password for your account.</p>

      <label class="form-label small fw-semibold" for="bsrpNew">New password</label>
      <input type="password" class="form-control mb-1" id="bsrpNew" placeholder="Enter new password">
      <div class="progress mb-1 bsrp-progress">
        <div class="progress-bar" id="bsrpBar" role="progressbar" style="width: 0%"></div>
      </div>
      <div class="small mb-3" id="bsrpStrengthLabel">&nbsp;</div>

      <label class="form-label small fw-semibold" for="bsrpConfirm">Confirm password</label>
      <input type="password" class="form-control mb-1" id="bsrpConfirm" placeholder="Re-enter new password">
      <div class="small mb-3" id="bsrpMatchLabel">&nbsp;</div>

      <button class="btn btn-dark w-100 fw-bold" id="bsrpSubmit" disabled>Reset password</button>
      <p class="small text-center mt-3 mb-0" id="bsrpStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bsrp-card { width: 380px; border: 1px solid #eceef1; border-radius: 14px; }
.bsrp-progress { height: 6px; }`,
  js: `const newInput = document.getElementById('bsrpNew');
const confirmInput = document.getElementById('bsrpConfirm');
const bar = document.getElementById('bsrpBar');
const strengthLabel = document.getElementById('bsrpStrengthLabel');
const matchLabel = document.getElementById('bsrpMatchLabel');
const submitBtn = document.getElementById('bsrpSubmit');
const status = document.getElementById('bsrpStatus');

const LEVELS = [
  { pct: 20,  cls: 'bg-danger',  text: 'Very weak' },
  { pct: 40,  cls: 'bg-danger',  text: 'Weak' },
  { pct: 60,  cls: 'bg-warning', text: 'Fair' },
  { pct: 80,  cls: 'bg-info',    text: 'Good' },
  { pct: 100, cls: 'bg-success', text: 'Strong' },
];

// Scores 0-4 by checking four independent character-class rules plus a
// length bonus, then maps the score onto one of five LEVELS entries.
function scorePassword(value) {
  let score = 0;
  if (value.length >= 8) score++;
  if (value.length >= 12) score++;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score++;
  if (/[0-9]/.test(value)) score++;
  if (/[^A-Za-z0-9]/.test(value)) score++;
  return Math.min(score, 4);
}

function updateStrength() {
  const value = newInput.value;
  if (!value) {
    bar.style.width = '0%';
    bar.className = 'progress-bar';
    strengthLabel.textContent = '\\u00a0';
    checkFormValid();
    return;
  }
  const score = scorePassword(value);
  const level = LEVELS[score];
  bar.style.width = level.pct + '%';
  bar.className = 'progress-bar ' + level.cls;
  strengthLabel.textContent = level.text;
  strengthLabel.className = 'small mb-3 ' + level.cls.replace('bg-', 'text-');
  checkFormValid();
}

function updateMatch() {
  const value = confirmInput.value;
  if (!value) {
    matchLabel.textContent = '\\u00a0';
    checkFormValid();
    return;
  }
  const match = value === newInput.value;
  matchLabel.textContent = match ? 'Passwords match.' : 'Passwords do not match.';
  matchLabel.className = 'small mb-3 ' + (match ? 'text-success' : 'text-danger');
  confirmInput.classList.toggle('is-invalid', !match);
  confirmInput.classList.toggle('is-valid', match);
  checkFormValid();
}

function checkFormValid() {
  const strongEnough = scorePassword(newInput.value) >= 2 && newInput.value.length > 0;
  const matches = confirmInput.value.length > 0 && confirmInput.value === newInput.value;
  submitBtn.disabled = !(strongEnough && matches);
}

newInput.addEventListener('input', () => {
  updateStrength();
  if (confirmInput.value) updateMatch();
});
confirmInput.addEventListener('input', updateMatch);

submitBtn.addEventListener('click', () => {
  status.textContent = 'Password reset successfully.';
  status.className = 'small text-center mt-3 mb-0 text-success';
});`,

  seo: {
    title: 'Bootstrap Reset Password Form — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 reset-password form with a live color-coded strength meter and a real-time passwords-match indicator. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Reset Password Form — HTML, CSS & JavaScript',
      description: `The strength meter in this snippet is driven by \`scorePassword()\`, a small function that checks five independent conditions against the typed value — length of at least 8, length of at least 12, both an uppercase and lowercase letter present, a digit present, and a symbol present — incrementing a \`score\` counter for each one true, then clamping the total to a maximum of 4 with \`Math.min(score, 4)\`. That score indexes into a \`LEVELS\` array of five objects, each pairing a percentage width, a real Bootstrap contextual color class (\`bg-danger\`, \`bg-warning\`, \`bg-info\`, \`bg-success\`), and a text label from "Very weak" to "Strong". \`updateStrength()\` applies the matched level's width to a genuine Bootstrap \`.progress-bar\` element's inline \`style.width\` and swaps its class outright (rather than just adding a class, since only one color should ever apply at once), then reuses the same color by stripping the \`bg-\` prefix and substituting \`text-\` for the label underneath, so the label and bar are always visually consistent by construction rather than by two independently-maintained color choices.\n\nThe confirm-password field runs a separate, simpler check in \`updateMatch()\`: on every keystroke it compares \`confirmInput.value\` against \`newInput.value\` directly and toggles Bootstrap's own \`is-valid\`/\`is-invalid\` classes plus a text message, live, as the user types — not just on blur or submit. Because both fields can change independently (editing the new password after already typing a confirmation is a realistic sequence), the \`newInput\` listener also calls \`updateMatch()\` whenever the confirm field already has a value, so correcting the first field immediately re-validates the second rather than leaving a stale "Passwords match" message that is no longer true.\n\nThe Reset password button's disabled state is centralized in one function, \`checkFormValid()\`, called from both input listeners, which requires two independent conditions: the new password must score at least 2 (roughly "Fair" or better) via the same \`scorePassword()\` function, and the confirm field must be non-empty and exactly equal to the new password. Centralizing this logic in one function rather than duplicating the check in each listener is what prevents the classic bug where a weak-but-matching pair of passwords could enable submission just because the match check alone passed.\n\nAn edge case handled explicitly: clearing the new-password field entirely (backspacing everything) resets the bar to 0% width and clears its class back to a bare \`progress-bar\` with no color, rather than leaving a stale colored bar from the last non-empty value — the \`if (!value)\` early return in \`updateStrength()\` exists specifically for that case, and the mirrored check in \`updateMatch()\` similarly blanks the match label instead of showing "do not match" against an empty confirm field.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'A card appears with a new-password field, an empty progress bar beneath it, and a disabled confirm field flow.' },
        { title: 'Type a short lowercase password like "abc"', text: 'The bar fills a small amount in red and the label reads "Very weak" or "Weak".' },
        { title: 'Keep typing to add length, a number, and a symbol', text: 'The bar grows and shifts through orange and blue toward green as the label progresses to "Good" and then "Strong".' },
        { title: 'Type a different value into Confirm password', text: 'A red "Passwords do not match" message appears immediately below it, with a red field outline.' },
        { title: 'Correct the confirm field to match exactly', text: 'The message turns green ("Passwords match.") and the field outlines green, live as you type the last matching character.' },
        { title: 'Watch the Reset password button', text: 'It only becomes enabled once the password is reasonably strong AND both fields match exactly.' },
      ],
    },
    features: [
      'Real Bootstrap .progress/.progress-bar component driving the strength meter, not a custom div',
      'scorePassword() checks five independent rules: length tiers, case mix, digits, and symbols',
      'Strength bar color and text label always derived from the same LEVELS entry, staying in sync',
      'Live passwords-match indicator updating on every keystroke in the confirm field',
      'Editing the password field after typing a confirmation re-validates the match automatically',
      'Bootstrap is-valid/is-invalid classes applied to the confirm field in real time',
      'Centralized checkFormValid() gate requires both sufficient strength and an exact match',
      'Clearing either field resets its indicator instead of showing a stale strength or match state',
    ],
    useCases: [
      { icon: 'FORM', title: 'Password reset and account recovery flows', desc: 'The natural next screen after a [bootstrap-forgot-password-form](/ui-snippets/bootstrap-forgot-password-form/) email confirmation step.' },
      { icon: 'FORM', title: 'Showing per-requirement feedback instead of one strength score', desc: 'See [bootstrap-password-requirements-checklist](/ui-snippets/bootstrap-password-requirements-checklist/) for a checklist variant that names exactly which rule still isn\'t met.' },
      { icon: 'FORM', title: 'Sign-up forms requiring strong passwords', desc: 'The same scorePassword() and progress-bar pattern fits directly into a registration form validating new credentials.' },
      { icon: 'SECURITY', title: 'Security settings and change-password screens', desc: 'Drop this into an account settings page as the "change your password" panel, next to a [bootstrap-2fa-verification-form](/ui-snippets/bootstrap-2fa-verification-form/) for full account security.' },
      { icon: 'LEARN', title: 'Learning live form validation techniques', desc: 'A clear, self-contained example of deriving both a progress bar and a text label from one scoring function.' },
      { icon: 'APP', title: 'Onboarding wizards with a security step', desc: 'Fits as one screen inside a [bootstrap-multistep-signup-modal](/ui-snippets/bootstrap-multistep-signup-modal/) flow that collects account credentials.' },
    ],
    faqs: [
      { q: 'How exactly is password strength calculated?', a: 'scorePassword() checks five conditions — length 8+, length 12+, both uppercase and lowercase letters present, a digit present, and a symbol present — adds one point per condition met, and clamps the result to a 0-4 scale that indexes into five labeled, colored levels from Very weak to Strong.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, move newPassword/confirmPassword into useState and compute the score and match on each render instead of manipulating classList directly; in Vue, use computed properties for score and match driven by v-model refs; in Angular, compute them in the component class from two-way-bound ngModel fields and bind the progress bar width and class with property bindings.' },
      { q: 'Does the match indicator wait until I click submit?', a: 'No — updateMatch() runs on every input event in the confirm field, so the message and Bootstrap is-valid/is-invalid classes update live as you type, and it also re-runs automatically if you go back and edit the new password field after already typing a confirmation.' },
      { q: 'What password strength is required to enable the submit button?', a: 'checkFormValid() requires a scorePassword() result of at least 2 (roughly "Fair" or higher) on the new password, and requires the confirm field to be non-empty and exactly equal to it — both conditions must hold at once.' },
      { q: 'How would I restyle the strength meter with Tailwind?', a: 'Replace the Bootstrap .progress/.progress-bar pair with a Tailwind div using h-1.5 rounded-full bg-gray-200 as the track and an inner div with a dynamic width style plus a Tailwind background color class swapped the same way the bg-danger/bg-warning/bg-success classes are swapped here.' },
      { q: 'Does this check the new password against the account\'s old password?', a: 'No — this is a front-end demo focused on strength scoring and match confirmation. A production reset flow should also verify server-side that the new password differs from recent past passwords before accepting it.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a show/hide password toggle icon inside each field, or to block reuse of a list of common weak passwords. It's also worth asking for an animated width transition on the progress bar as the score changes.`,
      prompt: `Build a Bootstrap 5.3 reset-password form, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A new-password field and a confirm-password field, both Bootstrap form-control password inputs, inside a centered card.
- A real Bootstrap progress/progress-bar element beneath the new-password field that updates live as the user types, both in width and in Bootstrap contextual color (e.g. bg-danger through bg-success), based on a scoring function checking length and character-class variety (uppercase, lowercase, digits, symbols).
- A text label next to the bar (e.g. "Weak", "Good", "Strong") that always matches the bar's current color/level.
- A live "Passwords match" / "Passwords do not match" message beneath the confirm field, updating on every keystroke with Bootstrap is-valid/is-invalid classes applied to the field.
- Editing the new-password field after a confirmation value already exists must immediately re-run the match check rather than leaving a stale result.
- A submit button that stays disabled until the password meets a minimum strength AND the confirm field matches exactly.`,
    },
  },
};

export default bootstrapResetPasswordForm;
