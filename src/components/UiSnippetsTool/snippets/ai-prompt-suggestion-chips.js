const aiPromptSuggestionChips = {
  id: 'ai-prompt-suggestion-chips',
  title: 'AI Prompt Suggestion Chips',
  lastmod: '2026-08-08',
  category: 'forms',
  html: `<div class="demo-wrap">
  <div class="chat-mock">
    <div class="chip-header">
      <span class="chip-label">Try asking</span>
      <button class="regen-btn" id="regen-btn" title="Regenerate suggestions" aria-label="Regenerate suggestions">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M21 2v6h-6"/><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M3 22v-6h6"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/></svg>
      </button>
    </div>

    <div class="chip-row" id="chip-row"></div>

    <div class="input-row">
      <textarea class="prompt-input" id="prompt-input" placeholder="Ask anything..." rows="1"></textarea>
      <button class="send-btn" id="send-btn" aria-label="Send">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>
      </button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; }

.demo-wrap { display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 32px 16px; }

.chat-mock {
  width: 100%; max-width: 460px;
  background: #fff; border: 1px solid #e2e8f0; border-radius: 18px;
  padding: 18px; box-shadow: 0 8px 28px rgba(15,23,42,0.07);
}

.chip-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
.chip-label { font-size: 11.5px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.04em; }

.regen-btn {
  display: flex; align-items: center; justify-content: center;
  width: 26px; height: 26px; background: #f1f5f9; border: none; border-radius: 8px;
  color: #64748b; cursor: pointer; transition: background 0.15s, color 0.15s, transform 0.35s ease;
}
.regen-btn:hover { background: #e2e8f0; color: #1e293b; }
.regen-btn.spinning svg { animation: spin 0.5s ease; }
@keyframes spin { to { transform: rotate(180deg); } }

.chip-row {
  display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 14px;
  min-height: 30px;
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.chip-row.swapping { opacity: 0; transform: translateY(4px); }

.sugg-chip {
  background: #eef2ff; color: #4338ca; border: 1px solid #e0e7ff;
  border-radius: 20px; padding: 6px 13px; font-size: 12.5px; font-weight: 600;
  font-family: inherit; cursor: pointer; white-space: nowrap;
  transition: background 0.15s, border-color 0.15s, transform 0.1s;
}
.sugg-chip:hover { background: #e0e7ff; border-color: #c7d2fe; }
.sugg-chip:active { transform: scale(0.96); }

.input-row {
  display: flex; align-items: flex-end; gap: 8px;
  background: #f8fafc; border: 1.5px solid #e2e8f0; border-radius: 14px;
  padding: 8px 8px 8px 14px; transition: border-color 0.15s;
}
.input-row:focus-within { border-color: #a5b4fc; }

.prompt-input {
  flex: 1; border: none; background: transparent; resize: none;
  font-family: inherit; font-size: 13.5px; color: #1e293b; line-height: 1.5;
  max-height: 120px; padding: 4px 0;
}
.prompt-input:focus { outline: none; }
.prompt-input::placeholder { color: #94a3b8; }

.send-btn {
  display: flex; align-items: center; justify-content: center;
  width: 32px; height: 32px; flex-shrink: 0;
  background: #6366f1; color: #fff; border: none; border-radius: 10px;
  cursor: pointer; transition: background 0.15s;
}
.send-btn:hover { background: #4f46e5; }`,
  js: `const pools = [
  [
    { label: 'Summarize this', text: 'Summarize the key points of this in a short bulleted list.' },
    { label: "Explain like I'm five", text: 'Explain this to me like I\\'m five years old, using a simple analogy.' },
    { label: 'Find counterarguments', text: 'What are the strongest counterarguments against this?' },
  ],
  [
    { label: 'Make it shorter', text: 'Rewrite this to be about half the length, keeping the key meaning intact.' },
    { label: 'List pros and cons', text: 'List the pros and cons of this as two clearly separated bullet lists.' },
    { label: 'Give a real example', text: 'Give me one concrete, real-world example that illustrates this.' },
  ],
  [
    { label: 'Check for mistakes', text: 'Check this for factual mistakes or logical inconsistencies and point them out.' },
    { label: 'Compare alternatives', text: 'Compare this against two common alternatives and explain the tradeoffs.' },
    { label: 'Turn into steps', text: 'Turn this into a clear, numbered step-by-step guide.' },
  ],
];

let poolIndex = 0;
const chipRow = document.getElementById('chip-row');
const regenBtn = document.getElementById('regen-btn');
const input = document.getElementById('prompt-input');

function renderChips(pool) {
  chipRow.innerHTML = '';
  pool.forEach(item => {
    const btn = document.createElement('button');
    btn.className = 'sugg-chip';
    btn.type = 'button';
    btn.textContent = item.label;
    btn.addEventListener('click', () => fillPrompt(item.text));
    chipRow.appendChild(btn);
  });
}

function fillPrompt(text) {
  // Typewriter-style fill instead of an instant jump, so the chip's
  // text feels like it's being composed into the input rather than
  // just dumped in.
  input.value = '';
  input.focus();
  let i = 0;
  const interval = setInterval(() => {
    input.value += text[i];
    i += 1;
    if (i >= text.length) {
      clearInterval(interval);
      // Place cursor at the end after the fill completes
      input.setSelectionRange(input.value.length, input.value.length);
    }
  }, 14);
}

function regenerate() {
  poolIndex = (poolIndex + 1) % pools.length;
  regenBtn.classList.add('spinning');
  chipRow.classList.add('swapping');
  setTimeout(() => {
    renderChips(pools[poolIndex]);
    chipRow.classList.remove('swapping');
  }, 180);
  setTimeout(() => regenBtn.classList.remove('spinning'), 500);
}

regenBtn.addEventListener('click', regenerate);

// Auto-grow the textarea as the user (or the typewriter fill) adds lines
input.addEventListener('input', () => {
  input.style.height = 'auto';
  input.style.height = Math.min(input.scrollHeight, 120) + 'px';
});

renderChips(pools[0]);`,
  seo: {
    title: 'AI Prompt Suggestion Chips — Free HTML CSS JS Snippet',
    description: 'Clickable starter-prompt chips that type their text into the input, with a rotating regenerate control. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'AI Prompt Suggestion Chips — Starter Prompt Row, Typewriter Fill & Rotating Suggestion Pool',
      description: `A blank text input is the single biggest source of hesitation in any AI chat interface. Users staring at an empty prompt box with a blinking cursor often don't know what the tool is actually good for, or how to phrase a request that will get a useful answer, and that hesitation is a meaningful drop-off point before a user ever experiences the product's value. Prompt suggestion chips solve this directly: a row of pre-written starter prompts sitting above or below the input gives the user a concrete, one-click way to see the product in action, learn the kind of phrasing that works well, and get moving immediately instead of facing an intimidating blank field.

**Why this pattern matters for AI-native products in 2026**

As AI chat interfaces become the default entry point for an increasing range of products &mdash; not just chatbots, but AI-assisted search, document tools, and analytics dashboards &mdash; the products that convert casual visitors into active users are the ones that make the *first* interaction trivially easy. Suggestion chips are a low-cost, high-leverage onboarding technique: they double as implicit documentation (showing users what kinds of requests are supported) while removing the cold-start problem entirely. Crucially, the user stays fully in control &mdash; clicking a chip fills the input with editable text rather than silently sending a request on the user's behalf, keeping the interaction transparent and undoable, which matters more as AI-native interfaces increasingly need to demonstrate that the user, not the system, initiates every consequential action.

**The typewriter fill-in, not an instant jump**

The core interaction detail in this snippet is *how* a chip's text lands in the input. Rather than setting \`input.value = text\` instantly, \`fillPrompt()\` clears the input, focuses it, and then appends one character at a time via \`setInterval\` at a 14ms interval, visually composing the prompt into the field the way a person typing quickly would. This small detail matters more than it might seem: an instant value jump can feel like the interface did something *to* the input behind the user's back, while a visible fill-in reads as the interface *drafting a suggestion for you to review and edit*, reinforcing that the text is a starting point, not a locked-in command. After the fill completes, the cursor is explicitly placed at the end of the text via \`setSelectionRange\`, so the user can immediately continue typing or editing without having to click back into the field.

**Rotating the suggestion pool without disorienting the user**

A single static row of three prompts gets stale fast, so this snippet ships three pools of three suggestions each, cycled by a "regenerate suggestions" icon button. Clicking it does two things simultaneously: it spins the refresh icon 180 degrees via a CSS \`@keyframes\` animation for immediate feedback that the click registered, and it fades the chip row out and back in (\`.swapping\` toggles \`opacity: 0\` and a small \`translateY\`) around the moment the new pool's chips are actually swapped into the DOM, so the transition never shows a jarring instant content swap. The 180ms delay between fading out and rendering the next pool is tuned to be long enough to register as a deliberate transition but short enough that the control still feels responsive rather than sluggish.

**Auto-growing input and accessibility**

The \`<textarea>\` auto-grows as content is typed or filled in, using the standard \`height: auto\` then \`scrollHeight\` measurement technique capped at \`120px\`, so a longer starter prompt does not get clipped or force a scrollbar inside a single-line-looking field. Each chip is a real \`<button>\` element, keyboard-focusable and operable, and the regenerate control has an explicit \`aria-label\` since it communicates only through an icon. This pattern generalizes well beyond chat: any freeform input paired with a small set of common, well-phrased starting points benefits from the same low-friction, editable-suggestion approach.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Click a suggestion chip',
          text: 'Click any chip in the row (e.g. "Summarize this"). The textarea below clears, gains focus, and the chip\'s full prompt text types itself in character by character via fillPrompt(), landing with the cursor placed at the end so you can keep typing immediately.',
        },
        {
          title: 'Click the regenerate icon for a new set',
          text: 'Click the circular arrow button beside "Try asking". The icon spins, the chip row fades out and back in, and a different pool of three prompts from the pools array replaces the current set — cycling through pools[0], pools[1], pools[2] in order.',
        },
        {
          title: 'Add or edit prompt pools',
          text: 'Each pool is an array of { label, text } objects in the pools array — label is the short chip text shown to the user, text is the full prompt that gets typed into the input. Add a new array to pools to extend the rotation, or edit the existing labels/text to match your product\'s actual use cases.',
        },
        {
          title: 'Tune the typewriter fill speed',
          text: 'The fillPrompt() function types one character every 14ms via setInterval. Lower this value for a faster fill on longer prompts, or raise it slightly for shorter ones — the goal is a fill that reads as deliberate and quick, not slow enough to feel like a delay.',
        },
        {
          title: 'Wire the send button to your actual chat logic',
          text: 'The send-btn in this demo has no attached handler by default. Add a click listener that reads input.value and sends it to your chat API or handler, then clear the textarea and reset its height afterward.',
        },
        {
          title: 'Export and integrate into your input UI',
          text: 'Click HTML to download a standalone file, or JSX for a React component. Store the pools array as configuration so product or content teams can update starter prompts without a code change, and consider randomizing pool order per session for variety.',
        },
      ],
    },
    features: [
      'Typewriter-style fill-in: fillPrompt() types the chip\'s prompt into the input via setInterval instead of an instant value jump',
      'Cursor auto-placed at the end of the filled text via setSelectionRange so users can continue typing immediately',
      'Regenerate control cycles through a pools array with a spin icon animation and a fade/slide chip-row transition',
      'Auto-growing textarea using height:auto + scrollHeight measurement, capped at 120px max height',
      'Each chip is a real, keyboard-focusable button element built dynamically from a simple {label, text} data structure',
      'Regenerate button carries an explicit aria-label since its meaning is communicated only through an icon',
      '180ms coordinated fade-out/render-in timing keeps the pool swap feeling deliberate, not jarring or instant',
      'Focus-visible ring styling on the input container (focus-within) for clear keyboard interaction feedback',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'AI chat product onboarding and empty-state guidance',
        desc: 'Any AI chat interface benefits from showing new users a handful of concrete example prompts the moment they land on an empty conversation, rather than a blank input and blinking cursor. This removes the cold-start hesitation and doubles as lightweight, always-visible documentation of what the assistant is actually good for.',
      },
      {
        icon: 'APP',
        title: 'AI-assisted search and document Q&A tools',
        desc: 'Tools that let users ask questions of a document, dataset, or knowledge base can use starter chips tailored to the specific content loaded (e.g. "Summarize this document", "What are the key risks mentioned?") to demonstrate the range of questions the tool can actually answer for that specific context.',
      },
      {
        icon: 'FLOW',
        title: 'Customer support and helpdesk AI assistants',
        desc: 'Support widgets that route to an AI assistant can surface common starter requests ("Track my order", "Start a return", "Talk to a human") as chips above the input, reducing the number of users who type a vague first message that the assistant then has to clarify before it can help.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems standardizing the chip-plus-input onboarding pattern',
        desc: 'Products shipping multiple AI-powered entry points (a main assistant, a document tool, an analytics copilot) benefit from a single reusable chip component with a swappable pools configuration, so every surface gets the same polished typewriter-fill interaction without reimplementing it each time — a useful companion to input-adjacent components like the [AI Confidence Score Badge](/ui-snippets/ai-confidence-badge) used elsewhere in an AI-native interface.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching the typewriter-fill and content-rotation interaction patterns',
        desc: 'This snippet is a compact reference for two techniques that show up across many UI contexts: filling a field with generated or suggested text in a way that feels transparent rather than intrusive, and cycling a small set of content options with a coordinated icon-spin and fade transition rather than an abrupt swap.',
      },
      {
        icon: 'CODE',
        title: 'Personalizing suggested prompts based on user context or history',
        desc: 'Beyond the static rotating pools in this demo, the same chip-row structure can be driven by dynamic data — recently asked questions, popular prompts among similar users, or prompts tailored to the current page or document — by generating the pools array from an API response instead of a hard-coded array.',
      },
      { icon: 'CODE', title: 'Related: Animated Toggle Group', desc: 'See the [Animated Toggle Group](/ui-snippets/animated-toggle-group/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why type the prompt into the input character by character instead of setting the value instantly?',
        a: 'An instant value change can feel like the interface silently altered the input without the user\'s involvement, especially if the user had already started typing something else. A visible, quick typewriter fill reads as the interface actively drafting a suggestion into the field for the user to review, edit, or send as-is — it keeps the interaction feeling collaborative and reversible rather than automatic, which matters for maintaining a sense of user control over what gets submitted.',
      },
      {
        q: 'What happens if the user clicks a chip while a previous fill-in is still animating?',
        a: 'In this snippet, fillPrompt() clears the input at the start of every call, so clicking a second chip mid-animation restarts the fill with the new text from scratch rather than mixing the two. If you want to guard against rapid double-clicks more explicitly, track the active interval ID in a variable and call clearInterval on it at the start of fillPrompt() before starting a new one.',
      },
      {
        q: 'How many starter prompts should be shown at once?',
        a: 'Three is a practical default — enough to demonstrate range without overwhelming the input area or pushing it visually off balance. If your product supports many distinct use cases, use the regenerate control (as in this snippet) to let users cycle through additional pools rather than showing five or more chips at once, which tends to clutter the input area and dilute the ease of the pattern.',
      },
      {
        q: 'Should suggestion chips be personalized per user, or is a static set fine?',
        a: 'A static, well-chosen set works fine for new users and general onboarding. For returning or high-usage users, personalizing chips based on recent activity, frequently used prompt types, or the current page/document context (e.g. showing "Summarize this contract" only inside a contract viewer) meaningfully increases relevance and click-through, and is a natural next step once the static pattern is in place.',
      },
      {
        q: 'Does the regenerate button send a new request to an AI model, or just swap the local suggestions?',
        a: 'In this snippet it only swaps between three small, locally-defined pools with no network request — it is meant to feel instant. If you want genuinely AI-generated, context-aware suggestions instead of a fixed rotation, you can replace the pools array with an async fetch to your backend, but keep the same spin/fade transition timing so a network-backed regenerate still feels responsive, and consider a loading state on the icon if the request takes more than a couple hundred milliseconds.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the character-by-character fillPrompt() function differs from simply setting input.value directly, and why that distinction matters for how "in control" the interaction feels to the user — that's the detail worth understanding before you adapt it. You could also ask the assistant to help you replace the static pools array with suggestions generated dynamically from an API (for example, prompts tailored to whatever document or page the user is currently viewing), while preserving the same spin-and-fade regenerate transition so the swap still feels smooth even with network latency involved. It's also a good candidate for asking the assistant to add a guard against double-clicking a chip mid-animation, or to add a subtle sound-free "typing cursor" caret effect during the fill for extra polish.`,
      prompt: `Build an AI prompt suggestion chip row above a chat-style textarea input, in plain HTML, CSS, and JavaScript.

Requirements:
- Render a row of 3 clickable "starter prompt" chips below or above a textarea input, each built from a simple {label, fullText} data structure so they're easy to reconfigure.
- Clicking a chip must clear the input, focus it, and then fill in the chip's full prompt text with a visible character-by-character typewriter effect (not an instant value assignment), placing the cursor at the end once the fill completes so the user can keep typing immediately.
- Include a "regenerate suggestions" icon button that swaps the current set of 3 chips for a different set from a small rotating pool of prompt sets, with a coordinated icon-spin animation and a fade/slide transition on the chip row so the swap does not feel abrupt.
- The textarea must auto-grow in height as its content grows (from either typing or the typewriter fill), up to a reasonable maximum height, after which it should scroll internally.
- All interactive elements (chips, regenerate button, send button) must be real, keyboard-accessible button elements, and the icon-only regenerate button needs an appropriate aria-label since it has no visible text.
- Keep the component self-contained and framework-free, structured so the prompt pools and the send-button handler can be swapped for real product logic without restructuring the markup.`,
    },
  },
};
export default aiPromptSuggestionChips;
