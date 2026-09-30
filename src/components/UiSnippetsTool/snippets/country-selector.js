const countrySelector = {
  id: 'country-selector',
  title: 'Country Selector',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="cs-wrap" id="csWrap">
  <label class="cs-label">Country</label>
  <button type="button" class="cs-trigger" id="csTrigger" onclick="toggleDD(event)" aria-haspopup="listbox" aria-expanded="false">
    <span class="cs-flag" id="csFlag">🇺🇸</span>
    <span class="cs-current" id="csCurrent">United States</span>
    <svg class="cs-caret" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m6 9 6 6 6-6"/></svg>
  </button>

  <div class="cs-panel" id="csPanel">
    <div class="cs-searchbar">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" stroke-width="2.5"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      <input type="text" id="csSearch" class="cs-search" placeholder="Search countries…" oninput="filterCountries(this)" onclick="event.stopPropagation()">
    </div>
    <ul class="cs-list" id="csList" role="listbox">
      <li class="cs-opt selected" data-name="United States" onclick="selectCountry(this)"><span class="cs-flag">🇺🇸</span><span class="cs-cname">United States</span><span class="cs-code">+1</span></li>
      <li class="cs-opt" data-name="United Kingdom" onclick="selectCountry(this)"><span class="cs-flag">🇬🇧</span><span class="cs-cname">United Kingdom</span><span class="cs-code">+44</span></li>
      <li class="cs-opt" data-name="Canada" onclick="selectCountry(this)"><span class="cs-flag">🇨🇦</span><span class="cs-cname">Canada</span><span class="cs-code">+1</span></li>
      <li class="cs-opt" data-name="Australia" onclick="selectCountry(this)"><span class="cs-flag">🇦🇺</span><span class="cs-cname">Australia</span><span class="cs-code">+61</span></li>
      <li class="cs-opt" data-name="Germany" onclick="selectCountry(this)"><span class="cs-flag">🇩🇪</span><span class="cs-cname">Germany</span><span class="cs-code">+49</span></li>
      <li class="cs-opt" data-name="France" onclick="selectCountry(this)"><span class="cs-flag">🇫🇷</span><span class="cs-cname">France</span><span class="cs-code">+33</span></li>
      <li class="cs-opt" data-name="Spain" onclick="selectCountry(this)"><span class="cs-flag">🇪🇸</span><span class="cs-cname">Spain</span><span class="cs-code">+34</span></li>
      <li class="cs-opt" data-name="Italy" onclick="selectCountry(this)"><span class="cs-flag">🇮🇹</span><span class="cs-cname">Italy</span><span class="cs-code">+39</span></li>
      <li class="cs-opt" data-name="Netherlands" onclick="selectCountry(this)"><span class="cs-flag">🇳🇱</span><span class="cs-cname">Netherlands</span><span class="cs-code">+31</span></li>
      <li class="cs-opt" data-name="India" onclick="selectCountry(this)"><span class="cs-flag">🇮🇳</span><span class="cs-cname">India</span><span class="cs-code">+91</span></li>
      <li class="cs-opt" data-name="Japan" onclick="selectCountry(this)"><span class="cs-flag">🇯🇵</span><span class="cs-cname">Japan</span><span class="cs-code">+81</span></li>
      <li class="cs-opt" data-name="Singapore" onclick="selectCountry(this)"><span class="cs-flag">🇸🇬</span><span class="cs-cname">Singapore</span><span class="cs-code">+65</span></li>
      <li class="cs-opt" data-name="Brazil" onclick="selectCountry(this)"><span class="cs-flag">🇧🇷</span><span class="cs-cname">Brazil</span><span class="cs-code">+55</span></li>
      <li class="cs-opt" data-name="Mexico" onclick="selectCountry(this)"><span class="cs-flag">🇲🇽</span><span class="cs-cname">Mexico</span><span class="cs-code">+52</span></li>
      <li class="cs-opt" data-name="United Arab Emirates" onclick="selectCountry(this)"><span class="cs-flag">🇦🇪</span><span class="cs-cname">United Arab Emirates</span><span class="cs-code">+971</span></li>
      <li class="cs-opt" data-name="South Africa" onclick="selectCountry(this)"><span class="cs-flag">🇿🇦</span><span class="cs-cname">South Africa</span><span class="cs-code">+27</span></li>
    </ul>
    <div class="cs-none" id="csNone">No countries match.</div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:80px 24px}
