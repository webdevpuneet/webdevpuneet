const cookieTogglePanel = {
  id: 'cookie-toggle-panel',
  title: 'Cookie Preferences Panel',
  lastmod: '2026-07-18',
  category: 'modals',
  html: `<div class="ctp-overlay" id="ctpOverlay">
  <div class="ctp-panel" role="dialog" aria-modal="true" aria-labelledby="ctpTitle">
    <div class="ctp-head">
      <h2 id="ctpTitle">Cookie preferences</h2>
      <p>We use cookies to run the site and, with your consent, to improve it. Choose what to allow.</p>
    </div>

    <div class="ctp-list" id="ctpList"></div>

    <div class="ctp-actions">
      <button class="ctp-btn ctp-ghost" id="ctpReject" type="button">Reject all</button>
      <button class="ctp-btn ctp-ghost" id="ctpSave" type="button">Save choices</button>
      <button class="ctp-btn ctp-primary" id="ctpAccept" type="button">Accept all</button>
    </div>

    <p class="ctp-toast" id="ctpToast" role="status" aria-live="polite"></p>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #1e293b; min-height: 100vh; }

.ctp-overlay { position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; padding: 24px; background: rgba(15, 23, 42, 0.55); backdrop-filter: blur(3px); }

.ctp-panel { width: 100%; max-width: 460px; background: #fff; border-radius: 18px; padding: 26px 26px 22px; box-shadow: 0 30px 70px rgba(0, 0, 0, 0.4); }

.ctp-head h2 { font-size: 20px; font-weight: 800; color: #0f172a; }
.ctp-head p { font-size: 13.5px; line-height: 1.55; color: #64748b; margin-top: 6px; }

.ctp-list { margin: 20px 0; display: flex; flex-direction: column; }
.ctp-row { display: flex; align-items: flex-start; gap: 14px; padding: 15px 0; border-top: 1px solid #eef2f7; }
.ctp-row:first-child { border-top: none; }
.ctp-row-text { flex: 1; }
.ctp-row-title { display: flex; align-items: center; gap: 8px; font-size: 14px; font-weight: 700; color: #1e293b; }
.ctp-req { font-size: 10.5px; font-weight: 700; color: #64748b; background: #f1f5f9; padding: 2px 7px; border-radius: 999px; text-transform: uppercase; letter-spacing: 0.03em; }
.ctp-row-desc { font-size: 12.5px; line-height: 1.5; color: #94a3b8; margin-top: 4px; }

.ctp-switch { position: relative; width: 42px; height: 24px; flex-shrink: 0; margin-top: 2px; cursor: pointer; }
.ctp-switch input { position: absolute; opacity: 0; width: 100%; height: 100%; margin: 0; cursor: pointer; }
.ctp-switch input:disabled { cursor: not-allowed; }
.ctp-track { position: absolute; inset: 0; background: #cbd5e1; border-radius: 999px; transition: background 0.22s; }
.ctp-track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: #fff; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2); transition: transform 0.22s; }
.ctp-switch input:checked + .ctp-track { background: #6366f1; }
.ctp-switch input:checked + .ctp-track::after { transform: translateX(18px); }
.ctp-switch input:disabled + .ctp-track { background: #a5b4fc; }
.ctp-switch input:focus-visible + .ctp-track { box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3); }

.ctp-actions { display: flex; gap: 10px; flex-wrap: wrap; }
.ctp-btn { flex: 1; min-width: 120px; padding: 11px; border-radius: 10px; font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; transition: background 0.15s, border-color 0.15s; }
.ctp-ghost { background: #fff; border: 1.5px solid #e2e8f0; color: #475569; }
.ctp-ghost:hover { border-color: #cbd5e1; }
.ctp-primary { background: #6366f1; border: 1px solid #6366f1; color: #fff; }
.ctp-primary:hover { background: #4f46e5; }

.ctp-toast { min-height: 16px; margin-top: 12px; text-align: center; font-size: 12.5px; font-weight: 600; color: #16a34a; opacity: 0; transition: opacity 0.2s; }
.ctp-toast.show { opacity: 1; }

@media (max-width: 420px) { .ctp-btn { flex-basis: 100%; } }`,
  js: `const CATEGORIES = [
  { key: 'necessary', title: 'Strictly necessary', desc: 'Required for the site to work — security, network, and your saved preferences. Always on.', required: true, on: true },
  { key: 'analytics', title: 'Analytics', desc: 'Help us understand which pages are used so we can improve them. Anonymous and aggregated.', required: false, on: false },
  { key: 'marketing', title: 'Marketing', desc: 'Used to measure and personalise advertising across sites.', required: false, on: false },
  { key: 'functional', title: 'Functional', desc: 'Remember choices like language and region for a richer experience.', required: false, on: false },
];

const list = document.getElementById('ctpList');
const toast = document.getElementById('ctpToast');
const state = {};
let toastTimer = null;

CATEGORIES.forEach(cat => {
  state[cat.key] = cat.on;
  const row = document.createElement('div');
  row.className = 'ctp-row';
  row.innerHTML =
    '<div class="ctp-row-text">' +
      '<div class="ctp-row-title">' + cat.title + (cat.required ? '<span class="ctp-req">Always on</span>' : '') + '</div>' +
      '<div class="ctp-row-desc">' + cat.desc + '</div>' +
    '</div>' +
    '<label class="ctp-switch">' +
      '<input type="checkbox" data-key="' + cat.key + '"' + (cat.on ? ' checked' : '') + (cat.required ? ' disabled' : '') + ' aria-label="' + cat.title + '">' +
      '<span class="ctp-track"></span>' +
    '</label>';
  list.appendChild(row);
});

list.addEventListener('change', (e) => {
  const cb = e.target.closest('input[type="checkbox"]');
  if (!cb) return;
  state[cb.dataset.key] = cb.checked;
});

function flash(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function setAll(on) {
  CATEGORIES.forEach(cat => {
    if (cat.required) return;
    state[cat.key] = on;
    const cb = list.querySelector('input[data-key="' + cat.key + '"]');
    if (cb) cb.checked = on;
  });
}

document.getElementById('ctpAccept').addEventListener('click', () => { setAll(true); save('Accepted all cookies'); });
document.getElementById('ctpReject').addEventListener('click', () => { setAll(false); save('Rejected optional cookies'); });
document.getElementById('ctpSave').addEventListener('click', () => save('Preferences saved'));

function save(msg) {
  // In production: persist 'state' to a cookie or localStorage and load consented scripts
  flash(msg + ' · ' + JSON.stringify(state));
}`,
  seo: {
    title: 'Cookie Preferences Panel — Free HTML CSS JS Snippet',
    description: 'A GDPR cookie consent panel with per-category toggle switches, a locked necessary category, and accept/reject/save actions. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Cookie Preferences Panel — Per-Category Consent Toggles with Accept, Reject and Save',
      description: `Privacy laws like GDPR and ePrivacy require granular cookie consent: users must be able to accept or reject each category of non-essential cookies, and "strictly necessary" cookies must be clearly marked as always-on. A single "Accept" button is not compliant. This component is a proper cookie preferences panel — a modal with a labelled toggle for each cookie category, a locked necessary category, and three actions (Accept all, Reject all, Save choices) — built in HTML, CSS, and vanilla JavaScript, ready to wire to your real consent storage and script loading.

**Per-category toggles built on real checkboxes**

The panel is generated from a \`CATEGORIES\` array of \`{ key, title, desc, required, on }\` objects. Each renders a row with the category name, a description of what it does, and a switch. The switch is a styled native \`<input type="checkbox">\` — not a div pretending to be a toggle — so it is keyboard-operable (Space toggles it), focusable, and announced correctly by screen readers. The visual switch (track and sliding knob) is drawn by CSS on a sibling element using the \`:checked\` and \`:disabled\` sibling selectors, so the appearance always reflects the real input state. A \`:focus-visible\` ring makes keyboard focus obvious.

**The locked "necessary" category**

The strictly-necessary category is \`required: true\`, which renders its checkbox \`checked\` and \`disabled\` and adds an "Always on" badge. Disabled means the user cannot turn it off (necessary cookies are exempt from consent), and the bulk Accept/Reject actions explicitly skip required categories so they are never changed. This is the compliance-critical detail: essential cookies stay on, everything else defaults to off until the user opts in.

**Consent defaults to off**

Note that analytics, marketing, and functional all start \`on: false\`. Under GDPR, non-essential cookies must be off by default — consent has to be an active opt-in, not a pre-ticked box the user must notice and uncheck. The panel reflects that: optional toggles are off until the user enables them or clicks Accept all.

**Three actions, one state object**

A \`state\` object mirrors every category's on/off value and is the single source of truth. Toggling a switch updates \`state\` via a delegated \`change\` listener on the list (one listener for all rows, rather than one per switch). "Accept all" and "Reject all" call \`setAll()\`, which flips every non-required category in both the \`state\` object and the visible checkboxes. "Save choices" persists whatever the current toggles are. All three then call \`save()\`, which here flashes a confirmation showing the resulting consent object — the exact shape you would store.

**Wiring to real consent**

The \`save()\` function is where you connect reality: persist the \`state\` object to a cookie or \`localStorage\`, then conditionally load the scripts the user consented to (fire your analytics snippet only if \`state.analytics\` is true, your ad pixels only if \`state.marketing\` is true, and so on). On a return visit you would read the stored consent, set the toggles to match, and skip the panel if a choice was already made. The component handles all the UI; you provide the storage and the script gating.

**The modal presentation**

The panel sits in a fixed overlay with a blurred, dimmed backdrop, centred, with \`role="dialog"\`, \`aria-modal="true"\`, and \`aria-labelledby\` pointing at the title — the correct dialog semantics. The action buttons wrap to full width on narrow screens (under 420px) so the three-button row never crowds on mobile. Swap the \`#6366f1\` accent for your brand and edit the categories and copy to match your cookie policy.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A centered cookie preferences modal renders with four categories, each with a description and a toggle switch.` },
      { title: 'Toggle a category', text: `Flip analytics, marketing, or functional on or off; the strictly-necessary category is locked on with an "Always on" badge.` },
      { title: 'Use the bulk actions', text: `Accept all turns every optional category on, Reject all turns them off, and Save choices keeps the current toggles — necessary is never changed.` },
      { title: 'See the resulting consent', text: `A confirmation flashes showing the consent object you would store.` },
      { title: 'Edit the categories', text: `Change the CATEGORIES array — titles, descriptions, defaults, and which are required — and the rows rebuild.` },
      { title: 'Wire to storage and scripts', text: `In save(), persist the state to a cookie/localStorage and conditionally load only the scripts the user consented to.` },
    ]},
    features: [
      { title: 'Per-category consent', text: `A labelled toggle for each cookie category, the granular control GDPR and ePrivacy require — not a single accept button.` },
      { title: 'Native checkbox switches', text: `Each toggle is a real <input type=checkbox> styled via :checked/:disabled siblings, so it is keyboard- and screen-reader-friendly.` },
      { title: 'Locked necessary category', text: `Strictly-necessary is checked, disabled, badged "Always on", and skipped by bulk actions so it can never be turned off.` },
      { title: 'Opt-in defaults', text: `Optional categories start off, matching the GDPR rule that non-essential cookies require active consent.` },
      { title: 'Single state object', text: `One state object is the source of truth, updated through a delegated change listener on the whole list.` },
      { title: 'Accept / Reject / Save', text: `Bulk accept and reject flip all optional toggles; save persists the current selection, all via one save() hook.` },
      { title: 'Proper dialog semantics', text: `role=dialog, aria-modal, aria-labelledby, and a focus-visible ring make the panel accessible.` },
      { title: 'Responsive actions', text: `The button row wraps to full-width stacked buttons under 420px for mobile.` },
    ],
    useCases: [
      { title: 'GDPR / ePrivacy compliance', text: `Give EU/UK visitors granular cookie control — pair the first-visit prompt with a slim [cookie banner](/ui-snippets/cookie-banner/) that opens this panel via "Manage preferences".` },
      { title: 'Privacy settings pages', text: `Reuse the same toggles in account settings so users can change consent any time; compare with a [GDPR consent manager](/ui-snippets/gdpr-consent-manager/).` },
      { title: 'Marketing sites with analytics', text: `Gate analytics and ad pixels behind real consent before they load.` },
      { title: 'SaaS and dashboards', text: `Offer functional-cookie control for preferences like language and region.` },
      { title: 'Agencies building client sites', text: `A drop-in, themeable consent panel that meets the granular-choice requirement; complements [cookie preferences](/ui-snippets/cookie-preferences/).` },
      { title: 'Learning consent UX', text: `A reference for accessible toggle switches, opt-in defaults, and the locked-necessary pattern.` },
      { icon: 'CODE', title: 'Related: Simple Hover Tooltip — CSS Only, Truly Zero JavaScript', desc: 'See the [Simple Hover Tooltip — CSS Only, Truly Zero JavaScript](/ui-snippets/css-only-simple-hover-tooltip/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I actually block cookies until the user consents?', a: `The panel manages choices; you enforce them in save(). Persist the state object to a cookie or localStorage, then load category scripts conditionally: only inject your analytics tag if state.analytics is true, your ad pixels if state.marketing is true, and so on. The key is that those scripts must not run before consent — load them dynamically inside save() (or on a return visit after reading stored consent), not statically in the page head.` },
      { q: 'Why are the optional toggles off by default?', a: `GDPR requires that consent for non-essential cookies be an active opt-in — pre-ticked boxes are explicitly not valid consent. So analytics, marketing, and functional start off, and only the strictly-necessary category (which is exempt from consent) is on and locked. The user must deliberately enable or Accept all to turn optional categories on.` },
      { q: 'Why use a real checkbox instead of a styled div for the switch?', a: `A native <input type=checkbox> is keyboard-operable (Space toggles), focusable, and announced by screen readers as a checkbox with its state — all for free. The visual switch is just CSS drawn on a sibling element via the :checked and :disabled selectors, so the look always matches the real input. A div toggle would require re-implementing all that accessibility manually and is easy to get wrong.` },
      { q: 'How do I remember the user choice on their next visit?', a: `In save(), write the state object (and a timestamp/version) to a cookie or localStorage. On page load, read it: if a valid consent record exists, set each toggle to the stored value and skip showing the panel (or just load the consented scripts). Re-prompt if your cookie policy changes by bumping a version number that invalidates old consent. Always provide a way to reopen the panel so users can change their mind.` },
      { q: 'How do I use this consent panel in React, Vue, or Angular?', a: `Hold the consent object in state and render CATEGORIES with .map/v-for/*ngFor, binding each checkbox's checked/disabled to the category. The change handler updates the state for that key; Accept/Reject set all non-required keys. Move save() into a function that persists to storage and triggers your script-loading logic. The CSS — the switch, the modal, the layout — ports unchanged; consider a context/store so other components can read consent before loading scripts.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the CATEGORIES-to-DOM pipeline by hand to see how one array drives the whole panel. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the change listener is attached once to the list container rather than once per checkbox, and why setAll explicitly skips any category marked required instead of relying on the disabled attribute alone to protect it. The same assistant can help optimize it — for instance asking whether generating the row markup with string concatenation and innerHTML is safe if category titles or descriptions ever come from user-editable data versus a hardcoded array. It's also useful for extending the panel: ask it to persist the state object with a policy-version number so consent is invalidated when the cookie policy changes, add a "why we ask" expandable detail per category, or wire save() to conditionally inject real analytics and ad scripts based on the final state values. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a granular cookie-preferences panel in plain HTML, CSS, and JavaScript driven entirely by a single data array — no consent-management library, no frameworks.

Requirements:
- Define a single array of cookie category objects (key, title, description, whether required, and default on/off state), and generate every row of the panel's UI dynamically from that array by iterating it once — no hand-written per-category markup.
- Each category row must include a real checkbox input styled as a toggle switch via a sibling element and CSS selectors targeting the checkbox's checked and disabled states, so the switches are keyboard-operable and screen-reader accessible, not just divs with click handlers.
- The category marked required must render checked and disabled with a visible "always on" badge, and must be structurally impossible for any bulk action to change: the accept-all and reject-all functions must explicitly skip any category flagged required when iterating, rather than relying only on the disabled attribute to prevent the change.
- All non-required categories must default to off, reflecting an opt-in rather than opt-out consent model.
- Maintain one plain state object that mirrors every category's current on/off value as the single source of truth, updated through one delegated change event listener attached to the whole list container rather than one listener per individual checkbox.
- Three actions — Accept All, Reject All, Save Choices — where the first two both set every non-required category's state and checkbox to true or false respectively and the third simply reads current values, and all three must call one shared save function that shows a confirmation message built dynamically from the actual current state object (not a hardcoded string).
- Present the whole thing as a modal dialog with proper role, aria-modal, and aria-labelledby attributes, and make sure the confirmation message uses an aria-live region so screen reader users are notified of the outcome.`,
    },
  },
};

export default cookieTogglePanel;
