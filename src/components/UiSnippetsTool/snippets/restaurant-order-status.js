const restaurantOrderStatus = {
  id: 'restaurant-order-status',
  title: 'Restaurant Order Status Tracker',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="ros-card">
  <div class="ros-head">
    <span class="ros-order-id">Order #4821</span>
    <span class="ros-eta" id="rosEta">Ready in ~12 min</span>
  </div>

  <ol class="ros-steps" id="rosSteps">
    <li class="ros-step" data-step="received">
      <span class="ros-dot"><span class="ros-pulse"></span></span>
      <span class="ros-label">Received</span>
    </li>
    <li class="ros-step" data-step="preparing">
      <span class="ros-dot"><span class="ros-pulse"></span></span>
      <span class="ros-label">Preparing</span>
    </li>
    <li class="ros-step" data-step="ready">
      <span class="ros-dot"><span class="ros-pulse"></span></span>
      <span class="ros-label">Ready</span>
    </li>
    <li class="ros-step" data-step="delivered">
      <span class="ros-dot"><span class="ros-pulse"></span></span>
      <span class="ros-label">Delivered</span>
    </li>
  </ol>

  <p class="ros-note" id="rosNote">Your order has been sent to the kitchen.</p>

  <div class="ros-controls">
    <button type="button" class="ros-btn" id="rosBack">Back</button>
    <button type="button" class="ros-btn ros-btn-primary" id="rosNext">Advance status</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0f10;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ros-card{width:100%;max-width:480px;background:#12181a;border:1px solid #22302f;border-radius:20px;padding:26px 24px}
.ros-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:26px}
.ros-order-id{font-size:13px;font-weight:700;color:#8ea3a1;letter-spacing:.03em}
.ros-eta{font-size:12.5px;font-weight:700;color:#34d399;background:#0e2a22;padding:5px 11px;border-radius:999px}
.ros-steps{list-style:none;display:flex;align-items:flex-start;position:relative;margin-bottom:22px}
.ros-step{flex:1;display:flex;flex-direction:column;align-items:center;gap:10px;position:relative;text-align:center}
.ros-step::before{content:'';position:absolute;top:11px;left:-50%;width:100%;height:2px;background:#22302f;z-index:0}
.ros-step:first-child::before{display:none}
.ros-step.ros-done::before{background:#34d399}
.ros-dot{position:relative;width:24px;height:24px;border-radius:50%;background:#1a2426;border:2px solid #2a3a38;display:flex;align-items:center;justify-content:center;z-index:1;transition:background .3s ease,border-color .3s ease}
.ros-pulse{width:8px;height:8px;border-radius:50%;background:#4b5b59}
.ros-step.ros-done .ros-dot{background:#34d399;border-color:#34d399}
.ros-step.ros-done .ros-pulse{background:#0c0f10}
.ros-step.ros-active .ros-dot{border-color:#34d399}
.ros-step.ros-active .ros-pulse{background:#34d399;animation:rosPulse 1.4s ease-in-out infinite}
.ros-step.ros-active .ros-dot::after{content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid #34d399;opacity:.5;animation:rosRing 1.4s ease-out infinite}
@keyframes rosPulse{0%,100%{transform:scale(1);opacity:1}50%{transform:scale(1.3);opacity:.7}}
@keyframes rosRing{0%{transform:scale(.8);opacity:.6}100%{transform:scale(1.6);opacity:0}}
.ros-label{font-size:11.5px;font-weight:600;color:#657775}
.ros-step.ros-done .ros-label,.ros-step.ros-active .ros-label{color:#fff}
.ros-note{font-size:13px;color:#8ea3a1;text-align:center;margin-bottom:22px;min-height:18px}
.ros-controls{display:flex;gap:10px}
.ros-btn{flex:1;padding:11px;border-radius:11px;border:1px solid #22302f;background:transparent;color:#e2e8e6;font-size:13px;font-weight:600;cursor:pointer;transition:background .15s ease}
.ros-btn:hover:not(:disabled){background:#1a2426}
.ros-btn:disabled{opacity:.35;cursor:not-allowed}
.ros-btn-primary{background:#1a5c47;border-color:#1a5c47;color:#fff}
.ros-btn-primary:hover:not(:disabled){background:#1f6d54}`,

  js: `const steps = Array.from(document.querySelectorAll('.ros-step'));
const noteEl = document.getElementById('rosNote');
const etaEl = document.getElementById('rosEta');
const backBtn = document.getElementById('rosBack');
const nextBtn = document.getElementById('rosNext');

const notes = [
  'Your order has been sent to the kitchen.',
  'The kitchen is preparing your food.',
  'Your order is ready for pickup.',
  'Your order has been delivered. Enjoy!',
];
const etas = ['Ready in ~18 min', 'Ready in ~12 min', 'Ready now', 'Delivered'];

let current = 0;

function render() {
  steps.forEach((step, index) => {
    step.classList.toggle('ros-done', index < current);
    step.classList.toggle('ros-active', index === current);
  });
  noteEl.textContent = notes[current];
  etaEl.textContent = etas[current];
  backBtn.disabled = current === 0;
  nextBtn.disabled = current === steps.length - 1;
  nextBtn.textContent = current === steps.length - 1 ? 'Completed' : 'Advance status';
}

nextBtn.addEventListener('click', () => {
  if (current < steps.length - 1) {
    current += 1;
    render();
  }
});

backBtn.addEventListener('click', () => {
  if (current > 0) {
    current -= 1;
    render();
  }
});

render();`,

  seo: {
    title: 'Restaurant Order Status Tracker — Free Animated Step Tracker',
    description: `A horizontal order status stepper — Received, Preparing, Ready, Delivered — with an animated pulsing active step and an estimated-time note. Plain HTML, CSS & JS.`,
    about: {
      title: 'Restaurant Order Status Tracker — A Pulsing Horizontal Stepper',
      description: `The restaurant order status tracker is the horizontal progress bar food delivery and pickup apps use to show where an order stands — Received, Preparing, Ready, Delivered — with the current step visibly pulsing and an estimated time note underneath. This snippet builds it in plain HTML, CSS, and JavaScript, no dependencies.

**Three step states, one class each**

Every step in the \`<ol>\` can be plain, \`.ros-done\`, or \`.ros-active\`. \`render()\` derives all three purely from a single \`current\` index — steps before it get \`.ros-done\`, the step at it gets \`.ros-active\`, everything else stays unstyled. Connecting lines between steps use a \`.ros-done\` check on each step's own \`::before\` pseudo-element, so the line-fill and dot-fill both track the same index without extra bookkeeping.

**A pulsing active step, built from two animations**

The active dot layers two effects: an inner \`.ros-pulse\` dot that scales up and down on a 1.4s loop, and an outer \`::after\` ring that expands and fades outward like a sonar ping. Both are pure CSS \`@keyframes\` running only while \`.ros-active\` is present, so the pulse starts and stops automatically as \`current\` changes — no \`setInterval\` needed to manage it.

**An ETA that changes with status**

The pill in the header and the note below the stepper both read from parallel arrays (\`etas\`, \`notes\`) indexed by \`current\`, so advancing the status updates the copy and the time estimate together — "Ready in ~18 min" while preparing, "Ready now" once ready, "Delivered" at the end.

**Demo controls you'd replace with real events**

The Back/Advance buttons exist so you can see every state in this demo; in production you'd call \`render()\` (after updating \`current\`) from your own order-status webhook or polling handler instead of a click. The Advance button disables and relabels itself "Completed" once the order reaches the final step.

**Customizing it**

Add a fifth step for multi-stage delivery (Preparing → Out for delivery → Delivered), swap the dot pulse for a different loading indicator, or connect the note text to real kitchen timing data. Pair it with an [order tracking timeline](/ui-snippets/order-tracking-timeline/), [order summary](/ui-snippets/order-summary/), or a [menu item customizer](/ui-snippets/menu-item-customizer/) upstream in the ordering flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A four-step order tracker renders at "Received".` },
      { title: 'Click Advance status', text: `The active step pulses and the note/ETA update.` },
      { title: 'Watch completed steps fill', text: `Past steps and their connecting lines turn green.` },
      { title: 'Reach Delivered', text: `The advance button disables and reads "Completed".` },
      { title: 'Wire real events', text: `Call render() after updating current from your own data.` },
      { title: 'Add or rename steps', text: `Extend the steps list, notes, and etas arrays together.` },
    ] },
    features: [
      { title: 'Index-driven state', text: `One current index derives every step's class.` },
      { title: 'Layered pulse animation', text: `Inner dot scale plus an outward sonar ring.` },
      { title: 'Auto-managed animation', text: `Pulse starts/stops with the active class alone.` },
      { title: 'Progressive connecting line', text: `Fills as each step completes.` },
      { title: 'Synced ETA and note copy', text: `Parallel arrays keyed by the same index.` },
      { title: 'Self-disabling controls', text: `Advance/back disable at each end of the flow.` },
      { title: 'Semantic ordered list', text: `Built on ol/li for order and accessibility.` },
      { title: 'Zero dependencies', text: `Plain HTML, CSS, and JS, no CDN.` },
    ],
    useCases: [
      { title: 'Food delivery apps', text: `Follow an [order summary](/ui-snippets/order-summary/).` },
      { title: 'Restaurant pickup screens', text: `Show status on an in-store display.` },
      { title: 'Order tracking pages', text: `A sibling of [order tracking timeline](/ui-snippets/order-tracking-timeline/).` },
      { title: 'Kitchen display systems', text: `Reuse the pulse for an active-ticket indicator.` },
      { title: 'Coffee shop apps', text: `Track a drink from order to pickup.` },
      { title: 'Catering order pages', text: `Show multi-step prep status to a customer.` },
    ],
    faqs: [
      { q: 'How does one variable drive the whole tracker?', a: `render() reads a single current index and derives every step's visual state from a comparison against it — indexes below current get the ros-done class, the index equal to current gets ros-active, and everything else is untouched. The connecting lines and dot fills both read the same ros-done class, so nothing can fall out of sync.` },
      { q: 'How is the pulsing animation built?', a: `The active dot layers two independent CSS keyframe animations: an inner .ros-pulse element that scales and fades on a loop, and an outer ::after ring pseudo-element that expands outward and fades like a sonar ping. Both only run while the parent carries the ros-active class, so they start and stop automatically as the class is toggled.` },
      { q: 'How do the ETA and note text stay in sync with the step?', a: `Two parallel arrays, notes and etas, are indexed by the same current variable that drives the step states, so advancing the status updates the header pill and the note paragraph in the same render() call that updates the stepper — there's only one source of truth for "what step are we on".` },
      { q: 'How do I connect this to real order-status updates?', a: `Replace the Back/Advance button handlers with your own event source — a webhook payload, a polling interval, or a websocket message — that sets current to the appropriate step index (0 for Received through 3 for Delivered) and calls render(). The demo buttons are only there so you can preview every state.` },
      { q: 'Can I add a fifth step like "Out for delivery"?', a: `Yes — add a new li.ros-step with its own data-step value in the HTML, and add matching entries to the notes and etas arrays at the same index. render() and the CSS rules are generic over the number of steps, so no other logic changes are required.` },
    ],
    aiPrompt: {
      paragraph: `Instead of working out the animation timing and state logic on your own, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how a single current index drives every step's done/active class in render(), and how the active dot's pulse is built from two separate CSS keyframe animations (an inner scaling dot and an outer expanding ring) that only run while the ros-active class is present. It's also useful for extending the pattern — ask it to add a fifth "Out for delivery" step, connect the tracker to a websocket or polling handler instead of the demo buttons, or replace the pulse with a different loading indicator. Use it to adapt the state-driving logic to your real order pipeline.`,
      prompt: `Build a "restaurant order status tracker" horizontal stepper in plain HTML, CSS, and JavaScript with no external dependencies.

Requirements:
- An order header showing an order ID and an ETA pill that updates with the status.
- A horizontal ordered list of four steps (Received, Preparing, Ready, Delivered), each with a dot and a label, connected by a horizontal line between steps.
- Drive all step states from a single current index variable (0-3): steps before current should show a "done" style (filled dot, filled connecting line, brighter label), the step at current should show an "active" style, and later steps stay in a neutral/dim style.
- The active step's dot should visibly pulse — implement this as two layered CSS keyframe animations: an inner dot that scales up and down in a loop, and an outer ring pseudo-element that expands outward and fades like a sonar ping — both driven purely by the "active" class being present, with no setInterval needed to start/stop them.
- A status note paragraph and the ETA pill should both update their text based on the current step index, using parallel arrays of copy indexed the same way as the steps.
- Back and Advance buttons for demo purposes that decrement/increment the current index and re-render; the Advance button should disable itself and read "Completed" once the last step is reached, and Back should disable at the first step.`,
    },
  },
};

export default restaurantOrderStatus;
