const pricingLifetimeDealCard = {
  id: 'pricing-lifetime-deal-card',
  title: 'Lifetime Deal Pricing Card',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="ldc-wrap">
  <div class="ldc-card">
    <span class="ldc-badge">Limited-time lifetime deal</span>
    <h2 class="ldc-title">Pay once. Own it forever.</h2>

    <div class="ldc-compare">
      <div class="ldc-option">
        <p class="ldc-option-label">Lifetime access</p>
        <p class="ldc-option-price">$299<span>one-time</span></p>
      </div>
      <div class="ldc-vs">vs</div>
      <div class="ldc-option ldc-option-muted">
        <p class="ldc-option-label">Monthly subscription</p>
        <p class="ldc-option-price">$19<span>/month, forever</span></p>
      </div>
    </div>

    <div class="ldc-payback">
      <p class="ldc-payback-text">Lifetime access pays for itself after <strong id="ldcPaybackMonths">—</strong> months of subscription payments — everything after that is money the subscription would have kept charging you.</p>
    </div>

    <div class="ldc-availability">
      <div class="ldc-availability-row">
        <span id="ldcRemainingText">— licenses remaining</span>
        <span id="ldcClaimedPct">—</span>
      </div>
      <div class="ldc-bar"><div class="ldc-bar-fill" id="ldcBarFill"></div></div>
      <p class="ldc-availability-note">Once all 200 licenses are claimed, this deal is gone for good — the plan reverts to subscription-only.</p>
    </div>

    <button class="ldc-cta">Claim lifetime access — $299</button>
    <p class="ldc-fineprint">One payment. No renewals, no recurring charge, ever.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#150d0a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.ldc-wrap{width:100%;max-width:400px}
.ldc-card{background:linear-gradient(165deg,#2a1810,#170f0a);border:1px solid #452715;border-radius:20px;padding:30px 26px}
.ldc-badge{display:inline-flex;font-size:11.5px;font-weight:700;color:#fb923c;background:rgba(251,146,60,.1);border:1px solid rgba(251,146,60,.28);padding:5px 12px;border-radius:20px}
.ldc-title{font-size:22px;font-weight:800;color:#f4f7fb;margin-top:14px;letter-spacing:-.01em}
.ldc-compare{display:flex;align-items:center;gap:12px;margin-top:20px}
.ldc-option{flex:1;background:#1c120b;border:1.5px solid #452715;border-radius:12px;padding:14px}
.ldc-option-muted{opacity:.65}
.ldc-option-label{font-size:11px;color:#c99a72;font-weight:700;text-transform:uppercase;letter-spacing:.04em}
.ldc-option-price{font-size:22px;font-weight:800;color:#f4f7fb;margin-top:8px}
.ldc-option-price span{display:block;font-size:11px;color:#8b96ab;font-weight:600;margin-top:2px}
.ldc-vs{font-size:11px;color:#5c6779;font-weight:700}
.ldc-payback{margin-top:18px;padding:14px;background:rgba(251,146,60,.06);border:1px solid rgba(251,146,60,.2);border-radius:12px}
.ldc-payback-text{font-size:12.5px;color:#e0b78e;line-height:1.6}
.ldc-payback-text strong{color:#fb923c;font-size:14px}
.ldc-availability{margin-top:20px}
.ldc-availability-row{display:flex;justify-content:space-between;font-size:12px;font-weight:700;color:#c3cbdb;margin-bottom:8px}
.ldc-bar{height:8px;background:#1c120b;border:1px solid #452715;border-radius:20px;overflow:hidden}
.ldc-bar-fill{height:100%;background:linear-gradient(90deg,#fb923c,#f87171);border-radius:20px;width:0;transition:width .6s ease}
.ldc-availability-note{font-size:11px;color:#5c6779;margin-top:8px;line-height:1.5}
.ldc-cta{width:100%;margin-top:20px;background:#fb923c;color:#2b1204;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.ldc-cta:hover{background:#f0821f}
.ldc-fineprint{font-size:11px;color:#5c6779;margin-top:10px;text-align:center}`,

  js: `// Real computed payback period and license-availability math.
const LIFETIME_PRICE = 299;
const MONTHLY_PRICE = 19;
const TOTAL_LICENSES = 200;
const CLAIMED_LICENSES = 153;

// Payback = how many months of subscription payments it takes before
// their cumulative cost exceeds the one-time lifetime price. Ceil
// because the "pays for itself" month is the first WHOLE month the
// subscription total actually exceeds the lifetime price.
const paybackMonths = Math.ceil(LIFETIME_PRICE / MONTHLY_PRICE); // 299/19 = 15.7368... -> 16

document.getElementById('ldcPaybackMonths').textContent = paybackMonths;

const remaining = TOTAL_LICENSES - CLAIMED_LICENSES; // 200 - 153 = 47
const claimedPct = (CLAIMED_LICENSES / TOTAL_LICENSES) * 100; // 153/200 = 76.5%

document.getElementById('ldcRemainingText').textContent =
  remaining + ' of ' + TOTAL_LICENSES + ' licenses remaining';
document.getElementById('ldcClaimedPct').textContent = claimedPct.toFixed(1) + '% claimed';

// Animate the fill in on load using the real computed percentage.
requestAnimationFrame(() => {
  document.getElementById('ldcBarFill').style.width = claimedPct + '%';
});`,

  seo: {
    title: 'Lifetime Deal Pricing Card — Free HTML CSS JS Snippet, Real Payback Math',
    description: 'A one-time lifetime-access pricing card contrasted against an ongoing subscription, with a genuinely computed payback period and a real licenses-remaining bar.',
    about: {
      title: 'Lifetime Deal Pricing Card — Computed Payback Period and a Real Licenses-Remaining Bar',
      description: `Lifetime deals live or die on one piece of arithmetic: how long does it take before paying once is actually cheaper than paying monthly forever? This snippet computes that number for real — \`Math.ceil(LIFETIME_PRICE / MONTHLY_PRICE)\` — rather than writing an arbitrary "pays for itself fast!" claim, and pairs it with a licenses-remaining progress bar built from real claimed/total counts instead of a fake, endlessly-refreshing urgency bar.

**The payback period, computed and rounded correctly**

At \\$299 lifetime versus \\$19/month, the raw division is \\$299 ÷ \\$19 = 15.7368… months. The snippet uses \`Math.ceil()\`, not a truncated or rounded-to-nearest value, because the question being answered is "after how many *whole* months of payments does cumulative subscription cost first exceed the lifetime price?" — and 15 months of \\$19 payments totals only \\$285 (still less than \\$299), while 16 months totals \\$304 (the first month that actually exceeds it). Rounding down or to-nearest would overstate the deal's value by claiming payback a month earlier than the math actually supports.

**Why licenses-remaining needs to be a real fraction, not a decoration**

The availability bar's fill width is computed as \`(CLAIMED_LICENSES / TOTAL_LICENSES) * 100\` — at 153 of 200 claimed, that's exactly 76.5%, and the bar's visual width and the "47 of 200 remaining" text both derive from the same two constants. This matters because a scarcity bar with a number that doesn't match its own visual fill (or that resets on every page load regardless of actual claims) is a well-recognized dark pattern that erodes trust the moment a visitor notices the mismatch — this snippet's bar width and its stated numbers are structurally guaranteed to agree, because both come from the same division.

**Contrast, not just a headline price**

The lifetime price sits directly beside the ongoing subscription price in a two-column comparison, rather than showing the lifetime price in isolation and leaving the "instead of what?" question to the visitor's imagination. Seeing "\\$299 once" next to "\\$19/month, forever" is what makes the payback-period math feel concrete rather than abstract — the visitor can see exactly what they're comparing before reading the computed months figure.

**Urgency that's honest about its own mechanics**

The fine print states plainly that once all 200 licenses are claimed, the deal reverts to subscription-only — a real, finite constraint rather than vague "act now" pressure with no actual limit behind it. Pairing a genuinely limited quantity with a genuinely computed payback period is what separates a legitimate lifetime-deal launch from a manufactured-scarcity dark pattern.

**Customizing it**

Change \`LIFETIME_PRICE\`, \`MONTHLY_PRICE\`, \`TOTAL_LICENSES\`, and \`CLAIMED_LICENSES\` — the payback months, the remaining count, the claimed percentage, and the bar's fill width all recalculate from those four constants. Wire \`CLAIMED_LICENSES\` to your real database count in production so the bar reflects actual, live claims rather than a static demo number.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Compare the two prices', text: 'Lifetime and monthly sit side by side so the trade-off is concrete.' },
      { title: 'Read the computed payback line', text: 'The month count is Math.ceil(lifetime price / monthly price), not a guess.' },
      { title: 'Watch the availability bar animate in', text: 'Its fill width is the real claimed/total percentage.' },
      { title: 'Check the remaining count', text: 'The text and the bar width are guaranteed to agree — both derive from the same numbers.' },
      { title: 'Change the prices', text: 'Edit LIFETIME_PRICE or MONTHLY_PRICE — the payback month recalculates.' },
      { title: 'Wire claimed count to real data', text: 'Replace CLAIMED_LICENSES with a live count from your backend.' },
    ] },
    features: [
      { title: 'Real payback-period math', text: 'Math.ceil(lifetime / monthly), correctly rounded up.' },
      { title: 'Side-by-side price contrast', text: 'Lifetime and subscription prices shown together, not in isolation.' },
      { title: 'Genuinely computed scarcity', text: 'Bar width and remaining count derive from the same two numbers.' },
      { title: 'Animated bar fill', text: 'Fills to the real percentage on load via requestAnimationFrame.' },
      { title: 'Honest urgency copy', text: 'States a real, finite constraint, not vague pressure.' },
      { title: 'Clear one-time-payment framing', text: 'Fine print reinforces no renewals, ever.' },
      { title: 'Four-constant customization', text: 'Every number on the card derives from four editable values.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS.' },
    ],
    useCases: [
      { title: 'Indie SaaS launches', text: 'A classic lifetime-deal pattern for early-stage products.' },
      { title: 'AppSumo-style deal pages', text: 'Model the payback pitch honestly with real math.' },
      { title: 'Alongside a subscription plan', text: 'Pair with [pricing card](/ui-snippets/pricing-card/) for the ongoing option.' },
      { title: 'Founder-led product launches', text: 'Justify a one-time price with a transparent comparison.' },
      { title: 'Limited-run feature unlocks', text: 'Reuse the scarcity-bar pattern for any capped offer.' },
      { title: 'Teaching honest scarcity UI', text: 'A reference for computed-not-decorative urgency bars.' },
      { icon: 'CODE', title: 'Related: Limited-Time Discount Banner', desc: 'See the [Limited-Time Discount Banner](/ui-snippets/pricing-discount-countdown-banner/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why round the payback period up instead of to the nearest month?', a: 'Because the question is "after how many whole months does the subscription cost actually exceed the lifetime price," not "roughly how many months." At $299 lifetime versus $19/month, 15 months of payments totals $285 — still less than $299 — while 16 months totals $304, the first month that genuinely exceeds it. Rounding to nearest (which would give 16 anyway here, but wouldn\'t in every case) or truncating down would misstate the real crossover point.' },
      { q: 'Is the licenses-remaining bar actually tied to a real number?', a: 'Yes — the bar\'s fill width is computed as (CLAIMED_LICENSES / TOTAL_LICENSES) * 100, and the "47 of 200 remaining" text is computed from the same two constants (TOTAL_LICENSES minus CLAIMED_LICENSES). Both numbers are structurally guaranteed to agree because they derive from the same source, unlike a decorative scarcity bar whose displayed count and visual fill could silently drift apart.' },
      { q: 'Why show the subscription price at all if the goal is to sell the lifetime deal?', a: 'The payback-period claim is meaningless without a comparison point — "pays for itself after 16 months" only means something next to the $19/month figure it is being compared against. Showing both prices side by side lets a skeptical visitor verify the payback math themselves rather than taking a bare "great value!" claim on faith.' },
      { q: 'Is this a dark pattern, since it uses urgency messaging?', a: 'The scarcity messaging here is deliberately built to be honest: the remaining-license count and bar fill are real computed values tied to an actual finite quantity (200 total licenses), and the copy states plainly what happens when they run out. The distinction from a dark pattern is whether the constraint is real and consistently represented — a bar that resets on every visit or a count that does not match its own visual fill would cross that line; this one is structured not to.' },
      { q: 'How do I connect CLAIMED_LICENSES to real data instead of a hardcoded number?', a: 'Replace the hardcoded CLAIMED_LICENSES constant with a value fetched from your backend (e.g. a count query against your licenses table) before the calculation runs, ideally cached briefly rather than queried on every single page view. Every other computed value on the card — remaining count, claimed percentage, and bar width — will then reflect the real live count automatically.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly why the payback-period calculation uses Math.ceil() rather than Math.round(), and walk through what would change in the displayed month count if the lifetime or monthly price were adjusted slightly. It's also useful for extending — ask it to fetch CLAIMED_LICENSES from a real backend endpoint instead of a hardcoded constant, add a live countdown timer alongside the license bar for a genuinely time-boxed deal, or add a second payback comparison showing the break-even point in years for a higher-priced annual-subscription alternative.`,
      prompt: `Build a "lifetime deal pricing card" in plain HTML, CSS, and JavaScript with no dependencies.

Requirements:
- Show a one-time lifetime-access price directly alongside an ongoing monthly subscription price in a clear two-column comparison, so the trade-off is concrete rather than showing the lifetime price in isolation.
- Compute a real "pays for itself after N months" figure using Math.ceil(lifetimePrice / monthlyPrice) — verify by hand that this correctly identifies the first WHOLE month where cumulative subscription payments would exceed the lifetime price (not simply the unrounded division result) before finalizing the copy.
- Show a licenses-remaining availability bar whose fill width is computed as (claimed / total) * 100 from two real constants (total licenses and claimed licenses), and show accompanying text stating exactly how many licenses remain — both the bar width and the text must derive from the same two numbers so they can never disagree.
- Animate the availability bar's fill-in on page load (e.g. via requestAnimationFrame) to the real computed percentage, not an arbitrary decorative value.
- Include honest urgency copy stating what concretely happens once all licenses are claimed (e.g. the deal reverts to subscription-only), avoiding vague "act now" pressure with no real constraint behind it.
- Structure the four core numbers (lifetime price, monthly price, total licenses, claimed licenses) as easily editable constants that every displayed and computed value on the card derives from.`,
    },
  },
};

export default pricingLifetimeDealCard;
