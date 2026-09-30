const tipCalculator = {
  id: 'tip-calculator',
  title: 'Tip Calculator',
  category: 'tools',
  html: `<div class="wrap">
  <div class="card">
    <h2 class="heading">Tip Calculator</h2>
    <div class="field">
      <label class="label">Bill Amount</label>
      <div class="input-wrap">
        <span class="prefix">$</span>
        <input class="input" id="bill" type="number" min="0" step="0.01" placeholder="0.00" oninput="calc()" value="85.00">
      </div>
    </div>
    <div class="field">
      <label class="label">Tip Percentage</label>
      <div class="tip-btns">
        <button class="tip-btn" onclick="setTip(this,10)">10%</button>
        <button class="tip-btn active" onclick="setTip(this,15)">15%</button>
        <button class="tip-btn" onclick="setTip(this,18)">18%</button>
        <button class="tip-btn" onclick="setTip(this,20)">20%</button>
        <button class="tip-btn" onclick="setTip(this,25)">25%</button>
        <button class="tip-btn custom-btn" onclick="setCustom(this)">Custom</button>
      </div>
      <input class="custom-input" id="customTip" type="number" min="0" max="100" placeholder="Enter %" oninput="calc()" style="display:none">
    </div>
    <div class="field">
      <label class="label">Number of People</label>
      <div class="people-ctrl">
        <button class="ppl-btn" onclick="changePeople(-1)">&#x2212;</button>
        <span class="ppl-count" id="pplCount">2</span>
        <button class="ppl-btn" onclick="changePeople(1)">+</button>
        <span class="ppl-label">people</span>
      </div>
    </div>
    <div class="results">
      <div class="result-row">
        <div class="result-label">Tip Amount<span class="per-person">/ person</span></div>
        <div class="result-val" id="tipPerPerson">$6.38</div>
      </div>
      <div class="result-row">
        <div class="result-label">Total Amount<span class="per-person">/ person</span></div>
        <div class="result-val accent" id="totalPerPerson">$48.88</div>
      </div>
      <div class="divider"></div>
      <div class="result-row sm">
        <div class="result-label">Tip Total</div>
        <div class="result-val sm" id="tipTotal">$12.75</div>
      </div>
      <div class="result-row sm">
        <div class="result-label">Grand Total</div>
        <div class="result-val sm" id="grandTotal">$97.75</div>
      </div>
    </div>
    <button class="reset-btn" onclick="reset()">Reset</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
.wrap { width: 100%; max-width: 420px; }
.card { background: #1e293b; border-radius: 20px; padding: 28px; }
.heading { font-size: 18px; font-weight: 800; color: #f1f5f9; margin-bottom: 24px; }
.field { margin-bottom: 22px; }
.label { display: block; font-size: 12px; font-weight: 600; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 10px; }
.input-wrap { display: flex; align-items: center; background: #0f172a; border: 1px solid #334155; border-radius: 12px; overflow: hidden; transition: border-color 0.15s; }
.input-wrap:focus-within { border-color: #38bdf8; }
.prefix { padding: 0 14px; font-size: 18px; font-weight: 700; color: #38bdf8; }
.input { flex: 1; background: none; border: none; outline: none; padding: 14px 14px 14px 0; font-size: 20px; font-weight: 700; color: #f1f5f9; }
.input::placeholder { color: #475569; }
.tip-btns { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
.tip-btn { background: #0f172a; border: 1px solid #334155; color: #94a3b8; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.15s; }
.tip-btn:hover { border-color: #38bdf8; color: #38bdf8; }
.tip-btn.active { background: #0ea5e9; border-color: #0ea5e9; color: #fff; }
.custom-input { width: 100%; background: #0f172a; border: 1px solid #38bdf8; border-radius: 10px; outline: none; padding: 12px 14px; font-size: 16px; font-weight: 700; color: #f1f5f9; margin-top: 8px; }
.people-ctrl { display: flex; align-items: center; gap: 12px; background: #0f172a; border: 1px solid #334155; border-radius: 12px; padding: 10px 16px; }
.ppl-btn { width: 32px; height: 32px; background: #1e293b; border: 1px solid #475569; border-radius: 8px; font-size: 18px; cursor: pointer; color: #94a3b8; display: flex; align-items: center; justify-content: center; transition: all 0.15s; flex-shrink: 0; }
.ppl-btn:hover { border-color: #38bdf8; color: #38bdf8; }
.ppl-count { font-size: 22px; font-weight: 800; color: #f1f5f9; min-width: 28px; text-align: center; }
.ppl-label { font-size: 13px; color: #64748b; margin-left: 4px; }
.results { background: #0f172a; border-radius: 14px; padding: 20px; margin-bottom: 20px; }
.result-row { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
.result-row.sm { margin-bottom: 6px; }
.result-label { font-size: 13px; color: #94a3b8; }
.per-person { font-size: 11px; margin-left: 4px; color: #64748b; }
.result-val { font-size: 24px; font-weight: 800; color: #f1f5f9; font-variant-numeric: tabular-nums; }
.result-val.accent { color: #0ea5e9; }
.result-val.sm { font-size: 15px; font-weight: 600; color: #64748b; }
.divider { height: 1px; background: #1e293b; margin: 12px 0; }
.reset-btn { width: 100%; background: #334155; border: none; color: #94a3b8; padding: 13px; border-radius: 12px; font-size: 14px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.reset-btn:hover { background: #475569; color: #f1f5f9; }`,
  js: `var tipPct = 15;
var people = 2;

function calc() {
  var bill = parseFloat(document.getElementById('bill').value) || 0;
  var tip = bill * (tipPct / 100);
  var total = bill + tip;
  document.getElementById('tipPerPerson').textContent = '$' + (tip / people).toFixed(2);
  document.getElementById('totalPerPerson').textContent = '$' + (total / people).toFixed(2);
  document.getElementById('tipTotal').textContent = '$' + tip.toFixed(2);
  document.getElementById('grandTotal').textContent = '$' + total.toFixed(2);
}

function setTip(btn, pct) {
  tipPct = pct;
  document.querySelectorAll('.tip-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  document.getElementById('customTip').style.display = 'none';
  calc();
}

function setCustom(btn) {
  document.querySelectorAll('.tip-btn').forEach(function(b) { b.classList.remove('active'); });
  btn.classList.add('active');
  var ci = document.getElementById('customTip');
  ci.style.display = 'block';
  ci.focus();
  ci.oninput = function() {
    tipPct = parseFloat(ci.value) || 0;
    calc();
  };
}

function changePeople(delta) {
  people = Math.max(1, people + delta);
  document.getElementById('pplCount').textContent = people;
  calc();
}

function reset() {
  document.getElementById('bill').value = '';
  people = 2;
  tipPct = 15;
  document.getElementById('pplCount').textContent = '2';
  document.querySelectorAll('.tip-btn').forEach(function(b) { b.classList.remove('active'); });
  document.querySelectorAll('.tip-btn')[1].classList.add('active');
  document.getElementById('customTip').style.display = 'none';
  document.getElementById('tipPerPerson').textContent = '$0.00';
  document.getElementById('totalPerPerson').textContent = '$0.00';
  document.getElementById('tipTotal').textContent = '$0.00';
  document.getElementById('grandTotal').textContent = '$0.00';
}

calc();`,
  seo: {
    title: 'Tip Calculator — Free HTML CSS JS Snippet',
    description: 'Bill tip calculator with preset %, custom tip, bill split by people, and live per-person totals. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Tip Calculator — Preset Tips, Custom %, Bill Split, and Live Per-Person Totals',
      description: `A tip calculator is a simple but highly-used utility component for restaurant billing, group dining (split the total with the [split payment calculator](/ui-snippets/split-payment-calculator/)), and service tip scenarios. This snippet provides a complete dark-themed tip calculator with a bill amount input, six tip preset buttons (10%, 15%, 18%, 20%, 25%, Custom), a people counter with a [+/− stepper](/ui-snippets/quantity-stepper/), and a results panel showing tip per person, total per person, tip total, and grand total — all updating live on every input change.\n\n**The tip percentage toggle system**\n\nThe six tip buttons use a shared .active class to highlight the selected preset. setTip(btn, pct) removes .active from all buttons and adds it to the clicked one, then stores the selected percentage in the tipPct variable and calls calc(). The Custom button shows a hidden input field and sets up an inline oninput handler that reads the custom percentage and calls calc().\n\n**The bill split calculation**\n\ncalc() reads the bill amount, multiplies by tipPct/100 to get the tip, adds to get the total, then divides both by the people count. All four output fields (tip/person, total/person, tip-total, grand-total) are updated in a single pass. toFixed(2) ensures two decimal places consistently.\n\n**The people counter**\n\nchangePeople(delta) increments or decrements the people count, enforcing Math.max(1) so it cannot go below 1. The counter display and all result calculations update immediately.\n\n**The reset function**\n\nreset() clears the bill input, restores tipPct to 15, people to 2, re-applies the 15% active class, hides the custom input, and zeroes out all result displays. This pattern — resetting to known defaults rather than re-rendering — avoids a full component re-render in vanilla JS.\n\n**Input validation and edge cases**\n\nThe bill input uses type="number" with min="0" and step="0.01" to prevent negative values and accept decimal inputs at the browser level. calc() applies parseFloat(value) || 0 as a safe fallback so that a blank or invalid input produces 0 rather than NaN. Division by the people count is always safe because changePeople() enforces a minimum of 1 via Math.max(1, people + delta). These three guards — || 0, min="0", and Math.max(1) — prevent all common calculation edge cases without a separate validation library.\n\n**Rounding and floating-point precision**\n\ntoFixed(2) converts the calculated float to a two-decimal-place string, which is correct for currency display. However, floating-point arithmetic can produce values like 106.99999999 rather than 107.00. For financial calculations where exact rounding matters, multiply all values by 100 to work in integer cents, perform integer arithmetic, then divide by 100 at display time. For a tip calculator the visual difference is imperceptible, but in invoice or payment processing contexts always use integer cent arithmetic or a library like Decimal.js.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Enter the bill amount', text: 'Type the bill total in the $ input field. All results update immediately as you type.' },
      { title: 'Choose a tip percentage', text: 'Click one of the six preset tip buttons (10%, 15%, 18%, 20%, 25%) or click Custom to enter your own percentage in the input that appears.' },
      { title: 'Set the number of people', text: 'Use the + and − buttons to set how many people are splitting the bill. The per-person totals update automatically.' },
      { title: 'Read the results', text: 'The results panel shows tip per person and total per person (large), plus tip total and grand total (smaller). All four update live.' },
      { title: 'Reset for a new calculation', text: 'Click the Reset button to clear the bill, restore defaults (15% tip, 2 people), and zero the results.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React component using useState for bill, tipPct, and people. Click "Vue" for a Vue 3 SFC with reactive refs.' },
    ]},
    features: ['6 tip preset buttons with .active highlight toggle','Custom % input: hidden by default, shown on Custom button click','Live calculation: all 4 results update on every bill/tip/people change','changePeople() with Math.max(1) guard prevents going below 1 person','toFixed(2) on all monetary outputs for consistent decimal places','Tip per person and total per person as primary large-display results','Tip total and grand total as secondary smaller results','Reset function restores all state to defaults without page reload'],
    useCases: [
      { icon: 'APP', title: 'Restaurant and dining app tip split utility', desc: 'Embed in a food delivery or restaurant booking app as a post-meal utility. Pre-fill the bill amount from the order total. Add a "Share split" button that generates a payment link (Venmo or PayPal.me) with the per-person amount pre-filled.' },
      { icon: 'DESIGN', title: 'Personal finance and budgeting app dining module', desc: 'Include as a standalone utility page within a budgeting app. After calculation, offer an "Add to expenses" button that logs the user\'s share (total per person) to their dining expense category.' },
      { icon: 'FLOW', title: 'Event and group booking payment calculator', desc: 'Adapt for group activities, shared taxi fares, or hotel room splits. Replace "Tip Percentage" with "Service Charge %" or "Extra Costs" to handle any group-split scenario beyond restaurant tipping.' },
      { icon: 'CODE', title: 'Extend with currency selection and rounding options', desc: 'Add a currency selector (USD, EUR, GBP, etc.) that switches the prefix symbol and formats the output with Intl.NumberFormat. Add a "Round up per person" toggle that rounds each person\'s share to the nearest dollar and shows the adjusted totals.' },
      { icon: 'LEARN', title: 'Study live form calculation patterns', desc: 'The snippet demonstrates a stateless live-calc pattern: read input values → compute → write output values in a single function. This is the foundation for spreadsheet-like form UIs, pricing calculators, mortgage calculators, and any tool where inputs drive displayed results.' },
      { icon: 'CHART', title: 'Freelancer invoice tip or service fee calculator', desc: 'Repurpose for freelance services: the "bill amount" becomes the project fee, "tip %" becomes a "platform fee %" or "tax %", and the total becomes the client invoice amount. The split feature becomes useful for shared project billing between multiple clients.' },
    ],
    faqs: [
      { q: 'How does the custom tip input work?', a: 'When Custom is clicked, setCustom() adds .active to that button and sets the hidden #customTip input to display: block. It then attaches an inline oninput handler that reads the entered percentage, stores it in tipPct, and calls calc(). The input disappears when a preset button is clicked via setTip(). To improve UX, call ci.focus() immediately after showing the input so the cursor lands in the field without an extra click. Add a min="0" max="100" constraint on the input element so browsers enforce the range at the HTML level. In the oninput handler, further clamp with Math.min(100, Math.max(0, parseFloat(ci.value) || 0)) to handle cases where the user pastes a value outside the valid range, preventing negative tip percentages or values above 100% from producing unexpected results.' },
      { q: 'How do I add currency formatting?', a: 'Use Intl.NumberFormat: const fmt = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }); Then replace all "$" + value.toFixed(2) calls with fmt.format(value). For other currencies, pass currency: "EUR" etc.' },
      { q: 'How do I build this in React?', a: 'Use const [bill, setBill] = useState(85); const [tipPct, setTipPct] = useState(15); const [people, setPeople] = useState(2). Compute derived values: const tip = bill * tipPct / 100; const total = bill + tip; const tipPP = tip / people; const totalPP = total / people. Render all four directly in JSX — no separate calc() call needed. Use useMemo to memoize the computed values if the component has many siblings re-rendering: const results = useMemo(() => ({ tip, total, tipPP, totalPP }), [bill, tipPct, people]). For the custom tip input, manage a separate const [customMode, setCustomMode] = useState(false) flag that shows or hides the custom input field and switches the tipPct to the custom value.' },
      { q: 'How does bill splitting between people work?', a: 'A people variable holds the split count and calc() divides both the tip and the total by it: tip / people goes to #tipPerPerson and (bill + tip) / people goes to #totalPerPerson, each formatted with toFixed(2). The full-table figures are written alongside to #tipTotal and #grandTotal, so the card always shows per-person and whole-bill numbers at once. The plus/minus stepper just increments or decrements people (clamped to a minimum of 1) and calls calc() again.' },
      { q: 'How do I change the preset tip percentages?', a: 'The presets are plain buttons that call setTip(this, pct) with the percentage inline — <button class="tip-btn" onclick="setTip(this,18)">18%</button> — so editing the numbers in the markup is the whole job. setTip() stores the value in tipPct, moves the .active class to the clicked button, hides the custom input, and re-runs calc(). Keep the button label and the argument in sync, and keep the Custom option last so users can still enter any value your presets don\'t cover.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to walk through why calc() reads every input fresh and rewrites all four result fields in one pass rather than tracking dependent values incrementally — that stateless recompute-everything pattern is the whole reason this small script never gets out of sync. It's worth asking about the floating-point angle too: toFixed(2) looks fine for a $85 bill, but ask specifically when integer-cent arithmetic would actually matter and where the rounding could go wrong in a real payments context. For extending it, ask for currency selection with Intl.NumberFormat, a "round up per person" toggle that redistributes the rounding difference correctly across people, or a shareable summary that generates a per-person payment link. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a tip calculator in plain HTML, CSS, and JavaScript with bill input, preset and custom tip percentages, a people splitter, and live per-person totals — no framework.

Requirements:
- A bill amount input (type number, min 0, step 0.01) that recalculates every result on every input event.
- A row of preset tip percentage buttons plus a "Custom" option; clicking a preset immediately sets the active tip percentage and moves a visual active state to that button, while clicking Custom reveals a separate percentage input that becomes the live source of the tip percentage as the user types in it.
- A people counter with increment and decrement buttons that clamps at a minimum of 1 person (never allowing zero or negative), immediately recalculating all totals when it changes.
- A single calculation function that, on every relevant change, reads the current bill, tip percentage, and people count fresh from their sources, computes the tip amount and grand total from scratch, and writes all four results — tip per person, total per person, tip total, and grand total — in one pass, each formatted to exactly two decimal places.
- Guard every numeric read with a safe fallback to zero (so an empty or invalid bill input never produces NaN anywhere in the results) and confirm the people-count guard prevents any possible division by zero.
- A reset button that restores the bill field to empty, the tip percentage to its original default, the people count to its original default, hides the custom input, and zeroes every displayed result — without reloading the page.`,
    },
  },
};

export default tipCalculator;
