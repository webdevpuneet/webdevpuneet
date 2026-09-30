const scrollProgressFooter = {
  id: 'scroll-progress-footer',
  title: 'Scroll Progress Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<div class="spf-page" id="spfPage">
  <main class="spf-content">
    <h1>Scroll down</h1>
    <p>The ring in the footer's corner fills as you scroll through the page, and jumps you back to the top when clicked.</p>
    <div class="spf-spacer"></div>
    <h2>Keep going</h2>
    <p>It reads real scroll position, not a fixed animation — try scrolling fast, slow, or with the keyboard.</p>
    <div class="spf-spacer"></div>
    <h2>Almost there</h2>
    <div class="spf-spacer small"></div>
  </main>

  <footer class="spf">
    <div class="spf-inner">
      <span class="spf-brand">◆ Fluxly</span>
      <div class="spf-cols">
        <div class="spf-col"><h4>Product</h4><a href="#">Features</a><a href="#">Pricing</a></div>
        <div class="spf-col"><h4>Company</h4><a href="#">About</a><a href="#">Blog</a></div>
        <div class="spf-col"><h4>Legal</h4><a href="#">Privacy</a><a href="#">Terms</a></div>
      </div>
      <span class="spf-copy">© 2026 Fluxly, Inc.</span>
    </div>
  </footer>

  <button class="spf-top" id="spfTop" aria-label="Back to top" title="Back to top">
    <svg class="spf-ring" width="52" height="52" viewBox="0 0 52 52">
      <circle class="spf-track" cx="26" cy="26" r="22" />
      <circle class="spf-prog" id="spfProg" cx="26" cy="26" r="22" />
    </svg>
    <svg class="spf-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
  </button>
</div>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f1e;color:#f1f5f9}

.spf-page{position:relative}
.spf-content{max-width:640px;margin:0 auto;padding:60px 24px}
.spf-content h1{font-size:28px;font-weight:800;margin-bottom:12px}
.spf-content h2{font-size:20px;font-weight:700;margin-bottom:10px;color:#e2e8f0}
.spf-content p{color:#94a3b8;line-height:1.7;font-size:14px}
.spf-spacer{height:60vh}
.spf-spacer.small{height:20vh}

.spf{border-top:1px solid rgba(255,255,255,0.08)}
.spf-inner{max-width:640px;margin:0 auto;padding:36px 24px;display:flex;align-items:flex-start;justify-content:space-between;gap:24px;flex-wrap:wrap}
.spf-brand{font-weight:800;color:#f1f5f9;font-size:15px}
.spf-cols{display:flex;gap:36px}
.spf-col{display:flex;flex-direction:column;gap:8px}
.spf-col h4{font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:#64748b;margin-bottom:2px}
.spf-col a{font-size:13px;color:#94a3b8;text-decoration:none;transition:color .15s}
.spf-col a:hover{color:#f1f5f9}
.spf-copy{font-size:12px;color:#475569;width:100%}

.spf-top{position:fixed;right:24px;bottom:24px;width:52px;height:52px;border:none;background:none;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .25s,transform .25s}
.spf-top.visible{opacity:1;pointer-events:all;transform:translateY(0)}
.spf-ring{position:absolute;inset:0;transform:rotate(-90deg)}
.spf-track{fill:#0a0f1e;stroke:rgba(255,255,255,0.1);stroke-width:2.5}
.spf-prog{fill:none;stroke:#818cf8;stroke-width:2.5;stroke-linecap:round;stroke-dasharray:138.23;stroke-dashoffset:138.23;transition:stroke-dashoffset .1s linear}
.spf-arrow{position:relative;color:#f1f5f9;transition:transform .15s}
.spf-top:hover .spf-arrow{transform:translateY(-2px)}

@media (max-width:560px){
  .spf-inner{flex-direction:column}
  .spf-cols{gap:24px}
}
@media (prefers-reduced-motion: reduce){
  .spf-prog{transition:none}
}`,
  js: `var page = document.getElementById('spfPage');
var ring = document.getElementById('spfProg');
var btn  = document.getElementById('spfTop');
var CIRC = 2 * Math.PI * 22;

function onScroll() {
  var max = page.scrollHeight - window.innerHeight;
  var pct = max > 0 ? Math.min(1, window.scrollY / max) : 0;
  ring.style.strokeDashoffset = (CIRC * (1 - pct)).toFixed(2);
  btn.classList.toggle('visible', window.scrollY > 240);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

btn.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});`,
  seo: {
    title: 'Scroll Progress Footer — Free HTML CSS JS Back-to-Top Ring Snippet',
    description: 'A footer paired with a fixed back-to-top button whose ring fills to match real scroll position — the SVG stroke-dash technique, no library. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Scroll Progress Footer — A Back-to-Top Button That Tells You Where You Are',
      description: `A plain back-to-top button answers one question — "can I get to the top?" — but says nothing about how far down the page you actually are. This snippet pairs a standard footer with a fixed corner button whose ring fills to the exact percentage of the page you've scrolled, using the same SVG stroke-dash technique as the [Download Button](/ui-snippets/download-button/)'s progress ring, driven here by scroll position instead of a timer.

**Two concentric circles, one static track and one animated arc**

The button is two SVG \`<circle>\` elements sharing the same centre and radius: \`.spf-track\` is a faint, always-full ring that shows the button's total circumference, and \`.spf-prog\` sits on top with \`stroke-dasharray\` set to the circle's exact circumference (\`2πr\`, computed once in JS as \`CIRC\`) and \`stroke-dashoffset\` animated toward zero as the arc "draws in." Rotating the whole SVG \`-90deg\` makes the arc start filling from 12 o'clock rather than 3 o'clock, the same convention used in most native progress rings.

**Scroll position, converted to a fraction, converted to an offset**

On every \`scroll\` event, \`onScroll()\` computes \`max = page.scrollHeight - window.innerHeight\` — the total distance the page can actually scroll — and divides the current \`window.scrollY\` by it to get a 0–1 fraction. That fraction becomes \`strokeDashoffset = CIRC * (1 - pct)\`: at the top of the page the offset equals the full circumference (an empty ring), and at the bottom it's zero (a complete ring). A short \`.1s linear\` CSS transition on the property smooths out the otherwise-jittery per-scroll-event updates without introducing any animation loop of its own.

**A passive listener, and no per-frame polling**

The scroll handler is registered with \`{ passive: true }\`, telling the browser it will never call \`preventDefault()\`, which lets the browser scroll immediately without waiting to see if the handler blocks it — meaningful for scroll smoothness on any page, and free here since the handler only reads scroll position. There's deliberately no \`requestAnimationFrame\` loop: the ring only needs to update when a scroll event actually fires, not every frame regardless of whether anything changed.

**Show, hide, and jump**

The button stays hidden and non-interactive (\`opacity: 0; pointer-events: none\`) until \`window.scrollY\` passes 240px, at which point a \`.visible\` class fades and slides it in — so it never crowds the very top of the page where there's nothing to scroll back to. A click calls \`window.scrollTo({ top: 0, behavior: 'smooth' })\`, the native smooth-scroll API, rather than animating scroll position by hand.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'Scroll the demo page — the ring in the bottom-right fills as you move down and appears after 240px of scroll.' },
        { title: 'Click the ring to jump to top', text: 'The page smooth-scrolls to the top using the native scrollTo API, and the ring empties back out as you go.' },
        { title: 'Adjust the appearance threshold', text: 'Change the 240 value in the JS to show the button sooner or later relative to scroll depth.' },
        { title: 'Adjust the ring size', text: 'Change the SVG width/height/radius together, and update CIRC = 2 * Math.PI * r to match the new radius exactly, or the ring will not draw correctly.' },
        { title: 'Update the footer content', text: 'Replace the brand, link columns, and copyright in the footer with your own — the ring is a separate, independent fixed element.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'SVG stroke-dasharray/stroke-dashoffset ring reused from the Download Button\'s progress technique',
      'Ring fill tracks real scroll percentage, not a fixed-duration animation',
      'Passive scroll listener with no requestAnimationFrame polling loop',
      'Button fades and slides in only after meaningful scroll depth, not immediately',
      'Native window.scrollTo smooth-scroll on click — no manual scroll animation',
      'prefers-reduced-motion aware — the ring still fills, without the smoothing transition',
    ],
    useCases: [
      { icon: 'CODE', title: 'Documentation and long-form article pages', desc: 'Give readers a persistent sense of how much content remains, doubling as a functional back-to-top control once they are done.' },
      { icon: 'LEARN', title: 'Blog posts and tutorials', desc: 'Pairs naturally with a reading-time estimate at the top of an article — the ring becomes the ongoing, live version of that same information.' },
      { icon: 'FLOW', title: 'Marketing pages with a long scroll', desc: 'Long single-page sites benefit from a persistent, low-friction way back to the navigation at the top without hunting for a header that has long since scrolled away.' },
      { icon: 'APP', title: 'SaaS changelogs and release-note feeds', desc: 'Useful on pages that are mostly one long list, where "how far down am I" is a real, recurring question for the reader.' },
      { icon: 'DESIGN', title: 'Portfolio case studies', desc: 'A subtle, premium-feeling detail for image- and content-heavy case study pages that runs several screens long.' },
      { icon: 'LEARN', title: 'Studying the SVG stroke-dash technique', desc: 'A second, real-world application of the same progress-ring math used in the Download Button — useful for seeing the technique applied to a different data source (scroll position instead of a timer).' },
      { icon: 'CODE', title: 'Related: Glass Footer', desc: 'See the [Glass Footer](/ui-snippets/glass-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the ring different from the one on the Download Button snippet?', a: 'The underlying SVG stroke-dasharray/stroke-dashoffset technique is identical, but the value driving it is different: the Download Button computes progress from an eased timer, while this ring reads real scroll position on every scroll event. There is no animation loop here at all — a CSS transition smooths the value updates instead.' },
      { q: 'Why is the scroll listener registered with { passive: true }?', a: 'It tells the browser the handler will never call preventDefault(), which lets the browser begin scrolling immediately instead of waiting to see whether the handler would block it. Since this handler only reads scroll position and never prevents default behaviour, passive mode is free correctness and free performance.' },
      { q: 'What happens if I change the ring\'s size?', a: 'You must update the CIRC constant in the JS to 2 * Math.PI * r using the new radius, matching the SVG circle\'s r attribute. The stroke-dasharray and the dashoffset math both depend on that exact circumference — mismatching them will make the ring appear to fill only partially or overshoot.' },
      { q: 'Does the button appear immediately on page load?', a: 'No — it stays hidden (opacity: 0, non-interactive) until window.scrollY passes 240px, so it never competes for attention at the very top of the page where scrolling back to the top would be meaningless.' },
      { q: 'Does this work with keyboard or programmatic scrolling, not just mouse-wheel?', a: 'Yes — the scroll event fires for any scroll source, including keyboard (Page Down, spacebar, arrow keys), touch, and JavaScript-driven scrollTo calls elsewhere on the page, since the handler simply reads window.scrollY whenever the browser fires the event.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Attach the scroll listener inside the mount lifecycle (useEffect in React, onMounted in Vue) and return/clean up the listener on unmount to avoid updating state after the component is gone.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why stroke-dashoffset is set to CIRC * (1 - pct) rather than CIRC * pct — the sign matters, and walking through why makes the stroke-dasharray/stroke-dashoffset mental model click for any future progress-ring work. It is also a good candidate for a performance discussion: ask whether the scroll handler should be throttled or debounced given that scroll events can fire dozens of times per second, and whether the current approach (updating a CSS custom property every event, relying on a short CSS transition to smooth it) is preferable to manually throttling with requestAnimationFrame. For extending it, ask for a version that also displays the scroll percentage as text inside the ring, or one that changes the ring's colour as it approaches 100% to signal "you've reached the end."`,
      prompt: `Build a website footer paired with a fixed "scroll progress" back-to-top button, in plain HTML, CSS, and vanilla JavaScript — no library.

Requirements:
- A standard footer (brand, a couple of link columns, copyright) at the bottom of a scrollable demo page with enough content to actually scroll.
- A circular button fixed to the bottom-right corner of the viewport, built from two concentric SVG circles: a faint static "track" circle and an animated "progress" circle using the stroke-dasharray/stroke-dashoffset technique, with the SVG rotated -90 degrees so the arc fills starting from 12 o'clock.
- On the window's scroll event (registered as passive), compute the scroll fraction as window.scrollY divided by (document scrollHeight minus viewport height), clamp it to 0-1, and set the progress circle's stroke-dashoffset to the circle's circumference times (1 minus that fraction), so the ring visually fills as the user scrolls down the page.
- Apply a short CSS transition (around 0.1s, linear) to stroke-dashoffset so per-scroll-event updates feel smooth rather than jittery, without using any JavaScript animation loop.
- Hide the button (zero opacity, no pointer events) until the user has scrolled past roughly 240px, then fade and slide it into view; clicking it should smooth-scroll the page to the top using the native window.scrollTo API with behavior: 'smooth'.
- Add a small up-arrow icon centered inside the ring, and add a prefers-reduced-motion media query that removes the CSS transition while keeping the ring's fill functional.`,
    },
  },
};

export default scrollProgressFooter;
