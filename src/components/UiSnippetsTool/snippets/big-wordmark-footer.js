const bigWordmarkFooter = {
  id: 'big-wordmark-footer',
  title: 'Big Wordmark Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<footer class="bwf" id="bwfFooter">
  <div class="bwf-top">
    <nav class="bwf-links" aria-label="Footer">
      <a href="#">Work</a><a href="#">Studio</a><a href="#">Journal</a><a href="#">Contact</a>
    </nav>
    <a href="#" class="bwf-cta">Start a project <span>↗</span></a>
  </div>

  <h2 class="bwf-word" id="bwfWord">Fluxly</h2>

  <div class="bwf-bottom">
    <span>© 2026 Fluxly Studio</span>
    <div class="bwf-socials">
      <a href="#" aria-label="Twitter">Tw</a>
      <a href="#" aria-label="Instagram">Ig</a>
      <a href="#" aria-label="Dribbble">Dr</a>
    </div>
  </div>
</footer>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#050608}

.bwf{padding:56px 32px 32px;border-top:1px solid rgba(255,255,255,0.08);overflow:hidden}

.bwf-top{display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;max-width:1100px;margin:0 auto}
.bwf-links{display:flex;gap:26px;flex-wrap:wrap}
.bwf-links a{color:#94a3b8;font-size:13.5px;text-decoration:none;transition:color .15s}
.bwf-links a:hover{color:#f1f5f9}
.bwf-cta{display:inline-flex;align-items:center;gap:6px;color:#f1f5f9;font-size:13.5px;font-weight:600;text-decoration:none;border-bottom:1px solid rgba(255,255,255,0.25);padding-bottom:2px;transition:border-color .15s}
.bwf-cta:hover{border-color:#f1f5f9}
.bwf-cta span{transition:transform .15s}
.bwf-cta:hover span{transform:translate(2px,-2px)}

.bwf-word{
  max-width:1100px;margin:38px auto;text-align:center;
  font-size:clamp(64px,15vw,220px);font-weight:900;letter-spacing:-.04em;line-height:.9;
  background:radial-gradient(600px circle at var(--mx,50%) var(--my,20%), #ffffff 0%, #a5b4fc 32%, #312e5c 62%, #1a1a2e 100%);
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;color:transparent;
  transition:background-position .3s ease;
  cursor:default;user-select:none
}

.bwf-bottom{display:flex;align-items:center;justify-content:space-between;max-width:1100px;margin:0 auto;padding-top:22px;border-top:1px solid rgba(255,255,255,0.06);gap:16px;flex-wrap:wrap}
.bwf-bottom span{font-size:12px;color:#475569}
.bwf-socials{display:flex;gap:16px}
.bwf-socials a{color:#64748b;font-size:12px;font-weight:700;text-decoration:none;transition:color .15s}
.bwf-socials a:hover{color:#f1f5f9}

@media (max-width:640px){
  .bwf-top{flex-direction:column;align-items:flex-start}
  .bwf-bottom{flex-direction:column;align-items:flex-start}
}
@media (prefers-reduced-motion: reduce){
  .bwf-word{transition:none}
}`,
  js: `var footer = document.getElementById('bwfFooter');
var word = document.getElementById('bwfWord');

footer.addEventListener('pointermove', function (e) {
  var rect = word.getBoundingClientRect();
  var mx = ((e.clientX - rect.left) / rect.width) * 100;
  var my = ((e.clientY - rect.top) / rect.height) * 100;
  word.style.setProperty('--mx', mx + '%');
  word.style.setProperty('--my', my + '%');
});

footer.addEventListener('pointerleave', function () {
  word.style.setProperty('--mx', '50%');
  word.style.setProperty('--my', '20%');
});`,
  seo: {
    title: 'Big Wordmark Footer — Free HTML CSS JS Oversized Brand Name Footer',
    description: 'A footer built around one huge brand wordmark with a pointer-tracked gradient sheen, using background-clip: text and CSS custom properties. No canvas, no dependency.',
    about: {
      title: 'Big Wordmark Footer — A Gradient Spotlight Painted Through Text',
      description: `An oversized brand wordmark as the last thing on the page is a closing statement more than a navigational element — the kind of moment agency and portfolio sites use to leave a visitor with one clear impression of the name before they leave. This snippet adds a second layer to that idea: the wordmark's gradient fill follows the cursor, so the giant letters catch light exactly like brushed metal or glass would under a moving spotlight.

**Cutting a gradient into the shape of the text**

The core technique is \`background-clip: text\` (with the \`-webkit-\` prefix for Safari) combined with \`color: transparent\`. Instead of colouring the text directly, \`.bwf-word\` paints a \`radial-gradient\` across its own background, then that background is clipped to exactly the shape of the letters — so what you see is the gradient showing through cut-out type, not a solid colour. Because the fill is a gradient rather than a flat colour, the letters can have a bright, glinting centre and a dark falloff at the edges, the same way real light behaves on a curved or reflective surface.

**The gradient's centre is a variable, not a fixed value**

The radial-gradient's position is \`var(--mx, 50%) var(--my, 20%)\` — two CSS custom properties with sensible defaults so the wordmark still looks intentional before any pointer interaction happens. A \`pointermove\` handler on the footer converts the cursor's position within the wordmark's bounding box into 0–100% fractions and writes them straight to those two custom properties. Because the gradient itself references the variables, updating two numbers is enough to move the entire highlight — there's no need to regenerate or replace the gradient string on every move.

**A CSS transition, not a per-frame loop**

\`transition: background-position .3s ease\` on \`.bwf-word\` smooths every custom-property update the JS makes, so despite the JavaScript only ever setting raw values with no easing logic of its own, the visual result glides rather than snapping. This is the same "let CSS interpolate, let JS just set the target" division of labour used throughout the snippet library's pointer-driven effects — the browser's transition engine already does the interpolation work, so there's nothing to reimplement in \`requestAnimationFrame\`.

**Resting state, and why it's off-centre**

On \`pointerleave\`, the custom properties reset to \`50% 20%\` — horizontally centred, but with the highlight sitting slightly above true vertical centre. A perfectly centred glow at rest looks static and slightly clinical; nudging it upward gives the wordmark a subtle top-lit quality even when nobody's pointer is anywhere near it, so the resting state doesn't look like a bug waiting for interaction to "fix" it.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A huge, gradient-filled brand wordmark renders with a soft highlight sitting slightly above centre.' },
        { title: 'Move the pointer over the footer', text: 'The gradient\'s highlight follows the cursor across the wordmark, brightening whichever letters are nearest.' },
        { title: 'Leave the footer', text: 'The highlight eases back to its default resting position rather than snapping.' },
        { title: 'Replace the wordmark text', text: 'Change the text inside #bwfWord to your own brand name — the clamp() font-size keeps it responsive automatically.' },
        { title: 'Tune the gradient colours', text: 'Edit the radial-gradient stops in .bwf-word to match your brand palette, keeping a bright centre and a darker falloff for the light-catching effect.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'background-clip: text radial-gradient fill instead of a flat text colour',
      'Pointer-tracked gradient position via two CSS custom properties, --mx and --my',
      'CSS transition handles all easing — no requestAnimationFrame loop in the JavaScript',
      'Sensible default gradient position so the wordmark looks intentional before any interaction',
      'Fluid clamp() type scale that stays legible from mobile to ultra-wide screens',
      'prefers-reduced-motion aware — removes the smoothing transition for reduced-motion users',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Creative agency and studio sites', desc: 'A striking, tactile closing statement for the page — the brand name itself becomes the final piece of visual craft rather than a plain text logo.' },
      { icon: 'STAR', title: 'Portfolio and personal brand sites', desc: 'Gives a solo designer or developer\'s site a closing moment with real production polish, using nothing more than a gradient and a pointer handler.' },
      { icon: 'FLOW', title: 'Product launch and campaign pages', desc: 'End a single-page launch with the product name rendered at full visual weight, reinforcing brand recall as the very last thing a visitor sees.' },
      { icon: 'APP', title: 'Fashion, luxury, and lifestyle brand sites', desc: 'The light-catching gradient effect suits brands already leaning into a premium, tactile visual language elsewhere on the page.' },
      { icon: 'LEARN', title: 'Studying background-clip: text and custom properties', desc: 'A compact, real example of clipping a gradient to text shape and driving its position with pointer-set CSS custom properties instead of JavaScript-computed background-position strings.' },
      { icon: 'CODE', title: 'Design systems building a signature closing moment', desc: 'A reusable pattern for any "last thing on the page" brand treatment, independent of what the rest of the footer looks like.' },
      { icon: 'CODE', title: 'Related: Aurora Gradient Footer', desc: 'See the [Aurora Gradient Footer](/ui-snippets/aurora-gradient-footer/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Newsletter Subscribe Footer with Validation', desc: 'See the [Newsletter Subscribe Footer with Validation](/ui-snippets/newsletter-subscribe-footer-validated/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Legal & Compliance Bottom Bar', desc: 'See the [Legal & Compliance Bottom Bar](/ui-snippets/footer-legal-bar/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Docs Footer with Version Selector', desc: 'See the [Docs Footer with Version Selector](/ui-snippets/footer-docs-version-selector/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Minimal Single-Page App Footer', desc: 'See the [Minimal Single-Page App Footer](/ui-snippets/footer-minimal-spa/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the gradient get "cut" into the shape of the letters?', a: 'background-clip: text (with the -webkit- prefix for broader support) clips an element\'s background to exactly the shape of its text glyphs, while color: transparent hides the text\'s own fill so only the clipped background shows through. The result is a gradient visible only where the letters are.' },
      { q: 'Why does the JavaScript only set CSS custom properties instead of animating anything?', a: 'The custom properties --mx and --my feed directly into the radial-gradient\'s position, and a CSS transition on background-position handles all the easing. This division of labour — JavaScript sets the target value, CSS interpolates toward it — avoids a manual requestAnimationFrame loop entirely.' },
      { q: 'Why is the gradient not centred at rest?', a: 'The default position (50% 20%) sits the highlight slightly above true centre so the wordmark reads as top-lit even with no pointer nearby, rather than looking flat or like it\'s waiting for something to happen.' },
      { q: 'Does this work on touch devices?', a: 'The gradient position updates on pointermove, which does not fire from a static touch, so on mobile the wordmark simply displays at its default resting gradient position — a fully legible, intentional-looking static state rather than a broken interactive one.' },
      { q: 'Can I use a different shape than a radial gradient?', a: 'Yes — background-clip: text works with any CSS background value, including linear-gradient, conic-gradient, or even a background-image. A radial gradient was chosen here because its circular falloff most convincingly mimics a moving light source.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Attach the pointermove and pointerleave handlers via a ref to the footer element and write the custom properties directly to the wordmark\'s ref, avoiding a state update (and re-render) on every pointer move.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how background-clip: text combined with color: transparent produces the cut-out effect, and why a radial-gradient specifically (rather than a linear one) is what sells the "light catching the surface" illusion here. It's also worth asking about the touch-device fallback: since pointermove never fires from a static tap, confirm the default gradient position genuinely looks complete and intentional on mobile rather than like a half-finished desktop effect. For extending it, ask for a version where the gradient's colour stops shift based on scroll position (so the wordmark's mood changes as the user approaches the footer), or one that adds a second, offset gradient layer behind the text for a subtle chromatic-aberration effect on hover.`,
      prompt: `Build a website footer centred around one oversized brand wordmark with a pointer-tracked gradient sheen, in plain HTML, CSS, and vanilla JavaScript — no canvas, no library.

Requirements:
- A footer with a top row (a handful of navigation links plus a "Start a project" call-to-action with an arrow that shifts on hover), a huge centred brand wordmark in the middle, and a bottom row (copyright plus a few social text links).
- The wordmark should use a fluid font-size via clamp() so it scales from roughly 64px on mobile up to over 200px on very wide screens, with tight letter-spacing and a bold weight.
- Fill the wordmark's text using background-clip: text (with the -webkit- prefix) and color: transparent, where the background is a radial-gradient with a bright near-white centre fading through a mid brand colour to a dark edge — positioned at CSS custom properties (e.g. var(--mx, 50%) var(--my, 20%)) rather than a fixed position, so the gradient's centre point can be moved via JavaScript without rewriting the gradient string.
- Add a pointermove listener on the footer that converts the cursor's position within the wordmark's bounding box into 0-100% x/y fractions and writes them to those two custom properties, so the gradient's highlight visually follows the cursor across the letters.
- On pointerleave, reset the custom properties to their default resting values (centred horizontally, slightly above vertical centre) rather than removing them.
- Apply a CSS transition to background-position on the wordmark so the highlight glides between positions instead of snapping, and add a prefers-reduced-motion query that removes that transition for users who have it enabled.`,
    },
  },
};

export default bigWordmarkFooter;
