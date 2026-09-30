const scroll3dFlipReveal = {
  id: 'scroll-3d-flip-reveal',
  title: 'Scroll 3D Flip Reveal',
  lastmod: '2026-08-23',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="fr-intro"><h1>Scroll ↓</h1><p>Cards start face-down and flip 180° to reveal their front face as they cross the viewport center.</p></section>
<section class="fr-list" id="frList">
  <div class="fr-card">
    <div class="fr-inner">
      <div class="fr-face fr-back"><span class="fr-mark">?</span></div>
      <div class="fr-face fr-front"><span class="fr-i">✦</span><h3>Atlas</h3><p>Map your entire data graph in one connected view.</p></div>
    </div>
  </div>
  <div class="fr-card">
    <div class="fr-inner">
      <div class="fr-face fr-back"><span class="fr-mark">?</span></div>
      <div class="fr-face fr-front"><span class="fr-i">◈</span><h3>Cadence</h3><p>Automations that run precisely on your schedule.</p></div>
    </div>
  </div>
  <div class="fr-card">
    <div class="fr-inner">
      <div class="fr-face fr-back"><span class="fr-mark">?</span></div>
      <div class="fr-face fr-front"><span class="fr-i">❖</span><h3>Lumen</h3><p>Insights surfaced before you even think to ask.</p></div>
    </div>
  </div>
  <div class="fr-card">
    <div class="fr-inner">
      <div class="fr-face fr-back"><span class="fr-mark">?</span></div>
      <div class="fr-face fr-front"><span class="fr-i">⬡</span><h3>Drift</h3><p>Realtime collaboration with zero setup required.</p></div>
    </div>
  </div>
</section>
<section class="fr-outro"><p>Scroll back up — each card flips face-down again, exactly in reverse.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b14;color:#fff}
.fr-intro,.fr-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.fr-intro h1{font-size:clamp(34px,7vw,64px);letter-spacing:-.02em}
.fr-intro p,.fr-outro p{color:#9aa0b8;font-size:16px;max-width:480px}
.fr-list{max-width:560px;margin:0 auto;padding:16vh 24px;display:flex;flex-direction:column;gap:80px;perspective:1400px}
.fr-card{height:220px}
.fr-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;will-change:transform}
.fr-face{position:absolute;inset:0;border-radius:22px;padding:30px 28px;backface-visibility:hidden;-webkit-backface-visibility:hidden;display:flex;flex-direction:column;justify-content:center}
.fr-back{background:linear-gradient(155deg,#1c2340,#12141f);border:1px solid #2a3350;align-items:center;transform:rotateY(180deg)}
.fr-mark{font-size:44px;font-weight:800;color:#3a4270}
.fr-front{background:linear-gradient(155deg,#191f36,#11131f);border:1px solid #262d44;box-shadow:0 30px 60px rgba(0,0,0,.4)}
.fr-i{font-size:26px;color:#8c9bff}
.fr-front h3{font-size:24px;letter-spacing:-.01em;margin:10px 0 8px}
.fr-front p{color:#aab0c6;font-size:14.5px;line-height:1.55}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Each card starts flipped face-down (rotateY 180) and rotates to 0 as it
// crosses the vertical center of the viewport. scrub ties the rotation
// value directly to scroll position, so it tracks precisely both ways —
// distinct from a fixed-duration flip that merely starts on scroll.
gsap.utils.toArray('.fr-inner').forEach(function (inner) {
  gsap.fromTo(inner,
    { rotateY: 180 },
    {
      rotateY: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: inner,
        start: 'top 85%',
        end: 'top 35%',
        scrub: 0.3
      }
    }
  );
});`,

  seo: {
    title: 'Scroll 3D Flip Reveal — Free Scrubbed Two-Sided Card Flip Effect',
    description: `Cards flipped face-down above the viewport rotate 180° to reveal their front face as they scroll through the viewport center, with rotation scrubbed exactly to scroll position via GSAP.`,
    about: {
      title: 'Scroll 3D Flip Reveal — A Genuine Two-Sided Flip Driven by Scroll',
      description: `This is a real card flip, not a tilt-and-settle entrance: each card has two distinct faces — a blank "face-down" back and a content-bearing front — joined with \`backface-visibility: hidden\`, and the card literally rotates 180° on its Y axis as it scrolls through the viewport's vertical center. The rotation amount is scrubbed directly to scroll position with GSAP and ScrollTrigger, so scrolling partway through a card's trigger range shows the flip partway through, and scrolling back reverses it exactly.

**Two real faces, not one that fades**

\`.fr-back\` and \`.fr-front\` are both absolutely positioned inside \`.fr-inner\`, each with \`backface-visibility: hidden\`, and the back face is pre-rotated \`rotateY(180deg)\` in its resting CSS so that when \`.fr-inner\` itself is at \`rotateY(180deg)\`, the back face is the one actually facing the viewer — a genuine two-sided object, the same technique used for flip cards that reveal an answer or a stat. This is different from cards that simply tilt from an angle and settle flat while showing the same single face throughout.

**scrub, not toggleActions**

Unlike an entrance animation that plays once when triggered, this ScrollTrigger uses \`scrub: 0.3\`, binding \`rotateY\` directly to the scroll position between \`start: 'top 85%'\` and \`end: 'top 35%'\` for each card. Scroll a quarter of the way through that range and the card is rotated to roughly 135°; scroll through fully and it lands at 0°, flat and readable. This is a precise, continuously reversible function of scroll position — verifiable by scrubbing slowly and watching the rotation angle track exactly.

**Independent per-card triggers**

Each \`.fr-inner\` gets its own \`ScrollTrigger\` scoped to its own \`trigger: inner\`, so cards flip independently as they individually cross the center of the viewport rather than all flipping together on one shared trigger — appropriate for a vertical list where cards enter one at a time.

**How this differs from a tilt-up entrance**

A related effect, [scroll 3D cards](/ui-snippets/scroll-3d-cards/), tilts a single face from \`rotateX: -55\` up to flat — one face, one axis, an entrance motion. This snippet instead rotates a genuinely two-sided object 180° on the Y axis, hiding one face and revealing a completely different one — the reveal *is* the mechanic, not a byproduct of the tilt settling.

**Customizing it**

Put a teaser question on the back face and an answer on the front for a quiz format, flip on the X axis instead of Y for a vertical flip, or stagger the \`start\`/\`end\` range per card for a slower or faster flip feel. Pair it with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) or [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) for other scroll-driven reveals.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, four face-down cards, and an outro render.` },
      { title: 'Scroll toward a card', text: `It rotates from face-down to face-up as it nears center.` },
      { title: 'Scrub slowly', text: `The rotation angle tracks scroll position precisely, mid-flip included.` },
      { title: 'Scroll back up', text: `Each card rotates back to face-down in exact reverse.` },
      { title: 'Edit the faces', text: `Change .fr-back and .fr-front content for your own reveal.` },
    ] },
    features: [
      { title: 'Genuine two-sided flip', text: `Real back and front faces, not one face that fades.` },
      { title: 'Scroll-scrubbed rotation', text: `rotateY is a direct function of scroll position.` },
      { title: 'Precisely reversible', text: `Scrolling back retraces the exact rotation curve.` },
      { title: 'backface-visibility technique', text: `Hides whichever face is turned away from the viewer.` },
      { title: 'Independent per-card triggers', text: `Each card flips on its own scroll range.` },
      { title: '3D perspective container', text: `A perspective wrapper gives the rotation real depth.` },
      { title: 'GPU-composited transform', text: `Only rotateY animates, no layout-triggering properties.` },
      { title: 'Configurable trigger range', text: `start/end control how much scroll the flip spans.` },
    ],
    useCases: [
      { title: 'Feature reveals', text: `Hide a feature name, reveal its description on flip.` },
      { title: 'Quiz or trivia pages', text: `Question on the back, answer on the front.` },
      { title: 'Team pages', text: `Flip from a silhouette to a bio on scroll.` },
      { title: 'Product comparisons', text: `Reveal specs as each card flips into view.` },
      { title: 'Portfolios', text: `Pair with [scroll 3D cards](/ui-snippets/scroll-3d-cards/) for contrast.` },
      { title: 'Onboarding steps', text: `Flip open each step as the user scrolls to it.` },
      { icon: 'CODE', title: 'Related: Scroll Accordion', desc: 'See the [Scroll Accordion](/ui-snippets/scroll-accordion/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from scroll-3d-cards?', a: `Scroll 3D Cards tilts a single face from rotateX: -55 up to flat as an entrance motion — one face is visible throughout, and the effect is the settle, not a reveal. This snippet rotates a genuinely two-sided object 180° on the Y axis using backface-visibility: hidden on two separate faces, so a different face is actually shown before and after — the flip itself is the mechanic, and it uses the Y axis rather than X.` },
      { q: 'Is the rotation really tied to scroll position, or does it just play on trigger?', a: `It's genuinely tied to scroll position. The ScrollTrigger uses scrub: 0.3 rather than toggleActions, which binds rotateY directly to how far the card's trigger range has been scrolled through. Scrolling a quarter of the way through a card's start-to-end range rotates it about a quarter of the way through its 180° arc — verifiable by scrubbing slowly and watching the angle track scroll position rather than jumping to a finished state.` },
      { q: 'How does backface-visibility make the flip look correct?', a: `Both .fr-back and .fr-front have backface-visibility: hidden, and .fr-back is pre-rotated 180° in its own resting CSS. When the shared .fr-inner wrapper rotates to 180°, the back face's own 180° rotation cancels out and it faces the viewer, while the front face (at its natural 0° rotation) is now turned away and hidden. At .fr-inner's 0° rotation, the reverse is true — the front shows and the back is hidden.` },
      { q: 'Does scrolling back up reverse the flip exactly?', a: `Yes. Because rotateY is scrubbed directly from the ScrollTrigger's progress rather than played once as a timed animation, scrolling back up moves the trigger's progress back toward 0 and the rotation follows it precisely in reverse, at any point in the range — there's no separate "reverse" animation to define.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Render each card's two faces with refs, then in a mount effect register ScrollTrigger and create the scrubbed fromTo tween for each card scoped with gsap.context to a container ref, looping over the card refs the way toArray does in the vanilla version. Return a cleanup that reverts the context so the ScrollTrigger instances are removed on unmount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how backface-visibility: hidden combined with the back face's own pre-applied 180° rotation makes a single rotateY animation on the shared wrapper reveal one face and hide the other, rather than showing both stacked on top of each other. It's also worth asking why scrub: 0.3 rather than a played-once tween is what makes the rotation angle a genuine, continuously reversible function of scroll position — useful context before extending the effect. Good follow-ups: ask it to make the flip axis configurable (X for a vertical flip vs Y for horizontal), or to add a subtle box-shadow that intensifies as each card approaches 90° rotation (its most "edge-on" moment) for extra depth.`,
      prompt: `Build a "scroll 3D flip reveal" effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A vertical list of card elements, each containing a 3D flip structure: an outer card with CSS perspective on its container, an inner wrapper with transform-style: preserve-3d, and two absolutely-positioned face elements inside that wrapper (a "back" face and a "front" face), each with backface-visibility: hidden.
- The back face's own CSS should include a fixed rotateY(180deg) so that when the inner wrapper is rotated to rotateY(180deg), the back face is the one actually shown to the viewer (its own rotation cancels the wrapper's), while the front face is turned away and hidden. At the wrapper's natural rotateY(0deg), the front face should show and the back face should be hidden.
- Each card's back face should show a simple placeholder (e.g. a question mark or blank pattern) and the front face should show real content (an icon, heading, and description) — a genuine reveal from one face to a completely different one, not a single face that merely fades or tilts.
- Animate each card's inner wrapper from rotateY: 180 to rotateY: 0 using a GSAP fromTo tween with a linear ease, attached to its own ScrollTrigger scoped to that specific card (not one shared trigger for all cards) with scrub enabled (a numeric scrub value like 0.3, not scrub: true) so the rotation angle is a continuous, direct function of scroll position through a start/end range roughly spanning when the card enters the lower half of the viewport to when it reaches the upper-middle.
- Confirm the effect is genuinely scroll-position-driven, not a fixed-duration animation merely triggered by scroll: scrubbing slowly up and down should show the rotation angle tracking scroll position precisely and reversibly at any point in the range, including partial rotations mid-flip.`,
    },
  },
};

export default scroll3dFlipReveal;
