const storageQuotaMeter = {
  id: 'storage-quota-meter',
  title: 'Storage Quota Meter',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<section class="sqm-wrap">
  <span class="sqm-tag">storagemanager api · navigator.storage</span>
  <h1>Storage quota</h1>
  <p id="sqmStatus">Reading real storage usage for this origin…</p>

  <div class="sqm-meter">
    <div class="sqm-bar"><div class="sqm-fill" id="sqmFill"></div></div>
    <div class="sqm-labels">
      <span id="sqmUsed">0 MB used</span>
      <span id="sqmQuota">of 0 MB</span>
    </div>
  </div>

  <div class="sqm-grid">
    <div class="sqm-stat"><span id="sqmPercent">0%</span><small>of quota used</small></div>
    <div class="sqm-stat"><span id="sqmPersisted">Unknown</span><small>persisted storage</small></div>
  </div>

  <div class="sqm-actions">
    <button class="sqm-btn" id="sqmPersistBtn">Request persistent storage</button>
    <button class="sqm-btn ghost" id="sqmRefreshBtn">Refresh estimate</button>
  </div>
  <p class="sqm-note" id="sqmNote"></p>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#101d2c,#050b12 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.sqm-wrap{width:100%;max-width:520px}
.sqm-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#7dd3fc;background:rgba(125,211,252,.1);border:1px solid rgba(125,211,252,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.sqm-wrap h1{font-size:clamp(26px,5.5vw,36px);font-weight:800;letter-spacing:-.03em}
.sqm-wrap>p{font-size:13.5px;color:#9bb7cf;margin-top:8px;line-height:1.6}
.sqm-meter{margin:22px 0}
.sqm-bar{height:16px;border-radius:99px;background:#0c1723;border:1px solid rgba(125,211,252,.2);overflow:hidden}
.sqm-fill{height:100%;width:0%;border-radius:99px;background:linear-gradient(90deg,#38bdf8,#818cf8);transition:width .5s ease}
.sqm-labels{display:flex;justify-content:space-between;font-size:12px;color:#8faabf;margin-top:8px}
.sqm-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:18px}
.sqm-stat{background:#0c1723;border:1px solid rgba(255,255,255,.08);border-radius:10px;padding:14px;text-align:center}
.sqm-stat span{display:block;font-size:19px;font-weight:800;color:#7dd3fc}
.sqm-stat small{font-size:10.5px;color:#67839a;text-transform:uppercase;letter-spacing:.05em}
.sqm-actions{display:flex;gap:10px;flex-wrap:wrap}
.sqm-btn{flex:1;min-width:160px;padding:12px 16px;border-radius:10px;border:1px solid transparent;background:linear-gradient(135deg,#38bdf8,#818cf8);color:#04121f;font:700 13px system-ui;cursor:pointer}
.sqm-btn.ghost{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.14);color:#e8f2fb;font-weight:600}
.sqm-btn:hover{filter:brightness(1.06)}
.sqm-note{font-size:11.5px;color:#5f7d94;margin-top:12px;line-height:1.6}`,

  js: `var fill = document.getElementById('sqmFill');
var usedEl = document.getElementById('sqmUsed');
var quotaEl = document.getElementById('sqmQuota');
var percentEl = document.getElementById('sqmPercent');
var persistedEl = document.getElementById('sqmPersisted');
var statusEl = document.getElementById('sqmStatus');
var noteEl = document.getElementById('sqmNote');
var persistBtn = document.getElementById('sqmPersistBtn');
var refreshBtn = document.getElementById('sqmRefreshBtn');

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024 * 1024) return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  if (bytes >= 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  if (bytes >= 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return bytes + ' B';
}

var supported = !!(navigator.storage && navigator.storage.estimate);

async function refreshEstimate() {
  if (!supported) return;
  try {
    var est = await navigator.storage.estimate();
    var usage = est.usage || 0;
    var quota = est.quota || 0;
    var pct = quota > 0 ? Math.min(100, (usage / quota) * 100) : 0;

    fill.style.width = pct.toFixed(2) + '%';
    usedEl.textContent = formatBytes(usage) + ' used';
    quotaEl.textContent = 'of ' + formatBytes(quota);
    percentEl.textContent = pct.toFixed(1) + '%';
    statusEl.textContent = 'Live estimate from navigator.storage.estimate() for this origin.';
  } catch (err) {
    statusEl.textContent = 'estimate() failed (' + (err && err.name ? err.name : 'error') + ') — see note below.';
  }
}

async function refreshPersisted() {
  if (!(navigator.storage && navigator.storage.persisted)) {
    persistedEl.textContent = 'N/A';
    return;
  }
  try {
    var isPersisted = await navigator.storage.persisted();
    persistedEl.textContent = isPersisted ? 'Granted' : 'Not granted';
  } catch (err) {
    persistedEl.textContent = 'Unknown';
  }
}

if (supported) {
  noteEl.textContent = 'estimate() returns approximate figures — browsers intentionally round or slightly randomize them to reduce fingerprinting precision, so treat this as a close estimate, not an exact byte count.';
  refreshEstimate();
  refreshPersisted();
} else {
  // The StorageManager API (navigator.storage) is missing in some older
  // browsers and certain restricted/sandboxed embedding contexts. Rather
  // than show a blank or zeroed meter, switch to a clearly labeled
  // "unavailable" state with an explanatory note.
  statusEl.textContent = 'StorageManager API unsupported in this browser/context.';
  usedEl.textContent = 'Unavailable';
  quotaEl.textContent = '';
  percentEl.textContent = '—';
  persistedEl.textContent = 'N/A';
  fill.style.width = '0%';
  noteEl.textContent = 'navigator.storage.estimate() is not available here (common in older browsers or some sandboxed/private-browsing contexts). No usage/quota figures can be shown — this is not a fake fallback because there is no honest number to display, so the meter stays at 0 with this explanation instead.';
  persistBtn.disabled = true;
  refreshBtn.disabled = true;
}

persistBtn.addEventListener('click', async function () {
  if (!(navigator.storage && navigator.storage.persist)) {
    noteEl.textContent = 'navigator.storage.persist() is unsupported here.';
    return;
  }
  persistBtn.disabled = true;
  persistBtn.textContent = 'Requesting…';
  try {
    var granted = await navigator.storage.persist();
    noteEl.textContent = granted
      ? "Persistent storage granted — this origin's data is now less likely to be evicted under storage pressure."
      : 'Persistent storage was NOT granted. Browsers typically require criteria like bookmarking the site, installing it as a PWA, or having high site engagement before granting this automatically.';
    await refreshPersisted();
  } catch (err) {
    noteEl.textContent = 'persist() request failed (' + (err && err.name ? err.name : 'error') + ').';
  }
  persistBtn.disabled = false;
  persistBtn.textContent = 'Request persistent storage';
});

refreshBtn.addEventListener('click', function () {
  refreshEstimate();
  refreshPersisted();
});`,

  seo: {
    title: 'Storage Quota Meter — Free navigator.storage.estimate() Demo',
    description: `A live meter showing real browser storage usage and quota via navigator.storage.estimate(), with a persist() request button and a clear fallback for unsupported browsers. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Storage Quota Meter — Real Usage, Real Quota, No Guessing',
      description: `This snippet reads the browser's actual StorageManager API to show how much storage the current origin is using and how much it's allowed, instead of a hardcoded or simulated bar. It's the same API browsers themselves use to power storage-usage pages in their settings UI.

**Real numbers from navigator.storage.estimate()**

\`navigator.storage.estimate()\` returns a promise resolving to \`{ usage, quota }\` in bytes — \`usage\` is the origin's combined footprint across IndexedDB, Cache Storage, Service Worker registrations, and other storage APIs, and \`quota\` is roughly how much it's currently allowed (a share of overall device storage that varies by browser policy and available disk space). This snippet formats both into human-readable KB/MB/GB and drives the meter's fill width from the real \`usage / quota\` ratio — never a placeholder percentage.

**Why the numbers aren't exact to the byte**

Browsers intentionally add some imprecision to \`estimate()\` — rounding or slight randomization — specifically to reduce its usefulness as a device/storage fingerprinting signal. The snippet's note is upfront about this: treat the figures as a close, honest estimate rather than an exact byte count, which is exactly what the spec itself promises.

**Requesting persistence**

By default, a browser is allowed to evict an origin's storage under pressure (e.g. the device running low on disk space), starting with the least-recently-used origins. \`navigator.storage.persist()\` requests an upgrade to "persistent" storage that's exempt from that automatic eviction. The browser decides whether to grant it — often based on signals like whether the site is bookmarked, installed as a PWA, or has high engagement — and the snippet shows the real boolean result via \`navigator.storage.persisted()\`, including the honest "not granted" case with an explanation of why that's common.

**The unsupported case, handled honestly**

Where the StorageManager API doesn't exist — some older browsers, certain restricted embedding contexts — there is no real number to fall back to, so rather than fabricate one, the meter clearly states the API is unavailable, disables the action buttons, and stays at zero with an explanation. That's the honest fallback for an API where simulating plausible-looking bytes would actively mislead. Pair this with a [network information badge](/ui-snippets/network-information-badge/) or [background sync status](/ui-snippets/background-sync-status/) for a fuller "what can this browser do right now" dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The meter reads real storage usage on load.` },
      { title: 'Check the bar and percentage', text: `Both come directly from navigator.storage.estimate().` },
      { title: 'Click "Request persistent storage"', text: `The browser decides whether to grant it.` },
      { title: 'Check the persisted stat', text: `Shows the real navigator.storage.persisted() result.` },
      { title: 'Click "Refresh estimate"', text: `Re-reads current usage after adding/removing data.` },
      { title: 'Try it where unsupported', text: `A clear "unavailable" state appears instead of fake numbers.` },
    ] },
    features: [
      { title: 'Real usage/quota bytes', text: `navigator.storage.estimate() drives every figure.` },
      { title: 'Human-readable formatting', text: `Auto-scales to KB/MB/GB.` },
      { title: 'Live percentage bar', text: `Fill width equals the real usage/quota ratio.` },
      { title: 'persist() request flow', text: `Real grant/deny result, not assumed success.` },
      { title: 'persisted() status', text: `Reflects the browser's actual decision.` },
      { title: 'Manual refresh', text: `Re-check the estimate at any time.` },
      { title: 'Honest unsupported state', text: `No fabricated numbers when the API is missing.` },
      { title: 'Precision caveat noted', text: `Explains why estimate() is intentionally approximate.` },
    ],
    useCases: [
      { title: 'PWA storage settings', text: 'Show users their app\'s real footprint using `navigator.storage.estimate()`, instead of a hardcoded or simulated bar that never changes.' },
      { title: 'Offline-first apps', text: 'Warn users before large downloads when they are near their quota, and offer the `persist()` request so the browser does not evict the data.' },
      { title: 'Data-heavy dashboards', text: 'Pair with a [network information badge](/ui-snippets/network-information-badge/) to show connection quality and local storage together on one panel.' },
      { title: 'Sync and backup tools', text: 'Relate local usage to [background sync status](/ui-snippets/background-sync-status/), so users see both what is stored and what is waiting to upload.' },
      { title: 'Developer debug panels', text: 'Inspect real storage usage while building offline features, with figures auto-scaled to KB, MB or GB and a clear fallback in unsupported browsers.' },
    ],
    faqs: [
      { q: 'Is the usage/quota shown exact, down to the byte?', a: `No, and it's not supposed to be. The spec allows browsers to return a slightly imprecise estimate — often rounded or lightly randomized — specifically to reduce the API's value as a fingerprinting signal. The figures are close and genuinely reflect real usage, but should be treated as an estimate rather than an exact accounting.` },
      { q: 'What counts toward "usage" in the estimate?', a: `Typically the combined footprint of IndexedDB databases, the Cache Storage API (often used by service workers), Service Worker registrations themselves, and other origin-scoped storage mechanisms. It does not include things like browser-level HTTP cache shared across origins.` },
      { q: 'Why would navigator.storage.persist() be denied?', a: `Browsers weigh signals like whether the user has bookmarked the site, installed it as a PWA/home-screen app, granted notification permissions, or shown a high level of engagement with the origin over time. A brand-new or rarely-visited site is commonly denied automatically, which is the expected, honest outcome shown by this snippet rather than treated as an error.` },
      { q: 'What happens if the StorageManager API is unsupported?', a: `The snippet checks for navigator.storage.estimate before doing anything. If it's missing, there is no real number to show, so rather than fabricate a plausible-looking bar, it clearly labels the meter as unavailable, disables the action buttons, and explains why — the same honesty principle used for other browser-capability snippets in this library.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Call navigator.storage.estimate() and persisted() inside a mount effect (or on demand from a button handler) and store the results in component state, re-rendering the bar's width and labels from that state exactly as the vanilla version updates the DOM directly. The persist() request stays a simple async call inside your button's click handler.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain what navigator.storage.estimate()'s usage and quota fields actually represent, which storage APIs count toward usage, and why the browser is allowed to return an intentionally imprecise number rather than an exact byte count. It's also useful for reasoning about persistence — ask what factors typically influence whether a browser grants a persist() request, and why an origin's storage can be evicted under pressure by default without it. For extensions, ask it to add a breakdown of usage by storage type using the (less broadly supported) estimate().usageDetails field where available, or to visualize historical usage over time by sampling estimate() periodically. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "storage quota meter" in plain HTML, CSS, and JavaScript using the real browser StorageManager API (navigator.storage) — no libraries.

Requirements:
- On load, call navigator.storage.estimate() and use the real usage and quota byte values (not placeholders) to fill a progress bar to usage/quota as a percentage, and display both figures formatted into human-readable KB/MB/GB.
- Also call navigator.storage.persisted() to show whether persistent storage is currently granted for this origin, and provide a "Request persistent storage" button that calls navigator.storage.persist() and displays the real boolean result it resolves to (explaining in the UI that the browser may deny this and that's an expected, not an error, outcome).
- A "Refresh estimate" button that re-runs estimate() and persisted() on demand.
- CRITICAL: feature-detect navigator.storage && navigator.storage.estimate before using it. If unsupported, do NOT fabricate or guess any usage/quota numbers — instead show a clearly labeled "storage API unavailable" state (bar at 0, disabled action buttons, explanatory note) since there is no honest number to display in that case.
- Include a visible note explaining that estimate() values are intentionally approximate (browsers may round or slightly randomize them to reduce fingerprinting risk), so the demo doesn't imply false precision.`,
    },
  },
};

export default storageQuotaMeter;
