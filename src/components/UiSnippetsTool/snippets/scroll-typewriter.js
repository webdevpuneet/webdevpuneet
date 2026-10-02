const scrollTypewriter = {
  id: 'scroll-typewriter',
  title: 'Scroll Typewriter',
  lastmod: '2026-07-11',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="stw-top"><p>Scroll ↓</p></section>
<section class="stw-stage" id="stwStage">
  <div class="stw-terminal">
    <div class="stw-bar"><i></i><i></i><i></i></div>
    <div class="stw-body">
      <p class="stw-line" data-text="The scrollbar is the keyboard."></p>
      <p class="stw-line stw-accent" data-text="Every tick types a character — reverse to delete."></p>
      <span class="stw-caret" id="stwCaret"></span>
    </div>
  </div>
</section>
<section class="stw-bottom"><p>Scroll up and watch the text un-type itself.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.stw-top,.stw-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.stw-stage{height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#101530,#07080d)}
.stw-terminal{width:min(680px,92vw);border-radius:16px;background:#0d1020;border:1px solid rgba(255,255,255,.1);box-shadow:0 30px 80px rgba(0,0,0,.55);overflow:hidden}
.stw-bar{display:flex;gap:7px;padding:13px 16px;border-bottom:1px solid rgba(255,255,255,.07)}
.stw-bar i{width:11px;height:11px;border-radius:50%;background:#2c3150}
.stw-bar i:first-child{background:#f1645e}.stw-bar i:nth-child(2){background:#eebd3e}.stw-bar i:nth-child(3){background:#3cab4e}
.stw-body{padding:30px 28px 38px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:clamp(17px,3vw,26px);line-height:1.7;min-height:200px}
.stw-line{min-height:1.7em}
.stw-line .ch{display:none}
.stw-accent{color:#7dd3fc}
.stw-caret{display:inline-block;width:.55em;height:1.15em;vertical-align:text-bottom;background:#7dd3fc;animation:stw-blink 1s steps(1) infinite}
@keyframes stw-blink{50%{opacity:0}}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Split each line into per-character spans (display:none until "typed").
var lines = document.querySelectorAll('.stw-line');
var allChars = [];
lines.forEach(function (line) {
  var text = line.getAttribute('data-text');
  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    span.className = 'ch';
    span.textContent = text[i] === ' ' ? '\\u00A0' : text[i];
    line.appendChild(span);
    allChars.push(span);
  }
});

var caret = document.getElementById('stwCaret');

// display isn't tweenable, so GSAP applies it instantly at each tween's
// start — a stagger of near-zero-duration tweens becomes stepped typing
// that scrubs (and reverses) perfectly with the scrollbar.
var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#stwStage',
    start: 'top top',
    end: '+=180%',
    scrub: true,
    pin: true
  }
});

tl.to(allChars, {
  display: 'inline',
  duration: 0.0001,
  stagger: 1,
  ease: 'none',
  onUpdate: function () {
    // Park the caret after the last typed character.
    var last = null;
    for (var i = allChars.length - 1; i >= 0; i--) {
      if (allChars[i].style.display === 'inline') { last = allChars[i]; break; }
    }
    var host = last ? last.parentNode : lines[0];
    host.appendChild(caret);
  }
});`,

  seo: {
    title: 'Scroll Typewriter — Free GSAP Scrubbed Typing Snippet',
    description: `A typewriter effect scrubbed by the scrollbar: characters type as you scroll down and delete on the way up, caret included. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Typewriter — Type Text With the Scrollbar, Delete It in Reverse',
      description: `The scroll typewriter turns the classic typing animation into a scrubbed one: instead of playing on a timer, characters appear one by one as you scroll down — and *un-type* when you scroll back up, caret and all. That reversibility is what makes it feel like the scrollbar is the keyboard. This snippet builds it with GSAP ScrollTrigger (from a CDN), a per-character DOM split, and a display-toggling stagger trick.

**Lines split into per-character spans at load**

Each \`.stw-line\` carries its copy in a \`data-text\` attribute; JavaScript splits it into individual \`<span class="ch">\` elements, converting spaces to \`\\u00A0\` so they don't collapse. Keeping the source text in an attribute (rather than markup) means the split can't double-run into nested spans, and the untyped state renders as genuinely empty lines with a reserved \`min-height\` so the terminal never changes size while typing.

**display: none is the typing mechanism**

Untyped characters are \`display: none\` — they occupy no width at all. That's the crucial choice over \`opacity: 0\` or \`visibility: hidden\`: invisible-but-present characters would still take space, so the caret couldn't sit at the typing position and text would appear inside a pre-reserved gap. With \`display\`, each revealed character genuinely extends the line, exactly like real typing.

**A stagger of instant tweens creates stepped, scrubbable typing**

\`display\` isn't interpolatable, so GSAP applies it at each tween's start. The snippet exploits that: one \`tl.to(allChars, ...)\` with \`duration: 0.0001\` and \`stagger: 1\` lays hundreds of near-instant tweens along the timeline like teeth on a gear. As the scrubbed playhead crosses each tween, its character pops in; when the playhead moves backward, ScrollTrigger restores the recorded previous value (\`none\`), deleting the character. Reverse typing costs nothing extra — it falls out of GSAP's value-restoration model.

**The caret physically follows the typing position**

On every timeline update, a loop finds the last visible character and re-appends the caret element directly after it (moving it between lines automatically at the line break). Because hidden characters occupy no space, the caret always hugs the true end of the typed text, while a CSS \`steps(1)\` blink keeps it alive during scroll pauses.

**Pinned so the typing owns its scroll distance**

The terminal pins for \`+=180%\` of scroll — enough that each wheel tick types a few characters rather than whole sentences. Widen \`end\` for slower, more deliberate typing; the character count is mapped across whatever distance you give it, since the stagger normalizes to the timeline's total duration.

**Why a terminal frame**

The macOS-style window (traffic lights, mono font, blinking block caret) primes the "typing" metaphor and gives the text a stable, styled container. It's decoration though — the mechanism works on any headline or paragraph.

**scrub: true, not a smoothed scrub — on purpose**

Most scroll effects in this library use \`scrub: 0.4\` so motion glides after each wheel tick, but typing is a *discrete* effect: characters either exist or don't, so there's no in-between state for smoothing to render. A raw \`scrub: true\` locks the typed length exactly to the scrollbar, which keeps the caret honest — pause scrolling and the text is precisely where the playhead says. Smoothing here would only delay character pops after the wheel stops, making the typewriter feel laggy rather than fluid.

**Customizing it**

Edit the \`data-text\` attributes (the split adapts to any length), add more lines, or restyle the caret to a thin bar. For a timer-based version see the [typewriter](/ui-snippets/typewriter/) snippet; combine with [typing code](/ui-snippets/typing-code/) for code content, or hand off to a [scroll text clip reveal](/ui-snippets/scroll-text-clip-reveal/) for the following section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Lines split into hidden per-character spans on load.` },
      { title: 'Scroll into the terminal', text: `It pins and characters start typing with each tick.` },
      { title: 'Watch the caret', text: `It rides the end of the typed text across line breaks.` },
      { title: 'Scroll back up', text: `Characters delete in reverse — scrubbed typing.` },
      { title: 'Change the copy', text: `Edit the data-text attributes; the split adapts.` },
    ] },
    features: [
      { title: 'Scrubbed typing', text: `The scrollbar types and deletes characters.` },
      { title: 'Per-character split', text: `data-text becomes individual spans at load.` },
      { title: 'display-based reveal', text: `Typed chars truly extend the line width.` },
      { title: 'Stepped stagger', text: `Near-instant tweens act like gear teeth.` },
      { title: 'Following caret', text: `Re-appended after the last visible char.` },
      { title: 'Blinking idle', text: `steps(1) CSS blink during scroll pauses.` },
      { title: 'Stable layout', text: `min-height reserves space for untyped lines.` },
      { title: 'Terminal chrome', text: `Traffic-light window frames the effect.` },
    ],
    useCases: [
      { title: 'Developer landing pages', text: 'Type a value proposition inside a terminal, using [typing code](/ui-snippets/typing-code/) style content scrubbed by the scrollbar.' },
      { title: 'Hero manifestos', text: 'Scrub a manifesto line by line, then transition with a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/), with deletion happening when the reader scrolls back up.' },
      { title: 'Product storytelling headings', text: 'Type each chapter heading inside a [scroll pin story](/ui-snippets/scroll-pin-story/), with `display`-based reveal extending the real line width.' },
      { title: 'CLI tool demos', text: 'Show commands appearing as users scroll in a [terminal window](/ui-snippets/terminal-window/), with stepped stagger acting like gear teeth.' },
      { title: 'Portfolio introductions and quotes', text: 'Make a typed self-introduction that beats a static line, or type pull quotes as readers arrive, alongside [text reveal scroll](/ui-snippets/text-reveal-scroll/).' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Shatter & Assemble', desc: 'See the [Three.js Scroll Shatter & Assemble](/ui-snippets/three-scroll-shatter-assemble/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does scrolling type the characters?', a: `Each character is a display: none span. A pinned, scrubbed timeline runs one tween per character with duration 0.0001 and stagger 1 — GSAP applies non-tweenable properties like display instantly at each tween's start, so as the scrubbed playhead crosses each tween its character pops in. The playhead position in the timeline is literally the typing position.` },
      { q: 'Why does scrolling up delete the text?', a: `When a scrubbed timeline moves backward past a tween's start, GSAP restores the property's recorded previous value — display: none here. So reverse deletion isn't coded anywhere; it falls out of GSAP's value-restoration model. That's also why the caret walks backward correctly: the update callback re-finds the last visible character every tick.` },
      { q: 'Why use display: none instead of opacity for hidden characters?', a: `Opacity-hidden characters still occupy width, so the line would be full-length from the start, the caret couldn't sit at the typing position, and text would fill a pre-reserved gap instead of growing. display: none characters take no space, so each reveal genuinely extends the line — the geometry of real typing.` },
      { q: 'How do I control the typing speed?', a: `Speed is scroll-mapped, not timed: the trigger's end (+=180%) spreads all characters across that distance, so a longer end means fewer characters per wheel tick. To pace lines differently, split them into separate tweens with position labels, or insert empty tl.to({}, { duration: n }) gaps as pauses between lines.` },
      { q: 'Can it type longer content, like code or several paragraphs?', a: `Yes — the splitter handles any data-text length, and a few hundred spans is trivial for the DOM. For very long content (thousands of characters) split by word instead of character to cut the element count tenfold, and stretch the trigger's end so per-tick typing stays readable. The monospace terminal already suits code; keep angle brackets HTML-escaped inside the attribute so the splitter receives literal text.` },
      { q: 'How do I use this scroll typewriter in React, Vue, or Angular?', a: `Do the character split and timeline in a mount effect (useEffect, onMounted, ngAfterViewInit) against refs, not document queries, and guard against double-splitting under StrictMode by checking for existing .ch spans. Revert a gsap.context in the cleanup so the pin dies on unmount. Keep chars in the DOM rather than state — re-rendering per character would fight the scrub. The terminal shell styles port to Tailwind directly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to reverse-engineer every ScrollTrigger option by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through what each line of the timeline config does, or to explain in plain terms why display can't be tweened directly and what the near-zero duration workaround is actually doing. The same assistant can help you optimize it — profiling whether splitting by word instead of character makes sense for a long paragraph, or suggesting a cheaper way to track the caret than walking the full character array on every update tick. It's just as useful for extending the effect: ask it to add a typing sound on each revealed character, layer in a syntax-highlighted code block instead of plain sentences, or chain multiple terminal sections together so one typewriter hands off to the next as you keep scrolling. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll typewriter" effect in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A pinned section containing one or more lines of text, each line's real text stored in a data-text attribute (not as visible markup).
- On load, split each line's text into one character span per character, appended to the line. Replace literal spaces with a non-breaking space so gaps don't collapse.
- Every character span starts with CSS display: none (not opacity or visibility) so the line has zero width until a character is revealed.
- Register a single GSAP timeline on a ScrollTrigger with pin: true, scrub: true, start at the top of the viewport, and an end a few hundred percent of the viewport tall.
- Inside that timeline, tween all character spans' display to inline with a near-zero duration (e.g. 0.0001) and a stagger of 1, so GSAP treats each character as an instantly-triggered tooth spread evenly across the whole scrubbed timeline.
- Do not write any manual scroll-position math or a setInterval-based timer — the typing speed must come entirely from GSAP's scrub mapping scroll position to timeline progress.
- Add a blinking caret element that, on every scrollTrigger update, is moved via appendChild to sit right after whichever character is currently the last one visible, so it visibly tracks the typing position including across line breaks.
- Confirm and explain: scrolling back up should delete characters in reverse for free, with no extra code, because of how GSAP scrubbing reverts tweened properties past their start point.`,
    },
  },
};

export default scrollTypewriter;
