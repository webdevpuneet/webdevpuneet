const dyslexiaFontToggle = {
  id: 'dyslexia-font-toggle',
  title: 'Dyslexia-Friendly Reading Mode',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<div class="demo-wrap" id="demoWrap">
  <div class="toolbar">
    <button class="mode-btn" id="modeBtn" aria-pressed="false">
      <span aria-hidden="true">&#128214;</span> Reading mode
    </button>
    <label class="ruler-toggle">
      <input type="checkbox" id="rulerCheck">
      Reading ruler
    </label>
  </div>

  <article class="reading-card">
    <h2>Why Maps Lie a Little</h2>
    <p>Every map is a small act of persuasion. Flatten a round planet onto a rectangle and something always has to give: distance, direction, or the true size of a continent. Cartographers choose their compromise on purpose, and that choice quietly shapes how we picture the world before we ever leave the room.</p>
    <p>Mercator's projection, drawn in 1569 for sailors who needed straight compass lines, made Greenland look roughly the size of Africa. In reality Africa is about fourteen times larger. The distortion wasn't a mistake. It was the price of a map that ships could actually steer by, and centuries later it still hangs on classroom walls, quietly rearranging how big the world's continents feel.</p>
  </article>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #fbf9f4; color: #2b2820; min-height: 100vh; cursor: default;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 600px; margin: 0 auto; padding: 40px 22px 60px; position: relative; }

.toolbar { display: flex; align-items: center; gap: 18px; margin-bottom: 22px; flex-wrap: wrap; }
.mode-btn {
  display: flex; align-items: center; gap: 8px;
  font-family: inherit; font-size: 13.5px; font-weight: 700;
  background: #1f6f5c; color: #fff; border: none; padding: 10px 16px;
  border-radius: 10px; cursor: pointer;
}
.mode-btn:hover { background: #185a4a; }
.mode-btn:focus-visible { outline: 3px solid #185a4a; outline-offset: 3px; }
.mode-btn[aria-pressed="true"] { background: #123f34; }

.ruler-toggle { display: flex; align-items: center; gap: 7px; font-size: 13px; color: #5c5644; font-weight: 600; cursor: pointer; }
.ruler-toggle input { accent-color: #1f6f5c; width: 16px; height: 16px; }

.reading-card {
  background: #fffef9; border: 1px solid #e9e3d2; border-radius: 16px;
  padding: 30px 28px; box-shadow: 0 8px 26px rgba(60,50,20,0.05);
  transition: font-family 0.2s, letter-spacing 0.2s, line-height 0.2s, word-spacing 0.2s;
}
.reading-card h2 { font-size: 21px; margin-bottom: 16px; letter-spacing: -0.01em; }
.reading-card p { font-size: 16px; line-height: 1.65; color: #3a3527; margin-bottom: 16px; max-width: 56ch; }
.reading-card p:last-child { margin-bottom: 0; }

/* ---- Dyslexia-friendly reading mode ----
   Real, honest levers: generous letter-spacing and word-spacing reduce
   letter-crowding; taller line-height stops the eye losing its place
   between lines; a wider left-aligned measure avoids justified ragged
   spacing; and a plain, highly-legible web-safe sans stack (no single
   commercial "dyslexia font" is claimed, since the research on any one
   typeface curing reading difficulty is inconclusive — spacing and
   line-height changes have the more consistently documented benefit). */
.demo-wrap.reading-mode .reading-card {
  font-family: Verdana, Tahoma, 'Trebuchet MS', Arial, sans-serif;
  letter-spacing: 0.035em;
  word-spacing: 0.18em;
  line-height: 2;
}
.demo-wrap.reading-mode .reading-card h2 { letter-spacing: 0.01em; }
.demo-wrap.reading-mode .reading-card p { max-width: 62ch; text-align: left; }

/* Reading ruler: a horizontal band that follows the cursor vertically,
   helping the eye track a single line without losing its row. Pointer-
   events are disabled on the ruler itself so it never blocks clicks. */
.reading-ruler {
  position: fixed;
  left: 0;
  width: 100%;
  height: 34px;
  background: rgba(31,111,92,0.10);
  border-top: 2px solid rgba(31,111,92,0.4);
  border-bottom: 2px solid rgba(31,111,92,0.4);
  pointer-events: none;
  z-index: 50;
  display: none;
}
.reading-ruler.active { display: block; }`,

  js: `const demoWrap = document.getElementById('demoWrap');
const modeBtn = document.getElementById('modeBtn');
const rulerCheck = document.getElementById('rulerCheck');

modeBtn.addEventListener('click', () => {
  const active = demoWrap.classList.toggle('reading-mode');
  modeBtn.setAttribute('aria-pressed', String(active));
});

// Reading ruler: a thin band that follows the pointer's vertical position,
// helping the eye stay locked to one line at a time. Built once, then
// shown/hidden rather than created and destroyed on every toggle.
let ruler = document.createElement('div');
ruler.className = 'reading-ruler';
document.body.appendChild(ruler);

function moveRuler(e) {
  ruler.style.top = (e.clientY - 17) + 'px';
}

rulerCheck.addEventListener('change', () => {
  if (rulerCheck.checked) {
    ruler.classList.add('active');
    document.addEventListener('mousemove', moveRuler);
  } else {
    ruler.classList.remove('active');
    document.removeEventListener('mousemove', moveRuler);
  }
});`,

  seo: {
    title: 'Dyslexia-Friendly Reading Mode — Free Accessible Text Toggle',
    description: `A reading-mode toggle that widens letter and word spacing, increases line-height, and switches to a plain legible font — plus an optional cursor-following reading ruler. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Dyslexia-Friendly Reading Mode — Spacing and Rhythm, Not a Miracle Font',
      description: `A lot of "dyslexia-friendly" web features overpromise: they bundle a single paid or free typeface and imply it alone fixes reading difficulty. The research on any specific commercial typeface curing dyslexia is genuinely inconclusive, and this snippet is deliberately honest about that. What it does instead is apply the levers with the more consistently documented benefit for many readers — generous letter-spacing, wider word-spacing, taller line-height, and a plain, uncluttered web-safe sans-serif stack — plus an optional reading ruler that tracks the cursor vertically to help the eye hold its place on a line.

**What actually changes in reading mode**

Toggling reading mode adds a class that sets \`letter-spacing: 0.035em\`, \`word-spacing: 0.18em\`, and \`line-height: 2\` on the article, and swaps the font stack to \`Verdana, Tahoma, 'Trebuchet MS', Arial, sans-serif\` — widely available system fonts chosen for even letter shapes and a lack of tight kerning, not a licensed "dyslexia font." Increased spacing between letters and words reduces the visual crowding that makes adjacent characters harder to distinguish, and the taller line-height gives the eye more room to return to the correct line after a saccade, which is one of the more common friction points readers describe.

**The reading ruler**

A thin horizontal band, built once and toggled with a checkbox, follows the mouse's vertical position across the page via a single \`mousemove\` listener, giving the reader a visual anchor for "which line am I on" without the eye needing to hold that position from memory. It's \`pointer-events: none\`, so it never blocks clicks or text selection underneath it — a common bug in naive ruler implementations that intercept the very content they're meant to help read.

**Complementary, not a replacement, for other tools**

This kind of in-page reading mode is a lightweight, always-available complement to — not a replacement for — assistive technology like screen readers or dedicated reading-support software; it helps a broader set of readers, including many without a diagnosed reading difference, who simply find generously spaced text easier to parse on a screen. Pair it with [a text size adjuster](/ui-snippets/text-size-adjuster/) so users can also scale type up, or [a reading mode toggle](/ui-snippets/reading-mode-toggle/) that strips a page down to its core content, and consider [a text-to-speech button](/ui-snippets/text-to-speech-button/) as an audio alternative for the same paragraph.

**Honest framing matters**

Ship this as one option among several rather than as a cure-all badge — the goal is giving readers real, adjustable control over spacing and rhythm, the same spirit as [a high-contrast mode toggle](/ui-snippets/high-contrast-mode-toggle/) giving control over color and border weight. Both are about configurability, not a single "correct" accessible default forced on everyone.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Reading mode"', text: `Letter-spacing, word-spacing, and line-height all widen; the font switches to a plain sans stack.` },
      { title: 'Compare the two states', text: `Toggle it off and back on to see exactly how much spacing changes.` },
      { title: 'Check "Reading ruler"', text: `A translucent band appears and follows your mouse vertically down the page.` },
      { title: 'Move the mouse over the text', text: `The ruler tracks the pointer, helping isolate a single line at a time.` },
      { title: 'Uncheck the ruler', text: `The mousemove listener detaches; the band disappears.` },
      { title: 'Adjust the values for your content', text: `Tune letter-spacing, word-spacing, and line-height to your own typography.` },
    ] },
    features: [
      { title: 'Honest, non-branded typography', text: `A plain web-safe font stack, no unverified "dyslexia font" claim.` },
      { title: 'Wider letter and word spacing', text: `Reduces visual crowding between adjacent characters.` },
      { title: 'Taller line-height', text: `Gives the eye more room to find the next line correctly.` },
      { title: 'Cursor-following reading ruler', text: `A single mousemove listener drives a pointer-events:none band.` },
      { title: 'Non-destructive toggle', text: `A class swap on the wrapper — original content and markup untouched.` },
      { title: 'aria-pressed state', text: `The mode button communicates on/off to assistive technology.` },
      { title: 'Ruler never blocks clicks', text: `pointer-events:none keeps the ruler purely visual.` },
      { title: 'Built once, toggled cheaply', text: `The ruler element is created once, not recreated per toggle.` },
    ],
    useCases: [
      { title: 'Long-form article reading', text: 'Let readers opt into wider letter and word spacing and a taller line height, using a plain web-safe font stack rather than an unproven branded typeface.' },
      { title: 'Accessibility settings panels', text: 'Pair with a [text size adjuster](/ui-snippets/text-size-adjuster/) and a [reading mode toggle](/ui-snippets/reading-mode-toggle/) so users can tune several reading options together.' },
      { title: 'Educational platforms', text: 'Give students control over spacing and an optional cursor-following reading ruler, driven by a single `mousemove` listener on a pointer-events-none overlay.' },
      { title: 'Dense documentation', text: 'Improve legibility of technical pages full of code and tables, by reducing crowding between adjacent characters through spacing alone.' },
      { title: 'News and publishing', text: 'Offer alongside a [dark mode toggle](/ui-snippets/dark-mode-toggle/) as a reading preference, or combine with a [text to speech button](/ui-snippets/text-to-speech-button/) for audio-paired reading.' },
      { icon: 'CODE', title: 'Related: Icon Toolbar — Roving Tabindex Keyboard Navigation', desc: 'See the [Icon Toolbar — Roving Tabindex Keyboard Navigation](/ui-snippets/icon-toolbar-roving-tabindex/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Does this use a special "dyslexia font"?', a: `No — deliberately not. The evidence that any single commercial or free "dyslexia typeface" meaningfully improves reading for people with dyslexia is inconclusive and contested in the research. This snippet instead uses a plain, widely available web-safe sans stack (Verdana, Tahoma, Trebuchet MS, Arial) and focuses its actual effort on spacing and line-height, which have more consistent reported benefit for many readers.` },
      { q: 'What specifically changes when reading mode is on?', a: `Three CSS properties on the article: letter-spacing increases to 0.035em, word-spacing increases to 0.18em, and line-height increases to 2, alongside the plain font-stack swap. Together these reduce letter-crowding and give the eye more vertical room to correctly find the next line, both commonly cited sources of reading friction.` },
      { q: 'How does the reading ruler work technically?', a: `A single fixed-position div is created once and appended to the body. A mousemove listener, attached only while the ruler checkbox is checked, updates the ruler\'s top offset to track the cursor's vertical position. The ruler has pointer-events: none so it never intercepts clicks, text selection, or other interaction with the content beneath it.` },
      { q: 'Is this a replacement for a screen reader or real assistive technology?', a: `No — it's a lightweight, always-available reading preference, not a replacement for dedicated assistive technology. It can genuinely help many readers, with or without a diagnosed reading difference, who find generously spaced text easier to parse, but it should be offered alongside, not instead of, tools like a screen reader or a text-to-speech option.` },
      { q: 'Can I let users control the spacing amount instead of a fixed on/off?', a: `Yes — swap the fixed CSS values for CSS custom properties (e.g. --letter-spacing, --line-height) driven by a slider input instead of a checkbox, so readers can dial in their own preferred amount rather than accepting one fixed "reading mode" preset.` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it why the demo intentionally avoids branding itself around a specific "dyslexia font" and instead focuses on spacing and line-height — it's a good prompt for understanding what the actual accessibility research does and doesn't support, so you can make an informed choice for your own product rather than copying a marketing claim. You can also ask the assistant to convert the fixed spacing values into user-adjustable sliders bound to CSS custom properties, or to persist the chosen settings in localStorage across visits. It's worth asking it to review the reading ruler's mousemove handler for performance on long pages, and whether it should be throttled. Treat this as a starting point for a genuinely configurable reading-accessibility feature, not a finished one-size-fits-all preset.`,
      prompt: `Build a "reading mode" toggle in plain HTML, CSS, and JavaScript aimed at readers who find dense text hard to parse, including many with dyslexia.

Requirements:
- Do NOT claim or bundle a specific "dyslexia font" — instead use a plain, widely available web-safe sans-serif font stack (e.g. Verdana, Tahoma, Trebuchet MS, Arial) as the legible alternative typeface.
- A toggle button that adds a class to a wrapper element, and under that class, increase letter-spacing and word-spacing noticeably, increase line-height significantly (roughly double single-spacing), and switch to the plain font stack — all via CSS transitions, without altering the underlying HTML content.
- The toggle button must expose its on/off state via aria-pressed for assistive technology.
- Add a separate checkbox that enables an optional "reading ruler": a translucent horizontal band, created once and reused, that follows the mouse cursor's vertical position down the page via a single mousemove listener attached only while the ruler is enabled (detach it when disabled).
- The ruler must use pointer-events: none so it never blocks clicks, text selection, or any interaction with the content underneath it.
- Include realistic body paragraph content to demonstrate the spacing change clearly, and make sure toggling reading mode off restores the original typography exactly.`,
    },
  },
};

export default dyslexiaFontToggle;
