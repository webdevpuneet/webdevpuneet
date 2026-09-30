const auroraGradientFooter = {
  id: 'aurora-gradient-footer',
  title: 'Aurora Gradient Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<footer class="agf">
  <div class="agf-aurora" aria-hidden="true">
    <span class="agf-blob b1"></span>
    <span class="agf-blob b2"></span>
    <span class="agf-blob b3"></span>
  </div>
  <div class="agf-inner">
    <div class="agf-cta">
      <h2>Ready when you are.</h2>
      <p>Start free — no credit card, cancel anytime.</p>
      <a href="#" class="agf-btn">Start building <span>→</span></a>
    </div>
    <div class="agf-cols">
      <div class="agf-col">
        <h4>Product</h4>
        <a href="#">Features</a><a href="#">Integrations</a><a href="#">Changelog</a>
      </div>
      <div class="agf-col">
        <h4>Company</h4>
        <a href="#">About</a><a href="#">Careers</a><a href="#">Blog</a>
      </div>
      <div class="agf-col">
        <h4>Resources</h4>
        <a href="#">Docs</a><a href="#">Community</a><a href="#">Support</a>
      </div>
    </div>
    <div class="agf-bottom">
      <span class="agf-brand">◆ Fluxly</span>
      <span>© 2026 Fluxly, Inc. — All rights reserved.</span>
    </div>
  </div>
</footer>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#05070d}

.agf{position:relative;overflow:hidden;background:#05070d;border-top:1px solid rgba(255,255,255,0.06)}

.agf-aurora{position:absolute;inset:0;pointer-events:none;filter:blur(60px);opacity:.55}
.agf-blob{position:absolute;border-radius:50%}
.b1{width:420px;height:420px;background:radial-gradient(circle,#6366f1,transparent 70%);top:-140px;left:6%;animation:drift1 16s ease-in-out infinite}
.b2{width:380px;height:380px;background:radial-gradient(circle,#ec4899,transparent 70%);top:-80px;right:8%;animation:drift2 20s ease-in-out infinite}
.b3{width:320px;height:320px;background:radial-gradient(circle,#22d3ee,transparent 70%);bottom:-160px;left:38%;animation:drift3 18s ease-in-out infinite}

@keyframes drift1{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(60px,40px) scale(1.15)}}
@keyframes drift2{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(-50px,30px) scale(0.9)}}
@keyframes drift3{0%,100%{transform:translate(0,0) scale(1)}50%{transform:translate(30px,-30px) scale(1.1)}}

.agf-inner{position:relative;z-index:1;max-width:960px;margin:0 auto;padding:80px 24px 32px}

.agf-cta{text-align:center;margin-bottom:64px}
.agf-cta h2{font-size:clamp(28px,5vw,42px);font-weight:800;color:#f8fafc;letter-spacing:-.02em}
.agf-cta p{font-size:15px;color:#94a3b8;margin-top:10px}
.agf-btn{display:inline-flex;align-items:center;gap:8px;margin-top:24px;background:#fff;color:#0f172a;font-size:14px;font-weight:700;padding:12px 24px;border-radius:10px;text-decoration:none;transition:transform .15s,box-shadow .15s}
.agf-btn:hover{transform:translateY(-2px);box-shadow:0 12px 30px rgba(255,255,255,0.15)}
.agf-btn span{transition:transform .15s}
.agf-btn:hover span{transform:translateX(3px)}

.agf-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;padding-bottom:36px;border-bottom:1px solid rgba(255,255,255,0.08)}
.agf-col h4{font-size:12px;font-weight:700;color:#f1f5f9;text-transform:uppercase;letter-spacing:.06em;margin-bottom:14px}
.agf-col{display:flex;flex-direction:column;gap:10px}
.agf-col a{color:#94a3b8;font-size:13.5px;text-decoration:none;transition:color .15s}
.agf-col a:hover{color:#f1f5f9}

.agf-bottom{display:flex;align-items:center;justify-content:space-between;padding-top:22px;gap:16px;flex-wrap:wrap}
.agf-brand{font-weight:800;color:#c7d2fe;font-size:14px}
.agf-bottom span:last-child{font-size:12px;color:#475569}

@media (max-width:640px){
  .agf-cols{grid-template-columns:1fr 1fr;gap:28px 16px}
  .agf-bottom{flex-direction:column;align-items:flex-start}
}`,
  js: '',
  seo: {
    title: 'Aurora Gradient Footer — Free HTML CSS Animated Background Footer',
    description: 'A dark footer with a drifting aurora gradient behind a final CTA and link columns — pure CSS animation, no JavaScript, no canvas. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Aurora Gradient Footer — A Living Background Behind a Static CTA',
      description: `A footer's final CTA competes for attention with everything the user just scrolled past. This snippet borrows the ambient-glow trick from modern SaaS hero sections — three large, blurred, slowly drifting colour blobs — and puts it behind the footer's closing pitch instead, so the last thing on the page feels alive rather than like an afterthought bolted on once the content ran out.

**Three blobs, three independent drift paths**

\`.agf-aurora\` is an absolutely positioned layer holding three \`radial-gradient\` circles, each roughly 350–420px, positioned to overlap loosely across the top and bottom of the footer. Each blob runs its own \`@keyframes\` — \`drift1\`, \`drift2\`, \`drift3\` — translating and scaling on a different duration (16s, 20s, 18s) and a different path. Giving each blob its own timing is what stops the animation from reading as one thing pulsing; three independent, slightly-out-of-sync motions is what makes it feel organic rather than mechanical, the same principle behind [aurora background](/ui-snippets/aurora-bg/) hero effects.

**One \`blur()\` on the parent, not three**

Rather than blurring each blob individually, \`filter: blur(60px)\` sits on the \`.agf-aurora\` wrapper and applies to all three children at once. This is both simpler to tune — one blur radius controls the whole effect's softness — and cheaper: the browser composites the blurred layer once rather than filtering three separate elements every frame. \`opacity: .55\` on the same wrapper keeps the effect ambient rather than distracting from the text sitting above it.

**Content sits in its own stacking layer**

Everything the user actually reads — the CTA, the link columns, the bottom bar — lives inside \`.agf-inner\` at \`position: relative; z-index: 1\`, one paint layer above the aurora. This is the same content-above-effect separation used in the [glare card](/ui-snippets/glare-card/): the ambient motion never has to fight for legibility because it is structurally behind the text, not blended with it.

**A CTA that earns the space, then a real footer beneath it**

The upper half is a single centred call to action — the loudest, simplest moment on the page. Below it, a conventional three-column link grid and a slim bottom bar handle the actual navigational duty, separated by a hairline border. Splitting the footer this way means the aurora effect only has to carry the emotional close of the page; it doesn't have to compete with a dense link directory sitting in the same visual field.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML and CSS', text: 'The aurora blobs start drifting immediately on load — no JavaScript is used.' },
        { title: 'Adjust the blob colours', text: 'Each .agf-blob\'s radial-gradient starts with a hex colour — change b1/b2/b3 to match your brand palette.' },
        { title: 'Tune the drift speed and blur', text: 'Edit the animation-duration on each keyframe for faster or slower movement, and blur(60px) on .agf-aurora for a sharper or softer glow.' },
        { title: 'Update the CTA and link columns', text: 'Replace the headline, subtext, button text, and the three link columns with your own content.' },
        { title: 'Check performance on a low-end device', text: 'The blur is GPU-composited but still worth testing — if it stutters on older hardware, reduce blob size or blur radius rather than removing the animation entirely.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Three independently timed, drifting radial-gradient blobs for an organic ambient glow',
      'One shared blur() filter on the parent layer instead of filtering each blob separately',
      'Content sits in its own z-index layer above the effect for guaranteed legibility',
      'Centred CTA section above a conventional three-column link grid and bottom bar',
      'Pure CSS animation — no canvas, no JavaScript, no external library',
      'Responsive: link columns collapse to two per row below 640px',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'SaaS and AI product marketing sites', desc: 'A footer that visually echoes an aurora hero section elsewhere on the page, so the final CTA feels like part of the same designed experience rather than a generic close-out.' },
      { icon: 'APP', title: 'Product launch and landing pages', desc: 'Give the last conversion opportunity on the page the same visual weight and motion as the hero, instead of letting energy drop off toward the bottom of the scroll.' },
      { icon: 'FLOW', title: 'Portfolio and agency closing sections', desc: 'An ambient, premium-feeling background for a "let\'s talk" closing CTA without needing a video or WebGL background.' },
      { icon: 'STAR', title: 'Dark-themed developer tool sites', desc: 'Fits naturally alongside a dark, gradient-forward design system — pair it with a matching aurora or spotlight hero for visual consistency top to bottom.' },
      { icon: 'LEARN', title: 'Studying layered CSS animation', desc: 'A clean reference for staggering multiple independent keyframe animations and separating an ambient effect from foreground content with z-index.' },
      { icon: 'CODE', title: 'A/B testing footer engagement', desc: 'Compare click-through on the closing CTA against a static-background footer to see whether ambient motion measurably affects conversion at the bottom of the page.' },
      { icon: 'CODE', title: 'Related: Minimal Footer', desc: 'See the [Minimal Footer](/ui-snippets/minimal-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Sitemap Directory Footer', desc: 'See the [Sitemap Directory Footer](/ui-snippets/footer-directory-sitemap/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Business Hours Status Footer', desc: 'See the [Business Hours Status Footer](/ui-snippets/footer-business-hours-status/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Careers Teaser Footer', desc: 'See the [Careers Teaser Footer](/ui-snippets/footer-careers-teaser/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Will the drifting animation hurt page performance?', a: 'It should be lightweight on any reasonably modern device — the blobs animate transform and the blur is applied once to a parent wrapper rather than per element, so the browser compositor handles most of the work off the main thread. If you notice stutter on low-end hardware, reduce blob size or blur radius before removing the animation, and consider gating it behind prefers-reduced-motion.' },
      { q: 'Why does the blur sit on the wrapper instead of on each blob?', a: 'Filtering three separate elements individually is more expensive than filtering one shared parent layer once. It also means a single blur(60px) value controls the softness of the entire effect, rather than needing to keep three blur values in sync.' },
      { q: 'How do I stop the aurora from ever overlapping the text?', a: 'It already cannot — the aurora layer is position: absolute with no z-index, and all real content lives inside .agf-inner at position: relative; z-index: 1, placing it in a higher paint layer. The effect is structurally behind the content, not blended with it.' },
      { q: 'Can I use more or fewer than three blobs?', a: 'Yes. Each blob is an independent span with its own keyframe animation, so you can add a fourth with a new drift path and duration, or remove one — just keep each blob\'s timing distinct from the others so the motion continues to read as organic rather than synchronized.' },
      { q: 'Does this respect prefers-reduced-motion?', a: 'Not out of the box — add a @media (prefers-reduced-motion: reduce) block that sets animation: none on each .agf-blob to freeze the blobs in place for users who have that OS setting enabled, while keeping the static gradient colours visible.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. The animation is pure CSS keyframes, so no lifecycle code is needed — the conversion is a direct markup and class-name translation.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI assistant like Claude and ask it to explain why each blob uses a different animation-duration rather than all three sharing one timing — and what the footer would look like (and why it would look worse) if all three moved in perfect sync. It's also a good candidate for a performance pass: ask the assistant to identify whether any properties beyond transform and opacity are being animated per-frame that could be moved to composited-only properties, and whether reducing blob count or blur radius would meaningfully help on low-end mobile GPUs. For extending it, ask for a prefers-reduced-motion variant that freezes the blobs while keeping their gradients visible, or for the blob colours to be driven by CSS custom properties so an entire theme swap is a single JavaScript-set variable rather than editing each gradient by hand.`,
      prompt: `Build an "aurora gradient" website footer in plain HTML and CSS only — no JavaScript, no canvas, no external library.

Requirements:
- A dark footer container with an absolutely positioned background layer holding three large radial-gradient circular blobs (roughly 350-420px each), each in a different accent colour (e.g. indigo, pink, cyan), fading to transparent at their edges.
- Give each blob its own @keyframes animation with a distinct duration (in the 16-20 second range) and a distinct translate/scale drift path, so the three blobs move independently and never synchronize — this is essential to the effect reading as organic rather than mechanical.
- Apply a single shared blur filter (around 60px) and a reduced opacity to the parent background layer rather than blurring each blob individually, for both simplicity and performance.
- Above the aurora layer, in its own stacked z-index context, place real footer content: a centred call-to-action section (headline, subtext, a white pill button with an arrow that shifts right on hover), followed by a three-column link grid separated by a hairline border, and a slim bottom bar with a brand mark and copyright.
- Make it fully responsive: the link columns should collapse from three to two per row below 640px, and the bottom bar should stack on narrow screens.
- Keep all animation restricted to transform and opacity so it stays smooth and GPU-composited.`,
    },
  },
};

export default auroraGradientFooter;
