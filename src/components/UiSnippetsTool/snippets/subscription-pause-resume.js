const subscriptionPauseResume = {
  id: 'subscription-pause-resume',
  title: 'Subscription Pause/Resume Flow',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="spr-card">
  <div class="spr-head">
    <div>
      <span class="spr-plan-label">Current plan</span>
      <h3 class="spr-plan-name">Studio Pro</h3>
    </div>
    <span class="spr-state" id="sprState">Active</span>
  </div>

  <div class="spr-row">
    <span>Next billing date</span>
    <b id="sprBillingDate">September 22, 2026</b>
  </div>
  <div class="spr-row">
    <span>Price</span>
    <b>$32.00 / month</b>
  </div>

  <div class="spr-toggle-wrap">
    <button type="button" class="spr-toggle" id="sprToggleBtn" role="switch" aria-checked="false">
      <span class="spr-toggle-track"><span class="spr-toggle-thumb"></span></span>
      <span class="spr-toggle-label" id="sprToggleLabel">Pause subscription</span>
    </button>
  </div>

  <div class="spr-pause-panel" id="sprPausePanel" hidden>
    <label class="spr-resume-label" for="sprResumeDate">Resume by</label>
    <input type="date" id="sprResumeDate" class="spr-date-input">

    <ul class="spr-info-list">
      <li><span class="spr-check">✓</span> You will not be charged while paused</li>
      <li><span class="spr-check">✓</span> Access continues until <b id="sprPeriodEnd">Sep 22</b>, then pauses</li>
      <li><span class="spr-check">✓</span> Auto-resumes on the date above, or resume anytime sooner</li>
    </ul>
  </div>

  <p class="spr-footnote" id="sprFootnote">Pausing keeps your data and settings — you won't lose anything.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d1117;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.spr-card{width:100%;max-width:380px;background:#151b26;border:1px solid #232c3d;border-radius:18px;padding:22px;box-shadow:0 24px 60px rgba(0,0,0,.4)}

.spr-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:16px}
.spr-plan-label{display:block;font-size:11px;color:#7d8aa3;text-transform:uppercase;letter-spacing:.05em;font-weight:700;margin-bottom:3px}
.spr-plan-name{font-size:19px;font-weight:800;color:#f1f5fb}
.spr-state{font-size:11.5px;font-weight:800;color:#4ade80;background:rgba(74,222,128,.12);padding:5px 10px;border-radius:999px;white-space:nowrap}
.spr-state.paused{color:#fbbf24;background:rgba(251,191,36,.12)}

.spr-row{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#8b96ac;padding:9px 0;border-bottom:1px solid #1e2634}
.spr-row b{color:#f1f5fb;font-weight:700}

.spr-toggle-wrap{margin:16px 0 4px}
.spr-toggle{width:100%;display:flex;align-items:center;gap:12px;background:#111722;border:1.5px solid #232c3d;border-radius:12px;padding:12px 14px;cursor:pointer;font-family:inherit}
.spr-toggle:hover{border-color:#324055}
.spr-toggle-track{width:38px;height:22px;border-radius:999px;background:#2a3345;position:relative;transition:background .2s;flex-shrink:0}
.spr-toggle-thumb{position:absolute;top:2px;left:2px;width:18px;height:18px;border-radius:50%;background:#fff;transition:transform .2s}
.spr-toggle[aria-checked="true"] .spr-toggle-track{background:#fbbf24}
.spr-toggle[aria-checked="true"] .spr-toggle-thumb{transform:translateX(16px)}
.spr-toggle-label{font-size:13.5px;font-weight:700;color:#e2e8f4}

.spr-pause-panel{margin-top:14px;padding:14px;background:#131a26;border:1px solid #232c3d;border-radius:12px}
.spr-resume-label{display:block;font-size:11.5px;font-weight:700;color:#8b96ac;margin-bottom:6px}
.spr-date-input{width:100%;padding:9px 10px;border-radius:8px;border:1.5px solid #2a3345;background:#0d1320;color:#f1f5fb;font-family:inherit;font-size:13px;margin-bottom:12px}
.spr-date-input:focus{outline:none;border-color:#fbbf24}

.spr-info-list{list-style:none;display:flex;flex-direction:column;gap:7px}
.spr-info-list li{display:flex;align-items:flex-start;gap:8px;font-size:12.5px;color:#a9b3c7;line-height:1.4}
.spr-info-list b{color:#e2e8f4}
.spr-check{color:#4ade80;font-weight:800;flex-shrink:0}

.spr-footnote{margin-top:14px;font-size:11.5px;color:#5f6b81;text-align:center}`,

  js: `var toggleBtn = document.getElementById('sprToggleBtn');
var toggleLabel = document.getElementById('sprToggleLabel');
var stateEl = document.getElementById('sprState');
var pausePanel = document.getElementById('sprPausePanel');
var resumeDateInput = document.getElementById('sprResumeDate');
var footnote = document.getElementById('sprFootnote');
var periodEndEl = document.getElementById('sprPeriodEnd');

var BILLING_DATE_TEXT = 'September 22, 2026';
var PERIOD_END_SHORT = 'Sep 22';

function defaultResumeDate() {
  var d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

resumeDateInput.value = defaultResumeDate();
resumeDateInput.min = new Date().toISOString().slice(0, 10);

function setPaused(paused) {
  toggleBtn.setAttribute('aria-checked', String(paused));

  if (paused) {
    stateEl.textContent = 'Paused';
    stateEl.classList.add('paused');
    toggleLabel.textContent = 'Resume subscription';
    pausePanel.removeAttribute('hidden');
    footnote.textContent = 'Your subscription is paused. It will auto-resume on the selected date.';
    periodEndEl.textContent = PERIOD_END_SHORT;
  } else {
    stateEl.textContent = 'Active';
    stateEl.classList.remove('paused');
    toggleLabel.textContent = 'Pause subscription';
    pausePanel.setAttribute('hidden', '');
    footnote.textContent = "Pausing keeps your data and settings \\u2014 you won't lose anything.";
  }
}

toggleBtn.addEventListener('click', function () {
  var currentlyPaused = toggleBtn.getAttribute('aria-checked') === 'true';
  setPaused(!currentlyPaused);
});

resumeDateInput.addEventListener('change', function () {
  if (!resumeDateInput.value) return;
  var d = new Date(resumeDateInput.value + 'T00:00:00');
  var formatted = d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  footnote.textContent = 'Your subscription will auto-resume on ' + formatted + '.';
});`,

  seo: {
    title: 'Subscription Pause/Resume Flow — Free Billing State UI',
    description: `A subscription card with a pause/resume toggle, a resume-by date picker, and clear plain-language billing messaging while paused. Pure HTML, CSS & JS.`,
    about: {
      title: 'Subscription Pause/Resume — A Toggle That Explains Its Own Consequences',
      description: `Pausing a subscription is a moment where ambiguity causes support tickets: will I be charged? Do I lose access immediately? When does it come back? This snippet builds a pause/resume card that answers all three questions inline, the moment the toggle flips, instead of hiding the consequences behind a separate help article — a pattern worth pairing with a [subscription widget](/ui-snippets/subscription-widget/) or [pricing toggle](/ui-snippets/pricing-toggle/) in a billing settings page.

**A real switch, not a decoration**

The toggle is a \`<button role="switch" aria-checked>\` rather than a styled checkbox — \`role="switch"\` is the correct ARIA role for a control that represents an on/off state with an immediate effect (as opposed to a checkbox in a form awaiting submission). The thumb position and track color are driven entirely by the \`aria-checked\` attribute via CSS attribute selectors, so the visual state and the accessible state can never drift apart.

**The panel that appears only explains, never confuses**

Toggling to paused reveals a panel — hidden via the \`hidden\` attribute, not CSS-only — with a resume-by date picker and a three-line list, each prefixed with a checkmark, stating exactly what happens: no charge, access continues until period end, and auto-resume behavior. This is the core UX principle: don't just change a status label, restate the consequences at the moment the user needs to know them.

**Resume date defaults sensibly**

The date input defaults 30 days out and its \`min\` attribute is set to today, so a user can't accidentally pick a resume date in the past. Changing the date updates the footnote to a human-readable confirmation ("Your subscription will auto-resume on...") using \`toLocaleDateString\`, giving immediate feedback that the date was registered.

**One function owns both states**

\`setPaused(paused)\` is the single function that updates the switch, the status badge, the toggle's own label ("Pause" vs. "Resume"), the panel's visibility, and the footnote text — all from one boolean. This mirrors the same "one source of truth drives every dependent element" pattern used across this library, and makes it straightforward to call \`setPaused\` from a real API response instead of just a click handler.

**Wiring it to real billing**

Replace the toggle handler with an API call to your billing provider (Stripe subscriptions support a native pause-collection state), and only call \`setPaused\` once that call resolves — add a brief loading state on the toggle in between. Read the actual next-billing and period-end dates from your subscription object rather than the hardcoded strings here.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An active subscription card renders with plan, price, and next billing date.` },
      { title: 'Click the toggle', text: `It switches to "Paused" and reveals a resume-by date picker plus a plain-language explanation of billing behavior.` },
      { title: 'Pick a resume date', text: `The date input defaults 30 days out and can't be set in the past; changing it updates the confirmation footnote.` },
      { title: 'Click the toggle again', text: `It resumes the subscription, hides the panel, and restores the default footnote.` },
      { title: 'Wire real billing dates', text: `Replace BILLING_DATE_TEXT and PERIOD_END_SHORT with values from your subscription object.` },
      { title: 'Connect the API', text: `Call your billing provider's pause/resume endpoint in the toggle handler before calling setPaused.` },
    ] },
    features: [
      { title: 'True ARIA switch', text: `role="switch" with aria-checked, not a styled checkbox pretending to be one.` },
      { title: 'Attribute-driven styling', text: `Thumb position and track color read directly off aria-checked via CSS.` },
      { title: 'Consequence-first messaging', text: `A three-line checklist states the no-charge, access, and auto-resume behavior inline.` },
      { title: 'Sensible date defaults', text: `Resume date defaults 30 days out with a min of today.` },
      { title: 'Live date confirmation', text: `Changing the resume date updates a human-readable footnote immediately.` },
      { title: 'Single state function', text: `setPaused() is the one place that updates every dependent element.` },
      { title: 'Accessible panel toggling', text: `The pause panel uses the hidden attribute, not a CSS-only display hack.` },
      { title: 'Status badge color-coding', text: `Active (green) and Paused (amber) are visually distinct at a glance.` },
    ],
    useCases: [
      { title: 'SaaS billing settings', text: 'Let users pause instead of cancelling, with a true `role="switch"` toggle and a resume date defaulting to thirty days away.' },
      { title: 'Gym and membership apps', text: 'Handle seasonal pauses in gym and membership apps with plain language about whether billing continues and whether access ends immediately.' },
      { title: 'Meal kit and box subscriptions', text: 'Communicate exactly when the next box is due, using a three-line checklist covering charges, access and resume date.' },
      { title: 'Streaming and media plans', text: 'Pair with a [pricing toggle](/ui-snippets/pricing-toggle/) for plan changes, with thumb and track styled straight from `aria-checked`.' },
      { title: 'Retention and billing support', text: 'Offer pause as an alternative in cancel flows, reducing will I be charged tickets, or add a [subscription widget](/ui-snippets/subscription-widget/) for management.' },
    ],
    faqs: [
      { q: 'Why is the toggle a button with role="switch" instead of a checkbox?', a: `role="switch" is the correct ARIA role for a control representing an on/off state that takes effect immediately, as opposed to a checkbox that typically awaits form submission. Using a real switch role means screen readers announce it correctly as "Pause subscription, switch, off" and toggling it, rather than describing it as a checkbox being checked.` },
      { q: 'How does the panel know to only show consequences while paused?', a: `The pause panel is hidden using the HTML hidden attribute, toggled by the single setPaused(paused) function — the same function that updates the switch, status badge, and toggle label. Because one function owns all of these, the panel can never be visible while the badge still reads "Active", or vice versa.` },
      { q: 'How do I prevent users from picking a resume date in the past?', a: `The date input's min attribute is set to today's date (new Date().toISOString().slice(0, 10)) on page load, which makes the browser's native date picker refuse to let users select an earlier date. The default value is also set 30 days out so there's a sensible starting point rather than an empty field.` },
      { q: 'How do I connect this to a real billing provider like Stripe?', a: `Stripe subscriptions support a native pause_collection behavior. In the toggle's click handler, call your backend endpoint that sets or clears pause_collection on the subscription, show a brief loading state on the toggle while that request is in flight, and only call setPaused(true/false) once the API call resolves successfully — reverting the toggle and showing an error if it fails.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold isPaused and resumeDate in component state. Derive the switch's aria-checked, the status badge text/color, the panel's visibility, and the footnote all from isPaused in render — mirroring what setPaused() does directly to the DOM here. Make the toggle handler async so it can await a real billing API call before updating state.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the accessibility details or the consequence-messaging pattern on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why role="switch" with aria-checked is the correct ARIA pattern here rather than a checkbox, and how the CSS attribute selectors on aria-checked keep the toggle's visual state permanently in sync with its accessible state. The same assistant can help optimize it — asking whether setPaused() doing too much in one function is a problem as the card grows more billing states (trial, past-due, canceled), or how you'd restructure it into a small state machine. It's also useful for extending the flow: ask it to wire the toggle to a real Stripe pause_collection API call with a loading and error state, add a "cancel instead" secondary action, or show a preview of the exact dollar amount that will be skipped while paused. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "subscription pause/resume" card in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A card showing the current plan name, price, next billing date, and a color-coded status badge (green for Active, amber for Paused).
- A toggle control built as a real button with role="switch" and an aria-checked attribute (true/false) — not a styled checkbox — whose visual thumb position and track color are driven purely by CSS attribute selectors reading aria-checked, so the visual and accessible state can never disagree.
- Clicking the toggle must switch between Active and Paused states, and a single function must own updating every dependent element at once (the switch itself, the status badge text/color, the toggle's own label text, and a reveal panel) so none of them can ever fall out of sync with each other.
- When paused, reveal a panel (using the HTML hidden attribute, not just a CSS display trick) containing: a "resume by" date input defaulting to 30 days from today with its min attribute set to today (so a past date cannot be selected), and a three-item checklist explicitly stating that no charge occurs while paused, that access continues until the current billing period ends, and that the subscription auto-resumes on the selected date or can be resumed sooner manually.
- Changing the resume date must update a footnote with a human-readable confirmation of the new resume date (use toLocaleDateString or equivalent), and toggling back to Active must hide the panel and restore a default footnote reassuring the user that pausing preserves their data and settings.`,
    },
  },
};

export default subscriptionPauseResume;
