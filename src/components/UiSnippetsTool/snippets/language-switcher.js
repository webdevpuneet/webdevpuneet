const languageSwitcher = {
  id: 'language-switcher',
  title: 'Language Switcher',
  lastmod: '2026-06-22',
  category: 'navigation',
  html: `<div class="lsw-wrap">
  <button type="button" class="lsw-trigger" id="lswTrigger" aria-haspopup="listbox" aria-expanded="false">
    <span class="lsw-flag" id="lswFlag">🇺🇸</span>
    <span class="lsw-label" id="lswLabel">English</span>
    <svg class="lsw-caret" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  </button>

  <div class="lsw-pop" id="lswPop" role="listbox" aria-label="Choose a language">
    <div class="lsw-search-wrap">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.3-4.3"/></svg>
      <input type="text" id="lswSearch" placeholder="Search language…" autocomplete="off">
    </div>
    <ul class="lsw-list" id="lswList"></ul>
    <p class="lsw-empty" id="lswEmpty" hidden>No languages match</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;padding:60px 24px}

.lsw-wrap{position:relative;width:230px}

.lsw-trigger{width:100%;display:flex;align-items:center;gap:9px;background:#fff;border:1.5px solid #e2e8f0;border-radius:11px;padding:10px 13px;font-size:14px;font-weight:600;color:#0f172a;cursor:pointer;font-family:inherit;transition:border-color .15s,box-shadow .15s}
.lsw-trigger:hover{border-color:#cbd5e1}
.lsw-trigger.open{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}
.lsw-flag{font-size:18px;line-height:1}
.lsw-label{margin-right:auto}
.lsw-caret{color:#94a3b8;transition:transform .2s}
.lsw-trigger.open .lsw-caret{transform:rotate(180deg)}

.lsw-pop{position:absolute;top:calc(100% + 7px);left:0;right:0;background:#fff;border:1px solid #e2e8f0;border-radius:12px;box-shadow:0 18px 44px rgba(15,23,42,.16);z-index:20;padding:8px;
  opacity:0;transform:translateY(-6px) scale(.98);transform-origin:top center;pointer-events:none;transition:opacity .15s,transform .15s}
.lsw-wrap.open .lsw-pop{opacity:1;transform:translateY(0) scale(1);pointer-events:all}

.lsw-search-wrap{display:flex;align-items:center;gap:7px;padding:7px 9px;border:1.5px solid #e2e8f0;border-radius:8px;margin-bottom:6px;color:#94a3b8}
.lsw-search-wrap:focus-within{border-color:#6366f1}
.lsw-search-wrap input{border:none;outline:none;font-size:13px;font-family:inherit;color:#0f172a;width:100%}

.lsw-list{list-style:none;max-height:230px;overflow-y:auto}
.lsw-item{display:flex;align-items:center;gap:10px;padding:9px 10px;border-radius:8px;cursor:pointer;font-size:13.5px;color:#1e293b;transition:background .12s}
.lsw-item:hover,.lsw-item.active{background:#eef2ff}
.lsw-item-flag{font-size:17px;line-height:1}
.lsw-item-native{color:#94a3b8;font-size:12px;margin-left:auto}
.lsw-item-check{color:#6366f1;opacity:0;flex-shrink:0}
.lsw-item.selected .lsw-item-check{opacity:1}
.lsw-item.selected{font-weight:700}

.lsw-empty{text-align:center;padding:16px 0;font-size:13px;color:#94a3b8}`,

  js: `var LANGS = [
  { code: 'en', flag: '🇺🇸', name: 'English',    native: 'English' },
  { code: 'es', flag: '🇪🇸', name: 'Spanish',    native: 'Español' },
  { code: 'fr', flag: '🇫🇷', name: 'French',     native: 'Français' },
  { code: 'de', flag: '🇩🇪', name: 'German',     native: 'Deutsch' },
  { code: 'pt', flag: '🇧🇷', name: 'Portuguese', native: 'Português' },
  { code: 'it', flag: '🇮🇹', name: 'Italian',    native: 'Italiano' },
  { code: 'nl', flag: '🇳🇱', name: 'Dutch',      native: 'Nederlands' },
  { code: 'ja', flag: '🇯🇵', name: 'Japanese',   native: '日本語' },
  { code: 'ko', flag: '🇰🇷', name: 'Korean',     native: '한국어' },
  { code: 'zh', flag: '🇨🇳', name: 'Chinese',    native: '中文' },
  { code: 'ar', flag: '🇸🇦', name: 'Arabic',     native: 'العربية' },
  { code: 'hi', flag: '🇮🇳', name: 'Hindi',      native: 'हिन्दी' },
];

var wrap = document.querySelector('.lsw-wrap');
var trigger = document.getElementById('lswTrigger');
var pop = document.getElementById('lswPop');
var listEl = document.getElementById('lswList');
var searchEl = document.getElementById('lswSearch');
var emptyEl = document.getElementById('lswEmpty');
var current = 'en';
var activeIndex = -1;
var shown = [];

function render(filter) {
  var q = (filter || '').toLowerCase();
  shown = LANGS.filter(function (l) {
    return l.name.toLowerCase().indexOf(q) !== -1 || l.native.toLowerCase().indexOf(q) !== -1;
  });
  activeIndex = -1;
  emptyEl.hidden = shown.length > 0;
  listEl.innerHTML = shown.map(function (l) {
    return '<li class="lsw-item' + (l.code === current ? ' selected' : '') + '" role="option" data-code="' + l.code + '">' +
      '<span class="lsw-item-flag">' + l.flag + '</span>' + l.name +
      '<span class="lsw-item-native">' + l.native + '</span>' +
      '<svg class="lsw-item-check" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6"><polyline points="20 6 9 17 4 12"/></svg>' +
    '</li>';
  }).join('');
}

function open() {
  wrap.classList.add('open');
  trigger.classList.add('open');
  trigger.setAttribute('aria-expanded', 'true');
  render('');
  searchEl.value = '';
  setTimeout(function () { searchEl.focus(); }, 30);
}
function close() {
  wrap.classList.remove('open');
  trigger.classList.remove('open');
  trigger.setAttribute('aria-expanded', 'false');
}

function select(code) {
  current = code;
  var l = LANGS.filter(function (x) { return x.code === code; })[0];
  document.getElementById('lswFlag').textContent = l.flag;
  document.getElementById('lswLabel').textContent = l.name;
  // A real app would now set <html lang>, load translations, or navigate to the
  // localized URL (e.g. /es/...). Here we just update the trigger.
  document.documentElement.lang = code;
  close();
}

trigger.addEventListener('click', function () {
  wrap.classList.contains('open') ? close() : open();
});

listEl.addEventListener('click', function (e) {
  var item = e.target.closest('.lsw-item');
  if (item) select(item.dataset.code);
});

searchEl.addEventListener('input', function () { render(this.value); });

searchEl.addEventListener('keydown', function (e) {
  var items = listEl.querySelectorAll('.lsw-item');
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, items.length - 1); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); }
  else if (e.key === 'Enter') { e.preventDefault(); if (shown[activeIndex]) select(shown[activeIndex].code); return; }
  else if (e.key === 'Escape') { close(); return; }
  else return;
  items.forEach(function (it, i) { it.classList.toggle('active', i === activeIndex); });
  if (items[activeIndex]) items[activeIndex].scrollIntoView({ block: 'nearest' });
});

document.addEventListener('click', function (e) {
  if (!wrap.contains(e.target)) close();
});

render('');`,

  seo: {
    title: 'Language Switcher — Locale Dropdown HTML CSS JS',
    description: `A searchable language switcher dropdown with flag icons, native names, keyboard navigation, and a selected-state check. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Language Switcher — Searchable Locale Dropdown with Flags & Keyboard Navigation',
      description: `If your site serves more than one country, a language switcher is one of the first things international visitors look for — and a long, unsearchable list of locales is one of the most common ways to get it wrong. This snippet builds a polished, searchable language-picker dropdown in plain HTML, CSS, and vanilla JavaScript: flag icons, English *and* native names, a type-to-filter search, full keyboard navigation, and a clear selected-state checkmark — everything a production i18n control needs, with no library.

**Why native names matter**

Each language shows both its English name and its endonym — the name in its own language ("German / Deutsch", "Japanese / 日本語", "中文"). This is the single most important usability detail in a language switcher: a visitor who can't read the current interface language is looking for *their* language written the way they'd recognise it, not the English label. Showing both covers the user choosing from an unfamiliar UI and the admin scanning an English list.

**Search that filters both names**

With a dozen or more locales, scrolling is slower than typing. The search box filters the list on every keystroke against both the English name and the native name, so "esp", "español", or "spanish" all surface Spanish. A focused-state border and an instant empty state ("No languages match") keep the control responsive and honest about no-result queries.

**Full keyboard support**

Opening the dropdown auto-focuses the search field, and Arrow Down/Up move an \`activeIndex\` highlight through the visible results with \`scrollIntoView({ block: 'nearest' })\` so the highlighted row never leaves view. Enter selects the highlighted language, Escape closes the dropdown, and a document-level click listener closes it on an outside click. This mirrors the native \`<select>\` and combobox behaviour keyboard and screen-reader users already expect, which a styled \`<div>\` dropdown otherwise throws away.

**Wiring it to real localization**

Selecting a language updates the trigger's flag and label and sets \`document.documentElement.lang\` — the hook a real app extends. In practice you'd do one of three things on select: set the \`<html lang>\` and swap an in-memory translation dictionary (client-side i18n like i18next or vue-i18n), navigate to the locale-prefixed URL (\`/es/\`, \`/fr/\` — the SEO-friendly approach search engines prefer), or set a locale cookie and reload. The component doesn't assume which; it exposes the choice and leaves the routing to you.

**Accessibility and markup**

The trigger carries \`aria-haspopup="listbox"\` and a toggled \`aria-expanded\`, the popup is \`role="listbox"\`, and each option is \`role="option"\` — so assistive tech announces it as a real listbox rather than a mystery widget. The dropdown animates in with \`opacity\` and \`transform\` only (never height), keeping it smooth across every framework export.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A "English 🇺🇸" trigger button renders. Click it to open the searchable language dropdown.` },
      { title: 'Search for a language', text: `Type in the search box — the list filters live against both English and native names ("español" or "spanish" both find Spanish).` },
      { title: 'Navigate with the keyboard', text: `Use ArrowDown/ArrowUp to highlight a language, Enter to select it, or Escape to close — the search field is auto-focused on open.` },
      { title: 'Select a language', text: `Click or press Enter — the trigger updates to the chosen flag and name, a checkmark marks it selected, and document.lang is set.` },
      { title: 'Edit the language list', text: `Add or remove entries in the LANGS array ({ code, flag, name, native }) to match the locales your site actually supports.` },
      { title: 'Wire up real localization', text: `In the select() function, navigate to the locale-prefixed URL (/es/, /fr/), swap your translation dictionary, or set a locale cookie and reload.` },
    ] },
    features: [
      { title: 'Flag + English + native name per locale', text: `Each option shows its flag, English name, and endonym (Deutsch, 日本語) so visitors recognise their own language instantly.` },
      { title: 'Type-to-filter search', text: `The search box filters on every keystroke against both the English and native names, with an instant empty state.` },
      { title: 'Full keyboard navigation', text: `Arrow keys move the highlight (with scrollIntoView), Enter selects, Escape closes, and the search auto-focuses on open.` },
      { title: 'Clear selected state', text: `The current language shows a checkmark and bold weight in the list, and its flag/name appear on the trigger.` },
      { title: 'Outside-click and Escape dismissal', text: `A document-level listener and the Escape key both close the dropdown, the standard popover pattern.` },
      { title: 'Accessible listbox semantics', text: `aria-haspopup, aria-expanded, role="listbox", and role="option" make it a real listbox for assistive tech.` },
      { title: 'Sets document.lang on select', text: `Selecting updates document.documentElement.lang — the hook to extend into real routing, dictionary swaps, or a locale cookie.` },
      { title: 'Animation-safe dropdown', text: `Opacity and transform-only transitions keep the open/close smooth across every framework export including Tailwind.` },
    ],
    useCases: [
      { title: 'Multilingual marketing sites', text: `The locale picker in a site header for any product sold across countries — pair with a [country selector](/ui-snippets/country-selector/) for shipping/region fields.` },
      { title: 'SaaS app settings', text: `Let users set their interface language in account settings, persisting the choice to their profile.` },
      { title: 'Documentation and help centers', text: `Switch between translated versions of docs, with the URL navigating to the locale-prefixed path for SEO.` },
      { title: 'E-commerce storefronts', text: `Combine a language switcher with a currency control (see the [currency converter](/ui-snippets/currency-converter/)) for full internationalization.` },
      { title: 'Travel and booking platforms', text: `A searchable locale list is essential where the audience spans many languages and visitors arrive in an unfamiliar UI.` },
      { title: 'Learning accessible dropdown patterns', text: `A practical reference for combobox keyboard navigation and listbox ARIA — compare with a [multi-select dropdown](/ui-snippets/multi-select-dropdown/) for the multi-pick case.` },
      { icon: 'CODE', title: 'Related: Nested Sidebar Nav with Active Path Auto-Expand', desc: 'See the [Nested Sidebar Nav with Active Path Auto-Expand](/ui-snippets/nested-sidebar-active-path-nav/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I make the switcher actually change the site language?', a: `In the select() function, do one of three things: navigate to a locale-prefixed URL (/es/path, the most SEO-friendly), call your client i18n library to swap the active translation dictionary (i18next, vue-i18n, next-intl), or set a locale cookie and reload so the server renders the right language. The component already sets document.documentElement.lang for you as the starting hook.` },
      { q: 'Should I use URL prefixes or a cookie for language?', a: `For public, indexable content prefer distinct locale URLs (/en/, /es/) so each language is its own crawlable page with hreflang tags — cookies hide the translation from search engines. For an authenticated app where SEO is irrelevant, a stored user preference or cookie is simpler and avoids URL clutter.` },
      { q: 'How do I detect the visitor\'s preferred language automatically?', a: `Read navigator.language (or navigator.languages for the ordered list) on first visit, match its prefix against your LANGS codes, and pre-select that language — but always let the user override it and remember their explicit choice, since the browser locale is a hint, not a decision.` },
      { q: 'Are emoji flags reliable across devices?', a: `Emoji flags render on most platforms but not all (notably some Windows versions show two-letter codes instead). For full consistency, replace the emoji with small SVG or PNG flag icons, or drop flags entirely and rely on the native names — flags also imperfectly map to languages (Spanish isn\'t only Spain), so native names are the more robust signal.` },
      { q: 'How do I use this language switcher in React, Vue, or Angular?', a: `In React, hold the current code and query in useState and derive the filtered list with useMemo, calling your i18n library or router in the select handler; in Vue, use ref()/computed() and vue-i18n; in Angular, use a component field and ngx-translate or the built-in i18n. The keyboard navigation and outside-click logic port directly.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to trace the keyboard-navigation state by hand to understand it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the activeIndex highlight stays in sync with the shown array after a search filters the list, or why the outside-click listener checks wrap.contains(e.target) instead of comparing against the trigger alone. The same assistant is useful for optimizing it, for example asking whether re-rendering the entire listEl.innerHTML on every keystroke could cause input lag with a much longer LANGS array, or whether a debounce is worth adding. It is just as handy for extending the effect: ask it to persist the chosen locale to localStorage, group languages by region with sticky headers, or wire select() to a real i18next or next-intl instance. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a searchable "language switcher" dropdown in plain HTML, CSS, and JavaScript with no libraries and no external routing.

Requirements:
- A trigger button showing the current flag, language name, and a caret icon, with aria-haspopup="listbox" and a toggled aria-expanded attribute.
- A popup panel with role="listbox" containing a search input and a scrollable list of options, each rendered with role="option", built from a plain array of objects shaped like { code, flag, name, native }.
- Filtering must match the typed query against both the English name and the native name (case-insensitive substring match), re-rendering the list on every input event, and showing an explicit empty state when nothing matches.
- Full keyboard support inside the search input: ArrowDown and ArrowUp move an active-highlight index clamped to the current filtered list length, Enter selects the highlighted item, and Escape closes the popup. The highlighted row must call scrollIntoView({ block: "nearest" }) so it never scrolls out of view.
- Selecting an item (by click or Enter) must update the trigger's flag and label, set document.documentElement.lang to the selected code, mark that item as selected with a checkmark in the list, and close the popup.
- A single document-level click listener must close the popup when a click lands outside the widget's root wrapper element, without interfering with clicks inside the search input or list.
- Opening the popup must clear any previous search text, re-render the full list, and auto-focus the search input.`,
    },
  },
};

export default languageSwitcher;