.cs-wrap{position:relative;width:100%;max-width:300px}
.cs-label{display:block;font-size:12px;font-weight:700;color:#475569;margin-bottom:7px}

.cs-trigger{width:100%;display:flex;align-items:center;gap:10px;padding:11px 13px;background:#fff;border:1.5px solid #e2e8f0;border-radius:11px;cursor:pointer;font-family:inherit;font-size:14px;color:#1e293b;transition:border-color .15s,box-shadow .15s}
.cs-trigger:hover{border-color:#cbd5e1}
.cs-wrap.open .cs-trigger{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.cs-flag{font-size:20px;line-height:1}
.cs-current{flex:1;text-align:left;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cs-caret{color:#94a3b8;transition:transform .2s;flex-shrink:0}
.cs-wrap.open .cs-caret{transform:rotate(180deg)}

.cs-panel{position:absolute;top:calc(100% + 6px);left:0;right:0;background:#fff;border:1px solid #e2e8f0;border-radius:13px;box-shadow:0 16px 40px rgba(15,23,42,.16);z-index:10;opacity:0;visibility:hidden;transform:translateY(-6px) scale(.98);transform-origin:top;transition:opacity .18s,transform .18s,visibility .18s;overflow:hidden}
.cs-wrap.open .cs-panel{opacity:1;visibility:visible;transform:translateY(0) scale(1)}

.cs-searchbar{display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #f1f5f9}
.cs-search{flex:1;border:none;outline:none;font-family:inherit;font-size:13px;color:#1e293b;background:none}
.cs-search::placeholder{color:#cbd5e1}

.cs-list{list-style:none;max-height:228px;overflow-y:auto;padding:6px}
.cs-opt{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:9px;cursor:pointer;font-size:13px;color:#334155;transition:background .12s}
.cs-opt:hover{background:#f5f3ff}
.cs-opt.hidden{display:none}
.cs-cname{flex:1;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cs-code{font-size:11px;color:#94a3b8;font-weight:600}
.cs-opt.selected{background:#eef2ff}
.cs-opt.selected .cs-cname{color:#4f46e5}
.cs-opt.selected::after{content:'✓';color:#6366f1;font-weight:800;font-size:13px}

.cs-none{display:none;padding:18px;text-align:center;font-size:13px;color:#94a3b8}
.cs-list.empty + .cs-none{display:block}

.cs-list::-webkit-scrollbar{width:8px}
.cs-list::-webkit-scrollbar-thumb{background:#e2e8f0;border-radius:8px;border:2px solid #fff}`,

  js: `var wrap = document.getElementById('csWrap');

function toggleDD(e) {
  e.stopPropagation();
  var open = wrap.classList.toggle('open');
  document.getElementById('csTrigger').setAttribute('aria-expanded', open ? 'true' : 'false');
  if (open) {
    var s = document.getElementById('csSearch');
    s.value = '';
    filterCountries(s);
    setTimeout(function () { s.focus(); }, 60);
  }
}

function closeDD() {
  wrap.classList.remove('open');
  document.getElementById('csTrigger').setAttribute('aria-expanded', 'false');
}

function filterCountries(input) {
  var q = input.value.trim().toLowerCase();
  var opts = document.querySelectorAll('.cs-opt');
  var shown = 0;
  opts.forEach(function (o) {
    var name = o.dataset.name.toLowerCase();
    var code = o.querySelector('.cs-code').textContent.toLowerCase();
    var match = name.indexOf(q) !== -1 || code.indexOf(q) !== -1;
    o.classList.toggle('hidden', !match);
    if (match) shown++;
  });
  document.getElementById('csList').classList.toggle('empty', shown === 0);
}

function selectCountry(el) {
  document.querySelectorAll('.cs-opt').forEach(function (o) { o.classList.remove('selected'); });
  el.classList.add('selected');
  document.getElementById('csFlag').textContent = el.querySelector('.cs-flag').textContent;
  document.getElementById('csCurrent').textContent = el.dataset.name;
  closeDD();
}

document.addEventListener('click', function (e) {
  if (wrap.classList.contains('open') && !wrap.contains(e.target)) closeDD();
});
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeDD();
});`,

  seo: {
    title: 'Country Selector — Searchable Flag Dropdown Snippet',
    description: `Searchable country dropdown with flag emojis, dial codes, live filtering by name or code, and click-outside / ESC close. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Country Selector — Searchable Flag Dropdown With Dial Codes & Live Filtering`,
      description: `A native \`<select>\` of 200 countries is a usability nightmare — endless scrolling, no search, no flags. A proper country selector is a custom dropdown with a search box, recognisable flag icons, dial codes, and instant filtering. This snippet implements one in plain HTML, CSS, and vanilla JavaScript: a trigger button showing the chosen country, a panel with a search field, a scrollable list filtered live by name or dial code, a selected check, and the expected dismissal behaviours (click-outside and Escape).

**Trigger and animated panel**

The trigger button displays the current flag and country name with a caret that rotates when open. Opening toggles an \`.open\` class on the wrapper; the panel transitions from \`opacity: 0\` and a slight \`translateY/scale\` to fully visible with its transform origin at the top, so it appears to drop and grow out of the trigger. The trigger's \`aria-expanded\` is kept in sync for assistive tech.

**Live search by name or code**

When the panel opens, the search field is cleared, the list is reset, and focus moves to the input after a short delay (so the open animation does not eat the focus). \`filterCountries\` lowercases the query and, for each option, checks whether the country name *or* the dial code contains it — so typing "44" finds the United Kingdom and "ind" finds India. Non-matching options get a \`.hidden\` class. The function also counts matches and toggles an \`.empty\` class on the list; a CSS sibling selector (\`.cs-list.empty + .cs-none\`) reveals a "No countries match" message with zero extra JavaScript.

**Selection and dismissal**

\`selectCountry\` clears the previous selection, marks the clicked option with a \`.selected\` class (which renders a check via \`::after\`), copies the flag and name up to the trigger, and closes the panel. Dismissal is handled with two document-level listeners: a \`click\` that closes the panel when the target is outside the wrapper (using \`wrap.contains\`), and a \`keydown\` that closes on Escape. The search input stops click propagation so typing in it never bubbles up to the outside-click handler and closes the panel.

**Built to scale to real data**

Sixteen countries are included as a working example, but the markup is uniform — each option is a \`<li>\` with a \`data-name\`, a flag, a name, and a code — so rendering the full ISO country list from an array is a drop-in change, and the filter scales without modification. Pair this selector with a [phone input](/ui-snippets/phone-input/) for international numbers, a [checkout payment form](/ui-snippets/checkout-form/) address step, or a [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for multi-country pickers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "Country" field shows the United States with its flag; clicking it opens a dropdown that drops and scales out of the trigger.` },
      { title: 'Search by name', text: `Type "ger" — the list instantly narrows to Germany. The search field is auto-focused when the panel opens.` },
      { title: 'Search by dial code', text: `Type "44" — the United Kingdom appears, because the filter matches dial codes as well as names.` },
      { title: 'Select a country', text: `Click an option — its flag and name copy up to the trigger, a check marks it in the list, and the panel closes.` },
      { title: 'See the empty state', text: `Type gibberish — the list hides every option and a "No countries match" message shows via a CSS sibling selector.` },
      { title: 'Dismiss it', text: `Click anywhere outside the dropdown or press Escape to close it without changing the selection.` },
    ] },
    features: [
      { title: 'Custom flag trigger', text: `The button shows the selected flag, name, and a caret that rotates on open — far more usable than a native 200-item \`<select>\`.` },
      { title: 'Drop-and-scale panel', text: `The panel animates from \`opacity: 0\` and a small transform with a top origin, so it appears to grow out of the trigger.` },
      { title: 'Filter by name or dial code', text: `\`filterCountries\` matches the query against both the country name and its \`+code\`, so "44" finds the UK and "ind" finds India.` },
      { title: 'CSS-only empty state', text: `The match count toggles an \`.empty\` class and \`.cs-list.empty + .cs-none\` reveals the no-results message without extra JS.` },
      { title: 'Auto-focused search', text: `Opening clears and focuses the search field (after the animation) so users can type immediately.` },
      { title: 'Selected check', text: `\`selectCountry\` marks the chosen option with \`.selected\`, rendering a check via \`::after\` and tinting the row.` },
      { title: 'Click-outside & Escape close', text: `Document listeners close the panel when clicking outside the wrapper or pressing Escape; the search input stops propagation so typing never closes it.` },
      { title: 'Scales to full ISO list', text: `Uniform \`<li data-name code>\` markup means rendering all ~200 countries from an array is a drop-in change with no filter rewrite.` },
    ],
    useCases: [
      { title: 'Address and shipping forms', text: `Pick a country at checkout without scrolling a giant native select. Pair with a [checkout payment form](/ui-snippets/checkout-form/) address step.` },
      { title: 'International phone inputs', text: `Use the dial-code search to set a country code, then combine with a [phone input](/ui-snippets/phone-input/) for the number.` },
      { title: 'Sign-up and profile settings', text: `Set a user's country or region during registration or in account settings with searchable, flagged options.` },
      { title: 'Currency and locale pickers', text: `Adapt the list to currencies or locales (flag + code + name); reuse the same searchable dropdown shell.` },
      { title: 'Shipping-zone and tax config', text: `Admin tools that assign rules per country benefit from fast search; combine with a [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for multi-country rules.` },
      { title: 'Travel and booking sites', text: `Choose a destination or nationality quickly, with flags aiding recognition for international audiences.` },
      { icon: 'CODE', title: 'Related: CSV Import Mapper', desc: 'See the [CSV Import Mapper](/ui-snippets/csv-import-mapper/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I load the full list of countries?', a: `Render the \`<li>\` options from an array of \`{ name, flag, code }\` objects (an ISO country dataset is widely available). The filter reads \`data-name\` and the \`.cs-code\` text, so as long as each option follows the same markup, search works with no changes — even for 200+ entries, since hidden rows are just \`display:none\`.` },
      { q: 'How do I read the selected value for form submission?', a: `\`selectCountry\` already copies the name to the trigger. Add a hidden input and set its value there (e.g. an ISO code from \`el.dataset.iso\`), or read \`document.getElementById('csCurrent').textContent\` on submit. Storing an ISO code on each option is best — display names change, codes do not.` },
      { q: 'How do I add full keyboard navigation?', a: `Add a \`keydown\` handler on the search input: ArrowDown/ArrowUp to move a \`.highlighted\` class through the visible (non-hidden) options, Enter to select the highlighted one, and Escape to close (already handled). Ensure the highlighted option scrolls into view with \`scrollIntoView({ block: 'nearest' })\` as you navigate.` },
      { q: 'Why do flag emojis sometimes not render?', a: `Flag emojis rely on regional-indicator support in the OS/font; Windows notably renders them as two-letter codes. For guaranteed flags across platforms, swap the emoji for a small SVG/PNG flag sprite or an icon font, keeping the rest of the component identical. The search and selection logic does not depend on the flag.` },
      { q: 'How do I use this country selector in React, Vue, or Angular?', a: `In React, hold \`open\`, \`query\`, and \`selected\` in \`useState\`, derive the visible list by filtering the array on \`query\`, and add a click-outside effect with a ref. In Vue, use \`ref\`s and a \`computed\` filtered list with \`v-model\` on the search. In Angular, track state on the component and use a pipe or getter for filtering. The panel animation and styles port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the filter-and-empty-state logic by hand to see how little JavaScript it actually takes. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how filterCountries matching against both the country name and the dial code lets a single search box serve two different lookup patterns, and how the CSS sibling selector reveals the "no matches" message without any JavaScript branching for that state. The same assistant can help optimize it — for instance asking whether filtering by iterating every option's dataset and querySelector on each keystroke would still perform well against a full 200-country list, or whether the filter should instead work off a plain JS array with the DOM rendered from it. It's also useful for extending the selector: ask it to add full keyboard arrow-key navigation through the visible options, group countries by region with sticky section headers, or store a proper ISO code per country instead of relying on the display name for form submission. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a searchable country selector dropdown in plain HTML, CSS, and JavaScript with flags and dial codes — no dropdown library, no frameworks.

Requirements:
- A trigger button showing the currently selected country's flag and name plus a caret icon that rotates when the dropdown is open, with aria-haspopup and aria-expanded kept in sync with the open state.
- Opening the dropdown must animate a panel in from a collapsed, transparent, slightly-offset state to fully visible using only opacity and transform (translateY plus scale) with a top transform-origin, so it visually grows out of the trigger.
- The panel must contain a search text input at the top and a scrollable list of country options below it, where each option carries the country's name, flag, and dial code in its markup.
- On opening, the search input must be cleared, the list reset to show everything, and the input focused after a short delay so the open animation isn't interrupted by an immediate focus jump.
- A single filter function must run on every keystroke, matching the query case-insensitively against both the country's name and its dial code, so searching a number like a country code finds the right country just like searching part of its name.
- Options that don't match must be hidden via a class rather than removed from the DOM, and the filter function must also detect when zero options match and toggle a class on the list container so a "no countries match" message appears purely through a CSS sibling selector, with no additional JavaScript needed to show or hide that message.
- Selecting an option must update the trigger's flag and name, mark that option as selected (with a visible check indicator) while clearing any previous selection, and close the dropdown.
- Provide three ways to close the dropdown: clicking outside the whole component (verified against the actual click target, not just any click), pressing Escape, and selecting an option — and make sure clicks inside the search input never propagate up and trigger the outside-click close handler.`,
    },
  },
};

export default countrySelector;
