const scrollPaperFoldBrochure = {
  id: 'scroll-paper-fold-brochure',
  title: 'Scroll Paper Fold Brochure',
  lastmod: '2026-09-16',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<div class="hint">Scroll ↓ to unfold the brochure</div>
<section class="fold-section">
  <div class="brochure-stage">
    <div class="brochure">
      <div class="panel cover">
        <h2>Trailhead</h2>
        <p>A three-panel guide to the ridge walk</p>
      </div>
      <div class="panel middle" id="panelMiddle">
        <h3>The Route</h3>
        <p>6.2 miles, 900ft gain, moderate difficulty. Trailhead parking opens at dawn.</p>
      </div>
      <div class="panel right" id="panelRight">
        <h3>What to Bring</h3>
        <p>Water, layered clothing, a paper map — signal drops past the ridge line.</p>
      </div>
    </div>
  </div>
</section>
<div class="spacer"></div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; font-family: 'Helvetica Neue', Arial, sans-serif; background: #eef1ea; color: #223326; }
.hint { position: sticky; top: 12px; text-align: center; font-size: 13px; letter-spacing: 0.05em; color: #5a7a5f; z-index: 5; padding: 10px; }
.fold-section { height: 280vh; }
.spacer { height: 15vh; }

.brochure-stage { position: sticky; top: 14vh; height: 72vh; display: flex; align-items: center; justify-content: center; }

.brochure { display: flex; width: min(90vw, 600px); height: 380px; }
.panel { width: 33.333%; height: 100%; padding: 28px 22px; display: flex; flex-direction: column; justify-content: center; gap: 10px; box-shadow: 0 10px 30px rgba(34,51,38,0.15); }
.cover { background: linear-gradient(160deg, #2f6b45, #1c4530); color: #eef1ea; position: relative; z-index: 3; }
.cover h2 { font-size: 26px; margin: 0; }
.cover p { font-size: 13px; opacity: 0.85; margin: 0; }

.middle, .right { backface-visibility: hidden; }
.middle { background: #f8f6ee; transform-origin: left center; transform: rotateY(-140deg); position: relative; z-index: 2; }
.right { background: #eef1ea; border-left: 1px solid #d6ddd0; transform-origin: left center; transform: rotateY(-140deg); position: relative; z-index: 1; }
.panel h3 { font-size: 16px; margin: 0; color: #2f6b45; }
.panel p { font-size: 13px; line-height: 1.6; margin: 0; color: #445a48; }`,
  js: `gsap.registerPlugin(ScrollTrigger);

var panelMiddle = document.getElementById('panelMiddle');
var panelRight = document.getElementById('panelRight');

// transformPerspective gives each panel its OWN local vanishing point,
// centered on its own transform-origin, instead of sharing one perspective
// centered on the whole .brochure-stage. With a single shared perspective,
// a panel hinged at its own left edge -- off-center from that shared
// vanishing point -- visually drifts away from the seam as it rotates
// instead of swinging flush against the panel beside it.
gsap.set([panelMiddle, panelRight], { rotateY: -140, transformStyle: 'preserve-3d', transformPerspective: 1600 });

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.fold-section',
    start: 'top top',
    end: 'bottom bottom',
    scrub: 0.5,
    pin: false,
  },
});

tl.to(panelMiddle, { rotateY: 0, ease: 'none', duration: 1 }, 0.05)
  .to(panelRight, { rotateY: 0, ease: 'none', duration: 1 }, 0.45);`,
  seo: {
    title: 'Scroll Paper Fold Brochure — Free HTML CSS JS Snippet',
    description: 'A tri-fold brochure unfolds panel by panel as you scroll, each panel rotating open on its hinge with CSS 3D perspective and a scrubbed GSAP timeline.',
    about: {
      title: 'Scroll Paper Fold Brochure — CSS 3D Hinge Rotation, transform-origin & Sequential Scrub',
      description: `A tri-fold brochure that starts closed and opens one panel at a time as the page scrolls, each panel rotating open on its hinge exactly like unfolding a real paper brochure. Pair with [Scroll Sticky Stack](/ui-snippets/scroll-sticky-stack/) for another sticky-staged sequential reveal, or [Scroll Parallax Layers](/ui-snippets/scroll-parallax-layers/) for a simpler scrub effect.

**A sticky stage inside a tall section, not a hard pin**

\`.fold-section\` is 280vh tall, defining the scroll distance the unfold takes. \`.brochure-stage\` inside it uses \`position: sticky\` to hold itself in view for that distance, while the ScrollTrigger driving the animation explicitly sets \`pin: false\` — sticky positioning handles the visual staging, letting the brochure unfold across a normal-height scrolling section rather than a hard-pinned one.

**Hinge rotation via transform-origin**

Both the middle and right panels start at \`rotateY(-140deg)\` — folded back behind the cover panel — with \`transform-origin: left center\`, so rotation pivots around their left edge exactly like a real paper hinge rather than the panel's own center.

**A local perspective per panel, not one shared on the parent**

A single \`perspective\` on the parent \`.brochure-stage\` is the more commonly seen approach, but it centers its one vanishing point on the whole brochure — not on either panel's own hinge. A panel rotating around its own left edge, off-center from that shared vanishing point, visually drifts away from the seam as it opens instead of swinging flush against the panel beside it, leaving a distracting gap right at the hinge. GSAP's \`transformPerspective\` (set once via \`gsap.set\`) gives each rotating panel its own local vanishing point centered on its own \`transform-origin\` instead, which is what keeps it pinned flush against the seam through the entire rotation.

**backface-visibility: hidden hides the closed panels correctly**

\`-140deg\` is past the ±90deg point at which a rotated element stops showing its front and starts showing its back. Without \`backface-visibility: hidden\`, a closed panel would render that back face directly at the viewer — mirrored and upside-down, since nothing else styles or hides it — instead of reading as "folded away." Setting \`backface-visibility: hidden\` on both panels makes the back face render as nothing at all while past that threshold, so a closed panel is genuinely invisible rather than showing garbled reversed text, and it swings cleanly into normal, correctly-oriented view the moment its rotation crosses back past ±90deg toward 0.

**Sequential unfolding on one scrubbed timeline**

A single GSAP timeline rotates the middle panel from \`-140deg\` to \`0deg\` starting at timeline position \`0.05\`, then the right panel through the same rotation starting at \`0.45\` — staggered so panels open one after another rather than simultaneously, mimicking how a person's hand would unfold a physical brochure fold by fold.

**Reversibility**

Because both hinge rotations are scrubbed tweens on the same timeline, scrolling back up refolds the panels in reverse order — the right panel closes first, then the middle — exactly retracing the unfolding motion.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll through the section', text: 'Scroll down slowly — the middle panel unfolds open first, then the right panel unfolds, revealing brochure content on each.' },
        { title: 'Scroll back up', text: 'The panels refold in reverse order — right panel first, then middle — confirming full reversibility.' },
        { title: 'Edit panel content', text: 'Change the heading and paragraph text inside .cover, #panelMiddle, and #panelRight in the HTML panel to your own brochure copy.' },
        { title: 'Adjust fold timing', text: 'Change the timeline positions (0.05 and 0.45) in the JS panel to make panels unfold closer together or further apart.' },
        { title: 'Add a fourth panel', text: 'Add another .panel div with rotateY(-140deg) and transform-origin: left center, then add a matching tween to the timeline at a later position.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for React, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'CSS 3D rotateY hinge rotation with transform-origin: left center for realistic paper-fold pivoting',
      'backface-visibility: hidden keeps closed panels genuinely invisible instead of showing mirrored back-face text',
      'position: sticky staging combined with ScrollTrigger pin: false — no inserted pin-spacer',
      'Panels unfold sequentially, staggered on one shared scrubbed timeline rather than simultaneously',
      'Per-panel transformPerspective keeps each hinge flush against the seam instead of drifting under one shared parent perspective',
      'Fully reversible — scrolling up refolds panels in the reverse order they opened',
      'ease: none keeps each panel\'s rotation mapped directly and linearly to scroll position',
      'Corporate brochure palette: forest green cover, cream inner panels, clean sans-serif type',
      'Works across a normal-height tall section rather than requiring a hard pin',
    ],
    useCases: [
      { icon: 'FORM',   title: 'Product or service brochure landing page', desc: 'Present a multi-part offering (plans, services, itineraries) as a literal unfolding brochure for a tactile, memorable scroll section.' },
      { icon: 'DESIGN', title: 'Print-to-digital brand consistency', desc: 'Give a brand with real printed tri-fold materials a digital section that echoes the same physical unfolding motion.' },
      { icon: 'ANIM',   title: 'Learn CSS 3D hinge rotation technique', desc: 'Study how transform-origin combined with rotateY and a per-element transformPerspective produces a believable paper-hinge fold — one that stays flush at the seam — rather than a flat rotation or a hinge that visibly drifts.' },
      { icon: 'FLOW',   title: 'Step-by-step guide or itinerary reveal', desc: 'Use each panel to reveal one step of a travel itinerary, event schedule, or onboarding guide as the user scrolls.' },
      { icon: 'STAR',   title: 'About page or company overview reveal', desc: 'Unfold company story, mission, and team sections panel by panel for a more considered pacing than a standard scroll page.' },
    ],
    faqs: [
      { q: 'Why is this pinned false when the other snippets in this set use pin: true?', a: 'The brochure unfolds across a normal-height tall section rather than needing a fixed "stage" the whole time — position: sticky on the wrapping element achieves the same staying-in-view effect without GSAP inserting pin-spacer elements, which better suits content meant to transition while the page continues scrolling.' },
      { q: 'How does the hinge rotation look like real paper instead of a flat spin?', a: 'transform-origin: left center means rotation pivots around the panel\'s left edge, not its center — exactly where a real paper hinge would be. Combined with its own transformPerspective, the rotating panel swings through genuine 3D space, flush against the seam, rather than just skewing flat or drifting away from the panel beside it.' },
      { q: 'Why use GSAP\'s transformPerspective instead of a CSS perspective on the parent?', a: 'A single perspective on the parent stage centers one vanishing point on the whole brochure, not on either panel\'s own hinge. A panel rotating around its own left edge, off-center from that shared point, visually drifts away from the seam as it opens — a distracting gap appears right where the hinge should stay flush. transformPerspective gives each rotating panel its own local vanishing point centered on its own transform-origin instead, which is what keeps it pinned to the seam through the whole rotation.' },
      { q: 'Why do the panels open one after another instead of together?', a: 'Both panel rotations are tweens on one shared scrubbed timeline, but placed at different timeline start positions (0.05 and 0.45) — this staggers them so the middle panel finishes most of its unfold before the right panel begins, mimicking how a hand would open a real brochure fold by fold.' },
      { q: 'Why does each panel need backface-visibility: hidden?', a: 'The closed rotation angle, -140deg, is past the ±90deg point where a rotated element switches from showing its front to showing its back. Without backface-visibility: hidden, a closed panel would render that back face — mirrored and upside-down — directly at the viewer instead of reading as tucked away. Setting it hides that back face entirely, so the panel is genuinely invisible while closed and swings into correctly-oriented view only once its rotation crosses back past ±90deg.' },
      { q: 'Can I add a fourth or fifth panel?', a: 'Yes — add another .panel element with the same starting rotateY(-140deg) and transform-origin: left center, then add a tween for it to the timeline at a later position than the existing panels, and extend the section height proportionally.' },
      { q: 'Does this work on mobile where 3D perspective can look different?', a: 'Yes — CSS 3D transforms and rotateY are broadly supported. On very narrow viewports you may want to reduce the transformPerspective value or panel widths so panels stay legible; the max-width: 90vw sizing already keeps the brochure responsive.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why transform-origin: left center paired with each panel's own transformPerspective is what makes this rotation read as a paper hinge flush against the seam, rather than a flat card flip or a hinge that visibly drifts away from its neighbor under one shared parent perspective — and to contrast that with the deliberate choice of position: sticky plus ScrollTrigger's pin: false here, versus pin: true used elsewhere in this library, so you understand when each staging approach is appropriate. It's a good base to extend: ask the assistant to add a subtle drop-shadow that intensifies as each panel opens (to suggest it lifting off the page), to add a fourth panel, or to make the fold direction alternate (mountain/valley fold) between panels. Treat it as a technique reference for CSS 3D hinge rotation, not a finished brochure.`,
      prompt: `Build a scroll-scrubbed "tri-fold brochure unfolding" animation in plain HTML, CSS, and JavaScript using GSAP and ScrollTrigger — CSS 3D transforms only, no 3D library.

Requirements:
- Create a tall wrapping section (e.g. 250-300vh) to define the scroll distance for the whole unfold sequence.
- Inside it, create a stage element positioned with CSS position: sticky and a top offset so it holds its position in the viewport as the user scrolls through the tall section.
- Create a brochure container laid out with display: flex containing 3 panel divs of equal width: a cover panel (visible/flat from the start) and two more panels that each start rotated to roughly -140 degrees on the Y axis with transform-origin set to "left center" so they appear folded behind the cover. Give both of those rotated panels backface-visibility: hidden — that starting angle is past the ±90 degree point where a rotated element shows its back face instead of its front, and without this property a closed panel renders that back face as mirrored, upside-down content instead of appearing genuinely hidden.
- Give each of those two rotating panels its own local perspective via GSAP's transformPerspective (roughly 1500-1800), set once alongside the initial rotateY — not a single shared CSS perspective on their parent. A shared parent perspective centers one vanishing point on the whole brochure rather than on either panel's own hinge, so a panel rotating around its own left edge visually drifts away from the seam as it opens; a local transformPerspective per panel keeps it pinned flush against the panel beside it through the entire rotation instead.
- Create one GSAP timeline whose scrollTrigger is attached to the tall wrapping section with a numeric scrub value and pin explicitly set to false (use the sticky positioning for staging instead of a hard pin).
- In that timeline, tween the second panel's rotateY from its folded angle to 0 degrees using ease: "none", starting near the beginning of the timeline, then tween the third panel's rotateY the same way starting partway through the timeline (staggered after the second panel, not simultaneous), so panels open one after another like a hand unfolding real paper.
- Give each panel distinct brochure-style content (heading and short paragraph) so the unfolding reveals genuinely different information per panel.
- Confirm scrolling back up refolds the panels in reverse order smoothly, since both rotations are tweens on the one shared scrubbed timeline.
- Style with a corporate brochure palette: a solid, deep accent-color cover panel and clean cream/off-white inner panels with simple sans-serif typography.`,
    },
  },
};

export default scrollPaperFoldBrochure;
