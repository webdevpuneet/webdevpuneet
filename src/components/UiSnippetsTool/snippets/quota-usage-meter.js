const quotaUsageMeter = {
  id: 'quota-usage-meter',
  title: 'Quota Usage Meter',
  lastmod: '2026-06-22',
  category: 'dashboards',
  html: `<div class="qum-card">
  <div class="qum-head">
    <div>
      <h3>Plan usage</h3>
      <p>Pro plan · resets in 12 days</p>
    </div>
    <span class="qum-badge" id="qumBadge">On track</span>
  </div>

  <div class="qum-list" id="qumList"></div>

  <div class="qum-upgrade" id="qumUpgrade" hidden>
    <div>
      <strong>Running low on resources</strong>
      <span id="qumUpgradeText">You're near your limit on 1 resource.</span>
    </div>
    <button type="button">Upgrade plan</button>
  </div>

  <div class="qum-demo">
    <button type="button" data-set="low">Low usage</button>
    <button type="button" data-set="mid">Near limit</button>
    <button type="button" data-set="over">Over limit</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.qum-card{background:#111827;border:1px solid #1f2937;border-radius:16px;padding:20px;width:100%;max-width:420px;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.qum-head{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:18px}
.qum-head h3{font-size:15.5px;font-weight:800;color:#f8fafc}
.qum-head p{font-size:11.5px;color:#6b7280;margin-top:2px}
.qum-badge{font-size:10.5px;font-weight:800;padding:4px 10px;border-radius:999px;text-transform:uppercase;letter-spacing:.03em}
.qum-badge.ok{background:rgba(52,211,153,.14);color:#34d399}
.qum-badge.warn{background:rgba(251,191,36,.14);color:#fbbf24}
.qum-badge.over{background:rgba(248,113,113,.16);color:#f87171}

.qum-list{display:flex;flex-direction:column;gap:15px}
.qum-row-top{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:7px}
.qum-name{display:flex;align-items:center;gap:7px;font-size:13px;font-weight:700;color:#e5e7eb}
.qum-icon{width:16px;height:16px;color:#818cf8;flex-shrink:0}
.qum-vals{font-size:12px;color:#9ca3af;font-variant-numeric:tabular-nums}
.qum-vals b{color:#f3f4f6;font-weight:700}
.qum-track{height:7px;background:#1f2937;border-radius:999px;overflow:hidden}
.qum-fill{height:100%;width:0;border-radius:999px;background:#818cf8;transition:width .55s cubic-bezier(.4,0,.2,1),background .3s}
.qum-fill.warn{background:#fbbf24}
.qum-fill.over{background:#f87171}
.qum-pct{font-size:10.5px;font-weight:700;margin-top:4px}
.qum-pct.ok{color:#6b7280}
.qum-pct.warn{color:#fbbf24}
.qum-pct.over{color:#f87171}

.qum-upgrade{display:flex;align-items:center;justify-content:space-between;gap:12px;background:rgba(99,102,241,.1);border:1px solid rgba(129,140,248,.3);border-radius:11px;padding:12px 14px;margin-top:18px}
.qum-upgrade[hidden]{display:none}
.qum-upgrade strong{display:block;font-size:13px;color:#e0e7ff;font-weight:800}
.qum-upgrade span{font-size:11.5px;color:#a5b4fc}
.qum-upgrade button{background:#6366f1;color:#fff;border:none;border-radius:8px;padding:9px 14px;font-size:12.5px;font-weight:700;cursor:pointer;white-space:nowrap;flex-shrink:0}
.qum-upgrade button:hover{background:#4f46e5}

.qum-demo{display:flex;gap:8px;margin-top:18px;border-top:1px solid #1f2937;padding-top:14px}
.qum-demo button{flex:1;background:#1f2937;border:none;border-radius:8px;padding:8px;font-size:11.5px;font-weight:700;color:#cbd5e1;cursor:pointer;transition:background .15s}
.qum-demo button:hover{background:#374151}`,

  js: `var ICONS = {
  api:   '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
  store: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/>',
  seats: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/>',
};
var DATASETS = {
  low: [
    { key: 'api',   name: 'API calls',  used: 18400, limit: 100000, unit: '' },
    { key: 'store', name: 'Storage',    used: 2.1,   limit: 50,     unit: ' GB' },
    { key: 'seats', name: 'Team seats', used: 3,     limit: 10,     unit: '' },
  ],
  mid: [
    { key: 'api',   name: 'API calls',  used: 86500, limit: 100000, unit: '' },
    { key: 'store', name: 'Storage',    used: 41.5,  limit: 50,     unit: ' GB' },
    { key: 'seats', name: 'Team seats', used: 8,     limit: 10,     unit: '' },
  ],
  over: [
    { key: 'api',   name: 'API calls',  used: 100000,limit: 100000, unit: '' },
    { key: 'store', name: 'Storage',    used: 47,    limit: 50,     unit: ' GB' },
    { key: 'seats', name: 'Team seats', used: 10,    limit: 10,     unit: '' },
  ],
};

var listEl = document.getElementById('qumList');

function fmt(n) {
  return n >= 1000 ? n.toLocaleString() : (n % 1 === 0 ? n : n.toFixed(1));
}
function tier(pct) {
  if (pct >= 100) return 'over';
  if (pct >= 80) return 'warn';
  return 'ok';
}

function render(rows) {
  listEl.innerHTML = rows.map(function (r) {
    var pct = Math.min(100, Math.round((r.used / r.limit) * 100));
    var t = tier((r.used / r.limit) * 100);
    var label = t === 'over' ? 'Limit reached' : t === 'warn' ? pct + '% used — running low' : pct + '% used';
    return '<div class="qum-row">' +
      '<div class="qum-row-top">' +
        '<span class="qum-name"><svg class="qum-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' + ICONS[r.key] + '</svg>' + r.name + '</span>' +
        '<span class="qum-vals"><b>' + fmt(r.used) + r.unit + '</b> / ' + fmt(r.limit) + r.unit + '</span>' +
      '</div>' +
      '<div class="qum-track"><div class="qum-fill ' + t + '" style="width:' + pct + '%"></div></div>' +
      '<div class="qum-pct ' + t + '">' + label + '</div>' +
    '</div>';
  }).join('');

  // Overall badge + upgrade nudge reflect the worst resource.
  var worst = rows.reduce(function (acc, r) {
    var t = tier((r.used / r.limit) * 100);
    var rank = { ok: 0, warn: 1, over: 2 };
    return rank[t] > rank[acc] ? t : acc;
  }, 'ok');

  var badge = document.getElementById('qumBadge');
  badge.className = 'qum-badge ' + worst;
  badge.textContent = worst === 'over' ? 'Limit reached' : worst === 'warn' ? 'Near limit' : 'On track';

  var upgrade = document.getElementById('qumUpgrade');
  var atRisk = rows.filter(function (r) { return tier((r.used / r.limit) * 100) !== 'ok'; }).length;
  if (atRisk > 0) {
    upgrade.hidden = false;
    document.getElementById('qumUpgradeText').textContent = worst === 'over'
      ? 'You\\'ve hit your limit on ' + atRisk + ' resource' + (atRisk > 1 ? 's' : '') + '.'
      : 'You\\'re near your limit on ' + atRisk + ' resource' + (atRisk > 1 ? 's' : '') + '.';
  } else {
    upgrade.hidden = true;
  }
}

document.querySelector('.qum-demo').addEventListener('click', function (e) {
  var btn = e.target.closest('button');
  if (btn) render(DATASETS[btn.dataset.set]);
});

render(DATASETS.mid);`,

  seo: {
    title: 'Quota Usage Meter — Plan Limits HTML CSS JS',
    description: `A SaaS plan-usage dashboard with per-resource meters, tiered warning colors, an overall status badge, and an upgrade nudge. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Quota Usage Meter — Per-Resource Plan Limits with Tiered Warnings & Upgrade Nudge',
      description: `Every usage-based SaaS — API platforms, storage products, team tools — needs to show customers how much of their plan they've consumed before they hit a wall. A good quota meter does three jobs at once: it shows current usage against each limit, warns clearly as a resource approaches its cap, and surfaces an upgrade path at exactly the moment it's relevant. This snippet builds that complete plan-usage dashboard in plain HTML, CSS, and vanilla JavaScript, driven by one data array.

**Per-resource meters from data**

Each tracked resource — API calls, storage, team seats — is an object with a \`used\`, a \`limit\`, a unit, and an icon key. \`render()\` maps the array into a labelled meter showing the formatted used/limit values, a progress fill, and a percentage caption. Numbers format intelligently (thousands get comma separators via \`toLocaleString\`, fractional GB values show one decimal), so "86,500 / 100,000" and "41.5 GB / 50 GB" both read naturally. Adding or removing a tracked resource is a data edit, not new markup.

**Three-tier warning colors, computed not stored**

The whole point of a usage meter is to warn *before* the customer is blocked. Each meter computes a tier from its percentage: \`ok\` (under 80%, indigo), \`warn\` (80–99%, amber, "running low"), and \`over\` (at or above 100%, red, "Limit reached"). The fill color, the percentage caption color, and the caption text all derive from that one tier function — so a resource at 86% automatically turns amber with a "running low" message, and there's no way for the color and the text to disagree. The fill width is capped at 100% so a maxed-out resource doesn't overflow its track.

**An overall badge that reflects the worst resource**

A single status badge in the header answers "is my account okay?" at a glance by reducing all resources to their *worst* tier — if any resource is over its limit the badge reads "Limit reached" in red; if any is merely near the limit it reads "Near limit" in amber; otherwise "On track" in green. This mirrors how users actually think about their account: one blocked resource is a problem even if the others are fine, so the summary surfaces the most urgent state rather than an average that would hide it.

**An upgrade nudge that appears only when relevant**

Beneath the meters, an upgrade panel stays hidden while everything is healthy and appears the moment any resource crosses into warn or over, with a message that counts how many resources are affected ("You're near your limit on 2 resources"). This is contextual monetization done right — the upsell shows up precisely when the customer has a reason to care about it, not as permanent dashboard clutter. The message wording also adapts between "near your limit" and "you've hit your limit" based on severity.

**Pure render, easy to wire up**

The demo buttons swap between low, near-limit, and over-limit datasets to show every state, but the component is just \`render(rows)\` — pass it your real usage data (from a billing or metering API) on load and whenever it refreshes, and the meters, badge, and upgrade nudge all recompute. There's no internal state to manage and every visual is derived from the numbers, so it can't drift out of sync with reality.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark "Plan usage" card renders with API calls, Storage, and Team seats meters in a near-limit state.` },
      { title: 'Switch usage states', text: `Click the Low / Near limit / Over limit demo buttons to see the meters, colors, badge, and upgrade nudge react.` },
      { title: 'Read the tier colors', text: `Meters under 80% are indigo, 80–99% turn amber ("running low"), and 100%+ turn red ("Limit reached").` },
      { title: 'Check the overall badge', text: `The header badge reflects the worst resource — any over-limit resource turns it red even if others are fine.` },
      { title: 'See the contextual upgrade nudge', text: `The upgrade panel appears only when a resource is near or over its limit, counting how many are affected.` },
      { title: 'Connect real usage data', text: `Replace the DATASETS with live values from your metering/billing API and call render(rows) on load and refresh.` },
    ] },
    features: [
      { title: 'Per-resource usage meters', text: `Each resource shows formatted used/limit values, a progress fill, and a percentage caption, all generated from data.` },
      { title: 'Three-tier warning colors', text: `ok / warn / over tiers drive the fill color, caption color, and caption text from one function — they can never disagree.` },
      { title: 'Worst-resource status badge', text: `A header badge reduces every resource to its most urgent tier, so one blocked resource is never hidden by healthy ones.` },
      { title: 'Contextual upgrade nudge', text: `An upgrade panel appears only when a resource is near or over limit, with a count of how many are affected.` },
      { title: 'Smart number formatting', text: `Thousands get comma separators and fractional units show one decimal, so values read naturally.` },
      { title: 'Capped fill width', text: `Over-limit resources cap at 100% so the bar never overflows its track.` },
      { title: 'Severity-aware messaging', text: `Captions and the nudge wording shift between "running low" and "limit reached" based on the tier.` },
      { title: 'Pure render(rows) function', text: `No internal state — pass live usage data and every meter, badge, and nudge recomputes from the numbers.` },
    ],
    useCases: [
      { title: 'SaaS account dashboards', text: `Show plan consumption (API calls, storage, seats) on the billing or overview page with a timely upgrade path.` },
      { title: 'API platform consoles', text: `Track request quotas and rate-limit usage so developers see headroom before they get throttled.` },
      { title: 'Storage and file products', text: `Display space used against the plan cap, nudging an upgrade as the user fills up.` },
      { title: 'Team and seat management', text: `Show seats used vs licensed, prompting an upgrade when a team is fully allocated — pair with a [pricing toggle](/ui-snippets/pricing-toggle/) for the upgrade flow.` },
      { title: 'Metered billing previews', text: `Combine with a [usage calculator](/ui-snippets/usage-calculator/) so customers see both current usage and projected cost.` },
      { title: 'Learning derived-state dashboards', text: `A reference for computing tiers, a worst-case summary, and conditional UI from one data array — compare with a [budget tracker card](/ui-snippets/budget-tracker-card/).` },
      { icon: 'CODE', title: 'Related: Week View Scheduler', desc: 'See the [Week View Scheduler](/ui-snippets/week-view-scheduler/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I connect this to real usage data?', a: `The component is a pure function of one rows array — each { key, name, used, limit, unit } object is one meter. Fetch live values from your metering or billing API, map them into that shape, and call render(rows) on load and whenever the data refreshes (polling, a websocket, or on navigation). Every meter, the badge, and the upgrade nudge recompute from the numbers.` },
      { q: 'How do I change the warning thresholds?', a: `Edit the tier() function — currently 100% is "over" and 80% is "warn". Lower the warn threshold (e.g. 75%) to nudge earlier, or add a fourth tier for "critical" at 95% with its own color and message. Because the fill color, caption, and badge all derive from tier(), changing it once updates everything consistently.` },
      { q: 'How should I handle resources that have no limit (unlimited plans)?', a: `Give such a resource a null or Infinity limit and special-case it in render(): show the used value with an "Unlimited" label and either hide the bar or render it empty, and exclude it from the worst-tier and upgrade-nudge calculations so it never triggers a false warning.` },
      { q: 'When should the upgrade nudge appear?', a: `This snippet shows it as soon as any resource reaches the warn tier (80%), which catches users before they're blocked — the highest-converting moment. If that feels too eager, gate it on the "over" tier only, or on a resource being within a few percent of its cap. Avoid showing it permanently; contextual relevance is what makes it convert rather than annoy.` },
      { q: 'How do I use this quota meter in React, Vue, or Angular?', a: `In React, pass the rows as a prop and derive each meter's tier, the worst tier, and the nudge visibility with useMemo; in Vue, use computed properties over a reactive rows ref; in Angular, use an @Input with getters or pipes. The tier and worst-resource reduction are plain functions that port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the derived-state logic here by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how tier() feeds the fill color, the caption color, and the caption text from one function so they can never disagree, and how the worst-resource reduce() in render() decides the overall badge state. The same assistant can help you optimize it — ask whether rebuilding the entire listEl.innerHTML string on every render() call is wasteful for a dashboard that refreshes frequently, and how you would patch just the changed meter instead. It's also useful for extending the widget: ask it to add a fourth "critical" tier between warn and over, animate the upgrade panel's appearance instead of a hard show/hide, or wire render() to a polling fetch against a real billing API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a SaaS plan-usage dashboard card in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- Render one meter per tracked resource from a single data array of objects, each with a name, a used value, a limit value, and a unit string — the meter list, header badge, and upgrade panel must all be pure functions of this one array (no separate state to keep in sync).
- Compute a percentage-used tier for every resource with one function: under 80% is "ok", 80% up to just under 100% is "warn", and 100% or more is "over". The fill bar's color, the percentage caption's color, and the caption's text must all be derived from that same tier function's return value, never set independently.
- Cap the visual fill width at 100% even if usage exceeds the limit, but still classify that resource as "over" for tier purposes.
- Add an overall status badge in the header that reduces every resource to its single worst tier (over beats warn beats ok) — one over-limit resource must turn the badge red even if every other resource is healthy.
- Add an upgrade-nudge panel that stays hidden while every resource is "ok" and becomes visible the moment any resource enters "warn" or "over", with message text that counts how many resources are affected and changes wording between "near your limit" and "you've hit your limit" depending on whether the worst tier is warn or over.
- Format large numbers with thousands separators and fractional units (like GB) with one decimal place so values read naturally rather than as raw floats.`,
    },
  },
};

export default quotaUsageMeter;
