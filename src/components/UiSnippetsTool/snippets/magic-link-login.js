const magicLinkLogin = {
  id: 'magic-link-login',
  title: 'Magic Link Login',
  lastmod: '2026-06-20',
  category: 'forms',
  html: `<div class="mll-card">
  <div class="mll-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
  </div>

  <div id="mllForm">
    <h3>Sign in</h3>
    <p>Enter your email and we'll send you a link — no password to remember.</p>
    <input type="email" id="mllEmail" placeholder="you@example.com" autocomplete="email">
    <p class="mll-error" id="mllError" hidden></p>
    <button type="button" class="mll-submit" id="mllSubmit">
      <span id="mllSubmitLabel">Send magic link</span>
    </button>
  </div>

  <div id="mllSent" hidden>
    <h3>Check your email</h3>
    <p>We sent a sign-in link to <strong id="mllSentEmail"></strong>. Click it on this device to continue.</p>
    <button type="button" class="mll-resend" id="mllResend">Resend link</button>
    <button type="button" class="mll-back" id="mllBack">Use a different email</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.mll-card{background:#fff;border-radius:18px;padding:28px;width:100%;max-width:360px;box-shadow:0 18px 44px rgba(15,23,42,.12);text-align:center}
.mll-icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}

.mll-card h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:7px}
.mll-card p{font-size:13px;color:#64748b;line-height:1.55;margin-bottom:16px}
.mll-card p strong{color:#1e293b}

#mllForm input{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 13px;font-size:14px;font-family:inherit;color:#0f172a;margin-bottom:8px;text-align:left;transition:border-color .15s,box-shadow .15s}
#mllForm input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.mll-error{color:#dc2626;font-size:12px;font-weight:600;text-align:left;margin-bottom:8px !important}

.mll-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s;display:flex;align-items:center;justify-content:center;gap:8px}
.mll-submit:hover{background:#4f46e5}
.mll-submit:disabled{opacity:.7;cursor:default}

.mll-resend{width:100%;background:transparent;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px;font-size:13.5px;font-weight:700;color:#1e293b;cursor:pointer;margin-bottom:8px;transition:background .15s}
.mll-resend:hover:not(:disabled){background:#f8fafc}
.mll-resend:disabled{color:#cbd5e1;cursor:default}
.mll-back{background:transparent;border:none;color:#94a3b8;font-size:12.5px;font-weight:600;cursor:pointer;padding:6px}
.mll-back:hover{color:#64748b}`,

  js: `var EMAIL_RE = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
var resendCooldown = 0;
var cooldownTimer = null;

function isValidEmail(v) { return EMAIL_RE.test(v.trim()); }

document.getElementById('mllSubmit').addEventListener('click', function () {
  var input = document.getElementById('mllEmail');
  var error = document.getElementById('mllError');
  var email = input.value.trim();

  if (!email) { error.textContent = 'Enter your email address.'; error.hidden = false; return; }
  if (!isValidEmail(email)) { error.textContent = 'That email address looks invalid.'; error.hidden = false; return; }
  error.hidden = true;

  var btn = this, label = document.getElementById('mllSubmitLabel');
  btn.disabled = true; label.textContent = 'Sending…';

  setTimeout(function () {
    document.getElementById('mllSentEmail').textContent = email;
    document.getElementById('mllForm').hidden = true;
    document.getElementById('mllSent').hidden = false;
    btn.disabled = false; label.textContent = 'Send magic link';
    startCooldown();
  }, 900);
});

function startCooldown() {
  resendCooldown = 30;
  var resend = document.getElementById('mllResend');
  resend.disabled = true;
  updateResendLabel();
  clearInterval(cooldownTimer);
  cooldownTimer = setInterval(function () {
    resendCooldown--;
    updateResendLabel();
    if (resendCooldown <= 0) {
      clearInterval(cooldownTimer);
      resend.disabled = false;
      resend.textContent = 'Resend link';
    }
  }, 1000);
}

function updateResendLabel() {
  var resend = document.getElementById('mllResend');
  resend.textContent = resendCooldown > 0 ? 'Resend link in ' + resendCooldown + 's' : 'Resend link';
}

document.getElementById('mllResend').addEventListener('click', function () {
  if (this.disabled) return;
  this.textContent = 'Sending…';
  var self = this;
  setTimeout(function () { startCooldown(); }, 600);
});

document.getElementById('mllBack').addEventListener('click', function () {
  clearInterval(cooldownTimer);
  document.getElementById('mllSent').hidden = true;
  document.getElementById('mllForm').hidden = false;
  document.getElementById('mllEmail').value = '';
  document.getElementById('mllEmail').focus();
});`,

  seo: {
    title: 'Magic Link Login — Passwordless Email Sign-In',
    description: `A passwordless "magic link" sign-in form with email validation, a check-your-email state, and a resend cooldown timer. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Magic Link Login — Passwordless Sign-In, Resend Cooldown & Check-Your-Email State',
      description: `Passwordless sign-in removes the single biggest source of authentication friction — a forgotten password — by sending a one-time sign-in link to a verified email instead. This snippet builds the complete client-side flow: email validation, a simulated send, a "check your email" confirmation screen, and a resend button gated by a real countdown so it can't be spammed.

**Two screens, one card**

The component is really two states sharing one container: the email-entry form and the check-your-email confirmation, toggled via \`hidden\`. Rather than navigating to a new page, swapping the inner content keeps the user anchored to the same card, which matters for a flow whose entire job is to get the user comfortable waiting for an email — a page navigation here would feel like the flow had "moved on" without them.

**Validation before the simulated send**

A simple regex (\`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\`) checks for a plausible email shape — not full RFC 5322 compliance, which is famously a rabbit hole no client-side regex fully solves, but the basic local-part@domain.tld shape that catches the vast majority of real typos. An empty field and an invalid shape get distinct messages, and the submit button disables with a "Sending…" label during the simulated 900ms delay, so the interaction reads as a real network round trip.

**A resend button with teeth**

The "Resend link" button isn't just decorative — clicking the original submit (or resend) starts a real 30-second countdown via \`setInterval\`, during which the resend button is disabled and shows "Resend link in 27s", ticking down live. This is a meaningful anti-abuse pattern: without it, a button that silently fires another email on every click is an easy way to accidentally (or deliberately) spam an inbox or a rate-limited API.

**Going back without losing context**

"Use a different email" clears the countdown timer, swaps back to the entry form, clears the input, and refocuses it — so correcting a typo'd email doesn't require a page reload and doesn't leave a stale countdown silently running in the background after the user has already navigated away from that state.

**Why this beats a traditional password field**

A password field comes with its own failure modes — weak passwords, reused passwords, forgotten passwords, and the support burden of a reset flow that itself usually emails a link anyway. Magic links collapse all of that into the one flow most users already trust: check email, click link, you're in. The tradeoff is a dependency on email deliverability, which is why the resend control and a clear "check your spam folder" expectation matter as much as the visual design.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Sign in" card renders with an email input and a "Send magic link" button.` },
      { title: 'Submit an invalid or empty email', text: `An inline error message appears below the field without sending anything.` },
      { title: 'Submit a valid email', text: `The button shows "Sending…", then the card swaps to a "Check your email" confirmation showing the address you entered.` },
      { title: 'Try resending', text: `The "Resend link" button is disabled with a live "Resend link in 30s" countdown immediately after sending.` },
      { title: 'Wait out the cooldown', text: `Once it reaches 0, the resend button re-enables and can be clicked to restart the cooldown.` },
      { title: 'Connect a real email-sending API', text: `Replace the setTimeout in the submit handler with a fetch call to your auth provider's magic-link endpoint, keeping the same UI state transitions.` },
    ] },
    features: [
      { title: 'Two-state card, no page navigation', text: `The email form and check-your-email confirmation share one container, toggled via hidden — no route change needed.` },
      { title: 'Practical email validation', text: `A pragmatic regex catches the common invalid shapes without claiming full RFC email compliance.` },
      { title: 'Distinct empty vs. invalid error messages', text: `Users get a specific reason for the error rather than one generic "invalid input" message.` },
      { title: 'Real resend cooldown', text: `A live 30-second countdown disables the resend button, preventing accidental or abusive repeat sends.` },
      { title: 'Simulated async submit state', text: `The submit button disables and relabels to "Sending…" during the request, reading as a real network call.` },
      { title: '"Use a different email" reset', text: `Going back clears the countdown timer and refocuses the input, avoiding stale background timers.` },
      { title: 'No password field anywhere', text: `The entire flow is built around the passwordless pattern from the first screen, not a password field with a "forgot password" afterthought.` },
      { title: 'Clean, focused single-purpose card', text: `No unrelated UI competing for attention — the card does exactly one job, the way a real auth screen should.` },
    ],
    useCases: [
      { title: 'SaaS and B2B app sign-in', text: `The increasingly standard sign-in pattern for tools like Slack, Notion, and Linear — pair with an [OTP input](/ui-snippets/otp-input/) if you also support a code-based fallback.` },
      { title: 'Newsletter and content gating', text: `Let readers sign in to save articles or comments without ever creating a password.` },
      { title: 'Low-friction onboarding', text: `Reduce sign-up abandonment by removing the password field from your very first user-facing screen.` },
      { title: 'Internal tools and admin panels', text: `A quick, password-free sign-in for trusted internal staff using their company email.` },
      { title: 'Mobile-first web apps', text: `Avoid the password-typing friction that's especially painful on a phone keyboard.` },
      { title: 'Learning multi-state card patterns', text: `A clear example of toggling between form and confirmation states in one container — compare with a [multi-step form](/ui-snippets/multi-step-form/) for a longer flow.` },
      { icon: 'CODE', title: 'Related: Return Label Generator', desc: 'See the [Return Label Generator](/ui-snippets/return-label-generator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I actually send the magic link email?', a: `Replace the setTimeout in the submit handler with a fetch POST to your auth provider (Supabase, Auth0, Firebase, or your own backend) passing the validated email; show the check-your-email state only after that request resolves successfully, and show the existing error element if it fails.` },
      { q: 'How do I handle the actual link click and sign the user in?', a: `The magic link itself points to a callback route in your app containing a one-time token; on that page, verify the token server-side, create a session, and redirect to your authenticated area — this snippet only covers the request side of the flow, not the callback handler.` },
      { q: 'How do I rate-limit resend attempts server-side too?', a: `Mirror the client-side 30-second cooldown with a server-side check (e.g. a timestamp stored per email/IP) so the cooldown can't be bypassed by simply reloading the page and resubmitting, since client-side timers alone are not a security control.` },
      { q: 'How do I add a fallback password or OTP option?', a: `Add a "Sign in with a password instead" link beneath the form that swaps to a password field, or combine with an [OTP input](/ui-snippets/otp-input/) for a code-based alternative if email delivery is unreliable for some users.` },
      { q: 'How do I use this magic link form in React, Vue, or Angular?', a: `In React, track the email, error, sent, and cooldown values in useState and run the countdown with setInterval inside useEffect (clearing it on unmount); in Vue, use ref()/onUnmounted for the same cleanup; in Angular, use a component field with ngOnDestroy. The validation regex and state transitions port directly.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reconstruct the two-screen-one-card structure by inspecting the markup cold. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely how toggling the hidden attribute on mllForm and mllSent swaps state without a page navigation, and why startCooldown() clears the previous interval with clearInterval before starting a new one. The same assistant can help optimize it, for instance asking whether the 30-second resend cooldown should also be enforced server-side so reloading the page cannot bypass the client-side timer entirely. It is also useful for extending the flow: ask it to wire the submit handler to a real auth provider's magic-link endpoint with proper error states, add a fallback password or OTP option for users whose email is slow to arrive, or persist the pending email across a page refresh using sessionStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "magic link login" flow in plain HTML, CSS, and JavaScript with no libraries, using a single card that toggles between two states rather than navigating to a new page.

Requirements:
- One card element containing two child sections, an email-entry form and a check-your-email confirmation, where exactly one is visible at a time via the hidden attribute (no separate route or page load involved in switching between them).
- Submitting the form must validate the email with a pragmatic regex (rejecting empty input and input without an @ and a domain with a dot) and show a specific, distinct error message for "empty" versus "invalid shape" — not one generic error string.
- On valid submission, disable the submit button and change its label to a sending state, then after a simulated delay reveal the confirmation section showing the exact email address that was submitted, and hide the form section.
- Revealing the confirmation section must start a real visible countdown (not just a disabled flag): a resend button that is disabled and shows the exact remaining seconds counting down once per second via setInterval, re-enabling itself and reverting its label only once the countdown reaches zero.
- Clicking resend while the countdown is at zero must restart the same cooldown sequence, and any previously running interval must be explicitly cleared before starting a new one so multiple intervals never stack.
- A "use a different email" control must clear the running cooldown interval, switch back to the form section, clear the email input's value, and return keyboard focus to that input.`,
    },
  },
};

export default magicLinkLogin;
