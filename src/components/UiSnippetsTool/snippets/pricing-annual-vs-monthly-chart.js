const pricingAnnualVsMonthlyChart = {
  id: 'pricing-annual-vs-monthly-chart',
  title: 'Annual vs Monthly Cost Chart',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="avm-wrap">
  <div class="avm-card">
    <div class="avm-head">
      <h2 class="avm-title">Annual vs. monthly cost over a year</h2>
      <div class="avm-legend">
        <span><i class="avm-dot avm-dot-monthly"></i>Pay monthly ($12/mo)</span>
        <span><i class="avm-dot avm-dot-annual"></i>Pay annually ($108/yr)</span>
      </div>
    </div>

    <div class="avm-chart-wrap">
      <svg id="avmChart" viewBox="0 0 640 300" class="avm-svg" role="img" aria-label="Cumulative cost comparison chart"></svg>
    </div>

    <div class="avm-stats">
      <div class="avm-stat">
        <p class="avm-stat-label">Break-even month</p>
        <p class="avm-stat-value" id="avmBreakeven">—</p>
      </div>
      <div class="avm-stat">
        <p class="avm-stat-label">12-month cost, monthly plan</p>
        <p class="avm-stat-value" id="avmMonthlyTotal">—</p>
      </div>
      <div class="avm-stat">
        <p class="avm-stat-label">12-month cost, annual plan</p>
        <p class="avm-stat-value" id="avmAnnualTotal">—</p>
      </div>
      <div class="avm-stat avm-stat-highlight">
        <p class="avm-stat-label">Total saved by paying annually</p>
        <p class="avm-stat-value" id="avmSaved">—</p>
      </div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.avm-wrap{width:100%;max-width:680px}
.avm-card{background:linear-gradient(165deg,#141b2c,#0d1220);border:1px solid #212c45;border-radius:20px;padding:28px}
.avm-head{display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:12px}
.avm-title{font-size:17px;font-weight:800;color:#f4f7fb;letter-spacing:-.01em}
.avm-legend{display:flex;gap:16px;font-size:12px;color:#9aa5bd;font-weight:600}
.avm-legend span{display:inline-flex;align-items:center;gap:6px}
.avm-dot{width:9px;height:9px;border-radius:50%;display:inline-block}
.avm-dot-monthly{background:#f87171}
.avm-dot-annual{background:#34d399}
.avm-chart-wrap{margin-top:20px;overflow-x:auto}
.avm-svg{width:100%;height:auto;min-width:480px}
.avm-stats{margin-top:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:14px}
.avm-stat{background:#0d1220;border:1px solid #212c45;border-radius:12px;padding:14px}
.avm-stat-label{font-size:11px;color:#7f8bab;font-weight:600;line-height:1.4}
.avm-stat-value{font-size:19px;font-weight:800;color:#f4f7fb;margin-top:6px;font-variant-numeric:tabular-nums}
.avm-stat-highlight{border-color:rgba(52,211,153,.35);background:rgba(52,211,153,.06)}
.avm-stat-highlight .avm-stat-value{color:#34d399}`,

  js: `// Real computed data points, not illustrative fake bars.
const MONTHLY_RATE = 12;   // $/month when paying month-to-month
const ANNUAL_PRICE = 108;  // $ charged once for a full year upfront

const months = Array.from({ length: 12 }, (_, i) => i + 1); // 1..12
const monthlyLine = months.map((m) => MONTHLY_RATE * m);     // cumulative pay-monthly cost
const annualLine = months.map(() => ANNUAL_PRICE);           // flat, paid upfront in month 1

// Find the first month where cumulative monthly cost exceeds the annual price.
let breakevenMonth = null;
for (let i = 0; i < months.length; i++) {
  if (monthlyLine[i] > ANNUAL_PRICE) { breakevenMonth = months[i]; break; }
}

const monthlyTotal12 = monthlyLine[11]; // 12 * 12 = 144
const annualTotal12 = ANNUAL_PRICE;     // 108
const totalSaved = monthlyTotal12 - annualTotal12; // 144 - 108 = 36

document.getElementById('avmBreakeven').textContent =
  breakevenMonth ? 'Month ' + breakevenMonth : 'N/A';
document.getElementById('avmMonthlyTotal').textContent = '$' + monthlyTotal12;
document.getElementById('avmAnnualTotal').textContent = '$' + annualTotal12;
document.getElementById('avmSaved').textContent = '$' + totalSaved;

// --- Render an SVG line chart from the real data arrays above ---
const svg = document.getElementById('avmChart');
const W = 640, H = 300;
const padL = 46, padR = 20, padT = 20, padB = 34;
const chartW = W - padL - padR;
const chartH = H - padT - padB;

const maxY = Math.max(...monthlyLine, ...annualLine);
const niceMax = Math.ceil(maxY / 20) * 20; // round up to a clean gridline max

function xFor(month) {
  return padL + ((month - 1) / (months.length - 1)) * chartW;
}
function yFor(value) {
  return padT + chartH - (value / niceMax) * chartH;
}

function pathFor(values) {
  return values.map((v, i) => (i === 0 ? 'M' : 'L') + xFor(months[i]) + ',' + yFor(v)).join(' ');
}

let svgMarkup = '';

// Gridlines (horizontal, 4 bands)
for (let g = 0; g <= 4; g++) {
  const val = (niceMax / 4) * g;
  const y = yFor(val);
  svgMarkup += '<line x1="' + padL + '" y1="' + y + '" x2="' + (W - padR) + '" y2="' + y + '" stroke="#212c45" stroke-width="1"/>';
  svgMarkup += '<text x="' + (padL - 8) + '" y="' + (y + 4) + '" text-anchor="end" font-size="10" fill="#5c6779">$' + val + '</text>';
}

// X axis month labels (every other month to avoid crowding)
months.forEach((m) => {
  if (m % 2 !== 1 && m !== 12) return;
  const x = xFor(m);
  svgMarkup += '<text x="' + x + '" y="' + (H - 10) + '" text-anchor="middle" font-size="10" fill="#5c6779">' + m + '</text>';
});

// Breakeven marker
if (breakevenMonth) {
  const bx = xFor(breakevenMonth);
  svgMarkup += '<line x1="' + bx + '" y1="' + padT + '" x2="' + bx + '" y2="' + (padT + chartH) + '" stroke="#7c8bb0" stroke-width="1" stroke-dasharray="4 4"/>';
}

// Annual flat line
svgMarkup += '<path d="' + pathFor(annualLine) + '" fill="none" stroke="#34d399" stroke-width="2.5"/>';
// Monthly cumulative line
svgMarkup += '<path d="' + pathFor(monthlyLine) + '" fill="none" stroke="#f87171" stroke-width="2.5"/>';

// Data point dots for the monthly line
monthlyLine.forEach((v, i) => {
  svgMarkup += '<circle cx="' + xFor(months[i]) + '" cy="' + yFor(v) + '" r="2.5" fill="#f87171"/>';
});
annualLine.forEach((v, i) => {
  svgMarkup += '<circle cx="' + xFor(months[i]) + '" cy="' + yFor(v) + '" r="2.5" fill="#34d399"/>';
});

svg.innerHTML = svgMarkup;`,

  seo: {
    title: 'Annual vs Monthly Cost Chart — Free HTML CSS JS Snippet, No Library',
    description: 'A pure SVG line chart comparing real cumulative pay-monthly cost against a flat annual price across 12 months, computing the actual break-even month.',
    about: {
      title: 'Annual vs Monthly Cost Chart — Real Cumulative Data, Pure SVG, No Charting Library',
      description: `Pricing pages routinely claim "save by paying annually" without showing why — this snippet makes the crossover point visually undeniable by plotting two real, computed lines across 12 months: cumulative cost when paying monthly, and the flat cost of paying annually upfront. There's no charting library involved; the SVG path data is generated directly from two small arrays of actual numbers.

**The two lines, computed, not illustrated**

\`monthlyLine\` is built as \`months.map((m) => MONTHLY_RATE * m)\` — literally the monthly rate multiplied by the month number, so month 1 is \\$12, month 6 is \\$72, month 12 is \\$144. \`annualLine\` is a flat array of the same \\$108 value repeated 12 times, representing money paid once upfront in month 1 that then simply sits flat as a comparison baseline. Nothing here is a hand-drawn bar height standing in for "roughly what it might cost" — every point is the literal formula result.

**Finding the real break-even month**

A loop walks \`monthlyLine\` and returns the first month where the cumulative monthly cost exceeds the flat annual price: at \\$12/month against a \\$108 annual price, month 9 totals \\$108 (equal) and month 10 totals \\$120 (the first month strictly *greater* than \\$108) — so the chart correctly reports month 10 as the break-even point, with a dashed vertical marker drawn at that exact x-position, computed from the same data the lines are drawn from, not eyeballed.

**Building the SVG path by hand**

\`pathFor(values)\` maps each data point through \`xFor(month)\` and \`yFor(value)\` — linear scales computed from the chart's pixel dimensions, the data range, and a "nice" rounded-up maximum for clean gridlines — and joins them into a standard SVG path \`d\` string (\`M\` for the first point, \`L\` for every subsequent one). This is the same technique every JS charting library uses internally; writing it directly keeps the snippet dependency-free and the data flow fully transparent, from raw numbers to rendered pixels.

**Why cumulative, not per-month, cost is the right comparison**

A bar chart of "cost this month" would show the annual plan as one big spike in month 1 and nothing after — technically accurate but visually misleading about ongoing value. Plotting *cumulative* spend makes the actual trade-off legible: you pay more upfront with the annual plan, and month-by-month the monthly plan looks cheaper, right up until the point its running total crosses and then permanently exceeds the annual price. That crossing point, not the raw prices, is the number that actually matters to a buyer deciding which to choose.

**Customizing it**

Change \`MONTHLY_RATE\` and \`ANNUAL_PRICE\` to your real plan pricing — every derived stat, line, and the break-even marker recalculate automatically. Pair this with a [pricing toggle](/ui-snippets/pricing-toggle/) so switching a monthly/annual toggle elsewhere on the page could drive the same two constants.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Read the two lines', text: 'Red is cumulative pay-monthly cost; green is the flat annual price paid upfront.' },
      { title: 'Find the dashed marker', text: 'It sits exactly at the computed break-even month, not an estimate.' },
      { title: 'Check the stat cards', text: 'Break-even month, 12-month totals for each plan, and total savings are all computed values.' },
      { title: 'Change the rates', text: 'Edit MONTHLY_RATE and ANNUAL_PRICE — every line and stat recalculates.' },
      { title: 'Resize the browser', text: 'The chart scales via viewBox; a horizontal scroll wrapper protects small screens.' },
      { title: 'Swap the chart type', text: 'Change the line paths to rect elements for a bar-chart variant using the same data arrays.' },
    ] },
    features: [
      { title: 'Real computed cumulative data', text: 'Monthly line is literally rate times month number.' },
      { title: 'Actual break-even calculation', text: 'A loop finds the true crossover month from the data.' },
      { title: 'Pure SVG, zero libraries', text: 'Path strings generated directly from JS arrays.' },
      { title: 'Nice rounded gridlines', text: 'Y-axis maximum rounds up for clean $ increments.' },
      { title: 'Dashed break-even marker', text: 'Drawn at the exact computed month position.' },
      { title: 'Four derived stat cards', text: 'Totals and savings all calculated, not hardcoded twice.' },
      { title: 'Responsive scroll wrapper', text: 'viewBox scaling with overflow protection on narrow screens.' },
      { title: 'Easy to re-theme as bars', text: 'Swap path elements for rects using the same coordinate functions.' },
    ],
    useCases: [
      { title: 'Pricing page justification', text: 'Show why annual billing actually saves money, plotting cumulative monthly cost against a flat annual price across twelve months.' },
      { title: 'Billing toggle companions', text: 'Pair with a [pricing toggle](/ui-snippets/pricing-toggle/) so the chart explains the break-even month that the toggle\'s discount implies.' },
      { title: 'Sales enablement material', text: 'Give a concrete, computed chart instead of a vague saving claim, with a loop finding the true crossover month from the data.' },
      { title: 'Monthly subscriber nudges', text: 'Show a monthly subscriber their real annual saving, with y-axis maximums rounded up to clean dollar gridlines.' },
      { title: 'SVG chart teaching and finance views', text: 'Learn how path strings are generated from JavaScript arrays with no libraries, and reuse the pattern in finance-facing dashboards.' },
      { icon: 'CODE', title: 'Related: Bundle Savings Card', desc: 'See the [Bundle Savings Card](/ui-snippets/pricing-bundle-savings-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the break-even month a real calculation or a fixed label?', a: 'It is computed at runtime: a loop walks the monthlyLine array (cumulative monthly cost) and returns the first month whose value strictly exceeds ANNUAL_PRICE. With the default $12/month rate and $108 annual price, month 9 totals exactly $108 and month 10 totals $120 — the first month greater than $108 — so the chart correctly marks month 10, not an approximation.' },
      { q: 'Why compare cumulative cost instead of a single bar per month?', a: 'A per-month bar chart would show the annual plan as one large spike in month 1 and nothing afterward, which is technically accurate but obscures the actual trade-off. Cumulative cost shows the monthly plan looking cheaper early on and the annual plan\'s upfront cost paying off once the monthly running total crosses it — the comparison a buyer actually needs to make a decision.' },
      { q: 'How is the SVG chart drawn without a charting library?', a: 'The xFor() and yFor() functions are linear scale functions mapping data values to pixel coordinates within the chart\'s padded area, and pathFor() joins each data point into a standard SVG path d string. This is the same core technique charting libraries use internally — writing it directly keeps this snippet dependency-free.' },
      { q: 'What happens if I change MONTHLY_RATE or ANNUAL_PRICE?', a: 'Every derived value recalculates: both data arrays, the maxY and rounded gridline maximum, the break-even month, all four stat cards, and the SVG path coordinates. Nothing downstream is hardcoded separately, so the chart stays mathematically correct for any rate you set.' },
      { q: 'Can this become a bar chart instead of a line chart?', a: 'Yes — keep monthlyLine, annualLine, xFor(), and yFor() exactly as they are, and replace the two path elements with a set of rect elements per data point (using yFor(value) for the rect\'s y and height), since the scale functions already convert your real data into correct pixel coordinates regardless of which SVG shape renders them.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how monthlyLine and annualLine are computed from MONTHLY_RATE and ANNUAL_PRICE, and how the break-even loop finds the first month where cumulative cost actually crosses the annual price rather than approximating it. It's also a strong candidate to extend — ask it to convert the line chart into a bar chart using the same xFor/yFor scale functions, add a second break-even scenario for a different rate side-by-side, or make MONTHLY_RATE and ANNUAL_PRICE driven by a billing-frequency toggle elsewhere on the page so the chart updates live.`,
      prompt: `Build an "annual vs monthly cost" comparison chart in plain HTML, CSS, and JavaScript, using pure inline SVG with no charting library.

Requirements:
- Define a monthly rate constant and a flat annual price constant as the only hardcoded inputs.
- Compute a 12-point cumulative cost array for the monthly plan (rate multiplied by month number for months 1 through 12) and a 12-point flat array for the annual plan (the same annual price repeated for every month, representing money paid once upfront) — these must be real derived arrays, not hand-placed illustrative values.
- Compute the actual break-even month by finding the first month index where the cumulative monthly cost strictly exceeds the flat annual price, and verify this arithmetic is correct for your chosen constants before finalizing any copy that references a specific month number.
- Render both data series as SVG line paths built by mapping each data point through linear x/y scale functions into a padded chart area, generating the path's d attribute directly from the data arrays (do not hardcode path coordinates).
- Draw horizontal gridlines with dollar-value labels using a "nice" rounded-up maximum, x-axis month labels, and a dashed vertical marker positioned at the exact computed break-even month.
- Below the chart, show four stat cards: the break-even month, the 12-month total cost for each plan, and the total amount saved by paying annually — all four values must be computed from the same data arrays the chart renders, not restated as separate hardcoded numbers.
- Make the chart responsive using an SVG viewBox with a horizontal-scroll wrapper for narrow viewports.`,
    },
  },
};

export default pricingAnnualVsMonthlyChart;
