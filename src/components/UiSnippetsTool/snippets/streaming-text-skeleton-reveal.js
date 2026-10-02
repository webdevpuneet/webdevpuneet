const streamingTextSkeletonReveal = {
  id: 'streaming-text-skeleton-reveal',
  title: 'Streaming Text Skeleton Reveal',
  category: 'loaders',
  html: `<div class="sr-wrap">
  <div class="sr-card">
    <div class="sr-line" data-target="AI models generate text one token at a time,"></div>
    <div class="sr-line" data-target="predicting each next word from everything that"></div>
    <div class="sr-line" data-target="came before it in the conversation so far."></div>
  </div>
  <button class="sr-run" id="srRun" type="button">Replay stream</button>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f8fafc;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;padding:24px}

.sr-wrap{width:100%;max-width:420px}
.sr-card{background:#fff;border:1px solid #e2e8f0;border-radius:14px;padding:20px 22px;box-shadow:0 10px 30px rgba(15,23,42,.06);display:flex;flex-direction:column;gap:12px}

.sr-line{font-size:14px;line-height:1.7;color:#1e293b;min-height:24px;position:relative}

/* Each line starts as a shimmer skeleton bar sized to roughly its final text
   width. As real words stream in, the skeleton shrinks from the right while
   revealed words grow from the left \\u2014 the placeholder is being consumed by
   the real content, not swapped out for it all at once. */
.sr-skel{display:inline-block;height:12px;border-radius:5px;vertical-align:middle;
  background:linear-gradient(90deg,#e2e8f0 25%,#eef1f5 37%,#e2e8f0 63%);
  background-size:400% 100%;animation:srShimmer 1.4s ease-in-out infinite;
  transition:width .25s ease-out}
@keyframes srShimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}

.sr-revealed{color:#1e293b}
.sr-revealed.sr-active{color:#4338ca}

.sr-run{padding:9px 16px;background:#6366f1;color:#fff;border:none;border-radius:8px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit}
.sr-run:disabled{opacity:.55;cursor:not-allowed}`,

  js: `// Each skeleton line is measured up front to its full text's real width,
// then genuinely shrinks (not fades) as words are revealed word-by-word,
// so the placeholder visibly gets "eaten" by the arriving real text rather
// than the whole line swapping from gray bar to text in one step.
var lines = Array.prototype.slice.call(document.querySelectorAll('.sr-line'));
var runBtn = document.getElementById('srRun');

function measureTextWidth(text, sampleEl) {
  var probe = document.createElement('span');
  probe.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit';
  probe.style.font = getComputedStyle(sampleEl).font;
  probe.textContent = text;
  document.body.appendChild(probe);
  var w = probe.getBoundingClientRect().width;
  document.body.removeChild(probe);
  return w;
}

function setupLine(lineEl) {
  var target = lineEl.getAttribute('data-target');
  var words = target.split(' ');
  var fullWidth = measureTextWidth(target, lineEl);

  lineEl.innerHTML = '';
  var revealed = document.createElement('span');
  revealed.className = 'sr-revealed';
  var skel = document.createElement('span');
  skel.className = 'sr-skel';
  skel.style.width = fullWidth + 'px';
  lineEl.appendChild(revealed);
  lineEl.appendChild(skel);

  return { lineEl: lineEl, words: words, revealed: revealed, skel: skel, fullWidth: fullWidth, target: target };
}

function revealWord(state, index) {
  if (index >= state.words.length) {
    state.skel.remove();
    return Promise.resolve();
  }
  var soFar = state.words.slice(0, index + 1).join(' ');
  state.revealed.textContent = soFar;
  state.revealed.classList.add('sr-active');
  var remainingWidth = state.fullWidth - measureTextWidth(soFar, state.lineEl);
  state.skel.style.width = Math.max(0, remainingWidth) + 'px';

  return new Promise(function (resolve) {
    setTimeout(function () {
      state.revealed.classList.remove('sr-active');
      resolve(revealWord(state, index + 1));
    }, 140 + Math.random() * 160);
  });
}

function runStream() {
  runBtn.disabled = true;
  var states = lines.map(setupLine);

  function runLineSequentially(i) {
    if (i >= states.length) { runBtn.disabled = false; return; }
    revealWord(states[i], 0).then(function () { runLineSequentially(i + 1); });
  }
  runLineSequentially(0);
}

runBtn.addEventListener('click', runStream);
runStream();`,

  seo: {
    title: 'Streaming Text Skeleton Reveal — Token-by-Token Skeleton Shrink CSS JS',
    description: 'A skeleton loader where shimmer bars genuinely shrink from the right as real words stream in from the left, simulating token-by-token AI text reveal. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Streaming Text Skeleton Reveal \\u2014 A Skeleton That Shrinks as Real Text Streams In',
      description: `Most skeleton loaders for text are static shimmer bars that vanish all at once when the real content arrives. This snippet does something closer to how AI text actually streams in: each line starts as a shimmer bar measured to its final text's real width, and as words are revealed one at a time from the left, the skeleton bar genuinely shrinks from the right by the exact pixel amount the revealed text now occupies \\u2014 the placeholder is visibly being consumed by the real content, not replaced by it in one step.

**Measuring the true target width first**

\`measureTextWidth()\` creates a hidden, absolutely-positioned probe span, copies the target line element's real computed font via \`getComputedStyle(sampleEl).font\`, sets its text, measures \`getBoundingClientRect().width\`, and removes it. This gives each skeleton bar its correct starting width \\u2014 matching the actual pixel width the final sentence will occupy in that exact font, not a guessed or fixed placeholder width.

**The skeleton shrinks, it doesn't fade**

On every word reveal, \`revealWord()\` measures the width of the words revealed so far and sets the skeleton's own \`width\` to \`fullWidth - revealedWidth\`, with a CSS \`transition: width .25s\` smoothing each step. Because the revealed text and the shrinking skeleton are laid out inline side by side, the two visibly meet in the middle as words are typed \\u2014 real content growing from the left while the remaining unknown length shrinks from the right, until the skeleton reaches zero width and is removed entirely.

**Word-by-word, not character-by-character**

Unlike [the typewriter status log loader](/ui-snippets/loader-typewriter-status-log/), which reveals individual characters, this component reveals whole words at a time with a randomized 140\\u2013300ms pause between each \\u2014 closer to how streamed AI responses actually arrive over a network connection (chunked by token or word, not by character), and each newly-revealed word gets a brief highlight color before settling to the normal text color.

**Sequential multi-line streaming**

Multiple lines are revealed strictly in order: \`runLineSequentially()\` only starts the next line's word-by-word reveal once the current line's promise chain (driven recursively by \`revealWord\`) has fully resolved, mirroring how a real streamed paragraph fills in top to bottom rather than every line typing simultaneously.

**Customizing it**

Change the \`data-target\` attributes to your real placeholder sentences, or better, replace the \`revealWord\` recursion with real word-arrival events from your streaming backend \\u2014 the width-measurement and skeleton-shrink logic works the same regardless of what triggers each reveal step. Pair it with [an AI thinking loader](/ui-snippets/ai-thinking-loader/) for the state before the first word streams in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'Three lines render as shimmer bars sized to their eventual real text width.' },
        { title: 'Watch the words stream in', text: 'Each line reveals words left to right while its skeleton bar shrinks from the right in step.' },
        { title: 'Watch lines run in order', text: 'The next line only starts revealing once the previous line finishes.' },
        { title: 'Click "Replay stream"', text: 'Every line resets to its full skeleton width and streams again with new timing.' },
        { title: 'Edit data-target text', text: 'Change each .sr-line\\u2019s data-target attribute to your real placeholder sentences.' },
        { title: 'Wire up real streaming', text: 'Call revealWord-equivalent logic from your actual SSE/WebSocket word-arrival events.' },
      ],
    },
    features: [
      'Skeleton bar genuinely shrinks in width as real words are revealed, not a fade or instant swap',
      'Each line\\u2019s starting skeleton width is measured from its true rendered text width',
      'Word-by-word reveal (not character-by-character) matching real streaming chunk granularity',
      'Randomized per-word pause for a natural, non-mechanical pace',
      'Brief highlight color on each newly-revealed word',
      'Strictly sequential multi-line reveal order',
      'Replayable via a dedicated button with fresh randomized timing',
      'Off-screen text measurement respects the line\\u2019s real computed font',
      'Zero dependencies — vanilla DOM measurement and CSS transitions',
      'Reusable measureTextWidth() and revealWord() helper functions',
    ],
    useCases: [
      { icon: '🤖', title: 'AI chat response placeholders', desc: 'Show a believable streaming reveal, where shimmer bars shrink from the right as real words appear from the left.' },
      { icon: '🔍', title: 'AI search overviews', desc: 'Present a summary box that fills in word by word, a more literal loading state than a static grey block.' },
      { icon: '🎙️', title: 'Live transcription and captions', desc: 'Visualise partial text arriving in chunks, with word-level granularity that matches how real streaming delivers content.' },
      { icon: '📏', title: 'Real-width measurement teaching', desc: 'Learn how each line\'s starting skeleton width is measured from its true rendered text width, so the bar matches the final line exactly.' },
      { icon: '📰', title: 'Article and blog placeholders', desc: 'Give long-form content a richer loading state, using randomised per-word pauses so the pace feels natural, not mechanical.' },
      { icon: 'CODE', title: 'Related: Typewriter Status Log Loader', desc: 'See the [Typewriter Status Log Loader](/ui-snippets/loader-typewriter-status-log/) for a character-by-character alternative reveal technique.' },
    ],
    faqs: [
      { q: 'How is this different from a normal shimmer skeleton that just disappears?', a: 'A normal skeleton is a static bar that vanishes all at once when real content loads. Here, each skeleton bar starts at the real measured width of its final text and shrinks incrementally \\u2014 word by word \\u2014 as that exact amount of real text is revealed, so the placeholder visibly gets consumed by the arriving content instead of being replaced in one step.' },
      { q: 'How does the skeleton know its starting width before any text has been revealed?', a: 'measureTextWidth() renders the full target sentence in a hidden, off-screen probe span that copies the real line element\\u2019s computed font via getComputedStyle(sampleEl).font, then reads its getBoundingClientRect().width. That gives an accurate real-world pixel width for the skeleton to start at, matching exactly how long the final sentence will actually render.' },
      { q: 'Why reveal whole words instead of individual characters?', a: 'Real streamed AI or transcription text typically arrives in word or token-sized chunks over the network, not one character at a time. Revealing whole words with a randomized pause between them more closely matches that real chunk granularity than a character-by-character typewriter effect would.' },
      { q: 'How do I connect this to a real streaming source?', a: 'Replace the recursive revealWord(state, index) calls, which currently advance on a setTimeout, with calls triggered by real word-arrival events from your SSE or WebSocket connection \\u2014 each time a new word arrives, append it to state.revealed and shrink state.skel by the newly measured width exactly as revealWord already does.' },
      { q: 'What happens if the real text ends up longer than the estimated skeleton width?', a: 'Because the skeleton is measured from the actual final target string up front, this only becomes a mismatch if you swap in a live streaming source without knowing the eventual full text length. In that case, estimate the skeleton\\u2019s starting width from an average character count or a cached previous response length, and let it hit zero width early if the real text finishes revealing sooner than that estimate.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep revealedText and remainingWidth in state per line, measure the full target width once via a hidden ref-based probe element on mount, and recompute remainingWidth as revealedText grows inside your reveal loop \\u2014 bind it to the skeleton element\\u2019s inline width style exactly as the vanilla version does.' },
    ],
    aiPrompt: {
      paragraph: `Instead of assuming this is a plain shimmer bar with a fade transition, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how measureTextWidth() uses a hidden off-screen probe and getComputedStyle to determine each line's true target pixel width, and how revealWord() recomputes the skeleton's remaining width on every word reveal so it visibly shrinks in lockstep with the growing real text. The same assistant can help optimize it \\u2014 for instance asking whether measuring text width on every single word reveal is expensive enough at scale to warrant caching cumulative widths instead of re-measuring from scratch each time. It's also useful for extending it: ask it to drive the reveal from a real SSE word stream instead of the built-in randomized timer, add a subtle cursor at the boundary between revealed text and remaining skeleton, or support lines whose final length isn't known until streaming completes. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a text skeleton loader in plain HTML, CSS, and JavaScript \\u2014 no libraries \\u2014 where each line's shimmer skeleton bar genuinely SHRINKS in width as real words stream in, rather than fading out or swapping instantly.

Requirements:
- Several lines, each defined with its eventual full target sentence available up front (e.g. via a data attribute), but initially rendered as a single shimmering skeleton bar.
- Before revealing any words, measure each line's TRUE rendered pixel width for its full target text using a hidden off-screen probe element that copies the real line's computed font (via getComputedStyle), and set the skeleton bar's initial width to that measured value \\u2014 not a guessed or fixed placeholder width.
- Reveal the target sentence word by word (not character by character): on each step, append the next word to a growing "revealed" text span on the left side of the line, then re-measure the width of the words revealed so far and shrink the skeleton bar (positioned immediately after the revealed text) to exactly (full width minus revealed width), using a CSS transition on width so the shrink is smooth rather than a snap.
- Space each word reveal apart with a randomized short delay so the pacing feels like real streamed text arriving over a network rather than a fixed metronome.
- Give each newly-revealed word a brief highlight color that settles back to the normal text color shortly after it appears.
- Once a line's skeleton bar reaches zero width, remove it from the DOM entirely.
- Run multiple lines strictly in sequence \\u2014 a line's word-by-word reveal must only begin after the previous line has fully finished revealing all of its words.`,
    },
  },
};

export default streamingTextSkeletonReveal;
