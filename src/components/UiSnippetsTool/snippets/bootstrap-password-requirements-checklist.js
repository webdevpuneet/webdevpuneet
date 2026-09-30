const bootstrapPasswordRequirementsChecklist = {
  id: 'bootstrap-password-requirements-checklist',
  title: 'Bootstrap Password Requirements Checklist',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bspwreq-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Create a password</h5>
      <input type="password" class="form-control mb-3" id="bspwreqInput" placeholder="New password" autocomplete="new-password">

      <ul class="list-unstyled mb-3" id="bspwreqList">
        <li class="bspwreq-item" data-rule="length"><span class="bspwreq-icon">&#9679;</span> At least 8 characters</li>
        <li class="bspwreq-item" data-rule="upper"><span class="bspwreq-icon">&#9679;</span> One uppercase letter</li>
        <li class="bspwreq-item" data-rule="lower"><span class="bspwreq-icon">&#9679;</span> One lowercase letter</li>
        <li class="bspwreq-item" data-rule="number"><span class="bspwreq-icon">&#9679;</span> One number</li>
        <li class="bspwreq-item" data-rule="symbol"><span class="bspwreq-icon">&#9679;</span> One special character</li>
      </ul>

      <p class="small text-muted mb-3" id="bspwreqSummary" aria-live="polite">0 of 5 requirements met</p>

      <button type="button" class="btn btn-dark w-100 fw-bold" id="bspwreqSubmit" disabled>Create account</button>
    </div>
  </div>
</div>`,
  css: `.bspwreq-card { width: 380px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bspwreq-item { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #6b7280; padding: 3px 0; transition: color .12s; }
.bspwreq-icon { font-size: 8px; color: #d1d5db; transition: color .12s; }
.bspwreq-item-met { color: #198754; }
.bspwreq-item-met .bspwreq-icon { color: #198754; }
.bspwreq-item-met .bspwreq-icon::before { content: "\\2713"; font-size: 12px; }`,
  js: `const input = document.getElementById('bspwreqInput');
const items = Array.from(document.querySelectorAll('.bspwreq-item'));
const summary = document.getElementById('bspwreqSummary');
const submitBtn = document.getElementById('bspwreqSubmit');

const RULES = {
  length: v => v.length >= 8,
  upper: v => /[A-Z]/.test(v),
  lower: v => /[a-z]/.test(v),
  number: v => /[0-9]/.test(v),
  symbol: v => /[^A-Za-z0-9]/.test(v),
};

function check() {
  const value = input.value;
  let metCount = 0;

  items.forEach(item => {
    const rule = item.dataset.rule;
    const met = RULES[rule](value);
    item.classList.toggle('bspwreq-item-met', met);
    if (met) metCount++;
  });

  summary.textContent = metCount + ' of ' + items.length + ' requirements met';
  submitBtn.disabled = metCount < items.length;
}

input.addEventListener('input', check);
check();`,

  seo: {
    title: 'Bootstrap Password Requirements Checklist — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 password field with a live per-requirement checklist — five independent rules tick off individually as you type, and the submit button stays disabled until every one passes.',
    about: {
      title: 'Bootstrap Password Requirements Checklist — HTML, CSS & JavaScript',
      description: `A strength meter tells you a password is "Strong"; a checklist tells you exactly *which* requirement still isn't met, which is the more useful answer while someone is actively typing. This snippet keeps that mapping explicit with a \`RULES\` object where each key is a rule name and each value is a small function that tests the current password — \`length\`, \`upper\`, \`lower\`, \`number\`, and \`symbol\` are each independently testable, and \`check()\` runs every one of them fresh on every keystroke rather than trying to incrementally patch a previous result.\n\nEach \`<li>\` carries a \`data-rule\` attribute matching one of those keys, so \`check()\` never has to hardcode "the third item is the number rule" — it reads the rule name directly off the element it's updating. That's what makes reordering the checklist, or adding a sixth requirement, a one-line change to \`RULES\` plus one new \`<li>\`, with zero changes to the loop that drives them.\n\nThe submit button's \`disabled\` state is derived the same way the strikethrough logic elsewhere in this collection is: recomputed from \`metCount < items.length\` on every check, rather than toggled by a separate piece of code that could drift out of sync with what the checklist is actually showing. A password that visually satisfies all five items and a submit button that's actually enabled are, by construction, always describing the same fact.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'All five requirements show as unmet gray dots, and "Create account" is disabled.' },
        { title: 'Type a lowercase word like "password"', text: 'The "8 characters" and "lowercase" items turn green; the rest stay gray.' },
        { title: 'Add an uppercase letter and a number', text: 'Two more items tick off individually as soon as each condition is met.' },
        { title: 'Add a symbol like ! or #', text: 'The final requirement turns green and the summary reads "5 of 5 requirements met".' },
        { title: 'Watch the submit button', text: 'It enables itself the instant all five are satisfied — no separate validation step required.' },
        { title: 'Delete a character', text: 'Any requirement that no longer holds immediately reverts, and the button disables again if needed.' },
      ],
    },
    features: [
      'Five independently testable rules defined once in a single RULES object',
      'Every item re-evaluates from scratch on each keystroke instead of patching stale state',
      'data-rule attributes let the checklist markup and the rule logic stay decoupled',
      'A live aria-live summary text for screen reader users, separate from the per-item visual ticks',
      'The submit button\'s disabled state is derived directly from the same count driving the summary',
      'Adding or changing a requirement is a one-line change to RULES plus one list item',
    ],
    useCases: [
      { icon: 'FORM', title: 'Signup and account creation forms', desc: 'Pairs naturally with [bootstrap-signup-password-strength](/ui-snippets/bootstrap-signup-password-strength/) for a combined percentage-plus-checklist view.' },
      { icon: 'APP', title: 'Password reset and change-password flows', desc: 'Drop directly into [bootstrap-reset-password-form](/ui-snippets/bootstrap-reset-password-form/) wherever a new password needs the exact same rule set enforced.' },
      { icon: 'LEARN', title: 'Learning declarative validation patterns', desc: 'The RULES-object-plus-data-attribute approach here generalizes well beyond passwords to any form of "several independent conditions must all pass".' },
      { icon: 'SETTINGS', title: 'Enterprise or compliance-driven password policies', desc: 'Swap in stricter or additional rules (minimum length, no repeated characters, not on a common-password list) without touching the rendering logic.' },
    ],
    faqs: [
      { q: 'How is this different from a password strength meter?', a: 'A strength meter (see bootstrap-signup-password-strength) collapses everything into one score or label. This checklist keeps every requirement visible and separately answered, which is more actionable while someone is still typing and hasn\'t met every rule yet.' },
      { q: 'Can I add or remove requirements?', a: 'Yes — add a new key and test function to the RULES object, and add a matching <li data-rule="..."> to the list. The check() function loops over whatever items exist in the DOM, so nothing else needs to change.' },
      { q: 'Is the checklist accessible to screen reader users?', a: 'The aria-live="polite" summary announces the running count ("3 of 5 requirements met") as it changes, so a screen reader user gets a spoken progress update even without seeing each item individually tick.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the RULES object as-is, store the password in component state, and derive each item\'s met boolean and the overall submit-disabled flag directly in the render function instead of toggling classList by hand.' },
      { q: 'Should I also validate this on the server?', a: 'Yes, always — client-side checks like this one are for immediate feedback and a better experience, not security. The same five rules should be re-checked server-side before an account is actually created.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a "confirm password" field that also shows a live matching indicator, or to add a check against a small list of common weak passwords ("password123", "qwerty") as a sixth rule inside the same RULES object.`,
      prompt: `Build a Bootstrap 5.3 password requirements checklist, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A password input field and a list of exactly five requirements: at least 8 characters, one uppercase letter, one lowercase letter, one number, one special character.
- Define the five rules as named test functions in one object, keyed by a rule name.
- Each list item should carry a data attribute matching one rule's key, so the update logic looks up the right test function per item instead of hardcoding item positions.
- On every keystroke, re-evaluate every rule against the current password value and toggle each item between an unmet gray state and a met green state (with a checkmark) accordingly.
- Show a live text summary like "3 of 5 requirements met", updated on every keystroke.
- A submit button must stay disabled until all five requirements are met, and its disabled state must be derived from the same count used for the summary text.`,
    },
  },
};

export default bootstrapPasswordRequirementsChecklist;
