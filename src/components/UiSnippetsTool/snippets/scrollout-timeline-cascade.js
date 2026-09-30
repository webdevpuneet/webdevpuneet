const scrolloutTimelineCascade = {
  id: 'scrollout-timeline-cascade',
  title: 'ScrollOut Timeline Cascade',
  lastmod: '2026-09-17',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scroll-out@2.2.12/dist/scroll-out.min.js'],
  html: `<div class="stc-stage">
  <div class="stc-head">
    <span class="stc-tag">ScrollOut · attribute only</span>
    <h2>Timeline</h2>
    <p>ScrollOut never touches a style property here — it only flips data-scroll between "in" and "out". Every visual transition is plain CSS.</p>
  </div>
  <div class="stc-line">
    <div class="stc-entry" data-scroll>
      <div class="stc-dot"></div>
      <div class="stc-card"><span class="stc-date">2022</span><h3>Project kicked off</h3><p>Initial research and a rough prototype in a weekend.</p></div>
    </div>
    <div class="stc-entry" data-scroll>
      <div class="stc-dot"></div>
      <div class="stc-card"><span class="stc-date">2023</span><h3>First public release</h3><p>Shipped v1 with a small but vocal early user base.</p></div>
    </div>
    <div class="stc-entry" data-scroll>
      <div class="stc-dot"></div>
      <div class="stc-card"><span class="stc-date">2024</span><h3>Crossed 10,000 users</h3><p>Word of mouth did most of the work.</p></div>
    </div>
    <div class="stc-entry" data-scroll>
      <div class="stc-dot"></div>
      <div class="stc-card"><span class="stc-date">2025</span><h3>Team of five</h3><p>Hired the first designer and two engineers.</p></div>
    </div>
    <div class="stc-entry" data-scroll>
      <div class="stc-dot"></div>
      <div class="stc-card"><span class="stc-date">2026</span><h3>Where we are now</h3><p>Still shipping, still scrolling this very timeline to demo it.</p></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:radial-gradient(120% 100% at 50% 0%,#171b2e,#090a13);color:#fff;min-height:100vh;padding:48px 24px 200px}
.stc-stage{max-width:620px;margin:0 auto;display:flex;flex-direction:column;gap:40px}
.stc-head{text-align:center}
.stc-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#facc15;background:rgba(250,204,21,.12);border:1px solid rgba(250,204,21,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.stc-head h2{font-size:clamp(24px,4.4vw,34px);font-weight:800;letter-spacing:-.02em}
.stc-head p{font-size:14px;color:#9198b8;margin-top:10px;line-height:1.5}

.stc-line{position:relative;padding-left:28px}
.stc-line::before{content:'';position:absolute;left:5px;top:6px;bottom:6px;width:2px;background:linear-gradient(180deg,rgba(250,204,21,.5),rgba(250,204,21,.05))}
.stc-entry{position:relative;margin-bottom:34px}
.stc-entry:last-child{margin-bottom:0}
.stc-dot{position:absolute;left:-28px;top:4px;width:12px;height:12px;border-radius:50%;background:#0b0d18;border:2px solid rgba(250,204,21,.4);transition:background .3s,border-color .3s,box-shadow .3s}

/* This is the entire animation. ScrollOut only sets data-scroll="in" or "out" on
   .stc-entry -- every transform, opacity, and transition-timing value below is
   ordinary CSS with zero JavaScript involvement. */
.stc-entry{opacity:0;transform:translateX(-18px);transition:opacity .5s ease,transform .5s ease}
.stc-entry[data-scroll="in"]{opacity:1;transform:translateX(0)}
.stc-entry[data-scroll="in"] .stc-dot{background:#facc15;border-color:#facc15;box-shadow:0 0 0 5px rgba(250,204,21,.18)}

.stc-card{background:rgba(255,255,255,.045);border:1px solid rgba(255,255,255,.09);border-radius:14px;padding:18px 20px}
.stc-date{display:inline-block;font-size:11px;font-weight:800;color:#facc15;letter-spacing:.06em;margin-bottom:6px}
.stc-card h3{font-size:16px;font-weight:700;margin-bottom:6px}
.stc-card p{font-size:13px;color:#a3aacb;line-height:1.55}`,

  js: `// The full division of labor: ScrollOut decides WHEN an entry is visible and writes
// that decision as an attribute (data-scroll="in" / "out"). It never sets a single
// style property. 100% of the actual animation -- the translateX, the opacity fade,
// the easing curve, the 0.5s duration -- lives in the CSS above via the
// [data-scroll="in"] selector. This is different from a library like anime.js, which
// owns both the "when" and the "how" of an animation in one call.
ScrollOut({
  targets: '.stc-entry',
  threshold: 0.35,
  once: false
});`,

  seo: {
    title: 'ScrollOut Timeline Cascade — CSS-Driven Reveal Snippet',
    description: 'A vertical timeline where ScrollOut only toggles a data-scroll attribute and plain CSS transitions handle every bit of the actual animation. Exports to React, Vue & Tailwind.',
    about: {
      title: 'ScrollOut Timeline Cascade — Where ScrollOut Ends and CSS Begins',
      description: `Compare this snippet's JavaScript to [anime.js's ripple grid](/ui-snippets/anime-ripple-grid/) and the difference in *philosophy* is the whole story. The ripple grid's JS owns everything — it computes delay, defines keyframes, sets duration and easing, and directly mutates \`transform\`, \`backgroundColor\`, and \`borderRadius\` on every frame. This timeline's JS is five lines and touches **zero style properties**. That's not a simpler version of the same idea; it's a categorically different tool.

## What ScrollOut actually does: attribute toggling, nothing else

\`\`\`js
ScrollOut({
  targets: '.stc-entry',
  threshold: 0.35,
  once: false
});
\`\`\`

That call does exactly one job: watch every \`.stc-entry\`, and the moment one crosses 35% visibility, write \`data-scroll="in"\` onto it (and \`data-scroll="out"\` when it leaves, since \`once: false\` keeps tracking after the first reveal instead of detaching). It does not know what \`data-scroll="in"\` is supposed to *look like*. It has no opinion on whether that should be a fade, a slide, a color change, or nothing at all. From ScrollOut's point of view, an entry becoming visible and an entry's checkout button being enabled are the same kind of event — it fires the attribute change and steps back.

## Where the actual animation lives

Every pixel of motion in this timeline is this CSS rule pair:

\`\`\`css
.stc-entry{opacity:0;transform:translateX(-18px);transition:opacity .5s ease,transform .5s ease}
.stc-entry[data-scroll="in"]{opacity:1;transform:translateX(0)}
\`\`\`

The base state is invisible and shifted left; the \`[data-scroll="in"]\` attribute selector overrides both properties back to their resting values, and because \`transition\` is declared on the base rule, the browser animates between whichever two states are currently active — no \`@keyframes\`, no JS-driven \`requestAnimationFrame\` loop, nothing but the CSS transition engine doing what it always does when a matched property changes value.

## Why this division of labor is worth knowing

This is the *inverse* of the "hidden until revealed" WOW.js pattern too — WOW.js toggles a class and lets **animate.css's keyframes** take over, while ScrollOut toggles an **attribute** and leaves **plain CSS transitions** (not even a separate animation library) to take over. Once you see ScrollOut only ever writing \`data-scroll\`/\`--custom-properties\` and never a style, it becomes obvious that ScrollOut is a visibility *sensor*, not an animation *engine* — and that's a deliberate scope decision, not a missing feature. It means you can restyle every entrance in this timeline by editing CSS alone, with the JS untouched, which is not true of the anime.js-driven snippets in this library.

## once: false and re-triggering

Setting \`once: false\` (ScrollOut's default is actually to keep tracking, but it's made explicit here) means scrolling an entry back out of view flips it to \`data-scroll="out"\`, and the CSS transitions it back to the hidden state — so scrolling up and back down replays the entrance. Set \`once: true\` if you want each entry to lock into its revealed state permanently after the first reveal.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ScrollOut CDN script', text: 'A single script tag — no CSS dependency shipped by the library itself.' },
      { title: 'Mark timeline entries with data-scroll', text: 'ScrollOut\'s default targets selector is [data-scroll], so no extra selector config is required.' },
      { title: 'Write the CSS transition yourself', text: 'Base state hidden/offset, and a [data-scroll="in"] rule overriding it — ScrollOut supplies neither.' },
      { title: 'Call ScrollOut with a threshold', text: 'threshold: 0.35 controls how much of an entry must show before it flips to "in".' },
      { title: 'Set once: false to allow replay', text: 'Entries revert to data-scroll="out" when scrolled back out of view, replaying on re-entry.' },
      { title: 'Style the connecting line and dots separately', text: 'These are static CSS, unrelated to ScrollOut, forming the timeline\'s visual spine.' },
    ] },
    features: [
      { title: 'Attribute-only JS output', text: 'ScrollOut writes data-scroll="in"/"out" and nothing else — no inline styles are ever set.' },
      { title: '100% CSS-owned animation', text: 'Every transform, opacity, and timing value lives in a CSS transition, not in JS.' },
      { title: 'Reversible reveal', text: 'once: false lets entries animate back out and re-in as the user scrolls both directions.' },
      { title: 'Threshold-tuned trigger point', text: 'threshold: 0.35 avoids triggering on a barely-visible sliver of an entry.' },
      { title: 'Glowing active dot', text: 'The timeline dot recolors via the same [data-scroll="in"] selector as the card.' },
      { title: 'No animation library dependency', text: 'Unlike the anime.js snippets in this library, no separate animation engine is loaded.' },
      { title: 'Editable without touching JS', text: 'Restyling the entrance is a pure CSS change since ScrollOut never encodes visual values.' },
      { title: 'Default selector convention', text: 'Uses ScrollOut\'s own [data-scroll] default attribute as the semantic marker, not just a side effect.' },
    ],
    useCases: [
      { icon: 'FLOW', title: 'Company timelines', text: 'A history or roadmap page where entries reveal in sequence as the visitor scrolls.' },
      { icon: 'LEARN', title: 'Teaching the sensor/engine split', text: 'A clean contrast against anime.js or GSAP-driven scroll snippets in the same library.' },
      { icon: 'DESIGN', title: 'Changelog pages', text: 'Reveal release notes one at a time down a vertical spine.' },
      { icon: 'CODE', title: 'Lightweight reveal without a dependency', text: 'A minimal footprint alternative when a full animation library is overkill.' },
    ],
    faqs: [
      { q: 'Does ScrollOut animate the timeline entries?', a: 'No. ScrollOut only writes a data-scroll="in" or data-scroll="out" attribute onto each .stc-entry based on visibility. Every visual change — the fade, the slide, the timing — comes from the CSS transition and the [data-scroll="in"] attribute selector, not from ScrollOut.' },
      { q: 'How is this different from the anime.js ripple grid snippet?', a: 'anime.js\'s stagger call owns both when an animation happens and exactly how it looks — it directly sets scale, color, and radius keyframes in JS. ScrollOut only decides when (via the data-scroll attribute); the how is entirely separate CSS that ScrollOut never reads or writes.' },
      { q: 'What does once: false control?', a: 'It keeps ScrollOut watching an entry after its first reveal, so scrolling it back out of the viewport flips data-scroll back to "out" and the CSS transition reverses. Setting once: true would lock each entry into its revealed state permanently after the first time it\'s shown.' },
      { q: 'Why is threshold set to 0.35 instead of the default?', a: 'A lower threshold would flip data-scroll to "in" the moment a sliver of an entry\'s top edge enters the viewport, before it is realistically readable. 0.35 requires more of the card to actually be visible first.' },
      { q: 'Can I change the entrance animation without touching the JavaScript?', a: 'Yes — that is the point of this division of labor. Edit only the CSS transition and the [data-scroll="in"] rule (e.g. switch translateX for translateY, or add a scale), and the ScrollOut configuration itself never needs to change.' },
      { q: 'Does ScrollOut require its own stylesheet like animate.css does for WOW.js?', a: 'No. ScrollOut ships no CSS at all — it is purely a JS visibility tracker. All styling, including the hidden/attribute-selector transition pattern used here, is authored by hand.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is best used to have an AI articulate a boundary rather than explain a trick. Paste it into an assistant like Claude and ask it to state precisely what ScrollOut is responsible for versus what plain CSS is responsible for in this timeline, and to contrast that division against a library like anime.js (which owns both halves) or WOW.js (which toggles a class but still lets animate.css's own keyframes do the work). Then ask what would happen, concretely, if you deleted the [data-scroll="in"] CSS rule but kept the ScrollOut call — the attribute would still be written correctly, but nothing would visibly change, which is a good way to prove the split is real. To extend it: ask for a horizontal-alternating timeline (entries left/right of a center line), a version using ScrollOut's cssProps to drive a --visible-y-based scrub effect instead of a binary in/out state, or a version that also updates a connecting-line "fill" height as entries reveal.`,
      prompt: `Build a vertical timeline using ScrollOut (v2, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A vertical line with at least 5 timeline entries (date, heading, short description) each positioned with a small dot on the line and a card to its right.
- Each entry element must carry the data-scroll attribute (ScrollOut's default targets selector is [data-scroll], so no targets option is needed).
- Initialize with ScrollOut({ targets: '.entry-class', threshold: 0.35, once: false }) — a 5-line JS call, nothing more. Do NOT set any inline styles, animate any property, or use any animation library from JavaScript.
- Write 100% of the actual animation in plain CSS: a base state with opacity: 0 and a horizontal transform offset, a transition property declared on that base rule, and a [data-scroll="in"] attribute-selector rule that overrides opacity and transform back to their resting values — this attribute-selector rule is what the browser's CSS transition engine actually animates between.
- Also recolor each entry's timeline dot via the same [data-scroll="in"] selector, so the dot and the card animate off the same attribute state.
- Add a code comment above the ScrollOut() call explicitly stating the division of labor: ScrollOut decides WHEN (visibility, via the data-scroll attribute) and CSS decides HOW (the actual transform/opacity/timing), unlike a library such as anime.js that owns both halves in one JS call.
- Style as a dark themed page with a gradient-faded vertical line and glowing dots on revealed entries, with enough content that entries start below the fold.`,
    },
  },
};

export default scrolloutTimelineCascade;
