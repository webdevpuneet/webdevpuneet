const pricingFreeTrialSignupCard = {
  id: 'pricing-free-trial-signup-card',
  title: 'Free Trial Signup Card',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="ftc-wrap">
  <div class="ftc-card" id="ftcCard">
    <span class="ftc-badge">No credit card required</span>
    <h2 class="ftc-title">Start your free trial</h2>
    <p class="ftc-sub">Full access to every feature for <strong>14 days</strong>. No charge today, no charge ever unless you choose to subscribe.</p>

    <form class="ftc-form" id="ftcForm" novalidate>
      <label class="ftc-label" for="ftcEmail">Work email</label>
      <div class="ftc-field">
        <input class="ftc-input" type="email" id="ftcEmail" placeholder="you@company.com" autocomplete="email" />
        <svg class="ftc-check" width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <p class="ftc-error" id="ftcError">Enter a valid email address.</p>

      <button class="ftc-submit" type="submit">Start free trial</button>
      <p class="ftc-fineprint">By continuing you agree to the Terms. We'll email you 3 days before your trial ends.</p>
    </form>

    <div class="ftc-success" id="ftcSuccess" hidden>
      <div class="ftc-success-icon">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </div>
      <h3 class="ftc-success-title">You're in — trial started</h3>
      <p class="ftc-success-text">We sent a confirmation to <strong id="ftcSuccessEmail"></strong>.</p>
      <ul class="ftc-timeline">
        <li><span class="ftc-dot ftc-dot-now"></span><div><strong>Today</strong><p>Full access unlocked. No card on file, no charge.</p></div></li>
        <li><span class="ftc-dot"></span><div><strong>Day 11</strong><p>Reminder email sent, 3 days before your trial ends.</p></div></li>
        <li><span class="ftc-dot"></span><div><strong>Day 14</strong><p>Trial ends automatically. Nothing is billed — add a plan any time to keep your data.</p></div></li>
      </ul>
      <button class="ftc-reset" id="ftcReset" type="button">Use a different email</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d12;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.ftc-wrap{width:100%;max-width:420px}
.ftc-card{background:linear-gradient(165deg,#141a24,#0d1117);border:1px solid #202834;border-radius:20px;padding:32px 28px;position:relative;overflow:hidden}
.ftc-card::before{content:'';position:absolute;top:-80px;right:-80px;width:220px;height:220px;background:radial-gradient(circle,rgba(52,211,153,.16),transparent 70%);pointer-events:none}
.ftc-badge{display:inline-flex;align-items:center;gap:6px;font-size:11.5px;font-weight:700;letter-spacing:.02em;color:#34d399;background:rgba(52,211,153,.1);border:1px solid rgba(52,211,153,.25);padding:5px 12px;border-radius:20px}
.ftc-title{font-size:24px;font-weight:800;color:#f4f7fb;margin-top:16px;letter-spacing:-.01em}
.ftc-sub{font-size:13.5px;color:#8b96a8;line-height:1.6;margin-top:8px}
.ftc-sub strong{color:#cdd5e0}
.ftc-form{margin-top:22px}
.ftc-label{display:block;font-size:12px;font-weight:700;color:#8b96a8;text-transform:uppercase;letter-spacing:.05em;margin-bottom:8px}
.ftc-field{position:relative}
.ftc-input{width:100%;background:#0a0d12;border:1.5px solid #263041;color:#f4f7fb;font-family:inherit;font-size:14.5px;padding:12px 40px 12px 14px;border-radius:10px;outline:none;transition:border-color .15s}
.ftc-input:focus{border-color:#34d399}
.ftc-input.is-invalid{border-color:#f87171}
.ftc-input.is-valid{border-color:#34d399}
.ftc-check{position:absolute;right:12px;top:50%;transform:translateY(-50%) scale(.7);color:#34d399;opacity:0;transition:opacity .15s,transform .15s}
.ftc-input.is-valid ~ .ftc-check{opacity:1;transform:translateY(-50%) scale(1)}
.ftc-error{font-size:12px;color:#f87171;margin-top:6px;height:0;opacity:0;overflow:hidden;transition:opacity .15s}
.ftc-error.show{height:auto;opacity:1;margin-top:6px}
.ftc-submit{width:100%;margin-top:18px;background:#34d399;color:#062018;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s,transform .1s}
.ftc-submit:hover{background:#2fc290}
.ftc-submit:active{transform:scale(.98)}
.ftc-fineprint{font-size:11.5px;color:#5c6779;margin-top:12px;line-height:1.5;text-align:center}
.ftc-success{text-align:center}
.ftc-success-icon{width:52px;height:52px;border-radius:50%;background:rgba(52,211,153,.12);border:1px solid rgba(52,211,153,.3);color:#34d399;display:flex;align-items:center;justify-content:center;margin:0 auto}
.ftc-success-title{font-size:19px;font-weight:800;color:#f4f7fb;margin-top:14px}
.ftc-success-text{font-size:13px;color:#8b96a8;margin-top:6px}
.ftc-success-text strong{color:#cdd5e0}
.ftc-timeline{list-style:none;margin-top:22px;text-align:left;display:flex;flex-direction:column;gap:16px}
.ftc-timeline li{display:flex;gap:12px;font-size:12.5px;color:#8b96a8;line-height:1.5}
.ftc-timeline strong{color:#f4f7fb;display:block;font-size:13px;margin-bottom:2px}
.ftc-dot{flex:none;width:9px;height:9px;border-radius:50%;background:#263041;margin-top:5px}
.ftc-dot-now{background:#34d399;box-shadow:0 0 0 4px rgba(52,211,153,.18)}
.ftc-reset{margin-top:20px;background:transparent;border:1.5px solid #263041;color:#cdd5e0;font-family:inherit;font-size:13px;font-weight:700;padding:10px 16px;border-radius:9px;cursor:pointer;transition:border-color .15s}
.ftc-reset:hover{border-color:#34d399;color:#34d399}`,

  js: `const form = document.getElementById('ftcForm');
const emailInput = document.getElementById('ftcEmail');
const errorEl = document.getElementById('ftcError');
const card = document.getElementById('ftcCard');
const success = document.getElementById('ftcSuccess');
const successEmail = document.getElementById('ftcSuccessEmail');
const resetBtn = document.getElementById('ftcReset');

// Simple but real inline validation, not just HTML5 required.
function isValidEmail(value) {
  return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value.trim());
}

function validateLive() {
  const value = emailInput.value;
  if (!value) {
    emailInput.classList.remove('is-valid', 'is-invalid');
    errorEl.classList.remove('show');
    return;
  }
  const valid = isValidEmail(value);
  emailInput.classList.toggle('is-valid', valid);
  emailInput.classList.toggle('is-invalid', !valid);
  errorEl.classList.toggle('show', !valid);
}

emailInput.addEventListener('input', validateLive);
emailInput.addEventListener('blur', validateLive);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = emailInput.value.trim();
  if (!isValidEmail(value)) {
    emailInput.classList.add('is-invalid');
    errorEl.classList.add('show');
    emailInput.focus();
    return;
  }
  successEmail.textContent = value;
  form.hidden = true;
  card.querySelector('.ftc-badge').style.display = 'none';
  card.querySelector('.ftc-title').style.display = 'none';
  card.querySelector('.ftc-sub').style.display = 'none';
  success.hidden = false;
});

resetBtn.addEventListener('click', () => {
  success.hidden = true;
  form.hidden = false;
  card.querySelector('.ftc-badge').style.display = '';
  card.querySelector('.ftc-title').style.display = '';
  card.querySelector('.ftc-sub').style.display = '';
  emailInput.value = '';
  emailInput.classList.remove('is-valid', 'is-invalid');
  errorEl.classList.remove('show');
  emailInput.focus();
});`,

  seo: {
    title: 'Free Trial Signup Card — Free HTML CSS JS Snippet, No Credit Card',
    description: 'A trial-signup card with real inline email validation and a clear submitted state stating the trial length and what happens when it ends. No dependencies.',
    about: {
      title: 'Free Trial Signup Card — Inline Validation, "No Card Required," and a Clear End-of-Trial State',
      description: `The single biggest source of friction on a SaaS signup form isn't the email field — it's the anxiety that filling it out will lead to an unexpected charge. This snippet builds a free-trial signup card that removes that anxiety in three concrete ways: an explicit "No credit card required" badge above the fold, real inline validation on the email field so mistakes surface before submission rather than after, and a submitted state that states the exact trial length and precisely what happens on the day it ends.

**Inline validation that reacts as you type**

The email input listens on both \`input\` and \`blur\`, running a real regex check (\`isValidEmail\`) rather than relying solely on the browser's built-in \`type="email"\` validation, which varies in strictness across browsers and gives no visual feedback of its own. A valid email toggles \`.is-valid\`, which fades in a small checkmark inside the field and turns the border green; an invalid one toggles \`.is-invalid\` and reveals an inline error message with a smooth height transition rather than a jarring layout jump. Critically, the field stays neutral (\`\`no state class\`\`) while empty, so a new visitor isn't greeted with a red error before they've typed anything.

**Submitting is gated, not just decorative**

The submit handler re-validates on \`submit\` regardless of what the live validation already showed, refusing to proceed and re-focusing the field on an invalid value. This matters because a user can paste an invalid address or the live listener can be bypassed in edge cases (autofill, browser extensions) — validating again at the point of submission is the only way to guarantee the "success" state is only ever reached with a plausible email.

**A submitted state that answers the two questions users actually have**

Once submitted, the card swaps to a confirmation view built around a three-step timeline: what happened today (full access unlocked, no card on file), what happens on day 11 (a reminder email, stated explicitly rather than left as a surprise), and what happens on day 14 (the trial ends automatically with **no charge**, and upgrading is something the user chooses rather than something that happens to them). This answers the two questions every trial signup implicitly raises — "will I be charged?" and "will I be warned before anything changes?" — directly in the UI instead of burying the answer in a terms-of-service link.

**Why "no credit card required" belongs in the layout, not just the copy**

Plenty of trial forms bury the no-card promise in fine print while still visually implying a payment step is coming (a padlock icon, a "secure checkout" phrase). This card puts the badge in the first thing a visitor reads, styled distinctly from the rest of the copy, so the reassurance lands before any friction does — the same principle behind [money-back guarantee](/ui-snippets/money-back-guarantee/) badges on checkout pages.

**Customizing it**

Swap the 14-day window and reminder timing for your own trial length, wire the submit handler to your real signup endpoint instead of the local demo state, and pair it with a [trial countdown](/ui-snippets/trial-countdown/) once the account exists to keep reinforcing the same "no surprise charge" promise throughout the trial.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Type an email address', text: 'The field validates live on every keystroke and on blur, showing a green check or a red inline error.' },
      { title: 'Submit with a valid email', text: 'The form re-validates on submit and swaps to the confirmation state only if the address is valid.' },
      { title: 'Read the timeline', text: 'The confirmation view states today, the day-11 reminder, and the day-14 automatic trial end with no charge.' },
      { title: 'Use a different email', text: 'The reset button clears the form and returns to the signup state.' },
      { title: 'Wire it to your backend', text: 'Replace the local success state in the submit handler with your real signup API call.' },
      { title: 'Adjust the trial window', text: 'Change the 14-day and day-11 references in the HTML timeline to match your product.' },
    ] },
    features: [
      { title: 'No-card badge up front', text: 'The reassurance is the first thing a visitor reads, not fine print.' },
      { title: 'Live regex validation', text: 'Checks on every keystroke, not just on blur or submit.' },
      { title: 'Submit-time re-validation', text: 'Guarantees the success state is only reached with a plausible email.' },
      { title: 'Animated valid/invalid states', text: 'A fading checkmark and a height-animated inline error.' },
      { title: 'Explicit end-of-trial state', text: 'States exactly what happens and that nothing is billed.' },
      { title: 'Three-step timeline', text: 'Today, the reminder, and the automatic end are each spelled out.' },
      { title: 'Reset to try again', text: 'A dedicated control returns to the form without a page reload.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS — no library or CDN needed.' },
    ],
    useCases: [
      { title: 'SaaS trial signups', text: 'Reduce anxiety before the main conversion by putting a no-card badge first, so the reassurance is read before any fine print.' },
      { title: 'Freemium upgrade paths', text: 'Pair with a [pricing card](/ui-snippets/pricing-card/) below the form, using live regex validation on every keystroke rather than only on blur or submit.' },
      { title: 'Landing page hero forms', text: 'Offer a focused alternative to a long multi-field form, with a fading checkmark and a height-animated inline error for valid and invalid states.' },
      { title: 'Post-trial reminders', text: 'Reinforce the message with a [trial countdown](/ui-snippets/trial-countdown/), and make the submitted state spell out the trial length and what happens when it ends.' },
      { title: 'Email capture experiments', text: 'A/B test badge placement and wording, with submit-time re-validation guaranteeing the success state only appears for a plausible email address.' },
      { icon: 'CODE', title: 'Related: Plan Comparison with Differences Toggle', desc: 'See the [Plan Comparison with Differences Toggle](/ui-snippets/pricing-diff-comparison-table/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why validate on both input and blur instead of just on submit?', a: 'Validating on input gives immediate feedback as the visitor types, so a typo is caught while it is still fresh in their mind rather than after they have moved on and clicked submit. Blur validation catches the case of pasting a value and tabbing away without triggering further keystrokes. Submit-time validation is still kept as a final gate, since live validation alone could theoretically be bypassed by autofill or browser extensions.' },
      { q: 'Why show the badge and the timeline instead of just a checkbox for card details?', a: 'The two biggest trust gaps in a trial signup are not knowing whether a card will be charged and not knowing when or how the trial ends. Putting "No credit card required" above the fold and then spelling out today, the reminder day, and the automatic end date in a visible timeline answers both questions directly in the UI, rather than requiring the visitor to trust a terms-of-service link they likely will not read.' },
      { q: 'Does this snippet actually submit data anywhere?', a: 'No — it is a self-contained front-end demo. The submit handler validates the email and swaps to a local confirmation state to demonstrate the interaction. In production, replace that local state transition with a real fetch or form POST to your signup endpoint, and only show the confirmation state once that request succeeds.' },
      { q: 'How do I change the trial length or reminder timing?', a: 'The 14-day trial and day-11 reminder are plain text in the HTML timeline (and referenced in the intro copy), not computed values — update those strings directly to match your product\'s actual trial window and reminder schedule.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Move emailInput.value and the valid/invalid booleans into component state, call your validation regex on each input change, and conditionally render either the form or the success timeline based on a submitted flag. The CSS classes and transitions port over unchanged.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the email field validates on both input and blur but still re-validates again inside the submit handler, and what class of bugs that submit-time re-validation prevents that live validation alone would miss. It can also help you extend the flow — ask it to wire the submit handler to a real API endpoint with a loading state on the button, add a honeypot or rate limit to deter bot signups, or make the day-11 reminder timing configurable via a single JS constant instead of hardcoded HTML text. Treat it as a starting point for a conversation about trust-driven onboarding UX, not a finished form.`,
      prompt: `Build a "free trial signup card" in plain HTML, CSS, and JavaScript with no dependencies or libraries.

Requirements:
- A card prominently displaying a "No credit card required" badge above the headline, not buried in fine print, plus copy stating the exact trial length (e.g. 14 days).
- A single email input with real inline validation: validate with a genuine regex check (not just relying on the browser's built-in type="email" behavior) on both the input and blur events, toggling a valid state (green border plus a fading-in checkmark icon) or an invalid state (red border plus an inline error message that animates in via a height transition, not an instant jump) — and show neither state while the field is empty.
- A submit handler that re-validates the email again regardless of the live validation state, refusing to proceed and refocusing the field if the value is invalid, so the success state can only ever be reached with a plausible email address.
- On successful submission, replace the form with a confirmation view that clearly states: what happens today (full access unlocked, no card on file, no charge), a reminder that will be sent a few days before the trial ends, and what happens automatically when the trial ends (it simply ends, nothing is billed, and upgrading is something the user actively chooses).
- A "use a different email" control that resets the card back to the signup form without a page reload, clearing any validation state.
- Keep all copy specific and concrete (real day numbers, explicit "no charge" language) rather than vague trial-signup boilerplate.`,
    },
  },
};

export default pricingFreeTrialSignupCard;
