const resendOtpTimer = {
  id: 'resend-otp-timer',
  title: 'Resend OTP Cooldown Timer',
  lastmod: '2026-08-24',
  category: 'forms',
  cdnUrls: [],
  html: `<div class="rot-card">
  <div class="rot-icon">✉</div>
  <h3>Check your inbox</h3>
  <p class="rot-sub">We sent a 6-digit code to <strong>you@example.com</strong></p>
  <div class="rot-otp" id="rotOtp">
    <input maxlength="1" inputmode="numeric" />
    <input maxlength="1" inputmode="numeric" />
    <input maxlength="1" inputmode="numeric" />
    <input maxlength="1" inputmode="numeric" />
    <input maxlength="1" inputmode="numeric" />
    <input maxlength="1" inputmode="numeric" />
  </div>
  <button class="rot-verify" id="rotVerify">Verify code</button>
  <div class="rot-resend-row">
    <span id="rotIdle" hidden>Didn't get a code?</span>
    <button class="rot-resend-link" id="rotResendBtn" hidden>Resend code</button>
    <span class="rot-countdown" id="rotCountdown">Resend available in <strong id="rotSeconds">30</strong>s</span>
  </div>
  <p class="rot-status" id="rotStatus" hidden></p>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.rot-card{background:#fff;border-radius:18px;padding:32px 28px;width:100%;max-width:360px;text-align:center;box-shadow:0 4px 24px rgba(15,23,42,.08)}
.rot-icon{width:48px;height:48px;border-radius:50%;background:#eef2ff;color:#6366f1;font-size:20px;display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
.rot-card h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:6px}
.rot-sub{font-size:12.5px;color:#64748b;margin-bottom:20px}
.rot-sub strong{color:#334155}
.rot-otp{display:flex;gap:7px;justify-content:center;margin-bottom:18px}
.rot-otp input{width:38px;height:46px;text-align:center;font-size:19px;font-weight:700;font-family:monospace;color:#0f172a;border:2px solid #e2e8f0;border-radius:9px;outline:none;background:#f8fafc;transition:border-color .15s,box-shadow .15s}
.rot-otp input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12);background:#fff}
.rot-otp input.filled{border-color:#6366f1;background:#eef2ff}
.rot-verify{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:9px;font-size:14px;font-weight:700;cursor:pointer;margin-bottom:14px;transition:background .15s}
.rot-verify:hover{background:#4f46e5}
.rot-resend-row{font-size:12.5px;color:#64748b;display:flex;align-items:center;justify-content:center;gap:5px;flex-wrap:wrap}
.rot-resend-link{background:none;border:none;color:#6366f1;font-weight:700;font-size:12.5px;cursor:pointer;font-family:inherit;padding:0}
.rot-resend-link:hover{text-decoration:underline}
.rot-countdown strong{color:#334155}
.rot-status{margin-top:12px;font-size:12.5px;font-weight:600;color:#059669;background:#ecfdf5;border-radius:8px;padding:8px}
.rot-status[hidden]{display:none}`,
  js: `(function(){
  var inputs = Array.prototype.slice.call(document.querySelectorAll('#rotOtp input'));
  var verifyBtn = document.getElementById('rotVerify');
  var idleSpan = document.getElementById('rotIdle');
  var resendBtn = document.getElementById('rotResendBtn');
  var countdownEl = document.getElementById('rotCountdown');
  var secondsEl = document.getElementById('rotSeconds');
  var statusEl = document.getElementById('rotStatus');

  var DURATION = 30;
  var remaining = DURATION;
  var timerId = null;

  inputs.forEach(function (inp, i) {
    inp.addEventListener('input', function () {
      inp.value = inp.value.replace(/\\D/g, '');
      inp.classList.toggle('filled', !!inp.value);
      if (inp.value && i < inputs.length - 1) inputs[i + 1].focus();
    });
    inp.addEventListener('keydown', function (e) {
      if (e.key === 'Backspace' && !inp.value && i > 0) inputs[i - 1].focus();
    });
  });

  function startCountdown() {
    remaining = DURATION;
    idleSpan.hidden = true;
    resendBtn.hidden = true;
    countdownEl.hidden = false;
    secondsEl.textContent = String(remaining);
    clearInterval(timerId);
    timerId = setInterval(function () {
      remaining -= 1;
      secondsEl.textContent = String(remaining);
      if (remaining <= 0) {
        clearInterval(timerId);
        countdownEl.hidden = true;
        idleSpan.hidden = false;
        resendBtn.hidden = false;
      }
    }, 1000);
  }

  resendBtn.addEventListener('click', function () {
    inputs.forEach(function (inp) { inp.value = ''; inp.classList.remove('filled'); });
    inputs[0].focus();
    statusEl.hidden = false;
    statusEl.textContent = 'A new code has been sent.';
    setTimeout(function () { statusEl.hidden = true; }, 2500);
    startCountdown();
  });

  verifyBtn.addEventListener('click', function () {
    var code = inputs.map(function (i) { return i.value; }).join('');
    statusEl.hidden = false;
    if (code.length === 6) {
      statusEl.style.color = '#059669';
      statusEl.style.background = '#ecfdf5';
      statusEl.textContent = 'Code ' + code + ' verified.';
    } else {
      statusEl.style.color = '#dc2626';
      statusEl.style.background = '#fef2f2';
      statusEl.textContent = 'Enter all 6 digits before verifying.';
    }
  });

  startCountdown();
})();`,
  seo: {
    title: 'Resend OTP Cooldown Timer — Free HTML CSS JS Verification Snippet',
    description: 'A 6-digit OTP input paired with a resend cooldown timer that disables the resend action for 30 seconds, then swaps to a clickable link, built with setInterval.',
    about: {
      title: 'Resend OTP Cooldown Timer — setInterval-Driven Rate Limiting UI',
      description: `Every OTP verification screen needs a way to request a new code, but an unrestricted "resend" button invites accidental spam-clicking and makes it trivial to hammer an SMS or email provider's API. This snippet pairs a standard 6-digit OTP input with a visible cooldown timer that keeps the resend action disabled and counting down for 30 seconds before swapping it for a clickable link.

**One countdown function, called twice**

\`startCountdown()\` resets \`remaining\` to \`DURATION\`, shows the countdown text, hides the resend link, and starts a \`setInterval\` that decrements \`remaining\` and updates \`secondsEl.textContent\` once per second. The same function runs both on initial page load and again every time the user clicks resend — there's no duplicated timer logic between the "first send" and "resend" cases.

**Swapping UI state instead of just disabling a button**

Rather than a resend button that's merely \`disabled\` with grayed-out styling, the countdown text itself replaces the button entirely (\`countdownEl.hidden = false\` / \`resendBtn.hidden = true\`) — showing exactly how many seconds remain is more informative than a disabled control with no explanation, and it removes any temptation to keep clicking a dead button.

**Clearing the previous interval before starting a new one**

\`clearInterval(timerId)\` runs at the top of \`startCountdown()\` before the new \`setInterval\` is created. Without this, clicking resend while an old interval was somehow still running (or calling the function twice in quick succession) would stack multiple intervals decrementing \`remaining\` simultaneously, causing the countdown to run too fast.

**Resend clears and refocuses the OTP boxes**

Clicking resend doesn't just restart the timer — it also clears every input's value and \`filled\` class and moves focus back to the first box, matching the mental model that a new code invalidates whatever was previously typed, and puts the cursor exactly where the user needs to start typing the new code.

**Independent verify feedback**

The verify button's handler is entirely separate from the countdown — it just checks whether all six boxes are filled and shows a success or error status message, styled with inline color/background changes so the same \`statusEl\` element can represent both outcomes without two separate DOM nodes.

**Customizing it**

Change \`DURATION\` to match your provider's actual rate limit, replace the resend click handler's placeholder with a real API call, or add a maximum resend attempt counter that permanently disables the action after N tries.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The OTP input renders with a 30-second "Resend available in 30s" countdown already running.` },
      { title: 'Watch the countdown', text: `The number ticks down once per second until it reaches zero.` },
      { title: 'Click Resend code', text: `Once the countdown ends, a clickable "Resend code" link appears in its place.` },
      { title: 'Trigger a resend', text: `Clicking it clears the OTP boxes, refocuses the first one, shows a confirmation message, and restarts the 30-second countdown.` },
      { title: 'Change the duration', text: `In the JS, edit the DURATION constant to match your SMS or email provider's actual rate limit.` },
      { title: 'Wire up real APIs', text: `Replace the resend handler's placeholder logic with a fetch() call to your backend's resend endpoint, and connect verify() to your verification API.` },
    ] },
    features: [
      { title: 'Visible countdown, not just a disabled button', text: `Shows exact remaining seconds instead of a silent disabled state.` },
      { title: 'Single reusable countdown function', text: `startCountdown() drives both the initial send and every subsequent resend with no duplicated logic.` },
      { title: 'Interval cleared before restart', text: `clearInterval() runs first every time, preventing stacked timers from double-speeding the countdown.` },
      { title: 'Auto-clearing OTP boxes on resend', text: `All six inputs reset and refocus to the first box when a new code is requested.` },
      { title: 'Auto-focus advance and backspace nav', text: `The OTP input itself supports the same auto-advance and backspace-to-previous behavior users expect.` },
      { title: 'Temporary confirmation message', text: `A "new code sent" message appears and auto-dismisses after 2.5 seconds.` },
      { title: 'Independent verify feedback', text: `Success and error states share one status element styled inline per outcome.` },
      { title: 'Zero dependencies', text: `Pure HTML, CSS, and vanilla JavaScript — no countdown or OTP library.` },
    ],
    useCases: [
      { title: 'SMS and email 2FA flows', text: `Prevent accidental resend spam while giving users a clear path to request a new code.` },
      { title: 'Account sign-up verification', text: `Rate-limit resend requests during email verification on registration.` },
      { title: 'Password reset flows', text: `Apply the same cooldown pattern to reset-code delivery.` },
      { title: 'Payment confirmation PINs', text: `Prevent repeated PIN resend requests during checkout security steps.` },
      { title: 'API-cost-sensitive verification', text: `Protect SMS provider spend by making resend genuinely rate-limited in the UI, not just the backend.` },
      { title: 'Learning setInterval state management', text: `A clean example of starting, updating, and clearing a JavaScript interval tied to UI state.` },
    ],
    faqs: [
      { q: `Why show a countdown instead of just disabling the resend button?`, a: `A disabled button with no explanation leaves users guessing why they can't click it or how long to wait. Showing "Resend available in 24s" and ticking it down gives a clear, specific reason and expectation, which reduces frustration and repeated clicking attempts.` },
      { q: `Why does startCountdown() call clearInterval() before creating a new interval?`, a: `Without clearing any existing interval first, calling startCountdown() a second time (for example from a resend click) would create a second setInterval running alongside the first, causing remaining to decrement twice per second and the countdown to finish in half the expected time.` },
      { q: `How do I change the cooldown duration?`, a: `Edit the DURATION constant near the top of the JS. It's used both to reset remaining at the start of every countdown and doesn't need to be changed anywhere else — the display and interval logic both read from the same variable.` },
      { q: `How do I connect the resend button to a real API?`, a: `Inside the resend button's click handler, replace or supplement the input-clearing logic with a fetch() POST to your resend endpoint. Only call startCountdown() again once that request succeeds, and show an error status instead if it fails, so the timer doesn't restart on a failed send.` },
      { q: `What happens if the user closes the tab and comes back before the countdown finishes?`, a: `As written, the countdown is purely in-memory and resets to the full duration on page reload. For a persistent cooldown across reloads, store the countdown's end timestamp in localStorage or sessionStorage and compute remaining as the difference from Date.now() when the page loads.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the interval bookkeeping by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why clearInterval() runs before every new setInterval call in startCountdown(), and how reusing the same function for the initial send and every resend avoids duplicated countdown logic. The same assistant can help optimize it too — ask whether the countdown should persist across a page reload using a stored end timestamp instead of resetting from DURATION every time. It's also useful for extending the flow: ask it to add a maximum resend attempt limit, persist the cooldown in localStorage, or add a shake animation when verification fails. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "resend OTP cooldown timer" paired with a 6-digit code input in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A row of six single-character numeric inputs with the standard OTP behavior: auto-advance focus to the next box after a digit is typed, backspace moves focus to the previous box when the current box is already empty, and non-digit characters are stripped.
- A countdown area that starts immediately on page load showing "Resend available in Ns" where N counts down once per second from a configurable duration constant, using setInterval.
- Once the countdown reaches zero, hide the countdown text and reveal a clickable "Resend code" link in its place.
- Clicking resend must: clear every OTP box's value and visual filled state, move focus back to the first box, briefly show a "new code sent" confirmation message that auto-dismisses after a couple of seconds, and restart the same countdown function from the full duration.
- The countdown-starting function must clear any previous interval before starting a new one, so that clicking resend never results in two intervals running simultaneously and the countdown speeding up.
- A separate "Verify" button that checks whether all six boxes are filled and shows a success or error status message accordingly, independent of the resend/countdown logic.`,
    },
  },
};

export default resendOtpTimer;
