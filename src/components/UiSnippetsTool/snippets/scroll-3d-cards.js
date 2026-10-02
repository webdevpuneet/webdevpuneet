const scroll3dCards = {
  id: 'scroll-3d-cards',
  title: 'Scroll 3D Cards',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="td-intro"><h1>Scroll ↓</h1><p>Cards flip up from a tilt as they enter.</p></section>
<section class="td-list" id="tdList">
  <article class="td-card"><span class="td-i">✦</span><h3>Atlas</h3><p>Map your entire data graph in one view.</p></article>
  <article class="td-card"><span class="td-i">◈</span><h3>Cadence</h3><p>Automations that run on your schedule.</p></article>
  <article class="td-card"><span class="td-i">❖</span><h3>Lumen</h3><p>Insights surfaced before you ask.</p></article>
  <article class="td-card"><span class="td-i">⬡</span><h3>Drift</h3><p>Realtime collaboration, zero setup.</p></article>
  <article class="td-card"><span class="td-i">✺</span><h3>Ember</h3><p>Alerts that actually matter.</p></article>
</section>
<section class="td-outro"><p>Each settled flat as it reached center.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b14;color:#fff}
.td-intro,.td-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.td-intro h1{font-size:clamp(34px,7vw,68px);letter-spacing:-.02em}
.td-intro p,.td-outro p{color:#9aa0b8;font-size:16px}
/* Perspective on the list gives the cards real depth. */
.td-list{max-width:560px;margin:0 auto;padding:14vh 24px;display:flex;flex-direction:column;gap:26px;perspective:1100px}
.td-card{transform-style:preserve-3d;will-change:transform,opacity;padding:30px 28px;border-radius:22px;background:linear-gradient(155deg,#1a2138,#11131f);border:1px solid #262d44;box-shadow:0 30px 60px rgba(0,0,0,.4)}
.td-i{font-size:26px;color:#8c9bff}
.td-card h3{font-size:26px;letter-spacing:-.01em;margin:10px 0 8px}
.td-card p{color:#aab0c6;font-size:15px;line-height:1.55}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Each card starts tilted back and rises flat as it scrolls toward center.
gsap.utils.toArray('.td-card').forEach(function (card) {
  gsap.fromTo(card,
    { rotateX: -55, y: 80, opacity: 0, transformOrigin: '50% 100%' },
    {
      rotateX: 0, y: 0, opacity: 1, ease: 'power2.out',
      scrollTrigger: {
        trigger: card,
        start: 'top 88%',
        end: 'top 45%',
        scrub: true
      }
    }
  );
});`,

  seo: {
    title: 'Scroll 3D Cards — Free GSAP ScrollTrigger 3D Flip-Up Cards',
    description: `Cards that flip up from a back-tilt as they scroll toward center, using CSS perspective and a scrubbed GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll 3D Cards — Cards That Flip Up Into Place on Scroll',
      description: `Scroll 3D cards is the entrance where each card lies tilted back in 3D space and rotates upright as it scrolls toward the center of the screen, like pages standing up — a depth-rich alternative to a flat fade-in. This snippet builds it with GSAP and ScrollTrigger (from a CDN) and CSS 3D, with each card animated by its own scrubbed trigger.

**Perspective creates the depth**

The list container sets \`perspective: 1100px\`, which is what turns the cards' \`rotateX\` into genuine 3D foreshortening rather than a flat vertical squash. Each card also gets \`transform-style: preserve-3d\`. Without the perspective on the parent, a rotateX would just look like the card getting shorter; with it, the top edge appears to lean away and swing toward you as it rights itself.

**Per-card scrubbed tween**

Every card gets its own \`gsap.fromTo\` tied to a ScrollTrigger on that card. It animates from \`rotateX: -55\`, pushed down (\`y: 80\`) and transparent, to flat, in place, and opaque — with the trigger running from \`start: 'top 88%'\` to \`end: 'top 45%'\` and \`scrub: true\`. So each card rotates upright precisely as it travels from the lower part of the viewport up toward center, and tilts back if you scroll up. Giving each card its own trigger is what lets them animate independently as they enter, rather than all at once.

**transform-origin sells the hinge**

The rotation uses \`transformOrigin: '50% 100%'\`, so the card pivots around its bottom edge — it stands up from its base like a hinged panel, which is far more convincing than rotating around the center. This single property is the difference between "flipping up" and "spinning in place".

**Scrub ties motion to position, not time**

Because the trigger is scrubbed, the card's angle is a direct function of how far it has scrolled into the viewport, so it's fully reversible and never plays out of step with the scroll. Slow scrolling reveals the cards slowly; fast scrolling snaps them upright — the motion always matches the user's pace.

**GPU-composited**

Only \`transform\` (rotateX, y) and \`opacity\` animate, so the browser composites the cards without layout work, and \`will-change\` and the box shadow give them a floating, physical quality as they swing up. The effect stays smooth even with many cards because each trigger only animates while its card is in the active range.

**Customizing it**

Change the starting tilt, the rise distance, the trigger range for an earlier or later flip, or the easing; rotate on \`rotateY\` for a door-like swing instead. Pair it with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/), or [3d card tilt](/ui-snippets/3d-card-tilt/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A list of cards renders between spacers.` },
      { title: 'Scroll down', text: `Each card flips up from a back-tilt.` },
      { title: 'Scroll back up', text: `Cards tilt back — motion is scrubbed.` },
      { title: 'Change the tilt', text: `Adjust the starting rotateX value.` },
      { title: 'Change the hinge', text: `Edit transformOrigin for a different pivot.` },
    ] },
    features: [
      { title: 'Real 3D depth', text: `Parent perspective foreshortens the tilt.` },
      { title: 'Per-card triggers', text: `Each card animates as it enters.` },
      { title: 'Hinge pivot', text: `transform-origin stands cards from the base.` },
      { title: 'Scrubbed angle', text: `Rotation tracks scroll position.` },
      { title: 'Reversible', text: `Cards tilt back on scroll-up.` },
      { title: 'GPU transforms', text: `rotateX and opacity, no reflow.` },
      { title: 'Floating shadow', text: `Depth shadow as cards swing up.` },
      { title: 'Pace-matched', text: `Speed follows how fast you scroll.` },
    ],
    useCases: [
      { title: 'Feature list entrances', text: 'Stand cards up from a back tilt as they near the centre of the screen, as a 3D take on a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).' },
      { title: 'Pricing tier reveals', text: 'Flip in [pricing card](/ui-snippets/pricing-card/) tiers one after another, using `transform-origin` at the base so each card hinges like a page.' },
      { title: 'Portfolio capability cards', text: 'Stand up [feature cards](/ui-snippets/feature-cards/) with parent perspective foreshortening the tilt, giving real depth rather than a flat fade.' },
      { title: 'Hover pairing', text: 'Combine the entrance with a [3D card tilt](/ui-snippets/3d-card-tilt/) hover so cards stand up on scroll and respond to the pointer afterwards.' },
      { title: 'Stack and testimonial follow-ups', text: 'Lead into a [scroll sticky stack](/ui-snippets/scroll-sticky-stack/), or reveal a column of [testimonial cards](/ui-snippets/testimonial-card/) with a scrubbed angle.' },
      { icon: 'CODE', title: 'Related: Scroll Accordion', desc: 'See the [Scroll Accordion](/ui-snippets/scroll-accordion/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What makes the cards look genuinely 3D?', a: `The list container sets perspective: 1100px, which turns each card's rotateX into real foreshortening — the top edge leans away and swings toward you — instead of a flat vertical squash. Each card also uses transform-style: preserve-3d. Without perspective on the parent, a rotateX would just look like the card getting shorter.` },
      { q: 'Why does each card have its own ScrollTrigger?', a: `A per-card fromTo tied to a trigger on that card lets every card animate independently as it enters the viewport, from start: top 88% to end: top 45%. They flip up one after another as they reach center, rather than all firing together, which is what gives the list its rolling, staggered entrance.` },
      { q: 'How does the card pivot from its bottom edge?', a: `The tween sets transformOrigin: 50% 100%, so the rotateX pivots around the card's base. The card stands up from the bottom like a hinged panel, which is far more convincing than rotating around the center. That single origin property is the difference between flipping up and spinning in place.` },
      { q: 'Why use scrub for this entrance?', a: `With scrub: true the card's angle is a direct function of how far it has scrolled into view, so it is fully reversible and never out of step with the scroll. Slow scrolling reveals the cards slowly and fast scrolling snaps them upright — the motion always matches the user's pace rather than playing on a fixed timeline.` },
      { q: 'How do I use this scroll 3D cards in React, Vue, or Angular?', a: `Render the cards, then in a mount effect register ScrollTrigger and loop the card refs to create each scrubbed fromTo (use gsap.context or a scoped selector). Return a cleanup that reverts the context so triggers are removed on unmount. Keep perspective on the list container in CSS; the markup and styles port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the 3D math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain precisely why the parent needs perspective while each card needs transform-style preserve-3d, and why transformOrigin is set to 50% 100% rather than the default center. The same assistant is useful for optimizing it — ask whether creating one ScrollTrigger per card scales cleanly to a list of fifty items, or whether batching them with ScrollTrigger.batch would reduce overhead while keeping the same per-card entrance feel. It is just as useful for extending the effect — ask it to swap rotateX for rotateY so cards swing open like doors, stagger the y offset so cards also drift in from alternating sides, or combine the flip-up entrance with a hover-tilt effect for after the card has settled. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll 3D cards" entrance in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step) plus CSS 3D transforms.

Requirements:
- A vertical list of card elements inside a container that sets CSS perspective (for example 1100px) so child rotations produce real foreshortening, with each card given transform-style: preserve-3d.
- For every card, register its own independent gsap.fromTo animation tied to a ScrollTrigger scoped to that specific card element (not one shared trigger for the whole list), so each card animates on its own schedule as it individually enters the viewport.
- Each card's animation must start tilted back (a negative rotateX around 55 degrees), offset downward, and fully transparent, and animate to rotateX 0, no offset, and fully opaque, using only transform and opacity properties (no properties that trigger layout, like top/margin/height).
- Set each card's transformOrigin to the bottom center (50% 100%) so the rotation pivots like a hinged panel standing up from its base, not spinning around its own center.
- Configure each card's ScrollTrigger with scrub enabled (not a one-shot autoplay animation) and a start/end range tied to the card's own position, so the tilt angle is a continuous function of how far the card has scrolled into view and reverses cleanly when the user scrolls back up.
- Do not animate any card via a shared global timeline keyed to overall page scroll — each card's entrance must be driven by its own trigger so cards animate independently as they individually cross into the visible viewport range.`,
    },
  },
};

export default scroll3dCards;
