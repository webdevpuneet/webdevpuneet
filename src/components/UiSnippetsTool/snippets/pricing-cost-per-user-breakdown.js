const pricingCostPerUserBreakdown = {
  id: 'pricing-cost-per-user-breakdown',
  title: 'Cost Per User Breakdown',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="cpu-wrap">
  <div class="cpu-card">
    <p class="cpu-eyebrow">Team plan</p>
    <h2 class="cpu-title">Cost per user, with volume discounts</h2>

    <label class="cpu-label" for="cpuTeamSize">Team size</label>
    <div class="cpu-input-row">
      <button class="cpu-step" id="cpuMinus" type="button" aria-label="Decrease team size">−</button>
      <input class="cpu-input" id="cpuTeamSize" type="number" min="1" max="200" value="18" />
      <button class="cpu-step" id="cpuPlus" type="button" aria-label="Increase team size">+</button>
    </div>

    <div class="cpu-totals">
      <div class="cpu-total-box">
        <p class="cpu-total-label">Total monthly cost</p>
        <p class="cpu-total-value" id="cpuTotal">—</p>
      </div>
      <div class="cpu-total-box cpu-total-highlight">
        <p class="cpu-total-label">Avg. cost per user / month</p>
        <p class="cpu-total-value" id="cpuAvg">—</p>
      </div>
    </div>

    <div class="cpu-bar-section">
      <p class="cpu-bar-label">Per-user rate, relative to the base tier</p>
      <div class="cpu-bar-track"><div class="cpu-bar-fill" id="cpuBarFill"></div></div>
      <p class="cpu-bar-caption" id="cpuBarCaption"></p>
    </div>

    <div class="cpu-tiers" id="cpuTiers">
      <p class="cpu-tiers-title">Volume discount tiers</p>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a1310;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:32px}
