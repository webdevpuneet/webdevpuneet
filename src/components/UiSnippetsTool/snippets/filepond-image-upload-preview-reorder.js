const filepondImageUploadPreviewReorder = {
  id: 'filepond-image-upload-preview-reorder',
  title: 'FilePond Image Upload with Preview and Reorder',
  lastmod: '2026-09-24',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/filepond-plugin-image-preview@4.6.12/dist/filepond-plugin-image-preview.min.css',
    'https://cdn.jsdelivr.net/npm/filepond@4.31.1/dist/filepond.min.css',
    'https://cdn.jsdelivr.net/npm/filepond-plugin-image-preview@4.6.12/dist/filepond-plugin-image-preview.min.js',
    'https://cdn.jsdelivr.net/npm/filepond-plugin-file-validate-type@1.2.9/dist/filepond-plugin-file-validate-type.min.js',
    'https://cdn.jsdelivr.net/npm/filepond@4.31.1/dist/filepond.min.js',
  ],
  html: `<div class="fu-card">
  <div class="fu-head">
    <h3>Listing photos</h3>
    <span class="fu-count" id="fuCount">0 / 6</span>
  </div>
  <p class="fu-sub">Drop images, or browse. Drag thumbnails to reorder &mdash; the first photo becomes the cover.</p>
  <input type="file" id="fuInput" class="filepond" name="photos" multiple accept="image/*">
  <div class="fu-order" id="fuOrder" aria-live="polite"></div>
</div>`,
  css: `body { background: #f4f5f9; padding: 22px; font-family: system-ui, sans-serif; }
.fu-card { max-width: 560px; margin: 0 auto; background: #fff; border: 1px solid #e0e3ee; border-radius: 16px; padding: 20px; box-shadow: 0 8px 24px rgba(30,30,80,.06); }
.fu-head { display: flex; justify-content: space-between; align-items: baseline; }
.fu-head h3 { margin: 0; font-size: 17px; color: #12152b; }
.fu-count { font: 700 12.5px/1 system-ui, sans-serif; color: #4338ca; background: #eef0ff; border-radius: 999px; padding: 5px 10px; font-variant-numeric: tabular-nums; }
.fu-sub { margin: 6px 0 14px; font-size: 13.5px; line-height: 1.5; color: #5b6279; }
.filepond--root { font-family: system-ui, sans-serif; margin-bottom: 0; }
.filepond--panel-root { background: #f5f6fc; border: 2px dashed #c9cdea; border-radius: 12px; }
.filepond--drop-label { color: #4a5270; }
.filepond--drop-label label { font-size: 14px; font-weight: 600; }
.filepond--label-action { color: #4f46e5; text-decoration-color: #a5b4fc; }
.filepond--item-panel { background: #4f46e5; }
[data-filepond-item-state*='error'] .filepond--item-panel, [data-filepond-item-state*='invalid'] .filepond--item-panel { background: #dc2626; }
.filepond--file-info-main { font-weight: 600; }
.fu-order { margin-top: 12px; display: flex; flex-wrap: wrap; gap: 6px; }
.fu-chip { display: inline-flex; align-items: center; gap: 6px; font: 600 12px/1 system-ui, sans-serif; color: #384057; background: #f0f2f8; border-radius: 8px; padding: 6px 9px; max-width: 160px; }
.fu-chip b { display: grid; place-items: center; width: 18px; height: 18px; border-radius: 50%; background: #c7d2fe; color: #312e81; font-size: 11px; flex: none; }
.fu-chip.cover { background: #eef0ff; color: #3730a3; }
.fu-chip.cover b { background: #4f46e5; color: #fff; }
.fu-chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }`,
  js: `FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType);

const MAX = 6;
const order = document.getElementById('fuOrder');
const count = document.getElementById('fuCount');

const pond = FilePond.create(document.getElementById('fuInput'), {
  allowMultiple: true,
  allowReorder: true,               // drag a file up or down to change its position
  maxFiles: MAX,
  acceptedFileTypes: ['image/png', 'image/jpeg', 'image/webp', 'image/gif'],
  labelFileTypeNotAllowed: 'Images only',
  fileValidateTypeLabelExpectedTypes: 'PNG, JPG, WebP or GIF',
  imagePreviewHeight: 110,
  itemInsertLocation: 'after',
  instantUpload: false,             // keep files local until the form is submitted
  storeAsFile: true,                // put the files back into a real <input> so a normal form post includes them
  labelIdle: 'Drag & drop your photos or <span class="filepond--label-action">Browse</span>',
  credits: false,
});

function refresh() {
  const files = pond.getFiles();
  count.textContent = files.length + ' / ' + MAX;
  order.innerHTML = files.map(function (f, i) {
    const name = f.filename.replace(/</g, '&lt;');
    return '<span class="fu-chip' + (i === 0 ? ' cover' : '') + '"><b>' + (i + 1) + '</b><span>' + name + '</span>' + (i === 0 ? '&nbsp;(cover)' : '') + '</span>';
  }).join('');
}
['addfile', 'removefile', 'reorderfiles', 'updatefiles'].forEach(function (ev) { pond.on(ev, refresh); });

// Pre-load a few generated photos so the reorder handles are visible immediately.
function makePhoto(i, label) {
  const hues = [[220, 280], [20, 340], [160, 200]][i];
  const c = document.createElement('canvas'); c.width = 640; c.height = 440;
  const x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 640, 440);
  g.addColorStop(0, 'hsl(' + hues[0] + ',75%,62%)'); g.addColorStop(1, 'hsl(' + hues[1] + ',65%,38%)');
  x.fillStyle = g; x.fillRect(0, 0, 640, 440);
  x.fillStyle = 'rgba(255,255,255,.88)'; x.beginPath(); x.arc(470, 130, 44, 0, 7); x.fill();
  x.fillStyle = 'rgba(15,20,55,.42)';
  x.beginPath(); x.moveTo(0, 440); x.lineTo(160, 250 + i * 20); x.lineTo(300, 340); x.lineTo(450, 210); x.lineTo(640, 330); x.lineTo(640, 440); x.fill();
  return new Promise(function (resolve) {
    c.toBlob(function (blob) { resolve(new File([blob], label, { type: 'image/jpeg' })); }, 'image/jpeg', 0.85);
  });
}
Promise.all([makePhoto(0, 'living-room.jpg'), makePhoto(1, 'kitchen.jpg'), makePhoto(2, 'garden.jpg')])
  .then(function (files) { return pond.addFiles(files); })
  .then(refresh);
refresh();`,

  seo: {
    title: 'FilePond Image Upload with Reorder — Free JS Snippet',
    description: `An image upload field built with FilePond: drag-and-drop, live thumbnail previews, file-type validation, a maximum count and drag-to-reorder with a cover photo indicator.`,
    about: {
      title: 'FilePond Image Upload with Preview and Reorder — HTML, CSS & JavaScript',
      description: `A plain file input is functional and unfriendly: no preview, no progress, no way to tell whether the file you picked is the one you meant, and nothing to help you change your mind. FilePond replaces it with a proper upload component — drag-and-drop, thumbnails, remove buttons, animations — while remaining a genuine form field underneath. This snippet uses it for a common real-world job, a listing-photo uploader where the order matters because the first image becomes the cover.

FilePond's power comes from its plug-in model. The core library handles files, states and the UI shell; image previews and type validation are separate plug-ins that must be registered before an instance is created — FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginFileValidateType). Skipping this step is the most common mistake: options such as imagePreviewHeight and acceptedFileTypes are silently ignored without the plug-ins that read them. The demo loads each plug-in's script, plus the CSS for the core and the preview plug-in, from a CDN.

Reordering is a single option: allowReorder: true lets users drag items up and down, and the reorderfiles event fires when they do. The snippet listens to that event along with addfile, removefile and updatefiles to redraw a numbered "upload order" strip beneath the field, marking position one as the cover. That order is also the order in which the files will be submitted, which is the whole point of letting people arrange them.

Two options define how the upload works with forms. instantUpload: false keeps files on the client until the surrounding form is submitted, rather than firing a request per file the moment it is added. storeAsFile: true writes the selected files back into a real file input so a normal multipart form post includes them, with no server endpoint or custom upload code required for the simplest case; for API-style uploads you would configure server processing instead. maxFiles enforces the cap of six, acceptedFileTypes restricts to images, and labelFileTypeNotAllowed gives a clear rejection message. Three generated sample photos are added at startup so the drag handles are visible straight away.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'See the pre-loaded photos', text: 'Three sample images appear as thumbnails, numbered in the order strip below with the first marked as the cover.' },
        { title: 'Reorder them', text: 'Drag a thumbnail up or down. The numbered strip updates to show the new upload order and cover.' },
        { title: 'Add your own', text: 'Drop image files onto the field, or click Browse. Non-image files are rejected with a clear message.' },
        { title: 'Hit the limit', text: 'Add up to six photos. The counter shows the total and further files are refused.' },
        { title: 'Remove one', text: 'Use the remove button on a thumbnail; the strip and counter update immediately.' },
      ],
    },
    features: [
      'Drag-and-drop and click-to-browse with animated thumbnail previews',
      'Drag-to-reorder using allowReorder and the reorderfiles event',
      'Numbered upload-order strip that marks the first file as the cover',
      'Image-only validation with a friendly rejection message',
      'Maximum file count with a live counter',
      'instantUpload: false keeps files local until the form is submitted',
      'storeAsFile: true, so a normal multipart form post includes the files',
      'Plug-ins registered up front: image preview and file-type validation',
    ],
    useCases: [
      { icon: '🛍️', title: 'Marketplace listing photos', desc: 'Let sellers arrange product photos by dragging, with the first image marked as the cover through a numbered upload-order strip.' },
      { icon: '🖼️', title: 'Profile and portfolio galleries', desc: 'Collect a set of images for a profile or portfolio gallery with live thumbnail previews, rejecting non-images with a friendly message.' },
      { icon: '📝', title: 'CMS media uploads', desc: 'Give CMS editors previews and validation before anything is saved, capping the number of files that the field will accept.' },
      { icon: '✂️', title: 'Cropping companion', desc: 'Pair with [Cropper.js social aspect ratio presets](/ui-snippets/cropperjs-social-aspect-ratio-presets/) so uploaded images can be cropped to platform sizes.' },
      { icon: '🎓', title: 'Plug-in architecture learning', desc: 'See why a library\'s optional plug-ins, such as image preview and file type validation, need registering before use.' },
    ],
    faqs: [
      { q: 'Why are my FilePond options ignored?', a: 'Options like imagePreviewHeight and acceptedFileTypes belong to plug-ins. Call FilePond.registerPlugin with those plug-ins before FilePond.create.' },
      { q: 'How do I let users reorder files?', a: 'Set allowReorder: true and listen for the reorderfiles event, then read the new order with pond.getFiles().' },
      { q: 'What does storeAsFile do?', a: 'It places the selected files back into a real file input, so a standard form submission includes them without a custom upload server.' },
      { q: 'How do I upload immediately to an API?', a: 'Leave instantUpload on and configure the server option with process and revert endpoints or functions.' },
      { q: 'How do I restrict file types?', a: 'Register FilePondPluginFileValidateType and set acceptedFileTypes, e.g. ["image/png", "image/jpeg"], plus a custom label.' },
      { q: 'How do I limit the number of files?', a: 'Set maxFiles. FilePond refuses additional files once the limit is reached.' },
      { q: 'Can I use this image uploader in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from FilePond, so in a framework project install it with npm install filepond filepond-plugin-image-preview filepond-plugin-file-validate-type (or react-filepond / vue-filepond / ngx-filepond) instead of the CDN tag, register the plug-ins once, then create the pond in an effect, and release it with destroy() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to add image resizing and cropping with the image-transform plug-in, wire the field to a real upload endpoint with progress bars, or add EXIF orientation correction.`,
      prompt: `Build a multi-image upload field with FilePond 4 loaded from a CDN (core script and CSS, image preview plug-in script and CSS, file-validate-type plug-in).

Requirements:
- Register FilePondPluginImagePreview and FilePondPluginFileValidateType before calling FilePond.create on a file input.
- Set allowMultiple, allowReorder, maxFiles: 6, acceptedFileTypes for PNG/JPEG/WebP/GIF, instantUpload: false and storeAsFile: true, with a custom label and file-type-rejected message.
- Show a live "n / 6" counter and a numbered upload-order strip that marks the first file as the cover, updated on addfile, removefile and reorderfiles events.
- Pre-load three generated sample images with pond.addFiles so reordering can be seen straight away.`,
    },
  },
};

export default filepondImageUploadPreviewReorder;
