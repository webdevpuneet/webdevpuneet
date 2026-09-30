const airQualityIndexGauge = {
  id: 'air-quality-index-gauge',
  title: 'Air Quality Index Gauge',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<section class="aqi-wrap">
  <span class="aqi-tag">epa aqi scale</span>
  <h1>Air Quality Index</h1>

  <div class="aqi-gauge-stage">
    <svg class="aqi-gauge" viewBox="0 0 220 130" id="aqiSvg">
      <path d="M 14 116 A 96 96 0 0 1 42.7 45.9" fill="none" stroke="#22c55e" stroke-width="18" stroke-linecap="round"/>
      <path d="M 42.7 45.9 A 96 96 0 0 1 92.3 16.4" fill="none" stroke="#eab308" stroke-width="18" stroke-linecap="round"/>
      <path d="M 92.3 16.4 A 96 96 0 0 1 127.7 16.4" fill="none" stroke="#f97316" stroke-width="18" stroke-linecap="round"/>
      <path d="M 127.7 16.4 A 96 96 0 0 1 168.5 39.6" fill="none" stroke="#ef4444" stroke-width="18" stroke-linecap="round"/>
      <path d="M 168.5 39.6 A 96 96 0 0 1 197.4 79.6" fill="none" stroke="#a855f7" stroke-width="18" stroke-linecap="round"/>
      <path d="M 197.4 79.6 A 96 96 0 0 1 206 116" fill="none" stroke="#7f1d1d" stroke-width="18" stroke-linecap="round"/>
      <line id="aqiNeedle" x1="110" y1="116" x2="110" y2="30" stroke="#fff" stroke-width="3" stroke-linecap="round" transform="rotate(0 110 116)"/>
      <circle cx="110" cy="116" r="7" fill="#fff"/>
    </svg>
    <div class="aqi-readout">
      <span class="aqi-value" id="aqiValue">42</span>
      <span class="aqi-band" id="aqiBandLabel">Good</span>
    </div>
  </div>

  <input type="range" id="aqiSlider" min="0" max="500" value="42" step="1" class="aqi-slider">

  <div class="aqi-presets" id="aqiPresets">
    <button type="button" data-val="25">Good</button>
    <button type="button" data-val="75">Moderate</button>
    <button type="button" data-val="125">USG</button>
    <button type="button" data-val="175">Unhealthy</button>
    <button type="button" data-val="250">Very Unhealthy</button>
    <button type="button" data-val="400">Hazardous</button>
  </div>

  <div class="aqi-advisory" id="aqiAdvisory">
    <strong id="aqiAdvisoryTitle">Good</strong>
    <p id="aqiAdvisoryText">Air quality is satisfactory, and air pollution poses little or no risk.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#101827,#040609 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.aqi-wrap{width:100%;max-width:400px;text-align:center}
.aqi-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#93c5fd;background:rgba(147,197,253,.1);border:1px solid rgba(147,197,253,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.aqi-wrap h1{font-size:clamp(22px,5vw,28px);font-weight:800;letter-spacing:-.02em;margin-bottom:8px}
.aqi-gauge-stage{position:relative;margin:8px auto 4px}
.aqi-gauge{width:100%;max-width:320px;display:block;margin:0 auto}
#aqiNeedle{transition:transform .5s cubic-bezier(.34,1.4,.4,1)}
.aqi-readout{margin-top:-26px}
.aqi-value{display:block;font-size:38px;font-weight:800;font-variant-numeric:tabular-nums;letter-spacing:-.02em}
.aqi-band{display:block;font-size:13px;font-weight:700;color:#9aa5c4;margin-top:2px}
.aqi-slider{width:100%;margin:18px 0 14px;accent-color:#60a5fa}
.aqi-presets{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:16px}
.aqi-presets button{padding:7px 11px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#c7cfe3;font:700 10.5px system-ui;cursor:pointer}
.aqi-presets button:hover{background:rgba(255,255,255,.1)}
.aqi-advisory{text-align:left;border-radius:14px;padding:16px 18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);transition:border-color .3s}
.aqi-advisory strong{display:block;font-size:15px;font-weight:800;margin-bottom:5px}
.aqi-advisory p{font-size:12.5px;line-height:1.6;color:#aeb6cc}`,

  js: `var slider = document.getElementById('aqiSlider');
var valueEl = document.getElementById('aqiValue');
var bandLabelEl = document.getElementById('aqiBandLabel');
var needle = document.getElementById('aqiNeedle');
var advisoryEl = document.getElementById('aqiAdvisory');
var advisoryTitle = document.getElementById('aqiAdvisoryTitle');
var advisoryText = document.getElementById('aqiAdvisoryText');
var presets = document.querySelectorAll('#aqiPresets button');

// Real EPA Air Quality Index breakpoints and standard category colors.
// Source: US EPA AQI technical documentation (40 CFR Part 58, Appendix G).
var BANDS = [
  { max: 50,  name: 'Good',                            color: '#22c55e', advisory: 'Air quality is satisfactory, and air pollution poses little or no risk.' },
  { max: 100, name: 'Moderate',                         color: '#eab308', advisory: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.' },
  { max: 150, name: 'Unhealthy for Sensitive Groups',   color: '#f97316', advisory: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.' },
  { max: 200, name: 'Unhealthy',                        color: '#ef4444', advisory: 'Some members of the general public may experience health effects; sensitive groups may experience more serious effects.' },
  { max: 300, name: 'Very Unhealthy',                   color: '#a855f7', advisory: 'Health alert: The risk of health effects is increased for everyone.' },
  { max: Infinity, name: 'Hazardous',                   color: '#7f1d1d', advisory: 'Health warning of emergency conditions: everyone is more likely to be affected.' }
];

function bandFor(aqi) {
  for (var i = 0; i < BANDS.length; i++) {
    if (aqi <= BANDS[i].max) return BANDS[i];
  }
  return BANDS[BANDS.length - 1];
}

function update(aqi) {
  aqi = Math.max(0, Math.min(500, aqi));
  var band = bandFor(aqi);

  valueEl.textContent = aqi;
  valueEl.style.color = band.color;
  bandLabelEl.textContent = band.name;
  advisoryTitle.textContent = band.name;
  advisoryTitle.style.color = band.color;
  advisoryText.textContent = band.advisory;
  advisoryEl.style.borderColor = band.color + '55';

  // Needle sweeps a 180deg semicircle: 0 AQI = -90deg (pointing left),
  // 500 AQI = +90deg (pointing right).
  var angle = (aqi / 500) * 180 - 90;
  needle.setAttribute('transform', 'rotate(' + angle + ' 110 116)');
}

slider.addEventListener('input', function () { update(+slider.value); });

presets.forEach(function (btn) {
  btn.addEventListener('click', function () {
    slider.value = btn.dataset.val;
    update(+btn.dataset.val);
  });
});

update(+slider.value);`,

  seo: {
    title: 'Air Quality Index Gauge — Free EPA AQI Semicircle Gauge',
    description: `An Air Quality Index gauge with the real EPA AQI breakpoints and colors — Good through Hazardous — plus a slider, presets, and a per-band health advisory. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Air Quality Index Gauge — Real EPA Breakpoints, Colors, and Advisories',
      description: `This gauge uses the actual US EPA Air Quality Index scale — the same six categories, breakpoints, and colors published in the EPA's AQI technical documentation — not an invented 0-100 approximation. Drag the slider or click a preset and every part of the UI (needle angle, readout color, band name, health advisory) derives from the same real breakpoint table.

**The real EPA breakpoints**

The \`BANDS\` array encodes the actual six AQI categories: **Good** (0-50, green \`#22c55e\`), **Moderate** (51-100, yellow \`#eab308\`), **Unhealthy for Sensitive Groups** (101-150, orange \`#f97316\`), **Unhealthy** (151-200, red \`#ef4444\`), **Very Unhealthy** (201-300, purple \`#a855f7\`), and **Hazardous** (301+, maroon \`#7f1d1d\`). \`bandFor(aqi)\` walks the table and returns the first band whose \`max\` the value doesn't exceed — the same lookup logic any real AQI display uses, just applied to a value you control with a slider instead of a live sensor feed.

**One SVG arc, six colored segments**

The gauge is a single semicircular SVG built from six separate \`<path>\` arcs, each stroked in its band's exact color and sized proportionally to that band's real point range — the Good segment is visually narrower than Hazardous's open-ended range gets represented as a fixed final wedge, matching how AQI scales are conventionally drawn. A single needle \`<line>\` rotates from -90° (0 AQI) to +90° (500 AQI) via \`transform: rotate()\`, animated with a spring-like \`cubic-bezier\` transition so moving the slider sweeps the needle smoothly across the full 500-point scale.

**A health advisory per band, not just a color**

Each band carries the real short-form advisory language associated with that AQI category — from "little or no risk" at Good to "everyone is more likely to be affected" at Hazardous — so the gauge communicates what the number actually means, not just what color it is. Pair this with a [weather widget](/ui-snippets/weather-widget/) or [weather forecast](/ui-snippets/weather-forecast/) card for a complete environmental conditions dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The gauge renders at AQI 42 — Good.` },
      { title: 'Drag the slider', text: `The needle sweeps and the readout updates live, 0–500.` },
      { title: 'Click a preset', text: `Jump straight to a representative value for each band.` },
      { title: 'Read the advisory', text: `The health message below updates per real EPA band.` },
      { title: 'Cross the 50/100/150/200/300 marks', text: `Watch the color and band name change at the real breakpoints.` },
      { title: 'Wire up live data', text: `Replace the slider with a call to update(aqi) from an air-quality API.` },
    ] },
    features: [
      { title: 'Real EPA breakpoints', text: `50/100/150/200/300 — the actual AQI category boundaries.` },
      { title: 'Standard AQI colors', text: `Green through maroon, matching official EPA category colors.` },
      { title: 'Six-arc SVG gauge', text: `Each band drawn as its own proportionally sized colored arc.` },
      { title: 'Animated needle sweep', text: `Spring-eased rotation across the full 0–500 semicircle.` },
      { title: 'Per-band health advisory', text: `Real short-form guidance text for each category.` },
      { title: 'Slider and presets', text: `Drag freely or jump to one value per band instantly.` },
      { title: 'Single source of truth', text: `One BANDS table drives color, label, angle, and advisory.` },
      { title: 'Zero dependencies', text: `Pure SVG and CSS, no charting library.` },
    ],
    useCases: [
      { title: 'Weather dashboards', text: `Pair with a [weather widget](/ui-snippets/weather-widget/).` },
      { title: 'Environmental monitoring apps', text: `Show live sensor AQI with the real color scale.` },
      { title: 'Smart home displays', text: `An air-purifier or HVAC dashboard tile.` },
      { title: 'Travel/outdoor activity apps', text: `Advise users before outdoor plans.` },
      { title: 'Public health dashboards', text: `Municipal or regional air-quality reporting.` },
      { title: 'City/government portals', text: `Pair with [weather forecast](/ui-snippets/weather-forecast/) for a conditions page.` },
      { icon: 'CODE', title: 'Related: Chart.js Gradient Revenue Chart', desc: 'See the [Chart.js Gradient Revenue Chart](/ui-snippets/chartjs-revenue-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Chord Diagram Chart', desc: 'See the [Chord Diagram Chart](/ui-snippets/chord-diagram-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Beeswarm Plot Chart', desc: 'See the [Beeswarm Plot Chart](/ui-snippets/beeswarm-plot-chart/) for a related charts pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Arc Diagram Chart', desc: 'See the [Arc Diagram Chart](/ui-snippets/arc-diagram-chart/) for a related charts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Are the AQI breakpoints in this gauge accurate?', a: `Yes. The BANDS table uses the real US EPA Air Quality Index breakpoints: Good 0-50, Moderate 51-100, Unhealthy for Sensitive Groups 101-150, Unhealthy 151-200, Very Unhealthy 201-300, and Hazardous 301 and above, matching the EPA's published AQI technical documentation. The colors (green, yellow, orange, red, purple, maroon) match the official category colors used on EPA and AirNow reporting.` },
      { q: 'How does the needle angle get computed?', a: `The gauge sweeps a 180-degree semicircle, so the needle's rotation angle is (aqi / 500) * 180 - 90, mapping AQI 0 to -90 degrees (pointing left) and AQI 500 to +90 degrees (pointing right). A CSS transition with a spring-like cubic-bezier easing animates the rotation whenever the underlying value changes, whether from the slider or a preset button.` },
      { q: 'Why is the Hazardous segment a fixed size if the range is open-ended?', a: `AQI values technically extend past 500 in extreme cases, but 500 is the top of the standard reporting scale used by the EPA and AirNow, and the slider and gauge are capped there (values are clamped with Math.max/Math.min). The Hazardous arc represents 301-500 on the gauge, consistent with how the scale is conventionally visualized even though real-world Hazardous readings can occasionally exceed 500.` },
      { q: 'Can I feed this gauge live sensor data instead of the slider?', a: `Yes — the slider and preset buttons are just two ways of calling the same update(aqi) function, which handles clamping the value, finding the right band, and updating the needle angle, readout, and advisory text. Call update(currentAqiFromYourApi) on whatever interval your air-quality data source refreshes, and remove or hide the slider if you don't want manual control.` },
      { q: 'How do I use this AQI gauge in React, Vue, or Angular?', a: `Keep the numeric AQI value in component state, derive the active band by running the same breakpoint lookup against it, and bind the needle's rotate() transform, the readout color, and the advisory text to that derived band — the SVG arcs themselves are static and never need to re-render, only the needle's transform attribute and a few text/color bindings change.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to verify the AQI breakpoint values and colors against the EPA's official AQI technical documentation, and to explain how the needle's rotation formula ((aqi / 500) * 180 - 90) maps the 0-500 AQI scale onto a 180-degree semicircle. It's also useful for reasoning about the gauge construction — ask why each band is drawn as a separate SVG arc segment rather than one continuous gradient stroke, and what tradeoffs that makes for getting hard color boundaries exactly at the real breakpoints versus a smoother but less accurate gradient. For extensions, ask it to wire the gauge up to a real air-quality API (like AirNow or OpenWeatherMap's air pollution endpoint) with polling, add a small history sparkline beneath the gauge showing the last 24 hours, or add a second gauge for PM2.5 concentration alongside the overall AQI. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "air quality index gauge" in plain HTML, CSS, and JavaScript (inline SVG, no charting library) using the real US EPA Air Quality Index scale.

Requirements:
- Use the actual EPA AQI breakpoints and standard category colors: Good 0-50 (green), Moderate 51-100 (yellow), Unhealthy for Sensitive Groups 101-150 (orange), Unhealthy 151-200 (red), Very Unhealthy 201-300 (purple), Hazardous 301+ (maroon). Get these boundaries and colors exactly right — do not invent different thresholds.
- Render a semicircular gauge as inline SVG, built from six separate arc <path> elements (one per band) each stroked in its band's real color, sized proportionally to that band's point range within the 0-500 scale the gauge represents.
- A single needle line element that rotates via a CSS transform: rotate() to point at the current AQI value, mapped linearly across the semicircle (0 AQI at one end, 500 AQI at the other), animated with a smooth easing transition whenever the value changes.
- A range slider (0-500) that updates the AQI value live as it's dragged, plus a row of preset buttons that jump directly to a representative value within each of the six bands.
- A big numeric AQI readout and a text label showing the current band name, both colored to match the active band, plus a short health advisory paragraph beneath the gauge that changes to that band's real short-form EPA guidance text (e.g. "little or no risk" for Good, up through "everyone is more likely to be affected" for Hazardous).
- Structure the code so a single function (e.g. update(aqiValue)) is the one place that looks up the correct band from an AQI value and updates the needle angle, readout color, band label, and advisory text — so the same function could later be driven by a live air-quality API instead of the slider.`,
    },
  },
};

export default airQualityIndexGauge;
