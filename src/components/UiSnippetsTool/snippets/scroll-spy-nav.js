const scrollSpyNav = {
  id: 'scroll-spy-nav',
  title: 'Scroll-Spy Navigation',
  category: 'navigation',
  description: 'Free scroll-spy navigation HTML CSS JavaScript snippet. Sticky sidebar links auto-highlight as sections scroll past via IntersectionObserver, with a sliding indicator pill and smooth-scroll on click.',
  html: `<div class="demo">
  <nav class="spy-nav">
    <span class="indicator"></span>
    <a href="#overview" class="spy-link active" data-target="overview">Overview</a>
    <a href="#features" class="spy-link" data-target="features">Features</a>
    <a href="#pricing" class="spy-link" data-target="pricing">Pricing</a>
    <a href="#faq" class="spy-link" data-target="faq">FAQ</a>
  </nav>
  <div class="content">
    <section id="overview" class="block">
      <h3>Overview</h3>
      <p>Scroll through this panel — the sidebar link lights up and a pill glides to match whichever section is in view.</p>
    </section>
    <section id="features" class="block alt">
      <h3>Features</h3>
      <p>Built with IntersectionObserver, so it stays smooth even with many sections and never blocks the main thread on scroll.</p>
    </section>
    <section id="pricing" class="block">
      <h3>Pricing</h3>
      <p>Clicking a link smooth-scrolls the content area to the matching section, keeping the nav and content perfectly in sync.</p>
    </section>
    <section id="faq" class="block alt">
      <h3>FAQ</h3>
      <p>The active state updates the moment a section crosses the observer's threshold near the top of the scroll container.</p>
    </section>
  </div>
</div>`,
  css: `.demo {
  display: flex;
  gap: 22px;
  font-family: 'Segoe UI', system-ui, sans-serif;
  padding: 26px;
  background: #f8fafc;
}
.spy-nav {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 140px;
  flex-shrink: 0;
  align-self: flex-start;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 8px;
  overflow: hidden;
}
.indicator {
  position: absolute;
  left: 8px;
  width: calc(100% - 16px);
  height: 36px;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  border-radius: 9px;
  transition: transform 0.32s cubic-bezier(.22,.9,.3,1);
  z-index: 0;
}
.spy-link {
  position: relative;
  z-index: 1;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  padding: 9px 14px;
  border-radius: 9px;
  transition: color 0.25s ease;
}
.spy-link.active { color: #fff; }
.content {
  flex: 1;
  max-height: 320px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 14px;
  scroll-behavior: smooth;
}
.block {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  padding: 20px;
  min-height: 180px;
}
.block.alt { background: #eef2ff; border-color: #e0e7ff; }
.block h3 {
  margin: 0 0 8px;
  font-size: 15px;
  color: #1e293b;
}
.block p {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  color: #475569;
}`,
  js: `const links = document.querySelectorAll('.spy-link');
const indicator = document.querySelector('.indicator');
const content = document.querySelector('.content');
const sections = document.querySelectorAll('.block');

function setActive(id) {
  links.forEach((link) => {
    const isActive = link.dataset.target === id;
    link.classList.toggle('active', isActive);
    if (isActive) {
      indicator.style.transform = 'translateY(' + link.offsetTop + 'px)';
    }
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setActive(entry.target.id);
    }
  });
}, { root: content, rootMargin: '0px 0px -65% 0px', threshold: 0 });

sections.forEach((section) => observer.observe(section));

links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(link.dataset.target);
    if (target) {
      content.scrollTo({ top: target.offsetTop - content.offsetTop, behavior: 'smooth' });
    }
  });
});

setActive('overview');`,
  seo: {
    title: 'Scroll-Spy Navigation — Free HTML CSS JS Snippet',
    description: 'Sidebar nav that highlights the active section via IntersectionObserver with a gliding pill indicator. Exports to React, Vue & Tailwind.',
    about: {
      title: 'How this scroll-spy navigation was built — IntersectionObserver, a translateY indicator, and synced smooth-scroll',
      description: `This snippet recreates the "active section auto-highlights in the sidebar as you scroll" navigation found in documentation sites, long-form landing pages, and dashboard layouts — a sliding pill glides between links to track whichever section is currently in view, and clicking a link smooth-scrolls the content panel to match. It's built with the native \`IntersectionObserver\` API, CSS transforms, and roughly 35 lines of JavaScript — no scroll-event listeners or manual position math required.

**Why IntersectionObserver instead of a scroll listener**

The classic way to build scroll-spy navigation is to attach a \`scroll\` event handler and manually compare each section's \`getBoundingClientRect()\` against the viewport on every single scroll tick — a pattern notorious for janky performance because it runs dozens of times per second on the main thread. This snippet instead creates an \`IntersectionObserver\` scoped to the scrollable \`.content\` panel via the \`root\` option, with a \`rootMargin: '0px 0px -65% 0px'\` that shrinks the observer's effective viewport down to a thin band hugging the top of the panel. A section is reported as intersecting — and becomes "active" — the instant it crosses *that* band, which is what a reader's eyes are actually resting on, rather than whichever section happens to cover the most total area. The browser handles all the geometry calculations off the main thread and notifies the page only when something meaningfully changes — the same efficient "let the browser tell you when it matters" approach used by the [Scroll Pin Story](/ui-snippets/scroll-pin-story) snippet for its scroll-driven panel transitions.

**A sliding indicator driven by one CSS transform**

Rather than animating each link's background individually, a single absolutely-positioned \`.indicator\` pill sits behind all the links (\`z-index: 0\`) and glides between them via \`transform: translateY(link.offsetTop)\`. Every time \`setActive(id)\` runs, it toggles the \`.active\` class (which switches the link's text to white so it reads clearly over the pill) and repositions the indicator to the newly active link's vertical offset — a CSS \`cubic-bezier\` transition handles the actual gliding motion. This "one shared element that moves to match state" technique is the same one driving the sliding selector in many tab bars and segmented controls; it produces a much more cohesive, "alive" feel than crossfading individual backgrounds.

**Keeping clicks and scroll position in sync**

Clicking a sidebar link calls \`e.preventDefault()\` (so the browser's native anchor-jump doesn't fight the custom scroll), then computes the target section's offset *relative to the scroll container* — \`target.offsetTop - content.offsetTop\` — and calls \`content.scrollTo({ top, behavior: 'smooth' })\`. Because the observer is also scoped to that same \`.content\` element via its \`root\` option, the programmatic scroll naturally re-triggers the intersection callback as the section comes into view, keeping the active link and indicator in sync whether the visitor scrolls manually or clicks a link — there is no separate "set active on click" branch to maintain.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Build a sidebar of links plus a free-floating indicator', text: 'Add `<a class="spy-link" data-target="sectionId">` links inside a `position: relative` nav, and one absolutely-positioned `<span class="indicator">` sibling that will slide behind whichever link is active.' },
        { title: 'Style the indicator to glide with a transform transition', text: 'Give `.indicator` a `transition: transform 0.32s cubic-bezier(...)`. Moving it with `transform: translateY()` rather than `top` keeps the animation smooth and off the layout-recalculation path.' },
        { title: 'Write a setActive(id) that toggles classes and repositions the pill', text: 'Loop the links, toggle `.active` based on whether `link.dataset.target === id`, and on the matching link set `indicator.style.transform = "translateY(" + link.offsetTop + "px)"` so the pill glides to its position.' },
        { title: 'Observe sections with a scoped IntersectionObserver', text: 'Create `new IntersectionObserver(callback, { root: contentEl, rootMargin: "0px 0px -65% 0px", threshold: 0 })`, call `.observe()` on every section, and inside the callback call `setActive(entry.target.id)` whenever `entry.isIntersecting` is true.' },
        { title: 'Smooth-scroll to a section on link click', text: 'Prevent the link\'s default jump with `e.preventDefault()`, find the target section, and call `content.scrollTo({ top: target.offsetTop - content.offsetTop, behavior: "smooth" })` so the scroll stays inside the custom container.' },
        { title: 'Set an initial active state', text: 'Call `setActive("overview")` (or whichever section should be highlighted by default) once on load, so the indicator is correctly positioned before any scrolling or clicking happens.' },
      ],
    },
    features: [
      'IntersectionObserver-driven highlighting — section visibility is detected by the browser\'s native observer API instead of a `scroll` event handler, so there is no per-frame geometry math running on the main thread',
      'Scoped observer root — the observer watches intersections relative to the scrollable `.content` panel (not the viewport), so the spy logic works correctly inside nested scroll containers, cards, or split-pane layouts',
      'Sliding pill indicator via transform — one shared `.indicator` element glides between links using `translateY()` and a `cubic-bezier` transition, producing a cohesive "alive" feel rather than crossfading separate backgrounds',
      'Click-to-smooth-scroll kept in sync automatically — programmatic `scrollTo({ behavior: "smooth" })` calls re-trigger the same observer that handles manual scrolling, so there is no separate "set active on click" code path to maintain',
      'Top-band activation via rootMargin — shrinking the observer\'s viewport to a thin strip near the top of the panel (`rootMargin: "0px 0px -65% 0px"`) makes a section "active" the moment it reaches the spot a reader is actually looking at, instead of whichever section happens to cover the most total area',
      'Container-relative scroll math — `target.offsetTop - content.offsetTop` correctly computes scroll position inside a custom scrollable region, a detail that trips up many naive smooth-scroll implementations',
      'Pure vanilla JavaScript and native browser APIs — no scroll-spy library or framework; copy the HTML, CSS, and JS into any page and the navigation works immediately',
    ],
    useCases: [
      { icon: 'WRITE', title: 'Documentation and knowledge-base sidebars', desc: 'Give long technical docs or help-center articles a "you are here" sidebar that updates automatically as readers scroll — a hallmark of polished documentation sites like Stripe\'s and Tailwind\'s docs.' },
      { icon: 'DESIGN', title: 'Long-form landing pages and product tours', desc: 'Add a persistent section navigator to a marketing page with Overview/Features/Pricing/FAQ sections — visitors always know where they are and can jump to any section instantly.' },
      { icon: 'FLOW', title: 'Dashboard and settings panels with grouped content', desc: 'Use the same sliding-indicator pattern for a settings sidebar that highlights the visible group as an admin scrolls through a long configuration form — pairs naturally with [Drag Resize Panels](/ui-snippets/drag-resize-panels) for a fully custom workspace layout.' },
      { icon: 'CODE', title: 'Learning IntersectionObserver in a real UI', desc: 'A focused, practical example of scoping an observer to a custom scroll container with `root` and `rootMargin` — the same configuration options used for lazy-loading images, infinite scroll, and scroll-triggered animations.' },
      { icon: 'STAR', title: 'Portfolio and case-study pages', desc: 'Walk visitors through a multi-section case study or project breakdown with a sidebar that tracks their progress — reinforcing a sense of structure and completion as they read.' },
      { icon: 'LEARN', title: 'A reference for shared-element state indicators', desc: 'The single sliding `.indicator` pill repositioned via `transform` is the same technique behind animated tab bars, segmented controls, and breadcrumb highlights — copy the pattern any time one element needs to "follow" the active item in a list.' },
      { icon: 'CODE', title: 'Related: Sticky Filter Bar', desc: 'See the [Sticky Filter Bar](/ui-snippets/sticky-filter-bar/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use IntersectionObserver instead of a scroll event listener for scroll-spy navigation?', a: 'A `scroll` event fires many times per second and forces you to manually call `getBoundingClientRect()` on every section to figure out what is visible — expensive geometry work running repeatedly on the main thread, which is the classic cause of janky scroll-spy implementations. `IntersectionObserver` instead lets the browser track visibility natively and only calls your callback when a watched element actually crosses a visibility threshold, which is dramatically cheaper and smoother, especially with many sections.' },
      { q: 'How does the indicator pill know where to move?', a: '`setActive(id)` finds the link whose `data-target` matches the newly active section\'s `id`, and sets `indicator.style.transform = "translateY(" + link.offsetTop + "px)"`. Because the indicator and links share the same parent and the indicator is absolutely positioned, the link\'s `offsetTop` is exactly the vertical distance the pill needs to travel — and the CSS `transition` on `transform` animates that move smoothly.' },
      { q: 'Why does the observer use `root: content` instead of the default viewport?', a: 'By default, an `IntersectionObserver` measures visibility against the browser viewport — but here, the scrollable area is a `.content` div *inside* the page, not the page itself. Passing `root: content` tells the observer to measure intersection relative to that container\'s bounds instead, so the spy logic correctly reflects what is visible inside the scrollable panel, not what happens to be visible on the user\'s screen.' },
      { q: 'Why call `e.preventDefault()` on the link clicks if the links already point to the right section IDs?', a: 'Without it, the browser\'s native anchor-jump behavior (`href="#sectionId"`) would instantly snap the *whole page* to that element, fighting with — or completely overriding — the custom `content.scrollTo({ behavior: "smooth" })` call that scrolls just the inner container smoothly. Preventing the default lets the snippet fully control which element scrolls and how.' },
      { q: 'Why subtract `content.offsetTop` when computing the scroll target position?', a: '`target.offsetTop` gives a section\'s position relative to its nearest positioned ancestor — which may not be the scroll container itself. Subtracting `content.offsetTop` converts that into a position *relative to the scrollable `.content` element*, which is what `content.scrollTo({ top })` actually expects. Skipping this subtraction is a common bug that causes smooth-scroll to land slightly above or below the intended section.' },
      { q: 'Can I use this scroll-spy navigation snippet on my own site for free, including commercial projects?', a: 'Yes — copy the HTML, CSS, and JS with the buttons on this page and use them anywhere, including commercial products, with no attribution required. It relies only on the native `IntersectionObserver` API, CSS transforms/transitions, and vanilla JavaScript — no scroll-spy library or licensing to track.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the observer geometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the rootMargin value of "0px 0px -65% 0px" does to the observer's effective viewport, or why root: content rather than the default (the browser viewport) is required here. The same assistant can help optimize it — asking whether the indicator's translateY-based positioning would still work correctly if the sidebar links wrapped onto multiple lines, or whether the observer callback should debounce rapid successive intersections during a fast programmatic scroll. It's also useful for extending the effect: ask it to support nested sub-sections with a secondary indicator, add keyboard arrow-key navigation between links, or make the indicator resize its height to match variable-height links instead of a fixed 36px. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll-spy navigation" sidebar in plain HTML, CSS, and JavaScript using only the native IntersectionObserver API — no scroll event listener, no scroll-spy library.

Requirements:
- A sidebar navigation containing several links, each carrying a data-target attribute matching a section's id, plus a single absolutely-positioned indicator pill sitting behind the links at a lower z-index.
- A separate scrollable content container (not the page/window) holding several full-height sections, each with a matching id.
- Write a setActive(id) function that loops through the links, toggles an active class based on whether each link's data-target matches the given id, and on the matching link repositions the indicator using a CSS transform (translateY set to that link's offsetTop) rather than changing top/margin — with a CSS transition on transform providing the glide animation.
- Create an IntersectionObserver scoped to the scrollable content container via its root option (not the default browser viewport), with a rootMargin that shrinks the effective observation area to a thin horizontal band positioned in the upper portion of the container (e.g. by pushing the bottom edge far up with a large negative percentage), and observe every section with it.
- Inside the observer's callback, call setActive with the id of any section reported as intersecting.
- Add a click handler to each link that calls preventDefault (so the browser's native anchor jump does not fight the custom scroll), then calls the content container's scrollTo with smooth behavior, scrolling to the target section's offsetTop minus the content container's own offsetTop (not the target's offsetTop alone, which would be relative to the wrong ancestor).
- Confirm both manual scrolling and clicking a link keep the indicator and active link in sync, since both paths trigger the same observer.`,
    },
  },
};

export default scrollSpyNav;
