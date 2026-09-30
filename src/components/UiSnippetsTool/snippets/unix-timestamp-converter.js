const unixTimestampConverter = {
  id: 'unix-timestamp-converter',
  title: 'Unix Timestamp Converter',
  category: 'dev',
  html: `<div class="wrap">
  <h2>Unix Timestamp Converter</h2>

  <div class="now-row">
    <span class="now-value" id="now-value">--</span>
    <button class="btn btn-ghost" id="btn-now">Use current time</button>
  </div>

  <div class="field">
    <label>Unix timestamp</label>
    <div class="ts-row">
      <input type="text" id="ts-input" spellcheck="false" placeholder="e.g. 1735689600" />
      <select id="unit-select">
        <option value="s">seconds</option>
        <option value="ms">milliseconds</option>
      </select>
    </div>
  </div>

  <div class="arrow">↕</div>

  <div class="field">
    <label>Human-readable date/time (local browser input)</label>
    <input type="datetime-local" id="date-input" step="1" />
  </div>

  <div class="error" id="error-msg"></div>

  <div class="results" id="results-grid"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 28px 20px; }

.wrap { max-width: 560px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 22px; }
h2 { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 14px; }

.now-row { display: flex; align-items: center; justify-content: space-between; background: #eef2ff; border-radius: 10px; padding: 10px 14px; margin-bottom: 18px; }
.now-value { font-family: "SF Mono", Consolas, monospace; font-size: 13px; color: #4338ca; font-weight: 700; }
.btn-ghost { font-size: 11.5px; font-weight: 700; color: #6366f1; background: none; border: 1.5px solid #c7d2fe; border-radius: 7px; padding: 6px 10px; cursor: pointer; }
.btn-ghost:hover { background: #6366f1; color: #fff; }

.field { margin-bottom: 4px; }
.field label { display: block; font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 6px; }
.ts-row { display: flex; gap: 8px; }
#ts-input { flex: 1; padding: 11px 13px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; color: #1e293b; }
#unit-select { padding: 11px 10px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-size: 12.5px; color: #475569; background: #fff; }
#date-input { width: 100%; padding: 11px 13px; border: 1.5px solid #e2e8f0; border-radius: 10px; font-family: "SF Mono", Consolas, monospace; font-size: 14px; color: #1e293b; }
input:focus, select:focus { outline: none; border-color: #6366f1; }

.arrow { text-align: center; font-size: 16px; color: #cbd5e1; margin: 10px 0; }

.error { color: #dc2626; font-size: 12.5px; margin-top: 8px; min-height: 16px; }

.results { display: flex; flex-direction: column; gap: 8px; margin-top: 12px; }
.res-row { display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #eef2f7; border-radius: 9px; padding: 9px 12px; }
.res-row .k { font-size: 11.5px; color: #64748b; font-weight: 600; }
.res-row .v { font-family: "SF Mono", Consolas, monospace; font-size: 12.5px; color: #1e293b; font-weight: 700; }`,
  js: `const tsInput = document.getElementById('ts-input');
const unitSelect = document.getElementById('unit-select');
const dateInput = document.getElementById('date-input');
const nowValue = document.getElementById('now-value');
const errorMsg = document.getElementById('error-msg');
const resultsGrid = document.getElementById('results-grid');

function pad(n) { return String(n).padStart(2, '0'); }

function toDatetimeLocalValue(date) {
  return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds());
}

function updateNow() {
  nowValue.textContent = 'Now: ' + Math.floor(Date.now() / 1000) + ' (seconds)';
}
updateNow();
setInterval(updateNow, 1000);

function renderResults(date) {
  const seconds = Math.floor(date.getTime() / 1000);
  const ms = date.getTime();
  const rows = [
    ['Unix (seconds)', String(seconds)],
    ['Unix (milliseconds)', String(ms)],
    ['ISO 8601 (UTC)', date.toISOString()],
    ['UTC string', date.toUTCString()],
    ['Local string', date.toString()],
    ['Relative', relativeTime(date)],
  ];
  resultsGrid.innerHTML = rows.map(([k, v]) =>
    '<div class="res-row"><span class="k">' + k + '</span><span class="v">' + v + '</span></div>'
  ).join('');
}

function relativeTime(date) {
  const diffMs = date.getTime() - Date.now();
  const diffSec = Math.round(diffMs / 1000);
  const abs = Math.abs(diffSec);
  const units = [
    ['year', 31536000], ['month', 2592000], ['day', 86400],
    ['hour', 3600], ['minute', 60], ['second', 1],
  ];
  for (const [name, secs] of units) {
    if (abs >= secs || name === 'second') {
      const value = Math.round(diffSec / secs);
      if (value === 0 && name !== 'second') continue;
      const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
      return rtf.format(value, name);
    }
  }
  return 'now';
}

function fromTimestamp() {
  errorMsg.textContent = '';
  const raw = tsInput.value.trim();
  if (!raw) { resultsGrid.innerHTML = ''; return; }
  const num = Number(raw);
  if (!Number.isFinite(num)) {
    errorMsg.textContent = 'Enter a valid numeric timestamp.';
    return;
  }
  const ms = unitSelect.value === 's' ? num * 1000 : num;
  const date = new Date(ms);
  if (isNaN(date.getTime())) {
    errorMsg.textContent = 'That value is out of range for a valid date.';
    return;
  }
  dateInput.value = toDatetimeLocalValue(date);
  renderResults(date);
}

function fromDate() {
  errorMsg.textContent = '';
  if (!dateInput.value) { resultsGrid.innerHTML = ''; return; }
  const date = new Date(dateInput.value);
  if (isNaN(date.getTime())) {
    errorMsg.textContent = 'Invalid date/time.';
    return;
  }
  tsInput.value = unitSelect.value === 's' ? Math.floor(date.getTime() / 1000) : date.getTime();
  renderResults(date);
}

tsInput.addEventListener('input', fromTimestamp);
unitSelect.addEventListener('change', () => {
  if (tsInput.value) fromTimestamp();
});
dateInput.addEventListener('input', fromDate);

document.getElementById('btn-now').addEventListener('click', () => {
  const now = new Date();
  tsInput.value = unitSelect.value === 's' ? Math.floor(now.getTime() / 1000) : now.getTime();
  fromTimestamp();
});

document.getElementById('btn-now').click();`,

  seo: {
    title: 'Unix Timestamp Converter — Free HTML CSS JS Snippet',
    description: 'Convert between Unix epoch timestamps and human-readable dates both ways, with ISO 8601, UTC, local time and relative time output using Intl.RelativeTimeFormat. Exports to React & Vue.',
    about: {
      title: 'Unix Timestamp Converter — Bidirectional Epoch-to-Date Conversion with Relative Time via Intl.RelativeTimeFormat',
      description: `A Unix timestamp counts seconds (or, in many JavaScript APIs, milliseconds) since 00:00:00 UTC on January 1, 1970 — the "epoch." It's the backbone of how most systems store and compare points in time internally, but it's meaningless to read at a glance, which is why converting a log line's or a JWT's \`exp\` claim's timestamp into an actual date is one of the most common small tasks a developer does in a day.

**Seconds versus milliseconds — the single most common bug**

JavaScript's own \`Date\` object and \`Date.now()\` work in milliseconds, but the Unix timestamp standard (and most backend languages' native epoch functions) work in seconds. Mixing the two up produces a date either 1970-ish (treating a seconds value as milliseconds gives a date near the epoch) or thousands of years in the future (treating a milliseconds value as seconds). This converter makes the unit an explicit, visible choice via the \`unit-select\` dropdown rather than guessing — \`fromTimestamp()\` multiplies by 1000 only when \`seconds\` is selected, so the ambiguity that causes this bug in real code is impossible to hide here.

**Two-way binding without a feedback loop**

The timestamp field and the browser-native \`datetime-local\` input both update the *other* field on input, which risks an infinite update loop if implemented naively (input A changes, updates B, which fires B's input handler, which updates A, forever). This snippet avoids that by keeping each direction as a fully separate function — \`fromTimestamp()\` parses the numeric field and writes into \`dateInput.value\` via imperative assignment (which does not fire a synthetic \`input\` event in real browsers), and \`fromDate()\` does the reverse. Each field's own listener only ever triggers a write to the *other* field, never back to itself, which is what keeps the pair in sync without recursion.

**Relative time via the built-in Intl API**

Rather than hand-writing "3 hours ago" / "in 2 days" string logic — which inevitably accumulates edge cases around pluralization and unit boundaries — \`relativeTime()\` uses \`Intl.RelativeTimeFormat\`, a standard built into every modern browser specifically for this. It walks a list of unit thresholds from year down to second, picks the largest unit where the elapsed time is at least one full unit, and hands the rounded value to \`rtf.format(value, unit)\`, which handles the "ago" vs. "in" phrasing, pluralization, and locale formatting automatically based on the sign of \`value\`.

**Six simultaneous output formats**

Once a valid date is established from either input, \`renderResults()\` derives six representations from the same underlying \`Date\` object: raw seconds, raw milliseconds, \`toISOString()\` (always UTC, the format most APIs expect in request bodies), \`toUTCString()\` (the RFC 7231 format used in HTTP headers like \`Date\` and \`Expires\`), \`toString()\` (formatted in the browser's local timezone, useful for sanity-checking what a timestamp means to the person actually looking at the page), and the \`Intl.RelativeTimeFormat\` relative string. Seeing all six side by side from one input is deliberately the point — it eliminates having to convert a value five separate times to check it against five different systems' expected formats.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste a Unix timestamp', text: 'Type or paste a numeric epoch value into the timestamp field, and choose whether it\'s in seconds or milliseconds using the dropdown.' },
        { title: 'Or pick a date and time directly', text: 'Use the datetime-local field to select a date/time using your browser\'s native picker — the timestamp field updates automatically to match.' },
        { title: 'Click "Use current time"', text: 'Instantly loads the current moment into both fields as a quick starting point or sanity check.' },
        { title: 'Read all six derived formats', text: 'Seconds, milliseconds, ISO 8601 UTC, RFC UTC string, local time string, and a human relative phrase like "3 hours ago" all update together.' },
        { title: 'Switch the unit dropdown', text: 'Toggling between seconds and milliseconds reinterprets whatever numeric value is currently in the timestamp field.' },
        { title: 'Watch the live "Now" ticker', text: 'The banner at the top shows the current Unix timestamp in seconds, updating every second, as a quick reference for "what time is it right now" in epoch form.' },
      ],
    },
    features: [
      'Explicit seconds-vs-milliseconds unit toggle, eliminating the most common Unix timestamp conversion bug',
      'Bidirectional conversion: edit the timestamp or the native datetime-local picker, both stay in sync',
      'Six simultaneous derived formats: epoch seconds, epoch milliseconds, ISO 8601 UTC, RFC UTC string, local string, relative time',
      'Human-readable relative time ("in 3 hours", "2 days ago") via the built-in Intl.RelativeTimeFormat API, no manual string logic',
      'Live "current time" banner updating every second via setInterval',
      'One-click "Use current time" button populates both input fields instantly',
      'Inline validation for non-numeric timestamps and out-of-range dates',
      'Uses the browser\'s native datetime-local input, so date entry respects the user\'s OS locale and format preferences',
    ],
    useCases: [
      { icon: 'CODE', title: 'Debugging log timestamps and JWT expiry claims', desc: 'Paste an epoch value straight from a server log line or a decoded [JWT\'s exp/iat claim](/ui-snippets/jwt-decoder/) to instantly see what date and time it actually represents.' },
      { icon: 'FLOW', title: 'Constructing API request payloads', desc: 'Pick a target date and time with the native picker, then copy the ISO 8601 or epoch-seconds output directly into an API request body that expects a specific timestamp format.' },
      { icon: 'DASH', title: 'Scheduling and cron job verification', desc: 'Confirm that a scheduled job\'s stored epoch timestamp lines up with the intended local wall-clock time before it fires in production.' },
      { icon: 'LEARN', title: 'Teaching how Unix time and Intl.RelativeTimeFormat work', desc: 'Demonstrate the seconds/milliseconds pitfall live by flipping the unit dropdown on the same numeric value and watching the resulting date jump by orders of magnitude.' },
      { icon: 'APP', title: 'QA verification of date-sensitive features', desc: 'Cross-check a database\'s stored epoch value against the UI\'s displayed relative time ("3 days ago") to catch timezone or unit-conversion bugs before release.' },
      { icon: 'CODE', title: 'Related: Regex Tester & Match Visualizer', desc: 'See the [Regex Tester & Match Visualizer](/ui-snippets/regex-tester/) for a related dev pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is the difference between a Unix timestamp in seconds and in milliseconds?', a: 'Both count elapsed time since the Unix epoch (00:00:00 UTC, January 1 1970), but seconds-based timestamps are the traditional Unix/POSIX standard used by most backend languages, while JavaScript\'s Date.now() and new Date() work in milliseconds. Treating a seconds value as milliseconds (or vice versa) produces a date off by a factor of 1000, which is why this tool makes the unit an explicit dropdown rather than guessing.' },
      { q: 'Why does the tool use Intl.RelativeTimeFormat instead of writing its own "time ago" function?', a: 'Intl.RelativeTimeFormat is a standard, built-in browser API specifically designed for this: it correctly handles singular/plural phrasing, locale-appropriate wording, and the "ago" versus "in" distinction based on whether the value is negative or positive, without any hand-written string-concatenation logic that would need constant edge-case patching.' },
      { q: 'How does editing one field update the other without causing an infinite loop?', a: 'Each input field has its own event listener that only writes into the other field, never back into itself. Programmatically setting an input\'s .value property in JavaScript does not fire that same element\'s own input event, so there\'s no risk of the two fields triggering each other repeatedly.' },
      { q: 'What timezone is the ISO 8601 and UTC output in versus the "Local string" output?', a: 'toISOString() and toUTCString() always output UTC regardless of the browser\'s configured timezone — this is required for ISO 8601 and is the convention for the UTCString/RFC 7231 HTTP date format. The "Local string" row uses toString(), which formats the same underlying moment in the browser\'s own local timezone, useful for sanity-checking what a timestamp means to the person actually viewing the page.' },
      { q: 'What happens if I type a timestamp far outside a reasonable date range?', a: 'Extremely large or invalid numeric values that JavaScript\'s Date constructor cannot represent produce an "Invalid Date" internally, which the tool detects with isNaN(date.getTime()) and reports as an out-of-range error instead of silently displaying garbage output.' },
    ],
    aiPrompt: {
      paragraph: `Give this snippet's JavaScript to an AI assistant like Claude and ask it to explain exactly why the two-way binding between the timestamp field and the datetime-local field doesn't create an infinite update loop — the answer hinges on how programmatic .value assignment differs from user-driven input events, and it's a pattern worth understanding for any bidirectional form sync. It's also easy to extend: ask for a timezone-selector dropdown so the "Local string" output can show a timezone other than the browser's own, a batch mode that converts a pasted list of timestamps at once, or a countdown display for a future timestamp.`,
      prompt: `Build a bidirectional Unix timestamp converter in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A text input for a numeric Unix timestamp, with a dropdown to explicitly choose whether it represents seconds or milliseconds since the epoch (do not guess the unit from the magnitude of the number).
- A native <input type="datetime-local"> field that stays in sync with the timestamp field in both directions: editing the timestamp updates the date picker, and editing the date picker updates the timestamp, without creating an infinite update loop between the two.
- Derive and display simultaneously from the current value: the epoch value in both seconds and milliseconds, an ISO 8601 UTC string, an RFC-style UTC string (like the HTTP Date header format), the browser's local-timezone string representation, and a human-readable relative time string (e.g. "3 hours ago" or "in 2 days") generated using the built-in Intl.RelativeTimeFormat API rather than hand-written string logic.
- Add a "Use current time" button that populates both the timestamp and date fields with the current moment.
- Show a live banner with the current Unix timestamp in seconds, updating once per second.
- Validate numeric input and out-of-range dates with a clear inline error message rather than displaying "Invalid Date" or NaN anywhere in the UI.`,
    },
  },
};

export default unixTimestampConverter;
