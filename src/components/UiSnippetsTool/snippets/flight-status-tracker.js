const flightStatusTracker = {
  id: 'flight-status-tracker',
  title: 'Flight Status Tracker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="fst-card" id="fstCard">
  <div class="fst-top">
    <span class="fst-flight">DL 1420</span>
    <span class="fst-pill" id="fstPill">On Time</span>
  </div>
  <div class="fst-route">
    <div class="fst-endpoint">
      <span class="fst-code">SFO</span>
      <span class="fst-city">San Francisco</span>
    </div>
    <div class="fst-line">
      <span class="fst-dot"></span>
      <svg class="fst-plane" viewBox="0 0 24 24" fill="none" id="fstPlane"><path d="M2 12h4l3-3h2l-2 3h5l3-4h2l-2 4h1a2 2 0 0 1 0 4h-1l2 4h-2l-3-4H9l2 3H9l-3-3H2v-4z" fill="currentColor"/></svg>
      <span class="fst-dot"></span>
    </div>
    <div class="fst-endpoint fst-endpoint-right">
      <span class="fst-code">JFK</span>
      <span class="fst-city">New York</span>
    </div>
  </div>
  <div class="fst-times">
    <div class="fst-time-col">
      <span class="fst-time-label">Departure</span>
      <span class="fst-time-sched">6:45 AM</span>
      <span class="fst-time-actual" id="fstDepActual">6:45 AM</span>
    </div>
    <div class="fst-time-col fst-time-col-right">
      <span class="fst-time-label">Arrival</span>
      <span class="fst-time-sched">3:10 PM</span>
      <span class="fst-time-actual" id="fstArrActual">3:10 PM</span>
    </div>
  </div>
  <div class="fst-meta">
    <div class="fst-meta-item">
      <span class="fst-meta-label">Terminal</span>
      <span class="fst-meta-value">2</span>
    </div>
    <div class="fst-meta-item">
      <span class="fst-meta-label">Gate</span>
      <span class="fst-meta-value" id="fstGate">D14</span>
    </div>
    <div class="fst-meta-item">
      <span class="fst-meta-label">Seat</span>
      <span class="fst-meta-value">14C</span>
    </div>
  </div>
  <div class="fst-controls">
    <button type="button" class="fst-btn" data-status="on-time">On Time</button>
    <button type="button" class="fst-btn" data-status="delayed">Delayed</button>
    <button type="button" class="fst-btn" data-status="boarding">Boarding</button>
    <button type="button" class="fst-btn" data-status="departed">Departed</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d14;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.fst-card{width:100%;max-width:420px;background:linear-gradient(165deg,#151a28,#0f1220);border:1px solid #232a3d;border-radius:20px;padding:22px;transition:border-color .35s ease}
.fst-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.fst-flight{font-size:13px;font-weight:700;letter-spacing:.06em;color:#9aa0b8}
.fst-pill{font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;background:#123a2a;color:#4ade80;transition:background .35s ease,color .35s ease}
.fst-card[data-status="delayed"] .fst-pill{background:#3a1f14;color:#fb923c}
.fst-card[data-status="boarding"] .fst-pill{background:#1c2f4a;color:#60a5fa}
.fst-card[data-status="departed"] .fst-pill{background:#232a3d;color:#9aa0b8}
.fst-card[data-status="delayed"]{border-color:#5c3a1f}
.fst-card[data-status="boarding"]{border-color:#2c4a78}
.fst-route{display:flex;align-items:center;gap:10px;margin-bottom:20px}
.fst-endpoint{display:flex;flex-direction:column;gap:2px}
.fst-endpoint-right{align-items:flex-end;text-align:right}
.fst-code{font-size:26px;font-weight:800;letter-spacing:-.02em}
.fst-city{font-size:12px;color:#697089}
.fst-line{flex:1;display:flex;align-items:center;gap:6px;color:#4b5468;position:relative}
.fst-line::before{content:'';position:absolute;left:8px;right:8px;top:50%;height:1px;background:#2a3145;transform:translateY(-50%)}
.fst-dot{width:6px;height:6px;border-radius:50%;background:#4b5468;z-index:1}
.fst-plane{width:20px;height:20px;flex-shrink:0;z-index:1;background:#0b0d14;color:#818cf8;transition:transform .4s ease}
.fst-card[data-status="departed"] .fst-plane{transform:translateX(6px) rotate(0deg)}
.fst-times{display:flex;justify-content:space-between;border-top:1px solid #232a3d;border-bottom:1px solid #232a3d;padding:14px 0;margin-bottom:16px}
.fst-time-col{display:flex;flex-direction:column;gap:3px}
.fst-time-col-right{align-items:flex-end;text-align:right}
.fst-time-label{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#697089}
.fst-time-sched{font-size:14px;color:#697089;text-decoration:none}
.fst-card[data-status="delayed"] .fst-time-sched{text-decoration:line-through}
.fst-time-actual{font-size:18px;font-weight:700}
.fst-card[data-status="delayed"] #fstDepActual,.fst-card[data-status="delayed"] #fstArrActual{color:#fb923c}
.fst-meta{display:flex;justify-content:space-between;margin-bottom:18px}
.fst-meta-item{display:flex;flex-direction:column;gap:3px;align-items:center}
.fst-meta-label{font-size:11px;color:#697089}
.fst-meta-value{font-size:15px;font-weight:700}
.fst-controls{display:flex;gap:6px}
.fst-btn{flex:1;padding:8px 4px;border-radius:10px;border:1px solid #232a3d;background:#151a28;color:#9aa0b8;font-size:11px;font-weight:600;cursor:pointer;transition:all .2s ease}
.fst-btn:hover{border-color:#3a4258;color:#fff}
.fst-btn[aria-pressed="true"]{background:#232a3d;color:#fff;border-color:#4b5468}`,

  js: `const card = document.getElementById('fstCard');
const pill = document.getElementById('fstPill');
const gate = document.getElementById('fstGate');
const depActual = document.getElementById('fstDepActual');
const arrActual = document.getElementById('fstArrActual');
const buttons = document.querySelectorAll('.fst-btn');

const statusConfig = {
  'on-time': { label: 'On Time', dep: '6:45 AM', arr: '3:10 PM', gate: 'D14' },
  'delayed': { label: 'Delayed', dep: '7:35 AM', arr: '4:00 PM', gate: 'D14' },
  'boarding': { label: 'Boarding', dep: '6:45 AM', arr: '3:10 PM', gate: 'D22' },
  'departed': { label: 'Departed', dep: '6:45 AM', arr: '3:10 PM', gate: 'D22' },
};

function setStatus(status) {
  const config = statusConfig[status];
  if (!config) return;
  card.dataset.status = status;
  pill.textContent = config.label;
  gate.textContent = config.gate;
  depActual.textContent = config.dep;
  arrActual.textContent = config.arr;
  buttons.forEach((btn) => {
    btn.setAttribute('aria-pressed', btn.dataset.status === status ? 'true' : 'false');
  });
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => setStatus(btn.dataset.status));
});

setStatus('on-time');`,

  seo: {
    title: 'Flight Status Tracker — Free Live Status Card Snippet',
    description: `A flight status card with route line, scheduled vs actual times, gate/terminal, and a status pill that recolors for On Time, Delayed, Boarding, and Departed. Plain HTML, CSS & JS.`,
    about: {
      title: 'Flight Status Tracker — A Status Card That Recolors With the Flight',
      description: `The flight status tracker is the compact card airlines and trip-planning apps use to show a single flight's health at a glance — origin and destination, a route line with a plane glyph, scheduled vs. actual times, and a status pill that changes color as the flight moves through its lifecycle. This snippet builds the whole thing in plain HTML, CSS, and JavaScript, no dependencies.

**One data-status attribute drives everything**

The card's outer element carries a \`data-status\` attribute — \`on-time\`, \`delayed\`, \`boarding\`, or \`departed\` — and every color change in the CSS is a \`[data-status="..."]\` selector keyed off that single source of truth. The JavaScript's \`setStatus()\` function just swaps the attribute and updates a handful of text nodes; there's no class-list juggling or inline style writes scattered through the script.

**Scheduled vs. actual times**

Each time column shows a struck-through scheduled time alongside a bold actual time. When the status flips to Delayed, the scheduled time gets a \`text-decoration: line-through\` and the actual time recolors to orange — a pattern lifted directly from real airline apps, where the delta between scheduled and actual is the whole point of the widget.

**Route line with a plane glyph**

Between the two airport codes sits a thin line with two dots and an inline SVG plane icon in the middle. It's built with a pseudo-element line and flex layout rather than an image, so it recolors and repositions with pure CSS — the plane even nudges forward when the flight departs, hinting at motion without a real animation loop.

**Gate and terminal that change with status**

Gate assignments often change close to boarding, so this card lets the gate value update independently of the status pill's color — moving from D14 to D22 when boarding starts, a detail that mirrors how airport displays actually behave.

**Fully self-contained state**

No external state library, no CDN. Four buttons at the bottom simulate an airline's push updates for demo purposes; in production you'd call \`setStatus()\` from your own polling or websocket handler instead of a click listener.

**Customizing it**

Add a baggage claim field, wire in real flight data from an aviation API, or swap the pill copy for delay-reason text. Pair it with a [boarding pass](/ui-snippets/boarding-pass/), a [seat picker](/ui-snippets/seat-picker/), or a [flight search form](/ui-snippets/flight-search-form/) upstream.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A route card with times, gate, and status pill renders.` },
      { title: 'Click the status buttons', text: `The pill, times, and gate update together.` },
      { title: 'Watch Delayed strike the schedule', text: `Scheduled time gets struck through, actual time recolors.` },
      { title: 'Wire real data', text: `Call setStatus() from your polling or websocket handler.` },
      { title: 'Restyle the route line', text: `Adjust the line, dots, and plane glyph in CSS.` },
      { title: 'Add fields', text: `Extend the meta row with baggage claim or aircraft type.` },
    ] },
    features: [
      { title: 'Single status attribute', text: `data-status drives every color change.` },
      { title: 'Scheduled vs actual', text: `Struck-through schedule beside bold actual time.` },
      { title: 'Recoloring status pill', text: `Green, orange, blue, gray across four states.` },
      { title: 'Animated route line', text: `Plane glyph nudges forward on departure.` },
      { title: 'Gate reassignment', text: `Gate value updates independently per status.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS, no CDN.` },
      { title: 'Simple state function', text: `setStatus() is the only integration point.` },
      { title: 'Accessible toggle buttons', text: `aria-pressed marks the active status button.` },
    ],
    useCases: [
      { title: 'Trip dashboards', text: 'Show live flight status beside a [boarding pass](/ui-snippets/boarding-pass/) on a trip dashboard, with one `data-status` attribute driving every colour change in the card.' },
      { title: 'Airline apps', text: 'Pair with a [seat picker](/ui-snippets/seat-picker/) after check-in, so passengers see their seat and the flight\'s health together.' },
      { title: 'Booking flows', text: 'Follow a [flight search form](/ui-snippets/flight-search-form/) result with a status snapshot once a flight is chosen, so travellers see how reliable it is.' },
      { title: 'Airport displays', text: 'Show gate and status changes at a glance, with the status pill recolouring for On Time, Delayed, Boarding and Departed.' },
      { title: 'Travel agent monitoring', text: 'Monitor several client flights in one view, using struck-through scheduled times beside bold actual times to highlight delays.' },
      { icon: 'CODE', title: 'Related: Idle Detection Badge', desc: 'See the [Idle Detection Badge](/ui-snippets/idle-detection-badge/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the status pill change color?', a: `The card's outer element carries a data-status attribute set to on-time, delayed, boarding, or departed. Every color rule in the CSS is scoped to a [data-status="..."] selector, so setStatus() only needs to change that one attribute and every dependent color — pill, times, border — updates through CSS alone.` },
      { q: 'How do scheduled and actual times work?', a: `Each time column renders two lines: a scheduled time with text-decoration applied conditionally, and a bold actual time. When status becomes delayed, the CSS strikes through the scheduled time and recolors the actual time to orange, visually showing the delta the way real airline status pages do.` },
      { q: 'Is the plane icon an image?', a: `No, it's an inline SVG path, so it inherits currentColor and recolors or repositions with plain CSS. It sits on a route line built from a pseudo-element and two dots, and nudges forward slightly when the flight departs to hint at motion.` },
      { q: 'How do I connect this to real flight data?', a: `Replace the four demo buttons with your own polling or websocket handler and call setStatus(status) with on-time, delayed, boarding, or departed whenever new data arrives. You can also extend statusConfig with real departure/arrival times and gate values pulled from an aviation data API.` },
      { q: 'Can I use this in React, Vue, or Angular?', a: `Yes. Keep data-status as a piece of state (useState, a ref, or a signal) on the card element, and reactively update the attribute plus the text fields when new flight data arrives. The CSS ports unchanged since all the visual logic lives in attribute selectors.` },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing at how to wire status changes cleanly, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why keying every color rule off a single data-status attribute on the outer card, instead of toggling individual classes on each child element, keeps the state management in one place. It can also help you extend the pattern — ask it to add a "Cancelled" status with its own color and copy, wire the gate field to reassign automatically when boarding starts, or connect setStatus() to a real aviation-data API via polling or a websocket. Treat this as a starting point to adapt, not a finished, drop-in production widget.`,
      prompt: `Build a "flight status tracker" card in plain HTML, CSS, and JavaScript with no external dependencies.

Requirements:
- A card showing a flight number, two airport codes with city names on either end of a route line, and a status pill in the top-right corner.
- The route line should include an inline SVG plane icon between two dots, built with CSS (pseudo-element line, flex layout) rather than an image.
- Below the route, show departure and arrival times as two columns, each displaying a scheduled time and an actual time — the scheduled time should get a struck-through style and the actual time should recolor when the flight is delayed.
- A meta row showing terminal, gate, and seat, where the gate value can change independently of the status color (e.g. reassigned when boarding starts).
- Drive all state from a single data-status attribute on the outer card element (values: on-time, delayed, boarding, departed) — every color change (pill background/text, border, time colors) should be a CSS selector keyed off that attribute, not individual inline styles or class toggles per element.
- A setStatus(status) JavaScript function that updates the data-status attribute and the relevant text content (pill label, gate, actual times) from a small config object keyed by status.
- Four toggle buttons wired to setStatus() for demo purposes, using aria-pressed to mark which one is active.
- Make the plane icon subtly shift position when the status becomes "departed" to hint at motion without a continuous animation loop.`,
    },
  },
};

export default flightStatusTracker;
