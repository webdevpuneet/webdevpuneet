const mortgageCalculator = {
  id: 'mortgage-calculator',
  title: 'Mortgage Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <div class="card">
    <div class="head">
      <h2 class="heading">Mortgage Calculator</h2>
      <p class="sub">Estimate your monthly payment and total interest.</p>
    </div>
    <div class="inputs">
      <div class="field">
        <label class="label">Home Price</label>
        <div class="input-wrap"><span class="prefix">$</span><input class="input" id="price" type="number" value="450000" oninput="calc()"></div>
      </div>
      <div class="field">
        <label class="label">Down Payment <span class="pct" id="dpPct">20%</span></label>
        <div class="input-wrap"><span class="prefix">$</span><input class="input" id="down" type="number" value="90000" oninput="calc()"></div>
        <input class="range" id="downRange" type="range" min="0" max="50" value="20" oninput="syncDown(this.value)">
      </div>
      <div class="row2">
        <div class="field">
          <label class="label">Interest Rate</label>
          <div class="input-wrap"><input class="input" id="rate" type="number" step="0.01" value="6.5" oninput="calc()"><span class="suffix">%</span></div>
        </div>
        <div class="field">
          <label class="label">Loan Term</label>
          <div class="term-btns">
            <button class="term-btn" onclick="setTerm(this,15)">15 yr</button>
            <button class="term-btn active" onclick="setTerm(this,30)">30 yr</button>
          </div>
        </div>
      </div>
    </div>
    <div class="result">
      <div class="result-main">
        <span class="result-label">Monthly Payment</span>
        <span class="result-amt" id="monthly">$2,275</span>
      </div>
      <div class="breakdown">
        <div class="bd-bar">
          <div class="bd-seg principal" id="segP" style="width:62%"></div>
          <div class="bd-seg interest" id="segI" style="width:38%"></div>
        </div>
        <div class="bd-legend">
          <div class="bd-item"><span class="dot principal"></span>Principal &amp; Interest<strong id="piVal">$2,275</strong></div>
          <div class="bd-item"><span class="dot interest"></span>Total Interest<strong id="totalInt">$459,000</strong></div>
        </div>
      </div>
      <div class="totals-grid">
        <div class="tcell"><span class="tlabel">Loan Amount</span><span class="tval" id="loanAmt">$360,000</span></div>
        <div class="tcell"><span class="tlabel">Total of Payments</span><span class="tval" id="totalPaid">$819,000</span></div>
        <div class="tcell"><span class="tlabel">Payoff Date</span><span class="tval" id="payoff">Jun 2056</span></div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #eef2ff; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }
.wrap { width: 100%; max-width: 460px; }
.card { background: #fff; border-radius: 22px; box-shadow: 0 10px 40px rgba(79,70,229,0.12); overflow: hidden; }
.head { padding: 26px 26px 0; }
.heading { font-size: 19px; font-weight: 800; color: #1e1b4b; }
.sub { font-size: 13px; color: #6b7280; margin-top: 4px; }
.inputs { padding: 22px 26px; display: flex; flex-direction: column; gap: 18px; }
.field { display: flex; flex-direction: column; }
.label { font-size: 12px; font-weight: 600; color: #4b5563; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; }
.pct { font-size: 11px; font-weight: 700; color: #6366f1; background: rgba(99,102,241,0.1); padding: 2px 8px; border-radius: 10px; }
.input-wrap { display: flex; align-items: center; border: 1.5px solid #e5e7eb; border-radius: 12px; overflow: hidden; transition: border-color 0.15s; }
.input-wrap:focus-within { border-color: #6366f1; }
.prefix { padding: 0 4px 0 14px; font-size: 16px; font-weight: 700; color: #9ca3af; }
.suffix { padding: 0 14px 0 4px; font-size: 16px; font-weight: 700; color: #9ca3af; }
.input { flex: 1; border: none; outline: none; padding: 13px 14px; font-size: 17px; font-weight: 700; color: #1e1b4b; width: 100%; }
.range { -webkit-appearance: none; appearance: none; width: 100%; height: 5px; border-radius: 3px; background: #e5e7eb; margin-top: 12px; cursor: pointer; accent-color: #6366f1; }
.row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.term-btns { display: flex; gap: 6px; }
.term-btn { flex: 1; padding: 13px 0; border: 1.5px solid #e5e7eb; background: #fff; border-radius: 12px; font-size: 14px; font-weight: 700; color: #6b7280; cursor: pointer; transition: all 0.15s; }
.term-btn:hover { border-color: #c7d2fe; }
.term-btn.active { background: #6366f1; border-color: #6366f1; color: #fff; }
.result { background: linear-gradient(160deg,#1e1b4b,#312e81); padding: 26px; color: #fff; }
.result-main { display: flex; flex-direction: column; align-items: center; margin-bottom: 20px; }
.result-label { font-size: 13px; color: #a5b4fc; margin-bottom: 4px; }
.result-amt { font-size: 40px; font-weight: 900; letter-spacing: -1px; font-variant-numeric: tabular-nums; }
.breakdown { margin-bottom: 20px; }
.bd-bar { display: flex; height: 8px; border-radius: 4px; overflow: hidden; margin-bottom: 12px; background: rgba(255,255,255,0.1); }
.bd-seg { height: 100%; transition: width 0.3s ease; }
.bd-seg.principal { background: #818cf8; }
.bd-seg.interest { background: #f472b6; }
.bd-legend { display: flex; justify-content: space-between; gap: 12px; }
.bd-item { font-size: 12px; color: #c7d2fe; display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.bd-item strong { color: #fff; font-size: 13px; margin-left: 2px; }
.dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
.dot.principal { background: #818cf8; }
.dot.interest { background: #f472b6; }
.totals-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; border-top: 1px solid rgba(255,255,255,0.12); padding-top: 18px; }
.tcell { display: flex; flex-direction: column; gap: 3px; }
.tlabel { font-size: 10px; color: #a5b4fc; }
.tval { font-size: 14px; font-weight: 700; color: #fff; font-variant-numeric: tabular-nums; }`,
  js: `var term = 30;

function fmt(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function calc() {
  var price = parseFloat(document.getElementById('price').value) || 0;
  var down = parseFloat(document.getElementById('down').value) || 0;
  var rate = parseFloat(document.getElementById('rate').value) || 0;
  var loan = Math.max(0, price - down);
  var n = term * 12;
  var r = rate / 100 / 12;

  var monthly;
  if (r === 0) { monthly = loan / n; }
  else { monthly = loan * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1); }

  var totalPaid = monthly * n;
  var totalInterest = totalPaid - loan;
  var pPct = totalPaid > 0 ? (loan / totalPaid) * 100 : 0;

  document.getElementById('monthly').textContent = fmt(monthly);
  document.getElementById('piVal').textContent = fmt(monthly);
  document.getElementById('totalInt').textContent = fmt(totalInterest);
  document.getElementById('loanAmt').textContent = fmt(loan);
  document.getElementById('totalPaid').textContent = fmt(totalPaid);
  document.getElementById('segP').style.width = pPct + '%';
  document.getElementById('segI').style.width = (100 - pPct) + '%';

  var dpPct = price > 0 ? Math.round((down / price) * 100) : 0;
  document.getElementById('dpPct').textContent = dpPct + '%';
  document.getElementById('downRange').value = Math.min(50, dpPct);

  var d = new Date();
  d.setMonth(d.getMonth() + n);
  document.getElementById('payoff').textContent = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function syncDown(pct) {
  var price = parseFloat(document.getElementById('price').value) || 0;
  document.getElementById('down').value = Math.round(price * pct / 100);
  calc();
}

function setTerm(btn, yrs) {
  term = yrs;
  document.querySelectorAll('.term-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  calc();
}

calc();`,
  seo: {
    title: 'Mortgage Calculator — Free HTML CSS JS Snippet',
    description: 'Mortgage payment calculator with down payment slider, 15/30-year terms, amortization breakdown, and payoff date. Exports to React, Vue & Angular.',
    about: {
      title: 'Mortgage Calculator — Monthly Payment, Amortization Breakdown & Payoff Date',
      description: `A mortgage calculator is one of the highest-intent finance widgets on the web — home buyers use it to estimate affordability before they ever contact a lender. It shares its build with the [tip calculator](/ui-snippets/tip-calculator/) and [BMI calculator](/ui-snippets/bmi-calculator/). This snippet provides a complete, accurate mortgage calculator with a home price input, a down payment field linked to a percentage slider, an interest rate input, 15- and 30-year term toggle buttons, a large monthly payment display, a principal-vs-interest split bar, and a totals grid showing loan amount, total of payments, and a computed payoff date.\n\n**The amortization formula**\n\nThe core calculation uses the standard fixed-rate mortgage formula: M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1), where P is the loan principal (home price minus down payment), r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of payments (years × 12). The snippet guards against the zero-interest edge case by falling back to simple division (loan ÷ n) when r is 0, avoiding a divide-by-zero from the (1+r)ⁿ − 1 denominator.\n\n**The linked down payment slider**\n\nThe down payment dollar input and the percentage [range slider](/ui-snippets/range-slider/) stay in sync bidirectionally. Typing a dollar amount recalculates the percentage label and moves the slider via the calc() function. Dragging the slider calls syncDown(), which converts the percentage back to a dollar figure based on the current home price. This dual-control pattern is common in finance UIs because some users think in dollars and others in percentages.\n\n**The principal/interest split bar**\n\nThe horizontal split bar visualises how much of the total payments go to principal versus interest over the life of the loan. The principal segment width is calculated as (loan ÷ totalPaid) × 100 percent, and the interest segment fills the remainder. On a 30-year loan, interest often exceeds the principal — making this bar a powerful, immediate teaching tool that static numbers cannot match.\n\n**The computed payoff date**\n\nThe payoff date is derived by cloning the current date and advancing it by n months with setMonth(). It formats as a short month-year string via toLocaleDateString. This grounds the abstract loan term in a concrete future date, which research shows increases user engagement with financial planning tools.\n\n**Number formatting**\n\nAll currency values use toLocaleString('en-US') for thousands separators and Math.round() to drop cents, keeping the display clean. font-variant-numeric: tabular-nums ensures digits stay mono-width so the large monthly payment figure does not shift horizontally as the user types.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Enter the home price', text: 'Type the property price in the Home Price field. Every result recalculates instantly as you type — there is no Calculate button to press.' },
      { title: 'Set the down payment', text: 'Enter a dollar amount directly, or drag the percentage slider below the field. The two controls stay in sync — the percentage label updates as you type dollars, and the dollar field updates as you drag.' },
      { title: 'Adjust the interest rate', text: 'Type the annual interest rate as a percentage (for example 6.5). Use a rate from a current lender quote or a national average for an estimate.' },
      { title: 'Choose the loan term', text: 'Toggle between 15-year and 30-year terms. Watch how the shorter term raises the monthly payment but dramatically shrinks the total interest in the split bar.' },
      { title: 'Read the results', text: 'The monthly payment shows at the top. The split bar and legend break down principal versus total interest. The totals grid shows the loan amount, total of all payments, and the payoff date.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useState for inputs and useMemo for the derived calculations. Click "Vue" for a Vue 3 SFC with computed properties.' },
    ]},
    features: ['Standard amortization formula M = P·r(1+r)ⁿ/((1+r)ⁿ−1) with zero-interest fallback','Bidirectional down payment: dollar input synced with percentage slider','15-year / 30-year term toggle with .active highlight','Live recalculation on every input — no submit button','Principal vs interest split bar with proportional segment widths','Computed payoff date via setMonth() and toLocaleDateString','toLocaleString currency formatting with tabular-nums alignment','Totals grid: loan amount, total of payments, payoff date'],
    useCases: [
      { icon: 'APP', title: 'Real estate listing site affordability widget', desc: 'Embed on property detail pages pre-filled with the listing price. Let buyers instantly see the estimated monthly payment for that specific home. Connect the rate field to a live mortgage rate API so the default reflects current market conditions rather than a stale hardcoded value.' },
      { icon: 'CHART', title: 'Lender and broker lead-generation landing page', desc: 'Mortgage calculators are top-of-funnel lead magnets for lenders. After a user calculates, show a "Get pre-approved" CTA that passes the loan amount, term, and estimated payment into a lead form. The calculation creates intent and qualifies the lead before they ever speak to a loan officer.' },
      { icon: 'FLOW', title: 'Personal finance app home-buying planner', desc: 'Include in a budgeting app as part of a savings goal flow. Use the down payment percentage to set a savings target, and the monthly payment to check it against the user\'s budget. Add a debt-to-income ratio warning when the payment exceeds a percentage of their tracked income.' },
      { icon: 'CODE', title: 'Extend with taxes, insurance, and PMI', desc: 'Add property tax, homeowners insurance, and PMI (private mortgage insurance) inputs to compute a full PITI payment. PMI typically applies when the down payment is below 20% — wire the slider to show or hide the PMI input automatically. Add the escrow amounts to the principal-and-interest figure for the true monthly cost.' },
      { icon: 'LEARN', title: 'Study financial formulas and live-calc UI patterns', desc: 'The snippet demonstrates implementing a real financial formula in JavaScript, handling edge cases (zero interest), bidirectional input synchronisation, and proportional bar visualisation. These patterns transfer directly to loan, auto-finance, retirement, and investment calculators.' },
      { icon: 'DESIGN', title: 'Comparison tool for refinance scenarios', desc: 'Duplicate the calculator side by side to compare a current loan against a refinance offer. Show the monthly savings and the break-even point (closing costs ÷ monthly savings). The split bar makes the interest savings of a lower rate or shorter term visually obvious.' },
      { icon: 'CODE', title: 'Related: Signup Form', desc: 'See the [Signup Form](/ui-snippets/signup-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the monthly payment calculation accurate?', a: 'Yes — it uses the exact fixed-rate amortization formula that banks use for principal and interest: M = P · r(1+r)ⁿ / ((1+r)ⁿ − 1). The result matches any standard mortgage amortization schedule to the cent. Note that it calculates principal and interest only; a real monthly housing payment (PITI) also includes property tax, homeowners insurance, and possibly PMI and HOA fees, which you would add as separate inputs.' },
      { q: 'How do I add property tax, insurance, and PMI?', a: 'Add three more inputs: annual property tax, annual insurance, and a PMI rate. Convert the annual figures to monthly (÷ 12) and add them to the principal-and-interest result for the full PITI payment. For PMI, apply it only when the down payment is under 20% of the home price: if ((down / price) < 0.2) pmiMonthly = loan * pmiRate / 100 / 12. Most loans drop PMI automatically once 20% equity is reached.' },
      { q: 'How does the down payment slider stay in sync with the dollar field?', a: 'Two functions keep them linked. calc() runs on every dollar input and recomputes the percentage (down / price × 100), updating the label and slider position. syncDown(pct) runs when the slider moves and converts the percentage back to dollars (price × pct / 100), updating the dollar field. Because both call calc() at the end, every result stays consistent regardless of which control the user touched.' },
      { q: 'How do I build this in React?', a: 'Store price, down, rate, and term in useState. Compute the loan, monthly payment, total interest, and payoff date inside a useMemo that depends on those four values, so the math only re-runs when an input changes. For the linked slider, derive the percentage from down / price for display, and on slider change call setDown(Math.round(price * pct / 100)). Render currency with value.toLocaleString("en-US").' },
    ],
    aiPrompt: {
      paragraph: `Instead of re-deriving the amortization math yourself, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the calc() function's zero-interest branch avoids a divide-by-zero in the (1+r)^n - 1 denominator, and why the down payment dollar field and the percentage range input have to call each other's sync functions rather than sharing one handler. The same assistant can help optimize it, for example checking whether recalculating and rewriting nine DOM nodes on every keystroke in the price field is wasteful compared to batching the writes, or whether the payoff-date math using setMonth() handles edge cases like leap years correctly. It's also useful for extending the calculator: ask it to add property tax, homeowners insurance, and a PMI line that only appears below 20% down, or add an amortization schedule table users can expand year by year. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live "mortgage calculator" in plain HTML, CSS, and JavaScript using only the standard fixed-rate amortization formula — no calculation library, no backend.

Requirements:
- Inputs for home price, down payment (as a dollar amount), interest rate (annual percentage), and a loan term chosen between two toggle buttons (15-year and 30-year), all recalculating on every input event with no submit button.
- The down payment dollar input and a percentage range slider (0-50%) must stay bidirectionally synced: typing a dollar amount must update the slider's position and a displayed percentage label, and dragging the slider must recompute and write back the corresponding dollar amount based on the current home price.
- Compute the monthly principal-and-interest payment using the exact formula M = P * r(1+r)^n / ((1+r)^n - 1), where P is home price minus down payment, r is the monthly rate (annual rate / 12 / 100), and n is total number of payments (years * 12); handle the zero-interest-rate case with a simple division fallback instead of letting the formula divide by zero.
- Display the monthly payment prominently, plus a horizontal two-segment bar showing the proportion of total payments that goes to principal versus total interest over the life of the loan, with the segment widths computed from the actual totals (not hardcoded).
- Show a totals section with the loan amount, the total of all payments over the full term, and a computed payoff date obtained by advancing today's date forward by the total number of months.
- Format every currency value with thousands separators and no decimal places, and keep the numeric characters from shifting width as they update.`,
    },
  },
};

export default mortgageCalculator;
