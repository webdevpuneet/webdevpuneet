const highContrastModeToggle = {
  id: 'high-contrast-mode-toggle',
  title: 'High Contrast Mode Toggle',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<div class="demo-root" id="demoRoot" data-contrast="normal">
  <header class="demo-header">
    <div class="demo-brand">Northline Analytics</div>
    <button class="contrast-toggle" id="contrastToggle" aria-pressed="false">
      <span class="toggle-track"><span class="toggle-thumb"></span></span>
      <span class="toggle-label">High contrast</span>
    </button>
  </header>

  <main class="demo-main">
    <div class="stat-row">
      <div class="stat-card">
        <span class="stat-label">Revenue</span>
        <span class="stat-value">$48.2k</span>
        <span class="stat-delta up">&#9650; 4.1%</span>
      </div>
      <div class="stat-card">
        <span class="stat-label">Errors</span>
        <span class="stat-value">12</span>
        <span class="stat-delta down">&#9660; 2.3%</span>
      </div>
    </div>

    <div class="panel">
      <h2>Recent activity</h2>
      <ul class="activity-list">
        <li><span class="dot dot-ok"></span> Deploy succeeded on <strong>main</strong></li>
        <li><span class="dot dot-warn"></span> Build warning in <strong>api-service</strong></li>
        <li><span class="dot dot-err"></span> Payment webhook failed</li>
      </ul>
      <button class="secondary-btn">View all activity</button>
    </div>
  </main>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; min-height: 100vh;display:flex;align-items:center;justify-content:center}

