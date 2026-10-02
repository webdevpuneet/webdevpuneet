const pricingHiddenFeesBreakdown = {
  id: 'pricing-hidden-fees-breakdown',
  title: 'Transparent Fees Breakdown',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="hfb-wrap">
  <div class="hfb-card">
    <div class="hfb-head">
      <p class="hfb-plan">Team plan</p>
      <h2 class="hfb-title">No hidden fees — see exactly what you pay</h2>
    </div>

    <button class="hfb-toggle" id="hfbToggle" aria-expanded="false" aria-controls="hfbLines">
      <span>Show full price breakdown</span>
      <svg class="hfb-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </button>

    <div class="hfb-lines" id="hfbLines" hidden>
      <div class="hfb-line" data-amount="49.00"><span>Base subscription</span><span class="hfb-amt">$49.00</span></div>
      <div class="hfb-line" data-amount="2.00"><span>Platform fee</span><span class="hfb-amt">$2.00</span></div>
      <div class="hfb-line" data-amount="1.48"><span>Payment processing (2.9%)</span><span class="hfb-amt">$1.48</span></div>
      <div class="hfb-line" data-amount="4.46"><span>Estimated sales tax (8.5%)</span><span class="hfb-amt">$4.46</span></div>
    </div>

    <div class="hfb-total-row">
      <span>Total charged today</span>
      <span class="hfb-total" id="hfbTotal">—</span>
    </div>
    <p class="hfb-check" id="hfbCheck"></p>

    <button class="hfb-cta">Subscribe — pay <span id="hfbCtaTotal">—</span>/mo</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f0d;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.hfb-wrap{width:100%;max-width:400px}
.hfb-card{background:linear-gradient(165deg,#122019,#0c1512);border:1px solid #1f3a2c;border-radius:20px;padding:28px 26px}
.hfb-plan{font-size:12px;font-weight:700;color:#34d399;text-transform:uppercase;letter-spacing:.06em}
.hfb-title{font-size:18px;font-weight:800;color:#f4f7fb;margin-top:8px;line-height:1.35}
.hfb-toggle{width:100%;margin-top:20px;display:flex;justify-content:space-between;align-items:center;background:#0e1a15;border:1.5px solid #1f3a2c;color:#c3cbdb;font-family:inherit;font-size:13px;font-weight:700;padding:12px 14px;border-radius:10px;cursor:pointer}
.hfb-chevron{transition:transform .2s;color:#34d399}
.hfb-toggle[aria-expanded="true"] .hfb-chevron{transform:rotate(180deg)}
.hfb-lines{margin-top:4px;display:flex;flex-direction:column;overflow:hidden}
.hfb-line{display:flex;justify-content:space-between;font-size:13px;color:#9aa8a0;padding:11px 14px;border-bottom:1px dashed #1f3a2c}
.hfb-amt{color:#c3cbdb;font-variant-numeric:tabular-nums;font-weight:600}
.hfb-total-row{display:flex;justify-content:space-between;align-items:baseline;margin-top:16px;padding-top:16px;border-top:1.5px solid #1f3a2c}
.hfb-total-row span:first-child{font-size:13.5px;font-weight:700;color:#f4f7fb}
.hfb-total{font-size:24px;font-weight:800;color:#34d399;font-variant-numeric:tabular-nums}
.hfb-check{font-size:11.5px;color:#5c6779;margin-top:6px}
.hfb-cta{width:100%;margin-top:18px;background:#34d399;color:#062018;border:none;font-family:inherit;font-size:14.5px;font-weight:800;padding:13px;border-radius:10px;cursor:pointer;transition:background .15s}
.hfb-cta:hover{background:#2fc290}`,

  js: `const toggle = document.getElementById('hfbToggle');
const lines = document.getElementById('hfbLines');
const totalEl = document.getElementById('hfbTotal');
const ctaTotalEl = document.getElementById('hfbCtaTotal');
const checkEl = document.getElementById('hfbCheck');

// The total is the REAL computed sum of every itemized line — never a
// separately hardcoded number that could silently drift out of sync.
const lineEls = Array.from(lines.querySelectorAll('.hfb-line'));
const total = lineEls.reduce((sum, el) => sum + parseFloat(el.dataset.amount), 0);
const totalFormatted = '$' + total.toFixed(2);

totalEl.textContent = totalFormatted;
ctaTotalEl.textContent = totalFormatted;
checkEl.textContent =
  lineEls.map((el) => '$' + parseFloat(el.dataset.amount).toFixed(2)).join(' + ') +
  ' = ' + totalFormatted + ' — the math you see is the math you pay.';

toggle.addEventListener('click', () => {
  const expanded = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!expanded));
  lines.hidden = expanded;
  toggle.querySelector('span').textContent = expanded
    ? 'Show full price breakdown'
    : 'Hide price breakdown';
});`,

  seo: {
    title: 'Transparent Fees Breakdown — Free HTML CSS JS Snippet, No Hidden Fees',
    description: 'An expandable itemized-fee breakdown where the total is the real computed sum of every visible line item, demonstrating genuine "no hidden fees" pricing.',
    about: {
      title: 'Transparent Fees Breakdown — A Total That Is Actually the Sum of What You See',
      description: `"No hidden fees" is a claim most pricing pages make in text without proving it. This snippet proves it structurally: the checkout total displayed is never a separately hardcoded number sitting next to the itemized fee list — it is computed at runtime by summing the exact line items rendered on screen, so the total and the line items can never silently drift apart.

**One array, one reduce, one total**

Every fee line is a \`.hfb-line\` element carrying its dollar amount in a \`data-amount\` attribute. The JS collects all of them and computes \`lineEls.reduce((sum, el) => sum + parseFloat(el.dataset.amount), 0)\` — a genuine sum of the base subscription (\\$49.00), platform fee (\\$2.00), payment processing at 2.9% (\\$1.48), and estimated sales tax at 8.5% (\\$4.46), landing on \\$56.94. That total is written into both the summary row and the CTA button from the same computed variable, so there is structurally no way for the displayed total to disagree with what the itemized lines actually add up to.

**The math is shown, not just claimed**

Beneath the total, a small line of arithmetic — \`$49.00 + $2.00 + $1.48 + $4.46 = $56.94\` — is generated from the same array the total was computed from, spelling out the addition explicitly rather than asking the visitor to trust an opaque final figure. This is the detail that turns "no hidden fees" from marketing copy into something a skeptical shopper can verify themselves in three seconds.

**An accordion, not a wall of fees by default**

The itemized breakdown starts collapsed behind a "Show full price breakdown" toggle so the card isn't visually noisy for visitors who just want the bottom-line number — but the total is always visible regardless of whether the accordion is open, and expanding it never changes the total, only reveals how it was derived. \`aria-expanded\` on the toggle button keeps the interaction accessible to screen readers and keyboard users, and the chevron icon rotates to reflect state.

**Why this pattern matters for checkout trust**

Surprise fees revealed only at the final step of checkout are one of the most common reasons for cart abandonment and post-purchase disputes. Structuring the total as a genuine sum of visible line items — rather than a number a designer typed in separately from the fee list — is a small implementation choice with an outsized trust payoff: it makes "no hidden fees" a property of the code, not just a sentence on the page.

**Customizing it**

Add, remove, or change fee lines by editing the \`data-amount\` attributes and their labels — the total, the CTA button text, and the arithmetic line all recompute automatically from whatever lines are present. Pair it with [pricing card](/ui-snippets/pricing-card/) or a full [pricing page](/ui-snippets/pricing-page/) as the transparency detail beneath the headline price.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'See the always-visible total', text: 'The total is shown before the breakdown is even expanded.' },
      { title: 'Expand the breakdown', text: 'Click the toggle to reveal every itemized fee line.' },
      { title: 'Check the arithmetic line', text: 'It spells out the exact addition that produces the total.' },
      { title: 'Confirm nothing changes on toggle', text: 'Expanding or collapsing never alters the computed total.' },
      { title: 'Add a fee line', text: 'Add a .hfb-line element with a data-amount attribute — the total updates automatically.' },
      { title: 'Change a fee amount', text: 'Edit a data-amount value and the sum, CTA text, and arithmetic line all recompute.' },
    ] },
    features: [
      { title: 'Total is a real computed sum', text: 'reduce() over the visible line items, never a separate hardcoded figure.' },
      { title: 'Shown arithmetic', text: 'The addition itself is spelled out beneath the total.' },
      { title: 'Accessible accordion toggle', text: 'aria-expanded reflects state for screen readers.' },
      { title: 'CTA mirrors the same total', text: 'The button text is written from the identical computed value.' },
      { title: 'Add/remove lines safely', text: 'The sum recalculates from whatever line elements exist.' },
      { title: 'Collapsed by default', text: 'Keeps the card clean while the total stays always visible.' },
      { title: 'Two-decimal currency formatting', text: 'toFixed(2) keeps every figure consistently formatted.' },
      { title: 'Zero dependencies', text: 'Pure HTML, CSS, and vanilla JS.' },
    ],
    useCases: [
      { title: 'Checkout fee transparency', text: 'Show tax and processing fees before the customer pays, with the displayed total being a real `reduce()` over the visible line items.' },
      { title: 'SaaS pricing trust details', text: 'Pair with a [pricing card](/ui-snippets/pricing-card/) as a trust detail, spelling out the addition beneath the total so nothing is hidden.' },
      { title: 'Marketplace and ticketing sites', text: 'Break down service and processing charges in an expandable list, using `aria-expanded` so screen reader users know the state.' },
      { title: 'Subscription renewal pages', text: 'Show exactly what a renewal charge consists of, with the call-to-action button text written from the identical computed value.' },
      { title: 'Competitor transparency comparisons', text: 'Demonstrate a no hidden fees claim structurally rather than in a slogan, and preview a computed total before a customer commits.' },
      { icon: 'CODE', title: 'Related: Limited-Time Discount Banner', desc: 'See the [Limited-Time Discount Banner](/ui-snippets/pricing-discount-countdown-banner/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the total really computed, or is it just styled to look that way?', a: 'It is genuinely computed at runtime: the JS collects every .hfb-line element, reads its data-amount attribute, and sums them with Array.reduce(). The total, the CTA button text, and the arithmetic line beneath the total are all written from that single computed value, so there is no separately hardcoded total that could disagree with the itemized lines.' },
      { q: 'Do the four example fees actually add up to the displayed total?', a: 'Yes — $49.00 base plus $2.00 platform fee plus $1.48 processing (2.9%) plus $4.46 estimated tax (8.5%) sums to exactly $56.94, and this is the literal reduce() result rather than a coincidentally matching hand-typed number.' },
      { q: 'Why show the arithmetic line beneath the total?', a: 'Stating a final number alone still asks a skeptical shopper to trust that it was derived correctly. Spelling out the exact addition that produces it — generated from the same data the total was computed from — lets a visitor verify it themselves in seconds, which is a meaningfully stronger trust signal than the total alone.' },
      { q: 'Does expanding or collapsing the accordion change the total?', a: 'No. The total is computed once from the underlying data-amount values and displayed regardless of whether the breakdown is expanded. The accordion only controls whether the itemized lines are visible; it never recalculates or alters the total itself.' },
      { q: 'How do I add a new fee, like a regional surcharge?', a: 'Add another .hfb-line element inside #hfbLines with its own data-amount attribute and label text. Because the total is computed by summing whatever .hfb-line elements are present at runtime, no other code needs to change — the total, CTA text, and arithmetic line all pick up the new fee automatically.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain why the displayed total is computed with Array.reduce() over the visible line items instead of being a separately typed number, and why that structural choice is what actually makes a "no hidden fees" claim verifiable rather than just asserted. It's also useful for extending — ask it to add a currency-aware version using Intl.NumberFormat instead of manual toFixed(2), make individual fee lines conditionally appear based on region (e.g. tax only in certain jurisdictions), or add a small tooltip on each fee line explaining what it covers.`,
      prompt: `Build a "transparent fees breakdown" pricing component in plain HTML, CSS, and JavaScript with no dependencies.

Requirements:
- Show a base subscription price plus several itemized fee lines (e.g. a flat platform fee, a percentage-based payment processing fee, and a percentage-based estimated tax), each with a realistic, clearly labeled dollar amount stored as a data attribute on its line element.
- Compute the displayed total by summing the actual data-amount values of every visible line item at runtime using array reduction — do not hardcode the total as a separate number that merely happens to match the sum; verify your example fee amounts actually add up to the total your copy will reference.
- Write the exact same computed total into both a prominent "total charged today" summary and the call-to-action button text, so both are guaranteed to always agree.
- Add a small line of text beneath the total that spells out the literal addition (e.g. "$49.00 + $2.00 + $1.48 + $4.46 = $56.94"), generated from the same line-item data the total was computed from.
- Put the itemized fee lines behind an accessible accordion toggle (using aria-expanded, with a rotating chevron icon) that is collapsed by default, while keeping the total and CTA always visible regardless of whether the accordion is expanded.
- Structure the code so adding, removing, or changing a fee line automatically updates the total, the CTA text, and the arithmetic line with no other code changes required.`,
    },
  },
};

export default pricingHiddenFeesBreakdown;
