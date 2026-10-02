const leafletStoreLocatorSearch = {
  id: 'leaflet-store-locator-search',
  title: 'Leaflet Store Locator with Search',
  lastmod: '2026-09-20',
  category: 'misc',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css',
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js',
  ],
  html: `<div class="sl-wrap">
  <div class="sl-panel">
    <div class="sl-head">
      <h1>Find a Store</h1>
      <input type="text" id="slSearch" class="sl-search" placeholder="Search by city or store name...">
    </div>
    <ul class="sl-list" id="slList"></ul>
  </div>
  <div class="sl-map" id="slMap"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc}
.sl-wrap{display:flex;height:100vh;min-height:480px}
.sl-panel{width:300px;flex-shrink:0;background:#fff;border-right:1px solid #e2e8f0;display:flex;flex-direction:column}
.sl-head{padding:16px;border-bottom:1px solid #e2e8f0}
.sl-head h1{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:10px}
.sl-search{width:100%;padding:9px 12px;border:1.5px solid #e2e8f0;border-radius:8px;font-size:13px;outline:none}
.sl-search:focus{border-color:#6366f1}
.sl-list{list-style:none;overflow-y:auto;flex:1}
.sl-item{padding:12px 16px;border-bottom:1px solid #f1f5f9;cursor:pointer;transition:background .15s}
.sl-item:hover{background:#f8fafc}
.sl-item.active{background:#eef2ff;border-left:3px solid #6366f1}
.sl-item-name{font-size:13px;font-weight:700;color:#0f172a}
.sl-item-addr{font-size:11.5px;color:#94a3b8;margin-top:2px}
.sl-item-dist{font-size:11px;font-weight:700;color:#6366f1;margin-top:4px}
.sl-empty{padding:24px 16px;text-align:center;color:#94a3b8;font-size:12.5px}
.sl-map{flex:1}
.leaflet-popup-content b{display:block;font-size:13px;margin-bottom:2px}
.leaflet-popup-content span{font-size:11.5px;color:#64748b}`,

  js: `var STORES = [
  { name: 'Downtown Flagship', addr: '120 Market St, San Francisco', lat: 37.7936, lng: -122.3965 },
  { name: 'Mission District', addr: '2400 Mission St, San Francisco', lat: 37.7599, lng: -122.4187 },
  { name: 'Berkeley Outlet', addr: '2100 Shattuck Ave, Berkeley', lat: 37.8695, lng: -122.2685 },
  { name: 'Oakland Waterfront', addr: '55 Jack London Sq, Oakland', lat: 37.7947, lng: -122.2786 },
  { name: 'Palo Alto Studio', addr: '380 University Ave, Palo Alto', lat: 37.4468, lng: -122.1610 },
  { name: 'San Jose Center', addr: '150 S 1st St, San Jose', lat: 37.3361, lng: -121.8906 },
];

var map = L.map('slMap', { zoomControl: true }).setView([37.72, -122.25], 10);
L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri',
  maxZoom: 19,
}).addTo(map);

var markers = STORES.map(function (s) {
  var m = L.marker([s.lat, s.lng]).addTo(map);
  m.bindPopup('<b>' + s.name + '</b><span>' + s.addr + '</span>');
  m.on('click', function () { selectStore(s, false); });
  return m;
});

var listEl = document.getElementById('slList');
var searchEl = document.getElementById('slSearch');
var activeIndex = -1;

// Haversine distance in km -- used to sort the list by proximity to whatever
// point the user last interacted with (defaults to the map's center).
function distanceKm(a, b) {
  var R = 6371;
  var dLat = (b.lat - a.lat) * Math.PI / 180;
  var dLng = (b.lng - a.lng) * Math.PI / 180;
  var s = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(a.lat * Math.PI / 180) * Math.cos(b.lat * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1 - s));
}

function render(filter) {
  var center = map.getCenter();
  var withDist = STORES.map(function (s, i) {
    return { store: s, index: i, dist: distanceKm(center, s) };
  });
  var q = (filter || '').trim().toLowerCase();
  if (q) {
    withDist = withDist.filter(function (d) {
      return d.store.name.toLowerCase().indexOf(q) !== -1 || d.store.addr.toLowerCase().indexOf(q) !== -1;
    });
  }
  withDist.sort(function (a, b) { return a.dist - b.dist; });

  listEl.innerHTML = '';
  if (!withDist.length) {
    listEl.innerHTML = '<li class="sl-empty">No stores match "' + filter + '"</li>';
    return;
  }
  withDist.forEach(function (d) {
    var li = document.createElement('li');
    li.className = 'sl-item' + (d.index === activeIndex ? ' active' : '');
    li.innerHTML = '<div class="sl-item-name">' + d.store.name + '</div>' +
      '<div class="sl-item-addr">' + d.store.addr + '</div>' +
      '<div class="sl-item-dist">' + d.dist.toFixed(1) + ' km away</div>';
    li.addEventListener('click', function () { selectStore(d.store, true); });
    listEl.appendChild(li);
  });
}

function selectStore(store, pan) {
  activeIndex = STORES.indexOf(store);
  if (pan) map.flyTo([store.lat, store.lng], 13, { duration: 0.6 });
  markers[activeIndex].openPopup();
  render(searchEl.value);
}

searchEl.addEventListener('input', function () { render(searchEl.value); });
map.on('moveend', function () { if (!searchEl.value) render(''); });

render('');`,

  seo: {
    title: 'Leaflet Store Locator with Search — Free HTML CSS JS Snippet',
    description: `A store locator built with Leaflet.js — a searchable list synced to real map markers, sorted live by distance from whatever point you're viewing. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Leaflet Store Locator with Search — a List and a Map That Never Disagree',
      description: `A store locator is only as good as the connection between its list and its map — click a list item and the wrong pin highlights, or pan the map and the list stays frozen, and the whole thing reads as broken. This snippet keeps both in sync through one shared array of stores: clicking a marker's popup selects the matching list row, clicking a list row flies the map to that marker, and the list itself re-sorts by live distance from the map's current center on every pan.

**Distance is computed with a real Haversine formula**

Sorting "nearest first" only works if the distance is real. The \`distanceKm\` function implements the actual Haversine great-circle formula — converting each latitude/longitude pair to radians and computing the spherical distance — rather than a flat Pythagorean approximation, which becomes visibly wrong the farther apart two points are or the higher the latitude.

**The list re-sorts on every map pan, not just on load**

A \`moveend\` listener re-renders the list using the map's new center every time you pan or zoom, so "nearest" always means nearest to wherever you're currently looking — not nearest to some fixed original location. Searching pauses that behavior deliberately: while there's a search query, the list filters by name/address match instead of re-sorting on every pan, since a user actively searching for "Berkeley" doesn't want their results reshuffled by an incidental drag of the map underneath.

**Selection state lives in one index, not scattered classes**

Which item is active is tracked as a single \`activeIndex\` into the shared \`STORES\` array, re-applied as a CSS class on every render — so clicking a marker (which calls the exact same \`selectStore\` function a list click does) and clicking a list row produce identical, correct highlighting, with no separate code path to fall out of sync.

**Reusing it**

Swap the six sample stores for a real dataset (from a CMS, a database, or a JSON API), keep the same \`{ name, addr, lat, lng }\` shape, and the search, sort, and sync logic all keep working unchanged. For dozens of locations rather than hundreds, this simple array-based approach is enough — past that, look at marker clustering, covered elsewhere in this collection.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Leaflet CDN', text: `Load leaflet.css and leaflet.js before the snippet's JS runs.` },
      { title: 'Paste HTML, CSS, and JS', text: `Six sample stores render as markers with a synced list.` },
      { title: 'Type in the search box', text: `The list filters by store name or address.` },
      { title: 'Click a list item', text: `The map flies to that store and opens its popup.` },
      { title: 'Click a map marker', text: `The matching list row highlights.` },
      { title: 'Pan the map', text: `With no search active, the list re-sorts by new distance.` },
    ] },
    features: [
      { title: 'Real Haversine distance', text: `Sorting uses actual great-circle distance, not an approximation.` },
      { title: 'Live re-sort on pan', text: `"Nearest" updates to wherever the map is currently centered.` },
      { title: 'Two-way marker/list sync', text: `Either one selects the same store through one function.` },
      { title: 'Search by name or address', text: `Filtering pauses the distance re-sort while searching.` },
      { title: 'Single source of truth', text: `One STORES array drives markers, list, and popups.` },
      { title: 'Free OpenStreetMap tiles', text: `No API key or paid map provider required.` },
    ],
    useCases: [
      { title: 'Restaurant and retail locators', text: 'Offer the familiar find-a-store page: a searchable list synced to real map markers and sorted by great-circle distance from wherever the map is currently centred.' },
      { title: 'Real estate listing maps', text: 'Use the same list-plus-map sync for properties. Clicking a card highlights the right pin, and clicking a pin selects the same card through one shared function.' },
      { title: 'Clinics, repair shops and dealerships', text: 'Help people find the nearest service point. The nearest results re-sort as the map is panned, so the list always matches what is on screen.' },
      { title: 'Event venue directories', text: 'List venues by distance and search by name or address. Filtering pauses the distance re-sort while a search term is active, so results do not jump around.' },
      { title: 'Learning Haversine distance', text: 'See the great-circle formula used for real distance sorting, instead of an approximate flat-map shortcut that gives the wrong order at longer ranges.' },
      { icon: 'CODE', title: 'Related: Leaflet Marker Clustering at Scale', desc: 'See the Leaflet Marker Clustering snippet elsewhere in this collection for the pattern that replaces this one past a few dozen locations.' },
    ],
    faqs: [
      { q: 'Why does the list re-sort when I pan the map but not when I search?', a: `A moveend listener re-renders the list sorted by distance from the map's new center every time you pan or zoom — that's what "nearest first" should mean. But while there's an active search query, the render function filters by text match instead, since re-sorting a user's search results out from under them because they nudged the map is more confusing than helpful.` },
      { q: 'How accurate is the distance calculation?', a: `It uses the real Haversine formula — converting latitude and longitude to radians and computing the great-circle distance across a sphere the size of Earth — rather than a flat-plane approximation. That matters because a naive Pythagorean distance on raw lat/lng degrees becomes increasingly wrong at higher latitudes and larger distances, where a degree of longitude covers much less real distance than a degree of latitude.` },
      { q: 'How does clicking a marker highlight the right list item?', a: `Both the marker's click handler and the list item's click handler call the same selectStore function, which sets activeIndex to that store's position in the shared STORES array and re-renders the list with that index's row marked active. Because there's only one function and one array, a marker click and a list click can never produce a different result for the same store.` },
      { q: 'How do I use my own store data?', a: `Replace the STORES array with your own { name, addr, lat, lng } objects — everything downstream (markers, popups, search filtering, distance sorting) reads from that array's shape and needs no other changes. For a large dataset (hundreds of locations), pair this pattern with marker clustering instead of plotting every marker individually.` },
      { q: 'How do I use this locator in React, Vue, or Angular?', a: `Initialize the Leaflet map once in a mount effect against a ref'd container, keep STORES and activeIndex in component state, and re-run marker creation only when the store data actually changes rather than on every render. Call map.remove() in your cleanup function to avoid leaking map instances on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out list-to-map synchronization from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how selectStore keeps a marker click and a list-item click producing identical results by routing both through one function and one shared index, and why the Haversine formula is necessary instead of a simpler flat-distance calculation. The same assistant can help optimize it — ask whether re-rendering the entire list on every single moveend event (which fires continuously during a drag) should be debounced for a larger dataset. It's also useful for extending the effect: ask it to add a "use my location" button using the Geolocation API to sort by real user proximity, a radius filter, or marker clustering for a dataset with hundreds of locations. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a store locator with a synced sidebar list and an interactive map using Leaflet.js (load Leaflet's CSS and JS from a CDN, no other library), in plain HTML, CSS, and JavaScript.

Requirements:
- Maintain a single array of store objects, each with a name, an address, and latitude/longitude coordinates, and render every store as both a map marker (with a popup showing its name and address) and a row in a sidebar list.
- Implement a real great-circle distance calculation (the Haversine formula, not a flat-plane approximation) between two latitude/longitude points, and use it to sort the sidebar list by distance from the map's current center, recalculating and re-rendering the sorted list every time the map is panned or zoomed.
- Add a text search input above the list that filters the list by store name or address as the user types; while a search query is active, the list should show filtered results instead of being re-sorted by the map's position.
- Make clicking a marker's popup and clicking its corresponding sidebar list item both trigger the exact same "select this store" behavior — highlighting that item in the list and, when triggered from the list, smoothly panning/flying the map to center on that marker and open its popup — routed through one shared function and one shared "currently selected" index so the two interactions can never disagree about which store is selected.
- Use free OpenStreetMap tile layers so the demo requires no API key.
- Show an empty-state message in the list when a search query matches no stores.`,
    },
  },
};

export default leafletStoreLocatorSearch;
