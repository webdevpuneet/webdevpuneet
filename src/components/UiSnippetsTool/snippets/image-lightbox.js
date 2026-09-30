const imageLightbox = {
  id: 'image-lightbox',
  title: 'Image Lightbox',
  category: 'modals',
  html: `<div class="gallery">
  <div class="grid">
    <div class="thumb" data-idx="0" style="background:linear-gradient(135deg,#6366f1,#a78bfa)">
      <span class="thumb-label">Mountain</span>
    </div>
    <div class="thumb" data-idx="1" style="background:linear-gradient(135deg,#ec4899,#f97316)">
      <span class="thumb-label">Sunset</span>
    </div>
    <div class="thumb" data-idx="2" style="background:linear-gradient(135deg,#10b981,#0ea5e9)">
      <span class="thumb-label">Forest</span>
    </div>
    <div class="thumb" data-idx="3" style="background:linear-gradient(135deg,#f59e0b,#ef4444)">
      <span class="thumb-label">Desert</span>
    </div>
    <div class="thumb" data-idx="4" style="background:linear-gradient(135deg,#8b5cf6,#ec4899)">
      <span class="thumb-label">Ocean</span>
    </div>
    <div class="thumb" data-idx="5" style="background:linear-gradient(135deg,#0ea5e9,#10b981)">
      <span class="thumb-label">City</span>
    </div>
  </div>
  <p class="hint">Click any image to open</p>
</div>

<!-- Lightbox overlay -->
<div class="lightbox" id="lb" role="dialog" aria-modal="true" aria-label="Image viewer">
  <button class="lb-close" id="lb-close" aria-label="Close">✕</button>
  <button class="lb-prev"  id="lb-prev"  aria-label="Previous">‹</button>
  <button class="lb-next"  id="lb-next"  aria-label="Next">›</button>

  <div class="lb-img" id="lb-img"></div>

  <div class="lb-footer">
    <span class="lb-caption" id="lb-cap"></span>
    <span class="lb-counter" id="lb-count"></span>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 24px; }

.gallery { width: 100%; max-width: 560px; display: flex; flex-direction: column; gap: 16px; }

.grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }

.thumb { border-radius: 12px; height: 110px; cursor: pointer; display: flex; align-items: flex-end; padding: 10px; overflow: hidden; position: relative; transition: transform 0.15s, box-shadow 0.15s; }
.thumb:hover { transform: scale(1.03); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }
.thumb-label { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.9); text-transform: uppercase; letter-spacing: 0.6px; position: relative; z-index: 1; }
.thumb::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.35), transparent); }

.hint { font-size: 12px; color: #94a3b8; text-align: center; }

/* ── Lightbox ── */
.lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.92); display: none; align-items: center; justify-content: center; z-index: 1000; animation: lb-in 0.2s ease; }
.lightbox.open { display: flex; }
@keyframes lb-in { from { opacity: 0; } to { opacity: 1; } }

.lb-img { width: min(600px, 88vw); height: min(420px, 70vh); border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: 700; color: rgba(255,255,255,0.8); box-shadow: 0 24px 80px rgba(0,0,0,0.6); transition: background 0.25s; }

.lb-close { position: absolute; top: 20px; right: 20px; background: rgba(255,255,255,0.1); border: none; color: #fff; font-size: 18px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: center; }
.lb-close:hover { background: rgba(255,255,255,0.2); }

.lb-prev, .lb-next { position: absolute; top: 50%; transform: translateY(-50%); background: rgba(255,255,255,0.1); border: none; color: #fff; font-size: 28px; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; transition: background 0.15s; display: flex; align-items: center; justify-content: center; line-height: 1; }
.lb-prev:hover, .lb-next:hover { background: rgba(255,255,255,0.25); }
.lb-prev { left: 20px; }
.lb-next { right: 20px; }

.lb-footer { position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); display: flex; gap: 24px; align-items: center; }
.lb-caption { font-size: 14px; color: rgba(255,255,255,0.8); font-weight: 600; }
.lb-counter  { font-size: 12px; color: rgba(255,255,255,0.4); }`,
  js: `const images = [
  { label: 'Mountain', bg: 'linear-gradient(135deg,#6366f1,#a78bfa)' },
  { label: 'Sunset',   bg: 'linear-gradient(135deg,#ec4899,#f97316)' },
  { label: 'Forest',   bg: 'linear-gradient(135deg,#10b981,#0ea5e9)' },
  { label: 'Desert',   bg: 'linear-gradient(135deg,#f59e0b,#ef4444)' },
  { label: 'Ocean',    bg: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
  { label: 'City',     bg: 'linear-gradient(135deg,#0ea5e9,#10b981)' },
];
let cur = 0;

function openLightbox(idx) {
  cur = idx;
  show();
  document.getElementById('lb').classList.add('open');
  document.addEventListener('keydown', onKey);
}

function closeLightbox() {
  document.getElementById('lb').classList.remove('open');
  document.removeEventListener('keydown', onKey);
}

function nav(dir) {
  cur = (cur + dir + images.length) % images.length;
  show();
}

function show() {
  const img = images[cur];
  const el = document.getElementById('lb-img');
  el.style.background = img.bg;
  el.textContent = img.label;
  document.getElementById('lb-cap').textContent   = img.label;
  document.getElementById('lb-count').textContent = (cur + 1) + ' / ' + images.length;
}

function onKey(e) {
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  nav(-1);
  if (e.key === 'ArrowRight') nav(1);
}

document.querySelectorAll('.thumb').forEach(el => {
  el.addEventListener('click', () => openLightbox(+el.dataset.idx));
});
document.getElementById('lb-close').addEventListener('click', closeLightbox);
document.getElementById('lb-prev').addEventListener('click', () => nav(-1));
document.getElementById('lb-next').addEventListener('click', () => nav(1));
document.getElementById('lb').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeLightbox();
});`,
  seo: {
    title: 'Image Lightbox — Free HTML CSS JS Gallery Snippet',
    description: 'Thumbnail grid opening a fullscreen lightbox with prev/next, arrow keys and ESC close. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Image Lightbox — Thumbnail Grid, Fullscreen Overlay, Keyboard Navigation & Click-Outside Close',
      description: `An image lightbox opens a fullscreen overlay displaying a larger version of a clicked thumbnail, with navigation controls to move between images without closing the overlay. It is one of the most-used UI patterns on photography portfolios, e-commerce product galleries, and media-rich web pages. This snippet gives you a complete implementation: a 3-column responsive thumbnail grid, a fade-in fullscreen overlay, previous/next navigation, keyboard arrow key support, ESC to close, and click-outside-overlay close — all in plain HTML, CSS, and vanilla JavaScript.\n\n**How the overlay works**\n\nThe lightbox is a position: fixed div that covers the full viewport (inset: 0). Its default display is none. Clicking a thumbnail calls open(idx) which sets the current index, calls show() to populate the image display, and adds the .open class — which switches display to flex. A @keyframes animation fades opacity from 0 to 1 on open. Closing removes .open, reverting display to none.\n\n**The image display**\n\nThe snippet uses gradient placeholder blocks instead of real images so the lightbox works immediately without image files. In production, replace the gradient divs with img elements — set src from the images array. The .lb-img div uses width: min(600px, 88vw) and height: min(420px, 70vh) — the min() function caps the size for large screens while allowing it to shrink on mobile viewports.\n\n**Navigation**\n\nnav(dir) adds dir to the current index and wraps at both ends using modulo arithmetic: (cur + dir + images.length) % images.length. This ensures -1 from index 0 wraps to the last image and +1 from the last wraps to 0. The arrow buttons call nav(-1) and nav(1). The keyboard handler maps ArrowLeft and ArrowRight to the same calls.\n\n**Keyboard and click-outside close**\n\nThe keyboard listener (document.addEventListener("keydown", onKey)) is added only when the lightbox opens and removed when it closes — preventing memory leaks. Click-outside is detected by checking e.target === e.currentTarget on the overlay div — clicking the overlay background fires the event on the overlay element itself, not on a child.\n\n**Replacing with real images**\n\nUpdate the images array: { label: "Caption text", src: "photo.jpg" }. In show(), set el.src = img.src on an img element inside .lb-img instead of setting background.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click any thumbnail to open the lightbox', text: 'The overlay fades in showing the selected image. Use the ‹ and › arrow buttons or keyboard arrow keys to navigate. Press ESC or click outside the image or click ✕ to close.' },
      { title: 'Replace gradients with real images', text: 'In the images array, add a src property: { label: "Caption", src: "photo.jpg", bg: "" }. In the show() function, replace el.style.background = img.bg with an img tag: el.innerHTML = "<img src=\'"+img.src+"\' style=\'max-width:100%;max-height:100%;border-radius:14px;\' alt=\'"+img.label+"\'>".' },
      { title: 'Update the thumbnail grid', text: 'Replace each .thumb div with an img tag or a real image background-image. Keep the onclick="open(N)" attribute on each thumbnail, incrementing N from 0. Keep the .thumb-label overlay text for caption display.' },
      { title: 'Add more images', text: 'Add entries to the images array and add matching .thumb divs in the HTML with the correct onclick index. The navigation wraps automatically via modulo arithmetic.' },
      { title: 'Change the overlay background opacity', text: 'Update the background rgba on .lightbox from rgba(0,0,0,0.92) to your preferred darkness. For a blurred background (instead of black), add backdrop-filter: blur(20px) and reduce the rgba opacity to 0.5.' },
      { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component using useState for the open state and current index, or "Tailwind" for a React + Tailwind version.' },
    ]},
    features: ['3-column thumbnail grid with hover scale(1.03) and box-shadow lift','Gradient overlay on thumbnails via ::after for caption readability','Fullscreen overlay: position:fixed inset:0, display:none→flex via .open class','Fade-in animation: opacity 0→1 @keyframes on .open','min() sizing: width:min(600px,88vw) — capped on desktop, shrinks on mobile','Keyboard navigation: ArrowLeft, ArrowRight, Escape via document keydown listener','Keydown listener added on open and removed on close — no memory leaks','Click-outside close: e.target === e.currentTarget on overlay click handler','Modulo wrap: nav(dir) wraps from last to first and first to last'],
    useCases: [
      { icon: 'DESIGN', title: 'Photography portfolios and image gallery pages', desc: 'The lightbox pattern is the standard for photography portfolio sites — pair it with a [photo gallery](/ui-snippets/photo-gallery/) grid. The 3-column thumbnail grid with hover scale effect, gradient label overlay, and fullscreen viewer with keyboard navigation matches the expected pattern for professional image gallery pages.' },
      { icon: 'APP', title: 'E-commerce product image galleries', desc: 'Wire the thumbnail grid to product images. Open the lightbox on thumbnail click to show a larger product view. Add a zoom-on-hover effect with the [image magnifier](/ui-snippets/image-magnifier/) snippet. Support swipe gestures by binding touchstart and touchend events to nav(), or present images in a [scroll-snap gallery](/ui-snippets/scroll-snap-gallery/).' },
      { icon: 'FLOW', title: 'Blog post and article inline image viewers', desc: 'Attach lightbox behaviour to article inline images: document.querySelectorAll("article img").forEach((img, i) => { img.style.cursor = "pointer"; img.onclick = () => open(i); }). Populate the images array from the src and alt attributes of each article img element.' },
      { icon: 'LEARN', title: 'Learn the click-outside detection and event lifecycle pattern', desc: 'The e.target === e.currentTarget check for click-outside is a fundamental JavaScript pattern. The listener attach/remove on open/close pattern prevents memory leaks and shows the correct way to scope event listeners to component lifetime.' },
      { icon: 'CODE', title: 'Document and attachment preview overlays', desc: 'Adapt the lightbox for PDF previews, spreadsheet thumbnails, or design file previews. Replace the image display with an iframe or embed element. The overlay, navigation, keyboard, and close patterns work identically for any fullscreen preview content.' },
      { icon: 'STAR', title: 'Team and conference speaker photo galleries', desc: 'Use the grid + lightbox for team member photo galleries. Each lightbox panel can show the team member photo, name, role, and bio by populating a richer .lb-img content block instead of just the image.' },
      { icon: 'CODE', title: 'Related: Recent Purchase Notification Popup', desc: 'See the [Recent Purchase Notification Popup](/ui-snippets/recent-purchase-notification-popup/) for a related modals pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the click-outside close work?', a: 'The .lightbox div has an event listener: e.target === e.currentTarget. When the user clicks the dark overlay background, the click event fires on the .lightbox element itself (since nothing else is under the cursor). e.target is .lightbox and e.currentTarget is also .lightbox — they match, so close() fires. When the user clicks the image, the close button, or the nav buttons, e.target is that child element, not .lightbox — the condition is false and the lightbox stays open.' },
      { q: 'How do I add touch swipe navigation for mobile?', a: 'Add touchstart and touchend listeners to the .lb-img element. In touchstart, record startX = e.touches[0].clientX. In touchend, compute the delta: if (e.changedTouches[0].clientX - startX < -50) nav(1) for left swipe (next); if delta > 50, nav(-1) for right swipe (prev). A threshold of 50px prevents accidental swipes from tap jitter.' },
      { q: 'How do I lazy-load large images when navigating?', a: 'In the show() function, instead of setting the src immediately, set a loading state and use new Image() to preload: const preload = new Image(); preload.onload = () => { el.src = img.src; }; preload.src = img.src. Show a skeleton or spinner in .lb-img while the image loads. Also preload the next image in the background: const nextImg = images[(cur + 1) % images.length]; new Image().src = nextImg.src.' },
      { q: 'How do I use the image lightbox in React?', a: 'Click "JSX" to download. Use useState(null) for the open image index — null means closed. Conditionally render the lightbox: {openIndex !== null && <Lightbox .../>}. Pass onClose, onPrev, and onNext props. Add useEffect to attach and clean up the keydown listener when openIndex is not null: useEffect(() => { if (openIndex === null) return; const handler = e => {...}; document.addEventListener("keydown", handler); return () => document.removeEventListener("keydown", handler); }, [openIndex]).' },
    ],
    aiPrompt: {
      paragraph: `You don't have to trace the event lifecycle by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the keydown listener is attached only inside openLightbox and removed inside closeLightbox rather than being bound once on page load, or how the e.target === e.currentTarget check reliably distinguishes a click on the dark backdrop from a click on the image or a button inside it. The same assistant is useful for optimizing it — ask whether the nav function's modulo-wrap formula (cur plus dir plus images.length, mod images.length) would still be correct if dir could ever be a value other than positive or negative one. It's just as handy for extending the lightbox: ask it to add touch swipe navigation using touchstart and touchend deltas, preload the next and previous images in the background so navigation feels instant, or add a thumbnail filmstrip along the bottom that stays in sync with the current index. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an image lightbox gallery in plain HTML, CSS, and JavaScript — no library.

Requirements:
- A grid of clickable thumbnails, each associated with an index into a shared array of image data (a label and a background/source value).
- A single fullscreen overlay element, initially hidden via a CSS display toggle driven by a class, that fades in with a CSS keyframe animation when opened.
- Clicking any thumbnail must set a shared "current index" variable to that thumbnail's index, populate the overlay's image display and caption from the images array at that index, show a counter like "3 / 6", and open the overlay.
- Add previous and next buttons that move the current index by -1 or +1 respectively, wrapping around using modulo arithmetic so going back from the first image jumps to the last, and forward from the last jumps to the first — then re-populate the display without closing the overlay.
- Attach a keydown listener only while the overlay is open (added when it opens, removed when it closes, not bound permanently) that maps the Escape key to closing the overlay, and the left/right arrow keys to the same previous/next navigation as the buttons.
- Implement click-outside-to-close by checking, inside the overlay's own click handler, whether the click's target element is the overlay itself (not a descendant like the image, caption, or buttons) — only close when they are the same element.
- Size the enlarged image display using the CSS min() function so it's capped at a maximum size on large screens but shrinks to fit smaller viewports without a media query.`,
    },
  },
};

export default imageLightbox;
