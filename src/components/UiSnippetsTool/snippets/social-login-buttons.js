const socialLoginButtons = {
  id: 'social-login-buttons',
  title: 'Social Login Buttons',
  lastmod: '2026-06-22',
  category: 'buttons',
  html: `<div class="slb-card">
  <h2>Welcome back</h2>
  <p class="slb-sub">Sign in to continue to Acme</p>

  <div class="slb-list">
    <button type="button" class="slb-btn" data-provider="Google">
      <svg class="slb-ico" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.5-4.6 2.4-7.2 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C39.9 35.7 44 30.4 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg>
      Continue with Google
    </button>
    <button type="button" class="slb-btn slb-dark" data-provider="Apple">
      <svg class="slb-ico" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 12.04c-.03-2.5 2.04-3.7 2.13-3.76-1.16-1.7-2.97-1.93-3.62-1.96-1.54-.16-3 .9-3.78.9-.78 0-1.97-.88-3.24-.86-1.67.03-3.21.97-4.07 2.46-1.74 3.02-.45 7.5 1.25 9.95.83 1.2 1.82 2.55 3.12 2.5 1.25-.05 1.72-.81 3.24-.81 1.51 0 1.94.81 3.26.78 1.35-.02 2.2-1.22 3.03-2.43.95-1.4 1.34-2.75 1.36-2.82-.03-.01-2.61-1-2.64-3.97zM14.6 4.59c.69-.84 1.16-2 1.03-3.16-1 .04-2.2.66-2.92 1.5-.64.74-1.2 1.92-1.05 3.05 1.11.09 2.25-.56 2.94-1.39z"/></svg>
      Continue with Apple
    </button>
    <button type="button" class="slb-btn slb-dark" data-provider="GitHub">
      <svg class="slb-ico" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>
      Continue with GitHub
    </button>
  </div>

  <div class="slb-divider"><span>or</span></div>

  <button type="button" class="slb-email">Sign in with email</button>
  <p class="slb-terms">By continuing you agree to our <a href="#">Terms</a> &amp; <a href="#">Privacy Policy</a>.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:50px 24px}

.slb-card{background:#fff;border-radius:18px;padding:30px 28px;width:100%;max-width:360px;box-shadow:0 18px 44px rgba(15,23,42,.1);text-align:center}
.slb-card h2{font-size:21px;font-weight:800;color:#0f172a}
.slb-sub{font-size:13px;color:#64748b;margin:5px 0 22px}

.slb-list{display:flex;flex-direction:column;gap:10px}
.slb-btn{display:flex;align-items:center;justify-content:center;gap:11px;width:100%;border:1.5px solid #e2e8f0;background:#fff;color:#1e293b;border-radius:11px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;position:relative;transition:border-color .15s,background .15s,box-shadow .15s}
.slb-btn:hover{border-color:#cbd5e1;background:#f8fafc}
.slb-btn:active{transform:translateY(1px)}
.slb-btn.slb-dark{background:#0f172a;border-color:#0f172a;color:#fff}
.slb-btn.slb-dark:hover{background:#1e293b;border-color:#1e293b}
.slb-ico{width:20px;height:20px;flex-shrink:0;position:absolute;left:14px}
.slb-btn.loading{color:transparent;pointer-events:none}
.slb-btn.loading::after{content:'';position:absolute;width:17px;height:17px;border:2px solid currentColor;border-top-color:transparent;border-radius:50%;animation:slbSpin .6s linear infinite;color:#94a3b8;left:50%;margin-left:-8px}
.slb-btn.slb-dark.loading::after{color:#fff}
@keyframes slbSpin{to{transform:rotate(360deg)}}

.slb-divider{display:flex;align-items:center;gap:12px;margin:18px 0;color:#94a3b8;font-size:11.5px;font-weight:700}
.slb-divider::before,.slb-divider::after{content:'';flex:1;height:1px;background:#e2e8f0}

.slb-email{width:100%;background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;transition:background .15s}
.slb-email:hover{background:#4f46e5}
.slb-terms{font-size:11px;color:#94a3b8;line-height:1.55;margin-top:16px}
.slb-terms a{color:#6366f1;text-decoration:none}`,

  js: `var list = document.querySelector('.slb-list');

list.addEventListener('click', function (e) {
  var btn = e.target.closest('.slb-btn');
  if (!btn || btn.classList.contains('loading')) return;

  // Show a loading spinner while the OAuth flow starts.
  btn.classList.add('loading');

  // In a real app, this is where you'd kick off the provider's OAuth flow,
  // e.g. window.location = '/auth/' + btn.dataset.provider.toLowerCase();
  // or call your auth SDK (signInWithPopup, etc.). We simulate a redirect delay.
  setTimeout(function () {
    btn.classList.remove('loading');
    btn.dataset.note = 'Would redirect to ' + btn.dataset.provider + ' OAuth';
    console.log('Start OAuth with ' + btn.dataset.provider);
  }, 1200);
});

document.querySelector('.slb-email').addEventListener('click', function () {
  console.log('Switch to email sign-in form');
});`,

  seo: {
    title: 'Social Login Buttons — OAuth Sign In HTML CSS JS',
    description: `Branded social login buttons for Google, Apple, and GitHub with official logos, loading states, and an email fallback. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Social Login Buttons — Branded OAuth Sign-In with Loading States',
      description: `"Continue with Google" is now the fastest, most-used way people sign in — social login removes the password step entirely and can dramatically lift signup conversion. But the buttons have to look *right*: each provider has brand guidelines for its logo, colors, and wording, and a generic gray button erodes the trust the provider's brand is supposed to lend. This snippet builds a proper social-login button set in plain HTML, CSS, and vanilla JavaScript: official-style logos, correct light/dark treatments, a loading spinner per button, and an email fallback with a terms line.

**Brand-correct buttons, not generic ones**

Each provider gets its own treatment: Google on a white button with its multicolor "G" mark, Apple and GitHub on dark buttons with white logos — matching each company's sign-in brand guidelines, which exist precisely so the button is instantly recognizable. The logos are inline SVGs (no image requests, crisp at any size), absolutely positioned at the left so the label stays optically centered regardless of logo width. "Continue with [Provider]" is the recommended, conversion-tested wording — clearer than "Login" or "Sign up" because it works for both new and returning users without committing to either.

**A loading state per button**

OAuth flows involve a redirect or popup that takes a moment to start, so each button shows a spinner the instant it's clicked — its label fades to transparent and a border-spinner appears centered, with the button becoming non-interactive to prevent double-clicks. This immediate feedback is important: without it, a user who clicks and sees nothing happen for a second will click again, potentially opening two auth flows. The spinner color adapts to the button (gray on light, white on dark).

**The email fallback and divider**

Social login should never be the *only* option — some users don't have or won't use a Google/Apple/GitHub account, and some organizations block them. A clear "or" divider separates the social buttons from a primary "Sign in with email" button, so the email path is always available and visually distinct. This is both a usability and an accessibility requirement: forcing social-only login excludes a real segment of users.

**Terms and privacy at the point of action**

A small terms-and-privacy line sits below the buttons, because the moment of account creation is exactly where consent belongs — linking the terms here (rather than burying them) is both good practice and, in many jurisdictions, a legal expectation for the signup flow. It's styled as quiet supporting text so it informs without competing with the actions.

**Where the real auth goes**

The click handler is where you start the provider's OAuth flow — a redirect to your \`/auth/google\` endpoint, or a call to your auth SDK's \`signInWithPopup\` / \`signInWithRedirect\`. The demo simulates the redirect delay and logs the provider; swapping in real auth is a one-line change per provider. The provider name lives in a \`data-provider\` attribute so one delegated handler covers every button, and adding a provider (Microsoft, Facebook, X) is a new button plus its logo — no new logic.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A sign-in card renders with branded Google, Apple, and GitHub buttons, a divider, and an email option.` },
      { title: 'Click a provider', text: `The button shows a loading spinner and becomes non-interactive while the (simulated) OAuth flow starts.` },
      { title: 'Note the branding', text: `Google is light with its color mark; Apple and GitHub are dark with white logos — matching brand guidelines.` },
      { title: 'See the email fallback', text: `An "or" divider separates the social buttons from a primary "Sign in with email" path.` },
      { title: 'Add or remove providers', text: `Duplicate a button with a data-provider and its SVG logo, or remove one — the delegated handler covers all.` },
      { title: 'Wire up real OAuth', text: `In the handler, redirect to your auth endpoint (/auth/google) or call your SDK's signInWithPopup for the clicked provider.` },
    ] },
    features: [
      { title: 'Brand-correct provider styling', text: `Google on white with its color mark, Apple and GitHub dark with white logos — matching each sign-in brand guideline.` },
      { title: 'Inline SVG logos', text: `Official-style logos as inline SVG — no image requests, crisp at any size, left-aligned with optically centered labels.` },
      { title: 'Per-button loading spinner', text: `Clicking shows an immediate centered spinner and disables the button, preventing double-clicks during the redirect.` },
      { title: '"Continue with" wording', text: `The conversion-tested label that works for both new and returning users, unlike "Login" or "Sign up".` },
      { title: 'Email fallback', text: `A clear divider and primary email button ensure social login is never the only option, for usability and accessibility.` },
      { title: 'Terms at the point of signup', text: `A quiet terms-and-privacy line links consent right where account creation happens.` },
      { title: 'Delegated, data-driven handler', text: `One listener reads data-provider, so adding a provider is a button plus its logo — no new logic.` },
      { title: 'Adaptive spinner color', text: `The loading spinner is gray on light buttons and white on dark ones, staying visible on each.` },
    ],
    useCases: [
      { title: 'Sign-in and sign-up screens', text: `The social options at the top of any auth screen — pair with an [auth login card](/ui-snippets/auth-login-card/) for the email form.` },
      { title: 'Onboarding flows', text: `Reduce signup friction by letting new users start with one tap, before a [password requirements checklist](/ui-snippets/password-requirements-checklist/) if they choose email.` },
      { title: 'Checkout guest-to-account', text: `Offer fast account creation at checkout via a provider the shopper already uses.` },
      { title: 'App and SaaS login', text: `Standard social SSO for product sign-in, complementing a [magic link login](/ui-snippets/magic-link-login/) as a passwordless option.` },
      { title: 'Developer tools', text: `GitHub login is expected for dev-focused products; the same pattern adds GitLab or Google Workspace.` },
      { title: 'Learning OAuth button UX', text: `A reference for brand-correct provider buttons and loading states — compare with [social buttons](/ui-snippets/social-buttons/) for the share-button variant.` },
    ],
    faqs: [
      { q: 'How do I wire these up to real OAuth?', a: `In the click handler, start the provider's flow: redirect to your backend's OAuth route (window.location = '/auth/' + provider) which then redirects to the provider and back, or call your auth SDK directly — Firebase signInWithPopup(new GoogleAuthProvider()), Auth0 loginWithRedirect({ connection: 'google' }), Supabase signInWithOAuth({ provider: 'github' }). The data-provider attribute identifies which to start. Keep the loading state until the redirect/popup takes over.` },
      { q: 'Why follow each provider\'s brand guidelines?', a: `Google, Apple, and others publish sign-in button guidelines (logo, colors, wording, spacing) and in some cases require compliance to use their login. Beyond policy, a brand-correct button is instantly recognizable, which is the entire value of social login — users trust the familiar Google or Apple button far more than a generic styled one, so adhering to the guidelines directly affects conversion.` },
      { q: 'Should I offer email login alongside social?', a: `Yes, always. Some users don't have or won't use a given provider, corporate policies sometimes block them, and relying solely on a third party for auth is a single point of failure. A clear email fallback (and ideally more than one provider) keeps signup accessible to everyone — excluding email-only users measurably shrinks your addressable signups.` },
      { q: 'How do I prevent double-clicks starting two auth flows?', a: `Add a loading class on first click that sets pointer-events: none and shows a spinner, and bail out of the handler if the button is already loading (as this snippet does). The button stays disabled until the redirect or popup takes over, so a second click can't fire a duplicate flow — important since OAuth redirects have a perceptible delay.` },
      { q: 'How do I use these social login buttons in React, Vue, or Angular?', a: `In React, render the providers from an array with .map(), hold a loading provider id in useState, and call your auth SDK in the onClick; in Vue, use v-for with a loading ref; in Angular, use *ngFor and a service method. The branding is pure CSS/SVG that ports unchanged — only the loading state and the SDK call move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the loading-state mechanics by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the single delegated click listener on .slb-list reads data-provider off the clicked button to know which OAuth flow to start, or why the loading class fades the label to transparent while keeping the button's original width instead of swapping in a spinner-only layout. The same assistant can help optimize it, for instance checking whether the setTimeout simulation should be replaced with an AbortController so a slow real redirect can be canceled if the user navigates away first. It is just as useful for extending the pattern: ask it to add a per-button error state if the OAuth popup is blocked or closed early, persist the last-used provider so it can be highlighted as "last used" on return visits, or wire the handler up to a real SDK like NextAuth.js or Supabase. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a branded "social login buttons" sign-in card in plain HTML, CSS, and JavaScript — no auth SDK, no libraries (the click handler should simulate what a real SDK call would do).

Requirements:
- A card with a heading, at least three OAuth provider buttons (e.g. Google, Apple, GitHub) each carrying a data-provider attribute, an inline SVG brand logo absolutely positioned at the left edge of the button so the text label stays optically centered regardless of logo width, and the label text reading "Continue with [Provider]".
- Follow each provider's real visual convention: light/white background for providers whose logo is multi-colored and needs a light background to read correctly, solid dark or black fill for providers whose brand uses a dark button treatment.
- Use one single delegated click listener attached to the button container (not one listener per button) that reads the data-provider attribute off whichever button was actually clicked via event delegation, adds a loading class to that specific button, and ignores further clicks on a button already in its loading state.
- The loading class must fade the button's text to transparent (not remove it, to preserve layout width) and show a centered spinning ring built from a CSS border with one transparent side, animated via a rotate keyframe. The spinner's color must adapt so it's visible on both the light and dark button variants.
- Below the provider buttons, an "or" divider built from a single flex container with ::before/::after pseudo-element lines, followed by a distinct, differently colored "Sign in with email" button as a fallback path, plus a small terms-and-privacy text line with real anchor links.
- After a simulated delay (standing in for the real redirect/popup delay), clear the loading state and log which provider's OAuth flow would have started, so the integration point for real auth code is obvious.`,
    },
  },
};

export default socialLoginButtons;
