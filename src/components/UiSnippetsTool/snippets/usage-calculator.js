const usageCalculator = {
  id: 'usage-calculator',
  title: 'Usage Pricing Calculator',
  category: 'pricing',
  html: `<div class="calc-wrap">
  <div class="calc-card">
    <div class="calc-header">
      <h2>Estimate your cost</h2>
      <p>Drag the sliders to match your expected usage</p>
    </div>

    <div class="sliders">
      <div class="slider-row">
        <div class="slider-meta">
          <span class="slider-name">API calls / month</span>
          <span class="slider-val" id="v-api">50,000</span>
        </div>
        <input type="range" id="s-api" min="0" max="10" value="5" oninput="calc()">
        <div class="tick-row">
          <span>0</span><span>100k</span><span>500k</span><span>1M</span><span>5M</span><span>10M</span>
        </div>
      </div>

      <div class="slider-row">
        <div class="slider-meta">
          <span class="slider-name">Storage (GB)</span>
          <span class="slider-val" id="v-storage">25 GB</span>
        </div>
        <input type="range" id="s-storage" min="0" max="10" value="5" oninput="calc()">
        <div class="tick-row">
          <span>0</span><span>10</span><span>50</span><span>100</span><span>250</span><span>500</span>
        </div>
      </div>

      <div class="slider-row">
        <div class="slider-meta">
          <span class="slider-name">Team seats</span>
          <span class="slider-val" id="v-seats">5 seats</span>
        </div>
        <input type="range" id="s-seats" min="1" max="50" value="5" oninput="calc()">
        <div class="tick-row">
          <span>1</span><span>10</span><span>25</span><span>50</span>
        </div>
      </div>
    </div>

    <div class="breakdown">
      <div class="b-row"><span>API calls</span><span id="c-api">$2.50</span></div>
      <div class="b-row"><span>Storage</span><span id="c-storage">$1.25</span></div>
      <div class="b-row"><span>Team seats</span><span id="c-seats">$25.00</span></div>
      <div class="b-row total"><span>Estimated monthly</span><span id="c-total">$28.75</span></div>
    </div>

    <div class="cta-row">
      <a href="#" class="btn-primary">Get started free</a>
      <p class="cta-note">Includes $10 free credit every month</p>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.calc-wrap { width: 100%; max-width: 560px; }

.calc-card { background: #fff; border-radius: 24px; padding: 36px; box-shadow: 0 8px 40px rgba(0,0,0,0.08); display: flex; flex-direction: column; gap: 28px; }

.calc-header h2 { font-size: 22px; font-weight: 800; color: #1e293b; }
.calc-header p  { font-size: 13px; color: #64748b; margin-top: 4px; }

.sliders { display: flex; flex-direction: column; gap: 20px; }

.slider-row { display: flex; flex-direction: column; gap: 6px; }
.slider-meta { display: flex; justify-content: space-between; align-items: center; }
.slider-name { font-size: 13px; font-weight: 600; color: #374151; }
.slider-val  { font-size: 13px; font-weight: 700; color: #6366f1; background: rgba(99,102,241,0.08); padding: 2px 10px; border-radius: 20px; }

input[type=range] { -webkit-appearance: none; width: 100%; height: 4px; border-radius: 4px; background: #e2e8f0; outline: none; cursor: pointer; }
input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #6366f1; cursor: pointer; box-shadow: 0 0 0 3px rgba(99,102,241,0.2); }
input[type=range]::-moz-range-thumb { width: 18px; height: 18px; border-radius: 50%; background: #6366f1; cursor: pointer; border: none; }

.tick-row { display: flex; justify-content: space-between; }
.tick-row span { font-size: 10px; color: #94a3b8; }

.breakdown { display: flex; flex-direction: column; gap: 0; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; }
.b-row { display: flex; justify-content: space-between; padding: 11px 16px; font-size: 13px; color: #475569; border-bottom: 1px solid #f1f5f9; }
.b-row:last-child { border-bottom: none; }
.b-row.total { background: #f8fafc; font-weight: 700; color: #1e293b; font-size: 15px; }
.b-row.total span:last-child { color: #6366f1; font-size: 18px; }

.cta-row { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.btn-primary { display: block; background: #6366f1; color: #fff; font-size: 15px; font-weight: 700; padding: 13px 36px; border-radius: 12px; text-decoration: none; text-align: center; width: 100%; transition: background 0.15s; }
.btn-primary:hover { background: #4f46e5; }
.cta-note { font-size: 12px; color: #94a3b8; }`,
  js: `// API: tiered per 1000 calls
const apiTiers = [0,1000,5000,10000,25000,50000,100000,250000,500000,1000000,5000000];
const apiRate  = 0.05; // per 1000

// Storage: linear per GB
const storageTicks = [0,1,2,5,10,25,50,100,250,500];

// Seats: flat per seat
const seatRate = 5; // per seat/mo

function fmt(n) {
  return n >= 1000000 ? (n/1000000).toFixed(1)+'M' : n >= 1000 ? (n/1000)+'k' : n+'';
}
function fmtGB(i) {
  const steps = [0,1,2,5,10,25,50,100,250,500];
  const v = steps[Math.round(i * (steps.length-1) / 10)];
  return v === 0 ? '0 GB' : v + ' GB';
}
function fmtPrice(n) { return '$' + n.toFixed(2); }

function calc() {
  const apiIdx     = +document.getElementById('s-api').value;
  const storIdx    = +document.getElementById('s-storage').value;
  const seats      = +document.getElementById('s-seats').value;

  const apiCalls   = apiTiers[apiIdx];
  const storageGB  = storageTicks[Math.round(storIdx * (storageTicks.length-1) / 10)];

  const apiCost     = (apiCalls / 1000) * apiRate;
  const storageCost = storageGB * 0.05;
  const seatCost    = seats * seatRate;
  const total       = apiCost + storageCost + seatCost;

  document.getElementById('v-api').textContent     = fmt(apiCalls);
  document.getElementById('v-storage').textContent = fmtGB(storIdx);
  document.getElementById('v-seats').textContent   = seats + ' seat' + (seats > 1 ? 's' : '');

  document.getElementById('c-api').textContent     = fmtPrice(apiCost);
  document.getElementById('c-storage').textContent = fmtPrice(storageCost);
  document.getElementById('c-seats').textContent   = fmtPrice(seatCost);
  document.getElementById('c-total').textContent   = fmtPrice(total);
}

calc();`,

  seo: {
    title: 'Usage Pricing Calculator — Free HTML CSS JS Snippet',
    description: 'Slider-driven cost estimator for API calls, storage and seats with live per-line breakdown and total. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Usage Pricing Calculator — Interactive Sliders, Non-Linear Scale & Live Cost Breakdown',
      description: `If you need a pricing calculator that lets users estimate their bill before signing up, this snippet gives you a complete interactive cost estimator with three sliders, a live per-line cost breakdown, and a call-to-action — all in plain HTML, CSS, and vanilla JavaScript.

**Why usage-based pricing needs an interactive calculator**

Flat-rate pricing is easy to read. Usage-based pricing is not. When you charge per API call, per gigabyte, and per seat, a static [pricing table](/ui-snippets/pricing-page/) cannot give users a personalised estimate. An interactive slider calculator solves this: the user sets their expected usage, the page shows their exact monthly cost, and price anxiety disappears before they click the CTA.

**How the non-linear slider values work**

The API calls slider covers a huge range — from 0 to 5 million calls per month. A standard linear range input cannot handle this: dragging 1mm would jump from 0 to 500k calls. Instead, the apiTiers array holds real-world usage tiers: [0, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000]. The slider value (0–10) is used as a direct array index. Each step covers a meaningful usage tier rather than a linear percentage. The storageTicks array uses the same technique for storage: [0, 1, 2, 5, 10, 25, 50, 100, 250, 500] GB, mapped from a 0–10 slider via index rounding.

**How the live cost calculation works**

On every oninput event, calc() reads all three slider values, looks up the API and storage amounts from the lookup arrays, applies the flat rates (apiRate = $0.05 per 1000 calls, storage = $0.05/GB, seatRate = $5/seat), and updates all displayed values simultaneously: the value chip above each slider, each per-line cost in the breakdown, and the grand total. The fmt() function formats large numbers as k/M suffixes. fmtPrice() always shows two decimal places.

**Custom styled range inputs**

The default browser range input looks inconsistent across browsers. This snippet styles the track as a 4px rounded bar in a neutral grey, and the thumb as an 18px indigo circle with a soft glow ring (-webkit-slider-thumb and ::-moz-range-thumb pseudo-elements). This gives a consistent branded appearance in Chrome, Firefox, and Safari with no JavaScript.

**Adapting the calculator to your pricing model**

Edit apiRate, the storage rate, and seatRate at the top of the JS to match your actual pricing. Swap apiTiers for any lookup array that matches your usage bands — compute instances, bandwidth tiers, message counts, or request buckets. Add more slider rows by duplicating a .slider-row in HTML and adding a new dimension to calc(). The breakdown updates automatically.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Drag the sliders', text: 'Move any slider left or right to see the value chip update above the slider and the cost breakdown update below. All three dimensions update independently.' },
      { title: 'Update pricing rates', text: 'In the JS panel, change apiRate (cost per 1000 API calls), the inline storage rate (0.05 per GB), and seatRate (cost per seat per month) to match your actual pricing.' },
      { title: 'Update the lookup arrays', text: 'Edit the apiTiers and storageTicks arrays to match your real usage tiers. Each array index corresponds to one slider step — add or remove values to change the scale.' },
      { title: 'Add a new pricing dimension', text: 'Duplicate a .slider-row in HTML, add a tick-row below it, add a cost variable in calc(), add a new .b-row line in the breakdown, and define the rate as a constant at the top of the JS.' },
      { title: 'Update the CTA button link', text: 'Replace href="#" on .btn-primary with your signup or checkout URL. You can also pass the calculated total as a query parameter to pre-fill a checkout form.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState and useMemo, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['Three interactive sliders with live oninput cost update','Non-linear lookup arrays map 0–10 slider to real-world usage tiers','Custom styled range inputs via -webkit-slider-thumb and -moz-range-thumb','Per-line cost breakdown in a bordered list with rounded corners','Indigo accent total row with larger font size','Colour-coded value chip (indigo pill) above each slider showing current value','k/M number suffix formatting via fmt() function','$0.00 two-decimal price formatting via fmtPrice()','CTA button with free credit note below the breakdown','Responsive single-column card layout centred on all screen sizes'],
    useCases: [
      { icon: 'MONEY', title: 'Usage-based and metered SaaS pricing pages', desc: 'Show users their personalised monthly cost before they commit, then route them to your [pricing page](/ui-snippets/pricing-page/) or a [billing toggle](/ui-snippets/pricing-toggle/) to pick a plan. API calls, storage, and seat pricing are the three most common usage-based billing axes — all covered by the three slider rows.' },
      { icon: 'CODE', title: 'Developer tool and API product landing pages', desc: 'Developers want to know their cost before integrating. An interactive calculator showing their expected API call count and storage usage converts significantly better than a static pricing table for metered products.' },
      { icon: 'FLOW', title: 'Cloud database and infrastructure pricing', desc: 'The slider + breakdown pattern is exactly how AWS, GCP, and Azure pricing calculators work. Adapt storageTicks and rates to cover compute instances, bandwidth tiers, or database reads and writes.' },
      { icon: 'DESIGN', title: 'Learn the non-linear range slider technique', desc: 'The lookup array pattern maps a simple 0–10 input range to values spanning several orders of magnitude — building on the basic [range slider](/ui-snippets/range-slider/) snippet. This JavaScript technique applies anywhere you need a slider that covers vastly different scales — like audio frequency, file size, or geographic area.' },
      { icon: 'STAR', title: 'Reduce pricing anxiety before checkout', desc: 'Showing a personalised cost estimate eliminates the most common objection to signing up: "I do not know what I will actually pay." Users who see their cost is within budget convert faster and at higher rates than those reading abstract per-unit rates on a static page.' },
      { icon: 'LEARN', title: 'Style range inputs consistently across browsers', desc: 'The WebKit and Mozilla thumb pseudo-elements demonstrate how to apply consistent cross-browser range input styling with CSS alone — a technique that applies to any slider in any project, not just pricing calculators.' },
      { icon: 'CODE', title: 'Related: Student & Nonprofit Discount Card', desc: 'See the [Student & Nonprofit Discount Card](/ui-snippets/pricing-student-discount-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the non-linear slider values work?', a: 'apiTiers and storageTicks are lookup arrays. The slider range is always 0–10, which maps directly to array indices. For storage, Math.round(storIdx * (storageTicks.length - 1) / 10) converts the 0–10 value to an array index. This means each drag step moves to the next tier — 0, 1, 2, 5, 10, 25, 50, 100, 250, or 500 GB — rather than incrementing by a fixed linear amount.' },
      { q: 'How do I add a fourth pricing dimension like bandwidth?', a: 'In HTML, duplicate a .slider-row block and give the slider a new id (e.g. s-bandwidth). Add a .b-row for bandwidth to the breakdown section. In JS, define a bandwidthTicks lookup array and bandwidthRate constant. In calc(), read the slider value, look up the bandwidth amount, compute the cost, and update the display elements. The layout stretches automatically to fit the new row.' },
      { q: 'How do I use this calculator in a React project?', a: 'Click "JSX" to download. In React, create useState hooks for each slider value (apiIdx, storIdx, seats). Wrap the calc logic in a useMemo that depends on all three values and returns an object with apiCost, storageCost, seatCost, and total. Replace oninput with onChange. The lookup arrays and rate constants stay the same.' },
      { q: 'How do I add a free tier so the first N API calls are free?', a: 'In calc(), change the API cost line to: const billableCalls = Math.max(0, apiCalls - FREE_API_TIER); const apiCost = (billableCalls / 1000) * apiRate; where FREE_API_TIER is a constant like 10000. The displayed cost shows $0.00 until the user drags past the free tier, then rises from there.' },
    ],
    aiPrompt: {
      paragraph: `Instead of working through the index math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the storage slider maps its 0-10 range through Math.round(storIdx * (steps.length-1) / 10) instead of just using storIdx as a direct array index the way the API slider does, and what would go wrong if both sliders used the same approach. It's worth an optimization question too — ask whether recalculating and rewriting all six DOM text nodes on every single oninput tick (which can fire dozens of times per drag) is worth debouncing or batching. For extending it, have it add a free-tier allowance that zeroes out cost below a threshold, a fourth pricing dimension like bandwidth following the existing lookup-array pattern, or an annual-vs-monthly toggle that discounts the computed total. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive usage-based pricing calculator in plain HTML, CSS, and vanilla JavaScript with no libraries.

Requirements:
- Three range inputs, one each for API calls per month, storage in GB, and team seats, each paired with a label showing its current formatted value.
- The API calls slider must run from 0 to 10 but map to a non-linear lookup array of real-world usage tiers (e.g. 0, 1000, 5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000, 5000000) using the slider's integer value as a direct index into that array, not a linear interpolation.
- The storage slider must similarly run from 0 to 10 but map through a separate lookup array of realistic GB tiers using a rounded index calculation of the form round(sliderValue * (array.length - 1) / 10), since the array has fewer entries than the slider has steps.
- The seats slider can be a direct linear range (e.g. 1 to 50) with a flat per-seat rate.
- On every input event on any of the three sliders, recompute and display: each dimension's individual cost, the value label above each slider, and a running total, all read from constants for the per-unit rates so they're trivial to retune.
- Format large call counts with k/M suffixes (e.g. "50k", "1.2M") and format all prices to two decimal places with a dollar sign.
- Style the native range input's track and thumb consistently across WebKit and Firefox using the vendor-specific pseudo-elements, since the default browser appearance is inconsistent.`,
    },
  },
};

export default usageCalculator;
