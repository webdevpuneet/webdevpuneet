const expenseSplitCalculator = {
  id: 'expense-split-calculator',
  title: 'Expense Split Calculator',
  lastmod: '2026-08-22',
  category: 'tools',
  cdnUrls: [],
  html: `<section class="esc-wrap">
  <div class="esc-card">
    <h2>Split an expense</h2>

    <div class="esc-field">
      <label for="escTotal">Total amount</label>
      <div class="esc-input-wrap">
        <span>$</span>
        <input type="number" id="escTotal" value="240.00" min="0" step="0.01">
      </div>
    </div>

    <div class="esc-field">
      <label>Tip</label>
      <div class="esc-tip-row">
        <button type="button" class="esc-tip-btn" data-tip="0">0%</button>
        <button type="button" class="esc-tip-btn" data-tip="10">10%</button>
        <button type="button" class="esc-tip-btn active" data-tip="15">15%</button>
        <button type="button" class="esc-tip-btn" data-tip="20">20%</button>
        <input type="number" id="escTipCustom" class="esc-tip-custom" placeholder="Custom %" min="0">
      </div>
    </div>

    <div class="esc-mode-row">
      <button type="button" class="esc-mode-btn active" id="escEqualModeBtn">Equal split</button>
      <button type="button" class="esc-mode-btn" id="escUnequalModeBtn">Unequal split</button>
    </div>

    <div class="esc-equal" id="escEqualPanel">
      <label>Number of people</label>
      <div class="esc-stepper">
        <button type="button" id="escMinus" aria-label="Fewer people">−</button>
        <span id="escPeopleCount">4</span>
        <button type="button" id="escPlus" aria-label="More people">+</button>
      </div>
    </div>

    <div class="esc-unequal" id="escUnequalPanel" hidden>
      <div class="esc-people-list" id="escPeopleList"></div>
      <button type="button" class="esc-add-person" id="escAddPerson">+ Add person</button>
      <div class="esc-validation" id="escValidation"></div>
    </div>

    <div class="esc-totals">
      <div class="esc-totals-row"><span>Subtotal</span><span id="escSubtotalOut">$0.00</span></div>
      <div class="esc-totals-row"><span>Tip</span><span id="escTipOut">$0.00</span></div>
      <div class="esc-totals-row esc-grand"><span>Total</span><span id="escGrandOut">$0.00</span></div>
    </div>

    <div class="esc-result" id="escEqualResult">
      <span>Each person owes</span>
      <strong id="escPerPerson">$0.00</strong>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#131d33,#04070f 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.esc-wrap{width:100%;max-width:400px}
.esc-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:22px}
.esc-card h2{font-size:17px;font-weight:800;margin-bottom:18px;letter-spacing:-.01em}
.esc-field{margin-bottom:16px}
.esc-field label{display:block;font-size:11.5px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;color:#8b96b8;margin-bottom:7px}
.esc-input-wrap{display:flex;align-items:center;border:1.5px solid rgba(255,255,255,.14);border-radius:10px;padding:0 12px;background:rgba(255,255,255,.03);transition:border-color .15s}
.esc-input-wrap:focus-within{border-color:#818cf8}
.esc-input-wrap span{font-size:14px;font-weight:700;color:#7b86a8}
.esc-input-wrap input{border:none;outline:none;background:transparent;padding:11px 6px;font-size:15px;font-weight:700;color:#fff;font-family:inherit;width:100%}
.esc-tip-row{display:flex;gap:7px;flex-wrap:wrap}
.esc-tip-btn{flex:1;min-width:48px;border:1.5px solid rgba(255,255,255,.14);border-radius:9px;background:rgba(255,255,255,.03);padding:9px 0;font-size:12.5px;font-weight:700;color:#c3cbe4;cursor:pointer;transition:background .15s,border-color .15s,color .15s}
.esc-tip-btn:hover{border-color:#818cf8}
.esc-tip-btn.active{background:linear-gradient(135deg,#818cf8,#6366f1);border-color:transparent;color:#fff}
.esc-tip-custom{flex:1.3;min-width:80px;border:1.5px solid rgba(255,255,255,.14);border-radius:9px;background:rgba(255,255,255,.03);color:#fff;padding:8px 8px;font-size:12.5px;text-align:center;font-family:inherit}
.esc-tip-custom:focus{outline:none;border-color:#818cf8}
.esc-mode-row{display:flex;gap:6px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.1);border-radius:11px;padding:4px;margin-bottom:16px}
.esc-mode-btn{flex:1;padding:9px 0;border:none;border-radius:8px;background:transparent;color:#9aa4c4;font:700 12px system-ui;cursor:pointer;transition:background .15s,color .15s}
.esc-mode-btn.active{background:rgba(129,140,248,.18);color:#c7cdfb}
.esc-stepper{display:flex;align-items:center;justify-content:center;gap:18px;border:1.5px solid rgba(255,255,255,.14);border-radius:10px;padding:9px}
.esc-stepper button{width:30px;height:30px;border-radius:50%;border:1.5px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);font-size:17px;font-weight:700;color:#a5b4fc;cursor:pointer;display:flex;align-items:center;justify-content:center}
.esc-stepper button:disabled{opacity:.35;cursor:not-allowed}
.esc-stepper span{font-size:16px;font-weight:800;min-width:18px;text-align:center}
.esc-equal{margin-bottom:16px}
.esc-unequal{margin-bottom:16px}
.esc-people-list{display:flex;flex-direction:column;gap:8px;margin-bottom:10px}
.esc-person-row{display:flex;align-items:center;gap:8px}
.esc-person-avatar{width:30px;height:30px;border-radius:50%;background:linear-gradient(135deg,#818cf8,#c084fc);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:800;flex-shrink:0}
.esc-person-name{flex:1;border:1.5px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.03);color:#fff;padding:8px 10px;font-size:12.5px;font-family:inherit}
.esc-person-name:focus{outline:none;border-color:#818cf8}
.esc-person-amt{width:92px;border:1.5px solid rgba(255,255,255,.14);border-radius:8px;background:rgba(255,255,255,.03);color:#fff;padding:8px 8px;font-size:12.5px;text-align:right;font-family:inherit}
.esc-person-amt:focus{outline:none;border-color:#818cf8}
.esc-person-remove{width:26px;height:26px;border-radius:7px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.03);color:#8b96b8;cursor:pointer;flex-shrink:0;font-size:14px;line-height:1}
.esc-person-remove:hover{color:#f87171;border-color:rgba(248,113,113,.4)}
.esc-add-person{width:100%;padding:9px;border-radius:9px;border:1.5px dashed rgba(255,255,255,.18);background:transparent;color:#a5b4fc;font:700 12px system-ui;cursor:pointer}
.esc-add-person:hover{background:rgba(129,140,248,.08)}
.esc-validation{margin-top:10px;font-size:12px;font-weight:700;text-align:center;padding:8px;border-radius:8px}
.esc-validation.ok{color:#4ade80;background:rgba(74,222,128,.1)}
.esc-validation.over{color:#f87171;background:rgba(248,113,113,.1)}
.esc-validation.under{color:#fbbf24;background:rgba(251,191,36,.1)}
.esc-totals{border-top:1px dashed rgba(255,255,255,.14);padding-top:14px;margin-bottom:14px}
.esc-totals-row{display:flex;justify-content:space-between;font-size:13px;color:#9aa4c4;margin-bottom:6px;font-variant-numeric:tabular-nums}
.esc-grand{font-size:15.5px;font-weight:800;color:#fff;margin-top:6px}
.esc-result{background:rgba(129,140,248,.12);border:1px solid rgba(129,140,248,.3);border-radius:11px;padding:13px 15px;display:flex;align-items:center;justify-content:space-between}
.esc-result span{font-size:12.5px;font-weight:700;color:#c7cdfb}
.esc-result strong{font-size:19px;color:#c7cdfb;font-variant-numeric:tabular-nums}`,

  js: `var totalInput = document.getElementById('escTotal');
var tipCustomInput = document.getElementById('escTipCustom');
var tipBtns = document.querySelectorAll('.esc-tip-btn');
var equalModeBtn = document.getElementById('escEqualModeBtn');
var unequalModeBtn = document.getElementById('escUnequalModeBtn');
var equalPanel = document.getElementById('escEqualPanel');
var unequalPanel = document.getElementById('escUnequalPanel');
var peopleCountEl = document.getElementById('escPeopleCount');
var minusBtn = document.getElementById('escMinus');
var plusBtn = document.getElementById('escPlus');
var peopleListEl = document.getElementById('escPeopleList');
var addPersonBtn = document.getElementById('escAddPerson');
var validationEl = document.getElementById('escValidation');
var subtotalOut = document.getElementById('escSubtotalOut');
var tipOut = document.getElementById('escTipOut');
var grandOut = document.getElementById('escGrandOut');
var equalResultEl = document.getElementById('escEqualResult');
var perPersonEl = document.getElementById('escPerPerson');

var mode = 'equal';
var tipPct = 15;
var peopleCount = 4;
var unequalPeople = [
  { name: 'Alex', amount: 60 },
  { name: 'Jordan', amount: 60 },
  { name: 'Sam', amount: 60 },
  { name: 'Riley', amount: 60 }
];

function money(n) { return '$' + n.toFixed(2); }
function initials(name) { return (name.trim().split(/\\s+/).map(function (w) { return w[0] || ''; }).join('') || '?').slice(0, 2).toUpperCase(); }

function setTip(pct, btn) {
  tipPct = pct;
  tipBtns.forEach(function (b) { b.classList.toggle('active', b === btn); });
  tipCustomInput.value = '';
  calculate();
}

tipBtns.forEach(function (btn) {
  btn.addEventListener('click', function () { setTip(+btn.dataset.tip, btn); });
});

tipCustomInput.addEventListener('input', function () {
  var v = parseFloat(tipCustomInput.value);
  if (!isNaN(v) && v >= 0) {
    tipPct = v;
    tipBtns.forEach(function (b) { b.classList.remove('active'); });
    calculate();
  }
});

totalInput.addEventListener('input', calculate);

function setMode(next) {
  mode = next;
  equalModeBtn.classList.toggle('active', mode === 'equal');
  unequalModeBtn.classList.toggle('active', mode === 'unequal');
  equalPanel.hidden = mode !== 'equal';
  unequalPanel.hidden = mode !== 'unequal';
  equalResultEl.hidden = mode !== 'equal';
  validationEl.hidden = mode !== 'unequal';
  if (mode === 'unequal') renderPeople();
  calculate();
}

equalModeBtn.addEventListener('click', function () { setMode('equal'); });
unequalModeBtn.addEventListener('click', function () { setMode('unequal'); });

minusBtn.addEventListener('click', function () {
  peopleCount = Math.max(1, peopleCount - 1);
  peopleCountEl.textContent = peopleCount;
  minusBtn.disabled = peopleCount <= 1;
  calculate();
});
plusBtn.addEventListener('click', function () {
  peopleCount = Math.min(30, peopleCount + 1);
  peopleCountEl.textContent = peopleCount;
  minusBtn.disabled = peopleCount <= 1;
  calculate();
});

function renderPeople() {
  peopleListEl.innerHTML = '';
  unequalPeople.forEach(function (p, i) {
    var row = document.createElement('div');
    row.className = 'esc-person-row';
    row.innerHTML =
      '<span class="esc-person-avatar">' + initials(p.name) + '</span>' +
      '<input class="esc-person-name" data-i="' + i + '" data-role="name" value="' + p.name.replace(/"/g, '&quot;') + '" placeholder="Name">' +
      '<input class="esc-person-amt" data-i="' + i + '" data-role="amount" type="number" min="0" step="0.01" value="' + p.amount + '">' +
      '<button type="button" class="esc-person-remove" data-i="' + i + '" aria-label="Remove">✕</button>';
    peopleListEl.appendChild(row);
  });
}

peopleListEl.addEventListener('input', function (e) {
  var i = +e.target.dataset.i;
  if (e.target.dataset.role === 'name') unequalPeople[i].name = e.target.value;
  if (e.target.dataset.role === 'amount') unequalPeople[i].amount = parseFloat(e.target.value) || 0;
  if (e.target.dataset.role === 'name') {
    var avatar = e.target.parentElement.querySelector('.esc-person-avatar');
    avatar.textContent = initials(e.target.value);
  }
  calculate();
});

peopleListEl.addEventListener('click', function (e) {
  if (e.target.classList.contains('esc-person-remove')) {
    var i = +e.target.dataset.i;
    unequalPeople.splice(i, 1);
    renderPeople();
    calculate();
  }
});

addPersonBtn.addEventListener('click', function () {
  unequalPeople.push({ name: 'Person ' + (unequalPeople.length + 1), amount: 0 });
  renderPeople();
  calculate();
});

function calculate() {
  var total = parseFloat(totalInput.value) || 0;
  var tipAmount = total * (tipPct / 100);
  var grand = total + tipAmount;

  subtotalOut.textContent = money(total);
  tipOut.textContent = money(tipAmount);
  grandOut.textContent = money(grand);

  if (mode === 'equal') {
    var per = peopleCount > 0 ? grand / peopleCount : 0;
    perPersonEl.textContent = money(per);
  } else {
    var sum = unequalPeople.reduce(function (s, p) { return s + p.amount; }, 0);
    var diff = grand - sum;
    if (Math.abs(diff) < 0.005) {
      validationEl.className = 'esc-validation ok';
      validationEl.textContent = 'Balanced — individual amounts match the total exactly.';
    } else if (diff < 0) {
      validationEl.className = 'esc-validation over';
      validationEl.textContent = 'Over by ' + money(Math.abs(diff)) + ' — individual amounts exceed the total.';
    } else {
      validationEl.className = 'esc-validation under';
      validationEl.textContent = 'Under by ' + money(diff) + ' — individual amounts fall short of the total.';
    }
  }
}

setMode('equal');
calculate();`,

  seo: {
    title: 'Expense Split Calculator — Free Equal & Unequal Bill Splitter',
    description: `A bill-splitting calculator with tip, an equal-split mode with a people stepper, and an unequal-split mode with named people and live over/under validation against the total. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Expense Split Calculator — Equal and Unequal Splits, With Real Validation Math',
      description: `Splitting a bill evenly is the easy case; the harder, more useful case is when one person had the extra appetizer and everyone needs to agree the numbers actually add up. This calculator handles both — an equal split with a tip and a people count, and an unequal split where each named person gets a custom amount that's validated live against the real total.

**Equal mode: total, tip, and people**

The total and tip percentage (four presets or a custom field) compute a grand total, which is then divided by the people-stepper count for a live per-person amount — the standard bill-split calculation, recomputed on every input change via a single \`calculate()\` function.

**Unequal mode: named people with real balance validation**

Toggling to unequal split swaps in a list of named people, each with an independently editable amount. The core of this mode is the validation math: \`var sum = unequalPeople.reduce((s, p) => s + p.amount, 0); var diff = grand - sum;\` — the actual signed difference between what the named amounts sum to and what the bill (plus tip) really comes to. A near-zero difference (within half a cent, to absorb floating-point rounding) reports balanced; a negative difference means the individual amounts *exceed* the total and reports "Over by \$X"; a positive difference reports "Under by \$X". This isn't a cosmetic check — it's the exact arithmetic a group needs before actually paying.

**Shared totals, mode-specific results**

Both modes share the same subtotal/tip/grand-total breakdown at the bottom; only the final result differs — a single per-person figure in equal mode, or the live balance message in unequal mode. Switching modes doesn't lose your total or tip settings, since both live in state independent of \`mode\`. Pair this with a [tip calculator](/ui-snippets/tip-calculator/) for a simpler single-purpose version, or a [currency converter](/ui-snippets/currency-converter/) for splitting a bill across currencies.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A $240 bill splits four ways with 15% tip by default.` },
      { title: 'Enter the total and tip', text: `Pick a preset percentage or type a custom one.` },
      { title: 'Adjust the people stepper', text: `The equal per-person amount recomputes live.` },
      { title: 'Switch to "Unequal split"', text: `Named people with individual amounts appear instead.` },
      { title: 'Edit names and amounts', text: `Add or remove people; each amount is independent.` },
      { title: 'Watch the validation message', text: `See exactly how far over or under the total you are.` },
    ] },
    features: [
      { title: 'Equal split mode', text: `Total plus tip, divided evenly by a people stepper.` },
      { title: 'Unequal split mode', text: `Named people, each with a custom individual amount.` },
      { title: 'Real balance validation', text: `Signed diff between summed amounts and the true total.` },
      { title: 'Four tip presets + custom', text: `0/10/15/20% or any typed percentage.` },
      { title: 'Live avatar initials', text: `Each person's avatar updates from their typed name.` },
      { title: 'Add/remove people', text: `Unequal list grows or shrinks with running validation.` },
      { title: 'Shared totals breakdown', text: `Subtotal, tip, and grand total under both modes.` },
      { title: 'Floating-point-safe check', text: `A half-cent tolerance avoids false "unbalanced" flags.` },
    ],
    useCases: [
      { title: 'Group dinner bills', text: 'Split a restaurant total with tip evenly using a people stepper and four tip presets, plus a custom percentage.' },
      { title: 'Shared trip expenses', text: 'Handle unequal shares when people ordered differently, with named people and individual amounts checked against the true total.' },
      { title: 'Roommate bills', text: 'Validate that everyone\'s share adds up, showing a signed difference when the summed amounts are over or under.' },
      { title: 'Party and event cost sharing', text: 'Collect named contributions with custom amounts, and use the live balance check so the host knows exactly what is still owed.' },
      { title: 'Multi-currency and tipping tools', text: 'Pair with a [currency converter](/ui-snippets/currency-converter/) for international trips, or alongside a [tip calculator](/ui-snippets/tip-calculator/) in a bill-splitting suite.' },
      { icon: 'CODE', title: 'Related: Half-Star Rating Input', desc: 'See the [Half-Star Rating Input](/ui-snippets/half-star-rating-input/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the unequal-split validation actually work?', a: `The code sums every named person's individual amount with unequalPeople.reduce((s, p) => s + p.amount, 0), then computes diff = grandTotal - sum. If the absolute difference is under half a cent (to absorb floating-point rounding), it reports "Balanced." A negative diff means the entered amounts add up to more than the real total, reported as "Over by $X"; a positive diff means they fall short, reported as "Under by $X" — the exact signed gap in both cases.` },
      { q: 'Why is there a half-cent tolerance instead of checking for an exact match?', a: `JavaScript floating-point arithmetic on decimal currency values (like 0.1 + 0.2) can produce results that are off by a fraction of a cent even when the numbers are conceptually equal. Checking Math.abs(diff) < 0.005 treats anything within half a cent as balanced, which is below any amount that would actually matter for splitting a real bill, while still catching genuine discrepancies.` },
      { q: 'Does switching between equal and unequal split lose my total or tip?', a: `No. The total amount and tip percentage are stored independently of which mode is active, so toggling between "Equal split" and "Unequal split" only changes which panel and result are shown — both modes calculate from the same live subtotal, tip, and grand total shown at the bottom.` },
      { q: 'Can I add or remove people in unequal mode?', a: `Yes. "+ Add person" appends a new named row with a default $0 amount, and each row has a remove button. Both re-render the list and immediately recalculate the validation message, so the balance check always reflects the current set of people and amounts.` },
      { q: 'How do I use this calculator in React, Vue, or Angular?', a: `Keep total, tip percentage, mode, people count, and the unequal-people array all in component state. Derive the grand total, per-person equal amount, and the unequal-mode sum/diff from that state with plain arithmetic (no need to store derived values separately) so every input change automatically recomputes the displayed results.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how the unequal-split validation computes diff = grandTotal - sum and why a small tolerance (half a cent) is used instead of a strict equality check against floating-point currency math. It's also useful for reasoning about state design — ask why total and tip are kept independent of which split mode is active, so switching modes never resets values the user already entered. For extensions, ask it to add a "split remaining evenly" button that distributes any unbalanced difference across people who haven't set a custom amount, add per-person percentage-of-total display, or persist named people across sessions with localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "expense split calculator" in plain HTML, CSS, and JavaScript with two modes — no libraries.

Requirements:
- A total-amount currency input and a tip-percentage selector (a few preset percentage buttons plus a custom numeric input), which together compute a grand total (total + tip amount) shown in a totals breakdown (subtotal, tip, grand total).
- Equal-split mode (the default): a number-of-people stepper (increment/decrement buttons with a minimum of 1) whose count divides the grand total evenly, displayed live as a per-person amount that recalculates on every relevant input change.
- Unequal-split mode: a toggle that switches to a list of named people, each with their own editable name and individual currency amount, with add/remove controls to grow or shrink the list. Keep the shared total/tip settings unchanged when switching between modes.
- CRITICAL validation logic for unequal mode: sum every person's individual amount, compute the signed difference between that sum and the true grand total (grandTotal - sum), and display a clear status message showing whether the amounts are balanced (within a small floating-point tolerance like half a cent), over the total by a specific dollar amount, or under the total by a specific dollar amount — using the actual computed difference, not a placeholder.
- Give each person in unequal mode a small avatar showing their initials, derived live from their typed name.`,
    },
  },
};

export default expenseSplitCalculator;
