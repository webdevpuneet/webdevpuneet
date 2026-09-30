const moodPicker = {
  id: 'mood-picker',
  title: 'Mood Picker',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<form class="mp-card" id="mpForm">
  <h3>How was your experience?</h3>
  <div class="mp-faces" id="mpFaces" role="radiogroup" aria-label="Mood">
    <button type="button" class="mp-face" data-value="1" data-label="Awful" role="radio" aria-checked="false" aria-label="Awful">
      <svg viewBox="0 0 48 48"><circle class="mp-bg" cx="24" cy="24" r="21"/><circle cx="17" cy="20" r="2.4"/><circle cx="31" cy="20" r="2.4"/><path class="mp-mouth" d="M16 33 Q24 26 32 33"/></svg>
    </button>
    <button type="button" class="mp-face" data-value="2" data-label="Bad" role="radio" aria-checked="false" aria-label="Bad">
      <svg viewBox="0 0 48 48"><circle class="mp-bg" cx="24" cy="24" r="21"/><circle cx="17" cy="20" r="2.4"/><circle cx="31" cy="20" r="2.4"/><path class="mp-mouth" d="M16 31 Q24 28 32 31"/></svg>
    </button>
    <button type="button" class="mp-face" data-value="3" data-label="Okay" role="radio" aria-checked="false" aria-label="Okay">
      <svg viewBox="0 0 48 48"><circle class="mp-bg" cx="24" cy="24" r="21"/><circle cx="17" cy="20" r="2.4"/><circle cx="31" cy="20" r="2.4"/><path class="mp-mouth" d="M16 30 L32 30"/></svg>
    </button>
    <button type="button" class="mp-face" data-value="4" data-label="Good" role="radio" aria-checked="false" aria-label="Good">
      <svg viewBox="0 0 48 48"><circle class="mp-bg" cx="24" cy="24" r="21"/><circle cx="17" cy="20" r="2.4"/><circle cx="31" cy="20" r="2.4"/><path class="mp-mouth" d="M16 29 Q24 35 32 29"/></svg>
    </button>
    <button type="button" class="mp-face" data-value="5" data-label="Great" role="radio" aria-checked="false" aria-label="Great">
      <svg viewBox="0 0 48 48"><circle class="mp-bg" cx="24" cy="24" r="21"/><circle cx="17" cy="20" r="2.4"/><circle cx="31" cy="20" r="2.4"/><path class="mp-mouth" d="M15 27 Q24 38 33 27"/></svg>
    </button>
  </div>
  <p class="mp-label" id="mpLabel">Pick the face that fits</p>
  <button class="mp-submit" type="submit" id="mpSubmit" disabled>Send feedback</button>
</form>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;display:flex;justify-content:center;padding:40px 20px}

