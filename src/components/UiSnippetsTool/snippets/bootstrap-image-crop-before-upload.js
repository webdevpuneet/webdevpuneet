const bootstrapImageCropBeforeUpload = {
  id: 'bootstrap-image-crop-before-upload',
  title: 'Bootstrap Image Crop Before Upload',
  lastmod: '2026-09-11',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bscrop-card">
    <div class="card-body p-4">
      <label class="form-label small fw-semibold">Choose an image</label>
      <input type="file" class="form-control mb-3" id="bscropInput" accept="image/*">

      <div class="d-none" id="bscropEditor">
        <div class="bscrop-frame" id="bscropFrame">
          <img id="bscropImg" draggable="false" alt="">
        </div>
        <label class="form-label small mt-2 mb-1">Zoom</label>
        <input type="range" class="form-range" id="bscropZoom" min="1" max="2.5" step="0.01" value="1">
        <button type="button" class="btn btn-dark btn-sm fw-bold mt-2" id="bscropSave">Save crop</button>
      </div>

      <div class="d-none mt-3" id="bscropResultWrap">
        <p class="small fw-semibold mb-1">Cropped result:</p>
        <canvas id="bscropCanvas" width="160" height="160" class="bscrop-result"></canvas>
      </div>
    </div>
  </div>
</div>`,
  css: `.bscrop-card { width: 340px; max-width: 100%; border: 1px solid #eceef1; border-radius: 14px; }
.bscrop-frame {
  position: relative; width: 220px; height: 220px; margin: 0 auto;
  overflow: hidden; border-radius: 10px; background: #14151a; cursor: grab; touch-action: none;
}
.bscrop-frame.bscrop-dragging { cursor: grabbing; }
.bscrop-frame img { position: absolute; left: 0; top: 0; user-select: none; }
.bscrop-result { border-radius: 50%; border: 2px solid #e5e7eb; }`,
  js: `const FRAME = 220;
const OUTPUT = 160;

const input = document.getElementById('bscropInput');
const editor = document.getElementById('bscropEditor');
const frame = document.getElementById('bscropFrame');
const img = document.getElementById('bscropImg');
const zoomSlider = document.getElementById('bscropZoom');
const resultWrap = document.getElementById('bscropResultWrap');
const canvas = document.getElementById('bscropCanvas');

let baseScale = 1;
let offsetX = 0;
let offsetY = 0;
let dragging = false;
let startX = 0, startY = 0, startOffsetX = 0, startOffsetY = 0;

function currentScale() {
  return baseScale * Number(zoomSlider.value);
}

function clampOffsets() {
  const scale = currentScale();
  const w = img.naturalWidth * scale;
  const h = img.naturalHeight * scale;
  offsetX = Math.min(0, Math.max(FRAME - w, offsetX));
  offsetY = Math.min(0, Math.max(FRAME - h, offsetY));
}

function applyTransform() {
  const scale = currentScale();
  img.style.width = (img.naturalWidth * scale) + 'px';
  img.style.height = (img.naturalHeight * scale) + 'px';
  img.style.left = offsetX + 'px';
  img.style.top = offsetY + 'px';
}

function centerImage() {
  const scale = currentScale();
  offsetX = (FRAME - img.naturalWidth * scale) / 2;
  offsetY = (FRAME - img.naturalHeight * scale) / 2;
}

input.addEventListener('change', () => {
  const file = input.files && input.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  img.onload = () => {
    baseScale = Math.max(FRAME / img.naturalWidth, FRAME / img.naturalHeight);
    zoomSlider.value = '1';
    centerImage();
    applyTransform();
    editor.classList.remove('d-none');
    resultWrap.classList.add('d-none');
    URL.revokeObjectURL(url);
  };
  img.src = url;
});

zoomSlider.addEventListener('input', () => {
  clampOffsets();
  applyTransform();
});

frame.addEventListener('pointerdown', e => {
  dragging = true;
  frame.classList.add('bscrop-dragging');
  startX = e.clientX; startY = e.clientY;
  startOffsetX = offsetX; startOffsetY = offsetY;
  frame.setPointerCapture(e.pointerId);
});

frame.addEventListener('pointermove', e => {
  if (!dragging) return;
  offsetX = startOffsetX + (e.clientX - startX);
  offsetY = startOffsetY + (e.clientY - startY);
  clampOffsets();
  applyTransform();
});

['pointerup', 'pointercancel'].forEach(evt =>
  frame.addEventListener(evt, () => { dragging = false; frame.classList.remove('bscrop-dragging'); })
);

document.getElementById('bscropSave').addEventListener('click', () => {
  const scale = currentScale();
  const srcX = -offsetX / scale;
  const srcY = -offsetY / scale;
  const srcSize = FRAME / scale;

  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, OUTPUT, OUTPUT);
  ctx.drawImage(img, srcX, srcY, srcSize, srcSize, 0, 0, OUTPUT, OUTPUT);
  resultWrap.classList.remove('d-none');
});`,

  seo: {
    title: 'Bootstrap Image Crop Before Upload — Free HTML CSS JS Snippet',
    description: 'A real pan-and-zoom image cropper built with Bootstrap 5.3 and a plain canvas — drag to reposition, a zoom slider, and a Save action that computes the exact visible crop back into natural image pixel coordinates.',
    about: {
      title: 'Bootstrap Image Crop Before Upload — HTML, CSS & JavaScript',
      description: `The core problem this snippet solves is mapping what's *visually* inside a fixed-size crop frame back to real pixel coordinates in the *original, full-resolution* image — those are two different coordinate systems the moment the image is scaled or panned at all. \`baseScale\` starts at whichever ratio makes the image fully cover the 220px frame (\`Math.max(FRAME / naturalWidth, FRAME / naturalHeight)\`, the same "cover" math CSS's own \`object-fit: cover\` uses), and the zoom slider multiplies on top of that base rather than replacing it, so 1.0 on the slider always means "just covering the frame," not "original size."\n\nDragging updates \`offsetX\`/\`offsetY\` directly as real pixel positions of the image's top-left corner relative to the frame — not a CSS \`transform\`, which would make the reverse-mapping math significantly messier. \`clampOffsets()\` runs after every drag and zoom change to guarantee the frame can never show empty space around the image, by constraining each offset between \`FRAME - scaledSize\` and \`0\`.\n\nThe actual crop happens in \`Save\`: since the frame shows a \`FRAME\`-pixel window starting at \`-offsetX, -offsetY\` in the image's *displayed* pixels, dividing those by the current scale converts them into the image's *natural* pixel coordinates — \`srcX = -offsetX / scale\`, \`srcY = -offsetY / scale\`, \`srcSize = FRAME / scale\` — which is exactly the source rectangle \`ctx.drawImage()\` needs to paint precisely what was visible on screen onto the output canvas, at full resolution rather than a blurry re-scale of an already-shrunk preview.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Choose an image file', text: 'It loads into a circular-adjacent square frame, automatically scaled to fully cover it.' },
        { title: 'Drag inside the frame', text: 'The image pans under your cursor, clamped so it can never reveal empty space at any edge.' },
        { title: 'Move the zoom slider', text: 'The image scales up (and re-clamps its position) while staying centered on wherever you last panned to.' },
        { title: 'Click "Save crop"', text: 'A circular cropped result appears below, computed from the exact visible region at full image resolution.' },
        { title: 'Choose a different image', text: 'The editor resets cleanly with fresh scale and centering for the new file.' },
      ],
    },
    features: [
      'A real cover-fit base scale computed from the image\'s actual natural dimensions, not a fixed guess',
      'Dragging and zooming are both clamped so the crop frame can never show empty space',
      'The crop is computed at full image resolution via natural-coordinate math, not a downscaled preview',
      'Uses the Pointer Events API (pointerdown/move/up) so the same code handles mouse and touch dragging',
      'Pointer capture ensures a fast drag that leaves the frame\'s bounds is still tracked correctly',
    ],
    useCases: [
      { icon: 'FORM', title: 'Profile photo and avatar upload flows', desc: 'Pairs directly with [bootstrap-avatar-upload-editor](/ui-snippets/bootstrap-avatar-upload-editor/) for a complete photo-selection-to-final-crop pipeline.' },
      { icon: 'APP', title: 'Any upload requiring a specific aspect ratio', desc: 'Ensures a user-selected image fits a fixed square (or, with square math generalized, rectangular) region cleanly before it is ever uploaded.' },
      { icon: 'LEARN', title: 'Learning coordinate-space conversion for canvas', desc: 'A genuinely useful, complete reference for converting screen/display coordinates back into an image\'s natural pixel space.' },
    ],
    faqs: [
      { q: 'Why divide by scale instead of multiplying to get the source rectangle?', a: 'The display coordinates are natural-pixel coordinates multiplied by scale; reversing that transform to recover natural coordinates from display coordinates requires dividing by the same scale, not multiplying by it.' },
      { q: 'Does the cropped output stay sharp even at high zoom?', a: 'Yes — drawImage() always reads from the original, full-resolution <img> element regardless of how small it currently appears on screen, so the crop is never limited by the preview\'s displayed size the way cropping a screenshot of the frame would be.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep offsetX/offsetY/zoom in component state or refs (refs avoid unnecessary re-renders during a drag), and run the same clamp-and-transform math inside your pointer event handlers.' },
      { q: 'How would I output a non-square crop?', a: 'Give the frame a rectangular size instead of a square one, compute baseScale using that rectangle\'s width/height against the image\'s natural dimensions, and adjust srcSize into separate srcWidth/srcHeight values using the frame\'s actual aspect ratio.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet to an AI coding assistant like Claude and ask it to add a rule-of-thirds grid overlay while dragging for compositional guidance, or to add pinch-to-zoom support on touch devices using two simultaneous pointer events alongside the existing zoom slider.`,
      prompt: `Build a Bootstrap 5.3 pan-and-zoom image cropper, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding UI, with a plain HTML5 canvas for the actual crop output.

Requirements:
- A file input that loads a chosen image into a fixed-size square crop frame (e.g. 220x220px), automatically scaled with a "cover" fit so the image always fully fills the frame with no gaps.
- Dragging inside the frame (using Pointer Events, so it works for both mouse and touch) pans the image, clamped so it can never reveal empty space beyond any edge of the frame.
- A zoom range slider scales the image further while staying properly clamped and centered.
- A "Save crop" button must compute the exact visible region of the frame back into the original image's natural pixel coordinates (accounting for both the current pan offset and zoom scale), and draw that precise region onto an output canvas using drawImage's 9-argument form, so the cropped result is at full resolution rather than a scaled-down copy of the preview.`,
    },
  },
};

export default bootstrapImageCropBeforeUpload;
