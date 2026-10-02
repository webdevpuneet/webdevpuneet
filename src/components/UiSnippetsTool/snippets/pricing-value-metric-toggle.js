const pricingValueMetricToggle = {
  id: 'pricing-value-metric-toggle',
  title: 'Pricing Model Toggle (Per-Seat vs Per-Usage)',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="vmt-wrap">
  <div class="vmt-card">
    <p class="vmt-eyebrow">Choose how you pay</p>
    <h2 class="vmt-title">Per-seat or usage-based — your call</h2>

    <div class="vmt-switch" id="vmtSwitch" role="tablist">
      <button class="vmt-switch-opt active" data-mode="seat" role="tab" aria-selected="true">Per-seat</button>
      <button class="vmt-switch-opt" data-mode="usage" role="tab" aria-selected="false">Usage-based</button>
      <span class="vmt-switch-thumb" id="vmtThumb"></span>
    </div>

    <div class="vmt-panel" id="vmtSeatPanel">
      <label class="vmt-label" for="vmtSeats">Number of seats</label>
      <div class="vmt-input-row">
        <button class="vmt-step" id="vmtSeatsMinus" type="button" aria-label="Decrease seats">−</button>
        <input class="vmt-input" id="vmtSeats" type="number" min="1" max="500" value="8" />
        <button class="vmt-step" id="vmtSeatsPlus" type="button" aria-label="Increase seats">+</button>
      </div>
      <p class="vmt-rate-note">$15 per seat / month</p>
    </div>

    <div class="vmt-panel" id="vmtUsagePanel" hidden>
      <label class="vmt-label" for="vmtUsage">API calls per month (thousands)</label>
      <div class="vmt-input-row">
        <button class="vmt-step" id="vmtUsageMinus" type="button" aria-label="Decrease usage">−</button>
        <input class="vmt-input" id="vmtUsage" type="number" min="1" max="10000" value="400" />
        <button class="vmt-step" id="vmtUsagePlus" type="button" aria-label="Increase usage">+</button>
      </div>
      <p class="vmt-rate-note">$0.02 per API call</p>
    </div>

    <div class="vmt-result">
      <p class="vmt-result-label">Estimated monthly cost</p>
      <p class="vmt-result-value" id="vmtResultValue">—</p>
      <p class="vmt-result-formula" id="vmtResultFormula"></p>
    </div>

    <button class="vmt-cta">Get started</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.vmt-wrap{width:100%;max-width:400px}
.vmt-card{background:linear-gradient(165deg,#161c30,#0d1119);border:1px solid #232c48;border-radius:20px;padding:30px 26px}
.vmt-eyebrow{font-size:12px;font-weight:700;color:#818cf8;text-transform:uppercase;letter-spacing:.06em}
.vmt-title{font-size:19px;font-weight:800;color:#f4f7fb;margin-top:8px;line-height:1.35}
.vmt-switch{position:relative;display:grid;grid-template-columns:1fr 1fr;margin-top:20px;background:#0c0f1a;border:1px solid #232c48;border-radius:12px;padding:4px}
.vmt-switch-opt{position:relative;z-index:1;background:transparent;border:none;color:#8b96ab;font-family:inherit;font-size:13px;font-weight:700;padding:10px;border-radius:9px;cursor:pointer;transition:color .2s}
.vmt-switch-opt.active{color:#0c0f1a}
.vmt-switch-thumb{position:absolute;top:4px;left:4px;width:calc(50% - 4px);height:calc(100% - 8px);background:#818cf8;border-radius:9px;transition:transform .25s cubic-bezier(.4,0,.2,1)}
.vmt-switch-opt[data-mode="usage"].active ~ .vmt-switch-thumb{transform:translateX(100%)}
.vmt-panel{margin-top:22px}
.vmt-label{display:block;font-size:12px;font-weight:700;color:#8b96ab;text-transform:uppercase;letter-spacing:.05em;margin-bottom:9px}
.vmt-input-row{display:flex;align-items:center;gap:10px}
.vmt-step{width:38px;height:38px;flex:none;background:#0c0f1a;border:1.5px solid #232c48;color:#c3cbdb;font-size:18px;font-weight:700;border-radius:9px;cursor:pointer;transition:border-color .15s}
.vmt-step:hover{border-color:#818cf8;color:#818cf8}
.vmt-input{flex:1;text-align:center;background:#0c0f1a;border:1.5px solid #232c48;color:#f4f7fb;font-family:inherit;font-size:16px;font-weight:700;padding:9px;border-radius:9px;outline:none;font-variant-numeric:tabular-nums}
.vmt-input:focus{border-color:#818cf8}
.vmt-rate-note{font-size:11.5px;color:#5c6779;margin-top:8px;text-align:center}
.vmt-result{margin-top:22px;padding:18px;background:rgba(129,140,248,.06);border:1px solid rgba(129,140,248,.22);border-radius:14px;text-align:center}
.vmt-result-label{font-size:11.5px;color:#8b96ab;font-weight:600}
.vmt-result-value{font-size:32px;font-weight:800;color:#818cf8;margin-top:6px;font-variant-numeric:tabular-nums}
.vmt-result-formula{font-size:11.5px;color:#5c6779;margin-top:6px}
.vmt-cta{width:100%;margin-top:18px;background:#818cf8;color:#0e1024;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.vmt-cta:hover{background:#6f7cf0}`,

  js: `const SEAT_RATE = 15;      // $ per seat per month
const USAGE_RATE = 0.02;   // $ per API call

const switchEl = document.getElementById('vmtSwitch');
const seatPanel = document.getElementById('vmtSeatPanel');
const usagePanel = document.getElementById('vmtUsagePanel');
const seatsInput = document.getElementById('vmtSeats');
const usageInput = document.getElementById('vmtUsage');
const resultValue = document.getElementById('vmtResultValue');
const resultFormula = document.getElementById('vmtResultFormula');

let mode = 'seat';

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function recalc() {
  if (mode === 'seat') {
    const seats = clamp(parseInt(seatsInput.value, 10) || 0, 1, 500);
    seatsInput.value = seats;
    const total = seats * SEAT_RATE;
    resultValue.textContent = '$' + total.toLocaleString('en-US');
    resultFormula.textContent = seats + ' seats × $' + SEAT_RATE + ' = $' + total.toLocaleString('en-US') + '/month';
  } else {
    const usageThousands = clamp(parseInt(usageInput.value, 10) || 0, 1, 10000);
    usageInput.value = usageThousands;
    const calls = usageThousands * 1000;
    const total = calls * USAGE_RATE;
    resultValue.textContent = '$' + total.toLocaleString('en-US', { maximumFractionDigits: 2 });
    resultFormula.textContent = calls.toLocaleString('en-US') + ' calls × $' + USAGE_RATE + ' = $' + total.toLocaleString('en-US', { maximumFractionDigits: 2 }) + '/month';
  }
}

switchEl.addEventListener('click', (e) => {
  const btn = e.target.closest('.vmt-switch-opt');
  if (!btn) return;
  mode = btn.dataset.mode;
  switchEl.querySelectorAll('.vmt-switch-opt').forEach((el) => {
    const active = el === btn;
    el.classList.toggle('active', active);
    el.setAttribute('aria-selected', String(active));
  });
  seatPanel.hidden = mode !== 'seat';
  usagePanel.hidden = mode !== 'usage';
  recalc();
});

document.getElementById('vmtSeatsMinus').addEventListener('click', () => {
  seatsInput.value = clamp((parseInt(seatsInput.value, 10) || 1) - 1, 1, 500);
  recalc();
});
document.getElementById('vmtSeatsPlus').addEventListener('click', () => {
  seatsInput.value = clamp((parseInt(seatsInput.value, 10) || 1) + 1, 1, 500);
  recalc();
});
document.getElementById('vmtUsageMinus').addEventListener('click', () => {
  usageInput.value = clamp((parseInt(usageInput.value, 10) || 1) - 10, 1, 10000);
  recalc();
});
document.getElementById('vmtUsagePlus').addEventListener('click', () => {
  usageInput.value = clamp((parseInt(usageInput.value, 10) || 1) + 10, 1, 10000);
  recalc();
});

seatsInput.addEventListener('input', recalc);
usageInput.addEventListener('input', recalc);

recalc();`,

  seo: {
    title: 'Per-Seat vs Usage-Based Pricing Toggle — Free HTML CSS JS Snippet',
    description: 'A pricing card that toggles between two fundamentally different pricing models, per-seat and usage-based, with live independent inputs and correct recalculation.',
    about: {
      title: 'Pricing Model Toggle — Per-Seat vs. Usage-Based, Two Real Formulas, Not One Formula Relabeled',
      description: `Plenty of "pricing model toggle" components are cosmetic — they swap a label between "per seat" and "usage-based" while running the exact same multiplication underneath. This snippet builds two genuinely different pricing formulas, each with its own independent input and its own unit economics, and switches between them cleanly without either one leaking into the other.

**Two real formulas, not one formula relabeled**

Per-seat pricing is \`seats × SEAT_RATE\` — a flat \\$15 charged for every team member, regardless of how much any individual uses the product. Usage-based pricing is \`calls × USAGE_RATE\` — a per-unit charge (\\$0.02 per API call) that has nothing to do with headcount at all; a team of two making a million calls pays far more than a team of fifty making a thousand. These are different mental models for the same underlying question ("what am I actually paying for?"), and the snippet keeps them structurally separate: two different input fields, two different rate constants, two different result-formula strings.

**Independent, isolated inputs per model**

Switching modes doesn't just change which formula runs against a shared number — it swaps to an entirely separate input (\`#vmtSeats\` vs. \`#vmtUsage\`) with its own stepper buttons, its own \`min\`/\`max\` bounds, and its own unit label ("seats" vs. "API calls per month, in thousands"). This matters because the two inputs represent genuinely different things; forcing them to share one number field would misrepresent at least one of the two models the moment a visitor tried to enter a value that made sense for the other.

**The formula is shown, not just the total**

Beneath the headline dollar figure, \`resultFormula\` renders the literal arithmetic — \`"8 seats × $15 = $120/month"\` or \`"400,000 calls × $0.02 = $8,000/month"\` — computed from the exact same input the total was computed from, so the total is always traceable back to a number the visitor themselves typed in.

**Clamping keeps the math sane at the edges**

Both inputs run through \`clamp()\`, bounding seats to 1–500 and usage to 1–10,000 (thousand calls), and both stepper buttons and direct typing funnel through the identical \`recalc()\` function — so there's exactly one code path computing the cost for each model, not two that could drift out of sync (one driven by buttons, one by typing).

**Why this distinction matters for buyers**

A team evaluating vendors genuinely needs to know which pricing model fits their usage pattern — a small team with heavy API usage will pay far less under usage-based pricing than per-seat, and vice versa for a large team with light usage. Letting a prospect toggle between both models with their own real numbers, live, turns an abstract pricing-page comparison into a concrete answer to "which one is cheaper for us."

**Customizing it**

Change \`SEAT_RATE\` and \`USAGE_RATE\` to your real pricing, adjust the input bounds, or add a third pricing model (e.g. flat-tier) as a third switch option following the same isolated-panel pattern. Pair it with [pricing toggle](/ui-snippets/pricing-toggle/) for a monthly/annual dimension layered on top, or [seat-based pricing calculator](/ui-snippets/seat-based-pricing-calculator/) for a per-seat-only deep dive.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Start on Per-seat', text: 'Adjust the seat count with the steppers or by typing directly.' },
      { title: 'Watch the cost recalculate', text: 'The total and formula line update live from seats × rate.' },
      { title: 'Switch to Usage-based', text: 'A completely separate input for monthly API call volume appears.' },
      { title: 'Adjust the usage input', text: 'The total recalculates as calls × per-call rate, independently of seats.' },
      { title: 'Compare the two totals', text: 'Toggle back and forth to see which model is cheaper for your numbers.' },
      { title: 'Change the rates', text: 'Edit SEAT_RATE or USAGE_RATE — both formulas and their shown arithmetic update.' },
    ] },
    features: [
      { title: 'Two genuinely separate formulas', text: 'Per-seat and usage-based never share a computation path.' },
      { title: 'Independent inputs per model', text: 'Each pricing model has its own stepper, bounds, and units.' },
      { title: 'Shown arithmetic', text: 'The literal formula, not just the total, is always visible.' },
      { title: 'Clamped, sane input ranges', text: 'Both fields bound to realistic min/max values.' },
      { title: 'Single recalc() code path', text: 'Buttons and typing both funnel through the same function.' },
      { title: 'Sliding tab-switch thumb', text: 'A smooth animated indicator for the active model.' },
      { title: 'Locale-formatted numbers', text: 'toLocaleString keeps large totals readable.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS.' },
    ],
    useCases: [
      { title: 'API and infrastructure products', text: 'Let prospects compare seat-based and usage-based pricing, where each model has its own formula that never shares a computation with the other.' },
      { title: 'Hybrid pricing SaaS', text: 'Show both models side by side for products that offer either, with independent inputs, bounds and units for each.' },
      { title: 'Sales engineering estimates', text: 'Estimate cost live during a pricing call, with the literal formula and not just the total always visible on the card.' },
      { title: 'Calculator pairings', text: 'Pair with a [usage calculator](/ui-snippets/usage-calculator/) or [ROI calculator](/ui-snippets/roi-calculator/) for a fuller cost story, with fields clamped to realistic minimum and maximum values.' },
      { title: 'Pricing experiments and cost modelling', text: 'A/B test which model prospects prefer, or reuse the isolated dual-formula pattern for internal cost modelling.' },
      { icon: 'CODE', title: 'Related: Plan Downgrade Warning Card — Feature Loss Preview', desc: 'See the [Plan Downgrade Warning Card — Feature Loss Preview](/ui-snippets/pricing-plan-downgrade-warning-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are per-seat and usage-based really computed differently, or is it the same math relabeled?', a: 'They are genuinely different: per-seat cost is seats multiplied by a flat per-seat rate ($15), with no relationship to usage volume at all, while usage-based cost is the number of API calls multiplied by a per-call rate ($0.02), with no relationship to headcount. Each mode reads from its own input and its own rate constant, and switching modes swaps which input panel and which formula are active.' },
      { q: 'Why does switching modes hide one input and show a different one, instead of reusing one number field?', a: 'A single shared number field would misrepresent whichever model is not currently selected — "8" means something completely different as a seat count versus as a thousands-of-API-calls figure. Giving each model its own dedicated input, with its own bounds and unit label, keeps both models honestly represented rather than forcing an artificial shared scale.' },
      { q: 'What do the example rates in this snippet mean?', a: 'They are illustrative defaults ($15/seat/month and $0.02/API call) meant to demonstrate the calculation pattern, not live pricing. Replace SEAT_RATE and USAGE_RATE with your actual plan pricing — every displayed total and formula string recalculates automatically from those two constants.' },
      { q: 'Why show the formula text underneath the total?', a: 'Showing only a final dollar figure asks the visitor to trust an opaque number. Rendering the literal multiplication — the exact input value times the exact rate — lets them verify the total themselves and builds more confidence than a bare total would, especially when comparing two different pricing models against each other.' },
      { q: 'How do I add a third pricing model, like a flat-tier option?', a: 'Add a third button to the #vmtSwitch control with its own data-mode value, a third hidden panel with its own input and bounds, and a third branch in recalc() computing that model\'s total from its own rate constant — following the same isolated-panel pattern the existing two models use, so the new model does not interfere with the other two.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain why the per-seat and usage-based modes use entirely separate input elements and rate constants rather than one shared number field with a relabeled multiplier, and why every stepper button and direct-typing path funnels through the single recalc() function. It's also a strong candidate to extend — ask it to add a third hybrid pricing model (e.g. a base fee plus per-seat plus usage overage), add a side-by-side comparison showing both totals at once instead of only the active mode, or persist the visitor's last-used inputs in localStorage so returning to the page keeps their numbers.`,
      prompt: `Build a pricing card with a toggle between two fundamentally different, independently computed pricing models in plain HTML, CSS, and JavaScript, using no dependencies.

Requirements:
- A segmented toggle switching between "Per-seat" and "Usage-based" modes, with a smooth animated sliding indicator behind the active option.
- Per-seat mode shows a dedicated number input (with stepper buttons and a sensible min/max range) for number of seats, and computes monthly cost as seats multiplied by a flat per-seat rate constant.
- Usage-based mode shows a SEPARATE dedicated number input (with its own stepper buttons and its own sensible min/max range, in units appropriate to usage rather than seats) for consumption volume, and computes monthly cost as consumption multiplied by a per-unit rate constant — this must be an entirely independent formula and independent input from the per-seat mode, not the same input relabeled.
- Switching modes must hide the inactive model's input panel and show the correct one, and must NOT carry over or reuse the previous mode's numeric value in the new mode's calculation.
- Display both the computed total (formatted with locale-aware number grouping) and a line of text spelling out the literal arithmetic (e.g. "8 seats × $15 = $120/month" or "400,000 calls × $0.02 = $8,000/month") generated from the exact same input value the total was computed from.
- Route every input change — whether from typing directly or clicking a stepper button — through a single shared recalculation function per mode, so there is exactly one code path computing each model's cost.
- Verify your example rate constants produce sensible, correctly computed example totals before finalizing any copy that references specific numbers.`,
    },
  },
};

export default pricingValueMetricToggle;
