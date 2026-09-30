const scrollPolaroidStackFlip = {
  id: 'scroll-polaroid-stack-flip',
  title: 'Scroll Polaroid Stack Flip',
  lastmod: '2026-09-16',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<div class="hint">Scroll ↓ to sort the photo stack</div>
<div class="polaroid-wrap">
  <div class="polaroid-stage">
    <div class="grid-slots" id="gridSlots">
      <div class="slot" style="--gx:0;--gy:0"></div>
      <div class="slot" style="--gx:1;--gy:0"></div>
      <div class="slot" style="--gx:2;--gy:0"></div>
      <div class="slot" style="--gx:0;--gy:1"></div>
      <div class="slot" style="--gx:1;--gy:1"></div>
      <div class="slot" style="--gx:2;--gy:1"></div>
    </div>
    <div class="stack" id="stack">
      <div class="polaroid" style="--hue:200;--mr:-8deg" data-photo="1"><div class="photo"></div><div class="caption">Beach Day</div></div>
      <div class="polaroid" style="--hue:20;--mr:6deg" data-photo="2"><div class="photo"></div><div class="caption">Road Trip</div></div>
      <div class="polaroid" style="--hue:280;--mr:-4deg" data-photo="3"><div class="photo"></div><div class="caption">Sunset</div></div>
      <div class="polaroid" style="--hue:100;--mr:9deg" data-photo="4"><div class="photo"></div><div class="caption">Friends</div></div>
      <div class="polaroid" style="--hue:340;--mr:-11deg" data-photo="5"><div class="photo"></div><div class="caption">Camping</div></div>
      <div class="polaroid" style="--hue:50;--mr:5deg" data-photo="6"><div class="photo"></div><div class="caption">City Lights</div></div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; font-family: 'Georgia', serif; background: #ede3d0; }

.hint { text-align: center; padding: 28px 16px; font-size: 14px; color: #8a7a5c; font-family: system-ui, sans-serif; }

.polaroid-wrap { height: 500vh; position: relative; }
.polaroid-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; background: radial-gradient(ellipse at 50% 50%, #f5ecd9, #e2d3b0 85%); perspective: 1200px; }

.grid-slots { position: relative; width: min(480px, 86vw); height: min(320px, 58vw); display: grid; grid-template-columns: repeat(3, 1fr); grid-template-rows: repeat(2, 1fr); gap: 10px; }
.slot { border: 2px dashed rgba(138,122,92,0.25); border-radius: 8px; }

.stack { position: absolute; top: 50%; left: 50%; width: 130px; height: 158px; margin: -79px 0 0 -65px; }

.polaroid { position: absolute; top: 0; left: 0; width: 130px; height: 158px; background: #fffdf6; padding: 10px 10px 26px; border-radius: 3px; box-shadow: 0 8px 18px rgba(74,59,40,0.35); transform: rotate(var(--mr)); transform-style: preserve-3d; }
.photo { width: 100%; height: 108px; background: linear-gradient(135deg, hsl(var(--hue) 55% 68%), hsl(calc(var(--hue) + 40) 55% 55%)); border-radius: 2px; }
.caption { text-align: center; font-size: 11px; color: #4a3b28; margin-top: 8px; font-family: 'Georgia', serif; }

@media (max-width: 640px) {
  .grid-slots { width: 92vw; height: 62vw; gap: 6px; }
  .stack { width: 100px; height: 124px; margin: -62px 0 0 -50px; }
  .polaroid { width: 100px; height: 124px; padding: 7px 7px 20px; }
  .photo { height: 82px; }
  .caption { font-size: 9px; margin-top: 5px; }
}`,
  js: `gsap.registerPlugin(ScrollTrigger);

const polaroids = gsap.utils.toArray('.polaroid');
const slots = gsap.utils.toArray('.slot');
const gridSlots = document.getElementById('gridSlots');
const n = polaroids.length;

gsap.set(polaroids, { zIndex: (i) => n - i });

function getSlotOffset(index) {
  const slot = slots[index];
  const stackRect = document.getElementById('stack').getBoundingClientRect();
  const slotRect = slot.getBoundingClientRect();
  return {
    x: slotRect.left - stackRect.left + (slotRect.width - 130) / 2,
    y: slotRect.top - stackRect.top + (slotRect.height - 158) / 2,
  };
}

const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.polaroid-wrap',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});

polaroids.forEach((card, i) => {
  const segStart = i / n;
  const segEnd = segStart + (1 / n) * 0.85;
  const offset = getSlotOffset(i);

  tl.to(card, {
    y: -30 - i * 4,
    rotateX: -40,
    scale: 1.05,
    zIndex: n + 5,
    ease: 'none',
    duration: (segEnd - segStart) * 0.4,
  }, segStart)
  .to(card, {
    x: offset.x,
    y: offset.y,
    rotate: 0,
    rotateX: 0,
    scale: 1,
    ease: 'none',
    duration: (segEnd - segStart) * 0.6,
  }, segStart + (segEnd - segStart) * 0.4);
});

ScrollTrigger.refresh();`,
  seo: {
    title: 'Scroll Polaroid Stack Flip — Free HTML CSS JS Snippet',
    description: 'A messy stack of rotated polaroid photos peels off one at a time and flips into a neat grid as you scroll, GSAP ScrollTrigger scrubbed timeline. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Scroll Polaroid Stack Flip — getBoundingClientRect Targeting & 3D Peel-and-Settle Motion',
      description: `This snippet starts with a messy pile of randomly-rotated polaroid photo cards and, as the user scrolls, peels them off one at a time with a subtle 3D lift before flying each one into its own cell of a neat underlying grid — a satisfying "getting organized" transformation.

**Randomized resting rotation via CSS custom properties**

Each \`.polaroid\` sets its own \`--mr\` (mess rotation) custom property consumed by \`transform: rotate(var(--mr))\`, giving the initial pile a natural, hand-tossed look where no two photos sit at the same angle — all defined inline in the HTML so the messy arrangement is easy to art-direct per photo.

**Measuring real target positions with getBoundingClientRect**

Rather than hardcoding each photo's final grid position, a hidden \`.grid-slots\` CSS Grid layout defines the actual target cells, and \`getSlotOffset()\` measures the pixel offset from the stack's origin to each slot using \`getBoundingClientRect()\` at runtime — so the grid can be reflowed (different columns, gaps, or a responsive breakpoint) without ever touching the animation's position math.

**Two-part motion per card: peel, then settle**

Each polaroid's segment is split into two tweens: first a small lift-and-tilt (\`rotateX: -40, scale: 1.05\`, a negative \`y\` and boosted \`zIndex\`) simulating a card being physically picked up off the pile with a 3D peel using \`transform-style: preserve-3d\` and the stage's \`perspective\`, then a second tween flying it to its measured grid offset while resetting rotation and scale to flat and neutral — reading as the photo being placed down into its slot.

**Sequential ordering via fractional timeline segments**

The familiar \`segStart = i / n\` pattern (also used in [Scroll Book Shelf Slide](/ui-snippets/scroll-book-shelf-slide/) and [Scroll Terrain Contour Lines](/ui-snippets/scroll-terrain-contour-lines/)) gives each polaroid its own slice of the scroll range so they peel and settle one after another rather than all at once, with ascending \`zIndex\` ensuring later cards in the original stack visually sit on top while still in the pile.

**Fully reversible**

Every tween lives on one \`scrub: true\` timeline, so scrolling back up lifts each photo back out of its grid slot, tilts it back in 3D, and drops it back into its messy pile position and rotation — undoing the sort in reverse order.

Pair this with [Scroll Card Deck Shuffle](/ui-snippets/scroll-card-deck-shuffle/) for a related stack-transformation technique.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll through the preview', text: 'Scroll down slowly — each polaroid lifts off the messy pile with a 3D tilt, then flies into its own slot in the neat grid below.' },
        { title: 'Add or remove photos', text: 'Add a .polaroid element to #stack with its own --hue and --mr custom properties, and a matching .slot element to #gridSlots — the JS reads both arrays\' lengths automatically.' },
        { title: 'Use real photos', text: 'Replace the .photo div\'s gradient background with an <img> or background-image pointing at your own image.' },
        { title: 'Change the grid layout', text: 'Edit grid-template-columns/rows on .grid-slots — getSlotOffset() measures actual rendered slot positions, so any grid layout works without touching the JS.' },
        { title: 'Adjust the peel height and tilt', text: 'Change the rotateX, scale and y values in the first tween of each card\'s segment to make the peel more or less dramatic.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Randomized per-card rotation via CSS custom properties for an authentic messy pile',
      'Real grid target positions measured at runtime with getBoundingClientRect, not hardcoded',
      'Two-part peel-then-settle motion using 3D rotateX and perspective for a lifted feel',
      'Sequential fractional-timeline segments stagger each card\'s turn',
      'Ascending z-index keeps stack order visually correct before cards peel away',
      'Fully reversible — cards lift back out of the grid and return to the messy pile on scroll-up',
      'Warm cream/kraft-paper color palette with soft box-shadow depth',
      'Responsive stack and grid sizing at the 640px breakpoint',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Photo gallery or portfolio organization reveal', desc: 'A literal "sorting the mess into order" animation for a photography portfolio or gallery landing page.' },
      { icon: 'APP', title: 'Memory or social app onboarding', desc: 'Use the peel-and-sort motion to represent photos being organized into albums in a memories or social app.' },
      { icon: 'ART', title: 'Scrapbook or travel-journal storytelling', desc: 'A nostalgic, hand-placed aesthetic well suited to travel journals, scrapbook sites, or personal blogs.' },
      { icon: 'FLOW', title: 'Team or testimonial grid reveal', desc: 'Repurpose each polaroid as a team member photo or testimonial card that organizes into a neat grid.' },
      { icon: 'LEARN', title: 'Learn runtime-measured animation targets', desc: 'Study how getBoundingClientRect lets an animation target a real, reflow-aware layout instead of hardcoded coordinates.' },
      { icon: 'CODE', title: 'Learn 3D peel/lift transforms', desc: 'See how perspective plus rotateX and preserve-3d combine to simulate an object being physically lifted off a surface.' },
    ],
    faqs: [
      { q: 'How does each polaroid know where to land in the grid?', a: 'A hidden CSS Grid of .slot elements defines the real target layout. getSlotOffset() measures each slot\'s position relative to the stack\'s origin with getBoundingClientRect() at runtime, so the animation always targets the grid\'s actual rendered position rather than a hardcoded coordinate.' },
      { q: 'What creates the "peeled off the pile" feel?', a: 'The stage has a CSS perspective set, each card has transform-style: preserve-3d, and the first tween in each card\'s segment applies a negative rotateX along with a slight scale-up and lift — combined, this reads as the card tilting up and off the pile in 3D before flying to its slot.' },
      { q: 'Can I change the grid to 4 columns or a different shape?', a: 'Yes — edit grid-template-columns/rows on .grid-slots and add matching .slot elements; since positions are measured live with getBoundingClientRect, no animation code needs to change.' },
      { q: 'How do I use real photographs instead of gradient placeholders?', a: 'Replace each .photo div\'s CSS gradient background with a background-image or swap it for an <img> tag sized to fill the same area — the surrounding polaroid frame and caption styling stay the same.' },
      { q: 'Does resizing the window break the grid targeting?', a: 'Call ScrollTrigger.refresh() after a resize (or listen for a resize event) so getSlotOffset() re-measures the slots\' new positions; the snippet already calls refresh() once on load to establish correct initial positions.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI coding assistant and ask it to explain why getSlotOffset() measures grid positions with getBoundingClientRect at runtime instead of hardcoding each polaroid's final x/y — the answer is about keeping the animation correct across any grid layout or screen size without touching the JS. It's a good one to extend with an assistant's help: ask it to make the grid responsive (fewer columns on mobile) while keeping the animation targeting correct, to add a subtle random landing-rotation to each photo once it settles into its slot for extra realism, or to add a real 3D flip (rotateY 180 degrees) revealing a caption on the back of each polaroid as it settles.`,
      prompt: `Build a scroll-driven "polaroid stack sorts into a grid" animation in HTML, CSS and JavaScript using GSAP and ScrollTrigger — no canvas, no WebGL.

Requirements:
- Render a small messy pile of absolutely-positioned "polaroid" photo card divs, all stacked at the same origin point, each given its own randomized rotation via an inline CSS custom property so the pile looks naturally hand-tossed, plus ascending z-index matching their stacking order.
- Separately define a hidden CSS Grid of "slot" placeholder elements representing the neat final target layout (e.g. 3 columns by 2 rows).
- Write a helper function that measures each slot's actual rendered position relative to the stack's origin using getBoundingClientRect, so the animation always targets real layout positions rather than hardcoded coordinates.
- Wrap the stack in a tall scroll section and, using one GSAP timeline attached via ScrollTrigger with scrub: true, give each polaroid its own fractional slice of the scroll range containing two sequential tweens: first a small 3D "peel" lift (negative rotateX with a perspective set on the parent, a slight scale up, a small y lift, and a boosted z-index) simulating the card being picked up off the pile, then a second tween flying it to its measured grid slot position while resetting rotation, rotateX and scale back to neutral, so it reads as the photo settling flat into its slot.
- The whole sequence must animate forward and reverse cleanly as the user scrolls down and back up, lifting cards back out of the grid and returning them to their messy pile positions and rotations.
- Use a warm cream and kraft-paper color palette with soft drop shadows for depth.`,
    },
  },
};

export default scrollPolaroidStackFlip;
