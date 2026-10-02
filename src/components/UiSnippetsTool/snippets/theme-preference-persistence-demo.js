const themePreferencePersistenceDemo = {
  id: 'theme-preference-persistence-demo',
  title: 'Theme Preference Persistence Demo',
  lastmod: '2026-09-05',
  category: 'buttons',
  cdnUrls: [],
  html: `<div class="tp-wrap">
  <div class="tp-panel" id="tpPanel" data-theme="light">
    <div class="tp-panel-header">
      <span class="tp-panel-title">Preview Panel</span>
      <label class="tp-switch">
        <input type="checkbox" id="tpToggle" />
        <span class="tp-slider"></span>
      </label>
    </div>
    <p class="tp-panel-text">This panel's appearance follows the saved theme preference.</p>
    <div class="tp-status" id="tpStatus">No preference saved yet — using system default</div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.tp-wrap { width: 100%; max-width: 380px; }

.tp-panel {
  border-radius: 16px; padding: 22px; transition: background 0.2s, color 0.2s;
  background: #fff; color: #1e293b; box-shadow: 0 8px 24px rgba(15,23,42,0.08); border: 1px solid #e2e8f0;
}
.tp-panel[data-theme="dark"] { background: #0f172a; color: #e2e8f0; border-color: #1e293b; }

.tp-panel-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.tp-panel-title { font-size: 14px; font-weight: 800; }
.tp-panel-text { font-size: 13px; opacity: 0.75; line-height: 1.5; margin-bottom: 16px; }

.tp-switch { position: relative; display: inline-block; width: 42px; height: 24px; flex-shrink: 0; }
.tp-switch input { opacity: 0; width: 0; height: 0; }
.tp-slider {
  position: absolute; cursor: pointer; inset: 0; background: #cbd5e1; border-radius: 999px; transition: background 0.15s;
}
.tp-slider::before {
  content: ''; position: absolute; width: 18px; height: 18px; left: 3px; top: 3px; background: #fff;
  border-radius: 50%; transition: transform 0.15s;
}
.tp-switch input:checked + .tp-slider { background: #6366f1; }
.tp-switch input:checked + .tp-slider::before { transform: translateX(18px); }

.tp-status {
  font-size: 11.5px; font-weight: 700; padding: 8px 10px; border-radius: 8px;
  background: rgba(99,102,241,0.1); color: #6366f1; font-family: ui-monospace, monospace;
}
.tp-panel[data-theme="dark"] .tp-status { background: rgba(129,140,248,0.15); color: #a5b4fc; }`,
  js: `const panel = document.getElementById('tpPanel');
const toggle = document.getElementById('tpToggle');
const status = document.getElementById('tpStatus');

const STORAGE_KEY = 'theme';

function applyTheme(theme) {
  panel.setAttribute('data-theme', theme);
  toggle.checked = theme === 'dark';
}

function updateStatus(theme, fromStorage) {
  if (fromStorage) {
    status.textContent = 'Saved to localStorage: ' + theme;
  } else {
    status.textContent = 'No preference saved yet — using system default (' + theme + ')';
  }
}

function init() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'dark' || saved === 'light') {
    applyTheme(saved);
    updateStatus(saved, true);
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const fallback = prefersDark ? 'dark' : 'light';
  applyTheme(fallback);
  updateStatus(fallback, false);
}

toggle.addEventListener('change', () => {
  const theme = toggle.checked ? 'dark' : 'light';
  applyTheme(theme);
  localStorage.setItem(STORAGE_KEY, theme);
  updateStatus(theme, true);
});

init();`,
  seo: {
    title: 'Theme Preference Persistence Demo — Free HTML CSS JS Snippet',
    description: 'A light/dark toggle that saves the chosen theme to localStorage, restores it on load, and falls back to prefers-color-scheme when nothing is saved. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Theme Preference Persistence Demo — Toggle Saved to localStorage',
      description: `This snippet demonstrates the standard pattern for persisting a user's light/dark theme choice across page loads using \`localStorage\`, with a visible status line so the persistence behavior is observable rather than implied.

**Saving the preference**

The toggle switch's \`change\` handler determines the new theme string (\`'dark'\` or \`'light'\`), applies it to the preview panel via \`data-theme\`, and immediately calls \`localStorage.setItem('theme', theme)\` — the choice is durable the instant it's made, not just held in memory.

**Restoring on load, with a fallback chain**

On initialization, \`localStorage.getItem('theme')\` is read first. If it returns a valid saved value, that value is applied straight away and the status line reports it came from storage. If nothing has been saved yet (a fresh visitor), the code checks \`window.matchMedia('(prefers-color-scheme: dark)').matches\` and falls back to the OS-level preference instead — so the panel never defaults to an arbitrary hardcoded theme when the user hasn't made an explicit choice.

**Making persistence visible**

A small monospace status line below the panel reads either "Saved to localStorage: dark" (once an explicit choice has been stored) or "No preference saved yet — using system default" (before any choice is made), and updates live on every toggle — turning what would otherwise be an invisible background behavior into something a reader can directly observe working.`,
    },
    features: [
      'Theme choice saved via localStorage.setItem("theme", value) on every toggle',
      'On load, localStorage.getItem("theme") is checked first and applied immediately if present',
      'Falls back to prefers-color-scheme media query when no preference has been saved yet',
      'Live status line explicitly showing whether the current theme came from storage or system default',
      'data-theme attribute driven styling so the panel and any child element can theme off one attribute',
      'Accessible toggle switch built from a real checkbox input with a styled slider',
      'Fully self-contained vanilla JS with no external dependencies',
    ],
    useCases: [
      { icon: '🌗', title: 'App-wide dark mode toggles', desc: 'Apply the exact persistence pattern behind most theme switches, saving the choice with `localStorage.setItem` on every toggle.' },
      { icon: '💾', title: 'localStorage plus system preference', desc: 'Show how to check storage first and fall back to `prefers-color-scheme` when nothing has been saved yet.' },
      { icon: '🎓', title: 'Persistence pattern teaching', desc: 'Use a clear, minimal example with a live status line showing whether the theme came from storage or from the system.' },
      { icon: '⚙️', title: 'Settings panel drop-in', desc: 'Drop directly into an app settings page as a ready toggle that survives reloads and new tabs.' },
    ],
    faqs: [
      { q: 'What happens on a user\'s very first visit, before they\'ve ever toggled the switch?', a: 'localStorage.getItem("theme") returns null, so the code checks window.matchMedia("(prefers-color-scheme: dark)") and applies dark or light based on the operating system\'s setting, without writing anything to storage yet.' },
      { q: 'When does localStorage actually get written to?', a: 'Only when the toggle is switched. Until the user makes an explicit choice, the theme is derived live from the system preference each load; the moment they toggle it, that choice is written via localStorage.setItem and takes precedence on every future load.' },
      { q: 'How does the status line know which source the theme came from?', a: 'init() and the change handler both call updateStatus with a boolean flag indicating whether the value came from localStorage.getItem versus the prefers-color-scheme fallback, and the status text branches on that flag.' },
      { q: 'Can this theme apply to the whole page instead of just the preview panel?', a: 'Yes — apply the same data-theme attribute to document.documentElement or document.body instead of (or in addition to) the panel element, and define your dark-mode CSS rules against that scope.' },
    ],
  },
};

export default themePreferencePersistenceDemo;
