const stepValidationGatedWizardModal = {
  id: 'step-validation-gated-wizard-modal',
  title: 'Multi-Step Wizard Modal with Per-Step Validation Gating',
  lastmod: '2026-08-27',
  category: 'modals',
  html: `<div class="demo">
  <button class="trigger" id="openBtn">Create project</button>

  <div class="overlay" id="overlay">
    <div class="wizard" role="dialog" aria-modal="true" aria-labelledby="wizTitle">
      <div class="wiz-head">
        <h2 id="wizTitle">Create project</h2>
        <button class="close-btn" id="closeBtn" aria-label="Close">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
        </button>
      </div>

      <div class="wiz-steps">
        <div class="step-dot done" data-step="1"><span>1</span></div>
        <div class="step-line"></div>
        <div class="step-dot" data-step="2"><span>2</span></div>
        <div class="step-line"></div>
        <div class="step-dot" data-step="3"><span>3</span></div>
      </div>

      <div class="wiz-body">
        <div class="wiz-panel" data-panel="1">
          <label class="wiz-field">
            <span>Project name</span>
            <input type="text" id="projName" placeholder="e.g. Marketing site redesign" required minlength="3" />
            <small class="wiz-err" id="err1"></small>
          </label>
        </div>

        <div class="wiz-panel" data-panel="2" hidden>
          <label class="wiz-field">
            <span>Team members (comma-separated emails)</span>
            <input type="text" id="projMembers" placeholder="alex@co.com, sam@co.com" required />
            <small class="wiz-err" id="err2"></small>
          </label>
        </div>

        <div class="wiz-panel" data-panel="3" hidden>
          <div class="wiz-summary" id="wizSummary"></div>
        </div>
      </div>

      <div class="wiz-actions">
        <button class="btn ghost" id="backBtn" hidden>Back</button>
        <button class="btn primary" id="nextBtn">Next</button>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.trigger { background: #4f46e5; color: #fff; border: none; padding: 10px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.trigger:hover { background: #4338ca; }

.overlay { position: fixed; inset: 0; background: rgba(15,23,42,0.5); display: none; align-items: center; justify-content: center; z-index: 50; }
.overlay.open { display: flex; }

.wizard { width: 380px; max-width: calc(100vw - 40px); background: #fff; border-radius: 18px; padding: 24px; box-shadow: 0 24px 60px rgba(15,23,42,0.3); }

.wiz-head { display: flex; align-items: center; justify-content: space-between; margin-bottom: 18px; }
.wiz-head h2 { font-size: 15.5px; font-weight: 800; color: #111827; }
.close-btn { background: #f1f5f9; border: none; width: 28px; height: 28px; border-radius: 8px; color: #64748b; cursor: pointer; display: flex; align-items: center; justify-content: center; }
.close-btn:hover { background: #e2e8f0; }

.wiz-steps { display: flex; align-items: center; margin-bottom: 22px; }
.step-dot { width: 26px; height: 26px; border-radius: 50%; background: #f1f5f9; color: #94a3b8; display: flex; align-items: center; justify-content: center; font-size: 11.5px; font-weight: 800; flex-shrink: 0; transition: background 0.2s, color 0.2s; }
.step-dot.active { background: #6366f1; color: #fff; }
.step-dot.done { background: #4f46e5; color: #fff; }
.step-line { flex: 1; height: 2px; background: #f1f5f9; margin: 0 4px; }

.wiz-field { display: flex; flex-direction: column; gap: 6px; }
.wiz-field span { font-size: 12.5px; font-weight: 600; color: #374151; }
.wiz-field input { padding: 10px 12px; border: 1.5px solid #e2e8f0; border-radius: 9px; font-size: 13px; font-family: inherit; }
.wiz-field input:focus-visible { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
.wiz-field input.invalid { border-color: #ef4444; }
.wiz-err { font-size: 11px; color: #dc2626; font-weight: 600; min-height: 14px; }

.wiz-summary { display: flex; flex-direction: column; gap: 10px; background: #f8fafc; border-radius: 10px; padding: 14px; font-size: 12.5px; }
.wiz-summary div { display: flex; justify-content: space-between; gap: 12px; }
.wiz-summary strong { color: #111827; }
.wiz-summary span:first-child { color: #64748b; font-weight: 600; }

.wiz-actions { display: flex; gap: 10px; margin-top: 20px; }
.btn { flex: 1; border: none; padding: 11px; border-radius: 10px; font-size: 13px; font-weight: 700; cursor: pointer; font-family: inherit; }
.btn.ghost { background: #f1f5f9; color: #334155; }
.btn.ghost:hover { background: #e2e8f0; }
.btn.primary { background: #4f46e5; color: #fff; }
.btn.primary:hover { background: #4338ca; }`,
  js: `const openBtn = document.getElementById('openBtn');
const closeBtn = document.getElementById('closeBtn');
const overlay = document.getElementById('overlay');
const backBtn = document.getElementById('backBtn');
const nextBtn = document.getElementById('nextBtn');
const wizSummary = document.getElementById('wizSummary');

const projName = document.getElementById('projName');
const projMembers = document.getElementById('projMembers');
const err1 = document.getElementById('err1');
const err2 = document.getElementById('err2');

const TOTAL_STEPS = 3;
let currentStep = 1;

function validateStep(step) {
  if (step === 1) {
    const value = projName.value.trim();
    const valid = value.length >= 3;
    projName.classList.toggle('invalid', !valid);
    err1.textContent = valid ? '' : 'Project name must be at least 3 characters.';
    return valid;
  }
  if (step === 2) {
    const emails = projMembers.value.split(',').map((s) => s.trim()).filter(Boolean);
    const emailRe = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    const valid = emails.length > 0 && emails.every((e) => emailRe.test(e));
    projMembers.classList.toggle('invalid', !valid);
    err2.textContent = valid ? '' : 'Enter at least one valid, comma-separated email.';
    return valid;
  }
  return true;
}

function renderStepIndicators() {
  document.querySelectorAll('.step-dot').forEach((dot) => {
    const step = Number(dot.dataset.step);
    dot.classList.toggle('done', step < currentStep);
    dot.classList.toggle('active', step === currentStep);
  });
}

function showStep(step) {
  document.querySelectorAll('.wiz-panel').forEach((panel) => {
    panel.hidden = Number(panel.dataset.panel) !== step;
  });
  backBtn.hidden = step === 1;
  nextBtn.textContent = step === TOTAL_STEPS ? 'Create project' : 'Next';
  renderStepIndicators();

  if (step === 3) {
    const emails = projMembers.value.split(',').map((s) => s.trim()).filter(Boolean);
    wizSummary.innerHTML = \`
      <div><span>Project name</span><strong>\${projName.value.trim()}</strong></div>
      <div><span>Members</span><strong>\${emails.length} invited</strong></div>
    \`;
  }
}

function openWizard() {
  currentStep = 1;
  projName.value = '';
  projMembers.value = '';
  err1.textContent = '';
  err2.textContent = '';
  projName.classList.remove('invalid');
  projMembers.classList.remove('invalid');
  showStep(1);
  overlay.classList.add('open');
  projName.focus();
}

function closeWizard() {
  overlay.classList.remove('open');
}

nextBtn.addEventListener('click', () => {
  if (currentStep < TOTAL_STEPS) {
    if (!validateStep(currentStep)) return; // block advancing until this step is valid
    currentStep += 1;
    showStep(currentStep);
  } else {
    if (!validateStep(1) || !validateStep(2)) return; // final safety re-check before "creating"
    nextBtn.textContent = 'Created ✓';
    setTimeout(closeWizard, 800);
  }
});

backBtn.addEventListener('click', () => {
  currentStep = Math.max(1, currentStep - 1);
  showStep(currentStep);
});

openBtn.addEventListener('click', openWizard);
closeBtn.addEventListener('click', closeWizard);
overlay.addEventListener('click', (e) => { if (e.target === overlay) closeWizard(); });
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && overlay.classList.contains('open')) closeWizard();
});`,
  seo: {
    title: 'Multi-Step Wizard Modal with Per-Step Validation Gating — Real Blocking Logic',
    description: 'A three-step wizard inside a modal dialog where Next is genuinely blocked until the current step\'s fields pass validation, with a live step-progress indicator and a final review summary.',
    about: {
      title: 'Wizard Modal with Real Per-Step Validation Gating',
      description: `Many "wizard" UIs let a user click Next regardless of whether the current step's fields are actually valid, only surfacing errors at the very end (or worse, silently accepting bad data). This modal genuinely **blocks progression** — \`nextBtn\`'s click handler calls \`validateStep(currentStep)\` and returns immediately without advancing if it fails, so a user physically cannot reach step 2 with an invalid project name, or step 3 with no valid team member emails.

**Each step has its own validation function, not one shared rule**

\`validateStep(step)\` branches by step number because step 1 (a project name) and step 2 (a comma-separated email list) need genuinely different validation logic — a length check versus parsing and regex-testing each comma-separated entry. Rather than trying to force both into one generic "is this field valid" helper, each step's specific rule lives in its own branch, making it easy to see and modify exactly what step 2 requires without touching step 1's logic at all.

**Step 2's validation has to parse a compound field correctly**

\`projMembers.value.split(',').map((s) => s.trim()).filter(Boolean)\` turns a raw "alex@co.com, sam@co.com" string into a clean array of individual emails — trimming whitespace around each one and dropping empty entries (which would otherwise appear from a trailing comma or double comma). Only once split cleanly does \`.every((e) => emailRe.test(e))\` check that *every* resulting email is well-formed — a naive regex test against the raw, unsplit string would either be far too permissive or reject perfectly valid multi-email input outright.

**The step indicator reflects three genuinely distinct states**

Each \`.step-dot\` can be \`done\` (a step already passed, index less than \`currentStep\`), \`active\` (the step currently being shown), or neither (not yet reached) — computed fresh in \`renderStepIndicators()\` on every step change by comparing each dot's own step number against \`currentStep\`, rather than manually toggling classes on specific dots by hand as the wizard advances, which would be easy to get out of sync after a Back navigation.

**A final re-validation before "creating," not just trusting earlier passes**

When \`nextBtn\` is clicked on the last step, the handler re-runs \`validateStep(1)\` and \`validateStep(2)\` one more time before treating the wizard as complete — a defensive re-check in case a user somehow navigated back and altered an earlier field into an invalid state that the step-by-step gating didn't catch a second time, ensuring the wizard never reports success with genuinely invalid underlying data.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click "Create project" to open the wizard', text: 'The modal opens on step 1, resetting all fields and errors from any previous run.' },
        { title: 'Try clicking Next with an invalid field', text: 'Notice Next does not advance — the specific validation error appears beneath the invalid field instead.' },
        { title: 'Fix the field and click Next again', text: 'Once valid, the wizard genuinely advances to the next step, and the passed step\'s dot marks as done.' },
        { title: 'Add more steps', text: 'Add a new .wiz-panel with a matching data-panel number, a step dot in .wiz-steps, and a new branch in validateStep() for that step\'s rules.' },
        { title: 'Wire the final submission to your API', text: 'Replace the setTimeout(closeWizard, 800) placeholder with a real API call once the final step\'s re-validation passes.' },
      ],
    },
    features: [
      'Next button is genuinely blocked by validateStep() — no way to advance past an invalid step, not just a visual warning',
      'Per-step validation logic kept in separate branches, each tailored to that step\'s actual field requirements',
      'Compound field parsing (comma-separated emails) correctly trims and filters before validating each entry individually',
      'Step indicator computes done/active/pending state fresh from currentStep on every render, never manually toggled by hand',
      'Final-step click re-validates all prior steps defensively before treating the wizard as complete',
      'role="dialog" aria-modal with Escape-to-close and click-outside-to-close',
      'Wizard state (fields, errors, current step) fully resets every time the modal is reopened',
      'Live review summary on the final step reflects the actual entered values, not placeholder text',
    ],
    useCases: [
      { icon: 'SAAS', title: 'Project/Resource Creation Flows', desc: 'A multi-field creation flow (name, team, settings) that shouldn\'t let a user skip required info at any step.' },
      { icon: 'ONBOARD', title: 'Account Onboarding Wizards', desc: 'Gate progression through onboarding steps until each step\'s required fields are genuinely valid.' },
      { icon: 'FORM', title: 'Complex Multi-Section Forms', desc: 'Break a long form into digestible steps without risking incomplete data reaching a later step.' },
      { icon: 'ADMIN', title: 'Admin Setup Wizards', desc: 'Guide an admin through required configuration steps (integrations, permissions, billing) with real gating.' },
    ],
    faqs: [
      { q: 'What actually happens when I click Next on an invalid step?', a: 'The click handler calls validateStep(currentStep), which returns false for an invalid step and causes the handler to return immediately without incrementing currentStep or calling showStep() — so the wizard visibly does not move forward, and the specific error message appears beneath the invalid field.' },
      { q: 'Why does each step have its own validation branch instead of one generic rule?', a: 'Step 1 (a name field) and step 2 (a comma-separated email list) require fundamentally different validation logic — a simple length check versus parsing and testing multiple entries. Keeping each step\'s rule in its own clearly-labeled branch keeps the logic readable and easy to modify independently.' },
      { q: 'How is the comma-separated email field validated correctly?', a: 'The raw string is first split on commas, then each resulting piece is trimmed of whitespace and empty entries are filtered out, before every remaining piece is tested individually against an email regex — this correctly handles trailing commas, extra spaces, and multiple emails without over- or under-validating.' },
      { q: 'Can a user reach the final step with invalid data by navigating back and forth?', a: 'No — even though per-step gating already prevents advancing past an invalid step, the final "Create project" click additionally re-runs validateStep(1) and validateStep(2) one more time as a defensive safety check before treating the wizard as successfully complete.' },
      { q: 'Does the wizard remember field values if I click Back?', a: 'Yes — clicking Back only changes which panel is shown (showStep()); it does not clear any input values, so returning to an earlier step shows exactly what was previously entered there.' },
      { q: 'Does reopening the wizard reset it back to step 1?', a: 'Yes — openWizard() explicitly resets currentStep to 1, clears both input fields and their error messages, and removes any invalid styling before showing the modal, so every fresh open starts from a clean state regardless of where a previous session left off.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why the final step re-validates all prior steps defensively even though per-step gating already prevented invalid data from being entered in the first place, and what specific scenario (e.g. back-navigation plus manual field editing) that extra check is guarding against. It's also worth asking for a version that persists partially-completed wizard state to sessionStorage so it survives an accidental page reload, or one that supports conditionally skipping a step based on an earlier step's answer.`,
      prompt: `Build a multi-step wizard inside a modal dialog in HTML, CSS and vanilla JavaScript where progression between steps is genuinely gated by real validation — no external libraries.

Requirements:
- A modal (role="dialog", aria-modal, Escape and click-outside to close) containing at least three steps: a text input step, a compound comma-separated-list input step (e.g. team member emails), and a final read-only review/summary step showing the actual entered values.
- A visual step-progress indicator (e.g. numbered dots connected by lines) that reflects three distinct states per step — completed, currently active, and not yet reached — computed fresh from the current step number rather than manually toggled.
- Clicking "Next" must call a real validation function for the current step and must NOT advance to the next step if that step's fields are invalid; instead, show a specific inline error message next to the invalid field.
- The compound list-input step must correctly parse its comma-separated value (trimming whitespace, dropping empty entries) before validating each individual item, not just pattern-matching the whole raw string at once.
- On the final step, re-validate all previous steps' data one more time before treating the wizard as successfully complete, as a defensive check against a user having navigated back and altered earlier data.
- Fully reset all field values, error messages, and the current step back to the first step every time the modal is reopened.`,
    },
  },
};

export default stepValidationGatedWizardModal;
