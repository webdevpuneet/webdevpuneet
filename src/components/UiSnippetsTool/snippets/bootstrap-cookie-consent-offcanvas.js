const bootstrapCookieConsentOffcanvas = {
  id: 'bootstrap-cookie-consent-offcanvas',
  title: 'Bootstrap Cookie Consent Offcanvas Panel',
  lastmod: '2026-09-09',
  category: 'modals',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 text-center">
  <p class="text-muted small">This preview auto-opens the cookie panel on load. Click "Reset" to trigger it again.</p>
  <button class="btn btn-sm btn-outline-dark" id="bscookieReset">Reset &amp; show again</button>
</div>

<div class="offcanvas offcanvas-bottom bscookie-panel" tabindex="-1" id="bscookiePanel" data-bs-backdrop="false">
  <div class="offcanvas-body d-flex flex-wrap align-items-center gap-3 justify-content-between">
    <p class="mb-0 small">We use cookies to improve your experience and analyze traffic. See our <a href="javascript:void(0)">Cookie Policy</a>.</p>
    <div class="d-flex gap-2 flex-shrink-0">
      <button class="btn btn-sm btn-outline-secondary" id="bscookieCustom">Customize</button>
      <button class="btn btn-sm btn-outline-dark" id="bscookieReject">Reject all</button>
      <button class="btn btn-sm btn-dark" id="bscookieAccept">Accept all</button>
    </div>
  </div>
  <div class="bscookie-prefs d-none" id="bscookiePrefs">
    <div class="offcanvas-body pt-0">
      <div class="form-check form-switch"><input class="form-check-input" type="checkbox" checked disabled><label class="form-check-label small">Essential (always on)</label></div>
      <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="bscookieAnalytics"><label class="form-check-label small">Analytics</label></div>
      <div class="form-check form-switch"><input class="form-check-input" type="checkbox" id="bscookieMarketing"><label class="form-check-label small">Marketing</label></div>
      <button class="btn btn-sm btn-dark mt-2" id="bscookieSave">Save preferences</button>
    </div>
  </div>
</div>`,
  css: `.bscookie-panel { max-height: none; }
.bscookie-prefs { border-top: 1px solid #eceef1; }`,
  js: `const panelEl = document.getElementById('bscookiePanel');
const panel = bootstrap.Offcanvas.getOrCreateInstance(panelEl, { backdrop: false });
const prefs = document.getElementById('bscookiePrefs');

function close(choice) {
  console.log('cookie choice:', choice);
  panel.hide();
}

document.getElementById('bscookieAccept').addEventListener('click', () => close('accept-all'));
document.getElementById('bscookieReject').addEventListener('click', () => close('reject-all'));
document.getElementById('bscookieCustom').addEventListener('click', () => prefs.classList.toggle('d-none'));
document.getElementById('bscookieSave').addEventListener('click', () => close('custom'));
document.getElementById('bscookieReset').addEventListener('click', () => { prefs.classList.add('d-none'); panel.show(); });

// A cookie banner should appear without requiring a click first — Bootstrap's
// offcanvas only opens on request, so this shows it once automatically.
panel.show();`,

  seo: {
    title: 'Bootstrap Cookie Consent Offcanvas Panel — Free Snippet',
    description: 'A real Bootstrap 5.3 offcanvas panel used as a cookie consent banner — Accept, Reject, and an expandable per-category preferences panel, with no page-dimming backdrop.',
    about: {
      title: 'Bootstrap Cookie Consent Offcanvas Panel — HTML, CSS & JavaScript',
      description: `A cookie banner shouldn't block the page behind a dark backdrop the way a real modal does — visitors need to keep reading while deciding. This snippet uses **real Bootstrap 5.3**'s Offcanvas component with \`data-bs-backdrop="false"\` (also set in its JavaScript options), anchored to \`offcanvas-bottom\` so it reads as a banner rather than a full dialog, opened automatically once via \`panel.show()\` on load rather than waiting for a click.\n\nClicking "Customize" reveals a second section with per-category toggle switches (Essential, permanently on and disabled; Analytics; Marketing) using Bootstrap's real \`form-switch\` component — a common two-tier consent pattern: accept or reject everything in one click, or drill into specifics only if you choose to.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The panel opens automatically from the bottom, with no dark backdrop dimming the page.' },
        { title: 'Click "Accept all" or "Reject all"', text: 'The panel closes; check the browser console to see the logged choice.' },
        { title: 'Click "Customize" instead', text: 'A preferences section expands below with per-category toggle switches.' },
        { title: 'Adjust toggles and save', text: 'Toggle Analytics/Marketing and click "Save preferences" — the panel closes with your custom choice.' },
        { title: 'Trigger it again', text: 'Click "Reset & show again" to see the panel appear fresh, preferences collapsed.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Offcanvas component, anchored to the bottom edge like a genuine banner',
      'No backdrop — data-bs-backdrop="false" keeps the page fully interactive behind it',
      'Opens automatically on load via panel.show(), not waiting for a user click',
      'Expandable "Customize" section with real Bootstrap form-switch toggles per cookie category',
      'Essential cookies toggle is permanently on and disabled, matching real compliance requirements',
      'Two-tier consent flow — one-click accept/reject, or granular per-category control',
    ],
    useCases: [
      { icon: 'CODE',  title: 'GDPR/cookie-law compliant consent banners', desc: 'A functioning starting point for the accept/reject/customize consent pattern most privacy regulations expect.' },
      { icon: 'LEARN', title: 'Learning Offcanvas without a backdrop', desc: 'A clear example of using Bootstrap\'s Offcanvas as a non-blocking banner rather than its more common full-overlay use.' },
      { icon: 'FORM',  title: 'Any site needing granular consent categories', desc: 'The expandable preferences pattern generalizes to notification preferences or any other opt-in/opt-out category set.' },
      { icon: 'ACCESS', title: 'Sites requiring the page to stay usable during consent', desc: 'A backdrop-free banner ensures visitors relying on assistive tech or partial page reading aren\'t blocked while deciding.' },
    ],
    faqs: [
      { q: 'Why doesn\'t this dim the page like a typical modal?', a: 'data-bs-backdrop="false" (set both as an attribute and in the JavaScript initialization options) tells Bootstrap\'s Offcanvas component not to render its usual dark backdrop, so the rest of the page stays fully visible and interactive.' },
      { q: 'Does the choice get saved anywhere?', a: 'This demo logs the choice to the console. Replace that with a real implementation — setting a cookie or localStorage flag, and only calling panel.show() on load if no prior choice is recorded.' },
      { q: 'How does the "Customize" preferences section work?', a: 'Clicking it toggles a d-none class on a second offcanvas-body section containing three Bootstrap form-switch toggles, one of which (Essential) is permanently checked and disabled since essential cookies typically can\'t be opted out of under most cookie laws.' },
      { q: 'Does this actually block or allow specific cookies?', a: 'No — this is a UI pattern only. Real cookie-consent enforcement requires actually gating your analytics/marketing scripts behind the recorded consent choice, which is outside the scope of this front-end snippet.' },
      { q: 'Can I anchor the panel to the top instead of the bottom?', a: 'Yes — change offcanvas-bottom to offcanvas-top on the panel element; the JavaScript logic is unaffected by which edge it\'s anchored to.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to persist the consent choice to localStorage and only show the panel if no choice is recorded yet, or to actually gate a real analytics script tag behind the Analytics toggle's saved state. It's also a good exercise to ask the assistant to add a "Manage cookie preferences" link in the site footer that reopens the panel at any time.`,
      prompt: `Build a Bootstrap 5.3 cookie consent banner using the Offcanvas component, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A real Bootstrap offcanvas anchored to the bottom of the screen (offcanvas-bottom), initialized with backdrop disabled (both the data-bs-backdrop="false" attribute and matching JavaScript option) so the page behind it stays fully visible and interactive.
- The panel must open automatically on page load via JavaScript (not require a user click to first appear), with Accept all, Reject all, and Customize buttons.
- Clicking Customize must reveal an additional section with per-category toggle switches (using Bootstrap's real form-switch component) for at least Essential (permanently on, disabled), Analytics, and Marketing, plus a Save preferences button.
- Any of Accept all, Reject all, or Save preferences must close the offcanvas panel using Bootstrap's real Offcanvas JavaScript API.`,
    },
  },
};

export default bootstrapCookieConsentOffcanvas;
