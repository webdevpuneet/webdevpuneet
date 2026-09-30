const scrollStatRevealStory = {
  id: 'scroll-stat-reveal-story',
  title: 'Scroll Stat Reveal Story',
  lastmod: '2026-08-24',
  category: 'scroll',
  cdnUrls: [],
  html: `<section class="srs-intro"><p>Scroll ↓</p><h1>A Year, In Numbers</h1></section>
<section class="srs-beat" data-count="4200000" data-suffix="+" data-prefix="$">
  <div class="srs-num" data-target="4200000">$0</div>
  <p class="srs-copy">raised across two funding rounds, entirely from customers who became believers first and investors second.</p>
</section>
<section class="srs-beat" data-count="98">
  <div class="srs-num" data-target="98" data-suffix="%">0%</div>
  <p class="srs-copy">of support tickets now resolved in under an hour, up from a painful 61% three years ago.</p>
</section>
<section class="srs-beat" data-count="140">
  <div class="srs-num" data-target="140" data-suffix="+">0</div>
  <p class="srs-copy">countries with an active paying team, spanning every inhabited continent but one.</p>
</section>
<section class="srs-beat" data-count="12">
  <div class="srs-num" data-target="12" data-suffix="M">0M</div>
  <p class="srs-copy">API requests handled on an average Tuesday, without a single planned outage this year.</p>
</section>
<section class="srs-outro"><p>Every number here started as a single customer, once.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050608;color:#fff;min-height:100vh}
.srs-intro,.srs-outro{min-height:70vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:24px}
.srs-intro p{color:#6b7280;font-size:13px;letter-spacing:.14em;text-transform:uppercase}
.srs-intro h1{font-size:clamp(28px,6vw,52px);letter-spacing:-.02em}
.srs-outro p{color:#8b90a8;font-size:16px;max-width:460px}
.srs-beat{min-height:90vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:18px;padding:24px;max-width:640px;margin:0 auto}
.srs-num{font-size:clamp(56px,13vw,140px);font-weight:800;letter-spacing:-.03em;line-height:1;background:linear-gradient(135deg,#a78bfa,#22d3ee);-webkit-background-clip:text;background-clip:text;color:transparent;opacity:.25;transform:translateY(24px) scale(.92);transition:opacity .5s ease,transform .5s ease;font-variant-numeric:tabular-nums}
.srs-beat.is-active .srs-num{opacity:1;transform:translateY(0) scale(1)}
.srs-copy{font-size:17px;line-height:1.6;color:#a8adc4;opacity:0;transform:translateY(14px);transition:opacity .6s ease .15s,transform .6s ease .15s}
.srs-beat.is-active .srs-copy{opacity:1;transform:translateY(0)}`,

  js: `// Each .srs-beat carries its own target number, prefix, and suffix directly
// on the DOM (data attributes), so the count-up logic reads real markup
// instead of a duplicated JS data array — edit the HTML and the animation
// follows automatically.
function formatValue(raw, prefix, suffix) {
  var n = Math.round(raw);
  var display = n >= 1000000 ? (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + 'M'
    : n.toLocaleString('en-US');
  return prefix + display + (n >= 1000000 ? '' : suffix);
}

function animateCount(el) {
  var target = Number(el.getAttribute('data-target'));
  var prefix = el.getAttribute('data-prefix') || '';
  var suffix = el.getAttribute('data-suffix') || '';
  var duration = 1400;
  var start = null;

  function step(ts) {
    if (start === null) start = ts;
    var elapsed = ts - start;
    var t = Math.min(elapsed / duration, 1);
    // easeOutCubic — fast start, gentle settle, reads well for large jumps
    var eased = 1 - Math.pow(1 - t, 3);
    el.textContent = formatValue(target * eased, prefix, suffix);
    if (t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

var beats = document.querySelectorAll('.srs-beat');
var counted = new WeakSet();

// A wide middle band (rather than the default "any pixel visible") means a
// beat activates once its number is roughly centered in the viewport —
// where the reader is actually looking — rather than the instant its top
// edge peeks in from the bottom.
var observer = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    var beat = entry.target;
    beat.classList.toggle('is-active', entry.isIntersecting);
    if (entry.isIntersecting && !counted.has(beat)) {
      counted.add(beat);
      animateCount(beat.querySelector('.srs-num'));
    }
  });
}, { rootMargin: '-30% 0px -30% 0px', threshold: 0 });

beats.forEach(function (beat) { observer.observe(beat); });`,

  seo: {
    title: 'Scroll Stat Reveal Story — Free Scroll-Triggered Counter Snippet (No Library)',
    description: `A narrative sequence of big animated stats that count up once each time it scrolls into view, built with plain IntersectionObserver and requestAnimationFrame — no GSAP, no charting library.`,
    about: {
      title: 'Scroll Stat Reveal Story — Big Numbers That Count Up as You Scroll',
      description: `Annual reports, pitch decks, and "by the numbers" pages all lean on the same trick: a big number that counts up the moment it enters view, so a static fact reads as a small, satisfying event. This snippet builds that pattern with nothing but a native \`IntersectionObserver\` and \`requestAnimationFrame\` — no GSAP, no counter library, no dependency at all.

**Data lives in the markup, not a JS array**

Each \`.srs-beat\` section carries its own \`data-target\`, and its number element carries optional \`data-prefix\`/\`data-suffix\` attributes. \`animateCount()\` reads straight off whichever element triggered, so adding a new stat beat is purely an HTML edit — there's no parallel JavaScript array to keep in sync, unlike patterns that store all step data in one big config object.

**A middle-band observer decides when to fire**

Every beat is watched with \`rootMargin: '-30% 0px -30% 0px'\`, shrinking the observer's effective trigger zone to the vertical center 40% of the viewport. A stat only starts counting once it's genuinely centered where a reader's eyes would be, not the instant its top pixel appears at the bottom of the screen — the same middle-band technique scrollytelling libraries like scrollama use for step detection.

**Count-once, not count-every-time**

A \`WeakSet\` tracks which number elements have already animated, so scrolling back up and back down again never restarts the count-up — a real annual-report stat shouldn't visibly reset and recount every time a reader scrolls past it twice. The \`is-active\` class (which drives the fade/rise-in of the number and copy) still toggles freely both directions, so the visual reveal itself remains fully reversible even though the counting animation itself only ever plays once per stat.

**\`requestAnimationFrame\` with manual easing, not \`setInterval\`**

Each count-up runs its own \`requestAnimationFrame\` loop tracking elapsed time against a fixed 1400ms duration, applying an \`easeOutCubic\` curve (\`1 - (1-t)^3\`) so large numbers start fast and settle gently rather than ticking linearly, which reads as sluggish for big jumps like the funding total. Because it's driven by a real timestamp rather than a fixed tick count, the animation runs at a consistent speed regardless of the visitor's refresh rate.

**Honest large-number formatting**

\`formatValue()\` renders values a million or above as a decimal-and-\`M\` short form (matching the \`12M\` API-requests stat) and everything else with locale-aware thousands separators via \`toLocaleString\`, so a number like 4,200,000 counts through readable intermediate values instead of a flickering raw integer.

**Customizing it**

Add beats freely — each just needs a \`data-target\` and optional prefix/suffix; nothing else in the JS needs to change. Pair with a [scroll number odometer](/ui-snippets/scroll-number-odometer/) for a persistent header counter, or a [scrollytelling chart](/ui-snippets/scroll-story-chart/) if the stats should also visualize as a graph.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste the HTML, CSS, and JS', text: `No CDN scripts needed — everything runs on native browser APIs.` },
      { title: 'Scroll into the first stat beat', text: `The number counts up from zero the moment it's centered in view.` },
      { title: 'Keep scrolling', text: `Each subsequent beat counts up independently, once, the first time it centers.` },
      { title: 'Scroll back up', text: `Numbers stay at their final counted value; only the fade/rise reveal reverses.` },
      { title: 'Edit the data attributes', text: `Change data-target, data-prefix, and data-suffix per beat — no JS array to update.` },
      { title: 'Add more beats', text: `Duplicate an .srs-beat section; the IntersectionObserver picks it up automatically.` },
    ] },
    features: [
      { title: 'Zero dependencies', text: `Built entirely on native IntersectionObserver and requestAnimationFrame.` },
      { title: 'Markup-driven data', text: `Each stat's target and formatting live in data attributes, not a JS config array.` },
      { title: 'Middle-band trigger', text: `Stats activate when centered in the viewport, not the instant they peek in.` },
      { title: 'Count-once guarantee', text: `A WeakSet prevents re-triggering the count-up on repeat scroll passes.` },
      { title: 'Eased count-up curve', text: `easeOutCubic timing makes large jumps feel snappy, not linear and slow.` },
      { title: 'Timestamp-driven animation', text: `requestAnimationFrame tracks real elapsed time, consistent across refresh rates.` },
      { title: 'Automatic large-number formatting', text: `Values format with locale thousands separators or an M short form.` },
      { title: 'Fully reversible reveal', text: `The fade/rise-in of each beat still reverses on scroll-up, independent of counting.` },
    ],
    useCases: [
      { title: 'Annual report and impact pages', text: `Turn a list of yearly facts into a paced, one-stat-at-a-time story.` },
      { title: 'Pitch deck landing pages', text: `Lead investors through traction metrics with satisfying count-up beats.` },
      { title: 'Nonprofit and fundraising sites', text: `Reveal donation totals and reach stats as visitors scroll the story.` },
      { title: 'Product "by the numbers" sections', text: `Show usage scale (requests, users, uptime) as a scroll-paced sequence.` },
      { title: 'Marketing case study pages', text: `Count up before/after results at the point the reader's story reaches them.` },
      { title: 'Conference or event recap pages', text: `Reveal attendance and engagement stats one beat per scroll.` },
      { icon: 'CODE', title: 'Related: Sticky Filter Bar', desc: 'See the [Sticky Filter Bar](/ui-snippets/sticky-filter-bar/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: `Why does the number only count up once instead of every time I scroll past it?`, a: `A WeakSet named counted tracks which number elements have already run their count-up animation. The IntersectionObserver callback checks this set before calling animateCount, so a beat that has already finished counting simply skips straight to toggling its is-active class again — the fade and rise-in reveal stays fully reversible, but the actual number never restarts from zero on a repeat pass, which matches how a real statistic should behave.` },
      { q: `Why use a rootMargin of -30% on all sides instead of the observer's default?`, a: `The default IntersectionObserver fires as soon as even one pixel of an element is visible, which for a full-height stat section means it would trigger while the number is still off-screen at the very bottom edge. Shrinking the observation zone with rootMargin: '-30% 0px -30% 0px' collapses it to the vertical middle 40% of the viewport, so a beat only activates once its number is genuinely centered where a reader is looking, matching the middle-band technique used by scrollytelling libraries like scrollama.` },
      { q: `Why is this built without GSAP when other scroll-story snippets in this library use it?`, a: `A single count-up animation on a single property (a text string derived from a number) doesn't need a full animation engine — requestAnimationFrame plus a manual easing formula does the same job with zero extra script weight. Reach for GSAP and ScrollTrigger instead when you need scrubbed, position-locked timelines (tied continuously to scroll position rather than firing once) or coordinated multi-property tweens, like the pinned line-fill in the scroll company timeline snippet.` },
      { q: `How do I change how a number is formatted, like adding a decimal or a different suffix?`, a: `Add or edit the data-prefix and data-suffix attributes on the .srs-num element for that beat — the prefix (like "$") is prepended and the suffix (like "%" or "+") is appended around whatever formatValue() produces. For values under a million, formatValue() uses toLocaleString('en-US') for thousands separators; for a million or more it automatically switches to a decimal-and-M short form and drops the suffix, matching the 12M API-requests stat.` },
      { q: `How do I build this scroll stat reveal in React, Vue, or Angular?`, a: `Create the IntersectionObserver inside a mount effect (useEffect, onMounted, or ngAfterViewInit) after the beat elements have rendered, and keep a ref or component-scoped Set (rather than a module-level WeakSet) to track which stats have already counted, since a fresh WeakSet on every render would let numbers re-animate. Disconnect the observer in the cleanup function to avoid leaks across route changes.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why the count-up logic reads its target value from a data attribute rather than a JavaScript array, and why a WeakSet is needed to make the count-up fire exactly once per stat while still letting the fade-in reveal remain fully reversible. The same assistant can help extend the pattern — ask it to add a small trailing sparkline under each stat showing the multi-year trend, sync a background color shift per beat the way scroll color sections do, or convert the count-up easing from easeOutCubic to a spring-like overshoot for a punchier finish. Treat it as a working, dependency-free base for your own metrics story.`,
      prompt: `Build a "scroll stat reveal story" in plain HTML, CSS, and JavaScript using only the native IntersectionObserver and requestAnimationFrame APIs — no external library, no GSAP, no bundler.

Requirements:
- A sequence of full-height narrative sections, each containing one large number element and a short paragraph of supporting copy, styled with a gradient text-fill on the number.
- Store each section's target numeric value, and optional prefix/suffix strings (for currency symbols, percent signs, or "+"/"M" style suffixes), directly as data attributes on the markup rather than in a separate JavaScript configuration array.
- Write a count-up function that uses requestAnimationFrame with a tracked start timestamp (not setInterval and not a fixed tick count) to animate from zero to the target value over roughly 1.4 seconds, applying an eased curve such as easeOutCubic so the count starts fast and settles smoothly rather than ticking at a constant linear rate.
- Format large values sensibly: numbers below one million should render with locale-aware thousands separators, and numbers at or above one million should render as a decimal value followed by an "M" suffix instead of the full digit string.
- Use a single IntersectionObserver with a rootMargin that shrinks its effective trigger zone to a band across the vertical middle of the viewport (for example -30% top and bottom), so a stat only becomes "active" once it is genuinely centered in the visible area, not the instant any pixel of it appears.
- Ensure each stat's count-up animation only ever plays once, the first time it becomes active, even if the visitor scrolls back up past it and down again — track already-animated elements in a Set or WeakSet — while still allowing the section's fade-and-rise-in visual reveal (a separate CSS class toggle) to remain fully reversible on every scroll direction change.`,
    },
  },
};

export default scrollStatRevealStory;
