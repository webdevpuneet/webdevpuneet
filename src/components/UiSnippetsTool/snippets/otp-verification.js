const otpVerification = {
  id: 'otp-verification',
  title: 'OTP Verification Screen',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<div class="otv-card">
  <div class="otv-icon">
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
  </div>
  <h2>Verify your email</h2>
  <p>We sent a 6-digit code to <b>alex@example.com</b>. Enter it below.</p>

  <div class="otv-inputs" id="otvInputs">
    <input type="text" inputmode="numeric" maxlength="1" autocomplete="one-time-code">
    <input type="text" inputmode="numeric" maxlength="1">
    <input type="text" inputmode="numeric" maxlength="1">
    <input type="text" inputmode="numeric" maxlength="1">
    <input type="text" inputmode="numeric" maxlength="1">
    <input type="text" inputmode="numeric" maxlength="1">
  </div>

  <p class="otv-status" id="otvStatus"></p>

  <button type="button" class="otv-verify" id="otvVerify" disabled>Verify</button>
  <p class="otv-resend">Didn't get it? <button type="button" id="otvResend" disabled>Resend code</button></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:50px 24px}

.otv-card{background:#fff;border-radius:18px;padding:30px 28px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(15,23,42,.12);text-align:center}
.otv-icon{width:52px;height:52px;border-radius:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.otv-card h2{font-size:19px;font-weight:800;color:#0f172a;margin-bottom:8px}
.otv-card p{font-size:13px;color:#64748b;line-height:1.55;margin-bottom:20px}
.otv-card p b{color:#1e293b}

.otv-inputs{display:flex;gap:9px;justify-content:center;margin-bottom:14px}
.otv-inputs input{width:46px;height:54px;border:1.5px solid #e2e8f0;border-radius:11px;text-align:center;font-size:22px;font-weight:800;color:#0f172a;font-family:inherit;transition:border-color .15s,box-shadow .15s}
.otv-inputs input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.otv-inputs input.filled{border-color:#6366f1;background:#f5f3ff}
.otv-inputs.error input{border-color:#ef4444;animation:otvShake .3s}
.otv-inputs.success input{border-color:#22c55e;background:#f0fdf4}
@keyframes otvShake{0%,100%{transform:translateX(0)}25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}

.otv-status{font-size:12.5px;font-weight:600;min-height:18px;margin-bottom:16px}
.otv-status.err{color:#dc2626}
.otv-status.ok{color:#16a34a}

.otv-verify{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s,opacity .15s}
.otv-verify:hover:not(:disabled){background:#4f46e5}
.otv-verify:disabled{opacity:.45;cursor:not-allowed}

.otv-resend{font-size:12.5px;color:#94a3b8;margin-top:16px}
.otv-resend button{background:none;border:none;color:#6366f1;font-weight:700;cursor:pointer;font-size:12.5px}
.otv-resend button:disabled{color:#94a3b8;cursor:default}`,

  js: `var CORRECT = '123456';   // demo code — replace with a real server check
var wrap = document.getElementById('otvInputs');
var inputs = Array.prototype.slice.call(wrap.querySelectorAll('input'));
var verifyBtn = document.getElementById('otvVerify');
var statusEl = document.getElementById('otvStatus');
var resendBtn = document.getElementById('otvResend');
var cooldown = 0, timer = null;

function code() { return inputs.map(function (i) { return i.value; }).join(''); }

function refresh() {
  inputs.forEach(function (i) { i.classList.toggle('filled', i.value !== ''); });
  verifyBtn.disabled = code().length !== 6;
}

inputs.forEach(function (input, idx) {
  input.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '').slice(0, 1);
    wrap.classList.remove('error');
    statusEl.textContent = '';
    if (this.value && idx < inputs.length - 1) inputs[idx + 1].focus();
    refresh();
    if (code().length === 6) verify();   // auto-submit when full
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Backspace' && !this.value && idx > 0) inputs[idx - 1].focus();
    if (e.key === 'ArrowLeft' && idx > 0) inputs[idx - 1].focus();
    if (e.key === 'ArrowRight' && idx < inputs.length - 1) inputs[idx + 1].focus();
  });
  input.addEventListener('paste', function (e) {
    e.preventDefault();
    var digits = (e.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '').slice(0, 6);
    inputs.forEach(function (inp, i) { inp.value = digits[i] || ''; });
    refresh();
    (inputs[digits.length] || inputs[5]).focus();
    if (digits.length === 6) verify();
  });
});

function verify() {
  var entered = code();
  if (entered.length !== 6) return;
  // Replace with a real fetch to your verify endpoint.
  if (entered === CORRECT) {
    wrap.classList.remove('error'); wrap.classList.add('success');
    statusEl.textContent = '✓ Verified! Redirecting…'; statusEl.className = 'otv-status ok';
    verifyBtn.disabled = true; inputs.forEach(function (i) { i.disabled = true; });
  } else {
    wrap.classList.add('error');
    statusEl.textContent = 'That code is incorrect. Try again.'; statusEl.className = 'otv-status err';
    setTimeout(function () { inputs.forEach(function (i) { i.value = ''; }); inputs[0].focus(); refresh(); wrap.classList.remove('error'); }, 700);
  }
}

verifyBtn.addEventListener('click', verify);

function startCooldown() {
  cooldown = 30; resendBtn.disabled = true;
  clearInterval(timer);
  timer = setInterval(function () {
    cooldown--;
    resendBtn.textContent = cooldown > 0 ? 'Resend in ' + cooldown + 's' : 'Resend code';
    if (cooldown <= 0) { clearInterval(timer); resendBtn.disabled = false; }
  }, 1000);
}
resendBtn.addEventListener('click', function () {
  if (this.disabled) return;
  inputs.forEach(function (i) { i.value = ''; i.disabled = false; }); refresh();
  wrap.className = 'otv-inputs'; statusEl.textContent = 'A new code is on its way.'; statusEl.className = 'otv-status ok';
  inputs[0].focus();
  startCooldown();
});

inputs[0].focus();
startCooldown();`,

  seo: {
    title: 'OTP Verification Screen — 2FA Code Input UI',
    description: `A 6-digit OTP verification screen with auto-advance, paste-to-fill, auto-submit, error shake, and a resend countdown. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'OTP Verification Screen — Auto-Advancing Code Boxes with Resend Timer',
      description: `Entering a one-time passcode is a high-friction moment in any sign-in or sign-up flow — the user is switching between their inbox or SMS and your form, and every fumbled keystroke risks abandonment. A well-built OTP screen removes that friction: digits auto-advance, a pasted code fills every box at once, and the form submits itself the moment all six are entered. This snippet builds that complete verification screen in plain HTML, CSS, and vanilla JavaScript.

**Auto-advance and backspace navigation**

Each of the six boxes holds a single digit. Typing a number moves focus to the next box automatically, and pressing Backspace in an empty box jumps to the previous one — so the user never has to manually tab between fields. Arrow keys move left and right too. Non-numeric input is stripped on the fly (\`inputmode="numeric"\` also brings up the number pad on mobile), so the field only ever contains digits. This auto-advance behavior is what makes entering a six-digit code feel like typing one number rather than filling six separate inputs.

**Paste the whole code at once**

The single most important convenience: pasting "123456" (or a code copied from an email) into any box fills all six. The paste handler extracts the digits, distributes them across the inputs, focuses the next empty box, and — if the paste completed the code — submits immediately. Combined with the \`autocomplete="one-time-code"\` attribute (which lets iOS and Android offer the SMS code above the keyboard), this means a user can often verify in a single tap.

**Auto-submit when complete**

The moment the sixth digit lands — whether typed or pasted — \`verify()\` runs automatically, so there's no separate "now click Verify" step in the common case. The explicit Verify button remains for accessibility and as a fallback, but the happy path is hands-off. This is the behavior users expect from modern auth flows and it measurably reduces drop-off at the verification step.

**Clear success and error feedback**

A correct code turns the boxes green with a "Verified!" status and locks the inputs. An incorrect code shakes the boxes (a short \`translateX\` keyframe), shows an error message, then clears and refocuses the first box so the user can retry without manually deleting six digits. The shake is a well-established pattern for "wrong input, try again" that reads instantly without needing to read the text.

**Resend with a cooldown**

A "Resend code" button sits below, gated by a live 30-second countdown ("Resend in 27s") so a user can't spam resend requests — the same anti-abuse pattern a real auth backend enforces server-side. Resending clears the boxes, resets the state, and restarts the timer. This handles the genuinely common case where the first code never arrives, without letting it become a way to hammer your SMS/email provider.

**Production notes**

The demo checks against a hardcoded code; a real build replaces that with a \`fetch\` to your verification endpoint and shows the success or error state from its response. The verification must always happen server-side — a client-side comparison is purely for the demo. The component exposes the entered code and the verify hook cleanly, so wiring it to Auth0, Firebase, Supabase, or your own backend is a one-function change.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A verification screen renders with six code boxes; the first is focused and a resend countdown starts.` },
      { title: 'Type the code', text: `Enter digits — focus auto-advances, and when all six are filled the form verifies automatically (try 123456).` },
      { title: 'Or paste it', text: `Paste a 6-digit code into any box — all six fill at once and it auto-submits.` },
      { title: 'See error handling', text: `Enter a wrong code — the boxes shake red, show an error, then clear and refocus for a retry.` },
      { title: 'Resend after the cooldown', text: `Wait out the 30-second timer, then click "Resend code" to reset and get a new code.` },
      { title: 'Connect your auth backend', text: `Replace the hardcoded CORRECT check in verify() with a fetch to your server's verification endpoint.` },
    ] },
    features: [
      { title: 'Auto-advancing digit boxes', text: `Typing a digit moves focus forward and Backspace moves it back, so entering the code feels like typing one number.` },
      { title: 'Paste-to-fill', text: `Pasting a 6-digit code into any box distributes it across all six and submits if complete.` },
      { title: 'Auto-submit on completion', text: `verify() fires the moment the last digit lands, removing the separate "click Verify" step on the happy path.` },
      { title: 'One-time-code autofill', text: `autocomplete="one-time-code" and inputmode="numeric" surface the SMS code and number pad on mobile.` },
      { title: 'Error shake and retry', text: `A wrong code shakes the boxes, shows an error, then clears and refocuses the first box automatically.` },
      { title: 'Green success state', text: `A correct code turns the boxes green, shows a verified status, and locks the inputs.` },
      { title: 'Resend cooldown timer', text: `A live 30-second countdown gates the resend button, preventing request spam like a real backend.` },
      { title: 'Full keyboard navigation', text: `Arrow keys, Backspace, and digit entry all move focus correctly across the six boxes.` },
    ],
    useCases: [
      { title: 'Two-factor authentication', text: `The code-entry step after password sign-in — pair with a [password requirements checklist](/ui-snippets/password-requirements-checklist/) on the signup side.` },
      { title: 'Email and phone verification', text: `Confirm a new account's email or phone with a sent code during onboarding.` },
      { title: 'Passwordless login', text: `Enter an emailed login code, complementing a [magic link login](/ui-snippets/magic-link-login/) as the code-based alternative.` },
      { title: 'Transaction and payment confirmation', text: `Verify a sensitive action (transfer, purchase) with a one-time code.` },
      { title: 'Device and session authorization', text: `Approve a new device sign-in with a code shown on a trusted device.` },
      { title: 'Learning multi-input UX', text: `A reference for auto-advance, paste distribution, and auto-submit — compare with an [OTP input](/ui-snippets/otp-input/) for the bare input and a [pin pad](/ui-snippets/pin-pad/) for keypad entry.` },
      { icon: 'CODE', title: 'Related: Transfer List', desc: 'See the [Transfer List](/ui-snippets/transfer-list/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I verify the code against my real backend?', a: `Replace the hardcoded CORRECT comparison in verify() with a fetch POST to your verification endpoint, sending the entered code; show the success state on a 200 and the error state on a rejection. Verification must happen server-side — a client-side check is only for the demo, since anyone can read the expected code in the page source.` },
      { q: 'How does paste-to-fill work across all six boxes?', a: `The paste handler intercepts the clipboard text, strips non-digits, takes the first six, and assigns one to each input in order, then focuses the next empty box. If the pasted value completes the code it auto-submits. This works no matter which box receives the paste, so the user can paste anywhere.` },
      { q: 'How do I make the SMS code autofill on mobile?', a: `The autocomplete="one-time-code" attribute on the first input lets iOS and Android suggest the most recent SMS code above the keyboard for one-tap entry, and inputmode="numeric" brings up the number pad. For the autofill to match, the SMS should follow the platform's format (including your domain on iOS), which is configured in how you send the message, not the markup.` },
      { q: 'Why auto-submit instead of requiring a button click?', a: `Once all six digits are entered there's no ambiguity about intent, so submitting automatically removes a redundant step and measurably cuts drop-off at the verification stage. The explicit Verify button stays as an accessible fallback and for users who paste a partial code, but the common path is hands-off.` },
      { q: 'How do I use this OTP screen in React, Vue, or Angular?', a: `In React, hold an array of six digit values in useState and refs for focus management, advancing focus in the onChange handler and verifying when full; in Vue, use a reactive array with template refs; in Angular, use a FormArray and ViewChildren. The auto-advance, paste, and cooldown logic port directly — only focus management uses each framework's ref mechanism.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace every branch of this state machine by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the code decides to call verify automatically once code().length hits six, including from both typing and pasting, or how startCooldown's setInterval keeps the resend button's countdown text and disabled state in sync without drifting. The same assistant can help optimize it too, for instance asking whether clearInterval is being called reliably enough to avoid stacking multiple timers if resend gets clicked in quick succession. It is also a fast way to extend the flow: ask it to add a visible countdown ring around the verify button, support voice-read-back of the entered digits for accessibility, or swap the hardcoded CORRECT check for a real fetch call with proper loading and network-error states. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 6-digit "OTP verification screen" in plain HTML, CSS, and JavaScript, with no framework and no input-mask library.

Requirements:
- Six single-character input boxes, each with inputmode numeric, and the first one carrying autocomplete one-time-code so mobile browsers can offer to autofill an SMS code.
- Typing a digit must strip non-numeric characters, advance focus to the next box, and check after every keystroke whether all six boxes are now filled — if so, call the verification function automatically without waiting for a button click.
- Support ArrowLeft and ArrowRight to move focus between boxes, and Backspace on an empty box to move focus to the previous box.
- A paste handler must intercept the paste event, extract only digits from the clipboard text, distribute them across the six boxes starting from the first, focus the next empty box (or the last box if all are filled), and trigger auto-verification if the pasted value completes all six digits.
- On successful verification, all six boxes must switch to a success visual style and become disabled, and a success message must appear; on failure, the boxes must play a shake animation, show an error message, then after a short delay automatically clear all six boxes and refocus the first one.
- Include a "Resend code" button that starts disabled with a live countdown (e.g. "Resend in 30s" ticking down once per second via setInterval), re-enabling itself and resetting its label only once the countdown reaches zero, and clicking it must clear the boxes, reset any error/success state, and restart the countdown.`,
    },
  },
};

export default otpVerification;
