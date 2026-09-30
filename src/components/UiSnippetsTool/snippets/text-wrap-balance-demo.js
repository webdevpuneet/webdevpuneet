const textWrapBalanceDemo = {
  id: 'text-wrap-balance-demo',
  title: 'CSS text-wrap: balance Demo',
  lastmod: '2026-08-08',
  category: 'visualizers',
  html: `<div class="demo">
  <div class="input-row">
    <label for="heading-input">Type a heading or short paragraph</label>
    <input type="text" id="heading-input" value="Design systems make teams move faster and ship consistent products">
  </div>

  <div class="columns">
    <div class="col">
      <div class="col-head">
        <span class="badge badge-wrap">text-wrap: wrap</span>
        <span class="col-sub">Default browser behavior</span>
      </div>
      <div class="box">
        <h3 class="sample sample-wrap" id="sample-wrap"></h3>
      </div>
      <p class="col-note">Fills each line greedily, so the last line is often a single short "orphan" word.</p>
    </div>

    <div class="col">
      <div class="col-head">
        <span class="badge badge-balance">text-wrap: balance</span>
        <span class="col-sub">Even line lengths</span>
      </div>
      <div class="box">
        <h3 class="sample sample-balance" id="sample-balance"></h3>
      </div>
      <p class="col-note">The browser tries every line-break combination and picks the most visually even one.</p>
    </div>

    <div class="col">
      <div class="col-head">
        <span class="badge badge-pretty">text-wrap: pretty</span>
        <span class="col-sub">Fewer orphans, paragraph text</span>
      </div>
      <div class="box">
        <p class="sample sample-pretty" id="sample-pretty"></p>
      </div>
      <p class="col-note">Optimized for body copy: avoids single-word last lines without balancing every line.</p>
    </div>
  </div>

  <div class="support-note" id="support-note"></div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo { max-width: 1080px; margin: 0 auto; padding: 32px 20px; display: flex; flex-direction: column; gap: 24px; }

.input-row { display: flex; flex-direction: column; gap: 8px; }
.input-row label { font-size: 13px; font-weight: 600; color: #334155; }
.input-row input {
  font-family: inherit; font-size: 15px;
  padding: 12px 14px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; outline: none;
  transition: border-color 0.15s;
}
.input-row input:focus { border-color: #6366f1; }

.columns { display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 18px; }

.col { display: flex; flex-direction: column; gap: 10px; }
.col-head { display: flex; flex-direction: column; gap: 4px; }
.badge {
  display: inline-block; align-self: flex-start;
  font-family: 'SFMono-Regular', Consolas, monospace;
  font-size: 11.5px; font-weight: 700;
  padding: 4px 9px; border-radius: 6px;
}
.badge-wrap { background: #f1f5f9; color: #475569; }
.badge-balance { background: #ede9fe; color: #6366f1; }
.badge-pretty { background: #ecfdf5; color: #059669; }
.col-sub { font-size: 11.5px; color: #94a3b8; }

.box {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
  padding: 22px 20px; min-height: 140px;
  display: flex; align-items: center;
  box-shadow: 0 6px 20px rgba(15,23,42,0.05);
}

.sample { font-size: 21px; font-weight: 700; line-height: 1.35; color: #0f172a; width: 100%; }
.sample-wrap { text-wrap: wrap; }
.sample-balance { text-wrap: balance; }
.sample-pretty { text-wrap: pretty; font-size: 15px; font-weight: 400; color: #334155; }

.col-note { font-size: 12px; color: #94a3b8; line-height: 1.5; }

.support-note {
  background: #fffbeb; border: 1px solid #fde68a; color: #92400e;
  font-size: 12.5px; line-height: 1.6; border-radius: 10px; padding: 12px 16px;
}
.support-note strong { color: #78350f; }`,

  js: `const input = document.getElementById('heading-input');
const sampleWrap = document.getElementById('sample-wrap');
const sampleBalance = document.getElementById('sample-balance');
const samplePretty = document.getElementById('sample-pretty');
const supportNote = document.getElementById('support-note');

function render() {
  const text = input.value.trim() || 'Type something above to see it wrap';
  sampleWrap.textContent = text;
  sampleBalance.textContent = text;
  samplePretty.textContent = text + '. ' + text + '.';
}

input.addEventListener('input', render);

function checkSupport() {
  const supportsBalance = CSS && CSS.supports && CSS.supports('text-wrap', 'balance');
  const supportsPretty = CSS && CSS.supports && CSS.supports('text-wrap', 'pretty');
  if (supportsBalance && supportsPretty) {
    supportNote.innerHTML = '<strong>Your browser supports both:</strong> text-wrap: balance and text-wrap: pretty are rendering natively below — no JavaScript line-break logic involved.';
  } else if (supportsBalance) {
    supportNote.innerHTML = '<strong>Partial support:</strong> text-wrap: balance works in this browser, but text-wrap: pretty is not supported here yet, so that column falls back to normal wrapping.';
  } else {
    supportNote.innerHTML = '<strong>Fallback active:</strong> this browser does not support text-wrap: balance or pretty yet, so all three columns wrap identically using default greedy wrapping.';
  }
}

render();
checkSupport();`,

  seo: {
    title: 'CSS text-wrap: balance & pretty Live Demo — Free Snippet',
    description: 'Type any heading and compare text-wrap: wrap, balance and pretty side by side. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'CSS text-wrap: balance and text-wrap: pretty — Native Typographic Line Breaking Explained',
      description: `Ragged headlines have been a persistent design annoyance for as long as CSS has existed: a two- or three-line heading wraps greedily, filling each line to its maximum width before spilling the leftover words onto a final line — sometimes a single short "orphan" word sitting awkwardly by itself. Designers have historically fought this with manual \`<br>\` tags, JavaScript libraries like Shopify's balance-text, or by adjusting copy length until it "looked right." The CSS Text Module Level 4 property \`text-wrap\` finally solves this natively with two new values, \`balance\` and \`pretty\`, alongside the existing default, \`wrap\`.

**How \`text-wrap: wrap\` behaves (the default)**

Without any \`text-wrap\` declaration, browsers use a greedy line-breaking algorithm: text fills each line as full as possible before wrapping to the next, only breaking when a word would overflow the container width. This is fast to compute — the browser makes one pass — but it has no awareness of how the *last* line looks. A three-word overflow onto its own line, or a heading that reads "Design systems make teams move / faster" with an awkward break, is a common visual defect this algorithm produces.

**How \`text-wrap: balance\` works technically**

\`text-wrap: balance\` instructs the browser to compute multiple candidate line-break arrangements and select the one where line lengths are most evenly distributed, rather than the greedy first-fit. This is measurably more expensive to compute — which is exactly why the spec restricts it to blocks of a limited size, roughly four to six lines depending on the implementation, called the "balance limit." Beyond that limit, browsers silently fall back to normal greedy wrapping to avoid the performance cost of balancing large amounts of text. This makes \`balance\` ideal for headings, pull quotes, card titles, and button labels, but explicitly the wrong tool for multi-paragraph body copy.

**How \`text-wrap: pretty\` differs**

\`text-wrap: pretty\` uses a different, cheaper heuristic: rather than balancing every line's length, it specifically looks ahead to avoid orphans — a lone short word stranded on the final line — and other common typographic defects, without the computational cost of fully balancing the whole block. Because it's lighter weight than \`balance\`, \`pretty\` has no meaningful line-count limit and is designed to be used on body paragraphs, article text, and other longer-form content where full balancing would be too expensive or unnecessary.

**Why this matters for 2025/2026 UI work**

Before native \`text-wrap\` values, achieving balanced headlines required either shipping a JavaScript library that measures rendered text and injects \`<br>\` tags (causing layout thrashing and a flash of unbalanced text before the script runs), or manually hand-tuning breakpoints per viewport width — both fragile approaches that break the moment copy changes. \`text-wrap: balance\` and \`pretty\` move this entirely into the rendering engine: zero JavaScript, zero layout shift, and the balance recalculates automatically on every resize, font change, or content update, which is essential for CMS-driven or user-generated headings where you can't predict the exact text length in advance.

**Browser support and the fallback strategy**

\`text-wrap: balance\` shipped in Chrome 114, Safari 17.5, and Firefox 121; \`text-wrap: pretty\` is newer and, as of early 2026, has solid Chrome/Edge support with Safari and Firefox catching up. Because unsupported browsers simply ignore an unrecognized value and fall back to standard \`wrap\` behavior — never throwing an error or breaking layout — these properties are entirely safe to ship today as a progressive enhancement. This demo uses \`CSS.supports('text-wrap', 'balance')\` in JavaScript purely to report support status to the viewer; the CSS itself needs no \`@supports\` guard because the fallback is automatically graceful.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Type your own heading', text: 'Edit the text in the input field at the top. All three sample columns (wrap, balance, pretty) update live via a single input event listener, letting you compare how the same exact string breaks under each algorithm at the current container width.' },
        { title: 'Resize your browser window', text: 'Because text-wrap: balance recalculates the optimal break points on every layout pass, shrinking or widening the window will re-balance the heading in the middle column in real time — try it with a long heading to see the line count and break points shift.' },
        { title: 'Compare orphan words in the first column', text: 'The left "text-wrap: wrap" column uses default greedy wrapping — with certain input lengths you\'ll see a lone short word stranded on its own final line, which is exactly the visual defect balance and pretty are designed to eliminate.' },
        { title: 'Check the pretty column with longer text', text: 'The third column applies text-wrap: pretty to paragraph-style text (the heading repeated twice to simulate body copy). Unlike balance, pretty avoids orphans without fully balancing every line, making it appropriate for longer text where balance\'s line-count limit would otherwise silently disable it.' },
        { title: 'Read the live support banner', text: 'The amber banner beneath the columns runs CSS.supports("text-wrap", "balance") and CSS.supports("text-wrap", "pretty") in JavaScript and reports which values your current browser actually applies, so you understand whether what you\'re seeing is the real effect or the automatic fallback.' },
        { title: 'Apply it to your own headings', text: 'Add text-wrap: balance directly to any h1-h6 selector in your stylesheet — there is no markup change required, no JavaScript, and no wrapper element needed. For body paragraphs use text-wrap: pretty instead, since balance is capped at a small number of lines by design.' },
      ],
    },
    features: [
      'text-wrap: balance computes multiple line-break candidates and selects the most even distribution, capped at roughly 4-6 lines by spec',
      'text-wrap: pretty avoids orphaned last-line words with a cheaper heuristic suited to longer paragraph text',
      'text-wrap: wrap (the default) demonstrated side-by-side to visually contrast greedy first-fit line breaking',
      'CSS.supports("text-wrap", "balance") and CSS.supports("text-wrap", "pretty") used to report real-time browser support',
      'Live input field re-renders all three columns via a single input event listener with no debouncing needed',
      'Graceful automatic fallback: unsupported browsers silently ignore the value and render standard wrap with no errors',
      'Zero layout-shift approach: no JavaScript measures text or injects <br> tags, unlike legacy balance-text libraries',
      'Responsive grid columns using auto-fit and minmax() so the comparison reflows cleanly on narrow viewports',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Marketing hero and landing page headlines', desc: 'Hero headings are the highest-visibility text on a landing page, and a ragged, unevenly wrapped headline undermines an otherwise polished design. Adding text-wrap: balance to your h1 selector fixes this automatically across every viewport size and every A/B tested copy variant, with zero additional CSS or JavaScript per page.' },
      { icon: 'CODE', title: 'CMS and user-generated headline rendering', desc: 'Blog post titles, product names, and article headlines pulled from a CMS or database have unpredictable lengths that a designer never manually reviews. text-wrap: balance guarantees a reasonably even wrap regardless of the exact string length, eliminating an entire category of "this looks weird for this one article" bug reports.' },
      { icon: 'FORM', title: 'Card and grid layouts with variable-length titles', desc: 'Product cards, blog cards, and pricing tier names in a grid often have inconsistent title lengths that create visually uneven card heights. Applying text-wrap: balance to card titles keeps each one\'s internal wrapping tidy even though the cards themselves may still differ in overall height.' },
      { icon: 'LEARN', title: 'Teaching modern CSS text layout without JavaScript', desc: 'This demo is a clear way to show that a problem developers have solved with JavaScript libraries for over a decade now has a one-line native CSS solution. It pairs naturally with other zero-JS layout primitives like `:has()` selectors or container queries as examples of the platform absorbing what used to require a dependency.' },
      { icon: 'APP', title: 'Long-form article and blog body copy', desc: 'Full paragraphs of article text should use text-wrap: pretty rather than balance, since balance is capped at a handful of lines and would silently stop working (falling back to wrap) partway down a long paragraph. pretty specifically targets the orphan-word problem in longer text without that limitation.' },
      { icon: 'DESIGN', title: 'Pull quotes and testimonial callouts', desc: 'Short pull quotes and testimonial highlight text benefit the same way headlines do — text-wrap: balance keeps a 2-3 line quote visually centered and even, which matters more for quotes than body text because they are typically set in larger type and given generous surrounding whitespace.' },
    ],
    faqs: [
      { q: 'What is the difference between text-wrap: balance and text-wrap: pretty?', a: 'balance computes every candidate line-break arrangement and picks the one with the most even line lengths, but the spec caps this to roughly 4-6 lines for performance reasons — beyond that it silently falls back to normal wrap. pretty uses a cheaper heuristic focused specifically on avoiding a lone orphan word on the final line, without fully balancing every line, and has no meaningful line-count limit, making it the correct choice for longer paragraph text.' },
      { q: 'Does text-wrap: balance require any JavaScript or extra markup?', a: 'No. It is a single CSS declaration, text-wrap: balance, applied directly to the text-containing element. There is no wrapper element, no measurement script, and no risk of a flash of unbalanced text before JavaScript runs, unlike legacy solutions such as Shopify\'s balance-text.js library which had to measure rendered text and inject manual line breaks.' },
      { q: 'What happens in browsers that do not support text-wrap: balance?', a: 'Unsupported browsers simply ignore the unrecognized value and fall back to the default text-wrap: wrap greedy algorithm — there is no error, no broken layout, and no invalid CSS warning that affects other rules. This makes it completely safe to ship today as a progressive enhancement with no @supports guard required in the CSS itself.' },
      { q: 'Why is text-wrap: balance limited to a small number of lines?', a: 'Balancing requires evaluating multiple possible line-break combinations to find the most even one, which is computationally more expensive than the single-pass greedy algorithm used by default. To avoid a performance cliff on long text blocks, browser implementations cap balance to roughly 4-6 lines (the exact number is implementation-defined) and automatically revert to normal wrapping beyond that limit.' },
      { q: 'Can I use text-wrap: balance and pretty together on the same page?', a: 'Yes — they are typically used on different elements for different purposes: balance on short headings, titles, and pull quotes (a handful of lines), and pretty on longer paragraph or article body text. Applying balance to a long paragraph is not an error, but its line-count cap means it will effectively behave like normal wrap once the text exceeds a few lines, so pretty is the more appropriate choice for that use case.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet into an AI coding assistant like Claude and ask it to explain exactly why text-wrap: balance is capped at a small number of lines while text-wrap: pretty is not, and what that implies for choosing between them on a real page. You could also ask it to add a fourth comparison column showing text-wrap: stable (useful for editable text where you don't want line breaks to shift while typing), or to explain how CSS.supports() differs from an @supports at-rule and why this demo uses the JavaScript API instead of a CSS media query for its support banner. It's also worth asking the assistant to demonstrate how balance behaves once you feed it six or more lines of text, since that boundary case isn't obvious from a quick read of the CSS alone.`,
      prompt: `Build a live comparison demo of the CSS text-wrap property values wrap, balance, and pretty in plain HTML, CSS, and JavaScript.

Requirements:
- A single text input at the top whose value drives three side-by-side sample blocks simultaneously, updating on every keystroke via an input event listener (no debounce needed).
- Three columns, each labeled with a small code-style badge naming the exact text-wrap value being demonstrated: wrap (the default/greedy baseline), balance, and pretty.
- The balance column should use a heading-sized, bold sample; the pretty column should use a smaller, paragraph-styled sample with the input text repeated so it reads as multi-sentence body copy long enough to show pretty's orphan-avoidance behavior distinctly from balance.
- Each column needs a short caption underneath explaining in one sentence how that specific line-breaking algorithm behaves differently from the others.
- A status banner that uses the CSS.supports('text-wrap', 'balance') and CSS.supports('text-wrap', 'pretty') JavaScript API (not just visual inspection) to detect and report, in plain language, exactly which of the two newer values the visitor's current browser actually supports.
- No JavaScript should ever compute or inject manual line breaks — all line-breaking logic must come from the native CSS text-wrap property so unsupported browsers gracefully fall back to normal wrap with no broken behavior.
- A responsive grid layout so the three columns stack cleanly on narrow viewports.`,
    },
  },
};

export default textWrapBalanceDemo;
