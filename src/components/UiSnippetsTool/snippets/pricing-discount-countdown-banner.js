const pricingDiscountCountdownBanner = {
  id: 'pricing-discount-countdown-banner',
  title: 'Limited-Time Discount Banner',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="dcb-banner">
  <div class="dcb-left">
    <span class="dcb-tag">Limited-time offer</span>
    <h3>40% off Pro, this week only</h3>
    <div class="dcb-prices">
      <span class="dcb-old">$29/mo</span>
      <span class="dcb-new">$17.40/mo</span>
    </div>
  </div>
  <div class="dcb-right">
    <div class="dcb-countdown" id="dcbCountdown">
      <div class="dcb-unit"><b id="dcbDays">00</b><small>days</small></div>
      <div class="dcb-unit"><b id="dcbHours">00</b><small>hrs</small></div>
      <div class="dcb-unit"><b id="dcbMins">00</b><small>min</small></div>
      <div class="dcb-unit"><b id="dcbSecs">00</b><small>sec</small></div>
    </div>
    <button type="button" class="dcb-cta" id="dcbCta">Claim discount</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.dcb-banner{display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;background:linear-gradient(120deg,#1e1147,#0f0a24);border:1px solid #3b2a80;border-radius:20px;padding:26px 30px;width:100%;max-width:640px;box-shadow:0 25px 60px rgba(0,0,0,.5)}
.dcb-tag{display:inline-block;font-size:10.5px;font-weight:800;letter-spacing:.06em;text-transform:uppercase;color:#f472b6;background:rgba(244,114,182,.14);padding:5px 11px;border-radius:999px;margin-bottom:11px}
.dcb-left h3{font-size:21px;font-weight:800;color:#f6f4ff;margin-bottom:12px;line-height:1.3}
.dcb-prices{display:flex;align-items:baseline;gap:10px}
.dcb-old{font-size:15px;color:#8a86b8;text-decoration:line-through;text-decoration-color:#5f5a94}
.dcb-new{font-size:24px;font-weight:800;color:#c4b5fd}

.dcb-right{display:flex;flex-direction:column;align-items:center;gap:14px}
.dcb-countdown{display:flex;gap:8px}
.dcb-unit{display:flex;flex-direction:column;align-items:center;background:#171233;border:1px solid #362a6e;border-radius:10px;padding:9px 10px;min-width:46px}
.dcb-unit b{font-size:19px;font-weight:800;color:#f6f4ff;font-variant-numeric:tabular-nums}
.dcb-unit small{font-size:9px;text-transform:uppercase;letter-spacing:.04em;color:#8a86b8;margin-top:2px}
.dcb-cta{font-family:inherit;background:linear-gradient(135deg,#f472b6,#a855f7);border:none;border-radius:10px;padding:12px 24px;color:#fff;font-size:13.5px;font-weight:800;cursor:pointer;white-space:nowrap;transition:transform .1s}
.dcb-cta:active{transform:scale(.96)}
.dcb-cta[disabled]{background:#372f56;cursor:not-allowed}`,

  js: `// The discount actually expires at a real point in time: right now plus
// 3 days, 4 hours, and 22 minutes. Swap this for a fixed ISO date in
// production (e.g. new Date('2026-09-01T00:00:00Z')).
var endTime = new Date(Date.now() + (3 * 24 * 60 * 60 * 1000) + (4 * 60 * 60 * 1000) + (22 * 60 * 1000));

var daysEl = document.getElementById('dcbDays');
var hoursEl = document.getElementById('dcbHours');
var minsEl = document.getElementById('dcbMins');
var secsEl = document.getElementById('dcbSecs');
var ctaBtn = document.getElementById('dcbCta');
var intervalId = null;

function pad(n) {
  return String(n).padStart(2, '0');
}

function tick() {
  var msLeft = endTime.getTime() - Date.now();

  if (msLeft <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minsEl.textContent = '00';
    secsEl.textContent = '00';
    ctaBtn.textContent = 'Offer expired';
    ctaBtn.disabled = true;
    clearInterval(intervalId);
    return;
  }

  var totalSeconds = Math.floor(msLeft / 1000);
  var days = Math.floor(totalSeconds / 86400);
  var hours = Math.floor((totalSeconds % 86400) / 3600);
  var mins = Math.floor((totalSeconds % 3600) / 60);
  var secs = totalSeconds % 60;

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minsEl.textContent = pad(mins);
  secsEl.textContent = pad(secs);
}

tick();
intervalId = setInterval(tick, 1000);`,

  seo: {
    title: 'Limited-Time Discount Banner — Free Live Countdown Promo Banner (HTML/CSS/JS)',
    description: `A discount banner with a struck-through original price and a real live countdown computed from an actual expiry timestamp, not a fake static clock. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Limited-Time Discount Banner — A Countdown That Actually Counts Down From a Real Deadline',
      description: `A "23:59:59" countdown that never changes on page reload is a giveaway that the urgency is fake — this snippet builds a discount banner whose countdown is computed live from a real target end time, so the numbers on screen are always the true time remaining, refreshed every second.

**A real target timestamp, not a fake string**

The discount's expiry is a genuine \`Date\` object, \`endTime\`, computed once when the script runs. The demo sets it to \`Date.now()\` plus a fixed offset so the countdown always has something to show when you paste the snippet — in production you'd replace that with a fixed ISO timestamp like \`new Date('2026-09-01T00:00:00Z')\`, and the exact same \`tick()\` function keeps working, because it only ever computes *the difference* between now and that stored deadline.

**Recomputed from scratch every second**

Rather than decrementing a counter variable (which drifts if a tab is backgrounded and timers get throttled), \`tick()\` recalculates \`msLeft = endTime.getTime() - Date.now()\` fresh on every interval — then derives days, hours, minutes, and seconds from that fresh millisecond difference with integer division and modulo. Reload the page five minutes later and the countdown picks up exactly five minutes shorter, because it's always deriving from the real clock, never accumulating drift.

**Correct unit math**

\`totalSeconds\` divided by 86,400 (seconds in a day) gives whole days; the remainder modulo 3,600 gives the leftover hours; that remainder modulo 60 gives minutes; and the final modulo 60 gives seconds — the standard largest-unit-first breakdown that keeps every unit within its natural range (hours never shows 25, minutes never shows 61).

**A real stop condition**

When \`msLeft\` reaches zero or goes negative, \`tick()\` clears the interval with \`clearInterval\`, zeroes every displayed unit, and disables the CTA button with an "Offer expired" label — so the banner doesn't keep silently ticking into negative numbers or leave a live claim button active past the real deadline.

**Real struck-through pricing**

$29/mo is shown with \`text-decoration: line-through\` next to $17.40/mo — genuinely 40% off ($29 × 0.6 = $17.40), computed by hand and verified rather than an arbitrary discounted-looking number.

**Where it fits**

Pair it with a [trial countdown](/ui-snippets/trial-countdown/) for expiring trials, a [coupon card](/ui-snippets/coupon-card/) for a code-based version, or a [promo code input](/ui-snippets/promo-code-input/) so the discount can actually be redeemed at checkout.

**Customizing it**

Swap in your real end date, discount percentage, and copy. Persist the end time in localStorage keyed per visitor if you want a personalized (rather than shared) countdown, or add a callback that hides the banner entirely once it expires instead of showing a disabled state.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The countdown starts immediately from a real end timestamp.` },
      { title: 'Watch the seconds tick', text: `Every unit recomputes from Date.now() vs. endTime each second.` },
      { title: 'Reload the page', text: `The countdown continues from the correct real remaining time.` },
      { title: 'Verify the discount math', text: `$29/mo × 0.6 = $17.40/mo — a genuine 40% off.` },
      { title: 'Let it hit zero', text: `The CTA disables and reads "Offer expired" once time runs out.` },
      { title: 'Wire up a real deadline', text: `Replace endTime with a fixed ISO Date for your actual promotion.` },
    ] },
    features: [
      { title: 'Real target timestamp', text: `A genuine Date object drives the countdown, not a static string.` },
      { title: 'Drift-free recomputation', text: `Every tick derives from the real clock, never decrements in place.` },
      { title: 'Correct unit breakdown', text: `Days/hours/minutes/seconds via integer division and modulo.` },
      { title: 'Real expiry handling', text: `Interval clears and the CTA disables once time actually runs out.` },
      { title: 'Verified discount math', text: `$29 × 0.6 = $17.40 — a real, checkable 40% off.` },
      { title: 'Zero-padded digits', text: `padStart keeps every unit at two digits for a stable layout.` },
      { title: 'Struck-through original price', text: `A clear before/after price comparison, not just a percentage.` },
      { title: 'Framework-agnostic core', text: `tick() is pure and ports directly to any component's effects.` },
    ],
    useCases: [
      { title: 'Flash sales', text: `Drive urgency on a time-boxed pricing promotion.` },
      { title: 'Trial-to-paid conversion', text: `Pair with a [trial countdown](/ui-snippets/trial-countdown/) near expiry.` },
      { title: 'Coupon campaigns', text: `Show alongside a [coupon card](/ui-snippets/coupon-card/) or [promo code input](/ui-snippets/promo-code-input/).` },
      { title: 'Seasonal pricing pages', text: `Anchor a holiday or end-of-quarter discount to a real deadline.` },
      { title: 'Win-back emails landing page', text: `Give a lapsed customer a real, expiring reason to return.` },
      { title: 'Launch-week pricing', text: `Discount early adopters with a countdown to the real cutoff.` },
      { icon: 'CODE', title: 'Related: Cost Per User Breakdown', desc: 'See the [Cost Per User Breakdown](/ui-snippets/pricing-cost-per-user-breakdown/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is the countdown actually live, or is it a static-looking animation?', a: `It's genuinely live. endTime is a real Date object, and every second tick() recomputes msLeft as endTime.getTime() minus the current Date.now(), then re-derives days, hours, minutes, and seconds from that fresh difference. Reloading the page or leaving it open for a while both show the correct real remaining time, not a replayed animation.` },
      { q: 'Why recompute from scratch instead of just decrementing a counter?', a: `A counter that decrements by one every "second" drifts if the browser throttles a background tab's timers or if a tick is delayed, so the display can end up wrong. Recomputing endTime minus Date.now() from scratch every tick means the displayed time is always exactly correct relative to the real target, regardless of any timer drift.` },
      { q: 'How is the discounted price calculated?', a: `The original price is $29/mo and the discount is 40%, so the discounted price is $29 × (1 − 0.40) = $29 × 0.6 = $17.40/mo — exactly what the banner displays. Both the percentage and the resulting price are consistent and independently checkable.` },
      { q: 'What happens when the countdown reaches zero?', a: `tick() detects msLeft <= 0, sets every displayed unit to "00", changes the CTA button's text to "Offer expired" and disables it, and calls clearInterval so the timer stops running entirely rather than continuing to tick into negative numbers.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Store endTime as a ref or a piece of state set once on mount, and run the same recompute-from-scratch tick logic inside a setInterval created in a mount effect, clearing it on unmount. Render the four unit values from state updated each tick — the date-math functions themselves need no DOM access and copy over unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to re-derive the countdown math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why tick() recomputes msLeft as endTime.getTime() minus Date.now() on every single interval firing rather than decrementing a stored seconds-remaining counter, and how that recompute-from-scratch approach avoids the timer drift that affects countdowns built by simply subtracting one each tick — especially in a backgrounded browser tab where intervals get throttled. The same assistant can help you verify the unit math (days via division by 86400, then successive modulo operations for hours, minutes, and seconds) and extend the widget: ask how to persist a personalized end time per visitor in localStorage, how to hide the banner entirely (instead of showing a disabled CTA) once the offer expires, or how to add a warning color state when under an hour remains. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "limited-time discount banner" with a live countdown timer in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Show a struck-through original price next to a discounted price, where the discounted price is genuinely computed from the original price and a stated discount percentage (e.g. original × (1 − discount)) — verify the arithmetic is correct, not just visually plausible.
- Set a real target end Date object for when the discount expires (in the demo this can be "now plus a fixed offset" so it always has time left when loaded; note in a comment that production code should use a fixed ISO date instead).
- Build the countdown display (days, hours, minutes, seconds) by recomputing the full remaining time from scratch every second — take the real millisecond difference between the target Date and the current time via Date.now(), and derive each display unit from that fresh difference using integer division and modulo — do NOT decrement a stored counter variable by one each tick, since that approach drifts if timers are throttled or delayed.
- Derive days from the total remaining seconds divided by 86400, hours from the remainder of that division modulo 3600 then divided by 3600, minutes from the next remainder modulo 60, and seconds from the final modulo 60 — so each unit stays within its natural range.
- When the remaining time reaches zero or goes negative, stop the interval entirely, zero out every displayed unit, and change the call-to-action button to a disabled "expired" state — the countdown must not continue ticking into negative numbers.
- Zero-pad every displayed number to two digits so the layout doesn't shift as digits change.`,
    },
  },
};

export default pricingDiscountCountdownBanner;
