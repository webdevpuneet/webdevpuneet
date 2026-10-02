const usageBasedBillingMeter = {
  id: 'usage-based-billing-meter',
  title: 'Usage-Based Billing Meter',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="ubm-card">
  <div class="ubm-head">
    <div>
      <h3>API calls</h3>
      <p>Current billing cycle · resets in <span id="ubmDays">9</span> days</p>
    </div>
    <span class="ubm-badge" id="ubmBadge">On plan</span>
  </div>

  <div class="ubm-track">
    <div class="ubm-fill" id="ubmFill" style="width:0%"></div>
    <div class="ubm-marker" style="left:100%"></div>
  </div>
  <div class="ubm-row-labels">
    <span id="ubmUsedLabel">0 / 100,000 included</span>
    <span id="ubmPctLabel">0%</span>
  </div>

  <div class="ubm-math">
    <div class="ubm-line">
      <span>Included in plan</span>
      <b id="ubmIncluded">100,000 calls</b>
    </div>
    <div class="ubm-line">
      <span>Used this cycle</span>
      <b id="ubmUsed">0 calls</b>
    </div>
    <div class="ubm-line ubm-overage" id="ubmOverageLine" hidden>
      <span>Overage (<span id="ubmOverageQty">0</span> calls &times; <span id="ubmRate">$0.0008</span>)</span>
      <b id="ubmOverageCost">$0.00</b>
    </div>
    <div class="ubm-line ubm-total">
      <span>Estimated total this cycle</span>
      <b id="ubmTotal">$49.00</b>
    </div>
  </div>

  <div class="ubm-demo">
    <label for="ubmSlider">Simulate usage</label>
    <input type="range" id="ubmSlider" min="0" max="160000" step="1000" value="0" />
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.ubm-card{background:#121826;border:1px solid #202a3d;border-radius:18px;padding:24px;width:100%;max-width:440px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.ubm-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.ubm-head h3{font-size:17px;font-weight:800;color:#f8fafc;letter-spacing:-.01em}
.ubm-head p{font-size:11.5px;color:#7c8aab;margin-top:3px}
.ubm-badge{font-size:10.5px;font-weight:800;padding:5px 11px;border-radius:999px;text-transform:uppercase;letter-spacing:.04em;background:rgba(56,189,248,.15);color:#38bdf8;white-space:nowrap}
.ubm-badge.over{background:rgba(251,146,60,.16);color:#fb923c}

.ubm-track{position:relative;height:12px;background:#1b2436;border-radius:999px;overflow:visible;margin-bottom:8px}
.ubm-fill{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#38bdf8,#818cf8);transition:width .4s cubic-bezier(.4,0,.2,1),background .3s}
.ubm-fill.over{background:linear-gradient(90deg,#fb923c,#f87171)}
.ubm-marker{position:absolute;top:-4px;width:2px;height:20px;background:#3a4661;border-radius:2px}
.ubm-row-labels{display:flex;justify-content:space-between;font-size:11.5px;color:#8b97b7;margin-bottom:20px;font-variant-numeric:tabular-nums}
#ubmPctLabel{font-weight:700;color:#c7d0e6}

.ubm-math{display:flex;flex-direction:column;gap:9px;padding:14px 16px;background:#0e1420;border:1px solid #1c2540;border-radius:12px}
.ubm-line{display:flex;align-items:baseline;justify-content:space-between;font-size:12.5px;color:#8b97b7}
.ubm-line b{color:#e5eaf5;font-weight:700;font-variant-numeric:tabular-nums}
.ubm-overage[hidden]{display:none}
.ubm-overage span{color:#fdba74}
.ubm-overage b{color:#fb923c}
.ubm-total{padding-top:9px;border-top:1px dashed #232e49;font-size:13.5px;color:#c7d0e6;font-weight:700}
.ubm-total b{color:#38bdf8;font-size:15px}
.ubm-total.over b{color:#fb923c}

.ubm-demo{margin-top:20px;display:flex;flex-direction:column;gap:8px}
.ubm-demo label{font-size:11px;color:#647089;text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.ubm-demo input[type="range"]{width:100%;accent-color:#38bdf8;cursor:pointer}`,

  js: `var INCLUDED = 100000;
var RATE = 0.0008; // $ per call over the included allowance
var BASE_PRICE = 49; // monthly plan base price
var CYCLE_DAYS = 30;
var DAYS_REMAINING = 9;

var fillEl = document.getElementById('ubmFill');
var badgeEl = document.getElementById('ubmBadge');
var usedLabelEl = document.getElementById('ubmUsedLabel');
var pctLabelEl = document.getElementById('ubmPctLabel');
var includedEl = document.getElementById('ubmIncluded');
var usedEl = document.getElementById('ubmUsed');
var overageLine = document.getElementById('ubmOverageLine');
var overageQtyEl = document.getElementById('ubmOverageQty');
var overageCostEl = document.getElementById('ubmOverageCost');
var totalEl = document.getElementById('ubmTotal');
var daysEl = document.getElementById('ubmDays');
var slider = document.getElementById('ubmSlider');

function fmtInt(n) {
  return Math.round(n).toLocaleString();
}
function fmtMoney(n) {
  return '$' + n.toFixed(2);
}

function render(used) {
  var pct = Math.min(100, (used / INCLUDED) * 100);
  var isOver = used > INCLUDED;
  var overageQty = isOver ? used - INCLUDED : 0;
  var overageCost = overageQty * RATE;
  var total = BASE_PRICE + overageCost;

  fillEl.style.width = pct + '%';
  fillEl.className = 'ubm-fill' + (isOver ? ' over' : '');
  badgeEl.textContent = isOver ? 'Over allowance' : 'On plan';
  badgeEl.className = 'ubm-badge' + (isOver ? ' over' : '');

  usedLabelEl.textContent = fmtInt(used) + ' / ' + fmtInt(INCLUDED) + ' included';
  pctLabelEl.textContent = Math.round(pct) + '%';

  includedEl.textContent = fmtInt(INCLUDED) + ' calls';
  usedEl.textContent = fmtInt(used) + ' calls';

  if (isOver) {
    overageLine.hidden = false;
    overageQtyEl.textContent = fmtInt(overageQty);
    overageCostEl.textContent = fmtMoney(overageCost);
  } else {
    overageLine.hidden = true;
  }

  totalEl.textContent = fmtMoney(total);
  totalEl.parentElement.className = 'ubm-line ubm-total' + (isOver ? ' over' : '');
  daysEl.textContent = DAYS_REMAINING;
}

slider.addEventListener('input', function () {
  render(Number(slider.value));
});

// Start on a realistic mid-cycle value so both the normal and overage math are visible on load.
slider.value = 62000;
render(62000);`,

  seo: {
    title: 'Usage-Based Billing Meter — Free Metered SaaS Usage Widget (HTML/CSS/JS)',
    description: `A metered-usage widget showing allowance consumed this cycle, live overage cost math once you cross 100%, and an estimated total. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Usage-Based Billing Meter — Show the Overage Math, Not Just a Bar',
      description: `Usage-based SaaS pricing — pay for what you use above an included allowance — is everywhere in API platforms, storage products, and infrastructure tools, but it creates a specific UX problem: a plain progress bar tells a customer they're "at 86%" without telling them what that means in dollars. This snippet builds a metered-usage widget in plain HTML, CSS, and vanilla JavaScript that shows the actual cost math — included allowance, units used, the per-unit overage rate, and a running estimated total — so a customer never gets a billing surprise.

**A bar that means something**

The track fills toward the included allowance and is visually capped at 100%, with a subtle marker showing exactly where the allowance line sits. Once usage crosses that line, the fill and the status badge shift from blue to orange — a single \`isOver\` boolean in \`render()\` drives both, so the color story is always consistent with the numbers underneath.

**Overage math shown, not hidden**

Below the bar, a breakdown lists the included allowance, the units used, and — only once usage exceeds the allowance — an overage line that spells out the exact arithmetic: the number of units over allowance multiplied by the per-unit rate, equalling the overage cost. That overage line is entirely hidden while usage is within the plan, so the widget stays clean for the common case and only surfaces complexity when it's actually relevant.

**One render function, one source of truth**

Everything — the fill width, the badge, the used/included labels, the overage line, and the estimated total — is computed inside a single \`render(used)\` function from three constants: the included allowance, the overage rate, and the base plan price. There's no way for the bar to say one thing and the cost summary to say another, because both come from the same \`used\` number on every call. The demo slider exists only to let you see every state; in production you'd call \`render()\` with a real usage count from your metering pipeline.

**Estimated total, not a guess**

The "estimated total this cycle" line is simply base price plus overage cost — real math a finance-conscious customer can verify by hand, which is exactly what builds trust in metered billing. Pair it with a [quota usage meter](/ui-snippets/quota-usage-meter/) for hard-limit resources, an [invoice preview](/ui-snippets/invoice-preview/) for the eventual bill, or a [usage calculator](/ui-snippets/usage-calculator/) so prospects can estimate cost before they sign up.

**Customizing it**

Swap the resource (storage GB, compute minutes, seats-with-overage), change the overage rate or add tiered overage pricing (different rates per band), or wire the days-remaining note to a real billing-cycle end date. Because the math lives in one function, extending it to tiered rates is a matter of replacing the single multiplication with a small loop over rate bands.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An "API calls" usage card renders mid-cycle with the bar under the allowance.` },
      { title: 'Drag the demo slider', text: `Simulated usage moves from 0 up to 160,000 calls.` },
      { title: 'Watch it cross 100%', text: `Past the included allowance the bar and badge turn orange.` },
      { title: 'Read the overage line', text: `It appears only once over allowance, showing qty × rate = cost.` },
      { title: 'Check the estimated total', text: `Base price plus overage cost updates live at the bottom.` },
      { title: 'Wire up real data', text: `Replace the slider with a call to render(realUsageCount) from your metering API.` },
    ] },
    features: [
      { title: 'Capped allowance bar', text: `Fill visually stops at 100% of the included allowance with a clear marker.` },
      { title: 'Live overage math', text: `Once over allowance, shows exact units × rate = overage cost.` },
      { title: 'Hidden until relevant', text: `The overage breakdown only renders when usage actually exceeds the plan.` },
      { title: 'Estimated total', text: `Base price plus overage recomputes on every usage change.` },
      { title: 'Color-coded status', text: `Badge and fill shift from on-plan blue to over-allowance orange together.` },
      { title: 'Single render() function', text: `Bar, labels, math, and badge are all derived from one used value.` },
      { title: 'Days-remaining context', text: `Shows how much of the billing cycle is left alongside usage.` },
      { title: 'Formatted numbers', text: `Thousands separators and two-decimal currency throughout.` },
    ],
    useCases: [
      { title: 'API platform usage pages', text: 'Show requests consumed against an included allowance, with the bar capping visually at 100% before an overage breakdown appears.' },
      { title: 'Storage and compute billing', text: 'Meter gigabytes or compute hours, showing exact units multiplied by rate so customers understand how overage cost is calculated.' },
      { title: 'Estimated invoice previews', text: 'Pair with an [invoice preview](/ui-snippets/invoice-preview/) so the estimated total on the meter matches what will appear on the bill.' },
      { title: 'Pricing pages with calculators', text: 'Combine with a [usage calculator](/ui-snippets/usage-calculator/) on a pricing page so prospects can model their expected costs before they sign up.' },
      { title: 'Fewer billing support tickets', text: 'Reduce surprise charges by revealing overage only when it applies, and recompute base plus overage live as usage changes.' },
    ],
    faqs: [
      { q: 'How is the overage cost calculated?', a: `Overage quantity is usage minus the included allowance (only when usage exceeds it), and overage cost is that quantity multiplied by a fixed per-unit rate. The estimated total is the base plan price plus overage cost. All three values are computed inside render() from the same used number, so the bar, the badge, and the cost math can never disagree.` },
      { q: 'Why does the overage line stay hidden below 100%?', a: `Showing overage math for a customer who is comfortably within their plan adds noise without adding information. The line is toggled via the isOver boolean and only renders once usage actually exceeds the included allowance, keeping the widget clean for the common case.` },
      { q: 'How would I add tiered overage pricing?', a: `Replace the single overageQty * RATE multiplication with a small loop over an array of rate bands (e.g. the next 50,000 units at one rate, everything beyond at a lower rate), summing each band's contribution. The rest of the widget — the bar, badge, and total — doesn't need to change since it just reads the resulting overageCost.` },
      { q: 'Can this track multiple resources at once?', a: `Yes — wrap the markup and render() call in a loop over an array of resource configs (each with its own included allowance, rate, and used value), similar to how a [quota usage meter](/ui-snippets/quota-usage-meter/) renders multiple rows from one dataset.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep INCLUDED, RATE, and BASE_PRICE as props or constants, and derive pct, isOver, overageQty, overageCost, and total with useMemo (React) or a computed property (Vue) from the used value. The CSS classes for the over-allowance state port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the overage math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how a single render(used) call derives the fill width, the on-plan/over-allowance badge state, the conditional overage line, and the estimated total from three constants — the included allowance, the per-unit overage rate, and the base plan price — so you can see why all four pieces of UI can never contradict each other. The same assistant can help you extend it: ask how to add tiered overage pricing with multiple rate bands instead of one flat rate, how to animate the transition when the bar crosses the allowance marker, or how to wire the days-remaining note to a real billing-cycle end date rather than a hardcoded number. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "usage-based billing meter" widget in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Track one metered resource (e.g. API calls) with three constants: an included monthly allowance, a base plan price, and a per-unit overage rate charged only above that allowance.
- Render a horizontal progress bar whose fill is visually capped at 100% of the included allowance, with a small marker showing exactly where that allowance boundary sits.
- Below the bar, show a breakdown with the included allowance, the units used this cycle, and — only when usage exceeds the allowance — an overage line spelling out the exact arithmetic (overage units × rate = overage cost).
- Compute an "estimated total this cycle" as base price plus overage cost, and make sure it updates live.
- Drive the bar color and a status badge (e.g. "On plan" vs "Over allowance") from the same over-allowance boolean so they never disagree with the cost breakdown.
- Add a demo range input that simulates usage from 0 up through well past the allowance, calling one render(used) function on input so every part of the widget — bar, badge, breakdown, and total — recomputes from that single number.
- Format large numbers with thousands separators and money values to two decimal places.`,
    },
  },
};

export default usageBasedBillingMeter;
