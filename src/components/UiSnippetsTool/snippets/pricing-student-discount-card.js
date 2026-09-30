const pricingStudentDiscountCard = {
  id: 'pricing-student-discount-card',
  title: 'Student & Nonprofit Discount Card',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="sdc-wrap">
  <div class="sdc-card" id="sdcCard">
    <span class="sdc-badge">Students &amp; nonprofits</span>
    <p class="sdc-plan">Pro plan</p>

    <div class="sdc-price-row">
      <span class="sdc-old" id="sdcOld">$20</span>
      <span class="sdc-new" id="sdcNew">$8</span>
      <span class="sdc-period">/month</span>
    </div>
    <p class="sdc-savings" id="sdcSavings">Save 60% — $144/year</p>

    <ul class="sdc-features">
      <li>Everything in Pro</li>
      <li>Unlimited projects</li>
      <li>Priority support</li>
    </ul>

    <div class="sdc-verify" id="sdcVerify">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M12 2l8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4z" stroke="currentColor" stroke-width="2"/></svg>
      <span>Verification required — we confirm eligibility via SheerID before your discount activates.</span>
    </div>

    <button class="sdc-cta" id="sdcCta">Verify eligibility &amp; claim discount</button>

    <div class="sdc-verify-panel" id="sdcVerifyPanel" hidden>
      <p class="sdc-verify-title">Confirm your status</p>
      <div class="sdc-verify-options">
        <button class="sdc-verify-opt" data-type="student">🎓 I'm a student</button>
        <button class="sdc-verify-opt" data-type="nonprofit">🤝 I work at a nonprofit</button>
      </div>
      <p class="sdc-verify-hint" id="sdcVerifyHint"></p>
    </div>

    <div class="sdc-done" id="sdcDone" hidden>
      <div class="sdc-done-icon">✓</div>
      <p class="sdc-done-title">Verification submitted</p>
      <p class="sdc-done-text">We'll email you within 1 business day once your <span id="sdcDoneType">student</span> status is confirmed — your discount applies automatically from that point.</p>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#12100a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.sdc-wrap{width:100%;max-width:380px}
.sdc-card{background:linear-gradient(165deg,#241d0f,#14110a);border:1px solid #3a2f16;border-radius:20px;padding:30px 26px}
.sdc-badge{display:inline-flex;font-size:11.5px;font-weight:700;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.25);padding:5px 12px;border-radius:20px}
.sdc-plan{font-size:13px;font-weight:700;color:#c3cbdb;margin-top:16px}
.sdc-price-row{display:flex;align-items:baseline;gap:9px;margin-top:8px}
.sdc-old{font-size:18px;color:#5c6779;text-decoration:line-through}
.sdc-new{font-size:38px;font-weight:800;color:#f4f7fb;letter-spacing:-.02em}
.sdc-period{font-size:13px;color:#8b96ab;font-weight:600}
.sdc-savings{font-size:12.5px;font-weight:700;color:#fbbf24;margin-top:6px}
.sdc-features{list-style:none;margin-top:18px;display:flex;flex-direction:column;gap:9px}
.sdc-features li{font-size:13px;color:#c3cbdb;padding-left:22px;position:relative}
.sdc-features li::before{content:'';position:absolute;left:0;top:3px;width:14px;height:14px;border-radius:50%;background:rgba(251,191,36,.14);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23fbbf24' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:center;background-size:8px}
.sdc-verify{display:flex;gap:9px;align-items:flex-start;margin-top:20px;padding:12px;background:rgba(251,191,36,.06);border:1px solid rgba(251,191,36,.18);border-radius:10px;color:#e0c789;font-size:12px;line-height:1.5}
.sdc-verify svg{flex:none;margin-top:1px;color:#fbbf24}
.sdc-cta{width:100%;margin-top:16px;background:#fbbf24;color:#2c2205;border:none;font-family:inherit;font-size:14px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.sdc-cta:hover{background:#f0b30f}
.sdc-verify-panel{margin-top:18px;padding-top:18px;border-top:1px solid #3a2f16}
.sdc-verify-title{font-size:13px;font-weight:700;color:#f4f7fb;margin-bottom:12px}
.sdc-verify-options{display:flex;flex-direction:column;gap:8px}
.sdc-verify-opt{text-align:left;background:#1c1710;border:1.5px solid #3a2f16;color:#c3cbdb;font-family:inherit;font-size:13px;padding:11px 14px;border-radius:9px;cursor:pointer;transition:border-color .15s}
.sdc-verify-opt:hover{border-color:#fbbf24}
.sdc-verify-hint{font-size:11.5px;color:#5c6779;margin-top:10px}
.sdc-done{text-align:center;margin-top:20px;padding-top:20px;border-top:1px solid #3a2f16}
.sdc-done-icon{width:40px;height:40px;border-radius:50%;background:rgba(251,191,36,.14);border:1px solid rgba(251,191,36,.3);color:#fbbf24;display:flex;align-items:center;justify-content:center;font-size:18px;font-weight:800;margin:0 auto}
.sdc-done-title{font-size:15px;font-weight:800;color:#f4f7fb;margin-top:12px}
.sdc-done-text{font-size:12.5px;color:#8b96ab;margin-top:6px;line-height:1.55}`,

  js: `// Real computed discount — the displayed numbers are derived, not hand-typed.
const FULL_PRICE = 20;
const DISCOUNT_PCT = 60; // percent off for verified students/nonprofits
const discountedPrice = FULL_PRICE * (1 - DISCOUNT_PCT / 100); // 20 * 0.4 = 8
const annualSavings = (FULL_PRICE - discountedPrice) * 12; // 12 * 12 = 144

document.getElementById('sdcOld').textContent = '$' + FULL_PRICE;
document.getElementById('sdcNew').textContent = '$' + discountedPrice;
document.getElementById('sdcSavings').textContent =
  'Save ' + DISCOUNT_PCT + '% — $' + annualSavings + '/year';

const cta = document.getElementById('sdcCta');
const verify = document.getElementById('sdcVerify');
const panel = document.getElementById('sdcVerifyPanel');
const done = document.getElementById('sdcDone');
const hint = document.getElementById('sdcVerifyHint');
const doneType = document.getElementById('sdcDoneType');

cta.addEventListener('click', () => {
  cta.hidden = true;
  panel.hidden = false;
});

panel.addEventListener('click', (e) => {
  const btn = e.target.closest('.sdc-verify-opt');
  if (!btn) return;
  const type = btn.dataset.type;
  hint.textContent = 'Redirecting to our verification partner to confirm your ' +
    (type === 'student' ? 'student' : 'nonprofit') + ' status…';

  // Mocked verification step — in production this redirects to a real
  // eligibility-verification provider (e.g. SheerID) and returns via webhook.
  setTimeout(() => {
    panel.hidden = true;
    verify.hidden = true;
    doneType.textContent = type === 'student' ? 'student' : 'nonprofit';
    done.hidden = false;
  }, 900);
});`,

  seo: {
    title: 'Student & Nonprofit Discount Card — Free HTML CSS JS Snippet',
    description: 'A discounted pricing card with a computed discount, an explicit verification-required notice, and a mocked eligibility-verification step — distinct from a coupon code.',
    about: {
      title: 'Student & Nonprofit Discount Card — Computed Discount, Verification Notice, and a Distinct Eligibility Flow',
      description: `Student and nonprofit discounts are structurally different from a generic promo code: they require proving eligibility, not just knowing a string. Applying a coupon code is instant and self-serve; a student or nonprofit discount typically routes through a third-party eligibility-verification service (SheerID and similar providers are common in production) that checks a .edu email, an enrollment record, or a nonprofit registry before the discount actually activates. This snippet models that distinction directly in the UI instead of collapsing it into a generic "have a code?" input.

**A discount that's genuinely computed**

The full price, discount percentage, discounted price, and annual savings are not four separately hand-typed numbers that happen to agree — only \`FULL_PRICE\` and \`DISCOUNT_PCT\` are set directly; everything else is derived: \`discountedPrice = FULL_PRICE * (1 - DISCOUNT_PCT / 100)\` and \`annualSavings = (FULL_PRICE - discountedPrice) * 12\`. At \\$20/month and 60% off, that's \\$8/month and \\$144/year in savings — change either constant and every displayed figure recalculates consistently, which is exactly the property you want when the same discount logic might later drive a real checkout total.

**The verification notice sits above the CTA, not after it**

Rather than let a visitor assume the discount applies the moment they click "Subscribe," the \`.sdc-verify\` block states plainly, before any button is pressed, that eligibility is confirmed by a verification partner before the discount activates. Setting that expectation early avoids the frustrating pattern of a visitor completing checkout only to discover afterward that a follow-up verification step stands between them and the price they thought they'd locked in.

**A distinct flow, not a coupon input**

Clicking the CTA doesn't reveal a text field for a code — it reveals two identity options ("I'm a student" / "I work at a nonprofit"), because the two paths verify against different data sources in a real implementation (an academic email or enrollment record versus a nonprofit registry lookup). This is deliberately modeled apart from a [coupon card](/ui-snippets/coupon-card/) or [promo code input](/ui-snippets/promo-code-input/), which apply immediately against a known code with no external verification step.

**A mocked hand-off that mirrors the real one**

The \`setTimeout\` after picking a verification type stands in for a real redirect to a verification provider, which returns control to your app via a webhook or redirect once eligibility is confirmed — that's why the completed state explicitly says "We'll email you within 1 business day" rather than "You're now on the discounted plan," since real verification is rarely instant.

**Customizing it**

Swap in your real full price and discount percentage — the computed fields update automatically — and replace the mocked \`setTimeout\` with an actual redirect to your verification provider's hosted flow, resuming this component's completed state once their webhook confirms eligibility.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Read the computed price', text: 'The discounted price and annual savings are derived from FULL_PRICE and DISCOUNT_PCT, not hardcoded.' },
      { title: 'Note the verification notice', text: 'The card states upfront that eligibility is confirmed before the discount activates.' },
      { title: 'Click the CTA', text: 'A verification panel appears offering student or nonprofit identity options.' },
      { title: 'Choose an option', text: 'A mocked hand-off simulates redirecting to a verification partner.' },
      { title: 'See the completed state', text: 'A confirmation explains the discount applies once eligibility is confirmed by email.' },
      { title: 'Adjust the discount', text: 'Change FULL_PRICE or DISCOUNT_PCT and every derived figure recalculates.' },
    ] },
    features: [
      { title: 'Fully computed discount math', text: 'Discounted price and annual savings derive from two constants.' },
      { title: 'Verification-required notice', text: 'Sets expectations before the CTA, not after checkout.' },
      { title: 'Distinct identity options', text: 'Student vs. nonprofit paths, not a generic coupon field.' },
      { title: 'Mocked verification hand-off', text: 'Models a redirect to a real eligibility provider.' },
      { title: 'Honest completed-state copy', text: 'States a real timeline instead of implying instant activation.' },
      { title: 'Struck-through original price', text: 'Makes the discount visually legible at a glance.' },
      { title: 'Dark, distinct visual theme', text: 'Amber accent differentiates it from other pricing cards.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS.' },
    ],
    useCases: [
      { title: 'Education-focused SaaS', text: 'Offer verified student pricing distinct from a public discount.' },
      { title: 'Nonprofit tooling', text: 'Route nonprofit eligibility through a dedicated verification step.' },
      { title: 'Alongside a coupon flow', text: 'Pair with [promo code input](/ui-snippets/promo-code-input/) for general discounts.' },
      { title: 'Plan comparison pages', text: 'Sit beside a standard [pricing card](/ui-snippets/pricing-card/).' },
      { title: 'Onboarding for .edu users', text: 'Trigger this card after detecting an academic email domain.' },
      { title: 'Community/open-source tools', text: 'Offer nonprofit pricing without a manual approval queue.' },
      { icon: 'CODE', title: 'Related: Transparent Fees Breakdown', desc: 'See the [Transparent Fees Breakdown](/ui-snippets/pricing-hidden-fees-breakdown/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is this different from a coupon code input?', a: 'A coupon code proves nothing about who is applying it — anyone with the string gets the discount instantly. Student and nonprofit discounts need to verify an actual eligibility fact (enrollment status, nonprofit registration), which is why this card routes through a distinct verification step with identity options instead of a text field, and why the completed state describes a follow-up confirmation rather than instant activation.' },
      { q: 'Are the price and savings numbers really computed?', a: "Yes. Only FULL_PRICE ($20) and DISCOUNT_PCT (60) are set directly in the JS; discountedPrice and annualSavings are both calculated from them (20 * 0.4 = $8/month, and $12 saved per month * 12 = $144/year). Changing either constant updates every displayed number consistently, since nothing is hand-typed as a separate hardcoded string." },
      { q: 'Does clicking a verification option actually verify anything?', a: 'No — this is a self-contained front-end demo, so the setTimeout after choosing student or nonprofit simulates a redirect to a real verification provider. In production, replace that timeout with an actual redirect (or embedded widget) from a provider like SheerID, and only show the completed state once their callback or webhook confirms eligibility.' },
      { q: 'Why does the completed state say "within 1 business day" instead of confirming immediately?', a: "Because real identity verification against academic or nonprofit records is rarely instant in production — some checks resolve in seconds, others require manual review. Stating a realistic timeframe upfront avoids the worse experience of a visitor expecting immediate activation and being confused when the discount doesn't yet appear on their account." },
      { q: 'How would I detect eligibility automatically instead of asking?', a: "Some products auto-detect a likely student by checking for a .edu (or country-equivalent academic) email domain during signup and pre-selecting the student path, while still requiring the same underlying verification step to actually apply the discount — auto-detection can speed up the flow, but should never replace real verification, since email domains can be spoofed or reused after graduation." },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain why discountedPrice and annualSavings are computed from FULL_PRICE and DISCOUNT_PCT rather than hardcoded, and why the verification flow uses distinct student/nonprofit identity options instead of a single generic coupon-code field. It's also useful for extending the flow — ask it to wire the mocked setTimeout hand-off to a real verification provider's SDK or hosted redirect, add a .edu email pre-check that pre-selects the student path, or build the equivalent "discount already applied, pending expiration" state for a previously verified user whose eligibility needs periodic re-confirmation.`,
      prompt: `Build a "student and nonprofit discount pricing card" in plain HTML, CSS, and JavaScript with no dependencies.

Requirements:
- Show a discounted price for a named plan, where only a full price constant and a discount percentage constant are set directly in the code — the discounted monthly price and the annual dollar savings must both be computed from those two constants (not separately hardcoded), so changing either constant updates every displayed number consistently and correctly.
- Display the original price with a strikethrough next to the discounted price, plus a savings line stating both the percentage off and the computed annual dollar savings.
- Include a clearly visible "verification required" notice, placed before the call-to-action button, explaining that eligibility is confirmed by a verification step before the discount activates — do not let the CTA imply the discount applies immediately.
- Clicking the CTA must NOT reveal a generic coupon-code text input. Instead reveal two distinct identity options (e.g. "I'm a student" and "I work at a nonprofit"), since real student/nonprofit verification checks different eligibility criteria depending on which applies.
- Selecting an identity option triggers a mocked hand-off (e.g. a short delayed transition) simulating a redirect to a third-party eligibility-verification provider, then shows a completed state.
- The completed state must use honest, non-instant copy — state that the user will be notified once their status is confirmed (e.g. "within 1 business day"), rather than claiming the discount is active immediately, since real identity verification in production is rarely instant.`,
    },
  },
};

export default pricingStudentDiscountCard;
