const scrollLetterStagger = {
  id: 'scroll-letter-stagger',
  title: 'Scroll Letter Stagger',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sls-top"><p>Scroll ↓</p></section>
<section class="sls-stage" id="slsStage">
  <h2 class="sls-line" id="slsLine1" data-text="Letters that"></h2>
  <h2 class="sls-line sls-grad" id="slsLine2" data-text="ride the scroll"></h2>
  <div class="sls-rule" id="slsRule"></div>
</section>
<section class="sls-bottom"><p>Scroll up — every letter retreats in reverse order.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07080d;color:#fff}
.sls-top,.sls-bottom{min-height:70vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.sls-stage{height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;overflow:hidden;background:radial-gradient(75% 65% at 50% 45%,#111631,#07080d);padding:0 16px}
.sls-line{font-size:clamp(36px,8vw,84px);font-weight:800;letter-spacing:-.02em;line-height:1.08;white-space:nowrap;overflow:hidden;padding-bottom:.08em}
.sls-line .ch{display:inline-block;will-change:transform,opacity}
.sls-grad .ch{background:linear-gradient(120deg,#a5b4fc,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent}
.sls-rule{width:0;max-width:min(420px,80vw);height:3px;border-radius:99px;background:linear-gradient(90deg,#818cf8,#22d3ee);margin-top:26px}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Split each headline into inline-block character spans.
function split(el) {
  var text = el.getAttribute('data-text');
  var chars = [];
  for (var i = 0; i < text.length; i++) {
    var span = document.createElement('span');
    span.className = 'ch';
    span.textContent = text[i] === ' ' ? '\\u00A0' : text[i];
    el.appendChild(span);
    chars.push(span);
  }
  return chars;
}
var chars1 = split(document.getElementById('slsLine1'));
var chars2 = split(document.getElementById('slsLine2'));

var tl = gsap.timeline({
  scrollTrigger: {
    trigger: '#slsStage',
    start: 'top top',
    end: '+=170%',
    scrub: 0.4,
    pin: true
  }
});

// Line 1 rises left-to-right, line 2 follows from its own edge,
// then the rule draws once the type has landed.
tl.from(chars1, {
  yPercent: 120, rotation: 9, opacity: 0,
  ease: 'none', stagger: 0.05
}, 0)
  .from(chars2, {
    yPercent: 120, rotation: -9, opacity: 0,
    ease: 'none', stagger: 0.05
  }, 0.35)
  .to('#slsRule', { width: 'min(420px, 80vw)', ease: 'none', duration: 0.5 }, 1.1);`,

  seo: {
    title: 'Scroll Letter Stagger — Free GSAP Split Text Snippet',
    description: `Headline letters rise, rotate, and land one by one as you scroll — split-text stagger with masked lines and a drawn rule. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Letter Stagger — Split-Text Headlines Scrubbed by Scroll',
      description: `The scroll letter stagger is the split-text entrance — each character rising from below its line, straightening as it lands — but scrubbed to the scrollbar instead of played on a timer: letters ride up exactly as far as you've scrolled, and retreat in reverse order when you scroll back. This snippet builds it with GSAP ScrollTrigger (from a CDN), a hand-rolled character splitter, and masked line boxes — no SplitText plugin.

**A twelve-line splitter instead of a plugin**

Each headline stores its copy in \`data-text\`; a small function converts it into inline-block \`<span class="ch">\` elements, mapping spaces to \`\\u00A0\` so they keep width. Inline-block is the load-bearing detail — plain inline spans ignore transforms, so every character must become a box before \`yPercent\` or \`rotation\` can touch it. Reading from an attribute (not innerHTML) also makes the split idempotent: re-running it can't nest spans inside spans.

**yPercent + overflow: hidden = the masked rise**

Characters start at \`yPercent: 120\` — 120% of *their own height* below their resting spot — while each line has \`overflow: hidden\`. The line box acts as a mask: letters are genuinely invisible until they cross their baseline, rising as if from behind a sill. Using \`yPercent\` instead of a pixel offset means the hide distance self-scales with the clamped responsive font size, and a small \`padding-bottom\` on the line keeps descenders (y, g) from being clipped at rest.

**Rotation gives the rise its physicality**

Each character also un-rotates from 9° (line one) or −9° (line two) as it lands. Straight vertical rises read as blinds; adding a settling rotation makes letters feel individually *placed*, and mirroring the angle between lines makes the two lines visually answer each other.

**Stagger order becomes spatial order under scrub**

\`stagger: 0.05\` offsets each character's tween along the timeline, and because the timeline is scrubbed, temporal offset becomes spatial: at any scroll position the left letters are further through their arc than the right ones, producing a wave that sweeps across the word. Scrolling up runs the wave backward — last letter retreats first — for free.

**Three beats on one timeline**

Line one starts at 0, line two overlaps at 0.35 (starting while line one's tail is still landing, so the headline reads as one gesture), and the gradient rule draws from 0 width at 1.1 — a sign-off that only completes once the type has fully landed. The rule animates \`width\` deliberately: it's a single tiny element, so the layout cost is nil and it avoids a scale-x's stretched-gradient artifact.

**Gradient text survives the split**

The second line's gradient uses \`background-clip: text\` applied to the *characters*, so each span carries its slice of the gradient. Applying it to the parent wouldn't survive the split, since transformed inline-blocks establish their own paint containers.

**Customizing it**

Edit the \`data-text\` attributes (the splitter adapts), flip the wave direction with \`stagger: { each: 0.05, from: 'end' }\`, or add a third line at a later position. Related type effects: word-level [text reveal on scroll](/ui-snippets/text-reveal-scroll/), the timer-based [split text](/ui-snippets/split-text/), scrubbed typing in [scroll typewriter](/ui-snippets/scroll-typewriter/), and self-drawing outlines in [scroll text draw](/ui-snippets/scroll-text-draw/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `Headlines split into character spans on load.` },
      { title: 'Scroll into the stage', text: `Letters rise from behind their line masks.` },
      { title: 'Watch the wave', text: `The stagger sweeps left to right across each line.` },
      { title: 'Scroll back up', text: `Letters retreat in reverse order.` },
      { title: 'Change the copy', text: `Edit data-text; the splitter and wave adapt.` },
    ] },
    features: [
      { title: 'Plugin-free split', text: `Twelve lines replace SplitText for this case.` },
      { title: 'Masked rise', text: `overflow: hidden lines hide waiting letters.` },
      { title: 'Self-scaling offset', text: `yPercent tracks the responsive font size.` },
      { title: 'Settling rotation', text: `Letters un-rotate as they land.` },
      { title: 'Scrubbed wave', text: `Stagger order becomes spatial order.` },
      { title: 'Overlapped lines', text: `Line two starts before line one finishes.` },
      { title: 'Drawn rule', text: `A gradient underline signs off the headline.` },
      { title: 'Split-safe gradient', text: `background-clip applied per character.` },
    ],
    useCases: [
      { title: 'Hero headline entrances', text: 'Land a statement letter by letter as the reader scrolls, and exit it later with a [scroll hero exit](/ui-snippets/scroll-hero-exit/).' },
      { title: 'Chapter title punctuation', text: 'Introduce chapters in a [scroll pin story](/ui-snippets/scroll-pin-story/), with masked lines hiding waiting letters until they rise.' },
      { title: 'Portfolio name reveals', text: 'Land your name letter by letter, then follow with a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) of projects as the portfolio opens up.' },
      { title: 'Campaign statements', text: 'Pair the type with a [scroll word wheel](/ui-snippets/scroll-word-wheel/), or brighten whole paragraphs with [text reveal scroll](/ui-snippets/text-reveal-scroll/).' },
      { title: 'Plugin-free split learning', text: 'See how a dozen lines of JavaScript replace a split-text plugin here, with `yPercent` scaling to the responsive font size, and compare with the timer-based [split text](/ui-snippets/split-text/).' },
      { icon: 'CODE', title: 'Related: Scroll Milestone Confetti', desc: 'See the [Scroll Milestone Confetti](/ui-snippets/scroll-milestone-confetti/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the headlines split into characters?', a: `Each line keeps its copy in a data-text attribute; a small loop creates one inline-block span per character, mapping spaces to non-breaking spaces so they keep width. Inline-block matters because plain inline elements ignore transforms. Reading from the attribute also makes the split idempotent — it can never nest spans on a re-run.` },
      { q: 'Where do the letters rise from?', a: `Each character starts at yPercent 120 — 120% of its own height below its resting position — while the line box clips with overflow: hidden. The line acts as a mask, so letters are genuinely hidden until they cross the baseline. yPercent self-scales with the clamp()ed font size, and the line's small bottom padding keeps descenders from being clipped at rest.` },
      { q: 'Why does the wave sweep across the word?', a: `stagger: 0.05 offsets each character's tween along the timeline, and scrubbing converts that temporal offset into a spatial one: at any scroll position, earlier letters are further through their rise than later ones. Reversing scroll runs the wave backward automatically. from: 'end' or from: 'center' in a stagger object changes the sweep direction.` },
      { q: 'Why apply the gradient to each character instead of the line?', a: `background-clip: text paints the element's background through its glyphs, but transformed inline-block spans establish their own paint containers — a parent-level gradient wouldn't show through them. Giving every span the gradient keeps each character carrying its slice, so the line reads as one continuous ramp even mid-animation.` },
      { q: 'How do I use this letter stagger in React, Vue, or Angular?', a: `Run the split and timeline in a mount effect — useEffect, onMounted, or ngAfterViewInit — against refs, guarding against double-splitting (StrictMode re-runs) by checking for existing .ch children, and revert a gsap.context in the cleanup so the pin unregisters. Alternatively pre-split in JSX/template by mapping the string to spans, then only the timeline lives in the effect. Line styles port to Tailwind cleanly.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the timeline math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the characters need to be inline-block spans before yPercent or rotation can affect them, or why overlapping the two lines' start positions at 0 and 0.35 on the shared timeline reads as one continuous gesture instead of two separate ones. The same assistant can help optimize it — asking whether the hand-rolled splitter should bail out early for very long headlines, or whether stagger easing could be simplified without losing the sweeping wave. It's just as useful for extending the effect: ask it to add a third staggered line, flip the wave direction with a from center stagger option, or make the rule element pulse once it fully draws. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll letter stagger" headline effect in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — no SplitText plugin, hand-roll the character split instead.

Requirements:
- One or more heading elements whose real copy lives in a data-text attribute (not inline markup).
- On load, split each heading's data-text into one inline-block span per character, appended into the heading, converting literal spaces to a non-breaking space so word gaps don't collapse.
- Each heading must have overflow: hidden and a small bottom padding so descenders aren't clipped, acting as a mask for characters waiting to rise into view.
- Register one GSAP timeline on a single ScrollTrigger with pin: true and scrub set to a smoothing value (not just true/false), so wheel ticks glide rather than snap.
- Inside that timeline, animate each line's character spans from yPercent 120 (below their resting position) and a starting rotation (a positive angle for one line, a negative mirrored angle for a second line) down to their resting yPercent 0 and rotation 0, using ease none and a stagger of about 0.05 seconds per character so the reveal sweeps across the line instead of popping all at once.
- Start the second line's stagger animation at a timeline position that overlaps the tail end of the first line's animation (not after it fully finishes), so multiple lines read as one connected motion.
- After the text lands, animate a separate underline/rule element's width from 0 to its final value on the same timeline, positioned so it only completes once the text above it has fully settled.
- If any line uses a gradient text color, apply the background-clip: text gradient to the individual character spans, not the parent heading, since transformed inline-block children establish their own paint context.
- Confirm scrolling back up retreats the letters in reverse stagger order for free, purely from the scrubbed timeline reversing.`,
    },
  },
};

export default scrollLetterStagger;
