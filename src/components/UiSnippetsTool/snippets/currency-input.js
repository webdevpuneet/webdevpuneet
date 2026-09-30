const currencyInput = {
  id: 'currency-input',
  title: 'Currency Input',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="cu-card">
  <label class="cu-label" for="cuInput">Amount</label>
  <div class="cu-field">
    <span class="cu-symbol" id="cuSymbol">$</span>
    <input class="cu-input" id="cuInput" type="text" inputmode="decimal" placeholder="0.00" value="1,250.00" oninput="formatMoney(this)">
    <select class="cu-currency" id="cuCurrency" onchange="setCurrency(this)">
      <option value="$" data-code="USD">USD</option>
      <option value="€" data-code="EUR">EUR</option>
      <option value="£" data-code="GBP">GBP</option>
      <option value="₹" data-code="INR">INR</option>
      <option value="¥" data-code="JPY">JPY</option>
    </select>
  </div>

  <div class="cu-chips">
    <button class="cu-chip" onclick="setAmount(50)">+50</button>
    <button class="cu-chip" onclick="setAmount(100)">+100</button>
    <button class="cu-chip" onclick="setAmount(500)">+500</button>
    <button class="cu-chip" onclick="setAmount(1000)">+1,000</button>
  </div>

  <div class="cu-parsed">Stored value: <strong id="cuValue">1250.00</strong> <span id="cuCode">USD</span></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:80px 24px}
