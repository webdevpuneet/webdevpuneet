const radialMenu = {
  id: 'radial-menu',
  title: 'Radial Menu',
  lastmod: '2026-07-18',
  category: 'navigation',
  html: `<div class="rm-stage">
  <div class="rm-menu" id="rmMenu">
    <button class="rm-trigger" id="rmTrigger" aria-haspopup="true" aria-expanded="false" aria-label="Open actions">+</button>
  </div>
  <p class="rm-hint">Click the button to fan out actions</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a16;color:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;gap:30px}

.rm-menu{position:relative;width:64px;height:64px}
.rm-trigger{position:absolute;inset:0;z-index:3;border:none;border-radius:50%;background:linear-gradient(160deg,#6366f1,#9333ea);color:#fff;font-size:30px;font-weight:300;cursor:pointer;box-shadow:0 12px 30px -8px rgba(99,102,241,.7);transition:transform .3s cubic-bezier(.34,1.4,.5,1)}
.rm-menu.open .rm-trigger{transform:rotate(135deg)}

.rm-item{position:absolute;top:50%;left:50%;width:48px;height:48px;margin:-24px;z-index:2;border:none;border-radius:50%;background:#1c1c30;border:1px solid #2e2e4c;color:#c7d2fe;font-size:19px;cursor:pointer;display:flex;align-items:center;justify-content:center;
  transform:translate(0,0) scale(.2);opacity:0;pointer-events:none;
  transition:transform .35s cubic-bezier(.34,1.4,.5,1),opacity .25s;box-shadow:0 8px 18px -8px rgba(0,0,0,.6)}
.rm-menu.open .rm-item{opacity:1;pointer-events:auto}
.rm-item:hover{background:#6366f1;color:#fff}
.rm-label{position:absolute;white-space:nowrap;font-size:11px;background:#000;color:#fff;padding:2px 7px;border-radius:6px;opacity:0;transition:opacity .2s;bottom:-22px;left:50%;transform:translateX(-50%);pointer-events:none}
.rm-item:hover .rm-label{opacity:1}

.rm-hint{color:#56566e;font-size:13px}`,

  js: `var menu = document.getElementById('rmMenu');
var trigger = document.getElementById('rmTrigger');
var ACTIONS = [
  { icon: '✎', label: 'Edit' }, { icon: '⎙', label: 'Print' }, { icon: '⇄', label: 'Share' },
  { icon: '★', label: 'Save' }, { icon: '🗑', label: 'Delete' }
];
var RADIUS = 92, START = 180, SPREAD = 180;   // fan out across a half-circle arc

// Build items and pre-compute each one's resting offset on the arc.
var items = ACTIONS.map(function (a, i) {
  var btn = document.createElement('button');
  btn.className = 'rm-item';
  btn.innerHTML = a.icon + '<span class="rm-label">' + a.label + '</span>';
  var angle = (START + (SPREAD / (ACTIONS.length - 1)) * i) * Math.PI / 180;
  btn.dataset.x = Math.cos(angle) * RADIUS;
  btn.dataset.y = Math.sin(angle) * RADIUS;
  menu.appendChild(btn);
  return btn;
});

var open = false;
function setOpen(v) {
  open = v;
  menu.classList.toggle('open', v);
  trigger.setAttribute('aria-expanded', v ? 'true' : 'false');
  items.forEach(function (btn, i) {
    // Stagger each item slightly so they spring out in sequence.
    btn.style.transitionDelay = (v ? i * 35 : (items.length - i) * 20) + 'ms';
    btn.style.transform = v
      ? 'translate(' + btn.dataset.x + 'px,' + btn.dataset.y + 'px) scale(1)'
      : 'translate(0,0) scale(.2)';
  });
}

trigger.addEventListener('click', function (e) { e.stopPropagation(); setOpen(!open); });
document.addEventListener('click', function () { if (open) setOpen(false); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && open) setOpen(false); });`,

  seo: {
    title: 'Radial Menu — Free HTML CSS JS Fan-Out Action Snippet',
    description: `A trigger button that fans action items out along a circular arc with a staggered spring, computing positions with trigonometry. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Radial Menu — Actions That Fan Out on an Arc',
      description: `The radial menu is the playful action launcher where tapping a central button makes its options spring outward along a circular arc, each landing at an evenly-spaced position around the trigger. It is compact at rest and delightful in motion. This snippet builds it with plain HTML, CSS, and vanilla JavaScript that places the items with a little trigonometry.

**Positioning items on an arc**

Each action button starts stacked exactly on the trigger and has a precomputed resting position on the arc. For item \`i\`, the angle is \`START + (SPREAD / (count - 1)) * i\`, converted to radians, and the offset is \`(cos(angle) * RADIUS, sin(angle) * RADIUS)\`. That standard polar-to-Cartesian conversion spreads the items evenly across a 180° arc at a fixed radius from the center. Because the angles are computed from constants, you change the fan shape — full circle, quarter arc, different radius — just by editing \`START\`, \`SPREAD\`, and \`RADIUS\`.

**The spring open and close**

Opening toggles an \`.open\` class and, for each item, sets a \`transform\` to its arc offset at full scale; closing returns every item to \`translate(0,0) scale(.2)\` stacked under the trigger. The transition uses an overshooting \`cubic-bezier(.34, 1.4, .5, 1)\`, so the items spring past their target and settle — the bouncy pop that makes a radial menu feel alive rather than mechanical. The trigger itself rotates the \`+\` to a \`×\` (135°) on open as a clear affordance.

**Staggered emergence**

Rather than all items appearing at once, each gets a \`transition-delay\` proportional to its index on open (and reversed on close), so they fan out one after another and fold back in sequence. This small cascade reads as the menu unfurling and is the difference between a cheap reveal and a satisfying one.

**Hover labels**

Each item shows a tooltip label on hover via a small \`.rm-label\` that fades in beneath it, so the icon-only buttons remain understandable. The items only become interactive (\`pointer-events: auto\`) when the menu is open, so the collapsed stack does not intercept clicks.

**Dismissal and accessibility**

The menu closes on a click anywhere else (the trigger stops propagation so opening does not immediately self-close) and on Escape. The trigger carries \`aria-haspopup\` and an \`aria-expanded\` that flips with state, and items are real \`<button>\`s, so the control is keyboard- and screen-reader-aware. Wire each item click to its action by reading from the \`ACTIONS\` data.

**Customizing it**

Edit the \`ACTIONS\` array to change the options, adjust \`START\`/\`SPREAD\`/\`RADIUS\` to reshape the fan (set \`SPREAD\` to 360 for a full ring), retune the spring and stagger, or recolor the trigger and items. Anchor the menu in a corner with a quarter-circle arc for a floating action button. Pair it with a [gooey menu](/ui-snippets/gooey-menu/) or an [expanding fab](/ui-snippets/expanding-fab/) for related launcher patterns.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A single round trigger button renders.` },
      { title: 'Click the trigger', text: `Action items spring out along a half-circle arc.` },
      { title: 'Watch the stagger', text: `Items fan out one after another with a bounce.` },
      { title: 'Hover an item', text: `A tooltip label names the action.` },
      { title: 'Dismiss it', text: `Click elsewhere or press Escape to fold it back.` },
      { title: 'Reshape the fan', text: `Edit START, SPREAD, and RADIUS constants.` },
    ] },
    features: [
      { title: 'Trig arc placement', text: `Polar-to-Cartesian spaces items evenly.` },
      { title: 'Configurable fan', text: `START, SPREAD, and RADIUS shape the arc.` },
      { title: 'Spring motion', text: `An overshooting easing pops items out.` },
      { title: 'Staggered cascade', text: `Per-item delays unfurl the menu.` },
      { title: 'Rotating trigger', text: `Plus turns to a close icon on open.` },
      { title: 'Hover labels', text: `Tooltips name the icon-only actions.` },
      { title: 'Click-away and Escape', text: `Standard dismissal.` },
      { title: 'Accessible trigger', text: `aria-haspopup and aria-expanded.` },
    ],
    useCases: [
      { title: 'Floating action buttons', text: 'Offer a radial take on an [expanding FAB](/ui-snippets/expanding-fab/), with options springing outward along a circular arc.' },
      { title: 'Quick action launchers', text: 'Fan out edit, share and delete from a central trigger, with `START`, `SPREAD` and `RADIUS` constants shaping the arc.' },
      { title: 'Canvas and editor tools', text: 'Pair with a [context menu](/ui-snippets/context-menu/) for right-click operations in canvas and editor tools, using trigonometry to space items evenly around the arc.' },
      { title: 'Mobile launchers', text: 'Offer mobile apps a playful cousin of a [gooey menu](/ui-snippets/gooey-menu/), with staggered per-item delays that unfurl the whole menu smoothly.' },
      { title: 'Map and media controls', text: 'Surface controls around a focal point, using an overshooting easing so each item pops out with a spring.' },
      { icon: 'CODE', title: 'Related: Sticky Product Bar', desc: 'See the [Sticky Product Bar](/ui-snippets/sticky-product-bar/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the items spaced evenly on the arc?', a: `Each item gets an angle of START + (SPREAD / (count - 1)) * index, converted to radians, and an offset of cos(angle)*RADIUS, sin(angle)*RADIUS. That polar-to-Cartesian conversion places them evenly across the arc at a fixed radius. Editing START, SPREAD, and RADIUS reshapes the fan into a full circle, a quarter arc, or any radius.` },
      { q: 'What gives the menu its bouncy feel?', a: `Opening sets each item transform to its arc offset at full scale, with a transition using an overshooting cubic-bezier(.34,1.4,.5,1). The curve makes items spring slightly past their target and settle, which is the satisfying pop. Closing returns them to a stacked, scaled-down position under the trigger on the same easing.` },
      { q: 'Why do the items appear one after another?', a: `Each item is given a transition-delay proportional to its index on open, and the order is reversed on close. That stagger makes the items fan out in sequence and fold back in sequence, which reads as the menu unfurling rather than every option blinking in at once.` },
      { q: 'How do the icon-only buttons stay understandable?', a: `Each item has a small label that fades in on hover beneath it, so the action is named when you point at it. The items also only become clickable when the menu is open, via pointer-events, so the collapsed stack under the trigger does not intercept clicks.` },
      { q: 'How do I use this radial menu in React, Vue, or Angular?', a: `Compute each item angle and offset from your actions array in render, and keep an open boolean in state that toggles the transforms and stagger delays via inline styles. Add click-away and Escape handlers in a mount effect with cleanup. The spring CSS ports directly. In Tailwind, apply the transforms and transition with arbitrary values driven by the open state.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the arc placement math and stagger logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the angle formula START plus SPREAD divided by count-minus-one times index spaces items evenly across a half-circle, and why the transitionDelay is set to a different multiplier when opening versus closing. The same assistant can help you optimize it — ask whether recalculating every item's dataset.x and dataset.y on every build is necessary or whether it could be memoized once since ACTIONS never changes, and whether the overshooting cubic-bezier easing could cause items to visually collide mid-animation with a tighter RADIUS. It's also useful for extending the menu: ask it to support a full 360-degree ring instead of a half-arc, add keyboard arrow-key navigation between the fanned-out items, or let the trigger be repositioned to any corner of the screen. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a radial (fan-out) action menu in plain HTML, CSS, and JavaScript with no library — a central trigger button that spreads several action buttons along a circular arc when clicked.

Requirements:
- Compute each action item's resting position with polar-to-Cartesian math: for item index i out of N items, the angle equals a START constant plus (a SPREAD constant divided by (N minus 1)) times i, converted to radians, and the offset equals cos(angle) times RADIUS for x and sin(angle) times RADIUS for y — store these as data attributes on each item at build time.
- Items must start stacked directly on top of the trigger at scale 0.2 and fully transparent, with pointer-events disabled while closed.
- Opening the menu must translate every item to its precomputed (x, y) offset at full scale and opacity, using a CSS transition with an overshooting easing curve (a cubic-bezier with a value greater than 1 in one of its control points) so items spring past their final position slightly before settling.
- Give each item a transition-delay proportional to its index so items fan out one after another in sequence on open, and reverse that stagger order on close so they fold back in the opposite sequence.
- The trigger icon itself must rotate (e.g. from a plus to an X shape, via a rotate transform) to indicate open/closed state.
- Close the menu when clicking anywhere outside it or pressing Escape, and make sure clicking the trigger itself does not immediately re-trigger the outside-click handler in the same event.
- Add aria-haspopup and a toggling aria-expanded attribute on the trigger, and implement every action as a real button element so it is keyboard and screen-reader accessible, with a small tooltip label appearing on hover since the buttons are icon-only.`,
    },
  },
};

export default radialMenu;
