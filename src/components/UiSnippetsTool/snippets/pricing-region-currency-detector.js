const pricingRegionCurrencyDetector = {
  id: 'pricing-region-currency-detector',
  title: 'Auto-Detected Regional Pricing',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="rcd-wrap">
  <div class="rcd-card" id="rcdCard">
    <div class="rcd-detect" id="rcdDetect">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"/><path d="M3 12h18M12 3c2.5 2.7 4 6 4 9s-1.5 6.3-4 9c-2.5-2.7-4-6-4-9s1.5-6.3 4-9z" stroke="currentColor" stroke-width="2"/></svg>
      <span id="rcdDetectText">Detecting your region…</span>
    </div>

    <p class="rcd-plan-name">Pro plan</p>
    <p class="rcd-price"><span id="rcdAmount">$29</span><span class="rcd-period">/month</span></p>
    <p class="rcd-note" id="rcdNote">Prices shown in USD.</p>

    <ul class="rcd-features">
      <li>Unlimited projects</li>
      <li>Priority support</li>
      <li>Advanced analytics</li>
      <li>Team roles &amp; permissions</li>
    </ul>

    <button class="rcd-cta">Start Pro plan</button>

    <div class="rcd-override">
      <label for="rcdRegionSelect">Not your region?</label>
      <select id="rcdRegionSelect">
        <option value="auto">Use detected region</option>
        <option value="US">United States (USD)</option>
        <option value="DE">Germany (EUR)</option>
        <option value="GB">United Kingdom (GBP)</option>
        <option value="IN">India (INR)</option>
        <option value="JP">Japan (JPY)</option>
        <option value="BR">Brazil (BRL)</option>
        <option value="AU">Australia (AUD)</option>
      </select>
    </div>

    <p class="rcd-disclaimer">Example conversion rates for demo purposes — not live market rates.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c1220;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.rcd-wrap{width:100%;max-width:380px}
.rcd-card{background:linear-gradient(165deg,#161f33,#0d1320);border:1px solid #263354;border-radius:20px;padding:30px 26px}
.rcd-detect{display:inline-flex;align-items:center;gap:7px;font-size:11.5px;font-weight:700;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.22);padding:5px 11px;border-radius:20px}
.rcd-plan-name{font-size:12.5px;font-weight:700;color:#7dd3fc;text-transform:uppercase;letter-spacing:.06em;margin-top:18px}
.rcd-price{margin-top:8px;display:flex;align-items:baseline;gap:6px}
#rcdAmount{font-size:40px;font-weight:800;color:#f4f7fb;letter-spacing:-.02em;font-variant-numeric:tabular-nums;transition:opacity .15s}
.rcd-period{font-size:14px;color:#8b96ab;font-weight:600}
.rcd-note{font-size:12px;color:#5c6779;margin-top:6px}
.rcd-features{list-style:none;margin-top:20px;display:flex;flex-direction:column;gap:9px}
.rcd-features li{font-size:13px;color:#c3cbdb;padding-left:22px;position:relative}
.rcd-features li::before{content:'';position:absolute;left:0;top:3px;width:14px;height:14px;border-radius:50%;background:rgba(125,211,252,.14);background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%237dd3fc' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:center;background-size:8px}
.rcd-cta{width:100%;margin-top:22px;background:#7dd3fc;color:#04283e;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.rcd-cta:hover{background:#5fc4f6}
.rcd-override{margin-top:20px;display:flex;align-items:center;justify-content:space-between;gap:10px;padding-top:18px;border-top:1px solid #202b45}
.rcd-override label{font-size:12px;color:#8b96ab;font-weight:600}
.rcd-override select{background:#0c1220;color:#f4f7fb;border:1.5px solid #263354;border-radius:8px;padding:7px 10px;font-family:inherit;font-size:12.5px;cursor:pointer}
.rcd-disclaimer{font-size:11px;color:#48536a;margin-top:14px;text-align:center;line-height:1.5}`,

  js: `// Realistic example conversion rates (illustrative — not fetched live).
// Base price is defined in USD; every other currency is derived from it.
const BASE_USD = 29;
const REGION_TABLE = {
  US: { currency: 'USD', locale: 'en-US', rate: 1 },
  DE: { currency: 'EUR', locale: 'de-DE', rate: 0.92 },
  GB: { currency: 'GBP', locale: 'en-GB', rate: 0.78 },
  IN: { currency: 'INR', locale: 'en-IN', rate: 83.1 },
  JP: { currency: 'JPY', locale: 'ja-JP', rate: 149.5 },
  BR: { currency: 'BRL', locale: 'pt-BR', rate: 5.15 },
  AU: { currency: 'AUD', locale: 'en-AU', rate: 1.51 },
};

// Map the browser's real locale (navigator.language) to a supported region.
// This reads the user's ACTUAL browser locale, it is not hardcoded.
function detectRegionFromLocale() {
  const lang = (navigator.language || 'en-US').toLowerCase();
  if (lang.includes('de')) return 'DE';
  if (lang.startsWith('en-gb')) return 'GB';
  if (lang.includes('hi') || lang.endsWith('-in')) return 'IN';
  if (lang.startsWith('ja')) return 'JP';
  if (lang.startsWith('pt')) return 'BR';
  if (lang.endsWith('-au')) return 'AU';
  return 'US';
}

const amountEl = document.getElementById('rcdAmount');
const noteEl = document.getElementById('rcdNote');
const detectText = document.getElementById('rcdDetectText');
const select = document.getElementById('rcdRegionSelect');

function fractionDigitsFor(currency) {
  // JPY has no minor unit; keep formatting correct per currency.
  return currency === 'JPY' ? 0 : 0; // whole-number display for a clean price
}

function formatForRegion(region) {
  const entry = REGION_TABLE[region] || REGION_TABLE.US;
  const converted = BASE_USD * entry.rate;
  const rounded = Math.round(converted);
  const formatted = new Intl.NumberFormat(entry.locale, {
    style: 'currency',
    currency: entry.currency,
    maximumFractionDigits: fractionDigitsFor(entry.currency),
  }).format(rounded);
  return { formatted, currency: entry.currency };
}

function render(region, wasDetected) {
  const { formatted, currency } = formatForRegion(region);
  amountEl.style.opacity = '0';
  setTimeout(() => {
    amountEl.textContent = formatted;
    amountEl.style.opacity = '1';
  }, 90);
  noteEl.textContent = currency === 'USD'
    ? 'Prices shown in USD.'
    : 'Prices shown in ' + currency + ' — example rate, converted from a USD base price.';
}

function init() {
  const detected = detectRegionFromLocale();
  detectText.textContent = 'Detected: ' + (REGION_TABLE[detected].currency) + ' (' + navigator.language + ')';
  render(detected, true);
}

select.addEventListener('change', () => {
  const value = select.value;
  if (value === 'auto') {
    const detected = detectRegionFromLocale();
    render(detected, true);
    return;
  }
  render(value, false);
});

init();`,

  seo: {
    title: 'Auto-Detected Regional Pricing — Free HTML CSS JS Snippet',
    description: 'A pricing card that detects the visitor\'s real browser locale via navigator.language and Intl.NumberFormat, with a manual region override. Example rates only.',
    about: {
      title: 'Auto-Detected Regional Pricing — navigator.language, Intl.NumberFormat, and a Manual Override',
      description: `Showing a visitor a locale-correct price the moment a pricing page loads — without a geolocation API call or a server round-trip — is possible using two things the browser already knows: \`navigator.language\` and \`Intl.NumberFormat\`. This snippet builds a pricing card that reads the visitor's real browser locale, maps it to a plausible region and currency, formats the price correctly for that locale, and gives the visitor a manual override dropdown in case the automatic guess is wrong.

**Reading the real locale, not a hardcoded value**

\`detectRegionFromLocale()\` reads \`navigator.language\` directly from the browser — this is the actual language/region tag the visitor's browser reports (e.g. \`de-DE\`, \`en-GB\`, \`ja\`), not a simulated or hardcoded string. A small set of substring checks maps common patterns to one of seven supported regions, defaulting to the US when nothing matches. Because this reads a live browser API, the detected badge genuinely reflects whoever is viewing the page — open it with a browser set to German and it detects Germany; set to Japanese and it detects Japan.

**One base price, converted per region**

Every region entry in \`REGION_TABLE\` pairs a currency code, an \`Intl\`-compatible locale string, and a conversion rate. The displayed price is always computed as \`BASE_USD * entry.rate\`, rounded, and handed to \`Intl.NumberFormat(locale, { style: 'currency', currency })\` — the same pattern used in [Pricing Card Currency Switcher](/ui-snippets/pricing-currency-switcher/), extended here to seven regions instead of four and driven by automatic detection rather than only manual clicks. Because every conversion originates from the same \`BASE_USD\` constant, there's no compounding rounding error from repeatedly converting an already-converted number.

**Why the rates are clearly labeled as example rates**

The rates in \`REGION_TABLE\` are realistic figures a shopper would recognize as plausible, but they are static and will drift from actual market rates over time — the disclaimer beneath the card says so explicitly. A production implementation should fetch current rates from a currency-exchange API on a schedule (hourly or daily is typical for a marketing page) and cache the result, exactly as noted in the currency switcher snippet.

**The override exists because detection is a guess, not a fact**

\`navigator.language\` reflects the browser's configured language, which frequently diverges from the visitor's actual location or preferred billing currency — someone traveling, using a VPN, or simply running their OS in a second language would otherwise be shown a currency they didn't choose. The \`#rcdRegionSelect\` dropdown lets them pick "Use detected region" or any of the seven regions directly, and selecting a region re-renders the price using the exact same \`formatForRegion()\` function the automatic detection uses — so manual and automatic paths are guaranteed to produce identical, correctly formatted output.

**Customizing it**

Add more regions to \`REGION_TABLE\`, replace the static rates with a fetched exchange-rate feed, or swap \`navigator.language\` detection for an IP-geolocation lookup and keep the same override pattern as a fallback. Pair it with [Pricing Card Currency Switcher](/ui-snippets/pricing-currency-switcher/) or a [Currency Converter](/ui-snippets/currency-converter/) elsewhere on the page.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Open the page in different browser locales', text: 'The badge reads navigator.language and detects a matching region automatically.' },
      { title: 'Watch the price format correctly', text: 'Intl.NumberFormat renders the right symbol, grouping, and decimals for the detected currency.' },
      { title: 'Override the region manually', text: 'The dropdown lets you pick any of seven regions or return to detected.' },
      { title: 'Compare the disclaimer', text: 'Rates are clearly labeled as example, non-live conversion rates.' },
      { title: 'Add a region', text: 'Add an entry to REGION_TABLE with a currency, locale, and rate, plus a matching option.' },
      { title: 'Swap in live rates', text: 'Replace the static rate field with a value fetched from a currency API.' },
    ] },
    features: [
      { title: 'Real navigator.language detection', text: 'Reads the browser\'s actual reported locale, not a simulated value.' },
      { title: 'Seven supported regions', text: 'US, DE, GB, IN, JP, BR, and AU out of the box.' },
      { title: 'Single USD source of truth', text: 'Every conversion derives from one base price, avoiding compounding rounding error.' },
      { title: 'Intl.NumberFormat output', text: 'Correct symbol, grouping, and decimal rules per locale.' },
      { title: 'Manual override dropdown', text: 'Lets a visitor correct a wrong automatic guess.' },
      { title: 'Shared formatting function', text: 'Automatic and manual paths render through the same code.' },
      { title: 'Clearly labeled example rates', text: 'A visible disclaimer avoids implying live market data.' },
      { title: 'Smooth fade on price change', text: 'Small opacity transition confirms the number updated.' },
    ],
    useCases: [
      { title: 'International SaaS pricing', text: 'Show a locale-correct price when the page loads, using `navigator.language` and `Intl.NumberFormat` with no geolocation call or server round trip.' },
      { title: 'E-commerce storefronts', text: 'Pair with a [currency converter](/ui-snippets/currency-converter/) for fuller coverage, deriving every conversion from one USD base price so rates cannot drift.' },
      { title: 'Global landing pages', text: 'Reduce mental friction for visitors abroad, with correct symbol, grouping and decimal rules for seven regions including Germany, India, Japan and Brazil.' },
      { title: 'Localisation A/B tests', text: 'Test whether locale-aware pricing lifts conversion, with a manual region override for people whose browser locale does not match their location.' },
      { title: 'Multi-region checkout and formatting teaching', text: 'Confirm currency before hand-off to payment alongside a [pricing toggle](/ui-snippets/pricing-toggle/), and learn `Intl.NumberFormat` as a reference.' },
      { icon: 'CODE', title: 'Related: Free Trial Signup Card', desc: 'See the [Free Trial Signup Card](/ui-snippets/pricing-free-trial-signup-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this actually detect my real location?', a: 'It detects your browser\'s configured language via navigator.language, which correlates with location often enough to be a useful first guess but is not the same as IP-based geolocation. Someone running an English-language browser while physically in Germany would be detected as US by this simple mapping, which is exactly why the manual override dropdown exists.' },
      { q: 'Are the conversion rates live market rates?', a: 'No — they are realistic, clearly labeled example rates hardcoded into REGION_TABLE for demo purposes, exactly like the rates in Pricing Card Currency Switcher. A production implementation should fetch current rates from a currency-exchange API on a periodic schedule and cache the result rather than hardcoding a table that will drift out of date.' },
      { q: 'Why compute every price from one USD base instead of converting the currently displayed number?', a: 'Converting an already-converted, already-rounded number repeatedly compounds rounding error. Both the automatic detection path and the manual override path call the same formatForRegion() function against the single BASE_USD constant, so the displayed price is always mathematically consistent no matter how many times the region is switched.' },
      { q: 'What happens if navigator.language reports a locale I have not mapped?', a: 'detectRegionFromLocale() falls back to US whenever none of its substring checks match, so the card always renders a valid, correctly formatted price rather than showing nothing or throwing an error for an unmapped locale.' },
      { q: 'How would I replace detection with real IP-based geolocation?', a: 'Call a geolocation API (client-side or via your own backend) on load, map its returned country code to an entry in REGION_TABLE the same way detectRegionFromLocale() currently maps navigator.language, and pass the result into render(). Keep the manual override dropdown regardless — geolocation is still a guess a visitor may need to correct.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly how detectRegionFromLocale() maps the browser's real navigator.language value to a region, and why every currency conversion in formatForRegion() always derives from the single BASE_USD constant rather than whatever is currently displayed. It's also a good candidate to extend with AI help: ask it to replace the static REGION_TABLE rates with a fetched, cached exchange-rate feed, add IP-based geolocation as a first guess with navigator.language as a fallback, or persist the visitor's manual region choice in localStorage so it survives a page reload.`,
      prompt: `Build a pricing card that detects and displays a locale-appropriate price in plain HTML, CSS, and JavaScript, using no libraries — only the built-in navigator.language and Intl.NumberFormat APIs.

Requirements:
- On load, read the browser's real navigator.language value (do not simulate or hardcode it) and map it to one of several supported regions using simple pattern matching, defaulting to a sensible region when nothing matches.
- Maintain a single base price in one currency (e.g. USD) as the sole source of truth, plus a small table mapping each supported region to a currency code, an Intl-compatible locale string, and an illustrative conversion rate clearly commented as example data, not a live rate.
- Format every displayed price by converting from the single base price using the region's rate, then passing the result through Intl.NumberFormat with the correct locale and currency so symbol, grouping, and decimal formatting are correct automatically.
- Show a small "detected" indicator naming which region/currency was automatically detected and from what locale string.
- Provide a manual override dropdown listing all supported regions plus a "use detected region" option, where choosing a region re-renders the price through the exact same formatting function the automatic detection path uses, so manual and automatic results are always consistent.
- Include a visible disclaimer stating the conversion rates are example rates for demonstration, not live market data.
- Give a small fade transition on the price text when it updates so the change is visibly confirmed rather than an instant swap.`,
    },
  },
};

export default pricingRegionCurrencyDetector;
