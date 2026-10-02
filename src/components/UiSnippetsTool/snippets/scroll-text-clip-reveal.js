const scrollTextClipReveal = {
  id: 'scroll-text-clip-reveal',
  title: 'Scroll Text Clip Reveal',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="tc-spacer"><p>Scroll down ↓</p></section>
<section class="tc-stage" id="tcStage">
  <h2 class="tc-text" id="tcText">We design calm, fast, human interfaces that people actually enjoy using every single day.</h2>
</section>
<section class="tc-spacer"><p>Keep scrolling ↑</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a10;color:#fff}
.tc-spacer{min-height:80vh;display:flex;justify-content:center;align-items:center;color:#6b7290;font-size:15px;letter-spacing:.08em;text-transform:uppercase}
.tc-stage{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:clamp(24px,8vw,140px)}
.tc-text{font-size:clamp(26px,5vw,58px);font-weight:800;line-height:1.18;letter-spacing:-.02em;max-width:1000px}
/* Each word starts dim; GSAP brightens it as it scrolls through. */
.tc-word{color:#2a2d3a;transition:none;display:inline-block;will-change:color}`,

  js: `gsap.registerPlugin(ScrollTrigger);

// Split the heading into per-word spans so each can light up independently.
var el = document.getElementById('tcText');
el.innerHTML = el.textContent.trim().split(/\\s+/).map(function (w) {
  return '<span class="tc-word">' + w + '</span>';
}).join(' ');

var words = el.querySelectorAll('.tc-word');

// Pin the stage and reveal words across the scroll with a staggered scrub.
gsap.to(words, {
  color: '#ffffff',
  ease: 'none',
  stagger: { each: 1 },
  scrollTrigger: {
    trigger: '#tcStage',
    start: 'top top',
    end: '+=' + (words.length * 60 + 400),
    scrub: true,
    pin: true
  }
});`,

  seo: {
    title: 'Scroll Text Clip Reveal — Free GSAP Word Highlight Snippet',
    description: `A pinned heading whose words brighten one by one as you scroll, using a GSAP ScrollTrigger staggered scrub over split word spans. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Text Clip Reveal — Brighten a Headline Word by Word',
      description: `The scroll text reveal is the editorial effect where a big statement is dim until you scroll, then its words light up one after another as the section holds in place — the "read along with the scroll" technique from agency and storytelling sites. This snippet builds it with GSAP and ScrollTrigger (from a CDN), plus plain HTML and CSS.

**Splitting into words**

On load the script reads the heading's text, splits it on whitespace, and rebuilds it as a sequence of \`<span class="tc-word">\` elements. Wrapping each word in its own inline-block span is what lets every word be animated independently — you can't target individual words inside a plain text node. The split is done in JavaScript so the markup stays clean and the effect works on any sentence you drop in.

**Staggered scrub**

A single \`gsap.to\` animates all the word spans from a dim grey to white, but with \`stagger: { each: 1 }\` so they don't all change at once — each word's tween is offset along the timeline. Tying that timeline to a ScrollTrigger with \`scrub: true\` means the stagger plays out across the scroll distance: as you scroll, the "bright" boundary sweeps word by word through the sentence, and scrolling back dims them again in reverse.

**Pinning to hold the sentence**

The stage pins with \`pin: true\` so the heading stays centered while the words reveal, giving the reader time to take in the line rather than it flying past. The \`end\` is computed from the word count (\`words.length × 60 + 400\`), so longer sentences get a proportionally longer scroll window — the reveal pace stays consistent regardless of how much text you use.

**Color, not clip, for crispness**

Animating each word's \`color\` from a muted tone to white (rather than masking) keeps the text perfectly crisp at every step and is cheap for the browser, since only paint changes. \`ease: 'none'\` keeps each word's transition linear so the sweep feels mechanically tied to the scrollbar. The dim resting color still leaves the words faintly legible, hinting at the full sentence before it's revealed.

**Why ScrollTrigger**

Doing this by hand means measuring scroll, mapping it to a per-word progress, and handling reverse and resize — exactly the bookkeeping ScrollTrigger's scrub and pin remove. GSAP's stagger turns "reveal N words in sequence" into one declarative tween, so the snippet stays short.

**Customizing it**

Change the dim and bright colors, the per-word stagger spacing, or the scroll length; reveal by opacity or a vertical rise instead of color; or split by character for a finer sweep. Pair it with a [text reveal scroll](/ui-snippets/text-reveal-scroll/), a [split text](/ui-snippets/split-text/) entrance, or a [scroll image mask](/ui-snippets/scroll-image-mask/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A dim heading sits between two spacers.` },
      { title: 'Scroll into the stage', text: `It pins and words brighten one by one.` },
      { title: 'Scroll back', text: `The words dim again in reverse.` },
      { title: 'Change the sentence', text: `Edit the heading — the split adapts.` },
      { title: 'Tune the pace', text: `Adjust the stagger and the end distance.` },
    ] },
    features: [
      { title: 'Auto word-split', text: `Heading rebuilt into per-word spans.` },
      { title: 'Staggered scrub', text: `Bright edge sweeps word by word.` },
      { title: 'Pinned stage', text: `Sentence holds while it reveals.` },
      { title: 'Length-aware range', text: `Scroll window scales with word count.` },
      { title: 'Crisp text', text: `Color animation, no blurry masks.` },
      { title: 'Reversible', text: `Scrolling up re-dims the words.` },
      { title: 'Linear sweep', text: `ease none ties it to the scrollbar.` },
      { title: 'Any sentence', text: `Works on whatever text you paste.` },
    ],
    useCases: [
      { title: 'Mission statement reveals', text: 'Light up each word of a bold statement as the reader scrolls, as a cousin of [text reveal scroll](/ui-snippets/text-reveal-scroll/) built on a staggered scrub.' },
      { title: 'Section lead-ins', text: 'Pair with a [split text](/ui-snippets/split-text/) entrance for the heading, with the scroll window scaling to the number of words in the sentence.' },
      { title: 'Pinned storytelling lines', text: 'Reveal narrative lines inside a [scroll pin story](/ui-snippets/scroll-pin-story/), with the sentence holding in place while the bright edge sweeps word by word.' },
      { title: 'About page openers', text: 'Lead into a [team card](/ui-snippets/team-card/) grid with a brand statement that reads along with the scroll.' },
      { title: 'Editorial and quote emphasis', text: 'Combine with a [scroll image mask](/ui-snippets/scroll-image-mask/), or emphasise a line from a [testimonial card](/ui-snippets/testimonial-card/) with the same bright-edge sweep.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Hologram Scan Reveal', desc: 'See the [Three.js Scroll Hologram Scan Reveal](/ui-snippets/three-scroll-hologram-scan/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is each word animated separately?', a: `On load the script splits the heading's text on whitespace and rebuilds it as a series of span.tc-word elements. Wrapping each word in its own inline-block span lets GSAP target words individually — impossible inside a plain text node. The split happens in JavaScript so the source markup stays a clean sentence.` },
      { q: 'How does the reveal sweep word by word?', a: `One gsap.to animates all the word spans to white but with stagger: { each: 1 }, offsetting each word along the timeline. Tied to a ScrollTrigger with scrub: true, the stagger plays across the scroll distance, so the bright boundary moves through the sentence as you scroll and reverses when you scroll up.` },
      { q: 'Why pin the section?', a: `pin: true keeps the heading centered while the words light up, so the reader can take in the line instead of it scrolling past mid-reveal. The end distance is derived from the word count, so a longer sentence holds for a proportionally longer scroll and the reveal pace stays consistent.` },
      { q: 'Why animate color instead of a clip mask?', a: `Animating each word's color from a muted tone to white keeps the text perfectly crisp at every frame and is cheap because only paint changes — no layout or compositing of a mask. The dim resting color also leaves the words faintly legible, hinting at the full statement before it is revealed.` },
      { q: 'How do I use this scroll text clip reveal in React, Vue, or Angular?', a: `Render the heading, then in a mount effect split it into word spans on a ref and build the staggered tween, registering ScrollTrigger once. Return a cleanup that reverts the GSAP context so the pin and triggers are removed on unmount. In frameworks that re-render, guard the split so it only runs once. The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the stagger-to-scroll mapping by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the trigger's end distance is computed from words.length rather than a fixed value, or why animating the color property instead of a clip-path or mask keeps the text crisp at every scroll position. The same assistant can help optimize it — asking whether stagger: { each: 1 } scales sensibly for a much longer sentence, or whether the dim resting color value is legible enough for accessibility contrast requirements before words brighten. It's also useful for extending the effect: ask it to brighten by opacity and a slight y-rise instead of just color, split by character instead of word for a finer sweep, or highlight one emphasized word in a different color once it's revealed. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll text clip reveal" word-brightening headline in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN) — no clip-path, no SplitText plugin.

Requirements:
- A heading element containing a sentence as plain text, styled with a dim starting color so it is faintly legible before any scrolling happens.
- On load, split the heading's text content on whitespace and rebuild its innerHTML as a sequence of inline-block spans, one per word (not per character), so each word can be targeted and animated independently.
- Register a single GSAP tween animating all the word spans' color from the dim starting value to a bright value (e.g. white), using ease none and a stagger configured so each word's brightening is offset from the previous word along the timeline (not all words changing simultaneously).
- Attach that tween to a ScrollTrigger with pin: true so the heading stays fixed on screen while the reveal plays, and scrub: true so the sweep of brightening words is tied directly to scroll position rather than time.
- Compute the ScrollTrigger's end distance dynamically from the number of words (e.g. word count times a constant, plus a fixed base amount) rather than hardcoding a fixed pixel or percentage value, so a longer sentence automatically gets a proportionally longer scroll window and the per-word reveal pace stays visually consistent regardless of sentence length.
- Confirm scrolling back up dims the words again in reverse order, purely because the tween is scrubbed — no separate reverse-specific code, and confirm the word split logic works correctly on any sentence dropped into the heading without modification.`,
    },
  },
};

export default scrollTextClipReveal;
