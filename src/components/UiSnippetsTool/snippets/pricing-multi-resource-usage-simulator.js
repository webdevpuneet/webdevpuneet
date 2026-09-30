const pricingMultiResourceUsageSimulator = {
  id: 'pricing-multi-resource-usage-simulator',
  title: 'Multi-Resource Usage Billing Simulator',
  lastmod: '2026-08-31',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="mru-card">
  <div class="mru-head">
    <h3>Estimate your monthly bill</h3>
    <p>Every resource is billed separately — adjust the sliders to match your workload.</p>
  </div>

  <div class="mru-resources" id="mruResources">
    <div class="mru-resource" data-rate="0.002" data-included="500000">
      <div class="mru-resource-top">
        <span class="mru-resource-name">API requests</span>
        <span class="mru-resource-value"><b id="mruVal0">2,000,000</b>/mo</span>
      </div>
      <input type="range" min="0" max="10000000" step="50000" value="2000000" class="mru-slider" id="mruSlider0">
      <div class="mru-resource-cost">
        <span>500,000 included, then $0.002 / request</span>
        <b id="mruCost0">$3,000.00</b>
      </div>
    </div>

    <div class="mru-resource" data-rate="0.09" data-included="50">
      <div class="mru-resource-top">
        <span class="mru-resource-name">Storage (GB)</span>
        <span class="mru-resource-value"><b id="mruVal1">200</b> GB</span>
      </div>
      <input type="range" min="0" max="2000" step="10" value="200" class="mru-slider" id="mruSlider1">
      <div class="mru-resource-cost">
        <span>50 GB included, then $0.09 / GB</span>
        <b id="mruCost1">$13.50</b>
      </div>
    </div>

    <div class="mru-resource" data-rate="0.12" data-included="100">
      <div class="mru-resource-top">
        <span class="mru-resource-name">Bandwidth (GB)</span>
        <span class="mru-resource-value"><b id="mruVal2">800</b> GB</span>
      </div>
      <input type="range" min="0" max="5000" step="25" value="800" class="mru-slider" id="mruSlider2">
      <div class="mru-resource-cost">
        <span>100 GB included, then $0.12 / GB</span>
        <b id="mruCost2">$84.00</b>
      </div>
    </div>
  </div>

  <div class="mru-summary">
    <div class="mru-base-row">
      <span>Base platform fee</span>
      <b>$29.00</b>
    </div>
    <div class="mru-total-row">
      <span>Estimated monthly total</span>
      <b id="mruTotal">$3,126.50</b>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f5f6fb;display:flex;justify-content:center;padding:40px 20px}

