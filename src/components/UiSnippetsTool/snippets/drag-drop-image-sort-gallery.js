const dragDropImageSortGallery = {
  id: 'drag-drop-image-sort-gallery',
  title: 'Drag & Drop Image Sort Gallery',
  lastmod: '2026-09-05',
  category: 'layouts',
  cdnUrls: [],
  html: `<div class="ig-wrap">
  <h2 class="ig-heading">Gallery — drag to reorder</h2>
  <div class="ig-grid" id="igGrid"></div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f8fafc; min-height: 100vh; padding: 24px; }

.ig-wrap { max-width: 640px; margin: 0 auto; }
.ig-heading { font-size: 16px; font-weight: 800; color: #1e293b; margin-bottom: 14px; }

.ig-grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px;
}
@media (max-width: 520px) {
  .ig-grid { grid-template-columns: repeat(2, 1fr); }
}

.ig-tile {
  position: relative; border-radius: 12px; overflow: hidden; aspect-ratio: 3 / 2;
  cursor: grab; border: 2px solid transparent; transition: border-color 0.12s, opacity 0.15s;
  background: #e2e8f0;
}
.ig-tile:active { cursor: grabbing; }
.ig-tile img { width: 100%; height: 100%; object-fit: cover; display: block; pointer-events: none; }
.ig-tile.ig-dragging { opacity: 0.35; }
.ig-tile.ig-drag-over { border-color: #6366f1; }
.ig-tile-index {
  position: absolute; top: 6px; left: 6px; background: rgba(15,23,42,0.65); color: #fff;
  font-size: 10.5px; font-weight: 800; width: 20px; height: 20px; border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
}`,
  js: `const grid = document.getElementById('igGrid');

const SEEDS = ['sunset', 'forest', 'ocean', 'city', 'mountain', 'desert', 'harbor', 'meadow'];

let images = SEEDS.map((seed, i) => ({
  id: 'img-' + i,
  url: 'https://picsum.photos/seed/' + seed + '/300/200',
}));

let dragId = null;

function renderGrid() {
  grid.innerHTML = '';
  images.forEach((img, i) => {
    const tile = document.createElement('div');
    tile.className = 'ig-tile';
    tile.draggable = true;
    tile.dataset.id = img.id;
    tile.innerHTML = '<span class="ig-tile-index">' + (i + 1) + '</span><img src="' + img.url + '" alt="Gallery image ' + (i + 1) + '" />';

    tile.addEventListener('dragstart', (e) => {
      dragId = img.id;
      e.dataTransfer.setData('text/plain', img.id);
      e.dataTransfer.effectAllowed = 'move';
      setTimeout(() => tile.classList.add('ig-dragging'), 0);
    });

    tile.addEventListener('dragend', () => {
      tile.classList.remove('ig-dragging');
      dragId = null;
      document.querySelectorAll('.ig-tile').forEach((t) => t.classList.remove('ig-drag-over'));
    });

    tile.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (img.id === dragId) return;
      tile.classList.add('ig-drag-over');
    });

    tile.addEventListener('dragleave', () => {
      tile.classList.remove('ig-drag-over');
    });

    tile.addEventListener('drop', (e) => {
      e.preventDefault();
      tile.classList.remove('ig-drag-over');
      const sourceId = e.dataTransfer.getData('text/plain');
      if (!sourceId || sourceId === img.id) return;

      const fromIndex = images.findIndex((im) => im.id === sourceId);
      const toIndex = images.findIndex((im) => im.id === img.id);
      if (fromIndex === -1 || toIndex === -1) return;

      const [moved] = images.splice(fromIndex, 1);
      images.splice(toIndex, 0, moved);
      renderGrid();
    });

    grid.appendChild(tile);
  });
}

renderGrid();`,
  seo: {
    title: 'Drag & Drop Image Sort Gallery — Free HTML CSS JS Snippet',
    description: 'A grid gallery of images that can be reordered by dragging tiles onto each other, built with the native HTML5 drag-and-drop API. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Drag & Drop Image Sort Gallery — Reorderable Grid With HTML5 Drag-and-Drop',
      description: `This snippet is an image gallery grid whose tiles can be reordered by dragging one onto another, implemented with the native HTML5 drag-and-drop API rather than any sorting library.

**Data-driven grid**

An \`images\` array (each entry an id plus a picsum.photos URL) is the single source of truth. \`renderGrid()\` clears the grid container and rebuilds every tile from that array on each render, including a numbered badge in the corner showing the tile's current position.

**Drag events per tile**

Every tile is \`draggable="true"\`. \`dragstart\` records the dragged tile's id both in a module-level \`dragId\` variable and via \`dataTransfer.setData\`, and applies a faded \`.ig-dragging\` class. Each tile also listens for \`dragover\` (calling \`preventDefault()\` to allow dropping, and highlighting itself with \`.ig-drag-over\` unless it's the tile currently being dragged) and \`dragleave\` to remove that highlight when the cursor moves off.

**Swapping positions on drop**

On \`drop\`, the handler reads the source tile's id back out of \`dataTransfer\`, looks up both the source and target index in the \`images\` array, removes the source entry with \`splice\` and reinserts it at the target's index — effectively moving the dragged image to land exactly where it was dropped, shifting everything in between. \`renderGrid()\` then rebuilds the grid so the numbered badges and DOM order both reflect the new sequence.`,
    },
    features: [
      'Native HTML5 drag-and-drop API — draggable, dragstart, dragover, dragleave, drop, dragend',
      'Single images array as the source of truth; the grid fully re-renders from data after every reorder',
      'Numbered position badge on each tile that updates automatically after a reorder',
      'Visual drag-over highlight border on the tile currently being hovered during a drag',
      'Faded opacity on the tile actively being dragged for clear feedback',
      'Responsive grid that collapses from 4 to 2 columns on narrow viewports',
      'Uses picsum.photos seeded URLs so every tile shows a distinct real image',
    ],
    useCases: [
      { icon: '🖼️', title: 'Photo and portfolio galleries', desc: 'Let users curate image order by dragging tiles onto each other, using the native HTML5 drag-and-drop API without any sorting library.' },
      { icon: '🗂️', title: 'CMS media managers', desc: 'Reorder a product\'s image gallery, with a numbered position badge on every tile that updates automatically after each reorder.' },
      { icon: '📚', title: 'Grid drag reordering reference', desc: 'Show how to combine native drag events with a CSS grid, re-rendering the whole grid from one images array after each drop.' },
      { icon: '🎓', title: 'HTML5 drag teaching', desc: 'Teach `dragstart`, `dragover`, `dragleave` and `drop` together, with a visual highlight border on the tile currently being hovered.' },
    ],
    faqs: [
      { q: 'How does dropping one tile onto another reorder the grid?', a: 'The drop handler reads the dragged tile\'s id via dataTransfer, finds both its current index and the target tile\'s index in the images array, then uses Array.splice to remove it from the old position and reinsert it at the new one before re-rendering the grid.' },
      { q: 'Why does the tile check if img.id === dragId before highlighting on dragover?', a: 'It prevents the tile currently being dragged from highlighting itself, since dragover events can still fire on the source element as the cursor passes over it.' },
      { q: 'Can I use my own images instead of picsum.photos?', a: 'Yes, replace the url values in the images array (built from the SEEDS array) with any image URLs — the drag-and-drop and reordering logic works independently of where the image comes from.' },
      { q: 'Does this work on touch devices?', a: 'The native HTML5 drag-and-drop API used here has inconsistent touch support across mobile browsers. For a touch-first version, pointer events with manual position tracking would be needed instead.' },
    ],
  },
};

export default dragDropImageSortGallery;
