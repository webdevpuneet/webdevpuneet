const marqueeFooter = {
  id: 'marquee-footer',
  title: 'Marquee Footer',
  lastmod: '2026-08-17',
  category: 'footers',
  html: `<footer class="mqf">
  <div class="mqf-marquee" aria-hidden="true">
    <div class="mqf-track">
      <span>Start building</span><span class="mqf-dot">·</span>
      <span>Ship faster</span><span class="mqf-dot">·</span>
      <span>Start building</span><span class="mqf-dot">·</span>
      <span>Ship faster</span><span class="mqf-dot">·</span>
      <span>Start building</span><span class="mqf-dot">·</span>
      <span>Ship faster</span><span class="mqf-dot">·</span>
      <span>Start building</span><span class="mqf-dot">·</span>
      <span>Ship faster</span><span class="mqf-dot">·</span>
    </div>
  </div>

  <div class="mqf-inner">
    <span class="mqf-brand">◆ Fluxly</span>
    <nav class="mqf-links" aria-label="Footer">
      <a href="#">Product</a><a href="#">Pricing</a><a href="#">Docs</a><a href="#">Blog</a><a href="#">Contact</a>
    </nav>
    <span class="mqf-copy">© 2026 Fluxly, Inc.</span>
  </div>
</footer>`,
  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0f1e}

.mqf{border-top:1px solid rgba(255,255,255,0.08);overflow:hidden}

.mqf-marquee{width:100%;overflow:hidden;padding:26px 0;border-bottom:1px solid rgba(255,255,255,0.08);
  -webkit-mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);
  mask:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.mqf-track{display:flex;align-items:center;width:max-content;animation:mqfScroll 22s linear infinite}
