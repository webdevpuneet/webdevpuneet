const numberWordMorphCounter = {
    id: 'number-word-morph-counter',
    title: 'Number to Word Morph Counter',
    category: 'animations',
    html: `<div class="scene">
  <p class="sub">Trusted by</p>
  <div class="morph-stage">
    <span id="display" class="morph-value">0</span>
    <span class="morph-suffix">teams</span>
  </div>
  <button class="replay" onclick="playCounter()">Replay</button>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #0c0a1a; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 20px; }

.scene { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 22px; }
.sub { font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #6d28d9; }

.morph-stage { display: flex; align-items: baseline; gap: 14px; }

.morph-value {
  font-size: clamp(40px, 10vw, 88px);
  font-weight: 800;
  color: #f5f3ff;
  min-width: 4ch;
  display: inline-block;
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.morph-value.swap { opacity: 0; transform: translateY(10px) scale(0.9); }

.morph-suffix { font-size: clamp(16px, 3vw, 22px); color: #a78bfa; font-weight: 600; }

.replay {
  padding: 9px 20px; font-size: 13px; font-weight: 600;
  background: #7c3aed; color: #fff; border: none; border-radius: 999px;
  cursor: pointer; transition: background 0.15s, transform 0.1s;
}
.replay:hover { background: #6d28d9; }
.replay:active { transform: scale(0.96); }`,
    js: `const ones = ['zero','one','two','three','four','five','six','seven','eight','nine'];
const teens = ['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
const tens = ['', '', 'twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];

function numberToWords(n) {
  if (n < 10) return ones[n];
  if (n < 20) return teens[n - 10];
  if (n < 100) {
    const t = Math.floor(n / 10);
    const r = n % 10;
    return tens[t] + (r ? '-' + ones[r] : '');
  }
  if (n < 1000) {
    const h = Math.floor(n / 100);
    const r = n % 100;
    return ones[h] + ' hundred' + (r ? ' ' + numberToWords(r) : '');
  }
  const th = Math.floor(n / 1000);
  const r = n % 1000;
  return numberToWords(th) + ' thousand' + (r ? ' ' + numberToWords(r) : '');
}

function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

const display = document.getElementById('display');
const TARGET = 248;

async function swapText(newText) {
  display.classList.add('swap');
  await new Promise((r) => setTimeout(r, 180));
  display.textContent = newText;
  display.classList.remove('swap');
  await new Promise((r) => setTimeout(r, 180));
}

async function playCounter() {
  display.textContent = '0';
  const steps = 14;
  for (let i = 1; i <= steps; i++) {
    const value = Math.round((TARGET / steps) * i);
    display.textContent = String(value);
    await new Promise((r) => setTimeout(r, 45));
  }
  display.textContent = String(TARGET);
  await new Promise((r) => setTimeout(r, 500));
  await swapText(capitalize(numberToWords(TARGET)));
}

playCounter();`,

  seo: {
    title: 'Number to Word Morph Counter — Animated Count-Up JS',
    description: 'Stat counter that counts up numerically then morphs into its spelled-out word form with a cross-fade transition. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Number to Word Morph Counter — Count-Up Then Number-to-Words Cross-Fade',
      description: `A number-to-word morph counter first counts up like a standard [number ticker](/ui-snippets/number-ticker/) or [odometer stat counter](/ui-snippets/odometer-stat-counter/), then — once it reaches its final value — cross-fades into the same number spelled out as a word ("248" becomes "Two hundred forty-eight"). The two-stage reveal gives a statistic both the punch of a fast numeric count-up and the warmth of plain language, which plain digits alone do not communicate as well in a marketing context.

**The count-up phase**

\`playCounter()\` runs a simple stepped loop: \`steps = 14\`, and on each iteration it computes \`value = Math.round((TARGET / steps) * i)\` and writes it directly into \`display.textContent\`, pausing \`45ms\` between steps with \`await new Promise((r) => setTimeout(r, 45))\`. This is a linear count rather than an eased one — every step advances the same amount — which keeps the code simple and reads clearly as "counting" rather than a decelerating stat-ticker animation.

**Converting a number into English words**

\`numberToWords(n)\` is a small recursive number-to-English converter built from three lookup arrays: \`ones\` (zero through nine), \`teens\` (ten through nineteen), and \`tens\` (the tens-place words: twenty, thirty, etc). For numbers under 10 it indexes \`ones\` directly; for 10-19 it indexes \`teens\`; for 20-99 it combines a \`tens\` word with a hyphenated \`ones\` remainder ("forty-eight"); for 100-999 it recurses on the remainder after subtracting the hundreds ("two hundred forty-eight"); and for 1000+ it recurses again for the thousands group. This mirrors how the number is actually said aloud in English, built up compositionally rather than from one giant lookup table.

**The cross-fade swap**

\`swapText(newText)\` adds a \`.swap\` class that fades the number out and drops it slightly (\`opacity: 0; transform: translateY(10px) scale(0.9)\`) over \`180ms\`, waits for that transition to finish via a matching \`setTimeout\`, replaces the \`textContent\` while the element is invisible, then removes \`.swap\` to fade the new text back in. Because the DOM swap happens exactly at the moment of zero opacity, there is no visible flash or wrong-content flicker — the morph looks like one continuous, smooth transformation from digits to words.

**Sequencing with async/await**

The whole sequence — count up, hold, then morph to words — reads top to bottom as a single \`async function playCounter()\` using \`await\` on each timed step. This avoids the nested-callback "pyramid" that chaining several \`setTimeout\` calls would otherwise produce, and makes the "Replay" button trivial: it just calls \`playCounter()\` again, which resets \`display.textContent\` to \`'0'\` before re-running the whole sequence.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Watch it load, then replay', text: 'The counter counts from 0 to its target value, then morphs into the spelled-out word. Click "Replay" to run the whole sequence again.' },
        { title: 'Change the target number', text: 'In the JS panel, update const TARGET = 248 to any positive integer — numberToWords() handles values into the thousands.' },
        { title: 'Adjust the count-up speed', text: 'Change steps (currently 14) or the 45ms delay inside the for loop in playCounter() — more steps and a shorter delay produce a smoother, faster count.' },
        { title: 'Change the pause before the morph', text: 'Update the 500ms setTimeout between the count-up finishing and swapText() being called.' },
        { title: 'Change the suffix label', text: 'Edit the "teams" text inside .morph-suffix in the HTML panel to match your own stat (users, downloads, stars, and so on).' },
        { title: 'Export in your format', text: 'Click "HTML" for a standalone file, "JSX" for a React component, or "Tailwind" for a React + Tailwind version.' },
      ],
    },
    features: [
      'Counts up numerically first, then cross-fades into the spelled-out word form',
      'numberToWords() is a self-contained recursive number-to-English converter',
      'Handles ones, teens, tens, hundreds, and thousands compositionally',
      'Cross-fade swap replaces textContent only while fully transparent — no flicker',
      'Whole sequence written as one readable async/await function, no callback nesting',
      'Replay button re-runs the full count-up-then-morph sequence from zero',
      'Zero dependencies — no counting or animation library required',
      'Fully customizable target number, suffix label, and timing constants',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Landing page trust and social-proof stats', desc: 'Show a user, download, or customer count that counts up and then resolves into words for a more human, less spreadsheet-like feel than raw digits alone.' },
      { icon: 'DESIGN', title: 'Annual report and impact number reveals', desc: 'Nonprofit and impact-focused sites benefit from spelling out a milestone number ("One million meals served") for warmth and emphasis after the count-up grabs attention.' },
      { icon: 'LEARN', title: 'Learn recursive number-to-word conversion', desc: 'Edit numberToWords() in the JS panel and test different TARGET values to see how the recursive breakdown into hundreds, tens, and ones composes the final phrase.' },
      { icon: 'FLOW', title: 'Onboarding milestone celebrations', desc: 'Celebrate a user reaching a milestone (100th task completed, 50th day streak) by counting up to the number and then morphing it into words for extra warmth.' },
      { icon: 'CODE', title: 'Pair with a scroll-triggered counter', desc: 'Combine with an IntersectionObserver (see the pattern in [3D character flip reveal](/ui-snippets/char-flip-reveal-3d/)) so playCounter() only fires once the stat scrolls into view.' },
      { icon: 'STAR', title: 'Pricing and plan comparison stat call-outs', desc: 'Highlight a key number (seats included, storage limit) with the count-up-then-word treatment to make a plan feature more memorable than a plain number.' },
    ],
    faqs: [
      { q: 'How does numberToWords() handle a number like 248?', a: 'It sees 248 is under 1000 and over 99, so it takes the hundreds digit (2, giving "two hundred") and recurses on the remainder (48). The recursive call on 48 sees it is 20-99, so it combines the tens word ("forty") with a hyphenated ones word ("eight"), producing "forty-eight". The two pieces join as "two hundred forty-eight".' },
      { q: 'Why does the DOM text swap happen mid-transition instead of immediately?', a: 'swapText() adds the .swap class, which fades opacity to 0 over 180ms, and only replaces textContent after awaiting that same 180ms via setTimeout. Swapping the text while the element is fully transparent means the viewer never sees the old and new text overlap or flash.' },
      { q: 'Why use a linear count-up instead of an eased one?', a: 'The count-up here is intentionally simple and linear (equal increments per step) to keep the code easy to read and to keep the count-up phase visually distinct from the smoother cross-fade morph that follows it. Swap in an eased formula, such as easeOutQuad on the step progress, for a decelerating count instead.' },
      { q: 'Does numberToWords() handle numbers above 999?', a: 'Yes, up into the low thousands — it detects values of 1000 or more, recursively converts the thousands group, appends "thousand", and recurses again on the remainder below 1000. It does not currently handle millions; extend the pattern with another tier if you need larger numbers.' },
      { q: 'How do I skip the count-up and just show the word morph?', a: 'In playCounter(), remove the for loop entirely and set display.textContent = String(TARGET) directly before the pause and swapText() call.' },
      { q: 'Can I use this in React?', a: 'Yes. Click "JSX" for a React component. Move numberToWords() to a plain utility function, drive the count-up and swap phases from useState plus useEffect with async helper functions, and guard against state updates after unmount with a cleanup flag.' },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace through numberToWords(248) step by step, showing exactly which branch of the if/else chain fires and how the recursive calls compose "two hundred forty-eight" from the three lookup arrays. It's also worth a correctness conversation: ask what numberToWords() currently does with 0, with a number like 1000000, or with a negative number, and how you would extend it to handle those cases correctly. For extending it, ask for a version that also spells out numbers in a different language, one where the count-up phase uses an eased deceleration instead of equal linear steps, or one that triggers automatically via IntersectionObserver only when the stat scrolls into view instead of firing immediately on page load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a stat counter that first counts up numerically to a target value and then cross-fades into that same number spelled out in English words, using plain HTML, CSS, and vanilla JavaScript — no libraries.

Requirements:
- A self-contained function that converts any non-negative integer into its English word form, correctly handling ones (zero through nine), teens (ten through nineteen), tens with a hyphenated ones remainder (like "forty-eight"), hundreds with a recursively converted remainder (like "two hundred forty-eight"), and thousands with a recursively converted remainder, without one giant lookup table for every possible number.
- A count-up sequence that updates a display element's text a fixed number of times, advancing toward the target value in equal steps with a short delay between each step, written as a single async function using await rather than nested callbacks.
- After the count-up reaches its final numeric value, hold briefly, then cross-fade into the spelled-out word form: fade the display element's opacity to zero (with a small transform, like a slight vertical shift and scale-down, for extra motion), swap the underlying text content only while it is fully invisible, then fade it back in — so there is no visible flicker or overlap between the numeric and word text.
- Include a replay button that resets the display to zero and re-runs the entire count-up-then-morph sequence from the start.
- Run the sequence automatically once on page load in addition to being replayable via the button.`,
    },
  },
};

export default numberWordMorphCounter;
