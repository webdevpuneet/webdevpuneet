const scrollBookShelfSlide = {
  id: 'scroll-book-shelf-slide',
  title: 'Scroll Book Shelf Slide',
  lastmod: '2026-09-16',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<div class="hint">Scroll ↓ to pull books off the shelf</div>
<div class="shelf-wrap">
  <div class="shelf-stage">
    <div class="shelf-board"></div>
    <div class="books">
      <div class="book" data-title="Deep Work" style="--hue:210;--i:0">
        <span class="spine-label">Deep Work</span>
        <div class="pages">
          <h3>Deep Work</h3>
          <p>Rules for focused success in a distracted world. Cultivate the ability to concentrate without distraction on cognitively demanding tasks.</p>
        </div>
      </div>
      <div class="book" data-title="Atomic Habits" style="--hue:0;--i:1">
        <span class="spine-label">Atomic Habits</span>
        <div class="pages">
          <h3>Atomic Habits</h3>
          <p>An easy and proven way to build good habits and break bad ones. Tiny changes, remarkable results.</p>
        </div>
      </div>
      <div class="book" data-title="Sapiens" style="--hue:35;--i:2">
        <span class="spine-label">Sapiens</span>
        <div class="pages">
          <h3>Sapiens</h3>
          <p>A brief history of humankind, from foraging bands to the cognitive, agricultural and scientific revolutions.</p>
        </div>
      </div>
      <div class="book" data-title="The Design of Everyday Things" style="--hue:150;--i:3">
        <span class="spine-label">The Design of Everyday Things</span>
        <div class="pages">
          <h3>The Design of Everyday Things</h3>
          <p>Why some products satisfy customers while others frustrate them — the psychology of good design.</p>
        </div>
      </div>
      <div class="book" data-title="Thinking, Fast and Slow" style="--hue:275;--i:4">
        <span class="spine-label">Thinking, Fast and Slow</span>
        <div class="pages">
          <h3>Thinking, Fast and Slow</h3>
          <p>Two systems drive the way we think — fast, intuitive and emotional, versus slower, deliberate and logical.</p>
        </div>
      </div>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; }
