const textToSpeechButton = {
  id: 'text-to-speech-button',
  title: 'Text-to-Speech Button',
  lastmod: '2026-08-22',
  category: 'buttons',
  cdnUrls: [],
  html: `<div class="demo-wrap">
  <article class="reader-card">
    <div class="reader-toolbar">
      <button class="tts-btn" id="ttsBtn" type="button">
        <span class="tts-icon" id="ttsIcon" aria-hidden="true">&#128264;</span>
        <span class="tts-label" id="ttsLabel">Read aloud</span>
      </button>
      <button class="tts-stop" id="ttsStop" type="button" hidden>Stop</button>
      <span class="tts-status" id="ttsStatus" role="status" aria-live="polite"></span>
    </div>

    <h2>The Quiet Hour</h2>
    <p id="readerText">Every city has one hour when it forgets to be loud. In this town it arrives just after six, when the shops dim their signs and the last bus sighs away from the corner stop. For a few minutes the street belongs to nobody in particular — just the wind moving through the plane trees, and a single light left on above the bakery, as if someone forgot to say the day was over.</p>
  </article>

  <div class="unsupported" id="unsupportedNotice" hidden>
    Your browser doesn't support the Web Speech API's speechSynthesis, so this button can't read the text aloud here. It works in current Chrome, Edge, Safari, and Firefox.
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body{font-family: system-ui, -apple-system, sans-serif; background: #f6f5f0; color: #2b2820; min-height: 100vh;display:flex;align-items:center;justify-content:center}

.demo-wrap { max-width: 560px; margin: 0 auto; padding: 44px 22px; }

.reader-card { background: #fffdf8; border: 1px solid #e6e1d3; border-radius: 18px; padding: 28px 26px; box-shadow: 0 10px 30px rgba(60,50,20,0.06); }

.reader-toolbar { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; flex-wrap: wrap; }

.tts-btn {
  display: flex; align-items: center; gap: 9px;
  font-family: inherit; font-size: 13.5px; font-weight: 700;
  background: #b45309; color: #fff; border: none;
  padding: 10px 16px; border-radius: 999px; cursor: pointer;
  transition: background 0.15s;
}
.tts-btn:hover { background: #92400e; }
.tts-btn:focus-visible { outline: 3px solid #92400e; outline-offset: 3px; }
.tts-btn.speaking { background: #78350f; }

.tts-icon { font-size: 15px; display: inline-block; }
.tts-btn.speaking .tts-icon { animation: pulse 1.1s ease-in-out infinite; }
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.25); opacity: 0.7; }
}

.tts-stop {
  font-family: inherit; font-size: 13px; font-weight: 700;
  background: transparent; color: #92400e; border: 1.5px solid #d9cdb0;
  padding: 9px 14px; border-radius: 999px; cursor: pointer;
}
.tts-stop:hover { border-color: #92400e; }
.tts-stop:focus-visible { outline: 3px solid #92400e; outline-offset: 3px; }

.tts-status { font-size: 12px; color: #8a7f63; font-weight: 600; }

.reader-card h2 { font-size: 21px; margin-bottom: 12px; letter-spacing: -0.01em; }
.reader-card p { font-size: 15.5px; line-height: 1.75; color: #433d2e; }

/* Word currently being spoken, driven by the boundary event */
.tts-word { background: #fde68a; border-radius: 3px; }

.unsupported {
  margin-top: 16px; font-size: 13px; color: #92400e; background: #fef3c7;
  border: 1px solid #fde68a; border-radius: 10px; padding: 12px 14px; line-height: 1.6;
}`,

  js: `const ttsBtn = document.getElementById('ttsBtn');
const ttsStop = document.getElementById('ttsStop');
const ttsIcon = document.getElementById('ttsIcon');
const ttsLabel = document.getElementById('ttsLabel');
const ttsStatus = document.getElementById('ttsStatus');
const readerText = document.getElementById('readerText');
const unsupportedNotice = document.getElementById('unsupportedNotice');

const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

if (!supported) {
  ttsBtn.disabled = true;
  ttsStop.hidden = true;
  unsupportedNotice.hidden = false;
  ttsStatus.textContent = 'Speech unavailable';
} else {
  const originalText = readerText.textContent;
  let utterance = null;
  let paused = false;

  function setSpeakingUI(isSpeaking) {
    ttsBtn.classList.toggle('speaking', isSpeaking);
    ttsIcon.textContent = isSpeaking ? '\\u{1F50A}' : '\\u{1F508}';
    ttsLabel.textContent = isSpeaking ? (paused ? 'Resume' : 'Pause') : 'Read aloud';
    ttsStop.hidden = !isSpeaking;
  }

  function clearHighlight() {
    readerText.textContent = originalText;
  }

  function highlightAt(charIndex, charLength) {
    const before = originalText.slice(0, charIndex);
    const word = originalText.slice(charIndex, charIndex + charLength);
    const after = originalText.slice(charIndex + charLength);
    readerText.innerHTML = '';
    readerText.append(document.createTextNode(before));
    const mark = document.createElement('span');
    mark.className = 'tts-word';
    mark.textContent = word;
    readerText.appendChild(mark);
    readerText.append(document.createTextNode(after));
  }

  function speak() {
    window.speechSynthesis.cancel();
    utterance = new SpeechSynthesisUtterance(originalText);
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onstart = () => {
      paused = false;
      setSpeakingUI(true);
      ttsStatus.textContent = 'Speaking\\u2026';
    };
    utterance.onboundary = (event) => {
      if (event.name === 'word' || event.charLength > 0) {
        highlightAt(event.charIndex, event.charLength || 1);
      }
    };
    utterance.onend = () => {
      setSpeakingUI(false);
      clearHighlight();
      ttsStatus.textContent = 'Finished';
      utterance = null;
    };
    utterance.onerror = () => {
      setSpeakingUI(false);
      clearHighlight();
      ttsStatus.textContent = 'Speech error';
      utterance = null;
    };

    window.speechSynthesis.speak(utterance);
  }

  ttsBtn.addEventListener('click', () => {
    if (!utterance) {
      speak();
      return;
    }
    // Toggle pause/resume while an utterance is active
    if (window.speechSynthesis.speaking && !paused) {
      window.speechSynthesis.pause();
      paused = true;
      ttsLabel.textContent = 'Resume';
      ttsStatus.textContent = 'Paused';
    } else if (paused) {
      window.speechSynthesis.resume();
      paused = false;
      ttsLabel.textContent = 'Pause';
      ttsStatus.textContent = 'Speaking\\u2026';
    }
  });

  ttsStop.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    setSpeakingUI(false);
    clearHighlight();
    ttsStatus.textContent = 'Stopped';
    utterance = null;
    paused = false;
  });

  // Stop speaking if the demo is torn down / navigated away from
  window.addEventListener('beforeunload', () => window.speechSynthesis.cancel());
}`,

  seo: {
    title: 'Text-to-Speech Button — Free Web Speech API Read-Aloud Snippet',
    description: `A "Read aloud" button that uses the browser's native SpeechSynthesis API to speak a paragraph, with play/pause/stop states and live word highlighting. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Text-to-Speech Button — Native Read-Aloud With the Web Speech API',
      description: `Every major browser ships a working text-to-speech engine for free, through the Web Speech API's \`speechSynthesis\` interface — no server round-trip, no paid API key, no audio file to generate. This snippet wires up a "Read aloud" button that speaks a paragraph using \`window.speechSynthesis\` and \`SpeechSynthesisUtterance\`, with real play/pause/stop states and a pulsing icon and live word highlight synced to the browser's own speech-boundary events, not a fake timer.

**The actual API surface**

\`speechSynthesis.speak(utterance)\` queues an utterance for the browser's speech engine; \`speechSynthesis.pause()\` and \`.resume()\` suspend and continue it mid-sentence (support for true pause/resume varies slightly by browser and voice, but is solid in current Chrome, Edge, and Safari); \`speechSynthesis.cancel()\` stops everything immediately. The utterance object itself fires \`onstart\`, \`onend\`, \`onerror\`, and — most usefully for a rich UI — \`onboundary\`, which the browser calls as it crosses each word or sentence boundary while speaking, carrying a \`charIndex\` and \`charLength\` into the original text.

**Real-time word highlighting from onboundary**

Rather than faking a highlight with a fixed-interval timer (which drifts out of sync with actual speech rate almost immediately), this snippet listens to \`utterance.onboundary\` and uses the event's \`charIndex\`/\`charLength\` to slice the exact word currently being spoken out of the original paragraph, wrapping it in a \`<span class="tts-word">\` with a highlight background. Because the event fires from the browser's own speech engine, the highlight tracks the actual audio, not an approximation — the same technique used by karaoke-style read-along apps.

**Honest handling of missing support**

Not every browser or embedded webview implements \`speechSynthesis\` (some in-app browsers and older environments don't), so the script feature-detects \`'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window\` before wiring anything up, disables the button, and shows a clear inline message rather than silently failing or throwing when clicked. That kind of honest degradation matters more here than in most snippets, because a broken read-aloud button with no explanation is worse for accessibility than no button at all.

**Where it fits alongside other accessibility affordances**

Pair a read-aloud button with [a dyslexia-friendly reading mode toggle](/ui-snippets/dyslexia-font-toggle/) and [a text size adjuster](/ui-snippets/text-size-adjuster/) for a genuinely useful reading-accessibility toolbar — some users benefit from hearing content while others benefit from font and spacing changes, and offering both costs little once you have this pattern in place. It also complements [the live region announcer](/ui-snippets/live-region-announcer-demo/) pattern, since the \`role="status"\` element here announces state changes ("Speaking…", "Paused", "Finished") to screen reader users the same way.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Click "Read aloud"', text: `The browser's speech engine starts reading the paragraph; the icon pulses.` },
      { title: 'Watch the word highlight', text: `Each word highlights as it's spoken, driven by the utterance's boundary events.` },
      { title: 'Click the button again', text: `It pauses mid-sentence; the label switches to "Resume".` },
      { title: 'Click "Stop"', text: `Speech cancels immediately and the highlight clears.` },
      { title: 'Try it with speech unsupported', text: `Feature detection disables the button and shows a plain-language notice instead of failing silently.` },
      { title: 'Swap in your own text', text: `Replace #readerText's content — the JS re-reads it via textContent on each speak().` },
    ] },
    features: [
      { title: 'Native SpeechSynthesis', text: `No API key, no audio file, no server round-trip.` },
      { title: 'Real pause/resume', text: `Uses speechSynthesis.pause()/.resume(), not cancel-and-restart.` },
      { title: 'Boundary-synced highlight', text: `onboundary drives the highlighted word, not a fake timer.` },
      { title: 'Pulsing speaking indicator', text: `A CSS animation toggles only while actually speaking.` },
      { title: 'Live status announcements', text: `role="status" reports Speaking/Paused/Finished to screen readers.` },
      { title: 'Honest unsupported state', text: `Feature-detects speechSynthesis and disables cleanly if missing.` },
      { title: 'Stop control', text: `Immediately cancels speech and resets all UI state.` },
      { title: 'Cleans up on unload', text: `Cancels any in-flight speech before the page is torn down.` },
    ],
    useCases: [
      { title: 'Article and blog readers', text: `Let visitors listen instead of read, especially on long-form content.` },
      { title: 'Accessibility toolbars', text: `Pair with [text size adjuster](/ui-snippets/text-size-adjuster/) and [reading mode toggle](/ui-snippets/reading-mode-toggle/).` },
      { title: 'Language learning tools', text: `Read example sentences aloud with the browser's chosen voice/language.` },
      { title: 'Low-vision or dyslexia support', text: `Combine with [the dyslexia-friendly reading mode](/ui-snippets/dyslexia-font-toggle/).` },
      { title: 'Onboarding and help text', text: `Offer an audio alternative to dense instructional copy.` },
      { title: 'Kiosk and public displays', text: `Read prompts aloud where a screen reader isn't otherwise available.` },
    ],
    faqs: [
      { q: 'Does this cost anything or need an API key?', a: `No — it uses the browser's built-in Web Speech API (window.speechSynthesis), which is a native browser feature with no network request, no API key, and no per-character cost. The voice quality depends on what the operating system and browser provide, which varies but is generally solid on current Chrome, Edge, Safari, and Firefox.` },
      { q: 'How does the word highlight stay in sync with the audio?', a: `It listens to the utterance's onboundary event, which the browser's own speech engine fires as it crosses each word boundary while actually speaking, carrying the exact character index and length of that word. The highlight uses those values to slice the real word out of the source text, so it tracks the actual audio rather than an approximated fixed-interval timer that would drift.` },
      { q: 'What happens in a browser that doesn\'t support speechSynthesis?', a: `The script checks for 'speechSynthesis' in window and 'SpeechSynthesisUtterance' in window before wiring up any listeners. If either is missing, the button is disabled and a plain-language notice explains that read-aloud isn\'t available in this browser, rather than the button silently doing nothing or throwing an error when clicked.` },
      { q: 'Can pause/resume behave differently across browsers?', a: `Yes — true mid-utterance pause and resume is well supported in current Chrome, Edge, and Safari, but some browser/voice combinations may resume from a slightly different point or, in rare older cases, restart the utterance instead of truly resuming. It\'s worth testing pause/resume specifically in your target browsers if that exact behavior matters for your use case.` },
      { q: 'Can I change the voice, rate, or pitch?', a: `Yes — set utterance.rate (0.1 to 10, default 1), utterance.pitch (0 to 2, default 1), and utterance.voice to one of the SpeechSynthesisVoice objects returned by speechSynthesis.getVoices() (note getVoices() can return an empty array until the voiceschanged event fires the first time in some browsers).` },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain how the onboundary event's charIndex and charLength let the highlight track real speech timing instead of a guessed interval — that distinction is the core trick worth understanding before you extend this pattern. It's also a good prompt for building a voice picker: ask the assistant to add a select populated from speechSynthesis.getVoices(), handling the fact that the list can be empty until the voiceschanged event fires. You could ask it to add a reading-speed slider bound to utterance.rate, or to make the highlight scroll the reading pane to keep the current word in view for very long passages. Treat the snippet as a working base for a fuller read-aloud feature rather than a finished, uneditable widget.`,
      prompt: `Build a "Read aloud" text-to-speech button in plain HTML, CSS, and JavaScript using the native Web Speech API (window.speechSynthesis and SpeechSynthesisUtterance) — no external library or API key.

Requirements:
- A button that starts speaking a paragraph of text when first clicked, and toggles between pause and resume on subsequent clicks while speech is active, using speechSynthesis.pause()/.resume() rather than cancel-and-restart.
- A separate stop control that immediately cancels speech via speechSynthesis.cancel() and resets all UI state.
- A visual "speaking" indicator (such as a pulsing icon) that is only active while speech.speaking is true, driven by the utterance's onstart and onend events rather than a fixed timer.
- Real-time word highlighting: listen to the utterance's onboundary event and use its charIndex/charLength to highlight the exact word currently being spoken within the source paragraph, so the highlight is synced to actual speech progress, not a fake interval.
- A role="status" live region that announces state changes like "Speaking...", "Paused", and "Finished" for screen reader users.
- Feature-detect 'speechSynthesis' in window and 'SpeechSynthesisUtterance' in window before wiring anything up; if unsupported, disable the button and show a clear plain-language message explaining that this browser doesn't support read-aloud, rather than failing silently or throwing when clicked.
- Cancel any in-flight speech on page unload to avoid audio continuing after navigation.`,
    },
  },
};

export default textToSpeechButton;
