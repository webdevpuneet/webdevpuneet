const mobileCameraScreen = {
  id: 'mobile-camera-screen',
  title: 'Mobile Camera Screen',
  lastmod: '2026-07-18',
  category: 'mobile',
  html: `<div class="mcm-phone">
  <div class="mcm-screen" id="mcmScreen">
    <div class="mcm-flash" id="mcmFlash"></div>
    <div class="mcm-status"><span>9:41</span><span class="mcm-batt"><i></i></span></div>

    <div class="mcm-top">
      <button class="mcm-tbtn" id="mcmFlashBtn" aria-label="Flash">&#9889;</button>
      <button class="mcm-tbtn" aria-label="Timer">&#9203;</button>
      <button class="mcm-tbtn" id="mcmGridBtn" aria-label="Grid">&#9638;</button>
      <button class="mcm-tbtn" aria-label="Settings">&#9881;</button>
    </div>

    <div class="mcm-view">
      <div class="mcm-grid" id="mcmGrid" hidden></div>
      <div class="mcm-frame"></div>
    </div>

    <div class="mcm-modes" id="mcmModes">
      <button class="mcm-mode">VIDEO</button>
      <button class="mcm-mode active">PHOTO</button>
      <button class="mcm-mode">PORTRAIT</button>
      <button class="mcm-mode">SQUARE</button>
    </div>

    <div class="mcm-bottom">
      <div class="mcm-thumb" id="mcmThumb"></div>
      <button class="mcm-shutter" id="mcmShutter" aria-label="Capture"><span></span></button>
      <button class="mcm-flip" id="mcmFlip" aria-label="Flip camera">&#8635;</button>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
html{scrollbar-width:none;-ms-overflow-style:none}
html::-webkit-scrollbar{display:none}
body{font-family:system-ui,-apple-system,sans-serif;background:#1e293b;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px;scrollbar-width:none;-ms-overflow-style:none}
body::-webkit-scrollbar{display:none}

.mcm-phone{width:288px;height:600px;background:#0b1220;border-radius:46px;padding:12px;box-shadow:0 30px 60px -20px rgba(0,0,0,.6),inset 0 0 0 2px #1e293b}
.mcm-screen{width:100%;height:100%;border-radius:34px;overflow:hidden;background:#000;color:#fff;display:flex;flex-direction:column;position:relative}
.mcm-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;z-index:20}
.mcm-flash.fire{animation:mcmFlash .35s ease}
@keyframes mcmFlash{0%{opacity:0}20%{opacity:.9}100%{opacity:0}}
.mcm-status{display:flex;justify-content:space-between;align-items:center;padding:13px 24px 0;font-size:13px;font-weight:700;z-index:5}
.mcm-batt{width:22px;height:11px;border:1.4px solid currentColor;border-radius:3px;position:relative;display:inline-block}
.mcm-batt::after{content:'';position:absolute;right:-3px;top:3px;width:2px;height:5px;background:currentColor;border-radius:0 1px 1px 0}
.mcm-batt i{position:absolute;left:1.4px;top:1.4px;bottom:1.4px;width:70%;background:currentColor;border-radius:1px}

.mcm-top{display:flex;justify-content:space-around;padding:12px 20px 10px;z-index:5}
.mcm-tbtn{background:none;border:none;color:#fff;font-size:17px;cursor:pointer;width:34px;height:34px;border-radius:50%;opacity:.85;transition:background .15s,opacity .15s}
.mcm-tbtn.on{background:#fbbf24;color:#000;opacity:1}

.mcm-view{flex:1;position:relative;background:linear-gradient(160deg,#1e293b,#334155 40%,#0f172a);overflow:hidden}
.mcm-view::before{content:'';position:absolute;left:18%;top:22%;width:64%;height:52%;border-radius:50%;background:radial-gradient(circle at 40% 35%,rgba(148,163,184,.5),transparent 60%)}
.mcm-frame{position:absolute;inset:14% 10%;border:2px solid rgba(255,255,255,.35);border-radius:14px}
.mcm-frame::before,.mcm-frame::after{content:'';position:absolute;width:22px;height:22px;border:3px solid #fbbf24}
.mcm-frame::before{left:-2px;top:-2px;border-right:none;border-bottom:none;border-radius:6px 0 0 0}
.mcm-frame::after{right:-2px;bottom:-2px;border-left:none;border-top:none;border-radius:0 0 6px 0}
.mcm-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.25) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.25) 1px,transparent 1px);background-size:33.33% 33.33%}

.mcm-modes{display:flex;justify-content:center;gap:16px;padding:12px 0 8px;z-index:5}
.mcm-mode{background:none;border:none;color:rgba(255,255,255,.5);font-size:11px;font-weight:800;letter-spacing:.6px;cursor:pointer;font-family:inherit;transition:color .15s}
.mcm-mode.active{color:#fbbf24}

.mcm-bottom{display:flex;align-items:center;justify-content:space-between;padding:6px 30px 22px;z-index:5}
.mcm-thumb{width:42px;height:42px;border-radius:10px;background:#1e293b;border:2px solid rgba(255,255,255,.4);background-size:cover;background-position:center;transition:transform .2s}
.mcm-thumb.pop{animation:mcmThumbPop .4s ease}
@keyframes mcmThumbPop{0%{transform:scale(.4);opacity:.4}60%{transform:scale(1.12)}100%{transform:scale(1)}}
.mcm-shutter{width:66px;height:66px;border-radius:50%;border:4px solid #fff;background:none;cursor:pointer;padding:4px}
.mcm-shutter span{display:block;width:100%;height:100%;border-radius:50%;background:#fff;transition:transform .12s}
.mcm-shutter:active span{transform:scale(.85)}
.mcm-flip{width:42px;height:42px;border-radius:50%;background:rgba(255,255,255,.16);border:none;color:#fff;font-size:20px;cursor:pointer;transition:transform .4s}
.mcm-flip.spun{transform:rotate(360deg)}`,

  js: `var flash = document.getElementById('mcmFlash');
var shutter = document.getElementById('mcmShutter');
var thumb = document.getElementById('mcmThumb');
var flashBtn = document.getElementById('mcmFlashBtn');
var gridBtn = document.getElementById('mcmGridBtn');
var grid = document.getElementById('mcmGrid');
var flip = document.getElementById('mcmFlip');

var shots = [
  'linear-gradient(135deg,#f472b6,#a855f7)',
  'linear-gradient(135deg,#34d399,#0ea5e9)',
  'linear-gradient(135deg,#fbbf24,#f43f5e)',
  'linear-gradient(135deg,#818cf8,#22d3ee)'
];
var s = 0;

shutter.addEventListener('click', function(){
  flash.classList.remove('fire');
  void flash.offsetWidth;
  flash.classList.add('fire');
  thumb.style.backgroundImage = shots[s % shots.length];
  s++;
  thumb.classList.remove('pop');
  void thumb.offsetWidth;
  thumb.classList.add('pop');
});

flashBtn.addEventListener('click', function(){
  flashBtn.classList.toggle('on');
});
gridBtn.addEventListener('click', function(){
  gridBtn.classList.toggle('on');
  grid.hidden = !gridBtn.classList.contains('on');
});
flip.addEventListener('click', function(){
  flip.classList.toggle('spun');
});

document.querySelectorAll('.mcm-mode').forEach(function(mode){
  mode.addEventListener('click', function(){
    document.querySelectorAll('.mcm-mode').forEach(function(m){ m.classList.remove('active'); });
    mode.classList.add('active');
  });
});`,

  seo: {
    title: 'Mobile Camera Screen — Free HTML CSS JS UI Snippet',
    description: `A phone camera UI with a viewfinder, focus frame, mode selector, a shutter that fires a flash, and a captured thumbnail. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Mobile Camera Screen — Viewfinder & Shutter UI',
      description: `A camera screen is almost all overlay — a viewfinder filling the frame, a row of quick toggles on top, a mode selector and shutter at the bottom, and a thumbnail of your last shot. This snippet builds a complete, interactive one inside a CSS phone frame: pressing the shutter fires a white flash and drops a new photo into the thumbnail, the grid and flash toggles work, and the flip button spins — in HTML, CSS, and vanilla JavaScript with no camera access required.

**The viewfinder and focus frame**

The viewfinder is a gradient stand-in for a live feed with a soft radial highlight suggesting a subject. Over it sits a focus frame with two accent corner brackets built from a single element's \`::before\` and \`::after\` — each is a small box with only two borders and one rounded corner, the universal "autofocus reticle" look. A rule-of-thirds grid overlay can be toggled on and off.

**A shutter that fires a flash**

Tapping the shutter plays a full-screen white flash via a \`@keyframes\` animation on an absolutely positioned overlay. To make it fire on every press — not just the first — the code removes the animation class, forces a reflow with \`void flash.offsetWidth\`, and re-adds it, the standard CSS-animation-restart trick. The shutter's inner disc also scales down on \`:active\` for a physical press feel.

**Captured thumbnails that cycle**

Each capture drops the next gradient from a small array into the thumbnail and replays a pop animation so the shot appears to fly into the corner, exactly how phone cameras animate a taken photo shrinking into the gallery button. The array cycles with a modulo so you can keep shooting.

**Working toggles**

The flash and grid buttons flip an amber "on" state; turning grid on reveals the thirds overlay. The mode selector — Video, Photo, Portrait, Square — moves an amber active label, and the flip-camera button rotates a full turn on tap to signal switching between front and rear cameras. Each is a small, self-contained interaction that mirrors a real camera app.

**Accessibility and performance**

Every control — the top toggles, the mode buttons, the shutter, and flip — is a real \`<button>\` with an \`aria-label\`, so the camera UI is fully keyboard-operable and screen readers announce each action rather than a bare glyph. When you adapt it, reflect toggle state with \`aria-pressed\` on the flash and grid buttons and mark the active mode with \`aria-pressed\` too, so their on state is announced and not carried by color alone. One accessibility consideration for the flash: the full-screen white pulse can be jarring, so gate it behind a \`prefers-reduced-motion\` check for users who opt out of motion. Performance is deliberately cheap: the flash and thumbnail pop are single CSS keyframes restarted with a forced reflow rather than by creating nodes, the viewfinder and focus reticle are pure CSS with no repaint cost while idle, and the grid overlay is one gradient toggled with the \`hidden\` attribute. Wiring a real camera adds a \`<video>\` element and a canvas capture, but the overlay chrome stays exactly as lightweight as it is here.

**Reusing it**

Replace the gradient viewfinder with a \`<video>\` element bound to \`getUserMedia\`, capture real frames to a canvas on shutter, and wire the modes to your capture settings. Lift the overlay out of the phone frame for a responsive web camera, or keep it framed beside a [camera UI](/ui-snippets/camera-ui/) control panel to present a full capture flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A camera UI renders with a viewfinder, focus frame, mode selector, and shutter.` },
      { title: 'Press the shutter', text: `A white flash fires across the screen and a new photo pops into the thumbnail corner.` },
      { title: 'Keep shooting', text: `Each press cycles a different captured image into the thumbnail.` },
      { title: 'Toggle the grid', text: `The grid button reveals a rule-of-thirds overlay on the viewfinder.` },
      { title: 'Toggle flash', text: `The flash button flips to an amber on state.` },
      { title: 'Switch modes and flip', text: `Pick Photo, Portrait, or Square, and tap flip to spin the camera-switch button.` },
    ] },
    features: [
      { title: 'Viewfinder frame', text: `Gradient feed with a radial subject highlight.` },
      { title: 'CSS focus reticle', text: `Corner brackets from one element's pseudo-elements.` },
      { title: 'Full-screen flash', text: `Keyframe overlay fires on every shutter press.` },
      { title: 'Animation restart', text: `Reflow trick re-fires the flash and pop.` },
      { title: 'Cycling thumbnails', text: `Captures pop a new image into the corner.` },
      { title: 'Rule-of-thirds grid', text: `Toggleable thirds overlay.` },
      { title: 'Mode selector', text: `Photo, Portrait, Square, Video with active label.` },
      { title: 'No dependency', text: `Pure HTML, CSS, and vanilla JavaScript.` },
    ],
    useCases: [
      { title: 'Camera app capture screens', text: 'Prototype the capture view of a camera app with a viewfinder, mode selector and shutter, alongside the [camera UI](/ui-snippets/camera-ui/) panel.' },
      { title: 'Photo tool workflows', text: 'Send each captured thumbnail on to a [photo gallery](/ui-snippets/photo-gallery/), so the shutter, preview and review steps are all demonstrable.' },
      { title: 'Scanner and frame overlays', text: 'Reuse the focus reticle, built from one element\'s corner pseudo-elements, for scanner or verification screens such as a [slider captcha](/ui-snippets/slider-captcha/).' },
      { title: 'Story creation flows', text: 'Follow the capture with a [mobile stories viewer](/ui-snippets/mobile-stories-viewer/) to show a complete post-a-story journey on one phone frame.' },
      { title: 'Presenting inside a device frame', text: 'Place the screen in a [phone mockup](/ui-snippets/phone-mockup/) for portfolio or marketing use, with a reflow trick restarting the flash and pop on every press.' },
      { icon: 'CODE', title: 'Related: Mobile Alarm Clock Screen', desc: 'See the [Mobile Alarm Clock Screen](/ui-snippets/mobile-alarm-screen/) for a related mobile pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does the shutter access a real camera?', a: `No — the viewfinder is a gradient stand-in and the shutter fires a flash and cycles demo images. To use a real camera, bind a video element to getUserMedia, and on shutter draw the current video frame to a canvas and use that as the captured image. The flash, grid, and mode UI stay exactly the same.` },
      { q: 'How does the flash fire on every shutter press?', a: `The flash is a full-screen overlay with a keyframe animation triggered by a class. Since CSS animations only run on first application, the code removes the class, reads flash.offsetWidth to force a reflow, then re-adds it. That reflow lets the browser treat the animation as new, so it fires on every capture rather than only once.` },
      { q: 'How is the focus frame built without images?', a: `The frame is a bordered rounded rectangle, and its two amber corner brackets are the ::before and ::after pseudo-elements of a single element. Each bracket is a small box showing only two of its borders with one rounded corner, which produces the L-shaped autofocus reticle look purely in CSS.` },
      { q: 'What does the thumbnail pop animation represent?', a: `On capture the thumbnail gets the next image and replays a pop keyframe that scales it up from small, imitating a just-taken photo flying into the gallery button. The images come from a small array cycled with a modulo, so repeated shots keep swapping the thumbnail.` },
      { q: 'How do I use this camera screen in React, Vue, or Angular?', a: `Hold the active mode, flash-on, grid-on, and last capture in state and bind classes to them rather than toggling classList. Replace the gradient viewfinder with a video ref bound to getUserMedia, and capture frames to a canvas on shutter. Re-fire the flash with a state-driven key change. Tailwind expresses the overlays and controls with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't need to reverse-engineer the flash retrigger from memory to be confident in it. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the shutter handler removes the fire class, reads flash.offsetWidth, and only then re-adds the class to force the flash keyframe to replay on every single press, or how the focus-frame's corner brackets are built from just one element's before and after pseudo-elements with partial borders. The same assistant is useful for optimizing it — asking whether the same forced-reflow pattern used for the flash and the thumbnail pop could be consolidated into one small reusable helper function, or whether the gradient viewfinder background could be replaced by a real getUserMedia video feed without touching the overlay chrome. It's just as useful for extending the screen: ask it to wire the shutter to actually capture a video frame to a canvas, add a pinch-to-zoom gesture on the viewfinder, or make the flip-camera button actually swap between two video streams. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "mobile camera capture screen" inside a CSS phone frame, in plain HTML, CSS, and vanilla JavaScript — no real camera access required, no libraries.

Requirements:
- A phone-shaped outer frame containing a dark screen with a fake status bar, a row of top toggle icon buttons (flash, timer, grid, settings), a large viewfinder area, a row of capture-mode labels (e.g. Video, Photo, Portrait, Square), and a bottom control row with a thumbnail preview, a circular shutter button, and a flip-camera button.
- The viewfinder must be a gradient background standing in for a live feed (no actual video element required), with a focus-frame overlay: a bordered rounded rectangle whose two accent corner brackets are built from a single element's ::before and ::after pseudo-elements, each showing only two of its four borders and one rounded corner, so together they read as an autofocus reticle.
- A toggleable rule-of-thirds grid overlay: a hidden layer with two repeating linear-gradients (one horizontal, one vertical) forming a 3x3 grid, shown or hidden via a button that also toggles its own "on" visual state.
- Pressing the shutter must trigger a full-screen white flash: an absolutely positioned overlay with a CSS keyframe animation that fades in then out. Because a CSS animation only plays once per class application, the code must remove the animation-triggering class, force a synchronous reflow by reading the element's offsetWidth, and then re-add the class — so the flash fires freshly on every single shutter press, not just the first.
- Each shutter press must also cycle through a small fixed array of gradient "photos," dropping the next one into a small thumbnail element in the corner, and replaying a pop-in scale animation on that thumbnail using the same remove-reflow-reapply technique.
- Flash and grid buttons should toggle an "on" visual state (e.g. amber highlight) on click. The mode-selector labels should move an "active" highlight between them on click. A flip-camera button should visually rotate a full 360 degrees on each click to suggest switching between front and rear cameras.
- Every control must be a real button with an aria-label, so the camera UI is fully operable via keyboard and announced correctly by screen readers.`,
    },
  },
};

export default mobileCameraScreen;
