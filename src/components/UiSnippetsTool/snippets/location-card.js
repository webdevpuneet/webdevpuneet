const locationCard = {
  id: 'location-card',
  title: 'Location & Address Card',
  lastmod: '2026-06-13',
  category: 'cards',
  html: `<div class="demo">
  <div class="lcard">
    <!-- Map background with CSS grid pattern -->
    <div class="map-area">
      <div class="map-grid"></div>
      <div class="map-roads">
        <div class="road road-h" style="top:30%"></div>
        <div class="road road-h" style="top:55%"></div>
        <div class="road road-h" style="top:75%"></div>
        <div class="road road-v" style="left:25%"></div>
        <div class="road road-v" style="left:55%"></div>
        <div class="road road-v" style="left:78%"></div>
        <div class="road road-h road-main" style="top:43%"></div>
        <div class="road road-v road-main" style="left:42%"></div>
      </div>
      <div class="map-blocks">
        <div class="block" style="top:8%;left:6%;width:16%;height:18%"></div>
        <div class="block" style="top:8%;left:28%;width:10%;height:12%"></div>
        <div class="block" style="top:8%;left:60%;width:18%;height:22%"></div>
        <div class="block" style="top:60%;left:6%;width:14%;height:12%"></div>
        <div class="block" style="top:60%;left:28%;width:10%;height:16%"></div>
        <div class="block" style="top:60%;left:60%;width:16%;height:12%"></div>
        <div class="block" style="top:60%;left:82%;width:12%;height:18%"></div>
      </div>
      <div class="map-pin">
        <div class="pin-drop">
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none">
            <path d="M10 0C4.48 0 0 4.48 0 10c0 7.5 10 14 10 14s10-6.5 10-14c0-5.52-4.48-10-10-10z" fill="#ef4444"/>
            <circle cx="10" cy="10" r="4" fill="#fff"/>
          </svg>
        </div>
        <div class="pin-pulse"></div>
      </div>
    </div>

    <!-- Info panel -->
    <div class="info-panel">
      <div class="info-top">
        <div class="location-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
        </div>
        <div class="location-meta">
          <div class="location-name">webdevpuneet.com HQ</div>
          <div class="location-type">Tech Campus</div>
        </div>
        <div class="distance-pill">0.4 mi away</div>
      </div>

      <address class="address-block">
        <div class="addr-line">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
          340 Pine Street, Suite 800
        </div>
        <div class="addr-line">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Mon–Fri, 9:00 AM – 6:00 PM
        </div>
        <div class="addr-line">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          +1 (415) 555-0192
        </div>
      </address>

      <div class="action-row">
        <button class="btn-dir" onclick="handleDir()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
          Directions
        </button>
        <button class="btn-share" onclick="handleShare()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          Share
        </button>
        <button class="btn-save" id="saveBtn" onclick="handleSave()">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Save
        </button>
      </div>
    </div>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f1f5f9; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }
.demo { width: 100%; max-width: 340px; }
.lcard { background: #fff; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); overflow: hidden; }

/* Map */
.map-area { position: relative; height: 180px; background: #e8f0e8; overflow: hidden; }
.map-grid { position: absolute; inset: 0; background-image: linear-gradient(rgba(0,0,0,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,0,0,0.04) 1px,transparent 1px); background-size: 20px 20px; }
.map-roads { position: absolute; inset: 0; }
.road { position: absolute; background: #fff; }
.road-h { left: 0; right: 0; height: 4px; }
.road-v { top: 0; bottom: 0; width: 4px; }
.road-main { background: #fde68a; }
.road-h.road-main { height: 7px; }
.road-v.road-main { width: 7px; }
.map-blocks { position: absolute; inset: 0; }
.block { position: absolute; background: #d1fae5; border-radius: 2px; border: 1px solid #a7f3d0; }
.map-pin { position: absolute; top: 42%; left: 42%; transform: translate(-50%,-50%); z-index: 5; }
.pin-drop { animation: pinDrop 0.5s ease 0.3s both; }
@keyframes pinDrop { from { transform: translateY(-20px); opacity:0; } to { transform: none; opacity:1; } }
.pin-pulse { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 20px; height: 6px; background: rgba(0,0,0,0.15); border-radius: 50%; animation: shadow 2s ease-in-out infinite; }
@keyframes shadow { 0%,100%{transform:translateX(-50%) scale(1);opacity:0.3} 50%{transform:translateX(-50%) scale(0.8);opacity:0.15} }

/* Info panel */
.info-panel { padding: 16px 18px; }
.info-top { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.location-icon { width: 34px; height: 34px; border-radius: 10px; background: #fef2f2; color: #ef4444; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.location-meta { flex: 1; }
.location-name { font-size: 14px; font-weight: 700; color: #111827; }
.location-type { font-size: 11px; color: #6b7280; }
.distance-pill { font-size: 10px; font-weight: 700; background: #f0fdf4; color: #16a34a; padding: 3px 9px; border-radius: 20px; flex-shrink: 0; }
.address-block { font-style: normal; display: flex; flex-direction: column; gap: 7px; margin-bottom: 14px; }
.addr-line { display: flex; align-items: center; gap: 7px; font-size: 12px; color: #4b5563; }
.addr-line svg { color: #9ca3af; flex-shrink: 0; }
.action-row { display: flex; gap: 8px; }
.btn-dir { flex: 1; display: flex; align-items: center; justify-content: center; gap: 5px; padding: 9px 0; background: #ef4444; color: #fff; border: none; border-radius: 10px; font-size: 12px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.btn-dir:hover { background: #dc2626; }
.btn-share, .btn-save { display: flex; align-items: center; justify-content: center; gap: 5px; padding: 9px 12px; border: 1.5px solid #e5e7eb; border-radius: 10px; background: #fff; color: #374151; font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-share:hover { border-color: #6366f1; color: #6366f1; }
.btn-save:hover { border-color: #ef4444; color: #ef4444; }
.btn-save.saved { background: #fef2f2; border-color: #ef4444; color: #ef4444; }`,

  js: `function handleDir() {
  const addr = '340+Pine+Street+Suite+800';
  window._demoAction = 'Opening directions for ' + addr;
  const btn = document.querySelector('.btn-dir');
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Opening...';
  setTimeout(() => { btn.innerHTML = orig; }, 1500);
}
function handleShare() {
  const btn = document.querySelector('.btn-share');
  const orig = btn.innerHTML;
  btn.innerHTML = '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg> Copied!';
  btn.style.borderColor = '#6366f1';
  btn.style.color = '#6366f1';
  setTimeout(() => { btn.innerHTML = orig; btn.style.borderColor = ''; btn.style.color = ''; }, 1800);
}
let saved = false;
function handleSave() {
  saved = !saved;
  const btn = document.getElementById('saveBtn');
  if (saved) {
    btn.classList.add('saved');
    btn.querySelector('svg').setAttribute('fill','#ef4444');
    btn.innerHTML = btn.innerHTML.replace('Save','Saved');
  } else {
    btn.classList.remove('saved');
    btn.querySelector('svg').setAttribute('fill','none');
    btn.innerHTML = btn.innerHTML.replace('Saved','Save');
  }
}`,

  seo: {
    title: 'Location & Address Card — Map Pin HTML CSS Snippet',
    description: 'Location card with a CSS-drawn map, animated pin drop, address details, distance badge, and action buttons. Pure HTML CSS JS — exports to React, Vue & Angular.',
    about: {
      title: `Location & Address Card — CSS-Drawn Map, Animated Pin Drop & Directions Actions`,
      description: `A location card presents an address in a visually rich format — more engaging than plain text, less complex than a full embedded map. It combines a decorative map background, a prominent pin marker, structured address details, and action buttons for directions, sharing, and saving. This pattern is common on restaurant pages, contact pages, event listings, and store finder tools.\n\n**CSS-drawn map background**\n\nThe map is rendered entirely in CSS without any map SDK or external tiles. The technique layers three elements: a grid background using \`background-image: linear-gradient\` repeating at 20px intervals for the map grid lines; absolutely-positioned \`.road\` divs (horizontal and vertical, with a thicker yellow variant for main roads); and \`.block\` divs representing buildings with a light green fill. This produces a convincing simplified map aesthetic that is lightweight, privacy-friendly (no Google Maps API key needed), and fully customisable.\n\n**Pin drop animation**\n\nThe map pin uses \`@keyframes pinDrop\`: the pin starts 20px above its final position with opacity 0, then drops into place over 0.5s with an \`ease\` curve after a 0.3s delay (allowing the card to render before the pin draws attention). A separate \`@keyframes shadow\` animates a small elliptical shadow below the pin, scaling and fading in sync with a bouncing motion to sell the depth illusion.\n\n**Distance badge**\n\nA green pill badge showing "0.4 mi away" sits in the top-right of the info panel. In production, this would be calculated from the user's geolocation using the Haversine formula: \`Math.acos(sin(lat1)*sin(lat2) + cos(lat1)*cos(lat2)*cos(lon2-lon1)) * 6371\`. The badge uses semantic green colouring (\`#f0fdf4\` background, \`#16a34a\` text) to reinforce "close = good".\n\n**Address block structure**\n\nThe address uses the HTML \`<address>\` element (semantically correct for contact information) styled as a flex column. Each \`.addr-line\` pairs a small SVG icon with its text using \`display:flex; gap:7px\`. The icons (home, clock, phone) provide at-a-glance parsing of address vs. hours vs. phone number — users can scan to the icon they need rather than reading each line.\n\n**Save button toggle state**\n\nThe save button toggles between save and saved states. In the saved state, the \`.saved\` class adds a red border and background (\`#fef2f2\`), and the SVG heart fill changes to red by setting the \`fill\` attribute in JavaScript. The text changes from "Save" to "Saved" via innerHTML string replacement. In production, persist saved state to \`localStorage\` so it survives page refresh.\n\n**React integration**\n\nAccept props: \`name\`, \`type\`, \`address\`, \`hours\`, \`phone\`, \`lat\`, \`lng\`, \`distance\`. Calculate pin position from lat/lng relative to a bounding box. Use \`useState(false)\` for saved state. The directions button opens \`https://www.google.com/maps/dir/?api=1&destination=\${encodeURIComponent(address)}\` in a new tab.\n\nSee also the [event card snippet](/ui-snippets/event-card/) for cards with date and venue, the [profile card snippet](/ui-snippets/profile-card/) for person-based cards, and the [sticky promo bar snippet](/ui-snippets/sticky-promo-bar/) for location-aware banners.`
    },
    howToUse: [
      { title: 'Copy the HTML structure', text: 'The card has two main sections: .map-area (CSS map background with pin) and .info-panel (address details and action buttons). Both are required.' },
      { title: 'Update location details', text: 'Change .location-name, .location-type, .distance-pill, and the three .addr-line texts for address, hours, and phone number.' },
      { title: 'Add the CSS', text: 'Paste the CSS block. The map colours (road yellow, building green, grid gray) can be customised by changing the colour values in .road-main, .block, and .map-grid.' },
      { title: 'Wire up the directions button', text: 'In handleDir(), replace the demo action with window.open("https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(yourAddress), "_blank").' },
      { title: 'Persist saved state', text: 'In handleSave(), read/write to localStorage: localStorage.setItem("saved_location_X", saved) to remember the saved state across page loads.' }
    ],
    features: [
      'CSS-drawn map with grid, roads, and building blocks',
      'Animated pin drop with shadow bounce on load',
      'Distance pill badge in semantic green',
      'Structured address with icon-paired lines',
      'Three action buttons: Directions, Share, Save',
      'Save button toggles with filled heart icon and red state',
      'Share button shows "Copied!" confirmation',
      'Zero dependencies — pure HTML, CSS, JavaScript'
    ],
    useCases: [
      { icon: '🍽️', title: 'Restaurant location sections', desc: 'Show where a restaurant is on its website, using a CSS-drawn map with roads and building blocks plus an animated pin drop with a shadow bounce.' },
      { icon: '🏢', title: 'Contact page office cards', desc: 'Present an office address with structured lines and icons, a distance badge in green and action buttons for directions or calling.' },
      { icon: '🎫', title: 'Event venue listings', desc: 'Show a venue on an event registration page, more engaging than plain text but far lighter than loading a full embedded map.' },
      { icon: '🏬', title: 'Retail store finder results', desc: 'Use as the individual card in a chain\'s store finder, with the distance pill telling shoppers which branch is nearest.' },
      { icon: 'CODE', title: 'Related: Vanilla-Tilt 3D Card Grid', desc: 'See the [Vanilla-Tilt 3D Card Grid](/ui-snippets/vanilla-tilt-3d-grid/) for a related cards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use this location card in React?', a: 'Accept name, address, hours, phone, and distance props. Use useState for saved state. In the directions handler, open a Google Maps URL with the encoded address.' },
      { q: 'How do I embed a real Google Map instead of the CSS map?', a: 'Replace .map-area contents with an <iframe src="https://www.google.com/maps/embed?pb=..."> set to 100% width and 180px height. Remove the CSS map styling.' },
      { q: 'How do I calculate real distance from user location?', a: 'Use navigator.geolocation.getCurrentPosition() to get user coords, then apply the Haversine formula against your location lat/lng. Update the distance-pill text with the result.' },
      { q: 'Can I show multiple locations in a list?', a: 'Yes — render multiple location cards in a grid or list. Highlight the nearest one (shortest distance) with a featured/active border style.' },
      { q: 'How do I export this location card to Vue, Angular, or Tailwind?', a: 'Open the Export menu (or the Test Exports preview) in the snippet toolbar. It generates a plain React component, a React + Tailwind version where the card, map, distance-badge, and button styles become utility classes, a Vue 3 single-file component, and an Angular standalone component. Each converter preserves the CSS-drawn map, the pin-drop and shadow animations, and the save/share button behaviour, so the card renders identically across React, Vue, and Angular. Pass name, type, address, hours, phone, lat, lng, and distance in as component props or inputs instead of hardcoding them in the markup, and keep the saved state in component state.' },
      { q: 'How do I wire the Share button to the native share sheet?', a: 'Replace the "Copied!" clipboard demo with the Web Share API: call navigator.share({ title: name, text: address, url: location.href }) inside the share handler, guarded by an if (navigator.share) check so it only runs where supported. On desktop browsers that lack it, fall back to navigator.clipboard.writeText() to copy the address and show the existing "Copied!" confirmation, so every user gets a working share action.' },
      { q: 'How do I make the card responsive on small screens?', a: 'The card uses a fixed max-width, so on narrow viewports wrap it in a container with width: 100% and a max-width media query. Reduce the .map-area height (for example from 180px to 130px below 480px), let the three action buttons wrap with flex-wrap, and shrink the address font slightly so the info panel stays readable on phones without horizontal scrolling.' },
      { q: 'How do I add structured data so the address appears in search results?', a: 'Wrap the card in JSON-LD using the LocalBusiness or Place schema with name, address (as a PostalAddress), telephone, openingHours, and geo (latitude and longitude) properties inside a <script type="application/ld+json"> tag. Search engines can then surface the address, hours, and a map pin directly in rich results — especially valuable on restaurant, store-finder, and event pages where local discovery drives most of the traffic.' }
    ],
    aiPrompt: {
      paragraph: `You do not need to piece together how the fake map reads as a map purely from the CSS. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the layered .map-grid background-image, the absolutely positioned .road divs, and the .block divs combine with the pinDrop and shadow keyframes to sell a believable simplified map with zero image requests. The same assistant can help optimize it, for instance asking whether the distance-pill value should be computed live from navigator.geolocation and the Haversine formula instead of being hardcoded, and where that calculation belongs in the load sequence. It is also useful for extending the card: ask it to wire the Share button to the real Web Share API with a clipboard fallback, persist the Save toggle to localStorage so it survives a refresh, or swap the CSS map for a real embedded map iframe while keeping the pin-drop animation on top of it. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "location and address card" in plain HTML, CSS, and JavaScript with no map SDK, no API key, and no external map tiles — the map itself must be drawn entirely from CSS.

Requirements:
- A map area built only from stacked divs: a repeating grid-line background using a CSS linear-gradient background-image at a fixed pixel interval, several absolutely positioned "road" strips (both horizontal and vertical, with at least one thicker "main road" variant in a different color), and several absolutely positioned rectangular "building block" divs with a light fill and border.
- A pin marker centered over the map, built from an SVG teardrop shape, that animates in on load with a keyframe dropping it from above into place with a fade-in, plus a separate small elliptical shadow beneath it that continuously scales and fades in a loop to sell depth.
- An info panel below the map containing: a location name and type, a distance pill badge, and a semantic HTML address element with three lines (street address, hours, phone), each line pairing a small inline SVG icon with its text.
- Three action buttons — Directions, Share, and Save — where clicking Directions temporarily swaps its icon and label to an "Opening..." confirmation before reverting, clicking Share swaps to a "Copied!" confirmation with a temporary color change before reverting, and clicking Save toggles a persistent saved visual state (changed border, background, and filled heart/save icon) that stays active until clicked again.
- The Save button's toggled state must be reflected in both a CSS class and the icon's fill attribute, and the button's visible text must swap between "Save" and "Saved" using simple string replacement on its own innerHTML.`,
    },
  }
};

export default locationCard;
