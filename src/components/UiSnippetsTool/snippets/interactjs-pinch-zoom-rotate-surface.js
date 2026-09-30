const interactjsPinchZoomRotateSurface = {
  id: 'interactjs-pinch-zoom-rotate-surface',
  title: 'Interact.js Pinch-Zoom and Rotate Surface with Mouse Fallbacks',
  lastmod: '2026-09-24',
  category: 'mobile',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/interactjs@1.10.27/dist/interact.min.js',
  ],
  html: `<div class="pz-app">
  <div class="pz-stage" id="pzStage" tabindex="0" aria-label="Photo surface. Drag to move, pinch or use controls to zoom and rotate.">
    <div class="pz-card" id="pzCard"><div class="pz-art" aria-hidden="true"><span>&#127748;</span></div><div class="pz-cap">Golden hour &middot; drag, pinch, rotate</div></div>
    <div class="pz-guide" aria-hidden="true">Two fingers: pinch to zoom, twist to rotate</div>
  </div>
  <div class="pz-controls">
    <label>Zoom <input type="range" id="pzZoom" min="0.4" max="3" step="0.01" value="1"><output id="pzZoomOut">100%</output></label>
    <label>Rotate <input type="range" id="pzRot" min="-180" max="180" step="1" value="0"><output id="pzRotOut">0&deg;</output></label>
    <button type="button" id="pzReset">Reset</button>
  </div>
  <p class="pz-tip"><b>Desktop:</b> drag to move &middot; wheel to zoom &middot; <kbd>Alt</kbd> + wheel to rotate &middot; double-click to reset. <b>Touch:</b> drag, pinch and twist.</p>
</div>`,
  css: `body { background: #12141d; padding: 14px; font-family: system-ui, sans-serif; }
.pz-app { max-width: 620px; margin: 0 auto; }
.pz-stage { position: relative; height: 330px; border-radius: 16px; overflow: hidden; background: radial-gradient(circle at 50% 40%, #232842, #0d0f1a); border: 1px solid #2b3050; touch-action: none; cursor: grab; outline: 0; }
.pz-stage:focus-visible { box-shadow: 0 0 0 3px #818cf8; }
.pz-stage:active { cursor: grabbing; }
.pz-card { position: absolute; left: 50%; top: 50%; width: 220px; margin: -130px 0 0 -110px; background: #fff; padding: 10px 10px 34px; border-radius: 6px; box-shadow: 0 18px 38px rgba(0,0,0,.55); will-change: transform; user-select: none; transform-origin: 50% 50%; }
.pz-art { height: 200px; border-radius: 3px; background: linear-gradient(160deg, #f59e0b, #ec4899 55%, #6366f1); display: grid; place-items: center; font-size: 86px; }
.pz-cap { position: absolute; left: 0; right: 0; bottom: 9px; text-align: center; font: 700 12px/1 system-ui, sans-serif; color: #3a3f5c; }
.pz-guide { position: absolute; left: 0; right: 0; bottom: 12px; text-align: center; font: 700 11.5px/1 system-ui, sans-serif; color: #8b93c0; pointer-events: none; }
.pz-controls { display: flex; flex-wrap: wrap; gap: 14px; align-items: center; margin-top: 12px; color: #c8cdea; }
.pz-controls label { display: flex; align-items: center; gap: 8px; font: 700 12px/1 system-ui, sans-serif; }
.pz-controls input[type=range] { width: 130px; accent-color: #818cf8; }
.pz-controls output { min-width: 42px; font: 700 12px/1 ui-monospace, Menlo, monospace; color: #e6e9ff; }
.pz-controls button { margin-left: auto; font: 800 12px/1 system-ui, sans-serif; color: #12141d; background: #c7d2fe; border: 0; border-radius: 9px; padding: 9px 14px; cursor: pointer; }
.pz-tip { margin: 12px 2px 0; font-size: 12px; line-height: 1.7; color: #8b93c0; } .pz-tip b { color: #c8cdea; }
kbd { font: 700 10.5px/1 ui-monospace, Menlo, monospace; background: #232842; border: 1px solid #383e66; border-radius: 4px; padding: 2px 5px; color: #c8cdea; }`,
  js: `const stage = document.getElementById('pzStage');
const card = document.getElementById('pzCard');
const zoomIn = document.getElementById('pzZoom'), rotIn = document.getElementById('pzRot');
const zoomOut = document.getElementById('pzZoomOut'), rotOut = document.getElementById('pzRotOut');
const MIN = 0.4, MAX = 3;

// One state object is the source of truth; every input path (touch, wheel, sliders) edits it and calls apply().
const st = { x: 0, y: 0, scale: 1, angle: 0 };
const clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
function apply() {
  card.style.transform = 'translate(' + st.x + 'px,' + st.y + 'px) rotate(' + st.angle + 'deg) scale(' + st.scale + ')';
  zoomIn.value = st.scale; rotIn.value = st.angle;
  zoomOut.textContent = Math.round(st.scale * 100) + '%';
  rotOut.textContent = Math.round(st.angle) + '°';
}

interact(card)
  .draggable({
    listeners: { move: function (e) { st.x += e.dx; st.y += e.dy; apply(); } },
  })
  .gesturable({
    // gesture events fire for TWO-pointer input: ds is the change in scale ratio, da the change in angle (degrees).
    listeners: {
      move: function (e) {
        st.scale = clamp(st.scale * (1 + e.ds), MIN, MAX);
        st.angle += e.da;
        st.x += e.dx; st.y += e.dy;         // the midpoint of the fingers also moves the card
        apply();
      },
    },
  });

// A trackpad or mouse has no second finger, so the same state gets wheel and slider fallbacks.
stage.addEventListener('wheel', function (e) {
  e.preventDefault();
  if (e.altKey) st.angle += e.deltaY * 0.15;                         // Alt + wheel rotates
  else st.scale = clamp(st.scale * Math.exp(-e.deltaY * 0.0015), MIN, MAX);   // exponential keeps zoom speed even across scales
  apply();
}, { passive: false });                                              // passive:false is required to call preventDefault

zoomIn.addEventListener('input', function () { st.scale = clamp(Number(zoomIn.value), MIN, MAX); apply(); });
rotIn.addEventListener('input', function () { st.angle = Number(rotIn.value); apply(); });
function reset() { st.x = 0; st.y = 0; st.scale = 1; st.angle = 0; apply(); }
document.getElementById('pzReset').addEventListener('click', reset);
stage.addEventListener('dblclick', reset);

// Keyboard: arrows move, + and - zoom, [ and ] rotate.
stage.addEventListener('keydown', function (e) {
  const step = e.shiftKey ? 30 : 10;
  const k = e.key;
  if (k === 'ArrowLeft') st.x -= step; else if (k === 'ArrowRight') st.x += step;
  else if (k === 'ArrowUp') st.y -= step; else if (k === 'ArrowDown') st.y += step;
  else if (k === '+' || k === '=') st.scale = clamp(st.scale * 1.1, MIN, MAX); else if (k === '-') st.scale = clamp(st.scale / 1.1, MIN, MAX);
  else if (k === '[') st.angle -= 10; else if (k === ']') st.angle += 10;
  else return;
  e.preventDefault(); apply();
});

// Start slightly tilted so the preview shows the effect.
st.angle = -8; st.scale = 1.05; apply();`,

  seo: {
    title: 'Interact.js Pinch-Zoom and Rotate Surface — Free JS Snippet',
    description: `A photo surface you can drag, pinch to zoom and twist to rotate with Interact.js gesture events, plus wheel, slider and keyboard fallbacks driven by one shared state object.`,
    about: {
      title: 'Interact.js Pinch-Zoom and Rotate Surface — HTML, CSS & JavaScript',
      description: `Pinch to zoom and twist to rotate are the gestures people now expect from anything that looks like a photo, a map or a canvas. Implementing them from raw touch events means tracking two pointers, computing the distance between them to derive scale and the angle between them to derive rotation, handling pointers that appear and disappear mid-gesture, and doing it consistently across devices. Interact.js does that work and exposes a gesturable interaction whose events report the result directly: ds, the change in scale, and da, the change in angle in degrees, since the previous event.

The snippet keeps a single state object — x, y, scale and angle — and one apply() function that turns it into a CSS transform. Everything that can change the view edits the state and calls apply(): the draggable listener adds dx and dy, the gesturable listener multiplies scale by one plus ds and adds da to the angle, and, importantly, adds the gesture's midpoint movement so a two-finger pan is not lost. Centralising the transform in one function is what keeps the different input methods from fighting each other; if each wrote its own transform string, the last writer would erase the others' contributions.

Not every user has two fingers. On a desktop the gesturable interaction never fires, so a surface that supports only pinch is unusable there — a mistake common in gesture demos. The snippet therefore adds three fallbacks that edit the same state: the wheel zooms, Alt with the wheel rotates, and range sliders and keyboard shortcuts do both. The wheel handler uses exponential scaling, multiplying by e to the power of minus deltaY times a constant, so zooming feels equally fast at 50 percent and 300 percent instead of accelerating as you zoom in, and it registers with passive: false because calling preventDefault to stop the page scrolling is not allowed on passive listeners.

Two smaller details matter. The surface has touch-action: none, which tells the browser not to claim the gesture for its own page zoom or scroll; without it, pinching on a phone zooms the whole page instead of the photo. And scale is clamped between 0.4 and 3 through a shared clamp function, so no input path can shrink the card to nothing or blow it up beyond usefulness. Double-click, the Reset button and the keyboard provide simple recovery.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Drag the photo', text: 'Drag it with a mouse or one finger to move it around the surface.' },
        { title: 'Zoom with the wheel', text: 'Scroll the mouse wheel over the surface to zoom in and out. On a touch screen, pinch instead.' },
        { title: 'Rotate', text: 'Hold Alt and scroll to rotate, or twist two fingers on a touch screen.' },
        { title: 'Use the sliders', text: 'Drag the Zoom and Rotate sliders; they stay in sync with every other input method.' },
        { title: 'Reset', text: 'Double-click the surface or press Reset to return to the default view.' },
      ],
    },
    features: [
      'Interact.js gesturable events with ds (scale change) and da (angle change)',
      'One state object and one apply() function shared by every input method',
      'Two-finger pan included via the gesture\'s midpoint movement',
      'Wheel zoom with exponential scaling and Alt+wheel rotation',
      'Slider and keyboard fallbacks so desktop users are not excluded',
      'Scale clamped between 40% and 300%',
      'touch-action: none so the browser does not claim the gesture',
      'Double-click and Reset for recovery',
    ],
    useCases: [
      { icon: 'MOBILE', title: 'Photo, map and canvas viewers', desc: `Add natural gestures to any surface. For pan-and-zoom on diagrams see the [Panzoom floor plan](/ui-snippets/panzoom-zoomable-floor-plan/).` },
      { icon: 'DESIGN', title: 'Sticker and collage editors', desc: `Let users place, scale and rotate stickers with two fingers.` },
      { icon: 'SHOP', title: 'Product try-on and preview tools', desc: `Position an item over a photo with gestures.` },
      { icon: 'LEARN', title: 'Learning gesture maths', desc: `See how scale and rotation deltas compose with drag into one transform.` },
    ],
    faqs: [
      { q: 'What do ds and da mean in Interact.js gesture events?', a: 'ds is the change in scale ratio since the last event, and da is the change in angle in degrees.' },
      { q: 'Why does pinching zoom the whole page instead of my element?', a: 'Add touch-action: none to the element so the browser does not use the gesture for page zoom or scroll.' },
      { q: 'How do I support mouse users?', a: 'Provide fallbacks that edit the same state: wheel to zoom, Alt+wheel to rotate, sliders and keyboard shortcuts.' },
      { q: 'Why is the wheel listener not passive?', a: 'Calling preventDefault to stop page scrolling is ignored on passive listeners, so register with { passive: false }.' },
      { q: 'Why use exponential zoom for the wheel?', a: 'Multiplying by exp(-delta * k) makes each notch change scale by the same ratio, so zoom speed feels consistent at any level.' },
      { q: 'How do I keep several inputs from overwriting each other?', a: 'Keep a single state object and a single function that writes the transform, and have every input edit the state.' },
      { q: 'Can I use this pinch-zoom surface in React, Vue, or Angular?', a: 'Yes. Use the JSX, Vue, Angular or Tailwind export buttons on this page to convert the markup and styles. The behaviour comes from Interact.js, so in a framework project install it with npm install interactjs instead of the CDN tag, register it in useEffect / onMounted / ngAfterViewInit and keep the position in component state, and release it with interact(element).unset() when the component unmounts.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant like Claude to zoom toward the pointer position instead of the centre, add inertia after a drag, or support several stickers each with their own transform.`,
      prompt: `Build a pinch-zoom and rotate surface with Interact.js 1.10 loaded from a CDN.

Requirements:
- Keep one state object { x, y, scale, angle } and an apply() function that sets transform: translate() rotate() scale() on a photo card.
- Use interact(card).draggable(...) to add dx/dy and .gesturable(...) to multiply scale by (1 + e.ds), add e.da to the angle and add e.dx/e.dy for the two-finger pan; clamp scale to 0.4-3.
- Add wheel zoom (exponential, passive: false), Alt+wheel rotation, Zoom and Rotate range sliders, keyboard shortcuts (arrows, +/-, [ ]) and double-click/Reset, all editing the same state.
- Set touch-action: none on the stage and make it focusable with an aria-label.`,
    },
  },
};

export default interactjsPinchZoomRotateSurface;
