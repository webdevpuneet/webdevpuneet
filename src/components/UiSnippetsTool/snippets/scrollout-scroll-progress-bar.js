const scrolloutScrollProgressBar = {
  id: 'scrollout-scroll-progress-bar',
  title: 'ScrollOut Scroll Progress Bar',
  lastmod: '2026-09-17',
  category: 'scroll',
  cdnUrls: ['https://cdn.jsdelivr.net/npm/scroll-out@2.2.12/dist/scroll-out.min.js'],
  html: `<div class="spb-bar-track"><div class="spb-bar-fill" id="spbFill"></div></div>
<div class="spb-badge" id="spbBadge">0%</div>
<div class="spb-page">
  <div class="spb-head">
    <span class="spb-tag">ScrollOut · CSS custom property</span>
    <h2>Scroll progress, no manual math</h2>
    <p>The bar's width is driven entirely by <code>--scroll-percent-y</code>, a CSS variable ScrollOut writes to the document element on every scroll tick.</p>
  </div>
  <article class="spb-copy">
    <h3>Section one</h3>
    <p>ScrollOut's cssProps option decorates the scrolling element with a set of custom properties describing overall scroll position. --scroll-percent-y is one of them: a 0-to-1 float representing how far down the page has been scrolled.</p>
    <h3>Section two</h3>
    <p>The bar itself never runs any JS math for its width. A single CSS rule reads the variable directly: width: calc(var(--scroll-percent-y, 0) * 100%).</p>
    <h3>Section three</h3>
    <p>A small badge in the corner mirrors the same percentage as text, read from the variable in JS only for that one display purpose.</p>
    <h3>Section four</h3>
    <p>Keep scrolling — the bar and badge track continuously, not in discrete steps, because the underlying scroll listener fires on every frame ScrollOut samples.</p>
    <h3>Section five</h3>
    <p>Near the bottom now. The bar should read close to 100% by the time this paragraph is in view.</p>
    <h3>End</h3>
    <p>That's the whole mechanism — one ScrollOut call, one CSS variable, one calc().</p>
  </article>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
:root{--scroll-percent-y:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0d18;color:#fff}

.spb-bar-track{position:fixed;top:0;left:0;right:0;height:4px;background:rgba(255,255,255,.08);z-index:20}
.spb-bar-fill{height:100%;background:linear-gradient(90deg,#38bdf8,#818cf8);width:calc(var(--scroll-percent-y,0) * 100%);transition:width .05s linear}

.spb-badge{position:fixed;top:16px;right:18px;font:800 12.5px system-ui;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);color:#c7d0ff;padding:6px 12px;border-radius:99px;z-index:20;backdrop-filter:blur(6px)}

.spb-page{padding:64px 24px 80px}
.spb-head{max-width:560px;margin:0 auto 48px;text-align:center}
.spb-tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:#38bdf8;background:rgba(56,189,248,.12);border:1px solid rgba(56,189,248,.3);padding:5px 12px;border-radius:99px;margin-bottom:14px}
.spb-head h2{font-size:clamp(24px,4.4vw,34px);font-weight:800;letter-spacing:-.02em}
.spb-head p{font-size:14px;color:#9198b8;margin-top:10px;line-height:1.5}
.spb-head code{background:rgba(255,255,255,.08);padding:2px 6px;border-radius:5px;font-size:12.5px;color:#c7d0ff}

.spb-copy{max-width:560px;margin:0 auto;display:flex;flex-direction:column;gap:26px}
.spb-copy h3{font-size:17px;font-weight:700;margin-bottom:8px;color:#eef0fb}
.spb-copy p{font-size:14px;color:#a3aacb;line-height:1.65}`,

  js: `// ScrollOut's documented cssProps option decorates the scrolling element (the
// document by default) with CSS custom properties describing scroll state --
// this includes --scroll-percent-y, a 0-1 float for overall vertical scroll progress.
// Passing an object selects exactly which variables to enable (they're opt-in), which
// keeps ScrollOut from writing properties this page never uses.
ScrollOut({
  cssProps: {
    scrollPercentY: true
  }
});

// The progress bar itself needs zero JS -- its CSS rule reads --scroll-percent-y
// directly via calc(). The badge is the one piece that still needs a JS read, purely
// to render the value as text, since CSS has no way to print a variable as content.
var badge = document.getElementById('spbBadge');
var root = document.documentElement;

function updateBadge() {
  var raw = getComputedStyle(root).getPropertyValue('--scroll-percent-y').trim();
  var pct = Math.round(parseFloat(raw || '0') * 100);
  badge.textContent = pct + '%';
  requestAnimationFrame(updateBadge);
}
updateBadge();`,

  seo: {
    title: 'ScrollOut Scroll Progress Bar — CSS Custom Property Snippet',
    description: 'A fixed top progress bar whose width is driven entirely by --scroll-percent-y, a real ScrollOut cssProps variable, with zero manual scroll-percentage math. Exports to React, Vue & Tailwind.',
    about: {
      title: 'ScrollOut Scroll Progress Bar — Reading a Real Documented cssProps Variable',
      description: `A scroll progress bar is usually built by listening to \`scroll\`, dividing \`window.scrollY\` by \`document.body.scrollHeight - window.innerHeight\`, and writing the result to a style property on every event. ScrollOut's **\`cssProps\`** option removes that math entirely by computing it internally and exposing the result as a CSS custom property you read with \`calc()\`.

## The real, documented option: \`cssProps\`

\`\`\`js
ScrollOut({
  cssProps: {
    scrollPercentY: true
  }
});
\`\`\`

\`cssProps\` is opt-in: passing \`true\` enables every variable ScrollOut can produce, and passing an object (as here) enables only the ones you name, keyed in camelCase. ScrollOut converts each key to a kebab-case CSS custom property when writing it to the DOM, so \`scrollPercentY: true\` becomes \`--scroll-percent-y\` on the tracked scrolling element — the document root by default, since no \`scrollingElement\` override was passed. It is a real ScrollOut v2 option name, not an invented one; the library's other scroll-position variables follow the same camelCase-to-kebab convention (\`--scroll-percent-x\`, \`--scroll-dir-y\`, and so on for the per-target visibility props like \`--visible-y\`).

## Why the bar itself has no JavaScript

\`\`\`css
.spb-bar-fill{width:calc(var(--scroll-percent-y,0) * 100%)}
\`\`\`

\`--scroll-percent-y\` is already a 0-to-1 float, so multiplying by \`100%\` inside \`calc()\` gives a percentage the \`width\` property can consume directly. Because ScrollOut updates this variable on the *document element* rather than on the bar itself, and CSS custom properties inherit down through the DOM tree, the rule above just works without JS ever touching \`.spb-bar-fill\`'s \`style\` — the browser's own style-recalculation pipeline handles the redraw every time the variable's computed value changes, which is typically cheaper than a scroll-driven JS style write because it skips the extra JS-to-style round trip on every tick.

## Why the badge still needs one JS read

CSS has no way to render a custom property's numeric value as visible text — \`content: var(--scroll-percent-y)\` doesn't work the way you'd hope, because \`content\` treats it as an opaque string, not a computable percentage. So the small corner badge is the one piece of this snippet that reads the variable back out with \`getComputedStyle(root).getPropertyValue('--scroll-percent-y')\`, parses it as a float, and writes formatted text — a narrow, deliberate exception to the "let CSS own it" rule, done in a \`requestAnimationFrame\` loop so the number stays in sync with the bar without a redundant \`scroll\` listener of its own.

## \`:root{ --scroll-percent-y: 0 }\` as a fallback

The variable is defined with a default value at the top of the stylesheet so the \`calc()\` in \`.spb-bar-fill\` has something valid to read before ScrollOut's first scroll sample runs — without it, an unset custom property makes the whole \`calc()\` expression invalid and the bar would render at its browser-default width instead of 0 on first paint.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the ScrollOut CDN script', text: 'One script tag — no companion stylesheet is needed for this snippet.' },
      { title: 'Enable cssProps.scrollPercentY', text: 'Pass ScrollOut({ cssProps: { scrollPercentY: true } }) to opt into just that one variable.' },
      { title: 'Read the variable in CSS with calc()', text: 'width: calc(var(--scroll-percent-y, 0) * 100%) on the bar — no JS style writes.' },
      { title: 'Define a fallback default', text: ':root { --scroll-percent-y: 0 } keeps the calc() valid before the first scroll sample.' },
      { title: 'Optionally mirror the value as text', text: 'getComputedStyle(root).getPropertyValue() is the only way to print the number, since CSS content can\'t render it.' },
      { title: 'Scroll the page', text: 'The bar fills smoothly from 0% to 100% as scroll position moves from top to bottom.' },
    ] },
    features: [
      { title: 'Zero manual scroll math', text: 'No scrollY / scrollHeight arithmetic anywhere in this snippet\'s JS.' },
      { title: 'Real documented cssProps option', text: 'scrollPercentY is an actual ScrollOut v2 variable, converted to --scroll-percent-y in kebab case.' },
      { title: 'CSS-only bar width', text: 'The progress fill reads the variable directly via calc(), with no inline style writes from JS.' },
      { title: 'Opt-in variable selection', text: 'Passing an object to cssProps enables only the named variables instead of the full set.' },
      { title: 'Fallback default value', text: 'A :root default keeps calc() valid before ScrollOut\'s first update.' },
      { title: 'Text mirror via getComputedStyle', text: 'The one legitimate case where JS must read the variable back, since CSS can\'t render it as text.' },
      { title: 'Smooth continuous updates', text: 'The bar tracks scroll position continuously rather than jumping in discrete steps.' },
      { title: 'Inheritable custom property', text: 'The variable is set once on the document root and consumed anywhere via normal CSS inheritance.' },
    ],
    useCases: [
      { title: 'Blog and article pages', text: 'Add a top progress bar to posts without any scroll arithmetic, since ScrollOut supplies `--scroll-percent-y` as a CSS variable.' },
      { title: 'CSS custom property teaching', text: 'Demonstrate JavaScript as a pure data supplier, with CSS reading the variable through `calc()` to set the bar width.' },
      { title: 'Docs reading progress', text: 'Pair with a table of contents to show reading position, enabling only the named variable through `cssProps` as an object.' },
      { title: 'Long landing pages', text: 'Give a subtle progress cue on a page with a lot of scroll, with no manual `scrollY` or `scrollHeight` maths anywhere in the code.' },
    ],
    faqs: [
      { q: 'Is --scroll-percent-y a real ScrollOut option?', a: 'Yes. It comes from ScrollOut\'s cssProps option, which decorates the tracked scrolling element with CSS custom properties describing scroll state. The JS key is camelCase (scrollPercentY) and ScrollOut writes it to the DOM as kebab-case (--scroll-percent-y), following the same conversion used for its other variables.' },
      { q: 'Why pass an object to cssProps instead of true?', a: 'Passing true enables every CSS variable ScrollOut can produce, including several this page doesn\'t use. Passing { scrollPercentY: true } opts into only that one, which keeps unnecessary custom properties off the document element.' },
      { q: 'Why does the bar\'s width need no JavaScript at all?', a: 'ScrollOut writes --scroll-percent-y on the document root on every scroll sample, and CSS custom properties inherit down the DOM tree. The bar\'s CSS rule, width: calc(var(--scroll-percent-y, 0) * 100%), reads that inherited value directly, so the browser\'s style engine handles the redraw without any JS style write.' },
      { q: 'Why does the badge still use JavaScript if the bar doesn\'t?', a: 'CSS has no way to render a custom property\'s value as visible text — content: var(...) treats it as an opaque token, not a computed percentage. Reading it back with getComputedStyle() and writing formatted text is the only way to display the number, so the badge is a deliberate, narrow exception.' },
      { q: 'What does the :root { --scroll-percent-y: 0 } rule do?', a: 'It gives the variable a valid default before ScrollOut writes its first real value. Without a default, an unset custom property makes the calc() expression that depends on it invalid, and the bar would fall back to its default CSS width instead of starting at 0%.' },
      { q: 'Does this work if the page scrolls inside a container instead of the window?', a: 'Yes, with one change — pass scrollingElement pointing at that container to ScrollOut\'s config, since --scroll-percent-y is written to whichever element ScrollOut is told is the scrolling element, which defaults to the document.' },
    ],
    aiPrompt: {
      paragraph: `This snippet is worth using to have an AI verify a specific, checkable claim: that --scroll-percent-y is a real ScrollOut cssProps variable and not an invented option name. Paste it into an assistant like Claude and ask it to explain exactly how the cssProps option's camelCase keys become kebab-case CSS custom properties, and why passing an object instead of true is the more deliberate choice. Then ask why the progress bar's width needs no JavaScript at all while the percentage badge does — the answer should turn on CSS inheritance versus CSS's inability to render a variable as text content. To extend it: ask for a version that also exposes --scroll-dir-y to fade the bar's color between two hues depending on scroll direction, a version scoped to a scrollable container instead of the whole page via the scrollingElement option, or a version that pairs this page-wide bar with the per-section threshold tracking from the ScrollOut Progress Nav Dots snippet in the same library.`,
      prompt: `Build a fixed scroll progress bar using ScrollOut (v2, from a CDN) in plain HTML, CSS, and JavaScript.

Requirements:
- A thin bar fixed to the very top of the viewport whose fill width represents how far the user has scrolled down the page, plus a small floating badge in a corner showing the same value as a "NN%" text label.
- Initialize with ScrollOut({ cssProps: { scrollPercentY: true } }) — use this exact, real, documented ScrollOut v2 option (cssProps, opt-in per-variable via an object of camelCase keys). Do not invent an option name; scrollPercentY is the real one that becomes the --scroll-percent-y CSS custom property on the document root.
- The bar's fill width must be driven ENTIRELY by CSS: width: calc(var(--scroll-percent-y, 0) * 100%), with zero JavaScript setting any style property on the bar element. Define a :root { --scroll-percent-y: 0 } fallback so the calc() is valid before ScrollOut's first update.
- The only JavaScript beyond the ScrollOut() call should be for the percentage badge: read the current value with getComputedStyle(document.documentElement).getPropertyValue('--scroll-percent-y'), parse it, and write it as rounded percentage text in a requestAnimationFrame loop — explain in a comment that this JS read is required only because CSS cannot render a custom property's value as visible text.
- Build a long single page (at least 5-6 sections of body copy) so there's enough scroll distance to demonstrate the bar filling from 0% to 100%.
- Style it as a clean dark-themed page with a gradient-colored bar fill.`,
    },
  },
};

export default scrolloutScrollProgressBar;
