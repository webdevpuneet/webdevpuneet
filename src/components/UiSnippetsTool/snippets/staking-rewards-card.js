const stakingRewardsCard = {
  id: 'staking-rewards-card',
  title: 'Staking Rewards Card',
  lastmod: '2026-08-22',
  category: 'cards',
  cdnUrls: [],
  html: `<div class="srw-card">
  <div class="srw-head">
    <div class="srw-asset">
      <span class="srw-icon">◎</span>
      <div>
        <span class="srw-title">Staked SOL</span>
        <span class="srw-sub">Validator: Northwind Pool</span>
      </div>
    </div>
    <span class="srw-apy">6.8% APY</span>
  </div>

  <div class="srw-staked">
    <span class="srw-label">Staked amount</span>
    <span class="srw-amount">128.40 SOL</span>
  </div>

  <div class="srw-rewards">
    <span class="srw-label">Rewards accrued</span>
    <span class="srw-rewards-amount" id="srwRewards">0.000000</span>
    <span class="srw-rewards-unit">SOL</span>
  </div>

  <div class="srw-bar" aria-hidden="true"><div class="srw-bar-fill" id="srwBarFill"></div></div>
  <p class="srw-next">Next payout in <b id="srwCountdown">05:00</b></p>

  <button type="button" class="srw-claim" id="srwClaimBtn">Claim rewards</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f0c;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}

.srw-card{width:100%;max-width:360px;background:linear-gradient(165deg,#122015,#0c130e);border:1px solid #1f3324;border-radius:18px;padding:22px;box-shadow:0 24px 60px rgba(0,0,0,.4)}

.srw-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}
.srw-asset{display:flex;align-items:center;gap:10px}
.srw-icon{width:38px;height:38px;border-radius:50%;background:linear-gradient(135deg,#14f195,#0a8a5a);display:flex;align-items:center;justify-content:center;font-size:18px;color:#06120a;font-weight:800}
.srw-title{display:block;font-size:14px;font-weight:800;color:#f2fbf5}
.srw-sub{display:block;font-size:11px;color:#7fa08c}
.srw-apy{font-size:12px;font-weight:800;color:#14f195;background:rgba(20,241,149,.12);padding:5px 10px;border-radius:999px}

.srw-staked,.srw-rewards{margin-bottom:10px}
.srw-label{display:block;font-size:11px;color:#7fa08c;margin-bottom:3px;text-transform:uppercase;letter-spacing:.04em;font-weight:700}
.srw-amount{font-size:22px;font-weight:800;color:#f2fbf5;font-variant-numeric:tabular-nums}

.srw-rewards{display:flex;align-items:baseline;gap:6px;flex-wrap:wrap}
.srw-rewards .srw-label{width:100%}
.srw-rewards-amount{font-size:26px;font-weight:800;color:#14f195;font-variant-numeric:tabular-nums}
.srw-rewards-unit{font-size:13px;color:#7fa08c;font-weight:700}

.srw-bar{width:100%;height:6px;border-radius:999px;background:#182920;overflow:hidden;margin:14px 0 8px}
.srw-bar-fill{height:100%;width:0%;background:linear-gradient(90deg,#14f195,#0a8a5a);border-radius:999px;transition:width .2s linear}

.srw-next{font-size:12px;color:#7fa08c;margin-bottom:16px}
.srw-next b{color:#f2fbf5;font-variant-numeric:tabular-nums}

.srw-claim{width:100%;background:linear-gradient(135deg,#14f195,#0a8a5a);color:#06120a;border:none;border-radius:10px;padding:13px;font-size:14px;font-weight:800;cursor:pointer;transition:filter .15s,transform .1s;font-family:inherit}
.srw-claim:hover{filter:brightness(1.08)}
.srw-claim:active{transform:scale(.98)}
.srw-claim.success{background:linear-gradient(135deg,#22c55e,#15803d);color:#fff}
.srw-claim:disabled{cursor:default}`,

  js: `var STAKED_AMOUNT = 128.40;
var APY = 0.068;
var PAYOUT_PERIOD_SEC = 300; // 5 minutes, simulated payout cycle

var rewardsEl = document.getElementById('srwRewards');
var barFill = document.getElementById('srwBarFill');
var countdownEl = document.getElementById('srwCountdown');
var claimBtn = document.getElementById('srwClaimBtn');

// Reward accrued per second, derived from staked amount and APY.
var perSecondRate = (STAKED_AMOUNT * APY) / (365 * 24 * 60 * 60);

var accrued = 0;
var secondsIntoPeriod = 0;
var claimed = false;

function fmtCountdown(secLeft) {
  var m = Math.floor(secLeft / 60);
  var s = Math.floor(secLeft % 60);
  return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
}

function tick() {
  if (claimed) return;

  accrued += perSecondRate;
  secondsIntoPeriod += 1;

  rewardsEl.textContent = accrued.toFixed(6);

  var pct = Math.min(100, (secondsIntoPeriod / PAYOUT_PERIOD_SEC) * 100);
  barFill.style.width = pct + '%';

  var secLeft = Math.max(0, PAYOUT_PERIOD_SEC - secondsIntoPeriod);
  countdownEl.textContent = fmtCountdown(secLeft);

  if (secondsIntoPeriod >= PAYOUT_PERIOD_SEC) {
    secondsIntoPeriod = 0;
  }
}

setInterval(tick, 1000);

claimBtn.addEventListener('click', function () {
  if (claimed || accrued <= 0) return;
  claimed = true;
  claimBtn.disabled = true;
  var claimedAmount = accrued.toFixed(6);
  claimBtn.classList.add('success');
  claimBtn.textContent = '\\u2713 Claimed ' + claimedAmount + ' SOL';

  setTimeout(function () {
    accrued = 0;
    secondsIntoPeriod = 0;
    claimed = false;
    claimBtn.disabled = false;
    claimBtn.classList.remove('success');
    claimBtn.textContent = 'Claim rewards';
    rewardsEl.textContent = '0.000000';
    barFill.style.width = '0%';
  }, 2200);
});`,

  seo: {
    title: 'Staking Rewards Card — Free Live-Accruing Crypto Rewards UI',
    description: `A staking card with real-time accruing rewards, an APY badge, a payout countdown, and a claim button with a success transition. Pure HTML, CSS & JS.`,
    about: {
      title: 'Staking Rewards Card — Real-Time Accrual, Payout Countdown & Claim Flow',
      description: `Staking interfaces live or die on one feeling: rewards should look alive, ticking upward in real time rather than sitting static until a page refresh. This snippet builds that staking rewards card — staked amount, APY, a rewards counter that increments every second, a payout-cycle progress bar, a countdown, and a claim button with a genuine success transition — using nothing but \`setInterval\` and careful number formatting.

**Deriving a per-second rate from APY**

Rather than animating an arbitrary number, the accrual is grounded in real inputs: \`perSecondRate = (stakedAmount * apy) / secondsPerYear\`. This is the actual per-second yield implied by the displayed APY, so the ticking number represents something real rather than a cosmetic animation — swap in your protocol's actual reward-rate calculation and the rest of the card keeps working unchanged.

**Six decimal places, not two**

Crypto reward amounts are tiny per second — a two-decimal display would show \`0.00\` forever. The rewards counter is formatted with \`toFixed(6)\`, so the increments are visible tick to tick even though the underlying accrual is a fraction of a cent per second. This is the detail that makes the card feel "live" rather than frozen.

**A payout cycle, visualized**

A progress bar fills over a fixed \`PAYOUT_PERIOD_SEC\` window (5 minutes here, representing a compressed simulation of a real payout epoch), paired with a countdown formatted as \`mm:ss\`. Both derive from the same \`secondsIntoPeriod\` counter, so the bar and the countdown text can never drift out of sync with each other.

**Claim: disable, confirm, then reset**

Clicking "Claim rewards" freezes further accrual (\`claimed = true\`), disables the button so a double-click can't claim twice, and swaps the label to a checkmark confirmation showing the exact claimed amount. After a short delay it resets the counter to zero and re-enables claiming — modeling the real on-chain sequence of a claim transaction settling before the balance can accrue again.

**Building a real integration**

Replace the simulated accrual with a periodic read of your staking contract or API's actual accrued-rewards value, and wire the claim button to submit a real claim transaction — show the success state only after the transaction confirms, and surface a pending/error state for the in-between. Pair this card with a [wallet card](/ui-snippets/wallet-card/) for balance context or a [crypto price ticker card](/ui-snippets/crypto-price-ticker-card/) to convert rewards to a fiat value.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A staking card renders with a staked balance and 0.000000 accrued rewards.` },
      { title: 'Watch rewards tick up', text: `Every second, the rewards counter increments based on the derived per-second APY rate.` },
      { title: 'Watch the payout cycle', text: `The progress bar fills and the countdown ticks down over a 5-minute simulated payout period.` },
      { title: 'Click "Claim rewards"', text: `The button disables, shows a checkmark success state with the claimed amount, then resets after a short delay.` },
      { title: 'Adjust the inputs', text: `Change STAKED_AMOUNT and APY to reflect a real position.` },
      { title: 'Wire a real claim', text: `Replace the setTimeout reset with an actual claim transaction call, showing pending/error states as needed.` },
    ] },
    features: [
      { title: 'APY-derived accrual', text: `The ticking rate is computed from real staked amount and APY, not an arbitrary animation.` },
      { title: 'Six-decimal precision', text: `Small per-second increments stay visible instead of rounding to zero.` },
      { title: 'Synced progress + countdown', text: `One counter drives both the payout bar and the mm:ss countdown text.` },
      { title: 'Guarded claim flow', text: `The button disables on click so a double-click cannot double-claim.` },
      { title: 'Success confirmation', text: `Shows the exact claimed amount before resetting for the next cycle.` },
      { title: 'Gradient validator branding', text: `An icon and accent gradient suggest a specific staking pool or validator.` },
      { title: 'Tabular numerals throughout', text: `Staked amount, rewards, and countdown all use monospaced digit widths.` },
      { title: 'Framework-portable state', text: `All logic runs off plain counters — trivial to move into React/Vue state.` },
    ],
    useCases: [
      { title: 'Staking dashboards', text: 'Show rewards ticking up live beside a [wallet card](/ui-snippets/wallet-card/), with the rate computed from the real staked amount and APY.' },
      { title: 'DeFi yield products', text: 'Display accruing yield for a vault or pool, with six-decimal precision so tiny per-second increments stay visible instead of rounding away.' },
      { title: 'Pool and validator comparison', text: 'Compare APY and accrual across options, with one counter driving both the payout progress bar and the countdown to the next payout.' },
      { title: 'Portfolio overviews', text: 'Convert accrued rewards to a fiat figure with a [currency converter](/ui-snippets/currency-converter/), keeping the crypto and fiat values side by side.' },
      { title: 'Wallet-gated claiming', text: 'Gate the claim action behind a [wallet connect button](/ui-snippets/wallet-connect-button/), with the button disabled on click so a double click cannot claim twice.' },
    ],
    faqs: [
      { q: 'How is the per-second reward rate calculated?', a: `perSecondRate = (stakedAmount * apy) / secondsPerYear. This derives the actual per-second yield implied by the displayed APY from the staked amount, so the ticking counter represents a real number rather than an arbitrary animated increment. Replace stakedAmount and apy with real position data and the same formula produces a correct rate.` },
      { q: 'Why does the reward counter show six decimal places?', a: `Per-second crypto accrual is extremely small — with typical APYs, two decimal places would show 0.00 indefinitely and the card would look frozen. Formatting with toFixed(6) keeps the increments visible tick to tick, which is what makes the card read as "live" rather than static.` },
      { q: 'What happens when I click Claim rewards twice quickly?', a: `The button is disabled immediately inside the click handler, before the success state or reset timeout runs, so a second click while the confirmation is showing has no effect. This models the real-world guard against double-submitting a claim transaction while the first one is still settling.` },
      { q: 'How do I connect this to a real staking contract or API?', a: `Replace the setInterval accrual with a periodic read of your contract's or API's actual accrued-rewards value (poll it, or subscribe to relevant events). In the claim handler, submit the real claim transaction and only show the success state once it confirms on-chain — add a pending spinner state for the interval in between, and an error state if the transaction fails or is rejected.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Hold accrued, secondsIntoPeriod, and claimed in component state, update accrued on a setInterval-equivalent effect using the same per-second rate formula, and derive the progress bar width and countdown text from secondsIntoPeriod in render. The claim handler becomes an async action that awaits your real claim call before setting claimed back to false.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the accrual math or the claim-guard logic on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how perSecondRate is derived from the staked amount and APY, and why six decimal places (rather than the usual two) are necessary for the reward counter to visibly tick rather than appear frozen at small per-second yields. The same assistant can help optimize it — asking whether disabling the claim button synchronously inside the click handler is sufficient protection against a double-claim race, or whether the payout-cycle countdown should instead be computed from a fixed epoch timestamp rather than a client-side counter that resets on refresh. It's also useful for extending the card: ask it to add a pending/error state for a real on-chain claim transaction, show a running fiat-value conversion of the accrued rewards, or add an auto-compound toggle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "staking rewards card" in plain HTML, CSS, and JavaScript with no library or CDN dependency.

Requirements:
- A card showing an asset/validator icon and name, a staked amount, an APY badge, and a live-accruing rewards counter formatted to six decimal places so tiny per-second increments remain visible instead of rounding to zero.
- Derive the reward accrual rate mathematically from the staked amount and the APY (rate per second = stakedAmount * apy / secondsPerYear), not an arbitrary hardcoded animation increment, and increment the displayed rewards by that rate once per second using setInterval.
- A progress bar and an mm:ss countdown that both represent the same fixed-length "payout cycle" period (e.g. simulate a 5-minute cycle), driven from one shared counter so the bar fill percentage and the countdown text can never drift out of sync with each other, resetting when the cycle completes.
- A "Claim rewards" button that, on click, immediately disables itself (so rapid double-clicks cannot double-claim), stops further accrual, and shows a success state displaying the exact claimed amount with a checkmark — then after a short delay resets the rewards counter to zero, re-enables the button, and resumes accrual.
- Use tabular/monospaced numeral styling on the staked amount, rewards counter, and countdown so digit changes do not cause horizontal layout shift.`,
    },
  },
};

export default stakingRewardsCard;
