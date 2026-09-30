const loanEmiCalculator = {
  id: 'loan-emi-calculator',
  title: 'Loan EMI Calculator',
  category: 'tools',
  html: `<div class="emi-card">
  <h2>Loan EMI Calculator</h2>
  <p class="sub">Estimate your monthly installment, total interest, and total payment.</p>

  <div class="field">
    <label for="principal">Loan amount</label>
    <div class="input-wrap">
      <span class="prefix">$</span>
      <input type="number" id="principal" value="250000" min="0" step="1000" oninput="calculateEmi()">
    </div>
  </div>

  <div class="field">
    <label for="rate">Annual interest rate</label>
    <div class="input-wrap">
      <input type="number" id="rate" value="7.5" min="0" step="0.1" oninput="calculateEmi()">
      <span class="suffix">%</span>
    </div>
  </div>

  <div class="field">
    <label for="tenure">Loan tenure</label>
    <div class="input-wrap">
      <input type="number" id="tenure" value="20" min="0" step="1" oninput="calculateEmi()">
      <span class="suffix">years</span>
    </div>
  </div>

  <div class="results">
    <div class="result-row emi">
      <span class="result-label">Monthly EMI</span>
      <span class="result-value" id="emiValue">$0</span>
    </div>
    <div class="result-row">
      <span class="result-label">Total interest</span>
      <span class="result-value" id="interestValue">$0</span>
    </div>
    <div class="result-row">
      <span class="result-label">Total payment</span>
      <span class="result-value" id="totalValue">$0</span>
    </div>
  </div>

  <div class="bar" aria-hidden="true">
    <div class="bar-principal" id="barPrincipal"></div>
    <div class="bar-interest" id="barInterest"></div>
  </div>
  <div class="legend">
    <span><i class="dot principal"></i> Principal</span>
    <span><i class="dot interest"></i> Interest</span>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 32px; margin: 0; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.emi-card {
  max-width: 400px;
  margin: 0 auto;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.05);
}

.emi-card h2 { font-size: 19px; color: #1e293b; margin: 0 0 4px; }
.sub { font-size: 13px; color: #64748b; margin: 0 0 20px; }

.field { margin-bottom: 16px; }
.field label { display: block; font-size: 12px; font-weight: 600; color: #475569; margin-bottom: 6px; }

.input-wrap {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.input-wrap:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }

.prefix, .suffix {
  padding: 0 12px;
  font-size: 13px;
  color: #64748b;
  background: #f8fafc;
  align-self: stretch;
  display: flex;
  align-items: center;
}
.prefix { border-right: 1px solid #e2e8f0; }
.suffix { border-left: 1px solid #e2e8f0; }

.input-wrap input {
  flex: 1;
  border: none;
  outline: none;
  padding: 10px 12px;
  font-size: 14px;
  color: #1e293b;
  font-family: inherit;
  min-width: 0;
}

.results {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px dashed #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.result-row { display: flex; justify-content: space-between; align-items: center; }
.result-label { font-size: 13px; color: #64748b; }
.result-value { font-size: 14px; font-weight: 700; color: #1e293b; }
.result-row.emi .result-value { font-size: 22px; color: #6366f1; }
.result-row.emi .result-label { font-size: 13px; font-weight: 600; }

.bar {
  display: flex;
  height: 10px;
  border-radius: 6px;
  overflow: hidden;
  margin-top: 18px;
  background: #f1f5f9;
}
.bar-principal { background: #6366f1; transition: width 0.3s ease; }
.bar-interest { background: #f97316; transition: width 0.3s ease; }

.legend {
  display: flex;
  gap: 16px;
  margin-top: 10px;
  font-size: 12px;
  color: #64748b;
}
.legend span { display: flex; align-items: center; gap: 6px; }
.dot { width: 8px; height: 8px; border-radius: 50%; display: inline-block; }
.dot.principal { background: #6366f1; }
.dot.interest { background: #f97316; }`,
  js: `function formatCurrency(n) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function calculateEmi() {
  const principal = parseFloat(document.getElementById('principal').value) || 0;
  const annualRate = parseFloat(document.getElementById('rate').value) || 0;
  const years = parseFloat(document.getElementById('tenure').value) || 0;

  const months = years * 12;
  const monthlyRate = annualRate / 12 / 100;

  let emi = 0;
  if (principal > 0 && months > 0) {
    if (monthlyRate === 0) {
      // Zero-interest edge case: simple division avoids dividing by zero below.
      emi = principal / months;
    } else {
      const factor = Math.pow(1 + monthlyRate, months);
      emi = (principal * monthlyRate * factor) / (factor - 1);
    }
  }

  const totalPayment = emi * months;
  const totalInterest = Math.max(totalPayment - principal, 0);

  document.getElementById('emiValue').textContent = formatCurrency(emi);
  document.getElementById('interestValue').textContent = formatCurrency(totalInterest);
  document.getElementById('totalValue').textContent = formatCurrency(totalPayment || principal);

  const principalPct = totalPayment > 0 ? (principal / totalPayment) * 100 : 100;
  const interestPct = 100 - principalPct;
  document.getElementById('barPrincipal').style.width = principalPct + '%';
  document.getElementById('barInterest').style.width = interestPct + '%';
}

calculateEmi();`,

  seo: {
    title: 'Loan EMI Calculator — Free HTML CSS JS EMI Formula Snippet',
    description: 'A loan EMI calculator that computes monthly installment, total interest, and total payment from principal, rate, and tenure using the standard amortization formula.',
    about: {
      title: 'Loan EMI Calculator — HTML, CSS & JavaScript Amortization Snippet',
      description: `An EMI (Equated Monthly Installment) is the fixed amount a borrower pays every month toward a loan until it's fully repaid — the standard structure for mortgages, auto loans, and personal loans. Every EMI calculator on the web, no matter how polished, comes down to the same amortization formula applied to three inputs: principal, interest rate, and tenure.

This snippet implements that formula in **plain HTML, CSS, and vanilla JavaScript**, with live recalculation on every keystroke and a two-color bar visualizing the principal-versus-interest split.

**The EMI formula**

The standard formula is:

\`EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]\`

where \`P\` is the principal, \`r\` is the *monthly* interest rate (the annual rate divided by 12 and by 100 to convert from a percentage), and \`n\` is the total number of monthly installments (years × 12). The JavaScript computes \`factor = Math.pow(1 + monthlyRate, months)\` once and reuses it in both the numerator and denominator, which is exactly the \`(1 + r)^n\` term in the formula above.

**Handling the zero-interest edge case**

If the interest rate is 0, the formula's denominator \`(1 + r)^n − 1\` becomes 0, which would throw a division-by-zero error. The code checks for \`monthlyRate === 0\` first and falls back to simple division — \`principal / months\` — since a zero-interest loan is just the principal spread evenly across the term with no formula needed.

**Deriving total interest and total payment**

Once EMI is known, \`totalPayment = emi × months\` gives the sum of every installment, and \`totalInterest = totalPayment − principal\` gives the portion of that total which is pure interest rather than principal repayment. These two numbers are what most borrowers actually care about — the EMI tells you the monthly burden, but total interest tells you the true cost of borrowing.

**The principal/interest bar**

The visual bar underneath the results is two flex children whose widths are set from \`principal / totalPayment\` and its complement, so the bar always sums to 100% regardless of the numbers involved — a longer tenure or higher rate visibly shifts more of the bar toward the orange interest segment.

**Live recalculation**

Every input has \`oninput="calculateEmi()"\`, so the results and bar update on every keystroke rather than requiring a submit button — appropriate for a calculator where users expect to see the impact of adjusting a number immediately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Loan EMI Calculator" in the sidebar Library tab. The preview loads with example values already calculated.' },
        { title: 'Change the inputs', text: 'Adjust the loan amount, interest rate, or tenure in the preview and watch the EMI, total interest, and total payment update instantly.' },
        { title: 'Check the principal/interest split', text: 'Watch the two-color bar shift as you increase the tenure or rate — a longer loan pushes more of the total toward interest.' },
        { title: 'Adjust the currency format', text: 'In the JS panel, edit the formatCurrency function to use a different locale or currency symbol via toLocaleString options.' },
        { title: 'Add monthly tenure input', text: 'In the HTML panel, add a months field alongside years and update the months calculation in calculateEmi() to sum years × 12 plus the extra months.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for React + Tailwind CSS.' },
      ],
    },
    features: [
      'Implements the exact standard EMI amortization formula, not an approximation',
      'Handles the zero-interest edge case separately to avoid a division-by-zero error',
      'Live recalculation on every keystroke via oninput — no submit button needed',
      'Derives total interest and total payment directly from the computed EMI',
      'Two-color bar visualizes the principal-versus-interest split, always summing to 100%',
      'Currency formatting via toLocaleString for readable thousands separators',
      'Prefix/suffix input styling ($ and % / years) makes each field\'s unit unambiguous',
      'Focus-within ring on each input group for clear keyboard and mouse focus feedback',
      'All calculation logic isolated in one calculateEmi function, easy to unit test or extend',
      'No framework, no finance library, no build step required',
    ],
    useCases: [
      { icon: 'FINANCE', title: 'Mortgage and auto loan estimators', desc: 'Give visitors an instant, no-signup estimate of their monthly payment before they start a formal loan application.' },
      { icon: 'LEARN', title: 'Learn the amortization formula', desc: 'Study how principal, monthly rate, and number of payments combine algebraically to produce a fixed monthly installment.' },
      { icon: 'FLOW', title: 'Prototype a fintech onboarding flow', desc: 'Drop this into an early product prototype where users need to see loan affordability before connecting a real underwriting API.' },
      { icon: 'DESIGN', title: 'Match your financial product branding', desc: 'Recolor the bar and result highlight to fit your brand, and adjust the currency symbol for your target market.' },
      { icon: 'ACCESS', title: 'Add ARIA live regions for the results', desc: 'Wrap the result values in an aria-live="polite" region so screen reader users hear the updated EMI as they adjust the inputs.' },
      { icon: 'CODE', title: 'Extract the formula into a reusable function', desc: 'Pull calculateEmi\'s math into a standalone pure function you can unit test and reuse across a full loan-comparison feature.' },
      { icon: 'CODE', title: 'Related: Return Label Generator', desc: 'See the [Return Label Generator](/ui-snippets/return-label-generator/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What formula does this calculator use?', a: 'The standard EMI amortization formula: EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where P is the principal, r is the monthly interest rate (annual rate ÷ 12 ÷ 100), and n is the total number of monthly payments (years × 12).' },
      { q: 'Why does the calculator check for a zero interest rate separately?', a: 'When the interest rate is 0, the formula\'s denominator (1 + r)^n − 1 evaluates to 0, which would cause a division-by-zero error. The code detects this case and falls back to simple division: principal divided evenly across the number of months.' },
      { q: 'How is total interest calculated?', a: 'Total interest equals total payment minus the original principal. Total payment is the EMI multiplied by the total number of months, so total interest represents everything paid beyond the amount originally borrowed.' },
      { q: 'Can I add support for months in addition to years for the tenure?', a: 'Yes. Add a second number input for extra months, and change the months calculation to years * 12 + extraMonths before it feeds into the EMI formula — no other logic needs to change.' },
      { q: 'How do I change the currency symbol or locale?', a: 'Edit the formatCurrency function\'s toLocaleString call — pass a different locale string (like "en-IN" or "de-DE") and/or wrap the number with Intl.NumberFormat and a currency style option for full localized currency formatting.' },
      { q: 'Does this account for fees, taxes, or insurance added to a real loan payment?', a: 'No — this calculates the pure amortization EMI based on principal, rate, and tenure only. Real-world monthly payments may include property tax escrow, insurance, or origination fees that this snippet does not model.' },
      { q: 'Why does the calculator update as I type instead of needing a "Calculate" button?', a: 'Each input uses the oninput event, which fires on every keystroke, so calculateEmi() reruns and updates the results immediately. This matches user expectations for a lightweight calculator tool.' },
      { q: 'Can I generate a full month-by-month amortization schedule from this?', a: 'Yes. Loop from month 1 to n, and on each iteration compute that month\'s interest portion as the remaining balance times the monthly rate, subtract the rest of the EMI from the balance as principal repaid, and store each row — this snippet only shows the totals, not the full schedule.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to derive the EMI formula from first principles — showing how the present-value-of-an-annuity equation reduces to the exact JavaScript expression used here — so you understand why the monthly rate and number of payments both need to be derived from the annual rate and the number of years before plugging into Math.pow. It's also a good snippet to extend with the assistant's help: ask it to add a full month-by-month amortization table showing the principal/interest split for every single payment, to add input validation that clamps unreasonable values (negative rates, zero-length tenures), or to add a prepayment calculator that shows how an extra lump-sum payment shortens the loan term.`,
      prompt: `Build a loan EMI (Equated Monthly Installment) calculator in plain HTML, CSS, and JavaScript — no framework, no finance library.

Requirements:
- Three number inputs: loan principal, annual interest rate as a percentage, and loan tenure in years, each updating results live on every keystroke via the input event (no submit button).
- Implement the exact standard amortization formula EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1], where r is the monthly interest rate (annual rate divided by 12 and by 100) and n is the total number of monthly payments (years × 12).
- Explicitly handle the case where the interest rate is 0 with a simple division fallback (principal divided by number of months), since the standard formula divides by zero in that case.
- Display three results: the computed monthly EMI, the total interest paid over the full loan term, and the total amount paid (principal plus interest).
- Render a two-segment horizontal bar showing the proportion of total payment that is principal versus interest, with widths computed as percentages that always sum to 100%, updating live alongside the numeric results.
- Format all currency values with thousands separators for readability, and isolate all the math inside a single, clearly named calculation function that could be unit tested independently of the DOM.`,
    },
  },
};

export default loanEmiCalculator;
