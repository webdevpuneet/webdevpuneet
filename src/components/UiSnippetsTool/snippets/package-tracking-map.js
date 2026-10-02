const packageTrackingMap = {
  id: 'package-tracking-map',
  title: 'Package Tracking Route',
  lastmod: '2026-08-22',
  category: 'dashboards',
  cdnUrls: [],
  html: `<div class="pt-card">
  <div class="pt-head">
    <div>
      <h2>Package #TRK-88213</h2>
      <p>Estimated delivery: <strong>Today, 6:30 PM</strong></p>
    </div>
    <span class="pt-badge">In transit</span>
  </div>

  <div class="pt-route" id="ptRoute">
    <div class="pt-line"><div class="pt-line-fill" id="ptLineFill"></div></div>
    <div class="pt-node pt-node--done" data-pct="0">
      <span class="pt-dot"></span>
      <span class="pt-node-label">Origin<br /><small>Newark, NJ</small></span>
    </div>
    <div class="pt-node pt-node--done" data-pct="33">
      <span class="pt-dot"></span>
      <span class="pt-node-label">Hub<br /><small>Columbus, OH</small></span>
    </div>
    <div class="pt-node pt-node--current" data-pct="66">
      <span class="pt-dot pt-dot--pulse"></span>
      <span class="pt-node-label">Hub<br /><small>Denver, CO</small></span>
    </div>
    <div class="pt-node" data-pct="100">
      <span class="pt-dot"></span>
      <span class="pt-node-label">Destination<br /><small>Boise, ID</small></span>
    </div>
    <div class="pt-package" id="ptPackage" title="Package location">📦</div>
  </div>

  <ul class="pt-timeline">
    <li class="pt-done"><span class="pt-tl-dot"></span><div><strong>Order placed</strong><time>Mon, 9:02 AM</time></div></li>
    <li class="pt-done"><span class="pt-tl-dot"></span><div><strong>Shipped</strong><time>Mon, 4:47 PM</time></div></li>
    <li class="pt-done"><span class="pt-tl-dot"></span><div><strong>In transit</strong><time>Tue, 11:15 AM</time></div></li>
    <li class="pt-active"><span class="pt-tl-dot"></span><div><strong>Out for delivery</strong><time>Pending</time></div></li>
    <li><span class="pt-tl-dot"></span><div><strong>Delivered</strong><time>—</time></div></li>
  </ul>
</div>`,

  css: `*{box-sizing:border-box}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0e17;color:#e6ebf5;padding:32px 16px;display:flex;justify-content:center;min-height:100vh;align-items:center}
.pt-card{width:100%;max-width:640px;background:#121826;border:1px solid #232c40;border-radius:16px;padding:24px}
.pt-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:28px}
.pt-head h2{font-size:17px;margin:0 0 4px}
.pt-head p{margin:0;font-size:13px;color:#8b95ab}
.pt-badge{background:#1d3a2e;color:#5fe0a0;font-size:12px;font-weight:700;padding:5px 12px;border-radius:999px;white-space:nowrap}
.pt-route{position:relative;display:flex;justify-content:space-between;padding:0 4px 8px;margin-bottom:32px}
.pt-line{position:absolute;top:9px;left:20px;right:20px;height:3px;background:#232c40;border-radius:3px}
.pt-line-fill{height:100%;width:66%;background:linear-gradient(90deg,#3d7bff,#5fe0a0);border-radius:3px;transition:width .6s ease}
.pt-node{position:relative;display:flex;flex-direction:column;align-items:center;gap:8px;z-index:1;flex:1}
.pt-dot{width:20px;height:20px;border-radius:50%;background:#1a2233;border:3px solid #384260;display:block}
.pt-node--done .pt-dot{background:#3d7bff;border-color:#3d7bff}
.pt-node--current .pt-dot{background:#5fe0a0;border-color:#5fe0a0}
.pt-dot--pulse{box-shadow:0 0 0 0 rgba(95,224,160,.6);animation:ptPulse 1.8s infinite}
@keyframes ptPulse{to{box-shadow:0 0 0 12px rgba(95,224,160,0)}}
.pt-node-label{font-size:11.5px;color:#9aa4ba;text-align:center;line-height:1.4}
.pt-node-label small{color:#5f6a83}
.pt-node--done .pt-node-label,.pt-node--current .pt-node-label{color:#dfe6f5}
.pt-package{position:absolute;top:-14px;left:66%;transform:translateX(-50%);font-size:22px;transition:left .6s ease;filter:drop-shadow(0 2px 4px rgba(0,0,0,.5))}
.pt-timeline{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:0}
.pt-timeline li{display:flex;align-items:flex-start;gap:12px;padding:10px 0;position:relative}
.pt-timeline li:not(:last-child)::after{content:'';position:absolute;left:5px;top:26px;bottom:-4px;width:2px;background:#232c40}
.pt-tl-dot{width:12px;height:12px;border-radius:50%;background:#232c40;flex-shrink:0;margin-top:4px}
.pt-timeline li.pt-done .pt-tl-dot{background:#3d7bff}
.pt-timeline li.pt-active .pt-tl-dot{background:#5fe0a0;box-shadow:0 0 0 4px rgba(95,224,160,.2)}
.pt-timeline strong{display:block;font-size:13.5px;color:#e6ebf5}
.pt-timeline li:not(.pt-done):not(.pt-active) strong{color:#68728a}
.pt-timeline time{font-size:12px;color:#6f7a92}`,

  js: `// Position the package emoji and the filled line based on the "current" node's data-pct.
const currentNode = document.querySelector('.pt-node--current');
const pkg = document.getElementById('ptPackage');
const lineFill = document.getElementById('ptLineFill');

function placePackage() {
  if (!currentNode) return;
  const pct = Number(currentNode.dataset.pct);
  pkg.style.left = pct + '%';
  lineFill.style.width = pct + '%';
}

placePackage();
window.addEventListener('resize', placePackage);`,

  seo: {
    title: 'Package Tracking Route — Free Shipment Progress Map Widget',
    description: `A horizontal shipment-route tracker showing origin, transit hubs, and destination as connected nodes with the package's live position, plus a status timeline with timestamps. Plain HTML, CSS & JS.`,
    about: {
      title: 'Package Tracking Route — A Shipment Map With a Status Timeline',
      description: `The package tracking route is the visual carriers and e-commerce order pages use to show a shipment's journey at a glance — origin, one or more transit hubs, and destination laid out on a horizontal line, with the package marked at its current position, backed by a chronological status list. This snippet builds it in plain HTML, CSS, and JavaScript.

**Nodes on a line, not a real map**

Rather than embedding a real map (which needs an API key and geodata), the route is four \`.pt-node\` elements spaced with \`justify-content: space-between\` over an absolutely positioned \`.pt-line\`. This keeps the widget dependency-free while still communicating "this is a journey with stops" clearly.

**A fill that shows progress**

\`.pt-line-fill\` is a second line, layered on top of the track, whose \`width\` is driven by the current node's \`data-pct\` attribute (a 0–100 position along the route). It's the same pattern as a progress bar, just applied along the route instead of a straight bar — everything before the current hub reads as "done."

**The package marker floats above the line**

The 📦 emoji is absolutely positioned and its \`left\` is set in JavaScript to match \`data-pct\` from the node marked \`.pt-node--current\`, so moving the package to a new stage is a one-line change (update the class and the script re-reads the new position on next run). A CSS \`transition\` on \`left\` animates the move.

**A pulsing "current" dot**

The current-hub dot uses a \`box-shadow\` keyframe animation that expands and fades — a common "live" indicator pattern — so the eye is drawn to where the package actually is without needing a live map.

**Status timeline below**

A vertical list mirrors the five standard shipment states — Order placed, Shipped, In transit, Out for delivery, Delivered — each with a timestamp. Completed steps get a filled dot and a connecting line in the brand blue; the active step gets a green glow; future steps stay dim, giving a clear "here's what's happened and what's next" read.

**Customizing it**

Add more transit hubs by inserting nodes with their own \`data-pct\`, wire the JS to update from a real tracking API response, or swap the emoji for an SVG truck/plane icon per leg. Pair it with a [delivery ETA card](/ui-snippets/delivery-eta-card/) or [order tracking timeline](/ui-snippets/order-tracking-timeline/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The route, timeline, and header render.` },
      { title: 'Mark the current node', text: `Add the pt-node--current class to a stop.` },
      { title: 'Set data-pct', text: `A 0–100 value positions the package on the line.` },
      { title: 'Update the timeline', text: `Toggle pt-done / pt-active as status changes.` },
      { title: 'Wire to your API', text: `Call placePackage() after updating the DOM.` },
    ] },
    features: [
      { title: 'Route as connected nodes', text: `Origin, hubs, and destination on one line.` },
      { title: 'Live package marker', text: `Positioned by a simple data-pct attribute.` },
      { title: 'Animated progress fill', text: `The line fills up to the current stop.` },
      { title: 'Pulsing current indicator', text: `A CSS keyframe draws the eye to "now."` },
      { title: 'Five-state timeline', text: `Order placed through Delivered, with times.` },
      { title: 'No map dependency', text: `No API key, no external tiles or scripts.` },
      { title: 'Smooth repositioning', text: `A CSS transition animates marker moves.` },
      { title: 'Responsive layout', text: `Flexbox nodes reflow on narrow screens.` },
    ],
    useCases: [
      { title: 'Order confirmation pages', text: 'Show a shipment\'s route right after checkout, with origin, transit hubs and destination on one line and the package marked by a `data-pct` position.' },
      { title: 'Logistics dashboards', text: 'Pair with a [status dashboard](/ui-snippets/status-dashboard/) so operations teams see each shipment\'s stage beside overall system health.' },
      { title: 'Courier apps', text: 'Combine with a [delivery ETA card](/ui-snippets/delivery-eta-card/) so the route and the arrival estimate sit together, with a pulsing marker on the current stop.' },
      { title: 'Customer support tools', text: 'Let agents see a shipment\'s stage at a glance while helping a customer, using the status timeline with timestamps for the exact history.' },
      { title: 'Marketplace order history', text: 'Sit alongside an [order tracking timeline](/ui-snippets/order-tracking-timeline/) in order history pages, with the progress line filling up to the current stop.' },
      { icon: 'CODE', title: 'Related: Unit Converter', desc: 'See the [Unit Converter](/ui-snippets/unit-converter/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a real map or geocoding?', a: `No. It's a stylized horizontal route made of positioned nodes and a fill line, not a real map with tiles or coordinates. This keeps it dependency-free and fast — swap in a real map library if you need actual geography.` },
      { q: 'How do I move the package to the next stop?', a: `Remove the pt-node--current class from the old node and add it to the new one (with its own data-pct), then call placePackage() again — it reads the currently marked node and repositions the marker and the fill line.` },
      { q: 'How do I add more transit hubs?', a: `Insert another .pt-node element between existing ones with a data-pct value between its neighbors, matching the flexbox spacing. The line and fill automatically span the full width regardless of node count.` },
      { q: 'Can I wire this to a real tracking API?', a: `Yes — after fetching a shipment status, toggle the pt-done/pt-active classes on the timeline items, move the pt-node--current class to the matching route node with the right data-pct, and call placePackage() to sync the visual position.` },
      { q: 'Is the pulsing dot accessible?', a: `The animation is purely decorative and doesn't convey information on its own — the "In transit" badge and timeline text carry the actual status, so screen reader users get the same information without relying on the animation.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the data-pct attribute on the current node drives both the package marker's position and the progress-fill line's width, and why this approach avoids needing a real map API. It can help you wire the widget to a real tracking webhook or polling endpoint, add more transit hubs dynamically from an array of stops, or replace the emoji marker with an animated SVG icon that changes per transport leg (truck, plane, ship). It's also useful for adding a "respects prefers-reduced-motion" variant that disables the pulse and transition animations.`,
      prompt: `Build a "package tracking route" widget in plain HTML, CSS, and JavaScript (no dependencies, no map library).

Requirements:
- A horizontal row of stop nodes (origin, one or more transit hubs, destination) evenly spaced along a connecting line, each with a small label (city/hub name).
- A second "fill" line layered on the track whose width represents progress along the route, driven by a numeric 0–100 position value stored as a data attribute on whichever node is marked as the current stop.
- A package icon/marker that is absolutely positioned above the line and whose horizontal position is set by JavaScript from that same current-stop data attribute, with a CSS transition so moving it animates smoothly.
- A subtle pulsing visual indicator (CSS keyframe animation, e.g. an expanding box-shadow) on the current stop's dot to draw attention to where the package is right now, but make sure the actual status is also conveyed in text (not only via the animation) for accessibility.
- Below the route, a vertical status timeline listing the standard shipment states (Order placed, Shipped, In transit, Out for delivery, Delivered) each with a timestamp, visually distinguishing completed steps, the currently active step, and future steps.
- Write the JS so that updating which stop is "current" (and re-running one repositioning function) is enough to move the marker and refill the line — do not hardcode pixel positions.`,
    },
  },
};

export default packageTrackingMap;
