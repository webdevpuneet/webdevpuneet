const textScatterAssemble = {
    id: 'text-scatter-assemble',
    title: 'Text Scatter Assemble',
    category: 'animations',
    html: `<div class="scene">
  <h1 class="assemble-heading" id="heading">Pieces find their place</h1>
  <button class="replay" onclick="assemble()">Scatter and reassemble</button>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #fff7ed; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; overflow: hidden; }

.scene { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 30px; max-width: 760px; }

.assemble-heading {
  font-size: clamp(28px, 6.5vw, 50px);
  font-weight: 800;
  color: #7c2d12;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.letter {
  display: inline-block;
  position: relative;
  opacity: 0;
  transition: transform 0.85s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease;
}
.letter.space { width: 0.32em; }
.letter.placed { opacity: 1; transform: translate(0, 0) rotate(0deg) scale(1); }

.replay {
  padding: 9px 20px; font-size: 13px; font-weight: 600;
  background: #c2410c; color: #fff; border: none; border-radius: 999px;
  cursor: pointer; transition: background 0.15s, transform 0.1s;
}
.replay:hover { background: #9a3412; }
.replay:active { transform: scale(0.96); }`,
    js: `function buildLetters(el) {
  const text = el.textContent.trim();
  el.textContent = '';
  const frag = document.createDocumentFragment();
  text.split('').forEach((ch) => {
    const span = document.createElement('span');
    span.className = 'letter' + (ch === ' ' ? ' space' : '');
    span.textContent = ch === ' ' ? '\\u00a0' : ch;
    frag.appendChild(span);
  });
  el.appendChild(frag);
  return el.querySelectorAll('.letter');
}

function scatter(letters) {
  letters.forEach((l) => {
    l.classList.remove('placed');
    const dx = (Math.random() - 0.5) * 700;
    const dy = (Math.random() - 0.5) * 500;
    const rot = (Math.random() - 0.5) * 540;
    const scale = 0.3 + Math.random() * 0.6;
    l.style.transition = 'none';
    l.style.opacity = '0';
    l.style.transform = 'translate(' + dx + 'px, ' + dy + 'px) rotate(' + rot + 'deg) scale(' + scale + ')';
  });
}

function assemble() {
  const heading = document.getElementById('heading');
  const letters = document.querySelectorAll('.letter');
  scatter(letters);

  void heading.offsetWidth;

  letters.forEach((l, i) => {
    l.style.transition = '';
    l.style.opacity = '';
    l.style.transform = '';
    setTimeout(() => {
      l.classList.add('placed');
    }, i * 35);
  });
}

buildLetters(document.getElementById('heading'));
assemble();`,

  seo: {
    title: 'Text Scatter Assemble Animation — Letters Converge JS',
    description: 'Headline where scattered, rotated letters fly in from random positions and converge into place with a staggered ease-out transition. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Text Scatter Assemble — Random Offsets, Rotation & Staggered Convergence',
      description: `A text scatter assemble starts every letter of a headline flung to a random position around the screen — offset, rotated, scaled down, and invisible — then converges each one back to its correct spot in the sentence with a staggered, eased transition, so the whole headline looks like it is physically reassembling itself from scattered pieces. Unlike particle-based text formation effects that render text as thousands of tiny dots on a \`<canvas>\`, this uses the real DOM letters themselves — each character is still a genuine, selectable, accessible piece of text throughout the animation, just transformed in space.

**Splitting into letters**

\`buildLetters(el)\` wraps each character of the heading in its own \`<span class="letter">\`, converting literal spaces into non-breaking-space spans so word gaps hold their width once the spans become \`display: inline-block\`. This is the same splitting approach used by [3D character flip reveal](/ui-snippets/char-flip-reveal-3d/) and [letter gravity drop](/ui-snippets/letter-gravity-drop-text/), each applying a different physical motion to the resulting per-letter spans.

**Scattering to random positions**

\`scatter(letters)\` loops over every letter and computes three independent random values: \`dx\`/\`dy\` — a random horizontal and vertical offset up to ±350px and ±250px respectively (\`(Math.random() - 0.5) * 700\` centers the random range on zero) — and \`rot\`, a random rotation up to ±270 degrees, plus a random \`scale\` between 0.3 and 0.9. Setting \`l.style.transition = 'none'\` first means this scattered starting state is applied instantly, with no visible animation, before the reassembly begins.

**Converging back with a staggered ease-out**

After scattering, \`assemble()\` forces a layout flush with \`void heading.offsetWidth\` (necessary so the browser registers the \`transition: none\` scattered state before a transition is re-enabled — the same forced-reflow technique used in [word spring bounce heading](/ui-snippets/word-spring-bounce-heading/)), clears each letter's inline \`transition\` back to the CSS-declared \`0.85s cubic-bezier(0.16, 1, 0.3, 1)\`, and then, staggered by \`35ms\` per letter index via \`setTimeout\`, adds a \`.placed\` class to each one. \`.placed\` resets \`opacity\`, \`transform\` to \`translate(0, 0) rotate(0deg) scale(1)\` — the letter's true position in the sentence — and the long, decelerating \`cubic-bezier(0.16, 1, 0.3, 1)\` curve (a common "ease-out-expo"-style curve) makes each letter's flight feel like it is gliding to a gentle stop rather than snapping into place.

**Why random values are generated fresh each call**

Because \`scatter()\` calls \`Math.random()\` independently for every letter on every invocation, no two runs of the "Scatter and reassemble" button produce the same scattered starting layout — every replay looks like a genuinely different, unpredictable dispersal that then converges to the identical final sentence.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it load, then replay', text: 'Letters scatter and fly into place on page load. Click "Scatter and reassemble" to watch a fresh, differently-randomized scatter converge again.' },
        { title: 'Change the headline text', text: 'Edit the text inside #heading in the HTML panel — buildLetters() re-splits it into per-letter spans on load.' },
        { title: 'Adjust the scatter radius', text: 'In the JS panel, change the 700 and 500 multipliers on dx and dy inside scatter() for a wider or tighter starting dispersal.' },
        { title: 'Adjust the rotation range', text: 'Change the 540 multiplier on rot inside scatter() — larger values produce more dramatic tumbling before letters settle.' },
        { title: 'Change the convergence speed', text: 'In the CSS panel, update 0.85s on the .letter transition, or the 35 multiplier in the setTimeout stagger inside assemble() in the JS panel.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Real DOM letters throughout — selectable, accessible text, not canvas particles',
      'Each letter gets independent random offset, rotation, and scale on every scatter',
      'transition: none applies the scattered starting state instantly with no visible jump',
      'Forced reflow (void heading.offsetWidth) ensures the transition reliably re-enables',
      'Staggered per-letter setTimeout convergence, decelerating cubic-bezier ease-out curve',
      'Every replay produces a genuinely different scattered layout via fresh Math.random() calls',
      'Splits any headline into per-letter spans automatically, with space handling',
      'Zero dependencies — pure CSS transitions triggered by class and inline style toggling',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Hero headline entrance with a sense of construction', desc: 'The scatter-to-assemble motion reads as a headline being physically built or discovered, well suited to creative, design, and construction-adjacent product landing pages.' },
      { icon: 'DESIGN', title: 'Loading and page-ready reveal moments', desc: 'Trigger the assembly once content is ready to signal completion — pieces converging into a finished sentence works as a natural "everything is loaded" cue.' },
      { icon: 'LEARN', title: 'Learn staggered transitions with forced reflow', desc: 'Edit the scatter ranges and stagger interval in the JS panel to see exactly how the transition: none plus forced-reflow pattern makes a replayable random-to-ordered animation reliable.' },
      { icon: 'FLOW', title: 'Case study and portfolio project title reveals', desc: 'Use as a section-opening flourish for a portfolio case study title, giving each project page a distinct, memorable entrance moment.' },
      { icon: 'CODE', title: 'Pair with a scroll-triggered observer', desc: 'Combine with the IntersectionObserver pattern from [3D character flip reveal](/ui-snippets/char-flip-reveal-3d/) so assemble() fires automatically the first time the heading scrolls into view.' },
      { icon: 'STAR', title: 'Puzzle, game, and creative-tool branding', desc: 'The literal "pieces coming together" metaphor fits puzzle games, collaborative design tools, and any brand built around assembly or creative construction.' },
    ],
    faqs: [
      { q: 'Does this use canvas particles like a text particle formation effect?', a: 'No — every letter remains a real HTML span throughout the animation, just transformed with CSS translate, rotate, and scale. This keeps the text genuinely selectable and accessible, unlike canvas-based particle text effects that render pixels rather than characters.' },
      { q: 'Why is transition set to "none" before scattering the letters?', a: 'Scattering is meant to be the instantaneous starting state, not an animated motion in itself — only the convergence back to the correct position should be visibly animated. Setting transition: none before applying the random scattered transform makes that jump invisible, so the only motion the viewer sees is letters flying into place.' },
      { q: 'Why is void heading.offsetWidth needed before re-enabling the transition?', a: 'Removing a style property (or setting transition: none) and then immediately changing it back in the same synchronous JS tick does not reliably force the browser to register the intermediate state. Reading a layout property like offsetWidth forces a synchronous style recalculation in between, guaranteeing the later transition change is actually observed and animates correctly.' },
      { q: 'Why does every replay look different?', a: 'scatter() calls Math.random() fresh for every letter\'s dx, dy, rotation, and scale on every single call to assemble(). Because these values are never cached or seeded, no two scatter states are ever identical, even though the final assembled sentence is always the same.' },
      { q: 'How do I make the convergence feel snappier or slower?', a: 'Change the 0.85s duration in the .letter transition rule in the CSS panel for the overall speed of each individual letter\'s flight, and change the 35ms multiplier in the setTimeout stagger inside assemble() in the JS panel for how quickly letters begin converging one after another.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Store each letter\'s scattered transform values in component state generated with Math.random() on trigger, apply them as inline styles, and toggle a "placed" boolean per letter (or all at once with staggered setTimeout calls) to animate the transition back to the identity transform.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why transition: none is applied before the scattered position is set, and why void heading.offsetWidth is necessary between disabling and re-enabling the transition for the convergence to animate reliably every single time the button is clicked. It's also worth an accessibility conversation: ask how you would respect prefers-reduced-motion by skipping straight from a still-scattered start to the assembled end state without the intervening flight animation. For extending it, ask for a version where letters converge from a shared edge (like they are all flying in from off-screen right) instead of fully random positions, one where the convergence order follows reading order more loosely with some overlap for a busier effect, or one that scatters letters again on a timer for a continuously looping "assemble, hold, scatter, reassemble" cycle. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a headline animation where every letter starts scattered at a random position, rotation, and scale around the screen, invisible, and then converges into its correct place in the sentence with a staggered, decelerating transition, using plain HTML, CSS, and vanilla JavaScript — no animation library, using real DOM text the whole time (no canvas, no particles).

Requirements:
- On page load, split the heading's text into one inline-block span per character, preserving spaces as non-breaking-space spans in their own element so word gaps do not collapse.
- A "scatter" step that, for every letter independently, generates a fresh random horizontal offset, vertical offset, rotation angle, and scale factor each time it runs, applies them as a combined CSS transform with the element's own transition temporarily disabled (so the scattered starting position appears instantly, not animated), and sets the letter fully transparent.
- After scattering, force a synchronous layout read on the container element so the browser reliably registers the transition being disabled, then re-enable each letter's CSS transition (a slow, strongly decelerating easing curve) before triggering the convergence.
- Converge each letter back to its natural position, zero rotation, full scale, and full opacity by adding a class, staggering when each letter's class is added using a per-letter delay proportional to its index in the string, so the assembly sweeps in roughly left to right even though the starting positions were random.
- Include a button that re-runs the entire scatter-then-assemble sequence with freshly randomized starting positions every time it is clicked, and run the sequence once automatically on page load as well.`,
    },
  },
};

export default textScatterAssemble;