.cpu-wrap{width:100%;max-width:400px}
.cpu-card{background:linear-gradient(165deg,#132420,#0c1613);border:1px solid #1f3d34;border-radius:20px;padding:30px 26px}
.cpu-eyebrow{font-size:12px;font-weight:700;color:#2dd4bf;text-transform:uppercase;letter-spacing:.06em}
.cpu-title{font-size:19px;font-weight:800;color:#f4f7fb;margin-top:8px;line-height:1.35}
.cpu-label{display:block;font-size:12px;font-weight:700;color:#8b96ab;text-transform:uppercase;letter-spacing:.05em;margin-top:22px;margin-bottom:9px}
.cpu-input-row{display:flex;align-items:center;gap:10px}
.cpu-step{width:38px;height:38px;flex:none;background:#0a1310;border:1.5px solid #1f3d34;color:#c3cbdb;font-size:18px;font-weight:700;border-radius:9px;cursor:pointer;transition:border-color .15s}
.cpu-step:hover{border-color:#2dd4bf;color:#2dd4bf}
.cpu-input{flex:1;text-align:center;background:#0a1310;border:1.5px solid #1f3d34;color:#f4f7fb;font-family:inherit;font-size:16px;font-weight:700;padding:9px;border-radius:9px;outline:none;font-variant-numeric:tabular-nums}
.cpu-input:focus{border-color:#2dd4bf}
.cpu-totals{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}
.cpu-total-box{background:#0a1310;border:1px solid #1f3d34;border-radius:12px;padding:14px;text-align:center}
.cpu-total-highlight{border-color:rgba(45,212,191,.35);background:rgba(45,212,191,.07)}
.cpu-total-label{font-size:10.5px;color:#7f8ba0;font-weight:600;line-height:1.4}
.cpu-total-value{font-size:20px;font-weight:800;color:#f4f7fb;margin-top:6px;font-variant-numeric:tabular-nums}
.cpu-total-highlight .cpu-total-value{color:#2dd4bf}
.cpu-bar-section{margin-top:20px}
.cpu-bar-label{font-size:11.5px;color:#8b96ab;margin-bottom:8px}
.cpu-bar-track{height:10px;background:#0a1310;border:1px solid #1f3d34;border-radius:20px;overflow:hidden}
.cpu-bar-fill{height:100%;background:linear-gradient(90deg,#2dd4bf,#5eead4);border-radius:20px;width:0;transition:width .4s ease}
.cpu-bar-caption{font-size:11px;color:#5c6779;margin-top:8px}
.cpu-tiers{margin-top:20px;padding-top:18px;border-top:1px solid #1f3d34}
.cpu-tiers-title{font-size:12px;font-weight:700;color:#8b96ab;text-transform:uppercase;letter-spacing:.05em;margin-bottom:10px}
.cpu-tier-row{display:flex;justify-content:space-between;font-size:12.5px;color:#9aa8a0;padding:6px 0}
.cpu-tier-row.cpu-tier-active{color:#2dd4bf;font-weight:700}
.cpu-tier-row span:last-child{font-variant-numeric:tabular-nums}`,

  js: `// Real tiered (marginal, tax-bracket-style) per-user rate table.
// Each tier's rate applies only to the users that fall within that
// tier's range, not the whole team — this is what makes per-user cost
// genuinely decrease as team size crosses into higher tiers.
const TIERS = [
  { upTo: 10, rate: 15, label: '1–10 users' },
  { upTo: 25, rate: 12, label: '11–25 users' },
  { upTo: 50, rate: 9, label: '26–50 users' },
  { upTo: Infinity, rate: 6, label: '51+ users' },
];
const BASE_RATE = TIERS[0].rate; // used as the 100% reference point for the bar

function computeTieredCost(teamSize) {
  let remaining = teamSize;
  let prevUpTo = 0;
  let total = 0;
  const breakdown = [];

  for (const tier of TIERS) {
    if (remaining <= 0) break;
    const tierCapacity = tier.upTo - prevUpTo;
    const usersInTier = Math.min(remaining, tierCapacity);
    if (usersInTier > 0) {
      total += usersInTier * tier.rate;
      breakdown.push({ ...tier, usersInTier });
    }
    remaining -= usersInTier;
    prevUpTo = tier.upTo;
  }

  return { total, breakdown };
}

const input = document.getElementById('cpuTeamSize');
const totalEl = document.getElementById('cpuTotal');
const avgEl = document.getElementById('cpuAvg');
const barFill = document.getElementById('cpuBarFill');
const barCaption = document.getElementById('cpuBarCaption');
const tiersEl = document.getElementById('cpuTiers');

function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

function render() {
  const teamSize = clamp(parseInt(input.value, 10) || 1, 1, 200);
  input.value = teamSize;

  const { total, breakdown } = computeTieredCost(teamSize);
  const avg = total / teamSize;

  totalEl.textContent = '$' + total.toLocaleString('en-US');
  avgEl.textContent = '$' + avg.toFixed(2) + '/user';

  // Bar shows the blended average rate as a percentage of the base
  // (smallest-tier) rate — it shrinks as volume discounts kick in.
  const pctOfBase = (avg / BASE_RATE) * 100;
  barFill.style.width = clamp(pctOfBase, 4, 100) + '%';
  barCaption.textContent =
    '$' + avg.toFixed(2) + ' is ' + pctOfBase.toFixed(0) + '% of the base $' + BASE_RATE + '/user rate — ' +
    (pctOfBase < 100 ? (100 - pctOfBase).toFixed(0) + '% lower thanks to volume tiers.' : 'no volume discount yet at this size.');

  // Render which tiers this team size actually spans.
  const currentTierUpTo = breakdown[breakdown.length - 1].upTo;
  tiersEl.innerHTML = '<p class="cpu-tiers-title">Volume discount tiers</p>' +
    TIERS.map((tier) => {
      const active = tier.upTo === currentTierUpTo;
      const usedInThisTier = breakdown.find((b) => b.upTo === tier.upTo);
      return '<div class="cpu-tier-row' + (active ? ' cpu-tier-active' : '') + '">' +
        '<span>' + tier.label + (usedInThisTier ? ' — ' + usedInThisTier.usersInTier + ' billed here' : '') + '</span>' +
        '<span>$' + tier.rate + '/user</span></div>';
    }).join('');
}

document.getElementById('cpuMinus').addEventListener('click', () => {
  input.value = clamp((parseInt(input.value, 10) || 1) - 1, 1, 200);
  render();
});
document.getElementById('cpuPlus').addEventListener('click', () => {
  input.value = clamp((parseInt(input.value, 10) || 1) + 1, 1, 200);
  render();
});
input.addEventListener('input', render);

render();`,

  seo: {
    title: 'Cost Per User Breakdown — Free HTML CSS JS Snippet, Real Tiered Rates',
    description: 'A team pricing card computing cost-per-user live from a genuine tiered (marginal-bracket) rate table, with a visual bar showing per-user cost fall as team size grows.',
    about: {
      title: 'Cost Per User Breakdown — A Real Tiered Rate Table, Not a Flat Multiply',
      description: `Volume discounts on per-seat pricing are usually described in a sentence ("bigger teams get a better rate") without showing the actual mechanics. This snippet implements a genuine tiered, marginal rate table — the same structure income tax brackets use — where each pricing tier's rate applies only to the users that fall within that tier's range, not the whole team, and computes a live blended cost-per-user that visibly falls as team size grows into higher tiers.

**A marginal-bracket rate table, not a lookup-and-multiply**

\`TIERS\` defines four bands: users 1–10 at \\$15 each, 11–25 at \\$12 each, 26–50 at \\$9 each, and 51+ at \\$6 each. The naive (and incorrect) way to implement "tiered pricing" is to look up which single bracket a team size falls into and multiply the whole team by that one rate — but that produces a cliff-edge discontinuity where adding one user to cross a tier boundary would retroactively discount every existing user too. \`computeTieredCost()\` avoids that entirely: it walks the tiers in order, and for each one takes only \`Math.min(remaining, tierCapacity)\` users at that tier's rate, exactly like a marginal tax bracket only taxes the income within each bracket, not your whole income at your top bracket's rate.

**Working through a real example**

At a team size of 18: the first 10 users bill at \\$15 each (\\$150), and the remaining 8 users fall into the 11–25 tier at \\$12 each (\\$96) — for a total of \\$246. The average cost per user is \\$246 ÷ 18 = **\\$13.67**, genuinely lower than the base \\$15 rate, and genuinely computed by dividing the real tiered total by the real team size, not a separately estimated "roughly \\$14ish" figure.

**The visual bar reflects the blended rate, not a decoration**

The per-user cost bar's width is computed as \`(avg / BASE_RATE) * 100\` — the actual blended average expressed as a percentage of the smallest-tier rate. As team size grows and more users fall into cheaper tiers, this percentage genuinely drops and the bar visibly shrinks, giving an at-a-glance sense of "how much of a volume discount am I actually getting" that a bare number doesn't communicate as immediately.

**Showing which tiers are actually in play**

Beneath the totals, every tier renders with how many of the current team's users are billed at that tier's rate (\`usersInTier\`), and the tier the team size currently extends into is visually highlighted. This makes the abstract rate table concrete: rather than just trusting the blended average, a visitor can see exactly which \\$15, \\$12, \\$9, or \\$6 users make up their total.

**Customizing it**

Edit the \`TIERS\` array to add, remove, or reprice bands — \`computeTieredCost()\`, the totals, the bar, and the tier list all recalculate correctly for any tier configuration, since none of the downstream code assumes a fixed number of tiers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Adjust the team size', text: 'Use the steppers or type a value between 1 and 200.' },
      { title: 'Watch the total and average update', text: 'Both are computed live from the real tiered rate table.' },
      { title: 'Check the per-user bar', text: 'Its width reflects the blended rate as a percent of the base tier.' },
      { title: 'See which tiers are billed', text: 'The tier list shows exactly how many users fall in each band.' },
      { title: 'Cross a tier boundary', text: 'Move from 10 to 11 users and see the average drop as the new tier applies.' },
      { title: 'Edit the TIERS array', text: 'Add, remove, or reprice bands — every computed value adapts automatically.' },
    ] },
    features: [
      { title: 'Genuine marginal-bracket pricing', text: 'Each tier\'s rate applies only to users within that band.' },
      { title: 'No cliff-edge discontinuity', text: 'Crossing a boundary never retroactively re-prices earlier users.' },
      { title: 'Live blended average', text: 'Real total divided by real team size, recalculated on every change.' },
      { title: 'Bar reflects the real rate', text: 'Width is the actual blended rate as a percent of the base tier.' },
      { title: 'Per-tier usage breakdown', text: 'Shows exactly how many users are billed at each rate.' },
      { title: 'Active-tier highlighting', text: 'Visually marks which band the current team size extends into.' },
      { title: 'Clamped input range', text: 'Team size bounded to a sane 1–200 range.' },
      { title: 'Configurable tier table', text: 'Add or reprice bands with no other code changes needed.' },
    ],
    useCases: [
      { title: 'Team and workspace pricing', text: 'Show volume-discounted per-seat prices with a genuine marginal-bracket table, where each tier\'s rate applies only to the users inside that bracket.' },
      { title: 'Seat calculator pairing', text: 'Pair with a [seat-based pricing calculator](/ui-snippets/seat-based-pricing-calculator/) so buyers see both the total and the falling blended cost per user as the team grows.' },
      { title: 'Enterprise sales conversations', text: 'Justify tiered pricing with a verifiable breakdown, since crossing a boundary never retroactively re-prices earlier users and so creates no cliff edge.' },
      { title: 'Billing dashboards for customers', text: 'Show existing customers their effective rate today, calculated as the real total divided by the real team size on every change.' },
      { title: 'Marginal-bracket logic teaching', text: 'Use as a clean reference implementation of progressive tax-style brackets, with a bar whose width is the actual blended rate as a percentage of the base.' },
      { icon: 'CODE', title: 'Related: Commitment Length Discount Ladder', desc: 'See the [Commitment Length Discount Ladder](/ui-snippets/pricing-commitment-discount-ladder/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is this really a tiered rate, or just a flat rate that looks tiered?', a: 'It is a genuine marginal-bracket structure: computeTieredCost() walks the TIERS array in order and bills only the users that fall within each band at that band\'s rate, using Math.min(remaining, tierCapacity) per tier. This is structurally identical to how income tax brackets work — it is not a lookup that finds one matching tier and multiplies the whole team by that single rate.' },
      { q: 'Why does per-user cost decrease smoothly instead of jumping at tier boundaries?', a: 'Because only the users within each tier\'s range are billed at that tier\'s rate — the first 10 users always cost $15 each regardless of total team size, and only users beyond 10 start billing at the lower $12 rate. This avoids the cliff-edge problem where crossing from 10 to 11 users would otherwise have to decide whether to re-price all 11 users at the new rate or just the new one, producing a jarring discontinuity either way.' },
      { q: 'Can you verify the $246 total for an 18-person team?', a: 'Yes: the first 10 users bill at $15 each for $150, and the remaining 8 users (18 minus 10) fall into the 11–25 tier at $12 each for $96. $150 plus $96 is $246 total, and $246 divided by 18 users is $13.67 average cost per user — both figures are the direct output of computeTieredCost() and the division that follows it, not separately estimated.' },
      { q: 'What does the per-user bar\'s percentage actually represent?', a: 'It is the blended average cost per user (total divided by team size) expressed as a percentage of the base, smallest-tier rate ($15). As team size grows and more users fall into cheaper tiers, this blended average drops below the base rate and the percentage — and the bar\'s visual width — shrink accordingly, giving an immediate visual sense of how much volume discount is currently being applied.' },
      { q: 'How do I add a fifth tier or change the rates?', a: 'Edit the TIERS array — add an object with an upTo boundary, a rate, and a label in the correct ascending order (or adjust an existing entry\'s rate or upTo value). Because computeTieredCost() and the rendering code iterate over TIERS generically rather than assuming exactly four bands, every computed total, average, bar width, and tier-usage line adapts automatically to the new configuration.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly why computeTieredCost() bills each tier only for the users within that tier's range (Math.min(remaining, tierCapacity)) rather than looking up one matching tier and multiplying the whole team by its rate, and why that distinction avoids a cliff-edge discontinuity at tier boundaries. It's also a good candidate to extend — ask it to add an annual-billing variant with a different discount curve, show a small chart of average cost per user across the full 1–200 range so the discount curve is visible at a glance, or add a "compare to flat-rate" toggle that shows how much more a non-tiered flat $15/user rate would have cost for the same team size.`,
      prompt: `Build a "cost per user" team pricing card with a genuine tiered (marginal-bracket) volume-discount rate table in plain HTML, CSS, and JavaScript, using no dependencies.

Requirements:
- Define a rate table of at least four tiers (e.g. 1–10 users, 11–25, 26–50, 51+), each with its own per-user rate that decreases at higher tiers, structured as a data array rather than hardcoded if/else branches.
- Implement the cost calculation as a genuine marginal/bracket calculation: for a given team size, each tier's rate must apply ONLY to the number of users that fall within that specific tier's range, not to the whole team — verify by hand that crossing a tier boundary (e.g. going from 10 to 11 users) does not retroactively change the rate applied to the first 10 users, avoiding a cliff-edge discontinuity.
- A team-size number input with stepper buttons and a sensible min/max range, where changing it live recalculates: the total monthly cost, and the average cost per user (total divided by team size, to two decimal places).
- A visual bar whose width represents the blended average cost-per-user as a percentage of the base (smallest-tier) rate, so the bar visibly shrinks as team size grows into cheaper tiers — this percentage must be a real computed ratio, not an arbitrary value.
- Below the bar, list every tier with its rate and, for the tier(s) the current team size actually spans, how many users are being billed at that specific rate — verify these per-tier user counts sum to the total team size.
- Write the tier calculation generically (iterating over the rate-table array) so adding, removing, or repricing a tier requires no other code changes to stay correct.`,
    },
  },
};

export default pricingCostPerUserBreakdown;
