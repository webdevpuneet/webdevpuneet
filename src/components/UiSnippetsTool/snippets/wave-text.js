const waveText = {
    id: 'wave-text',
    title: 'Wave Text Animation',
    category: 'animations',
    html: `<div class="scene">
  <div class="wave-wrap" id="wave1"></div>
  <div class="wave-wrap rainbow" id="wave2"></div>
  <div class="controls">
    <button class="btn" onclick="setWord('WAVE EFFECT')">WAVE EFFECT</button>
    <button class="btn" onclick="setWord('HELLO WORLD')">HELLO WORLD</button>
    <button class="btn" onclick="setWord('LOADING...')">LOADING...</button>
  </div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #050810; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.scene { display: flex; flex-direction: column; align-items: center; gap: 32px; padding: 24px; }

.wave-wrap { display: flex; gap: 2px; height: 60px; align-items: center; }

.letter {
  font-size: 36px; font-weight: 900;
  font-family: 'Courier New', monospace;
  color: #6366f1;
  display: inline-block;
  animation: wave 1.2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(99,102,241,0.5);
  min-width: 0.6em; text-align: center;
}

.rainbow .letter { color: transparent; }
.rainbow .letter:nth-child(1)  { color: #ef4444; text-shadow: 0 0 20px rgba(239,68,68,0.5); }
.rainbow .letter:nth-child(2)  { color: #f97316; text-shadow: 0 0 20px rgba(249,115,22,0.5); }
.rainbow .letter:nth-child(3)  { color: #f59e0b; text-shadow: 0 0 20px rgba(245,158,11,0.5); }
.rainbow .letter:nth-child(4)  { color: #22c55e; text-shadow: 0 0 20px rgba(34,197,94,0.5); }
.rainbow .letter:nth-child(5)  { color: #0ea5e9; text-shadow: 0 0 20px rgba(14,165,233,0.5); }
.rainbow .letter:nth-child(6)  { color: #6366f1; text-shadow: 0 0 20px rgba(99,102,241,0.5); }
.rainbow .letter:nth-child(7)  { color: #8b5cf6; text-shadow: 0 0 20px rgba(139,92,246,0.5); }
.rainbow .letter:nth-child(8)  { color: #ec4899; text-shadow: 0 0 20px rgba(236,72,153,0.5); }
.rainbow .letter:nth-child(9)  { color: #ef4444; text-shadow: 0 0 20px rgba(239,68,68,0.5); }
.rainbow .letter:nth-child(10) { color: #f97316; text-shadow: 0 0 20px rgba(249,115,22,0.5); }
.rainbow .letter:nth-child(11) { color: #22c55e; }
.rainbow .letter:nth-child(12) { color: #0ea5e9; }

@keyframes wave {
  0%,100% { transform: translateY(0); }
  50%      { transform: translateY(-16px); }
}

.controls { display: flex; gap: 8px; flex-wrap: wrap; justify-content: center; }
.btn { padding: 7px 14px; font-size: 11px; font-weight: 700; letter-spacing: 1px; font-family: 'Courier New', monospace; background: transparent; color: #334155; border: 1px solid #1e293b; border-radius: 4px; cursor: pointer; transition: all 0.15s; }
.btn:hover { border-color: #6366f1; color: #6366f1; }`,
    js: `function buildWave(id, text) {
  const el = document.getElementById(id);
  el.innerHTML = '';
  text.split('').forEach((ch, i) => {
    const span = document.createElement('span');
    span.className = 'letter';
    span.textContent = ch === ' ' ? ' ' : ch;
    span.style.animationDelay = (i * 0.08) + 's';
    el.appendChild(span);
  });
}

function setWord(w) {
  buildWave('wave1', w);
  buildWave('wave2', w);
}

setWord('WAVE EFFECT');`,

  seo: {
    title: 'Wave Text — Free HTML CSS JS Animation Snippet',
    description: 'Text wave where each character bounces on a staggered animation-delay built per-span in JS. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: "Wave Text — buildWave() Character Wrapping, animation-delay Stagger",
      description: `Wave text animates each character in a heading individually — characters rise and fall in a sequential wave pattern. Used on interactive headings, loading messages, and any text that benefits from playful motion — see also [split text](/ui-snippets/split-text/) reveals, a [typewriter](/ui-snippets/typewriter/) effect, and [gradient text](/ui-snippets/gradient-text/).

**The character-splitting technique**

\`buildWave(id, text)\` splits the text string into individual characters via \`.split('')\`. Each character is wrapped in a \`<span>\` with a unique \`animation-delay: i * 0.05s\` — the delay increases by 50ms per character, creating the left-to-right wave timing. Spaces are replaced with non-breaking spaces (\`\u00A0\`) to preserve spacing.

**The CSS wave animation**

Each span has a CSS \`@keyframes wave\` animation that runs \`translateY(-12px)\` at 50% and returns to \`translateY(0)\` at 100%. With staggered delays, the upward peak travels from character 0 to the last character, creating the wave.

**Hover re-trigger**

Hovering the wave element triggers the animation again by briefly removing and re-adding the animation class — creating an on-demand wave that plays each time the user hovers.

**The staggered animation-delay technique**

Wave text works by applying the same keyframe animation to every character span, but with a progressively increasing animation-delay. Character 0 starts immediately; character 1 waits 0.05s; character N waits N×0.05s. The keyframe itself is identical — translateY(-12px) at 50% and translateY(0) at 0%/100%. The delay offset is all that creates the wave appearance.

**Character splitting with JavaScript**

The text content is split into individual characters, each wrapped in a span: [...text].forEach((char, i) => { const span = document.createElement('span'); span.textContent = char === ' ' ? ' ' : char; span.style.animationDelay = i * 0.05 + 's'; el.appendChild(span); }). The non-breaking space ( ) replaces regular spaces so they preserve their width in the inline span layout.

**Controlling the wave properties**

Change the delay multiplier (0.05s) to control wave speed — smaller values create a faster wave, larger values create a slower, more dramatic roll. Change the translateY value in the keyframe to control wave height. Add translateX for a sideways sway. Use a sine-based delay function for a smoother wave curve: Math.sin(i * 0.4) * 0.1 + 'delay'.

**Accessibility and prefers-reduced-motion**

The animation can be distracting for users sensitive to motion. Add @media (prefers-reduced-motion: reduce) { .wave-char { animation: none; } } to freeze all characters for users who have enabled the reduce motion accessibility setting. The text remains fully readable — only the decorative motion is removed.

**The staggered animation-delay technique**

Wave text works by applying the same keyframe animation to every character span, but with a progressively increasing animation-delay. Character 0 starts immediately; character 1 waits 0.05s; character N waits N×0.05s. The keyframe itself is identical — translateY(-12px) at 50% and translateY(0) at 0%/100%. The delay offset is all that creates the wave appearance.

**Character splitting with JavaScript**

The text content is split into individual characters, each wrapped in a span: [...text].forEach((char, i) => { const span = document.createElement('span'); span.textContent = char === ' ' ? ' ' : char; span.style.animationDelay = i * 0.05 + 's'; el.appendChild(span); }). The non-breaking space ( ) replaces regular spaces so they preserve their width in the inline span layout.

**Controlling the wave properties**

Change the delay multiplier (0.05s) to control wave speed — smaller values create a faster wave, larger values create a slower, more dramatic roll. Change the translateY value in the keyframe to control wave height. Add translateX for a sideways sway. Use a sine-based delay function for a smoother wave curve: Math.sin(i * 0.4) * 0.1 + 'delay'.

**Accessibility and prefers-reduced-motion**

The animation can be distracting for users sensitive to motion. Add @media (prefers-reduced-motion: reduce) { .wave-char { animation: none; } } to freeze all characters for users who have enabled the reduce motion accessibility setting. The text remains fully readable — only the decorative motion is removed.`,
    },
    howToUse: { type: 'steps', items: [
      { title: "Watch the wave animate", text: "The wave cycles through the text continuously. Characters rise in sequence from left to right." },
      { title: "Hover to replay", text: "Move the cursor over the wave text to trigger the animation on demand." },
      { title: "Update the text", text: "In the JS panel, update the text arguments in the buildWave() calls to your own phrases." },
      { title: "Change animation delay", text: "Update i * 0.05 in the JS animation-delay calculation. Smaller values (0.03) create faster waves; larger (0.08) create slower ones." },
      { title: "Change wave height", text: "Update the translateY(-12px) value in the CSS wave keyframe." },
      { title: "Export in your format", text: "Click \"HTML\" for a standalone file, \"JSX\" for a React component, or \"Tailwind\" for a React + Tailwind version." },
    ]},
    features: [
      "buildWave() wraps each character in a <span> with unique animation-delay",
      "animation-delay: i * 0.05s staggers the wave from left to right",
      "translateY(-12px) at 50% keyframe creates the vertical wave peak",
      "Non-breaking spaces (\\u00A0) preserve word spacing in split characters",
      "Hover re-triggers animation by removing and re-adding the animated class",
      "Multiple wave rows with different phrases and speeds",
      "CSS animation-timing-function: ease controls the character rise/fall curve",
      "Export as HTML file, React JSX, or React + Tailwind CSS",
      "Mobile (375px), Tablet (768px), Desktop device preview buttons",
      "Live split-pane editor — preview updates as you type",
    ],
    useCases: [
      { icon: "APP", title: "Hero headline wave animations", desc: "Apply to a key phrase in a hero heading for a playful, attention-grabbing entrance animation." },
      { icon: "DESIGN", title: "Loading and processing messages", desc: "Animate \"Loading...\", \"Please wait...\", or \"Processing...\" text to make wait states feel active rather than frozen." },
      { icon: "LEARN", title: "Learn CSS animation-delay stagger patterns", desc: "Edit the i * 0.05 delay multiplier to understand how per-element delay creates sequential animations from a shared keyframe." },
      { icon: "FLOW", title: "Interactive text on hover", desc: "Trigger the wave on mouseenter for any heading. Users discover the animation by hovering, turning a passive heading into an interactive element." },
      { icon: "STAR", title: "Game score and achievement displays", desc: "Animate score numbers or achievement text in a wave pattern as a celebratory reveal." },
      { icon: "CODE", title: "Combine with typewriter effect", desc: "Build the wave after the typewriter finishes writing a word — the wave plays on each new word as it finishes typing." },
    ],
    faqs: [
      { q: "How does the per-character delay create a wave?", a: "buildWave() assigns animation-delay: i * 0.05s to each span, where i is the character index. Character 0 starts at 0s, character 1 at 0.05s, character 2 at 0.1s. The translateY peak travels left to right as each character reaches its 50% keyframe at a slightly later time." },
      { q: "Why replace spaces with non-breaking spaces?", a: "When text is split into individual characters, regular spaces between words are rendered as empty spans with zero width. Non-breaking space (\\u00A0) has a visible width, preserving the gap between words." },
      { q: "How do I change the wave direction?", a: "Replace translateY(-12px) with translateX(12px) for a horizontal wave, or use a combination: transform: translateY(-12px) rotate(10deg) for a rotation wave." },
      { q: "How do I trigger the wave on scroll?", a: "Wrap the wave trigger in an IntersectionObserver. When the element enters the viewport, call buildWave() (which re-creates all spans and restarts animations from delay 0)." },
      { q: "Can I use this in React?", a: "Yes. Click \"JSX\" for a React component. Split the text string into characters, map each to a span with style={{ animationDelay: i * 0.05 + \"s\" }}. Increment a key on hover to re-trigger by remounting the spans." },
      { q: "How do I animate different colours per character?", a: "Add a colour array and assign span.style.color = colors[i % colors.length] in buildWave(). Combine with the delay stagger for a rainbow wave effect." },
    ],
    aiPrompt: {
      paragraph: `Ask an AI coding assistant like Claude to explain exactly why every letter span shares the identical wave keyframe yet still produces a rolling wave — walking through how the i * 0.08s animation-delay offset is the only thing that differs per character is a quick way to really internalize the stagger pattern. It's worth a scaling question too: ask whether rebuilding all the letter spans from scratch on every setWord() call (rather than reusing existing ones and just updating text) matters for a long phrase, and where the line would be. For extending it, ask for a sine-based delay curve instead of a linear one for a smoother roll, a version that reacts to mouse proximity instead of running on a fixed loop, or letters that also rotate slightly as they rise for a more playful bounce. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "wave text" animation in plain HTML, CSS, and JavaScript where each character of a phrase bounces in sequence, using a single shared CSS keyframe and per-character animation-delay — no per-character custom keyframes, no JS animation loop.

Requirements:
- A function that takes a target element and a text string, splits the string into individual characters, and wraps each one in its own span appended to the element — replacing literal space characters with a non-breaking space so word gaps don't collapse to zero width in the inline layout.
- Apply one shared CSS keyframe animation to every character span that moves it upward (via transform: translateY) at the midpoint of the animation and back to its resting position at the end, running infinitely.
- Assign each character span an animation-delay computed purely from its index times a fixed constant (such as 0.08 seconds), so character 0 starts immediately and each subsequent character starts slightly later — this delay offset alone must be what produces the visible left-to-right wave motion.
- Provide at least two independent instances of the wave running simultaneously with different text content, confirming that each instance's characters are built and animated independently.
- Make the per-character delay constant and the keyframe's translateY distance easy to tune as top-level values, and demonstrate that changing the phrase via a button click tears down and rebuilds the character spans (restarting delays from zero) rather than trying to reuse the old ones.
- Note in a code comment how to add prefers-reduced-motion support that disables the animation for users who have that OS-level preference set, without removing any text content.`,
    },
  }
};

export default waveText;
