const flipLink = {
  id: 'flip-link',
  title: 'Flip Link',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<nav class="fl-nav" id="flNav">
  <a href="#" class="fl-link" data-text="Home">Home</a>
  <a href="#" class="fl-link" data-text="Work">Work</a>
  <a href="#" class="fl-link" data-text="About">About</a>
  <a href="#" class="fl-link" data-text="Contact">Contact</a>
</nav>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0b12;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;gap:20px}

.fl-nav{display:flex;flex-direction:column;gap:6px}
.fl-link{position:relative;display:block;overflow:hidden;text-decoration:none;font-size:clamp(36px,8vw,72px);font-weight:900;letter-spacing:-.03em;line-height:1.02;color:#f4f4f8;white-space:nowrap}

/* Each letter is wrapped in a span by JS. On hover, the top copy slides up and
   out while a duplicate slides in from below — a vertical flip per letter. */
.fl-char{display:inline-block;position:relative;transition:transform .4s cubic-bezier(.6,0,.2,1);transition-delay:calc(var(--i) * 22ms)}
.fl-link:hover .fl-char{transform:translateY(-100%)}
.fl-char::after{content:attr(data-c);position:absolute;left:0;top:100%;color:#818cf8}
.fl-char[data-c=' ']{width:.35em}`,

  js: `var links = Array.prototype.slice.call(document.querySelectorAll('.fl-link'));

links.forEach(function (link) {
  var text = link.getAttribute('data-text');
  link.textContent = '';
  // Wrap each character in a span carrying its own index (for stagger) and a
  // data-c copy used by the ::after pseudo as the incoming flipped letter.
  text.split('').forEach(function (ch, i) {
    var span = document.createElement('span');
    span.className = 'fl-char';
    span.style.setProperty('--i', i);
    span.setAttribute('data-c', ch);
    span.textContent = ch;
    link.appendChild(span);
  });
  // On hover the stagger runs forward; on leave, reverse it so letters near the
  // cursor's exit flip back first.
  link.addEventListener('pointerenter', function () {
    link.querySelectorAll('.fl-char').forEach(function (s, i) {
      s.style.transitionDelay = (i * 22) + 'ms';
    });
  });
  link.addEventListener('pointerleave', function () {
    var n = link.querySelectorAll('.fl-char').length;
    link.querySelectorAll('.fl-char').forEach(function (s, i) {
      s.style.transitionDelay = ((n - 1 - i) * 22) + 'ms';
    });
  });
});`,

  seo: {
    title: 'Flip Link — Free HTML CSS JS Per-Letter Hover Snippet',
    description: `Big navigation links whose letters flip vertically one-by-one on hover, swapping to an accent-colored copy on a stagger. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Flip Link — Per-Letter Vertical Flip Navigation',
      description: `The flip link is the oversized navigation effect on editorial and agency sites: hover a menu item and each letter rolls vertically one after another, the original sliding up and out while a duplicate in an accent color rolls in from below. This snippet builds it with plain HTML, CSS, and a small vanilla JavaScript splitter, using only transforms and a pseudo-element — no duplicated markup per word.

**Splitting text into per-letter spans**

On load, JavaScript clears each link's text and rewraps every character in its own \`.fl-char\` span. Each span stores its index in a \`--i\` custom property (for the stagger) and its character in a \`data-c\` attribute. Wrapping letters individually is required because the flip animates each one separately — you can't transform parts of a single text node — and the per-letter index is what enables the cascading roll.

**The flip with one pseudo-element**

Each letter span shows its character normally, and its \`::after\` pseudo-element renders the same character (via \`content: attr(data-c)\`) positioned directly below it at \`top: 100%\` in the accent color. The span has \`overflow: hidden\` on the link, so only the top copy is visible at rest. On hover the span translates up by \`-100%\`: the original slides out the top while the \`::after\` duplicate slides into view from the bottom. Because both copies move together inside the clipped link, it reads as a single letter flipping over — and it needs no second copy of the word in the HTML.

**The staggered cascade**

The signature roll comes from \`transition-delay: calc(var(--i) * 22ms)\`, so each letter starts its flip 22ms after the previous one. The result is a wave that sweeps across the word left to right rather than every letter flipping at once. This small delay-per-index is the whole trick behind the premium, kinetic feel.

**Reversing on exit**

To make the effect feel physical, the JavaScript flips the stagger direction on leave: \`pointerenter\` sets ascending delays (first letter first), while \`pointerleave\` sets descending delays (last letter first). So the word rolls in from the front and rolls back from the end, giving the animation a sense of follow-through instead of simply replaying backward in lockstep.

**Spaces handled**

Space characters get an explicit width via a \`[data-c=' ']\` rule so multi-word links keep their gaps, since an empty inline-block span would otherwise collapse.

**Why transforms and a pseudo-element**

Using \`translateY\` on \`inline-block\` spans keeps the animation GPU-friendly and smooth even at the large font sizes these links use. Rendering the incoming letter as a \`::after\` rather than a second DOM node halves the element count and keeps the markup to one clean word per link — the split happens in script.

**Customizing it**

Change the \`22ms\` step for a faster or slower cascade, swap the accent color of the \`::after\`, adjust the cubic-bezier for a snappier or softer roll, or split on words instead of letters for a chunkier flip. Pair it with a [fullscreen menu](/ui-snippets/fullscreen-menu/) overlay or a [floating pill nav](/ui-snippets/floating-pill-nav/) for a complete navigation system.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A stack of large navigation links renders.` },
      { title: 'Hover a link', text: `Its letters flip vertically one after another, left to right.` },
      { title: 'See the accent copy', text: `Each incoming letter arrives in an accent color.` },
      { title: 'Leave the link', text: `The flip reverses from the end for follow-through.` },
      { title: 'Tune the cascade', text: `Change the per-letter delay step.` },
      { title: 'Recolor the flip', text: `Edit the ::after accent color and easing.` },
    ] },
    features: [
      { title: 'Per-letter split', text: `JS wraps each character in its own span.` },
      { title: 'Pseudo-element flip', text: `::after renders the incoming letter, no extra nodes.` },
      { title: 'Staggered cascade', text: `--i and transition-delay roll letters in sequence.` },
      { title: 'Reversing exit', text: `Leave flips the stagger direction for follow-through.` },
      { title: 'Clipped reveal', text: `overflow hidden shows only one copy at a time.` },
      { title: 'GPU-friendly', text: `translateY on inline-block stays smooth at scale.` },
      { title: 'Space-aware', text: `Explicit width keeps multi-word gaps.` },
      { title: 'Clean markup', text: `One word per link; the split is scripted.` },
    ],
    useCases: [
      { title: 'Editorial navigation', text: `Big menus beside a [fullscreen menu](/ui-snippets/fullscreen-menu/).` },
      { title: 'Agency sites', text: `Pair with an [agency hero](/ui-snippets/agency-hero/).` },
      { title: 'Portfolio menus', text: `Top a [portfolio hero](/ui-snippets/portfolio-hero/) with kinetic links.` },
      { title: 'Footer link lists', text: `Liven up a [mega footer](/ui-snippets/mega-footer/) column.` },
      { title: 'Landing nav', text: `Combine with a [floating pill nav](/ui-snippets/floating-pill-nav/).` },
      { title: 'Kinetic type demos', text: `A reference for per-letter staggered flips.` },
      { icon: 'CODE', title: 'Related: Keyboard Keys', desc: 'See the [Keyboard Keys](/ui-snippets/kbd-keys/) for a related navigation pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why is each letter wrapped in its own span?', a: `Because each letter flips independently and on its own delay. You can't transform parts of a single text node, so JavaScript rewraps every character in a span that carries its index in a --i variable. That per-letter index is what drives the staggered, cascading roll across the word.` },
      { q: 'How does the flip work without duplicating the word?', a: `Each letter span has an ::after pseudo-element that renders the same character via content: attr(data-c), positioned just below it in the accent color. On hover the span translates up 100%, so the top copy slides out and the ::after copy slides in from below within the clipped link. The incoming letter is a pseudo-element, so no second word is needed in the HTML.` },
      { q: 'What creates the left-to-right wave?', a: `Each letter's transition-delay is calc(var(--i) * 22ms), so letter i starts 22 milliseconds after the one before it. That per-index delay turns a simultaneous flip into a wave that sweeps across the word, which is the effect's signature kinetic feel.` },
      { q: 'Why does it reverse when I move away?', a: `On pointerenter the script sets ascending delays so the first letter flips first; on pointerleave it sets descending delays so the last letter flips back first. Rolling in from the front and out from the end gives the animation follow-through, rather than just replaying the same order backward.` },
      { q: 'How do I use this flip link in React, Vue, or Angular?', a: `Render each link's characters as an array of spans with their index as a --i style, rather than splitting in a DOM effect. Set the transition-delay direction based on a hovered/leaving state. The flip CSS ports directly. In Tailwind, use translate utilities with arbitrary transition-delay values per index, and an after: pseudo with content from a data attribute.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the pseudo-element trick by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the ::after pseudo-element with content: attr(data-c) lets one letter flip into another without a second DOM node, and why pointerleave recalculates each span's transition-delay in reverse index order instead of reusing the pointerenter delays. The same assistant can help optimize it — ask whether setting inline style.transitionDelay on every character span on every pointerenter/pointerleave is measurably slower than precomputing both delay directions once at split time. It's also useful for extending the effect: have it add a horizontal flip variant, support flipping in a second accent word instead of a plain duplicate, or drive the per-letter stagger from the mouse's horizontal entry position instead of always left to right. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "flip link" navigation effect in plain HTML, CSS, and JavaScript where each letter of a link flips vertically in a staggered wave on hover — no libraries, no per-word duplicate markup in the HTML.

Requirements:
- On page load, for every navigation link, read its intended text from a data attribute (not its rendered text), clear the link's content, and split that text into one span per character, appended in order. Each character span must store its index as a CSS custom property (for the stagger) and its literal character in a data attribute.
- Each character span must render its character normally, and use a ::after pseudo-element whose content comes from attr() reading that same data attribute, positioned directly below the real character (top: 100%) in an accent color. The parent link must clip overflow so only one copy is visible at rest.
- On hover, every character span in that link must translate upward by exactly 100% via a CSS transform, so the real character slides up out of view while the ::after duplicate slides up into view from below, reading as one letter flipping over — with no second word or duplicated text anywhere in the markup.
- Stagger the flip across letters using a per-character transition-delay derived from each span's stored index, so the flip sweeps across the word left to right rather than all letters moving simultaneously.
- On pointer leave, recompute each character's transition delay in reverse index order (so the last letter starts flipping back first) before removing the hover state, so the reverse animation reads as follow-through rather than an identical rewind.
- Give space characters an explicit non-zero width so multi-word links keep visible gaps between words.`,
    },
  },
};

export default flipLink;
