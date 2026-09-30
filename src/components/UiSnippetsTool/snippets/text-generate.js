const textGenerate = {
  id: 'text-generate',
  title: 'Text Generate Effect',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="tg-stage">
  <p class="tg-eyebrow">AI-style reveal</p>
  <h1 class="tg-text" id="tgText" data-text="Ideas become interfaces the moment you stop typing and start shipping."></h1>
  <button type="button" class="tg-replay" id="tgReplay">↻ Replay</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a12;color:#f4f4f8;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:30px}

.tg-stage{max-width:680px;text-align:center}
.tg-eyebrow{font-size:12px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#7c7c95;margin-bottom:18px}
.tg-text{font-size:clamp(26px,5.5vw,46px);font-weight:800;line-height:1.22;letter-spacing:-.02em}
.tg-word{display:inline-block;opacity:0;filter:blur(10px);transform:translateY(6px);transition:opacity .5s ease,filter .5s ease,transform .5s ease;white-space:pre}
.tg-word.in{opacity:1;filter:blur(0);transform:none}
.tg-word.accent.in{background:linear-gradient(120deg,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}

.tg-replay{margin-top:30px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#cfcfe0;font-family:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:999px;cursor:pointer;transition:background .2s}
.tg-replay:hover{background:rgba(255,255,255,.12)}`,

  js: `var el = document.getElementById('tgText');
var replay = document.getElementById('tgReplay');
var ACCENT = ['interfaces', 'shipping.'];   // words to gradient-highlight

function build() {
  var words = el.getAttribute('data-text').split(' ');
  el.innerHTML = words.map(function (w) {
    var accent = ACCENT.indexOf(w) > -1 ? ' accent' : '';
    return '<span class="tg-word' + accent + '">' + w + '</span>';
  }).join(' ');
  return Array.prototype.slice.call(el.querySelectorAll('.tg-word'));
}

var spans = build();
var timers = [];

function run() {
  timers.forEach(clearTimeout); timers = [];
  spans.forEach(function (s) { s.classList.remove('in'); });
  // Stagger each word's blur-in by 90ms so the sentence "types" itself in.
  spans.forEach(function (s, i) {
    timers.push(setTimeout(function () { s.classList.add('in'); }, 120 + i * 90));
  });
}

// Only start when the heading scrolls into view.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { run(); io.disconnect(); } });
}, { threshold: 0.4 });
io.observe(el);

replay.addEventListener('click', run);`,

  seo: {
    title: 'Text Generate Effect — Free HTML CSS JS Reveal Snippet',
    description: `An AI-style word-by-word reveal that blurs and fades each word in on a stagger, triggered on scroll, with gradient accents. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Text Generate Effect — Word-by-Word Blur-In Reveal',
      description: `The text-generate effect is the headline animation popularized by AI products: instead of appearing all at once, a sentence materializes word by word, each one un-blurring and rising into place on a gentle stagger, as if the page is "thinking" the text into existence. This snippet recreates it in plain HTML, CSS, and vanilla JavaScript, with scroll-triggered playback and gradient-highlighted accent words.

**Splitting text into animatable words**

The source sentence lives in a \`data-text\` attribute. On load, JavaScript splits it on spaces and wraps each word in a \`<span class="tg-word">\`, rejoining them with spaces so the natural line-wrapping is preserved. Wrapping each word individually is what lets them animate independently — you can't transition parts of a single text node, so the split into spans is the foundation of the whole effect.

**The blur-in transition**

Each word starts at \`opacity: 0\`, \`filter: blur(10px)\`, and \`translateY(6px)\`. Adding an \`.in\` class transitions all three to their resting values over half a second, so the word sharpens from a soft blur, fades up, and settles. The blur is the signature touch — it reads as "rendering" rather than a plain fade, which is exactly the generative-AI aesthetic. Each word uses \`display: inline-block\` so the \`transform\` applies (transforms are ignored on inline elements) and \`white-space: pre\` so spacing stays intact.

**The stagger**

The animation feels alive because words don't appear simultaneously. A loop schedules each word's \`.in\` class with \`setTimeout\` at \`120 + i * 90\` milliseconds, so word \`i\` starts 90ms after the one before it. That cascade is what makes the sentence appear to type or stream itself in. All timers are tracked in an array and cleared before each run so replays don't overlap or double-fire.

**Scroll-triggered playback**

A headline that animates before it's on screen is wasted, so an \`IntersectionObserver\` watches the element and only calls \`run()\` when at least 40% of it enters the viewport, then \`disconnect()\`s so it fires once. This is the standard, performant way to trigger scroll animations — no scroll listener, no per-frame math, and the browser handles the visibility detection.

**Gradient accent words**

Specific words listed in the \`ACCENT\` array get an extra class that, once revealed, paints them with a \`background-clip: text\` gradient so they stand out in color while the rest stay white. Because the gradient is applied only in the \`.in\` state, the accent words blur in like the others and then resolve into color, which keeps the emphasis from being visible before the animation reaches them.

**Replayable**

A replay button clears the timers, strips the \`.in\` classes, and re-runs the stagger, so you can demo the effect repeatedly. The same \`run()\` function powers both the initial scroll trigger and the replay.

**Customizing it**

Change the per-word delay to speed up or slow down the "generation," adjust the blur amount for a softer or sharper materialize, edit the \`ACCENT\` list to highlight different words, or swap the gradient colors. For a character-by-character variant, split on \`''\` instead of \`' '\`. Pair it with a [sparkles text](/ui-snippets/sparkles-text/) flourish or a [shimmer button](/ui-snippets/shimmer-button/) call to action beneath the headline.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A headline waits until it scrolls into view.` },
      { title: 'Scroll it into view', text: `Words un-blur and rise in one after another on a stagger.` },
      { title: 'Watch the accents', text: `Highlighted words resolve into a gradient as they appear.` },
      { title: 'Click Replay', text: `The sentence clears and regenerates word by word.` },
      { title: 'Edit the text', text: `Change the data-text attribute to your own sentence.` },
      { title: 'Tune the timing', text: `Adjust the per-word delay and blur amount.` },
    ] },
    features: [
      { title: 'Word-by-word reveal', text: `Each word is wrapped in its own animatable span.` },
      { title: 'Blur-in materialize', text: `Words sharpen from blur for the AI look.` },
      { title: 'Staggered cascade', text: `setTimeout offsets each word by 90ms.` },
      { title: 'Scroll-triggered', text: `IntersectionObserver fires it once in view.` },
      { title: 'Gradient accent words', text: `Listed words resolve into a color gradient.` },
      { title: 'Replayable', text: `Timers clear and re-run on demand.` },
      { title: 'Wrap-preserving', text: `inline-block words keep natural line breaks.` },
      { title: 'No per-frame JS', text: `Transitions and the observer do the work.` },
    ],
    useCases: [
      { title: 'AI product headlines', text: `Pair with a [shimmer button](/ui-snippets/shimmer-button/) CTA.` },
      { title: 'Landing hero copy', text: `Reveal a tagline above a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Section intros', text: `Animate a lead-in before a [testimonial wall](/ui-snippets/testimonial-wall/).` },
      { title: 'Storytelling pages', text: `Stream narrative atop [stacking scroll cards](/ui-snippets/stacking-scroll-cards/).` },
      { title: 'Quote reveals', text: `An alternative to a static [gradient text](/ui-snippets/gradient-text/) headline.` },
      { title: 'Reveal-on-scroll demos', text: `A reference for IntersectionObserver staggers.` },
    ],
    faqs: [
      { q: 'Why wrap every word in a span?', a: `You can't transition parts of a single text node, so each word is wrapped in its own inline-block span. That lets every word carry its own opacity, blur, and transform and animate independently, which is what makes the staggered word-by-word reveal possible. Rejoining with spaces preserves natural line wrapping.` },
      { q: 'What gives it the AI generative look?', a: `Each word starts at filter: blur(10px) and transitions to blur(0). The blur reads as the text rendering or focusing into existence rather than a plain fade, which is the signature of generative-AI interfaces. Combined with a slight upward translate and fade, it feels like the words are being thought into place.` },
      { q: 'How is it triggered only when visible?', a: `An IntersectionObserver watches the heading and runs the animation when 40% of it enters the viewport, then disconnects so it fires once. This avoids animating off-screen, needs no scroll listener or per-frame math, and lets the browser handle visibility detection efficiently.` },
      { q: 'How do the accent words get their color?', a: `Words listed in the ACCENT array get an extra class whose gradient (via background-clip: text) only applies in the revealed .in state. So accent words blur in like the rest and then resolve into color exactly when they appear, rather than showing their highlight before the animation reaches them.` },
      { q: 'How do I use this text generate effect in React, Vue, or Angular?', a: `Split the text into word spans in render rather than innerHTML, and drive each word's in class from state toggled on a stagger (a setTimeout loop or a CSS transition-delay based on index). Trigger with an IntersectionObserver in a mount effect, clearing timers on cleanup. In Tailwind, use blur and opacity utilities with arbitrary transition-delay-[...] values per word index.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to walk through why filter: blur(10px) transitioning to blur(0) reads as "generating" text while a plain opacity fade doesn't, and how the 120 + i * 90 millisecond formula in run() produces the stagger from a flat array of setTimeout calls. It's also worth asking about the tradeoffs — whether that many independent setTimeout calls could jank on very long sentences, and whether a single CSS animation-delay per word would be cheaper than JS-driven timers. For extending it, ask for per-word random blur amounts for a less mechanical feel, a version that streams words in as they'd arrive from a real streaming API response, or a variant that reveals by character instead of by word. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-triggered, word-by-word "text generate" reveal effect in plain HTML, CSS, and JavaScript — no animation library, no scroll listener.

Requirements:
- The full sentence must live in a data-text attribute on the heading element, not as visible markup, so JavaScript is the only thing that renders the words.
- On load, split the sentence on spaces and wrap every word in its own inline-block span, rejoining with literal spaces so natural line-wrapping is preserved; some specific words should be flaggable (via a separate list) to receive an "accent" class.
- Each word span must start at opacity 0, filter: blur(10px), and a small upward translateY offset, with a CSS transition on all three properties.
- Accent-flagged words must only reveal their gradient text color (via background-clip: text) once they reach the revealed state, so the gradient is invisible before the animation reaches that word.
- A run function must clear any previously scheduled timers, remove the revealed class from every word, and then re-schedule each word's reveal with an increasing setTimeout delay so the words un-blur and rise in left-to-right sequence rather than all at once.
- The whole animation must not start until the heading is at least 40% visible in the viewport, detected with an IntersectionObserver that disconnects itself after firing once.
- Add a replay button that re-runs the same reveal function on demand, reusing the identical timer-clearing logic so replays never overlap or double-fire.`,
    },
  },
};

export default textGenerate;
