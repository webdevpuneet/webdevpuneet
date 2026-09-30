const fs = require('fs');
const p = 'c:/Projects/tools/src/components/UiSnippetsTool/snippets/';

const expansions = {
'matrix-rain': `

**The Canvas column system**

The canvas width is divided into columns of 16px each. An array drops[] tracks the Y position of the falling character in each column — initialised to random starting positions for a natural staggered start. Each frame, every column draws a character at its Y position, then increments Y by 16px. When Y exceeds the canvas height it resets to 0, creating the continuous rain effect. Characters draw in bright green with older trail characters drawn darker, achieved by drawing a semi-transparent black rectangle each frame (rgba(0,0,0,0.05)) rather than clearing the canvas — this darkens existing characters gradually without erasing them.

**Customising the effect**

Change the character set by updating the chars string — use binary (01), hex (0-9A-F), or domain-specific symbols like network packets or DNA bases. Change the colour by updating ctx.fillStyle from bright green to cyan, amber, or any hue. Adjust the animation speed by changing the character pool density or the interval timing. The effect scales to any canvas size — resize the canvas element to match the viewport for a full-screen background.

**Performance note**

Canvas 2D text drawing is not GPU-composited. For very large canvases on mobile, reduce the character pool size or increase column width to reduce the per-frame character count. Using setInterval at 50ms instead of requestAnimationFrame reduces power consumption while keeping the visual smooth enough for decorative background use.`,

'number-slot': `

**The column scroll mechanism**

Each digit column contains all 10 digits (0-9) stacked vertically. To show digit 7, the column translates to translateY(-700%). The CSS transition: transform 0.3s cubic-bezier(0.4,0,0.2,1) animates the column scrolling to the target digit. overflow: hidden on the digit window clips the column to show only one digit at a time. For a multi-digit display, each column animates independently with a small staggered delay creating the cascading slot machine roll effect.

**Triggering and reset**

A spin() function picks random target digits and sets each column transform. A staggered animation-delay per column creates the sequential reveal. For a score or counter display, animate to the actual value instead of a random number — compute the target digit for each column position from the number string.

**Sound integration**

For a complete slot machine experience, add a Web Audio API click sound on each column stop. Create a brief 440Hz tone that fades in 0.02s and out in 0.03s using an OscillatorNode and GainNode. Trigger one sound per column as each settles, staggered by the same delay as the visual animation.`,

'segmented-control': `

**The sliding pill indicator**

The active indicator is a .pill div using position: absolute. On each button click, moveIndicator(btn) reads btn.offsetLeft and btn.offsetWidth — the actual pixel position and size of the clicked segment from the DOM. It then sets pill.style.left and pill.style.width to these values. CSS transition: left 0.2s, width 0.2s animates the pill sliding and resizing between segments. Since values are read at click time, the control handles any segment label length automatically with no CSS configuration.

**Keyboard accessibility**

The buttons are standard button elements — keyboard-accessible by default. For arrow key navigation matching native iOS segmented control behaviour, add a keydown listener: ArrowRight focuses and clicks the next segment; ArrowLeft focuses and clicks the previous. Tab moves between control groups; arrow keys move within a group.

**Common production use cases**

The segmented control works best for 2–4 mutually exclusive options that fit on one line. Common uses: List/Grid view toggle, Day/Week/Month time range picker, Bar/Line/Pie chart switcher, Ascending/Descending sort direction. Wire the active segment to a state variable and conditionally render the matching view component below.`,

'side-drawer': `

**The translateX slide animation**

Left drawers start at transform: translateX(-100%) — fully off-screen to the left. Adding .open transitions to translateX(0). The cubic-bezier spring curve (fast start, slow settle) creates the feel of a native mobile sheet opening. The CSS transition handles both open and close — removing .open reverses the animation automatically.

**Backdrop and z-index layering**

The backdrop is position: fixed; inset: 0 with a z-index below the drawer. When .open is applied, the backdrop fades in with opacity and gains pointer-events: all so clicks on it close the drawer. This click-backdrop-to-close is expected behaviour on all mobile UIs.

**Push vs overlay mode**

This snippet implements overlay mode — the drawer slides over the content with a backdrop. For push mode (content shifts right when drawer opens), add transition: margin-left 0.3s to the main content and set margin-left: 280px when the drawer opens. Overlay communicates temporary context; push communicates a persistent workspace panel.

**Focus management for accessibility**

When the drawer opens, move focus to the first focusable element inside: drawer.querySelector('a, button, input').focus(). On close, return focus to the element that triggered the open. This prevents keyboard users from losing their position on the page behind the drawer.`,

'social-post-card': `

**The optimistic like counter**

Clicking the like button immediately increments the displayed count without waiting for an API response — this is the optimistic update pattern used by every major social platform. The .liked class toggles to fill the heart icon. If the API call fails in a real implementation, decrement the count and show an error toast notification (see the Toast Notification snippet in this library).

**Hashtag and mention styling**

Post text containing hashtags and mentions uses distinct colours — blue for mentions, indigo for hashtags — making them visually scannable in a dense feed. In a real feed, these render as anchor links pointing to the hashtag search results page or the mentioned user profile page.

**The card action row**

Three action buttons (like, comment, share) follow the standard social platform layout. Add a bookmark as a fourth action using the same toggle pattern. All states manage identically: a class toggle on the button icon and a counter update on click. Keep actions icon-only or icon+count depending on the card width and density requirements.

**Building a full feed from multiple cards**

Render multiple social post cards in a flex-direction: column container with gap: 12px for a feed. Add infinite scroll by observing the last card with IntersectionObserver and fetching the next page when it enters the viewport: const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) fetchNextPage(); }); obs.observe(lastCard).`,

'stagger-list': `

**How CSS animation-delay creates the stagger**

Each list item has animation-delay: calc(N * 0.07s) where N is the item index. Item 0 animates immediately, item 1 waits 70ms, item 2 waits 140ms, and so on. The keyframe itself is identical for every item — only the delay differs. This single CSS technique creates the stagger without any JavaScript, making it highly performant and easy to apply to any number of items.

**The slide-in keyframe**

Each item animates from opacity: 0, transform: translateX(-20px) to opacity: 1, transform: translateX(0). The translateX movement adds directionality to the reveal — items appear to slide in from the left. Change to translateY(20px) for a slide-up entrance, or scale(0.8) for a zoom-in. The 0.4s duration with ease-out timing gives a natural deceleration on landing.

**Triggering on scroll**

By default the animation fires on page load. To trigger when the list scrolls into view, add animation-play-state: paused to .item initially, then use IntersectionObserver to set animation-play-state: running when the list container enters the viewport. Call obs.disconnect() inside the callback so the animation only triggers once per page view.

**Dynamic item count**

When items are added dynamically, apply the .item class with the correct animation-delay computed from the new item index: item.style.animationDelay = (existingCount * 0.07) + 's'. The CSS animation runs once automatically when the class is first applied, so new items animate in on insertion without any additional JavaScript.`,

'svg-progress-ring': `A circular SVG progress ring is one of the most polished ways to show a completion percentage for skills, goals, tasks, or loading states. Unlike a linear progress bar, the ring uses the full width of its container area and communicates circular concepts naturally — quota progress, task completion, skill level.

**The stroke-dashoffset mathematics**

The ring uses a circle SVG element with a calculated stroke. CIRCUMFERENCE = 2 × Math.PI × radius. Setting stroke-dasharray: CIRCUMFERENCE makes the entire perimeter one continuous dash. stroke-dashoffset controls how much of that dash is hidden — setting it to CIRCUMFERENCE hides the full ring (empty); 0 shows the full ring (100%). The formula: dashoffset = CIRCUMFERENCE × (1 - percentage/100). Animating from CIRCUMFERENCE to the target dashoffset creates the fill-in effect.

**The rotate(-90deg) orientation**

By default, SVG stroke starts at the 3 o'clock position. Adding transform: rotate(-90deg) to the circle element moves the start point to 12 o'clock — the standard orientation users expect for progress rings. Alternatively, use transform-origin: center on the SVG element.

**Multiple rings at different sizes**

The snippet shows three rings side-by-side at different sizes and colours — demonstrating that the same technique works at any radius. Scale the ring by changing both the viewBox dimensions and the radius attribute. The CIRCUMFERENCE calculation automatically adjusts to the new radius.

**Triggering the fill animation on scroll**

Use IntersectionObserver to trigger the animation when the ring enters the viewport: observer fires, dashoffset transitions from CIRCUMFERENCE to the target value. Add obs.disconnect() inside the callback so it animates once. Add transition: stroke-dashoffset 1s ease to the circle CSS for the smooth fill animation.

**Count-up animation pairing**

The snippet pairs the ring fill with a count-up number in the centre. Use requestAnimationFrame or CSS counter-increment to animate the percentage number from 0 to the target value in sync with the ring fill duration. The combined ring + number animation creates a premium metric reveal effect used in portfolio sites, dashboards, and loading screens.`,

'tag-input': `

**The Enter/comma add pattern**

The tag input listens for keydown events. When Enter or comma is pressed, it calls addTag() which trims the input value, checks for duplicates, adds the tag to the array, creates a chip element, and clears the input. Comma detection uses e.key === ',' with e.preventDefault() to stop the comma character appearing in the input after the tag is added.

**The backspace-last-remove pattern**

When the input is empty (input.value === '') and Backspace is pressed, the last tag in the array is removed and the corresponding chip element is deleted from the DOM. This matches the standard tag input interaction that users expect from email address fields, filter chips, and CRM contact selectors.

**Duplicate prevention**

Before adding a tag, the current tags array is checked: if (tags.includes(newTag)) return. Show a brief shake animation on the existing duplicate chip to communicate "already added" without an error message. Add .shake { animation: shake 0.3s } to flash the duplicate chip briefly.

**Connecting to form submission**

Collect tag values for form submission: document.querySelector('form').addEventListener('submit', e => { e.preventDefault(); const values = tags; submitForm(values); }). Or use a hidden input to hold a JSON-encoded array: hiddenInput.value = JSON.stringify(tags). This makes the tag values available to standard HTML form submission without JavaScript preprocessing.`,

'user-stats-card': `

**The activity heatmap**

The contribution heatmap is a 52-week × 7-day grid of small squares. Each square corresponds to one day. The colour intensity (from light grey to deep indigo) represents activity count on that day — 0 activity is the lightest; maximum activity is the darkest. JavaScript generates the grid using nested loops: for each week (column), create 7 day squares and append to the grid container. Random or real activity data determines each square's colour class.

**The circular progress rings**

Multiple SVG progress rings use the stroke-dashoffset technique to show different skill or metric percentages. Each ring has a different radius, colour, and target value. The rings animate simultaneously when the component mounts or scrolls into view. See the SVG Progress Ring snippet in this library for the full mathematics explanation.

**The follow button state**

The follow button toggles between "Follow" and "Following" states using a CSS class and a click handler. The button border and text colour change on toggle. In a real app, the click triggers a POST request to your follow API endpoint. Revert to "Follow" if the API call fails — the same optimistic update pattern as the social post card like button.

**GitHub-style profile integration**

For a developer portfolio using real GitHub data: fetch the GitHub GraphQL API with your personal access token to get contribution calendar data. Map the contributionCalendar weeks array to the heatmap grid. The contributionsByDay values map directly to colour intensity levels. Update the streak and total contribution counts from the API response summary fields.`,

'wave-text': `

**The staggered animation-delay technique**

Wave text works by applying the same keyframe animation to every character span, but with a progressively increasing animation-delay. Character 0 starts immediately; character 1 waits 0.05s; character N waits N×0.05s. The keyframe itself is identical — translateY(-12px) at 50% and translateY(0) at 0%/100%. The delay offset is all that creates the wave appearance.

**Character splitting with JavaScript**

The text content is split into individual characters, each wrapped in a span: [...text].forEach((char, i) => { const span = document.createElement('span'); span.textContent = char === ' ' ? ' ' : char; span.style.animationDelay = i * 0.05 + 's'; el.appendChild(span); }). The non-breaking space ( ) replaces regular spaces so they preserve their width in the inline span layout.

**Controlling the wave properties**

Change the delay multiplier (0.05s) to control wave speed — smaller values create a faster wave, larger values create a slower, more dramatic roll. Change the translateY value in the keyframe to control wave height. Add translateX for a sideways sway. Use a sine-based delay function for a smoother wave curve: Math.sin(i * 0.4) * 0.1 + 'delay'.

**Accessibility and prefers-reduced-motion**

The animation can be distracting for users sensitive to motion. Add @media (prefers-reduced-motion: reduce) { .wave-char { animation: none; } } to freeze all characters for users who have enabled the reduce motion accessibility setting. The text remains fully readable — only the decorative motion is removed.`
};

let fixed = 0;
Object.entries(expansions).forEach(([id, addition]) => {
  const filePath = p + id + '.js';
  let raw = fs.readFileSync(filePath, 'utf8');
  const seoBlock = raw.slice(raw.lastIndexOf('seo:'));
  const am = seoBlock.match(/about:\s*\{[\s\S]*?description:\s*`([\s\S]*?)`\s*,\s*\n\s*\}/);
  if (!am) { console.log('SKIP ' + id + ': no about match'); return; }
  const oldDesc = am[1];
  const newDesc = oldDesc + addition;
  raw = raw.replace(oldDesc, newDesc);
  fs.writeFileSync(filePath, raw);
  const wc = newDesc.trim().split(/\s+/).length;
  console.log('OK ' + id + ': ' + wc + 'w');
  fixed++;
});
console.log('\nFixed: ' + fixed + '/' + Object.keys(expansions).length);
