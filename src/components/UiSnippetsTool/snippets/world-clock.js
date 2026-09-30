const worldClock = {
  id: 'world-clock',
  title: 'World Clock',
  category: 'dashboards',
  html: `<div class="wrap">
  <div class="header">
    <h1 class="title">World Clock</h1>
    <span class="subtitle">Live time across time zones</span>
  </div>
  <div class="clocks" id="clocks">
    <div class="clock-card" data-tz="America/New_York" data-i="0">
      <div class="dn" id="dn-0"></div>
      <div class="city">New York</div>
      <div class="country">United States &middot; ET</div>
      <div class="time" id="tz-0">--:--:--</div>
      <div class="date" id="date-0">---</div>
    </div>
    <div class="clock-card" data-tz="America/Los_Angeles" data-i="1">
      <div class="dn" id="dn-1"></div>
      <div class="city">Los Angeles</div>
      <div class="country">United States &middot; PT</div>
      <div class="time" id="tz-1">--:--:--</div>
      <div class="date" id="date-1">---</div>
    </div>
    <div class="clock-card" data-tz="Europe/London" data-i="2">
      <div class="dn" id="dn-2"></div>
      <div class="city">London</div>
      <div class="country">United Kingdom &middot; GMT</div>
      <div class="time" id="tz-2">--:--:--</div>
      <div class="date" id="date-2">---</div>
    </div>
    <div class="clock-card" data-tz="Europe/Paris" data-i="3">
      <div class="dn" id="dn-3"></div>
      <div class="city">Paris</div>
      <div class="country">France &middot; CET</div>
      <div class="time" id="tz-3">--:--:--</div>
      <div class="date" id="date-3">---</div>
    </div>
    <div class="clock-card" data-tz="Asia/Dubai" data-i="4">
      <div class="dn" id="dn-4"></div>
      <div class="city">Dubai</div>
      <div class="country">UAE &middot; GST</div>
      <div class="time" id="tz-4">--:--:--</div>
      <div class="date" id="date-4">---</div>
    </div>
    <div class="clock-card" data-tz="Asia/Kolkata" data-i="5">
      <div class="dn" id="dn-5"></div>
      <div class="city">Mumbai</div>
      <div class="country">India &middot; IST</div>
      <div class="time" id="tz-5">--:--:--</div>
      <div class="date" id="date-5">---</div>
    </div>
    <div class="clock-card" data-tz="Asia/Tokyo" data-i="6">
      <div class="dn" id="dn-6"></div>
      <div class="city">Tokyo</div>
      <div class="country">Japan &middot; JST</div>
      <div class="time" id="tz-6">--:--:--</div>
      <div class="date" id="date-6">---</div>
    </div>
    <div class="clock-card" data-tz="Australia/Sydney" data-i="7">
      <div class="dn" id="dn-7"></div>
      <div class="city">Sydney</div>
      <div class="country">Australia &middot; AEDT</div>
      <div class="time" id="tz-7">--:--:--</div>
      <div class="date" id="date-7">---</div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; min-height: 100vh; padding: 32px 20px; color: #fff; }
.wrap { max-width: 880px; margin: 0 auto; }
.header { margin-bottom: 28px; }
.title { font-size: 22px; font-weight: 800; color: #f1f5f9; }
.subtitle { font-size: 13px; color: #64748b; }
.clocks { display: grid; grid-template-columns: repeat(auto-fill, minmax(190px, 1fr)); gap: 14px; }
.clock-card { background: #1e293b; border: 1px solid #334155; border-radius: 16px; padding: 18px 20px; position: relative; transition: border-color 0.2s; }
.clock-card:hover { border-color: #475569; }
.clock-card.is-day { border-color: rgba(251,191,36,0.3); }
.clock-card.is-night { border-color: rgba(99,102,241,0.3); }
.dn { position: absolute; top: 16px; right: 16px; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; }
.dn.day { background: rgba(251,191,36,0.12); }
.dn.night { background: rgba(99,102,241,0.12); }
.city { font-size: 14px; font-weight: 700; color: #e2e8f0; margin-bottom: 2px; padding-right: 30px; }
.country { font-size: 10px; color: #64748b; margin-bottom: 14px; letter-spacing: 0.3px; }
.time { font-size: 26px; font-weight: 800; color: #f8fafc; font-variant-numeric: tabular-nums; letter-spacing: 0.5px; line-height: 1; margin-bottom: 8px; }
.date { font-size: 11px; color: #94a3b8; }`,
  js: `var zones = [
  'America/New_York','America/Los_Angeles','Europe/London','Europe/Paris',
  'Asia/Dubai','Asia/Kolkata','Asia/Tokyo','Australia/Sydney'
];

function isDaytime(h) { return h >= 6 && h < 20; }

function tick() {
  var now = new Date();
  for (var i = 0; i < zones.length; i++) {
    var t = new Date(now.toLocaleString('en-US', { timeZone: zones[i] }));
    var hh = String(t.getHours()).padStart(2,'0');
    var mm = String(t.getMinutes()).padStart(2,'0');
    var ss = String(t.getSeconds()).padStart(2,'0');
    var day = t.toLocaleDateString('en-US', { weekday:'short', month:'short', day:'numeric', timeZone: zones[i] });
    var isDay = isDaytime(t.getHours());
    document.getElementById('tz-' + i).textContent = hh + ':' + mm + ':' + ss;
    document.getElementById('date-' + i).textContent = day;
    var dn = document.getElementById('dn-' + i);
    dn.className = 'dn ' + (isDay ? 'day' : 'night');
    dn.textContent = isDay ? '☀️' : '🌙';
    var card = dn.parentElement;
    card.classList.toggle('is-day', isDay);
    card.classList.toggle('is-night', !isDay);
  }
}

tick();
setInterval(tick, 1000);`,
  seo: {
    title: 'World Clock Widget — Free HTML CSS JS Snippet',
    description: 'Live multi-timezone world clock grid with 8 cities, ticking seconds, and day/night indicators. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'World Clock — Live Multi-Timezone Grid with Day/Night Indicators',
      description: `A world clock widget displays the current local time across multiple time zones simultaneously, letting users coordinate meetings and track business hours globally. This snippet renders 8 city clocks in a responsive CSS Grid, each ticking every second via setInterval. The day/night indicator switches between sun and moon with a tinted background based on whether the local hour is between 6am and 8pm.\n\n**Timezone conversion with the Intl API**\n\nThe native Intl.DateTimeFormat API (via toLocaleString with a timeZone option) converts the current UTC timestamp to any IANA timezone. new Date(now.toLocaleString('en-US', { timeZone: tz })) creates a Date object set to the local time in that zone — getHours(), getMinutes(), and getSeconds() then return values in the target timezone, not the browser's local time. This works in all modern browsers without any external library.\n\n**Tabular digit rendering**\n\nfont-variant-numeric: tabular-nums makes digits mono-width, preventing the time display from jumping left and right as narrow digits like 1 swap with wide digits like 8. This is standard practice for all live clock UIs and numeric counters.\n\n**Day/night detection**\n\nisDaytime(h) returns true when the local hour is between 6 and 20. The sun or moon emoji appears in a circle with an rgba tinted background — yellow for day, indigo for night. The card border also switches color via .is-day and .is-night classes, giving a quick visual scan of which cities are awake.\n\n**DST handling**\n\nThe IANA timezone database (used internally by the browser Intl API) knows all DST transition rules. When a region switches to/from DST, the Intl API applies the correct offset automatically — no manual offset arithmetic needed.\n\n**setInterval accuracy and drift**\n\nsetInterval(tick, 1000) fires approximately every second, but browsers allow slight drift — the actual interval can be 1001ms or 999ms. For a wall-clock display this is acceptable since the seconds value is derived from a fresh new Date() on every tick rather than incrementing a counter. If the tab is in the background, browsers throttle timers; the clock may pause for a second and then catch up on focus. For a critical timing use case, pair setInterval with a visibility change listener: document.addEventListener("visibilitychange", () => { if (!document.hidden) tick(); }) to force an immediate update when the user returns to the tab.\n\n**Accessibility of live clock regions**\n\nFor screen readers, live-updating time displays should use aria-live="off" (the default) because announcing every second would be disruptive. Instead, give each card an aria-label="Tokyo time" so users can navigate to it on demand. For a summary-level accessible clock, expose only the hours and minutes with aria-live="polite" and update the region only when minutes change.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Watch the clocks tick in real time', text: 'All 8 city clocks update every second. The sun icon shows daytime (6am–8pm local), the moon shows nighttime.' },
      { title: 'Add or change a city', text: 'Duplicate a .clock-card block and update data-tz to any IANA timezone string (e.g., "Asia/Singapore"). Add that same string to the zones array at the same index. Update city name, country, and abbreviation.' },
      { title: 'Switch to 12-hour format', text: 'In the tick function replace the hh+mm+ss build with: var ampm = t.getHours() >= 12 ? "PM" : "AM"; var h12 = ((t.getHours() % 12) || 12); then display h12 + ":" + mm + ":" + ss + " " + ampm.' },
      { title: 'Highlight the local timezone', text: 'Get the local timezone with Intl.DateTimeFormat().resolvedOptions().timeZone. Compare it to the zones array; add a .local class to the matching card to highlight it with a border or background accent.' },
      { title: 'Export for your framework', text: 'Click "JSX" for a React version using useEffect and setInterval with cleanup. Click "Vue" for a Vue 3 SFC with onMounted ticker and onUnmounted clearInterval.' },
    ]},
    features: ['Intl.DateTimeFormat timezone conversion — no external timezone library','setInterval(tick, 1000): live seconds ticking across all cards simultaneously','font-variant-numeric: tabular-nums prevents digit-width jumping','8 IANA timezone strings pre-configured for global coverage','isDaytime(h): 6–20 local hour threshold for sun/moon indicator','Card border color: rgba gold for day, rgba indigo for night','DST handling: Intl API applies offset changes automatically','Responsive CSS Grid with auto-fill minmax(190px, 1fr) for any screen size'],
    useCases: [
      { icon: 'APP', title: 'Remote team dashboard and meeting planner sidebar', desc: 'Show team members local times in a sidebar or header widget of your [dashboard layout](/ui-snippets/dashboard-layout/). Connect cards to your team directory so each shows a member\'s avatar alongside their local time. Highlight cards where it is outside business hours (before 9am or after 6pm local) with a warning border.' },
      { icon: 'DESIGN', title: 'Global status page timezone reference panel', desc: 'Display local maintenance window times across regions on your [status page](/ui-snippets/uptime-status-page/). Users immediately see what "3pm UTC" means in their city without mental arithmetic. Use the day/night indicator to show whether on-call engineers in each region are likely awake.' },
      { icon: 'FLOW', title: 'International scheduling tool timezone comparison', desc: 'Use the world clock as a visual aid when scheduling meetings — pair it with a [timezone converter](/ui-snippets/timezone-converter/) for one-to-one comparisons. Highlight the organiser and attendee timezone cards. The day/night indicator immediately shows if a proposed time falls outside business hours for any participant.' },
      { icon: 'CODE', title: 'Trading dashboard market hours display', desc: 'Rename cities to exchanges: NYSE, LSE, TSE, NSE, ASX. Compare the local hour to known trading hours for each exchange (e.g., NYSE: 9:30–16:00 ET) to show an open/closed chip on each card. Use isDaytime() as a starting point for the custom hours check.' },
      { icon: 'LEARN', title: 'Study the Intl.DateTimeFormat timezone API', desc: 'The snippet demonstrates how to use native browser timezone conversion without moment-timezone or date-fns. The toLocaleString + new Date() pattern handles DST automatically — a practical lightweight alternative to large timezone libraries for most UI use cases.' },
      { icon: 'CHART', title: 'Travel app destination arrival time widget', desc: 'Show the local time at a traveller\'s destination alongside their departure city. The day/night indicator communicates whether they land during the day or at night at a glance — useful context when booking long-haul flights.' },
    ],
    faqs: [
      { q: 'How does timezone conversion work without a library?', a: 'The Intl.DateTimeFormat API is built into all modern browsers. now.toLocaleString("en-US", { timeZone: tz }) formats the UTC timestamp in the target timezone. Wrapping it in new Date() parses it back to a Date object — so getHours()/getMinutes()/getSeconds() return values in the target zone, not local time. An alternative approach uses Intl.DateTimeFormat directly: new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(now). This avoids the double-parse step and is slightly more explicit. Both approaches produce identical results in all modern browsers. The key requirement is passing an IANA timezone string (e.g., "America/New_York") not a UTC offset ("+05:30") — offsets do not account for DST transitions.' },
      { q: 'Does this handle Daylight Saving Time automatically?', a: 'Yes. Browsers use the IANA timezone database internally for Intl API calls. When a region transitions to or from DST, the Intl API applies the correct offset automatically. No manual offset arithmetic or external library is needed. This means that on the night of a DST transition (e.g., clocks spring forward at 2am), the displayed time for that timezone will jump correctly at the right local moment. The IANA database is bundled in every modern browser and receives updates through browser updates, so DST rule changes for countries like Brazil, Russia, or Morocco are handled without any code changes on your part.' },
      { q: 'How do I use this in React?', a: 'Use useEffect with setInterval cleanup: useEffect(() => { const id = setInterval(tick, 1000); return () => clearInterval(id); }, []). Store times as an array in useState. Inside tick(), compute zone times for all zones — create a new Date(), format each zone with toLocaleString, and call setTimes(computed) to trigger a re-render. Keep the zones config in a constant array outside the component so it is not recreated on each render. For optimal performance, consider updating state only when the formatted time string changes, avoiding re-renders in the seconds between minute changes.' },
      { q: 'How do I add or remove cities?', a: 'Two parallel edits: add the IANA timezone id (e.g. "Europe/Berlin") to the zones array in the JS, and add a matching .clock-card in the HTML with data-tz set to the same id and the indexed element ids the updater writes to — tz-N for the time, date-N for the date, and dn-N for the day/night dot, where N is the card\'s position. tick() loops the zones array by index, so the array order must match the card order. To remove a city, delete both its array entry and its card, then renumber the ids that follow.' },
      { q: 'How does the day/night indicator work?', a: 'tick() converts the current moment into each zone\'s local wall-clock time using new Date(now.toLocaleString("en-US", { timeZone: zone })), then isDaytime(h) classifies 06:00–19:59 as day. The result toggles the small dot element\'s class between day and night variants, which the CSS colours amber or indigo. If you want real sunrise/sunset accuracy instead of fixed hours, swap isDaytime() for a solar calculation library or an API lookup — the class toggle stays identical.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain exactly what new Date(now.toLocaleString('en-US', { timeZone: zone })) does under the hood — it's a double-conversion trick (format to a string in the target zone, then re-parse it) that's worth understanding versus the more explicit Intl.DateTimeFormat().format() approach, including where each can subtly differ. It's also worth asking about tick()'s per-second cost: with eight timezones being reformatted every single second via toLocaleString, ask whether that's meaningfully expensive and what a cheaper alternative would look like at, say, fifty cities. For extending it, ask for a way to highlight the viewer's own detected timezone automatically using Intl.DateTimeFormat().resolvedOptions().timeZone, a drag-to-reorder city grid, or a compact "meeting time finder" that overlays all eight local times against a single chosen UTC hour. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a live multi-timezone world clock grid in plain HTML, CSS, and JavaScript using only the native Intl API — no timezone library, no manual UTC-offset arithmetic.

Requirements:
- A responsive CSS grid of city cards, each tagged with a real IANA timezone identifier (such as "Asia/Tokyo" or "America/New_York") rather than a numeric UTC offset, since offsets alone cannot account for daylight saving time.
- A single ticking function that runs once per second (via setInterval) and, for every configured timezone, derives that zone's current local hour, minute, second, and weekday/date purely through the Intl API applied to one shared Date.now() timestamp — never manually add or subtract hours.
- Display each city's time with zero-padded two-digit hours, minutes, and seconds, using a tabular-figures font so the digits don't visually shift width as they change every second.
- Classify each city as daytime or nighttime based on its computed local hour falling within a defined window (such as 6am to 8pm), and reflect that with both a sun/moon icon and a distinctly colored card border, updating live as real time passes and a city crosses the day/night boundary.
- Confirm that daylight saving transitions are handled correctly with zero special-case code, purely because the Intl API's timezone conversion is DST-aware.
- Make the city list config-driven from a single array of timezone identifiers, so adding a new city is one array entry plus one matching card in the markup, with no changes to the ticking or day/night logic.`,
    },
  },
};

export default worldClock;
