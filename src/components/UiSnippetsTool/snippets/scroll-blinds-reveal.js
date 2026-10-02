const scrollBlindsReveal = {
  id: 'scroll-blinds-reveal',
  title: 'Scroll Blinds Reveal',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sbr-top"><p>Scroll ↓</p></section>
<section class="sbr-stage" id="sbrStage">
  <div class="sbr-behind">
    <span class="sbr-eyebrow">Revealed</span>
    <h2>Let the light in</h2>
    <p>Seven slats tilt open like venetian blinds to uncover this section.</p>
  </div>
  <div class="sbr-blinds" id="sbrBlinds"></div>
</section>
<section class="sbr-bottom"><p>Scroll up and the blinds tilt shut again.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sbr-top,.sbr-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sbr-stage{position:relative;height:100vh;overflow:hidden}
.sbr-behind{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:24px;background:radial-gradient(85% 70% at 50% 35%,#20305f,#0a0e1c)}
.sbr-eyebrow{font-size:13px;font-weight:700;letter-spacing:.22em;text-transform:uppercase;color:#9fb4ff}
.sbr-behind h2{font-size:clamp(38px,8vw,92px);font-weight:800;letter-spacing:-.03em;background:linear-gradient(120deg,#fde68a,#fb923c);-webkit-background-clip:text;background-clip:text;color:transparent}
.sbr-behind p{color:#aeb4ca;font-size:clamp(15px,2.2vw,19px);max-width:440px}
.sbr-blinds{position:absolute;inset:0;z-index:2;display:flex;flex-direction:column;perspective:900px}
.sbr-slat{flex:1;background:linear-gradient(180deg,#181d33,#0e1224);border-bottom:1px solid rgba(255,255,255,.05);transform-origin:50% 0%;backface-visibility:hidden;will-change:transform,opacity;display:flex;align-items:center;justify-content:center}
.sbr-slat:first-child span{font-size:13px;letter-spacing:.16em;text-transform:uppercase;color:#7e88a0}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Build the slats — change SLATS for chunkier or finer blinds.
var SLATS = 7;
var wrap = document.getElementById('sbrBlinds');
for (var i = 0; i < SLATS; i++) {
  var slat = document.createElement('div');
  slat.className = 'sbr-slat';
  if (i === 0) slat.innerHTML = '<span>keep scrolling</span>';
  wrap.appendChild(slat);
}

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#sbrStage',
    start: 'top top',
    end: '+=150%',
    scrub: 0.4,
    pin: true
  }
});

// Each slat tilts around its own top edge, staggered from the top down,
// like pulling the cord on a set of venetian blinds.
tl.to('.sbr-slat', {
  rotationX: -92,
  opacity: 0,
  ease: 'none',
  stagger: 0.12
}, 0)
  .from('.sbr-behind h2', { y: 50, opacity: 0.2, ease: 'none' }, 0.25)
  .from('.sbr-behind p', { y: 30, opacity: 0, ease: 'none' }, 0.45);`,

  seo: {
    title: 'Scroll Blinds Reveal — Free GSAP Slat Flip Snippet',
    description: `Venetian-blind slats tilt open in 3D on scroll to uncover the section behind, staggered top-down with GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Blinds Reveal — Tilt Slats Open Like Venetian Blinds on Scroll',
      description: `The scroll blinds reveal covers a section with a stack of horizontal slats, then tilts each one open in 3D as you scroll — like pulling the cord on venetian blinds — so the content behind appears through widening gaps that sweep from top to bottom. Scrolling up tilts them shut again. This snippet builds it with GSAP ScrollTrigger (from a CDN), generated slat elements, and one staggered rotationX tween.

**Slats are generated, not hand-written**

A small loop builds \`SLATS\` (7) equal-height divs into the cover layer, each \`flex: 1\` of a full-viewport column. Generating them means the slat count is a single constant: bump it to 12 for finer, faster-feeling blinds or drop to 4 for chunky panels — the CSS and the tween need no edits because both target the shared \`.sbr-slat\` class.

**rotationX around the top edge is what sells "blinds"**

Each slat has \`transform-origin: 50% 0%\`, so it rotates around its own top edge, exactly like a physical slat hanging from its rail. The tween takes every slat to \`rotationX: -92°\` — just past parallel-to-the-viewer, at which point the slat is edge-on and effectively invisible. The parent's \`perspective: 900px\` gives the rotation real foreshortening; without it, rotateX just squashes the slat vertically with no depth cue.

**A stagger turns seven flips into one cord-pull**

The single tween uses \`stagger: 0.12\`, offsetting each slat's start down the stack. On a scrubbed timeline that reads as a wave: the top slat is fully open while the bottom is just starting, and the diagonal front of "openness" travels down the screen like light spilling through blinds. One tween plus a stagger replaces seven hand-placed tweens and stays trivially retunable.

**Opacity assists the edge-on illusion**

Real slats vanish at edge-on angles, but an anti-aliased 1px line can linger on screen. Tweening \`opacity: 0\` alongside the rotation guarantees each slat fully disappears at the end of its flip, and \`backface-visibility: hidden\` prevents the mirror image from flashing if a slat overshoots −90°.

**The revealed content arrives, it doesn't just sit there**

On the same timeline, the headline rises from \`y: 50\` starting at position 0.25 and the paragraph follows at 0.45 — timed so the content is settling into place while the middle slats are opening. Sharing one scrubbed timeline keeps the cover's exit and the content's entrance locked together at every scroll position.

**Pinned so the reveal owns its distance**

The stage pins for \`+=150%\`, mapping the full cord-pull onto 1.5 viewport-heights of scrolling with \`scrub: 0.4\` smoothing. Transform-and-opacity-only animation keeps the whole reveal compositor-friendly even with seven layers moving.

**Slats stay geometrically simple, which is why the effect scales**

Each slat is a plain flex child with no absolute positioning or manual sizing — \`flex: 1\` on equal siblings guarantees even heights at any viewport size, and the generator loop means adding a slat is changing one number, not hand-placing a new element. That simplicity is what makes the 3D perspective cheap: seven (or seventy) identical transform origins mean the browser can batch the compositor work identically per layer, so raising \`SLATS\` costs GPU time linearly rather than triggering new layout paths.

**Customizing it**

Rotate slats to +92° to open downward, switch to vertical slats with \`flex-direction: row\` and \`rotationY\`, or map an image across the slats with a shared \`background-image\` and per-slat \`background-position\`. Related reveals: the sliding [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), the parting [scroll split panels](/ui-snippets/scroll-split-panels/), and the clip-path [scroll image mask](/ui-snippets/scroll-image-mask/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Seven slats generate and cover the section.` },
      { title: 'Scroll into the stage', text: `Slats start tilting open from the top down.` },
      { title: 'Watch the sweep', text: `The open-wave travels down like a cord pull.` },
      { title: 'Scroll back up', text: `The blinds tilt shut — fully scrubbed.` },
      { title: 'Tune SLATS', text: `Change one constant for finer or chunkier blinds.` },
    ] },
    features: [
      { title: '3D slat flips', text: `rotationX around each slat's top edge.` },
      { title: 'Generated slats', text: `One SLATS constant controls the count.` },
      { title: 'Cord-pull stagger', text: `A 0.12 stagger sweeps the reveal downward.` },
      { title: 'True perspective', text: `900px perspective adds real foreshortening.` },
      { title: 'Edge-on cleanup', text: `Opacity and backface-visibility hide slivers.` },
      { title: 'Arriving content', text: `Headline and copy rise on the same timeline.` },
      { title: 'Pinned + scrubbed', text: `The reveal maps to 150% of scroll.` },
      { title: 'Reversible', text: `Scrolling up closes the blinds.` },
    ],
    useCases: [
      { title: 'Section transitions', text: 'Hand off between sections with a more textured effect than a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), with slats tilting open in 3D from the top downwards.' },
      { title: 'Hero reveals', text: 'Open onto a [scroll zoom hero](/ui-snippets/scroll-zoom-hero/) or a product shot, with 900px perspective adding real foreshortening to each slat.' },
      { title: 'Photography portfolios', text: 'Slat open a full-bleed image before leading into a [photo gallery](/ui-snippets/photo-gallery/), with a `SLATS` constant controlling how many blinds there are.' },
      { title: 'Launch teasers', text: 'Tease an announcement through widening gaps, perhaps with a [countdown timer](/ui-snippets/countdown-timer/) visible behind the blinds as they tilt open.' },
      { title: 'Editorial chapter breaks', text: 'Punctuate long reads inside a [scroll pin story](/ui-snippets/scroll-pin-story/), or swap in a [scroll image mask](/ui-snippets/scroll-image-mask/) where a single aperture suits better.' },
      { icon: 'CODE', title: 'Related: Scroll Card Fan', desc: 'See the [Scroll Card Fan](/ui-snippets/scroll-card-fan/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do the slats tilt like real blinds?', a: `Each slat has transform-origin: 50% 0%, so a rotationX tween swings it around its own top edge — the hinge a physical slat hangs from. The parent's perspective: 900px provides foreshortening so nearer edges grow and farther edges shrink; without perspective, rotateX just squashes the slat flat with no depth.` },
      { q: 'Why rotate to −92° instead of −90°?', a: `At exactly −90° a slat is edge-on, but anti-aliasing can leave a shimmering 1px line, and floating-point scrub positions may hover a hair before the end. Overshooting to −92° with a simultaneous opacity fade guarantees clean disappearance, while backface-visibility: hidden stops the slat's mirror side from flashing past −90°.` },
      { q: 'How does the top-to-bottom sweep work?', a: `A single tween targets all slats with stagger: 0.12, offsetting each one's start time down the stack. Under a scrubbed timeline that offset becomes spatial: at any scroll position the top slats are further through their flip than the lower ones, so the front of openness travels downward like a cord being pulled.` },
      { q: 'Can the blinds reveal an image instead of a headline?', a: `Yes — put anything in .sbr-behind; it's just a layered section under the slat stack. You can also print an image on the blinds themselves: give every slat the same background-image with background-size: 100% 700% and per-slat background-position offsets so the picture reads whole when closed and shreds open as they tilt.` },
      { q: 'Does raising the slat count hurt performance?', a: `Minimally — every slat is an identical flex child with the same transform-origin and rotationX property, so the compositor batches them uniformly rather than computing distinct layout paths per slat. Cost scales roughly linearly with count on the GPU, not the CPU, since the only JavaScript work is building the initial DOM and running one staggered tween; the scroll-driven updates themselves are pure compositor transforms.` },
      { q: 'How do I use this blinds reveal in React, Vue, or Angular?', a: `Render the slats from an array (v-for / map / *ngFor) instead of the DOM loop, then create the timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — inside gsap.context scoped to the stage ref, reverting it on cleanup so the pin is removed on unmount. Slat styles are simple enough to express as Tailwind utilities on the mapped element.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reconstruct the hinge geometry by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each slat rotates to -92 degrees instead of a clean -90, and why transform-origin is set to the slat's top edge rather than its center. The same assistant is useful for optimizing it — ask whether raising the SLATS constant from 7 to 40 for finer blinds would meaningfully change compositor cost given every slat shares an identical transform-origin and property set, or whether the stagger value should shrink as slat count grows to keep the total sweep duration constant. It is just as useful for extending the effect — ask it to print a background image across the slats so it reads whole when closed and shreds open as they tilt, reverse the sweep direction to bottom-up, or swap rotationX for rotationY and a row layout for vertical blinds instead of horizontal. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "venetian blinds" scroll reveal in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step) plus CSS 3D transforms.

Requirements:
- A cover layer generated entirely in JavaScript: loop a SLATS constant number of times, creating one flex-child div per slat inside a container using flex-direction: column, so all slats are always equal height regardless of the constant's value, with a section of real content sitting underneath the cover layer.
- Give the slat container CSS perspective (for example 900px) and give each slat transform-origin: 50% 0% (its own top edge) so a rotationX transform swings it around that hinge like a physical slat hanging from a rail, not around its own center.
- Register one GSAP timeline on a pinned, scrubbed ScrollTrigger, and inside it animate all slats with a single tween (not one tween per slat) that rotates every slat past -90 degrees (for example to -92) while fading opacity to 0, using a stagger so each slat's rotation begins slightly after the one above it — producing a top-to-bottom sweep from one tween plus a stagger value, not manually offset individual tweens.
- Set backface-visibility: hidden on the slats so no mirrored slat face flashes into view if a slat's rotation overshoots past the edge-on angle.
- On the same shared timeline, animate the revealed content's heading and paragraph in from an offset with reduced opacity, timed so they visibly settle into place while the middle slats are still mid-rotation, so the cover's exit and the content's entrance are locked to one timeline rather than driven by separate triggers.
- Confirm scrolling back up correctly reverses the sweep, tilting slats shut from the same stagger pattern, purely from the scrubbed timeline reversing — no separate close-direction logic.`,
    },
  },
};

export default scrollBlindsReveal;
