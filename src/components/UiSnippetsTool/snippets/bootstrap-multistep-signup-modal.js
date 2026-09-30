const bootstrapMultistepSignupModal = {
  id: 'bootstrap-multistep-signup-modal',
  title: 'Bootstrap Multi-Step Signup Modal',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="bssignup-stage">
  <button class="btn btn-primary btn-lg fw-bold" type="button" data-bs-toggle="modal" data-bs-target="#bssignupModal">Create your account</button>
</div>

<div class="modal fade" id="bssignupModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bssignup-modal">
      <div class="modal-header border-0 pb-0">
        <div class="bssignup-progress w-100">
          <div class="bssignup-progress-bar" id="bssignupBar"></div>
        </div>
        <button type="button" class="btn-close ms-2" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body px-4 pb-4 pt-2">

        <div class="bssignup-step" data-step="1">
          <h5 class="fw-bold mb-1">Create your account</h5>
          <p class="text-muted small mb-3">Step 1 of 3 — your details</p>
          <div class="mb-3">
            <label class="form-label small fw-semibold">Full name</label>
            <input type="text" class="form-control" id="bssignupName" placeholder="Ada Lovelace">
          </div>
          <div class="mb-1">
            <label class="form-label small fw-semibold">Work email</label>
            <input type="email" class="form-control" id="bssignupEmail" placeholder="you@company.com">
          </div>
        </div>

        <div class="bssignup-step d-none" data-step="2">
          <h5 class="fw-bold mb-1">Choose a plan</h5>
          <p class="text-muted small mb-3">Step 2 of 3 — pick what fits</p>
          <div class="bssignup-plans" id="bssignupPlans">
            <label class="bssignup-plan">
              <input type="radio" name="bssignupPlan" value="Starter" checked>
              <span><strong>Starter</strong><br><span class="text-muted small">$0/mo</span></span>
            </label>
            <label class="bssignup-plan">
              <input type="radio" name="bssignupPlan" value="Pro">
              <span><strong>Pro</strong><br><span class="text-muted small">$24/mo</span></span>
            </label>
            <label class="bssignup-plan">
              <input type="radio" name="bssignupPlan" value="Team">
              <span><strong>Team</strong><br><span class="text-muted small">$79/mo</span></span>
            </label>
          </div>
        </div>

        <div class="bssignup-step d-none" data-step="3">
          <h5 class="fw-bold mb-1">You're all set</h5>
          <p class="text-muted small mb-3">Step 3 of 3 — confirm and finish</p>
          <div class="bssignup-summary">
            <div class="d-flex justify-content-between py-2 border-bottom"><span class="text-muted small">Name</span><strong class="small" id="bssignupSumName">—</strong></div>
            <div class="d-flex justify-content-between py-2 border-bottom"><span class="text-muted small">Email</span><strong class="small" id="bssignupSumEmail">—</strong></div>
            <div class="d-flex justify-content-between py-2"><span class="text-muted small">Plan</span><strong class="small" id="bssignupSumPlan">—</strong></div>
          </div>
        </div>

        <div class="d-flex justify-content-between mt-4">
          <button type="button" class="btn btn-outline-secondary" id="bssignupBack">Back</button>
          <button type="button" class="btn btn-primary fw-bold" id="bssignupNext">Continue</button>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `.bssignup-stage {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f7f9;
}

.bssignup-modal { border: none; border-radius: 16px; overflow: hidden; }

.bssignup-progress {
  height: 5px;
  background: #eceef1;
  border-radius: 20px;
  overflow: hidden;
}
.bssignup-progress-bar {
  height: 100%;
  width: 33.33%;
  background: #6366f1;
  border-radius: 20px;
  transition: width .25s ease;
}

.bssignup-step { animation: bssignupIn .2s ease; }
@keyframes bssignupIn { from { opacity: 0; transform: translateX(8px); } to { opacity: 1; transform: none; } }

.bssignup-plans { display: flex; flex-direction: column; gap: 10px; }
.bssignup-plan {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1.5px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  transition: border-color .15s, background .15s;
}
.bssignup-plan input { margin: 0; }
.bssignup-plan:has(input:checked) { border-color: #6366f1; background: #eef0ff; }

.bssignup-summary { background: #f8fafc; border-radius: 10px; padding: 4px 14px; }

#bssignupBack:disabled { visibility: hidden; }`,
  js: `const bar = document.getElementById('bssignupBar');
const steps = document.querySelectorAll('.bssignup-step');
const backBtn = document.getElementById('bssignupBack');
const nextBtn = document.getElementById('bssignupNext');
const nameInput = document.getElementById('bssignupName');
const emailInput = document.getElementById('bssignupEmail');

let current = 1;
const TOTAL = 3;

function showStep(n) {
  steps.forEach(el => el.classList.toggle('d-none', Number(el.dataset.step) !== n));
  bar.style.width = (n / TOTAL * 100) + '%';
  backBtn.disabled = n === 1;
  nextBtn.textContent = n === TOTAL ? 'Finish' : 'Continue';

  if (n === TOTAL) {
    document.getElementById('bssignupSumName').textContent = nameInput.value || '—';
    document.getElementById('bssignupSumEmail').textContent = emailInput.value || '—';
    const plan = document.querySelector('input[name="bssignupPlan"]:checked');
    document.getElementById('bssignupSumPlan').textContent = plan ? plan.value : '—';
  }
}

nextBtn.addEventListener('click', () => {
  if (current === 1 && (!nameInput.value.trim() || !emailInput.checkValidity())) {
    emailInput.classList.toggle('is-invalid', !emailInput.checkValidity());
    nameInput.classList.toggle('is-invalid', !nameInput.value.trim());
    return;
  }
  if (current === TOTAL) {
    // Final step — close the modal on "Finish". A real app would submit
    // the collected data to an API here before dismissing.
    bootstrap.Modal.getInstance(document.getElementById('bssignupModal'))?.hide();
    return;
  }
  current = Math.min(TOTAL, current + 1);
  showStep(current);
});

backBtn.addEventListener('click', () => {
  current = Math.max(1, current - 1);
  showStep(current);
});

// Reset to step one each time the modal is reopened, so a previous run
// doesn't leave the dialog stuck on step three.
document.getElementById('bssignupModal').addEventListener('hidden.bs.modal', () => {
  current = 1;
  nameInput.value = '';
  emailInput.value = '';
  nameInput.classList.remove('is-invalid');
  emailInput.classList.remove('is-invalid');
  showStep(1);
});

showStep(1);`,

  seo: {
    title: 'Bootstrap Multi-Step Signup Modal — Free Snippet',
    description: 'A real Bootstrap 5.3 modal that walks through a 3-step signup flow — details, plan selection, confirmation — with a working progress bar and back/continue navigation.',
    about: {
      title: 'Bootstrap Multi-Step Signup Modal — HTML, CSS & JavaScript',
      description: `A long signup form crammed into a single modal reads as a wall of fields. Splitting it into steps — details, then plan, then confirmation — makes each screen feel manageable, and this snippet builds that pattern on **real Bootstrap 5.3**: the actual \`.modal\` component, opened and closed by Bootstrap's own JavaScript via \`data-bs-toggle\`/\`data-bs-target\`, with three custom steps and a working progress bar layered on top.

**How step-switching works**

Each step is a \`div.bssignup-step\` with a \`data-step\` attribute. \`showStep(n)\` toggles Bootstrap's \`.d-none\` utility class on every step so only the matching one is visible, and sets the progress bar's width to \`n / 3 * 100%\` with a CSS \`transition\` doing the animating. There's no step-specific markup swapping or re-rendering — the same three \`div\`s stay in the DOM the whole time, which is what keeps the logic this simple.

**Validating before advancing**

Clicking "Continue" on step one checks that the name field isn't empty and the email field passes \`checkValidity()\` before allowing the step change — an incomplete step one just adds Bootstrap's \`.is-invalid\` styling and refuses to advance, rather than silently letting a visitor reach step three with missing information.

**Real Bootstrap Modal API usage**

Finishing the flow calls \`bootstrap.Modal.getInstance(modalEl).hide()\` — the correct, documented way to close a Bootstrap modal from custom JavaScript, rather than manually toggling classes and hoping the backdrop and focus trap clean up correctly. The modal's own \`hidden.bs.modal\` event (fired by Bootstrap itself once the close animation finishes) is used to reset the flow back to step one and clear both fields, so reopening the modal never shows a stale, half-completed signup from the last time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Bootstrap Multi-Step Signup Modal" in the sidebar Library tab. The preview loads a "Create your account" button on an empty page.' },
        { title: 'Open the modal', text: 'Click the button — Bootstrap\'s real Modal component opens with a thin progress bar at a third of the way across.' },
        { title: 'Try continuing without filling in the fields', text: 'Click "Continue" with empty fields — both fields get Bootstrap\'s invalid styling and the step doesn\'t advance.' },
        { title: 'Fill in step one and continue', text: 'Enter a name and a valid email, then click Continue — the progress bar animates to two-thirds and step two (plan selection) slides in.' },
        { title: 'Pick a plan and continue', text: 'Choose a plan card, click Continue — step three shows a summary of everything entered across steps one and two.' },
        { title: 'Click "Finish", then reopen', text: 'The modal closes. Reopen it with the button — it starts fresh at step one, with both fields cleared, since the modal resets itself on close.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 modal component, opened and closed by Bootstrap\'s own JavaScript API',
      'Three-step flow — details, plan selection, confirmation — with a genuine animated progress bar',
      'Step-one validation blocks advancing until a name and a valid email are both provided',
      'Live summary screen on step three, populated from the actual values entered earlier',
      'Modal resets itself to step one and clears its fields on close, via Bootstrap\'s hidden.bs.modal event',
      'Uses bootstrap.Modal.getInstance().hide() — the correct documented API, not manual class toggling',
      'Plan selection cards use :has() to highlight whichever radio is currently checked',
      'Back/Continue navigation with the Back button auto-hiding on the first step',
    ],
    useCases: [
      { icon: 'FORM', title: 'SaaS signup and onboarding flows', desc: 'Breaking signup into details → plan → confirm inside a single modal keeps the whole flow contained to one interaction, without navigating through separate pages.' },
      { icon: 'LEARN', title: 'Learning Bootstrap\'s real Modal JavaScript API', desc: 'See the correct pattern for programmatically closing a Bootstrap modal and reacting to its lifecycle events (hidden.bs.modal), rather than guessing at manual DOM manipulation.' },
      { icon: 'FLOW', title: 'Any multi-step form that benefits from staying in one dialog', desc: 'Reuse the same step-switching and progress-bar pattern for a feedback wizard, a settings setup flow, or any sequence that shouldn\'t require full page navigation.' },
      { icon: 'DESIGN', title: 'Reducing perceived form length', desc: 'The same total number of fields feels far less daunting split across three short steps with visible progress than crammed into one long scrolling form.' },
    ],
    faqs: [
      { q: 'Does this use Bootstrap\'s real modal, or a custom-built dialog?', a: 'Real Bootstrap 5.3 — the modal is opened via data-bs-toggle="modal" and closed via bootstrap.Modal.getInstance(...).hide(), Bootstrap\'s own documented JavaScript component, loaded from the actual CDN.' },
      { q: 'What stops someone from skipping straight to step three?', a: 'The "Continue" button on step one checks that the name field has a value and the email field passes native checkValidity() before allowing the step to change — an incomplete step one blocks progression and shows Bootstrap\'s invalid-field styling.' },
      { q: 'Does closing and reopening the modal keep my progress?', a: 'No, by design — the modal listens for Bootstrap\'s hidden.bs.modal event (fired once the close animation finishes) and resets back to step one with both fields cleared, so every open starts a fresh signup attempt.' },
      { q: 'Can I add a fourth step?', a: 'Yes — add another .bssignup-step div with data-step="4", update the TOTAL constant to 4 in the JavaScript, and add whatever fields or content that step needs. The progress bar and Continue/Finish logic scale automatically.' },
      { q: 'Where does the collected signup data actually go?', a: 'Nowhere outside the page — this is a front-end demo. Replace the "Finish" click handler\'s modal-closing call with a fetch() POST of the collected name, email, and plan to your real signup endpoint before hiding the modal.' },
      { q: 'How does the plan selection highlight the checked option?', a: 'Each .bssignup-plan label uses the CSS :has() selector — .bssignup-plan:has(input:checked) — to style the whole label based on its own radio input\'s checked state, without any JavaScript needed for the visual highlight itself.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire the "Finish" step to a real signup API call with fetch(), showing a loading state on the Finish button and an inline error if the request fails, instead of just closing the modal. It's also a good exercise to ask the assistant to add a fourth step for email verification (a 6-digit code input) or to make each step's validation rules configurable via a small JavaScript object instead of hardcoded per-step checks.`,
      prompt: `Build a Bootstrap 5.3 multi-step signup modal, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A button that opens a real Bootstrap modal via data-bs-toggle/data-bs-target (Bootstrap's own Modal component, not a custom-built dialog).
- Inside the modal, three steps: (1) a name and email input, (2) a set of selectable plan options using radio inputs styled as cards, (3) a read-only summary of the values entered in steps 1 and 2. Only one step should be visible at a time.
- A thin progress bar at the top of the modal that animates its width to reflect the current step out of the total (e.g. 33%, 66%, 100%), using a CSS transition.
- A "Continue"/"Back" button pair; on step one, "Continue" must validate that the name is non-empty and the email is valid (via checkValidity()) before allowing the step to advance, showing Bootstrap's invalid-field styling otherwise. The Back button should be hidden or disabled on the first step. On the final step, the Continue button should read "Finish" and close the modal using Bootstrap's own Modal API (bootstrap.Modal.getInstance(...).hide()), not manual class manipulation.
- The modal must reset itself back to step one and clear its input fields when closed, using Bootstrap's hidden.bs.modal event.`,
    },
  },
};

export default bootstrapMultistepSignupModal;
