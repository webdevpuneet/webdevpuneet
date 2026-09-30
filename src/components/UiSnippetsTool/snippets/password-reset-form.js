const passwordResetForm = {
  id: 'password-reset-form',
  title: 'Password Reset Form',
  category: 'forms',
  html: `<div class="reset-card">
  <div class="step step-request active" id="stepRequest">
    <div class="icon">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
    </div>
    <h2>Forgot your password?</h2>
    <p>Enter the email associated with your account and we'll send you a link to reset it.</p>
    <form id="resetForm" novalidate>
      <label for="email" class="visually-hidden">Email address</label>
      <input type="email" id="email" placeholder="you@example.com" autocomplete="email">
      <span class="error-msg" id="emailError"></span>
      <button type="submit" class="btn primary">Send reset link</button>
    </form>
  </div>

  <div class="step step-sent" id="stepSent">
    <div class="icon success">
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16v16H4z" opacity="0"/><path d="M22 6l-10 7L2 6"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg>
    </div>
    <h2>Check your email</h2>
    <p>We've sent a password reset link to <strong id="sentEmail"></strong>. Click the link in that email to choose a new password.</p>
    <button class="btn secondary" onclick="resendEmail()">Resend email</button>
    <button class="btn ghost" onclick="backToRequest()">Use a different email</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; justify-content: center; }

.reset-card {
  max-width: 380px;
  width: 100%;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 32px 28px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
  text-align: center;
}

.step { display: none; }
.step.active { display: block; }

.icon {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #eef2ff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 16px;
}
.icon.success { background: #dcfce7; }

.reset-card h2 { font-size: 19px; color: #1e293b; margin: 0 0 8px; }
.reset-card p { font-size: 13.5px; color: #64748b; line-height: 1.6; margin: 0 0 20px; }
.reset-card p strong { color: #1e293b; }

.visually-hidden {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}

#resetForm { text-align: left; }

#email {
  width: 100%;
  padding: 11px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  font-size: 14px;
  font-family: inherit;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
#email:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
#email.invalid { border-color: #ef4444; }

.error-msg {
  display: block;
  min-height: 16px;
  font-size: 12px;
  color: #ef4444;
  margin: 6px 0 14px;
}

.btn {
  width: 100%;
  padding: 11px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  margin-bottom: 10px;
  transition: background 0.15s, transform 0.1s;
}
.btn:last-child { margin-bottom: 0; }
.btn:active { transform: scale(0.98); }

.btn.primary { background: #6366f1; color: #fff; }
.btn.primary:hover { background: #4f46e5; }

.btn.secondary { background: #f1f5f9; color: #1e293b; }
.btn.secondary:hover { background: #e2e8f0; }

.btn.ghost { background: none; color: #6366f1; }
.btn.ghost:hover { text-decoration: underline; }`,
  js: `const resetForm = document.getElementById('resetForm');
const emailInput = document.getElementById('email');
const emailError = document.getElementById('emailError');

function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value);
}

resetForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();

  if (!value) {
    showError('Please enter your email address.');
    return;
  }
  if (!isValidEmail(value)) {
    showError('Please enter a valid email address.');
    return;
  }

  clearError();
  document.getElementById('sentEmail').textContent = value;
  goToStep('stepSent');

  // In a real app, this is where you'd call your backend, e.g.:
  // fetch('/api/password-reset', { method: 'POST', body: JSON.stringify({ email: value }) });
});

function showError(message) {
  emailInput.classList.add('invalid');
  emailError.textContent = message;
}

function clearError() {
  emailInput.classList.remove('invalid');
  emailError.textContent = '';
}

function goToStep(stepId) {
  document.querySelectorAll('.step').forEach((s) => s.classList.remove('active'));
  document.getElementById(stepId).classList.add('active');
}

function backToRequest() {
  clearError();
  emailInput.value = '';
  goToStep('stepRequest');
}

function resendEmail() {
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = 'Sent!';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = original;
    btn.disabled = false;
  }, 2000);
}`,

  seo: {
    title: 'Password Reset Form — Free HTML CSS JS Forgot Password Flow Snippet',
    description: 'A two-step forgot-password form: an email input with validation transitions into a check-your-email confirmation state. Plain HTML, CSS, and JS.',
    about: {
      title: 'Password Reset Form — HTML, CSS & JavaScript Forgot Password Flow',
      description: `A password reset flow is really two screens compressed into one component: an email-collection step, and a confirmation step telling the user to check their inbox. Building both as a single toggled component — rather than two separate pages — keeps the transition instant and avoids an unnecessary page reload for what is fundamentally client-side state.

This snippet implements both steps in **plain HTML, CSS, and vanilla JavaScript**.

**How the two-step structure works**

Both steps exist in the DOM at all times as sibling \`.step\` divs, \`#stepRequest\` and \`#stepSent\`, each with \`display: none\` by default and \`display: block\` only when it carries the \`.active\` class. A single \`goToStep(stepId)\` helper removes \`.active\` from every step and adds it to just the target one — the same show-one-hide-rest pattern used in a tabbed interface, applied here to a linear flow instead of freely switchable tabs.

**How email validation works**

On submit, \`isValidEmail\` runs a lightweight regex (\`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\`) that checks for the basic shape of an email address — something, an @, something, a dot, something — without trying to fully validate every RFC 5322 edge case, which is famously impractical with regex alone. An empty field and an invalid-but-non-empty field show two different messages, both surfaced in a dedicated \`.error-msg\` span with \`aria-\`-friendly announcement in mind, and the input gets a \`.invalid\` class that turns its border red.

**Why the request itself isn't shown here**

The actual backend call (\`fetch('/api/password-reset', ...)\`) is left as a commented-out placeholder rather than wired to a real endpoint, since every backend's reset-token flow differs. The important client-side behavior — validating the email, transitioning to the confirmation screen, and remembering which address was submitted so it can be echoed back to the user — is fully implemented and ready to have the real network call dropped in.

**Security note on the confirmation step**

A real password-reset flow should show the same "check your email" confirmation screen whether or not the submitted email actually exists in your system. Never reveal whether an address is registered by branching the UI on that — it's a common account-enumeration vulnerability. This snippet's confirmation step is intentionally always the same regardless of what happens on your backend.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Password Reset Form" in the sidebar Library tab. The preview starts on the email-entry step.' },
        { title: 'Try invalid input', text: 'Click "Send reset link" with an empty or malformed email to see the inline validation error appear.' },
        { title: 'Submit a valid email', text: 'Enter a properly formatted email and submit — the form transitions to the "Check your email" confirmation step, echoing back the address you entered.' },
        { title: 'Wire up the real request', text: 'In the JS panel, uncomment and adapt the fetch() call inside the submit handler to call your actual password-reset API endpoint.' },
        { title: 'Adjust the validation rule', text: 'In the JS panel, edit the isValidEmail regex if you need stricter or more permissive email format checking.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Two-step flow — email entry and confirmation — built as toggled sibling divs in one component',
      'Lightweight regex email validation with distinct messages for empty vs. malformed input',
      'Confirmation screen echoes back the exact email address the user submitted',
      '"Resend email" button with a temporary disabled state to prevent accidental double-sends',
      '"Use a different email" link resets the form and returns to the first step cleanly',
      'Invalid input gets both a red border and an inline text error for clear, accessible feedback',
      'Backend call is left as a clearly marked placeholder, ready for your own reset endpoint',
      'Visually-hidden label keeps the email input accessible without cluttering the visual design',
      'Focus ring and disabled states styled for both mouse and keyboard interaction',
      'No framework, no form validation library, no build step required',
    ],
    useCases: [
      { icon: 'AUTH', title: 'Forgot-password flows for any auth system', desc: 'Drop this in as the client-side UI for a password reset feature on top of any backend authentication provider.' },
      { icon: 'LEARN', title: 'Learn step-toggling without a router', desc: 'Study how a multi-step flow can live entirely on one page using a single active-class toggle, with no client-side routing library involved.' },
      { icon: 'FLOW', title: 'Prototype an onboarding or account-recovery flow', desc: 'Use this as a starting point in a prototype for any multi-step account flow — signup confirmation, email verification, or invite acceptance.' },
      { icon: 'DESIGN', title: 'Match your auth screens\' branding', desc: 'Restyle the icons, colors, and card shape to match your product\'s existing login and signup screens.' },
      { icon: 'ACCESS', title: 'Practice accessible form error patterns', desc: 'The paired invalid class plus dedicated error text span is a reusable pattern for any form field needing inline validation feedback.' },
      { icon: 'CODE', title: 'Wire up a real reset-token backend', desc: 'Use the placeholder fetch call as the exact spot to integrate with your provider\'s password-reset API (Firebase Auth, Auth0, Supabase, or a custom backend).' },
      { icon: 'CODE', title: 'Related: Linked Unit Conversion Inputs — Two Fields That Stay in Sync', desc: 'See the [Linked Unit Conversion Inputs — Two Fields That Stay in Sync](/ui-snippets/unit-conversion-linked-inputs/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this snippet actually send a password reset email?', a: 'No — the network call is left as a commented-out placeholder fetch() inside the submit handler. You need to connect it to your own backend or auth provider\'s password-reset endpoint to actually send an email.' },
      { q: 'How thorough is the email validation?', a: 'It uses a lightweight regex that checks for the general shape of an email address (text, an @ symbol, more text, a dot, more text). It intentionally does not attempt full RFC 5322 validation, which is impractical with regex — real validation ultimately happens server-side when the reset request is processed.' },
      { q: 'Why does the confirmation screen show regardless of whether the email exists?', a: 'This is a deliberate security practice called avoiding account enumeration. If the UI revealed whether an email was registered, an attacker could use the reset form to discover which addresses have accounts. Always show the same confirmation message whether or not the email exists in your system.' },
      { q: 'What does the "Resend email" button do?', a: 'It briefly disables itself and shows "Sent!" for two seconds to prevent accidental rapid double-clicks, then re-enables. You should wire this to actually re-trigger your backend\'s reset-email endpoint using the previously submitted address.' },
      { q: 'How do I go back and use a different email address?', a: 'Click "Use a different email" on the confirmation screen — it clears the input and error state and returns you to the first step so a new address can be entered.' },
      { q: 'Can I add a loading state while the reset request is in flight?', a: 'Yes. Disable the submit button and swap its text to something like "Sending..." at the start of the submit handler, then re-enable it (or transition to the confirmation step) once your fetch call resolves.' },
      { q: 'Is the email input accessible to screen readers even though there\'s no visible label?', a: 'Yes. The input has an associated <label> that is visually hidden using a standard clip-based technique rather than display: none, so it remains in the accessibility tree and is announced by screen readers even though it is not visually shown.' },
      { q: 'How do I add a rate limit or cooldown between resend attempts?', a: 'Extend the resendEmail function to track a timestamp of the last request (e.g. in a variable or localStorage) and keep the button disabled with a countdown until a minimum interval has passed, in addition to your backend enforcing its own rate limit.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the confirmation screen must always look identical regardless of whether the submitted email exists in your system, and to review your specific backend's password-reset endpoint design for account-enumeration risks. It's also a great snippet to extend with the assistant's help: ask it to add a loading spinner state on the submit button while the network request is in flight, to add a resend cooldown timer that persists across page reloads via localStorage, or to help wire the placeholder fetch call to a specific auth provider's SDK (Firebase, Auth0, Supabase, or a custom Express/Django backend) and handle its particular error responses gracefully in the existing error-message UI.`,
      prompt: `Build a two-step "forgot password" form in plain HTML, CSS, and JavaScript — no framework, no form library.

Requirements:
- Two step containers that both exist in the DOM at all times, toggled between via a single shared active class and a small goToStep helper function — not two separate pages or a routing library.
- Step one: an email input with a visually-hidden but properly associated label, a submit button, and client-side validation on submit that checks for both an empty field and a malformed email address, each producing a distinct inline error message plus a visual invalid state on the input.
- Step two: a confirmation screen that echoes back the exact email address the user submitted, plus a "resend email" button that temporarily disables itself with different button text for a couple of seconds to prevent accidental double-sends, and a "use a different email" control that clears the form and returns to step one.
- Leave the actual network call to a backend password-reset endpoint as a clearly commented placeholder inside the submit handler rather than a real fetch call, since every backend's reset-token API differs.
- Ensure the confirmation step's content and behavior does not vary based on whether the submitted email is valid or registered in any real system — the same confirmation UI must show regardless, to avoid revealing which emails have accounts.`,
    },
  },
};

export default passwordResetForm;
