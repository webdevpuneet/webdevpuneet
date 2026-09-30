const scrollChapterSidebarStory = {
  id: 'scroll-chapter-sidebar-story',
  title: 'Scroll Chapter Sidebar Story',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [],
  html: `<div class="css-layout">
  <aside class="css-sidebar">
    <div class="css-sidebar-inner">
      <div class="css-brand">The Long Road</div>
      <nav class="css-nav" id="cssNav">
        <a href="#chapter-1" data-chapter="chapter-1"><span class="css-num">01</span>The Departure</a>
        <a href="#chapter-2" data-chapter="chapter-2"><span class="css-num">02</span>Crossing the Delta</a>
        <a href="#chapter-3" data-chapter="chapter-3"><span class="css-num">03</span>The Long Silence</a>
        <a href="#chapter-4" data-chapter="chapter-4"><span class="css-num">04</span>Into the Highlands</a>
        <a href="#chapter-5" data-chapter="chapter-5"><span class="css-num">05</span>Arrival</a>
      </nav>
      <div class="css-progress-track"><div class="css-progress-fill" id="cssProgressFill"></div></div>
    </div>
  </aside>
  <main class="css-main">
    <section class="css-chapter" id="chapter-1">
      <span class="css-tag">Chapter 01</span>
      <h2>The Departure</h2>
      <p>The crew leaves before dawn, while the harbor is still asleep and the tide is exactly right. Nobody says much — everyone already knows what six months away means, and none of it needs saying out loud again.</p>
      <p>By the time the sun clears the breakwater, the coastline is already a thin grey line, and then it isn't there at all.</p>
    </section>
    <section class="css-chapter" id="chapter-2">
      <span class="css-tag">Chapter 02</span>
      <h2>Crossing the Delta</h2>
      <p>The river delta is wider than any chart suggested, a maze of channels that shift with every season. Twice the crew runs aground on sandbars that didn't exist the year before.</p>
      <p>A local guide, hired on a hunch at the last port, turns out to know every one of them by name.</p>
    </section>
    <section class="css-chapter" id="chapter-3">
      <span class="css-tag">Chapter 03</span>
      <h2>The Long Silence</h2>
      <p>Three weeks pass with no landmark, no signal, nothing but open water and the same routine repeated until it stops feeling like routine at all.</p>
      <p>It's during this stretch that the real work of the expedition happens — not the dramatic parts, just the daily discipline of staying the course.</p>
    </section>
    <section class="css-chapter" id="chapter-4">
      <span class="css-tag">Chapter 04</span>
      <h2>Into the Highlands</h2>
      <p>Landfall comes as a wall of green rising out of the haze. The highlands prove far steeper than the maps implied, and the last leg becomes a trek on foot.</p>
      <p>What the crew finds at the top of the ridge changes the entire purpose of the expedition.</p>
    </section>
    <section class="css-chapter" id="chapter-5">
      <span class="css-tag">Chapter 05</span>
      <h2>Arrival</h2>
      <p>The return home is quieter than the departure. There's no crowd waiting — just a harbor, a tide, and a crew that isn't quite the same one that left.</p>
      <p>The full account, with maps and photographs, took another two years to write.</p>
    </section>
  </main>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Georgia,'Times New Roman',serif;background:#f7f4ee;color:#2a2622;min-height:100vh}
.css-layout{display:grid;grid-template-columns:260px 1fr;max-width:1100px;margin:0 auto}
.css-sidebar{position:relative}
.css-sidebar-inner{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;gap:28px;padding:24px}
.css-brand{font-family:system-ui,sans-serif;font-size:12px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#8a7a5c}
.css-nav{display:flex;flex-direction:column;gap:16px}
.css-nav a{display:flex;align-items:baseline;gap:10px;text-decoration:none;color:#a89a80;font-size:15px;font-weight:600;transition:color .25s;border-left:2px solid transparent;padding-left:12px;margin-left:-14px}
.css-nav a.is-active{color:#2a2622;border-left-color:#b45309}
.css-num{font-family:system-ui,sans-serif;font-size:11px;font-weight:800;color:inherit;opacity:.6}
.css-progress-track{width:2px;height:120px;background:rgba(0,0,0,.08);border-radius:2px;margin-left:-14px;overflow:hidden}
.css-progress-fill{width:100%;height:0%;background:#b45309;border-radius:2px;transition:height .1s linear}
.css-main{padding:14vh 40px 40vh;border-left:1px solid rgba(0,0,0,.08)}
.css-chapter{min-height:80vh;max-width:560px;padding-bottom:14vh}
.css-tag{font-family:system-ui,sans-serif;font-size:12px;font-weight:800;letter-spacing:.12em;text-transform:uppercase;color:#b45309}
.css-chapter h2{font-size:clamp(28px,4vw,42px);margin:10px 0 20px;letter-spacing:-.01em}
.css-chapter p{font-size:18px;line-height:1.75;color:#4a453c;margin-bottom:16px}
@media (max-width:820px){
  .css-layout{grid-template-columns:1fr}
  .css-sidebar{display:none}
  .css-main{border-left:none;padding:8vh 24px 20vh}
}`,

  js: `const links = document.querySelectorAll('#cssNav a');
const chapters = document.querySelectorAll('.css-chapter');
const progressFill = document.getElementById('cssProgressFill');

// A middle-band IntersectionObserver decides which chapter is "current" —
// whichever chapter occupies the vertical center of the viewport gets the
// active nav state, so the sidebar always reflects what the reader is
// actually reading, not just what has technically scrolled past.
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const id = entry.target.id;
    links.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('data-chapter') === id);
    });
  });
}, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

chapters.forEach((chapter) => observer.observe(chapter));

// Clicking a sidebar link smooth-scrolls to its chapter without a hash
// jump, keeping the URL clean and avoiding the native jump-then-observer
// double-fire some anchor implementations produce.
links.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.getElementById(link.getAttribute('data-chapter'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// The thin progress rail fills based on overall scroll progress through
// the whole article body, independent of which single chapter is active —
// a reader can see both "which chapter am I in" and "how far into the
// whole piece am I" at a glance.
function updateProgress() {
  const doc = document.documentElement;
  const scrollable = doc.scrollHeight - window.innerHeight;
  const progress = scrollable > 0 ? window.scrollY / scrollable : 0;
  progressFill.style.height = Math.min(100, Math.max(0, progress * 100)) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);
updateProgress();`,

  seo: {
    title: 'Scroll Chapter Sidebar Story — Free Sticky-Nav Scrollytelling Layout (No Library)',
    description: `A long-form scrollytelling layout with a sticky sidebar chapter nav that highlights the current chapter via IntersectionObserver, plus a scroll-progress rail — built with zero dependencies.`,
    about: {
      title: 'Scroll Chapter Sidebar Story — A Sticky Chapter Nav That Tracks Reading Position',
      description: `Long-form narrative journalism — expedition write-ups, deep-dive features, book-style microsites — needs a different scaffold than a short scrollytelling stunt: a persistent way to see where you are in a much longer piece. This snippet builds that scaffold with a sticky sidebar chapter list, a native \`IntersectionObserver\` to track reading position, and a thin progress rail — no animation library required.

**The sidebar is sticky, not fixed**

\`.css-sidebar-inner\` uses \`position: sticky; top: 0; height: 100vh\` inside a full-height sidebar column, so it stays pinned in the viewport for as long as the reader is inside \`.css-main\`'s grid row, then naturally scrolls away with the rest of the page once the article ends — simpler than a \`position: fixed\` sidebar, which would need manual show/hide logic to avoid floating over the intro and outro of the page.

**A middle-band observer decides the active chapter, not scroll math**

Rather than computing which chapter's scroll offset the current \`window.scrollY\` falls within — brittle math that breaks the moment chapter heights vary — a single \`IntersectionObserver\` with \`rootMargin: '-45% 0px -45% 0px'\` watches every \`.css-chapter\` section directly. Only the chapter genuinely centered in the vertical middle of the viewport is ever considered "current," so the sidebar highlight always matches where a reader's eyes actually are, regardless of how long any individual chapter's text runs.

**Two separate progress signals, on purpose**

The active-chapter highlight and the thin progress rail track two different things deliberately: the highlight answers "which chapter am I reading," computed from intersection state, while the rail answers "how far through the entire piece am I," computed from a plain \`window.scrollY\` ratio against total scrollable height. A reader deep in a long chapter four sees both — chapter four highlighted, and the rail two-thirds full — which a single combined indicator couldn't express as clearly.

**Click-to-scroll without a hash jump**

Sidebar links intercept their click with \`preventDefault()\` and call \`scrollIntoView({ behavior: 'smooth' })\` directly on the target chapter, rather than letting the browser perform its native anchor jump. This keeps the URL free of a changing \`#chapter-n\` hash and avoids the native jump firing the IntersectionObserver in an unpredictable order relative to the smooth-scroll animation.

**Customizing it**

Add a sixth \`.css-chapter\` and matching sidebar link with the same \`data-chapter\` id — the observer, click handler, and progress rail all work against the live DOM with no fixed chapter count anywhere. On narrow viewports the sidebar hides entirely rather than cramming into a mobile layout, letting the piece read as a plain long-form article. Pair with a [scroll reading time](/ui-snippets/scroll-reading-time/) estimate at the top, or a [scroll spy nav](/ui-snippets/scroll-spy-nav/) for a shorter, single-page variant of the same active-link idea.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `No CDN scripts needed — everything runs on native browser APIs.` },
      { title: 'Scroll through the chapters', text: `The sidebar link for whatever chapter is centered on screen highlights automatically.` },
      { title: 'Watch the thin progress rail', text: `It fills based on total scroll progress through the whole piece.` },
      { title: 'Click a sidebar chapter link', text: `Smooth-scrolls straight to that chapter with no hash jump in the URL.` },
      { title: 'Resize to a narrow viewport', text: `The sidebar hides and the piece reads as a plain single-column article.` },
      { title: 'Add more chapters', text: `Add a .css-chapter section plus a matching nav link with the same data-chapter id.` },
    ] },
    features: [
      { title: 'Zero dependencies', text: `Built entirely on native IntersectionObserver, no animation library.` },
      { title: 'Sticky, not fixed, sidebar', text: `position: sticky keeps the nav pinned only while the article is in view.` },
      { title: 'Middle-band active detection', text: `The chapter centered in the viewport is highlighted, regardless of chapter length.` },
      { title: 'Two independent progress signals', text: `Chapter highlight and overall progress rail track different things.` },
      { title: 'Clean smooth-scroll navigation', text: `Sidebar clicks scroll without leaving a changing hash in the URL.` },
      { title: 'Scales to any chapter count', text: `No hardcoded chapter total anywhere in the observer or progress logic.` },
      { title: 'Responsive single-column fallback', text: `The sidebar hides entirely below 820px rather than cramping the layout.` },
      { title: 'Serif long-form typography', text: `Readable line length and generous line-height tuned for extended reading.` },
    ],
    useCases: [
      { title: 'Long-form journalism and feature articles', text: `Give readers a persistent sense of place across a multi-thousand-word piece.` },
      { title: 'Expedition, travel, and research write-ups', text: `Chapter-style navigation matches the natural structure of a journey narrative.` },
      { title: 'Book or ebook preview microsites', text: `Present a chapter list alongside readable excerpts.` },
      { title: 'Technical documentation and long guides', text: `Reuse the same sticky-nav-plus-observer pattern for a docs page's table of contents.` },
      { title: 'Company history or annual report deep-dives', text: `Pair with a [scroll company timeline](/ui-snippets/scroll-company-timeline/) as a shorter companion section.` },
      { title: 'Case study or portfolio narratives', text: `Structure a detailed project write-up into readable, navigable chapters.` },
    ],
    faqs: [
      { q: `How does the sidebar know which chapter is currently active?`, a: `A single IntersectionObserver watches every .css-chapter section with a rootMargin of '-45% 0px -45% 0px', which shrinks its effective detection zone down to a thin horizontal band across the vertical middle of the viewport. Only the chapter section that is genuinely intersecting that middle band is treated as active, so the sidebar highlight always reflects whichever chapter the reader's eyes are actually on, even when chapters vary a lot in length.` },
      { q: `Why is there both a chapter highlight and a separate progress rail?`, a: `They answer two different questions. The chapter highlight, driven by the IntersectionObserver, answers "which chapter is the reader currently in." The thin progress rail is computed separately from window.scrollY divided by total scrollable height, and answers "how far through the entire piece has the reader gotten." A reader midway through a long chapter three would see chapter three highlighted while the rail shows something like 55% — information a single combined indicator couldn't convey as clearly.` },
      { q: `Why use position: sticky instead of position: fixed for the sidebar?`, a: `position: sticky keeps the sidebar pinned only while its parent grid column (the height of the whole .css-main article) is scrolling past — it naturally stops being sticky and scrolls away once the article ends, with zero JavaScript. A fixed sidebar would stay pinned indefinitely regardless of scroll position, requiring extra show/hide logic to prevent it from floating over content before or after the article, which sticky avoids entirely.` },
      { q: `Why does clicking a sidebar link call scrollIntoView instead of using a normal anchor href jump?`, a: `The click handler calls e.preventDefault() and then target.scrollIntoView({ behavior: 'smooth' }) directly, rather than letting the browser perform its native, instant anchor jump. This keeps the page's URL free of a changing #chapter-n hash on every click, and avoids a timing conflict where a native jump could fire the IntersectionObserver's callback in an order that doesn't match the smooth-scroll animation still in progress.` },
      { q: `How do I build this chapter sidebar story in React, Vue, or Angular?`, a: `Create the IntersectionObserver and the scroll/resize listeners for the progress rail inside a mount effect (useEffect, onMounted, or ngAfterViewInit) after the chapter sections have rendered, and store the active chapter id in component state rather than toggling DOM classes directly. Disconnect the observer and remove the scroll/resize listeners in the cleanup function to avoid duplicate observers accumulating across re-renders or route changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the active-chapter detection uses a middle-band IntersectionObserver rather than comparing window.scrollY against each chapter's offsetTop, and why the layout keeps the chapter highlight and the overall progress rail as two separate, independently computed signals instead of merging them into one indicator. The same assistant can help extend the pattern — ask it to add nested sub-chapter anchors within a single long chapter, persist reading position in localStorage so a returning reader resumes where they left off, or animate the progress rail's fill with a subtle easing instead of the current linear transition. Treat the code as a working, dependency-free base for your own long-form scrollytelling layout.`,
      prompt: `Build a "scroll chapter sidebar story" long-form layout in plain HTML, CSS, and JavaScript using only the native IntersectionObserver API — no external library, no GSAP, no bundler.

Requirements:
- A two-column CSS grid layout: a narrow left sidebar containing a brand label, a vertical list of chapter navigation links (each with a two-digit chapter number and title, and a data attribute matching a chapter section's id), and a thin vertical progress rail; and a wide right column containing several long-form chapter sections, each with a tag label, heading, and multiple paragraphs of readable body text.
- Make the sidebar's inner content sticky (position: sticky, top: 0, height: 100vh) so it stays pinned in the viewport only while the reader is scrolling through the chapters column, and naturally scrolls away once the content ends — not position: fixed.
- Use a single IntersectionObserver with a rootMargin set to large negative top and bottom percentages (such as -45% on each side) watching every chapter section, so that only the chapter section currently occupying the vertical middle band of the viewport is ever marked "active," and toggle an active CSS class on the matching sidebar link accordingly.
- Separately, compute an overall reading-progress percentage from the ratio of the current window scroll position to the total scrollable height of the page, updated on scroll and resize, and use it to set the height (or width, for a horizontal variant) of a distinct progress-rail fill element — keep this progress calculation completely independent from the chapter-highlight logic.
- Make each sidebar chapter link, on click, prevent the default anchor jump and instead call scrollIntoView with smooth behavior on the corresponding chapter section, so the page's URL never gains a changing hash fragment.
- Hide the sidebar entirely below a reasonable tablet breakpoint (such as 820px) so the layout gracefully degrades to a plain single-column long-form article on narrow viewports, without breaking the observer or progress logic for the remaining content.`,
    },
  },
};

export default scrollChapterSidebarStory;
