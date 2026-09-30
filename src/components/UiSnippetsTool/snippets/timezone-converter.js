const timezoneConverter = {
  id: 'timezone-converter',
  title: 'Timezone Converter',
  lastmod: '2026-06-22',
  category: 'tools',
  html: `<div class="tzc-card">
  <div class="tzc-head">
    <h3>Meeting planner</h3>
    <p>Pick a time in one city — see it everywhere else</p>
  </div>

  <div class="tzc-base">
    <label for="tzcTime">Base time</label>
    <div class="tzc-base-row">
      <input type="range" id="tzcTime" min="0" max="1439" step="15" value="540">
      <span class="tzc-base-val" id="tzcBaseVal">9:00 AM</span>
    </div>
  </div>

  <div class="tzc-list" id="tzcList"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tzc-card{background:#1e293b;border:1px solid #334155;border-radius:18px;padding:22px;width:100%;max-width:440px;box-shadow:0 18px 44px rgba(0,0,0,.4)}
.tzc-head h3{color:#f8fafc;font-size:16px;font-weight:800;margin-bottom:2px}
.tzc-head p{color:#94a3b8;font-size:12.5px;margin-bottom:18px}

.tzc-base{margin-bottom:18px}
.tzc-base label{display:block;font-size:11px;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:.04em;margin-bottom:9px}
.tzc-base-row{display:flex;align-items:center;gap:14px}
.tzc-base-row input[type=range]{flex:1;-webkit-appearance:none;appearance:none;height:6px;border-radius:999px;background:#334155;outline:none}
.tzc-base-row input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:20px;height:20px;border-radius:50%;background:#818cf8;cursor:pointer;border:3px solid #1e293b;box-shadow:0 0 0 1px #818cf8}
.tzc-base-row input[type=range]::-moz-range-thumb{width:20px;height:20px;border-radius:50%;background:#818cf8;cursor:pointer;border:3px solid #1e293b}
.tzc-base-val{font-size:16px;font-weight:800;color:#f8fafc;font-variant-numeric:tabular-nums;min-width:84px;text-align:right}

.tzc-list{display:flex;flex-direction:column;gap:9px}
.tzc-row{display:flex;align-items:center;gap:12px;background:#0f172a;border:1px solid #1f2937;border-radius:12px;padding:12px 14px}
.tzc-row.daytime{border-color:#3b4a63}
.tzc-flag{font-size:22px;line-height:1;flex-shrink:0}
.tzc-city{flex:1;min-width:0}
.tzc-city-name{font-size:13.5px;font-weight:700;color:#f1f5f9}
.tzc-city-zone{font-size:11px;color:#64748b}
.tzc-time{text-align:right}
.tzc-time-val{font-size:15px;font-weight:800;color:#f8fafc;font-variant-numeric:tabular-nums}
.tzc-time-day{font-size:10.5px;font-weight:700}
.tzc-time-day.same{color:#64748b}
.tzc-time-day.next{color:#fbbf24}
.tzc-time-day.prev{color:#60a5fa}
.tzc-period{display:inline-flex;align-items:center;gap:4px;font-size:10.5px;font-weight:700;padding:2px 7px;border-radius:999px;margin-top:3px}
.tzc-period.work{background:rgba(52,211,153,.14);color:#34d399}
.tzc-period.off{background:rgba(148,163,184,.14);color:#94a3b8}`,

  js: `var ZONES = [
  { city: 'San Francisco', flag: '🇺🇸', zone: 'PT',  offset: -7 },
  { city: 'New York',      flag: '🇺🇸', zone: 'ET',  offset: -4 },
  { city: 'London',        flag: '🇬🇧', zone: 'BST', offset: 1 },
  { city: 'Berlin',        flag: '🇩🇪', zone: 'CEST',offset: 2 },
  { city: 'Dubai',         flag: '🇦🇪', zone: 'GST', offset: 4 },
  { city: 'Mumbai',        flag: '🇮🇳', zone: 'IST', offset: 5.5 },
  { city: 'Singapore',     flag: '🇸🇬', zone: 'SGT', offset: 8 },
  { city: 'Tokyo',         flag: '🇯🇵', zone: 'JST', offset: 9 },
  { city: 'Sydney',        flag: '🇦🇺', zone: 'AEST',offset: 10 },
];
// The first zone is the "base" the slider controls.
var BASE_OFFSET = ZONES[0].offset;

var slider = document.getElementById('tzcTime');
var baseVal = document.getElementById('tzcBaseVal');
var listEl = document.getElementById('tzcList');

function fmt(totalMins) {
  var mins = ((totalMins % 1440) + 1440) % 1440;
  var h = Math.floor(mins / 60), m = mins % 60;
  var period = h < 12 ? 'AM' : 'PM';
  var h12 = h % 12 === 0 ? 12 : h % 12;
  return { text: h12 + ':' + (m < 10 ? '0' : '') + m + ' ' + period, hour24: h };
}

function dayShift(totalMins) {
  if (totalMins < 0) return 'prev';
  if (totalMins >= 1440) return 'next';
  return 'same';
}

function render() {
  var baseMins = parseInt(slider.value, 10);
  baseVal.textContent = fmt(baseMins).text;

  listEl.innerHTML = ZONES.map(function (z) {
    var diff = (z.offset - BASE_OFFSET) * 60;          // minutes from base
    var localMins = baseMins + diff;
    var f = fmt(localMins);
    var shift = dayShift(localMins);
    var working = f.hour24 >= 9 && f.hour24 < 18;       // 9am–6pm local
    var dayLabel = shift === 'next' ? '+1 day' : shift === 'prev' ? '−1 day' : 'same day';
    return '<div class="tzc-row' + (working ? ' daytime' : '') + '">' +
      '<span class="tzc-flag">' + z.flag + '</span>' +
      '<div class="tzc-city">' +
        '<div class="tzc-city-name">' + z.city + '</div>' +
        '<div class="tzc-city-zone">' + z.zone + ' · UTC' + (z.offset >= 0 ? '+' : '') + z.offset + '</div>' +
      '</div>' +
      '<div class="tzc-time">' +
        '<div class="tzc-time-val">' + f.text + '</div>' +
        '<div class="tzc-time-day ' + shift + '">' + dayLabel + '</div>' +
        '<span class="tzc-period ' + (working ? 'work' : 'off') + '">' + (working ? '● working hours' : '○ off hours') + '</span>' +
      '</div>' +
    '</div>';
  }).join('');
}

slider.addEventListener('input', render);
render();`,

  seo: {
    title: 'Timezone Converter — Meeting Planner HTML CSS JS',
    description: `A timezone meeting planner: drag one time and see it across world cities, with day-shift labels and working-hours highlights. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Timezone Converter — World Clock Meeting Planner with Working-Hours Highlights',
      description: `"What time is the 9am San Francisco call in Tokyo?" is a question remote teams answer dozens of times a week, and getting it wrong means someone joins a meeting at 2am. This snippet builds an interactive timezone meeting planner in plain HTML, CSS, and vanilla JavaScript: drag a single slider to set a base time, and every city in the list updates instantly with its local time, whether it's the same/next/previous day, and whether that lands inside working hours.

**One slider drives every zone**

A single range input (stepping in 15-minute increments across a full day) sets the base time in the first city. Every other row is computed from its UTC offset relative to that base: \`diff = (zone.offset - BASE_OFFSET) * 60\` minutes, added to the base minutes. There's no per-city input to keep in sync — moving the one slider re-renders the whole list through a single \`render()\` call, the cleanest way to express "the same moment, shown everywhere."

**Day-shift labels are the detail that prevents 2am mistakes**

The hardest part of cross-timezone scheduling isn't the hour, it's the *date*. When it's 9am Monday in San Francisco it's already 2am Tuesday in Tokyo — so each row computes whether the converted time rolls into the next day, stays the same day, or falls back to the previous day, and labels it explicitly ("+1 day" in amber, "−1 day" in blue, "same day" in gray). The minute math wraps cleanly with \`((mins % 1440) + 1440) % 1440\` so a time that crosses midnight in either direction still displays the correct clock time alongside the right day label.

**Working-hours highlighting finds the overlap**

Picking a meeting time is really about finding the window where the fewest people are asleep. Each row flags whether its local time falls in 9am–6pm ("● working hours" in green, with a subtly brighter card border) or outside it ("○ off hours" in gray) — so as you drag the slider, you can watch for the moment the most cities light up green at once. That visual scan is far faster than mentally converting nine offsets.

**Honest about DST (and how to make it real)**

The offsets here are fixed numbers, which is deliberately simple for a self-contained demo — but real timezones shift with daylight saving, and the offset between two cities can change several times a year. A production version should drop the hardcoded offsets and use the browser's built-in \`Intl.DateTimeFormat\` with an IANA timezone name (\`'America/Los_Angeles'\`, \`'Asia/Tokyo'\`) and a real \`Date\` object, which handles DST automatically. The rendering, day-shift, and working-hours logic stay identical; only the offset source changes.

**Built for quick customization**

Add or remove cities by editing the \`ZONES\` array (\`{ city, flag, zone, offset }\`), change the base city by reordering it to the front, or adjust the working-hours window to match your team's actual availability — every visual recalculates from those values.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dark "Meeting planner" card renders with a time slider and a list of nine world cities showing their local times.` },
      { title: 'Drag the base-time slider', text: `Set a time in the base city (San Francisco) — every other city's local time updates instantly as you drag.` },
      { title: 'Read the day-shift labels', text: `Each row shows "+1 day", "same day", or "−1 day" so you never miscount the date when a time crosses midnight.` },
      { title: 'Find the working-hours overlap', text: `Rows inside 9am–6pm local show a green "working hours" badge — drag until the most cities light up green at once.` },
      { title: 'Edit the city list', text: `Add or remove entries in the ZONES array; reorder a city to the front to make it the base the slider controls.` },
      { title: 'Make DST accurate', text: `Replace the fixed offsets with Intl.DateTimeFormat and IANA zone names (America/Los_Angeles) so daylight saving is handled automatically.` },
    ] },
    features: [
      { title: 'Single slider, all zones update', text: `One range input sets the base time; every city is computed from its UTC offset and re-rendered together.` },
      { title: 'Same / next / previous day labels', text: `Each row shows whether the converted time crosses into another day — the detail that prevents date mistakes.` },
      { title: 'Working-hours highlighting', text: `Times inside 9am–6pm local get a green badge and brighter border, making the best meeting window easy to spot.` },
      { title: 'Midnight-safe time math', text: `Minute wrapping with ((m % 1440) + 1440) % 1440 keeps the clock correct in both directions across midnight.` },
      { title: '12-hour formatting with AM/PM', text: `Times display in readable 12-hour format with tabular-nums alignment so the column stays visually steady.` },
      { title: 'UTC offset and zone abbreviation', text: `Each city shows its zone code (PT, IST, JST) and UTC offset for unambiguous reference.` },
      { title: 'Data-driven city list', text: `Add, remove, or reorder cities by editing one ZONES array — the base city is simply the first entry.` },
      { title: 'Ready for Intl/DST accuracy', text: `Swap the fixed offsets for Intl.DateTimeFormat with IANA names and the same rendering handles daylight saving.` },
    ],
    useCases: [
      { title: 'Remote team scheduling', text: `Find a meeting time that lands in working hours for the most teammates across offices — pair with a [calendar widget](/ui-snippets/calendar-widget/) to pick the day.` },
      { title: 'Booking and consultation sites', text: `Show clients their local time for an appointment alongside yours, reducing no-shows from timezone confusion.` },
      { title: 'Global event and webinar pages', text: `Display a live event's start time in visitors' major timezones, alongside a [countdown timer](/ui-snippets/countdown-timer/) so no one miscalculates and misses it.` },
      { title: 'Developer and ops dashboards', text: `Show when a scheduled job or maintenance window falls across regional data centers.` },
      { title: 'Travel and itinerary apps', text: `Convert departure and arrival times across destinations, pairing with a [world clock](/ui-snippets/world-clock/) display.` },
      { title: 'Learning time math in JavaScript', text: `A clear reference for offset conversion, midnight wrapping, and day-boundary detection without a date library.` },
    ],
    faqs: [
      { q: 'How do I handle daylight saving time correctly?', a: `Fixed numeric offsets break twice a year when regions shift for DST. The robust fix is to drop the offsets entirely and use the browser's Intl.DateTimeFormat with an IANA timezone name — new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', hour: 'numeric', minute: '2-digit' }).format(date) — which applies the correct offset for any given date automatically. Keep the same render/day-shift/working-hours logic; only the time source changes.` },
      { q: 'How do I let users add their own cities?', a: `Render a searchable add-city control (similar to the [language switcher](/ui-snippets/language-switcher/)) backed by a list of IANA timezone names, push the chosen one into the ZONES array, and re-render. With Intl you only need the timezone name, not a hardcoded offset.` },
      { q: 'How do I change the working-hours window?', a: `Edit the condition in render() — currently f.hour24 >= 9 && f.hour24 < 18 (9am–6pm). Change those bounds to match your team's actual hours, or make them configurable per city if teammates keep different schedules.` },
      { q: 'Can I set the base time to "now" instead of a slider?', a: `Yes — initialize the slider value from the current time (new Date().getHours() * 60 + getMinutes()) on load, and optionally add a "Now" button that resets it. The slider stays useful for exploring other meeting times around the present moment.` },
      { q: 'How do I use this timezone converter in React, Vue, or Angular?', a: `In React, hold the base minutes in useState and derive each city's converted time with useMemo (ideally via Intl.DateTimeFormat); in Vue, use ref()/computed(); in Angular, use a component field with a getter or pipe. The offset/day-shift math is plain JavaScript and ports without changes.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to trace through the ((mins % 1440) + 1440) % 1440 wrapping expression with a couple of negative-minute examples — it's the small piece of modular arithmetic that keeps the clock correct when a converted time crosses midnight in either direction, and it's worth understanding before you reuse it elsewhere. It's also a good prompt for a scaling/correctness conversation: this demo uses fixed numeric UTC offsets, so ask specifically how you'd swap those for Intl.DateTimeFormat with real IANA timezone names so daylight saving transitions are handled automatically instead of silently going wrong twice a year. For extending it, ask for a searchable "add your own city" control backed by a full IANA timezone list, a heatmap-style visualization of overlapping working hours across all cities at once, or a shareable link that encodes the chosen base time. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a timezone meeting-planner in plain HTML, CSS, and JavaScript where dragging a single slider updates every city's local time at once — no date library, no server calls.

Requirements:
- A single range input representing minutes since midnight (0 to 1439, stepping by 15) that sets the "base time" in the first city of a data array; every other city in that array must be computed relative to this base, never edited independently.
- Each city entry stores a fixed UTC offset (including fractional-hour offsets like 5.5 for India); on every slider input, compute each city's local minutes as the base minutes plus the difference between that city's offset and the base city's offset, in minutes.
- Format minutes into a 12-hour clock string with AM/PM, and make the minute-wrapping arithmetic correct in both directions across midnight using a double-modulo expression (not a simple if-statement) so negative or overflowing minute values still resolve to a valid 0–1439 range.
- For every city, explicitly compute and label whether its converted local time falls on the same day, the next day, or the previous day relative to the base, and style each of the three states with a distinct color so a user scanning the list never misreads the date.
- Flag each city with a "working hours" versus "off hours" badge based on whether its local hour falls within a configurable daytime window (such as 9am to 6pm), and give working-hours rows a visibly different card border so the best overlap window is scannable at a glance while dragging the slider.
- Re-render the entire city list from one function on every slider input event, so the whole UI is a pure function of the single base-minutes value.`,
    },
  },
};

export default timezoneConverter;
