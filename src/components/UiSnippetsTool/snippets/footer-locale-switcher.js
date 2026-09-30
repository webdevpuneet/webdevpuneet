const footerLocaleSwitcher = {
  id: 'footer-locale-switcher',
  title: 'Footer Locale & Currency Switcher',
  category: 'footers',
  html: `<div class="fls-page">
  <main class="fls-content">
    <p class="fls-price">Plan price: <b id="flsPrice">$29</b>/mo</p>
    <p class="fls-hint">↑ Change language or currency in the footer below.</p>
  </main>
  <footer class="fls">
    <div class="fls-inner">
      <a href="#" class="fls-brand"><span class="fls-mark">◈</span> Northwind</a>
      <nav class="fls-links" aria-label="Footer">
        <a href="#">Product</a>
        <a href="#">Pricing</a>
        <a href="#">Support</a>
      </nav>
      <div class="fls-pickers">
        <div class="fls-picker" id="flsLang">
          <button class="fls-btn" id="flsLangBtn" aria-haspopup="listbox" aria-expanded="false">
            <span id="flsLangLabel">🇺🇸 English</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <ul class="fls-menu" id="flsLangMenu" role="listbox" hidden>
            <li role="option" data-flag="🇺🇸" data-label="English">🇺🇸 English</li>
            <li role="option" data-flag="🇩🇪" data-label="Deutsch">🇩🇪 Deutsch</li>
            <li role="option" data-flag="🇫🇷" data-label="Français">🇫🇷 Français</li>
            <li role="option" data-flag="🇯🇵" data-label="日本語">🇯🇵 日本語</li>
            <li role="option" data-flag="🇮🇳" data-label="हिन्दी">🇮🇳 हिन्दी</li>
          </ul>
        </div>
        <div class="fls-picker" id="flsCur">
          <button class="fls-btn" id="flsCurBtn" aria-haspopup="listbox" aria-expanded="false">
            <span id="flsCurLabel">USD $</span>
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="6 9 12 15 18 9"/></svg>
          </button>
          <ul class="fls-menu" id="flsCurMenu" role="listbox" hidden>
            <li role="option" data-sym="$" data-rate="1" data-label="USD $">USD $</li>
            <li role="option" data-sym="€" data-rate="0.92" data-label="EUR €">EUR €</li>
            <li role="option" data-sym="£" data-rate="0.79" data-label="GBP £">GBP £</li>
            <li role="option" data-sym="₹" data-rate="83.1" data-label="INR ₹">INR ₹</li>
            <li role="option" data-sym="¥" data-rate="149" data-label="JPY ¥">JPY ¥</li>
          </ul>
        </div>
      </div>
      <span class="fls-copy">© 2026 Northwind Inc.</span>
    </div>
  </footer>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;color:#e2e8f0}
.fls-page{min-height:100vh;display:flex;flex-direction:column}
.fls-content{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;padding:60px 20px;text-align:center}
.fls-price{font-size:15px;color:#94a3b8}
.fls-price b{color:#f1f5f9;font-size:20px;transition:color .2s}
.fls-hint{font-size:12px;color:#475569}

.fls{border-top:1px solid rgba(255,255,255,.08)}
.fls-inner{max-width:1000px;margin:0 auto;padding:22px 24px;display:flex;align-items:center;gap:24px;flex-wrap:wrap}
.fls-brand{display:flex;align-items:center;gap:7px;color:#f1f5f9;font-weight:800;font-size:15px;text-decoration:none}
.fls-mark{color:#818cf8}
.fls-links{display:flex;gap:18px;flex-wrap:wrap}
.fls-links a{color:#94a3b8;font-size:13px;text-decoration:none;transition:color .15s}
.fls-links a:hover{color:#f1f5f9}

.fls-pickers{display:flex;gap:8px;margin-left:auto}
.fls-picker{position:relative}
.fls-btn{display:flex;align-items:center;gap:6px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.09);color:#e2e8f0;font-size:12.5px;font-weight:600;padding:8px 11px;border-radius:9px;cursor:pointer;font-family:inherit;transition:background .15s}
.fls-btn:hover{background:rgba(255,255,255,.09)}
.fls-btn svg{transition:transform .18s;color:#64748b}
.fls-picker.open .fls-btn svg{transform:rotate(180deg)}

.fls-menu{list-style:none;position:absolute;bottom:calc(100% + 8px);left:0;min-width:150px;background:#151b2c;border:1px solid rgba(255,255,255,.09);border-radius:10px;padding:6px;box-shadow:0 20px 40px -12px rgba(0,0,0,.6);z-index:5}
.fls-menu li{padding:8px 10px;border-radius:7px;font-size:13px;cursor:pointer;transition:background .12s}
.fls-menu li:hover,.fls-menu li.active{background:rgba(99,102,241,.18);color:#c7d2fe}

.fls-copy{color:#475569;font-size:12px;white-space:nowrap}

@media (max-width:720px){
  .fls-inner{flex-direction:column;align-items:flex-start}
  .fls-pickers{margin-left:0;width:100%}
}`,
  js: `var priceUSD = 29;
var priceEl = document.getElementById('flsPrice');

function wirePicker(rootId, btnId, menuId, onSelect) {
  var root = document.getElementById(rootId);
  var btn = document.getElementById(btnId);
  var menu = document.getElementById(menuId);

  btn.addEventListener('click', function (e) {
    e.stopPropagation();
    var isOpen = root.classList.contains('open');
    closeAll();
    if (!isOpen) {
      root.classList.add('open');
      menu.hidden = false;
      btn.setAttribute('aria-expanded', 'true');
    }
  });

  menu.querySelectorAll('li').forEach(function (li) {
    li.addEventListener('click', function () {
      menu.querySelectorAll('li').forEach(function (o) { o.classList.remove('active'); });
      li.classList.add('active');
      onSelect(li);
      closeAll();
    });
  });
}

function closeAll() {
  document.querySelectorAll('.fls-picker').forEach(function (p) {
    p.classList.remove('open');
    var m = p.querySelector('.fls-menu');
    var b = p.querySelector('.fls-btn');
    if (m) m.hidden = true;
    if (b) b.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', closeAll);
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeAll(); });

wirePicker('flsLang', 'flsLangBtn', 'flsLangMenu', function (li) {
  document.getElementById('flsLangLabel').textContent = li.getAttribute('data-flag') + ' ' + li.getAttribute('data-label');
});

wirePicker('flsCur', 'flsCurBtn', 'flsCurMenu', function (li) {
  document.getElementById('flsCurLabel').textContent = li.getAttribute('data-label');
  var rate = parseFloat(li.getAttribute('data-rate'));
  var sym = li.getAttribute('data-sym');
  var converted = Math.round(priceUSD * rate);
  priceEl.style.color = '#818cf8';
  priceEl.textContent = sym + converted;
  setTimeout(function () { priceEl.style.color = ''; }, 300);
});`,
  seo: {
    title: 'Footer Locale & Currency Switcher — Free Snippet',
    description: 'A site footer with working language and currency dropdown pickers that live-convert a sample price on selection — accessible, keyboard-friendly. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Footer Locale & Currency Switcher — Working Language and Currency Pickers',
      description: `Global products need a place to let a visitor pick their language and their currency without leaving the page, and the footer is the conventional home for that control — out of the way of primary navigation, but always reachable from anywhere on the site. This snippet builds two independent dropdown pickers styled as compact footer buttons, each opening a popover menu upward (since footer dropdowns near the bottom of the viewport have nowhere to open downward), and wires the currency picker to actually recompute a sample price so the interaction feels real rather than decorative.

**Two independent popovers, one shared open/close mechanism**

Both pickers — language and currency — are built from the same \`wirePicker(rootId, btnId, menuId, onSelect)\` function, called twice with different element ids and a different \`onSelect\` callback. Clicking a button toggles its own \`.fls-picker.open\` class after first calling \`closeAll()\`, so opening one picker always closes the other — a small but important detail, since two open dropdowns stacked in a footer row would overlap and confuse the eye. A \`document\` level click listener and an \`Escape\` keydown listener both call the same \`closeAll()\`, covering the two most common ways users expect a popover to dismiss: clicking elsewhere or pressing escape.

**Opening upward, not downward**

The \`.fls-menu\` is positioned with \`bottom: calc(100% + 8px)\` rather than \`top\`, anchoring it above the trigger button. This is the detail that makes it a genuine footer component rather than a generic dropdown dropped into a footer: a footer sits at the very bottom of the viewport, so a menu that opened downward would frequently render off-screen or get clipped by the page boundary. Opening upward is the correct default for any control positioned in the last 100px of a page.

**A currency conversion that actually runs**

Selecting a language option is cosmetic — it swaps the flag and label text on the button. Selecting a currency option is not: each \`<li>\` carries a \`data-rate\` and \`data-sym\` attribute, and the \`onSelect\` callback multiplies the base \`priceUSD\` (29) by the selected rate, rounds it, and writes the new symbol and amount into the sample price on the page, along with a brief color flash so the change registers as a live update rather than a silent DOM mutation. This demonstrates the full flow a real implementation would need: a rate table, a selection handler, and a re-render of every price on the page — here scoped to one element for clarity.

**Accessible listbox semantics**

Each button carries \`aria-haspopup="listbox"\` and toggles \`aria-expanded\`, and each menu uses \`role="listbox"\` with \`role="option"\` list items, so assistive technology announces the control as a genuine picker rather than a plain link list. The \`hidden\` attribute — not just a CSS class — is toggled on the menu, which keeps it out of the accessibility tree entirely when closed, not merely visually hidden.

**Extending it for production**

Wire the language selection to your i18n library's locale-switch function (e.g. reload the page with a \`?lang=\` query param, or call \`i18n.changeLanguage()\` in a React app) and drive every price on the page — not just the sample — from a shared currency-rate store so the whole storefront updates in sync. The rate table here is hardcoded for demonstration; in production it should come from a live exchange-rate API refreshed periodically, since currency rates that are even a day stale can meaningfully mislead international customers on price.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A footer renders with brand, links, and two dropdown pickers on the right.' },
        { title: 'Open a picker', text: 'Click the language or currency button — its menu opens upward above the button.' },
        { title: 'Pick a currency', text: 'Selecting a currency recalculates and flashes the sample price above the footer.' },
        { title: 'Close it', text: 'Click elsewhere on the page, press Escape, or pick an option — all three dismiss the open menu.' },
        { title: 'Swap in real rates', text: 'Replace the hardcoded data-rate attributes with a live exchange-rate feed and apply the conversion to every price on the page.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Two independent popover pickers sharing one open/close/close-all mechanism',
      'Menus anchor above their trigger via bottom: calc(100% + 8px) — correct for footer-positioned controls',
      'Currency selection actually recomputes and flashes a live sample price',
      'aria-haspopup, aria-expanded, role="listbox"/"option" for full screen-reader support',
      'hidden attribute toggled on menus — removed from the accessibility tree when closed, not just hidden visually',
      'Dismisses on outside click and on Escape key',
      'Selecting one option always closes the other open picker first',
      'Responsive: pickers stack full-width below 720px',
      'Zero dependencies — one small shared JS function wires both pickers',
    ],
    useCases: [
      { icon: 'APP', title: 'Global e-commerce and SaaS storefronts', desc: 'Any product sold in multiple regions needs a persistent, always-reachable language and currency control — the footer is the conventional home for it since it does not compete with primary navigation.' },
      { icon: 'CHART', title: 'Pricing pages with regional currency', desc: 'Pair with a [pricing currency switcher](/ui-snippets/pricing-currency-switcher/) so the footer control and the pricing table stay in sync when a visitor changes currency mid-session.' },
      { icon: 'DESIGN', title: 'Marketing sites with i18n routing', desc: 'The language picker maps cleanly onto a locale-prefixed routing scheme (/en/, /de/, /fr/) — swap the click handler for a navigation call to your i18n router.' },
      { icon: 'LEARN', title: 'Teaching upward-anchored popovers', desc: 'A concrete example of why bottom: calc(100% + 8px) rather than top is the right anchor direction for any control living near the bottom of the viewport.' },
      { icon: 'CODE', title: 'Multi-currency checkout flows', desc: 'Reuse the rate-table and flash-update pattern to keep a cart total, not just one sample price, in sync across every currency the picker offers.' },
      { icon: 'CODE', title: 'Related: Mega Footer', desc: 'See the [Mega Footer](/ui-snippets/mega-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Footer Trust & Payment Badges Row', desc: 'See the [Footer Trust & Payment Badges Row](/ui-snippets/footer-trust-badges-row/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the menu open upward instead of downward?', a: 'The footer sits at the very bottom of the page, so a menu opening downward from a footer button would frequently render past the viewport edge or get clipped. Anchoring with bottom: calc(100% + 8px) instead of top opens the menu above the button, which always has room in a footer context.' },
      { q: 'Does changing currency update real prices anywhere else on the page?', a: 'In this snippet only the one sample price element updates, to demonstrate the mechanism clearly. In production, drive every price on the page from a shared rate value in state (or a global store) so all of them recompute together when the currency changes.' },
      { q: 'How do I get live exchange rates instead of the hardcoded ones?', a: 'Replace the data-rate attributes with values fetched from a live exchange-rate API (refreshed on an interval or on page load) and store them in a JS object keyed by currency code, then look up the current rate in the onSelect callback instead of reading a static attribute.' },
      { q: 'How does closing on outside-click and Escape both work without conflicting?', a: 'Both listeners call the same closeAll() function, which is idempotent — calling it when nothing is open simply does nothing. The click listener is attached to document and fires after the button click listener (which uses stopPropagation to prevent immediately reclosing the menu it just opened).' },
      { q: 'Is this accessible to screen reader and keyboard users?', a: 'Each trigger button has aria-haspopup="listbox" and a toggled aria-expanded state, and the menu itself uses role="listbox" with role="option" items. The menu is hidden via the hidden attribute (not just CSS), which removes it from the accessibility tree entirely when closed.' },
      { q: 'Can I add more languages or currencies?', a: 'Yes — copy an existing <li> inside the relevant .fls-menu, update its data attributes and label, and it works immediately since the click handler is delegated across every list item in the menu rather than bound to specific options.' },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the popover open/close logic by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the menus anchor with bottom: calc(100% + 8px) instead of the more common top offset, and how the shared wirePicker function keeps the two independent dropdowns from ever being open at the same time. The same assistant can help you optimize it — for instance asking whether the currency rate table should be fetched once on load and cached, or refetched periodically for accuracy. It is also useful for extending the component: ask it to persist the selected language and currency to localStorage so the choice survives a reload, drive every price on the page from the selected currency rather than just the one sample, or wire the language picker into a real i18n routing scheme. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a site footer with two independent dropdown pickers — language and currency — in plain HTML, CSS, and JavaScript, no libraries.

Requirements:
- A footer row with a brand mark, a few nav links, and two picker buttons on the right, each opening its own popover menu when clicked.
- Menus must anchor above their trigger button (not below), since the footer sits at the bottom of the viewport and a downward-opening menu would be clipped.
- Opening one picker must automatically close the other if it is open, and clicking anywhere outside any open menu, or pressing Escape, must close whichever menu is open.
- The currency picker's options must each carry a numeric conversion rate; selecting one must recompute a sample price shown elsewhere on the page by multiplying a fixed base price by that rate, updating the displayed currency symbol, and briefly flashing a color change on the price to signal the live update.
- Use aria-haspopup and a toggled aria-expanded attribute on each trigger button, and role="listbox" with role="option" list items on each menu, with the menu's hidden attribute (not just a CSS class) toggled so it is fully removed from the accessibility tree when closed.
- Provide one shared JavaScript function that wires up both pickers' open/close/selection behavior rather than duplicating the logic for each.`,
    },
  },
};
export default footerLocaleSwitcher;
