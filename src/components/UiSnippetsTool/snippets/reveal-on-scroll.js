const revealOnScroll = {
    id: 'reveal-on-scroll',
    title: 'Reveal on Scroll',
    category: 'scroll',
    html: `<div class="page">
  <h1>Scroll down ↓</h1>
  <div class="card fade-up"><div class="icon">🎯</div><h3>Precision</h3><p>Built for accuracy in every interaction.</p></div>
  <div class="card fade-up" style="transition-delay:0.1s"><div class="icon">⚡</div><h3>Speed</h3><p>Optimized for sub-100ms interactions.</p></div>
  <div class="card fade-up" style="transition-delay:0.2s"><div class="icon">🔒</div><h3>Security</h3><p>Enterprise-grade protection, zero config.</p></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; }

.page { max-width: 480px; margin: 0 auto; padding: 40px 24px 80px; display: flex; flex-direction: column; align-items: center; gap: 20px; }
h1 { font-size: 22px; font-weight: 700; color: #94a3b8; }

.card { background: #fff; border-radius: 16px; padding: 28px 24px; border: 1px solid #e2e8f0; width: 100%; box-shadow: 0 2px 12px rgba(0,0,0,0.05); }
.icon { font-size: 28px; margin-bottom: 12px; }
h3 { font-size: 16px; font-weight: 700; color: #1e293b; margin-bottom: 8px; }
p  { font-size: 14px; color: #64748b; line-height: 1.6; }

.fade-up { opacity: 0; transform: translateY(24px); transition: opacity 0.55s ease, transform 0.55s ease; }
.fade-up.visible { opacity: 1; transform: translateY(0); }`,
    js: `const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
}, { threshold: 0.15 });
document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));`,

  seo: {
    title: 'Reveal on Scroll — Free HTML CSS JS Snippet',
    description: 'Fade-up reveal driven by IntersectionObserver with staggered delays and unobserve cleanup. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Reveal on Scroll — IntersectionObserver, Fade-Up Transition & Stagger Delay',
      description: `Reveal-on-scroll animations make content appear to rise into view as it enters the viewport. They are one of the most widely used micro-animations on landing pages and long-form content sites — each section fades up as the user scrolls down (pair with a [split text](/ui-snippets/split-text/) headline reveal or a [scroll-snap gallery](/ui-snippets/scroll-snap-gallery/)), creating a sense that the page is being revealed progressively rather than all at once.

**The .fade-up starting state**

Elements with \`.fade-up\` start invisible and slightly below their final position: \`opacity: 0; transform: translateY(24px)\`. Both have a CSS \`transition\` so changes animate smoothly: \`transition: opacity 0.55s ease, transform 0.55s ease\`.

**The IntersectionObserver trigger**

A single IntersectionObserver watches all \`.fade-up\` elements with \`threshold: 0.15\` — the callback fires when 15% of the element is in the viewport. When \`e.isIntersecting\` is true, the observer adds \`.visible\` to the element: \`opacity: 1; transform: translateY(0)\`. The CSS transition handles the animation. \`obs.unobserve(e.target)\` immediately disconnects the observer for that element — the animation fires once and never repeats.

**Stagger delay**

CSS \`transition-delay\` can be set via inline style on each element: \`style="transition-delay: 0.1s"\`, \`0.2s\`, \`0.3s\`. This staggers the reveal so sibling elements animate in sequence rather than simultaneously — the same technique as the [stagger list](/ui-snippets/stagger-list/).

**Why IntersectionObserver over scroll events**

IntersectionObserver is asynchronous and runs off the main thread — it does not block rendering. Scroll events fire synchronously on every scroll tick and require manual threshold calculations. For reveal animations, IntersectionObserver is always the better choice.

**Respecting reduced-motion preferences**

Add \`@media (prefers-reduced-motion: reduce) { .fade-up { transition: none; transform: none; opacity: 1; } }\` to disable the animation for users who have requested reduced motion in their OS settings. This is important for accessibility compliance.

**IntersectionObserver with threshold**

The observer watches each .reveal element with threshold: 0.1 — the callback fires when 10% of the element is visible. Inside the callback, entry.isIntersecting determines if the element entered (add .visible) or left (optionally remove it for re-trigger). obs.disconnect() after the first trigger is intentional for most use cases — animations that re-play every scroll are typically more annoying than engaging.

**The CSS animation on .visible**

The .reveal class sets opacity: 0 and transform: translateY(30px) as the initial hidden state. The .visible class sets opacity: 1 and transform: translateY(0). CSS transition: opacity 0.6s ease, transform 0.6s ease handles the animation. The transition only fires when .visible is added — if .visible is set in HTML for above-the-fold content, no animation plays (the element starts visible).

**Staggered children with animation-delay**

For list items that should reveal one by one, add animation-delay: calc(var(--i) * 0.1s) where --i is a CSS custom property set as inline style on each child: style="--i:3". This creates a cascading reveal effect without JavaScript for each individual child.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll in the preview', text: 'Scroll down in the preview to see each card fade up from below as it enters the viewport. Each fires once via obs.unobserve.' },
        { title: 'Add .fade-up to any element', text: 'In the HTML panel, add class="fade-up" to any element you want to reveal on scroll. The JS observer picks it up automatically via querySelectorAll.' },
        { title: 'Add stagger delay', text: 'Add style="transition-delay: 0.1s" to the second element, 0.2s to the third, etc. to stagger siblings in a grid or list.' },
        { title: 'Change the trigger threshold', text: 'In the JS panel, update 0.15 in { threshold: 0.15 } to control how far the element must be in view before revealing.' },
        { title: 'Add reduced-motion fallback', text: 'In the CSS panel, add @media (prefers-reduced-motion: reduce) { .fade-up { transition: none; transform: none; opacity: 1; } }.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'opacity: 0 + translateY(24px) starting state on .fade-up elements',
      'transition: opacity 0.55s ease, transform 0.55s ease — CSS handles the animation',
      'IntersectionObserver fires at threshold: 0.15 — 15% of element visible',
      'obs.unobserve() ensures the animation fires exactly once per element',
      'Stagger via inline transition-delay on each element',
      'Asynchronous observer — does not block the main thread like scroll events',
      'Works on any element — add .fade-up class and it is observed automatically',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Landing page section reveals',       desc: 'Apply .fade-up to each section as users scroll. Each section rises into view progressively, creating a sense of discovery rather than a static wall of content.' },
      { icon: 'DESIGN', title: 'Feature card grid stagger animation', desc: 'Add .fade-up and staggered transition-delay to each card in a grid. The cards reveal sequentially across the row as the section enters view.' },
      { icon: 'LEARN',  title: 'Learn IntersectionObserver API',     desc: 'Edit the threshold and disconnect logic in the JS panel to understand how the observer fires. Change 0.15 to 0.5 and observe how the trigger point shifts.' },
      { icon: 'FLOW',   title: 'Blog post and article section reveals', desc: 'Apply to h2, paragraph, and image blocks in long-form content. The staggered reveal adds rhythm to reading without distracting from the content.' },
      { icon: 'CODE',   title: 'Replace ScrollReveal or AOS library', desc: 'This pattern replaces ScrollReveal.js, AOS (Animate on Scroll), and similar libraries for basic reveal animations with zero dependencies.' },
      { icon: 'ACCESS', title: 'Accessible reduced-motion fallback',  desc: 'Add @media (prefers-reduced-motion: reduce) { .fade-up { ... } } to disable the animation for users who need it. The content is always visible without animation.' },
      { icon: 'CODE', title: 'Related: Scroll 3D Flip Reveal', desc: 'See the [Scroll 3D Flip Reveal](/ui-snippets/scroll-3d-flip-reveal/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the reveal animation work?', a: 'Elements start with opacity: 0 and translateY(24px) — invisible and 24px below final position. An IntersectionObserver adds .visible when the element enters the viewport, triggering CSS transitions: opacity: 1 and translateY(0). The CSS handles the animation; JS only toggles the class.' },
      { q: 'Why use IntersectionObserver instead of a scroll event?', a: 'IntersectionObserver runs asynchronously off the main thread and does not cause layout thrashing. Scroll events fire synchronously on every scroll tick and require manual getBoundingClientRect calls. For animations, IntersectionObserver is more performant and simpler to write.' },
      { q: 'Why call obs.unobserve(e.target)?', a: 'obs.unobserve() disconnects the observer for that specific element after it has revealed. Without it, the observer would continue checking the element on every scroll tick, and if the element leaves and re-enters the viewport it would animate again.' },
      { q: 'How do I add stagger delay?', a: 'Add style="transition-delay: 0.1s" to the second element, 0.2s to the third, 0.3s to the fourth, etc. Each element starts its animation after the specified delay, creating a sequential reveal across a row.' },
      { q: 'How do I respect prefers-reduced-motion?', a: 'Add @media (prefers-reduced-motion: reduce) { .fade-up { opacity: 1; transform: none; transition: none; } } to the CSS. This immediately shows all fade-up elements without animation for users who have enabled reduced motion in their OS.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, use a useEffect with an IntersectionObserver. Attach a ref to the container, observe all .fade-up descendants, and clean up the observer on unmount.' },
    ],
    aiPrompt: {
      paragraph: `You do not have to work through the observer mechanics by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why obs.unobserve is called inside the callback rather than after the forEach loop, and why IntersectionObserver's asynchronous, off-main-thread design makes it strictly better here than computing getBoundingClientRect on a scroll listener. The same assistant can help you optimize it — ask whether a single shared observer instance watching every .fade-up element (as this snippet does) scales better than creating one observer per element, and at what element count that distinction starts to actually matter. It's also useful for extending the effect: ask it to add a reduced-motion media query fallback that skips the animation entirely, support re-triggering the reveal every time an element re-enters view instead of only once, or drive the stagger delay from a CSS custom property set per element instead of inline transition-delay. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "reveal on scroll" fade-up animation in plain HTML, CSS, and JavaScript using the IntersectionObserver API — no scroll event listeners, no animation library.

Requirements:
- Give elements meant to reveal a starting CSS state of opacity 0 and a transform of translateY by a positive pixel amount (so they sit slightly below their final position), with a CSS transition declared on both the opacity and transform properties.
- Create exactly one IntersectionObserver instance (not one per element) with a threshold around 0.15, and use it to observe every element carrying the reveal class via a single querySelectorAll loop.
- Inside the observer's callback, when an entry's isIntersecting property is true, add a "visible" class to that element (setting opacity to 1 and the transform to none, which the existing CSS transition will animate smoothly) and immediately call unobserve on that specific element so it can only ever animate in once, not on every scroll back and forth.
- Support staggering multiple sibling elements by allowing each one to declare its own transition-delay (via inline style) so they animate in sequence rather than all at once when they enter the viewport together.
- Add a prefers-reduced-motion media query that disables the transition and transform entirely and forces opacity to 1, so users who have requested reduced motion see the content immediately with no animation.`,
    },
  },
};

export default revealOnScroll;
