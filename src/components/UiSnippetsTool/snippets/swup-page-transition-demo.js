const swupPageTransitionDemo = {
  id: 'swup-page-transition-demo',
  title: 'Swup Page Transition',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/swup/4.4.1/Swup.umd.js',
  ],
  html: `<div id="swup">
  <nav class="sw-nav">
    <span class="sw-logo">Journal</span>
    <a href="#entry-one" class="sw-link is-active" data-target="entry-one">Entry One</a>
    <a href="#entry-two" class="sw-link" data-target="entry-two">Entry Two</a>
  </nav>

  <div class="transition-fade" id="entry-one">
    <section class="sw-panel">
      <span class="sw-tag">Visit: entry-one</span>
      <h1>Swup in a single page</h1>
      <p>Click "Entry Two" — swup.hooks fires visit:start / content:replace / visit:end while a CSS class drives the actual fade, exactly like real Swup usage.</p>
    </section>
  </div>

  <div class="transition-fade" id="entry-two" hidden>
    <section class="sw-panel sw-panel--alt">
      <span class="sw-tag">Visit: entry-two</span>
      <h1>Second entry</h1>
      <p>On a real multi-page site this container would be replaced by fetched HTML from a second URL; here it's a sibling container toggled by the same hook sequence.</p>
    </section>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0c0b14;color:#fff;min-height:100vh}
.sw-nav{display:flex;align-items:center;gap:22px;padding:20px clamp(20px,5vw,48px);border-bottom:1px solid #201d33}
.sw-logo{font-weight:800;letter-spacing:-.02em;margin-right:auto;font-size:16px}
.sw-link{color:#948bab;text-decoration:none;font-size:14px;font-weight:600;padding:6px 4px;border-bottom:2px solid transparent;transition:color .2s,border-color .2s}
.sw-link:hover{color:#fff}
.sw-link.is-active{color:#fff;border-color:#a78bfa}
.sw-panel{min-height:64vh;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:14px;padding:clamp(28px,7vw,72px);max-width:640px}
.sw-tag{font-size:11px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#d8b4fe;background:#2a123f;padding:4px 10px;border-radius:999px}
.sw-panel h1{font-size:clamp(30px,6vw,52px);letter-spacing:-.02em}
.sw-panel p{color:#a49cc0;font-size:16px;line-height:1.6}
.sw-panel--alt .sw-tag{color:#fbcfe8;background:#3a1030}

/* Swup's real convention: toggle a class during the transition and let CSS
   own the actual animation timing via transition-duration. */
.transition-fade{opacity:1;transform:translateY(0);transition:opacity .35s ease,transform .35s ease}
.transition-fade.is-transitioning{opacity:0;transform:translateY(-16px)}`,

  js: `// Swup's real API: a hooks event emitter you attach to, plus CSS classes it
// toggles during a visit (its term for one navigation). Production Swup
// intercepts link clicks, fetches the destination page over the network, and
// swaps the content inside its container while firing visit:start,
// content:replace, and visit:end around that swap. This sandbox has only one
// document, so there is no second page to fetch — instead we drive the same
// hook sequence and the same is-transitioning class toggle ourselves, on two
// containers that already both live on the page.

const swup = new Swup({ containers: ['#entry-one', '#entry-two'] });
const containers = {
  'entry-one': document.getElementById('entry-one'),
  'entry-two': document.getElementById('entry-two'),
};
const links = document.querySelectorAll('.sw-link');

// Real Swup usage: subscribe to lifecycle hooks the same way you would on a
// live multi-page site, purely for visibility into the visit lifecycle.
swup.hooks.on('visit:start', () => console.log('[swup] visit:start'));
swup.hooks.on('content:replace', () => console.log('[swup] content:replace'));
swup.hooks.on('visit:end', () => console.log('[swup] visit:end'));

links.forEach((link) => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    const target = link.dataset.target;
    const current = document.querySelector('.transition-fade:not([hidden])');
    const next = containers[target];
    if (!current || next === current) return;

    links.forEach((l) => l.classList.toggle('is-active', l === link));

    swup.hooks.call('visit:start');
    current.classList.add('is-transitioning');
    await wait(350);

    current.hidden = true;
    swup.hooks.call('content:replace');
    next.hidden = false;
    next.classList.add('is-transitioning');
    // Force a reflow so removing the class next frame actually transitions.
    void next.offsetWidth;
    next.classList.remove('is-transitioning');
    await wait(350);

    current.classList.remove('is-transitioning');
    swup.hooks.call('visit:end');
  });
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}`,

  seo: {
    title: 'Swup Page Transition — Free Hooks-Driven Fade Transition Snippet',
    description: `Swup's real hooks API and class-toggle transition timing demoed on two in-page containers, adapted to run standalone in a single-page sandbox. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Swup Page Transition — Hooks and CSS-Class Timing on In-Page Containers',
      description: `[Swup](https://swup.js.org) animates real page-to-page navigation: it intercepts internal link clicks, fetches the destination page's HTML, and swaps its containers into the DOM while firing lifecycle hooks — \`visit:start\`, \`content:replace\`, \`visit:end\` — around the swap. It leans on CSS to own the actual animation: Swup toggles an \`is-transitioning\` class and waits for the CSS \`transition-duration\` on that class before continuing, rather than animating with JavaScript directly. This snippet is a single HTML document with nothing to fetch, so it adapts that exact hooks-and-class pattern onto two containers already present in the page.

**What's real Swup and what's adapted**

\`new Swup({ containers: [...] })\`, the \`swup.hooks.on(...)\` subscriptions, and the \`transition-fade\` / \`is-transitioning\` class convention are exactly how Swup is used in production — that class-toggle timing model is Swup's actual design, not a simplification. What's adapted is the trigger: since there's no second URL to fetch, a click handler calls \`swup.hooks.call(...)\` at the same points Swup's own router would, and toggles \`hidden\`/\`is-transitioning\` on the two sibling containers instead of Swup replacing fetched content. Drop this onto a real multi-page site and you'd delete the manual toggling — Swup's router calls the hooks and swaps content itself.

**CSS owns the timing, not JavaScript**

Unlike a JS-driven tween, Swup's convention is to add a class and let the browser's own \`transition\` property determine how long the animation takes; Swup (and this adaptation) just waits that same duration before proceeding. That's why \`.transition-fade\` defines the \`opacity\`/\`transform\` transition and \`.is-transitioning\` defines the "leaving" state entirely in CSS — change the \`transition\` timing function or duration in one place and the whole visit lifecycle respects it automatically.

**The hook sequence**

\`visit:start\` fires as a visit begins (here, on click); \`content:replace\` fires the moment the new content is swapped in (here, when the next container is un-hidden); \`visit:end\` fires once the entering transition finishes. Subscribing via \`swup.hooks.on\` is how you'd hang a loading bar, analytics ping, or scroll-reset off any point in a real Swup-powered navigation.

**Where this fits**

For the same navigation-transition problem solved with a different library and a transitions-array hook shape instead of an event emitter, see [Barba.js page transition](/ui-snippets/barba-page-transition-demo/). For scroll-triggered rather than navigation-triggered motion, see [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).

**Customizing it**

Add more containers, change \`.is-transitioning\`'s transform for a different exit direction, or hang extra behavior off \`content:replace\` (like resetting scroll position, which real Swup does by default). In production, Swup's \`containers\` option targets CSS selectors present on both the current and fetched page, so naming them consistently across templates is what makes the swap work at all.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Swup CDN', text: `Include swup.umd.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A nav and two containers render, one hidden.` },
      { title: 'Open the console (optional)', text: `See visit:start / content:replace / visit:end log.` },
      { title: 'Click "Entry Two"', text: `The current container fades out via is-transitioning.` },
      { title: 'Watch the swap', text: `The next container fades in on the same class toggle.` },
      { title: 'Adapt for production', text: `Remove the click shim; let Swup's router own navigation.` },
    ] },
    features: [
      { title: 'Real Swup hooks API', text: `visit:start/content:replace/visit:end match production.` },
      { title: 'CSS-owned timing', text: `transition-duration on a class, not a JS tween.` },
      { title: 'In-page adaptation', text: `Two containers stand in for two fetched pages.` },
      { title: 'Reflow-safe re-trigger', text: `Forces layout so the enter class actually animates.` },
      { title: 'Active link state', text: `Nav highlights the current container's link.` },
      { title: 'Console-visible lifecycle', text: `Logs each hook as it fires for learning.` },
      { title: 'No extra animation library', text: `Fade runs on plain CSS transitions.` },
      { title: 'Sandbox-safe', text: `Runs standalone without a server or router.` },
    ],
    useCases: [
      { title: 'Multi-page transition prototypes', text: 'Prototype hook wiring before touching a real site, using `visit:start`, `content:replace` and `visit:end` exactly as production does.' },
      { title: 'Blogs and journals', text: 'Fade between entries as this demo does, with CSS owning the timing through `transition-duration` on a class instead of a JavaScript tween.' },
      { title: 'Agency site pairings', text: 'Pair with a [parallax hero](/ui-snippets/parallax-hero/) landing page so each navigation also reveals a fresh opening screen.' },
      { title: 'Library comparison', text: 'Compare with the [Barba.js page transition](/ui-snippets/barba-page-transition-demo/) to see two approaches to lifecycle hooks side by side.' },
      { title: 'Reflow-safe re-triggering', text: 'Learn why forcing layout before adding the enter class ensures the transition actually animates every time.' },
    ],
    faqs: [
      { q: 'Is Swup actually running here, or is the transition faked?', a: `Swup is genuinely instantiated with new Swup({ containers: [...] }) and its real hooks event emitter is used to subscribe to and fire visit:start, content:replace, and visit:end. What's adapted is only the trigger: since this sandbox has no second URL to fetch, a click handler calls those same hooks and toggles which container is visible, instead of Swup's own fetch-based router doing it — the hook names, timing, and CSS class convention are unchanged from production usage.` },
      { q: 'What would change on a real multi-page site?', a: `You would remove the manual hidden-toggling and the direct swup.hooks.call() invocations. Swup's own router would intercept clicks on internal links, fetch the destination page, replace the content inside the matching container selector, and fire the lifecycle hooks itself around that swap — your CSS transition-fade / is-transitioning classes would carry over completely unchanged, since that part of the pattern was never adapted.` },
      { q: 'Why does Swup toggle a class instead of animating with JavaScript?', a: `That's Swup's actual design: it adds an is-transitioning (or similarly named) class and then waits for the CSS transition-duration defined on that class before proceeding to the next step, rather than running its own tween engine. This keeps the animation authored entirely in CSS — change the transition property in one place and the whole page's visit timing follows it, no JS animation values to keep in sync.` },
      { q: 'What does content:replace actually correspond to?', a: `In production Swup, content:replace fires at the exact moment the fetched page's HTML has been swapped into the container, after the leaving transition finishes and before the entering transition starts. In this adaptation, it fires when the next container is un-hidden and about to animate in — the same position in the sequence, just triggered manually instead of by Swup's own DOM-replacement step.` },
      { q: 'How is this different from the Barba.js version of this pattern?', a: `Both solve the same problem — animated transitions between page loads — with different APIs: Swup exposes a hooks event emitter (swup.hooks.on/call) and lets CSS transition-duration drive timing via class toggles, while Barba.js uses a transitions array of leave/enter functions that each return a promise it awaits. See the companion Barba.js page transition snippet for the same in-page adaptation built on that API instead.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to dig through Swup's source to see which parts of this file are real and which are the sandbox workaround. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to point out exactly where swup.hooks.on/call and the is-transitioning class toggle are genuine Swup usage versus where the click handler stands in for Swup's own fetch-based router, and what changes if this ran against two real separate page URLs instead of two in-page containers. The same assistant can help you extend it — asking how to hang a scroll-reset or analytics call off the content:replace hook, or how CSS transition-duration values interact with the wait() timeouts in the JS so they never drift out of sync. It's also useful for comparing approaches: ask it to explain the tradeoffs between Swup's hooks-emitter-plus-CSS-class model and Barba's promise-returning leave/enter functions for the same navigation-transition problem. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a page transition demo using Swup's real hooks API and CSS-class transition convention (load swup.umd.js from a CDN), adapted to run inside a single HTML document with no server-side routing.

Requirements:
- A small nav with two links and two sibling container elements, each sharing a CSS class that defines an opacity/transform transition plus a second "is-transitioning" class representing the leaving state — the actual animation timing must live in CSS transition-duration, not a JavaScript tween, matching Swup's real design.
- Instantiate Swup for real (new Swup({ containers: [...] })) and subscribe to its hooks event emitter for at least visit:start, content:replace, and visit:end, logging each one so the lifecycle is visible.
- Since there is no second page to fetch in a single-document sandbox, implement navigation yourself: intercept clicks on the nav links, and manually call swup.hooks.call() for the same hook names at the same points in the sequence a real Swup visit would fire them, while toggling which container is visible using the hidden attribute and the is-transitioning class — wait for the CSS transition's actual duration (not a mismatched guess) before proceeding to the next step each time.
- After un-hiding the entering container, force a layout reflow before removing its is-transitioning class so the browser actually animates the enter state instead of skipping straight to the resting state.
- Update the active nav link's styling to reflect whichever container is currently showing.
- In code comments, clearly mark which parts are genuine Swup API usage (the hooks emitter, the class-toggle convention) versus the click-interception shim that exists only because this is a single-page sandbox without real page-to-page navigation.`,
    },
  },
};

export default swupPageTransitionDemo;
