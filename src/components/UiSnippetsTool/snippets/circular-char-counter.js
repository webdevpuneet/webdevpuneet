const circularCharCounter = {
  id: 'circular-char-counter',
  title: 'Circular Char Counter',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="cc-card">
  <label class="cc-label" for="ccText">What's happening?</label>
  <textarea id="ccText" class="cc-text" placeholder="Share an update…" rows="4" maxlength="320"></textarea>
  <div class="cc-foot">
    <div class="cc-ring" id="ccRing">
      <svg viewBox="0 0 36 36" aria-hidden="true">
        <circle class="cc-track" cx="18" cy="18" r="15.9"/>
        <circle class="cc-fill" id="ccFill" cx="18" cy="18" r="15.9"/>
      </svg>
      <span class="cc-num" id="ccNum"></span>
    </div>
    <button class="cc-send" id="ccSend" type="button" disabled>Post</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;display:flex;justify-content:center;padding:40px 18px}

.cc-card{background:#fff;border:1px solid #e2e8f0;border-radius:16px;padding:18px;width:100%;max-width:380px;box-shadow:0 12px 32px -22px rgba(0,0,0,.3)}
.cc-label{display:block;font-size:13px;font-weight:700;color:#0f172a;margin-bottom:8px}
.cc-text{width:100%;border:1px solid #e2e8f0;border-radius:12px;padding:12px;font-size:15px;font-family:inherit;resize:vertical;outline:none;line-height:1.5;color:#0f172a}
.cc-text:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.15)}

.cc-foot{display:flex;align-items:center;justify-content:flex-end;gap:14px;margin-top:12px}
.cc-ring{position:relative;width:34px;height:34px}
.cc-ring svg{width:34px;height:34px;transform:rotate(-90deg)}
.cc-track{fill:none;stroke:#e2e8f0;stroke-width:3}
.cc-fill{fill:none;stroke:#3b82f6;stroke-width:3;stroke-linecap:round;stroke-dasharray:100 100;stroke-dashoffset:100;transition:stroke-dashoffset .25s ease,stroke .25s}
.cc-ring.warn .cc-fill{stroke:#f59e0b}
.cc-ring.over .cc-fill{stroke:#ef4444}
.cc-num{position:absolute;inset:0;display:none;align-items:center;justify-content:center;font-size:10px;font-weight:800;color:#64748b}
.cc-ring.show-num .cc-num{display:flex}
.cc-ring.over .cc-num{color:#ef4444}

.cc-send{background:#0f172a;color:#fff;border:none;border-radius:999px;padding:9px 22px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .15s}
.cc-send:disabled{opacity:.4;cursor:not-allowed}
.cc-send:not(:disabled):hover{opacity:.9}`,

  js: `var text = document.getElementById('ccText');
var fill = document.getElementById('ccFill');
var ring = document.getElementById('ccRing');
var num = document.getElementById('ccNum');
var send = document.getElementById('ccSend');
var MAX = 280;            // soft limit (warn past this)
var CIRC = 100;           // dasharray length

// Allow typing past the limit so users do not lose text; just block posting.
text.removeAttribute('maxlength');
text.setAttribute('maxlength', '320');

function update() {
  var len = text.value.length;
  var remaining = MAX - len;
  var pct = Math.min(len / MAX, 1);
  fill.style.strokeDashoffset = String(CIRC - pct * CIRC);

  var warn = remaining <= 20 && remaining >= 0;
  var over = remaining < 0;
  ring.classList.toggle('warn', warn && !over);
  ring.classList.toggle('over', over);
  // Show the number only when close to or over the limit.
  ring.classList.toggle('show-num', remaining <= 20);
  num.textContent = remaining;

  send.disabled = len === 0 || over;
}

text.addEventListener('input', update);
send.addEventListener('click', function () { if (!send.disabled) { text.value = ''; update(); } });
update();`,

  seo: {
    title: 'Circular Char Counter — Ring Character Counter Textarea',
    description: `A circular character counter: a progress ring that fills as you type, warns near the limit, and shows remaining. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Circular Char Counter — Progress-Ring Character Count with Soft Limit',
      description: `A circular character counter shows how much of a length limit a user has used as a filling progress ring, turning amber as they near the limit and red when they pass it — the compact pattern popularised by Twitter/X. This snippet builds it on a textarea with an SVG ring, a soft limit, and submit gating, in plain HTML, CSS, and vanilla JavaScript.

**An SVG ring driven by stroke-dashoffset**

The ring is two overlapping SVG circles: a grey track and a coloured fill. The fill's \`stroke-dasharray\` is set to its circumference and its \`stroke-dashoffset\` is animated from full (empty) to zero (complete) as the text grows — the same technique behind every circular progress indicator. The SVG is rotated −90° so the ring starts filling from the top, and a CSS transition makes each keystroke's change smooth.

**A soft limit that doesn't lose text**

Rather than a hard \`maxlength\` that silently swallows keystrokes at the limit, this counter uses a **soft limit**: you can keep typing past it (up to a generous hard cap), the ring goes red, the remaining count goes negative, and the Post button disables. This is friendlier — users can paste a slightly-too-long draft and trim it down rather than having characters vanish as they type.

**Progressive disclosure of the number**

When you're well under the limit the ring shows no number — just a calm progress fill. Only when you get within 20 characters does the exact remaining count appear inside the ring, and it turns red once negative. Showing the number only when it matters keeps the UI quiet during normal typing and draws attention exactly when the user needs it.

**Submit gating**

The Post button is disabled when the field is empty or over the limit, so the counter does double duty as a validity indicator. Because the gating is derived from the same \`remaining\` value that colours the ring, the visual state and the button state can never disagree.

**Accessible and portable**

The textarea keeps a hard \`maxlength\` as a final safety net and a real label, and the ring is marked \`aria-hidden\` since the meaningful state (button enabled/disabled, the textarea itself) is conveyed without it. The whole counter is a single \`update()\` function with no dependencies — a clean reference for the ring-counter pattern you'll want on any composer or bio field.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A textarea renders with a circular counter and a Post button.` },
      { title: 'Type a message', text: `The ring fills as you type toward the limit.` },
      { title: 'Approach the limit', text: `Within 20 characters the remaining count appears and the ring turns amber.` },
      { title: 'Go over', text: `The ring and count turn red and Post disables, but your text stays.` },
      { title: 'Set your limit', text: `Change the MAX constant to your character budget.` },
      { title: 'Wire Post', text: `Replace the click handler with your real submit.` },
    ] },
    features: [
      { title: 'SVG progress ring', text: `stroke-dashoffset fills the ring as the text grows.` },
      { title: 'Soft limit', text: `Type past the limit without losing characters; posting is blocked.` },
      { title: 'Color thresholds', text: `Blue normally, amber near the limit, red when over.` },
      { title: 'Progressive count', text: `The number appears only within 20 characters of the limit.` },
      { title: 'Submit gating', text: `Post disables when empty or over the limit.` },
      { title: 'Smooth transitions', text: `Each keystroke animates the ring and color.` },
      { title: 'Accessible label', text: `A real label and a safety-net maxlength on the textarea.` },
      { title: 'No library', text: `Pure HTML/CSS/JS/SVG — no counter dependency.` },
    ],
    useCases: [
      { title: 'Social composers', text: `Limit a post box like an [ai chat interface](/ui-snippets/ai-chat-interface/) prompt.` },
      { title: 'Bio and profile fields', text: `Cap a bio in a [settings panel](/ui-snippets/settings-panel/).` },
      { title: 'Comment boxes', text: `Show remaining length in a [comment thread](/ui-snippets/comment-thread/).` },
      { title: 'SMS and notification text', text: `Keep messages within a strict character budget.` },
      { title: 'Review and feedback forms', text: `Pair with a [review form](/ui-snippets/review-form/) for concise input.` },
      { title: 'Learning SVG progress', text: `A reference for ring fills via stroke-dashoffset.` },
      { icon: 'CODE', title: 'Related: Conditional Branching Form Fields — Show Only What Applies', desc: 'See the [Conditional Branching Form Fields — Show Only What Applies](/ui-snippets/conditional-branching-form-fields/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How does the ring fill as I type?', a: `The colored circle has its stroke-dasharray set to the full circumference, and its stroke-dashoffset is moved from the full length (empty ring) toward zero (full ring) in proportion to characters used. The SVG is rotated −90° so it fills from the top, and a CSS transition on stroke-dashoffset smooths each keystroke.` },
      { q: 'Why a soft limit instead of a hard maxlength?', a: `A hard maxlength silently stops accepting input at the cap, which is frustrating when you paste a slightly long draft — characters just vanish. A soft limit lets you go over (the ring turns red and Post disables) so you can see the overage and trim it down. A high hard maxlength still acts as a final safety net against pathological input.` },
      { q: 'Why does the number only appear near the limit?', a: `Showing a live count during normal typing is visual noise — most of the time the user is nowhere near the limit. Revealing the exact remaining number only within the last 20 characters keeps the interface calm and draws attention precisely when it becomes useful, which is the behaviour the Twitter/X composer popularised.` },
      { q: 'How do I change the character limit?', a: `Edit the MAX constant — it drives the ring fill percentage, the warning threshold, the remaining count, and the submit gating, so everything stays consistent. You can also adjust the "within 20" warning window by changing the comparison in the update function.` },
      { q: 'How do I use this counter in React, Vue, or Angular?', a: `Bind the textarea value to state and compute remaining, the ring offset, and the color class as derived values on each change. Render the SVG with the computed stroke-dashoffset and toggle the warn/over classes from state. Gate the submit button on the same derived values. Tailwind users swap the classes for utilities; the ring math is unchanged.` },
    ],
    aiPrompt: {
      paragraph: `Rather than assuming stroke-dashoffset is just a magic property, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the −90 degree SVG rotation combined with the dasharray/dashoffset pair makes the ring appear to fill clockwise from the top, and why the textarea keeps a hard maxlength of 320 as a safety net even though the soft limit of 280 is what actually drives the visual warnings. The same assistant can help you refine it — ask whether the "show the number only within 20 characters of the limit" threshold should itself be a named constant tied to MAX rather than a hardcoded 20, so changing MAX doesn't leave the warning window feeling mismatched. It's also useful for extending the counter: ask it to support multiple independent counters on one page without id collisions, add a gentle shake animation when the user tries to submit while over the limit, or swap the ring for a horizontal bar variant that shares the same update() logic. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a "circular character counter" for a textarea in plain HTML, CSS, and JavaScript using inline SVG — no charting library.

Requirements:
- An SVG ring made of two overlapping circles sharing the same center and radius: a static gray track circle and a colored fill circle, with the fill circle's stroke-dasharray set to match its own circumference and its stroke-dashoffset driving how much of the ring is visibly filled.
- Rotate the SVG by -90 degrees so the ring visually starts filling from the top rather than the 3 o'clock position, and animate stroke-dashoffset changes with a CSS transition so each keystroke's ring update is smooth rather than an instant jump.
- Implement a soft limit distinct from the textarea's hard maxlength attribute: users must be able to keep typing past the soft limit (so no characters are silently dropped), with the ring's fill amount and color reflecting a percentage of that soft limit, not the hard maxlength.
- The ring's stroke color must shift through three states based on how many characters remain before the soft limit: a neutral/brand color normally, a warning color once remaining characters drop to a small threshold (e.g. 20 or fewer) while still non-negative, and an error color once the remaining count goes negative.
- Only display the exact remaining-character number inside the ring once the user is within that same small threshold of the limit — during normal typing well under the limit, show no number at all, just the filling ring.
- A submit/post button must be disabled whenever the textarea is empty or the soft limit has been exceeded, deriving its disabled state from the exact same remaining-character calculation that colors the ring, so the button state and the ring's visual state can never contradict each other.`,
    },
  },
};

export default circularCharCounter;
