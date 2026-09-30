const alertFeedPanel = {
  id: 'alert-feed-panel',
  title: 'Live Ops Alert Feed Panel',
  lastmod: '2026-08-08',
  category: 'dashboards',
  html: `<div class="demo-wrap">
  <div class="feed-panel" id="feed-panel" tabindex="0" aria-label="Live operations alert feed">
    <div class="feed-header">
      <div class="feed-title-row">
        <h3>Ops Alerts</h3>
        <span class="unread-badge hidden" id="unread-badge">0</span>
      </div>
      <div class="feed-controls">
        <label class="filter-toggle">
          <input type="checkbox" id="filter-critical">
          <span>Warning + Critical only</span>
        </label>
        <span class="live-dot" aria-hidden="true"></span>
        <span class="live-label">Live</span>
      </div>
    </div>
    <div class="feed-list" id="feed-list"></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.feed-panel {
  width: 420px; max-width: 100%;
  background: #fff; border-radius: 16px;
  border: 1px solid #e2e8f0;
  box-shadow: 0 8px 30px rgba(15,23,42,0.08);
  overflow: hidden;
  outline: none;
}
.feed-panel:focus-visible { box-shadow: 0 0 0 3px rgba(99,102,241,0.35); }

.feed-header {
  padding: 16px 18px 12px;
  border-bottom: 1px solid #f1f5f9;
  display: flex; flex-direction: column; gap: 10px;
}
.feed-title-row { display: flex; align-items: center; gap: 8px; }
.feed-title-row h3 { font-size: 15px; font-weight: 700; color: #0f172a; flex: 1; }

.unread-badge {
  background: #6366f1; color: #fff; font-size: 11px; font-weight: 700;
  min-width: 20px; height: 20px; padding: 0 6px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s, opacity 0.2s;
}
.unread-badge.hidden { opacity: 0; transform: scale(0.6); pointer-events: none; }

.feed-controls { display: flex; align-items: center; gap: 8px; }
.filter-toggle { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #475569; cursor: pointer; flex: 1; }
.filter-toggle input { accent-color: #6366f1; width: 14px; height: 14px; }

.live-dot { width: 7px; height: 7px; border-radius: 50%; background: #22c55e; box-shadow: 0 0 0 3px rgba(34,197,94,0.15); }
.live-label { font-size: 11px; font-weight: 600; color: #16a34a; }

.feed-list {
  max-height: 420px; overflow-y: auto;
  padding: 10px; display: flex; flex-direction: column; gap: 8px;
}

.alert-item {
  display: flex; gap: 10px; align-items: flex-start;
  padding: 11px 12px; border-radius: 10px;
  background: #f8fafc; border-left: 3px solid #94a3b8;
  animation: slideIn 0.35s ease;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.alert-item.info { border-left-color: #3b82f6; background: #eff6ff; }
.alert-item.warning { border-left-color: #f59e0b; background: #fffbeb; }
.alert-item.critical { border-left-color: #ef4444; background: #fef2f2; }

.alert-icon {
  width: 26px; height: 26px; border-radius: 50%; flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  color: #fff;
}
.alert-item.info .alert-icon { background: #3b82f6; }
.alert-item.warning .alert-icon { background: #f59e0b; }
.alert-item.critical .alert-icon { background: #ef4444; }

.alert-body { flex: 1; min-width: 0; }
.alert-msg { font-size: 13px; font-weight: 600; color: #1e293b; line-height: 1.4; }
.alert-meta { font-size: 11px; color: #94a3b8; margin-top: 3px; display: flex; gap: 6px; align-items: center; }
.alert-sev-tag { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.03em; }
.alert-item.info .alert-sev-tag { color: #3b82f6; }
.alert-item.warning .alert-sev-tag { color: #b45309; }
.alert-item.critical .alert-sev-tag { color: #dc2626; }

.feed-empty { text-align: center; font-size: 12px; color: #94a3b8; padding: 24px; }

.feed-list::-webkit-scrollbar { width: 8px; }
.feed-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }`,
  js: `const ALERT_POOL = [
  { sev: 'info', msg: 'Deploy succeeded: api-gateway v2.14.0' },
  { sev: 'info', msg: 'Auto-scaling: added 2 instances to web-fleet' },
  { sev: 'info', msg: 'Nightly backup completed successfully' },
  { sev: 'warning', msg: 'API latency spike: p95 at 840ms on /checkout' },
  { sev: 'warning', msg: 'Disk usage at 78% on db-replica-2' },
  { sev: 'warning', msg: 'Rate limit approaching for partner-api-key-04' },
  { sev: 'critical', msg: 'Disk usage at 94% on db-primary-1' },
  { sev: 'critical', msg: 'Payment webhook failures: 12 in last 5 min' },
  { sev: 'critical', msg: 'Region us-east-1 health check failing' },
];

const ICONS = {
  info: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>',
  warning: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
  critical: '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
};

const feedList = document.getElementById('feed-list');
const feedPanel = document.getElementById('feed-panel');
const unreadBadge = document.getElementById('unread-badge');
const filterCritical = document.getElementById('filter-critical');

let unread = 0;
let alerts = [];
let timerId = null;

function timeAgo() {
  return 'just now';
}

function renderAlert(alert) {
  const el = document.createElement('div');
  el.className = 'alert-item ' + alert.sev;
  el.innerHTML =
    '<span class="alert-icon">' + ICONS[alert.sev] + '</span>' +
    '<div class="alert-body">' +
      '<div class="alert-msg">' + alert.msg + '</div>' +
      '<div class="alert-meta"><span class="alert-sev-tag">' + alert.sev + '</span><span>&middot;</span><span class="alert-time">' + timeAgo() + '</span></div>' +
    '</div>';
  return el;
}

function applyFilter() {
  const onlyImportant = filterCritical.checked;
  feedList.querySelectorAll('.alert-item').forEach((el, i) => {
    const alert = alerts[i];
    if (onlyImportant && alert.sev === 'info') {
      el.style.display = 'none';
    } else {
      el.style.display = 'flex';
    }
  });
}

function pushAlert() {
  const pick = ALERT_POOL[Math.floor(Math.random() * ALERT_POOL.length)];
  const alert = { ...pick, id: Date.now() };
  alerts.unshift(alert);
  if (alerts.length > 30) alerts.pop();

  const el = renderAlert(alert);
  feedList.prepend(el);

  const isFocused = document.activeElement === feedPanel || feedPanel.matches(':hover');
  if (!isFocused) {
    unread += 1;
    unreadBadge.textContent = unread > 99 ? '99+' : String(unread);
    unreadBadge.classList.remove('hidden');
  }

  while (feedList.children.length > 30) {
    feedList.removeChild(feedList.lastChild);
  }

  applyFilter();
}

function clearUnread() {
  unread = 0;
  unreadBadge.classList.add('hidden');
}

feedPanel.addEventListener('focus', clearUnread);
feedPanel.addEventListener('mouseenter', clearUnread);
feedList.addEventListener('scroll', clearUnread);
filterCritical.addEventListener('change', applyFilter);

// Seed initial alerts
for (let i = 0; i < 4; i++) pushAlert();
clearUnread();

timerId = setInterval(pushAlert, 4000);`,
  seo: {
    title: 'Live Ops Alert Feed Panel — Free HTML CSS JS Snippet',
    description: 'Color-coded live alert feed with severity levels, unread badge, and filter control built with vanilla JS. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Live Ops Alert Feed Panel — Severity-Coded Alerts, Unread Badges & Calm-UI Urgency Signaling',
      description: `Operations dashboards, incident-response tools, and monitoring consoles all share a common interface problem: how do you surface a steady stream of system events — deploys, latency spikes, disk warnings, outright failures — without either drowning the user in noise or, worse, failing to draw their eye to something that actually needs attention right now? This snippet implements a live alert feed panel that answers that question using a **calm UI** approach: severity is communicated through color, iconography, and layout weight rather than motion, sound, or flashing. That distinction matters. Strobing or pulsing critical alerts might grab attention in a demo, but in a real operations environment running 12+ hours a day, flashing red elements are a documented accessibility problem (they can trigger photosensitive reactions and contribute to alert fatigue) and a documented UX problem (they train operators to tune out or physically cover the area, defeating the alert's purpose entirely).

**How severity is encoded without motion**

Each alert item carries one of three severity levels — \`info\`, \`warning\`, \`critical\` — expressed through a combination of a 3px \`border-left\` accent color, a tinted background (\`#eff6ff\` for info, \`#fffbeb\` for warning, \`#fef2f2\` for critical), a solid-colored circular icon badge, and an uppercase severity tag in the metadata row. Critical alerts use red (\`#ef4444\`) applied consistently across the border, icon, and tag, so the eye can scan the list and immediately locate the highest-priority item by color alone — a technique called pre-attentive processing. The only animation in the entire panel is a one-time 0.35s \`slideIn\` (opacity + \`translateY\`) applied when an alert is first inserted at the top of the list; once settled, nothing moves, blinks, or pulses. The small \`.live-dot\` next to the "Live" label uses a static green dot with a soft \`box-shadow\` ring rather than a pulsing animation, communicating "this feed is active" without any moving parts.

**Unread count and focus-based clearing**

New alerts arrive via a mock \`setInterval\` pulling randomly from a nine-item \`ALERT_POOL\` covering realistic ops scenarios: deploy confirmations, auto-scaling events, latency spikes, disk usage warnings, and payment webhook failures. Each new alert increments an \`unread\` counter rendered in \`.unread-badge\`, which is hidden by default via an \`.hidden\` class that combines \`opacity: 0\` and \`transform: scale(0.6)\` for a soft pop-in/out rather than an abrupt display toggle. The badge clears — resetting \`unread\` to zero and re-hiding — whenever the panel receives keyboard focus, is hovered, or its internal list is scrolled, mirroring how notification centers in modern OSes and chat apps (Slack, macOS Notification Center) clear unread counts on genuine user attention rather than requiring an explicit "mark all read" click.

**Severity filtering**

A single checkbox labeled "Warning + Critical only" lets operators suppress the (usually higher-volume, lower-urgency) info-level noise during an active incident, without losing those events from the underlying data — the filter only toggles \`display: none\` on matching DOM nodes via \`applyFilter()\`, so unfiltering instantly restores the full history. This models a real triage workflow: during normal operations, the full feed (including successful deploys and scaling events) is useful context; during an incident, operators want only what demands action.

**Why this belongs in a 2026 design system**

As more product teams build in-house observability and admin surfaces, the alert feed is one of the most frequently rebuilt dashboard primitives — and one of the most frequently over-designed. The restraint shown here (color and icon over motion, focus-based state clearing over manual dismissal, a genuine filter over a delete button) reflects where alerting UI patterns have converged: legible severity, minimal friction to acknowledge, and zero reliance on flashing or sound, which cannot be relied upon in shared-monitor or accessibility-constrained environments anyway.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch new alerts arrive', text: 'The panel seeds four alerts on load, then a setInterval calls pushAlert() every 4 seconds, picking a random entry from ALERT_POOL and prepending it to #feed-list with the slideIn animation.' },
        { title: 'Check the unread badge', text: 'Move your mouse away from the panel and wait — the .unread-badge counter increments for every new alert that arrives while the panel is unfocused. Hover, focus, or scroll the panel to clear it via clearUnread().' },
        { title: 'Filter to warning and critical', text: 'Check the "Warning + Critical only" checkbox to hide info-level entries via applyFilter(), which sets display: none on non-matching .alert-item elements without removing them from the alerts array.' },
        { title: 'Customize the alert pool', text: 'Edit the ALERT_POOL array in the JS panel to match your own system: replace the msg strings and sev values with real event types from your monitoring stack (Datadog, Grafana, PagerDuty).' },
        { title: 'Wire to a real event source', text: 'Replace the setInterval + Math.random() mock with a WebSocket or Server-Sent Events listener that calls pushAlert({ sev, msg }) whenever your backend emits a new event, keeping the render and unread logic unchanged.' },
        { title: 'Export and drop into your dashboard', text: 'Click JSX to get a React component version, or HTML for a standalone file. In a Next.js admin panel, mount AlertFeedPanel in a persistent sidebar or drawer so it stays live across route changes.' },
      ],
    },
    features: [
      'Three severity levels (info/warning/critical) encoded via border-left color, tinted background, and icon — no flashing or motion for critical',
      'setInterval-driven mock live feed pulling from a 9-item ALERT_POOL, capped at 30 visible items',
      'slideIn keyframe animation (opacity + translateY) on new alert insertion only — settled items are fully static',
      'Unread badge with pop-in/out transform: scale transition, clears automatically on focus, hover, or scroll',
      'Warning + Critical filter checkbox toggling display: none on info-level .alert-item nodes without losing data',
      'Static .live-dot indicator with box-shadow ring instead of a pulsing animation to signal an active feed calmly',
      'Roving DOM structure: alerts.unshift() plus feedList.prepend() keeps array and DOM in sync for the newest-first order',
      'Keyboard-focusable panel (tabindex="0") with visible focus-visible ring for accessibility',
    ],
    useCases: [
      { icon: 'APP', title: 'Internal ops dashboards and admin panels', desc: 'Any internal tool monitoring deploys, infrastructure health, or background jobs needs a compact way to surface events without a dedicated logging UI. Drop this panel into an admin sidebar and wire pushAlert() to your existing webhook or polling endpoint to get severity-coded event history with almost no additional design work.' },
      { icon: 'FLOW', title: 'Incident response and on-call consoles', desc: 'During an active incident, on-call engineers need to triage quickly. The Warning + Critical filter lets them hide routine deploy-success noise and focus on what is actionable, while the unread badge ensures nothing arriving mid-triage is silently missed once they look away from the screen.' },
      { icon: 'APP', title: 'SaaS status and monitoring product feeds', desc: 'Monitoring products like Datadog, Better Stack, and PagerDuty all use a variant of this severity-coded feed pattern in their live event streams. Building your own lightweight version teaches the underlying interaction model — colour-coded severity, non-disruptive insertion animation, focus-based unread clearing — before reaching for a heavier component library.' },
      { icon: 'DESIGN', title: 'Calm-UI reference implementation for alerting components', desc: 'Design systems increasingly specify that urgent states must be communicated without motion or sound by default, reserving those for genuinely time-critical, user-initiated contexts. This panel is a working reference for that principle: compare it against the [Toast Notification](/ui-snippets/toast-notification/) snippet to see the same restraint applied to a different alerting surface.' },
      { icon: 'LEARN', title: 'Teaching severity-based visual hierarchy', desc: 'Frontend workshops and onboarding docs can use this snippet to demonstrate how to encode three distinct urgency levels using only color, icon, and typography weight — a foundational skill for any dashboard, admin panel, or notification system a junior developer will eventually build.' },
      { icon: 'CODE', title: 'Prototyping before wiring a real WebSocket feed', desc: 'Product and engineering teams can use the mock ALERT_POOL and setInterval to demo alert-feed behaviour and gather stakeholder feedback on severity styling and unread-badge behaviour before the real-time backend event pipeline is ready.' },
      { icon: 'CODE', title: 'Related: Batch Operation Progress Panel — Per-Item Success/Fail Tracking', desc: 'See the [Batch Operation Progress Panel — Per-Item Success/Fail Tracking](/ui-snippets/batch-operation-progress-panel/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the critical alert not flash or pulse to grab attention?', a: 'Flashing UI elements are a known accessibility risk (photosensitive triggers) and tend to cause alert fatigue in always-on monitoring contexts, where operators learn to ignore or cover flashing regions. This snippet instead uses a static but high-contrast combination of red border, red icon, red tag, and tinted background so critical alerts are immediately distinguishable by color and position (top of the list) without relying on motion, which is the calm-UI approach recommended for long-running dashboards.' },
      { q: 'How do I connect this to a real backend instead of the mock interval?', a: 'Remove the setInterval(pushAlert, 4000) call and replace it with a WebSocket onmessage handler or an EventSource (SSE) listener. Parse the incoming payload into { sev, msg } shape and call pushAlert()-equivalent logic (unshift into the alerts array, prepend the rendered DOM node) for each real event. The rendering, unread-badge, and filter logic all work unchanged since they operate on the alerts array and DOM regardless of where the data originated.' },
      { q: 'How does the unread badge decide when to clear?', a: 'clearUnread() is wired to three events on the panel: focus (keyboard tab-in), mouseenter (mouse hover), and scroll on the inner .feed-list. Any of these signals genuine user attention on the panel, at which point unread resets to 0 and the badge hides via the .hidden class. This mirrors how Slack and native OS notification centers clear counts on attention rather than requiring an explicit dismiss action for every item.' },
      { q: 'Can I add more severity levels or change the color scheme?', a: 'Yes — add a new CSS block following the .alert-item.warning pattern (border-left-color, background tint, and .alert-icon background), then reference the new severity string in your ALERT_POOL entries and any incoming event payloads. The existing info/warning/critical convention maps to a fairly universal three-tier severity model, but a fourth tier like "success" (green) is a common addition for deploy-confirmation-heavy feeds.' },
      { q: 'Does the filter checkbox delete the hidden alerts?', a: 'No — applyFilter() only toggles the CSS display property on non-matching .alert-item DOM nodes; the underlying alerts array is untouched. Unchecking the filter immediately re-reveals every previously received alert in its original order, so no data is lost by filtering.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how pushAlert(), the unread badge, and applyFilter() interact — in particular, how the alerts array stays in sync with the DOM as items are added past the 30-item cap. It's a good snippet to extend with AI help: ask it to add a fourth "success" severity tier with its own color scheme, to replace the setInterval mock with a real WebSocket or Server-Sent Events connection while preserving the existing render logic, or to add per-item dismiss/acknowledge buttons that track acknowledged state separately from the read/unread badge. You can also ask it to review the calm-UI reasoning — why no flashing or sound is used for critical alerts — and to suggest an accessible alternative (like an aria-live region) for surfacing new critical alerts to screen reader users without a visual flash.`,
      prompt: `Build a live-updating alert feed panel in plain HTML, CSS, and JavaScript for an operations dashboard.

Requirements:
- Three severity levels (info, warning, critical), each visually distinct via a left border accent color, a tinted background, and a colored icon badge — no flashing, pulsing, or sound for any severity, including critical.
- A mock live feed using setInterval that periodically prepends a new alert (drawn from a small pool of realistic ops messages) to the top of the list with a one-time slide-and-fade entrance animation; cap the list at a reasonable max length and drop the oldest items past that cap.
- An unread count badge that increments for every alert added while the user is not actively attending to the panel, and clears automatically when the panel receives keyboard focus, mouse hover, or the internal list is scrolled — not via a manual "mark all read" button.
- A filter control (checkbox or toggle) that hides info-level alerts and shows only warning and critical, without deleting or losing the hidden items from the underlying data — unfiltering must restore the full list instantly.
- The panel container must be keyboard-focusable (tabindex) with a visible focus outline, and use appropriate ARIA labeling so it reads sensibly to assistive technology.
- Keep all severity styling driven by a small number of reusable CSS classes so a new severity tier can be added without restructuring the markup.`,
    },
  },
};
export default alertFeedPanel;
