const numberTicker = {
  id: 'number-ticker',
  title: 'Number Ticker',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="nt-stats" id="ntStats">
  <div class="nt-stat"><div class="nt-num" data-to="48295" data-prefix="$"></div><div class="nt-label">Revenue this month</div></div>
  <div class="nt-stat"><div class="nt-num" data-to="1240000" data-suffix="+"></div><div class="nt-label">API requests / day</div></div>
  <div class="nt-stat"><div class="nt-num" data-to="99.98" data-decimals="2" data-suffix="%"></div><div class="nt-label">Uptime</div></div>
  <button type="button" class="nt-replay" id="ntReplay">↻ Replay</button>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#08080f;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.nt-stats{display:flex;flex-wrap:wrap;gap:18px;align-items:flex-start;max-width:760px}
.nt-stat{flex:1;min-width:170px;background:#12121f;border:1px solid #232338;border-radius:16px;padding:22px}
.nt-num{font-size:clamp(30px,5vw,46px);font-weight:900;letter-spacing:-.02em;font-variant-numeric:tabular-nums;background:linear-gradient(120deg,#fff,#a5b4fc);-webkit-background-clip:text;background-clip:text;color:transparent;line-height:1.05}
.nt-label{font-size:13px;color:#8b8ba3;margin-top:8px}

.nt-replay{flex-basis:100%;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#cfcfe0;font-family:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:999px;cursor:pointer;width:fit-content}`,

  js: `var nums = Array.prototype.slice.call(document.querySelectorAll('.nt-num'));

function format(v, decimals) {
  var s = decimals ? v.toFixed(decimals) : Math.round(v).toString();
  // Add thousands separators to the integer part only.
  var parts = s.split('.');
  parts[0] = parts[0].replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',');
  return parts.join('.');
}

function animate(el) {
  var to = parseFloat(el.dataset.to);
  var decimals = parseInt(el.dataset.decimals || '0', 10);
  var prefix = el.dataset.prefix || '', suffix = el.dataset.suffix || '';
  var dur = 1900, start = null;

  function frame(t) {
    if (start === null) start = t;
    var p = Math.min((t - start) / dur, 1);
    // easeOutExpo: fast then settling, the satisfying "spin-down" of an odometer.
    var eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
    el.textContent = prefix + format(to * eased, decimals) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function runAll() { nums.forEach(animate); }

// Count up when the stats scroll into view (once), and on replay.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { runAll(); io.disconnect(); } });
}, { threshold: 0.3 });
io.observe(document.getElementById('ntStats'));

document.getElementById('ntReplay').addEventListener('click', runAll);`,

  seo: {
    title: 'Number Ticker — Free HTML CSS JS Animated Counter Snippet',
    description: `Stat numbers that count up with an ease-out spin-down, thousands separators, decimals, and prefix/suffix, triggered on scroll. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Number Ticker — Stats That Count Up With an Odometer Ease',
      description: `The number ticker is the animated stat counter that rolls a value up from zero to its target with a satisfying spin-down — the figures you see in "trusted by" and metrics sections. This snippet builds it with plain HTML, CSS, and vanilla JavaScript, with proper formatting (thousands separators, decimals, prefixes and suffixes) and a scroll trigger.

**Data-driven targets**

Each number declares its target and formatting through data attributes: \`data-to\` for the value, optional \`data-decimals\`, \`data-prefix\` (like \`$\`), and \`data-suffix\` (like \`%\` or \`+\`). The script reads these, so the same animation handles money, percentages, and large counts without per-stat code. This keeps the markup declarative — you describe the number, the script animates it.

**The ease-out spin-down**

The animation runs on \`requestAnimationFrame\` with delta timing against a fixed duration. The progress is passed through an \`easeOutExpo\` curve (\`1 - 2^(-10p)\`), which starts fast and decelerates sharply as it approaches the target — exactly the feel of an odometer or counter spinning down and settling. A linear count-up looks mechanical; this easing is what gives the ticker its momentum and a clean stop. The displayed value each frame is \`target * eased\`, formatted and written to the element.

**Correct number formatting**

Raw counting produces ugly intermediate values, so a \`format()\` helper rounds (or fixes decimals) and inserts thousands separators into the integer part with a regex, leaving any decimal part alone. So \`1240000\` animates through \`1,240,000\` rather than a bare digit string, and \`99.98\` keeps its two decimals throughout. The numbers also use \`font-variant-numeric: tabular-nums\` so every digit has the same width — without it, the figure would jitter horizontally as digits change, which looks broken on a counting number.

**Scroll-triggered**

Counting before the stats are visible wastes the effect, so an \`IntersectionObserver\` starts all tickers when the section is 30% in view, then disconnects so it fires once. This is the standard, performant trigger for on-scroll animations — no scroll listener, no per-frame visibility checks. A replay button re-runs them for demos.

**Why rAF over a CSS counter**

CSS has no real way to animate a formatted number with separators and easing, so JavaScript drives it — but only with lightweight per-frame text updates, not layout changes. The gradient text fill and the tabular figures are CSS; the script only writes the formatted string each frame, which is cheap even for several stats at once.

**Customizing it**

Change the duration for a faster or slower roll, swap the easing (e.g. a gentler \`easeOutQuart\`), adjust formatting (currency symbols, locale separators via \`toLocaleString\`), or restyle the stat cards. Add as many stats as you like — each is independent. Pair it with a [metric card grid](/ui-snippets/metric-card-grid/) or a [logo marquee](/ui-snippets/logo-marquee/) for a complete trust section.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A row of stat cards renders with target values.` },
      { title: 'Scroll them into view', text: `Each number counts up with an ease-out spin-down.` },
      { title: 'Note the formatting', text: `Thousands separators, decimals, and $ / % / + show correctly.` },
      { title: 'Click Replay', text: `The tickers re-run from zero.` },
      { title: 'Add a stat', text: `Copy a card and set its data-to and formatting.` },
      { title: 'Tune the roll', text: `Change the duration and easing.` },
    ] },
    features: [
      { title: 'Data-attribute targets', text: `to, decimals, prefix, and suffix per stat.` },
      { title: 'Odometer easing', text: `easeOutExpo spins down and settles.` },
      { title: 'Thousands separators', text: `Formatted on the integer part each frame.` },
      { title: 'Decimal support', text: `Fixed places preserved throughout.` },
      { title: 'Tabular figures', text: `Equal-width digits prevent jitter.` },
      { title: 'Scroll-triggered', text: `IntersectionObserver fires once in view.` },
      { title: 'Replayable', text: `Re-run all tickers on demand.` },
      { title: 'Independent stats', text: `Each animates on its own.` },
    ],
    useCases: [
      { title: 'Stat sections', text: `Pair with a [metric card grid](/ui-snippets/metric-card-grid/).` },
      { title: 'Trust and traction', text: `Follow a [logo marquee](/ui-snippets/logo-marquee/) of customers.` },
      { title: 'Dashboards', text: `Animate KPIs on a [status dashboard](/ui-snippets/status-dashboard/).` },
      { title: 'Landing metrics', text: `Headline numbers above a [testimonial wall](/ui-snippets/testimonial-wall/).` },
      { title: 'Pricing pages', text: `Show savings beside a [pricing card](/ui-snippets/pricing-card/).` },
      { title: 'Counter demos', text: `A reference for eased, formatted count-ups.` },
    ],
    faqs: [
      { q: 'What gives the ticker its spin-down feel?', a: `The progress is passed through an easeOutExpo curve, 1 minus 2 to the power of -10p, which starts fast and decelerates sharply as it nears the target — the feel of an odometer settling. The displayed value each frame is target times the eased progress. A linear count-up looks mechanical; this easing gives the momentum and clean stop.` },
      { q: 'How are the numbers formatted while counting?', a: `A format helper rounds or fixes decimals, then inserts thousands separators into the integer part with a regex, leaving any decimal part alone. So a value animates through 1,240,000 rather than a bare digit string, and a percentage keeps its decimals. Prefixes and suffixes from data attributes are added around the formatted number.` },
      { q: 'Why do the digits not jitter horizontally?', a: `The numbers use font-variant-numeric: tabular-nums, which gives every digit the same width. Without it, proportional digits change width as they count, so the figure would shift left and right each frame, which looks broken. Tabular figures keep the number visually stable while it rolls.` },
      { q: 'When does the count start?', a: `An IntersectionObserver starts all tickers when the section is 30% in view, then disconnects so they animate once. This avoids counting before the stats are visible, needs no scroll listener or per-frame visibility checks, and is the standard performant trigger for on-scroll animations. A replay button re-runs them.` },
      { q: 'How do I use this number ticker in React, Vue, or Angular?', a: `Make a Ticker component that takes the target and formatting as props and runs the rAF loop in a mount effect (triggered by an IntersectionObserver), writing the formatted value to a ref'd element rather than state to avoid re-rendering every frame. Cancel the frame on unmount. The gradient and tabular CSS port directly; in Tailwind use tabular-nums and bg-clip-text.` },
    ],
    aiPrompt: {
      paragraph: `Instead of working out the easing math by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly what the easeOutExpo formula (one minus two to the power of negative ten times progress) is doing to the animation curve, and why the format() function's thousands-separator regex is applied only to the integer part of the split string rather than the whole formatted value. The same assistant can help optimize it, for instance asking whether writing textContent every single animation frame across several stat cards simultaneously could be batched or whether it's already cheap enough, or whether the IntersectionObserver's 0.3 threshold is the right trigger point for this specific card layout. It's also useful for extending the ticker: ask it to support locale-aware number formatting with toLocaleString instead of the manual regex, add a subtle color flash when each ticker finishes settling, or drive the target values from a live API response instead of static data attributes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "count-up number ticker" for stat cards in plain HTML, CSS, and JavaScript using requestAnimationFrame — no counting library.

Requirements:
- Each stat number element declares its animation entirely through data attributes: a target numeric value, an optional number of decimal places, an optional prefix string (like a currency symbol), and an optional suffix string (like a percent sign or plus sign) — one shared script must read these and animate any number of such elements without per-stat custom code.
- The count-up animation must run via requestAnimationFrame with real elapsed-time-based progress (not a fixed frame-count loop), and the displayed value each frame must be the target multiplied by an eased progress value using an ease-out-exponential curve so the count starts fast and decelerates sharply into its final resting value, rather than moving at a constant linear rate.
- Write a formatting helper that rounds (or fixes to the specified decimal count) the eased value each frame and inserts thousands separators into only the integer portion of the number, leaving any decimal portion unformatted by the separator logic, then wraps the result with the prefix and suffix strings.
- Use a numeric font feature (equal-width digits) on the ticker elements so the number doesn't visually jitter horizontally as digits change width during the count.
- Trigger all the tickers to start counting from zero exactly once, only when their containing section scrolls into view (roughly 30% visible), using an IntersectionObserver rather than a scroll event listener, and disconnect the observer after it fires.
- Add a manual "Replay" button that re-runs every ticker's count-up animation from zero on demand, independent of the scroll trigger.`,
    },
  },
};

export default numberTicker;
