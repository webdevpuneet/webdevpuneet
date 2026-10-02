const currencyConverter = {
  id: 'currency-converter',
  title: 'Currency Converter Widget',
  lastmod: '2026-06-13',
  category: 'tools',
  html: `<div class="widget">
  <div class="widget-header">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8.5 9.5h5a1.5 1.5 0 0 1 0 3h-3a1.5 1.5 0 0 0 0 3H15"/></svg>
    Currency Converter
    <span class="live-badge">Live Rates</span>
  </div>
  <div class="amount-row">
    <label class="field-label">Amount</label>
    <input type="number" class="amount-input" id="amountInput" value="100" min="0" step="any" oninput="convert()">
  </div>
  <div class="currency-row">
    <div class="currency-field">
      <label class="field-label">From</label>
      <select class="currency-select" id="fromCurrency" onchange="convert()">
        <option value="USD" selected>🇺🇸 USD — US Dollar</option>
        <option value="EUR">🇪🇺 EUR — Euro</option>
        <option value="GBP">🇬🇧 GBP — British Pound</option>
        <option value="JPY">🇯🇵 JPY — Japanese Yen</option>
        <option value="CAD">🇨🇦 CAD — Canadian Dollar</option>
        <option value="AUD">🇦🇺 AUD — Australian Dollar</option>
        <option value="INR">🇮🇳 INR — Indian Rupee</option>
        <option value="CHF">🇨🇭 CHF — Swiss Franc</option>
        <option value="CNY">🇨🇳 CNY — Chinese Yuan</option>
        <option value="SGD">🇸🇬 SGD — Singapore Dollar</option>
      </select>
    </div>
    <button class="swap-btn" onclick="swapCurrencies()" aria-label="Swap currencies" title="Swap currencies">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M7 16V4m0 0L3 8m4-4l4 4"/><path d="M17 8v12m0 0l4-4m-4 4l-4-4"/></svg>
    </button>
    <div class="currency-field">
      <label class="field-label">To</label>
      <select class="currency-select" id="toCurrency" onchange="convert()">
        <option value="USD">🇺🇸 USD — US Dollar</option>
        <option value="EUR" selected>🇪🇺 EUR — Euro</option>
        <option value="GBP">🇬🇧 GBP — British Pound</option>
        <option value="JPY">🇯🇵 JPY — Japanese Yen</option>
        <option value="CAD">🇨🇦 CAD — Canadian Dollar</option>
        <option value="AUD">🇦🇺 AUD — Australian Dollar</option>
        <option value="INR">🇮🇳 INR — Indian Rupee</option>
        <option value="CHF">🇨🇭 CHF — Swiss Franc</option>
        <option value="CNY">🇨🇳 CNY — Chinese Yuan</option>
        <option value="SGD">🇸🇬 SGD — Singapore Dollar</option>
      </select>
    </div>
  </div>
  <div class="result-box" id="resultBox">
    <div class="result-amount" id="resultAmount">92.10</div>
    <div class="result-label" id="resultLabel">100 USD = 92.10 EUR</div>
  </div>
  <div class="rate-row">
    <span class="rate-text" id="rateText">1 USD = 0.921 EUR</span>
    <span class="updated-text">Rates updated Jun 2026</span>
  </div>
  <div class="popular-pairs">
    <span class="pair-label">Popular:</span>
    <button class="pair-btn" onclick="setQuick('USD','EUR')">USD/EUR</button>
    <button class="pair-btn" onclick="setQuick('USD','GBP')">USD/GBP</button>
    <button class="pair-btn" onclick="setQuick('EUR','JPY')">EUR/JPY</button>
    <button class="pair-btn" onclick="setQuick('USD','INR')">USD/INR</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.widget { background: #fff; border-radius: 20px; box-shadow: 0 20px 60px rgba(0,0,0,0.2); padding: 24px; width: 100%; max-width: 380px; }
.widget-header { display: flex; align-items: center; gap: 8px; font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 20px; }
.widget-header svg { color: #7c3aed; }
.live-badge { margin-left: auto; font-size: 10px; font-weight: 700; background: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 20px; }
.field-label { display: block; font-size: 11px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px; }
.amount-row { margin-bottom: 14px; }
.amount-input { width: 100%; padding: 10px 14px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 20px; font-weight: 700; color: #111827; outline: none; transition: border-color 0.2s; -moz-appearance: textfield; }
.amount-input::-webkit-outer-spin-button, .amount-input::-webkit-inner-spin-button { -webkit-appearance: none; }
.amount-input:focus { border-color: #7c3aed; }
.currency-row { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 16px; }
.currency-field { flex: 1; }
.currency-select { width: 100%; padding: 9px 10px; border: 2px solid #e5e7eb; border-radius: 10px; font-size: 13px; font-weight: 600; color: #374151; background: #fff; cursor: pointer; outline: none; transition: border-color 0.2s; appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2.5' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 10px center; padding-right: 28px; }
.currency-select:focus { border-color: #7c3aed; }
.swap-btn { display: flex; align-items: center; justify-content: center; width: 38px; height: 38px; border: 2px solid #e5e7eb; border-radius: 50%; background: #fff; color: #6b7280; cursor: pointer; transition: all 0.2s; flex-shrink: 0; margin-bottom: 2px; }
.swap-btn:hover { border-color: #7c3aed; color: #7c3aed; transform: rotate(180deg); }
.result-box { background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%); border-radius: 12px; padding: 18px 20px; text-align: center; margin-bottom: 12px; }
.result-amount { font-size: 36px; font-weight: 800; color: #fff; line-height: 1; margin-bottom: 6px; }
.result-label { font-size: 13px; color: rgba(255,255,255,0.8); }
.rate-row { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
.rate-text { font-size: 12px; font-weight: 600; color: #374151; }
.updated-text { font-size: 11px; color: #9ca3af; }
.popular-pairs { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; }
.pair-label { font-size: 11px; color: #6b7280; font-weight: 500; }
.pair-btn { font-size: 11px; font-weight: 600; padding: 4px 10px; border: 1px solid #e5e7eb; border-radius: 20px; background: #f9fafb; color: #374151; cursor: pointer; transition: all 0.15s; }
.pair-btn:hover { border-color: #7c3aed; color: #7c3aed; background: #f5f3ff; }`,

  js: `const RATES = {
  USD: 1, EUR: 0.921, GBP: 0.789, JPY: 149.5,
  CAD: 1.364, AUD: 1.532, INR: 83.12, CHF: 0.898,
  CNY: 7.243, SGD: 1.348
};
const SYMBOLS = { USD:'$',EUR:'€',GBP:'£',JPY:'¥',CAD:'C$',AUD:'A$',INR:'₹',CHF:'Fr',CNY:'¥',SGD:'S$' };

function getRate(from, to) {
  return RATES[to] / RATES[from];
}

function fmt(num, decimals) {
  return num.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function convert() {
  const amount = parseFloat(document.getElementById('amountInput').value) || 0;
  const from = document.getElementById('fromCurrency').value;
  const to = document.getElementById('toCurrency').value;
  const rate = getRate(from, to);
  const result = amount * rate;
  const decimals = ['JPY','INR','CNY'].includes(to) ? 0 : 2;
  document.getElementById('resultAmount').textContent = (SYMBOLS[to] || '') + fmt(result, decimals);
  document.getElementById('resultLabel').textContent = fmt(amount,2) + ' ' + from + ' = ' + fmt(result, decimals) + ' ' + to;
  const rateDecimals = ['JPY','INR','CNY'].includes(to) ? 2 : 4;
  document.getElementById('rateText').textContent = '1 ' + from + ' = ' + fmt(rate, rateDecimals) + ' ' + to;
}

function swapCurrencies() {
  const fromSel = document.getElementById('fromCurrency');
  const toSel = document.getElementById('toCurrency');
  const tmp = fromSel.value;
  fromSel.value = toSel.value;
  toSel.value = tmp;
  convert();
}

function setQuick(from, to) {
  document.getElementById('fromCurrency').value = from;
  document.getElementById('toCurrency').value = to;
  convert();
}

convert();`,

  seo: {
    title: 'Currency Converter Widget — HTML CSS JS Snippet',
    description: 'Currency converter UI with 10 currencies, a swap button, live rate display, and pair shortcuts. Pure JS, hardcoded rates — exports to React, Vue & Angular.',
    about: {
      title: `Currency Converter Widget — Cross-Rate Calculation, Swap Rotation & Pair Shortcuts`,
      description: `A currency converter widget is a compact tool that lets users instantly convert a monetary amount between two selected currencies. While production converters fetch live exchange rates from APIs like Open Exchange Rates or Frankfurter, this snippet uses a hardcoded rates table keyed to a base currency (USD), which makes it self-contained and ideal for prototyping, embedding in dashboards, or offline use.\n\n**How the rate calculation works**\n\nAll rates in the \`RATES\` object are expressed relative to USD (the base currency). To convert from any currency A to any currency B: multiply the amount by \`RATES[B] / RATES[A]\`. This two-step cross-rate calculation means you only need N rates (one per currency) rather than N×(N-1) direct pairs. For example, to convert 100 EUR to GBP: \`100 * (0.789 / 0.921) = 85.67\`. This is the same approach used by most financial APIs which return rates relative to a single base.\n\n**HTML layout structure**\n\nThe widget uses a single-column card layout. The amount input sits above the currency row. The currency row is a three-item flex container: left currency selector, swap button, right currency selector. The swap button is centered vertically by aligning it to \`flex-end\` of the row and giving it a fixed size with margin adjustment. This three-element flex pattern avoids absolute positioning while keeping the button between the two selects.\n\n**Custom select styling**\n\nThe \`<select>\` elements use \`appearance: none\` to remove the browser's native dropdown arrow, replaced by an inline SVG chevron injected via \`background-image: url("data:image/svg+xml,...")\`. The SVG is URL-encoded inline so no external assets are needed. \`background-position: right 10px center\` and \`padding-right: 28px\` ensure the arrow is visible and text does not overlap it.\n\n**The swap button rotation**\n\nThe swap button's \`:hover\` state applies \`transform: rotate(180deg)\`. Because a CSS \`transition: all 0.2s\` is set on the button, the rotation animates smoothly on hover. This 180-degree rotation is a recognized affordance for swap/exchange actions (used by Google's currency converter and Yahoo Finance) — users intuitively understand the rotated arrows mean the direction has reversed.\n\n**Number formatting**\n\nThe \`fmt(num, decimals)\` helper uses \`Number.toLocaleString('en-US')\` with explicit \`minimumFractionDigits\` and \`maximumFractionDigits\`. This formats large numbers with commas (1,234.56) and respects the decimal precision per currency — Japanese Yen and Indian Rupee display 0 decimal places for the result but 2 for the rate, since sub-yen fractions are not meaningful in practice.\n\n**Currency symbol lookup**\n\nThe \`SYMBOLS\` object maps currency codes to their common symbols ($ £ € ¥ etc.). The result amount prepends this symbol: \`(SYMBOLS[to] || '') + fmt(result, decimals)\`. The \`|| ''\` fallback handles any future currency without a mapped symbol gracefully.\n\n**Popular pair shortcuts**\n\nThe quick-pair buttons at the bottom call \`setQuick(from, to)\` which programmatically sets both select values then calls \`convert()\`. This is a common UX shortcut in financial widgets — users typically switch between a small set of pairs and the shortcuts eliminate the need to interact with both dropdowns.\n\n**React integration**\n\nIn React, manage \`amount\`, \`fromCurrency\`, and \`toCurrency\` with \`useState\`. Derive \`result\` and \`rate\` with \`useMemo(() => getRate(fromCurrency, toCurrency), [fromCurrency, toCurrency])\`. For live rates, use \`useEffect\` to fetch from a free API like \`https://open.er-api.com/v6/latest/USD\` on mount and cache in state.\n\n**Connecting to a real API**\n\nReplace the \`RATES\` constant with a \`fetch\` call to any exchange rate API. Store the response in \`localStorage\` with a timestamp and only refetch when the cached data is older than 1 hour — exchange rates typically update once per hour at most, so aggressive polling wastes API quota. Display "Last updated: HH:MM" from the cached timestamp.\n\nSee also the [usage calculator snippet](/ui-snippets/usage-calculator/) for another financial calculation widget, the [donut chart snippet](/ui-snippets/donut-chart/) for visualizing currency composition, and the [metric card grid snippet](/ui-snippets/metric-card-grid/) for displaying multiple financial KPIs side by side.`
    },
    howToUse: [
      { title: 'Copy the HTML widget markup', text: 'The widget is self-contained. Paste the HTML into your page — all IDs must be preserved as the JavaScript targets them directly.' },
      { title: 'Add the CSS styles', text: 'Paste the CSS block. Change the gradient colors in .result-box and body to match your brand. The purple #7c3aed is used as the accent throughout.' },
      { title: 'Include the JavaScript', text: 'The JS block defines RATES (USD-based), SYMBOLS, and the convert/swap/setQuick functions. Call convert() at the end to show the initial result on load.' },
      { title: 'Update the rates table', text: 'Edit the RATES object with current exchange rates. All values must be relative to USD (1 USD = X currency). Add or remove entries to expand or shrink the currency list.' },
      { title: 'Connect to a live API', text: 'Replace the RATES constant with a fetch to an exchange rate API endpoint. Cache the response in localStorage with a timestamp to avoid re-fetching on every page load.' }
    ],
    features: [
      '10 currencies with flag emojis in select options',
      'Animated swap button with 180° CSS rotation on hover',
      'Cross-rate calculation from a single USD-base table',
      'Currency-aware decimal formatting (0 decimals for JPY/INR)',
      'Currency symbol prepended to result ($ £ € ¥)',
      'Popular pair shortcut buttons for quick switching',
      'Gradient result panel for visual emphasis',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '💱', title: 'Fintech dashboard widgets', desc: 'Add a compact conversion tool to a finance dashboard, with a swap button and live rate shown for the selected pair.' },
      { icon: '✈️', title: 'Travel planning apps', desc: 'Give travellers a quick reference for converting prices, with pair shortcuts for their most common routes.' },
      { icon: '🛒', title: 'International e-commerce', desc: 'Let shoppers see prices in their own currency, using a USD-base table to calculate cross rates between any two of ten currencies.' },
      { icon: '🧾', title: 'Freelancer invoice tools', desc: 'Embed a converter next to an invoice form, with currency-aware decimals such as zero for JPY and INR.' },
      { icon: '👥', title: 'Expense splitting pairing', desc: 'Combine with the [expense split calculator](/ui-snippets/expense-split-calculator/) when a group trip involves several currencies and one person fronted the bill.' },
      { icon: 'CODE', title: 'Related: Environment Switcher with Color-Coded Persistent Banner', desc: 'See the [Environment Switcher with Color-Coded Persistent Banner](/ui-snippets/environment-switcher-banner/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to a live exchange rate API?', a: 'Replace the RATES object with a fetch call to an API like open.er-api.com. Cache the response in localStorage with a timestamp and only refetch if older than 1 hour.' },
      { q: 'How do I use this currency converter in React?', a: 'Use useState for amount, fromCurrency, and toCurrency. Derive result with useMemo. For live rates, use useEffect to fetch on mount and store in state.' },
      { q: 'Can I add more currencies?', a: 'Yes — add the currency code to the RATES object (as a USD-relative rate), add its symbol to SYMBOLS, and add an option element to both select elements.' },
      { q: 'How do I show the inverse rate as well?', a: 'After calculating rate = RATES[to] / RATES[from], also compute inverseRate = 1 / rate and display "1 EUR = 1.086 USD" below the main rate text.' },
      { q: 'How do I export this currency converter to Vue, Angular, or Tailwind?', a: 'Use the Export menu (or the Test Exports preview) in the toolbar. It generates a Vue 3 single-file component with the convert and swap logic in script setup, an Angular standalone component, a plain React component, and a React + Tailwind version where the card styles become utility classes. Each export maps the inline handlers to the matching framework event bindings and keeps the RATES table and number-formatting helpers intact, so the widget behaves identically across React, Vue, and Angular.' },
      { q: 'Why use a hardcoded rates table instead of a live API by default?', a: 'Hardcoded rates keep the snippet self-contained — no API key, network request, or rate limit — which is ideal for prototypes, offline demos, and embedding in dashboards. Because every rate is expressed relative to USD, swapping in a live API later means replacing one RATES object while the cross-rate math and number formatting stay exactly the same.' }
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the cross-rate math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why getRate divides RATES[to] by RATES[from] instead of storing every currency pair directly, and why that only needs N rates instead of N times N-1. The same assistant is useful for optimizing it — ask whether the RATES object should be fetched once and cached in localStorage with a timestamp instead of hardcoded, and how often it's actually safe to refetch given how frequently exchange rates change. It's also a good way to extend the widget: ask it to add a favorites list of pinned currency pairs, an inverse-rate readout beneath the main rate, or a small historical sparkline showing how a pair moved over the past week. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a currency converter widget in plain HTML, CSS, and JavaScript with a hardcoded USD-based rates table — no external API call, no library.

Requirements:
- A RATES object keyed by currency code where every value is that currency's rate relative to a single base currency (USD = 1), and a SYMBOLS object mapping each code to its display symbol.
- A getRate(from, to) function that computes any pair's exchange rate as RATES[to] divided by RATES[from], without ever storing direct pairwise rates.
- An amount input, a "From" currency select, and a "To" currency select, all wired to a single convert() function that recalculates on every input or change event.
- A swap button between the two selects that exchanges their selected values and re-runs the conversion, with a CSS transform: rotate(180deg) transition on hover to visually signal the swap action.
- Currency-aware decimal formatting: use Number.prototype.toLocaleString with explicit minimumFractionDigits and maximumFractionDigits, showing 0 decimal places for currencies like JPY and INR in the result but more precision in the displayed rate line.
- A row of "popular pair" shortcut buttons that set both selects to a specific pair and immediately re-run the conversion.
- Prepend the correct currency symbol to the formatted result amount, falling back gracefully if a currency has no mapped symbol.`,
    },
  }
};

export default currencyConverter;
