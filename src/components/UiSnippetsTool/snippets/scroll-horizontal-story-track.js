const scrollHorizontalStoryTrack = {
  id: 'scroll-horizontal-story-track',
  title: 'Scroll Horizontal Story Track',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollToPlugin.min.js',
  ],
  html: `<section class="hst-intro"><h1>From Sketch to Shelf</h1><p>Keep scrolling down — the story moves sideways.</p></section>
<section class="hst-pin" id="hstPin">
  <div class="hst-track" id="hstTrack">
    <article class="hst-slide" style="--c1:#0ea5e9;--c2:#0369a1">
      <span class="hst-chapter">01</span>
      <h2>The Sketch</h2>
      <p>A napkin drawing at 11pm becomes the first real concept board by morning.</p>
    </article>
    <article class="hst-slide" style="--c1:#f97316;--c2:#9a3412">
      <span class="hst-chapter">02</span>
      <h2>The Prototype</h2>
      <p>Forty-one failed print runs later, version forty-two finally holds its shape.</p>
    </article>
    <article class="hst-slide" style="--c1:#22c55e;--c2:#14532d">
      <span class="hst-chapter">03</span>
      <h2>The Factory</h2>
      <p>A small workshop scales into a production line without losing the original tolerance.</p>
    </article>
    <article class="hst-slide" style="--c1:#a78bfa;--c2:#4c1d95">
      <span class="hst-chapter">04</span>
      <h2>The Warehouse</h2>
      <p>Ten thousand units, boxed and labeled, waiting for a truck that leaves at dawn.</p>
    </article>
    <article class="hst-slide" style="--c1:#f43f5e;--c2:#881337">
      <span class="hst-chapter">05</span>
      <h2>The Shelf</h2>
      <p>A stranger picks it up, turns it over once, and puts it in the cart.</p>
    </article>
  </div>
  <div class="hst-hud">
    <div class="hst-bar"><div class="hst-bar-fill" id="hstBarFill"></div></div>
    <div class="hst-dots" id="hstDots"></div>
  </div>
</section>
<section class="hst-outro"><p>Every product on every shelf has a story just like this one.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08090c;color:#fff;min-height:100vh}
.hst-intro,.hst-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.hst-intro h1{font-size:clamp(30px,6vw,54px);letter-spacing:-.02em}
.hst-intro p,.hst-outro p{color:#8b90a8;font-size:15px;max-width:440px}
.hst-pin{position:relative;height:100vh;overflow:hidden}
.hst-track{display:flex;height:100%;width:max-content;will-change:transform}
.hst-slide{width:100vw;height:100%;flex-shrink:0;display:flex;flex-direction:column;justify-content:center;align-items:flex-start;gap:10px;padding:0 10vw;background:linear-gradient(135deg,var(--c1),var(--c2))}
.hst-chapter{font-size:14px;font-weight:800;letter-spacing:.14em;color:rgba(255,255,255,.75)}
.hst-slide h2{font-size:clamp(32px,6vw,64px);letter-spacing:-.02em}
.hst-slide p{font-size:16px;line-height:1.6;color:rgba(255,255,255,.88);max-width:460px}
.hst-hud{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:12px;z-index:2}
.hst-bar{width:min(320px,70vw);height:4px;border-radius:999px;background:rgba(255,255,255,.2);overflow:hidden}
.hst-bar-fill{width:0%;height:100%;background:#fff;border-radius:999px}
.hst-dots{display:flex;gap:8px}
.hst-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.35);transition:background .25s,transform .25s}
.hst-dot.is-active{background:#fff;transform:scale(1.3)}`,

  js: `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const track = document.getElementById('hstTrack');
const slides = gsap.utils.toArray('.hst-slide');
const barFill = document.getElementById('hstBarFill');
const dotsWrap = document.getElementById('hstDots');

slides.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'hst-dot' + (i === 0 ? ' is-active' : '');
  dotsWrap.appendChild(dot);
});
const dots = dotsWrap.children;

// The track is a flex row wider than the viewport (5 slides x 100vw). The
// vertical scroll distance while pinned is translated 1:1 into a
// horizontal translateX on the track, so scrolling down the page reads,
// visually, as walking sideways through the chapters — the standard
// "horizontal scrolling section" GSAP recipe.
function getScrollDistance() {
  return track.scrollWidth - window.innerWidth;
}

const tween = gsap.to(track, {
  x: () => -getScrollDistance(),
  ease: 'none',
  scrollTrigger: {
    trigger: '#hstPin',
    start: 'top top',
    end: () => '+=' + getScrollDistance(),
    pin: true,
    scrub: 0.5,
    invalidateOnRefresh: true,
    onUpdate(self) {
      barFill.style.width = (self.progress * 100).toFixed(1) + '%';
      const active = Math.min(slides.length - 1, Math.round(self.progress * (slides.length - 1)));
      for (let i = 0; i < dots.length; i++) {
        dots[i].classList.toggle('is-active', i === active);
      }
    },
  },
});

// Clicking a dot jumps scroll directly to that chapter's slice of the
// pinned distance, computed from the same tween's own ScrollTrigger so the
// jump target always matches whatever the current viewport size produced.
Array.from(dots).forEach((dot, i) => {
  dot.style.cursor = 'pointer';
  dot.addEventListener('click', () => {
    const st = tween.scrollTrigger;
    const targetProgress = i / (slides.length - 1);
    const y = st.start + targetProgress * (st.end - st.start);
    gsap.to(window, { scrollTo: { y }, duration: 0.6, ease: 'power2.inOut' });
  });
});`,

  seo: {
    title: 'Scroll Horizontal Story Track — Free GSAP ScrollTrigger Sideways Scrollytelling',
    description: `A pinned narrative track that translates horizontally as the visitor scrolls vertically, with a progress bar and clickable chapter dots, built with GSAP ScrollTrigger scrub.`,
    about: {
      title: 'Scroll Horizontal Story Track — A Story That Moves Sideways as You Scroll Down',
      description: `Vertical scroll is the default, but some narratives — a product's journey, a process pipeline, a timeline of scenes — read more naturally as a left-to-right sequence. This snippet uses the standard GSAP "horizontal scroll section" recipe to translate a wide flex row sideways in exact lockstep with normal, familiar vertical scrolling, so visitors never have to learn a new input gesture.

**Vertical input, horizontal output — one scrubbed tween**

The five \`.hst-slide\` chapters sit in a flex row (\`.hst-track\`) five viewport-widths wide. A single \`gsap.to()\` tween animates the track's \`x\` from 0 to \`-getScrollDistance()\` (the track's overflow width beyond the viewport), with its \`scrollTrigger\` pinning \`#hstPin\` and scrubbing at \`0.5\`. Because scrub ties the tween's progress directly to scroll position, the visitor's ordinary mouse wheel or trackpad scroll — still vertical — drives a horizontal slide, with no custom wheel-event hijacking or gesture remapping required.

**\`invalidateOnRefresh\` keeps distances honest on resize**

Both the tween's \`x\` target and the trigger's \`end\` are functions (\`() => -getScrollDistance()\`, \`() => '+=' + getScrollDistance()\`) rather than fixed numbers, and \`invalidateOnRefresh: true\` tells ScrollTrigger to re-run those functions whenever it recalculates — so resizing the window (which changes \`track.scrollWidth\` and \`window.innerWidth\`) never leaves the pinned scroll distance out of sync with how far the track actually needs to travel.

**Dots and a fill bar both read off the same progress value**

The \`onUpdate\` callback receives the tween's own ScrollTrigger progress once per scroll frame and uses it for two things: setting the fill bar's width directly, and rounding \`progress * (slides.length - 1)\` to decide which chapter dot should be marked active. Both indicators are therefore always perfectly in sync with the actual horizontal position of the track — there's no separate, potentially-drifting tracking logic for the dots versus the bar.

**Dots are clickable, and compute their own jump target**

Each dot's click handler reads the tween's live \`scrollTrigger.start\`/\`end\` values (not hardcoded pixel offsets) to compute exactly which vertical scroll position corresponds to that chapter's slice of the pinned range, then animates \`window\` scroll to it with GSAP's \`scrollTo\` (bundled in GSAP core as of v3). Because the jump target is derived from the same live trigger the main tween uses, it stays correct even after a resize changes the total distance.

**Customizing it**

Add a sixth \`.hst-slide\` and the horizontal distance, progress bar, and dot count all adapt automatically — nothing is hardcoded to five chapters. Swap the CSS gradients for real photography using \`background-image\`, or combine with a [scroll company timeline](/ui-snippets/scroll-company-timeline/) for a vertical timeline that transitions into this horizontal chapter walk.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP, ScrollTrigger, and ScrollToPlugin', text: `Load all three from the CDN and call gsap.registerPlugin(ScrollTrigger, ScrollToPlugin).` },
      { title: 'Paste the HTML, CSS, and JS', text: `Chapters are laid out as a wide flex row inside the pinned section.` },
      { title: 'Scroll down normally', text: `The vertical scroll gesture drives a horizontal slide through the chapters.` },
      { title: 'Watch the bar and dots', text: `Both track exact horizontal progress, computed from the same tween.` },
      { title: 'Click a dot', text: `Jumps directly to that chapter's scroll position, computed live from the trigger.` },
      { title: 'Add more chapters', text: `Duplicate an .hst-slide article — distance and dot count adapt automatically.` },
    ] },
    features: [
      { title: 'Vertical-input, horizontal-output scroll', text: `No custom wheel handling — normal scroll drives the horizontal tween.` },
      { title: 'Resize-safe distance', text: `invalidateOnRefresh recomputes the scroll distance whenever the layout changes.` },
      { title: 'Single source of truth for progress', text: `Bar and dots both read the same onUpdate progress value.` },
      { title: 'Clickable chapter navigation', text: `Dots jump to the exact live-computed scroll position for that chapter.` },
      { title: 'Automatically scales to chapter count', text: `No hardcoded slide count anywhere in the distance or dot logic.` },
      { title: 'Smooth scrubbed motion', text: `scrub: 0.5 adds a slight easing lag instead of a rigid 1:1 scroll-lock.` },
      { title: 'Fully pinned, no layout shift', text: `The track pins in place; only its internal transform moves.` },
      { title: 'Zero external images', text: `Chapter backgrounds are CSS gradients, swappable for real photography.` },
    ],
    useCases: [
      { title: 'Product journey pages', text: 'Walk visitors from raw material to finished product as a left-to-right narrative, with ordinary vertical scrolling driving the sideways movement.' },
      { title: 'Process and pipeline explainers', text: 'Show a multi-stage workflow in sequence, with `invalidateOnRefresh` recomputing the scroll distance whenever the window is resized.' },
      { title: 'Portfolio project phases', text: 'Present a case study\'s phases as chapters, with a progress bar and clickable dots reading the same progress value.' },
      { title: 'Day-in-the-life features', text: 'Move through the hours of a day in an editorial piece, jumping to any chapter through dots that compute their scroll positions live.' },
      { title: 'Museum and exhibit microsites', text: 'Recreate a gallery-walk feel online, or give an onboarding tour a distinct visual identity with a pinned narrative track.' },
      { icon: 'CODE', title: 'Related: Scroll Map Journey Story', desc: 'See the [Scroll Map Journey Story](/ui-snippets/scroll-map-journey-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `How does normal vertical scrolling end up moving the content sideways?`, a: `The section is pinned in place with ScrollTrigger's pin: true, so as the visitor keeps scrolling vertically without the page actually moving, that pinned scroll distance is fed into a single gsap.to() tween's scrub option, which maps 0-100% scroll progress onto the track's horizontal x position. The visitor never needs to scroll sideways at all — their ordinary vertical scroll gesture is simply reinterpreted as the input for a horizontal animation.` },
      { q: `Why are the tween's x target and the ScrollTrigger's end both written as functions instead of fixed numbers?`, a: `Writing them as () => -getScrollDistance() and () => '+=' + getScrollDistance() means ScrollTrigger re-evaluates the actual pixel distance every time it recalculates, rather than baking in a number computed once at page load. Combined with invalidateOnRefresh: true, this keeps the horizontal travel distance and the pinned scroll length correctly matched even after a window resize changes how wide the track's slides collectively are.` },
      { q: `How do the progress bar and the chapter dots stay in sync with each other?`, a: `Both are updated from inside the exact same onUpdate callback on the exact same tween's ScrollTrigger, using the single progress value that callback receives each frame. The bar sets its width directly from that value, and the dots derive an active index by rounding progress times one less than the slide count — since there is only one source of truth for progress, the two indicators can never visually drift apart from each other.` },
      { q: `How does clicking a dot know where to scroll to?`, a: `Each dot's click handler reads the live start and end values off the tween's own scrollTrigger object at the moment of the click, computes that chapter's target progress as its index divided by one less than the total slide count, and interpolates between start and end to get an actual vertical scroll position — then animates window scroll to it with GSAP's built-in scrollTo utility. Because it reads the trigger's current values rather than a value cached at page load, the jump stays accurate even after a resize.` },
      { q: `How do I build this horizontal scroll track in React, Vue, or Angular?`, a: `Create the tween and its ScrollTrigger inside a mount effect after the track and slide elements have rendered, keeping the track's DOM ref (or a query selector scoped to the component) available to the getScrollDistance function. Store the returned tween so its .scrollTrigger.kill() can be called in the cleanup function, which also removes the pin and any generated spacer elements to avoid duplicate triggers on re-render.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the tween's x target and the ScrollTrigger's end are both written as functions combined with invalidateOnRefresh, and how that combination keeps the horizontal travel distance correct after a window resize instead of drifting out of sync. The same assistant is useful for extending the pattern — ask it to add per-chapter parallax layers that move at a different horizontal speed than the main track, support touch-swipe as an alternative to vertical scroll on mobile, or add keyboard arrow-key navigation between chapters using the same live scrollTrigger start/end values the dots already use. Treat the code as a working base for your own sideways scrollytelling section.`,
      prompt: `Build a "scroll horizontal story track" in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned full-viewport section containing a flex row of several full-viewport-width chapter slides (each with a chapter number, heading, and short paragraph, styled with a distinct background gradient per slide), preceded by an intro section and followed by an outro section.
- Animate the flex row's horizontal x transform from 0 to the negative of its total overflow width (its scrollWidth minus the viewport width) using a single GSAP tween whose target value and whose ScrollTrigger's end distance are both computed via functions (not fixed numbers), combined with invalidateOnRefresh set to true, so both values are correctly recalculated any time ScrollTrigger recalculates positions, such as after a window resize.
- Use scrub (a fractional value for a slight easing lag) on the tween's ScrollTrigger so that ordinary vertical scrolling — with no custom wheel event handling, and no remapping of the scroll gesture — drives the horizontal position in direct proportion to scroll progress, while the section itself stays pinned via pin: true for the full horizontal travel distance.
- Drive both a linear progress bar and a row of small chapter-indicator dots from the exact same onUpdate callback on the same tween's ScrollTrigger, so the two indicators can never fall out of sync with each other or with the actual horizontal position.
- Make each chapter dot clickable, computing its target vertical scroll position at click time from the tween's own live ScrollTrigger start and end values (not a value cached once at page load) and animating the window's scroll to that position with GSAP's scrollTo utility.
- Ensure the whole setup scales automatically to any number of chapter slides with no hardcoded slide count anywhere in the distance, progress-bar, or dot-generation logic.`,
    },
  },
};

export default scrollHorizontalStoryTrack;
