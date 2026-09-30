const modalRatingFeedbackStarComment = {
  id: 'modal-rating-feedback-star-comment',
  title: 'Feedback Modal with Star Rating and Comment',
  lastmod: '2026-08-30',
  category: 'modals',
  cdnUrls: [],
  html: `<div class="rfm-page"><button type="button" class="rfm-open" id="rfmOpen">Rate your experience</button></div>

<div class="rfm-backdrop" id="rfmBackdrop"></div>
<div class="rfm-modal" id="rfmModal" role="dialog" aria-modal="true" aria-labelledby="rfmTitle">
  <button type="button" class="rfm-close" id="rfmClose" aria-label="Close">✕</button>

  <div class="rfm-body" id="rfmBody">
    <h3 id="rfmTitle">How was your experience?</h3>
    <p class="rfm-sub">Your feedback helps us improve. This takes less than a minute.</p>

    <div class="rfm-stars" id="rfmStars" role="radiogroup" aria-label="Star rating">
      <button type="button" class="rfm-star" data-value="1" role="radio" aria-checked="false" aria-label="1 star">★</button>
      <button type="button" class="rfm-star" data-value="2" role="radio" aria-checked="false" aria-label="2 stars">★</button>
      <button type="button" class="rfm-star" data-value="3" role="radio" aria-checked="false" aria-label="3 stars">★</button>
      <button type="button" class="rfm-star" data-value="4" role="radio" aria-checked="false" aria-label="4 stars">★</button>
      <button type="button" class="rfm-star" data-value="5" role="radio" aria-checked="false" aria-label="5 stars">★</button>
    </div>
    <p class="rfm-rating-label" id="rfmRatingLabel">&nbsp;</p>

    <label class="rfm-comment-label" for="rfmComment">Tell us more <span>(optional)</span></label>
    <textarea id="rfmComment" class="rfm-comment" rows="3" maxlength="280" placeholder="What worked well? What could be better?"></textarea>
    <span class="rfm-counter" id="rfmCounter">280 left</span>

    <button type="button" class="rfm-submit" id="rfmSubmit" disabled>Submit feedback</button>
  </div>

  <div class="rfm-thanks" id="rfmThanks" hidden>
    <div class="rfm-check">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
    </div>
    <h3>Thanks for the feedback!</h3>
    <p id="rfmThanksSub">We appreciate you taking the time.</p>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh}
.rfm-page{min-height:100vh;display:flex;align-items:center;justify-content:center}
.rfm-open{background:#6366f1;color:#fff;border:none;border-radius:11px;padding:12px 24px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}

.rfm-backdrop{position:fixed;inset:0;background:rgba(15,23,42,.5);opacity:0;pointer-events:none;transition:opacity .2s;z-index:90}
.rfm-backdrop.show{opacity:1;pointer-events:all}

.rfm-modal{position:fixed;left:50%;top:50%;transform:translate(-50%,-46%) scale(.97);opacity:0;pointer-events:none;
  width:min(380px,90vw);background:#fff;border-radius:18px;padding:28px 26px;z-index:91;
  transition:opacity .22s,transform .22s;box-shadow:0 30px 70px rgba(0,0,0,.3)}
.rfm-modal.show{opacity:1;transform:translate(-50%,-50%) scale(1);pointer-events:all}
.rfm-close{position:absolute;top:14px;right:14px;width:28px;height:28px;border-radius:50%;border:none;background:#f1f5f9;color:#64748b;cursor:pointer;font-size:13px}

.rfm-body h3{font-size:17px;font-weight:800;color:#0f172a;margin-bottom:6px;padding-right:20px}
.rfm-sub{font-size:12.5px;color:#64748b;line-height:1.5;margin-bottom:20px}

.rfm-stars{display:flex;gap:6px;margin-bottom:6px}
.rfm-star{background:none;border:none;font-size:32px;line-height:1;color:#e2e8f0;cursor:pointer;padding:0;transition:transform .1s,color .12s}
.rfm-star:hover{transform:scale(1.12)}
.rfm-star.rfm-filled{color:#f59e0b}
.rfm-rating-label{font-size:12px;font-weight:700;color:#f59e0b;min-height:16px;margin-bottom:16px}

.rfm-comment-label{display:block;font-size:12.5px;font-weight:700;color:#334155;margin-bottom:8px}
.rfm-comment-label span{font-weight:500;color:#94a3b8}
.rfm-comment{width:100%;border:1.5px solid #e2e8f0;border-radius:10px;padding:10px 12px;font-size:13.5px;font-family:inherit;resize:vertical;outline:none;transition:border-color .15s}
.rfm-comment:focus{border-color:#6366f1}
.rfm-counter{display:block;text-align:right;font-size:11px;color:#94a3b8;margin:5px 0 18px}

.rfm-submit{width:100%;background:#6366f1;color:#fff;border:none;border-radius:10px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.rfm-submit:disabled{background:#c7cdf7;cursor:not-allowed}
.rfm-submit:not(:disabled):hover{background:#4f46e5}

.rfm-thanks{text-align:center;padding:12px 4px 6px}
.rfm-check{width:52px;height:52px;border-radius:50%;background:#dcfce7;color:#16a34a;display:flex;align-items:center;justify-content:center;margin:0 auto 16px}
.rfm-thanks h3{font-size:16.5px;font-weight:800;color:#0f172a;margin-bottom:6px}
.rfm-thanks p{font-size:13px;color:#64748b}`,

  js: `// A five-state star rating built entirely from hover/click on plain <button>
// elements (no radio inputs), plus a comment field whose character counter and
// submit-enable state stay derived from the actual textarea value at all times.
var openBtn = document.getElementById('rfmOpen');
var backdrop = document.getElementById('rfmBackdrop');
var modal = document.getElementById('rfmModal');
var closeBtn = document.getElementById('rfmClose');
var stars = document.querySelectorAll('.rfm-star');
var ratingLabel = document.getElementById('rfmRatingLabel');
var comment = document.getElementById('rfmComment');
var counter = document.getElementById('rfmCounter');
var submitBtn = document.getElementById('rfmSubmit');
var body = document.getElementById('rfmBody');
var thanks = document.getElementById('rfmThanks');
var thanksSub = document.getElementById('rfmThanksSub');

var MAX_LEN = 280;
var labels = { 1: 'Poor', 2: 'Fair', 3: 'Good', 4: 'Great', 5: 'Excellent' };
var currentRating = 0;

function openModal() {
  backdrop.classList.add('show');
  modal.classList.add('show');
}
function closeModal() {
  backdrop.classList.remove('show');
  modal.classList.remove('show');
}
openBtn.addEventListener('click', openModal);
closeBtn.addEventListener('click', closeModal);
backdrop.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && modal.classList.contains('show')) closeModal();
});

// Renders stars for a given value — used both for the committed rating (on click)
// and for a live hover preview (on mouseenter), then restored on mouseleave.
function paintStars(value) {
  stars.forEach(function (star) {
    var starValue = parseInt(star.dataset.value, 10);
    star.classList.toggle('rfm-filled', starValue <= value);
  });
}

stars.forEach(function (star) {
  var value = parseInt(star.dataset.value, 10);

  star.addEventListener('mouseenter', function () { paintStars(value); });
  star.addEventListener('mouseleave', function () { paintStars(currentRating); });

  star.addEventListener('click', function () {
    currentRating = value;
    paintStars(currentRating);
    stars.forEach(function (s) {
      s.setAttribute('aria-checked', String(parseInt(s.dataset.value, 10) === currentRating));
    });
    ratingLabel.textContent = labels[currentRating];
    updateSubmitState();
  });
});

function updateSubmitState() {
  submitBtn.disabled = currentRating === 0;
}

comment.addEventListener('input', function () {
  var remaining = MAX_LEN - comment.value.length;
  counter.textContent = remaining + ' left';
  counter.style.color = remaining <= 20 ? '#ef4444' : '';
});

submitBtn.addEventListener('click', function () {
  if (submitBtn.disabled) return;

  thanksSub.textContent = currentRating >= 4
    ? 'Glad to hear it — we\\'ll keep it up.'
    : 'We hear you — this goes straight to the product team.';

  body.hidden = true;
  thanks.hidden = false;

  setTimeout(function () {
    closeModal();
    setTimeout(function () {
      // Reset for next time the modal opens, after the close transition finishes.
      body.hidden = false;
      thanks.hidden = true;
      currentRating = 0;
      paintStars(0);
      stars.forEach(function (s) { s.setAttribute('aria-checked', 'false'); });
      ratingLabel.textContent = '\\u00a0';
      comment.value = '';
      counter.textContent = MAX_LEN + ' left';
      counter.style.color = '';
      updateSubmitState();
    }, 250);
  }, 1600);
});`,

  seo: {
    title: 'Feedback Modal with Star Rating and Comment — Free HTML CSS JS Snippet',
    description: 'A feedback dialog combining a five-star rating picker with an optional comment field and character counter, ending in a rating-aware thank-you state. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Star Rating Feedback Modal — Hover Preview, Optional Comment, Rating-Aware Confirmation',
      description: `A feedback prompt that's just a comment box gets low response rates — typing takes effort. This modal leads with the lowest-effort input possible (tapping a star) and treats the comment field as genuinely optional, so a visitor can leave useful signal in one click while still being invited to add more.

**Stars as buttons, not radio inputs**

Each star is a real \`<button>\` with \`role="radio"\` inside a \`role="radiogroup"\` container — a semantic five-option single-choice control, but built without native \`<input type="radio">\` elements so the star glyphs themselves can be styled and animated directly rather than styled via a hidden-input-plus-label workaround.

**Hover preview vs. committed rating are two different states**

\`paintStars(value)\` is called both from \`mouseenter\` (to preview what clicking would select) and from \`mouseleave\` (to restore whatever the actual \`currentRating\` currently is). This is why hovering star 4 lights up four stars temporarily, but moving the mouse away without clicking reverts back to whatever was last actually chosen — the hover state never overwrites \`currentRating\` itself, only the visual paint.

**Comment is genuinely optional — the label says so and the logic enforces it**

\`updateSubmitState()\` only checks \`currentRating === 0\` — the comment textarea's content plays no role in whether Submit is enabled. The label text itself says "(optional)" and the code backs that claim up, rather than silently requiring text anyway (a common trust-eroding pattern in feedback forms that claim optionality but don't enforce it).

**A character counter that's just arithmetic on the real value**

\`MAX_LEN - comment.value.length\` recalculates on every \`input\` event — there's no separate tracked character count that could drift from the textarea's actual content, and the counter turns red only in the last 20 characters as a genuine "running low" warning rather than being red by default.

**The thank-you message reads the rating, not just a generic "thanks"**

Before revealing \`#rfmThanks\`, the submit handler checks \`currentRating >= 4\` and picks between an appreciative message and a more empathetic "this goes straight to the product team" message for lower ratings — a small but meaningful difference from a single static thank-you that would read as tone-deaf after a 1-star rating.

**Full reset happens after the transition, not before**

After showing the thank-you state for 1.6 seconds, the modal closes, and only *then* — after another 250ms matching the CSS close transition — does the code reset the rating, comment, and counter back to their initial state. Resetting immediately on close would risk the visitor briefly seeing the form flash back to empty while the modal is still visually closing.

**Customizing it**

Swap the five hardcoded \`labels\` (Poor through Excellent) for wording that matches your product's tone, adjust \`MAX_LEN\` for a longer or shorter comment allowance, or wire the \`submitBtn\` click handler's current \`setTimeout\`-based demo flow to a real \`fetch()\` call that posts \`{ rating: currentRating, comment: comment.value }\` to your feedback endpoint.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Open the modal', text: 'Click "Rate your experience" to open the feedback dialog.' },
        { title: 'Hover over the stars', text: 'A live preview lights up stars under your cursor before you click.' },
        { title: 'Click a star to commit your rating', text: 'The Submit button enables only once a rating is chosen — the comment stays optional.' },
        { title: 'Optionally add a comment', text: 'The character counter updates live and turns red in the final 20 characters.' },
        { title: 'Submit and see the thank-you state', text: 'The message adapts based on whether the rating was 4-5 stars or lower.' },
        { title: 'Wire up a real endpoint', text: 'Replace the submit handler\'s setTimeout demo flow with a fetch() call posting the rating and comment.' },
      ],
    },
    features: [
      'Five-star rating built from role="radio" buttons inside a role="radiogroup"',
      'Separate hover-preview state and committed-rating state that never overwrite each other',
      'Comment field is genuinely optional — Submit only requires a star rating, not text',
      'Live character counter computed directly from textarea.value.length, no drift possible',
      'Counter turns red only in the final 20 characters as a real running-low warning',
      'Thank-you message text adapts based on whether the rating was 4-5 stars or lower',
      'Full form reset deferred until after the close transition finishes, avoiding a visible flash',
      'Escape key, backdrop click, and a close button all dismiss the modal',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
    ],
    useCases: [
      { icon: 'APP', title: 'Post-purchase and post-support feedback', desc: 'Prompt for a quick rating right after a checkout or support interaction while the experience is fresh.' },
      { icon: 'FLOW', title: 'In-app NPS and satisfaction surveys', desc: 'Pair with an [NPS survey](/ui-snippets/nps-survey/) widget for a broader satisfaction-tracking program.' },
      { icon: 'FORM', title: 'Feature and beta feedback collection', desc: 'Trigger this modal after a visitor tries a new feature to capture reaction while it\'s top of mind.' },
      { icon: 'LEARN', title: 'Learn hover-vs-committed UI state', desc: 'Study how paintStars() serves two different callers (hover preview and click commit) without either overwriting the other\'s intent.' },
      { icon: 'DESIGN', title: 'App store and marketplace review prompts', desc: 'Reuse the star-plus-optional-comment pattern before deep-linking a high rating out to a public review page.' },
      { icon: 'CODE', title: 'Related: Helpful Feedback Widget', desc: 'Pair with the [Helpful Feedback Widget](/ui-snippets/helpful-feedback-widget/) for a lighter-weight, inline alternative to this modal.' },
    ],
    faqs: [
      { q: 'Why are the stars buttons instead of radio inputs?', a: 'Each star is a real <button> with role="radio" inside a role="radiogroup" wrapper, giving the same semantic single-choice meaning as native radio inputs while allowing the star glyph itself to be styled and scaled directly on hover and click, without the usual hidden-input-plus-styled-label workaround radio buttons typically need for custom styling.' },
      { q: 'How does hovering preview a rating without changing what\'s actually selected?', a: 'paintStars(value) only updates which stars visually appear filled — it never touches the currentRating variable. Hovering calls paintStars() with the hovered star\'s value; moving the mouse away calls paintStars(currentRating), repainting back to whatever was last actually clicked. Only a click updates currentRating itself.' },
      { q: 'Is the comment field actually required to submit?', a: 'No. updateSubmitState() disables the Submit button based solely on whether currentRating is still 0 — the comment textarea\'s content is never checked. The label explicitly says "(optional)" and the enabling logic honors that rather than silently requiring text anyway.' },
      { q: 'How does the character counter stay accurate?', a: 'It recalculates MAX_LEN - comment.value.length directly from the textarea\'s live value on every input event — there is no separately tracked counter variable that could fall out of sync with what is actually typed. It only switches to red text once 20 or fewer characters remain.' },
      { q: 'Why does the thank-you message change depending on the rating?', a: 'The submit handler checks whether currentRating is 4 or 5 and picks between an appreciative message and a more empathetic message acknowledging the feedback will reach the product team for lower ratings. A single generic "thanks!" message would feel tone-deaf immediately after someone leaves a 1-star rating.' },
      { q: 'Why does the reset happen after a delay instead of immediately when the modal closes?', a: 'The reset (clearing the rating, comment, and counter) is deferred by roughly 250ms after the close animation starts — matching the CSS transition duration — so the visitor never sees the form flash back to its empty starting state while the modal is still visibly animating closed.' },
    ],
    aiPrompt: {
      paragraph: `Rather than guessing why hovering a star doesn't overwrite the rating you already picked, paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly how paintStars() is shared between the hover-preview and click-commit code paths without either one clobbering the other's intent, and why the character counter recalculates from the textarea's live value instead of tracking a separate counter variable. The same assistant can help you extend it — ask it to wire the submit handler to a real fetch() call posting { rating, comment } to your feedback API with proper error handling if the request fails, add a "why this rating?" set of quick-select reason chips that appear only for low ratings (1-2 stars) to gather more specific signal, or persist a "already submitted feedback today" flag in localStorage so the prompt doesn't reappear too often for the same visitor. It's also useful for an accessibility review: ask whether the star radiogroup should support arrow-key navigation between options in addition to click and hover, which is expected behavior for a native ARIA radiogroup pattern. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a feedback modal in plain HTML, CSS, and vanilla JavaScript combining a five-star rating picker with an optional comment field, in a single reusable component — no library.

Requirements:
- A trigger button that opens a modal (backdrop + centered dialog with a fade/scale transition) containing five star buttons built as real <button> elements with role="radio" inside a role="radiogroup" container (not native radio inputs), plus a textarea for an optional comment with a maxlength and a live character-remaining counter.
- Hovering over a star must preview that rating by visually filling stars up to the hovered one, and moving the mouse away without clicking must revert the display back to whatever rating was actually last clicked — the hover preview and the committed rating must be tracked as two logically separate states so neither overwrites the other unintentionally.
- Clicking a star commits that rating, updates a small text label describing the rating in words (e.g. "Poor" through "Excellent"), and updates the corresponding aria-checked attributes on the star buttons.
- A Submit button must remain disabled until a star rating has been chosen, and must NOT require any text in the comment field — the comment must be genuinely optional both in its label text and in the actual enabling logic.
- The character counter must be computed directly from the textarea's current value length on every input event (not from a separately maintained counter variable) and switch to a warning color only once remaining characters drop to 20 or fewer.
- On submit, replace the form content with a thank-you confirmation whose message text differs depending on whether the rating was high (4-5 stars) versus lower, then automatically close the modal after a short delay, and only after the close animation would have finished, reset all the modal's internal state (rating, comment text, counter) back to its initial values so the next time it opens it starts fresh.
- Support closing the modal via a close button, backdrop click, and the Escape key at any point.`,
    },
  },
};

export default modalRatingFeedbackStarComment;
