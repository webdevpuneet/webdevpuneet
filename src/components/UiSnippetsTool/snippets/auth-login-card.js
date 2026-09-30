const authLoginCard = {
  id: 'auth-login-card',
  title: 'Auth Login Card',
  category: 'forms',
  html: `<div class="wrap">
  <div class="card">
    <div class="logo"><div class="logo-icon">⚡</div></div>
    <h1 class="heading">Welcome back</h1>
    <p class="sub">Sign in to your account to continue.</p>
    <div class="socials">
      <button class="social-btn" onclick="socialLogin('Google')">
        <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
        Continue with Google
      </button>
      <button class="social-btn" onclick="socialLogin('GitHub')">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
        Continue with GitHub
      </button>
    </div>
    <div class="divider"><span>or continue with email</span></div>
    <form id="form" onsubmit="handleLogin(event)">
      <div class="field">
        <label class="lbl" for="email">Email address</label>
        <input class="inp" id="email" type="email" placeholder="you@company.com" autocomplete="email" required>
        <span class="err" id="emailErr"></span>
      </div>
      <div class="field">
        <div class="pass-row">
          <label class="lbl" for="pass">Password</label>
          <a class="forgot" href="#">Forgot password?</a>
        </div>
        <div class="inp-wrap">
          <input class="inp" id="pass" type="password" placeholder="••••••••" autocomplete="current-password" required>
          <button type="button" class="eye" id="eyeBtn" onclick="togglePwd()" title="Show/hide password">👁</button>
        </div>
        <span class="err" id="passErr"></span>
      </div>
      <label class="remember">
        <input type="checkbox" id="remember"> Keep me signed in
      </label>
      <button type="submit" class="submit" id="submitBtn">Sign in</button>
    </form>
    <p class="signup-link">Don't have an account? <a href="#">Sign up free</a></p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg,#1e1b4b,#312e81,#1e1b4b); min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 420px; }
.card { background: #fff; border-radius: 24px; padding: 36px 32px; box-shadow: 0 24px 64px rgba(0,0,0,0.35); }
.logo { display: flex; justify-content: center; margin-bottom: 20px; }
.logo-icon { width: 48px; height: 48px; background: linear-gradient(135deg,#6366f1,#8b5cf6); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; box-shadow: 0 4px 16px rgba(99,102,241,0.4); }
.heading { font-size: 22px; font-weight: 900; color: #0f172a; text-align: center; }
.sub { font-size: 14px; color: #64748b; text-align: center; margin-top: 6px; margin-bottom: 22px; }
.socials { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
.social-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 11px 16px; border: 1.5px solid #e2e8f0; border-radius: 12px; background: #fff; font-size: 14px; font-weight: 700; color: #1e293b; cursor: pointer; transition: all 0.15s; width: 100%; font-family: inherit; }
.social-btn:hover { background: #f8fafc; border-color: #94a3b8; }
.divider { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.divider::before, .divider::after { content: ''; flex: 1; height: 1px; background: #e2e8f0; }
.divider span { font-size: 12px; color: #94a3b8; font-weight: 600; white-space: nowrap; }
.field { margin-bottom: 16px; }
.lbl { font-size: 13px; font-weight: 700; color: #374151; margin-bottom: 6px; display: block; }
.pass-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.pass-row .lbl { margin-bottom: 0; }
.forgot { font-size: 12px; font-weight: 700; color: #6366f1; text-decoration: none; }
.forgot:hover { text-decoration: underline; }
.inp-wrap { position: relative; }
.inp { width: 100%; padding: 11px 14px; border: 1.5px solid #e2e8f0; border-radius: 11px; font-size: 14px; color: #1e293b; outline: none; font-family: inherit; transition: border-color 0.15s; }
.inp:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.inp.error { border-color: #ef4444; }
.eye { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); background: none; border: none; font-size: 16px; cursor: pointer; opacity: 0.5; padding: 2px 4px; }
.eye:hover { opacity: 1; }
.err { font-size: 12px; color: #ef4444; font-weight: 600; margin-top: 4px; display: block; min-height: 16px; }
.remember { display: flex; align-items: center; gap: 8px; font-size: 13px; color: #475569; cursor: pointer; margin-bottom: 18px; }
.remember input { accent-color: #6366f1; cursor: pointer; }
.submit { width: 100%; padding: 13px; background: #6366f1; color: #fff; border: none; border-radius: 12px; font-size: 15px; font-weight: 800; cursor: pointer; transition: background 0.15s; font-family: inherit; }
.submit:hover { background: #4f46e5; }
.submit:disabled { opacity: 0.6; cursor: not-allowed; }
.signup-link { text-align: center; font-size: 13px; color: #64748b; margin-top: 18px; }
.signup-link a { color: #6366f1; font-weight: 700; text-decoration: none; }
.signup-link a:hover { text-decoration: underline; }`,
  js: `function togglePwd() {
  var inp = document.getElementById('pass');
  inp.type = inp.type === 'password' ? 'text' : 'password';
}

function setError(id, msg) {
  var inp = document.getElementById(id);
  var err = document.getElementById(id + 'Err');
  inp.classList.toggle('error', !!msg);
  err.textContent = msg || '';
}

function handleLogin(e) {
  e.preventDefault();
  var email = document.getElementById('email').value.trim();
  var pass = document.getElementById('pass').value;
  var valid = true;

  if (!email || !/^[^@]+@[^@]+\\.[^@]+$/.test(email)) {
    setError('email', 'Please enter a valid email address.');
    valid = false;
  } else { setError('email', ''); }

  if (!pass || pass.length < 8) {
    setError('pass', 'Password must be at least 8 characters.');
    valid = false;
  } else { setError('pass', ''); }

  if (!valid) return;

  var btn = document.getElementById('submitBtn');
  btn.disabled = true;
  btn.textContent = 'Signing in…';

  // Simulate API call
  setTimeout(function() {
    btn.disabled = false;
    btn.textContent = 'Sign in';
    setError('email', 'No account found with this email.');
  }, 1500);
}

function socialLogin(provider) {
  var btn = event.currentTarget;
  btn.disabled = true;
  btn.textContent = 'Redirecting…';
  setTimeout(function() {
    btn.disabled = false;
    btn.innerHTML = btn.innerHTML; // reset
    location.reload();
  }, 1500);
}`,
  seo: {
    title: 'Auth Login Card — Sign-In Form UI Snippet',
    description: 'Auth login card with social sign-in buttons, email/password form, show/hide password, validation, and loading state. Exports to React, Vue & Angular.',
    about: {
      title: 'Auth Login Card — Social Sign-In, Validation, Show Password & Loading State',
      description: `A login card is the single most-visited UI in any authenticated application and one of the most-searched UI components on the web. First impressions of the authentication screen directly affect sign-up and sign-in completion rates. This snippet provides a production-quality login card with social sign-in buttons (Google and GitHub), an email/password form, client-side validation, a show/hide password toggle, a "Keep me signed in" checkbox, an inline loading state, and a forgot-password link — the full set of elements a real login screen needs.\n\n**Social sign-in first**\n\nThe [social sign-in buttons](/ui-snippets/social-login-buttons/) appear above the email form because most users prefer a one-click sign-in with a trusted provider over managing another password (a [magic link](/ui-snippets/magic-link-login/) is another low-friction option). The "or continue with email" divider is a standard pattern that lets the email form remain available without competing for visual attention. The divider uses flex with pseudo-element lines for a pure-CSS implementation that scales to any card width.\n\n**Client-side validation**\n\nThe form validates on submit (not on every keystroke, which is frustrating). Email is checked with a lightweight regex for the at-sign and dot pattern. Password requires at least eight characters. setError() applies an error border class and writes a message below the field; a successful field clears both. The error state persists until the user fixes it and re-submits, which is the right convention — clearing the message on every keystroke is distracting.\n\n**Loading state**\n\nOn submission, the button is disabled and its label changes to "Signing in…". This prevents double-submission (a common bug) and gives users immediate feedback that the form was received. On error, the button is re-enabled and an inline error message appears under the email field, because invalid credentials are an email-level error in the standard login flow.\n\n**Show/hide password**\n\nThe eye button toggles the password field between type="password" and type="text" — the standalone [password toggle](/ui-snippets/password-toggle/) snippet covers just this. On a sign-up form, pair it with a [password strength meter](/ui-snippets/password-strength/). This reduces login failures from typos and is expected by users, especially on mobile where hidden-character typing is error-prone.\n\n**Autocomplete attributes**\n\nThe email input has autocomplete="email" and the password has autocomplete="current-password". These are the correct values for a sign-in form. Browsers and password managers use these attributes to offer the right auto-fill suggestions, which significantly increases completion rates on return visits.\n\n**Accessibility**\n\nEvery input has an associated label (via for/id). Error messages are associated by id. The show/hide button has a title attribute for screen readers. Focus styles are visible with a ring. These details matter for WCAG compliance and reduce friction for all users.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Try social sign-in', text: 'Click "Continue with Google" or "Continue with GitHub" to see the loading state. In production, these buttons redirect to the OAuth provider.' },
      { title: 'Enter email and password', text: 'Type in the email and password fields and click Sign in to see the validation and loading state.' },
      { title: 'See validation errors', text: 'Submit with an invalid email or a short password to see inline error messages and error borders.' },
      { title: 'Toggle password visibility', text: 'Click the eye icon to show or hide the password characters — useful for checking a typo on mobile.' },
      { title: 'Wire to your auth system', text: 'In handleLogin(), call your authentication API (or an SDK like Auth.js, Supabase, or Firebase Auth) with the email and password, and redirect on success.' },
      { title: 'Export for your framework', text: 'Click "React" for a component with form state in useState and validation logic in the submit handler. Click "Vue" for a Vue 3 SFC with reactive refs.' },
    ]},
    features: ['Social sign-in buttons (Google with SVG logo, GitHub with SVG logo)', '"Or continue with email" divider using flex and pseudo-elements', 'Client-side email regex and password length validation', 'Inline error messages with red border on the invalid field', 'Show/hide password toggle with eye icon button', 'Loading state: disabled button and "Signing in…" label on submit', '"Keep me signed in" checkbox with accent-color', 'Correct autocomplete attributes for browser and password manager support'],
    useCases: [
      { icon: 'APP', title: 'SaaS and web application authentication', desc: 'Drop the login card into any authenticated web app. Wire the social buttons to your OAuth provider redirects and the email form to your auth API endpoint. The loading state prevents double-submission, and the validation provides immediate feedback without a round-trip — making the sign-in flow feel fast and polished.' },
      { icon: 'FLOW', title: 'Modal-based login flow', desc: 'Mount the card inside a modal dialog (triggered by a "Sign in" link in the nav) so users can log in without leaving the current page. This pattern is popular on e-commerce and media sites where unauthenticated users browse freely but need to authenticate to save, purchase, or comment.' },
      { icon: 'DESIGN', title: 'Onboarding funnel A/B testing', desc: 'Test different login card layouts — social-first vs email-first, single-column vs split layout — to find the highest-converting combination for your user base. The card\'s clean, modular structure makes swapping the order or hiding the social buttons straightforward for an A/B experiment.' },
      { icon: 'CODE', title: 'Integrate with Auth.js, Supabase, or Firebase', desc: 'The login card is UI-only and provider-agnostic. In the handleLogin() submit handler, call signIn("credentials", { email, password }) for Auth.js, supabase.auth.signInWithPassword() for Supabase, or signInWithEmailAndPassword() for Firebase. Replace the socialLogin() stubs with the appropriate provider redirect function.' },
      { icon: 'LEARN', title: 'Study production form patterns', desc: 'This snippet contains all the patterns that distinguish a production login form from a demo: autocomplete attributes, show/hide password, submit-only validation, disabled-button loading state, and correct error placement. Each one solves a specific real-world problem and reduces form abandonment.' },
      { icon: 'CHART', title: 'Admin panel and internal tool authentication', desc: 'Use the login card as the entry gate to an internal dashboard, CMS, or admin panel. Remove the social buttons (internal tools often use email-only or SSO) and add a company logo in the header. The "Keep me signed in" checkbox maps to a session-duration setting in your auth system.' },
      { icon: 'CODE', title: 'Related: Animated Toggle Group', desc: 'See the [Animated Toggle Group](/ui-snippets/animated-toggle-group/) for a related forms pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Back in Stock Notify Me Form', desc: 'See the [Back in Stock Notify Me Form](/ui-snippets/back-in-stock-notify-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is validation run on submit rather than on every keystroke?', a: 'On-keystroke validation triggers errors while the user is still typing — showing "invalid email" after typing "hello" before they have had a chance to type the "@" is frustrating. The convention in modern auth forms is to validate on submit (catching the complete value) and then clear the error once the user corrects the field and re-submits. This gives feedback at the right moment without interrupting typing.' },
      { q: 'What autocomplete attribute values should a login form use?', a: 'The email input should have autocomplete="email" and the password should have autocomplete="current-password". These are the values the HTML spec defines for sign-in forms. "current-password" signals to browsers and password managers that this is an existing credential (not a new one to be set), triggering the right auto-fill suggestion. Using autocomplete="off" breaks password manager integration, which significantly hurts completion rates.' },
      { q: 'How do I wire this to a real authentication backend?', a: 'In handleLogin(), after validation passes, call your auth API: for Auth.js use signIn("credentials", { email, password, redirect: false }), for Supabase use supabase.auth.signInWithPassword({ email, password }), for Firebase use signInWithEmailAndPassword(auth, email, password). On success, call router.push("/dashboard") (Next.js) or navigate("/dashboard") (React Router). On failure, re-enable the button and call setError("email", error.message) to show the server error inline.' },
      { q: 'How do I build this in React?', a: 'Keep email, password, and errors (an object keyed by field) in useState. The submit handler validates locally, sets errors in state, then calls your auth API. Use a loading boolean in state to disable the submit button and change its label during the API call. The show/hide toggle keeps a showPassword boolean in state and toggles the input type prop. Error messages render conditionally below each field from the errors state object. For the Tailwind version, click "Tailwind" to get the same markup with utility classes instead of a scoped stylesheet.' },
    ],
    aiPrompt: {
      paragraph: `Rather than reading every branch of handleLogin() yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why validation runs on submit rather than on every keystroke, or why the socialLogin() handler reads event.currentTarget instead of taking the button as a parameter. The same assistant can help optimize it — ask whether the setTimeout-simulated API calls should be replaced with a real fetch and AbortController so a slow network doesn't leave the button stuck in "Signing in…", or whether the setError() pattern of manipulating a sibling error span by id would break if two fields shared an id. It's also good for extending the form: ask it to add a rate-limit lockout after repeated failed attempts, wire in a magic-link fallback next to the password field, or add real password-strength feedback tied to the existing show/hide toggle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "auth login card" in plain HTML, CSS, and JavaScript — no framework, no build step.

Requirements:
- A centered card with social sign-in buttons (using real brand-colored inline SVG logos) stacked above an "or continue with email" divider built from flexbox and pseudo-element lines, followed by an email/password form.
- The password field must have a show/hide toggle button that switches the input's type attribute between password and text, using a single icon button (not two swapped icons is fine, but the type-swap logic must be correct).
- Validation must run only on form submit (not on every keystroke): check the email against a simple regex requiring an @ and a dot, and require the password to be at least 8 characters. Invalid fields must get an error CSS class on the input plus a specific inline error message in a dedicated span tied to that field.
- On successful client-side validation, disable the submit button and change its label to a loading state (e.g. "Signing in…") before the simulated API call, then reset the button and show a specific inline error under the email field if the simulated call "fails" — mirroring how a real backend would report "no account found."
- Each social button must independently show its own loading state (disable itself and change its own label) when clicked, using the actual clicked button rather than a hardcoded reference, so multiple social buttons don't interfere with each other.
- Use correct autocomplete attribute values (email, current-password) on the respective inputs so browser password managers offer the right autofill suggestions.
- Include a "Keep me signed in" checkbox and a "Forgot password?" link positioned inline with the password field's label.`,
    },
  },
};
export default authLoginCard;
