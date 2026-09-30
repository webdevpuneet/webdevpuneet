const snippet = {
  id: 'phone-input',
  title: 'Phone Number Input',
  lastmod: '2026-06-10',
  category: 'forms',
  html: `<div class="wrap">
  <div class="field">
    <label class="label">Phone number</label>
    <div class="phone-wrap" id="phone-wrap">
      <div class="input-row">
        <button class="country-trigger" id="country-trigger" type="button" aria-haspopup="listbox" aria-expanded="false">
          <span class="trigger-flag" id="trigger-flag"></span>
          <span class="trigger-dial" id="trigger-dial">+1</span>
          <svg class="chevron" id="chevron" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>
        <input
          class="phone-input"
          id="phone-input"
          type="tel"
          placeholder="(555) 123-4567"
          autocomplete="tel"
        />
        <span class="status-icon" id="status-icon"></span>
      </div>

      <div class="dropdown" id="dropdown" role="listbox" aria-label="Select country">
        <div class="search-wrap">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input class="search-input" id="search-input" type="text" placeholder="Search country or code..." autocomplete="off" />
        </div>
        <div class="country-list" id="country-list"></div>
      </div>
    </div>

    <div class="intl-row" id="intl-row">
      <span class="intl-label">International:</span>
      <span class="intl-number" id="intl-number">--</span>
      <button class="copy-btn" id="copy-btn" type="button" title="Copy international number">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        <span id="copy-label">Copy</span>
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px; }

.wrap { width: 100%; max-width: 340px; }
.label { display: block; font-size: 13px; font-weight: 600; color: #374151; margin-bottom: 6px; }

.phone-wrap { position: relative; }

.input-row { display: flex; align-items: center; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 10px; overflow: visible; transition: border-color 0.15s; position: relative; }
.input-row:focus-within { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }

.country-trigger { display: flex; align-items: center; gap: 5px; padding: 10px 10px 10px 12px; background: transparent; border: none; border-right: 1.5px solid #e2e8f0; cursor: pointer; flex-shrink: 0; transition: background 0.12s; border-radius: 10px 0 0 10px; }
.country-trigger:hover { background: #f8fafc; }
.country-trigger.open { background: rgba(99,102,241,0.06); border-color: #a5b4fc; }
.trigger-flag { font-size: 20px; line-height: 1; }
.trigger-dial { font-size: 13px; font-weight: 600; color: #374151; min-width: 28px; }
.chevron { color: #94a3b8; flex-shrink: 0; transition: transform 0.2s; }
.country-trigger.open .chevron { transform: rotate(180deg); }

.phone-input { flex: 1; border: none; outline: none; padding: 10px 8px; font-size: 15px; color: #0f172a; background: transparent; font-family: inherit; min-width: 0; }
.phone-input::placeholder { color: #94a3b8; }

.status-icon { width: 36px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; font-size: 16px; }

.dropdown { position: absolute; top: calc(100% + 6px); left: 0; width: 100%; background: #fff; border: 1.5px solid #e2e8f0; border-radius: 12px; box-shadow: 0 8px 32px rgba(0,0,0,0.1); z-index: 200; opacity: 0; transform: scale(0.97) translateY(-4px); pointer-events: none; transition: opacity 0.18s, transform 0.18s; }
.dropdown.open { opacity: 1; transform: scale(1) translateY(0); pointer-events: all; }

.search-wrap { display: flex; align-items: center; gap: 8px; padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
.search-wrap svg { color: #94a3b8; flex-shrink: 0; }
.search-input { flex: 1; border: none; outline: none; font-size: 13px; color: #374151; font-family: inherit; background: transparent; }
.search-input::placeholder { color: #94a3b8; }

.country-list { max-height: 220px; overflow-y: auto; padding: 4px 0; }
.country-list::-webkit-scrollbar { width: 4px; }
.country-list::-webkit-scrollbar-track { background: transparent; }
.country-list::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 4px; }

.country-item { display: flex; align-items: center; gap: 10px; padding: 9px 14px; cursor: pointer; transition: background 0.1s; }
.country-item:hover, .country-item.active { background: #f8fafc; }
.country-item.selected { background: rgba(99,102,241,0.07); }
.country-flag { font-size: 18px; flex-shrink: 0; line-height: 1; }
.country-name { flex: 1; font-size: 13px; color: #374151; }
.country-code { font-size: 12px; font-weight: 600; color: #6366f1; min-width: 36px; text-align: right; }

.no-results { padding: 16px 14px; font-size: 13px; color: #94a3b8; text-align: center; }

.intl-row { display: flex; align-items: center; gap: 8px; margin-top: 8px; min-height: 22px; }
.intl-label { font-size: 12px; color: #94a3b8; flex-shrink: 0; }
.intl-number { font-size: 13px; font-weight: 600; color: #374151; flex: 1; letter-spacing: 0.01em; }
.copy-btn { display: flex; align-items: center; gap: 4px; border: 1px solid #e2e8f0; background: #fff; border-radius: 6px; padding: 3px 8px; font-size: 12px; color: #64748b; cursor: pointer; transition: all 0.12s; flex-shrink: 0; font-family: inherit; }
.copy-btn:hover { border-color: #6366f1; color: #6366f1; }
.copy-btn.copied { border-color: #10b981; color: #10b981; }`,
  js: `function flag(code) {
  return [...code.toUpperCase()].map(c => String.fromCodePoint(c.charCodeAt(0) + 0x1F1A5)).join('');
}

const countries = [
  { code: 'US', name: 'United States',  dial: '+1',   pattern: '(###) ###-####',   maxLen: 10 },
  { code: 'CA', name: 'Canada',         dial: '+1',   pattern: '(###) ###-####',   maxLen: 10 },
  { code: 'GB', name: 'United Kingdom', dial: '+44',  pattern: '#### ### ####',    maxLen: 10 },
  { code: 'DE', name: 'Germany',        dial: '+49',  pattern: '### #######',      maxLen: 10 },
  { code: 'FR', name: 'France',         dial: '+33',  pattern: '# ## ## ## ##',    maxLen: 10 },
  { code: 'IN', name: 'India',          dial: '+91',  pattern: '##### #####',      maxLen: 10 },
  { code: 'AU', name: 'Australia',      dial: '+61',  pattern: '### ### ###',      maxLen: 9  },
  { code: 'NL', name: 'Netherlands',    dial: '+31',  pattern: '## ### ####',      maxLen: 9  },
  { code: 'PL', name: 'Poland',         dial: '+48',  pattern: '### ### ###',      maxLen: 9  },
  { code: 'ES', name: 'Spain',          dial: '+34',  pattern: '### ### ###',      maxLen: 9  },
  { code: 'IT', name: 'Italy',          dial: '+39',  pattern: '### ### ####',     maxLen: 10 },
  { code: 'BR', name: 'Brazil',         dial: '+55',  pattern: '(##) #####-####',  maxLen: 11 },
  { code: 'JP', name: 'Japan',          dial: '+81',  pattern: '##-####-####',     maxLen: 10 },
  { code: 'CN', name: 'China',          dial: '+86',  pattern: '### #### ####',    maxLen: 11 },
  { code: 'AE', name: 'UAE',            dial: '+971', pattern: '## ### ####',      maxLen: 9  },
  { code: 'SE', name: 'Sweden',         dial: '+46',  pattern: '##-### ## ##',     maxLen: 9  },
  { code: 'NO', name: 'Norway',         dial: '+47',  pattern: '### ## ###',       maxLen: 8  },
  { code: 'DK', name: 'Denmark',        dial: '+45',  pattern: '## ## ## ##',      maxLen: 8  },
  { code: 'CH', name: 'Switzerland',    dial: '+41',  pattern: '## ### ## ##',     maxLen: 9  },
  { code: 'BE', name: 'Belgium',        dial: '+32',  pattern: '### ## ## ##',     maxLen: 9  },
].map(c => ({ ...c, flag: flag(c.code) }));

let selectedCountry = countries[0];
let dropdownOpen = false;
let filteredList = [...countries];

function init() {
  document.getElementById('trigger-flag').textContent = selectedCountry.flag;
  document.getElementById('trigger-dial').textContent = selectedCountry.dial;
  renderList(countries);
  updateIntl('');
}

function toggleDropdown() {
  dropdownOpen = !dropdownOpen;
  const dd = document.getElementById('dropdown');
  const trigger = document.getElementById('country-trigger');
  dd.classList.toggle('open', dropdownOpen);
  trigger.classList.toggle('open', dropdownOpen);
  trigger.setAttribute('aria-expanded', dropdownOpen);
  if (dropdownOpen) {
    document.getElementById('search-input').value = '';
    filterCountries('');
    setTimeout(() => document.getElementById('search-input').focus(), 60);
  }
}

function closeDropdown() {
  if (!dropdownOpen) return;
  dropdownOpen = false;
  document.getElementById('dropdown').classList.remove('open');
  document.getElementById('country-trigger').classList.remove('open');
  document.getElementById('country-trigger').setAttribute('aria-expanded', false);
}

function selectCountry(code) {
  selectedCountry = countries.find(c => c.code === code) || countries[0];
  document.getElementById('trigger-flag').textContent = selectedCountry.flag;
  document.getElementById('trigger-dial').textContent = selectedCountry.dial;
  document.getElementById('phone-input').placeholder = selectedCountry.pattern.replace(/#/g, '0');
  closeDropdown();
  const raw = document.getElementById('phone-input').value.replace(/\D/g, '');
  const formatted = formatPhone(raw, selectedCountry.pattern);
  document.getElementById('phone-input').value = formatted;
  validate(raw);
  updateIntl(raw);
  renderList(filteredList);
  document.getElementById('phone-input').focus();
}

function formatPhone(digits, pattern) {
  let i = 0;
  return pattern.replace(/#/g, () => digits[i++] || '').replace(/[^0-9]+$/, '');
}

function handleInput(value) {
  const digits = value.replace(/\D/g, '').slice(0, selectedCountry.maxLen);
  const formatted = formatPhone(digits, selectedCountry.pattern);
  document.getElementById('phone-input').value = formatted;
  validate(digits);
  updateIntl(digits);
}

function validate(digits) {
  const icon = document.getElementById('status-icon');
  if (!digits.length) { icon.textContent = ''; return; }
  if (digits.length === selectedCountry.maxLen) {
    icon.textContent = 'âœ…';
  } else if (digits.length > 0) {
    icon.textContent = digits.length < selectedCountry.maxLen ? 'Ã¢ÂÅ’' : 'Ã¢ÂÅ’';
  }
}

function updateIntl(digits) {
  const intlEl = document.getElementById('intl-number');
  const copyBtn = document.getElementById('copy-btn');
  if (!digits || !digits.length) {
    intlEl.textContent = '--';
    copyBtn.style.display = 'none';
    return;
  }
  const spaced = digits.replace(/(\d{3})(?=\d)/g, '$1 ');
  intlEl.textContent = selectedCountry.dial + ' ' + spaced;
  copyBtn.style.display = 'flex';
}

function filterCountries(query) {
  const q = query.trim().toLowerCase();
  filteredList = q
    ? countries.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.dial.replace('+', '').includes(q.replace('+', '')) ||
        c.code.toLowerCase().includes(q)
      )
    : [...countries];
  renderList(filteredList);
}

function renderList(list) {
  const container = document.getElementById('country-list');
  if (!list.length) {
    container.innerHTML = '<div class="no-results">No countries found</div>';
    return;
  }
  container.innerHTML = list.map(c => \`
    <div class="country-item\${c.code === selectedCountry.code ? ' selected' : ''}"
         role="option"
         data-code="\${c.code}"
         aria-selected="\${c.code === selectedCountry.code}">
      <span class="country-flag">\${c.flag}</span>
      <span class="country-name">\${c.name}</span>
      <span class="country-code">\${c.dial}</span>
    </div>
  \`).join('');
  container.querySelectorAll('.country-item').forEach(el => {
    el.addEventListener('click', () => selectCountry(el.dataset.code));
  });
}

function copyNumber() {
  const text = document.getElementById('intl-number').textContent;
  if (!text || text === '--') return;
  const plain = text.replace(/\s/g, '');
  function onCopied() {
    const btn = document.getElementById('copy-btn');
    const label = document.getElementById('copy-label');
    btn.classList.add('copied');
    label.textContent = 'Copied!';
    setTimeout(() => { btn.classList.remove('copied'); label.textContent = 'Copy'; }, 1800);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(plain).then(onCopied).catch(function() {
      var ta=document.createElement('textarea'); ta.value=plain; ta.style.cssText='position:fixed;opacity:0';
      document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch(e){} document.body.removeChild(ta); onCopied();
    });
  } else {
    var ta=document.createElement('textarea'); ta.value=plain; ta.style.cssText='position:fixed;opacity:0';
    document.body.appendChild(ta); ta.select(); try{document.execCommand('copy')}catch(e){} document.body.removeChild(ta); onCopied();
  }
}

document.getElementById('country-trigger').addEventListener('click', toggleDropdown);
document.getElementById('phone-input').addEventListener('input', e => handleInput(e.target.value));
document.getElementById('search-input').addEventListener('input', e => filterCountries(e.target.value));
document.getElementById('copy-btn').addEventListener('click', copyNumber);
document.addEventListener('click', e => {
  if (dropdownOpen && !e.target.closest('#phone-wrap')) closeDropdown();
});

init();`,
  seo: {
    title: 'Phone Number Input — Free HTML CSS JS Snippet',
    description: 'International phone field with country selector, per-country format mask and live validation. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Phone Number Input — Country Code Selector, Auto-Format Mask, Validation & International Preview',
      description: `Collecting phone numbers in web forms is deceptively complex. A plain \`<input type="tel">\` accepts any text, has no formatting, shows no country code, and gives users zero feedback on whether their number is valid. This snippet provides a complete, production-ready phone number input: a flag + dial code selector button on the left, a searchable [country dropdown](/ui-snippets/country-selector/) with 20+ countries, a live auto-formatting mask that reshapes digits as the user types, a validation indicator that turns green when the number reaches the correct length, a live international number preview below the field, and a one-click copy button — all in plain HTML, CSS, and vanilla JavaScript with zero dependencies.

**Country data model and format patterns**

Each country in the \`countries\` array has six fields: \`code\` (ISO 3166-1 alpha-2), \`name\`, \`dial\` (E.164 prefix like "+44"), \`flag\` (flag emoji rendered natively by the OS), \`pattern\` (a mask string using \`#\` as digit placeholders, e.g. \`"(###) ###-####"\` for US), and \`maxLen\` (the exact digit count for a valid number in that country, excluding the country code). This separation of the mask from the validation length makes it easy to add more countries: just append an entry to the array.

**The formatPhone mask engine**

\`formatPhone(digits, pattern)\` works by iterating through the pattern string character by character. Each \`#\` character is replaced with the next available digit from the stripped input. Non-\`#\` characters (spaces, dashes, parentheses) are kept as literal separators. A trailing \`.replace()\` strips any separator characters left dangling at the end when the user has only typed a few digits — this keeps the field clean during partial entry. The function is called on every keystroke via \`handleInput()\`, which first strips all non-digit characters and enforces the \`maxLen\` ceiling before passing digits to the formatter.

**Validation indicator**

The \`validate(digits)\` function compares \`digits.length\` to \`selectedCountry.maxLen\`. An exact match shows âœ…; any non-empty but shorter count shows Ã¢ÂÅ’. The status icon sits inside the input row on the right, so the visual signal is always visible without disrupting the layout. Because \`maxLen\` changes when the country changes, validation automatically recalibrates when the user switches country — a common oversight in hand-rolled phone inputs.

**Searchable country dropdown**

The dropdown includes a search input that filters the country list in real time via \`filterCountries(query)\`. The filter checks all three searchable axes: country name (so "United" matches US and UK), dial code (so "44" or "+44" matches UK), and ISO country code (so "DE" matches Germany). Results rerender immediately into the scrollable \`country-list\` container via \`renderList()\`. The container has \`max-height: 220px\` and \`overflow-y: auto\` with a slim custom scrollbar. The currently selected country gets a tinted \`.selected\` background on every render so the user always knows their active selection.

**International number preview and copy**

Below the input, the full E.164-style international number is assembled in real time: dial code + a space-separated version of the raw digits. This gives users confidence they have entered the right number for cross-border use. The copy button uses the \`navigator.clipboard.writeText()\` API to write the number without spaces (clean E.164 format). After copying, the button label changes to "Copied!" for 1.8 seconds before resetting — the standard micro-interaction for clipboard feedback.

**Click-outside close and accessibility**

A single \`document\` click listener checks \`e.target.closest('#phone-wrap')\`. Any click outside the component calls \`closeDropdown()\`. The country trigger button has \`aria-haspopup="listbox"\` and \`aria-expanded\` toggling with the open state. The dropdown has \`role="listbox"\` and each country item has \`role="option"\` with \`aria-selected\`. The search input receives focus automatically when the dropdown opens so keyboard users can immediately type to filter.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click the flag button to open the country selector', text: 'The dropdown opens with a scale+opacity animation and the search field receives focus automatically. Scroll through the list of 20+ countries or type a country name, dial code, or ISO code in the search box to filter.' },
        { title: 'Select your country to set the dial code and format', text: 'Clicking a country closes the dropdown, updates the flag and dial code in the trigger button, and changes the input placeholder to the local format mask. If a number is already entered, it is immediately re-formatted to match the new country pattern.' },
        { title: 'Type your phone number — it formats automatically', text: 'Digits are masked into the country pattern as you type. For example, US formats as (555) 123-4567 and UK as 7911 123 456. Non-digit characters are stripped automatically; you only need to type digits.' },
        { title: 'Watch the validation indicator', text: 'A green âœ… appears on the right of the input when you have entered exactly the right number of digits for the selected country. A red Ã¢ÂÅ’ shows while the number is still incomplete or too short. This gives instant feedback without requiring form submission.' },
        { title: 'Check the international number preview', text: 'Below the input, the full international format updates in real time: for example, +1 555 123 4567. This shows users exactly what number will be stored, including the country code, reducing data entry errors in international forms.' },
        { title: 'Click Copy to copy the international number to the clipboard', text: 'The copy button writes the number in E.164 format (no spaces, e.g. +15551234567) to the clipboard. Use this value for backend storage, SMS APIs, or CRM systems. The button label changes to "Copied!" for 1.8 seconds as confirmation.' },
      ],
    },
    features: [
      'Country selector: 20+ countries with flag emoji, name, and dial code in a searchable dropdown',
      'Search filter: filters by country name, dial code, or ISO code simultaneously in real time',
      'Auto-format mask: per-country pattern with literal separators applied on every keystroke',
      'maxLen validation: green âœ… at exact correct length, red Ã¢ÂÅ’ during partial entry',
      'International preview: live E.164-style number assembled below the input as digits are entered',
      'Copy button: writes stripped E.164 number to clipboard with "Copied!" feedback animation',
      'Click-outside close: document listener + closest() check closes dropdown on outside click',
      'Accessible: aria-haspopup, aria-expanded, role=listbox, role=option, aria-selected on all elements',
    ],
    useCases: [
      { icon: 'FORM', title: 'User registration and checkout forms requiring phone', desc: 'Drop into signup flows, checkout pages, and contact forms to collect validated international phone numbers. The country selector prevents the most common error: users entering a local number without a country code. Connect the [date-picker](/snippets/date-picker) alongside for booking forms that need both date and phone.' },
      { icon: 'APP', title: 'Profile settings page phone number field', desc: 'Use in account settings where users add or update their phone number for two-factor authentication or notifications. The international number preview confirms the exact E.164 string that will be stored and passed to SMS providers like Twilio or SNS.' },
      { icon: 'FLOW', title: 'Multi-step onboarding flow phone verification step', desc: 'Embed in step 2 of an onboarding wizard where users verify their phone. The green checkmark validation gives users confidence before clicking "Send code". Pre-select the country based on the user\'s locale from the browser\'s navigator.language for a frictionless experience.' },
      { icon: 'DESIGN', title: 'Design system form component library phone field', desc: 'Use as a reference implementation when building a phone input component for your design system. The countries array, formatPhone mask engine, and validation logic are cleanly separated from the rendering so they can be ported to React, Vue, or any component framework.' },
      { icon: 'LEARN', title: 'Study input masking and real-time formatting in JavaScript', desc: 'The formatPhone() function demonstrates a clean pattern-based mask approach using a # placeholder and character-by-character iteration. Study handleInput() to see how to intercept oninput, strip non-digits, enforce a max length, apply the mask, and update the DOM — all in under 10 lines.' },
      { icon: 'CODE', title: 'Backend-ready E.164 number collection for SMS APIs', desc: 'The copy button and intl-number preview produce numbers in E.164 format (+15551234567) ready for Twilio, AWS SNS, MessageBird, or any SMS API. Read document.getElementById("intl-number").textContent.replace(/\\s/g,"") in your form submit handler to extract the value.' },
      { icon: 'CODE', title: 'Related: Vertical Stepper', desc: 'See the [Vertical Stepper](/ui-snippets/vertical-stepper/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I get the phone number value when the form is submitted?', a: 'Add a hidden input inside your form: <input type="hidden" name="phone" id="phone-value">. In handleInput(), after updating the display, add: document.getElementById("phone-value").value = selectedCountry.dial + document.getElementById("phone-input").value.replace(/\\D/g,""). This stores the full E.164 number in the hidden field for standard form submission. For fetch/XHR submissions, read document.getElementById("intl-number").textContent.replace(/\\s/g,"") directly.' },
      { q: 'How do I pre-select a country based on the user\'s location?', a: 'Use the browser\'s navigator.language to get a locale string like "en-US" or "de-DE". Extract the region code: const region = navigator.language.split("-")[1]. Then call selectCountry(region) on init. For more accurate geolocation, call a free IP-geolocation API (ipapi.co/json or ip-api.com/json) which returns a country_code field you can pass directly to selectCountry(). Note: IP geolocation is not 100% accurate so always let users change the country.' },
      { q: 'How do I add more countries to the list?', a: 'Append an entry to the countries array at the top of the JS: { code: "MX", name: "Mexico", dial: "+52", flag: "ðŸ‡²ðŸ‡½", pattern: "## #### ####", maxLen: 10 }. The flag field uses Unicode regional indicator characters — any standard flag emoji works. The pattern uses # as digit placeholder with any separator characters (spaces, dashes, parentheses) you want shown. Set maxLen to the number of subscriber digits in that country excluding the country code.' },
      { q: 'How do I use this phone input in a React component?', a: 'Click "JSX" to download a React version. Manage selectedCountry and phoneValue with useState. Compute intlNumber as a derived string in the render. Move the countries array outside the component so it is not recreated on each render. For the dropdown, use a useRef on the wrapper div and add a useEffect with a document mousedown listener that calls closeDropdown when the click target is not inside the ref — the React equivalent of the click-outside pattern used here.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the mask engine character by character on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how formatPhone walks a pattern string like "(###) ###-####" and substitutes digits for each hash character while preserving literal separators, and how validate recalibrates automatically when selectedCountry.maxLen changes after switching countries. The same assistant can help optimize it, for example checking whether the filterCountries search across name, dial code, and ISO code could be debounced for a much longer country list, or whether the flag emoji generation function handles every edge case correctly. It's also useful for extending the effect: ask it to auto-detect the user's country from navigator.language or an IP geolocation API, add a hidden form field that syncs the E.164 value for standard form submission, or persist the last-selected country in localStorage. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an international phone number input in plain HTML, CSS, and vanilla JavaScript with no dependencies — a country selector button, a searchable dropdown, live input masking, and validation.

Requirements:
- A data array of countries, each with an ISO code, display name, E.164 dial code, a format pattern string using hash characters as digit placeholders (for example "(###) ###-####"), and a maxLen giving the exact number of subscriber digits expected for that country.
- A trigger button showing the selected country's flag and dial code that opens a dropdown containing a text search box and a scrollable list of countries; the search must filter simultaneously by country name substring, dial code digits, and ISO code.
- A mask-formatting function that takes the raw digits the user has typed and the selected country's pattern string, replacing each hash character in the pattern with the next available digit in order while keeping all non-hash characters (spaces, dashes, parentheses) as literal separators, and stripping any trailing separator left over when there aren't enough digits yet to fill the whole pattern.
- On every keystroke, strip non-digit characters from the raw input, cap the digit count at the selected country's maxLen, reformat through the mask function, and update a validation indicator that shows a distinct success state only when the digit count exactly equals maxLen.
- When the user switches country from the dropdown, immediately re-run the mask and validation against the already-typed digits using the new country's pattern and maxLen, and update the placeholder to reflect the new format.
- Below the input, continuously render a live international-format preview (dial code plus space-grouped digits) and a copy-to-clipboard button that copies the number in clean E.164 format (dial code plus digits, no spaces) using the async Clipboard API with an execCommand fallback.
- Close the dropdown when a click occurs outside the whole component, and give the trigger button and dropdown list proper ARIA roles (aria-haspopup, aria-expanded, role="listbox", role="option", aria-selected).`,
    },
  },
};

export default snippet;

