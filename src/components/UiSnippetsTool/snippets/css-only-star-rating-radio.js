const cssOnlyStarRatingRadio = {
  id: 'css-only-star-rating-radio',
  title: 'Star Rating — CSS Only Radio Hack (No JavaScript)',
  lastmod: '2026-08-26',
  category: 'forms',
  html: `<div class="demo">
  <form class="rating-form">
    <p class="rating-label">Rate your experience</p>
    <fieldset class="star-rating">
      <legend class="sr-only">Star rating</legend>
      <input type="radio" name="rating" id="star5" value="5" class="star-input" />
      <label for="star5" class="star" aria-label="5 stars">★</label>
      <input type="radio" name="rating" id="star4" value="4" class="star-input" />
      <label for="star4" class="star" aria-label="4 stars">★</label>
      <input type="radio" name="rating" id="star3" value="3" class="star-input" checked />
      <label for="star3" class="star" aria-label="3 stars">★</label>
      <input type="radio" name="rating" id="star2" value="2" class="star-input" />
      <label for="star2" class="star" aria-label="2 stars">★</label>
      <input type="radio" name="rating" id="star1" value="1" class="star-input" />
      <label for="star1" class="star" aria-label="1 star">★</label>
    </fieldset>
  </form>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 24px; }
.rating-form { width: 320px; max-width: 100%; background: #fff; border: 1px solid #e2e8f0; border-radius: 14px; padding: 28px 24px; text-align: center; }
.rating-label { font-size: 14px; font-weight: 600; color: #111827; margin-bottom: 14px; }

.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }

/* Stars are declared in reverse DOM order (5,4,3,2,1) so the ~ sibling
   combinator can select "this star and everything before it visually" */
.star-rating { display: flex; flex-direction: row-reverse; justify-content: center; gap: 4px; border: none; }

.star-input { position: absolute; opacity: 0; pointer-events: none; }

.star { font-size: 32px; line-height: 1; color: #e2e8f0; cursor: pointer; transition: color 0.15s ease, transform 0.15s ease; user-select: none; }

.star-input:focus-visible + .star { outline: 2px solid #6366f1; outline-offset: 3px; border-radius: 4px; }

/* Hover preview: this star and every star before it (which, thanks to
   row-reverse, are its DOM-order-earlier general siblings) light up */
.star-rating:hover .star:hover,
.star-rating:hover .star:hover ~ .star { color: #f59e0b; transform: scale(1.08); }

/* Committed selection: the checked star and all stars before it stay lit,
   unless the row is currently being hovered (hover preview takes priority) */
.star-rating:not(:hover) .star-input:checked + .star,
.star-rating:not(:hover) .star-input:checked + .star ~ .star { color: #f59e0b; }`,
  seo: {
    title: 'CSS Only Star Rating — Radio Input Hack, No JavaScript Required',
    description: 'A classic 5-star rating widget built from reverse-order radio inputs and the ~ sibling combinator — fully interactive with no JavaScript.',
    about: {
      title: 'CSS-Only Star Rating Widget — Reverse-Order Radios and the General Sibling Combinator',
      description: `This is one of the oldest and most elegant CSS-only tricks, and it hinges entirely on a detail that's easy to miss the first time: CSS has no "select the elements *before* this one" selector, but it does have \`~\`, which selects elements *after*. The star rating gets around the missing capability by reversing the DOM order of the stars and using \`flex-direction: row-reverse\` to put them back on screen in the expected 1-2-3-4-5 visual order.

**Why the markup is written 5,4,3,2,1**

To light up "this star and every star to its left" using only forward-looking sibling selectors, "to its left" has to *also mean* "later in the DOM." Writing the stars in the order 5,4,3,2,1 achieves exactly that: visually, star 1 is leftmost and star 5 is rightmost, but in the DOM, star 5 comes first and star 1 comes last. So for star 3, the stars visually to its left (2 and 1) are also its *later DOM siblings* — meaning \`.star3 ~ .star\` correctly reaches them.

**Un-reversing the visual order with row-reverse**

\`.star-rating { display: flex; flex-direction: row-reverse }\` flips the *rendering* order without touching the DOM order, so the browser paints star 5 on the right and star 1 on the left — the natural reading order — while the underlying sibling relationships used by the CSS selectors remain based on the reversed DOM order.

**The hover-preview rule**

\`.star-rating:hover .star:hover ~ .star\` reads as: "while the mouse is anywhere over the rating group, take the specific star currently under the cursor, and light it up along with every star that is its later DOM sibling." Combined with the reversed markup, "later DOM sibling of the hovered star" is precisely "every star visually to its left" — exactly the preview behavior a star rating needs. The hovered star's own color comes from the plain \`.star:hover\` half of the same selector.

**The committed-selection rule, and the priority conflict it resolves**

\`.star-rating:not(:hover) .star-input:checked + .star ~ .star\` applies the identical logic to whichever star is \`:checked\`, but only while the group is *not* being hovered — the \`:not(:hover)\` guard is what lets the mouse temporarily "preview" a different rating without visually disturbing the committed one, and then cleanly restores the real selection the instant the cursor leaves. Without that guard, hovering near — but not selecting — a lower rating would look identical to actually having selected it, which would be misleading.

**Accessibility: five radios, one legend**

Each star's \`<label>\` carries an explicit \`aria-label="N stars"\` since the visible character is just a "★" glyph, which alone tells a screen reader nothing about what it does. The group is wrapped in a \`<fieldset>\` with a visually-hidden \`<legend>\` (clipped via the standard \`.sr-only\` pattern, not \`display:none\`, so it stays in the accessibility tree) — this is how a screen reader announces "Star rating, 5 items" context before reading each radio's own label, matching how sighted users perceive the group as one cohesive control.

**Where this is the only working option**

Star ratings are frequently required inside review-submission widgets embedded in third-party pages, sanitized comment sections, and CMS testimonial blocks — all places that commonly strip \`<script>\` tags from user- or editor-authored HTML for security. Because every part of this widget's interactivity — the hover preview and the committed selection — is native radio-input and \`:hover\` behavior read through sibling selectors, it remains a fully working, real form field in exactly those script-stripped contexts.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Write stars in reverse DOM order', text: 'Markup order must be 5,4,3,2,1 (highest first) — this is what lets the ~ combinator reach "every star before this one" visually.' },
        { title: 'Apply flex-direction: row-reverse', text: 'This flips only the rendering order, putting star 1 on the left and star 5 on the right, without changing the DOM order the selectors rely on.' },
        { title: 'Keep each input immediately before its label', text: 'The .star-input:checked + .star rule needs the label to directly follow its radio, with no elements between them.' },
        { title: 'Wrap the group in a fieldset with a hidden legend', text: 'Use a visually-hidden <legend> (clipped, not display:none) so screen readers announce the group\'s purpose before each star\'s own aria-label.' },
        { title: 'Read the value on submit', text: 'Because these are real radios sharing name="rating", a normal form submission or FormData read returns the selected numeric value directly — no JS collection needed.' },
      ],
    },
    features: [
      'Reverse-order (5,4,3,2,1) radio markup combined with flex-direction: row-reverse to enable forward-only ~ selectors',
      'Hover preview lights the hovered star and all stars before it via .star:hover ~ .star, without touching the committed value',
      ':not(:hover) guard cleanly separates the temporary hover preview from the actual :checked selection',
      'Real, submittable radio group — reading the rating server-side needs no JavaScript collection step',
      'Explicit aria-label="N stars" per star since the ★ glyph alone carries no semantic meaning',
      'Fieldset + visually-hidden legend (clip-based, not display:none) for correct screen-reader group announcement',
      ':focus-visible ring on the hidden input styled onto its label sibling for full keyboard accessibility',
      'Zero JavaScript — works in sanitized comment widgets, CMS testimonial blocks, and script-stripped embeds',
    ],
    useCases: [
      { icon: 'SHOP', title: 'Product Review Forms', desc: 'Collecting a star rating alongside a review text field in an e-commerce product page, submitted with the rest of the form' },
      { icon: 'FORM', title: 'Post-Support Satisfaction Surveys', desc: 'A lightweight CSAT-style rating embedded at the end of a support ticket or chat transcript' },
      { icon: 'DOC', title: 'CMS Testimonial Submission Widgets', desc: 'User-submitted testimonial forms rendered inside CMS blocks that strip embedded scripts for security' },
      { icon: 'MAIL', title: 'Feedback Links in HTML Email', desc: 'A visual rating control in a marketing or transactional email footer, where scripts never execute' },
      { icon: 'CODE', title: 'Learning the Reverse-Order Sibling Trick', desc: 'The canonical example for understanding how ~ can simulate "select everything before me" via DOM reversal' },
      { icon: 'CODE', title: 'Related: Dual Range Price Filter', desc: 'See the [Dual Range Price Filter](/ui-snippets/dual-range-price-filter/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'Why not just use JavaScript to read mouse position and highlight stars?', a: 'That works too, but requires JavaScript to run at all. This CSS-only version works identically inside sanitized HTML, CMS content blocks, and email clients where scripts are stripped or blocked outright, which a JS-based version cannot.' },
      { q: 'Why are the stars written in the HTML in the order 5,4,3,2,1 instead of 1,2,3,4,5?', a: 'CSS only has a general sibling combinator (~) that selects elements after a given one in the DOM, with no equivalent for "before." Reversing the DOM order and then using flex-direction: row-reverse to restore the correct visual order lets the ~ combinator reach every star to the left, even though CSS itself cannot select backwards.' },
      { q: 'Can I make this support half-star ratings?', a: 'Yes, but it requires more granular markup — typically doubling to 10 radio inputs (half-star increments) with each label sized to half a star\'s width, or using a background-clip gradient trick tied to :checked. It significantly increases markup complexity.' },
      { q: 'How do I read the submitted rating value on the server?', a: 'Because all five inputs share name="rating" with distinct value attributes (5 down to 1), a standard form POST or FormData read on the client returns the checked one\'s value exactly like any other radio group — no special handling needed.' },
      { q: 'Is the ★ character accessible on its own?', a: 'No — a screen reader would just announce "star" or the raw glyph with no indication of position. Each label here has an explicit aria-label="N stars" precisely to supply that missing context, and the group has a visually-hidden legend for the same reason.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to explain step by step why the stars must be written in reverse DOM order for the ~ combinator to work, and to trace through exactly which elements .star:hover ~ .star selects for, say, the third star from the left — that mental trace is the key to understanding (and debugging) this whole pattern. It's also a good prompt for extending this to half-star precision, or for adding a read-only "display only" variant that shows a pre-set rating without any of the interactive hover/checked styling.`,
      prompt: `Build a 5-star rating input widget using only HTML and CSS — no JavaScript, no onclick attributes, no <script> tags — that remains a real, submittable radio input group.

Requirements:
- Use five <input type="radio"> elements sharing one name attribute and distinct numeric value attributes, each immediately followed by a <label> styled as a star glyph.
- Write the radio/label pairs in reverse order in the HTML (highest value first) and use CSS flex-direction: row-reverse to restore the correct 1-through-5 left-to-right visual order — do not use JavaScript or SVG scripting to achieve the ordering.
- Implement a hover preview: hovering any star must visually highlight that star and every star to its left, using only the ~ general sibling combinator, without altering the actually selected (checked) rating.
- Implement the committed-selection highlight using the same sibling-combinator approach keyed off :checked instead of :hover, and ensure it is not visually overridden except during an active hover.
- Give each star label an appropriate aria-label describing its numeric value, and wrap the group in a fieldset with a visually-hidden (not display:none) legend describing the control's purpose.
- One star should be pre-selected via the checked attribute by default.`,
    },
  },
};

export default cssOnlyStarRatingRadio;
