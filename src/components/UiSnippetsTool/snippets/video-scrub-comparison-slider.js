const videoScrubComparisonSlider = {
  id: 'video-scrub-comparison-slider',
  title: 'Video Scrub Comparison Slider',
  lastmod: '2026-09-14',
  category: 'media',
  html: `<div class="vsc-wrap">
  <div class="vsc-frame" id="vscFrame">
    <div class="vsc-layer vsc-layer-before">
      <div class="vsc-fake-video vsc-fake-a">
        <div class="vsc-scan"></div>
        <span class="vsc-tag">RAW</span>
      </div>
    </div>
    <div class="vsc-layer vsc-layer-after" id="vscAfter">
      <div class="vsc-fake-video vsc-fake-b">
        <div class="vsc-scan"></div>
        <span class="vsc-tag">GRADED</span>
      </div>
    </div>
    <div class="vsc-handle" id="vscHandle">
      <div class="vsc-handle-line"></div>
      <div class="vsc-handle-grip">⟺</div>
    </div>
  </div>
  <div class="vsc-scrubber">
    <button class="vsc-play" id="vscPlay" aria-label="Play/pause">▶</button>
    <div class="vsc-bar" id="vscBar"><div class="vsc-bar-fill" id="vscBarFill"></div></div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e14;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vsc-wrap{width:100%;max-width:480px}
.vsc-frame{position:relative;width:100%;height:270px;border-radius:14px;overflow:hidden;box-shadow:0 16px 36px rgba(0,0,0,.5);cursor:ew-resize;touch-action:none}
.vsc-layer{position:absolute;inset:0}
.vsc-layer-after{overflow:hidden;width:50%}
.vsc-fake-video{position:relative;width:100%;height:100%;overflow:hidden}
.vsc-fake-a{background:linear-gradient(120deg,#3a3f4b,#20232b)}
.vsc-fake-b{background:linear-gradient(120deg,#0ea5e9,#22d3ee)}
.vsc-layer-after .vsc-fake-video{width:200%}
.vsc-scan{position:absolute;top:0;bottom:0;width:60px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.18),transparent);animation:vscScan 3s linear infinite}
@keyframes vscScan{from{left:-60px}to{left:100%}}
.vsc-tag{position:absolute;bottom:12px;left:14px;font:800 10.5px system-ui,sans-serif;color:#fff;background:rgba(0,0,0,.45);padding:3px 9px;border-radius:20px;letter-spacing:.04em}
.vsc-handle{position:absolute;top:0;bottom:0;left:50%;width:0;transform:translateX(-50%);z-index:3}
.vsc-handle-line{position:absolute;top:0;bottom:0;left:0;width:2px;background:#fff;box-shadow:0 0 8px rgba(0,0,0,.4)}
.vsc-handle-grip{position:absolute;top:50%;left:0;width:36px;height:36px;margin:-18px 0 0 -18px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;font-size:15px;box-shadow:0 4px 12px rgba(0,0,0,.35)}
.vsc-scrubber{display:flex;align-items:center;gap:12px;margin-top:14px}
.vsc-play{width:34px;height:34px;border-radius:50%;border:none;background:#1e293b;color:#fff;font-size:12px;cursor:pointer;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.vsc-bar{position:relative;flex:1;height:4px;border-radius:4px;background:#2a3348;cursor:pointer}
.vsc-bar-fill{position:absolute;left:0;top:0;bottom:0;width:0%;border-radius:4px;background:#0ea5e9}`,

  js: `var frame = document.getElementById('vscFrame');
var handle = document.getElementById('vscHandle');
var after = document.getElementById('vscAfter');
var playBtn = document.getElementById('vscPlay');
var bar = document.getElementById('vscBar');
var barFill = document.getElementById('vscBarFill');

var splitPct = 50;
var playing = false;
var playbackPct = 0;
var rafId = null;
var lastT = null;
var DURATION = 6000;

function renderSplit() {
  after.style.width = splitPct + '%';
  handle.style.left = splitPct + '%';
}

function setSplitFromClientX(clientX) {
  var rect = frame.getBoundingClientRect();
  var x = Math.max(0, Math.min(rect.width, clientX - rect.left));
  splitPct = (x / rect.width) * 100;
  renderSplit();
}

var dragging = false;
frame.addEventListener('pointerdown', function (e) { dragging = true; setSplitFromClientX(e.clientX); });
window.addEventListener('pointermove', function (e) { if (dragging) setSplitFromClientX(e.clientX); });
window.addEventListener('pointerup', function () { dragging = false; });
frame.addEventListener('touchstart', function (e) { dragging = true; setSplitFromClientX(e.touches[0].clientX); }, { passive: true });
window.addEventListener('touchmove', function (e) { if (dragging) setSplitFromClientX(e.touches[0].clientX); }, { passive: true });
window.addEventListener('touchend', function () { dragging = false; });

function renderPlayback() {
  barFill.style.width = playbackPct + '%';
}

function tick(now) {
  if (!playing) return;
  if (lastT === null) lastT = now;
  var dt = now - lastT;
  lastT = now;
  playbackPct += (dt / DURATION) * 100;
  if (playbackPct >= 100) { playbackPct = 100; playing = false; playBtn.textContent = '▶'; }
  renderPlayback();
  if (playing) rafId = requestAnimationFrame(tick);
}

playBtn.addEventListener('click', function () {
  playing = !playing;
  playBtn.textContent = playing ? '❚❚' : '▶';
  if (playing) { lastT = null; rafId = requestAnimationFrame(tick); }
});

bar.addEventListener('click', function (e) {
  var rect = bar.getBoundingClientRect();
  playbackPct = ((e.clientX - rect.left) / rect.width) * 100;
  renderPlayback();
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowRight') { splitPct = Math.min(100, splitPct + 3); renderSplit(); }
  else if (e.key === 'ArrowLeft') { splitPct = Math.max(0, splitPct - 3); renderSplit(); }
});

renderSplit();
renderPlayback();`,

  seo: {
    title: 'Video Scrub Comparison Slider — HTML CSS JS Snippet',
    description: 'A before/after comparison slider built for VIDEO, not static images — two playing clips revealed by a draggable divider, plus a separate scrubber bar that controls playback position independently. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Video Scrub Comparison Slider — Two Independent Axes of Control',
      description: `A static before/after image slider only has one control: where the divider sits. This one has two, layered independently on top of each other — the *horizontal divider* controls how much of "after" is revealed over "before" (exactly like an image comparison slider), while a completely separate *scrubber bar underneath* controls where both clips are in their own timeline. Dragging the divider left or right never touches playback position, and scrubbing the bar never touches the divider — the two controls read from and write to entirely different pieces of state.\n\n**Why the "after" layer is double-width, not full-width**\n\n\`.vsc-layer-after\` is clipped to \`width: splitPct%\` — but the actual clip inside it (\`.vsc-fake-video\`) is fixed at \`200%\` of *that* parent's width, not of the frame. That's the standard reveal-slider trick: because the inner clip is sized relative to the full frame while its parent is clipped to a fraction of it, the visible portion of the "after" clip always lines up pixel-for-pixel with the "before" layer underneath, at any divider position — the clip doesn't scale or distort as you drag, only how much of it is revealed changes.\n\n**A scrubber timed with requestAnimationFrame, not a video element**\n\nThis snippet illustrates the pattern with CSS-animated placeholder "clips" rather than real \`<video>\` elements, so the scrubber bar's fill is driven by \`requestAnimationFrame\` computing elapsed time against a fixed \`DURATION\` — in a real implementation, that same scrubber would instead read and write a real \`<video>\` element's \`.currentTime\`, keeping the two videos' playback perfectly synced to each other since both would share the exact same scrub position.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A comparison frame appears with a "RAW" clip on the left and "GRADED" clip revealed on the right, divider at center.' },
        { title: 'Drag the divider', text: 'Slide left or right to reveal more of either clip — this never affects playback position.' },
        { title: 'Click Play', text: 'The bottom scrubber bar starts filling, representing shared playback position for both clips.' },
        { title: 'Click anywhere on the scrubber bar', text: 'Jump playback to that point instantly.' },
        { title: 'Use Left/Right arrow keys', text: 'Nudge the comparison divider without touching the scrubber.' },
      ],
    },
    features: [
      'Two fully independent controls — a comparison divider and a playback scrubber — reading separate state',
      'The classic double-width-clip reveal trick, keeping the "after" clip pixel-aligned at any divider position',
      'requestAnimationFrame-driven scrubber timing, the same pattern used to sync a real video\'s currentTime',
      'Click-anywhere-on-the-bar seeking, not just play/pause',
      'Unified pointer and touch dragging for the comparison divider',
      'Arrow key support for the comparison divider, independent of playback controls',
    ],
    useCases: [
      { icon: '🎨', title: 'Colour grading showcases', desc: 'Show a raw clip against a graded version with a draggable divider, while a separate scrubber moves both videos through time together.' },
      { icon: '💻', title: 'Software demo comparisons', desc: 'Compare an old interface recording with a new one, using the double-width clip trick so the after video stays pixel-aligned.' },
      { icon: '✨', title: 'Video filter marketing pages', desc: 'Let visitors drag to see exactly what an effect does to moving footage, which a still image cannot convey.' },
      { icon: '🎞️', title: 'Restoration and tutorial comparisons', desc: 'Show a restored clip beside its original, with click-anywhere seeking on the bar instead of only play and pause.' },
      { icon: '🖼️', title: 'Still image alternative', desc: 'Use the [image comparison slider](/ui-snippets/image-comparison-slider/) instead when the content is a photograph and no timeline is needed.' },
    ],
    faqs: [
      { q: 'How do I use this with real <video> elements instead of the placeholder clips?', a: 'Replace each .vsc-fake-video with a <video> element (both sized/cloned identically), and inside the scrubber bar\'s click handler and the play button, set both videos\' .currentTime and call .play()/.pause() on both together — since they share the same DURATION and position, keep them in sync by driving both from one shared time value rather than letting each video run its own clock independently.' },
      { q: 'Why does the "after" layer need width: 200% on its inner clip?', a: 'The parent .vsc-layer-after is clipped to only splitPct% of the frame\'s width — without compensating, the clip inside it would also shrink to that width and look squeezed. Setting the inner clip to 200% (double the frame\'s full width) and letting the parent clip it means the visible slice always represents the correct, undistorted portion of the full-width clip.' },
      { q: 'Can the divider be dragged vertically instead of horizontally?', a: 'Yes — swap the width-based clipping for a height-based one (clip .vsc-layer-after to a percentage height instead of width), and change the pointer tracking from clientX/rect.width to clientY/rect.height.' },
      { q: 'How do I keep two real videos frame-accurately in sync?', a: 'Drive both from one shared time value on every scrubber update rather than letting each element play independently — set both videos\' currentTime together, and consider listening for one video\'s timeupdate event to correct any drift in the other.' },
      { q: 'Is it accessible?', a: 'The play button and scrubber bar are real interactive elements; for full accessibility, add aria-valuenow reflecting scrubber position, make the comparison handle keyboard-focusable with its own aria-label, and provide captions/transcripts for any real video content used.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the "after" clip is sized at 200% width inside a parent clipped to a percentage — and what would visually go wrong if that inner width were left at 100% instead. It's also worth asking the assistant to swap the placeholder CSS clips for real <video> elements with synchronized currentTime and play/pause state, or to add a hover-preview thumbnail that appears above the scrubber bar showing a frame at the hovered timeline position.`,
      prompt: `Build a before/after comparison slider designed for two playing video clips (using placeholder animated elements standing in for real video), with two fully independent controls — a reveal divider and a playback scrubber — in plain HTML, CSS, and vanilla JavaScript, no library.

Requirements:
- A frame containing two stacked layers representing a "before" clip and an "after" clip, where the after layer is clipped to a percentage width controlled by a draggable vertical divider handle — dragging the divider left or right must reveal more or less of the after layer over the before layer beneath it, using the standard double-width-inner-element clipping technique so the revealed content stays pixel-aligned at any divider position rather than appearing stretched or squeezed.
- The divider must be draggable via both pointer and touch events, tracking horizontal position within the frame's bounds.
- A completely separate playback scrubber control below the frame, consisting of a play/pause button and a clickable/seekable progress bar, representing shared timeline position for both clips — this scrubber's state must be entirely independent of the divider's position; dragging the divider must never affect playback position, and interacting with the scrubber must never affect the divider position.
- Playback progress must be driven by requestAnimationFrame computing real elapsed time against a fixed total duration, not a fixed-interval timer, so timing stays accurate regardless of frame rate.
- Clicking anywhere along the scrubber bar must seek playback directly to that position.
- Left/Right arrow key support that nudges the comparison divider by a small percentage, without affecting playback.`,
    },
  },
};

export default videoScrubComparisonSlider;
