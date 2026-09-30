const lottieHoverIconButton = {
  id: 'lottie-hover-icon-button',
  title: 'Lottie Hover Icon Button',
  lastmod: '2026-08-21',
  category: 'buttons',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.12.2/lottie.min.js',
  ],
  html: `<div class="lb-wrap">
  <button class="lb-btn" id="lbBtn">
    <span class="lb-icon" id="lbIcon"></span>
    <span class="lb-label">Add to favorites</span>
  </button>
  <p class="lb-hint">Hover the button — the icon plays a Lottie animation.</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center}
.lb-wrap{display:flex;flex-direction:column;align-items:center;gap:14px}
.lb-btn{display:flex;align-items:center;gap:10px;padding:12px 22px 12px 16px;border-radius:999px;border:1px solid #2a2f4a;background:linear-gradient(135deg,#181c30,#12121f);color:#fff;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:border-color .2s,transform .15s}
.lb-btn:hover{border-color:#f472b6}
.lb-btn:active{transform:scale(.97)}
.lb-icon{width:28px;height:28px;display:block;flex-shrink:0}
.lb-hint{font-size:12px;color:#6d7291}`,

  js: `// No hosted .json asset exists for this sandbox, so a minimal but genuinely
// valid Lottie animation is defined inline and passed straight to
// animationData — this always works standalone, with no network request and
// nothing that can 404. It animates a small heart shape scaling in and
// changing color across 40 frames at 30fps (roughly 1.3s).
const heartAnimation = {
  v: '5.9.0', fr: 30, ip: 0, op: 40, w: 100, h: 100, nm: 'heart', ddd: 0,
  assets: [],
  layers: [{
    ddd: 0, ind: 1, ty: 4, nm: 'heart-shape', sr: 1,
    ks: {
      o: { a: 0, k: 100 },
      r: { a: 0, k: 0 },
      p: { a: 0, k: [50, 52, 0] },
      a: { a: 0, k: [0, 0, 0] },
      s: {
        a: 1,
        k: [
          { t: 0, s: [0, 0, 100], e: [130, 130, 100], i: { x: [0.3], y: [1] }, o: { x: [0.2], y: [0] } },
          { t: 18, s: [130, 130, 100], e: [100, 100, 100], i: { x: [0.3], y: [1] }, o: { x: [0.2], y: [0] } },
          { t: 30 },
        ],
      },
    },
    ao: 0,
    shapes: [{
      ty: 'gr',
      it: [
        {
          ty: 'sh', ix: 1,
          ks: { a: 0, k: {
            i: [[0,-14],[14,0],[0,16],[-1,1],[-1,-1],[0,-16]],
            o: [[-14,0],[0,16],[1,1],[1,-1],[16,0],[0,-14]],
            v: [[0,-16],[-24,8],[0,32],[0,32],[0,32],[24,8]],
            c: true,
          } },
        },
        {
          ty: 'fl', ix: 2,
          c: { a: 1, k: [
            { t: 0, s: [0.42, 0.45, 0.9, 1] },
            { t: 20, s: [0.95, 0.29, 0.6, 1] },
            { t: 40 },
          ] },
          o: { a: 0, k: 100 },
        },
        { ty: 'tr', p: { a: 0, k: [0, 0] }, a: { a: 0, k: [0, 0] }, s: { a: 0, k: [100, 100] }, r: { a: 0, k: 0 }, o: { a: 0, k: 100 } },
      ],
      nm: 'heart-group',
    }],
    ip: 0, op: 40, st: 0, bm: 0,
  }],
};

const anim = lottie.loadAnimation({
  container: document.getElementById('lbIcon'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  animationData: heartAnimation,
});

const btn = document.getElementById('lbBtn');
btn.addEventListener('mouseenter', () => {
  anim.setDirection(1);
  anim.play();
});
btn.addEventListener('mouseleave', () => {
  anim.setDirection(-1);
  anim.play();
});`,

  seo: {
    title: 'Lottie Hover Icon Button — Free Inline-JSON Lottie Snippet',
    description: `A button whose icon plays a Lottie animation on hover, using a minimal inline animationData object instead of a hosted .json file. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Lottie Hover Icon Button — Play/Reverse on Hover With Inline Animation Data',
      description: `Lottie plays back animations exported from After Effects (via the Bodymovin plugin) or built directly as JSON, and [lottie-web](https://airbnb.io/lottie/) is the runtime that renders that JSON to SVG, canvas, or HTML in the browser. The classic use is a button icon that plays a short flourish on hover — a heart filling in, a bell ringing, a star sparkling — driven by \`lottie.loadAnimation\` with \`autoplay: false\` and \`play()\`/\`setDirection()\` calls on \`mouseenter\`/\`mouseleave\`. This snippet builds exactly that, but since a live sandbox has no server to host a \`.json\` asset on, the Lottie data is a small hand-built object passed directly as \`animationData\`, so the button always works standalone with zero network requests.

**A real, minimal Lottie document**

\`heartAnimation\` is a genuine Lottie JSON structure — \`v\` (format version), \`fr\`/\`ip\`/\`op\` (frame rate and in/out points), and a single shape \`layer\` with keyframed \`s\` (scale) and a fill \`c\` (color) that shift over 40 frames. It's deliberately small (one layer, two keyframed properties) but it's not a mock — \`lottie.loadAnimation\` parses and renders it exactly as it would a much larger exported file, which is why this pattern is worth knowing: any time you need a Lottie animation that must never depend on an external asset load, hand-authoring or generating a minimal JSON document and passing it via \`animationData\` is the way to guarantee that.

**Play forward, reverse back**

\`autoplay: false\` means nothing happens until you interact. On \`mouseenter\`, \`setDirection(1)\` then \`play()\` runs the animation forward from wherever it currently is; on \`mouseleave\`, \`setDirection(-1)\` then \`play()\` runs it backward to the start. Because Lottie tracks the current frame internally, rapidly hovering on and off reverses smoothly from the interrupted frame rather than snapping or replaying from zero.

**Why not autoplay + loop?**

A looping hover icon can feel busy on a button that's meant to communicate a single action. This snippet uses \`loop: false\` with the play/reverse pattern so the icon settles at a clear "off" state and a clear "hovered" state — a better fit for buttons than for a standalone decorative animation like a loading indicator.

**Where this fits**

For the equivalent asset-independence pattern applied to a canvas-rendered Rive state machine instead of an SVG Lottie, see [Rive interactive icon](/ui-snippets/rive-interactive-icon/). For a CSS-only celebratory micro-interaction with no animation library at all, see [confetti button](/ui-snippets/confetti-button/) or [interactive hover button](/ui-snippets/interactive-hover-button/).

**Customizing it**

Export your own icon animation from After Effects with Bodymovin (or build one in LottieFiles' editor) and either host the resulting \`.json\` and pass a \`path\` instead of \`animationData\`, or inline it the same way this snippet does if you need zero-network guarantees. Swap \`renderer: 'svg'\` for \`'canvas'\` if you're animating many icons at once and want lower per-instance overhead.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the lottie-web CDN', text: `Include lottie.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A button with an empty icon container renders.` },
      { title: 'Hover the button', text: `The heart icon animates in, scaling and changing color.` },
      { title: 'Move away', text: `The animation reverses smoothly back to its start frame.` },
      { title: 'Swap the animation data', text: `Replace heartAnimation with your exported Lottie JSON.` },
      { title: 'Use a hosted file instead', text: `Pass path: 'your.json' in place of animationData.` },
    ] },
    features: [
      { title: 'Inline animationData', text: `No hosted .json file, no network request.` },
      { title: 'Play-on-hover pattern', text: `mouseenter/mouseleave drive play() calls.` },
      { title: 'Smooth reverse', text: `setDirection(-1) reverses from the current frame.` },
      { title: 'Non-looping icon', text: `Settles at a clear off/on state, not a busy loop.` },
      { title: 'Real Lottie structure', text: `A genuine minimal keyframed JSON document.` },
      { title: 'SVG rendering', text: `Crisp at any size, no raster scaling artifacts.` },
      { title: 'Single dependency', text: `Only lottie-web is required, no plugins.` },
      { title: 'Drop-in swap', text: `Replace animationData with any exported file's JSON.` },
    ],
    useCases: [
      { title: 'Favorite/like buttons', text: `A heart or star icon that animates on interaction.` },
      { title: 'Notification actions', text: `Pair with [notification bell](/ui-snippets/notification-bell/).` },
      { title: 'Add-to-cart flows', text: `An icon flourish alongside [add to cart button](/ui-snippets/add-to-cart-button/).` },
      { title: 'Nav icon buttons', text: `Subtle motion on hover for icon-only nav items.` },
      { title: 'Micro-interaction libraries', text: `A reusable pattern beside [interactive hover button](/ui-snippets/interactive-hover-button/).` },
      { title: 'Asset-independence pattern', text: `Reuse alongside [Rive interactive icon](/ui-snippets/rive-interactive-icon/).` },
      { icon: 'CODE', title: 'Related: Shake to Undo', desc: 'See the [Shake to Undo](/ui-snippets/shake-to-undo/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the animation data inline instead of loaded from a file?', a: `A live code sandbox has no server to host a .json asset on, and referencing an external URL risks a broken icon if that file ever moves or 404s. Passing a hand-built object directly as animationData sidesteps both problems entirely — lottie-web accepts a JavaScript object just as readily as a fetched JSON file, so the button always renders correctly with zero network dependency.` },
      { q: 'Is heartAnimation a real Lottie file or a simplified fake?', a: `It's a genuine, if minimal, Lottie JSON document — it has the required top-level fields (v, fr, ip, op, layers) and a shape layer with real keyframed scale and color properties. lottie-web parses and renders it exactly as it would a much larger file exported from After Effects; it's just deliberately small, with one layer and two animated properties, rather than a mock object with fake-looking data.` },
      { q: 'How does the hover-reverse behavior work?', a: `autoplay is set to false so nothing plays until interaction. On mouseenter, setDirection(1) then play() runs the animation forward from its current frame; on mouseleave, setDirection(-1) then play() runs it backward toward frame 0. Because Lottie tracks the current frame rather than always restarting, moving the mouse on and off quickly reverses smoothly from wherever playback was interrupted instead of jumping or restarting from scratch.` },
      { q: 'How do I use my own exported Lottie animation instead?', a: `Export a Bodymovin/Lottie JSON from After Effects (or build one in the LottieFiles editor), then either host that .json file and pass path: "your-icon.json" instead of animationData in the loadAnimation call, or — if you need the same zero-network guarantee this snippet has — inline the exported JSON object directly as animationData the same way heartAnimation is defined here.` },
      { q: 'Why use SVG rendering instead of canvas?', a: `renderer: "svg" produces crisp vector output at any button size with no raster scaling artifacts, and is the more common default for a single small icon animation. renderer: "canvas" trades that crispness for lower per-instance overhead, which matters more when animating many Lottie icons simultaneously on one page — for a single hover icon like this button, SVG is the better default.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to hand-decode the Lottie JSON schema to understand what heartAnimation is doing. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through the layer's keyframed scale (s) and color (c) properties frame by frame, explaining how the i/o easing handles and the t (time) values on each keyframe produce the fill-in-and-settle motion, and why passing this object directly as animationData avoids the network dependency a path-based Lottie load would have. The same assistant can help you extend it — asking how to add a second keyframed property like rotation or opacity to the same layer, or how to generate a small inline Lottie JSON for a different icon shape (a star, a bell, a bookmark) from scratch. It's also useful for production guidance: ask it what changes when you swap animationData for a path pointing at a real exported .json file, including how loading and error states should be handled. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a button with an icon that plays a short Lottie animation on hover, using lottie-web (load it from a CDN) with the animation data defined entirely inline in JavaScript rather than loaded from an external file.

Requirements:
- A button containing a label and an empty icon container element sized for a small icon (roughly 24-32px).
- Hand-author a minimal but structurally valid Lottie JSON object as a JavaScript object literal (not a hosted file) with the required top-level fields (version, frame rate, in/out points, width/height, layers) and at least one shape layer that has two separately keyframed properties — for example scale animating from 0 to a slight overshoot and settling, and fill color shifting between two colors — spanning roughly 30-45 frames at 30fps.
- Call lottie.loadAnimation with renderer set to svg, loop set to false, autoplay set to false, and animationData (not path) set to that inline object, targeting the icon container.
- On the button's mouseenter event, set the animation's playback direction forward and call play(). On mouseleave, set the direction backward and call play() again, so hovering off reverses the animation smoothly from wherever it currently is rather than snapping back to the start or restarting from frame 0.
- Confirm that rapidly moving the mouse on and off the button doesn't cause the animation to glitch, reset unexpectedly, or throw — direction changes mid-playback should interrupt smoothly.
- In a comment, explain that a production version would typically export a real animation from After Effects via the Bodymovin plugin and either host the resulting JSON and load it via a path, or inline it the same way if a zero-network-dependency guarantee is needed.`,
    },
  },
};

export default lottieHoverIconButton;
