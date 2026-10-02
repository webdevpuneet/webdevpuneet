const mortgagePaymentBreakdown = {
  id: 'mortgage-payment-breakdown',
  title: 'Mortgage Payment Breakdown',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<div class="mpb-card">
  <div class="mpb-head">
    <h3>Monthly payment breakdown</h3>
    <p>Adjust the inputs — the donut and totals recalculate with the real amortization formula.</p>
  </div>

  <div class="mpb-grid">
    <div class="mpb-inputs">
      <label class="mpb-field">
        <span>Home price</span>
        <input type="number" id="mpbPrice" value="420000" min="0" step="1000">
      </label>
      <label class="mpb-field">
        <span>Down payment</span>
        <input type="number" id="mpbDown" value="84000" min="0" step="1000">
      </label>
      <label class="mpb-field">
        <span>Interest rate (APR %)</span>
        <input type="number" id="mpbRate" value="6.5" min="0" step="0.05">
      </label>
      <label class="mpb-field">
        <span>Term (years)</span>
        <select id="mpbTerm">
          <option value="15">15</option>
          <option value="30" selected>30</option>
        </select>
      </label>
      <label class="mpb-field">
        <span>Annual property tax</span>
        <input type="number" id="mpbTax" value="5200" min="0" step="50">
      </label>
      <label class="mpb-field">
        <span>Annual insurance</span>
        <input type="number" id="mpbIns" value="1400" min="0" step="50">
      </label>
    </div>

    <div class="mpb-result">
      <svg class="mpb-donut" viewBox="0 0 120 120" aria-hidden="true">
        <circle class="mpb-track" cx="60" cy="60" r="50" />
        <circle class="mpb-seg" id="mpbSegPrincipal" cx="60" cy="60" r="50" />
        <circle class="mpb-seg" id="mpbSegInterest" cx="60" cy="60" r="50" />
        <circle class="mpb-seg" id="mpbSegTax" cx="60" cy="60" r="50" />
        <circle class="mpb-seg" id="mpbSegIns" cx="60" cy="60" r="50" />
      </svg>
      <div class="mpb-total" id="mpbTotal">$0</div>
      <div class="mpb-total-label">per month</div>

      <ul class="mpb-legend" id="mpbLegend"></ul>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.mpb-card{background:#12141f;border:1px solid #232a3d;border-radius:18px;padding:26px;width:100%;max-width:640px;color:#e6e8f5}
.mpb-head h3{font-size:17px;font-weight:800;margin-bottom:6px}
.mpb-head p{font-size:12.5px;color:#8b93b0;margin-bottom:22px}
.mpb-grid{display:grid;grid-template-columns:1fr 220px;gap:24px}
@media (max-width:560px){.mpb-grid{grid-template-columns:1fr}}
.mpb-inputs{display:flex;flex-direction:column;gap:12px}
.mpb-field{display:flex;flex-direction:column;gap:5px;font-size:11.5px;color:#9aa0c0}
.mpb-field input,.mpb-field select{background:#0e1018;border:1px solid #232a3d;border-radius:8px;padding:9px 10px;color:#fff;font-size:13.5px;outline:none}
.mpb-field input:focus,.mpb-field select:focus{border-color:#60a5fa}
.mpb-result{display:flex;flex-direction:column;align-items:center;text-align:center}
.mpb-donut{width:130px;height:130px;transform:rotate(-90deg)}
.mpb-track{fill:none;stroke:#1e2230;stroke-width:16}
.mpb-seg{fill:none;stroke-width:16;stroke-linecap:butt;transition:stroke-dasharray .4s ease,stroke-dashoffset .4s ease}
.mpb-total{font-size:26px;font-weight:800;margin-top:-88px}
.mpb-total-label{font-size:11px;color:#8b93b0;margin-bottom:14px}
.mpb-legend{list-style:none;text-align:left;width:100%;display:flex;flex-direction:column;gap:6px;font-size:11.5px}
.mpb-legend li{display:flex;justify-content:space-between;align-items:center;gap:8px}
.mpb-dot{width:8px;height:8px;border-radius:50%;display:inline-block;margin-right:6px;flex-shrink:0}
.mpb-legend-label{display:flex;align-items:center;color:#9aa0c0}
.mpb-legend-value{font-weight:700;color:#e6e8f5}`,

  js: `var priceEl = document.getElementById('mpbPrice');
var downEl = document.getElementById('mpbDown');
var rateEl = document.getElementById('mpbRate');
var termEl = document.getElementById('mpbTerm');
var taxEl = document.getElementById('mpbTax');
var insEl = document.getElementById('mpbIns');
var totalEl = document.getElementById('mpbTotal');
var legendEl = document.getElementById('mpbLegend');

var CIRC = 2 * Math.PI * 50; // matches the donut circle's actual r=50
var COLORS = { principal: '#60a5fa', interest: '#f472b6', tax: '#fbbf24', ins: '#34d399' };
var SEGS = ['Principal', 'Interest', 'Tax', 'Insurance'];
var SEG_IDS = { Principal: 'mpbSegPrincipal', Interest: 'mpbSegInterest', Tax: 'mpbSegTax', Insurance: 'mpbSegIns' };

function fmt(n) {
  return '$' + Math.round(n).toLocaleString();
}

// The standard fixed-rate amortization formula: M = P * [r(1+r)^n] / [(1+r)^n - 1]
// where P = loan principal, r = monthly interest rate, n = total number of payments.
function monthlyPrincipalAndInterest(principal, annualRatePct, years) {
  var r = (annualRatePct / 100) / 12;
  var n = years * 12;
  if (r === 0) return principal / n;
  var factor = Math.pow(1 + r, n);
  return principal * (r * factor) / (factor - 1);
}

function recalc() {
  var price = Math.max(0, Number(priceEl.value) || 0);
  var down = Math.min(price, Math.max(0, Number(downEl.value) || 0));
  var rate = Math.max(0, Number(rateEl.value) || 0);
  var years = Number(termEl.value);
  var annualTax = Math.max(0, Number(taxEl.value) || 0);
  var annualIns = Math.max(0, Number(insEl.value) || 0);

  var principal = price - down;
  var pAndI = principal > 0 ? monthlyPrincipalAndInterest(principal, rate, years) : 0;

  // Split P&I into this month's principal vs interest portion using the same
  // amortization math: interest = outstanding balance * monthly rate.
  var monthlyRate = (rate / 100) / 12;
  var firstMonthInterest = principal * monthlyRate;
  var firstMonthPrincipal = Math.max(0, pAndI - firstMonthInterest);

  var monthlyTax = annualTax / 12;
  var monthlyIns = annualIns / 12;
  var total = pAndI + monthlyTax + monthlyIns;

  totalEl.textContent = fmt(total);

  var parts = [
    { name: 'Principal', value: firstMonthPrincipal, color: COLORS.principal },
    { name: 'Interest', value: firstMonthInterest, color: COLORS.interest },
    { name: 'Tax', value: monthlyTax, color: COLORS.tax },
    { name: 'Insurance', value: monthlyIns, color: COLORS.ins },
  ];

  var offset = 0;
  parts.forEach(function (part) {
    var frac = total > 0 ? part.value / total : 0;
    var seg = document.getElementById(SEG_IDS[part.name]);
    seg.style.stroke = part.color;
    seg.style.strokeDasharray = (CIRC * frac) + ' ' + CIRC;
    seg.style.strokeDashoffset = -offset;
    offset += CIRC * frac;
  });

  legendEl.innerHTML = parts.map(function (part) {
    return '<li><span class="mpb-legend-label"><span class="mpb-dot" style="background:' + part.color + '"></span>' + part.name +
      '</span><span class="mpb-legend-value">' + fmt(part.value) + '</span></li>';
  }).join('');
}

[priceEl, downEl, rateEl, termEl, taxEl, insEl].forEach(function (el) {
  el.addEventListener('input', recalc);
  el.addEventListener('change', recalc);
});

recalc();`,

  seo: {
    title: 'Mortgage Payment Breakdown — Free PITI Calculator with Real Amortization',
    description: `An interactive mortgage calculator that splits the monthly payment into principal, interest, taxes, and insurance on a live donut chart, using the real fixed-rate amortization formula. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mortgage Payment Breakdown — A Real PITI Donut Calculator',
      description: `Most "mortgage calculator" widgets show a single monthly number and stop there. This one shows the four pieces that number is actually made of — principal, interest, taxes, and insurance (PITI) — on a donut chart that redraws live as home price, down payment, rate, and term change, using the real fixed-rate amortization formula rather than an approximation.

**The actual amortization formula**

The principal-and-interest portion comes from \`M = P × [r(1+r)^n] / [(1+r)^n - 1]\`, where \`P\` is the loan principal (home price minus down payment), \`r\` is the monthly interest rate (annual rate ÷ 12), and \`n\` is the total number of monthly payments (years × 12). This is the standard closed-form fixed-rate mortgage payment formula — the same one a bank's own amortization schedule is built from, not a simplified stand-in.

**Splitting one payment into principal and interest**

A fixed monthly payment doesn't split evenly between principal and interest — early in the loan, interest dominates because the outstanding balance is largest. This snippet computes the first month's actual interest portion as \`principal × monthlyRate\`, then derives that month's principal portion as whatever's left of the payment. That's why, on a 30-year loan, the interest slice of the donut is often larger than the principal slice even though both come from the exact same fixed payment.

**Tax and insurance, averaged monthly**

Property tax and homeowner's insurance are typically billed annually or escrowed, so this snippet takes the annual figures you enter and divides each by 12 to get its monthly share — the same math a loan servicer uses to build a monthly escrow payment. Together with principal and interest, these four pieces sum to the full "PITI" payment shown in the center of the donut.

**A donut driven by real dasharray math**

The donut is four overlapping SVG circles sharing one center and radius, each using \`stroke-dasharray\` (visible arc length, visible-gap) and a \`stroke-dashoffset\` that accumulates from the previous segment's share — so the four arcs always tile the full circle exactly, with no gaps or overlaps, regardless of how the underlying dollar amounts shift.

**Customizing it**

Add PMI (private mortgage insurance, typically required below a 20% down payment) as a fifth slice, or swap the amortization formula for a variable-rate schedule. Pair it with [mortgage calculator](/ui-snippets/mortgage-calculator/) for a payment-only version, or [property listing card](/ui-snippets/property-listing-card/) for the listing this payment would apply to.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A donut chart and input panel render with example values.` },
      { title: 'Change the home price or down payment', text: `The loan principal and every slice recalculate.` },
      { title: 'Adjust the interest rate or term', text: `Watch the principal/interest split shift accordingly.` },
      { title: 'Edit tax or insurance', text: `Those two slices grow or shrink independently of the loan math.` },
      { title: 'Read the legend', text: `Each slice's exact monthly dollar amount is listed below the donut.` },
      { title: 'Verify the total', text: `The center number is the sum of all four slices, PITI in full.` },
    ] },
    features: [
      { title: 'Real amortization formula', text: `The standard fixed-rate M = P[r(1+r)^n]/[(1+r)^n-1] equation.` },
      { title: 'Accurate P&I split', text: `Interest computed from the actual outstanding balance, not a guess.` },
      { title: 'Live donut chart', text: `Four SVG arcs recompute their dasharray/dashoffset on every input change.` },
      { title: 'Full PITI breakdown', text: `Principal, interest, tax, and insurance shown as distinct slices.` },
      { title: 'Editable term', text: `15 or 30-year terms recompute the whole schedule.` },
      { title: 'Zero-rate safe', text: `The formula degrades to a simple division when rate is 0.` },
      { title: 'Instant recalculation', text: `Every field listens on both input and change events.` },
      { title: 'Zero dependencies', text: `Pure vanilla JS and SVG, no chart library.` },
    ],
    useCases: [
      { title: 'Real estate listing sites', text: 'Show buyers the full monthly cost under a [property listing card](/ui-snippets/property-listing-card/), split into principal, interest, taxes and insurance rather than one unexplained number.' },
      { title: 'Mortgage lender tools', text: 'Give prospects a transparent payment breakdown using the standard fixed-rate formula, so the figures stand up to scrutiny.' },
      { title: 'First-time buyer education', text: 'Demonstrate why interest dominates early payments: the interest portion is computed from the actual outstanding balance, so the donut makes the proportion obvious.' },
      { title: 'Home affordability checks', text: 'Let people change the down payment, rate and term and watch the four arcs recompute live, showing how each input shifts the total.' },
      { title: 'Refinance comparisons', text: 'Toggle rate or term to compare scenarios, and point visitors to the simpler [mortgage calculator](/ui-snippets/mortgage-calculator/) when they only need a single payment figure.' },
      { icon: 'CODE', title: 'Related: Seller Rating Breakdown', desc: 'See the [Seller Rating Breakdown](/ui-snippets/seller-rating-breakdown/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this the real mortgage formula or an approximation?', a: `It's the real, standard fixed-rate amortization formula used by lenders: M = P × [r(1+r)^n] / [(1+r)^n − 1], where P is the loan principal, r is the monthly interest rate, and n is the total number of monthly payments. It is not simplified or approximated.` },
      { q: 'Why is the interest slice often bigger than the principal slice?', a: `Because a fixed-rate loan's interest is calculated on the outstanding balance each month, and that balance is largest at the very start of the loan. Early payments are interest-heavy by design — as the balance shrinks over the loan's life, later payments become principal-heavy, even though the total monthly payment stays the same.` },
      { q: 'What is PITI?', a: `PITI stands for Principal, Interest, Taxes, and Insurance — the four components that typically make up a homeowner's full monthly mortgage payment when property tax and insurance are escrowed by the lender. This snippet computes and displays all four as separate donut slices rather than one combined number.` },
      { q: 'Does this include PMI (private mortgage insurance)?', a: `Not by default — PMI is typically required when the down payment is below 20% of the home price and would be a fifth slice. Add it by computing a monthly PMI estimate (commonly 0.5-1% of the loan annually) and including it in the total and the donut's slice list.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Move monthlyPrincipalAndInterest() and the slice-splitting logic into pure functions that take the input values and return the four amounts, then bind those to your framework's state and re-render the SVG stroke-dasharray/dashoffset values reactively instead of writing to the DOM directly.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the fixed-rate amortization formula produces a constant monthly payment while the principal-versus-interest split still shifts every month, and why the first month's interest is computed directly from the loan principal rather than from the total payment. It's also useful for extending the demo — ask it to add a PMI slice for down payments under 20%, generate a full month-by-month amortization table showing the split over the entire loan term, or add a second donut comparing a 15-year versus 30-year term side by side. Use the conversation to build real intuition for how rate and term trade off against total interest paid before you rely on the numbers for a real decision.`,
      prompt: `Build a "mortgage payment breakdown" calculator in plain HTML, CSS, and JavaScript — no external libraries or CDNs — that splits the monthly payment into principal, interest, tax, and insurance on a live SVG donut chart.

Requirements:
- Input fields for home price, down payment, annual interest rate (%), loan term (a 15 or 30 year select), annual property tax, and annual homeowner's insurance, all wired to recalculate on every input/change event.
- Implement the real fixed-rate amortization formula for the monthly principal-and-interest payment: M = P * [r(1+r)^n] / [(1+r)^n - 1], where P is home price minus down payment, r is the annual rate divided by 12, and n is the term in years times 12 — handle the zero-interest-rate edge case by falling back to a simple division.
- Compute the first month's actual interest amount as the loan principal times the monthly rate, and derive that month's principal amount as the remainder of the fixed payment — do not split principal and interest evenly or arbitrarily.
- Divide the annual tax and annual insurance inputs by 12 to get their monthly contribution, and sum principal + interest + monthly tax + monthly insurance into a total monthly payment displayed prominently.
- Render a donut chart as four SVG circles sharing the same center and radius, each using stroke-dasharray and an accumulating stroke-dashoffset so the four arcs exactly tile the full circle in proportion to their dollar share of the total, with no gaps or overlaps, recalculating live as any input changes.
- Show a legend listing each of the four categories with its color swatch and exact dollar amount, matching the donut's colors.`,
    },
  },
};

export default mortgagePaymentBreakdown;
