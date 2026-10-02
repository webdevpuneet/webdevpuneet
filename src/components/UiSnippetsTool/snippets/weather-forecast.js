const weatherForecast = {
  id: 'weather-forecast',
  title: 'Weather Forecast',
  lastmod: '2026-06-23',
  category: 'dashboards',
  html: `<div class="wf-card">
  <div class="wf-now">
    <div class="wf-now-main">
      <span class="wf-now-ico" id="wfIco"></span>
      <div><div class="wf-temp" id="wfTemp"></div><div class="wf-place">Berlin, DE</div></div>
    </div>
    <div class="wf-now-meta" id="wfMeta"></div>
  </div>
  <div class="wf-days" id="wfDays"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.wf-card{background:linear-gradient(160deg,#4f46e5,#6366f1 55%,#818cf8);border-radius:20px;padding:22px;width:100%;max-width:380px;color:#fff;box-shadow:0 24px 60px rgba(79,70,229,.4)}
.wf-now{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}
.wf-now-main{display:flex;align-items:center;gap:14px}
.wf-now-ico{font-size:48px;line-height:1}
.wf-temp{font-size:40px;font-weight:800;line-height:1}
.wf-place{font-size:13px;font-weight:600;opacity:.85;margin-top:4px}
.wf-now-meta{font-size:12px;font-weight:600;opacity:.9;text-align:right;line-height:1.7}

.wf-days{display:flex;gap:6px}
.wf-day{flex:1;background:rgba(255,255,255,.12);border-radius:13px;padding:12px 6px;text-align:center;backdrop-filter:blur(4px);transition:background .15s,transform .15s;cursor:default}
.wf-day:hover{background:rgba(255,255,255,.22);transform:translateY(-2px)}
.wf-day.wf-today{background:rgba(255,255,255,.26)}
.wf-dname{font-size:11px;font-weight:700;opacity:.9;margin-bottom:6px}
.wf-dico{font-size:22px;margin-bottom:6px}
.wf-hi{font-size:13px;font-weight:800}
.wf-lo{font-size:11.5px;font-weight:600;opacity:.7}`,

  js: `// Weather codes → emoji + label. In production, map your API's codes here.
var ICONS = { sunny: '☀️', partly: '⛅', cloudy: '☁️', rain: '🌧️', storm: '⛈️', snow: '🌨️' };
var LABELS = { sunny: 'Sunny', partly: 'Partly cloudy', cloudy: 'Cloudy', rain: 'Rain', storm: 'Storms', snow: 'Snow' };

var CURRENT = { temp: 21, code: 'partly', feels: 19, humidity: 58, wind: 12 };
var FORECAST = [
  { day: 'Today', code: 'partly', hi: 23, lo: 14 },
  { day: 'Tue', code: 'sunny', hi: 26, lo: 15 },
  { day: 'Wed', code: 'rain', hi: 19, lo: 13 },
  { day: 'Thu', code: 'storm', hi: 17, lo: 12 },
  { day: 'Fri', code: 'cloudy', hi: 20, lo: 14 },
];

document.getElementById('wfIco').textContent = ICONS[CURRENT.code];
document.getElementById('wfTemp').textContent = CURRENT.temp + '°';
document.getElementById('wfMeta').innerHTML =
  LABELS[CURRENT.code] + '<br>Feels ' + CURRENT.feels + '° · ' + CURRENT.humidity + '%<br>Wind ' + CURRENT.wind + ' km/h';

document.getElementById('wfDays').innerHTML = FORECAST.map(function (d, i) {
  return '<div class="wf-day' + (i === 0 ? ' wf-today' : '') + '">' +
    '<div class="wf-dname">' + d.day + '</div>' +
    '<div class="wf-dico">' + ICONS[d.code] + '</div>' +
    '<div class="wf-hi">' + d.hi + '°</div>' +
    '<div class="wf-lo">' + d.lo + '°</div></div>';
}).join('');`,

  seo: {
    title: 'Weather Forecast — 5-Day Forecast Card HTML CSS JS',
    description: `A weather card with current conditions and a 5-day forecast row, using code-to-icon mapping and high/low temps. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Weather Forecast — Current Conditions Plus a 5-Day Outlook Row',
      description: `A weather forecast card shows the current conditions prominently and a multi-day outlook beneath — the layout of every weather app and dashboard widget. This snippet builds it in plain HTML, CSS, and vanilla JavaScript: a current-conditions header with temperature and details, plus a 5-day row of glassy day tiles with high/low temps, driven by a clean weather-code-to-icon mapping — no library.

**A code-to-icon mapping, not hardcoded emoji**

The important design choice is that conditions are represented by *codes* (\`sunny\`, \`rain\`, \`storm\`), which map to display icons and labels through \`ICONS\` and \`LABELS\` lookup tables. Real weather APIs return numeric or string condition codes, so mapping codes → presentation in one place is exactly how you'd integrate one: you translate the API's codes to these keys once, and every icon and label across the card follows. Hardcoding emoji per day would make swapping in real data a rewrite; the lookup makes it a mapping.

**Current conditions, prominent**

The header pairs a large condition icon and temperature with the location, and a right-aligned meta block showing the label, "feels like," humidity, and wind. Giving the current temperature the most visual weight (largest type) matches how people read a weather widget — now first, outlook second.

**A 5-day outlook row**

Below, each day is an equal-width glassy tile (semi-transparent over the gradient, with \`backdrop-filter\` blur) showing the day name, its condition icon, and high/low temperatures — high bold, low dimmed, the standard hierarchy so the more relevant high temp dominates. Today's tile is subtly highlighted so the user can anchor the outlook to the present. The tiles lift slightly on hover for a touch of interactivity.

**A cohesive gradient theme**

The card uses a single blue gradient background with translucent white tiles, so it reads as one polished widget rather than a set of boxes. The glass tiles over the gradient are what give it the modern weather-app look, and they'd adapt to a different palette (a warm gradient for sunny, cool for rain) if you wanted condition-driven theming.

**Data-driven and drop-in**

The card renders from a \`CURRENT\` object and a \`FORECAST\` array, so wiring it to a real API means fetching, mapping the response into those shapes (and the codes into the icon keys), and rendering. It's a clear, dependency-free reference for the current-plus-outlook weather layout and the code-to-presentation mapping that makes weather data easy to swap in.

**Units and locale are render-time concerns, not data concerns**

Notice the markup builds temperature strings as \`d.hi + '°'\` rather than baking a unit into the stored number. That separation matters because units and locale are display decisions, not data: the same \`CURRENT\`/\`FORECAST\` shapes work whether you're showing Celsius or Fahrenheit, you just convert (\`f = c * 9/5 + 32\`) at the point you format the string, ideally behind a single \`toDisplayTemp()\` helper so a unit toggle only touches one place. The same goes for day names — \`FORECAST[i].day\` is currently a static label ("Tue", "Wed"); a real integration would derive it from each forecast entry's date with \`Intl.DateTimeFormat\`, so the card automatically shows day names in the visitor's locale instead of a hardcoded English string.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A weather card renders with current conditions and a 5-day forecast row.` },
      { title: 'Read the layout', text: `The large current temp and icon sit on top; the day tiles show icon and high/low below.` },
      { title: 'Map your API codes', text: `Translate your weather API's condition codes to the ICONS/LABELS keys (sunny, rain, etc.).` },
      { title: 'Swap in your data', text: `Replace CURRENT and FORECAST with your fetched values.` },
      { title: 'Theme it', text: `Change the gradient and tile opacity, or drive the gradient from the condition.` },
      { title: 'Extend the days', text: `Add more entries to FORECAST for a 7- or 10-day outlook.` },
    ] },
    features: [
      { title: 'Code-to-icon mapping', text: `Conditions are codes mapped to icons/labels in one place — the way real APIs integrate.` },
      { title: 'Prominent current conditions', text: `A large temp and icon with location and a feels-like/humidity/wind meta block.` },
      { title: '5-day outlook row', text: `Equal-width tiles with day, icon, and high/low temps.` },
      { title: 'High/low hierarchy', text: `High temp bold, low dimmed, so the more relevant value dominates.` },
      { title: 'Today highlight', text: `The current day's tile is subtly emphasised to anchor the outlook.` },
      { title: 'Glass tiles over gradient', text: `Translucent backdrop-filter tiles give the modern weather-app look.` },
      { title: 'Hover lift', text: `Day tiles lift slightly on hover for tactility.` },
      { title: 'Data-driven & no library', text: `Renders from CURRENT + FORECAST objects in plain HTML/CSS/JS.` },
    ],
    useCases: [
      { title: 'Weather dashboard cards', text: 'Show current conditions prominently with a five-day outlook beneath, where one code-to-icon map keeps every condition label in a single place.' },
      { title: 'Trip planning pages', text: 'Add destination forecasts to a travel product beside a [flight search form](/ui-snippets/flight-search-form/), so people can check the weather while choosing dates.' },
      { title: 'Smart-home and kiosk panels', text: 'Give a glanceable forecast tile to a wall display, with the high temperature in bold and the low dimmed so the relevant value dominates.' },
      { title: 'Event and outdoor activity apps', text: 'Show the forecast for an event date alongside a [stats card](/ui-snippets/stats-card/), helping organisers decide on a backup plan.' },
      { title: 'Compact widget alternatives', text: 'Compare with the smaller [weather widget](/ui-snippets/weather-widget/) and place either inside a [metric card grid](/ui-snippets/metric-card-grid/) with other live figures.' },
    ],
    faqs: [
      { q: 'Why map condition codes to icons instead of hardcoding emoji?', a: `Real weather APIs return condition codes (numbers or strings like "rain", "clear"), not icons. Keeping ICONS and LABELS lookup tables means you translate the API's codes to these keys once, and every icon and label on the card derives from the code. Hardcoding an emoji per day would make integrating a real API a rewrite; the mapping makes it a small translation step.` },
      { q: 'How do I connect it to a real weather API?', a: `Fetch from your provider (OpenWeather, Open-Meteo, etc.), then map the response into the CURRENT object (temp, code, feels, humidity, wind) and the FORECAST array (day, code, hi, lo), translating the provider's condition codes into the ICONS/LABELS keys. Render from those shapes. All the presentation logic stays the same — only the data source and the code translation change.` },
      { q: 'How do the glass tiles work?', a: `Each day tile has a semi-transparent white background over the card's gradient plus backdrop-filter: blur, which frosts whatever is behind it — giving the modern weather-app glass look. Because the background is translucent, the tiles share the card's colour theme rather than looking like separate opaque boxes. backdrop-filter is supported in all current browsers (with a -webkit- prefix for older Safari).` },
      { q: 'Can the theme change with the weather?', a: `Yes — the card uses a single gradient, but you could pick the gradient from the current condition code (a warm gradient for sunny, a grey one for cloudy, a deep blue for storms) by mapping codes to gradients the same way icons are mapped. Apply it to the card background in the render. The glass tiles work over any gradient, so condition-driven theming is a small addition.` },
      { q: 'How do I use this weather card in React, Vue, or Angular?', a: `Hold the current conditions and forecast in state, fetch and map your API into those shapes (and codes into icon keys) in a useEffect (React), onMounted (Vue), or ngOnInit (Angular), and render the header and day tiles from them. The code-to-icon mapping and layout are framework-agnostic — only the data fetching and state move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain why ICONS and LABELS are separate lookup objects keyed by a condition code rather than the forecast array storing an emoji directly — that indirection is exactly the shape a real weather API integration needs, since providers return numeric or string codes rather than presentation-ready icons. It's also worth asking specifically what changes if you swap the hardcoded "Tue", "Wed" day labels for real dates formatted with Intl.DateTimeFormat in the visitor's own locale. For extending it, ask for an hourly forecast strip beneath the daily one, a gradient background that shifts based on the current condition code, or a unit toggle between Celsius and Fahrenheit that recomputes every displayed temperature from one stored value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a weather forecast card in plain HTML, CSS, and JavaScript with prominent current conditions and a five-day outlook row, driven entirely by a code-to-presentation mapping — no library, no live API call required for the demo.

Requirements:
- Define two lookup objects keyed by short condition codes (such as sunny, partly, cloudy, rain, storm, snow) — one mapping each code to a display icon and one mapping each code to a human-readable label — and never hardcode an icon or label directly against a specific day; every day's presentation must be derived by looking up its code in these tables.
- A current-conditions header showing a large icon and temperature pulled from a single "current" data object, alongside the location name and a secondary block showing the condition label, a "feels like" temperature, humidity, and wind speed.
- A five-day forecast row built from an array of day objects (each with a day label, a condition code, and high/low temperatures), rendered as equal-width tiles with a translucent frosted-glass background over the card's gradient.
- Give the high temperature more visual weight (larger, bolder) than the low temperature within each day tile, and visually distinguish today's tile from the rest of the row.
- Build every temperature string by concatenating the raw numeric value with a degree symbol at render time rather than storing the unit inside the data itself, so the same data could later be displayed in either Celsius or Fahrenheit by converting only at the formatting step.
- Structure the code so that swapping the static current/forecast objects for the mapped, translated response of a real weather API requires no changes to the rendering functions — only to how those two data objects are populated.`,
    },
  },
};

export default weatherForecast;
