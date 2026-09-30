const gsapSplitText = {
  id: 'gsap-split-text',
  title: 'GSAP SplitText Reveal',
  lastmod: '2026-07-18',
  category: 'animations',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/SplitText.min.js',
  ],
  html: `<div class="gst-wrap">
  <h2 class="gst-head" id="gstHead">Great type deserves a great entrance.</h2>
  <p class="gst-para" id="gstPara">SplitText slices this copy into lines, words, and characters — then puts it back exactly as it was.</p>
  <div class="gst-bar">
    <button class="gst-btn is-active" data-mode="chars">Chars</button>
    <button class="gst-btn" data-mode="words">Words</button>
    <button class="gst-btn" data-mode="lines">Lines</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d16;color:#fff;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.gst-wrap{width:min(600px,94vw);text-align:center;display:flex;flex-direction:column;gap:18px;align-items:center}
.gst-head{font-size:clamp(28px,5.4vw,48px);font-weight:800;letter-spacing:-.02em;line-height:1.15}
.gst-para{font-size:clamp(14px,2.2vw,17px);line-height:1.7;color:#aeb4ca;max-width:480px}
.gst-bar{display:flex;gap:8px;margin-top:8px}
.gst-btn{padding:9px 20px;border-radius:99px;border:1px solid rgba(255,255,255,.16);background:#141a2e;color:#c9d2f8;font:600 13px system-ui;cursor:pointer;transition:background .2s,border-color .2s}
.gst-btn:hover{background:#1d2440}
.gst-btn.is-active{border-color:#818cf8;background:#1d2440}`,

  js: `gsap.registerPlugin(SplitText);

var head = document.getElementById('gstHead');
var para = document.getElementById('gstPara');
var buttons = document.querySelectorAll('.gst-btn');
var split = null;

function play(mode) {
  // revert() restores the original, un-split markup before re-splitting —
  // critical so repeated splits never nest spans inside spans.
  if (split) split.revert();

  // mask wraps each piece in an overflow-clipped parent, so text can
  // slide in from "behind" its own line with no extra CSS.
  split = new SplitText([head, para], {
    type: 'lines,words,chars',
    mask: mode === 'chars' ? 'chars' : mode
  });

  var targets = split[mode];
  var vars = {
    chars: { yPercent: 110, rotation: 6, stagger: 0.015, duration: 0.5 },
    words: { yPercent: 110, opacity: 0, stagger: 0.04, duration: 0.55 },
    lines: { yPercent: 100, stagger: 0.12, duration: 0.7 }
  }[mode];

  gsap.from(targets, {
    yPercent: vars.yPercent,
    rotation: vars.rotation || 0,
    opacity: vars.opacity !== undefined ? vars.opacity : 1,
    duration: vars.duration,
    stagger: vars.stagger,
    ease: 'power3.out'
  });
}

buttons.forEach(function (btn) {
  btn.addEventListener('click', function () {
    buttons.forEach(function (b) { b.classList.remove('is-active'); });
    btn.classList.add('is-active');
    play(btn.getAttribute('data-mode'));
  });
});

play('chars');`,

  seo: {
    title: 'GSAP SplitText Reveal — Free Text Animation Snippet',
    description: `Headline and paragraph split into lines, words, or chars with GSAP SplitText — masked rises, revert-safe re-splitting. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP SplitText Reveal — Line, Word, and Character Entrances Done Right',
      description: `Splitting text into animatable pieces sounds trivial until you hit the real problems: wrapped lines, masking, screen-reader damage, and un-splitting cleanly. GSAP's SplitText plugin (free on the CDN since 3.13, and substantially rewritten in that release) solves all four. This snippet splits a headline and paragraph three switchable ways — characters, words, or lines — each with its own masked rise choreography and a clean revert between modes.

**Lines are the hard part — and the plugin's real value**

Chars and words can be split with a loop (see the hand-rolled [scroll letter stagger](/ui-snippets/scroll-letter-stagger/)); *lines* can't, because line breaks only exist after layout. SplitText measures where the browser actually wrapped the text and wraps each rendered line in its own div — which is why line-by-line reveals, the most editorial of all text entrances, effectively require this plugin. The 3.13 rewrite also re-splits automatically on resize when lines change.

**mask: wraps pieces in clip containers for you**

The masked rise — text sliding up from behind an invisible sill — normally needs hand-built \`overflow: hidden\` wrappers around every piece. Passing \`mask: 'lines'\` (or \`'words'\`/\`'chars'\`) makes SplitText generate those clip wrappers during the split, so \`yPercent: 110\` entrances emerge from nothing with zero custom CSS. This snippet switches the mask to match the active mode, which is why all three feel native rather than one mask fitting all.

**revert() is what makes re-splitting safe**

Each mode change calls \`split.revert()\` before creating a new SplitText. Revert restores the exact original markup — no leftover spans, no nested wrappers from double-splitting, and any text styling returns to its untouched state. Skipping revert is the classic SplitText bug: split a split and your DOM fills with matryoshka spans whose transforms compound unpredictably.

**One split exposes all three granularities**

\`type: 'lines,words,chars'\` builds the full hierarchy in one pass — lines containing words containing chars — and the instance exposes them as arrays (\`split.chars\`, \`split.words\`, \`split.lines\`). The demo animates whichever array matches the button, with per-mode variables: chars get a rotation and tight 15ms stagger, words rise with fades at 40ms, lines sweep up masked at 120ms. Same mechanism, three distinct editorial voices.

**Accessibility is handled, not broken**

Naive splitting shatters words into meaningless single-letter spans for assistive tech. SplitText 3.13 applies \`aria-label\` to the container and hides the fragments from the accessibility tree by default, so screen readers announce the original sentence while sighted users see the choreography.

**Why yPercent for the rise**

\`yPercent: 110\` displaces each piece by its *own* height, so the same code works at every font size in the \`clamp()\` range — a pixel offset would under-hide large headlines and over-travel small paragraph text. Combined with masks, pieces are genuinely invisible until they cross their sill.

**Customizing it**

Change the per-mode staggers, add \`from: 'random'\` scatter, or attach the entrance to a ScrollTrigger for viewport-triggered reveals. Related type effects: scroll-scrubbed characters in [scroll letter stagger](/ui-snippets/scroll-letter-stagger/), typing in [scroll typewriter](/ui-snippets/scroll-typewriter/), word emphasis in [text reveal on scroll](/ui-snippets/text-reveal-scroll/), and the vanilla [split text](/ui-snippets/split-text/) cousin.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and SplitText from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The headline plays its character entrance immediately.` },
      { title: 'Click Words', text: `Text reverts, re-splits, and rises word by word.` },
      { title: 'Click Lines', text: `Real wrapped lines sweep up behind masks.` },
      { title: 'Resize the preview', text: `Line splits track the browser's actual wrapping.` },
      { title: 'Tune the choreography', text: `Each mode's stagger and motion is one object.` },
    ] },
    features: [
      { title: 'True line splitting', text: `Measures real wrap points post-layout.` },
      { title: 'Built-in masking', text: `mask option generates clip wrappers.` },
      { title: 'Clean revert', text: `Original markup restored between modes.` },
      { title: 'Three granularities', text: `chars, words, and lines from one split.` },
      { title: 'A11y-safe', text: `aria-label preserves the readable sentence.` },
      { title: 'Self-scaling rise', text: `yPercent tracks responsive font sizes.` },
      { title: 'Per-mode voices', text: `Distinct stagger and motion per mode.` },
      { title: 'Resize-aware', text: `3.13 re-splits lines on wrap changes.` },
    ],
    useCases: [
      { title: 'Hero headlines', text: `Character entrances for landing pages; exit them with [scroll hero exit](/ui-snippets/scroll-hero-exit/).` },
      { title: 'Editorial intros', text: `Masked line reveals for articles, beside a [reading time left](/ui-snippets/scroll-reading-time/) pill.` },
      { title: 'Scroll-triggered copy', text: `Attach to ScrollTrigger like [text reveal on scroll](/ui-snippets/text-reveal-scroll/).` },
      { title: 'Word-wheel pairings', text: `Static structure via SplitText, rotating slot via [scroll word wheel](/ui-snippets/scroll-word-wheel/).` },
      { title: 'Quote moments', text: `Line-by-line pull quotes, styled like [pull quote](/ui-snippets/pull-quote/).` },
      { title: 'Loading transitions', text: `Re-split and replay on route changes, after a [top loading bar](/ui-snippets/top-loading-bar/).` },
      { icon: 'CODE', title: 'Related: Page Flip', desc: 'See the [Page Flip](/ui-snippets/page-flip/) for a related animations pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why do line-based reveals need a plugin at all?', a: `Because line breaks don't exist in markup — they're a layout outcome that changes with every container width and font load. SplitText measures where the browser actually wrapped the text and wraps each rendered line in a div, and the 3.13 rewrite re-splits automatically when resizing changes the wraps. Chars and words are loopable by hand; lines genuinely aren't.` },
      { q: 'What does the mask option do?', a: `It makes SplitText wrap each piece (line, word, or char) in an overflow-clipped parent during the split, so yPercent entrances slide in from behind an invisible sill with no hand-written wrapper CSS. This snippet switches the mask to match the active mode — chars clip per-character, lines clip per-line — which keeps each granularity's motion looking native.` },
      { q: 'Why call revert() before re-splitting?', a: `revert() restores the element's exact original markup, removing every generated span and wrapper. Splitting an already-split element is the classic SplitText bug: spans nest inside spans, transforms compound, and text metrics drift. Reverting first makes mode switches idempotent — you can toggle chars/words/lines forever without DOM residue.` },
      { q: 'Does splitting text break screen readers?', a: `Hand-rolled splitting does — assistive tech reads single-letter spans as gibberish. SplitText 3.13 handles this by default: it applies an aria-label with the original text to the container and hides the fragment spans from the accessibility tree, so the sentence announces normally while the visual pieces animate.` },
      { q: 'Can I animate chars, words, and lines together in one sequence?', a: `Yes — type: 'lines,words,chars' builds the full hierarchy in one split, and all three arrays remain valid simultaneously. A common pattern is lines rising masked while their chars carry a secondary rotation, by targeting split.lines and split.chars at overlapping timeline positions. Just animate transforms at one level at a time per property to avoid compounding.` },
      { q: 'How do I use SplitText in React, Vue, or Angular?', a: `Split in a mount effect (useEffect, onMounted, ngAfterViewInit) after fonts are ready — document.fonts.ready avoids splitting against fallback metrics — and call split.revert() in the cleanup so unmount restores clean markup. Guard StrictMode double-runs by reverting any existing instance first. Keep the text as normal JSX/template content; Tailwind typography classes survive the split untouched.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer SplitText's internals by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through why split.revert() must run before every re-split, or exactly what the mask option is generating under the hood to make the masked rise work with zero custom wrapper CSS. The same assistant can help optimize it — ask whether splitting all three granularities (lines, words, chars) up front is wasteful when only one mode's array is animated at a time, or how to avoid a layout thrash if this ran on many elements at once. It's just as useful for extending the effect: ask it to attach the reveal to a ScrollTrigger so it fires on scroll into view instead of on click, add a from: 'random' scatter to the character stagger, or chain a line-by-line reveal into a follow-up scroll-scrubbed effect. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a switchable text-reveal effect in plain HTML, CSS, and JavaScript using GSAP with its SplitText plugin loaded from a CDN — no other libraries.

Requirements:
- A heading and a paragraph, plus three buttons labeled Chars, Words, and Lines that switch the active reveal granularity.
- On each mode change, call revert() on any existing SplitText instance before creating a new one, so repeated switches never nest generated spans inside previously generated spans.
- Create the split with type set to lines, words, and chars together in one call (not three separate splits), and pass a mask option matching the active mode so SplitText generates overflow-clipped wrapper elements automatically instead of you writing manual overflow:hidden containers.
- Animate whichever array (split.chars, split.words, or split.lines) matches the active mode using gsap.from, with yPercent-based vertical displacement (not a fixed pixel offset) so the entrance scales correctly across different font sizes, plus a distinct stagger and duration per mode: characters should use a small stagger with a slight rotation, words a fade plus rise, and lines a slower masked sweep.
- Ensure the original sentence remains announced correctly to screen readers despite the DOM being full of generated per-character and per-word spans.
- Play the default (Chars) mode automatically once on load, and re-play the corresponding mode whenever a button is clicked.`,
    },
  },
};

export default gsapSplitText;
