const mobileMapRideScreen = {
  id: 'mobile-map-ride-screen',
  title: 'Mobile Ride-Hailing Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mrd-phone">
  <div class="mrd-screen">
    <div class="mrd-map">
      <div class="mrd-status"><span>9:41</span><span class="mrd-batt"><i></i></span></div>
      <button class="mrd-back" aria-label="Back">&#8249;</button>
      <svg class="mrd-route" viewBox="0 0 260 320" preserveAspectRatio="none">
        <path d="M40 60 Q120 90 130 170 T210 250" fill="none" stroke="#6366f1" stroke-width="5" stroke-linecap="round" stroke-dasharray="6 10"/>
      </svg>
      <span class="mrd-pin from">A</span>
      <span class="mrd-pin to">B</span>
      <div class="mrd-car" id="mrdCar">🚗</div>
    </div>

    <div class="mrd-sheet">
      <div class="mrd-grip"></div>
      <div class="mrd-trip">
        <div class="mrd-tr"><span class="mrd-dot d1"></span><div><small>Pickup</small><b>Grand Central Station</b></div></div>
        <div class="mrd-tr"><span class="mrd-dot d2"></span><div><small>Drop-off</small><b>Brooklyn Museum</b></div></div>
      </div>

      <div class="mrd-tiers" id="mrdTiers">
        <button class="mrd-tier active" data-eta="4" data-price="14.50"><span class="mrd-ic">🚗</span><div class="mrd-tinfo"><b>Standard</b><small>4 min away</small></div><span class="mrd-tp">$14.50</span></button>
        <button class="mrd-tier" data-eta="3" data-price="22.00"><span class="mrd-ic">🚙</span><div class="mrd-tinfo"><b>Comfort</b><small>3 min away</small></div><span class="mrd-tp">$22.00</span></button>
        <button class="mrd-tier" data-eta="6" data-price="32.75"><span class="mrd-ic">🚘</span><div class="mrd-tinfo"><b>Premium</b><small>6 min away</small></div><span class="mrd-tp">$32.75</span></button>
      </div>

      <div class="mrd-pay">
        <span class="mrd-pic">VISA</span><span>•••• 4242</span><em>&#8250;</em>
      </div>
      <button class="mrd-confirm" id="mrdConfirm">Confirm <b id="mrdCTier">Standard</b> · <span id="mrdCPrice">$14.50</span></button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mrd-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mrd-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#eef1f6;color:#0f172a;display:flex;flex-direction:column;position:relative}

.mrd-map{flex:1;position:relative;background:#dbe3ec;overflow:hidden}
.mrd-map::before{content:'';position:absolute;inset:0;background-image:linear-gradient(#cdd7e2 1.5px,transparent 1.5px),linear-gradient(90deg,#cdd7e2 1.5px,transparent 1.5px);background-size:38px 38px;opacity:.7}
.mrd-map::after{content:'';position:absolute;left:-10%;top:20%;width:60%;height:32%;background:#cfe3cf;border-radius:40% 55% 45% 60%;opacity:.7}
.mrd-status{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700}
.mrd-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.mrd-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.mrd-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}
.mrd-back{position:absolute;top:44px;left:14px;z-index:3;width:34px;height:34px;border-radius:50%;background:#fff;border:none;font-size:20px;cursor:pointer;box-shadow:0 3px 10px -2px rgba(0,0,0,.25)}
.mrd-route{position:absolute;inset:0;width:100%;height:100%;z-index:1}
.mrd-pin{position:absolute;z-index:2;width:26px;height:26px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:800;font-size:11px;box-shadow:0 4px 8px rgba(0,0,0,.3)}
.mrd-pin span,.mrd-pin{line-height:1}
.mrd-pin.from{left:34px;top:52px;background:#22c55e}
.mrd-pin.to{right:44px;bottom:66px;background:#6366f1}
.mrd-pin::first-letter{transform:rotate(45deg)}
.mrd-car{position:absolute;left:38px;top:52px;z-index:3;font-size:22px;filter:drop-shadow(0 3px 4px rgba(0,0,0,.3));transition:none}

.mrd-sheet{background:#fff;border-radius:22px 22px 34px 34px;padding:8px 16px 16px;box-shadow:0 -8px 24px -12px rgba(15,23,42,.2);position:relative;z-index:4}
.mrd-grip{width:38px;height:4px;border-radius:99px;background:#e2e8f0;margin:4px auto 12px}
.mrd-trip{margin-bottom:12px}
.mrd-tr{display:flex;align-items:center;gap:12px;padding:5px 0;position:relative}
.mrd-tr:first-child::after{content:'';position:absolute;left:5px;top:24px;height:16px;width:2px;background:#e2e8f0}
.mrd-dot{width:12px;height:12px;border-radius:50%;flex-shrink:0}
.d1{background:#22c55e}.d2{background:#6366f1}
.mrd-tr small{font-size:10px;color:#94a3b8;text-transform:uppercase;letter-spacing:.4px}
.mrd-tr b{font-size:13px;display:block}

.mrd-tiers{display:flex;flex-direction:column;gap:8px;margin-bottom:12px}
.mrd-tier{display:flex;align-items:center;gap:11px;background:#f8fafc;border:2px solid transparent;border-radius:13px;padding:9px 12px;cursor:pointer;font-family:inherit;text-align:left}
.mrd-tier.active{border-color:#6366f1;background:#eef2ff}
.mrd-ic{font-size:22px;flex-shrink:0}
.mrd-tinfo{flex:1}
.mrd-tinfo b{font-size:13.5px}
.mrd-tinfo small{display:block;font-size:11px;color:#94a3b8}
.mrd-tp{font-size:14px;font-weight:800}

.mrd-pay{display:flex;align-items:center;gap:9px;padding:10px 12px;background:#f8fafc;border-radius:12px;font-size:12.5px;font-weight:600;margin-bottom:12px}
.mrd-pic{width:34px;height:22px;border-radius:5px;background:#1a1f71;color:#fff;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center}
.mrd-pay em{margin-left:auto;font-style:normal;color:#cbd5e1;font-size:18px}
.mrd-confirm{width:100%;background:#0f172a;color:#fff;border:none;border-radius:14px;padding:14px;font-size:14px;font-weight:700;cursor:pointer;transition:transform .15s,background .3s}
.mrd-confirm:active{transform:scale(.97)}
.mrd-confirm.matched{background:#16a34a}`,

  js: `var tiers = document.querySelectorAll('.mrd-tier');
var cTier = document.getElementById('mrdCTier');
var cPrice = document.getElementById('mrdCPrice');
var confirm = document.getElementById('mrdConfirm');
var car = document.getElementById('mrdCar');

tiers.forEach(function(tier){
  tier.addEventListener('click', function(){
    tiers.forEach(function(t){ t.classList.remove('active'); });
    tier.classList.add('active');
    cTier.textContent = tier.querySelector('b').textContent;
    cPrice.textContent = '$' + parseFloat(tier.getAttribute('data-price')).toFixed(2);
    confirm.classList.remove('matched');
    confirm.firstChild.textContent = 'Confirm ';
  });
});

confirm.addEventListener('click', function(){
  var name = cTier.textContent;
  confirm.classList.add('matched');
  confirm.firstChild.textContent = 'Finding your ';
  car.animate([
    { left:'38px', top:'52px' },
    { left:'150px', top:'150px' },
    { left:'196px', top:'250px' }
  ], { duration: 2200, fill:'forwards', easing:'ease-in-out' });
});`,

  seo: {
    title: 'Mobile Ride-Hailing Screen — Free HTML CSS JS UI',
    description: `A ride-booking screen with a CSS map, an animated route, ride-tier selection that updates the price, and a confirm button. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Ride-Hailing Screen — Ride Booking UI',
      description: `A ride-hailing screen has a signature split: a map filling the top with pins and a route, and a bottom sheet where you pick a ride tier and confirm. This snippet builds a complete, interactive one inside a CSS phone frame — with a gridded map drawn entirely in CSS, an animated dashed route, selectable ride tiers that update the confirm price, and a car that drives along the route when you book — in HTML, CSS, and vanilla JavaScript with no map library or API key.

**A map with no tiles**

The map is pure CSS: two repeating linear gradients cross to form the street grid via \`background-size\`, and a blobby \`::after\` with an organic \`border-radius\` suggests a park. The route is an inline SVG \`<path>\` with a quadratic curve and a \`stroke-dasharray\`, giving the dotted trip line without any external tiles — so the whole screen loads instantly and works offline, unlike a real map embed.

**Teardrop pins**

The pickup and drop-off pins use the classic map-marker shape made from a single element: a circle with three rounded corners and the fourth squared, rotated 45 degrees so the point faces down. Green marks the origin and indigo the destination, matching the dots in the trip summary below.

**Tier selection that drives the price**

Each ride tier is a button carrying \`data-price\` and \`data-eta\`. Selecting one moves an accent border and background to it and rewrites the confirm button's tier name and price from those attributes, so the call-to-action always reflects the current choice. Switching tiers also resets the confirm button out of its matched state — you would not want a stale "finding your Premium" label after changing your mind.

**Booking animates the car**

Tapping confirm turns the button green, changes its label to "Finding your …", and animates the car marker along a three-keyframe path from pickup toward drop-off using the Web Animations API with \`fill: 'forwards'\` so it holds at the destination. It is a lightweight way to convey "searching / en route" without a real GPS feed.

**Accessibility and performance**

Each ride tier is a real \`<button>\` and the confirm control is a button too, so the whole booking flow works from the keyboard and screen readers announce each option. When you adapt it, add \`aria-pressed\` to the selected tier so its chosen state is announced, and give the confirm button an \`aria-live\` region for the "finding your ride" status so the change is spoken, not just shown. The decorative map is inert — no focus traps, no listeners — so it never interferes with tabbing to the sheet controls. Performance is a strong point of the tile-free approach: the map is a handful of CSS gradients and one SVG path with no network requests, so it paints instantly and adds nothing to bundle size or runtime. The car animation runs through the Web Animations API, which the browser can composite off the main thread, and selecting a tier only rewrites two text nodes and toggles classes. For real geography you would swap in a map SDK, but the sheet, tiers, and confirm logic stay exactly as they are.

**Reusing it**

Swap the CSS map for your real map SDK, feed tiers and prices from your pricing API, and wire confirm to your booking endpoint. Keep the bottom-sheet pattern as-is — it is framework-agnostic. Present it inside a [phone mockup](/ui-snippets/phone-mockup/), or pair it with a [mobile map location card](/ui-snippets/location-card/) for a fuller navigation flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A ride screen renders with a CSS map, route, pins, and a bottom sheet of ride tiers.` },
      { title: 'Pick a ride tier', text: `Tap Standard, Comfort, or Premium — the selection border moves and the confirm price updates.` },
      { title: 'Read the confirm button', text: `It always shows the chosen tier name and its price so the action is unambiguous.` },
      { title: 'Confirm the ride', text: `The button turns green, switches to "Finding your…", and the car drives along the route.` },
      { title: 'Change your mind', text: `Selecting a different tier resets the confirm button out of its matched state.` },
      { title: 'Wire your backend', text: `Swap the CSS map for a real SDK and confirm against your booking API.` },
    ] },
    features: [
      { title: 'CSS-only map', text: `Street grid and park drawn with gradients — no tiles.` },
      { title: 'SVG dashed route', text: `A quadratic path with stroke-dasharray.` },
      { title: 'Teardrop pins', text: `Classic markers from a single rotated element.` },
      { title: 'Tier selection', text: `Accent border moves; price rewrites the CTA.` },
      { title: 'Attribute-driven price', text: `Confirm reads data-price and data-eta.` },
      { title: 'State reset', text: `Changing tier clears the matched confirm label.` },
      { title: 'Car animation', text: `Web Animations drives the car to the destination.` },
      { title: 'No dependency', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Ride-hailing booking screens', text: 'Split the screen into a tile-free CSS map above and a bottom sheet below, with the selected ride tier rewriting the price on the confirm button.' },
      { title: 'Delivery tracking views', text: 'Reuse the animated dashed route for an [order tracking timeline](/ui-snippets/order-tracking-timeline/), swapping ride tiers for courier stages.' },
      { title: 'Bottom sheet patterns', text: 'Study a ride-specific take on the [bottom sheet](/ui-snippets/bottom-sheet/), where the sheet holds tiers and the map keeps the route visible.' },
      { title: 'Location context cards', text: 'Pair with a [location card](/ui-snippets/location-card/) to show the pickup and drop-off addresses clearly beside the route on the map.' },
      { title: 'CSS map reference', text: 'Learn how a street grid and park are drawn using gradients alone, with teardrop pins made from a single rotated element and an SVG dashed route.' },
      { icon: 'CODE', title: 'Related: Mobile Food Order Screen', desc: 'See the [Mobile Food Order Screen](/ui-snippets/mobile-food-order-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is a real map library required?', a: `No. The map is drawn entirely in CSS: crossing linear-gradient backgrounds form the street grid and a blobby ::after suggests a park, while the route is an inline SVG path with a dashed stroke. This loads instantly and works offline. To use real geography, replace the map div with your map SDK and keep the bottom sheet unchanged.` },
      { q: 'How do the teardrop pins get their shape?', a: `Each pin is a single element with border-radius set to round three corners and square the fourth (50% 50% 50% 0), then rotated 45 degrees so the squared corner points downward. That produces the familiar map-marker teardrop from one div, with the letter counter-rotated to stay upright.` },
      { q: 'How does the confirm button always show the right price?', a: `Each tier button carries data-price and data-eta attributes. Selecting a tier reads those attributes and rewrites the tier name and price inside the confirm button, so the call to action reflects the current choice. It also clears the matched state so a previous booking label does not linger after you switch tiers.` },
      { q: 'What animates the car when I confirm?', a: `Confirm calls the Web Animations API on the car marker with a three-keyframe path from the pickup pin toward the drop-off pin, using fill: forwards so it holds at the end. It is a visual stand-in for a searching or en-route state; in production you would move the marker from real driver coordinates over a WebSocket.` },
      { q: 'How do I use this ride screen in React, Vue, or Angular?', a: `Render the tiers from data and hold the selected tier in state; derive the confirm label and price from it rather than editing the DOM. Bind the active class to the selection and the matched class to a booking flag. Replace element.animate with a driver-position stream and animate the marker via state or a ref. Tailwind expresses the map grid, pins, and sheet with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to guess how the tile-free map or the car animation actually work. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the crossing linear-gradient backgrounds form the street grid without any map tiles, or how the three-keyframe car.animate call with fill forwards keeps the car marker parked at its final position instead of snapping back. The same assistant can help optimize it — ask whether reading data-price and data-eta from the DOM on every tier click is the right pattern versus keeping tier data in a JavaScript array from the start, or how you would swap the CSS-drawn map for a real map SDK without breaking the bottom sheet's layout. It is just as useful for extending the feature: have it add a live ETA countdown once a ride is confirmed, support scheduling a ride for later instead of only now, or add a cancel-ride flow that reverses the confirmed state. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a mobile ride-hailing booking screen in plain HTML, CSS, and JavaScript inside a phone-frame container — no map SDK, no API key, no external tile service.

Requirements:
- Draw an entirely CSS-based map: use two crossing repeating linear-gradient backgrounds to form a street grid, and a separate softly-colored, irregularly-rounded shape to suggest a park or green space, with no image assets.
- Draw the trip route as an inline SVG path with a curved line and a dashed stroke-dasharray, and place two teardrop-shaped pin markers (a single element with three corners fully rounded, one corner squared, then rotated 45 degrees so the squared corner points down) in different accent colors for pickup and drop-off.
- A bottom sheet showing the pickup and drop-off addresses, a vertical list of selectable ride tiers where each tier button carries its own price and ETA as data attributes, and a payment method row.
- Selecting a ride tier must move a visible selection indicator (border and background) to the chosen tier and rewrite a confirm button's displayed tier name and price by reading that tier's data attributes, and switching tiers after a ride was already confirmed must reset the confirm button out of its confirmed state.
- Tapping confirm must change the button's label and background color to indicate a searching/matched state, then use the Web Animations API (element.animate, not CSS transitions) to move a car marker element through at least three keyframe positions approximating the route from pickup toward drop-off, holding at the final position once the animation completes.`,
    },
  },
};

export default mobileMapRideScreen;
