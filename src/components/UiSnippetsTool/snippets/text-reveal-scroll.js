const textRevealScroll = {
  id: 'text-reveal-scroll',
  title: 'Text Reveal on Scroll',
  lastmod: '2026-07-18',
  category: 'scroll',
  html: `<div class="tr-intro">Scroll down ↓</div>
<section class="tr-section" id="trSection">
  <p class="tr-text" id="trText">We build tools that get out of your way so you can focus on the work that actually matters — shipping things people love.</p>
</section>
<div class="tr-outro">Each word brightens as it passes the middle of the screen.</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#07070f;color:#fff}

.tr-intro,.tr-outro{height:60vh;display:flex;align-items:center;justify-content:center;color:#55556e;font-size:15px;text-align:center;padding:0 20px}
.tr-section{min-height:160vh;display:flex;align-items:flex-start;justify-content:center;padding:30vh 24px}
.tr-text{position:sticky;top:34vh;max-width:760px;font-size:clamp(26px,5vw,46px);font-weight:800;line-height:1.35;letter-spacing:-.01em}
.tr-word{color:#2c2c40;transition:color .25s ease;position:relative}
.tr-word.lit{color:#fff}`,

  js: `var el = document.getElementById('trText');
var section = document.getElementById('trSection');

// Wrap each word so it can light independently.
var words = el.textContent.trim().split(/\\s+/);
el.innerHTML = words.map(function (w) { return '<span class="tr-word">' + w + '</span>'; }).join(' ');
var spans = Array.prototype.slice.call(el.querySelectorAll('.tr-word'));

var ticking = false;
function update() {
  var sect = section.getBoundingClientRect();
  var total = section.offsetHeight - window.innerHeight;
  var p = Math.max(0, Math.min(1, -sect.top / total));   // scroll progress 0..1
  // Light words up to the progress point; a small lead makes it feel responsive.
  var lit = Math.round(p * spans.length * 1.08);
  for (var i = 0; i < spans.length; i++) {
    spans[i].classList.toggle('lit', i < lit);
  }
  ticking = false;
}
window.addEventListener('scroll', function () {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(update);
}, { passive: true });
window.addEventListener('resize', update);
update();`,

  seo: {
    title: 'Text Reveal on Scroll — Free HTML CSS JS Word Snippet',
    description: `A paragraph whose words brighten from gray to white one by one as you scroll through a pinned section, tied to scroll progress. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Text Reveal on Scroll — Words Brighten as You Scroll',
      description: `Text reveal on scroll is the editorial effect where a paragraph sits dim and, as you scroll, its words light up from gray to white one after another — so reading and scrolling become the same motion. This snippet builds it with plain HTML, CSS, and a compact vanilla JavaScript scroll handler tied to a pinned section.

**Splitting the paragraph into words**

On load, JavaScript splits the paragraph on whitespace and wraps each word in a \`.tr-word\` span, starting them all in a muted gray. Wrapping words individually is what lets them brighten one at a time — you cannot transition part of a text node — and rejoining with spaces preserves natural wrapping. Each word transitions its \`color\` over a quarter second, so lighting one is a smooth fade rather than a snap.

**Pinning the text while it reveals**

The section is taller than the viewport (160vh) and the paragraph is \`position: sticky\`, so it pins near the middle of the screen and stays there while you scroll through the section's extra height. That pinned window is what gives the reveal room to happen: the text holds still and the words light up as you scroll past, rather than the text scrolling away mid-reveal. This sticky-in-a-tall-section pattern is the backbone of most scroll-linked effects.

**Mapping scroll to lit words**

Each frame, \`update()\` computes a 0–1 progress from how far the section has scrolled through its range (\`-sectionTop / (height - viewport)\`). It then lights the first \`progress * wordCount\` words by toggling the \`.lit\` class. A small lead factor (\`* 1.08\`) lights words slightly ahead of the exact progress point, which makes the reveal feel responsive and ensures the last words finish lighting before you scroll out. Because it is a class toggle driven by progress, scrolling back up dims the words again — the effect is fully reversible.

**Efficient scroll handling**

The \`scroll\` listener is \`{ passive: true }\` and throttled with \`requestAnimationFrame\` behind a \`ticking\` flag, so the measurement and the class updates run at most once per frame no matter how many scroll events fire. A \`resize\` listener re-runs it since the progress math depends on viewport height. Toggling classes is cheap, and only the words whose state actually changes trigger a style recalc.

**Why progress-based, not per-word observers**

You could use an IntersectionObserver per word, but tying the whole paragraph to a single scroll-progress value is simpler and gives precise, reversible control — you always know exactly how many words should be lit for any scroll position, and there is one calculation instead of dozens of observer callbacks.

**Customizing it**

Change the dim and lit colors (or fade other properties like opacity or blur), adjust the section height to slow or speed the reveal, tune the lead factor, or reveal by letter instead of word. Pair it with a [text generate](/ui-snippets/text-generate/) headline above or [stacking scroll cards](/ui-snippets/stacking-scroll-cards/) below for a scroll-driven story.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A dim paragraph pins in the middle of a tall section.` },
      { title: 'Scroll down', text: `Words brighten from gray to white one after another.` },
      { title: 'Scroll back up', text: `Words dim again — the reveal is reversible.` },
      { title: 'Adjust the pace', text: `Change the section height to slow or speed it.` },
      { title: 'Recolor the reveal', text: `Edit the dim and lit word colors.` },
      { title: 'Swap the property', text: `Fade opacity or blur instead of color.` },
    ] },
    features: [
      { title: 'Per-word spans', text: `Each word brightens independently.` },
      { title: 'Sticky pinned text', text: `Holds still while it reveals.` },
      { title: 'Progress-mapped reveal', text: `Lit count tracks scroll progress.` },
      { title: 'Responsive lead', text: `Words light slightly ahead of progress.` },
      { title: 'Fully reversible', text: `Scrolling up dims words again.` },
      { title: 'rAF-throttled scroll', text: `Passive, one update per frame.` },
      { title: 'Cheap class toggles', text: `Only changed words restyle.` },
      { title: 'Wrap-preserving', text: `Natural line breaks kept.` },
    ],
    useCases: [
      { title: 'Mission statements', text: `Reveal copy above [stacking scroll cards](/ui-snippets/stacking-scroll-cards/).` },
      { title: 'Manifesto sections', text: `Pair with a [text generate](/ui-snippets/text-generate/) headline.` },
      { title: 'About pages', text: `Tell a story as the reader scrolls.` },
      { title: 'Product narratives', text: `Lead into a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Long-form intros', text: `Set the tone before the content.` },
      { title: 'Scroll-link demos', text: `A reference for progress-based word reveals.` },
    ],
    faqs: [
      { q: 'Why wrap every word in a span?', a: `Each word brightens on its own, and you cannot transition part of a text node, so JavaScript wraps every word in a span starting in muted gray. Lighting a word toggles a class that transitions its color. Rejoining the spans with spaces preserves the natural line wrapping of the paragraph.` },
      { q: 'How does the paragraph stay in place while revealing?', a: `The section is 160vh tall and the paragraph is position: sticky, so it pins near the middle of the screen and stays there while you scroll through the section's extra height. That gives the reveal room to happen on still text, rather than the paragraph scrolling away mid-reveal. It is the standard sticky-in-a-tall-section pattern for scroll effects.` },
      { q: 'How is scroll mapped to lit words?', a: `Each frame, update computes a 0–1 progress from how far the section has scrolled through its range, then lights the first progress times word-count words by toggling a lit class. A small lead factor lights words slightly ahead of exact progress so it feels responsive and the last words finish before you scroll out. Scrolling up reverses it.` },
      { q: 'Why not use an IntersectionObserver per word?', a: `Tying the whole paragraph to one scroll-progress value is simpler and gives precise, reversible control — you always know exactly how many words should be lit at any scroll position, with one calculation instead of dozens of observer callbacks. It also makes the lead factor and easing trivial to tune in one place.` },
      { q: 'How do I use this text reveal on scroll in React, Vue, or Angular?', a: `Render the paragraph as an array of word spans and keep a lit-count in state, updating it from a scroll handler set up in a mount effect with cleanup. Drive each word class from its index versus the lit count. Keep the ticking flag in a ref. The sticky CSS ports directly; in Tailwind use sticky positioning and toggle text color utilities per word.` },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to trace exactly how update() turns "-sectionTop / (sectionHeight - viewportHeight)" into a 0-to-1 progress value, and why the 1.08 lead multiplier is there instead of lighting words at the literal progress point. It's also a good target for a performance review — confirm the requestAnimationFrame-behind-a-ticking-flag pattern is actually preventing redundant work on fast scroll, and ask whether toggling a class on dozens of spans per frame could be replaced with something cheaper for a very long paragraph. For extending it, ask for a version that reveals by letter instead of word, one that fades opacity or applies a blur alongside the color change, or one that lights words in a different order (center-out, or random) instead of strictly left to right. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-linked "text reveal" effect in plain HTML, CSS, and JavaScript where a paragraph's words individually brighten as the user scrolls, using no animation or scroll library.

Requirements:
- Wrap the section containing the paragraph so it is taller than one viewport (at least 150% of viewport height), and make the paragraph itself position: sticky so it pins near the vertical middle of the screen while the user scrolls through the section's extra height.
- On load, split the paragraph's text on whitespace and wrap every word in its own span, starting all of them in a dim, muted color with a CSS transition on the color property.
- Compute scroll progress as a 0-to-1 value derived from how far the sticky section has scrolled through its own range (not from the raw window scrollY), clamped so it never goes below 0 or above 1.
- Multiply that progress by the total word count (with a small lead factor greater than 1, such as 1.08, so the last words finish lighting slightly before the section's scroll range ends) to get a "lit count," then toggle a lit class on exactly the words whose index is below that count.
- The effect must be fully reversible: scrolling back up must dim previously lit words again, driven by the same progress calculation, with no separate "reverse" code path.
- Attach the scroll handler as a passive listener and throttle the actual measurement/DOM update to once per animation frame using a requestAnimationFrame call guarded by a boolean flag, and also re-run the calculation on window resize.`,
    },
  },
};

export default textRevealScroll;
