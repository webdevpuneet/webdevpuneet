const iconGridNeighborPull = {
  id: 'icon-grid-neighbor-pull',
  title: 'Icon Grid Neighbor Pull',
  category: 'animations',
  html: `<div class="ng-stage">
  <p class="ng-hint">Hover any icon — it pulls its nearest neighbors toward itself</p>
  <div class="ng-grid" id="ngGrid">
    <button class="ng-icon" data-label="Home">🏠</button>
    <button class="ng-icon" data-label="Search">🔍</button>
    <button class="ng-icon" data-label="Heart">❤️</button>
    <button class="ng-icon" data-label="Star">⭐</button>
    <button class="ng-icon" data-label="Bell">🔔</button>
    <button class="ng-icon" data-label="Mail">✉️</button>
    <button class="ng-icon" data-label="Camera">📷</button>
    <button class="ng-icon" data-label="Music">🎵</button>
    <button class="ng-icon" data-label="Gift">🎁</button>
    <button class="ng-icon" data-label="Settings">⚙️</button>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0b0f1a; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.ng-stage { display: flex; flex-direction: column; align-items: center; gap: 28px; padding: 24px; }
.ng-hint { font-size: 13px; color: #64748b; text-align: center; max-width: 320px; }

.ng-grid {
  display: grid;
  grid-template-columns: repeat(5, 56px);
  gap: 18px;
}

.ng-icon {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: #161d2e;
  border: 1px solid #263047;
  font-size: 22px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  will-change: transform;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s, transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.ng-icon:hover { background: #1c2540; border-color: #6366f1; box-shadow: 0 8px 24px rgba(99,102,241,0.35); z-index: 2; }`,
  js: `// Hovering one icon pulls every OTHER icon a little toward it, based on how
// close each neighbor's grid position is to the hovered one — this is a
// neighbor-to-neighbor attraction, not a cursor-to-dot field like a magnetic
// grid of dots. Distance is measured in actual layout pixels via
// getBoundingClientRect, and closer neighbors move proportionally more.
var icons = Array.prototype.slice.call(document.querySelectorAll('.ng-icon'));
var MAX_REACH = 170;   // neighbors farther than this (px) are unaffected
var MAX_PULL = 14;     // max pixels a fully-adjacent neighbor moves

function centers() {
  return icons.map(function (el) {
    var r = el.getBoundingClientRect();
    return { el: el, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  });
}

icons.forEach(function (icon) {
  icon.addEventListener('mouseenter', function () {
    var pts = centers();
    var hovered = pts.find(function (p) { return p.el === icon; });

    pts.forEach(function (p) {
      if (p.el === icon) {
        p.el.style.transform = 'scale(1.12)';
        return;
      }
      var dx = hovered.cx - p.cx;
      var dy = hovered.cy - p.cy;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > MAX_REACH || dist === 0) {
        p.el.style.transform = 'scale(1)';
        return;
      }
      var falloff = 1 - dist / MAX_REACH; // 1 = adjacent, 0 = at max reach
      var pull = falloff * MAX_PULL;
      var ux = dx / dist, uy = dy / dist;
      p.el.style.transform = 'translate(' + (ux * pull).toFixed(2) + 'px,' + (uy * pull).toFixed(2) + 'px)';
    });
  });

  icon.addEventListener('mouseleave', function () {
    icons.forEach(function (el) { el.style.transform = 'translate(0,0) scale(1)'; });
  });
});`,

  seo: {
    title: 'Icon Grid Neighbor Pull — Hover Attraction Snippet',
    description: 'Hovering one icon in a grid pulls its nearest neighbors toward it with distance-based falloff, computed from real layout positions via getBoundingClientRect. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Icon Grid Neighbor Pull — Distance-Falloff Attraction Between Sibling Icons on Hover',
      description: `This effect makes a grid of icons feel like a connected surface rather than a flat list: hovering one icon doesn't just style itself, it visibly pulls its nearest neighbors a few pixels toward it, with the pull strength fading out for icons farther away. It's a different mechanism from a [magnetic grid](/ui-snippets/magnetic-grid/) of dots that follow the live cursor position on every mousemove — here the pull is triggered once per icon-to-icon hover and computed between sibling elements, not between the cursor and a field of points.

**Measuring real positions, not grid math**

Instead of inferring neighbor distance from row/column indices, the script reads every icon's actual center point with \`getBoundingClientRect()\` inside a \`centers()\` helper. This matters because it means the effect works correctly even if the grid isn't perfectly uniform — irregular gaps, responsive reflow, or a non-square layout all still produce geometrically correct pull directions and distances.

**The falloff formula**

For every icon other than the one being hovered, the vector to the hovered icon's center is \`dx, dy\`, and \`dist = Math.sqrt(dx*dx + dy*dy)\` is the Euclidean distance in pixels. Anything beyond \`MAX_REACH\` (170px) doesn't move at all. Within that range, \`falloff = 1 - dist / MAX_REACH\` scales linearly from \`1\` (touching the hovered icon) down to \`0\` (right at the reach boundary), and the final pull distance is \`falloff * MAX_PULL\`.

**Applying the pull as a unit vector**

\`ux = dx / dist\` and \`uy = dy / dist\` normalize the direction vector to length 1, so multiplying by \`pull\` gives a translation of exactly the right magnitude in exactly the right direction — every affected neighbor slides directly toward the hovered icon's center, not toward some averaged or fixed direction.

**The hovered icon itself**

The icon under the cursor doesn't translate — translating it would fight with the neighbors moving toward its own position. Instead it scales up slightly (\`scale(1.12)\`) to read clearly as the "source" of the attraction, while everything else visibly responds to it.

**The spring-like release**

On \`mouseleave\`, every icon resets to \`translate(0,0) scale(1)\`. The transition includes \`cubic-bezier(0.34, 1.56, 0.64, 1)\` — a curve with a controlled overshoot past 1, so the release has a small bounce rather than a flat linear return, which reinforces the tactile, elastic feel of the whole interaction.

**Tuning it**

Increase \`MAX_REACH\` to make more distant icons react; increase \`MAX_PULL\` for a more dramatic pull. For a denser grid, a smaller \`MAX_REACH\` keeps the effect localized to true immediate neighbors instead of pulling the whole grid inward on every hover.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover any icon in the grid', text: 'Move your cursor over one icon and watch its nearest neighbors slide slightly toward it, with farther icons barely moving.' },
        { title: 'Move to a different icon', text: 'Move directly between icons — the pull recalculates on each mouseenter based on the newly hovered icon\'s position.' },
        { title: 'Adjust the reach', text: 'In the JS panel, change MAX_REACH to control how far the attraction extends before falling to zero.' },
        { title: 'Adjust the pull strength', text: 'Change MAX_PULL to control the maximum pixel distance an adjacent neighbor moves.' },
        { title: 'Swap in your own icons', text: 'Replace the emoji or add SVG icons inside each .ng-icon button — the pull logic reads only positions, not content.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Neighbor-to-neighbor attraction — triggered by icon hover, not continuous cursor tracking',
      'getBoundingClientRect gives real center positions, correct even on irregular grids',
      'Linear distance falloff — closer neighbors pull harder, distant ones are unaffected',
      'Unit-vector normalization applies pull magnitude in the exact correct direction',
      'Hovered icon scales up instead of translating, reading clearly as the attraction source',
      'Overshoot cubic-bezier release gives a subtle elastic bounce back to rest',
      'Configurable MAX_REACH and MAX_PULL constants for reach and intensity',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP', title: 'Social/emoji reaction pickers', desc: 'A reaction or emoji picker grid feels more alive when hovering one option visibly draws its neighbors closer, hinting at a connected, fluid surface.' },
      { icon: 'DESIGN', title: 'App launcher and dashboard icon grids', desc: 'Use on a dashboard shortcut grid or app launcher to add a layer of tactile polish beyond a flat hover color change.' },
      { icon: 'LEARN', title: 'Learn vector normalization and falloff math', desc: 'A clean, small example of unit-vector direction plus linear distance falloff — patterns reused across particle systems, magnetic effects, and physics UIs.' },
      { icon: 'FLOW', title: 'Onboarding feature icon showcases', desc: 'Draw attention to a set of feature icons during onboarding — the neighbor pull creates a sense of connectedness between related features.' },
      { icon: 'STAR', title: 'Social proof / skill icon rows', desc: 'A row of tech-stack or skill icons on a portfolio site becomes more engaging with this hover behavior than a static row.' },
      { icon: 'CODE', title: 'Related: Magnetic Grid', desc: 'See the [Magnetic Grid](/ui-snippets/magnetic-grid/) for the cursor-to-field version of an attraction effect, which continuously tracks mousemove instead of triggering per hovered element.' },
    ],
    faqs: [
      { q: 'How is this different from the Magnetic Grid snippet?', a: 'Magnetic Grid continuously tracks the live cursor position against a dense field of dots on every mousemove. This snippet instead triggers once per icon on mouseenter/mouseleave and pulls sibling icons toward each other based on their own measured positions — an element-to-element attraction, not a cursor-to-field one.' },
      { q: 'How is neighbor distance calculated?', a: 'Every icon\'s center point is read with getBoundingClientRect() inside the centers() helper. The Euclidean distance between the hovered icon\'s center and every other icon\'s center determines whether and how much that icon moves.' },
      { q: 'Why does the hovered icon scale instead of move?', a: 'If the hovered icon also translated toward its own gravitational center, the motion would look confusing or self-cancelling. Scaling it up instead cleanly signals "this is the source" while every other icon visibly responds by moving toward it.' },
      { q: 'Does this work if the grid is not perfectly square?', a: 'Yes. Because distances come from actual rendered positions via getBoundingClientRect rather than assumed row/column math, the effect adapts correctly to any grid layout, including irregular gaps or a responsive reflow.' },
      { q: 'How do I make only the immediate 4-8 neighbors react?', a: 'Lower MAX_REACH so it is just larger than the pixel distance between adjacent grid cells — icons further than one or two cells away will then fall outside the falloff range and stay still.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Keep an array of refs to each icon element, compute positions inside the onMouseEnter handler for a given icon, and apply the resulting transform directly to each ref\'s style to avoid unnecessary re-renders.' },
    ],
    aiPrompt: {
      paragraph: `You don't need to re-derive the geometry from scratch. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the pull direction is computed as a normalized unit vector rather than just scaling dx and dy directly, and why MAX_REACH is measured in real pixels from getBoundingClientRect instead of counting grid cells. The same assistant can help optimize it — for instance asking whether recomputing centers() on every mouseenter is wasteful for a very large grid, and whether caching positions and only invalidating on resize would be more efficient. It's also useful for extending the effect: ask it to make the pull also apply a subtle rotation toward the hovered icon, add a repulsion mode where neighbors push away instead of toward, or combine this with the jelly press button's spring physics for an even bouncier neighbor response. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "icon grid neighbor pull" hover effect in plain HTML, CSS, and JavaScript with no libraries.

Requirements:
- A grid of icon buttons (at least 8-10) laid out with CSS grid.
- On mouseenter of any one icon, every OTHER icon in the grid must translate a small distance toward the hovered icon's position, with the pull strength falling off linearly based on real measured distance — icons very close to the hovered one move the most, icons beyond a maximum reach distance do not move at all.
- Distances and directions must be computed from actual rendered positions using getBoundingClientRect on every icon (not assumed from row/column index math), so the effect stays geometrically correct even if the grid layout is irregular or reflows responsively.
- The pull direction for each affected neighbor must be a normalized unit vector toward the hovered icon's center, scaled by the falloff-adjusted pull distance, applied via a CSS transform: translate.
- The hovered icon itself should NOT translate toward its own center — give it a distinct visual treatment instead (such as scaling up slightly) so it reads clearly as the source of the attraction.
- On mouseleave of the icon, all icons must animate back to their neutral position and scale using a CSS transition with a slight overshoot easing curve (a cubic-bezier with a value above 1, like cubic-bezier(0.34, 1.56, 0.64, 1)) so the release has a small elastic bounce.
- Expose the maximum reach distance and maximum pull distance as easily tunable constants near the top of the script.`,
    },
  },
};

export default iconGridNeighborPull;
