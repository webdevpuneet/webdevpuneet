const liquidGlassNavbar = {
  id: 'liquid-glass-navbar',
  title: 'Liquid Glass Navbar',
  lastmod: '2026-08-08',
  category: 'navigation',
  html: `<div class="lg-stage">
  <nav class="lg-navbar" id="lg-navbar">
    <div class="lg-sheen" id="lg-sheen"></div>
    <div class="lg-pill" id="lg-pill"></div>
    <button class="lg-item active" data-idx="0" type="button">Home</button>
    <button class="lg-item" data-idx="1" type="button">Explore</button>
    <button class="lg-item" data-idx="2" type="button">Create</button>
    <button class="lg-item" data-idx="3" type="button">Profile</button>
  </nav>
  <p class="lg-hint">Click a tab — the pill morphs to fit, it doesn\'t just fade</p>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: system-ui, -apple-system, sans-serif; background: linear-gradient(135deg, #a5b4fc 0%, #818cf8 35%, #c4b5fd 70%, #93c5fd 100%); padding: 40px; }

.lg-stage { display: flex; flex-direction: column; align-items: center; gap: 16px; }

.lg-navbar {
  position: relative;
  display: inline-flex;
  gap: 4px;
  padding: 6px;
  border-radius: 999px;
  background: rgba(255,255,255,0.22);
  backdrop-filter: blur(20px) saturate(160%);
  -webkit-backdrop-filter: blur(20px) saturate(160%);
  border: 1px solid rgba(255,255,255,0.45);
  box-shadow: 0 8px 32px rgba(31,38,135,0.18), inset 0 1px 1px rgba(255,255,255,0.6);
  overflow: hidden;
}

.lg-sheen {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(220px circle at 50% 0%, rgba(255,255,255,0.55), transparent 60%);
  opacity: 0.8;
  transition: opacity 0.3s;
  z-index: 1;
}

.lg-pill {
  position: absolute;
  top: 6px;
  left: 6px;
  height: calc(100% - 12px);
  width: 60px;
  border-radius: 999px;
  background: rgba(255,255,255,0.75);
  box-shadow: 0 4px 14px rgba(31,38,135,0.22), inset 0 1px 1px rgba(255,255,255,0.9);
  z-index: 0;
}

.lg-item {
  position: relative;
  z-index: 2;
  border: none;
  background: transparent;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: rgba(30,27,75,0.75);
  cursor: pointer;
  border-radius: 999px;
  transition: color 0.25s;
  white-space: nowrap;
}

.lg-item.active { color: #312e81; }
.lg-item:hover:not(.active) { color: #1e1b4b; }

.lg-hint { font-size: 12.5px; color: rgba(30,27,75,0.75); background: rgba(255,255,255,0.35); backdrop-filter: blur(8px); padding: 6px 14px; border-radius: 999px; }`,
  js: `const navbar = document.getElementById('lg-navbar');
const pill = document.getElementById('lg-pill');
const sheen = document.getElementById('lg-sheen');
const items = Array.from(document.querySelectorAll('.lg-item'));

let activeIdx = 0;

// ---- FLIP: First, Last, Invert, Play ----
// The pill is a single absolutely-positioned element reused across clicks.
// Animating its left/width directly with a CSS transition works, but this
// snippet demonstrates the FLIP technique because it generalizes to far more
// complex layout changes (grid reflows, list reorders) where you cannot just
// transition a couple of properties.
function movePillTo(el) {
  // FIRST: record the pill's current on-screen position/size.
  const first = pill.getBoundingClientRect();

  // Instantly (no transition) reposition the pill under the new target using
  // real layout values, matching the target button's box exactly.
  const navRect = navbar.getBoundingClientRect();
  const targetRect = el.getBoundingClientRect();
  pill.style.transition = 'none';
  pill.style.left = (targetRect.left - navRect.left) + 'px';
  pill.style.width = targetRect.width + 'px';

  // LAST: record the position/size after the instant jump.
  const last = pill.getBoundingClientRect();

  // INVERT: compute the delta between first and last, then apply it as a
  // transform so the pill *appears* not to have moved at all yet.
  const deltaX = first.left - last.left;
  const scaleX = first.width / last.width;

  pill.style.transformOrigin = 'left center';
  pill.style.transform = 'translateX(' + deltaX + 'px) scaleX(' + scaleX + ')';

  // Force a reflow so the browser registers the inverted transform before we
  // remove it - otherwise the two style writes get batched and no
  // transition plays.
  pill.getBoundingClientRect();

  // PLAY: transition back to the identity transform. Because width itself
  // never animates (only the transform does), this is compositor-friendly
  // and stays smooth even on low-powered devices.
  pill.style.transition = 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)';
  pill.style.transform = 'translateX(0) scaleX(1)';
}

function selectTab(idx) {
  if (idx === activeIdx) return;
  activeIdx = idx;
  items.forEach((it, i) => it.classList.toggle('active', i === idx));
  movePillTo(items[idx]);
}

items.forEach((item, idx) => {
  item.addEventListener('click', () => selectTab(idx));
});

// Sheen tracks pointer position within the navbar for a subtle interactive
// highlight, reinforcing the "glass catching light" feel.
navbar.addEventListener('mousemove', (e) => {
  const rect = navbar.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  sheen.style.background = 'radial-gradient(180px circle at ' + x + '% ' + y + '%, rgba(255,255,255,0.65), transparent 60%)';
});
navbar.addEventListener('mouseleave', () => {
  sheen.style.background = 'radial-gradient(220px circle at 50% 0%, rgba(255,255,255,0.55), transparent 60%)';
});

// Initial placement: snap the pill under the active tab without animating.
window.addEventListener('load', () => {
  const first = items[activeIdx].getBoundingClientRect();
  const navRect = navbar.getBoundingClientRect();
  pill.style.left = (first.left - navRect.left) + 'px';
  pill.style.width = first.width + 'px';
});
// Run once immediately too, in case 'load' already fired in the sandboxed frame.
const initRect = items[activeIdx].getBoundingClientRect();
const initNav = navbar.getBoundingClientRect();
pill.style.left = (initRect.left - initNav.left) + 'px';
pill.style.width = initRect.width + 'px';`,
  seo: {
    title: 'Liquid Glass Navbar — Free FLIP-Animated Pill Nav Snippet',
    description: 'Frosted-glass pill nav with a FLIP-animated morphing active indicator and pointer-tracked sheen. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Liquid Glass Navbar — Frosted Pill Navigation With a FLIP-Animated Morphing Indicator',
      description: `Apple's "Liquid Glass" material, introduced across iOS and macOS 26, is built from two visual ingredients layered together: heavy translucency via backdrop blur, and a soft specular sheen that makes the surface look like it is catching light rather than just sitting flat. This snippet recreates both with plain CSS — \`backdrop-filter: blur(20px) saturate(160%)\` on the navbar itself for the glass body, and a separate radial-gradient \`.lg-sheen\` layer for the highlight — then adds the piece that actually makes a pill nav feel alive: an active-tab indicator that **morphs** between tabs instead of just fading in and out.

**Why morphing instead of fading**

A fading indicator (opacity 0 to 1 on a new pill, opacity 1 to 0 on the old one) reads as two separate objects taking turns. A morphing indicator — one that visibly slides and resizes from the old tab's exact position and width to the new tab's position and width — reads as one continuous object, which is the actual "liquid" quality the aesthetic is named for. Getting that right means animating from real, measured layout values, not guessed ones.

**The FLIP technique, step by step**

FLIP stands for First, Last, Invert, Play, and it is the standard trick for animating layout changes smoothly. **First**: before doing anything, \`pill.getBoundingClientRect()\` records the pill's current on-screen box. **Last**: the pill is then instantly (with \`transition: none\`) repositioned to match the new target tab's real \`left\` and \`width\`, and its box is measured again — this is where the element ends up, with no animation yet. **Invert**: the delta between the first and last positions is computed (\`deltaX\`, plus a \`scaleX\` ratio for the width change), and applied as a \`transform\`. Because a transform is applied that exactly cancels out the jump, the pill visually appears to still be in its old spot even though its real \`left\`/\`width\` have already changed underneath. **Play**: a transition is set on \`transform\` only, and the transform is reset to identity (\`translateX(0) scaleX(1)\`) — the browser now animates from the inverted position back to the true position, which the eye reads as a smooth morph from old tab to new tab.

**Why animate transform instead of left/width directly**

You could skip FLIP entirely and just transition \`left\` and \`width\` with CSS. That works, but those are layout-triggering properties — the browser has to recompute geometry on every frame, which gets janky under load and cannot be handed off to the compositor thread. \`transform\` (translate and scale) can be composited independently of layout, so the FLIP version stays smooth even on a busy page. This matters far more in real apps than in this small demo: the same FLIP pattern is what keeps drag-and-drop reordering, filtered grid reflows, and shared-element page transitions smooth in production UIs.

**The forced reflow gotcha**

Between writing the inverted transform and writing the identity transform, the code calls \`pill.getBoundingClientRect()\` again purely to force a synchronous layout flush. Without it, the browser may batch both style writes together before ever painting the inverted state, and the transition has nothing to animate from — the pill would just snap to its final position with no visible motion. This is one of the most common FLIP bugs and worth knowing by name.

**Backdrop blur, saturation, and the inset highlight**

The glass body pairs \`blur(20px)\` with \`saturate(160%)\`, which is what gives translucent Apple-style surfaces their slightly punchier, more vivid color underneath the blur rather than looking washed out. A subtle \`inset 0 1px 1px rgba(255,255,255,0.6)\` box-shadow adds a hairline top highlight that reads as a curved glass edge catching light, and the same trick is repeated on the pill itself so it looks like a distinct glass layer floating above the bar, not just a flat color fill.

**Pointer-tracked sheen for extra polish**

On \`mousemove\`, the sheen's \`radial-gradient\` position is recalculated from the cursor's percentage position within the navbar and written directly to \`background\`. This is deliberately simple — no \`requestAnimationFrame\` loop is needed since \`mousemove\` already fires at a usable rate — and it makes the glass feel like a physical reflective surface responding to where you are looking, rather than a static texture.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'See the frosted pill bar render over the gradient background', text: 'The navbar shows heavy blur with the gradient softly visible through it, a bright highlight near the top, and a solid white pill sitting under the active "Home" tab.' },
      { title: 'Move your mouse over the navbar', text: 'A soft radial highlight follows your cursor across the glass surface, reinforcing the sense that it is a reflective material rather than a flat translucent rectangle.' },
      { title: 'Click a different tab, e.g. "Explore"', text: 'The white pill visibly slides and resizes from underneath "Home" to underneath "Explore" in one continuous motion with a light spring overshoot — it does not fade out and back in.' },
      { title: 'Click rapidly between distant tabs', text: 'Because each click re-measures the pill\'s real current position with getBoundingClientRect before animating, rapid clicks stay smooth and never jump-cut, even mid-animation.' },
      { title: 'Inspect the JS for the movePillTo function', text: 'Read through the First/Last/Invert/Play comments in sequence — each labeled block corresponds directly to one step of the FLIP technique described in the about section.' },
      { title: 'Resize the tabs or add a new one', text: 'Add another <button class="lg-item"> in the HTML and it just works — the pill\'s position and width are always derived from the clicked element\'s live getBoundingClientRect, never hardcoded pixel values.' },
    ]},
    features: [
      'Frosted "Liquid Glass" body via backdrop-filter: blur(20px) saturate(160%) with translucent white fill',
      'Active-tab pill that morphs (slides + resizes) between tabs using the FLIP technique, not opacity fades',
      'FLIP implemented by hand: getBoundingClientRect measurements, an inverted transform, and a forced-reflow trick',
      'Spring-like cubic-bezier(0.34, 1.56, 0.64, 1) overshoot on the pill\'s Play phase for a lively, liquid feel',
      'Pointer-tracked radial-gradient sheen recalculated on mousemove for a reflective, glass-like highlight',
      'Transform-only animation keeps the morph on the compositor thread instead of triggering layout every frame',
      'Fully derived from live layout: adding, removing, or resizing tabs needs zero JS changes',
      'Inset highlight box-shadows on both the bar and the pill simulate a curved glass edge catching light',
    ],
    useCases: [
      { icon: 'APP', title: 'iOS/macOS-style app shells and dashboards', desc: 'Use as the primary navigation for a web app that wants to echo Apple\'s Liquid Glass design language, paired with a [glass card](/ui-snippets/glass-card) or [glassmorphism login](/ui-snippets/glassmorphism-login) panel for a consistent frosted aesthetic throughout the shell.' },
      { icon: 'WEB', title: 'Marketing and product landing page headers', desc: 'A translucent pill nav sitting over a gradient hero reads as premium and modern; the morphing indicator draws the eye on first interaction, which is exactly what a landing-page nav wants.' },
      { icon: 'LEARN', title: 'Teaching the FLIP animation technique', desc: 'This is a compact, real-world example of FLIP that is easier to study than a full drag-and-drop reorder implementation — every step (First, Last, Invert, Play) is isolated and commented in movePillTo().' },
      { icon: 'DESIGN', title: 'Design system tab and segmented-control reference', desc: 'The morphing-pill pattern generalizes to any indicator that needs to track a selection across variable-width items — compare with the simpler transform-free approach in [segmented control](/ui-snippets/segmented-control) to see the difference FLIP makes.' },
      { icon: 'MOBILE', title: 'Mobile web app bottom or top tab bars', desc: 'The same FLIP-driven pill works equally well as a top pill nav or adapted into a bottom tab bar for a mobile PWA, alongside a [bottom nav](/ui-snippets/bottom-nav) for app-like navigation.' },
      { icon: 'CODE', title: 'Portfolio and case-study pieces on modern CSS techniques', desc: 'A strong showcase piece for a frontend portfolio: it demonstrates backdrop-filter, FLIP animation, and pointer-reactive gradients together in one compact, explainable component.' },
      { icon: 'CODE', title: 'Related: Off-Canvas Push Menu', desc: 'See the [Off-Canvas Push Menu](/ui-snippets/off-canvas-menu/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why does the pill use a transform instead of animating left and width directly?', a: 'transform (translate and scale) can be handled by the compositor thread without triggering a browser layout recalculation on every animation frame, so it stays smooth even under load. Animating left and width directly forces a synchronous layout pass each frame, which is more expensive and can visibly stutter. FLIP achieves the identical visual result — an element that appears to slide and resize between two real layout positions — while only ever animating a transform.' },
      { q: 'What is the forced reflow (pill.getBoundingClientRect()) in the middle of movePillTo for?', a: 'Browsers batch style writes and only recalculate layout when something actually reads a layout-dependent value. Without that extra getBoundingClientRect() call between setting the inverted transform and resetting it to identity, both writes could be flushed together and the browser would never paint the "inverted" frame — the pill would just snap to its destination with no visible animation. Calling getBoundingClientRect() forces the browser to compute and paint the current state first, guaranteeing the transition has a starting point to animate from.' },
      { q: 'Does backdrop-filter: blur() work in every browser?', a: 'It is supported in all current versions of Chrome, Edge, Safari, and Firefox (Firefox added support in 2022 without a vendor prefix), but the snippet still includes -webkit-backdrop-filter for older WebKit-based browsers. If backdrop-filter is unsupported, the navbar gracefully falls back to its semi-transparent background color without blur, which still looks acceptable, just less "glassy."' },
      { q: 'Can I use this liquid glass navbar in React, Vue, or Angular?', a: 'Yes. Keep the pill-morph logic inside a ref-based effect: in React, run movePillTo inside a useLayoutEffect that fires when the active-tab index state changes, using a ref to the pill element and refs (or querySelectorAll scoped to a container ref) for the tab buttons — no cleanup is required since it is not a persistent loop, just a one-shot animation per click. In Vue, call the equivalent inside a watcher on the active index using nextTick to ensure the DOM has updated first; in Angular, trigger it from the click handler directly since there is no continuous timer or animation frame loop to dispose of.' },
      { q: 'How do I add more tabs or make the pill fit tabs of very different widths?', a: 'Just add more <button class="lg-item"> elements to the HTML — no JS changes are needed. Because movePillTo() always reads the clicked element\'s live getBoundingClientRect().width and left, it automatically fits a "Home" tab and a much wider "Notifications and Settings" tab correctly, since the FLIP calculation is based on real measured geometry rather than a fixed pill width.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's JS to an AI assistant like Claude and ask it to trace through movePillTo() step by step, matching each block of code to First, Last, Invert, and Play — it is a great way to actually internalize FLIP rather than just recognizing the acronym. Good extensions to ask for: adapt the pill to work in a vertical sidebar nav instead of a horizontal bar, add keyboard arrow-key navigation between tabs with the same morph animation, or make the sheen respond to device orientation on mobile instead of mousemove using the DeviceOrientation API.`,
      prompt: `Build a frosted "liquid glass" pill navigation bar in plain HTML, CSS, and JavaScript with a morphing active-tab indicator, no libraries.

Requirements:
- A horizontal row of button "tabs" inside a rounded pill-shaped container styled with backdrop-filter: blur() and saturate() for heavy translucency, plus a subtle inset highlight so it reads as a glass surface over a colorful gradient background.
- A single reusable absolutely-positioned "pill" element that represents the active tab indicator, sitting behind the tab buttons in stacking order.
- When a different tab is clicked, animate the pill from its old position/width to the new tab's position/width using the FLIP technique: measure the pill's current bounding box (First), instantly move it to the new tab's real position with no transition (Last), compute the delta between the two and apply it as an inverted CSS transform so it appears unmoved (Invert), force a synchronous reflow, then transition the transform back to identity (Play) — do not animate left/width/top directly.
- Use a spring-like easing curve (a cubic-bezier with overshoot) on the Play phase so the morph has a light bounce rather than a linear or purely-eased slide.
- Add a separate radial-gradient "sheen" layer over the glass bar whose position updates on mousemove to track the cursor, simulating light reflecting off glass.
- Make the indicator logic fully generic so it works correctly for tabs of different widths and for any number of tabs, always deriving position and size from live getBoundingClientRect() measurements rather than hardcoded pixel values.
- Include comments in the JS explicitly labeling the First, Last, Invert, and Play steps so the technique is easy to study.`,
    },
  },
};

export default liquidGlassNavbar;
