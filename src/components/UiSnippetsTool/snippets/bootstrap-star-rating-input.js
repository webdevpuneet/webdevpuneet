const bootstrapStarRatingInput = {
  id: 'bootstrap-star-rating-input',
  title: 'Bootstrap Star Rating Input',
  lastmod: '2026-09-10',
  category: 'forms',
  cdnUrls: [
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  ],
  html: `<div class="container py-5 d-flex justify-content-center">
  <div class="card bsstar-card">
    <div class="card-body p-4 text-center">
      <h5 class="fw-bold mb-1">Rate your experience</h5>
      <p class="text-muted small mb-3">Click a star, or use the arrow keys.</p>

      <div class="d-flex justify-content-center gap-1 mb-2" id="bsstarGroup" role="radiogroup" aria-label="Star rating" tabindex="0">
        <span class="bsstar" data-value="1" role="radio" aria-checked="false">&#9733;</span>
        <span class="bsstar" data-value="2" role="radio" aria-checked="false">&#9733;</span>
        <span class="bsstar" data-value="3" role="radio" aria-checked="false">&#9733;</span>
        <span class="bsstar" data-value="4" role="radio" aria-checked="false">&#9733;</span>
        <span class="bsstar" data-value="5" role="radio" aria-checked="false">&#9733;</span>
      </div>

      <p class="small text-muted mb-3" id="bsstarLabel">No rating yet</p>
      <input type="hidden" id="bsstarValue" name="rating" value="0">
      <button class="btn btn-dark w-100 fw-bold" id="bsstarSubmit" disabled>Submit rating</button>
      <p class="small mt-3 mb-0" id="bsstarStatus">&nbsp;</p>
    </div>
  </div>
</div>`,
  css: `.bsstar-card { width: 380px; border: 1px solid #eceef1; border-radius: 14px; }
.bsstar { font-size: 34px; line-height: 1; color: #d8dbe0; cursor: pointer; transition: color .1s ease, transform .1s ease; user-select: none; }
.bsstar.bsstar-filled { color: #f5a623; }
.bsstar:hover { transform: scale(1.12); }
#bsstarGroup:focus-visible { outline: 2px solid #0d6efd; outline-offset: 6px; border-radius: 8px; }`,
  js: `const stars = Array.from(document.querySelectorAll('.bsstar'));
const group = document.getElementById('bsstarGroup');
const label = document.getElementById('bsstarLabel');
const hiddenInput = document.getElementById('bsstarValue');
const submitBtn = document.getElementById('bsstarSubmit');
const status = document.getElementById('bsstarStatus');

let committed = 0;

function paint(upTo) {
  stars.forEach(s => {
    s.classList.toggle('bsstar-filled', Number(s.dataset.value) <= upTo);
  });
}

function setLabel(value) {
  label.textContent = value > 0 ? value + ' out of 5' : 'No rating yet';
}

function commit(value) {
  committed = value;
  hiddenInput.value = String(value);
  setLabel(value);
  paint(value);
  submitBtn.disabled = value === 0;
  stars.forEach(s => s.setAttribute('aria-checked', String(Number(s.dataset.value) === value)));
}

stars.forEach(star => {
  star.addEventListener('mouseenter', () => paint(Number(star.dataset.value)));
  star.addEventListener('mouseleave', () => paint(committed));
  star.addEventListener('click', () => commit(Number(star.dataset.value)));
});

// Keyboard support: the star row itself is focusable (tabindex="0") and acts
// as a single radiogroup, so arrow keys move the committed rating up or down
// by one star without needing to tab through five separate elements.
group.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
    e.preventDefault();
    commit(Math.min(5, committed + 1));
  } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
    e.preventDefault();
    commit(Math.max(0, committed - 1));
  } else if (e.key >= '1' && e.key <= '5') {
    commit(Number(e.key));
  }
});

submitBtn.addEventListener('click', () => {
  status.textContent = 'Thanks! You rated ' + committed + ' out of 5.';
  status.className = 'small mt-3 mb-0 text-success';
});`,

  seo: {
    title: 'Bootstrap Star Rating Input — Free HTML CSS JS Snippet',
    description: 'A real Bootstrap 5.3 five-star rating widget with hover preview, keyboard arrow-key control, and a hidden form input. Exports to React, Vue & Tailwind.',
    about: {
      title: 'Bootstrap Star Rating Input — HTML, CSS & JavaScript',
      description: `A star rating control has two states people often conflate: the **preview** you see while hovering, and the **committed** value that actually gets submitted. This snippet keeps them separate with a single \`committed\` variable — hovering any \`.bsstar\` span calls \`paint(value)\` to temporarily fill stars up to the hovered one via the \`bsstar-filled\` class, and \`mouseleave\` repaints back to \`committed\` rather than leaving the preview stuck. Clicking a star calls \`commit(value)\`, which is the single source of truth: it updates the hidden \`#bsstarValue\` input (so the rating actually travels with a real form submission), updates the live text label through \`setLabel\`, repaints the stars, and toggles the disabled state of the Submit button.\n\nKeyboard access doesn't try to make each of the five stars individually tab-stoppable — that would force five tab presses just to reach the widget. Instead the whole \`#bsstarGroup\` container carries \`tabindex="0"\` and \`role="radiogroup"\`, and a single \`keydown\` listener on the group handles ArrowRight/ArrowUp to increment and ArrowLeft/ArrowDown to decrement the committed rating by one, clamped between 0 and 5 with \`Math.min\`/\`Math.max\`. Pressing a digit key 1–5 jumps straight to that rating. Each star also gets \`role="radio"\` and \`aria-checked\` is kept in sync with the committed value inside \`commit()\`, so a screen reader announces the current selection the same way a native radio group would.\n\nA non-obvious pitfall this handles: without separating hover-preview from committed value, a user who hovers past their intended rating to reach the Submit button would visually "lose" their selection, because the fill would follow the mouse away from the stars. By repainting to \`committed\` on \`mouseleave\` rather than clearing to zero, the widget correctly falls back to the last click instead of forgetting it. The Submit button stays \`disabled\` until \`committed\` is non-zero, preventing a zero-star submission, and clicking Submit writes a confirmation message into \`#bsstarStatus\` using the actual \`committed\` number rather than a hardcoded string.\n\nStyling is minimal on top of Bootstrap: the \`.bsstar\` class sets font-size, a neutral gray default color, and a CSS \`transition\` on \`color\` and \`transform\` so hovering feels responsive; \`.bsstar-filled\` swaps in an amber color. The card itself reuses Bootstrap's \`.card\`/\`.card-body\` structure with only a fixed width and border-radius layered on top, matching the visual weight of the rest of this library's form snippets.\n\nThe Submit button is deliberately separate from the act of committing a rating — clicking a star or pressing an arrow key only updates \`committed\` and the hidden input; it takes an explicit click on \`#bsstarSubmit\` to write a confirmation into \`#bsstarStatus\`. That separation matters for a real form: a user should be able to change their mind and click a different star several times before finally submitting, without each click firing a network request. Because \`commit()\` is the single function responsible for every side effect of a rating change — the hidden input, the label, the paint, the button's disabled flag, and the ARIA state — adding a new consumer of the rating (for example, sending an analytics event on every change) only requires one new line inside \`commit()\` rather than hunting down every place the rating could change and duplicating the same update logic across click handlers, keyboard handlers, and a hypothetical programmatic reset.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Five gray outline stars appear, along with a "No rating yet" label and a disabled Submit button.' },
        { title: 'Hover over the stars', text: 'Stars fill in amber up to the one under your cursor, previewing the rating without committing it.' },
        { title: 'Move the mouse away', text: 'The preview reverts — back to empty if nothing was clicked yet, or back to your last click.' },
        { title: 'Click a star', text: 'That star and every star to its left turn solid amber, the label updates to e.g. "4 out of 5", and Submit becomes enabled.' },
        { title: 'Focus the star row and press an arrow key', text: 'The rating increases or decreases by one star, staying in sync with the label and hidden input.' },
        { title: 'Click Submit', text: 'A green confirmation message appears showing the exact rating that was committed.' },
      ],
    },
    features: [
      'Five real DOM elements acting as a single radiogroup, not a native <select>',
      'Hover preview via mouseenter/mouseleave, fully separate from the committed value',
      'Click commits the rating and updates a hidden <input> for real form submission',
      'Keyboard support: ArrowRight/Up increments, ArrowLeft/Down decrements, digits 1-5 jump directly',
      'Live text label ("4 out of 5") kept in sync with every interaction',
      'aria-checked and role="radio"/"radiogroup" kept in sync for screen readers',
      'Submit button disabled until a non-zero rating is committed',
      'Mouseleave correctly restores the last committed rating instead of clearing to zero',
    ],
    useCases: [
      { icon: 'FORM', title: 'Product and service review forms', desc: 'Pairs naturally with a comment box, similar to how [bootstrap-contact-form-char-counter](/ui-snippets/bootstrap-contact-form-char-counter/) pairs a counter with free text input.' },
      { icon: 'CART', title: 'Post-purchase feedback in checkout flows', desc: 'Drop this after an order confirmation, alongside something like [bootstrap-offcanvas-cart](/ui-snippets/bootstrap-offcanvas-cart/) for the surrounding shopping experience.' },
      { icon: 'LEARN', title: 'Learning custom accessible widgets', desc: 'A compact example of building a radiogroup pattern from scratch with proper ARIA roles instead of reaching for a native form control.' },
      { icon: 'APP', title: 'Admin dashboards showing aggregate ratings', desc: 'Use the same star markup read-only (no click handlers) inside something like [bootstrap-admin-dashboard-sidebar](/ui-snippets/bootstrap-admin-dashboard-sidebar/) to display average scores.' },
      { icon: 'SEARCH', title: 'Filtering by minimum rating', desc: 'Reuse the same commit/paint logic to build a "4 stars & up" filter control in a search or listing UI.' },
    ],
    faqs: [
      { q: 'Does this submit with a real HTML form?', a: 'Yes — the hidden input with id bsstarValue and name="rating" holds the numeric value, so wrapping the markup in a <form> and adding a submit button of type="submit" will include the rating in the request payload like any other form field.' },
      { q: 'Can I use this in React, Vue, or Angular?', a: 'Yes. In React, move the committed state into useState and replace direct DOM class toggling with conditional class names; in Vue, use ref/reactive inside onMounted or a computed class binding; in Angular, track the value in a component property and bind classes with [class.bsstar-filled], calling the equivalent logic from (mouseenter)/(click) bindings instead of addEventListener.' },
      { q: 'Is the rating accessible to keyboard and screen reader users?', a: 'Yes — the star row has tabindex="0" so it is reachable by Tab, role="radiogroup" and role="radio" describe the widget structure, aria-checked is updated on every commit, and arrow keys plus digit keys 1-5 provide full keyboard control without a mouse.' },
      { q: 'What happens if I hover past my selected rating and move away?', a: 'The mouseleave handler repaints to the committed value, not to zero, so your last click is preserved visually — only clicking a different star or using arrow keys changes the committed rating.' },
      { q: 'How would I style this with Tailwind instead of Bootstrap classes?', a: 'Keep the same HTML structure and JS logic untouched, then replace .card/.card-body with Tailwind utility classes like rounded-2xl border p-6, and swap the .bsstar-filled color toggle for a Tailwind class such as text-amber-400 versus text-gray-300.' },
      { q: 'Can I show half-star ratings?', a: 'Not out of the box — this implementation commits whole numbers 1 through 5. Supporting halves would require detecting cursor x-position within each star and rendering a partially clipped star icon, which is a reasonable extension to ask an AI assistant for.' },
    ],
    aiPrompt: {
      paragraph: `Hand this snippet's HTML, CSS, and JS to an AI coding assistant like Claude and ask it to add half-star support by detecting cursor position within each star, or to add a "Clear rating" button that resets the hidden input back to zero. It's also worth asking for a read-only display mode for showing an average rating on a product card.`,
      prompt: `Build a Bootstrap 5.3 five-star rating input, using the real Bootstrap CDN framework (bootstrap.min.css and bootstrap.bundle.min.js) for the surrounding card layout, not custom CSS made to resemble Bootstrap.

Requirements:
- Five clickable star elements laid out in a row inside a Bootstrap card.
- Hovering over a star previews the rating by filling that star and every star to its left, and reverts to the last clicked rating when the mouse leaves, not to zero.
- Clicking a star commits that rating: it should update a hidden <input type="hidden" name="rating"> so the value can be submitted with a real HTML form.
- A live text label below the stars must show the current rating, e.g. "4 out of 5", or "No rating yet" when nothing is selected.
- The whole star row must be keyboard accessible as a single focusable group: ArrowRight/ArrowUp increases the rating, ArrowLeft/ArrowDown decreases it, and digit keys 1-5 jump directly to that value. Use role="radiogroup" and role="radio" with aria-checked kept in sync.
- A Submit button must stay disabled until a non-zero rating is committed.`,
    },
  },
};

export default bootstrapStarRatingInput;
