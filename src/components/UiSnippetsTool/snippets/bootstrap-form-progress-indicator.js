const bootstrapFormProgressIndicator = {
  id: 'bootstrap-form-progress-indicator',
  title: 'Bootstrap Form Progress Indicator',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsfp-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <h6 class="fw-bold mb-0">Complete your profile</h6>
        <span class="small fw-semibold text-muted" id="bsfpPercent">0%</span>
      </div>
      <div class="progress mb-3" style="height:6px;">
        <div class="progress-bar" id="bsfpBar" role="progressbar" style="width:0%"></div>
      </div>

      <div class="mb-2">
        <label class="form-label small fw-semibold mb-1">Full name</label>
        <input type="text" class="form-control form-control-sm bsfp-field" id="bsfpName">
      </div>
      <div class="mb-2">
        <label class="form-label small fw-semibold mb-1">Job title</label>
        <input type="text" class="form-control form-control-sm bsfp-field" id="bsfpTitle">
      </div>
      <div class="mb-2">
        <label class="form-label small fw-semibold mb-1">Company</label>
        <input type="text" class="form-control form-control-sm bsfp-field" id="bsfpCompany">
      </div>
      <div class="mb-2">
        <label class="form-label small fw-semibold mb-1">Short bio</label>
        <textarea class="form-control form-control-sm bsfp-field" id="bsfpBio" rows="2"></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label small fw-semibold mb-1">Profile photo</label>
        <input type="file" class="form-control form-control-sm bsfp-field" id="bsfpPhoto">
      </div>

      <button type="button" class="btn btn-dark btn-sm fw-bold w-100" id="bsfpSubmit" disabled>Save profile</button>
    </div>
  </div>
</div>`,
  css: `.bsfp-card { width: 360px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
#bsfpBar { transition: width .2s ease; }`,
  js: `const fields = Array.from(document.querySelectorAll('.bsfp-field'));
const bar = document.getElementById('bsfpBar');
const percentEl = document.getElementById('bsfpPercent');
const submitBtn = document.getElementById('bsfpSubmit');

function isFilled(field) {
  if (field.type === 'file') return field.files && field.files.length > 0;
  return field.value.trim() !== '';
}

function update() {
  const filled = fields.filter(isFilled).length;
  const pct = Math.round((filled / fields.length) * 100);
  bar.style.width = pct + '%';
  bar.className = 'progress-bar' + (pct === 100 ? ' bg-success' : '');
  percentEl.textContent = pct + '%';
  submitBtn.disabled = pct < 100;
}

fields.forEach(field => {
  field.addEventListener(field.tagName === 'INPUT' && field.type === 'file' ? 'change' : 'input', update);
});

update();`,

  seo: {
    title: 'Bootstrap Form Progress Indicator — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 completion-percentage progress bar for a single long form — five fields of different input types all counted the same way, with the bar turning green and Save enabling only once every field is filled.',
    about: {
      title: 'Bootstrap Form Progress Indicator — HTML, CSS & JavaScript',
      description: `This is a genuinely different pattern from a multi-step wizard like [bootstrap-stepper-wizard-form](/ui-snippets/bootstrap-stepper-wizard-form/) — every field here lives on one single page at once, and the progress bar exists purely to communicate how much of that one page is filled in, not which of several discrete steps the user is currently on.\n\n\`isFilled()\` is the one place that has to correctly handle two genuinely different field types: a text/textarea field counts as filled when its trimmed value is non-empty, while a file input has no meaningful \`.value\` to check at all — it's filled when \`.files.length > 0\`. Getting this branch wrong (checking \`.value\` on a file input, which browsers deliberately keep unreliable for security reasons) is a common bug in a homemade version of this pattern.\n\nEvery field type also needs the right event to actually notice a change — text inputs and textareas fire \`input\` on every keystroke, but a file input only ever fires \`change\`, never \`input\`, when a file is selected. The listener setup branches on that explicitly rather than attaching the same event name to every field and hoping it works, which is exactly the kind of subtle cross-field-type bug that\'s easy to miss until a coworker actually tries filling in the file field and the bar doesn\'t move.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The bar sits at 0%, "Save profile" is disabled, and every field is empty.' },
        { title: 'Type your name', text: 'The bar jumps to 20% immediately as you type the first character.' },
        { title: 'Fill in job title, company, and bio', text: 'The percentage climbs with each field, updating live on every keystroke.' },
        { title: 'Select a profile photo file', text: 'The bar reaches 100%, turns green, and "Save profile" becomes enabled.' },
        { title: 'Clear one of the text fields', text: 'The percentage immediately drops back below 100%, and Save disables again.' },
      ],
    },
    features: [
      'A single progress bar reflecting how much of one page is filled, distinct from a multi-step wizard',
      'Correctly checks a file input\'s .files.length rather than its unreliable .value property',
      'Text/textarea fields listen for "input"; the file field listens for "change" — the correct event per type',
      'The bar visually turns green only once every field genuinely qualifies as filled',
      'The submit button\'s disabled state is derived from the exact same completion count driving the bar',
    ],
    useCases: [
      { icon: 'FORM', title: 'Profile completion and onboarding forms', desc: 'A well-known pattern (LinkedIn-style "your profile is 80% complete") for encouraging a user to finish filling in optional details.' },
      { icon: 'APP', title: 'Long forms where later fields depend on earlier answers', desc: 'Pair with [bootstrap-conditional-form-fields](/ui-snippets/bootstrap-conditional-form-fields/) so the percentage only counts fields that are actually currently visible.' },
      { icon: 'APP', title: 'Settings pages with several optional fields', desc: 'Gives a visible sense of progress on a form with no natural multi-step structure.' },
      { icon: 'CART', title: 'Checkout or application forms with many required fields', desc: 'A live percentage is often reassuring feedback on a long single-page form before submission is even attempted.' },
    ],
    faqs: [
      { q: 'Why does checking a file field need different logic than a text field?', a: 'A file input\'s .value is deliberately kept unreliable by browsers for security reasons and cannot be used to detect a selection — .files.length is the correct, reliable way to check whether a file has actually been chosen.' },
      { q: 'Why do file inputs need a different event listener?', a: 'A file input never fires the "input" event on selection (unlike text fields, which fire it on every keystroke) — it only fires "change", so a listener attached with the wrong event name would silently never detect a file selection at all.' },
      { q: 'Should every field count equally toward the percentage?', a: 'This demo weighs all five fields equally for simplicity; a real implementation might weight fields differently (e.g. required fields counting more than optional ones) depending on what "100% complete" should actually mean for that specific form.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track each field\'s value (and the file input\'s selected-file state) in component state, and derive the percentage and submit-disabled flag from that state on every render — the isFilled per-field-type logic carries over directly.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to weight fields differently (e.g. required fields worth more than optional ones) instead of treating all fields equally, or to add a small checklist breakdown next to the bar showing exactly which fields are still missing.`,
      prompt: `Build a Bootstrap 5.3 single-page form with a live completion-percentage progress bar, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A form with at least 5 fields of mixed types, including at least one text input, one textarea, and one file input.
- A progress bar and percentage label above the fields, recomputed live as the user fills in each field, based on how many of the total fields currently qualify as "filled".
- Correctly detect a filled file input using its files.length property (not its value), and listen for its "change" event rather than "input" since file inputs never fire "input" on selection.
- The progress bar should turn a distinct success color once it reaches 100%, and a submit button should stay disabled until then, both derived from the same completion count.
- Clearing any previously filled field must immediately reduce the percentage and re-disable the submit button if it drops below 100%.`,
    },
  },
};

export default bootstrapFormProgressIndicator;
