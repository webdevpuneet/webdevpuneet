const gradientMeshHero = {
  id: 'gradient-mesh-hero',
  title: 'Gradient Mesh Hero',
  category: 'heroes',
  html: `<section class="hero">
  <div class="mesh"></div>
  <div class="mesh-2"></div>
  <div class="mesh-3"></div>

  <div class="content">
    <div class="eyebrow">Design System &amp; Components</div>

    <h1 class="headline">Beautiful interfaces<br>built for <span class="swap" id="swap">everyone</span></h1>

    <p class="sub">Copy-paste components that look great out of the box. No configuration, no opinion lock-in — just clean, production-ready code that works everywhere.</p>

    <div class="btns">
      <a href="#" class="btn-solid">Browse components</a>
      <a href="#" class="btn-outline">Read the docs</a>
    </div>

    <div class="stats">
      <div class="stat"><span class="stat-n">97+</span><span class="stat-l">Components</span></div>
      <div class="divider"></div>
      <div class="stat"><span class="stat-n">11</span><span class="stat-l">Categories</span></div>
      <div class="divider"></div>
      <div class="stat"><span class="stat-n">Free</span><span class="stat-l">Forever</span></div>
    </div>
  </div>

  <div class="scroll-hint">
    <div class="scroll-line"></div>
    <span>Scroll</span>
  </div>
</section>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; min-height: 100vh; overflow: hidden; }

.hero { position: relative; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #030712; overflow: hidden; }

/* CSS mesh gradient blobs */
.mesh, .mesh-2, .mesh-3 { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; animation: drift 18s ease-in-out infinite; }
.mesh   { width: 600px; height: 600px; background: radial-gradient(circle, rgba(99,102,241,0.5), transparent 70%); top: -150px; left: -100px; }
.mesh-2 { width: 500px; height: 500px; background: radial-gradient(circle, rgba(236,72,153,0.4), transparent 70%); bottom: -100px; right: -80px; animation-delay: -6s; animation-direction: reverse; }
.mesh-3 { width: 350px; height: 350px; background: radial-gradient(circle, rgba(14,165,233,0.35), transparent 70%); top: 40%; left: 40%; animation-delay: -12s; }

@keyframes drift {
  0%,100% { transform: translate(0, 0) scale(1); }
  33%      { transform: translate(40px, -50px) scale(1.05); }
  66%      { transform: translate(-30px, 30px) scale(0.95); }
}

.content { position: relative; z-index: 1; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 24px; padding: 0 24px; max-width: 760px; }

.eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: rgba(165,180,252,0.8); background: rgba(99,102,241,0.1); border: 1px solid rgba(99,102,241,0.25); padding: 6px 16px; border-radius: 20px; }

.headline { font-size: clamp(38px, 7vw, 74px); font-weight: 900; color: #fff; line-height: 1.1; letter-spacing: -1.5px; }
.swap { background: linear-gradient(90deg, #a78bfa, #ec4899, #f97316); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; display: inline-block; background-size: 200%; animation: shimmer 4s linear infinite; }
@keyframes shimmer { 0% { background-position: 0% } 100% { background-position: 200% } }

.sub { font-size: 15px; color: rgba(148,163,184,0.9); line-height: 1.8; max-width: 480px; }

.btns { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; }
.btn-solid   { background: #6366f1; color: #fff; font-size: 14px; font-weight: 700; padding: 12px 26px; border-radius: 10px; text-decoration: none; transition: background 0.15s; }
.btn-solid:hover { background: #4f46e5; }
.btn-outline { background: transparent; color: #e2e8f0; font-size: 14px; font-weight: 600; padding: 12px 26px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.15); text-decoration: none; transition: border-color 0.15s, background 0.15s; }
.btn-outline:hover { border-color: rgba(255,255,255,0.3); background: rgba(255,255,255,0.05); }

.stats { display: flex; align-items: center; gap: 24px; margin-top: 8px; }
.stat { display: flex; flex-direction: column; align-items: center; gap: 2px; }
.stat-n { font-size: 22px; font-weight: 800; color: #fff; }
.stat-l { font-size: 11px; color: rgba(100,116,139,0.9); text-transform: uppercase; letter-spacing: 0.8px; }
.divider { width: 1px; height: 28px; background: rgba(255,255,255,0.1); }

/* Scroll hint */
.scroll-hint { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); display: flex; flex-direction: column; align-items: center; gap: 8px; z-index: 1; }
.scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, transparent, rgba(99,102,241,0.6)); animation: scrollAnim 2s ease-in-out infinite; }
.scroll-hint span { font-size: 10px; letter-spacing: 2px; text-transform: uppercase; color: rgba(100,116,139,0.6); }
@keyframes scrollAnim { 0%,100% { opacity: 0.3; transform: scaleY(0.8); } 50% { opacity: 1; transform: scaleY(1); } }`,
  js: `// Cycling word swap animation
const words = ['everyone', 'developers', 'designers', 'startups', 'teams'];
let idx = 0;
const el = document.getElementById('swap');

setInterval(() => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(8px)';
  el.style.transition = 'opacity 0.3s, transform 0.3s';
  setTimeout(() => {
    idx = (idx + 1) % words.length;
    el.textContent = words[idx];
    el.style.opacity = '1';
    el.style.transform = 'translateY(0)';
  }, 320);
}, 2800);`,
  seo: {
    title: 'Gradient Mesh Hero — Free HTML CSS JS Snippet',
    description: 'Animated mesh-gradient hero with shimmer headline, cycling word swap and stats row on dark. Copy-paste or export to React, Vue & Tailwind.',
    about: {
      title: 'Gradient Mesh Hero — Animated CSS Mesh Background, Shimmer Text & Cycling Word Swap',
      description: `The mesh gradient hero is the most popular aesthetic on modern product landing pages — a dark background with large blurred radial-gradient colour blobs that drift slowly, creating an ambient painted background effect. This snippet gives you a complete implementation with three animated mesh blobs, a shimmer gradient headline, a cycling [word swap](/ui-snippets/word-flip-hero/) animation, a stats row, and a scroll-down indicator — all in plain HTML, CSS, and minimal JavaScript.\n\n**How the CSS mesh gradient works**\n\nThree absolutely positioned div elements (.mesh, .mesh-2, .mesh-3) each have a radial-gradient background in different colours (indigo, pink, cyan) and filter: blur(80px) to create the soft, painterly blob effect. They use position: absolute and overflow: hidden on the parent to stay contained. A CSS @keyframes animation (drift) moves each blob by translate(x,y) and scale() on a different delay and direction — so they move independently and never look static. The blur is handled on the GPU compositor.\n\n**The shimmer gradient headline**\n\nThe .swap span has background: linear-gradient(90deg, purple, pink, orange) with background-size: 200%. A @keyframes animation shifts background-position from 0% to 200%, causing the gradient to sweep continuously across the text — a smooth shimmer effect that runs indefinitely.\n\n**The word swap animation**\n\nA setInterval cycles through ["everyone", "developers", "designers", "startups", "teams"] every 2.8 seconds. On each tick, the element fades out via opacity: 0 and translateY(8px), then the text changes and fades back in. This pattern cycles through audience segments to communicate broad relevance without a long copy list.\n\n**The scroll-down indicator**\n\nA vertical gradient line animates via scaleY and opacity to suggest downward scroll. The line uses background: linear-gradient(to bottom, transparent, indigo) for a natural fade-in from nothing. Letter-spaced uppercase "Scroll" label below reinforces the affordance.\n\n**The stats row**\n\nThree stats (97+ components, 11 categories, Free) separated by thin 1px dividers communicate scale and value proposition at a glance. Update with your own product metrics.\n\n**Performance and accessibility**\n\nAll three mesh blob animations use CSS transform — GPU compositor only, no layout recalculation triggered. The shimmer gradient text animation uses background-position — also compositor-safe. For users who prefer reduced motion, add @media (prefers-reduced-motion: reduce) { .mesh, .mesh-2, .mesh-3 { animation: none; } .swap { animation: none; } } to freeze the blobs and shimmer without removing the visual design. The word swap setInterval should also be gated: check window.matchMedia("(prefers-reduced-motion: reduce)").matches before calling setInterval.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click play and watch the mesh animation', text: 'Three gradient blobs drift independently using the drift @keyframes with different animation-delay and direction values. The shimmer text and word swap also run automatically on load.' },
      { title: 'Change the mesh blob colours', text: 'In the CSS panel, update the rgba colours in .mesh, .mesh-2, and .mesh-3 background radial-gradient values. Use rgba() with low opacity (0.3–0.5) so blobs blend smoothly without overpowering the text.' },
      { title: 'Update the cycling words', text: 'In the JS panel, edit the words array: ["everyone", "developers", ...]. Add or remove audience segments. Change the 2800ms interval to control swap speed.' },
      { title: 'Update the headline and stats', text: 'Edit the static part of the headline in the HTML h1. Update the .stat-n values to your real component count, category count, or other product metrics.' },
      { title: 'Adjust the mesh speed and size', text: 'In the CSS, change animation-duration on .mesh (default 18s) to speed up or slow down the drift. Reduce width/height on each .mesh element for smaller, tighter blobs. Increase filter: blur() for softer, more diffuse blobs.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component with useEffect for the word swap interval and cleanup, or "Tailwind" for a React + Tailwind CSS version.' },
    ]},
    features: ['3 CSS radial-gradient mesh blobs with filter:blur(80px) and drift animation','Drift keyframe: translate(x,y) + scale() with staggered delay and reverse direction','Shimmer gradient text: background-size:200% + background-position keyframe sweep','Word swap: setInterval fade-out/in via opacity + translateY transition','Scroll-down indicator: scaleY + opacity gradient line animation','Stats row with thin 1px divider separators','Dark #030712 background with mesh contained via overflow:hidden','GPU compositor animations — no layout or paint triggers'],
    useCases: [
      { icon: 'APP', title: 'SaaS product and developer tool landing page hero', desc: 'The mesh gradient aesthetic is the dominant visual style on modern developer tool and SaaS landing pages. The dark background and coloured blobs signal technical sophistication while the cycling word swap demonstrates broad audience relevance in a small space.' },
      { icon: 'DESIGN', title: 'Design system, component library, and UI kit homepages', desc: 'The stats row (97+ components, 11 categories, Free) maps directly to a component library homepage. The "Browse components" CTA drives users into the library. Adapt the stats to your own library counts and update the eyebrow label.' },
      { icon: 'STAR', title: 'Creative agency and portfolio hero sections', desc: 'The animated mesh background creates an immersive, premium feel suitable for creative agencies (see the editorial [agency hero](/ui-snippets/agency-hero/)), design studios, and freelancer portfolios. Replace the headline with your positioning statement and the stats with years of experience, completed projects, and happy clients.' },
      { icon: 'CODE', title: 'Open source project and GitHub Pages landing pages', desc: 'The dark aesthetic and technical framing work perfectly for open source library landing pages. The word swap can cycle through use cases ("for React", "for Vue", "for Svelte"). The "Read the docs" CTA links to your documentation site.' },
      { icon: 'LEARN', title: 'Learn CSS mesh gradient and shimmer animation techniques', desc: 'The mesh gradient demonstrates how radial-gradient + blur + animation creates a complex painted background from simple CSS. The shimmer text shows how background-size: 200% and animated background-position create continuous motion without keyframe colour changes.' },
      { icon: 'FLOW', title: 'Waitlist and coming-soon pages with visual polish', desc: 'A mesh gradient background communicates design quality even before the product is built. Use the hero for a coming-soon page: replace the CTA with an email capture form (see [Product Hero](/ui-snippets/product-hero/) in this category), keep the mesh animation, and remove the stats row until launch.' },
      { icon: 'CODE', title: 'Related: Before/After Hero with Comparison Slider', desc: 'See the [Before/After Hero with Comparison Slider](/ui-snippets/hero-before-after-slider/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Typed.js Multi-String Hero', desc: 'See the [Typed.js Multi-String Hero](/ui-snippets/typed-js-multi-string-hero/) for a related heroes pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hero with Voice Input Waveform Demo', desc: 'See the [Hero with Voice Input Waveform Demo](/ui-snippets/hero-voice-waveform-input/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the CSS mesh gradient background work?', a: 'Three div elements are positioned absolutely inside the hero. Each has a radial-gradient background in a different colour with filter: blur(80px) applied — the blur creates the soft, diffuse blob shape. A CSS @keyframes animation moves each blob via transform: translate() and scale() on different durations (18s), delays (-6s, -12s), and directions (normal, reverse). Because they move at different rates and in different directions, they never synchronise and always look organic. Crucially, transforms run on the GPU compositor and do not trigger layout recalculation.' },
      { q: 'How do I add a fourth mesh blob colour?', a: 'Copy one of the .mesh div elements in the HTML and add a .mesh-4 class. In the CSS, add .mesh-4 { width: 400px; height: 400px; background: radial-gradient(circle, rgba(234,179,8,0.3), transparent 70%); top: 20%; right: 20%; animation-delay: -9s; } — adjust the position, size, and colour to fill any empty area. Multiple overlapping blobs with mix-blend-mode: screen (if you add it) would blend colours additively.' },
      { q: 'How does the word swap cycling animation work?', a: 'setInterval fires every 2800ms. On each tick, it applies opacity: 0 and transform: translateY(8px) via inline style with transition to fade the element out and slide it down. After 320ms (the transition duration), a setTimeout fires, changes el.textContent to the next word in the array, then immediately sets opacity: 1 and transform: translateY(0) to fade back in. The result is a clean fade-swap with a slight upward slide that signals the text has changed.' },
      { q: 'Can I use this hero in a React or Next.js project?', a: 'Yes. Click "JSX" to download. In React, manage the word swap in a useEffect with a setInterval. Return a cleanup function that calls clearInterval() to prevent memory leaks when the component unmounts: useEffect(() => { const id = setInterval(() => { ... }, 2800); return () => clearInterval(id); }, []). In Next.js App Router, add "use client" since the component uses useEffect. The CSS mesh animations are purely CSS and work unchanged in any framework.' },
    ],
    aiPrompt: {
      paragraph: `Instead of manually tracing how three blurred blobs never look synchronized, hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain why staggering each mesh div's drift animation-delay and flipping animation-direction to reverse on one of them is what keeps the background from ever repeating a visible pattern. The same assistant can help optimize it — ask whether three large blurred, animated divs are cheap enough on low-end mobile GPUs, or whether the word-swap setInterval should be paused when the tab is backgrounded using the Page Visibility API. It's also a fast way to extend the hero: ask it to make the mesh blobs follow the cursor slightly for a parallax feel, add a fourth blob with its own color and timing, or gate the whole animation set behind a prefers-reduced-motion media query with a graceful static fallback. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated gradient mesh hero section in plain HTML, CSS, and minimal JavaScript, no canvas, no libraries.

Requirements:
- Three or more absolutely positioned, large circular divs, each with a different radial-gradient background fading to transparent, each with filter: blur(80px), contained inside a hero section with overflow: hidden so nothing bleeds past the viewport.
- One shared drift keyframe animation that moves each blob with transform: translate(x, y) scale(s) through at least three keyframe stops, applied to every blob but with a different animation-delay (using negative values so they start mid-cycle) and at least one blob using animation-direction: reverse, so the blobs never move in visible unison.
- A headline where part of the text uses a linear-gradient background with background-size around 200%, background-clip: text and transparent text fill, animated by shifting background-position across a keyframe loop to create a continuous color shimmer.
- A JavaScript-driven word-swap: an array of words cycled by setInterval, where each tick fades the current word out (opacity 0, translateY offset) via a CSS transition, swaps the textContent after the transition duration with setTimeout, then fades the new word back in.
- A scroll-down indicator built from a short vertical gradient line that pulses opacity and scaleY on an infinite keyframe animation.
- A stats row with thin 1px divider elements between each stat, and primary and outline call-to-action buttons below the headline.`,
    },
  },
};

export default gradientMeshHero;
