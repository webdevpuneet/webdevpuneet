const imageReorderGrid = {
  id: 'image-reorder-grid',
  title: 'Image Reorder Grid',
  lastmod: '2026-06-20',
  category: 'layouts',
  html: `<div class="irg-card">
  <div class="irg-head">
    <h3>Product photos</h3>
    <span>Drag to reorder · first photo is the cover</span>
  </div>
  <div class="irg-grid" id="irgGrid"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.irg-card{background:#fff;border-radius:18px;padding:20px;width:100%;max-width:460px;box-shadow:0 18px 44px rgba(15,23,42,.1)}
.irg-head{margin-bottom:14px}
.irg-head h3{font-size:15px;font-weight:800;color:#0f172a;margin-bottom:3px}
.irg-head span{font-size:11.5px;color:#94a3b8;font-weight:600}

.irg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
.irg-item{position:relative;aspect-ratio:1;border-radius:12px;overflow:hidden;cursor:grab;background:linear-gradient(135deg,var(--c1),var(--c2));
  display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;font-weight:800;
  transition:transform .15s,box-shadow .15s,opacity .15s;user-select:none}
.irg-item:active{cursor:grabbing}
.irg-item.dragging{opacity:.35;transform:scale(.95)}
.irg-item.drag-over{box-shadow:inset 0 0 0 3px #6366f1}
.irg-item.cover{box-shadow:0 0 0 3px #f59e0b}

.irg-badge{position:absolute;top:6px;left:6px;background:rgba(15,23,42,.55);color:#fff;font-size:10px;font-weight:800;
  border-radius:6px;padding:2px 6px;backdrop-filter:blur(2px)}
.irg-cover-tag{position:absolute;bottom:6px;left:6px;right:6px;background:#f59e0b;color:#fff;font-size:9.5px;font-weight:800;
  text-align:center;border-radius:5px;padding:2px 0;text-transform:uppercase;letter-spacing:.04em}`,

  js: `var PHOTOS = [
  { id: 1, label: 'A', c1: '#6366f1', c2: '#8b5cf6' },
  { id: 2, label: 'B', c1: '#22c55e', c2: '#10b981' },
  { id: 3, label: 'C', c1: '#f59e0b', c2: '#f97316' },
  { id: 4, label: 'D', c1: '#ec4899', c2: '#db2777' },
  { id: 5, label: 'E', c1: '#0ea5e9', c2: '#0284c7' },
  { id: 6, label: 'F', c1: '#a855f7', c2: '#9333ea' },
];

var grid = document.getElementById('irgGrid');
var dragIndex = null;

function render() {
  grid.innerHTML = PHOTOS.map(function (p, i) {
    return '<div class="irg-item' + (i === 0 ? ' cover' : '') + '" draggable="true" data-i="' + i + '" style="--c1:' + p.c1 + ';--c2:' + p.c2 + '">' +
      '<span class="irg-badge">' + (i + 1) + '</span>' +
      p.label +
      (i === 0 ? '<span class="irg-cover-tag">Cover</span>' : '') +
    '</div>';
  }).join('');
  attachHandlers();
}

function attachHandlers() {
  var items = grid.querySelectorAll('.irg-item');
  items.forEach(function (item) {
    item.addEventListener('dragstart', function () {
      dragIndex = +item.dataset.i;
      item.classList.add('dragging');
    });
    item.addEventListener('dragend', function () {
      item.classList.remove('dragging');
      items.forEach(function (i) { i.classList.remove('drag-over'); });
    });
    item.addEventListener('dragover', function (e) {
      e.preventDefault();
      item.classList.add('drag-over');
    });
    item.addEventListener('dragleave', function () {
      item.classList.remove('drag-over');
    });
    item.addEventListener('drop', function (e) {
      e.preventDefault();
      var dropIndex = +item.dataset.i;
      if (dragIndex === null || dragIndex === dropIndex) return;
      var moved = PHOTOS.splice(dragIndex, 1)[0];
      PHOTOS.splice(dropIndex, 0, moved);
      dragIndex = null;
      render();
    });
  });
}

render();`,

  seo: {
    title: 'Image Reorder Grid — Drag-and-Drop Photo Order',
    description: `A drag-and-drop image grid where the first tile is the auto-labeled cover photo, reordered with the native HTML5 Drag and Drop API. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Image Reorder Grid — Native Drag-and-Drop Reordering with a Live Cover Tile',
      description: `Every product, gallery, or media-management UI eventually needs the same control: a grid of images a user can physically drag into a new order, with the first slot understood as "the cover" or "the primary" image. This snippet builds that exact pattern using the browser's native HTML5 Drag and Drop API — no external sorting library — with a live-updating cover badge and order numbers.

**Native drag-and-drop, not a library**

Every tile is a real \`draggable="true"\` element wired to the five native drag events: \`dragstart\` (marks the dragged item and records its index), \`dragover\` (calls \`preventDefault()\`, which is required for \`drop\` to fire at all, and highlights the hovered target), \`dragleave\` (clears that highlight), and \`drop\` (performs the actual reorder). This is the same API every framework-agnostic drag library wraps under the hood — using it directly here keeps the snippet dependency-free and easy to port.

**The reorder itself is two array operations**

On drop, \`PHOTOS.splice(dragIndex, 1)[0]\` removes the dragged photo from its old position and returns it, and \`PHOTOS.splice(dropIndex, 0, moved)\` reinserts it at the new position — the standard "remove then insert" pattern for moving an item within an array. The whole grid then re-renders from the mutated array, so the DOM never needs to be manually shuffled; it simply reflects whatever order \`PHOTOS\` is currently in.

**The cover photo is a position, not a flag**

Rather than storing a separate \`isCover: true/false\` field that could drift out of sync with the actual order, "being the cover" is derived purely from array position: whichever photo is at index 0 gets the \`.cover\` class, the amber ring, and the "Cover" tag, recomputed fresh on every render. Drag any other photo into the first slot and it instantly *becomes* the cover — there's no separate "set as cover" action to remember to use.

**Visual feedback during the drag**

The dragged tile fades to 35% opacity and shrinks slightly via \`.dragging\`, so it's visually clear which tile is in motion without it disappearing entirely (which would make it hard to track), and the tile currently being hovered over gets an inset indigo ring via \`.drag-over\`, showing exactly where the drop will land before the user releases.

**Why drag-and-drop beats numbered inputs**

An older pattern for photo ordering asks users to type a position number into each thumbnail — technically equivalent, but it asks people to do arithmetic about their own intent ("this should be 3rd, so the others shift down") instead of just performing the action they're thinking of. Dragging a tile to where it visually belongs maps directly to the mental model, which is why every modern photo-managing interface has converged on it over manual position fields.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A 3×2 grid of six colored tiles renders, each numbered, with the first tile marked "Cover" with an amber ring and tag.` },
      { title: 'Drag a tile', text: `Click and hold any tile, then drag it over another — the dragged tile fades and the hovered target shows an indigo ring.` },
      { title: 'Drop to reorder', text: `Release over the target tile — the array reorders, every tile renumbers, and the cover tag follows whichever photo is now first.` },
      { title: 'Drag a different photo to the front', text: `Move any tile into the first slot to make it the new cover — no separate "set as cover" control is needed.` },
      { title: 'Replace the placeholder tiles with real images', text: `Swap each tile's gradient background and letter for an <img> tag, keeping the same drag event wiring.` },
      { title: 'Persist the new order', text: `After a drop, send the reordered PHOTOS array's ids (in order) to your backend so the new sequence and cover photo persist.` },
    ] },
    features: [
      { title: 'Native HTML5 Drag and Drop', text: `Built on the browser's real drag events — no third-party sorting library required.` },
      { title: 'Cover position derived, not stored', text: `Whichever photo sits at index 0 is automatically treated as the cover, so it can never drift out of sync with the actual order.` },
      { title: 'Live order numbers', text: `Every tile shows its current position, renumbering instantly on every successful reorder.` },
      { title: 'Clear drag and drop-target feedback', text: `The dragged tile fades and shrinks while the hovered drop target shows an inset ring, making the interaction state obvious.` },
      { title: 'Simple splice-based reorder logic', text: `The entire reorder is two array operations (remove, then reinsert) — no complex index-shifting math to maintain.` },
      { title: 'Re-render from a single source of truth', text: `The grid always reflects whatever order the PHOTOS array is in — no manual DOM node shuffling.` },
      { title: 'Square, responsive tiles', text: `aspect-ratio:1 keeps every tile square regardless of grid width, ready for real photo thumbnails of any source size.` },
      { title: 'Easy to swap placeholders for real images', text: `Each tile's color/letter placeholder is isolated to one template string, simple to replace with an <img> tag.` },
    ],
    useCases: [
      { title: 'E-commerce product photo management', text: `Let sellers reorder product images and choose the cover photo shown in listings and search results.` },
      { title: 'Portfolio and gallery builders', text: `Reorder a project's image set, with the first image used as its thumbnail elsewhere on the site.` },
      { title: 'CMS media libraries', text: `Reorder a content block's attached images directly in an admin panel.` },
      { title: 'Social media post composers', text: `Let users rearrange multiple photos in a post before publishing, mirroring native app carousel-editing UX.` },
      { title: 'Real estate and listing platforms', text: `Reorder property photos with the first image controlling the listing's main thumbnail.` },
      { title: 'Learning native Drag and Drop API', text: `A clear, dependency-free reference for the five core drag events — compare with a [drag-sort list](/ui-snippets/drag-sort-list/) for a vertical-list variant.` },
      { icon: 'CODE', title: 'Related: Splide Thumbnail Gallery', desc: 'See the [Splide Thumbnail Gallery](/ui-snippets/splide-thumbnail-gallery/) for a related layouts pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do I use real images instead of colored placeholder tiles?', a: `Replace the gradient background and letter in each tile's template string with an <img src="..."> covering the tile (object-fit: cover), keeping the same draggable="true" attribute and the badge/cover-tag overlays positioned absolutely on top of it.` },
      { q: 'How do I persist the new order to a server?', a: `After a successful drop (inside the drop handler, after PHOTOS is reordered and render() is called), send the array of photo ids in their new order to your backend, and store which id is "first" as the designated cover image.` },
      { q: 'How do I support touch/mobile drag-and-drop?', a: `The native HTML5 Drag and Drop API has inconsistent mobile browser support; for mobile, add touchstart/touchmove/touchend handlers that track finger position and manually reorder on a sufficient move, or use a small touch-action-aware drag library as a progressive enhancement layer over the existing desktop drag events.` },
      { q: 'How do I let users delete a photo from the grid?', a: `Add a small "✕" button overlay on each tile that calls PHOTOS.splice(i, 1) for that tile's index and re-renders — be sure to recompute the cover automatically afterward, since it's derived from position rather than stored.` },
      { q: 'How do I use this reorder grid in React, Vue, or Angular?', a: `In React, keep the photos array in useState and call setPhotos with the spliced array on drop, letting React re-render the grid; in Vue, mutate a reactive array directly with the same splice logic; in Angular, use a component array field updated via the same splice calls. The native drag event wiring is identical across frameworks since it's a browser API, not a framework feature.` },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the drag events one by one, hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to explain why calling preventDefault inside the dragover handler is mandatory for the drop event to ever fire, and why deriving the cover photo from array index zero rather than storing a separate isCover flag prevents the two from ever drifting out of sync. The same assistant can help optimize it — ask whether re-rendering the entire grid's innerHTML on every drop is fine for six tiles but would need a smarter diff or key-based update for a much larger photo library. It's also a good way to extend the pattern: ask it to add keyboard-based reordering for accessibility, animate tiles sliding into their new slots instead of snapping, or persist the new order to a backend automatically after each drop with an optimistic UI update. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a drag-and-drop reorderable image grid in plain HTML, CSS, and vanilla JavaScript using only the native HTML5 Drag and Drop API, no external sorting library.

Requirements:
- Maintain a single array of photo objects as the source of truth, and re-render the entire grid from that array on every change rather than manually moving DOM nodes.
- Every grid tile must have the draggable attribute set to true and wire up all five relevant native drag events: dragstart (record which array index is being dragged and mark that tile with a dragging visual state), dragover (call preventDefault, since this is required for the drop event to fire at all, and mark the currently hovered tile with a drag-over visual state), dragleave (clear that hover state), and drop (perform the actual reorder and re-render).
- The reorder logic on drop must remove the dragged item from its old array index and reinsert it at the dropped-on index using two array splice calls, not a full manual rebuild of the array.
- The first item in the array must always be visually treated as the cover or primary photo (a distinct border color and a text badge), computed fresh from array position on every render rather than stored as a separate flag on each photo object, so dragging any other photo into the first slot instantly makes it the new cover with no separate action required.
- Every tile must display its current 1-based position number, updating immediately after any successful reorder.
- The dragged tile must visibly fade in opacity and shrink slightly while being dragged, and the currently hovered drop target must show a distinct inset ring or border, so the user always has clear visual feedback about what is moving and where it will land.`,
    },
  },
};

export default imageReorderGrid;
