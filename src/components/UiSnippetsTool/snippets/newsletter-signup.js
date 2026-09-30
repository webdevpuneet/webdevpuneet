const newsletterSignup = {
  id: 'newsletter-signup',
  title: 'Newsletter Signup Card',
  lastmod: '2026-06-13',
  category: 'forms',
  html: `<div class="page">
  <div class="card" id="card">
    <div class="state-idle" id="stateIdle">
      <div class="icon-wrap">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
      </div>
      <h2 class="title">Stay in the loop</h2>
      <p class="desc">Get weekly dev tips, UI snippets, and early access to new tools — no spam, ever.</p>
      <div class="badges">
        <span class="badge">📦 175+ snippets</span>
        <span class="badge">⚡ Weekly tips</span>
        <span class="badge">🔒 No spam</span>
      </div>
      <form class="form" id="form" novalidate>
        <div class="input-wrap" id="inputWrap">
          <svg class="input-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <input id="emailInput" type="email" class="input" placeholder="your@email.com" autocomplete="email" aria-label="Email address" required />
        </div>
        <p class="error-msg" id="errorMsg" role="alert" aria-live="assertive"></p>
        <button type="submit" class="btn" id="submitBtn">
          <span class="btn-text">Subscribe</span>
          <svg class="btn-arrow" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
          <span class="btn-spinner" aria-hidden="true"></span>
        </button>
      </form>
      <p class="social-count"><strong>12,847</strong> developers already subscribed</p>
    </div>

    <div class="state-success" id="stateSuccess" hidden>
      <div class="success-ring">
        <svg class="success-check" viewBox="0 0 52 52" fill="none">
          <circle class="check-circle" cx="26" cy="26" r="24" stroke="currentColor" stroke-width="2.5"/>
          <path class="check-path" d="M14 26 L22 34 L38 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2 class="success-title">You're subscribed!</h2>
      <p class="success-desc">Check <strong id="confirmedEmail">your inbox</strong> for a confirmation. Welcome aboard! 🎉</p>
      <div class="success-perks">
        <div class="perk"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>Weekly dev tips delivered</div>
        <div class="perk"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>Early access to new UI snippets</div>
        <div class="perk"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>Unsubscribe anytime, one click</div>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:linear-gradient(135deg,#ede9fe 0%,#e0f2fe 100%);min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px}
.card{background:#fff;border-radius:24px;padding:36px 32px;max-width:420px;width:100%;box-shadow:0 20px 60px rgba(99,102,241,.12);text-align:center}

/* Idle state */
.icon-wrap{width:52px;height:52px;background:linear-gradient(135deg,#ede9fe,#ddd6fe);border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 20px;color:#7c3aed}
.title{font-size:22px;font-weight:800;color:#1e293b;margin-bottom:8px}
.desc{font-size:14px;color:#64748b;line-height:1.6;margin-bottom:16px}
.badges{display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-bottom:24px}
.badge{font-size:11px;font-weight:600;color:#6366f1;background:#eef2ff;border-radius:20px;padding:4px 10px}

.input-wrap{position:relative;display:flex;align-items:center}
.input-icon{position:absolute;left:13px;color:#94a3b8;pointer-events:none;flex-shrink:0}
.input{width:100%;padding:13px 16px 13px 38px;font-size:14px;border:2px solid #e2e8f0;border-radius:12px;outline:none;color:#1e293b;background:#f8fafc;transition:border-color .2s,background .2s;font-family:inherit}
.input:focus{border-color:#6366f1;background:#fff}
.input.error-state{border-color:#ef4444}
.error-msg{font-size:12px;color:#ef4444;margin-top:6px;min-height:16px;text-align:left}

.btn{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:10px;padding:14px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;transition:opacity .2s,transform .15s;position:relative;overflow:hidden;font-family:inherit}
.btn:hover{opacity:.92;transform:translateY(-1px)}
.btn:active{transform:translateY(0)}
.btn.loading .btn-text,.btn.loading .btn-arrow{opacity:0}
.btn.loading .btn-spinner{opacity:1}
.btn-spinner{position:absolute;width:18px;height:18px;border:2.5px solid rgba(255,255,255,.3);border-top-color:#fff;border-radius:50%;animation:spin .7s linear infinite;opacity:0;transition:opacity .2s}
@keyframes spin{to{transform:rotate(360deg)}}
.social-count{font-size:12px;color:#94a3b8;margin-top:14px}
.social-count strong{color:#475569}

/* Success state */
.state-success{animation:fadeIn .5s ease}
@keyframes fadeIn{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.success-ring{width:80px;height:80px;margin:0 auto 20px;color:#10b981}
.check-circle{stroke-dasharray:151;stroke-dashoffset:151;animation:drawCircle .6s .1s ease forwards}
.check-path{stroke-dasharray:40;stroke-dashoffset:40;animation:drawCheck .4s .65s ease forwards}
@keyframes drawCircle{to{stroke-dashoffset:0}}
@keyframes drawCheck{to{stroke-dashoffset:0}}
.success-title{font-size:22px;font-weight:800;color:#1e293b;margin-bottom:8px}
.success-desc{font-size:14px;color:#64748b;line-height:1.6;margin-bottom:24px}
.success-perks{display:flex;flex-direction:column;gap:10px;text-align:left;background:#f0fdf4;border:1px solid #bbf7d0;border-radius:12px;padding:16px}
.perk{display:flex;align-items:center;gap:8px;font-size:13px;color:#166534;font-weight:500}`,

  js: `const form = document.getElementById('form');
const emailInput = document.getElementById('emailInput');
const inputWrap = document.getElementById('inputWrap');
const errorMsg = document.getElementById('errorMsg');
const submitBtn = document.getElementById('submitBtn');
const stateIdle = document.getElementById('stateIdle');
const stateSuccess = document.getElementById('stateSuccess');
const confirmedEmail = document.getElementById('confirmedEmail');

function validateEmail(v){ return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); }

function showError(msg){
  errorMsg.textContent = msg;
  emailInput.classList.add('error-state');
}
function clearError(){
  errorMsg.textContent = '';
  emailInput.classList.remove('error-state');
}

emailInput.addEventListener('input', clearError);

form.addEventListener('submit', async e => {
  e.preventDefault();
  clearError();
  const val = emailInput.value.trim();
  if(!val){ showError('Please enter your email address.'); emailInput.focus(); return; }
  if(!validateEmail(val)){ showError('Please enter a valid email address.'); emailInput.focus(); return; }

  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate API call
  await new Promise(r => setTimeout(r, 1400));

  confirmedEmail.textContent = val;
  stateIdle.hidden = true;
  stateSuccess.hidden = false;
  stateSuccess.removeAttribute('hidden');
});`,

  seo: {
    title: 'Newsletter Signup Card — Animated Success State HTML CSS JS',
    description: `Email signup form with inline validation, loading spinner, animated SVG checkmark success state, and social proof counter. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Newsletter Signup Card — Form Validation, Animated SVG Check & State Machine Pattern`,
      description: `A newsletter signup form is one of the highest-value conversion elements on any website, yet most implementations are a bare \`<input>\` and \`<button>\` with no success feedback. This snippet builds a polished email signup card: client-side email validation with inline error messages, a loading spinner during the async call, and an animated SVG checkmark success state that slides in after submission — with three confirmation perks and the subscriber's email shown back to them.

The success state is where most implementations fall short. Users who submit a form with no feedback don't know whether it worked. This snippet solves that with a two-state card: an idle state (form) and a success state (animated confirmation). The transition between states uses CSS animation — not a page reload.

**Email validation with inline error messages**

The form uses \`novalidate\` to disable native browser validation, giving us full control over the error UI. The \`validateEmail\` function checks the value against \`/^[^\s@]+@[^\s@]+\.[^\s@]+$/\` — a pragmatic regex that catches obvious format errors without the complexity of RFC 5322 full compliance (which rejects valid emails). Errors render in a \`role="alert"\` \`aria-live="assertive"\` paragraph below the input so screen readers announce them immediately. The error state adds a red border to the input via a class toggle.

**Loading state with spinner**

During the async submission, the button gets a \`.loading\` class that fades out the button text and arrow (\`opacity: 0\`) and fades in a centred CSS spinner. The spinner is an \`::after\`-style border-radius element with a \`rotate(360deg)\` keyframe animation. The button is also \`disabled\` to prevent double-submission. This pattern — hiding text but keeping the button the same size — prevents layout shift during loading.

**Animated SVG checkmark**

The success state shows an SVG circle and checkmark path drawn with CSS stroke-dashoffset animation. The circle stroke is set to \`stroke-dasharray: 151\` (its circumference) and \`stroke-dashoffset: 151\` (fully hidden). A keyframe animation drives it to \`0\` — drawing the circle. The check path follows 200ms later with the same technique. This two-step sequence (circle then check) creates a satisfying "confirmation" feeling that flat success messages lack.

**Two-state card pattern**

The idle and success states are both in the DOM, one hidden with the \`hidden\` attribute. Submission hides the idle state and removes \`hidden\` from the success state. CSS \`animation: fadeIn .5s ease\` slides the success state up from 12px below. This is simpler and more reliable than injecting HTML on success, and it means the success state can be styled independently without JavaScript string templates. Pair with a [toast notification](/ui-snippets/toast-notification/) for site-wide signup confirmation that appears on other pages after redirect.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Paste HTML, CSS, and JS',
        text: `A newsletter card appears with an email icon, headline, feature badges, email input, and subscribe button on a purple gradient background.`,
      },
      {
        title: 'Try submitting empty',
        text: `Click Subscribe without an email — an inline error message appears below the input with a red border on the field. The error clears as you start typing.`,
      },
      {
        title: 'Try an invalid email',
        text: `Enter "test" and submit — a validation error appears. Enter "test@test.com" and submit to proceed.`,
      },
      {
        title: 'Watch the loading state',
        text: `A spinner appears inside the button for ~1.4 seconds (simulating an API call). The button disables to prevent double submission.`,
      },
      {
        title: 'See the success state',
        text: `An animated SVG circle draws itself, then a checkmark path draws inside it. The success card slides up with the subscriber's email confirmed and three benefit perks.`,
      },
      {
        title: 'Connect your email API',
        text: `Replace the \`await new Promise(r => setTimeout(r, 1400))\` with your real API call (\`fetch('/api/subscribe', { method: 'POST', body: ... })\`). Show the success state in the \`then\` handler, or re-show the form with an error message if the call fails.`,
      },
    ] },
    features: [
      {
        title: 'Client-side email validation',
        text: `\`/^[^\s@]+@[^\s@]+\.[^\s@]+$/\` catches obvious format errors. \`role="alert"\` + \`aria-live="assertive"\` announces errors to screen readers immediately.`,
      },
      {
        title: 'Loading button with spinner',
        text: `\`.loading\` class fades out button text and shows a centred CSS spinner, keeping button dimensions fixed to prevent layout shift during the async delay.`,
      },
      {
        title: 'Animated SVG checkmark',
        text: `Circle and check path use \`stroke-dashoffset\` keyframe animations that draw in sequence — circle first (0.6s), then checkmark (0.4s, delayed 0.65s).`,
      },
      {
        title: 'Two-state card (idle / success)',
        text: `Both states live in the DOM with the \`hidden\` attribute toggled on submit. The success state uses \`animation: fadeIn\` to slide up, avoiding layout jump.`,
      },
      {
        title: 'Inline error + red border',
        text: `Errors display in a \`<p role="alert">\` below the input and add \`.error-state\` class (red border). The input listener clears errors on every keystroke — immediate feedback.`,
      },
      {
        title: 'Email echo in success state',
        text: `The confirmed email is injected into the success message (\`confirmedEmail.textContent = val\`) — a small but high-trust detail that confirms the correct address was saved.`,
      },
      {
        title: 'Social proof counter',
        text: `"12,847 developers already subscribed" below the button uses established-community social proof — one of the highest-converting newsletter conversion elements.`,
      },
      {
        title: 'Feature badge pills',
        text: `Three emoji badge pills ("📦 175+ snippets", "⚡ Weekly tips", "🔒 No spam") address the three main objections before the user reaches the input.`,
      },
    ],
    useCases: [
      {
        title: 'Blog and content site email lists',
        text: `The primary use case — capture returning visitors with a weekly newsletter signup. Position it in the footer, sidebar, or as a mid-article insert after the first few paragraphs.`,
      },
      {
        title: 'SaaS waitlist and early access',
        text: `"Be first to know when we launch" with the same two-state form. The success state confirms the user is on the list. Add a referral count for viral waitlist mechanics.`,
      },
      {
        title: 'Product update announcements',
        text: `Subscribe users to product changelogs, release notes, or feature announcements. The perks section can list specific content types to set expectations.`,
      },
      {
        title: 'Event and webinar registration',
        text: `Replace "newsletter" framing with "register for free webinar" and update the success state to include the event date and calendar link.`,
      },
      {
        title: 'Developer tool documentation sites',
        text: `Docs sites for libraries and APIs use newsletter signup to notify users of breaking changes, new versions, and security updates.`,
      },
      {
        title: 'E-commerce promotional emails',
        text: `"Get 10% off your first order" signup with the same form. The success state shows the discount code instead of the perks list.`,
      },
      { icon: 'CODE', title: 'Related: Restaurant Table Reservation Form', desc: 'See the [Restaurant Table Reservation Form](/ui-snippets/table-reservation-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I connect this to Mailchimp or ConvertKit?',
        a: `Replace the \`setTimeout\` with a \`fetch\` call to their API endpoint. For Mailchimp: \`fetch(\`https://us1.api.mailchimp.com/3.0/lists/{listId}/members\`, { method:'POST', headers:{Authorization:'apikey \${key}',...}, body: JSON.stringify({email_address:val,status:'subscribed'}) })\`. For ConvertKit: POST to \`https://api.convertkit.com/v3/forms/{formId}/subscribe\` with \`{api_key, email}\`.`,
      },
      {
        q: 'How do I handle API errors (e.g., email already subscribed)?',
        a: `Add a \`try/catch\` around the fetch. On error, re-enable the button, remove the \`.loading\` class, and call \`showError('This email is already subscribed.')\`. This keeps the user in the idle state with the error inline rather than losing their input.`,
      },
      {
        q: 'How do I add a first name field?',
        a: `Add \`<input type="text" placeholder="First name" />\` above the email input. In JS, collect both values and include the name in the API call body. The validation step adds a check that the name field is non-empty.`,
      },
      {
        q: 'How do I export this as a React component?',
        a: `Use \`useState\` for \`{ email, error, loading, success }\`. The form \`onSubmit\` sets \`loading: true\`, awaits the API call, then sets \`success: true\` or \`error: 'message'\`. Conditionally render the idle or success JSX based on the \`success\` flag.`,
      },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the two-state DOM swap by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the success checkmark's stroke-dashoffset animations are timed so the circle finishes drawing before the checkmark path starts, and why both the idle and success states stay mounted in the DOM with the hidden attribute instead of one being injected via innerHTML on success. The same assistant can help optimize it, for instance asking whether the simulated 1400ms setTimeout delay is a reasonable stand-in for a real API round trip or whether it should show a differently-timed skeleton, or whether the email regex is too permissive for production use. It's also useful for extending the form: ask it to add real error handling for a duplicate-subscriber API response that returns the user to the idle state with an inline message, add a first-name field with its own validation, or wire in a double opt-in confirmation flow. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "newsletter signup card" in plain HTML, CSS, and JavaScript with client-side validation, a loading state, and an animated SVG success confirmation — no form library.

Requirements:
- A card containing an idle state (icon, headline, description, feature badge pills, an email input with an inline icon, a submit button, and a social-proof subscriber count) and a separate success state, both present in markup but with only one visible at a time via the hidden attribute — no innerHTML injection to show the success state.
- Disable native browser validation (novalidate) and implement your own: on submit, check for a non-empty value first, then validate the format with a practical (not RFC-perfect) email regex; show a distinct message for each failure case in a paragraph with role="alert" and aria-live="assertive" below the input, and add a red-border error class to the input.
- Clear the error state and styling the moment the user starts typing again in the field, not only on the next submit attempt.
- On a valid submit, disable the button, add a loading class that fades out the button's label/icon and fades in a spinning CSS-only spinner (an animated bordered circle, not an image or SVG animation) without changing the button's size, then simulate an async delay before proceeding.
- After the simulated delay, hide the idle state and reveal the success state, echoing the submitted email address back to the user inside the confirmation copy.
- The success state's checkmark must be an SVG circle and check path animated in sequence using stroke-dasharray and stroke-dashoffset keyframes — the circle must finish drawing before the checkmark begins — plus a list of a few confirmation "perks" styled distinctly from the main confirmation text.`,
    },
  },
};

export default newsletterSignup;
