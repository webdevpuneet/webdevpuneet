const bootstrapCurrencySwitcher = {
  id: 'bootstrap-currency-switcher',
  title: 'Bootstrap Currency Switcher',
  lastmod: '2026-09-11',
  category: 'pricing',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscur-card">
    <div class="card-body p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h6 class="fw-bold mb-0">Pro plan</h6>
        <select class="form-select form-select-sm" id="bscurSelect" style="max-width:110px;">
          <option value="USD">USD $</option>
          <option value="EUR">EUR &euro;</option>
          <option value="GBP">GBP &pound;</option>
          <option value="INR">INR &#8377;</option>
          <option value="JPY">JPY &yen;</option>
        </select>
      </div>
      <p class="display-6 fw-bold mb-1" id="bscurPrice">$29.00</p>
      <p class="small text-muted mb-0">per month, billed monthly</p>
    </div>
  </div>
</div>`,
  css: `.bscur-card { width: 300px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }`,
  js: `const BASE_USD = 29;

// Fixed illustrative rates and symbols per currency — a real implementation
// should source live rates from an actual exchange-rate API instead.
const RATES = {
  USD: { rate: 1, symbol: '$', decimals: 2 },
  EUR: { rate: 0.92, symbol: '\\u20ac', decimals: 2 },
  GBP: { rate: 0.79, symbol: '\\u00a3', decimals: 2 },
  INR: { rate: 83.1, symbol: '\\u20b9', decimals: 0 },
  JPY: { rate: 149.3, symbol: '\\u00a5', decimals: 0 },
};

const select = document.getElementById('bscurSelect');
const priceEl = document.getElementById('bscurPrice');

function render() {
  const info = RATES[select.value];
  const converted = BASE_USD * info.rate;
  priceEl.textContent = info.symbol + converted.toLocaleString(undefined, {
    minimumFractionDigits: info.decimals,
    maximumFractionDigits: info.decimals,
  });
}

select.addEventListener('change', render);
render();`,

  seo: {
    title: 'Bootstrap Currency Switcher — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 pricing card that converts one base USD price live as you switch currency — correctly formatted per currency, including zero-decimal currencies like JPY and INR.',
    about: {
      title: 'Bootstrap Currency Switcher — HTML, CSS & JavaScript',
      description: `A single \`BASE_USD\` price and a \`RATES\` table (one exchange rate, symbol, and decimal-place count per currency) is all \`render()\` needs to compute and format every price shown — switching currency never touches a separately maintained price per currency, so the five prices can never drift out of sync with each other or with the actual base price.\n\nThe \`decimals\` field per currency exists for a real formatting reason: Japanese yen and, by convention in many pricing displays, Indian rupees aren't typically shown with cents-equivalent decimal places, while dollars and euros are. Passing \`minimumFractionDigits\`/\`maximumFractionDigits\` from that per-currency value into \`toLocaleString()\` is what correctly renders \`\\u00a5\` amounts as whole numbers while still showing \`$29.00\` with two decimals — a single hardcoded \`.toFixed(2)\` applied to every currency would incorrectly show a JPY price with meaningless trailing zeros.\n\n\`toLocaleString()\` also supplies real thousands-separator grouping for free at INR and JPY's larger converted values, without any manual string-formatting logic needed for that separately.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'The price shows "$29.00" with USD selected in the dropdown.' },
        { title: 'Switch to EUR', text: 'The price recalculates immediately to the converted euro amount, with the euro symbol and two decimals.' },
        { title: 'Switch to JPY', text: 'The price shows as a whole number with no decimal places and the yen symbol — correct for how yen amounts are conventionally displayed.' },
        { title: 'Switch to INR', text: 'The price converts to a larger rupee number, whole-number formatted with the rupee symbol.' },
        { title: 'Switch back to USD', text: 'The price returns to exactly $29.00, the original base price.' },
      ],
    },
    features: [
      'One base price and one rates table drive every displayed currency, never separately tracked prices',
      'Correctly formats zero-decimal currencies like JPY differently from two-decimal currencies like USD/EUR',
      'Uses toLocaleString() for real thousands-separator grouping with no manual string formatting',
      'Switching currency recalculates instantly from the same fixed base price, keeping every conversion consistent',
      'Adding a new currency is a one-line addition to the RATES table, no changes to the render logic',
    ],
    useCases: [
      { icon: 'PRICE', title: 'Pricing pages for an internationally-facing product', desc: 'Pairs with [bootstrap-pricing-table-toggle](/ui-snippets/bootstrap-pricing-table-toggle/) or [bootstrap-pricing-comparison-table](/ui-snippets/bootstrap-pricing-comparison-table/) for a fuller localized pricing section.' },
      { icon: 'CART', title: 'Ecommerce product pages showing region-aware pricing', desc: 'Let a shopper preview a price in their preferred currency before checkout.' },
      { icon: 'APP', title: 'SaaS billing and plan-selection screens', desc: 'A common need for products selling to customers across multiple currency regions.' },
    ],
    faqs: [
      { q: 'Are the exchange rates live and accurate?', a: 'No — this demo uses small fixed, illustrative rates for clarity. A real implementation should fetch live rates from an actual exchange-rate API and refresh them periodically, since currency values genuinely fluctuate.' },
      { q: 'Why do JPY and INR show no decimal places while USD and EUR show two?', a: 'This follows the common convention that yen (and, in many pricing UIs, rupee) amounts are shown as whole numbers — the decimals field per currency in RATES controls this per currency rather than applying one fixed decimal count to every price.' },
      { q: 'Does the actual subscription price change, or just the display?', a: 'This snippet only demonstrates the display conversion; a real checkout flow needs to charge in whatever currency your payment processor actually settles, which may not always match the currency shown for browsing.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep RATES and BASE_USD as plain data, track the selected currency in component state, and derive the formatted price string in the render function using the same toLocaleString() approach.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to fetch live exchange rates from a real currency API on load (falling back to the fixed rates if the request fails), or to remember the user's last-selected currency in localStorage so it persists across visits.`,
      prompt: `Build a Bootstrap 5.3 pricing card with a currency switcher, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble it.

Requirements:
- A single base price in USD, and a dropdown to select from at least 5 currencies including at least one zero-decimal currency (e.g. JPY) and one with a much larger typical converted value (e.g. INR).
- A single data structure mapping each currency to its exchange rate relative to the base, its currency symbol, and how many decimal places it should be displayed with.
- Switching the dropdown must recalculate and reformat the displayed price live, using the correct decimal-place count and thousands-separator grouping per currency (via toLocaleString or equivalent), computed fresh from the one base price every time — never from a separately stored price per currency.`,
    },
  },
};

export default bootstrapCurrencySwitcher;
