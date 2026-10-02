const aiVoiceInputButton = {
  id: 'ai-voice-input-button',
  title: 'AI Voice Input Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  html: `<div class="vib-wrap">
  <div class="vib-transcript" id="vibTranscript">
    <span class="vib-placeholder" id="vibPlaceholder">Tap the mic and start speaking…</span>
  </div>

  <button type="button" class="vib-mic" id="vibMic" aria-label="Start voice input">
    <span class="vib-ring" id="vibRing1"></span>
    <span class="vib-ring" id="vibRing2"></span>
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="vib-icon">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"/>
      <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
      <line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23"/>
    </svg>
  </button>

  <div class="vib-status" id="vibStatus">Tap to speak</div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0b0e17;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.vib-wrap{display:flex;flex-direction:column;align-items:center;gap:22px;width:100%;max-width:380px}
.vib-transcript{width:100%;min-height:88px;background:#111827;border:1px solid #1f2937;border-radius:14px;padding:16px;font-size:14.5px;line-height:1.6;color:#e5e7eb;display:flex;align-items:center}
.vib-placeholder{color:#5b6478}
.vib-transcript.filled{align-items:flex-start}

.vib-mic{position:relative;width:76px;height:76px;border-radius:50%;border:none;cursor:pointer;background:linear-gradient(160deg,#6366f1,#4338ca);display:flex;align-items:center;justify-content:center;box-shadow:0 10px 30px rgba(99,102,241,.4);transition:transform .15s,box-shadow .3s}
.vib-mic:hover{transform:scale(1.04)}
.vib-mic:active{transform:scale(.97)}
.vib-mic.listening{background:linear-gradient(160deg,#f87171,#dc2626);box-shadow:0 10px 30px rgba(248,113,113,.45)}
.vib-icon{width:28px;height:28px;color:#fff;position:relative;z-index:2}

.vib-ring{position:absolute;inset:0;border-radius:50%;border:2px solid rgba(99,102,241,.5);opacity:0;pointer-events:none}
.vib-mic.listening .vib-ring{animation:vibPulse 1.6s ease-out infinite;border-color:rgba(248,113,113,.55)}
.vib-mic.listening #vibRing2{animation-delay:.5s}
@keyframes vibPulse{0%{transform:scale(1);opacity:.7}100%{transform:scale(1.7);opacity:0}}

.vib-status{font-size:12.5px;color:#7c8aa5;min-height:16px}
.vib-status.listening{color:#f87171;font-weight:700}

.vib-bars{display:inline-flex;align-items:center;gap:2px;height:16px;vertical-align:middle;margin-right:2px}
.vib-bar{width:3px;background:#818cf8;border-radius:2px;animation:vibBar 1s ease-in-out infinite}
@keyframes vibBar{0%,100%{height:4px}50%{height:16px}}`,

  js: `var micBtn = document.getElementById('vibMic');
var transcriptEl = document.getElementById('vibTranscript');
var placeholderEl = document.getElementById('vibPlaceholder');
var statusEl = document.getElementById('vibStatus');

var listening = false;
var recognition = null;
var SpeechRecognitionCtor = window.SpeechRecognition || window.webkitSpeechRecognition;

var SIM_TRANSCRIPT = "Show me the top three AI models by cost, and explain the difference between the balanced and advanced tiers.";

function setListening(on) {
  listening = on;
  micBtn.classList.toggle('listening', on);
  statusEl.textContent = on ? 'Listening…' : 'Tap to speak';
  statusEl.classList.toggle('listening', on);
  micBtn.setAttribute('aria-label', on ? 'Stop voice input' : 'Start voice input');
}

function setTranscript(text) {
  if (!text) {
    transcriptEl.innerHTML = '';
    transcriptEl.appendChild(placeholderEl);
    transcriptEl.classList.remove('filled');
    return;
  }
  transcriptEl.classList.add('filled');
  transcriptEl.textContent = text;
}

// --- Simulated fallback: used when SpeechRecognition is unavailable or access is denied
// (very common inside sandboxed iframes), so the demo always looks alive.
var simTimer = null;
function runSimulation() {
  setListening(true);
  setTranscript('');
  var i = 0;
  clearInterval(simTimer);
  simTimer = setInterval(function () {
    i += Math.max(1, Math.floor(Math.random() * 3));
    setTranscript(SIM_TRANSCRIPT.slice(0, i));
    if (i >= SIM_TRANSCRIPT.length) {
      clearInterval(simTimer);
      setListening(false);
      statusEl.textContent = 'Heard you — simulated demo (mic unavailable in this sandbox)';
    }
  }, 45);
}

function stopSimulation() {
  clearInterval(simTimer);
  setListening(false);
}

// --- Real SpeechRecognition path
function startRealRecognition() {
  recognition = new SpeechRecognitionCtor();
  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  recognition.onstart = function () { setListening(true); setTranscript(''); };
  recognition.onresult = function (e) {
    var text = '';
    for (var i = 0; i < e.results.length; i++) text += e.results[i][0].transcript;
    setTranscript(text);
  };
  recognition.onerror = function () {
    // Permission denied or blocked (typical in a sandboxed iframe) — fall back gracefully.
    setListening(false);
    runSimulation();
  };
  recognition.onend = function () { setListening(false); };

  try {
    recognition.start();
  } catch (err) {
    runSimulation();
  }
}

micBtn.addEventListener('click', function () {
  if (listening) {
    if (recognition) recognition.stop();
    stopSimulation();
    return;
  }
  if (SpeechRecognitionCtor) {
    startRealRecognition();
  } else {
    runSimulation();
  }
});`,

  seo: {
    title: 'AI Voice Input Button — Free Mic Button with Live Transcript Snippet',
    description: `A pulsing round mic button that captures speech with the browser SpeechRecognition API and shows a live transcript, with a graceful simulated fallback when the mic is unavailable. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'AI Voice Input Button — Real Speech Recognition with a Simulated Fallback',
      description: `Voice input is now a standard entry point into AI chat products — a round mic button that pulses while listening and streams a live transcript underneath. This snippet builds that button using the browser's native \`SpeechRecognition\` API where it's available, and falls back to a simulated typing effect everywhere else, so the demo always looks alive even inside a sandboxed preview iframe where microphone permission is typically blocked.

**Real recognition first**

When \`window.SpeechRecognition\` or \`window.webkitSpeechRecognition\` exists, clicking the mic starts a real recognition session with \`interimResults: true\`, streaming partial transcripts into the transcript panel as the browser recognizes speech, word by word, exactly like the voice input in a production AI chat product.

**A fallback that never looks broken**

Microphone access is one of the most commonly blocked permissions in embedded and sandboxed contexts. Rather than showing a dead button or a permission error, this snippet catches both the "API doesn't exist" case and the \`onerror\` case (permission denied, no device, blocked context) and drops into a simulated mode: the mic pulses exactly as it would while listening, and a realistic sentence types itself into the transcript panel character by character. A viewer previewing the sandbox sees a fully working interaction either way — the same fail-into-simulation pattern used elsewhere in this library for browser-permission-gated demos.

**Pulsing rings, not just a color change**

While listening, two \`.vib-ring\` elements animate outward from the button with a staggered delay, producing a sonar-like pulse that reads as "actively capturing audio" at a glance — far more legible than a static color swap, especially from across a UI where the button is small.

**Where this fits in an AI product**

Drop it beside an [AI chat interface](/ui-snippets/ai-chat-interface/) input as an alternate entry method, or pair it with an [AI persona selector](/ui-snippets/ai-persona-selector/) so voice queries route to the chosen assistant style. The transcript panel's structure also works well next to an [AI streaming response](/ui-snippets/ai-streaming-response/) to show the full round trip from spoken question to generated answer.

**Customizing it**

Swap \`SIM_TRANSCRIPT\` for a set of rotating example phrases, wire the final transcript to your chat input's submit handler, or add a confidence score readout using the \`results[i][0].confidence\` value the real API already provides.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A round mic button renders with an empty transcript panel above it.` },
      { title: 'Click the mic button', text: `If your browser supports SpeechRecognition and grants permission, it listens for real speech.` },
      { title: 'Speak or wait', text: `In a sandboxed preview, permission is usually blocked — the button automatically falls back to a simulated transcript typing itself out.` },
      { title: 'Watch the pulsing rings', text: `Two staggered rings animate outward while listening, real or simulated.` },
      { title: 'Click again to stop', text: `Stops real recognition or cancels the simulation early.` },
      { title: 'Wire up the transcript', text: `Read the final text from the transcript panel and submit it to your chat handler.` },
    ] },
    features: [
      { title: 'Real SpeechRecognition support', text: `Uses the native browser API with interim results for live word-by-word transcription.` },
      { title: 'Graceful simulated fallback', text: `Falls back automatically when the API is missing or permission is denied.` },
      { title: 'Sandbox-safe by design', text: `Never shows a broken or dead state, even where mic access is blocked.` },
      { title: 'Pulsing listening animation', text: `Staggered expanding rings signal active capture at a glance.` },
      { title: 'Live transcript panel', text: `Text streams in as it's recognized, real or simulated.` },
      { title: 'Toggle start/stop', text: `One button both starts and stops listening.` },
      { title: 'Accessible labeling', text: `aria-label updates between "Start" and "Stop voice input".` },
      { title: 'No dependencies', text: `Pure HTML, CSS, and vanilla JavaScript using only native browser APIs.` },
    ],
    useCases: [
      { title: 'AI chat input bars', text: 'Add voice entry next to an [AI chat interface](/ui-snippets/ai-chat-interface/) composer, with a live transcript streaming beneath a pulsing round mic.' },
      { title: 'Voice-first assistants', text: 'Pair with an [AI persona selector](/ui-snippets/ai-persona-selector/) so users can choose how the assistant responds to what they say.' },
      { title: 'Accessibility-focused products', text: 'Offer voice as an alternative to typing, using interim results from the browser\'s `SpeechRecognition` so text appears as people speak.' },
      { title: 'Search interfaces', text: 'Let users speak a search query, with a simulated fallback that keeps the button working when microphone access is unavailable.' },
      { title: 'Notes and sandbox demos', text: 'Capture short voice memos in meeting tools, or show a working voice interaction in a sandbox where permission is denied.' },
      { icon: 'CODE', title: 'Related: Async Button with Real Progress Fill (Not a Fake Spinner)', desc: 'See the [Async Button with Real Progress Fill (Not a Fake Spinner)](/ui-snippets/async-progress-fill-button/) for a related buttons pattern worth pairing with this one.' },
      { icon: 'CODE', title: 'Related: Dual-Hold Safety Button', desc: 'See the [Dual-Hold Safety Button](/ui-snippets/dual-hold-safety-button/) for a related buttons pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'What happens if the browser blocks microphone access, like in a sandboxed iframe?', a: `The button catches both the missing-API case and the SpeechRecognition onerror event (which fires on permission denial) and automatically switches to a simulated mode: the same pulsing animation plays and a realistic transcript types itself out character by character, so the demo never looks broken.` },
      { q: 'Which browsers support the real SpeechRecognition API?', a: `Chrome, Edge, and Safari support it via the vendor-prefixed webkitSpeechRecognition (or the unprefixed SpeechRecognition in newer Chromium versions). Firefox does not support it as of this writing, so those visitors automatically see the simulated fallback.` },
      { q: 'How do I get the final transcript to submit to my chat handler?', a: `In the real recognition path, the onresult handler concatenates every result's transcript into one string on each event — read that same value (or track it in a variable) when recognition.onend fires, and pass it to your submit function. In the simulated path, use the fully typed SIM_TRANSCRIPT string once the interval completes.` },
      { q: 'Can I customize what the simulated transcript says?', a: `Yes — SIM_TRANSCRIPT is a single string. Replace it with any example query relevant to your product, or randomly pick from an array of a few example phrases each time the simulation runs so repeat demos vary.` },
      { q: 'How do I use this voice input button in React, Vue, or Angular?', a: `Wrap the SpeechRecognition setup and the simulated fallback in a mount effect (or a composable/service in Vue/Angular), store the transcript and listening state as component state, and bind the mic button's click handler to your start/stop function. Clean up by stopping recognition and clearing the interval on unmount.` },
    ],
    aiPrompt: {
      paragraph: `You don't have to work out the browser-permission fallback logic yourself. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the code detects that SpeechRecognition is unavailable versus permission being denied at runtime, and why both cases route to the same simulated fallback rather than showing an error. The same assistant can help optimize it — ask whether the simulated typing speed should vary randomly to feel more natural, or whether the real recognition path should restart automatically after a brief silence instead of ending the session. It's also useful for extending the button: ask it to add a waveform visualizer driven by the Web Audio API when real audio access is available, support multiple languages via the recognition.lang property, or debounce rapid start/stop clicks. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an "AI voice input button" in plain HTML, CSS, and JavaScript with no framework or library, using only native browser APIs.

Requirements:
- A round mic button that toggles between an idle state and a "listening" state on click, with two staggered pulsing ring animations that expand outward from the button only while listening.
- A transcript panel above the button that shows a placeholder when empty and streams in recognized text as it becomes available.
- Use the browser's native SpeechRecognition API (checking for both window.SpeechRecognition and window.webkitSpeechRecognition) with interimResults enabled, so partial transcripts stream into the panel as speech is recognized, when the API is available and microphone permission is granted.
- Critically: implement a graceful simulated fallback that activates automatically in two cases — when neither SpeechRecognition constructor exists on window, and when the real API's onerror event fires (which covers permission denial, no available microphone, or being blocked in a restricted/sandboxed context). The fallback must play the exact same listening animation and type out a realistic example sentence into the transcript panel character by character at a natural pace, then return to the idle state — so the component never looks broken or dead, only in a real browser and in a sandboxed iframe preview alike.
- Clicking the button again while listening (real or simulated) must stop it cleanly and return to the idle state.
- Use a dark theme with a violet/indigo mic button that shifts to a red gradient while listening, system-ui font, and accessible aria-label text that updates between "Start voice input" and "Stop voice input".`,
    },
  },
};

export default aiVoiceInputButton;
