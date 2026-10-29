const emblaCarouselAutoScrollLogos = {
  id: 'embla-carousel-auto-scroll-logos',
  title: 'Embla Carousel Auto-Scroll Logo Marquee',
  lastmod: '2026-10-29',
  category: 'carousels',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/embla-carousel@8.6.0/embla-carousel.umd.js',
    'https://cdn.jsdelivr.net/npm/embla-carousel-auto-scroll@8.6.0/embla-carousel-auto-scroll.umd.js',
  ],
  html: `<section class="eal">
  <div class="eal-head">
    <span class="eal-kicker">Customers</span>
    <h2 class="eal-title">Trusted by 4,000+ teams worldwide</h2>
    <p class="eal-sub">From fast-moving startups to global brands, teams ship with us every day.</p>
  </div>
  <div class="eal-row">
    <div class="eal-viewport" id="ealTop"><div class="eal-container" id="ealTopList"></div></div>
    <div class="eal-viewport" id="ealBottom"><div class="eal-container" id="ealBottomList"></div></div>
  </div>
  <div class="eal-foot">
    <div class="eal-stats">
      <div><b>4.9/5</b><span>average rating</span></div>
      <div><b>120+</b><span>countries</span></div>
      <div><b>99.9%</b><span>uptime</span></div>
    </div>
    <div class="eal-controls">
      <button type="button" id="ealToggle" aria-pressed="false"></button>
      <label>Speed <input type="range" id="ealSpeed" min="0.4" max="3" step="0.2" value="1.2"><output id="ealSpeedOut">1.2&times;</output></label>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#eef1f8;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.eal{width:100%;max-width:980px;text-align:center;background:#fff;border-radius:28px;padding:44px 0 30px;overflow:hidden;
  background-image:radial-gradient(circle at 50% -20%,#e0e7ff,transparent 55%);box-shadow:0 24px 60px rgba(30,41,59,.12),0 2px 6px rgba(30,41,59,.05)}
.eal-head{padding:0 24px;margin-bottom:30px}
.eal-kicker{display:inline-block;font-size:11px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#4f46e5;background:#eef2ff;border:1px solid #c7d2fe;padding:5px 14px;border-radius:99px}
.eal-title{margin-top:16px;font-size:clamp(24px,4vw,34px);font-weight:800;letter-spacing:-.02em;color:#0f172a;line-height:1.15}
.eal-sub{margin:10px auto 0;max-width:540px;font-size:15px;color:#64748b;line-height:1.55}

.eal-row{display:grid;gap:16px;padding:6px 0;
  /* Fade the edges so logos appear and disappear softly. */
  -webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);
          mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)}
.eal-viewport{overflow:hidden;padding:6px 0}
.eal-container{display:flex;touch-action:pan-y pinch-zoom;cursor:grab}
.eal-container:active{cursor:grabbing}
.eal-slide{flex:0 0 auto;min-width:0;padding:0 8px}
.eal-logo{display:flex;align-items:center;gap:12px;height:62px;padding:0 24px 0 18px;background:#fff;border:1px solid #e8ecf4;border-radius:16px;color:#475569;font-weight:700;font-size:17px;letter-spacing:-.01em;white-space:nowrap;box-shadow:0 4px 12px rgba(30,41,59,.05);user-select:none;transition:color .2s,border-color .2s,transform .2s,box-shadow .2s}
.eal-logo:hover{color:#0f172a;border-color:#c7d2fe;transform:translateY(-3px);box-shadow:0 12px 24px rgba(79,70,229,.14)}
.eal-mark{width:28px;height:28px;flex:0 0 auto;border-radius:9px;box-shadow:inset 0 -3px 0 rgba(0,0,0,.14)}
.eal-mark.circle{border-radius:50%}
.eal-mark.diamond{border-radius:0;clip-path:polygon(50% 0,100% 50%,50% 100%,0 50%)}
.eal-mark.triangle{border-radius:0;clip-path:polygon(50% 4%,100% 92%,0 92%)}
.eal-mark.hex{border-radius:0;clip-path:polygon(25% 3%,75% 3%,100% 50%,75% 97%,25% 97%,0 50%)}

.eal-foot{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px 28px;margin:30px 36px 0;padding-top:22px;border-top:1px solid #eef1f6}
.eal-stats{display:flex;gap:28px}
.eal-stats div{text-align:left}
.eal-stats b{display:block;font-size:20px;font-weight:800;color:#0f172a;letter-spacing:-.01em}
.eal-stats span{font-size:12px;color:#64748b}
.eal-controls{display:flex;align-items:center;gap:16px;font-size:12.5px;font-weight:600;color:#475569}
.eal-controls button{display:inline-flex;align-items:center;gap:7px;border:1px solid #cbd5e1;background:#fff;border-radius:999px;padding:8px 16px;font:700 12.5px system-ui;color:#334155;cursor:pointer;transition:border-color .15s,background .15s}
.eal-controls button:hover{border-color:#6366f1;background:#f5f6ff}
.eal-controls button:focus-visible{outline:2px solid #6366f1;outline-offset:2px}
.eal-controls button svg{width:12px;height:12px;fill:currentColor}
.eal-controls label{display:flex;align-items:center;gap:10px}
.eal-controls input{width:110px;accent-color:#6366f1}
.eal-controls output{min-width:30px;text-align:right;font-variant-numeric:tabular-nums;color:#4f46e5}
@media (max-width:600px){.eal-foot{justify-content:center;margin:26px 18px 0}.eal-stats{gap:20px}}`,

  js: `var BRANDS = [
  ['Northwind', '#6366f1', 'square'], ['Lumen', '#f59e0b', 'circle'], ['Parcelly', '#10b981', 'hex'], ['Orbital', '#0ea5e9', 'circle'],
  ['Kitewire', '#ec4899', 'diamond'], ['Hexa', '#8b5cf6', 'hex'], ['Tidepool', '#14b8a6', 'triangle'], ['Brightline', '#ef4444', 'square'],
  ['Moss & Co', '#65a30d', 'diamond'], ['Quanta', '#3b82f6', 'triangle'],
];

function fill(listId, brands) {
  var el = document.getElementById(listId);
  // Auto-scroll with loop needs enough content to cover the viewport at
  // least once; repeating the set avoids a visible gap on wide screens.
  brands.concat(brands).forEach(function (b) {
    el.insertAdjacentHTML('beforeend',
      '<div class="eal-slide"><div class="eal-logo"><span class="eal-mark ' + b[2] + '" style="background:linear-gradient(135deg,' + b[1] + ',' + b[1] + 'aa)"></span>' + b[0] + '</div></div>');
  });
}
fill('ealTopList', BRANDS);
fill('ealBottomList', BRANDS.slice().reverse());

var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// AutoScroll moves continuously (pixels per frame) instead of jumping
// between slides. dragFree lets a grab-and-throw feel natural.
function make(id, direction, speed) {
  var plugin = EmblaCarouselAutoScroll({
    speed: speed,
    direction: direction,
    startDelay: 0,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: !paused,
  });
  var api = EmblaCarousel(document.getElementById(id), { loop: true, dragFree: true }, [plugin]);
  return { api: api, plugin: plugin };
}

var paused = reduce;
var rows = [make('ealTop', 'forward', 1.2), make('ealBottom', 'backward', 1.2)];

var toggle = document.getElementById('ealToggle');
var ICON_PAUSE = '<svg viewBox="0 0 12 12"><rect x="1.5" y="1" width="3" height="10" rx="1"/><rect x="7.5" y="1" width="3" height="10" rx="1"/></svg>';
var ICON_PLAY = '<svg viewBox="0 0 12 12"><path d="M2.5 1.2v9.6a.6.6 0 0 0 .9.5l7.6-4.8a.6.6 0 0 0 0-1L3.4.7a.6.6 0 0 0-.9.5z"/></svg>';
function render() {
  toggle.innerHTML = (paused ? ICON_PLAY + 'Play' : ICON_PAUSE + 'Pause');
  toggle.setAttribute('aria-pressed', String(paused));
}
render();
toggle.addEventListener('click', function () {
  paused = !paused;
  rows.forEach(function (r) { if (paused) r.plugin.stop(); else r.plugin.play(); });
  render();
});

// Speed is a plugin option, so changing it means re-initialising each
// carousel with a fresh plugin instance.
var speedOut = document.getElementById('ealSpeedOut');
document.getElementById('ealSpeed').addEventListener('input', function (e) {
  speedOut.textContent = Number(e.target.value).toFixed(1) + '×';
});
document.getElementById('ealSpeed').addEventListener('change', function (e) {
  var speed = Number(e.target.value);
  rows = rows.map(function (r, i) {
    r.api.destroy();
    return make(i === 0 ? 'ealTop' : 'ealBottom', i === 0 ? 'forward' : 'backward', speed);
  });
});`,

  seo: {
    title: 'Embla Auto-Scroll Logo Marquee: Two-Row Logo Strip',
    description: `Two-row "trusted by" logo marquee with Embla Auto Scroll: opposite directions, drag with momentum, pause on hover, speed slider, stats. Copy HTML, CSS & JS.`,
    about: {
      title: 'Embla Auto Scroll — A Logo Marquee You Can Also Grab',
      description: `Logo marquees are usually pure CSS animations: cheap, smooth, and impossible to interact with. Embla's Auto Scroll plugin gives the same continuous motion while keeping a real carousel underneath, so visitors can grab the strip, throw it, and let it carry on.

**Continuous motion, not slide steps**

\`EmblaCarouselAutoScroll({ speed })\` moves the track a fixed number of pixels per frame instead of snapping between slides. Combined with \`loop: true\` and \`dragFree: true\`, the strip becomes an endless belt that can be dragged with momentum. \`direction: 'backward'\` on the second row makes the rows drift past each other.

**Enough content to loop**

Embla's loop needs slides that cover more than the viewport, otherwise it can't reposition slides out of sight. Ten logos might be too few on a wide screen, so each row renders its set twice.

**Interaction settings**

\`stopOnMouseEnter\` pauses while the pointer is over a row, so visitors can read a logo. \`stopOnInteraction: false\` resumes scrolling after a drag instead of stopping forever.

**Pause and speed controls**

A visible pause button (WCAG 2.2.2 requires one for motion longer than five seconds) calls \`plugin.stop()\` and \`plugin.play()\` on both rows. Speed is a plugin option, not a method, so the slider destroys each carousel and re-creates it with a fresh plugin, which is the documented way to change plugin options.

**Soft edges**

A horizontal \`mask-image\` gradient fades logos in and out at both ends, avoiding a hard cut at the container edge.

**A section, not just a strip**

The marquee sits inside a rounded card with a kicker pill, a headline and a one-line subtitle, and a footer row with three proof-point stats (rating, countries, uptime) beside the controls. Each logo is a white chip with a soft shadow that lifts and darkens on hover, and the placeholder marks use five shapes (square, circle, hexagon, diamond, triangle) with a gradient fill, so the demo reads like a real customer wall. The speed slider shows its current value (for example 1.2×), and the pause button swaps between a pause and a play icon.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Load Embla and Auto Scroll', text: `Include the core and embla-carousel-auto-scroll UMD builds.` },
      { title: 'Paste the snippet', text: `Two logo rows drift in opposite directions.` },
      { title: 'Grab a row', text: `Drag and release; it glides, then keeps scrolling.` },
      { title: 'Pause or change speed', text: `Use the Pause/Play button and the speed slider (it shows the value, like 1.2×) under the rows.` },
      { title: 'Add your logos', text: `Replace BRANDS with names, colours and a mark shape, or use img tags in the slides, then edit the headline, subtitle and stats.` },
    ] },
    features: [
      { title: 'Auto Scroll plugin', text: `Continuous pixel-per-frame motion.` },
      { title: 'Opposite-direction rows', text: `direction: 'backward' on the second row.` },
      { title: 'Draggable with momentum', text: `loop plus dragFree.` },
      { title: 'Hover pause', text: `stopOnMouseEnter for reading.` },
      { title: 'Pause button', text: `Stops both rows for motion-sensitive users.` },
      { title: 'Speed control', text: `Slider with a live value label; re-initialises with a new plugin instance.` },
      { title: 'Edge fade mask', text: `Soft appear and disappear at both sides.` },
      { title: 'Logo chips that lift', text: `White chips with soft shadows rise and darken on hover.` },
      { title: 'Section layout', text: `Kicker pill, headline, subtitle and a stats footer around the strip.` },
      { title: 'Shaped placeholder marks', text: `Square, circle, hexagon, diamond and triangle marks with gradient fills.` },
    ],
    useCases: [
      { title: 'Trusted-by strip on a SaaS homepage', text: 'Show customer logos in two rows moving in opposite directions under the hero. Visitors can grab and throw the strip, which a pure CSS marquee cannot offer, and hovering pauses it for reading.' },
      { title: 'Conference sponsor and partner wall', text: 'Rotate sponsor tiers on an event page instead of stacking them in a static grid. Give each row its own `speed` so premium sponsors stay on screen noticeably longer.' },
      { title: 'Press and as-seen-in mentions', text: 'Scroll publication logos as social proof in a footer band. The pause button gives motion-sensitive visitors a way to stop the strip, something CSS-only marquees rarely provide.' },
      { title: 'Integration and tool showcase', text: 'List the apps and APIs your product connects to as a continuous belt. It is a real Embla carousel underneath, so you can keep `dragFree` momentum or drop in your own logo markup.' },
      { title: 'Directory and marketplace headers', text: 'Show hundreds of listed brands or vendors in two endless rows so a directory homepage feels busy and trustworthy. Replace the logo markup with text chips to highlight categories instead of companies.' },
      { icon: 'CODE', title: 'Related: Swiper Infinite Logo Marquee', desc: 'The Swiper version: [Swiper Infinite Logo Marquee with Hover Pause](/ui-snippets/swiper-infinite-logo-marquee/).' },
      { icon: 'CODE', title: 'Related: Logo Marquee (CSS)', desc: 'A pure CSS animation: [Logo Marquee](/ui-snippets/logo-marquee/).' },
    ],
    faqs: [
      { q: 'How do I make a continuous scrolling carousel with Embla?', a: `Use the embla-carousel-auto-scroll plugin with loop: true. It moves the carousel by a set speed each frame. Add dragFree: true so users can throw the strip and it keeps gliding.` },
      { q: 'How do I scroll in the other direction?', a: `Pass direction: 'backward' to the Auto Scroll plugin.` },
      { q: 'Why duplicate the logos?', a: `Embla's loop needs enough slides to fill more than the viewport so slides can be moved out of sight before they reappear. Repeating a short list prevents a gap on wide screens.` },
      { q: 'How do I change the speed at runtime?', a: `Speed is a plugin option, so destroy the carousel and re-create it with a new plugin instance using the new speed.` },
      { q: 'Is a logo marquee accessible?', a: `Motion that lasts more than five seconds should be pausable (WCAG 2.2.2). Provide a pause button, pause on hover, and don't autoplay for users who prefer reduced motion. Logos should have text alternatives when they are images.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI assistant like Claude and ask it to explain why the logo list is duplicated and why changing speed requires re-initialising. Ask it to use real SVG logos with alt text, link each logo to a case study, or slow the strip down while a logo is focused, or to add a second pair of rows for premium sponsors. It can also compare this with a pure CSS marquee for performance.`,
      prompt: `Build a two-row "trusted by" logo marquee with Embla Carousel v8 and its Auto Scroll plugin (loaded from a CDN as UMD) in plain HTML, CSS and JavaScript.

Requirements:
- Ten brand logos (a coloured mark and name), rendered twice per row so the loop never shows a gap.
- The top row scrolls forward and the bottom row backward, continuously, looping and draggable with momentum.
- Pause while hovered, resume after a drag, and don't autoplay when the user prefers reduced motion.
- A pause/play button with aria-pressed that stops or starts both rows.
- A speed slider that re-creates both carousels with a new plugin instance at the chosen speed.
- Fade logos in and out at both edges with a CSS mask.
- Present it as a section: a white rounded card with a soft gradient glow, a kicker pill, a headline ("Trusted by 4,000+ teams worldwide") and a subtitle above the rows.
- Style each logo as a white chip with a thin border and soft shadow that lifts, darkens its text and gains a shadow on hover. Give the placeholder marks gradient fills and vary their shape (square, circle, hexagon via clip-path, diamond, triangle).
- A footer row with three stats (4.9/5 average rating, 120+ countries, 99.9% uptime) on the left and the controls on the right, wrapping and centering on small screens.
- The pause button shows a pause or play SVG icon with its label, and the speed slider shows its current value next to it (for example 1.2×) updating as it moves.`,
    },
  },
};

export default emblaCarouselAutoScrollLogos;
