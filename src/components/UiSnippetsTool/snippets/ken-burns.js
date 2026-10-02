const kenBurns = {
  id: 'ken-burns',
  title: 'Ken Burns Slideshow',
  lastmod: '2026-06-24',
  category: 'carousels',
  html: `<div class="kb-stage" id="kbStage">
  <div class="kb-slides" id="kbSlides"></div>
  <div class="kb-overlay">
    <h2 id="kbCap"></h2>
    <div class="kb-dots" id="kbDots"></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.kb-stage{position:relative;width:100%;max-width:560px;height:340px;border-radius:18px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.4)}
.kb-slides{position:absolute;inset:0}
.kb-slide{position:absolute;inset:0;opacity:0;transition:opacity 1.2s ease;background-size:cover;background-position:center;will-change:transform,opacity}
.kb-slide.kb-on{opacity:1}
/* The slow pan-zoom: the active slide drifts/zooms over the display duration. */
.kb-slide.kb-on{animation:kbPan 7s ease-out forwards}
@keyframes kbPan{from{transform:scale(1.18) translate(3%,2%)}to{transform:scale(1) translate(-2%,-2%)}}

.kb-overlay{position:absolute;inset:0;display:flex;flex-direction:column;justify-content:flex-end;padding:24px;background:linear-gradient(transparent 45%,rgba(0,0,0,.6));pointer-events:none}
.kb-overlay h2{color:#fff;font-size:24px;font-weight:800;text-shadow:0 2px 12px rgba(0,0,0,.6);transition:opacity .5s;letter-spacing:-.01em}
.kb-dots{display:flex;gap:7px;margin-top:14px;pointer-events:auto}
.kb-dot{width:8px;height:8px;border-radius:50%;background:rgba(255,255,255,.45);border:none;cursor:pointer;padding:0;transition:background .2s,width .2s}
.kb-dot.kb-active{background:#fff;width:22px;border-radius:4px}`,

  js: `var SLIDES = [
  { grad: 'linear-gradient(135deg,#6366f1,#8b5cf6)', cap: 'Mountain sunrise' },
  { grad: 'linear-gradient(135deg,#0ea5e9,#22c55e)', cap: 'Coastal cliffs' },
  { grad: 'linear-gradient(135deg,#f59e0b,#ef4444)', cap: 'Desert dunes' },
  { grad: 'linear-gradient(135deg,#ec4899,#8b5cf6)', cap: 'City at dusk' },
];
// In production use real photos: { img: 'photo.jpg', cap: '...' } and set
// backgroundImage to url(img).

var slidesEl = document.getElementById('kbSlides');
var dotsEl = document.getElementById('kbDots');
var cap = document.getElementById('kbCap');
var current = 0, timer = null, DURATION = 6000;

slidesEl.innerHTML = SLIDES.map(function (s) {
  return '<div class="kb-slide" style="background-image:' + (s.img ? 'url(' + s.img + ')' : s.grad) + '"></div>';
}).join('');
dotsEl.innerHTML = SLIDES.map(function (_, i) {
  return '<button type="button" class="kb-dot" data-i="' + i + '" aria-label="Slide ' + (i + 1) + '"></button>';
}).join('');
var slides = slidesEl.querySelectorAll('.kb-slide');
var dots = dotsEl.querySelectorAll('.kb-dot');

function show(i) {
  slides.forEach(function (s, k) {
    // Re-trigger the pan animation on the incoming slide by removing/re-adding.
    s.classList.toggle('kb-on', k === i);
    if (k === i) { s.style.animation = 'none'; void s.offsetWidth; s.style.animation = ''; }
  });
  dots.forEach(function (d, k) { d.classList.toggle('kb-active', k === i); });
  cap.style.opacity = 0;
  setTimeout(function () { cap.textContent = SLIDES[i].cap; cap.style.opacity = 1; }, 250);
  current = i;
}

function next() { show((current + 1) % SLIDES.length); }

function play() { clearInterval(timer); timer = setInterval(next, DURATION); }

dotsEl.addEventListener('click', function (e) {
  var dot = e.target.closest('.kb-dot');
  if (dot) { show(+dot.dataset.i); play(); }   // reset the timer on manual nav
});

// Pause on hover so viewers can read a caption.
document.getElementById('kbStage').addEventListener('mouseenter', function () { clearInterval(timer); });
document.getElementById('kbStage').addEventListener('mouseleave', play);

show(0);
play();`,

  seo: {
    title: 'Ken Burns Slideshow — Pan-Zoom Image Slider HTML CSS JS',
    description: `A Ken Burns slideshow — images slowly pan and zoom while crossfading, with caption, dot nav, autoplay, and hover-pause. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Ken Burns Slideshow — Slow Pan-and-Zoom Crossfading Image Slider',
      description: `The Ken Burns effect — named for the documentary filmmaker — brings still images to life by slowly panning and zooming across them. Applied to a slideshow, it turns a static gallery into cinematic motion. This snippet builds it in plain HTML, CSS, and vanilla JavaScript: slides that drift and zoom while crossfading, with captions, dot navigation, autoplay, and hover-pause — no library.

**The pan-zoom is one keyframe**

Each active slide runs a \`@keyframes\` that animates its \`transform\` from a slightly zoomed, offset start to a different scale and position over several seconds — a slow drift across the image. Because it animates \`transform\` (scale and translate), it is GPU-accelerated and smooth, and the image is sized \`background-size: cover\` so it always fills the frame even as it scales. Varying both scale and translate is what gives the effect its characteristic gentle camera-move feel rather than a plain zoom.

**Re-triggering the motion per slide**

The subtle bit: the pan animation must restart each time a slide becomes active, or only the first slide would ever move. When showing a slide, the snippet sets \`animation: none\`, forces a reflow (\`void offsetWidth\`), then clears it — the standard reflow trick that restarts a CSS animation. So every slide gets a fresh pan as it comes in, not just on initial load.

**Crossfade, not cut**

Slides are stacked and transition their \`opacity\`, so the outgoing image fades as the incoming one appears — a soft crossfade rather than a hard cut. Combined with the continuing pan underneath, the transition feels filmic. The caption fades out and back in on each change so text never abruptly swaps.

**Autoplay with considerate controls**

It advances automatically on an interval, but pauses while the pointer is over the stage so viewers can read a caption or study an image, and resumes on leave. Dot navigation lets you jump to any slide and resets the timer so a manual pick is not immediately overridden. These touches — hover-pause, timer reset on manual nav, active-dot indicator — are what separate a polished slideshow from a bare auto-rotator.

**Drop-in with real photos**

The demo uses gradients so it runs with no assets, but each slide accepts an \`img\` URL — set the background to your photo and it pans across the real image. Tune the durations, the pan keyframe start/end, and the crossfade length to taste. It is a clear, dependency-free reference for the Ken Burns transform animation, CSS-animation re-triggering, and a considerate autoplay slideshow. Worth keeping in mind with real photography: because the pan keyframe both scales up and translates the image, a tightly cropped subject can drift toward the edge of frame at the animation's extremes — leaving a little extra margin around the subject when sourcing or cropping images gives the pan room to move without ever cutting off the thing the photo is actually about. \`will-change: transform, opacity\` is set on every slide for the same reason performance-sensitive carousels use it: it hints to the browser to promote the element to its own compositor layer ahead of time, so the very first frame of a pan-zoom doesn't stutter while the browser allocates that layer mid-animation.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A slideshow renders, each slide slowly panning and zooming while crossfading.` },
      { title: 'Let it autoplay', text: `Slides advance on an interval; the caption and active dot update each time.` },
      { title: 'Navigate manually', text: `Click a dot to jump to a slide; the autoplay timer resets so it is not skipped.` },
      { title: 'Hover to pause', text: `Move the pointer over the stage to pause; leave to resume.` },
      { title: 'Use real photos', text: `Give each SLIDES entry an img URL — the pan-zoom plays over your image.` },
      { title: 'Tune the motion', text: `Adjust the kbPan keyframe and durations for a stronger or subtler effect.` },
    ] },
    features: [
      { title: 'Transform-based pan-zoom', text: `A keyframe animates scale and translate, so the motion is GPU-smooth.` },
      { title: 'Cover-sized images', text: `background-size: cover keeps the frame filled as the image scales.` },
      { title: 'Per-slide re-trigger', text: `A reflow trick restarts the pan animation each time a slide becomes active.` },
      { title: 'Opacity crossfade', text: `Stacked slides fade between each other for a soft, filmic transition.` },
      { title: 'Fading captions', text: `Captions fade out and back in on change instead of snapping.` },
      { title: 'Hover-pause autoplay', text: `Pauses while hovered so viewers can read, resumes on leave.` },
      { title: 'Dot nav with timer reset', text: `Jump to any slide; manual nav resets the interval.` },
      { title: 'Photo-ready & no library', text: `Swap gradients for img URLs; plain HTML/CSS/JS with zero dependencies.` },
    ],
    useCases: [
      { title: 'Hero and banner slideshows', text: 'Add cinematic motion behind a headline, with a keyframe animating scale and translate so slow pan and zoom stays smooth.' },
      { title: 'Photo galleries and portfolios', text: 'Bring still images to life with stacked slides that crossfade, and compare with a standard [photo gallery](/ui-snippets/photo-gallery/) for grid browsing.' },
      { title: 'Travel and real estate listings', text: 'Showcase places with gentle motion, using `background-size: cover` so the frame stays filled as the image scales.' },
      { title: 'Product and lookbook showcases', text: 'Pan across product photography, with a reflow trick restarting the animation every time a slide becomes active.' },
      { title: 'Landing page backgrounds', text: 'Provide an animated image backdrop as a lighter alternative to a [video background hero](/ui-snippets/video-bg-hero/), with caption, dots and hover pause.' },
      { icon: 'CODE', title: 'Related: Pixi.js Particle Field', desc: 'See the [Pixi.js Particle Field](/ui-snippets/pixi-particle-field/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the Ken Burns pan-zoom done?', a: `Each active slide runs a @keyframes animation on its transform, going from a slightly larger scale with one offset to a different scale and offset over several seconds. Because it animates transform (scale + translate) rather than width/height or background-position, it is GPU-accelerated and smooth. background-size: cover keeps the image filling the frame at every scale.` },
      { q: 'Why does the pan need to be re-triggered each slide?', a: `A CSS animation runs once when applied; if the keyframes are already on the element, switching which slide is active will not replay them. So when a slide becomes active, the code sets animation: none, reads offsetWidth to force a reflow, then clears the inline animation — the standard trick to restart a CSS animation. Without it, only the first slide would ever pan.` },
      { q: 'How do I use real images instead of gradients?', a: `Each SLIDES entry supports an img property; the code sets the slide background to url(img) when present (falling back to the gradient otherwise). Just provide image URLs (and captions), and the pan-zoom and crossfade play over your photos. Use appropriately sized images since they are scaled up slightly by the effect.` },
      { q: 'Why pause on hover?', a: `Autoplay is convenient but can advance before a viewer finishes reading a caption or looking at an image. Pausing when the pointer enters the stage (and resuming on leave) gives the viewer control without needing an explicit pause button. Manual dot navigation also resets the timer so your chosen slide is not immediately replaced by the next auto-advance.` },
      { q: 'How do I use this slideshow in React, Vue, or Angular?', a: `Hold the current index in state and render slides/dots from an array. Run the autoplay interval in a useEffect (React), onMounted/onUnmounted (Vue), or ngOnInit/ngOnDestroy (Angular), clearing it on cleanup, and pause it on hover handlers. The transform keyframe and crossfade CSS are framework-agnostic; for the re-trigger, toggle a key or class so the incoming slide remounts/replays.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to guess why the pan animation only played once yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why setting animation to none, reading offsetWidth, then clearing the inline style is required to replay the kbPan keyframe on each new slide, or what will-change: transform, opacity is actually buying you on the compositor. The same assistant can help optimize it, for example checking whether crossfading many high-resolution background images at once causes jank on lower-end devices, or whether preloading the next slide's image ahead of time would smooth the transition. It is just as useful for extending the effect, such as varying the pan direction and duration per slide instead of using one fixed keyframe for all of them, adding swipe gestures for touch users alongside the existing dot navigation, or synchronizing the caption's entrance timing more tightly with the crossfade. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "Ken Burns" pan-and-zoom crossfading slideshow in plain HTML, CSS, and JavaScript using only CSS transform keyframes for the motion — no canvas, no video, no animation library.

Requirements:
- A stage element containing a stack of absolutely positioned slide elements, each with its background image or gradient set to cover the frame (background-size: cover, background-position: center).
- Only the currently active slide should be visible, controlled by toggling a class that sets opacity to 1 with a CSS transition, so switching slides crossfades rather than cuts.
- The active slide must also run a CSS keyframe animation on its transform property that goes from a larger scale plus one offset to a different scale plus a different offset over several seconds, producing a slow drift-and-zoom. Mark these slide elements with will-change: transform, opacity.
- Because a CSS animation does not replay just from toggling a class if the keyframes were already assigned, when a new slide becomes active you must explicitly restart its pan animation: set its animation property to none, force a synchronous reflow by reading a layout-triggering property like offsetWidth, then clear the inline animation override so the keyframes run again from the start.
- A caption element that fades out and back in (not an abrupt swap) whenever the slide changes, plus a row of dot buttons — one per slide — where the active slide's dot is visually distinct, and clicking any dot jumps directly to that slide.
- Autoplay via setInterval that advances to the next slide on a fixed duration, but the interval must clear when the pointer enters the stage and restart when it leaves, and clicking a dot must reset the autoplay timer so the next automatic advance is not immediate.`,
    },
  },
};

export default kenBurns;