.mp-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:26px;width:100%;max-width:380px;text-align:center;box-shadow:0 12px 32px -20px rgba(0,0,0,.3)}
.mp-card h3{font-size:16px;font-weight:800;color:#0f172a;margin-bottom:18px}

.mp-faces{display:flex;justify-content:space-between;gap:6px}
.mp-face{background:none;border:none;cursor:pointer;padding:2px;border-radius:50%;width:54px;height:54px;transition:transform .15s}
.mp-face svg{width:100%;height:100%;display:block}
.mp-face .mp-bg{fill:#e2e8f0;transition:fill .15s}
.mp-face svg circle:not(.mp-bg){fill:#64748b}
.mp-face .mp-mouth{fill:none;stroke:#64748b;stroke-width:2.4;stroke-linecap:round;transition:stroke .15s}
.mp-face:hover{transform:translateY(-3px) scale(1.06)}
.mp-face.mp-on{transform:translateY(-3px) scale(1.12)}
.mp-face.mp-on .mp-bg{fill:#fde68a}
.mp-face.mp-on svg circle:not(.mp-bg),.mp-face.mp-on .mp-mouth{fill:#92400e;stroke:#92400e}
.mp-face:focus-visible{outline:2px solid #6366f1;outline-offset:2px}

.mp-label{margin:16px 0 18px;font-size:14px;font-weight:700;color:#475569;min-height:20px}
.mp-submit{width:100%;background:#0f172a;color:#fff;border:none;border-radius:10px;padding:11px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:inherit;transition:opacity .15s}
.mp-submit:disabled{opacity:.4;cursor:not-allowed}
.mp-submit:not(:disabled):hover{opacity:.9}`,

  js: `var faces = Array.prototype.slice.call(document.querySelectorAll('.mp-face'));
var label = document.getElementById('mpLabel');
var submit = document.getElementById('mpSubmit');
var current = 0;

function paint(value) {
  faces.forEach(function (f) {
    var v = parseInt(f.getAttribute('data-value'), 10);
    f.classList.toggle('mp-on', v === value);
    f.setAttribute('aria-checked', String(v === current));
  });
}

function preview(face) { paint(parseInt(face.getAttribute('data-value'), 10)); label.textContent = face.getAttribute('data-label'); }
function commit(face) {
  current = parseInt(face.getAttribute('data-value'), 10);
  submit.disabled = false;
  paint(current);
  label.textContent = face.getAttribute('data-label');
}

faces.forEach(function (face, i) {
  face.addEventListener('mouseenter', function () { preview(face); });
  face.addEventListener('focus', function () { preview(face); });
  face.addEventListener('click', function () { commit(face); });
  face.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { e.preventDefault(); var n = faces[Math.min(i + 1, faces.length - 1)]; n.focus(); commit(n); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); var p = faces[Math.max(i - 1, 0)]; p.focus(); commit(p); }
  });
});

document.getElementById('mpFaces').addEventListener('mouseleave', function () {
  if (current) { paint(current); label.textContent = faces[current - 1].getAttribute('data-label'); }
  else { paint(0); label.textContent = 'Pick the face that fits'; }
});

document.getElementById('mpForm').addEventListener('submit', function (e) {
  e.preventDefault();
  label.textContent = 'Thanks for the feedback!';
});`,

  seo: {
    title: 'Mood Picker — Emoji Face Satisfaction Selector',
    description: `An accessible mood picker with SVG smiley faces — hover preview, click-to-set and keyboard support. Exports to React, Vue, Angular & Tailwind.`,
    about: {
      title: 'Mood Picker — SVG Smiley-Face Satisfaction Rating with Hover Preview',
      description: `A mood picker asks "how was it?" with a row of faces from frowning to grinning — a friendlier, more immediate rating than stars for satisfaction surveys, support closeouts, and check-ins. This snippet builds one with crisp inline-SVG faces, a hover preview, click-to-commit, and keyboard support, in plain HTML, CSS, and vanilla JavaScript with no emoji fonts or images.

**Faces drawn in SVG, not emoji**

Each face is an inline \`<svg>\` with two eyes and a single \`<path>\` mouth. The mouth's curve encodes the mood: a downward \`Q\` quadratic curve for sad, a flat \`L\` line for neutral, and an upward curve for happy. Drawing them in SVG instead of using emoji characters means they render identically on every OS (no "emoji looks different on Windows vs Mac" problem), scale crisply at any size, and recolour with CSS — the selected face turns warm amber via a class, with no extra assets.

**Preview vs commit**

Like a good rating control, hovering or focusing a face previews that mood — lifting it, colouring it, and showing its label ("Okay", "Great") — without changing the saved value. Clicking commits: it stores the score, enables the submit button, and becomes the state the row returns to when the pointer leaves. This separation lets users scan the options without accidentally locking in a choice.

**Accessible by construction**

The row is a \`role="radiogroup"\` and each face is a \`<button role="radio">\` with an \`aria-label\` ("Good") and \`aria-checked\` tracking the committed value. Arrow keys move between faces and set the mood, matching the radio-group keyboard model, and a focus ring keeps keyboard users oriented. Screen-reader users hear a clear label for each option rather than an ambiguous picture.

**Form-ready feedback loop**

The submit button stays disabled until a face is chosen, preventing empty responses, and the label doubles as live confirmation ("Thanks for the feedback!"). The committed value is a number 1–5 you can post to your backend or map to an NPS-style bucket. Because the logic is tiny and the faces are pure markup, you can add a comment box, change the count to three faces, or swap the palette in minutes.

**Tactile motion**

Faces lift and scale on hover with a short transition, giving the control a playful, responsive feel that suits the friendly tone of a mood survey. Everything is a few dozen lines of CSS — a clean, dependency-free reference for emoji-style satisfaction pickers.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A row of five SVG faces renders with a disabled submit button.` },
      { title: 'Hover a face', text: `It lifts and the label shows its mood, without committing.` },
      { title: 'Click to choose', text: `Clicking sets the mood, enables submit, and highlights the face.` },
      { title: 'Use the keyboard', text: `Tab to the row and use Left/Right arrows to move and select.` },
      { title: 'Read the value', text: `The committed value is 1–5 (data-value); post or map it as you like.` },
      { title: 'Customise', text: `Change to three faces, recolour, or add a comment field.` },
    ] },
    features: [
      { title: 'SVG faces', text: `Crisp, consistent smileys drawn in SVG — no emoji-font differences.` },
      { title: 'Mood-encoded mouths', text: `The mouth path curves from frown to grin per face.` },
      { title: 'Hover preview', text: `Previewing a mood does not change the saved value.` },
      { title: 'Click to commit', text: `Clicking stores the score and enables submit.` },
      { title: 'Keyboard accessible', text: `Arrow keys move and set the mood in a radio-group model.` },
      { title: 'ARIA roles', text: `radiogroup + radio with aria-checked and per-face labels.` },
      { title: 'Submit gating', text: `The button stays disabled until a face is chosen.` },
      { title: 'No library', text: `Pure HTML/CSS/JS/SVG — no emoji assets or rating widget.` },
    ],
    useCases: [
      { title: 'Satisfaction surveys', text: `Capture a quick mood before a comment box or [review form](/ui-snippets/review-form/).` },
      { title: 'Support ticket closeout', text: `Rate a resolved issue in a [comment thread](/ui-snippets/comment-thread/).` },
      { title: 'Post-session check-ins', text: `Ask how a call or lesson went with a friendly face row.` },
      { title: 'Feedback widgets', text: `Drop into a [feedback tab widget](/ui-snippets/feedback-tab-widget/) for one-tap sentiment.` },
      { title: 'Daily mood journaling', text: `Log a daily mood next to a [streak tracker](/ui-snippets/streak-tracker/).` },
      { title: 'Learning SVG + ARIA', text: `A reference for SVG faces and radio-group accessibility.` },
      { icon: 'CODE', title: 'Related: Shortcut Recorder', desc: 'See the [Shortcut Recorder](/ui-snippets/shortcut-recorder/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why draw faces in SVG instead of using emoji?', a: `Emoji render differently on every platform — the same character looks distinct on Windows, macOS, Android, and iOS, so your survey loses visual consistency. Inline SVG faces look identical everywhere, scale crisply to any size, and recolour with CSS (the selected face turns amber), all without bundling image files. You also get full control over the exact expression via the mouth path.` },
      { q: 'How is the mood value stored?', a: `Each face has a data-value from 1 (awful) to 5 (great), and the committed choice is held in a current variable. Read it on submit to post a number to your backend, or map it to buckets — for example treat 4 and 5 as promoters. The control also exposes a readable label per face for confirmations.` },
      { q: 'Is it accessible?', a: `Yes. The row is a radiogroup, each face is a button with role="radio", an aria-label, and aria-checked, and arrow keys move and set the mood like a native radio group. A focus-visible ring shows the active face, and screen readers announce a clear word ("Good") instead of an image, so it is usable without sight or a mouse.` },
      { q: 'Can I use three faces instead of five?', a: `Yes — remove two of the button blocks and keep data-value sequential (1, 2, 3). The script reads whatever faces are present and the arrow-key navigation adapts automatically, so no JavaScript changes are needed. Three faces (sad/neutral/happy) is common for lightweight one-tap sentiment.` },
      { q: 'How do I use this mood picker in React, Vue, or Angular?', a: `Keep the SVG markup and move the state into your component: track committed and hovered values, render the highlight class from them, and bind mouseenter/focus/click/keydown handlers. Replace the submit gating with a disabled prop driven by state, and post the numeric value in your submit handler. Tailwind users swap the classes for utilities and toggle the amber fill with a conditional class.` },
    ],
    aiPrompt: {
      paragraph: `Rather than tracing the preview-versus-commit split by hand, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how the paint() function's aria-checked logic stays correct even while a different face is being hovered for preview, and why the mouth is a single quadratic path per face instead of five separate curve elements. The same assistant can help optimize it, for instance checking whether the mouseleave handler on mp-faces correctly restores the committed face in every edge case, or whether the arrow-key navigation should wrap around at the ends of the row instead of clamping. It's also handy for extending the picker: ask it to add a follow-up comment textarea that only appears after a mood is committed, animate the mouth path morphing between moods instead of swapping discrete SVGs, or persist the last choice so a returning user sees their prior rating pre-selected. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an accessible "mood picker" satisfaction control in plain HTML, CSS, and JavaScript using only inline SVG faces — no emoji characters, no icon library.

Requirements:
- A row of five buttons, each containing an inline SVG face: two circular eyes and a single path element for the mouth, where the mouth's curve direction encodes the mood (a downward quadratic curve for the saddest face, a flat line for neutral, an upward quadratic curve for the happiest, with the middle two faces interpolating between those extremes).
- The row must have role="radiogroup" and each button must have role="radio", a distinct aria-label describing its mood in words (not just a number), and an aria-checked attribute reflecting only the currently committed choice, not whatever is being hovered.
- Hovering or keyboard-focusing a face must visually preview that mood (lift/scale it, recolor it, update a status line with its label) without changing the committed value; moving the mouse away (or blurring, for keyboard) must revert the preview back to whatever was last actually committed, or to a neutral prompt if nothing has been committed yet.
- Clicking a face (or pressing Enter/Space on a focused one) must commit that value, update aria-checked across all the faces, and enable a submit button that starts disabled.
- Left and right arrow keys, while a face is focused, must move focus to the adjacent face and commit that face's mood immediately, matching the standard radio-group keyboard interaction pattern.
- On submit, prevent the default form submission and show an inline confirmation message instead of navigating away.`,
    },
  },
};

export default moodPicker;
