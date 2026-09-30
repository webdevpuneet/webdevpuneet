const tableRowDensityToggle = {
  id: 'table-row-density-toggle',
  title: 'Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted',
  lastmod: '2026-08-28',
  category: 'tables',
  html: `<div class="demo">
  <div class="density-toolbar">
    <span class="density-title">Support tickets</span>
    <div class="density-group" role="radiogroup" aria-label="Row density">
      <button type="button" class="density-btn" data-density="compact" role="radio" aria-checked="false">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect y="1" width="16" height="2"/><rect y="5" width="16" height="2"/><rect y="9" width="16" height="2"/><rect y="13" width="16" height="2"/></svg>
        Compact
      </button>
      <button type="button" class="density-btn" data-density="comfortable" role="radio" aria-checked="true">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect y="1" width="16" height="2.4"/><rect y="7" width="16" height="2.4"/><rect y="13" width="16" height="2.4"/></svg>
        Comfortable
      </button>
      <button type="button" class="density-btn" data-density="spacious" role="radio" aria-checked="false">
        <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><rect y="2" width="16" height="3"/><rect y="11" width="16" height="3"/></svg>
        Spacious
      </button>
    </div>
  </div>

  <table class="density-table" id="densityTable" data-density="comfortable">
    <thead><tr><th>Ticket</th><th>Customer</th><th>Priority</th><th>Status</th></tr></thead>
    <tbody>
      <tr><td>#4021 — Login fails on SSO</td><td>Acme Corp</td><td><span class="pri high">High</span></td><td>Open</td></tr>
      <tr><td>#4022 — Export button greyed out</td><td>Nimbus Ltd</td><td><span class="pri med">Medium</span></td><td>In progress</td></tr>
      <tr><td>#4023 — Typo in invoice email</td><td>Delta Studio</td><td><span class="pri low">Low</span></td><td>Open</td></tr>
      <tr><td>#4024 — Billing charged twice</td><td>Acme Corp</td><td><span class="pri high">High</span></td><td>Escalated</td></tr>
      <tr><td>#4025 — Dark mode contrast issue</td><td>Nimbus Ltd</td><td><span class="pri low">Low</span></td><td>Resolved</td></tr>
    </tbody>
  </table>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 520px; max-width: 100%; display: flex; flex-direction: column; gap: 12px; }

.density-toolbar { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.density-title { font-size: 13.5px; font-weight: 700; color: #111827; }
.density-group { display: flex; gap: 4px; background: #f1f5f9; padding: 3px; border-radius: 10px; }
.density-btn { display: flex; align-items: center; gap: 6px; padding: 6px 11px; border: none; background: transparent; border-radius: 7px; font-size: 11.5px; font-weight: 700; color: #64748b; cursor: pointer; font-family: inherit; transition: background 0.15s, color 0.15s; }
.density-btn:hover { color: #334155; }
.density-btn[aria-checked="true"] { background: #fff; color: #4338ca; box-shadow: 0 1px 3px rgba(15,23,42,0.1); }
.density-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 1px; }

.density-table { width: 100%; border-collapse: collapse; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; }
.density-table th { text-align: left; font-size: 10.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; }
.density-table td { font-size: 13px; color: #334155; border-bottom: 1px solid #f1f5f9; transition: padding 0.15s ease; }
.density-table tbody tr:last-child td { border-bottom: none; }

/* Density only changes vertical padding and font-size — never column widths
   or the number of visible columns — so the table's structure stays stable
   and only its "compactness" changes as the user switches modes. */
.density-table[data-density="compact"] th, .density-table[data-density="compact"] td { padding: 5px 12px; font-size: 12px; }
.density-table[data-density="comfortable"] th, .density-table[data-density="comfortable"] td { padding: 11px 12px; font-size: 13px; }
.density-table[data-density="spacious"] th, .density-table[data-density="spacious"] td { padding: 18px 12px; font-size: 13.5px; }

.pri { font-size: 10.5px; font-weight: 700; padding: 3px 9px; border-radius: 999px; }
.pri.high { background: #fef2f2; color: #b91c1c; }
.pri.med { background: #fffbeb; color: #b45309; }
.pri.low { background: #f1f5f9; color: #64748b; }`,
  js: `const table = document.getElementById('densityTable');
const buttons = Array.from(document.querySelectorAll('.density-btn'));
const STORAGE_KEY = 'table-row-density';

function applyDensity(density) {
  table.dataset.density = density;
  buttons.forEach((btn) => {
    btn.setAttribute('aria-checked', String(btn.dataset.density === density));
  });
  try {
    // Persisting means a user's preferred density survives a page reload —
    // wrapped in try/catch because localStorage can throw in some contexts
    // (private browsing, disabled storage), and a persistence failure should
    // never break the actual density-switching feature itself.
    localStorage.setItem(STORAGE_KEY, density);
  } catch (err) {
    /* storage unavailable — density switching still works for this session */
  }
}

buttons.forEach((btn) => {
  btn.addEventListener('click', () => applyDensity(btn.dataset.density));
});

function loadStoredDensity() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

const stored = loadStoredDensity();
applyDensity(stored && ['compact', 'comfortable', 'spacious'].includes(stored) ? stored : 'comfortable');`,
  seo: {
    title: 'Table Row Density Toggle — Compact / Comfortable / Spacious, Persisted Across Reloads',
    description: 'A three-way row density switcher (compact, comfortable, spacious) for data tables, implemented as an accessible radio group with the choice persisted to localStorage so it survives a page reload.',
    about: {
      title: 'Row Density Toggle — Letting Users Choose How Much Data Fits on Screen',
      description: `Power users scanning a long table often want to see as many rows as possible; casual or new users often prefer more breathing room and larger touch targets. Hardcoding one row height forces every user into the same tradeoff. This snippet implements a genuine three-way density switcher — compact, comfortable, spacious — that changes only vertical padding and font size, persists the user's choice, and is built as a properly accessible radio group rather than a set of plain buttons.

**Why density changes padding and font-size, never column structure**

Every density mode in the CSS touches exactly two properties: \`padding\` and \`font-size\`. Nothing about column widths, the number of visible columns, or cell content changes between modes — density is purely about *vertical rhythm*, not information density in the sense of hiding or showing data. This distinction matters: a density toggle that also reflows columns would be confusing (users switching for more visible rows shouldn't also lose or gain data), so the CSS is scoped tightly to just the properties that make rows taller or shorter.

**Built as a real radio group, not three plain buttons**

The three density buttons live inside a container with \`role="radiogroup"\`, and each button carries \`role="radio"\` with \`aria-checked\` toggled to reflect the current selection. This isn't just a cosmetic ARIA addition — a density choice is inherently mutually exclusive (exactly one mode is active at a time), which is precisely the semantic a radio group communicates to assistive technology; a screen reader user tabbing to this control hears "radio group, row density" and can navigate the three mutually-exclusive options accordingly, rather than being told three unrelated buttons exist with no indication of their relationship or which one is currently active.

**Persisting through localStorage, defensively**

\`applyDensity()\` writes the chosen density to \`localStorage\` on every change, and the page reads it back on load to restore the same preference. Both the write and the read are wrapped in \`try/catch\` — \`localStorage\` can throw in contexts like private browsing with storage disabled, and a persistence failure in that edge case should degrade gracefully (density switching still works for the current session) rather than throwing an uncaught error that could break the rest of the page's script execution.

**Validating the stored value before trusting it**

When restoring a stored density on load, the code checks that the retrieved string is actually one of the three valid density values before applying it (\`['compact','comfortable','spacious'].includes(stored)\`). This guards against a corrupted or manually-edited \`localStorage\` value (or a future version of the code that used different density names) silently producing a table with no matching CSS rule applied — falling back to \`'comfortable'\` as a safe default whenever the stored value isn't recognized.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Click a density option', text: 'Compact, Comfortable, or Spacious — the table\'s row padding and font size change immediately, with no page reload.' },
        { title: 'Reload the page', text: 'The last-selected density is restored automatically from localStorage, so the preference persists across sessions.' },
        { title: 'Tab to the density group with a keyboard', text: 'Each button is a real role="radio" element with aria-checked reflecting state, giving screen reader users a properly announced mutually-exclusive control.' },
        { title: 'Apply data-density to your own table', text: 'Add the data-density attribute to any table element and copy the three CSS rule blocks, adjusting the padding/font-size values to your own design scale.' },
        { title: 'Change the storage key if needed', text: 'Update STORAGE_KEY in the JS if you have multiple density-togglable tables on the same site that should remember separate preferences.' },
      ],
    },
    features: [
      'Three-way density switch — compact, comfortable, spacious — changing only vertical padding and font-size',
      'Column widths and visible data never change between density modes, keeping the table\'s information content stable',
      'Built as a real ARIA radiogroup with aria-checked, not just visually-styled plain buttons',
      'Preference persists to localStorage and is restored automatically on page reload',
      'Defensive try/catch around all localStorage access so a storage failure never breaks density switching itself',
      'Stored value is validated against the known-good density list before being trusted and applied',
      'Smooth CSS transition on padding changes avoids an abrupt visual jump when switching modes',
    ],
    useCases: [
      { icon: 'ADMIN', title: 'Data-heavy admin tables', desc: 'Let power users switch to compact mode to scan more rows at once, while new users default to comfortable spacing.' },
      { icon: 'CRM', title: 'CRM contact and deal lists', desc: 'Sales teams reviewing long pipelines benefit from a compact view; occasional users prefer more legible spacious rows.' },
      { icon: 'SUPPORT', title: 'Support ticket queues', desc: 'Agents triaging a high volume of tickets benefit from a compact density that surfaces more tickets per screen.' },
      { icon: 'A11Y', title: 'Accessible density preference', desc: 'A spacious mode with larger touch targets and text benefits users with visual or motor accessibility needs.' },
    ],
    faqs: [
      { q: 'Does changing density hide or show any table columns?', a: 'No — density only changes vertical padding and font-size on every cell. Column widths, visible columns, and cell content are identical across all three modes; only the row height and text size change.' },
      { q: 'Why is this built with role="radio" instead of just three buttons?', a: 'A density choice is inherently mutually exclusive — exactly one mode is active at a time — which is exactly the semantic role="radiogroup" and role="radio" communicate to screen readers. Plain buttons with no such roles would give a screen reader user no indication the three options are related or which one is currently selected.' },
      { q: 'What happens if localStorage is unavailable, like in private browsing?', a: 'Both the read and write to localStorage are wrapped in try/catch. If storage throws, density switching still works normally for the current page session — the preference just won\'t persist across a reload, and no error breaks the rest of the page.' },
      { q: 'What if the stored density value is invalid or corrupted?', a: 'The loaded value is checked against the known list of valid density names (compact/comfortable/spacious) before being applied. An unrecognized or corrupted value falls back to the "comfortable" default instead of applying a density with no matching CSS.' },
      { q: 'Can I use this pattern with multiple tables that need separate preferences?', a: 'Yes — give each table its own STORAGE_KEY value so their density preferences are stored and restored independently rather than sharing one global preference.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why role="radiogroup"/role="radio" is the semantically correct accessibility pattern here rather than three independent buttons, and to discuss what specifically the try/catch around localStorage protects against. It's also worth asking for a version that adds a fourth "auto" density mode based on viewport height, or one that animates row height changes with a FLIP technique for a smoother visual transition than a plain CSS padding transition provides.`,
      prompt: `Build a table row density toggle in HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- A three-option control (Compact, Comfortable, Spacious) built with proper ARIA semantics: a container with role="radiogroup" and each option as an element with role="radio" and an aria-checked attribute that reflects which one is currently selected.
- Clicking an option applies a data-density attribute to a data table, and CSS rules scoped to that attribute change only the table cells' vertical padding and font-size — column widths and which data is visible must remain identical across all three modes.
- Persist the selected density to localStorage on every change, and restore it automatically when the page loads, defaulting to "comfortable" if nothing has been stored yet.
- Validate any value read back from localStorage against the three known-valid density names before applying it, falling back to the default if the stored value is missing or unrecognized.
- Wrap all localStorage reads and writes in try/catch so that a storage failure (such as in private browsing with storage disabled) never throws an uncaught error or breaks the density-switching feature itself — it should just not persist for that session.
- Include at least five rows of realistic table data so the visual difference between the three density modes is clearly demonstrated.`,
    },
  },
};

export default tableRowDensityToggle;
