const scrollMarginAnnotationsSync = {
  id: 'scroll-margin-annotations-sync',
  title: 'Scroll-Synced Margin Annotations',
  lastmod: '2026-08-27',
  category: 'scroll',
  html: `<div class="demo">
  <div class="reader" id="reader">
    <article class="article">
      <p data-note="n1">Rate limiting protects an API from being overwhelmed by too many requests in a short window. Without it, a single misbehaving client can degrade service for everyone else sharing the same backend.</p>
      <p data-note="n2">Most implementations use a token bucket or sliding window counter. A token bucket refills at a fixed rate and each request consumes one token, naturally smoothing out bursts while still allowing short spikes.</p>
      <p>Fixed window counters are simpler to implement but suffer from a boundary problem: a client can send double the intended limit by timing requests around the reset boundary.</p>
      <p data-note="n3">Sliding window counters avoid the boundary problem by weighting the previous window's count based on how much of it overlaps the current window, giving a smoother and harder-to-game limit.</p>
      <p>Most public APIs communicate their limits via response headers like X-RateLimit-Remaining and X-RateLimit-Reset, so a well-behaved client can back off proactively instead of hitting a 429.</p>
      <p data-note="n4">Returning a 429 Too Many Requests status with a Retry-After header is the standard way to signal that a client should slow down, and gives the client a concrete number of seconds to wait.</p>
      <p>Distributed rate limiting across multiple servers usually requires a shared store like Redis, since per-instance in-memory counters can't see the full picture of a client's total request volume.</p>
    </article>
    <aside class="margin-notes" id="marginNotes">
      <div class="note" data-target="n1">
        <span class="note-tag">Why</span>
        Protects shared infrastructure from a single noisy client.
      </div>
      <div class="note" data-target="n2">
        <span class="note-tag">Common</span>
        Token bucket is the most widely used algorithm in production.
      </div>
      <div class="note" data-target="n3">
        <span class="note-tag">Better</span>
        Sliding window avoids the "double burst" exploit of fixed windows.
      </div>
      <div class="note" data-target="n4">
        <span class="note-tag">Spec</span>
        429 + Retry-After is defined in RFC 6585.
      </div>
    </aside>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }

.reader { display: flex; gap: 22px; width: 560px; max-width: 100%; height: 340px; overflow: hidden; }
.article { flex: 1; overflow-y: auto; padding: 4px 14px 4px 4px; scroll-behavior: smooth; }
.article p { font-size: 12.5px; line-height: 1.75; color: #475569; padding: 12px 4px; border-radius: 8px; transition: background 0.25s; }
.article p[data-note] { cursor: default; }
.article p.active-para { background: #eef2ff; }

.margin-notes { width: 150px; flex-shrink: 0; overflow-y: auto; padding: 4px; display: flex; flex-direction: column; gap: 44px; }
.note { font-size: 11px; line-height: 1.5; color: #94a3b8; padding: 10px; border-left: 2px solid #e2e8f0; opacity: 0.5; transition: opacity 0.25s, border-color 0.25s, color 0.25s; }
.note-tag { display: block; font-size: 9.5px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; color: #c7d2fe; margin-bottom: 4px; }
.note.active { opacity: 1; border-color: #6366f1; color: #334155; }
.note.active .note-tag { color: #6366f1; }`,
  js: `const reader = document.getElementById('reader');
const article = reader.querySelector('.article');
const paras = Array.from(article.querySelectorAll('p[data-note]'));
const notes = Array.from(document.querySelectorAll('.note'));

const noteByTarget = new Map(notes.map((n) => [n.dataset.target, n]));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const note = noteByTarget.get(entry.target.dataset.note);
      if (!note) return;
      entry.target.classList.toggle('active-para', entry.isIntersecting);
      note.classList.toggle('active', entry.isIntersecting);
    });
  },
  { root: article, threshold: 0.6 }
);

paras.forEach((p) => observer.observe(p));`,
  seo: {
    title: 'Scroll-Synced Margin Annotations — IntersectionObserver Footnote Highlighting',
    description: 'A two-column reading layout where margin annotations light up in sync as their matching paragraph scrolls through view, powered by IntersectionObserver instead of scroll math.',
    about: {
      title: 'Scroll-Synced Margin Annotations — Reader and Notes Kept in Sync',
      description: `Academic papers and annotated articles have long used side-margin notes to add commentary without interrupting the main text's flow. This snippet recreates that print convention on the web, but adds something print can't: the margin note for whichever paragraph is currently in view **lights up automatically** as the reader scrolls, so the connection between text and annotation stays visually obvious without the reader having to hunt for it.

**Why IntersectionObserver instead of scroll position math**

An older approach would listen to the article panel's \`scroll\` event and manually compare each paragraph's \`getBoundingClientRect()\` against the viewport on every scroll tick — expensive to run at 60fps and easy to get subtly wrong. This snippet instead creates a single \`IntersectionObserver\` scoped to the scrollable article panel via \`root: article\`, and lets the browser itself efficiently report exactly when each \`<p data-note>\` crosses a 60%-visible threshold, firing a callback only when that actually changes rather than on every scroll frame.

**A Map, not a loop, connects paragraphs to their notes**

Each paragraph carries a \`data-note="n1"\` attribute, and each margin note carries a matching \`data-target="n1"\`. Rather than searching the DOM for a match every time the observer fires, a \`Map\` (\`noteByTarget\`) is built once up front, so each intersection callback does an O(1) lookup — \`noteByTarget.get(entry.target.dataset.note)\` — instead of re-querying the DOM on every scroll-triggered change.

**Not every paragraph needs an annotation**

Only some \`<p>\` elements in the article carry a \`data-note\` attribute — plain paragraphs without one are simply never observed and never get an "active" highlight, which mirrors how real annotated texts work: a note calls out a *specific* claim or definition, not every sentence, and the highlighting logic in this snippet naturally reflects that same selectivity.

**The threshold controls how "in view" has to be before it counts**

\`threshold: 0.6\` means a paragraph must be at least 60% visible within the scrollable article panel before its callback fires as intersecting — tuning this number changes how eagerly the highlight anticipates a paragraph coming into view versus waiting until it's substantially read. A lower threshold highlights earlier (as soon as a small sliver appears); a higher one waits until the paragraph dominates the visible area.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Tag paragraphs with data-note', text: 'Add data-note="n1" (or any unique id) to any <p> in the article that should have a matching margin annotation.' },
        { title: 'Add a matching .note with data-target', text: 'Each margin note needs a data-target attribute matching the paragraph\'s data-note value exactly.' },
        { title: 'Leave un-annotated paragraphs plain', text: 'Paragraphs without a data-note attribute are never observed and never trigger a highlight — use this to be selective about what gets called out.' },
        { title: 'Adjust the intersection threshold', text: 'Change the 0.6 value in the IntersectionObserver options to control how much of a paragraph must be visible before its note activates.' },
        { title: 'Style the active states', text: 'Customize .active-para and .note.active in the CSS panel to match your reading layout\'s color scheme.' },
      ],
    },
    features: [
      'IntersectionObserver-driven highlighting instead of manual scroll-position math',
      'Scoped observer root (the article panel itself), so it works correctly inside a nested scroll container, not just the page',
      'O(1) Map lookup connects each paragraph to its margin note on every intersection change',
      'Selective annotation — only tagged paragraphs are observed, matching how real margin notes work',
      'Configurable visibility threshold controls how eagerly a note activates as its paragraph scrolls into view',
      'Smooth CSS transitions on both the paragraph background and the note\'s opacity/border/color',
      'Independent scrollable columns for article text and margin notes, each with its own scrollbar',
      'Zero dependencies — a single IntersectionObserver instance handles the whole sync',
    ],
    useCases: [
      { icon: '📝', title: 'Annotated technical articles', desc: 'Add scroll-synced context beside the paragraph being read, with margin notes lighting as their matching paragraph passes through view.' },
      { icon: '📘', title: 'API and specification docs', desc: 'Highlight relevant callouts for the section being read, using a Map lookup that connects each paragraph to its note on every intersection change.' },
      { icon: '🎓', title: 'Educational reading platforms', desc: 'Give students contextual notes that appear at the right moment, observing only tagged paragraphs as real margin notes do.' },
      { icon: '⚖️', title: 'Legal and contract review', desc: 'Surface clause-specific commentary alongside the text, with the observer scoped to the article panel so it works inside nested scrolling regions.' },
      { icon: 'CODE', title: 'Related: Scroll Product Launch Story', desc: 'See the [Scroll Product Launch Story](/ui-snippets/scroll-product-launch-story/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use IntersectionObserver instead of a scroll event listener?', a: 'IntersectionObserver lets the browser efficiently notify your code only when a paragraph\'s visibility actually crosses the specified threshold, rather than running expensive getBoundingClientRect() calculations on every single scroll event, which can fire dozens of times per second.' },
      { q: 'What happens if two annotated paragraphs are both 60% visible at once?', a: 'Both paragraphs\' matching notes will be marked active simultaneously — the observer callback runs independently for every entry that crosses the threshold, so multiple simultaneous highlights are expected and handled correctly, not treated as a conflict.' },
      { q: 'Can the margin notes column have more notes than the article has paragraphs?', a: 'Yes — any .note whose data-target never matches an observed paragraph\'s data-note simply never activates; extra unmatched notes are harmless but pointless, so keep the sets aligned intentionally.' },
      { q: 'Does this work if the article and notes columns have different scroll heights?', a: 'Yes — the two columns scroll independently and the sync only cares about which paragraph is intersecting within the article\'s own scroll root; the notes column\'s own scroll position is unaffected unless you add your own auto-scroll-to-active-note behavior.' },
      { q: 'How is the observer scoped to the article panel instead of the whole page?', a: 'The IntersectionObserver options include root: article, which tells the browser to measure intersection against that specific scrollable element\'s bounds rather than the default (the browser viewport) — necessary since the article scrolls inside its own container, not the page.' },
      { q: 'Can I auto-scroll the margin notes column to keep the active note in view?', a: 'Yes — inside the observer callback, when a note becomes active you can call note.scrollIntoView({ behavior: "smooth", block: "center" }) on the notes column to keep the highlighted note visible as the reader scrolls further.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain why IntersectionObserver's threshold and root options are the right tool here compared to a scroll-event-and-getBoundingClientRect approach, and what tradeoffs come from choosing a low versus high threshold value for when a note should activate. It's also worth asking for a version that auto-scrolls the margin-notes column to keep the active note in view, or one that supports multiple simultaneous notes per paragraph rendered as a small stacked group.`,
      prompt: `Build a two-column reading layout in HTML, CSS and vanilla JavaScript where margin annotations on the right highlight in sync with whichever paragraph is currently in view in a scrollable article on the left — no external libraries.

Requirements:
- A scrollable article column of paragraphs, where only some paragraphs carry a data-note identifier attribute marking them as having an associated annotation.
- A separate scrollable margin-notes column, where each note element carries a matching data-target attribute referencing one paragraph's data-note value.
- Use the IntersectionObserver API, scoped to the article column as its root, to detect when an annotated paragraph becomes at least 60% visible within that scrollable column — do not use scroll event listeners with manual position calculations.
- When an annotated paragraph becomes sufficiently visible, apply a highlighted visual state to both that paragraph and its matching margin note simultaneously; when it scrolls back out of view, remove the highlight from both.
- Build an efficient paragraph-to-note lookup (e.g. a Map) once up front rather than searching the DOM inside the observer's callback on every intersection change.
- Ensure paragraphs without a data-note attribute are never observed and never produce a highlight, since not every paragraph needs an annotation.`,
    },
  },
};

export default scrollMarginAnnotationsSync;
