const starRating = {
    id: 'star-rating',
    title: 'Star Rating',
    category: 'forms',
    html: `<div class="demo">
  <div class="label">Rate your experience</div>
  <div class="stars" id="stars">
    <span data-v="1">★</span><span data-v="2">★</span><span data-v="3">★</span>
    <span data-v="4">★</span><span data-v="5">★</span>
  </div>
  <div class="hint" id="hint">Click to rate</div>
</div>`,
    css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; display: flex; align-items: center; justify-content: center; min-height: 100vh; }

.demo { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.label { font-size: 15px; font-weight: 600; color: #1e293b; }
.stars { display: flex; gap: 4px; }
.stars span { font-size: 36px; color: #e2e8f0; cursor: pointer; transition: color 0.1s, transform 0.1s; line-height: 1; }
.stars span:hover, .stars span.active { color: #f59e0b; }
.stars span:hover { transform: scale(1.15); }
.hint { font-size: 13px; color: #94a3b8; min-height: 18px; }`,
    js: `const labels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent!'];
let selected = 0;
const stars = document.querySelectorAll('#stars span');
const hint  = document.getElementById('hint');

stars.forEach(s => {
  s.addEventListener('mouseenter', () => {
    const v = +s.dataset.v;
    stars.forEach(x => x.classList.toggle('active', +x.dataset.v <= v));
    hint.textContent = labels[v];
  });
  s.addEventListener('click', () => { selected = +s.dataset.v; hint.textContent = labels[selected] + ' — thanks!'; });
});
document.getElementById('stars').addEventListener('mouseleave', () => {
  stars.forEach(x => x.classList.toggle('active', +x.dataset.v <= selected));
  hint.textContent = selected ? labels[selected] + ' — thanks!' : 'Click to rate';
});`,

  seo: {
    title: 'Star Rating — Free HTML CSS JS Snippet',
    description: 'Interactive star rating with hover preview, click to set and descriptive labels from Poor to Excellent. Exports to React, Vue, Angular & Tailwind.',
    about: {
      title: 'Star Rating — Hover Preview, Click-to-Set & Label Feedback',
      description: `A star rating component collects user satisfaction input — [product reviews](/ui-snippets/product-card/), service ratings (aggregated in a [rating breakdown](/ui-snippets/rating-breakdown/)), [survey responses](/ui-snippets/nps-survey/). The interaction pattern is well-established: stars highlight as you hover to preview the rating, click to lock it in, and the selection persists when you move the mouse away. This snippet implements the full pattern with hover preview, click-to-set, mouseleave restore, and descriptive text labels.

**How the hover preview works**

Each star is a span with a data-v attribute (1–5). The mouseenter handler uses classList.toggle('active', +x.dataset.v <= v) to compare each star's value to the hovered value and adds .active (amber) to all stars at or below the cursor.

**Storing the selected rating**

A selected variable stores the clicked value. On mouseleave from the container, the stars reset to show the selected value. If selected is 0, all stars go grey.

**The label feedback**

The labels array maps indices to descriptive words: Poor, Fair, Good, Great, Excellent at positions 1–5. The .hint element shows the current hover label during hover and the selected label plus thanks after click.

**Reading the value**

After the user clicks, selected holds the value 1–5. Add a hidden input and update its value: document.getElementById('rating').value = selected. Submit the hidden input with your form data.

**Hover preview with CSS sibling selectors**

The star rating uses the CSS general sibling combinator (~) in reverse order trick. The input elements are hidden radio buttons ordered 5 to 1. When a star is hovered, CSS .star:hover ~ .star selects all subsequent siblings and removes their colour, while the hovered star and all stars before it get the accent colour. This creates the hover preview effect without any JavaScript — just CSS sibling relationships.

**Click-to-set with radio inputs**

Each star is a label associated with a hidden radio input. Clicking a label checks its radio input. The :checked pseudo-class then applies the filled colour to that star and all preceding stars via the same sibling combinator logic. The rating is accessible via standard form input — a form POST includes the rating value automatically.

**The half-star pattern**

For half-star ratings (3.5, 4.5), use two overlapping label elements per star: one for the left half and one for the right. Each half has its own radio input value (3.0, 3.5, 4.0, 4.5, etc.). The clip-path: inset(0 50% 0 0) clips each half-star to its respective side.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Hover and click in the preview', text: 'Hover over the stars to see the highlight preview. Click a star to lock the rating. Move the mouse away to confirm the selection persists.' },
        { title: 'Update the label text', text: 'In the JS panel, update the labels array. The hint text uses these labels on hover and after selection.' },
        { title: 'Change the star size', text: 'In the CSS panel, update font-size: 36px on .stars span to resize all stars.' },
        { title: 'Change the active star colour', text: 'Update color: #f59e0b on .stars span.active to any amber, yellow, or brand colour.' },
        { title: 'Submit the value', text: 'After click, the selected variable holds 1–5. Add document.getElementById(your-input).value = selected in the click handler to populate a hidden form input.' },
        { title: 'Export in your format', text: 'Click HTML for a standalone file, JSX for a React component, or Tailwind for a React + Tailwind version.' },
      ],
    },
    features: [
      'Hover preview: classList.toggle fills stars up to cursor on mouseenter',
      'Click-to-set: selected variable persists the chosen rating',
      'mouseleave restores the selected state — unrated if nothing clicked',
      'Descriptive labels array: Poor/Fair/Good/Great/Excellent mapped to 1–5',
      '.hint element shows hover label and post-click confirmation text',
      'scale(1.15) hover transform with transition on each star span',
      'Unrated stars use color: #e2e8f0 — light grey, not hidden',
      'Export as HTML file, React JSX, or React + Tailwind CSS',
      'Mobile (375px), Tablet (768px), Desktop device preview buttons',
      'Live split-pane editor — preview updates as you type',
    ],
    useCases: [
      { icon: 'STAR',   title: 'Product and service review forms',      desc: 'Embed the star rating in a review submission form. Read the selected value into a hidden input before form submission.' },
      { icon: 'APP',    title: 'Post-purchase satisfaction surveys',     desc: 'Show a star rating after order delivery or service completion. The descriptive labels remove ambiguity about what each star count means.' },
      { icon: 'FORM',   title: 'In-app NPS and feedback widgets',        desc: 'Use in a slide-up feedback widget after feature use. The compact design fits inside a small card or tooltip.' },
      { icon: 'LEARN',  title: 'Learn mouseover state with data attributes', desc: 'The hover logic uses data-v attributes and classList.toggle with a comparison. Edit the JS panel to understand how a single loop manages highlight state for all five stars.' },
      { icon: 'DESIGN', title: 'Display-only star ratings',              desc: 'For read-only ratings, remove the JS event listeners, pre-set .active on the appropriate stars, and remove cursor: pointer.' },
      { icon: 'CODE',   title: 'Embed in checkout and order review flows', desc: 'Place the rating at the end of checkout or after order confirmation to collect feedback while the experience is fresh.' },
    ],
    faqs: [
      { q: 'How does the hover highlight work?', a: 'Each star span has a data-v attribute (1–5). The mouseenter handler captures the hovered value v, then loops through all stars with classList.toggle(active, +x.dataset.v <= v). Stars with a value at or below the hovered star get the .active class.' },
      { q: 'How is the selected rating stored?', a: 'A selected variable (initialised to 0) stores the clicked value. On mouseleave, the stars reset to show the selected value. If selected is 0, all stars are grey.' },
      { q: 'How do I submit the star rating with a form?', a: 'Add a hidden input to your form. In the click handler, set document.getElementById(rating-input).value = selected. The form will submit the rating value.' },
      { q: 'How do I show a read-only average rating?', a: 'Remove event listeners. Pre-compute the number of full stars and add .active to that many spans. For a fractional average, use clip-path on the last star.' },
      { q: 'Can I change the number of stars?', a: 'Yes. Add or remove span elements and update the labels array length. The toggle logic uses data-v attributes so it works with any count.' },
      { q: 'Can I use this in React?', a: 'Yes. Click JSX to download a React component. Replace selected with useState and highlight stars up to the hovered or selected index in render.' },
    ],
    aiPrompt: {
      paragraph: `You don't need to work out the hover-versus-selected state handoff by hand. Paste this snippet's HTML, CSS, and JS into an AI coding assistant like Claude and ask it to explain exactly why the mouseleave handler re-derives the active stars from the selected variable instead of just removing every active class, or how classList.toggle with a comparison against data-v produces the "fill up to here" effect from a single shared loop. The same assistant can help optimize it, for example checking whether attaching a separate mouseenter listener per star (rather than one delegated listener on the container) matters at this scale. It's also useful for extending the feature: ask it to add keyboard support so arrow keys and Enter can set a rating without a mouse, support half-star precision, or persist the selected rating to a hidden form field automatically instead of requiring a manual wiring step. Treat the code less like a finished artifact and more like a starting point for a conversation.`,
      prompt: `Build an interactive star rating control in plain HTML, CSS, and JavaScript, no framework, no libraries.

Requirements:
- Five star characters, each carrying a numeric value in a data attribute (1 through 5), plus a text hint element below them.
- On mouseenter of any star, read that star's value and loop through all five stars, adding a highlight class to every star whose value is less than or equal to the hovered value and removing it from the rest — using a single comparison-based toggle call per star, not separate add/remove branches.
- Update the hint text during hover to show a descriptive word (for example Poor, Fair, Good, Great, Excellent) corresponding to the hovered value, sourced from an array indexed by the star value.
- Clicking a star must store its value in a variable representing the confirmed selected rating, and update the hint to a confirmation message that includes the descriptive word for that rating.
- On mouseleave of the entire star container (not each individual star), restore the highlighted stars to reflect the confirmed selected rating rather than the hover state, and restore the hint text to either the confirmation message (if a rating was previously selected) or a prompt to click and rate (if nothing has been selected yet).
- Unselected/unhovered stars must render in a light neutral gray, not be hidden or removed, so the full five-star scale is always visible regardless of the current rating.
- As a documented extension in a code comment, describe how to read the confirmed rating into a hidden form input's value so it submits along with the rest of a form.`,
    },
  },
};

export default starRating;
