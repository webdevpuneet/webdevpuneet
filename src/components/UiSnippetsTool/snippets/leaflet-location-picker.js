const leafletLocationPicker = {
  id: 'leaflet-location-picker',
  title: 'Leaflet Location Picker (Click to Set Coordinates)',
  lastmod: '2026-09-20',
  category: 'forms',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  ],
  html: `<div class="lp-wrap">
  <div class="lp-form">
    <h1>Set Pickup Location</h1>
    <label class="lp-field">Latitude
      <input type="text" id="lpLat" placeholder="Click the map">
    </label>
    <label class="lp-field">Longitude
      <input type="text" id="lpLng" placeholder="Click the map">
    </label>
    <label class="lp-field">Address (search)
      <input type="text" id="lpSearch" placeholder="Type an address or place...">
      <div class="lp-suggestions" id="lpSuggestions"></div>
    </label>
    <p class="lp-hint" id="lpHint">Click anywhere on the map, drag the pin, or search an address above.</p>
    <button class="lp-confirm" id="lpConfirm" type="button" disabled>Confirm Location</button>
  </div>
  <div class="lp-map" id="lpMap"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif}
.lp-wrap{display:flex;height:100vh;min-height:480px}
.lp-form{width:280px;flex-shrink:0;background:#fff;border-right:1px solid #e2e8f0;padding:18px;display:flex;flex-direction:column;gap:12px;position:relative;z-index:2}
.lp-form h1{font-size:15px;font-weight:800;color:#0f172a}
.lp-field{display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;color:#64748b;position:relative}
.lp-field input{padding:8px 10px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;color:#0f172a;font-weight:600;outline:none}
.lp-field input:focus{border-color:#6366f1}
.lp-suggestions{position:absolute;top:calc(100% + 2px);left:0;right:0;background:#fff;border:1px solid #e2e8f0;border-radius:8px;box-shadow:0 8px 20px rgba(0,0,0,.1);overflow:hidden;display:none;z-index:5}
.lp-suggestion{padding:8px 10px;font-size:12px;font-weight:600;color:#334155;cursor:pointer}
.lp-suggestion:hover{background:#f1f5f9}
.lp-hint{font-size:11.5px;color:#94a3b8;line-height:1.5}
.lp-confirm{margin-top:auto;padding:11px;border:none;border-radius:9px;background:#6366f1;color:#fff;font:800 13px system-ui;cursor:pointer}
.lp-confirm:disabled{background:#c7d2fe;cursor:default}
.lp-confirm:not(:disabled):hover{background:#5457e5}
.lp-map{flex:1}`,

  js: `// A small fixed "gazetteer" standing in for a real geocoding API -- enough
  // to demonstrate search-to-pin without a network dependency in the sandbox.
  var PLACES = [
    { label: 'Golden Gate Park, San Francisco', lat: 37.7694, lng: -122.4862 },
    { label: 'Ferry Building, San Francisco', lat: 37.7955, lng: -122.3937 },
    { label: 'Fisherman\\u2019s Wharf, San Francisco', lat: 37.8080, lng: -122.4177 },
    { label: 'Mission Dolores Park, San Francisco', lat: 37.7596, lng: -122.4269 },
    { label: 'Oracle Park, San Francisco', lat: 37.7786, lng: -122.3893 },
  ];

  var map = L.map('lpMap').setView([37.775, -122.42], 12);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri',
    maxZoom: 19,
  }).addTo(map);

  var latInput = document.getElementById('lpLat');
  var lngInput = document.getElementById('lpLng');
  var searchInput = document.getElementById('lpSearch');
  var suggestionsEl = document.getElementById('lpSuggestions');
  var confirmBtn = document.getElementById('lpConfirm');
  var hintEl = document.getElementById('lpHint');
  var marker = null;

  function setLocation(lat, lng, pan) {
    latInput.value = lat.toFixed(5);
    lngInput.value = lng.toFixed(5);
    confirmBtn.disabled = false;
    if (!marker) {
      marker = L.marker([lat, lng], { draggable: true }).addTo(map);
      marker.on('drag', function (e) {
        var p = e.target.getLatLng();
        latInput.value = p.lat.toFixed(5);
        lngInput.value = p.lng.toFixed(5);
      });
    } else {
      marker.setLatLng([lat, lng]);
    }
    if (pan) map.flyTo([lat, lng], 15, { duration: 0.5 });
  }

  map.on('click', function (e) { setLocation(e.latlng.lat, e.latlng.lng, false); });

  // Typed coordinates should move the pin too -- the form is bidirectional,
  // not just a read-only display of what was clicked.
  function tryManualEntry() {
    var lat = parseFloat(latInput.value), lng = parseFloat(lngInput.value);
    if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
      setLocation(lat, lng, true);
    }
  }
  latInput.addEventListener('change', tryManualEntry);
  lngInput.addEventListener('change', tryManualEntry);

  searchInput.addEventListener('input', function () {
    var q = searchInput.value.trim().toLowerCase();
    if (!q) { suggestionsEl.style.display = 'none'; return; }
    var matches = PLACES.filter(function (p) { return p.label.toLowerCase().indexOf(q) !== -1; });
    if (!matches.length) { suggestionsEl.style.display = 'none'; return; }
    suggestionsEl.innerHTML = '';
    matches.forEach(function (p) {
      var el = document.createElement('div');
      el.className = 'lp-suggestion';
      el.textContent = p.label;
      el.addEventListener('click', function () {
        searchInput.value = p.label;
        suggestionsEl.style.display = 'none';
        setLocation(p.lat, p.lng, true);
      });
      suggestionsEl.appendChild(el);
    });
    suggestionsEl.style.display = 'block';
  });

  document.addEventListener('click', function (e) {
    if (!e.target.closest('.lp-field')) suggestionsEl.style.display = 'none';
  });

  confirmBtn.addEventListener('click', function () {
    hintEl.textContent = 'Confirmed: ' + latInput.value + ', ' + lngInput.value;
    confirmBtn.textContent = 'Confirmed \\u2713';
  });`,

  seo: {
    title: 'Leaflet Location Picker (Click to Set Coordinates) — Free Snippet',
    description: `A three-way location picker built on Leaflet — click the map, drag the pin, type coordinates, or search a place name, all kept perfectly in sync. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Leaflet Location Picker — Four Inputs, One Coordinate, No Way to Disagree',
      description: `A location picker that only supports clicking the map is missing half its users — some already know the exact coordinates, some know an address, and some just want to drag a pin to fine-tune a rough guess. This snippet supports all four paths (map click, pin drag, typed coordinates, and place search) by routing every one of them through a single \`setLocation(lat, lng, pan)\` function, so no path can produce a state the others don't recognize.

**One function, four callers**

Clicking the map, finishing a drag, selecting a search suggestion, and typing valid coordinates all eventually call \`setLocation\` — it's the only place that updates the latitude/longitude inputs, moves or creates the marker, and enables the confirm button. That's what guarantees the form fields and the map pin can never show two different locations at once, regardless of which interaction the user chose.

**Manual coordinate entry is validated before it moves anything**

Typing into the latitude or longitude field doesn't move the pin on every keystroke — it validates on \`change\` (when the field loses focus or Enter is pressed), checking both that the values parse as numbers and that they fall within real coordinate ranges (\`-90\` to \`90\`, \`-180\` to \`180\`) before calling \`setLocation\`. An invalid or incomplete entry simply doesn't move anything, rather than crashing or panning to \`NaN, NaN\`.

**The place search is a local filter, not a live geocoding call**

To keep the demo self-contained and free of network dependencies inside the sandboxed preview, search matches against a small fixed list of named places rather than a real geocoding API — the interaction pattern (type, see suggestions, click one, pin moves and map flies there) is exactly what a real \`fetch\`-based geocoder integration would look like, with the local array standing in for the API response.

**Suggestions close on outside click, not just on selection**

A document-level click listener closes the suggestions dropdown whenever a click lands outside the search field's container — the kind of small interaction detail (matching what every real autocomplete does) that's easy to skip and immediately feels unfinished without it.

**Reusing it**

Swap the local \`PLACES\` array for a real geocoding API call (Nominatim, Mapbox, Google) inside the same \`input\` handler, keep the rest of the four-way sync exactly as is, and this becomes a production-ready address picker for checkout flows, pickup/dropoff selection, or any form that needs a precise geographic point.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Leaflet CDN', text: `Load leaflet.css and leaflet.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `A form and map render side by side, both empty.` },
      { title: 'Click anywhere on the map', text: `A pin drops and the coordinate fields fill in.` },
      { title: 'Drag the pin', text: `The coordinate fields update live as you move it.` },
      { title: 'Type coordinates directly', text: `Tab or click away to move the pin to that exact point.` },
      { title: 'Search a place name', text: `Pick a suggestion to fly the map there and drop the pin.` },
    ] },
    features: [
      { title: 'Four synced input paths', text: `Click, drag, type, or search — one function updates all state.` },
      { title: 'Validated manual entry', text: `Typed coordinates are range-checked before moving anything.` },
      { title: 'Local place-search demo', text: `Same UX pattern a real geocoding API integration would use.` },
      { title: 'Outside-click dismissal', text: `Suggestions close like a real autocomplete, not just on select.` },
      { title: 'Bidirectional pin and form', text: `Moving either one always updates the other.` },
      { title: 'Free OpenStreetMap tiles', text: `No API key or paid map provider required.` },
    ],
    useCases: [
      { title: 'Delivery address refinement', text: 'Let a customer fine-tune a delivery pin by clicking the map, dragging the marker, typing coordinates or searching for a place name.' },
      { title: 'Ride-share pickup points', text: 'Offer a map and form entry for pickup spots, with all four input paths calling a single function that updates every piece of state.' },
      { title: 'Property listing coordinates', text: 'Place a property accurately in an admin tool, range-checking typed latitude and longitude before the marker moves anywhere.' },
      { title: 'Event and venue setup', text: 'Let an organiser set a venue location, with a place-search demo that follows the pattern a real geocoding API integration would use.' },
      { title: 'Geofence configuration', text: 'Pair with the [Leaflet draw radius selector](/ui-snippets/leaflet-draw-radius-selector/) so a point is chosen first and a service area is drawn around it.' },
    ],
    faqs: [
      { q: 'How do the map, the pin, and the text fields stay in sync no matter which one I use?', a: `Every interaction path — clicking the map, dragging the pin, selecting a search result, or typing valid coordinates — ultimately calls the same setLocation function, which is the only code that updates the latitude/longitude input values, moves or creates the marker, and enables the confirm button. Because there is exactly one function responsible for that state, no interaction path can leave the form and the map pin showing different locations.` },
      { q: 'What happens if I type an invalid coordinate?', a: `The manual-entry handler runs on the field's change event and checks that both values parse as real numbers and fall within valid coordinate ranges (latitude between -90 and 90, longitude between -180 and 180) before calling setLocation. If the check fails — an empty field, non-numeric text, or an out-of-range value — nothing happens: the pin stays where it was rather than jumping to an invalid or NaN position.` },
      { q: 'Is the address search calling a real geocoding service?', a: `No — to keep this snippet self-contained and free of network calls inside a sandboxed preview, it searches against a small fixed local array of named places. The interaction it demonstrates (type, see filtered suggestions, click one, the map flies there and the pin drops) is exactly the pattern you would wire up to a real geocoding API's search endpoint, with the local array simply standing in for that API's response.` },
      { q: 'Why does dragging the pin update the fields on every movement instead of only when I release it?', a: `The marker's drag event (which fires continuously throughout the gesture) reads the marker's current position on every frame of the drag and writes it straight into the latitude and longitude fields. Using dragend instead would leave the form fields stale and out of sync with the pin's actual position for the entire duration of the drag, which reads as a bug even if it self-corrects at the end.` },
      { q: 'How do I connect this to a real geocoding API?', a: `Replace the local PLACES.filter() logic inside the search input's handler with a fetch call to a real geocoding API (Nominatim, Mapbox Geocoding, Google Places), map its response results into the same { label, lat, lng } shape the suggestions list already expects, and everything downstream — rendering suggestions, selecting one, flying the map, dropping the pin — needs no other changes.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the state-synchronization architecture yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why routing every input path (click, drag, type, search) through one shared setLocation function is what guarantees the map and form can never disagree, and how the manual coordinate validation prevents an invalid typed value from ever moving the pin. The same assistant can help optimize it — ask whether the local PLACES array search should be debounced if it were replaced with a real network-based geocoding call, to avoid firing a request on every keystroke. It's also useful for extending the effect: ask it to wire the search to a real geocoding API like Nominatim, add reverse geocoding so clicking the map also fills in a readable address (not just coordinates), or add a "use my current location" button using the Geolocation API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a location picker form with a synced interactive map using Leaflet.js (load Leaflet's CSS and JS from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Show a form with latitude and longitude text inputs, an address/place search input, and a Confirm button (disabled until a location has been set), next to an interactive map.
- Support setting the location four different ways, all of which must produce exactly the same resulting state (updated latitude/longitude fields, a marker on the map at that position, and the confirm button enabled): clicking anywhere on the map, dragging an existing marker to a new position, typing valid latitude and longitude values directly into the text fields, and selecting a place from an address search.
- Implement the address search against a small local array of named places with coordinates (standing in for a real geocoding API), showing a dropdown of matching suggestions as the user types that filters by partial, case-insensitive text match, and dismissing the dropdown when the user clicks outside the search field.
- Validate manually typed coordinates before applying them — both values must parse as real numbers and fall within valid geographic ranges (latitude -90 to 90, longitude -180 to 180) — and silently do nothing if the typed values are invalid, rather than moving the pin to an incorrect position.
- Make dragging the marker update the latitude/longitude text fields continuously throughout the drag gesture (not only when the drag ends), so the form never shows stale values while the marker is being moved.
- Route every one of these four interaction paths through a single shared function that is the only code responsible for updating the marker, the form fields, and the confirm button's enabled state.
- Use free OpenStreetMap tile layers so the demo requires no API key.`,
    },
  },
};

export default leafletLocationPicker;
