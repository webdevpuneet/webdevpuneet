const uvIndexMeter = {
  id: 'uv-index-meter',
  title: 'UV Index Meter',
  lastmod: '2026-08-22',
  category: 'charts',
  cdnUrls: [],
  html: `<section class="uvi-wrap">
  <span class="uvi-tag">who / epa uv index</span>
  <h1>UV Index</h1>

  <div class="uvi-meter">
    <div class="uvi-track">
      <div class="uvi-seg" style="background:#3bb143"></div>
      <div class="uvi-seg" style="background:#f7d038"></div>
      <div class="uvi-seg" style="background:#f9a03f"></div>
      <div class="uvi-seg" style="background:#e0433a"></div>
      <div class="uvi-seg" style="background:#a34ac4"></div>
      <div class="uvi-fill" id="uviFill"></div>
      <div class="uvi-marker" id="uviMarker"></div>
    </div>
    <div class="uvi-scale-labels"><span>0</span><span>3</span><span>6</span><span>8</span><span>11+</span></div>
  </div>

  <div class="uvi-readout">
    <span class="uvi-value" id="uviValue">5</span>
    <span class="uvi-band" id="uviBandLabel">Moderate</span>
  </div>

  <input type="range" id="uviSlider" min="0" max="13" value="5" step="1" class="uvi-slider">

  <div class="uvi-presets" id="uviPresets">
    <button type="button" data-val="1">Low</button>
    <button type="button" data-val="4">Moderate</button>
    <button type="button" data-val="6.5">High</button>
    <button type="button" data-val="9">Very High</button>
    <button type="button" data-val="12">Extreme</button>
  </div>

  <div class="uvi-advice" id="uviAdvice">
    <strong id="uviAdviceTitle">Moderate</strong>
    <p id="uviAdviceText">Stay in shade near midday when the sun is strongest. Wear sun protective clothing, a wide-brim hat, and UV-blocking sunglasses.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 90% at 50% 0%,#231407,#0a0603 60%);color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:26px}
.uvi-wrap{width:100%;max-width:400px}
.uvi-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#fbbf24;background:rgba(251,191,36,.1);border:1px solid rgba(251,191,36,.3);padding:5px 12px;border-radius:99px;margin-bottom:12px}
.uvi-wrap h1{font-size:clamp(22px,5vw,28px);font-weight:800;letter-spacing:-.02em;margin-bottom:18px}
.uvi-meter{margin-bottom:16px}
.uvi-track{position:relative;height:20px;border-radius:99px;overflow:hidden;display:flex}
.uvi-seg{flex:1;height:100%}
.uvi-fill{position:absolute;top:0;right:0;height:100%;background:rgba(6,8,14,.72);transition:width .4s cubic-bezier(.34,1.2,.4,1)}
.uvi-marker{position:absolute;top:-5px;width:4px;height:30px;background:#fff;border-radius:3px;box-shadow:0 0 0 2px rgba(0,0,0,.5);transition:left .4s cubic-bezier(.34,1.2,.4,1);transform:translateX(-50%)}
.uvi-scale-labels{display:flex;justify-content:space-between;font-size:10.5px;color:#a08a70;margin-top:6px;font-variant-numeric:tabular-nums}
.uvi-readout{text-align:center;margin-bottom:6px}
.uvi-value{display:block;font-size:44px;font-weight:800;line-height:1;font-variant-numeric:tabular-nums}
.uvi-band{display:block;font-size:13px;font-weight:700;color:#c7ab84;margin-top:4px}
.uvi-slider{width:100%;margin:14px 0;accent-color:#f9a03f}
.uvi-presets{display:flex;gap:6px;flex-wrap:wrap;justify-content:center;margin-bottom:16px}
.uvi-presets button{padding:7px 12px;border-radius:8px;border:1px solid rgba(255,255,255,.14);background:rgba(255,255,255,.04);color:#e5d5bd;font:700 10.5px system-ui;cursor:pointer}
.uvi-presets button:hover{background:rgba(255,255,255,.1)}
.uvi-advice{border-radius:14px;padding:16px 18px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);transition:border-color .3s}
.uvi-advice strong{display:block;font-size:15px;font-weight:800;margin-bottom:5px}
.uvi-advice p{font-size:12.5px;line-height:1.6;color:#c9bda9}`,

  js: `var slider = document.getElementById('uviSlider');
var valueEl = document.getElementById('uviValue');
var bandLabelEl = document.getElementById('uviBandLabel');
var fillEl = document.getElementById('uviFill');
var markerEl = document.getElementById('uviMarker');
var adviceEl = document.getElementById('uviAdvice');
var adviceTitle = document.getElementById('uviAdviceTitle');
var adviceText = document.getElementById('uviAdviceText');
var presets = document.querySelectorAll('#uviPresets button');

// Real WHO / US EPA UV Index categories and boundaries.
// Source: WHO Global Solar UV Index guide / US EPA UV Index Scale.
var BANDS = [
  { max: 2,       name: 'Low',       color: '#3bb143', advice: 'Minimal danger from the sun for the average person. Wear sunglasses on bright days; if you burn easily, cover up and use SPF 30+ sunscreen.' },
  { max: 5,       name: 'Moderate',  color: '#f7d038', advice: 'Stay in shade near midday when the sun is strongest. Wear sun protective clothing, a wide-brim hat, and UV-blocking sunglasses.' },
  { max: 7,       name: 'High',      color: '#f9a03f', advice: 'Protection required — unprotected skin can burn quickly. Reduce time in the sun between 10am and 4pm, and seek shade.' },
  { max: 10,      name: 'Very High', color: '#e0433a', advice: 'Extra precautions needed — unprotected skin burns very fast. Minimize sun exposure during midday hours and wear SPF 30+ sunscreen, reapplied often.' },
  { max: Infinity, name: 'Extreme',  color: '#a34ac4', advice: 'Take all precautions — unprotected skin can burn in minutes. Avoid sun exposure between 10am and 4pm; seek shade and cover up fully.' }
];

var UV_MAX_SCALE = 13; // display cap; the scale is technically open-ended

function bandFor(uv) {
  for (var i = 0; i < BANDS.length; i++) {
    if (uv <= BANDS[i].max) return BANDS[i];
  }
  return BANDS[BANDS.length - 1];
}

function formatUv(uv) {
  return Number.isInteger(uv) ? String(uv) : uv.toFixed(1);
}

function update(uv) {
  uv = Math.max(0, Math.min(UV_MAX_SCALE, uv));
  var band = bandFor(uv);
  var pct = (uv / UV_MAX_SCALE) * 100;

  valueEl.textContent = formatUv(uv);
  valueEl.style.color = band.color;
  bandLabelEl.textContent = band.name;
  adviceTitle.textContent = band.name;
  adviceTitle.style.color = band.color;
  adviceText.textContent = band.advice;
  adviceEl.style.borderColor = band.color + '55';

  fillEl.style.width = (100 - pct) + '%';
  markerEl.style.left = pct + '%';
}

slider.addEventListener('input', function () { update(+slider.value); });

presets.forEach(function (btn) {
  btn.addEventListener('click', function () {
    var v = parseFloat(btn.dataset.val);
    slider.value = v;
    update(v);
  });
});

update(+slider.value);`,

  seo: {
    title: 'UV Index Meter — Free WHO/EPA UV Index Scale Widget',
    description: `A UV Index meter using the real WHO/EPA UV Index bands — Low through Extreme — with the correct color coding, a slider, presets, and per-band sun-safety advice. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'UV Index Meter — Real WHO/EPA Bands With Per-Level Sun-Safety Advice',
      description: `This meter reproduces the actual UV Index scale published by the World Health Organization and used in the US EPA's UV Index reporting — the same five categories, boundaries, and colors you'd see on a weather app's UV forecast — not an arbitrary gradient.

**The real UV Index bands**

The \`BANDS\` array encodes the WHO/EPA scale exactly: **Low** (0-2, green \`#3bb143\`), **Moderate** (3-5, yellow \`#f7d038\`), **High** (6-7, orange \`#f9a03f\`), **Very High** (8-10, red \`#e0433a\`), and **Extreme** (11+, purple \`#a34ac4\`). \`bandFor(uv)\` returns the first band whose \`max\` the value doesn't exceed, the same lookup pattern a real weather app's UV display uses, driven here by a slider capped for display purposes at 13.

**A masked-fill meter, not a bar chart**

The track is five fixed colored segments sized to match the real band ranges, permanently visible end to end — the "meter" effect comes from \`uvi-fill\`, a dark overlay anchored to the right edge whose \`width\` shrinks as the UV value rises, progressively revealing more of the colored scale from the left. A separate \`uvi-marker\` tick slides along the track via a \`left\` percentage to point at the exact current value, both animated with the same spring-like easing so the meter feels responsive without looking like a plain progress bar.

**Sun-safety advice per band, not just a color**

Each band carries real short-form WHO/EPA guidance — from "minimal danger" and optional sunglasses at Low, through mandatory shade and reapplied SPF 30+ at High and Very High, to "unprotected skin can burn in minutes" at Extreme — so the number on screen comes with the actual action it implies. Pair this with an [air quality index gauge](/ui-snippets/air-quality-index-gauge/) or [weather widget](/ui-snippets/weather-widget/) for a full outdoor-conditions dashboard.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `The meter renders at UV 5 — Moderate.` },
      { title: 'Drag the slider', text: `The marker and dark mask move live across the real band track.` },
      { title: 'Click a preset', text: `Jump to a representative value in each of the five bands.` },
      { title: 'Read the advice', text: `Sun-safety guidance updates to match the real WHO/EPA band.` },
      { title: 'Cross the 2/5/7/10 marks', text: `Watch the label and color change exactly at real breakpoints.` },
      { title: 'Wire up live data', text: `Call update(uv) from a weather API's UV forecast field.` },
    ] },
    features: [
      { title: 'Real WHO/EPA bands', text: `2/5/7/10 — the actual UV Index category boundaries.` },
      { title: 'Standard UV colors', text: `Green through purple, matching official UV Index colors.` },
      { title: 'Masked-fill meter', text: `A sliding dark overlay reveals the fixed colored scale.` },
      { title: 'Animated marker tick', text: `Points at the exact current UV value with spring easing.` },
      { title: 'Per-band sun-safety advice', text: `Real short-form guidance text for each category.` },
      { title: 'Slider and presets', text: `Drag freely or jump to one value per band instantly.` },
      { title: 'Single source of truth', text: `One BANDS table drives color, label, position, and advice.` },
      { title: 'Zero dependencies', text: `Pure CSS/DOM, no charting library.` },
    ],
    useCases: [
      { title: 'Weather apps', text: `Pair with a [weather widget](/ui-snippets/weather-widget/).` },
      { title: 'Outdoor activity planners', text: `Advise hikers, runners, or beachgoers before heading out.` },
      { title: 'Skin health/dermatology apps', text: `Show real-time sun-exposure risk and advice.` },
      { title: 'Parks/recreation dashboards', text: `Public-facing UV conditions for a facility.` },
      { title: 'Travel apps', text: `Combine with [weather forecast](/ui-snippets/weather-forecast/) for a destination brief.` },
      { title: 'Sunscreen/wellness product pages', text: `Contextualize protection level recommendations.` },
    ],
    faqs: [
      { q: 'Are the UV Index bands in this meter accurate?', a: `Yes. The BANDS table matches the World Health Organization's Global Solar UV Index scale, also used in US EPA UV Index reporting: Low 0-2, Moderate 3-5, High 6-7, Very High 8-10, and Extreme 11 and above, with the standard green/yellow/orange/red/purple color coding used across weather services worldwide.` },
      { q: 'Why does the meter cap display at 13 if Extreme is 11+?', a: `The UV Index scale is technically open-ended (readings near the equator at high altitude can exceed 13), but most consumer weather displays cap the visual scale around 11-13 for readability, since anything in that range already falls in the Extreme band and calls for the same maximum precautions. The UV_MAX_SCALE constant controls this cap and can be raised if you need to display higher real-world readings.` },
      { q: 'How does the "masked fill" meter effect work?', a: `The track is five fixed colored segments, always fully visible end to end and sized to the real band ranges. A dark overlay (uvi-fill) is anchored to the track's right edge and its width shrinks as the UV value increases, progressively uncovering more of the colored scale from the left — combined with a separate marker tick positioned by a left percentage to point at the exact value, this reads as a filling meter without needing a canvas or SVG gradient.` },
      { q: 'Can I feed this meter live UV data instead of the slider?', a: `Yes — the slider and preset buttons both just call the same update(uv) function, which clamps the value, looks up the correct band, and updates the marker position, fill width, readout, and advice text. Call update(currentUvFromYourWeatherApi) on whatever refresh interval your data source provides, and hide the slider/presets if manual control isn't needed.` },
      { q: 'How do I use this UV meter in React, Vue, or Angular?', a: `Keep the numeric UV value in component state, derive the active band with the same breakpoint lookup, and bind the marker's left position, the fill's width, the readout color, and the advice text to that derived band — the five colored track segments are static markup that never needs to re-render.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to verify the UV Index breakpoints and colors against the WHO Global Solar UV Index guide, and to explain how the "masked fill" meter effect works — specifically why a dark overlay anchored to the right edge with a shrinking width, combined with a separately positioned marker tick, can simulate a filling gauge without canvas or SVG. It's also useful for reasoning about display range — ask why the scale is capped at a fixed maximum for display purposes even though real UV Index readings can technically exceed it, and what the tradeoffs are of raising or lowering that cap. For extensions, ask it to wire the meter up to a real weather API's UV forecast field with periodic polling, add an hourly forecast strip showing how UV Index changes across the day, or add a "time to burn" estimate based on skin type and current UV value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "UV Index meter" in plain HTML, CSS, and JavaScript (no canvas, no charting library) using the real WHO/EPA UV Index scale.

Requirements:
- Use the actual WHO/EPA UV Index breakpoints and standard colors: Low 0-2 (green), Moderate 3-5 (yellow), High 6-7 (orange), Very High 8-10 (red), Extreme 11+ (purple). Get these boundaries and colors exactly right — do not invent different thresholds.
- Render a horizontal meter as five fixed-width colored track segments (one per band, sized proportionally to that band's real range within a display scale capped around 13), always fully visible. Layer a dark overlay div anchored to the track's right edge whose width shrinks as the current UV value increases, progressively revealing the colored scale from the left to create a "filling meter" effect — plus a separate thin marker/tick element positioned with a left percentage to point at the exact current value. Animate both with a smooth transition.
- A range slider (0 to the display cap) that updates the UV value live as it's dragged, plus a row of preset buttons that jump directly to a representative value within each of the five bands.
- A large numeric UV readout (supporting one decimal place for non-integer preset values) and a text label showing the current band name, both colored to match the active band, plus a short sun-safety advice paragraph beneath the meter that changes to that band's real WHO/EPA-style guidance (e.g. optional sunglasses at Low, up through "unprotected skin can burn in minutes" at Extreme).
- Structure the code so a single function (e.g. update(uvValue)) is the one place that looks up the correct band from a UV value and updates the marker position, fill width, readout color, band label, and advice text — so the same function could later be driven by a live weather API instead of the slider.`,
    },
  },
};

export default uvIndexMeter;
