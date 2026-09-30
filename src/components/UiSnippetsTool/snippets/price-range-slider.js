const priceRangeSlider = {
  id: 'price-range-slider',
  title: 'Price Range Slider',
  category: 'forms',
  html: `<div class="range-widget">
  <div class="range-labels">
    <span>Price Range</span>
    <span class="range-value" id="rangeValue">$20 - $180</span>
  </div>
  <div class="range-track-wrap">
    <div class="range-track"></div>
    <div class="range-fill" id="rangeFill"></div>
    <input type="range" min="0" max="200" value="20" step="1" class="range-input range-min" id="minRange" aria-label="Minimum price">
    <input type="range" min="0" max="200" value="180" step="1" class="range-input range-max" id="maxRange" aria-label="Maximum price">
  </div>
</div>`,
  css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: system-ui, sans-serif; background: #f8fafc; padding: 40px; display: flex; align-items: center; flex-direction: column; gap: 20px; justify-content: center; min-height: 100vh; }

.range-widget { max-width: 320px; }

.range-labels {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.range-labels span:first-child { font-size: 13px; font-weight: 600; color: #475569; }
.range-value { font-size: 13px; font-weight: 700; color: #6366f1; background: #eef2ff; padding: 4px 10px; border-radius: 999px; }

.range-track-wrap { position: relative; height: 32px; }

.range-track {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 4px;
  background: #e2e8f0;
  border-radius: 999px;
  transform: translateY(-50%);
}

.range-fill {
  position: absolute;
  top: 50%;
  height: 4px;
  background: #6366f1;
  border-radius: 999px;
  transform: translateY(-50%);
}

.range-input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 32px;
  margin: 0;
  background: transparent;
  pointer-events: none;
  -webkit-appearance: none;
  appearance: none;
}
.range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #6366f1;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(15,23,42,0.2);
  margin-top: 7px;
}
.range-input::-moz-range-thumb {
  pointer-events: auto;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid #6366f1;
  cursor: pointer;
  box-shadow: 0 1px 4px rgba(15,23,42,0.2);
}
.range-input:focus-visible::-webkit-slider-thumb { outline: 2px solid #6366f1; outline-offset: 2px; }`,
  js: `const minRange = document.getElementById('minRange');
const maxRange = document.getElementById('maxRange');
const fill = document.getElementById('rangeFill');
const valueDisplay = document.getElementById('rangeValue');
const MAX = 200;
const GAP = 5;

function updateSlider() {
  let minVal = parseInt(minRange.value, 10);
  let maxVal = parseInt(maxRange.value, 10);

  if (maxVal - minVal < GAP) {
    if (this === minRange) {
      minVal = maxVal - GAP;
      minRange.value = minVal;
    } else {
      maxVal = minVal + GAP;
      maxRange.value = maxVal;
    }
  }

  const minPercent = (minVal / MAX) * 100;
  const maxPercent = (maxVal / MAX) * 100;

  fill.style.left = minPercent + '%';
  fill.style.width = (maxPercent - minPercent) + '%';
  valueDisplay.textContent = '$' + minVal + ' - $' + maxVal;
}

minRange.addEventListener('input', updateSlider);
maxRange.addEventListener('input', updateSlider);
updateSlider();`,

  seo: {
    title: 'Price Range Slider — Free HTML CSS JS Dual Handle Range Slider Snippet',
    description: 'A dual-thumb price range slider using two overlapping native range inputs, a synced fill bar, and a live "$X - $Y" label. Vanilla JS, no plugin required.',
    about: {
      title: 'Price Range Slider — HTML, CSS & JavaScript Dual-Thumb Range Filter',
      description: `Filtering products by a min/max price range is a staple of e-commerce filter sidebars. Building it usually means reaching for a slider plugin — but a convincing dual-handle range slider can be built with **two overlapping native \`<input type="range">\` elements** and a small amount of JavaScript to keep them from crossing.

**How two range inputs simulate one dual-handle slider**

Both \`#minRange\` and \`#maxRange\` are absolutely positioned on top of each other, spanning the same track. Each is styled with a transparent \`background\` and \`pointer-events: none\` on the input track itself, but the \`::-webkit-slider-thumb\`/\`::-moz-range-thumb\` pseudo-elements get \`pointer-events: auto\`. This means clicking anywhere on the invisible track does nothing, but clicking and dragging either visible circular thumb works normally — the two inputs never fight over the same click because only their thumbs are interactive, and the thumbs sit at different positions.

**How the colored fill bar is calculated**

A separate \`.range-fill\` div (not part of either input) is positioned absolutely between the two thumbs. \`updateSlider()\` converts both values to percentages of the slider's max (\`(value / MAX) * 100\`) and sets the fill's \`left\` to the min percentage and \`width\` to the difference between max and min percentages. This is recalculated on every \`input\` event from either slider, so the fill visually tracks both thumbs in real time.

**How the handles are prevented from crossing**

Nothing stops a native range input from having its value larger than a sibling's on its own — the two inputs know nothing about each other. \`updateSlider\` checks whether \`maxVal - minVal\` has dropped below a minimum \`GAP\`, and if so, it forces the *other* slider's value back to maintain that gap, using \`this\` (the slider that just fired the event) to determine which one to leave alone and which one to push. This keeps a small buffer between the handles so they never visually overlap or invert.

**Why two separate inputs instead of a single custom-built slider**

Reusing native \`<input type="range">\` elements means keyboard support (arrow keys, Page Up/Down, Home/End), touch dragging, and screen reader value announcements all come for free from the browser — a fully custom-built slider would need to reimplement all of that manually.`,
    },
    howToUse: {
      type: 'steps',
      items: [
        { title: 'Load the snippet', text: 'Click "Price Range Slider" in the sidebar Library tab to load the dual-handle slider.' },
        { title: 'Drag both handles', text: 'Drag the left and right thumbs in the preview and watch the fill bar and "$X - $Y" label update live.' },
        { title: 'Test the minimum gap', text: 'Try dragging one handle into the other — notice it stops before crossing, maintaining a small gap.' },
        { title: 'Change the price range', text: 'Update the min/max attributes on both range inputs and the MAX constant in JS to match your real price bounds.' },
        { title: 'Adjust the minimum gap', text: 'Change the GAP constant in the JS panel to allow the handles to get closer or further apart.' },
        { title: 'Export and save', text: 'Export as HTML/JSX/Tailwind or click "Save as" to reuse this filter in a real product listing page.' },
      ],
    },
    features: [
      'Two overlapping native range inputs simulate a single dual-handle slider',
      'pointer-events trick makes only the visible thumbs interactive, not the invisible tracks',
      'Colored fill bar recalculated live as a percentage of the slider range on every input event',
      'Handles are prevented from crossing via a configurable minimum GAP constant',
      'Live "$X - $Y" label updates on every drag, not just on release',
      'Full native keyboard support (arrow keys, Home/End, Page Up/Down) inherited from <input type="range">',
      'Custom-styled circular thumbs with a focus-visible outline for accessibility',
      'No slider plugin or library — pure HTML inputs plus about 25 lines of JavaScript',
    ],
    useCases: [
      { icon: 'SHOP', title: 'E-commerce price filters', desc: 'Let shoppers narrow a product listing to a specific price band without typing numbers into two separate fields.' },
      { icon: 'FORM', title: 'Booking and rental date/price filters', desc: 'Reuse the same dual-handle pattern for filtering by budget, distance, or duration ranges.' },
      { icon: 'DASH', title: 'Analytics dashboard range filters', desc: 'Apply the pattern to filter a chart or table by a numeric range like age, score, or duration.' },
      { icon: 'LEARN', title: 'Learn the overlapping-inputs technique', desc: 'Study how pointer-events selectively enables only the thumb pseudo-elements while leaving the track inert.' },
      { icon: 'ACCESS', title: 'Accessible range controls', desc: 'See how reusing native range inputs preserves keyboard and screen-reader support that a from-scratch slider would need to reimplement.' },
      { icon: 'CODE', title: 'Related: Web Crypto Hash Demo', desc: 'See the [Web Crypto Hash Demo](/ui-snippets/web-crypto-hash-demo/) for a related forms pattern worth pairing with this one.' },
    ],
    faqs: [
      { q: 'How do two separate range inputs work as one dual-handle slider?', a: 'Both inputs are absolutely positioned on top of the same track with transparent backgrounds. Only their thumb pseudo-elements have pointer-events enabled, so users can drag either thumb independently while the invisible track underneath ignores clicks.' },
      { q: 'What stops the two handles from crossing each other?', a: 'The updateSlider function checks the gap between the current min and max values after every input event. If the gap falls below a configured minimum, it pushes the slider that did not just move back to restore that minimum gap, preventing the handles from passing through each other.' },
      { q: 'How is the colored fill bar between the handles calculated?', a: 'Both slider values are converted to percentages of the maximum range value. The fill\'s left offset is set to the minimum percentage and its width is set to the difference between the max and min percentages, so it always spans exactly between the two visible thumbs.' },
      { q: 'Why use native range inputs instead of building a custom slider from divs?', a: 'Native range inputs come with built-in keyboard support, touch dragging, and screen reader value announcements for free. A fully custom slider built from plain divs would need to reimplement all of that accessibility and interaction behavior manually.' },
      { q: 'How do I change the price range bounds?', a: 'Update the min and max attributes on both #minRange and #maxRange inputs in the HTML, and update the matching MAX constant in the JavaScript panel so the fill-bar percentage math stays correct.' },
      { q: 'Can I show the values as currency other than dollars?', a: 'Yes — change the string concatenation in updateSlider\'s valueDisplay.textContent line to use your currency symbol or a proper Intl.NumberFormat currency formatter.' },
      { q: 'Does this slider work well on touch devices?', a: 'Yes — native range inputs have built-in touch drag support in all modern mobile browsers, so the thumbs can be dragged with a finger exactly as they are with a mouse.' },
    ],
    aiPrompt: {
      paragraph: `Ask an AI assistant to walk through exactly why pointer-events: none on the range input itself combined with pointer-events: auto on just its thumb pseudo-element is what makes two overlapping sliders usable instead of one permanently blocking clicks to the other. It's also worth asking the assistant to add a debounced onChange callback (versus the live oninput updates) for scenarios where you only want to trigger an actual product filter API call once the user releases the handle, to avoid firing a network request on every pixel of drag.`,
      prompt: `Build a "price range slider" with two draggable handles in plain HTML, CSS, and vanilla JavaScript, using two native <input type="range"> elements — no slider plugin or library.

Requirements:
- Two range inputs sharing the same min/max bounds, absolutely positioned directly on top of each other over a single visual track, where only the circular thumb of each input is clickable/draggable (the invisible track itself must not intercept clicks meant for the other slider).
- A separate fill bar element, positioned independently of the inputs, whose left offset and width are recalculated on every input event to visually span exactly between the two current handle positions, expressed as percentages of the slider's range.
- Logic that prevents the two handles from crossing: if a drag would bring the max value within a small configurable gap of the min value (or vice versa), the other handle must be pushed just enough to maintain that minimum gap rather than allowing an inverted or overlapping range.
- A live text label showing the current selected range formatted as a price string (e.g. "$20 - $180") that updates on every drag frame, not just on release.
- The sliders must retain full native keyboard operability (arrow keys, Home/End) and visible focus indicators on the thumbs.`,
    },
  },
};

export default priceRangeSlider;
