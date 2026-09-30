const stickyPromoBar = {
  id: 'sticky-promo-bar',
  title: 'Sticky Promo Announcement Bar',
  lastmod: '2026-06-13',
  category: 'navigation',
  html: `<div class="demo-page">
  <!-- Bar 1: Countdown sale bar -->
  <div class="promo-bar bar-gradient" id="bar1">
    <div class="bar-inner">
      <span class="bar-emoji">⚡</span>
      <span class="bar-text">Flash Sale — <strong>50% off all plans.</strong> Ends in</span>
      <div class="countdown" id="countdown">
        <span class="cd-unit"><span class="cd-num" id="cdH">02</span><span class="cd-label">hr</span></span>
        <span class="cd-sep">:</span>
        <span class="cd-unit"><span class="cd-num" id="cdM">47</span><span class="cd-label">min</span></span>
        <span class="cd-sep">:</span>
        <span class="cd-unit"><span class="cd-num" id="cdS">33</span><span class="cd-label">sec</span></span>
      </div>
      <a href="#" class="bar-cta">Claim offer →</a>
    </div>
    <button class="bar-close" onclick="closeBar('bar1')" aria-label="Dismiss">×</button>
  </div>

  <!-- Bar 2: Info/feature bar -->
  <div class="promo-bar bar-dark" id="bar2">
    <div class="bar-inner">
      <span class="bar-emoji">🚀</span>
      <span class="bar-text">New: <strong>React + Tailwind exports</strong> are now live for all 215+ snippets.</span>
      <a href="#" class="bar-cta bar-cta-outline">Explore snippets →</a>
    </div>
    <button class="bar-close" onclick="closeBar('bar2')" aria-label="Dismiss">×</button>
  </div>

  <!-- Bar 3: Warning/maintenance bar -->
  <div class="promo-bar bar-warning" id="bar3">
    <div class="bar-inner">
      <span class="bar-emoji">🛠</span>
      <span class="bar-text"><strong>Scheduled maintenance</strong> on Sunday, June 15 from 02:00–04:00 UTC.</span>
      <a href="#" class="bar-cta bar-cta-warning">Read more →</a>
    </div>
    <button class="bar-close" onclick="closeBar('bar3')" aria-label="Dismiss">×</button>
  </div>

  <!-- Demo page content -->
  <div class="demo-content">
    <h2>Sticky Promo Bar</h2>
    <p>Three variants: gradient sale bar with live countdown, dark feature announcement, and amber warning/maintenance bar. Each dismisses independently.</p>
    <div class="demo-labels">
      <span class="label">↑ Gradient countdown bar</span>
      <span class="label">↑ Dark announcement bar</span>
      <span class="label">↑ Warning/maintenance bar</span>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,sans-serif;background:#f8fafc}

.promo-bar{position:relative;width:100%;display:flex;align-items:center;justify-content:center;padding:10px 44px 10px 16px;min-height:44px;transition:all .3s ease}
.promo-bar.hidden{display:none}

.bar-gradient{background:linear-gradient(90deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%);color:#fff}
.bar-dark{background:#0f172a;color:#e2e8f0;border-top:1px solid #1e293b;border-bottom:1px solid #1e293b}
.bar-warning{background:#fffbeb;color:#92400e;border-top:1px solid #fde68a;border-bottom:1px solid #fde68a}

.bar-inner{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;text-align:center}
.bar-emoji{font-size:15px;flex-shrink:0}
.bar-text{font-size:13px;line-height:1.4}
.bar-gradient .bar-text,.bar-dark .bar-text{color:rgba(255,255,255,.9)}
.bar-warning .bar-text{color:#92400e}
.bar-text strong{font-weight:700}
.bar-gradient .bar-text strong,.bar-dark .bar-text strong{color:#fff}
.bar-warning .bar-text strong{color:#78350f}

.countdown{display:flex;align-items:center;gap:4px;flex-shrink:0}
.cd-unit{display:flex;align-items:baseline;gap:2px;background:rgba(0,0,0,.2);border-radius:6px;padding:2px 6px}
.cd-num{font-size:14px;font-weight:800;font-variant-numeric:tabular-nums;min-width:20px;text-align:center}
.cd-label{font-size:9px;font-weight:600;opacity:.8;text-transform:uppercase}
.cd-sep{font-size:14px;font-weight:800;opacity:.6;margin:0 1px}

.bar-cta{display:inline-flex;align-items:center;font-size:12px;font-weight:700;padding:4px 12px;border-radius:6px;text-decoration:none;transition:all .15s;white-space:nowrap;flex-shrink:0;background:rgba(255,255,255,.95);color:#6366f1}
.bar-cta:hover{background:#fff;transform:translateY(-1px)}
.bar-cta-outline{background:transparent;color:#e2e8f0;border:1px solid rgba(255,255,255,.3)}
.bar-cta-outline:hover{background:rgba(255,255,255,.1);color:#fff}
.bar-cta-warning{background:#f59e0b;color:#fff;border:none}
.bar-cta-warning:hover{background:#d97706;color:#fff}

.bar-close{position:absolute;right:10px;top:50%;transform:translateY(-50%);width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,.15);border:none;color:inherit;font-size:18px;line-height:1;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:background .15s;opacity:.8}
.bar-close:hover{background:rgba(255,255,255,.25);opacity:1}
.bar-warning .bar-close{background:rgba(0,0,0,.08);color:#92400e}
.bar-warning .bar-close:hover{background:rgba(0,0,0,.15)}

.demo-content{padding:40px 24px;max-width:600px;margin:0 auto;text-align:center}
.demo-content h2{font-size:22px;font-weight:800;color:#1e293b;margin-bottom:12px}
.demo-content p{font-size:14px;color:#64748b;line-height:1.6;margin-bottom:20px}
.demo-labels{display:flex;flex-direction:column;gap:4px}
.label{font-size:11px;color:#94a3b8}`,

  js: `function closeBar(id) {
  document.getElementById(id).classList.add('hidden');
}

// Live countdown timer
let totalSeconds = 2 * 3600 + 47 * 60 + 33;

function tick() {
  if (totalSeconds <= 0) return;
  totalSeconds--;
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  const pad = n => String(n).padStart(2, '0');
  document.getElementById('cdH').textContent = pad(h);
  document.getElementById('cdM').textContent = pad(m);
  document.getElementById('cdS').textContent = pad(s);
}

setInterval(tick, 1000);`,

  seo: {
    title: 'Sticky Promo Bar — Announcement Banner HTML CSS JS',
    description: `Sticky promo bar with gradient countdown timer, dark and amber variants, dismiss button, and CTA link. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: `Sticky Promo Bar — Live Countdown Timer, Gradient Variants & Dismiss Pattern`,
      description: `The sticky announcement bar is one of the highest-ROI UI components in SaaS and e-commerce — a single thin bar at the top of the page that communicates a time-sensitive offer, feature launch, or system status without blocking page content. This snippet builds three production-quality bar variants: a gradient sale bar with a live countdown timer, a dark announcement bar for feature launches, and an amber warning bar for maintenance notices. Each bar dismisses independently.

Announcement bars appear on virtually every high-converting SaaS and e-commerce site. Product Hunt uses them for server load notices. Vercel uses them to announce new features. E-commerce stores use them for flash sales with countdown timers. The design challenge is fitting the message, CTA, and dismiss button into 44px of height without the bar feeling cramped — especially on mobile where the bar must wrap gracefully.

**Live countdown timer**

The countdown timer uses \`setInterval(tick, 1000)\` to decrement a \`totalSeconds\` counter every second. Hours, minutes, and seconds are derived with integer division and modulo: \`h = Math.floor(totalSeconds / 3600)\`, \`m = Math.floor((totalSeconds % 3600) / 60)\`, \`s = totalSeconds % 60\`. Each unit is padded to two digits with \`String(n).padStart(2, '0')\`. The digits use \`font-variant-numeric: tabular-nums\` so the layout doesn't shift as numbers change width — critical for countdown displays.

The countdown unit blocks use \`background: rgba(0,0,0,.2)\` — a dark overlay on the gradient background that creates a pill-shaped digit container without hardcoding a background colour. This means the same \`.cd-unit\` style works on any bar background colour.

**Three bar variants**

The gradient bar uses a CSS \`linear-gradient(90deg, #6366f1, #8b5cf6, #ec4899)\` — the purple-to-pink gradient commonly associated with urgency and deals. The dark bar uses \`#0f172a\` (slate-900) with a subtle border — the pattern used for feature announcements and product updates. The warning bar uses an amber \`#fffbeb\` background with amber borders — the universally understood "caution" colour for maintenance windows. All three share the same structural CSS; only the colour scheme changes via class variants.

**Dismiss with localStorage persistence**

The \`closeBar\` function adds a \`.hidden\` class for immediate visual dismissal. In production, you'd extend this with \`localStorage.setItem('promoDismissed_bar1', 'true')\` and check on page load — so dismissed bars don't reappear on refresh. The localStorage key should include a version or date so new campaigns show even for users who dismissed an older bar.

**CTA button variants**

Three CTA styles match each bar variant: solid white button on the gradient bar (high contrast), ghost/outline button on the dark bar (subtle, doesn't compete with the headline), and amber filled button on the warning bar (matches the warning colour scheme). All use the same base \`.bar-cta\` class with modifier classes for variant styling. Pair with a [modal](/ui-snippets/modal/) for a full promotional overlay flow.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Three stacked announcement bars appear at the top of the page. The first has a live countdown timer ticking down from 2h 47m 33s.` },
      { title: 'Watch the countdown tick', text: `The H:MM:SS digits update every second. Numbers use tabular-nums spacing so the layout doesn't shift.` },
      { title: 'Click the × to dismiss each bar', text: `Each bar hides independently — dismissing the gradient bar leaves the dark and warning bars visible.` },
      { title: 'Click the CTA links', text: `"Claim offer →" on the gradient bar, "Explore snippets →" on the dark bar, "Read more →" on the warning bar — each links independently.` },
      { title: 'Set your countdown end time', text: `Change \`let totalSeconds = 2 * 3600 + 47 * 60 + 33\` at the top of the JS to your target duration in hours, minutes, seconds.` },
      { title: 'Persist dismiss to localStorage', text: `Add \`localStorage.setItem('promoDismissed', '1')\` inside \`closeBar\` and check it on load to prevent the bar reappearing on refresh.` },
    ] },
    features: [
      { title: 'Live countdown timer', text: `\`setInterval\` at 1000ms decrements \`totalSeconds\`. \`font-variant-numeric:tabular-nums\` prevents layout shifts as digit widths change.` },
      { title: 'Three colour variants', text: `Gradient sale bar, dark announcement bar, and amber warning bar — matching the three most common promo bar use cases in SaaS and e-commerce.` },
      { title: 'Independent dismiss buttons', text: `Each bar has its own \`closeBar(id)\` call — hiding one doesn't affect the others. Extend with localStorage to persist dismissal across reloads.` },
      { title: 'Countdown digit containers', text: `\`rgba(0,0,0,.2)\` background on digit units works on any bar colour without hardcoding — transparent dark overlay that adapts to the gradient.` },
      { title: 'Responsive wrapping', text: `\`.bar-inner\` uses \`flex-wrap: wrap\` with \`justify-content: center\` — countdown and CTA wrap to a second line on mobile without breaking the layout.` },
      { title: 'CTA button variants', text: `Solid white on gradient, outline ghost on dark, filled amber on warning — each CTA matches its bar's colour system.` },
      { title: 'Fixed dismiss button position', text: `\`.bar-close\` is \`position: absolute; right: 10px\` — always visible at the right edge regardless of bar content length.` },
      { title: 'Emoji prefix', text: `Each bar opens with an emoji (⚡🚀🛠) — proven to increase click-through by making the bar feel less like corporate boilerplate.` },
    ],
    useCases: [
      { title: 'Flash sale countdown banners', text: `E-commerce stores use gradient countdown bars for time-limited sales. The countdown creates urgency — FOMO drives the highest-converting announcement bars.` },
      { title: 'Feature launch announcements', text: `SaaS products use the dark bar to announce new features or integrations to existing users on every page — lower friction than a modal.` },
      { title: 'Scheduled maintenance notices', text: `The warning bar informs users of upcoming downtime before it happens — reduces support tickets and sets expectations.` },
      { title: 'Free shipping threshold', text: `E-commerce: "Add $12 more for free shipping" bar that updates dynamically as users add items to cart. Driven by cart total via JS.` },
      { title: 'Conference and event countdowns', text: `Event sites use countdown bars to build anticipation before registration deadlines or live streams begin.` },
      { title: 'Beta/early access programmes', text: `"You're on the waitlist — early access opens in 3 days" bars give users a visible signal that their wait is almost over.` },
    ],
    faqs: [
      { q: 'How do I make the bar sticky at the top of the page?', a: `Add \`position: sticky; top: 0; z-index: 100\` to \`.promo-bar\`. For a fixed bar that stays visible on scroll, use \`position: fixed; top: 0; left: 0; right: 0\` and add \`padding-top: 44px\` to \`body\` or the first page section to prevent content being hidden behind it.` },
      { q: 'How do I persist the dismissed state across page reloads?', a: `Inside \`closeBar(id)\`, add: \`localStorage.setItem('dismissed_' + id, '1')\`. At page load: \`['bar1','bar2','bar3'].forEach(id => { if (localStorage.getItem('dismissed_' + id)) document.getElementById(id).classList.add('hidden') })\`.` },
      { q: 'How do I set a real deadline for the countdown?', a: `Replace the \`totalSeconds\` variable with: \`const deadline = new Date('2026-12-31T23:59:59'); let totalSeconds = Math.floor((deadline - Date.now()) / 1000)\`. This counts down to a fixed date rather than a relative duration.` },
      { q: 'How do I export this as a React component?', a: `Create a \`PromoBar\` component with props: \`{variant, emoji, text, cta, ctaHref, deadline}\`. The countdown uses \`useEffect\` with a \`setInterval\` cleanup and \`useState\` for the remaining seconds. The dismiss uses \`const [dismissed, setDismissed] = useState(false)\` — return \`null\` when dismissed.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the countdown math or the variant structure by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how tick derives hours, minutes, and seconds from a single totalSeconds counter using integer division and modulo, and why font-variant-numeric tabular-nums matters for a ticking display. The same assistant can help optimize it — for instance whether three independent setInterval-driven bars would be better consolidated, or whether the countdown should be recomputed from a fixed target Date rather than a decrementing counter so it survives a tab going inactive. It's also useful for extending the bars: ask it to persist each bar's dismissed state to localStorage, drive the free-shipping variant from a live cart total, or add a fourth variant for a beta waitlist countdown. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a set of "sticky promo announcement bars" in plain HTML, CSS, and JavaScript using only setInterval and classList toggling — no animation library, no framework.

Requirements:
- Three independently dismissible bar variants stacked on the page: a gradient sale bar with a live countdown, a dark feature-announcement bar, and an amber warning/maintenance bar — each sharing the same structural markup (icon, message text, CTA link, close button) but differing only by a modifier class controlling colors.
- A closeBar function, callable per bar by id, that adds a hidden class to only that bar, leaving the others untouched and independently visible.
- A countdown timer that decrements a single totalSeconds integer once per second via setInterval, then derives hours, minutes, and seconds using Math.floor and modulo arithmetic (not three separate counters), and renders each unit zero-padded to two digits.
- The countdown digits must use a numeric font feature (tabular-nums or an equivalent monospaced number style) so the layout does not visibly shift width as digits change.
- Each bar's close button must be absolutely positioned at a fixed offset from the bar's edge regardless of how long the message or CTA text is, and the bar's inner content must wrap gracefully (flex-wrap) on narrow viewports without breaking.
- Do not persist dismissal in this base version, but structure closeBar so that adding a localStorage.setItem call and a corresponding page-load check would be a one-line change per bar.`,
    },
  },
};

export default stickyPromoBar;
