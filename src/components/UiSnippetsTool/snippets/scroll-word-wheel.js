const scrollWordWheel = {
  id: 'scroll-word-wheel',
  title: 'Scroll Word Wheel',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sww-top"><p>Scroll ↓</p></section>
<section class="sww-stage" id="swwStage">
  <h2 class="sww-line">
    <span>Built for</span>
    <span class="sww-wheel">
      <span class="sww-list" id="swwList">
        <em style="--wc:#818cf8">designers</em>
        <em style="--wc:#22d3ee">founders</em>
        <em style="--wc:#34d399">marketers</em>
        <em style="--wc:#f472b6">developers</em>
        <em style="--wc:#fbbf24">everyone</em>
      </span>
    </span>
  </h2>
  <p class="sww-sub">The scrollbar turns the wheel — one notch per scroll segment.</p>
</section>
<section class="sww-bottom"><p>Scroll up to spin the wheel back.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sww-top,.sww-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sww-stage{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#111631,#07080d);text-align:center;padding:0 20px}
.sww-line{display:flex;flex-wrap:wrap;justify-content:center;align-items:baseline;gap:0 .35em;font-size:clamp(30px,6.4vw,64px);font-weight:800;letter-spacing:-.02em}
.sww-wheel{position:relative;display:inline-block;height:1.24em;overflow:hidden;vertical-align:bottom}
.sww-wheel::before,.sww-wheel::after{content:'';position:absolute;left:0;right:0;height:.28em;z-index:2;pointer-events:none}
.sww-wheel::before{top:0;background:linear-gradient(180deg,#0b1026,transparent)}
.sww-wheel::after{bottom:0;background:linear-gradient(0deg,#0b1026,transparent)}
.sww-list{display:flex;flex-direction:column;will-change:transform}
.sww-list em{font-style:normal;height:1.24em;line-height:1.24em;color:var(--wc);white-space:nowrap;text-align:left}
.sww-sub{color:#8a90a8;font-size:15px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var list = document.getElementById('swwList');
var words = list.children;
var COUNT = words.length;

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#swwStage',
    start: 'top top',
    end: '+=' + (COUNT * 55) + '%',
    scrub: 0.35,
    pin: true
  }
});

// One notch per word: hold, then a quick snap to the next line.
// yPercent moves by one word-height (100 / COUNT of the list) per notch.
for (var i = 1; i < COUNT; i++) {
  tl.to(list, {
    yPercent: -(100 / COUNT) * i,
    duration: 0.35,
    ease: 'power2.inOut'
  }, i - 0.35);
}`,

  seo: {
    title: 'Scroll Word Wheel — Free GSAP Headline Snippet',
    description: `A headline word-wheel turned by the scrollbar: a masked word column snaps notch-by-notch through five rotating words. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Word Wheel — A Rotating Headline Word Turned by Scroll',
      description: `The scroll word wheel is the "Built for designers / founders / marketers…" headline — but instead of auto-rotating on a timer, the wheel is turned by the scrollbar. Each segment of scroll snaps the masked word column one notch to the next word, and scrolling up spins it back. Giving the rotation to the reader turns a passive header into a scrubbed reveal of who the product serves. This snippet builds it with GSAP ScrollTrigger (from a CDN) and a masked column.

**A one-line-tall mask hides all but the current word**

The wheel is an inline-block \`.sww-wheel\` sized to exactly \`1.24em\` tall with \`overflow: hidden\` — a viewport one line high. Inside it, the word list is a flex column where every \`<em>\` occupies that same 1.24em. Only one word can be visible at a time; the rest wait above or below the mask. Sizing in \`em\` keeps the mask correct at every clamp() font size without any JS measurement.

**yPercent moves in exact word-height notches**

Each notch tweens the list to \`yPercent: -(100 / COUNT) × i\`. Because \`yPercent\` is relative to the *list's* own height, and each word is exactly 1/COUNT of that height, every step lands pixel-perfectly on the next word — no hardcoded pixel offsets to break when the font size changes responsively.

**Hold-then-snap pacing instead of continuous slide**

Rather than one linear tween (which would show word edges scrolling constantly), the timeline places a short 0.35-duration \`power2.inOut\` tween just before each integer position: the wheel *holds* on a word for most of its segment, then snaps decisively to the next. Under a scrub, that means each word gets real reading time and transitions feel mechanical-in-a-good-way, like a slot drum clicking between detents. The pacing lives entirely in the position/duration math — \`i − 0.35\` — so retuning the dwell time is one number.

**Baseline alignment keeps the sentence intact**

The static "Built for" and the wheel sit in a flex row aligned to \`baseline\`, and the wheel uses \`vertical-align: bottom\` so the moving words share the sentence's baseline. Word-wheel implementations commonly float half a pixel off the line; locking heights and line-heights to the same 1.24em is what keeps every word sitting exactly where static text would.

**Gradient fades sell the drum**

Two thin pseudo-element gradients at the mask's top and bottom fade incoming and outgoing words into the background, suggesting a curved drum edge — a purely decorative touch that reads as depth without any 3D transforms.

**Scroll distance scales with the word count**

\`end\` is \`COUNT × 55%\`, so each word owns the same scroll budget however many you add; the notch loop derives everything else from \`COUNT\`. Add a sixth word by adding one \`<em>\` — no other edits.

**Per-word color via a custom property**

Each word carries its own \`--wc\` accent, so the highlight color changes with the audience being named — a small cue that each notch is a distinct claim.

**Customizing it**

Edit the words (keep them short enough for your narrowest viewport), tune the dwell via the 0.35 constants, or drop the pin and trigger it inside a hero. For the timer-based version see the [word flip hero](/ui-snippets/word-flip-hero/); pair with a [scroll typewriter](/ui-snippets/scroll-typewriter/) or hand off to a [scroll letter stagger](/ui-snippets/scroll-letter-stagger/) headline.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `The masked wheel renders showing its first word.` },
      { title: 'Scroll into the stage', text: `It pins; the wheel holds, then snaps a notch.` },
      { title: 'Keep scrolling', text: `Each segment clicks to the next colored word.` },
      { title: 'Scroll back up', text: `The wheel spins backward through its words.` },
      { title: 'Edit the words', text: `Add an em with its own --wc; pacing auto-scales.` },
    ] },
    features: [
      { title: 'Scroll-turned wheel', text: `The scrollbar rotates the headline word.` },
      { title: 'Em-based mask', text: `A 1.24em window needs no JS measuring.` },
      { title: 'Exact notches', text: `yPercent steps land on word boundaries.` },
      { title: 'Hold-then-snap', text: `Words dwell, then click like a slot drum.` },
      { title: 'Baseline-true', text: `Moving words share the sentence baseline.` },
      { title: 'Drum-edge fades', text: `Gradient masks suggest a curved wheel.` },
      { title: 'Count-aware', text: `Scroll budget scales with the word list.` },
      { title: 'Per-word accent', text: `Each word brings its own color.` },
    ],
    useCases: [
      { title: 'Audience headlines', text: `Name every persona you serve; expand each with [sticky scroll features](/ui-snippets/scroll-sticky-features/).` },
      { title: 'Hero sections', text: `A scrubbed alternative to the auto-playing [word flip hero](/ui-snippets/word-flip-hero/).` },
      { title: 'Capability lists', text: `Cycle verbs — build, ship, scale — before a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/).` },
      { title: 'Campaign taglines', text: `Snap through slogan variants, then a [scroll curtain reveal](/ui-snippets/scroll-curtain-reveal/) transition.` },
      { title: 'Typing alternatives', text: `Where per-character motion fits better, use the [scroll typewriter](/ui-snippets/scroll-typewriter/).` },
      { title: 'Stat pairings', text: `Match each audience with a number via [count up](/ui-snippets/count-up/).` },
      { icon: 'CODE', title: 'Related: Three.js Scroll Typography Shatter', desc: 'See the [Three.js Scroll Typography Shatter](/ui-snippets/three-scroll-typo-shatter/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the wheel show exactly one word at a time?', a: `The wheel is an overflow-hidden inline-block exactly 1.24em tall — a one-line viewport — and every word in the inner column is locked to that same height and line-height. Only the word aligned with the window is visible; the rest sit above or below the mask. Because everything is em-based, the mask stays exact at every responsive font size.` },
      { q: 'How do the notch positions stay accurate?', a: `Each step tweens the column to yPercent −(100/COUNT) × i. yPercent is relative to the list's own height, and each word is exactly 1/COUNT of it, so steps land on word boundaries by construction — no pixel constants that would break when clamp() changes the font size or a different typeface changes metrics.` },
      { q: 'Why does the wheel snap instead of sliding continuously?', a: `The timeline places a short 0.35-unit power2.inOut tween just before each integer position, so under the scrub the wheel dwells on a word for most of its segment and then clicks over. Continuous sliding would show word edges constantly and make everything half-readable; hold-then-snap gives each word genuine reading time, like a slot drum settling into detents.` },
      { q: 'How do I add or change words?', a: `Edit the em elements — each carries its own --wc accent color. COUNT is read from the DOM, the trigger's end scales at 55% of viewport height per word, and the notch loop derives every position from COUNT, so a sixth word needs zero JS edits. Keep words short enough to fit your narrowest viewport since the wheel is white-space: nowrap.` },
      { q: 'How do I use this scroll word wheel in React, Vue, or Angular?', a: `Render the words from an array and build the timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — inside gsap.context scoped to the stage ref, reverting on cleanup so the pin unregisters on unmount. Derive COUNT from the array, not the DOM. The mask is two Tailwind-friendly rules (overflow-hidden plus a fixed em height); keep the em heights in a style tag or arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to work out the yPercent notch math or the hold-then-snap timeline positions by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each notch is placed at timeline position i minus 0.35 instead of at a plain integer, and why yPercent (rather than a pixel translateY) is used to land on exact word boundaries. The same assistant can help optimize it — for instance checking whether the end value's COUNT times 55 percent scroll budget still feels right once the word list grows past ten entries, or whether the gradient fade pseudo-elements should be simplified for very small type sizes. It is just as useful for extending the effect: ask it to make the wheel loop continuously instead of stopping on the last word, add a subtle 3D rotateX tilt to sell the drum illusion more convincingly, or let a click on the wheel jump directly to a specific word instead of only scroll-driven notches. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll word wheel" headline in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A headline made of static leading text followed by a masked "wheel" element sized to exactly one line's height in em units (not pixels) with overflow: hidden, so only one word from an inner vertical list is visible at a time.
- The inner word list must be a flex column where every word element is locked to that same one-line em height, so that moving the list by whole multiples of that height lands exactly on word boundaries regardless of the responsive font size.
- Register a single GSAP timeline on a ScrollTrigger with pin: true and scrub, whose end scroll distance scales with the number of words (for example word count times a fixed percentage), so adding or removing words automatically adjusts how much scroll distance the whole effect consumes.
- For each word transition, add a short discrete tween (not one continuous linear tween across the whole timeline) that moves the list by yPercent equal to minus 100 divided by the word count, times the word's index, using an in-out easing curve — and position each of these short tweens just before its corresponding integer timeline position, so the wheel visibly holds on each word for most of its scroll segment and then snaps quickly to the next, like a mechanical drum clicking between detents.
- Add two thin gradient-fade pseudo-elements at the top and bottom edge of the mask to visually suggest a curved drum rather than a flat hard-edged window.
- The whole sequence must reverse cleanly when scrolling back up, spinning the wheel backward through the words in the same notch-by-notch fashion.`,
    },
  },
};

export default scrollWordWheel;
