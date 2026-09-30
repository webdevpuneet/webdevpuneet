const prorationPreviewCard = {
  id: 'proration-preview-card',
  title: 'Plan Upgrade Proration Preview',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="ppc-card">
  <div class="ppc-head">
    <h3>Upgrade your plan</h3>
    <p>18 days left in your current billing cycle</p>
  </div>

  <div class="ppc-plans" id="ppcPlans">
    <button type="button" class="ppc-plan" data-plan="starter" data-price="19">
      <span class="ppc-plan-name">Starter</span>
      <span class="ppc-plan-price">$19<small>/mo</small></span>
    </button>
    <button type="button" class="ppc-plan is-active" data-plan="growth" data-price="49">
      <span class="ppc-plan-name">Growth</span>
      <span class="ppc-plan-price">$49<small>/mo</small></span>
      <span class="ppc-plan-tag">Current plan</span>
    </button>
    <button type="button" class="ppc-plan" data-plan="scale" data-price="99">
      <span class="ppc-plan-name">Scale</span>
      <span class="ppc-plan-price">$99<small>/mo</small></span>
    </button>
  </div>

  <div class="ppc-math" id="ppcMath">
    <div class="ppc-line">
      <span>Unused time on Growth (18 of 30 days)</span>
      <b id="ppcCredit">&minus;$29.40</b>
    </div>
    <div class="ppc-line">
      <span>Prorated charge for <span id="ppcNewPlanName">Scale</span> (18 of 30 days)</span>
      <b id="ppcCharge">$59.40</b>
    </div>
    <div class="ppc-line ppc-due">
      <span>Due today</span>
      <b id="ppcDue">$30.00</b>
    </div>
  </div>

  <p class="ppc-note" id="ppcNote">You'll be billed $99.00/mo starting your next cycle.</p>

  <button type="button" class="ppc-confirm" id="ppcConfirm">Confirm upgrade</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0b16;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ppc-card{background:#151221;border:1px solid #2a2340;border-radius:18px;padding:24px;width:100%;max-width:420px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.ppc-head h3{font-size:17px;font-weight:800;color:#f6f4fc}
.ppc-head p{font-size:12px;color:#9089b0;margin-top:4px;margin-bottom:20px}

.ppc-plans{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:18px}
.ppc-plan{position:relative;background:#1c1830;border:1.5px solid #2e2748;border-radius:12px;padding:12px 8px;display:flex;flex-direction:column;align-items:center;gap:4px;cursor:pointer;transition:border-color .15s,background .15s}
.ppc-plan:hover{border-color:#4a3e78}
.ppc-plan.is-active{border-color:#a78bfa;background:#231c3d}
.ppc-plan-name{font-size:12px;font-weight:700;color:#c9c2e6}
.ppc-plan-price{font-size:15px;font-weight:800;color:#f6f4fc}
.ppc-plan-price small{font-size:10px;font-weight:600;color:#8b83a8}
.ppc-plan-tag{position:absolute;top:-9px;left:50%;transform:translateX(-50%);background:#a78bfa;color:#1c1830;font-size:9px;font-weight:800;text-transform:uppercase;letter-spacing:.03em;padding:2px 7px;border-radius:999px;white-space:nowrap}

.ppc-math{display:flex;flex-direction:column;gap:9px;padding:14px 15px;background:#100e1c;border:1px solid #241f38;border-radius:12px;margin-bottom:14px}
.ppc-line{display:flex;align-items:baseline;justify-content:space-between;gap:12px;font-size:12.5px;color:#9089b0}
.ppc-line b{color:#e5e0f5;font-weight:700;font-variant-numeric:tabular-nums;white-space:nowrap}
.ppc-line:first-child b{color:#4ade80}
.ppc-due{padding-top:9px;border-top:1px dashed #2a2340;font-size:14px;color:#e5e0f5;font-weight:700}
.ppc-due b{color:#a78bfa;font-size:17px}

.ppc-note{font-size:11px;color:#756c92;text-align:center;margin-bottom:16px}

.ppc-confirm{width:100%;background:linear-gradient(135deg,#8b5cf6,#a78bfa);border:none;border-radius:10px;padding:12px;color:#fff;font-size:13.5px;font-weight:700;cursor:pointer;transition:filter .15s}
.ppc-confirm:hover{filter:brightness(1.08)}`,

  js: `var CYCLE_DAYS = 30;
var DAYS_REMAINING = 18;
var CURRENT_PLAN = { id: 'growth', name: 'Growth', price: 49 };

var plansEl = document.getElementById('ppcPlans');
var creditEl = document.getElementById('ppcCredit');
var chargeEl = document.getElementById('ppcCharge');
var dueEl = document.getElementById('ppcDue');
var newPlanNameEl = document.getElementById('ppcNewPlanName');
var noteEl = document.getElementById('ppcNote');
var mathEl = document.getElementById('ppcMath');

function fmtMoney(n) {
  var sign = n < 0 ? '−' : '';
  return sign + '$' + Math.abs(n).toFixed(2);
}

function recalc(newPlanBtn) {
  var newPlanId = newPlanBtn.dataset.plan;
  var newPlanName = newPlanBtn.querySelector('.ppc-plan-name').textContent;
  var newPrice = Number(newPlanBtn.dataset.price);

  if (newPlanId === CURRENT_PLAN.id) {
    mathEl.style.display = 'none';
    noteEl.textContent = 'This is your current plan — no change to bill.';
    return;
  }
  mathEl.style.display = 'flex';

  // Credit for unused time on the current plan, prorated by days remaining in the cycle.
  var dailyCurrentRate = CURRENT_PLAN.price / CYCLE_DAYS;
  var credit = dailyCurrentRate * DAYS_REMAINING;

  // Charge for the new plan, prorated for the same remaining days.
  var dailyNewRate = newPrice / CYCLE_DAYS;
  var charge = dailyNewRate * DAYS_REMAINING;

  var due = Math.max(0, charge - credit);

  creditEl.textContent = '−$' + credit.toFixed(2);
  chargeEl.textContent = '$' + charge.toFixed(2);
  dueEl.textContent = '$' + due.toFixed(2);
  newPlanNameEl.textContent = newPlanName;

  var creditLineLabel = mathEl.querySelector('.ppc-line:first-child span');
  creditLineLabel.textContent = 'Unused time on ' + CURRENT_PLAN.name + ' (' + DAYS_REMAINING + ' of ' + CYCLE_DAYS + ' days)';
  var chargeLineLabel = mathEl.querySelector('.ppc-line:nth-child(2) span');
  chargeLineLabel.innerHTML = 'Prorated charge for <span id="ppcNewPlanName">' + newPlanName + '</span> (' + DAYS_REMAINING + ' of ' + CYCLE_DAYS + ' days)';

  noteEl.textContent = "You'll be billed $" + newPrice.toFixed(2) + '/mo starting your next cycle.';
}

plansEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.ppc-plan');
  if (!btn) return;
  plansEl.querySelectorAll('.ppc-plan').forEach(function (p) { p.classList.remove('is-active'); });
  btn.classList.add('is-active');
  recalc(btn);
});

// Initialize on the Scale plan to show the full proration math on load.
recalc(plansEl.querySelector('[data-plan="scale"]'));
plansEl.querySelectorAll('.ppc-plan').forEach(function (p) { p.classList.remove('is-active'); });
plansEl.querySelector('[data-plan="scale"]').classList.add('is-active');`,

  seo: {
    title: 'Plan Upgrade Proration Preview — Free Billing Card (HTML/CSS/JS)',
    description: `A subscription upgrade card showing unused-time credit, the new plan's prorated charge, and a clear "due today" total that recalculates as you pick a plan. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Plan Upgrade Proration Preview — Transparent Mid-Cycle Billing Math',
      description: `Mid-cycle subscription upgrades are one of the biggest sources of "why was I charged that" support tickets, because most billing systems just show a single number with no explanation. This snippet builds a proration preview card in plain HTML, CSS, and vanilla JavaScript that shows the actual math a billing system runs: the unused-time credit from the current plan, the new plan's prorated charge for the remaining cycle, and a due-today total that is simply the difference between them.

**Proration, worked out in the open**

Both the credit and the charge are computed the same way a real billing provider computes proration: take the plan's monthly price, divide by the number of days in the cycle to get a daily rate, then multiply by the days remaining. The current plan's unused time becomes a credit; the new plan's remaining-cycle cost becomes a charge. Due today is \`charge - credit\`, floored at zero so a downgrade never shows a negative "due" amount.

**A live plan selector, not a static example**

Three plan buttons — Starter, Growth (the current plan), and Scale — sit above the math. Clicking a different plan re-runs \`recalc()\` with that plan's price and re-labels every line, so a prospective upgrade from Growth to Scale and a same-tier lateral move both produce correct, immediately visible numbers. Selecting the current plan itself hides the math and shows a plain "no change to bill" message instead of a confusing zero-value proration.

**Every number is checkable by hand**

Because the card shows the daily-rate math implicitly through its two line items (rather than a single opaque total), a customer can verify it: 18 days remaining out of a 30-day cycle on a $49/mo plan is an unused-time credit of \`(49/30) * 18 = $29.40\`; the same 18 days on a $99/mo plan is a prorated charge of \`(99/30) * 18 = $59.40\`; due today is \`59.40 - 29.40 = $30.00\`. Showing this breakdown instead of just "$30.00 due" is what actually reduces billing-confusion support tickets.

**Where it fits**

Use it in the upgrade-confirmation modal of any subscription product, pair it with a [seat-based pricing calculator](/ui-snippets/seat-based-pricing-calculator/) if seats also change with the plan, or follow it with an [invoice preview](/ui-snippets/invoice-preview/) for the receipt after the charge goes through. It also complements a [pricing toggle](/ui-snippets/pricing-toggle/) or [pricing card](/ui-snippets/pricing-card/) set on the plan-selection page itself.

**Customizing it**

Swap in your real plan catalog and cycle-length logic (many billing providers prorate by exact days, not a flat 30), add an annual-billing variant, or extend \`recalc()\` to handle downgrades by showing a credit balance instead of an amount due.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A Growth-plan account previews an upgrade to Scale by default.` },
      { title: 'Read the math', text: `Unused-time credit and the new plan's prorated charge are both shown.` },
      { title: 'Pick a different plan', text: `Click Starter or Scale; the credit, charge, and due-today total recalculate.` },
      { title: 'Select the current plan', text: `The math hides and a plain "no change to bill" message shows instead.` },
      { title: 'Check the due-today figure', text: `It's always charge minus credit, floored at zero.` },
      { title: 'Wire up real plans', text: `Replace the plan buttons' data-price and CURRENT_PLAN with your live catalog.` },
    ] },
    features: [
      { title: 'Real daily-rate proration', text: `Credit and charge both derive from price ÷ cycle days × days remaining.` },
      { title: 'Live plan selector', text: `Clicking any plan re-runs the math and re-labels every line instantly.` },
      { title: 'Verifiable due-today total', text: `Simply charge minus credit — a customer can check it by hand.` },
      { title: 'Current-plan guard', text: `Selecting your current plan shows a clear "no change" state instead of a false proration.` },
      { title: 'Floored at zero', text: `Due today never goes negative even on a like-for-like or downgrade selection.` },
      { title: 'Clear line labeling', text: `Each line spells out days used, cycle length, and which plan it applies to.` },
      { title: 'Next-cycle note', text: `A footer note clarifies the full price billed starting the next renewal.` },
      { title: 'Framework-agnostic core', text: `One recalc(plan) function ports directly to React, Vue, or Angular state.` },
    ],
    useCases: [
      { title: 'Subscription upgrade modals', text: `Show exactly what a customer owes before they confirm a mid-cycle upgrade.` },
      { title: 'Plan comparison + upsell', text: `Pair with a [pricing card](/ui-snippets/pricing-card/) or [pricing toggle](/ui-snippets/pricing-toggle/) set.` },
      { title: 'Seat + plan changes together', text: `Combine with a [seat-based pricing calculator](/ui-snippets/seat-based-pricing-calculator/) when both change at once.` },
      { title: 'Billing support deflection', text: `Reduce "why was I charged X" tickets by showing the math up front.` },
      { title: 'Post-upgrade receipts', text: `Follow this preview with an [invoice preview](/ui-snippets/invoice-preview/) for the finalized charge.` },
      { title: 'Account settings pages', text: `Let a user preview an upgrade before committing, without leaving the page.` },
    ],
    faqs: [
      { q: 'How is the unused-time credit calculated?', a: `The current plan's monthly price is divided by the cycle length (30 days) to get a daily rate, then multiplied by the days remaining in the cycle. For a $49/mo plan with 18 days left, that's (49/30) × 18 = $29.40 — the value of the time the customer already paid for but won't use on that plan.` },
      { q: 'How is the new plan prorated charge calculated?', a: `The same formula applies to the new plan's price: its monthly price divided by 30, multiplied by the same 18 remaining days. For a $99/mo plan that's (99/30) × 18 = $59.40 — what the new plan costs for just the remainder of the current cycle.` },
      { q: 'How is "due today" derived?', a: `Due today is the prorated charge for the new plan minus the unused-time credit from the old plan: 59.40 − 29.40 = $30.00 in the default example. The result is floored at zero, so picking a cheaper plan (which would produce a negative number) shows $0.00 due rather than a confusing negative charge — a real system would issue a credit balance instead.` },
      { q: 'What happens if I select my current plan?', a: `The math section hides entirely and a plain message — "This is your current plan — no change to bill" — replaces it. Showing a $0.00 proration for a non-change would be confusing, so the card treats it as a distinct state rather than a degenerate case of the math.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep CURRENT_PLAN, CYCLE_DAYS, and DAYS_REMAINING as props or state, and derive credit, charge, and due with useMemo (React) or a computed property (Vue) whenever the selected plan changes. The recalc() function's math is pure and ports directly; only the DOM-writing lines need to become framework bindings.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the proration formula by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how recalc() turns a plan's monthly price, a fixed cycle length, and the days remaining into a daily rate, and why the same formula is applied twice — once to the old plan for a credit, once to the new plan for a charge — so that due today is just their difference. The same assistant can help you harden it: ask whether flooring due-today at zero is the right behavior for a downgrade, or whether it should instead show a credit balance carried to the next invoice. It's also useful for extending the card: ask it to prorate by exact calendar days instead of a flat 30-day cycle, add an annual-billing variant, or show a small breakdown line for when a seat-count change happens alongside the plan change. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "plan upgrade proration preview" card in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Define a current plan (name, monthly price) and a fixed cycle length in days, plus a fixed number of days remaining in the current billing cycle.
- Render three or more selectable plan buttons (including the current plan, visibly marked), each with a name and monthly price.
- On selecting a different plan, compute an "unused time" credit for the current plan as (current plan price ÷ cycle days) × days remaining, and a prorated charge for the newly selected plan as (new plan price ÷ cycle days) × days remaining — both using the same days-remaining value.
- Show both the credit and the charge as separate, clearly labeled line items (not just a final number), plus a "due today" total equal to the charge minus the credit, floored at zero so it can never go negative.
- When the currently active plan is selected, hide the proration math entirely and show a plain "this is your current plan, no change to your bill" message instead of computing a zero-value proration.
- Add a footer note stating the full monthly price that will be billed starting the next renewal cycle, updating to match whichever plan is selected.
- Make sure every displayed number is internally consistent and can be verified by hand from the displayed price, cycle length, and days-remaining values.`,
    },
  },
};

export default prorationPreviewCard;