.cu-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:22px;width:100%;max-width:340px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.cu-label{display:block;font-size:12px;font-weight:700;color:#475569;margin-bottom:8px}

.cu-field{display:flex;align-items:center;gap:8px;border:1.5px solid #e2e8f0;border-radius:12px;padding:0 12px;height:54px;transition:border-color .15s,box-shadow .15s;background:#fff}
.cu-field:focus-within{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.cu-symbol{font-size:22px;font-weight:700;color:#94a3b8}
.cu-input{flex:1;min-width:0;border:none;outline:none;font-size:24px;font-weight:800;color:#1e293b;font-family:inherit;font-variant-numeric:tabular-nums;background:none}
.cu-input::placeholder{color:#cbd5e1;font-weight:600}
.cu-currency{border:none;background:#f1f5f9;border-radius:8px;padding:6px 6px;font-size:12px;font-weight:800;color:#475569;cursor:pointer;font-family:inherit;outline:none}

.cu-chips{display:flex;gap:7px;margin-top:14px}
.cu-chip{flex:1;padding:8px 0;background:#f1f5f9;border:none;border-radius:9px;font-size:12px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:background .15s,color .15s}
.cu-chip:hover{background:#eef2ff;color:#6366f1}
.cu-chip:active{transform:scale(.96)}

.cu-parsed{margin-top:16px;padding-top:14px;border-top:1px solid #f1f5f9;font-size:12px;color:#94a3b8}
.cu-parsed strong{color:#1e293b;font-weight:800;font-variant-numeric:tabular-nums}
.cu-parsed span{color:#6366f1;font-weight:700}`,

  js: `function formatMoney(input) {
  var raw = input.value.replace(/[^0-9.]/g, '');
  var firstDot = raw.indexOf('.');
  var intStr, decStr = '';
  if (firstDot === -1) {
    intStr = raw;
  } else {
    intStr = raw.slice(0, firstDot);
    decStr = '.' + raw.slice(firstDot + 1).replace(/\\./g, '').slice(0, 2);
  }
  intStr = intStr.replace(/^0+(?=\\d)/, '');
  if (intStr === '') intStr = firstDot === -1 ? '' : '0';
  intStr = intStr.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  input.value = intStr + decStr;
  updateParsed();
}

function updateParsed() {
  var num = parseFloat(document.getElementById('cuInput').value.replace(/,/g, '')) || 0;
  document.getElementById('cuValue').textContent = num.toFixed(2);
}

function setCurrency(select) {
  var opt = select.options[select.selectedIndex];
  document.getElementById('cuSymbol').textContent = select.value;
  document.getElementById('cuCode').textContent = opt.dataset.code;
}

function setAmount(delta) {
  var input = document.getElementById('cuInput');
  var num = (parseFloat(input.value.replace(/,/g, '')) || 0) + delta;
  input.value = num.toFixed(2);
  formatMoney(input);
}

updateParsed();`,

  seo: {
    title: 'Currency Input — Money Formatting HTML CSS JS Snippet',
    description: `Currency input that auto-formats as you type: thousands separators, two-decimal clamp, currency switcher & a clean stored value. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Currency Input — Live Thousands Separators, Decimal Clamping & Currency Switcher`,
      description: `Money inputs are deceptively tricky. Users expect to see "1,250.00" with thousands separators as they type, but your application needs the clean numeric value "1250.00" to store and calculate with. A naive \`<input type="number">\` cannot show grouping separators, and a plain text field lets users type anything. This snippet implements a proper currency field in plain HTML, CSS, and vanilla JavaScript: live thousands-separator formatting, a two-decimal clamp, a currency symbol switcher, quick-add chips, and a parsed value kept in sync for submission.

**Live formatting that keeps a clean stored value**

\`formatMoney\` runs on every keystroke. It strips everything except digits and a decimal point, splits at the first dot into integer and decimal parts, discards any extra dots, clamps the decimal to two places, and removes leading zeros. The integer part then gets thousands separators via the standard grouping regex \`/\\B(?=(\\d{3})+(?!\\d))/g\`, which inserts a comma before every group of three digits that is preceded by another digit. The formatted string goes back into the field, while \`updateParsed\` strips the commas and shows the canonical numeric value ("1250.00") — the value you would actually submit to a server.

**Why the display and stored value differ**

This separation is the core idea. The visible field is for humans (grouped, symbol-prefixed); the stored value is for machines (a plain number). Keeping both in sync on every input means the user never sees an unformatted number and your code never has to parse a comma-laden string at submit time — \`updateParsed\` already maintains the clean value.

**Currency switcher**

A compact \`<select>\` lets the user switch currency. \`setCurrency\` updates the prefix symbol ($, €, £, ₹, ¥) and the stored currency code shown beside the value. The symbol sits in the field as a prefix via flexbox, and \`:focus-within\` lights up the whole field (not just the bare input) so the symbol, input, and selector read as one control.

**Quick-add chips**

Buttons like "+50" and "+1,000" call \`setAmount\`, which reads the current numeric value, adds the delta, and re-runs \`formatMoney\` — handy for tip jars, top-ups, and donation fields where users nudge an amount rather than type it precisely.

**Mobile-friendly**

\`inputmode="decimal"\` brings up the numeric keypad on mobile while still allowing the formatted text value, the best of both worlds for a money field.

Pair this with an [order summary](/ui-snippets/order-summary/) for totals, a [tip calculator](/ui-snippets/tip-calculator/) or [currency converter](/ui-snippets/currency-converter/) for math, or a [checkout payment form](/ui-snippets/checkout-form/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A money field shows "$ 1,250.00" with a currency selector, quick-add chips, and a "Stored value: 1250.00 USD" readout.` },
      { title: 'Type an amount', text: `Enter digits — thousands separators appear automatically and the decimal is clamped to two places as you type.` },
      { title: 'Watch the stored value', text: `Below the field, the clean numeric value (no commas) updates live — that is what you would submit to a server.` },
      { title: 'Switch currency', text: `Pick EUR or INR from the selector — the prefix symbol and the currency code beside the stored value change.` },
      { title: 'Use the quick chips', text: `Click "+100" or "+1,000" to bump the amount; the field reformats with the new total.` },
      { title: 'Read it for submission', text: `On submit, use the parsed value (\`updateParsed\` keeps it in sync) instead of the comma-formatted display string.` },
    ] },
    features: [
      { title: 'Live thousands separators', text: `The grouping regex \`/\\B(?=(\\d{3})+(?!\\d))/g\` inserts commas before every three-digit group as the user types — no library.` },
      { title: 'Display vs stored value', text: `The field shows a grouped, symbol-prefixed string while \`updateParsed\` maintains the clean numeric value ("1250.00") for submission.` },
      { title: 'Two-decimal clamp', text: `\`formatMoney\` splits at the first dot, drops extra dots, and limits the decimal to two places, so amounts stay valid.` },
      { title: 'Leading-zero cleanup', text: `Leading zeros are stripped from the integer part so "007" becomes "7" while an in-progress "0." is preserved.` },
      { title: 'Currency switcher', text: `A \`<select>\` updates the prefix symbol ($/€/£/₹/¥) and the displayed currency code via \`setCurrency\`.` },
      { title: 'Unified focus ring', text: `\`:focus-within\` highlights the whole field — symbol, input, and selector — so the composite reads as one control.` },
      { title: 'Quick-add chips', text: `\`setAmount\` adds a delta to the current value and reformats, ideal for tips, top-ups, and donations.` },
      { title: 'Mobile numeric keypad', text: `\`inputmode="decimal"\` triggers the numeric keypad on phones while keeping the formatted text value.` },
    ],
    useCases: [
      { title: 'Checkout and payment amounts', text: `Enter a custom charge or payment with proper grouping. Combine with a [checkout payment form](/ui-snippets/checkout-form/) and [order summary](/ui-snippets/order-summary/).` },
      { title: 'Donation and tip fields', text: `Quick-add chips make it easy to bump a donation; pair with a [tip calculator](/ui-snippets/tip-calculator/) for split math.` },
      { title: 'Budgeting and finance apps', text: `Money inputs for budgets, transfers, and goals where grouped display and a clean stored value both matter.` },
      { title: 'Invoicing and quoting tools', text: `Enter line-item amounts that feed an [invoice preview](/ui-snippets/invoice-preview/) total with consistent formatting.` },
      { title: 'Pricing and quote calculators', text: `Drive a [usage calculator](/ui-snippets/usage-calculator/) or [currency converter](/ui-snippets/currency-converter/) from a properly formatted amount field.` },
      { title: 'Crypto and multi-currency wallets', text: `The currency switcher adapts the symbol/code; extend the decimals for high-precision assets.` },
      { icon: 'CODE', title: 'Related: Email Composer', desc: 'See the [Email Composer](/ui-snippets/email-composer/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I get the numeric value to submit?', a: `Use the parsed value, not the formatted text. \`updateParsed\` already computes \`parseFloat(value.replace(/,/g, ''))\` and shows it; read that on submit, or store it in a hidden input. Never send the comma-formatted display string to your backend — strip the separators first so "1,250.00" becomes the number 1250.` },
      { q: 'How do I support locales that use different separators?', a: `Some locales use "." for grouping and "," for decimals (e.g. 1.250,00). Map each currency/locale to its separators and parameterise \`formatMoney\` accordingly, or use \`Intl.NumberFormat(locale, { style: 'currency', currency })\` to format and a matching parser to read it back. The display/stored-value split stays the same.` },
      { q: 'Why does the cursor jump to the end while typing?', a: `Reformatting replaces the field value, which resets the caret. This snippet keeps it simple (caret at end), which is fine for amount fields typed left-to-right. To preserve caret position precisely, count the digits before the caret, reformat, then restore the caret after the same number of digits using \`setSelectionRange\`.` },
      { q: 'How do I enforce a maximum amount or minimum?', a: `In \`updateParsed\`, after computing the number, clamp it (e.g. \`Math.min(num, MAX)\`) and, if it changed, reformat the field to the clamped value and show a hint. For minimums, validate on blur rather than per keystroke so users can type intermediate values without being interrupted.` },
      { q: 'How do I use this currency input in React, Vue, or Angular?', a: `In React, keep the raw numeric value in state and a derived formatted string for display; format in the \`onChange\` handler before setting state, or use a controlled value with a formatter. In Vue, use \`v-model\` with a computed/watcher that formats. In Angular, a custom \`ControlValueAccessor\` or a pipe handles formatting. The grouping regex and decimal logic port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the regex by eye to trust it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the grouping regex in formatMoney matches and why it inserts commas only before digit groups that already have another digit ahead of them. The same assistant can help you optimize it — ask whether reformatting on every keystroke could be debounced for very long numbers without hurting the live-typing feel, or whether the caret-jumps-to-end behavior is worth fixing with setSelectionRange for a smoother typing experience. It's also useful for extending the field: ask it to add locale-aware separators for currencies that use a comma as the decimal point instead of the thousands separator, a maximum-amount clamp with an inline warning, or a hidden input that always mirrors the clean numeric value for native form submission. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a currency input field in plain HTML, CSS, and JavaScript that live-formats as the user types — no input masking library.

Requirements:
- A text input (not type="number", so grouping characters can be displayed) with inputmode="decimal" so mobile devices show a numeric keypad.
- A formatMoney function that runs on every input event: strip everything except digits and a single decimal point, split at the first decimal point into an integer part and a decimal part, discard any additional decimal points typed, and clamp the decimal part to at most two digits.
- Strip leading zeros from the integer part (so "007" becomes "7") while still allowing an in-progress value like "0." to remain as the user types it.
- Insert thousands-separator commas into the integer part using a regex that only inserts a comma before a group of exactly three digits that itself has at least one more digit before it, so the grouping never puts a stray comma at the very start of the number.
- Maintain a second, separate "stored value" display element that always shows the clean unformatted number (no commas) parsed from the visible field, so the UI clearly demonstrates the difference between what the user sees and what a server would actually receive.
- Add a currency selector that changes both a prefix symbol shown inside the field and a currency code shown next to the stored value, and style the field so the whole composite control (symbol, input, and selector) highlights together on focus.
- Add a few quick-add chip buttons that add a fixed delta to the current numeric value and re-run the formatter.`,
    },
  },
};

export default currencyInput;
