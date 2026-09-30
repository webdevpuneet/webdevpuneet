const loyaltyPointsWidget = {
  id: 'loyalty-points-widget',
  title: 'Loyalty Points Widget',
  lastmod: '2026-06-16',
  category: 'cards',
  html: `<div class="lp-card">
  <div class="lp-glow"></div>
  <div class="lp-head">
    <div>
      <div class="lp-tier"><span class="lp-dot"></span>Gold member</div>
      <div class="lp-balance"><span id="lpPoints">1680</span> <span class="lp-unit">pts</span></div>
    </div>
    <div class="lp-crown">👑</div>
  </div>

  <div class="lp-progress-head">
    <span id="lpNext">320 pts to Platinum</span>
    <span id="lpPct">84%</span>
  </div>
  <div class="lp-track"><div class="lp-fill" id="lpFill"></div></div>

  <div class="lp-rewards">
    <div class="lp-rtitle">Redeem your points</div>

    <div class="lp-reward" data-cost="500">
      <span class="lp-remoji">🎟️</span>
      <span class="lp-rinfo"><span class="lp-rname">$5 voucher</span><span class="lp-rcost">500 pts</span></span>
      <button class="lp-redeem" onclick="redeem(this)">Redeem</button>
    </div>
    <div class="lp-reward" data-cost="800">
      <span class="lp-remoji">🚚</span>
      <span class="lp-rinfo"><span class="lp-rname">Free shipping</span><span class="lp-rcost">800 pts</span></span>
      <button class="lp-redeem" onclick="redeem(this)">Redeem</button>
    </div>
    <div class="lp-reward" data-cost="1500">
      <span class="lp-remoji">💸</span>
      <span class="lp-rinfo"><span class="lp-rname">$20 voucher</span><span class="lp-rcost">1500 pts</span></span>
      <button class="lp-redeem" onclick="redeem(this)">Redeem</button>
    </div>
    <div class="lp-reward" data-cost="2500">
      <span class="lp-remoji">✨</span>
      <span class="lp-rinfo"><span class="lp-rname">Members-only drop</span><span class="lp-rcost">2500 pts</span></span>
      <button class="lp-redeem" onclick="redeem(this)">Redeem</button>
    </div>
  </div>

  <div class="lp-toast" id="lpToast"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.lp-card{position:relative;background:linear-gradient(160deg,#1e293b,#0f172a);border:1px solid #334155;border-radius:20px;padding:24px;width:100%;max-width:360px;overflow:hidden;box-shadow:0 20px 50px rgba(0,0,0,.4)}
.lp-glow{position:absolute;top:-60px;right:-60px;width:180px;height:180px;border-radius:50%;background:radial-gradient(circle,rgba(245,158,11,.35),transparent 70%);pointer-events:none}

.lp-head{display:flex;justify-content:space-between;align-items:flex-start;position:relative;margin-bottom:20px}
.lp-tier{display:flex;align-items:center;gap:7px;font-size:12px;font-weight:700;color:#fbbf24;text-transform:uppercase;letter-spacing:.05em}
.lp-dot{width:7px;height:7px;border-radius:50%;background:#fbbf24;box-shadow:0 0 8px #fbbf24}
.lp-balance{font-size:38px;font-weight:800;color:#fff;margin-top:6px;line-height:1;font-variant-numeric:tabular-nums}
.lp-unit{font-size:15px;font-weight:700;color:#94a3b8}
.lp-crown{font-size:30px;filter:drop-shadow(0 4px 8px rgba(245,158,11,.4))}

.lp-progress-head{display:flex;justify-content:space-between;font-size:12px;font-weight:600;color:#94a3b8;margin-bottom:8px}
.lp-progress-head span:last-child{color:#fbbf24;font-weight:800}
.lp-track{height:8px;background:rgba(148,163,184,.2);border-radius:999px;overflow:hidden;margin-bottom:22px}
.lp-fill{height:100%;width:0;border-radius:999px;background:linear-gradient(90deg,#f59e0b,#fbbf24);transition:width .8s cubic-bezier(.4,0,.2,1);box-shadow:0 0 10px rgba(251,191,36,.6)}

.lp-rtitle{font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px}
.lp-rewards{display:flex;flex-direction:column;gap:8px}
.lp-reward{display:flex;align-items:center;gap:11px;padding:11px 12px;background:rgba(148,163,184,.08);border:1px solid rgba(148,163,184,.12);border-radius:12px;transition:opacity .25s,transform .25s}
.lp-reward.gone{opacity:0;transform:translateX(16px);height:0;padding:0;margin:0;border:0}
.lp-remoji{font-size:20px;flex-shrink:0}
.lp-rinfo{flex:1;display:flex;flex-direction:column;gap:1px;min-width:0}
.lp-rname{font-size:13px;font-weight:700;color:#e2e8f0}
.lp-rcost{font-size:11px;color:#94a3b8;font-weight:600}
.lp-redeem{background:#fbbf24;color:#1e293b;border:none;border-radius:9px;padding:8px 14px;font-size:12px;font-weight:800;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s;white-space:nowrap}
.lp-redeem:hover:not(:disabled){background:#f59e0b}
.lp-redeem:active:not(:disabled){transform:scale(.95)}
.lp-redeem:disabled{background:rgba(148,163,184,.2);color:#64748b;cursor:not-allowed}

.lp-toast{position:absolute;left:50%;bottom:18px;transform:translate(-50%,20px);background:#fbbf24;color:#1e293b;font-size:12px;font-weight:800;padding:8px 16px;border-radius:999px;opacity:0;pointer-events:none;transition:opacity .25s,transform .25s;box-shadow:0 8px 20px rgba(0,0,0,.3)}
.lp-toast.show{opacity:1;transform:translate(-50%,0)}`,

  js: `var points = 1680;
var NEXT_TIER = 2000;
var toastTimer;

function animateBalance(from, to) {
  var start = performance.now();
  function tick(now) {
    var p = Math.min(1, (now - start) / 500);
    var eased = 1 - Math.pow(1 - p, 3);
    document.getElementById('lpPoints').textContent = Math.round(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

function updateUI() {
  var pct = Math.min(100, Math.round((points / NEXT_TIER) * 100));
  document.getElementById('lpFill').style.width = pct + '%';
  document.getElementById('lpPct').textContent = pct + '%';
  var toGo = Math.max(0, NEXT_TIER - points);
  document.getElementById('lpNext').textContent = toGo > 0 ? toGo + ' pts to Platinum' : 'Platinum unlocked!';

  document.querySelectorAll('.lp-reward').forEach(function (r) {
    var cost = +r.dataset.cost;
    var btn = r.querySelector('.lp-redeem');
    if (btn.dataset.done) return;
    btn.disabled = points < cost;
    btn.textContent = points < cost ? 'Need ' + (cost - points) : 'Redeem';
  });
}

function showToast(msg) {
  var t = document.getElementById('lpToast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
}

function redeem(btn) {
  var reward = btn.closest('.lp-reward');
  var cost = +reward.dataset.cost;
  if (points < cost) return;

  var prev = points;
  points -= cost;
  animateBalance(prev, points);
  showToast('Redeemed ' + reward.querySelector('.lp-rname').textContent + '!');

  btn.dataset.done = '1';
  btn.disabled = true;
  btn.textContent = '✓ Done';
  setTimeout(updateUI, 520);
}

updateUI();
requestAnimationFrame(function () { updateUI(); });`,

  seo: {
    title: 'Loyalty Points Widget — Rewards HTML CSS JS Snippet',
    description: `Loyalty widget with a points balance, tier-progress bar, redeemable rewards, affordability-gated buttons & a count-down balance. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Loyalty Points Widget — Tier Progress Bar, Redeemable Rewards & Affordability-Gated Buttons`,
      description: `Loyalty programmes work because they give customers a reason to come back and a visible sense of progress toward a reward. The widget that surfaces a member's points has to do three jobs at once: show the current balance with status, show how close they are to the next tier, and let them spend points on rewards they can actually afford. This snippet implements all three in plain HTML, CSS, and vanilla JavaScript: a points balance with tier badge, an animated progress bar toward the next tier, a list of redeemable rewards, affordability-gated redeem buttons, an animated count-down on spend, and a confirmation toast.

**Balance, tier, and progress**

The card leads with a large points balance and a "Gold member" tier badge on a dark gradient with a warm glow — the premium treatment that loyalty programmes use to make membership feel valuable. Below it, \`updateUI\` computes progress toward \`NEXT_TIER\` as a percentage, animates the gradient bar's \`width\` with a \`cubic-bezier\` transition, and writes the remaining points ("320 pts to Platinum"). When the balance reaches the threshold, the copy switches to "Platinum unlocked!".

**Affordability-gated redemption**

Each reward carries its cost on a \`data-cost\` attribute. \`updateUI\` walks every reward and decides its button state: if the member can afford it, the button reads "Redeem"; if not, it disables and reads "Need N" — telling the user exactly how many more points they require rather than just greying out silently. This turns a dead-end into a goal, which is the whole point of a loyalty programme.

**Animated balance count-down**

When a reward is redeemed, \`redeem\` checks affordability, subtracts the cost, and calls \`animateBalance\`, which tweens the displayed number from the old value to the new one over 500ms using an eased \`requestAnimationFrame\` loop (cubic ease-out). Watching the points tick down makes the spend feel tangible — and then \`updateUI\` re-runs to re-gate every other reward against the new, lower balance, so buttons that are now unaffordable immediately switch to "Need N".

**Confirmation toast**

A pill toast slides up from the bottom of the card confirming the redeemed reward by name, auto-dismissing after a moment via a cleared-and-reset timer so rapid redemptions never stack stale toasts. The redeemed reward's own button locks to "✓ Done".

Everything is driven by a single \`points\` variable and the \`updateUI\` function, so wiring it to a real account is a matter of seeding \`points\` from your API and POSTing redemptions. Pair this widget with a [stats card](/ui-snippets/stats-card/) for account metrics, a [progress bar](/ui-snippets/progress-bar/) for other goals, a [gradient progress](/ui-snippets/gradient-progress/) ring, or an [order summary](/ui-snippets/order-summary/) where vouchers apply.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark loyalty card appears showing 1680 points, a "Gold member" badge, a progress bar at 84% toward Platinum, and four rewards.` },
      { title: 'Check affordability gating', text: `Rewards you can afford show "Redeem"; the 2500-point members-only drop is disabled and reads "Need 820", telling you exactly how short you are.` },
      { title: 'Redeem a reward', text: `Click "Redeem" on the $5 voucher — the balance counts down from 1680 to 1180, a toast confirms "Redeemed $5 voucher!", and the button locks to "✓ Done".` },
      { title: 'Watch the bar update', text: `The progress bar shrinks toward the next tier and the "pts to Platinum" figure recalculates from the new balance.` },
      { title: 'See re-gating in action', text: `After spending, rewards you can no longer afford flip to "Need N" automatically — the whole list re-evaluates against the new balance.` },
      { title: 'Seed real data', text: `Set the \`points\` variable from your account API and adjust \`NEXT_TIER\` and reward \`data-cost\` values; the rest of the UI follows.` },
    ] },
    features: [
      { title: 'Single-source points model', text: `One \`points\` variable and \`updateUI\` drive the balance, progress bar, tier copy, and every reward button — trivial to wire to a real account.` },
      { title: 'Animated tier progress bar', text: `\`updateUI\` sets the gradient bar's \`width\` to \`points / NEXT_TIER\` with a \`cubic-bezier\` transition and a glow, capping at 100%.` },
      { title: 'Affordability-gated buttons', text: `Each reward enables only when affordable; otherwise it shows "Need N", turning a disabled state into a concrete goal.` },
      { title: 'Eased balance count-down', text: `\`animateBalance\` tweens the number with a cubic ease-out \`requestAnimationFrame\` loop, making each spend feel tangible.` },
      { title: 'Automatic re-gating', text: `After a redemption \`updateUI\` re-evaluates every reward against the new balance, flipping now-unaffordable buttons to "Need N".` },
      { title: 'Auto-dismissing toast', text: `A confirmation pill slides up and clears its own timer on each show, so rapid redemptions never stack stale messages.` },
      { title: 'Data-attribute reward costs', text: `Reward prices live on \`data-cost\`, so adding or repricing rewards is a markup edit with no JavaScript changes.` },
      { title: 'Premium dark styling', text: `A gradient card with a radial glow, glowing tier dot, and gold accents gives membership the elevated look loyalty programmes rely on.` },
    ],
    useCases: [
      { title: 'E-commerce rewards programmes', text: `Show points and let shoppers redeem vouchers and perks. Apply redeemed vouchers in an [order summary](/ui-snippets/order-summary/) at checkout.` },
      { title: 'Account and profile dashboards', text: `Embed it in a member dashboard beside a [stats card](/ui-snippets/stats-card/) for spend, orders, and tier history.` },
      { title: 'Cafe and retail apps', text: `A digital stamp/points card with redeemable freebies — the tier progress maps to the next free coffee or discount.` },
      { title: 'Gamified product engagement', text: `Reward in-app actions with points toward perks; pair the progress with a [progress bar](/ui-snippets/progress-bar/) for other milestones.` },
      { title: 'Referral and credit balances', text: `Show referral credits and let users spend them, with affordability gating preventing overspend of available credit.` },
      { title: 'Subscription perks and tiers', text: `Surface tier benefits and a path to the next level, alongside a [subscription widget](/ui-snippets/subscription-widget/) for plan management.` },
      { icon: 'CODE', title: 'Related: Vanilla-Tilt 3D Card Grid', desc: 'See the [Vanilla-Tilt 3D Card Grid](/ui-snippets/vanilla-tilt-3d-grid/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I load the real points balance and rewards?', a: `Seed the \`points\` variable from your loyalty API on load and render the reward rows from your catalogue, setting each \`data-cost\`. Call \`updateUI()\` once and the progress bar, tier copy, and button gating all reflect the live balance. Set \`NEXT_TIER\` from the member's current tier threshold.` },
      { q: 'How do I persist a redemption to the server?', a: `In \`redeem\`, after the affordability check, POST the reward id to your endpoint and only commit the local deduction on success; on failure, revert the balance and re-enable the button. To avoid double-spends from rapid clicks, disable the button immediately (this snippet does) and treat the server's returned balance as authoritative.` },
      { q: 'How do I show tier benefits or multiple tiers?', a: `Keep an array of tiers with thresholds and names, and in \`updateUI\` find the current and next tier from \`points\` to drive the badge and the "pts to next" copy. You can also list the perks unlocked at each tier below the bar so members see what the next level grants.` },
      { q: 'Is the widget accessible?', a: `Give the progress bar \`role="progressbar"\` with \`aria-valuenow\`/\`aria-valuemax\`, put the redeem confirmation toast in an \`aria-live="polite"\` region, and make sure the "Need N" button text conveys the gating without relying on colour. The redeem controls are real \`<button>\` elements, so they are keyboard-operable by default.` },
      { q: 'How do I use this loyalty widget in React, Vue, or Angular?', a: `In React, hold \`points\` in \`useState\`, derive the percentage and each button's disabled/label state in render, and animate the balance with a small effect or a tween library. In Vue, use a \`ref\` for points and \`computed\` values for progress and gating. In Angular, track points on the component and bind \`[style.width]\` and \`[disabled]\`. The card styling and bar CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to trace the affordability-gating logic in your head. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how updateUI() re-evaluates every reward's data-cost attribute against the live points variable to decide between a "Redeem" and a "Need N" label, and why animateBalance() uses a cubic ease-out inside requestAnimationFrame rather than just snapping the number to its new value. The same assistant can help optimize it, for instance asking whether rebuilding every reward button's disabled state and text on every single redemption is necessary or whether only the affected rewards need re-checking. It is also useful for extending the widget: ask it to add multiple tiers with different perks, persist redemptions to a real backend with optimistic rollback on failure, or add a reduced-motion fallback for the balance count-down animation. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "loyalty points widget" in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- A card showing a large points balance, a membership tier label, and a progress bar toward the next tier threshold, where the bar's fill width and the "N points to next tier" copy are both derived from one shared points variable and a next-tier constant.
- A list of redeemable rewards, each carrying its point cost as a data attribute on its row, with a redeem button per reward.
- A single update function that walks every reward row and sets its button's disabled state and label purely from comparing the live points balance to that reward's cost: enabled and labeled "Redeem" when affordable, disabled and labeled with exactly how many more points are needed (e.g. "Need 340") when not.
- Redeeming a reward must: verify affordability again at click time (not just trust the disabled state), subtract its cost from the points variable, animate the displayed balance number from its old value to its new value over a fixed short duration using an eased requestAnimationFrame tween (not an instant text swap), lock that specific reward's button to a permanent "done" state so it cannot be redeemed twice, and re-run the shared update function afterward so every other reward's affordability label refreshes against the new lower balance.
- Show a temporary confirmation toast naming the redeemed reward, auto-dismissing after a couple of seconds, with any pending dismiss timer cleared and restarted on each new redemption so rapid redemptions never leave stale toasts stacked or flickering.
- The tier progress bar's fill percentage must be capped at 100 even if the points balance exceeds the next-tier threshold, and the copy must switch to an "unlocked" message once the threshold is reached.`,
    },
  },
};

export default loyaltyPointsWidget;
