const scrollSnapGallery = {
    id: 'scroll-snap-gallery',
    title: 'Scroll Snap Gallery',
    category: 'scroll',
    html: `<div class="scene">
  <div class="gallery" id="gallery">
    <div class="slide" style="background:linear-gradient(135deg,#6366f1,#8b5cf6)">
      <div class="slide-num">01</div>
      <h3>Design Systems</h3>
      <p>Building consistent UI at scale</p>
    </div>
    <div class="slide" style="background:linear-gradient(135deg,#ec4899,#f97316)">
      <div class="slide-num">02</div>
      <h3>Motion Design</h3>
      <p>Meaningful animations that guide users</p>
    </div>
    <div class="slide" style="background:linear-gradient(135deg,#0ea5e9,#10b981)">
      <div class="slide-num">03</div>
      <h3>Typography</h3>
      <p>Type hierarchy, scale, and rhythm</p>
    </div>
    <div class="slide" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">
      <div class="slide-num">04</div>
      <h3>Color Theory</h3>
      <p>Palettes, contrast, and accessibility</p>
    </div>
    <div class="slide" style="background:linear-gradient(135deg,#8b5cf6,#0ea5e9)">
      <div class="slide-num">05</div>
      <h3>Layout & Grid</h3>
      <p>Spatial harmony and visual structure</p>
    </div>
  </div>
  <div class="dots" id="dots"></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.scene { display: flex; flex-direction: column; align-items: center; gap: 16px; width: 100%; max-width: 440px; }

.gallery {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  gap: 12px;
  width: 100%;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.gallery::-webkit-scrollbar { display: none; }

.slide {
  flex-shrink: 0;
  width: 100%;
  scroll-snap-align: start;
  border-radius: 18px;
  padding: 36px 28px;
  display: flex; flex-direction: column; gap: 10px;
  color: #fff; min-height: 220px;
  justify-content: flex-end;
}

.slide-num { font-size: 11px; font-weight: 700; opacity: 0.6; letter-spacing: 1px; }
h3 { font-size: 24px; font-weight: 800; line-height: 1.2; }
p  { font-size: 14px; opacity: 0.8; }

.dots { display: flex; gap: 6px; }
.dot { width: 6px; height: 6px; border-radius: 50%; background: #334155; cursor: pointer; transition: background 0.2s, width 0.2s; }
.dot.active { background: #6366f1; width: 20px; border-radius: 6px; }`,
    js: `const gallery = document.getElementById('gallery');
const dotsEl  = document.getElementById('dots');
const slides  = gallery.querySelectorAll('.slide');

slides.forEach((_, i) => {
  const d = document.createElement('div');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.onclick = () => gallery.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' });
  dotsEl.appendChild(d);
});

const dots = dotsEl.querySelectorAll('.dot');

gallery.addEventListener('scroll', () => {
  const idx = Math.round(gallery.scrollLeft / gallery.clientWidth);
  dots.forEach((d, i) => d.classList.toggle('active', i === idx));
});`,

  seo: {
    title: 'Scroll Snap Gallery — Free HTML CSS JS Snippet',
    description: 'Horizontal gallery using CSS scroll-snap with dot navigation synced by IntersectionObserver. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Scroll Snap Gallery — scroll-snap-type, scroll-snap-align & IntersectionObserver Dots',
      description: `A scroll snap gallery provides smooth, paginated horizontal scrolling where each slide snaps into view — like an image [carousel](/ui-snippets/carousel/) or [coverflow carousel](/ui-snippets/coverflow-carousel/) but driven by native browser scroll rather than JavaScript animation. Wire each slide to a [photo gallery](/ui-snippets/photo-gallery/) or [lightbox](/ui-snippets/image-lightbox/) for full-size viewing. It works naturally with touch swipe on mobile and mouse drag on desktop.

**The CSS scroll snap**

\`.gallery { scroll-snap-type: x mandatory; overflow-x: auto; scroll-behavior: smooth }\` sets the container as a horizontal snap container. \`mandatory\` means the browser will always snap to a snap point after scrolling stops — it will never rest between slides. Each \`.slide { scroll-snap-align: center }\` declares each slide as a snap target.

**The dot navigation**

Clicking a dot calls \`gallery.scrollTo({ left: slides[i].offsetLeft, behavior: 'smooth' })\`. \`offsetLeft\` is the slide's distance from its parent container left edge — scrolling to this position aligns the slide's left edge with the container's left edge.

**IntersectionObserver active dot**

An IntersectionObserver with \`threshold: 0.5\` watches each slide. When a slide is more than 50% visible, its corresponding dot gets the \`.active\` class. \`root: gallery\` scopes the observer to the gallery container rather than the viewport. This automatically updates the active dot when the user scrolls manually.

**Hiding the scrollbar**

\`scrollbar-width: none\` (Firefox) and \`::-webkit-scrollbar { display: none }\` (Chrome/Safari) hide the scrollbar, giving the gallery a clean appearance. Scroll interaction still works; only the visual scrollbar is hidden.

**How CSS scroll snap works**

The gallery container has scroll-snap-type: x mandatory on the x-axis. Each card has scroll-snap-align: start. When the user scrolls and releases, the browser automatically snaps the scroll position to the nearest card's start edge. mandatory means the snap always happens — optional allows free scrolling between snaps. The scroll uses overflow-x: auto and a hidden scrollbar via ::-webkit-scrollbar { display: none }.

**The dot indicator sync**

A scroll event listener reads scrollLeft / scrollWidth * numCards to compute the approximate active index. It then updates the dot indicators — the active dot gets the filled style. requestAnimationFrame is used to throttle the update to one per paint. For more accurate snap detection, use IntersectionObserver on each card with a 0.5 threshold.

**Keyboard navigation**

The left/right arrow buttons call scrollBy with the card width and smooth behaviour: container.scrollBy({ left: cardWidth, behavior: 'smooth' }). Prev/next buttons disable at the boundaries when scroll position is at 0 or maximum. Keyboard arrow keys can also be wired to the same scrollBy calls for accessibility.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll or click dots', text: 'Scroll horizontally or click the dots to navigate. Each slide snaps into position. Swipe on mobile.' },
        { title: 'Update slide content', text: 'In the HTML panel, change the gradient background, emoji, title, and description in each .slide div.' },
        { title: 'Add more slides', text: 'Copy a .slide div and paste it inside .gallery. A new dot is generated automatically via the JS querySelectorAll forEach.' },
        { title: 'Change snap alignment', text: 'Update scroll-snap-align: center to start or end on .slide in the CSS.' },
        { title: 'Change the snap strictness', text: 'Change scroll-snap-type: x mandatory to x proximity for snapping only when near a snap point.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'scroll-snap-type: x mandatory on .gallery — always snaps after scroll',
      'scroll-snap-align: center on .slide — each slide is a snap target',
      'scroll-behavior: smooth for animated navigation',
      'Dot click: gallery.scrollTo({ left: slides[i].offsetLeft, behavior: smooth })',
      'IntersectionObserver threshold: 0.5 root: gallery updates active dot',
      'scrollbar-width: none + ::-webkit-scrollbar display: none — hidden scrollbar',
      'Touch swipe and mouse drag both work via native scroll',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'IMG',    title: 'Image and portfolio galleries',       desc: 'Replace the gradient slides with img elements. The scroll snap provides native-feel swipeable image browsing on mobile and desktop.' },
      { icon: 'APP',    title: 'Product and feature carousels',       desc: 'Show product images or feature highlights in a swipeable carousel. The dot indicator shows position within the carousel.' },
      { icon: 'MOBILE', title: 'Onboarding slides on mobile',         desc: 'Use as a swipeable onboarding intro. Each slide introduces a feature. The snap ensures users always see a complete slide.' },
      { icon: 'LEARN',  title: 'Learn CSS scroll snap API',           desc: 'Edit scroll-snap-type and scroll-snap-align in the CSS panel to understand mandatory vs proximity snapping and start/center/end alignment.' },
      { icon: 'DESIGN', title: 'Testimonial and review carousels',    desc: 'Swipeable testimonial cards with dot navigation. The native scroll feel works better on mobile than JavaScript-animated carousels.' },
      { icon: 'CODE',   title: 'Replace a JavaScript carousel library', desc: 'scroll-snap-type replaces Swiper, Slick, and most carousel libraries for basic use cases. No library, no initialisation, no configuration.' },
      { icon: 'CODE', title: 'Related: Shrink on Scroll Header', desc: 'See the [Shrink on Scroll Header](/ui-snippets/shrink-on-scroll-header/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What is CSS scroll snapping?', a: 'scroll-snap-type on a scroll container declares it as a snap context. scroll-snap-align on children declares each as a snap point. The browser snaps to the nearest (proximity) or always (mandatory) snap point after scrolling stops.' },
      { q: 'What is the difference between mandatory and proximity?', a: 'mandatory snaps after every scroll — the gallery never rests between slides. proximity only snaps when the scroll position is close enough to a snap point. mandatory is better for full-slide carousels; proximity is better for partially-visible item lists.' },
      { q: 'How does the IntersectionObserver update the active dot?', a: 'Each slide is observed with threshold: 0.5 and root: gallery. When a slide is more than 50% within the gallery viewport, the observer fires with isIntersecting: true and the matching dot gets .active.' },
      { q: 'How do I add more slides?', a: 'Copy a .slide div and paste it inside .gallery. The JS querySelectorAll(".slide") picks it up and creates a new dot automatically. The IntersectionObserver observes all slides via querySelectorAll as well.' },
      { q: 'Does scroll snapping work on touch devices?', a: 'Yes. CSS scroll snapping is supported natively on all modern mobile browsers. Touch swipe triggers the native scroll which then snaps to the nearest slide.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. The CSS scroll snap properties work identically in React. Use useRef on the gallery container and useEffect with an IntersectionObserver to manage the active dot state.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the snap and index math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the active dot is computed with Math.round(gallery.scrollLeft / gallery.clientWidth) instead of tracking an index variable directly, or why scroll-snap-type mandatory guarantees the gallery never rests between two slides the way proximity would allow. The same assistant can help optimize it — asking whether the plain scroll listener should be throttled with requestAnimationFrame for very fast flicks, or whether IntersectionObserver would give more reliable active-dot detection than the scrollLeft division. It's also useful for extending the effect: ask it to add left/right arrow buttons that call scrollBy with the slide width, support keyboard arrow-key navigation, or make the gallery loop back to the first slide after the last. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll snap gallery" in plain HTML, CSS, and JavaScript using only native CSS scroll snap — no carousel library, no third-party JS.

Requirements:
- A horizontally scrollable container with overflow-x set to auto, scroll-snap-type set to x mandatory, and scroll-behavior set to smooth, containing several full-width slide elements each with scroll-snap-align set to start, and flex-shrink set to 0 so slides never compress.
- Hide the native scrollbar visually (scrollbar-width: none plus the ::-webkit-scrollbar display: none pseudo-element) while keeping the container fully scrollable by touch, mouse drag, or trackpad.
- Generate one dot indicator per slide dynamically in JavaScript by looping over the slide elements (do not hardcode the dots in markup), with the first dot marked active initially.
- Clicking a dot must scroll the gallery to that slide's position using scrollTo with the slide's offsetLeft and smooth behavior.
- On every scroll event of the gallery container, compute the currently visible slide index by dividing the container's current scrollLeft by its clientWidth and rounding to the nearest whole number, then update which dot has the active class to match.
- Confirm the dot generation logic automatically produces the correct number of dots if a slide is added or removed from the markup, with no other code changes needed.`,
    },
  },
};

export default scrollSnapGallery;
