const pricingUsageTierBreakdown = {
  id: 'pricing-usage-tier-breakdown',
  title: 'Tiered Usage Pricing Breakdown',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="utb-card">
  <div class="utb-head">
    <h3>Estimate your usage cost</h3>
    <p>Pricing steps down as your usage grows</p>
  </div>

  <div class="utb-input-row">
    <label for="utbUnits">Units per month</label>
    <span class="utb-input-value" id="utbUnitsValue">10,000</span>
  </div>
  <input type="range" id="utbUnits" min="0" max="80000" step="500" value="10000" />

  <ul class="utb-tiers" id="utbTiers">
    <li class="utb-tier" data-from="0" data-to="1000" data-rate="0">
      <div class="utb-tier-info">
        <span class="utb-tier-range">Units 1 &ndash; 1,000</span>
        <span class="utb-tier-rate">Free</span>
      </div>
      <div class="utb-tier-bar"><div class="utb-tier-fill"></div></div>
      <b class="utb-tier-cost">$0.00</b>
    </li>
    <li class="utb-tier" data-from="1000" data-to="5000" data-rate="0.01">
      <div class="utb-tier-info">
        <span class="utb-tier-range">Units 1,001 &ndash; 5,000</span>
        <span class="utb-tier-rate">$0.01 / unit</span>
      </div>
      <div class="utb-tier-bar"><div class="utb-tier-fill"></div></div>
      <b class="utb-tier-cost">$0.00</b>
    </li>
    <li class="utb-tier" data-from="5000" data-to="50000" data-rate="0.008">
      <div class="utb-tier-info">
        <span class="utb-tier-range">Units 5,001 &ndash; 50,000</span>
        <span class="utb-tier-rate">$0.008 / unit</span>
      </div>
      <div class="utb-tier-bar"><div class="utb-tier-fill"></div></div>
      <b class="utb-tier-cost">$0.00</b>
    </li>
    <li class="utb-tier" data-from="50000" data-to="Infinity" data-rate="0.006">
      <div class="utb-tier-info">
        <span class="utb-tier-range">Units 50,001+</span>
        <span class="utb-tier-rate">$0.006 / unit</span>
      </div>
      <div class="utb-tier-bar"><div class="utb-tier-fill"></div></div>
      <b class="utb-tier-cost">$0.00</b>
    </li>
  </ul>

  <div class="utb-total">
    <span>Estimated monthly cost</span>
    <div class="utb-total-right">
      <b id="utbTotal">$0.00</b>
      <small id="utbBlended">$0.000 / unit blended</small>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e0d;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.utb-card{background:#101715;border:1px solid #1f2f2a;border-radius:18px;padding:24px;width:100%;max-width:460px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.utb-head h3{font-size:18px;font-weight:800;color:#f0faf5}
.utb-head p{font-size:12px;color:#7c9488;margin-top:4px;margin-bottom:18px}

.utb-input-row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:8px}
.utb-input-row label{font-size:11.5px;text-transform:uppercase;letter-spacing:.04em;color:#65806f;font-weight:700}
.utb-input-value{font-size:19px;font-weight:800;color:#f0faf5;font-variant-numeric:tabular-nums}
#utbUnits{width:100%;accent-color:#22c58d;cursor:pointer;margin-bottom:20px}

.utb-tiers{list-style:none;display:flex;flex-direction:column;gap:11px;margin-bottom:18px}
.utb-tier{display:grid;grid-template-columns:1fr;gap:6px}
.utb-tier-info{display:flex;align-items:baseline;justify-content:space-between}
.utb-tier-range{font-size:12px;color:#a9c2b4;font-weight:600}
.utb-tier-rate{font-size:10.5px;color:#5f7a6a}
.utb-tier-bar{position:relative;height:8px;border-radius:99px;background:#182420;overflow:hidden}
.utb-tier-fill{position:absolute;inset:0;width:0%;background:linear-gradient(90deg,#1fae6a,#22c58d);border-radius:99px;transition:width .25s ease}
.utb-tier-cost{align-self:flex-end;font-size:12.5px;color:#e6f5ec;font-weight:700;font-variant-numeric:tabular-nums;text-align:right}

.utb-total{display:flex;align-items:center;justify-content:space-between;padding:14px 15px;background:#0c1310;border:1px solid #1f2f2a;border-radius:12px}
.utb-total span{font-size:12.5px;color:#7c9488;font-weight:600}
.utb-total-right{display:flex;flex-direction:column;align-items:flex-end;gap:2px}
.utb-total-right b{font-size:20px;font-weight:800;color:#22c58d;font-variant-numeric:tabular-nums}
.utb-total-right small{font-size:10px;color:#5a7268}`,

  js: `var slider = document.getElementById('utbUnits');
var unitsValueEl = document.getElementById('utbUnitsValue');
var tierEls = Array.prototype.slice.call(document.querySelectorAll('.utb-tier'));
var totalEl = document.getElementById('utbTotal');
var blendedEl = document.getElementById('utbBlended');

function fmtInt(n) {
  return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
}
function fmtMoney(n) {
  return '$' + n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Real tiered/blended pricing: usage is consumed tier by tier, cheapest
// tiers first, and only the units that actually fall in a tier are billed
// at that tier's rate.
function render() {
  var units = Number(slider.value);
  unitsValueEl.textContent = fmtInt(units);

  var total = 0;

  tierEls.forEach(function (tierEl) {
    var from = Number(tierEl.dataset.from);
    var toRaw = tierEl.dataset.to;
    var to = toRaw === 'Infinity' ? Infinity : Number(toRaw);
    var rate = Number(tierEl.dataset.rate);
    var tierSize = to === Infinity ? null : to - from;

    var unitsInTier = Math.max(0, Math.min(units, to) - from);
    var tierCost = unitsInTier * rate;
    total += tierCost;

    var fillPct = tierSize ? Math.min(100, (unitsInTier / tierSize) * 100) : (unitsInTier > 0 ? 100 : 0);

    tierEl.querySelector('.utb-tier-fill').style.width = fillPct + '%';
    tierEl.querySelector('.utb-tier-cost').textContent = fmtMoney(tierCost);
  });

  totalEl.textContent = fmtMoney(total);
  var blended = units > 0 ? total / units : 0;
  blendedEl.textContent = '$' + blended.toFixed(4) + ' / unit blended';
}

slider.addEventListener('input', render);
render();`,

  seo: {
    title: 'Tiered Usage Pricing Breakdown — Free Stepped Cost Calculator (HTML/CSS/JS)',
    description: `A stepped usage-based pricing breakdown that blends real per-tier rates as a units slider moves — free tier, then two paid tiers, computed correctly. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Tiered Usage Pricing Breakdown — Real Blended Cost Across Pricing Steps',
      description: `Usage-based pricing pages often show tiers as a static table and leave the actual math to the customer — this snippet does the math for them. It renders a free tier followed by two paid tiers, each with its own per-unit rate, and a units slider that computes the real blended cost by consuming usage tier by tier, exactly the way metered billing actually works.

**Tier-by-tier consumption, not a flat rate**

The pricing has four steps: units 1–1,000 are free, units 1,001–5,000 cost $0.01 each, units 5,001–50,000 cost $0.008 each, and units beyond 50,000 cost $0.006 each. \`render()\` computes, for each tier, exactly how many of the total units fall inside that tier's \`[from, to)\` range with \`Math.max(0, Math.min(units, to) - from)\`, multiplies only that slice by the tier's rate, and sums the four tier costs — never applying one tier's rate to the whole usage figure.

**Verified at three usage levels**

At 10,000 units (the default): 1,000 are free, the next 4,000 cost $0.01 × 4,000 = $40, and the remaining 5,000 fall in the third tier at $0.008 × 5,000 = $40 — a total of $80.00, a blended rate of $80 ÷ 10,000 = $0.008/unit. At 50,000 units: $0 + (4,000 × $0.01 = $40) + (45,000 × $0.008 = $360) = $400.00. At 60,000 units: $0 + $40 + $360 + (10,000 × $0.006 = $60) = $460.00. Each total was computed the same tier-by-tier way the live widget computes it — the blended rate keeps dropping as usage grows, because more of the total lands in cheaper tiers.

**A visual stepped bar per tier**

Each tier row has its own fill bar showing how "full" that tier is relative to its own size — a tier shows 0% until usage reaches its starting point, fills toward 100% as usage passes through it, and stays at 100% once usage has moved past it into the next tier. The final open-ended tier fills to 100% the moment any usage lands in it, since it has no upper bound to measure against.

**One blended number to anchor on**

Beyond the itemized breakdown, a "blended $/unit" figure divides the total cost by total units — the single number that answers "what am I actually paying per unit, on average," which is always somewhere between the tiers' individual rates and drops as usage grows into cheaper tiers.

**Where it fits**

Pair it with a [usage calculator](/ui-snippets/usage-calculator/) for a simpler flat-rate estimate, place it next to a [pricing card](/ui-snippets/pricing-card/) for a metered add-on, or route the estimate into a [roi calculator](/ui-snippets/roi-calculator/) to show cost-per-outcome.

**Customizing it**

Add more tiers, change the rates or breakpoints, or add a currency toggle. The tier-consumption math generalizes to any number of \`[from, to, rate]\` steps without changing the core loop.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `At 10,000 units the total renders as $80.00.` },
      { title: 'Drag the units slider', text: `Each tier's bar fills and its own cost updates live.` },
      { title: 'Watch the blended rate', text: `$/unit blended drops as usage grows into cheaper tiers.` },
      { title: 'Push past 50,000 units', text: `The fourth open-ended tier starts billing at $0.006/unit.` },
      { title: 'Verify a total by hand', text: `At 60,000 units: $0 + $40 + $360 + $60 = $460.00.` },
      { title: 'Wire up real tiers', text: `Edit each tier's data-from, data-to, and data-rate.` },
    ] },
    features: [
      { title: 'True tiered consumption', text: `Each tier bills only the units that actually fall inside it.` },
      { title: 'Four-step pricing', text: `A free tier plus two capped paid tiers plus an open-ended one.` },
      { title: 'Live blended rate', text: `Total cost divided by total units, updating with the slider.` },
      { title: 'Per-tier fill bars', text: `A visual gauge of how full each tier is relative to its size.` },
      { title: 'Open-ended final tier', text: `Handles Infinity as an upper bound without special-casing display.` },
      { title: 'Verified example totals', text: `10k, 50k, and 60k unit totals hand-checked against the formula.` },
      { title: 'Data-attribute tiers', text: `Add or edit tiers by changing from/to/rate on a list item.` },
      { title: 'Framework-agnostic core', text: `The tier-consumption loop is pure and ports to any state model.` },
    ],
    useCases: [
      { title: 'API and metered billing', text: 'Show the real cost of API calls or storage, billing only the units that fall inside each tier as a slider moves.' },
      { title: 'Usage-based SaaS pricing', text: 'Pair with a [usage calculator](/ui-snippets/usage-calculator/) so a free tier and two paid tiers combine into one blended per-unit rate.' },
      { title: 'Add-on cost estimation', text: 'Sit beside a [pricing card](/ui-snippets/pricing-card/) for a metered extra, with per-tier fill bars showing how full each tier is relative to its size.' },
      { title: 'Cost-benefit pages', text: 'Feed the computed total into an [ROI calculator](/ui-snippets/roi-calculator/) to weigh the spend against the value gained.' },
      { title: 'Enterprise volume pricing', text: 'Show how per-unit cost falls at higher volumes, or let a buyer\'s finance team model costs at different usage levels, as in [enterprise pricing](/ui-snippets/enterprise-pricing/).' },
      { icon: 'CODE', title: 'Related: Plan Downgrade Warning Card — Feature Loss Preview', desc: 'See the [Plan Downgrade Warning Card — Feature Loss Preview](/ui-snippets/pricing-plan-downgrade-warning-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the total cost actually computed?', a: `For each tier, the code computes exactly how many units fall inside that tier's from-to range with Math.max(0, Math.min(units, to) - from), multiplies only that slice by the tier's own rate, and sums the four resulting tier costs. No tier's rate is ever applied to units outside its own range — this is the same tier-by-tier consumption real metered billing uses.` },
      { q: 'Can you verify the numbers for 10,000 units?', a: `Yes. The first 1,000 units are free ($0). The next 4,000 units (1,001–5,000) cost $0.01 each, so $40. The remaining 5,000 units (5,001–10,000) fall in the $0.008/unit tier, so another $40. Total: $0 + $40 + $40 = $80.00, matching what the widget shows at the default 10,000-unit position.` },
      { q: 'Why does the blended rate change as usage grows?', a: `The blended rate is total cost divided by total units. At 10,000 units it's $80 / 10,000 = $0.008/unit. At 60,000 units it's $460 / 60,000 ≈ $0.0077/unit — slightly lower, because a larger share of total usage falls into the cheaper $0.006 and $0.008 tiers rather than the free or $0.01 tiers, pulling the average down.` },
      { q: 'How does the open-ended final tier work without an upper bound?', a: `Its data-to attribute is the string "Infinity", which the script converts to the actual Infinity value, so Math.min(units, Infinity) always resolves to units itself — meaning any usage above 50,000 is fully counted in that tier at $0.006/unit. Its fill bar has no tierSize to measure against, so it simply shows 100% once any usage reaches it.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Model tiers as an array of {from, to, rate} objects (using Infinity for the last tier's to) in state or a constant. Derive each tier's units-in-tier, cost, and fill percentage with a memoized loop identical to the one here, and the total and blended rate as further derived values — the math needs no DOM access at all.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive tiered billing math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how Math.max(0, Math.min(units, to) - from) isolates only the units that fall inside one tier's range, why that formula correctly returns zero for tiers usage hasn't reached yet and the full tier size for tiers usage has completely passed through, and how summing each tier's own cost produces a true blended total rather than applying one flat rate to all units. The same assistant can help you verify the math further — ask it to compute the total for a usage figure you pick and confirm it matches manual tier-by-tier arithmetic — or extend the widget: ask how to add a fifth tier, how to let someone type an exact unit count instead of only dragging a slider, or how to add a monthly-cost-forecast chart across a range of possible usage levels. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "tiered usage pricing breakdown" widget in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Define at least four pricing tiers as data (a from-unit, a to-unit or an open-ended/infinite upper bound for the last tier, and a per-unit rate), including one free tier and one open-ended final tier billed at the lowest rate.
- Add a units input (a range slider is fine) that lets the user pick a total monthly usage amount.
- For each tier, compute the number of units from the total usage that actually fall inside that specific tier's range — not the whole usage total — using a formula equivalent to clamping (min(units, tierTo) - tierFrom) to a minimum of zero, then multiply only that amount by the tier's own rate to get that tier's cost.
- Sum every tier's individual cost to produce the true total, and also compute and display a "blended" per-unit rate (total cost divided by total units) so the user has one summary number alongside the itemized breakdown.
- Give each tier a visual fill bar showing how full that tier is relative to its own size (0% before usage reaches it, proportionally filling as usage passes through it, 100% once usage has moved beyond it) — the open-ended final tier should just show 0% or 100% since it has no fixed size.
- Before finalizing, manually verify the total at three different usage levels against your own tier rates and breakpoints, confirming each tier's contribution and the summed total are arithmetically correct — do not use a flat "usage × single rate" shortcut anywhere.`,
    },
  },
};

export default pricingUsageTierBreakdown;
