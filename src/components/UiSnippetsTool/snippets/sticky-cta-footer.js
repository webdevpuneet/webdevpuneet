const stickyCtaFooter = {
  id: 'sticky-cta-footer',
  title: 'Sticky CTA Footer',
  lastmod: '2026-07-18',
  category: 'footers',
  html: `<div class="sc-page">
  <div class="sc-content">
    <h1>Scroll down</h1>
    <p>The call-to-action bar slides up from the bottom once you scroll past the hero, then tucks away again at the top.</p>
    <div class="sc-spacer"></div>
    <h2>Keep scrolling</h2>
    <p>Notice the bar stays pinned and only hides when you return to the very top.</p>
    <div class="sc-spacer"></div>
  </div>

  <div class="sc-bar" id="scBar" aria-hidden="true">
    <div class="sc-bar-text">
      <strong>Start your free trial</strong>
      <span>No card required · cancel anytime</span>
    </div>
    <div class="sc-bar-actions">
      <button type="button" class="sc-ghost" id="scDismiss">Maybe later</button>
      <button type="button" class="sc-primary">Get started</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#e8eaf2}
.sc-page{min-height:200vh}
.sc-content{max-width:680px;margin:0 auto;padding:80px 24px 160px}
.sc-content h1{font-size:clamp(34px,6vw,56px);letter-spacing:-.02em}
.sc-content h2{font-size:28px;margin-bottom:10px;letter-spacing:-.01em}
.sc-content p{color:#9298ad;font-size:16px;line-height:1.6;margin-top:12px}
.sc-spacer{height:60vh}

.sc-bar{position:fixed;left:50%;bottom:18px;transform:translate(-50%,140%);width:min(680px,calc(100% - 28px));display:flex;align-items:center;justify-content:space-between;gap:16px;padding:14px 18px;background:rgba(20,22,34,.82);backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.1);border-radius:16px;box-shadow:0 20px 50px rgba(0,0,0,.45);transition:transform .45s cubic-bezier(.22,1,.36,1),opacity .3s;opacity:0}
.sc-bar.is-shown{transform:translate(-50%,0);opacity:1}
.sc-bar.is-dismissed{transform:translate(-50%,140%);opacity:0;pointer-events:none}
.sc-bar-text{display:flex;flex-direction:column;gap:2px;min-width:0}
.sc-bar-text strong{font-size:15px}
.sc-bar-text span{font-size:12px;color:#8b91a6;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.sc-bar-actions{display:flex;gap:8px;flex-shrink:0}
.sc-ghost{background:none;border:0;color:#9298ad;font-family:inherit;font-size:13px;font-weight:600;padding:9px 12px;border-radius:9px;cursor:pointer}
.sc-primary{background:linear-gradient(120deg,#6366f1,#8b5cf6);border:0;color:#fff;font-family:inherit;font-size:14px;font-weight:700;padding:10px 18px;border-radius:10px;cursor:pointer;white-space:nowrap}
@media(max-width:520px){.sc-bar-text span{display:none}.sc-ghost{display:none}}`,

  js: `var bar = document.getElementById('scBar');
var dismissed = false;
var SHOW_AFTER = 320; // px scrolled before the bar appears

function update() {
  if (dismissed) return;
  bar.classList.toggle('is-shown', window.scrollY > SHOW_AFTER);
}

// rAF-throttle the scroll handler so it does at most one update per frame.
var ticking = false;
window.addEventListener('scroll', function () {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(function () { update(); ticking = false; });
});

document.getElementById('scDismiss').addEventListener('click', function () {
  dismissed = true;
  bar.classList.remove('is-shown');
  bar.classList.add('is-dismissed');
});

update();`,

  seo: {
    title: 'Sticky CTA Footer — Free HTML CSS JS Scroll Reveal Bar',
    description: `A floating call-to-action bar that slides up after the user scrolls past the hero, can be dismissed, and is rAF-throttled. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Sticky CTA Footer — A Scroll-Triggered Conversion Bar',
      description: `The sticky CTA footer is the floating call-to-action bar that slides up from the bottom of the page once a visitor has scrolled past the hero — a high-converting, low-friction way to keep your primary action in reach without a blocking popup. This snippet builds it with plain HTML, a glassy CSS bar, and a small rAF-throttled scroll handler.

**Reveal after a scroll threshold**

The bar starts off-screen, translated down past the bottom edge and at \`opacity: 0\`. A scroll handler adds an \`is-shown\` class once \`window.scrollY\` passes a threshold (about 320px, roughly past the hero), which animates the bar up into view. Hiding it again above the threshold means it tucks away at the very top of the page — so the hero is never covered, and the CTA only appears once the visitor has engaged enough to scroll.

**Performance: throttling with requestAnimationFrame**

Scroll events fire rapidly, so doing layout work on each one causes jank. The handler is throttled with a \`ticking\` flag and \`requestAnimationFrame\`: when a scroll fires, it schedules at most one update per frame and ignores further events until that frame runs. This is the standard pattern for cheap, smooth scroll-driven UI — the toggle never runs more than ~60 times a second regardless of how fast the user scrolls.

**Smooth slide with a single transform**

The show/hide is a pure CSS transition on \`transform\` (a \`translate\` from off-screen to resting) plus opacity, with an ease-out cubic-bezier so the bar glides in and settles. Animating only transform and opacity keeps the motion on the compositor and jank-free. The bar uses \`backdrop-filter: blur\` over a translucent background for a modern glass look that sits well over any content scrolling behind it.

**Dismissable, and it stays dismissed**

A "Maybe later" button sets a \`dismissed\` flag and adds an \`is-dismissed\` class that slides the bar away and disables its pointer events; the scroll handler then early-returns so it never reappears for the rest of the session. Respecting a dismissal is what separates a helpful sticky CTA from an annoying one — in production you'd persist the flag to \`localStorage\` so it stays hidden across visits.

**Responsive content**

The bar holds a headline, a supporting line, and two actions. On narrow screens a media query drops the secondary text and the ghost button so the primary action always fits, and the supporting line truncates with an ellipsis rather than wrapping. This keeps the bar a single tidy row at every width.

**Customizing it**

Change the scroll threshold, the bar copy, or the gradient on the primary button; persist the dismissal to storage; or trigger the reveal from an \`IntersectionObserver\` on the hero instead of a pixel value. Pair it with an [announcement bar](/ui-snippets/announcement-bar/) at the top, an [exit intent popup](/ui-snippets/exit-intent-popup/), or a [cookie banner](/ui-snippets/cookie-banner/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A tall page renders with no bar visible.` },
      { title: 'Scroll down', text: `Past the hero, the CTA bar slides up.` },
      { title: 'Scroll back to top', text: `The bar tucks away again.` },
      { title: 'Click Maybe later', text: `The bar dismisses and stays hidden.` },
      { title: 'Tune the threshold', text: `Change SHOW_AFTER for an earlier or later reveal.` },
      { title: 'Edit the copy', text: `Swap the headline and button labels.` },
    ] },
    features: [
      { title: 'Scroll-threshold reveal', text: `Appears once past the hero, hides at the top.` },
      { title: 'rAF-throttled scroll', text: `At most one update per frame.` },
      { title: 'Compositor animation', text: `Only transform and opacity move.` },
      { title: 'Glass bar', text: `backdrop-filter blur over translucency.` },
      { title: 'Dismissable', text: `Stays gone for the session once closed.` },
      { title: 'Responsive row', text: `Drops secondary content on small screens.` },
      { title: 'Non-blocking', text: `No modal overlay or scroll lock.` },
      { title: 'Storage-ready', text: `Dismissal flag is easy to persist.` },
    ],
    useCases: [
      { title: 'Trial prompts', text: `Convert readers past a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Top + bottom combo', text: `Pair with an [announcement bar](/ui-snippets/announcement-bar/).` },
      { title: 'Exit recovery', text: `Complement an [exit intent popup](/ui-snippets/exit-intent-popup/).` },
      { title: 'Consent', text: `Layer above a [cookie banner](/ui-snippets/cookie-banner/).` },
      { title: 'Promotions', text: `Run a limited offer beside a [trial countdown](/ui-snippets/trial-countdown/).` },
      { title: 'Newsletter', text: `Nudge signups for a [newsletter signup](/ui-snippets/newsletter-signup/).` },
      { icon: 'CODE', title: 'Related: Marquee Footer', desc: 'See the [Marquee Footer](/ui-snippets/marquee-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'When does the bar appear?', a: `It starts off-screen and at opacity 0. A scroll handler adds the is-shown class once window.scrollY passes a threshold of about 320px — roughly past the hero — and removes it above the threshold so the bar tucks away at the very top. The CTA only shows once the visitor has scrolled enough to engage.` },
      { q: 'Why throttle the scroll handler?', a: `Scroll events fire many times a second, and doing work on each causes jank. A ticking flag with requestAnimationFrame schedules at most one update per frame and ignores further events until it runs, so the toggle never executes more than about 60 times a second no matter how fast the user scrolls. This is the standard pattern for smooth scroll-driven UI.` },
      { q: 'Does the bar stay closed once dismissed?', a: `Yes. Maybe later sets a dismissed flag and adds an is-dismissed class that slides the bar away and disables its pointer events, and the scroll handler early-returns while dismissed so it never reappears for the session. To persist it across visits, store the flag in localStorage and check it on load.` },
      { q: 'Why does it slide so smoothly?', a: `The show and hide are a single CSS transition on transform and opacity with an ease-out cubic-bezier, so the bar glides in and settles. Animating only transform and opacity keeps the motion on the GPU compositor and avoids layout work, so it stays smooth even while the page scrolls behind it.` },
      { q: 'How do I use this sticky CTA footer in React, Vue, or Angular?', a: `Keep shown and dismissed in state. Add a throttled scroll listener in a mount effect (and remove it on cleanup) that sets shown from scrollY, and render the is-shown/is-dismissed classes from state. Persist dismissed to localStorage in the click handler. The transform and glass CSS port unchanged; in Tailwind use translate and backdrop-blur utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the throttling logic on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the ticking flag combined with requestAnimationFrame guarantees at most one update per frame regardless of how many scroll events fire, and why SHOW_AFTER is compared against window.scrollY rather than an IntersectionObserver on the hero. The same assistant can help optimize it — for instance whether reading scrollHeight or other layout properties inside the handler would reintroduce jank, or whether the threshold should scale with viewport height instead of a fixed pixel value. It's also useful for extending the bar: ask it to persist the dismissed flag to localStorage so it stays hidden across visits, add a slide-out auto-hide after a timeout, or swap the scroll threshold for an IntersectionObserver watching the hero section. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-triggered "sticky CTA footer" bar in plain HTML, CSS, and JavaScript using a throttled scroll listener — no IntersectionObserver, no animation library.

Requirements:
- A floating bar fixed near the bottom of the viewport, centered horizontally, starting fully hidden via a translate transform that pushes it below the viewport plus opacity 0.
- An is-shown class that animates the bar to its resting translate position and opacity 1 using a CSS transition with an ease-out cubic-bezier curve, and a separate is-dismissed class that pushes it back down and disables pointer-events.
- A single numeric threshold constant (e.g. a SHOW_AFTER pixel value) that controls how far the user must scroll before the bar appears; the bar must add is-shown only once window.scrollY exceeds that value and remove it when scrolling back above the threshold.
- The scroll event handler itself must not do any layout work directly — instead it should set a boolean ticking flag, schedule the actual class-toggle logic inside a requestAnimationFrame callback, and reset the flag when that callback runs, so the toggle logic executes at most once per animation frame no matter how many native scroll events fire in between.
- A dismiss button that sets a dismissed flag, forces the bar into its is-dismissed state, and makes the scroll handler's update function return immediately for the rest of the session whenever that flag is set.
- On narrow viewports, use a media query to drop secondary text and a secondary button so only the primary call-to-action remains visible in the bar.`,
    },
  },
};

export default stickyCtaFooter;
