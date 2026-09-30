const floatingDock = {
  id: 'floating-dock',
  title: 'Floating Dock',
  lastmod: '2026-06-12',
  category: 'navigation',
  html: `<div class="desktop">
  <div class="desktop-hint">Hover over the dock icons — move slowly to feel the magnification</div>
  <div class="dock-wrap">
    <div class="dock" id="dock" role="toolbar" aria-label="Application dock">
      <div class="dock-item" data-label="Finder" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#60a5fa,#3b82f6)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
        </div>
        <span class="dock-label">Finder</span>
      </div>
      <div class="dock-item" data-label="Terminal" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#34d399,#059669)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="4 17 10 11 4 5"/><line x1="12" y1="19" x2="20" y2="19"/></svg>
        </div>
        <span class="dock-label">Terminal</span>
      </div>
      <div class="dock-item" data-label="Code" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#818cf8,#6366f1)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        </div>
        <span class="dock-label">Code</span>
      </div>
      <div class="dock-item" data-label="Browser" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#fb923c,#f97316)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        </div>
        <span class="dock-label">Browser</span>
      </div>
      <div class="dock-item" data-label="Music" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#f472b6,#ec4899)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
        </div>
        <span class="dock-label">Music</span>
      </div>
      <div class="dock-separator"></div>
      <div class="dock-item" data-label="Trash" tabindex="0">
        <div class="icon-bg" style="background:linear-gradient(135deg,#94a3b8,#64748b)">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/></svg>
        </div>
        <span class="dock-label">Trash</span>
      </div>
    </div>
  </div>
</div>`,
  css: `*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:linear-gradient(160deg,#0f172a 0%,#1e1b4b 50%,#0f172a 100%);min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:0;overflow:hidden}
.desktop{width:100%;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;min-height:100vh;padding:20px 0 0}
.desktop-hint{color:#475569;font-size:13px;text-align:center;padding-bottom:60px}
/* dock wrapper */
.dock-wrap{width:100%;display:flex;justify-content:center;padding-bottom:16px}
.dock{
  display:flex;align-items:flex-end;
  gap:8px;
  padding:10px 14px;
  background:rgba(255,255,255,.08);
  backdrop-filter:blur(20px);
  border:1px solid rgba(255,255,255,.12);
  border-radius:20px;
  box-shadow:0 8px 32px rgba(0,0,0,.5);
}
/* items */
.dock-item{
  display:flex;flex-direction:column;align-items:center;gap:5px;
  cursor:pointer;position:relative;
  --scale:1;
  --ty:0px;
}
.icon-bg{
  width:52px;height:52px;border-radius:14px;
  display:flex;align-items:center;justify-content:center;
  transform:scale(var(--scale)) translateY(var(--ty));
  transition:transform .18s cubic-bezier(.34,1.56,.64,1),box-shadow .18s ease;
  box-shadow:0 4px 12px rgba(0,0,0,.3);
  will-change:transform;
}
.dock-item:hover .icon-bg,
.dock-item:focus .icon-bg{
  box-shadow:0 8px 24px rgba(0,0,0,.5);
}
/* label */
.dock-label{
  position:absolute;
  bottom:calc(100% + 8px);
  left:50%;transform:translateX(-50%);
  background:rgba(0,0,0,.7);
  color:#fff;font-size:12px;font-weight:500;
  padding:4px 10px;border-radius:6px;
  white-space:nowrap;
  opacity:0;pointer-events:none;
  transition:opacity .15s;
}
.dock-item:hover .dock-label,
.dock-item:focus .dock-label{opacity:1}
/* separator */
.dock-separator{width:1px;height:52px;background:rgba(255,255,255,.15);margin:0 4px;align-self:center}`,
  js: `const dock = document.getElementById('dock');
const items = [...dock.querySelectorAll('.dock-item')];

// Magnification parameters
const MAX_SCALE = 1.8;   // max icon scale at cursor
const SPREAD = 120;      // px — distance at which influence falls to zero
const LIFT = -12;        // px — how much the icon lifts (negative = up)

function getCenter(el) {
  const r = el.getBoundingClientRect();
  return r.left + r.width / 2;
}

function magnify(mouseX) {
  items.forEach(item => {
    const icon = item.querySelector('.icon-bg');
    const center = getCenter(icon);
    const dist = Math.abs(mouseX - center);
    if (dist < SPREAD) {
      // Gaussian-ish falloff: 1 at dist=0, 0 at dist=SPREAD
      const t = 1 - dist / SPREAD;
      const scale = 1 + (MAX_SCALE - 1) * t * t;
      const ty = LIFT * t * t;
      item.style.setProperty('--scale', scale);
      item.style.setProperty('--ty', ty + 'px');
    } else {
      item.style.setProperty('--scale', 1);
      item.style.setProperty('--ty', '0px');
    }
  });
}

function reset() {
  items.forEach(item => {
    item.style.setProperty('--scale', 1);
    item.style.setProperty('--ty', '0px');
  });
}

dock.addEventListener('mousemove', e => magnify(e.clientX));
dock.addEventListener('mouseleave', reset);

// Click bounce
items.forEach(item => {
  item.addEventListener('click', () => {
    const icon = item.querySelector('.icon-bg');
    icon.animate([
      { transform: 'scale(var(--scale)) translateY(var(--ty))' },
      { transform: 'scale(calc(var(--scale) * 1.15)) translateY(calc(var(--ty) - 8px))' },
      { transform: 'scale(var(--scale)) translateY(var(--ty))' },
    ], { duration: 300, easing: 'cubic-bezier(.34,1.56,.64,1)' });
  });
  // keyboard
  item.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});`,
  seo: {
    title: 'Floating Dock — Free HTML CSS JS macOS Dock Snippet',
    description: `macOS-style icon magnification dock using Gaussian proximity math, CSS custom properties, and click bounce. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Floating Dock — macOS Magnification Effect, Gaussian Proximity Scale & CSS Custom Property Animation`,
      description: `The macOS Dock's icon magnification is one of the most studied interaction effects in UI design — smooth, responsive, and physically intuitive. This snippet reproduces it in pure HTML, CSS, and JavaScript: a glassmorphism toolbar with coloured icon tiles that scale up toward the cursor using a Gaussian proximity formula, lift off the shelf, and bounce on click — with CSS custom properties driving every transform frame.

The macOS Dock icon magnification effect is one of the most recognisable and studied animations in software UI. It demonstrates a core principle: interactions should feel physical, as though the cursor is pushing objects rather than toggling states. This snippet reproduces the full effect — proximity-based magnification, smooth falloff, vertical lift, click bounce, label tooltip, glassmorphism container, and separator line — in pure HTML, CSS, and vanilla JavaScript with zero dependencies.

**The magnification math: Gaussian proximity formula**

The core of the effect is a distance-based scale calculation. When the cursor is at pixel X, for each dock icon the code computes \`dist = Math.abs(mouseX - iconCenter)\`. It then computes \`t = 1 - dist / SPREAD\` — a linear falloff where \`t = 1\` at the cursor and \`t = 0\` at distance = SPREAD (120px by default). The scale is computed as \`1 + (MAX_SCALE - 1) * t * t\` — squaring \`t\` makes the falloff nonlinear (Gaussian-like), so nearby icons grow large quickly while distant icons barely move. The vertical lift is \`LIFT * t * t\` — a negative value (−12px) that moves icons upward proportionally to their scale. Both are written to CSS custom properties (\`--scale\` and \`--ty\`) on each item element so the CSS \`transform\` expression reads them: \`transform: scale(var(--scale)) translateY(var(--ty))\`.

**CSS custom properties as per-element animation state**

Writing magnification data to CSS custom properties on individual elements (rather than inline transforms) has an important advantage: the CSS \`transition\` declaration on \`.icon-bg\` animates between the old and new custom property values automatically. When the cursor moves and \`--scale\` updates, the transition interpolates from the previous scale to the new one — giving the spring-ease feel without any JavaScript animation loop. The transition uses \`cubic-bezier(.34,1.56,.64,1)\`, the same spring-overshoot easing used throughout the snippet collection, which gives the icons a slight bounce when they reach their peak.

**The click bounce using Web Animations API**

Clicking an icon triggers a programmatic keyframe animation using the Web Animations API (\`element.animate()\`). The three keyframes scale the icon up 15% and lift it an extra 8px before returning to the base value. The easing is the same spring cubic-bezier. Using \`element.animate()\` for the click bounce is preferable to adding/removing a CSS class because: it doesn't require a \`transitionend\` or \`animationend\` cleanup listener, it composes with the existing CSS transition without conflict, and it fires once and cleans itself up.

**Glassmorphism container**

The dock container uses \`background: rgba(255,255,255,0.08)\`, \`backdrop-filter: blur(20px)\`, and a 1px \`border: rgba(255,255,255,0.12)\` — the standard glassmorphism recipe. Icons are coloured \`<div>\` tiles with \`border-radius: 14px\` and individual \`linear-gradient\` backgrounds, matching the macOS icon aesthetic.

**Customising the dock**

Change \`MAX_SCALE\` (default 1.8) and \`SPREAD\` (default 120px) to tune magnification intensity and spread. Increase MAX_SCALE to 2.2 for a more dramatic effect. Change the icon SVGs and gradient colours to match your app. Add or remove \`.dock-item\` divs — the layout is \`display:flex; align-items:flex-end\` so all icons naturally bottom-align and taller magnified icons push upward rather than downward. Pair with a [hamburger nav](/ui-snippets/hamburger-nav/) for a full navigation system.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Load the snippet',
        text: `Paste the HTML, CSS, and JS into your page. A glassmorphism dock bar appears at the bottom with five colour-coded app icons and a trash icon after a separator.`,
      },
      {
        title: 'Move the cursor slowly over the dock',
        text: `Icons near the cursor magnify smoothly up to 1.8× their size and lift slightly off the shelf. Icons further away scale proportionally less — the falloff is Gaussian, not linear.`,
      },
      {
        title: 'Move across the full dock',
        text: `As the cursor moves, the magnification wave follows — each icon grows and shrinks based on its real-time distance from the cursor, just like the macOS Dock.`,
      },
      {
        title: 'Click any icon',
        text: `The clicked icon bounces up 8px and scales to 115% before springing back to its current magnified size, providing satisfying click feedback.`,
      },
      {
        title: 'Hover to see the label',
        text: `A small tooltip label appears above each icon on hover — "Finder", "Terminal", etc. It fades in with a CSS opacity transition.`,
      },
      {
        title: 'Customise icons and colours',
        text: `Swap each \`.icon-bg\` gradient and SVG to match your app's icons. Adjust \`MAX_SCALE\` and \`SPREAD\` in the JS to tune the magnification intensity and reach.`,
      },
    ] },
    features: [
      {
        title: 'Gaussian proximity magnification',
        text: `Scale uses \`1 + (MAX_SCALE - 1) * t²\` where \`t = 1 - dist/SPREAD\` — a quadratic falloff that mirrors the physical feel of the macOS Dock precisely.`,
      },
      {
        title: 'CSS custom property animation',
        text: `\`--scale\` and \`--ty\` are set per-icon via JS and consumed by the CSS \`transform\`. The CSS \`transition\` interpolates between values, eliminating the need for a JS animation loop.`,
      },
      {
        title: 'Click bounce via Web Animations API',
        text: `\`element.animate()\` fires a 3-keyframe bounce on click — scale up 15%, lift 8px, return — without requiring class toggles or event listener cleanup.`,
      },
      {
        title: 'Glassmorphism container',
        text: `\`backdrop-filter: blur(20px)\` + \`rgba\` background + subtle white border creates the frosted-glass dock shelf, matching the macOS aesthetic.`,
      },
      {
        title: 'Hover label tooltip',
        text: `Each icon shows a label tooltip above it on hover — CSS opacity transition, no JS required. Works with keyboard focus too.`,
      },
      {
        title: 'Vertical lift effect',
        text: `Magnified icons translate upward (\`translateY\` negative), so the bottom edges stay aligned to the dock shelf while the tops extend upward — exactly like macOS.`,
      },
      {
        title: 'Keyboard accessible',
        text: `Each dock item has \`tabindex="0"\` and a \`keydown\` handler for Enter/Space — the bounce fires on keyboard activation too.`,
      },
      {
        title: 'Tunable parameters',
        text: `\`MAX_SCALE\` (default 1.8) and \`SPREAD\` (default 120px) are top-of-file constants — one line to change the effect intensity or reach.`,
      },
    ],
    useCases: [
      {
        title: 'Application launcher bars',
        text: `Provide a floating toolbar at the bottom of a web app with quick-launch icons for core sections, matching desktop OS conventions for muscle memory.`,
      },
      {
        title: 'Portfolio site navigation',
        text: `Replace a traditional navbar with a floating dock for a distinctive layout. Each icon links to a portfolio section — About, Projects, Blog, Contact.`,
      },
      {
        title: 'Tool palette in editors',
        text: `Creative tools (image editors, diagramming apps, code playgrounds) can use a dock for formatting tools, with the magnification making dense icon bars easier to target.`,
      },
      {
        title: 'Interactive demos and showcases',
        text: `Use the dock as a visual centerpiece on a landing page to demonstrate app features. Each icon reveals a feature panel when clicked.`,
      },
      {
        title: 'Tab bar on tablet layouts',
        text: `On tablet-sized viewports, a floating dock replaces a sidebar nav — familiar to iPad users and more space-efficient than a full sidebar. For phone layouts a fixed [bottom nav](/ui-snippets/bottom-nav/) is the more conventional pattern.`,
      },
      {
        title: 'Shortcut bars in SaaS dashboards',
        text: `Provide a persistent floating action bar for frequently used operations. Pair with a [command palette](/ui-snippets/command-palette/) for keyboard power users.`,
      },
      { icon: 'CODE', title: 'Related: Keyboard-Navigable Icon Rail', desc: 'See the [Keyboard-Navigable Icon Rail](/ui-snippets/keyboard-nav-rail/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'How do I change the magnification strength?',
        a: `Increase \`MAX_SCALE\` at the top of the JS (default 1.8). Try 2.2 for a more dramatic macOS-like effect or 1.4 for a subtle zoom. Increase \`SPREAD\` (default 120px) to make the magnification wave wider — more icons are affected as the cursor approaches.`,
      },
      {
        q: 'How do I add more icons?',
        a: `Duplicate a \`.dock-item\` div in the HTML. Set the \`data-label\` attribute for the tooltip text, change the \`background\` gradient on \`.icon-bg\`, and swap the SVG icon. The JS reads all \`.dock-item\` elements automatically.`,
      },
      {
        q: 'Why does the dock use CSS custom properties instead of inline transforms?',
        a: `Setting an inline \`style.transform\` directly would conflict with the CSS \`transition\` declaration — the browser would skip the transition because the old value is the same inline style that was just overwritten. Writing to CSS custom properties (\`--scale\`, \`--ty\`) consumed by the CSS \`transform\` expression lets the transition engine compare the old and new custom property values and interpolate between them.`,
      },
      {
        q: 'Can I use this floating dock in React, Vue, or Angular?',
        a: `Yes. Use the JSX, Vue, Angular, or Tailwind export buttons on this page. In React, attach the \`mousemove\` and \`mouseleave\` handlers to the dock container via a \`ref\` in \`useEffect\` with cleanup. Keep the per-icon \`--scale\` values in a \`useRef\` (not \`useState\`) to avoid re-renders on every mouse move — write directly to the DOM element's CSS custom properties for smooth 60fps updates. In Vue, use a template ref and \`onMounted\`; in Angular, use \`@ViewChild\` and \`ngAfterViewInit\`.`,
      },
      {
        q: 'How do I make the dock appear on hover from a hidden state?',
        a: `Set \`opacity: 0; transform: translateY(100%)\` on \`.dock-wrap\` by default, then add a \`:hover\` or a class that sets \`opacity: 1; transform: translateY(0)\`. Trigger the class on \`body:hover\` or bind it to a bottom-of-screen IntersectionObserver trigger.`,
      },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the falloff math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the scale formula squares t instead of using it linearly, and why writing to CSS custom properties (rather than setting inline transform directly) is what lets the existing CSS transition animate the magnification smoothly. The same assistant can help optimize it — ask whether recalculating every icon's bounding rect on every single mousemove event is worth caching, or whether the mousemove handler should be throttled with requestAnimationFrame for very large docks. It's also a good way to extend the effect: have it add a 2D (vertical plus horizontal) proximity falloff instead of horizontal-only, a right-click context menu per icon, or a "running app" indicator dot beneath active icons. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a macOS-style floating dock with proximity-based icon magnification, in plain HTML, CSS, and JavaScript using CSS custom properties for the animated state — no libraries.

Requirements:
- A horizontal glassmorphism bar (translucent background, backdrop-filter blur, subtle border) fixed near the bottom of the viewport, containing several icon tiles and at least one vertical separator.
- Each icon tile must expose two CSS custom properties, a scale and a vertical translate, consumed by its transform, with a CSS transition on transform so changes to those custom properties animate automatically without any JavaScript animation loop.
- On mousemove over the dock, compute for every icon the horizontal distance between the cursor and that icon's center. If the distance is under a configurable spread radius, calculate a falloff value that is 1 at zero distance and 0 at the spread radius, square it for a nonlinear (fast near, gentle far) curve, then derive the icon's scale (up to a configurable maximum) and vertical lift from that squared falloff. Icons outside the radius must reset to scale 1 and zero lift. On mouseleave from the dock, reset every icon to its resting state.
- Because icons are bottom-aligned in a flex row, magnified icons must grow and lift upward without shifting the row's bottom alignment.
- On click, use the Web Animations API (element.animate with keyframes), not a CSS class toggle, to play a brief bounce — scale up further and lift further, then return to the icon's current magnified transform — so the bounce composes cleanly with the existing hover-driven transform instead of conflicting with it.
- Each icon must show a small tooltip label above it on hover/focus via a CSS opacity transition, and be keyboard-operable: focusable, with Enter or Space triggering the same click bounce as a mouse click.`,
    },
  },
};

export default floatingDock;
