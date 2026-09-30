const aiGeneratingLoader = {
  id: 'ai-generating-loader',
  title: 'AI Generating Content Loader',
  lastmod: '2026-08-08',
  category: 'loaders',
  html: `<div class="loader-card" id="loader-card">
  <div class="loader-head">
    <div class="ai-dot" id="ai-dot"></div>
    <p class="stage-text" id="stage-text" aria-live="polite">Analyzing request…</p>
  </div>

  <div class="shimmer-lines" id="shimmer-lines">
    <div class="shimmer-line" style="width: 96%;"></div>
    <div class="shimmer-line" style="width: 88%;"></div>
    <div class="shimmer-line" style="width: 92%;"></div>
    <div class="shimmer-line" style="width: 60%;"></div>
  </div>

  <button class="cancel-btn" id="cancel-btn">Cancel generation</button>

  <div class="done-state" id="done-state">
    <div class="done-icon">&#10003;</div>
    <p class="done-text">Response generated.</p>
    <button class="restart-btn" id="restart-btn">Generate again</button>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 32px 20px; }

.loader-card {
  width: 100%; max-width: 420px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 16px;
  padding: 22px; box-shadow: 0 4px 20px rgba(15,23,42,0.06);
}

.loader-head { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
.ai-dot {
  width: 9px; height: 9px; border-radius: 50%;
  background: #6366f1;
  animation: pulse-dot 1.2s ease-in-out infinite;
  flex-shrink: 0;
}
@keyframes pulse-dot {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.5); opacity: 0.5; }
}
.stage-text {
  font-size: 13px; font-weight: 600; color: #475569;
  transition: opacity 0.25s ease;
}
.stage-text.fade { opacity: 0; }

/* — Shimmering text-shaped placeholder — */
/* Each bar mimics a line of streaming text: a moving gradient sweep gives
   the impression of active generation rather than a static "loading" block,
   and lines reveal progressively left-to-right to suggest real streaming. */
.shimmer-lines { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
.shimmer-line {
  height: 14px; border-radius: 6px;
  background: linear-gradient(90deg, #eef2ff 0%, #e0e7ff 20%, #eef2ff 40%);
  background-size: 200% 100%;
  animation: shimmer-sweep 1.6s ease-in-out infinite;
  transform-origin: left center;
  animation-fill-mode: forwards;
}
.shimmer-line:nth-child(1) { animation-delay: 0s; }
.shimmer-line:nth-child(2) { animation-delay: 0.15s; }
.shimmer-line:nth-child(3) { animation-delay: 0.3s; }
.shimmer-line:nth-child(4) { animation-delay: 0.45s; }

@keyframes shimmer-sweep {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Progressive grow-in for each line when generation starts */
.shimmer-line.grow-in {
  animation: shimmer-sweep 1.6s ease-in-out infinite, grow-in 0.5s ease forwards;
}
@keyframes grow-in {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}

.cancel-btn {
  width: 100%; padding: 9px; font-family: inherit; font-size: 12.5px; font-weight: 700;
  background: transparent; color: #94a3b8; border: 1.5px solid #e2e8f0; border-radius: 9px;
  cursor: pointer; transition: all 0.15s;
}
.cancel-btn:hover { border-color: #dc2626; color: #dc2626; }
.cancel-btn:focus-visible { outline: 2px solid #6366f1; outline-offset: 2px; }

/* — Done / cancelled state — */
.done-state { display: none; flex-direction: column; align-items: center; text-align: center; gap: 8px; padding: 10px 0; }
.done-state.show { display: flex; }
.done-icon {
  width: 34px; height: 34px; border-radius: 50%;
  background: #ecfdf5; color: #10b981;
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; font-weight: 700;
}
.done-text { font-size: 13px; font-weight: 600; color: #1e293b; }
.restart-btn {
  margin-top: 6px; padding: 8px 16px; font-family: inherit; font-size: 12.5px; font-weight: 700;
  background: #6366f1; color: #fff; border: none; border-radius: 8px; cursor: pointer;
}
.restart-btn:hover { background: #4f46e5; }`,

  js: `const stageText = document.getElementById('stage-text');
const shimmerLines = document.getElementById('shimmer-lines');
const cancelBtn = document.getElementById('cancel-btn');
const doneState = document.getElementById('done-state');
const restartBtn = document.getElementById('restart-btn');
const aiDot = document.getElementById('ai-dot');
const loaderCard = document.getElementById('loader-card');

// Realistic staged status text so the user understands *what* is happening,
// not just that "something is loading" indefinitely.
const STAGES = [
  'Analyzing request…',
  'Drafting response…',
  'Refining wording…',
  'Finalizing…',
];

let stageTimer = null;
let stageIndex = 0;
let cancelled = false;

function setStage(index) {
  stageText.classList.add('fade');
  setTimeout(() => {
    stageText.textContent = STAGES[index];
    stageText.classList.remove('fade');
  }, 200);
}

function startGeneration() {
  cancelled = false;
  stageIndex = 0;
  doneState.classList.remove('show');
  shimmerLines.style.display = 'flex';
  cancelBtn.style.display = 'block';
  loaderCard.querySelector('.loader-head').style.display = 'flex';
  setStage(0);

  // Reveal lines progressively left-to-right like streaming text.
  document.querySelectorAll('.shimmer-line').forEach((line) => {
    line.classList.remove('grow-in');
    void line.offsetWidth; // restart animation
    line.classList.add('grow-in');
  });

  stageTimer = setInterval(() => {
    stageIndex += 1;
    if (stageIndex >= STAGES.length) {
      clearInterval(stageTimer);
      finishGeneration();
      return;
    }
    setStage(stageIndex);
  }, 1100);
}

function finishGeneration() {
  if (cancelled) return;
  aiDot.style.animationPlayState = 'paused';
  loaderCard.querySelector('.loader-head').style.display = 'none';
  shimmerLines.style.display = 'none';
  cancelBtn.style.display = 'none';
  doneState.classList.add('show');
}

// Generation must always be interruptible — cancel immediately stops the
// stage cycle and any pending completion, rather than letting a long-running
// AI task run to completion against the user's wishes.
cancelBtn.addEventListener('click', () => {
  cancelled = true;
  clearInterval(stageTimer);
  loaderCard.querySelector('.loader-head').style.display = 'none';
  shimmerLines.style.display = 'none';
  cancelBtn.style.display = 'none';
  doneState.querySelector('.done-icon').textContent = '\\u2715';
  doneState.querySelector('.done-icon').style.background = '#f1f5f9';
  doneState.querySelector('.done-icon').style.color = '#64748b';
  doneState.querySelector('.done-text').textContent = 'Generation cancelled.';
  doneState.classList.add('show');
});

restartBtn.addEventListener('click', () => {
  doneState.querySelector('.done-icon').textContent = '\\u2713';
  doneState.querySelector('.done-icon').style.background = '#ecfdf5';
  doneState.querySelector('.done-icon').style.color = '#10b981';
  doneState.querySelector('.done-text').textContent = 'Response generated.';
  aiDot.style.animationPlayState = 'running';
  startGeneration();
});

startGeneration();`,

  seo: {
    title: 'AI Generating Content Loader — Free HTML CSS JS Snippet',
    description: 'A streaming text-shaped shimmer loader with cycling stage text and a cancel button for AI generation waits. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'AI Generating Content Loader — Streaming Shimmer Placeholder with Staged Status Text and Cancel Control',
      description: `A generic spinner tells a user almost nothing except "wait." For a short network request that is usually fine, but AI generation — drafting a response, writing code, producing an image — routinely takes several seconds to tens of seconds, and an indefinite spin over that duration reads as the product being stuck rather than working. This snippet builds a loading state purpose-built for AI generation moments: a shimmering placeholder shaped like the content actually being produced, a status line that cycles through real, specific stages of the work, and a cancel control, because any generation that can run for more than a couple of seconds should always be interruptible.

**Why the placeholder is shaped like text, not a generic spinner**

Instead of a circular spinner, this snippet renders four \`.shimmer-line\` bars of varying widths (\`96%\`, \`88%\`, \`92%\`, \`60%\`) styled to resemble the ragged right edge of real paragraph text. Each bar carries a moving \`linear-gradient\` background animated via \`background-position\` in the \`shimmer-sweep\` keyframe, producing the classic light-sweep shimmer effect widely recognised as "content is being prepared here." Layering a staggered \`grow-in\` animation on top — each line scaling from \`scaleX(0)\` to \`scaleX(1)\` with an increasing \`animation-delay\` per line — makes the lines appear to stream in progressively left-to-right, echoing how AI-generated text actually appears token by token in a real streaming response. The combined effect communicates "text is forming" far more specifically than a spinner ever could, setting an accurate expectation for what the user is about to receive.

**Staged status text instead of a single static label**

Beneath a small pulsing indicator dot, the \`#stage-text\` element cycles through an array of realistic phases — \`Analyzing request…\`, \`Drafting response…\`, \`Refining wording…\`, \`Finalizing…\` — advancing on a \`setInterval\` timer and cross-fading between each via a brief \`opacity\` transition rather than snapping instantly. Even though these stages are simulated here rather than tied to a real backend event stream, the underlying principle applies directly to production systems: whenever your AI pipeline actually does pass through distinguishable phases (retrieval, generation, post-processing, safety filtering), surfacing that real progress as text is far more informative than a label that never changes for the entire wait. A status line that visibly moves forward reassures the user that work is genuinely happening, not that the request has silently stalled.

**Cancellation is not optional**

The \`cancelBtn\` click handler sets a \`cancelled\` flag, clears the running \`stageTimer\` interval, and immediately swaps the card into a distinct cancelled-state view — the generation genuinely stops rather than merely hiding the loading UI while work continues invisibly in the background. Any operation whose duration is unpredictable and can run into the tens of seconds must give the user an escape hatch; forcing someone to wait out a generation they no longer want, with no way to abort it, is a common and avoidable source of frustration in AI-native products. The \`finishGeneration()\` function checks the \`cancelled\` flag before rendering the completed state precisely so a late-arriving completion cannot override a cancellation the user already issued.

**Why this matters for 2026 AI-native UX**

Communicating real progress rather than spinning indefinitely is one of the defining expectations of 2026 AI-native interface design — as generation times grow with more capable, more deliberate models, the gap between "a spinner that could mean anything" and "a status line that tells you what is actually happening" becomes the difference between a product that feels trustworthy under load and one that feels broken. Pairing an honest progress signal with an always-available cancel option treats the user's time and attention as something the AI system respects, rather than something it can indefinitely consume without recourse.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Watch the generation sequence play automatically',
          text: 'On load, startGeneration() begins immediately: the four shimmer lines grow in left-to-right with a staggered animation-delay, and the stage text below the pulsing dot cycles through "Analyzing request…", "Drafting response…", "Refining wording…", and "Finalizing…" before completing.',
        },
        {
          title: 'Let it finish to see the completed state',
          text: 'After the last stage, finishGeneration() swaps the card to a green checkmark and "Response generated." message. Click "Generate again" to replay the full sequence from the beginning via restartBtn\'s click handler.',
        },
        {
          title: 'Click "Cancel generation" mid-run to interrupt it',
          text: 'Clicking cancel at any point during generation immediately clears the running stage interval and shows a distinct grey "Generation cancelled." state — proving the work actually stops rather than just hiding the loader while a timer keeps running invisibly underneath.',
        },
        {
          title: 'Inspect the shimmer-sweep and grow-in animations',
          text: 'In the CSS panel, .shimmer-line uses a linear-gradient with animated background-position for the light-sweep, layered with a scaleX(0) to scaleX(1) grow-in keyframe with a staggered animation-delay per line to suggest progressive left-to-right streaming.',
        },
        {
          title: 'Customize the stage text for your real pipeline',
          text: 'Edit the STAGES array in the JS panel to match your actual backend phases — for example "Searching your documents…", "Generating summary…", "Checking sources…" for a RAG pipeline. If your backend emits real progress events, replace the fixed setInterval timing with updates driven by those events for genuinely accurate progress.',
        },
        {
          title: 'Export and connect to a real streaming response',
          text: 'Click HTML or JSX to export. Replace the shimmer lines with your actual rendered text as tokens stream in from a real API (for example via Server-Sent Events or a ReadableStream), keeping the same progressive reveal styling, and wire the cancel button to an AbortController tied to your fetch request so cancellation genuinely stops the network call.',
        },
      ],
    },
    features: [
      'Text-shaped shimmer placeholder: four variable-width bars mimic paragraph line lengths, not a generic spinner',
      'Animated light-sweep via linear-gradient background-position keyframe on each shimmer line',
      'Staggered grow-in animation suggests progressive left-to-right streaming as lines appear',
      'Cycling staged status text ("Analyzing…", "Drafting…", "Finalizing…") instead of one static label',
      'Cross-fade transition between stage text changes avoids an abrupt text swap',
      'Always-available Cancel control that genuinely stops the timer, not just hides the UI',
      'Distinct cancelled-state view proves the generation actually halted rather than continuing invisibly',
      'Explicit completion state with restart control closes the loop once generation finishes',
    ],
    useCases: [
      {
        icon: 'APP',
        title: 'Chat assistants and AI writing tools waiting on a response',
        desc: 'Any product where a user submits a prompt and waits for an LLM-generated reply benefits from replacing a generic spinner with this shimmer-plus-staged-text pattern, since typical response times of several seconds feel meaningfully shorter and less uncertain when the interface visibly communicates what phase of generation is underway.',
      },
      {
        icon: 'FLOW',
        title: 'AI image and media generation with longer wait times',
        desc: 'Image, video, and audio generation frequently takes tens of seconds to minutes. Swap the text-shimmer lines for a soft pulsing gradient block matching the target image\'s aspect ratio, and extend the STAGES array to reflect real pipeline phases like "Composing scene…", "Rendering details…", "Upscaling…" so the wait feels accounted for rather than opaque.',
      },
      {
        icon: 'FORM',
        title: 'RAG pipelines and multi-step agent tool calls',
        desc: 'Retrieval-augmented generation and agentic tool-calling flows genuinely do pass through distinguishable phases — searching, retrieving, synthesizing, verifying. Replace the simulated setInterval timing with real progress events from your backend so each stage-text update reflects an actual completed step rather than an estimate, giving users accurate rather than merely reassuring feedback.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems standardizing "AI is working" states across a product',
        desc: 'Products with several distinct AI features (chat, summarization, image generation, code completion) benefit from one shared loader component with a configurable shimmer shape and stage-text array, so every AI wait state in the product communicates progress consistently rather than each team building its own spinner, echoing the gated, transparent pattern taught in the [AI Agent Action Approval Card](/ui-snippets/ai-action-approval-card) for the step that typically follows generation.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching progress-communicating loading states over indefinite spinners',
        desc: 'This snippet is a compact reference for the broader principle that any operation whose duration is unpredictable and potentially long should communicate real or realistic progress rather than spin indefinitely, and should always remain interruptible — the same checklist applies to file uploads, long-running exports, and background jobs well beyond AI generation specifically.',
      },
      {
        icon: 'CODE',
        title: 'Streaming token-by-token text rendering with an honest fallback state',
        desc: 'When your backend genuinely streams tokens (via Server-Sent Events or a ReadableStream), use this shimmer state only for the brief gap before the first token arrives, then swap immediately to rendering real streaming text as it comes in — keeping the shimmer purely as an honest "nothing has arrived yet" signal rather than a decorative animation that runs alongside real content.',
      },
      { icon: 'CODE', title: 'Related: Auto-Retry Loader with Countdown and Manual Retry', desc: 'See the [Auto-Retry Loader with Countdown and Manual Retry](/ui-snippets/auto-retry-countdown-loader/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Barcode Scan Sweep Loader', desc: 'See the [Barcode Scan Sweep Loader](/ui-snippets/loader-barcode-scan-sweep/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: AI Token Flicker Typing Loader', desc: 'See the [AI Token Flicker Typing Loader](/ui-snippets/ai-token-flicker-typing-loader/) for a related loaders pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Heartbeat Pulse Monitor Loader', desc: 'See the [Heartbeat Pulse Monitor Loader](/ui-snippets/loader-heartbeat-pulse-monitor/) for a related loaders pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why use a shimmering text-shaped placeholder instead of a spinner for AI generation?',
        a: 'A spinner communicates only that something is happening, with no indication of what or how much progress has been made, which feels increasingly uncertain the longer an AI generation takes. A placeholder shaped like the actual content being produced — lines of varying width mimicking paragraph text, or a pulsing block matching an image\'s aspect ratio — sets an accurate expectation for what is about to appear and, combined with a progressive reveal animation, visually echoes how AI output genuinely streams in token by token.',
      },
      {
        q: 'Is the staged status text ("Analyzing…", "Drafting…") fake, and does that matter?',
        a: 'In this demo the stages advance on a fixed timer for illustration, but the pattern is designed to be replaced with real backend progress events in production — for example a RAG pipeline emitting an actual "retrieval complete" event before starting synthesis. Even a well-designed simulated sequence is more informative than a static label, but wiring it to genuine pipeline phases whenever your backend can expose them is strictly better and avoids ever showing a stage that does not correspond to real work.',
      },
      {
        q: 'Why must AI generation always be cancellable?',
        a: 'Generation times are inherently unpredictable and can run into the tens of seconds or longer, and a user may realize partway through that they mistyped their prompt, changed their mind, or need to leave immediately. Forcing them to wait out a generation with no way to stop it wastes their time and, for products billing by token or compute usage, needlessly consumes resources on output nobody wants — an always-visible, immediately effective cancel control avoids both problems.',
      },
      {
        q: 'How do I make cancellation actually stop the underlying AI request, not just hide the loading UI?',
        a: 'In this demo, cancelling clears the setInterval driving the stage cycle so no further UI updates occur. In a real implementation backed by a fetch() call or EventSource, pass an AbortController\'s signal into the request and call controller.abort() from the cancel handler — this actually terminates the network request and, for a properly implemented backend, stops the AI provider from continuing to generate and bill for tokens the user no longer wants.',
      },
      {
        q: 'Can this loader be adapted for image or video generation instead of text?',
        a: 'Yes — replace the .shimmer-lines text bars with a single .shimmer-block styled to the target media\'s aspect ratio (for example aspect-ratio: 1/1 for a square image), using the same linear-gradient sweep animation for the shimmer effect, or a slow pulsing opacity/scale animation to suggest an image forming. Keep the staged status text and cancel button unchanged, updating STAGES to reflect image-specific phases like "Composing scene…" or "Rendering details…".',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the shimmer-sweep gradient animation and the staggered grow-in transform combine to suggest text streaming in progressively, versus how a plain opacity pulse would read differently to a user. It's a good exercise to ask the assistant to wire the simulated STAGES array to a real EventSource or fetch stream so the status text reflects genuine backend progress instead of a fixed timer, and to connect the Cancel button to an AbortController that actually terminates the underlying network request rather than only stopping local UI updates. You could also ask it to adapt the text-line shimmer into an image-generation variant using a single pulsing gradient block sized to a target aspect ratio, while keeping the same staged-text-plus-cancel structure intact.`,
      prompt: `Build a loading state specifically for "AI is generating content" moments in plain HTML, CSS, and JavaScript — not a generic spinner.

Requirements:
- Render a shimmering placeholder shaped like the content being generated: several bars of varying width that resemble lines of paragraph text (for a text-generation use case), using an animated gradient sweep so it reads as active work in progress rather than a static gray block.
- Make the placeholder lines appear to reveal progressively, left to right or top to bottom, with a staggered animation delay per line, to suggest content streaming in rather than all appearing simultaneously.
- Show a small status line below or near the placeholder that cycles through at least three realistic, specific phase labels (for example "Analyzing request…", "Drafting response…", "Finalizing…") on a timer, cross-fading between each change rather than swapping text instantly.
- Include a persistently visible Cancel control that, when clicked, immediately stops the stage-cycling timer and any pending completion, and shows a clearly distinct "cancelled" state so the user can visually confirm the generation actually stopped rather than continuing invisibly in the background.
- When the full stage sequence completes without cancellation, transition to an explicit completed state (for example a checkmark and confirmation text) and offer a way to restart the generation sequence for demo purposes.
- Ensure the cancelled state and the completed state are visually distinct from each other and from the in-progress state, so at a glance the user always knows which of the three states they are looking at.`,
    },
  },
};

export default aiGeneratingLoader;
