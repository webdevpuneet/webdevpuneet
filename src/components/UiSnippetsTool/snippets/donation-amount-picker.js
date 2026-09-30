const donationAmountPicker = {
  id: 'donation-amount-picker',
  title: 'Donation Amount Picker',
  lastmod: '2026-06-22',
  category: 'forms',
  html: `<form class="dap-card" id="dapForm">
  <h3>Support our work</h3>

  <div class="dap-freq" role="radiogroup" aria-label="Frequency">
    <button type="button" class="dap-freq-btn active" data-freq="once">One-time</button>
    <button type="button" class="dap-freq-btn" data-freq="monthly">Monthly</button>
  </div>

  <div class="dap-amounts" id="dapAmounts"></div>

  <div class="dap-custom" id="dapCustom">
    <span class="dap-currency">$</span>
    <input type="number" id="dapCustomInput" min="1" step="1" placeholder="Other amount">
  </div>

  <p class="dap-impact" id="dapImpact"></p>

  <button type="submit" class="dap-submit" id="dapSubmit">
    Donate <b id="dapTotal">$25</b> <span id="dapFreqLabel"></span>
  </button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:40px 24px}

.dap-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:380px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.dap-card h3{font-size:18px;font-weight:800;color:#0f172a;margin-bottom:16px}

.dap-freq{display:flex;background:#f1f5f9;border-radius:10px;padding:3px;margin-bottom:16px}
.dap-freq-btn{flex:1;border:none;background:none;padding:9px;border-radius:8px;font-size:13px;font-weight:700;color:#64748b;cursor:pointer;transition:background .15s,color .15s}
.dap-freq-btn.active{background:#fff;color:#0f172a;box-shadow:0 1px 3px rgba(15,23,42,.12)}

.dap-amounts{display:grid;grid-template-columns:repeat(3,1fr);gap:9px;margin-bottom:9px}
.dap-amt{border:1.5px solid #e2e8f0;background:#fff;border-radius:10px;padding:13px 0;font-size:15px;font-weight:800;color:#1e293b;cursor:pointer;transition:border-color .15s,background .15s,color .15s}
.dap-amt:hover{border-color:#cbd5e1}
.dap-amt.active{border-color:#16a34a;background:#f0fdf4;color:#15803d}

.dap-custom{display:flex;align-items:center;border:1.5px solid #e2e8f0;border-radius:10px;padding:0 13px;margin-bottom:14px;transition:border-color .15s,box-shadow .15s}
.dap-custom.active{border-color:#16a34a;box-shadow:0 0 0 3px rgba(34,197,94,.12)}
.dap-currency{font-size:15px;font-weight:800;color:#94a3b8}
.dap-custom input{flex:1;border:none;outline:none;padding:12px 6px;font-size:15px;font-weight:700;color:#0f172a;font-family:inherit}

.dap-impact{font-size:12.5px;color:#16a34a;font-weight:600;background:#f0fdf4;border-radius:8px;padding:9px 12px;margin-bottom:16px;line-height:1.45;min-height:38px;display:flex;align-items:center}

.dap-submit{width:100%;background:#16a34a;color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:700;cursor:pointer;transition:background .15s}
.dap-submit:hover{background:#15803d}
.dap-submit b{font-weight:800}`,

  js: `var PRESETS = [10, 25, 50, 100, 250, 500];
var IMPACT = {       // dollar -> message (nearest preset at or below picked amount)
  10: 'Provides a week of clean water for one family.',
  25: 'Supplies school materials for a child for a month.',
  50: 'Funds a day of meals for a family of four.',
  100: 'Covers medical supplies for a rural clinic visit.',
  250: 'Sponsors a month of after-school programs.',
  500: 'Funds emergency relief kits for ten households.',
};

var freq = 'once';
var amount = 25;
var custom = false;

var amountsEl = document.getElementById('dapAmounts');
var customWrap = document.getElementById('dapCustom');
var customInput = document.getElementById('dapCustomInput');

amountsEl.innerHTML = PRESETS.map(function (v) {
  return '<button type="button" class="dap-amt' + (v === amount ? ' active' : '') + '" data-amt="' + v + '">$' + v + '</button>';
}).join('');

function impactFor(amt) {
  var keys = PRESETS.slice().sort(function (a, b) { return b - a; });
  for (var i = 0; i < keys.length; i++) { if (amt >= keys[i]) return IMPACT[keys[i]]; }
  return 'Every dollar makes a difference — thank you.';
}

function sync() {
  document.querySelectorAll('.dap-amt').forEach(function (b) {
    b.classList.toggle('active', !custom && +b.dataset.amt === amount);
  });
  customWrap.classList.toggle('active', custom);
  var valid = amount >= 1;
  document.getElementById('dapTotal').textContent = valid ? '$' + amount : '$0';
  document.getElementById('dapFreqLabel').textContent = freq === 'monthly' ? '/ month' : '';
  document.getElementById('dapImpact').textContent = valid ? impactFor(amount) : 'Enter an amount to see your impact.';
  document.getElementById('dapSubmit').disabled = !valid;
}

amountsEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.dap-amt');
  if (!btn) return;
  custom = false;
  amount = +btn.dataset.amt;
  customInput.value = '';
  sync();
});

customInput.addEventListener('focus', function () { custom = true; sync(); });
customInput.addEventListener('input', function () {
  custom = true;
  amount = parseInt(this.value, 10) || 0;
  sync();
});

document.querySelector('.dap-freq').addEventListener('click', function (e) {
  var btn = e.target.closest('.dap-freq-btn');
  if (!btn) return;
  freq = btn.dataset.freq;
  document.querySelectorAll('.dap-freq-btn').forEach(function (b) { b.classList.toggle('active', b === btn); });
  sync();
});

document.getElementById('dapForm').addEventListener('submit', function (e) {
  e.preventDefault();
  // Proceed to payment with { amount, freq } here.
  var btn = document.getElementById('dapSubmit');
  btn.textContent = '✓ Thank you for your ' + (freq === 'monthly' ? 'monthly ' : '') + '$' + amount + ' gift!';
});

sync();`,

  seo: {
    title: 'Donation Amount Picker — Give Form HTML CSS JS',
    description: `A donation form with preset and custom amounts, one-time/monthly toggle, and a live impact message. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Donation Amount Picker — Preset + Custom Amounts with Impact Messaging',
      description: `The amount-selection step is where most donation forms succeed or fail. Ask for a freeform number and people freeze or give the minimum; offer well-chosen presets with a clear custom option and a sense of impact, and average gifts rise. This snippet builds a conversion-focused donation picker in plain HTML, CSS, and vanilla JavaScript: preset amount tiles, a custom-amount field, a one-time/monthly toggle, and a live "here's what your gift does" impact message.

**Presets anchor the decision**

Six preset tiles (\`$10\` through \`$500\`) give donors a fast, low-effort choice and quietly anchor expectations — seeing \`$50\` and \`$100\` as options nudges the typical gift upward versus a blank field where many default to the smallest round number they can justify. Selecting a preset highlights it in green and updates the donate button's total. The presets are a simple array, so you tune them to your audience: the right ladder for a small grassroots cause differs from a major nonprofit.

**A custom field that doesn't fight the presets**

Donors who want to give a specific amount need an obvious path, but the custom field and the presets must stay mutually exclusive — selecting a preset clears the custom input, and typing (or focusing) the custom field deselects every preset. This \`custom\` flag is the detail that prevents the confusing state where both a preset and a custom number look active. Focusing the custom field immediately treats it as the active amount, so there's no extra click.

**One-time vs. monthly, framed clearly**

A frequency toggle switches between a one-time gift and a recurring monthly donation — and recurring donors are dramatically more valuable to a nonprofit over time, so making monthly a prominent, equal option (not a buried checkbox) matters. The donate button reflects the choice exactly: "Donate $25" or "Donate $25 / month", so the commitment is never ambiguous at the point of action.

**Impact messaging that makes the gift tangible**

Below the amount, a live message translates the dollar figure into concrete impact ("Supplies school materials for a child for a month"), keyed to the nearest preset at or below the chosen amount. Connecting money to outcome is one of the most reliable ways to increase giving — "$50" is abstract, but "a day of meals for a family of four" is a decision someone can feel good about. The message updates instantly as the amount changes, including for custom values, which fall to the appropriate tier's message.

**Validation and submission**

The donate button disables for an empty or sub-$1 custom amount, and the impact line prompts the donor to enter a value — so the form never lets someone submit a meaningless gift. On submit you proceed to payment with the \`{ amount, freq }\` pair; the demo shows a thank-you confirmation, but in production this is where you'd hand off to Stripe, PayPal, or your payment processor. Because the amount and frequency are plain state, wiring that handoff is trivial.

**Accessible and adaptable**

The frequency control is a \`role="radiogroup"\`, amounts are real buttons, and the whole form is driven by one \`sync()\` function that keeps every visual — active states, total, frequency label, impact, and the submit gate — consistent with the current selection. Re-theme the green to your brand and adjust the presets and impact copy, and it fits any cause.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A donation form renders with a one-time/monthly toggle, six preset amounts ($25 pre-selected), a custom field, and an impact message.` },
      { title: 'Pick a preset', text: `Click an amount tile — it highlights green, the donate button total updates, and the impact message reflects the gift.` },
      { title: 'Enter a custom amount', text: `Type in the "Other amount" field — every preset deselects, and the total, impact, and validation update live.` },
      { title: 'Switch frequency', text: `Toggle Monthly — the donate button shows "/ month" so the recurring commitment is explicit.` },
      { title: 'Tune the presets and impact', text: `Edit the PRESETS array and the IMPACT messages to fit your cause and donor base.` },
      { title: 'Connect a payment processor', text: `On submit, hand off { amount, freq } to Stripe, PayPal, or your processor instead of the demo confirmation.` },
    ] },
    features: [
      { title: 'Preset amount tiles', text: `Six configurable preset amounts anchor the gift size and give a fast, low-effort choice.` },
      { title: 'Mutually exclusive custom field', text: `A custom flag keeps presets and the custom input from both appearing active — focusing custom deselects presets and vice versa.` },
      { title: 'One-time / monthly toggle', text: `A prominent frequency switch makes recurring giving an equal, clearly-labeled option, reflected in the button.` },
      { title: 'Live impact messaging', text: `Translates the dollar amount into concrete outcomes, keyed to the nearest tier, updating instantly for any amount.` },
      { title: 'Validation and gated submit', text: `The donate button disables for empty or sub-$1 amounts so a meaningless gift can never be submitted.` },
      { title: 'Accurate button total', text: `The donate button always shows the exact amount and frequency ("Donate $50 / month") at the point of action.` },
      { title: 'Single sync() source of truth', text: `One function keeps active states, total, frequency label, impact, and the gate consistent with the selection.` },
      { title: 'Brand-adaptable', text: `Configurable presets, impact copy, and a single accent color make it fit any cause.` },
    ],
    useCases: [
      { title: 'Nonprofit donation pages', text: `The core give form for charities and fundraising campaigns, with impact framing that lifts average gifts.` },
      { title: 'Creator and membership support', text: `Let supporters pick a one-time or monthly contribution — pair with a [waitlist signup](/ui-snippets/waitlist-signup/) or community flow.` },
      { title: 'Crowdfunding and campaigns', text: `Offer reward tiers as preset amounts with what each unlocks as the impact message.` },
      { title: 'Tip jars and pay-what-you-want', text: `Adapt the presets and copy for optional tipping on free or open-source products.` },
      { title: 'Event and gala fundraising', text: `Collect pledges with suggested amounts tied to specific outcomes, confirming each gift with an [animated success checkmark](/ui-snippets/animated-success-checkmark/).` },
      { title: 'Learning preset + custom input patterns', text: `A reference for mutually-exclusive preset/custom selection and live derived messaging — compare with a [tip calculator](/ui-snippets/tip-calculator/) for the percentage variant.` },
      { icon: 'CODE', title: 'Related: Form Change Diff Preview — Show Exactly What Will Change Before Saving', desc: 'See the [Form Change Diff Preview — Show Exactly What Will Change Before Saving](/ui-snippets/form-change-diff-preview/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a real payment processor?', a: `On submit, take the { amount, freq } and hand off to your processor: for Stripe, create a Checkout Session (one-time mode for "once", subscription mode for "monthly") and redirect, or use Payment Elements for an embedded flow; for PayPal, use their Donate SDK with the amount. Keep the selection in your form state and pass it to the processor's amount and recurrence parameters.` },
      { q: 'How do I choose good preset amounts?', a: `Tune the PRESETS array to your audience and historical average gift — a common approach places your current average in the middle of the ladder so it's a comfortable, anchored choice, with higher options that gently raise expectations. Test different ladders; the right presets for a grassroots cause differ from a large nonprofit. Avoid too many options (six is plenty) to prevent choice paralysis.` },
      { q: 'Why show impact messaging tied to the amount?', a: `Connecting a dollar figure to a concrete outcome ("a day of meals for a family of four") makes an abstract number feel meaningful and consistently increases giving. Keying the message to the nearest preset at or below the chosen amount means even custom values get a relevant, motivating message rather than a blank space.` },
      { q: 'How do I make the custom field and presets behave correctly together?', a: `Track a "custom" boolean: clicking a preset sets it false (and clears the custom input), while focusing or typing in the custom field sets it true (and deselects all presets). Drive the active highlight and the effective amount from that flag, so exactly one of the two is ever active — this prevents the confusing state where both a preset and a custom number appear selected.` },
      { q: 'How do I use this donation picker in React, Vue, or Angular?', a: `In React, hold amount, freq, and custom in useState and derive the total, impact, and validity with useMemo; in Vue, use ref()/computed(); in Angular, use component fields with getters. The impactFor() lookup and the preset/custom exclusivity logic are plain functions that port unchanged — only the per-interaction re-render moves into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the state flags by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the custom boolean keeps the preset tiles and the custom input mutually exclusive across the focus, input, and click handlers, and why impactFor() sorts PRESETS descending before its nearest-at-or-below lookup. The same assistant can help optimize it, for example checking whether calling sync() on every keystroke in the custom field is too aggressive or whether it should debounce for very rapid typing. It is also useful for extending the form: ask it to add a recurring-donation discount incentive, a currency selector that reformats amounts and impact copy together, or a progress bar toward a campaign's fundraising goal. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a donation amount picker form in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A one-time versus monthly frequency toggle built from two real buttons in a role="radiogroup" container, where clicking one visually marks it active and the other inactive.
- A grid of preset amount buttons generated from a single array of numbers, with the currently selected preset visually distinguished, and a separate custom amount input field with a currency symbol prefix.
- A single boolean flag that tracks whether the custom field or a preset is the active source of the amount: clicking a preset must set that flag false and clear the custom input's value; focusing or typing into the custom field must set the flag true and visually deselect every preset button, so the two input methods can never both appear selected at once.
- A lookup that maps each preset amount to a specific, concrete impact sentence, and a function that finds the impact message for the nearest preset at or below whatever amount is currently selected, including custom amounts that fall between or above the presets.
- A single synchronization function that is the only place allowed to update the DOM: it reads the current amount, frequency, and custom flag and from those values alone updates every active/inactive class, the submit button's displayed total and frequency suffix, the impact message text, and whether the submit button is disabled for an invalid amount.
- A submit handler that prevents default page navigation and, instead of actually charging a card, logs or displays the final { amount, frequency } pair as a placeholder for handing off to a real payment processor.`,
    },
  },
};

export default donationAmountPicker;
