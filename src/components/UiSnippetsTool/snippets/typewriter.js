const typewriter = {
    id: 'typewriter',
    title: 'Typewriter Effect',
    category: 'animations',
    html: `<div class="scene">
  <p class="sub">Hi, I'm a developer who</p>
  <h1>
    builds
    <span class="typed-wrap">
      <span id="typed"></span><span class="cursor">|</span>
    </span>
  </h1>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0f172a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.scene { text-align: center; }
.sub { font-size: 15px; color: #475569; margin-bottom: 10px; }

h1 {
  font-size: clamp(32px, 7vw, 60px);
  font-weight: 800;
  color: #f1f5f9;
  line-height: 1.2;
  letter-spacing: -1px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.typed-wrap {
  display: inline-flex;
  align-items: center;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  min-width: 2ch;
}

.cursor {
  -webkit-text-fill-color: #6366f1;
  animation: blink 0.9s step-end infinite;
  font-weight: 300;
}
@keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }`,
    js: `const words = ['fast UIs', 'clean code', 'great DX', 'cool things', 'pixel-perfect apps'];
let wi = 0, ci = 0, deleting = false;
const el = document.getElementById('typed');

function tick() {
  const word = words[wi];
  if (!deleting) {
    el.textContent = word.slice(0, ++ci);
    if (ci === word.length) { deleting = true; setTimeout(tick, 1800); return; }
  } else {
    el.textContent = word.slice(0, --ci);
    if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; setTimeout(tick, 400); return; }
  }
  setTimeout(tick, deleting ? 60 : 100);
}
tick();`,

  seo: {
    title: 'Typewriter Effect — Free HTML CSS JS Snippet',
    description: 'Multi-word typewriter that types, pauses and deletes each phrase with a blinking CSS cursor. Copy-paste or export to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Typewriter Effect — words Array, tick() State Machine & CSS Blink Cursor',
      description: `The typewriter effect types words character by character, pauses at completion, erases character by character, then moves to the next word. Combined with a CSS blinking cursor, it creates the impression of a live [terminal](/ui-snippets/terminal-window/) or a human typing. Used on hero sections (see the [word-flip hero](/ui-snippets/word-flip-hero/)) to cycle through product values, personas, or use cases without static text — for a decode-style reveal instead, see the [text scramble](/ui-snippets/text-scramble/).

**The tick() state machine**

\`tick()\` is a recursive function driven by \`setTimeout\`. It has two states controlled by the \`deleting\` boolean. In the typing state (\`!deleting\`): \`el.textContent = word.slice(0, ++ci)\` adds one character per tick at 80ms. When \`ci === word.length\` the word is complete — \`deleting = true\` and a 1800ms pause happens before the next tick. In the erasing state (\`deleting\`): \`el.textContent = word.slice(0, --ci)\` removes one character per tick at 50ms (faster erase than type). When \`ci === 0\`, \`wi = (wi + 1) % words.length\` advances to the next word and \`deleting = false\`.

**The words array**

\`const words = ['fast UIs', 'clean code', 'great DX', ...]\` — replace with your own phrases. The array loops infinitely via modulo. Shorter words erase faster; longer words have more visible typing time.

**The CSS blink cursor**

The \`.cursor\` element is a \`|\ character with \`animation: blink 0.7s step-end infinite\`. \`step-end\` makes the cursor snap on/off instantly rather than fading — matching the hard blink of a real terminal cursor.

**The character-by-character typing loop**

type() appends one character per call using setInterval at a speed of typically 80-100ms per character. It reads from the current word in the words array at the current charIndex position. When charIndex equals the word length, the typing phase ends and a pause begins before erasing starts. erase() decrements charIndex, removing the last character each interval at a faster speed (40-50ms). When charIndex reaches 0, the word index advances and the next word begins typing.

**The blinking cursor**

A ::after pseudo-element on .typewriter-text with content: '|' or a separate .cursor element blinks via a CSS keyframe: @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }. The cursor animates continuously but should be paused during typing: animation-play-state: paused on the .typing class. This matches how real terminal cursors behave — blinking when waiting, solid when typing.

**Infinite loop and word cycling**

The words array loops: when the last word finishes typing and erasing, the word index resets to 0. The loop repeats indefinitely. To pause at specific words, add a custom pauseTime property per word and use setTimeout instead of the interval for that word's display duration.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch the effect in the preview', text: 'The typewriter cycles through words, pausing 1.8s at each full word before erasing and typing the next.' },
        { title: 'Update the words array', text: 'In the JS panel, update the words array with your own phrases — product values, user roles, or features.' },
        { title: 'Change the fixed prefix text', text: 'In the HTML panel, update the static "Build" text that precedes the animated word.' },
        { title: 'Change typing and erasing speed', text: 'In the JS panel, update 80 (ms per typed character) and 50 (ms per erased character) in the setTimeout calls.' },
        { title: 'Change the pause duration', text: 'Update 1800 in the setTimeout that fires when the full word is typed.' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'words array cycles infinitely via wi = (wi + 1) % words.length',
      'tick() state machine: deleting boolean switches between type and erase modes',
      '80ms per typed character, 50ms per erased character — faster erase than type',
      '1800ms pause at full word completion before starting erase',
      'CSS blink cursor: animation: blink 0.7s step-end infinite — hard on/off flash',
      'clamp() font-size scales headline without media queries',
      'Zero dependencies — setTimeout recursive loop, no library needed',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'APP',    title: 'Hero headline dynamic keyword cycling', desc: 'Cycle through product values, user personas, or features in a hero headline: "Build [fast UIs / clean APIs / great DX]". Keeps the headline fresh without needing separate pages.' },
      { icon: 'DESIGN', title: 'Portfolio tagline animation',           desc: 'Show your skills cycling in a typewriter: "I build [React apps / REST APIs / pixel-perfect UIs]". More engaging than a static tagline.' },
      { icon: 'LEARN',  title: 'Learn setTimeout state machines',       desc: 'The typewriter uses a recursive tick() function with two states. Edit the typing and erasing speeds in the JS panel to understand how the state machine controls timing.' },
      { icon: 'FLOW',   title: 'Loading and processing indicators',      desc: 'Use a typewriter to type status messages during a multi-step process: "Compiling...", "Optimising...", "Done!" with appropriate timing per step.' },
      { icon: 'CODE',   title: 'Terminal-style developer interfaces',    desc: 'Combine with the Aurora Background and the blinking cursor for a terminal-aesthetic hero that signals a developer-focused product.' },
      { icon: 'STAR',   title: 'A/B test headline variants',            desc: 'The words array is trivial to change. Test different keyword orders, phrase lengths, and value propositions without code changes.' },
    ],
    faqs: [
      { q: 'How does the typewriter cycle through words?', a: 'tick() checks the deleting state. When typing: el.textContent = word.slice(0, ++ci) adds one character. When ci equals word length, deleting = true and a 1800ms timeout fires. When erasing: ci decrements until 0, then wi advances via modulo and deleting resets to false.' },
      { q: 'How do I change the typing speed?', a: 'The setTimeout in the typing branch uses 80ms per character. The erasing branch uses 50ms. Reduce these values (e.g. 40ms/30ms) for faster animation, or increase (120ms/80ms) for slower.' },
      { q: 'How do I stop the cursor from blinking?', a: 'Remove the animation: blink ... property from .cursor in the CSS panel. The cursor will remain visible without blinking.' },
      { q: 'Can I type a full sentence instead of a word?', a: 'Yes. Add longer strings to the words array: "build delightful web experiences" is valid. Longer strings take more time to type and erase — adjust the 1800ms pause if needed.' },
      { q: 'How do I make the animation fire only once?', a: 'Remove the modulo wraparound: instead of wi = (wi + 1) % words.length, use if (wi < words.length - 1) wi++; else { deleting = false; return; } to stop after the last word.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. In React, manage ci, wi, and deleting in useState. Use useEffect with a setTimeout to call tick(), storing the timeout ID in useRef for cleanup on unmount.' },
    ],
    aiPrompt: {
      paragraph: `Instead of tracing the timing constants by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the deleting boolean turns a single recursive tick() function into two distinct state machines sharing one code path, and why the erase speed (50ms) is deliberately faster than the type speed (100ms). It's also a good target for an optimization question — ask whether chaining setTimeout calls indefinitely could ever leak if the component unmounts mid-word, and how you'd guard against that. For extending it, have it add per-word pause durations instead of one fixed 1800ms hold, support typing full sentences with word-wrap-aware erase timing, or pause the cycle entirely when the tab is hidden using the Page Visibility API. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a multi-word typewriter effect in plain HTML, CSS, and vanilla JavaScript with no libraries, driven by a single recursive function and setTimeout — no setInterval.

Requirements:
- A words array of phrases to cycle through indefinitely, plus a current word index, a current character index, and a boolean flag for whether the effect is currently deleting or typing.
- A single tick() function that branches on the deleting flag: when not deleting, it must slice the current word up to one more character than last time and write it into the target element's text content; when the full word length is reached, it must flip to deleting mode and wait a longer pause (roughly 1800ms) before continuing.
- When deleting, tick() must slice the current word down by one character each call; when the slice reaches zero length, it must advance to the next word index using modulo wraparound so the list loops forever, flip back to typing mode, and continue after a short pause.
- Typing characters must use a slower per-character delay than deleting characters, so erasing visibly happens faster than typing.
- A separate blinking cursor element next to the typed text must blink with a CSS keyframe animation using a hard step (not a smooth fade), so it snaps on and off like a real terminal cursor.
- The whole loop must be self-starting on page load and require no user interaction to begin cycling through the words array.`,
    },
  },
};

export default typewriter;
