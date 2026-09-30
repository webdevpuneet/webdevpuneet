const sslCertificateExpiryMonitor = {
  id: 'ssl-certificate-expiry-monitor',
  title: 'SSL Certificate Expiry Monitor',
  category: 'dashboards',
  html: `<div class="demo">
  <div class="tile">
    <div class="tile-head">
      <h3>SSL certificates</h3>
      <span class="summary-badge" id="summaryBadge">1 expiring soon</span>
    </div>

    <div class="domains" id="domains"></div>

    <div class="tile-foot">
      <span id="lastChecked">Checked just now</span>
      <button class="recheck-btn" id="recheckBtn">Recheck all</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.tile { width: 400px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px 22px; display: flex; flex-direction: column; gap: 14px; }

.tile-head { display: flex; align-items: center; justify-content: space-between; }
.tile-head h3 { font-size: 15px; font-weight: 800; color: #0f172a; }
.summary-badge { font-size: 11px; font-weight: 800; padding: 4px 10px; border-radius: 999px; background: #fffbeb; color: #b45309; white-space: nowrap; }
.summary-badge.clear { background: #dcfce7; color: #15803d; }
.summary-badge.critical { background: #fee2e2; color: #dc2626; }

.domains { display: flex; flex-direction: column; gap: 8px; }
.dom-row { display: flex; align-items: center; gap: 11px; padding: 11px 12px; border-radius: 11px; background: #f8fafc; transition: background 0.2s; }

.dom-icon { width: 30px; height: 30px; border-radius: 9px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.dom-icon.ok { background: #dcfce7; color: #16a34a; }
.dom-icon.warn { background: #fef3c7; color: #d97706; }
.dom-icon.crit { background: #fee2e2; color: #dc2626; }

.dom-body { flex: 1; min-width: 0; }
.dom-name { font-size: 13px; font-weight: 700; color: #0f172a; font-family: ui-monospace, 'SF Mono', monospace; }
.dom-issuer { font-size: 11px; color: #94a3b8; margin-top: 2px; }

.dom-days-wrap { text-align: right; flex-shrink: 0; }
.dom-days { font-size: 15px; font-weight: 800; font-variant-numeric: tabular-nums; }
.dom-days.ok { color: #16a34a; }
.dom-days.warn { color: #d97706; }
.dom-days.crit { color: #dc2626; }
.dom-days-label { font-size: 10px; color: #94a3b8; font-weight: 600; display: block; margin-top: 1px; }

.dom-track { height: 4px; border-radius: 999px; background: #e2e8f0; margin-top: 8px; overflow: hidden; }
.dom-fill { height: 100%; border-radius: 999px; transition: width 0.4s ease; }
.dom-fill.ok { background: #22c55e; }
.dom-fill.warn { background: #f59e0b; }
.dom-fill.crit { background: #ef4444; }

.tile-foot { display: flex; align-items: center; justify-content: space-between; padding-top: 12px; border-top: 1px solid #f1f5f9; }
.tile-foot span { font-size: 11.5px; color: #94a3b8; }
.recheck-btn { border: none; background: transparent; color: #6366f1; font-size: 12px; font-weight: 700; cursor: pointer; padding: 4px 6px; transition: opacity 0.12s; }
.recheck-btn:hover { opacity: 0.7; }
.recheck-btn.spinning { pointer-events: none; opacity: 0.5; }`,
  js: `var VALIDITY_WINDOW_DAYS = 90; // typical Let's Encrypt-style cert lifetime, used for the progress track
var DOMAINS = [
  { host: 'api.example.com', issuer: "Let's Encrypt", daysLeft: 61 },
  { host: 'app.example.com', issuer: "Let's Encrypt", daysLeft: 9 },
  { host: 'cdn.example.com', issuer: 'DigiCert', daysLeft: 214 },
  { host: 'mail.example.com', issuer: "Let's Encrypt", daysLeft: 44 },
];

var WARN_THRESHOLD = 21;
var CRIT_THRESHOLD = 10;

function stateFor(days) {
  if (days <= CRIT_THRESHOLD) return 'crit';
  if (days <= WARN_THRESHOLD) return 'warn';
  return 'ok';
}

function iconFor(state) {
  if (state === 'crit') return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>';
  if (state === 'warn') return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 7v5l3 3"/></svg>';
  return '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>';
}

function render() {
  var worst = DOMAINS.reduce(function (acc, d) { return Math.min(acc, d.daysLeft); }, Infinity);
  var worstState = stateFor(worst);
  var badge = document.getElementById('summaryBadge');
  var criticalCount = DOMAINS.filter(function (d) { return stateFor(d.daysLeft) === 'crit'; }).length;
  var warnCount = DOMAINS.filter(function (d) { return stateFor(d.daysLeft) === 'warn'; }).length;

  badge.className = 'summary-badge' + (worstState === 'ok' ? ' clear' : worstState === 'crit' ? ' critical' : '');
  badge.textContent = worstState === 'ok'
    ? 'All certificates healthy'
    : criticalCount > 0
      ? criticalCount + ' expiring critically soon'
      : warnCount + ' expiring soon';

  var wrap = document.getElementById('domains');
  wrap.innerHTML = DOMAINS.slice().sort(function (a, b) { return a.daysLeft - b.daysLeft; }).map(function (d) {
    var state = stateFor(d.daysLeft);
    var pct = Math.max(2, Math.min(100, Math.round((d.daysLeft / VALIDITY_WINDOW_DAYS) * 100)));
    return '<div class="dom-row">' +
      '<div class="dom-icon ' + state + '">' + iconFor(state) + '</div>' +
      '<div class="dom-body">' +
        '<div class="dom-name">' + d.host + '</div>' +
        '<div class="dom-issuer">' + d.issuer + '</div>' +
        '<div class="dom-track"><div class="dom-fill ' + state + '" style="width:' + pct + '%"></div></div>' +
      '</div>' +
      '<div class="dom-days-wrap">' +
        '<span class="dom-days ' + state + '">' + d.daysLeft + '</span>' +
        '<span class="dom-days-label">days left</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

document.getElementById('recheckBtn').addEventListener('click', function (e) {
  var btn = e.currentTarget;
  btn.classList.add('spinning');
  btn.textContent = 'Checking...';
  // Simulated re-check — in production this calls your certificate monitoring API per domain.
  setTimeout(function () {
    DOMAINS.forEach(function (d) { d.daysLeft = Math.max(0, d.daysLeft - 1); });
    render();
    document.getElementById('lastChecked').textContent = 'Checked just now';
    btn.classList.remove('spinning');
    btn.textContent = 'Recheck all';
  }, 700);
});

render();`,
  seo: {
    title: 'SSL Certificate Expiry Monitor — Free HTML CSS JS Snippet',
    description: 'A dashboard widget tracking days-until-expiry across multiple domain SSL certificates, sorted soonest-first with color-coded warning and critical thresholds.',
    about: {
      title: 'SSL Certificate Expiry Monitor — Sorted, Threshold-Colored Domain List',
      description: `An expired SSL certificate is one of the most avoidable outages in production — the fix is trivial (renew it) but the failure mode is total (browsers block the whole site with a hard error). This widget exists to make expiry impossible to miss: a list of monitored domains sorted soonest-expiring-first, each with a days-remaining count colored against two thresholds, and a summary badge that surfaces the single worst case at the top of the tile.

**Sorting by urgency, not by domain name or list order**

\`render()\` calls \`DOMAINS.slice().sort(...)\` on every render, ordering domains by ascending \`daysLeft\` rather than showing them in whatever order they happen to be defined in the array. This is a deliberate choice for a monitoring widget specifically — the domain closest to expiring is the one that needs attention, so it should always be first regardless of how many domains are being watched or what order they were added in. The \`.slice()\` before \`.sort()\` avoids mutating the original \`DOMAINS\` array in place, keeping the underlying data order stable even though the rendered order changes.

**Two thresholds, three states**

\`stateFor()\` uses \`WARN_THRESHOLD\` (21 days) and \`CRIT_THRESHOLD\` (10 days) as the only two numbers driving every color decision in the widget — the icon background, the days-left text color, and the progress track fill color all derive from the same \`stateFor(d.daysLeft)\` call per domain, so there's exactly one place to adjust if your organization's renewal policy uses different lead times.

**The progress track encodes elapsed lifetime, not urgency directly**

Each domain's track fill width is \`daysLeft / VALIDITY_WINDOW_DAYS\` — the *fraction of a typical certificate's total lifetime* still remaining, not a fraction of the warning threshold. \`VALIDITY_WINDOW_DAYS\` defaults to 90 (a common lifetime for short-lived certificates like those issued by Let's Encrypt), so a cert with 60 days left shows a track roughly two-thirds full, giving a sense of "how much of this certificate's life is used up" at a glance, distinct from the days-left number itself which answers "how much time until action is required."

**A summary badge that surfaces the worst case, not an average**

The header badge never averages or sums anything across domains — it finds the single \`worst\` (minimum) \`daysLeft\` value and bases its text and color entirely on that one domain's state, then further distinguishes "N expiring critically soon" from "N expiring soon" based on whether any domain has crossed the critical threshold. A monitoring summary that averaged expiry across many healthy domains could mask one single domain about to expire — showing the worst case first is the only representation that can't hide an urgent problem behind a comfortable-looking average.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Read the summary badge first', text: 'It always reflects the single worst-case domain, not an average — green means every domain is healthy, amber or red means at least one needs attention.' },
        { title: 'Scan the sorted list', text: 'Domains are always ordered soonest-expiring-first, so the one at the top needs the most urgent attention.' },
        { title: 'Click Recheck all', text: 'Simulates a fresh certificate check in the demo; wire this to your real monitoring API to actually re-query expiry dates.' },
        { title: 'Populate DOMAINS with real data', text: 'Replace the array with results from your certificate monitoring service or a periodic openssl/TLS handshake check, using the same { host, issuer, daysLeft } shape.' },
        { title: 'Adjust the warning thresholds', text: 'Edit WARN_THRESHOLD and CRIT_THRESHOLD to match your team\'s actual renewal lead time policy.' },
        { title: 'Set VALIDITY_WINDOW_DAYS to your typical cert lifetime', text: 'Use 90 for short-lived certificate authorities, or up to 397 for longer-lived certificates, so the progress track proportion reads correctly.' },
      ],
    },
    features: [
      'Domains always sorted soonest-expiring-first, independent of the order they were added to the data array',
      'Summary badge reflects the single worst-case domain, never an average that could hide an urgent expiry',
      'Two numeric thresholds (warning, critical) drive every color decision consistently across icon, text and progress track',
      'Progress track fill represents fraction of typical certificate lifetime remaining, distinct from the raw days-left number',
      'Non-mutating sort (.slice().sort()) keeps the underlying data array\'s original order stable',
      'Distinct icon per state (checkmark, clock, warning triangle) reinforced by color for redundant signaling',
      'Simulated recheck action with a loading state, structured as a drop-in point for a real monitoring API call',
      'Compact tile layout suited to a grid of other ops/infrastructure dashboard widgets',
    ],
    useCases: [
      { icon: 'OPS', title: 'Infrastructure and DevOps dashboards', desc: 'Give an ops team one place to see every monitored domain\'s certificate health without checking each one individually in a browser.' },
      { icon: 'ALERT', title: 'Uptime and reliability monitoring tools', desc: 'Pair with the [Uptime Status Page](/ui-snippets/uptime-status-page/) pattern as a proactive, pre-incident counterpart — catching expiry before it causes a real outage.' },
      { icon: 'DASH', title: 'Domain and DNS portfolio management', desc: 'Extend the same sorted-list-with-thresholds pattern to also track domain registration expiry alongside certificate expiry.' },
      { icon: 'CODE', title: 'Internal platform/SRE tooling', desc: 'Embed as one tile in a larger internal platform dashboard alongside deploy status and incident widgets.' },
      { icon: 'CODE', title: 'Related: Scheduled Job Run History Tile', desc: 'See the [Scheduled Job Run History Tile](/ui-snippets/job-run-history-status-tile/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the widget decide which domain to highlight in the summary badge?', a: 'It computes worst as the minimum daysLeft across all domains and bases the badge\'s color and text entirely on that single value via stateFor(worst), rather than averaging. This ensures one domain about to expire is never hidden behind a comfortable average across many healthy domains.' },
      { q: 'Why sort the list on every render instead of keeping it pre-sorted?', a: 'DOMAINS.slice().sort() is called fresh inside render() so the displayed order always reflects the current daysLeft values, even after a recheck changes them — and .slice() first avoids mutating the original array, so the underlying data order stays stable regardless of how many times the widget re-renders.' },
      { q: 'What does the progress track under each domain represent?', a: 'It shows daysLeft divided by VALIDITY_WINDOW_DAYS — the fraction of a typical certificate\'s total lifetime still remaining, not a fraction of the warning threshold. This gives a sense of how much of the certificate\'s life is used up, distinct from the raw days-left number shown alongside it.' },
      { q: 'How do I change when a certificate is considered "warning" versus "critical"?', a: 'Edit the two constants WARN_THRESHOLD and CRIT_THRESHOLD near the top of the JS — every color decision in the widget (icon background, days-left text, progress fill) derives from the same stateFor() function using these two numbers, so changing them updates every visual consistently.' },
      { q: 'How do I connect this to a real certificate monitoring backend?', a: 'Replace the static DOMAINS array with data fetched from your monitoring service\'s API (or a periodic TLS handshake / openssl check against each host), keeping the same { host, issuer, daysLeft } object shape, and call render() after each fetch. Wire the Recheck button\'s click handler to trigger that fetch instead of the demo\'s setTimeout simulation.' },
      { q: 'Can I add more domains or extra fields like the certificate expiry date?', a: 'Yes — DOMAINS is a plain array of objects; add more entries or extra fields (such as an explicit expiresAt date) and extend the template string in render() to display them. The sort and threshold logic will apply automatically to any number of domains.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the summary badge is based on the single worst-case domain's expiry rather than an average across all monitored domains, and what failure mode that design choice specifically prevents. The same assistant can help optimize it — for instance asking whether re-sorting the full array on every render is worth optimizing away for a very large number of monitored domains, or whether the thresholds should be configurable per-domain rather than global constants. It's also useful for extending the widget: ask it to add automatic renewal-triggering integration for a specific certificate authority's API, group domains by their issuing CA, or add a notification/webhook when a domain crosses the critical threshold. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "SSL certificate expiry monitor" dashboard widget in HTML, CSS, and vanilla JavaScript — no charting library.

Requirements:
- Maintain monitored domains as a plain array of objects, each with a hostname, a certificate issuer name, and a number of days remaining until expiry.
- Always render the list sorted so the domain with the fewest days remaining appears first, recomputing this sort order fresh on every render without permanently mutating the original underlying array's order.
- Classify every domain into exactly one of three states (healthy, warning, critical) using two numeric day thresholds, and use that single classification consistently to color that domain's icon, its days-remaining number, and a small horizontal progress track — all three visual elements for one domain must always agree on its state.
- The progress track's fill proportion must represent the fraction of a typical total certificate lifetime (a separate constant, such as 90 days) still remaining — not a fraction of the warning threshold — so it communicates "how much of this certificate's life is used up" as a value distinct from the raw days-remaining number shown next to it.
- Add a single summary indicator at the top of the widget that reflects only the single most urgent (soonest-expiring) domain's state, not an average or count-based blend across all domains, so one domain in trouble can never be hidden by many healthy ones.
- Add a "recheck" button that simulates re-querying certificate status (a brief loading state is enough — no real network call required) and updates every domain's days-remaining value and the whole widget's rendering afterward.`,
    },
  },
};

export default sslCertificateExpiryMonitor;
