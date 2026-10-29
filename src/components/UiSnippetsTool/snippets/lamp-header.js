const lampHeader = {
  id: 'lamp-header',
  title: 'Lamp Header',
  lastmod: '2026-10-29',
  category: 'heroes',
  html: `<section class="lh-hero" id="lhHero">
  <div class="lh-lamp" aria-hidden="true">
    <span class="lh-cone lh-left"></span>
    <span class="lh-cone lh-right"></span>
    <span class="lh-glow-wide"></span>
    <span class="lh-glow-core"></span>
    <span class="lh-line"></span>
  </div>
  <div class="lh-content">
    <span class="lh-pill">Spotlight hero</span>
    <h1 class="lh-title">Build something<br>that glows</h1>
    <p class="lh-sub">Two beams converge on a glowing filament and light up your headline. Pure CSS, one accent color.</p>
    <div class="lh-actions">
      <button type="button" class="lh-btn">Start free</button>
      <button type="button" class="lh-btn lh-ghost">See how it works</button>
    </div>
    <div class="lh-swatches" role="group" aria-label="Lamp color">
      <span class="lh-swatch-label">Lamp color</span>
      <button type="button" class="lh-swatch is-on" data-color="#22d3ee" style="--s:#22d3ee" aria-label="Cyan"></button>
      <button type="button" class="lh-swatch" data-color="#a78bfa" style="--s:#a78bfa" aria-label="Violet"></button>
      <button type="button" class="lh-swatch" data-color="#f472b6" style="--s:#f472b6" aria-label="Pink"></button>
      <button type="button" class="lh-swatch" data-color="#34d399" style="--s:#34d399" aria-label="Green"></button>
      <button type="button" class="lh-swatch" data-color="#fbbf24" style="--s:#fbbf24" aria-label="Amber"></button>
    </div>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;background:#020617;color:#fff}

.lh-hero{--lh-c:#22d3ee;--lh-w:min(32rem,64vw);position:relative;min-height:min(100vh,720px);overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding:250px 20px 60px;text-align:center;background:#020617}

/* The lamp: everything is positioned from the top-center "filament" line */
.lh-lamp{position:absolute;top:130px;left:50%;width:0;height:0}
.lh-cone{position:absolute;top:0;width:var(--lh-w);height:15rem;opacity:.55;animation:lhCone .9s .2s ease-out forwards;
  -webkit-mask-image:linear-gradient(to top,transparent,#000 75%),linear-gradient(var(--lh-fade),transparent,#000 45%);-webkit-mask-composite:source-in;
  mask-image:linear-gradient(to top,transparent,#000 75%),linear-gradient(var(--lh-fade),transparent,#000 45%);mask-composite:intersect}
.lh-left{right:0;--lh-fade:to right;background-image:conic-gradient(from 70deg at center top,var(--lh-c),transparent,transparent)}
.lh-right{left:0;--lh-fade:to left;background-image:conic-gradient(from 290deg at center top,transparent,transparent,var(--lh-c))}
@keyframes lhCone{from{width:calc(var(--lh-w) / 2);opacity:.4}to{width:var(--lh-w);opacity:1}}

/* Glows are clipped at the filament so the light looks like it pours out of the line */
.lh-glow-wide,.lh-glow-core{position:absolute;left:0;transform:translateX(-50%);border-radius:50%;background:var(--lh-c);clip-path:inset(50% -50% -50% -50%)}
.lh-glow-wide{top:-4.5rem;width:calc(var(--lh-w) * .8);height:9rem;filter:blur(56px);opacity:.5}
.lh-glow-core{top:-4.5rem;width:16rem;height:9rem;filter:blur(40px);opacity:.75;animation:lhCore .9s .2s ease-out both}
@keyframes lhCore{from{width:8rem;opacity:0}to{width:16rem;opacity:.75}}

.lh-line{position:absolute;top:-1px;left:0;transform:translateX(-50%);height:2px;width:var(--lh-w);background:var(--lh-c);border-radius:2px;
  box-shadow:0 0 18px 3px color-mix(in srgb,var(--lh-c) 70%,transparent);animation:lhWiden .9s .2s ease-out both}
@keyframes lhWiden{from{width:calc(var(--lh-w) / 2);opacity:.4}to{width:var(--lh-w);opacity:1}}

.lh-content{position:relative;z-index:2;max-width:640px;animation:lhUp .9s .5s cubic-bezier(.2,.7,.2,1) both}
@keyframes lhUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:none}}
.lh-pill{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--lh-c);border:1px solid color-mix(in srgb,var(--lh-c) 45%,transparent);background:color-mix(in srgb,var(--lh-c) 10%,transparent);padding:5px 14px;border-radius:99px;margin-bottom:22px}
.lh-title{font-size:clamp(38px,7.2vw,72px);font-weight:900;letter-spacing:-.035em;line-height:1.1;padding-bottom:.08em;background:linear-gradient(180deg,#fff 20%,#8b9bb4);-webkit-background-clip:text;background-clip:text;color:transparent}
.lh-sub{margin:18px auto 0;max-width:480px;font-size:17px;color:#94a3b8;line-height:1.6}
.lh-actions{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:30px}
.lh-btn{background:var(--lh-c);color:#04121c;border:1px solid transparent;border-radius:12px;padding:13px 26px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 12px 36px -10px var(--lh-c);transition:transform .15s,background .3s,box-shadow .3s}
.lh-btn:hover{transform:translateY(-2px)}
.lh-ghost{background:rgba(255,255,255,.05);color:#e2e8f0;border-color:rgba(255,255,255,.14);box-shadow:none;font-weight:700}
.lh-ghost:hover{background:rgba(255,255,255,.1)}

.lh-swatches{display:flex;align-items:center;justify-content:center;gap:10px;margin-top:38px}
.lh-swatch-label{font-size:12px;color:#64748b;margin-right:4px}
.lh-swatch{width:22px;height:22px;border-radius:50%;border:2px solid #020617;background:var(--s);cursor:pointer;box-shadow:0 0 0 1px rgba(255,255,255,.18);transition:transform .15s,box-shadow .15s}
.lh-swatch:hover{transform:scale(1.15)}
.lh-swatch.is-on{box-shadow:0 0 0 2px var(--s)}

@media (prefers-reduced-motion:reduce){.lh-cone,.lh-glow-core,.lh-line,.lh-content{animation:none}.lh-cone{opacity:1}}`,

  js: `// The lamp is pure CSS and driven by one custom property, --lh-c.
// The swatches show how one accent color recolors beams, glow, line, pill and button.
var hero = document.getElementById('lhHero');
var swatches = document.querySelectorAll('.lh-swatch');

swatches.forEach(function (sw) {
  sw.addEventListener('click', function () {
    hero.style.setProperty('--lh-c', sw.dataset.color);
    swatches.forEach(function (s) { s.classList.toggle('is-on', s === sw); });
  });
});`,

  seo: {
    title: 'Lamp Header — Free HTML CSS JS Spotlight Hero Snippet',
    description: `Spotlight lamp hero: two conic-gradient beams converge on a glowing line that lights the headline. One CSS variable recolors it. Copy the HTML, CSS & JS.`,
    about: {
      title: 'Lamp Header — Converging Light Cones and a Glowing Reveal Line',
      description: `The lamp header is the cinematic hero where two beams of light angle down from the top of the screen and meet at a bright horizontal line — like a stage spotlight — with the headline rising into the pool of light beneath it. This snippet recreates that dramatic effect entirely with CSS for the lighting, plus a tiny vanilla JavaScript helper to show how themeable it is.

**Light cones from conic gradients**

Each beam is a \`.lh-cone\` element filled with a \`conic-gradient\` that fades from the accent color to transparent. The left cone sits to the left of the center line with its gradient starting at \`from 70deg at center top\`, and the right cone mirrors it with \`from 290deg\`, so the lit rays of both angle in toward the middle, like the two sides of a stage spotlight. Two stacked masks, intersected with \`mask-composite\`, fade each beam out: one fades the bottom so the light dissipates as it falls, and one fades the outer edge so there is no hard side boundary. Because the fade is a mask rather than a dark overlay, the beams work on any background.

**The filament and the glow**

Where the beams meet sits \`.lh-line\`, a 2px bar in the accent color with a \`box-shadow\` halo, so it reads as a glowing filament. Two blurred ellipses (\`.lh-glow-wide\` and \`.lh-glow-core\`) sit on that line and are cut in half with \`clip-path: inset(50% ...)\`, so only the half below the line shows. That makes the light look like it pours out of the line instead of floating around it.

**Choreographed entrance**

The effect is sequenced for drama. The beams and line widen outward from the center (\`lhCone\`, \`lhWiden\`) and the core glow grows (\`lhCore\`) over the first second, then the content block fades up with \`lhUp\` on a short delay, so the light switches on first and the headline arrives into it, rather than everything appearing at once. The title itself uses a top-to-bottom \`background-clip: text\` gradient from white to slate, giving it a lit-from-above sheen consistent with the lamp metaphor.

**The radial stage background**

The hero's background is a radial gradient anchored above the top edge (\`at 50% -10%\`), darkening from a faint slate glow down to near-black. That subtle vignette makes the lamp light feel like it's emerging from offscreen darkness and keeps the focus dead center.

**One custom property drives the color**

The beams, line, glows, pill and primary button all read the same custom property, \`--lh-c\`, on the hero. The swatch row under the buttons sets it with one line of JavaScript (\`hero.style.setProperty('--lh-c', color)\`), and the whole lamp recolors at once. In your own project, set \`--lh-c\` to your brand color in CSS and delete the script.

**Customizing it**

Change \`--lh-w\` to widen or narrow the whole lamp, change the conic \`from\` angles to spread the beams, retime \`lhCone\`, \`lhWiden\` and \`lhCore\` for a slower switch-on, or move the lamp by changing \`.lh-lamp { top }\`. Replace the swatches with a real theme toggle, or remove them. Pair it with a [shimmer button](/ui-snippets/shimmer-button/) call to action or a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/) band below for a bold landing sequence.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two light cones converge on a glowing line at the top center.` },
      { title: 'Watch it switch on', text: `The line widens and a soft glow rises as the headline fades up into it.` },
      { title: 'Read the lit headline', text: `The title carries a top-down gradient sheen matching the lamp.` },
      { title: 'Click a color swatch', text: `The whole lamp, pill and button switch to that accent color.` },
      { title: 'Set your brand color', text: `Set --lh-c once in CSS to recolor beams, line, glows and button.` },
      { title: 'Retime the entrance', text: `Adjust the lhCone, lhWiden and lhCore durations for more drama.` },
    ] },
    features: [
      { title: 'Conic-gradient cones', text: `Two mirrored beams angle into the center.` },
      { title: 'Masked beam falloff', text: `Intersected masks fade the light at the bottom and outer edge.` },
      { title: 'Widening reveal line', text: `A glowing filament switches on from zero width.` },
      { title: 'Half-clipped glow', text: `Blurred glows cut at the line, so light pours out of the filament.` },
      { title: 'Choreographed entrance', text: `Light reveals, then content arrives into it.` },
      { title: 'Lit gradient title', text: `Top-down text gradient matches the lamp.` },
      { title: 'Radial stage vignette', text: `Dark surround focuses the eye center.` },
      { title: 'One-variable theming', text: `--lh-c recolors the entire lamp, with live swatches to try it.` },
      { title: 'Presentable hero', text: `Pill badge, two buttons and a readable gradient headline included.` },
    ],
    useCases: [
      { title: 'Product launch heroes', text: 'Spotlight a headline above a [shimmer button](/ui-snippets/shimmer-button/), with two conic-gradient cones converging on a glowing line.' },
      { title: 'Feature tour openers', text: 'Open a page that flows into a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/), with a widening filament that switches on from zero width.' },
      { title: 'Event microsites', text: 'Pair with a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/) for drama, using a vertical mask to fade the light as it falls.' },
      { title: 'Portfolio intros', text: 'Offer a dramatic alternative to a [minimal hero](/ui-snippets/minimal-hero/), with a blurred ellipse lighting the headline area.' },
      { title: 'Announcement pages', text: 'Light up a reveal over an [animated grid background](/ui-snippets/animated-grid-background/), and study conic-gradient spotlights as a CSS lighting reference.' },
      { icon: 'CODE', title: 'Related: Hero with Animated Scroll Cue', desc: 'See the [Hero with Animated Scroll Cue](/ui-snippets/hero-scroll-cue-arrow/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the light beams made?', a: `Each beam is an element filled with a conic-gradient from the accent color to transparent. The left one starts at 70deg and the right one at 290deg, so their lit rays angle in toward the center. Two intersected mask-image gradients fade each beam at the bottom and at its outer edge so the light dissipates.` },
      { q: 'What creates the switch-on effect?', a: `The beams and the line where they meet widen outward from the center (lhCone and lhWiden), and a core glow grows with lhCore. The content fades up on a short delay so the light reveals before the text arrives.` },
      { q: 'Is the whole effect a single color?', a: `Yes. The beams, line, glows, pill and button all read the --lh-c custom property on the hero. The swatches change it with setProperty, so one value recolors everything, and you can set it once in CSS to match your brand.` },
      { q: 'Why does the headline look lit from above?', a: `The title uses a background-clip: text gradient running top-to-bottom from white to slate gray. That makes the top of each letter brighter than the bottom, consistent with light coming from the lamp overhead, which ties the typography into the spotlight metaphor.` },
      { q: 'How do I use this lamp header in React, Vue, or Angular?', a: `The markup and CSS port directly. Pass the accent color as a prop and set --lh-c on the hero element, so theming is one value. The entrance keyframes run on mount automatically; if you re-trigger them, toggle a key or class. Replace the swatches with your real theme control. In Tailwind, build the cones with bg-[conic-gradient(...)] and mask utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reason through the layered gradients on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the mirrored conic-gradients plus the intersected mask-image pair produce two beams that converge and fade out at the bottom and outer edges, or why the lhCone, lhWiden and lhCore keyframes finish just as the content's lhUp animation starts. The same assistant can help optimize it, for example checking whether the two blurred glow ellipses are costly to repaint on lower-end GPUs, or whether clipping blurred glows with clip-path is cheaper than layering extra blur filters. It is just as useful for extending the effect, such as wiring --lh-c to a real theme toggle instead of the swatches, adding a second pair of narrower beams for a busier stage look, or making the lamp intensity respond to scroll position. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "lamp header" hero in plain HTML, CSS, and a little JavaScript using only conic-gradient beams and CSS keyframe animations for the lighting. No canvas, no SVG filters, no animation library.

Requirements:
- A dark (#020617) hero with a lamp anchored at the top center. Everything is positioned from a single point on that line.
- Two beam elements, each about 32rem wide and 15rem tall, filled with a conic-gradient from an accent color to transparent. The left beam sits left of center and starts at "from 70deg at center top"; the right beam sits right of center and starts at "from 290deg at center top", with the accent at the end of its gradient. Together they angle in and converge on the center.
- Fade each beam with two intersected masks (mask-composite: intersect, plus the -webkit- prefixed version): one that fades the bottom to transparent and one that fades the outer edge, so the light dissipates with no hard edges.
- A thin 2px filament line at the convergence point in the accent color with a glowing box-shadow, plus two blurred ellipses (a wide dim one and a smaller bright core) centered on the line and cut in half with clip-path: inset(50% -50% -50% -50%) so the light only appears below the line.
- On load, the beams and line widen outward from half width to full, and the core glow grows, over about 0.9s. The headline block fades up shortly after so the light arrives first.
- Content: a small pill label, a large headline with a white-to-slate gradient (add bottom padding so descenders are not clipped by background-clip: text), a subtitle, a primary and a ghost button, and a row of five color swatch buttons.
- Drive all colors from one CSS custom property, --lh-c, on the hero (beams, line, glows, pill, primary button). Clicking a swatch calls hero.style.setProperty('--lh-c', color) and marks that swatch active.
- Respect prefers-reduced-motion by disabling the animations.`,
    },
  },
};

export default lampHeader;
