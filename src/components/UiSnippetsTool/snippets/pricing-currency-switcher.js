const pricingCurrencySwitcher = {
  id: 'pricing-currency-switcher',
  title: 'Pricing Card Currency Switcher',
  lastmod: '2026-08-08',
  category: 'pricing',
  html: `<div class="pricing-page">
  <div class="pricing-header">
    <h2>Simple, transparent pricing</h2>
    <div class="currency-switch" id="currency-switch" role="group" aria-label="Select display currency">
      <button class="currency-opt active" data-currency="USD">USD</button>
      <button class="currency-opt" data-currency="EUR">EUR</button>
      <button class="currency-opt" data-currency="GBP">GBP</button>
      <button class="currency-opt" data-currency="INR">INR</button>
    </div>
  </div>

  <div class="pricing-grid">
    <div class="plan-card" data-base-price="9">
      <p class="plan-name">Starter</p>
      <p class="plan-price"><span class="price-amount">$9</span><span class="price-period">/mo</span></p>
      <p class="plan-blurb">For individuals getting started</p>
      <ul class="plan-features">
        <li>1 project</li>
        <li>5GB storage</li>
        <li>Community support</li>
      </ul>
      <button class="plan-cta">Choose Starter</button>
    </div>

    <div class="plan-card featured" data-base-price="29">
      <span class="popular-tag">Most popular</span>
      <p class="plan-name">Growth</p>
      <p class="plan-price"><span class="price-amount">$29</span><span class="price-period">/mo</span></p>
      <p class="plan-blurb">For growing teams shipping fast</p>
      <ul class="plan-features">
        <li>Unlimited projects</li>
        <li>100GB storage</li>
        <li>Priority support</li>
        <li>Team roles &amp; permissions</li>
      </ul>
      <button class="plan-cta primary">Choose Growth</button>
    </div>

    <div class="plan-card" data-base-price="79">
      <p class="plan-name">Scale</p>
      <p class="plan-price"><span class="price-amount">$79</span><span class="price-period">/mo</span></p>
      <p class="plan-blurb">For larger orgs with custom needs</p>
      <ul class="plan-features">
        <li>Unlimited everything</li>
        <li>1TB storage</li>
        <li>Dedicated support</li>
        <li>SSO &amp; audit logs</li>
      </ul>
      <button class="plan-cta">Choose Scale</button>
    </div>
  </div>

  <p class="billing-disclosure" id="billing-disclosure">Prices shown in USD, billed in USD.</p>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.pricing-page { max-width: 920px; margin: 0 auto; padding: 40px 24px; }

.pricing-header { text-align: center; margin-bottom: 32px; }
.pricing-header h2 { font-size: 24px; font-weight: 800; color: #0f172a; margin-bottom: 18px; }

.currency-switch {
  display: inline-flex; gap: 2px;
  background: #eef2f7; padding: 3px; border-radius: 10px;
}
.currency-opt {
  border: none; background: transparent;
  padding: 7px 16px; font-family: inherit; font-size: 12.5px; font-weight: 700;
  color: #64748b; border-radius: 8px; cursor: pointer;
  transition: background 0.15s, color 0.15s;
}
.currency-opt:hover { color: #1e293b; }
.currency-opt.active { background: #fff; color: #6366f1; box-shadow: 0 1px 4px rgba(15,23,42,0.1); }

.pricing-grid {
  display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
}

.plan-card {
  position: relative;
  background: #fff; border: 1.5px solid #eef2f7; border-radius: 18px;
  padding: 26px 24px; display: flex; flex-direction: column;
}
.plan-card.featured { border-color: #6366f1; box-shadow: 0 12px 32px rgba(99,102,241,0.14); transform: translateY(-4px); }

.popular-tag {
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  background: #6366f1; color: #fff; font-size: 10.5px; font-weight: 700;
  padding: 4px 12px; border-radius: 20px; white-space: nowrap;
}

.plan-name { font-size: 13px; font-weight: 700; color: #6366f1; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 12px; }
.plan-price { display: flex; align-items: baseline; gap: 4px; margin-bottom: 6px; }
.price-amount { font-size: 32px; font-weight: 800; color: #0f172a; font-variant-numeric: tabular-nums; transition: opacity 0.15s; }
.price-period { font-size: 13px; color: #94a3b8; font-weight: 600; }
.plan-blurb { font-size: 12.5px; color: #94a3b8; margin-bottom: 20px; line-height: 1.5; }

.plan-features { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 24px; flex: 1; }
.plan-features li { font-size: 13px; color: #334155; padding-left: 22px; position: relative; }
.plan-features li::before {
  content: ''; position: absolute; left: 0; top: 3px;
  width: 15px; height: 15px; border-radius: 50%;
  background: #eef2ff;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%236366f1' stroke-width='3' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: center; background-size: 9px;
}

.plan-cta {
  border: 1.5px solid #e2e8f0; background: #fff; color: #1e293b;
  padding: 11px; border-radius: 10px; font-family: inherit; font-size: 13.5px; font-weight: 700;
  cursor: pointer; transition: all 0.15s;
}
.plan-cta:hover { border-color: #6366f1; color: #6366f1; }
.plan-cta.primary { background: #6366f1; border-color: #6366f1; color: #fff; }
.plan-cta.primary:hover { background: #4f46e5; }

.billing-disclosure {
  text-align: center; margin-top: 24px;
  font-size: 12px; color: #94a3b8;
}`,

  js: `// Small hardcoded exchange-rate table (illustrative, not live rates).
// Real products should fetch rates from a currency API on an interval
// or at build time, and cache them — never hardcode rates that drift
// out of date in a way that misleads shoppers.
const RATES = {
  USD: { rate: 1, locale: 'en-US' },
  EUR: { rate: 0.92, locale: 'de-DE' },
  GBP: { rate: 0.78, locale: 'en-GB' },
  INR: { rate: 83.1, locale: 'en-IN' },
};

const switcher = document.getElementById('currency-switch');
const disclosure = document.getElementById('billing-disclosure');
const cards = document.querySelectorAll('.plan-card');

function formatPrice(baseUsd, currency) {
  const { rate, locale } = RATES[currency];
  const converted = baseUsd * rate;
  // Whole-dollar plans stay whole-number in every currency for a clean
  // display; Intl.NumberFormat handles the symbol, grouping, and
  // decimal conventions correctly per locale (e.g. ₹ vs € placement).
  const rounded = Math.round(converted);
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(rounded);
}

function applyCurrency(currency) {
  cards.forEach((card) => {
    const baseUsd = parseFloat(card.dataset.basePrice);
    const amountEl = card.querySelector('.price-amount');
    amountEl.style.opacity = '0';
    setTimeout(() => {
      amountEl.textContent = formatPrice(baseUsd, currency);
      amountEl.style.opacity = '1';
    }, 90);
  });

  disclosure.textContent =
    currency === 'USD'
      ? 'Prices shown in USD, billed in USD.'
      : 'Prices shown in ' + currency + ', billed in USD. Your bank may apply its own conversion rate.';

  switcher.querySelectorAll('.currency-opt').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.currency === currency);
  });
}

switcher.addEventListener('click', (e) => {
  const btn = e.target.closest('.currency-opt');
  if (!btn) return;
  applyCurrency(btn.dataset.currency);
});

applyCurrency('USD');`,

  seo: {
    title: 'Pricing Currency Switcher — Free HTML CSS JS Snippet',
    description: 'Segmented USD/EUR/GBP/INR switcher that live-updates pricing cards via Intl.NumberFormat, with a billed-in-USD disclosure. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Pricing Card Currency Switcher — Live Multi-Currency Display, Intl.NumberFormat & Billing Transparency',
      description: `International SaaS pricing pages routinely show prices in a visitor's local currency to reduce the mental friction of converting an unfamiliar figure before deciding to buy — a shopper in Mumbai reads ₹749 far faster than $9.00. This snippet builds a working currency switcher for a three-tier pricing table: a segmented control lets the user pick USD, EUR, GBP, or INR, and every card's displayed price updates simultaneously using a small hardcoded exchange-rate table and locale-correct currency formatting.

**Storing one source of truth per plan**

Each \`.plan-card\` element carries its true price as a \`data-base-price\` attribute in US dollars (e.g. \`data-base-price="29"\`), which is the single source of truth the switcher always converts *from*, regardless of which currency is currently displayed. This matters because repeatedly converting a previously-converted price (EUR back to GBP, for instance) compounds rounding error — always recomputing from the original USD base avoids that entirely.

**A small rate table and Intl.NumberFormat**

The \`RATES\` object maps each supported currency code to an illustrative conversion rate and an appropriate locale string (\`en-US\`, \`de-DE\`, \`en-GB\`, \`en-IN\`). \`formatPrice()\` multiplies the USD base by the target rate, rounds to a whole number for clean display, and hands the result to \`Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 0 })\`. This single built-in browser API — no library, no manual symbol lookup table — correctly handles everything locale-specific about currency display: the right symbol (\`$\`, \`€\`, \`£\`, \`₹\`), its position relative to the digits (prefix in most locales, but placement and spacing rules genuinely differ), thousands-grouping conventions, and decimal separators. Hardcoding a symbol-and-concatenate approach (\`'$' + amount\`) would get every one of those details wrong for at least one of the four supported currencies.

**Updating every card at once**

Clicking a currency option calls \`applyCurrency(currency)\`, which iterates every \`.plan-card\`, reads its base price, and rewrites the \`.price-amount\` text via \`formatPrice()\` — all three cards update together in a single pass, so the pricing table never shows a mix of currencies mid-transition. A brief opacity fade (\`amountEl.style.opacity\`) on each price during the swap gives a small moment of visual feedback that the numbers actually changed, rather than an instant, easy-to-miss text swap.

**The billing disclosure — a small detail with outsized trust impact**

Most SaaS billing systems still charge the customer's card in a single base currency (commonly USD) even when the marketing site *displays* prices in the visitor's local currency for convenience — the local-currency figure is an estimate, and the actual charge amount and any bank-side conversion fee depend on the card issuer's own exchange rate at the time of the transaction. Silently showing a EUR price with no clarification about what currency will actually be charged is a subtle trust violation that surfaces painfully at the moment a customer sees an unexpected amount on their statement. This snippet surfaces that reality directly: the disclosure line beneath the pricing grid reads "Prices shown in EUR, billed in USD. Your bank may apply its own conversion rate." whenever a non-USD currency is selected — a small piece of copy that meaningfully improves billing transparency and reduces support tickets and chargebacks from surprised customers.

**Why this matters for 2026 trust-driven UX**

Transparent, honest pricing disclosure is a core pillar of trust-driven UX: showing a number without the context of what actually gets charged is a dark pattern by omission, even if unintentional. Pairing a genuinely useful convenience feature (localized price display) with an equally visible disclosure about the underlying billing currency is the correct way to implement this pattern — convenience without hidden surprises.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click a currency option to switch',
          text: 'The #currency-switch segmented control listens for clicks via event delegation. Clicking any .currency-opt button calls applyCurrency(currency), which updates the .active class and re-renders every card\'s price.',
        },
        {
          title: 'Understand the base-price data attribute',
          text: 'Each .plan-card stores its true USD price as data-base-price (e.g. data-base-price="29"). formatPrice() always converts from this original USD figure, never from a previously displayed currency, to avoid compounding rounding error.',
        },
        {
          title: 'See the live Intl.NumberFormat conversion',
          text: 'formatPrice(baseUsd, currency) multiplies the base by RATES[currency].rate and formats the result with new Intl.NumberFormat(locale, { style: "currency", currency }) — producing correctly symbol-placed, locale-formatted output like €26 or ₹2,409 with zero manual string concatenation.',
        },
        {
          title: 'Read the billing disclosure update',
          text: 'Switching away from USD updates #billing-disclosure to explicitly state prices are billed in USD regardless of display currency, via the ternary inside applyCurrency(). This is a required transparency detail, not just a stylistic footnote.',
        },
        {
          title: 'Add a new currency',
          text: 'Add an entry to the RATES object with a rate and matching Intl locale string, e.g. JPY: { rate: 147.2, locale: "ja-JP" }, and add a matching <button class="currency-opt" data-currency="JPY">JPY</button> inside #currency-switch.',
        },
        {
          title: 'Connect to a live exchange-rate API',
          text: 'Replace the hardcoded RATES object with rates fetched from a currency API (refreshed periodically and cached, e.g. hourly) so displayed conversions stay accurate rather than drifting from real market rates over time.',
        },
      ],
    },
    features: [
      'Single USD source of truth per card via data-base-price, avoiding compounding rounding error on re-conversion',
      'Intl.NumberFormat handles symbol, placement, grouping, and decimals correctly per currency and locale',
      'Event delegation on #currency-switch — one listener handles all four currency buttons',
      'All pricing cards update together in one pass, keeping the table visually consistent mid-switch',
      'Brief opacity fade on price text gives visible confirmation the number actually changed',
      'Dynamic billing-disclosure text clarifies real charge currency whenever display currency differs from USD',
      'Segmented control with .active state styling mirrors standard iOS/Material segmented-control conventions',
      'Rate table and locale mapping centralized in one RATES object for easy extension to more currencies',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'International SaaS and subscription pricing pages',
        desc: 'Software products selling globally show prices in a visitor\'s likely local currency to reduce the cognitive load of mental currency conversion during evaluation, which measurably improves pricing-page conversion for international traffic while keeping actual billing simple by charging one base currency behind the scenes.',
      },
      {
        icon: 'DESIGN',
        title: 'E-commerce storefronts with region-aware price display',
        desc: 'Online stores serving multiple countries often default the currency switcher to the visitor\'s detected region (via IP geolocation or Accept-Language headers) while still processing payment in the merchant\'s settlement currency, making this same base-price-plus-disclosure pattern directly applicable beyond SaaS pricing tables.',
      },
      {
        icon: 'FLOW',
        title: 'Billing transparency and reduced chargeback disputes',
        desc: 'Clearly disclosing that displayed local-currency prices are estimates and the actual charge occurs in a different base currency reduces "surprise charge" disputes and support tickets, since customers see the disclosure before committing rather than discovering the discrepancy on their bank statement afterward.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching Intl.NumberFormat for currency-correct UI text',
        desc: 'This snippet is a clean, minimal reference for using the built-in Intl.NumberFormat API to render currency values correctly across locales, avoiding the common anti-pattern of hardcoding a symbol-and-concatenate approach that breaks for currencies with different symbol placement or grouping rules.',
      },
      {
        icon: 'CODE',
        title: 'A/B testing localized pricing presentation',
        desc: 'Product and growth teams can use a currency switcher like this as the display layer for experiments testing whether localized price presentation improves conversion in specific markets, without needing to change the underlying billing system\'s currency at all.',
      },
      {
        icon: 'APP',
        title: 'Multi-region marketing sites alongside plan comparison tables',
        desc: 'Pricing pages frequently sit next to feature-comparison tables and FAQs; pairing this switcher with a [Feature Comparison Matrix Table](/ui-snippets/feature-comparison-matrix-table/) gives international visitors a fully localized-feeling evaluation experience even when the backend billing remains single-currency.',
      },
      { icon: 'CODE', title: 'Related: Dense Feature Comparison Matrix', desc: 'See the [Dense Feature Comparison Matrix](/ui-snippets/pricing-compare-matrix-grid/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why do prices still get billed in USD even after switching to EUR or GBP display?',
        a: "Most SaaS billing providers (Stripe, Paddle, and similar) settle merchant payouts in a single base currency, and many merchants choose to charge customers in that same base currency to avoid holding multi-currency balances and reconciling exchange-rate exposure. The local-currency price shown on the page is a convenience estimate to help the visitor understand roughly what they'll pay in familiar terms — the disclosure line makes this explicit so there's no surprise on the customer's actual statement.",
      },
      {
        q: 'Why use Intl.NumberFormat instead of just prefixing a currency symbol?',
        a: "Currency formatting rules genuinely differ by locale and currency: symbol placement (before vs. after the number), spacing, thousands-grouping characters (comma vs. period vs. space), and decimal conventions are not the same across USD, EUR, GBP, and INR. Intl.NumberFormat(locale, { style: 'currency', currency }) is a built-in, zero-dependency browser API that handles all of this correctly per the CLDR (Unicode Common Locale Data Repository) standard, which a manual string-concatenation approach would get wrong for at least one supported currency.",
      },
      {
        q: 'Why is the exchange rate table hardcoded instead of live?',
        a: "This snippet keeps the rate table static and clearly commented as illustrative to keep the demo self-contained with no network dependency. In production, hardcoded rates will drift from real market rates over time and should be replaced with rates fetched periodically from a currency-exchange API (refreshed hourly or daily is typical for a marketing pricing page, since sub-minute freshness isn't necessary for display-only estimates) and cached to avoid rate-limiting a live API on every page load.",
      },
      {
        q: 'How do I avoid compounding rounding errors when a user switches currencies repeatedly?',
        a: "Always convert from a single, unchanging source-of-truth value — this snippet stores the true USD price in each card's data-base-price attribute and recomputes formatPrice(baseUsd, currency) fresh from that original value on every switch, rather than converting the currently-displayed number again. Converting an already-converted, already-rounded number repeatedly (USD to EUR, then that EUR figure to GBP) compounds rounding error and can visibly drift from the correct value after a few switches.",
      },
      {
        q: 'Should the currency switcher auto-detect the visitor\'s likely currency?',
        a: "Many production pricing pages default to a geolocation-based guess (via IP lookup or the Accept-Language header) rather than always defaulting to USD, since most visitors never manually change the currency switcher even when a more relevant option is available. If you add this, still leave the switcher visible and interactive — some visitors travel, use VPNs, or simply prefer a different display currency than their detected region.",
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly why formatPrice() always converts from the original data-base-price USD value rather than the currently displayed price, and how Intl.NumberFormat's locale argument changes the rendered output for the same numeric amount across en-US, de-DE, en-GB, and en-IN. It's also a strong candidate to extend with AI help: ask it to fetch live exchange rates from a currency API with periodic caching instead of the hardcoded RATES table, add geolocation-based auto-detection of the visitor's likely currency on first load, or add an annual/monthly billing toggle that combines with the currency switcher so both dimensions update the displayed price together correctly.`,
      prompt: `Build a pricing table with a live currency switcher in plain HTML, CSS, and JavaScript, using no libraries — just the built-in Intl.NumberFormat API for currency formatting.

Requirements:
- Display 2-3 pricing tier cards, each with its true price stored in US dollars as a single source of truth (e.g. a data attribute), never in a display-only converted form.
- A segmented control (or dropdown) offering at least four currencies (e.g. USD, EUR, GBP, INR) where exactly one option is visually marked active at a time.
- Selecting a currency must update every pricing card's displayed price simultaneously, using a small hardcoded exchange-rate table mapping each supported currency to a conversion rate and the correct Intl locale string for formatting.
- All currency conversions must always compute from each card's original USD base price, never from whatever is currently displayed, to avoid compounding rounding error across repeated switches.
- Format every displayed price using Intl.NumberFormat with style "currency" and the correct currency code, so symbol placement, grouping, and decimals are locale-correct automatically rather than manually concatenated.
- Include a visible disclosure line beneath the pricing table stating that prices are shown in the selected currency but billed in the base currency (USD), and update this disclosure's exact wording whenever the selected currency changes, since this is a real billing-transparency requirement and not just decorative text.
- Give some lightweight visual feedback (such as a brief fade) when prices update, so it's clear to the user that the switch actually took effect rather than being an instant, easy-to-miss text change.`,
    },
  },
};

export default pricingCurrencySwitcher;
