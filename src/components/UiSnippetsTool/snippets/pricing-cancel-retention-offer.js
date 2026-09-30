const pricingCancelRetentionOffer = {
  id: 'pricing-cancel-retention-offer',
  title: 'Cancellation Retention Offer',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="cro-wrap">
  <div class="cro-card" id="croCard">

    <div class="cro-step cro-step-account" id="croAccount">
      <p class="cro-plan-name">Pro plan</p>
      <p class="cro-plan-price">$29<span>/month</span></p>
      <p class="cro-plan-note">Renews on Sep 22, 2026</p>
      <button class="cro-cancel-btn" id="croCancelBtn">Cancel subscription</button>
    </div>

    <div class="cro-step cro-step-offer" id="croOffer" hidden>
      <span class="cro-tag">Wait — before you go</span>
      <h3 class="cro-offer-title">Here's 50% off for 3 months</h3>
      <p class="cro-offer-text">Instead of canceling, keep everything you already have set up at half price. You can cancel any time during or after the offer.</p>
      <div class="cro-offer-price"><span class="cro-was">$29</span><span class="cro-now">$14.50</span><span>/month for 3 months</span></div>
      <button class="cro-accept-btn" id="croAcceptOffer">Accept 50% off</button>

      <div class="cro-alt">
        <p class="cro-alt-label">Not ready for a discount? Try this instead:</p>
        <button class="cro-alt-btn" id="croPauseBtn">Pause my subscription for 30 days</button>
        <button class="cro-continue-btn" id="croContinueCancel">Continue canceling</button>
      </div>
    </div>

    <div class="cro-step cro-step-reason" id="croReason" hidden>
      <h3 class="cro-offer-title">Before you cancel, one quick question</h3>
      <p class="cro-offer-text">What's the main reason? This helps us improve.</p>
      <div class="cro-reasons">
        <button class="cro-reason-opt" data-reason="Too expensive">Too expensive</button>
        <button class="cro-reason-opt" data-reason="Missing a feature I need">Missing a feature I need</button>
        <button class="cro-reason-opt" data-reason="Not using it enough">Not using it enough</button>
        <button class="cro-reason-opt" data-reason="Switching to another tool">Switching to another tool</button>
      </div>
    </div>

    <div class="cro-step cro-step-done" id="croDone" hidden>
      <div class="cro-done-icon" id="croDoneIcon">✓</div>
      <h3 class="cro-done-title" id="croDoneTitle"></h3>
      <p class="cro-done-text" id="croDoneText"></p>
      <button class="cro-restore-btn" id="croRestoreBtn" hidden>Undo — keep my Pro plan</button>
    </div>

  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#100b18;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.cro-wrap{width:100%;max-width:400px}
.cro-card{background:linear-gradient(165deg,#1c1430,#120d1e);border:1px solid #2e2248;border-radius:20px;padding:30px 26px}
.cro-plan-name{font-size:12.5px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:.06em}
.cro-plan-price{font-size:32px;font-weight:800;color:#f4f7fb;margin-top:8px}
.cro-plan-price span{font-size:14px;color:#8b96ab;font-weight:600}
.cro-plan-note{font-size:12.5px;color:#8b96ab;margin-top:6px}
.cro-cancel-btn{width:100%;margin-top:22px;background:transparent;border:1.5px solid #3a2d5c;color:#c3cbdb;font-family:inherit;font-size:13.5px;font-weight:700;padding:12px;border-radius:10px;cursor:pointer;transition:border-color .15s}
.cro-cancel-btn:hover{border-color:#f87171;color:#f87171}
.cro-tag{display:inline-flex;font-size:11.5px;font-weight:700;color:#a78bfa;background:rgba(167,139,250,.1);border:1px solid rgba(167,139,250,.25);padding:5px 12px;border-radius:20px}
.cro-offer-title{font-size:19px;font-weight:800;color:#f4f7fb;margin-top:14px;line-height:1.3}
.cro-offer-text{font-size:13px;color:#9aa5bd;margin-top:8px;line-height:1.55}
.cro-offer-price{margin-top:16px;display:flex;align-items:baseline;gap:8px;font-size:13px;color:#8b96ab}
.cro-was{text-decoration:line-through;color:#5c6779}
.cro-now{font-size:24px;font-weight:800;color:#34d399}
.cro-accept-btn{width:100%;margin-top:18px;background:#a78bfa;color:#1c1032;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.cro-accept-btn:hover{background:#9575f2}
.cro-alt{margin-top:20px;padding-top:18px;border-top:1px solid #2e2248;display:flex;flex-direction:column;gap:8px}
.cro-alt-label{font-size:11.5px;color:#6b7590;margin-bottom:2px}
.cro-alt-btn{background:#1c1530;border:1.5px solid #2e2248;color:#c3cbdb;font-family:inherit;font-size:13px;font-weight:600;padding:10px;border-radius:9px;cursor:pointer;transition:border-color .15s}
.cro-alt-btn:hover{border-color:#a78bfa}
.cro-continue-btn{background:transparent;border:none;color:#6b7590;font-family:inherit;font-size:12.5px;font-weight:600;padding:8px;cursor:pointer;text-decoration:underline}
.cro-continue-btn:hover{color:#9aa5bd}
.cro-reasons{margin-top:16px;display:flex;flex-direction:column;gap:8px}
.cro-reason-opt{text-align:left;background:#1c1530;border:1.5px solid #2e2248;color:#c3cbdb;font-family:inherit;font-size:13px;padding:11px 14px;border-radius:9px;cursor:pointer;transition:border-color .15s}
.cro-reason-opt:hover{border-color:#a78bfa}
.cro-step-done{text-align:center}
.cro-done-icon{width:44px;height:44px;border-radius:50%;background:rgba(167,139,250,.14);border:1px solid rgba(167,139,250,.3);color:#a78bfa;display:flex;align-items:center;justify-content:center;font-size:19px;font-weight:800;margin:0 auto}
.cro-done-title{font-size:17px;font-weight:800;color:#f4f7fb;margin-top:14px}
.cro-done-text{font-size:13px;color:#9aa5bd;margin-top:8px;line-height:1.55}
.cro-restore-btn{width:100%;margin-top:18px;background:transparent;border:1.5px solid #3a2d5c;color:#c3cbdb;font-family:inherit;font-size:13px;font-weight:700;padding:11px;border-radius:9px;cursor:pointer}
.cro-restore-btn:hover{border-color:#a78bfa;color:#a78bfa}`,

  js: `const account = document.getElementById('croAccount');
const offer = document.getElementById('croOffer');
const reason = document.getElementById('croReason');
const done = document.getElementById('croDone');
const doneIcon = document.getElementById('croDoneIcon');
const doneTitle = document.getElementById('croDoneTitle');
const doneText = document.getElementById('croDoneText');
const restoreBtn = document.getElementById('croRestoreBtn');

function showStep(step) {
  [account, offer, reason, done].forEach((el) => { el.hidden = true; });
  step.hidden = false;
}

// Step 1: clicking "Cancel subscription" never cancels immediately —
// it always routes to the retention offer first.
document.getElementById('croCancelBtn').addEventListener('click', () => {
  showStep(offer);
});

// Path A: accept the 50%-off retention offer — ends in a distinct
// "offer accepted" confirmed state, subscription stays active.
document.getElementById('croAcceptOffer').addEventListener('click', () => {
  doneIcon.textContent = '%';
  doneTitle.textContent = "You're set — 50% off for 3 months";
  doneText.textContent = 'Your Pro plan continues uninterrupted at $14.50/month through Nov 22, 2026, then returns to $29/month unless you cancel before that date.';
  restoreBtn.hidden = true;
  showStep(done);
});

// Path B: pause instead of canceling — a separate distinct end state.
document.getElementById('croPauseBtn').addEventListener('click', () => {
  doneIcon.textContent = '⏸';
  doneTitle.textContent = 'Subscription paused for 30 days';
  doneText.textContent = "You won't be charged or lose access to your saved data while paused. Your plan resumes automatically on Sep 21, 2026, or you can resume any time before then.";
  restoreBtn.hidden = true;
  showStep(done);
});

// Path C: continue canceling — ask for a reason, then confirm real cancellation.
document.getElementById('croContinueCancel').addEventListener('click', () => {
  showStep(reason);
});

reason.addEventListener('click', (e) => {
  const btn = e.target.closest('.cro-reason-opt');
  if (!btn) return;
  doneIcon.textContent = '✓';
  doneTitle.textContent = 'Subscription canceled';
  doneText.textContent = "You'll keep Pro access through Sep 22, 2026 (the end of your current billing period), then your account moves to the free plan. No further charges.";
  restoreBtn.hidden = false;
  showStep(done);
});

// Undo from the canceled state — a real distinct recovery path.
restoreBtn.addEventListener('click', () => {
  showStep(account);
});`,

  seo: {
    title: 'Cancellation Retention Offer — Free HTML CSS JS Snippet',
    description: 'A cancel-subscription flow where clicking cancel surfaces a real retention offer first, with distinct accept, pause, and confirmed-cancel end states.',
    about: {
      title: 'Cancellation Retention Offer — Real Accept, Pause, and Cancel Paths With Distinct End States',
      description: `Clicking "Cancel subscription" and having the account genuinely disappear in one step is bad for the business and, more importantly, often bad for the customer — a subscriber canceling because of a temporary budget crunch or a slow month of usage might be perfectly happy to stay with a discount or a pause instead, if the option is ever actually offered. This snippet builds the full decision tree a responsible cancellation flow should present, with three genuinely different end states rather than a single "canceled" dead end.

**The cancel button routes to an offer, never directly to cancellation**

Clicking \`#croCancelBtn\` never cancels anything by itself — it calls \`showStep(offer)\`, revealing a retention screen with a concrete, computed discount (50% off \\$29/month is \\$14.50/month, shown for a stated 3-month window) before any cancellation logic runs at all. This is the structural core of the pattern: cancellation is a multi-step decision, not a single click.

**Three distinct, real end states**

- **Accept the offer** — \`#croAcceptOffer\` leads to a confirmed state stating the discounted price, the exact date it reverts to full price, and that the subscription continues uninterrupted. The subscription was never actually canceled on this path.
- **Pause instead** — \`#croPauseBtn\` leads to a different confirmed state: no charges during the pause, data retained, and an automatic resume date. This is offered as a genuine middle ground between staying at full price and fully canceling, not a repackaged version of the discount offer.
- **Continue canceling** — \`#croContinueCancel\` doesn't cancel immediately either; it asks a one-question reason (useful, real product feedback) and only *then* shows the actual canceled confirmation, which states the exact access-through date and that no further charges will occur.

**An undo path from the real cancellation**

Even after reaching the genuinely canceled state, \`#croRestoreBtn\` offers one more chance to return to the active account view — modeling the common production pattern where a cancellation takes effect at the end of the current billing period rather than instantly, leaving a window during which undoing it is a real, meaningful option rather than cosmetic.

**Why each end state has different copy, not a shared template**

A single generic "Done!" message would blur the very distinction this pattern exists to preserve. Each path's confirmation states the specific mechanics that differ: the accepted-offer path names a revert date, the paused path names a resume date, and the canceled path names an access-through date — because a customer in any of these three states has a genuinely different question they need answered.

**Customizing it**

Swap the 50%-off, 3-month terms for your own retention offer, wire each end state to your real subscription-management API instead of local demo state, and pair the reason-collection step with your product analytics so cancellation reasons feed back into your retention strategy.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click Cancel subscription', text: 'This never cancels immediately — it reveals the retention offer.' },
      { title: 'Accept the 50% off offer', text: 'Confirms a distinct state where the plan continues at a discount.' },
      { title: 'Or choose Pause instead', text: 'Confirms a separate state with no charges and an automatic resume date.' },
      { title: 'Or continue canceling', text: 'A one-question reason step appears before the real cancellation confirms.' },
      { title: 'Read the canceled confirmation', text: 'States the exact access-through date and that no further charges occur.' },
      { title: 'Use the undo option', text: 'The canceled state offers one more path back to the active account.' },
    ] },
    features: [
      { title: 'Offer-first cancellation', text: 'Cancel never fires directly — the retention offer always shows first.' },
      { title: 'Real computed discount', text: '50% off $29 is shown correctly as $14.50/month.' },
      { title: 'Three distinct end states', text: 'Accepted offer, paused, and canceled each have unique copy.' },
      { title: 'A genuine pause alternative', text: 'Not a repackaged discount — a separate no-charge option.' },
      { title: 'One-question exit survey', text: 'Collects a real cancellation reason before confirming.' },
      { title: 'Explicit dates in every confirmation', text: 'Revert, resume, or access-through dates are always stated.' },
      { title: 'Undo path after cancellation', text: 'Models a real billing-period grace window.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS state machine.' },
    ],
    useCases: [
      { title: 'SaaS subscription management', text: 'A responsible cancel flow beside a [plan selector](/ui-snippets/plan-selector/).' },
      { title: 'Streaming and membership services', text: 'Offer pause as a genuine alternative to canceling.' },
      { title: 'Churn-reduction experiments', text: 'A/B test offer terms against pause-first framing.' },
      { title: 'Customer success tooling', text: 'Feed collected cancellation reasons into retention analytics.' },
      { title: 'Billing settings pages', text: 'Pair with [subscription pause/resume](/ui-snippets/subscription-pause-resume/).' },
      { title: 'Teaching multi-step state machines', text: 'A clean reference for branching confirmation flows.' },
      { icon: 'CODE', title: 'Related: Bundle Savings Card', desc: 'See the [Bundle Savings Card](/ui-snippets/pricing-bundle-savings-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does clicking "Cancel subscription" ever cancel immediately?', a: 'No — by design it never does. The click handler on the cancel button only calls showStep(offer), which reveals the retention screen. Actual cancellation only happens after explicitly clicking "Continue canceling," answering the one-question reason prompt, and reaching the dedicated canceled confirmation state.' },
      { q: 'Is the pause option just the discount offer relabeled?', a: 'No — they are two structurally separate paths with different copy and different real-world mechanics. Accepting the discount keeps the subscription active at a reduced price for a stated window; pausing stops charges entirely for 30 days while retaining saved data, with an automatic resume date. Each end state names its own specific terms rather than sharing generic confirmation text.' },
      { q: 'Why ask for a cancellation reason before confirming the cancellation?', a: 'Collecting a real reason at the moment of cancellation is valuable, unbiased product feedback — the customer has already decided to leave, so their answer is not influenced by a desire to justify staying. It also gives the flow one more natural pause before the irreversible-feeling final click, without blocking or guilt-tripping the user into staying.' },
      { q: 'What does the undo button after cancellation actually represent?', a: 'It models a common real-world pattern: many subscription cancellations take effect at the end of the current billing period rather than instantly, leaving a window during which a customer retains access and can genuinely reverse the cancellation. The restore button returns to the active-account view to represent using that window.' },
      { q: 'How would I wire this to a real subscription API?', a: 'Replace each local showStep(done) call with an actual API request (e.g. apply-discount, pause-subscription, or cancel-subscription) and only transition to the corresponding confirmed state once that request succeeds, showing an error state if it fails. The reason selection should also be sent to your backend or analytics pipeline as real signal.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain why the cancel button never directly triggers a canceled state, and how the three end states (accepted offer, paused, and canceled) each encode genuinely different real-world billing mechanics rather than sharing one generic confirmation template. It's also a good candidate to extend — ask it to wire each transition to a real subscription-management API with loading and error states, add a second retention offer tier for users who decline the first, or send the collected cancellation reason to an analytics endpoint.`,
      prompt: `Build a "cancellation retention offer" flow in plain HTML, CSS, and JavaScript with no dependencies, implemented as a simple step-based state machine (show one step at a time, hide the rest).

Requirements:
- An account view showing the current plan and price with a "Cancel subscription" button. Clicking it must NOT cancel anything directly — it must reveal a retention offer screen instead.
- The retention offer screen shows a real, correctly computed discount (e.g. 50% off the actual displayed price, not a separately made-up discounted number) for a stated limited time window, with an "Accept offer" button and, separately, a "Pause instead" option and a "Continue canceling" link.
- Accepting the offer must lead to a distinct confirmed state whose copy states the discounted price, the exact date it reverts to full price, and that the subscription remains active — this must be a different end state from the other two paths, not shared generic text.
- Choosing "Pause instead" must lead to a second distinct confirmed state describing no charges during the pause, retained data, and an automatic resume date — modeled as a genuinely separate alternative from the discount offer, not the same offer relabeled.
- Choosing "Continue canceling" must first ask a one-question reason (a small set of selectable reason buttons), and only after a reason is selected show a third distinct confirmed cancellation state stating the exact date access continues through and that no further charges will occur.
- The canceled confirmation state should include an "undo" control that returns to the active account view, representing a real grace-period window before the cancellation would actually finalize.`,
    },
  },
};

export default pricingCancelRetentionOffer;