.mru-card{width:min(480px,96vw);background:#fff;border:1px solid #e6e8f2;border-radius:20px;padding:28px;box-shadow:0 20px 50px rgba(20,20,60,.06)}
.mru-head h3{font-size:18px;font-weight:800;color:#181a2a;margin-bottom:6px}
.mru-head p{font-size:13px;color:#7b7f99;line-height:1.5;margin-bottom:24px}

.mru-resources{display:flex;flex-direction:column;gap:22px;margin-bottom:22px}
.mru-resource-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:10px}
.mru-resource-name{font-size:13px;font-weight:700;color:#181a2a}
.mru-resource-value{font-size:12px;color:#9aa0b8;font-weight:600}
.mru-resource-value b{color:#4338ca;font-weight:800}

.mru-slider{width:100%;-webkit-appearance:none;appearance:none;height:6px;border-radius:99px;background:#eceefa;margin-bottom:10px;cursor:pointer}
.mru-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:18px;height:18px;border-radius:50%;background:#4338ca;border:3px solid #fff;box-shadow:0 1px 4px rgba(20,20,60,.3);cursor:pointer}
.mru-slider::-moz-range-thumb{width:18px;height:18px;border-radius:50%;background:#4338ca;border:3px solid #fff;box-shadow:0 1px 4px rgba(20,20,60,.3);cursor:pointer;border:none}

.mru-resource-cost{display:flex;justify-content:space-between;align-items:center;font-size:11.5px;color:#9aa0b8}
.mru-resource-cost b{color:#181a2a;font-size:13px;font-weight:800}

.mru-summary{background:#151726;border-radius:14px;padding:16px 18px}
.mru-base-row{display:flex;justify-content:space-between;font-size:12.5px;color:#a7abcf;font-weight:700;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid rgba(255,255,255,.1)}
.mru-base-row b{color:#fff}
.mru-total-row{display:flex;justify-content:space-between;align-items:center}
.mru-total-row span{font-size:13.5px;color:#fff;font-weight:700}
.mru-total-row b{font-size:21px;color:#a5b4fc;font-weight:800}`,

  js: `// Three resources, each with its own included-free allowance and its own
// overage rate. Every slider only ever affects its own resource's cost line;
// the grand total is re-summed across all three plus a flat base fee on
// every single input event, so nothing can silently fall out of sync.
var BASE_FEE = 29;

var resources = Array.prototype.slice.call(document.querySelectorAll('.mru-resource')).map(function (el, index) {
  return {
    el: el,
    index: index,
    rate: parseFloat(el.getAttribute('data-rate')),
    included: parseFloat(el.getAttribute('data-included')),
    slider: document.getElementById('mruSlider' + index),
    valueEl: document.getElementById('mruVal' + index),
    costEl: document.getElementById('mruCost' + index)
  };
});

var totalEl = document.getElementById('mruTotal');

function formatUnits(value) {
  return Math.round(value).toLocaleString();
}

function formatMoney(value) {
  return '$' + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function costForResource(resource, usage) {
  var billableUnits = Math.max(0, usage - resource.included);
  return billableUnits * resource.rate;
}

function recalc() {
  var grandTotal = BASE_FEE;

  resources.forEach(function (resource) {
    var usage = parseFloat(resource.slider.value);
    var cost = costForResource(resource, usage);

    resource.valueEl.textContent = formatUnits(usage);
    resource.costEl.textContent = formatMoney(cost);

    grandTotal += cost;
  });

  totalEl.textContent = formatMoney(grandTotal);
}

resources.forEach(function (resource) {
  resource.slider.addEventListener('input', recalc);
});

recalc();`,

  seo: {
    title: 'Multi-Resource Usage Billing Simulator — Free HTML CSS JS Snippet',
    description: 'A pricing calculator with independent sliders for API requests, storage, and bandwidth, each with its own included allowance and overage rate, summing to a live estimated bill. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Multi-Resource Usage Billing Simulator — Independent Sliders, One Live Combined Total',
      description: `Real usage-based products rarely bill on a single dimension — infrastructure tools charge separately for compute, storage, and bandwidth, each with its own free allowance and its own overage rate. This calculator models that directly: three independent sliders, each representing a different resource with its own included-free tier and per-unit rate, summing into one live estimated monthly bill alongside a flat base platform fee.

**Each resource is a self-contained object, not three parallel variable sets**

Rather than tracking three separate rate variables, three included variables, and three slider references as loose globals, \`resources\` is built once with \`.map()\` into an array of objects — each bundling its own \`el\`, \`rate\`, \`included\`, \`slider\`, \`valueEl\`, and \`costEl\`. This means adding a fourth resource is purely a matter of adding a fourth \`.mru-resource\` block to the HTML with matching \`data-rate\`/\`data-included\` attributes and IDs; the \`.map()\` construction and every function that follows already operates generically over "however many resources exist."

**The included allowance is subtracted before the rate is ever applied**

\`costForResource()\` computes \`billableUnits = Math.max(0, usage - resource.included)\` before multiplying by the rate — so a resource never bills for its free tier, and the \`Math.max(0, ...)\` guard means a usage value at or below the included allowance always produces exactly $0 for that resource, never a negative charge.

**One \`recalc()\` re-sums everything, every single time**

Just like avoiding a drifting running total in a seat calculator, \`recalc()\` starts fresh from \`BASE_FEE\` on every call and adds each resource's freshly computed cost in a loop — nothing is incrementally adjusted. This guarantees the grand total displayed always exactly equals the sum of what's currently shown on each resource's own cost line, since both are computed from the same pass over the same slider values.

**Rate and included-allowance data live on the markup, not hardcoded in JavaScript**

Each \`.mru-resource\` div carries its own \`data-rate\` and \`data-included\` attributes, read once when \`resources\` is built. This keeps the pricing model's actual numbers visible directly in the HTML rather than buried in a JavaScript array literal disconnected from the resource it describes — useful both for maintainability and for anyone skimming the page source to understand the pricing shown.

**\`toLocaleString\` handles two different formatting jobs**

\`formatUnits()\` rounds and comma-formats a raw usage number (e.g. API request counts, which are always whole numbers), while \`formatMoney()\` uses \`toLocaleString\` with explicit \`minimumFractionDigits\`/\`maximumFractionDigits\` set to 2, guaranteeing every dollar figure always shows exactly two decimal places even when the underlying float happens to compute to a whole number.

**Customizing it**

Add a fourth resource (e.g. "Compute hours") by copying an \`.mru-resource\` block with its own \`data-rate\`/\`data-included\` values and a matching slider/value/cost element ID sequence — the \`.map()\`-built \`resources\` array and \`recalc()\` both already generalize to any number of resource blocks found on the page. Adjust \`BASE_FEE\` to match your actual platform's flat monthly fee, or set it to \`0\` for a purely usage-based model with no base charge.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag any resource slider', text: 'API requests, storage, and bandwidth each recalculate their own cost line independently.' },
        { title: 'Watch the grand total update', text: 'The estimated monthly total re-sums the base fee plus all three resource costs on every slider move.' },
        { title: 'Notice the included allowance', text: 'Usage below each resource\'s included amount contributes nothing to that resource\'s cost.' },
        { title: 'Add a fourth resource', text: 'Copy an .mru-resource block in the HTML panel with its own data-rate and data-included values.' },
        { title: 'Change the base platform fee', text: 'Edit the BASE_FEE constant near the top of the JS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Three independent usage sliders, each modeling a distinct billed resource',
      'Each resource carries its own included-free allowance read from a data-included attribute',
      'Overage cost only applies past the included allowance, never a negative or free-tier charge',
      'Resources built as self-contained objects via .map(), scaling to any number of resource blocks',
      'recalc() re-sums the entire bill from scratch on every slider move, never an incrementally drifting total',
      'Flat base platform fee combined with variable usage costs in one grand total',
      'Money always formatted to exactly two decimal places regardless of the underlying float value',
      'No chart or slider library — native range inputs and plain arithmetic',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Cloud infrastructure and API platform pricing pages', desc: 'Model real multi-dimensional usage billing the way AWS, Twilio, or similar platforms actually charge.' },
      { icon: 'FLOW', title: 'Developer tool and data platform sales pages', desc: 'Pair with the [pricing ROI and breakeven calculator](/ui-snippets/pricing-roi-breakeven-calculator/) for a fuller cost-justification sequence.' },
      { icon: 'FORM', title: 'Usage-based SaaS self-serve estimators', desc: 'Let a prospect model their own realistic workload instead of reading a flat per-unit rate table.' },
      { icon: 'LEARN', title: 'Learn multi-resource billing calculation patterns', desc: 'Study how each resource\'s included allowance and rate combine independently before summing into one total.' },
      { icon: 'DESIGN', title: 'Email, SMS, and communications API pricing pages', desc: 'Reuse the same pattern for sends, storage, and lookups billed at different independent rates.' },
      { icon: 'CODE', title: 'Related: Tiered Usage Pricing Breakdown', desc: 'See the [Tiered Usage Pricing Breakdown](/ui-snippets/pricing-usage-tier-breakdown/) for a single-resource, stepped-tier alternative to this multi-resource model.' },
    ],
    faqs: [
      { q: 'How is each resource\'s cost calculated?', a: 'costForResource() subtracts each resource\'s included allowance from the current slider usage, clamped to a minimum of zero with Math.max(0, usage - resource.included), then multiplies whatever is left by that resource\'s own per-unit rate. Usage at or below the included allowance always produces exactly $0 for that resource.' },
      { q: 'Does moving one slider affect the other resources\' costs?', a: 'No — each resource\'s cost is computed purely from its own rate, its own included allowance, and its own slider value. Moving the API requests slider only changes that resource\'s cost line; the storage and bandwidth lines are unaffected. All three are simply summed together, along with the base fee, into the one grand total.' },
      { q: 'How is the grand total kept accurate as sliders move?', a: 'recalc() starts from BASE_FEE fresh on every single call and loops through every resource, adding each one\'s freshly computed cost. Nothing is incrementally added or subtracted from a previously stored total, so the displayed grand total always exactly matches the sum of what is currently shown on each individual resource cost line.' },
      { q: 'How do I add a fourth billed resource?', a: 'Copy an existing .mru-resource block in the HTML panel, set its own data-rate and data-included attribute values, and give its slider, value display, and cost display elements the next sequential ID number (e.g. mruSlider3, mruVal3, mruCost3). The resources array is built via .map() over every .mru-resource element found on the page, so recalc() picks up the new resource automatically with no further JavaScript changes.' },
      { q: 'Why does formatMoney() use minimumFractionDigits and maximumFractionDigits?', a: 'Setting both to 2 guarantees every dollar figure always displays exactly two decimal places, even when the underlying floating-point calculation happens to land on a whole number like 84 — without that setting, toLocaleString() would sometimes show "$84" and other times "$84.50," which reads as visually inconsistent across resource cost lines.' },
      { q: 'Can I set a resource with no included free allowance?', a: 'Yes — set that resource\'s data-included attribute to "0". Math.max(0, usage - 0) simply equals usage, so the resource bills from the very first unit at its full rate with no free tier subtracted.' },
    ],
    aiPrompt: {
      paragraph: `Rather than working out the multi-resource math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the resources array is built generically from however many .mru-resource elements exist on the page via .map(), and why costForResource() clamps the billable units with Math.max(0, ...) before multiplying by the rate. The same assistant can help you extend it — ask it to add stepped/tiered overage rates per resource (so the rate itself decreases past a second threshold, similar to volume pricing) instead of one flat overage rate, add a small bar chart visualizing each resource's share of the total bill, or persist the slider values to the URL as query parameters so a prospect can share their specific usage estimate. It's also useful for a UX review: ask whether the slider step sizes and max values make sense for a realistic range of customer workloads, or whether a direct numeric input alongside each slider would let power users enter exact figures faster than dragging. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-resource usage billing simulator card in plain HTML, CSS, and vanilla JavaScript — no chart or slider library, native range inputs only.

Requirements:
- Three independently billed resources (e.g. API requests, storage in GB, bandwidth in GB), each rendered as its own block containing a resource name, a live usage value display, a range slider, and a cost line showing that resource's included free allowance, its per-unit overage rate, and its currently computed cost.
- Store each resource's per-unit overage rate and included free allowance as data attributes directly on its container element in the HTML, not as separate values hardcoded only in the JavaScript.
- Build the JavaScript's internal representation of all resources by querying and mapping over however many resource container elements exist in the HTML, so the same code handles three resources or five without being rewritten — do not hardcode three separate variable sets.
- For each resource, compute its cost as only the usage above its included allowance (clamped so usage at or below the allowance always costs exactly $0, never negative) multiplied by its overage rate.
- On every single slider move, recalculate the ENTIRE bill from scratch — a flat base platform fee plus the freshly computed cost of every resource summed together — rather than incrementally adjusting a previously stored total value.
- Moving one resource's slider must only change that resource's own displayed cost and the grand total; it must never affect another resource's displayed cost.
- Format usage numbers with thousands separators and format every dollar amount to always show exactly two decimal places.`,
    },
  },
};

export default pricingMultiResourceUsageSimulator;
