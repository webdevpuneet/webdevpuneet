const scrollRevealCounterStats = {
  id: 'scroll-reveal-counter-stats',
  title: 'Count-Up Stats on Scroll (IntersectionObserver)',
  category: 'scroll',
  html: `<div class="rcs-page">
  <p class="rcs-hint">Scroll the numbers into view. Each one counts up from zero exactly once, driven by a single shared IntersectionObserver — requestAnimationFrame handles the counting itself.</p>
  <div class="rcs-grid">
    <div class="rcs-card"><span class="rcs-num" data-target="128400" data-prefix="" data-suffix="+">0</span><span class="rcs-label">Active teams</span></div>
    <div class="rcs-card"><span class="rcs-num" data-target="99.98" data-decimals="2" data-prefix="" data-suffix="%">0</span><span class="rcs-label">Uptime last year</span></div>
    <div class="rcs-card"><span class="rcs-num" data-target="42" data-prefix="" data-suffix="ms">0</span><span class="rcs-label">Median response</span></div>
    <div class="rcs-card"><span class="rcs-num" data-target="7200000" data-prefix="$" data-suffix="">0</span><span class="rcs-label">Processed monthly</span></div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; }

.rcs-page { max-width: 760px; margin: 0 auto; padding: 20vh 24px 40vh; }
.rcs-hint { text-align: center; color: #94a3b8; font-size: 14px; max-width: 460px; margin: 0 auto 40px; line-height: 1.7; }

.rcs-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.rcs-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 28px 24px;
  display: flex; flex-direction: column; gap: 6px; box-shadow: 0 2px 12px rgba(0,0,0,0.04);
}
.rcs-num { font-size: 34px; font-weight: 800; color: #1e293b; letter-spacing: -0.02em; font-variant-numeric: tabular-nums; }
.rcs-label { font-size: 13px; color: #64748b; font-weight: 600; }

@media (max-width: 520px) { .rcs-grid { grid-template-columns: 1fr; } }

@media (prefers-reduced-motion: reduce) {
  .rcs-num { transition: none; }
}`,
  js: `function formatValue(value, decimals, prefix, suffix) {
  const rounded = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
  return prefix + rounded + suffix;
}

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = formatValue(target * eased, decimals, prefix, suffix);
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    if (reduceMotion) {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      el.textContent = formatValue(target, decimals, el.dataset.prefix || '', el.dataset.suffix || '');
    } else {
      animateCount(el);
    }
    observer.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.rcs-num').forEach((el) => observer.observe(el));`,
  seo: {
    title: 'Count-Up Stats on Scroll — IntersectionObserver + rAF',
    description: 'Stat cards whose numbers count up from zero once when scrolled into view, using a single shared IntersectionObserver and a requestAnimationFrame counter — requires JavaScript. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Count-Up Stats on Scroll — IntersectionObserver-Triggered requestAnimationFrame Counter',
      description: `A grid of stat cards that count up from zero the moment they scroll into view is one of the most common trust-building devices on marketing and pricing pages — seeing "128,400+" animate into place reads as more credible than the same number sitting static on the page. This effect genuinely needs JavaScript: CSS counters cannot ease a numeric count-up with a duration and an easing curve on their own, so this snippet pairs a single shared \`IntersectionObserver\` with a hand-rolled \`requestAnimationFrame\` loop per counter.

**One observer, many targets**

A single \`IntersectionObserver\` instance watches every \`.rcs-num\` element via one \`querySelectorAll\` loop, exactly the pattern used in [Reveal on Scroll](/ui-snippets/reveal-on-scroll/) — this scales far better than creating a new observer per stat, since the browser only has to maintain one set of intersection-tracking bookkeeping regardless of how many stat cards are on the page.

**Reading configuration from data attributes**

Each \`.rcs-num\` element carries its target value and formatting rules as \`data-*\` attributes — \`data-target\`, \`data-decimals\`, \`data-prefix\`, and \`data-suffix\` — rather than being hardcoded per counter in the JavaScript. This lets the exact same \`animateCount\` function correctly animate a plain integer ("128,400+"), a two-decimal percentage ("99.98%"), a millisecond figure ("42ms"), and a dollar amount ("$7,200,000") without any per-stat conditional logic.

**Easing the count, not just linearly interpolating**

\`animateCount\` computes \`progress\` from \`0\` to \`1\` across a fixed \`1400ms\` duration, then applies a cubic ease-out — \`1 - Math.pow(1 - progress, 3)\` — before multiplying by the target value. A raw linear count looks mechanical and finishes abruptly; the ease-out curve makes the count decelerate as it approaches its final value, which reads as more natural and gives the eye time to register the number settling.

**obs.unobserve prevents repeat counting**

Exactly as in a standard reveal-on-scroll pattern, \`observer.unobserve(el)\` is called immediately once a counter starts, ensuring each number counts up exactly once per page load — scrolling a stat card out of view and back in does not restart the animation, which would feel gimmicky on a second pass.

**Respecting prefers-reduced-motion**

Before deciding whether to animate, the script checks \`window.matchMedia('(prefers-reduced-motion: reduce)').matches\` once and, if true, sets every counter directly to its final formatted value with no \`requestAnimationFrame\` loop at all — users who have requested reduced motion see the correct number immediately rather than a suppressed but still-technically-running animation.

**Why this needs JavaScript, unlike some other snippets in this series**

Several of the newest snippets alongside this one lean entirely on native CSS \`animation-timeline: scroll()\` / \`view()\` for effects that only need to map scroll position to a CSS property. A numeric count-up is different: it needs to format numbers with commas, decimals, currency prefixes, and letter suffixes, none of which a CSS \`counter()\` or \`animation-timeline\` can express — so \`IntersectionObserver\` plus \`requestAnimationFrame\` remains the correct, and currently the only, tool for this specific effect.

**Customizing it**

Change \`duration\` for a faster or slower count, swap the ease-out cubic for a different easing function, or add a \`data-format="currency"\` attribute variant that routes through \`Intl.NumberFormat\` for locale-correct currency and grouping. Pair it with a [Metric Card Grid](/ui-snippets/metric-card-grid/) or [Hero Stats Counter Row](/ui-snippets/hero-stats-counter-row/) layout.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Scroll the cards into view', text: `Each number counts up from zero once, then stays at its final value.` },
      { title: 'Add a new stat card', text: `Copy a .rcs-card block and set data-target, data-decimals, data-prefix, and data-suffix on the .rcs-num span.` },
      { title: 'Change the count duration', text: `In the JS panel, edit const duration = 1400 (milliseconds) inside animateCount.` },
      { title: 'Adjust the trigger point', text: `Edit { threshold: 0.4 } to control how much of the number must be visible before it starts counting.` },
      { title: 'Format currency correctly', text: `Swap toLocaleString('en-US') for an Intl.NumberFormat call if you need locale-aware currency grouping.` },
      { title: 'Export in your format', text: `Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.` },
    ] },
    features: [
      'Single shared IntersectionObserver watches every stat via one querySelectorAll loop',
      'requestAnimationFrame-driven count with a cubic ease-out curve, not a linear count',
      'Per-counter configuration via data-target, data-decimals, data-prefix, data-suffix attributes',
      'One reusable animateCount function handles integers, decimals, currency, and unit suffixes',
      'obs.unobserve ensures each stat counts up exactly once, never repeats',
      'prefers-reduced-motion check sets the final value instantly with no animation loop',
      'tabular-nums font-variant keeps digit widths stable while counting',
      'Requires JavaScript — honestly not achievable with animation-timeline alone',
    ],
    useCases: [
      { icon: 'APP', title: 'Marketing and pricing page trust stats', desc: 'Pair with a [Metric Card Grid](/ui-snippets/metric-card-grid/) or [Hero Stats Counter Row](/ui-snippets/hero-stats-counter-row/) for animated social proof.' },
      { icon: 'DESIGN', title: 'Annual report and investor pages', desc: 'Animate key figures as the reader scrolls through a results summary.' },
      { icon: 'LEARN', title: 'Learn shared-observer + rAF counting', desc: 'A clean reference for pairing one IntersectionObserver with a per-element requestAnimationFrame loop.' },
      { icon: 'FLOW', title: 'Product dashboard landing sections', desc: 'Introduce usage or performance statistics with a moment of animated emphasis.' },
      { icon: 'CODE', title: 'Replace a jQuery countUp.js plugin', desc: 'Replaces countUp.js or similar count-up libraries with a small dependency-free implementation.' },
      { icon: 'CODE', title: 'Related: Reveal on Scroll', desc: 'See the [Reveal on Scroll](/ui-snippets/reveal-on-scroll/) baseline for the shared single-observer IntersectionObserver pattern this snippet builds on.' },
    ],
    faqs: [
      { q: 'Why does this need JavaScript instead of a native CSS scroll-timeline?', a: `Native CSS animation-timeline can drive numeric CSS counters, but only as clean whole-number steps via counter-increment — it cannot format numbers with thousands separators, decimal places, currency prefixes, or unit suffixes, and it cannot ease a value smoothly from 0 to an arbitrary float like 99.98. Formatting and easing a real numeric count-up currently requires JavaScript.` },
      { q: 'Why use one shared IntersectionObserver instead of one per stat?', a: `A single observer instance watching every .rcs-num element via one querySelectorAll loop is significantly cheaper for the browser to maintain than creating a new observer per element, especially on pages with many stat cards — the intersection-tracking bookkeeping scales with observers, not just observed elements.` },
      { q: 'How does the count-up get its easing curve?', a: `animateCount computes a linear progress value from 0 to 1 across a fixed duration using performance.now(), then applies 1 - Math.pow(1 - progress, 3) — a cubic ease-out — before multiplying by the target value. This makes the number decelerate as it approaches its final value instead of stopping abruptly.` },
      { q: 'Does the counter restart if I scroll it out of view and back in?', a: `No. observer.unobserve(el) is called the moment a counter starts animating, so each stat counts up exactly once per page load. Scrolling it out of view and back in leaves it at its final settled value.` },
      { q: 'How do I add a currency stat with commas?', a: `Set data-prefix="$" and leave data-decimals unset (or 0) on the .rcs-num span — the formatValue function calls toLocaleString('en-US') for whole numbers, which inserts thousands separators automatically. For decimal currency, set data-decimals to 2 and adjust formatValue to combine both toFixed and locale grouping if needed.` },
      { q: 'What happens for users with prefers-reduced-motion enabled?', a: `The script checks window.matchMedia("(prefers-reduced-motion: reduce)").matches once before starting. If true, it sets each counter directly to its fully formatted final value with no requestAnimationFrame loop at all, rather than running a suppressed animation in the background.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the easing math or the observer wiring by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why animateCount applies 1 - Math.pow(1 - progress, 3) instead of a plain linear progress value, and why a single shared IntersectionObserver scales better than one observer per stat card. The same assistant can help you extend it — ask it to add an Intl.NumberFormat-based currency formatter for locale-correct grouping and currency symbols, support counting down instead of up for stats like "spots remaining," or add a subtle scale-pulse on the final settled frame for extra emphasis. It's also worth asking whether a CSS-only animation-timeline approach could handle the easing curve while your JavaScript stays responsible only for the number formatting. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a grid of stat cards whose numbers count up from zero to a target value exactly once, the moment each card scrolls into view, using the IntersectionObserver API and requestAnimationFrame — no animation library, no scroll event listeners.

Requirements:
- A grid of stat cards, each containing a number element and a label. The number element must read its target value and formatting rules from data attributes: a numeric target, an optional decimal-places count, an optional prefix string (for currency symbols), and an optional suffix string (for units or a plus sign).
- Create exactly one IntersectionObserver instance (not one per element), observing every counter element via a single querySelectorAll loop, with a threshold around 0.4.
- When a counter's entry becomes intersecting, start a requestAnimationFrame loop that computes progress from 0 to 1 over a fixed duration (roughly 1200 to 1500 milliseconds) using performance.now(), applies a cubic ease-out easing function to that progress, multiplies it by the target value, and writes the formatted result into the element's text content on every frame until progress reaches 1.
- Format the number according to its decimal-places attribute (toFixed for decimals, or a thousands-separated integer otherwise) and wrap it with its prefix and suffix strings.
- Call unobserve on the specific element immediately once its count-up starts, so each stat only ever animates once per page load, even if scrolled out of view and back in.
- Check prefers-reduced-motion via window.matchMedia once before animating; if the user has requested reduced motion, set the counter directly to its final formatted value with no requestAnimationFrame loop at all.`,
    },
  },
};

export default scrollRevealCounterStats;
