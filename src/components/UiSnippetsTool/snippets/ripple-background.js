const rippleBackground = {
  id: 'ripple-background',
  title: 'Ripple Background',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<section class="rp-hero">
  <div class="rp-ripple" id="rpRipple" aria-hidden="true"></div>
  <div class="rp-content">
    <div class="rp-core">📡</div>
    <h1>Always broadcasting</h1>
    <p>Concentric rings pulse outward from the center — and from wherever you click.</p>
  </div>
</section>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#06060f;color:#fff}

.rp-hero{position:relative;min-height:100vh;overflow:hidden;display:flex;align-items:center;justify-content:center;text-align:center;background:radial-gradient(ellipse at center,#11112a,#06060f 70%)}

.rp-ripple{position:absolute;inset:0;display:grid;place-items:center}
.rp-circle{position:absolute;border-radius:50%;border:1px solid rgba(129,140,248,.4);animation:rpPulse 4s ease-out infinite}
@keyframes rpPulse{0%{transform:scale(0);opacity:.7}100%{transform:scale(1);opacity:0}}

.rp-burst{position:absolute;border-radius:50%;border:1.5px solid rgba(34,211,238,.7);pointer-events:none;animation:rpBurst .9s ease-out forwards}
@keyframes rpBurst{from{width:0;height:0;opacity:.8}to{width:340px;height:340px;opacity:0}}

.rp-content{position:relative;z-index:1;padding:0 20px;max-width:560px;pointer-events:none}
.rp-core{width:84px;height:84px;margin:0 auto 22px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;background:linear-gradient(160deg,#312e81,#6366f1);box-shadow:0 0 60px -8px rgba(99,102,241,.8)}
.rp-content h1{font-size:clamp(32px,7vw,60px);font-weight:900;letter-spacing:-.03em}
.rp-content p{margin-top:14px;font-size:16px;color:#9a9ac0;line-height:1.55}`,

  js: `var host = document.getElementById('rpRipple');
var RINGS = 6, MAX = 680, GAP = 4 / 6;   // 6 rings over the 4s loop

// Build evenly-staggered concentric rings so a new one always emerges as the
// outermost fades — a continuous radar pulse from the center.
for (var i = 0; i < RINGS; i++) {
  var c = document.createElement('span');
  c.className = 'rp-circle';
  c.style.width = MAX + 'px';
  c.style.height = MAX + 'px';
  c.style.animationDelay = (-i * GAP).toFixed(2) + 's';
  host.appendChild(c);
}

// Click anywhere to fire a one-shot ripple from that point.
var hero = document.querySelector('.rp-hero');
hero.addEventListener('pointerdown', function (e) {
  var r = hero.getBoundingClientRect();
  var b = document.createElement('span');
  b.className = 'rp-burst';
  b.style.left = (e.clientX - r.left) + 'px';
  b.style.top = (e.clientY - r.top) + 'px';
  b.style.transform = 'translate(-50%,-50%)';
  hero.appendChild(b);
  b.addEventListener('animationend', function () { b.remove(); });
});`,

  seo: {
    title: 'Ripple Background — Free HTML CSS JS Radar Pulse Snippet',
    description: `A hero backdrop of concentric rings pulsing outward from the center in a continuous radar loop, plus a click-to-ripple burst. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Ripple Background — Concentric Radar Rings That Pulse Outward',
      description: `The ripple background is the radar-like hero where concentric rings continuously expand from a central point and fade as they grow — evoking a signal broadcasting outward. This snippet builds it with plain HTML, CSS, and a little vanilla JavaScript, and adds a satisfying click-to-ripple burst from wherever you tap.

**The continuous center pulse**

The steady radar effect comes from several rings sharing one expand-and-fade animation but starting at different times. JavaScript creates six \`.rp-circle\` rings, all the same maximum size, and gives each a negative \`animation-delay\` spaced evenly across the loop (\`-i * (loop / count)\`). The negative delay means each ring starts already partway through its animation, so at any moment the rings are at six different sizes — one just emerging at the center while another fades at the edge. The result is a smooth, never-gapping pulse rather than all rings firing together. The \`rpPulse\` keyframe scales each ring from \`0\` to \`1\` while fading opacity from \`.7\` to \`0\`.

**Why negative delays instead of positive**

Using negative \`animation-delay\` is the trick that makes the loop look established from the very first frame. A positive delay would mean the rings stagger in over the first few seconds, leaving the hero empty at load; a negative delay starts each ring as if the animation had been running forever, so the full radar is present immediately. This is the standard technique for seamless, pre-warmed looping emitters.

**Click-to-ripple bursts**

Beyond the ambient pulse, a \`pointerdown\` anywhere on the hero spawns a one-shot \`.rp-burst\` ring at the exact click point. It grows from zero to 340px and fades over 0.9s, then removes itself on \`animationend\` so bursts never accumulate. Centering it with \`translate(-50%, -50%)\` at the click coordinates makes the ripple emanate from your finger, like dropping a stone in water. This interactive layer makes the otherwise passive backdrop respond to the user.

**A glowing core**

At the center sits a glowing emblem (here a broadcast icon) with a soft \`box-shadow\`, anchoring the rings as the source of the signal. The content sits above the ripple layer with \`pointer-events: none\` (so clicks still reach the hero to spawn bursts), and a radial background gradient darkens toward the edges to frame the pulse.

**All CSS animation**

Both the ambient rings and the click bursts are pure CSS keyframes; JavaScript only creates elements and wires the click. So the per-frame work is on the compositor, and the effect stays smooth even with several rings animating at once.

**Customizing it**

Change \`RINGS\` and \`MAX\` for more or larger rings, retime the loop, recolor the ring borders, or adjust the burst size and speed. Make the rings filled instead of outlined, or anchor the source off-center. Pair it with a [pulse button](/ui-snippets/pulse-button/) call to action or an [aurora text](/ui-snippets/aurora-text/) headline for a signal-themed hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Concentric rings pulse outward from a glowing core.` },
      { title: 'Watch the radar', text: `New rings emerge at the center as outer ones fade.` },
      { title: 'Click anywhere', text: `A ripple burst expands from the click point.` },
      { title: 'Click repeatedly', text: `Each burst cleans itself up after fading.` },
      { title: 'Adjust the rings', text: `Change RINGS and MAX for count and size.` },
      { title: 'Recolor the pulse', text: `Edit the ring border colors.` },
    ] },
    features: [
      { title: 'Continuous radar pulse', text: `Staggered rings expand and fade forever.` },
      { title: 'Negative-delay warmup', text: `The full loop is present at first frame.` },
      { title: 'Click-to-ripple', text: `A burst spawns at the tap point.` },
      { title: 'Self-cleaning bursts', text: `Each removes itself on animationend.` },
      { title: 'Glowing source core', text: `A central emblem anchors the signal.` },
      { title: 'Framing vignette', text: `A radial gradient darkens the edges.` },
      { title: 'Click-through content', text: `Taps reach the hero through the text.` },
      { title: 'Pure-CSS animation', text: `JS only creates and wires elements.` },
    ],
    useCases: [
      { title: 'Signal and radar heroes', text: 'Pair with a [pulse button](/ui-snippets/pulse-button/) call to action, with concentric rings expanding from the centre in a continuous loop.' },
      { title: 'Live and broadcast pages', text: 'Echo a live state from a [status dashboard](/ui-snippets/status-dashboard/), as the rings evoke a signal broadcasting outward.' },
      { title: 'IoT and network sites', text: 'Set the mood near a [particle network](/ui-snippets/particle-network/), with negative animation delays making the full loop present on the first frame.' },
      { title: 'Announcement headlines', text: 'Frame an [aurora text](/ui-snippets/aurora-text/) headline for an announcement, with expanding rings that fade softly as they grow outward.' },
      { title: 'Click-to-ripple interactions', text: 'Spawn a burst at the tap point on click, with each one removing itself on `animationend` so the DOM stays clean.' },
    ],
    faqs: [
      { q: 'How do the rings pulse continuously without a gap?', a: `Six rings share one expand-and-fade keyframe but each gets a negative animation-delay spaced evenly across the loop. That offsets them so at any moment they sit at six different sizes — one emerging at the center while another fades at the edge — producing a smooth, never-gapping radar pulse instead of all rings firing together.` },
      { q: 'Why use negative animation-delay?', a: `A negative delay starts each ring as if the animation had already been running, so the full radar is present from the very first frame at load. A positive delay would stagger the rings in over the first seconds, leaving the hero empty initially. Negative delays are the standard way to pre-warm a seamless looping emitter.` },
      { q: 'How does the click ripple work?', a: `A pointerdown anywhere on the hero creates a burst element at the click coordinates, centered with translate(-50%,-50%). It grows from zero to 340px and fades over 0.9 seconds via a CSS keyframe, then removes itself on animationend so bursts never accumulate. The ripple emanates from exactly where you tapped.` },
      { q: 'Can I still click through the headline?', a: `Yes. The content layer is set to pointer-events: none, so taps on the headline pass through to the hero and still spawn a ripple burst. The ambient rings layer is also non-interactive, so only the hero receives the pointerdown that creates bursts.` },
      { q: 'How do I use this ripple background in React, Vue, or Angular?', a: `Render the ambient rings from an array with their negative delays, and handle pointerdown to append a burst element via a ref (or render a managed list and prune on animationend). Keep cleanup in mind so bursts are removed. The keyframes are pure CSS. In Tailwind, define the pulse and burst animations in the config and apply staggered delays with arbitrary values.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to work out the stagger math by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why each ambient ring gets a negative animation-delay computed as index times a fraction of the loop duration, and why a negative delay produces an already-running radar effect on the very first frame instead of a staggered fade-in. The same assistant can help you optimize it — ask whether animating six separate ring elements independently is measurably different in performance from animating one ring with a repeating box-shadow trick, and whether the click-burst elements could leak if animationend never fires (for instance if the tab is backgrounded during the animation). It's also useful for extending the effect: ask it to make the burst ripple ring color vary based on click position, add a subtle sound cue on click, or replace the fixed six rings with a count derived from viewport size for a denser effect on large screens. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an animated "radar pulse" hero background in plain HTML, CSS, and JavaScript — concentric rings continuously expanding from the center, plus a one-shot ripple on click — no canvas, no library.

Requirements:
- Generate a fixed number of ring elements in JavaScript (not hardcoded in HTML), all sharing one CSS keyframe animation that scales a ring from 0 to full size while fading its opacity from a starting value to 0.
- Give each generated ring a negative animation-delay, evenly spaced across the total loop duration divided by the ring count (e.g. ring index times negative loop-duration-over-count), so that at page load the rings already appear mid-cycle at staggered sizes rather than all starting together from zero.
- Add a pointerdown listener on the whole hero section that computes the click coordinates relative to the section's bounding rectangle, creates a new one-shot ring element centered exactly on that point (using a translate transform to center it on its own coordinates), and plays a separate expand-and-fade keyframe animation on it.
- Remove each one-shot click ring from the DOM automatically when its animationend event fires, so rapid repeated clicking never accumulates leftover elements.
- Keep the visible text content non-interactive (pointer-events none) so that clicks on the headline still pass through to the hero section and trigger a ripple, while the ambient background rings layer must also not block clicks.
- Add a glowing circular emblem at the exact center that anchors the rings visually as their source.`,
    },
  },
};

export default rippleBackground;
