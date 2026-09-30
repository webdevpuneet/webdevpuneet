const bootstrapSignupPasswordStrength = {
  id: 'bootstrap-signup-password-strength',
  title: 'Bootstrap Signup Form with Password Strength Meter',
  lastmod: '2026-09-09',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bspw-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Create your password</h5>
      <label class="form-label small fw-semibold">Password</label>
      <input type="password" class="form-control mb-2" id="bspwInput" placeholder="At least 8 characters">

      <div class="bspw-meter mb-2"><div class="bspw-meter-bar" id="bspwBar"></div></div>
      <p class="small fw-semibold mb-3" id="bspwLabel">Enter a password</p>

      <ul class="list-unstyled bspw-rules small">
        <li id="bspwRuleLen">○ At least 8 characters</li>
        <li id="bspwRuleUpper">○ One uppercase letter</li>
        <li id="bspwRuleNum">○ One number</li>
        <li id="bspwRuleSpecial">○ One special character</li>
      </ul>
      <button class="btn btn-dark w-100 fw-bold mt-2" id="bspwSubmit" disabled>Create account</button>
    </div>
  </div>
</div>`,
  css: `.bspw-card { width: 360px; border: 1px solid #eceef1; border-radius: 14px; }
.bspw-meter { height: 6px; background: #eceef1; border-radius: 4px; overflow: hidden; }
.bspw-meter-bar { height: 100%; width: 0%; background: #dc2626; transition: width .2s ease, background .2s ease; }
.bspw-rules li { color: #9ca3af; transition: color .15s; }
.bspw-rules li.bspw-met { color: #16a34a; }`,
  js: `const input = document.getElementById('bspwInput');
const bar = document.getElementById('bspwBar');
const label = document.getElementById('bspwLabel');
const submit = document.getElementById('bspwSubmit');

const rules = {
  len:     { test: v => v.length >= 8,       el: document.getElementById('bspwRuleLen') },
  upper:   { test: v => /[A-Z]/.test(v),      el: document.getElementById('bspwRuleUpper') },
  num:     { test: v => /[0-9]/.test(v),      el: document.getElementById('bspwRuleNum') },
  special: { test: v => /[^A-Za-z0-9]/.test(v), el: document.getElementById('bspwRuleSpecial') },
};

const LEVELS = [
  { pct: 0,   color: '#dc2626', text: 'Enter a password' },
  { pct: 25,  color: '#dc2626', text: 'Weak' },
  { pct: 50,  color: '#f59e0b', text: 'Fair' },
  { pct: 75,  color: '#eab308', text: 'Good' },
  { pct: 100, color: '#16a34a', text: 'Strong' },
];

input.addEventListener('input', () => {
  const v = input.value;
  let met = 0;

  Object.values(rules).forEach(rule => {
    const ok = rule.test(v);
    rule.el.classList.toggle('bspw-met', ok);
    rule.el.textContent = (ok ? '✓ ' : '○ ') + rule.el.textContent.slice(2);
    if (ok) met++;
  });

  const level = v ? LEVELS[met] : LEVELS[0];
  bar.style.width = (v ? met / 4 * 100 : 0) + '%';
  bar.style.background = level.color;
  label.textContent = level.text;
  label.style.color = level.color;

  submit.disabled = met < 4;
});`,

  seo: {
    title: 'Bootstrap Signup Form with Password Strength Meter — Free Snippet',
    description: 'A real Bootstrap 5.3 password field with a live strength meter, four checkable rules, and a submit button that only enables once every rule passes.',
    about: {
      title: 'Bootstrap Signup Form with Password Strength Meter — HTML, CSS & JavaScript',
      description: `Rather than a vague "your password is weak" message after submission, this snippet checks four password rules — length, an uppercase letter, a number, a special character — **live, on every keystroke**, against a real Bootstrap form-control password field. Each rule is a small \`{ test, el }\` object; a shared \`input\` listener runs every test against the current value, toggles a ✓/○ marker and a green "met" color per rule, and derives an overall strength percentage from how many of the four currently pass.\n\nThe submit button stays genuinely \`disabled\` until all four rules pass — not just visually discouraged, but functionally unclickable — which is the detail that actually prevents a weak password from being submitted, rather than merely suggesting a stronger one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads an empty password field and a disabled submit button.' },
        { title: 'Type a short password', text: 'The meter fills partially, the label reads "Weak" or "Fair", and only some rules show a green checkmark.' },
        { title: 'Type a password meeting all four rules', text: 'E.g. "Secure#2026" — the meter fills to 100% green, the label reads "Strong", and the submit button becomes enabled.' },
        { title: 'Delete a character', text: 'Remove the special character — that rule reverts to unmet and the submit button disables again immediately.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 form-control password field, loaded from the actual CDN',
      'Four independently checked rules — length, uppercase, number, special character',
      'Live strength meter and label, both recalculated on every keystroke',
      'Submit button is genuinely disabled, not just visually discouraged, until every rule passes',
      'Each rule is a small, independently testable {test, el} object — easy to add a fifth rule',
      'No password-strength library — all four checks are plain regular expressions',
    ],
    useCases: [
      { icon: 'FORM',  title: 'Signup and account-creation forms', desc: 'Real-time password feedback catches weak passwords before submission instead of after a failed server-side check.' },
      { icon: 'LEARN', title: 'Learning live multi-rule form validation', desc: 'A clear pattern for checking several independent conditions against one input and deriving both per-rule and overall feedback.' },
      { icon: 'ACCESS', title: 'Reducing support load from confusing password errors', desc: 'Showing exactly which rule is unmet, live, is more helpful than a generic "password too weak" error after the fact.' },
      { icon: 'CODE',  title: 'Password reset and change-password flows', desc: 'Reuse the same meter and rule-checking pattern anywhere a new password is being set, not just at signup.' },
    ],
    faqs: [
      { q: 'Is the submit button really disabled, not just styled to look disabled?', a: 'Genuinely disabled — its disabled property is set to true/false based on whether all four rules pass, so it\'s functionally unclickable (and correctly skipped in tab order) until the password meets every requirement.' },
      { q: 'What are the four password rules?', a: 'At least 8 characters, one uppercase letter, one number, and one special (non-alphanumeric) character — each checked with its own regular expression against the current input value.' },
      { q: 'How is the strength percentage calculated?', a: 'It\'s simply how many of the four rules currently pass, divided by four — 1 of 4 rules met fills the meter to 25%, 4 of 4 fills it to 100% and turns it green.' },
      { q: 'Can I add a fifth rule?', a: 'Yes — add a new entry to the rules object with its own test function and a matching <li> element in the HTML, and update the LEVELS array and the met < 4 check to account for five total rules.' },
      { q: 'Does this actually create an account?', a: 'No — this is a front-end demo. Wire the submit button\'s click handler to a real signup API call once the password (and any other required fields) pass validation.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add a "show password" toggle button (matching the pattern from the Bootstrap Login Form snippet), or to add a check against a list of common leaked passwords instead of just character-class rules. It's also a good exercise to ask the assistant to add a confirm-password field that must match before the submit button enables.`,
      prompt: `Build a Bootstrap 5.3 signup password field with a live strength meter, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap form-control password input, a visual strength meter bar below it, a text label describing the current strength (e.g. Weak/Fair/Good/Strong), and a checklist of at least four password rules (length, uppercase letter, number, special character) each with its own visible met/unmet indicator.
- Every rule must be re-evaluated on every keystroke (the input event) against the current password value using independent test functions, not a single combined regex.
- The strength meter's fill percentage and color, and the strength label, must be derived from how many of the rules currently pass.
- A submit button must start disabled and only become enabled once all rules pass, and must re-disable immediately if the password is edited to no longer satisfy any rule.`,
    },
  },
};

export default bootstrapSignupPasswordStrength;
