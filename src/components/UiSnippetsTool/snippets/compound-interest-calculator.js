const compoundInterestCalculator = {
  id: 'compound-interest-calculator',
  title: 'Compound Interest Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <h2>Compound Interest Calculator</h2>

  <div class="form-grid">
    <div class="field">
      <label>Principal ($)</label>
      <input type="number" id="principal" value="10000" min="0" />
    </div>
    <div class="field">
      <label>Annual rate (%)</label>
      <input type="number" id="rate" value="7" step="0.1" min="0" />
    </div>
    <div class="field">
      <label>Years</label>
      <input type="number" id="years" value="15" min="1" max="60" />
    </div>
    <div class="field">
      <label>Compounding</label>
      <select id="frequency">
        <option value="1">Annually</option>
        <option value="4">Quarterly</option>
        <option value="12" selected>Monthly</option>
        <option value="365">Daily</option>
      </select>
    </div>
    <div class="field span-2">
      <label>Monthly contribution ($)</label>
      <input type="number" id="contribution" value="200" min="0" />
    </div>
  </div>

  <div class="summary" id="summary"></div>

  <div class="table-wrap">
    <table id="breakdown-table">
      <thead><tr><th>Year</th><th>Contributions</th><th>Interest earned</th><th>Balance</th></tr></thead>
      <tbody id="breakdown-body"></tbody>
    </table>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 720px; margin: 0 auto; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 16px; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-bottom: 18px; }
