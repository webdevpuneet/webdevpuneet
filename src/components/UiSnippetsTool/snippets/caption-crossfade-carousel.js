const captionCrossfadeCarousel = {
  id: 'caption-crossfade-carousel',
  title: 'Caption Crossfade Carousel',
  lastmod: '2026-09-14',
  category: 'carousels',
  html: `<div class="ccc-wrap" id="cccWrap">
  <div class="ccc-image" id="cccImage"></div>
  <div class="ccc-caption">
    <h2 id="cccTitle"></h2>
    <p id="cccText"></p>
  </div>
  <div class="ccc-dots" id="cccDots"></div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.ccc-wrap{position:relative;width:100%;max-width:480px;height:300px;border-radius:16px;overflow:hidden;box-shadow:0 18px 40px rgba(0,0,0,.5)}
.ccc-image{position:absolute;inset:0;transition:background .6s ease}
.ccc-caption{position:absolute;left:0;right:0;bottom:0;padding:26px 24px 22px;background:linear-gradient(0deg,rgba(0,0,0,.7),transparent)}
.ccc-caption h2{color:#fff;font-size:20px;font-weight:800;margin-bottom:6px;opacity:0;transform:translateY(10px);transition:opacity .4s ease .15s,transform .4s ease .15s}
.ccc-caption p{color:rgba(255,255,255,.85);font-size:13px;opacity:0;transform:translateY(10px);transition:opacity .4s ease .28s,transform .4s ease .28s}
.ccc-wrap.ccc-show h2,.ccc-wrap.ccc-show p{opacity:1;transform:translateY(0)}
.ccc-dots{position:absolute;top:16px;right:16px;display:flex;gap:6px;z-index:2}
.ccc-dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.35);border:none;cursor:pointer;transition:background .2s,width .2s}
.ccc-dot.active{background:#fff;width:20px;border-radius:4px}`,

  js: `var SLIDES = [
  { bg: '#6366f1,#4338ca', title: 'Build faster', text: 'Ship features in days, not sprints.' },
  { bg: '#ec4899,#9d174d', title: 'Scale freely', text: 'Infra that grows without a rewrite.' },
  { bg: '#0ea5e9,#0369a1', title: 'Stay in sync', text: 'Real-time collaboration, built in.' },
];

var wrap = document.getElementById('cccWrap');
var image = document.getElementById('cccImage');
var titleEl = document.getElementById('cccTitle');
var textEl = document.getElementById('cccText');
var dotsWrap = document.getElementById('cccDots');
var current = 0;

SLIDES.forEach(function (s, i) {
  var d = document.createElement('button');
  d.className = 'ccc-dot';
  d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
  d.addEventListener('click', function () { goTo(i); });
  dotsWrap.appendChild(d);
});
var dots = document.querySelectorAll('.ccc-dot');

function render() {
  var s = SLIDES[current];
  // The image crossfades on its own timer (a plain background transition),
  // while the caption is hidden FIRST, its text swapped while invisible, and
  // only then shown again — two independently-timed transitions, staggered
  // slightly (the caption's delay values in CSS), so text never appears to
  // "jump-cut" mid-fade the way it would if both changed in the same instant.
  image.style.background = 'linear-gradient(160deg,' + s.bg + ')';
  wrap.classList.remove('ccc-show');
  window.requestAnimationFrame(function () {
    titleEl.textContent = s.title;
    textEl.textContent = s.text;
    requestAnimationFrame(function () { wrap.classList.add('ccc-show'); });
  });
  dots.forEach(function (d, i) { d.classList.toggle('active', i === current); });
}

function goTo(i) { current = i; render(); }
function next() { goTo((current + 1) % SLIDES.length); }

var timer = setInterval(next, 4500);
function resetTimer() { clearInterval(timer); timer = setInterval(next, 4500); }

dots.forEach(function (d) { d.addEventListener('click', resetTimer); });

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { next(); resetTimer(); }
  else if (e.key === 'ArrowLeft') { goTo((current - 1 + SLIDES.length) % SLIDES.length); resetTimer(); }
});

render();
wrap.classList.add('ccc-show');`,

  seo: {
    title: 'Caption Crossfade Carousel — HTML CSS JS Snippet',
    description: 'A hero carousel where the background crossfades on its own timer while the caption independently fades out, swaps its text while invisible, then fades back in — two staggered transitions, not one. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Caption Crossfade Carousel — Two Independently-Timed Fades, Not One',
      description: `A naive crossfade carousel just swaps everything — image and text — at the same instant behind one opacity transition, which makes the caption feel like it's cutting rather than fading. This snippet treats the background image and the caption as *two separate transitions on two separate clocks*: the background crossfades via a plain CSS \`background\` transition, while the caption is explicitly hidden, has its text content swapped while fully invisible, and is only then faded back in — its heading and paragraph carrying their own staggered \`transition-delay\` values so the title settles slightly before the description does.\n\n**Why the text swap happens inside a requestAnimationFrame, not immediately**\n\nRemoving \`.ccc-show\` (starting the caption's fade-out) and changing \`textContent\` in the very same synchronous line would mean the browser never actually paints the "faded out" state before the new text appears — the fade-out transition would have nothing to visibly transition from. Wrapping the text swap in \`requestAnimationFrame\` forces a real paint of the hidden state first, so the *subsequent* fade back in is genuinely animating from invisible-with-new-text, not skipping straight to visible.\n\n**Autoplay that resets cleanly on manual interaction**\n\nA \`setInterval\` drives automatic advancing, but every manual navigation — a dot click or an arrow key — calls \`resetTimer()\`, which clears and re-creates that interval. That's what stops a slow reader's manual click from being immediately overridden by an autoplay tick that was already halfway through its countdown before they interacted.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A hero appears with its background and caption both fading into view.' },
        { title: 'Wait for autoplay', text: 'Every 4.5 seconds, the background crossfades while the caption independently fades out, changes, and fades back in.' },
        { title: 'Click a dot', text: 'Jump directly to that slide — the autoplay timer resets so it doesn\'t interrupt too soon afterward.' },
        { title: 'Use arrow keys', text: 'Left/Right navigate manually, also resetting the autoplay timer.' },
        { title: 'Watch the stagger closely', text: 'Notice the heading finishes fading in slightly before the description — a deliberate delay offset, not a coincidence.' },
      ],
    },
    features: [
      'Background and caption crossfade on genuinely independent transitions, not one shared opacity change',
      'Caption text is swapped only while fully invisible — no jump-cut mid-fade',
      'requestAnimationFrame forces a real paint of the hidden state before the fade-back-in begins',
      'Heading and description have staggered transition delays for a more deliberate, less mechanical entrance',
      'Autoplay via setInterval that cleanly resets on any manual navigation, dot or keyboard',
      'Fully data-driven slide content from one array — no duplicated markup per slide',
    ],
    useCases: [
      { icon: '🎯', title: 'Marketing hero carousels', desc: 'Give a hero a more polished feel, where the background fades on its own timer while the caption fades out, swaps while invisible and fades back in.' },
      { icon: '📰', title: 'Editorial rotators', desc: 'Use staggered caption entrances for magazine-style editorial features, with heading and description on separate transition delays for a deliberate feel.' },
      { icon: '🖼️', title: 'Portfolio hero banners', desc: 'Showcase several projects, with `requestAnimationFrame` forcing a real paint of the hidden state before the fade back in.' },
      { icon: '📱', title: 'App feature banners', desc: 'Rotate feature headlines with captions that never jump-cut mid-fade, since text is only swapped while fully invisible.' },
      { icon: '🎓', title: 'Two-transition teaching', desc: 'Study why independent staggered transitions feel more deliberate than one shared opacity change applied to image and text together.' },
    ],
    faqs: [
      { q: 'Why does the caption use requestAnimationFrame instead of just changing the text directly?', a: 'Removing the visible class and changing textContent in the same synchronous step would mean the browser batches both changes into one paint — there\'s no visible "faded out" moment for the fade-back-in to animate from. Deferring the text change to the next animation frame forces the hidden state to actually render first.' },
      { q: 'How do I change the autoplay speed?', a: 'Change the 4500 (milliseconds) passed to setInterval in two places — the initial timer creation and inside resetTimer, which must both use the same value to stay consistent.' },
      { q: 'How is the heading/description stagger controlled?', a: 'The transition-delay values in the CSS (.15s for the heading, .28s for the paragraph) control how much later each element starts its fade-in relative to when .ccc-show is added — increase the gap between them for a more pronounced stagger.' },
      { q: 'Why does clicking a dot reset the autoplay timer?', a: 'Without resetTimer(), a manual navigation could be immediately followed by an autoplay tick that was already most of the way through its own countdown — resetting gives a full autoplay interval after every manual interaction, so a reader always gets a fair amount of time before the next automatic change.' },
      { q: 'Is it accessible?', a: 'Dots are real labeled buttons and the carousel is fully operable via Left/Right arrow keys; add prefers-reduced-motion handling to shorten or remove the fade transitions, and consider pausing autoplay entirely for users who\'ve requested reduced motion.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the caption's text content is changed inside a requestAnimationFrame callback rather than immediately after removing the visible class, and what visual artifact would appear if that were skipped. It's also worth asking the assistant to add a pause-on-hover behavior for the autoplay timer (similar to the Autoplay Progress-Bar Carousel snippet elsewhere in this library), or to add prefers-reduced-motion handling that disables both the crossfade and the autoplay for users who've requested reduced motion.`,
      prompt: `Build a hero carousel in plain HTML, CSS, and vanilla JavaScript where the background image and the caption text crossfade on two independently-timed transitions rather than a single shared fade — no library.

Requirements:
- A hero container with a background element that crossfades between different background styles using a plain CSS transition on the background property, and a separately-positioned caption overlay containing a heading and a description paragraph.
- The caption's heading and paragraph must each have their own opacity and transform-based fade-in transition, with the paragraph's transition-delay slightly longer than the heading's, so the two elements visibly settle into place at slightly different moments rather than simultaneously.
- On every slide change: first remove a "visible" state class from the caption (triggering its fade-out), then update the heading and paragraph's text content to the new slide's content only once that hidden state has actually been given a chance to paint (using requestAnimationFrame to defer the text change, not changing it in the same synchronous step as hiding the caption), and only after that text change re-add the "visible" state class to trigger the fade back in with the new content already in place.
- Automatic slide advancement on a fixed timer (e.g. every 4-5 seconds) using setInterval, where the JavaScript slide data (background style, heading text, description text) lives in a single array, not duplicated markup per slide.
- A row of dynamically generated indicator dots that jump directly to a specific slide when clicked, and Left/Right arrow key support for manual navigation.
- Any manual navigation (clicking a dot or pressing an arrow key) must reset the autoplay timer, so a manual interaction is not immediately followed by an autoplay-triggered change that was already mid-countdown.`,
    },
  },
};

export default captionCrossfadeCarousel;
