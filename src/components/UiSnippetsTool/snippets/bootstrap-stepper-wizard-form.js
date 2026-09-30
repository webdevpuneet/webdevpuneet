const bootstrapStepperWizardForm = {
  id: 'bootstrap-stepper-wizard-form',
  title: 'Bootstrap Stepper Wizard Form',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bssw-card">
    <div class="card-body p-4">

      <ul class="nav nav-pills nav-fill mb-4" id="bsswNav">
        <li class="nav-item"><span class="nav-link active" id="bsswNav1">1. Account</span></li>
        <li class="nav-item"><span class="nav-link" id="bsswNav2">2. Profile</span></li>
        <li class="nav-item"><span class="nav-link" id="bsswNav3">3. Review</span></li>
      </ul>
      <div class="progress mb-4" style="height:4px;">
        <div class="progress-bar" id="bsswProgress" style="width:33%"></div>
      </div>

      <div class="bssw-step" id="bsswStep1">
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" class="form-control" id="bsswEmail" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" class="form-control" id="bsswPassword" minlength="6" required>
        </div>
      </div>

      <div class="bssw-step d-none" id="bsswStep2">
        <div class="mb-3">
          <label class="form-label">Full name</label>
          <input type="text" class="form-control" id="bsswName" required>
        </div>
        <div class="mb-3">
          <label class="form-label">Company</label>
          <input type="text" class="form-control" id="bsswCompany">
        </div>
      </div>

      <div class="bssw-step d-none" id="bsswStep3">
        <h6 class="fw-bold mb-3">Review your details</h6>
        <dl class="row small mb-0">
          <dt class="col-4">Email</dt><dd class="col-8" id="bsswReviewEmail"></dd>
          <dt class="col-4">Full name</dt><dd class="col-8" id="bsswReviewName"></dd>
          <dt class="col-4">Company</dt><dd class="col-8" id="bsswReviewCompany"></dd>
        </dl>
      </div>

      <div class="alert alert-success d-none" id="bsswSuccess">Account created successfully!</div>

      <div class="d-flex justify-content-between mt-4">
        <button type="button" class="btn btn-outline-secondary" id="bsswBack" disabled>Back</button>
        <button type="button" class="btn btn-primary" id="bsswNext" disabled>Next</button>
        <button type="button" class="btn btn-success d-none" id="bsswSubmit">Submit</button>
      </div>

    </div>
  </div>
</div>`,
  css: `.bssw-card { width: 460px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsswNav .nav-link { cursor: default; pointer-events: none; }`,
  js: `let currentStep = 1;
const totalSteps = 3;

const data = { email: '', password: '', name: '', company: '' };

const navs = [null, document.getElementById('bsswNav1'), document.getElementById('bsswNav2'), document.getElementById('bsswNav3')];
const steps = [null, document.getElementById('bsswStep1'), document.getElementById('bsswStep2'), document.getElementById('bsswStep3')];
const progress = document.getElementById('bsswProgress');
const backBtn = document.getElementById('bsswBack');
const nextBtn = document.getElementById('bsswNext');
const submitBtn = document.getElementById('bsswSubmit');
const success = document.getElementById('bsswSuccess');

const emailInput = document.getElementById('bsswEmail');
const passwordInput = document.getElementById('bsswPassword');
const nameInput = document.getElementById('bsswName');
const companyInput = document.getElementById('bsswCompany');

function isStepValid(step) {
  if (step === 1) return emailInput.value.includes('@') && passwordInput.value.length >= 6;
  if (step === 2) return nameInput.value.trim().length > 0;
  return true;
}

function refreshNextState() {
  nextBtn.disabled = !isStepValid(currentStep);
}

function showStep(step) {
  steps.forEach((el, i) => { if (el) el.classList.toggle('d-none', i !== step); });
  navs.forEach((el, i) => { if (el) el.classList.toggle('active', i === step); });
  progress.style.width = Math.round((step / totalSteps) * 100) + '%';
  backBtn.disabled = step === 1;

  if (step === totalSteps) {
    nextBtn.classList.add('d-none');
    submitBtn.classList.remove('d-none');
    document.getElementById('bsswReviewEmail').textContent = data.email;
    document.getElementById('bsswReviewName').textContent = data.name;
    document.getElementById('bsswReviewCompany').textContent = data.company || '—';
  } else {
    nextBtn.classList.remove('d-none');
    submitBtn.classList.add('d-none');
    refreshNextState();
  }
}

[emailInput, passwordInput, nameInput, companyInput].forEach(input => {
  input.addEventListener('input', refreshNextState);
});

nextBtn.addEventListener('click', () => {
  if (!isStepValid(currentStep)) return;

  // Persist entered values into the data object before moving on, so Back
  // never loses what the user already typed on an earlier step.
  data.email = emailInput.value;
  data.password = passwordInput.value;
  data.name = nameInput.value;
  data.company = companyInput.value;

  if (currentStep < totalSteps) {
    currentStep += 1;
    showStep(currentStep);
  }
});

backBtn.addEventListener('click', () => {
  if (currentStep > 1) {
    currentStep -= 1;
    showStep(currentStep);
  }
});

submitBtn.addEventListener('click', () => {
  success.classList.remove('d-none');
  submitBtn.disabled = true;
  backBtn.disabled = true;
});

showStep(1);
refreshNextState();`,

  seo: {
    title: 'Bootstrap Stepper Wizard Form — Free HTML CSS JS Snippet',
    description: `A real Bootstrap 5.3 multi-step signup wizard with nav-pills and progress-bar step indicators, per-step validation, and a review step. Exports to React & Vue.`,
    about: {
      title: 'Bootstrap Stepper Wizard Form — HTML, CSS & JavaScript',
      description: `A multi-step form only feels trustworthy if two things are true: the Next button genuinely can't be clicked with invalid data, and going Back never throws away what was already typed. This snippet builds both guarantees directly into a small \`data\` object that mirrors the form fields. Real Bootstrap \`nav nav-pills nav-fill\` items plus a Bootstrap \`progress\` bar serve as the step indicator — \`showStep()\` toggles which pill carries the \`active\` class and recalculates the progress bar's \`width\` as a percentage of \`currentStep / totalSteps\`, so the visual progress and the actual step are always driven by one number instead of being updated in two disconnected places.\n\nValidation lives in \`isStepValid(step)\`, a small function checked before every Next click: step 1 requires the email field to contain an "@" and the password to be at least six characters, step 2 requires a non-empty trimmed name, and step 3 (the review step) has nothing left to validate. The Next button's \`disabled\` state is recalculated on every \`input\` event across all four fields via \`refreshNextState()\`, so the button flips enabled the instant the current step's requirements are met — not just when the user clicks it and finds out it was blocked.\n\nThe Back-preserves-values requirement is handled by writing every field into the \`data\` object immediately before advancing, inside the Next handler — not only at final submit time. That ordering matters: if the values were only captured at the end, going Back and then Forward again could show stale inputs, since the actual \`<input>\` elements are never cleared or swapped, only hidden with \`d-none\`. Because the same DOM inputs persist across steps and are never re-rendered, whatever the user typed is still sitting in \`emailInput.value\` and friends whether or not \`data\` has been synced from them yet.\n\nThe review step (step 3) is generated by reading straight from the \`data\` object into three \`<dd>\` elements right before it's shown, including a fallback em dash for the optional Company field when it's left blank (\`data.company || '—'\`) so the review never displays an awkward empty cell. On the final step, \`showStep()\` also swaps the Next button for a distinct Submit button by toggling \`d-none\` on each rather than relabeling one button, which avoids a subtle bug where a relabeled button's stale click listener still runs "advance step" logic instead of "submit" logic. Clicking Submit reveals a real Bootstrap \`alert-success\` box and disables both remaining buttons so the completed wizard can't be resubmitted or navigated backward out of its finished state.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Step 1 (Account) is shown with the first nav pill active and a thin progress bar at roughly 33%, Next disabled and Back disabled.' },
        { title: 'Type a valid email and a 6+ character password', text: 'The Next button becomes enabled the moment both fields meet the requirement, with no need to click elsewhere first.' },
        { title: 'Click Next', text: 'Step 2 (Profile) appears, the second nav pill goes active, and the progress bar advances to roughly 66%.' },
        { title: 'Click Back after entering a name', text: 'Step 1 reappears with the email and password you typed still filled in exactly as you left them.' },
        { title: 'Reach the Review step and click Submit', text: 'A green "Account created successfully!" alert appears and both the Back and Submit buttons become disabled.' },
      ],
    },
    features: [
      'Real Bootstrap nav-pills and progress bar driven by a single currentStep value',
      'Genuine per-step validation blocking Next until required fields are actually valid',
      'Next button state recalculated live on every input event, not just on click',
      'Values persisted to a data object before each step change so Back never loses input',
      'Auto-generated review step reading directly from the persisted data object',
      'Distinct Next and Submit buttons swapped via d-none rather than relabeling one button',
      'Optional field fallback display ("—") when left blank on the review step',
      'Submit disables further navigation to prevent duplicate submission',
    ],
    useCases: [
      { icon: 'FORM', title: 'Account signup and onboarding flows', desc: `A classic multi-step signup wizard, often followed by a [2FA verification step](/ui-snippets/bootstrap-2fa-verification-form/) once the account is created.` },
      { icon: 'CART', title: 'Checkout and shipping forms', desc: `Break a long checkout form into shipping, payment, and review steps, with a [countdown timer banner](/ui-snippets/bootstrap-countdown-timer-banner/) above the wizard reminding shoppers of a limited-time discount.` },
      { icon: 'FLOW', title: 'Application and survey forms', desc: `Multi-page job applications or long surveys where users need to review answers, similar in structure to a [comment section](/ui-snippets/bootstrap-comment-section-replies/) that confirms input before posting.` },
      { icon: 'LEARN', title: 'Learning wizard state management', desc: 'A clear pattern for separating step navigation, per-step validation, and data persistence into distinct, testable functions.' },
      { icon: 'APP', title: 'Configuration and setup wizards', desc: 'Guide a user through multi-step app or device setup, with a final review screen before the configuration is applied.' },
    ],
    faqs: [
      { q: 'Does clicking Back actually lose any typed data?', a: 'No — the underlying input elements are only hidden with the d-none class, never removed or reset, so whatever text was typed remains in the DOM and reappears exactly as left when that step is shown again.' },
      { q: 'How does the Next button know when a step is valid?', a: 'isStepValid(step) checks the specific requirements for that step (a valid-looking email and a 6+ character password on step 1, a non-empty name on step 2) and refreshNextState() re-runs that check on every input event to keep the button\'s disabled state current.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes — replace currentStep and the data object with component state (React useState, Vue ref/reactive, Angular class fields), render each step conditionally instead of toggling d-none, and keep isStepValid() as a pure function called from each render.' },
      { q: 'What happens if I click Submit twice?', a: 'It cannot happen — the Submit button click handler disables itself (and the Back button) immediately after showing the success alert, so a second click has no button to act on.' },
      { q: 'Is the email or password actually sent anywhere?', a: 'No, this is a front-end-only demo — the data object holds the values in memory for the review step and success message; wire the Submit handler to a real fetch or form POST for production use.' },
      { q: 'How would I add a fourth step?', a: 'Add a new .bssw-step element and a matching nav pill, increase totalSteps, extend isStepValid() with a case for the new step number, and extend the data object and review markup if the new step collects fields that should appear in the review.' },
      { q: 'Does this work well if I rebuild it in Tailwind CSS?', a: 'Yes — replace the nav-pills, progress, card, and btn classes with Tailwind utility equivalents for pill navigation, a progress bar, and buttons; none of the step logic, validation, or data persistence in the JavaScript depends on Bootstrap and needs no changes.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to add per-field inline error messages instead of just disabling Next, or to persist wizard progress to sessionStorage so a page refresh doesn't lose it. It's also worth asking it to animate the transition between steps with a fade or slide.`,
      prompt: `Build a Bootstrap 5.3 multi-step stepper wizard form using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- Three steps (Account, Profile, Review) with a real Bootstrap nav-pills row and a progress bar as step indicators, both driven by a single current-step number.
- Each step's Next button must be genuinely disabled until that step's required fields pass real validation (not just decorative), and must re-enable live as the user types, not only after a click.
- Clicking Back must preserve every previously entered value exactly, achieved by never destroying the underlying input elements, only hiding non-active steps.
- The final step must be an auto-generated review screen reading from the same data the earlier steps collected, with a fallback display for any optional blank field.
- A distinct Submit button (not the same button relabeled) must appear only on the review step, and clicking it must show a success message and disable further navigation.`,
    },
  },
};

export default bootstrapStepperWizardForm;
