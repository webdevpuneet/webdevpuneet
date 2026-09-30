const avatarStackFanExpand = {
  id: 'avatar-stack-fan-expand',
  title: 'Avatar Stack Fan Expand',
  category: 'animations',
  html: `<div class="fe-stage">
  <p class="fe-hint">Hover any avatar — the whole stack fans apart around it</p>
  <div class="fe-stack" id="feStack"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.fe-stage { display: flex; flex-direction: column; align-items: center; gap: 28px; padding: 24px; }
.fe-hint { font-size: 13px; color: #64748b; text-align: center; max-width: 320px; }

.fe-stack { display: flex; padding: 10px 0; }

.fe-avatar {
  width: 48px; height: 48px;
  border-radius: 50%;
  border: 3px solid #fff;
  margin-left: -16px;
  display: flex; align-items: center; justify-content: center;
  font-size: 14px; font-weight: 800; color: #fff;
  box-shadow: 0 2px 8px rgba(15,23,42,0.15);
  cursor: pointer;
  position: relative;
  will-change: transform;
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), z-index 0s, margin-left 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.fe-stack .fe-avatar:first-child { margin-left: 0; }`,
  js: `// Hovering one avatar doesn't just lift itself — every OTHER avatar in the
// stack physically slides away from it, proportional to how close it sits in
// the stack order, so the whole row visibly "fans open" around the hovered
// member instead of only reacting locally.
var PEOPLE = [
  { initials: 'AC', c: '#6366f1' },
  { initials: 'MR', c: '#16a34a' },
  { initials: 'PS', c: '#d97706' },
  { initials: 'DA', c: '#dc2626' },
  { initials: 'SM', c: '#7c3aed' },
  { initials: 'LO', c: '#0891b2' },
  { initials: 'KT', c: '#db2777' },
];

var stack = document.getElementById('feStack');
var SPREAD = 20; // px each step of distance pushes a neighbor further out

PEOPLE.forEach(function (p, i) {
  var el = document.createElement('div');
  el.className = 'fe-avatar';
  el.style.background = p.c;
  el.style.zIndex = String(PEOPLE.length - i);
  el.textContent = p.initials;
  el.dataset.index = String(i);
  stack.appendChild(el);
});

var avatars = Array.prototype.slice.call(stack.querySelectorAll('.fe-avatar'));

avatars.forEach(function (el, i) {
  el.addEventListener('mouseenter', function () {
    el.style.zIndex = String(PEOPLE.length + 1);
    avatars.forEach(function (other, j) {
      if (j === i) {
        other.style.transform = 'translateY(-10px) scale(1.12)';
        return;
      }
      var delta = j - i; // negative = to the left, positive = to the right
      var dir = delta < 0 ? -1 : 1;
      var offset = dir * SPREAD * (1 + (Math.abs(delta) - 1) * 0.4);
      other.style.transform = 'translateX(' + offset.toFixed(1) + 'px)';
    });
  });

  el.addEventListener('mouseleave', function () {
    el.style.zIndex = String(PEOPLE.length - i);
    avatars.forEach(function (other) {
      other.style.transform = 'translateX(0) translateY(0) scale(1)';
    });
  });
});`,

  seo: {
    title: 'Avatar Stack Fan Expand — Hover Group Animation Snippet',
    description: 'Overlapping avatar stack where hovering one member pushes every other avatar apart proportionally to its distance in the stack, fanning the whole group open. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Avatar Stack Fan Expand — Proportional Neighbor Displacement on Single-Avatar Hover',
      description: `A standard [overlapping avatar stack](/ui-snippets/avatar-stack/) lifts only the single avatar under the cursor, leaving its overlapping neighbors untouched underneath it. This variant treats the whole stack as one connected group: hovering any single avatar pushes every other avatar apart, with avatars farther along the stack order moving proportionally further, so the entire row visibly fans open around whichever member is highlighted rather than just popping one circle forward.

**Building the stack from data**

An array of \`PEOPLE\` objects (initials and a color) is rendered into \`.fe-avatar\` elements appended to the stack container, each stamped with a \`data-index\` and a descending inline \`z-index\` so earlier avatars sit visually on top of later ones at rest — matching the usual overlapping-circle stack look.

**The displacement formula**

On \`mouseenter\` of avatar at index \`i\`, every other avatar at index \`j\` computes \`delta = j - i\` — how far away it sits in the stack order, and in which direction. The direction is just the sign of \`delta\`. The push distance is \`SPREAD * (1 + (Math.abs(delta) - 1) * 0.4)\` — so the immediate neighbor moves by roughly \`SPREAD\` pixels, and each avatar one step further out moves progressively more (a 40% increase per extra step), which is what makes the fan read as opening from a single point rather than every avatar sliding by the exact same fixed amount.

**The hovered avatar's own treatment**

The avatar actually under the cursor doesn't translate horizontally with the rest — it lifts vertically (\`translateY(-10px)\`) and scales up slightly, both to distinguish it as the interaction's focus and to avoid it fighting visually with neighbors sliding away from directly underneath it. Its \`z-index\` is also bumped above every other avatar so it renders on top regardless of its original stack position.

**Resetting the fan**

On \`mouseleave\`, every avatar's transform resets to \`translateX(0) translateY(0) scale(1)\` and the hovered avatar's \`z-index\` returns to its original stack-order value. The \`cubic-bezier(0.34, 1.56, 0.64, 1)\` transition applied to \`transform\` (and to \`margin-left\`, in case you also adjust overlap on hover) includes overshoot, giving both the fan-out and the collapse-back a small elastic snap.

**Tuning the spread**

Increase \`SPREAD\` for a wider fan; decrease the \`0.4\` multiplier in the offset formula to make the fan-out distance grow more evenly across the stack instead of accelerating toward the outer edges.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover any avatar', text: 'Move your cursor over any circle in the stack — every other avatar slides apart from it, with farther ones moving proportionally more.' },
        { title: 'Move between avatars', text: 'Hover a different avatar and the fan recalculates instantly around the new hovered member.' },
        { title: 'Move the cursor away', text: 'Leave the stack and every avatar springs back to its overlapping resting position.' },
        { title: 'Edit the people list', text: 'Update the PEOPLE array in the JS panel — initials, colors, and count all drive the rendered avatars automatically.' },
        { title: 'Adjust the fan width', text: 'Change the SPREAD constant and the 0.4 growth multiplier in the offset formula to control how wide the fan opens.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Hovering one avatar displaces every other avatar, not just the hovered one',
      'Push distance grows proportionally with stack-order distance from the hovered avatar',
      'Hovered avatar lifts and scales instead of sliding horizontally like its neighbors',
      'z-index dynamically promoted on hover so the focused avatar always renders on top',
      'Overshoot cubic-bezier transition gives the fan-out and collapse an elastic snap',
      'Stack rendered entirely from a data array — add or remove members with no HTML edits',
      'Direction-aware displacement — avatars to the left push left, avatars to the right push right',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP', title: 'Team and collaborator lists', desc: 'Show who is working on a document or project. Fanning the stack open on hover makes it easy to individually inspect each collaborator, unlike a static [avatar stack](/ui-snippets/avatar-stack/) alone.' },
      { icon: 'CARD', title: 'Reviewer and approver rows', desc: 'On an approval workflow card, fan open the reviewer stack on hover so each reviewer\'s avatar is momentarily easier to click or inspect individually.' },
      { icon: 'LEARN', title: 'Learn proportional group displacement', desc: 'A compact example of computing per-element offsets based on relative position to a single "source" element — a pattern reusable for menus, carousels, and dock-style navigation.' },
      { icon: 'STAR', title: 'Testimonial / social proof avatar rows', desc: 'A row of customer avatars on a landing page becomes more interactive and inviting to explore with the fan-expand hover treatment.' },
      { icon: 'FLOW', title: 'Live collaboration presence indicators', desc: 'Pair with [avatar stack tooltip](/ui-snippets/avatar-stack-tooltip/) to fan the stack open and reveal each member\'s tooltip individually as the cursor moves across the group.' },
      { icon: 'CODE', title: 'Related: Icon Grid Neighbor Pull', desc: 'See the [Icon Grid Neighbor Pull](/ui-snippets/icon-grid-neighbor-pull/) snippet for the opposite interaction — hovering one element attracts its neighbors instead of pushing them apart.' },
      { icon: 'CODE', title: 'Related: Elastic Spring Toggle Switch', desc: 'See the [Elastic Spring Toggle Switch](/ui-snippets/elastic-toggle-switch-spring/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does an avatar know how far to move?', a: 'On hover, every non-hovered avatar computes delta = its own index minus the hovered avatar\'s index. The push distance is SPREAD * (1 + (Math.abs(delta) - 1) * 0.4) — so the immediate neighbor moves roughly SPREAD pixels, and each avatar further along the stack order moves progressively more.' },
      { q: 'Why does the hovered avatar move differently from the others?', a: 'The hovered avatar lifts vertically and scales up rather than sliding horizontally, so it reads clearly as the focus of the interaction rather than competing visually with the neighbors sliding away underneath it.' },
      { q: 'How is stacking order (z-index) handled during the hover?', a: 'At rest, earlier avatars in the PEOPLE array have a higher z-index so they overlap later ones, matching the standard stacked-avatar look. On hover, the hovered avatar\'s z-index is temporarily bumped above every other avatar so it always renders on top regardless of its position in the array.' },
      { q: 'Can I make the fan open vertically instead of horizontally?', a: 'Yes. Swap the translateX offset calculation for a translateY offset (and adjust the base stack layout from flex-row to flex-column) to fan the avatars open in a vertical list instead of a horizontal row.' },
      { q: 'How do I add or remove people from the stack?', a: 'Edit the PEOPLE array in the JS panel — each object needs initials and a color. The render loop and hover logic both read directly from this array, so no other code needs to change.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Store PEOPLE in state or props, render one element per person with a ref array, and compute the same delta-based offset inside onMouseEnter, applying the resulting transform to each ref rather than triggering a state update per frame.' },
    ],
    aiPrompt: {
      paragraph: `You don't have to design the displacement curve from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the offset formula uses (Math.abs(delta) - 1) * 0.4 rather than a flat SPREAD * delta, and what visual difference that non-linear growth makes compared to a purely linear fan. The same assistant can help optimize it — for instance asking whether recalculating every avatar's transform on every mouseenter is cheap enough for a stack of 20+ members, or whether it should be throttled. It's also useful for extending the effect: ask it to make the fan also happen on keyboard focus for accessibility, add a subtle rotation to each fanned avatar based on its direction, or combine this with the jelly press button's spring physics for a bouncier fan-out. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "avatar stack fan expand" hover effect in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- An overlapping row of circular avatar elements (negative margin-left so each one overlaps the previous), rendered from a JavaScript array of person data (initials and a color) rather than hardcoded HTML for each avatar.
- On mouseenter of any one avatar, every OTHER avatar in the stack must translate horizontally away from it — avatars to its left move further left, avatars to its right move further right — with the displacement distance growing the farther an avatar sits (in stack order) from the hovered one, not a uniform fixed distance for every neighbor.
- The hovered avatar itself must not slide horizontally with the others; give it a distinct visual treatment instead, such as lifting vertically and scaling up slightly, and temporarily raise its z-index above all other avatars so it renders on top regardless of its position in the stack order.
- On mouseleave, all avatars must animate back to their neutral overlapping position and the hovered avatar's z-index must return to its original stack-order-based value.
- Use a CSS transition with an overshoot easing curve (a cubic-bezier with a control point above 1) on the transform property so both the fan-out and the collapse-back have a small elastic quality.
- Keep the avatar data and rendering data-driven: adding or removing a person from the source array should automatically update the rendered stack and the hover math with no other code changes.`,
    },
  },
};

export default avatarStackFanExpand;
