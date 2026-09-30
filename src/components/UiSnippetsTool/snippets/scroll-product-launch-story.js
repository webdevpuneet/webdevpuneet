const scrollProductLaunchStory = {
  id: 'scroll-product-launch-story',
  title: 'Scroll Product Launch Story',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="pls-intro"><span class="pls-eyebrow">Introducing</span><h1>Aperture Pro</h1><p>The camera that thinks in milliseconds. Scroll to see how.</p></section>
<section class="pls-pin" id="plsPin">
  <div class="pls-device" id="plsDevice">
    <div class="pls-body">
      <div class="pls-lens"><div class="pls-lens-ring"></div><div class="pls-lens-glass"></div></div>
      <div class="pls-flash"></div>
    </div>
  </div>
  <div class="pls-callout pls-callout-1" data-callout="0"><span class="pls-dot"></span><div><strong>18mm f/1.4 lens</strong><p>Hand-ground glass, coated in-house.</p></div></div>
  <div class="pls-callout pls-callout-2" data-callout="1"><span class="pls-dot"></span><div><strong>0.02s autofocus</strong><p>Locks focus before you finish pressing the shutter.</p></div></div>
  <div class="pls-callout pls-callout-3" data-callout="2"><span class="pls-dot"></span><div><strong>Titanium shell</strong><p>Half the weight of the previous generation.</p></div></div>
  <div class="pls-chapter-label" id="plsChapterLabel">01 — The Lens</div>
</section>
<section class="pls-specs">
  <h2>By the numbers</h2>
  <div class="pls-spec-grid">
    <div><strong>61MP</strong><span>full-frame sensor</span></div>
    <div><strong>15fps</strong><span>continuous shooting</span></div>
    <div><strong>8K</strong><span>video, uncropped</span></div>
    <div><strong>420g</strong><span>body only</span></div>
  </div>
</section>
<section class="pls-outro"><h2>Aperture Pro</h2><p>Pre-orders open Thursday. Shipping worldwide in October.</p><button class="pls-cta">Notify Me</button></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0c;color:#fff;min-height:100vh}
.pls-intro,.pls-outro{min-height:75vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px}
.pls-eyebrow{font-size:12px;font-weight:800;letter-spacing:.2em;text-transform:uppercase;color:#f59e0b}
.pls-intro h1{font-size:clamp(40px,9vw,88px);letter-spacing:-.03em}
.pls-intro p,.pls-outro p{color:#9ca3af;font-size:16px;max-width:420px}
.pls-outro h2{font-size:clamp(28px,5vw,44px);letter-spacing:-.02em}
.pls-cta{margin-top:8px;padding:14px 32px;border-radius:999px;border:none;background:#f59e0b;color:#1a1200;font-weight:800;font-size:15px;cursor:pointer;transition:transform .2s}
.pls-cta:hover{transform:scale(1.05)}
.pls-pin{position:relative;height:100vh;overflow:hidden;background:radial-gradient(60% 60% at 50% 45%,#1a1a1f,#0a0a0c)}
.pls-device{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0.7);width:220px;height:220px}
.pls-body{width:100%;height:100%;border-radius:28px;background:linear-gradient(155deg,#3a3a42,#111114);box-shadow:0 30px 60px rgba(0,0,0,.6);position:relative;display:flex;align-items:center;justify-content:center}
.pls-lens{width:120px;height:120px;border-radius:50%;background:#000;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 0 0 6px #4b4b55}
.pls-lens-ring{position:absolute;width:120px;height:120px;border-radius:50%;border:2px solid rgba(245,158,11,.4)}
.pls-lens-glass{width:70px;height:70px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#88a5c9,#0c1622 70%)}
.pls-flash{position:absolute;top:18px;right:22px;width:14px;height:14px;border-radius:4px;background:#f59e0b;box-shadow:0 0 10px rgba(245,158,11,.7)}
.pls-callout{position:absolute;display:flex;align-items:flex-start;gap:10px;max-width:220px;opacity:0;transform:translateY(10px);transition:opacity .4s,transform .4s}
.pls-callout.is-active{opacity:1;transform:translateY(0)}
.pls-callout .pls-dot{width:8px;height:8px;border-radius:50%;background:#f59e0b;margin-top:6px;flex-shrink:0;box-shadow:0 0 8px rgba(245,158,11,.8)}
.pls-callout strong{display:block;font-size:14px;margin-bottom:2px}
.pls-callout p{font-size:12px;color:#9ca3af;line-height:1.5}
.pls-callout-1{left:8%;top:30%}
.pls-callout-2{right:8%;top:22%;text-align:right;flex-direction:row-reverse}
.pls-callout-2 p{text-align:right}
.pls-callout-3{left:10%;bottom:20%}
.pls-chapter-label{position:absolute;left:50%;bottom:30px;transform:translateX(-50%);font-size:11px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#f59e0b}
.pls-specs{padding:14vh 24px;text-align:center}
.pls-specs h2{font-size:clamp(22px,4vw,32px);margin-bottom:36px;letter-spacing:-.01em}
.pls-spec-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:800px;margin:0 auto}
.pls-spec-grid strong{display:block;font-size:clamp(24px,4vw,34px);color:#f59e0b;letter-spacing:-.02em}
.pls-spec-grid span{font-size:12px;color:#9ca3af;text-transform:uppercase;letter-spacing:.06em}
@media (max-width:640px){.pls-spec-grid{grid-template-columns:repeat(2,1fr);gap:28px}.pls-callout{max-width:140px;font-size:11px}}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const device = document.getElementById('plsDevice');
const chapterLabel = document.getElementById('plsChapterLabel');
const callouts = gsap.utils.toArray('.pls-callout');
const chapters = ['01 — The Lens', '02 — The Focus', '03 — The Shell'];

// A single pinned "product reveal" chapter: the device itself scales and
// tilts continuously across the whole pinned distance (one long scrubbed
// tween), while three feature callouts fade in and out at their own
// non-overlapping slices of that same distance — cinematic product-launch
// pacing built from one timeline instead of three separate pins.
const master = gsap.timeline({
  scrollTrigger: {
    trigger: '#plsPin',
    start: 'top top',
    end: '+=3200',
    pin: true,
    scrub: 0.5,
  },
});

master
  .to(device, { scale: 1, rotateY: 0, duration: 3, ease: 'none' }, 0)
  .fromTo(device, { rotateY: -18 }, { rotateY: 0, duration: 1, ease: 'none' }, 0)
  .to(callouts[0], { opacity: 1, y: 0, duration: 0.6 }, 0.3)
  .to(callouts[0], { opacity: 0, y: -10, duration: 0.4 }, 1.4)
  .to(callouts[1], { opacity: 1, y: 0, duration: 0.6 }, 1.5)
  .to(callouts[1], { opacity: 0, y: -10, duration: 0.4 }, 2.5)
  .to(callouts[2], { opacity: 1, y: 0, duration: 0.6 }, 2.6)
  .to(callouts[2], { opacity: 0, y: -10, duration: 0.4 }, 3.6);

master.eventCallback('onUpdate', () => {
  const t = master.time();
  const idx = t < 1.5 ? 0 : t < 2.6 ? 1 : 2;
  const text = chapters[idx];
  if (chapterLabel.textContent !== text) chapterLabel.textContent = text;
});

// gsap.set with transformPerspective so the rotateY tilt during the intro
// reads as genuine 3D, not a flat horizontal squash.
gsap.set(device, { transformPerspective: 800, scale: 0.7 });`,

  seo: {
    title: 'Scroll Product Launch Story — Free GSAP ScrollTrigger Cinematic Reveal',
    description: `A pinned, cinematic product reveal where a device scales and tilts into view while feature callouts fade in and out at their own timeline slice, built with a single scrubbed GSAP timeline and ScrollTrigger.`,
    about: {
      title: 'Scroll Product Launch Story — A Cinematic Device Reveal Driven by One Timeline',
      description: `Product launch pages want a specific feeling: the device settles into frame, and features get introduced one at a time without ever losing the object at the center of attention. This snippet builds that entirely from one pinned, scrubbed GSAP timeline — no separate pins per feature, no manually staggered ScrollTriggers to keep in sync.

**One timeline, one pin, three synchronized callouts**

Rather than pinning three separate sections (one per feature, each needing its own enter/exit logic), a single \`gsap.timeline()\` is attached to one \`ScrollTrigger\` covering the entire \`3200px\` pinned distance. The device's settle-and-tilt animation, and all three callouts' fade-in/fade-out pairs, are all positioned on this one timeline using absolute time offsets (\`0\`, \`0.3\`, \`1.4\`, \`1.5\`...) — so their relative timing is fixed and readable in one place, instead of scattered across multiple trigger configs that would need separate distance math to line up.

**Callouts occupy non-overlapping timeline slices**

Each callout gets an in-tween and an out-tween scheduled back-to-back on the shared timeline (callout 1 fades in at \`0.3\`, out at \`1.4\`; callout 2 fades in at \`1.5\`, right after callout 1 finishes exiting). Because they're all on the same timeline rather than independently-triggered elements, there's no risk of two callouts appearing on screen simultaneously by accident — their timing is declared relative to each other, not computed from separate viewport-crossing calculations.

**A derived chapter label, not a fourth manually-timed tween**

Rather than adding a fourth set of tweens just to swap the "01 — The Lens" style label, an \`onUpdate\` callback reads the master timeline's own current \`.time()\` and buckets it into whichever chapter's range it falls in. The label is a pure function of the timeline's existing playhead position — one more derived output riding on the same scrubbed value everything else already uses.

**A real (if simple) 3D tilt, not a flat scale**

\`transformPerspective: 800\` is set once via \`gsap.set()\` before the timeline runs, which is what turns the \`rotateY\` tween on the device from a horizontally-squashed flat animation into something that reads as genuine 3D rotation settling toward the camera — a detail easy to miss since \`rotateY\` alone, without a perspective value on the element or its parent, looks visually wrong.

**Customizing it**

Swap the CSS-built camera body for a real product photo or a Three.js-rendered model (see [scroll GLB turntable](/ui-snippets/scroll-glb-duck-turntable-scrub/) for that variant), and reposition the three callouts to point at whatever features matter — their timeline slice offsets are independent of their screen position, so moving a callout's \`top\`/\`left\` in CSS never affects its timing. Follow with the [scroll stat reveal story](/ui-snippets/scroll-stat-reveal-story/) pattern for an even more dramatic specs section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add GSAP and ScrollTrigger', text: `Load both from the CDN and call gsap.registerPlugin(ScrollTrigger).` },
      { title: 'Paste the HTML, CSS, and JS', text: `The device starts small and untilted; callouts start hidden.` },
      { title: 'Scroll into the pinned section', text: `The device settles into frame while callouts fade in and out in sequence.` },
      { title: 'Watch the chapter label', text: `It updates automatically, derived from the shared timeline's own playhead time.` },
      { title: 'Scroll back up', text: `Every tween reverses cleanly since the whole sequence is one scrubbed timeline.` },
      { title: 'Swap the device and callouts', text: `Replace the CSS-built body with a real photo or 3D model and reposition callouts freely.` },
    ] },
    features: [
      { title: 'Single scrubbed master timeline', text: `Device animation and all callouts are positioned on one shared timeline.` },
      { title: 'Non-overlapping callout slices', text: `Feature callouts are scheduled back-to-back, guaranteeing no accidental overlap.` },
      { title: 'Derived chapter label', text: `The label text is computed from the timeline's own current time, not a separate tween.` },
      { title: 'Genuine 3D tilt', text: `transformPerspective makes the rotateY settle read as real depth, not a flat squash.` },
      { title: 'Fully reversible sequence', text: `Scrolling back up reverses the entire cinematic sequence in exact lockstep.` },
      { title: 'One pin, one distance to tune', text: `No per-feature ScrollTrigger distance math to keep synchronized.` },
      { title: 'Specs section follow-through', text: `A static grid punctuates the cinematic pin with hard numbers.` },
      { title: 'Zero external product photography', text: `The device is built entirely from CSS gradients and shapes.` },
    ],
    useCases: [
      { title: 'Product launch and pre-order landing pages', text: `Give a new device the cinematic reveal treatment before the pre-order CTA.` },
      { title: 'Hardware/gadget marketing sites', text: `Highlight physical features (lens, materials, weight) with paced callouts.` },
      { title: 'App or SaaS feature announcement pages', text: `Adapt the same callout-timeline pattern to UI screenshots instead of a device.` },
      { title: 'Crowdfunding campaign pages', text: `Build backer confidence with a polished, cinematic feature walkthrough.` },
      { title: 'Investor demo day microsites', text: `Show off a flagship product's key differentiators in a controlled sequence.` },
      { title: 'E-commerce flagship product pages', text: `Precede a standard product page with a short scroll-driven highlight reel.` },
      { icon: 'CODE', title: 'Related: Scroll Testimonial Sequence', desc: 'See the [Scroll Testimonial Sequence](/ui-snippets/scroll-testimonial-sequence/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why put the device animation and all three callouts on one timeline instead of separate ScrollTriggers?`, a: `Putting everything on one gsap.timeline() attached to a single ScrollTrigger means every tween's timing is expressed as a position on the same shared clock, using absolute time offsets like 0.3 or 1.5. That guarantees the callouts can never overlap by accident and makes the whole sequence's pacing readable in one place, rather than needing to hand-tune three separate pinned sections' start/end distances to line up with each other.` },
      { q: `How does the chapter label know which text to show without its own tween?`, a: `An onUpdate callback on the master timeline reads master.time() — the timeline's own current playhead position in seconds — and buckets that value into whichever chapter's time range it falls within, then writes the matching label text. Because it derives its value from the same timeline everything else already runs on, there's no separate tween or trigger needed just to keep a text label in sync.` },
      { q: `Why does the device need transformPerspective set explicitly?`, a: `CSS 3D transforms like rotateY only look three-dimensional when the element (or an ancestor) has a perspective value applied — without one, a Y-axis rotation just visually squashes the element's width flat, with no sense of depth. Setting transformPerspective: 800 via gsap.set() before the timeline runs gives the browser the depth context it needs to render the rotateY tween as a real tilt settling toward the viewer.` },
      { q: `How do I reposition a callout without breaking its timing?`, a: `Callout position on screen (top, left, right, bottom in the CSS) and callout timing (its offset on the master timeline in the JS) are completely independent of each other. Moving a .pls-callout element's CSS position to point at a different part of the device has zero effect on when it fades in or out — that's controlled purely by its scheduled position on the shared timeline.` },
      { q: `How do I build this scroll product launch story in React, Vue, or Angular?`, a: `Create the master timeline and its ScrollTrigger inside a mount effect after the device and callout elements have rendered, storing the timeline instance in a ref so both the onUpdate callback and the cleanup function can access it. Call timeline.scrollTrigger.kill() (which also removes the timeline's pin) in the cleanup function to avoid duplicate triggers across re-renders.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why scheduling the device animation and all three feature callouts on one shared GSAP timeline, using absolute time offsets, makes their relative pacing easier to reason about than giving each element its own independent ScrollTrigger, and how the chapter label derives its text purely from the timeline's own current time rather than needing a fourth tween. The same assistant can help extend the sequence — ask it to add a fourth callout with a matching non-overlapping timeline slice, replace the CSS-built device with a real product photo using clip-path reveals, or add a subtle particle/glow burst timed to the exact moment the device finishes settling into frame. Treat the code as a working starting point for your own cinematic product reveal.`,
      prompt: `Build a "scroll product launch story" cinematic reveal in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin, loaded from a CDN with no bundler.

Requirements:
- A pinned full-viewport section containing one central "device" element built from CSS shapes and gradients (representing a physical product), three absolutely-positioned feature callout elements scattered around it (each starting hidden, with a small label and description), and a chapter/section label element, preceded by an intro hero section with a product name and tagline and followed by a static specs grid section and a final call-to-action section.
- Create a single GSAP timeline attached to one ScrollTrigger on the pinned section, using pin: true and a scrub value, covering one large total scroll distance for the entire pinned sequence.
- On that single timeline, using absolute time-offset position parameters (not relative "+=" chaining), animate the device element scaling up and rotating from an initial tilted, smaller state to its full settled state across the timeline's early portion, and schedule each of the three callouts to fade and slide in, hold, then fade and slide back out, in three back-to-back, strictly non-overlapping time slices later on the same timeline.
- Set an explicit CSS 3D perspective value on the device element (via a transform-perspective style) before the timeline runs, so that the rotation animation reads as genuine 3D depth rather than a flat horizontal squash.
- Add an onUpdate callback on the master timeline that reads the timeline's own current playhead time and derives which chapter/callout is currently "active" purely from that time value, updating a text label accordingly — do not create any additional timeline or tween just to drive this label.
- Ensure the entire pinned sequence — device settling, all three callouts, and the chapter label — reverses correctly and smoothly when the visitor scrolls back up, purely as a consequence of the single scrubbed timeline, with no separate reverse-direction logic written by hand.`,
    },
  },
};

export default scrollProductLaunchStory;
