const scrollTimelineDots = {
  id: 'scroll-timeline-dots',
  title: 'Scroll Timeline Dots',
  lastmod: '2026-07-18',
  category: 'scroll',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js',
    'https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js',
  ],
  html: `<section class="tl-top"><p>Scroll the story ↓</p></section>
<section class="tl-wrap" id="tlWrap">
  <div class="tl-line"><span class="tl-fill" id="tlFill"></span></div>
  <div class="tl-steps">
    <div class="tl-step"><span class="tl-dot"></span><div class="tl-card"><time>2019</time><h3>Founded</h3><p>Two people, one laptop, a stubborn idea.</p></div></div>
    <div class="tl-step"><span class="tl-dot"></span><div class="tl-card"><time>2021</time><h3>First 1,000 users</h3><p>Word of mouth turned into a waitlist.</p></div></div>
    <div class="tl-step"><span class="tl-dot"></span><div class="tl-card"><time>2023</time><h3>Series A</h3><p>We grew the team to thirty across four cities.</p></div></div>
    <div class="tl-step"><span class="tl-dot"></span><div class="tl-card"><time>2025</time><h3>One million</h3><p>A milestone we once only dreamed about.</p></div></div>
  </div>
</section>
<section class="tl-bottom"><p>The line filled and dots lit as you scrolled.</p></section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0b13;color:#fff}
.tl-top,.tl-bottom{min-height:60vh;display:flex;justify-content:center;align-items:center;color:#8a90a8;font-size:15px;letter-spacing:.1em;text-transform:uppercase}
.tl-wrap{position:relative;max-width:620px;margin:0 auto;padding:8vh 24px 8vh 0}
.tl-line{position:absolute;left:24px;top:8vh;bottom:8vh;width:3px;background:#1e2335;border-radius:999px;overflow:hidden}
.tl-fill{position:absolute;left:0;top:0;width:100%;height:0;background:linear-gradient(180deg,#6366f1,#22d3ee)}
.tl-steps{display:flex;flex-direction:column;gap:9vh;padding-left:60px}
.tl-step{position:relative}
.tl-dot{position:absolute;left:-43.5px;top:6px;width:18px;height:18px;border-radius:50%;background:#11131f;border:3px solid #2c3346;transition:none;will-change:transform}
.tl-card{background:linear-gradient(150deg,#161b2c,#11131d);border:1px solid #242b40;border-radius:16px;padding:18px 20px;will-change:transform,opacity}
.tl-card time{font-size:13px;font-weight:800;letter-spacing:.05em;color:#7c8cff}
.tl-card h3{font-size:21px;letter-spacing:-.01em;margin:4px 0 6px}
.tl-card p{color:#a7adc4;font-size:14.5px;line-height:1.55}`,

  js: `gsap.registerPlugin(ScrollTrigger);

var fill = document.getElementById('tlFill');
var dots = gsap.utils.toArray('.tl-dot');
var cards = gsap.utils.toArray('.tl-card');

// 1) The vertical line fills as you scroll through the timeline.
gsap.to(fill, {
  height: '100%', ease: 'none',
  scrollTrigger: { trigger: '#tlWrap', start: 'top 60%', end: 'bottom 70%', scrub: true }
});

// 2) Each card slides in and its dot lights up as it reaches the viewport.
cards.forEach(function (card, i) {
  gsap.from(card, {
    x: 36, opacity: 0, duration: 0.6, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 78%', toggleActions: 'play none none reverse' }
  });
  ScrollTrigger.create({
    trigger: card, start: 'top 70%', end: 'bottom 60%',
    onToggle: function (self) {
      gsap.to(dots[i], {
        backgroundColor: self.isActive ? '#22d3ee' : '#11131f',
        borderColor: self.isActive ? '#22d3ee' : '#2c3346',
        scale: self.isActive ? 1.25 : 1, duration: 0.3
      });
    }
  });
});`,

  seo: {
    title: 'Scroll Timeline Dots — Free GSAP ScrollTrigger Snippet',
    description: `A vertical timeline whose spine fills and whose dots light as cards slide in on scroll, using GSAP ScrollTrigger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Scroll Timeline Dots — A Timeline That Fills as You Scroll',
      description: `Scroll timeline dots is the animated vertical timeline where a progress line fills from top to bottom as you scroll, each milestone's dot lights up when you reach it, and the cards slide in beside them — the storytelling layout for company histories, roadmaps, and changelogs. This snippet builds it with GSAP and ScrollTrigger (from a CDN), combining a scrubbed fill with per-step toggles.

**The filling spine**

A track runs down the left edge with a gradient fill inside it. One scrubbed tween animates the fill's \`height\` from 0 to 100% across the timeline (\`start: 'top 60%'\` to \`end: 'bottom 70%'\`), so the line grows exactly in step with the scrollbar — scroll halfway and the spine is half full, scroll back and it recedes. This continuous fill is the backbone that ties the milestones together visually.

**Cards that slide in once**

Each milestone card gets a \`gsap.from\` that slides it in from the side and fades it up, triggered at \`start: 'top 78%'\` with \`toggleActions: 'play none none reverse'\` — so it animates in as it enters and reverses if you scroll it back out, replaying on re-entry. Using a discrete entrance (not scrub) here means each card has a crisp arrival rather than being half-drawn mid-scroll.

**Dots that light at the right moment**

Separately, each dot has a \`ScrollTrigger.create\` with an \`onToggle\` that fires when its card spans a band near the viewport center. While active, the dot tweens to a bright fill, accent border, and a slight scale-up; when the card leaves, it reverts. This makes the dots a live "you are here" indicator that tracks reading position, distinct from the one-time card entrance.

**Two trigger styles, on purpose**

The snippet deliberately mixes ScrollTrigger modes: a single scrub for the continuous fill, discrete \`toggleActions\` for the card entrances, and \`onToggle\` for the dot state. Each effect uses the mode that fits it — continuous value, play-once-on-enter, and active-while-in-range — which is exactly how ScrollTrigger is meant to be composed, and keeps every piece simple.

**Smooth and reversible**

The fill animates \`height\` within an \`overflow: hidden\` track (cheap, contained), and the cards and dots animate transforms, colors, and scale — all reversible, so scrolling up unwinds the whole timeline cleanly. \`will-change\` hints keep the motion smooth.

**Customizing it**

Add milestones (each is a step with a dot and card), change the fill gradient, the slide direction, the active dot color, or the trigger points. Pair it with a [vertical timeline](/ui-snippets/vertical-timeline/), a [scroll svg path draw](/ui-snippets/scroll-svg-path-draw/), or [scroll pin steps](/ui-snippets/scroll-pin-steps/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Add the GSAP CDNs', text: `Include gsap and ScrollTrigger from the CDN panel.` },
      { title: 'Paste HTML, CSS, and JS', text: `A vertical timeline of milestones renders.` },
      { title: 'Scroll down', text: `The spine fills and cards slide in.` },
      { title: 'Watch the dots', text: `Each dot lights as its card reaches center.` },
      { title: 'Scroll back up', text: `The fill recedes and dots dim.` },
      { title: 'Add a milestone', text: `Copy a .tl-step with its dot and card.` },
    ] },
    features: [
      { title: 'Scrubbed fill', text: `Spine grows with scroll position.` },
      { title: 'Sliding cards', text: `Each enters once with a reverse.` },
      { title: 'Live dots', text: `onToggle lights the current milestone.` },
      { title: 'Mixed trigger modes', text: `Scrub, toggleActions, and onToggle.` },
      { title: 'Reversible', text: `Scrolling up unwinds everything.` },
      { title: 'Contained fill', text: `height inside an overflow-hidden track.` },
      { title: 'Accent gradient', text: `The spine reads as progress.` },
      { title: 'Any milestone count', text: `Add steps freely.` },
    ],
    useCases: [
      { title: 'Company history timelines', text: 'Tell a company story where a spine fills as you scroll and each milestone dot lights up when reached, as a richer [vertical timeline](/ui-snippets/vertical-timeline/).' },
      { title: 'Product roadmaps', text: 'Animate a [product roadmap](/ui-snippets/product-roadmap/) so upcoming items appear in order, mixing scrub, `toggleActions` and `onToggle` triggers.' },
      { title: 'Changelog feeds', text: 'Reveal a [changelog feed](/ui-snippets/changelog-feed/) entry by entry, with cards sliding in once and reversing if the user scrolls back.' },
      { title: 'Process narratives', text: 'Pair with [scroll pin steps](/ui-snippets/scroll-pin-steps/) to explain a process using two different scroll-driven layouts in the same page.' },
      { title: 'Journey and about pages', text: 'Combine with a [scroll SVG path draw](/ui-snippets/scroll-svg-path-draw/) for a drawn route, or lead into a [team card](/ui-snippets/team-card/) grid on an About page.' },
      { icon: 'CODE', title: 'Related: Three.js Scroll Moon Phases Cycle', desc: 'See the [Three.js Scroll Moon Phases Cycle](/ui-snippets/three-scroll-moon-phases/) for a related scroll pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the spine fill with scroll?', a: `A track with an inner gradient fill runs down the side, and one scrubbed tween animates the fill's height from 0 to 100% across the timeline (start: top 60% to end: bottom 70%). Because it is scrubbed, the line grows in step with the scrollbar and recedes when you scroll up — a continuous progress backbone for the milestones.` },
      { q: 'Why do the cards use toggleActions but the dots use onToggle?', a: `The cards need a one-time entrance, so toggleActions: play none none reverse plays them in on enter and reverses on leave. The dots need to reflect the current reading position, so onToggle lights the dot while its card is in a center band and reverts when it leaves. Each effect uses the ScrollTrigger mode that fits its behaviour.` },
      { q: 'How do the dots know when to light up?', a: `Each dot has a ScrollTrigger whose start and end define a band near the viewport center; its onToggle fires when the card enters or leaves that band, tweening the dot to a bright fill, accent border, and slight scale while active. This makes the dots a live you-are-here indicator that tracks scroll position independently of the card entrances.` },
      { q: 'Is the whole timeline reversible?', a: `Yes. The fill is scrubbed, the cards use a reversible toggleActions, and the dots revert on toggle-off, so scrolling up unwinds the spine, slides the cards back out, and dims the dots cleanly. Everything animates transforms, colors, height, and scale, all of which GSAP can play in both directions.` },
      { q: 'How do I use this scroll timeline dots in React, Vue, or Angular?', a: `In a mount effect, register ScrollTrigger and create the fill scrub plus per-card entrance and per-dot toggle triggers, scoped to refs. Return a cleanup that reverts the GSAP context so all triggers are removed on unmount. If milestones are dynamic, create the triggers after they render and call ScrollTrigger.refresh(). The CSS ports unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not need to untangle why three different ScrollTrigger modes are mixed in one snippet by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the spine fill uses a plain scrub, the cards use toggleActions with a reverse, and the dots use a separate onToggle callback, rather than one single approach for all three. The same assistant can help optimize it — for instance checking whether creating one ScrollTrigger.create call per dot scales fine for a dozen milestones or whether it should batch triggers for a much longer timeline. It is just as useful for extending the effect: ask it to add a small percentage label that tracks the fill, make the active dot pulse with a repeating scale animation instead of a static one, or let a milestone stay permanently lit once passed instead of dimming on scroll-up. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "scroll timeline dots" component in plain HTML, CSS, and JavaScript using GSAP and its ScrollTrigger plugin (load both from a CDN, no build step).

Requirements:
- A vertical timeline of milestone steps, each with a dot marker and a card, laid beside a track containing an inner fill element.
- Use one gsap.to tween with ease: none and scrub: true, tied to a ScrollTrigger on the whole timeline wrapper (start near the top of the viewport, end near the bottom), to animate the fill element's height from 0 to 100%, so the spine visually fills in step with scroll position and reverses when scrolling up.
- For each card, use a separate gsap.from tween (not scrubbed) that slides it in from an offset and fades it up, triggered by a ScrollTrigger with toggleActions set so the animation plays once on entering the viewport and reverses if the card scrolls back out of view, so it can replay on re-entry.
- For each dot, create an independent ScrollTrigger (via ScrollTrigger.create, not attached to a tween) whose start and end define a band near the vertical center of the viewport, and use its onToggle callback to tween the dot's background color, border color, and scale between a dim resting state and a bright active state depending on whether that trigger is currently active.
- The three behaviors (continuous scrub, one-time reversible entrance, and center-band active toggle) must each use the ScrollTrigger mode best suited to them — do not collapse them into a single timeline or a single trigger type.
- Everything must be layout-cheap: only height, transform, opacity, background-color, and border-color may be animated, nothing that forces reflow.`,
    },
  },
};

export default scrollTimelineDots;
