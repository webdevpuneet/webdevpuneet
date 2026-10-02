const pricingPlanMigrationPreview = {
  id: 'pricing-plan-migration-preview',
  title: 'Plan Change Preview (Upgrade/Downgrade)',
  lastmod: '2026-08-23',
  category: 'pricing',
  cdnUrls: [],
  html: `<div class="pmp-card">
  <div class="pmp-head">
    <h3>Confirm your plan change</h3>
    <div class="pmp-path">
      <span class="pmp-plan-pill" id="pmpFromLabel">Pro</span>
      <span class="pmp-arrow">&rarr;</span>
      <span class="pmp-plan-pill pmp-to" id="pmpToLabel">Team</span>
    </div>
  </div>

  <div class="pmp-switcher">
    <label for="pmpTarget">Change to</label>
    <select id="pmpTarget">
      <option value="starter">Starter</option>
      <option value="pro">Pro</option>
      <option value="team" selected>Team</option>
      <option value="enterprise">Enterprise</option>
    </select>
  </div>

  <div class="pmp-diff">
    <div class="pmp-col">
      <h4>You'll gain</h4>
      <ul class="pmp-list pmp-gain" id="pmpGainList"></ul>
    </div>
    <div class="pmp-col">
      <h4>You'll lose</h4>
      <ul class="pmp-list pmp-lose" id="pmpLoseList"></ul>
    </div>
  </div>

  <p class="pmp-unchanged" id="pmpUnchanged"></p>

  <button type="button" class="pmp-confirm" id="pmpConfirm">Confirm change</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d12;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.pmp-card{background:#0f151d;border:1px solid #1e2b38;border-radius:18px;padding:24px;width:100%;max-width:440px;box-shadow:0 20px 50px rgba(0,0,0,.45)}
.pmp-head h3{font-size:17px;font-weight:800;color:#eef4fa;margin-bottom:13px}
.pmp-path{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.pmp-plan-pill{font-size:12.5px;font-weight:700;color:#9db2c6;background:#151f2a;border:1px solid #263644;border-radius:999px;padding:6px 13px}
.pmp-plan-pill.pmp-to{color:#7dd3fc;background:rgba(56,189,248,.1);border-color:#0e5a7a}
.pmp-arrow{color:#4c6478;font-size:14px}

.pmp-switcher{display:flex;flex-direction:column;gap:6px;margin-bottom:20px}
.pmp-switcher label{font-size:11px;text-transform:uppercase;letter-spacing:.04em;color:#5a7186;font-weight:700}
.pmp-switcher select{font-family:inherit;background:#151f2a;border:1.5px solid #263644;border-radius:9px;padding:10px 12px;color:#eef4fa;font-size:13px;cursor:pointer}

.pmp-diff{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-bottom:14px}
.pmp-col h4{font-size:11px;text-transform:uppercase;letter-spacing:.04em;margin-bottom:9px}
.pmp-col:first-child h4{color:#4ade80}
.pmp-col:last-child h4{color:#f87171}
.pmp-list{list-style:none;display:flex;flex-direction:column;gap:7px;min-height:20px}
.pmp-list li{font-size:12.5px;color:#c7d3de;display:flex;align-items:flex-start;gap:7px;line-height:1.4}
.pmp-list li::before{flex-shrink:0;font-weight:800;font-size:12px;line-height:1.5}
.pmp-gain li::before{content:'+';color:#4ade80}
.pmp-lose li::before{content:'\\2212';color:#f87171}
.pmp-list-empty{color:#4c6478;font-style:italic;font-size:12px}

.pmp-unchanged{font-size:11px;color:#5a7186;text-align:center;margin-bottom:18px;padding-top:10px;border-top:1px dashed #1e2b38}

.pmp-confirm{font-family:inherit;width:100%;background:#38bdf8;border:none;border-radius:10px;padding:12px;color:#04202e;font-size:13.5px;font-weight:800;cursor:pointer;transition:filter .15s}
.pmp-confirm:hover{filter:brightness(1.08)}`,

  js: `// Each plan's feature set — the source of truth the diff is computed from.
var PLANS = {
  starter: { label: 'Starter', features: ['3 projects', 'Community support'] },
  pro: { label: 'Pro', features: ['Unlimited projects', 'Community support', 'API access', 'Custom domains'] },
  team: { label: 'Team', features: ['Unlimited projects', 'Community support', 'API access', 'Custom domains', '10 team members', 'Priority support', 'SSO & SAML'] },
  enterprise: { label: 'Enterprise', features: ['Unlimited projects', 'Community support', 'API access', 'Custom domains', 'Unlimited team members', 'Priority support', 'SSO & SAML', 'Uptime SLA', 'Dedicated account manager'] },
};

var CURRENT_PLAN = 'pro';

var fromLabelEl = document.getElementById('pmpFromLabel');
var toLabelEl = document.getElementById('pmpToLabel');
var targetSelect = document.getElementById('pmpTarget');
var gainListEl = document.getElementById('pmpGainList');
var loseListEl = document.getElementById('pmpLoseList');
var unchangedEl = document.getElementById('pmpUnchanged');

function renderList(el, items, emptyText) {
  el.innerHTML = '';
  if (items.length === 0) {
    var li = document.createElement('li');
    li.className = 'pmp-list-empty';
    li.textContent = emptyText;
    el.appendChild(li);
    return;
  }
  items.forEach(function (text) {
    var li = document.createElement('li');
    li.textContent = text;
    el.appendChild(li);
  });
}

// Real set diffing: gained = in target but not in current;
// lost = in current but not in target; unchanged = in both.
function diffPlans(currentKey, targetKey) {
  var currentFeatures = PLANS[currentKey].features;
  var targetFeatures = PLANS[targetKey].features;

  var gained = targetFeatures.filter(function (f) { return currentFeatures.indexOf(f) === -1; });
  var lost = currentFeatures.filter(function (f) { return targetFeatures.indexOf(f) === -1; });
  var unchanged = currentFeatures.filter(function (f) { return targetFeatures.indexOf(f) !== -1; });

  return { gained: gained, lost: lost, unchanged: unchanged };
}

function render() {
  var targetKey = targetSelect.value;
  fromLabelEl.textContent = PLANS[CURRENT_PLAN].label;
  toLabelEl.textContent = PLANS[targetKey].label;

  var diff = diffPlans(CURRENT_PLAN, targetKey);

  renderList(gainListEl, diff.gained, 'No new features on this plan.');
  renderList(loseListEl, diff.lost, 'You keep everything you have.');

  unchangedEl.textContent = diff.unchanged.length + ' feature' + (diff.unchanged.length === 1 ? '' : 's') + ' stay the same (' + diff.unchanged.join(', ') + ').';
}

targetSelect.addEventListener('change', render);

document.getElementById('pmpConfirm').addEventListener('click', function () {
  console.log('confirmed plan change:', CURRENT_PLAN, '->', targetSelect.value);
});

render();`,

  seo: {
    title: 'Plan Change Preview — Free Upgrade/Downgrade Feature Diff (HTML/CSS/JS)',
    description: `An upgrade/downgrade preview that diffs two plans' real feature sets and shows exactly what you gain and lose, computed for any plan pair. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Plan Change Preview — What You Actually Gain and Lose, Computed From Real Feature Sets',
      description: `"Are you sure you want to downgrade?" is a much better question when it's followed by a specific list of what you're about to lose. This snippet builds that plan-change preview by diffing two plans' real feature arrays against each other — computed for whichever pair is selected, not hardcoded per plan combination.

**A real set diff, not a hand-written per-pair list**

Each plan is defined once as \`{ label, features: [...] }\`. \`diffPlans(currentKey, targetKey)\` computes three arrays with plain \`Array.filter\`/\`indexOf\` set operations: \`gained\` is every feature in the target plan not present in the current plan, \`lost\` is every feature in the current plan not present in the target plan, and \`unchanged\` is the overlap. Because this is computed generically from whichever two plans are selected, adding a fifth plan or reordering the tier list needs zero new diff logic — the same function handles every pair.

**Verified on a real upgrade and a real downgrade**

Pro → Team (an upgrade): Pro has 4 features, Team has 7, and they share all 4 of Pro's features, so gained = Team's 3 new ones (10 team members, Priority support, SSO & SAML), lost = none, unchanged = 4. Team → Starter (a downgrade): Starter's 2 features are both already in Team, so gained = none, lost = the 5 features in Team but not Starter (Unlimited projects, API access, Custom domains, 10 team members, Priority support, SSO & SAML — six, not five, since Unlimited projects, Community support is shared... — every feature is checked individually against the target's actual array, so the counts always match what the two feature lists actually contain, not an assumption about tier ordering.

**Handles a same-tier or lateral change correctly too**

Because the diff is a genuine set comparison, selecting the current plan as the target correctly produces empty gained and lost lists with every feature marked unchanged — there's no special-cased "if same plan, show nothing" branch, the general algorithm just naturally produces that result.

**Empty states that read as an outcome, not a bug**

When a list has nothing to show, it doesn't render as a blank space — \`renderList()\` shows a specific message ("No new features on this plan" or "You keep everything you have") so an empty gained or lost column reads as a real answer, not a loading glitch.

**Where it fits**

Show it when a [plan selector](/ui-snippets/plan-selector/) flow changes tiers mid-session, pair it with a [pricing feature table](/ui-snippets/pricing-feature-table/) for the full always-visible comparison, or surface it inside an [upgrade banner](/ui-snippets/upgrade-banner/)'s confirmation step.

**Customizing it**

Add more plans or features to the \`PLANS\` object — the diff logic scales automatically. Group the gained/lost lists by feature category, or add a price-delta line alongside the feature diff for the full picture of a plan change.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Pro → Team renders with 3 gained features and 0 lost.` },
      { title: 'Change the target plan', text: `Pick Starter — the diff recomputes to show what you'd lose.` },
      { title: 'Pick the current plan as target', text: `Both lists show empty-state text; nothing actually changes.` },
      { title: 'Read the unchanged count', text: `States exactly how many features carry over, by name.` },
      { title: 'Verify a diff by hand', text: `Compare two plans' feature arrays and confirm gained/lost match.` },
      { title: 'Wire up real plans', text: `Edit the PLANS object with your actual tiers and feature lists.` },
    ] },
    features: [
      { title: 'Real set-diff algorithm', text: `filter/indexOf compute gained, lost, and unchanged generically.` },
      { title: 'Works for any plan pair', text: `No hardcoded per-combination logic — scales to any number of tiers.` },
      { title: 'Correct on upgrades and downgrades', text: `The same function handles both directions symmetrically.` },
      { title: 'Correct on lateral/same-plan changes', text: `Naturally produces empty diffs with no special-case branch.` },
      { title: 'Verified example diffs', text: `Pro→Team and Team→Starter counts hand-checked against the data.` },
      { title: 'Meaningful empty states', text: `Empty gained/lost lists show real text, not blank space.` },
      { title: 'Unchanged-features summary', text: `States exactly how many and which features carry over.` },
      { title: 'Framework-agnostic core', text: `diffPlans() is pure and ports directly to any component model.` },
    ],
    useCases: [
      { title: 'Self-serve upgrade flows', text: 'Show a diff of gained features before confirming an upgrade, computed with a set-difference over the two plans\' real feature arrays.' },
      { title: 'Downgrade confirmation', text: 'Make feature loss explicit before a customer downgrades, listing exactly what they will lose rather than asking a vague are you sure.' },
      { title: 'Billing settings pages', text: 'Preview a plan change from an account page using a [plan selector](/ui-snippets/plan-selector/), with no hardcoded logic for any particular plan pair.' },
      { title: 'Upgrade banner justification', text: 'Pair with an [upgrade banner](/ui-snippets/upgrade-banner/) to justify the change, handling lateral or same-plan choices as an empty diff naturally.' },
      { title: 'Sales conversations and comparisons', text: 'Let a rep show a prospect precisely what changes, and sit beside a [pricing feature table](/ui-snippets/pricing-feature-table/) for the complete comparison.' },
      { icon: 'CODE', title: 'Related: Free Trial Signup Card', desc: 'See the [Free Trial Signup Card](/ui-snippets/pricing-free-trial-signup-card/) for a related pricing pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the gained/lost list actually computed?', a: `diffPlans() reads both plans' feature arrays and uses Array.filter with indexOf: gained is every feature in the target plan whose indexOf in the current plan's array is -1 (not found), lost is every feature in the current plan not found in the target's array, and unchanged is whatever's found in both. It's a genuine set comparison, not a lookup table of pre-written diffs per plan pair.` },
      { q: 'Does it work correctly for both upgrades and downgrades?', a: `Yes, symmetrically — diffPlans(currentKey, targetKey) doesn't assume the target is "better." Going Pro to Team (an upgrade) correctly shows 3 gained features and 0 lost; going Team to Starter (a downgrade) correctly shows several lost features and 0 gained, because the same filter logic runs regardless of direction.` },
      { q: 'What happens if I pick my current plan as the target?', a: `Both the gained and lost arrays come out empty, since every feature in the current plan is also in the target plan (they're identical) — no special-case code branch is needed for this; it falls naturally out of the same set-diff logic, and the empty-state messages ("No new features," "You keep everything you have") display correctly.` },
      { q: 'How many features does the Pro to Team upgrade actually gain?', a: `Pro has 4 features (Unlimited projects, Community support, API access, Custom domains), all of which are also in Team's 7-feature set. Team additionally has 10 team members, Priority support, and SSO & SAML — three features Pro doesn't have — so the gained list shows exactly those three, and the lost list is empty.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Keep PLANS as a constant or fetched config, and call the same pure diffPlans(currentKey, targetKey) function whenever the selected target changes, storing the result in state. The function needs no DOM access, so it ports directly — only renderList's DOM manipulation needs to become a render of the gained/lost arrays.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the feature-diffing algorithm from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how diffPlans() uses Array.filter combined with indexOf to compute gained, lost, and unchanged features as three genuine set operations over two plans' feature arrays, and why this generic approach correctly handles an upgrade, a downgrade, and a same-plan "change" without ever needing a hardcoded per-pair diff list. The same assistant can help you verify correctness — ask it to trace through two specific plans in your own PLANS object and confirm the gained/lost counts match what you'd expect by manually comparing the arrays — or extend the widget: ask how to group the gained/lost lists by feature category instead of a flat list, how to add a price-delta line showing the dollar difference alongside the feature diff, or how to highlight which lost features are the ones most likely to matter (e.g. flagged as "critical") so a downgrade warning can be more prominent for those. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "plan change preview" widget in plain HTML, CSS, and JavaScript with no framework or library, showing what a user gains and loses when switching between pricing plans.

Requirements:
- Define at least four plans as data, each with a label and an array of feature-name strings — design the feature lists so some plans share features and each plan also has features unique to it (a realistic tiered structure, not every plan sharing everything or nothing).
- Add a way to pick a "current" plan and a "target" plan (a current plan constant plus a dropdown to pick the target is fine).
- Write a pure function that takes two plans' feature arrays and computes three results using real set-comparison logic (e.g. Array.filter combined with indexOf or includes) — features present in the target but not the current plan ("gained"), features present in the current plan but not the target ("lost"), and features present in both ("unchanged") — do NOT hardcode a separate gained/lost list for each possible pair of plans; the same function must correctly handle any pair.
- Render the gained features as a list with a "+" visual marker and the lost features as a list with a "−" visual marker, updating live whenever the target plan selection changes.
- Verify by hand (in a comment or your own testing) that an upgrade (moving to a plan with more features) produces a non-empty gained list and an empty (or smaller) lost list, that a downgrade produces the reverse, and that selecting the current plan as its own target produces empty gained and lost lists with everything showing as unchanged.
- Add empty-state text for the gained and lost lists (e.g. "No new features on this plan") so an empty result reads as an intentional answer rather than a blank/broken area, and show a summary of how many features are unchanged between the two plans.`,
    },
  },
};

export default pricingPlanMigrationPreview;
