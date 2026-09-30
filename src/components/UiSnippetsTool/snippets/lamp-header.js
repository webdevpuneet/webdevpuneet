const lampHeader = {
  id: 'lamp-header',
  title: 'Lamp Header',
  lastmod: '2026-07-18',
  category: 'heroes',
  html: `<section class="lh-hero">
  <div class="lh-lamp" aria-hidden="true">
    <span class="lh-cone lh-left"></span>
    <span class="lh-cone lh-right"></span>
    <span class="lh-line"></span>
    <span class="lh-glow"></span>
  </div>
  <div class="lh-content">
    <h1 class="lh-title">Build something<br>that glows</h1>
    <p class="lh-sub">A spotlight-lamp hero that draws the eye straight to your headline.</p>
    <button type="button" class="lh-btn">Start free</button>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#020617;color:#fff}

.lh-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse 80% 60% at 50% -10%,rgba(30,41,59,.6),#020617)}

.lh-lamp{position:absolute;top:0;left:50%;transform:translateX(-50%);width:min(700px,92vw);height:340px;display:flex;justify-content:center}
.lh-cone{position:absolute;top:0;width:50%;height:300px;background-image:conic-gradient(from 70deg at center top,#22d3ee,transparent);filter:blur(2px)}
.lh-left{left:0;transform-origin:top right;mask-image:linear-gradient(to top,transparent,#000);-webkit-mask-image:linear-gradient(to top,transparent,#000);transform:skewX(-12deg) scaleX(-1)}
.lh-right{right:0;transform-origin:top left;mask-image:linear-gradient(to top,transparent,#000);-webkit-mask-image:linear-gradient(to top,transparent,#000);transform:skewX(12deg)}
.lh-line{position:absolute;top:300px;width:min(420px,70vw);height:2px;background:linear-gradient(90deg,transparent,#22d3ee,transparent);box-shadow:0 0 14px 2px rgba(34,211,238,.7);animation:lhWiden 2.4s ease forwards}
.lh-glow{position:absolute;top:280px;width:280px;height:120px;border-radius:50%;background:#22d3ee;filter:blur(70px);opacity:.5;animation:lhRise 2.4s ease forwards}
@keyframes lhWiden{from{width:0;opacity:0}to{opacity:1}}
@keyframes lhRise{from{opacity:0;transform:translateY(20px)}to{opacity:.5}}

.lh-content{position:relative;z-index:1;margin-top:120px;padding:0 20px;max-width:600px;animation:lhUp 1s .3s ease both}
@keyframes lhUp{from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:none}}
.lh-title{font-size:clamp(34px,7vw,64px);font-weight:900;letter-spacing:-.03em;line-height:1.05;background:linear-gradient(180deg,#fff,#94a3b8);-webkit-background-clip:text;background-clip:text;color:transparent}
.lh-sub{margin-top:16px;font-size:16px;color:#94a3b8;line-height:1.55}
.lh-btn{margin-top:26px;background:#22d3ee;color:#042f2e;border:none;border-radius:12px;padding:13px 26px;font-family:inherit;font-size:15px;font-weight:800;cursor:pointer;box-shadow:0 10px 36px -8px rgba(34,211,238,.6);transition:transform .15s}
.lh-btn:hover{transform:translateY(-2px)}`,

  js: `// The lamp is entirely CSS-animated. This tiny script lets visitors recolor
// the beam live to show how themeable the effect is via a CSS variable.
var hero = document.querySelector('.lh-hero');
var btn = document.querySelector('.lh-btn');
var THEMES = ['#22d3ee', '#a78bfa', '#f472b6', '#34d399', '#fbbf24'];
var i = 0;

function applyTheme(color) {
  document.querySelectorAll('.lh-cone').forEach(function (c) {
    c.style.backgroundImage = 'conic-gradient(from 70deg at center top,' + color + ',transparent)';
  });
  var line = document.querySelector('.lh-line');
  line.style.background = 'linear-gradient(90deg,transparent,' + color + ',transparent)';
  line.style.boxShadow = '0 0 14px 2px ' + color;
  document.querySelector('.lh-glow').style.background = color;
  btn.style.background = color;
}

// Double-click the hero to cycle the lamp color.
hero.addEventListener('dblclick', function () {
  i = (i + 1) % THEMES.length;
  applyTheme(THEMES[i]);
});`,

  seo: {
    title: 'Lamp Header — Free HTML CSS JS Spotlight Hero Snippet',
    description: `A dramatic lamp-spotlight hero where two light cones converge on a glowing line that widens to reveal the headline. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Lamp Header — Converging Light Cones and a Glowing Reveal Line',
      description: `The lamp header is the cinematic hero where two beams of light angle down from the top of the screen and meet at a bright horizontal line — like a stage spotlight — with the headline rising into the pool of light beneath it. This snippet recreates that dramatic effect entirely with CSS for the lighting, plus a tiny vanilla JavaScript helper to show how themeable it is.

**Light cones from conic gradients**

Each beam is a \`.lh-cone\` element filled with a \`conic-gradient\` that fades from a bright color to transparent, then skewed inward so the two cones angle toward each other at the top center. A vertical \`mask-image\` gradient fades each cone to transparent at the bottom, so the light appears to dissipate as it falls rather than ending in a hard edge. A slight \`blur(2px)\` softens the cone edges into a glow. The left cone is mirrored with \`scaleX(-1)\` so the pair is symmetric around the center line.

**The reveal line and glow**

Where the cones meet sits a thin horizontal \`.lh-line\` — a gradient that's transparent at both ends and bright cyan in the middle, with a \`box-shadow\` halo so it reads as a glowing filament. On load it animates from zero width outward via the \`lhWiden\` keyframe, so the lamp appears to "switch on" and spread. Behind it, a heavily blurred \`.lh-glow\` ellipse rises and fades in with \`lhRise\`, creating the soft pool of light that the headline sits in.

**Choreographed entrance**

The effect is sequenced for drama. The line widens and the glow rises over the first 2.4 seconds, while the content block fades up with \`lhUp\` on a 0.3s delay — so the light reveals first and the headline arrives into it, rather than everything appearing at once. The title itself uses a top-to-bottom \`background-clip: text\` gradient from white to slate, giving it a lit-from-above sheen consistent with the lamp metaphor.

**The radial stage background**

The hero's background is a radial gradient anchored above the top edge (\`at 50% -10%\`), darkening from a faint slate glow down to near-black. That subtle vignette makes the lamp light feel like it's emerging from offscreen darkness and keeps the focus dead center.

**Live theming via JavaScript**

The lighting is pure CSS, but to demonstrate how easily it re-themes, double-clicking the hero cycles the beam through five colors. \`applyTheme\` rewrites the conic gradients, the line gradient and shadow, the glow color, and the button in one pass — showing that the whole lamp is driven by a single accent color you could wire to a CSS custom property or a theme switch. Swap this for your brand color and the entire effect recolors.

**Customizing it**

Adjust the cone \`skewX\` angles to widen or narrow the beams, change the line and glow sizes, retime the \`lhWiden\` and \`lhRise\` durations for a slower switch-on, or anchor the radial background differently. Replace the double-click theming with a real theme toggle. Pair it with a [shimmer button](/ui-snippets/shimmer-button/) call to action or a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/) band below for a bold landing sequence.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Two light cones converge on a glowing line at the top center.` },
      { title: 'Watch it switch on', text: `The line widens and a soft glow rises as the headline fades up into it.` },
      { title: 'Read the lit headline', text: `The title carries a top-down gradient sheen matching the lamp.` },
      { title: 'Double-click the hero', text: `The whole lamp cycles to a new accent color.` },
      { title: 'Set your brand color', text: `Apply one accent to recolor cones, line, glow, and button.` },
      { title: 'Retime the entrance', text: `Adjust the widen and rise durations for more drama.` },
    ] },
    features: [
      { title: 'Conic-gradient cones', text: `Two skewed beams angle into the center.` },
      { title: 'Masked beam falloff', text: `A vertical mask fades the light as it falls.` },
      { title: 'Widening reveal line', text: `A glowing filament switches on from zero width.` },
      { title: 'Rising glow pool', text: `A blurred ellipse lights the headline area.` },
      { title: 'Choreographed entrance', text: `Light reveals, then content arrives into it.` },
      { title: 'Lit gradient title', text: `Top-down text gradient matches the lamp.` },
      { title: 'Radial stage vignette', text: `Dark surround focuses the eye center.` },
      { title: 'One-accent theming', text: `A single color recolors the entire lamp.` },
    ],
    useCases: [
      { title: 'Product launch heroes', text: `Spotlight a headline above a [shimmer button](/ui-snippets/shimmer-button/).` },
      { title: 'SaaS landing pages', text: `Open a page that flows into a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Event microsites', text: `Pair with a [scroll velocity marquee](/ui-snippets/scroll-velocity-marquee/).` },
      { title: 'Portfolio intros', text: `A dramatic alternative to a [minimal hero](/ui-snippets/minimal-hero/).` },
      { title: 'Announcement pages', text: `Light up a reveal over an [animated grid background](/ui-snippets/animated-grid-background/).` },
      { title: 'CSS lighting demos', text: `A reference for conic-gradient spotlight beams.` },
      { icon: 'CODE', title: 'Related: Hero with Animated Scroll Cue', desc: 'See the [Hero with Animated Scroll Cue](/ui-snippets/hero-scroll-cue-arrow/) for a related heroes pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How are the light beams made?', a: `Each beam is an element filled with a conic-gradient fading from a bright color to transparent, skewed inward with skewX so the two cones angle toward the top center. A vertical mask-image fades each cone out at the bottom so the light dissipates, and a small blur softens the edges into a glow. The left cone is mirrored with scaleX(-1) for symmetry.` },
      { q: 'What creates the switch-on effect?', a: `The horizontal line where the cones meet animates from zero width outward via the lhWiden keyframe, so the lamp appears to ignite and spread. Behind it a heavily blurred ellipse rises and fades in with lhRise, forming the soft pool of light the headline sits in. The content fades up on a short delay so the light reveals before the text arrives.` },
      { q: 'Is the whole effect a single color?', a: `Yes — the cones, the reveal line, its glow halo, the soft pool, and the button all share one accent color. The demo's applyTheme function rewrites all of them at once, which shows the lamp is driven by a single value you could store in a CSS custom property and change with a theme switch.` },
      { q: 'Why does the headline look lit from above?', a: `The title uses a background-clip: text gradient running top-to-bottom from white to slate gray. That makes the top of each letter brighter than the bottom, consistent with light coming from the lamp overhead, which ties the typography into the spotlight metaphor.` },
      { q: 'How do I use this lamp header in React, Vue, or Angular?', a: `The markup and CSS port directly. Drive the accent color from a prop or CSS variable and set it on the cones, line, glow, and button so theming is one value. The entrance keyframes run on mount automatically; if you re-trigger them, toggle a key or class. Replace the double-click handler with your real theme control. In Tailwind, build the cones with bg-[conic-gradient(...)] and mask utilities.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to reason through the layered gradients on your own. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the conic-gradient plus skewX plus mask-image combination produces two beams that converge and fade out at the bottom, or why the lhWiden and lhRise keyframes are timed to finish just before the content's lhUp animation starts. The same assistant can help optimize it, for example checking whether stacking blur filters on the cones and the glow ellipse is costly to repaint on lower-end GPUs, or whether the applyTheme function's four separate style rewrites could be collapsed into a single CSS custom property update. It is just as useful for extending the effect, such as wiring the accent color to a real theme toggle instead of double-click cycling, adding a second pair of narrower beams for a busier stage look, or making the lamp intensity respond to scroll position. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "lamp header" hero in plain HTML, CSS, and JavaScript using only conic-gradient beams and CSS keyframe animations for the lighting — no canvas, no SVG filters, no animation library.

Requirements:
- Two beam elements positioned at the top center of the hero, each filled with a conic-gradient that fades from a bright accent color to transparent, then skewed with skewX in opposite directions so the pair angles inward and appears to converge toward the center.
- Each beam must have a vertical mask-image gradient (transparent at the bottom fading to opaque at the top) so the light appears to dissipate as it falls rather than ending in a hard edge, plus a small blur filter to soften its edges into a glow. Mirror one beam horizontally so the pair is symmetric.
- A thin horizontal line element where the beams converge, using a gradient that is transparent at both ends and bright in the middle with a glowing box-shadow, animated from zero width to full width on page load so it looks like the lamp switching on.
- A separate heavily blurred, low-opacity ellipse behind the line that fades in and rises slightly on load, forming a soft pool of light beneath the beams.
- The headline and supporting content must fade up into view on a short delay after the light animations begin, not simultaneously with them, so the light visibly arrives first and the text appears to rise into the lit area.
- A single JavaScript function that re-themes the entire effect (both beam gradients, the line's gradient and shadow color, the glow ellipse's color, and the call-to-action button's background) from one accent color value, triggered by a double-click on the hero, to demonstrate that the whole effect is driven by a single themeable color.`,
    },
  },
};

export default lampHeader;
