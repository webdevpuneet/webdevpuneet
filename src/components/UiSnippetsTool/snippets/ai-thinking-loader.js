const aiThinkingLoader = {
  id: 'ai-thinking-loader',
  title: 'AI Thinking Loader',
  lastmod: '2026-07-18',
  category: 'loaders',
  html: `<div class="al-stage">
  <div class="al-bubble">
    <div class="al-orb" aria-hidden="true"></div>
    <div class="al-lines">
      <span class="al-status" id="alStatus">Thinking…</span>
      <div class="al-skeleton"><span></span><span></span><span></span></div>
    </div>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0a0a14;color:#fff;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.al-bubble{display:flex;gap:14px;align-items:flex-start;max-width:360px;width:100%;background:#13131f;border:1px solid #232336;border-radius:16px;padding:16px 18px}

.al-orb{width:34px;height:34px;border-radius:50%;flex-shrink:0;background:conic-gradient(from 0deg,#6366f1,#ec4899,#22d3ee,#6366f1);animation:alSpin 2.4s linear infinite;position:relative}
.al-orb::after{content:'';position:absolute;inset:4px;border-radius:50%;background:#13131f}
@keyframes alSpin{to{transform:rotate(360deg)}}

.al-lines{flex:1;padding-top:2px}
.al-status{display:inline-block;font-size:13.5px;font-weight:600;
  background:linear-gradient(90deg,#6b6b85 0%,#6b6b85 35%,#fff 50%,#6b6b85 65%,#6b6b85 100%);
  background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:alShine 1.8s linear infinite}
@keyframes alShine{0%{background-position:120% 0}100%{background-position:-120% 0}}

.al-skeleton{display:flex;flex-direction:column;gap:7px;margin-top:11px}
.al-skeleton span{height:9px;border-radius:5px;background:linear-gradient(90deg,#1d1d2e 25%,#2c2c44 37%,#1d1d2e 63%);background-size:340% 100%;animation:alWave 1.4s ease-in-out infinite}
.al-skeleton span:nth-child(1){width:92%}
.al-skeleton span:nth-child(2){width:78%;animation-delay:.15s}
.al-skeleton span:nth-child(3){width:60%;animation-delay:.3s}
@keyframes alWave{to{background-position:-340% 0}}`,

  js: `// Cycle through realistic status phrases while the AI "works", so the loader
// communicates progress rather than just spinning.
var status = document.getElementById('alStatus');
var PHRASES = ['Thinking…', 'Reading context…', 'Drafting a response…', 'Checking facts…', 'Almost there…'];
var i = 0;
setInterval(function () {
  i = (i + 1) % PHRASES.length;
  status.style.opacity = '0';
  setTimeout(function () { status.textContent = PHRASES[i]; status.style.opacity = '1'; }, 220);
}, 1900);
status.style.transition = 'opacity .22s';`,

  seo: {
    title: 'AI Thinking Loader — Free HTML CSS JS Chat Loading Snippet',
    description: `An AI chat loading state with a spinning gradient orb, shimmering status text, cycling phrases, and a shimmer skeleton. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'AI Thinking Loader — A Chat Loading State That Feels Alive',
      description: `The AI thinking loader is the loading state that has become standard in chat and assistant interfaces: a gradient orb spins, a shimmering "Thinking…" label cycles through status phrases, and a skeleton of shimmer bars hints at the response forming. This snippet builds the whole thing with plain HTML, CSS, and a small vanilla JavaScript phrase cycler — a far more engaging wait than a bare spinner.

**The spinning gradient orb**

The orb is a circle filled with a four-color \`conic-gradient\` that rotates via the \`alSpin\` keyframe, with an \`::after\` pseudo-element inset by 4px and filled with the bubble background — turning the solid disc into a glowing ring. This is the classic "AI is working" emblem: a rainbow ring spinning beside the message. It is pure CSS and costs only one rotating element.

**Shimmering status text**

The status label uses the same clipped-gradient shimmer technique as polished "shiny text": the text is transparent and filled with a gradient that is mostly muted gray with a bright band, animated across the letters so a sheen sweeps through the word. That motion makes the status feel active — the assistant is not just stuck on a static label, it is visibly working. The shimmer is pure CSS via \`background-clip: text\`.

**Cycling status phrases**

Real assistants reassure users by narrating progress, so JavaScript rotates the label through phrases like "Reading context…", "Drafting a response…", and "Checking facts…" on an interval. Each change fades the label out and back in (a quick opacity transition) so the phrases swap smoothly rather than snapping. Communicating steps, even simulated ones, makes a wait feel shorter and more trustworthy than a single unchanging word.

**The shimmer skeleton**

Below the status, three skeleton bars of decreasing width preview the shape of the incoming answer. Each bar has a moving gradient (\`alWave\`) that sweeps a lighter band across it, with staggered \`animation-delay\`s so the shimmer ripples down the lines. This is the standard content-placeholder technique, here signaling that text is about to stream in — pairing the orb (it is thinking) with the skeleton (a response is coming).

**Three coordinated motions, all CSS**

The orb spin, the text shimmer, and the skeleton wave are independent CSS animations running together, which is what makes the loader feel rich without any animation library. JavaScript only handles the discrete job of swapping phrases, keeping the per-frame work entirely on the compositor.

**Customizing it**

Edit the \`PHRASES\` array to match your assistant voice, recolor the orb gradient and the shimmer band, change the number and widths of skeleton bars, or retime any of the loops. Drop it into a chat thread as the assistant message placeholder, then replace it with the real streamed response when it arrives. Pair it with an [ai chat interface](/ui-snippets/ai-chat-interface/) or a [typing indicator](/ui-snippets/typing-indicator/) for a complete conversation UI.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A chat bubble shows a spinning orb and a shimmering status.` },
      { title: 'Watch the orb', text: `A rainbow gradient ring spins beside the text.` },
      { title: 'Read the status', text: `The shimmering label cycles through progress phrases.` },
      { title: 'See the skeleton', text: `Shimmer bars ripple to preview the incoming answer.` },
      { title: 'Edit the phrases', text: `Change the PHRASES array to your assistant voice.` },
      { title: 'Swap in the response', text: `Replace the loader with the streamed reply.` },
    ] },
    features: [
      { title: 'Spinning gradient orb', text: `A conic ring signals the AI is working.` },
      { title: 'Shimmering status', text: `Clipped-gradient sheen sweeps the label.` },
      { title: 'Cycling phrases', text: `Narrated progress with smooth fades.` },
      { title: 'Shimmer skeleton', text: `Staggered bars preview the answer.` },
      { title: 'Three coordinated motions', text: `Orb, text, and skeleton animate together.` },
      { title: 'Pure-CSS animation', text: `JS only swaps phrases.` },
      { title: 'Chat-ready layout', text: `Drops in as a message placeholder.` },
      { title: 'Fully themeable', text: `Colors, phrases, and timing are tunable.` },
    ],
    useCases: [
      { title: 'AI chat waiting states', text: 'Show a spinning conic-gradient orb and a shimmering Thinking label inside an [AI chat interface](/ui-snippets/ai-chat-interface/) while the model prepares its reply.' },
      { title: 'Floating assistant widgets', text: 'Pair with a [floating chat widget](/ui-snippets/floating-chat-widget/) so a support bot signals work in progress without a bare spinner.' },
      { title: 'Content generation screens', text: 'Narrate progress with cycling phrases that fade smoothly, while staggered shimmer bars preview the shape of the answer to come.' },
      { title: 'Richer typing indicators', text: 'Offer a more informative alternative to a plain [typing indicator](/ui-snippets/typing-indicator/) when the wait is several seconds long.' },
      { title: 'Prompt submit feedback', text: 'Follow an [AI prompt composer](/ui-snippets/ai-prompt-composer/) send with this state, using a clipped-gradient sheen sweeping across the status label.' },
      { icon: 'CODE', title: 'Related: Auto-Retry Loader with Countdown and Manual Retry', desc: 'See the [Auto-Retry Loader with Countdown and Manual Retry](/ui-snippets/auto-retry-countdown-loader/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Barcode Scan Sweep Loader', desc: 'See the [Barcode Scan Sweep Loader](/ui-snippets/loader-barcode-scan-sweep/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Gradient Mesh Loading Screen', desc: 'See the [Gradient Mesh Loading Screen](/ui-snippets/gradient-mesh-loading-screen/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How is the spinning orb made?', a: `The orb is a circle filled with a four-color conic-gradient that rotates on a keyframe, with an ::after pseudo-element inset by 4px and filled with the bubble background. That turns the solid disc into a glowing rainbow ring, the familiar AI-working emblem, using just one rotating element in pure CSS.` },
      { q: 'Why does the status text shimmer?', a: `The label is transparent and filled with a gradient via background-clip: text — mostly muted gray with a bright band — animated across the letters so a sheen sweeps through the word. The motion makes the status feel active and working rather than a static stuck label, and it is entirely CSS.` },
      { q: 'What is the purpose of cycling the phrases?', a: `Narrating progress reassures users and makes a wait feel shorter. JavaScript rotates the label through phrases like Reading context and Drafting a response on an interval, fading each out and back in so they swap smoothly. Even simulated steps feel more trustworthy than a single unchanging word.` },
      { q: 'What does the skeleton communicate?', a: `Three bars of decreasing width with a moving shimmer gradient and staggered delays preview the shape of the incoming answer. Combined with the spinning orb, it pairs the message that the assistant is thinking with the message that a response is about to stream in, which sets the right expectation during the wait.` },
      { q: 'How do I use this AI thinking loader in React, Vue, or Angular?', a: `Render it as a chat message placeholder component and keep the phrase index in state, updating it on an interval set up in a mount effect with cleanup. The orb, shimmer, and skeleton are pure CSS. Swap the component for the real response when streaming begins. In Tailwind, define the spin, shine, and wave keyframes in the config and apply them with utilities.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work through the three overlapping animations by hand — paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the shimmering status text achieves its sheen using background-clip: text with a moving gradient, and how that differs mechanically from the skeleton bars' own wave animation. The same assistant is useful for optimizing it — asking whether the phrase-cycling setInterval and its nested setTimeout for the fade could leak if the loader is removed from the DOM mid-cycle, and how to clean that up properly. It's just as good for extending it: ask it to sync the phrase list to real backend progress events instead of a fixed timer, add a subtle progress percentage to the orb, or make the skeleton bar count and widths configurable via a data attribute. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI thinking loader" chat placeholder in plain HTML, CSS, and JavaScript — no libraries, combining three independent CSS animations plus one small JS interval.

Requirements:
- A chat-bubble-shaped container holding a small circular "orb" on the left and a status column on the right.
- The orb must be filled with a multi-color conic-gradient and continuously rotated with a linear infinite CSS keyframe, with an inset pseudo-element filled in the bubble's background color so the solid disc reads as a glowing ring rather than a filled circle.
- The status text ("Thinking…" etc.) must have a shimmering sheen effect achieved purely in CSS: make the text transparent, fill it with a wide linear-gradient that is mostly a muted color with one bright band, size the background larger than the element, and animate the background-position across an infinite loop so the bright band sweeps through the letters.
- Below the status text, render three skeleton placeholder bars of decreasing width (to preview an incoming multi-line answer), each with its own shimmer: a moving gradient animated via background-position, with staggered animation-delay values so the shimmer ripples down the bars rather than moving in lockstep.
- In JavaScript, cycle the status text through an array of realistic progress phrases (e.g. "Reading context…", "Drafting a response…") on a timer of a couple of seconds, fading the text out via opacity, swapping the textContent, then fading it back in — not an abrupt text swap.
- Keep all continuous motion (the orb spin, the text shimmer, the skeleton wave) as pure CSS keyframe animations so only the discrete phrase-swapping logic touches JavaScript, keeping per-frame work off the main thread.`,
    },
  },
};

export default aiThinkingLoader;
