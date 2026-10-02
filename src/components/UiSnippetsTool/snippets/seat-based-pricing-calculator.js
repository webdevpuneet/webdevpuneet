const seatBasedPricingCalculator = {
  id: 'seat-based-pricing-calculator',
  title: 'Seat-Based Pricing Calculator',
  lastmod: '2026-08-22',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="spc-card">
  <div class="spc-head">
    <h3>Build your quote</h3>
    <p>Estimate your team's price — no sales call required</p>
  </div>

  <div class="spc-billing-toggle">
    <button type="button" class="spc-toggle-btn is-active" data-cycle="monthly">Monthly</button>
    <button type="button" class="spc-toggle-btn" data-cycle="annual">Annual <span class="spc-save-tag">Save 20%</span></button>
  </div>

  <div class="spc-seats">
    <div class="spc-seats-row">
      <label for="spcSeats">Seats</label>
      <span class="spc-seats-value" id="spcSeatsValue">12</span>
    </div>
    <div class="spc-stepper">
      <button type="button" id="spcMinus" aria-label="Decrease seats">&minus;</button>
      <input type="range" id="spcSeats" min="1" max="200" value="12" />
      <button type="button" id="spcPlus" aria-label="Increase seats">+</button>
    </div>
  </div>

  <div class="spc-breakdown">
    <div class="spc-line">
      <span>Price per seat</span>
      <b id="spcPerSeat">$15.00 <small>/mo</small></b>
    </div>
    <div class="spc-line" id="spcDiscountLine" hidden>
      <span>Annual discount (20%)</span>
      <b id="spcDiscountAmt">&minus;$36.00 <small>/mo</small></b>
    </div>
    <div class="spc-line spc-total">
      <span>Total for <span id="spcSeatCount">12</span> seats</span>
      <b id="spcTotal">$180.00 <small id="spcTotalUnit">/mo</small></b>
    </div>
    <p class="spc-billed-note" id="spcBilledNote">Billed monthly.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f0d;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.spc-card{background:#101815;border:1px solid #1e2f28;border-radius:18px;padding:24px;width:100%;max-width:420px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.spc-head h3{font-size:18px;font-weight:800;color:#f2fbf6}
.spc-head p{font-size:12px;color:#7c9488;margin-top:4px;margin-bottom:20px}

.spc-billing-toggle{display:flex;background:#0c1310;border:1px solid #1e2f28;border-radius:10px;padding:4px;margin-bottom:22px}
.spc-toggle-btn{flex:1;background:none;border:none;border-radius:7px;padding:8px 10px;color:#7c9488;font-size:12.5px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:6px;transition:background .15s,color .15s}
.spc-toggle-btn.is-active{background:#1fae6a;color:#06120c}
.spc-save-tag{font-size:9.5px;font-weight:800;padding:2px 6px;border-radius:999px;background:rgba(255,255,255,.18);color:inherit}
.spc-toggle-btn:not(.is-active) .spc-save-tag{background:rgba(31,174,106,.16);color:#3fd68a}

.spc-seats{margin-bottom:22px}
.spc-seats-row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px}
.spc-seats-row label{font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:#65806f;font-weight:700}
.spc-seats-value{font-size:24px;font-weight:800;color:#f2fbf6;font-variant-numeric:tabular-nums}
.spc-stepper{display:flex;align-items:center;gap:10px}
.spc-stepper button{width:32px;height:32px;flex-shrink:0;border-radius:9px;border:1px solid #24382f;background:#141f1a;color:#e6f5ec;font-size:17px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s}
.spc-stepper button:hover{background:#1c2b23}
.spc-stepper input[type="range"]{flex:1;accent-color:#1fae6a;cursor:pointer}

.spc-breakdown{display:flex;flex-direction:column;gap:9px;padding:14px 15px;background:#0c1310;border:1px solid #1e2f28;border-radius:12px}
.spc-line{display:flex;align-items:baseline;justify-content:space-between;font-size:12.5px;color:#7c9488}
.spc-line b{color:#e6f5ec;font-weight:700;font-variant-numeric:tabular-nums}
.spc-line b small{font-size:10px;font-weight:600;color:#65806f}
#spcDiscountLine span{color:#5fd996}
#spcDiscountLine b{color:#3fd68a}
#spcDiscountLine[hidden]{display:none}
.spc-total{padding-top:9px;border-top:1px dashed #1e2f28;font-size:14px;color:#e6f5ec;font-weight:700}
.spc-total b{color:#3fd68a;font-size:19px}
.spc-billed-note{font-size:10.5px;color:#5a7268;text-align:center;margin-top:6px}`,

  js: `var PRICE_PER_SEAT_MONTHLY = 15;
var ANNUAL_DISCOUNT = 0.2; // 20% off when billed annually

var state = { seats: 12, cycle: 'monthly' };

var seatsSlider = document.getElementById('spcSeats');
var seatsValueEl = document.getElementById('spcSeatsValue');
var seatCountEl = document.getElementById('spcSeatCount');
var perSeatEl = document.getElementById('spcPerSeat');
var discountLine = document.getElementById('spcDiscountLine');
var discountAmtEl = document.getElementById('spcDiscountAmt');
var totalEl = document.getElementById('spcTotal');
var totalUnitEl = document.getElementById('spcTotalUnit');
var billedNoteEl = document.getElementById('spcBilledNote');
var toggleBtns = document.querySelectorAll('.spc-toggle-btn');
var minusBtn = document.getElementById('spcMinus');
var plusBtn = document.getElementById('spcPlus');

function fmtMoney(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function render() {
  var seats = state.seats;
  var isAnnual = state.cycle === 'annual';

  var effectivePerSeat = isAnnual ? PRICE_PER_SEAT_MONTHLY * (1 - ANNUAL_DISCOUNT) : PRICE_PER_SEAT_MONTHLY;
  var monthlySubtotal = PRICE_PER_SEAT_MONTHLY * seats;
  var monthlyDiscount = isAnnual ? monthlySubtotal * ANNUAL_DISCOUNT : 0;
  var monthlyTotal = monthlySubtotal - monthlyDiscount;

  seatsValueEl.textContent = seats;
  seatCountEl.textContent = seats;

  perSeatEl.innerHTML = fmtMoney(PRICE_PER_SEAT_MONTHLY) + ' <small>/mo</small>';

  if (isAnnual) {
    discountLine.hidden = false;
    discountAmtEl.innerHTML = '−' + fmtMoney(monthlyDiscount) + ' <small>/mo</small>';
  } else {
    discountLine.hidden = true;
  }

  if (isAnnual) {
    var annualTotal = monthlyTotal * 12;
    totalEl.innerHTML = fmtMoney(annualTotal) + ' <small id="spcTotalUnit">/yr</small>';
    billedNoteEl.textContent = 'Billed annually — ' + fmtMoney(monthlyTotal) + '/mo effective (' + fmtMoney(effectivePerSeat) + ' per seat/mo).';
  } else {
    totalEl.innerHTML = fmtMoney(monthlyTotal) + ' <small id="spcTotalUnit">/mo</small>';
    billedNoteEl.textContent = 'Billed monthly — ' + fmtMoney(effectivePerSeat) + ' per seat/mo.';
  }
}

seatsSlider.addEventListener('input', function () {
  state.seats = Number(seatsSlider.value);
  render();
});

minusBtn.addEventListener('click', function () {
  state.seats = Math.max(Number(seatsSlider.min), state.seats - 1);
  seatsSlider.value = state.seats;
  render();
});

plusBtn.addEventListener('click', function () {
  state.seats = Math.min(Number(seatsSlider.max), state.seats + 1);
  seatsSlider.value = state.seats;
  render();
});

toggleBtns.forEach(function (btn) {
  btn.addEventListener('click', function () {
    toggleBtns.forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    state.cycle = btn.dataset.cycle;
    render();
  });
});

render();`,

  seo: {
    title: 'Seat-Based Pricing Calculator — Free Self-Serve Quote Widget (HTML/CSS/JS)',
    description: `A per-seat SaaS pricing calculator with a seat stepper, a monthly/annual toggle with a visible discount, and a live total and per-seat price. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Seat-Based Pricing Calculator — Let Prospects Quote Their Own Team',
      description: `Per-seat SaaS pricing pages convert better when a prospect can answer "what would this cost my team" without filling out a contact form. This snippet builds that self-serve calculator in plain HTML, CSS, and vanilla JavaScript — a seat count, a monthly/annual toggle, and a live-updating total, all driven by one \`render()\` function over a tiny state object.

**Seat count as a first-class control**

Seats are controlled three ways at once — a range slider, and plus/minus stepper buttons — all writing to the same \`state.seats\` value and calling \`render()\`. Because every control funnels through one state object instead of maintaining its own count, the slider and the buttons can never disagree, and the displayed seat count, the line-item label, and the total all update from a single number.

**Annual discount, shown as a distinct line**

Rather than silently changing the per-seat price when annual billing is selected, the breakdown shows a full monthly subtotal (seats × $15) followed by a *separate* discount line at 20% off, only visible when annual is selected. This mirrors how a real pricing page should build trust — showing what the discount is worth in dollars rather than just changing a number with no explanation.

**Correct monthly-vs-annual math**

Monthly billing shows \`seats × $15\` as the total, billed per month. Annual billing computes the same monthly subtotal, subtracts the 20% discount to get an effective discounted monthly rate, and then multiplies by 12 to show the true annual total — with a footer note spelling out both the effective monthly-equivalent rate and the exact per-seat price, so nothing is hidden in the switch between billing cycles. For 12 seats at $15/seat: monthly is $180.00/mo; annual is $180 × 0.8 = $144.00/mo effective, × 12 = $1,728.00/yr.

**Where it fits**

Drop it into a pricing page next to a [pricing toggle](/ui-snippets/pricing-toggle/) or [pricing feature table](/ui-snippets/pricing-feature-table/), follow it with a [checkout form](/ui-snippets/checkout-form/) once a prospect is ready to buy, or pair it with a [proration preview card](/ui-snippets/proration-preview-card/) for when an existing customer changes seat count mid-cycle.

**Customizing it**

Swap in your real per-seat price and discount rate, add volume-based price breaks (e.g. seats 51+ at a lower rate), or add a plan-tier selector alongside the seat count so the calculator covers your full pricing matrix.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 12-seat monthly quote of $180.00/mo renders by default.` },
      { title: 'Adjust the seat count', text: `Drag the slider or use +/− to change seats from 1 to 200.` },
      { title: 'Toggle annual billing', text: `The discount line appears and the total switches to a yearly figure.` },
      { title: 'Read the effective rate', text: `The footer note shows the discounted per-seat monthly price.` },
      { title: 'Check the math', text: `Total always equals seats × per-seat price, minus the discount if annual.` },
      { title: 'Wire up real pricing', text: `Replace PRICE_PER_SEAT_MONTHLY and ANNUAL_DISCOUNT with your live values.` },
    ] },
    features: [
      { title: 'Triple-input seat control', text: `Slider and +/− buttons all write to one state value — never out of sync.` },
      { title: 'Visible annual discount', text: `Shows the discount as its own line item, not a silently changed price.` },
      { title: 'Correct annualized total', text: `Discounted monthly rate is multiplied by 12 for a true yearly total.` },
      { title: 'Effective per-seat rate', text: `Footer note always states the true per-seat monthly price, either cycle.` },
      { title: 'Single render() function', text: `Every number on screen derives from one small state object.` },
      { title: 'Range-clamped seats', text: `Stepper buttons respect the slider's min/max bounds.` },
      { title: 'Formatted currency', text: `Thousands separators and two-decimal cents throughout.` },
      { title: 'Framework-agnostic core', text: `The pricing math is pure and ports directly to any component model.` },
    ],
    useCases: [
      { title: 'Self-serve SaaS quotes', text: 'Let prospects work out what a team will cost without a contact form, with a slider, plus and minus buttons all writing to one state value.' },
      { title: 'Sales-assisted deals', text: 'Give an account executive a live tool for building a quote in a call, showing the annual discount as its own visible line item.' },
      { title: 'Plan comparison pairing', text: 'Pair with a [pricing card](/ui-snippets/pricing-card/) or [pricing toggle](/ui-snippets/pricing-toggle/), with a footer note stating the true effective per-seat monthly price.' },
      { title: 'Checkout pre-fill', text: 'Feed the chosen seat count and billing cycle into a [checkout form](/ui-snippets/checkout-form/), with the annualised total correctly multiplying the discounted monthly rate by twelve.' },
      { title: 'Mid-cycle changes and budgeting', text: 'Combine with a [proration preview card](/ui-snippets/proration-preview-card/) when seats change mid-cycle, or let a buyer\'s finance team model costs at different team sizes.' },
      { icon: 'CODE', title: 'Related: Plan Change Preview (Upgrade/Downgrade)', desc: 'See the [Plan Change Preview (Upgrade/Downgrade)](/ui-snippets/pricing-plan-migration-preview/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the monthly total calculated?', a: `It's simply seats multiplied by the per-seat monthly price — for 12 seats at $15/seat, that's $180.00/mo. No discount applies on the monthly cycle, so the displayed per-seat price and the total always match a straightforward multiplication.` },
      { q: 'How does the annual discount actually work?', a: `Selecting annual billing keeps the same $15/seat monthly subtotal but subtracts a 20% discount from it to get an effective discounted monthly rate ($15 × 0.8 = $12/seat), then multiplies that by 12 months for the total shown. For 12 seats, that's $144.00/mo effective × 12 = $1,728.00/yr — versus $180 × 12 = $2,160/yr at the undiscounted monthly rate, a $432/yr saving.` },
      { q: 'Why show the discount as a separate line instead of just changing the price?', a: `Showing "seats × full price" followed by an explicit "− 20% annual discount" line lets a prospect see exactly what they're saving in dollars, not just a lower number they have to trust. This transparency is what makes a self-serve calculator persuasive rather than just informative.` },
      { q: 'Can the seat count go above 200 or below 1?', a: `Not with the default slider bounds (min 1, max 200) — the +/− buttons are clamped to the same range with Math.min/Math.max, so they can never push the count outside what the slider supports. Raise the max attribute on the range input to support larger teams.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move seats and cycle into component state (useState/ref) and derive the subtotal, discount, and total with useMemo or a computed property. Bind the slider's onChange/@input and the toggle buttons' onClick to update that state — the pricing math itself is pure and copies over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the annual-discount math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how render() computes the monthly subtotal, subtracts the 20% annual discount to get an effective per-seat rate, and then multiplies by 12 for the annual total — and why that's different from simply multiplying the monthly total by 12 without discounting first. The same assistant can help you extend it: ask how to add volume-based price breaks where seats beyond a threshold cost less per seat, how to add a plan-tier selector so the calculator covers Starter/Growth/Scale pricing rather than one flat rate, or how to persist the chosen seat count and cycle into query params so a shared link pre-fills the calculator. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "seat-based pricing calculator" widget in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Define a fixed monthly price per seat and a fixed annual discount percentage as constants.
- Add a seat-count control using both a range slider (with a visible min/max) and separate plus/minus stepper buttons, all reading from and writing to the same single state value so they never disagree — clamp the stepper buttons to the slider's min/max range.
- Add a monthly/annual billing-cycle toggle (two buttons or a switch), where the annual option visibly advertises the discount percentage (e.g. "Save 20%") right on the control.
- Show a breakdown with: the per-seat monthly price, an annual-discount line (as its own line item with a dollar amount, only visible when annual billing is selected — do not just silently change the per-seat price), and a total.
- On the monthly cycle, the total must equal seats × per-seat price. On the annual cycle, apply the discount to get an effective discounted monthly rate, then multiply that by 12 for the total shown, and display a footer note stating the effective per-seat monthly rate for whichever cycle is active.
- Recalculate every displayed number from one render function whenever the seat count or billing cycle changes, and double-check that the annual total is actually less than 12 × the undiscounted monthly total by exactly the discount percentage.
- Format all money values with thousands separators and two decimal places.`,
    },
  },
};

export default seatBasedPricingCalculator;
