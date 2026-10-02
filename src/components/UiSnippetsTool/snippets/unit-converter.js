const unitConverter = {
  id: 'unit-converter',
  title: 'Unit Converter',
  lastmod: '2026-06-23',
  category: 'tools',
  html: `<div class="uc-card">
  <h3>Unit converter</h3>
  <div class="uc-cats" id="ucCats"></div>
  <div class="uc-io">
    <div class="uc-field">
      <input type="number" id="ucFrom" value="1" inputmode="decimal">
      <select id="ucFromU"></select>
    </div>
    <button type="button" class="uc-swap" id="ucSwap" aria-label="Swap units">⇅</button>
    <div class="uc-field">
      <input type="number" id="ucTo" readonly>
      <select id="ucToU"></select>
    </div>
  </div>
  <p class="uc-eq" id="ucEq"></p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.uc-card{background:#fff;border-radius:16px;padding:24px;width:100%;max-width:400px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.uc-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:16px}

.uc-cats{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:20px}
.uc-cat{background:#f1f5f9;border:1px solid #e2e8f0;border-radius:999px;padding:6px 14px;font-size:12.5px;font-weight:700;color:#475569;cursor:pointer;font-family:inherit;transition:all .15s}
.uc-cat.uc-on{background:#0f172a;border-color:#0f172a;color:#fff}

.uc-io{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:10px}
.uc-field{display:flex;flex-direction:column;gap:7px;min-width:0}
.uc-field input{border:1.5px solid #e2e8f0;border-radius:10px;padding:11px 12px;font-size:18px;font-weight:700;font-family:inherit;color:#0f172a;width:100%}
.uc-field input:focus{outline:none;border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.uc-field input[readonly]{background:#f8fafc;color:#4f46e5}
.uc-field select{border:1.5px solid #e2e8f0;border-radius:9px;padding:8px 9px;font-size:12.5px;font-weight:600;font-family:inherit;color:#475569;background:#fff;cursor:pointer;width:100%}
.uc-field select:focus{outline:none;border-color:#6366f1}

.uc-swap{width:38px;height:38px;border:1.5px solid #e2e8f0;background:#f8fafc;border-radius:10px;font-size:16px;color:#6366f1;cursor:pointer;flex-shrink:0;margin-bottom:1px;transition:transform .25s,background .15s}
.uc-swap:hover{background:#eef2ff}
.uc-swap.uc-spin{transform:rotate(180deg)}

.uc-eq{margin-top:18px;text-align:center;font-size:13px;font-weight:600;color:#94a3b8;font-variant-numeric:tabular-nums}`,

  js: `// Each unit maps to a base unit via a factor. Temperature needs formulas, so it
// carries to/from base converters instead of a plain factor.
var CATS = {
  Length: { base: 'm', units: { Millimeters: 0.001, Centimeters: 0.01, Meters: 1, Kilometers: 1000, Inches: 0.0254, Feet: 0.3048, Miles: 1609.344 } },
  Weight: { base: 'g', units: { Milligrams: 0.001, Grams: 1, Kilograms: 1000, Ounces: 28.3495, Pounds: 453.592, Stone: 6350.29 } },
  Temperature: { base: 'C', units: {
    Celsius:    { to: function (c) { return c; }, from: function (c) { return c; } },
    Fahrenheit: { to: function (f) { return (f - 32) * 5 / 9; }, from: function (c) { return c * 9 / 5 + 32; } },
    Kelvin:     { to: function (k) { return k - 273.15; }, from: function (c) { return c + 273.15; } },
  } },
  Volume: { base: 'l', units: { Milliliters: 0.001, Liters: 1, 'Cups (US)': 0.236588, 'Pints (US)': 0.473176, 'Gallons (US)': 3.78541 } },
};

var catsEl = document.getElementById('ucCats');
var fromIn = document.getElementById('ucFrom');
var toIn = document.getElementById('ucTo');
var fromSel = document.getElementById('ucFromU');
var toSel = document.getElementById('ucToU');
var eq = document.getElementById('ucEq');
var current = 'Length';

function toBase(cat, unit, value) {
  var u = CATS[cat].units[unit];
  return typeof u === 'object' ? u.to(value) : value * u;
}
function fromBase(cat, unit, base) {
  var u = CATS[cat].units[unit];
  return typeof u === 'object' ? u.from(base) : base / u;
}

function round(n) {
  if (!isFinite(n)) return '0';
  return parseFloat(n.toFixed(6)).toString();
}

function convert() {
  var v = parseFloat(fromIn.value);
  if (isNaN(v)) { toIn.value = ''; eq.textContent = ''; return; }
  var base = toBase(current, fromSel.value, v);
  var out = fromBase(current, toSel.value, base);
  toIn.value = round(out);
  eq.textContent = round(v) + ' ' + fromSel.value + ' = ' + round(out) + ' ' + toSel.value;
}

function fillUnits() {
  var opts = Object.keys(CATS[current].units).map(function (u) { return '<option>' + u + '</option>'; }).join('');
  fromSel.innerHTML = opts;
  toSel.innerHTML = opts;
  fromSel.selectedIndex = 0;
  toSel.selectedIndex = Math.min(1, toSel.options.length - 1);
}

function selectCat(cat) {
  current = cat;
  catsEl.querySelectorAll('.uc-cat').forEach(function (b) { b.classList.toggle('uc-on', b.dataset.cat === cat); });
  fillUnits();
  convert();
}

catsEl.innerHTML = Object.keys(CATS).map(function (c) {
  return '<button type="button" class="uc-cat" data-cat="' + c + '">' + c + '</button>';
}).join('');
catsEl.addEventListener('click', function (e) {
  var b = e.target.closest('.uc-cat');
  if (b) selectCat(b.dataset.cat);
});

[fromIn, fromSel, toSel].forEach(function (el) { el.addEventListener('input', convert); });

document.getElementById('ucSwap').addEventListener('click', function () {
  var f = fromSel.value;
  fromSel.value = toSel.value;
  toSel.value = f;
  this.classList.toggle('uc-spin');
  convert();
});

selectCat('Length');`,

  seo: {
    title: 'Unit Converter — Length, Weight, Temp Converter JS',
    description: `A unit converter for length, weight, temperature & volume — base-factor engine, live conversion, and swap. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Unit Converter — Base-Factor Engine Across Length, Weight, Temperature & Volume',
      description: `A unit converter looks simple but hides a real design question: how do you convert any unit to any other without writing a formula for every pair? This snippet builds a multi-category converter — length, weight, temperature, and volume — on a clean base-unit engine that needs only one factor per unit, in plain HTML, CSS, and vanilla JavaScript, with no library.

**Convert through a base unit, not pair-by-pair**

The key idea: instead of defining a conversion for every pair of units (which grows quadratically), each unit is defined by a single factor relative to one base unit per category — metres for length, grams for weight, litres for volume. To convert, you go to the base (\`value × factor\`) and back out (\`base ÷ targetFactor\`). So any-to-any conversion needs just N factors, not N² formulas, and adding a new unit is one number. This base-unit approach is how every real conversion library is structured.

**Temperature is the exception — and it's handled**

Temperature can't use a simple multiplier because the scales have different zero points (0°C isn't 0°F). The engine handles this by letting a unit be either a plain factor *or* an object with \`to\`/\`from\` functions that convert to and from the base (Celsius). Celsius is identity, Fahrenheit uses \`(°F−32)×5/9\`, Kelvin subtracts 273.15. Because \`toBase\`/\`fromBase\` check the unit's type, formula-based and factor-based units coexist in the same engine — the detail that makes a single converter handle both linear and affine units correctly.

**Live, two-way, with a swap**

Typing a value converts instantly, and changing either dropdown re-converts. A swap button exchanges the from/to units (with a little rotate animation) so you can flip the direction without retyping — and it re-runs the conversion immediately. The result field is read-only so it always reflects a real conversion rather than stray input, and an equation line ("1 Meters = 3.28084 Feet") spells out the conversion in words.

**Sensible rounding**

Floating-point conversions produce noise like \`3.2808398950131235\`. The output is rounded to six significant decimals and re-parsed to drop trailing zeros, so you get \`3.28084\` rather than a long tail or a rigid fixed-decimal that shows \`5.000000\`. This "round then trim" gives clean numbers across both tiny (millimetres) and huge (miles) values.

**Data-driven and extensible**

Categories and their units live in one \`CATS\` object, and the UI (category chips, dropdowns) is generated from it — so adding a category (area, speed, data) or a unit is a data change, not new logic. It's a complete, dependency-free reference for the base-factor conversion pattern and for mixing linear and formula-based units in one engine. Note that \`fillUnits()\` defaults the "to" dropdown to the second unit in the category (\`Math.min(1, …)\`) rather than the first, specifically so picking a category never starts with identical from/to units showing a trivial "1 Meters = 1 Meters" — a small touch that makes the very first conversion shown for any category actually demonstrate the converter doing something.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A unit converter renders with category chips (Length, Weight, Temperature, Volume).` },
      { title: 'Pick a category', text: `Click a chip to load that category's units into both dropdowns.` },
      { title: 'Type a value', text: `Enter a number and choose from/to units — the result converts live.` },
      { title: 'Swap direction', text: `Click ⇅ to exchange the from and to units and re-convert instantly.` },
      { title: 'Add units or categories', text: `Edit the CATS object — add a factor for a unit or a new category; the UI regenerates.` },
      { title: 'Read the equation', text: `The line below spells out the conversion (e.g. 1 Meters = 3.28084 Feet).` },
    ] },
    features: [
      { title: 'Base-factor engine', text: `Each unit is one factor to a base unit, so any-to-any needs N factors, not N² formulas.` },
      { title: 'Four categories', text: `Length, weight, temperature, and volume out of the box, generated from data.` },
      { title: 'Formula-based temperature', text: `Units can be to/from functions, so affine scales (°F, K) work alongside linear ones.` },
      { title: 'Live two-way conversion', text: `Typing or changing either dropdown re-converts instantly.` },
      { title: 'Unit swap', text: `A swap button exchanges from/to units (with a rotate) and re-converts.` },
      { title: 'Smart rounding', text: `Round-then-trim drops floating-point noise and trailing zeros for clean numbers.` },
      { title: 'Read-only result', text: `The output field always shows a real conversion, never stray input.` },
      { title: 'Data-driven & no library', text: `Categories and units live in one CATS object; the UI generates from it — zero dependencies.` },
    ],
    useCases: [
      { title: 'Utility tool dashboards', text: 'Add a handy converter widget next to a [currency converter](/ui-snippets/currency-converter/), covering length, weight, temperature and volume.' },
      { title: 'Cooking and recipe apps', text: 'Convert volumes and weights between metric and imperial, with units generated from a data table, not hand-written pairs.' },
      { title: 'Fitness and health tools', text: 'Switch weight and height units beside a [BMI calculator](/ui-snippets/bmi-calculator/), with live two-way conversion when either dropdown changes.' },
      { title: 'Travel and shipping', text: 'Convert distances and parcel weights, and pair with a [timezone converter](/ui-snippets/timezone-converter/) for a complete travel utility panel.' },
      { title: 'Base-factor pattern teaching', text: 'Learn how one factor per unit lets any unit convert to any other, with temperature handled by to and from functions for affine scales.' },
    ],
    faqs: [
      { q: 'How does it convert any unit to any other without a formula per pair?', a: `Each unit is defined by a single factor relative to one base unit per category (metres, grams, litres). Conversion goes through the base: value × fromFactor gives the base amount, then ÷ toFactor gives the target. So N units need only N factors, and adding a unit is one number — versus N² formulas if you converted each pair directly. This base-unit design is how conversion libraries are built.` },
      { q: 'Why does temperature need special handling?', a: `Temperature scales are affine, not linear — they have different zero points (0°C = 32°F), so a single multiplier can't convert them. The engine lets a unit be either a plain factor or an object with to/from functions that map to and from the base (Celsius). toBase/fromBase check the unit's type, so formula-based units like Fahrenheit and Kelvin work in the same engine as factor-based ones like metres.` },
      { q: 'How does it avoid ugly floating-point results?', a: `Raw conversions produce values like 3.2808398950131235. The output is rounded to six decimals with toFixed(6), then parseFloat re-parses it to strip trailing zeros — so you get 3.28084, not a long tail and not a rigid 5.000000. This round-then-trim approach gives clean numbers across both very small and very large magnitudes.` },
      { q: 'How do I add a new category or unit?', a: `Edit the CATS object. To add a unit, add a key with its factor relative to that category's base (e.g. Yards: 0.9144 under Length). To add a category, add an entry with a base and a units map (use to/from functions if it's an affine scale). The category chips and dropdowns are generated from CATS, so the UI updates automatically — no new conversion logic needed.` },
      { q: 'How do I use this converter in React, Vue, or Angular?', a: `Keep the CATS data as a constant and hold the current category, value, and units in state. Derive the result with a computed/useMemo from those, and render chips and options from CATS. In React use useState; in Vue, refs and computed; in Angular, component properties and a getter. The base-factor conversion functions are framework-agnostic and port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the conversion math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why toBase and fromBase check typeof u === 'object' before deciding whether to call a function or multiply by a factor, and what would break if Temperature used the same plain-factor scheme as Length. It's also worth asking about robustness — the round() function uses toFixed(6) then reparses with parseFloat, so ask what happens with extremely large or extremely small values, and whether that's still safe. For extending it, have it add an area or speed category following the existing base-factor pattern, a "favorite conversions" list that persists to localStorage, or a mode where typing in either field converts in both directions instead of one field always being read-only. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-category unit converter (length, weight, temperature, volume) in plain HTML, CSS, and vanilla JavaScript with no libraries, using a base-unit conversion engine rather than a formula per unit pair.

Requirements:
- Define a data object where each category has a base unit name and a map of units to either a plain numeric factor relative to that base (for linear units like meters, grams, liters) or an object with "to" and "from" functions that convert a value to and from the base unit (for temperature, since Celsius/Fahrenheit/Kelvin have different zero points and cannot use a simple multiplier).
- Write a toBase(category, unit, value) function and a fromBase(category, unit, baseValue) function that each check whether the unit entry is a factor number or a to/from function object, and branch accordingly, so linear and formula-based units share the same conversion pipeline.
- Converting from any unit to any other unit in the same category must go through exactly two calls: toBase to get the base-unit amount, then fromBase to reach the target unit — never a direct pairwise formula.
- Render category chips generated from the data object's keys; clicking one repopulates both from/to dropdowns from that category's units and re-runs the conversion.
- Typing a new value or changing either dropdown must recompute and display the result immediately, plus a plain-English equation line like "1 Meters = 3.28084 Feet".
- A swap button must exchange the selected from/to units and re-convert immediately.
- Round the displayed result to avoid floating-point noise (e.g. round to a fixed number of decimals) but strip trailing zeros so short results display cleanly.`,
    },
  },
};

export default unitConverter;
