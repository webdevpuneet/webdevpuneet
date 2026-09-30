const charFlipReveal3d = {
    id: 'char-flip-reveal-3d',
    title: '3D Character Flip Reveal',
    category: 'animations',
    html: `<div class="scene">
  <p class="eyebrow">Scroll-triggered</p>
  <h1 class="flip-heading" data-flip-text="Design in motion"></h1>
  <p class="hint">Scroll down, then back up to replay</p>
  <div class="spacer"></div>
  <h2 class="flip-heading small" data-flip-text="Every letter flips into place"></h2>
  <div class="spacer"></div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0b0f1a; color: #e2e8f0; }

.scene { display: flex; flex-direction: column; align-items: center; padding: 80px 20px; text-align: center; }
.eyebrow { font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #6366f1; margin-bottom: 14px; }
.hint { font-size: 12px; color: #475569; margin-top: 10px; }
.spacer { height: 60vh; }

.flip-heading {
  font-size: clamp(28px, 6vw, 52px);
  font-weight: 800;
  letter-spacing: -0.01em;
  perspective: 800px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  max-width: 780px;
}
.flip-heading.small { font-size: clamp(20px, 4vw, 32px); color: #94a3b8; max-width: 640px; }

.char {
  display: inline-block;
  transform-style: preserve-3d;
  transform-origin: 50% 50% -0.5em;
  transform: rotateX(-100deg);
  opacity: 0;
  color: #f8fafc;
  transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.4s ease;
}
.flip-heading.small .char { color: #a5b4fc; }
.char.visible { transform: rotateX(0deg); opacity: 1; }
.char.space { width: 0.3em; }`,
    js: `function buildChars(el) {
  const text = el.dataset.flipText || el.textContent;
  el.textContent = '';
  const frag = document.createDocumentFragment();
  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'char' + (ch === ' ' ? ' space' : '');
    span.textContent = ch === ' ' ? '\\u00a0' : ch;
    span.style.transitionDelay = (i * 28) + 'ms';
    frag.appendChild(span);
  });
  el.appendChild(frag);
}

document.querySelectorAll('.flip-heading').forEach(buildChars);

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const chars = entry.target.querySelectorAll('.char');
    if (entry.isIntersecting) {
      chars.forEach((c) => c.classList.add('visible'));
    } else {
      chars.forEach((c) => c.classList.remove('visible'));
    }
  });
}, { threshold: 0.4 });

document.querySelectorAll('.flip-heading').forEach((el) => observer.observe(el));`,

  seo: {
    title: '3D Character Flip Reveal — Text Stagger CSS JS',
    description: 'Per-character 3D rotateX flip-in reveal that triggers on scroll using IntersectionObserver and staggered transition-delay. Exports to React, Vue & Tailwind.',
    about: {
      title: '3D Character Flip Reveal — rotateX Stagger, perspective & IntersectionObserver',
      description: `A 3D character flip reveal splits a heading into individual letters and flips each one up from a rotated, invisible state into full view, staggered so the reveal sweeps left to right like a wall of tiny split-flap tiles. It reads as more physical and dimensional than a plain fade or slide, which is why it shows up on portfolio hero sections and product landing pages that want a heading entrance with weight to it. For a flatter left-to-right stagger without the 3D rotation, see [split text](/ui-snippets/split-text/) or [scroll letter stagger](/ui-snippets/scroll-letter-stagger/); for the mechanical digit-rolling version of a flip display, see [split-flap display](/ui-snippets/split-flap-display/).

**Splitting the text into characters**

\`buildChars(el)\` reads the heading's text from a \`data-flip-text\` attribute, clears the element, then wraps every character in its own \`<span class="char">\`. Spaces become non-breaking spaces (\`\\u00a0\`) inside a \`.space\` span so word gaps survive the \`display: inline-block\` layout the flip animation needs. Doing the split once on page load — rather than hand-authoring dozens of spans in the HTML — keeps the source markup readable and lets you swap the headline by editing one attribute.

**The 3D flip with perspective and transform-origin**

The parent \`.flip-heading\` gets \`perspective: 800px\`, which gives child 3D transforms a vanishing point to rotate against. Each \`.char\` starts at \`transform: rotateX(-100deg)\` with \`opacity: 0\` — tipped backward and invisible, as if lying flat behind the baseline. \`transform-origin: 50% 50% -0.5em\` pushes the rotation axis slightly behind the letter's own plane so the flip reads as a genuine 3D hinge rather than a flat squash. Adding the \`.visible\` class sets \`transform: rotateX(0deg)\` and \`opacity: 1\`, and the \`cubic-bezier(0.2, 0.8, 0.2, 1)\` easing gives the settle a slight overshoot-free snap.

**Staggering with transition-delay instead of animation-delay**

Because this reveal uses a plain CSS \`transition\` (triggered by toggling a class) rather than a \`@keyframes\` animation, the stagger is set via \`span.style.transitionDelay = (i * 28) + 'ms'\` in JavaScript at build time — each character's delay is proportional to its index. This is simpler to reason about than generating 50+ numbered \`nth-child\` delay rules in CSS, and it scales automatically to headlines of any length.

**Re-triggering with IntersectionObserver**

An \`IntersectionObserver\` watches each \`.flip-heading\` at \`threshold: 0.4\`. When a heading enters the viewport, \`.visible\` is added to every \`.char\` inside it, firing the staggered flip. When it exits, \`.visible\` is removed, resetting the characters to their hidden rotated state — so scrolling back up and down replays the reveal instead of firing only once. Delete the \`else\` branch if you want a fire-once entrance instead of a repeatable one.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Scroll the preview', text: 'Scroll the heading out of view and back in — the IntersectionObserver toggles .visible each time, replaying the flip.' },
        { title: 'Change the headline text', text: 'Edit the data-flip-text attribute on .flip-heading in the HTML panel. The JS rebuilds character spans from that attribute automatically.' },
        { title: 'Adjust the stagger speed', text: 'In the JS panel, change the 28 multiplier in span.style.transitionDelay = (i * 28) — smaller values reveal faster.' },
        { title: 'Tune the flip depth', text: 'In the CSS panel, change perspective: 800px on .flip-heading (lower = more dramatic) and the -0.5em z-offset in transform-origin.' },
        { title: 'Fire only once', text: 'In the JS panel, remove the else branch inside the IntersectionObserver callback so characters stay visible after their first reveal.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Splits any heading into per-character spans from a single data-flip-text attribute',
      'True 3D flip via perspective + transform-origin with a z-offset, not a 2D fake',
      'rotateX(-100deg) to rotateX(0deg) with opacity fade for a physical flip-in feel',
      'Per-character stagger set via transitionDelay computed from character index',
      'IntersectionObserver triggers the reveal at 40% visibility, both directions',
      'Replays automatically on re-scroll — toggle removable for a fire-once entrance',
      'Non-breaking space handling keeps word gaps intact through inline-block spans',
      'Works on any heading level (h1, h2) by reusing the same .flip-heading class',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Portfolio and agency hero headlines', desc: 'A dimensional per-letter flip gives a hero headline more physical presence than a fade or slide, which is why it is common on portfolio and design-agency landing pages.' },
      { icon: 'DESIGN', title: 'Section dividers between scroll chapters', desc: 'Use on section headers throughout a long scrolling page so each new chapter announces itself with the same signature flip-in motion.' },
      { icon: 'LEARN', title: 'Learn 3D CSS transforms with perspective', desc: 'Edit perspective and transform-origin in the CSS panel to see directly how the vanishing-point distance and rotation axis change the character of the 3D flip.' },
      { icon: 'FLOW', title: 'Product launch and announcement pages', desc: 'Flip in a product name or headline as visitors scroll to the announcement section for a moment that feels deliberately choreographed rather than automatic.' },
      { icon: 'CODE', title: 'Pair with split-flap or flip-clock digits', desc: 'Combine with the [split-flap display](/ui-snippets/split-flap-display/) or [flip clock](/ui-snippets/flip-clock/) for a consistent flip-mechanism visual language across numbers and text.' },
      { icon: 'STAR', title: 'Replayable scroll storytelling', desc: 'Because the observer toggles visibility both ways, this works well in scroll-driven narrative pages where a heading should re-announce itself every time it re-enters view.' },
    ],
    faqs: [
      { q: 'How does the 3D flip differ from a 2D rotate?', a: 'perspective: 800px on the parent element gives child rotateX() transforms a vanishing point, so the character genuinely appears to hinge in 3D space toward and away from the viewer, rather than just scaling flat. transform-origin with a negative z value (-0.5em) offsets the rotation axis behind the glyph for a more convincing hinge.' },
      { q: 'Why use transitionDelay in JS instead of CSS nth-child rules?', a: 'A headline can be any length, and hand-writing nth-child(1) through nth-child(40) delay rules does not scale. Setting span.style.transitionDelay = (i * 28) + "ms" at build time computes the correct delay for exactly as many characters as the text contains.' },
      { q: 'Why does the animation replay every time I scroll past it?', a: 'The IntersectionObserver callback adds .visible on isIntersecting and removes it otherwise. Removing the else branch (or checking a "played" flag before removing) makes the reveal fire once and stay revealed.' },
      { q: 'How do I flip in multiple headings with different text?', a: 'Give each heading its own data-flip-text attribute and the same flip-heading class. buildChars() and the observer both use querySelectorAll and run identically for every matching element.' },
      { q: 'Do spaces need special handling?', a: 'Yes — a plain space character inside display: inline-block spans can collapse. The script replaces spaces with a non-breaking space (\\u00a0) inside a .space span so word gaps render consistently.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Split the string with String.prototype.split("") in a useMemo, render a span per character with an inline transitionDelay style, and use a useRef plus IntersectionObserver in a useEffect to toggle a "visible" state.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to walk through exactly how perspective on the parent and transform-origin with a negative z-offset on each child combine to make rotateX() read as a physical hinge instead of a flat squash — try changing the perspective value together and watching how the depth of the flip changes. It is also worth a performance conversation: since every character gets its own transition and IntersectionObserver toggles all of them on every scroll crossing, ask whether will-change: transform on .char would help on a very long headline, or whether that many transitioning elements is fine as-is. For extending it, ask for a version that flips in words instead of characters for a calmer effect, one where the flip direction alternates between rotateX and rotateY per character, or one that only fires once using a per-element "already played" flag instead of resetting on scroll-out. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a scroll-triggered 3D character flip-in reveal for a heading in plain HTML, CSS, and vanilla JavaScript — no animation library.

Requirements:
- Take a heading's text from a data attribute and, on page load, replace its content with one <span> per character (preserving word spaces as non-breaking spaces inside their own span so inline-block layout does not collapse them).
- Give the heading's container a CSS perspective so child 3D transforms have a vanishing point, and give each character span a transform-origin pulled slightly behind its own plane (a negative z offset) so the flip reads as a real hinge rather than a flat rotation.
- Each character span must start rotated backward around the X axis and fully transparent, then transition to rotateX(0deg) and full opacity when a "visible" class is added, using an eased cubic-bezier transition rather than a linear one.
- Stagger the reveal by setting each character's CSS transition-delay in JavaScript proportional to its index in the string, so the flip sweeps left to right across the headline instead of firing all at once.
- Use an IntersectionObserver to add the "visible" class to all characters in a heading when it scrolls into view, and remove the class when it scrolls back out, so scrolling past the heading repeatedly replays the flip-in animation each time.
- Support multiple independent headings on the same page, each with its own text and its own observer-driven reveal, using one reusable class name rather than duplicated code per heading.`,
    },
  },
};

export default charFlipReveal3d;
