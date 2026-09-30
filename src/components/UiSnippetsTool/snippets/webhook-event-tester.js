const webhookEventTester = {
  id: 'webhook-event-tester',
  title: 'Webhook Event Tester',
  lastmod: '2026-08-22',
  category: 'dashboards',
  html: `<div class="wet-card">
  <div class="wet-head">
    <h3>Webhook tester</h3>
    <span class="wet-endpoint">POST https://api.example.com/webhooks/test</span>
  </div>

  <div class="wet-controls">
    <label class="wet-label" for="wetEvent">Event type</label>
    <select id="wetEvent" class="wet-select">
      <option value="user.created">user.created</option>
      <option value="payment.succeeded">payment.succeeded</option>
      <option value="payment.failed">payment.failed</option>
      <option value="subscription.cancelled">subscription.cancelled</option>
    </select>
  </div>

  <div class="wet-preview">
    <div class="wet-preview-head">Payload preview</div>
    <pre id="wetPayload" class="wet-json"></pre>
  </div>

  <button type="button" class="wet-send" id="wetSend">Send test event</button>

  <div class="wet-log">
    <div class="wet-log-head">Recent sends</div>
    <div class="wet-log-list" id="wetLogList">
      <div class="wet-empty" id="wetEmpty">No test events sent yet.</div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d15;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.wet-card{background:#0f1420;border:1px solid #1e2536;border-radius:16px;padding:20px;width:100%;max-width:460px;box-shadow:0 20px 50px rgba(0,0,0,.5)}
.wet-head{margin-bottom:16px}
.wet-head h3{font-size:15px;font-weight:800;color:#f1f5f9;margin-bottom:4px}
.wet-endpoint{font-size:10.5px;color:#5b6884;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;word-break:break-all}

.wet-label{display:block;font-size:11px;font-weight:700;color:#8a94ab;text-transform:uppercase;letter-spacing:.04em;margin-bottom:6px}
.wet-select{width:100%;background:#161d2e;border:1px solid #232b40;border-radius:9px;padding:10px 12px;font-size:13px;color:#e2e8f0;font-family:inherit;cursor:pointer;margin-bottom:16px}

.wet-preview{margin-bottom:14px}
.wet-preview-head{font-size:11px;font-weight:700;color:#8a94ab;text-transform:uppercase;letter-spacing:.04em;margin-bottom:7px}
.wet-json{background:#080b12;border:1px solid #1a2130;border-radius:10px;padding:12px 14px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;line-height:1.6;color:#a5b4fc;overflow-x:auto;white-space:pre}

.wet-send{width:100%;background:#6366f1;color:#fff;border:none;border-radius:9px;padding:11px;font-size:13px;font-weight:700;cursor:pointer;transition:background .15s;margin-bottom:18px}
.wet-send:hover{background:#4f46e5}
.wet-send:disabled{opacity:.6;cursor:default}

.wet-log{border-top:1px solid #1a2130;padding-top:14px}
.wet-log-head{font-size:11px;font-weight:700;color:#8a94ab;text-transform:uppercase;letter-spacing:.04em;margin-bottom:9px}
.wet-log-list{display:flex;flex-direction:column;gap:7px;max-height:180px;overflow-y:auto}
.wet-empty{font-size:12px;color:#4b5675;padding:8px 0}
.wet-entry{display:flex;align-items:center;justify-content:space-between;gap:10px;background:#12172400;padding:8px 10px;border-radius:8px;background:#111726;border:1px solid #1a2130;font-size:12px}
.wet-entry-left{display:flex;align-items:center;gap:9px;min-width:0}
.wet-status{font-size:10.5px;font-weight:800;padding:2px 8px;border-radius:6px;flex-shrink:0;font-family:ui-monospace,SFMono-Regular,Menlo,monospace}
.wet-status.s2xx{background:rgba(52,211,153,.14);color:#34d399}
.wet-status.s4xx{background:rgba(251,191,36,.14);color:#fbbf24}
.wet-status.s5xx{background:rgba(248,113,113,.16);color:#f87171}
.wet-entry-event{color:#cbd5e1;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.wet-entry-time{color:#5b6884;font-size:10.5px;flex-shrink:0;font-variant-numeric:tabular-nums}`,

  js: `var PAYLOADS = {
  'user.created': { event: 'user.created', data: { id: 'usr_8f2a', email: 'ada@example.com', plan: 'free' } },
  'payment.succeeded': { event: 'payment.succeeded', data: { id: 'pay_9c31', amount: 2900, currency: 'usd' } },
  'payment.failed': { event: 'payment.failed', data: { id: 'pay_7b04', amount: 2900, reason: 'card_declined' } },
  'subscription.cancelled': { event: 'subscription.cancelled', data: { id: 'sub_1e77', reason: 'user_requested' } },
};

var POSSIBLE_CODES = [
  { code: 200, tier: 's2xx' },
  { code: 201, tier: 's2xx' },
  { code: 400, tier: 's4xx' },
  { code: 404, tier: 's4xx' },
  { code: 500, tier: 's5xx' },
  { code: 503, tier: 's5xx' },
];

var selectEl = document.getElementById('wetEvent');
var payloadEl = document.getElementById('wetPayload');
var sendBtn = document.getElementById('wetSend');
var logList = document.getElementById('wetLogList');
var emptyEl = document.getElementById('wetEmpty');

function updatePreview() {
  var payload = PAYLOADS[selectEl.value];
  payloadEl.textContent = JSON.stringify(payload, null, 2);
}

function timeLabel() {
  var d = new Date();
  var h = d.getHours() % 12 || 12;
  var m = String(d.getMinutes()).padStart(2, '0');
  var s = String(d.getSeconds()).padStart(2, '0');
  return h + ':' + m + ':' + s + (d.getHours() >= 12 ? ' PM' : ' AM');
}

function addLogEntry(eventName, status) {
  if (emptyEl) { emptyEl.remove(); }
  var entry = document.createElement('div');
  entry.className = 'wet-entry';
  entry.innerHTML =
    '<span class="wet-entry-left">' +
      '<span class="wet-status ' + status.tier + '">' + status.code + '</span>' +
      '<span class="wet-entry-event">' + eventName + '</span>' +
    '</span>' +
    '<span class="wet-entry-time">' + timeLabel() + '</span>';
  logList.insertBefore(entry, logList.firstChild);

  // Keep the log to a reasonable length.
  var entries = logList.querySelectorAll('.wet-entry');
  if (entries.length > 6) entries[entries.length - 1].remove();
}

selectEl.addEventListener('change', updatePreview);

sendBtn.addEventListener('click', function () {
  var eventName = selectEl.value;
  sendBtn.disabled = true;
  sendBtn.textContent = 'Sending\\u2026';
  setTimeout(function () {
    // Simulate a response — mostly successful, occasionally an error, to show every status color.
    var roll = Math.random();
    var status = roll < 0.7 ? POSSIBLE_CODES[Math.floor(Math.random() * 2)]
      : roll < 0.9 ? POSSIBLE_CODES[2 + Math.floor(Math.random() * 2)]
      : POSSIBLE_CODES[4 + Math.floor(Math.random() * 2)];
    addLogEntry(eventName, status);
    sendBtn.disabled = false;
    sendBtn.textContent = 'Send test event';
  }, 550);
});

updatePreview();`,

  seo: {
    title: 'Webhook Event Tester — Free Developer Test Event UI Snippet',
    description: `A developer tool UI for picking an event type, previewing its generated JSON payload, sending a test event, and reviewing a color-coded status log. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Webhook Event Tester — Payload Preview, Send Button, and a Color-Coded Log',
      description: `Every platform with webhooks needs a way for developers to test their endpoint without waiting for a real event to occur — pick an event type, see exactly what payload will be sent, fire it off, and see how the endpoint responded. This snippet builds that developer tool UI in plain HTML, CSS, and vanilla JavaScript: an event picker, a live JSON payload preview, a send button, and a scrolling log of past test sends with color-coded status codes.

**Payload preview that updates live**

Selecting a different event type in the dropdown immediately swaps the JSON preview below it, generated from a \`PAYLOADS\` lookup keyed by event name and rendered with \`JSON.stringify(payload, null, 2)\` for readable indentation. A developer can see exactly what their endpoint will receive before committing to a send — no guessing, no separate documentation lookup.

**A log that reads like a real request history**

Every send prepends a new entry to the log rather than appending, so the most recent test is always at the top, matching how request logs conventionally read. Each entry shows the status code in a colored pill (green for 2xx, amber for 4xx, red for 5xx — the same convention used across this library's [log viewer stream](/ui-snippets/log-viewer-stream/)), the event name, and a timestamp, with the log capped to a handful of visible entries so it doesn't grow unbounded.

**Simulated but realistic response distribution**

The demo's send handler doesn't call a real endpoint — it randomly picks a status code weighted toward success (2xx most often, 4xx occasionally, 5xx rarely), which mirrors the actual distribution a healthy webhook integration should see, while still surfacing every color state for the demo. A real integration would replace this with the actual HTTP response from the developer's endpoint.

**Where this fits in a developer product**

Place it in an API dashboard next to a [rate limit status panel](/ui-snippets/rate-limit-status-panel/) so developers can both test event delivery and monitor their remaining quota, or next to an [API key manager](/ui-snippets/api-key-manager/) as part of a broader developer console.

**Customizing it**

Wire the send button to an actual \`fetch\` call against the developer's configured endpoint URL, add a response body/headers viewer per log entry, or let developers edit the payload JSON directly before sending a custom test event.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A webhook tester card renders with a user.created payload preview.` },
      { title: 'Change the event type', text: `The JSON preview updates immediately to match the selected event.` },
      { title: 'Click Send test event', text: `After a brief delay, a color-coded log entry appears at the top of the list.` },
      { title: 'Read the status colors', text: `Green is 2xx success, amber is 4xx client error, red is 5xx server error.` },
      { title: 'Send several events', text: `The log keeps the most recent entries, dropping the oldest past six.` },
      { title: 'Wire up a real endpoint', text: `Replace the simulated response with an actual fetch call to the developer's endpoint URL.` },
    ] },
    features: [
      { title: 'Event-type payload preview', text: `Selecting an event immediately swaps the displayed JSON payload.` },
      { title: 'Formatted JSON output', text: `JSON.stringify with indentation keeps the payload readable.` },
      { title: 'Color-coded status log', text: `2xx, 4xx, and 5xx responses each get a distinct status pill color.` },
      { title: 'Most-recent-first log order', text: `New sends prepend to the top, matching real request log conventions.` },
      { title: 'Capped log length', text: `Older entries drop off once the log exceeds a handful of items.` },
      { title: 'Realistic response distribution', text: `Simulated sends weight toward success, matching a healthy integration.` },
      { title: 'Loading state on send', text: `The send button disables and relabels while a test is in flight.` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'API developer dashboards', text: `Let developers test integrations next to a [rate limit status panel](/ui-snippets/rate-limit-status-panel/).` },
      { title: 'Webhook management consoles', text: `Verify endpoint configuration before going live.` },
      { title: 'Platform onboarding flows', text: `Help new developers confirm their webhook receiver works.` },
      { title: 'Internal QA tooling', text: `Trigger representative test events during integration testing.` },
      { title: 'API key and credentials pages', text: `Pair with an [API key manager](/ui-snippets/api-key-manager/) for a complete developer console.` },
      { title: 'Support and debugging tools', text: `Reproduce a specific event type to help diagnose a customer's issue.` },
    ],
    faqs: [
      { q: 'How does the payload preview stay in sync with the selected event?', a: `The select element's change event calls updatePreview(), which looks up the chosen event name in the PAYLOADS object and re-renders it with JSON.stringify(payload, null, 2). There's no separate state to keep synchronized — the preview is always a direct read of the currently selected value.` },
      { q: 'Why do new log entries appear at the top instead of the bottom?', a: `Request and event logs are conventionally read most-recent-first, since that's the entry a developer usually cares about right after clicking send. insertBefore(entry, logList.firstChild) prepends each new entry, and older entries beyond a small cap are removed so the list stays scannable.` },
      { q: 'How do I make Send test event hit a real webhook endpoint?', a: `Replace the setTimeout-based simulation in the click handler with an actual fetch(endpointUrl, { method: 'POST', body: JSON.stringify(payload) }) call, read the real response.status, map it into the same s2xx/s4xx/s5xx tier used for the status pill color, and call addLogEntry with that real result.` },
      { q: 'How do I add more event types?', a: `Add a new option to the select element and a matching key in the PAYLOADS object with a representative example payload for that event. No other code changes are required — the preview and send logic both read from the same selected value.` },
      { q: 'How do I use this webhook tester in React, Vue, or Angular?', a: `Track the selected event and the log entries array as component state, derive the JSON preview from the selected event with a computed value, and append new entries to the front of the log array on send (using your framework's real fetch call instead of the simulated timeout). The status-tier mapping is a small pure function that ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the payload-preview and log-ordering logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how updatePreview() keeps the JSON display in sync with the select element purely by reading its current value, and why new log entries are inserted at the front of the list rather than appended to the end. The same assistant can help optimize it — ask whether the log should persist to localStorage so test history survives a page reload, or whether a very active testing session should paginate rather than cap the log at a fixed count. It's also useful for extending the tool: ask it to add a raw response body/headers viewer per log entry, let developers edit the payload JSON before sending a custom event, or wire the send button to a real fetch call against a configurable endpoint URL with proper error handling. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "webhook event tester" developer tool UI in plain HTML, CSS, and JavaScript with no framework or library.

Requirements:
- A dropdown to pick a webhook event type (e.g. user.created, payment.succeeded, payment.failed, subscription.cancelled), where selecting an option immediately updates a below JSON payload preview to show a representative example payload for that specific event, pulled from a JavaScript lookup object keyed by event name and formatted with readable indentation.
- A "Send test event" button that, on click, disables itself and shows a brief loading label, then after a short simulated delay adds a new entry to a log list.
- The log must insert new entries at the top of the list (most recent first, matching how request logs are conventionally read), cap the visible list to a small fixed number of entries by removing the oldest once the cap is exceeded, and show an empty-state message when no events have been sent yet.
- Each log entry must show a color-coded HTTP status code pill (green for 2xx, amber for 4xx, red for 5xx), the event name that was sent, and a timestamp.
- The simulated response in this demo should weight its randomly chosen status code toward success (2xx most of the time) with occasional 4xx and rare 5xx results, so the log shows a realistic distribution while still demonstrating every status color.
- Use a dark, developer-console-style theme with monospace font for the JSON preview, status codes, and endpoint label, and system-ui font elsewhere.`,
    },
  },
};

export default webhookEventTester;
