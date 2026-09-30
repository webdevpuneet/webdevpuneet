const contextualSubnavMorph = {
  id: 'contextual-subnav-morph',
  title: 'Contextual Sub-Nav Morph',
  category: 'navigation',
  html: `<div class="cs-app">
  <nav class="cs-topnav">
    <span class="cs-brand">Acme</span>
    <div class="cs-primary">
      <span class="cs-primary-item active" id="cs-primary-label">Product</span>
    </div>
  </nav>

  <div class="cs-subnav" id="csSubnav"></div>

  <div class="cs-scroll" id="csScroll">
    <section class="cs-section" data-section="product" id="sec-overview">
      <h3>Overview</h3>
      <p>Scroll down — the sub-nav above swaps its links to match whichever section is in view.</p>
    </section>
    <section class="cs-section" data-section="product" id="sec-features">
      <h3>Features</h3>
      <p>Still inside the Product context, so the sub-nav keeps showing Product links.</p>
    </section>
    <section class="cs-section" data-section="solutions" id="sec-startups">
      <h3>For Startups</h3>
      <p>Crossing into the Solutions section morphs the sub-nav to Solutions links.</p>
    </section>
    <section class="cs-section" data-section="solutions" id="sec-enterprise">
      <h3>For Enterprise</h3>
      <p>Still in Solutions — the sub-nav does not change again until the next section boundary.</p>
    </section>
    <section class="cs-section" data-section="resources" id="sec-docs">
      <h3>Documentation</h3>
      <p>Now in Resources — the sub-nav morphs a third time.</p>
    </section>
    <section class="cs-section" data-section="resources" id="sec-blog">
      <h3>Blog</h3>
      <p>The last section in this demo.</p>
    </section>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; justify-content: center; padding: 32px 16px; }

.cs-app { width: 100%; max-width: 460px; border: 1px solid #e2e8f0; border-radius: 14px; overflow: hidden; background: #fff; box-shadow: 0 8px 24px rgba(15,23,42,0.06); }

.cs-topnav { display: flex; align-items: center; gap: 18px; padding: 14px 18px; border-bottom: 1px solid #f1f5f9; }
.cs-brand { font-size: 14px; font-weight: 800; color: #1e293b; }
.cs-primary-item { font-size: 12.5px; font-weight: 700; color: #6366f1; }

.cs-subnav {
  display: flex; gap: 4px; padding: 8px 14px; border-bottom: 1px solid #f1f5f9;
  background: #fafbff; overflow-x: auto; min-height: 40px; align-items: center;
}
.cs-sublink {
  flex-shrink: 0; padding: 6px 12px; border-radius: 999px; font-size: 12px; font-weight: 700;
  color: #475569; text-decoration: none; background: #fff; border: 1px solid #e2e8f0;
  opacity: 0; transform: translateY(4px);
  animation: cs-morph-in 0.28s ease forwards;
}
.cs-sublink:hover { border-color: #6366f1; color: #6366f1; }
@keyframes cs-morph-in { to { opacity: 1; transform: translateY(0); } }

.cs-scroll { height: 260px; overflow-y: auto; scroll-behavior: smooth; }
.cs-section { padding: 28px 20px; border-bottom: 1px dashed #e2e8f0; min-height: 160px; }
.cs-section:last-child { border-bottom: none; }
.cs-section h3 { font-size: 15px; font-weight: 800; color: #1e293b; margin-bottom: 8px; }
.cs-section p { font-size: 12.5px; color: #64748b; line-height: 1.7; }`,
  js: `const SUBNAV_MAP = {
  product: [
    { label: 'Overview', href: '#sec-overview' },
    { label: 'Features', href: '#sec-features' },
    { label: 'Changelog', href: '#sec-overview' },
    { label: 'Pricing', href: '#sec-features' },
  ],
  solutions: [
    { label: 'Startups', href: '#sec-startups' },
    { label: 'Enterprise', href: '#sec-enterprise' },
    { label: 'Agencies', href: '#sec-startups' },
  ],
  resources: [
    { label: 'Documentation', href: '#sec-docs' },
    { label: 'Blog', href: '#sec-blog' },
    { label: 'API Reference', href: '#sec-docs' },
    { label: 'Community', href: '#sec-blog' },
  ],
};

const PRIMARY_LABELS = { product: 'Product', solutions: 'Solutions', resources: 'Resources' };

const subnavEl = document.getElementById('csSubnav');
const primaryLabel = document.getElementById('cs-primary-label');
const scrollEl = document.getElementById('csScroll');
const sections = Array.from(document.querySelectorAll('.cs-section'));

let currentSection = null;

function renderSubnav(sectionKey) {
  if (sectionKey === currentSection) return;
  currentSection = sectionKey;

  const items = SUBNAV_MAP[sectionKey] || [];
  subnavEl.innerHTML = '';
  items.forEach((item, i) => {
    const a = document.createElement('a');
    a.className = 'cs-sublink';
    a.href = item.href;
    a.textContent = item.label;
    a.style.animationDelay = (i * 30) + 'ms';
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(item.href);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    subnavEl.appendChild(a);
  });

  primaryLabel.textContent = PRIMARY_LABELS[sectionKey] || sectionKey;
}

// Track which section is most visible inside the scroll container and morph
// the sub-nav to match \\u2014 not the URL hash, the actual scroll position.
const observer = new IntersectionObserver(
  (entries) => {
    let best = null;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) {
          best = entry;
        }
      }
    });
    if (best) {
      renderSubnav(best.target.dataset.section);
    }
  },
  { root: scrollEl, threshold: [0.3, 0.5, 0.7] }
);

sections.forEach((s) => observer.observe(s));

renderSubnav(sections[0].dataset.section);`,
  seo: {
    title: 'Contextual Sub-Nav Morph — Free Scroll-Aware Navigation JS Snippet',
    description: 'A secondary navigation bar that swaps its entire set of links to match whichever page section is currently scrolled into view, using IntersectionObserver. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Contextual Sub-Nav Morph — Section-Aware Secondary Navigation with IntersectionObserver',
      description: `Most scroll-driven navigation only highlights which link in a fixed list is currently active, the way [scroll-spy navigation](/ui-snippets/scroll-spy-nav/) does. This snippet does something different: as the user scrolls between named regions of the page, the entire secondary navigation bar swaps out for a different set of links relevant to whichever region they're now in — a pattern seen on large marketing sites where "Product," "Solutions," and "Resources" each have their own distinct sub-navigation that appears only while you're scrolled into that part of the page.

**Mapping section keys to link sets**

\`SUBNAV_MAP\` is a plain object keyed by section identifier (\`product\`, \`solutions\`, \`resources\`), each holding an array of \`{ label, href }\` objects. Every \`<section>\` in the scrollable content area carries a \`data-section\` attribute matching one of these keys — multiple consecutive sections can share the same key, which is how "Overview" and "Features" both stay under the "Product" context without the sub-nav morphing between them.

**IntersectionObserver scoped to the scroll container, not the viewport**

The observer is created with \`{ root: scrollEl, ... }\`, which is the detail that makes this work inside a scrollable panel rather than only at the page/viewport level — \`root: null\` (the default) would track intersection against the browser viewport, which is wrong when the scrolling happens inside a nested \`overflow-y: auto\` container, as it does in this demo. \`threshold: [0.3, 0.5, 0.7]\` gives multiple intersection-ratio checkpoints so the callback fires as a section's visible proportion crosses each of those marks, not just on/off.

**Choosing the "most visible" section, not just any intersecting one**

Because two sections can be partially visible at once during a scroll (one leaving, one entering), the observer's callback doesn't just react to the first intersecting entry — it loops over every entry in the batch and picks the one with the highest \`intersectionRatio\`, stored as \`best\`. This means the sub-nav always reflects whichever section currently occupies the most screen space, rather than flickering between two contexts during the transition scroll between them.

**Morph animation and a no-op guard**

\`renderSubnav()\` returns immediately if the requested \`sectionKey\` matches \`currentSection\` — this guard is what stops the sub-nav from re-rendering (and re-triggering its entrance animation) every time the observer fires within the same section, which would otherwise happen repeatedly as the scroll position shifts and different thresholds cross. When the section key genuinely changes, every link is rebuilt fresh with a staggered \`animation-delay\` so they fade and slide in one after another rather than all at once, reinforcing that this is a distinct new set of links, not just an update to the existing ones.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll the content panel', text: 'Scrolling through .cs-scroll moves different .cs-section elements into view, each carrying a data-section attribute.' },
        { title: 'Watch the sub-nav morph', text: 'The IntersectionObserver picks whichever section has the highest intersectionRatio and calls renderSubnav() with its data-section value.' },
        { title: 'Click a sub-nav link', text: 'Each generated link scrolls its target section into view with scrollIntoView({ behavior: "smooth" }) instead of a hard jump.' },
        { title: 'Add a new section context', text: 'Add a key to SUBNAV_MAP with its own array of { label, href } links, then give one or more .cs-section elements a matching data-section value.' },
        { title: 'Tune the observer sensitivity', text: 'Adjust the threshold array passed to IntersectionObserver to make the morph trigger earlier or later relative to how much of a section is visible.' },
        { title: 'Adapt root for a full-page layout', text: 'If your real page scrolls the whole document instead of a nested panel, set root: null (or omit it) so the observer tracks the browser viewport instead of a container element.' },
      ],
    },
    features: [
      'IntersectionObserver scoped to the scroll container via root, not just the browser viewport',
      'Multi-threshold observation picks the most-visible section, avoiding flicker during transition scrolls',
      'A no-op guard in renderSubnav() prevents redundant re-renders and animation restarts within the same section',
      'Entire link sets swap per section via a simple SUBNAV_MAP object, not just an active-link highlight',
      'Staggered entrance animation per link communicates a genuinely new context, not an incremental update',
      'Smooth-scroll navigation on every generated sub-nav link via scrollIntoView',
      'Multiple sections can share one context key without triggering repeated morphs between them',
      'No scroll-event polling or manual scrollTop math — entirely driven by the Intersection Observer API',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Large marketing and product landing pages', desc: 'Recreate the section-aware secondary navigation pattern seen on large SaaS marketing sites, where each major page region has its own distinct sub-navigation.' },
      { icon: 'SAAS', title: 'Documentation sites with distinct product areas', desc: 'Morph a docs site\'s sub-nav between different product modules as the reader scrolls through a long single-page reference, instead of relying on a static [table of contents](/ui-snippets/table-of-contents/) alone.' },
      { icon: 'APP', title: 'Long-form editorial or knowledge-base pages', desc: 'Swap contextual quick links (related articles, jump-to-subsection) as a reader scrolls through a long knowledge-base article with clearly delimited regions.' },
      { icon: 'CODE', title: 'Reference implementation of scoped IntersectionObserver', desc: 'A clean example of passing a non-null root to IntersectionObserver for tracking visibility inside a nested scrollable container, a detail that is easy to get wrong.' },
      { icon: 'LEARN', title: 'Teaching intersection-ratio comparison logic', desc: 'The "pick the highest intersectionRatio across the current entry batch" pattern generalizes to any UI that needs to determine the single most-visible element among several simultaneously intersecting ones.' },
    ],
    faqs: [
      { q: 'How is this different from a normal scroll-spy nav?', a: 'A typical scroll-spy nav keeps one fixed list of links and just highlights whichever one corresponds to the current section. This snippet instead swaps out the entire set of visible links to a different, context-specific list per section, using SUBNAV_MAP to look up which links belong to which section identifier.' },
      { q: 'Why does the observer need a root option?', a: 'By default, IntersectionObserver measures intersection against the browser viewport. Since the scrollable content here lives inside a nested .cs-scroll container with its own overflow-y: auto, the observer must be given root: scrollEl so it measures intersection against that container\'s bounds instead of the whole page.' },
      { q: 'How does the code decide which section is "current" when two are partially visible?', a: 'The observer callback receives a batch of entries every time thresholds are crossed. It loops through every entry that is currently intersecting and keeps the one with the highest intersectionRatio in a best variable, then renders the sub-nav for that section only — this avoids flickering between two contexts while one section is scrolling out and another is scrolling in.' },
      { q: 'Why does renderSubnav() check currentSection before doing anything?', a: 'Without that guard, every threshold crossing within the same still-current section would rebuild and re-animate the sub-nav links from scratch, causing a visible flicker even when the actual context has not changed. Comparing against currentSection makes renderSubnav() a genuine no-op until the section key actually changes.' },
      { q: 'Can I use this for a normal full-page scroll instead of a scrollable panel?', a: 'Yes — pass root: null (or omit the root option entirely, since null is the default) when constructing the IntersectionObserver, and it will track each section\'s intersection against the browser viewport instead of a nested container.' },
      { q: 'How do I add a fourth top-level context?', a: 'Add a new key to SUBNAV_MAP with its own array of { label, href } link objects, add a matching entry to PRIMARY_LABELS for the top nav label, and give one or more .cs-section elements a data-section attribute equal to that new key.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the IntersectionObserver is given root: scrollEl instead of the default null, and how comparing intersectionRatio across the current entry batch picks a single "most visible" section without flickering during the transition scroll between two of them. It's also a strong candidate for extension — ask the assistant to sync the top-level primary nav item's active state with the same section-detection logic, animate the sub-nav links sliding out before the new set slides in instead of an instant swap, or persist the currently active context in the URL hash so a shared link opens directly into the right context.`,
      prompt: `Build a scroll-aware secondary navigation bar in plain HTML, CSS, and JavaScript using the IntersectionObserver API — no scroll-event polling, no libraries.

Requirements:
- A scrollable content container with several distinct section elements, each tagged with a data attribute identifying which broader context it belongs to (e.g. several sections tagged "product", followed by several tagged "solutions"). Multiple consecutive sections may share the same context tag.
- A secondary navigation bar above the scrollable container whose entire set of links is generated from a lookup object mapping each context tag to its own array of link objects (label plus a target section id) — not a single fixed list of links with only an active-state highlight.
- Use an IntersectionObserver scoped to the scrollable container itself (not the browser viewport) with multiple intersection thresholds, so the callback fires as sections cross several different visibility levels while scrolling.
- In the observer's callback, when multiple sections are simultaneously intersecting (which happens during the scroll between two contexts), determine the single most visible one by comparing each entry's intersection ratio, and only update the sub-nav based on that one section's context tag.
- Add a guard so that re-triggering the observer within the same already-current context does not rebuild or re-animate the sub-nav links — only render a new set of links when the context tag actually changes from the previous one.
- Animate each newly rendered sub-nav link in with a small staggered entrance (e.g. fade and slight upward slide, offset slightly per link) so a context change reads as a distinct new set of links rather than an incremental update.
- Clicking any generated sub-nav link should smooth-scroll its target section into view within the scrollable container.`,
    },
  },
};

export default contextualSubnavMorph;
