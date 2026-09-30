const scrollSkewVelocity = {
  id: 'scroll-skew-velocity',
  title: 'Scroll Skew Velocity',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sk-intro"><h1>Scroll fast ↓</h1><p>The cards skew with your scroll velocity.</p></section>
<section class="sk-list" id="skList">
  <article class="sk-card skew"><span>01</span><h3>Momentum</h3></article>
  <article class="sk-card skew"><span>02</span><h3>Velocity</h3></article>
  <article class="sk-card skew"><span>03</span><h3>Inertia</h3></article>
  <article class="sk-card skew"><span>04</span><h3>Friction</h3></article>
  <article class="sk-card skew"><span>05</span><h3>Drift</h3></article>
  <article class="sk-card skew"><span>06</span><h3>Glide</h3></article>
</section>
<section class="sk-outro"><p>Skew eases back to zero when you stop.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b12;color:#fff}
.sk-intro,.sk-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.sk-intro h1{font-size:clamp(34px,7vw,68px);letter-spacing:-.02em}
.sk-intro p,.sk-outro p{color:#9aa0b8;font-size:16px}
.sk-list{max-width:560px;margin:0 auto;padding:10vh 24px;display:flex;flex-direction:column;gap:22px}
.sk-card{display:flex;align-items:center;gap:20px;padding:30px 28px;border-radius:20px;background:linear-gradient(120deg,#171c2e,#10131d);border:1px solid #252c40;transform-origin:center;will-change:transform}
.sk-card span{font-size:14px;font-weight:800;letter-spacing:.15em;color:#7c8cff}
.sk-card h3{font-size:clamp(24px,5vw,40px);letter-spacing:-.01em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var skews = gsap.utils.toArray('.skew');
// Quick-setters avoid creating a tween per frame — cheap, smooth updates.
var setters = skews.map(function (el) { return gsap.quickTo(el, 'skewY', { duration: 0.5, ease: 'power3' }); });
var clamp = gsap.utils.clamp(-14, 14);

ScrollTrigger.create({
  onUpdate: function (self) {
    // getVelocity is px/sec; scale it down to a gentle skew, clamped.
    var skew = clamp(self.getVelocity() / -260);
    setters.forEach(function (set) { set(skew); });
  }
});`,

  seo: {
    title: 'Scroll Skew Velocity — Free GSAP ScrollTrigger Skew Effect',
    description: `List cards that skew with scroll velocity and ease back to zero when you stop, using GSAP getVelocity and quickTo. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Skew Velocity — Cards That Lean Into Your Scroll Speed',
      description: `Velocity skew is the tactile effect where list items shear slightly in the direction you're scrolling and snap upright when you stop — the "the page has momentum" feel from award-winning sites. This snippet builds it with GSAP and ScrollTrigger (from a CDN), reading raw scroll velocity and mapping it to a live skew.

**Reading scroll velocity**

A global \`ScrollTrigger\` with an \`onUpdate\` callback runs on every scroll frame and calls \`self.getVelocity()\`, which returns the current scroll speed in pixels per second — positive scrolling down, negative scrolling up. That number is the engine of the effect: fast scrolling yields a big value, easing off yields a small one, and stopping yields zero. No manual delta tracking or timing is needed; ScrollTrigger measures it.

**Mapping velocity to skew**

The raw velocity is divided down (\`/ -260\`) to a sensible degree range and passed through \`gsap.utils.clamp(-14, 14)\` so even a violent flick can't shear the cards past a tasteful maximum. The negative divisor flips the sign so the cards lean the way that reads as "trailing" the scroll. This clamp-and-scale step is what keeps the effect feeling like physics rather than a glitch.

**quickTo for cheap per-frame updates**

Instead of creating a new tween every frame (expensive and janky), each card gets a \`gsap.quickTo(el, 'skewY', ...)\` setter — a reusable function that smoothly interpolates that one property toward whatever value you pass. On each scroll update the code calls every setter with the current skew, and GSAP eases the actual \`skewY\` toward it with a short \`power3\` duration. That built-in easing is what makes the skew ramp up and settle smoothly, and crucially returns the cards to 0 when velocity drops, with no separate "reset" logic.

**Why this is the right pattern**

Skewing on scroll naively (writing transform directly from velocity) looks twitchy because raw velocity is noisy. Routing it through quickTo's interpolation low-passes the motion, and the clamp bounds it — together they turn a jittery signal into a fluid lean. ScrollTrigger's \`getVelocity\` removes the need to compute speed by hand across frames.

**Composited and contained**

Only \`transform\` (skewY) animates, so the browser composites the cards on the GPU with no reflow, and \`will-change: transform\` promotes them. The effect scales to many items because every card shares the same single velocity read per frame.

**Customizing it**

Change the divisor for more or less shear, the clamp for a tighter or looser limit, the quickTo duration for snappier or floatier recovery, or skew on \`skewX\` for a horizontal feel. Pair it with a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/), a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/), or an [animated list](/ui-snippets/animated-list/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A list of cards renders between spacers.` },
      { title: 'Scroll quickly', text: `The cards skew in the scroll direction.` },
      { title: 'Stop scrolling', text: `The skew eases back to zero.` },
      { title: 'Tune the shear', text: `Change the velocity divisor and clamp.` },
      { title: 'Tune the recovery', text: `Adjust the quickTo duration.` },
    ] },
    features: [
      { title: 'Velocity read', text: `ScrollTrigger getVelocity per frame.` },
      { title: 'Clamped skew', text: `Hard limit keeps shear tasteful.` },
      { title: 'quickTo setters', text: `Reusable, no tween-per-frame cost.` },
      { title: 'Smooth easing', text: `power3 ramps and settles the skew.` },
      { title: 'Auto reset', text: `Returns to 0 when velocity drops.` },
      { title: 'Direction-aware', text: `Leans the way it scrolls.` },
      { title: 'GPU transform', text: `skewY composites, no reflow.` },
      { title: 'Scales to many', text: `One velocity read drives all cards.` },
    ],
    useCases: [
      { title: 'Feature lists', text: `Add momentum to an [animated list](/ui-snippets/animated-list/).` },
      { title: 'Marquees', text: `Pair with a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/).` },
      { title: 'Galleries', text: `Lean a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) on scroll.` },
      { title: 'Portfolios', text: `Energize a [portfolio filter grid](/ui-snippets/portfolio-filter-grid/).` },
      { title: 'Editorial', text: `Give body sections a kinetic feel.` },
      { title: 'Landing', text: `Energize a [feature cards](/ui-snippets/feature-cards/) section.` },
      { icon: 'CODE', title: 'Related: Scrollama Scrollytelling', desc: 'See the [Scrollama Scrollytelling](/ui-snippets/scrollama-story-steps/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the scroll speed measured?', a: `A global ScrollTrigger's onUpdate runs each scroll frame and calls self.getVelocity(), which returns the scroll speed in pixels per second — positive down, negative up. Fast scrolling gives a large value, easing off gives a small one, and stopping gives zero, so ScrollTrigger supplies the velocity without manual delta or timing code.` },
      { q: 'How is a noisy velocity turned into a smooth skew?', a: `The raw velocity is divided down and clamped to a max of about 14 degrees, then passed to per-card gsap.quickTo setters. quickTo interpolates the skewY toward the new value with a short power3 ease, which low-passes the noisy signal into a fluid lean and naturally returns the cards to zero when velocity drops — no separate reset logic.` },
      { q: 'Why use quickTo instead of setting transform directly?', a: `Writing the transform straight from velocity looks twitchy because the signal is jittery, and creating a fresh tween every frame is expensive. quickTo builds one reusable setter per property that smoothly eases toward whatever value you pass, giving cheap per-frame updates and built-in easing in one — the recommended GSAP pattern for continuous scroll-driven values.` },
      { q: 'Is the effect performant with many cards?', a: `Yes. Only skewY, a transform, animates, so the browser composites the cards on the GPU with no reflow, and will-change promotes them. There is a single getVelocity read per frame shared by all cards, so adding more items costs only the quickTo setter calls, which are lightweight.` },
      { q: 'How do I use this scroll skew velocity in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger, build quickTo setters for the card refs, and create one ScrollTrigger whose onUpdate clamps getVelocity and calls the setters. Return a cleanup that kills the ScrollTrigger and reverts the GSAP context so it stops on unmount. The CSS ports unchanged; keep the setters in a ref so they persist across renders.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reason through the velocity-to-skew pipeline alone. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why gsap.quickTo is used instead of writing a fresh tween or direct style write on every scroll frame, or why dividing getVelocity's raw pixels-per-second value by a negative constant both scales it into a usable degree range and flips its sign to make the lean feel like trailing motion. The same assistant can help optimize it — asking whether the clamp bounds (-14 to 14 degrees) should adapt for touch devices where flick velocities are typically higher, or whether a single shared quickTo could replace one setter per card if all cards should skew identically. It's also useful for extending the effect: ask it to add a matching horizontal skewX version, tie the skew intensity to an accessibility-respecting prefers-reduced-motion check, or drive a secondary blur amount from the same velocity reading for extra momentum feel. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll skew velocity" list effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — using ScrollTrigger's velocity API, not manual scroll-delta timing.

Requirements:
- A vertical list of card elements between two spacer sections.
- Create one GSAP quickTo setter per card (not a full tween created fresh each frame) targeting the card's skewY property, with a short duration and an easing curve, so each card can be smoothly nudged toward a new skew value on every call without allocating new tweens.
- Register a single global ScrollTrigger (it does not need a specific trigger element or pin) with an onUpdate callback that runs on every scroll frame.
- Inside that onUpdate callback, read the current scroll velocity using ScrollTrigger's built-in velocity getter (pixels per second, signed by direction), divide it by a constant to scale it into a small degree range, and negate it so the sign matches the direction the cards should visually lean.
- Clamp that scaled velocity value to a reasonable maximum range (e.g. -14 to 14 degrees) using a clamp utility, so a very fast flick can never shear the cards past a tasteful limit.
- Call every card's quickTo setter with that same clamped skew value every frame, so all cards skew together and, thanks to quickTo's built-in easing, smoothly return to zero skew on their own once scroll velocity drops back to zero — do not write any separate "reset to zero" logic.
- Only animate the skewY transform property, never a layout-affecting property, so the effect stays GPU-composited even as more cards are added to the list.`,
    },
  },
};

export default scrollSkewVelocity;
