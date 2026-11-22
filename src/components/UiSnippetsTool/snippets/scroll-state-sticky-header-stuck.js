const scrollStateStickyHeaderStuck = {
  id: 'scroll-state-sticky-header-stuck',
  title: 'Sticky Header Shadow on Scroll: CSS scroll-state stuck',
  lastmod: '2026-11-22',
  category: 'navigation',
  html: `<div class="ss-wrap">
  <div class="ss-promo">New: audit logs are now included on every plan</div>
  <div class="ss-bar-host">
    <header class="ss-bar">
      <strong class="ss-logo">Northline</strong>
      <nav aria-label="Main"><a href="#ssA">Plans</a><a href="#ssB">Security</a><a href="#ssC">Support</a></nav>
      <span class="ss-state" id="ssState">Not stuck</span>
    </header>
  </div>
  <main class="ss-main">
    <h1>A header that knows it is stuck</h1>
    <p class="ss-lead">Scroll. The top bar shrinks and gains a shadow only while it is stuck, and each section title below lights up while it is pinned. No scroll listener is involved.</p>

    <section id="ssA">
      <div class="ss-sec-host"><h2 class="ss-sec">1. Plans</h2></div>
      <p>The Starter plan covers one workspace and five seats. Teams that outgrow it move to Growth, which adds shared libraries and an audit log that keeps ninety days of history.</p>
      <p>Annual billing takes two months off the price, and you can switch between plans at the start of any billing period without losing data.</p>
      <p>Enterprise adds single sign-on, a named contact and a data-processing agreement ready to sign.</p>
    </section>
    <section id="ssB">
      <div class="ss-sec-host"><h2 class="ss-sec">2. Security</h2></div>
      <p>Data is encrypted in transit and at rest. Backups run every night and are kept for thirty days in a second region.</p>
      <p>Access to production needs a hardware key, and every change is reviewed by a second engineer before it ships.</p>
      <p>An independent penetration test is carried out every year, and a summary is available on request.</p>
    </section>
    <section id="ssC">
      <div class="ss-sec-host"><h2 class="ss-sec">3. Support</h2></div>
      <p>Chat is staffed from eight until eight on weekdays, and email is answered within a few hours.</p>
      <p>Critical incidents have an on-call engineer at any hour. Status updates are posted to the status page as they happen.</p>
      <p>The help centre has guides for importing data, setting up single sign-on and exporting everything you own.</p>
    </section>
  </main>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:#f5f7fb;color:#1d2433}

/* 1. The sticky element's WRAPPER is the scroll-state container. */
.ss-promo{padding:10px 24px;background:#1d2433;color:#e8ecf8;font-size:13px;font-weight:600;text-align:center}
.ss-bar-host{position:sticky;top:0;z-index:10;container-type:scroll-state}
.ss-bar{display:flex;align-items:center;gap:22px;padding:22px 24px;background:#fff;border-bottom:1px solid transparent;transition:padding .25s,box-shadow .25s,border-color .25s}
.ss-logo{font-size:20px;letter-spacing:-.02em}
.ss-bar nav{display:flex;gap:18px;margin-left:12px}
.ss-bar nav a{color:#4b5570;text-decoration:none;font-weight:600;font-size:15px}
.ss-bar nav a:hover{color:#1d2433}
.ss-bar a:focus-visible{outline:3px solid #4f6df5;outline-offset:3px;border-radius:4px}
.ss-state{margin-left:auto;font:700 12px ui-monospace,Menlo,monospace;padding:5px 10px;border-radius:99px;background:#e9edf8;color:#4b5570}

/* 2. Styles that apply only while the wrapper is stuck to the top */
@container scroll-state(stuck: top){
  .ss-bar{padding:10px 24px;box-shadow:0 8px 24px rgb(30 40 80 / .12);border-color:#e3e8f4}
  .ss-state{background:#4f6df5;color:#fff}
  .ss-state::after{content:' to top'}
}
.ss-state::after{content:''}

.ss-main{max-width:700px;margin:0 auto;padding:40px 20px 400px}
h1{font-size:clamp(28px,5vw,40px);letter-spacing:-.02em;line-height:1.1}
.ss-lead{margin:14px 0 34px;color:#58627c;line-height:1.65}
section{margin-bottom:40px}
section p{margin:0 0 14px;line-height:1.7;color:#3b4560}

/* 3. Section titles stick under the header and react to being stuck */
.ss-sec-host{position:sticky;top:56px;z-index:5;container-type:scroll-state}
.ss-sec{padding:12px 16px;margin:0 -16px 14px;font-size:20px;background:#f5f7fb;border-radius:10px;transition:background .2s,color .2s}
@container scroll-state(stuck: top){
  .ss-sec{background:#4f6df5;color:#fff}
}
@media (prefers-reduced-motion:reduce){.ss-bar,.ss-sec{transition:none}}`,

  js: `// The visual change is pure CSS where scroll-state container queries exist (Chrome 133+).
// A sticky element that stays fully visible never fires an IntersectionObserver, so the badge watches the banner
// ABOVE the header instead: once the banner has scrolled away, the header is pinned. Without scroll-state support,
// the same observer also applies the compact padding and shadow with inline styles.
var state = document.getElementById('ssState');
var bar = document.querySelector('.ss-bar');
var promo = document.querySelector('.ss-promo');
var supported = CSS.supports('container-type', 'scroll-state');
new IntersectionObserver(function (entries) {
  var stuck = !entries[0].isIntersecting;
  state.firstChild.nodeValue = stuck ? 'Stuck' : 'Not stuck';
  if (!supported) {
    bar.style.padding = stuck ? '10px 24px' : '';
    bar.style.boxShadow = stuck ? '0 8px 24px rgba(30,40,80,.12)' : '';
  }
}).observe(promo);`,

  seo: {
    title: 'Sticky Header Shadow on Scroll: CSS scroll-state stuck',
    description: `Free sticky header that shrinks and adds a shadow only while stuck, using CSS scroll-state container queries and no scroll listener. Includes a safe fallback.`,
    about: {
      title: 'Knowing When a Sticky Element Is Actually Stuck',
      description: `\`position: sticky\` has always been unable to tell you whether it is currently stuck. Developers worked around it with scroll listeners or an IntersectionObserver and a sentinel element. Scroll-state container queries answer it in CSS: make the sticky element's parent a \`container-type: scroll-state\` container, then write \`@container scroll-state(stuck: top)\`. This snippet uses it for a site header and for section titles.

**The container goes on the wrapper**

A scroll-state container query cannot style the container itself, only its descendants. So the sticky element is a wrapper (\`.ss-bar-host\`) and the visible header sits inside it. When the wrapper sticks, the header inside shrinks its padding, gains a shadow and a border, and the status badge turns blue.

**Section titles that react**

Each \`h2\` has its own sticky wrapper at \`top: 56px\`, under the header. While a title is pinned it gets a solid accent background, so readers see which section they are inside, and it reverts when the next section's title takes over.

**Other states**

The same query supports \`snapped\` for scroll-snap items, \`scrollable\` for edges that can still scroll, and \`stuck\` on the other sides, which is how "more content" fades and active carousel slides are made without script.

**Only transform and paint**

The shrink uses padding for clarity, but a shadow, colour and border are all paint-only. For heavy headers animate transform or use a taller sticky wrapper so the layout around it does not shift.

**Fallback**

If \`container-type: scroll-state\` is not supported, an IntersectionObserver watches a one-pixel sentinel and applies the same padding and shadow with inline styles. For a progress-style reading cue see the [scroll progress ring](/ui-snippets/css-native-scroll-progress-ring/).

**Accessibility notes**

The sticky header keeps its landmark navigation and visible focus styles in both states, nothing is hidden when it shrinks, and the status badge is decorative. Do not make a sticky header so tall that it covers focused elements: pair it with scroll-padding-top on the page so anchor links and keyboard focus land below it.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Wrap the sticky element', text: 'Put position: sticky; top: 0 on a wrapper such as .ss-bar-host, and put the visible header inside it.' },
      { title: 'Make the wrapper a container', text: 'Add container-type: scroll-state to the wrapper. A container cannot style itself, which is why the header is a child.' },
      { title: 'Write the stuck styles', text: '@container scroll-state(stuck: top) { .ss-bar { padding: 10px 24px; box-shadow: ... } } applies only while pinned.' },
      { title: 'Stack section titles', text: 'Give each h2 wrapper its own position: sticky with a top under the header, and the same container type, for pinned-title highlighting.' },
      { title: 'Add transitions to the base style', text: 'Put transition on the normal state so the change eases both ways when the element sticks and unsticks.' },
      { title: 'Keep the fallback', text: 'The script detects missing support and uses an IntersectionObserver on a sentinel to set the same padding and shadow.' },
    ] },
    features: [
      { title: 'stuck: top query', text: 'Styles apply only while the wrapper is pinned to the top.' },
      { title: 'Shrinking header', text: 'Padding drops and a shadow appears the moment it sticks.' },
      { title: 'Pinned section titles', text: 'Each title highlights while it is the one stuck under the header.' },
      { title: 'No scroll listener', text: 'The browser tracks the state, so scrolling stays on the compositor.' },
      { title: 'Live status badge', text: 'A badge shows Stuck or Not stuck and adds "to top" when pinned.' },
      { title: 'Eased both ways', text: 'Base-state transitions animate sticking and unsticking.' },
      { title: 'Observer fallback', text: 'A sentinel and IntersectionObserver cover browsers without scroll-state.' },
      { title: 'Reduced motion', text: 'Transitions switch off for visitors who ask.' },
    ],
    useCases: [
      { title: 'Marketing and SaaS headers', text: 'Show a large header at the top and a compact one with a shadow while scrolling, a common pattern that used to cost a scroll handler on every page.' },
      { title: 'Documentation pages', text: 'Highlight the pinned section heading so readers keep their place in long reference pages.' },
      { title: 'Data tables', text: 'Add a shadow under a sticky table header only when rows are actually scrolling beneath it.' },
      { title: 'Replacing sentinel hacks', text: 'Remove the IntersectionObserver and hidden sentinel div that existed just to know whether something was stuck.' },
    ],
    faqs: [
      { q: 'Which browsers support scroll-state container queries?', a: 'Chrome and Edge from version 133. Safari and Firefox are not there yet, so the snippet falls back to an IntersectionObserver with a sentinel element that applies the same styles.' },
      { q: 'Why can I not style the sticky element directly?', a: 'A container query styles descendants of the container, never the container itself. Making the sticky wrapper the container and styling the header inside it is the standard workaround.' },
      { q: 'Can I detect other states?', a: 'Yes: snapped (for scroll-snap items, in either axis), scrollable (whether more content lies in a direction) and stuck for top, bottom, left and right. They share the same @container scroll-state() syntax.' },
      { q: 'Does it work with a sticky header taller than the viewport?', a: 'It still works, but a tall sticky header hides content. Keep the compact stuck state small, as here, and avoid layout-shifting changes where possible so the page does not jump when the state flips.' },
    ],
    aiPrompt: {
      paragraph: 'Paste this snippet into an AI coding assistant and ask it to explain why the sticky wrapper is the container and the header is its child, and what scroll-state(stuck: top) matches. Useful follow-ups: add a scrollable fade to a table, highlight the snapped card in a carousel with scroll-state(snapped: x), or hide the header on scroll down. Ask it to keep the observer fallback.',
      prompt: `Build a sticky header and sticky section titles that react when stuck, using CSS scroll-state container queries, in plain HTML, CSS and JavaScript.

Requirements:
- A wrapper div (position: sticky; top: 0; container-type: scroll-state) containing a header with a logo, three links and a status badge.
- @container scroll-state(stuck: top) styles that shrink the header padding, add a box-shadow and border colour, and change the badge to the accent colour with " to top" appended. Add transitions to the normal state.
- A long article with three sections; each h2 sits in its own sticky wrapper (top just below the header, container-type: scroll-state) and gets an accent background while stuck.
- Fallback script: if !CSS.supports('container-type', 'scroll-state'), use an IntersectionObserver on a 1px sentinel to set the compact padding and shadow with inline styles and update the badge text. When supported, use a light observer only to update the badge text.
- Respect prefers-reduced-motion, use visible focus styles on links and work at phone width.`,
    },
  },
};

export default scrollStateStickyHeaderStuck;
