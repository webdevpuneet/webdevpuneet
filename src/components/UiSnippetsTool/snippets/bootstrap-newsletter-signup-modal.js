const bootstrapNewsletterSignupModal = {
  id: 'bootstrap-newsletter-signup-modal',
  title: 'Bootstrap Newsletter Signup Modal with Exit Intent',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <p class="text-muted small">Move your cursor to the very top of this preview (as if leaving the page) to trigger the modal — or click the button below.</p>
  <button class="btn btn-outline-dark btn-sm" data-bs-toggle="modal" data-bs-target="#bsnewsModal">Open manually</button>
</div>

<div class="modal fade" id="bsnewsModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content bsnews-modal">
      <button type="button" class="btn-close position-absolute top-0 end-0 m-3" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="modal-body p-4 text-center">
        <div class="bsnews-icon mx-auto mb-3">✉</div>
        <h5 class="fw-bold">Before you go — 10% off</h5>
        <p class="text-muted small mb-3">Join the newsletter and get a one-time discount code.</p>
        <form id="bsnewsForm" class="d-flex gap-2" novalidate>
          <input type="email" class="form-control" id="bsnewsEmail" placeholder="you@email.com" required>
          <button type="submit" class="btn btn-dark">Get code</button>
        </form>
        <p class="small mt-2 mb-0" id="bsnewsStatus">&nbsp;</p>
      </div>
    </div>
  </div>
</div>`,
  css: `.bsnews-icon { width: 52px; height: 52px; border-radius: 50%; background: #eef0ff; color: #6366f1; display: flex; align-items: center; justify-content: center; font-size: 22px; }`,
  js: `const modalEl = document.getElementById('bsnewsModal');
const modal = new bootstrap.Modal(modalEl);
const form = document.getElementById('bsnewsForm');
const email = document.getElementById('bsnewsEmail');
const status = document.getElementById('bsnewsStatus');

let shown = false;

// The classic exit-intent trigger: the pointer crosses the very top edge of
// the viewport, the way it does on the way to closing the tab or clicking
// the browser's back button. Fires at most once per visit.
document.addEventListener('mouseout', e => {
  if (shown) return;
  if (e.clientY <= 0) {
    shown = true;
    modal.show();
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  if (!email.checkValidity()) {
    email.classList.add('is-invalid');
    return;
  }
  email.classList.remove('is-invalid');
  status.textContent = 'Code sent to ' + email.value + ' — check your inbox.';
  status.className = 'small mt-2 mb-0 text-success';
});

modalEl.addEventListener('hidden.bs.modal', () => {
  form.reset();
  email.classList.remove('is-invalid');
  status.textContent = '\\u00A0';
  status.className = 'small mt-2 mb-0';
});`,

  seo: {
    title: 'Bootstrap Newsletter Signup Modal with Exit Intent — Free Snippet',
    description: 'A real Bootstrap 5.3 modal that opens automatically when the cursor leaves the top of the viewport — the classic exit-intent trigger — plus a manual open button.',
    about: {
      title: 'Bootstrap Newsletter Signup Modal with Exit Intent — HTML, CSS & JavaScript',
      description: `Exit-intent popups are usually built as a whole separate library — this snippet shows the actual detection is a few lines of vanilla JavaScript on top of **real Bootstrap 5.3**'s Modal component. A \`mouseout\` listener on the document checks \`e.clientY <= 0\`: the pointer's Y coordinate crossing above the very top of the viewport, which is exactly what happens on the way to the browser's tab bar or back button — a reasonable proxy for "about to leave," triggered here at most once per visit via a \`shown\` flag.\n\nThe modal itself opens with \`modal.show()\` called from JavaScript (not \`data-bs-toggle\`, since nothing was clicked), and resets its own email field and status message on Bootstrap's real \`hidden.bs.modal\` event, so it's always clean the next time it opens — whether via exit intent or the manual button also included for testing.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads with no modal visible.' },
        { title: 'Move the cursor to the top edge', text: 'Move your mouse to the very top of the preview area, as if leaving the page — the modal opens automatically.' },
        { title: 'Or click "Open manually"', text: 'Triggers the same modal without needing to simulate exit intent.' },
        { title: 'Submit an email', text: 'Enter a valid address and submit — a confirmation message appears inside the modal.' },
        { title: 'Close and reopen', text: 'The email field and confirmation message are both cleared on the next open.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Modal component, triggered programmatically via modal.show()',
      'Genuine exit-intent detection via mouseout and clientY <= 0 — no separate library',
      'Fires at most once per visit via a simple boolean flag',
      'A manual trigger button included alongside the automatic one for easy testing',
      'Resets its own form and status message on Bootstrap\'s real hidden.bs.modal event',
      'Real email validation on submit using native checkValidity()',
    ],
    useCases: [
      { icon: 'MONEY', title: 'E-commerce and content site newsletter capture', desc: 'The classic exit-intent discount popup, built without a third-party exit-intent library or its added page weight.' },
      { icon: 'LEARN', title: 'Learning exit-intent detection from scratch', desc: 'A clear, minimal implementation of the mouseout/clientY technique most commercial exit-intent tools use internally.' },
      { icon: 'CODE',  title: 'Any single-use, one-per-visit popup', desc: 'The shown flag pattern generalizes to any modal that should interrupt a visitor at most once, regardless of the trigger.' },
      { icon: 'FLOW',  title: 'A/B testing popup timing and offers', desc: 'Swap the trigger condition or the offer copy independently to test different exit-intent strategies.' },
    ],
    faqs: [
      { q: 'How does exit-intent detection actually work here?', a: 'A mouseout listener on the whole document checks whether the pointer\'s Y coordinate (e.clientY) is at or above 0 — the top edge of the viewport — which happens when a visitor moves toward the browser\'s tab bar, address bar, or back button.' },
      { q: 'Will the modal open every time my mouse touches the top of the page?', a: 'No — a shown boolean flag is set to true the first time it triggers, and the condition is skipped after that, so it opens at most once per page visit.' },
      { q: 'Does exit-intent work on mobile?', a: 'Not reliably — there\'s no persistent mouse cursor on touch devices, so this technique is primarily a desktop pattern. Consider a scroll-depth or time-on-page trigger as a mobile-friendly alternative.' },
      { q: 'Is the email actually submitted anywhere?', a: 'No — this is a front-end demo showing a confirmation message. Wire the submit handler to your real newsletter signup API.' },
      { q: 'Why does the modal reset when closed?', a: 'It listens for Bootstrap\'s own hidden.bs.modal event (fired once the close animation finishes) and clears the email field and status message then, so the next time it opens — whether via exit intent again or the manual button — it starts clean.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to persist the "already shown" state to sessionStorage so it doesn't reopen on every page in a multi-page session, or to add a time-on-page fallback trigger for mobile visitors who can't produce exit-intent mouse movement. It's also a good exercise to ask the assistant to wire the submit handler to a real email marketing API like Mailchimp or ConvertKit.`,
      prompt: `Build a Bootstrap 5.3 exit-intent newsletter signup modal, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap modal (not custom-built) containing a headline, an offer description, an email input, and a submit button, opened programmatically via JavaScript rather than a data-bs-toggle click trigger.
- Implement exit-intent detection: a document-level mouseout listener that checks whether the pointer's Y coordinate is at or above the top of the viewport, and opens the modal when that happens — but only once per page visit, using a flag to prevent it from reopening on every subsequent qualifying mouse movement.
- Include a separate manual "open" button as well, for testing without needing to simulate exit intent.
- On submit, validate the email with native checkValidity(), showing Bootstrap's is-invalid state on failure and a success message on success.
- Reset the form and any status message when the modal is closed, using Bootstrap's own hidden.bs.modal event, so it's clean on the next open.`,
    },
  },
};

export default bootstrapNewsletterSignupModal;
