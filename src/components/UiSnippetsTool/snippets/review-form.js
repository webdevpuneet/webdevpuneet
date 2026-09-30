const reviewForm = {
  id: 'review-form',
  title: 'Review Form',
  lastmod: '2026-06-16',
  category: 'forms',
  html: `<div class="review-card">
  <form class="review-form" id="reviewForm" onsubmit="submitReview(event)">
    <h2 class="rv-title">Write a review</h2>
    <p class="rv-sub">Share your experience to help other shoppers.</p>

    <div class="rv-field">
      <label class="rv-label">Your rating</label>
      <div class="rv-stars" id="rvStars" onmouseleave="previewRating(0)">
        <button type="button" class="rv-star" onmouseenter="previewRating(1)" onclick="setRating(1)" aria-label="1 star">★</button>
        <button type="button" class="rv-star" onmouseenter="previewRating(2)" onclick="setRating(2)" aria-label="2 stars">★</button>
        <button type="button" class="rv-star" onmouseenter="previewRating(3)" onclick="setRating(3)" aria-label="3 stars">★</button>
        <button type="button" class="rv-star" onmouseenter="previewRating(4)" onclick="setRating(4)" aria-label="4 stars">★</button>
        <button type="button" class="rv-star" onmouseenter="previewRating(5)" onclick="setRating(5)" aria-label="5 stars">★</button>
        <span class="rv-rate-text" id="rvRateText">Tap to rate</span>
      </div>
      <span class="rv-error" id="rvError"></span>
    </div>

    <div class="rv-field">
      <label class="rv-label" for="rvName">Name</label>
      <input class="rv-input" id="rvName" type="text" placeholder="Alex Morgan" required>
    </div>

    <div class="rv-field">
      <label class="rv-label" for="rvComment">Review</label>
      <textarea class="rv-input rv-textarea" id="rvComment" rows="4" maxlength="400" placeholder="What did you like or dislike?" oninput="countChars(this)" required></textarea>
      <span class="rv-counter" id="rvCounter">0 / 400</span>
    </div>

    <button class="rv-submit" type="submit">Post review</button>
  </form>

  <div class="rv-thanks" id="rvThanks">
    <div class="rv-check">
      <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
    </div>
    <h2 class="rv-title">Thanks for your review!</h2>
    <p class="rv-sub">You rated <strong id="rvSummary"></strong> — it is now pending moderation.</p>
    <button class="rv-again" type="button" onclick="resetForm()">Write another</button>
  </div>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#f1f5f9;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px}
.review-card{background:#fff;border:1px solid #e2e8f0;border-radius:18px;padding:28px;width:100%;max-width:380px;box-shadow:0 12px 40px rgba(15,23,42,.06);position:relative;overflow:hidden}

.rv-title{font-size:19px;font-weight:800;color:#1e293b}
.rv-sub{font-size:13px;color:#64748b;margin-top:4px;margin-bottom:18px}

.rv-field{margin-bottom:16px}
.rv-label{display:block;font-size:12px;font-weight:700;color:#374151;margin-bottom:7px}

.rv-stars{display:flex;align-items:center;gap:3px}
.rv-star{background:none;border:none;font-size:30px;line-height:1;color:#e2e8f0;cursor:pointer;padding:0 1px;transition:color .12s,transform .12s;font-family:inherit}
.rv-star:hover{transform:scale(1.18)}
.rv-star.on{color:#f59e0b}
.rv-rate-text{margin-left:10px;font-size:12px;font-weight:700;color:#94a3b8;transition:color .15s}
.rv-rate-text.set{color:#f59e0b}

.rv-error{display:block;font-size:11px;color:#ef4444;min-height:13px;margin-top:5px}

.rv-input{width:100%;padding:10px 12px;border:1.5px solid #e2e8f0;border-radius:10px;font-size:13px;color:#1e293b;outline:none;font-family:inherit;transition:border-color .15s,box-shadow .15s;background:#fff}
.rv-input:focus{border-color:#6366f1;box-shadow:0 0 0 3px rgba(99,102,241,.12)}
.rv-textarea{resize:vertical;min-height:80px}
.rv-counter{display:block;text-align:right;font-size:10px;color:#94a3b8;margin-top:4px}

.rv-submit{width:100%;padding:12px;background:#6366f1;color:#fff;border:none;border-radius:11px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s,transform .1s}
.rv-submit:hover{background:#4f46e5}
.rv-submit:active{transform:scale(.98)}

.rv-thanks{position:absolute;inset:0;background:#fff;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:28px;opacity:0;visibility:hidden;transform:translateY(12px);transition:opacity .3s,transform .3s,visibility .3s}
.rv-thanks.show{opacity:1;visibility:visible;transform:translateY(0)}
.rv-check{width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#10b981,#059669);display:flex;align-items:center;justify-content:center;margin-bottom:16px;animation:check-pop .4s cubic-bezier(.2,1.5,.4,1)}
@keyframes check-pop{0%{transform:scale(0)}60%{transform:scale(1.15)}100%{transform:scale(1)}}
.rv-thanks .rv-sub{margin-bottom:20px}
.rv-thanks strong{color:#f59e0b}
.rv-again{background:#f1f5f9;color:#475569;border:none;border-radius:10px;padding:10px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;transition:background .15s}
.rv-again:hover{background:#e2e8f0}`,

  js: `var LABELS = ['', 'Poor', 'Fair', 'Good', 'Very good', 'Excellent'];
var selected = 0;

function paintStars(n) {
  var stars = document.querySelectorAll('.rv-star');
  stars.forEach(function (s, i) { s.classList.toggle('on', i < n); });
}

function previewRating(n) {
  paintStars(n || selected);
}

function setRating(n) {
  selected = n;
  paintStars(n);
  var t = document.getElementById('rvRateText');
  t.textContent = LABELS[n];
  t.classList.add('set');
  document.getElementById('rvError').textContent = '';
}

function countChars(el) {
  document.getElementById('rvCounter').textContent = el.value.length + ' / 400';
}

function submitReview(event) {
  event.preventDefault();
  if (!selected) {
    document.getElementById('rvError').textContent = 'Please choose a star rating.';
    return;
  }
  document.getElementById('rvSummary').textContent = selected + ' / 5 — ' + LABELS[selected];
  document.getElementById('rvThanks').classList.add('show');
}

function resetForm() {
  document.getElementById('rvThanks').classList.remove('show');
  document.getElementById('reviewForm').reset();
  selected = 0;
  paintStars(0);
  var t = document.getElementById('rvRateText');
  t.textContent = 'Tap to rate';
  t.classList.remove('set');
  document.getElementById('rvCounter').textContent = '0 / 400';
}`,

  seo: {
    title: 'Review Form — Star Rating Input HTML CSS JS Snippet',
    description: `Review form with a hover-preview star rating, character-counted comment box, validation, and an animated thank-you state. Exports to React, Vue & Tailwind.`,
    about: {
      title: `Review Form — Hover-Preview Star Input, Character Counter & Animated Thank-You State`,
      description: `User reviews are among the highest-leverage content on any product page — they build trust, surface real feedback, and drive conversion. But the form that collects them is often an afterthought: a plain dropdown for the rating, no validation, and a jarring full-page reload on submit. This snippet implements a polished review form in plain HTML, CSS, and vanilla JavaScript: an interactive hover-preview star rating, a live rating label, a character-counted comment box, inline validation, and a smooth in-place transition to a thank-you state — no page navigation.

The interaction that makes or breaks a review form is the star input. A good star control previews the rating as the cursor moves across it, then locks the selection on click, and clearly distinguishes "hovering" from "chosen".

**Hover-preview star rating**

Five \`<button>\` elements make up the rating. Each fires \`previewRating(n)\` on \`mouseenter\`, filling stars up to position \`n\` by toggling an \`.on\` class via the shared \`paintStars\` helper. The container's \`mouseleave\` calls \`previewRating(0)\`, which falls back to the committed \`selected\` value — so when the cursor leaves, the stars snap back to the chosen rating rather than going blank. Clicking calls \`setRating(n)\`, which stores \`selected\`, repaints, and swaps the label text (\`Poor\`, \`Fair\`, \`Good\`, \`Very good\`, \`Excellent\`) so users get a word, not just a count. Using real buttons keeps the control keyboard-focusable and screen-reader friendly via per-star \`aria-label\`s.

**Character-counted comment box**

The textarea has \`maxlength="400"\` and an \`oninput="countChars(this)"\` handler that updates a live "N / 400" counter. The hard cap prevents overflow while the live count nudges users toward a substantive review without surprising them at submit time.

**Inline validation**

On submit, \`submitReview\` calls \`event.preventDefault()\` and checks that a rating was chosen. If not, it writes "Please choose a star rating." into a reserved \`.rv-error\` slot — reserved with \`min-height\` so the layout never jumps when the message appears. The name and comment fields use the native \`required\` attribute, so the browser handles those before the JS even runs.

**Animated thank-you state**

Instead of navigating away, the thank-you panel is absolutely positioned over the card and revealed by toggling a \`.show\` class — fading and sliding up while a green check badge springs in with a \`cubic-bezier\` pop. It echoes the submitted rating back to the user ("4 / 5 — Very good") for confirmation. A "Write another" button calls \`resetForm\`, which hides the panel, resets the native form, clears \`selected\`, repaints empty stars, and restores the counter — returning the card to a pristine state without a reload.

Pair this form with a [star rating](/ui-snippets/star-rating/) display for read-only scores, a [rating breakdown](/ui-snippets/rating-breakdown/) histogram of all reviews, and a [review card](/ui-snippets/review-card/) to render the submitted feedback.`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `A review card appears with an empty five-star input, a "Tap to rate" hint, a name field, and a comment box with a 0 / 400 counter.` },
      { title: 'Hover across the stars', text: `Stars fill amber up to the one under your cursor as a preview. Move away and they snap back to whatever you have committed (none yet).` },
      { title: 'Click to lock a rating', text: `Clicking the fourth star fills four stars and the label changes to "Very good". The choice persists when you move the cursor away.` },
      { title: 'Type a review', text: `Enter your name and a comment — the counter ticks up to a maximum of 400 characters as you type.` },
      { title: 'Submit', text: `Click "Post review". If you skipped the rating, an inline error appears; otherwise the card flips to a thank-you panel with a springing check and your rating echoed back.` },
      { title: 'Write another', text: `Hit "Write another" — the thank-you panel slides away and the entire form resets to its empty state with no page reload.` },
    ] },
    features: [
      { title: 'Hover-preview star rating', text: `\`previewRating\` fills stars on \`mouseenter\`; the container's \`mouseleave\` falls back to the committed \`selected\` value so stars never blank out unexpectedly.` },
      { title: 'Word labels per rating', text: `\`setRating\` maps 1–5 to "Poor" through "Excellent" and shows the word beside the stars, giving users semantic feedback, not just a number.` },
      { title: 'Keyboard-accessible stars', text: `The rating is built from real \`<button>\` elements with per-star \`aria-label\`s, so it is focusable and announced correctly by screen readers.` },
      { title: 'Live character counter', text: `\`countChars\` updates an "N / 400" readout on every keystroke, paired with a native \`maxlength\` hard cap to prevent overflow.` },
      { title: 'Layout-stable inline validation', text: `Missing-rating errors render into a \`min-height\` reserved slot so the form never shifts when the message appears or clears.` },
      { title: 'In-place thank-you transition', text: `An absolutely-positioned panel fades and slides over the card on submit — confirmation with zero navigation or reload.` },
      { title: 'Spring check animation', text: `The success badge pops in with a \`cubic-bezier(.2,1.5,.4,1)\` scale keyframe, echoing the submitted rating back for reassurance.` },
      { title: 'Full reset for re-entry', text: `\`resetForm\` clears native fields, the rating state, the star paint, the label, and the counter so "Write another" returns a pristine form.` },
    ],
    useCases: [
      { title: 'Product review submission', text: `The core use — collect star ratings and written feedback on product pages. Render submitted entries with a [review card](/ui-snippets/review-card/) below.` },
      { title: 'Post-purchase feedback', text: `Email or order-confirmation flows that ask buyers to rate their experience. Combine with an [order summary](/ui-snippets/order-summary/) recap of what they bought.` },
      { title: 'App store and service ratings', text: `Rate an app, a delivery, or a support interaction. The word labels make a 3-star "Good" feel clearer than a bare number.` },
      { title: 'Course and content reviews', text: `Learning platforms collect lesson ratings and comments. Show aggregate scores with a [rating breakdown](/ui-snippets/rating-breakdown/) histogram.` },
      { title: 'NPS and CSAT surveys', text: `Adapt the star input into a satisfaction scale; for net-promoter scoring pair it with an [NPS survey](/ui-snippets/nps-survey/) widget.` },
      { title: 'Restaurant and venue reviews', text: `Local listings collect ratings plus a short note. Display the average alongside a read-only [star rating](/ui-snippets/star-rating/) component.` },
    ],
    faqs: [
      { q: 'How do I send the review to a server?', a: `In \`submitReview\`, after validation, collect \`selected\`, the name input, and the comment textarea, then \`fetch('/api/reviews', { method: 'POST', body: JSON.stringify({ rating: selected, name, comment }) })\`. Show the thank-you panel on a successful response; on failure, surface an error instead of switching states so the user can retry without losing their text.` },
      { q: 'How do I support half-star ratings?', a: `Switch the star buttons to track cursor position within each star (\`offsetX < width/2\` = half) and store \`selected\` in 0.5 steps. Render halves by overlaying a clipped amber star or using a background gradient stopped at the fractional percentage, the same technique read-only star displays use.` },
      { q: 'How do I prevent duplicate or spam submissions?', a: `Disable the submit button immediately on click and re-enable only if the request fails. On the server, rate-limit by user or IP and require authentication. For anonymous forms, add a honeypot field or a lightweight challenge before accepting the POST.` },
      { q: 'Is the star rating keyboard accessible?', a: `Yes — each star is a focusable \`<button>\` with an \`aria-label\`. Users can Tab to a star and press Enter or Space to select it. For arrow-key navigation, add a \`keydown\` handler on the container that moves focus and calls \`setRating\` so the whole control works without a mouse.` },
      { q: 'How do I use this review form in React, Vue, or Angular?', a: `In React, hold \`selected\`, \`hover\`, and the field values in \`useState\`; derive star fill from \`hover || selected\` and toggle the thank-you panel with a boolean. In Vue, use \`ref\`s with \`@mouseenter\`/\`@click\` bindings and \`v-if\` for the panel. In Angular, track state on the component and bind \`[class.on]\` and \`*ngIf\`. The keyframes and layout port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to trace the hover-versus-committed star logic by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why previewRating falls back to the committed selected value on mouseleave instead of clearing the stars to zero, and how that specific fallback is what prevents the rating from visually disappearing every time the cursor exits the star row. The same assistant can help you optimize it — ask whether querying all five star buttons from the DOM inside paintStars on every single mouseenter event is wasteful compared to caching that NodeList once at setup. It's also useful for extending the form: ask it to add photo attachment support to the review, wire submitReview to a real fetch call with a loading and error state instead of always showing the thank-you panel, or add arrow-key keyboard navigation across the star buttons. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build a review submission form in plain HTML, CSS, and JavaScript with no library — a hover-preview star rating, a name field, a character-counted comment box, inline validation, and an animated thank-you confirmation.

Requirements:
- Build the star rating from five real button elements (not divs), each with an aria-label describing its position. On mouseenter of a star, fill every star up to and including that position using a shared class-toggling helper function. On mouseleave of the entire star row (not each individual star), revert the fill to whatever rating has actually been clicked and committed so far — not to zero — so the display never blanks out just because the cursor moved away.
- On clicking a star, permanently commit that rating, update a text label next to the stars to show a word description (e.g. mapping 1 through 5 to Poor, Fair, Good, Very good, Excellent), and clear any existing validation error message.
- Add a textarea with a native maxlength attribute (e.g. 400) and a live "current length / 400" counter that updates on every input event.
- On form submission, prevent the default page reload, and if no star rating has been committed yet, display an inline error message inside a permanently reserved-height slot (so its appearance never shifts the surrounding layout) instead of using a browser alert.
- On successful submission, do not navigate away: instead reveal an absolutely-positioned thank-you panel that fades and slides in over the form, echoes back the exact rating and word label the user chose, and includes a small checkmark icon that plays a bouncy scale-in entrance animation.
- Provide a "write another" action that hides the thank-you panel, calls the native form's reset method, and manually resets the JavaScript-tracked rating state, the star fill, the label text, and the character counter back to their original empty values.`,
    },
  },
};

export default reviewForm;
