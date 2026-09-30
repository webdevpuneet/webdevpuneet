const boxReveal = {
  id: 'box-reveal',
  title: 'Box Reveal',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="br-stage" id="brStage">
  <div class="br-line" style="--d:0"><span class="br-cover"></span><h1>Design that moves</h1></div>
  <div class="br-line" style="--d:1"><span class="br-cover"></span><p class="br-sub">A colored panel sweeps away to reveal each line.</p></div>
  <div class="br-line" style="--d:2"><span class="br-cover"></span><a href="#" class="br-btn">Get started →</a></div>
  <button type="button" class="br-replay" id="brReplay">↻ Replay</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.br-stage{max-width:560px}
.br-line{position:relative;display:inline-block;overflow:hidden;margin-bottom:14px}
.br-line h1{font-size:clamp(34px,7vw,60px);font-weight:900;letter-spacing:-.03em}
.br-sub{font-size:16px;color:#9a9ac0;max-width:420px;line-height:1.5}
.br-btn{display:inline-block;background:#6366f1;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:12px 22px;border-radius:11px}

/* The content starts invisible; a colored cover sweeps right, then back left,
   revealing the content as it retreats — the classic box reveal. */
.br-line h1,.br-line .br-sub,.br-line .br-btn{opacity:0}
.br-cover{position:absolute;inset:0;background:#6366f1;transform:scaleX(0);transform-origin:left;z-index:1}
.br-stage.play .br-line h1,.br-stage.play .br-line .br-sub,.br-stage.play .br-line .br-btn{animation:brShow 0s linear forwards;animation-delay:calc(var(--d) * .18s + .42s)}
.br-stage.play .br-cover{animation:brSweep .85s cubic-bezier(.7,0,.3,1) forwards;animation-delay:calc(var(--d) * .18s)}
@keyframes brSweep{0%{transform:scaleX(0);transform-origin:left}50%{transform:scaleX(1);transform-origin:left}50.1%{transform-origin:right}100%{transform:scaleX(0);transform-origin:right}}
@keyframes brShow{to{opacity:1}}

.br-replay{margin-top:14px;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.14);color:#cfcfe0;font-family:inherit;font-size:13px;font-weight:600;padding:9px 16px;border-radius:999px;cursor:pointer}`,

  js: `var stage = document.getElementById('brStage');

function play() {
  stage.classList.remove('play');
  // Force reflow so re-adding the class restarts the animations.
  void stage.offsetWidth;
  stage.classList.add('play');
}

// Reveal when the stage scrolls into view (once), and on replay click.
var io = new IntersectionObserver(function (entries) {
  entries.forEach(function (e) { if (e.isIntersecting) { play(); io.disconnect(); } });
}, { threshold: 0.4 });
io.observe(stage);

document.getElementById('brReplay').addEventListener('click', play);`,

  seo: {
    title: 'Box Reveal — Free HTML CSS JS Panel Wipe Reveal Snippet',
    description: `Headline lines revealed by a colored panel that sweeps across and retreats, staggered per line and triggered on scroll. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Box Reveal — A Colored Panel Wipes Away to Reveal Text',
      description: `Box reveal is the punchy entrance where a solid colored panel sweeps across a line of text — growing from one side, then retreating to the other — and the text is revealed in its wake. Stacked across several lines with a stagger, it makes a headline arrive with confidence. This snippet builds it with plain HTML, CSS, and a little vanilla JavaScript for scroll triggering and replay.

**The sweep in one keyframe**

Each line has a \`.br-cover\` panel and the content beneath it. The \`brSweep\` keyframe drives the whole reveal by animating \`scaleX\` and flipping \`transform-origin\` at the midpoint: from \`0\` to \`1\` it grows from the left (covering the line), and at exactly \`50.1%\` the origin switches to the right so from \`1\` back to \`0\` it shrinks toward the right (uncovering the line). That origin flip mid-animation is the trick that makes one panel both wipe on and wipe off in a single continuous motion, sweeping across the text.

**Revealing the content at the right moment**

The text underneath starts at \`opacity: 0\` and is flipped to visible by a zero-duration \`brShow\` animation whose \`animation-delay\` is timed to the panel's midpoint — the instant the cover fully overlaps the line. So the content becomes visible while hidden behind the panel, and is then exposed as the panel retreats. Timing the reveal to the cover's peak is what prevents any flash of text before the wipe or a gap after it.

**Per-line stagger**

Each line carries a \`--d\` index, and both the sweep and the reveal use \`animation-delay: calc(var(--d) * .18s ...)\`, so line 0 goes first, line 1 follows 180ms later, and so on. The cascade makes the headline, subtext, and button arrive in sequence rather than together, which reads as deliberate and polished. The whole sequence is driven by CSS; the index is the only per-line input.

**Scroll-triggered, and replayable**

An \`IntersectionObserver\` starts the reveal when the stage is 40% in view, then disconnects so it fires once on scroll. A replay button re-runs it by removing the \`.play\` class, forcing a reflow with \`void offsetWidth\`, and re-adding the class — the standard way to restart CSS animations. That reflow is essential: without it the browser would batch the class removal and re-add and the animations would not replay.

**Why CSS over JS animation**

Driving the wipe with a single keyframe and an origin flip keeps it on the compositor and makes the stagger a matter of \`calc\` delays — no per-frame scripting, no animation library. JavaScript only decides when to start and restart.

**Customizing it**

Recolor the cover panels (or give each line its own color), change the sweep duration and easing for a snappier or smoother wipe, adjust the \`.18s\` stagger, or change the sweep direction by editing the origin flip. Apply it to images or cards, not just text. Pair it with a [text generate](/ui-snippets/text-generate/) reveal or a [shiny text](/ui-snippets/shiny-text/) badge for a coordinated intro.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Lines of content sit hidden behind colored panels.` },
      { title: 'Scroll it into view', text: `Panels sweep across and retreat, revealing each line.` },
      { title: 'Watch the stagger', text: `Headline, subtext, and button arrive in sequence.` },
      { title: 'Click Replay', text: `The reveal re-runs from the start.` },
      { title: 'Recolor the panels', text: `Change the cover color per line.` },
      { title: 'Tune the timing', text: `Adjust the sweep speed and the stagger.` },
    ] },
    features: [
      { title: 'Single-keyframe sweep', text: `Origin flip wipes on and off in one motion.` },
      { title: 'Perfectly-timed reveal', text: `Content shows at the cover peak.` },
      { title: 'Per-line stagger', text: `--d index cascades the lines.` },
      { title: 'No flash or gap', text: `Reveal timed to the panel overlap.` },
      { title: 'Scroll-triggered', text: `IntersectionObserver fires it once.` },
      { title: 'Replayable', text: `Reflow trick restarts the animation.` },
      { title: 'CSS-driven', text: `Stagger via calc delays, no JS loop.` },
      { title: 'Works on any content', text: `Text, images, or cards.` },
    ],
    useCases: [
      { title: 'Hero intros', text: `Reveal a headline above a [shiny text](/ui-snippets/shiny-text/) badge.` },
      { title: 'Section titles', text: `Lead into a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Portfolio headers', text: `Pair with a [hero parallax grid](/ui-snippets/hero-parallax-grid/).` },
      { title: 'Image reveals', text: `Wipe a panel off a featured photo.` },
      { title: 'CTA entrances', text: `Make a [shimmer button](/ui-snippets/shimmer-button/) arrive with impact.` },
      { title: 'Reveal demos', text: `A reference for panel-wipe entrances.` },
      { icon: 'CODE', title: 'Related: Back to Top Button', desc: 'See the [Back to Top Button](/ui-snippets/back-to-top-button/) for a related scroll pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Hue-Rotating Scroll Background', desc: 'See the [Hue-Rotating Scroll Background](/ui-snippets/css-scroll-timeline-hue-rotate-bg/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does one panel both cover and uncover the text?', a: `The brSweep keyframe animates scaleX from 0 to 1 with the transform-origin on the left (growing to cover the line), then at 50.1% it switches the origin to the right so scaleX goes from 1 back to 0, shrinking toward the right and uncovering the line. Flipping the origin at the midpoint is what turns one panel into a single continuous wipe across the text.` },
      { q: 'How is the text revealed at the right instant?', a: `The content starts at opacity 0 and is flipped visible by a zero-duration animation whose delay matches the panel's midpoint — when the cover fully overlaps the line. So the text becomes visible while still hidden behind the panel and is then exposed as the panel retreats, which avoids any flash before the wipe or gap after it.` },
      { q: 'How are the lines staggered?', a: `Each line carries a --d index, and both the sweep and the reveal use animation-delay: calc(var(--d) * .18s + ...). So line 0 starts first, line 1 follows 180ms later, and so on. The cascade is entirely CSS, with the index as the only per-line input, making the headline, subtext, and button arrive in sequence.` },
      { q: 'How does the replay restart the animation?', a: `It removes the play class, reads stage.offsetWidth to force a synchronous reflow, then re-adds the class. The reflow makes the browser register the removal before the re-add, so the CSS animations restart. Without forcing the reflow, the two class changes would be batched and the animation would not replay.` },
      { q: 'How do I use this box reveal in React, Vue, or Angular?', a: `Render the lines with their index as a --d style and toggle a play class from state, triggered by an IntersectionObserver in a mount effect. For replay, briefly remove and re-add the class (or change a key to remount). The keyframes are pure CSS. In Tailwind, define the sweep and show animations in the config and apply staggered delays with arbitrary calc values.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to puzzle out the mid-animation origin flip by hand to see how it produces one continuous wipe. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the brSweep keyframe's transform-origin switch at 50.1 percent turns a single scaleX animation into a sweep-on-then-sweep-off motion, and why the brShow reveal's animation-delay is timed to line up with that exact midpoint. The same assistant can help optimize it — asking whether the reflow-forcing void stage.offsetWidth trick used for replay has a cheaper equivalent, or whether the IntersectionObserver threshold of 0.4 is the right trigger point for different section heights. It's also useful for extending the effect: ask it to make each line use a different cover color, apply the same wipe to an image instead of text, or drive the stagger timing from a JS array instead of inline CSS custom properties. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "box reveal" text entrance effect in plain HTML, CSS, and a small amount of JavaScript, where a solid colored panel sweeps across each line of content and retreats to reveal it — no animation libraries, no per-frame JavaScript for the sweep itself.

Requirements:
- Multiple lines of content (a heading, a paragraph, a button), each wrapped so it can host both the real content and an absolutely-positioned cover panel on top of it.
- Content must start fully invisible (opacity 0), and a single CSS keyframe animation on the cover panel must animate scaleX from 0 to 1 with transform-origin set to the left side for the first half of the animation, then switch transform-origin to the right side partway through (just past the midpoint) so the same animation continues shrinking scaleX back to 0 from the right — producing one continuous sweep-across-and-retreat motion from a single keyframe, not two separate animations.
- The underlying content's opacity must flip from 0 to 1 via a separate zero-duration animation whose delay is timed to land exactly at the sweep's midpoint (when the cover fully overlaps the content), so there is no flash of text before the cover arrives and no visible gap after it leaves.
- Each line must carry its own index as a CSS custom property, and both the sweep delay and the reveal delay must be computed from that index using calc(), so lines animate in a staggered cascade purely through CSS with no JavaScript timing loop.
- Trigger the whole sequence automatically once, the first time the container scrolls into view, using an IntersectionObserver that disconnects after firing.
- Provide a replay button that can re-trigger the entire staggered sequence from the beginning at any time, using whatever technique is required to force the browser to restart already-completed CSS animations.`,
    },
  },
};

export default boxReveal;
