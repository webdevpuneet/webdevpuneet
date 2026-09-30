const vivusSvgDraw = {
  id: 'vivus-svg-draw',
  title: 'Vivus SVG Line Draw',
  lastmod: '2026-08-02',
  category: 'animations',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/vivus@0.4.6/dist/vivus.min.js'],
  html: `<div class="vsd-wrap">
  <div class="vsd-stage">
    <svg id="vsdSvg" viewBox="0 0 240 240" class="vsd-svg" aria-label="Line-art compass badge drawing itself">
      <circle cx="120" cy="120" r="106"/>
      <circle cx="120" cy="120" r="94"/>
      <line x1="120" y1="14" x2="120" y2="30"/>
      <line x1="226" y1="120" x2="210" y2="120"/>
      <line x1="120" y1="226" x2="120" y2="210"/>
      <line x1="14" y1="120" x2="30" y2="120"/>
      <circle cx="158" cy="76" r="15"/>
      <path d="M46 162 L92 98 L120 134 L150 88 L194 162"/>
      <path d="M92 98 L110 122 L98 134"/>
      <line x1="40" y1="162" x2="200" y2="162"/>
      <path d="M64 182 Q92 172 120 182 T176 182"/>
    </svg>
  </div>

  <div class="vsd-panel">
    <span class="vsd-tag">vivus · stroke-dashoffset</span>
    <h2>Draw it, don't fade it</h2>
    <p>Vivus measures every path and animates its dash offset, so the artwork appears to be drawn by hand.</p>

    <div class="vsd-row">
      <button class="vsd-play" id="vsdPlay">Replay</button>
      <div class="vsd-types" id="vsdTypes">
        <button class="vsd-chip is-on" data-type="delayed">delayed</button>
        <button class="vsd-chip" data-type="oneByOne">oneByOne</button>
        <button class="vsd-chip" data-type="sync">sync</button>
      </div>
    </div>

    <label class="vsd-scrub">
      <span>Scrub <b id="vsdVal">100%</b></span>
      <input type="range" id="vsdRange" min="0" max="100" value="100">
    </label>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f4f6fb;color:#0f172a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vsd-wrap{width:min(760px,95vw);display:grid;grid-template-columns:1fr 1fr;gap:26px;align-items:center;background:#fff;border:1px solid #e6eaf3;border-radius:22px;padding:28px;box-shadow:0 30px 70px -34px rgba(15,23,42,.4)}
@media (max-width:640px){.vsd-wrap{grid-template-columns:1fr}}

.vsd-stage{display:flex;align-items:center;justify-content:center;background:radial-gradient(circle at 50% 40%,#eef2ff,#f8fafc);border:1px solid #eef1f8;border-radius:18px;padding:16px}
.vsd-svg{width:100%;max-width:260px;height:auto}
.vsd-svg circle,.vsd-svg path,.vsd-svg line{fill:none;stroke:#4f46e5;stroke-width:3;stroke-linecap:round;stroke-linejoin:round}
.vsd-svg circle:first-child{stroke:#c7d2fe}

.vsd-tag{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#4f46e5;background:#eef2ff;border:1px solid #ddd6fe;padding:5px 11px;border-radius:99px;margin-bottom:12px}
.vsd-panel h2{font-size:clamp(21px,3.6vw,28px);font-weight:800;letter-spacing:-.02em}
.vsd-panel p{font-size:14px;line-height:1.65;color:#64748b;margin-top:8px}

.vsd-row{display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:20px}
.vsd-play{padding:10px 18px;border:none;border-radius:10px;background:#4f46e5;color:#fff;font:700 13px system-ui;cursor:pointer;transition:background .16s}
.vsd-play:hover{background:#4338ca}
.vsd-types{display:flex;gap:6px;flex-wrap:wrap}
.vsd-chip{padding:8px 12px;border-radius:9px;border:1px solid #e2e8f0;background:#fff;color:#64748b;font:600 11.5px ui-monospace,monospace;cursor:pointer;transition:border-color .16s,color .16s,background .16s}
.vsd-chip:hover{background:#f8fafc}
.vsd-chip.is-on{border-color:#818cf8;background:#eef2ff;color:#4338ca}

.vsd-scrub{display:block;margin-top:20px}
.vsd-scrub span{display:flex;justify-content:space-between;font-size:12px;font-weight:600;color:#64748b;margin-bottom:8px}
.vsd-scrub b{color:#4f46e5;font-variant-numeric:tabular-nums}
.vsd-scrub input{width:100%;accent-color:#4f46e5;cursor:pointer}`,

  js: `var playBtn = document.getElementById('vsdPlay');
var range = document.getElementById('vsdRange');
var valEl = document.getElementById('vsdVal');

var vivus = null;
var type = 'delayed';
var playing = false;

function build(nextType, autoplay) {
  // Vivus rewrites stroke-dasharray on every path, so the old instance must be
  // destroyed before a new one measures the same SVG — otherwise it inherits
  // the previous run's dash values and the draw looks half-finished.
  if (vivus) vivus.destroy();

  vivus = new Vivus('vsdSvg', {
    type: nextType,
    duration: 160,
    start: 'manual',
    animTimingFunction: Vivus.EASE_OUT,
    pathTimingFunction: Vivus.LINEAR
  }, function () {
    playing = false;
    range.value = 100;
    valEl.textContent = '100%';
  });

  if (autoplay) play();
  else { vivus.finish(); range.value = 100; valEl.textContent = '100%'; }
}

function syncScrubber() {
  if (!playing) return;
  var pct = Math.round((vivus.currentFrame / vivus.frameLength) * 100);
  range.value = pct;
  valEl.textContent = pct + '%';
  requestAnimationFrame(syncScrubber);
}

function play() {
  vivus.reset().play();
  playing = true;
  requestAnimationFrame(syncScrubber);
}

playBtn.addEventListener('click', play);

document.getElementById('vsdTypes').addEventListener('click', function (e) {
  var chip = e.target.closest('.vsd-chip');
  if (!chip) return;
  document.querySelectorAll('.vsd-chip').forEach(function (c) { c.classList.remove('is-on'); });
  chip.classList.add('is-on');
  type = chip.dataset.type;
  build(type, true);
});

range.addEventListener('input', function () {
  playing = false;
  vivus.stop();
  var pct = Number(range.value);
  vivus.setFrameProgress(pct / 100);
  valEl.textContent = pct + '%';
});

build(type, true);`,

  seo: {
    title: 'Vivus SVG Line Draw — Self-Drawing SVG Animation',
    description: 'A line-art SVG badge that draws itself stroke by stroke with Vivus, plus three timing modes and a live scrubber. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Vivus SVG Line Draw — How Stroke-Dashoffset Animation Actually Works',
      description: `A logo that draws itself is one of the few web animations that still stops people mid-scroll. It also looks like it must involve a video or a Lottie file, and it involves neither — it is one CSS property, applied cleverly.

## The trick underneath

Every SVG stroke supports \`stroke-dasharray\`, which turns a solid line into a dashed one, and \`stroke-dashoffset\`, which slides those dashes along the path. Set the dash length to exactly the **total length of the path** and you get a single dash covering the whole line, with a single gap of the same size after it. Push the offset to that same length and the dash is pushed entirely out of view — the path is invisible. Animate the offset back to zero and the line appears to be drawn from one end to the other.

Doing it by hand means calling \`path.getTotalLength()\` on every element, writing two properties per path, and hand-scheduling the timing. **Vivus** is a 5kb library that does exactly that, for every drawable element in an SVG, automatically.

## What the three types actually change

The \`type\` option is the whole personality of the animation, and the three modes here are meaningfully different:

- **\`delayed\`** — every path animates over the full duration, but each starts at a slightly staggered offset. Strokes overlap heavily, so the drawing appears to emerge everywhere at once while still resolving in order. This is the most "designed" looking option and the default here.
- **\`oneByOne\`** — each path waits for the previous to finish completely. The duration is divided by total path length, so long paths take proportionally longer. This is the literal "someone is drawing this" reading, and it is much slower to complete.
- **\`sync\`** — every path starts and ends together. The whole illustration materializes as one, which suits geometric marks and looks wrong on illustrative ones.

Because \`oneByOne\` and \`delayed\` derive their schedule from measured path lengths, **document order matters** — the SVG here is authored deliberately, with the outer rings first and the foreground detail last, so the drawing builds from frame to subject.

## Manual start, and driving it yourself

\`start: 'manual'\` is what makes this snippet interactive rather than a fire-and-forget intro. Nothing plays until \`.play()\` is called, which means you can trigger on scroll with an \`IntersectionObserver\`, on hover, or on a button as done here.

The scrubber is the more interesting half. \`vivus.setFrameProgress(0.5)\` jumps the drawing to any point between 0 and 1 instantly — so the animation becomes a **timeline you can drag**, not just something you watch. Wiring that to a scroll position instead of a range input is the scroll-driven logo-draw effect seen on agency sites, and it is one line different from what is here.

Keeping the slider in sync *during* playback needs a small loop, because Vivus does not emit progress events. It exposes \`currentFrame\` and \`frameLength\`, so a \`requestAnimationFrame\` poll converts them to a percentage while \`playing\` is true and stops the moment the completion callback fires.

## The gotcha: destroy before rebuilding

Switching the timing type requires a new Vivus instance, and this line is not optional:

\`if (vivus) vivus.destroy();\`

Vivus **mutates the SVG it is given**, writing \`stroke-dasharray\` and \`stroke-dashoffset\` inline on every path. Constructing a second instance over the same markup makes it measure paths that already carry the previous run's dash values, and the result is an animation that starts half-drawn or never completes. \`destroy()\` restores the original attributes so the new instance measures clean geometry. This is the single most common Vivus bug and it only appears once you make the animation reconfigurable.

## Authoring SVG that Vivus can draw

The requirement is simple and absolute: **Vivus animates strokes, not fills.** Every element here is \`fill: none\` with an explicit \`stroke\` and \`stroke-width\`, set in CSS rather than as attributes so the artwork stays themeable. Shapes that are filled rather than stroked are skipped entirely — which is why exporting a logo from a design tool usually produces nothing until the fills are converted to outlined strokes.

\`stroke-linecap: round\` and \`stroke-linejoin: round\` matter more than they look: a drawing animation constantly reveals path *ends*, and square caps make every in-progress stroke read as cut off.

## Reusing it

Drop in your own line-art SVG, keep everything \`fill: none\` with strokes, and order the paths the way you want them drawn. Trigger \`play()\` from an \`IntersectionObserver\` for a scroll-triggered logo intro, or feed scroll progress into \`setFrameProgress()\` for a scrubbed one. It pairs naturally with a [draw SVG success](/ui-snippets/draw-svg-success/) checkmark for micro-feedback, or [morph SVG icons](/ui-snippets/morph-svg-icons/) when shapes need to become other shapes rather than appear.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the Vivus CDN', text: 'Include vivus from the CDN panel — one script, global Vivus.' },
      { title: 'Paste HTML, CSS, and JS', text: 'The compass badge draws itself as soon as the snippet loads.' },
      { title: 'Press Replay', text: 'The instance resets to zero length and redraws from the start.' },
      { title: 'Switch timing types', text: 'Compare delayed, oneByOne, and sync on the same artwork.' },
      { title: 'Drag the scrubber', text: 'setFrameProgress jumps the drawing to any point in its timeline.' },
      { title: 'Swap in your own SVG', text: 'Use fill:none stroked paths and order them the way you want them drawn.' },
    ] },
    features: [
      { title: 'Automatic path measuring', text: 'Vivus calls getTotalLength on every drawable element for you.' },
      { title: 'Three timing modes', text: 'delayed, oneByOne, and sync switchable live on the same SVG.' },
      { title: 'Manual start', text: 'start: manual means you decide the trigger — button, scroll, or hover.' },
      { title: 'Draggable timeline', text: 'setFrameProgress turns the draw into a scrubbable animation.' },
      { title: 'Live progress readout', text: 'currentFrame over frameLength polled in a rAF loop during playback.' },
      { title: 'Clean instance rebuild', text: 'destroy() restores dash attributes before a new instance measures.' },
      { title: 'Themeable strokes', text: 'Stroke color and width live in CSS, not SVG attributes.' },
      { title: 'Round caps and joins', text: 'Stroke ends stay soft while the path is mid-reveal.' },
    ],
    useCases: [
      { title: 'Logo intros', text: 'Draw a brand mark on first load instead of fading it in.' },
      { title: 'Scroll-triggered illustration', text: 'Feed scroll progress into setFrameProgress for a scrubbed draw.' },
      { title: 'Onboarding and empty states', text: 'Line art that builds itself beside an [empty state](/ui-snippets/empty-state/).' },
      { title: 'Success and confirmation', text: 'A larger sibling to the [draw SVG success](/ui-snippets/draw-svg-success/) check.' },
      { title: 'Infographic reveals', text: 'Build diagrams stroke by stroke as a reader arrives at them.' },
      { title: 'Learning SVG animation', text: 'A live reference for dasharray, dashoffset, and path length.' },
    ],
    faqs: [
      { q: 'How does a line draw itself with no drawing API?', a: 'stroke-dasharray sets the dash length to the path total length, so there is one dash covering the whole line. stroke-dashoffset then pushes that dash entirely out of view, making the path invisible. Animating the offset back to zero slides the dash into place, which reads as the line being drawn. Vivus measures every path with getTotalLength and applies both properties automatically.' },
      { q: 'What is the difference between the delayed, oneByOne, and sync types?', a: 'delayed animates every path over the full duration but staggers their start times, so strokes overlap and the whole drawing emerges together while still resolving in order. oneByOne waits for each path to finish before starting the next, which is the most literal hand-drawn reading and takes longest. sync starts and ends every path simultaneously, which suits geometric marks and looks wrong on illustrations.' },
      { q: 'Why must destroy() be called before rebuilding?', a: 'Vivus mutates the SVG, writing stroke-dasharray and stroke-dashoffset inline on every path. A second instance built over the same markup measures paths that still carry the previous run values, so the animation starts half-drawn or never completes. destroy() restores the original attributes so the new instance measures clean geometry.' },
      { q: 'Why does nothing animate when I use my own logo?', a: 'Almost always because the shapes are filled rather than stroked. Vivus animates strokes only — every element needs fill: none with an explicit stroke and stroke-width. Logos exported from design tools are usually filled outlines, so they must be converted to stroked paths first.' },
      { q: 'How is the scrubber kept in sync while the animation plays?', a: 'Vivus does not emit progress events, but it exposes currentFrame and frameLength. A requestAnimationFrame loop divides one by the other while a playing flag is true and writes the percentage to the range input, stopping when the completion callback flips the flag.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Create the Vivus instance in a mount effect against a ref to the SVG element, never during render, since it measures live geometry. Call instance.destroy() in the cleanup so remounts do not stack mutations on the same markup. Keep the instance in a ref rather than state, and rebuild it in an effect keyed to the timing type when that changes.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is a good one to interrogate because the underlying trick is simpler than it looks and the failure modes are specific. Paste the HTML, CSS, and JS into an AI assistant like Claude and ask it to explain, with numbers, how setting stroke-dasharray to a path's total length and then animating stroke-dashoffset from that length to zero produces a drawing effect — then ask what happens visually if the dasharray is set to half the path length instead. Ask it why build() calls vivus.destroy() before constructing a new instance, and reproduce the bug by deleting that line so you can see the animation start half-drawn. For optimization, ask whether polling currentFrame and frameLength in a requestAnimationFrame loop is wasteful compared to computing the elapsed percentage from the duration, and what the trade-off is. To extend it: have it trigger play() from an IntersectionObserver instead of a button, drive setFrameProgress from scroll position for a scrubbed logo draw, add a prefers-reduced-motion branch that calls finish() immediately, or chain a fill fade-in after the strokes complete. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a self-drawing SVG line-art animation using the Vivus library (from a CDN, global Vivus) in plain HTML, CSS, and JavaScript.

Requirements:
- Author an original line-art SVG (for example a compass or badge: concentric circles, tick marks, a mountain range polyline, a sun circle and a ground line). Every element must be fill: none with an explicit stroke, stroke-width, stroke-linecap: round and stroke-linejoin: round — set in CSS rather than as SVG attributes so the artwork is themeable. Explain that Vivus animates strokes only and skips filled shapes entirely.
- Order the SVG elements deliberately in document order, outer frame first and foreground detail last, because the delayed and oneByOne timing modes derive their schedule from document order and measured path length.
- Initialize Vivus with start: 'manual' so playback is triggered explicitly rather than on load, a duration around 160, and easing set with Vivus.EASE_OUT for the overall animation and Vivus.LINEAR per path.
- Provide buttons to switch between the three timing types — 'delayed', 'oneByOne' and 'sync' — rebuilding the instance each time. CRITICAL: call destroy() on the existing instance before constructing the new one, and comment why: Vivus writes stroke-dasharray and stroke-dashoffset inline on every path, so a second instance measuring the same markup inherits the previous run's dash values and the drawing starts half-finished.
- Add a range input that scrubs the animation using vivus.setFrameProgress(value / 100), stopping playback first, so the drawing becomes a draggable timeline rather than only something you watch.
- Keep the scrubber in sync DURING playback: Vivus emits no progress events, so poll vivus.currentFrame divided by vivus.frameLength inside a requestAnimationFrame loop while a playing flag is true, and stop the loop when Vivus's completion callback fires.
- Add a replay button that calls reset() then play(), and lay it out as a clean light two-column card: artwork on the left, controls and copy on the right, collapsing to one column under 640px.`,
    },
  },
};

export default vivusSvgDraw;
