const fullscreenMenu = {
  id: 'fullscreen-menu',
  title: 'Fullscreen Menu',
  lastmod: '2026-06-23',
  category: 'navigation',
  html: `<header class="fm-bar">
  <span class="fm-logo">◆ Studio</span>
  <button type="button" class="fm-toggle" id="fmToggle" aria-label="Open menu" aria-expanded="false">
    <span></span><span></span><span></span>
  </button>
</header>

<nav class="fm-overlay" id="fmOverlay" aria-hidden="true">
  <ul class="fm-list">
    <li style="--i:1"><a href="#">Work</a></li>
    <li style="--i:2"><a href="#">Studio</a></li>
    <li style="--i:3"><a href="#">Services</a></li>
    <li style="--i:4"><a href="#">Journal</a></li>
    <li style="--i:5"><a href="#">Contact</a></li>
  </ul>
  <div class="fm-foot">hello@studio.com · +1 (555) 010-1234</div>
</nav>

<main class="fm-page">Scroll-locked behind the overlay. Click the menu icon.</main>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc}

.fm-bar{position:relative;z-index:60;display:flex;align-items:center;justify-content:space-between;padding:18px 26px}
.fm-logo{font-size:17px;font-weight:800;color:#0f172a}
.fm-toggle{width:30px;height:22px;position:relative;border:none;background:none;cursor:pointer;display:flex;flex-direction:column;justify-content:space-between}
.fm-toggle span{height:2.5px;width:100%;background:#0f172a;border-radius:2px;transition:transform .3s,opacity .2s}
.fm-toggle.fm-on span{background:#fff}
.fm-toggle.fm-on span:nth-child(1){transform:translateY(9.5px) rotate(45deg)}
.fm-toggle.fm-on span:nth-child(2){opacity:0}
.fm-toggle.fm-on span:nth-child(3){transform:translateY(-9.5px) rotate(-45deg)}

.fm-overlay{position:fixed;inset:0;z-index:50;background:#0f172a;display:flex;flex-direction:column;justify-content:center;padding:0 26px;
  clip-path:circle(0% at calc(100% - 40px) 40px);transition:clip-path .55s cubic-bezier(.7,0,.2,1)}
.fm-overlay.fm-open{clip-path:circle(150% at calc(100% - 40px) 40px)}

.fm-list{list-style:none}
.fm-list li{overflow:hidden}
.fm-list a{display:inline-block;font-size:42px;font-weight:800;color:#f8fafc;text-decoration:none;padding:6px 0;letter-spacing:-.02em;
  transform:translateY(110%);opacity:0;transition:transform .5s,opacity .5s,color .15s;transition-delay:0s}
.fm-list a:hover{color:#818cf8}
.fm-open .fm-list a{transform:none;opacity:1;transition-delay:calc(.18s + var(--i) * .07s)}
.fm-foot{position:absolute;bottom:28px;left:26px;color:#64748b;font-size:13px;font-weight:600;opacity:0;transition:opacity .4s;transition-delay:.5s}
.fm-open .fm-foot{opacity:1}

.fm-page{padding:60px 26px;color:#94a3b8;font-size:15px;font-weight:600}
@media (max-width:560px){.fm-list a{font-size:32px}}`,

  js: `var toggle = document.getElementById('fmToggle');
var overlay = document.getElementById('fmOverlay');

function open() {
  overlay.classList.add('fm-open');
  toggle.classList.add('fm-on');
  toggle.setAttribute('aria-expanded', 'true');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';   // lock scroll behind the overlay
}
function close() {
  overlay.classList.remove('fm-open');
  toggle.classList.remove('fm-on');
  toggle.setAttribute('aria-expanded', 'false');
  overlay.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

toggle.addEventListener('click', function () {
  toggle.classList.contains('fm-on') ? close() : open();
});

// Close on Escape and after choosing a link.
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
overlay.addEventListener('click', function (e) { if (e.target.tagName === 'A') close(); });`,

  seo: {
    title: 'Fullscreen Menu — Animated Nav Overlay HTML CSS JS',
    description: `A fullscreen nav overlay that reveals with a clip-path circle, staggered links, an animated hamburger, and scroll lock. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Fullscreen Menu — Clip-Path Circle Reveal with Staggered Nav Links',
      description: `A fullscreen menu is the bold navigation pattern where tapping the hamburger expands a full-viewport overlay of large links — common on agency, portfolio, and editorial sites. This snippet builds it in plain HTML, CSS, and vanilla JavaScript: a clip-path circle reveal from the menu button, links that stagger in, an animated hamburger-to-X, scroll lock, and the expected close behaviours — no library.

**A circular clip-path reveal**

Instead of a plain fade, the overlay reveals with an expanding circle: \`clip-path: circle(0% at …)\` anchored at the menu button's position grows to \`circle(150% …)\` on open, so the menu appears to spread out from the button the user tapped. Animating \`clip-path\` is GPU-friendly and far more distinctive than opacity alone — it's the signature "wipe open from the corner" effect, and anchoring the circle at the button ties the overlay's origin to the trigger.

**Staggered link entrance**

The nav links don't all appear at once. Each \`<li>\` carries a custom property \`--i\` (its index), and the open state translates each link up into place with a \`transition-delay\` of \`base + i × step\` — so they cascade in one after another. Driving the stagger with a CSS custom property and \`calc()\` means the delay is data-free CSS (no per-link JavaScript), and adding a link is just another \`<li>\` with the next index. The links start translated down and clipped by their \`overflow: hidden\` parent, so they rise into view like a reveal.

**Hamburger that becomes an X**

The toggle's three bars animate into a close X: the top and bottom bars translate to the centre and rotate ±45°, the middle fades out. This morph is pure CSS driven by an \`fm-on\` class, and the bars switch colour to stay visible against the dark overlay. A single toggle handler opens or closes based on the current state.

**Scroll lock and accessible close**

Opening sets \`body { overflow: hidden }\` so the page behind can't scroll — essential for a full-viewport overlay, or the background scrolls under the menu. The overlay closes on Escape, on choosing any link, and on the toggle, all routed through one \`close()\` that also restores scroll, resets the hamburger, and updates \`aria-expanded\`/\`aria-hidden\` so the state is announced to assistive tech.

**Drop-in and adaptable**

It's a complete navigation overlay — wire the links to your routes, restyle the type and colours, and adjust the clip-path origin to your button's position. It's a clear reference for clip-path reveals, CSS custom-property staggering, and the scroll-lock-and-close lifecycle every fullscreen menu needs.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A header with a hamburger renders; the page sits behind a hidden fullscreen overlay.` },
      { title: 'Open the menu', text: `Click the hamburger — the overlay wipes open in a circle from the button and links stagger in.` },
      { title: 'Close it', text: `Press Escape, click the X, or choose a link; the overlay wipes closed and scroll unlocks.` },
      { title: 'Wire your links', text: `Replace the nav items with your routes; add an <li> with the next --i to extend.` },
      { title: 'Adjust the origin', text: `Match the clip-path circle's "at" position to your menu button's location.` },
      { title: 'Restyle it', text: `Change the overlay colour, link type size, and stagger timing to fit your brand.` },
    ] },
    features: [
      { title: 'Clip-path circle reveal', text: `The overlay wipes open from the button via an animated clip-path circle — GPU-friendly.` },
      { title: 'CSS custom-property stagger', text: `Each link's --i index drives a calc() transition-delay, so they cascade in with no per-link JS.` },
      { title: 'Rise-into-view links', text: `Links start translated down and clipped, then rise as they fade in.` },
      { title: 'Animated hamburger → X', text: `Three bars morph into a close X via a class, switching colour over the dark overlay.` },
      { title: 'Scroll lock', text: `Opening locks body scroll so the background can't move behind the overlay.` },
      { title: 'Multiple close paths', text: `Escape, link click, and the toggle all close through one close() that restores scroll.` },
      { title: 'Accessible state', text: `aria-expanded and aria-hidden update so the overlay is announced correctly.` },
      { title: 'Drop-in & no library', text: `A complete nav overlay in plain HTML/CSS/JS — zero dependencies.` },
    ],
    useCases: [
      { title: 'Agency and portfolio sites', text: `A bold full-viewport nav — pair with a [portfolio hero](/ui-snippets/portfolio-hero/) behind it.` },
      { title: 'Editorial and brand sites', text: `Large-type navigation for a striking first impression, alongside a [mega menu](/ui-snippets/mega-menu/) for content-heavy sites.` },
      { title: 'Mobile navigation', text: `A full-screen menu is ideal on phones, next to a [hamburger nav](/ui-snippets/hamburger-nav/) for simpler bars.` },
      { title: 'Landing and campaign pages', text: `Minimal header that expands to full nav on demand.` },
      { title: 'Product and launch sites', text: `A dramatic menu that matches a bold visual design.` },
      { title: 'Learning clip-path & stagger', text: `A reference for clip-path reveals and CSS stagger — compare with a [side drawer](/ui-snippets/side-drawer/).` },
      { icon: 'CODE', title: 'Related: Long-Press Preview (iOS-Style Peek)', desc: 'See the [Long-Press Preview (iOS-Style Peek)](/ui-snippets/long-press-tooltip-preview/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the circular reveal work?', a: `The overlay has clip-path: circle(0% at <button position>) when closed, which clips it to nothing, and circle(150% at <same position>) when open, which expands the visible circle beyond the viewport. A CSS transition animates clip-path between the two, so the menu appears to wipe open from the button. Anchoring the circle's centre at the menu button ties the reveal's origin to the trigger.` },
      { q: 'How do the links stagger without per-link JavaScript?', a: `Each <li> sets a CSS custom property --i to its index. The open state applies transition-delay: calc(base + var(--i) * step) to each link, so link 1 animates slightly before link 2, and so on — a cascade. Because the delay is computed in CSS from the index, there's no JavaScript timing per link; adding a link is just another <li> with the next --i value.` },
      { q: 'Why lock body scroll when the menu is open?', a: `A fullscreen overlay covers the viewport, but without locking scroll the page behind it still scrolls when the user swipes or scrolls over the menu — which feels broken and can move the background out from under the links. Setting body { overflow: hidden } on open (and restoring it on close) freezes the page behind the overlay. close() always restores it so scroll never gets stuck off.` },
      { q: 'Is the menu accessible?', a: `The toggle is a real button with aria-label and aria-expanded that flips on open/close, and the overlay's aria-hidden updates so assistive tech knows whether it's active. Escape closes it, matching keyboard convention. For full robustness you'd also trap focus within the open overlay and return focus to the toggle on close — a small addition on top of this foundation.` },
      { q: 'How do I use this fullscreen menu in React, Vue, or Angular?', a: `Hold an open boolean in state and toggle classes/aria from it; lock body scroll in an effect when open. In React use useState plus a useEffect for the Escape listener and scroll lock; in Vue, a ref with onMounted/onUnmounted; in Angular, a property with HostListener. The clip-path and stagger CSS are framework-agnostic — only the open state and listeners move into the framework.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the clip-path geometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why circle(0%) and circle(150%) are anchored at the same fixed point rather than a percentage-based one, and how the --i custom property combined with a calc() transition-delay produces the letter-by-letter... actually link-by-link cascade without any per-link JavaScript timing. The same assistant can help optimize it — ask whether animating clip-path at this scale has any jank risk on lower-end mobile devices compared to a transform-based alternative, or whether the scroll-lock approach using body overflow hidden causes a layout shift from the disappearing scrollbar that should be compensated for. It's also useful for extending the menu: have it add a focus trap so Tab cycles only within the open overlay, a nested submenu that reveals with its own stagger, or a second clip-path shape (from center instead of a corner) for a different open origin. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a fullscreen navigation menu overlay that reveals with a circular clip-path wipe, in plain HTML, CSS, and JavaScript — no libraries.

Requirements:
- A header with a logo and a hamburger toggle button built from three stacked bar elements (not an icon font or SVG), plus a full-viewport overlay containing a vertical list of large navigation links and a footer line, both hidden by default.
- The overlay's closed state must use CSS clip-path set to a circle with a 0% radius anchored at a fixed point matching the toggle button's approximate position; its open state (driven by a single class toggle) must expand that same circle to a radius large enough to cover the entire viewport regardless of screen size, transitioning between the two with an eased CSS transition on clip-path only.
- Each navigation link's list item must carry its own index as a CSS custom property. In the closed state, links must be translated downward and fully transparent; in the open state, every link must translate to its resting position and fade in, with each link's transition-delay computed from its index via calc() so the links visibly cascade into view one after another — no JavaScript may set individual per-link timing.
- The hamburger toggle must morph into an X purely via CSS driven by one class: the top and bottom bars rotate roughly 45 degrees in opposite directions and translate to meet in the middle, the middle bar fades out, and all bars switch to a color visible against the overlay's dark background once open.
- Toggling open must lock the page's own scrolling (so the background can never scroll behind the overlay) and toggle appropriate aria-expanded/aria-hidden attributes; toggling closed must restore scrolling. The overlay must close via the toggle button, via the Escape key, and via clicking any navigation link — all three paths must route through one shared close function so scroll-lock and attribute state can never drift out of sync between them.`,
    },
  },
};

export default fullscreenMenu;