.mqf-track span{font-size:clamp(28px,5vw,48px);font-weight:800;letter-spacing:-.02em;color:#f1f5f9;white-space:nowrap;padding:0 10px}
.mqf-dot{color:#6366f1 !important;font-weight:400}

@keyframes mqfScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}

.mqf:hover .mqf-track{animation-play-state:paused}

.mqf-inner{max-width:960px;margin:0 auto;padding:20px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap}
.mqf-brand{font-weight:800;color:#f1f5f9;font-size:14px}
.mqf-links{display:flex;gap:20px;flex-wrap:wrap}
.mqf-links a{font-size:13px;color:#94a3b8;text-decoration:none;transition:color .15s}
.mqf-links a:hover{color:#f1f5f9}
.mqf-copy{font-size:12px;color:#475569}

@media (max-width:640px){
  .mqf-inner{flex-direction:column;text-align:center}
}
@media (prefers-reduced-motion: reduce){
  .mqf-track{animation:none}
  .mqf-marquee{overflow-x:auto}
}`,
  js: '',
  seo: {
    title: 'Marquee Footer — Free HTML CSS Auto-Scrolling Text Footer Snippet',
    description: 'A footer topped with a huge, continuously scrolling marquee of brand words — pure CSS animation, pauses on hover, fades at the edges. No JavaScript, no dependency.',
    about: {
      title: 'Marquee Footer — A Continuously Scrolling Band, Built With Zero JavaScript',
      description: `The oversized, endlessly scrolling word band has become a recognisable closing gesture on agency and product sites — it's motion with no functional job beyond signalling "this brand has energy," which makes it a good fit specifically for a footer, where there's no content hierarchy left to protect. This snippet builds the effect the same way the site's standalone [Marquee](/ui-snippets/marquee/) does, scaled up to footer-headline size and paired with a slim, conventional link row underneath.

**Duplicate the content once, animate to exactly -50%**

The core trick is deceptively simple: \`.mqf-track\` contains the same sequence of words twice in a row, laid out with \`display: flex; width: max-content\` so the track is exactly twice as wide as one copy of the content. A \`@keyframes\` animation moves it from \`translateX(0)\` to \`translateX(-50%)\` — precisely one copy's width — over 22 seconds, linear. Because the second copy is identical to the first, the instant the animation resets from -50% back to 0%, the visual is indistinguishable from where it started; there's no visible seam or jump, just an apparently infinite loop built from a track that's secretly only two repeats long.

**Why \`width: max-content\` isn't optional**

Without \`width: max-content\`, the flex track would shrink or grow to fit its parent's width rather than its content's natural width, which breaks the "-50% equals exactly one copy" math the whole animation depends on. \`max-content\` forces the track to be exactly as wide as its content demands, so the halfway point of the animation always lands exactly where the first copy ends and the second begins.

**Masking the hard edges**

\`-webkit-mask\` / \`mask: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)\` fades the marquee's opacity to zero at both edges of its container. Without this, words would appear to be cut off mid-character at the left and right boundaries as they scroll past — the mask gives the illusion that text is fading into the page edges rather than being clipped by a hard rectangle.

**Pausing on hover, and turning it off entirely**

\`.mqf:hover .mqf-track { animation-play-state: paused }\` freezes the scroll the moment a cursor enters the footer, which matters for a footer specifically because it often contains real, clickable content (the link row below) that a user might be trying to read or interact with while the marquee is technically still "behind" their attention. A separate \`prefers-reduced-motion: reduce\` query removes the animation and switches the track to \`overflow-x: auto\`, so motion-sensitive users get a manually scrollable strip instead of continuous, uncontrollable movement.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML and CSS', text: 'A large, continuously scrolling word band renders above a standard link row — no JavaScript is used.' },
        { title: 'Hover the footer', text: 'The marquee pauses while your cursor is anywhere inside the footer, then resumes when you leave.' },
        { title: 'Edit the marquee words', text: 'Replace the repeated span content — keep the sequence duplicated exactly twice for the loop to stay seamless.' },
        { title: 'Adjust the scroll speed', text: 'Change the 22s duration in @keyframes mqfScroll — shorter is faster, longer is slower.' },
        { title: 'Update the link row and copyright', text: 'Replace the brand, footer links, and copyright text in .mqf-inner with your own.' },
        { title: 'Export in your format', text: 'Click HTML, JSX, or Tailwind to download the version you need.' },
      ],
    },
    features: [
      'Seamless infinite scroll from doubled content and a precise translateX(-50%) animation',
      'Edge-fading CSS mask instead of a hard content cutoff at the container boundary',
      'Pauses automatically on hover so the marquee never fights with real footer links for attention',
      'prefers-reduced-motion fallback that removes the animation and makes the strip manually scrollable',
      'Pure CSS animation — no JavaScript, no canvas, no dependency',
      'Large, adjustable clamp() type scale that stays readable across screen sizes',
    ],
    useCases: [
      { icon: 'DESIGN', title: 'Agency and portfolio site closings', desc: 'A high-energy, motion-forward final gesture that signals craft and confidence at the very end of a scroll — a common closing move on award-nominated agency sites.' },
      { icon: 'FLOW', title: 'Product launch and campaign pages', desc: 'Use the marquee to repeat a single campaign phrase or tagline ("Now shipping" · "Join the waitlist") as a footer-level reinforcement of the page\'s core message.' },
      { icon: 'APP', title: 'Music, media, and entertainment sites', desc: 'The scrolling-marquee aesthetic pairs naturally with sites already leaning into bold, kinetic typography elsewhere in the design.' },
      { icon: 'STAR', title: 'Event and conference landing pages', desc: 'Cycle sponsor names, session tracks, or a repeating date/CTA phrase across the footer band of a single-page event site.' },
      { icon: 'LEARN', title: 'Studying seamless CSS marquee loops', desc: 'A clear, minimal reference for the doubled-content-plus-translateX(-50%) technique that underlies every CSS-only infinite scroll, without a JavaScript ticker library.' },
      { icon: 'CODE', title: 'Design systems adding a motion accent', desc: 'A footer-scale example to validate the marquee pattern and its reduced-motion fallback before reusing it elsewhere — a hero strip, a logo cloud, a testimonial ticker.' },
      { icon: 'CODE', title: 'Related: Footer with Mobile Accordion Collapse', desc: 'See the [Footer with Mobile Accordion Collapse](/ui-snippets/footer-accordion-mobile-collapse/) for a related footers pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Social Magnet Footer', desc: 'See the [Social Magnet Footer](/ui-snippets/social-magnet-footer/) for a related footers pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is the content duplicated instead of using a single copy?', a: 'The animation moves the track exactly -50% of its total width, which by construction equals the width of one copy of the content. Because the second copy is identical to the first, the loop point is invisible — the track appears to scroll forever even though only two repeats actually exist in the DOM.' },
      { q: 'Why does the track use width: max-content?', a: 'Without it, the flex track would size itself to its parent container rather than to the natural width of its content, which breaks the assumption that -50% equals exactly one copy\'s width. max-content forces the track to be exactly as wide as the doubled content requires.' },
      { q: 'How do I change how fast the marquee scrolls?', a: 'Edit the duration in the @keyframes mqfScroll animation declaration (default 22s) — a shorter duration scrolls faster, a longer one scrolls slower. The distance travelled (-50%) does not need to change.' },
      { q: 'Does the marquee ever stop, or does it scroll forever?', a: 'It scrolls continuously by default, but pauses the instant the cursor enters the footer via animation-play-state: paused on hover, and stops entirely for users with prefers-reduced-motion: reduce enabled, who get a manually scrollable strip instead.' },
      { q: 'Why does the text fade out at the edges instead of just getting cut off?', a: 'A CSS mask (linear-gradient from transparent to opaque to transparent) is applied to the marquee\'s container, fading its opacity toward both edges. Without it, characters would appear abruptly clipped by the container\'s hard rectangular boundary as they scroll past.' },
      { q: 'How do I use this in React, Vue, or Angular?', a: 'Click JSX, Vue, or Angular to download the converted component. Since the animation is pure CSS with no JavaScript behaviour, the conversion is a direct markup and class-name translation — just keep the duplicated content sequence intact.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML and CSS into an AI coding assistant like Claude and ask it to explain precisely why the content must be duplicated exactly twice (not three or four times) for the translateX(-50%) animation to loop seamlessly, and what would visually happen — a visible jump or gap — if you changed the animation's end value without also changing how many times the content repeats. It's also worth asking for an accessibility pass: since the marquee text is marked aria-hidden, confirm that the same information (if any is meaningful rather than purely decorative) is available elsewhere on the page for screen reader users. For extending it, ask for a version with two rows scrolling in opposite directions for a busier effect, or one where the scroll speed subtly increases based on how far down the page the user has scrolled, tying the motion to engagement rather than a fixed timer.`,
      prompt: `Build a website footer topped with a large, continuously scrolling "marquee" text band, in plain HTML and CSS only — no JavaScript, no canvas.

Requirements:
- A full-width marquee strip above the main footer content, containing a flex track with a short repeating phrase (or a couple of alternating phrases separated by a small dot character) rendered at large, bold display type (roughly 28-48px, responsive via clamp()) in a single row.
- Duplicate the entire sequence of phrases exactly twice inside the track so the track's total content is precisely double one full repeat, then animate the track from translateX(0) to translateX(-50%) linearly over roughly 20-25 seconds, looping infinitely — this exact doubling is what makes the loop seamless with no visible jump.
- Give the track width: max-content so its width is determined by its content rather than its container, which the -50% animation math depends on.
- Apply a CSS mask (linear-gradient from transparent to opaque to transparent, horizontally) to the marquee's outer container so the scrolling text fades out at both edges instead of being abruptly clipped.
- Pause the scroll animation when the user's cursor is anywhere over the footer (using animation-play-state: paused via a hover selector on the footer), and resume it on mouseleave.
- Add a prefers-reduced-motion media query that removes the animation entirely and makes the marquee container horizontally scrollable instead, for users who have that OS setting enabled.
- Below the marquee, include a slim, conventional footer row: a brand name, a handful of navigation links, and a copyright line.`,
    },
  },
};

export default marqueeFooter;