body { margin: 0; font-family: 'Georgia', 'Times New Roman', serif; background: linear-gradient(#2b1c11, #1a1108); color: #f4e9d8; }

.hint { text-align: center; padding: 28px 16px; font-size: 14px; letter-spacing: 0.06em; color: #c9a876; text-transform: uppercase; font-family: system-ui, sans-serif; }

.shelf-wrap { height: 600vh; position: relative; }

.shelf-stage { position: sticky; top: 0; height: 100vh; display: flex; align-items: center; justify-content: center; overflow: hidden; background: radial-gradient(ellipse at 50% 30%, #3a2513, #1a1108 75%); }

.shelf-board { position: absolute; bottom: 18%; left: 8%; right: 8%; height: 22px; background: linear-gradient(180deg, #6b4226, #3f260f); border-radius: 3px; box-shadow: 0 18px 30px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.08); z-index: 1; }

.books { position: relative; display: flex; align-items: flex-end; gap: 6px; bottom: 18%; perspective: 1000px; z-index: 2; }

.book { position: relative; width: 46px; height: 280px; background: linear-gradient(90deg, hsl(var(--hue) 45% 32%), hsl(var(--hue) 45% 42%)); border-radius: 3px 5px 5px 3px; box-shadow: inset -3px 0 6px rgba(0,0,0,0.35), inset 3px 0 4px rgba(255,255,255,0.15), 0 8px 16px rgba(0,0,0,0.45); transform-origin: bottom center; display: flex; align-items: center; justify-content: center; }

.spine-label { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 13px; font-weight: 700; letter-spacing: 0.04em; color: #f4e9d8; text-shadow: 0 1px 2px rgba(0,0,0,0.4); white-space: nowrap; }

.pages { position: absolute; left: 100%; bottom: 0; width: 260px; height: 100%; background: #f4ecd8; color: #2b1c11; border-radius: 0 10px 10px 0; box-shadow: 6px 10px 24px rgba(0,0,0,0.5); padding: 26px 22px; opacity: 0; transform: translateX(-30px) scaleX(0.2); transform-origin: left center; pointer-events: none; }
.pages h3 { margin: 0 0 12px; font-size: 19px; color: hsl(var(--hue) 45% 28%); }
.pages p { margin: 0; font-size: 14px; line-height: 1.7; }

@media (max-width: 640px) {
  .book { width: 34px; height: 220px; }
  .pages { width: 190px; padding: 18px 16px; }
  .pages p { font-size: 12.5px; }
}`,
  js: `gsap.registerPlugin(ScrollTrigger);

const books = gsap.utils.toArray('.book');

// One shared timeline, one ScrollTrigger -- each book previously created
// its OWN timeline (with its OWN default-duration tweens) on an identical
// full-page ScrollTrigger, so five independently-sized timelines were all
// being scrubbed across the same scroll distance at once, out of sync with
// each other. A single timeline with explicit numeric positions and
// durations is what actually makes the books take clean, sequential turns.
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.shelf-wrap',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
  },
});

books.forEach((book, i) => {
  const pages = book.querySelector('.pages');
  const t0 = i; // each book gets exactly one whole timeline unit to itself

  tl.set(book, { zIndex: 10 }, t0)
    // The pages panel is absolutely positioned to the right of its spine,
    // which means it visually overlaps the next several book spines in the
    // row. Without raising this book above its neighbors while its segment
    // is active, its opened panel renders BEHIND every later sibling and
    // is barely visible -- only the very last book (nothing left to stack
    // on top of it) ever looked right before.
    .fromTo(book,
      { x: 0, y: 0, rotate: 0 },
      { x: 34, y: -10, rotate: -7, duration: 0.4, ease: 'none' },
      t0
    )
    .fromTo(pages,
      { opacity: 0, x: -30, scaleX: 0.2 },
      { opacity: 1, x: 0, scaleX: 1, duration: 0.3, ease: 'none' },
      t0 + 0.3
    )
    .to(pages, { opacity: 0, x: -30, scaleX: 0.2, duration: 0.3, ease: 'none' }, t0 + 0.65)
    // Every book resets, not just i > 0 -- the first book previously had no
    // reset tween at all and stayed permanently slid out for the rest of
    // the scroll, which read as broken rather than intentional.
    .to(book, { x: 0, y: 0, rotate: 0, duration: 0.3, ease: 'none' }, t0 + 0.65)
    .set(book, { zIndex: 1 }, t0 + 1);
});

ScrollTrigger.refresh();`,
  seo: {
    title: 'Scroll Book Shelf Slide — Free HTML CSS JS Snippet',
    description: 'A row of book spines that slide off a wooden shelf and fan open into a content panel as you scroll, driven by GSAP ScrollTrigger scrub timelines. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Scroll Book Shelf Slide — GSAP Timeline Segments, Shelf Illustration & Content Panel Reveal',
      description: `This snippet turns a row of styled div "book spines" into a scroll-driven storytelling shelf: as the user scrolls through a tall pinned-feeling section, each book in turn slides outward and tilts off the shelf while a hinged "pages" panel unfolds beside it to reveal a title and description, then both settle back before the next book takes its turn.

**One shared scrub timeline, sliced into segments**

A single GSAP timeline is attached to \`.shelf-wrap\` with \`scrollTrigger: { start: 'top top', end: 'bottom bottom', scrub: true }\` — genuinely one timeline and one ScrollTrigger for every book, not one per book. Each book gets exactly one whole numeric unit of that timeline to itself (\`t0 = i\`), and its slide/tilt and pages-panel open/close tweens are placed at explicit fractional offsets within that unit using GSAP's position parameter and explicit \`duration\` values, so the total timeline length scales predictably with the book count and every book's turn takes the same, correctly-proportioned slice of the scroll distance.

**The slide-and-tilt**

Each \`.book\` is a narrow div styled as a spine with \`transform-origin: bottom center\` so it pivots naturally like a book being pulled forward. \`gsap.fromTo\` animates \`x\`, \`y\` and \`rotate\` from resting values to \`x: 34, y: -10, rotate: -7\` — enough to read as "sliding outward and tipping" without leaving the shelf entirely.

**Raising the active book above its neighbors**

The \`.pages\` panel is absolutely positioned to the right of its spine, wide enough to visually overlap several of the books sitting next to it in the row. Left alone, that overlap is a real problem: with no explicit \`z-index\`, later book spines in DOM order paint on top of an earlier book's opened panel, hiding almost all of it behind the very spines it's supposed to float above. A \`zIndex\` tween lifts each book to the front for exactly the duration of its own segment and drops it back afterward, so whichever book is currently active is always the one on top, regardless of where it sits in the row.

**The pages panel**

The \`.pages\` div starts at \`opacity: 0, scaleX: 0.2\`, translated slightly left, with \`transform-origin: left center\`, then scales up to \`scaleX: 1\` with full opacity — mimicking a book cover swinging open — timed to appear once the spine has slid far enough to have "room," and closing again before the segment ends so both the spine and the panel are back at rest by the time the next book's turn begins.

**Fully reversible, no pinning required**

Because everything lives on one scrubbed timeline keyed to scroll progress (not \`pin: true\`), scrolling back up smoothly reverses every book in sequence — GSAP scrub timelines are inherently bidirectional, so no manual reset logic is needed.

Pair this with [Scroll Card Deck Shuffle](/ui-snippets/scroll-card-deck-shuffle/) for another sequential reveal pattern, or [Scroll Polaroid Stack Flip](/ui-snippets/scroll-polaroid-stack-flip/) for a similarly staggered "stack" story.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll through the preview', text: 'Scroll down slowly — each book spine slides forward and tilts while its content panel unfolds beside it, then both reset as the next book begins.' },
        { title: 'Add or remove books', text: 'Duplicate a .book element inside .books with a unique --hue custom property for its spine color, a spine-label span, and a .pages panel with your own title/description.' },
        { title: 'Tune the segment timing', text: 'In the JS panel, adjust the fractional offsets and durations inside each book\'s tl.fromTo/.to calls (relative to its own t0 = i) to control the pacing of its slide, open, and close.' },
        { title: 'Adjust the slide distance and tilt', text: 'Change the x, y and rotate values inside the fromTo call to make the slide-off more or less dramatic.' },
        { title: 'Restyle the shelf', text: 'The .shelf-board and .shelf-stage background gradients set the warm wood tone — swap the hsl() values or background gradient for a different library aesthetic.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Single GSAP scrub timeline and single ScrollTrigger shared by every book, sliced into equal numeric segments',
      'zIndex tween raises whichever book is active above its neighbors, so its opened panel is never hidden behind later spines',
      'Book spines pivot with transform-origin: bottom center for a natural pull-forward motion',
      'Pages panel scales open from scaleX(0.2) to scaleX(1) like a hinged cover',
      'Every book resets cleanly at the end of its own segment — none stay permanently slid out',
      'Fully reversible — scrubbed timeline plays backward cleanly on scroll-up',
      'Warm wood-and-leather color palette via CSS custom property --hue per book',
      'No pinning required — content scrolls through a tall section for a natural reading rhythm',
      'Responsive book and panel sizing at the 640px breakpoint',
      'Vertical writing-mode spine labels for an authentic bookshelf look',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Book or product catalog storytelling', desc: 'Use each "book" as a product or publication, revealing a description panel as users scroll through a catalog page.' },
      { icon: 'FLOW', title: 'Sequential feature reveal', desc: 'Repurpose each book as a feature card in a numbered story, sliding out and opening to reveal a description one at a time.' },
      { icon: 'LEARN', title: 'Portfolio or case-study timeline', desc: 'Each book becomes a project; the pages panel reveals project details as the visitor scrolls through your body of work.' },
      { icon: 'APP',    title: 'Library or bookstore landing page', desc: 'A literal bookshelf hero section for a reading app, library, or bookstore, introducing featured titles one by one.' },
      { icon: 'ART', title: 'Editorial long-form storytelling', desc: 'Break a long article into "chapters" represented as books that open to reveal a summary as the reader scrolls.' },
      { icon: 'CODE', title: 'Learn multi-segment scrub timelines', desc: 'Study how one numeric unit per book divides a single ScrollTrigger across many sequential animations without extra triggers, and how a zIndex tween keeps each one visible in turn.' },
    ],
    faqs: [
      { q: 'Why use one ScrollTrigger instead of one per book?', a: 'A single timeline scrubbed against one long .shelf-wrap section is more performant and keeps every book perfectly synchronized to scroll position. Creating a separate timeline per book (each with its own default tween durations, on an identical full-page ScrollTrigger) makes every book\'s effective timeline a different length, so they drift out of sync with each other — genuinely one shared timeline with explicit positions and durations is what keeps every book\'s turn the same size.' },
      { q: 'Why does an opened pages panel need a z-index tween?', a: 'The panel is positioned to the right of its spine and is wide enough to visually overlap several of the following books in the row. Without an explicit z-index, later siblings in DOM order paint on top of it by default, so most of an opened panel would render hidden behind the very spines it should float above. Raising the active book\'s z-index for the duration of its own segment (and lowering it again afterward) guarantees whichever book is currently open is always the one on top.' },
      { q: 'How do I make a book stay open instead of closing?', a: 'Remove that book\'s .to(pages, { opacity: 0 ... }) and spine-reset tweens, or move them much closer to t0 + 1 so they only fire right at the very end of its segment.' },
      { q: 'Can I use real images instead of text panels?', a: 'Yes — add an <img> inside .pages alongside or instead of the <p> text; the panel container already scales and fades in as a unit.' },
      { q: 'Why does scrolling back up work correctly?', a: 'Because scrub: true ties the timeline\'s playhead directly to scroll position rather than firing a one-shot animation, GSAP automatically plays every tween — including the zIndex sets — in reverse as the user scrolls upward.' },
      { q: 'How many books can I add?', a: 'Any number — each book simply claims the next whole integer unit of the timeline (t0 = i), so the total timeline length and the scroll distance it maps to both grow automatically with however many .book elements exist.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS and JS into an AI assistant and ask it to walk through why every book needs to share one single GSAP timeline and ScrollTrigger rather than each creating its own, and why the active book's z-index has to be raised above its neighbors while its pages panel is open. It's also a good candidate to extend: ask the assistant to make the pages panel display a real cover image with a CSS 3D flip instead of a flat scale-open, to add a subtle shelf-dust parallax layer behind the books, or to convert the shelf into a horizontal-scroll gallery using the same segment-timeline technique paired with [scroll-horizontal-pin](/ui-snippets/scroll-horizontal-pin/).`,
      prompt: `Build a scroll-driven "bookshelf" animation in HTML, CSS and JavaScript using GSAP and ScrollTrigger — no React, no canvas, no WebGL.

Requirements:
- Render a horizontal row of narrow div "book spine" elements sitting on a wooden shelf illustration built from CSS gradients, each spine a different flat color and each with a vertical text label (use CSS writing-mode).
- Give each book a hidden absolutely-positioned "pages" panel anchored to its right edge, wide enough to overlap several neighboring spines, starting scaled down and transparent with its transform-origin on the left edge so it can open like a hinged cover.
- Create exactly one GSAP timeline and attach exactly one ScrollTrigger to it (start 'top top', end 'bottom bottom', scrub: true) — never create a separate timeline or ScrollTrigger per book, since giving each book its own timeline (each ending up a different effective length from default tween durations) on an identical scroll range would make them drift out of sync with each other.
- Give every book exactly one whole integer unit of that single timeline as its own segment (book i's segment starts at time i), and within it: raise that book's z-index above its neighbors, slide and rotate the spine outward from the shelf using its own transform-origin at the bottom, fade/scale open its pages panel, then close the panel, return the spine to rest, and lower its z-index back down again — every book must reset this way, including the very first one, and every tween needs an explicit duration and position rather than relying on defaults.
- The entire effect must play forward and reverse cleanly as the user scrolls down and back up, since scrub ties it directly to scroll position with no manual state to reset.
- Use a warm library color palette: dark wood browns for the shelf and background, and a distinct accent hue per book spine.`,
    },
  },
};

export default scrollBookShelfSlide;
