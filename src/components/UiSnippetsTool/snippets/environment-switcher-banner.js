const environmentSwitcherBanner = {
  id: 'environment-switcher-banner',
  title: 'Environment Switcher with Color-Coded Persistent Banner',
  lastmod: '2026-08-28',
  category: 'dashboards',
  html: `<div class="demo" id="envDemo" data-env="staging">
  <div class="env-banner" id="envBanner">
    <span class="env-banner-text">You are viewing the <strong id="envBannerLabel">Staging</strong> environment</span>
    <div class="env-select-wrap">
      <button class="env-select-btn" id="envSelectBtn" aria-haspopup="true" aria-expanded="false">
        <span class="env-dot" id="envDot"></span>
        <span id="envSelectLabel">Staging</span>
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="6 9 12 15 18 9"/></svg>
      </button>
      <ul class="env-menu" id="envMenu" hidden>
        <li><button data-env="production">🔴 Production <span class="env-menu-sub">Live customer data</span></button></li>
        <li><button data-env="staging">🟡 Staging <span class="env-menu-sub">Pre-release testing</span></button></li>
        <li><button data-env="development">🟢 Development <span class="env-menu-sub">Local/dev data</span></button></li>
      </ul>
    </div>
  </div>

  <div class="app-shell">
    <header class="app-header">
      <span class="app-brand">Console</span>
    </header>
    <main class="app-main">
      <p>The environment banner's color and label update instantly — production is intentionally the most alarming color to make it hard to run a destructive action there by mistake.</p>
    </main>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.demo { width: 440px; max-width: 100%; }

.env-banner { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 9px 16px; border-radius: 12px 12px 0 0; flex-wrap: wrap; transition: background 0.2s ease; }
.env-banner-text { font-size: 12px; color: #fff; opacity: 0.9; }
.env-banner-text strong { opacity: 1; }

.env-select-wrap { position: relative; }
.env-select-btn { display: flex; align-items: center; gap: 6px; padding: 6px 10px; border-radius: 8px; border: 1.5px solid rgba(255,255,255,0.35); background: rgba(255,255,255,0.12); color: #fff; font-size: 11.5px; font-weight: 700; cursor: pointer; font-family: inherit; }
.env-select-btn:hover { background: rgba(255,255,255,0.2); }
.env-dot { width: 7px; height: 7px; border-radius: 50%; background: #fff; }

.env-menu { position: absolute; right: 0; top: calc(100% + 8px); width: 220px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 6px; box-shadow: 0 20px 45px rgba(15,23,42,0.16); list-style: none; z-index: 20; }
.env-menu li button { width: 100%; display: flex; flex-direction: column; align-items: flex-start; gap: 1px; padding: 8px 10px; border: none; background: none; border-radius: 8px; font-size: 12.5px; font-weight: 700; color: #334155; cursor: pointer; text-align: left; font-family: inherit; }
.env-menu li button:hover { background: #f1f5f9; }
.env-menu-sub { font-size: 10.5px; font-weight: 500; color: #94a3b8; }

.app-shell { border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 12px 12px; background: #fff; }
.app-header { padding: 12px 16px; border-bottom: 1px solid #f1f5f9; }
.app-brand { font-size: 13px; font-weight: 800; color: #111827; }
.app-main { padding: 18px 16px; }
.app-main p { font-size: 12px; color: #64748b; line-height: 1.7; }

/* Colors escalate in visual "alarm level" from development (calm green)
   through staging (cautionary amber) to production (urgent red) — matching
   the real severity of accidentally acting in the wrong one. */
[data-env="development"] .env-banner { background: #166534; }
[data-env="staging"] .env-banner { background: #b45309; }
[data-env="production"] .env-banner { background: #b91c1c; }`,
  js: `const demo = document.getElementById('envDemo');
const banner = document.getElementById('envBanner');
const bannerLabel = document.getElementById('envBannerLabel');
const selectBtn = document.getElementById('envSelectBtn');
const selectLabel = document.getElementById('envSelectLabel');
const menu = document.getElementById('envMenu');
const menuButtons = Array.from(menu.querySelectorAll('button'));

const ENV_LABELS = { production: 'Production', staging: 'Staging', development: 'Development' };

function setEnvironment(env) {
  demo.dataset.env = env;
  bannerLabel.textContent = ENV_LABELS[env];
  selectLabel.textContent = ENV_LABELS[env];
  closeMenu();
}

function openMenu() {
  menu.hidden = false;
  selectBtn.setAttribute('aria-expanded', 'true');
}

function closeMenu() {
  menu.hidden = true;
  selectBtn.setAttribute('aria-expanded', 'false');
}

selectBtn.addEventListener('click', () => {
  menu.hidden ? openMenu() : closeMenu();
});

document.addEventListener('click', (e) => {
  if (!menu.hidden && !e.target.closest('.env-select-wrap')) closeMenu();
});

menuButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetEnv = btn.dataset.env;

    // Switching TO production specifically gets an extra confirmation step —
    // the asymmetry is intentional: moving toward the highest-stakes
    // environment deserves more friction than moving away from it.
    if (targetEnv === 'production' && demo.dataset.env !== 'production') {
      const confirmed = window.confirm('You are about to switch to PRODUCTION. Continue?');
      if (!confirmed) { closeMenu(); return; }
    }

    setEnvironment(targetEnv);
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && !menu.hidden) closeMenu();
});`,
  seo: {
    title: 'Environment Switcher with Color-Coded Persistent Banner — Production, Staging, Development',
    description: 'A dropdown environment switcher paired with a persistent, color-coded banner (red for production, amber for staging, green for development) that requires extra confirmation specifically when switching into production.',
    about: {
      title: 'Environment Switcher — Color-Coding Risk and Adding Friction Where It Matters',
      description: `Internal tools and admin consoles that operate against multiple environments (production, staging, development) create a real, recurring risk: an engineer or support agent forgetting which environment they're currently pointed at, and running a command or clicking a button that was only meant to be safe in a test environment. This snippet addresses that with two coordinated pieces: a persistent, unmistakably color-coded banner, and *asymmetric* friction on the switch itself — specifically harder to move *into* production than out of it.

**Color escalation mirrors actual risk level, not arbitrary branding**

The three environments use green (development), amber (staging), and red (production) — deliberately following the same "escalating alarm" convention used in traffic lights and hazard warnings, not a neutral or brand-driven color choice. This isn't just aesthetic: a user's peripheral vision registers a shift toward red far more readily than a shift between two similarly-saturated brand colors would, which matters because the entire point of the banner is to be noticed *before* an action is taken, not just to be technically present somewhere on screen.

**Switching into production gets one more step than switching out of it**

The click handler on each environment option checks specifically whether the *target* environment is production and the *current* one isn't — only in that specific direction does it insert a native \`confirm()\` prompt before proceeding. Switching from production back to staging or development requires no extra confirmation at all. This asymmetry is deliberate: the actual risk in this pattern isn't "switching environments" in the abstract, it's specifically *ending up in production without having meant to* — so the friction is placed exactly where the risk is, rather than uniformly slowing down every switch regardless of direction.

**The banner label and the dropdown's own label are always the same source of truth**

\`setEnvironment()\` updates both \`bannerLabel.textContent\` and \`selectLabel.textContent\` together, in the same function call, from the same \`ENV_LABELS\` lookup — there's no separate state tracked for "what the banner shows" versus "what the dropdown button shows." This guarantees the two can never disagree with each other, which matters specifically because the banner's entire job is to be a *trustworthy* indicator of the current environment; if it could ever show something different from what the dropdown itself reports, its value as a safety mechanism would be undermined.

**A standard accessible disclosure pattern for the dropdown itself**

The environment picker follows the same conventions as any accessible dropdown: \`aria-haspopup\`/\`aria-expanded\` on the trigger button, closing on an outside click, and closing on Escape — nothing about the environment-specific logic (the color coding, the confirmation gate) needed to compromise on these baseline accessibility behaviors.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Observe the current environment banner', text: 'Its background color and label reflect the active environment — amber for staging in the initial state shown here.' },
        { title: 'Click the environment selector', text: 'Opens a dropdown listing all three environments, each with a color-coded dot and a short description of what that environment represents.' },
        { title: 'Select "Development" or "Staging"', text: 'Switches immediately — the banner color, label, and dropdown label all update together in one atomic change.' },
        { title: 'Select "Production" from a non-production environment', text: 'A confirmation prompt appears specifically for this direction of switch, requiring explicit confirmation before proceeding.' },
        { title: 'Switch away from Production', text: 'No extra confirmation is required — the friction is intentionally one-directional, applied only when moving toward the highest-risk environment.' },
      ],
    },
    features: [
      'Color-coded banner escalates from green (development) through amber (staging) to red (production), mirroring real risk level',
      'Switching specifically into production requires an extra explicit confirmation step; switching out of it does not',
      'Banner label and dropdown selector label are always updated together from one shared source of truth, never independently',
      'Standard accessible dropdown pattern — aria-haspopup/aria-expanded, closes on outside click and Escape',
      'Persistent banner stays visible above the app content at all times while a non-default environment is active',
      'Each environment option in the dropdown includes a short descriptive subtitle clarifying what that environment represents',
      'Asymmetric friction design deliberately targets the actual risk (accidentally ending up in production) rather than uniformly slowing every switch',
    ],
    useCases: [
      { icon: 'DEVOPS', title: 'Internal admin consoles and ops tools', desc: 'Any internal tool that can act against multiple environments benefits from making the active one impossible to overlook.' },
      { icon: 'DATABASE', title: 'Database or API explorer tools', desc: 'Query and data-browsing tools where running a mutation against the wrong environment could cause real, hard-to-reverse damage.' },
      { icon: 'FEATURE', title: 'Feature flag and config management UIs', desc: 'Tools managing feature flags or configuration across environments benefit from a clear, hard-to-miss indicator of which one is currently targeted.' },
      { icon: 'SUPPORT', title: 'Support and debugging tools', desc: 'Support agents troubleshooting across environments need a constant, unambiguous reminder of which one they are currently operating in.' },
      { icon: 'CODE', title: 'Related: Idle Callback Task Scheduler', desc: 'See the [Idle Callback Task Scheduler](/ui-snippets/idle-callback-task-scheduler/) for a related dashboards pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does switching to production need confirmation but switching away from it doesn\'t?', a: 'The actual risk this pattern protects against is specifically ending up in production without meaning to — not "switching environments" in general. Placing friction only on that one direction targets the real risk directly, rather than uniformly slowing down every switch regardless of which way it goes.' },
      { q: 'Why use a traffic-light color scheme (green/amber/red) instead of neutral brand colors?', a: 'The escalating-alarm color convention is more immediately legible, especially in peripheral vision, than a shift between similarly-saturated neutral colors would be — and the entire point of the banner is to be noticed before an action is taken, so a more visually urgent color scheme for higher-risk environments directly serves that goal.' },
      { q: 'Can the banner and the dropdown label ever show different environments?', a: 'No — both are updated together inside the same setEnvironment() function call, reading from the same ENV_LABELS lookup, so there is exactly one source of truth and no code path where they could independently drift out of sync.' },
      { q: 'What happens if I cancel the production confirmation prompt?', a: 'The environment does not change, and the dropdown menu closes — the banner and selector remain showing whatever environment was active before the switch attempt.' },
      { q: 'How would I replace the native confirm() with a custom-styled confirmation modal?', a: 'Swap the window.confirm() call for opening your own modal component, and move the setEnvironment(targetEnv) call into that modal\'s "confirm" button handler instead of the synchronous flow shown here, since a custom modal\'s confirmation is inherently asynchronous.' },
      { q: 'How do I add a fourth environment, like "QA"?', a: 'Add a new <li><button data-env="qa">…</button></li> entry to the menu, an entry to ENV_LABELS, and a new [data-env="qa"] .env-banner CSS rule with an appropriately risk-scaled color between staging and whichever environment it sits closest to in risk.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to discuss why placing confirmation friction asymmetrically (only when moving toward production) is a better design than uniformly confirming every environment switch, and what other admin actions might deserve the same kind of directional, risk-targeted friction. It's also worth asking for a version that persists the last-selected environment to localStorage or a URL parameter, or one that also disables specific high-risk actions elsewhere in the UI (like a "delete all records" button) with extra confirmation specifically while in production.`,
      prompt: `Build an environment switcher with a persistent color-coded banner in HTML, CSS, and vanilla JavaScript — no external library.

Requirements:
- A persistent banner above a representative app UI, showing the currently active environment name, with its background color changing based on environment: a calm color for development, a cautionary color for staging, and an urgent/alarming color for production — following an escalating risk-color convention.
- A dropdown selector (with proper aria-haspopup/aria-expanded attributes, closing on outside click and on Escape) listing all three environments, each with a short descriptive subtitle explaining what that environment represents.
- Update both the banner's label and the dropdown trigger's own displayed label together, from one single function/source of truth, whenever the environment changes — they must never be able to show different environments from each other even momentarily.
- Specifically when switching FROM a non-production environment INTO production, require an extra explicit confirmation step before the switch takes effect. Switching AWAY from production to any other environment must require no such extra confirmation — the friction must be intentionally one-directional.
- If the confirmation is declined, the environment must remain unchanged and the dropdown should close without applying the switch.`,
    },
  },
};

export default environmentSwitcherBanner;
