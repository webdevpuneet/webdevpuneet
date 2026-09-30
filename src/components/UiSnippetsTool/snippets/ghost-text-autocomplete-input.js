const ghostTextAutocompleteInput = {
  id: 'ghost-text-autocomplete-input',
  title: 'Ghost Text Inline Autocomplete Input',
  lastmod: '2026-08-08',
  category: 'forms',
  html: `<div class="demo-wrap">
  <label class="field-label" for="ghost-input">Compose a message</label>
  <div class="ghost-field">
    <div class="ghost-display" id="ghost-display" aria-hidden="true"><span class="typed" id="typed-span"></span><span class="ghost" id="ghost-span"></span></div>
    <textarea id="ghost-input" class="ghost-input" spellcheck="false" placeholder="Start typing 'Thank you' or 'I look forward'..." rows="4"></textarea>
  </div>
  <p class="hint"><kbd>Tab</kbd> or <kbd>&rarr;</kbd> accepts the suggestion &middot; <kbd>Esc</kbd> dismisses it &middot; keep typing to ignore it</p>
  <div class="status-row">
    <span class="status-dot" id="status-dot"></span>
    <span id="status-text">No suggestion yet — start typing a common phrase opener.</span>
  </div>
</div>`,

  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.demo-wrap { width: 100%; max-width: 480px; }
.field-label { display: block; font-size: 13px; font-weight: 600; color: #334155; margin-bottom: 8px; }

.ghost-field { position: relative; width: 100%; }

.ghost-display,
.ghost-input {
  font-family: inherit;
  font-size: 15px;
  line-height: 1.6;
  padding: 14px 16px;
  width: 100%;
  border-radius: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.ghost-display {
  position: absolute;
  inset: 0;
  border: 1.5px solid transparent;
  pointer-events: none;
  color: transparent;
  overflow: hidden;
}
.ghost-display .typed { color: transparent; }
.ghost-display .ghost { color: #b0b7c3; }

.ghost-input {
  position: relative;
  z-index: 2;
  display: block;
  background: #fff;
  border: 1.5px solid #e2e8f0;
  color: #0f172a;
  resize: vertical;
  min-height: 108px;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;
}
.ghost-input:focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
}

.hint { margin-top: 10px; font-size: 12px; color: #64748b; line-height: 1.6; }
kbd {
  font-family: ui-monospace, monospace;
  font-size: 11px;
  background: #eef2ff;
  color: #4338ca;
  border: 1px solid #c7d2fe;
  border-bottom-width: 2px;
  border-radius: 5px;
  padding: 1px 6px;
  margin: 0 1px;
}

.status-row {
  margin-top: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #64748b;
  background: #fff;
  border: 1px solid #f1f5f9;
  border-radius: 10px;
  padding: 9px 12px;
}
.status-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: #cbd5e1;
  flex-shrink: 0;
  transition: background 0.15s;
}
.status-dot.active { background: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.18); }`,

  js: `const SUGGESTIONS = [
  'Thank you for your quick response, I really appreciate it.',
  'Thank you for reaching out to us about this issue.',
  "I look forward to hearing from you soon.",
  "I hope this email finds you well.",
  'Please let me know if you have any questions.',
  'Please find the attached document for your review.',
  'Could you please provide more details about the request?',
  "I appreciate your patience while we look into this.",
  "Let's schedule a call to discuss this further.",
  'Looking forward to our meeting next week.',
  'Sorry for the delayed response, things have been busy.',
  'As per our previous conversation, I wanted to follow up.',
];

const input = document.getElementById('ghost-input');
const typedSpan = document.getElementById('typed-span');
const ghostSpan = document.getElementById('ghost-span');
const display = document.getElementById('ghost-display');
const statusText = document.getElementById('status-text');
const statusDot = document.getElementById('status-dot');

let currentSuggestion = '';

function findSuggestion(text) {
  if (!text) return '';
  const lower = text.toLowerCase();
  const match = SUGGESTIONS.find(
    (s) => s.toLowerCase().startsWith(lower) && s.length > text.length
  );
  return match ? match.slice(text.length) : '';
}

function render() {
  const value = input.value;
  typedSpan.textContent = value;
  ghostSpan.textContent = currentSuggestion;
  // Keep the invisible overlay's scroll position glued to the real textarea
  display.scrollTop = input.scrollTop;
}

function updateSuggestion() {
  const value = input.value;
  currentSuggestion = findSuggestion(value);
  render();

  if (currentSuggestion) {
    statusText.textContent = 'Tab or → to accept: "' + currentSuggestion.trim() + '"';
    statusDot.classList.add('active');
  } else if (value) {
    statusText.textContent = 'No match in the phrase dictionary for this text yet.';
    statusDot.classList.remove('active');
  } else {
    statusText.textContent = 'No suggestion yet — start typing a common phrase opener.';
    statusDot.classList.remove('active');
  }
}

function acceptSuggestion() {
  if (!currentSuggestion) return;
  input.value = input.value + currentSuggestion;
  currentSuggestion = '';
  render();
  updateSuggestion();
  input.setSelectionRange(input.value.length, input.value.length);
}

function dismissSuggestion() {
  currentSuggestion = '';
  render();
  statusText.textContent = 'Suggestion dismissed.';
  statusDot.classList.remove('active');
}

input.addEventListener('input', updateSuggestion);
input.addEventListener('scroll', render);

input.addEventListener('keydown', (e) => {
  const atEnd = input.selectionStart === input.value.length && input.selectionEnd === input.value.length;

  if (e.key === 'Tab' && currentSuggestion) {
    e.preventDefault();
    acceptSuggestion();
  } else if (e.key === 'ArrowRight' && atEnd && currentSuggestion) {
    e.preventDefault();
    acceptSuggestion();
  } else if (e.key === 'Escape' && currentSuggestion) {
    e.preventDefault();
    dismissSuggestion();
  }
});

render();`,

  seo: {
    title: 'Ghost Text Autocomplete Input — Free HTML CSS JS Snippet',
    description: 'Inline gray ghost-text suggestions like Copilot, built with a synced overlay div over a real textarea. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Ghost Text Inline Autocomplete Input — Copilot-Style Suggestion Overlay, Tab-to-Accept & Synced Text Layers',
      description: `Inline "ghost text" autocomplete is the interaction pattern behind GitHub Copilot, modern AI writing assistants, and command palettes that predict what you are about to type and let you accept it with a single keypress. The core visual idea is simple: as you type, a faint gray continuation appears immediately after your cursor, showing a plausible completion of the current phrase, and pressing \`Tab\` (or \`→\` when the cursor is already at the end of the text) commits that suggestion instantly. Continuing to type ignores or replaces it, and \`Escape\` clears it without accepting. This snippet builds that exact interaction from scratch in vanilla HTML, CSS, and JavaScript.

**Why a native input can't do this alone**

A native \`<input>\` or \`<textarea>\` renders a single string of text in a single color — there is no built-in way to render the first N characters in normal black text and the remaining characters in muted gray within the same field. Browsers do not expose a two-tone text API for form controls. So this snippet uses the standard workaround: a **synced overlay technique**. Two elements occupy the exact same box — a real, editable \`textarea\` on top (\`z-index: 2\`) and a non-interactive \`div\` behind it (\`.ghost-display\`) that mirrors the same font, padding, and line-height pixel-for-pixel. The textarea has normal, fully opaque text color so what the user types is always crisp and real. The div behind it contains two spans: \`.typed\`, which duplicates the user's current input but is rendered fully **transparent** (\`color: transparent\`), and \`.ghost\`, which holds the predicted suffix in a muted gray (\`#b0b7c3\`). Because the typed span is invisible and exactly matches the textarea's own rendered text in width, the ghost span lands in precisely the empty space right after the real caret — creating the illusion of a single field with two-tone text, when it is actually two perfectly aligned layers.

**Keeping the layers in sync**

Every \`input\` event re-renders both spans: \`typedSpan.textContent\` is set to the live value of the textarea, and \`ghostSpan.textContent\` is set to whatever suggestion currently applies. A \`scroll\` listener on the real textarea copies its \`scrollTop\` onto the overlay div so that if the user types enough to scroll the field, the ghost text scrolls in lockstep rather than drifting out of alignment. This synchronization is the part that makes the overlay technique actually work in production — without it, ghost text would visibly detach from the caret the moment the field scrolls or wraps.

**Suggestion matching and acceptance**

The suggestion engine here is intentionally simple and local: a small array of common phrase openers (email closings, meeting requests, apologies) is searched on every keystroke for any entry whose lowercase text starts with the user's current lowercase input and is longer than what has been typed so far. The remaining characters of the first match become the ghost suffix. Real products like Copilot replace this array with a language model call, but the rendering and event-handling mechanics — overlay sync, keyboard interception, and accept/dismiss/ignore semantics — are identical regardless of whether the suggestion comes from a static list or an API response.

**Why this matters for 2026 interfaces**

Inline predictive text is now a baseline expectation in AI-native products: search bars, chat composers, code editors, and even form fields increasingly show the system's best guess before the user finishes typing, making the interface feel anticipatory rather than reactive. Done well, it respects user agency — the suggestion is always visually distinct from committed text, never auto-inserted, and dismissible with a single keypress — which keeps the experience calm and predictable instead of feeling like the interface is taking over. Getting the layering, keyboard handling, and scroll-sync details right, as this snippet does, is what separates a convincing ghost-text field from one that flickers or misaligns under real use.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        {
          title: 'Type a phrase opener to trigger a suggestion',
          text: 'Start typing text that matches the beginning of an entry in the SUGGESTIONS array, such as "Thank you" or "I look forward". The updateSuggestion() function runs on every input event, calls findSuggestion(), and writes the remaining characters into the #ghost-span element.',
        },
        {
          title: 'Accept with Tab or the right arrow key',
          text: 'Press Tab at any time while a suggestion is showing, or press ArrowRight when the caret is at the end of the text, to call acceptSuggestion(). This appends currentSuggestion to input.value and moves the caret to the new end of the field with setSelectionRange().',
        },
        {
          title: 'Dismiss without accepting',
          text: 'Press Escape to call dismissSuggestion(), which clears currentSuggestion and re-renders the overlay so the gray suffix disappears immediately, leaving only what you actually typed.',
        },
        {
          title: 'Extend the suggestion dictionary',
          text: 'Add or edit strings in the SUGGESTIONS constant at the top of the JS panel. Matching is case-insensitive and prefix-based via String.startsWith(), so order entries so the most useful completion for a given prefix appears first in the array.',
        },
        {
          title: 'Swap the static list for a live API',
          text: 'Replace the synchronous findSuggestion() call inside updateSuggestion() with a debounced fetch to a completion endpoint (or an LLM API), and set currentSuggestion from the response before calling render(). Keep the overlay sync and keyboard handling exactly as-is — only the suggestion source changes.',
        },
        {
          title: 'Export and match your form styling',
          text: 'Click HTML to download a standalone file, or JSX for a React component. Adjust .ghost-input and .ghost-display padding, font-size, and line-height together — they must always match exactly, in both elements, or the ghost text will drift out of alignment with the real caret.',
        },
      ],
    },
    features: [
      'Two-layer overlay technique: transparent .typed span + gray .ghost span rendered behind a real textarea',
      'Pixel-perfect sync of font, padding, and line-height between .ghost-display and .ghost-input',
      'scroll event listener keeps overlay scrollTop glued to the real textarea on long input',
      'Prefix-based matching via String.startsWith() against a swappable SUGGESTIONS array',
      'Tab-to-accept and end-of-text ArrowRight-to-accept, both intercepted with e.preventDefault()',
      'Escape key dismisses the current suggestion without altering typed text',
      'Live status row reports the pending suggestion text or "no match" state for screen users',
      'setSelectionRange() moves the caret to the true end of the field after an accepted suggestion',
    ],
    useCases: [
      {
        icon: 'FORM',
        title: 'AI-assisted email and chat composers',
        desc: 'Email clients and support chat tools increasingly suggest the rest of a sentence as the agent types, cutting repetitive typing for common openers and closings. This snippet is the exact overlay mechanism behind that experience — swap the local SUGGESTIONS array for a completion API and the interaction (Tab to accept, keep typing to ignore) carries over unchanged. It pairs naturally with a [Toast Notification](/ui-snippets/toast-notification/) to confirm when a message sends.',
      },
      {
        icon: 'CODE',
        title: 'Command palettes and search bars with predictive completion',
        desc: 'Developer tools, admin dashboards, and internal search UIs use ghost text to suggest the most likely completion of a partially typed command or query, letting power users fly through repeated actions with a single Tab press instead of typing the full string every time.',
      },
      {
        icon: 'FLOW',
        title: 'Form fields that reduce repetitive data entry',
        desc: 'Support ticket forms, CRM notes, and address fields often see the same handful of phrases typed over and over by the same users. A local suggestion dictionary built from a team\'s most common entries turns this into single-keypress completions without needing any backend or AI service.',
      },
      {
        icon: 'LEARN',
        title: 'Teaching the two-layer overlay technique for custom text rendering',
        desc: 'Any UI that needs to render styled or multi-color text inside an editable field — syntax highlighting in a code input, inline validation markers, or mention highlighting — relies on some variant of this same synced-overlay approach, since native form controls only support single-color text.',
      },
      {
        icon: 'APP',
        title: 'AI writing assistants with transparent, non-intrusive suggestions',
        desc: 'Writing tools that suggest phrasing improvements need the suggestion to be visually obvious as "not yet committed" text so users never mistake a prediction for something they actually wrote. The gray ghost span plus explicit Tab-to-accept keeps the AI\'s contribution transparent and fully under user control, which is a core expectation of trust-driven AI-native UX in 2026.',
      },
      {
        icon: 'DESIGN',
        title: 'Design systems establishing a consistent ghost-text visual language',
        desc: 'Once a product has one ghost-text field, users expect the same gray tone, timing, and keyboard shortcuts everywhere predictive text appears. Centralizing the .ghost color, the Tab-accept convention, and the Escape-dismiss behavior in a shared component keeps that experience consistent across search, chat, and forms.',
      },
      { icon: 'CODE', title: 'Related: Password Reset Form', desc: 'See the [Password Reset Form](/ui-snippets/password-reset-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: "Why can't I just change the color of part of the text inside a normal input?",
        a: "Native <input> and <textarea> elements render their entire value as one plain string with a single computed color — there is no CSS selector or API that targets \"the last N characters\" of a form control's value. Rich, multi-colored inline text requires either a contenteditable element (which introduces its own complexity around selection, paste, and value extraction) or, as this snippet does, a visually identical non-editable element layered behind the real field to carry the extra styling.",
      },
      {
        q: 'How do I keep the ghost overlay perfectly aligned with the real textarea?',
        a: 'Both .ghost-display and .ghost-input must share identical font-family, font-size, line-height, padding, border-width, and white-space/word-wrap rules, and both must occupy the same box via position: absolute; inset: 0 on the overlay inside a position: relative wrapper. Any mismatch — even 1px of padding — causes the ghost text to visibly drift from the real caret position. The scroll listener syncing scrollTop is equally important once the field grows past its visible height.',
      },
      {
        q: 'Does this approach work with a single-line <input> instead of a <textarea>?',
        a: 'Yes — the same overlay pattern works with a single-line input; just swap white-space: pre-wrap for white-space: pre and drop the manual row height. The suggestion logic, keyboard handling, and typed/ghost span structure are unchanged. Multi-line textareas need the extra scroll-sync handling this snippet includes because content can grow taller than the visible box.',
      },
      {
        q: 'How would I connect this to a real AI completion API instead of a static list?',
        a: 'Debounce the input event (150–300ms is typical), send the current value to your completion endpoint, and set currentSuggestion from the response text before calling render(). Guard against out-of-order responses by tracking a request ID or aborting the previous fetch with an AbortController, since a slow earlier request resolving after a newer one would otherwise overwrite a fresher suggestion with a stale one.',
      },
      {
        q: 'What happens if the user pastes text or uses voice input?',
        a: 'Both trigger a native input event just like typing, so updateSuggestion() runs automatically and recomputes the suggestion against whatever text landed in the field — no special-casing is needed. If you add async completion fetching, make sure the debounce timer also restarts correctly on paste, since large pasted blocks can otherwise fire several rapid input events in succession.',
      },
    ],
    aiPrompt: {
      paragraph: `Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to trace exactly how the .typed and .ghost spans stay pixel-aligned with the real textarea — specifically why font, padding, and line-height must match exactly between .ghost-display and .ghost-input, and what breaks if they don't. It's also a great snippet to extend with AI help: ask it to replace the static SUGGESTIONS array with a debounced fetch to a real completion API while preserving the accept/dismiss/ignore keyboard behavior, or to add multi-word ghost suggestions that update word-by-word as you type rather than only matching whole known phrases. You can also ask it to add ARIA live-region announcements so screen reader users are told when a suggestion becomes available, since the current implementation is purely visual.`,
      prompt: `Build an inline "ghost text" autocomplete field in plain HTML, CSS, and JavaScript, similar to GitHub Copilot's inline suggestions, using no libraries or contenteditable elements.

Requirements:
- Use a real, fully editable <textarea> for actual typing, layered on top of a non-interactive overlay div that mirrors its exact font, padding, and line-height so the two stay pixel-aligned.
- The overlay must render the user's already-typed text as fully invisible (so it doesn't double up visually) followed by a muted gray span containing the predicted suggestion suffix, so the suggestion visually appears to continue right after the real caret.
- Maintain a small local array of candidate phrases; on every keystroke, find the first entry whose text starts with the current input (case-insensitive) and is longer than what's typed, and show the remaining characters as the ghost suffix.
- Pressing Tab while a suggestion is showing must accept it (append the suffix to the real value and move the caret to the end), and must prevent the default Tab focus-change behavior.
- Pressing the right arrow key must also accept the suggestion, but only when the caret is already at the very end of the typed text — elsewhere it should move the caret normally.
- Pressing Escape must clear the current suggestion without altering the typed text.
- Continuing to type normal characters must silently drop the previous suggestion and recompute a new one from scratch on the updated text.
- If the textarea grows tall enough to scroll, keep the overlay's scroll position synced to the real textarea's scroll position so the ghost text never visually detaches from the caret.`,
    },
  },
};

export default ghostTextAutocompleteInput;
