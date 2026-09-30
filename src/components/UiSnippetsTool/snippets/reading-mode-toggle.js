const readingModeToggle = {
  id: 'reading-mode-toggle',
  title: 'Distraction-Free Reading Mode Toggle',
  lastmod: '2026-08-08',
  category: 'buttons',
  html: `<div class="page-wrap" id="page-wrap">
  <header class="site-header">
    <div class="site-logo">Daily Signal</div>
    <button class="reading-toggle" id="reading-toggle" aria-pressed="false">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      <span id="toggle-label">Reading Mode</span>
    </button>
  </header>

  <div class="layout-grid" id="layout-grid">
    <main class="article-col">
      <p class="kicker">Long Read</p>
      <h1>The Case for Slower Interfaces</h1>
      <p class="byline">Published August 8, 2026 · 7 min read</p>
      <p>Most interfaces are optimised for one thing: keeping attention moving. Notifications, related-article rails, and autoplaying promos all compete for the same few seconds of focus a reader was about to give the actual article.</p>
      <p>Reading mode inverts that priority. The sidebar disappears, the promo block disappears, the text column narrows to a measure the eye can track comfortably line over line, and the font grows slightly with more breathing room between lines. Nothing about the article's words changes — only how much space is given to everything competing with them.</p>
      <p>The transition between the two states should never feel like a jump-cut. A layout that snaps instantly from wide to narrow is jarring in a way that undermines the calm the mode is trying to create, so this demo animates the column width, line-height, and background together over a fraction of a second.</p>
    </main>

    <aside class="side-col" id="side-col">
      <div class="widget">
        <p class="widget-title">Trending Now</p>
        <p class="widget-item">Why calm UI is the 2026 default</p>
        <p class="widget-item">Inside the return of RSS readers</p>
        <p class="widget-item">Ambient computing, five years on</p>
      </div>
      <div class="promo-block">
        <p class="promo-title">Go Ad-Free</p>
        <p class="promo-text">Support independent journalism and remove promos site-wide.</p>
        <button class="promo-btn">Subscribe</button>
      </div>
    </aside>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.page-wrap {
  background: #fff;
  transition: background 0.4s ease;
}
.page-wrap.reading { background: #faf6ee; }

.site-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 28px; border-bottom: 1px solid #e2e8f0;
  transition: border-color 0.4s ease;
}
.page-wrap.reading .site-header { border-color: #ece3d0; }
.site-logo { font-weight: 800; font-size: 16px; color: #0f172a; letter-spacing: -0.01em; }

.reading-toggle {
  display: flex; align-items: center; gap: 7px;
  background: #f1f5f9; border: 1.5px solid #e2e8f0; border-radius: 20px;
  padding: 7px 14px; font-family: inherit; font-size: 12.5px; font-weight: 700;
  color: #475569; cursor: pointer; transition: all 0.2s;
}
.reading-toggle:hover { border-color: #6366f1; color: #6366f1; }
.reading-toggle[aria-pressed="true"] { background: #1e293b; border-color: #1e293b; color: #fbbf24; }
.reading-toggle:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

/* — Layout grid: columns and gap animate together on toggle — */
.layout-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 260px;
  gap: 40px;
  max-width: 1000px; margin: 0 auto;
  padding: 40px 28px 80px;
  transition: grid-template-columns 0.4s ease, gap 0.4s ease, max-width 0.4s ease;
}
.layout-grid.reading {
  grid-template-columns: minmax(0, 1fr) 0px;
  gap: 0;
  max-width: 720px;
}

.article-col { min-width: 0; transition: max-width 0.4s ease; }
.kicker {
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
  color: #6366f1; margin-bottom: 8px;
}
.article-col h1 {
  font-size: 28px; line-height: 1.2; color: #0f172a; margin-bottom: 8px;
  transition: font-size 0.4s ease;
}
.byline { font-size: 12.5px; color: #94a3b8; margin-bottom: 22px; }
.article-col p:not(.kicker):not(.byline) {
  font-size: 16px; line-height: 1.65; color: #334155; margin-bottom: 18px;
  max-width: 100%;
  transition: font-size 0.4s ease, line-height 0.4s ease;
}

/* Reading mode: narrower measure, larger type, roomier lines, warm ground */
.layout-grid.reading .article-col h1 { font-size: 30px; }
.layout-grid.reading .article-col p:not(.kicker):not(.byline) {
  font-size: 18px;
  line-height: 1.9;
  max-width: 70ch;
}

/* — Sidebar: fades and collapses away in reading mode — */
.side-col {
  display: flex; flex-direction: column; gap: 20px;
  opacity: 1; overflow: hidden;
  transition: opacity 0.3s ease;
}
.layout-grid.reading .side-col {
  opacity: 0; pointer-events: none;
  width: 0; min-width: 0;
}

.widget, .promo-block {
  background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px;
}
.widget-title, .promo-title { font-size: 12.5px; font-weight: 800; color: #0f172a; margin-bottom: 10px; }
.widget-item { font-size: 12.5px; color: #475569; padding: 6px 0; border-top: 1px solid #e2e8f0; }
.widget-item:first-of-type { border-top: none; }
.promo-block { background: #eef2ff; border-color: #c7d2fe; }
.promo-text { font-size: 12px; color: #4338ca; line-height: 1.5; margin-bottom: 12px; }
.promo-btn {
  width: 100%; padding: 8px; border: none; border-radius: 8px;
  background: #6366f1; color: #fff; font-family: inherit; font-size: 12.5px; font-weight: 700;
  cursor: pointer;
}
.promo-btn:hover { background: #4f46e5; }`,

  js: `const STORAGE_KEY = 'reading-mode';
const pageWrap = document.getElementById('page-wrap');
const layoutGrid = document.getElementById('layout-grid');
const toggleBtn = document.getElementById('reading-toggle');
const toggleLabel = document.getElementById('toggle-label');

function setReadingMode(on) {
  pageWrap.classList.toggle('reading', on);
  layoutGrid.classList.toggle('reading', on);
  toggleBtn.setAttribute('aria-pressed', String(on));
  toggleLabel.textContent = on ? 'Normal View' : 'Reading Mode';
  localStorage.setItem(STORAGE_KEY, on ? '1' : '0');
}

toggleBtn.addEventListener('click', () => {
  const isOn = layoutGrid.classList.contains('reading');
  setReadingMode(!isOn);
});

// Restore the previous choice on load so the preference persists per site,
// same as a real reading-mode implementation would.
setReadingMode(localStorage.getItem(STORAGE_KEY) === '1');`,

  seo: {
    title: 'Distraction-Free Reading Mode Toggle — HTML CSS JS Snippet',
    description: 'Toggle a sidebar-and-promo layout into a narrow, animated reading column with a warmer background and larger type. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Distraction-Free Reading Mode Toggle — Animated Grid Layout Switching Between Normal and Reading Views',
      description: `Every long-form content page fights the same underlying tension: the business needs sidebars, promo blocks, and related-content rails to drive engagement and revenue, while the reader just wants to read. A reading mode toggle resolves that tension without forcing a permanent tradeoff — the promotional layout stays the default, but a single click hands control back to the reader whenever they actually want to focus. This snippet implements a complete, animated reading mode toggle: click the button in the header and the sidebar and promo block disappear, the text column narrows to an optimal reading measure, line-height and font-size increase slightly, and the page background shifts to a warmer off-white — all transitioning smoothly rather than snapping instantly.

**Why the transition is animated, not instant**

An abrupt layout jump-cut — sidebar vanishing and column width changing in a single frame — is genuinely disorienting. The eye has to re-locate where it was reading, and a sudden width change during that split second breaks the reader's flow far more than the mode change was meant to help it. This snippet instead applies \`transition: grid-template-columns 0.4s ease, gap 0.4s ease, max-width 0.4s ease\` on the \`.layout-grid\` container, so the CSS Grid engine animates the sidebar's column track from \`260px\` down to \`0px\` and the gap from \`40px\` to \`0\` continuously, while \`.article-col p\` transitions its own \`font-size\` and \`line-height\` in parallel. The background colour of \`.page-wrap\` cross-fades from white to a warm off-white (\`#faf6ee\`) over the same \`0.4s\` window using a plain \`background\` transition, so every visual change lands together as one coherent motion rather than several uncoordinated snaps.

**Why grid-template-columns is the right property to animate**

CSS Grid track sizes are technically discrete values, but modern browsers interpolate \`grid-template-columns\` smoothly when both the before and after values are animatable lengths, which is exactly the technique this snippet relies on: the sidebar column goes from \`260px\` to \`0px\` rather than the sidebar simply being removed from the DOM or hidden with \`display: none\` mid-transition. Pairing that with \`opacity\` and \`pointer-events: none\` on \`.side-col\` lets the sidebar's content fade out visually at the same time its track collapses, so by the time the column reaches zero width there is nothing left partially visible to look broken or clipped.

**The optimal reading measure: why 65 to 75 characters per line**

Typography research consistently converges on roughly 65 to 75 characters per line — commonly written as \`65-75ch\` in CSS — as the width at which the eye can track from the end of one line to the start of the next without losing its place, especially over long stretches of reading. This snippet sets \`max-width: 70ch\` on paragraph text specifically inside \`.layout-grid.reading\`, alongside a larger \`font-size: 18px\` (up from \`16px\`) and a roomier \`line-height: 1.9\` (up from \`1.65\`). None of these values apply in the normal view, where the wider two-column layout is expected to carry more visual density.

**Why this matters for 2026 calm UI design**

Calm UI — interfaces that reduce cognitive load rather than compete for attention — has become a defining expectation for any product built around sustained reading or focus, not just a niche accessibility feature. Giving readers an explicit, persistent, one-click way to strip a page down to just its content respects their attention without forcing the publisher to give up the promotional layout as a permanent default. Because the toggle state is saved to \`localStorage\` under the key \`reading-mode\`, a reader who prefers the distraction-free view gets it automatically on every subsequent article, and the animated transition keeps the switch between the two states feeling considered rather than abrupt.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click "Reading Mode" in the header',
          text: 'The button toggles between "Reading Mode" and "Normal View" labels. Watch the sidebar (trending widget and subscribe promo) fade and collapse away while the article column narrows and re-centers, all animating together rather than jumping instantly.',
        },
        {
          title: 'Notice the typography changes',
          text: 'In reading mode, body paragraphs grow from 16px to 18px, line-height increases from 1.65 to 1.9, and the max-width clamps to 70ch — the CSS Grid track and font transitions are wired to fire over the same 0.4s window in the CSS panel so nothing lands out of sync.',
        },
        {
          title: 'Notice the warmer background',
          text: 'The .page-wrap background cross-fades from white to a warm off-white (#faf6ee) when reading mode is active, a subtle cue commonly used by e-readers and reading apps to reduce eye strain during long sessions compared to stark white.',
        },
        {
          title: 'Reload to see the persisted preference',
          text: 'Toggle reading mode on, then reload the demo. setReadingMode() reads localStorage.getItem("reading-mode") on load and applies the saved state immediately, so a reader\'s preference carries over to their next article rather than resetting every visit.',
        },
        {
          title: 'Inspect the animated grid-template-columns',
          text: 'In the CSS panel, .layout-grid uses grid-template-columns: minmax(0, 1fr) 260px normally, switching to minmax(0, 1fr) 0px in .reading. Because both values are transitionable lengths, the browser animates the sidebar track width smoothly instead of it vanishing in one frame.',
        },
        {
          title: 'Export and wire to real article content',
          text: 'Click HTML or JSX to export, then replace the sample paragraphs with your CMS-rendered article body inside .article-col, and your real sidebar widgets inside .side-col. Keep the aria-pressed attribute in sync with the JS toggle so assistive technology announces the current state correctly.',
        },
      ],
    },
    features: [
      'Animated CSS Grid: grid-template-columns interpolates the sidebar track from 260px to 0px on toggle',
      'Synchronized transitions: grid columns, gap, max-width, font-size, and background all animate over the same 0.4s window',
      'Optimal reading measure: max-width: 70ch clamps line length to the 65-75 character range typography research favors',
      'Sidebar fade-and-collapse: opacity plus pointer-events: none removes interactivity before the track fully collapses',
      'Warm background shift: page background cross-fades from white to #faf6ee to reduce eye strain in reading mode',
      'Typography scale-up: font-size 16px to 18px and line-height 1.65 to 1.9 for a more comfortable long-form read',
      'localStorage persistence: reading-mode preference is remembered and reapplied automatically on every visit',
      'Accessible toggle: aria-pressed reflects state and the button label swaps between "Reading Mode" and "Normal View"',
    ],
    useCases: [
      {
        icon: 'LEARN',
        title: 'News and publisher sites with sidebar-heavy article templates',
        desc: 'Publishers need trending widgets, related articles, and subscription promos to drive engagement and revenue, but these same elements are exactly what a focused reader wants to escape. A reading mode toggle lets both goals coexist: the promotional layout stays the default for casual browsing, while a single click gives readers who are actually committing to an article the distraction-free version they want.',
      },
      {
        icon: 'FORM',
        title: 'Documentation and knowledge-base long-form guides',
        desc: 'Technical documentation with lengthy conceptual guides benefits from the same narrowing-and-widening treatment as editorial content — a developer working through a long architecture explainer wants the same 65-75ch measure and increased line-height as a magazine reader, without permanently redesigning the doc site\'s default three-column layout.',
      },
      {
        icon: 'APP',
        title: 'Newsletter and blog platforms competing with dedicated reader apps',
        desc: 'Standalone reader apps like Pocket and Reader View exist specifically because publisher pages are often too busy to read comfortably. Building an equivalent reading mode directly into the page removes the need for readers to export content to a third-party app, keeping them (and your analytics, and your subscribe prompts) on your own site.',
      },
      {
        icon: 'DESIGN',
        title: 'Editorial design systems wanting a calm, considered reading state',
        desc: 'Design systems oriented around calm UI can expose a shared reading-mode class and CSS custom properties for the measure, line-height, and background shift so every article template — news, blog, documentation — gets a consistent distraction-free state without reimplementing the toggle from scratch each time, similar in spirit to how the [Text Size Adjuster](/ui-snippets/text-size-adjuster) exposes one shared scaling variable.',
      },
      {
        icon: 'FLOW',
        title: 'Session-based focus mode for research and study tools',
        desc: 'Research tools, study apps, and PDF-adjacent web readers can use the same animated grid-collapse pattern to let users temporarily hide annotation panels, citation sidebars, or tool palettes while reading a source in full, then bring them back with one click once they need to reference or act on the material again.',
      },
      {
        icon: 'CODE',
        title: 'Teaching animatable CSS Grid tracks and coordinated multi-property transitions',
        desc: 'This snippet is a clean reference for animating grid-template-columns itself rather than just opacity or transform, plus the discipline of keeping several unrelated CSS transitions (grid track, font-size, line-height, background) on the same duration and easing so a multi-property layout change reads as one coherent motion instead of several uncoordinated ones.',
      },
    ],
    faqs: [
      {
        q: 'Can grid-template-columns actually be animated with CSS transitions?',
        a: 'Yes, in all modern browsers, as long as both the starting and ending values are compatible lengths — this snippet transitions between minmax(0, 1fr) 260px and minmax(0, 1fr) 0px, both of which are interpolatable. Browsers will smoothly animate the track size between the two rather than snapping. Grid layouts using keyword values like auto or fr-only tracks on both sides of the transition may not interpolate as smoothly, so keeping at least one side expressed in a fixed unit like px is the safer approach for animation.',
      },
      {
        q: 'Why is 65-75 characters per line considered the optimal reading measure?',
        a: 'Typography and reading-comprehension research consistently finds that lines much shorter than about 45 characters force the eye to make too many line breaks per sentence, while lines longer than roughly 75-90 characters make it easy to lose the correct line when the eye returns to the left margin, especially at high reading speeds. The 65-75ch range, set here via max-width: 70ch, balances both failure modes and is the range used by most dedicated reading apps and typography-focused editorial sites.',
      },
      {
        q: 'Should reading mode always change the background color?',
        a: 'A subtle warm shift (this snippet uses #faf6ee) is a common and well-tested choice because pure white at high brightness can cause eye strain during extended reading, and a slightly warmer, lower-contrast background reduces that without sacrificing legibility. It is optional, though — some users and brands prefer to keep white and rely on the narrower measure and larger type alone; the background transition can simply be removed if it does not fit your product\'s visual identity.',
      },
      {
        q: 'How do I make reading mode the default for return visitors who prefer it?',
        a: 'This snippet already does that: setReadingMode() is called with the value read from localStorage.getItem("reading-mode") on every load, so once a user toggles reading mode on, it is applied automatically on their next visit without them needing to click the button again. For a server-rendered app, you can go further and read the same preference server-side from a cookie to avoid any flash of the normal layout before JavaScript runs.',
      },
      {
        q: 'Does hiding the sidebar with opacity and pointer-events cause any accessibility issues?',
        a: 'Used correctly it does not: opacity: 0 combined with pointer-events: none removes the sidebar from click and hover interaction and visually hides it, but the elements technically remain in the DOM and tab order unless you also remove them or set aria-hidden. For a fully robust implementation, add aria-hidden="true" to the sidebar when reading mode is active (and remove it when reading mode is off) so screen reader users do not encounter now-irrelevant widgets while tabbing through the narrowed reading view.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how grid-template-columns, gap, and the paragraph font-size/line-height transitions are kept in sync on the same 0.4s duration so the whole layout change reads as one motion instead of several separate snaps. It's a good prompt to also ask the assistant to add an aria-hidden toggle on the sidebar for screen reader correctness, since opacity and pointer-events alone hide it visually and from interaction but not from assistive technology. You could additionally ask it to wire prefers-reduced-motion so the transition duration drops to near-zero for users who have that OS-level preference set, or to extract the reading-measure and line-height values into CSS custom properties so a design system can tune them without touching the transition logic itself.`,
      prompt: `Build a distraction-free reading mode toggle in plain HTML, CSS, and JavaScript for an article page that normally shows a sidebar with widgets and a promotional block next to the article text.

Requirements:
- A toggle button in the page header that switches between a "normal" view (sidebar visible, full-width two-column CSS Grid layout, tighter line-height) and a "reading" view (sidebar hidden, content column narrowed, looser line-height, slightly larger font-size).
- The content column's max-width in reading mode must clamp to roughly 65-75 characters per line (for example max-width: 70ch), which is the range typography research treats as the optimal reading measure.
- The transition between the two states must be animated, not an instant jump-cut — animate the CSS Grid column track (grid-template-columns), the gap, the paragraph font-size and line-height, and the page background color together over the same duration and easing so the whole change reads as one coordinated motion.
- The sidebar must both visually fade out (opacity) and stop being interactive (pointer-events: none) as its grid track collapses toward zero width, rather than disappearing abruptly mid-animation.
- The page background should shift to a slightly warmer, lower-contrast tone in reading mode to reduce eye strain, cross-fading rather than switching instantly.
- The toggle button must expose its state via aria-pressed and update its visible label (for example "Reading Mode" vs "Normal View") so the current state is clear to both sighted and assistive-technology users.
- Persist the chosen mode to localStorage so it is automatically reapplied the next time the page loads.`,
    },
  },
};

export default readingModeToggle;
