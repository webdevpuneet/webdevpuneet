const bnplPaymentSelector = {
  id: 'bnpl-payment-selector',
  title: 'Buy Now Pay Later Selector',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<form class="bnp-card" id="bnpForm">
  <h3>Choose how to pay</h3>
  <p class="bnp-sub">Order total: <b>$198.00</b></p>

  <div class="bnp-group" role="radiogroup" aria-label="Payment method">
    <label class="bnp-option">
      <input type="radio" name="pay-method" value="full" checked>
      <span class="bnp-box">
        <span class="bnp-top">
          <span class="bnp-name">Pay in full</span>
          <span class="bnp-price">$198.00</span>
        </span>
        <span class="bnp-desc">Charged today to your card. No interest, no fees.</span>
        <span class="bnp-tick" aria-hidden="true"></span>
      </span>
    </label>

    <label class="bnp-option">
      <input type="radio" name="pay-method" value="bnpl">
      <span class="bnp-box">
        <span class="bnp-flag">0% interest</span>
        <span class="bnp-top">
          <span class="bnp-name">Pay in 4</span>
          <span class="bnp-price">$49.50<small>&times;4</small></span>
        </span>
        <span class="bnp-desc">Split into 4 interest-free payments, every 2 weeks.</span>
        <span class="bnp-tick" aria-hidden="true"></span>
      </span>
    </label>
  </div>

  <div class="bnp-schedule" id="bnpSchedule" hidden>
    <span class="bnp-schedule-label">Payment schedule</span>
    <ul class="bnp-installments" id="bnpInstallments"></ul>
  </div>

  <button type="submit" class="bnp-submit" id="bnpSubmit">Continue &middot; Pay in full today</button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f1115;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 24px}

