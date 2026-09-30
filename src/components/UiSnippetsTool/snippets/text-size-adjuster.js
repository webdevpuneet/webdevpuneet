const textSizeAdjuster = {
  id: 'text-size-adjuster',
  title: 'Text Size Adjuster (A- / A+ Control)',
  lastmod: '2026-08-08',
  category: 'forms',
  html: `<div class="reader-shell">
  <div class="size-control" role="group" aria-label="Adjust text size">
    <span class="control-label">Text size</span>
    <button class="size-btn" id="btn-decrease" aria-label="Decrease text size">A−</button>
    <span class="size-readout" id="size-readout" aria-live="polite">100%</span>
    <button class="size-btn" id="btn-increase" aria-label="Increase text size">A+</button>
    <button class="size-reset" id="btn-reset">Reset</button>
  </div>

  <article class="sample-article" id="sample-article">
    <h1>Why Reading Comfort Matters</h1>
    <p class="byline">By the Design Team · 6 min read</p>
    <p>Font size is one of the most personal preferences on the web. What feels comfortable on a large monitor can feel cramped on a phone, and what feels fine at twenty-five can feel small at fifty-five. A single fixed font size can never serve everyone equally well.</p>
    <p>This control lets a reader scale body text up or down in five clear steps, independent of the browser's own zoom level. Their choice is remembered the next time they return, so comfort settings persist across visits without ever touching browser settings.</p>
    <p>Try the A− and A+ buttons above. The whole article scales smoothly, while the layout, images, and surrounding chrome stay exactly where they are.</p>
  </article>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

:root { --user-font-scale: 1; }

.reader-shell { max-width: 640px; margin: 0 auto; padding: 32px 24px 60px; }

/* — Size control — */
.size-control {
  display: flex; align-items: center; gap: 10px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 10px 14px; margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  flex-wrap: wrap;
}
.control-label { font-size: 12.5px; font-weight: 700; color: #64748b; margin-right: 4px; }
.size-btn {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1.5px solid #e2e8f0; background: #fff; color: #1e293b;
  font-family: inherit; font-size: 14px; font-weight: 700; cursor: pointer;
  transition: all 0.15s;
}
.size-btn:hover:not(:disabled) { border-color: #6366f1; color: #6366f1; background: #eef2ff; }
.size-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.size-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

.size-readout {
  min-width: 48px; text-align: center;
  font-size: 13px; font-weight: 700; color: #6366f1;
  background: #eef2ff; border-radius: 20px; padding: 4px 10px;
}

.size-reset {
  margin-left: auto;
  border: none; background: transparent; color: #94a3b8;
  font-family: inherit; font-size: 12px; font-weight: 600;
  text-decoration: underline; cursor: pointer; padding: 6px 4px;
}
.size-reset:hover { color: #6366f1; }

/* — Sample article, scaled via CSS custom property — */
/* Each text size is a rem value multiplied by --user-font-scale via calc(),
   so the whole reading experience scales together while layout widths,
   images, and other non-text chrome remain unaffected. */
.sample-article {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 32px 36px;
}
.sample-article h1 {
  font-size: calc(1.75rem * var(--user-font-scale));
  color: #0f172a; margin-bottom: 8px; line-height: 1.25;
  transition: font-size 0.2s ease;
}
.byline { font-size: calc(0.8rem * var(--user-font-scale)); color: #94a3b8; margin-bottom: 20px; transition: font-size 0.2s ease; }
.sample-article p {
  font-size: calc(1rem * var(--user-font-scale));
  line-height: 1.75; color: #334155; margin-bottom: 16px;
  transition: font-size 0.2s ease;
}`,

  js: `const STORAGE_KEY = 'text-size-scale';

// Five discrete steps from 87.5% to 150%, matching common accessible
// reading-mode implementations (a step below 100% for dense layouts, and
// several steps above for low-vision or simply more comfortable reading).
const STEPS = [0.875, 1, 1.125, 1.25, 1.375, 1.5];
let stepIndex = 1; // default: 100%

const readout = document.getElementById('size-readout');
const btnDecrease = document.getElementById('btn-decrease');
const btnIncrease = document.getElementById('btn-increase');
const btnReset = document.getElementById('btn-reset');
const root = document.documentElement;

function applyScale() {
  const scale = STEPS[stepIndex];
  // Setting a single custom property drives every calc()-based font-size
  // in the CSS at once, keeping all text elements in proportion.
  root.style.setProperty('--user-font-scale', scale);
  readout.textContent = Math.round(scale * 100) + '%';
  btnDecrease.disabled = stepIndex === 0;
  btnIncrease.disabled = stepIndex === STEPS.length - 1;
  localStorage.setItem(STORAGE_KEY, String(stepIndex));
}

function loadScale() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved !== null) {
    const idx = parseInt(saved, 10);
    if (!Number.isNaN(idx) && idx >= 0 && idx < STEPS.length) {
      stepIndex = idx;
    }
  }
  applyScale();
}

btnDecrease.addEventListener('click', () => {
  if (stepIndex > 0) {
    stepIndex -= 1;
    applyScale();
  }
});

btnIncrease.addEventListener('click', () => {
  if (stepIndex < STEPS.length - 1) {
    stepIndex += 1;
    applyScale();
  }
});

btnReset.addEventListener('click', () => {
  stepIndex = 1;
  applyScale();
});

loadScale();`,

  seo: {
    title: 'Text Size Adjuster (A− / A+ Control) — HTML CSS JS Snippet',
    description: 'A−/A+ text scaler using a CSS custom property and calc(), with 5 clamped steps saved to localStorage across visits. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Text Size Adjuster — CSS Custom Property Font Scaling with A−/A+ Controls and localStorage Persistence',
      description: `Browsers already give every user a way to zoom a page in and out, so it is fair to ask why a site would build its own font-size control at all. The answer is that browser zoom and an in-page text size adjuster solve different problems. Browser zoom scales the entire viewport — layout chrome, images, buttons, and text all together — and it resets or behaves inconsistently across sessions, devices, and embedded contexts like iframes or in-app browsers where users often cannot reach the browser's zoom controls at all. A dedicated text size adjuster scales only the reading content, remembers the user's preference per site rather than per browser session, and works identically whether the page is opened standalone or embedded inside another app's webview.

**How the scaling actually works: a CSS custom property multiplied through calc()**

Every scalable font size in this snippet is expressed as a fixed \`rem\` value multiplied by a single CSS custom property: \`font-size: calc(1rem * var(--user-font-scale))\`. The custom property is declared once on \`:root\` with a default of \`1\` (100%), and every heading, byline, and paragraph in the sample article references it through its own \`calc()\` expression. This means resizing text is a single JavaScript operation — \`root.style.setProperty('--user-font-scale', scale)\` — that cascades instantly to every element referencing the variable, rather than requiring the script to walk the DOM and rewrite dozens of individual \`font-size\` declarations. A \`transition: font-size 0.2s ease\` on each scalable element makes the change animate smoothly rather than snapping instantly, which reduces the jarring effect of a sudden layout shift.

**Five clamped steps, not a free-form range**

Rather than a continuous slider that could produce awkward in-between values, the control offers five fixed steps — 87.5%, 100%, 112.5%, 125%, 137.5%, and 150% — stored as an array and referenced by index. This mirrors how most production-grade accessible text scalers work: continuous scaling invites line-height and spacing to fall out of visual rhythm at odd percentages, while discrete steps can each be verified to look correct at design time. The A− and A+ buttons decrement and increment the step index, and both buttons disable themselves automatically (\`btnDecrease.disabled = stepIndex === 0\`) at the extremes so users get clear, unambiguous feedback that they have reached the minimum or maximum size rather than clicking into a dead zone.

**Why persistence to localStorage matters more than it seems**

Without persistence, a user who prefers larger text has to re-apply their preference on every single page load, which is a real and recurring cognitive tax for anyone with low vision, presbyopia, or simply a preference for a more comfortable reading size. This snippet writes the current step index to \`localStorage\` under the key \`text-size-scale\` on every change and reads it back on load via \`loadScale()\`, so the very first paint after a return visit already reflects the saved preference — no flash of default-size text that then jumps to the preferred size. Because the value is a small integer index rather than a raw pixel value, it stays valid even if the step array is later extended, and it is trivial to migrate or reset by clearing a single localStorage key.

**Why this matters for 2026 accessibility-first design**

Calm, accessibility-first design in 2026 treats reading comfort as a per-user, per-site setting rather than a one-size-fits-all default baked into the design system. A text size adjuster gives readers direct, visible control over one of the most consequential variables in reading comfort without requiring them to dig into browser or OS accessibility settings most people never discover. Building it on a single CSS custom property keeps the implementation both trivially simple to maintain and instantly extensible — adding a sixth step, changing the default, or wiring the same variable into a mobile app's WebView all require touching only the \`STEPS\` array and the property name, not dozens of scattered font-size rules.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Increase or decrease the text size',
          text: 'Click A+ to step up through 112.5%, 125%, 137.5%, and 150%, or A− to step down to 87.5%. The sample article\'s heading, byline, and paragraphs all scale together smoothly, and the percentage readout in the pill between the buttons updates immediately.',
        },
        {
          title: 'Notice the buttons disable at the limits',
          text: 'At 150% the A+ button becomes disabled and greyed out; at 87.5% the A− button does the same. This is driven by btnIncrease.disabled = stepIndex === STEPS.length - 1 in the JS panel, giving clear feedback instead of letting users click into a size that does not exist.',
        },
        {
          title: 'Reload the preview to confirm persistence',
          text: 'Pick a non-default size, then reload the demo (or revisit the page). loadScale() reads the saved step index from localStorage under the key text-size-scale and calls applyScale() immediately, so the article renders at your chosen size on the very first paint.',
        },
        {
          title: 'Inspect the CSS custom property in DevTools',
          text: 'Open DevTools and watch the --user-font-scale value on the <html> element change as you click A+/A−. Every calc(1rem * var(--user-font-scale)) rule in the CSS panel recalculates automatically the instant the property updates — no JavaScript has to touch individual elements.',
        },
        {
          title: 'Adjust the step values or add more steps',
          text: 'Edit the STEPS array in the JS panel — for example, add 1.625 for a 162.5% step, or change the minimum from 0.875 to 0.75 for a denser option. Each value is a raw multiplier applied through the CSS custom property, so no other code needs to change.',
        },
        {
          title: 'Export and scope it to a specific content area',
          text: 'Click HTML or JSX to export. In your app, set the --user-font-scale property on a wrapper around your article or reading content specifically (rather than the whole <html>) if you want navigation, buttons, and other UI chrome to stay a fixed size while only prose scales.',
        },
      ],
    },
    features: [
      'CSS custom property --user-font-scale drives every scalable font-size via calc(1rem * var(--user-font-scale))',
      'Five clamped discrete steps (87.5% to 150%) avoid awkward in-between sizes from a free-form slider',
      'A− and A+ buttons auto-disable at the minimum and maximum steps for clear, unambiguous feedback',
      'Live percentage readout with aria-live="polite" announces size changes to screen reader users',
      'localStorage persistence under text-size-scale survives reloads and return visits',
      'Single setProperty() call cascades to every element referencing the variable, no DOM walking required',
      'Smooth transition: font-size 0.2s ease animates each size change instead of snapping instantly',
      'Reset button returns to the 100% default step in one click',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'News, blog, and long-form content sites',
        desc: 'Publishers with substantial body text benefit enormously from letting readers set their own comfortable size once and have it remembered — this is the single highest-leverage accessibility feature a content site can add short of full screen-reader support. Place the control in the article header, right above the byline, exactly as shown in this demo.',
      },
      {
        icon: 'FORM',
        title: 'Independent of and complementary to browser zoom',
        desc: 'Browser zoom scales the entire page including navigation and layout chrome, and its setting is tied to the browser rather than the site, so it does not travel with a user across devices or persist reliably in embedded contexts. This control scales only the designated reading content, persists per-site via localStorage, and remains available even inside webviews or apps where users cannot access native zoom controls at all.',
      },
      {
        icon: 'APP',
        title: 'Embedded reading contexts: newsletters, help centers, in-app articles',
        desc: 'Help center articles, in-app documentation, and newsletter web-views often render inside constrained webviews without accessible browser chrome. A self-contained A−/A+ control that lives inside the content itself gives users a way to adjust readability that does not depend on the surrounding shell exposing any zoom functionality, similar to the persistence approach used in the [Reading Mode Toggle](/ui-snippets/reading-mode-toggle) snippet.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems needing a reusable typography scale token',
        desc: 'Because every scalable size flows through one custom property, design teams can expose --user-font-scale as a first-class token in their system, letting any component opt into user-controlled scaling simply by writing its font-size as a calc() expression referencing the variable, without each component needing its own resize logic.',
      },
      {
        icon: 'FLOW',
        title: 'Low-vision and presbyopia-friendly reading experiences',
        desc: 'Users with low vision or age-related presbyopia frequently prefer larger text but do not want to zoom an entire interface, which can break responsive layouts or push navigation off-screen awkwardly. Scaling only the prose content through calc() keeps surrounding layout structure intact while giving these users meaningfully larger, more comfortable type.',
      },
      {
        icon: 'CODE',
        title: 'Teaching CSS custom properties as a single source of truth',
        desc: 'This snippet is a clean, minimal example of using one CSS custom property as the single source of truth for a cross-cutting visual concern, updated from JavaScript with setProperty() and consumed everywhere through calc() — a pattern equally useful for theming, spacing scales, or any other value that many elements need to stay in sync on.',
      },
    ],
    faqs: [
      {
        q: 'Why build a custom text size control instead of relying on browser zoom?',
        a: 'Browser zoom scales the whole page uniformly — navigation, buttons, and images included — which can break carefully tuned layouts at extreme zoom levels, and its setting typically resets per session or per device rather than persisting per site. A dedicated control scales only the content you choose, remembers the preference in localStorage specifically for your site, and keeps working inside embedded webviews (in-app browsers, newsletter clients) where users often cannot access native browser zoom at all.',
      },
      {
        q: 'Why use a CSS custom property instead of directly setting font-size on each element with JavaScript?',
        a: 'A single custom property lets the CSS cascade do the work: every rule written as calc(1rem * var(--user-font-scale)) recalculates automatically the moment the property changes on a shared ancestor, so one setProperty() call updates the heading, byline, and every paragraph simultaneously. Setting font-size directly on each element in JavaScript would require walking the DOM, tracking every scalable node, and re-running that logic on every size change — more code, more places to introduce bugs, and no automatic cascade to newly added elements.',
      },
      {
        q: 'Why only five steps instead of a continuous slider?',
        a: 'Discrete steps let you design-verify each resulting size looks correct — line-height, letter-spacing, and vertical rhythm can all be checked at 87.5%, 100%, 112.5%, 125%, 137.5%, and 150% specifically. A continuous slider can land on awkward in-between percentages that were never visually reviewed and may look slightly off, and discrete buttons are also easier to operate precisely via keyboard or switch-access devices than dragging a slider thumb.',
      },
      {
        q: 'Will this affect the rest of my page layout, like navigation and buttons?',
        a: 'No, by design — the --user-font-scale property in this snippet is only referenced by the sample article\'s heading, byline, and paragraph font-size rules. Non-text chrome such as buttons, the size-control bar itself, and layout containers use fixed sizes, so scaling reading text up or down does not reflow or resize the surrounding interface. In your own app, scope the property to a wrapper around your reading content specifically to preserve the same isolation.',
      },
      {
        q: 'How do I make the saved preference apply before the page paints, to avoid a flash of default size?',
        a: 'This demo calls loadScale() at the bottom of the JS panel, which runs as soon as the script executes and sets the CSS custom property before the user perceives the page. For a production site with server-rendered HTML, you can go further by inlining a small blocking script in the document head that reads localStorage and sets the custom property on the root element before the main stylesheet paints, exactly the same technique used to avoid flash-of-wrong-theme in dark mode implementations.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how a single --user-font-scale custom property cascades through every calc() expression in the CSS to keep the heading, byline, and paragraphs scaling in sync from one setProperty() call. It's also a good exercise to ask the assistant to extend the pattern — for example, adding a "remember per-device" fallback using matchMedia('(prefers-reduced-motion)') to skip the transition for users who want instant size changes, or wiring the same custom property into a second content block so two independent reading areas can share one control. You could also ask it to compare this approach against relying purely on rem units and browser zoom, and to explain concretely when each is the better tool for a given product surface.`,
      prompt: `Build an A−/A+ text size control in plain HTML, CSS, and JavaScript that scales a block of sample article content independently of the browser's own zoom.

Requirements:
- Express every scalable font-size in the sample content as a fixed rem value multiplied through calc() by a single CSS custom property (for example --user-font-scale), declared once with a default value of 1 on a shared ancestor.
- Provide exactly five discrete steps (for example 87.5%, 100%, 112.5%, 125%, 137.5%, 150%) referenced by an array and an index, rather than a continuous range input, and update the custom property with a single JavaScript call whenever the step changes.
- An A− button decrements the step and an A+ button increments it; both must automatically disable themselves when the step index reaches the minimum or maximum so users get clear feedback instead of a dead click.
- Display the current size as a readable percentage next to the buttons, and mark it aria-live="polite" so screen reader users hear the new value announced after each change.
- Persist the chosen step index to localStorage on every change, and read it back on page load before the first paint completes so returning users see their preferred size immediately rather than a flash of the default size.
- Animate font-size changes with a short CSS transition so resizing feels smooth rather than an instant jump-cut.
- Include a reset control that returns the size to the default 100% step in one action.`,
    },
  },
};

export default textSizeAdjuster;
