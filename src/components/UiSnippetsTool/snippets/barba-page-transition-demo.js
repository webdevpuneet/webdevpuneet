const barbaPageTransitionDemo = {
  id: 'barba-page-transition-demo',
  title: 'Barba.js Page Transition',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/@barba/core@2.9.7/dist/barba.umd.min.js',
  ],
  html: `<div data-barba="wrapper">
  <nav class="bp-nav">
    <span class="bp-logo">Studio</span>
    <a href="#page-home" data-barba-link class="bp-link is-active" data-target="page-home">Home</a>
    <a href="#page-work" data-barba-link class="bp-link" data-target="page-work">Work</a>
  </nav>

  <div data-barba="container" data-barba-namespace="home" id="page-home">
    <section class="bp-panel">
      <span class="bp-tag">Namespace: home</span>
      <h1>Barba.js in a single page</h1>
      <p>Click "Work" — Barba's leave/enter hooks fade and slide between containers even though both live in this one document.</p>
    </section>
  </div>

  <div data-barba="container" data-barba-namespace="work" id="page-work" hidden>
    <section class="bp-panel bp-panel--alt">
      <span class="bp-tag">Namespace: work</span>
      <h1>Second container</h1>
      <p>In a real multi-page site this would be a different URL entirely; here it's a second container Barba swaps in using the same transition hooks.</p>
    </section>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0c14;color:#fff;min-height:100vh}
.bp-nav{display:flex;align-items:center;gap:22px;padding:20px clamp(20px,5vw,48px);border-bottom:1px solid #1e2133}
.bp-logo{font-weight:800;letter-spacing:-.02em;margin-right:auto;font-size:16px}
.bp-link{color:#8b90ab;text-decoration:none;font-size:14px;font-weight:600;padding:6px 4px;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.bp-link:hover{color:#fff}
.bp-link.is-active{color:#fff;border-color:#f97316}
.bp-panel{min-height:64vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:14px;padding:clamp(28px,7vw,72px);max-width:640px}
.bp-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#fdba74;background:#3a220c;padding:4px 10px;border-radius:999px}
.bp-panel h1{font-size:clamp(30px,6vw,52px);letter-spacing:-.02em}
.bp-panel p{color:#9aa0c0;font-size:16px;line-height:1.6}
.bp-panel--alt .bp-tag{color:#93c5fd;background:#0e2440}`,

  js: `// Barba.js is built for real multi-page navigation (swapping the DOM between
// different URLs via fetch). This sandbox is a single document, so instead of
// pointing barba.init() at real pages, we point it at two [data-barba="container"]
// panels that already exist in the page and toggle which one is visible/hidden
// using Barba's own "once" and "leave/enter" hook API — the same API you'd use
// in production, just driving in-page containers instead of fetched pages.

const containers = {
  home: document.getElementById('page-home'),
  work: document.getElementById('page-work'),
};
const links = document.querySelectorAll('[data-barba-link]');

// This is the real Barba.js transition shape: a "once" hook for first load and
// leave/enter hooks that each return a promise Barba awaits before continuing.
// In production, barba.init()'s own fetch-based router calls these for you on
// every internal link click. This sandbox has no second URL to fetch, so there
// is nothing for Barba's router to intercept — instead we call these same hook
// functions directly from our own click handler below, in the same leave-then-
// enter order Barba itself would use.
const transition = {
  once({ next }) {
    next.style.opacity = '1';
  },
  leave({ current }) {
    return animateContainer({ el: current, from: 1, to: 0, y: [0, -24] });
  },
  enter({ next }) {
    return animateContainer({ el: next, from: 0, to: 1, y: [24, 0] });
  },
};

barba.init({ transitions: [{ name: 'fade-slide', ...transition }] });
transition.once({ next: containers.home });

links.forEach((link) => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = link.dataset.target;
    const current = document.querySelector('[data-barba="container"]:not([hidden])');
    const next = containers[target === 'page-home' ? 'home' : 'work'];
    if (!current || next === current) return;

    links.forEach((l) => l.classList.toggle('is-active', l === link));

    await transition.leave({ current });
    current.hidden = true;
    next.hidden = false;
    await transition.enter({ next });
  });
});

// Drives the fade-slide purely with CSS transitions, matching Barba's
// convention that leave/enter return a promise the router awaits.
function animateContainer({ el, from, to, y }) {
  return new Promise((resolve) => {
    el.style.transition = 'none';
    el.style.opacity = String(from);
    el.style.transform = \`translateY(\${y[0]}px)\`;
    requestAnimationFrame(() => {
      el.style.transition = 'opacity .35s ease, transform .35s ease';
      el.style.opacity = String(to);
      el.style.transform = \`translateY(\${y[1]}px)\`;
    });
    setTimeout(resolve, 350);
  });
}`,

  seo: {
    title: 'Barba.js Page Transition — Free Container-Swap Transition Snippet',
    description: `Barba.js's leave/enter transition hooks demoed on two in-page containers, adapted to run standalone in a single-page sandbox. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Barba.js Page Transition — Leave/Enter Hooks on In-Page Containers',
      description: `[Barba.js](https://barba.js.org) is built for real multi-page sites: it intercepts link clicks, fetches the next page's HTML over the network, and swaps a \`[data-barba="container"]\` element while running \`leave\`/\`enter\` transition hooks around the swap — that's how you get an animated crossfade between two actual URLs without a full page reload. A live sandbox like this one is a single HTML document with no server to fetch other pages from, so this snippet adapts Barba's exact hook shape — \`once\`, \`leave\`, \`enter\`, wrapped in a \`transitions\` array passed to \`barba.init()\` — onto two containers that already both live in the page, toggled by \`hidden\` instead of fetched over the network.

**What's real Barba and what's adapted**

\`barba.init({ transitions: [...] })\`, the \`once/leave/enter\` hook names, and the \`data-barba="wrapper"\` / \`data-barba="container"\` / \`data-barba-namespace\` markup are exactly how Barba is used in production. What's adapted is the navigation trigger: production Barba listens for clicks on any internal link and performs a real \`fetch\`, whereas this sandbox has no second page to fetch, so a small click handler toggles which container is visible and drives the same before/after transition timing Barba's hooks expect. If you drop this into a real multi-page site, you'd delete the click handler and toggling logic and let \`barba.init()\` manage navigation itself — the hook functions themselves barely change.

**Why namespaces matter**

Each container carries \`data-barba-namespace\` (\`home\`, \`work\`). In production this lets you register different transitions for different page-type pairs — a subtle crossfade between two blog posts, a bigger slide between the home page and a case study — by checking \`namespace\` inside the hook or by scoping transitions with \`from\`/\`to\` namespace filters. This snippet keeps a single transition for both, but the namespace attributes are there so extending it to per-pair transitions is a small addition, not a rewrite.

**The fade-slide itself**

\`leave\` animates the current container's opacity to 0 and nudges it up 24px; \`enter\` starts the next container 24px below its resting position at opacity 0 and animates it in. Because both are plain CSS transitions driven from JS (no external animation library needed beyond Barba itself), the pattern generalizes to a scale, blur, or clip-path transition just by changing what the hook functions set.

**Where this differs from a scroll or hover effect**

This is a navigation transition, not a scroll-triggered one — compare it to [Swup page transition](/ui-snippets/swup-page-transition-demo/), which solves the identical problem with a different library and a hooks-object API instead of a transitions array. For animating elements as they scroll into view rather than on navigation, see [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).

**Customizing it**

Add more containers and namespaces, swap the fade-slide for a curtain wipe or shared-element morph, or add a loading bar during \`leave\` for slower page swaps. In a real deployment, remove the click-interception shim entirely — Barba's own link listener and fetch pipeline replace it outright.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Barba.js CDN', text: `Include barba.umd.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A nav and two containers render, one hidden.` },
      { title: 'Click "Work"', text: `The home container fades/slides out.` },
      { title: 'Watch the swap', text: `The work container fades/slides in with its own copy.` },
      { title: 'Click back to "Home"', text: `The transition reverses direction cleanly.` },
      { title: 'Adapt for production', text: `Remove the click shim; let barba.init() own navigation.` },
    ] },
    features: [
      { title: 'Real Barba hook API', text: `once/leave/enter match production usage exactly.` },
      { title: 'Namespace attributes', text: `data-barba-namespace ready for per-pair transitions.` },
      { title: 'In-page adaptation', text: `Two containers stand in for two fetched pages.` },
      { title: 'Fade + slide transition', text: `Directional motion signals navigation, not a fade.` },
      { title: 'Promise-based hooks', text: `leave/enter return promises Barba awaits.` },
      { title: 'Active link state', text: `Nav highlights the current container's link.` },
      { title: 'No extra animation library', text: `Transitions run on plain CSS transitions.` },
      { title: 'Sandbox-safe', text: `Runs standalone without a server or router.` },
    ],
    useCases: [
      { title: 'Multi-page site transitions', text: `Prototype the hook logic before wiring real fetches.` },
      { title: 'Portfolio case studies', text: `Transition between project "pages" smoothly.` },
      { title: 'Agency sites', text: `Pair with [parallax hero](/ui-snippets/parallax-hero/) landing sections.` },
      { title: 'Comparing transition libraries', text: `See it beside [Swup page transition](/ui-snippets/swup-page-transition-demo/).` },
      { title: 'Learning Barba.js', text: `Read real hook code without a build step.` },
      { title: 'Design reviews', text: `Demo a transition concept before backend wiring.` },
      { icon: 'CODE', title: 'Related: Canvas Fractal Tree Generator', desc: 'See the [Canvas Fractal Tree Generator](/ui-snippets/canvas-fractal-tree/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: FAB Container Transform Sheet', desc: 'See the [FAB Container Transform Sheet](/ui-snippets/fab-container-transform-sheet/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this actually use Barba.js for the transition, or is it faked?', a: `Barba.js is genuinely initialized via barba.init({ transitions: [...] }) with the real once, leave, and enter hook functions running exactly as they would in production. What's adapted is only the trigger: because this sandbox has no second URL to fetch, a small click handler toggles which of the two existing containers is visible and calls the same before/after sequence Barba's hooks expect, rather than Barba's own fetch-based router doing it.` },
      { q: 'What would change if I used this on a real multi-page site?', a: `You would delete the click-interception code and the hidden-toggling logic entirely. Barba's own link listener would intercept clicks on internal links, fetch the destination page's HTML, extract its [data-barba="container"], and run the same leave/enter transition hooks around swapping it in — the transition functions themselves are already written in the exact shape Barba expects, so they carry over unchanged.` },
      { q: 'What is data-barba-namespace for?', a: `It labels each container with a page type so you can scope different transitions to different navigation pairs — for example a quick crossfade between two blog posts but a larger slide from the home page to a case study. This demo only registers one transition for both namespaces, but the attributes are already in place so adding namespace-specific transitions is additive, not a restructure.` },
      { q: 'Why do leave and enter return promises?', a: `Barba awaits whatever leave and enter return before considering the transition complete and moving to the next step (running enter after leave resolves, or considering navigation finished after enter resolves). Returning a promise that resolves after a setTimeout matching the CSS transition duration is the standard pattern for wrapping CSS-driven animation in Barba's hook lifecycle.` },
      { q: 'How is this different from the Swup.js version of this pattern?', a: `Barba and Swup solve the same problem — animated transitions between page loads — with different APIs: Barba uses a transitions array of hook objects passed to init, while Swup exposes a hooks event emitter (swup.hooks.on("visit:start", ...)) and CSS class toggling driven by data-swup-* attributes. See the companion Swup page transition snippet for the same in-page adaptation built on that API instead.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to guess which parts of this file are real Barba.js and which are the sandbox workaround. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to point out exactly where barba.init()'s once/leave/enter hooks are genuinely doing the transition work versus where the click handler is standing in for Barba's own fetch-based router, and what would need to change to run this against real second and third pages instead of two in-page containers. The same assistant can help you extend it — asking how to register a different transition for a specific pair of data-barba-namespace values, or how to add a loading indicator during the leave phase for slower real-world page fetches. It's also useful for comparing approaches: ask it to explain the tradeoffs between Barba's transitions-array API and Swup's hooks-emitter API for the same navigation-transition problem. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a page transition demo using Barba.js's real hook API (load barba.umd.js from a CDN), adapted to run inside a single HTML document with no server-side routing.

Requirements:
- A data-barba="wrapper" element containing a small nav with two links and two data-barba="container" elements (each with its own data-barba-namespace), where the second container starts hidden.
- Call barba.init() with a transitions array containing one transition object that defines once, leave, and enter hook functions using Barba's real hook names and signatures — leave receives the current container reference, enter receives the next container reference.
- Since there is no second page to fetch in a single-document sandbox, implement navigation yourself: intercept clicks on the nav links, determine which container should become visible, and manually invoke the same before/after animation timing that leave and enter perform, using the hidden attribute or a visibility toggle to swap which container is shown — but keep the leave and enter functions themselves written exactly as they would be used in a real Barba multi-page setup (returning promises that resolve after their CSS transition completes).
- The transition itself should combine an opacity fade with a vertical slide, so leaving content moves and fades one direction while entering content moves and fades in from the opposite direction, using plain CSS transitions driven by inline style changes from JavaScript (no additional animation library beyond Barba).
- Update the active nav link's styling to reflect whichever container is currently showing.
- In code comments, clearly mark which parts of the implementation are genuine Barba.js hook usage versus the click-interception shim that exists only because this is a single-page sandbox without real page-to-page navigation.`,
    },
  },
};

export default barbaPageTransitionDemo;
