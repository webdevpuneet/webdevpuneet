const bootstrapConditionalFormFields = {
  id: 'bootstrap-conditional-form-fields',
  title: 'Bootstrap Conditional Form Fields',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscond-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">How do you plan to use this?</label>
      <select class="form-select mb-3" id="bscondType">
        <option value="">Select one...</option>
        <option value="personal">Personal</option>
        <option value="business">Business</option>
        <option value="nonprofit">Nonprofit</option>
      </select>

      <div class="bscond-group d-none" id="bscondBusinessFields">
        <label class="form-label small fw-semibold">Company name</label>
        <input type="text" class="form-control mb-2" id="bscondCompany">
        <label class="form-label small fw-semibold">Tax ID</label>
        <input type="text" class="form-control mb-3" id="bscondTaxId">
      </div>

      <div class="bscond-group d-none" id="bscondNonprofitFields">
        <label class="form-label small fw-semibold">Organization name</label>
        <input type="text" class="form-control mb-2" id="bscondOrgName">
        <div class="form-check mb-3">
          <input class="form-check-input" type="checkbox" id="bscondRegistered">
          <label class="form-check-label small" for="bscondRegistered">We're a registered 501(c)(3)</label>
        </div>
      </div>

      <div class="bscond-group d-none" id="bscondEinField">
        <label class="form-label small fw-semibold">EIN</label>
        <input type="text" class="form-control mb-3" id="bscondEin">
      </div>

      <button type="button" class="btn btn-dark btn-sm fw-bold w-100" id="bscondSubmit">Continue</button>
    </div>
  </div>
</div>`,
  css: `.bscond-card { width: 360px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }`,
  js: `const type = document.getElementById('bscondType');
const businessFields = document.getElementById('bscondBusinessFields');
const nonprofitFields = document.getElementById('bscondNonprofitFields');
const einField = document.getElementById('bscondEinField');
const registered = document.getElementById('bscondRegistered');

function update() {
  const v = type.value;
  businessFields.classList.toggle('d-none', v !== 'business');
  nonprofitFields.classList.toggle('d-none', v !== 'nonprofit');
  // A second-level condition: the EIN field only shows for a nonprofit that
  // has also checked "registered 501(c)(3)" — nested conditional logic, not
  // just a flat one-field-per-option mapping.
  einField.classList.toggle('d-none', !(v === 'nonprofit' && registered.checked));
}

type.addEventListener('change', update);
registered.addEventListener('change', update);
update();`,

  seo: {
    title: 'Bootstrap Conditional Form Fields — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 form where field groups show and hide based on a selection — including a genuinely nested condition, where a field only appears when two separate conditions are both true at once.',
    about: {
      title: 'Bootstrap Conditional Form Fields — HTML, CSS & JavaScript',
      description: `A single \`update()\` function is the only place field visibility is decided, called from every input that could affect it — the type \`<select>\`'s \`change\` event and the "registered 501(c)(3)" checkbox's own \`change\` event both trigger the same function, rather than each control owning its own separate show/hide logic that could get out of sync with the others.\n\nThe business and nonprofit field groups are straightforward one-condition toggles (\`v !== 'business'\` hides the business group), but the EIN field demonstrates something a flat "one field shows per dropdown option" implementation can't: it only appears when \`v === 'nonprofit' && registered.checked\` are *both* true — selecting Nonprofit alone isn't enough, and checking "registered" while some other type is selected isn't enough either. That's a genuinely nested condition, not just a wider switch statement.\n\nRunning \`update()\` unconditionally on load (not just after a user interacts) means the form's visible fields always match its actual current state from the very first render — important for a form that might load pre-filled with existing data rather than starting from a blank selection every time.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Only the type dropdown shows; no additional fields are visible yet.' },
        { title: 'Select "Business"', text: 'Company name and Tax ID fields appear immediately.' },
        { title: 'Switch to "Nonprofit"', text: 'The business fields disappear and organization name plus a registered-status checkbox appear instead.' },
        { title: 'Check "We\'re a registered 501(c)(3)"', text: 'An EIN field appears — it only shows because both the type is Nonprofit and this box is checked.' },
        { title: 'Uncheck the box, or switch back to "Personal"', text: 'The EIN field (and every conditional group) disappears again immediately.' },
      ],
    },
    features: [
      'One update() function is the single source of truth for every field\'s visibility',
      'A genuinely nested condition — one field requires two separate inputs to both be true, not just one',
      'Every relevant control (the dropdown and the checkbox) triggers the same shared update function',
      'Visibility is correctly computed on initial load too, not only after the first user interaction',
      'Switching away from a selection cleanly hides its fields rather than leaving them stranded visible',
    ],
    useCases: [
      { icon: 'FORM', title: 'Account type or signup forms needing different fields per plan', desc: 'A common real pattern — personal vs. business vs. nonprofit accounts genuinely need different data collected.' },
      { icon: 'FORM', title: 'Showing how complete a form is as fields appear and disappear', desc: 'Pair with [bootstrap-form-progress-indicator](/ui-snippets/bootstrap-form-progress-indicator/) so the percentage only ever counts the fields currently visible.' },
      { icon: 'APP', title: 'Settings and preference forms with dependent options', desc: 'Show an advanced option only once a related toggle or mode is enabled, following the same nested-condition approach.' },
      { icon: 'CART', title: 'Checkout forms with conditional billing details', desc: 'Show a tax-exempt ID field only for business customers who\'ve also indicated exempt status, mirroring the nonprofit/EIN pattern here.' },
    ],
    faqs: [
      { q: 'Why does the EIN field need two conditions instead of just checking the type?', a: 'An EIN is only relevant to a registered nonprofit specifically, not every nonprofit selection generally — modeling it as a single field tied only to the dropdown would either show it prematurely (before registration status is known) or require duplicating the field inside both branches.' },
      { q: 'What happens if I check the registered box, then switch the type away from Nonprofit?', a: 'Both the nonprofit fields and the EIN field hide immediately, since einField\'s visibility explicitly requires the type to be nonprofit — the checkbox being checked alone is never sufficient on its own.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep the type and registered values in component state, and compute each group\'s visibility as a derived boolean expression in the render function — no direct classList manipulation needed, since the framework handles conditional rendering natively.' },
      { q: 'How would I add a third level of nesting?', a: 'Add another boolean condition to whichever field\'s visibility should depend on it, following the same pattern the EIN field already uses — update() has no fixed depth limit built into its structure.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to preserve values typed into a field group when it's hidden and later re-shown (rather than the user needing to retype them), or to add form validation that only requires fields belonging to the currently visible groups, ignoring hidden ones entirely.`,
      prompt: `Build a Bootstrap 5.3 form with conditional field groups, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A dropdown selecting an account type (e.g. Personal, Business, Nonprofit) that shows a different group of additional fields depending on the selection, hiding every other group.
- One additional field must depend on two separate conditions being true simultaneously — e.g. only appearing when a specific type is selected AND a related checkbox elsewhere in the form is also checked, not from the dropdown selection alone.
- Drive all field visibility from a single shared update function triggered by every relevant control's change event, not separate show/hide logic scattered per control.
- Ensure field visibility is correct immediately on page load, not only after the first user interaction, and that switching away from a selection correctly hides fields that were previously shown.`,
    },
  },
};

export default bootstrapConditionalFormFields;
