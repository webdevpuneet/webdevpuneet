const gsapScrollNumberCounter = {
  id: 'gsap-scroll-number-counter',
  title: 'GSAP Scroll Number Counter',
  lastmod: '2026-08-21',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="sc-intro"><h1>Our impact</h1><p>Scroll down — the stats count up once, in sequence.</p></section>
<section class="sc-stats" id="scStats">
  <div class="sc-stat"><span class="sc-num" data-target="184" data-suffix="k">0</span><span class="sc-label">Users onboarded</span></div>
  <div class="sc-stat"><span class="sc-num" data-target="99.9" data-decimals="1" data-suffix="%">0</span><span class="sc-label">Uptime</span></div>
  <div class="sc-stat"><span class="sc-num" data-target="42" data-suffix="M" data-prefix="$">0</span><span class="sc-label">Processed volume</span></div>
  <div class="sc-stat"><span class="sc-num" data-target="6" data-suffix="x">0</span><span class="sc-label">Faster deploys</span></div>
</section>
<section class="sc-outro"><p>Scroll away and back — it won't recount.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0c11;color:#fff}
.sc-intro{min-height:100vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.sc-outro{min-height:65vh;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:10px;padding:24px}
.sc-intro h1{font-size:clamp(30px,6vw,56px);letter-spacing:-.02em}
.sc-intro p,.sc-outro p{color:#8890a8;font-size:15px}
.sc-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;background:#1c2230;max-width:960px;margin:0 auto}
.sc-stat{background:#0e1119;padding:clamp(28px,5vw,48px) 20px;display:flex;flex-direction:column;align-items:center;gap:8px;text-align:center}
.sc-num{font-size:clamp(34px,6vw,52px);font-weight:800;letter-spacing:-.02em;background:linear-gradient(160deg,#fbbf24,#fb7185);-webkit-background-clip:text;background-clip:text;color:transparent}
.sc-label{color:#8890a8;font-size:13px;letter-spacing:.01em}`,

  js: `gsap.registerPlugin(ScrollTrigger);

const nums = document.querySelectorAll('.sc-num');

// Each stat counts up independently via a tweened proxy object, staggered
// slightly across the row, and is gated to fire once when it scrolls into view.
ScrollTrigger.create({
  trigger: '#scStats',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    nums.forEach((el, i) => {
      const target = parseFloat(el.dataset.target);
      const decimals = parseInt(el.dataset.decimals || '0', 10);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const proxy = { val: 0 };

      gsap.to(proxy, {
        val: target,
        duration: 1.8,
        delay: i * 0.15,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = prefix + proxy.val.toFixed(decimals) + suffix;
        }
      });
    });
  }
});`,

  seo: {
    title: 'GSAP Scroll Number Counter — Free Once-Only Stat Count-Up Snippet',
    description: `A row of stats that count up from zero once, staggered and eased, when scrolled into view — built with GSAP tweened proxies and ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'GSAP Scroll Number Counter — Staggered, Scroll-Gated Stat Count-Ups',
      description: `The scroll number counter snippet is a row of statistics that count from zero up to their real value, one after another, the moment the row scrolls into view — and only ever once, so scrolling past and back doesn't replay a slot-machine effect on numbers that are supposed to feel authoritative. It's built with GSAP's proxy-tween technique and a single \`ScrollTrigger.create\` gate, both from a CDN.

**Numbers aren't tweenable directly, so a proxy stands in**

You can't animate \`textContent\` with GSAP directly, so each stat gets a tiny plain object, \`{ val: 0 }\`, that GSAP *can* tween as a number. \`gsap.to(proxy, { val: target, onUpdate: () => { el.textContent = ... } })\` moves \`proxy.val\` smoothly from 0 to the target, and every tick the \`onUpdate\` callback formats that number back into the element's text — with whatever prefix, suffix, and decimal precision that stat needs.

**Data attributes make it generic**

Each \`.sc-num\` element declares its own \`data-target\`, and optionally \`data-decimals\`, \`data-prefix\`, and \`data-suffix\` — so the same loop handles a plain integer like \`184k\`, a decimal percentage like \`99.9%\`, and a currency figure like \`$42M\` without any per-stat custom code. Add another stat to the row and it counts up automatically.

**Staggered by delay, not a stagger option**

Because each stat is its own independent \`gsap.to\` call (not one tween across an array), the stagger is expressed as \`delay: i * 0.15\` — each subsequent stat starts a beat after the previous one, so the row counts up left to right in a wave rather than every number ticking simultaneously, which reads as more deliberate and easier to follow.

**Play-once, not toggleActions**

Unlike a reveal you'd want to replay, a counter looks broken if it resets and recounts every time you scroll past it. Instead of \`toggleActions\`, this uses \`ScrollTrigger.create({ once: true, onEnter: ... })\` — a one-shot trigger that fires exactly once and then does nothing on subsequent enters, guaranteeing the count-up happens a single time no matter how the section is scrolled.

**Customizing it**

Add more stats by copying the markup pattern, adjust the stagger delay or per-stat duration, or swap \`power2.out\` for a snappier or bouncier ease. Pair it with [count up](/ui-snippets/count-up/) or [number ticker](/ui-snippets/number-ticker/) for hover- or load-triggered variants, or [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) for a matching card entrance nearby.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `An intro, a stat row, and an outro section render.` },
      { title: 'Scroll to the stats', text: `Each number counts up from 0, staggered left to right.` },
      { title: 'Scroll away and back', text: `It does not recount — the trigger only fires once.` },
      { title: 'Edit data-target', text: `Change any stat's target value, prefix, suffix, or decimals.` },
      { title: 'Add more stats', text: `Copy the .sc-stat markup; the loop picks it up automatically.` },
    ] },
    features: [
      { title: 'Tweened proxy values', text: `Plain objects stand in for otherwise untweenable text.` },
      { title: 'Data-driven formatting', text: `data-target/prefix/suffix/decimals per stat.` },
      { title: 'Left-to-right stagger', text: `Per-stat delay offsets create a counting wave.` },
      { title: 'Fires exactly once', text: `ScrollTrigger once: true prevents re-counting.` },
      { title: 'Independent tweens', text: `Each stat animates on its own timeline.` },
      { title: 'Decelerating ease', text: `power2.out settles each count-up smoothly.` },
      { title: 'Mixed number formats', text: `Handles integers, decimals, and currency in one loop.` },
      { title: 'Responsive stat row', text: `auto-fit grid reflows across screen sizes.` },
    ],
    useCases: [
      { title: 'Company stats sections', text: `A scroll-gated sibling to [count up](/ui-snippets/count-up/).` },
      { title: 'Pricing/impact pages', text: `Pair with [number ticker](/ui-snippets/number-ticker/) elsewhere on page.` },
      { title: 'Dashboards', text: `Animate KPI tiles into their real values on load.` },
      { title: 'Case studies', text: `Follow a [scroll reveal grid](/ui-snippets/scroll-reveal-grid/) portfolio with results.` },
      { title: 'Investor/about pages', text: `Reinforce credibility with a deliberate, staggered count.` },
      { title: 'Product launch pages', text: `Show adoption metrics counting up once scrolled to.` },
      { icon: 'CODE', title: 'Related: GSAP Scroll Text Scramble', desc: 'See the [GSAP Scroll Text Scramble](/ui-snippets/gsap-text-scramble-scroll/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Direction-Aware Grid Reveal (IntersectionObserver)', desc: 'See the [Direction-Aware Grid Reveal (IntersectionObserver)](/ui-snippets/scroll-reveal-stagger-columns/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why tween a plain object instead of the number in the DOM?', a: `GSAP tweens numeric properties, and textContent is a string, so there's nothing for GSAP to interpolate directly on the element. The proxy object's val property is a real number GSAP can animate smoothly frame by frame, and the onUpdate callback is responsible for converting that current value into formatted text on the element.` },
      { q: 'Why use ScrollTrigger.create with once: true instead of toggleActions?', a: `toggleActions is built for animations you want to replay on re-entry, like a reveal. A stat counter that recounts from zero every time you scroll past it looks broken rather than polished. once: true creates a trigger that fires its onEnter callback a single time and is then done, guaranteeing the count-up happens exactly once regardless of how the user scrolls afterward.` },
      { q: `How does the stagger work without GSAP's stagger option?`, a: `Because each stat is animated by its own separate gsap.to call inside a forEach loop rather than one tween targeting an array, the built-in stagger option (which staggers multiple targets within a single tween) doesn't apply. Instead, each call gets delay: i * 0.15, manually offsetting when each stat's tween begins based on its index.` },
      { q: 'How do I show a percentage, currency, or decimal value instead of a plain integer?', a: `Each stat element carries its own data-target, plus optional data-decimals, data-prefix, and data-suffix attributes. The onUpdate callback reads those per element and calls proxy.val.toFixed(decimals) wrapped in the prefix and suffix strings, so one shared loop can format 184k, 99.9%, and $42M correctly without per-stat custom code.` },
      { q: 'How do I use this in React, Vue, or Angular?', a: `Register ScrollTrigger and create the ScrollTrigger.create gate inside a mount effect once the stat elements exist, reading their data attributes the same way. Because it's a once: true trigger tied to specific DOM nodes, make sure it's created after the elements render, and kill it in the cleanup function to avoid a duplicate trigger on remount.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain why a tweened proxy object is necessary to animate a number GSAP can't reach directly in the DOM, and why once: true is the correct ScrollTrigger choice for a counter versus the reversible toggleActions pattern used for reveal animations. It's also useful for extending the snippet — ask for support for negative numbers, a version that formats large numbers with comma separators instead of k/M suffixes, or a variant that re-triggers per stat individually as each one enters the viewport rather than gating the whole row on the first stat. Use it to build real understanding of the proxy-tween technique so you can reuse it for other non-numeric-DOM animations.`,
      prompt: `Build a "scroll-gated number counter" stat row in plain HTML, CSS, and JavaScript using GSAP with its ScrollTrigger plugin (load both from a CDN).

Requirements:
- A row of multiple stat elements, each with a number that starts at 0 and a text label underneath. Each number element carries a data-target attribute for its final value, and optional data-decimals, data-prefix, and data-suffix attributes to control formatting (e.g. one stat should render as "184k", another as "99.9%", another as "$42M").
- Do not attempt to tween the DOM text or a number attribute directly — animate a plain JavaScript object's numeric property with GSAP, and use that tween's onUpdate callback to format the current value (applying decimals, prefix, and suffix from the data attributes) into the element's textContent on every frame.
- Use a single ScrollTrigger gate (ScrollTrigger.create with once: true, or equivalent one-shot logic) on the stat row so the entire count-up sequence begins exactly once when the row scrolls to roughly 80% down the viewport, and does not restart if the user scrolls away and back.
- Stagger the stats so they don't all animate simultaneously — each subsequent stat (by DOM order) should begin counting slightly after the previous one, producing a left-to-right counting wave rather than a synchronized jump.
- Use a decelerating easing curve (e.g. power2 out) for each count-up so it settles into its final value smoothly rather than stopping abruptly or linearly.`,
    },
  },
};

export default gsapScrollNumberCounter;
