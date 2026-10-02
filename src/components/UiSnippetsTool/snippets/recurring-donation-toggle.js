const recurringDonationToggle = {
  id: 'recurring-donation-toggle',
  title: 'One-Time vs Monthly Donation Toggle',
  lastmod: '2026-08-22',
  category: 'forms',
  cdnUrls: [],
  html: `<form class="rdt-card" id="rdtForm">
  <div class="rdt-toggle" role="radiogroup" aria-label="Donation frequency">
    <button type="button" class="rdt-toggle-btn" data-freq="once">One-time</button>
    <button type="button" class="rdt-toggle-btn active" data-freq="monthly">Monthly</button>
    <span class="rdt-toggle-thumb" id="rdtThumb"></span>
  </div>

  <p class="rdt-framing" id="rdtFraming">Give monthly and multiply your impact all year</p>

  <div class="rdt-amounts" id="rdtAmounts"></div>

  <div class="rdt-custom">
    <span class="rdt-currency">$</span>
    <input type="number" id="rdtCustomInput" min="1" step="1" placeholder="Custom amount">
  </div>

  <div class="rdt-annual" id="rdtAnnual"></div>

  <button type="submit" class="rdt-submit" id="rdtSubmit">Donate <b id="rdtBtnAmount">$20/mo</b></button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#fdf4ff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:40px 20px}

.rdt-card{background:#fff;border-radius:18px;padding:24px;width:100%;max-width:380px;box-shadow:0 20px 50px rgba(112,26,117,.1)}

.rdt-toggle{position:relative;display:flex;background:#f3e8ff;border-radius:12px;padding:4px;margin-bottom:14px}
.rdt-toggle-btn{flex:1;position:relative;z-index:1;border:none;background:none;padding:11px;border-radius:9px;font-size:13.5px;font-weight:700;color:#7e22ce;cursor:pointer;transition:color .2s}
.rdt-toggle-btn.active{color:#fff}
.rdt-toggle-thumb{position:absolute;top:4px;left:4px;width:calc(50% - 4px);height:calc(100% - 8px);background:linear-gradient(135deg,#a855f7,#7e22ce);border-radius:9px;transition:transform .25s cubic-bezier(.4,0,.2,1);transform:translateX(100%)}

.rdt-framing{font-size:13px;color:#86198f;font-weight:600;text-align:center;margin-bottom:16px;min-height:18px}

.rdt-amounts{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin-bottom:9px}
.rdt-amt{border:1.5px solid #e9d5ff;background:#fff;border-radius:10px;padding:12px 0;font-size:14px;font-weight:800;color:#581c87;cursor:pointer;transition:border-color .15s,background .15s}
.rdt-amt:hover{border-color:#d8b4fe}
.rdt-amt.active{border-color:#a855f7;background:#faf5ff;color:#7e22ce}

.rdt-custom{display:flex;align-items:center;border:1.5px solid #e9d5ff;border-radius:10px;padding:0 12px;margin-bottom:12px}
.rdt-custom:focus-within{border-color:#a855f7;box-shadow:0 0 0 3px rgba(168,85,247,.12)}
.rdt-currency{font-size:14px;font-weight:800;color:#c084fc}
.rdt-custom input{flex:1;border:none;outline:none;padding:11px 6px;font-size:14px;font-weight:700;color:#581c87;font-family:inherit}

.rdt-annual{font-size:12.5px;color:#7e22ce;font-weight:600;background:#faf5ff;border:1px dashed #e9d5ff;border-radius:8px;padding:9px 12px;margin-bottom:16px;line-height:1.4;min-height:36px;display:flex;align-items:center;justify-content:center;text-align:center}

.rdt-submit{width:100%;background:linear-gradient(135deg,#a855f7,#7e22ce);color:#fff;border:none;border-radius:10px;padding:13px;font-size:15px;font-weight:700;cursor:pointer;transition:opacity .15s}
.rdt-submit:hover{opacity:.9}
.rdt-submit b{font-weight:800}`,

  js: `var PRESETS_ONCE = [25, 50, 100, 250, 500, 1000];
var PRESETS_MONTHLY = [10, 20, 35, 50, 75, 150];

var freq = 'monthly';
var amount = 20;
var custom = false;

var toggleEl = document.querySelector('.rdt-toggle');
var thumbEl = document.getElementById('rdtThumb');
var amountsEl = document.getElementById('rdtAmounts');
var customInput = document.getElementById('rdtCustomInput');
var framingEl = document.getElementById('rdtFraming');
var annualEl = document.getElementById('rdtAnnual');

function presets() { return freq === 'monthly' ? PRESETS_MONTHLY : PRESETS_ONCE; }

function renderAmounts() {
  amountsEl.innerHTML = presets().map(function (v) {
    var isActive = !custom && v === amount;
    return '<button type="button" class="rdt-amt' + (isActive ? ' active' : '') + '" data-amt="' + v + '">$' + v + '</button>';
  }).join('');
}

function sync() {
  toggleEl.querySelectorAll('.rdt-toggle-btn').forEach(function (b) {
    b.classList.toggle('active', b.dataset.freq === freq);
  });
  thumbEl.style.transform = freq === 'monthly' ? 'translateX(100%)' : 'translateX(0)';

  amountsEl.querySelectorAll('.rdt-amt').forEach(function (b) {
    b.classList.toggle('active', !custom && +b.dataset.amt === amount);
  });

  var valid = amount >= 1;

  if (freq === 'monthly') {
    framingEl.textContent = 'Give monthly and multiply your impact all year';
    annualEl.textContent = valid
      ? 'That\\'s $' + (amount * 12).toLocaleString('en-US') + ' a year in steady support — enough to fund ongoing programs, not just one-off gifts.'
      : 'Enter a monthly amount to see your annual impact.';
    document.getElementById('rdtBtnAmount').textContent = valid ? '$' + amount + '/mo' : '$0/mo';
  } else {
    framingEl.textContent = 'Every one-time gift helps right now';
    annualEl.textContent = valid
      ? 'A single $' + amount + ' gift, given today.'
      : 'Enter an amount to continue.';
    document.getElementById('rdtBtnAmount').textContent = valid ? '$' + amount : '$0';
  }

  document.getElementById('rdtSubmit').disabled = !valid;
}

toggleEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.rdt-toggle-btn');
  if (!btn || btn.dataset.freq === freq) return;
  freq = btn.dataset.freq;
  amount = presets()[1]; // land on the second preset (a comfortable mid default) when switching
  custom = false;
  customInput.value = '';
  renderAmounts();
  sync();
});

amountsEl.addEventListener('click', function (e) {
  var btn = e.target.closest('.rdt-amt');
  if (!btn) return;
  custom = false;
  amount = +btn.dataset.amt;
  customInput.value = '';
  sync();
});

customInput.addEventListener('input', function () {
  custom = true;
  amount = parseInt(this.value, 10) || 0;
  sync();
});

document.getElementById('rdtForm').addEventListener('submit', function (e) {
  e.preventDefault();
  var btn = document.getElementById('rdtSubmit');
  btn.textContent = '\\u2713 Thank you for your ' + (freq === 'monthly' ? 'monthly ' : '') + '$' + amount + ' gift!';
});

renderAmounts();
sync();`,

  seo: {
    title: 'One-Time vs Monthly Donation Toggle — Recurring Gift Form HTML CSS JS',
    description: `A donation form where switching to Monthly swaps the preset amounts and shows a live annual-impact figure. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'One-Time vs Monthly Donation Toggle — Presets and Framing That Adapt to Frequency',
      description: `Recurring donors are worth dramatically more to a nonprofit than one-time givers, but most donation forms treat "monthly" as an afterthought checkbox next to the real decision. This snippet flips that: a sliding pill toggle switches the entire form's context — different preset amounts, different framing copy, and a live annual-impact number — so monthly giving feels like the natural default rather than an upsell.

**Two preset ladders, not one**

A one-time gift and a monthly gift at the same dollar figure mean very different things, so this form uses separate preset arrays: \`PRESETS_ONCE\` runs \$25–\$1,000, while \`PRESETS_MONTHLY\` runs \$10–\$150 — smaller numbers that feel sustainable as an ongoing commitment. Switching frequency swaps the whole grid and lands on a sensible mid-range default rather than leaving a now-irrelevant amount selected.

**Framing copy that matches the commitment**

Above the amounts, a single line of copy changes with the toggle — "Give monthly and multiply your impact all year" versus "Every one-time gift helps right now" — reinforcing why someone would pick each option rather than just labeling it.

**The annual-impact number is the real payoff**

The centerpiece is the box below the custom field: for monthly giving, it recalculates \`amount × 12\` live as you change the amount, turning an abstract "\$20/month" into a concrete "\$240 a year in steady support." That reframing is one of the most effective levers in recurring-gift design — donors chronically underestimate their own annual commitment until it's spelled out, and seeing the yearly total tends to *increase* completions rather than scare people off, because it makes the value of sustained giving tangible.

**Mutually exclusive presets and custom field**

As in a standard amount picker, a \`custom\` boolean keeps the preset grid and the custom input from both appearing selected — picking a preset clears the custom field, typing in the custom field deselects every preset — and the annual-impact math runs off whichever is currently the source of truth, custom values included.

**One sync(), every visual consistent**

The toggle thumb position, active preset, framing copy, annual-impact text, and submit button label are all derived inside a single \`sync()\` call from three plain variables: \`freq\`, \`amount\`, and \`custom\`. Nothing can drift out of sync because nothing is set directly outside that function.

**Customizing it**

Tune both preset ladders to your donor base, adjust the annual-impact copy, or add a second framing line about compounding impact. Pair it with a [donation thermometer](/ui-snippets/donation-thermometer/) to show campaign progress, or a [progress bar](/ui-snippets/progress-bar/) for a goal tracker.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A donation form loads with Monthly selected and $20/mo as the default.` },
      { title: 'Toggle to One-time', text: `The thumb slides, presets swap to larger one-time amounts, and framing copy changes.` },
      { title: 'Pick a preset or type a custom amount', text: `The submit button and annual-impact box update live.` },
      { title: 'Toggle back to Monthly', text: `Watch the annual-impact figure recalculate as amount × 12.` },
      { title: 'Tune PRESETS_ONCE and PRESETS_MONTHLY', text: `Set amount ladders that fit your donor base for each frequency.` },
      { title: 'Wire the submit handler', text: `Replace the demo confirmation with your payment processor call.` },
    ] },
    features: [
      { title: 'Sliding pill toggle', text: `A CSS-transformed thumb visually confirms the selected frequency.` },
      { title: 'Frequency-specific presets', text: `Separate amount ladders for one-time and monthly avoid mismatched anchoring.` },
      { title: 'Adaptive framing copy', text: `The headline above the amounts changes to match the chosen frequency.` },
      { title: 'Live annual-impact math', text: `Monthly amount × 12 recalculates instantly as the amount changes.` },
      { title: 'Mutually exclusive custom field', text: `A single flag prevents presets and custom input from both appearing active.` },
      { title: 'Smart default on switch', text: `Switching frequency lands on a sensible mid-range preset, not a stale amount.` },
      { title: 'Accurate submit label', text: `The button always shows the exact amount and frequency about to be charged.` },
      { title: 'Single sync() source of truth', text: `One function keeps every visual consistent with three plain state variables.` },
    ],
    useCases: [
      { title: 'Nonprofit donation pages', text: 'Nudge donors towards recurring gifts, with a sliding pill toggle that swaps one-time and monthly amount ladders.' },
      { title: 'Creator memberships', text: 'Adapt for supporter tiers, with headline copy changing to match the chosen frequency instead of an afterthought checkbox.' },
      { title: 'Advocacy and campaign giving', text: 'Pair with a [petition signature counter](/ui-snippets/petition-signature-counter/) so advocacy supporters can sign a petition and then give monthly.' },
      { title: 'Crowdfunding platforms', text: 'Offer sustaining backers alongside one-time pledges, showing a live annual impact figure of monthly amount times twelve.' },
      { title: 'Media drives and amount picking', text: 'Run the classic sustaining member prompt, or combine with a [donation amount picker](/ui-snippets/donation-amount-picker/) and learn state-driven frequency toggles.' },
    ],
    faqs: [
      { q: 'Why use two separate preset arrays instead of one?', a: `A one-time gift and a recurring monthly gift at the same number mean very different commitments, so anchoring donors with the same ladder for both undersells monthly giving or oversells one-time giving. PRESETS_MONTHLY uses smaller, sustainable-feeling numbers ($10–$150) while PRESETS_ONCE uses larger one-off amounts ($25–$1,000), so each ladder anchors appropriately for its context.` },
      { q: 'How is the annual-impact figure calculated?', a: `It is simply the current monthly amount multiplied by 12, recalculated on every sync() call — so it updates live whether the amount came from a preset click or typing in the custom field. This reframes an easy-to-dismiss "$20 a month" into its real yearly total, which research on recurring giving shows tends to make the commitment feel more concrete and worthwhile rather than deterring signups.` },
      { q: 'What happens to the selected amount when I switch frequency?', a: `Switching frequency resets both the custom flag and the amount to the second preset in the new ladder (a moderate default), rather than keeping a now out-of-context number selected — for example switching from a $500 one-time amount to Monthly would not carry over as $500/month. The amount grid and framing copy re-render immediately.` },
      { q: 'How do I keep the custom field and presets from both looking selected?', a: `A single custom boolean is the source of truth: clicking a preset sets it false and clears the custom input; typing in the custom field sets it true. The active class on every preset button is only applied when custom is false and its value matches amount, so exactly one input method is ever highlighted.` },
      { q: 'How do I use this toggle in React, Vue, or Angular?', a: `Hold freq, amount, and custom in component state and derive the preset list, framing copy, annual-impact text, and button label with a memoized/computed value keyed to those three. The renderAmounts() and sync() functions map directly to that derived-state pattern — only the DOM-writing lines change to framework bindings.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the frequency-dependent state by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how switching the toggle swaps both the preset amount array and the framing copy from the same freq variable, and why the annual-impact calculation only appears for the monthly path. The same assistant can help optimize it — for example asking whether the smart default (landing on the second preset after a frequency switch) is the right choice versus remembering the last amount per frequency. It's also useful for extending the form: ask it to add a "how many people you'll help" impact translation like the donation-amount-picker snippet, a subtle incentive badge for monthly givers, or per-frequency validation minimums. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "one-time vs monthly" donation frequency toggle form in plain HTML, CSS, and JavaScript with no library.

Requirements:
- A sliding pill-style toggle with two buttons (One-time, Monthly) where an absolutely positioned thumb element visually slides behind the active button using a CSS transform transition, and the buttons' text color changes to reflect which is active.
- Two separate arrays of preset dollar amounts, one for one-time gifts (larger figures) and one for monthly gifts (smaller, sustainable figures), where switching the toggle regenerates the preset button grid from the array matching the newly selected frequency and resets the selection to a sensible default from that new array.
- A line of framing copy above the amounts that changes text depending on the selected frequency (for example emphasizing sustained impact for monthly versus immediate impact for one-time).
- A custom amount input that behaves as the mutually exclusive alternative to the preset buttons (a single boolean flag tracks which is the active source, matching a standard preset/custom pattern), whose value participates in all the same calculations as a selected preset.
- A live "annual impact" display that, only when the Monthly frequency is selected, multiplies the current amount by 12 and displays it as a concrete yearly total, recalculating instantly as the amount changes via either presets or the custom field; when One-time is selected this area instead shows a simple one-line acknowledgment of the single gift.
- A single synchronization function that is the only place allowed to update the DOM, deriving the toggle thumb position, active preset highlighting, framing copy, annual-impact text, and the submit button's displayed amount-and-frequency label purely from the current frequency, amount, and custom-flag state.`,
    },
  },
};

export default recurringDonationToggle;
