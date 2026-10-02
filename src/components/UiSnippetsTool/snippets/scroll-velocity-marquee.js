const scrollVelocityMarquee = {
  id: 'scroll-velocity-marquee',
  title: 'Scroll Velocity Marquee',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<div class="sv-page">
  <div class="sv-spacer">↓ scroll to speed up the marquee ↓</div>
  <div class="sv-rows">
    <div class="sv-row" data-dir="1"><div class="sv-track" id="svTrackA"></div></div>
    <div class="sv-row" data-dir="-1"><div class="sv-track" id="svTrackB"></div></div>
  </div>
  <div class="sv-spacer">keep scrolling — the words skew with velocity</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a0f;color:#f4f4f8}

.sv-page{min-height:240vh}
.sv-spacer{height:60vh;display:flex;align-items:center;justify-content:center;color:#5b5b72;font-size:14px;letter-spacing:.04em}

.sv-rows{display:flex;flex-direction:column;gap:14px;padding:30px 0}
.sv-row{overflow:hidden;white-space:nowrap;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.sv-track{display:inline-flex;will-change:transform}
.sv-item{display:inline-flex;align-items:center;gap:26px;padding:0 26px;font-size:clamp(34px,7vw,72px);font-weight:900;letter-spacing:-.03em;text-transform:uppercase}
.sv-item span{color:transparent;-webkit-text-stroke:1.4px #6d28d9}
.sv-item.fill span{color:#a78bfa;-webkit-text-stroke:0}
.sv-dot{width:14px;height:14px;border-radius:50%;background:#22d3ee;flex-shrink:0}`,

  js: `var WORDS = ['Design', 'Build', 'Ship', 'Repeat'];

function fillTrack(track) {
  var html = '';
  for (var r = 0; r < 4; r++) {
    WORDS.forEach(function (w, i) {
      html += '<span class="sv-item' + (i % 2 ? ' fill' : '') + '"><span>' + w + '</span><i class="sv-dot"></i></span>';
    });
  }
  track.innerHTML = html;
}

var rows = Array.prototype.slice.call(document.querySelectorAll('.sv-row')).map(function (row) {
  var track = row.querySelector('.sv-track');
  fillTrack(track);
  return {
    track: track,
    dir: parseFloat(row.getAttribute('data-dir')),
    pos: 0,
    width: 0
  };
});

requestAnimationFrame(function () {
  rows.forEach(function (r) { r.width = r.track.scrollWidth / 2; });
});

// Track scroll velocity: difference in scrollY between frames.
var lastScroll = window.scrollY, velocity = 0;
window.addEventListener('scroll', function () {
  velocity = window.scrollY - lastScroll;
  lastScroll = window.scrollY;
}, { passive: true });

var BASE = 1.4;     // px per frame at rest
var last = performance.now();

function loop(now) {
  var dt = Math.min((now - last) / 16.67, 3); last = now;
  // Velocity decays each frame so the boost eases out after you stop scrolling.
  velocity *= 0.9;
  var boost = Math.abs(velocity) * 0.25;
  var skew = Math.max(-18, Math.min(18, velocity * 0.4));

  rows.forEach(function (r) {
    if (!r.width) r.width = r.track.scrollWidth / 2;
    var speed = (BASE + boost) * dt * r.dir + velocity * 0.3 * r.dir;
    r.pos -= speed;
    if (r.pos <= -r.width) r.pos += r.width;
    if (r.pos >= 0) r.pos -= r.width;
    r.track.style.transform = 'translateX(' + r.pos + 'px) skewX(' + (skew * r.dir) + 'deg)';
  });
  requestAnimationFrame(loop);
}
requestAnimationFrame(loop);`,

  seo: {
    title: 'Scroll Velocity Marquee — Free HTML CSS JS Snippet',
    description: `A marquee whose speed and skew react to scroll velocity, with a baseline drift, edge fades, and seamless looping. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Velocity Marquee — Speed and Skew Driven by Scrolling',
      description: `The scroll-velocity marquee is the kinetic-typography effect seen on award-winning agency and portfolio sites: rows of giant words drift slowly on their own, but the moment you scroll, they surge in the scroll direction and skew with the momentum — then ease back to a calm baseline when you stop. This snippet implements the whole behavior in plain HTML, CSS, and vanilla JavaScript with no scroll library.

**Measuring scroll velocity**

A passive \`scroll\` listener computes velocity as the simple frame-to-frame delta of \`window.scrollY\`: how many pixels the page moved since the last event. Scrolling down fast yields a large positive value; scrolling up yields a negative one. This raw velocity feeds the animation, so the marquee responds to both how fast and which way you scroll. The listener is marked \`{ passive: true }\` so it never blocks the browser's scrolling.

**A baseline drift plus a boost**

The animation runs in a continuous \`requestAnimationFrame\` loop. Each frame, the track moves by a constant \`BASE\` speed so it always drifts even when the page is still, plus a \`boost\` proportional to the absolute scroll velocity, plus a direct velocity term that shoves it in the scroll direction. Crucially, the stored velocity is multiplied by \`0.9\` every frame, so after you stop scrolling it decays exponentially toward zero — the surge eases out naturally instead of stopping dead.

**The skew that sells the motion**

Speed alone looks mechanical; the effect comes alive because the track also applies \`skewX\`. The skew is computed from velocity and clamped to ±18° so fast scrolls visibly lean the letters like they're being dragged through the air, while a still page sits at 0°. Each row's skew is multiplied by its direction so the two rows lean opposite ways, reinforcing the sense of momentum.

**Opposing rows**

The two rows read a \`data-dir\` of \`1\` and \`-1\`, so they scroll and skew in opposite directions. This counter-motion is what makes the section feel dynamic rather than like a single conveyor belt. The same loop drives both; only the direction multiplier differs.

**Seamless looping and frame-rate independence**

Each track is filled with several repetitions of the word list, and its loop width is measured as \`scrollWidth / 2\`. When the offset passes that width in either direction, it wraps by adding or subtracting the width, landing on an identical frame so there's no visible seam. A \`dt\` factor normalizes each frame against a 16.67ms baseline (and is capped at 3) so the speed stays consistent across refresh rates and survives the occasional dropped frame.

**Type styling**

The words alternate between outline and filled styles using \`-webkit-text-stroke\` — odd items are hollow purple outlines, even items are solid lavender — with a cyan dot separating each. Horizontal \`mask-image\` gradients fade both ends so words enter and exit softly. All of this is pure CSS; the JavaScript only sets \`transform\`.

**Customizing it**

Tune \`BASE\` for a faster or slower resting drift, raise the \`0.25\` boost factor for a more violent reaction, change the \`0.9\` decay for a longer or snappier ease-out, or widen the skew clamp for more dramatic lean. Swap the \`WORDS\` array for your own slogan, add more rows with alternating \`data-dir\`, and recolor the stroke and fill. Pair it with a [logo marquee](/ui-snippets/logo-marquee/) or a [lamp header](/ui-snippets/lamp-header/) for a bold landing section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two rows of giant words drift slowly in opposite directions.` },
      { title: 'Scroll the page', text: `The words surge in the scroll direction and skew with the momentum.` },
      { title: 'Stop scrolling', text: `The boost decays and the rows ease back to a calm baseline drift.` },
      { title: 'Scroll up', text: `Velocity goes negative and the rows reverse and lean the other way.` },
      { title: 'Edit the words', text: `Replace the WORDS array with your own slogan.` },
      { title: 'Tune the feel', text: `Adjust BASE, the boost factor, decay, and skew clamp.` },
    ] },
    features: [
      { title: 'Scroll-velocity reactive', text: `Speed scales with frame-to-frame scrollY delta.` },
      { title: 'Momentum skew', text: `skewX leans the letters with the scroll, clamped to ±18°.` },
      { title: 'Exponential ease-out', text: `Velocity decays by 0.9 each frame after you stop.` },
      { title: 'Baseline drift', text: `Rows keep moving even when the page is still.` },
      { title: 'Opposing rows', text: `data-dir scrolls and skews the two rows opposite ways.` },
      { title: 'Seamless loop', text: `Width-based wrapping with no visible seam.` },
      { title: 'Frame-rate independent', text: `A dt factor keeps speed consistent across displays.` },
      { title: 'Outline + fill type', text: `-webkit-text-stroke alternates hollow and solid words.` },
    ],
    useCases: [
      { title: 'Agency landing bands', text: 'Place a kinetic band of giant words above a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/), drifting on its own and surging when the visitor scrolls.' },
      { title: 'Portfolio dividers', text: 'Sit between a [portfolio hero](/ui-snippets/portfolio-hero/) and the project grid, with rows alternating direction through a `data-dir` attribute.' },
      { title: 'Brand slogan loops', text: 'Loop a slogan as a giant marquee with momentum, clamping the `skewX` lean at 18 degrees so the type stays legible.' },
      { title: 'Event and launch microsites', text: 'Pair with a [lamp header](/ui-snippets/lamp-header/) for drama, or reinforce a tagline near an [animated gradient CTA](/ui-snippets/animated-gradient-cta/).' },
      { title: 'Plain marquee comparison', text: 'See the simpler [marquee](/ui-snippets/marquee/) for constant-speed scrolling, and use this version when speed should respond to the reader\'s own scrolling.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Typography Shatter', desc: 'See the [Three.js Scroll Typography Shatter](/ui-snippets/three-scroll-typo-shatter/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is scroll velocity measured?', a: `A passive scroll listener stores the difference between the current and previous window.scrollY each time it fires. That delta is the velocity — large and positive when scrolling down fast, negative when scrolling up. It feeds both the speed boost and the skew, so the marquee reacts to how fast and which way you scroll.` },
      { q: 'Why does the surge fade out smoothly after I stop?', a: `The stored velocity is multiplied by 0.9 every animation frame, so it decays exponentially toward zero once new scroll events stop arriving. That turns an abrupt stop into a natural ease-out where the words coast back to the constant BASE drift instead of halting instantly.` },
      { q: 'What creates the leaning effect?', a: `Each frame the track applies skewX in addition to translateX. The skew is derived from velocity and clamped to ±18 degrees, and multiplied by each row's direction, so fast scrolls visibly lean the giant letters as if dragged through the air, while a still page sits at zero skew.` },
      { q: 'Does the marquee loop without a seam?', a: `Yes. Each track repeats the word list several times and its loop width is scrollWidth / 2. When translateX passes that width in either direction it wraps by adding or subtracting the width, landing on an identical frame, so the loop is seamless. Horizontal mask gradients also fade both ends.` },
      { q: 'How do I use this scroll velocity marquee in React, Vue, or Angular?', a: `Run the rAF loop in a mount effect and store the frame id to cancel on unmount. Keep the latest velocity in a ref (not state) so updating it doesn't re-render every frame. Attach the passive scroll listener in the same effect with cleanup. Use refs for the track elements. The CSS, including text-stroke and the mask gradients, ports directly to Tailwind arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reverse-engineer the velocity decay or the seamless-loop wrapping math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the stored velocity is multiplied by 0.9 every frame instead of being reset immediately after each scroll event, and how the dt normalization keeps the drift speed consistent across different refresh rates. The same assistant can help optimize it — for example checking whether the scrollWidth measurement inside the requestAnimationFrame loop's fallback branch could cause layout thrashing on very long word lists, or whether the skew clamp and boost multiplier need retuning for touch-scroll devices that report much larger scrollY deltas per event. It is just as useful for extending the effect: ask it to add a third row with a different base speed, tie the boost to horizontal trackpad gestures as well as vertical scroll, or pause the drift entirely when the marquee scrolls out of the viewport using IntersectionObserver. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll velocity marquee" in plain HTML, CSS, and vanilla JavaScript only — no animation library, no build step.

Requirements:
- Two or more horizontal rows of repeating words, each row's track built by duplicating a word list several times so it can loop seamlessly, with a mask-image gradient fading the left and right edges of each row.
- Track scroll velocity as the frame-to-frame delta of window.scrollY inside a passive scroll event listener — do not use any external velocity or physics library.
- Run a continuous requestAnimationFrame loop, independent of the scroll event, that on every frame: decays the stored velocity by multiplying it by a constant just under 1 (so it exponentially approaches zero after scrolling stops rather than snapping back), computes a speed boost proportional to the absolute decayed velocity, and adds a constant baseline drift speed so each row keeps moving even when the page is completely still.
- Apply a skewX transform to each row's track derived from the current velocity and clamped to a fixed maximum angle in both directions, so fast scrolling visibly leans the text and a still page sits at zero skew.
- Give each row an opposite direction multiplier (for example +1 and -1) so the rows drift and skew in opposite directions for a counter-motion effect, driven by the same shared loop.
- Implement the loop wrapping so that once a row's horizontal offset exceeds half its total scrollWidth in either direction, it wraps by adding or subtracting that half-width, landing on a visually identical frame with no seam or jump.
- Normalize the per-frame movement against elapsed time (delta time since the last frame, capped at a reasonable maximum) so the animation speed does not vary with the display's refresh rate.`,
    },
  },
};

export default scrollVelocityMarquee;
