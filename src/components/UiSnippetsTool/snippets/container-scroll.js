const containerScroll = {
  id: 'container-scroll',
  title: 'Container Scroll Reveal',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<div class="cs-intro">Scroll down ↓</div>
<section class="cs-section" id="csSection">
  <div class="cs-sticky">
    <div class="cs-head" id="csHead">
      <p class="cs-eyebrow">Introducing</p>
      <h1>Your dashboard,<br>reimagined</h1>
    </div>
    <div class="cs-frame" id="csFrame">
      <div class="cs-bar"><span></span><span></span><span></span></div>
      <div class="cs-screen">
        <div class="cs-side"></div>
        <div class="cs-main"><div class="cs-row"></div><div class="cs-row"></div><div class="cs-cards"><i></i><i></i><i></i></div><div class="cs-row"></div></div>
      </div>
    </div>
  </div>
</section>
<div class="cs-outro">It rotates flat and scales up as you scroll.</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#070710;color:#fff}

.cs-intro,.cs-outro{height:50vh;display:flex;align-items:center;justify-content:center;color:#55556e;font-size:15px}
.cs-section{height:200vh;position:relative}
.cs-sticky{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;perspective:1200px;overflow:hidden}

.cs-head{text-align:center;transition:transform .1s linear}
.cs-eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#818cf8;margin-bottom:10px}
.cs-head h1{font-size:clamp(30px,6vw,56px);font-weight:900;letter-spacing:-.03em;line-height:1.05}

.cs-frame{width:min(900px,92vw);border-radius:18px;background:#0e0e1c;border:1px solid #23233c;padding:10px;box-shadow:0 40px 80px -30px rgba(0,0,0,.8);transform-origin:center top;will-change:transform}
.cs-bar{display:flex;gap:7px;padding:7px 6px 11px}
.cs-bar span{width:11px;height:11px;border-radius:50%;background:#2a2a44}
.cs-bar span:first-child{background:#f87171}.cs-bar span:nth-child(2){background:#fbbf24}.cs-bar span:nth-child(3){background:#34d399}
.cs-screen{display:flex;gap:12px;height:clamp(220px,42vh,420px);background:#06060f;border-radius:12px;padding:12px}
.cs-side{width:22%;border-radius:9px;background:linear-gradient(180deg,#15152a,#0d0d1c)}
.cs-main{flex:1;display:flex;flex-direction:column;gap:12px}
.cs-row{height:34px;border-radius:8px;background:#14142a}
.cs-cards{display:flex;gap:12px;flex:1}
.cs-cards i{flex:1;border-radius:10px;background:linear-gradient(135deg,#6366f1,#22d3ee)}`,

  js: `var section = document.getElementById('csSection');
var frame = document.getElementById('csFrame');
var head = document.getElementById('csHead');
var ticking = false;

// Map scroll progress through the tall section (0..1) to: a flattening rotateX
// (starts tilted back at 32deg, ends flat), a scale-up, and the heading lifting.
function update() {
  var rect = section.getBoundingClientRect();
  var total = section.offsetHeight - window.innerHeight;
  var p = Math.max(0, Math.min(1, -rect.top / total));   // 0 at top, 1 at bottom

  var rotX = 32 * (1 - p);                 // 32deg -> 0deg
  var scale = 0.86 + p * 0.14;             // 0.86 -> 1.0
  frame.style.transform = 'rotateX(' + rotX.toFixed(2) + 'deg) scale(' + scale.toFixed(3) + ')';
  head.style.transform = 'translateY(' + (p * -60) + 'px)';
  head.style.opacity = (1 - p * 0.6).toFixed(2);
  ticking = false;
}

window.addEventListener('scroll', function () {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}, { passive: true });
window.addEventListener('resize', update);
update();`,

  seo: {
    title: 'Container Scroll Reveal — Free HTML CSS JS Snippet',
    description: `A device mockup that starts tilted back in 3D and rotates flat while scaling up as you scroll, with the heading lifting away. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Container Scroll Reveal — A Mockup That Rotates Flat on Scroll',
      description: `The container scroll reveal is the product-launch animation where a browser or dashboard mockup begins tilted back in 3D — as if lying on a table — and rotates upright while scaling toward you as the user scrolls, with the headline drifting up and fading as the screen takes over. This snippet builds the whole scroll-linked effect with plain HTML, CSS, and a compact vanilla JavaScript scroll handler.

**A tall section with a sticky stage**

The trick to scroll-linked animation is giving the scroll somewhere to happen. The \`.cs-section\` is 200vh tall, and inside it a \`.cs-sticky\` element is \`position: sticky; top: 0; height: 100vh\` — so it pins to the viewport and stays put while you scroll through the extra 100vh of the section. That pinned window is the stage on which the mockup animates, and the section's height is what gives you a full screen of scroll to drive the animation.

**Mapping scroll to progress**

Each frame, \`update()\` computes a progress value \`p\` from 0 to 1 by comparing the section's \`getBoundingClientRect().top\` against the total scrollable distance (\`offsetHeight - innerHeight\`). \`p\` is 0 when the section reaches the top of the viewport and 1 when you've scrolled to its bottom. Every animated property is then a simple function of \`p\`, which keeps the whole effect driven by one normalized number.

**The flatten-and-grow transform**

The mockup's tilt is \`rotateX(32 * (1 - p))\`, inside a \`perspective: 1200px\` stage — so at \`p = 0\` it's tilted back 32° and at \`p = 1\` it's perfectly upright. Simultaneously it scales from \`0.86\` to \`1.0\` (\`0.86 + p * 0.14\`), so the screen grows as it rises to face you. With \`transform-origin: center top\`, the rotation pivots from the top edge, so the mockup appears to stand up rather than spin in place. The heading, meanwhile, translates up by \`p * -60px\` and fades, handing focus to the product as it arrives.

**Efficient, jank-free scroll handling**

The \`scroll\` listener is \`{ passive: true }\` and throttled with \`requestAnimationFrame\` behind a \`ticking\` flag, so no matter how many scroll events fire, the layout read and style writes happen at most once per frame. A \`resize\` listener re-runs the math because the scrollable distance depends on viewport height. This is the standard pattern for smooth scroll-driven effects without a library.

**A pure-CSS mockup**

The "dashboard" is built entirely from divs — a traffic-light title bar, a sidebar, list rows, and a row of gradient cards — so there are no image assets and it stays crisp at any scale. Swap the inner content for a real screenshot \`<img>\` and the scroll animation is unchanged.

**Customizing it**

Change the starting \`32deg\` tilt and the \`0.86\` start scale for a more or less dramatic reveal, lengthen the section beyond 200vh to slow the animation, adjust how far the heading lifts, or replace the mockup with your own UI. Pair it with [stacking scroll cards](/ui-snippets/stacking-scroll-cards/) below or an [animated gradient CTA](/ui-snippets/animated-gradient-cta/) to close the launch story.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A heading and a tilted-back dashboard mockup pin to the viewport.` },
      { title: 'Scroll down', text: `The mockup rotates upright and scales toward you.` },
      { title: 'Keep scrolling', text: `The heading lifts away and fades as the screen takes over.` },
      { title: 'Scroll back up', text: `The animation reverses smoothly, linked to scroll.` },
      { title: 'Slow it down', text: `Increase the section height beyond 200vh.` },
      { title: 'Swap in a screenshot', text: `Replace the CSS mockup with a real image.` },
    ] },
    features: [
      { title: 'Sticky scroll stage', text: `A tall section pins a 100vh window to animate in.` },
      { title: 'Normalized progress', text: `One 0–1 value drives every property.` },
      { title: 'Flatten transform', text: `rotateX eases from 32° to upright on scroll.` },
      { title: 'Scale-up reveal', text: `The mockup grows as it stands up.` },
      { title: 'Top-edge pivot', text: `transform-origin makes it rise, not spin.` },
      { title: 'Heading handoff', text: `Title lifts and fades as the screen arrives.` },
      { title: 'rAF-throttled scroll', text: `Passive, one update per frame.` },
      { title: 'Pure-CSS mockup', text: `Image-free, crisp at any scale.` },
    ],
    useCases: [
      { title: 'Product launches', text: `Reveal an app before [stacking scroll cards](/ui-snippets/stacking-scroll-cards/).` },
      { title: 'SaaS hero sections', text: `Stand up a dashboard above a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'App marketing', text: `Pair with a [phone mockup](/ui-snippets/phone-mockup/) elsewhere.` },
      { title: 'Landing stories', text: `Lead into an [animated gradient CTA](/ui-snippets/animated-gradient-cta/).` },
      { title: 'Feature reveals', text: `Introduce a new screen with motion.` },
      { title: 'Scroll-link demos', text: `A reference for sticky scroll-progress mapping.` },
      { icon: 'CODE', title: 'Related: Box Reveal', desc: 'See the [Box Reveal](/ui-snippets/box-reveal/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sticky Section Counter (scroll-timeline)', desc: 'See the [Sticky Section Counter (scroll-timeline)](/ui-snippets/css-scroll-timeline-section-counter/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the animation linked to scrolling?', a: `The section is 200vh tall with a sticky 100vh child that pins to the viewport. Each frame, update() computes a 0–1 progress from the section's bounding-rect top against its scrollable distance. Every animated property — tilt, scale, heading offset — is a function of that single progress value, so the effect tracks scroll exactly.` },
      { q: 'Why does the mockup appear to stand up rather than spin?', a: `Its transform-origin is center top, so the rotateX pivots around the top edge. As the angle eases from 32 degrees to 0, the bottom of the mockup swings up toward the viewer like a screen being raised, instead of rotating around its own middle. The simultaneous scale-up reinforces the sense of it rising to face you.` },
      { q: 'Is the scroll handling performant?', a: `Yes. The scroll listener is passive and throttled with requestAnimationFrame behind a ticking flag, so the layout read and style writes run at most once per frame regardless of how many scroll events fire. A resize listener re-runs the math since the scrollable distance depends on viewport height.` },
      { q: 'Can I use a real screenshot instead of the CSS mockup?', a: `Yes. The dashboard is built from plain divs only so the snippet needs no assets. Replace the inner .cs-screen content with an img of your product, keeping the .cs-frame wrapper. The rotate-and-scale scroll animation is applied to the frame, so it works identically with real imagery.` },
      { q: 'How do I use this container scroll reveal in React, Vue, or Angular?', a: `Keep the sticky section and run the scroll/resize handlers in a mount effect with cleanup, writing the frame and heading transforms via refs so scrolling doesn't trigger re-renders. Store the ticking flag in a ref. The CSS, including the sticky stage and perspective, ports directly. In Tailwind, use sticky and perspective utilities and apply the computed transforms through inline styles.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the progress math by hand to trust why the mockup rises rather than spins. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how getBoundingClientRect().top and the section's scrollable distance combine into the single 0-to-1 progress value, and why transform-origin center top specifically is what makes the rotateX read as "standing up" instead of tumbling. The same assistant can help optimize it — for instance asking whether the rAF-throttled scroll listener is enough on very low-end devices, or whether will-change on the frame element is pulling its weight versus costing memory. It's also useful for extending the effect: ask it to drive a second element (like a caption or badge) off the same progress value, swap the linear mapping for an eased curve so the flatten feels less mechanical, or make the tilt angle and scroll distance configurable per breakpoint. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-linked "container reveal" effect in plain HTML, CSS, and JavaScript where a mockup starts tilted back in 3D and rotates flat while scaling up as the user scrolls — no scroll library, no GSAP.

Requirements:
- A section significantly taller than the viewport (e.g. 200vh) containing a child pinned with position sticky and a height equal to the full viewport, so that scrolling through the tall section holds that child in place on screen while the user scrolls through the extra height.
- A single scroll handler that computes one normalized progress value between 0 and 1 by comparing the tall section's bounding-rect top position against its total scrollable distance (its own height minus the viewport height), clamped so it never goes below 0 or above 1.
- Every animated property must be derived purely as a function of that one progress value — no separate scroll-position tracking per element.
- The mockup element sits inside a parent with a CSS perspective value, and its own transform combines a rotateX that eases from a tilted-back angle (e.g. 32 degrees) down to 0 degrees as progress goes from 0 to 1, together with a scale that grows from slightly under 1 up to exactly 1, using transform-origin center top so the rotation pivots from the top edge and reads as the mockup standing upright rather than spinning around its center.
- A heading element above the mockup must translate upward and fade out as progress increases, so it visually hands off attention to the mockup as it takes over the screen.
- Throttle the scroll handler with requestAnimationFrame behind a boolean flag so the layout read and style writes happen at most once per animation frame regardless of how many scroll events fire, use a passive scroll listener, and also recompute on window resize since the scrollable distance depends on viewport height.
- Build the mockup's inner "screen" content from plain divs (title bar dots, a sidebar, rows, and a row of gradient cards) with no image assets, so it stays crisp at any scale and could be swapped for a real screenshot without touching the animation code.`,
    },
  },
};

export default containerScroll;