/* ---- Normal theme (default) ---- */
.demo-root {
  background: #0f1220;
  color: #c7cbe0;
  min-height: 100vh;
  transition: background 0.2s, color 0.2s;
}
.demo-header { display: flex; align-items: center; justify-content: space-between; padding: 18px 24px; border-bottom: 1px solid #232842; }
.demo-brand { font-weight: 700; font-size: 15px; color: #e7e9f5; }

.contrast-toggle { display: flex; align-items: center; gap: 10px; background: transparent; border: none; cursor: pointer; font-family: inherit; }
.toggle-track { width: 42px; height: 24px; border-radius: 20px; background: #2b3050; position: relative; transition: background 0.2s; }
.toggle-thumb { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #9aa0c4; transition: transform 0.2s, background 0.2s; }
.toggle-label { font-size: 13px; color: #9aa0b8; font-weight: 600; }

.demo-main { max-width: 560px; margin: 0 auto; padding: 28px 24px 40px; display: flex; flex-direction: column; gap: 18px; }
.stat-row { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.stat-card { background: #171b2e; border: 1px solid #232842; border-radius: 14px; padding: 16px; display: flex; flex-direction: column; gap: 4px; }
.stat-label { font-size: 11.5px; color: #7b81a3; text-transform: uppercase; letter-spacing: 0.05em; }
.stat-value { font-size: 22px; font-weight: 700; color: #eef0fa; }
.stat-delta { font-size: 12px; font-weight: 700; width: fit-content; }
.stat-delta.up { color: #4ade80; }
.stat-delta.down { color: #4ade80; }

.panel { background: #171b2e; border: 1px solid #232842; border-radius: 14px; padding: 18px 20px; }
.panel h2 { font-size: 14px; margin-bottom: 12px; color: #eef0fa; }
.activity-list { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 16px; }
.activity-list li { font-size: 13px; color: #b5b9d6; display: flex; align-items: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.dot-ok { background: #4ade80; }
.dot-warn { background: #facc15; }
.dot-err { background: #f87171; }
.secondary-btn { font-family: inherit; font-size: 12.5px; font-weight: 700; background: #232842; color: #dfe1f5; border: 1px solid #323966; padding: 8px 14px; border-radius: 8px; cursor: pointer; }

/* ---- High contrast theme ----
   Larger, always-visible borders; text/background pairs chosen to clear
   WCAG AAA's 7:1 ratio where practical; status is never conveyed by color
   alone (icons/text are added), and focus rings widen. Flipped with a
   single data-contrast attribute on the root, the same technique used by
   a dark-mode toggle but aimed at contrast rather than light/dark. */
.demo-root[data-contrast="high"] {
  background: #000;
  color: #fff;
}
.demo-root[data-contrast="high"] .demo-header,
.demo-root[data-contrast="high"] .stat-card,
.demo-root[data-contrast="high"] .panel {
  border: 2px solid #fff;
  background: #000;
}
.demo-root[data-contrast="high"] .demo-brand,
.demo-root[data-contrast="high"] .stat-value,
.demo-root[data-contrast="high"] .panel h2 { color: #fff; }
.demo-root[data-contrast="high"] .stat-label,
.demo-root[data-contrast="high"] .toggle-label,
.demo-root[data-contrast="high"] .activity-list li { color: #fff; }
.demo-root[data-contrast="high"] .stat-delta.up::before { content: "UP "; }
.demo-root[data-contrast="high"] .stat-delta.down::before { content: "DOWN "; }
.demo-root[data-contrast="high"] .stat-delta { color: #fff; text-decoration: underline; }
.demo-root[data-contrast="high"] .toggle-track { background: #fff; border: 2px solid #fff; }
.demo-root[data-contrast="high"] .toggle-thumb { background: #000; }
.demo-root[data-contrast="high"] .secondary-btn { background: #fff; color: #000; border: 2px solid #fff; font-weight: 800; }
.demo-root[data-contrast="high"] .dot { width: 10px; height: 10px; border: 2px solid #fff; }
.demo-root[data-contrast="high"] .dot-ok::after { content: " OK"; }

.demo-root[data-contrast="high"] .activity-list li::before { content: "\\2022"; color: #fff; font-weight: 900; }

/* Toggle "on" thumb position applies regardless of theme */
.contrast-toggle[aria-pressed="true"] .toggle-thumb { transform: translateX(18px); }
.contrast-toggle:focus-visible { outline: 3px solid #6366f1; outline-offset: 4px; border-radius: 8px; }
.demo-root[data-contrast="high"] .contrast-toggle:focus-visible { outline: 3px solid #fff; outline-offset: 4px; }`,

  js: `const demoRoot = document.getElementById('demoRoot');
const toggle = document.getElementById('contrastToggle');

// A single data attribute on the root element drives every override below.
// Nothing in JS decides colors directly — the CSS owns that mapping, JS
// only flips the switch, exactly like a light/dark mode toggle.
function setContrast(isHigh) {
  demoRoot.dataset.contrast = isHigh ? 'high' : 'normal';
  toggle.setAttribute('aria-pressed', String(isHigh));
  try {
    localStorage.setItem('demo-high-contrast', isHigh ? '1' : '0');
  } catch (e) { /* storage may be unavailable in a sandboxed preview */ }
}

toggle.addEventListener('click', () => {
  const isHigh = demoRoot.dataset.contrast === 'high';
  setContrast(!isHigh);
});

// Respect the OS-level "prefers-contrast: more" media feature and a saved
// preference on load, same pattern as respecting prefers-color-scheme.
let saved = null;
try { saved = localStorage.getItem('demo-high-contrast'); } catch (e) {}
if (saved === '1') {
  setContrast(true);
} else if (saved === null && window.matchMedia && window.matchMedia('(prefers-contrast: more)').matches) {
  setContrast(true);
}`,

  seo: {
    title: 'High Contrast Mode Toggle — Free Accessible UI Theme Switch',
    description: `A toggle that flips an entire interface into a high-contrast theme — larger borders, non-color status cues, higher-ratio text — using one data attribute on the root. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'High Contrast Mode Toggle — A Real Accessibility Theme, Not Just Inverted Colors',
      description: `Dark-mode toggles are everywhere; genuine high-contrast toggles are rarer, and the two are not the same feature. A dark theme optimizes for comfort in low light. A high-contrast theme optimizes for legibility — for users with low vision, certain color-vision deficiencies, or anyone in bright glare — by widening every ratio, thickening borders that would otherwise be a faint 1px line, and making sure status is never communicated by color alone. This snippet builds a working toggle that flips a small dashboard between the two, using the same "one attribute on the root" architecture as a dark-mode switch, applied to a genuinely different design goal.

**One data attribute drives everything**

Clicking the toggle sets \`data-contrast="high"\` (or \`"normal"\`) on \`#demoRoot\`, and every override lives in CSS selectors scoped under \`.demo-root[data-contrast="high"]\`. The JavaScript never touches a color value directly — it only flips the attribute, the same separation of concerns used in [the dark mode toggle](/ui-snippets/dark-mode-toggle/) and [color mode toggle](/ui-snippets/color-mode-toggle/) snippets. That separation matters here specifically because it keeps every contrast decision in one auditable place instead of scattered across component-level JS logic.

**What actually changes, and why**

Borders go from a subtle 1px translucent line to a solid 2px white border, because a barely-visible card edge is exactly the kind of detail low-vision users lose first. Backgrounds and text collapse to pure black and white rather than the dark theme's softened grays, pushing contrast ratios toward WCAG's stricter AAA target of 7:1 for body text rather than the AA minimum of 4.5:1. Status dots that relied on green/yellow/red alone gain text labels ("OK", "UP", "DOWN") in high-contrast mode, because color-coding without a redundant cue fails WCAG 1.4.1 (Use of Color) for anyone who can't reliably distinguish the hues, not just users who are fully colorblind.

**Respecting the OS-level signal too**

Beyond the manual toggle, the JS checks \`window.matchMedia('(prefers-contrast: more)')\` on load, so a user who has already told their operating system they want more contrast gets it automatically here too, without hunting for an in-app switch — mirroring how [a reduced-motion toggle](/ui-snippets/prefers-reduced-motion-toggle-demo/) checks \`prefers-reduced-motion\`. A saved \`localStorage\` preference takes priority over the OS default on repeat visits.

**Where this belongs**

Any dashboard, admin panel, or data-dense interface benefits from an explicit high-contrast option, since low-vision users are disproportionately concentrated in exactly those data-heavy, small-text contexts. Pair it with [a text size adjuster](/ui-snippets/text-size-adjuster/) and [a color contrast checker](/ui-snippets/color-contrast-checker/) for a fuller accessibility toolbar, or with [focus-visible styling](/ui-snippets/focus-visible-demo/) so keyboard focus rings also widen under high contrast, as this snippet's toggle button itself does.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Toggle "High contrast"', text: `The whole dashboard flips to a black-and-white, thick-bordered theme.` },
      { title: 'Compare the stat cards', text: `Borders go from a faint line to a solid 2px outline in the high-contrast state.` },
      { title: 'Look at the status dots', text: `In high contrast, "OK" text is added next to the dot — status is never color-only.` },
      { title: 'Reload the preview', text: `Your choice persists via localStorage, same as a saved dark-mode preference.` },
      { title: 'Check your OS contrast setting', text: `If your OS has "increase contrast" enabled, the toggle starts on automatically.` },
      { title: 'Inspect data-contrast', text: `Every override lives under [data-contrast="high"] on the root element in CSS.` },
    ] },
    features: [
      { title: 'Single root attribute', text: `data-contrast drives every override, mirroring a dark-mode toggle.` },
      { title: 'Thicker, always-visible borders', text: `1px translucent lines become solid 2px white borders.` },
      { title: 'AAA-leaning contrast', text: `Pure black/white replaces softened dark-theme grays.` },
      { title: 'No color-only status', text: `Text labels back up every color-coded status dot.` },
      { title: 'OS preference respected', text: `Checks prefers-contrast: more on first load.` },
      { title: 'Persisted choice', text: `localStorage remembers the toggle across visits.` },
      { title: 'Wider focus rings', text: `Keyboard focus outline also thickens under high contrast.` },
      { title: 'Accessible toggle control', text: `aria-pressed communicates on/off state to assistive tech.` },
    ],
    useCases: [
      { title: 'Data-dense dashboards', text: `Give low-vision users a real high-contrast mode for dense stat grids.` },
      { title: 'Admin and internal tools', text: `Pair with [the color contrast checker](/ui-snippets/color-contrast-checker/) during design review.` },
      { title: 'Accessibility settings panels', text: `Combine with [text size adjuster](/ui-snippets/text-size-adjuster/) and [reading mode toggle](/ui-snippets/reading-mode-toggle/).` },
      { title: 'Public sector and regulated apps', text: `Meet WCAG contrast requirements beyond the AA minimum by default.` },
      { title: 'Kiosk and TV-display UIs', text: `Glare and viewing distance both benefit from thicker borders and stronger contrast.` },
      { title: 'Alongside dark mode', text: `Offer high contrast as a third theme next to [dark mode](/ui-snippets/dark-mode-toggle/) and light.` },
      { icon: 'CODE', title: 'Related: Payment Request API Button', desc: 'See the [Payment Request API Button](/ui-snippets/payment-request-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Is a high-contrast theme the same thing as dark mode?', a: `No. Dark mode is primarily a comfort preference for low-light viewing and typically uses softened, muted colors. A high-contrast theme is an accessibility feature aimed at legibility — it pushes text/background ratios higher, thickens borders, and removes any reliance on subtle color differences, regardless of whether the base theme is light or dark.` },
      { q: 'How does the toggle avoid scattering color logic across components?', a: `It sets a single data-contrast attribute on the root element and lets CSS selectors scoped to [data-contrast="high"] own every visual override. The JavaScript never assigns a color directly — it only flips the attribute — so every contrast decision lives in one place in the stylesheet and stays easy to audit or extend.` },
      { q: 'Why does the high-contrast mode add text like "OK" or "UP" next to colored elements?', a: `WCAG 1.4.1 (Use of Color) requires that color never be the only way information is conveyed, because colorblind users and some low-vision users cannot reliably distinguish hues. The status dots already rely on color in the normal theme; the high-contrast theme adds a redundant text cue so the same information reaches users who cannot pick up on color alone.` },
      { q: 'Does this respect the OS-level "increase contrast" setting?', a: `Yes — on load, the script checks window.matchMedia("(prefers-contrast: more)") and turns the toggle on automatically if the user has that OS accessibility setting enabled and hasn\'t already saved an explicit preference of their own, similar to how a reduced-motion toggle checks prefers-reduced-motion.` },
      { q: 'Can I add a third theme option instead of just on/off?', a: `Yes — swap the boolean data-contrast value for a small enum (normal / high / high-inverted, for example) and add corresponding CSS blocks keyed to each value. The toggle button would become a small select or segmented control instead of a switch, but the single-attribute architecture stays exactly the same.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a high-contrast theme is a distinct accessibility feature from dark mode, not just an inverted color scheme — the assistant can walk through the specific WCAG success criteria (contrast ratios, use of color) that motivate each override in the CSS. It's also useful for auditing your own theme system: ask it to check whether your dashboard's status indicators rely on color alone, or whether your border and divider styles would survive being thickened to 2px without breaking any layouts. You can ask it to extend this pattern with a contrast-ratio calculator that live-checks your chosen colors against WCAG AA/AAA thresholds, or to wire the prefers-contrast media query check into a React context provider. Treat it as a working reference for a feature many teams claim to support without ever really testing.`,
      prompt: `Build a high-contrast accessibility mode toggle for a small dashboard UI in plain HTML, CSS, and JavaScript.

Requirements:
- A single data attribute (e.g. data-contrast="normal" | "high") on a root wrapper element that every visual override is scoped under in CSS — do not write JavaScript that sets colors directly.
- A normal theme with a typical dark UI: soft borders, muted grays, color-coded status indicators (e.g. green/yellow/red dots for ok/warning/error).
- A high-contrast theme, toggled by the same attribute, that: uses pure black and white rather than muted grays, thickens all card and container borders to at least 2px and always-visible (never a faint 1px line), adds a redundant text or symbol cue next to every color-coded status indicator so status is never conveyed by color alone, and widens the keyboard focus outline.
- A visually accessible toggle switch with aria-pressed reflecting its state, not just a CSS class with no ARIA semantics.
- On load, check window.matchMedia('(prefers-contrast: more)') and enable high-contrast automatically if the user's OS requests it and no saved preference exists yet.
- Persist the user's explicit choice in localStorage so it survives a page reload, falling back gracefully if localStorage is unavailable.`,
    },
  },
};

export default highContrastModeToggle;