.bnp-card{background:#181b22;border:1px solid #262a34;border-radius:18px;padding:24px;width:100%;max-width:420px;box-shadow:0 24px 60px rgba(0,0,0,.4)}
.bnp-card h3{font-size:17px;font-weight:800;color:#f2f4f9}
.bnp-sub{font-size:13px;color:#8b92a5;margin:4px 0 18px}
.bnp-sub b{color:#e7ebf3}

.bnp-group{display:flex;flex-direction:column;gap:10px;margin-bottom:6px}
.bnp-option{display:block;cursor:pointer}
.bnp-option input{position:absolute;opacity:0;width:0;height:0}

.bnp-box{position:relative;display:block;border:1.5px solid #2a2f3b;border-radius:12px;padding:14px 16px;transition:border-color .15s,box-shadow .15s,background .15s}
.bnp-option:hover .bnp-box{border-color:#3a4152}
.bnp-option input:checked + .bnp-box{border-color:#7c9bff;background:rgba(124,155,255,.06);box-shadow:0 0 0 3px rgba(124,155,255,.12)}
.bnp-option input:focus-visible + .bnp-box{box-shadow:0 0 0 3px rgba(124,155,255,.35)}

.bnp-flag{position:absolute;top:-9px;left:14px;background:#4ade80;color:#06210f;font-size:10px;font-weight:800;padding:3px 9px;border-radius:999px;text-transform:uppercase;letter-spacing:.03em}
.bnp-top{display:flex;align-items:baseline;justify-content:space-between;gap:10px;padding-right:28px;margin-bottom:4px}
.bnp-name{font-size:14.5px;font-weight:800;color:#f2f4f9}
.bnp-price{font-size:16px;font-weight:800;color:#f2f4f9}
.bnp-price small{font-size:11px;font-weight:700;color:#8b92a5}
.bnp-desc{font-size:12px;color:#8b92a5;line-height:1.4;display:block}

.bnp-tick{position:absolute;top:14px;right:16px;width:20px;height:20px;border-radius:50%;border:2px solid #3a4152;transition:border-color .15s,background .15s}
.bnp-option input:checked + .bnp-box .bnp-tick{border-color:#7c9bff;background:#7c9bff}
.bnp-option input:checked + .bnp-box .bnp-tick::after{content:'';position:absolute;top:4px;left:4px;width:8px;height:8px;border-radius:50%;background:#0f1115}
.bnp-flag ~ .bnp-tick{top:16px}

.bnp-schedule{margin:14px 0 6px;padding:14px 16px;background:#12151b;border:1px solid #232735;border-radius:12px}
.bnp-schedule-label{display:block;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.05em;color:#7c869c;margin-bottom:10px}
.bnp-installments{list-style:none;display:flex;flex-direction:column;gap:8px}
.bnp-installments li{display:flex;align-items:center;justify-content:space-between;font-size:13px;color:#c3cadb}
.bnp-installments li:first-child{color:#e7ebf3;font-weight:700}
.bnp-installments b{font-variant-numeric:tabular-nums}
.bnp-installments .bnp-due-today{font-size:10.5px;color:#4ade80;font-weight:800;background:rgba(74,222,128,.12);padding:2px 7px;border-radius:6px;margin-left:8px}

.bnp-submit{width:100%;background:linear-gradient(135deg,#7c9bff,#5b7cfa);color:#fff;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:800;cursor:pointer;transition:filter .15s;font-family:inherit;margin-top:16px}
.bnp-submit:hover{filter:brightness(1.08)}`,

  js: `var ORDER_TOTAL = 198.00;
var form = document.getElementById('bnpForm');
var scheduleEl = document.getElementById('bnpSchedule');
var installmentsEl = document.getElementById('bnpInstallments');
var submitBtn = document.getElementById('bnpSubmit');

function fmt(n) {
  return '$' + n.toFixed(2);
}

function buildInstallments() {
  var per = ORDER_TOTAL / 4;
  var today = new Date();
  installmentsEl.innerHTML = '';

  for (var i = 0; i < 4; i++) {
    var due = new Date(today);
    due.setDate(due.getDate() + i * 14);
    var dateStr = due.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    var li = document.createElement('li');
    li.innerHTML = '<span>' + (i === 0 ? 'Today' : dateStr) + (i === 0 ? '<span class="bnp-due-today">Due at checkout</span>' : '') + '</span><b>' + fmt(per) + '</b>';
    installmentsEl.appendChild(li);
  }
}

function syncSelection() {
  var selected = form.querySelector('input[name="pay-method"]:checked').value;

  if (selected === 'bnpl') {
    scheduleEl.removeAttribute('hidden');
    buildInstallments();
    submitBtn.textContent = 'Continue \\u00b7 Pay in 4';
  } else {
    scheduleEl.setAttribute('hidden', '');
    submitBtn.textContent = 'Continue \\u00b7 Pay in full today';
  }
}

form.addEventListener('change', function (e) {
  if (e.target.name === 'pay-method') syncSelection();
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  var selected = form.querySelector('input[name="pay-method"]:checked').value;
  submitBtn.textContent = '\\u2713 Confirmed \\u00b7 ' + (selected === 'bnpl' ? 'Pay in 4' : 'Pay in full');
  setTimeout(syncSelection, 1800);
});

syncSelection();`,

  seo: {
    title: 'Buy Now Pay Later Selector — Free BNPL Checkout UI',
    description: `A checkout payment selector comparing pay-in-full versus a 4-installment BNPL plan, with a live payment schedule breakdown. Pure HTML, CSS & JS.`,
    about: {
      title: 'Buy Now Pay Later Selector — Radio Cards With a Live Installment Schedule',
      description: `Offering "Pay in 4" alongside a full-payment option is now standard at checkout, and the interface challenge is showing the installment breakdown clearly the moment a shopper considers it — not burying it behind a tooltip. This snippet builds that BNPL selector as two radio cards, with the second revealing a dated payment schedule inline, a natural pairing with [checkout form](/ui-snippets/checkout-form/) or [multi-step checkout](/ui-snippets/multi-step-checkout/).

**Two radio cards, one real form**

Like this library's [radio card group](/ui-snippets/radio-card-group/), each payment method is a \`<label>\` wrapping a visually hidden native radio and a styled \`.bnp-box\` — so the selection is keyboard-navigable and form-submittable by construction, with the checked-state styling handled entirely by the \`:checked\` sibling selector in CSS. No custom click-state JavaScript is needed for the core selection behavior.

**The schedule is computed, not hardcoded**

\`buildInstallments()\` divides the order total by four and generates four due dates two weeks apart starting today, formatting each with \`toLocaleDateString\`. Every installment amount and date is derived from \`ORDER_TOTAL\` and the current date rather than typed out — change the order total and the whole schedule (and the per-installment amount) recalculates correctly.

**Reveal, don't just relabel**

Selecting "Pay in 4" doesn't just highlight the card — it reveals a dedicated schedule panel (toggled via the \`hidden\` attribute) listing all four payments with their due dates, and marks the first as "Due at checkout" so it's unambiguous which payment happens right now versus later. This answers the two questions a shopper actually has before committing: how much, and when.

**The submit button always states the real commitment**

The primary button's label changes with the selection — "Continue · Pay in full today" versus "Continue · Pay in 4" — so the call-to-action itself confirms what's about to happen, rather than a generic "Continue" that leaves the payment plan ambiguous until the next screen.

**Wiring it to a real BNPL provider**

Replace the schedule computation with the actual plan returned by your BNPL provider's API (Klarna, Affirm, Afterpay all return an installment schedule with real dates and any provider fees), and gate the "Pay in 4" option behind that provider's approval check — show a brief loading state while the eligibility check runs, and fall back to "Pay in full" if the shopper isn't approved.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two payment options render with "Pay in full" selected by default.` },
      { title: 'Select "Pay in 4"', text: `A schedule panel reveals four installments, computed from the order total and today's date.` },
      { title: 'Watch the submit button', text: `Its label updates to state exactly what will happen — pay in full today, or pay in 4.` },
      { title: 'Switch back to full payment', text: `The schedule panel hides again and the button label reverts.` },
      { title: 'Change the order total', text: `Update ORDER_TOTAL — the installment amounts recompute automatically.` },
      { title: 'Connect a real BNPL provider', text: `Replace buildInstallments() with the schedule your provider's API returns, gated by an eligibility check.` },
    ] },
    features: [
      { title: 'Native radio cards', text: `Real radio inputs under styled cards give keyboard nav and form submission for free.` },
      { title: 'Computed installment schedule', text: `Amounts and dates derive from the order total and today's date, never hardcoded.` },
      { title: 'Reveal, not just relabel', text: `Selecting BNPL opens a dedicated schedule panel instead of a vague badge change.` },
      { title: '"Due at checkout" clarity', text: `The first installment is explicitly marked so today's charge is unambiguous.` },
      { title: 'Commitment-stating CTA', text: `The submit button's label always names the exact payment plan about to be confirmed.` },
      { title: '0% interest flag', text: `A pinned badge reduces the perceived risk of the installment option.` },
      { title: 'Accessible disclosure', text: `The schedule panel uses the hidden attribute, kept in sync with the real selection.` },
      { title: 'Tabular installment amounts', text: `Monospaced numerals keep the schedule list visually steady.` },
    ],
    useCases: [
      { title: 'E-commerce checkout', text: `Offer BNPL alongside full payment, next to a [promo code input](/ui-snippets/promo-code-input/) and [order summary](/ui-snippets/order-summary/).` },
      { title: 'Multi-step checkout flows', text: `Slot this as the payment-method step inside a [multi-step checkout](/ui-snippets/multi-step-checkout/).` },
      { title: 'Subscription upgrades', text: `Let users split a large annual upgrade into installments.` },
      { title: 'High-ticket purchases', text: `Show installment framing for electronics, furniture, or travel bookings.` },
      { title: 'Mobile checkout', text: `The stacked card layout works cleanly on narrow viewports without a redesign.` },
      { title: 'A/B testing payment framing', text: `Swap which option is pre-selected to test conversion impact of default framing.` },
      { icon: 'CODE', title: 'Related: Cascading Select', desc: 'See the [Cascading Select](/ui-snippets/cascading-select/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the installment schedule calculated?', a: `buildInstallments() divides ORDER_TOTAL by four for the per-installment amount, then generates four due dates spaced two weeks apart starting from today's date, formatting each with toLocaleDateString. Nothing about the schedule is hardcoded — change the order total and every installment amount recalculates, and the dates are always relative to whenever the page loads.` },
      { q: 'Why does selecting "Pay in 4" reveal a whole panel instead of just changing a badge?', a: `A shopper deciding on BNPL needs to see exactly how much and when each payment happens before committing — a relabeled badge doesn't answer that. The revealed schedule panel lists all four dated installments and explicitly marks the first as "Due at checkout" so there's no ambiguity about what charges immediately versus later.` },
      { q: 'How do I connect this to a real BNPL provider like Klarna or Affirm?', a: `Most providers return an actual installment plan (with real due dates and any provider fees) from an eligibility or quote API call made at checkout. Replace buildInstallments()'s local computation with that response, and gate showing the "Pay in 4" option behind the provider's approval check — show a brief loading state while checking eligibility, and hide or disable the option if the shopper isn't approved.` },
      { q: "Why does the submit button's label change with the selection?", a: `A generic "Continue" button leaves the actual payment commitment ambiguous until the next screen. Updating the label to state the exact plan — "Pay in full today" or "Pay in 4" — means the call-to-action itself confirms what's about to happen, reducing surprise (and support tickets) at the moment of commitment.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold the selected payment method in component state (radios still bind via value/checked or v-model), and derive the schedule panel's visibility and the submit button's label from that state. Compute the installment list in a memoized function fed by orderTotal, mirroring what buildInstallments() does directly to the DOM here.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the schedule math or the disclosure UX pattern on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how buildInstallments() derives every payment amount and due date from the order total and the current date rather than hardcoding them, and why revealing a full dated schedule (with the first payment explicitly marked "due at checkout") communicates the commitment more clearly than just changing a badge or label. The same assistant can help optimize it — asking whether the fixed two-week installment cadence should instead come from a real BNPL provider's quote response, or whether the submit button's confirmation-then-reset sequence needs a genuine loading state once a real payment API is involved. It's also useful for extending the selector: ask it to add a third BNPL provider option with a different cadence, gate the BNPL option behind a live eligibility check, or add a small APR/fee disclosure required by regulation in some regions. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Buy Now Pay Later" checkout payment selector in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A form containing two radio-card options (built the accessible way: a label wrapping a visually hidden native radio input and a styled sibling card, with all selected-state styling driven by the CSS :checked sibling selector) — one for "Pay in full" showing the full order total, and one for "Pay in 4" showing the per-installment amount and a 0%-interest badge.
- Selecting "Pay in 4" must reveal a payment-schedule panel (toggled via the HTML hidden attribute) listing four installments, each with a computed due date (spaced two weeks apart starting from today) and amount — all four amounts and dates must be calculated from the order total and the current date at render time, not hardcoded strings, so changing the order total recalculates every installment correctly.
- The first installment in the revealed schedule must be visually marked as due immediately (e.g. "Due at checkout") so it's unambiguous which payment happens today versus in the future.
- The form's submit button label must update to state the exact payment commitment based on the current selection (e.g. "Continue · Pay in full today" vs "Continue · Pay in 4") rather than staying a generic "Continue" — so the call-to-action itself always reflects what the user is about to confirm.
- On submit, prevent the default form submission, show a brief confirmation state on the button reflecting the chosen plan, then after a short delay revert to the normal selection-dependent label.`,
    },
  },
};

export default bnplPaymentSelector;
