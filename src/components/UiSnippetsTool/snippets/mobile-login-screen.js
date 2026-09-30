const mobileLoginScreen = {
  id: 'mobile-login-screen',
  title: 'Mobile Login Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mls-phone">
  <div class="mls-screen">
    <div class="mls-status"><span>9:41</span><span class="mls-batt"><i></i></span></div>
    <div class="mls-body">
      <div class="mls-brand"><div class="mls-logo"></div><span>Northwind</span></div>
      <h1 class="mls-title">Welcome back</h1>
      <p class="mls-sub">Sign in to continue to your account</p>
      <form id="mlsForm" novalidate>
        <label class="mls-field">
          <span>Email</span>
          <input type="email" id="mlsEmail" value="" placeholder="you@example.com" autocomplete="off">
          <em class="mls-err" id="mlsEmailErr"></em>
        </label>
        <label class="mls-field">
          <span>Password</span>
          <div class="mls-pw">
            <input type="password" id="mlsPw" placeholder="••••••••" autocomplete="off">
            <button type="button" class="mls-eye" id="mlsEye" aria-label="Show password">
              <svg viewBox="0 0 24 24" width="18" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        </label>
        <a class="mls-forgot" href="#">Forgot password?</a>
        <button type="submit" class="mls-submit" id="mlsSubmit">Sign in</button>
      </form>
      <div class="mls-or"><span>or continue with</span></div>
      <div class="mls-social"><button type="button">Google</button><button type="button">Apple</button></div>
      <p class="mls-foot">No account? <a href="#">Create one</a></p>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mls-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mls-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#fff;color:#0f172a;display:flex;flex-direction:column}
.mls-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700}
.mls-batt{width:22px;height:11px;border:1.4px solid #0f172a;border-radius:3px;position:relative;display:inline-block}
.mls-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:#0f172a;border-radius:0 1px 1px 0}
.mls-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:65%;background:#0f172a;border-radius:1px}

.mls-body{flex:1;overflow-y:auto;padding:26px 24px 20px;scrollbar-width:none;-ms-overflow-style:none}
.mls-body::-webkit-scrollbar{display:none}
.mls-brand{display:flex;align-items:center;gap:9px;margin-bottom:30px}
.mls-logo{width:30px;height:30px;border-radius:9px;background:linear-gradient(135deg,#6366f1,#22d3ee)}
.mls-brand span{font-size:15px;font-weight:800}
.mls-title{font-size:25px;font-weight:800}
.mls-sub{font-size:13px;color:#94a3b8;margin:5px 0 22px}

.mls-field{display:block;margin-bottom:15px}
.mls-field>span{font-size:11.5px;font-weight:700;color:#64748b;display:block;margin-bottom:6px}
.mls-field input{width:100%;border:1.5px solid #e2e8f0;border-radius:11px;padding:12px 13px;font-size:14px;font-family:inherit;outline:none;transition:border-color .15s}
.mls-field input:focus{border-color:#6366f1}
.mls-field.bad input{border-color:#ef4444}
.mls-err{display:block;font-size:11px;color:#ef4444;font-style:normal;margin-top:5px;min-height:13px}
.mls-pw{position:relative}
.mls-eye{position:absolute;right:8px;top:50%;transform:translateY(-50%);background:none;border:none;color:#94a3b8;cursor:pointer;padding:5px}
.mls-eye:hover{color:#475569}

.mls-forgot{display:block;text-align:right;font-size:12px;font-weight:600;color:#6366f1;text-decoration:none;margin-bottom:18px}
.mls-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:12px;padding:14px;font-size:14.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.mls-submit:hover{background:#4f46e5}
.mls-submit.loading{background:#818cf8;pointer-events:none}

.mls-or{display:flex;align-items:center;gap:10px;margin:20px 0;color:#94a3b8;font-size:11.5px}
.mls-or::before,.mls-or::after{content:'';flex:1;height:1px;background:#e2e8f0}
.mls-social{display:flex;gap:10px}
.mls-social button{flex:1;border:1.5px solid #e2e8f0;background:#fff;border-radius:11px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.mls-social button:hover{background:#f8fafc}
.mls-foot{text-align:center;font-size:12.5px;color:#64748b;margin-top:20px}
.mls-foot a{color:#6366f1;font-weight:700;text-decoration:none}`,

  js: `var form = document.getElementById('mlsForm');
var email = document.getElementById('mlsEmail');
var emailErr = document.getElementById('mlsEmailErr');
var pw = document.getElementById('mlsPw');
var eye = document.getElementById('mlsEye');
var submit = document.getElementById('mlsSubmit');

eye.addEventListener('click', function () {
  var show = pw.type === 'password';
  pw.type = show ? 'text' : 'password';
  eye.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  eye.style.color = show ? '#6366f1' : '';
});

function validEmail(v) { return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(v); }

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var field = email.closest('.mls-field');
  if (!validEmail(email.value)) {
    field.classList.add('bad');
    emailErr.textContent = email.value ? 'Enter a valid email address' : 'Email is required';
    email.focus();
    return;
  }
  field.classList.remove('bad'); emailErr.textContent = '';
  if (pw.value.length < 6) { pw.focus(); pw.closest('.mls-field').classList.add('bad'); return; }
  pw.closest('.mls-field').classList.remove('bad');

  // Fake auth round-trip so the button shows its loading state.
  submit.classList.add('loading'); submit.textContent = 'Signing in…';
  setTimeout(function () { submit.classList.remove('loading'); submit.textContent = 'Signed in ✓'; }, 1300);
});

email.addEventListener('input', function () { email.closest('.mls-field').classList.remove('bad'); emailErr.textContent = ''; });`,

  seo: {
    title: 'Mobile Login Screen — Free App Sign In UI Snippet',
    description: `A complete mobile login screen with email validation, a password show/hide toggle, a loading submit, and social buttons. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Mobile Login Screen — App Sign-In UI with Validation',
      description: `A mobile login screen is the sign-in flow of an app — branding, email and password fields, a forgot-password link, a primary submit, and social options. This snippet is a complete, working one inside a CSS phone frame, with real inline validation, a password reveal toggle, and a loading submit state, built in HTML, CSS, and vanilla JavaScript with no dependency. It's a ready starting point for any app's auth screen.

**Inline validation on submit**

Submitting runs lightweight validation: the email is checked against a pragmatic regex (\`/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/\` — non-space, an @, more non-space, a dot, a TLD), and the password for a minimum length. A failing field gets a \`.bad\` class that turns its border red and shows a specific message ("Email is required" vs "Enter a valid email address"), and focus jumps to the first problem. The error clears as soon as the user edits the field, so the form guides rather than nags.

**Password show/hide**

The reveal button swaps the input's \`type\` between \`password\` and \`text\` and updates its \`aria-label\` and color accordingly — the standard, accessible pattern for letting users verify what they typed without exposing it permanently. It's a single toggle with no second input.

**A submit that shows progress**

On a valid submit, the button enters a \`.loading\` state (disabled via \`pointer-events:none\`, lightened, label changed to "Signing in…") and, after a simulated round-trip, confirms success. In production you'd await your auth call here; the choke point is one handler, so wiring a real request is a one-line change.

**The screen layout**

Inside the phone frame, the screen is a scrollable column: brand row, heading, the form, an "or continue with" divider built from a flex row with \`::before\`/\`::after\` rules, and social buttons. The status bar with a CSS battery completes the device illusion. Everything is real, focusable, keyboard-navigable DOM.

**Reusing it**

Drop it into a [phone mockup](/ui-snippets/phone-mockup/) for a marketing shot, or lift the form out of the frame to use as a responsive web login. Replace the validation and submit handler with your auth provider, keep the structure, and you have a production-ready sign-in screen.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A mobile login screen renders inside a phone frame.` },
      { title: 'Submit empty', text: `The email field turns red with a required message.` },
      { title: 'Enter a bad email', text: `Validation shows a specific invalid-email error.` },
      { title: 'Toggle the password', text: `The eye button reveals and hides what you typed.` },
      { title: 'Submit valid data', text: `The button shows a loading state then confirms success.` },
      { title: 'Wire your auth', text: `Replace the simulated round-trip with your provider.` },
    ] },
    features: [
      { title: 'Complete auth screen', text: `Branding, fields, forgot link, submit, and social.` },
      { title: 'Inline validation', text: `Email regex and password length with focus jump.` },
      { title: 'Specific errors', text: `Distinguishes required from invalid input.` },
      { title: 'Self-clearing errors', text: `Messages disappear as the user edits.` },
      { title: 'Password reveal', text: `Accessible show/hide with aria-label updates.` },
      { title: 'Loading submit', text: `Disabled, labeled state for the auth round-trip.` },
      { title: 'CSS divider', text: `An or-continue-with rule from pseudo-elements.` },
      { title: 'No dependency', text: `Pure HTML/CSS/JS, real focusable DOM.` },
    ],
    useCases: [
      { title: 'App sign-in', text: `Present auth inside a [phone mockup](/ui-snippets/phone-mockup/).` },
      { title: 'Onboarding flows', text: `Follow a [mobile lock screen](/ui-snippets/mobile-lock-screen/) into login.` },
      { title: 'Web login pages', text: `Lift the form out as a responsive [glassmorphism login](/ui-snippets/glassmorphism-login/) alternative.` },
      { title: 'Magic-link and OTP', text: `Pair with [magic link login](/ui-snippets/magic-link-login/) or [OTP verification](/ui-snippets/otp-verification/).` },
      { title: 'Design handoff', text: `Show the screen beside a [mobile onboarding](/ui-snippets/mobile-onboarding/) flow.` },
      { title: 'Learning form UX', text: `A reference for inline validation and reveal toggles.` },
      { icon: 'CODE', title: 'Related: Mobile Fitness Screen', desc: 'See the [Mobile Fitness Screen](/ui-snippets/mobile-fitness-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the email validation work?', a: `On submit, the email is tested against the regex /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ — it requires non-space characters, an @, more non-space, a dot, and a domain ending. If it fails, the field gets a red border and a specific message: "Email is required" when empty, or "Enter a valid email address" when malformed. The error clears as soon as you start editing.` },
      { q: 'How does the password show/hide toggle work?', a: `The eye button flips the password input's type attribute between password and text, which reveals or masks the characters, and updates the button's aria-label and color so screen readers and sighted users both know the current state. It's a single input with a toggle, not two overlapping fields.` },
      { q: 'What does the loading state on the button do?', a: `When validation passes, the submit button gets a loading class that lightens it, disables interaction with pointer-events:none, and changes the label to "Signing in…". The snippet simulates a round-trip with a timeout then shows success; in a real app you'd await your authentication call in that same handler.` },
      { q: 'Can I use the form outside the phone frame?', a: `Yes. The phone frame is just a wrapper; the form and its validation are independent. Lift the form markup out and it works as a responsive web login. The frame is useful for presentations and app mockups, but nothing in the logic depends on it.` },
      { q: 'How do I use this login screen in React, Vue, or Angular?', a: `Bind the email and password to state, run the validation in your submit handler, and toggle error classes from validation results. The password reveal flips an input type bound to a showPassword flag. Replace the timeout with your auth API call and manage the loading flag in state. Tailwind styles the fields, divider, and buttons with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to parse the regex or the validation branching by eye. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the email pattern /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/ does and does not catch, or why the submit handler checks email validity before password length rather than validating both fields at once. The same assistant is useful for optimizing it — ask whether focusing the first invalid field on every submit attempt could be jarring for users with multiple errors, or how you would debounce the input listener if you added live validation instead of validate-on-submit. It is just as good for extending the form: have it add a password-strength meter, a "remember me" checkbox wired into the submit payload, or real OAuth redirects behind the Google and Apple buttons instead of inert click handlers. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile app login/sign-in screen in plain HTML, CSS, and JavaScript inside a phone-frame container — no validation library.

Requirements:
- A branding row, a heading and subheading, an email field, a password field with a show/hide toggle button, a forgot-password link, a primary submit button, a divider labeled "or continue with" built from flexbox and pseudo-element rule lines rather than an image, two social login buttons, and a footer link to create an account.
- On submit, prevent the default form submission and validate the email against a regular expression requiring non-space characters, an at sign, more non-space characters, a literal dot, and a trailing domain segment; if it fails, add an error-state class to the field's wrapper, show a message that specifically distinguishes an empty field ("Email is required") from a malformed one ("Enter a valid email address"), and move focus to the email input, without checking the password yet.
- If the email passes, validate that the password meets a minimum character length; if it fails, add the same kind of error-state class and move focus to the password field.
- Clear a field's error state and message as soon as the user types in it again, before the next submit attempt.
- The password field's show/hide button must toggle the input's type attribute between password and text, and update its own aria-label to reflect the current action ("Show password" vs "Hide password").
- On a fully valid submit, put the submit button into a disabled-looking loading state with pointer-events turned off and a changed label, then after a short simulated delay, show a success label — structured so a real async authentication call could be dropped into that same handler with minimal changes.`,
    },
  },
};

export default mobileLoginScreen;
