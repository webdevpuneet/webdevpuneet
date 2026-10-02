const ratingStarsInput = {
  id: 'rating-stars-input',
  title: 'Rating Stars Input',
  lastmod: '2026-07-18',
  category: 'forms',
  html: `<div class="rs-card">
  <p class="rs-q">How was your experience?</p>
  <div class="rs-stars" id="rsStars" role="radiogroup" aria-label="Rating">
    <button type="button" class="rs-star" role="radio" aria-label="1 star" data-v="1" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.5 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg></button>
    <button type="button" class="rs-star" role="radio" aria-label="2 stars" data-v="2" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.5 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg></button>
    <button type="button" class="rs-star" role="radio" aria-label="3 stars" data-v="3" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.5 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg></button>
    <button type="button" class="rs-star" role="radio" aria-label="4 stars" data-v="4" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.5 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg></button>
    <button type="button" class="rs-star" role="radio" aria-label="5 stars" data-v="5" aria-checked="false"><svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17.5 5.9 20.4l1.5-6.8L2.2 9l6.9-.7z"/></svg></button>
  </div>
  <p class="rs-out" id="rsOut">Tap a star to rate</p>
</div>`,

  css: `*{box-sizing:border-box;margin:0;padding:0}
body{font-family:system-ui,-apple-system,sans-serif;background:#0d0f18;display:flex;justify-content:center;align-items:center;min-height:100vh;padding:24px}

.rs-card{background:#151926;border:1px solid #232838;border-radius:18px;padding:28px 30px;text-align:center;width:320px}
.rs-q{color:#e7eaf3;font-size:17px;font-weight:600;margin-bottom:18px}
.rs-stars{display:inline-flex;gap:6px}
.rs-star{background:none;border:0;padding:4px;cursor:pointer;line-height:0}
.rs-star svg{width:38px;height:38px;fill:#2a3145;stroke:#3a4258;stroke-width:1;transition:fill .12s,transform .12s}
.rs-star:hover{transform:scale(1.12)}
/* Fill this star and all before it when active or hovered. */
.rs-star.is-on svg{fill:#fbbf24;stroke:#f59e0b}
.rs-star.is-hover svg{fill:#fde68a;stroke:#fbbf24}
.rs-star:focus-visible{outline:2px solid #6366f1;outline-offset:3px;border-radius:8px}
.rs-out{color:#8b93a8;font-size:14px;margin-top:18px;min-height:20px}
.rs-out strong{color:#fbbf24}`,

  js: `var wrap = document.getElementById('rsStars');
var out = document.getElementById('rsOut');
var stars = Array.prototype.slice.call(wrap.querySelectorAll('.rs-star'));
var LABELS = ['', 'Terrible', 'Poor', 'Okay', 'Good', 'Excellent'];
var rating = 0;

// Light up every star up to and including n, using the given class.
function paint(n, cls) {
  stars.forEach(function (s, i) {
    s.classList.toggle(cls, i < n);
  });
}

function setRating(n) {
  rating = n;
  stars.forEach(function (s, i) {
    var on = i < n;
    s.classList.toggle('is-on', on);
    s.setAttribute('aria-checked', i === n - 1 ? 'true' : 'false');
  });
  out.innerHTML = 'You rated: <strong>' + n + '/5 · ' + LABELS[n] + '</strong>';
}

stars.forEach(function (star, i) {
  var n = i + 1;
  star.addEventListener('mouseenter', function () { paint(n, 'is-hover'); });
  star.addEventListener('click', function () { setRating(n); });
  // Keyboard: arrows move, Enter/Space commit.
  star.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { stars[Math.min(i + 1, 4)].focus(); e.preventDefault(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { stars[Math.max(i - 1, 0)].focus(); e.preventDefault(); }
    if (e.key === 'Enter' || e.key === ' ') { setRating(n); e.preventDefault(); }
  });
});

// Clear the hover preview, leaving the committed rating shown.
wrap.addEventListener('mouseleave', function () { paint(0, 'is-hover'); });`,

  seo: {
    title: 'Rating Stars Input — Free HTML CSS JS Star Rating Picker',
    description: `An accessible star rating input with hover preview, committed selection, keyboard arrows, and a live label, built from SVG stars. Exports to React, Vue & Tailwind.`,
    about: {
      title: 'Rating Stars Input — A Hoverable, Keyboard-Friendly Star Picker',
      description: `The rating stars input is the five-star control people use to score a product, an order, or an experience — stars fill up to the one under your cursor as a preview, and clicking commits the score. This snippet builds an accessible version with SVG stars, CSS, and vanilla JavaScript, including a hover preview, keyboard support, and a live text label.

**Two layers: hover preview and committed rating**

The control tracks two separate states. Hovering a star paints a lighter "is-hover" fill on it and every star before it, previewing what you'd get if you clicked; clicking commits a brighter "is-on" fill that persists. Keeping preview and selection as different classes means moving the mouse away cleanly restores the committed rating instead of clearing it — the behaviour every star input should have but many get wrong.

**Fill-up-to logic**

Both states use the same idea: a \`paint(n, cls)\` helper toggles a class on stars whose index is less than \`n\`, so star three lights stars one through three. There's no per-star bookkeeping — the count drives which stars are lit. The stars themselves are inline SVGs whose \`fill\` and \`stroke\` transition, so the colour change is smooth and they scale slightly on hover for a tactile feel.

**Accessible by design**

The group is a \`role="radiogroup"\` and each star a \`role="radio"\` with an \`aria-label\` ("3 stars") and \`aria-checked\` that reflects the committed value, so screen readers announce it as a rating control rather than a row of buttons. A \`:focus-visible\` outline shows keyboard focus, and the live label text updates so the score is conveyed in plain text too.

**Keyboard control**

Arrow keys move focus between stars (Right/Up forward, Left/Down back, clamped at the ends) and Enter or Space commits the focused star — the standard radio-group keyboard model. This makes the input fully operable without a mouse, which is essential for a form field.

**A descriptive label**

Beyond the stars, a line below shows the numeric score and a word — "4/5 · Good" — pulled from a labels array. Pairing a number with a descriptor makes the rating clearer and gives immediate feedback that the click registered.

**Customizing it**

Change the star count, the colours, or the label words; pre-set a rating by calling \`setRating\` on load; or read \`rating\` on form submit. Swap the SVG path for hearts or thumbs for a different scale. Pair it with a [star rating](/ui-snippets/star-rating/) display, a [review form](/ui-snippets/review-form/), or a [rating breakdown](/ui-snippets/rating-breakdown/).`,
    },
    howToUse: { type: 'steps', items: [
      { title: 'Paste HTML, CSS, and JS', text: `Five empty stars render with a prompt.` },
      { title: 'Hover the stars', text: `They fill up to the one under the cursor.` },
      { title: 'Click to commit', text: `The score sticks and the label updates.` },
      { title: 'Use arrow keys', text: `Move focus and press Enter to rate.` },
      { title: 'Move the mouse away', text: `The preview clears, the committed score stays.` },
      { title: 'Read the value', text: `Get the rating variable on submit.` },
    ] },
    features: [
      { title: 'Hover preview', text: `Lighter fill previews before you commit.` },
      { title: 'Committed selection', text: `Click locks in a brighter fill.` },
      { title: 'Fill-up-to logic', text: `One count lights all prior stars.` },
      { title: 'SVG stars', text: `Crisp, recolorable, scalable shapes.` },
      { title: 'Radiogroup ARIA', text: `role=radio with aria-checked per star.` },
      { title: 'Keyboard control', text: `Arrows move, Enter/Space commit.` },
      { title: 'Focus ring', text: `:focus-visible outline for keyboard users.` },
      { title: 'Descriptive label', text: `Shows score plus a word like Good.` },
    ],
    useCases: [
      { title: 'Review forms', text: 'Add a score input at the top of a [review form](/ui-snippets/review-form/), with stars previewing a lighter fill on hover and a brighter fill once committed.' },
      { title: 'Post-order feedback', text: 'Ask for a rating after an [order summary](/ui-snippets/order-summary/), with a live label such as Great or Poor describing the chosen score.' },
      { title: 'Display versus input', text: 'Pair with a read-only [star rating](/ui-snippets/star-rating/) so the same visual language covers both showing and collecting scores.' },
      { title: 'Aggregate rating views', text: 'Feed collected scores into a [rating breakdown](/ui-snippets/rating-breakdown/), with SVG stars staying crisp and recolourable at any size.' },
      { title: 'Survey and support scales', text: 'Use as a step in an [NPS survey](/ui-snippets/nps-survey/), or collect CSAT after a [helpful feedback widget](/ui-snippets/helpful-feedback-widget/) interaction.' },
    ],
    faqs: [
      { q: 'Why does moving the mouse away not clear my rating?', a: `The control keeps hover preview and committed selection as separate classes. Hovering paints a lighter is-hover fill, while clicking sets a persistent is-on fill. On mouseleave only the hover class is cleared, so the committed rating stays shown — the behaviour a star input should have but many implementations get wrong.` },
      { q: 'How does hovering one star fill the earlier ones?', a: `A paint helper toggles a class on every star whose index is less than the target count, so hovering or selecting star three lights stars one through three. The count drives which stars are lit, with no per-star bookkeeping, and the same logic serves both the hover preview and the committed rating.` },
      { q: 'Is the star input accessible?', a: `Yes. The group is a role=radiogroup and each star a role=radio with an aria-label like 3 stars and aria-checked reflecting the committed value, so screen readers announce a rating control. Arrow keys move focus, Enter or Space commit, a focus-visible outline shows keyboard focus, and a live text label conveys the score in words.` },
      { q: 'How do I show a preset rating?', a: `Call setRating with the initial value on load, which applies the is-on fill to that many stars, sets aria-checked on the correct star, and updates the label. This is useful for edit forms where a user is changing an existing score rather than rating for the first time.` },
      { q: 'How do I use this rating stars input in React, Vue, or Angular?', a: `Hold rating and a hover value in state. Render each star lit when its index is less than the hover value (if hovering) or the committed rating otherwise, set onMouseEnter to the hover value, onMouseLeave to clear it, and onClick to commit. Keep the radiogroup roles and aria-checked bound to state. The SVG and CSS port unchanged.` },
    ],
    aiPrompt: {
      paragraph: `You do not have to untangle the two-layer state model by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why is-hover and is-on are kept as two separate CSS classes rather than one, and how that separation is what lets mouseleave clear only the preview while the committed rating stays lit. The same assistant can help you optimize it — ask whether the paint() helper re-toggling a class on all five stars on every single mouseenter is wasteful compared to only touching the stars whose state actually changed between the old and new count. It's also useful for extending the control: ask it to support half-star precision by detecting cursor x-position within a star, swap the star SVG path for hearts or thumbs while keeping the exact same fill-up-to logic, or persist and restore a prior rating from a data attribute on load. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an accessible star rating input in plain HTML, CSS, and JavaScript with no library — five SVG stars that preview on hover and commit on click.

Requirements:
- Structure the stars as a role="radiogroup" container with five button elements, each role="radio", each with an aria-label describing its position (e.g. "3 stars") and an aria-checked attribute that starts false.
- Keep hover preview and committed selection as two entirely separate CSS classes on the star elements (do not reuse one class for both), so that a shared "light up every star whose index is less than N" helper function can apply either class independently without one state overwriting the other.
- On mouseenter of a given star, apply the hover-preview class up to and including that star's position. On mouseleave of the whole group (not each individual star), clear only the hover-preview class — the committed selection class must remain untouched and still visibly lit.
- On click of a star, apply the committed class up to that star's position, update aria-checked to true only on the exact star matching the committed count and false on all others, and update a live text label showing both the numeric score and a word description (e.g. "4/5 - Good") pulled from a label array indexed by the score.
- Support full keyboard operation: ArrowRight/ArrowUp must move focus to the next star, ArrowLeft/ArrowDown to the previous star (both clamped at the ends so focus never leaves the group), and Enter or Space on a focused star must commit that star's rating exactly like a click.
- Give focused stars a visible :focus-visible outline distinct from the hover and committed fill colors.`,
    },
  },
};

export default ratingStarsInput;
