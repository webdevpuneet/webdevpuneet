const heroStatsCounterRow = {
  id: 'hero-stats-counter-row',
  title: 'Hero with Animated Stat Counters',
  lastmod: '2026-08-23',
  category: 'heroes',
  cdnUrls: [],
  html: `<section class="stc-hero">
  <span class="stc-eyebrow">Numbers that speak for themselves</span>
  <h1 class="stc-h1">Built for scale,<br>trusted at scale</h1>
  <p class="stc-sub">Thousands of teams run their infrastructure on our platform every single day.</p>
  <a href="#" class="stc-cta">See it in action</a>

  <div class="stc-stats" id="stcStats">
    <div class="stc-stat">
      <span class="stc-num" data-target="52000" data-suffix="+" id="stcStat1">0</span>
      <span class="stc-label">Active users</span>
    </div>
    <div class="stc-stat">
      <span class="stc-num" data-target="99.9" data-decimals="1" data-suffix="%" id="stcStat2">0</span>
      <span class="stc-label">Uptime SLA</span>
    </div>
    <div class="stc-stat">
      <span class="stc-num" data-target="180" data-suffix="+" id="stcStat3">0</span>
      <span class="stc-label">Countries served</span>
    </div>
    <div class="stc-stat">
      <span class="stc-num" data-target="4.9" data-decimals="1" data-suffix="/5" id="stcStat4">0</span>
      <span class="stc-label">Average rating</span>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0d16;color:#f1f5f9}
.stc-hero{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:18px;padding:24px}
.stc-eyebrow{font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:#60a5fa}
.stc-h1{font-size:clamp(32px,5.6vw,58px);font-weight:800;line-height:1.1;letter-spacing:-.02em}
.stc-sub{font-size:15.5px;color:#94a3b8;line-height:1.7;max-width:480px}
.stc-cta{margin-top:4px;background:#3b82f6;color:#fff;font-weight:700;font-size:15px;padding:12px 28px;border-radius:9px;text-decoration:none;box-shadow:0 6px 22px rgba(59,130,246,.32);transition:transform .15s}
.stc-cta:hover{transform:translateY(-2px)}

.stc-stats{display:flex;gap:clamp(24px,5vw,64px);flex-wrap:wrap;justify-content:center;margin-top:36px;padding-top:36px;border-top:1px solid rgba(255,255,255,.08);width:100%;max-width:820px}
.stc-stat{display:flex;flex-direction:column;align-items:center;gap:6px;min-width:110px}
.stc-num{font-size:clamp(30px,4.6vw,44px);font-weight:800;font-variant-numeric:tabular-nums;background:linear-gradient(135deg,#60a5fa,#818cf8);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
.stc-label{font-size:12.5px;color:#64748b;text-transform:uppercase;letter-spacing:.06em}`,

  js: `// Real count-up animation driven by requestAnimationFrame with easing, triggered when the stats scroll into view.
const statEls = document.querySelectorAll('.stc-num');
const statsRow = document.getElementById('stcStats');

function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}

function animateCount(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = parseInt(el.dataset.decimals || '0', 10);
  const suffix = el.dataset.suffix || '';
  const duration = 1600; // ms
  let startTime = null;

  function frame(now) {
    if (startTime === null) startTime = now;
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = target * eased;

    el.textContent = current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      el.textContent = target.toFixed(decimals) + suffix;
    }
  }

  requestAnimationFrame(frame);
}

let hasAnimated = false;

function triggerIfNeeded() {
  if (hasAnimated) return;
  hasAnimated = true;
  statEls.forEach(animateCount);
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        triggerIfNeeded();
        observer.disconnect();
      }
    });
  }, { threshold: 0.4 });
  observer.observe(statsRow);
} else {
  // Fallback for environments without IntersectionObserver.
  triggerIfNeeded();
}`,

  seo: {
    title: 'Hero with Animated Stat Counters — Free HTML CSS JS Snippet',
    description: `A hero with headline, CTA, and a row of stats that count up from zero with real requestAnimationFrame easing, triggered by IntersectionObserver. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Hero with Animated Stat Counters — requestAnimationFrame Count-Up with Easing',
      description: `A row of stats that count up from zero is one of the fastest ways to communicate scale in a hero — but only if the animation is smooth and only fires once, at the right moment. This snippet drives each number with a real \`requestAnimationFrame\` loop and easing function, gated by an \`IntersectionObserver\` so the count-up starts exactly when the stats scroll into view.

**Why requestAnimationFrame instead of setInterval**

Each stat's \`animateCount()\` uses \`requestAnimationFrame\` recursively rather than a fixed-interval \`setInterval\`. \`requestAnimationFrame\` is synced to the browser's actual repaint cycle, so the animation naturally runs at the display's refresh rate (commonly 60fps or higher) without over- or under-shooting frames, and automatically pauses when the tab isn't visible — no manual visibility handling required.

**Real easing, not a linear ramp**

\`easeOutExpo()\` computes \`1 - 2^(-10t)\` for progress \`t\` in \`[0,1]\` — a curve that starts fast and decelerates sharply into the final value, which reads as far more natural than a linear count where the number ticks up at a constant rate. Every frame recomputes \`current = target * eased\` from the *elapsed time*, not from incrementing the previous frame's value, so the animation duration stays exactly 1600ms regardless of frame rate or dropped frames.

**Data-driven targets, no per-stat script**

Each \`.stc-num\` element carries its own \`data-target\`, optional \`data-decimals\`, and optional \`data-suffix\` attributes ("52000+", "99.9%", "4.9/5") — one shared \`animateCount()\` function reads these to animate every stat with its correct precision and formatting, so adding a fifth stat means adding a fifth \`<span>\` with its own \`data-*\` values, not writing new JavaScript.

**Fires once, at the right time**

An \`IntersectionObserver\` watches the stats row and calls \`triggerIfNeeded()\` the first time it's 40% visible, then immediately disconnects — so the count-up plays once, when a visitor can actually see it, rather than firing on page load (before it's scrolled into view) or replaying every time it re-enters the viewport. A \`hasAnimated\` flag provides a second guard against double-triggering.

**Tabular numbers for a stable layout**

\`font-variant-numeric: tabular-nums\` keeps each digit's width fixed, so the stat labels beside and below the number don't jitter horizontally as the digits change 60 times a second during the animation.

**Customizing it**

Add more stats by copying a \`.stc-stat\` block with new \`data-*\` values, adjust \`duration\` or swap \`easeOutExpo\` for a different easing curve, or lower the \`threshold\` if you want the count-up to start as soon as the row is barely visible. Pair it with [count-up](/ui-snippets/count-up/) or [number ticker](/ui-snippets/number-ticker/) for a non-hero version of the same technique.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Stats start at 0 until the row scrolls into view.` },
      { title: 'Scroll the stats row into view', text: `Each number counts up over 1.6s with a real decelerating ease.` },
      { title: 'Scroll away and back', text: `The count-up does not replay — it plays exactly once via the observer + flag guard.` },
      { title: 'Edit the stat values', text: `Change each data-target, data-decimals, and data-suffix attribute.` },
      { title: 'Add a fifth stat', text: `Copy a .stc-stat block with new data-* values — no JS changes needed.` },
      { title: 'Tune the animation', text: `Change duration or swap easeOutExpo for a different curve.` },
    ] },
    features: [
      { title: 'requestAnimationFrame loop', text: `Synced to the real repaint cycle, not a fixed interval.` },
      { title: 'Real easing curve', text: `easeOutExpo decelerates into the final value.` },
      { title: 'Time-based, not frame-based', text: `Duration stays correct regardless of frame rate.` },
      { title: 'Data-driven targets', text: `One function animates any number of stats via data-* attrs.` },
      { title: 'IntersectionObserver trigger', text: `Fires once, only when actually visible.` },
      { title: 'Decimal + suffix support', text: `Handles "99.9%" and "4.9/5" formats correctly.` },
      { title: 'Tabular-num digits', text: `No layout jitter as numbers change rapidly.` },
      { title: 'Graceful fallback', text: `Animates immediately if IntersectionObserver is unavailable.` },
    ],
    useCases: [
      { title: 'SaaS scale/trust heroes', text: `Communicate scale immediately below the headline.` },
      { title: 'Marketplace and platform pages', text: `Show GMV, sellers, or transaction counts.` },
      { title: 'Investor and about pages', text: `Pair with [gradient mesh hero](/ui-snippets/gradient-mesh-hero/).` },
      { title: 'Nonprofit impact pages', text: `Count up funds raised or people helped.` },
      { title: 'Open source project pages', text: `Show stars, contributors, downloads.` },
      { title: 'Conference/event landing pages', text: `Attendees, speakers, and sessions at a glance.` },
      { icon: 'CODE', title: 'Related: Newsletter Hero with Benefit Checklist', desc: 'See the [Newsletter Hero with Benefit Checklist](/ui-snippets/hero-newsletter-benefit-list/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why use requestAnimationFrame instead of setInterval for the count-up?', a: `requestAnimationFrame is synced to the browser's actual repaint cycle, so it naturally runs at the display's refresh rate without the frame-timing drift a fixed-interval setInterval can introduce, and it automatically pauses when the tab is backgrounded rather than continuing to fire uselessly. Since each frame recomputes the current value from elapsed time rather than incrementing a running total, the total animation duration stays accurate even if some frames are dropped.` },
      { q: 'How does the count-up know when to start?', a: `An IntersectionObserver watches the stats row and fires a callback the first time at least 40% of it is visible in the viewport. That callback calls triggerIfNeeded(), which checks a hasAnimated flag to guarantee the count-up runs exactly once, then disconnects the observer — so scrolling the row in and out of view repeatedly does not replay the animation.` },
      { q: 'How do the decimal and suffix formatting work?', a: `Each stat span carries data-target (the final numeric value), an optional data-decimals (defaults to 0), and an optional data-suffix (defaults to empty). Inside the animation loop, the current interpolated value is formatted with toFixed(decimals) and the suffix is appended as a plain string — so "99.9" with data-decimals="1" and data-suffix="%" renders as "0.0%" through "99.9%" as it animates, and a whole number like 52000 with data-suffix="+" renders as "52000+" at the end.` },
      { q: 'What happens if IntersectionObserver is not supported?', a: `The script checks 'IntersectionObserver' in window before creating the observer. If it's unavailable, it calls triggerIfNeeded() immediately instead — so the stats still animate (just on load rather than on scroll-into-view) rather than staying frozen at zero in an unsupported environment.` },
      { q: 'How do I add a fifth stat without touching the JavaScript?', a: `Copy an existing .stc-stat block in the HTML, give the inner .stc-num span a new id and the appropriate data-target, data-decimals, and data-suffix attributes, and add a .stc-label span with its caption. Because animateCount() is applied to every element matching .stc-num via querySelectorAll, the new stat is picked up automatically.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tuning the count-up feel by trial and error, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why animateCount() recomputes the current value from elapsed time and an easing function on every requestAnimationFrame call, rather than incrementing the displayed number by a fixed step each frame — and how that keeps the total duration accurate even with dropped frames. The same assistant can help you tune it — ask whether easeOutExpo is the right curve for a stat that should feel like it's "settling" versus one that should feel energetic, or whether the IntersectionObserver's 0.4 threshold triggers too early or too late for a hero-sized stats row. It's also useful for extending the pattern: ask it to add a subtle scale-and-fade entrance on the stat labels alongside the number count-up, support formatted large numbers with comma separators, or convert the vanilla implementation into a reusable React hook that exposes the current animated value. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a hero section in plain HTML, CSS, and vanilla JavaScript with a row of statistics that count up from zero to their real values using requestAnimationFrame with easing (no library, no CDN).

Requirements:
- A hero with headline, subheading, and CTA above a row of 4 stat blocks, each containing a large number and a small label. Each number element should carry data attributes for its final target value, optional decimal precision, and an optional suffix string (so stats can render as "52000+", "99.9%", or "4.9/5" using the same shared animation code).
- Write one shared animation function that reads a given element's data attributes and animates its displayed text from 0 up to the target value over a fixed duration (roughly 1.5-2 seconds), using requestAnimationFrame recursively (not setInterval) and computing the current interpolated value from actual elapsed time and an easing function on every frame — not by incrementing a running counter by a fixed step each frame, so the total duration stays correct even if frames are dropped.
- Use a real decelerating easing curve (such as an exponential ease-out) rather than a linear ramp, so the numbers visibly slow down as they approach their final value.
- Trigger all the stat animations exactly once, only when the stats row scrolls into the viewport, using an IntersectionObserver with a reasonable visibility threshold — disconnect the observer and guard with a boolean flag so scrolling the row in and out of view does not replay the count-up. Include a simple fallback (animate immediately) for environments without IntersectionObserver support.
- Use tabular number styling (font-variant-numeric: tabular-nums) on the stat numbers so the layout doesn't jitter as digits change rapidly during the animation.`,
    },
  },
};

export default heroStatsCounterRow;
