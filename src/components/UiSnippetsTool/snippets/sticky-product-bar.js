const stickyProductBar = {
  id: 'sticky-product-bar',
  title: 'Sticky Product Bar',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<div class="spb-page">
  <div class="spb-bar" id="spbBar">
    <div class="spb-bar-inner">
      <div class="spb-bar-info">
        <span class="spb-thumb">A</span>
        <div class="spb-bar-text">
          <span class="spb-bar-name">Aero Running Shoe</span>
          <span class="spb-bar-price">$129.00</span>
        </div>
      </div>
      <button class="spb-bar-cta" type="button">Add to cart</button>
    </div>
  </div>

  <header class="spb-hero" id="spbHero">
    <div class="spb-hero-img">A</div>
    <div class="spb-hero-info">
      <span class="spb-tag">New</span>
      <h1 class="spb-name">Aero Running Shoe</h1>
      <div class="spb-stars">★★★★★ <span>(218 reviews)</span></div>
      <p class="spb-price">$129.00</p>
      <p class="spb-desc">A featherweight daily trainer with responsive cushioning and a breathable knit upper. Built for the long run.</p>
      <button class="spb-cta" type="button">Add to cart</button>
    </div>
  </header>

  <section class="spb-body">
    <h2>Details</h2>
    <p>Scroll down — once the main Add to cart button leaves the viewport, a compact sticky bar slides in from the top so the price and CTA are always one tap away.</p>
    <p>This is the standard product-detail-page pattern used by Apple, Nike, and most modern storefronts to keep conversion within reach during long pages.</p>
    <p>The bar uses an IntersectionObserver watching the hero CTA, so there is no scroll-event listener doing work on every frame.</p>
    <p>Keep scrolling to confirm the bar stays pinned, then scroll back up to watch it slide away when the hero button returns.</p>
    <div class="spb-spacer">More content…</div>
  </section>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; color: #0f172a; }

.spb-page { max-width: 720px; margin: 0 auto; }

.spb-bar {
  position: fixed; top: 0; left: 0; right: 0; z-index: 50;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid #e8edf3;
  transform: translateY(-100%);
  transition: transform 0.32s cubic-bezier(0.32, 0.72, 0, 1);
}
.spb-bar.visible { transform: translateY(0); }
.spb-bar-inner { max-width: 720px; margin: 0 auto; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 10px 20px; }
.spb-bar-info { display: flex; align-items: center; gap: 12px; min-width: 0; }
.spb-thumb { width: 38px; height: 38px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: #fff; font-weight: 800; border-radius: 9px; }
.spb-bar-text { display: flex; flex-direction: column; min-width: 0; }
.spb-bar-name { font-size: 13.5px; font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.spb-bar-price { font-size: 12.5px; color: #64748b; }
.spb-bar-cta { flex-shrink: 0; padding: 9px 18px; background: #6366f1; color: #fff; border: none; border-radius: 9px; font-family: inherit; font-size: 13.5px; font-weight: 700; cursor: pointer; transition: background 0.15s; }
.spb-bar-cta:hover { background: #4f46e5; }

.spb-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; padding: 40px 20px 30px; align-items: center; }
.spb-hero-img { aspect-ratio: 1/1; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 84px; font-weight: 800; color: #fff; background: linear-gradient(135deg, #6366f1, #8b5cf6); }
.spb-tag { display: inline-block; padding: 3px 10px; background: #eef2ff; color: #6366f1; font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; border-radius: 999px; }
.spb-name { font-size: 28px; font-weight: 800; letter-spacing: -0.02em; margin-top: 10px; }
.spb-stars { font-size: 14px; color: #f59e0b; margin-top: 8px; }
.spb-stars span { color: #94a3b8; font-size: 12.5px; margin-left: 4px; }
.spb-price { font-size: 24px; font-weight: 800; margin-top: 12px; }
.spb-desc { font-size: 14.5px; line-height: 1.6; color: #475569; margin-top: 12px; }
.spb-cta { margin-top: 20px; padding: 13px 28px; background: #6366f1; color: #fff; border: none; border-radius: 11px; font-family: inherit; font-size: 15px; font-weight: 700; cursor: pointer; transition: background 0.15s, transform 0.1s; }
.spb-cta:hover { background: #4f46e5; }
.spb-cta:active { transform: scale(0.98); }

.spb-body { padding: 10px 20px 60px; }
.spb-body h2 { font-size: 19px; font-weight: 800; margin-bottom: 12px; }
.spb-body p { font-size: 15px; line-height: 1.7; color: #475569; margin-bottom: 14px; }
.spb-spacer { height: 320px; display: flex; align-items: center; justify-content: center; color: #cbd5e1; font-size: 14px; border: 2px dashed #e2e8f0; border-radius: 14px; margin-top: 10px; }

@media (max-width: 600px) {
  .spb-hero { grid-template-columns: 1fr; }
  .spb-name { font-size: 24px; }
}`,
  js: `const bar = document.getElementById('spbBar');
const heroCta = document.querySelector('.spb-cta');

// Show the sticky bar only once the main CTA has scrolled out of view
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      bar.classList.toggle('visible', !entry.isIntersecting);
    });
  },
  { threshold: 0, rootMargin: '0px 0px 0px 0px' }
);

observer.observe(heroCta);

// Wire both CTAs to the same action
[heroCta, bar.querySelector('.spb-bar-cta')].forEach(btn => {
  btn.addEventListener('click', () => {
    btn.textContent = 'Added ✓';
    setTimeout(() => { btn.textContent = 'Add to cart'; }, 1400);
  });
});`,
  seo: {
    title: 'Sticky Product Bar — Free HTML CSS JS PDP Snippet',
    description: 'A product-page sticky bar that slides in when the main Add-to-cart scrolls away, using IntersectionObserver. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Sticky Product Bar — Scroll-Triggered Add-to-Cart Bar with IntersectionObserver',
      description: `On a long product detail page, the Add to cart button at the top scrolls out of sight, and a shopper who has just decided to buy now has to scroll back up to find it. The sticky product bar fixes this: once the main CTA leaves the viewport, a compact bar slides in from the top of the screen showing the product thumbnail, name, price, and an Add to cart button — keeping the purchase action one tap away no matter how far the shopper has scrolled. Apple, Nike, and most modern storefronts use this pattern. This component builds it in HTML, CSS, and vanilla JavaScript using \`IntersectionObserver\` — no scroll-event handler.

**Why IntersectionObserver instead of a scroll listener**

The naive way to do this is a \`scroll\` event that checks the CTA's position on every frame. That runs JavaScript continuously while scrolling and is a classic cause of jank. \`IntersectionObserver\` is the modern alternative: you tell the browser to watch the hero CTA and notify you only when its visibility crosses a threshold. The browser does this off the main thread and fires the callback just twice — when the button leaves the viewport and when it returns. The bar toggles its \`visible\` class on \`!entry.isIntersecting\`, so it appears exactly when the main CTA is gone and hides when it comes back.

**The slide-in transition**

The bar is \`position: fixed\` at the top with \`z-index: 50\` and starts hidden with \`transform: translateY(-100%)\` — pushed entirely above the viewport. Adding the \`visible\` class animates it to \`translateY(0)\` with a \`cubic-bezier(0.32, 0.72, 0, 1)\` easing that gives a quick, slightly springy slide. Because it animates \`transform\` (not \`top\` or \`height\`), the motion is GPU-accelerated and smooth. The reverse — sliding back up when the hero CTA returns — uses the same transition automatically.

**The frosted-glass bar**

The bar has a translucent white background with \`backdrop-filter: saturate(180%) blur(12px)\`, the frosted-glass effect that lets page content blur through behind it — the same treatment as the iOS and macOS toolbars. This keeps the bar visually light while still separating it from the content scrolling underneath. A subtle bottom border defines its edge.

**A compact, truncating layout**

Inside, a small gradient thumbnail sits beside the product name and price, with the CTA pushed to the right by \`justify-content: space-between\`. The product name uses \`white-space: nowrap\` with \`text-overflow: ellipsis\` so a long title truncates cleanly rather than wrapping and breaking the bar's single-line height. This mirrors the hero section above, which has the full product image, rating stars, description, and the primary CTA the observer is watching.

**Synced CTAs**

Both the hero CTA and the bar CTA are wired to the same action — here a simple "Added ✓" confirmation that resets after 1.4 seconds. In production both would call your real add-to-cart logic. Because they share a handler, the shopper gets identical behaviour whether they click the button in the hero or in the sticky bar.

**Customisation**

Point the observer at whatever element marks "the CTA is gone" — it watches \`.spb-cta\` here, but you could watch the whole hero section instead. Adjust \`rootMargin\` to make the bar appear a little before or after the CTA fully leaves (e.g. \`-80px 0px 0px 0px\` triggers it 80px sooner). Swap the \`#6366f1\` accent and the gradient thumbnail for your brand, replace the placeholder letters with a real product image, and connect both CTAs to your cart. On mobile (under 600px) the hero stacks to one column while the bar stays pinned.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `A product hero renders with an image, rating, price, and an Add to cart button, followed by body content.` },
      { title: 'Scroll down', text: `Once the hero's Add to cart button leaves the viewport, a frosted sticky bar slides in from the top with the product name, price, and CTA.` },
      { title: 'Scroll back up', text: `When the hero button returns to view, the bar slides back up out of sight.` },
      { title: 'Click either CTA', text: `Both the hero and bar buttons run the same add-to-cart action and show an "Added ✓" confirmation.` },
      { title: 'Tune the trigger', text: `Point the IntersectionObserver at a different element or adjust rootMargin to make the bar appear earlier or later.` },
      { title: 'Brand it', text: `Swap the accent colour and gradient thumbnail for a real product image and wire the CTAs to your cart logic.` },
    ]},
    features: [
      { title: 'IntersectionObserver trigger', text: `Watches the hero CTA and toggles the bar only when it crosses the viewport edge — no per-frame scroll handler.` },
      { title: 'Off-main-thread visibility', text: `The browser computes intersection efficiently and fires the callback just twice, avoiding scroll jank.` },
      { title: 'Transform slide-in', text: `The bar animates translateY for GPU-accelerated entry and exit with a springy cubic-bezier easing.` },
      { title: 'Frosted-glass bar', text: `backdrop-filter blur lets content blur through behind the bar, matching native iOS/macOS toolbars.` },
      { title: 'Truncating product name', text: `nowrap plus text-overflow: ellipsis keeps long titles on one line so the bar height stays fixed.` },
      { title: 'Synced CTAs', text: `The hero and bar buttons share one handler, so add-to-cart behaves identically from either.` },
      { title: 'Configurable trigger point', text: `rootMargin lets you make the bar appear before or after the CTA fully leaves the viewport.` },
      { title: 'Responsive hero', text: `The product hero stacks to a single column under 600px while the sticky bar stays pinned.` },
    ],
    useCases: [
      { title: 'E-commerce product pages', text: `Keep Add to cart reachable through long PDPs to protect conversion — pair with a [thumbnail gallery](/ui-snippets/thumbnail-gallery/) and a [variant selector](/ui-snippets/variant-selector/).` },
      { title: 'App and software download pages', text: `Keep the primary download or buy action pinned as users read features below the fold.` },
      { title: 'Course and digital-product pages', text: `Surface the enroll/buy CTA persistently; combine with a [pricing card](/ui-snippets/pricing-card/) section.` },
      { title: 'Booking and reservation pages', text: `Keep a Book now bar visible while users scroll through details, photos, and reviews.` },
      { title: 'Long-form sales pages', text: `Pin the offer so the CTA is always one tap away through a long pitch; complements a [sticky CTA footer](/ui-snippets/sticky-cta-footer/) variant.` },
      { title: 'Learning IntersectionObserver', text: `A practical reference for visibility-triggered UI without scroll listeners and transform-based slide animations.` },
    ],
    faqs: [
      { q: 'Why use IntersectionObserver instead of a scroll event?', a: `A scroll listener runs JavaScript on every scroll frame and constantly reads element positions, which causes layout thrashing and jank on long pages. IntersectionObserver lets the browser watch the element's visibility off the main thread and call you back only when it crosses the threshold — here just twice, when the CTA leaves and re-enters the viewport. It is more performant and far less code than a throttled scroll handler.` },
      { q: 'How do I make the bar appear a bit before the CTA fully scrolls away?', a: `Adjust the observer's rootMargin. A negative top margin like rootMargin: '-80px 0px 0px 0px' shrinks the observed area so isIntersecting flips to false 80px sooner, showing the bar a little earlier. Positive values delay it. You can also raise the threshold (e.g. 0.5) to trigger when only half the CTA is still visible rather than waiting for it to leave entirely.` },
      { q: 'Can I trigger the bar off the whole hero section instead of the button?', a: `Yes — call observer.observe() on the hero element (.spb-hero) rather than the CTA. The bar will then show once the entire hero leaves the viewport instead of just the button. Choose whichever element best represents the moment the shopper has scrolled past the primary buy action; watching the CTA itself is usually the most precise.` },
      { q: 'Does the sticky bar overlap my page content?', a: `Because the bar is position: fixed, it sits above the content and only appears after the user has scrolled past the hero, so it does not push anything down or cover the top of the page on load. If you keep it visible from the top instead, add padding-top to the page equal to the bar height so content is not hidden beneath it.` },
      { q: 'How do I use this sticky bar in React, Vue, or Angular?', a: `Create the IntersectionObserver in an effect (useEffect / onMounted / ngAfterViewInit), observing a ref to the hero CTA, and store the resulting visible boolean in state bound to the bar's .visible class. Crucially, disconnect the observer in the cleanup (useEffect return / onUnmounted / ngOnDestroy) to avoid leaks. The fixed positioning, transform slide, and frosted-glass CSS port unchanged; both CTAs call your shared add-to-cart handler.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the observer mechanics by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the bar toggles on !entry.isIntersecting rather than entry.isIntersecting directly, and how rootMargin could be adjusted to make the bar appear before the hero CTA fully leaves the viewport. The same assistant can help optimize it — for instance whether observing the whole hero section instead of just the button changes the trigger feel, or whether a single shared click handler bound to both CTAs risks double-firing if a user rapid-clicks. It's also useful for extending the bar: ask it to add a quantity stepper into the sticky bar itself, show a low-stock indicator, or animate the thumbnail image swapping when the shopper picks a different variant on the page. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-triggered "sticky add-to-cart bar" for a product page in plain HTML, CSS, and JavaScript using only the IntersectionObserver API — no scroll event listener, no polling.

Requirements:
- A product hero section containing an image, name, price, and a primary Add to cart button, followed by long body content below it.
- A separate compact bar, fixed to the top of the viewport, hidden by default via a transform that translates it fully above the viewport, containing a small thumbnail, truncated product name (single line, ellipsis overflow), price, and its own Add to cart button.
- Create exactly one IntersectionObserver instance, observing only the hero's Add to cart button (not the whole hero, and not a scroll position calculation), with a callback that toggles a visible class on the compact bar based on the negation of entry.isIntersecting for that observed element.
- The compact bar's visible class must animate it to translateY(0) using a CSS transition with a springy cubic-bezier easing, so it slides down as soon as the hero button scrolls out of view and slides back up automatically when it returns.
- Give the bar a translucent background with backdrop-filter blur and saturation so it reads as a frosted glass layer above scrolling content.
- Attach the same click handler to both the hero CTA and the bar CTA (e.g. iterate over both elements) so their behavior — such as a temporary "Added" confirmation state that reverts after a short delay — never has to be duplicated.
- Make the rootMargin and/or threshold on the observer easy to tune so the bar's appearance point can be shifted earlier or later without touching the rest of the logic.`,
    },
  },
};

export default stickyProductBar;