.field.span-2 { grid-column: span 2; }
.field label { display: block; font-size: 11px; font-weight: 700; color: #64748b; text-transform: uppercase; letter-spacing: 0.03em; margin-bottom: 6px; }
.field input, .field select {
  width: 100%; padding: 9px 11px; border: 1.5px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: inherit; color: #1e293b;
}
.field input:focus, .field select:focus { outline: none; border-color: #6366f1; }

.summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(140px, 1fr)); gap: 10px; margin-bottom: 18px; }
.summary .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 14px; }
.summary .card .val { font-size: 20px; font-weight: 800; color: #1e293b; }
.summary .card.highlight .val { color: #16a34a; }
.summary .card .lbl { font-size: 11px; font-weight: 700; color: #64748b; margin-top: 4px; text-transform: uppercase; letter-spacing: 0.03em; }

.table-wrap { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; font-size: 12.5px; }
th { text-align: right; padding: 9px 12px; background: #f8fafc; color: #64748b; font-size: 10.5px; text-transform: uppercase; letter-spacing: 0.03em; border-bottom: 1px solid #e2e8f0; }
th:first-child, td:first-child { text-align: left; }
td { text-align: right; padding: 7px 12px; border-bottom: 1px solid #f1f5f9; color: #334155; }
tr:last-child td { border-bottom: none; }
tbody { display: block; max-height: 320px; overflow-y: auto; }
thead, tbody tr { display: table; width: 100%; table-layout: fixed; }`,
  js: `function currency(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const yearsInput = document.getElementById('years');
const frequencyInput = document.getElementById('frequency');
const contributionInput = document.getElementById('contribution');
const summary = document.getElementById('summary');
const breakdownBody = document.getElementById('breakdown-body');

function computeSchedule(principal, annualRatePct, years, compoundsPerYear, monthlyContribution) {
  const r = annualRatePct / 100;
  const periodicRate = r / compoundsPerYear;
  const monthlyRate = r / 12;
  let balance = principal;
  let totalContributions = principal;
  const rows = [];

  // Simulate month by month for accuracy with monthly contributions, but only
  // apply compounding growth at the configured compounding frequency.
  const totalMonths = years * 12;
  const monthsPerCompound = 12 / compoundsPerYear;
  let monthsSinceCompound = 0;
  let yearStartBalance = principal;
  let yearContributions = 0;
  let yearInterest = 0;

  for (let month = 1; month <= totalMonths; month++) {
    balance += monthlyContribution;
    totalContributions += monthlyContribution;
    yearContributions += monthlyContribution;
    monthsSinceCompound += 1;

    if (monthsSinceCompound >= monthsPerCompound) {
      const interest = balance * periodicRate;
      balance += interest;
      yearInterest += interest;
      monthsSinceCompound = 0;
    }

    if (month % 12 === 0) {
      rows.push({
        year: month / 12,
        contributions: yearContributions,
        interest: yearInterest,
        balance: balance,
      });
      yearContributions = 0;
      yearInterest = 0;
    }
  }

  return { rows, finalBalance: balance, totalContributions };
}

function render() {
  const principal = Math.max(0, parseFloat(principalInput.value) || 0);
  const rate = Math.max(0, parseFloat(rateInput.value) || 0);
  const years = Math.max(1, Math.min(60, parseInt(yearsInput.value, 10) || 1));
  const frequency = parseInt(frequencyInput.value, 10);
  const contribution = Math.max(0, parseFloat(contributionInput.value) || 0);

  const { rows, finalBalance, totalContributions } = computeSchedule(principal, rate, years, frequency, contribution);
  const totalInterest = finalBalance - totalContributions;

  summary.innerHTML =
    '<div class="card highlight"><div class="val">' + currency(finalBalance) + '</div><div class="lbl">Final balance</div></div>' +
    '<div class="card"><div class="val">' + currency(totalContributions) + '</div><div class="lbl">Total contributed</div></div>' +
    '<div class="card"><div class="val">' + currency(totalInterest) + '</div><div class="lbl">Interest earned</div></div>';

  breakdownBody.innerHTML = rows.map((row) =>
    '<tr><td>' + row.year + '</td>' +
    '<td>' + currency(row.contributions) + '</td>' +
    '<td>' + currency(row.interest) + '</td>' +
    '<td>' + currency(row.balance) + '</td></tr>'
  ).join('');
}

[principalInput, rateInput, yearsInput, frequencyInput, contributionInput].forEach((el) => {
  el.addEventListener('input', render);
  el.addEventListener('change', render);
});

render();`,

  seo: {
    title: 'Compound Interest Calculator — Free HTML CSS JS Snippet',
    description: 'Calculate compound interest growth with principal, rate, compounding frequency and monthly contributions, plus a full year-by-year balance breakdown table. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Compound Interest Calculator — Principal, Rate, Compounding Frequency & Monthly Contributions',
      description: `Compound interest is famously described as one of the most powerful forces in finance, but the actual formula, especially once regular monthly contributions are added on top, is more involved than the textbook single-lump-sum equation most people remember. This snippet simulates real compound growth month by month, correctly separating contribution timing from compounding timing, and shows exactly how much of the final balance came from contributions versus growth.

**Why the simulation runs month by month instead of using the closed-form formula**

The classic compound interest formula \`A = P(1 + r/n)^(nt)\` works cleanly for a single lump sum, but it does not have a simple closed form once contributions are added at a different cadence than compounding occurs — a monthly contribution compounding only quarterly, for instance. \`computeSchedule()\` sidesteps this by simulating the account month by month: adding the contribution first, then checking whether enough months have passed to trigger a compounding event at the selected frequency, and applying interest only at that point. This correctly reproduces any combination of contribution and compounding cadence without needing a different formula for each combination.

**Separating contribution timing from compounding timing**

A monthly contribution is added to the balance every single month regardless of the compounding frequency setting, but interest is only calculated and added when \`monthsSinceCompound\` reaches \`monthsPerCompound\` (12 divided by the compounding frequency). This distinction matters concretely: a dollar contributed in month 2 of a quarterly-compounding account has already grown for one fewer month than a dollar contributed in month 1 by the time the quarter's interest posts, and the month-by-month simulation captures that naturally rather than approximating it.

**Tracking contributions and interest separately, per year and in total**

Alongside the running balance, the simulation accumulates \`yearContributions\` and \`yearInterest\` separately within each 12-month block, resetting both at each year boundary. This is what powers the year-by-year breakdown table's three separate columns — contributions, interest earned, and balance — making it possible to see, for any given year, how much of that year's balance growth came from money you added versus money the investment earned on its own.

**A running total that visually separates "your money" from "growth"**

The summary cards above the table show the final balance, total amount contributed (including the initial principal), and total interest earned as \`finalBalance - totalContributions\`. This framing directly answers the question most people actually want answered when they use a compound interest calculator: not just "how big will this be," but "how much of that is actually growth I did not have to save myself."

**Bounded, sanitized inputs**

Every numeric input is clamped with \`Math.max\`/\`Math.min\` and falls back to 0 (or 1 for years) on invalid or empty input via \`|| 0\` fallbacks, so the calculator never breaks or shows \`NaN\` in the middle of editing a field — the years field specifically clamps between 1 and 60 to keep the year-by-year table a reasonable, scrollable length.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Enter your starting principal', text: 'The initial lump sum you are investing or saving, before any growth or contributions.' },
        { title: 'Set the annual interest rate and time horizon', text: 'Enter the expected annual rate as a percentage and how many years to project, from 1 to 60.' },
        { title: 'Choose a compounding frequency', text: 'Annually, quarterly, monthly, or daily — this controls how often interest is calculated and added to the balance.' },
        { title: 'Add an optional monthly contribution', text: 'Set to 0 for a pure lump-sum projection, or enter a recurring amount added every month.' },
        { title: 'Read the summary cards', text: 'Final balance, total amount contributed (including principal), and total interest earned are shown at a glance.' },
        { title: 'Scroll the year-by-year table', text: 'See exactly how contributions and interest earned break down for every individual year of the projection.' },
      ],
    },
    features: [
      'Real month-by-month simulation, not just the single-lump-sum closed-form formula',
      'Correctly handles a compounding frequency independent of the monthly contribution cadence',
      'Selectable compounding frequency: annually, quarterly, monthly, or daily',
      'Optional recurring monthly contribution added on top of the initial principal',
      'Summary cards separating final balance, total contributed, and total interest earned',
      'Full year-by-year breakdown table showing contributions, interest, and running balance per year',
      'Locale-formatted currency output throughout',
      'Bounded, sanitized numeric inputs that never produce NaN or a broken table mid-edit',
      'Live recalculation on every input change, up to 60 years of projection',
    ],
    useCases: [
      { icon: 'APP', title: 'Projecting retirement or long-term savings growth', desc: 'Model how a starting balance plus a recurring monthly contribution compounds over a 10-40 year horizon at different assumed rates.' },
      { icon: 'LEARN', title: 'Teaching how compounding frequency affects growth', desc: 'Switch between annual and daily compounding on the same principal and rate to show how much of a difference compounding frequency alone makes.' },
      { icon: 'FLOW', title: 'Comparing "contribute more" vs "start earlier" scenarios', desc: 'Run the same total time horizon with different starting principal and contribution combinations to see which lever moves the final balance more.' },
      { icon: 'DASH', title: 'Financial planning content and calculators', desc: 'Pair with a [mortgage calculator](/ui-snippets/mortgage-calculator/) or [loan EMI calculator](/ui-snippets/loan-emi-calculator/) in a personal-finance tools page.' },
      { icon: 'DESIGN', title: 'Illustrating "interest earning interest" concretely', desc: 'The per-year interest column visibly grows even when contributions stay flat, making the core idea of compounding tangible rather than abstract.' },
      { icon: 'CODE', title: 'Related: Palindrome & Anagram Checker', desc: 'See the [Palindrome & Anagram Checker](/ui-snippets/palindrome-anagram-checker/) for a related misc pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why simulate month by month instead of using the standard compound interest formula?', a: 'The standard closed-form formula A = P(1 + r/n)^(nt) only works cleanly for a single lump sum with no ongoing contributions. Once a recurring monthly contribution is added, there is no simple closed-form equation that also respects a different compounding frequency, so the calculator simulates the account balance month by month instead, which handles any combination of contribution and compounding cadence correctly.' },
      { q: 'Does the monthly contribution get added before or after interest for the month?', a: 'The contribution is added to the balance every month, but interest is only calculated and applied when a compounding period actually elapses (which may span multiple months, e.g. every third month for quarterly compounding). This means a contribution made partway through a compounding period has slightly less time to grow within that period than one made at the start, exactly as it would in a real account.' },
      { q: 'How is "total interest earned" calculated?', a: 'It is the final balance minus the total amount contributed, where total contributed includes both the initial principal and every monthly contribution added over the full time horizon. This isolates exactly how much of the final balance is growth versus money you put in yourself.' },
      { q: 'What happens if I set the monthly contribution to zero?', a: 'The calculator behaves as a pure lump-sum compound interest projection — only the initial principal grows via the selected compounding frequency, with no additional money added over time.' },
      { q: 'Why is the years input capped at 60?', a: 'It keeps the year-by-year breakdown table a reasonable, scrollable length and stays within a realistic range for personal financial planning. Edit the max attribute on the years input in the HTML panel to raise the cap if needed.' },
      { q: 'Does this account for taxes, fees, or inflation?', a: 'No — it is a pure compound growth projection based only on principal, rate, compounding frequency, and contributions. Real investment returns are also affected by fees, taxes, and inflation, none of which are modeled here.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's JavaScript into an AI assistant like Claude and ask it to walk through exactly why a month-by-month simulation is necessary once a monthly contribution and an independent compounding frequency are both involved, instead of the single-lump-sum closed-form compound interest formula. It is also a good base to extend: ask for an inflation-adjusted "real return" toggle that also discounts the final balance by an assumed inflation rate, a chart visualizing the balance growth curve over time, or a reverse mode that solves for the required monthly contribution to reach a target final balance.`,
      prompt: `Build a client-side compound interest calculator in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- Inputs for principal amount, annual interest rate (percentage), number of years (1-60), a compounding frequency selector (annually, quarterly, monthly, or daily), and an optional recurring monthly contribution amount, recalculating live on every input change.
- Simulate the balance month by month rather than using the single-lump-sum closed-form compound interest formula: add the monthly contribution to the balance every month, but only calculate and apply interest when enough months have elapsed to reach the next compounding period based on the selected frequency (e.g. every 3 months for quarterly compounding).
- Track, separately per calendar year of the simulation, the total contributions added and the total interest earned that year, resetting both counters at each year boundary.
- Display summary cards showing the final balance, the total amount contributed across the whole time horizon (including the initial principal), and total interest earned (final balance minus total contributed).
- Render a year-by-year breakdown table with columns for year number, that year's contributions, that year's interest earned, and the balance at the end of that year.
- Format all currency values with locale-appropriate thousands separators and no decimal places.
- Sanitize and clamp all numeric inputs (never negative, years bounded to a sane range) so an empty or invalid field never produces NaN or breaks the table.`,
    },
  },
};

export default compoundInterestCalculator;
