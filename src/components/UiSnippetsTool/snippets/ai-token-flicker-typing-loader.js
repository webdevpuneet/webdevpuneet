const aiTokenFlickerTypingLoader = {
  id: 'ai-token-flicker-typing-loader',
  title: 'AI Token Flicker Typing Loader',
  category: 'loaders',
  html: `<div class="tf-wrap">
  <div class="tf-bubble">
    <span class="tf-text" id="tfText"></span><span class="tf-cursor"></span>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0f1a;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}

.tf-wrap{width:100%;max-width:420px}
.tf-bubble{background:#12162a;border:1px solid #232a45;border-radius:14px;padding:16px 18px;font-size:14px;line-height:1.7;color:#e7e9f5}

.tf-text{white-space:pre-wrap}
.tf-text .tf-settled{color:#e7e9f5}
.tf-text .tf-guessing{color:#5a6180;transition:color .08s}

.tf-cursor{display:inline-block;width:2px;height:16px;background:#818cf8;vertical-align:-3px;margin-left:1px;animation:tfBlink 1s step-end infinite}
@keyframes tfBlink{50%{opacity:0}}`,

  js: `// Simulates the look of token-by-token generation: for each upcoming word,
// several plausible "candidate" words flicker rapidly in a dim tone before
// the real word settles into place in full color \\u2014 distinct from a plain
// three-dot bounce or a static blinking cursor typing indicator.
var textEl = document.getElementById('tfText');

var FINAL = "Based on your traffic data, mobile users are converting at a noticeably lower rate than desktop, mainly due to a slow checkout form on smaller screens.";
var WORDS = FINAL.split(' ');

var CANDIDATE_POOL = ['analyzing', 'perhaps', 'roughly', 'considering', 'likely', 'checking', 'reviewing', 'possibly', 'estimating', 'comparing'];

function randomCandidates(count) {
  var picks = [];
  for (var i = 0; i < count; i++) {
    picks.push(CANDIDATE_POOL[Math.floor(Math.random() * CANDIDATE_POOL.length)]);
  }
  return picks;
}

var settledSpan = document.createElement('span');
settledSpan.className = 'tf-settled';
var guessSpan = document.createElement('span');
guessSpan.className = 'tf-guessing';
textEl.appendChild(settledSpan);
textEl.appendChild(guessSpan);

function typeWord(index) {
  if (index >= WORDS.length) return;
  var real = WORDS[index];
  var flickers = randomCandidates(3 + Math.floor(Math.random() * 3));
  var f = 0;

  var flickerTimer = setInterval(function () {
    if (f >= flickers.length) {
      clearInterval(flickerTimer);
      guessSpan.textContent = '';
      settledSpan.textContent += (index > 0 ? ' ' : '') + real;
      setTimeout(function () { typeWord(index + 1); }, 90 + Math.random() * 120);
      return;
    }
    guessSpan.textContent = (index > 0 ? ' ' : '') + flickers[f];
    f++;
  }, 55);
}

setTimeout(function () { typeWord(0); }, 500);`,

  seo: {
    title: 'AI Token Flicker Typing Loader — Streaming Token Guess Animation CSS JS',
    description: 'A chat typing indicator where dim candidate-word flickers settle into each real word, mimicking token-by-token AI generation. Exports to React, Vue & Tailwind.',
    about: {
      title: 'AI Token Flicker Typing Loader — A Typing Indicator That Mimics Token-by-Token Generation',
      description: `The three-dot bounce is the default typing indicator everywhere, but it communicates nothing about what's actually happening when an AI model generates text token by token. This snippet takes a different approach inspired by that literal generation process: before each real word appears, a handful of dim, rapidly-flickering "candidate" words flash in place, then the actual word settles into full color — visually suggesting the model considering several possible next tokens before committing to one.

**Two coexisting spans, not a full re-render**

The revealed text lives in \`.tf-settled\`, appended to permanently word by word as each one finishes. The currently-flickering word lives in a separate \`.tf-guessing\` span appended right after it. Only the guessing span's \`textContent\` is replaced on every flicker tick — the settled text is never touched once written, so there's no flash of the whole paragraph re-rendering, only the live edge of generation visibly working.

**Randomized flicker count and speed**

Each word gets a randomized 3 to 5 "candidate" flickers pulled from a small pool of plausible filler words, each shown for about 55ms before the next candidate replaces it — fast enough to read as machine-speed consideration rather than a deliberate slow reveal. The number of flickers varies per word so the rhythm doesn't feel mechanically identical across the whole sentence.

**A real word-by-word reveal loop**

\`typeWord(index)\` recursively calls itself for the next word only after the current word's flicker sequence completes and is appended to the settled text, with a small randomized pause between words (90ms to roughly 210ms) so pacing feels closer to natural speech cadence than a fixed-interval typewriter.

**Distinct from a three-dot bounce or a plain typewriter**

A three-dot bounce says only "something is happening." A plain character-by-character typewriter (like [the typewriter status log loader](/ui-snippets/loader-typewriter-status-log/)) says "text is being revealed" but implies the text is already fully known and just being played back. This flicker pattern specifically suggests uncertainty resolving into a decision per word — a much closer visual metaphor for autoregressive token generation, and a genuinely different read for users familiar with how AI text streaming actually looks and feels.

**Customizing it**

Replace \`FINAL\` with your own real generated sentence, or better, drive \`typeWord\` from an actual streaming API response: as each real token/word arrives from your backend, run a short flicker using recent-but-wrong candidate words (or simply the previous partial token) before settling on the true one. Adjust \`CANDIDATE_POOL\`, flicker count range, and timing to taste. Pair it with [an AI thinking loader](/ui-snippets/ai-thinking-loader/) for the state before generation begins, switching to this component once the first real token streams in.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Paste HTML, CSS, and JS', text: 'A chat bubble appears with a blinking cursor, then word-by-word generation begins.' },
        { title: 'Watch the flicker per word', text: 'Several dim candidate words flash rapidly before each real word settles in full color.' },
        { title: 'Watch the sentence build', text: 'Settled words remain fixed while only the live edge keeps flickering.' },
        { title: 'Reach the end', text: 'The cursor keeps blinking after the final word, ready for a real response to follow.' },
        { title: 'Edit FINAL and CANDIDATE_POOL', text: 'Change the target sentence and the pool of filler words used for flickers.' },
        { title: 'Wire up real streaming', text: 'Call typeWord-style logic from your actual token stream instead of the fixed FINAL string.' },
      ],
    },
    features: [
      'Dim candidate-word flicker settles into each real word in full color',
      'Two-span architecture keeps settled text untouched while only the live word updates',
      'Randomized flicker count and per-word pause for a natural, non-mechanical rhythm',
      'Blinking cursor follows the live generation edge',
      'Visually distinct from a three-dot bounce or a plain character typewriter',
      'Mimics the metaphor of token-by-token autoregressive generation',
      'Data-driven FINAL sentence and CANDIDATE_POOL array',
      'Zero dependencies — vanilla DOM text manipulation only',
      'Easy to wire into a real streaming API response',
      'Compact chat-bubble layout, ready to drop into a thread',
    ],
    useCases: [
      { icon: 'APP', title: 'AI chat response generation', desc: 'Show this as the assistant\\u2019s message streams in, pairing with an [ai thinking loader](/ui-snippets/ai-thinking-loader/) for the state before generation starts.' },
      { icon: 'CODE', title: 'Autocomplete and code-completion UIs', desc: 'Suggest multiple candidate completions flickering before one is chosen or accepted.' },
      { icon: 'FORM', title: 'AI writing assistants', desc: 'A more literal visualization of text generation than a generic loading spinner.' },
      { icon: 'LEARN', title: 'Teaching token-generation metaphors in UI', desc: 'A reference for communicating a specific technical process through animation.' },
      { icon: 'DESIGN', title: 'Search-with-AI and summarization tools', desc: 'Differentiate AI-generated content from static loading elsewhere on the page.' },
      { icon: 'CODE', title: 'Related: Typing Indicator', desc: 'See the [Typing Indicator](/ui-snippets/typing-indicator/) for the classic three-dot alternative to this pattern.' },
      { icon: 'CODE', title: 'Related: Realistic Network Progress Bar', desc: 'See the [Realistic Network Progress Bar](/ui-snippets/realistic-network-progress-bar/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is this different from a standard three-dot typing indicator?', a: 'A three-dot bounce communicates only that something is happening, with no relation to the actual content. This component flickers plausible candidate words in a dim tone before each real word settles in full color, directly visualizing the idea of a model considering multiple possible next tokens before committing \\u2014 a much more literal metaphor for how AI text generation actually works.' },
      { q: 'Why does only part of the text update on each flicker tick?', a: 'The revealed sentence lives in a separate .tf-settled span that is only ever appended to, never rewritten. The currently-flickering word lives in its own .tf-guessing span whose textContent is replaced on each tick. Keeping them separate means only the live edge of generation re-renders, not the whole growing paragraph.' },
      { q: 'How do I connect this to a real streaming AI response?', a: 'Instead of iterating the fixed FINAL string, call your flicker-then-settle logic each time a real token or word arrives from your SSE/WebSocket stream: run a short flicker of a few candidate strings (or the model\\u2019s own top alternative tokens, if your API exposes them), then append the real received word to the settled span exactly as typeWord does.' },
      { q: 'Why do the candidate flickers vary in count and speed per word?', a: 'Each word draws a random 3 to 5 candidates from the pool, shown at a fixed fast interval, so the total flicker duration naturally varies word to word. This avoids the identical, robotic rhythm a fixed-count fixed-speed loop would produce across an entire sentence.' },
      { q: 'Can I use real "top alternative token" data instead of a random filler pool?', a: 'Yes \\u2014 if your model API exposes alternative token candidates and their probabilities (some do via logprobs), swap CANDIDATE_POOL\\u2019s random pick for those real alternatives so the flicker genuinely reflects the model\\u2019s own uncertainty rather than decorative filler words.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. Keep settledText and the current guessWord in state, run the flicker sequence inside an effect keyed to the current word index (using setInterval with cleanup), and append to settledText only once the flicker sequence completes \\u2014 render both pieces of state as adjacent spans exactly as the vanilla version does.' },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming this is a typewriter effect with extra styling, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the two-span structure (a permanent .tf-settled span versus a replaced-on-every-tick .tf-guessing span) avoids re-rendering the whole sentence on each flicker, and why that separation matters for performance as the sentence grows long. The same assistant can help optimize it \\u2014 for instance asking whether the nested setInterval-inside-setTimeout recursion in typeWord could be restructured to avoid creating a new interval per word. It's also useful for extending it: ask it to drive the candidate flickers from a real model API's logprobs/alternative-token data instead of a random filler pool, add a subtle scale-in for the settling word, or support streaming multiple sentences with paragraph breaks. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an AI chat "typing" indicator in plain HTML, CSS, and JavaScript \\u2014 no libraries \\u2014 that visually mimics token-by-token text generation instead of using a generic three-dot bounce.

Requirements:
- A chat bubble containing a growing sentence of already-revealed text plus a blinking cursor at the live edge.
- Reveal the target sentence one word at a time, but before each real word is committed, rapidly flicker through several dim, differently-colored "candidate" words in that same position (pulled from a small pool of plausible filler words) at a fast fixed interval, simulating the model considering multiple possible next tokens.
- After the flicker sequence for a word finishes, the real word must be appended in full color to a permanently-growing "settled" portion of the sentence that is never re-rendered on subsequent ticks \\u2014 use two separate text-containing elements (one for settled text, one for the currently-flickering candidate) so unrelated DOM isn't rewritten every tick.
- Randomize both the number of candidate flickers per word (a small range, like 3 to 5) and the short pause between finishing one word and starting the next, so the pacing doesn't feel mechanically identical across the sentence.
- Keep a blinking block or bar cursor animated via CSS immediately after the live edge of the text at all times.
- Make the target sentence and the candidate word pool easy to swap out, since a real implementation would drive this from an actual token stream rather than a fixed string.`,
    },
  },
};

export default aiTokenFlickerTypingLoader;
