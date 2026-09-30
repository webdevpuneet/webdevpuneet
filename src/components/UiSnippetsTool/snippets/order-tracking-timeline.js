const orderTrackingTimeline = {
  id: 'order-tracking-timeline',
  title: 'Order Tracking Timeline',
  lastmod: '2026-06-16',
  category: 'cards',
  html: `<div class="ot-card">
  <div class="ot-head">
    <div>
      <div class="ot-order">Order #FWD-20418</div>
      <div class="ot-eta">Arriving <strong id="otEta">Thu, Jun 18</strong></div>
    </div>
    <div class="ot-status-pill" id="otPill">In transit</div>
  </div>

  <div class="ot-timeline" id="otTimeline">
    <div class="ot-rail"><div class="ot-rail-fill" id="otFill"></div></div>

    <div class="ot-step">
      <div class="ot-dot"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="ot-body"><div class="ot-step-title">Order placed</div><div class="ot-step-time">Mon, Jun 15 · 9:41 AM</div></div>
    </div>
    <div class="ot-step">
      <div class="ot-dot"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="ot-body"><div class="ot-step-title">Packed &amp; ready</div><div class="ot-step-time">Mon, Jun 15 · 4:12 PM</div></div>
    </div>
    <div class="ot-step">
      <div class="ot-dot"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="ot-body"><div class="ot-step-title">Shipped</div><div class="ot-step-time">Tue, Jun 16 · 8:03 AM</div></div>
    </div>
    <div class="ot-step">
      <div class="ot-dot"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="ot-body"><div class="ot-step-title">Out for delivery</div><div class="ot-step-time" id="otTime3">Pending</div></div>
    </div>
    <div class="ot-step">
      <div class="ot-dot"><svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg></div>
      <div class="ot-body"><div class="ot-step-title">Delivered</div><div class="ot-step-time" id="otTime4">Pending</div></div>
    </div>
  </div>

  <button class="ot-btn" onclick="advanceStatus()">Simulate next update</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ot-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:24px;width:100%;max-width:380px;box-shadow:0 14px 44px rgba(15,23,42,.07)}

.ot-head{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:22px}
.ot-order{font-size:15px;font-weight:800;color:#1e293b}
.ot-eta{font-size:12px;color:#64748b;margin-top:3px}
.ot-eta strong{color:#1e293b}
.ot-status-pill{font-size:11px;font-weight:800;padding:5px 11px;border-radius:999px;background:#eff6ff;color:#2563eb}

.ot-timeline{position:relative;padding-left:6px}
.ot-rail{position:absolute;left:16px;top:14px;bottom:14px;width:3px;background:#e2e8f0;border-radius:3px}
.ot-rail-fill{position:absolute;left:0;top:0;width:100%;height:0;background:linear-gradient(#10b981,#059669);border-radius:3px;transition:height .6s cubic-bezier(.4,0,.2,1)}

.ot-step{position:relative;display:flex;gap:14px;padding:9px 0;min-height:42px}
.ot-dot{width:28px;height:28px;border-radius:50%;background:#e2e8f0;border:3px solid #fff;flex-shrink:0;display:flex;align-items:center;justify-content:center;z-index:1;transition:background .3s;box-shadow:0 0 0 1px #e2e8f0}
.ot-dot svg{opacity:0;transform:scale(.4);transition:opacity .25s,transform .25s}

.ot-step.done .ot-dot{background:#10b981;box-shadow:0 0 0 1px #10b981}
.ot-step.done .ot-dot svg{opacity:1;transform:scale(1)}
.ot-step.active .ot-dot{background:#6366f1;box-shadow:0 0 0 1px #6366f1;animation:ot-pulse 1.8s ease-out infinite}
.ot-step.active .ot-dot svg{opacity:0}
@keyframes ot-pulse{0%{box-shadow:0 0 0 0 rgba(99,102,241,.5)}70%{box-shadow:0 0 0 10px rgba(99,102,241,0)}100%{box-shadow:0 0 0 0 rgba(99,102,241,0)}}

.ot-body{padding-top:3px}
.ot-step-title{font-size:13px;font-weight:700;color:#cbd5e1;transition:color .3s}
.ot-step.done .ot-step-title,.ot-step.active .ot-step-title{color:#1e293b}
.ot-step-time{font-size:11px;color:#94a3b8;margin-top:1px}
.ot-step.active .ot-step-time{color:#6366f1;font-weight:600}

.ot-btn{width:100%;margin-top:18px;padding:11px;background:#f1f5f9;color:#475569;border:none;border-radius:11px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.ot-btn:hover{background:#e2e8f0}
.ot-btn:disabled{opacity:.5;cursor:not-allowed}`,

  js: `var PILLS = ['Order placed', 'Packed', 'In transit', 'Out for delivery', 'Delivered'];
var current = 2;

function render() {
  var steps = document.querySelectorAll('.ot-step');
  var n = steps.length;
  steps.forEach(function (step, i) {
    step.classList.remove('done', 'active');
    if (i < current) step.classList.add('done');
    else if (i === current) step.classList.add('active');
  });

  var pct = current >= n - 1 ? 100 : (current / (n - 1)) * 100;
  document.getElementById('otFill').style.height = pct + '%';
  document.getElementById('otPill').textContent = current >= n - 1 ? 'Delivered' : PILLS[current];

  if (current >= n - 1) {
    document.getElementById('otPill').style.background = '#ecfdf5';
    document.getElementById('otPill').style.color = '#059669';
    document.getElementById('otEta').textContent = 'today';
  }
}

function advanceStatus() {
  var steps = document.querySelectorAll('.ot-step');
  if (current >= steps.length - 1) return;
  current++;
  var now = 'Wed, Jun 17 · ' + (current === 3 ? '7:20 AM' : '2:45 PM');
  if (current === 3) document.getElementById('otTime3').textContent = now;
  if (current === 4) document.getElementById('otTime4').textContent = now;
  render();
  if (current >= steps.length - 1) {
    document.querySelector('.ot-btn').disabled = true;
    document.querySelector('.ot-btn').textContent = 'Order delivered ✓';
  }
}

render();`,

  seo: {
    title: 'Order Tracking Timeline — HTML CSS JS Snippet',
    description: `Order tracking timeline with an animated progress rail, checkmark steps, a pulsing current stage, status pill & ETA. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Order Tracking Timeline — Animated Progress Rail, Pulsing Current Stage & Completed Checkmarks`,
      description: `"Where is my order?" is the single most common post-purchase question, and a clear tracking timeline answers it before the customer has to email support. A good fulfilment timeline shows every stage from placed to delivered, marks what is done, highlights what is happening now, and animates as the order advances — turning anxious waiting into reassuring progress. This snippet implements that pattern in plain HTML, CSS, and vanilla JavaScript: a vertical timeline with an animated progress rail, checkmark-completed steps, a pulsing current stage, a status pill, and a live ETA.

The component is driven by a single \`current\` index and a \`render\` function — change the index, call \`render\`, and the entire visual state (rail height, dot colours, checkmarks, text emphasis, status pill) follows. That makes wiring it to real tracking events trivial.

**Animated progress rail**

Behind the dots runs a grey \`.ot-rail\`. Inside it, \`.ot-rail-fill\` is a green gradient whose \`height\` is set as a percentage of \`current / (steps − 1)\`. A \`cubic-bezier\` transition animates the fill upward whenever the order advances, so progress visibly grows rather than jumping. The rail is positioned to line up exactly with the centre of each dot, and a higher \`z-index\` on the dots keeps them above the rail.

**Three dot states: done, active, pending**

Each step is classed by \`render\`: indices below \`current\` get \`.done\` (green dot with a checkmark that scales in), the index equal to \`current\` gets \`.active\` (an indigo dot with a pulsing ring), and the rest stay pending (grey). The checkmark \`svg\` animates from \`scale(.4)\` and \`opacity:0\` to full size, so completing a step feels like a small reward. The active dot's pulse is a pure-CSS \`box-shadow\` keyframe that expands and fades on a loop — drawing the eye to the current stage without any JavaScript animation loop.

**Status pill and ETA**

A pill in the header mirrors the current stage label ("In transit", "Out for delivery"). On delivery, \`render\` recolours the pill green and updates the ETA text to "today" — small touches that make the final state feel distinct and complete.

**Live advancement**

The "Simulate next update" button calls \`advanceStatus\`, which increments \`current\`, fills in a real timestamp for the newly reached step, and re-renders. When the order reaches the final stage, the button disables and switches to "Order delivered ✓". In production you would call \`render\` from a websocket message, a polling fetch, or a server-sent event carrying the carrier's latest scan — the rendering code does not change.

Pair this timeline with an [order summary](/ui-snippets/order-summary/) of the items being shipped, a [stepper](/ui-snippets/stepper/) for checkout progress, or a [vertical timeline](/ui-snippets/vertical-timeline/) for general event histories.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An order-tracking card appears with five stages; the first three are complete with green checkmarks and "Shipped" pulses as the current stage.` },
      { title: 'Read the current state', text: `The green rail fills up to the active stage, the header pill shows "In transit", and the ETA reads "Thu, Jun 18".` },
      { title: 'Advance the order', text: `Click "Simulate next update" — the rail animates up, "Shipped" turns into a checkmark, and "Out for delivery" starts pulsing with a real timestamp.` },
      { title: 'Watch the pulse move', text: `Each advance moves the indigo pulsing ring to the new current stage and updates the status pill to match.` },
      { title: 'Reach delivered', text: `Advance to the final stage — the rail fills to 100%, every dot is a checkmark, the pill turns green, and the ETA changes to "today".` },
      { title: 'See the completed button', text: `Once delivered, the button disables and reads "Order delivered ✓", signalling there are no further updates.` },
    ] },
    features: [
      { title: 'Index-driven rendering', text: `A single \`current\` index plus \`render\` controls the entire timeline — rail height, dot states, checkmarks, text emphasis, and the status pill all derive from it.` },
      { title: 'Animated progress rail', text: `\`.ot-rail-fill\` grows its \`height\` to \`current / (steps − 1)\` with a \`cubic-bezier\` transition, so progress visibly climbs instead of snapping.` },
      { title: 'Three dot states', text: `Steps below current go green with a scale-in checkmark, the current step pulses indigo, and the rest stay grey — instantly readable status.` },
      { title: 'Pure-CSS pulse', text: `The active dot's attention pulse is a looping \`box-shadow\` keyframe — no JS timer, so it costs nothing and never drifts.` },
      { title: 'Checkmark pop-in', text: `Completed dots animate their \`svg\` from \`scale(.4)\` and zero opacity to full, making each completed stage feel rewarding.` },
      { title: 'Status pill mirroring', text: `The header pill always reflects the current stage label and recolours green on delivery to mark the terminal state.` },
      { title: 'Live timestamp fill-in', text: `\`advanceStatus\` writes a real timestamp into each newly reached step, replacing its "Pending" placeholder.` },
      { title: 'Terminal completed state', text: `On the final stage the rail hits 100%, the ETA flips to "today", and the action button disables with a "delivered" confirmation.` },
    ],
    useCases: [
      { title: 'E-commerce shipment tracking', text: `The core use — show order fulfilment from placed to delivered. Link it from an [order summary](/ui-snippets/order-summary/) or order-history row.` },
      { title: 'Food and grocery delivery', text: `Stages like "Preparing", "On the way", and "Delivered" with the pulse on the live stage — ideal for real-time courier updates over websockets.` },
      { title: 'Service and repair status', text: `Track a repair ticket or claim through received, diagnosed, in-progress, and completed. Reuse the dot states for any multi-stage workflow.` },
      { title: 'Onboarding and account setup', text: `Show provisioning progress for a new account. For interactive multi-step flows, pair with a [stepper](/ui-snippets/stepper/) or [progress wizard](/ui-snippets/progress-wizard/).` },
      { title: 'Application and approval pipelines', text: `Loan, visa, or job-application stages where applicants want to see exactly where their case stands and what happens next.` },
      { title: 'Project milestone history', text: `Use it as a read-only history of events with timestamps, similar to a [vertical timeline](/ui-snippets/vertical-timeline/) but with completion states.` },
    ],
    faqs: [
      { q: 'How do I drive the timeline from real tracking data?', a: `Map your carrier's status codes to step indices, set \`current\` to the latest reached step, and call \`render()\`. For live updates, subscribe to a websocket or poll a tracking endpoint; each message just updates \`current\` and the timestamps, then re-renders — no other code changes.` },
      { q: 'How do I make the timeline horizontal?', a: `Switch the \`.ot-timeline\` layout to a row, lay the rail horizontally, and animate \`.ot-rail-fill\` \`width\` instead of \`height\`. The \`render\` logic stays identical — only the axis the percentage applies to changes. Horizontal works well on wide desktop layouts; vertical is better on mobile.` },
      { q: 'How do I handle an exception like a failed delivery?', a: `Add an \`.error\` state class with a red dot and an alert icon, and a status like "Delivery attempt failed". In \`render\`, branch when the current step carries an error flag so the rail stops at that point and the pill turns red, prompting the customer to take action.` },
      { q: 'Is the timeline accessible to screen readers?', a: `Wrap the timeline in an \`aria-live="polite"\` region so advances are announced, mark completed steps with visually-hidden "completed" text and the current step with "in progress", and ensure the status pill text conveys state without relying on colour alone. The checkmarks should have an \`aria-hidden\` since the text already states completion.` },
      { q: 'How do I use this order tracking timeline in React, Vue, or Angular?', a: `In React, hold \`current\` in \`useState\` and derive each step's class from its index versus \`current\`; set the rail height from a computed percentage in the style prop. In Vue, use a \`ref\` for \`current\` and \`:class\`/\`:style\` bindings in a \`v-for\`. In Angular, track \`current\` on the component and bind \`[class.done]\`/\`[class.active]\`. The rail and pulse CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to mentally simulate every stage transition to understand this component. Paste its HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely how the single current index drives the rail-fill height percentage, the done and active class assignment, and the status pill text all from one render call, or why the active dot's pulse is a pure CSS box-shadow keyframe rather than a JavaScript-driven animation. The same assistant can help you optimize it, for instance considering whether re-querying all step elements on every render matters once a timeline has dozens of stages versus caching the node list once. It is also useful for extending the effect: ask it to add an error or exception state for a failed delivery stop, wire advanceStatus up to a real websocket message instead of a button click, or make the rail and steps lay out horizontally for a wide desktop card. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "order tracking timeline" in plain HTML, CSS, and JavaScript with no framework — a single numeric index and one render function must drive the entire visual state.

Requirements:
- A vertical list of stage steps (e.g. order placed, packed, shipped, out for delivery, delivered), each with a dot and a title/timestamp, plus a background rail behind the dots and a colored fill element on top of the rail.
- Track the currently reached stage as a single zero-based index variable. A render function must, on every call: mark every step before the current index as done (giving it a completed style and revealing a checkmark icon inside its dot), mark the step at the current index as active (a distinct color and a looping pulse), and leave the rest in a neutral pending style.
- The rail-fill element's height must be set as a CSS percentage computed from current divided by (total steps minus 1), and that height change must animate smoothly via a CSS transition (not a JS-driven frame loop), so advancing a stage visibly grows the fill.
- The completed checkmark icon inside each done dot must animate in from a smaller scale and zero opacity to full scale and opacity — do not just toggle display or opacity alone.
- The current stage's dot must have a continuously looping pulse implemented purely as a CSS box-shadow keyframe animation (expanding and fading ring), not a setInterval or requestAnimationFrame loop.
- A button must call a function that increments the current index by one, writes in a real timestamp string for the newly reached step (replacing a "Pending" placeholder), and calls render again; once the last stage is reached, the button must disable itself and change its label to indicate completion.
- A status pill near the top must always mirror the current stage's label text and switch to a distinct completed color once the last stage is reached.`,
    },
  },
};

export default orderTrackingTimeline;
