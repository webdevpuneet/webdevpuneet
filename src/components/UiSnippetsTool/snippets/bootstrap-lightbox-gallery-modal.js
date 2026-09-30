const bootstrapLightboxGalleryModal = {
  id: 'bootstrap-lightbox-gallery-modal',
  title: 'Bootstrap Image Lightbox Gallery Modal',
  lastmod: '2026-09-09',
  category: 'media',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5">
  <div class="row g-2" id="bslightGrid">
    <div class="col-4"><div class="bslight-thumb" style="--h:230" data-idx="0"></div></div>
    <div class="col-4"><div class="bslight-thumb" style="--h:20" data-idx="1"></div></div>
    <div class="col-4"><div class="bslight-thumb" style="--h:150" data-idx="2"></div></div>
    <div class="col-4"><div class="bslight-thumb" style="--h:300" data-idx="3"></div></div>
    <div class="col-4"><div class="bslight-thumb" style="--h:60" data-idx="4"></div></div>
    <div class="col-4"><div class="bslight-thumb" style="--h:180" data-idx="5"></div></div>
  </div>
</div>

<div class="modal fade" id="bslightModal" tabindex="-1">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content bslight-modal-content">
      <button type="button" class="btn-close btn-close-white position-absolute top-0 end-0 m-3" style="z-index:2" data-bs-dismiss="modal" aria-label="Close"></button>
      <div class="bslight-stage">
        <button class="bslight-nav bslight-prev" id="bslightPrev" aria-label="Previous image">‹</button>
        <div class="bslight-full" id="bslightFull"></div>
        <button class="bslight-nav bslight-next" id="bslightNext" aria-label="Next image">›</button>
      </div>
      <div class="text-center py-2 text-white-50 small" id="bslightCounter">1 / 6</div>
    </div>
  </div>
</div>`,
  css: `.bslight-thumb {
  aspect-ratio: 1; border-radius: 8px; cursor: pointer;
  background: linear-gradient(135deg, hsl(calc(var(--h)) 60% 75%), hsl(calc(var(--h) + 40) 60% 55%));
  transition: transform .15s;
}
.bslight-thumb:hover { transform: scale(0.97); }

.bslight-modal-content { background: #111827; border: none; }
.bslight-stage { position: relative; display: flex; align-items: center; }
.bslight-full { aspect-ratio: 16/9; width: 100%; background: linear-gradient(135deg, hsl(calc(var(--h,0)) 60% 60%), hsl(calc(var(--h,0) + 40) 60% 40%)); }
.bslight-nav {
  position: absolute; top: 50%; transform: translateY(-50%);
  width: 40px; height: 40px; border-radius: 50%; border: none;
  background: rgba(255,255,255,.15); color: #fff; font-size: 22px; cursor: pointer; z-index: 2;
}
.bslight-nav:hover { background: rgba(255,255,255,.3); }
.bslight-prev { left: 12px; }
.bslight-next { right: 12px; }`,
  js: `const HUES = [230, 20, 150, 300, 60, 180];
const modalEl = document.getElementById('bslightModal');
const modal = new bootstrap.Modal(modalEl);
const full = document.getElementById('bslightFull');
const counter = document.getElementById('bslightCounter');
let current = 0;

function render() {
  full.style.setProperty('--h', HUES[current]);
  counter.textContent = (current + 1) + ' / ' + HUES.length;
}

document.getElementById('bslightGrid').addEventListener('click', e => {
  const thumb = e.target.closest('.bslight-thumb');
  if (!thumb) return;
  current = Number(thumb.dataset.idx);
  render();
  modal.show();
});

document.getElementById('bslightPrev').addEventListener('click', () => {
  current = (current - 1 + HUES.length) % HUES.length;
  render();
});
document.getElementById('bslightNext').addEventListener('click', () => {
  current = (current + 1) % HUES.length;
  render();
});

// Arrow keys navigate while the lightbox is open — a standard gallery
// expectation Bootstrap's Modal doesn't provide on its own.
modalEl.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') document.getElementById('bslightPrev').click();
  if (e.key === 'ArrowRight') document.getElementById('bslightNext').click();
});`,

  seo: {
    title: 'Bootstrap Image Lightbox Gallery Modal — Free Snippet',
    description: 'A real Bootstrap 5.3 modal used as an image lightbox — click any thumbnail to open it full-size, with working prev/next and left/right arrow-key navigation.',
    about: {
      title: 'Bootstrap Image Lightbox Gallery Modal — HTML, CSS & JavaScript',
      description: `A thumbnail grid needs a way to view any image full-size without leaving the page — this snippet builds that on **real Bootstrap 5.3**'s Modal component, opened programmatically (\`modal.show()\`) with whichever thumbnail's index was clicked, rather than each thumbnail needing its own separate modal element.\n\nOne shared \`render()\` function updates both the full-size image and the "N / 6" counter from a single \`current\` index — the prev/next buttons and clicking a different thumbnail all just change that one number and call \`render()\`, which is what keeps the counter, the displayed image, and the navigation buttons\' behavior all consistent no matter how you got there. A \`keydown\` listener scoped to the modal element adds left/right arrow-key navigation, a gallery-lightbox expectation Bootstrap's Modal doesn't provide by itself.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click the snippet in the sidebar Library tab. The preview loads a 6-thumbnail grid.' },
        { title: 'Click any thumbnail', text: 'A real Bootstrap modal opens showing that image full-size, with a "N / 6" counter.' },
        { title: 'Click the arrow buttons', text: 'Navigate to the next or previous image — the counter and image both update, wrapping around at either end.' },
        { title: 'Use the arrow keys', text: 'With the modal open, press the left/right arrow keys on your keyboard for the same navigation.' },
        { title: 'Close and reopen a different thumbnail', text: 'The lightbox opens directly to whichever thumbnail you clicked, not always the first image.' },
      ],
    },
    features: [
      'Real Bootstrap 5.3 Modal component reused as a single shared lightbox for the whole gallery',
      'Opens directly to whichever thumbnail was clicked, via a shared index rather than per-image modals',
      'One render() function keeps the image and the counter always in sync',
      'Prev/next navigation wraps around at both ends of the gallery',
      'Left/right arrow-key navigation while the lightbox is open',
      'CSS-gradient images — no photography required to try the snippet',
    ],
    useCases: [
      { icon: 'IMAGE', title: 'Portfolio and product photo galleries', desc: 'The standard click-to-enlarge lightbox pattern, built on one shared Bootstrap modal instead of a dedicated lightbox library.' },
      { icon: 'LEARN', title: 'Learning to reuse one modal for many items', desc: 'A clear example of a single modal instance driven by a changing index, rather than generating a modal per gallery item.' },
      { icon: 'CODE',  title: 'Documentation screenshot galleries', desc: 'Reuse the same pattern for a docs page\'s screenshot grid, letting readers step through images without leaving the page.' },
      { icon: 'DESIGN', title: 'E-commerce product image galleries', desc: 'Adapt the thumbnail grid and lightbox for a single product\'s multiple angle shots.' },
    ],
    faqs: [
      { q: 'Does each thumbnail have its own modal?', a: 'No — there\'s exactly one Bootstrap modal for the whole gallery, and clicking a thumbnail sets a shared current index before opening it, which is what lets prev/next simply increment or decrement that one number.' },
      { q: 'How does the counter stay in sync with the displayed image?', a: 'Both are updated together inside one render() function, called whenever current changes — from a thumbnail click, a prev/next click, or an arrow-key press — so they can never show conflicting values.' },
      { q: 'Do the arrow keys work anywhere on the page, or only in the lightbox?', a: 'Only while the lightbox modal is open — the keydown listener is attached to the modal element itself, so arrow key presses elsewhere on the page don\'t affect it.' },
      { q: 'What happens if I click next on the last image?', a: 'It wraps around to the first image — the index calculation uses modulo arithmetic ((current + 1) % length), so navigation never dead-ends at either end of the gallery.' },
      { q: 'Do I need real photos to use this?', a: 'No — every image is a CSS gradient generated from a hue value, so the gallery works immediately. Replace .bslight-full and .bslight-thumb\'s backgrounds with real image URLs when ready.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add swipe gesture support for mobile, or to add a thumbnail strip inside the lightbox itself for quicker jumping between images. It's also a good exercise to ask the assistant to add a zoom-on-click feature for the full-size image.`,
      prompt: `Build a Bootstrap 5.3 image lightbox using a shared modal, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js), not custom CSS made to resemble Bootstrap.

Requirements:
- A grid of at least six clickable thumbnails (CSS-gradient placeholders are fine, no real images required).
- One single real Bootstrap modal (not one per thumbnail) that opens via JavaScript (modal.show()) to whichever thumbnail's index was clicked, displaying that image full-size along with a "current / total" counter.
- Prev/next buttons inside the modal that navigate the gallery, wrapping around at both ends (from the last image back to the first, and vice versa), updating both the displayed image and the counter from one shared index value.
- Left and right arrow key support for the same navigation while the modal is open, scoped so it doesn't interfere with arrow key usage elsewhere on the page.`,
    },
  },
};

export default bootstrapLightboxGalleryModal;
