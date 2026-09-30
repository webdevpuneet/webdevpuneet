const prefersReducedMotionToggleDemo = {
  id: 'prefers-reduced-motion-toggle-demo',
  title: 'prefers-reduced-motion Accessibility Demo',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo-wrap">
  <div class="os-readout">
    <span class="os-dot" id="os-dot"></span>
    <div class="os-text">
      <span class="os-label">Your OS-level setting (detected via JS)</span>
      <span class="os-value" id="os-value">Checking&hellip;</span>
    </div>
  </div>

  <div class="sim-toggle-row">
    <div class="sim-toggle-text">
      <strong>Simulate reduced motion</strong>
      <p>This toggle mimics what a real <code>@media (prefers-reduced-motion: reduce)</code> block does &mdash; JavaScript cannot change your actual OS setting, so this is a teaching simulation only.</p>
    </div>
    <label class="switch">
      <input type="checkbox" id="sim-toggle">
      <span class="switch-slider"></span>
    </label>
  </div>

  <div class="elements-grid">
    <div class="element-card">
      <div class="spinner" id="spinner"></div>
      <span class="element-label">Spinning loader</span>
    </div>
    <div class="element-card">
      <div class="slide-track">
        <div class="slide-card" id="slide-card"></div>
      </div>
      <span class="element-label">Sliding card</span>
    </div>
    <div class="element-card">
      <div class="badge" id="badge">Live</div>
      <span class="element-label">Pulsing badge</span>
    </div>
  </div>

  <div class="mode-status" id="mode-status">Motion: <strong>full</strong></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; color: #1e293b; }

.demo-wrap { max-width: 640px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; gap: 22px; }

.os-readout { display: flex; align-items: center; gap: 12px; background: #0f172a; border-radius: 14px; padding: 14px 18px; }
.os-dot { width: 12px; height: 12px; border-radius: 50%; background: #64748b; flex-shrink: 0; transition: background 0.2s; }
.os-dot.reduced { background: #f59e0b; }
.os-dot.no-preference { background: #22c55e; }
.os-text { display: flex; flex-direction: column; gap: 3px; }
.os-label { font-size: 11px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; font-weight: 600; }
.os-value { font-size: 13px; color: #e2e8f0; font-family: 'SFMono-Regular', Consolas, monospace; }

.sim-toggle-row { display: flex; align-items: center; justify-content: space-between; gap: 16px; background: #fff; border-radius: 14px; padding: 16px 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.sim-toggle-text strong { font-size: 14px; color: #1e293b; }
.sim-toggle-text p { font-size: 12px; color: #64748b; line-height: 1.6; margin-top: 4px; max-width: 380px; }
.sim-toggle-text code { background: #f1f5f9; padding: 1px 5px; border-radius: 4px; font-size: 11px; color: #6366f1; }

.switch { position: relative; display: inline-block; width: 46px; height: 26px; flex-shrink: 0; cursor: pointer; }
.switch input { opacity: 0; width: 0; height: 0; position: absolute; }
.switch-slider { position: absolute; inset: 0; background: #e2e8f0; border-radius: 26px; transition: background 0.25s; }
.switch-slider::before { content: ''; position: absolute; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.18); top: 4px; left: 4px; transition: transform 0.25s; }
.switch input:checked + .switch-slider { background: #6366f1; }
.switch input:checked + .switch-slider::before { transform: translateX(20px); }

.elements-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; background: #fff; border-radius: 16px; padding: 24px 18px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
.element-card { display: flex; flex-direction: column; align-items: center; gap: 12px; }
.element-label { font-size: 11.5px; color: #64748b; font-weight: 600; text-align: center; }

/* Spinning loader */
.spinner {
  width: 40px; height: 40px; border-radius: 50%;
  border: 4px solid #e2e8f0; border-top-color: #6366f1;
  animation: spin 0.9s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Sliding card */
.slide-track { width: 100%; height: 40px; position: relative; overflow: hidden; background: #f1f5f9; border-radius: 8px; }
.slide-card {
  position: absolute; top: 6px; left: 6px;
  width: 28px; height: 28px; border-radius: 6px;
  background: #6366f1;
  animation: slide 1.6s ease-in-out infinite alternate;
}
@keyframes slide { from { transform: translateX(0); } to { transform: translateX(calc(100% + 6px)); } }

/* Pulsing badge */
.badge {
  padding: 6px 14px; border-radius: 20px; font-size: 11px; font-weight: 700;
  background: #ef4444; color: #fff;
  animation: pulse 1.2s ease-in-out infinite;
}
@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.12); opacity: 0.75; } }

/* Reduced-motion simulation class: mirrors what a real
   @media (prefers-reduced-motion: reduce) block would apply site-wide. */
.reduced-motion .spinner { animation: none; border-top-color: #6366f1; }
.reduced-motion .slide-card { animation: none; left: 50%; transform: translateX(-50%); }
.reduced-motion .badge { animation: none; }

.mode-status { text-align: center; font-size: 12.5px; color: #475569; background: #f1f5f9; border-radius: 10px; padding: 10px; }
.mode-status strong { color: #6366f1; }`,

  js: `const simToggle = document.getElementById('sim-toggle');
const wrap = document.querySelector('.demo-wrap');
const modeStatus = document.getElementById('mode-status');
const osDot = document.getElementById('os-dot');
const osValue = document.getElementById('os-value');

// This class toggle SIMULATES, for teaching purposes, what a real
// @media (prefers-reduced-motion: reduce) block does automatically at the
// OS level. JavaScript has no ability to change the user's actual OS
// setting -- only to detect it (see below) and to build an in-page
// approximation like this one.
function applySimulation() {
  const reduced = simToggle.checked;
  wrap.classList.toggle('reduced-motion', reduced);
  modeStatus.innerHTML = 'Motion: <strong>' + (reduced ? 'reduced (simulated)' : 'full') + '</strong>';
}

simToggle.addEventListener('change', applySimulation);
applySimulation();

// Real, live detection of the user's actual OS-level accessibility setting.
// This is read-only -- we can react to it, but never override it.
function reportOsPreference() {
  const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
  const reduced = mql.matches;
  osValue.textContent = reduced
    ? 'prefers-reduced-motion: reduce'
    : 'prefers-reduced-motion: no-preference';
  osDot.className = 'os-dot ' + (reduced ? 'reduced' : 'no-preference');
}

const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
reportOsPreference();
// Live-updates if the user changes their OS setting while this page is open.
motionQuery.addEventListener('change', reportOsPreference);`,

  seo: {
    title: 'prefers-reduced-motion Demo — Free HTML CSS JS Snippet',
    description: 'Simulated reduced-motion toggle plus live detection of the real OS-level prefers-reduced-motion setting via matchMedia. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'prefers-reduced-motion Accessibility Demo — Simulated Toggle Plus Live OS-Level Detection',
      description: `Motion on the web isn't just decorative — for a meaningful share of users it's a genuine barrier. People with vestibular disorders, migraine conditions, or certain forms of motion sensitivity can experience real physical symptoms (dizziness, nausea, headaches) from parallax scrolling, spinning loaders, sliding transitions, and other animated UI. The \`prefers-reduced-motion\` media feature, part of the CSS Media Queries Level 5 spec, lets users declare this preference once at the operating system level (macOS: Accessibility > Display > Reduce Motion; Windows: Settings > Accessibility > Visual Effects > Animation Effects; iOS/Android have equivalent toggles) and have every website that respects the media query honor it automatically, with zero site-specific configuration.

**The critical constraint this demo is built around**

There is no JavaScript API to change a user's OS-level motion preference — and there shouldn't be, because it's a system-wide accessibility setting the user controls once, outside any individual website's authority. The only thing JavaScript can do is **read** the current value via \`window.matchMedia('(prefers-reduced-motion: reduce)').matches\`, which returns \`true\` or \`false\` reflecting the live OS setting, and optionally subscribe to future changes with \`matchMedia(...).addEventListener('change', callback)\` if the user toggles the OS setting while the page is open. This snippet makes that constraint explicit and honest: the toggle switch you interact with does **not** touch the real setting at all — it only adds and removes a \`.reduced-motion\` class on a wrapper element, purely to simulate, for teaching purposes, what your real production CSS should do automatically via a native \`@media\` block. Meanwhile, a separate readout at the top independently reports your browser's actual, live \`matchMedia()\` result, so you can compare the simulation against ground truth.

**How real production code should be structured**

In a real site, you would never rely on a JS-driven class toggle to reduce motion — you'd write the reduction directly into your CSS using the media query itself: \`@media (prefers-reduced-motion: reduce) { .spinner, .slide-card, .badge { animation: none; } }\`. The browser evaluates this at the OS level with zero JavaScript required, applies it before your JS even runs, and updates live if the user changes the setting while your tab is open, exactly matching how any other media query (like \`prefers-color-scheme\` for dark mode) behaves. This snippet's \`.reduced-motion\` class rules are written as a deliberate stand-in for that media query, using an identical rule shape, so that flipping between "read the real API" and "simulate the CSS effect" is a one-line change in a real codebase: swap the class selector for the media query and delete the toggle.

**Why full removal of animation isn't always right**

The WCAG 2.3.3 (AAA) success criterion and general best practice recommend reducing rather than always fully eliminating motion — replacing large, sweeping transforms with subtle opacity crossfades preserves perceivable state changes (like "this loading indicator is active") without the vestibular trigger of large-scale movement. This demo takes the simpler, fully-off approach for clarity (\`animation: none\`), but production code often swaps a spin/slide keyframe animation for a gentler opacity pulse instead of removing feedback entirely, so users still get a sense that something is happening.

**What the three demo elements represent**

The spinning loader represents infinite-loop UI feedback (loading spinners, progress indicators) — a common vestibular trigger because of its continuous rotational motion. The sliding card represents transform-based transitions (carousels, tab switches, drawer animations) — large translateX/translateY movements are specifically called out in accessibility guidance as high-risk. The pulsing badge represents scale/opacity "attention" animations (notification badges, live indicators) — a milder case, useful for showing that even small looping animations should still respect the preference. Each is driven by a standard CSS \`@keyframes\` animation that gets neutralized by the same \`.reduced-motion\` ancestor class, demonstrating a scalable pattern: put the "calm" override rules together in one place rather than duplicating \`animation: none\` overrides scattered throughout a stylesheet.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Check your real OS-level setting first', text: 'Look at the readout at the top of the demo, populated by reportOsPreference() calling window.matchMedia(\'(prefers-reduced-motion: reduce)\').matches. The dot turns amber and the text reads "reduce" if your operating system already has reduced motion enabled, or green with "no-preference" otherwise — this value is live and independent of anything else on the page.' },
        { title: 'Flip the simulation toggle', text: 'Toggle #sim-toggle to add or remove the .reduced-motion class on the page wrapper via applySimulation(). This does NOT change your OS setting or the readout above — it only demonstrates, in-page, the visual effect that a real @media (prefers-reduced-motion: reduce) block would apply automatically and instantly for users who have the OS setting enabled.' },
        { title: 'Observe each animated element respond', text: 'With the simulation on, the spinning loader\'s animation: spin rule is overridden to animation: none, the sliding card snaps to a centered static position instead of animating with alternate, and the pulsing badge stops its scale/opacity keyframe — all three respond to the same single ancestor class, showing the scalable "one class, many overrides" pattern.' },
        { title: 'Change your actual OS setting to see it live-update', text: 'Open your operating system\'s accessibility settings (macOS: Accessibility > Display > Reduce Motion; Windows: Settings > Accessibility > Visual effects) and toggle it while this page stays open. The motionQuery.addEventListener(\'change\', ...) listener will fire immediately and update the OS readout at the top without a page reload, proving the API is genuinely live, not just read once on load.' },
        { title: 'Port the simulation class to a real media query', text: 'In production CSS, delete the JS toggle entirely and rename every .reduced-motion ancestor-class selector to be wrapped in @media (prefers-reduced-motion: reduce) { ... } instead — the rule bodies themselves (animation: none, the repositioned .slide-card) can be copied verbatim, since the simulation was deliberately written to mirror the real media query\'s effect.' },
        { title: 'Consider reducing instead of removing for AAA-level compliance', text: 'For elements that convey meaningful state (like the spinner indicating active loading), consider swapping the keyframe animation for a subtler opacity-only pulse rather than animation: none entirely, so users with motion sensitivity still receive the "something is happening" signal without a vestibular trigger.' },
      ],
    },
    features: [
      'Live, read-only detection of the real OS-level setting via window.matchMedia(\"(prefers-reduced-motion: reduce)\").matches',
      'matchMedia change listener that live-updates the OS readout if the user changes their OS setting mid-session',
      'Clearly separated in-page simulation toggle that never claims to alter the real OS-level preference',
      'Three distinct animated elements (rotation, transform-translate, scale/opacity) representing common vestibular-trigger UI patterns',
      'Single ancestor .reduced-motion class pattern mirroring how a real @media (prefers-reduced-motion: reduce) block scopes overrides',
      'Pure CSS keyframe animations (spin, slide, pulse) neutralized via animation: none rather than JS-driven animation cancellation',
      'Color-coded status dot (amber for reduce, green for no-preference) for at-a-glance OS state reading',
      'Text status bar reflecting the current simulated mode in real time via innerHTML update',
    ],
    useCases: [
      { icon: 'LEARN', title: 'Teaching accessibility teams the difference between detection and simulation', desc: 'Use this demo in an accessibility training session to make the subtle-but-critical distinction concrete: JavaScript can read the OS-level motion preference via matchMedia but can never write to it, so any in-page "test reduced motion" toggle is necessarily a simulation, not a real preference override — a distinction that is easy to state but much clearer once you can watch both readouts side by side.' },
      { icon: 'CODE', title: 'Auditing a site\'s existing animations for prefers-reduced-motion coverage', desc: 'Copy the pattern of grouping all animation-neutralizing overrides under one ancestor selector (here .reduced-motion, in production @media (prefers-reduced-motion: reduce)) to audit a real codebase and quickly identify every animated component that still lacks a reduced-motion override, rather than searching for animation: and transition: declarations scattered across dozens of files.' },
      { icon: 'APP', title: 'Building a component library with motion-safe defaults', desc: 'Design system components like spinners, toasts, and drawer transitions should ship with a built-in @media (prefers-reduced-motion: reduce) fallback by default rather than leaving it to individual consumers to remember — reference this demo\'s three animation types (spin, slide, pulse) as a checklist of common component categories that need a reduced-motion variant.' },
      { icon: 'FORM', title: 'QA testing motion-sensitive flows before a compliance review', desc: 'QA engineers preparing for a WCAG 2.3.3 accessibility audit can use the live OS-level readout in this demo to confirm their own test environment\'s current setting, then separately use the simulation toggle to visually preview what a real user with reduced motion enabled would experience across a page\'s key animated elements before signing off.' },
      { icon: 'DESIGN', title: 'Designing a "reduce, don\'t always remove" motion strategy', desc: 'Use the pulsing badge element as a starting point for exploring the AAA-level best practice of substituting large or continuous animations with subtler opacity-based alternatives instead of animation: none outright, preserving state feedback for users while still respecting their motion sensitivity — swap the pulse keyframe for an opacity-only variant and compare.' },
      { icon: 'FLOW', title: 'Debugging why a "test mode" toggle doesn\'t match a user\'s real experience', desc: 'If a support ticket or bug report claims a reduced-motion toggle "isn\'t working," use this demo\'s separation of concerns as a debugging checklist: confirm the real OS-level matchMedia value first, independent of any in-page toggle state, since a common root cause is developers accidentally wiring a fake in-page control instead of a genuine @media (prefers-reduced-motion: reduce) block.' },
    ],
    faqs: [
      { q: 'Can JavaScript actually change my OS-level reduced motion setting?', a: 'No. window.matchMedia(\'(prefers-reduced-motion: reduce)\').matches is strictly read-only — it reports the user\'s current OS-level accessibility preference but provides no API to set or override it. That decision belongs entirely to the user\'s operating system settings, which is why this demo\'s in-page toggle is explicitly labeled as a simulation that only demonstrates the CSS effect a real media query would produce, without touching the actual setting.' },
      { q: 'Why does the demo need both a toggle AND a live OS readout?', a: 'The toggle lets you interactively preview what a reduced-motion experience would look like even if your own OS doesn\'t currently have the setting enabled, which is useful for development and testing. The separate, always-live OS readout keeps that simulation honest by continuously reporting ground truth via matchMedia, so you can never mistake the simulated state for your actual system preference.' },
      { q: 'What is the actual production CSS I should write, without the JS toggle?', a: 'Wrap your motion-reducing overrides in a real media query: @media (prefers-reduced-motion: reduce) { .spinner { animation: none; } .slide-card { animation: none; } } with no JavaScript required at all — the browser evaluates this automatically based on the OS setting, before your styles even paint, and re-evaluates live if the user changes the setting while the page is open.' },
      { q: 'Should I remove all animation, or just reduce it?', a: 'WCAG 2.3.3 (AAA) and general accessibility guidance favor reducing over eliminating: swap large-scale transform animations (sliding, zooming, parallax) for a much subtler opacity crossfade rather than removing all feedback, since users with vestibular disorders are specifically sensitive to large or fast movement, not to all visual change. This demo uses full animation: none for clarity, but production code often keeps a toned-down opacity-only transition instead.' },
      { q: 'Does the matchMedia listener update if I change my OS setting without reloading the page?', a: 'Yes — this demo attaches a change listener directly to the MediaQueryList object returned by window.matchMedia(), via motionQuery.addEventListener(\'change\', reportOsPreference), which fires immediately whenever the OS-level setting changes while the tab remains open, updating the readout live with no page reload or polling required.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the simulation toggle only adds a CSS class rather than actually changing your OS setting, and how that maps onto the real @media (prefers-reduced-motion: reduce) block a production site should use instead. You could also ask it to convert the demo's "full removal" approach on the pulsing badge into the AAA-recommended "reduce, don't eliminate" pattern using a subtler opacity-only keyframe. It's a good candidate for extension too: ask the assistant to add a fourth animated element like a parallax-scrolling background, or to add a code panel showing the equivalent production @media block generated live from the current simulation state. Treat the demo as a working reference to interrogate and adapt, not a finished black box.`,
      prompt: `Build an educational demo in plain HTML, CSS, and JavaScript explaining the prefers-reduced-motion CSS media feature, clearly separating a teaching simulation from real OS-level detection.

Requirements:
- A live, read-only readout at the top of the page reporting the user's actual operating-system-level motion preference, obtained via window.matchMedia('(prefers-reduced-motion: reduce)').matches, that updates automatically if the user changes their OS setting while the page stays open (using a change listener on the MediaQueryList, not polling).
- An in-page toggle switch clearly labeled as a simulation, explaining in visible text that JavaScript cannot alter the real OS setting, and that the toggle only demonstrates the visual effect a real @media (prefers-reduced-motion: reduce) block would apply automatically in production.
- At least three differently-animated elements representing common vestibular-trigger UI patterns: a continuously rotating loading spinner, a translating/sliding element, and a scaling or pulsing badge, each driven by a standard CSS @keyframes animation.
- Toggling the simulation must add or remove a single ancestor class that neutralizes all three animations at once via descendant selector overrides, mirroring how a real media query would scope its overrides, rather than toggling each element's animation individually in JavaScript.
- A status line reflecting whether the simulated mode is currently "full motion" or "reduced motion".
- Written, on-page explanation of the distinction between detecting and simulating this preference, and a note about why reducing motion (subtler alternatives) is sometimes preferable to fully removing it for accessibility best practice.`,
    },
  },
};

export default prefersReducedMotionToggleDemo;
