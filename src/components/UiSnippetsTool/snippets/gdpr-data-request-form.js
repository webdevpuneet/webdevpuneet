const gdprDataRequestForm = {
  id: 'gdpr-data-request-form',
  title: 'GDPR Data Request Form',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="gd-card">
  <form id="gdForm" class="gd-form">
    <h2>Data privacy request</h2>
    <p class="gd-sub">Exercise your rights under GDPR. We'll confirm your identity before processing.</p>

    <fieldset class="gd-fieldset">
      <legend>What would you like to do?</legend>
      <label class="gd-radio">
        <input type="radio" name="gdType" value="Access my data" checked />
        <span><strong>Access my data</strong><small>Get a copy of the personal data we hold about you.</small></span>
      </label>
      <label class="gd-radio">
        <input type="radio" name="gdType" value="Delete my data" />
        <span><strong>Delete my data</strong><small>Request erasure of your personal data ("right to be forgotten").</small></span>
      </label>
      <label class="gd-radio">
        <input type="radio" name="gdType" value="Correct my data" />
        <span><strong>Correct my data</strong><small>Fix inaccurate or incomplete personal data.</small></span>
      </label>
      <label class="gd-radio">
        <input type="radio" name="gdType" value="Export my data" />
        <span><strong>Export my data</strong><small>Receive your data in a portable, machine-readable format.</small></span>
      </label>
    </fieldset>

    <div class="gd-field">
      <label for="gdEmail">Confirm your account email</label>
      <input type="email" id="gdEmail" placeholder="you@example.com" required />
      <p class="gd-error" id="gdError" hidden>Enter the email address associated with your account.</p>
    </div>

    <button type="submit" class="gd-submit">Submit request</button>
  </form>

  <div class="gd-confirm" id="gdConfirm" hidden>
    <div class="gd-check">✓</div>
    <h2>Request received</h2>
    <p class="gd-confirm-detail" id="gdConfirmDetail"></p>
    <div class="gd-timeline-note">
      <strong>What happens next</strong>
      <p>We'll respond within <strong>one month (30 days)</strong> of receiving your request, as required under GDPR. For complex requests, this may be extended by up to two further months — we'll notify you if that applies.</p>
    </div>
    <button type="button" class="gd-restart" id="gdRestart">Submit another request</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d13;color:#e7eaf3;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.gd-card{width:100%;max-width:480px;background:#12141d;border:1px solid #232838;border-radius:16px;padding:26px}
.gd-form h2,.gd-confirm h2{font-size:19px;margin:0 0 6px}
.gd-sub{font-size:13px;color:#8891a8;margin:0 0 20px;line-height:1.5}
.gd-fieldset{border:none;padding:0;margin:0 0 20px;display:flex;flex-direction:column;gap:8px}
.gd-fieldset legend{font-size:13px;font-weight:600;color:#aab0c4;margin-bottom:8px;padding:0}
.gd-radio{display:flex;align-items:flex-start;gap:10px;background:#191c28;border:1px solid #262c3f;border-radius:10px;padding:12px;cursor:pointer;transition:border-color .15s ease}
.gd-radio:has(input:checked){border-color:#6f8dff;background:#171b2c}
.gd-radio input{margin-top:3px;width:16px;height:16px;accent-color:#6f8dff;flex-shrink:0}
.gd-radio strong{display:block;font-size:13.5px;color:#e7eaf3}
.gd-radio small{display:block;font-size:12px;color:#828aa0;margin-top:2px;line-height:1.4}
.gd-field{margin-bottom:20px}
.gd-field label{display:block;font-size:13px;font-weight:600;color:#aab0c4;margin-bottom:8px}
.gd-field input[type=email]{width:100%;background:#191c28;border:1px solid #262c3f;color:#e7eaf3;padding:11px 12px;border-radius:10px;font-size:14px}
.gd-field input[type=email]:focus{outline:2px solid #6f8dff;outline-offset:1px}
.gd-error{color:#ff8a94;font-size:12px;margin:8px 0 0}
.gd-submit,.gd-restart{width:100%;background:#6f8dff;color:#0b0e1a;border:none;padding:13px;border-radius:10px;font-size:14px;font-weight:700;cursor:pointer}
.gd-submit:hover,.gd-restart:hover{background:#89a2ff}
.gd-confirm{text-align:center}
.gd-check{width:52px;height:52px;border-radius:50%;background:#173523;color:#5fe0a0;font-size:26px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.gd-confirm-detail{font-size:13.5px;color:#c4cadd;margin:0 0 18px}
.gd-timeline-note{background:#191c28;border:1px solid #262c3f;border-radius:10px;padding:14px 16px;text-align:left;margin-bottom:22px}
.gd-timeline-note strong{display:block;font-size:12.5px;color:#e7eaf3;margin-bottom:6px}
.gd-timeline-note p{font-size:12.5px;color:#9aa1b8;line-height:1.6;margin:0}`,

  js: `const form = document.getElementById('gdForm');
const confirmView = document.getElementById('gdConfirm');
const confirmDetail = document.getElementById('gdConfirmDetail');
const emailInput = document.getElementById('gdEmail');
const errorEl = document.getElementById('gdError');
const restartBtn = document.getElementById('gdRestart');

function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!isValidEmail(emailInput.value.trim())) {
    errorEl.hidden = false;
    emailInput.focus();
    return;
  }
  errorEl.hidden = true;

  const requestType = form.querySelector('input[name="gdType"]:checked').value;
  confirmDetail.innerHTML = \`Your <strong>"\${requestType}"</strong> request for <strong>\${emailInput.value.trim()}</strong> has been logged.\`;

  form.hidden = true;
  confirmView.hidden = false;
});

restartBtn.addEventListener('click', () => {
  form.reset();
  errorEl.hidden = true;
  confirmView.hidden = true;
  form.hidden = false;
});`,

  seo: {
    title: 'GDPR Data Request Form — Free Privacy Rights Request Widget',
    description: `A privacy-rights request form covering GDPR's data subject rights — access, deletion, correction, and export — with identity confirmation and a response-time note that correctly says "within one month," not a made-up figure.`,
    about: {
      title: 'GDPR Data Request Form — Access, Delete, Correct, or Export Your Data',
      description: `The GDPR data request form is the interface a privacy or account-settings page provides for a person to exercise their data subject rights under GDPR — access, erasure, rectification, and portability — without emailing support and hoping someone reads it. This snippet builds a self-contained version in plain HTML, CSS, and JavaScript.

**Four request types, one radio group**

A \`fieldset\`/\`legend\`-grouped set of radio buttons covers the four common request types: Access, Delete, Correct, and Export my data. Each option carries a short description of what it means in plain language, not just legal shorthand, so the visitor picks the right one with confidence.

**Identity confirmation before anything happens**

An email field asks the requester to confirm the address tied to their account. This snippet validates it's a plausible email format client-side and blocks submission with an inline error otherwise — a real (if basic) organization needs a stronger identity check before actually acting on a request, but the form demonstrates where that gate belongs in the flow.

**The correct GDPR timeline — no invented numbers**

The confirmation view states the response window as *"within one month (30 days)... may be extended by up to two further months for complex requests."* This is deliberately GDPR's actual statutory deadline (Article 12(3)) — a one-month base period, extendable by two further months when the request is complex — and the copy is written to match that exactly rather than a plausible-sounding but wrong number like "5 business days" or "90 days."

**A confirmation that restates the request**

Once submitted, the confirmation view echoes back the selected request type and the confirmed email in a sentence, so the requester has a receipt of exactly what they asked for — useful evidence if they need to follow up.

**Restart without reload**

A "Submit another request" button resets the form and swaps the views back, letting one page handle multiple sequential requests (e.g., an internal tool processing several people's requests) without reloading.

**Customizing it**

Wire the submit handler to your real request-intake API or ticketing system, add a free-text details field for correction requests, or add a stronger identity-verification step (e.g. a follow-up email link) before the request is actually logged. Pair it with [gdpr-consent-manager](/ui-snippets/gdpr-consent-manager/) or [cookie preferences](/ui-snippets/cookie-preferences/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The request form renders with Access preselected.` },
      { title: 'Choose a request type', text: `Access, Delete, Correct, or Export.` },
      { title: 'Confirm your email', text: `Required and format-validated before submit.` },
      { title: 'Submit the request', text: `Errors show inline if the email is invalid.` },
      { title: 'View the confirmation', text: `See the restated request and the GDPR timeline.` },
      { title: 'Wire to a real backend', text: `Replace the demo submit with your intake API.` },
    ] },
    features: [
      { title: 'Four GDPR request types', text: `Access, delete, correct, export — in plain language.` },
      { title: 'Grouped radio fieldset', text: `Accessible legend and labeled options.` },
      { title: 'Email format validation', text: `Blocks submission on an invalid address.` },
      { title: 'Accurate GDPR timeline copy', text: `States the real one-month statutory deadline.` },
      { title: 'Request-echoing confirmation', text: `Restates exactly what was submitted.` },
      { title: 'Two-state flow', text: `Form and confirmation in one card, no reload.` },
      { title: 'Restart without reload', text: `form.reset() returns to a clean state.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and JavaScript.` },
    ],
    useCases: [
      { title: 'Privacy/account settings pages', text: `Let users self-serve data subject requests.` },
      { title: 'Compliance & legal teams', text: `An intake form feeding a request-tracking system.` },
      { title: 'Consent management platforms', text: `Pair with [gdpr-consent-manager](/ui-snippets/gdpr-consent-manager/).` },
      { title: 'Cookie/privacy centers', text: `Sit alongside [cookie preferences](/ui-snippets/cookie-preferences/).` },
      { title: 'Customer support tools', text: `Agents log requests on a user's behalf.` },
      { title: 'Multi-region compliance', text: `A template adaptable to CCPA/other regimes.` },
      { icon: 'CODE', title: 'Related: Number Stepper with Keyboard Arrows and Long-Press Acceleration', desc: 'See the [Number Stepper with Keyboard Arrows and Long-Press Acceleration](/ui-snippets/number-stepper-keyboard-longpress/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the confirmation say "within one month" instead of a specific day count like 5 or 10 days?', a: `Because that's GDPR's actual statutory deadline. Article 12(3) requires organizations to respond to data subject requests without undue delay and within one month (roughly 30 days) of receipt, extendable by up to two further months for complex or numerous requests. This snippet states that real figure deliberately rather than an invented, faster-sounding number.` },
      { q: "Does this form actually verify the requester's identity?", a: `No — it performs basic email format validation only, which is not sufficient identity verification for a production privacy tool. A real implementation needs a stronger check (e.g. requiring the requester to click a confirmation link sent to the account email, or matching against authenticated session data) before actually acting on the request.` },
      { q: 'What are the four request types based on?', a: `They map to core GDPR data subject rights: the right of access (Article 15), the right to erasure/"to be forgotten" (Article 17), the right to rectification (Article 16), and the right to data portability (Article 20). The form's copy summarizes each in plain language rather than citing article numbers to the end user.` },
      { q: 'How do I connect this to a real request-tracking system?', a: `In the submit handler, after validation passes, send the selected request type and confirmed email to your backend (ticketing system, CRM, or dedicated privacy-request tool) instead of just rendering the confirmation view locally, and use the real ticket/reference number in the confirmation copy.` },
      { q: 'Can I add more request types or extra fields?', a: `Yes — add another radio option following the same pattern (a value, a bold label, and a description), or add fields like a free-text "what would you like corrected" box that only appears when the Correct option is selected, toggled via a change listener on the radio group.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the four request types map to GDPR's actual data subject rights (access, erasure, rectification, portability), and to double-check that the response-time copy correctly reflects GDPR's real one-month deadline (extendable by two further months for complex requests) rather than a plausible-sounding but wrong figure. It can help you add a genuine identity-verification step (like an email confirmation link) before a request is actually processed, wire the submission to a real ticketing or privacy-request-tracking backend, or add a conditional detail field that only appears for the "Correct my data" option.`,
      prompt: `Build a "GDPR data request form" in plain HTML, CSS, and JavaScript (no dependencies).

Requirements:
- A fieldset/legend-grouped radio button group with four options representing core GDPR data subject rights: access my data, delete my data (erasure), correct my data (rectification), and export my data (portability) — each option should have a short plain-language description of what it means, not just a legal term.
- An identity-confirmation email field that is required and validated client-side for a plausible email format before the form can be submitted; show an inline error and keep focus on the field if validation fails.
- On successful submission, hide the form and show a confirmation view in the same card (no page navigation) that restates exactly which request type was submitted and for which email address.
- The confirmation view MUST state the response-time expectation accurately per GDPR: respond within one month (30 days) of receiving the request, which may be extended by up to two further months for complex or numerous requests. Do not invent a different number of days — use GDPR's real statutory timeline (Article 12(3)).
- A "submit another request" action that resets the form and returns to the form view without a page reload.
- Keep the whole thing accessible: a proper fieldset/legend for the radio group, a label tied to the email input, and a clearly announced/visible error state.`,
    },
  },
};

export default gdprDataRequestForm;
