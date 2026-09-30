const typingCode = {
  id: 'typing-code',
  title: 'Typing Code Editor',
  lastmod: '2026-07-18',
  category: 'animations',
  html: `<div class="tc-window">
  <div class="tc-bar"><span class="tc-dot tc-r"></span><span class="tc-dot tc-y"></span><span class="tc-dot tc-g"></span><span class="tc-file">app.js</span></div>
  <pre class="tc-code"><code id="tcCode"></code><span class="tc-caret" id="tcCaret"></span></pre>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.tc-window{width:min(560px,100%);border-radius:14px;overflow:hidden;background:#0d1117;border:1px solid #21262d;box-shadow:0 30px 70px -28px rgba(0,0,0,.8)}
.tc-bar{display:flex;align-items:center;gap:8px;padding:11px 14px;background:#161b22;border-bottom:1px solid #21262d}
.tc-dot{width:12px;height:12px;border-radius:50%}
.tc-r{background:#ff5f57}.tc-y{background:#febc2e}.tc-g{background:#28c840}
.tc-file{margin-left:8px;font-size:12px;color:#8b949e;font-family:ui-monospace,Menlo,monospace}

.tc-code{margin:0;padding:18px;min-height:230px;font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:13.5px;line-height:1.7;color:#c9d1d9;white-space:pre-wrap;position:relative}
.tc-caret{display:inline-block;width:8px;height:16px;background:#58a6ff;vertical-align:text-bottom;animation:tcBlink 1s steps(1) infinite;margin-left:1px}
@keyframes tcBlink{50%{opacity:0}}

.tok-key{color:#ff7b72}.tok-fn{color:#d2a8ff}.tok-str{color:#a5d6ff}.tok-num{color:#79c0ff}.tok-com{color:#8b949e;font-style:italic}.tok-punc{color:#c9d1d9}`,

  js: `var CODE = [
  "// fetch and cache in one call",
  "async function get(url) {",
  "  const hit = cache.get(url);",
  "  if (hit) return hit;",
  "  const res = await fetch(url);",
  "  const data = await res.json();",
  "  cache.set(url, data);",
  "  return data;",
  "}"
].join('\\n');

var out = document.getElementById('tcCode');
var caret = document.getElementById('tcCaret');

// Lightweight tokenizer for highlight — runs on the text typed so far so colors
// appear as you type, not after.
function highlight(src) {
  return src
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/(\\/\\/[^\\n]*)/g, '<span class="tok-com">$1</span>')
    .replace(/\\b(async|function|const|if|return|await)\\b/g, '<span class="tok-key">$1</span>')
    .replace(/\\b(\\d+)\\b/g, '<span class="tok-num">$1</span>')
    .replace(/(\\bfetch|\\bget|\\bjson|\\bset|\\bget\\b)/g, '<span class="tok-fn">$1</span>');
}

var i = 0;
function type() {
  i++;
  out.innerHTML = highlight(CODE.slice(0, i));
  if (i < CODE.length) {
    // Pause a touch longer at line breaks for a human cadence.
    var delay = CODE[i - 1] === '\\n' ? 220 : 28 + Math.random() * 40;
    setTimeout(type, delay);
  } else {
    // Hold the finished code, then restart the loop.
    setTimeout(function () { i = 0; out.innerHTML = ''; type(); }, 2600);
  }
}
type();`,

  seo: {
    title: 'Typing Code Editor — Free HTML CSS JS Auto-Type Snippet',
    description: `A code editor window that auto-types syntax-highlighted code with a blinking caret and human cadence, then loops. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Typing Code Editor — Auto-Typed, Syntax-Highlighted Code',
      description: `The typing code editor is the hero animation on developer-tool and API sites: a realistic editor window types out a snippet character by character, with syntax highlighting appearing as it goes, a blinking caret, and a human typing rhythm — then it loops. This snippet builds it with plain HTML, CSS, and vanilla JavaScript, including a tiny live tokenizer so the colors show up as you type rather than after.

**A convincing editor chrome**

The window has the familiar trappings: a title bar with red, yellow, and green traffic-light dots and a file name, over a dark code area in a monospace font. These details sell the "real editor" illusion cheaply — no library, just styled divs. The code area uses \`white-space: pre-wrap\` so indentation and line breaks in the source are preserved while still wrapping on narrow screens.

**Live syntax highlighting**

The clever part is that highlighting is applied to the text typed so far on every keystroke, not bolted on at the end. A lightweight \`highlight()\` function runs a series of regex replacements — escaping HTML first, then wrapping comments, keywords, numbers, and function names in colored \`<span>\`s. Because it runs on \`CODE.slice(0, i)\` each tick, partial tokens get colored the moment they are completed, so the snippet appears to highlight itself in real time. The token classes map to a familiar editor palette (red keywords, purple functions, blue strings and numbers, muted italic comments).

**A human typing cadence**

Robotic, perfectly even typing looks fake. The loop varies each character delay between roughly 28 and 68ms with \`Math.random()\`, and pauses longer (220ms) after a newline — mimicking how a person hesitates at the end of a line. This irregular rhythm is what makes the animation feel like someone is actually typing rather than a fixed teleprinter.

**The blinking caret**

A caret element sits after the code and blinks via a CSS \`steps(1)\` animation, which produces the hard on/off blink of a real text cursor rather than a smooth fade. It stays at the end of the typed text because it follows the code in the DOM, so it naturally tracks the typing position.

**Looping**

When the snippet finishes, the code holds on screen for a couple of seconds so it can be read, then clears and restarts — an endless demo loop. The whole cycle is driven by chained \`setTimeout\`s rather than a fixed interval, which is what allows the per-character delay to vary.

**Customizing it**

Replace the \`CODE\` lines with your own snippet (escape backslashes in the string), extend the \`highlight()\` regexes for more languages or tokens, tune the typing speed and the line-break pause, change the editor colors and file name, or remove the loop to type once. Pair it with a [container scroll reveal](/ui-snippets/container-scroll/) of your product or a [terminal window](/ui-snippets/terminal-window/) for a developer-focused hero.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `An editor window types out a code snippet on its own.` },
      { title: 'Watch it highlight', text: `Syntax colors appear as each token is completed.` },
      { title: 'Note the cadence', text: `Typing speed varies and pauses at line breaks.` },
      { title: 'See the caret', text: `A blinking cursor tracks the typing position.` },
      { title: 'Wait for the loop', text: `It holds, clears, and types again.` },
      { title: 'Swap in your code', text: `Replace the CODE lines with your snippet.` },
    ] },
    features: [
      { title: 'Realistic editor chrome', text: `Traffic lights, file name, mono font.` },
      { title: 'Live tokenizer', text: `Highlights the text typed so far each tick.` },
      { title: 'Editor-style palette', text: `Keywords, functions, strings, comments.` },
      { title: 'Human cadence', text: `Randomized delays and line-break pauses.` },
      { title: 'Blinking caret', text: `A steps(1) hard blink like a real cursor.` },
      { title: 'Endless loop', text: `Holds, clears, and retypes.` },
      { title: 'Wrap-preserving', text: `pre-wrap keeps indentation and wrapping.` },
      { title: 'HTML-escaped', text: `Safely renders angle brackets and ampersands.` },
    ],
    useCases: [
      { title: 'Dev-tool heroes', text: `Type code above a [container scroll reveal](/ui-snippets/container-scroll/).` },
      { title: 'API documentation', text: `Demo a request beside a [code block](/ui-snippets/code-block/).` },
      { title: 'Landing demos', text: `Pair with a [terminal window](/ui-snippets/terminal-window/).` },
      { title: 'Onboarding', text: `Show a first snippet in a tour step.` },
      { title: 'Feature explainers', text: `Animate usage in a [feature tabs showcase](/ui-snippets/feature-tabs-showcase/).` },
      { title: 'Typing effect demos', text: `A reference for live-highlighted auto-typing.` },
    ],
    faqs: [
      { q: 'How does the syntax highlight appear while typing?', a: `The highlight function runs on the text typed so far — CODE.slice(0, i) — on every keystroke, escaping HTML and then wrapping comments, keywords, numbers, and function names in colored spans via regex. Because it re-tokenizes the partial text each tick, tokens get colored the instant they are completed, so the snippet appears to highlight itself in real time rather than after finishing.` },
      { q: 'What makes the typing feel human?', a: `Each character delay is randomized between roughly 28 and 68 milliseconds, and the loop pauses longer after a newline, mimicking how a person hesitates at the end of a line. That irregular rhythm avoids the robotic, perfectly even cadence of a fixed interval and reads as someone actually typing.` },
      { q: 'Why does the caret blink in hard steps?', a: `The caret animation uses steps(1), which switches opacity on and off abruptly rather than fading. That produces the hard on/off blink of a real text cursor. The caret follows the code in the DOM, so it naturally sits at the end of the typed text and tracks the typing position.` },
      { q: 'Can I use a different language or more tokens?', a: `Yes. The highlighter is a small set of regex replacements, so you can add rules for more keywords, operators, types, or another language. Keep the HTML-escaping replacement first so angle brackets render safely, then order your token rules from most to least specific to avoid double-wrapping.` },
      { q: 'How do I use this typing code editor in React, Vue, or Angular?', a: `Keep the typed length in a ref and drive the chained setTimeout loop in a mount effect with cleanup that clears the timer on unmount. Render the highlighted HTML into a ref'd element (or sanitize and use dangerouslySetInnerHTML / v-html) rather than state to avoid re-rendering every character. For production, consider a real highlighter like Shiki or Prism instead of the demo regexes.` },
    ],
    aiPrompt: {
      paragraph: `Instead of untangling the regex chain by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why highlight() re-tokenizes the full CODE.slice(0, i) substring on every single character rather than just appending the new character, and what that implies for longer snippets. It's a good optimization target too — ask whether re-running five chained regex replacements per keystroke becomes a real cost once CODE grows to a few hundred lines, and what a cheaper incremental approach would look like. For extending it, have it add support for a second language with its own keyword set, a realistic typo-and-backspace-correction cadence instead of pure forward typing, or a mode where multiple files/tabs type in sequence with a tab-switch animation between them. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an auto-typing code editor mockup in plain HTML, CSS, and vanilla JavaScript with no libraries and no real syntax-highlighting package.

Requirements:
- A window styled like a code editor: a title bar with three colored traffic-light dots and a filename, over a dark monospace code area using white-space: pre-wrap so indentation and line breaks are preserved while still wrapping on narrow screens.
- Store the full source snippet as a single string with real newlines.
- Write a small highlight(src) function that first HTML-escapes ampersands and angle brackets, then applies a fixed sequence of regex replacements that wrap line comments, a specific set of keywords, numeric literals, and known function names each in their own colored span — order matters so comments are protected before keyword matching runs.
- Drive typing with a recursive function (not setInterval) that increments a character counter, re-runs highlight() on the substring from the start up to that counter, and writes the resulting HTML into the code element every tick.
- Vary the delay between characters randomly within a range (roughly 28 to 68ms) to avoid a mechanical, perfectly even typing rhythm, and use a distinctly longer pause specifically after a newline character to mimic a person pausing between lines.
- Add a caret element after the code that blinks using a hard CSS step animation (not a smooth opacity fade), so it looks like a real text-cursor blink.
- When the full snippet has been typed, hold it on screen for a couple of seconds, then clear the code area and restart the typing loop from the beginning, so the whole demo repeats forever without user interaction.`,
    },
  },
};

export default typingCode;
