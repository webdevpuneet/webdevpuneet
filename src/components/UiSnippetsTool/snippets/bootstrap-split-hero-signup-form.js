const bootstrapSplitHeroSignupForm = {
  id: 'bootstrap-split-hero-signup-form',
  title: 'Bootstrap Split Hero with Inline Signup Form',
  lastmod: '2026-09-09',
  category: 'heroes',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="row g-0 bssplit-row">
  <div class="col-lg-6 bssplit-copy d-flex align-items-center">
    <div class="p-5">
      <h1 class="bssplit-title">Start shipping faster.</h1>
      <p class="bssplit-sub mb-4">Create a free account — no credit card, cancel anytime.</p>

      <form id="bssplitForm" novalidate>
        <div class="mb-3">
          <label class="form-label small fw-semibold">Full name</label>
          <input type="text" class="form-control" id="bssplitName" required>
          <div class="invalid-feedback">Enter your name.</div>
        </div>
        <div class="mb-3">
          <label class="form-label small fw-semibold">Work email</label>
          <input type="email" class="form-control" id="bssplitEmail" required>
          <div class="invalid-feedback">Enter a valid email.</div>
        </div>
        <button type="submit" class="btn btn-dark w-100 fw-bold">Create free account</button>
        <p class="small text-muted mt-2 mb-0" id="bssplitStatus"></p>
      </form>
    </div>
  </div>
  <div class="col-lg-6 bssplit-visual d-none d-lg-flex align-items-center justify-content-center">
    <div class="bssplit-mock">
      <div class="bssplit-mock-row" style="--w:70%"></div>
      <div class="bssplit-mock-row" style="--w:45%"></div>
      <div class="bssplit-mock-row" style="--w:85%"></div>
      <div class="bssplit-mock-row" style="--w:60%"></div>
    </div>
  </div>
</div>`,
  css: `body { margin: 0; }
.bssplit-row { min-height: 100vh; }
.bssplit-title { font-weight: 800; letter-spacing: -0.02em; font-size: clamp(1.7rem, 1.3rem + 1.6vw, 2.6rem); }
.bssplit-sub { color: #6b7280; }
.bssplit-visual { background: linear-gradient(135deg, #4f46e5, #7c3aed); }
.bssplit-mock { width: 70%; background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2); border-radius: 14px; padding: 24px; }
.bssplit-mock-row { height: 12px; width: var(--w); background: rgba(255,255,255,.35); border-radius: 6px; margin-bottom: 12px; }
.bssplit-mock-row:last-child { margin-bottom: 0; }`,
  js: `const form = document.getElementById('bssplitForm');
const name = document.getElementById('bssplitName');
const email = document.getElementById('bssplitEmail');
const status = document.getElementById('bssplitStatus');

form.addEventListener('submit', e => {
  e.preventDefault();
  name.classList.toggle('is-invalid', !name.value.trim());
  email.classList.toggle('is-invalid', !email.checkValidity());

  if (!name.value.trim() || !email.checkValidity()) {
    status.textContent = 'Please fix the highlighted fields.';
    return;
  }

  status.textContent = 'Account created for ' + name.value + ' (' + email.value + ').';
  form.reset();
  [name, email].forEach(f => f.classList.remove('is-invalid'));
});`,

  seo: {
    title: 'Bootstrap Split Hero with Inline Signup Form — Free Snippet',
    description: 'A full-height Bootstrap 5.3 split hero — copy and a real validated signup form on one side, a gradient visual panel on the other.',
    about: {
      title: 'Bootstrap Split Hero with Inline Signup Form — HTML, CSS & JavaScript',
      description: `Rather than a form buried below a hero's fold, this snippet puts the signup form directly **inside** the hero itself, using **real Bootstrap 5.3**'s grid split into two full-height columns: the form and copy on the left, a gradient visual panel on the right (hidden on mobile via \`d-none d-lg-flex\`, since a decorative panel isn't worth the space on a phone screen).\n\nThe form itself is genuinely validated — both fields are checked on submit (\`checkValidity()\` for email, a plain trim check for name), with Bootstrap's real \`is-invalid\` state applied to whichever field fails, and a status message confirming the specific name and email once both pass.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a full-height split layout.' },
        { title: 'Submit with empty fields', text: 'Click "Create free account" with nothing filled in — both fields get Bootstrap\'s invalid state.' },
        { title: 'Fill in valid values and submit', text: 'Enter a name and valid email — a confirmation message shows both values and the form resets.' },
        { title: 'Shrink the preview width', text: 'Narrow below Bootstrap\'s lg breakpoint — the gradient visual panel disappears and the form takes the full width.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 full-height grid split (row/col-lg-6), loaded from the actual CDN',
      'Genuinely validated signup form — checkValidity() and a non-empty-name check on submit',
      'Visual panel hidden on mobile via Bootstrap\'s d-none d-lg-flex utility combination',
      'Confirmation message names the specific values that were submitted',
      'Responsive typography via a CSS clamp() headline',
      'Decorative mockup panel built from plain CSS, no image asset required',
    ],
    useCases: [
      { icon: 'FORM',  title: 'SaaS signup landing pages', desc: 'Putting the form directly in the hero removes a click and a scroll between "interested" and "signed up."' },
      { icon: 'DESIGN', title: 'Split-screen marketing layouts', desc: 'A common, effective pattern — value proposition and action on one side, visual proof or branding on the other.' },
      { icon: 'LEARN',  title: 'Learning responsive column hiding', desc: 'A clear example of Bootstrap\'s d-none d-lg-flex pattern for hiding a decorative element only below a breakpoint.' },
      { icon: 'CODE',   title: 'A/B testing hero layouts', desc: 'Compare conversion against the centered Bootstrap Hero Section snippet in this category to see which layout performs better.' },
    ],
    faqs: [
      { q: 'Is the signup form actually validated?', a: 'Yes — on submit, the email field is checked with native checkValidity() and the name field with a trim-and-check, both applying Bootstrap\'s real is-invalid styling on failure and blocking the "success" message until both pass.' },
      { q: 'What happens to the visual panel on mobile?', a: 'It\'s hidden entirely below Bootstrap\'s lg breakpoint (992px) via d-none d-lg-flex, so the form gets the full width on a phone screen instead of being squeezed beside a panel that no longer fits.' },
      { q: 'Where does the submitted data go?', a: 'Nowhere outside the page — this is a front-end demo. Replace the status-message logic in the submit handler with a real fetch() call to your signup API.' },
      { q: 'Can I swap the gradient panel for a real screenshot?', a: 'Yes — replace .bssplit-mock\'s content and background with an <img> of your actual product, keeping the same column structure.' },
      { q: 'Does this work well on very short viewports?', a: 'The row uses min-height: 100vh, so on a very short screen the content may require scrolling — reduce or remove that min-height if you\'d rather it size to its content instead.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire the submit handler to a real signup API with fetch() and a loading state on the button, or to add a password field with a strength meter. It's also a good exercise to ask the assistant to swap the gradient mock panel for an actual product screenshot with a subtle parallax effect on scroll.`,
      prompt: `Build a Bootstrap 5.3 full-height split hero with an inline signup form, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A full-viewport-height two-column layout using Bootstrap's grid: a headline, subtext, and a signup form (name + email fields, a submit button) on the left; a decorative gradient panel on the right, hidden below Bootstrap's lg breakpoint using its d-none/d-flex utility classes.
- The form must validate both fields on submit — the email field via native checkValidity(), the name field by checking it's non-empty — applying Bootstrap's is-invalid class to whichever field fails and blocking submission.
- On successful validation, show a confirmation message that includes the actual submitted name and email, then reset the form.
- The layout must remain fully usable and readable on mobile, with the visual panel removed rather than squeezed.`,
    },
  },
};

export default bootstrapSplitHeroSignupForm;
