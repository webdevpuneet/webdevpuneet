const orbitCarousel = {
  id: 'orbit-carousel',
  title: 'Orbit Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="obc-stage">
  <div class="obc-center" id="obcCenter">
    <span id="obcCenterIcon">🎧</span>
  </div>
  <div class="obc-orbit" id="obcOrbit">
    <div class="obc-sat" data-i="0"><span>📷</span></div>
    <div class="obc-sat" data-i="1"><span>⌚</span></div>
    <div class="obc-sat" data-i="2"><span>🎮</span></div>
    <div class="obc-sat" data-i="3"><span>🔊</span></div>
    <div class="obc-sat" data-i="4"><span>💻</span></div>
  </div>
  <div class="obc-label" id="obcLabel">Headphones</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.obc-stage{position:relative;width:300px;height:300px;display:flex;align-items:center;justify-content:center}
.obc-center{position:absolute;width:96px;height:96px;border-radius:50%;background:linear-gradient(160deg,#6366f1,#4338ca);display:flex;align-items:center;justify-content:center;font-size:40px;box-shadow:0 0 0 8px rgba(99,102,241,.14),0 16px 34px rgba(0,0,0,.5);z-index:2;transition:background .3s}
.obc-orbit{position:absolute;inset:0}
.obc-sat{position:absolute;top:50%;left:50%;width:46px;height:46px;margin:-23px 0 0 -23px;border-radius:50%;background:#161c2c;border:1.5px solid #2a3348;display:flex;align-items:center;justify-content:center;font-size:20px;cursor:pointer;transition:transform .6s cubic-bezier(.65,0,.35,1),background .2s,border-color .2s}
.obc-sat:hover{background:#232c42;border-color:#6366f1}
.obc-label{position:absolute;bottom:-36px;color:#fff;font-size:14px;font-weight:800}`,

  js: `var ITEMS = ['Headphones', 'Camera', 'Watch', 'Console', 'Speaker', 'Laptop'];
var ICONS = ['🎧', '📷', '⌚', '🎮', '🔊', '💻'];
var center = document.getElementById('obcCenter');
var centerIcon = document.getElementById('obcCenterIcon');
var label = document.getElementById('obcLabel');
var sats = document.querySelectorAll('.obc-sat');
var radius = 130;
var centerIndex = 0;

// Build the order of satellite indices (everyone except the current center)
function satelliteOrder() {
  var order = [];
  for (var i = 0; i < ICONS.length; i++) if (i !== centerIndex) order.push(i);
  return order;
}

function layout() {
  var order = satelliteOrder();
  sats.forEach(function (sat, slot) {
    var itemIndex = order[slot];
    var angle = (360 / order.length) * slot - 90;
    var rad = angle * Math.PI / 180;
    var x = Math.cos(rad) * radius;
    var y = Math.sin(rad) * radius;
    sat.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    sat.querySelector('span').textContent = ICONS[itemIndex];
    sat.dataset.item = itemIndex;
  });
  centerIcon.textContent = ICONS[centerIndex];
  label.textContent = ITEMS[centerIndex];
}

sats.forEach(function (sat) {
  sat.addEventListener('click', function () {
    centerIndex = parseInt(sat.dataset.item, 10);
    layout();
  });
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { centerIndex = (centerIndex + 1) % ICONS.length; layout(); }
  else if (e.key === 'ArrowLeft') { centerIndex = (centerIndex - 1 + ICONS.length) % ICONS.length; layout(); }
});

layout();`,

  seo: {
    title: 'Orbit Carousel — HTML CSS JS Snippet',
    description: 'A large fixed center item with smaller satellites orbiting around it — click any satellite and it swaps into the center while the rest re-orbit to fill the gap. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Orbit Carousel — A Fixed Center, Satellites That Re-Flow Around It',
      description: `Unlike the Radial Carousel in this library (which rotates a ring so a *different* item reaches a fixed "front" position), this one keeps the featured item permanently large and centered — clicking any orbiting satellite *swaps* it directly into the center role, and every remaining item re-distributes itself evenly around the new center.\n\n**The satellite list is recomputed, not rotated**\n\nEvery render, \`satelliteOrder()\` builds a fresh array of every item index *except* whichever one is currently the center — so when the center changes, the satellite list genuinely changes membership, not just position. The five (or however many) physical satellite \`<div>\`s in the DOM are then reused as generic "slots": slot 0 always sits at angle \`-90°\` (top) regardless of *which* item currently occupies it, and each slot's icon is simply relabeled to whatever item now belongs there.\n\n**Why the DOM elements are slots, not items**\n\nThis reuse is deliberate: because the same five DOM nodes are always positioned at the same five angles, only their *content* changes when the center swaps — so the CSS \`transition: transform\` on each satellite only ever needs to animate a slot occasionally staying put or shifting to an adjacent angle (since removing one item shifts everyone after it by one slot), never a full re-layout of new elements entering and old ones leaving.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A large "Headphones" icon sits centered, with five smaller satellites orbiting around it.' },
        { title: 'Click any satellite', text: 'It swaps into the center role; the remaining five items redistribute evenly around the new center.' },
        { title: 'Use arrow keys', text: 'Left/Right steps the center through items in order without clicking.' },
        { title: 'Watch the satellites reflow', text: 'Because slots are fixed but membership changes, satellites subtly shift position as items are removed or added to the ring.' },
        { title: 'Add a seventh item', text: 'Add one entry to ITEMS/ICONS and one .obc-sat element — angles recalculate from the live count automatically.' },
      ],
    },
    features: [
      'A permanently large, centered featured item — not a rotating ring, a genuine center/satellite hierarchy',
      'Clicking any satellite swaps it directly into the center, with the rest of the ring redistributing automatically',
      'Trigonometric angle placement recalculated from however many satellites currently exist',
      'DOM elements act as reusable positional slots, so only content (not element count) changes on interaction',
      'Smooth transform transitions as satellites shift to fill the gap left by a promoted item',
      'Arrow key support for stepping the center through items sequentially',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Featured product or category pickers', desc: 'Keep one item prominently large while letting a visitor browse and promote alternatives.' },
      { icon: 'APP',    title: 'Team or org structure visualizations', desc: 'A lead or focal person centered, with related team members orbiting and swappable.' },
      { icon: 'STAR',   title: 'Skill or technology showcases', desc: 'Highlight a primary skill while surrounding it with related ones a visitor can promote instead.' },
      { icon: 'CODE',   title: 'Learning trigonometric layout with dynamic membership', desc: 'A step up from a simple rotating ring — positions recompute as which items belong to the ring changes.' },
    ],
    faqs: [
      { q: 'Why does clicking a satellite feel different from the Radial Carousel snippet?', a: 'The Radial Carousel rotates a fixed ring of items so a different one reaches a "front" position — every item keeps its ring membership. This Orbit Carousel instead changes WHICH items are satellites at all: the clicked one leaves the ring and becomes the center, and the previous center rejoins the ring.' },
      { q: 'How do I change the orbit radius?', a: 'Change the radius constant (in pixels) — layout() derives every satellite\'s x/y position from it and the live satellite count.' },
      { q: 'Can more than 6 total items be supported?', a: 'Yes — extend ITEMS and ICONS together, and add one matching .obc-sat element per new item; the angle spacing (360 / order.length) adapts to any count automatically.' },
      { q: 'Why do satellites sometimes jump position when I click one?', a: 'Because satellite slots are fixed at even angles and membership is recomputed as a plain array each time, removing the clicked item from that array shifts every subsequent item into the previous slot — this is expected and keeps the ring evenly spaced rather than leaving a gap.' },
      { q: 'Is it accessible?', a: 'Each satellite is directly clickable — for full accessibility, convert them to real <button> elements with descriptive aria-labels naming the item they represent, and ensure the center label updates are announced via an aria-live region.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why satelliteOrder() rebuilds the list of non-center items from scratch on every render instead of maintaining a persistent rotation offset like the Radial Carousel does, and what visual behavior that specific design choice produces when an item is promoted to center. It's also worth asking the assistant to add a brief scale/glow animation on the newly-promoted center item, or to make the orbit radius responsive to the viewport width for better mobile behavior.`,
      prompt: `Build an "orbit" carousel in plain HTML, CSS, and vanilla JavaScript where a large item stays fixed and centered while smaller satellite items orbit around it, and clicking a satellite promotes it to the center role — no library.

Requirements:
- A large, visually prominent center element and a fixed number of smaller "satellite" elements, all absolutely positioned within a shared container.
- A single "center index" variable identifying which item from a shared data list currently occupies the center role.
- A function that computes the list of all remaining items (every item except the current center) and assigns them evenly around a circle using trigonometry (sine and cosine) based on however many remaining items there are — the satellite DOM elements must be treated as reusable positional slots, with only their displayed content (icon/label) changing to match whichever item now occupies that slot, rather than destroying and recreating elements.
- Clicking any satellite must promote that specific item to become the new center, causing the previous center item to rejoin the satellite ring, and all satellite positions must recompute and animate smoothly to their new evenly-spaced positions reflecting the changed membership.
- The center element must update its displayed content and always render visually larger and more prominent than any satellite.
- Left/Right arrow key support that steps the center through the full item list sequentially (in either direction) as an alternative to clicking a satellite directly.
- The angular spacing between satellites must be calculated from the actual current satellite count (total items minus one for the center), not hardcoded, so the layout adapts if items are added or removed.`,
    },
  },
};

export default orbitCarousel;
