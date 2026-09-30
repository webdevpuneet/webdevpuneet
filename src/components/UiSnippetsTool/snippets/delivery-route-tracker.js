const deliveryRouteTracker = {
  id: 'delivery-route-tracker',
  title: 'Live Delivery Route Tracker',
  lastmod: '2026-08-09',
  category: 'dashboards',
  html: `<div class="tracker-card">
  <div class="tracker-header">
    <div class="header-text">
      <p class="eyebrow">Order #48213</p>
      <h2 class="status-title" id="status-title">Order picked up</h2>
    </div>
    <div class="eta-pill">
      <span class="eta-label">ETA</span>
      <span class="eta-value" id="eta-value">18 min</span>
    </div>
  </div>

  <div class="route-wrap">
    <svg viewBox="0 0 400 200" class="route-svg" id="route-svg">
      <path id="route-path" d="M 40 150 C 100 40, 180 190, 220 90 S 340 20, 360 60" fill="none" stroke="#e2e8f0" stroke-width="4" stroke-dasharray="1 10" stroke-linecap="round" />
      <circle class="waypoint" cx="40" cy="150" r="6"></circle>
      <circle class="waypoint" cx="220" cy="90" r="5"></circle>
      <circle class="waypoint" cx="360" cy="60" r="6"></circle>
      <g id="vehicle-marker" class="vehicle-marker">
        <circle r="14" class="vehicle-halo"></circle>
        <svg x="-10" y="-10" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2">
          <path d="M3 16V6a1 1 0 0 1 1-1h9v11" />
          <path d="M13 9h4l4 4v3h-2" />
          <circle cx="7.5" cy="17.5" r="2" fill="#ffffff" stroke="none"></circle>
          <circle cx="17.5" cy="17.5" r="2" fill="#ffffff" stroke="none"></circle>
        </svg>
      </g>
    </svg>
    <div class="pin pin-start" style="left: 8%; top: 74%;">
      <span class="pin-dot"></span>
      <span class="pin-label">Pickup</span>
    </div>
    <div class="pin pin-end" style="left: 90%; top: 28%;">
      <span class="pin-dot"></span>
      <span class="pin-label">Destination</span>
    </div>
  </div>

  <div class="progress-track">
    <div class="progress-fill" id="progress-fill"></div>
  </div>

  <ul class="milestone-list" id="milestone-list">
    <li class="milestone active" data-step="0"><span class="dot"></span>Order picked up</li>
    <li class="milestone" data-step="1"><span class="dot"></span>On the way</li>
    <li class="milestone" data-step="2"><span class="dot"></span>Arriving soon</li>
    <li class="milestone" data-step="3"><span class="dot"></span>Delivered</li>
  </ul>

  <div class="tracker-actions">
    <button class="btn btn-outline" id="btn-restart">Restart Delivery</button>
    <span class="progress-pct" id="progress-pct">0% of route</span>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.tracker-card {
  width: 460px; max-width: 100%;
  background: #ffffff; border-radius: 20px;
  padding: 24px; box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
  border: 1px solid #f1f5f9;
}

.tracker-header { display: flex; align-items: flex-start; justify-content: space-between; gap: 12px; margin-bottom: 18px; }
.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
.status-title { font-size: 18px; font-weight: 700; color: #0f172a; transition: opacity 0.2s; }

.eta-pill {
  display: flex; flex-direction: column; align-items: flex-end;
  background: #eef2ff; border-radius: 12px; padding: 8px 14px; flex-shrink: 0;
}
.eta-label { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #6366f1; }
.eta-value { font-size: 18px; font-weight: 800; color: #4338ca; font-variant-numeric: tabular-nums; }

.route-wrap { position: relative; width: 100%; aspect-ratio: 400 / 200; margin-bottom: 16px; }
.route-svg { width: 100%; height: 100%; display: block; }

.waypoint { fill: #cbd5e1; }

.vehicle-marker { transform: translate(40px, 150px); }
.vehicle-halo { fill: #6366f1; filter: drop-shadow(0 4px 10px rgba(99, 102, 241, 0.45)); }

.pin { position: absolute; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; gap: 4px; }
.pin-dot { width: 10px; height: 10px; border-radius: 50%; background: #0f172a; box-shadow: 0 0 0 4px rgba(15, 23, 42, 0.1); }
.pin-end .pin-dot { background: #16a34a; box-shadow: 0 0 0 4px rgba(22, 163, 74, 0.14); }
.pin-label { font-size: 10px; font-weight: 700; color: #64748b; background: #fff; padding: 2px 7px; border-radius: 6px; box-shadow: 0 1px 4px rgba(0,0,0,0.08); white-space: nowrap; }

.progress-track { height: 6px; background: #eef2ff; border-radius: 10px; overflow: hidden; margin-bottom: 16px; }
.progress-fill { height: 100%; width: 0%; background: linear-gradient(90deg, #818cf8, #6366f1); border-radius: 10px; transition: width 0.15s linear; }

.milestone-list { list-style: none; display: flex; justify-content: space-between; gap: 4px; margin-bottom: 18px; }
.milestone { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; font-size: 10px; font-weight: 600; color: #cbd5e1; text-align: center; transition: color 0.25s; }
.milestone .dot { width: 9px; height: 9px; border-radius: 50%; background: #e2e8f0; transition: background 0.25s, transform 0.25s, box-shadow 0.25s; }
.milestone.active { color: #4338ca; }
.milestone.active .dot { background: #6366f1; transform: scale(1.25); box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.15); }
.milestone.done { color: #16a34a; }
.milestone.done .dot { background: #16a34a; }

.tracker-actions { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.btn { padding: 9px 16px; font-size: 12.5px; font-weight: 600; border-radius: 9px; cursor: pointer; font-family: inherit; transition: all 0.15s; border: none; }
.btn-outline { background: transparent; color: #475569; border: 1.5px solid #e2e8f0; }
.btn-outline:hover { border-color: #6366f1; color: #6366f1; }
.progress-pct { font-size: 12px; font-weight: 600; color: #94a3b8; font-variant-numeric: tabular-nums; }`,

  js: `const path = document.getElementById('route-path');
const vehicle = document.getElementById('vehicle-marker');
const etaValue = document.getElementById('eta-value');
const statusTitle = document.getElementById('status-title');
const progressFill = document.getElementById('progress-fill');
const progressPct = document.getElementById('progress-pct');
const milestones = Array.from(document.querySelectorAll('.milestone'));
const restartBtn = document.getElementById('btn-restart');

const pathLength = path.getTotalLength();
const TOTAL_MIN = 18;
const DURATION_MS = 16000; // full trip animation time

const statuses = [
  { at: 0,    title: 'Order picked up' },
  { at: 0.08, title: 'On the way' },
  { at: 0.78, title: 'Arriving soon' },
  { at: 1,    title: 'Delivered' },
];

let startTime = null;
let rafId = null;
let finished = false;

function setStatus(progress) {
  let stepIndex = 0;
  for (let i = statuses.length - 1; i >= 0; i--) {
    if (progress >= statuses[i].at) { stepIndex = i; break; }
  }
  const current = statuses[stepIndex];
  if (statusTitle.textContent !== current.title) {
    statusTitle.style.opacity = '0';
    setTimeout(() => {
      statusTitle.textContent = current.title;
      statusTitle.style.opacity = '1';
    }, 150);
  }
  milestones.forEach((m, i) => {
    m.classList.toggle('active', i === stepIndex);
    m.classList.toggle('done', i < stepIndex);
  });
}

function tick(timestamp) {
  if (startTime === null) startTime = timestamp;
  const elapsed = timestamp - startTime;
  const progress = Math.min(elapsed / DURATION_MS, 1);

  const point = path.getPointAtLength(progress * pathLength);
  vehicle.style.transform = 'translate(' + point.x + 'px, ' + point.y + 'px)';

  progressFill.style.width = (progress * 100).toFixed(1) + '%';
  progressPct.textContent = Math.round(progress * 100) + '% of route';

  const remainingMin = Math.max(0, Math.ceil(TOTAL_MIN * (1 - progress)));
  etaValue.textContent = progress >= 1 ? 'Arrived' : remainingMin + ' min';

  setStatus(progress);

  if (progress < 1) {
    rafId = requestAnimationFrame(tick);
  } else {
    finished = true;
  }
}

function startDelivery() {
  startTime = null;
  finished = false;
  cancelAnimationFrame(rafId);
  progressFill.style.width = '0%';
  progressPct.textContent = '0% of route';
  etaValue.textContent = TOTAL_MIN + ' min';
  statusTitle.textContent = statuses[0].title;
  milestones.forEach((m, i) => {
    m.classList.toggle('active', i === 0);
    m.classList.remove('done');
  });
  const point = path.getPointAtLength(0);
  vehicle.style.transform = 'translate(' + point.x + 'px, ' + point.y + 'px)';
  rafId = requestAnimationFrame(tick);
}

restartBtn.addEventListener('click', startDelivery);

startDelivery();`,

  seo: {
    title: 'Live Delivery Route Tracker UI — Free HTML CSS JS Snippet',
    description: 'Animated delivery tracker with SVG path-following vehicle, live ETA countdown, and status milestones. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Live Delivery Route Tracker — SVG getPointAtLength Motion Path, ETA Countdown & Milestone Timeline',
      description: `Every food delivery, ride-share, and e-commerce logistics app needs some version of the same widget: a visual representation of a vehicle moving from A to B, with a live estimate of when it will arrive. This snippet builds that widget from first principles using nothing but an SVG path, \`requestAnimationFrame\`, and the browser's native \`getPointAtLength()\` API — no mapping library, no external tile server, no dependency. The result is a stylized, illustrative route (not a literal map) that is fast to render, trivially themeable, and perfect for dashboards, order-confirmation screens, or marketing pages that want to show delivery progress without the weight of a real map SDK.

**Why \`getPointAtLength()\` is the right tool for path-following animation**

The core technical trick is SVG's \`SVGGeometryElement.getPointAtLength(distance)\` method, available on any \`<path>\` element. Given a distance travelled along the path (in user units, starting from 0 at the path's start), it returns the exact \`{x, y}\` coordinate at that point — including on curved segments defined by cubic Bezier \`C\` and smooth \`S\` commands. This means the vehicle icon can follow a genuinely curved, winding route without any manual interpolation math. The snippet first computes \`path.getTotalLength()\` once to get the path's full length in user units, then on every animation frame calculates a \`progress\` value between 0 and 1 (elapsed time divided by total trip duration) and calls \`getPointAtLength(progress * pathLength)\` to get the vehicle's current \`{x, y}\`. That coordinate is applied directly as a CSS \`transform: translate(x, y)\` on a \`<g>\` element nested inside the same SVG, so the vehicle marker glides smoothly along every curve of the dashed route line.

**Driving the animation with requestAnimationFrame**

Rather than a fixed-interval \`setInterval\`, the animation loop uses \`requestAnimationFrame\`, which self-schedules against the browser's repaint cycle for smoother, jank-free motion and automatically pauses when the tab is backgrounded. The loop records a \`startTime\` on the first frame, then on every subsequent frame computes \`elapsed = timestamp - startTime\` and derives \`progress = elapsed / DURATION_MS\`, clamped to a maximum of 1. This time-based (rather than frame-count-based) approach keeps the animation duration consistent regardless of the device's refresh rate — a 60Hz and 144Hz display both complete the trip in exactly \`DURATION_MS\` milliseconds.

**Live ETA countdown and milestone status text**

As \`progress\` advances, two more pieces of UI update in lockstep. The ETA pill recalculates \`remainingMin = Math.ceil(TOTAL_MIN * (1 - progress))\`, so the countdown ticks down in whole minutes as the trip proceeds and reads "Arrived" once \`progress\` reaches 1. Separately, a \`statuses\` array defines four milestones as \`{ at: fraction, title: string }\` pairs — 0% "Order picked up", 8% "On the way", 78% "Arriving soon", 100% "Delivered". On each frame, \`setStatus()\` finds the highest milestone whose \`at\` threshold has been crossed and fades the status heading to that milestone's title using a brief \`opacity\` transition, while a horizontal milestone list highlights the current step and marks earlier steps as \`.done\` with a green dot.

**Waypoints, progress bar, and restart control**

Two intermediate SVG \`<circle>\` waypoints sit along the dashed path purely as visual landmarks, echoing how consumer delivery apps show waypoint dots between pickup and destination pins. Beneath the route, a slim progress bar mirrors the same \`progress\` value as a linear percentage, giving users a second, more literal read on how far along the delivery is. A "Restart Delivery" button resets \`startTime\` to \`null\`, cancels the in-flight animation frame, and re-triggers the full sequence from 0%, making the demo easy to replay. Because every visual is driven by one shared \`progress\` variable, the vehicle position, ETA, status text, milestone highlighting, and progress bar can never fall out of sync with each other.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Watch the vehicle follow the route',
          text: 'On load, startDelivery() kicks off a requestAnimationFrame loop that moves the vehicle marker along the dashed SVG path using getPointAtLength(). Watch the ETA pill count down and the status heading change as the marker crosses each milestone threshold.',
        },
        {
          title: 'Restart the simulated trip',
          text: 'Click "Restart Delivery" to reset progress to 0%, snap the vehicle back to the pickup pin, and replay the full animation from the "Order picked up" status through to "Delivered".',
        },
        {
          title: 'Change the route shape',
          text: 'Edit the "d" attribute on #route-path in the HTML panel. It is a standard SVG path using M (move), C (cubic Bezier curve), and S (smooth curve) commands — getPointAtLength() will automatically follow whatever shape you draw, so you can make the route straighter, longer, or add more bends.',
        },
        {
          title: 'Adjust trip duration and ETA minutes',
          text: 'In the JS panel, change TOTAL_MIN to set the starting ETA shown in minutes, and DURATION_MS to control how many real milliseconds the full animation takes to complete. These are independent — TOTAL_MIN is only used for the displayed countdown text.',
        },
        {
          title: 'Customize milestone thresholds and copy',
          text: 'Edit the statuses array in the JS panel — each entry has an at fraction (0 to 1) marking when that milestone becomes active and a title string. Add a fifth milestone by inserting a new { at, title } object; setStatus() automatically picks the correct one every frame.',
        },
        {
          title: 'Restyle pins, vehicle, and accent color',
          text: 'The vehicle halo and progress bar both use the #6366f1 accent color defined in .vehicle-halo and .progress-fill — change both to match your brand. Pin colors are set separately on .pin-dot and .pin-end .pin-dot for the start and destination markers.',
        },
      ],
    },
    features: [
      'SVG getPointAtLength() drives frame-accurate motion along a curved Bezier path, no map library needed',
      'requestAnimationFrame loop with time-based progress (elapsed / DURATION_MS) for consistent speed across refresh rates',
      'Live ETA countdown recalculated every frame as Math.ceil(TOTAL_MIN * (1 - progress))',
      'Four-stage milestone timeline (picked up, on the way, arriving soon, delivered) driven by threshold fractions',
      'Linear progress bar and percentage label mirror the same shared progress value as the path animation',
      'Status heading cross-fades on milestone change using a short opacity transition, no layout shift',
      'Illustrative dashed-route SVG with waypoint dots and pin markers, fully restylable without a mapping API',
      'One-click restart resets startTime, cancels the animation frame, and replays the trip from 0%',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Food delivery and courier app order-tracking screen',
        desc: 'Show customers a live, reassuring visual of their order in transit without embedding a full interactive map SDK, which is heavy, requires an API key, and often overkill for a small status widget. Swap the stylized path for a route matching your delivery zone, and drive the animation with a real progress value computed from your backend ETA rather than a fixed timer.',
      },
      {
        icon: 'FLOW',
        title: 'Logistics and fleet dashboard status card',
        desc: 'Embed this as a compact status card inside a larger operations dashboard showing multiple in-flight deliveries at once. Each card can run its own independent animation loop keyed to that shipment\'s actual progress percentage pulled from a live tracking API, giving dispatchers an at-a-glance visual read across many orders simultaneously.',
      },
      {
        icon: 'FORM',
        title: 'Order confirmation and post-checkout status page',
        desc: 'After a customer completes checkout, show this tracker on the confirmation page to set expectations immediately, reducing "where is my order" support tickets. Pair it with the [Live Delivery Route Tracker](/ui-snippets/delivery-route-tracker) milestone list to explain each stage of fulfillment in plain language rather than a raw status code.',
      },
      {
        icon: 'DESIGN',
        title: 'Marketing page demo for a logistics or delivery SaaS product',
        desc: 'Logistics and last-mile delivery platforms often want an animated hero visual demonstrating their tracking capability without embedding real customer data or a live map. This self-contained, looping animation communicates "real-time tracking" convincingly while staying lightweight enough to run smoothly even on a marketing page with many other elements.',
      },
      {
        icon: 'LEARN',
        title: 'Learn SVG motion-path techniques for any moving-icon animation',
        desc: 'The getPointAtLength() technique used here generalizes to any UI that needs an icon to follow a curved or irregular path — onboarding tours, animated data-flow diagrams, or game character movement. Studying this snippet teaches the core pattern: precompute total path length once, then interpolate a 0-to-1 progress value into a coordinate on every frame.',
      },
      {
        icon: 'CODE',
        title: 'Replace a full map SDK with a lightweight illustrative alternative',
        desc: 'Full mapping SDKs (Google Maps, Mapbox) add significant bundle weight, require API keys and billing setup, and are often unnecessary when you only need to communicate general progress rather than precise geographic accuracy. This snippet delivers the same emotional reassurance of "I can see my order moving" in a few kilobytes of dependency-free SVG and JavaScript.',
      },
      { icon: 'CODE', title: 'Related: Goal Progress Ring', desc: 'See the [Goal Progress Ring](/ui-snippets/goal-progress-ring/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How does getPointAtLength() know the coordinates along a curved path?',
        a: 'getPointAtLength() is a native method on any SVG path element that the browser computes internally by walking the path\'s geometry — including cubic Bezier C and smooth S curve commands — and returning the exact {x, y} coordinate at a given distance from the path\'s start. You never have to manually calculate Bezier interpolation math; the browser handles it for any path shape, which is why this technique works identically whether your route is a straight line or a series of sweeping curves.',
      },
      {
        q: 'Can I drive the animation from a real backend progress value instead of a timer?',
        a: 'Yes. Replace the requestAnimationFrame loop\'s time-based progress calculation with a value fetched from your API, such as a percentage-complete field from a tracking webhook. Call the same rendering logic (getPointAtLength, ETA text update, setStatus) whenever new data arrives, for example inside a WebSocket message handler or a polling interval, instead of computing progress from elapsed animation time.',
      },
      {
        q: 'Why use a stylized illustrative route instead of a real map?',
        a: 'A real map requires a mapping SDK (Google Maps, Mapbox, Leaflet), an API key, network requests for tiles, and meaningfully more bundle weight and rendering cost. For many product surfaces — order confirmations, dashboard cards, marketing demos — users only need to feel reassured that movement is happening, not see literal street geography. A lightweight SVG path communicates that same sense of motion in a fraction of the code and loads instantly with zero external requests.',
      },
      {
        q: 'How do I make the vehicle move faster or slower?',
        a: 'Change the DURATION_MS constant in the JS panel — it controls how many real milliseconds the full trip animation takes from 0% to 100% progress. A smaller value speeds up the animation; a larger value slows it down. This is independent of TOTAL_MIN, which only controls the number displayed in the ETA countdown text, so you can have a fast demo animation while still showing a realistic-looking "18 min" style estimate.',
      },
      {
        q: 'Does this work well on mobile screens?',
        a: 'Yes. The SVG uses a viewBox with no fixed pixel dimensions, so it scales fluidly to its container width via the .route-wrap element\'s aspect-ratio: 400/200 rule. The card itself uses max-width: 100% so it shrinks gracefully on narrow viewports, and all text uses relative, legible font sizes that remain readable at typical mobile card widths.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how getPointAtLength() converts a 0-to-1 progress fraction into pixel coordinates on the curved path, and how that single progress value simultaneously drives the vehicle position, the ETA text, the milestone highlighting, and the progress bar without any of them drifting out of sync. It's also a great snippet to ask an assistant to extend: request a version that accepts live progress updates from a WebSocket or polling API instead of a fixed timer, one that supports multiple simultaneous vehicles on the same path for a fleet dashboard, or one that adds a subtle route-completed celebration animation when the vehicle reaches the destination pin. Because the whole animation hinges on a handful of well-named variables (progress, pathLength, DURATION_MS), it's an approachable codebase to modify even for someone newer to SVG.`,
      prompt: `Build an animated delivery-route tracker widget in plain HTML, CSS, and JavaScript that shows a vehicle icon moving along a curved illustrative route with a live ETA and status updates — no map library or external API.

Requirements:
- Draw a stylized route as an SVG <path> using curved Bezier commands (not a straight line), with a start pin, an end pin, and at least one intermediate waypoint marker along the curve.
- Animate a vehicle icon so it follows the exact curve of the path using the path element's getPointAtLength() method combined with getTotalLength(), driven by a requestAnimationFrame loop rather than a fixed setInterval, so motion stays smooth and duration-accurate across different refresh rates.
- Show a live "ETA: N min" value that counts down proportionally as the vehicle's progress along the path increases, reaching a distinct "Arrived" state at 100% progress.
- Update a status heading through at least four milestones (for example picked up, on the way, arriving soon, delivered) at defined progress thresholds, with a smooth text transition when the status changes rather than an abrupt swap.
- Include a secondary linear progress bar and percentage label that stay in sync with the same underlying progress value driving the path animation.
- Provide a restart control that resets the animation to 0% and replays the full trip from the beginning, correctly canceling any in-flight animation frame first so restarts never double up.
- Make the SVG and layout responsive using a viewBox and relative sizing so the widget scales cleanly on mobile-width containers.`,
    },
  },
};

export default deliveryRouteTracker;
