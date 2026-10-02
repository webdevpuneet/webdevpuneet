const animeJsMorphShapes = {
  id: 'anime-js-morph-shapes',
  title: 'Anime.js SVG Shape Morph',
  lastmod: '2026-08-21',
  category: 'animations',
  cdnUrls: [
    'https://cdnjs.cloudflare.com/ajax/libs/animejs/3.2.2/anime.min.js',
  ],
  html: `<section class="ajm-wrap">
  <header class="ajm-head"><h1>One Path, Many Shapes</h1><p>A single SVG path morphs between four states in a loop, driven by an anime.js timeline swapping the "d" attribute.</p></header>
  <div class="ajm-stage">
    <svg viewBox="0 0 200 200" width="220" height="220">
      <defs>
        <linearGradient id="ajmGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#a3e635"/>
          <stop offset="100%" stop-color="#22d3ee"/>
        </linearGradient>
      </defs>
      <path id="ajmPath" fill="url(#ajmGrad)" d="M45,-58C58,-49,67,-33,70,-16C73,1,70,20,60,35C50,50,33,61,14,66C-5,71,-27,70,-43,59C-59,48,-69,28,-71,7C-73,-14,-67,-35,-53,-49C-39,-63,-17,-70,3,-73C23,-76,32,-67,45,-58Z" transform="translate(100,100)"></path>
    </svg>
  </div>
  <button class="ajm-btn" id="ajmToggle">Pause loop</button>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a120c;color:#eafbef}
.ajm-wrap{max-width:640px;margin:0 auto;padding:60px 24px;text-align:center}
.ajm-head h1{font-size:clamp(28px,5vw,42px);letter-spacing:-.02em;margin-bottom:10px;background:linear-gradient(135deg,#fff,#a3e635);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.ajm-head p{color:#8fb89c;font-size:15px;max-width:440px;margin:0 auto 36px;line-height:1.6}
.ajm-stage{display:flex;justify-content:center;filter:drop-shadow(0 20px 40px rgba(34,211,238,.25));margin-bottom:30px}
.ajm-btn{padding:11px 22px;border-radius:10px;border:1px solid #1f3a28;background:#0f1f14;color:#c9f0d4;font-size:14px;font-weight:600;cursor:pointer}
.ajm-btn:hover{background:#15301d}`,

  js: `// The four blob path states this SVG morphs between (all same point count
// so anime.js can interpolate coordinate-by-coordinate).
const shapes = [
  'M45,-58C58,-49,67,-33,70,-16C73,1,70,20,60,35C50,50,33,61,14,66C-5,71,-27,70,-43,59C-59,48,-69,28,-71,7C-73,-14,-67,-35,-53,-49C-39,-63,-17,-70,3,-73C23,-76,32,-67,45,-58Z',
  'M52,-64C66,-53,73,-33,74,-13C75,7,70,27,58,43C46,59,27,71,6,73C-15,75,-38,68,-54,53C-70,38,-79,15,-78,-7C-77,-29,-66,-49,-49,-61C-32,-73,-9,-77,10,-76C29,-75,38,-75,52,-64Z',
  'M38,-49C52,-42,66,-30,71,-15C76,0,73,19,63,33C53,47,36,56,18,62C0,68,-20,71,-37,64C-54,57,-68,40,-73,21C-78,2,-74,-19,-63,-35C-52,-51,-34,-62,-16,-66C2,-70,24,-56,38,-49Z',
  'M60,-70C77,-58,88,-38,88,-18C88,2,77,20,64,36C51,52,36,66,17,72C-2,78,-25,76,-43,65C-61,54,-74,34,-77,13C-80,-8,-73,-31,-59,-47C-45,-63,-24,-72,-3,-74C18,-76,43,-82,60,-70Z',
];

const path = document.getElementById('ajmPath');
const btn = document.getElementById('ajmToggle');

// anime.js timeline: morph the "d" attribute through each shape in turn,
// looping forever. Each step animates the raw path data string directly —
// anime.js interpolates the numeric values inside it automatically.
const timeline = anime.timeline({
  targets: path,
  easing: 'easeInOutQuad',
  duration: 1400,
  loop: true,
  direction: 'alternate',
});

shapes.slice(1).concat(shapes[0]).forEach(d => {
  timeline.add({ d: [{ value: d }] }, '+=400');
});

let playing = true;
btn.addEventListener('click', () => {
  playing = !playing;
  if (playing) {
    timeline.play();
    btn.textContent = 'Pause loop';
  } else {
    timeline.pause();
    btn.textContent = 'Resume loop';
  }
});`,

  seo: {
    title: 'Anime.js SVG Shape Morph — Free Blob Path Morphing Snippet',
    description: `An SVG blob that smoothly morphs between multiple path shapes in a looping timeline, powered by anime.js's built-in "d" attribute interpolation. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Anime.js SVG Shape Morph — Looping Blob Morphs via the d Attribute Timeline',
      description: `Morphing one SVG shape smoothly into another is a deceptively hard problem — a naive crossfade just overlaps two static shapes, it doesn't actually transform one outline into the next. anime.js solves this by animating an SVG path's \`d\` attribute directly: given two path strings with the same number of coordinate points, it interpolates each point's position frame by frame, producing a genuine shape transformation rather than a fade.

**Why the point count has to match**

All four shapes in this snippet's \`shapes\` array are built from the same cubic-bezier blob generator pattern, each with exactly the same number of \`C\` (curve) commands and coordinate pairs. anime.js's \`d\` attribute interpolation works by matching up corresponding points between the "from" and "to" path strings positionally — if one shape had a different number of points than the next, there would be no clean one-to-one mapping and the morph would look broken or jump discontinuously rather than flow.

**A timeline instead of a single animation**

Rather than one \`anime({...})\` call, this snippet uses \`anime.timeline({ loop: true, direction: 'alternate' })\` and adds one step per remaining shape via \`timeline.add({ d: [{ value: d }] }, '+=400')\`. Each \`.add()\` call queues the next morph target, and the \`'+=400'\` offset inserts a short hold before starting the next morph, so the blob doesn't immediately flow from one shape into the next with zero pause. Because the timeline loops with \`direction: 'alternate'\`, it plays forward through all four shapes and then reverses back through them, rather than jumping from the last shape back to the first.

**Interpolating path data, not just simple values**

Most anime.js usage animates numeric CSS properties or transforms — this snippet demonstrates a less common but powerful capability: passing a raw SVG path string as the value for the \`d\` property. anime.js parses both the current and target path data, extracts their numeric coordinates, and tweens those numbers directly, then reconstructs a valid path string at every animation frame. This is meaningfully different from, and more capable than, CSS transitions, which cannot animate the \`d\` attribute at all.

**Play/pause control**

The timeline object returned by \`anime.timeline()\` exposes \`.play()\` and \`.pause()\` methods directly, which this snippet wires to a button — because the whole four-shape loop lives on one timeline instance, pausing and resuming affects the entire sequence at whatever point it's currently morphing through, rather than needing to track state per shape.

**Customizing it**

Add more shapes to the array (keeping the point count consistent), adjust \`duration\` or the \`'+=400'\` hold time, swap \`easeInOutQuad\` for a different easing curve, or drive the morph from a button click or scroll trigger instead of an automatic loop. Pair this with [Liquid Blob](/ui-snippets/liquid-blob/) for a complementary blob effect, or a [Confetti Button](/ui-snippets/confetti-button/) for a playful interaction nearby.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the anime.js CDN script', text: `Include anime.min.js from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A gradient SVG blob and a pause button render.` },
      { title: 'Watch the blob morph', text: `It cycles smoothly through four distinct path shapes.` },
      { title: 'Click Pause loop', text: `The timeline pauses mid-morph; click again to resume.` },
      { title: 'Add a new shape', text: `Append another path string with the same point count to shapes.` },
      { title: 'Adjust timing', text: `Change duration or the '+=400' hold offset for a different pace.` },
    ] },
    features: [
      { title: 'True path morphing', text: `anime.js interpolates the d attribute's coordinates directly.` },
      { title: 'Four-shape loop', text: `A timeline cycles through multiple blob states in sequence.` },
      { title: 'Alternating direction', text: `The loop plays forward then reverses instead of jump-cutting.` },
      { title: 'Timeline-based sequencing', text: `Each shape is queued with anime.timeline().add().` },
      { title: 'Held pauses between morphs', text: `+=400 offsets add a brief rest before each transition.` },
      { title: 'Play/pause control', text: `The returned timeline exposes .play() and .pause() directly.` },
      { title: 'Gradient fill', text: `An SVG linearGradient colors the blob lime-to-cyan.` },
      { title: 'Drop-shadow glow', text: `A CSS filter adds ambient glow behind the shape.` },
    ],
    useCases: [
      { title: 'Decorative hero blobs', text: 'Place a morphing blob behind a headline, with anime.js interpolating the `d` attribute directly rather than crossfading two static shapes.' },
      { title: 'Loading and empty states', text: 'Use a looping shape morph in place of a spinner, alternating direction so the loop plays forward then reverses without a jump cut.' },
      { title: 'Brand icon variations', text: 'Morph between logo or icon variants in a brand animation, with each target shape queued in turn through `anime.timeline().add()` calls.' },
      { title: 'Playful 404 pages', text: 'Pair with a [confetti button](/ui-snippets/confetti-button/) on an error page, so the page is both animated and rewarding to click.' },
      { title: 'Liquid shape alternatives', text: 'Compare with the [liquid blob](/ui-snippets/liquid-blob/) to decide between a path-interpolated morph and a simpler blur-based effect.' },
      { icon: 'CODE', title: 'Related: Anime.js Ripple Grid', desc: 'See the [Anime.js Ripple Grid](/ui-snippets/anime-ripple-grid/) for a related animations pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: 3D Cube Rotate Panel Transition', desc: 'See the [3D Cube Rotate Panel Transition](/ui-snippets/cube-rotate-panel-transition/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do all four shapes need the same number of points?', a: `anime.js interpolates a path's d attribute by matching each numeric coordinate in the current path string to the corresponding coordinate at the same position in the target path string, then tweening those numbers directly. If the two path strings have different structures or point counts, there's no clean correspondence between them, and the morph will look distorted, jump abruptly, or fail to interpolate smoothly at all.` },
      { q: 'What does the +=400 offset in timeline.add() do?', a: `It's a relative time offset telling anime.js to start this step 400 milliseconds after the previous step in the timeline finished, rather than immediately chaining into it. Without it, the blob would flow continuously from one shape directly into the next with no pause; with it, each shape holds briefly before the next morph begins.` },
      { q: 'How does direction: alternate change the loop behavior?', a: `With loop: true alone, the timeline would play through all queued steps and then jump straight back to the very first frame to repeat — which for four different shapes would mean an abrupt cut back to the starting shape at the end of each cycle. direction: alternate makes the timeline play forward through the sequence and then play backward through the same sequence, so the blob morphs through the shapes and then smoothly morphs back through them in reverse.` },
      { q: 'Can I morph an SVG path on a click instead of looping automatically?', a: `Yes — instead of anime.timeline({ loop: true, ... }), create a single anime({ targets: path, d: [{ value: nextShape }], duration: 800 }) call inside a click event listener, and cycle an index variable through your shapes array each time the button is clicked. This trades the automatic loop for an explicit one-shot morph per interaction.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Install the animejs npm package (or keep the CDN script), import anime, and construct the timeline inside a mount effect (useEffect, onMounted, or ngAfterViewInit) targeting a ref to the SVG path element rather than getElementById. Call timeline.pause() in the effect's cleanup function to stop the loop cleanly if the component unmounts while it's still running.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out SVG path interpolation math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how anime.js matches up coordinates between two path strings with the same point count to produce a smooth d attribute morph, and why direction: alternate matters for avoiding an abrupt jump-cut at the end of each loop cycle. The same assistant can help you extend the effect — asking it to add a fifth shape to the sequence while keeping every path's point count consistent (a common source of bugs when hand-editing blob paths), trigger a one-shot morph from a button click instead of an automatic loop, or generate new blob path variations programmatically using a small polar-coordinate blob generator function. It's also useful for pacing: ask whether the current 1400ms duration and 400ms hold feel right, or whether easing should vary per shape rather than being fixed across the whole timeline. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a looping SVG shape-morphing animation in plain HTML, CSS, and JavaScript using the anime.js library loaded from a CDN — the morph must animate the SVG path's actual "d" attribute coordinates, not a crossfade between two overlapping static shapes.

Requirements:
- An inline SVG containing a single <path> element filled with a gradient, whose "d" attribute defines a smooth, closed blob-like shape built from cubic-bezier curve commands.
- Define at least four different blob path strings as an array, each one built with exactly the same number of curve commands and coordinate points as the others, so anime.js can interpolate corresponding coordinates directly between any two of them.
- Use anime.timeline() (not a single anime() call) with loop: true and direction: 'alternate', then use the timeline's .add() method to queue a morph to each subsequent shape in the array in turn, targeting the path's "d" property with the next shape's path string as the value.
- Insert a short relative time offset (for example '+=400') between each queued step so the blob briefly holds its current shape before starting the next morph, rather than flowing continuously with no pause.
- Add a button that toggles between calling the timeline's .play() and .pause() methods, updating its own label to reflect the current state, so the entire morph sequence can be paused and resumed at whatever shape it's currently transitioning through.
- Style the SVG with a gradient fill and a subtle drop-shadow glow so the morphing shape reads as a polished decorative element rather than a bare debug shape.`,
    },
  },
};

export default animeJsMorphShapes;
