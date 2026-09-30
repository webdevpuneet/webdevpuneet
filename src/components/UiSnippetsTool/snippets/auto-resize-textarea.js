const autoResizeTextarea = {
  id: 'auto-resize-textarea',
  title: 'Auto-Resize Textarea',
  lastmod: '2026-06-12',
  category: 'forms',
  html: `<div class="page">
  <div class="card">
    <div class="card-head">
      <h2 class="card-title">Leave a comment</h2>
      <p class="card-sub">Your feedback helps improve the product.</p>
    </div>

    <form class="form" id="form" novalidate>
      <div class="field">
        <label class="label" for="name">Your name</label>
        <input class="input" id="name" type="text" placeholder="Jane Doe" autocomplete="name" />
      </div>

      <div class="field">
        <label class="label" for="msg">Message <span class="required">*</span></label>
        <div class="textarea-wrap">
          <textarea
            class="textarea"
            id="msg"
            placeholder="Type your message here… the textarea grows as you type."
            rows="3"
            maxlength="500"
            aria-describedby="msg-counter msg-hint"
            required
          ></textarea>
          <div class="counter-row">
            <span class="hint" id="msg-hint">Be specific — good feedback is actionable.</span>
            <span class="counter" id="msg-counter" aria-live="polite"><span id="char-count">0</span>/500</span>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label" for="rating">Rating</label>
        <div class="stars" id="stars" role="radiogroup" aria-label="Star rating">
          <button type="button" class="star" data-v="1" aria-label="1 star">★</button>
          <button type="button" class="star" data-v="2" aria-label="2 stars">★</button>
          <button type="button" class="star" data-v="3" aria-label="3 stars">★</button>
          <button type="button" class="star" data-v="4" aria-label="4 stars">★</button>
          <button type="button" class="star" data-v="5" aria-label="5 stars">★</button>
        </div>
      </div>

      <div class="actions">
        <button type="button" class="btn-ghost" id="clear-btn">Clear</button>
        <button type="submit" class="btn-primary" id="submit-btn">Submit</button>
      </div>
    </form>

    <div class="success" id="success" hidden>
      <div class="success-icon">✓</div>
      <div class="success-title">Thanks for your feedback!</div>
      <div class="success-sub">We read every comment and use it to improve.</div>
      <button class="btn-ghost" id="reset-btn">Submit another</button>
    </div>
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, -apple-system, sans-serif; background: #f1f5f9; min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 24px; }

.page { width: 100%; max-width: 460px; }

.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  padding: 28px 28px 24px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}

.card-head { margin-bottom: 22px; }
.card-title { font-size: 18px; font-weight: 800; color: #1e293b; margin-bottom: 4px; }
.card-sub { font-size: 13px; color: #64748b; }

.form { display: flex; flex-direction: column; gap: 18px; }

.field { display: flex; flex-direction: column; gap: 6px; }
.label { font-size: 13px; font-weight: 600; color: #374151; }
.required { color: #ef4444; }

.input {
  width: 100%;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px;
  font-size: 14px; color: #1e293b;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}
.input::placeholder { color: #94a3b8; }
.input:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }

.textarea-wrap { display: flex; flex-direction: column; gap: 0; }

.textarea {
  width: 100%;
  min-height: 88px;
  padding: 10px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 10px 10px 0 0;
  border-bottom: none;
  font-size: 14px; color: #1e293b;
  font-family: inherit;
  line-height: 1.55;
  resize: none;
  overflow: hidden;
  background: #fff;
  transition: border-color 0.15s, box-shadow 0.15s;
  outline: none;
}
.textarea::placeholder { color: #94a3b8; }
.textarea:focus { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.12); }
.textarea.warn  { border-color: #f59e0b; }
.textarea.error { border-color: #ef4444; }
.textarea.warn:focus  { box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }
.textarea.error:focus { box-shadow: 0 0 0 3px rgba(239,68,68,0.12); }

.counter-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 6px 14px;
  background: #f8fafc;
  border: 1.5px solid #e2e8f0;
  border-top: none;
  border-radius: 0 0 10px 10px;
  transition: border-color 0.15s;
}
.textarea:focus + .counter-row, .textarea.warn + .counter-row { border-color: #6366f1; }
.textarea.warn ~ .counter-row,  .textarea.warn + .counter-row  { border-color: #f59e0b; }
.textarea.error ~ .counter-row, .textarea.error + .counter-row { border-color: #ef4444; }

.hint { font-size: 11.5px; color: #94a3b8; }
.counter { font-size: 11.5px; color: #94a3b8; font-weight: 600; white-space: nowrap; }
.counter.warn  { color: #f59e0b; }
.counter.error { color: #ef4444; }

.stars { display: flex; gap: 4px; }
.star {
  background: none; border: none; cursor: pointer;
  font-size: 26px; color: #e2e8f0;
  transition: color 0.1s, transform 0.1s;
  line-height: 1; padding: 2px;
}
.star:hover, .star.lit { color: #f59e0b; }
.star:hover { transform: scale(1.15); }

.actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 4px; }
.btn-ghost {
  padding: 9px 20px; border-radius: 10px;
  border: 1.5px solid #e2e8f0; background: #fff;
  font-size: 14px; font-weight: 600; color: #64748b;
  cursor: pointer; transition: background 0.15s;
}
.btn-ghost:hover { background: #f8fafc; }
.btn-primary {
  padding: 9px 20px; border-radius: 10px;
  border: none; background: #6366f1;
  font-size: 14px; font-weight: 700; color: #fff;
  cursor: pointer; transition: background 0.15s;
}
.btn-primary:hover { background: #4f46e5; }
.btn-primary:disabled { background: #a5b4fc; cursor: default; }

[hidden] { display: none !important; }
.success { text-align: center; padding: 28px 0; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.success-icon { width: 56px; height: 56px; background: #f0fdf4; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; color: #22c55e; }
.success-title { font-size: 17px; font-weight: 800; color: #1e293b; }
.success-sub { font-size: 13px; color: #64748b; max-width: 280px; }`,
  js: `const textarea   = document.getElementById('msg');
const charCount  = document.getElementById('char-count');
const counter    = document.getElementById('msg-counter');
const form       = document.getElementById('form');
const success    = document.getElementById('success');
const clearBtn   = document.getElementById('clear-btn');
const resetBtn   = document.getElementById('reset-btn');
const stars      = document.querySelectorAll('.star');
let rating = 0;

/* ── Auto-resize ────────────────────────────────────── */
function resize() {
  textarea.style.height = 'auto';
  textarea.style.height = textarea.scrollHeight + 'px';
}

/* ── Character counter ──────────────────────────────── */
function updateCounter() {
  const len = textarea.value.length;
  const max = +textarea.getAttribute('maxlength');
  charCount.textContent = len;
  const pct = len / max;
  textarea.classList.toggle('warn',  pct >= 0.8 && pct < 1);
  textarea.classList.toggle('error', pct >= 1);
  counter.classList.toggle('warn',   pct >= 0.8 && pct < 1);
  counter.classList.toggle('error',  pct >= 1);
}

textarea.addEventListener('input', () => { resize(); updateCounter(); });

/* ── Star rating ────────────────────────────────────── */
function lightStars(n) {
  stars.forEach(s => s.classList.toggle('lit', +s.dataset.v <= n));
}

stars.forEach(s => {
  s.addEventListener('mouseenter', () => lightStars(+s.dataset.v));
  s.addEventListener('mouseleave', () => lightStars(rating));
  s.addEventListener('click', () => { rating = +s.dataset.v; lightStars(rating); });
});

/* ── Submit ─────────────────────────────────────────── */
form.addEventListener('submit', e => {
  e.preventDefault();
  if (!textarea.value.trim()) {
    textarea.focus();
    textarea.classList.add('error');
    return;
  }
  form.hidden = true;
  success.hidden = false;
});

/* ── Clear / Reset ──────────────────────────────────── */
clearBtn.addEventListener('click', () => {
  textarea.value = '';
  resize(); updateCounter();
  rating = 0; lightStars(0);
  textarea.classList.remove('warn','error');
  counter.classList.remove('warn','error');
});

resetBtn.addEventListener('click', () => {
  form.reset();
  textarea.value = '';
  resize(); updateCounter();
  rating = 0; lightStars(0);
  textarea.classList.remove('warn','error');
  counter.classList.remove('warn','error');
  form.hidden = false;
  success.hidden = true;
});

resize();`,
  seo: {
    title: 'Auto-Resize Textarea — Free HTML CSS JS Snippet',
    description: `Auto-growing textarea using scrollHeight measurement, 3-threshold character counter, connected border design, and success state. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Auto-Resize Textarea — HTML CSS JavaScript',
      description: `Textarea that grows as you type with a live character counter, warning colours at 80%/100%, star rating, and form submit state. Zero dependencies.

An auto-resizing textarea removes one of the most frustrating friction points in form UX: the fixed-height text box that forces users to scroll through their own input while typing. This pattern is used in comment forms, chat inputs, feedback dialogs, and email composers across virtually every modern web product. This snippet builds a complete feedback form with auto-grow behaviour, a live character counter with colour-coded thresholds, a star rating widget, and a success state — all in pure HTML, CSS, and JavaScript.

**The auto-resize mechanism**

The core auto-grow technique is a two-step height update in the \`resize()\` function. First, \`textarea.style.height = 'auto'\` collapses the element to its minimum size, allowing the browser to recalculate \`scrollHeight\` accurately. Second, \`textarea.style.height = textarea.scrollHeight + 'px'\` sets the height to the exact content height. Without the reset to \`auto\` first, \`scrollHeight\` returns the previously set explicit height rather than the natural content height — the element would only grow, never shrink when lines are deleted. The textarea also has \`overflow: hidden\` to prevent a scrollbar from briefly appearing during the resize, and \`resize: none\` to remove the browser's default drag handle since the element manages its own height.

**Character counter with threshold colouring**

The counter reads \`textarea.value.length\` and \`textarea.getAttribute('maxlength')\` on every \`input\` event to compute a ratio. Below 80% the counter is a muted grey. At 80% it switches to amber using \`.warn\` classes. At 100% it switches to red with \`.error\` classes. Both the textarea and the counter row receive these classes so the border and the count text change colour in sync. The counter row below the textarea shares the same border and mirrors the textarea's \`border-color\` through CSS class pairing, creating a visually unified component.

**Connected border treatment**

The textarea and its counter bar are two separate elements that appear as one by sharing a border: the textarea has \`border-radius: 10px 10px 0 0\` with \`border-bottom: none\`, and the counter bar has \`border-radius: 0 0 10px 10px\` with \`border-top: none\`. Both have \`border: 1.5px solid #e2e8f0\`. When the textarea receives focus or a warning class, the sibling counter row needs its border to match — CSS handles this via adjacent-sibling selectors like \`.textarea:focus + .counter-row\`.

**Star rating widget**

Each star button has a numeric \`data-v\` attribute. \`mouseenter\` calls \`lightStars(n)\` to visually preview the rating by adding the \`lit\` class to all stars with \`data-v ≤ n\`. \`mouseleave\` resets to \`lightStars(rating)\` — the last committed rating. \`click\` commits the rating by updating the \`rating\` variable. This three-listener pattern (preview, reset, commit) is the canonical star rating implementation.

**Accessible counter**

The counter span has \`aria-live="polite"\` so screen readers announce the count periodically without interrupting typing. The textarea has \`aria-describedby\` pointing at both the hint text and the counter span, associating both with the field for assistive technologies.`,
    },
    howToUse: { type: 'steps', items: [
      {
        title: 'Type in the textarea',
        text: `The textarea grows downward as you type — no scrollbar, no fixed height. Deleting lines shrinks it back to fit the remaining content.`,
      },
      {
        title: 'Watch the character counter',
        text: `The counter below the textarea shows current/500 characters. At 400 characters (80%) the border and counter turn amber as a warning.`,
      },
      {
        title: 'Approach the limit',
        text: `At 500 characters the textarea border and counter turn red and the maxlength attribute prevents further input.`,
      },
      {
        title: 'Click the star rating',
        text: `Hover to preview a rating — stars light up in yellow as you move the mouse. Click to commit the selection.`,
      },
      {
        title: 'Submit the form',
        text: `Click Submit to validate (message is required) and show the green success state. The form hides and a confirmation panel appears.`,
      },
      {
        title: 'Clear or reset',
        text: `Click Clear to empty the textarea and reset the counter without hiding the form. Click "Submit another" on the success screen to start over.`,
      },
    ] },
    features: [
      {
        title: 'True auto-resize',
        text: `Resets height to auto before reading scrollHeight — ensures accurate shrink as well as grow, not just a one-way expand.`,
      },
      {
        title: 'Three-threshold counter',
        text: `Muted grey below 80%, amber warning at 80%, red error at 100%. Both textarea border and counter text change colour in sync.`,
      },
      {
        title: 'Connected border design',
        text: `Textarea and counter bar share a border with matching border-radius corners, appearing as a single component. Border colour transitions propagate via sibling selectors.`,
      },
      {
        title: 'Star rating widget',
        text: `Three-listener pattern: mouseenter previews, mouseleave resets, click commits. State is a simple integer — easy to read on submit.`,
      },
      {
        title: 'Success state',
        text: `On valid submit the form hides and a green success panel with icon and copy appears. "Submit another" resets all state.`,
      },
      {
        title: 'Client validation',
        text: `Textarea is required. Submit handler checks .trim() and adds the error class to focus and highlight the empty field.`,
      },
      {
        title: 'Accessible counter',
        text: `aria-live="polite" on the counter and aria-describedby linking hint + counter to the textarea for screen reader compatibility.`,
      },
      {
        title: 'Overflow:hidden on textarea',
        text: `Prevents a scrollbar flash during the height recalculation. Combined with resize:none it removes all default browser resize affordances.`,
      },
    ],
    useCases: [
      {
        title: 'Comment and feedback forms',
        text: `The primary use case — replace any fixed textarea in a comment box. Pair with a [toast notification](/ui-snippets/toast-notification/) to confirm submission.`,
      },
      {
        title: 'Chat and messaging inputs',
        text: `Grow the input as messages get longer, exactly like Slack and iMessage. Combine with a [chat UI](/ui-snippets/chat-ui/) for the full conversation layout.`,
      },
      {
        title: 'Issue and bug report forms',
        text: `Long bug descriptions need room. Pair with a [multi-step form](/ui-snippets/multi-step-form/) for a structured report with title, steps to reproduce, and expected result.`,
      },
      {
        title: 'Email composers',
        text: `Auto-grow the body field in an email compose UI so the layout scales naturally with message length.`,
      },
      {
        title: 'Code snippet inputs',
        text: `Use with a monospace font for multi-line code paste fields. The auto-grow keeps the full snippet visible without an internal scroll.`,
      },
      { icon: 'CODE', title: 'Related: Back in Stock Notify Me Form', desc: 'See the [Back in Stock Notify Me Form](/ui-snippets/back-in-stock-notify-form/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      {
        q: 'Why reset height to "auto" before reading scrollHeight?',
        a: `If you only set height to scrollHeight without resetting first, scrollHeight reflects the previously set explicit height rather than the natural content height. The element would grow on each keystroke but never shrink when content is deleted, because the fixed height always equals or exceeds the content.`,
      },
      {
        q: 'How do I set a maximum height with scroll after that?',
        a: `Add max-height: 300px and overflow-y: auto to the textarea CSS. The auto-resize sets an explicit height up to that maximum, then overflow-y triggers the scrollbar when the content exceeds it.`,
      },
      {
        q: 'How do I make the counter count words instead of characters?',
        a: `Replace textarea.value.length with textarea.value.trim().split(/\\s+/).filter(Boolean).length for word count. Update the max variable to your word limit and adjust the aria-label on the counter span.`,
      },
      {
        q: 'Can I use this inside a modal?',
        a: `Yes — the height calculation works in any container. The only issue is if the modal uses display:none before opening, which means scrollHeight reads as 0. Call resize() after the modal's open animation completes (e.g. in a transitionend handler).`,
      },
      {
        q: 'How do I save draft content automatically?',
        a: `On every input event, after resize() and updateCounter(), call localStorage.setItem("draft", textarea.value). On page load, read it back with const saved = localStorage.getItem("draft"); and set textarea.value = saved || ""; then call resize().`,
      },
      {
        q: 'Can I use this auto-resize textarea in React, Vue, or Angular?',
        a: `Yes. Click the React, Vue, Angular, or Tailwind export above the preview. The resize logic is a single handler — set the height to auto, then to scrollHeight: in React attach it to onChange with a useRef on the textarea; in Vue use @input with a template ref; in Angular use (input) with a ViewChild reference. Because the growth is driven by scrollHeight rather than a fixed row count, the behaviour is identical across every framework — only where you attach the listener changes. Remember to call resize once after mount (useEffect / onMounted / ngAfterViewInit) so a pre-filled value sizes correctly. The Tailwind export converts the field, counter, and focus styling into utility classes.`,
      },
    ],
    aiPrompt: {
      paragraph: `Instead of guessing why the height gets reset before it gets remeasured, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why resize() sets height to auto before reading scrollHeight, and why skipping that step would make the textarea grow but never shrink. The same assistant is useful for optimizing it — ask whether running resize() and updateCounter() on every single input event could cause layout thrashing in a very long form with many auto-resizing fields, and how you'd batch those reads and writes. It's also a good partner for extending the form: ask it to persist the draft to localStorage as the user types, swap the character counter for a word counter, or add a max-height with internal scrolling once the textarea gets too tall. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an auto-growing feedback form in plain HTML, CSS, and JavaScript — no libraries, no ResizeObserver.

Requirements:
- A textarea with resize: none and overflow: hidden in CSS, paired with a JavaScript resize function that first sets the element's height to "auto", then immediately reads its scrollHeight and sets the height to that value in pixels — in that exact order, so the field both grows and shrinks correctly as content is added or removed.
- Call that resize function on every input event, and also once on initial page load so any pre-filled value sizes the field correctly from the start.
- A live character counter that reads the textarea's current length against its maxlength attribute, showing a neutral color under 80 percent of the limit, an amber warning color between 80 and 100 percent, and a red error color at or above 100 percent — with the textarea's own border changing to match the same three states.
- Visually connect the textarea and the counter bar beneath it into one unit: the textarea has rounded top corners and no bottom border, the counter bar has rounded bottom corners and no top border, and use CSS sibling selectors (not JavaScript) so the counter bar's border color updates automatically whenever the textarea gains a warning/error class or receives focus.
- A five-star rating widget built from button elements where hovering previews a rating by lighting stars up to the hovered one, moving the mouse away reverts to the last clicked (committed) rating, and clicking commits a new rating.
- On submit, require the textarea to be non-empty (trimmed), and if valid, hide the form and reveal a success panel with a "submit another" action that fully resets the form, the textarea height, the counter, and the star rating back to their initial state.`,
    },
  },
};
export default autoResizeTextarea;
