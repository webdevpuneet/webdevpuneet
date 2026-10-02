const pinCard = {
  id: 'pin-card',
  title: '3D Pin Card',
  lastmod: '2026-07-18',
  category: 'cards',
  html: `<div class="pc-stage">
  <a href="#" class="pc-pin" id="pcPin">
    <span class="pc-label" id="pcLabel">/aceternity.dev</span>
    <span class="pc-beam" aria-hidden="true"></span>
    <span class="pc-ring" aria-hidden="true"></span>
    <span class="pc-ring pc-ring2" aria-hidden="true"></span>
    <div class="pc-card">
      <h3>Build the future</h3>
      <p>Hover this card — it tilts in 3D and a perspective pin rises to anchor it in space.</p>
      <div class="pc-grad"></div>
    </div>
  </a>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060c;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh}

.pc-stage{perspective:1000px;padding:40px}
.pc-pin{position:relative;display:block;width:260px;text-decoration:none;color:inherit;transform-style:preserve-3d;transition:transform .3s ease}

.pc-card{position:relative;border-radius:18px;padding:24px;background:#101019;border:1px solid #23233a;transform:translateZ(0);transition:transform .3s ease;overflow:hidden}
.pc-pin:hover .pc-card{transform:rotateX(28deg) translateZ(0)}
.pc-card h3{font-size:20px;font-weight:800;margin-bottom:8px;position:relative;z-index:1}
.pc-card p{font-size:13.5px;color:#a3a3bd;line-height:1.55;position:relative;z-index:1}
.pc-grad{position:absolute;inset:0;background:radial-gradient(circle at 30% 0,rgba(129,140,248,.35),transparent 60%)}

/* The pin label, beam, and rings appear above the tilting card on hover */
.pc-label{position:absolute;top:-46px;left:50%;transform:translateX(-50%) translateZ(0);opacity:0;font-size:11px;font-weight:700;letter-spacing:.03em;background:#1e1b4b;border:1px solid #4f46e5;color:#c7d2fe;padding:5px 12px;border-radius:999px;white-space:nowrap;transition:opacity .3s,transform .3s;pointer-events:none}
.pc-pin:hover .pc-label{opacity:1;transform:translateX(-50%) translateY(-6px) translateZ(60px)}

.pc-beam{position:absolute;top:-22px;left:50%;width:1px;height:0;background:linear-gradient(180deg,#818cf8,transparent);transform:translateX(-50%) rotateX(70deg);transform-origin:top;opacity:0;transition:height .35s ease,opacity .3s;pointer-events:none}
.pc-pin:hover .pc-beam{height:90px;opacity:1}

.pc-ring{position:absolute;top:64px;left:50%;width:8px;height:8px;border-radius:50%;border:1px solid rgba(129,140,248,.6);transform:translate(-50%,-50%) rotateX(70deg);opacity:0;pointer-events:none}
.pc-pin:hover .pc-ring{animation:pcPing 2.4s ease-out infinite}
.pc-pin:hover .pc-ring2{animation-delay:1.2s}
@keyframes pcPing{0%{opacity:.7;width:8px;height:8px}100%{opacity:0;width:90px;height:90px}}`,

  js: `var pin = document.getElementById('pcPin');
var label = document.getElementById('pcLabel');

// Pointer-aware tilt: the card leans toward the cursor while hovered, layered
// on top of the base rotateX so the 3D pin illusion tracks the mouse.
pin.addEventListener('pointermove', function (e) {
  var r = pin.getBoundingClientRect();
  var px = (e.clientX - r.left) / r.width - 0.5;   // -0.5 .. 0.5
  var py = (e.clientY - r.top) / r.height - 0.5;
  pin.style.transform = 'rotateY(' + (px * 14) + 'deg) rotateX(' + (-py * 10) + 'deg)';
});
pin.addEventListener('pointerleave', function () {
  pin.style.transform = 'rotateY(0) rotateX(0)';
});

// Clicking copies the label "url" to show the pin as a real link affordance.
pin.addEventListener('click', function (e) {
  e.preventDefault();
  if (navigator.clipboard) {
    navigator.clipboard.writeText(label.textContent.trim()).then(function () {
      var prev = label.textContent;
      label.textContent = 'Copied ✓';
      setTimeout(function () { label.textContent = prev; }, 1100);
    });
  }
});`,

  seo: {
    title: '3D Pin Card — Free HTML CSS JS Perspective Hover Snippet',
    description: `A card that tilts in 3D on hover while a perspective pin, beam, and pinging rings rise to anchor it in space, tracking the cursor. Exports to React, Vue & Tailwind.`,
    about: {
      title: '3D Pin Card — Perspective Tilt with a Rising Anchor Pin',
      description: `The 3D pin card is the standout hover interaction from modern component libraries: a card that tilts back in three dimensions when you hover it, while a floating "pin" — a label, a beam, and expanding rings — rises above it as if pinning the card to a point in space. This snippet recreates the whole illusion with plain HTML, CSS 3D transforms, and a little vanilla JavaScript for cursor tracking.

**Establishing 3D space**

The effect lives inside a \`perspective: 1000px\` stage, which is what gives child transforms real depth — without it, \`rotateX\` would look like a flat squash. The pin wrapper uses \`transform-style: preserve-3d\` so its children (the card, the label, the beam, the rings) each keep their own position in 3D rather than being flattened into the wrapper's plane. This is the foundational setup for any layered 3D effect.

**The card's backward tilt**

On hover, the inner card rotates with \`rotateX(28deg)\`, tipping its top edge away from you so you appear to look down at it on a surface. Because the perspective is set on the parent, this reads as the card laying back into the scene. The transition makes it ease in and out smoothly. A radial gradient overlay in the top corner adds a subtle light source consistent with the tilt.

**The pin: label, beam, and rings**

What makes this more than a tilt is the pin that appears to hold the card. Three elements animate in on hover: a rounded \`.pc-label\` pill that floats up and forward via \`translateZ(60px)\` so it hovers above the card in 3D; a thin \`.pc-beam\` that grows in height with \`rotateX(70deg)\` so it lies along the depth axis like a pin's shaft; and two \`.pc-ring\` circles, also rotated 70° into the floor plane, that \`pcPing\` outward and fade on a staggered loop, like ripples around the pin's base. Together they create the impression of a physical pin staking the card to the ground.

**Cursor-tracking tilt**

On top of the base \`rotateX\`, JavaScript adds pointer-aware lean. A \`pointermove\` handler converts the cursor's position within the card into a -0.5…0.5 range and applies \`rotateY\` and \`rotateX\` to the wrapper, so the whole assembly — card and pin — leans toward the cursor. On \`pointerleave\` it resets to flat. Because the wrapper has \`preserve-3d\`, the pin elements track the lean correctly, keeping the illusion coherent from any angle.

**A real link affordance**

The component is an \`<a>\`, and the label reads like a URL, so it behaves like a clickable, pinned link. Clicking copies the label text via the \`navigator.clipboard\` API and briefly swaps the label to "Copied ✓" — demonstrating how the pin can double as a shareable handle. Swap this for real navigation by removing the \`preventDefault\`.

**Customizing it**

Tune the \`rotateX(28deg)\` for a steeper or gentler tilt, change the \`translateZ\` to float the label higher, adjust the ring \`pcPing\` size and timing, and set the label text to your link. Recolor the beam, rings, and gradient to your accent. Pair it with a [focus cards](/ui-snippets/focus-cards/) grid or a [meteor card](/ui-snippets/meteor-card/) for a set of eye-catching 3D cards.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A card renders flat with a hidden pin label above it.` },
      { title: 'Hover the card', text: `It tilts back in 3D while a pin label, beam, and rings rise.` },
      { title: 'Move the cursor', text: `The whole assembly leans toward the pointer.` },
      { title: 'Watch the rings', text: `Two circles ping outward around the pin base on a loop.` },
      { title: 'Click the card', text: `The label URL copies and shows a Copied confirmation.` },
      { title: 'Set your link', text: `Change the label text and remove preventDefault to navigate.` },
    ] },
    features: [
      { title: 'Real 3D perspective', text: `A perspective stage gives transforms true depth.` },
      { title: 'preserve-3d layering', text: `Card, label, beam, and rings hold their own depth.` },
      { title: 'Backward card tilt', text: `rotateX lays the card into the scene on hover.` },
      { title: 'Floating pin label', text: `translateZ lifts the label above the card.` },
      { title: 'Depth-axis beam', text: `A rotated shaft reads as the pin stem.` },
      { title: 'Pinging base rings', text: `Staggered ripples expand around the pin.` },
      { title: 'Cursor-tracking lean', text: `pointermove tilts the assembly toward the mouse.` },
      { title: 'Clipboard link', text: `Clicking copies the label as a share handle.` },
    ],
    useCases: [
      { title: 'Featured links', text: 'Showcase a profile or link inside a [focus cards](/ui-snippets/focus-cards/) grid, with a floating pin label, beam and pinging rings rising above the card.' },
      { title: 'Portfolio highlights', text: 'Pin a project above a [portfolio hero](/ui-snippets/portfolio-hero/), with `rotateX` laying the card back into the scene on hover.' },
      { title: 'Product spotlights', text: 'Pair with a [meteor card](/ui-snippets/meteor-card/) for variety in a feature grid, using `translateZ` to lift the label above the card.' },
      { title: 'Profile card upgrades', text: 'Give a flat [profile card](/ui-snippets/profile-card/) a 3D treatment, where a perspective stage and `preserve-3d` make every layer hold its own depth.' },
      { title: 'Link-in-bio pages', text: 'Make a shareable handle the centrepiece of a link page, and use it as a reference for combining perspective with floating elements.' },
    ],
    faqs: [
      { q: 'Why does the card need a perspective parent?', a: `perspective: 1000px on the stage is what gives 3D transforms real depth — it defines how strongly things recede. Without it, rotateX(28deg) just looks like a vertical squash. The pin wrapper also uses transform-style: preserve-3d so the card, label, beam, and rings each keep their own 3D position instead of flattening into one plane.` },
      { q: 'How is the floating pin built?', a: `Three elements animate in on hover: a label pill pushed forward with translateZ(60px) so it hovers above the card, a thin beam rotated 70 degrees into the depth axis that grows in height like a pin shaft, and two rings also rotated into the floor plane that expand and fade on a staggered ping loop, reading as ripples around the pin's base.` },
      { q: 'How does the tilt follow the cursor?', a: `A pointermove handler converts the cursor's position inside the card to a -0.5 to 0.5 range and applies rotateY and rotateX to the wrapper, so the whole assembly leans toward the pointer on top of the base tilt. pointerleave resets it to flat. Because the wrapper is preserve-3d, the pin elements lean coherently with the card.` },
      { q: 'What happens when I click it?', a: `The card is an anchor with a URL-style label. The click handler prevents navigation, copies the label text via navigator.clipboard, and briefly swaps it to Copied so it acts as a shareable handle. To use it as a normal link instead, remove the preventDefault and set a real href.` },
      { q: 'How do I use this 3D pin card in React, Vue, or Angular?', a: `Render the structure as a component and keep the perspective and preserve-3d CSS. Handle pointermove and pointerleave with framework events, writing the transform via a ref or state-driven inline style. Use the clipboard API in the click handler. The hover-driven pin animations are pure CSS and need no JS. In Tailwind, use perspective and transform utilities with arbitrary translate-z and rotate-x values.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the 3D layering by trial and error. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how transform-style preserve-3d on the pin wrapper lets the label, beam, and rings hold independent depth via translateZ while the JavaScript pointermove handler simultaneously rotates the whole assembly, and why the base card tilt uses rotateX while the cursor-tracking tilt adds both rotateY and rotateX on top of it. The same assistant can help optimize it, for example checking whether setting style.transform directly on every pointermove event causes jank on lower-end devices versus using a CSS custom property, or whether the ring ping animation's timing actually reads as two staggered ripples rather than one. It's also useful for extending the effect: ask it to add a subtle parallax to the gradient overlay based on cursor position, make the pin's label editable and copy a real URL, or turn this into a grid of pin cards that each track the cursor independently. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a 3D "pin card" hover effect in plain HTML, CSS, and vanilla JavaScript using CSS 3D transforms and one pointermove handler — no libraries, no canvas.

Requirements:
- A stage element with CSS perspective, containing a link-like wrapper with transform-style: preserve-3d, so its children can each hold independent depth rather than being flattened into one plane.
- Inside the wrapper: a card that rotates backward on hover via rotateX to look like it's tilting away into the scene, plus a floating label pill above the card that on hover translates upward and forward along the z-axis (translateZ) so it visibly hovers in front of the tilted card.
- A thin vertical "beam" element between the label and the card that, on hover, grows from zero height to some fixed height while rotated into the depth plane (rotateX around 70 degrees) so it reads as a pin's shaft connecting the label to an anchor point.
- Two ring elements positioned at the pin's anchor point, also rotated into the depth plane, that on hover animate with a staggered, looping expand-and-fade keyframe (starting small and near-opaque, ending large and transparent) so they read as ripples pulsing outward from the pin's base.
- A pointermove handler on the wrapper that computes the cursor's position as a -0.5 to 0.5 fraction of the wrapper's width and height, then applies an additional rotateY and rotateX to the whole wrapper so the entire card-plus-pin assembly leans toward the cursor, resetting to flat on pointerleave.
- Make the component a real anchor element whose click handler copies a label string (styled to look like a URL) to the clipboard via the Clipboard API and briefly shows a "Copied" confirmation in place of the label text.`,
    },
  },
};

export default pinCard;
