const cascadingSelect = {
  id: 'cascading-select',
  title: 'Cascading Select',
  lastmod: '2026-06-17',
  category: 'forms',
  html: `<div class="cs2-card">
  <h2 class="cs2-title">Select your location</h2>

  <div class="cs2-field">
    <label class="cs2-label" for="cs2Country">Country</label>
    <div class="cs2-wrap">
      <select class="cs2-select" id="cs2Country" onchange="onCountry(this)"><option value="">Choose a country…</option></select>
      <svg class="cs2-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>

  <div class="cs2-field">
    <label class="cs2-label" for="cs2State">State / Region</label>
    <div class="cs2-wrap">
      <select class="cs2-select" id="cs2State" onchange="onState(this)" disabled><option value="">Select a country first</option></select>
      <svg class="cs2-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>

  <div class="cs2-field">
    <label class="cs2-label" for="cs2City">City</label>
    <div class="cs2-wrap">
      <select class="cs2-select" id="cs2City" onchange="onCity(this)" disabled><option value="">Select a region first</option></select>
      <svg class="cs2-caret" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
    </div>
  </div>

  <div class="cs2-summary" id="cs2Summary">No location selected yet.</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:60px 24px}
.cs2-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:24px;width:100%;max-width:340px;box-shadow:0 14px 44px rgba(15,23,42,.07)}
.cs2-title{font-size:17px;font-weight:800;color:#1e293b;margin-bottom:18px}

.cs2-field{margin-bottom:14px}
.cs2-label{display:block;font-size:12px;font-weight:700;color:#475569;margin-bottom:7px}
.cs2-wrap{position:relative}
.cs2-select{width:100%;appearance:none;-webkit-appearance:none;padding:11px 36px 11px 13px;border:1.5px solid #e2e8f0;border-radius:11px;font-size:14px;font-family:inherit;color:#1e293b;background:#fff;cursor:pointer;outline:none;transition:border-color .15s,box-shadow .15s,opacity .15s}
.cs2-select:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.cs2-select:disabled{background:#f8fafc;color:#94a3b8;cursor:not-allowed;opacity:.8}
.cs2-caret{position:absolute;right:12px;top:50%;transform:translateY(-50%);color:#94a3b8;pointer-events:none}
.cs2-select:disabled+.cs2-caret{color:#cbd5e1}

.cs2-summary{margin-top:18px;padding:13px 14px;border-radius:11px;background:#f8fafc;border:1px solid #f1f5f9;font-size:13px;color:#94a3b8;font-weight:600;text-align:center;transition:all .2s}
.cs2-summary.done{background:#eef2ff;border-color:#c7d2fe;color:#4f46e5}
.cs2-summary strong{color:#1e293b;font-weight:800}`,

  js: `var DATA = {
  'United States': { 'California': ['Los Angeles', 'San Francisco', 'San Diego'], 'Texas': ['Austin', 'Houston', 'Dallas'], 'New York': ['New York City', 'Buffalo'] },
  'India': { 'Maharashtra': ['Mumbai', 'Pune', 'Nagpur'], 'Karnataka': ['Bengaluru', 'Mysuru'], 'Delhi': ['New Delhi'] },
  'United Kingdom': { 'England': ['London', 'Manchester', 'Bristol'], 'Scotland': ['Edinburgh', 'Glasgow'] },
  'Australia': { 'New South Wales': ['Sydney', 'Newcastle'], 'Victoria': ['Melbourne', 'Geelong'] }
};

var countrySel = document.getElementById('cs2Country');
var stateSel = document.getElementById('cs2State');
var citySel = document.getElementById('cs2City');

function fill(select, items, placeholder) {
  var html = '<option value="">' + placeholder + '</option>';
  items.forEach(function (it) { html += '<option value="' + it + '">' + it + '</option>'; });
  select.innerHTML = html;
}

function onCountry(sel) {
  var country = sel.value;
  if (country) {
    fill(stateSel, Object.keys(DATA[country]), 'Choose a region…');
    stateSel.disabled = false;
  } else {
    stateSel.innerHTML = '<option value="">Select a country first</option>';
    stateSel.disabled = true;
  }
  citySel.innerHTML = '<option value="">Select a region first</option>';
  citySel.disabled = true;
  updateSummary();
}

function onState(sel) {
  var country = countrySel.value, state = sel.value;
  if (state) {
    fill(citySel, DATA[country][state], 'Choose a city…');
    citySel.disabled = false;
  } else {
    citySel.innerHTML = '<option value="">Select a region first</option>';
    citySel.disabled = true;
  }
  updateSummary();
}

function onCity() { updateSummary(); }

function updateSummary() {
  var parts = [countrySel.value, stateSel.value, citySel.value].filter(Boolean);
  var box = document.getElementById('cs2Summary');
  if (parts.length === 3) {
    box.innerHTML = '📍 <strong>' + parts.join('</strong> › <strong>') + '</strong>';
    box.className = 'cs2-summary done';
  } else if (parts.length) {
    box.innerHTML = parts.join(' › ') + ' …';
    box.className = 'cs2-summary';
  } else {
    box.textContent = 'No location selected yet.';
    box.className = 'cs2-summary';
  }
}

fill(countrySel, Object.keys(DATA), 'Choose a country…');`,

  seo: {
    title: 'Cascading Select — Dependent Dropdowns HTML CSS JS',
    description: `Dependent cascading dropdowns (Country → State → City): each select populates and enables the next, resetting children on change. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Cascading Select — Country → State → City Dependent Dropdowns With Reset Logic`,
      description: `Cascading (dependent) selects are everywhere data is hierarchical: country → state → city, category → subcategory → product, make → model → trim. Each choice narrows and populates the next, and crucially, changing a parent must reset its children so you can never submit an impossible combination. This snippet implements the pattern correctly with native \`<select>\` elements in plain HTML, CSS, and vanilla JavaScript: dependent population, proper reset/disable cascading, and a live summary.

**Native selects, custom-styled**

It uses real \`<select>\` elements — keyboard-accessible, screen-reader friendly, and native on mobile — with the default arrow removed (\`appearance: none\`) and a custom SVG caret layered on top, plus a focus ring. Native is the right call for cascading data: it just works on every device and needs no popover/keyboard code, while still looking custom.

**Correct dependency and reset logic**

The data is a nested object (\`DATA[country][state] = [cities]\`). On load, \`fill\` populates the country select from the top-level keys. \`onCountry\` repopulates the state select from that country's regions and enables it — and always resets and disables the city select, because the previously chosen city no longer makes sense. \`onState\` repopulates and enables cities from \`DATA[country][state]\`. This downward reset is the heart of a correct cascade: clearing children whenever a parent changes prevents stale, invalid selections (a city from a different country) from lingering or being submitted.

**Disabled-until-ready states**

Child selects start \`disabled\` with helpful placeholder text ("Select a country first", "Select a region first"), so the required order is obvious and users can't interact out of sequence. A child re-disables itself the moment its parent is cleared. The caret dims on disabled selects for a coherent look.

**Live summary**

\`updateSummary\` rebuilds a breadcrumb from the three values: nothing chosen shows a neutral prompt, a partial selection shows "United States › California …", and a complete one shows a highlighted "📍 United States › California › Los Angeles" in an accent panel — immediate confirmation of the full path.

The whole thing is driven by one nested \`DATA\` object, so wiring it to real or API-loaded data is a matter of swapping that object (or fetching the next level on each change). Pair this with a [country selector](/ui-snippets/country-selector/) for a searchable single picker, a [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for multi-value fields, or a [checkout payment form](/ui-snippets/checkout-form/) address step.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three dropdowns appear — Country is ready, while State and City are disabled with "select first" placeholders.` },
      { title: 'Pick a country', text: `Choosing one populates the State dropdown with that country's regions and enables it; City stays disabled.` },
      { title: 'Pick a region', text: `The City dropdown fills with that region's cities and enables.` },
      { title: 'Pick a city', text: `The summary updates to a highlighted "📍 Country › Region › City" path.` },
      { title: 'Change the country', text: `Pick a different country — State and City reset and re-disable so no stale, invalid combination remains.` },
      { title: 'Plug in real data', text: `Replace the nested \`DATA\` object (or fetch each level on change) — the cascade and reset logic stay the same.` },
    ] },
    features: [
      { title: 'Native accessible selects', text: `Real \`<select>\` elements stay keyboard- and screen-reader friendly and native on mobile, with a custom caret and focus ring.` },
      { title: 'Nested-data driven', text: `One \`DATA[country][state] = [cities]\` object drives all three levels, so swapping the data swaps the whole cascade.` },
      { title: 'Downward reset on change', text: `Changing a parent resets and disables its children, preventing stale, invalid selections from being submitted.` },
      { title: 'Disabled-until-ready', text: `Child selects start disabled with "select first" placeholders, making the required order obvious and out-of-sequence use impossible.` },
      { title: 'Dynamic option population', text: `\`fill\` rebuilds a select's options with a fresh placeholder, used for every level from one helper.` },
      { title: 'Live breadcrumb summary', text: `\`updateSummary\` shows a neutral prompt, a partial path, or a highlighted complete "Country › Region › City".` },
      { title: 'Coherent disabled styling', text: `Disabled selects and their carets dim together so the inactive state reads clearly.` },
      { title: 'No dependencies', text: `Pure vanilla JS and native selects — no dropdown library, popover code, or keyboard handling needed.` },
    ],
    useCases: [
      { title: 'Address and location forms', text: `Country → state → city at checkout or signup. Pair with a [checkout payment form](/ui-snippets/checkout-form/) address step.` },
      { title: 'Product / catalogue filters', text: `Category → subcategory → product, or make → model → trim, where each level narrows the next.` },
      { title: 'Org and team pickers', text: `Company → department → team selection in admin and HR tools.` },
      { title: 'Booking and travel', text: `Region → city → venue, or airport country → city → terminal, with invalid combos prevented by the reset logic.` },
      { title: 'Settings with dependent options', text: `Plan → tier → add-on choices; combine with a [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for multi-value fields.` },
      { title: 'Single searchable country picker', text: `When only one level is needed, a [country selector](/ui-snippets/country-selector/) gives flag icons and search instead.` },
      { icon: 'CODE', title: 'Related: CSS color-mix() Playground', desc: 'See the [CSS color-mix() Playground](/ui-snippets/color-mix-playground/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I load the options from an API?', a: `Fetch each level on demand: on country change, \`await\` the regions for that country, then call \`fill(stateSel, regions, …)\`; on region change, fetch and fill cities. Show a "Loading…" placeholder while the request is in flight and keep the child disabled until it resolves. The reset logic stays identical — always clear children before fetching the next level.` },
      { q: 'How do I keep the selected value when editing a saved record?', a: `After populating each level, set the select's \`value\` to the saved choice and trigger the next level's population programmatically (call \`onCountry(countrySel)\` then \`onState(stateSel)\` after setting values). This rebuilds the dependent options so the saved city is present and selected, rather than showing an empty child.` },
      { q: 'Why use native selects instead of custom dropdowns?', a: `For dependent/cascading data, native \`<select>\` is the pragmatic choice: it is fully accessible, keyboard-operable, and renders as the OS-native picker on mobile (a big usability win for long lists) with zero extra code. Custom dropdowns add popover, focus-trap, and keyboard logic for little benefit here. Use a custom control (like the [country selector](/ui-snippets/country-selector/)) only when you need search or rich option content.` },
      { q: 'How do I validate that all three are chosen before submit?', a: `Check that \`countrySel.value\`, \`stateSel.value\`, and \`citySel.value\` are all non-empty before allowing submission, and mark the missing field. Since children can't be selected before their parents, validating the deepest (city) effectively confirms the whole path — but check all three to be safe, and re-run validation if data is loaded asynchronously.` },
      { q: 'How do I use this cascading select in React, Vue, or Angular?', a: `In React, hold \`country\`, \`state\`, and \`city\` in \`useState\`; derive each select's options from the data and the parent's value, and reset children in the parent's \`onChange\` (set state/city to ''). In Vue, use \`v-model\` with \`computed\` option lists and watchers that clear children. In Angular, \`[(ngModel)]\` with getters for options. The nested-data and reset logic port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the reset chain across three functions by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why onCountry() always resets and disables the city select even though it only directly manages the state select, and why that downward reset is essential to prevent an invalid country/city combination from ever being submitted. The same assistant can help optimize it — ask whether the nested DATA object approach would still work cleanly if country and state lists needed to be fetched from an API instead of being hardcoded, and what loading-state handling that would require. It's also useful for extending the form: ask it to restore a previously saved selection on page load by programmatically triggering the same cascade, add a fourth level (e.g. neighborhood), or swap the plain selects for a searchable combobox at each level while keeping the reset logic intact. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a three-level "cascading select" (country, state, city) in plain HTML, CSS, and JavaScript using native select elements — no custom dropdown library.

Requirements:
- Represent the location data as a single nested object where each country key maps to an object of state keys, and each state key maps to an array of city strings, so the whole cascade is driven from one data structure.
- The state and city selects must start disabled with a placeholder option text telling the user to complete the previous level first (e.g. "Select a country first").
- Changing the country select must repopulate the state select's options from that country's keys and enable it, but must also immediately reset the city select back to its disabled placeholder state — even though the city select isn't the one that changed — so a city belonging to a different country can never remain selected.
- Changing the state select must repopulate the city select's options from that state's city array and enable it.
- Write one reusable function that rebuilds any select's option list from an array plus a placeholder string, used for all three levels rather than three separate populate functions.
- Maintain a live summary line below the selects that shows a neutral placeholder when nothing is chosen, a partial breadcrumb (e.g. "Country › State …") when some but not all levels are chosen, and a fully highlighted breadcrumb path when all three levels are selected.
- Style the selects with the browser's default appearance removed and a custom SVG caret icon layered on top via absolute positioning, with the caret dimming when its select is disabled.`,
    },
  },
};

export default cascadingSelect;
