const bootstrapContactFormCharCounter = {
  id: 'bootstrap-contact-form-char-counter',
  title: 'Bootstrap Contact Form with Character Counter',
  lastmod: '2026-09-09',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscontact-card">
    <div class="card-body p-4">
      <h5 class="fw-bold mb-3">Send us a message</h5>
      <form id="bscontactForm" novalidate>
        <div class="mb-3">
          <label class="form-label small fw-semibold">Email</label>
          <input type="email" class="form-control" id="bscontactEmail" required>
        </div>
        <div class="mb-1">
          <label class="form-label small fw-semibold d-flex justify-content-between">
            <span>Message</span>
            <span class="text-muted" id="bscontactCount">0 / 280</span>
          </label>
          <textarea class="form-control" id="bscontactMessage" rows="4" maxlength="280" required></textarea>
        </div>
        <p class="small text-danger mb-3 d-none" id="bscontactWarn">Keep it under 280 characters.</p>
        <button type="submit" class="btn btn-dark w-100 fw-bold">Send message</button>
        <p class="small text-success mt-2 mb-0 d-none" id="bscontactSuccess">Message sent — we'll reply within a day.</p>
      </form>
    </div>
  </div>
</div>`,
  css: `.bscontact-card { width: 400px; border: 1px solid #eceef1; border-radius: 14px; }`,
  js: `const form = document.getElementById('bscontactForm');
const email = document.getElementById('bscontactEmail');
const message = document.getElementById('bscontactMessage');
const countEl = document.getElementById('bscontactCount');
const warn = document.getElementById('bscontactWarn');
const success = document.getElementById('bscontactSuccess');
const LIMIT = 280;

message.addEventListener('input', () => {
  const len = message.value.length;
  countEl.textContent = len + ' / ' + LIMIT;
  const near = len >= LIMIT - 20;
  countEl.classList.toggle('text-danger', near);
  countEl.classList.toggle('text-muted', !near);
  warn.classList.toggle('d-none', len < LIMIT);
});

form.addEventListener('submit', e => {
  e.preventDefault();
  success.classList.add('d-none');
  email.classList.toggle('is-invalid', !email.checkValidity());
  message.classList.toggle('is-invalid', !message.value.trim());

  if (!email.checkValidity() || !message.value.trim()) return;

  success.classList.remove('d-none');
  form.reset();
  countEl.textContent = '0 / ' + LIMIT;
  countEl.classList.remove('text-danger');
  countEl.classList.add('text-muted');
  [email, message].forEach(f => f.classList.remove('is-invalid'));
});`,

  seo: {
    title: 'Bootstrap Contact Form with Character Counter — Free Snippet',
    description: 'A real Bootstrap 5.3 contact form with a live "N / 280" character counter on the message field that turns red as the limit approaches.',
    about: {
      title: 'Bootstrap Contact Form with Character Counter — HTML, CSS & JavaScript',
      description: `A \`maxlength\` attribute on a \`<textarea>\` silently stops a visitor from typing further with no visible warning of why — this snippet pairs Bootstrap's real \`maxlength="280"\` textarea with a live counter that updates on every keystroke, turning from muted gray to red once fewer than 20 characters remain, so the limit is visible well before it's actually hit rather than discovered by a key that stops responding.\n\nSubmission is genuinely validated: both the email (\`checkValidity()\`) and the message (a non-empty check) must pass before the success message appears, with Bootstrap's real \`is-invalid\` state applied to whichever field fails — built on **real Bootstrap 5.3** form controls throughout.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads an empty contact form with "0 / 280".' },
        { title: 'Type a message', text: 'The counter updates on every keystroke, e.g. "142 / 280".' },
        { title: 'Type past 260 characters', text: 'The counter turns red, giving an early warning before the 280 limit is actually reached.' },
        { title: 'Submit with an empty or invalid email', text: 'The relevant field gets Bootstrap\'s invalid styling and the form doesn\'t submit.' },
        { title: 'Fill both fields correctly and submit', text: 'A green success message appears and the form resets.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 form-control fields, loaded from the actual CDN',
      'Live character counter updates on every keystroke, not just on blur or submit',
      'Counter turns red with an early warning once fewer than 20 characters remain',
      'Genuine submit validation — both email and message must pass before success shows',
      'Bootstrap\'s real is-invalid state applied to whichever field actually fails',
      'Form and counter both reset cleanly after a successful submission',
    ],
    useCases: [
      { icon: 'FORM',  title: 'Contact and support request forms', desc: 'A visible character limit prevents a visitor from writing a message that gets silently truncated or rejected server-side.' },
      { icon: 'LEARN', title: 'Learning live character-count UX', desc: 'A clean example of pairing a native maxlength constraint with a visible, color-changing counter rather than a silent limit.' },
      { icon: 'CODE',  title: 'Any length-limited text field', desc: 'Reuse the same counter pattern for a bio field, a tweet-style post composer, or an SMS-length message field.' },
      { icon: 'DESIGN', title: 'Support ticket and feedback widgets', desc: 'A compact contact card like this fits well in a help widget or sidebar, not just a dedicated contact page.' },
    ],
    faqs: [
      { q: 'Does the counter update live, or only after I stop typing?', a: 'Live — the input event fires on every keystroke, so the counter updates immediately as you type, not after a debounce delay or on blur.' },
      { q: 'What happens when I reach the 280-character limit?', a: 'The textarea\'s native maxlength="280" attribute physically prevents typing further, and the counter has already turned red and shown a warning message before that point, so the limit isn\'t a surprise.' },
      { q: 'Is the form actually validated on submit?', a: 'Yes — the email field is checked with native checkValidity() and the message with a non-empty check; either failing applies Bootstrap\'s is-invalid class and blocks the success message from showing.' },
      { q: 'Where does a submitted message actually go?', a: 'Nowhere outside the page — this is a front-end demo. Replace the success-message logic in the submit handler with a real fetch() call to your contact-form API endpoint.' },
      { q: 'Can I change the character limit?', a: 'Yes — update both the LIMIT constant in the JS and the maxlength="280" attribute on the textarea to the same new value, so the visible counter and the actual enforced limit stay in sync.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to wire the submit handler to a real contact-form API with fetch() and a loading state on the button, or to add a subject dropdown field that's included in validation. It's also a good exercise to ask the assistant to add a honeypot field for basic spam protection.`,
      prompt: `Build a Bootstrap 5.3 contact form with a live character-limit counter, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap form with an email input and a message textarea (maxlength="280"), plus a submit button.
- A live "N / 280" counter above or near the textarea that updates on every keystroke (the input event), turning a warning color (e.g. red) once fewer than 20 characters remain before the limit.
- On submit, validate both fields — the email via native checkValidity(), the message via a non-empty check — applying Bootstrap's is-invalid class to whichever fails and blocking a success message from appearing until both pass.
- On successful submission, show a success message, reset the form, and reset the character counter back to its initial state.`,
    },
  },
};

export default bootstrapContactFormCharCounter;
