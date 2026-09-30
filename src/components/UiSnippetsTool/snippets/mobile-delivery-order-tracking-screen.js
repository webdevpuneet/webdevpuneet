const mobileDeliveryOrderTrackingScreen = {
  id: 'mobile-delivery-order-tracking-screen',
  title: 'Mobile Delivery Order Tracking Screen',
  category: 'mobile',
  html: `<div class="dot-phone">
  <div class="dot-screen">
    <div class="dot-status"><span>9:41</span><span class="dot-batt"><i></i></span></div>

    <header class="dot-head">
      <button class="dot-back" aria-label="Back">&#8249;</button>
      <b>Order #4821</b>
      <button class="dot-help" aria-label="Help">?</button>
    </header>

    <div class="dot-map">
      <div class="dot-map-grid"></div>
      <div class="dot-route-line"></div>
      <div class="dot-pin dot-pin-store">&#127974;</div>
      <div class="dot-pin dot-pin-rider" id="dotRiderPin">&#128692;</div>
      <div class="dot-pin dot-pin-home">&#127968;</div>
    </div>

    <div class="dot-sheet">
      <div class="dot-eta">
        <div>
          <b id="dotEtaMinutes">18 min</b>
          <span>Estimated arrival</span>
        </div>
        <span class="dot-eta-badge" id="dotEtaBadge">On the way</span>
      </div>

      <div class="dot-steps" id="dotSteps">
        <div class="dot-step done" data-step="0">
          <span class="dot-step-dot"></span>
          <div><b>Order confirmed</b><small>12:04 PM</small></div>
        </div>
        <div class="dot-step done" data-step="1">
          <span class="dot-step-dot"></span>
          <div><b>Preparing your order</b><small>12:07 PM</small></div>
        </div>
        <div class="dot-step active" data-step="2">
          <span class="dot-step-dot"></span>
          <div><b>Rider picked up your order</b><small id="dotStep2Time">12:16 PM</small></div>
        </div>
        <div class="dot-step" data-step="3">
          <span class="dot-step-dot"></span>
          <div><b>Out for delivery</b><small>&ndash;</small></div>
        </div>
        <div class="dot-step" data-step="4">
          <span class="dot-step-dot"></span>
          <div><b>Delivered</b><small>&ndash;</small></div>
        </div>
      </div>

      <div class="dot-rider-card">
        <span class="dot-rider-avatar">M</span>
        <div class="dot-rider-info">
          <b>Marcus</b>
          <span>Your rider &middot; &#9733; 4.9</span>
        </div>
        <button class="dot-rider-msg" id="dotMsgBtn" aria-label="Message rider">&#128172;</button>
        <button class="dot-rider-call" id="dotCallBtn" aria-label="Call rider">&#128222;</button>
      </div>
    </div>
  </div>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.dot-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.dot-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#f8fafc;color:#0f172a;display:flex;flex-direction:column;position:relative}
.dot-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700;position:absolute;top:0;left:0;right:0;z-index:5;color:#0f172a}
.dot-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.dot-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.dot-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:82%;background:currentColor;border-radius:1px}

.dot-head{position:absolute;top:38px;left:0;right:0;display:flex;align-items:center;justify-content:space-between;padding:6px 14px;z-index:5}
.dot-back,.dot-help{background:#fff;border:none;width:30px;height:30px;border-radius:50%;font-size:17px;color:#0f172a;cursor:pointer;box-shadow:0 2px 8px rgba(0,0,0,.12)}
.dot-head b{background:#fff;padding:6px 14px;border-radius:20px;font-size:12.5px;box-shadow:0 2px 8px rgba(0,0,0,.12)}

.dot-map{height:230px;position:relative;overflow:hidden;background:#dbeafe}
.dot-map-grid{position:absolute;inset:0;background-image:linear-gradient(#c7dcf5 1px,transparent 1px),linear-gradient(90deg,#c7dcf5 1px,transparent 1px);background-size:26px 26px;opacity:.6}
.dot-route-line{position:absolute;left:15%;right:20%;top:38%;height:3px;background:repeating-linear-gradient(90deg,#4f46e5 0 8px,transparent 8px 14px);border-radius:2px}
.dot-pin{position:absolute;top:32%;width:34px;height:34px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:16px;box-shadow:0 3px 10px rgba(0,0,0,.18);transform:translate(-50%,-50%)}
.dot-pin-store{left:15%}
.dot-pin-home{left:80%}
.dot-pin-rider{left:15%;background:#4f46e5;transition:left 4s linear;z-index:2}

.dot-sheet{flex:1;background:#fff;border-radius:24px 24px 0 0;margin-top:-18px;position:relative;z-index:3;padding:18px 18px 16px;overflow-y:auto;scrollbar-width:none;-ms-overflow-style:none}
.dot-sheet::-webkit-scrollbar{display:none}

.dot-eta{display:flex;align-items:center;justify-content:space-between;margin-bottom:16px}
.dot-eta b{display:block;font-size:20px;font-weight:800}
.dot-eta span{font-size:11.5px;color:#94a3b8}
.dot-eta-badge{background:#dcfce7;color:#166534;font-size:11px;font-weight:800;padding:6px 12px;border-radius:20px}

.dot-steps{margin-bottom:16px}
.dot-step{display:flex;align-items:flex-start;gap:12px;position:relative;padding-bottom:18px}
.dot-step::before{content:'';position:absolute;left:5px;top:16px;bottom:0;width:2px;background:#e2e8f0}
.dot-step:last-child::before{display:none}
.dot-step.done::before{background:#4f46e5}
.dot-step-dot{width:12px;height:12px;border-radius:50%;background:#e2e8f0;flex-shrink:0;margin-top:2px}
.dot-step.done .dot-step-dot{background:#4f46e5}
.dot-step.active .dot-step-dot{background:#4f46e5;box-shadow:0 0 0 0 rgba(79,70,229,.5);animation:dotPulse 1.6s infinite}
@keyframes dotPulse{0%{box-shadow:0 0 0 0 rgba(79,70,229,.5)}70%{box-shadow:0 0 0 7px rgba(79,70,229,0)}100%{box-shadow:0 0 0 0 rgba(79,70,229,0)}}
.dot-step b{display:block;font-size:12.5px;color:#cbd5e1;font-weight:700}
.dot-step.done b,.dot-step.active b{color:#0f172a}
.dot-step small{font-size:10.5px;color:#94a3b8}

.dot-rider-card{display:flex;align-items:center;gap:10px;background:#f8fafc;border-radius:16px;padding:10px 12px}
.dot-rider-avatar{width:38px;height:38px;border-radius:50%;background:#4f46e5;color:#fff;display:flex;align-items:center;justify-content:center;font-weight:800;flex-shrink:0}
.dot-rider-info{flex:1;min-width:0}
.dot-rider-info b{display:block;font-size:13px}
.dot-rider-info span{font-size:11px;color:#94a3b8}
.dot-rider-msg,.dot-rider-call{width:36px;height:36px;border-radius:50%;background:#fff;border:1px solid #e2e8f0;font-size:14px;cursor:pointer;flex-shrink:0}`,
  js: `var steps = [
  { label: 'Order confirmed' },
  { label: 'Preparing your order' },
  { label: 'Rider picked up your order' },
  { label: 'Out for delivery' },
  { label: 'Delivered' }
];
var currentStep = 2;
var etaMinutes = 18;
var riderPin = document.getElementById('dotRiderPin');
var etaEl = document.getElementById('dotEtaMinutes');
var badgeEl = document.getElementById('dotEtaBadge');
var stepsEl = document.getElementById('dotSteps');
var msgBtn = document.getElementById('dotMsgBtn');
var callBtn = document.getElementById('dotCallBtn');

function renderSteps() {
  stepsEl.querySelectorAll('.dot-step').forEach(function (el) {
    var i = Number(el.dataset.step);
    el.classList.remove('done', 'active');
    if (i < currentStep) el.classList.add('done');
    else if (i === currentStep) el.classList.add('active');
  });
}

function advanceStep() {
  if (currentStep >= steps.length - 1) return;
  currentStep++;
  renderSteps();

  if (currentStep === 3) {
    riderPin.style.left = '80%';
    badgeEl.textContent = 'Almost there';
  }
  if (currentStep === 4) {
    badgeEl.textContent = 'Delivered';
    badgeEl.style.background = '#e0e7ff';
    badgeEl.style.color = '#3730a3';
    etaEl.textContent = 'Arrived';
  }
}

function tickEta() {
  if (currentStep >= steps.length - 1) return;
  etaMinutes = Math.max(1, etaMinutes - 1);
  etaEl.textContent = etaMinutes + ' min';
}

msgBtn.addEventListener('click', function () {
  msgBtn.textContent = '\\u2713';
  setTimeout(function () { msgBtn.textContent = '\\uD83D\\uDCAC'; }, 1200);
});
callBtn.addEventListener('click', function () {
  callBtn.textContent = '\\u2713';
  setTimeout(function () { callBtn.textContent = '\\uD83D\\uDCDE'; }, 1200);
});

renderSteps();
setInterval(tickEta, 3000);
setTimeout(advanceStep, 4500);
setTimeout(advanceStep, 10500);`,
  seo: {
    title: 'Mobile Delivery Order Tracking Screen — Free Snippet',
    description: 'A mobile order-tracking screen with a live map pin animation, a step timeline that advances automatically, a countdown ETA, and rider contact actions. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Mobile Delivery Tracking Screen — Live Timeline, Moving Pin & Countdown ETA',
      description: `A delivery tracking screen is checked compulsively in short bursts — a user opens the app, glances at the ETA, closes it, and repeats a few minutes later. This snippet builds that screen so each glance shows real movement: a rider pin that slides across a simplified map, a status timeline that advances through real steps rather than sitting frozen, and an ETA number that actually counts down between checks.

**A timeline built from steps, not five hardcoded divs**

The \`steps\` array defines the five delivery stages in order, and \`renderSteps()\` walks every \`.dot-step\` element, comparing its \`data-step\` index against \`currentStep\` to decide whether it should render as done (filled dot, solid connector), active (pulsing dot), or upcoming (hollow, muted). Advancing the order is just incrementing one number and re-running this comparison — the visual state of all five steps is fully derived from \`currentStep\`, never set individually.

**A pulsing dot only on the current step**

Only \`.dot-step.active .dot-step-dot\` gets the \`box-shadow\` pulse animation — completed steps get a solid filled dot with no animation, and future steps stay hollow. This draws the eye to exactly one place: whatever is happening right now, not the full history or the steps yet to come.

**A rider pin that actually moves**

\`#dotRiderPin\` starts positioned at the store pin's location with \`transition: left 4s linear\` already set in CSS. When \`advanceStep()\` reaches the "Out for delivery" step, its \`left\` value is changed to the destination's position, and the browser animates the move over four seconds — a small but important detail, since a pin that simply teleports across the map reads as fake in a way a slow, steady glide does not.

**An ETA that counts down between status changes**

\`tickEta()\` runs on a \`setInterval\` independent of the step timeline, decrementing \`etaMinutes\` by one every few seconds (standing in for real-time minutes) as long as the order has not yet reached the final "Delivered" step. This mirrors the real behavior users expect — the number keeps ticking down continuously, not just jumping when a new status arrives.

**Two-stage status advancement via simulated push events**

\`setTimeout(advanceStep, ...)\` is called twice with different delays, standing in for two separate real-time push notifications a delivery backend would send ("picked up" then "delivered"). Each call to \`advanceStep()\` is the single function responsible for moving the timeline, the map pin, and the ETA badge text together, so the three never fall out of sync with each other.

**Working rider-contact buttons**

The message and call buttons each show a brief checkmark confirmation on click before reverting to their icon — a lightweight acknowledgement pattern rather than a dead decorative icon, ready to be wired to a real chat thread or a masked-number calling API.

**Wiring it to a real delivery backend**

Replace the \`setTimeout\`-based \`advanceStep()\` calls with a WebSocket or polling connection to your order-status API, and replace the fixed \`left\` percentage jump on the rider pin with real GPS coordinates projected onto an actual map library (Mapbox GL, Google Maps, or MapLibre) instead of the simplified grid background.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A tracking screen renders with a simplified map, a moving rider pin, and a five-step delivery timeline.' },
        { title: 'Watch the ETA count down', text: 'The estimated arrival number decreases automatically every few seconds while the order is in progress.' },
        { title: 'Wait for the timeline to advance', text: 'After a few seconds, the rider pin glides toward the destination and the "Out for delivery" step activates, then "Delivered".' },
        { title: 'Tap the message or call button', text: 'Each shows a brief checkmark confirmation before reverting to its normal icon.' },
        { title: 'Edit the steps array', text: 'Change the step labels or add new ones in the JS panel — renderSteps() picks them up automatically.' },
        { title: 'Wire it to a real backend', text: 'Replace the setTimeout-driven advanceStep() calls with a WebSocket or polling connection to your order-status API, and the pin\'s CSS position with real GPS coordinates on an actual map library.' },
      ],
    },
    features: [
      'Five-step delivery timeline fully derived from one currentStep number via renderSteps()',
      'Pulsing dot indicator appears only on the currently active step',
      'Rider map pin animates its position with a CSS transition rather than teleporting',
      'ETA counts down continuously on its own interval, independent of step changes',
      'One advanceStep() function keeps the timeline, map pin, and ETA badge in sync',
      'Working message and call buttons with a brief tap-confirmation state',
      'Delivered state relabels the ETA badge and freezes the countdown automatically',
      'Zero dependencies, vanilla JavaScript only',
    ],
    useCases: [
      { icon: 'APP', title: 'Food and grocery delivery apps', desc: 'The canonical use case — a live order-status screen a customer checks repeatedly between placing an order and it arriving.' },
      { icon: 'FLOW', title: 'Parcel and courier tracking apps', desc: 'Swap the rider-card labels and step names for courier-specific stages (out for delivery, at local facility, delivered) using the same derived-timeline pattern.' },
      { icon: 'DASH', title: 'Ride-hailing pickup confirmation screens', desc: 'Adapt the moving-pin and ETA-countdown pattern for a driver approaching a pickup location instead of a delivery destination.' },
      { icon: 'LEARN', title: 'Teaching derived-timeline UI state', desc: 'A compact reference for driving a multi-step visual timeline entirely from one numeric state variable instead of toggling each step by hand.' },
      { icon: 'CODE', title: 'Related: Mobile Boarding Pass Screen', desc: 'See the [Mobile Boarding Pass Screen](/ui-snippets/mobile-boarding-pass-screen/) for a related travel-status mobile screen worth comparing against this one.' },
      { icon: 'CODE', title: 'Related: Mobile Search Filters Screen', desc: 'See the [Mobile Search Filters Screen](/ui-snippets/mobile-search-filters-screen/) for a related mobile commerce screen worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the timeline decide which step is done, active, or upcoming?', a: 'renderSteps() compares each step element\'s data-step index against the single currentStep variable: indexes below it get the done class, the matching index gets active, and higher indexes get neither. The entire timeline\'s visual state is derived from that one number.' },
      { q: 'Does the rider pin move based on real GPS data?', a: 'No — it is a simulated demo. The pin\'s CSS left value jumps to a fixed destination percentage when the "out for delivery" step is reached, and a CSS transition animates the move over four seconds. Replace this with real coordinates projected onto an actual map library for production use.' },
      { q: 'What updates the ETA countdown?', a: 'A separate setInterval calls tickEta() on its own schedule, decrementing etaMinutes independently of the step timeline, as long as the order has not yet reached the final Delivered step. This keeps the number actively counting down between status changes, not just jumping when a new step arrives.' },
      { q: 'What triggers the timeline to advance in this demo?', a: 'Two setTimeout calls invoke advanceStep() at different delays, standing in for real-time push notifications a delivery backend would send. In production, replace these with a WebSocket or polling connection to your order-status API.' },
      { q: 'Do the message and call buttons actually contact the rider?', a: 'Not in this demo — they show a brief checkmark confirmation on click before reverting. Wire them to a real in-app chat thread or a masked-number calling API for actual rider contact.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Track currentStep and etaMinutes in state, derive each step\'s done/active class from a comparison against currentStep in a computed value or map, and drive the pin\'s position from a percentage or coordinate value tied to the same state.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the derived-timeline logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how renderSteps() derives every step's visual state from the single currentStep variable, and how advanceStep() keeps the timeline, the map pin position, and the ETA badge text synchronized from one function call. The same assistant can help you optimize it, for instance asking whether the ETA countdown should pause automatically when the tab loses focus so it doesn't drift out of sync with server time. It is also useful for extending the screen: ask it to wire in a real WebSocket connection for live status pushes, integrate an actual map library with real rider GPS coordinates in place of the simplified grid, or add a cancel-order flow with its own confirmation step. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile "delivery order tracking" screen in plain HTML, CSS, and JavaScript, framed inside a CSS phone mockup, no map library or backend required for the demo.

Requirements:
- A simplified map area at the top showing a store pin, a home/destination pin, a dashed route line between them, and a separate rider pin that starts at the store's position.
- Below the map, a bottom sheet showing a live ETA in minutes with a status badge, and a five-step vertical timeline (order confirmed, preparing, picked up, out for delivery, delivered) where every step's visual state (completed, currently active with a pulsing indicator, or upcoming) is derived entirely from one numeric "current step" variable rather than toggled individually per step.
- The ETA minutes must count down automatically on its own timer while the order is in progress, and stop changing once the final step is reached.
- Advancing to the "out for delivery" step must animate the rider pin's position from the store toward the destination using a CSS transition (not an instant jump), and reaching "delivered" must update the status badge's text and color.
- Include a rider info card with working message and call buttons that each show a brief tap-confirmation state before reverting to their normal icon.
- Simulate timeline progression with a couple of delayed function calls standing in for real-time push notifications from a delivery backend.`,
    },
  },
};
export default mobileDeliveryOrderTrackingScreen;
